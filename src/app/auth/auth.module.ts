import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { LoginComponent } from './login/login.component';


@NgModule({
	declarations: [
		LoginComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule
	],
	exports: [
		LoginComponent
	]
})
export class AuthModule {};
