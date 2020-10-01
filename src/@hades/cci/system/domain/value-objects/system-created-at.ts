import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class SystemCreatedAt extends TimestampValueObject 
{
    public readonly type: 'SystemCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SystemCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}