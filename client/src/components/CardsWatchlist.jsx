import React from 'react'
import { Link } from 'react-router-dom'
import { cache } from '../config/graphql'
import { GET_WATCHLISTS } from '../queries'
import Swal from 'sweetalert2'

export default function CardsFavorite ({watchlist}) {

  const existingWatchlists = cache.readQuery({
    query: GET_WATCHLISTS
  })

  function handleDeleteWatchlist (e, id) {
    e.preventDefault()
    if (existingWatchlists) {
      if (existingWatchlists.watchlists.length > 0) {
        let flag = false;
        let index = null;
        
        existingWatchlists.watchlists.forEach((existingWatchlists, i) => {
          if (existingWatchlists._id === id) {
            flag = true
            index = i
          }  
        })

        if (flag) {
          cache.writeQuery({
            query: GET_WATCHLISTS,
            data: {
              watchlists: [].concat(existingWatchlists.watchlists.slice(0, index), existingWatchlists.watchlists.slice(index + 1))
            }
          })
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            icon: 'success',
            title: `Delete the watchlist success!`
          })
        }
      }

    }
  }

  return (
    <div>
      <div className="card mb-4 shadow">
      <div className="card-header">
        <div className="d-flex justify-content-end">
          <a href="#" className="color-red bold">
            <i onClick={(e) => handleDeleteWatchlist(e, watchlist._id)} className="bi bi-x-square color-red"></i>
          </a>
        </div>
      </div>
      <h4 className="card-title text-center mt-3 mx-3 flex-wrap" style={{ width: "15rem" }}>{watchlist.title}</h4>
      <div className="d-flex justify-content-center mt-4">
        <img className="img-fluid rounded shadow" src={watchlist.poster_path} alt={watchlist.title} />
      </div>
      <div className="card-block px-2 my-3">
        <div className="d-flex justify-content-center">
          <i className="bi bi-bookmark-star-fill" style={{fontSize: "24px", color: "#f1c40f"}}></i><p className="bold mt-1 mx-1">{watchlist.popularity}</p>
        </div>
        <div>
          <p className="very-small-text flex-wrap mx-3" style={{width: "15rem" }} >Tags: {watchlist.tags.join(', ')}</p>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <Link to={`/movie/${watchlist._id}`} className="small-btn mx-2 shadow bold">Detail</Link>
        </div>
      </div>
    </div>
    </div>
  )
}
