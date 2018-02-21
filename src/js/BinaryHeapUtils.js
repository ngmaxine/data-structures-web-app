import Utils from './NodeUtils.js';
import Animate from './Animate.js';

function buildMinHeap(nodes) {
  this.addPositions(nodes);

  for(var i = Math.floor(nodes.length / 2) - 1; i >= 0; i--) {
    this.minHeapify(nodes, i);
  }
}

function addPositions(nodes) {
  for(var i = 1; i < nodes.length; i++) {
    var isLeftChild = Utils.getLeftChild(Utils.getParent(i)) === i;
    nodes[i].position = nodes[Utils.getParent(i)].position * 2 + (isLeftChild ? -1 : 1);
  }
}

function minHeapify(nodes, i) {
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
  return nodes;
}

function decreaseKey(context, nodes, i, key) {
  if (key <= nodes[i].value) {
    nodes[i].value = key;
    decreaseStep(context, nodes, i);
  }
}

function decreaseStep(context, nodes, i) {
  if (i > 0 && nodes[i].value < nodes[Utils.getParent(i)].value) {
    Animate.swap(Utils.getID(nodes[i]), Utils.getID(nodes[Utils.getParent(i)]), context, nodes, i)
    .then(()=>{
      i = Utils.getParent(i);
      decreaseStep(context, nodes, i);
    });
  }
}

function getMin() {  
  return this.nodes[0];
}

export default {
  buildMinHeap: buildMinHeap,
  addPositions: addPositions,
  minHeapify: minHeapify,
  decreaseKey: decreaseKey,
  getMin: getMin
}