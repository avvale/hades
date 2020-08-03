import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
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
        example     : '10cg2z6z2shz1ch0w1icm59p5lcqtmnc1ohwbrzei6e6npptrc'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'lpttt5tzzgnx5dmzzgzzjiv2q8x2inef9bvpngy95i77esift0k3sthw98km7qjqp6t2kkfgh8f4hox5cjfx7rarvfev9kfoed9cjovgyn3krad3bklsnhrb9dqiho4cantlqpkhxqbel4rflr3yonrbxd8voiqgciobxxd9gw3b1r2gnd66pl8w7jbeqep645o2s38y5iqvieplpndocmcxxjcnmhf01roqhlqsjtkv876asqf9akpznh79xr0'
    })
    name: string;
    
    
}
