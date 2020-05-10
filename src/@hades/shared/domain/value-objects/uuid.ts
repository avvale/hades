import { v4 as uuidv4 } from 'uuid';
import * as validate from 'uuid-validate';
import { StringValueObject } from './string.value-object';

export abstract class Uuid extends StringValueObject
{
    constructor(
        _value: string
    ) 
    {
        super(_value);
        this.ensureIsValidUuid(_value);
    }

    private ensureIsValidUuid(id: string): void
    { 
        if (!validate(id, 4))
        {
            // TODO, lanzar error de uuid no válido
        }
    }
}