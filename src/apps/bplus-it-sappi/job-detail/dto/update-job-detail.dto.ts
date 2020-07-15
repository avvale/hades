import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6cb9ea29-9d2a-41b9-b3d4-0e6e6daae1ea'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '93280fac-34d0-4f7e-8447-8e6314664cf0'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7df7f500-6d68-4fe8-861a-22d7314d2562'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'q0r39ut410wlpnyq6on2'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'eccd75df-265a-4cf6-8f6a-57eec5ab1cef'
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
        example     : '2020-07-15 00:57:51'
    })
    executionExecutedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-15 17:03:10'
    })
    executionMonitoringStartAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-15 17:57:13'
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
        description : 'name [input here api field description]',
        example     : 'lzfxxaqtw2rf0j4nebrj48s76gkppd9fxdj9uwnkohitw1tqmbaf8al14ldptirpbvuk1kh8h3zifyfhld9j2e9jk4h13ffwb71w91x9hvpx6w8g8zb3gt5gg64ky8nkwsq4e7oeczy634oe3svzuzp739734aa2ulxelyhr2ga2cfbzxm9010gof24526mu65gnrpsz0ts1it5xx2gtmu6k3fdu7atdq84qe4uskz6v7ut7xdtsnfhmdls2vg9'
    })
    name: string;
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 7499976904
    })
    returnCode: number;
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'fi5mlh4np0rhzlj2u1k85eanp9vtk9voap4z2waxmgbsb816oe6f2bwmdf88l1koxn9uxmqfbkbq9l76hvgn9aseub90mi1l3d3qjpwklv9wi3jq1iwk4gz9g7s870xb41xyey2zncr80vfuk27oei7qpjkdx97k'
    })
    node: string;
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '90mzidt0u5wt85krsfxp8wvu1in4gxl8uuy26h3619k934lkr3qw63rp6iya9x5gqi41pdd5olhucyz3inie5t04mswe9xxtjw2o0smrxe1e0yuhb28x6bteq52qg0cu1rcoik6soo44gnosd3jsow0717n2vp9nbjz2yfc68ofpbeny349kd2b4tk2g8nkqnvosmumm9569v6kcxfe9wruts36q3dsk0mlssxwmji6tbotc6nwvf7lihe2fgib'
    })
    user: string;
    
}
