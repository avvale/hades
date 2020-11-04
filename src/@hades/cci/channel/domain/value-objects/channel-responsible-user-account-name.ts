import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ChannelResponsibleUserAccountName extends StringValueObject
{
    public readonly type: 'ChannelResponsibleUserAccountName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ChannelResponsibleUserAccountName',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 20,
        }, validationRules));
    }
}