import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class RefreshTokenAccessTokenId extends UuidValueObject
{
    public readonly type: 'RefreshTokenAccessTokenId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RefreshTokenAccessTokenId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}