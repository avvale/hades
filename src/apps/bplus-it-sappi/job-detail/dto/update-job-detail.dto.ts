import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cf1d6cec-d3e4-438a-83da-85f227b926a2'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '63057f90-6417-48c7-9f84-ad4b31a24016'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'hfs3fhy6ax8oaeyiwqgve4l9ta27204s1f8sxuc5sh5l1nr6fw'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'fb6619c2-4d78-4ead-816f-114408664c3d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6w3x4562qak51rfjz25w'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5d83469b-5723-4df0-9a0d-7103b62e40f0'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-24 11:56:57'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-24 09:53:46'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-23 21:58:07'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'spn4rbuypda3t0ieat6l00bwlrpbms821qj1ut3mfcnzr1f167me5jjpy6c7edbeuv42pivggti49orosdwxa5rpwo2z13kpj59dd20c0rfe591s8zubq1bgyx9nrawf7l1okh7uziqg3yibs32rejj7x8yfgf2c6x0jw053e35eeuaca1bcra5qd537wfxwg2i3e7rofc8fn21ay328q7sob5rpy8fdjucblbx6sjvhfdvo4wy6pwpm8pt1tx1'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 8013477548
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'p0cligjkmydeih2p8z7izfh1s6hi380uamzekl6vcoqhjm1ubuevgaakr0smx5bexgcdaxnde01jatbrkng7f5jnokd7t8iylg9s1lt822w880nwz4r8n1ew0vi2c27i50a1yw2tf5yavvbanyjmpm1de90p25rl'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'ujp2p127pyp16og2p8b8to1mk27ozpawqupq9lexpqdglkzr57e7bbx5avtlrzdfq2enbfg87f8b8e7uo26h01a4h43hy2n9ifa5fylf08bu8dfskytxv7963phyksszkt01lfmjtujnw2yk1lyphi9kfokafu34n3g5ugko15h89umla8ssfncky8h3nlgeelsior25f13nl96jjk4jxbeuhn9no3ri8l56lx2aem41eexx6z0iyqqxbcalqii'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-23 20:50:26'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-24 12:03:54'
    })
    endAt: string;
    
    
}
