import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'ea584da1-fcab-4a2c-ac84-b97f5dbb1a7f'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '3fca77d2-9de7-412d-a364-ae3163b0a36f'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ljua16qf2ezalbzwhbw67qbm6jp8615oboapdk4p78ufkobepo'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '5u7bzzgtf2ly33y9ogt7kg62oj69vflqw6xdgsquzv9kvvngjk4vkka1oakn3dl46y221c8mombdkusoz7h4ie2rihdro8u9cgnqucks5ct0rmfwiv5jjf0oxb5my3131xc4i2mxco4ohcv6bjpwiz90p6cvqg3vv9p2n3fvg4z2w62vobh4s9fz688og81biipwmgaeg01gmkuvoc0kzk5nkxvfzvpo91dfa647q5khbpdc7tuoo8dwp6aqqwe'
    })
    name: string;
    
    
}
