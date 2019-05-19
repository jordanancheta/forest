/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  Button
} from "shards-react";
import { Link } from "react-router-dom";

class Register extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         email: '',
         password: '',
         firstName: '',
         lastName: '',
         organization: '',
      }
   }

   onFirstNameChange = (event) => {
      this.setState({firstName: event.target.value})
   }

   onLastNameChange = (event) => {
      this.setState({lastName: event.target.value})
   }

   onOrganizationChange = (event) => {
      this.setState({organization: event.target.value})
   }

   onEmailChange = (event) => {
      this.setState({email: event.target.value})
   }

   onPasswordChange = (event) => {
      this.setState({password: event.target.value})
   }

   onSubmitSignIn = () => {
      fetch('http://localhost:3000/register', {
         method: 'post',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            organization: this.state.organization
         })
      })
      .then(response => response.json())
      .then(user => {
         if (user) {
            this.props.loadUser(user)
            this.props.history.push('/analytics')
         }
      })
   }

   render() {
      return(
         <Container fluid className="main-content-container h-100 pt-4 px-4">
            <Row noGutters className="h-100">
               <Col lg="12" md="6" className="auth-form mx-auto my-auto">
               <Card>
                  <CardBody>
                     {/* Logo */}
                     <img
                     className="auth-form__logo d-table mx-auto mb-3"
                     src={require("../images/shards-dashboards-logo.svg")}
                     alt="Shards Dashboards - Register Template"
                     />

                     {/* Title */}
                     <h5 className="auth-form__title text-center mb-4">
                     Create New Account
                     </h5>

                     {/* Form Fields */}
                     <Form>
                        <Row form noGutters>
                           <Col lg="12">
                              <Row form>

                                 <Col md="6" className="form-group">
                                    <FormGroup>
                                       <label htmlFor="firstName">First Name</label>
                                       <FormInput
                                          type="text"
                                          id="firstName"
                                          placeholder="Enter First Name"
                                          autoComplete="firstName"
                                          onChange={this.onFirstNameChange}
                                       />
                                    </FormGroup>
                                    </Col>
                                    <Col md="6" className="form-group">
                                    <FormGroup>
                                       <label htmlFor="lastName">Last Name</label>
                                       <FormInput
                                          type="text"
                                          id="lastName"
                                          placeholder="Enter Last Name"
                                          autoComplete="lastName"
                                          onChange={this.onLastNameChange}
                                       />
                                    </FormGroup>
                                 </Col>
                                 <Col md="6" className="form-group">
                                    <FormGroup>
                                       <label htmlFor="lastName">Organization Name</label>
                                       <FormInput
                                          type="text"
                                          id="orgName"
                                          placeholder="Enter Organization Name"
                                          autoComplete="orgName"
                                          onChange={this.onOrganizationChange}
                                       />
                                    </FormGroup>
                                    </Col>
                                    <Col md="6" className="form-group">
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
                                    </Col>
                                    <Col md="6" className="form-group">
                                    <FormGroup>
                                       <label htmlFor="exampleInputPassword1">Password</label>
                                       <FormInput
                                          type="password"
                                          id="exampleInputPassword1"
                                          placeholder="Password"
                                          autoComplete="new-password"
                                          onChange={this.onPasswordChange}
                                       />
                                    </FormGroup>
                                    </Col>
                                    <Col md="6" className="form-group">
                                    <FormGroup>
                                       <label htmlFor="exampleInputPassword2">Repeat Password</label>
                                       <FormInput
                                          type="password"
                                          id="exampleInputPassword2"
                                          placeholder="Repeat Password"
                                          autoComplete="new-password"
                                          onChange={this.onPasswordChange}
                                       />
                                    </FormGroup>
                                    </Col>
                              
                              
                                    {/* <FormGroup>
                                       <FormCheckbox>
                                          I agree with the <a href="#">Terms & Conditions</a>.
                                       </FormCheckbox>
                                    </FormGroup> */}
                                    <Link to='/'>
                                    <Button
                                       pill
                                       theme="accent"
                                       className="d-table mx-auto"
                                       type="submit"
                                       onClick = {this.onSubmitSignIn}
                                    >
                                       Create Account
                                     </Button>
                                     </Link>
                               </Row>
                           </Col>
                         </Row>
                     </Form>
                  </CardBody>

                  {/* Social Icons */}
                  {/* <CardFooter>
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
                  </CardFooter> */}
               </Card>

               {/* Meta Details */}
               <div className="auth-form__meta d-flex mt-4">
                  <Link to="/forgot-password">Forgot your password?</Link>
                  <Link to="/login" className="ml-auto">
                     Sign In
                  </Link>
               </div>
            </Col>
            </Row>
         </Container>
      );
   }
}
export default Register;
