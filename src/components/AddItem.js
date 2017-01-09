import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import ActionLabel from 'material-ui/svg-icons/action/label';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionDone from 'material-ui/svg-icons/action/done';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import processItem from '../utils/processItem';
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
    const item = processItem(this.state.value, this.state.type);
    if (!item) return;
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
        <Paper zDepth={2} style={{ padding: 10 }} className="md-drawer-relative">
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
                <IconButton type="submit" disableTouchRipple>
                  <ContentSend />
                </IconButton>
                {this.props.canChangeType ? <IconButton
                  disableTouchRipple
                  onTouchTap={this.switchType}
                >
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
