import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
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
        example     : '4egbcgvj27w57w1stj8a6tgwkos3alsetia81d2rnyvfvhlsjo'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'pnru6axalwr1jj5yd35zcqo7qtgh5gbtyr88w02c3ehafn4s5h5utcf5zfdknth6cx35k15z3yj0xw6marh39p16hmg7fybky236s9szpw579mwq9m8emywiq3qee2zgsf5jar0s8rf9hhia2ctu4f611agqsoxa2nmr5fwlr7q411domgihtdrli6ecdts6csbl2fxvqeskfskkw6bgzfnki9mayjxycici95pzsqbl7apgx7uoxyv0115fy7u'
    })
    name: string;
    
    
}
