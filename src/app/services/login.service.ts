import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserDetails } from '../models/IUserDetails';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  validateCredentials(email: string, lozinka: string): Observable<IUserDetails> {
    let url = "http://localhost:51628/api/korisnik/SearchKorisnikByPrijava/" + email + "/" + lozinka + "/parametar";
    return this.http.get<IUserDetails>(url);
  }

  register(newUser: IUserDetails):Observable<IUserDetails> {
    let url = "http://localhost:51628/api/korisnik";
    return this.http.post<IUserDetails>(url, newUser);
  }
}
