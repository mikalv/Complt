import React, { Component } from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class AddItem extends Component {
  constructor(props) {
    super(props);
    if (props.item) {
      this.state = props.item;
    } else {
      this.state = {
        isProject: false,
        name: '',
        description: '',
        contextsInput: '',
        contexts: [],
        isSequential: true,
      };
    }
    this.isProjectChange = this.isProjectChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.contextsChange = this.contextsChange.bind(this);
    this.isSequentialChange = this.isSequentialChange.bind(this);
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
        isProject: this.state.isProject,
        name: this.state.name,
        createdAt: new Date().toUTCString(),
      };
      if (!this.state.isProject) {
        item.contexts = this.state.contexts;
        item.description = this.state.description;
      }
      if (this.state.isProject) {
        item.isSequential = this.state.isSequential;
      }
      this.props.onAdd(item);
      this.setState({
        isProject: false,
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
          <TextField
            onChange={this.descriptionChange}
            value={this.state.description} floatingLabelText="Description"
          />
          <br />
          <TextField
            onChange={this.contextsChange}
            value={this.state.contextsInput} floatingLabelText="Contexts (comma seperated)"
          />
        </div>) :
          <div>
            <Checkbox
              onCheck={this.isSequentialChange}
              checked={this.state.isSequential}
              label="Should This Project Be Sequential?"
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
