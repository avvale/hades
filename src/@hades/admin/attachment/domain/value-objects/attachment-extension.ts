import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentExtension extends StringValueObject
{
    public readonly type: 'AttachmentExtension';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentExtension',
            nullable: true,
            undefinable: true,
            maxLength: 50,
        }, validationRules));
    }
}