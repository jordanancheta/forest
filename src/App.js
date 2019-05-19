import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/main.scss";


class App extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         user: {
            id: '',
            fristName: '',
            lastName: '',
            email: '',
            password: '',
            organization: ''
         }
      }
   }

   loadUser = (data) => {
      this.setState({user: {
         id: data.id,
         fristName: data.fristName,
         lastName: data.lastName,
         email: data.email,
         password: data.password,
         organization: data.organization
      }})
   }

   render() {
   return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
         <div>
            {routes.map((route, index) => {
            return (
               <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={withTracker(props => {
                  return (
                     <route.layout {...props}>
                        <route.component loadUser = {this.loadUser} {...props} />
                     </route.layout>
                  );
                  })}
               />
            );
            })}
         </div>
      </Router>
      );
   }
}

export default App;