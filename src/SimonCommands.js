import React from 'react';
import './SimonCommands.css';

function Button (props){
  return (
    <input className="button" type="button" value="Start" onClick={props.onClick}></input>
  )
}
class SimonCommands extends React.Component {

  state = {
    curIndex: 0,
    valid: true,
    green: "green",
    red: "red",
    yellow: "yellow",
    blue: "blue",
    count: 0,
    path: [],
  }
  colors = ["green", "red", "yellow", "blue"];
  startGame() {
    this.setState({count: 0, path:["green","blue","red", "red"]}, () => {
			this.newRound(0)
		});
  }
  newRound(i) {
		let { path } = this.state;
    const index = Math.floor(Math.random() * this.colors.length);
    const tile = this.colors[index];
    path.push(tile);
    this.setState({curIndex: 0, path}, () => {
      let that = this;
			this.playPath(0, path);
      //setTimeout(function(){
       // that.setState({[tile]:tile}, () => {
        //  if (i < that.state.count) {
         //   setTimeout(function(){
          //    that.newRound(i+1, path);
           // }, 250);
         // }
     //   });
     // }, 250);
    });
    if (i > this.state.count) {
      console.log(...path);
      //this.setState({path:path});
    }
  }
	playPath = (index, path) => {
		let that = this;
		const color = path[index];
		that.setState({[color]:"white"}, () => {
			setTimeout(function(){
				that.setState({[color]:color}, () => {
					if (index < path.length){
						setTimeout(function() {
							that.playPath(index+1, path);
						}, 250);
					}
				});
			}, 250);
		});
	}
  lightUp = (e, color)  => {
		let { curIndex, path } = this.state;
    e.target.style.backgroundColor = "white";
    e.persist();
    setTimeout(function(){
      e.target.style.backgroundColor = color;
    }, 150);

    if (path.length < 1) return;
    let what = path[curIndex++];
    if (color !== what){
      alert('wrong');
    }
    this.setState({path:path, count:this.state.count+1, curIndex:curIndex});
    if(curIndex === path.length) {
       this.newRound(this.state.count);
       return;
     }
  //  this.setState({path:path});
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
