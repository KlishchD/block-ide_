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

    setChildrens(childrenIds) {
        this.childrenIds = childrenIds;
    }

    addChild(id) {
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
        $("#varName").prop("disabled", true);
        $("#varType").prop("disabled", true);
        $("#expresion").prop("disabled", true);
        $("#condition").prop("disabled", true);
        $("#text").prop("disabled", true);
        $("#lowerBound").prop("disabled", true);
        $("#upperBound").prop("disabled", true);
        $("#varName").prop("value", "");
        $("#expresion").prop("value", "");
        $("#condition").prop("value", "");
        $("#text").prop("value", "");
        $("#lowerBound").prop("value", "");
        $("#upperBound").prop("value", "");
        for (let i = 0; i < blocks[blockSelected].getArguments().length; ++i) {
            if (blocks[blockSelected].getArguments()[i].name === "variableName") {
                $("#varName").prop("value", blocks[blockSelected].getArguments()[i].value);
            }
            if (blocks[blockSelected].getArguments()[i].name === "variableType") {
                $("#varType").prop("value", blocks[blockSelected].getArguments()[i].value);
            }
            if (blocks[blockSelected].getArguments()[i].name === "expresion") {
                $("#expresion").prop("value", blocks[blockSelected].getArguments()[i].value);
            }
            if (blocks[blockSelected].getArguments()[i].name === "condition") {
                $("#condition").prop("value", blocks[blockSelected].getArguments()[i].value);
            }
            if (blocks[blockSelected].getArguments()[i].name === "text") {
                $("#text").prop("value", blocks[blockSelected].getArguments()[i].value);
            }
            if (blocks[blockSelected].getArguments()[i].name === "lowerBound") {
                $("#lowerBound").prop("value", blocks[blockSelected].getArguments()[i].value);
            }
            if (blocks[blockSelected].getArguments()[i].name === "upperBound") {
                $("#upperBound").prop("value", blocks[blockSelected].getArguments()[i].value);
            }

        }

        let element = $("#" + blockSelected);
        console.log(element);
        if (element.hasClass("read") || element.hasClass("var")) {
            $("#varName").prop("disabled", false);
            $("#varType").prop("disabled", false);
        } else if (element.hasClass("print")) {
            $("#text").prop("disabled", false);
        } else if (element.hasClass("if") || element.hasClass("while")) {
            $("#condition").prop("disabled", false);
        } else if (element.hasClass("forTo") || element.hasClass("forDownTo")) {
            $("#lowerBound").prop("disabled", false);
            $("#upperBound").prop("disabled", false);
        } else if (element.hasClass("assign")) {
            $("#varName").prop("disabled", false);
            $("#expresion").prop("disabled", false);
        }
    });
    $("#varName").change(function () {
        for (let j = 0; j < blocks[blockSelected].getArguments().length; ++j) {
            if (blocks[blockSelected].getArguments()[j].name === "variableName") {
                blocks[blockSelected].getArguments()[j].value = $("#varName").val();
            }
        }
    });

    $("#expresion").change(function () {
        for (let j = 0; j < blocks[blockSelected].getArguments().length; ++j) {
            if (blocks[blockSelected].getArguments()[j].name === "expresion") {
                blocks[blockSelected].getArguments()[j].value = $("#expresion").val();
            }
        }

    });

    $("#text").change(function () {
        for (let j = 0; j < blocks[blockSelected].getArguments().length; ++j) {
            if (blocks[blockSelected].getArguments()[j].name === "text") {
                blocks[blockSelected].getArguments()[j].value = $("#text").val();

            }
        }
    });

    $("#condition").change(function () {
        for (let j = 0; j < blocks[blockSelected].getArguments().length; ++j) {
            if (blocks[blockSelected].getArguments()[j].name === "condition") {
                blocks[blockSelected].getArguments()[j].value = $("#condition").val();
            }

        }
    });

    $("#lowerBound").change(function () {
        for (let j = 0; j < blocks[blockSelected].getArguments().length; ++j) {
            if (blocks[blockSelected].getArguments()[j].name === "lowerBound") {
                blocks[blockSelected].getArguments()[j].value = $("#lowerBound").val();
            }

        }
    });

    $("#upperBound").change(function () {
        for (let j = 0; j < blocks[blockSelected].getArguments().length; ++j) {
            if (blocks[blockSelected].getArguments()[j].name === "upperBound") {
                blocks[blockSelected].getArguments()[j].value = $("#upperBound").val();
            }

        }
    });

    $("#varType").change(function () {
        for (let j = 0; j < blocks[blockSelected].getArguments().length; ++j) {
            if (blocks[blockSelected].getArguments()[j].name === "variableType") {
                blocks[blockSelected].getArguments()[j].value = $("#varType").val();
            }

        }
    });


    $(document).on("click", "#convert", function (e) {
        $.ajax({
            url: "/convert",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                "graph": {"blocks": blocks},
                "lang": ($("#languageSelection").val() === "C++" ? "cpp" : "java")
            }),
            success: function (data) {
                console.log(data);
                if ($("#languageSelection").val() === "C++")
                    $("#code").prop("class", "language-cpp");
                else
                    $("#code").prop("class", "language-java");
                document.getElementById("code").innerText = data;
                Prism.hooks.add('before-highlight', function (e) {
                    e.code = e.element.innerText;
                });
                Prism.highlightAll();
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