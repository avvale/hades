import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class LangDeletedAt extends Timestamp 
{
    public readonly type: 'LangDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'LangDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}