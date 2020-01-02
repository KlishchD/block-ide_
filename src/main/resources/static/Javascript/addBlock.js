
function setup() {
    $("#" + last).draggable({
        containment: "parent"
    });
    $("#" + last).css("color", "red");
    $("#" + last).css("background", "black");
    $("#" + last).css("width", "100px");
    $("#" + last).css("height", "20xp");
    $("#" + last).css("position", "absolute");
}

$(document).ready(function () {
    $("#print").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'block' > Print </p>");
        let pos = $("#" + last).offset();
        let block = new Block(last, "print", pos.left, pos.top);
        let text = prompt("Type text");
        block.addArgument("expresion", text);
        blocks.push(block);
        setup();
        ++last;
    });

 /*   $("#read").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'Block' > Read : </p>");
        setup();
        ++last;
    });
    $("#Var")*/
/*
    $("#If").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'Block if' > If </p>");
        setup();
        ++last;
    });

    $("#While").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'Block while' > While </p>");
        setup();
        ++last;
    });

    $("#For").click(function () {
        $("#workplace").prepend("<p id = " + last + " class = 'Block for' > For </p>");
        setup();
        ++last;
    });

    $("#Assign").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'Block' > Assign </p>");
        setup();
        ++last;
    });*/
});