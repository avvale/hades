import { Uuid } from '@hades/shared/domain/value-objects/uuid';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class ModuleId extends Uuid 
{
    public readonly type: 'ModuleId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ModuleId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}