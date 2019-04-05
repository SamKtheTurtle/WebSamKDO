import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import request module
import axios from 'axios';

// Import components
import NumberWidget from './NumberWidget';

class NumberWidgetContainer extends Component {
    constructor() {
        super();

        // Set initial state
        this.state = {
            followers: ' '
        }
        // Bind function to refer to component
        this.getData = this.getData.bind(this);
    }


    // Fetch new data
    getData() {
        // Tell the Widget component we're currently loading
        this.setState({ loading: true });

        // Fetch data
        return axios.get(this.props.href,{
            params: {
                firstName: 'Billie'
            }
        })
            .then(response => {
                // Build a new state
                let newState = { loading: false };

                if (response.data.hasOwnProperty("followers")) {
                    newState["followers"] = response.data.followers;
                }

                // Update state with data
                this.setState(newState);
            })
            .catch(error => {
                // At least tell the Widget component we have stopped loading
                console.log(error);
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            // Render the number widget
            <NumberWidget heading={this.props.heading} colspan={this.props.colspan} rowspan={this.props.rowspan} followers={this.state.followers} loading={this.state.loading} />
        );
    }
}

// Enforce the type of props to send to this component
NumberWidgetContainer.propTypes = {
    heading: PropTypes.string.isRequired,
    colspan: PropTypes.number.isRequired,
    rowspan: PropTypes.number.isRequired,
    href: PropTypes.string.isRequired
}

export default NumberWidgetContainer;