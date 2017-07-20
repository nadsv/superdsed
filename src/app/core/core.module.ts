import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';

import { SedApiService } from '../shared/sed-api.service';
import { DialogsService } from '../shared/dialog.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';

import { RoutingModule } from '../routing.module';

import { AuthModule } from '../auth/auth.module';
import { ExecutorService } from '../shared/executor.service';

@NgModule ({
	declarations: [
		HeaderComponent,
		FooterComponent,
		MenuComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		RoutingModule,
		AuthModule
	],
	exports: [
		HeaderComponent,
		FooterComponent
	],
	providers: [
		SedApiService, 
        DialogsService,
        AuthService,
        ExecutorService
	]
	})
export class CoreModule {}