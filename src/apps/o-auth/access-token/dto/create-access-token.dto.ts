import { ApiProperty } from '@nestjs/swagger';

export class CreateAccessTokenDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cc9fb6ca-b741-42f4-8511-9b4058fb6c38'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'clientId [input here api field description]',
        example     : '7cd4ed81-8c63-4b05-8efa-3e45aa4d9dc6'
    })
    clientId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'token [input here api field description]',
        example     : 'Minima aliquid quia sequi. Alias optio aperiam architecto quo optio. Explicabo accusantium eum et perspiciatis. Omnis dolores vitae quibusdam dolorem ab. Esse voluptatum similique magnam quia expedita iure qui omnis.'
    })
    token: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'hrfpadktcisj1ijfexms322sx7rt3vp65jfpivmxkoe26ixgngkybm6r4vntq4oh96c5x6b2burbutj9ffdp5dp12mpzi0l3bk0kzrh1h648edekntljxbj32mxabfv5mgioagvpv8ugdmej86bs88on1f5ubd7k9ovlvpakek8ez89wlkwpu26bo2vmouvm0t0imu171ppe3ukiew909727r3eaygzh977yxb4smp45wq5k36358m644wptiix'
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
        example     : '2020-09-20 13:34:55'
    })
    expiresAt: string;
    
    
}
