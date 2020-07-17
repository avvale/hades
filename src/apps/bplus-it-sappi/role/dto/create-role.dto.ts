import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '3b1bb011-1b5b-4ff1-8453-d226ed4351dc'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd76e18ba-d0b3-48e4-bebf-0bb95a5c04b7'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'fy7fkxwxjepjmr35rs3rcm6ckcfslgzdzh25z7vbzx8uq3d1tljvs7hxrq191rkbarr1r5gw34jqjeoel6nfmreoece3ifij25p9ybmvb6j67qfcv02sg8d5qszldjqojt6n23egn15cz54nu2722jwy5muxs1msuw9d8wq6mwyoxqpqmqg03owo01f7fxzpiejnx4cejjaqo9al3g9yowuiackpika918d8cnp5nu31lm8hs92qlnl9wy3xaon'
    })
    name: string;
    
}
