import React, { Component } from 'react';
import PlaceIcon from '@material-ui/icons/Place';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const styles = {
  popup: {
    position: 'absolute',
    top: -80,
    left: -100,
    width: 200,
    zIndex: 1000,
    '&:before': {
      content: "' '",
      position: 'absolute',
      top: '100%',
      left: '100px',
      width: '0',
      borderTop: '20px solid white',
      borderLeft: '10px solid transparent',
      borderRight: '10px solid transparent',
    },
  },
};

class Marker extends Component {
  render() {
    const { selected, place } = this.props;
    const size = 'default';

    return (
      <div>
        <PlaceIcon
          style={{
            transform: `scale(${selected ? 2 : 1}, ${selected ? 2 : 1})`,
            transformOrigin: '50% 100% 0px',
          }}
          color="secondary"
          fontSize={size}
        />
        {selected && (
          <div
            className={this.props.classes.popup}
          >
            <Paper style={{ padding: 8 }}>
              <Typography>{place.name}</Typography>
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Marker);
