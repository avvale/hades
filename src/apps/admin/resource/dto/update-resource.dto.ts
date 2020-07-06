import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bb02483a-4fa3-44a2-a1bb-9b4cd7d78c90'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '7c1f725a-2fd6-48e4-b73a-9814c76458ac'
    })
    boundedContextId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'puoypkl343rfpiu89xhgn2o24s8kppr7krktqj087ogzggn2nj1ctp0g2ah1b4okpr1aabtiurtf1wx821012ojy239firfpg0q9gdmhyxrqs86c02eerf8huq2axtza8v9tz0z3gfb172m0dgz5tpxcml0wtfbv18kufz6qm32zakcpufcc784vcgjpaywo5h8rtu3gvrqywfkm9t5dhwlqpgy5pqrgtid9rjqtxeyfepelpjvrvlxu5uw7m91'
    })
    name: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : false
    })
    hasCustomFields: boolean;
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : true
    })
    hasAttachments: boolean;
    
}
