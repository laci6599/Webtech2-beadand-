import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/domain/auth/user.service';
import { UserDTO } from 'src/app/services/domain/auth/user/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() { }

  registerGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  });
  new_user: UserDTO;

  loginGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  });
  user: UserDTO;

  register() {

    this.new_user = {
      name: this.registerGroup.get('name').value,
      password: this.registerGroup.get('password').value,
    }

    console.log(this.new_user);

    this.authService.register(this.new_user.name, this.new_user.password).subscribe((res) => {
      console.log(res);

      if (res == null) {
        this.registerGroup.reset();
      } else {
        sessionStorage.clear();
        sessionStorage.setItem('currentUser', this.new_user.name);
        this.router.navigate(['settings', 'product']);
      }

    });

  }

  login() {

    this.user = {
      name: this.loginGroup.get('name').value,
      password: this.loginGroup.get('password').value,
    }

    console.log(this.user);

    this.authService.login(this.user.name, this.user.password).subscribe((res) => {
      console.log(res);

      if (res == null) {
        this.loginGroup.reset();
      } else {
        sessionStorage.clear();
        sessionStorage.setItem('currentUser', this.user.name);
        this.router.navigate(['settings', 'product']);
      }

    });

  }

  getError(el) {
    switch (el) {
      case 'user':
        if (this.loginGroup.get('name').hasError('required')) {
          return 'A felhasználónév kitöltése kötelező!';
        }
        break;
      case 'reg_user':
        if (this.registerGroup.get('name').hasError('required')) {
          return 'A felhasználónév kitöltése kötelező!';
        }
        break;
      case 'pass':
        if (this.loginGroup.get('password').hasError('required')) {
          return 'A jelszó kitöltése kötelező!';
        }
        break;
      case 'reg_pass':
        if (this.registerGroup.get('password').hasError('required')) {
          return 'A jelszó kitöltése kötelező!';
        }
        break;
      default:
        return '';
    }
  }

}