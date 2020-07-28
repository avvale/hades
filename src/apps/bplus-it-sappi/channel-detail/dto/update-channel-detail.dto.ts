import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '11e36733-928e-4ff3-99e2-523d69ae370f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'c8ec4d98-010d-4b1e-941d-a7a86c30a653'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'qv58pv64s2g0yzb0pe3rx46gguvkvqryvn9vgq23buo13sfvnj'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5dbbfb28-421f-4131-9f54-668dc4f9273d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'dep4h639kpo1cm6lygkz'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'c30b8a03-f9ca-4346-944c-918dc83d6aef'
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
        example     : '2020-07-27 15:39:26'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 14:34:48'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-28 02:33:58'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['ERROR','INACTIVE','SUCCESSFUL','STOPPED','UNKNOWN','UNREGISTERED']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'b9ac1ac4-324f-449c-8260-37cef826edbd'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'xm8zf3yhxu30ezj34x5shqattvj3riwg0ga2wnjs6e4ueqbfgh'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '02axwkfmbh7kajum0cp1z68cgqju8agttdwwxmlukz7lj0s4i15epoxj43h0k0gknsytgjhfecv98td9bwlqf68a3zp7wvvaulvaktfgxrt6ayfks3j6owai5a7ysktmhe8rytdfr1anj6rrvruj0lp022k696eb'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'hludfi3d8924257e8xslh6kdhs0cqgfwlpxoc2eeyw04r0ge704pb06bxgaqdid6nyiuwx3locx9i7j2ocihz2kwf99zac6yu0v862apamag2yj78be9pfv4gvo2vjnjmpecoe6yjn9cxvumxer91h3pg652kxf3'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'eckmcn7857fn3k8v1h26w7rh3ea77e0fj7jcgukgf9kjnrzb6ekgv4qlfagdc3a26bjhj1n1rxgrq1nb469ofjrhjk6vfgln9qa4p8zehj2i1205v47hkwtkrdhq5th86xdon8ipbl557sjnjzqxjloi3wldet40'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Omnis a voluptatem ex nulla ipsum rerum quos harum. Voluptas dolores est molestiae. Voluptatum incidunt illo sunt voluptate illo error adipisci optio.'
    })
    detail: string;
    
    
}
