import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ContactId extends UuidValueObject
{
    public readonly type: 'ContactId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}