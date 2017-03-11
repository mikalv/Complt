import React from 'react';
import Link from 'react-router-dom/Link';
import { connect } from 'react-redux';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import getFilteredItems from '../../common/utils/getFilteredItems';

export const Tags = props => (
  <List>
    {props.tags.map(tag =>
      <ListItem
        key={tag}
        primaryText={tag}
        component={Link}
        to={`/tag/${tag}`}
      />,
    )}
  </List>
);

Tags.propTypes = {
  tags: React.PropTypes.arrayOf(React.PropTypes.string),
};

export function mapStateToProps(state) {
  const tags = [];
  getFilteredItems(state.items, state.itemsToShow).forEach((item) => {
    if (!Array.isArray(item.tags)) return;
    item.tags.forEach((tag) => {
      if (!tags.includes(tag)) tags.push(tag);
    });
  });
  return { tags };
}

export default connect(mapStateToProps)(Tags);
