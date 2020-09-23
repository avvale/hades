import { UuidArrayValueObject } from '@hades/shared/domain/value-objects/uuid-array.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class RoleAccountIds extends UuidArrayValueObject 
{
    public readonly type: 'RoleAccountIds';

    constructor(value: string[], validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'RoleAccountIds',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}