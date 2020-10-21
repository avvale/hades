import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '08244bd8-bd19-48d2-afc8-22c18d1d571a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9a709050-aa31-4825-8316-e106c9d1f084'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vg8i8cydv781ekb1wb0voll4kwtlp009ooiooqwagt5hk8nau1'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ott59dll5s1ejoxzy8c3jmcv91bkho61ibsf98gas76swpvdsllovvoy64q8n0z5xtwz7hsnizt6btdvnx3c39glk4dbvoqwsdcjgvheta5ckdaz3rrbiycheyjoph3rckyyct3zixgvh9zos89owof7xm8vphhh25gxxxxaff89yi4yws1lmqcddn44gx348x3kk5opah4s80tcbau2llsip3gky43d4s917g079snye00boc5iup3w409s8mq'
    })
    name: string;
    
    
}
