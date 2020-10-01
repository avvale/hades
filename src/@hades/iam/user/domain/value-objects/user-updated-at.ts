import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'UserUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'UserUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}