import { MapFn } from '../index';

class _Lazy<T> {
  private constructor(private fn: () => T) {}
  private _value: T | null = null;
  public get value(): T {
   return this.getValue();
  }

  static of<T>(f: () => T): _Lazy<T> {
    return new _Lazy<T>(f);
  }

  public map<R>(f: MapFn<T, R>): _Lazy<R> {
    return _Lazy.of(() => f(this.fn()));
  }

  private getValue(): T {
    if (!this._value) {
      this._value = this.fn();
    }
    return this._value;
  }
}

export const Lazy = _Lazy.of
