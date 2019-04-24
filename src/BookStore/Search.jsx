import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: props.query
        }
        this._onChange = this._onChange.bind(this)
        this._onSubmit = this._onSubmit.bind(this)
    }

    _onSubmit(ev) {
        const query = this.state.query
        if(typeof this.props.onSearch === 'function') {
            this.props.onSearch(query)
        }
        ev.preventDefault();
    }
    _onChange(ev) {
        this.setState({
            query: ev.target.value
        })
    }
    render() {
        return (
            <form onSubmit={this._onSubmit} autoComplete="off">
                <input
                    type="text"
                    name="search"
                    placeholder="Search books and more..."
                    onChange={this._onChange}
                    autoComplete="off"
                    value={this.state.query}>
                </input>
            </form>
        )
    }
}
