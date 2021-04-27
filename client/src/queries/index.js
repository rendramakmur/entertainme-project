import { gql } from '@apollo/client'

export const GET_MOVIES_SERIES = gql`
  query GetMoviesSeries {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_MOVIES = gql`
  query GetMovies {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_MOVIE = gql`
  query GetMovie($id: ID) {
    movie(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_SERIES = gql`
  query GetSeries {
    tvSeries {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_SPESIFIC_SERIES = gql`
  query GetSpesificSeries($id: ID) {
    series(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const ADD_MOVIE = gql`
  mutation AddMovie($newMovieInput: MovieInput) {
    addMovie(newMovie: $newMovieInput) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID) {
    deleteMovie(id: $id) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const EDIT_MOVIE = gql`
  mutation EditMovie ($id: ID, $editedMovieInput: MovieInput) {
    editMovie(id: $id, editedMovie: $editedMovieInput) {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_WATCHLISTS = gql`
  query GetWatchlists {
    watchlists @client {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`