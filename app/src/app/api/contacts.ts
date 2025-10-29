import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contact {
id: number;
name: string;
email: string;
phone: string;
}

@Injectable({
  providedIn: 'root'
})


export class GetContacts {

  private allContactsUrl = 'http://127.0.0.1:5000/contacts';
  private contactsByIdUrl = 'http://127.0.0.1:5000/contacts/';
  private modifyContactUrl = 'http://127.0.0.1.5000/contacts/modify/';
  private addContactUrl = 'http://127.0.0.1.5000/contacts/add/';

  constructor(private http: HttpClient) { }


  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.allContactsUrl);
  }



  getContactById(id: number): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsByIdUrl + id);
  }


  modifyContact(contact: Contact ): Observable<any> {
    return this.http.put(this.modifyContactUrl + contact.id, contact);
  }


  addContact(contact: Contact): Observable<any> {
    return this.http.post(this.addContactUrl, contact);
  }
}
