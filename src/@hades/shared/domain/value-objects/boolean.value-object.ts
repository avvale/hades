import { ValueObject } from './value-object';
import { BadRequestException } from '@nestjs/common';

export abstract class BooleanValueObject extends ValueObject<boolean>
{
    get value(): boolean
    {   
        return super.value;
    }
    set value(value: boolean)
    {
        if (value === <boolean><unknown>'') value = null;
        if (value !== undefined && value !== null && typeof value !== 'boolean') throw new BadRequestException(`Value for ${this.validationRules.name} has to be a boolean value`);;
        
        super.value = value;
    }

    toString(): string 
    {
        return this.value.toString();
    }
}