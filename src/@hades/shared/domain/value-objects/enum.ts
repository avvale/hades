import { StringValueObject } from './string.value-object';
import { BadRequestException } from '@nestjs/common';

export abstract class Enum extends StringValueObject
{
    public options: string[];

    get value(): string
    {
        return super.value;
    }
    
    set value(value: string)
    {
        if (this.value && this.options.indexOf(this.value) > -1) throw new BadRequestException(`Value for ${this.validationRules.name} has to be any of this options: ${this.options.join(', ')}`);
    
        super.value = value
    }
}