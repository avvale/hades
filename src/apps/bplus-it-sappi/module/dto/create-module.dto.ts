import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '0f674ca1-3cdb-4a61-807b-919d863d4c0f'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '436770c4-6933-4d1b-ac26-537708dcc61e'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'f9988556-2131-4373-84cd-e987a0b26999'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'qry5oi0neb221ngg0fxs'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '02e94267-39d2-4a9c-a6ab-de074832770a'
    })
    channelId: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'q8z6dy9ge4net9qrccol9755923jc8y1v6qhrsuaoxuln6h9wz3auaphk7ij7av88zhpecyvg82hi4p9p263w52qb57ienswiuekjarbca66tdeczmlk2o9h1rsmwhil57lbo7uc04wp02dvwpgn1tx7yj8jw47t'
    })
    channelParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'm77fpe0wo0shi1h3m128a2srbhbz1lhe29ii61tay8ks5cgfo4dvrztvfqoijsjyfyke8dvkw9wp7p44q6ti7u411q20629awuetxq48yf6alq3bjczmxddhb7tx2u3pmqiwbo2adp0u4v9ctgvhsrt8vzkx76qd'
    })
    channelComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '8bnznujcgnuqnodio7t7mck6h215gtqndope0cprzs0r4m0z4rzn1nau7oz6tr2x8q5x0gmmvq9xsbd6zx0o2c07p0ohtjpccmdac1klw84tqqprhlgayy087pwzcp41hmvigg6rd296xhojti55r5mnc3xfzlt9'
    })
    channelName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'wnyo8fttf4d6r4ypljymxxmn9ronr2dcfy8hrd2g4gekg4ujpj0zrxblruqros2ku8t5hp8fi5namlon2jlx1tt87sfxauwkrjap81rt76mb32xxzwf96nomqfdl1392757943jc7junw0slm7ee2to5wvnmj6cn'
    })
    flowParty: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 't1gagdsaq1zcpzxbd0n64xbzc2cf9qvic60wjwzfgn8w9l672sahodx5knpq1a8p2t2jbbjz7aw1ojvaoorjx029bdkdxopkyfp3n8ok8r1gjis7ep7y14xoruebygu6i5gochstwv4iiejbzi394glv6kz47wgt'
    })
    flowComponent: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'vrli2ld71sysiojo79xiu1hcghs6v99knr9zhpmyeoftj1nrqnyob6sb7jy4yez1m4q3tq2hytqj3grwhm72z1muig6w2bkqr4wtqnr8ub3j0vttd06lr5a9ee5nmxeei8ume6lhrt9yz9dnsrn94h4f6nw4t16o'
    })
    flowInterfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'c01bff6libgya46ohe0fou2mcnhido54rhjxzezz6v8n3tcf4wh3471fgauy3dfsub6zg4txsfd61fomyx6gfx675n9xfc49dj1znbxrtpmvq2otscn8g6sfcq07frkb4z6365x6td2pwuk9ue2j7yl11m7gdiov'
    })
    flowInterfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'apny0x2iwdbjjjfi09grrusisdjtb8v8449k4d7ue4k442xeu7tt1vdn1njrwd9pc9p78skyxm7z2f46sce8sgj5tsgji6e9gletla76ct9ihlzrlpcgdb6bvhgp471xwum5eludmnjp8bc0ctmrcuhbx66s1qw4il5bfoc4w2w0pft2fc9dhacz3yc000ncve1b9pl463i4ks9faj7a89euvy7yge1kxcl9unlaqodhh4caorrjnlggdjbjj08'
    })
    parameterGroup: string;
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'g3kfw3tdqpjjo9tlydn27xqasn9yvi62z845orvzopa3us4tdeknubf6d5g1im3tf56ty8y1jxes5999y8z7fweqymktpo5kvd0ctud2pizucbwpvmifbgczjddzm6p9zd9vqjvxup9104u9o269a5sz4te7hvmuyw9f8iocc50vsgal4sbxjo06bq5sdzw5s0qc9rd1c729mpewfe3a8ag4srw34vjoak77s57qy7h6p5dbm05b48nbrzowllmygavkmsas68f5u65p8bb5xnpfkaopg471nz7le9bfu9f9ckunxopdmo0wc5o0i3nx'
    })
    name: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'oh6uz0imtf2x7g3tsn32lyvju9v2632mz5ccu03kogxdfkcukbf01a46vmtr45jco2wmolvu9gq27b251uqo76wiv25dswe5dpwghcqfl7rlrtqiywjxoxe1au2s9t08gaupnjux5xofznzirs4w1x3j9rokyyaoznw0hmkdhqj2hwfxvygkymlze9jsa8soenb5fie6b3dnmxu9n09p05tago2od5wi9y1v5k8wan4dvbsy3loopk54fk7mfnwkeryx1z1lwwwoov4dgrumv5ze9p2ywotmmnclmui8c3ura1w6cvyjozi13vnpln81'
    })
    parameterName: string;
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'zo274oad3nt2pj0ssb881yhv9ff36zyge0hf0guv01m2v5cqbpbq0m35ihjqbnfywhmflywaxpqrsi6qt36x7ow4ej0xxex7q8i2kvdv2nyl8g3k6fw5ssvq1sflb4f0xwrgdbq7pkh6la613q5s83c5pawwcjznjwwe336zid2ydz2d2oop2xv32k2lzplldkqsfqipv3yomaneyrnv6ho61w6nwa8xsgwkmcajsxygae9u64bcklut3s0pwvgac8n1io2i1fiipxg0ih77gfu8coi8jhdem8796jed4qa5gtkdd4ryusaqys1rjp0568tinyagsaeqe4e4lsyxaaug4yicb5yp4pi2x9tl8gqj3exvm0adi0qxi2rliwe59hnzigb3w53cz8kmmhj0msg1ci2casv9j5mxcfcxqtnc0dcawf5xwg4u53gk5cut5ntd9f8ofvw42btzhi90yqpey6tegy91vv9gw16bmc4jpjqo5nl08sggripjzyncnhas3w6s1k2y8ebr5rgq4inv54lxbp5hg60ldsitcg0kn3jgm1ry3j9ws3ljszl3zaqa8i11pni06lx7i3cj4b4p1yn46lxjketajfu1z03zawmx3d3vza2wbikjfz34cd3fcy32dnoekitcr9nqjc785biub9eznfku7kkogzx2l7om4gazjactpgur2f0v4jcq9c9vfsxr22tsrb2z2c9vw2rs31ucd2thutpzfv06nae0fjjww8mxqqmy7mgyfn3ejrqfbdasgrj9ylgp3wqiwy0ys59uwlkvbpi983qzbfmcguo11hc1m4ifg92fczd6i2iy9osd2aojy8mxbtm978z4e9cr90kk4d09hh62ajccdm1rjz1l9p9slkeqp3pr545cmlcz1kprbcpji6twsx99bf7o4c3wdf1bwvk24k09x3xpeh8l0tmdkw7kqrh66oa5j63vieerp3npfa56ubeq71btyex9elvq3dalc8q15nv5ymd0liy0o8kq'
    })
    parameterValue: string;
    
}
