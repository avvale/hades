import { ApiProperty } from '@nestjs/swagger';

export class ResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c34b46f1-704c-41a5-a72c-437207d9d9cd'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '2276f645-3ac7-4558-a209-dc824837f280'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'jmqsmy7socmm8elogxaox1eltsne5lophv9lcc4jg7nuwfqonp344wc172idzg26plpxnxavl30llwgd0tebf5p719rq2k145tie5ed4cz1vld0ux2k0ngvp8q6xots8tdq0tnn5qhhap00ft7h36cr4n902yh3h03s9v1qlxep99xcs28m3itfeu104mmdhewe8evfekj7xlspbjtmd3hjef5rt614zh040j4j1wpgv1qif68w5q7j5rxhzfn0'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasCustomFields [input here api field description]',
        example     : false
    })
    hasCustomFields: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'hasAttachments [input here api field description]',
        example     : true
    })
    hasAttachments: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 11:53:04'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-29 05:45:18'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-29 12:08:41'
    })
    deletedAt: string;
    
    
}
