/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  FormInput,
  Button
} from "shards-react";

class Login extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         signInEmail: '',
         signInPassword: ''
      }
   }

   onEmailChange = (event) => {
      this.setState({signInEmail: event.target.value})
   }

   onPasswordChange = (event) => {
      this.setState({signInPassword: event.target.value})
   }

   onSubmitSignIn = () => {
      fetch('http://localhost:3000/login', {
         method: 'post',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            email: this.state.signInEmail,
            password: this.state.signInPassword
         })
      })
      .then(response => response.json())
      .then(user => {
         if (user.id) {
            this.props.loadUser(user);
            this.props.history.push('/analytics');
         }else {
            alert("Wrong email or password");
         }
      })
   }

render() {
   return(
      <Container fluid className="main-content-container h-100 pt-4 px-4">
         <Row noGutters className="h-100">
            <Col lg="3" md="5" className="auth-form mx-auto my-auto">
            <Card>
               <CardBody>
                  {/* Logo */}
                  <img
                  className="auth-form__logo d-table mx-auto mb-3"
                  src={require("../images/shards-dashboards-logo.svg")}
                  alt="Shards Dashboards - Login Template"
                  />

                  {/* Title */}
                  <h5 className="auth-form__title text-center mb-4">
                  Log In
                  </h5>

                  {/* Form Fields */}
                  <Form>
                  <FormGroup>
                     <label htmlFor="exampleInputEmail1">Email address</label>
                     <FormInput
                        type="email"
                        id="exampleInputEmail1"
                        placeholder="Enter email"
                        autoComplete="email"
                        onChange={this.onEmailChange}
                     />
                  </FormGroup>
                  <FormGroup>
                     <label htmlFor="exampleInputPassword1">Password</label>
                     <FormInput
                        type="password"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={this.onPasswordChange}
                     />
                  </FormGroup>
                  {/* <FormGroup>
                     <FormCheckbox>Remember me for 30 days.</FormCheckbox>
                  </FormGroup> */}
                  <Link to='/'>
                  <Button
                     pill
                     theme="accent"
                     className="d-table mx-auto"
                     type="submit"
                     onClick={this.onSubmitSignIn}
                  >
                     Log In
                  </Button>
                  </Link>
                  </Form>
               </CardBody>

               {/* Social Icons */}
               <CardFooter>
                  <ul className="auth-form__social-icons d-table mx-auto">
                  <li>
                     <a href="#">
                        <i className="fab fa-facebook-f" />
                     </a>
                  </li>
                  <li>
                     <a href="#">
                        <i className="fab fa-twitter" />
                     </a>
                  </li>
                  <li>
                     <a href="#">
                        <i className="fab fa-github" />
                     </a>
                  </li>
                  <li>
                     <a href="#">
                        <i className="fab fa-google-plus-g" />
                     </a>
                  </li>
                  </ul>
               </CardFooter>
            </Card>

            {/* Meta Details */}
            <div className="auth-form__meta d-flex mt-4">
               <Link to="/forgot-password">Forgot your password?</Link>
               <Link to="/register" className="ml-auto">
                  Create a new account?
               </Link>
            </div>
            </Col>
         </Row>
      </Container>
      );
   }
}

export default Login;
