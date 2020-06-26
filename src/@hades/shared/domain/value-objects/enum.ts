import { StringValueObject } from './string.value-object';
import { BadRequestException } from '@nestjs/common';

export abstract class Enum extends StringValueObject
{
    private _values: string[];

    get value(): string
    {
        return super.value;
    }
    
    set value(value: string)
    {
        if (this.value && this._values.indexOf(this.value) > -1) throw new BadRequestException(`Value for ${this.validationRules.name} has to be any of this values: ${this._values.join(', ')}`);
    
        super.value = value
    }
}