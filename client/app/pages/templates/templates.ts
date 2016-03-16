import {Page, NavController, NavParams} from 'ionic-angular';
import {TaskPage} from '../tasks/tasks';


@Page({
  templateUrl: 'build/pages/templates/templates.html',
})
export class TemplatePage {
  selectedItem: any;
  testData: Array<{type: string, huntname: string, image: string, icon: string}>;
  items: Array<{title: string, image: string, huntname: string, icon: string}>;

  constructor(private nav: NavController, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    
    this.testData = [
      {type: 'bar', huntname: 'Bar Hunt', image: 'img/bar.jpg', icon: 'ios-pint'},
      {type: 'beach', huntname: 'Beach Hunt', image: 'img/beach.jpg', icon: 'ios-water'},
      {type: 'brunch', huntname: 'Brunch Hunt', image: 'img/brunch.jpg', icon: 'ios-restaurant'},
      {type: 'coffee', huntname: 'Coffee Hunt', image: 'img/coffee.jpg', icon: 'cafe'},
      {type: 'park', huntname: 'Park Hunt', image: 'img/park.jpg', icon: 'leaf'},
      {type: 'ramen', huntname: 'Ramen Hunt', image: 'img/ramen.jpg', icon: 'ios-egg'}
      ];

    this.items = [];
    for (let hunt of this.testData) {
      this.items.push({
        title: hunt.type,
        image: hunt.image,
        huntname: hunt.huntname,
        icon: hunt.icon
      });
    }
  }

  itemTapped(event, item) {
    console.log(item);
    this.nav.push(TaskPage, {
      item: item
    });
  }
}
