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
        
    $.getScript(curpath+'togetherjs-min.js');    

    $(window)
        .load(function() {
            codiad.together.init();
        });

    codiad.together = {
    
        controller: curpath + 'controller.php',

        //////////////////////////////////////////////////////////////////
        // Initilization
        //////////////////////////////////////////////////////////////////

        init: function () {
        
        },

        load: function () {
            var _this = this;
            var currentResponse = null;
            $.ajax({
                url: _this.controller + '?action=username',
                async: false,
                success: function(data) {
                    TogetherJSConfig_getUserName = function () {return data;};
                    TogetherJSConfig_getUserAvatar = function () {return curpath+'avatar.jpg';};
                    TogetherJSConfig_getUserColor = function () {return '#fff';};
                    TogetherJSConfig_suppressJoinConfirmation = true;
                    //TogetherJSConfig_suppressInvite = true;
                    TogetherJSConfig_siteName = "Codiad Together";
                    TogetherJSConfig_toolName = "Codiad Together";
                    TogetherJS();
                } 
             });
        }
    };

})(this, jQuery);