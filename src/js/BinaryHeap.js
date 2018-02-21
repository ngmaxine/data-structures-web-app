import React, {Component} from 'react';
import Node from './Node.js';
import Utils from './NodeUtils.js'

const xLength = window.innerWidth * 0.75;
const yLength = window.innerHeight;

export default class BinaryHeap extends Component {
    constructor (props, context) {
      super(props, context);
      this.nodes = this.props.nodes.slice();
      this.yDist = yLength / (Utils.getLevel(this.nodes.length) + 2);
    }

    componentWillReceiveProps(nextProps) {
      this.nodes = nextProps.nodes.slice();
    }

    drawMinHeap(values) {
      var yVal = this.yDist;
      return values.map(function(node) {
        return <Node id={node.level + "-" + node.position} key={node.level + "-" + node.position} x={xLength/Math.pow(2, node.level + 1) * node.position} y={yVal + node.level * yVal} value={node.value}/>
      });
    }

    //Draws connecting lines from node to parent
    drawLines(nodes) {
      var lines = [];
      for(var i = 1; i < nodes.length; i++) {
        var parent = nodes[Utils.getParent(i)];
        lines.push(<line key={Utils.getParent(i)+"-"+i} x1={xLength/Math.pow(2, nodes[i].level + 1) * nodes[i].position} y1={this.yDist + nodes[i].level * this.yDist} x2={xLength/Math.pow(2, parent.level + 1) * parent.position} y2={this.yDist + parent.level * this.yDist} strokeWidth="2" stroke="black"/>);
      }
      return lines;
    }

    render() {
      return <div style={{padding:"25px", margin:"auto"}}>
        <svg width={xLength} height={window.innerHeight}>
          {this.drawLines(this.nodes)}
          {this.drawMinHeap(this.nodes)}
        </svg>
      </div>
    }
}
