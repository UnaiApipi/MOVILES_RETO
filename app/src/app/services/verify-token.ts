import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerifyToken implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    const path = this.router.url;
    if (path.includes('/contacts')) {
      const token = localStorage.getItem('token');
      if (!token) {
        this.router.navigate(['/login']);
      } else {
        // Optionally, add further token validation logic here
      }
    }
    else {
      localStorage.setItem('token', '');
    }
  }

}
