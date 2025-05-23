class Node {
  constructor(data) {
    (this.data = data), (this.left = null), (this.right = null);
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    let node = new Node(arr[mid]);

    node.left = this.buildTree(arr, start, mid - 1);
    node.right = this.buildTree(arr, mid + 1, end);

    return node;
  }

  insert(num, root = this.root) {
    if (root.data === num) {
      console.log("Number already exists in tree.");
      return;
    }
    if (num < root.data) {
      if (!root.left) {
        root.left = new Node(num);
        return;
      }
      this.insert(num, root.left);
    } else {
      if (!root.right) {
        root.right = new Node(num);
        return;
      }
      this.insert(num, root.right);
    }
  }

  delete(num, node = this.root) {
    let match = this.find(num);
    if (match === null) {
      console.log(`${num} is not stored in the tree.`);
    } //root condition
    else if (match === this.root) {
      if (!match.left && !match.right) {
        this.root = null;
        return;
      } else if (match.left && match.right) {
        let successor = this.getSuccessor(match.right);
        let succParent = this.findParent(successor);
        if (match.right !== successor && !successor.right) {
          succParent.left = null;
        }
        if (match.right !== successor && successor.right) {
          succParent.left = successor.right;
          successor.right = null;
        }
        successor.left = match.left;
        if (match.right !== successor) {
          successor.right = match.right;
        }
        this.root = successor;
        return;
      } else if (match.left || match.right) {
        this.root = match.left || match.right;
        return;
      }
    } //non-root condition
    else {
      let parent = this.findParent(match);
      //Leaf node condition
      if (!match.left && !match.right) {
        if (parent.left === match) parent.left = null;
        else if (parent.right === match) parent.right = null;
        return;
      } //Two child condition
      else if (match.left && match.right) {
        let successor = this.getSuccessor(match.right);
        let succParent = this.findParent(successor);
        if (match.right !== successor && !successor.right) {
          succParent.left = null;
        }
        if (match.right !== successor && successor.right) {
          succParent.left = successor.right;
          successor.right = null;
        }
        if (parent.left === match) {
          successor.left = match.left;
          if (match.right !== successor) {
            successor.right = match.right;
          }
          parent.left = successor;
        } else {
          successor.left = match.left;
          if (match.right !== successor) {
            successor.right = match.right;
          }
          parent.right = successor;
        }
        return;
      } //One child confition
      else if (match.left || match.right) {
        if (parent.left === match) parent.left = match.left || match.right;
        else if (parent.right === match)
          parent.right = match.left || match.right;
        return;
      }
    }
  }

  findParent(child, parent = this.root) {
    if (parent === null) return null;
    else if (
      (parent.left && parent.left.data === child.data) ||
      (parent.right && parent.right.data === child.data)
    ) {
      return parent;
    } else if (child.data < parent.data) {
      return this.findParent(child, parent.left);
    } else if (child.data > parent.data) {
      return this.findParent(child, parent.right);
    }
  }

  find(num, root = this.root) {
    if (root === null) {
      return null;
    } else if (num === root.data) {
      return root;
    } else if (num < root.data) {
      return this.find(num, root.left);
    } else if (num > root.data) {
      return this.find(num, root.right);
    }
  }

  getSuccessor(node) {
    if (!node.left) return node;
    else if (node.left) return this.getSuccessor(node.left);
  }

  levelOrder(callback, queue = [this.root]) {
    if (typeof callback !== "function") {
      throw new Error("Callback function not provided!");
    }
    if (queue.length === 0) {
      return;
    }

    if (queue[0]) {
      callback(queue[0]);
      if (queue[0].left) queue.push(queue[0].left);
      if (queue[0].right) queue.push(queue[0].right);
      queue.shift();
    }
    this.levelOrder(callback, queue);
  }

  preOrder(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback function not provided!");
    }
    if (!node) return;
    callback(node);
    if (node.left) this.preOrder(callback, node.left);
    if (node.right) this.preOrder(callback, node.right);
  }

  inOrder(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback function not provided!");
    }
    if (!node) return;
    if (node.left) this.inOrder(callback, node.left);
    callback(node);
    if (node.right) this.inOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (typeof callback !== "function") {
      throw new Error("Callback function not provided!");
    }
    if (!node) return;
    if (node.left) this.postOrder(callback, node.left);
    if (node.right) this.postOrder(callback, node.right);
    callback(node);
  }

  height(node = this.root) {
    if (typeof node !== "object") {
      node = this.find(node);
      if (node === null) return null;
    }
    if (!node) return -1;
    let lHeight = this.height(node.left);
    let rHeight = this.height(node.right);
    return Math.max(lHeight, rHeight) + 1;
  }

  depth(node = this.node) {
    if (typeof node !== "object") {
      node = this.find(node);
      if (node === null) return null;
    }
    if (node === this.root) return 0;
    let depth = this.depth(this.findParent(node));
    return depth + 1;
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    if (Math.abs(this.height(node.left) - this.height(node.right)) > 1) {
      return false;
    } else {
      return this.isBalanced(node.left) && this.isBalanced(node.right);
    }
  }

  rebalance() {
    if (this.isBalanced() === true) {
      console.log("Tree is balanced.");
      return;
    } else {
      let temp = [];
      this.inOrder((node) => temp.push(node.data));
      this.root = this.buildTree(temp);
      console.log("Tree rebalanced successfully!");
    }
  }

  print(callback) {
    let array = [];
    this[callback]((node) => array.push(node.data));
    console.log(array);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let sortedArr = [3, 8, 14, 19, 25, 32, 38, 45, 51, 57, 63, 70, 76, 82, 91];
let test = new Tree(sortedArr);
test.insert(80);
test.insert(81);

prettyPrint(test.root);
