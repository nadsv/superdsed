import { Observable } from 'rxjs/Rx';
import { DialogComponent } from '../dialog/dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class DialogsService {

    constructor(private dialog: MdDialog) { }

    public inform(title: string, message: string, btnYesVisible: boolean, viewContainerRef: ViewContainerRef): Observable<boolean> {

        let dialogRef: MdDialogRef<DialogComponent>;
        let config = new MdDialogConfig();
        config.viewContainerRef = viewContainerRef;

        dialogRef = this.dialog.open(DialogComponent, config);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.param1 = btnYesVisible; 

        return dialogRef.afterClosed();
    }
}
