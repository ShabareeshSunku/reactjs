import React from 'react'
import SearchBox from './SearchBox'

function Header(props) {
    return (
        <header className="header">
            <div className="row header-inner">
                <div className="col-xs-12 col-sm-6 col-md-5 col-lg-5">
                    <div className="text-box">
                        <h1 className="heading-primary">
                            <span className="heading-primary-main">The Book Store</span>
                        </h1>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-7 col-lg-7">
                    <SearchBox {...props} />
                </div>
            </div>
        </header>
    )
}

export default Header