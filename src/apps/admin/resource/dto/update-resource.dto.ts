import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : 'e6fca3d1-f082-45d8-acef-1dc470294220'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'boundedContextId [input here api field description]',
            example     : '8b3cb4a5-c55e-487c-a024-fc9c389fbcce'
        })
        boundedContextId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'name [input here api field description]',
            example     : '42gm700tzvlhnkwigx7sa3ac8uo3528qr267m7prlxv5fhqa23boqdx13bmqkxtulkknvd9tf4d1kh21x9k4g8sxnzsc5s38dhlxmi434sdtb4p1lpy49a5hdcsdz84s3rlptlgw85s1f9di45v8k00uhcrmp8133tsxg4vo7xxr8xblvgdmafbkzem27q4ae61s41967a8un69hofokm20cgyfrokxoga9iwa0ea1ajq8efom66p0zh05j6kba'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'hasCustomFields [input here api field description]',
            example     : false
        })
        hasCustomFields: boolean;
    
    
    
        @ApiProperty({
            type        : Boolean,
            description : 'hasAttachments [input here api field description]',
            example     : false
        })
        hasAttachments: boolean;
    
    
}
