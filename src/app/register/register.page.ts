import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  registerFormMessages = {
    nickname: [
      { type: 'required', message: 'El nickname es obligatorio' },
      {
        type: 'minlength',
        message: 'El nickname debe ser minimo 5 caracteres',
      },
    ],
    email: [
      { type: 'required', message: 'El email es obligatorio' },
      { type: 'email', message: 'Este valor debe ser un email' },
    ],
    password: [
      { type: 'required', message: 'El password es obligatorio' },
      {
        type: 'minlength',
        message: 'El password debe ser minimo 6 caracteres',
      },
    ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.buildForm();
  }
  async registerUser() {
    if (this.registerForm.valid) {
      try{
      const { nickname, email, password } = this.registerForm.value;
      await this.authService.register(nickname, email, password);
      this.navCtrl.navigateRoot('/menu');
    } catch(error){
      console.log(error); 
    }
  }
  }
  private buildForm() {
    this.registerForm = this.formBuilder.group({
      nickname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, , Validators.minLength(6)]],
    });
  }
}
