import React from 'react';
import Projects from '../components/Projects';

const Inbox = () => <Projects
  canMove
  canDeleteTask
  canDeleteProject
  projectId="inbox"
/>;

export default Inbox;
