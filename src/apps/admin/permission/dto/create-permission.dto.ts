import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '747bfcad-c6a3-4118-893e-bfc04c8b5929'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '4c99962e-9e84-4d89-bee0-08f27d46035b'
    })
    boundedContextId: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'u2imttr34mjr6c3h2bgy94fsb8mm7luslzpqcmcyn1ruv57r57l8c4zch6z9hnbmj0tferqm2qlag755l9h0yebc0co9esxty0ma66zave69aetkcul9fr63n6yoxy3lb15nx00orq083v72kgagyeznaeavneiqmpkfoe1rqd4sj3c4v8up3m5mu5j3l1yu7npyg915mmfx54aikd7p9lvvld99u7lozmthaq63p4lwh2lhjy8z4z8zc1i9184'
    })
    name: string;
    
}
