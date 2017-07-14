import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DialogsService } from '../../shared/dialog.service';
import { SedApiService } from '../../shared/sed-api.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup; 

  constructor(private sedAPI: SedApiService, 
              private dialogsService: DialogsService, 
              private viewContainerRef: ViewContainerRef,
              private authService: AuthService) { }

  ngOnInit() {
    this.authForm = new FormGroup({
          name: new FormControl(''),
          password: new FormControl(''), 
        });
  }

  onEnter() {
    this.authService.vcRef = this.viewContainerRef;
    this.authService.loginUser(this.authForm.controls['name'].value, 
      this.authForm.controls['password'].value);
  }

}
