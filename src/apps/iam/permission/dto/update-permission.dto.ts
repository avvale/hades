import { ApiProperty } from '@nestjs/swagger';

export class UpdatePermissionDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '08832010-55a7-467b-866e-ab9df91d99be'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'ytj68mrik4phiwvvdppoi7sfw6gir51klk0eee71wofpt5lmqfmfx5xs9zkkq81y0mtcjtab7fxu7496aujq7cjahwbukcyy6bfxo7ri4czs0otwmj1wvnzjokzg05ref92owla19dh8ri8mmrcwriv4vra00ccns0mezyh67bioh0511p06423z3dakpyfz8dgi456vexv3q3v3y1tm1vlbkyaa7905yhk14wuiugwn4xfuigfazbk11mz7fx2'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'boundedContextId [input here api field description]',
        example     : '51d1244c-95f3-45f8-b042-cee2360ece67'
    })
    boundedContextId: string;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'roleIds [input here api field description]',
        example     : '',
    })
    roleIds: string[];
    
    
}
