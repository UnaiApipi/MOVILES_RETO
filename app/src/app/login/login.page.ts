import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonCard } from '@ionic/angular/standalone';
import { Login } from '../api/login';
import { ToastService } from '../services/toast';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonButton, IonCard, IonLabel]
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private loginService: Login,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.setItem('token', '');
  }

  async onSubmit() {
    
    this.loginService.login(this.username, this.password).subscribe({
      next: async (response) => {
        console.log('Login successful', response);  
        localStorage.setItem('token', `${response.username}-${new Date().getTime()}`);
        await this.toastService.showToast('Login successful', 2000, 'bottom', 'success');
        this.router.navigate(['/contacts']);
      },
      error: async (error) => {
        console.error('Login failed', error);
        await this.toastService.showToast('Login failed: ' + error.error.message, 3000, 'bottom', 'danger');
      }
    });
  }

}
