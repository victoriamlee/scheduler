import { useState, useEffect } from "react";
import axios from "axios";

// custom hook that returns functions: returns functions: state, setDay, bookInterview, and cancelInterview
export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    setState(prev => ({...prev, days: prev.days.map(day => ({ ...day, spots: calculateSpots(prev, day.name)}))}));
  },[state.appointments]);

  // sets the current day
  const setDay = day => setState({...state, day });

   //calculates the number of spots left for a given day
   const calculateSpots = function (state, dayName) {
    const day = state.days.find(day => (day.name === dayName));

    const appObj = day.appointments.map(app =>(state.appointments[app]));
    
    let counter = 0
      for (let app of appObj) {
       if (!app.interview) {
          counter++
        }
     }

    return counter;
  };

  // renders the data for days, appointments, and interviewers
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  // makes an HTTP request and updates the state to show a new booked appointment
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
  return axios.put(`/api/appointments/${id}`, { interview })
    .then(() => {
      setState({
        ...state,
        appointments
      });
    })
  };

  // makes an HTTP request and updates the state to show the cancelled appointment
  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments
        });
      })
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};