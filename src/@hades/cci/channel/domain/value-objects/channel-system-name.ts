import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelSystemName extends StringValueObject
{
    public readonly type: 'ChannelSystemName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ChannelSystemName',
            nullable: false,
            undefinable: false,
            maxLength: 20,
        }, validationRules));
    }
}