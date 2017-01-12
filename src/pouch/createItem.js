import uuid from 'uuid';
import db from '../db';

export default function (parentProjectId, item) {
  return db.get(parentProjectId, { include_docs: true }).then((parentProject) => {
    if (parentProject.isProject === false) return Promise.reject('The parent project is not a project');
    const newItem = { ...item };
    newItem._id = uuid();
    console.log(newItem);

    parentProject.children.push(newItem._id);
    return Promise.all([
      db.put(newItem),
      db.put(parentProject),
    ]);
  }).then((thing) => console.log(thing)).catch((err) => {
    console.log(err);
  });
}
