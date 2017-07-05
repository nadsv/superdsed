import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { UserListComponent } from './user-list/user-list.component';

@NgModule({
	declarations: [
		UserListComponent
	],
	imports: [
		MaterialModule,
		CommonModule
	],
	exports: [
		CommonModule,
		MaterialModule,
		UserListComponent
	] 
})
export class SharedModule{};