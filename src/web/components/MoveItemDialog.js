import React from 'react';
import Dialog from 'preact-material-components/Dialog';
import { connect } from 'preact-redux';
import DialogContainer from './Dialog';
import mapDispatchToProps from '../../common/utils/mapDispatchToProps';
import itemsToTree from '../../common/utils/itemsToTree';
import MoveItemList from './MoveItemList';

export const moveItem = (handleMoveItem, id, parentProject) => newParent =>
  handleMoveItem(id, parentProject, newParent);

export const MoveItemDialog = props => (
  <DialogContainer
    id="Move Item Dialog"
    aria-describedby="MoveItemDialogHeader"
    visible={props.dialog.visible}
    onHide={props.hideMoveItemDialog}
  >
    <Dialog.Header id="MoveItemDialogHeader">Move to...</Dialog.Header>
    <Dialog.Body scrollable>
      <MoveItemList
        itemTree={props.itemTree}
        itemToMove={props.dialog.id}
        onChooseItem={moveItem(
          props.handleMoveItem,
          props.dialog.id,
          props.dialog.parentProject
        )}
      />
    </Dialog.Body>
    <Dialog.Footer>
      <Dialog.FooterButton
        type="button"
        cancel
        onClick={props.hideMoveItemDialog}
      >
        Cancel
      </Dialog.FooterButton>
    </Dialog.Footer>
  </DialogContainer>
);

export function mapStateToProps(state) {
  const itemTree = itemsToTree(state.items, 'root');
  return { dialog: state.dialogs.moveItem, itemTree };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveItemDialog);
