import { ValueObject } from './value-object';

export abstract class StringValueObject implements ValueObject<string>
{
    public readonly type: string;

    constructor(
        private _value: string
    ) {}

    get value(): string
    {
        if (this._value === "") return null;
        return this._value;
    }
    set value(value: string)
    {
        this._value = value;
    }
        
    toString(): string 
    {
        return this.value;
    }
}