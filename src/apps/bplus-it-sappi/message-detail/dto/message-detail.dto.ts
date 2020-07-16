import { ApiProperty } from '@nestjs/swagger';

export class MessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '958b0f58-f437-4ca5-85e7-fd3b52a3dbad',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '91c5b5b2-4760-4fb1-b38d-a11055359f65',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '0c00fe31-8298-4a9d-bcad-c8a21d71f595',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'd8vvqlv6aqryr8urec31',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'gfgh7bn866xttn0zjmi5ffshyeitw88jmb4g4zuewpiurzi4bz1bhhfh9zug',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : '0fcb3034-69db-4bef-ac3c-ccc0538650ac',
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
        example     : '2020-07-15 20:38:44',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-16 17:12:34',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-15 20:07:53',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '4f0fe1aa-8720-43a8-ae8c-9b8a5a8c0247',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'yxgmr2bt3kti3lspw5bzgtjqy1pmbafhtgpcdq6f658xqksdhn1g1bhta8vmz8f37ei0fbcgi6sl1rupfmoqzqzvw3rt4unpeurm3elw3r0rn27w0orskx8ylpapidwbbdus7jvorbc97x7k9obzp6vsy044b8ab',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'gp3fti3xg89y47nwzwsyhyfwb5inytinwnz1qkuysf2fpgu339vjik0665ve2cxxnvecqaoiv9mxsbp8khj9oowaj30u503vmagklyozmti6itbchrbd3p5er7yhtn9e5hyh5lelhf47dvo9gfktxpoosa0avksd',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '5t396zusp1ypfxbegpaevdpj4rlhsffwqr7xe0za0b7rlimeo9d5s8tthx71vpntwwxbe9l37iucmfsvpan6vilrfs5lrx2rl09y22zhrqa7exovawhjlvxhkyfnkpedbyus42j4fn8dynhj4p6v601288hc8ldu',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'z15u3l1adthzalwujqrwdxfzt1szqinlzrlcjeo2c0jkpgg9r8czo2m2o7koiuz585slfx01nvxoztx9669bx8v55v2ikqnr3ogj8rkr2ew36lxifiyxvtkf9mw1313ldtbfvvkk883jr11auwr4t15lk0gfc1yb',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'HOLDING',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Voluptatem et blanditiis fugit. Quaerat eum id rem. Autem ullam sint est. Debitis voluptatem iusto omnis non. Debitis inventore nemo ducimus consequatur aliquid.',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'ew7z0vjnb8vxq0af0k3n65mzs7mo4qen03ahfnqzd6qxpdmhcejf39avoga37q4ve494gkildva7dhopvgxo6mvx8gbwevhtlv8duqdafw7mgaq5psfh96ec5o2qeagdetvno32y5g5r4s5obbrvx5l5jvkmzah5',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-15 21:10:32',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    startTimeAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'fd72w5gnrcpci9ykmw78',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCategory [input here api field description]',
        example     : '8m7cxe3r9pq48zkso536y8o516dsqdras598o9lk1v3rjn6icto5qcqjeb14zled5jxfokbaul87uk3tbt1mco9lyas7jxwkj82wb9vxv04x3raikiamk5r28612tbgltgytf75ta4c87mluvt6kzxaolrf8880b',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'mzl1fl51ix0wy64k43bf',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorLabel [input here api field description]',
        example     : 'p7d7pqa7vckz5ez6j43y151vzw1450mdpkj4swfmk6fi84kg9a3g3yxhyvmv613ra5xw8ncc8rvtlukv9crwyqkkqm6e15fobiah7sqvw3qgl3veeuodtrx7ditmfsvbv8i4omxtz1cjdotjrdafqmdfd1mx1xxe',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    errorLabel: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 9787427272,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : '0pgv1rz1hkiat2j0nb1v',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : 'y3zvp0as9lui71x2cea8',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : 'lvl7v6eqa661ewlujysyuchklspkme9imv6w44f6i6h53438p5yle0zusx1k5f7pdnzedy42d0msd2anc1x63oh39jjsf8ncmnykmdm77zr855l5lmbbpm5mojzj4hcxrcf6hf4r5v267q4b581zjputuopfj2te',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : '5w8kmaqfopbsmdr654r2te7r4omyhx6ycu071ar4cdkpudjbc4iun0essp0qcuslln5we02d9ljnekajwfhfof854vtfxvg32mtaga72z7lefmvs445tlr37toml035euzpjtwtjcn1xx7mbn7cz3mu9ka8k0ea8',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : 'kwncmu1uft0cp4f3vl0k5gahwgvl9jc5wi3s74qj62akmxg5dql4t99looxywsp1btvfmsabcipxm1402wq2jnjko3nomtjaykes4xq0rpp9cjjuvfyqltfralo9ggm16izpmbpjt1756txlr6getysfsye9v2gq',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '83a8f8zx1z29qn4oy21jqr3knft09dg68jwdy96nv7f2q2lhzabeyo2pd0xzahw6ym3b5dujh4eo7z8hgf1zjh7aqn1fj247u3q6zq5nr5oun5icimh7mjgpfhyhsdkcursm1ud1qct4jz9m9uy3grav4amupiar',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 5219287142,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 1800771989,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 7082222445,
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    timesFailed: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-15 19:36:12',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-16 07:00:18',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-16 10:42:10',
        enum        : [this.enumOptions?.map(item => '\'' + item + '\'').join()]
    })
    deletedAt: string;
    
    
}
