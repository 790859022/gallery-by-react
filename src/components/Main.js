require('normalize.css/normalize.css');
require('styles/App.css');


import React from 'react';

// let yeomanImage = require('../images/yeoman.png');
let imagesDatas = require('../data/imageDatas.json');
// import imagesDatas from '../data/imageDatas.json'

//获取图片，并转换调用路径
imagesDatas = (function getImageURL(list) {
  var arr = [];
  list.forEach(item => {
    var src =
      item.imageURL = require('../images/' + item.fileName);
    arr.push(item)
  });
  return arr;
})(imagesDatas);

// console.log(imagesDatas)

//获取一个区间内的随机值
function getRangeRandom(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}


//单个图片组件
class ImageFigure extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    let styleObj = {};

    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos
    }
    return (
      <figure className="img-figure" ref={this.props.imgRef} style={styleObj}>
        <img src={this.props.data.imageURL} alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
}

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   appName: props.appName,
    //   imgsArrangeArr: []
    // }
  }

  state = {
    appName: this.props.appName,
    imgsArrangeArr: []
  }

  Constant = {
    centerPos: {
      left: 0,
      top: 0
    },
    hPosRange: { //水平方向取值范围
      leftSecX: [0, 0],
      rightSecX: [0, 0],
      y: [0, 0]
    },
    vPosRange: { //垂直方向取值范围
      x: [0, 0],
      topY: [0, 0]
    }
  }

  componentDidMount() {
    // let stageDOM = React.findDOMNode(this.refs.stage),

    // 获取整个舞台大小
    let stageDOM = this.refs.stage,
      stageW = stageDOM.scrollWidth,
      stageH = stageDOM.scrollHeight,
      halfStageW = Math.ceil(stageW / 2),
      halfStageH = Math.ceil(stageH / 2);


    // console.log(this)
    // 获取一个卡片的大小
    let imgFigureDOM = this.imgFigure0,
      imgW = imgFigureDOM.scrollWidth,
      imgH = imgFigureDOM.scrollHeight,
      halfImgW = Math.ceil(imgW / 2),
      halfImgH = Math.ceil(imgH / 2);

    // console.log(imgW );
    // 计算中心位置
    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }
    // 计算左侧，右侧布局范围
    this.Constant.hPosRange = {
      leftSecX: [-halfImgW, halfStageW - halfImgW * 3],
      rightSecX: [halfStageW + halfImgW, stageW - halfImgW],
      y: [-halfImgH, stageH - halfImgH]
    }
    // 计算上侧布局范围
    this.Constant.vPosRange = {
      x: [halfStageW - imgW, halfStageW],
      topY: [-halfImgH, halfStageH - halfImgH * 3]
    }

    this.rearange(0);
  }

  // 从新布局所有图片
  rearange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr,  //获取每张图存储的位置信息数组
      Constant = this.Constant,//获取位置存储对象
      centerPos = Constant.centerPos,//获取中心图片的位置数据
      hPosRange = Constant.hPosRange,//获取水平位置范围
      vPosRange = Constant.vPosRange,//获取垂直位置范围
      hPosRangeLeftSecX = hPosRange.leftSecX,//获取水平左侧位置范围
      hPosRangeRightSecX = hPosRange.rightSecX,//获取水平右侧位置范围
      hPosRangeY = hPosRange.y,//获取水平位置上下取值范围
      vPosRangeTopY = vPosRange.topY,//获取上部区域 垂直范围
      vPosRangeTopX = vPosRange.x; //获取上部区域 水平范围


    //存放上部区域的图片，随机生成数量0||1
    let imgsArrangeTopArr = [],
      topImgNum = Math.ceil(Math.random() * 1),
      topImgSpliceIndex = 0;

    //获取居中图片的状态信息
    let imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);
    //设置居中图片的状态
    imgsArrangeCenterArr[0].pos = centerPos;


    //获取上部图片的状态信息
    //由于上部展示图片数量随机，当为临界值即取的是最后一张时，应该取出的数量过大时可能只能取出一张
    //场景：上部随机生成数为3，而取出的位置索引是从最后一张的索引开始取，由于索引是随机生成的，此时只能取出一张。因此随机生成的长度要要减去取出的数量
    topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
    imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);


    //设置上部图片的状态
    imgsArrangeTopArr.forEach((item, index) => {
      item.pos = {
        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: getRangeRandom(vPosRangeTopX[0], vPosRangeTopX[1])
      }
    });
    // console.log('上部图片数量'+topImgNum);
    // console.log('上部图片索引'+topImgSpliceIndex);
    // console.log(imgsArrangeTopArr);

    //布局左右两侧图片
    for (var i = 0, len = imgsArrangeArr.length, k = len / 2; i < len; i++) {
      var leftOrRight = '';

      //前一半图片设置左侧布局范围，后一半数据设置右侧布局范围
      leftOrRight = i < k ? hPosRangeLeftSecX : hPosRangeRightSecX

      imgsArrangeArr[i].pos = {
        top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        left: getRangeRandom(leftOrRight[0], leftOrRight[1])
      }

    }

    //状态数据处理完后 从新赋值
    //前面处理 中间，处理上部的图片从对应位置取出啦数组，现在根据取出索引再插入对应位置
    if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
      imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
    }
    imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0])


    // console.log(imgsArrangeArr)
    this.setState({
      imgsArrangeArr: imgsArrangeArr
    })

  }

  render() {

    let controllerUnits = [];
    let imgFigures = [];

    imagesDatas.forEach((item, index) => {

      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {left: 0, top: 0}
        }
      }
      imgFigures.push(<ImageFigure data={item} arrange={this.state.imgsArrangeArr[index]} key={index}
                                   imgRef={e => this['imgFigure' + index] = e}></ImageFigure>)
    })


    return (
      /*<div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <h1>{this.state.appName}</h1>
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      </div>*/
      <section className="stage" ref="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {controllerUnits}
        </nav>
      </section>
    );
  }
}


AppComponent.defaultProps = {
  appName: 'gallery by react'
};

export default AppComponent;
