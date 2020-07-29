import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4714a3fa-28f3-4057-a74b-e64cf9a9df55'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'd83bbfe5-040c-465a-91b1-e0fd147d68f2'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'cn6tas08vjzhq6ltydmz958ddyy6suff55n4q2b7jf39r7he2t'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8b9h4len20if3kfunulb64qf2iwvkhmaf2iilvw6el6r3h7u2mskq56h4ocqo1ver2ardcae7zo3aja3n0k320ubxd53uafdquzbe5qeyndsioaakfk3e8zcrue9r9uwmf13jskezrpaoot2tahrwtv7ebxcv6rxzfz7dnlfa9qkn2ofdz0zr73u8frqwit653z75hdmiby07zmsddjmb31d3s3xj245syb1zlichs0l07vcguwygufqlugiwo5'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 12:06:34'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 01:02:56'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 09:56:07'
    })
    deletedAt: string;
    
    
}
