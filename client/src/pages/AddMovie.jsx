import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_MOVIE, GET_MOVIES } from '../queries/'
import { useHistory } from 'react-router-dom'
import Loading from '../components/Loading'
import Error from '../components/Error'

export default function AddMovie() {
  const [movieInput, setInput] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: '',
    tags: ''
  })
  const [addMovie, {loading, error}] = useMutation(ADD_MOVIE, {
    refetchQueries: [
      { query: GET_MOVIES }
    ]
  })
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    let newMovie = movieInput

    if (typeof newMovie.popularity === 'string') {
      newMovie.popularity = parseFloat(newMovie.popularity)
    }

    if (typeof newMovie.tags === 'string') {
      newMovie.tags = newMovie.tags.split(' ').join('').split(',')
    }

    addMovie({
      variables: {
        newMovieInput: newMovie
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
    <div className="container-fluid">
      <div className="row" style={{height: "100vh"}}>
        <h1 className="text-center my-5">Add Movie</h1>
        <div className="d-flex row justify-content-around align-content-start flex-wrap">
          
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center">
              <div className="form-floating mb-3 col-sm-4">
                <input onChange={handleInputChange} name="title" value={movieInput.title} type="text" className="form-control shadow" id="title" placeholder="Title" />
                <label htmlFor="title">Title</label>
              </div>
            </div>
            
            <div className="d-flex justify-content-center">
              <div className="form-floating mb-3 col-sm-4">
                <input onChange={handleInputChange} name="overview" value={movieInput.overview} type="text" className="form-control shadow" id="overview" placeholder="Overview" />
                <label htmlFor="overview">Overview</label>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <div className="form-floating mb-3 col-sm-4">
                <input onChange={handleInputChange} name="poster_path" value={movieInput.poster_path} type="text" className="form-control shadow" id="poster_path" placeholder="Image URL" />
                <label htmlFor="poster_path">Poster Image URL</label>
              </div>
            </div>
            
            <div className="d-flex justify-content-center">
              <div className="form-floating mb-3 col-sm-4">
                <input onChange={handleInputChange} name="popularity" value={movieInput.popularity} type="number" step="0.01" className="form-control shadow" id="popularity" placeholder="Popularity" />
                <label htmlFor="popularity">Popularity</label>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <div className="form-floating mb-3 col-sm-4">
                <input onChange={handleInputChange} name="tags" value={movieInput.tags} type="text" className="form-control shadow" id="title" placeholder="Title" />
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
  )
}