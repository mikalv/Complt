import getItemsByUserAndIds from '../lib/getItemsByUserAndIds';
import Task from './Task';
import Project from './Project';

export function taskTagsResolver({ tags }) {
  return tags || [];
}
export function projectIsSequentialResolver(obj) {
  if (obj) {
    if (obj.projectType === 'seq') {
      return true;
    }
    if (obj.projectType === 'para') {
      return false;
    }
  }
  return null;
}
export function projectChildrenResolver(obj) {
  if (!obj.children) return [];
  return getItemsByUserAndIds(obj.owner, obj.children);
}
export function itemTypeResolver(value) {
  if (value.isProject) {
    return Project;
  }
  return Task;
}
