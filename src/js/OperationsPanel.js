import React, { Component } from 'react';
import '../css/OperationsPanel.css';

class OperationsPanel extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {insert: null};
    this.insert = this.insert.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  insert() {
    this.props.onInsertChange(this.state.insert);
  }

  deleteMin() {

  }

  decreaseKey(value_old, value_new) {

  }

  buildHeap() {

  }

  handleChange(type, event) {
    if (type === 'insert')
      this.setState({insert: event.target.value});
  }

  render() {
    return <div className="row ops-panel">
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-secondary op-button" type="button" onClick={this.insert} >Insert</button>
            </span>
            <input type="number" className="form-control" aria-label="Insert" onChange={this.handleChange.bind(this, 'insert')}/>
          </div>
        </div>
        <div className="col-md-3">
          <button className="btn btn-secondary op-button" type="button" onClick={this.deleteMin}>Delete Min</button>
        </div>
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-secondary op-button" type="button" onClick={this.decreaseKey}>Decrease Key</button>
            </span>
            <input type="number" className="form-control" aria-label="Decrease Key (old)" placeholder="old"/>
            <input type="number" className="form-control" aria-label="Decrease Key (new)" placeholder="new"/>
          </div>
        </div>
        <div className="col-md-3">
          <button className="btn btn-secondary op-button" type="button" onClick={this.buildHeap}>Build Heap</button>
        </div>
      </div>;
  }
}

export default OperationsPanel;
