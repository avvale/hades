import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '911e426a-e32e-49d5-a827-7fcf0ba40100'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5a020b84-7fe0-46ad-8f4f-364dca1fad6d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ex7vz5hrx10xwoostho13nkzpmq4itx0ug9sjluevsb7bvgg3b'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'jx0x90nhq59jgw5a6yyarjiqoaghodao1drtrq851gf7vuanv3vggqs93bag25sgd2tizkwqkjfxke5u9o8ykbu6hrdwosqa7gr8imggiprdwnptlrd9mhdarzph1t2gp2o1i58dvsdrb4kh7pnxjzhomjxbp04zs6rfeyoak0ipdl6dxsb35585wo8dfssihscf1jw2dibe7brs042pgqbxigdt6f4p03endbcm6x59bi0m1agzrmf3zzqq8ud'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 16:19:05'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 20:38:15'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 11:46:47'
    })
    deletedAt: string;
    
    
}
