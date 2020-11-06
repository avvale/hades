import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelOverviewSystemName extends StringValueObject
{
    public readonly type: 'ChannelOverviewSystemName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ChannelOverviewSystemName',
            nullable: false,
            undefinable: false,
            maxLength: 20,
        }, validationRules));
    }
}