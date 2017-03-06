import React from 'react';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons';
import Toolbar from 'react-md/lib/Toolbars';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import itemsToTree from '../../common/utils/itemsToTree';
import MoveItemList from './MoveItemList';
import PropTypes from '../../common/PropTypes';

export const moveItem = (handleMoveItem, id, parentProject) => newParent =>
handleMoveItem(id, parentProject, newParent);

export const MoveItemDialog = props => (
  <Dialog
    id="Move Item Dialog"
    aria-describedby="MoveItemDialogToolbar"
    visible={props.dialog.visible}
    onHide={props.hideMoveItemDialog}
    fullPage
  >
    <Toolbar id="MoveItemDialogToolbar" title="Move to..." actions={[<Button flat label="Cancel" onClick={props.hideMoveItemDialog} />]} />
    <MoveItemList
      itemTree={props.itemTree}
      itemToMove={props.dialog.id}
      onChooseItem={moveItem(props.handleMoveItem, props.dialog.id, props.dialog.parentProject)}
    />
  </Dialog>
);

MoveItemDialog.propTypes = {
  itemTree: PropTypes.item,
  hideMoveItemDialog: React.PropTypes.func,
  handleMoveItem: React.PropTypes.func,
  dialog: React.PropTypes.shape({
    visible: React.PropTypes.bool,
    id: React.PropTypes.string,
    parentProject: React.PropTypes.string,
  }),
};

export function mapStateToProps(state) {
  const itemTree = itemsToTree(state.items, 'root');
  return { dialog: state.dialogs.moveItem, itemTree };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveItemDialog);
