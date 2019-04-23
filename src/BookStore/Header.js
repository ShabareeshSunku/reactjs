import React from 'react'
import Search from './Search'

function Header(props) {
    return (
        <header className="header">
            <div style={{position:'relative'}}>
                <div className="brand-box">
                    <span className="brand">Orielly</span>
                </div>
                <div className='searchbox-container'>
                    <Search {...props}/>
                </div>
            </div>
            <div className="text-box">
                <h1 className="heading-primary">
                    <span className="heading-primary-main">The Book Store</span>
                    <span className="heading-primary-sub">The ultimate destination for a Bookworm</span>
                </h1>
            </div>
        </header>
    )
}

export default Header