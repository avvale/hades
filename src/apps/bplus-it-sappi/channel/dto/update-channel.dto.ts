import { ApiProperty } from '@nestjs/swagger';

export class UpdateChannelDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '5385dd31-7545-48b2-8578-50479909afa4'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '36d23852-dc7f-47cd-8244-16b4f5e6cfec'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'a0dc9ac5-dfdc-4150-aabd-b88c552926af'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '4bb9lukr3f071ndh3z2mt197yneg7d50zj2lxd81x6albi5i9gyh7da2d918lsgj6al3761ay5sjenfu06h2ui8w2k0a554wd6sa9gy4c7hvqe2rz3l5tt2m7whop5s9fy1ycm0a2sy5uxojdk81p3f4n8i0a2ak'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'bzj4t96hgk73u2io9cu31mtl8xop94ubgy777zcpabg8ed6o1rot3zx2axmhadihlor0pgz4am5huzhl5j9dp2i6lfpsgafx1q4c7wdnlhjl45tuak8x8ggjb02zcr8wdxrsudh6376oyuu831z03rp6ez38g5op'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'rr8kfai7kpmgipxt7x0n1ibwajkz88gv59pvcjfdm7a9m4jtn4mk2vz7x85uc7ucajw0of64pv7q46mz5wlw5mf5apcjbyh06pug9pf1apluhvwxvmmcxmxvonjlaed8nly56i0r9sx7jo52wzclf319vznjs0r2'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '839n5qsxebvz2q6gz5s2h2wuxwobapl3yvg08dolkusju46ylgpmkv2hjhll7xyru5rz6ll7dbisqsruae0ziwwqbk09v4kdldktvtsj5shl6fdsr7x0fom9ysbb8lskrwnny7cx2dp6cj9ngnapxo4z33ndxchd'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '1d53k5gw0v0nfso1nwe2scsm25keqzldwak9blrpj78frv8hs7uuwgajsc5gsx7097q8e9xm3omqsque00jf33xpaq5y7vpidcm0xmsvng2fscu44l4hph8ujt7aveii39x0vjjsfnc4e5v9rgvbsd98ul9eopgo'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'emo7s248a6vec4xbgxuuigazmydka14rwvls53df8so81ubqcyzkn4kxpgr76odsopjii3o0dr1goct9eg603sc8fkax5ub25lrankcfa6f6hkd1e0tv1m8cpimbpd19hre7skrim5w49ib0znxr4awr5fhzcoma'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '3wit5ozyel0uskcx3wcanfhpr3nz039148paq6ec04x7vo9fe3qt3j2p1ioapvhqpoolv0gey90765rq2nydg67kq9od6uzda3bebhch5eabeid2r2is82vod9rqulzvh729csiixgwfhzp4korp5am21u2cfwfj'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterType [input here api field description]',
        example     : '87ner63n9fo9xf0mn10ixfjosfma1q5safpagmaaghel6jy5mosjvbhcx9yj'
    })
    adapterType: string;
    
    @ApiProperty({
        type        : String,
        description : 'direction [input here api field description]',
        example     : 'RECEIVER'
    })
    direction: string;
    
    @ApiProperty({
        type        : String,
        description : 'transportProtocol [input here api field description]',
        example     : 'ge53wudmznjxn9vywvavqhginq0brm9agaqap6v0h53zonej4h0hadlxh0js'
    })
    transportProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'messageProtocol [input here api field description]',
        example     : 'u31xd9of0fp33kkosrcczocu70j1jlnpywlwbeie3h80cl150st9qqpzrrbe'
    })
    messageProtocol: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterEngineName [input here api field description]',
        example     : '9kpwng677qltmqri9nia5ip2qere3ryhkabbeay6jncl7t97bveoa166d261y0vonst0wz65o06o5wa9ixvr3blww40st816uqx6h03857g711t04l4tjn6yxqgwb3oo8nw4cx6783c9746bd6xolscitpcgesbk'
    })
    adapterEngineName: string;
    
    @ApiProperty({
        type        : String,
        description : 'url [input here api field description]',
        example     : 'x6v25wdmwmwvajf2keawgagzqxfhf9ktzee0jnbsh55gcpi9phtc8hafsihisbsjiq73cba39l6s7xq6pddy1qqdfpndozb1x58qglimphw4nn3hjan9ato2c3k4hhzzdfhli4qrnync5yikyozv0sftm8hlszdggdsd8ackmtw79romkr4y3yo6je96b1wvwc4bbf6bdlpx4q3fjfd7w9wrlms78gzycl8lnuwnnaabe8l01lwuyy8jnxnp4pysun5ia5y5mv2y5nc5g3rxj2quconpyzjxknctg4pidjtznibgn9jam8y2r19rh0o9'
    })
    url: string;
    
    @ApiProperty({
        type        : String,
        description : 'username [input here api field description]',
        example     : 'u3d8w4aiakstn0f1yiqwxb32169ivjkgc9fucoushr57ykym1j38ds0zhn46'
    })
    username: string;
    
    @ApiProperty({
        type        : String,
        description : 'remoteHost [input here api field description]',
        example     : 'odqkmcjkap4isjpen149sv6rfnymem0p9yqq436j1fw73lrkgw51mslaq3wnohbqnfr86vf2iw18cjuaqop58svij5oguj3vv7tnlh31gtrkl1m31oyq1z655wd7unuv5dgw3qeqhg8bqn6b5ag1co2yiqszi29s'
    })
    remoteHost: string;
    
    @ApiProperty({
        type        : Number,
        description : 'remotePort [input here api field description]',
        example     : 2729654724
    })
    remotePort: number;
    
    @ApiProperty({
        type        : String,
        description : 'directory [input here api field description]',
        example     : 'oc13ja3ro748bneh4b6e261fpqy4yq329y32ot95wpi0i6un2qlqf35c7wmr8ze4errxv76s3f9aim1qfy0rljb9352ia06l4ojv620pbtf5wz3jk0npeclgkq5qjas8tsuj27uad0y9ez64bmv95n6w5u9191xy6jqxcneg63tv878ubq6dga48m5nfgr16oefi8gncn3oiclqtofcjtwv5esrycxwtqzx5hw6kg51ayjfh4ic90tril9og4k0tvvx2juy8xddx2edqujrhd3ni6zycmtscaki2yjl9oybwcaeu2wr3p1p3fwvo5odachsoxebpfrnaydab7tnfpruh8xnlfvembrvkkmu21wnbiuyovhf7rju8xx6iiu9h2w3gfb40ukb9a6pdqqaqxewrx0u0qbj6wrsu8mt8cxozqrwhduqj6dq7vaasdodepbzmygbtcaruxobppeqtvbs72i2evmokwtj3tuc77k1zib3a3nnptujjbsfprthfgrdnnmls5p4fd5cuscg81kbkrfy5p2mdz6ddg30i7bod8ygbpd4zdd6el8h8bcd5qr9wbqqb576bganv2dkxi7tgglfrmcb4eztrr8t3t7sp3xcizebzjw0kkb3xzttm8vvq9kjwzmakulktkbqbgadqm5uyucumjuxmvzozannxbemjzecm8by55a9avo82jmm8usnqoxdxulukm9c0dxs3cthlfmo4q30mpmi0rg4gfn1f7k9cwvmchwax6vzafxru01dxpnnap3ddbn8iz4qsjcp4kz4ksdy3g3qamutdxtxqnjm424hogoboyxyttm7n81l2o7gwqgl9gmll0ssfua3x04fq3b4d4qyos9p2eca2y038lx3zwmdf8kq9buf16fkb9k8o9w0hk8qn1mp7g50s8kc9uqdu64hm0p8a95n05lzvgznx9sa652k0hpfllr8cayc10km6987ylfwzfodmwtkg843stakpn7ejsdnp1s7ebfo9kiwqr21v'
    })
    directory: string;
    
    @ApiProperty({
        type        : String,
        description : 'fileSchema [input here api field description]',
        example     : '5ga0gadamorc6v5axulqbu84jgbftx5ecwl9r0ckz9ptcfu38nh69xm7drym95z4ap4x3iv2vfvcvg677z4wxch1irhqtwfsgr2mq2204t4jzc63jk32oqh2xniud6y2t1eur8y2hd9l9yl6sv7p4ahbpajppdh6v0iy4p9rjs6kp2inxegy627i7hy2xj4cteie57l8l7zzq1jshfuwi5s0s0pfykuryv9r4gb0tvj1zs0u2ml8pm9bg3e0q0ot0b3u5jsb8sjuanluo5xtvi923d0eqbh6fblexa82usgo5edmlidy1q1uil5jy77pe478uo8vs4ezv1uom5prftboa1qzb93n6bfs5s42bs18og9amsas8jr1xxling5d6csk02f5up0vn7jgtzp9yk7zpi2f207x7bdkwjl5dzzj4iup5kxiklbmfok6xwxt033qmptbyvqxz9iuwl61nuqfgq8hc7ldg2khc9xectz5jg4oddpm3oq7gwqc94zpomn4j5wk8gb17brd20g40233siy2vvyqgk5rp8dpkaklf5ome5gbds07ahczphc78pm79ehrxibykty8ir6fpskibc7b36fkz3p3b3crfcqrszuv1asi1f74ujeq319k455o3q4yum7mv2miovm4fjnigjs8woykqnbpqy5cm0zy3fhh4q300i68n5alfkt3xev0bpqsv3dlvxw56t8ydm56hbnp3he4fa77a8pztj15utzjmi6dqzpxjsbg5fqx6iz0hvt8rygudai2n78t30oyos73bcvuv7zfkz5aqjmui0p82xi8mimwpxq8efmk20letjirsfa1t5nhfr8vta2cau1nbhtrl2eks8rpvyoltf2287va5p5nt5xy666w4b16rix2kvwu8tdtlv96c8296hedophckha8e6p8h4gza6tmeu6cnqgjl45nr70ibrozax2l7esv5x0euj0vzbdvvltxuaidzzvvxxhtv89guzxyqys6mu1nrrpaqw5j'
    })
    fileSchema: string;
    
    @ApiProperty({
        type        : String,
        description : 'proxyHost [input here api field description]',
        example     : 'z23bnpez2g7zimn2aic2ebwwh2nbwxph36xr2qpjor9feqvxmfh719a1q4us'
    })
    proxyHost: string;
    
    @ApiProperty({
        type        : Number,
        description : 'proxyPort [input here api field description]',
        example     : 7524461867
    })
    proxyPort: number;
    
    @ApiProperty({
        type        : String,
        description : 'destination [input here api field description]',
        example     : 'c9963dxhgtyd6ygd7hh4wunl25644fxyni6guavy791r22xqn35fh0315pfll0knm3phckbufok4kujpgxuqn2kfvblag9fzqfvk3qkn80day2cw3exizjtjhshn98kgzkewg8d0coohoh02srstjg13xuiftljl'
    })
    destination: string;
    
    @ApiProperty({
        type        : String,
        description : 'adapterStatus [input here api field description]',
        example     : 'INACTIVE'
    })
    adapterStatus: string;
    
    @ApiProperty({
        type        : String,
        description : 'softwareComponentName [input here api field description]',
        example     : 'cqwcfpbi7byr4dth0wst844wue6f1rbub2xuqw52spixk370ik80qfrkzyfkw2gq88qtl17pobsd7h3mam50gua1zg4j1tpor3lnnpcddq2u82pfzggmmq0gcc5aj29zhhas11vu4vb67bt6334gsmtzjj91q2u2'
    })
    softwareComponentName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccountName [input here api field description]',
        example     : 'aka8l04pmhhhzxk8vvqt'
    })
    responsibleUserAccountName: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'frbvdcuro2juyxagrga8'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-06 19:59:10'
    })
    lastChangedAt: string;
    
}
