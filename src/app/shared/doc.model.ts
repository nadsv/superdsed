export class Doc {
	constructor(public id: number,
				public num: string,
				public date: string,
				public name: string,
				public base: string,
				public cancellation_date: string,
				public main_num: string,
				public main_date: string,
				public section: string,
				public links: any[],
				public changes: any[],
				public executors: any[],
				public texts?: any[],
				public applications?: any[]
	) {	}

	getMainDoc(num, date) {
		return (num) ? `№${num} от ${date}г.` : '';
	}
}