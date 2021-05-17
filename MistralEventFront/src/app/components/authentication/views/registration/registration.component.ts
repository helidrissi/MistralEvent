import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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

  saveIcon = faSave;
  cancelIcon = faTimes;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  registration() {
    if(this.checkEmailMistral()) {
      if (this.checkPassword()) {
       console.log(this.convertFormToNewUser());
      //  TODO ajouter une vérif si le compte existe
        this.authService.registration(this.convertFormToNewUser()).pipe(          
          switchMap(() => {
            return this.authService.login(this.formRegistration.value.email, this.formRegistration.value.password);
          })
        )
        .subscribe(() => {
            this.router.navigateByUrl("/home/account");
        },
        error => {
          console.log('error', error);
          this.errorMessage = 'Une erreur est survenu pendant votre inscription'
        }
        );
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
    const nameForEmail = this.formRegistration.value.lastName.toLowerCase();
    const firstNameForEmail = this.formRegistration.value.firstName.toLowerCase();
    const endsEmail = "@mistral.fr";
    const emailExpected = firstNameForEmail + '.' + nameForEmail + endsEmail;
    if (this.formRegistration.value.email !== emailExpected ) {
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

  checkLengthMdp(event) {
    if (event.target.value.length < 6) {
      this.errorMessage = "Le mot de passe saisie n'est pas assez long"
    } else {
      this.errorMessage = null
    }
  }
}
