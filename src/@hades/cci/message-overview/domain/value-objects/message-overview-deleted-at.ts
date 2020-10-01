import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageOverviewDeletedAt extends TimestampValueObject 
{
    public readonly type: 'MessageOverviewDeletedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'MessageOverviewDeletedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}