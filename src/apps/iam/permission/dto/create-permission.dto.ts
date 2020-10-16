import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '08832010-55a7-467b-866e-ab9df91d99be'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'gixitblaavjweib6amc7nqw9wv9njz7jtg8g4a34obz0kn8qq3sw4pwk8sl5xs12gsvxu0pfr5gu8vcq19b6qxtsbsq7anz3cmqrw67c17kd6wgqp4k4plgw1yz9tv673gndh99am7eh231k6g1ulwvp1daivmjg80e78lekroh00l9d98oiw821e02b69yo06slzapuiru5htmrnb9wwe0edib24ih39fmp6n7edvdjyz1m03gz5lj0sa49ymy'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '51d1244c-95f3-45f8-b042-cee2360ece67'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'roleIds [input here api field description]',
        example     : '',
    })
    roleIds: string[];
    
    
}
