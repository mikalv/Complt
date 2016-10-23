import React, { Component } from 'react';
import Button from '../ui/Button';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'task',
      name: '',
      description: '',
      contextsInput: '',
      contexts: [],
      isSequential: true,
    };
    this.typeChange = this.typeChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.contextsChange = this.contextsChange.bind(this);
    this.isSequentialChange = this.isSequentialChange.bind(this);
  }
  typeChange(e) {
    this.setState({ type: e.target.value });
  }
  nameChange(e) {
    this.setState({ name: e.target.value });
  }
  contextsChange(e) {
    const contextsInput = e.target.value;
    const contexts = [];
    contextsInput.replace(/\s+/g, '').split(',').map(context => contexts.push(context));
    this.setState({ contexts, contextsInput });
  }
  descriptionChange(e) {
    this.setState({ description: e.target.value });
  }
  isSequentialChange(e) {
    this.setState({ isSequential: e.target.checked });
  }
  addItem() {
    const name = this.state.name;
    if (name.replace(/\s+/g, '')) {
      const item = {
        type: this.state.type,
        name: this.state.name,
      };
      if (this.state.type === 'task') {
        item.contexts = this.state.contexts;
        item.description = this.state.description;
      }
      if (this.state.type === 'project') {
        item.isSequential = this.state.isSequential;
      }
      this.props.onAdd(item);
      this.setState({
        type: 'task',
        name: '',
        description: '',
        contextsInput: '',
        contexts: [],
        isSequential: true,
      });
    }
  }
  render() {
    return (
      <div>
        <input
          id="typeSelectionTask" type="radio" name="typeSelection"
          value="task" onChange={this.typeChange} checked={this.state.type === 'task'}
        />
        <label htmlFor="typeSelectionTask">Task</label>
        <input
          id="typeSelectionProject" type="radio" name="typeSelection"
          value="project" onChange={this.typeChange} checked={this.state.type === 'project'}
        />
        <label htmlFor="typeSelectionProject">Project</label>
        <input
          id="typeSelectionFolder" type="radio" name="typeSelection"
          value="folder" onChange={this.typeChange} checked={this.state.type === 'folder'}
        />
        <label htmlFor="typeSelectionFolder">Folder</label>
        <br />
        <input type="text" onChange={this.nameChange} value={this.state.name} placeholder="Name" />
        {this.state.type === 'task' ? (<div>
          <input
            type="text" onChange={this.descriptionChange}
            value={this.state.description} placeholder="Description"
          />
          <br />
          <input
            type="text" onChange={this.contextsChange}
            value={this.state.contextsInput} placeholder="Contexts (comma seperated)"
          />
        </div>) : ''}
        {this.state.type === 'project' ?
          <div>
            <br />
            <input
              type="checkbox" id="isSequential" onChange={this.isSequentialChange}
              checked={this.state.isSequential}
            />
            <label htmlFor="isSequential">Should This Project Be Sequential?</label>
          </div>
          : ''}
        <br />
        <Button onClick={this.addItem}>Add</Button>
      </div>
    );
  }
}

AddItem.propTypes = {
  onAdd: React.PropTypes.func,
};

export default AddItem;
