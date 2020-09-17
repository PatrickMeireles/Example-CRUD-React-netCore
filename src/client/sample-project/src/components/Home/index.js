import React from 'react';

import { Link, withRouter } from "react-router-dom";

const Home = () => (
    <>
    <h1> Home Here
    </h1>
    </>
);

const showHome = withRouter(Home);

export default (showHome);