import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelFlowComponent extends StringValueObject
{
    public readonly type: 'ChannelFlowComponent';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ChannelFlowComponent',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 160,
        }, validationRules));
    }
}