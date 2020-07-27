import { ApiProperty } from '@nestjs/swagger';

export class UpdateDataLakeDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '52de01a0-3269-4fd7-9618-0a7340d072da'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '89cb2ed4-d365-4d4a-9e0a-7b3e7ba6af5a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'hpiiftvbv7ihc756k5ywgngcwzuh8fafry5khmcho7tc3mah4q'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
