import { ValueObject } from './value-object';
import { BadRequestException } from '@nestjs/common';
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
<<<<<<< HEAD
        if (this.nullable && !!value)                           throw new BadRequestException(`Value for ${this.type} is too short, has a minimum length of ${this.maxLength}`);
        if (!!this.minLength && value.length < this.minLength)  throw new BadRequestException(`Value for ${this.type} is too short, has a minimum length of ${this.maxLength}`);
        if (!!this.maxLength && value.length > this.maxLength)  throw new BadRequestException(`Value for ${this.type} is too large, has a maximum length of ${this.maxLength}`);
        if (!!this.length && value.length > this.length)        throw new BadRequestException(`Value for ${this.type} is not allowed, must be a length of ${this.length}`);
=======
        if (!!this.validationRules?.minLength && value.length < this.validationRules.minLength)  throw new BadRequestException(`Value for ${this.validationRules.name} is too short, has a minimum length of ${this.validationRules.minLength}`);
        if (!!this.validationRules?.maxLength && value.length > this.validationRules.maxLength)  throw new BadRequestException(`Value for ${this.validationRules.name} is too large, has a maximum length of ${this.validationRules.maxLength}`);
        if (!!this.validationRules?.length && value.length > this.validationRules.length)        throw new BadRequestException(`Value for ${this.validationRules.name} is not allowed, must be a length of ${this.validationRules.length}`);
>>>>>>> package/admin

        this._value = value;
    }
        
    toString(): string 
    {
        return this.value;
    }
}