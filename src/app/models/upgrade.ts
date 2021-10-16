export class Upgrade {
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

		this.imageUrl = `${window.location.href}assets/upgrades/${this.id - 1}.png`;
	}

	static fromJson(json: Upgrade) {
		return new Upgrade(
			json['id'],
			json['name'],
			json['performance'],
			json['price'],
		);
	}

	toString() {
		return `${this.name} (${this.performance} per click)`
	}
}
