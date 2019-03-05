const INPUT = document.querySelector('input[name="userNumber"]');
let NODE_TREE = null;
const TREE_CONTAINER = document.getElementById('tree');

function Leaf(rootNode, left = null, right = null) {
  return { rootNode, left, right };
}

function DOMLeaf(rootNode, left = null, right = null) {
  const c = document.createElement.bind(document);
  const container = c('div'); container.className = 'node__container';
  const rootWrapper = c('p');
  const $rootNode = c('span'); $rootNode.className = 'root-node';
  $rootNode.innerText = rootNode;
  rootWrapper.append($rootNode);
  const leftNode = c('div'); leftNode.className = 'left__container';
  if(left) leftNode.append(left);
  const rightNode = c('div'); rightNode.className = 'right__container';
  if(right) rightNode.append( right);
  container.append(rootWrapper, leftNode, rightNode);
  return container;
}

function grow(pointer, tree, value) {
  let newLeaf;
  if(tree[pointer] === null) {
    newLeaf = Leaf(value);
  } else {
    newLeaf = addToTree(value, tree[pointer]);
  }
  tree[pointer] = newLeaf;
  return tree;
}

function addToTree(value, tree) {
  if(tree === null) {
    return Leaf(parseInt(value, 10));
  } else {
    const rootNode = parseInt(tree.rootNode, 10);
    if(value > rootNode) {
      return grow('right', tree, value);
    }
    if(value < rootNode) {
      return grow('left', tree, value);
    }
    return tree;
  }
}

function remove(child) {
  child.parentNode.removeChild(child);
}

function createDOMNodes(tree) {
  const { left, right, rootNode } = tree;
  let nodeLeft;
  let nodeRight;
  if(left !== null) {
    nodeLeft = createDOMNodes(left);
  }
  if(right !== null) {
    nodeRight = createDOMNodes(right)
  }
  return DOMLeaf(rootNode, nodeLeft, nodeRight);
}

function renderTreeData() {
  if(NODE_TREE === null) {
    return false;
  }
  const tree = createDOMNodes(NODE_TREE);
  TREE_CONTAINER.innerHTML = '';
  TREE_CONTAINER.appendChild(tree)
}

function handleSubmit(e) {
  const { value } = INPUT;
  if(value === '') return false;
  INPUT.value = null;
  NODE_TREE = addToTree(value, NODE_TREE);
  console.clear();
  console.log(NODE_TREE);
  renderTreeData();
  return false;
}

document.addEventListener('DOMContentLoaded', (e) => {
  console.log('Loaded');
  console.log(Leaf(3,4,5));
  console.log(Leaf(3));
})
