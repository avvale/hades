import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentLibraryUrl extends StringValueObject
{
    public readonly type: 'AttachmentLibraryUrl';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentLibraryUrl',
            nullable: false,
            undefinable: false,
            maxLength: 1024,
        }, validationRules));
    }
}