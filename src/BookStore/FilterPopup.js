import React from 'react'
import Filter from './Filter'
export default function FilterPopup(props) {
    const {
        filters = {},
        selectedauthor = '',
        selectedcategory = '',
        selectedpublisher = '',
        activeFilter = 'author'
    } = props
    return (
        <div className='popup'>
            <div className='popup-content'>
                <div className='popup-header'>
                    <span>Filters</span>
                    <span className='popup-header-button' onClick={props.clearFilters}><span className="fa fa-trash"></span> Clear All</span>
                </div>
                <Filter
                    items={filters.authors}
                    type='author'
                    selected={selectedauthor}
                    onFilterUpdate={props.onFilterUpdate}
                    active={true}
                    updateActiveFilter={props.updateActiveFilter}
                    activeFilter={activeFilter}
                />
                <Filter
                    items={filters.publishers}
                    type='publisher'
                    selected={selectedpublisher}
                    onFilterUpdate={props.onFilterUpdate}
                    updateActiveFilter={props.updateActiveFilter}
                    activeFilter={activeFilter}
                />
                <Filter
                    items={filters.categories}
                    type='category'
                    selected={selectedcategory}
                    onFilterUpdate={props.onFilterUpdate}
                    updateActiveFilter={props.updateActiveFilter}
                    activeFilter={activeFilter}
                />
                <div className="done-button" onClick={props.showHideFilters}>Done</div>
            </div>
        </div>
    )
}
