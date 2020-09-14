import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class AccessTokenClientId extends UuidValueObject
{
    public readonly type: 'AccessTokenClientId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccessTokenClientId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}