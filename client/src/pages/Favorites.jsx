import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_WATCHLISTS } from '../queries'
import Loading from '../components/Loading'
import Error from '../components/Error'
import CardsWatchlist from '../components/CardsWatchlist'
import { Link } from 'react-router-dom'

export default function Favorites() {
  const [executeQuery ,{data, loading, error}] = useLazyQuery(GET_WATCHLISTS, {fetchPolicy: 'network-only'})

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
    <div className="container-fluid">
      <div className="row">
        <h1 className="text-center my-5">Favorites</h1>
        <div className="d-flex justify-content-around align-content-start flex-wrap overflow-auto" style={{height: "100vh"}}>
        
        {
          data?.watchlists?.length > 0 ?
          data?.watchlists?.map((watchlist, i) => (
            <CardsWatchlist watchlist={watchlist} key={i} />
          ))
          :
          <div className="d-flex justify-content-center">
            <h6 className="text-center">You dont have watchlist yet, select your watchlist <Link to="/" className="bold">here!</Link> </h6>
          </div>
        }

        </div>
      </div>
    </div>
  )
}
