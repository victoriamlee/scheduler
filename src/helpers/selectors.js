// returns an array of appointments scheduled for a specific day
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

// returns an array of interviewer objects available for a specific day
export function getInterviewersForDay(state, day) {
  const results = [];
  const filteredDays = state.days.filter(res => res.name === day);
  if (filteredDays.length === 0) {
    return results;
  }

  const interviewersId = filteredDays[0].interviewers;
  for (let id of interviewersId) {
    results.push(state.interviewers[id]);
  }

  return results;
};

// returns an interview
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