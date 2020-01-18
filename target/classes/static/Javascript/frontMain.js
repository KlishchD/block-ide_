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
        blockSelected = e.target.id;
        for (let i = 0; i < blocks[blockSelected].getArguments().length; ++i) {
            let name = blocks[blockSelected].getArguments()[i].name, value = blocks[blockSelected].getArguments()[i].value;
            if (name == "variableName") {
                $("#varName").prop("value", value);
            }
            if (name == "variableType") {
                $("#varType").prop("value", value);
            }
            if (name == "condition") {
                $("#condition").prop("value", value);
            }
            if (name == "text") {
                $("#text").prop("value", value);
            }
            if (name == "lowerBound") {
                $("#lowerBound").prop("value", value);
            }
            if (name == "upperBound") {
                $("#upperBound").prop("value", value);
            }
        }
        $("#varName").prop("value", "");
        $("#varType").prop("value", "");
        $("#condition").prop("value", "");
        $("#expresion").prop("value", "");
        $("#text").prop("value", "");
        $("#lowerBound").prop("value", "");
        $("#upperBound").prop("value", "");
        for (let i = 0; i < blocks[blockSelected].getArguments().length; ++i) {
            let name = blocks[blockSelected].getArguments()[i].name, value = blocks[blockSelected].getArguments()[i].value;
            if (name == "variableName") {
                $("#varName").prop("value", value);
            }
            if (name == "variableType") {
                $("#varType").prop("value", value);
            }
            if (name == "condition") {
                $("#condition").prop("value", value);
            }
            if (name == "text") {
                $("#text").prop("value", value);
            }
            if (name == "lowerBound") {
                $("#lowerBound").prop("value", value);
            }
            if (name == "upperBound") {
                $("#upperBound").prop("value", value);
            }
            if (name == "expresion") {
                $("#expresion").prop("value", value);
            }
        }
        if (crtlPressed) {
            from = e.target.id;
        }
        if (shiftPressed) {
            to = e.target.id;
        }
    });
    $(document).on("click", "#convert", function (e) {
        let flag = false;
        for (let i = 0; i < blocks.length; ++i) {
            for (let j = 0; j > blocks[i].getArguments().length; ++j) {
                if (blocks[i].getArguments()[j].value === null) {
                    flag = true;
                    break;
                }
            }
            if (flag) break;
        }
        if (flag) {
            alert ("Not all parameters set.");
            return;
        }
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
                blocks[i].setNextId(null);
            }
            let flag = false;
            for (let j = 0; j < blocks[i].getChildrens().length; ++j) {
                if (blocks[i].getChildrens()[j] === blockSelected) {
                    $("#line" + i + "o" + blockSelected).remove();
                    f = true;
                }
            }
            if (flag) {
                let newChildrens = [];
                for (let j = 0; j < blocks[i].getArguments().length; ++j) {
                    if (blocks[i].getChildrens()[j] !== blockSelected) {
                        newChildrens.push(blocks[i].getChildrens()[j]);
                    }
                }
                blocks[i].setChildrens(newChildrens);
                break;
            }
        }
        for (let i = 0; i < blocks[blockSelected].getChildrens().length; ++i) {
            $("#line" + blockSelected + "o" + blocks[blockSelected].getChildrens()[i]).remove();
        }
        $("#line" + blockSelected + "o" + blocks[blockSelected].getNextId()).remove();
        $("#" + blockSelected).remove();
    });

    $("#varName").change(function () {
        for (let i = 0; i < blocks[blockSelected].getArguments().length; ++i) {
            if (blocks[blockSelected].getArguments()[i].name == "variableName") {
                blocks[blockSelected].getArguments()[i].value = $("#varName").val();
            }
        }
    });
    $("#expresion").change(function () {
        for (let i = 0; i < blocks[blockSelected].getArguments().length; ++i) {
            if (blocks[blockSelected].getArguments()[i].name == "expresion") {
                blocks[blockSelected].getArguments()[i].value = $("#expresion").val();
            }
        }
    });
    $("#condition").change(function () {
        for (let i = 0; i < blocks[blockSelected].getArguments().length; ++i) {
            if (blocks[blockSelected].getArguments()[i].name == "condition") {
                blocks[blockSelected].getArguments()[i].value = $("#condition").val();
            }
        }
    });
    $("#text").change(function () {
        for (let i = 0; i < blocks[blockSelected].getArguments().length; ++i) {
            if (blocks[blockSelected].getArguments()[i].name == "text") {
                blocks[blockSelected].getArguments()[i].value = $("#text").val();
            }
        }
    });
    $("#lowerBound").change(function () {
        for (let i = 0; i < blocks[blockSelected].getArguments().length; ++i) {
            if (blocks[blockSelected].getArguments()[i].name == "lowerBound") {
                blocks[blockSelected].getArguments()[i].value = $("#lowerBound").val();
            }
        }
    });
    $("#upperBound").change(function () {
        for (let i = 0; i < blocks[blockSelected].getArguments().length; ++i) {
            if (blocks[blockSelected].getArguments()[i].name == "upperBound") {
                blocks[blockSelected].getArguments()[i].value = $("#upperBound").val();
            }
        }
    });
    $("#varType").change(function () {
        $( "#varType option:selected" ).each(function() {
            for (let i = 0; i < blocks[blockSelected].getArguments().length; ++i) {
                if (blocks[blockSelected].getArguments()[i].name == "variableType") {
                    blocks[blockSelected].getArguments()[i].value = $( this ).text();
                }
            }
        });
    })
});
$(document).click(function () {
    if (blockSelected == null) {
        $("#varName").prop("disabled", true);
        $("#varType").prop("disabled", true);
        $("#condition").prop("disabled", true);
        $("#expresion").prop("disabled", true);
        $("#text").prop("disabled", true);
        $("#lowerBound").prop("disabled", true);
        $("#upperBound").prop("disabled", true);
        return;
    }
    let name = $("#" + blockSelected).text();
    if (name == " Var " || name == " Read ") {
        $("#varName").prop("disabled", false);
        $("#varType").prop("disabled", false);
        $("#condition").prop("disabled", true);
        $("#expresion").prop("disabled", true);
        $("#text").prop("disabled", true);
        $("#lowerBound").prop("disabled", true);
        $("#upperBound").prop("disabled", true);
        return;
    }
    if (name == " Print ") {
        $("#varName").prop("disabled", true);
        $("#varType").prop("disabled", true);
        $("#condition").prop("disabled", true);
        $("#expresion").prop("disabled", true);
        $("#text").prop("disabled", false);
        $("#lowerBound").prop("disabled", true);
        $("#upperBound").prop("disabled", true);
        return;
    }
    if (name == " If " || name == " While ") {
        $("#varName").prop("disabled", true);
        $("#varType").prop("disabled", true);
        $("#condition").prop("disabled", false);
        $("#expresion").prop("disabled", true);
        $("#text").prop("disabled", true);
        $("#lowerBound").prop("disabled", true);
        $("#upperBound").prop("disabled", true);
        return;
    }
    if (name == " Assign ") {
        $("#varName").prop("disabled", false);
        $("#varType").prop("disabled", true);
        $("#condition").prop("disabled", true);
        $("#expresion").prop("disabled", false);
        $("#text").prop("disabled", true);
        $("#lowerBound").prop("disabled", true);
        $("#upperBound").prop("disabled", true);
        return;
    }
    if (name == " For to " || name == " For down to ") {
        $("#varName").prop("disabled", true);
        $("#varType").prop("disabled", true);
        $("#condition").prop("disabled", true);
        $("#expresion").prop("disabled", true);
        $("#text").prop("disabled", true);
        $("#lowerBound").prop("disabled", false);
        $("#upperBound").prop("disabled", false);
        return;
    }
    $("#varName").prop("disabled", true);
    $("#varType").prop("disabled", true);
    $("#condition").prop("disabled", true);
    $("#expresion").prop("disabled", true);
    $("#text").prop("disabled", true);
    $("#lowerBound").prop("disabled", true);
    $("#upperBound").prop("disabled", true);
});



/*,*/
// TODO: Ð´Ð¾Ð´Ð°Ñ‚Ð¸ Ð²ÐºÐ»Ð°Ð´ÐµÐ½Ñ–ÑÑ‚ÑŒ