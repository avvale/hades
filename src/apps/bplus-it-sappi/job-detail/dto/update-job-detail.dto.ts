import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
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
        example     : 'h8n3hw8ns6z7a9h5r0eb'
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
        example     : 'DETAIL'
    })
    executionType: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-02 03:51:06'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-01 18:24:06'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-02 04:38:54'
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
        description : 'detail [input here api field description]',
        example     : '4oep8ng49ckdt5ojy95ro1opjm4zkxh1005655rjy6mvg2ybgmlf2a5l9b0bfmgwmgxj3dyav6fv3l72rz4825w1qb6klsb6filrw7wpk0o1cplnncip8anopsmr5htneu9l1m3z8wlzvz5w2xknr32h9rjyis89g86vc2lj6nbiko6nbfz9ojfc8xl5rfanip6u4m7nkwq3kc30cum1tlrmsuwlc1hvn24t45mncu15lq8r0zgson18wzgowe0'
    })
    detail: string;
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : '8wlj138s468si71c9sv1lml95s3h1b8hvijiilcndr72wmi6urekwq1yqbjyccw3poqqcfxymb9s8o5asbf1aivlhrbrosqj0ot8992ne1cplfawx66fuljdoa87vh9zftb9sp7f3iok65ojgrhidvcq239t2b2z'
    })
    example: string;
    
}
