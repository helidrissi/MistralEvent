import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  formRegistration = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  registration() {
    if(this.checkEmailMistral()) {
      if (this.checkPassword()) {
       console.log(this.convertFormToNewUser());
        this.authService.registration(this.convertFormToNewUser()).subscribe((res) => {
          this.router.navigate(['/login']);
        });
      }
    }
  }
  checkPassword() {
    if (this.formRegistration.value.password !== this.formRegistration.value.passwordConfirmation) {
      this.errorMessage = "Les mots de passes doivent être identiques";
      return false;
    }
    return true;
  }

  checkEmailMistral() {
    if (!this.formRegistration.value.email.endsWith('@mistral.fr')) {
      this.errorMessage = "Vous devez avoir une adresse email Mistral ! "
      return false;
    }
    return true
  }
  convertFormToNewUser() {
    const newUser = {
      firstName: this.formRegistration.value.firstName,
      lastName: this.formRegistration.value.lastName,
      email: this.formRegistration.value.email,
      password: this.formRegistration.value.password,
    }

    return newUser;
  }
}
