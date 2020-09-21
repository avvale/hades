import { JsonValueObject } from '@hades/shared/domain/value-objects/json.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ClientApplicationCodes extends JsonValueObject 
{
    public readonly type: 'ClientApplicationCodes';

    constructor(value: any, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ClientApplicationCodes',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}