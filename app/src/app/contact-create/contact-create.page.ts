import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonSelectOption, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { GetContacts } from '../api/contacts';


export interface Contact{
  id?: number;
  name: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.page.html',
  styleUrls: ['./contact-create.page.scss'],
  standalone: true,
  imports: [IonInput, IonSelectOption, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon]
})

export class ContactCreatePage implements OnInit {

  constructor(private router: Router, private getContactsService: GetContacts) { }
  id: number = 0;
  name: string = '';
  phone: string = '';
  email: string = '';

  ngOnInit() {

  }

  addContact() {
    this.getContactsService.addContact({
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email
    }).subscribe({
      next: (response) => {},
      error: (err) => {
        
        console.error('Error al crear contacto', err);
      },
      complete: () => {
        this.router.navigate(['/contacts']);
      }
    });
  }


  goBack() {
    this.router.navigate(['/contacts']);
  }

}
