import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelOverviewTenantCode extends StringValueObject
{
    public readonly type: 'ChannelOverviewTenantCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ChannelOverviewTenantCode',
            nullable: false,
            undefinable: false,
            maxLength: 50,
        }, validationRules));
    }
}