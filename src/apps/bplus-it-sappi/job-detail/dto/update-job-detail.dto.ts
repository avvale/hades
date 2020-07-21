import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '59563238-3020-4aac-957b-1e8e91805f46'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : 'b583a1b2-557f-44ed-8fd8-7c3abcd717cb'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'c05f19c8-3590-4d2f-a384-427e73afcd57'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'wkq2lh21qoavz53k1cqx'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : 'c9d8831a-2f37-42b1-a801-34ee35ab2c3d'
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
            example     : '2020-07-21 09:43:40'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 18:28:32'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 06:12:40'
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
            example     : '8oboukoiubfpqssqxpr2suob0q290it8tb6cbh96q3j6d5kv078fjntbuofb415rju3czww6ir5s4i4mra6wq3j8xklhers3rmmfhl8yzvyk3e9h99pruyh8ozvd9zexnh8jfvy8sc0spvpgy7yeki413743dnm2st20o5hc67aqa9l0qwdc6yjj8s6si4uav5jp2ogcvz3xn0lja432315y2gdmq35z1tuv1yv6n28mfidfp4p98lvl7xy7n3t'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'returnCode [input here api field description]',
            example     : 3744298857
        })
        returnCode: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'node [input here api field description]',
            example     : 'milnpbczqprukqg2fkny6bl4yvqxvkr5sotiv8tzwngt0wmzdiaipc30rvwwde1m4ho2mc5p8w4h0ncrxzoqn4vlhv1ukdl8e9qxbeoxw82f2nz0ggdmcf058m7mzi56sba41cap90mbirja6nh6iefovuu8vbgr'
        })
        node: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'user [input here api field description]',
            example     : 'igeclk1xz07cmcl6aqt4zm2uu64hw1xu8zy7j4uw4sb7o07c194tcd2xtbu2t4nylpulj2h51ias1mvl7b5prafs5qeion08250plom4ktst2gialslmvza3b1h5y8sckvdxaonpvtqmerxk09qtp70oqdkvmskfles06f32tths79l9d8d71bkw1bipp0kq9dkefyndvbk1nyf6sy0yen00k0bcwnk998yd0flnkr6gpc5rh4i9go19pduex4n'
        })
        user: string;
    
    
}
