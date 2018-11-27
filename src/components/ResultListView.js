import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, Typography, Divider } from '@material-ui/core';

import { SET_SELECTED_PLACE } from '../reducers/MapAction';

const ResultListView = (props) => {
  const { places, onSelectPlace } = props;
  return (
    <div style={{ display: 'flex', flex: 1, overflowX: 'auto' }}>
      <List>
        {places.map((place, index) => (
          <React.Fragment key={index}>
            {index !== 0 && <Divider />}
            <ListItem
              button
              style={{
                alignItems: 'flex-start',
              }}
              onClick={() => onSelectPlace(place)}
            >
              <div style={{ flex: 1 }}>
                <Typography variant="subtitle1">{place.name}</Typography>
                <Typography variant="caption">
                  {place.location.formattedAddress}
                </Typography>
              </div>
              <div>
                <img
                  alt="img"
                  src={place.backgroundImageURL}
                  style={{ width: 72, height: 72 }}
                />
              </div>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => ({
  places: state.map.places,
});

const mapActionToProps = (dispatch) => ({
  onSelectPlace: (place) =>
    dispatch({
      type: SET_SELECTED_PLACE,
      place,
    }),
});

export default connect(
  mapStateToProps,
  mapActionToProps
)(ResultListView);
