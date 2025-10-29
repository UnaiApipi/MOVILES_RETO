import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Login {

  private apiUrl = 'https://example.com/api/login';

  constructor(private http: HttpClient) {  }

  authenticate(username: string, password: string) {
    console.log("username:", username, "password:", password);
    
    return this.http.post(this.apiUrl, { username, password });
  }




  
}
