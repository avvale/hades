import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '79de2087-0846-47b4-b4b9-5182a572d36c'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0e9597ee-8163-4e47-a8f1-7d1c2ea2f0b9'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'k8o6r6xjjsqg7r6uak9g5j2jmcgnk67ef4d1yqw8q82psmnq4w'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '0c8af42b-fc59-4d94-8b23-21249b593a96'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '6ol6c0b0pej3hk246rud'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'clvw141tf6b4636buysvfkkzq12kmed43gkj0tk2mmqh4hzqv5am3l8gfhy3'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '18891c63-0400-4f46-8189-1bca175e4527'
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
        example     : '2020-07-26 19:47:23'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-27 06:59:39'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-27 01:43:24'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '69475263-2068-4745-a249-c0e37746e355'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'ntvgp69dd0dpolgfbsrj9kh1kjsd2r87ndmhogs26oma6gg6mq9t27r768tmtcl162q6yy9sedzxhkdqlxjtegcjs3ebte9y0yrr4v13ljovw7xf5vnwhre4mpep7acplgt1m9oiamn7pjs315vh2esyrbexxl3l'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'qo8tbxg6903ixoo4bjc8177uneqvxxo9b59bcw1n6hebv7h4dbou1nfft743udtvy0oxdnmr8ddo062pe7zhs3d4fatp6mv52fllmzgot7giqtcuxwhwu5c5jj2681wsq9o3mmk8o8tekhyk97c8e584q67k9os9'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'lcb4ybfuzx0ei8dp1w65cx98qj9utbr1z3rd5657nc76phx5z6mk0cqagcmwc08ip13ch1bfu3nv9rox6tlk9976x5c6o9mvyllfcgqlgmczwzswl087enwrgkilo855nna0mjww6xl3yamaak65htf7imwk4csi'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'wz7nn31e4ayl5m2b0lemyp61lujryoll1oz8fe3g1eaz5fyk9vm634imoczpl6ucinn6l3cgsy0603xugevgzww46typebmkh46nva97gbs6e0cv8ue4xmmzdt4fwow8iaip6gcgvrdftz4d8fcqzfgs811y95ri'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'WAITING',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Sit quos rerum. Assumenda ea fugiat harum assumenda recusandae. Dolor excepturi sit qui sapiente optio sunt.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'zvz6rij8pmpei7tu8xm2h2vn8isd89nvrm7mvleu3tnykm30xq4t7qwm7q7ihwmcpfj5zrds14wxcft5tkdr7fj13xjp2ni0fmu3uc9ckaobq9ao0tvjr2w4cnmuaoholjjg6hgake2ki5tgmlfp686mv0107hhi'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-27 06:51:10'
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'OUTBOUND',
        enum        : ['INBOUND','OUTBOUND']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : 'jrsn5zeu83cdvyw0nlmxvw467yh288ad00bwrru8gg73goluc8wtld0plkkjvds6q9d3zqegjnhsvyl4jpfaenrrw82zrex8tldpusw306a7o6ouqyw9y8je97lzumtbnt5r8frw6cpvprjfn8nx4ky6udzeh1n0'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'bqomhg4ubyqncmcbpzrp'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 329823
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 4057579293
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'wrbmvuo00osswkyma7m6'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'i98jp4im3eofv77ljw1v'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'djpjj5zalq2o2k77cznyvusn1phxo1zrjogjzrjbatb6v5o853wxp0n4e9673lh06h97u63xb5pcc77thoh9yn6kd93vhmq5vmxqmordvhxaf66umdmz6y5mmx174guyghr12kh98p2vt4q17c4wocbpazu1ke6e'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'fksht7mdgtd4reivnhjhkolq6plbu2ojmapnf5vy7imssr6dwpznfavmpiyghfdtz3siddp6ckfp5q2nrakzdpmc11je27jkiiuu7imbxizs4afckw5m636quzlrzq7ppdjr33apbiy9861x92qge85q9vy3o26o'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '0lqn20viad8ihm7s4hmi5zmwpk1967ou4vvtn96srwtzw6f71tq8qk7pvikxvq512w08vvoa0hyt7vz1ktfnud9f8tei93qik5j5pkvmaikxwtr5h9brf3f8ubg4nf0vc5pgg3remmgmuswk7ogx73v96rynpf2m'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : 'drqcfoe8115j6tnqpfaoj9hf168bdwfetcix0xu07kd8yv3v9weksythudk73f68cspiyt0q7e12zpghzr2y46l3nloe0z0y6quok9g7dqode8d4w729qbmkw0t3yw7o9ngzrczmeogm0n4qmrrqw0e7tz7bvzgc'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 2097194111
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 2667614532
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 8756270652
    })
    timesFailed: number;
    
    
}
