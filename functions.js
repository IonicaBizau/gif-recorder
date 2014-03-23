window.onerror = function (e) {
    $API.debug (e.message);
}

$(document).ready(function () {

    if (typeof $API === "undefined") {
        alert("Load this page into Johnny's Webview");
        return;
    }

    $(".close").on("click", $API.closeWindow);

    var maximized = false;

    $(".maximize").on("click", function () {
        if (!maximized) {
            $API.setWindowState("MAXIMIZED");
            $(".window.finder").css({
                left:   "0px",
                top:    "0px",
                bottom: "0px",
                right:  "0px",
            });
            maximized = true;
        } else {
            $API.setWindowState("RESTORED");
            maximized = false;
            $(".window.finder").css({
                left:   "90px",
                top:    "90px",
                bottom: "90px",
                right:  "90px",
            });
        }
    });

    /* drag */
    var initialPos = {};
    var drag = false;
    $(".drag").on("mousedown", function (e) {
        drag = true;
        initialPos.x = e.pageX;
        initialPos.y = e.pageY;
    }).on("mousemove", function (e) {

        if (!drag) { return; }

        var current = $API.getWindowPosition();

        var winLeft, winTop;


        winLeft = current.left + (e.pageX - initialPos.x);
        winTop  = current.top + (e.pageY- initialPos.y);

        $API.setWindowPosition(winLeft, winTop);
    });

    $("body").on("mouseout mouseup", function () {
        drag = false;
        initial = {};
    });
});
