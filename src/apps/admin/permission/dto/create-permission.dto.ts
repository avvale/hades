import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '26cd0504-1f0f-4132-a209-c0939984de3d'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'boundedContextId [input here api field description]',
            example     : '6efb92e9-069c-4c46-96bf-e96c5beb0709'
        })
        boundedContextId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : 'go9n8e3tc46guhx0l7aztddzzp54i49ta51qzb96j8tn676rb7p9afeukhdt2mjleksj185ueypr3gtdoh03qft0ymttxffqcbfbh4qcldqrc7zuylhm26dmru2z9bvobkhdhz4s0fvid6eoopoj9v9mucrfij43wf6k7inhadne2f1iib3dlt3f25g19a882bmav3nmmvyp3d0e08yyev9n92bgjj1a2mhz4icn6xhofw0a1bw06ssmlogazeq'
        })
        name: string;
    
    
}
