import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'db13bc91-b8c6-497d-8a0d-2a9fc5a6cd2c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '64a2c4b7-7233-43dc-aaa8-5e7554b9b380'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '1dd7try1yvlvdl0wueavwbax1cubtrhp8kk9cqq09iwji4ad6k'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '01czbcxy9bx04hk2zybitzc938a40eow7pmpydorb5bh9zll2g2px60o8pxzn5t1uakk7gk0022xddwn6jomz4in28f4q2ucyd4rcwn2jnh62ochczexz040a6v6ka3awxz7wy6w70x29lgqpx1z8p66zap8ewrqg2mdvsq03jyqoex9cd6roh7kg1xwcxw0ynzhsfklzjiq6xvsczt17ipffyo76001fskbn27lvzlxg3kaodedezoran5cv6x'
    })
    name: string;
    
    
}
