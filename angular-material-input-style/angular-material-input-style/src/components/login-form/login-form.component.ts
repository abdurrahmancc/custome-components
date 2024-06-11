import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  showPass: boolean = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),]],
      password: ['', Validators.required],
    });
  }



  toggleShowPass() {
    this.showPass = !this.showPass;
  }

  submit() {
    console.log('pattern', this.loginForm.get('email')?.hasError('pattern'));
    console.log('required', this.loginForm.get('email')?.hasError('required'));
    console.log('email', this.loginForm.get('email')?.hasError('email'));
    console.log('dirty', this.loginForm.get('email')?.dirty);
    console.log('touched', this.loginForm.get('email')?.touched);

    // If form is valid, submit the form data
    if (this.loginForm.valid) {
      // Handle form submission
      console.log(this.loginForm.value);
    }
  }
}
