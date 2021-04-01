这部分我分为 Array,List,Tree,Graph,Map

## Array

## List

## Tree

树的这部分主要重点在二叉树，在计算机中树是无处不在的，可以说树这种数据结构是程序的灵魂，是程序的根基。树这种结构最基础最经典的就是二叉树。

### 二叉树 binary tree

[BinaryTree](./BinaryTree.md)
完全二叉树搜索的效率就是 $O(log2^n)$，当树退化成链表的时候，时间复杂度就是 $O(n)$，当一千个结点的时候，完全二叉树的算法效率是 $\lfloor O(log2^1000) \rfloor$ = 10 而链表的效率是 $O(1000)$ = 1000，这之间差距是 100 倍。所以掌握数据结构是一个非常重要的技能。所以数据结构和算法是程序员的内功，强大的内功可以为公司为社会节省很多的资源，创造很大的效益，当然也可以体现出自己的价值。

二叉树是一种典型的树形结构，他的特点就是每个结点至多是有两颗子树的，并且二叉树的子树有左右之分，其次序不能任意颠倒。
二叉树中的一些概念：
父节点：顾名思义，在父节点上面可能有他的父节点也可能没有
孩子节点：孩子节点上一定是有父节点
叶子节点：叶子节点一定时么有孩子节点。但是一定有父节点。

```
Root	The top node in a tree.	根	树的顶端结点
Child	A node directly connected to another node when moving away from the Root.	孩子	当远离根(Root)的时候，直接连接到另外一个结点的结点被称之为孩子(Child);
Parent	The converse notion of a child.	双亲	相应地，另外一个结点称为孩子(child)的双亲(parent)。
Siblings	A group of nodes with the same parent.	兄弟	具有同一个双亲(Parent)的孩子(Child)之间互称为兄弟(Sibling)。
Ancestor	A node reachable by repeated proceeding from child to parent.	祖先	结点的祖先(Ancestor)是从根（Root）到该结点所经分支(Branch)上的所有结点。
Descendant	A node reachable by repeated proceeding from parent to child.	子孙	以某结点为根的子树中的任一结点都称为该结点的子孙(后代)。
Leaf	A node with no children.	叶子（终端结点）	没有孩子的结点(也就是度为0的结点)称为叶子(Leaf)或终端结点。
Branch	A node with at least one child.	分支(非终端结点)	至少有一个孩子的结点称为分支(Branch)或非终端结点。
Degree	The number of sub trees of a node.	度	结点所拥有的子树个数称为结点的度(Degree)。
Edge	The connection between one node and another.	边	一个结点和另一个结点之间的连接被称之为边(Edge)。
Path	A sequence of nodes and edges connecting a node with a descendant.	路径	连接结点和其后代的结点之间的(结点,边)的序列。
Level	The level of a node is defined by ０ + (the number of connections between the node and the root).	层次	结点的层次(Level)从根(Root)开始定义起，根为第0层，根的孩子为第1层。以此类推，若某结点在第i层，那么其子树的根就在第i+1层。
Height of node	The height of a node is the number of edges on the longest path between that node and a leaf.	结点的高度	结点的高度是该结点和某个叶子之间存在的最长路径上的边的个数。
Height of tree	The height of a tree is the height of its root node.	树的高度	树的高度是其根结点的高度。
Depth of node
The depth of a node is the number of edges from the tree's root node to the node.	结点的深度	结点的深度是从树的根结点到该结点的边的个数。 （注：树的深度指的是树中结点的最大层次。）
Forest	A forest is a set of n ≥ 0 disjoint trees.	森林	森林是n(>=0)棵互不相交的树的集合。
```

**完全二叉树**
除了最后一层，其他层的节点个数都是满的，最后一层的节点都是靠左侧排列。

**完美二叉树**
所有的节点都有左右孩子，除了叶子节点。

**满二叉树**
满二叉树是指的一个结点如果有孩子，那么就一定是有左右孩子。

**二叉查找树**
二叉查找树的规则是，对于树中的任意一个结点，都满足他的左孩子节点小于本结点的值，而右孩子节点的值都比本结点大，和该结点相同的值既可以在左侧，也可以在右侧。

**堆**
堆是一种特殊的二叉树，堆又分大顶堆小顶堆两种，大顶堆是父节点的值要大于等于左右孩子节点，小顶堆是父节点的值要小于等于左右孩子节点。堆是一个完全二叉树。
