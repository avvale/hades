import { StringValueObject } from './string.value-object';
import { ValidationRules } from './../lib/validation-rules';
import * as moment from 'moment';

export abstract class Timestamp extends StringValueObject
{
    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, validationRules);
       
        this.ensureIsValidTimestamp(value);
    }

    private ensureIsValidTimestamp(timeStamp: string): void
    {
        if (!timeStamp)
        {

        }
    }
}