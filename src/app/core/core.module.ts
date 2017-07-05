import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

import { SedApiService } from '../shared/sed-api.service';
import { DialogsService } from '../shared/dialog.service';

import { routing } from '../app.routing';

@NgModule ({
	declarations: [
		HeaderComponent,
		FooterComponent,
		MenuComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		routing
	],
	exports: [
		HeaderComponent,
		FooterComponent
	],
	providers: [
		SedApiService, 
        DialogsService
	]
	})
export class CoreModule {}