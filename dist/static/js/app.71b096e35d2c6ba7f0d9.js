webpackJsonp([1],{"47LP":function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("7+uW"),s=a("fZjL"),o=a.n(s),r=firebase.database().ref("/chatroom/"),i={name:"App",data:function(){return{username:"",tempMsg:"",msgCount:0,startChat:!1,livechat:[]}},methods:{clearName:function(){this.username="",this.startChat=!1,localStorage.clear();var e=document.querySelector("input");e.removeAttribute("disabled","disabled"),e.focus()},enterName:function(){document.querySelectorAll("input")[1].focus()},addMsg:function(){var e=this;if(e.startChat=!0,""!==e.username&&""!==e.tempMsg){var t=Math.floor(Date.now()/1e3),a={username:e.username,content:e.tempMsg,timestamp:t};r.child(t).set(a)}e.tempMsg=""},totheTop:function(){window.scrollTo(0,0)}},watch:{startChat:function(){this.startChat&&localStorage.setItem("chatName",this.username)},msgCount:function(){window.scrollTo(0,document.body.scrollHeight)}},mounted:function(){var e=this;void 0!==localStorage.chatName&&(e.username=localStorage.getItem("chatName")),r.orderByChild("timestamp").on("value",function(t){var a=t.val();e.livechat=a}),r.once("value",function(t){e.msgCount=o()(t.val()).length})},updated:function(){var e=document.querySelectorAll(".msg");this.msgCount=e.length}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"container",attrs:{id:"app"}},[a("header",[a("h1",[e._v("Secret Chat Room")]),e._v(" "),a("div",{staticClass:"namebox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],class:{danger:""==e.username},attrs:{type:"text",placeholder:"your name",autofocus:"",disabled:e.startChat},domProps:{value:e.username},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.enterName()},input:function(t){t.target.composing||(e.username=t.target.value)}}}),e._v(" "),""!==e.username?a("span",{on:{click:function(t){e.clearName()}}},[a("i",{staticClass:"far fa-times-circle"})]):e._e()])]),e._v(" "),a("div",{staticClass:"main"},[a("div",{staticClass:"chatbox"},e._l(e.livechat,function(t){return a("div",{staticClass:"msg"},[a("h3",{class:{self:t.username==e.username}},[e._v(e._s(t.username)+"：")]),e._v(" "),a("span",[e._v(e._s(t.content))])])})),e._v(" "),a("div",{staticClass:"inputMsg"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.tempMsg,expression:"tempMsg"}],attrs:{type:"text",disabled:""==e.username},domProps:{value:e.tempMsg},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.addMsg()},input:function(t){t.target.composing||(e.tempMsg=t.target.value)}}}),e._v(" "),a("div",{staticClass:"toTop",on:{click:function(t){e.totheTop()}}},[a("i",{staticClass:"fas fa-arrow-up"})])])])])},staticRenderFns:[]};var c=a("VU/8")(i,u,!1,function(e){a("47LP")},"data-v-2b3df66c",null).exports;n.a.config.productionTip=!1,new n.a({el:"#app",components:{App:c},template:"<App/>"})}},["NHnr"]);
//# sourceMappingURL=app.71b096e35d2c6ba7f0d9.js.map