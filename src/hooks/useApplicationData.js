import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function useApplicationData(initial) {
  //appointments object is a direct child of the state object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const remainingSpots = (state, appointments) => {
    return state.days.map((day) => {
      if (day.name === state.day) {
        return {
          ...day,
          spots: day.appointments
            .map((id) => (appointments[id]))
            .filter(({interview}) => {
              return !interview;
            }).length
        };
      }
      return day;
    });
  };

  const setDay = (day) => setState({...state, day});

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
          days: remainingSpots(state, appointments)
        });
      });
  };

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
          days: remainingSpots(state, appointments)
        });
      });
  };
  return {state, setDay, bookInterview, cancelInterview};
}
