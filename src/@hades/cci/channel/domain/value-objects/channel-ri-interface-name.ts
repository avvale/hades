import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelRiInterfaceName extends StringValueObject
{
    public readonly type: 'ChannelRiInterfaceName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ChannelRiInterfaceName',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 160,
        }, validationRules));
    }
}