import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from './../../../o-auth/client/dto/client.dto';    

export class ApplicationDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5e094583-3e92-4ef7-9513-cfbc7bc989d8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'zpyxiq6hdpi2eqfe9sb7380kcw711lvscnrc4dzliehv2as1xayvuooxcqhbfz9z8yau87a4pzacsu9m2dk6kgakpn6tgduumjahzpdrjdm3rwi3lvinhmu1lzzn98x4idvp9uobcf6nvh2aytpj21yu04xn44i4wiex5rfb7sylpc7hhqa6bqpmj5rhcjdaqrl11lc511qyx0gyptc2mur32usbqebi53r72y5whtghuksc04chzwfsat30dio'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'code [input here api field description]',
        example     : 'za88frntospwk80h6g4w9ur5r0w5bgejy9o7zgp7hth8brr03l'
    })
    code: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : '0lnuz93vv02toxiqfxywx1nfqonhg2ytl03s9hl3v3atgw5845z2wkop2sjrpmkvzbq40cyhugwp111bjfycamv6bf'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : true
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [ClientDto],
        description : 'clientIds [input here api field description]',
        example     : '',
    })
    clients: ClientDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-15 23:09:59'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-16 06:32:46'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-16 11:28:10'
    })
    deletedAt: string;
    
    
}
