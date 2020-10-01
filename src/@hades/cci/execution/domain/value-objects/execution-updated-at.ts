import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ExecutionUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'ExecutionUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ExecutionUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}