import { Timestamp } from '@hades/shared/domain/value-objects/timestamp';
import { ValidationRules } from '@hades/shared/domain/lib/validation-rules';

export class LangCreatedAt extends Timestamp 
{
    public readonly type: 'LangCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'LangCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}