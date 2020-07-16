import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '41dfbc59-c509-4f5e-8b71-035506a0580c'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '76f92a8f-a4b2-4007-9e06-a205a496673b'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '99c4050a-7881-4738-b963-d077f9ea12f8'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 's5lkb44qty0bpt1lvap1'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '58fa6887-e648-45b8-9de9-9fbcc1b9344b'
    })
    executionId: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 06:04:59'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 01:32:31'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 04:24:01'
    })
    executionMonitoringEndAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'COMPLETED'
    })
    status: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'a915gko64h1n6efb83ldktb3f9yot33oejgns5w3hi6tr7zrjlam633bpav44rptx6xh0v80knhc4ughodhocunxk66n2q8kcowoaubity0osmep542fvwr35ymcgp4cgjme6iezsr2vxe8uz8sbq843du9set8mvo9998y0vmmrvlfij83ofnwoj54dprsj63xvzkcne86nhd72beh6k3vrpv19s1gua1jckvg16ouwvwrboqki4dq4ny10bpu'
    })
    name: string;
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 1482108874
    })
    returnCode: number;
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'kosrsksekieowh04u44qm9u2248xmp5v2i03fndwmei1oa1sx8ygd0oo0fn3xm91ldwzhdu0ysoh03e0b7elsu7agc8jftxul8sd264za4fgh0w84e7dqjjbhne67k9s7utbkehn0r2t60b4nkfmxh57olzba37p'
    })
    node: string;
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'ih4ijgsbtjtnu6danstephdzrfrq73y9lap3dlaku9xovw5u6edx3k83rt31ig52nurjxkkydn8f6vcwifud38vbqrwwbjzoiuvha2iu6pqjgxdzioaq1pmbijvgj0or1b39k66xcnmc95xr3k88p1s5svycp67113pioj82allih8lphzpr9zhv14ns67u4zr2gbe79op0mjdzvpftrlginue16lfky31k62vcype95rmdw8cue37ckh0bdl1j'
    })
    user: string;
    
}
