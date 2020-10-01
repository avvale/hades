import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class JobDetailId extends UuidValueObject
{
    public readonly type: 'JobDetailId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'JobDetailId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}