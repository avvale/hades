import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';

export class LangIetf extends StringValueObject 
{
    public readonly type: 'LangIetf';

    constructor(value: string) 
    {
        super(value, { 
            name: 'LangIetf'
        });
    }
}