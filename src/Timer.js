import React, { Component } from 'react'
import LifeCycle from './LifeCycle'
export default class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        let me = this
        setInterval(function () {
            me.setState({
                date: new Date()
            })
        }, 10000)
    }

    render() {
        let date = this.state.date
        let color = this.props.color
        return (
            <div>
                <h1 style={{ color: color }}>{date.toString()}</h1>
                {
                    date.getSeconds()<=30 ? <LifeCycle key='lc' date={date}/> : null
                }
            </div>
        )
    }
}