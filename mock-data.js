const task = {
  type: 'task',
  name: 'Thing I have to do',
  contexts: ['@work', '@home'],
  isCompleted: false,
  description: 'this is the description for this task',
  dueDate: new Date(),
};
const project = {
  type: 'project',
  isSequential: true,
  children: [task, task],
  name: 'Project name',
};
const otherProject = {
  type: 'project',
  isSequential: false,
  children: [task, project],
  name: 'Some other project',
};
console.log(otherProject);
