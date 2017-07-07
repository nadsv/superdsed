import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { UserListComponent } from './user-list/user-list.component';
import { DecodeHTMLPipe } from '../shared/decodeHTML.pipe'; 

@NgModule({
	declarations: [
		UserListComponent,
		DecodeHTMLPipe
	],
	imports: [
		MaterialModule,
		CommonModule
	],
	exports: [
		CommonModule,
		MaterialModule,
		UserListComponent,
		DecodeHTMLPipe,
	] 
})
export class SharedModule{};