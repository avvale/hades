import { ApiProperty } from '@nestjs/swagger';

export class CreateResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f5c3a70e-8612-4d93-8db4-f7aff287d97c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '1b503db2-81ee-4471-9ade-b9e1fd85a745'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'prhhxnzjq4qo51n2t0ml3f31uwd7c0og5n07sfxddzpg0oesanuuqazgoh8hcm2ap3jojy24tufojcpa1ci2rtnteanlnuq3mxzfjz7lw1lf2079xmam4juacm9brm2sbrs9ng7rnsklnt26coxtrge90srmq5k61jh1oupix58u1l2bwi2i0zb1cpoyt9tesk5r4amls87muz14v2iw1dzzaw8u9esqmnknrczbzjdmtilji5pw5v3dkbtlah2'
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
