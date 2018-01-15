function swap(nodeA, nodeB) {
  var firstNode = document.getElementById(Utils.getID(nodeA));
  var secondNode = document.getElementById(Utils.getID(nodeB));
  var posA = nodeA.level;
  var id = setInterval(frame, 5);
  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.top = pos + 'px'; 
      elem.style.left = pos + 'px'; 
    }
  }
}