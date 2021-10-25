import React, { Component } from 'react'
import loader from './loader.gif'

export class Spinnner extends Component {
    render() {
        return (
            <div className="text-center align-middle">
                <img src={loader} alt="loader"/>
            </div>
        )
    }
}

export default Spinnner
