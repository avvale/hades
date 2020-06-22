import { StringValueObject } from './string.value-object';
import { ValidationRules } from './../lib/validation-rules';
import * as moment from 'moment';
export abstract class TimeStamp extends StringValueObject
{
    constructor(_value?: string, validationRules?: ValidationRules) 
    {
        super(_value, validationRules);
       
        this.ensureIsValidTimeStamp(_value);
    }

    private ensureIsValidTimeStamp(timeStamp: string): void
    {
        if (!timeStamp)
        {

        }
    }
}