import { ValueObject } from './value-object';

export abstract class IntValueObject extends ValueObject<number>
{
    get value(): number
    {
        if (<unknown>this._value === "") return null;
        return super.value;
    }

    set value(value: number)
    {  
        super.value = value;
    }

    toString(): string 
    {
        return this.value.toString();
    }
}