import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ff8cb54d-0a91-475c-b0e5-1991a725d1da'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a35fedca-15dc-422a-9a50-029d18c9764b'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '3vijkba2syygzlq3khicyex07secbuwnu3jn9r704usduigsja65jeulwldielx6mill2ix0whts8thdhjece4my97kjmzo8nkacsch13au1byxu30lp8m77qwkap8n9f59c5tmtt0jel88689svtq9bo38scxm1s2sncz6bvht9v05szngz6w8gudh8sx3e2amxpo1kw76ddmn494zsk4prxcasqeew78qi4jdppm11njfi4aosedmpor30zrw'
    })
    name: string;
    
}
