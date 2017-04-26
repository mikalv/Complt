/** @jsx h */
import { h } from 'preact';
import UpdateItemDialog from './UpdateItemDialog';
import MoveItemDialog from './MoveItemDialog';

const Dialogs = () => (
  <div>
    <UpdateItemDialog />
    <MoveItemDialog />
  </div>
);

export default Dialogs;
