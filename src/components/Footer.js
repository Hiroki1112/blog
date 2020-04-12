import React from 'react'
import './Footer.css'

export default () => (
  <div>
    <footer className="footer">
      <h2 className="taCenter">Follow Me!!</h2>
      <h3 className="taCenter">Twitter → <a href="https://twitter.com/Invest_archer12">ひろ@投資家プログラマー</a></h3>
      <h3 className="taCenter">Note → <a href="https://note.com/archerhiro">ひろ@投資家プログラマー</a></h3>
      <br />
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved
        </span>
      </div>
    </footer>
  </div>
)
