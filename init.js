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
          if(typeof(TogetherJS) != 'undefined') {
            amplify.subscribe('active.onOpen', function(path) {
              TogetherJS.send({type: "codiad", action: 'active.onOpen', path: path});
            });
            amplify.subscribe('active.onFocus', function(path) {
              TogetherJS.send({type: "codiad", action: 'active.onFocus', path: path});
            });
            amplify.subscribe('active.onSave', function(path) {
              TogetherJS.send({type: "codiad", action: 'active.onSave', path: path});
            });
            amplify.subscribe('active.onRemoveAll', function() {
              TogetherJS.send({type: "codiad", action: 'active.onRemoveAll', path: null});
            });
            amplify.subscribe('active.onRename', function(oldPath, newPath) {
              TogetherJS.send({type: "codiad", action: 'active.onRename', oldpath: oldPath, newpath: newPath});
            });
            amplify.subscribe('active.onClose', function(path) {
              TogetherJS.send({type: "codiad", action: 'active.onClose', path: path});
            });
            
            amplify.subscribe('project.onOpen', function(path) {
              TogetherJS.send({type: "codiad", action: 'project.onOpen', path: path});
            });
            amplify.subscribe('project.onCreate', function(name, path, git_repo, git_branch) {
              TogetherJS.send({type: "codiad", action: 'project.onCreate', path: path});
            });
            amplify.subscribe('project.onRename', function(name, path) {
              TogetherJS.send({type: "codiad", action: 'project.onRename', path: path});
            });
            amplify.subscribe('project.onDelete', function(name, path) {
              TogetherJS.send({type: "codiad", action: 'project.onDelete', path: path});
            });
          }
        },
        
        //////////////////////////////////////////////////////////////////
        // Load TogetherJS
        //////////////////////////////////////////////////////////////////

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
                    TogetherJSConfig_suppressInvite = true;
                    TogetherJSConfig_siteName = "Codiad Together";
                    TogetherJSConfig_toolName = "Codiad Together";
                    TogetherJSConfig_findRoom = btoa(window.location.href);      
                    TogetherJS();
                } 
             });
        },
        
        //////////////////////////////////////////////////////////////////
        // Handle Remote Clicks
        //////////////////////////////////////////////////////////////////
        
        handle: function (target) {
          if(target.action == 'active.onOpen') {
            //codiad.filemanager.openFile(target.path);
          }
          if(target.action == 'active.onClose') {
             //codiad.active.remove(target.path);
          }
          if(target.action == 'active.onFocus') {
             //codiad.active.focus(target.path);
          }
          if(target.action == 'active.onRemoveAll') {
             //codiad.active.removeAll();
          }
          
          if(target.action == 'project.onOpen') {
             //codiad.project.open(target.path);
          }
        }
    };

})(this, jQuery);