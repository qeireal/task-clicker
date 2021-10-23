export class CurrentWorkersState {
	workerId: number;
	workerEndTime: Date;

	private lifetime = 2700000;

	constructor(
		workerId: number,
		workerEndTime: Date,
	) {
		this.workerId = workerId;
		this.workerEndTime = workerEndTime;
	}

	static fromJson(json: CurrentWorkersState) {
		return new CurrentWorkersState(
			json['workerId'],
			new Date(json['workerEndTime']),
		);
	}


	get progressValue(): number {
		const startDate = this.workerEndTime.getTime() - this.lifetime;
		const endDate = this.workerEndTime.getTime();
		const currentDate = (new Date()).getTime();

		console.log(new Date());
		console.log(this.workerEndTime);

		return 100 - (Math.floor((currentDate - startDate) / (endDate - startDate)) * 100);
	}
}
