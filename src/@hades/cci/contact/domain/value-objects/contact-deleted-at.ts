import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ContactDeletedAt extends TimestampValueObject 
{
    public readonly type: 'ContactDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}