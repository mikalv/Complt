/** @jsx h */
import { h } from 'preact';
import Link from 'react-router-dom/es/Link';
import MaterialComponent from 'preact-material-components/MaterialComponent';

export default class LinkListItem extends MaterialComponent {
  constructor() {
    super();
    this.componentName = 'list-item';
  }
  componentDidMount() {
    super.attachRipple();
  }
  materialDom(props) {
    return ( // eslint-disable-next-line no-return-assign
      <Link role="option" {...props} ref={control => this.control = control}>
        {props.children}
      </Link>
    );
  }
}
