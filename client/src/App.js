import { ApolloProvider } from '@apollo/client/react'
import client from './config/graphql'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddMovie from './pages/AddMovie'
import Detail from './pages/Detail'
import Favorites from './pages/Favorites'
import EditMovie from './components/EditMovie'

function App() {
  return (
  <Router>
    <ApolloProvider client={client}>
      <Navbar />
      <Switch>
        <Route path="/series/:id">
          <Detail />
        </Route>
        <Route path="/movie/:id">
          <Detail />
        </Route>
        <Route path="/add-movie">
          <AddMovie />
        </Route>
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route path="/:id">
          <EditMovie />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </ApolloProvider>
  </Router>
  );
}

export default App;
