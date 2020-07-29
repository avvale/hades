import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class RoleId extends UuidValueObject
{
    public readonly type: 'RoleId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RoleId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}