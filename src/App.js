import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BinaryHeap from './BinaryHeap.js';
import OperationsPanel from './OperationsPanel.js';
import Utils from './NodeUtils.js';

class App extends Component {
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
    this.setState({nodes: nodes});
  }

  handleInsertChange(value) {
    var newValues = this.state.values;
    newValues.push(parseInt(value, 10));
    var newNode = new HeapNode(value, Utils.getLevel(this.state.values.length - 1), 1);
    var newNodes = this.state.nodes;
    newNodes.push(newNode);
    this.setState({values: newValues, nodes: newNodes});
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

export default App;
