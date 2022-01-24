import React from 'react';
// import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Events from './components/Pages/Events';
import AnnualReport from './components/Pages/Annual';
import Teams from './components/Pages/Team';
import Blogs from './components/Pages/Blogs';
import SignUp from './components/Pages/Signup';

function App() {
return (
	<Router>
	<Navbar />
	<Switch>
		<Route path='/' exact component={Home} />
		<Route path='/about' component={About} />
		<Route path='/events' component={Events} />
		<Route path='/annual' component={AnnualReport} />
		<Route path='/team' component={Teams} />
		<Route path='/blogs' component={Blogs} />
		<Route path='/sign-up' component={SignUp} />
	</Switch>
	</Router>
);
}

export default App;
