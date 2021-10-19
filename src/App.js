import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Department from "./pages/Department";
import Employee from "./pages/Employee";
import Navigation from "./components/Navigation";

import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<div className="container">
				<h1 className="m-3 d-flex justify-content-center">React JS in .NET?</h1>
			</div>

			<Navigation></Navigation>

			<Switch>
				<Route path="/" component={Home} exact />
				<Route path="/departments" component={Department} />
				<Route path="/employees" component={Employee} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
