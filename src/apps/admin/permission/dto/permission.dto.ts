import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fd846731-17e0-41fd-91d3-ef3d4dc1003e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '54c076d7-bfae-4a64-820c-2e916b9061c4'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'q08paj0mtv4hc6epb8w32xybzrycvabi7zyih6q81lyv5vkj4q1wvptdcgg26hm1p0lb8gz4bv3ak5t3pfsbnxl3ciba540xijirrg6mequoyw9akhofm22pynbgwyndtm4klrto7dz19d3czwc48cfk5916q9vq58jkl6ufpn4mqbw1jiuxtzgvuvw4ionaflp6boq455l4ozaj61ju0f14idpnx5k777uboovvq5s5x5c3n5ly06ybrslwxnb'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-23 02:33:52'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-23 17:46:44'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-23 11:07:26'
    })
    deletedAt: string;
    
    
}
