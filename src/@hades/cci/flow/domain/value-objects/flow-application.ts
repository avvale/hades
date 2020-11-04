import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowApplication extends StringValueObject
{
    public readonly type: 'FlowApplication';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'FlowApplication',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 60,
        }, validationRules));
    }
}