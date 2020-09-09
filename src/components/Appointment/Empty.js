import React from "react";

// empty component which shows an empty appointment time slot
export default function Empty(props) {
  return (
  <main className="appointment__add">
    <img
      className="appointment__add-button"
      src="images/add.png"
      alt="Add"
      onClick={props.onAdd}
    />
  </main>
  );
};