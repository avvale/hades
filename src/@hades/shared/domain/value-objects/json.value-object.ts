import { ValueObject } from './value-object';

export abstract class JsonValueObject implements ValueObject<string>
{
    public readonly type: string;

    constructor(
        private _value: any
    ) {}

    get value(): any
    {
        return this._value;
    }
    set value(value: string | any)
    {
        this._value = typeof value === 'string' ? JSON.parse(value) : value;
    }
        
    toString(): string 
    {
        return JSON.stringify(this.value);
    }
}