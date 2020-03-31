class Node {
    constructor(value) {
        this.value = value;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insertValue(value) {
        this.insertNode(new Node(value));
    }

    insertNode(node) {
        let currentNode = this.root;
        console.log(`inserting node of value ${node.value}`);
        if (this.root === null) {
            this.root = node;
            return;
        }
        while (true) {
            if (node.value > currentNode.value) {
                //console.log(`node is greater than node with value ${currentNode.value}`);
                if (currentNode.right === null) {
                    currentNode.right = node;
                    node.parent = currentNode;
                    return;
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

    search(value) {
        let currentNode = this.root;
        while (currentNode.value !== value) {
            if (value > currentNode.value) {
                currentNode = currentNode.right;
            }
            else {
                currentNode = currentNode.left;
            }
        }
        return currentNode;
    }

    removeValue(value) {
        const node = this.search(value);
        console.log(node);
        node ? this.removeNode(node) : console.log("there was no node with the specified value");
    }

    removeNode(node) {
        if (node.left === null && node.right === null) {
            if (node !== this.root) {
                node.parent.left === node ? node.parent.left = null : node.parent.right = null;
            }
            else {
                this.root = null;
            }
            node.parent = null;
        }
        // the node to be removed has only one child
        else if (this.XOR(node.left === null, node.right === null)) {
            const childNode = node.left === null ? node.right : node.left;
            node.left = null;
            node.right = null;
            if (node !== this.root) {
                childNode.parent = node.parent;
            }
            else {
                childNode.parent = null;
                this.root = childNode;
            }
        }
        //find successor of node and swap places
        else {
            const successor = this.findSuccessor(node);
            if (node === this.root) {
                this.root = successor;
            }
            successor.parent = node.parent;
            successor.left = node.left;
            if (node.right != successor) {
                successor.right = node.right;
            }
            if (node.left) {
                node.left.parent = successor;
            }
            if (node.right) {
                node.right.parent = successor;
            }
            node.parent = null;
            node.left = null;
            node.right = null;
        }
        return;
    }

    XOR(x, y) {
        if ((x || y) && !(x && y)) {
            return true;
        }
        return false;
    }

    findSuccessor(node) {
        let successor = node.right;
        while (successor.left !== null) {
            successor = node.left;
        }
        return successor;
    }
}

const tree = new BinarySearchTree();
console.log(tree.root);

const margin = { top: 20, right: 90, bottom: 30, left: 90 },
    width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom,
    duration = 750;
const radius = 20;


const svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const treeLayout = d3.tree().size([height, width]);
let root = function () {
    if (tree.root) {
        return d3.hierarchy(tree.root, function (node) {
            const children = [];
            if (node.left) {
                children.push(node.left);
            }
            if (node.right) {
                children.push(node.right);
            }
            return children;
        })
    }
    return null;
}

if (root()) {
    treeUI.update(root());
}

const treeUI = {

    search: (value, root) => {
        const colorNodeWrapper = (index, color, wait) => {
            console.log(circles);
            setTimeout(function () {
                circles.style("fill", function (d, i) {
                    if (index === i) {
                        console.log("matching node: ");
                        console.log(d);
                        return color;
                    }
                    else {
                        return "#fff";
                    }
                })
            }, wait);
        }

        const stepSpeed = 1000;

        var treeData = treeLayout(root);

        // Compute the new tree layout.
        const nodes = treeData.descendants();
        const circles = svg.selectAll("circle");
        //console.log(circles);

        nodes.forEach(function(d, i){
            d.i = i;
        });

        console.log(nodes);

        let currentNode = nodes[0];
        let wait = 0;
        while (currentNode && currentNode.value !== value) {
            console.log("currentNode");
            console.log(currentNode);
            //console.log(currentNode.children);
            colorNodeWrapper(currentNode.i, "yellow", wait);
            wait += stepSpeed;

            let parentNode = currentNode;
            if (value > currentNode.value) {
                if (currentNode.children && currentNode.children.length > 1) {
                    currentNode = currentNode.children[1];
                }
                else if (currentNode.children) {
                    currentNode = currentNode.children[0]
                }
                else {
                    break;
                }

                if (currentNode.value < parentNode.value) {
                    currentNode = parentNode;
                    break;
                }
            }
            else {
                if (currentNode.children) {
                    currentNode = currentNode.children[0];
                }
                else {
                    break;
                }
                if (currentNode.value > parentNode.value) {
                    currentNode = parentNode;
                    break;
                }

            }
        }
        if (!currentNode || currentNode.value !== value) {
            console.log("node not found: ");
            colorNodeWrapper(currentNode.i, "red", wait);
        }
        else {
            console.log("found node at index: ");
            colorNodeWrapper(currentNode.i, "green", wait);
        }
        //colorNodeWrapper(currentNode, "#fff", wait+stepSpeed);
        return currentNode;
    },

    update: (source) => {
        // Assigns the x and y position for the nodes

        const x0 = height;
        const y0 = 0;

        var treeData = treeLayout(source);

        // Compute the new tree layout.
        const nodes = treeData.descendants();
        const links = treeData.links();

        console.log(nodes);

        //normalize height so it doesnt go out of the SVG
        let treeDepth = 0;
        if (nodes.length > 1) {
            nodes.forEach(function (d, i) {
                if (treeDepth < d.depth) {
                    treeDepth = d.depth;
                }
                console.log(i);
                d.i = i;
            });
        }

        nodes.forEach(function (d) {
            if (treeDepth === 0) {
                d.y = 0;
            }
            else if (d.depth === treeDepth) {
                d.y = height - margin.bottom - radius;
                if (d.y > d.depth * 180) {
                    d.y = d.depth * 180;
                }
            }
            else {
                d.y = (height - margin.bottom - radius) * (d.depth / treeDepth);
                if (d.y > d.depth * 180) {
                    d.y = d.depth * 180;
                }
            }
        })

        console.log(nodes);

        const node = svg.selectAll('g.nodeContainer')
            .data(nodes);

        console.log("node: ");
        console.log(node);

        // Links Enter
        const lines = svg.selectAll('line.link')
            .data(links);

        // Nodes
        const nodesEnter = node
            .enter()
            .append("g")
            .classed("nodeContainer", true)
            // Position the g element that will contain the circles/nodes
            .attr("transform", function (d, i) {
                return "translate(" + d.x + "," + y0 + ")";
            });

        nodesEnter
            .append('circle')
            .classed('node', true)
            .attr('r', radius);

        nodesEnter.append('text')
            .attr("x", 0)
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d.value;
            })

        // Update Nodes
        const nodesUpdate = nodesEnter.merge(node);

        // Transition to the proper position for the node
        nodesUpdate.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        nodesUpdate.select("text")
            .text(function (d) {
                return d.value;
            })


        linesEnter = lines.enter()
            .append('line')
            .classed('link', true)
            .attr('x1', function (d) { return d.source.x; })
            .attr('y1', function (d) { return 0; })
            .attr('x2', function (d) { return d.target.x; })
            .attr('y2', function (d) { return d.target.y - d.source.y; });

        linesUpdate = linesEnter.merge(lines);

        linesUpdate.transition()
            .duration(duration)
            .attr('x1', function (d) { return d.source.x; })
            .attr('y1', function (d) { return d.source.y + radius; })
            .attr('x2', function (d) { return d.target.x; })
            .attr('y2', function (d) { return d.target.y - radius; });
    }
}