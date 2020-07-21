import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'a8355191-017b-41b4-aa48-e167d3051c1d'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'u6ulp7b5hghvp1wrhgqwwtosf1ke1a0dtedgxjw2uszb5f0m5gyqepi9qg22m6yh8hgbvyb9jyfdshuuh8kq2xi2g8ztiqrhh85vajfqsh6rvbzk43iecc05vsrimleghndn08xfvxlzen0sz2w18lb11fmepgo5w4lsffkafg1rzreho0hvc7xwm9s9a4mx7u9y8cg5enqgysrcdislf720jqqqj6a2w4uzezpk7kk4hzctjleug0103aaeapu'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'root [input here api field description]',
            example     : 'dy1slh4d1x4cw07cqa9p'
        })
        root: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 923620
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : false
        })
        isActive: boolean;
    
    
}
