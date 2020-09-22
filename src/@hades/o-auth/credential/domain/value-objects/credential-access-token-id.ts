import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class CredentialAccessTokenId extends UuidValueObject
{
    public readonly type: 'CredentialAccessTokenId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'CredentialAccessTokenId',
            nullable: true,
            undefinable: true,
            length: 36
        }, validationRules));
    }
}