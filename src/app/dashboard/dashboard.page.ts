// Import the required Angular components
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HouseService } from '../services/house.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  houseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private houseService: HouseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.houseForm = this.fb.group({
      address: ['', Validators.required],
      description: [''],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
  }

  // Method to submit the form
  onAddHouse() {
    if (this.houseForm.valid) {
      const houseData = {
        address: this.houseForm.get('address')?.value,
        description: this.houseForm.get('description')?.value,
        latitude: this.houseForm.get('latitude')?.value,
        longitude: this.houseForm.get('longitude')?.value
      };
  
      this.houseService.addHouse(houseData).subscribe({
        next: (response) => {
          console.log('House added successfully:', response);
          //alert('House added successfully!');
          this.houseForm.reset();

          // Redirect to the HousePage to show the list of houses
          this.router.navigate(['/house']); // Ensure '/house' matches the route to HousePage
        },
        error: (error) => {
          console.error('Error adding house:', error);
          if (error.error) {
            alert(`Failed to add house. Server responded with: ${JSON.stringify(error.error)}`);
          } else {
            alert('Failed to add house. Please try again.');
          }
        }
      });
    }
  }
}
