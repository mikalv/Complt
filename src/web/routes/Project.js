import { h } from 'preact';
import { route } from 'preact-router';
import Projects from '../components/Projects';

const Project = props => (
  <Projects
    initialIsProject
    canChangeType
    projectId={props.projectId}
    routerPush={route}
  />
);

export default Project;
