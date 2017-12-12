import { Component, OnInit, OnDestroy, Input, ViewContainerRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { SedApiService } from '../../shared/sed-api.service';
import { DialogsService } from '../../shared/dialog.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
	selector: 'app-fileloader',
	templateUrl: './fileloader.component.html',
	styleUrls: ['./fileloader.component.scss']
})
export class FileloaderComponent implements OnInit {
	@Input() type: string;
	@ViewChild('fileInput') fileInputVariable: any;
	files: any[];
	private idDoc: number;
	private  MAX_FILE_SIZE = 40000000;
	uploading: boolean = false;
	private docSubsription: Subscription;

	constructor(private sedAPI: SedApiService,
				private dialogsService: DialogsService, 
                private viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
		this.setFiles();
		this.docSubsription = this.sedAPI.docChanged
  		.subscribe( 
  			( id ) => { this.setFiles() }
  		);
	}

	setFiles() {
		this.files = this.sedAPI.links
				.filter(x => x.type == this.type)
				.map((x) => { x.address = this.sedAPI.dataUrl + x.address ; return x } );
		this.idDoc = this.sedAPI.id;
	}

	ngOnDestroy() {
		this.docSubsription.unsubscribe();
	}

	onLoadBtnClick( event ) {
		const items = event.target.files;
		const baseLink = event.srcElement.value.split('\\').slice(0, -1).join('\\');
		for ( const item of items ) {
			this.fileInputVariable.nativeElement.value = "";
			const link = baseLink + '\\' + item.name;
			const name = link.split('\\').pop();
			if (+item.size > this.MAX_FILE_SIZE ) {
				this.dialogsService.inform('Сообщение об ошибке', 'Размер файла больше 40МБ!', false, this.viewContainerRef);
				return;
			};
			
		    let file = { id: 0, address: `${this.sedAPI.dataUrl}${this.idDoc}/${this.type}/${name}`, id_doc: this.idDoc, type: this.type, name: name };
			this.uploadFile(name, item, file);
		}
	}

	onDeleteFile( i ){
		const item = JSON.stringify({ 'id': this.files[i].id});
		this.sedAPI.changeData(this.sedAPI.apiUrl + 'update-link-to-del', item)
			.subscribe(
				() => {this.files.splice( i, 1 ); this.sedAPI.listsChanged = true;},
				() => this.dialogsService.inform('Сообщение об ошибке', 'Запись не удалена!', false, this.viewContainerRef)
			)
	}

	private uploadFile( name, file, obj ) {
		let formData = new FormData();
        formData.append(`${this.idDoc}/${this.type}`, file, name);
        this.uploading = true;
        this.sedAPI
        		.uploadFile(this.sedAPI.apiUrl + 'add-file', formData)
        		.subscribe((item) => { 
        					obj.id = item.id;
        					this.files.unshift( obj ); 
        					this.uploading =false;
        					this.sedAPI.listsChanged = true;
        				},
        				(error) => 
        				{ this.uploading =false;
        				  this.dialogsService.inform('Сообщение об ошибке', 'Файл не был сохранен!', false, this.viewContainerRef)}) ;
	}

}
