import { StringValueObject } from '@hades/shared/domain/value-objects/string.value-object';

export class LangIso6392 extends StringValueObject 
{
    public readonly type: 'LangIso6392';

    constructor(value: string) 
    {
        super(value, { 
            name: 'LangIso6392'
        });
    }
}