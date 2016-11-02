import React, { Component } from 'react';
import AddTask from './AddTask';
import ItemList from './ItemList';

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
    this.addTask = this.addTask.bind(this);
    this.handleItemAvatarTap = this.handleItemAvatarTap.bind(this);
  }
  componentWillMount() {
    const tasks = window.localStorage.inboxTasks;
    if (tasks) {
      this.setState({ tasks: JSON.parse(tasks) });
    }
  }
  addTask(task) {
    this.setState({ tasks: [...this.state.tasks, task] }, () => {
      window.localStorage.inboxTasks = JSON.stringify(this.state.tasks);
    });
  }
  handleItemAvatarTap(index) {
    const tasks = this.state.tasks;
    tasks[index].isCompleted = !tasks[index].isCompleted;
    this.setState({ tasks }, () => {
      window.localStorage.inboxTasks = JSON.stringify(this.state.tasks);
    });
  }
  render() {
    return (
      <div>
        <ItemList items={this.state.tasks} onItemAvatarTap={this.handleItemAvatarTap} style={{ marginBottom: '116px', height: '100%' }} />
        <div className="add-task">
          <AddTask onAddTask={this.addTask} />
        </div>
      </div>
    );
  }
}

export default Inbox;
