import { Uuid } from '@hades/shared/domain/value-objects/uuid';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class SystemId extends Uuid 
{
    public readonly type: 'SystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'SystemId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}