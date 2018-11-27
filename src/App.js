import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import './App.css';
import result from './result.json';

import { SET_PLACE_RESULTS } from './reducers/MapAction';

import Map from './components/Map';
import ResultView from './components/ResultView';

result.restaurants.forEach((place, index) => {
  place.key = index;
});

const styles = (theme) => ({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  resultViewContainer: {
    width: 400,
    minWidth: 400,
    boxShadow: '-10px 0px 30px black',
    [theme.breakpoints.down('sm')]: {
      width: 300,
      minWidth: 300,
    },
    [theme.breakpoints.down('xs')]: {
      boxShadow: 'none',
      width: '100%',
      minWidth: '100%',
      height: '50vh',
    },
  },
  mapContainer: {
    height: '100%',
    width: '100%',
  },
});

class App extends Component {
  componentDidMount() {
    this.props.setSearchResult(result.restaurants);
  }

  render() {
    const { classes, selected, width } = this.props;
    let isMobile = isWidthDown('xs', width);

    const resultViewStyles = {};
    const mapStyles = {};

    if (selected && isMobile) {
      resultViewStyles.height = '100vh';
      mapStyles.height = '0';
    }

    return (
      <div className={classes.root}>
        <div className={classes.resultViewContainer} style={resultViewStyles}>
          <ResultView />
        </div>
        <div className={classes.mapContainer} style={mapStyles}>
          <Map />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selected: state.map.selectedPlace,
});

const mapActionToProps = (dispatch) => ({
  setSearchResult: (places) =>
    dispatch({
      type: SET_PLACE_RESULTS,
      places,
    }),
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(withWidth()(withStyles(styles)(App)));
