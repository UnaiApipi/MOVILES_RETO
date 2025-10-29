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
  }

  async onSubmit() {
    
    if (this.username && this.password) {
      this.loginService.authenticate(this.username, this.password).subscribe({
        next: (data: any) => {
          if (data && data.success) {
            this.toastService.showToast('Login successful!', 2000, 'bottom', 'success');
            localStorage.setItem('token', {name: "unai", id: 12345}.toString());
            this.router.navigate(['/contacts']);
          } else {
            this.toastService.showToast('Login failed. Please check your credentials.', 2000, 'bottom', 'danger');

          }
        },
        error: (error) => {
          // Maneja errores de la solicitud HTTP
          this.toastService.showToast('Login failed. Server error: ' + error.message, 2000, 'bottom', 'danger');

        },
        complete: () => {
          console.log('Solicitud completada');
        }
      });
    } else {
            this.router.navigate(['/contacts']);

      this.toastService.showToast('Please enter username and password', 2000, 'bottom', 'danger');
    }
  }

}
