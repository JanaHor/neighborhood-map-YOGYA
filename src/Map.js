import React, { Component } from "react"

class Map extends Component {
    matchMarkers = () => {
        if (!this.props.map) {
            return;
        }
        if (this.props.query !== "") {
            const matches = this.props.locations.filter(
                (location) => location.titleType.toLowerCase().search(this.props.query.toLowerCase()) !== -1)
            if (matches.length === 1 && matches[0].marker) {
                this.placeMarkers(matches)
                if (matches[0].marker.getAnimation() === null) {
                    this.props.openInfoWindow(matches[0].marker)
                }
            } else if (matches.length > 1) {
                matches.forEach(match => {
                    if (match.marker.getAnimation() !== null) {
                        this.props.openInfoWindow(match.marker)
                    }
                })
                this.placeMarkers(matches)
            } else {
                this.placeMarkers(this.props.locations)
            }
        } else {
            this.placeMarkers(this.props.locations)
        }
    }

    placeMarkers = (visibleMarkers) => {
        this.props.locations.forEach((location) => {
            if (visibleMarkers.indexOf(location) !== -1) {
                if (location.marker.map !== this.props.map) {
                    location.marker.setMap(this.props.map)
                }
            } else {
                location.marker.setMap(null)
            }
        })
    }

    render() {
        this.matchMarkers()
        return ( <
            div id = "map"
            role = "application" > < /div>
        )
    }
}

export default Map