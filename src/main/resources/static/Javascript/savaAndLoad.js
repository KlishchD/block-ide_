function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

$(document).ready (function () {
    $("#save").click(function () {
        download("save.txt", JSON.stringify(blocks));
    });
    $("#load").click(function () {
        for (let i = 0; i < blocks.length; ++i) {
            if (blocks[i].getNextId() != null) {
                deleteConnection(i, blocks[i].getNextId());
            }
            for (let j = 0; j < blocks[i].getChildrens().length; ++j) {
                deleteConnection(i, blocks[i].getChildrens()[j]);
            }
        }
        blocks = [];
        const selectedFile = document.getElementById('input').files[0];
        console.log(selectedFile);
    });
});