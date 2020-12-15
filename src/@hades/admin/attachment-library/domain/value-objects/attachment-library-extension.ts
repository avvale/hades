import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentLibraryExtension extends StringValueObject
{
    public readonly type: 'AttachmentLibraryExtension';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentLibraryExtension',
            nullable: true,
            undefinable: true,
            maxLength: 50,
        }, validationRules));
    }
}