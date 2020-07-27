import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5349d89e-a5b6-4298-b54a-c3215cb9d5d6'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '56619e63-0df1-4d91-89fb-2066f64f1414'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'rjlwjkecp03eiusweem7lxdcuf97vv2rr50skg2mzixul51td6'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'meamy47eghgrjq6uf98n6nr9twa3wwfs9g05mep7to7pm8ct2y0uabuvvse3cjur33vcgirzh6cozmomrvnb6o5akszoxjfdftk3zcnj5fpludh2zmg0a2ipla4kxqncqmzwhqc75au7kkctpfbece516bkv6hcgrhomctkvx71hidj91w3wg4mln229qkl9b0vpz4ovr1r3i6nrz9fjrbxv475ssmvgcsvhjibxfj4nr5n1rt1prhq0qckdss2'
    })
    name: string;
    
    
}
