# Balanced Binary Search Tree

This is my implementation of a binary tree as part of [The Odin Project](https://www.theodinproject.com/lessons/javascript-binary-search-trees).

## Getting Started

Use `const tree = new Tree(array)` to create a new binary tree from an array.

## Available Functions:

- `insert(data)`: Inserts data into the tree in the appropriate position.
- `delete(data)`: Removes the node containing the specified data.
- `find(data)`: Returns the node containing the specified data.
- `levelOrder(callback)`: Maps the callback function provided to all nodes in level order traversal.
- `preOrder(callback)`: Maps the callback function provided to all nodes in pre-order traversal.
- `inOrder(callback)`: Maps the callback function provided to all nodes in in-order traversal.
- `postOrder(callback)`: Maps the callback function provided to all nodes in post-order traversal.
- `height(node/data)`: Returns the height of the given node (default: root). Accepts the node itself or just the stored data. Returns `null` if data doesn't exist.
- `depth(node/data)`: Returns the depth of the given node (default: root). Accepts the node itself or just the stored data. Returns null if data doesn't exist.
- `isBalanced()`: Returns `true` if the tree is balanced and `false` if unbalanced.
- `rebalance()`: Rebalances the tree if unbalanced.
- `print('callback')`: Prints the tree as an array with the provided callback traversal method. Accepts string. Callback options:
  - `levelOrder`
  - `preOrder`
  - `inOrder`
  - `postOrder`

## What I learned from this project:

- The binary search tree algorithm and its functions.
- My understanding of recursion imporved.
- Passing string as a callback.
