import { StringValueObject } from './string.value-object';
import * as moment from 'moment';
export abstract class TimeStamp extends StringValueObject
{
    constructor(
        _value?: string
    ) 
    {
        if (!_value)
        {
            super(moment().format('YYYY-MM-DD h:mm:ss'));
        }
        else
        {
            super(_value);
        }
        this.ensureIsValidTimeStamp(_value);
    }

    private ensureIsValidTimeStamp(timeStamp: string): void
    {
        if (!timeStamp)
        {

        }
    }
}