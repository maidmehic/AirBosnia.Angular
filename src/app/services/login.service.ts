import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from '../models/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  successfulRegistration: string;
  constructor(private http: HttpClient) { }

  validateCredentials(email: string, lozinka: string): Observable<UserDetails> {
    let url = "http://localhost:51628/api/korisnik/SearchKorisnikByPrijava/" + email + "/" + lozinka + "/parametar";
    return this.http.get<UserDetails>(url);
  }

  register(newUser: UserDetails): Observable<UserDetails> {
    let url = "http://localhost:51628/api/korisnik";
    return this.http.post<UserDetails>(url, newUser);
  }
}
