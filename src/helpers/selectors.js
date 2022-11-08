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

export function getInterview(state, interview) {
  if (!interview) return null;
  const newObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return newObj;
}

export function getInterviewersForDay(state, day) {
  const filteredDays = state.days.filter((singleDay) => singleDay.name === day);
  if (state.days.length === 0 || filteredDays.length === 0) {
    return [];
  }

  let formattedInterviewers = [];

  for (let interviewer of Object.values(state.interviewers)) {
    formattedInterviewers.push(state.interviewers[interviewer.id]);
  }
  return formattedInterviewers;
}