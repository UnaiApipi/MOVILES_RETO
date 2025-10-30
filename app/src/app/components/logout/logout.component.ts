import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonImg, IonCard, IonButton, IonContent ,IonHeader, IonModal} from '@ionic/angular/standalone';
import { ToastService } from 'src/app/services/toast';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  imports: [IonImg, IonCard, IonButton, IonContent, IonHeader, IonModal]
})
export class LogoutComponent  implements OnInit {

  constructor(private router: Router, private toastService: ToastService) { }

  ngOnInit() {}



  logout() {
    localStorage.setItem('token', '');
    this.router.navigate(['/login']);
    this.toastService.showToast('Logged out successfully', 2000, 'bottom', '');
  }

}
