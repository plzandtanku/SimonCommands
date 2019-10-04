import React from 'react';
import './SimonCommands.css';

function Button (props){
  return (
    <input className="button" type="button" value="Start" onClick={props.onClick}></input>
  )
}
class SimonCommands extends React.Component {

  state = {
    selected: "",
    valid: true,
    green: "green",
    red: "red",
    yellow: "yellow",
    blue: "blue",
    count: 3,
    path: [],
  }
  colors = ["green", "red", "yellow", "blue"];
  startGame() {
    this.newRound(0, []);
  }
  newRound(i, path) {
    const index = Math.floor(Math.random() * this.colors.length);
    const tile = this.colors[index];
    path.push(tile);
    this.setState({[tile]:"white"}, () => {
      let that = this;
      setTimeout(function(){
        that.setState({[tile]:tile}, () => {
          if (i < that.state.count) {
            setTimeout(function(){
              that.newRound(i+1, path);
            }, 250);
          }
        });
      }, 250);
    });
    if (i >= this.state.count) {
      console.log(...path);
      this.setState({path:path});
    }
  }

  lightUp(e, color) {
    let path = this.state.path;
    if(path.length < 1) {
      this.newRound(this.state.count, []);
      return;
    }
    if (color !== path.pop()){
      alert('wrong');
    }
    this.setState({path:path});
    //e.target.style.backgroundColor = `light${color}`;
    //e.persist();
    //setTimeout(function(){
      //e.target.style.backgroundColor = color;
    //}, 250);
  }
  render() {
    let divs = [];
    this.colors.forEach(color => {
      divs.push(<div key={color} style={{backgroundColor: this.state[color]}} id={color} onClick={(e) => this.lightUp(e,color)} className={`tile top`}></div>)
    })
    return (
      <div>
        {divs}
        <Button onClick={() => this.startGame()}/>
      </div>
    );
  }
}

export default SimonCommands;
