import { ApiProperty } from '@nestjs/swagger';

export class TagDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd3dee798-f6cf-4df9-9217-fa39aecca96d'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'code [input here api field description]',
        example     : 5327268437
    })
    code: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'ed76b37c-6380-4331-8d33-a8bde35e16fa'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '3qriuz2bdcqkcci71wb02ztqnylpk05kc6jx99htxngqu3m0x5'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'urlBase [input here api field description]',
        example     : '6a47kzh2is3awnhhht6qvn3xmvqagpn2ww4lf1m4fo7vsrz508ie3hsvg10eu5l79gkvghd6gey6okjy0jlhf63ao7f68cet11f571w9kjd913gxzs818q9k4mfe50112j04n0286v25t71cuy6rng846d2y9ptebjcdln31camcxl8p5zkwsa8n4a0wapc1cij2mmms75q6v91lis7b8ov0mh2bfgk2deh70olfds6yrxb9cljfuj9l2yabaex'
    })
    urlBase: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'params [input here api field description]',
        example     : { "foo" : "bar" }
    })
    params: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'offset [input here api field description]',
        example     : 599580
    })
    offset: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isSessionRequired [input here api field description]',
        example     : false
    })
    isSessionRequired: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-08-03 05:49:22'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-08-03 02:25:31'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-08-02 22:51:43'
    })
    deletedAt: string;
    
    
}
