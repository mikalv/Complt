import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return { initialItemsLoaded: state.syncState.initialItemsLoaded };
}

const connectLoading = connect(mapStateToProps);

const areInitialItemsLoaded = (ActualComponent, LoadingComponent) =>
  connectLoading(({ initialItemsLoaded, ...props }) => {
    if (initialItemsLoaded) return <ActualComponent {...props} />;
    return <LoadingComponent {...props} />;
  });

export default areInitialItemsLoaded;
