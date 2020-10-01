import { ApiProperty } from '@nestjs/swagger';

export class UpdateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '53271467-a2bf-4b82-a296-ab4602e7e26e'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '4cbf7124-b70e-45df-88d7-d9ed03f0d49d'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'accountId [input here api field description]',
        example     : '7fd135bc-bb81-425c-89fa-9ad9faa83cef'
    })
    accountId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Vero eos minus aliquid dolorem minima ullam repellat. Quidem enim voluptates in aliquid natus. Voluptatem corporis eaque harum.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'drakq0y3cv8j6ahx160ejvwaipv4na091h5e22dr9b8ps7b6ozo2bmvtqdnqvo7bqjf3xybgbrcjkv07e6bd1ezuadp0z5tns48kzwn0f0460sksdx4x2ll0oiwjoo2fgo69jci2zbov387p7edpjkupjax0pixkwvs6uzmn6totfzsij0u3trpoayfmx8vz6c0tjpjbwsj8a1c82ied2rwngxhr2cjkawaoz6x4j7vjjmx3seh3mxv1iaz9uuc'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'expiresAt [input here api field description]',
        example     : '2020-09-26 05:28:36'
    })
    expiresAt: string;
    
    
}
