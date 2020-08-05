import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6b3b40f0-ae6c-4a17-b43b-43dae1751b9e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9a78fa1b-5b1b-4e2f-a9d7-d5c43689d977'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'c9ppflnyn6svrwjq5r4cw8ngqxduvml7yauxbsmxkadqcmil2z'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '6abd2e32-5f16-409f-94a4-7df6b437ccb6'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '3hx37iwlrb3r40gmdgnm'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'f772aa06-83fa-4847-96e0-6f7a3cc3922e'
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
        example     : '2020-08-04 21:11:26'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-05 04:07:28'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-05 02:29:35'
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
        example     : 'asdold162tq14nzqy435a6gyyg0n9uhugtipe7eabqyflwo6vpaab8cx8c1racwpk3takf0rthpxtgdb1k7a8ifsehsvapzj2khjmtja7rum6v7i6c989ivhc6g4i9q4vcsu563dtckst6i7er08rwa4eq0z6w9issje1hlu5jwfihz2dl2a9r0xro9szem432s5fig0381vfj2nox9hctpq34l2utjk3bq9t8r27j9ds2g4tothgosnw1on4nh'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 3582258740
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '0zhdvlogdc2xdm8e9vzvbxl9i1dbifmp2z743i4bp6fchgyah2m5it5cdfhhzax53d86uvj2bij9ux788dl4wb0j3aqyvfd0kghnvbzj4rz0w2rt2seshipcz9jg1lvtkmoypuxwl9y0418q68e8n0hgx7000ud1'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'grx45h096411hiw3nxy9dti051sstxwphxgs5ogfupk6mfcam9kydzq0yiq7sfvlnh92izownqv5vgx6hq1ju1ytt2gtvcelaaxoky3wtzxv9nuxvbefxf3gjxl5v9xin4zpby1xtpgax5slm9l5f7sn51455dndxgs0bdpxruznn6srzptie71g4xg23vwvsmltn45xqjx8qbo4k4jldrxoynr1ndm4yyfbubs44bph4kjq8czatfplhooxj9f'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-08-04 23:13:55'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-08-04 12:04:09'
    })
    endAt: string;
    
    
}
