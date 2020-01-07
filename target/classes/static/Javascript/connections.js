function updateLine(f, t) {
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
    let length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
    let line = $("#line" + f + "o" + t);
    line.css("height", length);
    line.css("top", ay);
    line.css("left", ax);
    line.css("transform", "rotate(" + calc + "deg)");
    line.css("-ms-transform", "rotate(" + calc + "deg)");
    line.css("-moz-transform", "rotate(" + calc + "deg)");
    line.css("-o-transform", "rotate(" + calc + "deg)");
}

function createline(f, t) {
    let ay = $("#" + f).position().top + 12;
    let ax = $("#" + f).position().left + 50;
    let bx = $("#" + t).position().left + 50;
    let by = $("#" + t).position().top + 12;
    if (by < ay) {
        bx = ax + bx;
        ax = bx - ax;
        bx = bx - ax;
        by = ay + by;
        ay = by - ay;
        by = by - ay;
    }
    let calc = 180 * (Math.atan((ax - bx) / (by - ay)) / Math.PI);
    let length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
    $("#workplace").prepend("<div id='line" + f + "o" + t + "' style='height:" + length + "px;width:1px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>");
}

function createConnection(f, t) {
    if (f === null || t === null) {
        return;
    }
    if (t === f) {
        alert("Error same elements");
        return;
    }
    if (t === "0") {
        alert("Start can't be a sun");
        return;
    }
    for (let i = 0; i < last; ++i) {
        if (blocks[i].getNextId() === t) {
            alert("No more than one parent");
            return;
        }
        for (let j = 0; j < blocks[i].getChildrens().length; ++j) {
            if (blocks[i].getChildrens()[j] === t) {
                alert("No more than one parent");
                return;
            }
        }
    }
    if (blocks[f].getNextId() !== null) {
        alert("No more than one sun");
        return;
    }
    createline(f, t);
    blocks[from].setNextId(to);
}

function createChildrenConnection(f, t) {
    if (f === null || t === null) {
        return;
    }
    if (t === f) {
        alert("Error same elements");
        return;
    }
    if (t === "0") {
        alert("Start can't be a sun");
        return;
    }
    for (let i = 0; i < last; ++i) {
        if (blocks[i].getNextId() === t) {
            alert("No more than one parent");
            return;
        }
        for (let j = 0; j < blocks[i].getChildrens().length; ++j) {
            if (blocks[i].getChildrens()[j] === t) {
                alert("No more than one parent");
                return;
            }
        }
    }
    if (blocks[f].getNextId() !== null) {
        alert("No more than one sun");
        return;
    }
    createline(f, t);
    blocks[f].addChild(t);
    if (blocks[f].getChildrens().length === 1) $("#line" + f + "o" + t).css("background-color", "green");
    else $("#line" + f + "o" + t).css("background-color", "red");
}

function deleteConnection (f, t) {
    if (f === null || t === null) {
        return;
    }
    let child = false;
    for (let i = 0; i < blocks[f].getChildrens().length; ++i) {
        if (blocks[f].getChildrens()[i] === t) {
            child = true
        }
    }
    if (blocks[f].getNextId() !== t && !child) {
        alert("Haven't exist this connection");
        return;
    }
    if (child) {
        let newChildrenIds = [];
        for (let i = 0; i < blocks[f].getChildrens().length; ++i) {
            if (blocks[f].getChildrens()[i] !== t) {
                newChildrenIds.push(blocks[f].getChildrens()[i]);
            }
        }
        blocks[f].setChildrens(newChildrenIds);
    } else {
        blocks[f].setNextId(null);
    }
    $("#line" + f + "o" + t).remove();

}

$(document).mousemove(function (e) {
    for (let i = 0; i < last; ++i) {
        for (let j = 0; j < blocks[i].getChildrens().length; ++j) {
            updateLine(i, blocks[i].getChildrens()[j]);
        }
        if (blocks[i].getNextId() === null) {
            continue;
        }
        updateLine(i, blocks[i].getNextId());
    }
});

$(document).keydown(function (e) {
    if (e.which === 13 || e.which === 107) {
        if (e.which === 13) createConnection(from, to);
        else createChildrenConnection(from, to);
        from = null;
        to = null;
    }

    if (e.which === 46) {
        deleteConnectoin(from, to);
        from = null;
        to = null;
    }
});

