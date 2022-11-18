// gets all appointments for one specific day
export function getAppointmentsForDay(state, day) {

  const result = [];
  for (let element of state.days) {
    if (element.name === day) {
      const appArray = element.appointments;
      for (let app of appArray) {
        result.push(state.appointments[app]);

      }
    }
  }
  return result;
}

// gets interview object
export function getInterview(state, interview) {

  if (!interview) return null;
  const newObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return newObj;
}

//gets the interviewers for a day
export function getInterviewersForDay(state, day) {

  const filteredDay = state.days.find(singleDay => singleDay.name === day);

  if (!filteredDay) {
    return [];
  }

  let interviewerIdsForDay = filteredDay.interviewers.map(id => {
    return state.interviewers[id.toString()];
  });
  return interviewerIdsForDay;
}
