export function formatDatefromMySQL (date: string) {
	if (date) {
		return date.substr(8,2) + '-' + date.substr(5,2) + '-' + date.substr(0,4);
	} else {
		return '00-00-0000';
	}
}