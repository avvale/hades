import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5ae73a8a-3de2-40e0-ab2d-8356c9845b13'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'f9eac505-2b8e-436c-bde6-362579397dee'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'ngrfu21fjz2fnc6zk73k5owtg5ufsacdiywkutd0gbamwldyub'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3fca352e-b2c9-420b-ae28-cc3b0180d0e9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'hhonhpktf09ixygv7e98'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '89d14c19-c13f-428a-ad32-e192517b264a'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '3k1s3ugjy2t3f4rnqa30l08q6cvp81kz6t7pcmgk3gtrrdi7sk6he2kmdut0710uk1ve0zkmpm5t2r39j6r0bbe95wekgv9jlhmm4fqj5ttnuqhafg6i1uorn7t8xonsvadr5qy96eahibs81rzjfx756itpbk8w'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : '9ztijc5oavyc1yeuhthfsd6euhcxumombhhclejoyktdzb1m2wr5w4btgjx7fmqlzg0xh0869klsllf9lbohnm6bpi0891jmw2i93n7etwxegz0lldjwtap96oabpz3jdavamaqzz7fzt87b92qevfwg4btkx8zm'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'loidz71i1j8zzsb2zrwi7bv29yqodyyjj8qgyzdpwqpz8p12w4aduzi9nhauixp5kuk9xscqc2aoh59nw4bkkkcqknpd2yaf23qkpdnx6p8abbod2vi55lgiakmv47fvsj4gimnk0e2j9gkpltbp4oa1oybsnoma'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '5723aaae-200d-4be1-9590-951f2728fbae'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'x9seyvm3w6uok2ckvw8d1wlkcbhset3btakwv7zyoymvjjg8do230xh6c0ypuqslfz36cgd280brxu5oxg9gpura7u27ciea65h4sc1f0frf4ru6ulh9a8jzwo1c0wdwj87a92syzk7fp570y9ni0bah9ga08n4l'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '4digkx5tvciyz7kvfzwcgkfsafwerl7m0z0s0llwzpmbbaaojzlxojkmqxnogjbqsxala0xxkliq749xhgmmgyy36dtb6mc1ekh13lpc3atok66zd461xkcx2cstf4oc8mlkof2akgdiwjw70hrrj3hzdc4y82ii'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '3br79u5uuy5kzeejhps4bpwaoqj49vp9big5os4e19ihqyoec98hlita70b8gbky88o3kvx1dgk1ryr2it9rmzrt18qbgt12b0zfp72rceim0s9k3yft61gnupta1bc9ek3ccqjgxxn5ir7vuoae648q7lov7pim'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '16j7osnuh0trbmfzm6ri7ajo4bhwx75n51sekehv7q6xx3i3frj6uqm2q1spt3kbya9wdp3a4bppr2phi9fysvknkasplf0rg2byrlll1rg2ik3km0jk7bfs03qp83610ctzwiyg1w56x9oca5kle13zvtf0c6l2'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'k89gcxsthkjbzb76hsqq'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '8xgjogrb4j47q2or49q5cym9gyzdf0q0fg0y99p6db26g2x8g3mflgqewduk28jeaiqn7a8nl1k63c04wibgemzh8al1lazips1w5xkx6aasjavxf09pkrh636yzmi396ft5ers21n4acacw11r52hx6x9u2yqq704o6owid5sjur5xzd77d566zrvdvrpn72qr5wnhmpuljdb985orfnl52a5yttinj2rpwqzn7o08po3wd472omitc4rx6bod'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'xh8r9g6fcforeliij13rws03d9yb4g6bfopcg3rnypi9rnbbqtgderytk89ogzp9x9171qaketrqnnnxmy9fmdu6d9dw4353w91o32kfvxie2qw4b5jd4upmmwtwt4jq6l6xk97odcq6wcoq45cj082b2l6lkpfjfyxvh0qh0l0dbiyktrl4l4x85ahuzu979x5hnqhsrzq45or59e5x4b3gnjreg4lzibuuyqfes4hrzqam30gtl957qnbzy4pw22xjazwra0rq5eiauxivxwfz6cctbfkp00l2e8mhm4z2v5ftmh610x6888szoqd2'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '2tohtnkfipsbb6gk6m7nw9fhf9jxnmv2dnux4njgp7m37p3msiely8fvqj8fqmvi0afaeu3e4vtq3canir41t32osnandf98duiqcq639qu92grr06pxscqa7c6b9nz0loynne430ls1phbn57zfn1v5t4oll9na5bjg0prh1gtx6b7xjk8tfx9ilavmchkg1i4mo563mk7rgs8bw3ng56j50zazqrkbrvply0q3k5h90c2gfr5urgln7w1jxnsyg9tyaxe2487md5pqd3svuoxzryzpn5run9za5nzjif21ky1r9mpys474frcv3fh5'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '4jhw0axtdy3jd93fxp8by45b0t1ny62mev3i2qnhgxao1wefgsmb4k4egyz7p5jc1w20hzuphqznfw43k1986csjwzwc5oxtbswdsuals7xmguonfngz78mh2ei7apajwz11je0lh8cajqtew519jsv01vlhgot2cnz28wkyzg70iryegbcerr8b4kxrvvw03mrbo21wgnswgsi2e10yqlbd9pywnca0vs5uax1mlj4h28nrtnboibsz7224rho4zc7ek194nhfg2o3gc3h8y8rotjwl46lcryujx52xgpn6pvzds4pcnz8lr07war0kjpo8a1efff499u4asvmdknniw64bcs4r1vee06p2gpzml1jy073w6cyn0zew3fmql2e5m9gi32de9iyoxsspf1rtpyjltbu8ha6vckb8ef7kbicd6ht4s6cx5kubac8o28or2grmrnl2xuajy2al5xmvl1dqt1pvhjsnzzwro9rcpq4dvlqdycca5phwejw8snhe1g62un2xpolkpx0vhn18sc81st216la2ygl15tnj5uwteaz7f0sj2bh0ynwlb1c2qc41hywz30spfi8a19lga5lgtne6accv3k4l7a30a6z06a2sqh7sdewnhaxzp4k4op3wo9glncci2o19jyzeggl7v5mvnzk7n4h2ne2p755dn8mbr656ixun4mzgvixbo8h0boeqxf5cwvlpzkkkk4pwqt0y1obsfu7ojonjvrl9p0ru1ip0sd3gt27v2zucv6av6my88sblbok1m083an0wunojwgat1thi7rjwys7qlck3ijis1u9x65fo9h0351wamq0p08t7ke17xirskoy1algt99208lm5fgyuatf2haoukif6da14e2vq4og0nzavgswkmk111cnsbgb5jyynyv47iphn7w1m5mk0mzagzhkncatafk0grz4aylhsub6tfqyjw1efzjlnypmk2xfqoi195hto9aoil6is5i030jw4ylyo8rbkfzwt'
    })
    parameterValue: string;
    
    
}
