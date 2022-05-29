import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Landing from './Pages/Landing';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import People from './Pages/People';
import Person from './Pages/Person';
import TV from './Pages/TV';
import Movie from './Pages/Movie';
import { Fragment } from 'react';
import ScrollToTop from './Components/ScrollToTop';
import SearchResult from './Pages/SearchResult';
import Signup from './Pages/Signup';
import Pricing from './Pages/Pricing';
import Login from './Pages/Login';
import { useSelector } from 'react-redux';
import Preferences from './Pages/Preferences';
import { getPreferences } from './apis';

function App() {
  const { token, user } = useSelector((state) => state.userDetails);
  const [state, setState] = useState({});

  useEffect(() => {
    if (user) fetchUserPreferences();
  }, [user]);

  const fetchUserPreferences = () => {
    getPreferences(user.id).then((res) => {
      setState(res);
    });
  };

  let view;

  let authenticatedRoutes = (
    <>
      <Route exact path='/'>
        <Landing languages={state && state.languages} genres={state && state.genres} />
      </Route>
      <Route path='/people'>
        <People />
      </Route>
      <Route path='/person/:idAndName'>
        <Person />
      </Route>
      <Route path='/tv/:tvId'>
        <TV />
      </Route>
      <Route path='/movie/:movieId'>
        <Movie />
      </Route>
      <Route path='/search/:currentView'>
        <SearchResult />
      </Route>
      <Route path='/pricing'>
        <Pricing />
      </Route>
      <Route path='/preferences'>
        <Preferences />
      </Route>
      <Route exact path='*'>
        <Redirect to={'/'} />
      </Route>
    </>
  );

  let unauthenticatedRoutes = (
    <>
      <Route exact path='/'>
        <Landing />
      </Route>
      <Route path='/people'>
        <People />
      </Route>
      <Route path='/pricing'>
        <Pricing />
      </Route>
      <Route path='/person/:idAndName'>
        <Person />
      </Route>
      <Route path='/tv/:tvId'>
        <TV />
      </Route>
      <Route path='/movie/:movieId'>
        <Movie />
      </Route>
      <Route path='/signup/:subscriptionName'>
        <Signup />
      </Route>
      <Route path='/search/:currentView'>
        <SearchResult />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route exact path='*'>
        <Redirect to={'/'} />
      </Route>
    </>
  );

  if (token) {
    view = authenticatedRoutes;
  } else {
    view = unauthenticatedRoutes;
  }
  return (
    <Router>
      <div className=''>
        <Navbar />
        <Fragment>
          <ScrollToTop />
          <Switch>{view}</Switch>
        </Fragment>
      </div>
    </Router>
  );
}

export default App;
