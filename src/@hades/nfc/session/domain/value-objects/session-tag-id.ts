import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SessionTagId extends UuidValueObject
{
    public readonly type: 'SessionTagId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SessionTagId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}