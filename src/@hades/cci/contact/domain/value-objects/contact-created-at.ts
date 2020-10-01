import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ContactCreatedAt extends TimestampValueObject 
{
    public readonly type: 'ContactCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ContactCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}