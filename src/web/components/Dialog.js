/** @jsx h */
import { h, Component } from 'preact';
import MDDialog from 'preact-material-components/Dialog';

class Dialog extends Component {
  componentDidMount() {
    if (this.props.visible) {
      this.openDialog();
    }
    this.updateDialogState();
  }
  componentDidUpdate() {
    this.updateDialogState();
  }
  componentWillUnmount() {
    this.closeDialog();
  }
  updateDialogState = () => {
    if (this.props.visible) {
      this.openDialog();
    } else {
      this.closeDialog();
    }
  };
  openDialog = () => {
    this.dialog.MDComponent.show();
    this.dialog.MDComponent.listen('MDCDialog:accept', this.props.onHide);
    this.dialog.MDComponent.listen('MDCDialog:cancel', this.props.onHide);
  };
  closeDialog = () => {
    this.dialog.MDComponent.close();
  };
  render({ children, visible, ...props }) {
    return (
      <MDDialog
        ref={dialog => {
          this.dialog = dialog;
        }}
        {...props}
      >
        {visible ? children : null}
      </MDDialog>
    );
  }
}

export default Dialog;
