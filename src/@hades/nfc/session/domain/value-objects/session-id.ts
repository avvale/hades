import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SessionId extends UuidValueObject
{
    public readonly type: 'SessionId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SessionId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}