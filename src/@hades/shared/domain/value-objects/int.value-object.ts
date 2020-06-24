import { ValueObject } from './value-object';
import { BadRequestException } from '@nestjs/common';

export abstract class IntValueObject extends ValueObject<number>
{
    get value(): number
    {
        if (<unknown>this._value === "") return null;
        return super.value;
    }
    
    set value(value: number)
    {
        if (value === <number><unknown>'') value = null;
        if (value !== undefined && value !== null && !Number.isInteger(value)) throw new BadRequestException(`Value for ${this.validationRules.name}, has to be a integer value`);

        super.value = value;
    }

    toString(): string 
    {
        return this.value.toString();
    }
}