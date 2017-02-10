import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { routing } from './shared/app.routes';

import { SedApiService } from './shared/sed-api.service';
import { DialogsService } from './shared/dialog.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { SearchformComponent } from './searchform/searchform.component';
import { DocformComponent } from './docform/docform.component';
import { GrouplistComponent } from './grouplist/grouplist.component';
import { FileloaderComponent } from './fileloader/fileloader.component';
import { TabsComponent } from './tabs/tabs.component';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        SearchformComponent,
        DocformComponent,
        GrouplistComponent,
        FileloaderComponent,
        TabsComponent,
        DialogComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule, 
        HttpModule,
        MaterialModule.forRoot(),
        routing
    ],
    providers: [
        SedApiService, 
        DialogsService
    ],
    entryComponents: [
        DialogComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
