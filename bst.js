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

  delete(num, root = this.root) {
    let leftChild = root.left;
    let rightChild = root.right;

    if (leftChild && leftChild.data === num) {
      if (!leftChild.left && !leftChild.right) {
        root.left = null;
        return;
      }
      if (leftChild.left && leftChild.right) {
        //later
        console.log("easd");
        return;
      }
      if (leftChild.left || leftChild.right) {
        let successor = leftChild.left || leftChild.right;
        root.left = successor;
        return;
      }
    }

    if (rightChild && rightChild.data === num) {
      if (!rightChild.left && !rightChild.right) {
        root.right = null;
        return;
      }
      if (rightChild.left && rightChild.right) {
        //later
        console.log("easd");
        return;
      }
      if (rightChild.left || rightChild.right) {
        let successor = rightChild.left || rightChild.right;
        root.right = successor;
        return;
      }
    }

    if (num < root.data) {
      this.delete(num, root.left);
    } else if (num > root.data) {
      this.delete(num, root.right);
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

let sortedArr = [1, 2, 3, 4, 5, 6, 7];
let newTree = new Tree(sortedArr);
newTree.insert(10);
// newTree.delete(1);
prettyPrint(newTree.root);
