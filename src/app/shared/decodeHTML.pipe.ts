import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'decodeHTML'
})
export class DecodeHTMLPipe implements PipeTransform {
	transform(str: any) {
		const map =
    {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'"
    };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) {return map[m];});
	}
}