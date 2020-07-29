import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'db4f5d87-76f1-44a8-a983-52c855191056'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5c59c765-3d39-4b0d-a6a8-a002a4bfd88d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'zljx15hp72kz2dlqbafuyzuxc5fiqiiqf4b8s8zsoh7eaa720k'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '92b1301a-3ea2-4d4b-80b4-50ae8ec2d529'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '3fgsvdxf0vjq79hx8ajl'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'c35cfc99-7eb2-4bbb-964d-d6b3e1c2f72b'
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
        example     : '2020-07-28 18:02:09'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-29 12:41:10'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 06:52:33'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'c2odp8qx2cr0o4d2t298wms5vqionkv13z67mwewu733k2fgkvggsxt8nv0zzfwjygod7a6x099i90dnpy12gzljv1aqtlny3bl8qrh51sbjs9xkq74y0ou2fron4dq0eggjh7bj9yv40v8lp9foj7dgqwipa0z6133s3hizwj6he5pof961979p82usm4bfwa060i8z9t8jiol8nl0anvzwr2h6dz7zrb9bierbkbbhsyxoicw5qmb99s2sqo3'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 2556590732
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '2cc785mgi22kei9suerjnk0oljf058qd72mzxjq44s16mpywqgv5y3qml67irjfagtgwutzsr0b3kbcb086f7wr638mc51qsw62ovqoesqz75lpaa5f2i8vhu32dedruazc46vz04kxikrhognf7ohykc43tixji'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '6qivfxl2m4kw8bw1y7nty6frfteeio3om3ixqbj119dza3oh5wjfli4ukrg3jya7nscz6gafihwupxj8u1ysliam2i4ir2m63dly2jg7h0r8fg7krg0yty7dyr73h2vyxga0v597xqbdn9pc2j85axdyi5kvwexlywwoc23rgrwhrx544mb4ccr9yark2hoss951c4c2cegg831rrsqgzeyxxyhnjbem9uy3h15sb3e0ko56mzdehee0opm9swp'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-29 12:05:10'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-28 23:27:06'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 17:42:52'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 06:57:05'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 08:38:51'
    })
    deletedAt: string;
    
    
}
