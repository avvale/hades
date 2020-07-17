import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '512eec74-36a4-4324-a26a-96bd902670ab',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '15c9bcab-3822-4a69-b928-d9f745220fc5',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'edd58579-abe9-4ac4-8cec-4e551419a73d',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'orlztrgexx6wgai89lgs',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'ef3e40dc-941c-4477-8f92-602475764ab6',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'DETAIL',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-17 03:34:59',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 23:33:19',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-16 16:58:31',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '8gmlq55levk1ob1b6413e7wtx09321skbp17z6168yu0z9lesdia3p6a49irwbto9bfkiwqtvd0dihyhxn6eeonjp0kvj59bc2nd1fcn86a65kxa20g8jkz66sl0duh2mh3l5ilb856s1vt7f1nvjvyr8t627b04jrpehuw85rf2hu19rvbz1vljqq3gdwex8098dejtbd7zb7zqfzc81umjq2xvka7t5ut1vfkx1v4jtm6wd2iqji3e1rjym8w',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 8998723714,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : 'nevv7ocyogvvcea0wue6z57ashkd57zzku93kqud78pc56rk1rmamvm27dvjgzprkc0iebhq4p1un8rhvk95l1njtxz5036z4grvsb1hdoekpb0868zdchvn7kql8h99wsrcwx89zion0pbstqt2pt5ww7ev8pis',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'ufj3sklunwkfyv1sxtb2xo4zfyytidgg7kyyv8g5skebow98h9621nqjx1pc1jqa2w0ezcwddykvh4nwyxrp99k8wrw87mc39pwol768echcuw65oam58xfd238f0fg8mezpifuuime21ls4zz3rlh5f8k5i2ydnf4kewdsdiwfg2csvhrwn3waal06j35m6m954uhftie37u7pizgjyyq2htk1r9xhuqf9g1fyk399n9fm02zavxia64rvcq6y',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-17 01:43:27',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-16 22:38:55',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-17 14:21:02',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
