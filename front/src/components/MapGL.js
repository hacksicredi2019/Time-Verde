/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import 'mapbox-gl/dist/mapbox-gl.css';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import LocationOnIcon from '@material-ui/icons/LocationOn';


const MAPTOKEN = 'pk.eyJ1IjoibHVjYXNwcm9jb3BpbyIsImEiOiJjanlpZ2VzZW8wYTJ5M25wNjgyYWJpajJ4In0.20zwEWbus5sLGYqDRLzzpQ';

class MapGL extends Component {
  state = {
    viewport: {
      width: '80%',
      height: window.innerHeight,
      latitude: -30.0277,
      longitude: -51.2287,
      zoom: 12,
    },
    user: {
      latitude: 0,
      longitude: 0,
    },
    address: 'Rua Presidente Vargas 892 - RS, 94470-100, Brasil',
  };


  componentDidMount() {
    this.askPosition();
    window.addEventListener('resize', this.resizeWindow);
    const addressEnconded = encodeURIComponent(this.state.address);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEnconded}`,
      )
      .then((res) => {
        if (!isEmpty(res.data.results)) {
          const { location } = res.data.results[0].geometry;
          const user = {
            latitude: location.lat,
            longitude: location.lng,
          };
          this.setState({ user });
        }
      });
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeWindow);
  }

  askPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const user = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      this.setState({ user });
    });
  };


  resizeWindow = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        height: window.innerHeight,
        width: '100%',
      },
    });
  };

  render() {
    const {
      user: { latitude, longitude },
    } = this.state;

    const { addresses } = this.props;

    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={MAPTOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => this.setState({ viewport })}
        {...this.props}
      >
        <Marker
          className="userLocation"
          latitude={latitude}
          longitude={longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <PersonPinIcon />
        </Marker>
        {addresses.filter((address) => !!address.id && !!address.latitude && !!address.longitude)
          .map((location) => (
            <Marker
              className="schoolLocation"
              key={location.id}
              latitude={location.latitude}
              longitude={location.longitude}
            >
              <LocationOnIcon />
            </Marker>
          ))}
      </ReactMapGL>
    );
  }
}

export default MapGL;
