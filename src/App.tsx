import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPenToSquare, faPlus, faTrashCan, faUserPen, faUserPlus, faUserXmark,
} from '@fortawesome/free-solid-svg-icons';

import Home from './pages/Home';
import Department from './pages/DepartmentPage';
import Employee from './pages/EmployeePage';
import Navigation from './components/Navigation';

import './App.css';

library.add(
  faPenToSquare, faPlus, faTrashCan, faUserPen, faUserXmark, faUserPlus,
);

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="container">
        <h1 className="m-3 d-flex justify-content-center">React JS in .NET?</h1>
      </div>

      <Navigation />

      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/departments" component={Department} />
        <Route path="/employees" component={Employee} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
