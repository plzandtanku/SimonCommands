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
    coral: "coral",
    yellow: "yellow",
    blue: "blue",
    count: 0,
  }
  colors = ["green", "coral", "yellow", "blue"];
  startGame() {
    const index = Math.floor(Math.random() * this.colors.length);
    console.log(index);
    const tile = this.colors[index];
    this.setState({[tile]:"white"}, () => {
      let that = this;
      setTimeout(function(){
        that.setState({[tile]:tile});
      }, 250);
    });

  }

  lightUp(e, color) {
    console.log(color);
    e.target.style.backgroundColor = `light${color}`;
    e.persist();
    setTimeout(function(){
      e.target.style.backgroundColor = color;
    }, 250);
  }
  render() {
    let divs = [];
    this.colors.forEach(color => {
      divs.push(<div key={color} style={{backgroundColor: this.state[color]}} id={color} onClick={(e) => this.lightUp(e,color)} className={`tile top ${color}`}></div>)
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
