export const id = <T>(v: T) => v;

const is = <T>(fn: (v: T) => (y: T) => boolean) => (v: T) => (y: T): boolean =>
	fn(v)(y)
;
const eq = <T>(v1: T) => (v2: T) => v1 == v2;
const isEqual = is(eq);

// isNot(2)(2); //?

// const
// type UncurryTwo<T,S,R> = ((...args: [T|S]) => R)
// const uncurryTwo = <T extends (t: any) => void> (f: T)  => {
//   return function(arg1: Parameters<typeof f>, arg2: Parameters<typeof RetuTyp>) {
//     return f(arg1)
//   }
// }
interface Observer<T> {
	next: (value: T) => void;
	error: (e: Error) => void;
	complete: (value: T) => void;
}

export class Subject<T> {
	#value: T = null!;
	#observers = [];
	private constructor() {}

	static create<T>(): Subject<T> {
		return new Subject();
	}

	next(value: T) {
		this.#value = value;
		this.#observers.forEach((cb: (v: T) => void) => cb(this.#value));
	}

	subscribe(fn: (value: T) => void) {
		if (this.#value) fn(this.#value);
		return () => {
			this.#observers = [];
		};
	}
}

const s = Subject.create<number>();
let l; // ?
s.subscribe((x) => l = x);
s.next(1); //?
s.next(2); //?
s.next(3); //?
s.next(4); //?
s.next(5); //?

s.subscribe(console.log);

export class Observable<T> {
	constructor(observer: (observer: Observer<T>) => void) {}

  next() {
	  // this.observers.forEach()
  }
	private observers: Observer<T>[] = [];
	subscribe(cb: (t: T) => void): () => void {
		this.observers.push(cb);
		return () => {
			this.observers = [];
		};
	}
}
const obs = new Observable((observer) => {
	observer.next(2);
	setTimeout(() => observer.next(1), 29);
});

new Observable(() => obs).subscribe(console.log) //?
