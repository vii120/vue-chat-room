<template>
  <div id="app" class="container">
    <header>
      <h1>Chat with someone!</h1>
      <div class="namebox">
        <input type="text" v-model="username" :class="{danger:username==''}" placeholder="your name" autofocus :disabled="startChat" @keyup.enter="enterName()">
        <span v-if="username!==''" @click="clearName()">
          <i class="far fa-times-circle"></i>
        </span>
      </div>
    </header>
    <div class="mainbox">
      <div class="boxtop">
        <div class="control">
          <div class="title">
            <img class="chatIcon" src="../static/images/chat.png">
            <span>Instant Message</span>
          </div>
          <div class="window-btn">
            <span class="btn"><i class="far fa-window-minimize"></i></span>
            <span class="btn"><i class="far fa-window-maximize"></i></span>
            <span class="btn"><i class="fas fa-times"></i></span>
          </div>
        </div>
        <div class="function-1">
          <span class="item">訊息(<span>C</span>)</span>
          <span class="item">編輯(<span>E</span>)</span>
          <span class="item">檢視(<span>V</span>)</span>
          <span class="item">互動(<span>A</span>)</span>
          <span class="item">說明(<span>H</span>)</span>
        </div>
        <div class="function-2">
          <div class="phone"><img src="../static/images/phone.png">通話</div>
          <div class="item"><img src="../static/images/scenario.png">聊天情境</div>
          <div class="item"><img src="../static/images/video.png">視訊</div>
          <div class="item"><img src="../static/images/save.png">傳檔</div>
          <div class="item"><img src="../static/images/camera.png">相片分享</div>
          <div class="item"><img src="../static/images/meeting.png">多人會議</div>
        </div>
        <div class="userStatus">
          <span></span>available
        </div>
      </div>
      <div class="chatbox">
        <div class="msg" v-for="chat in livechat">
          <h3 :class="{self:chat.username==username}">{{chat.username}}:</h3>
          <span>{{chat.content}}</span>
        </div>
      </div>
      <div class="text-function">
        <span>😎</span>
        <span>👄</span>
        <span>🎨</span>
        <span>🌞</span>
      </div>
      <div class="inputMsg">
        <textarea rows="3" cols="30" v-model="tempMsg" @keyup.enter="addMsg()" :disabled="username==''"></textarea>
      </div>
    </div>
  
  </div>
</template>

<script>
var chatroomRef = firebase.database().ref('/chatroom/');
export default {
  name: 'App',
  data () {
    return {
      username: '',
      tempMsg: '',
      msgCount: 0,
      startChat: false,
      livechat: []
    }
  },
  methods: {
    clearName() {
      const vm = this;
      vm.username = '';
      vm.startChat = false;
      localStorage.clear();
      const name = document.querySelector('input');
      name.removeAttribute('disabled', 'disabled');
      name.focus();
    },
    enterName(){
      const vm = this;
      if (vm.username !== ''){
        const msg = document.querySelector('textarea');
        msg.focus();
      }
    },
    addMsg() {
      const vm = this;
      vm.startChat = true;
      if (vm.username!=='' && vm.tempMsg.trim()!==''){
        const timestamp = Math.floor(Date.now() / 1000);
        let newMsg = {
          username: vm.username, 
          content: vm.tempMsg,
          timestamp: timestamp
        };
        chatroomRef.child(timestamp).set(newMsg);
      }
      vm.tempMsg = ''
    }
  },
  watch: {
    startChat() {
      if (this.startChat){
        localStorage.setItem('chatName',this.username);
      }
    },
    msgCount() {
      //scroll to bottom if msg added
      let chatbox = document.querySelector('.chatbox');
      chatbox.scrollTo(0,chatbox.scrollHeight);
    }
  },
  mounted() {
    const vm = this;
    //get localStorage
    if (localStorage.chatName!==undefined){
      vm.username = localStorage.getItem('chatName');
    }
    //get firebase data
    chatroomRef.orderByChild('timestamp').on('value', function(snapshot) {
      var val = snapshot.val();
      vm.livechat = val;
    });
    //get initial data length
    chatroomRef.once('value', function(snapshot) {
      vm.msgCount = Object.keys(snapshot.val()).length;
    });
  },
  updated() {
    let tempCount = document.querySelectorAll('.msg');
    this.msgCount = tempCount.length;
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lato');
*{
  box-sizing: border-box;
  position: relative;
}
.container{
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 8px;
  font-size: 14px;
  font-family: 'Lato', 'sans-serif', \5FAE\8EDF\6B63\9ED1\9AD4;
}
header{
  text-align: center;
  overflow: hidden;
}
h1{
  margin: 16px 0;
}
.namebox{
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.namebox input[type=text]{
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ccc;
  outline: none;
  text-align: center;
}
.namebox input[type=text].danger{
  border: 1px solid;
  color: red;
}
.namebox span{
  display: inline-block;
  margin-left: 8px;
  color: #ccc;
  font-size: 24px;
  cursor: pointer;
}
.mainbox{
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 36px;
  border: 2px solid #d1d3cf;
  border-radius: 8px;
  background-color: #f4f5eb;
}
.control{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 30px;
  background: linear-gradient(#cabdfc 25%, #7b79c7);
  padding: 0 8px;
}
.control .title{
  color: #fff;
  display: flex;
  align-items: center;
}
.control .chatIcon{
  display: inline-block;
  width: 24px;
  margin-right: 4px;
}
.window-btn{
  display: flex;
}
.window-btn .btn{
  display: block;
  margin: 0 2px;
  width: 18px;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  text-align: center;
  color: #7b7792;
  background: linear-gradient(#fffffc 10%, #d5d8d1);
  border: 1px solid #d7d9d5;
  border-radius: 4px;
  cursor: pointer;
}
.function-1{
  display: flex;
  font-size: 12px;
}
.function-1 .item{
  display: block;
  padding: 2px 8px;
  cursor: pointer;
}
.function-1 .item:hover{
  background-color: #dfdfdf;
}
.function-1 .item span{
  text-decoration: underline;
}
.function-2{
  display: flex;
  align-items: center;
  padding: 4px 0;
  padding-left: 8px;
  font-size: 12px;
}
.function-2 img{
  width: 24px;
}
.function-2 .phone{
  border: 1px solid #d1d3cf;
  border-radius: 25px;
  width: 96px;
  height: 46px;
  margin-right: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
}
.function-2 .phone:after{
  content: '';
  display: block;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #989898;
  margin-right: 6px;
}
.function-2 .item{
  text-align: center;
  cursor: pointer;
  width: 58px;
  padding: 6px 0;
}
.function-2 .phone:hover,
.function-2 .item:hover{
  background-color: #dfdfdf;
}
.function-2 .item img{
  display: block;
  margin: 0 auto;
}
.userStatus{
  padding: 4px 0;
  padding-left: 8px;
  display: flex;
  align-items: center;
}
.userStatus span{
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid #fba742;
  border-radius: 50%;
  background-color: #feda16;
  margin-right: 6px;
}
.chatbox{
  height: 60vh;
  padding-left: 16px;
  overflow-y: auto;
  border: 1px solid #d7d9d5;
  background-color: #fff;
  outline: none;
}
.msg{
  margin: 8px 0;
}
.msg h3{
  margin:0;
  margin-right: 2px;
  color: #333399;
  display: inline-block;
}
.msg h3.self{
  color: #888;
}
.text-function{
  font-size: 24px;
  padding: 4px 0;
  padding-left: 8px;
}
.text-function span{
  margin: 0 4px;
  cursor: pointer;
}
.inputMsg{
  padding: 0 6px;
  padding-bottom: 12px;
}
.inputMsg textarea{
  resize: none;
  width: 100%;
  height: 60px;
  border-radius: 3px;
  border: 1px solid #ccc;
  outline: none;
  padding: 4px 6px;
  font-size: inherit;
  font-family: inherit;
}
@media(max-width: 768px){
  .container{font-size: 12px;}
  .function-1, .function-2{font-size: 10px;}
  .function-1 .item{padding: 2px 6px;}
  .function-2 img{width: 20px;}
  .function-2 .phone{
    width: 80px;
    height: 36px;
  }
  .function-2 .item{width: 50px;}
  .function-2 .item:nth-child(3),
  .function-2 .item:nth-child(5){display: none;}
  .chatbox{padding-left: 8px;}
  .text-function{font-size: 18px;}
}
</style>
