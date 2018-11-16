import { Component, ViewChild, ViewChildren, QueryList, Renderer } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('fab') fab: FabContainer;
  @ViewChild('container') container: any;
  @ViewChildren('label') labels: QueryList<any>;

  constructor(public navCtrl: NavController,
    private renderer: Renderer) {

  }

  showMenuItem:boolean = false;
  
  public hideMenuFab() {
    this.fab.close();
    this.showMenuItems();
  }

  showMenuItems(){
    this.showMenuItem = this.fab._listsActive;
     
    this.renderer.setElementClass(this.container.nativeElement, "show", this.showMenuItem);
    let i = 1;
    var localLabel = this.showMenuItem ? this.labels.toArray().reverse() : this.labels.toArray();
    localLabel.forEach(elem => {
      setTimeout(() => this.renderer.setElementClass(elem.nativeElement, "show", this.showMenuItem), i * 50)
      i++;
    })
  }

  alertMe(name: string): void{
    alert(name);
  }

}
