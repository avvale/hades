import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'AccountUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccountUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}