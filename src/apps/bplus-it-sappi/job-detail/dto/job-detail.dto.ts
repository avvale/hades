import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '7d41aa45-7431-4e79-aadc-eb95aca1ea02'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a649482b-1ca5-45dc-99d1-8690b37f148b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'c2atrj3g1hkog13sajjfhtn4spho96yifxi6d256msp25wb9cs'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'c54583b2-fec0-451f-a242-d0b420eb0e08'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '7lcuaq06d6nrribgsbt5'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'd0d02e01-04a9-4e55-9204-79480e083c31'
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
        example     : '2020-08-03 00:01:44'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-03 11:46:10'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 05:38:35'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'COMPLETED',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'dhq5d555bafyig5ntjhj3co5dthlcnqouckkkfl4tae2i9pbyk3shqxse13lxsmqnc62ff3rmheygdek69lptlldld40b88x9ff09l6raoilzp6fcz1jqexqnq2enj5j49x8qywa5av48ymyg606rzzbsc4rbek90k6u4bblz2rs449dxnkgpd5iacrqrrqnpakf683gbzdu0nznkdchhfs4xdmbihdp750g0x08plcsk27i58awxtge5h9d8n1'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 4562160079
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'thivim380s99yugmfgljn6dw98eyj78h02go6lsilgwzpg4pzrf0xr2nmxrixhtrb510vlsku3sq5sqrtz2hfi068bwgj7xcx10kijeeiqoo38gre45xipkw79jvc2ft8xyanv3evhyg8lenghq07t3pzzzwt6yr'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '1d1i8r8wrupsb3bwmhkx7xedsw5umscqbvo7y5w92u0jsf310r1pnmfunffqep29moysuru43aye0ehjwq5vxeyyx9e3iwlgctjywkw0uucqvyimhbqcfzjv5uurovpv6lx0t4kpjugmrxl5gkpmput0p1dwncr6cooehxvipiseje38s3lqa25wnf82cxr5ia2of37ck2km8bxsacgpxjjycsnfimoqqhmhls87x7i97n11iiln0gdtaec721f'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-08-03 07:02:39'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-08-03 17:19:21'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 05:18:48'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-02 22:28:28'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-03 08:32:57'
    })
    deletedAt: string;
    
    
}
