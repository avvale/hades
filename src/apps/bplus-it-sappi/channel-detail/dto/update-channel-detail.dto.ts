import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '436f18ff-0a01-4f81-84cc-50bc62254e61'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3417d5ec-1f10-477a-87fb-f7d0fa0562a3'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'yapau4oc4y4qjzbt2zl2h0jmmosbsi13kqjxhfvw1vz71flgx9'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '74e7e1cf-88f4-425d-8795-33103ff20f73'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '31jjhz3d0fkv4dnkkmso'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5ecca706-d8e1-4495-b131-c36f7cc3cfab'
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
        example     : '2020-07-27 01:36:02'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 16:27:03'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 10:51:05'
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
        description : 'channelId [input here api field description]',
        example     : 'b1050b31-ad63-421c-ab5e-174a0084d9d9'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelSapId [input here api field description]',
        example     : 'tdgc981vcxn5nxrebtmsuomdyrlu18d6k2r3r9y7ugt637fo2u'
    })
    channelSapId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'p8j9jjd7ph3zvo81ydr3svmv2zl03250d4v1tt5588jrk3youzdikoqk9ykbjox69r76ovynfv95et2d2jd7111jmbztfydb8fbfzkep75ohrd57fjn7xum6pwut37xrw72ctfi3pm0hgm9mjnodum7ct7qd5jag'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'l82159vrgfta3jqwreepwv1n9r6ngmabab75twcnslwnl1oskzedlbeoijy9aci666t4wr1zno9y1hgoxvw6kkrasrisro2cduw9ytt4lhrnf78xz2eqnya80otq70sdzxgp1jz7qpwn02sa2dnypvu5oqr92uz3'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '2w87k4pe0fvttbwqmf9006cyxkfn1rgd4th1aonlq0ajpjdw6glwn6igj887wnl6v78dumdln7hc25danvykogggpdhcp6k5jtbjafh98yjecynpp23vw4ztjpb65ys0h7ccj0a1k9bbqd189b0mm3p5tnefaq1i'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Dolorem eos quia ducimus nesciunt vero. Praesentium magnam aperiam nesciunt aperiam nemo perferendis at. Voluptas quos vitae suscipit et esse.'
    })
    detail: string;
    
    
}
