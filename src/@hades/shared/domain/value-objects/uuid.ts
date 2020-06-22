import { v4 as uuidv4 } from 'uuid';
import * as validate from 'uuid-validate';
import { StringValueObject } from './string.value-object';
import { ValidationRules } from './../lib/validation-rules';

export abstract class Uuid extends StringValueObject
{
    constructor(
        _value: string,
        validationRules: ValidationRules
    ) 
    {
        super(_value, Object.assign(validationRules, { length: 36 }));
        this.checkIfIsNull();
        this.ensureIsValidUuid();
    }

    private ensureIsValidUuid(): void
    { 
        if (!validate(this.value, 4))
        {
            // TODO, lanzar error de uuid no válido
        }
    }

    private checkIfIsNull(): void
    {
        if (!this.value) this.value = uuidv4();
    }
}