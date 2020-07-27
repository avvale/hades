import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5349d89e-a5b6-4298-b54a-c3215cb9d5d6'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '56619e63-0df1-4d91-89fb-2066f64f1414'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '9ohnl81jinp4x8wwyjf2129wpfk5eu4s4wqo21cuhurot8myow'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'jbdix1381ohppzhxeojd7mt4g7c6hamo2yq42w8v3xe85hyhu76b14kl8p5mdjnm62hvpfyvsv7u5581pv0nqqb8lwprnpb24vsglcdeuoy9lsx87uur0hy875s5yl8iw2eeg9g539az4w36r8hubmxpw3dcsgxsny029gxa8tf2tl3o99gaav25s44lb57ovgmeh1mb21w50j339kcasgm7p0snyyuf7pnzchwtrwg6iu5elixgxhd3hm0id32'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 11:57:38'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 03:32:02'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 07:29:48'
    })
    deletedAt: string;
    
    
}
