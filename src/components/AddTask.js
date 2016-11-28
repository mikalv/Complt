import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import ActionLabel from 'material-ui/svg-icons/action/label';
import ContentSend from 'material-ui/svg-icons/content/send';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.valueChange = this.valueChange.bind(this);
    this.ActionLabelTap = this.ActionLabelTap.bind(this);
    this.submitTask = this.submitTask.bind(this);
  }
  valueChange(e) {
    this.setState({ value: e.target.value });
  }
  ActionLabelTap() {
    const value = this.state.value.trim();
    this.setState({ value: `${value} @` }, () => {
      this.valueInput.focus();
    });
  }
  submitTask(e) {
    e.preventDefault();
    const valueParts = this.state.value.split(' ');
    const task = {
      isProject: false,
      name: '',
      tags: [],
      createdAt: new Date().getTime(),
    };
    valueParts.forEach((part) => {
      if (part.startsWith('@')) {
        task.tags.push(part);
        return;
      }
      task.name += ` ${part}`;
    });
    task.name = task.name.trim();
    if (!task.name) {
      return;
    }
    this.props.onAddTask(task);
    this.setState({ value: '' });
  }
  render() {
    return (
      <form onSubmit={this.submitTask}>
        <Paper zDepth={2} style={{ padding: 10 }} className="drawer-margin">
          <TextField
            name="textInput"
            hintText="e.g. Finish Report @work"
            value={this.state.value}
            style={{ width: '100%' }}
            onChange={this.valueChange}
            ref={input => (this.valueInput = input)}
          />
          <br />
          <IconButton disableTouchRipple onTouchTap={this.ActionLabelTap}>
            <ActionLabel />
          </IconButton>
          <IconButton type="submit" style={{ float: 'right' }} disableTouchRipple>
            <ContentSend />
          </IconButton>
        </Paper>
      </form>

    );
  }
}

AddTask.propTypes = {
  onAddTask: React.PropTypes.func.isRequired,
};

export default AddTask;
