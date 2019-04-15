import React, { Component } from 'react'

export default class LifeCycle extends Component {
    constructor(props) {
        super(props)
        console.log('===> Constructor LifeCycle Method')
    }

    componentWillMount() {
        console.log('===> componentWillMount LifeCycle Method')
    }

    render() {
        console.log('===> render LifeCycle Method')
        return <div></div>
    }

    componentDidMount(){
        console.log('===> componentDidMount LifeCycle Method')
    }
    
    componentWillReceiveProps(nextProps){
        console.log('===> componentWillReceiveProps LifeCycle Method', this.props.date, nextProps.date)
    }

    componentWillUpdate(nextProps, nextState){
        console.log('===> componentWillUpdate LifeCycle Method', this.props.date, nextProps.date)
    }
    
    componentDidUpdate(prevProps, prevState){
        console.log('===> componentDidUpdate LifeCycle Method', this.props.date, prevProps.date)
    }
    componentWillUnmount(){
        console.log('===> componentWillUnmount LifeCycle Method')
    }
    
}