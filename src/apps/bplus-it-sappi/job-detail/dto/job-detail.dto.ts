import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4d3aa02f-09dc-445e-914b-8f762921b63e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b7ef8f9a-5525-4206-88db-da0a0d5c25a5'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'p8cmsx1uw0bg2kb0iyiwesk0jodlm1nzt7h3n8woiki6bq92oq'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd1044a1b-7fdc-47ea-9065-8f232f9f8240'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'hl7m2ezuxkljhdabpfxl'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '55bb5b6d-7c55-41b5-9f8d-0a4b84685596'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-28 00:13:57'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 18:05:12'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 18:09:09'
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
        example     : 'abvckduwffq8ng9hmrphbtcwpwzhxyd99ggghvazs3ntc8ftnya30u2kgs0ie2c7t3z10jgt6vo74tsi1921oedxbuqx2uqojtsrwsjpdtzugmj0rhey050m7g9jk109mvw6xgqf9gadlo4lhoc42tarbthph81sgr3e9fd933n19rd9v75nob63ngzhaoachtatsksyimb1hr547j27i6jppndyhxykq2khu0wzxrsuf54l0uia4ot4d8u4mav'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 7531916095
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'o2w2q1zpyz9dn6kgnifzf41mtlp6ndiwxk3pbw7iydozk58qxab4pptlvwc9a3ac6bl3jhrw9405kij4kd3pgxdogj3qd6h3b4ioxpmgs39e91vohpw4jf776rgpeeg6uhkfc1t4mpjmq7scyagp4yuhtn2b73a7'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'a2edk016nbvy7njex13b4sq6yu08p2a5ptg8atvex5f4buz57srwwqfapwcli705u25e3wvnlw7s4nzpe3hoo3czilmnm2zdky9pr3nob6b12x4lblkgm3lxs2musdl32o5h0msm48jm50tgob6tjzolodi5xpgoxcl8pe6jlbylpasupqgqsdohrferd9tn8kw3xivrc19kl37bng1bael1unathju2t9vd7tg5v9a9d1swp8iotbyojx72wkf'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-27 14:06:55'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-27 10:26:15'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 16:18:39'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-27 22:22:42'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-27 22:19:16'
    })
    deletedAt: string;
    
    
}
