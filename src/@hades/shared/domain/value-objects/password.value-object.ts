import { StringValueObject } from './string.value-object';
import { Utils } from '../lib/utils';

export abstract class PasswordValueObject extends StringValueObject
{
    get value(): string
    {
        return super.value;
    }
    
    set value(value: string)
    {
        if (value && this.data.haveToEncrypt)
        {
            super.value = Utils.hash(value);
        } 
        else
        {
            super.value = value;
        }
    }
}