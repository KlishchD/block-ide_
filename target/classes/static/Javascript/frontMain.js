class Block {
    constructor(id, name, left, top) {
        this.id = id;
        this.nextId = null;
        this.name = name;
        this.left = left;
        this.top = top;
        this.arguments = [];
    }

    setLeft(left) {
        this.left = left
    }

    setTop(top) {
        this.top = top;
    }

    setId(id) {
        this.id = id;
    }

    setNextId(nextId) {
        this.nextId = nextId;
    }

    setName(name) {
        this.name = name;
    }

    addArgument(name, value) {
        this.arguments.push({
            name: name,
            value: value
        });
    }

    getLeft() {
        return this.left;
    }

    getTop() {
        return this.top;
    }

    getId() {
        return this.id;
    }

    getNextId() {
        return this.nextId;
    }

    getName() {
        return this.name;
    }

    getArguments() {
        return this.arguments;
    }
}

let last = 1;
let from = null, to = null;
let crtlPressed = false, shiftPressed = false;
let blockSelected = null;
let blocks = [];
$(document).keydown(function (e) {
    if (e.which === 17) {
        crtlPressed = true;
    } else {
        crtlPressed = false;
    }
    if (e.which === 16) {
        shiftPressed = true;
    } else {
        shiftPressed = false;
    }
    console.log(crtlPressed, " ", shiftPressed);
});

$(document).ready(function () {
    blocks.push(new Block(0, "start", $("#0").offset().left, $("#0").offset().top));
    $(document).on("click", ".block", function (e) {
        blockSelected = e.target.id;
        if (crtlPressed) {
            from = e.target.id;
        }
        if (shiftPressed) {
            to = e.target.id;
        }
    });
    $(document).on("click", "#convert", function (e) {
        $.ajax({
            url: "/convert",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({"graph": { "blocks": blocks}, "lang" : ($("#languageSelection").val() === "C++" ? "cpp" : "java")}),
            success : function (data) {
                document.getElementById("code").innerText = data;
            }
        });
    });
});
/*
    $("#Delete").click(function () {
        if (blockSelected === "0") {
            alert("Start block deny to delete");
            return;
        }
        if (blockSelected === null) {
            alert("Element haven't selected");
            return;
        }
        $("#" + blockSelected).remove();
        $("#line" + blockSelected).remove();
        $("#lineIn" + blockSelected).remove();
        let currnode = blockSelected;
        if (inclusive[currnode]) {
            while (currnode !== null) {
                let next = fromTo[currnode];
                if (inclusive[currnode]) {
                    next = inFromTo[currnode];
                }
                console.log("CRAS = ", currnode, " ", next);
                $("#lineIn" + currnode).css("background", "black");
                $("#lineIn" + currnode).attr("id", "line" + currnode);
                let left = currnode;
                let right = fromTo[currnode];
                fromTo[left] = right;
                toFrom[right] = left;
                inFromTo[left] = null;
                inToFrom[right] = null;
                inclusive[currnode] = false;
                currnode = next;
            }
        }
        if (toFrom[blockSelected] !== null) {
            $("#line" + toFrom[blockSelected]).remove();
            fromTo[toFrom[blockSelected]] = null;
            toFrom[blockSelected] = null;
        }
        if (fromTo[blockSelected] !== null) {
            toFrom[fromTo[blockSelected]] = null;
        }

        if (inToFrom[blockSelected] !== null) {
            $("#lineIn" + inToFrom[blockSelected]).remove();
            inFromTo[inToFrom[blockSelected]] = null;
            inToFrom[blockSelected] = null;
        }
        if (inFromTo[blockSelected] !== null) {
            inToFrom[inFromTo[blockSelected]] = null;
        }

        fromTo[blockSelected] = null;
        inFromTo[blockSelected] = null;
        blockSelected = null;
    });

    $(document).on("click", ".Block", function (e) {
        if (crtlPressed) {
            from = e.target.id;
        }
        if (shiftPressed) {
            to = e.target.id;
        }
        if (!crtlPressed && !shiftPressed) {
            if (blockSelected != null) {
                $("#" + blockSelected).css("border-width", "0px");
            }
            blockSelected = e.target.id;
            $("#" + blockSelected).css("border-width", "2px");
            $("#" + blockSelected).css("border-style", "solid");
            $("#" + blockSelected).css("border-color", "white");
        }
        console.log(crtlPressed, " ", shiftPressed);
    });*/

/*,*/
// TODO: додати вкладеність