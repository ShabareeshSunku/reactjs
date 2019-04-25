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
                {
                    selected === name ? <span className='fa fa-check'></span> : null
                }
            </span>
            <span className='filter-item-text'>{name}</span>
        </div>
    )
}

export default class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }

    render() {
        const {
            items = '',
            type = '',
            selected = '',
            ...rest
        } = this.props
        const isActive = this.state.active
        return (
            <div className={`filter ${isActive ? 'filter-active' : 'filter-inactive'}`}>
                <div className='filter-item' onClick={() => this.setState({ active: !isActive })}>
                    <span className='filter-item-icon'>
                        <span className={isActive ? 'fa fa-sort-asc' : 'fa fa-sort-desc'}></span>
                    </span>
                    <span className='filter-item-text'>{selected ? selected : '--choose ' + type + ' --'}</span>
                </div>
                {
                    items.map(function (item, index) {
                        return (
                            <FilterItem key={'' + index} name={item} type={type} selected={selected} {...rest} />
                        )
                    })
                }
            </div>
        )
    }
}