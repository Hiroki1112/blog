import React from 'react'
import './Footer.css'

export default () => (
  <div>
    <footer className="footer">
      <br />
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved
        </span>
      </div>
    </footer>
  </div>
)
