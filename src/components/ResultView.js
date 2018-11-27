import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Typography, AppBar, Toolbar, Zoom } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { SET_SELECTED_PLACE } from '../reducers/MapAction';
import ResultListView from './ResultListView';
import ResultDetailView from './ResultDetailView';

class ResultView extends Component {
  render() {
    const { selected } = this.props;
    const isDetailView = Boolean(selected);

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <AppBar position="relative">
          <Toolbar>
            <Zoom in={isDetailView} mountOnEnter unmountOnExit>
              <IconButton
                style={{ marginLeft: -12, marginRight: 20 }}
                color="inherit"
                aria-label="Menu"
                onClick={this.props.backToList}
              >
                <ArrowBackIcon />
              </IconButton>
            </Zoom>
            <Typography variant="h6" color="inherit">
              {isDetailView ? selected.name : 'Restaurants'}
            </Typography>
          </Toolbar>
        </AppBar>
        {!isDetailView && <ResultListView />}
        {isDetailView && <ResultDetailView />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selected: state.map.selectedPlace,
});

const mapActionToProps = (dispatch) => ({
  backToList: () =>
    dispatch({
      type: SET_SELECTED_PLACE,
      place: null,
    }),
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(ResultView);
