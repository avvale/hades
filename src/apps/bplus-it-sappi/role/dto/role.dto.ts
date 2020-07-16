import { ApiProperty } from '@nestjs/swagger';

export class RoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd247bdf1-4cb9-4e35-be80-5a4bb5acbe62',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '28186aed-f2d9-4ca6-870c-36d994e0fd6e',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'bkjzct4csjhc7pltfde4iruigz5lji707kxfvm5mkxps131hoz29rdxao9yt0m36ici96723l6jmrxu9a9ro1p04xhzg2yz2g8u68xuktef96gnhhept5vnqkzbqtakr0w0g0use3hf65o3pb8y2ebazbbhl2f4l0wal2aais4bh67j0ksj6thzdc6eptrfy6n5p3qsakmm75axxonur9c2pxdy7g3gkdu8q6njs1sztngfr1yrqagggv9cy212',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-16 04:49:53',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-16 03:11:06',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 11:47:57',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
