import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'e6fca3d1-f082-45d8-acef-1dc470294220'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'boundedContextId [input here api field description]',
            example     : '8b3cb4a5-c55e-487c-a024-fc9c389fbcce'
        })
        boundedContextId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'eey1v2i5j6ofdn49windlfmh2d9adts07pf9ojlrajh35mrgegr4374enxq8d6hstamnimwy8pkhvqwayyqo2h21u8iiuy2614fpdkj8wou4oggxm1q1gd8rl262xcox1j5eojy6xvxnh1jffc7ivvjhm0q5hxx27tkncgbkdwbfwfrj0cczg01s3swrusrvuxwvaz0fzcc8yibz0v65j7kqoo8xlghqq2492l44le36wi7l7sn8j8iecbf1tj2'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'hasCustomFields [input here api field description]',
            example     : true
        })
        hasCustomFields: boolean;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'hasAttachments [input here api field description]',
            example     : true
        })
        hasAttachments: boolean;
    
    
}
