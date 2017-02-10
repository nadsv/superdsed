import { Appendix } from './appendix';
import { Change } from './change';
import { Person } from './person';
import { Link } from './link';

export class Doc {
	id: number;
	num: number;
	date: string;
	name: string;
	base: string;
	status: boolean;
	id_section: number;
	changes: Change[];
	links: Link[];
	persons: Person[];
	appendixes: Appendix[];
}