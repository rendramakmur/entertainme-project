import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_MOVIE, GET_MOVIES, EDIT_MOVIE } from '../queries'
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
import Error from '../components/Error'

export default function AddMovie() {
  const [movieInput, setInput] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: '',
    tags: ''
  })
  const { id } = useParams()
  const movie = useQuery(GET_MOVIE, {
    variables: {
      id: id
    }
  })

  const setInputFromQuery = () => {
    setInput(movie.data?.movie)
  }

  useEffect(() => {
    setInputFromQuery()
    return () => {
      setInput({})
    }
  }, [movie])

  const [editMovie, {loading, error}] = useMutation(EDIT_MOVIE, {
    refetchQueries: [
      { query: GET_MOVIES }
    ]
  })

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    let editedMovie = movieInput

    if (typeof editedMovie.popularity === 'string') {
      editedMovie.popularity = parseFloat(editedMovie.popularity)
    }

    if (typeof editedMovie.tags === 'string') {
      editedMovie.tags = editedMovie.tags.split(' ').join('').split(',')
    }

    if (editedMovie._id) {
      delete editedMovie._id
    }

    if (editedMovie.__typename) {
      delete editedMovie.__typename
    }

    editMovie({
      variables: {
        id: id,
        editedMovieInput: editedMovie
      }
    })

    setInput({
      title: '',
      overview: '',
      poster_path: '',
      popularity: '',
      tags: ''
    })

    history.push('/')

  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setInput({
      ...movieInput,
      [name]: value
    })
  }

  if (movie.loading || loading) {
    return (
      <Loading />
    )
  }

  if (movie.error || error) {
    return (
      <Error error={error} />
    )
  }

  return (
    <div className="container-fluid overlay d-flex row justify-content-center align-content-center overflow-auto mt-5" style={{paddingTop: "150px", paddingBottom: "50px"}}>
      <div className="row d-felx justify-content-center">
        <div className="col-sm-10" style={{height: "105vh"}}>
          <div className="card shadow-lg">
            <div>
              <h1 className="text-center my-5">Edit Movie</h1>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center">
                  <div className="form-floating mb-3 col-sm-4 mx-4">
                    <input onChange={handleInputChange} name="title" value={movieInput?.title || ''} type="text" className="form-control shadow" id="title" placeholder="Title" />
                    <label htmlFor="title">Title</label>
                  </div>
                </div>
                
                <div className="d-flex justify-content-center">
                  <div className="form-floating mb-3 col-sm-4 mx-4">
                    <input onChange={handleInputChange} name="overview" value={movieInput?.overview || ''} type="text" className="form-control shadow" id="overview" placeholder="Overview" />
                    <label htmlFor="overview">Overview</label>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <div className="form-floating mb-3 col-sm-4 mx-4">
                    <input onChange={handleInputChange} name="poster_path" value={movieInput?.poster_path || ''} type="text" className="form-control shadow" id="poster_path" placeholder="Image URL" />
                    <label htmlFor="poster_path">Poster Image URL</label>
                  </div>
                </div>
                
                <div className="d-flex justify-content-center">
                  <div className="form-floating mb-3 col-sm-4 mx-4">
                    <input onChange={handleInputChange} name="popularity" value={movieInput?.popularity || ''} type="number" step="0.01" className="form-control shadow" id="popularity" placeholder="Popularity" />
                    <label htmlFor="popularity">Popularity</label>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <div className="form-floating mb-3 col-sm-4 mx-4">
                    <input onChange={handleInputChange} name="tags" value={movieInput?.tags || ''} type="text" className="form-control shadow" id="title" placeholder="Title" />
                    <label htmlFor="title">Tags</label>
                    <div>
                      <p className="mt-1 very-small-text">Please, spearate by " , " for each tag.</p>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex justify-content-center">
                  <button href="#" className="medium-btn mx-2 my-3 shadow bold">Submit</button>
                </div>
                
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}