import {Page, NavController, NavParams, LocalStorage} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import {FORM_DIRECTIVES} from 'angular2/common';
import {JwtHelper} from 'angular2-jwt';
import {ConnectionBackend, HTTP_PROVIDERS} from 'angular2/http';
import {AuthService} from '../../services/auth/auth-service'
import {NgZone} from "angular2/core";
import {ChatService} from '../../services/chat/chat-service';
// import {io} from "socket.io"

@Page({
  templateUrl: 'build/pages/chat/chat.html',
  providers: [
    ConnectionBackend,
    HTTP_PROVIDERS,
    ChatService
  ],
  directives: [FORM_DIRECTIVES]
})
export class Chat {
  messages: any;
  socket: any;
  zone: any;
  chatBox: any;
  io: any;
  username: any;
  timeout: any;
  timoutFunction: any;
  jwtHelper: JwtHelper = new JwtHelper();
  typing: boolean;
  ADD_MESSAGE_URL: string = 'http://localhost:8000/addChatMessage';
  GET_MESSAGES_URL: string = 'http://localhost:8000/getChatMessages';
  huntID: any;


  constructor(
    private http: Http,
    private nav: NavController,
    navParams: NavParams,
    private _chatService: ChatService
  ) {
    let socket = io.connect('http://localhost:8000');
    this.timeout = undefined;
    this.typing = false;

    this.token = localStorage.id_token;
    if (this.token) {
      this.username = this.jwtHelper.decodeToken(this.token).username;
    }

    this.huntID = navParams.get('huntID');

    this.messages = [];
    this.zone = new NgZone({enableLongStackTrace: false});
    this.chatBox = "";
    this.socket = socket;
    this.socket.on("chat_message", (msg, username) => {
      this.zone.run(() => {
        console.log(this.messages);
        this.messages.push([username +": "+ msg]);
      });
    });

    let huntIDObject = {huntID: this.huntID};
    this._chatService.postData(JSON.stringify(huntIDObject), this.GET_MESSAGES_URL)
    .then(messagesFromDB => {
      this.zone.run(() => {
        console.log("messages from DB", messagesFromDB);
        let messagesArray = messagesFromDB.chatMessages;
        for(let i = 0; i < messagesArray.length; i++) {
          this.messages.push([messagesArray[i].username + ": " + messagesArray[i].text]);
        }
      })
    }).catch(error => console.error(error));

  }

  timeoutFunction() {
    this.typing = false;
    this.socket.emit('typing', false);
  }

  OnKey(event:KeyboardEvent) {
    console.log('this is the keyup event ', event);
    if (event) {
      console.log('ln 84: ', this.typing);
      if (this.typing === false) {
        this.typing = true;
        console.log('emitting true for typing', this.typing);
        this.socket.emit('typing', true);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.timeoutFunction.bind(this), 1500);
      }
    }
  }

  send(message) {
    if (message && message !== "") {
      console.log("username inside chat.ts", this.username);
      console.log("message inside chat.ts", message);

      let messageObject = {
        username: this.username,
        huntID: this.huntID,
        message: message
      };

      this._chatService.postData(JSON.stringify(messageObject), this.ADD_MESSAGE_URL)
      .then(messageAdded => {
        this.socket.emit("chat_message", messageAdded, this.username);
      }).catch(error => console.error(error))

    }
    this.chatBox = "";
  }
}
