import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonSelectOption, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { GetContacts } from '../api/contacts';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
  standalone: true,
  imports: [IonInput, IonSelectOption, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon]
})


export class ContactDetailPage implements OnInit {

  modifyMode: boolean = false;

  contact: any = null;

  name: string = '';
  phone: string = '';
  email: string = '';
  type: string = '';

  constructor(private getContactsService: GetContacts, private router: Router, private toastService: ToastService) {
    const url = this.router.url || '';
    const segments = url.split('/').filter(s => s.length > 0);
    const last = segments[segments.length - 1] || '';
    const idStr = last.split('?')[0];
    const id = Number(idStr);

    if (!isNaN(id)) {
      this.contact = this.getContactsService.getContactById(id);

    } else {
      toastService.showToast('Invalid contact ID', 2000, 'bottom', 'danger');
      router.navigate(['/contacts']);
    }
  }

  ngOnInit() {

    const url = this.router.url;
    const segments = url.split('/').filter(s => s.length > 0);
    const last = segments[segments.length - 1];
    const idStr = last.split('?')[0];
    const id = Number(idStr);

    this.getContactsService.getContactById(id).subscribe({
      next: (contact) => {
        this.contact = contact;
        this.name = this.contact?.name || '';
        this.phone = this.contact?.phone || '';
        this.email = this.contact?.email || '';
        this.type = this.contact?.type || '';
        console.log(contact);
      },
      error: (err) => {
        console.error('Error al cargar contacto', err);
      }
    });

    if (this.contact) {
      this.name = this.contact.name;
      this.phone = this.contact.phone;
      this.email = this.contact.email;
      this.type = this.contact.type;
    }
  }

  goBack() {
    this.modifyMode = false;
    this.name = this.contact.name;
    this.phone = this.contact.phone;
    this.email = this.contact.email;
    this.type = this.contact.type;
    this.router.navigate(['/contacts']);
  }

  changeModifyMode() {
    this.modifyMode = !this.modifyMode;
  }

  saveContact() {
    // Lógica para guardar el contacto modificado
    this.toastService.showToast('Contact updated successfully!', 2000, 'bottom', 'success');
    this.modifyMode = false;
  }

  cancel() {
    this.modifyMode = false;
    this.name = this.contact.name;
    this.phone = this.contact.phone;
    this.email = this.contact.email;
    this.type = this.contact.type;
  }

  clearContact() {
    this.name = '';
    this.phone = '';
    this.email = '';
    this.type = '';
    this.toastService.showToast('Contact cleared!', 2000, 'bottom', 'warning');
  }

}
