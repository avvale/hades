import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RefreshTokenId extends UuidValueObject
{
    public readonly type: 'RefreshTokenId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RefreshTokenId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}