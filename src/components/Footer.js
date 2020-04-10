import React from 'react'
import './Footer.css'

export default () => (
  <div>
    <h2 className="taCenter">
      Follow Me!!{' '}
      <a href="https://twitter.com/Invest_archer12">ひろ@投資家プログラマー</a>
    </h2>
    <br />
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved
        </span>
      </div>
    </footer>
  </div>
)
