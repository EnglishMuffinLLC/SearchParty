import {Page, NavController, NavParams} from 'ionic-angular';
import {TaskService} from '../../services/task-service/task-service';
import {Http, Headers, ConnectionBackend, HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/add/operator/map';


@Page({
  templateUrl: 'build/pages/tasks/tasks.html',
  providers: [
    ConnectionBackend,
    HTTP_PROVIDERS,
    TaskService
  ]
})

export class TaskPage {
  title = "Current Task"
  selectedItem: any;
  locAddress: any;
  locChallenge: any
  tasks: ['bar', 'restaurant', 'bar', 'restaurant']
  constructor(private nav: NavController, navParams: NavParams, private taskService: TaskService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  //store location address
  //store location map
  //store challenge

  //this should be triggered on when a template is submitted and whenever the next button is pushed
  showTask(){
    this.taskService.getData()
      .then(result => {
        this.locAddress = result.address
        this.locChallenge = result.challenge
        //add map
      }) 
   }

  //this should be triggered when the next button is pushed
  getNewTask(){
    if(this.tasks.length > 0){
      let keyword = this.tasks.pop()
      this.taskService.postData(keyword)
        .then(result => {
          this.locAddress = result.address
          this.locChallenge = result.challenge
        })
      }
    else {
      //user has completed the hunt
    }  
  }
  
}
