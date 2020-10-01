import { TimestampValueObject } from '@hades/shared/domain/value-objects/timestamp.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelCreatedAt extends TimestampValueObject 
{
    public readonly type: 'ChannelCreatedAt';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelCreatedAt',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}