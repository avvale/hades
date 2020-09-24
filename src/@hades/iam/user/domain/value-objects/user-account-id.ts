import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserAccountId extends UuidValueObject
{
    public readonly type: 'UserAccountId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'UserAccountId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}