class Block {
    constructor(id, name, left, top) {
        this.id = id;
        this.nextId = null;
        this.name = name;
        this.left = left;
        this.top = top;
        this.arguments = [];
        this.childrenIds = [];
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
    setChildrens (childrenIds) {
        this.childrenIds = childrenIds;
    }
    addChild (id) {
        this.childrenIds.push(id);
    }

    addArgument(name, value) {
        this.arguments.push({
            name: name,
            value: value
        });
    }

    getChildrens() {
        return this.childrenIds;
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
        $("#" + blockSelected).css("border-width", "0px");
        blockSelected = e.target.id;
        $("#" + blockSelected).css("border-width", "3px");
        $("#" + blockSelected).css("border-color", "white");

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
                hljs.highlightBlock(document.getElementById("code"));
            }
        });
    });

    $("#delete").click(function () {
        if (blockSelected === "0") {
            alert("Start block is forbidden for deleting");
            return;
        }
        if (blockSelected === null) {
            alert("You haven't selected any block");
            return;
        }
        for (let i = 0; i < blocks.length; ++i) {
            if (blocks[i].getNextId() === blockSelected) {
                $("#line" + i + "o" + blockSelected).remove();
            }
            for (let j = 0; j < blocks[i].getChildrens().length; ++j) {
                if (blocks[i].getChildrens()[j] === blockSelected) {
                    $("#line" + i + "o" + blockSelected).remove();
                }
            }
        }
        for (let i = 0; i < blocks[blockSelected].getChildrens().length; ++i) {
            $("#line" + blockSelected + "o" + blocks[blockSelected].getChildrens()[i]).remove();
        }
        $("#line" + blockSelected + "o" + blocks[blockSelected].getNextId()).remove();
        $("#" + blockSelected).remove();
    });
});



/*,*/
// TODO: Ð´Ð¾Ð´Ð°Ñ‚Ð¸ Ð²ÐºÐ»Ð°Ð´ÐµÐ½Ñ–ÑÑ‚ÑŒ