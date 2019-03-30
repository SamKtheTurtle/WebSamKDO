import React, { Component } from 'react';
import { registerArtist } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      birth: '',
      followers: '',
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  onSubmit = e => {
    e.preventDefault();
   
    const newArtist = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birth: this.state.birth,
      followers: this.state.followers
    };
    console.log('submited');
    registerArtist(newArtist);
    alert('You just added an Artist to our database!')
  }
  

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <p className="lead text-center">
                Add an artist to our list
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="First Name"
                  name="firstName"
                  type= "text"
                  value={this.state.firstName}
                  onChange={this.onChange}
                  error={errors.firstName}
                />
                <TextFieldGroup
                  placeholder="Last Name"
                  name="lastName"
                  type= "text"
                  value={this.state.lastName}
                  onChange={this.onChange}
                  error={errors.lastName}
                />
                <TextFieldGroup
                  placeholder="Date of birth YYYY-MM-DD"
                  name="birth"
                  type="birth"
                  value={this.state.birth}
                  onChange={this.onChange}
                  error={errors.birth}
                />
                <TextFieldGroup
                  placeholder="Followers"
                  name="followers"
                  value={this.state.followers}
                  onChange={this.onChange}
                  error={errors.followers}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
