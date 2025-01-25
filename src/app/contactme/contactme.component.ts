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
  styleUrls: ['./contactme.component.scss', './contactme_submit_button.component.scss'],
})
export class ContactmeComponent {

  contactForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]], // Nur Buchstaben
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
      message: ['', [Validators.required]], // Nachricht darf nicht leer sein
      privacyPolicy: [false, [Validators.requiredTrue]], // Muss akzeptiert sein
    });
  }

  // Getter für Form-Steuerelemente
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

  // Methode zum Abschicken des Formulars
  onSubmit(): void {
    this.isSubmitted = true;

    // Überprüfen, ob das Formular gültig ist
    if (this.contactForm.valid) {
      const formData = this.contactForm.value; // Alle Formulardaten sammeln

      // Daten an das Backend (PHP) senden
      this.http.post('https://borowski-sascha.de/sendmail.php', formData).subscribe({
        next: (response: any) => {
          console.log('Antwort vom Server:', response);
          if (response.status === 'success') {
            alert('Form successfully submitted!');
            this.contactForm.reset(); // Formular zurücksetzen
            this.isSubmitted = false; // Reset für den nächsten Versuch
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
      this.checkFieldsForErrors(); // Felder prüfen und zurücksetzen
    }
  }

  // Überprüft die Felder und leert sie, wenn sie ungültig sind
  checkFieldsForErrors(): void {
    if (this.name?.invalid && this.name?.value) {
      this.name?.setValue(''); // Leert das Name-Feld
    }
    if (this.email?.invalid && this.email?.value) {
      this.email?.setValue(''); // Leert das Email-Feld
    }
    if (this.message?.invalid && this.message?.value) {
      this.message?.setValue(''); // Leert das Message-Feld
    }
  }

  // Methode, die überprüft, ob der Button aktiviert oder deaktiviert werden soll
  isButtonDisabled(): boolean {
    return (
      !this.contactForm.get('name')?.value ||
      !this.contactForm.get('email')?.value ||
      !this.contactForm.get('message')?.value ||
      !this.contactForm.get('privacyPolicy')?.value
    );
  }

  // Methode zum Behandeln des Focus-Events
  onFocus(fieldName: string): void {
    const field = this.contactForm.get(fieldName);
    if (field?.invalid) {
      field.setValue(''); // Leert das Feld beim Fokussieren
    }
  }

  openPrivacyPolicy(event: MouseEvent): void {
    event.preventDefault(); // Verhindert das Standardverhalten des Links
    window.open('/privacy-policy', '_blank'); // Öffnet die Angular-Route in einem neuen Tab
  }
}
