import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: props.query
        }
        this._onChange = this._onChange.bind(this)
        this._onSubmit = this._onSubmit.bind(this)
    }

    _onSubmit(ev) {
        const query = this.state.query || ''
        const encodedQuery = query.replace(/^\s+|\s+$|\s+(?=\s)/g, '').split(' ').join('+')
        const { history = {} } = this.props
        if (encodedQuery.length) {
            history.push(`search?q=${encodedQuery}`)
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
            <form onSubmit={this._onSubmit} autoComplete="off" className='searchbox-container'>
                <span className='fa fa-search searchIcon'></span>
                <input
                    className="searchbox"
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

export default withRouter(Search)