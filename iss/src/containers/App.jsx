import React, { Component } from 'react';
import './App.css'
import mapboxgl from 'mapbox-gl';
import Header from '../components/Header'

mapboxgl.accessToken = 'pk.eyJ1IjoiZG9yb2JhbnR1biIsImEiOiJja2MwdnEzc20xNTI3MzBuNHlndDhkdjF6In0.ABVT9PxRdE1QJRm_yCuOgA'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 0,
            lat: 0,
            zoom: 1,
        }
    }

    componentDidMount() {
        this.generateMap()
        this.fetch()
        this.changeHeading()
    }


    generateMap = () => {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
        })

        const map = this.map
        return map

    }

    addMarker = (map) => {

        let el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(this.el)
            .setLngLat([this.state.lng, this.state.lat])
            .addTo(this.map)
    }


    fetch = () => {
        fetch('http://api.open-notify.org/iss-now.json')
            .then(response => {
                return response.json()
            })
            .then(position => {
                return this.setState({ lng: position.iss_position.longitude, lat: position.iss_position.latitude })
            })
    }


    wrapperFunction = () => {
        this.fetch();
        this.addMarker();
    }


    changeHeading = () => {
        setTimeout(this.fetch, 2000)
        setTimeout(this.changeHeading, 2000);
        document.getElementById('Header').innerText = `ISS Position: Longitude ${this.state.lng}  | Latitude  ${this.state.lat}`;
        document.getElementById('Header').textContent = `ISS Position: Longitude ${this.state.lng}  | Latitude  ${this.state.lat}`;
    }

    render() {
        return (
            <div className="tc">
                <div ref={el => this.mapContainer = el} className='mapContainer' />
                    <button onClick={this.wrapperFunction} className='button f7 link dim ph3 pv2 mb2 dib white bg-black'>Marker on map!</button>
                    <Header position={this.state}/>
            </div >
        )
    }
}

export default App;

