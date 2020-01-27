function setup(name) {
    let sel = $("#" + last);
    let pos = sel.offset();
    let block = new Block(last, name, pos.left, pos.top);
    blocks.push(block);
    sel.draggable({
        containment: "parent"
    });
    sel.css("color", "white");
    sel.css("background", "#24375B");
    sel.css("width", "106px");
    sel.css("height", "24xp");
    sel.css("position", "absolute");
}

$(document).ready(function () {
    $("#print").click(function () {
        $("#workplace").prepend("<div id = " + last + " class = \"block prrd print\"> <div id = " + last + " class = \"block prrd1\"> Print </div> </div>");
        setup("print");
        blocks[last].addArgument("text", null);
        ++last;
    });
    $("#read").click(function () {
        $("#workplace").prepend("<div id = " + last + " class = \"block prrd read\"> <div id = " + last + " class = \"block prrd1\"> Read </div> </div>");
        setup("read");
        blocks[last].addArgument("variableName", null);
        blocks[last].addArgument("variableType", "int");
        ++last;
    });
    $("#var").click(function () {
        $("#workplace").prepend("<div id = " + last + " class = 'block var hexagon' style = \"background:#24375B\"> Var </div>");
        setup("var");
        blocks[last].addArgument("variableName", null);
        blocks[last].addArgument("variableType", "int");
        ++last;
    });
    $("#if").click(function () {
        $("#workplace").prepend(
            "<div id = " + last + " class = \"block if ui-draggable ui-draggable-handle\" style = \"background:#24375B;\">" +
            " <div id = " + last + " class = \"block if if_top\"></div>" +
            " <div id = " + last + " class = \"block if if_bottom\"></div> " +
            " <div id = " + last + " style = \"position:absolute; top:-1px; left:45px;\">If</div>" +
            "</div>");
        setup("if");
        blocks[last].addArgument("condition", null);
        ++last;
    });
    $("#while").click(function () {
        $("#workplace").prepend("<div id = " + last + " class = 'block while'> " +
            "<div id = " + last + " class = \"left_hex block hex while\" >  </div>" +
            "<div id = " + last + " class = \"center_hex block hex while\" style = \"width:86px; background:#24375B;\"> While </div>" +
            "<div id = " + last + " class = \"right_hex block hex while\" > </div>" +
            "</div>");
        setup("while");
        blocks[last].addArgument("condition", null);
        ++last;
    });
    $("#forTo").click(function () {
        $("#workplace").prepend("<div id = " + last + " class = 'block forTo' style = \"background:#24375B\"> " +
            "<div id = " + last + " class = \"left_hex block hex forTo\">  </div>" +
            "<div id = " + last + " class = \"center_hex block hex forTo\" style = \"width:86px; background:#24375B;\"> For to </div>" +
            "<div id = " + last + " class = \"right_hex block hex forTo\"> </div>" +
            "</div>");
        setup("forTo");
        blocks[last].addArgument("lowerBound", null);
        blocks[last].addArgument("upperBound", null);
        ++last;
    });
    $("#forDownTo").click(function () {
        $("#workplace").prepend("<div id = " + last + " class = 'block forDownTo' style = \"background:#24375B\"> " +
            "<div id = " + last + " class = \"left_hex block hex forDownTo\">  </div>" +
            "<div id = " + last + " class = \"center_hex block hex forDownTo\" style = \"width:86px; background:#24375B;\"> For down to </div>" +
            "<div id = " + last + " class = \"right_hex block hex forDownTo\"> </div>" +
            "</div>");
        setup("forDownTo");
        blocks[last].addArgument("lowerBound", null);
        blocks[last].addArgument("upperBound", null);
        ++last;
    });
    $("#assign").click(function () {
        $("#workplace").prepend("<div id = " + last + " class = 'block assign' style = \"background:#24375B\" > Assign </div>");
        setup("assign");
        blocks[last].addArgument("expresion", null);
        blocks[last].addArgument("variableName", null);
        ++last;
    });
});