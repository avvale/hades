import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fd846731-17e0-41fd-91d3-ef3d4dc1003e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '54c076d7-bfae-4a64-820c-2e916b9061c4'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '51hw1h0xqxcnz4p03dcipgmf99l1lgxhjtj20cb45ox2n8fz3jsedt3xovejezre57klph0jq4b2tv09cl7v6g9v5n6qpg32ui6fjqzcicc039icqjelse9onbq1zywovqjdpcgtuq0vb1h5mo5xca3d1m6a2m7bpcytx4ivrgjzlc1xsazdkqzu8wumxpzpcuh75mgi0n26d5h5i16iyphqwg16800jnse7sq4bvkdlz198t75kx9iq3vhbe2o'
    })
    name: string;
    
    
}
