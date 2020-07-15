import { ApiProperty } from '@nestjs/swagger';

export class JobDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6cb9ea29-9d2a-41b9-b3d4-0e6e6daae1ea',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '93280fac-34d0-4f7e-8447-8e6314664cf0',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '7df7f500-6d68-4fe8-861a-22d7314d2562',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'k9i0ebu4e9gzgahx6r9u',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'eccd75df-265a-4cf6-8f6a-57eec5ab1cef',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionType [input here api field description]',
        example     : 'SUMMARY',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionExecutedAt [input here api field description]',
        example     : '2020-07-15 05:20:31',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-14 21:09:04',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-14 20:08:59',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'COMPLETED',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'vtowx17fjy37h1slysppxpxgprm892pmv5b9e9pyxi6oho4x0thtjc7dfkiwrgddrjab8rpes76wsouwekmeswe2vctbjgrlep0nubpyirnj1ldhbu0rx6uc04zbe124y7jg7ft7j3x15i90t5owgf3y909r63sncmvrnc6j2na3ij4yubptpw8pi2iveas6bzrnet86tb9d6geju768m5tgeu9wofhj174xxs0ys5yu9esaj9fqspidj2pe99f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'returnCode [input here api field description]',
        example     : 1216993734,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    returnCode: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'node [input here api field description]',
        example     : '6cn432pcp4t8uqavfenn5ar7ffs4uj1k107o3m667rxwnf4ifrinksjfk5dzjgwurguqv108fnl51zvg5ctbjfexdpxqgq4y86zg69ccpwq1fygkt4k8r9fkbr4njj366ticlypt8l0cvqg6vfe54q7288zjbodh',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    node: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'user [input here api field description]',
        example     : 'g1v1welkmygxoxmjfcerkg44nc2lxnkyu9wefwoz5oe3flr555ysq9b9csqa21liszjtxrpyj9yhj9nvcx4khc18fyxehr2pse8zj50hb0e3081a5ojyfsn4w9cmdmcsv4campgaya60z54re4f8s4lh3edab85frpboiyzdg2heamroqqou17ogj927hds5gdu8artbkctcadi3c4rpefujc3wqijvl3aduv0lwmgggarjsm8v9iry6yx6hu0f',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    user: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-15 00:24:59',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-15 04:05:37',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-15 08:10:37',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
