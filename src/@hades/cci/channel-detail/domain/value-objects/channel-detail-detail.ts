import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelDetailDetail extends StringValueObject
{
    public readonly type: 'ChannelDetailDetail';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ChannelDetailDetail',
            nullable: true,
            undefinable: true,
        }, validationRules));
    }
}