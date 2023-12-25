const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addStep(this.rootNode, data);

    function addStep(node, data) {
      if (!node) {
        return new Node(data);
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        node.left = addStep(node.left, data);
      } else {
        node.right = addStep(node.right, data)
      }
      
      return node;
    }
  }

  has(data) {
    return searchStep(this.rootNode, data);

    function searchStep(node, data) {
      if (!node) {
        return false;
      }

      if (node.data === data) {
        return true;
      }

      if (data < node.data) {
        return searchStep(node.left, data);
      } else {
        return searchStep(node.right, data);
      }
    }
  }

  find(data) {
    return findStep(this.rootNode, data);

    function findStep(node, data) {
      if (!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      if (data < node.data) {
        return findStep(node.left, data);
      } else {
        return findStep(node.right, data);
      }
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRightNode = node.right;

        while (minRightNode.left) {
          minRightNode = minRightNode.left;
        }

        node.data = minRightNode.data;

        node.right = removeNode(node.right, minRightNode.data);

        return node;
      }
    }
  }

  min() {
    if (!this.root) {
      return;
    }

    let current = this.rootNode;

    while (current.left) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    if (!this.root) {
      return;
    }

    let current = this.rootNode;

    while (current.right) {
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};