import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'fe84c0ad-e326-4c1d-8775-1ce2a82260bc'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'uoid228jvem5w7440kcy3zuu4qgwq3u6xpuc6d9o44s3fk5pogwy8lmssdf2q1ljy7ffml4ip566mjp03s69s10kxf6rgmj3735o15ctyxkfv6fsu83vjkvbs4xlvxriknx2l6amrf4so4dx6dlwzcx1xc6q92or378r97pbfl60oplew8iqyzbq26w6otm4b1e52r3olkhouvjtwhdj4dp55lcb3piyr1t2q8qe7au0x3omgja0gwg8fuks3gc'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'root [input here api field description]',
            example     : '3cily94dignx8h0eu1k1'
        })
        root: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 678031
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : true
        })
        isActive: boolean;
    
    
}
