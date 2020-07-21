import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoundedContextDto 
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
            example     : 'jgxium9kn0wytz60quchoxl6lgfahuzypytpxtnos7ngdoh0t09xmog8y5gf7o3jbs83yg1qp49t30pbjsyokf8cfr7elb7qy2mymr4w62dr31g05ehyjxxt3n96rshlzpfttkroqtlb1l0h0qjuuj0qet2xdgpr0q1bckvid0cjxk5hk4k6vh0yt018hrvu7bdva53jhczk4abj1ngrbdymx9xepppdcawxz7iuy7ewvb2qrhep7djfu4e9jmc'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'root [input here api field description]',
            example     : '2t6vwvs3w3vusq27ynfe'
        })
        root: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 303467
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : false
        })
        isActive: boolean;
    
    
}
