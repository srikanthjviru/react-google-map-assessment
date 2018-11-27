import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

import Marker from './Marker';

const API_KEY = 'AIzaSyB5cw1fbGpv3_TCc085CfJnmkGA4zm-NCM';

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 32.950787,
      lng: -96.821118,
    },
    zoom: 11,
  };

  state = {
    center: {
      lat: 32.950787,
      lng: -96.821118,
    },
    zoom: 11,
  };

  componentDidMount() {
    this.updateBoundry();
  }

  componentDidUpdate(nextProps, nextState) {
    if (
      this.props.places !== nextProps.places ||
      this.props.selected !== nextProps.selected
    ) {
      this.updateBoundry();
    }
  }

  updateBoundry = () => {
    const { selected } = this.props;

    if (selected) {
      this.setState({
        center: {
          lat: selected.location.lat,
          lng: selected.location.lng,
        },
      });
    } else {
      let minLat = 180;
      let minLng = 180;
      let maxLat = -180;
      let maxLng = -180;
      const { places } = this.props;

      places.forEach((place) => {
        if (place.location.lat < minLat) {
          minLat = place.location.lat;
        }
        if (place.location.lng < minLng) {
          minLng = place.location.lng;
        }
        if (place.location.lat > maxLat) {
          maxLat = place.location.lat;
        }
        if (place.location.lng > maxLng) {
          maxLng = place.location.lng;
        }
      });

      const bounds = {
        nw: {
          lat: minLat,
          lng: minLng,
        },
        se: {
          lat: maxLat,
          lng: maxLng,
        },
      };

      const size = {
        width: 640, // Map width in pixels
        height: 380, // Map height in pixels
      };

      const { center, zoom } = fitBounds(bounds, size);

      // console.log('fitBounds', center, zoom);

      this.setState({
        zoom,
        center,
      });
    }
  };

  render() {
    const { selected, places } = this.props;
    const markers = places.map((place, index) => (
      <Marker
        key={index}
        lat={place.location.lat}
        lng={place.location.lng}
        place={place}
        selected={Boolean(selected) && selected.key === place.key}
      />
    ));

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          zoom={this.state.zoom}
          center={this.state.center}
        >
          {markers}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  places: state.map.places,
  selected: state.map.selectedPlace,
});

const mapActionToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapActionToProps
)(Map);
