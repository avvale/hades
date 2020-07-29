import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ContactSystemId extends UuidValueObject
{
    public readonly type: 'ContactSystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactSystemId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}