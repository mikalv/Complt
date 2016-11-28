import React, { Component } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import ChipInput from 'material-ui-chip-input';

class AddItem extends Component {
  constructor(props) {
    super(props);
    if (props.item) {
      this.state = props.item;
    } else {
      this.state = {
        isProject: false,
        name: '',
        tagsInput: '',
        tags: [],
        isSequential: true,
      };
    }
    this.isProjectChange = this.isProjectChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.isSequentialChange = this.isSequentialChange.bind(this);
    this.addTag = this.addTag.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
  }
  isProjectChange(e) {
    let isProject;
    if (e.target.value === 'true') {
      isProject = true;
    }
    if (e.target.value === 'false') {
      isProject = false;
    }
    this.setState({ isProject });
  }
  nameChange(e) {
    this.setState({ name: e.target.value });
  }
  addTag(tag) {
    const tags = this.state.tags;
    if (tags.indexOf(tag) !== -1) {
      return;
    }
    tags.push(tag);
    this.setState({ tags });
  }
  deleteTag(tag) {
    const tags = this.state.tags;
    tags.splice(tags.indexOf(tag), 1);
    this.setState({ tags });
  }
  isSequentialChange(e) {
    this.setState({ isSequential: e.target.checked });
  }
  addItem() {
    const name = this.state.name;
    if (name.replace(/\s+/g, '')) {
      const item = {
        isProject: this.state.isProject,
        name: this.state.name,
        createdAt: new Date().getTime(),
      };
      if (!this.state.isProject) {
        item.tags = this.state.tags;
      }
      if (this.state.isProject) {
        item.isSequential = this.state.isSequential;
      }
      this.props.onAdd(item);
      this.setState({
        isProject: false,
        name: '',
        tagsInput: '',
        tags: [],
        isSequential: true,
      });
    }
  }
  render() {
    return (
      <div>
        <RadioButtonGroup
          name="typesdfsdft" onChange={this.isProjectChange}
          valueSelected={String(this.state.isProject)}
        >
          <RadioButton
            value="false"
            label="Task"
          />
          <RadioButton
            value="true"
            label="Project"
          />
        </RadioButtonGroup>
        <TextField
          onChange={this.nameChange}
          value={this.state.name}
          floatingLabelText="Name"
        />
        {!this.state.isProject ? (<div>
          <ChipInput
            floatingLabelText="Tags"
            value={this.state.tags}
            onRequestAdd={tag => this.addTag(tag)}
            onRequestDelete={tag => this.deleteTag(tag)}
          />
        </div>) : <div>
          <Toggle
            onToggle={this.isSequentialChange}
            toggled={this.state.isSequential}
            label="Should This Project Be Sequential?"
            labelPosition="right"
          />
        </div>}
        <br />
        <FlatButton onClick={this.addItem} label="Add" />
      </div>
    );
  }
}

AddItem.propTypes = {
  onAdd: React.PropTypes.func,
  item: React.PropTypes.shape({}),
};

export default AddItem;
