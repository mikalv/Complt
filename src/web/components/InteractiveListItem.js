/** @jsx h */
import { h } from 'preact';
import MaterialComponent from 'preact-material-components/MaterialComponent';

export default class InteractiveListItem extends MaterialComponent {
  constructor() {
    super();
    this.componentName = 'list-item';
  }
  componentDidMount() {
    super.attachRipple();
  }
  materialDom(props) {
    return ( // eslint-disable-next-line no-return-assign
      <a role="option" {...props} ref={control => this.control = control}>
        {props.children}
      </a>
    );
  }
}
