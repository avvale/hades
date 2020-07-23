import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '577bec9c-af19-4a48-a5e3-0355abfb6dbf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'ca1e8b2e-7844-4259-9ee6-9d240cef8b62'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'nlci6l4ar240xzs459umfmq8y9ifodc9ow6wpne11salwy69pnydvw1aqdrg98fyrq1r4v8qawghwylccz1wax16vco8ddhiowpuncka7wv19fxolrxn4ijcla59jm451yon354k7nnss31tss5jgfqs9oo59nv809hkk3k8i2ik8swrc4bpd3xa56yuuy0xh5j7z33hvlkz1fjsvlpg2utic891ky6cils9d5ysbwajlreyfmry55u5c1qmvkq'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : true
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : false
    })
    hasAttachments: boolean;
    
    
}
