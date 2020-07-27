import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
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
        example     : 'nj6xs0wbzzmlrz6rbqdojjvu62imcr5633gwgs1mf0gxgsw42b'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'nfueq9iut9vntqrm1u1tssslzayq2gwqja4f8grcfigxjj94mblxzrgwf6t1hysil5ejwit15jofj67br4cchcx3p1yknjudwmtaqv3ms5uzmvm9slf3ju3vvacjad8fwq0ymk8fqe3b8n3xoooxv2uh64xtn3aanhuqujhxvhgwzgxcpvwbbkekry0s2trarbe3q4fya9t1xdgdh79bcx8lccohiqrpv8psbojuclngmi3h4tbduqqde939t31'
    })
    name: string;
    
    
}
