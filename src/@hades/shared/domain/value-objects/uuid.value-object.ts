import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as validate from 'uuid-validate';
import { StringValueObject } from './string.value-object';
import { ValidationRules } from './../lib/validation-rules';

export abstract class UuidValueObject extends StringValueObject
{
    constructor(value: string, validationRules: ValidationRules) 
    {
        super(value, Object.assign(validationRules, { length: 36 }));
        this.checkIfIsNull();
        this.ensureIsValidUuid();
    }

    private ensureIsValidUuid(): void
    {     
        if (!validate(this.value, 4)) throw new BadRequestException(`Value for ${this.validationRules.name} has value: ${this.value}, not allowed for uuid`);  
    }

    private checkIfIsNull(): void
    {
        if (!this.value) this.value = uuidv4();
    }
}