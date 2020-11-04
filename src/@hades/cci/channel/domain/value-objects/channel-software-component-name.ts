import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelSoftwareComponentName extends StringValueObject
{
    public readonly type: 'ChannelSoftwareComponentName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ChannelSoftwareComponentName',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 160,
        }, validationRules));
    }
}