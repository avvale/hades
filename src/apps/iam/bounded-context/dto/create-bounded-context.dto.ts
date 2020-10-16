import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7dc7a3cd-d918-45f4-a418-f2c48606d352'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '10vh4emxbdx9rpb137h2uaa5knzngd7iayvq0nfxyxyh62ron8oknxgwdc7537h35607sfz37lzhs6npf28psayrp1ctgj21yhn1cqk4ibtcy8rryvw8plw8ktqi4w7lq8uqq6trzjmpedi9zkdw766et5vqlwsfg1mibm43wnzv84r9vim8ved9ohichinxswfnmrka2hyhsu59c85t9f5d2l5qi0kecvrdnlt4s40iijma6v5snrkhlswwkib'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'root [input here api field description]',
        example     : '4vqkys4cu2ebwzpp51rn0slhhzkbqw'
    })
    root: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'sort [input here api field description]',
        example     : 738152
    })
    sort: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
}
