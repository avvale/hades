import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ContactIsActive extends BooleanValueObject 
{
    public readonly type: 'ContactIsActive';

    constructor(value: boolean, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactIsActive',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}