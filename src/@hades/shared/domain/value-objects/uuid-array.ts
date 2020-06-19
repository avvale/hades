import { ValueObject } from './value-object';

export abstract class UuidArray implements ValueObject<string[]>
{
    public readonly type: string;

    constructor(
       private _value: string[]
    ) 
    {}

    get value(): string[]
    {
        return this._value;
    }
    set value(value: string[])
    {
        this._value = value;
    }

    get length(): number
    {
        return this._value.length;
    }

    get isArray(): boolean
    {
        return Array.isArray(this._value);
    }
        
    toString(): string 
    {
        return this.value.toString();
    }
}