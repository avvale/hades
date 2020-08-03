import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f6261375-4e4f-4d23-863c-31d056d49303'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '58a8a3fd-0d64-4d0c-9afd-d87ee3374bbc'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'pbprf5kngyb3f0zcevot2g0psrgbyivxpyex7yt5pz2ipgdv07'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'pv6zjqkwiavoxi0ul7hv0u3bmdrbgr9y6t6i523m6bhriso4cyri1lxs867lonuxuysct24tcy9hljffcvxgci4kr96kvx41u48d16k8d0c4fkyioq71bxgsu2061g6hudoganiriga6hq777t3kknajqwixnq221t4jiuril2xwu1gfjek5fxatbwo9959hmc2avbi7930xjx70yipal9n2hdsvl2nnc7dli3liu69n9r7rk41g6q3a70n7d1r'
    })
    name: string;
    
    
}
