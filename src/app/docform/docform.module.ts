import  { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { DocformComponent } from './docform.component';
import { FileloaderComponent } from './fileloader/fileloader.component';
import { TabsComponent } from './tabs/tabs.component';
import { UserListsComponent } from './user-lists/user-lists.component';
import { ChangesComponent } from './changes/changes.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [
		DocformComponent,
		FileloaderComponent,
		TabsComponent,
		UserListsComponent,
		ChangesComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule,
		SharedModule
	]
})
export class DocFormModule {};
