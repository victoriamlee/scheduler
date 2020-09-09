import React from "react";

import DayListItem from "components/DayListItem"

// returns an array of the list of days with styling (intial state and preselected)
export default function DayList(props) {
  return (
    <ul>
      {props.days.map(day => {
        return <DayListItem
        key={day.id}
        name={day.name} 
        spots={day.spots} 
        selected={day.name === props.day}
        setDay={props.setDay}  
        />
      })
      }
    </ul>
  );
};