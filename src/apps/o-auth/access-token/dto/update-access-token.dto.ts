import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '37034281-2b7a-4a96-a163-8118c37090d7'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '4768d54a-b685-431b-92bf-b8de85617701'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '0a306606-b98b-4deb-a49a-7c6be52562d6'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Ipsum animi est distinctio vel. Quia doloribus rerum earum fugit. Sit suscipit voluptas odio mollitia quod voluptatibus minus. Facere nam est voluptatem doloribus modi reprehenderit. Optio ut similique vel eligendi repellendus consectetur. Ea molestias qui.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'bmhv2xv62l678won8oppyoucgoyx4xi9fboh0hhhxeg2aa1af0l10s2jsdi6i05fgialqes9z1mn799i0qnhis7zoij2psgepz5494av34ha4qnltxx7i9y9oid9dhqftycy16ckel95ewn5350x62l8xb98xceug675i5q2ms07rguf9m3ac277oyh564dz90nh969p80t9mz4qkagjqoaruqmdohdr9df1dvj2pz95y4syzemggg32pn61461'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-10-16 21:09:30'
    })
    expiresAt: string;
    
    
}
