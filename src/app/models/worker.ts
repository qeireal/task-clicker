export class Worker {
	id: number;
	name: string;
	performance: number;
	price: number;

	imageUrl: string;

	constructor(
		id: number,
		name: string,
		performance: number,
		price: number,
	) {
		this.id = id;
		this.name = name;
		this.performance = performance;
		this.price = price;

		this.imageUrl = `${window.location.href}assets/${this.imgMap[this.id]}.gif`;
	}

	static fromJson(json: Worker) {
		return new Worker(
			json['id'],
			json['name'],
			json['performance'],
			json['price'],
		);
	}

	imgMap: {[key: number]: string} = {
		1: 'intern',
		2: 'junior',
		3: 'middle',
		4: 'senior',
		5: 'team-lead',
		6: 'outsource',
		7: 'office',
	}
}
