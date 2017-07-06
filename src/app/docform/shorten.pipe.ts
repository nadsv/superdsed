import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
	transform(value: any) {
		const dotPosition = value.lastIndexOf('.')
		const ext = value.substr(dotPosition);
		const fileName = value.substr(0, dotPosition);
		const shortenName = (fileName.length > 85) ? fileName.substr(0, 80) +'... '+ ext : value ;
		return shortenName;
	}
}