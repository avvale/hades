import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelDetailChannelParty extends StringValueObject
{
    public readonly type: 'ChannelDetailChannelParty';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ChannelDetailChannelParty',
            nullable: true,
            undefinable: true,
            maxLength: 160,
        }, validationRules));
    }
}