import { Component, OnInit } from '@angular/core';
import { File } from '../shared/file';

@Component({
	selector: 'app-fileloader',
	templateUrl: './fileloader.component.html',
	styleUrls: ['./fileloader.component.scss']
})
export class FileloaderComponent implements OnInit {
	files: File[] = [];

	constructor() { }

	ngOnInit() {
	}

	onLoadBtnClick( event ) {
		const $items = event.srcElement.files;
		const $baseLink = event.srcElement.value.split('\\').slice(0, -1).join('\\');
		for (const $item of $items) {
			const $link = $baseLink + '\\' + $item.name;
			const $name = $link.split('\\').pop();
	    	let $file = new File();
	    	$file = { link: $link , name: $name };
	    	this.saveFile( $link );
			this.files.push( $file );
		}
	}

	saveFile( $file: string ) {
		console.log($file);
	}

	onDeleteFile( i ){
		this.files.splice( i, 1 );
	}

}
