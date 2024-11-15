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


  // Method to upload a house image
  uploadHouseImage(houseId: number, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`
    });
  
    const url = `${this.apiUrl}/houses/${houseId}/images`;
    console.log('Uploading image with form data:', formData);
    return this.http.post(url, formData, { headers });
  }
  

// Method to delete a house
deleteHouse(houseId: number): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  });
  return this.http.delete(`${this.apiUrl}/houses/${houseId}`, { headers });
}


getHouseImages(houseId: number): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  });
  return this.http.get(`${this.apiUrl}/houses/${houseId}/images`, { headers });
}




deleteHouseImage(houseId: number, imageId: number): Observable<any> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('authToken')}`
  });

  return this.http.delete<any>(`${this.apiUrl}/houses/${houseId}/images/${imageId}`, { headers });
}





}





