import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class AccessTokenId extends UuidValueObject
{
    public readonly type: 'AccessTokenId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccessTokenId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}