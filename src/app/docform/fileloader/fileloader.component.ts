import { Component, OnInit, Input } from '@angular/core';
import { File } from '../../shared/file';

@Component({
	selector: 'app-fileloader',
	templateUrl: './fileloader.component.html',
	styleUrls: ['./fileloader.component.scss']
})
export class FileloaderComponent implements OnInit {
	files: File[] = [];
	@Input() idDoc: number;
	@Input() type: string;

	constructor() { }

	ngOnInit() {
	}

	onLoadBtnClick( event ) {
		const items = event.srcElement.files;
		const baseLink = event.srcElement.value.split('\\').slice(0, -1).join('\\');
		for ( const item of items ) {
			const link = baseLink + '\\' + item.name;
			const name = link.split('\\').pop();
	    	let file = new File();
	    	file = { link: link , id_doc: this.idDoc, type: this.type, name: name };
			this.files.push( file );
		}
	}

	onDeleteFile( i ){
		this.files.splice( i, 1 );
	}

}
