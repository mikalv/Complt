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
      isProject: props.initalIsProject,
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
    const item = processItem(this.state.value, this.state.isProject);
    if (!item) return;
    this.setState({ value: '' });
    this.props.onAddItem(item);
  }
  switchType() {
    this.setState({ isProject: !this.state.isProject });
  }
  render() {
    return (
      <form onSubmit={this.submitItem}>
        <Paper zDepth={2} style={{ padding: 10, backgroundColor: '#fff' }} className="md-drawer-relative">
          <div className="flex column">
            <TextField
              placeholder={this.state.isProject ? 'e.g. Report' : 'e.g. Finish Report @work'}
              value={this.state.value}
              onChange={this.valueChange}
              ref={input => (this.valueInput = input)}
            />
            <div className="flex row space-between">
              <div>
                {this.state.isProject ? null : <Button icon onClick={this.ActionLabelTap}>
                  label
                </Button>}
              </div>
              <div>
                {this.props.canChangeType ? <Button icon onClick={this.switchType}>
                  {this.state.isProject ? 'done' : 'assignment'}
                </Button> : null}
                <Button icon primary type="submit">
                  send
                </Button>
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
  initalIsProject: React.PropTypes.bool,
  canChangeType: React.PropTypes.bool,
};

export default AddItem;
