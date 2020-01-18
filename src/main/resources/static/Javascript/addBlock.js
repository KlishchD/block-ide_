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
        blocks[last].addArgument("text", null);
        ++last;
    });

    $("#read").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'block' > Read </p>");
        setup("read");
        blocks[last].addArgument("variableName", null);
        blocks[last].addArgument("variableType", null);
        ++last;
    });
    $("#var").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'block' > Var </p>");
        setup("var");
        blocks[last].addArgument("variableName", null);
        blocks[last].addArgument("variableType", null);
        ++last;
    });
    $("#if").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'block' > If </p>");
        setup("if");
        blocks[last].addArgument("condition", null);
        ++last;
    });
    $("#while").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'block' > While </p>");
        setup("while");
        blocks[last].addArgument("condition", null);
        ++last;
    });

    $("#forTo").click(function () {
        $("#workplace").prepend("<p id = " + last + " class = 'block' > For to </p>");
        setup("forTo");
        blocks[last].addArgument("lowerBound", null);
        blocks[last].addArgument("upperBound", null);
        ++last;
    });
    $("#forDownTo").click(function () {
        $("#workplace").prepend("<p id = " + last + " class = 'block' > For down to </p>");
        setup("forDownTo");
        blocks[last].addArgument("lowerBound", null);
        blocks[last].addArgument("upperBound", null);
        ++last;
    });
    $("#assign").click(function () {
        $("#workplace").prepend("<p id =" + last + " class = 'block' > Assign </p>");
        setup("assign");
        blocks[last].addArgument("expresion", null);
        blocks[last].addArgument("variableName", null);
        ++last;
    });
});