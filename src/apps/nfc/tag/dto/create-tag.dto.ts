import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b91fa74f-012c-4830-9dd1-a930fa42296d'
    })
    id: string;
    
    @ApiProperty({
        type        : Number,
        description : 'code [input here api field description]',
        example     : 9949798760
    })
    code: number;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9659665e-b461-4578-9df2-5bd2f5cc5014'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'eeiom68g3qngfy6wcitc60ca1o7fc25iypi0imb3pul5an4ruu'
    })
    tenantCode: string;
    
    @ApiProperty({
        type        : String,
        description : 'urlBase [input here api field description]',
        example     : 'bnogx4emmbc4k4yq9779916aurqjatm1paof8ap836c9pg2zy4rdy7nxbmfpftrwdu0w1gj9g7o11cyv68ucj1d4joj0zljhotllgecdoujrfw1ztzqsuka2ee28q6e371dtb0sslxysf6ntmnqj31twodc449iq49u1o7b2wmhmyccrlfsuk9ugqcolt56edqov3b0pr670lyese3li761shfbkhv2oovj8uyxa94msa5195dhn29vjs5yjr2w'
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
        example     : 804016
    })
    offset: number;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isSessionRequired [input here api field description]',
        example     : true
    })
    isSessionRequired: boolean;
    
}
