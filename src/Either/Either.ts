export class Either<L, R> {
	constructor(left: L, right: R) {}
}

export class Left<L> {
	private constructor(lValue: L) {}
	map() {}
}
