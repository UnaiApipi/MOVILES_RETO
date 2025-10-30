import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonSelectOption, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { GetContacts } from '../api/contacts';
import { ToastService } from '../services/toast';
import { LogoutComponent } from '../components/logout/logout.component';
import { VerifyToken } from '../services/verify-token';


export interface Contact {
  name: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.page.html',
  styleUrls: ['./contact-create.page.scss'],
  standalone: true,
  imports: [LogoutComponent, IonInput, IonSelectOption, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon]
})

export class ContactCreatePage implements OnInit {

  constructor(private router: Router, private getContactsService: GetContacts, private toastService: ToastService, private verifyToken: VerifyToken) { }

  name: string = '';
  email: string = '';
  phone: string = '';

  ngOnInit() {
    this.verifyToken.ngOnInit();
  }

  addContact() {
    this.getContactsService.createContact({ name: this.name, email: this.email, phone: this.phone }).subscribe({
      next: (response) => { },
      error: (err) => {
        this.toastService.showToast('Error creating contact: ' + err.message, 2000, 'bottom', 'danger');

      },
      complete: () => {
        this.toastService.showToast('Contact created successfully!', 2000, 'bottom', 'success');
        // this.router.navigate(['/contacts']);
      }
    });
  }


  goBack() {
    this.router.navigate(['/contacts']);
  }

}
