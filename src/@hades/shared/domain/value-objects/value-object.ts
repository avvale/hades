import { BadRequestException } from '@nestjs/common';
import { IValueObject } from './value-object.interface';
import { ValidationRules } from './../lib/validation-rules';

export abstract class ValueObject<T> implements IValueObject<T>
{
    public readonly type: string;
    public validationRules: ValidationRules;
    
    protected _value: T;
    get value(): T
    {   
        return this._value;
    }
    set value(value: T)
    {
        // validate nullable and undefinable values
        if (this.validationRules.nullable === false && value === null)
        {
            throw new BadRequestException(`Value for ${this.validationRules.name} must be defined, can not be null`);
        }

        if (this.validationRules.undefinable === false && value === undefined)
        {
            throw new BadRequestException(`Value for ${this.validationRules.name} must be defined, can not be undefined`);
        }
        
        this._value = value;
    }
    
    constructor(value: T, validationRules: ValidationRules = {}) 
    {
        this.validationRules = validationRules;
        this.value = value;
    }
}