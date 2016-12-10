import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import ActionLabel from 'material-ui/svg-icons/action/label';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDone from 'material-ui/svg-icons/action/done';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import './AddItem.css';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      type: props.initialType || 'Task',
    };
    this.valueChange = this.valueChange.bind(this);
    this.ActionLabelTap = this.ActionLabelTap.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.switchType = this.switchType.bind(this);
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
  submitItem(e) {
    e.preventDefault();
    let item;
    if (this.state.type === 'Project') {
      item = {
        __typename: 'Project',
        name: '',
      };
    } else {
      item = {
        __typename: 'Task',
        name: '',
        tags: [],
      };
    }
    if (item.tags) {
      const valueParts = this.state.value.split(' ');
      valueParts.forEach((part) => {
        if (part.startsWith('@')) {
          item.tags.push(part);
          return;
        }
        item.name += ` ${part}`;
      });
    } else item.name = this.state.value;
    item.name = item.name.trim();
    if (!item.name) return;
    this.setState({ value: '' });
    this.props.onAddItem(item);
  }
  switchType() {
    if (this.state.type === 'Project') {
      this.setState({ type: 'Task' });
    } else {
      this.setState({ type: 'Project' });
    }
  }
  render() {
    return (
      <form onSubmit={this.submitItem}>
        <Paper zDepth={2} style={{ padding: 10 }} className="drawer-margin">
          <div className="flex column">
            <TextField
              name="textInput"
              hintText={this.state.type === 'Project' ? 'e.g. Report' : 'e.g. Finish Report @work'}
              value={this.state.value}
              style={{ width: '100%' }}
              onChange={this.valueChange}
              ref={input => (this.valueInput = input)}
            />
            <div className="flex row space-between">
              <div>
                {this.state.type === 'Project' ? null : <IconButton disableTouchRipple onTouchTap={this.ActionLabelTap}>
                  <ActionLabel />
                </IconButton>}
              </div>
              <div>
                <IconButton type="submit" style={{ float: 'right' }} disableTouchRipple>
                  <ContentSend />
                </IconButton>
                {this.props.canChangeType ? <IconButton style={{ float: 'right' }} disableTouchRipple onTouchTap={this.switchType}>
                  {this.state.type === 'Project' ? <ActionDone /> : <ActionAssignment />}
                </IconButton> : null}
              </div>
            </div>
          </div>
        </Paper>
      </form>

    );
  }
}

AddItem.propTypes = {
  onAddItem: React.PropTypes.func.isRequired,
  initialType: React.PropTypes.oneOf(['Project', 'Task']),
  canChangeType: React.PropTypes.bool,
};

export default AddItem;
