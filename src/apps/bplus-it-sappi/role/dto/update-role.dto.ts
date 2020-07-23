import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'fcd0786f-2071-4bbb-9ced-eb4238e3d895'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f1956da6-5a04-4877-8a26-0b40ceac824b'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ou0kn6npeo7qx7xsh3nahic1vzm7pvm5ktubplr51hn3iv8n9q'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'mr7qgnszoztvbh9cg26lpa8mvdlf7019sbzxt7ypbuhw2h332zsoir2of5qnnzko26prxi072f5kyqk62g62uhjcttiuj6y1878uiqckcxtcv61nordc69l8bbcs981fm11tfym6e5vni63rtauelbq8pi5cf251nz53asqte6nekvpvc65cr6onzso4c3z2fl42et61zw0kz6imh70vxnpvwzns800za6elxffra6gkid47232gjjlgj9vzj1i'
    })
    name: string;
    
    
}
