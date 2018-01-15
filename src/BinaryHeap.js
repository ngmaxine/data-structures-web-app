import React, {Component} from 'react';
import Node from './Node.js';
import Utils from './NodeUtils.js'

const xLength = window.innerWidth * 0.75;
const yLength = window.innerHeight;

class BinaryHeap extends Component {
    constructor (props, context) {
      super(props, context);
      this.nodes = this.props.nodes.slice();
      this.yDist = yLength / (Utils.getLevel(this.nodes.length) + 2);
    }

    componentWillReceiveProps(nextProps) {
      this.nodes = nextProps.nodes.slice();
    }

    componentDidMount() {
      //console.log(this.nodes);
      console.log(document.getElementById("1-3").childNodes[1].attributes)
    }

    buildMinHeap(nodes) {
      this.addPositions(nodes);

      for(var i = Math.floor(nodes.length / 2) - 1; i >= 0; i--) {
        this.minHeapify(nodes, i);
      }
    }

    minHeapify(nodes, i) {
      var left = Utils.getLeftChild(i);
      var right = Utils.getRightChild(i);
      var smallest = i;
      if (left < nodes.length && nodes[left].value < nodes[i].value)
        smallest = left;
      if (right < nodes.length && nodes[right].value < nodes[smallest].value)
        smallest = right;
      if (smallest !== i) { //swap
        var smallestValue = nodes[smallest].value;
        nodes[smallest].value = nodes[i].value;
        nodes[i].value = smallestValue;
        this.minHeapify(nodes, smallest);
      }
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
        lines.push(<line key={parent+"-"+i} x1={xLength/Math.pow(2, nodes[i].level + 1) * nodes[i].position} y1={this.yDist + nodes[i].level * this.yDist} x2={xLength/Math.pow(2, parent.level + 1) * parent.position} y2={this.yDist + parent.level * this.yDist} strokeWidth="2" stroke="black"/>);
      }
      return lines;
    }

    addPositions(nodes) {
      for(var i = 1; i < nodes.length; i++) {
        var isLeftChild = Utils.getLeftChild(Utils.getParent(i)) === i;
        nodes[i].position = nodes[Utils.getParent(i)].position * 2 + (isLeftChild ? -1 : 1);
      }
    }

    getMin() {
      return this.nodes[0];
    }

    render() {
      this.buildMinHeap(this.nodes);
      return <div style={{padding:"25px", margin:"auto"}}>
        <svg width={xLength} height={window.innerHeight}>
          {this.drawLines(this.nodes)}
          {this.drawMinHeap(this.nodes)}
        </svg>
      </div>
    }
}

export default BinaryHeap;
