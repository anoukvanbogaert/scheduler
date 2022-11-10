import React from 'react';
import PropTypes from 'prop-types';

import 'components/InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';

const InterviewerList = (props) => {
  InterviewerList.propTypes = {interviewers: PropTypes.array};

  const interviewers = props.interviewers.map((interviewer) => {

    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={(event) => props.onChange(interviewer.id)}
        selected={props.value === interviewer.id}
      />

    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>

  );

};

export default InterviewerList;