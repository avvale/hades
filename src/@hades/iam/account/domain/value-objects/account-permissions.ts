import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AccountPermissions extends JsonValueObject 
{
    public readonly type: 'AccountPermissions';

    constructor(value: any, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'AccountPermissions',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}