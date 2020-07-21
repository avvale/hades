import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDetailDto 
{   
    
        @ApiProperty({
            type        : String,
            description : 'id [input here api field description]',
            example     : '4c2cdda9-73fa-4cc4-9180-394fa67710f1'
        })
        id: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'tenantId [input here api field description]',
            example     : '5ebacb23-a452-47aa-afb4-045d24c31538'
        })
        tenantId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemId [input here api field description]',
            example     : 'd51cde54-0e5b-4ad7-bc61-33ab44931585'
        })
        systemId: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'systemName [input here api field description]',
            example     : 'dmgox5qb8tdlud0z1asq'
        })
        systemName: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionId [input here api field description]',
            example     : '28324a33-9d00-48d1-aaa6-2758a7c1bbe7'
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
            example     : '2020-07-21 03:42:29'
        })
        executionExecutedAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringStartAt [input here api field description]',
            example     : '2020-07-21 06:30:19'
        })
        executionMonitoringStartAt: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'executionMonitoringEndAt [input here api field description]',
            example     : '2020-07-21 23:14:13'
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
            example     : 'qylgp5euc3xg9uanyzl4fdaeavg79uo4y7zuui9djx8l8fu2nkgi2o6ypxlckznn3j4s6v4svpxnkn27qcd1ow5evcayvo7vpvlsctynkfk6minl6brz8jre3n7uvkqxctupke4yqtbpt0cq74i7czjh2vckmygt7eeztljz1t081qbvdza0c9q3o9z2p1b5yr2vnwv66lj67doqmfrydiamrqxlsxbnzx0ghp2plc2tw96lfa4s64bnnp4u370'
        })
        name: string;
    
    
    
        @ApiProperty({
            type        : Number,
            description : 'returnCode [input here api field description]',
            example     : 5588557883
        })
        returnCode: number;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'node [input here api field description]',
            example     : 'a0gurm1na0vqbtjwc3ayd0y85jw7godlk62z13neuudl3phnvk9z8zcxk9q8mf3h4xea2rlevdoi9j6gh19ffe0i894zl726luvqw0uypd5bmghbcu5v2p7f7p67xobmxzh4uqujzwjn2zstpm02jn3elheb3wcw'
        })
        node: string;
    
    
    
        @ApiProperty({
            type        : String,
            description : 'user [input here api field description]',
            example     : 'al8ugfq2dws3grnv4jqqic6rtnl1nzjm52owwah16jrh3hgnr1mdo2b1b348qjjjnknjnna1mfkhblbr9cqyxt9k4mtyuudjo9o0sic95x7a1x2kzzivzkwuqgm2w7nm2dn7nnqgx6szj8zjpdkkoi6nfjvticg16oqmlmlfytresvibezyrss5qruncijtwyjygqzg6n2w9ua4orbuaodeopsn5qr0l2d5eg207kq34s875ofvftxoee4l0jg8'
        })
        user: string;
    
    
}
