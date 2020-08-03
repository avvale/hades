import { ApiProperty } from '@nestjs/swagger';

export class UpdateResourceDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'a06e9d16-bddb-4f2c-b9bd-4dab319949a8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '6418ef3e-8d2a-4555-a5a0-e1e611036456'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'n3vclmpqzfek4s9y3lg72850e60z5wmdppsmiifwbzpftw4x7wh2zj13ildvtdoo7zgee8ksa2rh8570uoojw79tk8ytog5236ig7hb1nrcwwsqtinzbh5okshv9cuf4midkt1adnlrghzc3xil3dvslpknb9zaey57ax81xxtl7pydzkg69skiseqpm96mkpwljiejczaapvlg4ewqikblx9zcidrx7rv2uvwl72cjy7k4wez6sgnslq3ydlmf'
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
