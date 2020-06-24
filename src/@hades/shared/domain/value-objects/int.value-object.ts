import { NumberValueObject } from './number.value-object';
import { BadRequestException } from '@nestjs/common';

export abstract class IntValueObject extends NumberValueObject
{
    get value(): number
    {
        return super.value;
    }
    
    set value(value: number)
    {
        if (value !== undefined && value !== null && !Number.isInteger(value)) throw new BadRequestException(`Value for ${this.validationRules.name} has to be a integer value`);

        super.value = value;
    }

    toString(): string 
    {
        return this.value.toString();
    }
}