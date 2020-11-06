import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelDetailChannelSapId extends StringValueObject
{
    public readonly type: 'ChannelDetailChannelSapId';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ChannelDetailChannelSapId',
            nullable: false,
            undefinable: false,
            maxLength: 50,
        }, validationRules));
    }
}