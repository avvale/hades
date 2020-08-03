import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
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
        example     : 'ps62zklmwnxa0ps0orioikp1wc93h344d7163iwmcngdjezrwd'
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
        example     : 'vze1f8v9q6vq21vew0r7'
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
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-08-03 10:21:51'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-03 16:09:55'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-03 00:40:16'
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
        example     : 'vs3sgwmh56g3hd0jv5mykacoxh4lx08qe3bnp84he0lde4xy0bktq1ave28h1flxfyrb75oj706fr7kug48z2vamtw7zsxlvqrcug9ph13wivpf4xl2sdrazb6hnk7h104bvkf2kyzejqy16494avasb8wd08bhgz097epnf3gradrhbjmlod6vmbgn56pokvdb4udxlu4zerjohjqkixzhgep4suywzwxdts4z2tfmd9k3kt52vujizd8t3pxv'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 3391938048
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'djsircufw2uebfw7kqb4d8ys62w1uoamk353artiytvd6l9i18rxkylco8n1vh067mtlcc7yld96jpfxl1rmzv6riyl81oyajndj3b99vo6dm56tashvwy3nxc7jhfscd0cffjsk8nvvys30x86fwb8j7yv30n4q'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'n7a2tp8rqc5z34sak7zs8j6nnfytqeela0p1ur2ncjuf7fs0iuxfpt7lmtbud95kbirqsloyt210m9q6dq48fb6q9po64ssod45a0ejojs8dqzv81i5d4zv8yuait9foh3ymdpggtx7qmlbc7gbcp9ijtm86kg4ktvamjyigfofx2ukc34pz9mlledhuspv53wo5tc858lhl42xlcrgyrd8hqf7rrs3yvzyr939a59hbjsf4u887gjvj8hu7sf3'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-08-02 18:53:55'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-08-02 23:10:31'
    })
    endAt: string;
    
    
}
