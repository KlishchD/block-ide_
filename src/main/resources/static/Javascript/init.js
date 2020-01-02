var List = require("collections/list");

class Block {
    next = null;
    parent = null;
    get() {

    }
    getNext () {
        return this.next;
    }
    getParent () {
        return this.parent;
    }
    setParent (parentNode) {
        this.parent = parentNode;
    }
}
class Print extends Block {
    text = null;
    get() {
        return "print(" + text + ")";
    }
}
class Read extends Block {
    varName = null;
    get() {
        return "read(" + this.varName + ")";
    }
}

class If extends Block {
    condition = null;
    children = new List([]);
}
class For extends Block {
    condition = null;
    children = new List([]);
}
class While extends Block{
    condition = null;
    children = new List([]);
}
class Assign extends Block {
    varName = null;
    value = null;
    get() {
        return this.value + "=" + this.value;
    }
}