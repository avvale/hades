import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDetailDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2578dbe8-3df6-4b7e-bfbf-225390315594'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0e791533-1e01-450d-bb1a-5e9a2a315752'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'j195o7lumyvao6bz0urmqq4xmxmu71irf1btwe1tsxy1ui9k9o'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '51f2e58d-0ee3-4172-8cd4-0e91841bfabc'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'zsnaeipxrjbx5x5ovo1o'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '4rlbllae5dla628pk4f32uuh7n58v3bt647d9kd9cdvcjrhrovsgemr06krr'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionId [input here api field description]',
        example     : 'a25fa511-8c1e-40ed-a971-073595a75a4f'
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
        example     : '2020-07-29 08:35:02'
    })
    executionExecutedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringStartAt [input here api field description]',
        example     : '2020-07-28 17:54:36'
    })
    executionMonitoringStartAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'executionMonitoringEndAt [input here api field description]',
        example     : '2020-07-29 14:38:14'
    })
    executionMonitoringEndAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'db5z1rbj70dnxdddya9anqr6nsv4a9gysg5eb9pd'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'bw8hexh5m9x2jibiqtrgwinb9fcrwvpbwzfcwf0z1qrb391814hng418vxid5vub9jokgpstovqghrmeh5xa6sk3hg6alr1cveily7s3lr15kcgyno77haupqobmh33afrjvrogqwbb62w9mrxpg3i1gxcbonlly'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '680u3deaaharzdzlcaeg7ks50xwpn7u59y2bex2bem3h3abr6rquzficozlo73zw9fd44yfzezpofy1advkp2hhmks7lahw1fprdtyh6w35g5erzlk535oyk493r7as4gzfjrf1ijxixsff2a5dtm9qz71s1k630'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'rwy8sv4rvpwnwl5f61y2usk382try6tjp82a67bmajh1rrlnmrtrsq7r770vu8xat78vljgymztgu5uubzfucavjhpw4vlu2cxe3zd0zqg3bldc0utkuc1p3iv8ijsnuvb9fjhrtbme4ofr8vgmjflgqc39cqtl4'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'scrdbsl1hoctw7ilhzh7tzg3mi4xtvk29v3fvoveayo246hv1ah4ote90sqhfnj5qwixatshprixv1bdgw47upbk21efpza9t7u5kh5gb9gj8nlukh4m1up2dbg1kgqbw0n867bxfgsxlpyh53aiftbn9ohhaso0'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'status [input here api field description]',
        example     : 'CANCELLED',
        enum        : ['SUCCESS','CANCELLED','DELIVERING','ERROR','HOLDING','TO_BE_DELIVERED','WAITING']
    })
    status: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'detail [input here api field description]',
        example     : 'Non consequuntur quasi aspernatur et consequatur non qui qui. Quo quasi numquam. Id fugit autem corrupti quis eligendi sint. Nostrum tenetur dignissimos est non aspernatur aut nihil.'
    })
    detail: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'example [input here api field description]',
        example     : 'jtnlpdg4oroxll2daobig73bus125fjgfaesscp8nefb0civkqt1hgdx776g1znmj44xwuo8ky2it1yjsk5y238otz7l0kp9vy2b4lbdxx22ilgol6lns3jmrc5n8fnib3h0od332eekmzqrlmu61mcd27jebali'
    })
    example: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'startTimeAt [input here api field description]',
        example     : '2020-07-29 03:31:03'
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
        example     : 'c5bnlhd0l5fmr810gtg34d43734ye3nhjko6ezg7mt7vjaray7wk6dr2y0nrp7px4njgb7lt0eh6vzwfiy1t6hxnlw15r3y0myzm7oaxgbtpz2236iciuwicpsqbadqmalzoasvu68lhe3njsr8qx0n4x5x6xo66'
    })
    errorCategory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'errorCode [input here api field description]',
        example     : 'nrsolwut03i9kwr3k0ms6y2mnrkhyqcgiss7nrgsjj02kzivds'
    })
    errorCode: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'errorLabel [input here api field description]',
        example     : 253367
    })
    errorLabel: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'node [input here api field description]',
        example     : 1995634254
    })
    node: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'protocol [input here api field description]',
        example     : 'ryzqi5wde8qxcff5owmr'
    })
    protocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'qualityOfService [input here api field description]',
        example     : '9wv9xqk83ahzmtk96c83'
    })
    qualityOfService: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '7shv75l1e1s0bxiyc684cqd0afw2ow2wu8euft73w5d7go5vlg023wffhr6xyozbbw2szlw0o4ccodt2zlczvr3mfm9t84j9zz3kmu9jqgj656olflayqluhfz3luczprkvp0khwnipuh9wuj840ac47x336yah2'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'ru4dqx6cfxmb0n7er2s1s8gnoonhhzf5dbtdt9u4toh5bikx6ot9uos47st0mqnzf5uckut84ffjvt1dfh9ex53cnr55s8fanzue7dhfgmuwnzlzy2p2by2ubznrwf9qh0mnt7bj0z0elwzgl9j4jslsyc0rrelq'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterface [input here api field description]',
        example     : '13koqzpj4lr1rw8lxbpfgwl9i3uceyddfid9312d2eoj556smx1rmxpneon3gw9p7up30685mvo09lbf08ooqvl0oa8w1vyy7cwhcgulcmqkz50kot0g2y2lh7wphv90ys5r616642hixx2abaoq1qg0qqgnk0x0'
    })
    receiverInterface: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverInterfaceNamespace [input here api field description]',
        example     : '1akkf822jvbj85r1t16gvtackrfclcunrnx8c7v7034vhcraguw4mgz2jk3d0i8nzzjxd4cgevjj4uycj3pyk7l3g7ikdpdue9twhx5a30p7e7z58mliaw2uk1ey5xjxi22fmgirpt36rscmilrxbmtmaikm0m8g'
    })
    receiverInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'retries [input here api field description]',
        example     : 3952649059
    })
    retries: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'size [input here api field description]',
        example     : 6567925617
    })
    size: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'timesFailed [input here api field description]',
        example     : 1220639367
    })
    timesFailed: number;
    
    
}
