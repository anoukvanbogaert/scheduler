import React, {useState, useEffect} from "react";
import axios from 'axios';

import "components/Application.scss";
import Button from './Button';
import DayList from "./DayList";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";


export default function Application(props) {
  //appointments object is a direct child of the state object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const setDay = (day) => setState({...state, day});

  const interviewers = getInterviewersForDay(state, state.day);

  let appointments = getAppointmentsForDay(state, state.day);

  //change the local state when we book an interview
  const bookInterview = function bookInterview(id, interview) {

    //making copy of state for 1 line in appointments obj, overwriting interview
    const appointment = {
      ...state.appointments[id],
      interview
    };

    //overwriting id line with appointment obj above
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`/api/appointments/${id}`, {interview: interview})
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      });
  };

  const cancelInterview = function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .delete(`/api/appointments/${id}`, {interview: interview})
      .then(() => {
        setState({
          ...state,
          appointments,
        });
      });
  };

  const schedule = appointments.map((app) => {
    const interview = getInterview(state, app.interview);
    return (
      <Appointment
        key={app.id}
        {...app}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // promise always has a res or rej, if you use promise.resolve it turns it into a resolve either way
  useEffect(() => {
    Promise.all([
      (axios.get('/api/days')),
      (axios.get('/api/appointments')),
      (axios.get('/api/interviewers'))
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day} //value and onChange make it clear that child uses user input
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
