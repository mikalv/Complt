import reducer from '../drawer';
import { toggleDrawer, dockDrawer } from '../actions';

describe('drawerReducer', () => {
  it('should return the inital state', () => {
    expect(reducer(undefined, {})).toEqual({
      isDocked: false,
      isOpen: false,
    });
  });
  it('should handle TOGGLE_DRAWER when it is undocked', () => {
    expect(reducer(undefined, toggleDrawer())).toEqual({
      isDocked: false,
      isOpen: true,
    });
  });
  it('should handle TOGGLE_DRAWER when it is docked', () => {
    expect(reducer({
      isDocked: true,
      isOpen: true,
    }, toggleDrawer())).toEqual({
      isDocked: true,
      isOpen: true,
    });
  });
  it('should handle DOCK_DRAWER with shouldDock = true', () => {
    expect(reducer(undefined, dockDrawer(true))).toEqual({
      isDocked: true,
      isOpen: true,
    });
  });
  it('should handle DOCK_DRAWER with shouldDock = false', () => {
    expect(reducer(undefined, dockDrawer(false))).toEqual({
      isDocked: false,
      isOpen: false,
    });
  });
});
