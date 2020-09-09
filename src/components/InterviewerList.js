import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "components/InterviewerListItem";

import "components/InterviewerList.scss";

// returns an array of interviewers with styling (intial state and preselected)
export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(interviewer => {
            return (
            <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name} 
            avatar={interviewer.avatar} 
            selected={interviewer.id === props.value}
            setInterviewer={event => props.onChange(interviewer.id)}  
            />
            );
          })
        }
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};