import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '24af86f1-ca66-463e-9ec3-225a479de7b4'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '85be8694-947e-4a9e-b932-5efd98d56480'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '0akxs166pzlofppdki84cs6hw6a9eang1r59y6s3yp61otqr1z'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a41580c4-2f5a-47ce-8ab1-6a7584b4f5f8'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'piu2td9x816agts4d9yw'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '452508ad-9976-4bc0-9ae8-266fcf4f626c'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-27 13:05:09'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-26 22:31:47'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 15:03:18'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'ERROR',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'niobxy7etxh3y977x7xffzgzla8r3wiy9jvyddkms8t5ce88deukixusi8vtlvqjl1xtn2hkoihbue5fdg7ifua9z11yezzsfywhbgf5z8gesjivjtb00i97j8hsmqaf3v63i1b4tq5sp1dpj4ux7qnucdkm7pcw9681mhjkpo4kofma78wnfhv56l3xfh99zdstcf44z7uhzgxe489jdjitgmm29v0f0fvgnhy00h5zvlrvjtzzm6xfllnn0vq'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 2565601336
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'j0g449akbo2559hhkhsle2m8vm71cwyz2miu4pc3rr47t9otc8zzcz54vqe7d6zl7o4203m3igl3w4rws0t7v9wis4i806c4arel2r9bhc0oclh3cla8e5k8pi8dkzle9ytu2b22qz4d7gaonnyxsc9wm8o2hldt'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : '664i22wsoexhazypdgslavfa0hqpbk4xmr259lbl8v009bavd8bcl36m8zh1z4gvril4wu7mmi7x0hqn9lpvlmfzmrda3jwmrlfx2fr2lo2qcizjv57gocwtkc5m1vjvb61b8mbzdp2mu2l6koizemxv8xf8f0qxfz9nmb456qb05cqth85paru6g9vuryf3akv47si4o8q37kfmxef979db8ffiow2y8pjq0x164qbhdhrd4hxeiuo7cijegal'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-27 15:29:11'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-26 23:08:33'
    })
    endAt: string;
    
    
}
