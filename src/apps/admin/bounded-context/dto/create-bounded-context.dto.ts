import { ApiProperty } from '@nestjs/swagger';

export class CreateBoundedContextDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'db1564dd-99ac-4a9e-b51d-87a45133fc0b'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'odpid37ovnmpib6gtrygq9fvn5maiicsir2ei2m6y6yb5u23n0isnlhyofdn10fs4ulggbp71mp8fqm4h6ylnyhaczu7l5n1wlb42j6b49yhrpm3go8wls3y232qur8792pzgr9ccpc4lg70rzgssuyxi2vumu25y2t96ck5v7l6gdvt5b9mvq68llsa79et3im3z65fxlelez0aht263qk7wto1x1v8nlhq0h3ab43dqek0p33hs5xq3bqgjht'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'root [input here api field description]',
            example     : '3gra9gbpty51hsyw8dix'
        })
        root: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'sort [input here api field description]',
            example     : 946197
        })
        sort: number;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'isActive [input here api field description]',
            example     : false
        })
        isActive: boolean;
    
    
}
