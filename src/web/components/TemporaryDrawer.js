import { h, Component } from 'preact';
import cn from 'classnames';
import './TemporaryDrawer.scss';

const NavContainer = ({ children, className, ...props }) =>
  <div className={cn(className, 'NavContainer')} {...props}>
    {children}
  </div>;

const Backdrop = ({ children, className, ...props }) =>
  <div className={cn(className, 'Backdrop')} {...props}>
    {children}
  </div>;

export default class Drawer extends Component {
  setPosition = e => {
    if (this.isDragging) {
      e.preventDefault();
      const newX = e.touches[0].clientX;
      if (
        newX - this.startX + this.initialTransform < 0 &&
        newX - this.startX + this.initialTransform > -276
      ) {
        this.currentX = newX;
      }
    }
  };
  raf = false;
  isOpen = false;
  isDragging = false;
  oldTransform = -276;
  startDrag = e => {
    this.isDragging = true;
    this.initialTransform = this.isOpen ? 0 : -276;
    this.nav.base.classList.remove(
      'NavContainer--open',
      'NavContainer--closed'
    );
    this.backdrop.base.classList.remove('Backdrop--open', 'Backdrop--closed');
    this.nav.base.style.transform = `translateX(${this.initialTransform}px)`;
    this.backdrop.base.style.opacity = 1 - this.initialTransform / -276;
    this.startX = e.touches[0].clientX;
    this.currentX = this.startX;
    this.update();
  };
  endDrag = () => {
    this.startX = false;
    this.isDragging = false;
    if (this.isOpen === false) {
      if (this.currentTransform > -180) {
        this.isOpen = true;
      }
    } else if (this.currentTransform < -100) {
      this.isOpen = false;
    }
    this.nav.base.style.transform = '';
    this.backdrop.base.style.opacity = '';
    this.updateClasses();
  };
  updateClasses = () => {
    if (this.isOpen) {
      this.nav.base.classList.remove('NavContainer--closed');
      this.nav.base.classList.add('NavContainer--open');
      this.backdrop.base.classList.remove('Backdrop--closed');
      this.backdrop.base.classList.add('Backdrop--open');
    } else {
      this.nav.base.classList.remove('NavContainer--open');
      this.nav.base.classList.add('NavContainer--closed');
      this.backdrop.base.classList.remove('Backdrop--open');
      this.backdrop.base.classList.add('Backdrop--closed');
    }
  };
  toggleDrawer = () => {
    this.isOpen = !this.isOpen;
    this.updateClasses();
  };
  update = () => {
    if (this.isDragging) {
      const currentTransform =
        this.currentX - this.startX + this.initialTransform;
      if (currentTransform < 0 && currentTransform > -276) {
        this.currentTransform = currentTransform;
        this.nav.base.style.transform = `translateX(${this
          .currentTransform}px)`;
        this.backdrop.base.style.opacity = 1 - this.currentTransform / -276;
      }
      window.requestAnimationFrame(this.update);
    }
  };
  render({ children, ...props }) {
    return (
      <div>
        <Backdrop
          className="Backdrop--closed"
          ref={backdrop => {
            this.backdrop = backdrop;
          }}
        />
        <NavContainer
          ref={nav => {
            this.nav = nav;
          }}
          onTouchStart={this.startDrag}
          onTouchEnd={this.endDrag}
          onTouchMove={this.setPosition}
          onClick={this.toggleDrawer}
          className="NavContainer--closed"
        >
<<<<<<< HEAD
          <nav {...props} className="Nav mdc-temporary-drawer">
            {children}
          </nav>
=======
          <nav {...props} className="Nav">{children}</nav>
>>>>>>> parent of 8fde5fa... Use passive event listeners in TemporaryDrawer
        </NavContainer>
      </div>
    );
  }
}
