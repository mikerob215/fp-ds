import {Nothing} from "./Maybe";

export type Thunk<T> = () => T;
export type MapFn<T, R> = (value: T) => R;

// rome-ignore lint/js/noUnusedVariables
const n = Nothing.create<number>().map((value) => `${value}`);

const invoke = (method) => (...args) => <T>(obj: T) => obj[method](...args)
