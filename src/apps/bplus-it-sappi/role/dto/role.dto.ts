import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e3ffad00-ece6-433a-970c-be9c3fdd80f0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '36b92846-24ba-40e2-9cf1-19c0a571f5bd'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'wkvy9s271doqn0hyvvjst60cfdeznewf6krclmp28acyupww91'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'kir4unn2ltefrxgp4scorbemjmz50a6nlhi6wt30qq49p44hp7t8qqb41fv64g50mxmbezp69dgdelvvbz793w7g26a9nojk8588i3h1bvcrk5hx9t8z31htjnvu2kawni1okm0p897zaya3l8824ia9p2qm6lzvhq2jtqwspgs6kzm3c8kfcwyuqiynmu2jt3hdsg5qcm6qrxiwgcjcgl14wz7jl49wyjprxj1wfttxgg52w2xj9rlxaqv14bl'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-30 15:08:39'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-31 05:41:56'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-30 19:26:18'
    })
    deletedAt: string;
    
    
}
