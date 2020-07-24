import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'cf1d6cec-d3e4-438a-83da-85f227b926a2'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '63057f90-6417-48c7-9f84-ad4b31a24016'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'zgsjref4ey2a1q4n5q6nimykrww6v30ey5ve8ln2916i3sjkan'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'fb6619c2-4d78-4ead-816f-114408664c3d'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '5sn5lacd0n3gj674pqb4'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '5d83469b-5723-4df0-9a0d-7103b62e40f0'
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : ['SUMMARY','DETAIL']
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-24 02:53:13'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-24 13:13:55'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-23 20:02:26'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['CANCELLED','COMPLETED','ERROR']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '09m1km7gtn1osaplmsqx9tun8yu3fbsypgqi291hug8kvy8gw9dpslfy0if5d9b5v0bwy5u1emtlkd26eu5w0pah66sevy7m2dnns6ev77decmuqsqx3lmezfytomns1az4anh9rnv0doxf6jjipoophr6yle77rihdpu791wqq5li1s8o74ph0d4vahbl5v7u62qnhzvb4m11e0gkht5pqyxzyidosidtqakf24cdgadae6s7t9oc0wbu8tubo'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 8778545635
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'f5nn1ekjc0wwc3ezean8dzf69xbcfo1k8b17a9dcczxr8asao0xkm9t74k069hk54fvctsrwhop516r7qicj26wz0aodjqf5x7qmp0eaxw12g44l9ey4vi4ctjyqlhcincf0rb8ctakubnu9zpc0l5lxos4kqa4c'
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'chgfh8by6cglhpf7b2n2y5b6qvineu93l7xzmcygijgdj5xheqxdzcyxk652e4q113nxsxxcm5tgkzsn7d23apk69hia5ta16nolhivzrw521xwyx8kspx01x747dfzl17o0cujrw2q430n58onjtzdopa126882hbqlka9dva0bi847k5100vtq7cqdp872cg85tpwkthtt8trl83b9jwmfgvf6ajwm7v386uyagrqtcpdgudf1y28cm04xutj'
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startAt [input here api field description]',
        example     : '2020-07-23 22:14:43'
    })
    startAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'endAt [input here api field description]',
        example     : '2020-07-23 22:42:13'
    })
    endAt: string;
    
    
}
