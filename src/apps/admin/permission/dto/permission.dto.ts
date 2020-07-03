import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '747bfcad-c6a3-4118-893e-bfc04c8b5929',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '4c99962e-9e84-4d89-bee0-08f27d46035b',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8jgtvqdl0w878nft98imxeituupp1u50sgkdp7n8i6vgydiwvw4645ztxj2szl235emnlw4ks9detc5zi4676rnu350kb5mgi85xfmbq7jhr3ipx65cg0jjrrqv0dngcfnkv8lxjwmdzfml147fuf9fp0ljcirhefg83wulk22y4fs3k79ib8np0qpd2tz3w5wd2ub3c2gynuv1nvlhecb69nfnxac8fjqnks3squoufytg71lp1y93d18e7tuy',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-02 02:37:48',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-03 00:01:41',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-02 08:26:29',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
