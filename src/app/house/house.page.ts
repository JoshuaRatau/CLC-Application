import { Component, OnInit } from '@angular/core';
import { HouseService } from '../services/house.service';  // Assumes you have this service created
import { Router } from '@angular/router';

@Component({
  selector: 'app-house',
  templateUrl: './house.page.html',
  styleUrls: ['./house.page.scss'],
})
export class HousePage implements OnInit {
  houses: any[] = [];

  constructor(private houseService: HouseService, private router: Router) {}

  ngOnInit() {
    this.getUserHouses();
  }

  getUserHouses() {
    this.houseService.getUserHouses().subscribe({
      next: (response: any) => {
        this.houses = response.houses || [];
      },
      error: (error) => {
        console.error('Error fetching houses:', error);
        alert('Could not load houses. Please try again.');
      }
    });
  }
}
