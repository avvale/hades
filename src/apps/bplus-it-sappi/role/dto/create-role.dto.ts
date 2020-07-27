import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '911e426a-e32e-49d5-a827-7fcf0ba40100'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '5a020b84-7fe0-46ad-8f4f-364dca1fad6d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'bc9bjehawygd2so4rd9uewvtjg21iancebjp4t5epft1ncqlnr'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'bv275sq2ac2k0huv3d1hbhynznx1rrj6wan47200jliuy0rcvxsjwl2dyzi4h8b7btbadx9gwweexh5rhmppo6p119bljzqrpkrk1caud3eoz5ehny1khg81dw8yw09bm8fchvj1vcjys81pykm7q89vjw26wozynhp04flsy10otuv1y88la9wv698h800a9at0szlgz9pdwc5c9qmxo5kkxktqpt7sunbnn9x3lus8q6f35o73kipc8bkjwyq'
    })
    name: string;
    
    
}
