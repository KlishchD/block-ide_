function setup(name) {
    let sel = $("#" + last);
    let pos = sel.offset();
    let block = new Block(last, name, pos.left, pos.top);
    blocks.push(block);
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
        setup("print");
        let text = prompt("Type text");
        blocks[last].addArgument("expresion", text);
        ++last;
    });

    $("#read").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'block' > Read : </p>");
        setup("read");
        let text = prompt("Type variable name");
        blocks[last].addArgument("variableName", text);
        text = prompt("Type variable type");
        blocks[last].addArgument("variableType", text);
        ++last;
    });
    $("#var").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'block' > Var </p>");
        setup("var");
        let text = prompt("Type variable name");
        blocks[last].addArgument("variableName", text);
        text = prompt("Type variable type");
        blocks[last].addArgument("variableType", text);
        ++last;
    });
    $("#if").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'block' > If </p>");
        setup("if");
        let text = prompt("Type condition");
        blocks[last].addArgument("condition", text);
        ++last;
    });
    $("#while").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'block' > While </p>");
        setup("while");
        let text = prompt("Type condition");
        blocks[last].addArgument("condition", text);
        ++last;
    });

    $("#forTo").click(function () {
        $("#workplace").prepend("<p id = " + last + " class = 'block' > For to </p>");
        setup("forTo");
        let text = prompt("Type lover bound");
        blocks[last].addArgument("lowerBound", text);
        text = prompt("Type upper bound");
        blocks[last].addArgument("upperBound", text);
        ++last;
    });
    $("#forDownTo").click(function () {
        $("#workplace").prepend("<p id = " + last + " class = 'block' > For down to </p>");
        setup("forDownTo");
        let text = prompt("Type lover bound");
        blocks[last].addArgument("lowerBound", text);
        text = prompt("Type upper bound");
        blocks[last].addArgument("upperBound", text);
        ++last;
    });
       /* $("#Assign").click(function () {
            $("#workplace").prepend("<p id =" + last + " class = 'Block' > Assign </p>");
            setup();
            ++last;
        });*/
});