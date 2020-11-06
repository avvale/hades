import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class ModuleFlowInterfaceNamespace extends StringValueObject
{
    public readonly type: 'ModuleFlowInterfaceNamespace';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'ModuleFlowInterfaceNamespace',
            nullable: true,
            undefinable: true,
            maxLength: 160,
        }, validationRules));
    }
}