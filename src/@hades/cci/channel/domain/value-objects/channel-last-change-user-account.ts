import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelLastChangeUserAccount extends StringValueObject
{
    public readonly type: 'ChannelLastChangeUserAccount';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ChannelLastChangeUserAccount',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 20,
        }, validationRules));
    }
}