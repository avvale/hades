import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class MessageOverviewTenantCode extends StringValueObject
{
    public readonly type: 'MessageOverviewTenantCode';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'MessageOverviewTenantCode',
            nullable: false,
            undefinable: false,
            maxLength: 50,
        }, validationRules));
    }
}