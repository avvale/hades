import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
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
        example     : 'd07fmbystdzi57wr7n8u'
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
        example     : 'SUMMARY'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-16 07:41:50'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 04:45:45'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 07:08:17'
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
        example     : 'e1j936l20vj66ple9esviq4hcqloekz12v1debqok7xse6nd3ezixfq5nomrtt2808ejsbm6tu1cm52lgf7ranzeqaxrwx858ufd6w4tsau7r37txci9kgm8v8esobvhcc62hdg4nrnh2t8glt0mfun8boo73c2dm85xnex2mfiwxr7015urra8mrlwi9vm4df5z0zxcr3qrsvhbl5m45tihsspw9xlyburlzeyb32rqbec746yvfetndmk2zso'
    })
    name: string;
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 6331864824
    })
    returnCode: number;
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'jqbqksztm4jc8kb6x3l0e73ovoz8jr93x4opt8so6xfynizg0eeab7e3wupqsx5czolulmkho8lfza9jfwrhfyhpd5jn6h0hivsbt4ho8vzlw2hquld1347ctbmoakkovf08takooayhlmewq1nyb185axay0wl7'
    })
    node: string;
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '81ih3cb1nxir4ndzanfijuz4imqvs9ai8mxml4ycirro6igsrcgs1pu8jtb6t9yyef8fft3fvd00rsng2mwq7byytrvh7gpqlin01vnxuti64xu9cgdx0yk1pu8c7gvd7gnpx20y6ixt6gfk3xjy8953alesycpmd1p1mrve4dk7u1xtpaeyxqc9wzx1lakmt7ct7nk6ewu2wetnji0eb4iv7rbrh31gj2m5lp2htknmmoovthupwrqyb9wj8p0'
    })
    user: string;
    
}
