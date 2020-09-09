import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cebc18b9-d3c4-42bb-8df2-3004d5072344'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'by23cnp1ef6i307b8tywprvzhcbkpf46xlggu9kzfgxbcpj0ypgcraku7120er15kvxvebwt9br179at7hcw1k4cbvatm6wmauyv6x7orfmrhq8meh5uyutr48dhqdy0gyofydt579tte7lg8v6kcgo6wp5wqp1mqcvdk1vxvp57wmomtxa4o17b03hzx38wpk9o9k2s21uyciwe5yhfwu6cbydcsdj9oqoyxrvxxf5loco0jjjno129rmj7cmy'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
