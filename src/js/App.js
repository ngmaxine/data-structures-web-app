import React, { Component } from 'react';
import logo from '../svg/logo.svg';
import '../css/App.css';
import BinaryHeap from '../js/BinaryHeap.js';
import BinaryHeapUtils from '../js/BinaryHeapUtils.js';
import OperationsPanel from '../js/OperationsPanel.js';
import Utils from '../js/NodeUtils.js';
import Animate from '../js/Animate.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {values: [21, 14, 8, 10, 5, 6, 7, 1, 9, 4, 11, 3, 13, 15, 17, 12, 22],
      nodes:[]};
    this.handleInsertChange = this.handleInsertChange.bind(this);
  }

  componentWillMount() {
    var nodes = this.state.values.map((value, i) => {
      return new HeapNode(this.state.values[i], Utils.getLevel(i), 1);
    });
    BinaryHeapUtils.buildMinHeap(nodes);
    this.setState({nodes: nodes});
  }

  handleInsertChange(value) {
    value = parseInt(value,10)
    if (value % 1 === 0) {
      var newValues = this.state.values;
      newValues.push(value);
      var newNode = new HeapNode(value, Utils.getLevel(this.state.values.length - 1), 1);
      var newNodes = this.state.nodes;
      newNodes.push(newNode);
      BinaryHeapUtils.addPositions(newNodes);
      this.setState({values: newValues, nodes: newNodes}, ()=> {
        BinaryHeapUtils.decreaseKey(this, newNodes, this.state.values.length - 1, value);
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Binary Min Heap</h2>
        </div>
        <OperationsPanel onInsertChange={this.handleInsertChange}/>
        <BinaryHeap nodes={this.state.nodes}/>
      </div>
    );
  }
}

function HeapNode (value, level, position){
  this.value = value;
  this.position = position;
  this.level = level;
}