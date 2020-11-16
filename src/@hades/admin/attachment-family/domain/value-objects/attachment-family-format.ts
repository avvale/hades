import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentFamilyFormat extends StringValueObject
{
    public readonly type: 'AttachmentFamilyFormat';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentFamilyFormat',
            nullable: true,
            undefinable: true,
            maxLength: 10,
        }, validationRules));
    }
}