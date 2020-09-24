import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserLangId extends UuidValueObject
{
    public readonly type: 'UserLangId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'UserLangId',
            nullable: true,
            undefinable: true,
            length: 36
        }, validationRules));
    }
}