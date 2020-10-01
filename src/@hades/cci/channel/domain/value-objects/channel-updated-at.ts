import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelUpdatedAt extends TimestampValueObject 
{
    public readonly type: 'ChannelUpdatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelUpdatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}