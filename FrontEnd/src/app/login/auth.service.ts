import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {}

  login(email: string, senha: string, perfil: string): Observable<string> {
    const loginData = { 
      email: email.trim(), 
      senha: senha.trim(),
      perfil: perfil.toLowerCase()
    };
    
    console.log('Enviando dados de login:', loginData);
    
    
    return this.http.post(this.apiUrl, loginData, { responseType: 'text' });
  }
}