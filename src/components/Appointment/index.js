import React from 'react';

import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

import useVisualMode from 'hooks/useVisualMode';
import {getInterviewersForDay} from 'helpers/selectors';

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const TRASHING = "TRASHING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const {mode, transition, back} = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    if (name && interviewer) {
      const interview = {
        student: name,
        interviewer
      };

      transition(SAVING);

      props.bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch(() => transition(ERROR_SAVE, true));
    }
  }

  function trash(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(TRASHING, true);

    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">

      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === CONFIRM && <Confirm onCancel={() => transition(SHOW)} onConfirm={trash} />}
      {mode === TRASHING && <Status message="Deleting..." />}
      {mode === EDIT && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save} interviewer={props.interview.interviewer.id} student={props.interview.student} />}
      {mode === ERROR_SAVE && <Error message="Not able to save this appointment" onClose={() => transition(EMPTY)} />}
      {mode === ERROR_DELETE && <Error message="Not able to delete this appointment" onClose={() => back()} />}

    </article>
  );
};

export default Appointment;