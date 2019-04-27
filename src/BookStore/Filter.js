import React, { Component } from 'react';

function FilterItem(props) {
    const {
        name = '',
        selected = '',
        type
    } = props

    return (
        <div className='filter-item' onClick={() => props.onFilterUpdate(name, type)}>
            <span className='filter-item-icon'>
                <span className={selected === name ? 'fa fa-check-square' : 'fa fa-square-o'}></span>
            </span>
            <span className='filter-item-text'>{name}</span>
        </div>
    )
}

export default class Filter extends Component {
   
    render() {
        const {
            items = '',
            type = '',
            selected = '',
            activeFilter = '',
            ...rest
        } = this.props
        const isActive = activeFilter === type
        return (
            <div className={`filter ${isActive ? 'filter-active' : ''}`}>
                <div className={`filter-item ${isActive ? 'filter-header-active' : ''}`} onClick={() => this.props.updateActiveFilter(type)}>
                    <span className='filter-item-text'><b>{type}</b></span>
                    <span className='filter-item-icon' style={{ float: 'right' }}>
                        <span className={isActive ? 'fa fa-angle-down' : 'fa fa-angle-down'}></span>
                    </span>
                </div>
                {
                    isActive && items.map(function (item, index) {
                        return (
                            <FilterItem key={'' + index} name={item} type={type} selected={selected} {...rest} />
                        )
                    })
                }
            </div>
        )
    }
}