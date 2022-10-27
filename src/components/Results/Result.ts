export class Result {
	rolls: Array<number>;
	die: number;
	modifier: number;
	result: number;

	constructor() {
		this.rolls = [];
		this.die = 0;
		this.modifier = 0;
		this.result = 0;
	}
}
