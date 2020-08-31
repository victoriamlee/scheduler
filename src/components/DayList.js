import React from "react";
import ReactDOM from "react-dom";

import DayListItem from "components/DayListItem"
// import days from "./stories/index"

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];


export default function DayList(props) {
  const days = props.days.map(day => {
    return (
      <ul>
      <DayListItem
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
        />
      </ul>
    );
  })
  return days;
}

ReactDOM.render(
  <DayListItem days={days} />,
  document.getElementById("root")
);