function setup() {
    let sel = $("#" + last);
    sel.draggable({
        containment: "parent"
    });
    sel.css("color", "red");
    sel.css("background", "black");
    sel.css("width", "100px");
    sel.css("height", "20xp");
    sel.css("position", "absolute");
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

    $("#read").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'block' > Read : </p>");
        let pos = $("#" + last).offset();
        let block = new Block(last, "read", pos.left, pos.top);
        let text = prompt("Type variable name");
        block.addArgument("variableName", text);
        blocks.push(block);
        setup();
        ++last;
    });/*
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