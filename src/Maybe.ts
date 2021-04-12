import {MapFn} from "./index";

type BindFn<M, T, R extends M> = (value: T) => R;
type MaybeBindFn<T, R extends Maybe<any>> = BindFn<Maybe<any>, T, R>;

/**
 * @abstract
 * @name Maybe
 * @description
 * Maybe is the base type for its two subtypes, in practice those are what you'll
 * work
 */
abstract class Maybe<T> {
	abstract map<R>(f: MapFn<T, R>): Maybe<R>

	abstract bind<R extends Maybe<V>, V>(fn: MaybeBindFn<T, R>): R
}

export class Just<T> extends Maybe<T> {
	private constructor(private value: T) {
		super();
	}

	static of<T>(value: T) {
		return new Just(value);
	}

	map<R>(f: MapFn<T, R>): Maybe<R> {
		return Just.of(f(this.value));
	}

	bind<R extends Maybe<V>, V>(fn: MaybeBindFn<T, R>): R {
		return fn(this.value);
	}
}

export class Nothing<T> extends Maybe<T> {
	// rome-ignore lint/js/noUnusedVariables
	bind<R extends Maybe<V>, V>(fn: MaybeBindFn<T, R>): R {
		return (Nothing.create() as R);
	}

	private constructor() {
		super();
	}

	static create<T1>() {
		return new Nothing<T1>();
	}

	// rome-ignore lint/js/noUnusedVariables
	map<R>(f: MapFn<T, R>): Maybe<R> {
		return Nothing.create<R>();
	}
}

const m = Just.of(3);
const result = m.bind((value) => Just.of(5)).map((value) => value + 1);
