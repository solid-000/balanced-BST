class Node {
  constructor(data) {
    (this.data = data), (this.left = null), (this.right = null);
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr);
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
    let match = this.get(num);
    if (match === null) {
      console.log(`${num} is not stored in the tree.`);
    } else {
      let parent = this.findParent(match);
      if (!match.left && !match.right) {
        if (parent.left === match) parent.left = null;
        else if (parent.right === match) parent.right = null;
        return;
      } else if (match.left && match.right) {
        //later
      } else if (match.left || match.right) {
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

  get(num, root = this.root) {
    if (root === null) {
      return null;
    } else if (num === root.data) {
      return root;
    } else if (num < root.data) {
      return this.get(num, root.left);
    } else if (num > root.data) {
      return this.get(num, root.right);
    }
  }
}

function buildTree(arr, start = 0, end = arr.length - 1) {
  if (start > end) return null;

  let mid = Math.floor((start + end) / 2);
  let node = new Node(arr[mid]);

  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);

  return node;
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

// let sortedArr = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
// ];
let sortedArr = [1, 2, 3, 4, 5, 6, 7, 8];
let test = new Tree(sortedArr);
test.insert(0.5);
// test.insert(2.6);
// test.insert(2.4);

prettyPrint(test.root);
