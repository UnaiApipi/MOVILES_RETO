// contact-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton, IonIcon
} from '@ionic/angular/standalone';

import { GetContacts } from '../api/contacts';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast';



@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton, IonIcon
  ]
})


export class ContactDetailPage {

  modifyMode: boolean = false;

  name: string = '';
  email: string = '';
  phone: string = '';

  contact: any = {};

  constructor(
    private getContactsService: GetContacts,
    private router: Router,
    private toastService: ToastService
  ) {
    
    const url = this.router.url;
    const segments = url.split('/').filter(s => s.length > 0);
    const last = segments[segments.length - 1];
    const idStr = last.split('?')[0];
    const id = Number(idStr);

    

    this.getContactsService.getContactById(id).subscribe({
      next: (contact) => {
        console.log(contact);
        if(contact){

          this.contact = contact;
          this.name = this.contact.name;
          this.email = this.contact.email;
          this.phone = this.contact.phone;
        }
       
      },
      error: (err) => {
        console.error('Error al cargar contacto', err);
      },
    });
  }


  goBack() {
    this.modifyMode = false;
    this.router.navigate(['/contacts']);
  }

  changeModifyMode() {
    this.modifyMode = !this.modifyMode;
    // if (this.modifyMode) {
    //   this.name = this.contact.name;
    //   this.email = this.contact.email;
    //   this.phone = this.contact.phone;
    // }
  }

  modifyContact() {
    this.contact.name = this.name;
    this.contact.email = this.email;
    this.contact.phone = this.phone;

    this.getContactsService.modifyContact(this.contact).subscribe({
      next: (contact) => {
        // this.contact = contact;
        // this.name = contact.name;
        // this.email = contact.email;
        // this.phone = contact.phone;
        this.toastService.showToast('Contact updated successfully!', 2000, 'bottom', 'success');
      },
      error: (err) => {
        this.toastService.showToast('There was an issue updating the contact', 2000, 'bottom', 'danger');
        console.error('Error al modificar contacto', err);
      },
    });
    this.modifyMode = false;
  }

  cancel() {
    this.modifyMode = false;
    this.name = this.contact.name;
    this.email = this.contact.email;
    this.phone = this.contact.phone;
  }

  clearContact() {
    this.getContactsService.deleteContact(this.contact.id).subscribe({
      next: () => {
        this.toastService.showToast('Contact deleted successfully!', 2000, 'bottom', 'success');
        this.router.navigate(['/contacts']);
      },
      error: () => {
        this.toastService.showToast('There was an issue deleting the contact', 2000, 'bottom', 'danger');
      },
    });
  }
}