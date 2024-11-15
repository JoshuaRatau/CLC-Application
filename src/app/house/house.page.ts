import { Component, OnInit } from '@angular/core';
import { HouseService } from '../services/house.service';
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

  // Navigate to the upload images page with the selected houseId
  goToUploadImages(houseId: number) {
    this.router.navigate(['/upload-images', houseId]);
  }

  goToHouseImages(houseId: number) {
    this.router.navigate([`/house-images`, houseId]);
  }
  
  // Fetch houses for the logged-in user
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

  // Method to delete a house
  deleteHouse(houseId: number) {
    if (confirm('Are you sure you want to delete this house and all associated images?')) {
      this.houseService.deleteHouse(houseId).subscribe({
        next: () => {
          alert('House and all associated images deleted successfully.');
          this.houses = this.houses.filter(house => house.id !== houseId); // Update the list of houses
        },
        error: (error) => {
          console.error('Error deleting house:', error);
          alert('Failed to delete house. Please try again.');
        }
      });
    }
  }
}
