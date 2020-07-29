import { BadRequestException } from '@nestjs/common';
import { StringValueObject } from './string.value-object';
import * as validate from 'uuid-validate';

export abstract class UuidValueObject extends StringValueObject
{
    get value(): string
    {
        return super.value;
    }
    
    set value(value: string)
    {
        // if (!validate(this.value, 4)) throw new BadRequestException(`Value for ${this.validationRules.name} has value: ${this.value}, not allowed for uuid`);  

        super.value = value;
    }
}