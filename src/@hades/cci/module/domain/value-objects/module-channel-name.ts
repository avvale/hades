import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ModuleChannelName extends StringValueObject
{
    public readonly type: 'ModuleChannelName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ModuleChannelName',
            nullable: false,
            undefinable: false,
            maxLength: 160,
        }, validationRules));
    }
}