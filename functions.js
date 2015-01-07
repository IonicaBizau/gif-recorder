window.onerror = function (e) {
    BAT.debug (JSON.stringify(e));
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
        var position = BAT.getWindowPosition()
          , size     = BAT.getWindowSize()
          ;
        $position.text(
            "X: " + position.left + "\n" +
            "Y: " + position.top + "\n" +
            "width: " + size.width + "\n" +
            "height: " + size.height
        );
    }, 100)

    $start.on("click", function () {

        var position = BAT.getWindowPosition()
          , size     = BAT.getWindowSize()
          , screenSize = BAT.getScreenSize()
          ;

        var command = "byzanz-record\ \-d\ 30000\ \-h\ " + size.height +
                      "\ \-w\ " + size.width +
                      "\ \-x\ " + position.left +
                      "\ \-y\ " + position.top +
                      "\ out" + "\.gif" +
                      ""

        BAT.debug(command);
        BAT.resize (200, 100);
        BAT.setWindowPosition (screenSize.width - 220, screenSize.height - 150);

        var pid = JSON.stringify(BAT.runBash(command));
        BAT.debug("PID: " + pid);
    });
});
