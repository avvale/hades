import { ValueObject } from './value-object';

export abstract class BooleanValueObject extends ValueObject<boolean>
{
    toString(): string 
    {
        return this.value.toString();
    }
}