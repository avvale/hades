import { BadRequestException } from '@nestjs/common';
import { ValueObject } from './value-object';
import { ValidationRules } from './../lib/validation-rules';

export abstract class StringValueObject implements ValueObject<string>
{
    public readonly type: string;
    private _value: string;
    public validationRules: ValidationRules;
    
    constructor(value: string, validationRules?: ValidationRules) 
    {
        this.validationRules = validationRules;
        this.value = value;
    }

    get value(): string
    {
        if (this._value === "") return null;
        return this._value;
    }
    
    set value(value: string)
    {
        if (this.validationRules.nullable === false && !value)                                      throw new BadRequestException(`Value for ${this.validationRules.name} must be defined, can not be null or undefined`);
        if (!!this.validationRules?.minLength && value?.length < this.validationRules.minLength)    throw new BadRequestException(`Value for ${this.validationRules.name} is too short, has a minimum length of ${this.validationRules.minLength}`);
        if (!!this.validationRules?.maxLength && value?.length > this.validationRules.maxLength)    throw new BadRequestException(`Value for ${this.validationRules.name} is too large, has a maximum length of ${this.validationRules.maxLength}`);
        if (!!this.validationRules?.length && value?.length > this.validationRules.length)          throw new BadRequestException(`Value for ${this.validationRules.name} is not allowed, must be a length of ${this.validationRules.length}`);

        this._value = value;
    }
        
    toString(): string 
    {
        return this.value;
    }
}