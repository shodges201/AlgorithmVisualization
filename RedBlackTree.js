class RedBlackNode {
    constructor(value) {
        this.value = value;
        this.parent = null;
        this.left = null;
        this.right = null;
        this.black = false;
    }

}

class RedBlackTree {
    constructor() {
        this.root = null;
    }

    insertValue(value) {
        node = new RedBlackNode(value);
        this.insertNode(node);
    }

    insertNode(node) {
        if (this.root === null) {
            this.root = node;
            node.black = true;
            return;
        }
        let currentNode = this.root;
        console.log(`inserting node of value ${node.value}`);
        while (true) {
            if (node.value > currentNode.value) {
                //console.log(`node is greater than node with value ${currentNode.value}`);
                if (currentNode.right === null) {
                    if (!currentNode.black) {
                        currentNode.right = node;
                        node.parent = currentNode;
                        return;
                    }
                }
                currentNode = currentNode.right;
            }
            else {
                //console.log(`node is less than node with value ${currentNode.value}`);
                if (currentNode.left === null) {
                    currentNode.left = node;
                    node.parent = currentNode;
                    return;
                }
                currentNode = currentNode.left;
            }
        }
    }
}