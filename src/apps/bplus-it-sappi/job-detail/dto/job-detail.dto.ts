import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '63e94615-5741-48f8-8632-fb55e367792f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ba7aeb09-5232-4001-b6f0-10c0d1c492b1'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'n417tqlmtu315rmebbzvesd2fsbej0siavn2kwejy6vd4iu6q0'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '52f4eaa8-2be9-4460-9fd6-cc50c9a18b6d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'syvfec57wwemfupxcv61'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '8c80c82b-c12f-4e1e-b5e6-9eeb23a16783'
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
        example     : '2020-07-31 09:08:04'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-30 21:33:57'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-30 22:29:49'
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
        example     : '32ik9w1wo1azkpzta2edbgwdngiwrfo1t61d00eu8bldxtrprx5aoajvovjkvvpbntr5xammey783ucljlqnxvxp7tvf5du4t68r7k0k5ur12901uy1wqr0q1893u7b50c8foxoyfp57e9h7jmousofjyq1ia1nhv7skl68rw4tpbzu2it6p17p9fyxjp7wplgbhdgpeg6fiy3w40urzsgg2mdgaxds7b36meqikjzvqasn5xdeau09k72mm0c9'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 3379541662
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'fqlc4947aiemzzc2iz1bbc3dav8m4nwtbeg7sd71fadun7a7pf5hxxg64zlepv2c365ivhmgqc122oc1upnp3hmzfudghsavpxfg3x29no2v0jdrr2uzlcl7h8xejijgk2cbard6k09v08jxwpgunueaii9dcjho'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'wy46kowd2o0l76ryyfz0rzfsnzwbpm1bsjv7ukhgelyow9qxqk0805ti56zw2wrenw5j0v9o09sqb4r6um3k3u1px77hu6u8ca1k9b7yit920jvop4x2a2oo5mzn928zbs83drbxt1t9jxi1pz7bhv6vokmy7uw67hjm283n1m5ife3ehdguf060i5gzyp949mm9adgdyvn2erul4wxy1or3hmk9tcdiq85mgksyzzutvtlsa9qgybexa7iu5h4'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-31 07:59:45'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-30 14:19:36'
    })
    endAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-31 05:42:42'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-31 01:19:47'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-30 16:50:40'
    })
    deletedAt: string;
    
    
}
