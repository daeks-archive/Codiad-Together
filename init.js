/*
 *  Copyright (c) Codiad & daeks, distributed
 *  as-is and without warranty under the MIT License. See
 *  [root]/license.txt for more. This information must remain intact.
 */ 
 
 (function (global, $) {

    var codiad = global.codiad,
        scripts= document.getElementsByTagName('script'),
        path = scripts[scripts.length-1].src.split('?')[0],
        curpath = path.split('/').slice(0, -1).join('/')+'/';
        
    $.getScript('https://togetherjs.com/togetherjs-min.js');    

    $(window)
        .load(function() {
            codiad.together.init();
        });

    codiad.together = {

        //////////////////////////////////////////////////////////////////
        // Initilization
        //////////////////////////////////////////////////////////////////

        init: function () {
          TogetherJSConfig_getUserName = function () {return 'Codiad Username';};
          //TogetherJSConfig_getUserAvatar = function () {return avatarUrl;};
          //TogetherJSConfig_getUserColor = function () {return '#ff00ff';};
          TogetherJSConfig_suppressJoinConfirmation = true;
          //TogetherJSConfig_suppressInvite = true;
          TogetherJSConfig_siteName = "Plugin";
          TogetherJSConfig_toolName = "Plugin";
          TogetherJS();
        }
    };

})(this, jQuery);