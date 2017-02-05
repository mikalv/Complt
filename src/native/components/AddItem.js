import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import { IconToggle } from 'react-native-material-ui';
import colors from '../../common/colors';
import processItem from '../../common/utils/processItem';


class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isProject: props.initialIsProject,
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
    this.setState({ value: `${value} @` });
  }
  submitItem() {
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
      <KeyboardAvoidingView behavior="padding" elevation={5} style={styles.container}>
        <View style={styles.flex}>
          <TextInput
            returnKeyType="send"
            style={styles.flex}
            underlineColorAndroid={colors.primary}
            value={this.state.value}
            onChangeText={this.valueChange}
            onSubmitEditing={this.submitItem}
            placeholder={this.state.isProject ? 'e.g. Report' : 'e.g. Finish Report @work'}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.flex}>
            {!this.state.isProject ? <IconToggle name="label" onPress={this.ActionLabelTap} /> : null}
          </View>
          <View style={styles.flexEnd}>
            {this.props.canChangeType ? <IconToggle onPress={this.switchType} name={this.state.isProject ? 'assignment' : 'done'} /> : null}
            <IconToggle onPress={this.submitItem} name="send" />
          </View>
        </View>
      </KeyboardAvoidingView>);
  }
}

AddItem.propTypes = {
  onAddItem: React.PropTypes.func,
  initialIsProject: React.PropTypes.bool,
  canChangeType: React.PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  flexEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default AddItem;
