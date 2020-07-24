import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
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
        example     : '8x4cuztw1z47q6zy70tci11qyv2a2dfghc8tv21t4sgt2ophae'
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
        example     : 'piuzurodt2rov4jhq4h7'
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
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-24 08:31:58'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-24 12:55:39'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-23 20:11:49'
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
        example     : 'mgfheqa51ktf9kajkuehecuv0xxbmvxlu0kdsm902tviwrppzk5l64ovg6pgtku96ddjpgzfpene2wm631jpjmgum9836mtffh1h1jex3e6e1cp4oudkhxqvxj6q4mj9ronlhbz98f63te1s3berjq31v9vsegfvf5n60heglvbnbey1sn502ykhv2c2z1a5bchim2dz3n5p60t15eojef2eqvnjolg349xc8mly7ucrauwcrxx1rlkkgom2jh3'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 9259620815
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'sft4ock2gr3x9xor9ykdxmvwa4hbylkqahuj69d1jb9vbtugnh2ey1g24d4ql4b45adgjus7rzj9b6kb8zmeo2uw171t9tsjpbtzlmwcc9xo7qxh2hto7cqkyk4zo1mxtbrbs4hhlj45andl18waajiatem6r140'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'ebtejdjvsvap6o1dlke5ga37mlme00izuv367dkim6idaqimh2tv0n4s55qu6x2kq7bjvwqmer32aql4e5nmj8vb2fy92ikca77q4c3awhll7mbcqs3ot0rte40kn0kk21k1kjzwo2223t4fd8bpb53lyupoe6elmsqou2q0zf3xb33i0yz1wao1hexwxkmxh1d75qzsnkwy9i49vfxdfc23onqvvh4cdvv2t51kq0po4gsoivxhp8a8kqz3r8i'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-23 19:15:26'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-24 13:08:28'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-24 04:15:27'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-24 03:44:40'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 22:11:53'
    })
    deletedAt: string;
    
    
}
