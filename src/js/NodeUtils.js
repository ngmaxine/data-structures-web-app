function getParent(i) {
  return Math.floor((i-1)/2);
}

function getLeftChild(i) {
  return 2 * i + 1;
}
function getRightChild(i) {
  return 2 * i + 2;
}

function getLevel(i) {
  return Math.floor(Math.log2(i+1));
}

function getID(node) {
  return node.level + "-" + node.position;
}

export default {
  getParent: getParent,
  getLeftChild: getLeftChild,
  getRightChild: getRightChild,
  getLevel: getLevel,
  getID: getID
}