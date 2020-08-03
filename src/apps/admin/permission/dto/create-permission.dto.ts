import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '33776019-8027-40ae-8ce4-0f736ddc7ad6'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : 'bb46f885-9e91-4ad4-bac3-64496af6c532'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '4a6mvsj8t5v9sqdlfspge06kb110ths16sltwx88n5nmoxkbkoxiftu4d3o18sxd14py15ueqes3o4bhthsysrfugz9rv50a53fynku6yg20nvi7lbvq87cyrltctsw94bfac4b8q6vvw8czin7f0yes2v76cwb2udikey7tfy6orfyrbzfiv9fe483e4pdlk2mwwm2h33nys0cznn6n8qtjwbncx9fdjpar7f931jbxbcbzj66145xetea686v'
    })
    name: string;
    
    
}
