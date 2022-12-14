import React from 'react';

import 'components/InterviewerListItem.scss';
import classNames from 'classnames';


const InterviewerListItem = (props) => {

  let interviewClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  return (

    <li onClick={props.setInterviewer} className={interviewClass}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>

  );

};

export default InterviewerListItem;