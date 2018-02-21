import Utils from '../js/NodeUtils.js'
import Velocity from 'velocity-animate';

function swap(nodeA, nodeB, context, nodes, i) {

  return new Promise((resolve, reject)=>{
    nodeA = document.getElementById(nodeA);
    nodeB = document.getElementById(nodeB);
    var nodeAX = nodeA.children[0].getAttribute('cx');
    var nodeAY = nodeA.children[0].getAttribute('cy');
    var nodeBX = nodeB.children[0].getAttribute('cx');
    var nodeBY = nodeB.children[0].getAttribute('cy');
    var nodeAY_diff = nodeBY - nodeAY;
    var nodeAX_diff = nodeBX - nodeAX;
    Velocity(nodeA, {
      translateY: nodeAY_diff,
      translateX: nodeAX_diff
    }, {
      duration: 2000,
      delay:500
    }).then(Velocity(nodeA, "reverse", { duration: 1, delay: 1 }));

    Velocity(nodeB, {
      translateY: -nodeAY_diff,
      translateX: -nodeAX_diff
    }, {
      duration: 2000,
      delay:500
    }).then(Velocity(nodeB, "reverse", {duration: 1, delay: 1}
    ).then(function() { //After animations performed and 'reversed', update virtual DOM
      swapNodes(nodes, i);
      context.setState({nodes: nodes}, function(){
        resolve();
      });
    }));  
  });
}

function swapNodes(nodes, i) {
  //swap positions in state.nodes
  var temp = nodes[i];
  nodes[i] = nodes[Utils.getParent(i)];
  nodes[Utils.getParent(i)] = temp;

  //swap levels and positions
  /*var value = nodes[i].value;*/
  var level = nodes[i].level;
  var position = nodes[i].position;
  //nodes[i].value = nodes[Utils.getParent(i)].value;
  nodes[i].level = nodes[Utils.getParent(i)].level;
  nodes[i].position = nodes[Utils.getParent(i)].position;
  //nodes[Utils.getParent(i)].value = value;
  nodes[Utils.getParent(i)].level = level;
  nodes[Utils.getParent(i)].position = position;
}

export default {
  swap: swap
};