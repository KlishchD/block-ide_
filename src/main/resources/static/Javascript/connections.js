
$(document).mousemove(function (e) {
    for (let i = 0; i < last; ++i) {
        if (blocks[i].getNextId() === null) {
            continue;
        }
        let f = i, t = blocks[i].getNextId();
        let ay = $("#" + f).position().top + 12;
        let ax = $("#" + f).position().left + 50;
        let by = $("#" + t).position().top + 12;
        let bx = $("#" + t).position().left + 50;
        if (by < ay) {
            bx = ax + bx;
            ax = bx - ax;
            bx = bx - ax;
            by = ay + by;
            ay = by - ay;
            by = by - ay;
        }
        let calc = Math.atan((ax - bx) / (by - ay));
        calc = 180 * (calc / Math.PI);
        length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
        line = $("#line" + f);
        line.css("height", length);
        line.css("top", ay);
        line.css("left", ax);
        line.css("transform", "rotate(" + calc + "deg)");
        line.css("-ms-transform", "rotate(" + calc + "deg)");
        line.css("-moz-transform", "rotate(" + calc + "deg)");
        line.css("-o-transform", "rotate(" + calc + "deg)");
    }
});

$(document).keydown(function (e) {
   if (e.which === 13) {
       console.log("HERE", from, " ", to);
        if (from === null || to === null) {
            return;
        }
        if (to === from) {
            alert("Error same elements");
            return;
        }
        if (to === "0") {
            alert("Start can't be a sun");
            return;
        }
        console.log(from, " ", to);
        for (let i = 0; i < last; ++i) {
            if (blocks[i].getNextId() === to) {
                alert("No more than one parent");
                return;
            }
        }
        if (blocks[from].getNextId() !== null) {
            alert("No more than one sun");
            return;
        }
        blocks[from].setNextId(to);
        console.log("HERERS");
        let ay = $("#" + from).position().top + 12;
        let ax = $("#" + from).position().left + 50;
        let bx = $("#" + to).position().left + 50;
        let by = $("#" + to).position().top + 12;
        if (by < ay) {
            bx = ax + bx;
            ax = bx - ax;
            bx = bx - ax;
            by = ay + by;
            ay = by - ay;
            by = by - ay;
        }
        let calc = Math.atan((ax - bx) / (by - ay));
        calc = 180 * (calc / Math.PI);
        length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
        $("#workplace").prepend("<div id='line" + from + "' style='height:" + length + "px;width:1px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>");
        from = null;
        to = null;
    }
  /*  if (e.which === 46) {
        if (from === null || to === null) {
            return;
        }
        if ((fromTo[from] !== to || toFrom[to] !== from) || (inFromTo[from] !== to || inToFrom[to] !== from)) {
            alert("Haven't exist this connection");
            return;
        }
        fromTo[from] = null;
        toFrom[to] = null;
        inFromTo[from] = null;
        inToFrom[to] = null;
        $("#line" + from).remove();
        $("#lineIn" + from).remove();
        from = null;
        to = null;
    }*/
});

