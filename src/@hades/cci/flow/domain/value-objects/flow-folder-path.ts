import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class FlowFolderPath extends StringValueObject
{
    public readonly type: 'FlowFolderPath';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'FlowFolderPath',
            nullable: true,
            undefinable: true,
            maxLength: 255,
        }, validationRules));
    }
}