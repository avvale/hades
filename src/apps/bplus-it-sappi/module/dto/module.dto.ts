import { ApiProperty } from '@nestjs/swagger';

export class ModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'd2767e8b-a3de-4774-8788-ccc0a2a9ad92'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'b08ec51e-9e2e-42ff-96ff-4f40fec749dc'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'rd3f5hv8gqhq1qobwda9796tmotx36kwv3xhs2m4kxlnqnpewy'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '50db5d90-c493-4048-b1fd-b1bde7661c2a'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'po3xo9mjnimwvh5kotfp'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '59b725bd-7211-4e2d-a647-4124093e3fa7'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '9yzuvmlhmj9j5n0csrdgvxzvm0t2tjom3v6kglg4f7sb5bnh028vanbkkp48l908ytjltvpqagly994lomiy8tem7q0bg0zkspv0e4oq6t1wet1rpun1pwa7x7b8felj0rjzqzdhlbxaif0did70k9sby7n6366s'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '351qbipdzcj90quumlomf6ieys89ad46s4byled3rdxg4urw9q7wa23aek8t4dynssl60rio1om4zb7wpfkj9imrxori7ahibuhmgawkuv957tduzvjjy1aua2k1h48s9ggfvbiewb5qouspw0fanll63oyaxnmj'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 't4rqt9v2q0d2q2oopk5rapw3syoklu0sb7thno01m237z1sgbwqah32c55i2l52qms399c0byjat4yhn542z8litia40kd61tmq3dry8jf51jakue99nuavqm3sr0q9qvf9sv7659fx5flkbvdzy5a47zcmikm1v'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '3c16aeb8-a80b-4ed3-83d0-898972931676'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'cm3ldibyqbjrv8po6ke9cff3fjtouvxalb6j6fl377bsqs7fn81tcpv3q3940xnigmpjlqypcgyqgwonwf2t2fuiwd13uftqdgd6yo1vj4tghw88d7smaaks6ysn2r9x448qfr1tgncy2ia3vjavmlcxfo8rhmc4'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'co3eynnu8juq1dwzebi6vtm2h8awnyh47s90axfp49yplk3o5ag6yybd0ybl9vqqamlgov7inytkrysgrmbr502p9jbjj6q9s5xcewa3btdu2x3ovft3bytqq0qle1coy5p5gwwcde83pi7jd3ggmp3a47xa2cda'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 's9enukfk8e5u6srrd6lrbvs5tn2ks11prj9xcnucsbeq3n9zb5bazneih3ucgc88bh1noj9n6012jmtx0lers5q1izefu9du3an2pu8f3zdim0hxyjjr8i3dk5b3ds811fjojsbkn6ocpi1lzdjz30apqjpf7trd'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'mvz89n3q1dtx52r1gscks46za5jseb53wyc43hfpqnvfkastbdteqi1xkf7vvgflt6rd6mys4ksbrsuscbmrtutk5rr07nyfgh3tuvs6cf9mv5xf3v4wolun5wx51rqxmd01hy2u1gpp4y667j5txg94daf98twp'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'aqsz825f1twfv9wxc0lu'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'xkury041yr7mlc176cmgc5gwjnlb9hq1pp2d38a49hm5jlq5d62gf5v6s4p0zn0yehs6dk0882tdsopfjc5w2jhq1m94bxacuymhhovybocge69i41h11ny3673na8fyzvntdb6x4k5cktnoshu236z9t4kq22nuyfj9398mjf4d7x1wzyw5cls1pljhzq0w8gg9e8sfv9pnhs4121qluqlwlrhm2fj12qfaeb61a9nncrg07j3s3johjmxa5dg'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'rzakpzqfm5oef5281cekz9naasa4cidp4gumud70wp3xh41321zvwhu23e2m1ksp8ke1nn4edek6gg8echnveudaqun543dsbm4yvsgxtbl70gt2jq045cyhbmuff9iig78pyxupbh2jj3o3nj1vkrmhojhgvyp5h5j96dv9nvxv8cvi2v26a903gjremyslo84i1lsrvie0w6u2lczjs1uemjfyx6v1mcy2a5cuef3u3ob1rghdarbkcp8z2etp4w01sxdsudzjii7z9sj6krycevanftqjzhuentvbirn4uv7yj0v1bl2s9aclb91w'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'bz94zunpw5581r7rzzav1y8v48gd4k4w83b8rtpssphcscd2cj73kzgtjitfp6id8ulj7jortcfbr1ncpwuii50xw26vz9wcgooeuysipw4nt14172mvymbllrjuioabvqkwqn3pt2kvezxm0akfti17c8dzv6dghr1yhofmewzb75gnane1emqqifiraajgdbx18mpzda0htlzv3le5awtbg81y3mjp57oxeikanns44z6iwjeute5badfv8syqzyj2uuv5b92s8an44qg4kqu75m1zh1g93m0f8a48bex9gesupr2jrabxp4i4442c'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'oxri5y0j3r4ktsuwdyszsgbnkbvq1mhroe00zlbemtdwvefu15qi6fxrsr2b4r100hpgsgb4n9pfvonzqbl7jsmg2g3kwkc2yivjr0k8fmix30tlk7i0537ogvi6wj0qjq230o2y1frhzzaglvpft0tptlxg4w9l044t5q86xgvq7rs497nrx5gij0su36qxoq48a277jvtb6rucm7mwfn5etthf6z8w2dm651jbz3dd3r4po2ceqk70ip0y0nndb5jvd3yi9hlclcnabfpan2amfwqeusx80gtfn10sx8h5zd0ic1dkvkh165gypdi4khft8oi9dotw8ae83qlgrese6byma3gi8wra5j0u1e09d7v4v8cscj1at4igm0h22b7zp5rto79gs7l973am25vdq7m3mlw0yxp8oh7zzjjebzyuy4yp03rzq0fmmcr497ofkfrytsr4zeawewn762ftdksg63q9m37y1huvkkfcr77hz4a9e6sbuvv4s8qvm7oyo0b0sl17dcpfh0svk4bw7rf9gsdh5mwxytkmrcyktcu0apf4um5k7up7tuik7s2eopytazxyxzfrgssa4r3tymkym58nksvjjinljwh3fb0qwblkdqn8wnmqbovfbu4jx0rfbdf22mf64jcmxfb34y1k34mrcab8t5osaw3wwwdkkyim9tx8cxre75h507kcq92dluwxntdecblpzt2qra2cry7dx9c6pzipzc8ors6bgqdozzdv7a877d62ry5ndm0mq4kcipdk46ezhechlp7dufszh1ph32uzexaltsxhxxr291wmlyjhnm8koxwom2rqdtw6nxg4oxd1x8ki806aj33bnzf8eyzmjt5h14bn6zm03ih8954wsm990rbm85skspldbkrnsxauw1pvbs4ey3b2ri2bv0fzrghmywdoaq9mvovowlkr8w0unfq2ekj6dsil0mjwr0ry6fty11m5mepgx95xfeb068vu6j8ipwugydwjpmoljq2e'
    })
    parameterValue: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-28 07:44:48'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 08:08:03'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 07:15:48'
    })
    deletedAt: string;
    
    
}
