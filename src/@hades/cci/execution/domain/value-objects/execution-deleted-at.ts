import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ExecutionDeletedAt extends TimestampValueObject 
{
    public readonly type: 'ExecutionDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ExecutionDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}