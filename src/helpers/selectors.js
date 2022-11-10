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

  const filteredDay = state.days.filter((singleDay) => singleDay.name === day);
  if (state.days.length === 0 || filteredDay.length === 0) {
    return [];
  }

  let interviewerIdsForDay = filteredDay[0].interviewers;

  let formattedInterviewers = [];

  for (let obj of Object.values(state.interviewers)) {
    for (let interviewer of interviewerIdsForDay)
      if (interviewer === obj.id) {
        formattedInterviewers.push(state.interviewers[interviewer]);

      }
  }

  return formattedInterviewers;
}
