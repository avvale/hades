import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class LangCreatedAt extends TimestampValueObject 
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