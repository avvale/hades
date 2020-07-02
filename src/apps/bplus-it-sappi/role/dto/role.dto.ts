import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ff8cb54d-0a91-475c-b0e5-1991a725d1da',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a35fedca-15dc-422a-9a50-029d18c9764b',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '0jcda7fr2evv6vwsstrl76u2pxwwn4qbltrnkrqt07sp23ocllhmwo4w90nm6hcdx6o0f3n79hr0hoz1i6dmn5onxbrp7mo8b8zq6kl8x4o30zq7seul1ciw3k8bzagxli2h06iylavxpve5jgm79v981raysji7o83m6pi8af0fqhpx97n2nfx19epwn1waxheolunp6i30jzj8yulblndhfybm9rsyekjc3xrnmuxawg6gmp0kbobowt6jymk',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-01 15:29:01',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-01 20:48:18',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-01 15:48:38',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
