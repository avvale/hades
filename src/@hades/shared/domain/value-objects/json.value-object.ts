import { ValueObject } from './value-object';

export abstract class JsonValueObject extends ValueObject<string>
{
    get value(): any
    {  
        return super.value;
    }

    set value(value: any)
    {
        super.value = typeof value === 'string' ? JSON.parse(value) : value;
    }
    
    toString(): string 
    {
        return JSON.stringify(this.value);
    }
}