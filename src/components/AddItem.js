import React, { Component } from 'react';
import TextField from 'react-md/lib/TextFields';
import Paper from 'react-md/lib/Papers';
import Button from 'react-md/lib/Buttons';
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
  valueChange(value) {
    this.setState({ value });
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
              placeholder={this.state.type === 'Project' ? 'e.g. Report' : 'e.g. Finish Report @work'}
              value={this.state.value}
              onChange={this.valueChange}
              ref={input => (this.valueInput = input)}
            />
            <div className="flex row space-between">
              <div>
                {this.state.type === 'Project' ? null : <Button icon onClick={this.ActionLabelTap}>
                  label
                </Button>}
              </div>
              <div>
                <Button icon primary type="submit">
                  send
                </Button>
                {this.props.canChangeType ? <Button icon onClick={this.switchType}>
                  {this.state.type === 'Project' ? 'done' : 'assignment'}
                </Button> : null}
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
