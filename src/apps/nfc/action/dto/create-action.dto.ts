import { ApiProperty } from '@nestjs/swagger';

export class CreateActionDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'e8172046-483a-4019-80ae-4490f4d43deb'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tagId [input here api field description]',
            example     : 'ce122498-b97f-4fe8-8be8-6f9501184207'
        })
        tagId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'type [input here api field description]',
            example     : 'TCI',
            enum        : ['CMS','ZAP','TCI','MULESOFT']
        })
        type: string;
        
    
    
        @ApiProperty({
            type        : String,
            description : 'sectionId [input here api field description]',
            example     : 'e761f69c-99c0-42d7-a627-126f44b62d5b'
        })
        sectionId: string;
    
    
    
        @ApiProperty({
            type        : Object,
            description : 'data [input here api field description]',
            example     : { "foo" : "bar" }
        })
        data: any;
    
    
}
