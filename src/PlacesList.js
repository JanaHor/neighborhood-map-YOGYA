import React, { Component } from "react";

class PlacesList extends Component {
    state = {
        query: ""
    }

    render() {
        let locationVisible;
        if (this.state.query) {
            const match = new RegExp(this.state.query, "i")
            locationVisible = this.props.locations.filter((locations) => match.test(locations.titleType))
        } else {
            locationVisible = this.props.locations
        }

        return ( < div id = "list" >
            < input id = "search-field"
            type = "text"
            className = "search-box"
            aria-label = "search"
            role = "search"
            placeholder = "Find place"
            value = {
                this.props.query
            }
            tabIndex = "2"
            onChange = {
                (event) => {
                    this.setState({
                        query: event.target.value
                    }, () => {
                        this.props.onSetQuery(this.state.query)
                    })
                }
            }
            />

            < input type = "button"
            value = "Search"
            tabIndex = "0"
            onClick = {
                (e) => {
                    e.preventDefault();
                    this.props.onSetQuery(this.state.query)
                }
            }
            />

            < ul > {
                locationVisible.map((location) => ( <
                    li key = {
                        location.title
                    }
                    className = "locations"
                    tabIndex = "0"
                    onClick = {
                        (e) => {
                            this.props.openInfoWindow(location.marker)
                        }
                    } >
                    {
                        location.title
                    }
                    / {location.type} <
                    /li>
                ))
            } < /ul> <
            /div>
        )
    }
}

export default PlacesList