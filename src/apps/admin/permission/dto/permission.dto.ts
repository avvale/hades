import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '563049ab-6a1d-4790-b182-2c1ac0a109b3'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '45489bf1-b3cd-492a-8510-413b42dfd34b'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '3qj6f9onymo2m5xrgcqko2p906oazb1mz162fzwa3aedhpplkz0lkkdf62nko4i2ql2204efy796qq46puzr7u7qh7xnar65vp842vcniiv8sx0iw3h0zzy73retefr470ki2812z24pg92jwixly0ato2jestyovgwe9hf4p1o5inncwaus1e7j8ag9yms2r3cvxnm91s7a6zh2gp4mvfczhvsroudywuieuofzfr1zuvnky5xeyzm5ex538xj'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-09-07 11:29:41'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-09-07 02:53:04'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-09-07 19:26:19'
    })
    deletedAt: string;
    
    
}
