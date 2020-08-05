import { ApiProperty } from '@nestjs/swagger';

export class CreateChannelDetailDto 
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
        example     : 'rjk6kqlmhfwf3g8zw0xu08nc48t98gvg6i9h6ybt6pna6bz455'
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
        example     : 'qvi8y2r9sxjn9mwv8ijx'
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
        example     : '2020-08-05 00:48:38'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-08-04 11:05:35'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-08-04 12:20:17'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'UNKNOWN',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelHash [input here api field description]',
        example     : 'sd767xhqgwjn9hstu6jg901uin0zd8ztulvi7u6g'
    })
    channelHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'es9n51pr84z2hbuzv57sb81381h2inohxzynjm1x8efvbdo28z'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '4a2ff5brsje0a006j8v035rvh848ty25e9trm54x2ojma1i6jdby1dvzbnfih07bisua8frafl8k7xamnvokzfexs4l6oojw6ibcnfttje7366qmvrxhg9y7wkglji54ddl987aqw7gh2w03yoh16iu8z94s4n50'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'aqss4e146mde6edgl498qorwh6wsl4muim40q5zhrjkps0zho70s4dhkj3q4iwuuudvuyg2cz1si57jua3aqktpgwgvnfjool3rkqi5u7z44s83sr81g40a6u7els6it8p7iljuipw2k9qk9ozpwut3kuo9k1e7e'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'cwlut31a59svq29bm9tqi8g5t4imf9flfj8bzaih4yd61xn79ceocrzv5iw3dljofmc0yjv8wwsk26jh585h5z85bms9xp6sr68rpgt332w6y7846lvp8sksun2s3ibzqvf9tggfo0trse6awzfzfig5iyfo62b8'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Rerum odio repellendus animi. Facilis dolor et esse non sit. Enim rerum et. Eligendi et dolores quidem. Nemo voluptatibus expedita nobis sed consectetur alias mollitia optio.'
    })
    detail: string;
    
    
}
