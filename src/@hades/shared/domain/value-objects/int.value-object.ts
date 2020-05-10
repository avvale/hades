import { ValueObject } from './value-object';

export abstract class IntValueObject implements ValueObject<number>
{
    public readonly type: string;

    constructor(
        private _value: number
    ) {}

    get value(): number
    {
        if (<unknown>this._value === "") return null;
        return this._value;
    }
    set value(value: number)
    {
        this._value = value;
    }

    toString(): string 
    {
        return <string><unknown>this.value;
    }
}