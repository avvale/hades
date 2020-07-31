import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8336595c-4691-44db-bb63-a7fd9c7f8349'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '8c12e5b7-3d27-4955-ae4f-10e545033b47'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'mph1wtm5teerzjag94x95noq9q1dvd7jp5y66zuwcmc2oqwvog'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '72677ac2-de78-44cd-b75d-06bb7299013a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '003309yfx9cnrize901f'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'f85cbdbe-36bb-42ec-8c66-c929c1d74a50'
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
        example     : '2020-07-30 17:26:49'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-30 18:41:30'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-30 21:52:46'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'INACTIVE',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'gygm6rqv8q1vxptrxf3wf2b310yfylhmo3fk50nn'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'ndhfiptookgujvm0yfm0nayc1s9o0tymkm91wmt4mp8l3k07eg'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'wn1x9jh6z6d4oqt2lmpbdjb9dkiaeza7j50dlkrzgxdlmhjrf7o2qwll09ur8wpw2ygcxgeh0rz0ltmc89wfina91n43dr0g9i4h1175jb96enc3vwkxckkqu5z7kchjvkvn7xrfc80u6km2tsmefgnrpbbnmvn5'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'iwifnyx016g6mdwq5pkm21pt7kp7e5xocuf3jati98t6mne6i3zi69ld3xlvyawkwyda9bk6hq20dzic3naom6fbphechgtv8abw3wxx5cr5rvub2da1nwqhx8t9ydm4upa6mxbo2kq5gtemf3qbd262iv2qgjin'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'tajluhqrmh6ioksd8e6q3nidev7ysnho929rs18ko2fuki5l6gzn6embuwzkmjuodb48w5cwa3dhwij1o9r03hjkxak1rk6nv81sha0v63hg9qujtl4jc2tdf27d46hey0to6kutcqimbmvczhskhmzgq7efhdns'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Dolores error et et praesentium debitis sit perferendis. Atque temporibus perspiciatis est. Quidem praesentium dicta cum non molestiae. Illo deleniti aspernatur dolores non libero inventore fuga id magnam. Dignissimos neque sequi cupiditate sit occaecati. Ipsa fuga officiis veritatis est iste.'
    })
    detail: string;
    
    
}
