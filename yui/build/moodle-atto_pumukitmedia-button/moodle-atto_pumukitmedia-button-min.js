YUI.add("moodle-atto_pumukitmedia-button",function(e,t){var n="atto_pumukitmedia",r="pumukitmedia_flavor",i="atto_pumukitmedia",s={INPUTSUBMIT:"atto_media_urlentrysubmit",INPUTCANCEL:"atto_media_urlentrycancel",FLAVORCONTROL:"flavorcontrol"},o={FLAVORCONTROL:".flavorcontrol"},u='<ul class="root nav nav-tabs" role="tablist">',a='<div class="root tab-content">',f='<li class="nav-item"><a class="nav-link" href="#{{elementid}}_upload" role="tab" data-toggle="tab">{{button_upload}}</a></li>',l='<div class="tab-pane" id="{{elementid}}_upload"><iframe class="custom-tab-content" src="{{PUMUKITURL}}/openedx/sso/upload?hash={{HASH}}&username={{USERNAME}}&email={{EMAIL}}&lang=en" allowfullscreen allow="microphone; camera; display-capture"></iframe></div>';u+=f,a+=l;var c='<li class="nav-item"><a class="nav-link" href="#{{elementid}}_personal_recorder" role="tab" data-toggle="tab">{{button_pr}}</a></li>',h='<div data-medium-type="personal_recorder" class="tab-pane" id="{{elementid}}_personal_recorder"><iframe class="custom-tab-content" id="pumukitmedia_iframe_recorder" src="{{PUMUKITURL}}/openedx/sso/personal_recorder?hash={{HASH}}&username={{USERNAME}}&email={{EMAIL}}&lang=en" allowfullscreen allow="microphone; camera; display-capture"></iframe></div>',p='<li class="nav-item"><a class="nav-link active" href="#{{elementid}}_manager" role="tab" data-toggle="tab">{{button_myvideos}}</a></li>',d='<div class="tab-pane active" id="{{elementid}}_manager"><iframe class="custom-tab-content" src="{{PUMUKITURL}}/openedx/sso/manager?hash={{HASH}}&username={{USERNAME}}&email={{EMAIL}}&lang=en" allowfullscreen  allow="microphone; camera; display-capture"></iframe></div>',v='<li class="nav-item"><a class="nav-link" href="#{{elementid}}_playlists" role="tab" data-toggle="tab">{{button_playlists}}</a></li>',m='<div class="tab-pane" id="{{elementid}}_playlists"><iframe class="custom-tab-content" src="{{PUMUKITURL}}/openedx/sso/manager?hash={{HASH}}&username={{USERNAME}}&email={{EMAIL}}&lang=en&playlist=true" allowfullscreen allow="microphone; camera; display-capture"></iframe></div>',g='<li class="nav-item"><a class="nav-link" href="#{{elementid}}_public" role="tab" data-toggle="tab">{{button_sharevideos}}</a></li>',y='<div class="tab-pane" id="{{elementid}}_public"><iframe class="custom-tab-content" src="{{PUMUKITURL}}/openedx/search/public/multimediaobjects" allowfullscreen allow="microphone; camera; display-capture"></iframe></div>';e.namespace("M.atto_pumukitmedia").Button=e.Base.create("button",e.M.editor_atto.EditorPlugin,[],{_receiveMessageBind:null,initializer:function(){if(this.get("disabled")||!this.get("capability"))return;this.addButton({icon:"e/insert_edit_video",buttonName:"pumukitmedia",callback:this._displayDialogue,callbackArgs:"iconone"});var e="pumukitmedia_iframe_sso";if(!document.getElementById(e)){var t=document.createElement("iframe");t.id=e,t.style.display="none",t.src=this.get("pumukitmediaurl")+"/openedx/sso/manager?hash="+this.get("hash")+"&username="+this.get("username")+"&email="+this.get("email")+"&lang=en",t.allow="microphone; camera; display-capture",document.getElementsByTagName("body")[0].appendChild(t)}},_getFlavorControlName:function(){return this.get("host").get("elementid")+"_"+r},_displayDialogue:function(t,n){t.preventDefault();var r=900;this._receiveMessageBind=this._receiveMessage.bind(this),window.addEventListener("message",this._receiveMessageBind);var i=this.getDialogue({headerContent:this.get("dialogtitle"),widht:"70%",focusAfterHide:n});i.width!==r+"px"&&(i.set("width",r+"px"),i.set("max-width","550px"));var s=this._getFormContent(n),o=e.Node.create("<div></div>");o.append(s),i.set("bodyContent",o),i.show(),this.markUpdated();var u=document.getElementsByClassName("closebutton");u[0]&&u[0].addEventListener("click",this._closeSharedWindow)},_getFormContent:function(t){var i=u,o=a;this.get("showpr")!=="0"&&(i+=c,o+=h),i+=p,o+=d,this.get("showplaylist")!=="0"&&(i+=v,o+=m),this.get("showsharedvideos")!=="0"&&(i+=g,o+=y),i+="</ul>",o=o+"</div>"+'<form class="atto_form">'+'<input class="{{CSS.FLAVORCONTROL}}" id="{{elementid}}_{{FLAVORCONTROL}}" '+'name="{{elementid}}_{{FLAVORCONTROL}}" value="{{defaultflavor}}" '+'type="hidden" />'+"</form>",i+=o;var f=e.Handlebars.compile(i),l=e.Node.create(f({elementid:this.get("host").get("elementid"),CSS:s,FLAVORCONTROL:r,PUMUKITURL:this.get("pumukitmediaurl"),HASH:this.get("hash"),USERNAME:this.get("username"),EMAIL:this.get("email"),CAPABILITY:this.get("capability"),PASSWORD:this.get("password"),DATE:this.get("date"),DEBUG:this.get("enabledebugmode"),component:n,defaultflavor:this.get("defaultflavor"),clickedicon:t,button_upload:M.util.get_string("button_upload",n),button_pr:M.util.get_string("button_pr",n),button_myvideos:M.util.get_string("button_myvideos",n),button_playlists:M.util.get_string("button_playlists",n),button_sharevideos:M.util.get_string("button_sharevideos",n)}));return this.get("enabledebugmode")==1&&(console.log("URL: "+this.get("pumukitmediaurl")),console.log("Date: "+this.get("date")),console.log("Hash: "+this.get("hash")),console.log("User: "+this.get("username")),console.log("Email: "+this.get("email")),console.log("Pwd: "+this.get("password"))),this._form=l,l},_doInsert:function(e){e.preventDefault(),this.getDialogue({focusAfterHide:null}).hide();var t=this._form.one(o.FLAVORCONTROL);if(!t.get("value"))return;this.editor.focus(),this.get("host").insertContentAtFocusPoint(t.get("value")),this.markUpdated()},_receiveMessage:function(e){e.data==="enableMoodlePRAdd?"&&e.source.postMessage({moodlepradd:"OK"},"*");if(!e.data.mmId&&!e.data.playlist&&!e.data.url)return;e.preventDefault(),this.getDialogue({focusAfterHide:null}).hide(),this._closeSharedWindow(e);if(!e.data.mmId&&!e.data.playlist&&!e.data.url)return;window.removeEventListener("message",this._receiveMessageBind),this.editor.focus();var t=this.get("pumukitmediaurl")+"/openedx/openedx/embed/"+e.data.mmId;e.data.playlist?t=this.get("pumukitmediaurl")+"/openedx/openedx/playlist/embed/"+
e.data.playlist:e.data.url&&(t=e.data.url);var n='<div class="embed-responsive embed-responsive-16by9 tv-iframe"><iframe class="embed-responsive-item tv-iframe-item" src="'+t+'" allowfullscreen allow="microphone; camera; display-capture"></iframe>'+'<span style="display: none;">Video</span>'+"</div>";this.get("host").insertContentAtFocusPoint(n),this.markUpdated()},_closeSharedWindow:function(){var e=document.getElementById("pumukitmedia_iframe_recorder");e.parentNode.removeChild(e)}},{ATTRS:{pumukitmediaurl:{value:""},hash:{value:""},username:{value:""},email:{value:""},dialogtitle:{value:""},showpr:{value:""},showplaylist:{value:""},showsharedvideos:{value:""},capability:{value:""},password:{value:""},date:{value:""},enabledebugmode:{value:""}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});
