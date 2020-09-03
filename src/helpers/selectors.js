export function getAppointmentsForDay(state, day) {

  const results = [];
  const filteredDays = state.days.filter(res => res.name === day);
  if (filteredDays.length === 0) {
    return results;
  }

  const appointmentId = filteredDays[0].appointments;
  for (let id of appointmentId) {
    results.push(state.appointments[id]);
  }
  return results;
};

export function getInterview(state, interview) {

  if (!interview) {
    return null;
  }
  
  const results = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
  return results;
};