import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class UserData extends JsonValueObject 
{
    public readonly type: 'UserData';

    constructor(value: any, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'UserData',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}