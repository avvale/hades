import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c665e62f-88c2-46bf-9488-96f4c064c3d5'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'cde92c0c-99c9-48b4-9e95-54222e6de843'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'sx79vijnt9rhkv1td9n7krrqzilhhh4byy3hcoagajfhjwei5v'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '62a3f5cb-b5f5-4da1-ba87-9f1454ccd7ff'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '1fkvpjjni0maed096sn0'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '7a2c0d25-1de7-463f-bd98-7b34289c8947'
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
        example     : '2020-08-04 12:25:17'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-05 02:17:20'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-05 06:08:01'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'UNREGISTERED',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'w8of3shzht1g06pprj71zp0jpn9x7lf1hk7m1413'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'qantgcvfc4rn9s8k4lh6zjbbhdfgebernfuwmh0zyntrb4o12g'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '98l1o8ytogc23t1a6qxcpw24lkezywh0r6ofnqnjfcv4pdjy3omox5jtv33blaoyyo09o8nf9mzqkjb0bgc2wb3aqosx1sqm9svqt4uwzycgco2ecfmp5hxb2ey0sbbheamiqsy2gmy8oi3wktghl1vv9tblqmt6'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '2kt5j54slmh0nnufmjnqed56d3y64yxvrz16i2ntqu9aambyi6z4vh0hrkxq22s7xeejl3w9yia7pqxu2d2u4rdggqs4uum1ii31zhtm53kzddyuzfx62on3smaoeb6d90rf4hb2doufs5e34a7cbbm8917b2oxc'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'z53z5zd027obbmkc69tv7qa5jv5zgho25rw8er5onj5pi9fkc5y59pios1far51yhj4fv4awmg50m5op123pdswlhronh7h1h3edaunya0te22ubdvokbhtyqyitp72s9kwwhtds03ut90sk82qosqeaoc0holz7'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Repellat impedit voluptas. Odio corrupti vitae quaerat nostrum numquam a iure earum omnis. Ut accusantium iure reprehenderit aut eaque et non sit aspernatur.'
    })
    detail: string;
    
    
}
