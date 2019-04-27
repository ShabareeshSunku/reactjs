import React, { Component } from 'react'
import FilterPopup from './FilterPopup'
export default class RefineSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            activeFilter: 'author'
        }
        this.showHideFilters = this.showHideFilters.bind(this)
        this.updateActiveFilter = this.updateActiveFilter.bind(this)
    }

    showHideFilters() {
        this.setState({
            show: !this.state.show
        })
    }
    updateActiveFilter(type) {
        this.setState({
            activeFilter: type
        })
    }
    render() {
        const {
            query = '',
            selectedauthor = '',
            selectedcategory = '',
            selectedpublisher = '',
            ...rest
        } = this.props
        const appliedFilters = [query, selectedauthor, selectedcategory, selectedpublisher]
        return (
            <div className='applied-filters'>
                {
                    this.state.show ? (
                        <FilterPopup
                            selectedauthor={selectedauthor}
                            selectedcategory={selectedcategory}
                            selectedpublisher={selectedpublisher}
                            showHideFilters={this.showHideFilters}
                            updateActiveFilter={this.updateActiveFilter}
                            activeFilter={this.state.activeFilter}
                            {...rest}
                        />
                    ) : null
                }
                {
                    appliedFilters.map(function (item, index) {
                        return (
                            item.length ? <span key={'' + index} className="chip">{item}</span> : null
                        )
                    })
                }
                <span className="chip" onClick={this.showHideFilters}>
                    <span className='fa fa-filter'></span> Refine Search
                </span>
            </div>
        )
    }
}
