import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ContactHasConsentEmail extends BooleanValueObject 
{
    public readonly type: 'ContactHasConsentEmail';

    constructor(value: boolean, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactHasConsentEmail',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}