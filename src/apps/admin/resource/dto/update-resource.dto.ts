import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c34b46f1-704c-41a5-a72c-437207d9d9cd'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '2276f645-3ac7-4558-a209-dc824837f280'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'h51m63puoiyhnx9hff370nilhfz12by94busiakf1a9fgurmrx2dnugd553mbsb9eksjzt5e2jvegn3me5xt3n28026j3friey4dx9z2r6cppp73e91h0gmceesq7kdbkbuc7jmgeck192vkkxhfu76j9nx0s965cz3juxgk37hxss2c1u5lmn3i8o49tphieuse4gr2brp0cvv5jscr7s2613dqx2rf8plqads9hyxg59xgxach0i5e55d9dc2'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : false
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : true
    })
    hasAttachments: boolean;
    
    
}
