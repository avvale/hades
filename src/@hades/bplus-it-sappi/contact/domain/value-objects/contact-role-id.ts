import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ContactRoleId extends UuidValueObject
{
    public readonly type: 'ContactRoleId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactRoleId',
            nullable: true,
            undefinable: true,
            length: 36
        }, validationRules));
    }
}