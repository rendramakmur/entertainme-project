import React, { useEffect } from 'react'
import CardsMovies from '../components/CardsMovies'
import CardsSeries from '../components/CardsSeries'
import Loading from '../components/Loading'
import { useLazyQuery } from '@apollo/client'
import { GET_MOVIES_SERIES } from '../queries'
import Error from '../components/Error'

export default function Movies() {
  const [executeQuery, { data, loading, error }] = useLazyQuery(GET_MOVIES_SERIES, {fetchPolicy: 'network-only'})
  
  useEffect(() => {
    executeQuery()
  }, [executeQuery])

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
    <div className="homepage">

      <div className="container-fluid" id="movies">
        <div className="row">
          <h1 className="text-center my-5">Movies</h1>
          <div className="d-flex justify-content-around align-content-start flex-wrap">

            {
              data?.movies?.map((movie, i) => (
                <CardsMovies movie={movie} key={i} ></CardsMovies>
              ))
            }

          </div>
        </div>
      </div>

      <div className="container-fluid" id="series">
        <div className="row">
          <h1 className="text-center my-5">Series</h1>
          <div className="d-flex justify-content-around align-content-start flex-wrap">

          {
              data?.tvSeries?.map((series, i) => (
                <CardsSeries series={series} key={i} ></CardsSeries>
              ))
            }

          </div>
        </div>
      </div>
    </div>
  )
}
