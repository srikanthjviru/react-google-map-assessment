import React from 'react';
import { connect } from 'react-redux';

import { List, ListItem, Typography, ListItemIcon } from '@material-ui/core';
import PlaceIcon from '@material-ui/icons/Place';
import CallIcon from '@material-ui/icons/Call';

const ResultDetailView = (props) => {
  const { place } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflowX: 'auto',
      }}
    >
      <img alt="restaurant" src={place.backgroundImageURL} width="100%" />
      <List>
        <ListItem dense>
          <ListItemIcon>
            <PlaceIcon />
          </ListItemIcon>
          <Typography>{place.location.formattedAddress}</Typography>
        </ListItem>
        {Boolean(place.contact) && (
          <ListItem dense>
            <ListItemIcon>
              <CallIcon />
            </ListItemIcon>
            <Typography>{place.contact.formattedPhone}</Typography>
          </ListItem>
        )}
      </List>
    </div>
  );
};

const mapStateToProps = (state) => ({
  place: state.map.selectedPlace,
});

const mapActionToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapActionToProps
)(ResultDetailView);
