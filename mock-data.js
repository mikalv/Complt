const task = {
  type: "task",
  name: "Thing I have to do",
  contexts: ["@work", "@home"],
  isCompleted: false,
  description: "this is the description for this task",
  dueDate: new Date(),
};
const project = {
  type:"project",
  isSequential: true,
  children: [task, task],
  name: "Project name",
};
const folder = {
  type: "folder",
  children: [project],
  name: "Folder name",
  createdAt: new Date(),
  modifiedAt: new Date()
};
console.log(folder);
