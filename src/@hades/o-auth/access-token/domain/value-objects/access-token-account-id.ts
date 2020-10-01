import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccessTokenAccountId extends UuidValueObject
{
    public readonly type: 'AccessTokenAccountId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccessTokenAccountId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}