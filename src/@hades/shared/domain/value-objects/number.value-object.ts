import { ValueObject } from './value-object';
import { BadRequestException } from '@nestjs/common';

export abstract class NumberValueObject extends ValueObject<number>
{
    get value(): number
    {
        return super.value;
    }
    
    set value(value: number)
    {
        if (value === <number><unknown>'') value = null;
        if (value?.toString().length > this.validationRules.maxLength) throw new BadRequestException(`Value for ${this.validationRules.name} is too large, has a maximum length of ${this.validationRules.maxLength}`);

        super.value = value;
    }

    toString(): string 
    {
        return this.value.toString();
    }
}