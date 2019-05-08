import React, { PureComponent } from 'react'

export default class BookViewer extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
        this.initialize = this.initialize.bind(this)
    }

    nextStep(viewer) {
        const me = this
        window.setTimeout(function () {
            viewer.nextPage();
            me.nextStep(viewer);
        }, 3000);
    }
    initialize() {
        const me = this
        const viewer = new window.google.books.DefaultViewer(me.elm);
        viewer.load(me.props.bookId, function(err){
            console.log(err)
        });
    }
    componentDidMount() {
        const me = this
        const googlescript = new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://www.google.com/books/jsapi.js'
            script.id = 'google-script'
            script.type = 'text/javascript'
            script.async = true
            script.onload = resolve
            script.onerror = reject
            script.integrity = ''
            const fs = document.getElementsByTagName('script')[0]
            fs.parentNode.insertBefore(script, fs)
        })

        googlescript.then(function () {
            window.google.books.load();
            window.google.books.setOnLoadCallback(me.initialize);
        })
    }

    render() {
        return (
            <div
                ref={(c) => this.elm = c}
                style={{ width: '100%', height: '98vh', margin: 'auto' }}
                id="viewerCanvas"
            ></div>
        )
    }
}
