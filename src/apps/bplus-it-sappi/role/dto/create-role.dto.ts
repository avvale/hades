import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ec2837a8-9eee-4322-ad8a-d3d7d980ffbb'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5accecd0-2bc3-4c36-810f-22977ac0d21a'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '6fhk1o3j1n0je6r9wqwr04tsh04cbco9cavqhaz7ig099swhfq'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'h0dj4j06cpfxq80vp1lp7x3o13y7vts4wud5v18tr9bdycj8yyem6o8cz4ix58bdbizosi43l9whsvh0twbhmxltwxgkzzpnqverpfkcqf7a7w17lp6xqxawvsnw1ym4as73wzl9g8lgmu5tz5k28l8rvn6rkt7znboufrmhtdjlvci3pi1hpm6y6we6f5roh7dju6m56loh3bzvtv439bga4umanwf8k9id9mbe5shbsbbcpstq0jgo10b9nmw'
    })
    name: string;
    
    
}
