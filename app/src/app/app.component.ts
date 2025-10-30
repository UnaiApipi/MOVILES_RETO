import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { VerifyToken } from './services/verify-token';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit{
  constructor(private verifyToken: VerifyToken) {}

  ngOnInit() {
    this.verifyToken.ngOnInit();
  }
}
