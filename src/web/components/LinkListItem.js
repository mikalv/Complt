import { h } from 'preact';
import { Link } from 'preact-router';
import MaterialComponent from 'preact-material-components/MaterialComponent';

export default class LinkListItem extends MaterialComponent {
  constructor() {
    super();
    this.componentName = 'list-item';
  }
  componentDidMount() {
    super.attachRipple();
  }
  materialDom({ Component = Link, ...props }) {
    return (
      <Component
        {...props}
        ref={control => {
          this.control = control;
        }}
      >
        {props.children}
      </Component>
    );
  }
}
