import { NumberValueObject } from './number.value-object';
import { BadRequestException } from '@nestjs/common';

export abstract class DecimalValueObject extends NumberValueObject
{
    get value(): number
    {
        return super.value;
    }

    set value(value: number)
    {
        //if (value !== undefined && value !== null && Number.isNaN(value)) throw new BadRequestException(`Value for ${this.validationRules.name} has to be a number value`);

        super.value = value;
    }

    toString(): string
    {
        return this.value.toString();
    }
}