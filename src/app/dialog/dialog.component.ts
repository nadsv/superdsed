import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

    public title: string;
    public message: string;
    public param1: boolean;

    constructor(public dialogRef: MdDialogRef<DialogComponent>) {
    }

}