import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowResponsibleUserAccount extends StringValueObject
{
    public readonly type: 'FlowResponsibleUserAccount';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'FlowResponsibleUserAccount',
            nullable:  true ,
            undefinable:  true ,
            maxLength: 20,
        }, validationRules));
    }
}