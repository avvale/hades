import { ApiProperty } from '@nestjs/swagger';

export class ChannelDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6422895f-91c2-4399-911d-939f1de6d2ef'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'jy754zn0yhllu4mjj4cz3q9ijl94w3b1rkawt0ap'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f0af7963-f115-449b-b2ac-563c70e15043'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'c1ouo6rjr7lnoa7mga6yl89nbwyzh3n7twb815mgkt7im4ylof'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f87481ef-348e-4618-81c7-6695caa9a574'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '8yoxqv8s6tiwha4yisq5'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'j33zprrbt0vjgcxohz3yphei8hexlt63l50myxrhkfsjnzigtn3x1rvu5gusasux89sc2y2dqg8c3qpmhou9x75pwjxl5iw1md9xvac8hmtym5i9vt3qf9mabedxkx8o9gx1o1tybh4yid20qclfsg3eoaybmpic'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'jdnkign3d7otvky0xzwvfp1a2sq3bpdhzlph09d0loo6k6mbnz476ngvrq8sqhh72ayle8ljiyy46bzypmbd2igrawqmijp5owwui6odg92xigm9a0lh5zc4tq7gw9s0h0byn081sqygdl2ijba88hi9qbafq84g'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'tmwrrq1kwh6yl3mxvdp05glh3cmn1wrgsdl692v7kz7xspepgu1d77m8cmz1q031kcllmlhgn6gtgkatetvgzf8yvzeqyhgjt1b0smbv3kr8j11dkf9zxlsw22ggto9p5j5j7me0s05je90g5ct6kq08ztkf3nud'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'ec6beb9e-9140-4ab8-b29b-c0ddc230fd98'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '8mwha5wn6l8fz0qj3s1h2ijvw22k2khqy7thqevqlp9vmgci7e5nru3bltef79m0kdhawamoc7wli1q0z31zhieo7l3upvumzctytnwy1quuzk5ywjr4zn24l3tv9tk6l5jsnja2awwvndygebxa8kgzs9wyl0tq'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '1j4i1q6uqlzlwqmgmll1c9v3ifczx4z60vgijid5cohd2ubvsi91uaaojsx53zo5umomaaxo0wook4ea7l1qamdftdodm395lg78oqcskrjebkd1eej28w5x6dn8czss8vdcqciu90vq45uwnn8bqsxmkaixbds7'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'remcxmhiczr2f92yvtmkho075rx7iba1g40fdupyuait80ppb7yko9adjm5d6a1k49n50s91kx8czvebg10ya9v8205s4h30kvx7re6df2t14wjawrdu7c04zzprh6081psnpy0dwr4euri3bprqkcdgfg2p8qaq'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'pvj99y1xw6qayrerwrt383n0bo0wbne0immj7v8bkfpubyb47kw8jwnxbgjvfbd9aapgfm8oe2uqrzkyaxk868fxh7wp58uzqlihpmxorckyq2xvp4m5eu1jx385hr50ijdy9aqcbl80k6vkhg4sg57665z0tl2u'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'uqq6h6ifir5roc1fpce2'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : 'ad6k4owzgxcbc0g02424q0ci607mniflyf5hsgj2nkuurno84chscv4rpups'
    })
    adapterType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'RECEIVER',
        enum        : ['SENDER','RECEIVER']
    })
    direction: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : '9q8hig5k67nylpoyx5hauq9fz829edlvh4afsog483a0cn9pcvh866e9t3jh'
    })
    transportProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'xdzyglcnoo4s9042vfvy1ffleuu3imcutvyyaqgzh9axs2qlfttxree4odq4'
    })
    messageProtocol: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : 'ha9adoxih02l2f2p7i1pjgo7sq6ms77b4a5zitaj09pmememn4eezqxbmd3q21erb6osxjbawb7p7sfniezler860uyvmqw1wpytcsccvfzqsflh1708k5h44csitql38ws3k3iayjft6c7xrijiqdxoe9eiwyzt'
    })
    adapterEngineName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'cw9f3r37f60qdebrymgvluww9pcl7f9cjlvl6yxdybqzhs7ykzlz7uej0l2otnm2ozbyyntci4lyo2fr3152wbxawdb1ydzr900prllo24w3928fmr85m264kti571r7nlhn6oj1c4kdz51krzawtl4u22i49230x00ligb92q1omf7dwcwy44zgzx2z1jdu0t321pfkoyehmmx0u51hpxgxwn4q4ceop2rulibq0pifyj4fxhdam3y629kivqgisbb7xleom15czhgnspe60ww6u50b1zli4fbhc0disobb7ftiu1zutbvddofd8d7e'
    })
    url: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'xklxxyoyf3tgwhl98rnv9jrwury3gdgmygdb4685mvqp0keezzd6kzqcquyg'
    })
    username: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'o8sb8vaz5oi6pvh8egkk6gktr2c4tqhk3k2pio581ff0lr0tobm5zxr6qnegcslwkamhbysz7druwyc72xrf85sycuzvlr8a4hrqnddtprjgmvq96u22eunclca4rd0w9m1x2n20b0bia6ncdxbm1oyx4vqd7x4r'
    })
    remoteHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 4831529808
    })
    remotePort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'xwg1e4b2mr9ef2tig7ryyr4lr8j30tygf2a9nenb6pblk5t8h0h7mxoty39z863lj4x10cmdnp90lmsmht5hmrdqwxei7v6evb9b7n0p8io0xi0zesg4b8ki5cy7ynijbksznuyvzidbuvbstbdi5hm5jvztomamr9eiv4tcdyfxfeosg1tx6a3u00gth01lpq5ji5n2s4jk3iah2bnvnnqopd4jb89sc1cprexgcxcdb1s9iqx00nyelfwbc1wm695ny053s8y84jlwev12r4u1k4a4n6s2m6qbyaal1ggxt27bz8j6yn20efqxzlqro5l5uxbpyqynb5aakwipf2lgwjtv7prfutlseb1s8r6ld61a3dyx8guselxbk7mt7kyvrkodqo5gcjtbyoj2quo0p7eim1hpgvhirix4hlxs0oe95l294ibt8lmen5ijwzeup7hvhdxgayo0vxr4nggwb1umu7xly8kgx5aozmmaf11pxlwhhv2gc1dv8vdkw66x1fwjjo7754rxzwiqxu8l4rjqmd6942kshgf56bvmcofslkrg93rthckrm2p9284wuoooq4lobwto40h0vpdgq0mj8s329g6olf7br3w242dycb49fg7ugpom10vawv43cbu63eajb9q9a4eam9640i7t1k3lp097owiyyrewo71vyir1pfmiupn86ai3h5i9aaw4ks160ctoy69n5ymqvycyw6ad1x6yhj5o33fmh478tew6lcpofa32q739w2e8o1z2iugcsu3etkju7z6y3g9upu842oyef2mq3wqvm2i4cj722a8m4vzgm80kz1va8wq95hb84bkh533oy9al8lxf0uzn9y1y71xdt7isnc2rc53bm1xuxz37hrgorjqfajbtznjpgmzj8lh3qhha0xtxsudl3wh6ms2agwagimthixp0xgngk0c82hgeas0jggmt8h83hw2r5izfal0enll76rqe8n8h6jxkv3i60f9unszdvn27mzp60vb0'
    })
    directory: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : 'qmgakvea4gt4ats0d03q18ub5ojj29bbcf8epocet5uutlqiflbpp5rfpsbdvdjl5889au5tdig8fs24gr51fcypfh0ll7l1higv6acd6g282zjha5x831y90034vg8097mvox8t409daupoidt73ssc6u6dhy66p2ujq0gczekqjyz2es8jxqr4yompxyt4wkiq6rhf6mp51g4xpagn5i9p2sen0qv9rbbxbzd15n155ut0i0gxbz3wldec72dk5hlonmx9w47szh3439t05wp6wdg5ibdxy6ttpr54zsyy29j05jmiish9r21vx9kc3t4raa9a0ln24r7l8qqepehhrli5yjaivxdh62cyz7jcrxen5w8eicsg96zieduwpayuy8krbv8v8d96e39tqshhser5d948svewcs693cu9bko070y9g1mbmsk23uo84k2v0iokrte1xvhkod1glajo7gp5gx7pcwdk65mjbmq48goq4ohppw4kcii5wogudh4it2qu7vf27n0fq3bbrqbvm7dejww0f0ny5h3qwxj9nenij6psmlaurhq0r8eehx3b0m5o8q2e9xnkv0f5jwxzjf4d5alrov73ejxj2c4h4mfwups5avk9yfo3y9yfzf24ksbjdpqsutcltyamb5mhrmd0g55ftjj1l9soyu0zjyp3zsx0zmvx8mp560v3ieaaaam0foywfr7m89x4yw4sdqsa5zlo9yoodhmc8ryujuprds21yickaetut0wfu7f7ofw7pnpais2b7s5ag2nu6javubb9qmggcwb6yhfcohhpvotsbmip4rn478avfkf218395q4obnp8hahknuncuzsz2vm12fv0jjr1uwcnb2qkroffeosy0qek04g3noxivgh7d418v8oflu590gzbppukem4v0dm13b823xubpw8zrcftxju2492eu1eiqxolrbe8gl8o8ucj0cwvgvfzv9bohc4hev9liya1ild91asjdtdbq3x9ewzqaqeh'
    })
    fileSchema: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'ocakgdnj8idq32jkhk6gwr846fqzm7ca7ffh9rb90lqaztfy8p138rlzfax7'
    })
    proxyHost: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 8728010314
    })
    proxyPort: number;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'zqg8rs7ystltck88vjw8bdm7d0i1c3zy2wa1wxt4mnpucibbjw10keqh9jv4l40x94fobr4kmxb9iqwf0xw1u62f7x4lb0hp50h6nmcqtbgavpy2bdo18tlnrve39xzz6opjhmejh2zaj8sgf5me0e86c5w8g9a9'
    })
    destination: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'INACTIVE',
        enum        : ['ACTIVE','INACTIVE']
    })
    adapterStatus: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'pfkw4k29q0gmsmrmc1o0hzd110qfagrgnqyb5hw02n18rrb4398vi4g85cca426qr3gtlxfio4rcavmckkk49ro9sw5za114hp9hvkc7yd72jc5c7gpohhppyn5ura211dea53pym68r1o8mreqafx7yclyevp0j'
    })
    softwareComponentName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'tpda3yekiicetoa3lj1m'
    })
    responsibleUserAccountName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '3955pizhubobllo0n3bg'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-28 17:03:42'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-07-29 09:28:37'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-07-28 18:28:57'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-07-28 22:41:54'
    })
    deletedAt: string;
    
    
}
