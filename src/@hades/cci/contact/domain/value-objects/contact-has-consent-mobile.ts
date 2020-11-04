import { BooleanValueObject } from '@hades/shared/domain/value-objects/boolean.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ContactHasConsentMobile extends BooleanValueObject
{
    public readonly type: 'ContactHasConsentMobile';

    constructor(value: boolean, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ContactHasConsentMobile',
            nullable:  false ,
            undefinable:  false ,
        }, validationRules));
    }
}