import React, { Component } from 'react';
import * as firebase from 'firebase';

const config = {
   apiKey: "AIzaSyCgxBWVxMiIu-Nx12JS4anxWQcS6spczZY",
   authDomain: "jersey-history.firebaseapp.com",
   databaseURL: "https://jersey-history.firebaseio.com",
   projectId: "jersey-history",
   storageBucket: "jersey-history.appspot.com",
   messagingSenderId: "807012060306"
 };
 firebase.initializeApp(config);

class PlayerFace extends React.Component {

  render() {
    var faceStyle = {

      backgroundImage: 'url(' + this.props.face + ')',
      backgroundColor: 'black',
      backgroundSize: 'cover',
    };
    return(
        <div className="face" style={faceStyle}>
        </div>
    );
  }
}
class PlayerList extends React.Component {
  render() {

     return(
      <div className="jersey_list">
          {this.props.list.map(player => (
              <div key={player.name} className="player_info">
                <PlayerFace face={player.face}/>
                <div className="player_name_years">
                  <div className="name">{player.name}</div>
                  <div className="years">{player.years}</div>
                </div>
              </div>
            ))}
      </div>
    );
  }
}

class JerseyFeature extends React.Component {
  closeFocus(){
    var jerseyFocusContainer = document.querySelector(".focus_container");
    jerseyFocusContainer.classList.toggle("unseen");
  }
  render() {
    return (
      <div className="focus_container unseen">
        <div className="jersey_focus">
          <div className="close_focus" onClick={()=>this.closeFocus()}>
            <img src='https://www.brainpop.com//math/numbersandoperations/multiplication/icon.png' />
          </div>
          <div className="jersey_large">
            <img
              className="jersey_feature "
              src="http://i.imgur.com/GbZdelj.png"
            />
            <div className="jersey_number_large">{this.props.number}</div>
          </div>
          <PlayerList list={this.props.players} />
        </div>
      </div>
    );
  }
}
class Jerseys extends React.Component {
  render() {
    return (
      <div className="jersey_individual">
        <img
          className="jersey_img "
          src="http://i.imgur.com/GbZdelj.png"
          onClick={e =>
            this.props.action(
              e,
              this.props.number,
              this.props.players
            )
          }
        />
        <div className="jersey_number">{this.props.number}</div>
      </div>
    );
  }
}
class AllJerseysEver extends React.Component {
  constructor(props) {
    super(props);
    this.jerseyInFocus = this.jerseyInFocus.bind(this);
    this.state = {
      feature: {
        number: "",
        players: []
      },
      jerseys: [{}, {}],
    };
  }

  componentWillMount() {
    const dbRefObject = firebase.database().ref().child('jerseys');
    dbRefObject.on('value', snap => console.log(snap.val()));
    dbRefObject.on('value', snap => this.setState({jerseys: snap.val()}));
  }

  jerseyInFocus(arg1, arg2, arg3) {
    var thisJersey = arg1.currentTarget;
    this.setState({
      feature: {
        number: arg2,
        players: arg3
      }
    });
    var focusContainer = document.querySelector(".focus_container");
    focusContainer.classList.toggle("unseen");
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <div className="jersey_row">
          {this.state.jerseys.map(jersey => (
            <Jerseys
              key={jersey.number}
              number={jersey.number}
              players={jersey.players}
              action={this.jerseyInFocus}
            />
          ))}
        </div>
        <JerseyFeature
            number={this.state.feature.number}
            players={this.state.feature.players}
          />
      </div>
    );
  }
}

export default AllJerseysEver;
