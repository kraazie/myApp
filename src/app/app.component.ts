import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { ThreeDeeTouch, ThreeDeeTouchQuickAction, ThreeDeeTouchForceTouch } from '@ionic-native/three-dee-touch';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private threeDeeTouch: ThreeDeeTouch) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();



      this.threeDeeTouch.isAvailable().then(isAvailable => console.log('3D Touch available? ' + isAvailable));

      this.threeDeeTouch.watchForceTouches()
        .subscribe(
          (data: ThreeDeeTouchForceTouch) => {
            console.log('Force touch %' + data.force);
            console.log('Force touch timestamp: ' + data.timestamp);
            console.log('Force touch x: ' + data.x);
            console.log('Force touch y: ' + data.y);
          }
        );


      let actions: Array<ThreeDeeTouchQuickAction> = [
        {
          type: 'checkin',
          title: 'Check in',
          subtitle: 'Quickly check in',
          iconType: 'Compose'
        },
        {
          type: 'share',
          title: 'Share',
          subtitle: 'Share like you care',
          iconType: 'Share'
        },
        {
          type: 'search',
          title: 'Search',
          iconType: 'Search'
        },
        {
          title: 'Show favorites',
          iconTemplate: 'HeartTemplate'
        }
      ];

      this.threeDeeTouch.configureQuickActions(actions);

      this.threeDeeTouch.onHomeIconPressed().subscribe(
        (payload) => {
          // returns an object that is the button you presed
          console.log('Pressed the ${payload.title} button')
          console.log(payload.type)

        }
      )



    });
  }
}
