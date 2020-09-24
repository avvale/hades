import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountId extends UuidValueObject
{
    public readonly type: 'AccountId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccountId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}