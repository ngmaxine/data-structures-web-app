import React, {Component} from 'react';

class Node extends Component {
  onClick(value) {
    console.log('clicked', value);
  }

  render() {
    return <g id={this.props.id} onClick={()=>this.onClick(this.props.value)}>
      <circle cx={this.props.x} cy={this.props.y} r="20" fill="white" stroke="black" strokeWidth="2"/>
      <text x={this.props.x} y={this.props.y} textAnchor="middle" alignmentBaseline="central" fontSize="20">{this.props.value}</text>
    </g>;
  }
}

export default Node;
