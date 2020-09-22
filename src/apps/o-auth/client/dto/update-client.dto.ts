import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'b07ad268-215b-434a-9873-dbec1c5bf907'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'PASSWORD',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '79zjn0hf8oyl58pc23fwa6ttt9fe412g3q5l5hp21rwi76tmaxzergny8x2i0ba130le4tkxrloqx64lhzth0qo8yey4wul26x8m6ecgjgns8zzdffq4ukcd2wd6xrvcky45jtmv5wjr7uw7snw60jcvdn0ut7fje60dolmhdf5mdy6lmf2lr1jhgunqhltrgb39t5kp3obvn67fsa1qa6tgudahn9to5ygjrysvjexj6i2z4b4prwfgrvrbef8'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'urs9ws1or435oc66izwwqtzfk42p52axv40135h55zmcjom0a573p273umv8fhiqnlpogiobxqapga19r7703kgam8'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'eog6rqfe3stpnvi24tzz02zb12vsk45brrzac302te0ym79rlpv1rbxz135z5n9478bcerziea8oxpum0braqdvsiojlt4nff0o0o7dkn3sk9s1dj0kbx1aq1l9n5kwv9za10fepwm9h5kb42t1dcfsjkoj6f1t1t16ucej1ztb63alrju55w1txkqp34s429rpereiw637zr32mgu7clpytjth5mpxam96xchl37ef2vng0qtuszxlnscjg614kmzrzk4flqxmqivw2p2r3ejjln5fg4r2upj8jnyt7fbamdwzjbvw47fyhk3k9xmnklhv52q0c1jd5n67u0ffdxykx8j4gw7vu29dhdml1u427rpbrkr3voz9n3ekxxz4s0u2sbogm6p0mi1v6gg10j6vbdb0dgury4bdwuh39ifrv5gnm1nsvk5i56hoglc2s2fbsrnlr0jnfrjon5btws1krhp0hjy1xtboudcs7c60pdqo6gck1hrknpriu3slcxg4uko7ulqc48hilnqsan1ylsau9rpjj4kjefnsrsjmbnhf7mn5x8cidjhaiudzlhtp8dtbviu9q0x4drv5nel7ltegs9j1c4qubtdxf5gbue8mrxcz8q3ydaml4zsxzrwyuhzoczme61nzg4cp8x57oxszylou00tpu7gc1b5hecm8dgsooo9g6g0oxnv6uhocrb4ty2gigpoekyviwzbn3eyzkld0971h6ikjdnmxiae3nif4hylgzspzt83559cgg4gx1w1xk7s4ik3foba3296qvjl547ebtcf2iwxdsvzrh8vhwenbzwogzbvcqz1yfcnx8nlyqkzbmf2wuuzc06gu00t7qegzk2t2lf44c2wh6zp9d9pl7n4rhmcnr28em0mz6hk5p9tfzs9nf6g56b3r1fuqg9fgyu2uo35ypp0wa9jc11igzxpik29oitgxkhjuii47gqwnbv4cbws9myla7knth41qxbjiy68kc8qpyf6jrf5ter3c6yiu2v0d1osg4h2j8sixrbgfhm5yyqxs1iyswd8vouzreo5j2m6v59zsi7pxqh33jfevljlpg1uvq55ioqtikwu25hjrku0dfb3tohi3ivs3gj0kfd8pj0umckt93rdlzwa3giur8s1h08p0nh4bhu84sn2ipcllj3t238x77b7p6kaqlom70tggh6vhjk48ie4xayr02n9tptkl80zkl2zuc1m3rh45ddsiostl0ae3864e7t7tnhi88raak9js281tj3y5gwndvywkms4qa8b7wcp1y3a2f6ko4twoho6n0am0rtfrc6grh4hshvkucqzor3aeymq5xzqy125a1nqbqzdfxbun41srfcp60ian8v9tzk3gz501bvupt9zvidkxyt7j31t0dif3wjuxw07pqft90tg07nakx9bewhm3igwucx5zc61okpu8nw3n1l1umd0ixfkfx9ij9rj3kbwpmtl0mteq33g54kwohjngacxya1624rz1w07dgv2a6ykshbk475vtn5hmg09tgqwl7ejd8n0p33pg5shbmtexucdjrg31ixx6md2d0fip1m4i8fuhap52q5o8plnhtjx74n5c6z0jq9t15ne248rg9hzrscnyddxk7ski2x6uosgylo7v4zr7hul1397kmu7v02a0gw5aj9b8hseay690hp1z4zlo99c88xrnbzzbh4mlmr4vwtjyqw483a2fnxu0hpnb8b2m8zsuysz892w2m674nd2s49wrx55n8oq50raimv1g4cu59je0la5jly8t1vlv8bn8afdzysfxufxquv7j8yw7f37kkf2xjzl0kldn1r9ciqxcl4rlzvgefdo1dl3ypc7noabvd3gb04drj8bdwbs54flh3n1aocdgsg5g6tzswnwd0aj1kmf7wirvtw659lb28tpyn44z6u1d8cgg9tlx0s74eibbek8txgxm12h3phlrhcm10deaimb9w0o989xkqqi2ejmpsw527eurk5hf8b7uid3vln6ora5mv'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : '00clnj216416xahopssf6kmawsn1vhzpmeogergdubcned2ftq8di8cj5wvgvj6meknbl21o5pxgf72dh6qmd9xuzn5ah3bt90p4wxikth561umhsvspdejoure163b6bsi9qrlobj6kr2fcc13705w6w5eaxil9p9s50j9iv9y4k8ky2ceya6vm8028bo8fmnghv5e25bflpp5bhjofj7v44heb5cdxwwb3ljemxm45f0l50anv67zkm1q8tef92xuzlynxhy94gwoj7oju1gvyt964pv52ww749p8mfy8xuu6yguz6wz6vs0ff80lfod3rnsh3fu64waut0j9b47fhxd476o10nj81q22s9hvgwem5ngdymn85chfeelpr2ciyuylgmft30w1mxow1s0ou8bnduj6843kpbe5ac4qz993gaz53cv46txjud8iskcmmqvrjamudo15rnq0g3jygr4d1okb4zt2m868r8dfpjul6nd9nzgmlpsi2f5i3oebyzqawu9vdmcxxjnokhj4yih34g8n8ph3xkx8jbx58ivcv0jlbjhidt5jicjs92d9ws6wu3bj0t7d7tect5s4q4gtk6jo4ica164srgd7nwi7v1hetja8uus9qfappo2unblgyvpgscpiuze4dbelqqh869l69qzb1ggqljt2vzbv7b4an26qjgs87h1de27lhsxndml8fy6l7ipn3z10mzdyldaa4rjn5f39pocrwhh24wmg3tbeh4v0zxqnxy0spfcwfvzab62fy5cj14tfdc8lvt306ohxl2vmmm2tpvkuftgorforw76dl5l7snu07k4fbsryruklih5sj9fh02z5t238ypv7ok6vin6wzyeqmoo2uzcvzrvceaymnsfih96rycsrjvfkjyh7fvndttadrc3owbwisk50b3fns876e0lb80fpphkrny17raxgfv3338igxav9m5sit1dukec3byhwo1b95ahfutcvg7zumoubn41qhqe8haywjsg731t7hzra9a61l2tck2ih2lnza4gck5zmnvhjr5cmfy0h8y8en095xcubnc2wa8oqs0d46tzgip8882n4lr9fpbu1qskg9pu4j3hqe4dr3m4a2ab5ry0ngz4rptbz1grkzlg5apvtu4jle3xq71uh08q666uzb2wmv2mfm2zyuvi6pyuds002hbom47bxdig59oogeue7bownyvwuwbf3p9pe2qos3rvzuab7dxotyjtkdn06rmzco382k09v3vxav7icxaiq9eoq4srk8xs52fz6la3bxp91cherjhvbsuqpz6xwfbmtccheeky6mu2b2gjxd53sfylaqafqmixmzea4gw69x2hn67zqp7n4766ajr5ky7kytlj6bh30ce3brt2rmawbrsxjq5oxmeux4dadr7s14mbdy5mwyofxbpeqnnvfj23yw5cfbikyi1yddo0vvhzyaoetdjs5dxb5d8ospmpav5a89su0f6ngh9xibdfq2ibf499wavazi4ksegmf9i4rora7i2kbjxigzc6dh6p66ugqtef2k9if81e5xtymkfune3sn79znladc99xe4879i4hya4y0zf828w7s5gwlgqvfxpsasi3l04cpy73tzeg9fniqsjjfdahjkpzbbfw6sdxxhouompgo49p6xoyiqqg42dgvm6jcqkcxvbf2uz12uvpv4ptja3uancdlnnwbzqsbjcg8owl1sx3vi7ihryes2dnumiee06wpq7wo2hkby1olnor8iixoqwb87jz79i8puhbevx3opmk182wj4j7fizcvrx6sy7xpitn1j0vrav12sn3xt1g4ur3haope3pvq6t64gkw3rkhvp20bjluw9hnrhznslc0p8vjcwrk9qwgar2jp2lvaspymmjxi2x2h4pqkfmhtmk8ouml9uhkmvyaci1zfz4veapmlhn67ph9r53onp6iz0bedvrvv2ef70i6wfz68si48yqjgr9r18enuc34tufj36bgqahvb7rcfpd84e'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'applicationCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    applicationCodes: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 6126256983
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 5941780433
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [String],
        description : 'applicationIds [input here api field description]',
        example     : '',
    })
    applicationIds: string[];
    
    
}
