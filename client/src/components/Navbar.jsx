import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow">
      <div className="container-fluid">
        <Link className="navbar-brand color-secondary bold" to="/">WATCHUDOIN</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link color-secondary" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link color-secondary" href="#movies">Movies</a>
            </li>
            <li className="nav-item">
              <a className="nav-link color-secondary" href="#series">Series</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link color-secondary" to="/add-movie">Add Movies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link color-secondary" to="/favorites">Watchlists</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
