YUI.add('moodle-atto_pumukitmedia-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto pumukitmedia selection tool.
 *
 * @package    atto_pumukitmedia
 * @copyright  Teltek Video Research
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 * @module moodle-atto_pumukitmedia_alignment-button
 * @namespace M.atto_pumukitmedia
 * @class Button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_pumukitmedia';
var FLAVORCONTROL = 'pumukitmedia_flavor';
var LOGNAME = 'atto_pumukitmedia';

var CSS = {
    INPUTSUBMIT: 'atto_media_urlentrysubmit',
    INPUTCANCEL: 'atto_media_urlentrycancel',
    FLAVORCONTROL: 'flavorcontrol'
    },
    SELECTORS = {
        FLAVORCONTROL: '.flavorcontrol'
    };

var TEMPLATE = '<ul class="root nav nav-tabs" role="tablist">';
var TEMPLATE_TABCONTENT = '<div class="root tab-content">';

var ITEM_UPLOAD = '<li class="nav-item">' +
                        '<a class="nav-link" href="#{{elementid}}_upload" role="tab" data-toggle="tab">' +
                            '{{button_upload}}' +
                        '</a>' +
                  '</li>';

var TABCONTENT_UPLOAD =
    '<div class="tab-pane" id="{{elementid}}_upload">' +
    '<iframe class="custom-tab-content"' +
    ' src="{{PUMUKITURL}}/openedx/sso/upload?hash={{HASH}}&username={{USERNAME}}&email={{EMAIL}}&lang=en"' +
    ' allowfullscreen allow="microphone; camera; display-capture; clipboard-write"></iframe>' +
    '</div>';

TEMPLATE = TEMPLATE + ITEM_UPLOAD;
TEMPLATE_TABCONTENT = TEMPLATE_TABCONTENT + TABCONTENT_UPLOAD;

var ITEM_PERSONAL_RECORDER =
    '<li class="nav-item">' +
    '<a class="nav-link" href="#{{elementid}}_personal_recorder" role="tab" data-toggle="tab">' +
    '{{button_pr}}' +
    '</a>' +
    '</li>';

var TABCONTENT_PERSONALRECORDER =
    '<div data-medium-type="personal_recorder" class="tab-pane" id="{{elementid}}_personal_recorder">' +
    '<iframe class="custom-tab-content" id="pumukitmedia_iframe_recorder"' +
    ' src="{{PUMUKITURL}}/openedx/sso/personal_recorder?hash={{HASH}}&username={{USERNAME}}&email={{EMAIL}}&lang=en"' +
    ' allowfullscreen allow="microphone; camera; display-capture; clipboard-write"></iframe>' +
    '</div>';

var TEMPLATE_MANAGER =
        '<li class="nav-item">' +
            '<a class="nav-link active" href="#{{elementid}}_manager" role="tab" data-toggle="tab">' +
                '{{button_myvideos}}' +
            '</a>' +
        '</li>';

var TABCONTENT_MANAGERSERIES =
    '<div class="tab-pane active" id="{{elementid}}_manager">' +
    '<iframe class="custom-tab-content"' +
    ' src="{{PUMUKITURL}}/openedx/sso/manager?hash={{HASH}}&username={{USERNAME}}&email={{EMAIL}}&lang=en"' +
    ' allowfullscreen  allow="microphone; camera; display-capture; clipboard-write"></iframe>' +
    '</div>';

var TEMPLATE_PLAYLIST =
    '<li class="nav-item">' +
    '<a class="nav-link" href="#{{elementid}}_playlists" role="tab" data-toggle="tab">' +
    '{{button_playlists}}' +
    '</a>' +
    '</li>';

var TABCONTENT_MANAGERPLAYLIST =
    '<div class="tab-pane" id="{{elementid}}_playlists">' +
    '<iframe class="custom-tab-content"' +
    ' src="{{PUMUKITURL}}/openedx/sso/manager?hash={{HASH}}&username={{USERNAME}}&email={{EMAIL}}&lang=en&playlist=true"' +
    ' allowfullscreen allow="microphone; camera; display-capture; clipboard-write"></iframe>' +
    '</div>';

var TEMPLATE_SHAREDVIDEOS =
    '<li class="nav-item">' +
    '<a class="nav-link" href="#{{elementid}}_public" role="tab" data-toggle="tab">' +
    '{{button_sharevideos}}' +
    '</a>' +
    '</li>';

var TABCONTENT_SHAREDVIDEOS =
    '<div class="tab-pane" id="{{elementid}}_public">' +
    '<iframe class="custom-tab-content" src="{{PUMUKITURL}}/openedx/search/public/multimediaobjects"' +
    ' allowfullscreen allow="microphone; camera; display-capture; clipboard-write"></iframe>' +
    '</div>';

Y.namespace('M.atto_pumukitmedia').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

    _receiveMessageBind: null,

    initializer: function() {

        // If we don't have the capability to view then give up.
        if (this.get('disabled') || !this.get('capability')){
            return;
        }

        this.addButton({
            icon: 'e/insert_edit_video',
            //icon: 'icon',
            //iconComponent: 'atto_pumukitmedia',
            buttonName: 'pumukitmedia',
            callback: this._displayDialogue,
            callbackArgs: 'iconone'
        });

        // Force SSO
        var id = "pumukitmedia_iframe_sso";
        if (!document.getElementById(id)) {
            var iframe = document.createElement('iframe');
            iframe.id = id;
            iframe.style.display = "none";
            iframe.src = this.get('pumukitmediaurl') + "/openedx/sso/manager?hash=" +
                this.get('hash') + "&username=" +
                this.get('username') + "&email="+
                this.get('email') + "&lang=en";
            iframe.allow = "microphone; camera; display-capture; clipboard-write";
            document.getElementsByTagName('body')[0].appendChild(iframe);
        }
    },

    /**
     * Get the id of the flavor control where we store the ice cream flavor
     *
     * @method _getFlavorControlName
     * @return {String} the name/id of the flavor form field
     * @private
     */
    _getFlavorControlName: function(){
        return(this.get('host').get('elementid') + '_' + FLAVORCONTROL);
    },

     /**
     * Display the pumukitmedia Dialogue
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(e, clickedicon) {
        e.preventDefault();
        var width=900;

        this._receiveMessageBind = this._receiveMessage.bind(this);
        window.addEventListener('message', this._receiveMessageBind);

        var dialogue = this.getDialogue({
            headerContent: this.get('dialogtitle'),
            //width: width + 'px',
            widht: '70%', //rr width
            focusAfterHide: clickedicon
        });
        //dialog doesn't detect changes in width without this
        //if you reuse the dialog, this seems necessary
        if(dialogue.width !== width + 'px'){
            dialogue.set('width',width+'px');
            dialogue.set('max-width','550px');
        }

        //append buttons to iframe
        var buttonform = this._getFormContent(clickedicon);

        var bodycontent =  Y.Node.create('<div></div>');
        bodycontent.append(buttonform);

        dialogue.set('bodyContent', bodycontent);
        dialogue.show();
        this.markUpdated();

        // Add listen event to close on.
        var clickButton = document.getElementsByClassName('closebutton');
        if (clickButton[0]) {
            clickButton[0].addEventListener('click', this._closeSharedWindow);
        }
    },

     /**
     * Return the dialogue content for the tool, attaching any required
     * events.
     *
     * @method _getDialogueContent
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getFormContent: function(clickedicon) {

         var TARGET_TEMPLATE = TEMPLATE;
         var TARGET_TEMPLATE_CONTENT = TEMPLATE_TABCONTENT;

         if(this.get('showpr') !== "0") {
             TARGET_TEMPLATE = TARGET_TEMPLATE + ITEM_PERSONAL_RECORDER;
             TARGET_TEMPLATE_CONTENT = TARGET_TEMPLATE_CONTENT + TABCONTENT_PERSONALRECORDER;
         }

         TARGET_TEMPLATE = TARGET_TEMPLATE + TEMPLATE_MANAGER;
         TARGET_TEMPLATE_CONTENT = TARGET_TEMPLATE_CONTENT + TABCONTENT_MANAGERSERIES;

         if (this.get('showplaylist') !== "0") {
             TARGET_TEMPLATE = TARGET_TEMPLATE + TEMPLATE_PLAYLIST;
             TARGET_TEMPLATE_CONTENT = TARGET_TEMPLATE_CONTENT + TABCONTENT_MANAGERPLAYLIST;
         }

         if(this.get('showsharedvideos') !== "0") {
             TARGET_TEMPLATE = TARGET_TEMPLATE + TEMPLATE_SHAREDVIDEOS;
             TARGET_TEMPLATE_CONTENT = TARGET_TEMPLATE_CONTENT + TABCONTENT_SHAREDVIDEOS;
         }

         TARGET_TEMPLATE = TARGET_TEMPLATE + "</ul>";
         TARGET_TEMPLATE_CONTENT = TARGET_TEMPLATE_CONTENT + '</div>' +
             '<form class="atto_form">' +
             '<input class="{{CSS.FLAVORCONTROL}}" id="{{elementid}}_{{FLAVORCONTROL}}" ' +
             'name="{{elementid}}_{{FLAVORCONTROL}}" value="{{defaultflavor}}" ' +
             'type="hidden" />' +
             '</form>';

         TARGET_TEMPLATE = TARGET_TEMPLATE + TARGET_TEMPLATE_CONTENT;

        var template = Y.Handlebars.compile(TARGET_TEMPLATE),
            content = Y.Node.create(template({
                elementid: this.get('host').get('elementid'),
                CSS: CSS,
                FLAVORCONTROL: FLAVORCONTROL,
                PUMUKITURL: this.get('pumukitmediaurl'),
                HASH: this.get('hash'),
                USERNAME: this.get('username'),
                EMAIL: this.get('email'),
                CAPABILITY: this.get('capability'),
                PASSWORD: this.get('password'),
                DATE: this.get('date'),
                DEBUG: this.get('enabledebugmode'),
                component: COMPONENTNAME,
                defaultflavor: this.get('defaultflavor'),
                clickedicon: clickedicon,
                button_upload: M.util.get_string('button_upload', COMPONENTNAME),
                button_pr: M.util.get_string('button_pr', COMPONENTNAME),
                button_myvideos: M.util.get_string('button_myvideos', COMPONENTNAME),
                button_playlists: M.util.get_string('button_playlists', COMPONENTNAME),
                button_sharevideos: M.util.get_string('button_sharevideos', COMPONENTNAME)
            }));

        if(this.get('enabledebugmode') == 1) {
            console.log('URL: ' + this.get('pumukitmediaurl'));
            console.log('Date: ' + this.get('date'));
            console.log('Hash: ' + this.get('hash'));
            console.log('User: ' + this.get('username'));
            console.log('Email: ' + this.get('email'));
            console.log('Pwd: ' + this.get('password'));
        }

        this._form = content;
        //this._form.one('.' + CSS.INPUTSUBMIT).on('click', this._doInsert, this);

        return content;
    },

    /**
     * Inserts the users input onto the page
     * @method _getDialogueContent
     * @private
     */
    _doInsert : function(e){
        e.preventDefault();
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        var flavorcontrol = this._form.one(SELECTORS.FLAVORCONTROL);

        // If no file is there to insert, don't do it.
        if (!flavorcontrol.get('value')){
            Y.log('No flavor control or value could be found.', 'warn', LOGNAME);
            return;
        }

        this.editor.focus();
        this.get('host').insertContentAtFocusPoint(flavorcontrol.get('value'));
        this.markUpdated();
    },

    _receiveMessage : function(e){
        // window.addEventListener('message', function(e){
        if(e.data === 'enableMoodlePRAdd?'){
            e.source.postMessage({'moodlepradd':'OK'}, '*');
        }
        // });
        if (!e.data.mmId && !e.data.playlist && !e.data.url) {
            return;
        }

        e.preventDefault();
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        this._closeSharedWindow(e);

        // If no file is there to insert, don't do it.
        if (!e.data.mmId && !e.data.playlist && !e.data.url){
            Y.log('No URL from pumukitmedia value could be found.', 'warn', LOGNAME);
            return;
        }

        window.removeEventListener('message', this._receiveMessageBind);

        this.editor.focus();

        var url = this.get('pumukitmediaurl') + '/openedx/openedx/embed/' + e.data.mmId;
        if(e.data.playlist) {
            url = this.get('pumukitmediaurl') + '/openedx/openedx/playlist/embed/' + e.data.playlist;
        } else if(e.data.url){
            url = e.data.url;
        }

        // var iframe =
        //     '<div class="embed-responsive embed-responsive-16by9 tv-iframe">' +
        //     '<iframe class="embed-responsive-item tv-iframe-item" src="' + url +
        //     '" allowfullscreen allow="microphone; camera; display-capture; clipboard-write"></iframe>' +
        //     '<span style="display: none;">Video</span>' +
        //     '</div>';
        var iframe = '<a href="' + url + '" target="_blank" class="pumukit-media-link">' + url + '</a>';
        this.get('host').insertContentAtFocusPoint(iframe);
        this.markUpdated();
    },

    _closeSharedWindow : function(){
        var sharedWindow = document.getElementById('pumukitmedia_iframe_recorder');
        sharedWindow.parentNode.removeChild(sharedWindow);
    }
}, {
    ATTRS: {
        pumukitmediaurl: {
            value: ''
        },
        hash: {
            value: ''
        },
        username: {
            value: ''
        },
        email: {
            value: ''
        },
        dialogtitle: {
            value: ''
        },
        showpr: {
            value: ''
        },
        showplaylist: {
            value: ''
        },
        showsharedvideos: {
            value: ''
        },
        capability: {
            value: ''
        },
        password: {
            value: ''
        },
        date: {
            value: ''
        },
        enabledebugmode: {
            value: ''
        }
    }
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
