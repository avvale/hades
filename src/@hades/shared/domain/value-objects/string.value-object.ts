import { ValueObject } from './value-object';
import { BadRequestException } from '@nestjs/common';

export abstract class StringValueObject implements ValueObject<string>
{
    public readonly type: string;
    public readonly nullable: boolean;
    public readonly length: number;
    public readonly minLength: number;
    public readonly maxLength: number;

    constructor(
        private _value: string
    ) {}

    get value(): string
    {
        if (this._value === "") return null;
        return this._value;
    }
    set value(value: string)
    {
        if (this.nullable && !!value)                           throw new BadRequestException(`Value for ${this.type} is too short, has a minimum length of ${this.maxLength}`);
        if (!!this.minLength && value.length < this.minLength)  throw new BadRequestException(`Value for ${this.type} is too short, has a minimum length of ${this.maxLength}`);
        if (!!this.maxLength && value.length > this.maxLength)  throw new BadRequestException(`Value for ${this.type} is too large, has a maximum length of ${this.maxLength}`);
        if (!!this.length && value.length > this.length)        throw new BadRequestException(`Value for ${this.type} is not allowed, must be a length of ${this.length}`);

        this._value = value;
    }
        
    toString(): string 
    {
        return this.value;
    }
}