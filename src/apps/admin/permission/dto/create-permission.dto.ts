import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'be6c6cac-18f1-4b99-981e-c928c6342868'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '4eefa322-b9b9-4e1a-bd9b-f8d82ff1952d'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'sttzwxmycqhifmw64qc7xhtf8p1oi7igh0w2425qbhzmneiuzkd5e4aula98dvy5cznfo07xv9y9q085iep5e00ev77ha7svk0dm88gt7o8dlbijyurkgtv49kgaz8ptcf3rrahq3cswvl2eaildh8dkixwp7t0uwjt139t46qymykri3b0p0jbv31ey10oh2hv6ydgtqilc7r8ar3fidzbxqtju6wxxb460sovr0b2lam19qqvehfga3paca69'
    })
    name: string;
    
    
}
