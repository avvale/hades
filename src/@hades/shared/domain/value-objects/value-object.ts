import { BadRequestException } from '@nestjs/common';
import { IValueObject } from './value-object.interface';
import { ObjectLiteral, ValidationRules } from '@hades/shared/domain/lib/hades.types';

export abstract class ValueObject<T> implements IValueObject<T>
{
    public readonly type: string;
    public validationRules: ValidationRules;
    public data: ObjectLiteral;
    
    protected _value: T;
    get value(): T
    {   
        return this._value;
    }
    set value(value: T)
    {
        // validate nullable and undefinable values
        if (this.validationRules.nullable === false && value === null)          throw new BadRequestException(`Value for ${this.validationRules.name} must be defined, can not be null`);
        if (this.validationRules.undefinable === false && value === undefined)  throw new BadRequestException(`Value for ${this.validationRules.name} must be defined, can not be undefined`);
        this._value = value;
    }
    
    constructor(value: T, validationRules: ValidationRules = {}, data = {}) 
    {
        // first get validationRules value to be used in value accessors methods
        this.validationRules = validationRules;

        // second call to accessor value method
        this.value = value;

        // additional data for customize behavior value object
        this.data = data;
    }
}