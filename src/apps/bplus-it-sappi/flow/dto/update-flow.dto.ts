import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '1e830191-6cc4-4500-8bc5-1390347b5b98'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'fd68f554-6eed-4217-970f-0bfc51a4c4a7'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '13nd1gkb6wcfv59d6jgakwrtzx3tq42hkitymrxk927fhowaha'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '5b2b50b0-ecb4-4fba-b688-b086e9d66d2c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ibrbhe12tfb0clb84u6i'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '1v5f77wqrwk4imgnwnuc'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'ilxwfiw9zgzx98be6onnzg4o78ikwzi8c4a6prwfhlw8p78x7n0rg33itbij'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'txku8au1cniapq38gso9xrc97qpq7z9hnl2aexa3a1gs1gt6and5dsdott7u4x9g186f85qghjcr1cqsl912qs0nkwvnu8rdq0060tqde2c5sd2vyd0qbzk89ps01muh2q71blg8onkg9t8oo32m9lf6rtw1shcm'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '2qtkoovjxlmswkj465u30cfvf8jftty5w39e2nzhaw2dxb3zn79q3trx77dhe0qhsucd96zn7qa3z2q5cgot5cd8ysd7buru9i7oqqsghxzvtay8eqw1i40ypbuehf0uar2luhlnn4ase2yl02z5weln1gxpboaq'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'h8olsnwunufiugx94jglkxz7r2l60u2u1qtbhpet3carqpz76qbgnbpztcc46mi98kogn4kx4lyu2qpvbtqs42jc0udehkb091u7porpl38qo4ebc20lp9y6llpzlyqo0zfjgqp0lfz4w6wnqpunwiuu4vy4lshy'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'miqoxwvyz4cgpqk4u0igti76temf5kxl73q1pm53ljvcra4wh2qzdwebna9umgdo8k8ggmq80vnom99stj1s4ihipuiwc2wmh68hkymh42ad3rio4i2lm25v4nnk2zqunn5adat7j6hatci2xufdgmfk97qh2e93'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'q2hhsas0n7rpaucoxslnl8dyilrcpheeeerimkyscqrgtxwteuxb2rrvp637su2oumqaq6omp9w5y2rjbe1vkuj6mcj1emri2y9qws21mg2uui0ffw9oinw32swgdxkummpvaad0t3k1sb8163w4ys7wylowhd8h'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : '5l2dfeakmi217g086ewy'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'u09qjyo5c0jkgjxo00c8'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-28 06:20:11'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '1nmxgo4g217jp86e9m2kotei8eu03nw1rx689ky99m73msm5k9ow88j9b1n0q10by06a17iiaym0pbrh851gyipx5nkht0d9v9odhli6bt24kjxldw4kc6jasj12b79ubtkm6cz8y39l5g0d0mdsfgkzp7ty127ckxglvc592oe6v1bhay5tse0imc3thirw5gyhf9pnmd0to8xi2evt4u5ack4jw50bi37rvb33d5oucg6e3o9ty7979cnhc78'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'f2dqercl2r5nv7snkv5g5q9yowxdj2queugp6fnjsp0ipgbpz1nap8x7vjlp7qizd647wmsbvvpn84cnhla4eg167ic9h4v5kvh798y3v9xygek5b2w4cr35a3uoohxzepj2fli78lb6etgtxza9n5lc67v6m8axlqrl78fkt6veamk1166btw9f1wlw09pdok7hja56yxep9llkjj9q5wm4mwyahsv38x2ucg4cfnaxckxzibffpzusho6rshe'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'h0ej2052l24aiqx5lrznqprladeegvxnsopcvkf48pz4flatae9ho6cdr5fx'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : false
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '2e910aae-f108-4b9a-81f2-fdd2bfe96927'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
