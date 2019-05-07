import React, { Component } from 'react'
import PageWrapper from './PageWrapper'
import { parseBook } from './helpers'
export default class BookPage extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        const { match = {} } = this.props
        const bookId = match.params && match.params.id || ''
        if (bookId) {
            fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
                .then(function (res) { return res.json() })
                .then(function (data) {
                    const parsedBook = parseBook(data)
                    console.log('===>parsedBook', parsedBook)
                })
        }
    }

    render() {
        console.log(this.props.match)
        return (
            <PageWrapper>
                <h2>I am in book page</h2>
            </PageWrapper>
        )
    }
}