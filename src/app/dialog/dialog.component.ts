import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './dialog.component.html',
})
export class DialogComponent {

    public title: string;
    public message: string;

    constructor(public dialogRef: MdDialogRef<DialogComponent>) {

    }
}