import { StringValueObject } from './string.value-object';
import { ValidationRules } from './../lib/validation-rules';
import { BadRequestException } from '@nestjs/common';

export abstract class TimestampValueObject extends StringValueObject
{
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, validationRules);
       
        this.ensureIsValidTimestamp(value);
    }

    private ensureIsValidTimestamp(timeStamp: string): void
    {
        if (timeStamp !== null && !((new Date(timeStamp)).getTime() > 0)) throw new BadRequestException(`Value for ${this.validationRules.name} has to be a timestamp value`);
    }
}