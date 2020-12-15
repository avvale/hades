import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentLibraryMime extends StringValueObject
{
    public readonly type: 'AttachmentLibraryMime';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentLibraryMime',
            nullable: false,
            undefinable: false,
            maxLength: 50,
        }, validationRules));
    }
}