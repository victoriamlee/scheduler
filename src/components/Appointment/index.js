import React from "react";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "../../hooks/useVisualMode";

import "components/Appointment/styles.scss";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

console.log("PROPS", props.interview)

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };

  transition(SAVING);

  props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
};

function close() {
  back();
}

function edit() {
  transition(EDIT)
}

function deleting() {
  transition(CONFIRM)
}

function confirm() {
  transition(DELETING, true);

  props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
}

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onConfirm={confirm} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={close} />}
      {mode === ERROR_DELETE && <Error message={"Could not cancel appointment"} onClose={close} />}
      {mode === CREATE && (
          <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
          />
        )}
      {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onSave={save}
        onCancel={back}
        />
      )}
      {mode === SHOW && (
        <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={edit}
        onDelete={deleting}
        />
        )}
        
    </article>
  );
}