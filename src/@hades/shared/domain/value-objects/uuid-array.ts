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
        
    toString(): string 
    {
        return this.value.toString();
    }
}