import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobDetailDeletedAt extends TimestampValueObject 
{
    public readonly type: 'JobDetailDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDetailDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}