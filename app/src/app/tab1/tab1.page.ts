import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonItem, IonList, IonSearchbar, IonText, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { GetContacts } from '../api/contacts';
import { Router } from '@angular/router';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, ExploreContainerComponent, IonItem, IonList, IonSearchbar, IonText, IonLabel, IonButton],
})
export class Tab1Page {


  contacts: Contact[] = [];

  filteredContacts: Contact[] = [];
  searchTerm: string = '';

  constructor(private getContactsService: GetContacts, private router: Router) { }

  ngOnInit() {
    this.getContactsService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.filteredContacts = contacts;
        console.log(contacts);

      },
      error: (err) => {
        console.error('Error al cargar contactos', err);
      }
    });
  }

  filterContacts(event: any) {
    const value = event.detail.value?.toLowerCase() || '';

    this.filteredContacts = this.contacts.filter(contact =>
      (contact?.name && contact.name?.toLowerCase().includes(value)) ||
      (contact?.email && contact.email?.toLowerCase().includes(value)) ||
      (contact?.phone && contact.phone?.toLowerCase().includes(value))
    );
  } 



  addContact() {
    this.router.navigate(['/contact/create']);
  }

  detailContact(id: number) {
    this.router.navigate(['/contacts/' + id]);
  }
}
