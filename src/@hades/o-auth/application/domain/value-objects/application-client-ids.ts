import { UuidArrayValueObject } from '@hades/shared/domain/value-objects/uuid-array.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ApplicationClientIds extends UuidArrayValueObject 
{
    public readonly type: 'ApplicationClientIds';

    constructor(value: string[], validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ApplicationClientIds',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}