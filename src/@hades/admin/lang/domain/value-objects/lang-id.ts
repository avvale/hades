import { Uuid } from '@hades/shared/domain/value-objects/uuid';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class LangId extends Uuid 
{
    public readonly type: 'LangId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'LangId',
            nullable: false,
            undefinable: false,
        }, validationRules));
    }
}