import { Component, OnInit } from '@angular/core';
import { HouseService } from '../services/house.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-house-images',
  templateUrl: './house-images.page.html',
  styleUrls: ['./house-images.page.scss'],
})
export class HouseImagesPage implements OnInit {
  images: any[] = [];
  houseId!: number;

  constructor(
    private houseService: HouseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.houseId = +this.route.snapshot.paramMap.get('houseId')!;
    this.loadHouseImages();
  }

  loadHouseImages() {
    this.houseService.getHouseImages(this.houseId).subscribe({
      next: (response: any) => {
        this.images = response.images.map((img: any, index: number) => {
          if (!img.id) {
            console.warn(`Image at index ${index} is missing 'id'`);
            // Temporary placeholder ID for debugging
            img.id = index + 1;
          }
          return img;
        });
        console.log("Loaded images:", this.images); // Check if 'id' now exists for each image
      },
      error: (error) => {
        console.error('Error loading images:', error);
      }
    });
  }
  
  
  getImageUrl(imagePath: string): string {
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  }








  
  deleteImage(houseId: number, imageId: number) {
    console.log(`Deleting image with ID: ${imageId} for house ID: ${houseId}`);
    this.houseService.deleteHouseImage(houseId, imageId).subscribe(
      (response) => {
        console.log('Image deleted successfully', response);
        alert('Image deleted successfully'); // Show alert on successful deletion
        this.loadImages(houseId); // Refresh the image list
      },
      (error) => {
        console.error('Error deleting image:', error);
      }
    );
  }
  
  // Example loadImages method
  loadImages(houseId: number) {
    this.houseService.getHouseImages(houseId).subscribe(
      (images) => {
        this.images = images; // Update your images array or list with the new data
      },
      (error) => {
        console.error
        ('Error loading images:', error);
      }
    );
  }
} 