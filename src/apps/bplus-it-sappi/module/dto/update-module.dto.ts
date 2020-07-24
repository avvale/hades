import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '6d8d7ae9-7c4f-4595-9ccf-2f07c22591cf'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '0d2bce69-5a52-4b60-9260-2ad71dcdc504'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '4u6t9tab0qf6ngvzcg1y55ie5vjv50g83ceajhr3zymb6u3oxj'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '4a627b52-0a81-4b72-96db-38bc0da009b6'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'fljwk9ldqnrxjahpeqpg'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'd6e1b853-212f-430b-8ac7-d8c8ccb92f5b'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '8mtxpx0n74n3nvhns0e82b1z1j20xc0een03zlyi5c72jf5v3e2k8h9oxq9nye72jc98p2sckg9z9o48fxattugllfvkp07rpkbisazzp5l2iisao6em8bfpt61gea1e37ux5lp7y45e74ft58ii5y5t2rxcfuss'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'avpqfwv09jguztdg3be7thfhep42dlzdm6rbjf6knww4pqww86c922rpcn7knhw1ig248k4u0kkj7wondgzq2l0qklv60yts4k8d0r5v7cn0jxtzzhqbmgd6pm6rnioq72tiq5teleq46gxp5fz2abd1ldrkr875'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '07g180e23oms83i1ev716dwnc1ieipcxo7vfgg11dzz95nw7a7rbcmzhsbf675srk0fh76rvn26zefaf756pfqetpmzti3gsnhx8chuvxw7zxo72a6g0edyyjbf1eczx2tdz96vs2uoqbw20yllp8gosyjjecdhd'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '1fe276cf-521f-47ea-8574-880d952fa56a'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'xcf0ca9ol54juxryfj3vhq83kjjaw8mqpyqfoqygobcn5tmx38gabl4iy3chfmrm4698b5fcr8nwydkxmxnmry9qj01p7u9zxgst8tw51p15za3296qc99vpivud2a25d5sys3vz88fvr9y7a5tlv7nyrik71rqu'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '88ozyb3dplanf4vxgr6aqeehq1vllmxdj04ulj2czq5fu60pih1jqhvh6pmk7bsdrioalqum2juufy3tifz6wp5veiuj3zxdud9xsdoadif68vsqyuqhv08twsdvb477de5ywd63g5wkxq9s3hhttcinhpym1dtu'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'eoi7ly857ogyeg7grkaiai1rrcvrm6rd82mlrtarx1m695iuse83ip4vxlokie3e4cmwdda4rsere740ggezgbdocb30jrqc8b26thtx6sycnqxc6ehbt1bw574uk16305j3s1y2mmuscaf23etvh4h9sizuadgq'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'fpnl5omwvuftg5hl3tmbqbb9xsa2fd2pzdmxxi8g1lk5et7r7xa7ms4qsflnai4toan9vi2lfk8qtpds10jv4ctm3nj8s6hkp0vezmk0aux0qrcczahd99rzjii402dkepbhnesarlstab112ijbchkff1twptyv'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '5ld2q9k0mk2etw9e3r5uosdlxfe0gzh2djugm4fax9bkzp46jv83ti3tbvgidn0ch7u3s3532lxyhbt6goxeya5yv9tnlm162q0thdp3gsooroa3bepgtlawhyuelw5rbc82l3u7enkvnhk5ijsdgu8ztb4msvnrpt4f32006kkdh8jzpv5lo2ypqlybz1bb95kdl38tlqoq4dutgplgax9y1xr51st36cohserlqbhaetc32utj48hhse82729'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 's5hx1j6wjgrn7mq209l8tevnabqxe53lc85toomur1fgs91qu962k8bqufwfc4vmt6wybs8j6076qc1fgw51mszsqday5ow62q66pzpsxl53aagdjcbd7v14d2fq174jjurgykpdgs8p3lqduyrzlvtq93d5vra3sjhg3933rz6xlnw0ygxjlo51x4f6pbzgme8943m62iynl3wz7iwyaoa325hu2677kpjhoudrgi6jngujl1d0gsfjsvk9lp2i206gliqnwrvy9kvwio9jv8s41spi1qy62gx315csovlfs333aid43r9i3qwsae0d'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : '632rcnhrz5bqgg526cpclsor3nugvx1sd6otbouqv72cr0kp5q6ltbi96mg5bs46ammq2p9qas07nr137lrdhnmvvhox7ukabi9jmlnx3c7bkxw3qe0922whdp02j8u91q80p2feepiabhh35qc9idfbj607ct95tzmgqps0st1acbybr52exmcwxrr4zfa89zgryccs4pindjd262n8jej6clckkzk78wnkl2sivf8s3sz6mrttg3msraz4bkr2aei6qst9mqldenyd59pgivxfkpkvayb5h52t7zk46p33yb72nhielhu7387xked6'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '2x45o9rukbkvsirdi30gyknrnxtmeuw7faehdx12i5iz5sxf2qfq4zmceve3qiyvyy274fz6tg58rle4q68ot0e632s080ihjufsh7rv4afkufbffy513kq7b7a8835tw7aom3hs8n8jsog7ste2x1k1aq5ssh1991kfrntn4kkxx3imevlwy602c9upsx3j8ket6kt6qlgqde70dm7i9mx4jviu5z3paquu2lxxhiwdxoller4omh7zwwmyf3xh6pzyyqh0msvjszmmev7zpmb9umn9z636g7xyvlyns9ok8t4t4cidjzzchcnsvgcjskc98gnl2qx1v4bfkh389o7m8247xkt1tudjxqhfxve1yjf38kg7r9t90xbwf2vpuk4kbgnui3qawrryzlspblkn84bdwcfyugvk70lo5ux0un5tylu5mfuxr8a5z8bhj97zpymplxkhkffpugw51ae3y47kmy0c5sv4d5kontcu529zwv19673qtr7qlbo6johtlc7nzv4h2h7c2p663fah7vtgmc6tjuprfquchstg8rkhuzlnj5qqrqk2no9kqqrho4m0pza1qc81lmexivdue3t3ryc3vgyhzk6iqh9kbt3fdk8d1h2st7t8rxcbcbfuymlu5gblznxzii4xaq1jwfwo23j0nyz0fl5pkhoacamr0rcrx44ep5kzsjx0sjf01mohjy36675p3dniyn6ie51jgrtcyxgvpnx4g33yqffqqpsrinecqcc8i1rsizyrh2byvug4nmd4axtdoka8apvb7n2qmzpb4kfc64xx96visbbu7vtynpat7t6gli1m2rltjnffu78wasv65jps2b46ieeztsztwn4h4s9pufz1coxw0ca96asjchdgwpjzfg1lpi3unftnpd8req46id5jj0n2amwlhwr07749uo3alx9mf59e1sdwvuc3bv163yuz9lawfcukk2m6riijxm9tbdbevt939ndd11v2xlii6bm3kktl0gypk96h'
    })
    parameterValue: string;
    
    
}
