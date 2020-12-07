import { DecimalValueObject } from './decimal.value-object';
import { BadRequestException } from '@nestjs/common';

export abstract class CoordinateValueObject extends DecimalValueObject
{
    get value(): number
    {
        return super.value;
    }

    set value(value: number)
    {
        if (!/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(value.toString())) throw new BadRequestException(`Value for ${this.validationRules.name} has to be a coordinate value`);
        super.value = value;
    }

    toString(): string
    {
        return this.value.toString();
    }
}