import { ApiProperty } from '@nestjs/swagger';

export class UpdateSummaryDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '9a8c9eba-8693-4291-a6ca-290ed515da45'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tagId [input here api field description]',
        example     : '2a71fa2b-9564-4990-b3fd-502329dcafd1'
    })
    tagId: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c44947ed-9e4b-4896-99f4-b2d2466a0878'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'accessAt [input here api field description]',
        example     : '2020-07-08 16:56:19'
    })
    accessAt: string;
    
    @ApiProperty({
        type        : Number,
        description : 'counter [input here api field description]',
        example     : 5843687644
    })
    counter: number;
    
}
