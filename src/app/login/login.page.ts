import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  registerForm: FormGroup;
  registerFormMessages = {
    email: [
      {type: 'required', message: 'El Email es obligatorio'},
      {type: 'email', message: 'Tiene que introducir un E-mail valido'},
    ],
    password: [
      {type: 'required', message: 'La contraseña es obligatorio'},
      {type: 'minlength', message: 'La contraseña debe tener minimo 6 caracteres'},
    ]
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.buildForm();
  }
  async registerLogin() {
    if (this.registerForm.valid) {
      try{
      const {email, password } = this.registerForm.value;
    await this.authService.login(email, password);
    this.navCtrl.navigateRoot('/menu');
      } catch(error){
        console.error(error);
      }  
    
    }
  }
  private buildForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, , Validators.minLength(6)]],
    });
  }
}
