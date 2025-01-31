import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contactme',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './contactme.component.html',
  styleUrls: [
    './contactme.component.scss',
    './contactme.component2.scss',
    './contactme_submit_button.component.scss',
    'contactme.component.responsive.scss',
    'contactme.component.responsive2.scss',
  ],
})
export class ContactmeComponent {
  contactForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: [
        '',
        {
          validators: [Validators.required, Validators.pattern('^[a-zA-Z ]+$')],
          updateOn: 'change',
        },
      ],
      email: [
        '',
        {
          validators: [
            Validators.required,
            Validators.email,
            Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
          ],
          updateOn: 'change',
        },
      ],
      message: [
        '',
        {
          validators: [Validators.required],
          updateOn: 'change',
        },
      ],
      privacyPolicy: [
        false,
        {
          validators: [Validators.requiredTrue],
          updateOn: 'change',
        },
      ],
    });

    this.contactForm.valueChanges.subscribe(() => {
      this.isSubmitted = false;
    });
  }

  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get message() {
    return this.contactForm.get('message');
  }

  get privacyPolicy() {
    return this.contactForm.get('privacyPolicy');
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.http.post('https://borowski-sascha.de/sendmail.php', formData).subscribe({
        next: (response: any) => {
          console.log('Antwort vom Server:', response);
          if (response.status === 'success') {
            alert('Form successfully submitted!');
            this.contactForm.reset();
            this.isSubmitted = false;
          } else {
            alert('Error: ' + response.message);
          }
        },
        error: (error) => {
          console.error('Fehler beim Absenden:', error);
          alert('Failed to submit the form. Please try again later.');
        },
      });
    } else {
      console.error('Form is invalid.');
    }
  }

  isButtonDisabled(): boolean {
    return this.contactForm.invalid;
  }

  openPrivacyPolicy(event: MouseEvent): void {
    event.preventDefault();
    window.open('./privacy-policy', '_blank');
  }
}