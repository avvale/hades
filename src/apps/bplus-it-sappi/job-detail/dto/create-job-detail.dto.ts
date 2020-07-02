import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ce5d3987-ce2e-436e-851f-ab6d1ef3d1db'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '21810c78-39c1-4dc8-8e1b-89ddeecf3fa4'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '11122a48-29f9-42b1-a88f-9076e4531d45'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'jiykcp9q6vye22ha3zx4'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '454b10e4-23bd-46f3-b88c-c858d6a9166c'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-02 03:19:33'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-02 02:15:10'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-02 17:12:28'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'pyjl6azmtdocgpcp3dnbynu47l9ye4kgg873jfa4spt2sp672n9lpg1osvjja4aedwhw9hi1g64xfv4tcyw26nc99k4wfohx54n95uk0fvolsnh88jw6st2yhdm03t11fsanqufjaljdf4ug2reg3bwetg90p6g9iuvdegptix1750g9rg13vdawq8mambc2p39fw9tripmy2rm3zmvh2m8zwr8pyjt41mh5sxlbxxduf8ipxt2wyq3qtu781o7'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '1oxq0m0vc9odn6fylistj0fafrv8pyewjuzdqml5dqq9ii6n3uzmdcu1gepsoicnjaoatsq4oae4seb5njulcr8q3o9hk6s6zqqoufe8ap6dyz05xsh63a4t9uo6640nkm7shtvudbb8dyybblm74qjaqok3use0'
    })
    example: string;
    
}
