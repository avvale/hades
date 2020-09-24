import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountClientId extends UuidValueObject
{
    public readonly type: 'AccountClientId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccountClientId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}