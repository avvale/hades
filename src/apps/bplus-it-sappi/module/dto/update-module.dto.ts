import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5fdec69e-89b7-4a1a-b5d6-0a5ef39476bc'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '78cd6508-25a8-4a36-98ef-6fb6429f61df'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a772b249-2ff4-4223-b032-06f3fadff071'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4gsmr75yma9mj9xy1k83'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '403e3583-6131-44f3-b629-f66eef36176b'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'vljtuzf7bfanx1rxmzj2yetqoqdk1rwpg8e6wk1ycfvc3rac9wp02sbfcb5g7i6y1eu6ddcp26dug3h7z1wipcpvi94l0cbnrzq1juqutisj7wlv4atfp1jy470hey09cendvpeqedmhnj6tk3h5gk5p0s5a79j3'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'sskxh2k6vhg2du99u2ll7mi9h9nkvypry7ey1pebohzbsk1tvrmece85twcmbnlcdbxx7asuo4k86ckbt387t7o9ouyf2txpbnnlv61d6s7emnb93nsb0ful3qu2j1uiq2onhg8iwb6fazjskbkwql1j5im3hqqa'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '5jrptywadrp26pf1gimf3rsofuqbkkzj3vth1d6s064to4xn5wmxdoeogxpqqq8442uypqs7ydshzyorhcpo7h4wr1s4vh1smbler1l1apmhjbsrmoien5t106hzzq8g26tvk54a38657ina2v4ed94m2vrr9mqi'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'n5abbh1817tl3car37y4yxvgal0rf4e9mjpfapqi0dwp5n1lb6rjyqxjqtidt0vjeh24z98eupxmqsk016ci32w2l1mnvpbeacj3u0cp04zq3j92f116899dsvahp4a6au6h4uo9x8f2plmuzzcljtbtf6p1yh3a'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '8lml1fu64v9sh27c0hrtnwazb501vv3hmapvdra0sbiid369vf7noymtlblqk376duipxee5plhrth9mvxsda5rfy9b7w4pcgxr2psp7ksy7txko6jejiptb8zhd5y1uatjlbru1wc4ydouoxi1prtlxwx8j7qrv'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'rm3f5gol0nwo2mmpzazhaa87hylsnl2osdjhr0onzuv7p0snokspwncyo09mryu1syk6i5x2hcgdhmwxdrz7vgl252y7zoif0mi9sli5x4imzqjcyjovgmrm2bv068oo6n5quae3xrhftxhmdt6vqusz6zeuzf5r'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'izcl9y3quit4m1tcboxqtjla5kska9ir1xjlg9zyud3mkxk712u0r46o9fonnk30tfxyd7g0eewq2buojcset9qv8akrw5yzdmzmwjb7po0bzrsg23f1ogmfgevmaktg162rnwlcut411pe7unbt5qff1be792v1'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'dkqqg496juhkqzcjjnq97e7vl6c0s5f9k2q9dy4mvk0gxyne9tj68pvcx38i3z5ahxerwtcc28d4zfbea8v6xwie0ibtdte1gnov8vhy5on1bbcq6u0gn3blo2ri6ib0na5nbzzmmm1h23j4dv46nvqln20ssnzdzudqdbb6w29jogr131uw3x3zhpdsdtue0bawytjayu28reo54q6escvsovgr2efq19ym7nsj2bqmplp8maq4mf8whkm3zlr'
    })
    parameterGroup: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'gjawrzjxdl040ydk4lt43hb228m737f3se8fd5jr17yx13vgcsh84d462qhayf98hfqa1omhq877wvgfpmrivxo22a31z0rmtmp87hcaxuybpdo6isfjh98zgmmpdrzosz2bkpzvtzkdmqv903gvn5kdtilk2bvf55vh0usiifujt273hp4b4ea0e4ik55ddn94in19kz0hg76rclrgs0x2baw5shhou1nmwdhodcat9nkxi7gdkbhaowvf7qk07b123lle33ve1ssiw54jp09xfm00q5rhn5rqwdos3a5owm7hcxiou1st8jksewezs'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'dk9rn93rnphy0340wpba3pdif3or71lewga9h1xvy1ir1971lj803q0achojre3ohepnfbekc5ne2wzyecaci9oa2j0ag9pokjzeepa2tmbeqefnf2ez8z2deeljf7w9et6ctebs8ad7hnh04hls91v509g7gni0can8saahcjnut5zek3k52e2lbhf8epud2uyy6u0i7oumoiawuhpyqj8aqwizycchfhio83lx4ukc78yzgwm9u396mtlmkhi55v3qjsuca8okkm6k7b6d6ai9qq8g43zfwth1tu1wih7yj2gddmsv2efyumizl3p5'
    })
    parameterName: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'w5bes6cz4un2dpmh78rccwqrp9omobduat2tslqqp380bewlgu7okiiqsv2wrxs7ingfpq44shpui6bzyauygq2v4s4lgza69bvjm752gdoll8g13qsky4c3mjdopa8szx4y1qwf39c26ulcejaloce5o01nehxab0gmgq82kp76oyiicr5p72tm0oqo658amzbcvl6a03loo5t627mt3lo131shwbo9vnrkl0n3m16i9imrxjjfzzl3t6c36v8pvsd8omx4rmtee80smi124g141uwnkngyy5k00o0np136puxy71fsslcqec4ruvl10zgg174l1bmbwjeej3gj43q7wrja3i4u1rb006skkm2z4n2r4s6zod6o8f7flszn0ln03lt9t3qgjqhvlh6i4ljc3hy8ibdklgtf74lg1ajs78mjdn80bwvs387s2rqubgwbbbom8jn0y9jsmbasorubp8hegt23hs9tciup2bx306nxypw8a0cmcpjux1f22plha6oro7nv8v53k8n6zody6zzf6ok1wwaqyv8hxpo1qcycj8rzwn3jj4q7hbemni1jwntbhpof698wd9v3hpv02tatnxj4nblxox20a6mnfbsu2paee0bybrylhj3t5x0vvk65uwmnwm5s3b53lbiu5h8y8id1t020c2y3byumouhjamgk5s2s7kwd5m0tk4neyq28ndsoqeh5dyuazhpc75u41y89yjj47lro769r3ecfqeiw036brayh5z611q8pppp3cvqhgwumwvijre1fu6kti9s6xpi4n8b5xa5852p59117d2xps1csdhso677rt4vcpg5788o4x11cn5i2qzuaqgbq2qpi8z278j7vpiz1qo4qkb044z9dtr4exn58dqp4d01h1ctnwalze020ur0qbrsqcheplkq9igoozaazdkf5pby4xzua92jpqpw9vyp1xqporpdkj2zu18olnpw0000rpowde7dvfzelxq6psal7bcsfbcgj97k0'
    })
    parameterValue: string;
    
}
