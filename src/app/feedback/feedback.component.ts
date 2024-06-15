import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// Custom validator for name (alphabetic characters only)
function nameValidator(control: AbstractControl): ValidationErrors | null {
  const nameRegex = /^[a-zA-Z\s]*$/; // Allows alphabetic characters and spaces
  if (!nameRegex.test(control.value)) {
    return { 'invalidName': true };
  }
  return null;
}

// Custom validator for phone number (10 digits)
function phoneValidator(control: AbstractControl): ValidationErrors | null {
  const phoneRegex = /^[0-9]{10}$/; // Allows exactly 10 numeric digits
  if (!phoneRegex.test(control.value)) {
    return { 'invalidPhone': true };
  }
  return null;
}

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required, nameValidator]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, phoneValidator]],
      city: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      feedback: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.feedbackForm.valid) {
      this.http.post('http://localhost:3039/feedback', this.feedbackForm.value)
        .subscribe(response => {
          console.log('Feedback submitted', response);
          this.feedbackForm.reset();
        }, error => {
          console.error('Error submitting feedback', error);
        });
    }
  }

  // Helper function to retrieve validation error messages
  getErrorMessage(controlName: string): string {
    const control = this.feedbackForm.get(controlName);
    if (control?.hasError('required')) {
      return 'You must enter a value';
    }
    if (control?.hasError('email')) {
      return 'Not a valid email';
    }
    if (control?.hasError('invalidName')) {
      return 'Name must contain only alphabetic characters and spaces';
    }
    if (control?.hasError('invalidPhone')) {
      return 'Phone number must be 10 digits';
    }
    if (control?.hasError('min') || control?.hasError('max')) {
      return 'Rating must be between 1 and 5';
    }
    return '';
  }
}
