import React from 'react'
import { Link } from 'react-router-dom'
import { cache } from '../config/graphql'
import { GET_WATCHLISTS } from '../queries'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function Cards({series}) {
  const history = useHistory()
  const existingWatchlists = cache.readQuery({
    query: GET_WATCHLISTS
  })

  function handleAddToWatchlists (series) {
    let newWatchlist = series

    if (existingWatchlists) {
      if (existingWatchlists.watchlists.length > 0) {
        let flag = false;
  
        existingWatchlists.watchlists.forEach(watchlist => {
          if (watchlist._id === newWatchlist._id) {
            flag = true
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              icon: 'error',
              title: `${newWatchlist.title} already on watchlists!`
            })
          }
  
          if (!flag) {
            cache.writeQuery({
              query: GET_WATCHLISTS,
              data: {
                watchlists: [newWatchlist, ...existingWatchlists.watchlists]
              }
            })
            Swal.fire({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              icon: 'success',
              title: `${newWatchlist.title} added to watchlists!`
            })

            history.push('/favorites')
          }
        })
      } else {
        cache.writeQuery({
          query: GET_WATCHLISTS,
          data: {
            watchlists: [newWatchlist, ...existingWatchlists.watchlists]
          }
        })

        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          icon: 'success',
          title: `${newWatchlist.title} added to watchlists!`
        })

        history.push('/favorites')
      }
    }
  }

  return (
    <div className="card mb-4 shadow">
      <h4 className="card-title text-center mt-3 mx-3 flex-wrap" style={{ width: "15rem" }}>{series.title}</h4>
      <div className="d-flex justify-content-center mt-4">
        <img className="img-fluid rounded shadow" src={series.poster_path} alt={series.title} />
      </div>
      <div className="card-block px-2 my-3">
        <div className="d-flex justify-content-center">
          <i className="bi bi-bookmark-star-fill" style={{fontSize: "24px", color: "#f1c40f"}}></i><p className="bold mt-1 mx-1">{series.popularity}</p>
        </div>
        <div>
          <p className="very-small-text flex-wrap mx-3" style={{width: "15rem" }} >Tags: {series.tags.join(', ')}</p>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button onClick={() => handleAddToWatchlists(series)} className="small-btn mx-2 shadow bold">Add Watchlist</button>
          <Link to={`/series/${series._id}`} className="small-btn mx-2 shadow bold">Detail</Link>
        </div>
      </div>
    </div>
  )
}
