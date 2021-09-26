import React from 'react';
import { Helmet } from "react-helmet-async";
import './app.scss';

import Routes from "../routes/routes";

function App() {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Inkito | Help authors get crypto currency rewards for their story</title>
        <meta name="description" content="Inkito is a comic and novel hosting powered by the Hive blockchain. Creators can earn crypto currency for their content in proportion to the attention received." />
      </Helmet>
      <Routes />
    </>
  );
}

export default App;
