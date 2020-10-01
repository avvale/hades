import { UuidValueObject } from '@hades/shared/domain/value-objects/uuid.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelDetailSystemId extends UuidValueObject
{
    public readonly type: 'ChannelDetailSystemId';

    constructor(value: string, validationRules: ValidationRules = {}) 
    {
        super(value, Object.assign({ 
            name: 'ChannelDetailSystemId',
            nullable: false,
            undefinable: false,
            length: 36
        }, validationRules));
    }
}