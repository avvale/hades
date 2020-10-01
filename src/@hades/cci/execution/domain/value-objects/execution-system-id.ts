import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ExecutionSystemId extends UuidValueObject
{
    public readonly type: 'ExecutionSystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ExecutionSystemId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}