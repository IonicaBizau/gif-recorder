window.onerror = function (e) {
    $API.debug (JSON.stringify(e));
}

function timenow(){
    var now= new Date(),
    ampm= 'am',
    h= now.getHours(),
    m= now.getMinutes(),
    s= now.getSeconds();
    if(m<10) m= '0'+m;
    if(s<10) s= '0'+s;
    return h + "-" + m + "-" + s;
}

$(document).ready(function () {
    var $start = $(".start")
      , $width = $(".width")
      , $height = $(".height")
      , $position = $(".position")
      , $output = $(".output")
      ;

    setInterval (function () {
        var position = $API.getWindowPosition()
          , size     = $API.getWindowSize()
          ;
        $position.text(
            "X: " + position.left + "\n" +
            "Y: " + position.top + "\n" +
            "width: " + size.width + "\n" +
            "height: " + size.height
        );
    }, 100)

    $start.on("click", function () {

        var position = $API.getWindowPosition()
          , size     = $API.getWindowSize()
          , screenSize = $API.getScreenSize()
          ;

        var command = "byzanz-record\ \-d\ 30000\ \-h\ " + size.height +
                      "\ \-w\ " + size.width +
                      "\ \-x\ " + position.left +
                      "\ \-y\ " + position.top +
                      "\ out" + "\.gif" +
                      ""

        $API.debug(command);
        $API.resize (200, 100);
        $API.setWindowPosition (screenSize.width - 220, screenSize.height - 150);

        var pid = JSON.stringify($API.runBash(command));
        $API.debug("PID: " + pid);
    });
});
