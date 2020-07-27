import { ApiProperty } from '@nestjs/swagger';

export class ChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd35c0435-691e-4f46-b0e6-ad6c2452cc01'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a32a2837-b181-4e09-aa08-c7e5e9a168f3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'r6bqexz7j4z6hvttd5he1s3tsekzkczv8is3ix86vakdhyyoj6'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f07e6293-cbed-4b64-9210-a1124af2ec75'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '3koissvmdmqx7dolas6h'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'd26cd44f-808a-4dd3-8a60-bb6db1d079e4'
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
        example     : '2020-07-27 04:01:30'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 17:48:39'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 08:01:06'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'SUCCESSFUL',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '62fd8a68-8fef-46a9-9523-e3cfb6cc6795'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'v88eoqla42ygw6e0w7egt2o2nku1qo6m115ipx8u4v2np4xnei'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'gcorw1svkbdmg1ot3bytssmuge04x9y2d1su4cbpr8ahk2d6s74d4zf9zu70lyxw46it81z19s8r1njvkpke8fdozs1zec6aa8580ux958rc6byl8loc8tfxfhlt634xgge4tq3rtj27mwlay3u6f3gmchy7xjvq'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '4tpfgws25x92zzglyil01qq0muw9jz1rmyx07puuf5epuvogcr9oopx6a5x172neonujmfpdgocz5xz5ryvzpgji16e3vbqy3ay8b2tzjaliorf6t7qoz0t1026cmal5zawzhg1zabiuc6j4zzn2dyki78vk6je4'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'b3667lg82b4lj33pkp1j7jm2s8q8n54v4njcngwe1z5f8bykn5ju8fe4qqaaiwo1sj281zn79x1bgq6vvxsgu0n1ddqxmo5zbbrxcdjzrdlywgx7t8bcdr1o58v0252uecj9we1fnkzcx5dmwcizjdf4f9uvcpzu'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Harum eum odit necessitatibus et qui omnis quae et eos. Tenetur unde sit quis esse. Pariatur quia quam. Incidunt et consectetur doloremque dolorem ipsa qui quia incidunt. Suscipit asperiores facilis. Illum impedit ad nihil ab et est animi.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-27 14:45:03'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-26 19:46:31'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-26 20:52:04'
    })
    deletedAt: string;
    
    
}
