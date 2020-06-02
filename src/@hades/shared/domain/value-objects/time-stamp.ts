import { StringValueObject } from './string.value-object';
import * as moment from 'moment';
export abstract class TimeStamp extends StringValueObject
{
    constructor(
        _value?: string
    ) 
    {
        super(_value);
       
        this.ensureIsValidTimeStamp(_value);
    }

    private ensureIsValidTimeStamp(timeStamp: string): void
    {
        if (!timeStamp)
        {

        }
    }
}