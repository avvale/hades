import { StringValueObject } from './string.value-object';
import { ValidationRules } from './../lib/validation-rules';
import * as moment from 'moment';

export abstract class TimeStamp extends StringValueObject
{
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, validationRules);
       
        this.ensureIsValidTimeStamp(value);
    }

    private ensureIsValidTimeStamp(timeStamp: string): void
    {
        if (!timeStamp)
        {

        }
    }
}