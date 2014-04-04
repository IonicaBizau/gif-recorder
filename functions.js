window.onerror = function (e) {
    $API.debug (JSON.stringify(e));
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

        // TODO compute position
        var command = "byzanz-record -d 120 -h " + size.height +
                      " -w " + size.width +
                      " -x " + position.left +
                      " -y " + position.top +
                      " -c " + $output.val()

        $API.resize (200, 100);
        $API.setWindowPosition (screenSize.width - 220, screenSize.height - 150);
    });
});
