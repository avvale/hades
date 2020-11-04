import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelUsername extends StringValueObject
{
    public readonly type: 'ChannelUsername';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ChannelUsername',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 60,
        }, validationRules));
    }
}