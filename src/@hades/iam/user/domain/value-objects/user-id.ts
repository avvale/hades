import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserId extends UuidValueObject
{
    public readonly type: 'UserId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'UserId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}