<template>
  <div id="app" class="container">
    <header>
      <h1>Secret Chat Room</h1>
      <div class="namebox">
        <input type="text" v-model="username" :class="{danger:username==''}" placeholder="your name" autofocus :disabled="startChat" @keyup.enter="enterName()">
        <span v-if="username!==''" @click="clearName()">
          <i class="far fa-times-circle"></i>
        </span>
      </div>
    </header>
    <div class="main">
      <div class="chatbox">
        <div class="msg" v-for="chat in livechat">
          <h3 :class="{self:chat.username==username}">{{chat.username}}：</h3>
          <span>{{chat.content}}</span>
        </div>
      </div>
      <div class="inputMsg">
        <input type="text" v-model="tempMsg" @keyup.enter="addMsg()" :disabled="username==''">
        <div class="toTop" @click="totheTop()">
          <i class="fas fa-arrow-up"></i>
        </div>
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
      const msg = document.querySelectorAll('input')[1];
      msg.focus();
    },
    addMsg() {
      const vm = this;
      vm.startChat = true;
      if (vm.username!=='' && vm.tempMsg!==''){
        const timestamp = Math.floor(Date.now() / 1000);
        let newMsg = {
          username: vm.username, 
          content: vm.tempMsg,
          timestamp: timestamp
        };
        chatroomRef.child(timestamp).set(newMsg);
      }
      vm.tempMsg = ''
    },
    totheTop() {
      window.scrollTo(0,0);
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
      window.scrollTo(0,document.body.scrollHeight);
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
}
.container{
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 16px;
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
.chatbox{
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 20vh;
  padding: 16px 32px;
}
.msg{
  margin: 8px 0;
}
.msg h3{
  margin:0;
  color: #0f008d;
  display: inline-block;
}
.msg h3.self{
  color: #888;
}
.inputMsg{
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 800px;
  margin: 0 auto;
  padding: 16px 32px;
  padding-bottom: 40px;
  text-align: center;
  background-color: #fff;
}
.inputMsg input[type=text]{
  width: 100%;
  height: 36px;
  border-radius: 16px;
  border: 1px solid #ccc;
  outline: none;
  padding-left: 16px;
  box-shadow: 5px 5px 5px silver;
}
.toTop{
  position: absolute;
  bottom: 90px;
  right: 30px;
  color: #ccc;
  font-size: 24px;
  cursor: pointer;
}
@media(max-width: 768px){
  .chatbox{
    width: 100%;
    padding: 0;
    padding-left: 8px;
  }
  .inputMsg{
    width: 100%;
    padding-bottom: 16px;
  }
  .toTop{
    bottom: 64px;
    right: 32px;
  }
}
</style>
