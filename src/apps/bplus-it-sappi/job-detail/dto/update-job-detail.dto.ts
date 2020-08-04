import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '4d4604ef-36ec-4231-8ea3-df91fc2646e0'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fb3abe84-8b28-4426-bbdc-cc202aca33e0'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'gfa6v81lfxnwf9fpp6z9ortld1b1cl016mugw6r2us27p26kp2'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '88c30783-e234-4aca-8d22-1508f0033aec'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'je3xmso96ag051r0pj57'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'cf4614ed-748a-4f8f-b59c-2091b234167d'
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
        example     : '2020-08-03 19:24:22'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-04 01:34:31'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-04 03:56:36'
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
        example     : '2p188j01lho4tia4w0jaghfmpsl06sdzr9okycd7nmb6m399h0rfjvch9wytgvi4ux9p79fftnyi24q9erv3etnbpgwkdk8womn70h0x43r0tfzzz9tsv6etj9tro71zy9c87fnvsze455dphz7lh62pg5ykd4y6krey3fidcwk55ikcyqxudc05al5ax0xuwj11ks8kekj5j7pt52utxpfehzfzhuiic37kffv83ythiyqrxyiuvsa37i6dpuo'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 1990917768
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'u68qqnp237j3il4hjdagfzm4jb6h98yq4thbphdj0h8z2jzgregp7tsdt62bs61boiopsbeug8lvinxyif7c9ylnvdqp6h77tc7vp31lza09bkhpe8esyk1zjzw4vnu6beug1v2afpn427pgwjdlcrgz438oac4o'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'xhbtef37b1gza7bftkpi1oa4xq06v81ob3e0ksi92xqmnc5x0bonhgplg0tt8jbcafz52oi1lh923rxqqskgphhcmrg6g2beur5nhy9ngknuwk3fr833sc0744yofnfsdqm4tpwh4u8n9wvehkswcnmjz719iv3h1hd5xb5ajl5j7crtu23vjxrnch3p5kj1nf7eea59vwejwv1t5xyrk4js31c5w8l1lje1bc4v5ri1sds7xvilh7iclyzfkz3'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-08-03 22:41:36'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-08-03 18:56:54'
    })
    endAt: string;
    
    
}
