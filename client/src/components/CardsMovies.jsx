import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { DELETE_MOVIE, GET_WATCHLISTS, GET_MOVIES } from '../queries'
import Loading from './Loading'
import { cache } from '../config/graphql'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Error from '../components/Error'

export default function Cards({movie}) {
  const history = useHistory()
  const [deleteMovie, {loading, error}] = useMutation(DELETE_MOVIE, {
    fetchPolicy: 'network-only',
    refetchQueries: [
      { query: GET_MOVIES }
    ]
  })

  const existingWatchlists = cache.readQuery({
    query: GET_WATCHLISTS
  })

  function handleAddToWatchlists (movie) {
    let newWatchlist = movie

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

  function handleDeleteMovie (e, id) {
    e.preventDefault()
    deleteMovie({
      variables: {
        id
      }
    })
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      icon: 'success',
      title: `${movie.title} deleted successfully!`
    })
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  if (error) {
    return (
      <Error error={error} />
    )
  }

  return (
    <div className="card mb-4 shadow">
      <div className="card-header">
        <div className="d-flex justify-content-end">
          <Link to={`/${movie._id}`}><i className="bi bi-pencil-square mx-2 color-primary"></i></Link>
          <a href="#" className="color-red bold">
            <i onClick={(e) => handleDeleteMovie(e, movie._id)} className="bi bi-x-square color-red"></i>
          </a>
        </div>
      </div>
      <h4 className="card-title text-center mt-3 mx-3 flex-wrap" style={{ width: "15rem" }}>{movie.title}</h4>
      <div className="d-flex justify-content-center mt-4">
        <img className="img-fluid rounded shadow" src={movie.poster_path} alt={movie.title} />
      </div>
      <div className="card-block px-2 my-3">
        <div className="d-flex justify-content-center">
          <i className="bi bi-bookmark-star-fill" style={{fontSize: "24px", color: "#f1c40f"}}></i><p className="bold mt-1 mx-1">{movie.popularity}</p>
        </div>
        <div>
          <p className="very-small-text flex-wrap mx-3" style={{width: "15rem" }} >Tags: {movie.tags.join(', ')}</p>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button onClick={() => handleAddToWatchlists(movie)} className="small-btn mx-2 shadow bold">Add Watchlist</button>
          <Link to={`/movie/${movie._id}`} className="small-btn mx-2 shadow bold">Detail</Link>
        </div>
      </div>
    </div>
  )
}
