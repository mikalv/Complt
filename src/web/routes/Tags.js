import { h } from 'preact';
import { connect } from 'preact-redux';
import List from 'preact-material-components/List';
import LinkListItem from '../components/LinkListItem';
import getFilteredItems from '../../common/utils/getFilteredItems';
import deferComponentRender from '../deferComponentRender';

export const Tags = props => (
  <List className="flex-child">
    {props.tags.map(tag => (
      <LinkListItem href={`/tag/${tag}`} key={tag}>{tag}</LinkListItem>
    ))}
  </List>
);

export function mapStateToProps(state) {
  const tags = [];
  getFilteredItems(state.items, state.itemsToShow).forEach(item => {
    if (!Array.isArray(item.tags)) return;
    item.tags.forEach(tag => {
      if (tags.indexOf(tag) === -1) tags.push(tag);
    });
  });
  return { tags };
}

export default deferComponentRender(connect(mapStateToProps)(Tags));
