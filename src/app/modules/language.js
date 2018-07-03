(function (tw) {
    'use strict';
    /**
     * Get the language from the path
     */
    var get = function () {
        var pathArray = window.location.pathname.split('/');
        //get the two letter code from the array
        for (var i = 0; i < pathArray.length; i++) {
        if(pathArray[i].length === 2){
            return pathArray[i];
        }
        }
        return 'en'; //Default language
    };

    /**
     * Initialize the i18n module
     */
    tw.language = {
        'get': get
    };
})(tw);
