import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowSystemName extends StringValueObject
{
    public readonly type: 'FlowSystemName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'FlowSystemName',
            nullable: false,
            undefinable: false,
            maxLength: 20,
        }, validationRules));
    }
}