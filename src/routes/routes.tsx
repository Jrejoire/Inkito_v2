import 'core-js';
import React, { useEffect } from 'react';
import StoreContext from '../stores/appStore';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Reader from "./reader";

const Routes = () => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    // getUserDetail();

    // //store.temporalLogin();
    // store.toggleNavMenu(false);
    // store.checkCookieConsent();

    // if (store.loginLink === "") {
    //   store.initHSLogin();
    // }

    window.addEventListener('keydown', handleFirstTab);
    // window.addEventListener('scroll', handleScroll);
    return () => {
      // window.removeEventListener('scroll', handleScroll); 
      window.removeEventListener('keydown', handleFirstTab);
    }
  })

  const handleFirstTab = (e) => {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }

  // const handleScroll = () => {
  //   var st = document.documentElement.scrollTop;
  //   if (st > 400) {
  //     store.toggleLogin(false);
  //   }

  // }

  // const getUserDetail = () => {
  //   const accessToken = localStorage.getItem('access-token');
  //   const user = localStorage.getItem('users');
  //   if (accessToken && user) {
  //     store.getUserDetail(JSON.parse(accessToken), JSON.parse(user));
  //   } else {
  //     store.getUserDetail();
  //   }
  // }

  return (
    <Router basename='/'>
      <div className="routes overflow-x-hidden">
        <Switch >
          <Route path={'/comic-reader'}>
            <Reader type={"comics" as string} />
          </Route>
          {/* <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/comics">
            <FullDisplay type={"comics"} />
          </Route>
          <Route exact path="/novels">
            <FullDisplay type={"novels"} />
          </Route>
          <Route path="/novelReader">
            <Reader type={"novels"} />
          </Route>
          <Route path="/@*">
            <ProfilePage />
          </Route>
          <Route path="/publish*">
            <PublishPage />
          </Route>  
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/faq">
            <Faq />
          </Route>
          <Route component={Page404} /> */}
        </Switch>
        {/* <Footer />
        <CookieBanner /> */}
      </div>
    </Router>
  );

}

export default Routes;
