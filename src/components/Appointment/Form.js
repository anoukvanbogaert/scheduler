import React, {useState} from 'react';

import InterviewerList from 'components/InterviewerList';
import Button from 'components/Button';

const Form = (props) => {
  // states even though they're passed down: this way, we have defaults but can change them
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer);
  const reset = () => {
    setStudent('');
    setInterviewer(null);
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            type="text"
            placeholder="Enter Student Name"
          /*
            This must be a controlled component
            your code goes here
          */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}


        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={reset}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
};

export default Form;