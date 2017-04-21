import React from 'react';
import { connect } from 'react-redux';
import List from 'preact-material-components/List';
import LinkListItem from '../components/LinkListItem';
import getFilteredItems from '../../common/utils/getFilteredItems';
import areInitialItemsLoaded from '../../common/utils/areInitialItemsLoaded';
import Loading from '../components/Loading';

export const Tags = props => (
  <List className="flex-child">
    {props.tags.map(tag =>
      <LinkListItem
        to={`/tag/${tag}`}
        key={tag}
      >{tag}</LinkListItem>,
    )}
  </List>
);

export function mapStateToProps(state) {
  const tags = [];
  getFilteredItems(state.items, state.itemsToShow).forEach((item) => {
    if (!Array.isArray(item.tags)) return;
    item.tags.forEach((tag) => {
      if (tags.indexOf(tag) === -1) tags.push(tag);
    });
  });
  return { tags };
}

export default areInitialItemsLoaded(connect(mapStateToProps)(Tags), Loading);
