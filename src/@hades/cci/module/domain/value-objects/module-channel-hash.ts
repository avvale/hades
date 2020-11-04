import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ModuleChannelHash extends StringValueObject
{
    public readonly type: 'ModuleChannelHash';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ModuleChannelHash',
            nullable:  false ,
            undefinable:  false ,
            length: 40,

        }, validationRules));
    }
}