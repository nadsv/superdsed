import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './shared/app.routes';

import { SedApiService } from './shared/sed-api.service';
import { DialogsService } from './shared/dialog.service';
import { PagerService } from './shared/pagination.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { DocformComponent } from './docform/docform.component';
import { FileloaderComponent } from './docform/fileloader/fileloader.component';
import { TabsComponent } from './docform/tabs/tabs.component';
import { DialogComponent } from './dialog/dialog.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { UserListsComponent } from './docform/user-lists/user-lists.component';
import { UserListComponent } from './docform/user-lists/user-list/user-list.component';
import { ChangesComponent } from './docform/changes/changes.component';
import { CatalogsModule } from './catalogs/catalogs.module';
import { SearchFormModule } from './searchform/searchform.module'; 


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MenuComponent,
        DocformComponent,
        FileloaderComponent,
        TabsComponent,
        DialogComponent,
        PageNotFoundComponent,
        UserListsComponent,
        UserListComponent,
        ChangesComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule, 
        MaterialModule.forRoot(),
        BrowserAnimationsModule,
        HttpModule,
        routing,
        CatalogsModule,
        SearchFormModule
    ],
    providers: [
        SedApiService, 
        DialogsService,
        PagerService
    ],
    entryComponents: [
        DialogComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }