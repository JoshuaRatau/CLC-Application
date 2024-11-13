import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Method to get houses added by the user
  getUserHouses(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`  // Assuming token is stored in localStorage
    });

    console.log('Fetching user houses with headers:', headers);
    return this.http.get<any>(`${this.apiUrl}/user/houses`, { headers });
  }

  // Method to add a new house
  addHouse(houseData: { address: string; description: string; latitude: number; longitude: number }): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    });

    console.log('Adding house with data:', houseData);
    return this.http.post<any>(`${this.apiUrl}/houses`, houseData, { headers });
  }
}

