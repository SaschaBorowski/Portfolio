import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contactme',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, RouterModule],
  templateUrl: './contactme.component.html',
  styleUrls: [
    './contactme.component.scss',
    './contactme.component2.scss',
    './contactme_submit_button.component.scss',
    'contactme.component.responsive.scss',
    'contactme.component.responsive2.scss',
    'contactme.component.responsive3.scss',
  ],
})
export class ContactmeComponent {
  contactForm: FormGroup;
  isSubmitted = false;
  successMessage = false;

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
          validators: [Validators.required, this.customEmailValidator],
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
      this.successMessage = false;
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

  customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    if (!email) return null;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      return { invalidEmail: true };
    }
    return null;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.http.post('https://borowski-sascha.de/sendmail.php', formData).subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            this.successMessage = true
            setTimeout(() => {
              this.successMessage = false
              this.contactForm.reset();
            }, 3000);
            
            this.isSubmitted = false;
          } else {
          }
        },
        error: (err) => {
        },
      });
    }
  }

  isButtonDisabled(): boolean {
    return this.contactForm.invalid;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}