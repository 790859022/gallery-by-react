require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';

// let yeomanImage = require('../images/yeoman.png');
let imagesDatas = require('../data/imageDatas.json');
// import imagesDatas from '../data/imageDatas.json'

//获取图片，并转换调用路径
imagesDatas = (function getImageURL(list){
  var arr = [];
  list.forEach(item=>{
    var src =
    item.imageURL = require('../images/' + item.fileName);
    arr.push(item)
  });
  return arr;
})(imagesDatas);

// console.log(imagesDatas)

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: props.appName
    }
  }

  render() {
    return (
      /*<div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <h1>{this.state.appName}</h1>
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>*/
      <section className="stage">
        <section className="img-sec"></section>
        <nav className="controller-nav"></nav>
      </section>
    );
  }
}


AppComponent.defaultProps = {
  appName: 'gallery by react'
};

export default AppComponent;
