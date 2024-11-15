import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HouseService } from '../services/house.service';
import { ActivatedRoute, Router } from '@angular/router';  // Import Router
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.page.html',
  styleUrls: ['./upload-images.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class UploadImagesPage implements OnInit {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  houseId!: number;

  constructor(
    private fb: FormBuilder,
    private houseService: HouseService,
    private route: ActivatedRoute,
    private router: Router  // Inject Router
  ) {
    this.uploadForm = this.fb.group({
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    const houseIdParam = this.route.snapshot.paramMap.get('houseId');
    if (houseIdParam) {
      this.houseId = +houseIdParam;
      console.log('Retrieved houseId from route:', this.houseId);
    } else {
      console.error('houseId parameter is missing from route');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  goToHouseImages() {
    this.router.navigate([`/house-images`, this.houseId]);  // Use houseId directly
  }

  onSubmit() {
    if (this.uploadForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('description', this.uploadForm.get('description')?.value);

      this.houseService.uploadHouseImage(this.houseId, formData).subscribe({
        next: (response) => {
          console.log('Image uploaded successfully:', response);
          alert('Image uploaded successfully!');
          this.uploadForm.reset();
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please check permissions and try again.');
        },
      });
    } else {
      console.error('Form is invalid or file is missing');
    }
  }
}


