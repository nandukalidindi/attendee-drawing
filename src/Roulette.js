import React, { Component } from 'react';
import './Roulette.css';

import MersenneTwister from './mersenne-twister';

import {Raphael,Paper,Set,Circle,Ellipse,Image,Rect,Text,Path,Line} from 'react-raphael';

class Roulette extends Component {

  state = {
    paper: null
  }

  data = [
    ["NANDU", "KALIDINDI", "NYU"],
    ["MAHOTSAVY", "DAMA", "FMS"]
  ]

  componentDidMount() {
    var paper = Raphael("holder");
    var offset = 5;
    var arcs = [];
    var texts = [];
    var arc = null;
    var center = {'x':200, 'y':200};
    var diameter = 180;
    var pieText= [
      'Firefox',
      'Thunderbird',
      'Sea Monkey',
      'Persona',
      'Bugzilla',
    ];
    var c = paper.circle(center.x, center.y, diameter);
    c.attr("fill", "black");
    c.glow({width:15, offsetx:2.5, offsety:2.5});


    var startAngle, endAngle = 0;
    var x1,x2,y1,y2 = 0;
    for(var i=0; i <this.multiplyList(pieText).length; i++){
      startAngle = endAngle;
      endAngle = startAngle + 360/this.multiplyList(pieText).length;

      x1 = parseInt(center.x+ diameter*Math.cos(Math.PI*startAngle/180));
      y1 = parseInt(center.y+ diameter*Math.sin(Math.PI*startAngle/180));

      x2 = parseInt(center.x+ diameter*Math.cos(Math.PI*endAngle/180));
      y2 = parseInt(center.y+ diameter*Math.sin(Math.PI*endAngle/180));

      var d = "M" + center.x + "," + center.y + "L" + x1 + "," + y1 + " A" + diameter + "," + diameter + " 0 0,1 " + x2 + "," + y2 + " z"; //1 means clockwise
      arc = paper.path(d);
      arc.attr("fill", this.getColor(i, this.multiplyList(pieText).length));
      arcs.push(arc);
    }
    
    for(var i=0; i <this.multiplyList(pieText).length; i++){
      startAngle = endAngle;
      endAngle = startAngle + 360/this.multiplyList(pieText).length;
      var text = paper.text(center.x + diameter/2, center.y, this.multiplyList(pieText)[i]);
      text.attr({"font-size": "20px"});
      text.transform('r'+(startAngle+endAngle)/2 + ' ' + center.x + ' ' + center.y);

      texts.push(text);
    }

    var pcmd = "M" + center.x + "," + center.y + " m" + diameter + ",0" + " m-20,0 l35,-5 l0,10 z";
    var p = paper.path(pcmd);
    p.attr("fill", "#F0F0F0");
    p.glow({width:5, offsetx:2.5, offsety:2.5});


    var time = 8000;

    var easing = 'cubic-bezier(0,1,0.1,1)' ;
    var rotateAngle = 360 * 9;

    rotateAngle -= this.getAngleFromID(2, this.multiplyList(pieText).length);
    rotateAngle += this.getRandomDriftDeg(this.multiplyList(pieText));

    texts.forEach(function(text){
      var fromAngle = parseInt(text.transform()[0][1]);
      var toAngle = fromAngle + rotateAngle;
      text.stop().animate({transform: "r" + toAngle + " " + center.x + " " + center.y}, time, easing);
    });

    var roulette = paper.set(arcs);
    roulette.stop().animate({transform: "r" + rotateAngle + " " + center.x + " " + center.y}, time, easing);

  }

  getAngleFromID(arcId, arcsCount){
    var arcAngle = 360/arcsCount;
    return (arcAngle * arcId + arcAngle/2);
  }

  getRandomDriftDeg(multipliedItems){
    var arcAngle = 360/multipliedItems.length;
    return Math.floor(0.9* (Math.random() * arcAngle - arcAngle/2)) ;
  }

  multiplyList(rawList){
    var list = rawList;
    // Strip empty entries
    while (list.indexOf("") > 0){
      list.splice(list.indexOf(""),1);
    }

    while (list.length < 8){
      list = list.concat(list);
    }
    return list ;
  }

  getColor(i, total){
    var h = i/total;
    return "hsl(" + h + ", .7, 0.5)";
  }

  rotateRoulette(event) {
    // var time = 8000; //ms
    // //var easing = '>'
    // var easing = 'cubic-bezier(0,1,0.1,1)' ;
    // var rotateAngle = 360 * 9;
    // //var rotateAngle = 360 * 1;
    // rotateAngle -= getAngleFromID(id, multiplyList(pieText).length);
    // rotateAngle += getRandomDriftDeg(multiplyList(pieText));
    // // spinToId texts
    // texts.forEach(function(text){
    //   var fromAngle = parseInt(text.transform()[0][1]);
    //   var toAngle = fromAngle + rotateAngle;
    //   text.stop().animate({transform: "r" + toAngle + " " + center.x + " " + center.y}, time, easing);
    // });
    // // spinToId arcs
    // var roulette = paper.set(arcs);
    // roulette.stop().animate({transform: "r" + rotateAngle + " " + center.x + " " + center.y}, time, easing);
  }


  render() {
    return (
      <div>
        <div id="holder" style={{width: "400px", height: "400px"}}>
        </div>

        <button onClick={this.rotateRoulette.bind(this)}>Rotate</button>
      </div>
    );
  }
}

export default Roulette;
