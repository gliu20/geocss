/**
 * This removes annoying blue outline unless 
 * the user is using the keyboard and tabbing around
 */
(function () {
    var allowFocusing = false;

    function allowTabFocusing (e) {
        if (e.key === "Tab" && !allowFocusing) {
            document.body.classList.remove("force-no-outline");
            allowFocusing = true;
        }
    }

    function disallowTabFocusing () {
        if (allowFocusing) {
            document.body.classList.add("force-no-outline");
            allowFocusing = false;
        }
    }


    document.body.addEventListener("keyup",allowTabFocusing);
    document.body.addEventListener("mousedown",disallowTabFocusing);
    document.body.addEventListener("touchstart",disallowTabFocusing);

    
})();

/**
 * De-focuses buttons after they have been pressed
 * unless they are a keyboard user
 */
(function () {
    var buttons = document.querySelectorAll("button");

    function defocus (e) {
        e.target.blur();
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("mouseup",defocus);
        buttons[i].addEventListener("touchend",defocus);
    }
})();