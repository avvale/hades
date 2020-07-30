import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ff79b338-0f61-439b-b2bf-7384600e5d98'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '89a17434-83c3-4525-9bdc-7dfd41edf243'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '701ea37wpvqv9b6499sb3rlo2zuwl2b6mft03kiu6yhbnvv847'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8tzz5ifg0517zrw084dah56up8688o5uft3coqo7shj869a28w2dcu1ufhlcyqt54304yab15ihatxv0b1r7hb1bk0ixhraw783342lp14rcqi3vy0vfnaprnk3vgchti1uytqizx7uc2plxlby4rxd6ohwvxcqzx58a5cm7ccn6p4gkjgjfg1wuwsoks3jwbdh72domn5jw5zk0jxof9y293rq8eajishs4hoqe8pl28d6dgas81zy7v4t0tjw'
    })
    name: string;
    
    
}
