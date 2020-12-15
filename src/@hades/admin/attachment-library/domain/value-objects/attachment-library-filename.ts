import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';
import { ValidationRules } from '@hades/shared/domain/lib/hades.types';

export class AttachmentLibraryFilename extends StringValueObject
{
    public readonly type: 'AttachmentLibraryFilename';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name: 'AttachmentLibraryFilename',
            nullable: false,
            undefinable: false,
            maxLength: 255,
        }, validationRules));
    }
}