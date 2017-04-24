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
    //draw text on top of arcs
    for(var i=0; i <this.multiplyList(pieText).length; i++){
      startAngle = endAngle;
      endAngle = startAngle + 360/this.multiplyList(pieText).length;
      var text = paper.text(center.x + diameter/2, center.y, this.multiplyList(pieText)[i]);
      text.attr({"font-size": "20px"});
      text.transform('r'+(startAngle+endAngle)/2 + ' ' + center.x + ' ' + center.y);
      //alert(d);
      texts.push(text);
    }

    var pcmd = "M" + center.x + "," + center.y + " m" + diameter + ",0" + " m-20,0 l35,-5 l0,10 z";
    var p = paper.path(pcmd);
    p.attr("fill", "#F0F0F0");
    p.glow({width:5, offsetx:2.5, offsety:2.5});


    var time = 8000; //ms
    //var easing = '>'
    var easing = 'cubic-bezier(0,1,0.1,1)' ;
    var rotateAngle = 360 * 9;
    //var rotateAngle = 360 * 1;
    rotateAngle -= this.getAngleFromID(2, this.multiplyList(pieText).length);
    rotateAngle += this.getRandomDriftDeg(this.multiplyList(pieText));
    // spinToId texts
    texts.forEach(function(text){
      var fromAngle = parseInt(text.transform()[0][1]);
      var toAngle = fromAngle + rotateAngle;
      text.stop().animate({transform: "r" + toAngle + " " + center.x + " " + center.y}, time, easing);
    });
    // spinToId arcs
    var roulette = paper.set(arcs);
    roulette.stop().animate({transform: "r" + rotateAngle + " " + center.x + " " + center.y}, time, easing);

  }

  getAngleFromID(arcId, arcsCount){ // Do we need arcsCount?
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
    // Repeat items until it has more than 8 items
    while (list.length < 8){
      list = list.concat(list);
    }
    return list ;
  }

  getColor(i, total){
    var h = i/total;
    return "hsl(" + h + ", .7, 0.5)";
    //return colorArr[i % total % colorArr.length];
    //return colorArr[i];
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

  // render(){
  //       var data = [
  //           {x:50,y:50,r:40,attr:{"stroke":"#0b8ac9","stroke-width":5},animate:Raphael.animation({cx:60},500,"<>")},
  //           {x:100,y:100,r:40,attr:{"stroke":"#f0c620","stroke-width":5},animate:Raphael.animation({cx:105},500,"<>")},
  //           {x:150,y:50,r:40,attr:{"stroke":"#1a1a1a","stroke-width":5}},
  //           {x:200,y:100,r:40,attr:{"stroke":"#10a54a","stroke-width":5},animate:Raphael.animation({cx:195},500,"<>")},
  //           {x:250,y:50,r:40,attr:{"stroke":"#e11032","stroke-width":5},animate:Raphael.animation({cx:240},500,"<>")}
  //       ]
  //       return (<Paper width={300} height={300}>
  //                      <Set>
  //                       {
  //                           data.map(function(ele,pos){
  //                               return (<Circle key={pos} x={ele.x} y={ele.y} r={ele.r} attr={ele.attr} animate={ele.animate}/>)
  //                           })
  //                       }
  //                       </Set>
	// 					<Set>
  //                           <Rect x={30} y={148} width={240} height={150} attr={{"fill":"#10a54a","stroke":"#f0c620","stroke-width":5}}/>
	// 						<Ellipse x={150} y={198} ry={40} rx={100} attr={{"fill":"#fff","stroke":"#e11032"}} glow={{width:10,fill:true,color:"#0b8ac9",opacity:1}}/>
  //                           <Image src="static/images/5circle.png" x={100} y={170} width={90} height={60} />
	// 						<Text x={150} y={258} text="同一个世界 同一个梦想" attr={{"fill":"#fff"}}/>
	// 						<Text x={150} y={273} text="One World One Dream" attr={{"fill":"#fff"}}/>
	// 						<Path d={["M150 287L150 287"]} animate={Raphael.animation({"path": ["M80 287L220 287"]},500,"<>")} attr={{"stroke":"#fff"}}/>
  //                           <Line x1={150} y1={290} x2={150} y2={290} animate={Raphael.animation({ x1:80, x2:220},500,"<>")} attr={{"stroke":"#fff"}}/>
	// 					</Set>
  //               </Paper>)
  //   }
}

export default Roulette;
