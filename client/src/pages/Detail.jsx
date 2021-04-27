import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useParams, useRouteMatch } from 'react-router-dom'
import { GET_MOVIE, GET_SPESIFIC_SERIES, GET_WATCHLISTS } from '../queries'
import { useQuery } from '@apollo/client'
import Loading from '../components/Loading'
import { cache } from '../config/graphql'
import Swal from 'sweetalert2'

export default function Detail() {
  const { path } = useRouteMatch()
  const { id } = useParams()
  const series = useQuery(GET_SPESIFIC_SERIES, {
    variables: {
      id: id
    }
  })
  const movie = useQuery(GET_MOVIE, {
    variables: {
      id: id
    }
  })
  const existingWatchlists = cache.readQuery({
    query: GET_WATCHLISTS
  })
  const history = useHistory()

  function handleAddToWatchlists (data) {
    let newWatchlist = data

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

  
  if (series.loading || movie.loading) {
    return (
      <Loading />
    )
  }
    
  let data = null
  if (path.includes('/movie')) {
    data = movie.data.movie;
  } else {
    data = series.data.series;
  }

  return (
    <div className="container-fluid mb-5 overflow-auto">
      <h1 className="text-center my-5">{data.title}</h1>
      <div className="row">
        <div className="col-sm-6">
          <div className="d-flex justify-content-center">
            <img className="img-fuild rounded shadow" src={data.poster_path} alt={data.title}/>
          </div>
          <div className="d-flex justify-content-center">
            <button onClick={() => handleAddToWatchlists(data)} className="small-btn shadow mx-1 my-3">Add to Watchlist</button>
          </div>
        </div>
        <div className="col-sm-5">
          <ul className="list-group list-group-flush">
            <li className="list-group-item bold">Title:
              <div>
                <p>{data.title}</p>
              </div>
            </li>
            <li className="list-group-item bold">Overview:
              <div>
                <p>{data.overview}</p>
              </div>
            </li>
            <li className="list-group-item bold">Popularity:
              <div>
                <p>{data.popularity}</p>
              </div>
            </li>
            <li className="list-group-item bold">Tags:
              <div>
                <p>{data.tags.join(', ')}</p>
              </div>
            </li>
            <Link to="/" className="medium-btn shadow mx-1 my-3 text-center">Back to Home</Link>
          </ul>
        </div>
      </div>
    </div>
  )
}
