import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelLastChangedAt extends TimestampValueObject 
{
    public readonly type: 'ChannelLastChangedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelLastChangedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}