import { ApiProperty } from '@nestjs/swagger';

export class UpdateDataLakeDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ff866005-3393-4958-931a-342dbd28fd59'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '1245a275-a29d-40ee-a224-38b75e320f41'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'gsv45koalnd5jzm9cjshfjlgsgs85n9jrf3g0wxjh5xgy0tz5s'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
