import React, { Component,  } from 'react';
import  { Dropdown, DropdownButton  } from 'react-bootstrap';
import { getArtistFollowers } from '../../actions/authActions';
import Widget from '../widget/Widget';
import axios from 'axios';

class Landing extends Component {
  constructor(props) {
  super(props);
  this.state = {
    followers: 0
  };
}
  componentWillMount(){
    //getArtistFollowers('Billie');
    axios
.get('/api/Artist/all')
  .then(({data}) => {

    for(var i=0; i<=data.length; i++){
     //if(data[i].firstName === "Billie"){
         console.log(data[i].followers);
         var foll = data[i].followers;
     //}
     this.setState({followers: foll});
    }
  });
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Widget Collection</h1>
                <hr />
                <DropdownButton id="dropdown-basic-button" title="Select an Artist" className="mr-2">
                    <Dropdown.Item href="#/action-1">Billie Eilish</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Jason Mraz</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Ed Sheeran</Dropdown.Item>
                </DropdownButton>
                
              </div>
              <Widget heading="Followers" children={this.state.followers}>
                <p>  </p>
             </Widget>
            </div>
            
          </div>
          
        </div>
        
      </div>
    );
  }
}

export default Landing;
