import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f26d5b55-921b-406a-8cb0-d6a9ceaf4fe3'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '1787f2da-553b-478a-a053-4391096a0367'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'nygyaksr8chpfd7yc03n4f2jl8r8ek4skx2gkjh0o6hxezf3w2'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '1abcd568-4333-415c-b2d2-66cab2e5f8b2'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'ai695tb4zrl77kcrwp4o'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '084234c9-60f8-4fbb-8be1-73fbae827d7b'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '17koidns775620jyz1jefjoqymslbo6hujcs9sfgt2uhs809vpsb2s5t5po2h6gnscstgg3murf2fklzdal18zb858dw39gggjk2h0ex95qh6h7k8i1mbintyh07vt5r3lo74gcqpf3vb1ulzyspz3l2pca3q633'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'l4hl452e6aqgcxyl4l1604ndr7io3obo6dfz3g2hmp5nwd53jgiwtcl828dsh7arukmpdr5t6nu5wa7cxc63wm9i0dbfodxnwy1d7hhcliygifa8fmna1sghqpqv5skep75sxb7mvhwv1xxop2e51nk0bfug8fhl'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : '4tu54b3151yy6vq5lk7blfhf9i4wdpfafozgrkaf5bk7n2sf8ssf8s61vvlqtmdxpbrp5yae2mbiyoxbhyr3tk9mep7eyxwo1d412q4eow51qkcb651lofx25b8uqu2pl9vz636f26uxve5wk8uzfg5etxu1d9p6'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowHash [input here api field description]',
        example     : 'n07f133wbnba1zet1x9ctomkbw7bjkav25j9dasj'
    })
    flowHash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'r59m1sa31qzd1r3t62pmnf6njrgrngi3otgpohcbgh6qtwwd1l0qgvx9q7hnz3dsudxvfiio0zxr3sagc5i9636s4grgmmj3z8zedd7387gcea9dek1pk17hllnto6sdbnj5b6xcxqm9xftle8vm19vw20ola7ly'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '3l87pzimotu47if9up1ju1ko3pnjcuqhnfcqqze3egvnzumtbm829mxcjx5ye2lep2yqomaaeo8w70lcyo9psnvffonld6cyvkut90mxjo2knary7kntyqxynaumej6fwcsmotuf15wbr1u8s80xg8ar1ceoourr'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : '5og7ctusf39o9yj64tl8irnhzw38p2nzzv1q1wn3529z5fbo43umdjeqjlr08gzza1jvk33rud8n8ivj3bjvmgd2j0udhcxa3yzkqgno1qtdi72uyxcnqco2or7c1f50l9iobdshc2kw9mjq93vcsv8cv75awfzf'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'j6suu4amue19h3b3yfaqz4gy70d6uxfcfspmu6hm4fd37zy6oerpa8up0sa78juvf0o85657d5xd5qrvo6gu0hgz12sqgp3pvgm0men98varrt8el7zhbljz1xc95f020s54w3l8np0ri6g5lpsd9o9afxc7xa3p'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'mvp8pk9x0f4wtgulmwo6'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'r7dl3abuia94zvhvt4r1vuvv30pafsviygm92i39yjgsup3fqrlcmwjltzekff3g3paqrsw0iz2k0ho6o2s0qzzx32guow1jf0959qbvzekbx1i7f1x15paessr3ywmg16xd8zxbml5mwkum5d3aq23xh4k1eiklej15xv9psin6917mjtqpxjcupimo7bfkfcbkxpc3hrx6mmr8eggdlpwxlmooqj2jg4260vjiir5llkf1616di5xtw2v792s'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '1t71w6rvldqwr13ubrbwd8frxejmduc0puuc4trf70xbk63yuz96st8ebh105bw5esubbg9dwcq5kmv88rus6qulc8ncku7367xtbl7vgx1vxzgtsjvz4cnl9qbhamy63mqimecni2by9kbncorcyfpictz46eg51waz2n27onvn645sr5dg5vj2pozwlmjg6jwjnwwqr1txledlu4ebgbfqlobey1odvhb961m6mu2xzveiltneqm6y48aemtzq342rsoj3lyo6q2xmoln1yabheoywrl32j924j50l14i9h5emxt02uwf0ue6upjzc'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 't7bklz8a90sdn5l52uk6ahtnmk2m33flw0fl2baun90utdesptyaye8ibspdmhnd7di9zgei345eunp0hnc1zig21zod6kv65vb96eps3sqwawfpc4cqcji85kwfb1vtmcx4wc77kd7vwm1fu8dvt1mfnkx7grwbv3meen6uhw42y71kkzd653rd5n29isa1so951am9eg96bg31zx8n4wtx6ukuw6sw30ev4vsdpcduo6djgeso0dliu68td2210vie8oh0il70hutn3ukn2rtx6ubiv4kln5ewwn6hzekk3wpd2v4bfhpkyumw8v8c'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'dcehhrkrk1b3k8h9zi037xb427mmp0bq0txgbw6pci8ralnl3igkic8ryclbrhdn4zy67oibn0rv2gj6xzwwe58gyay4cxutnru2gfk7tvrjnnuligkfdy085xqvh3bok1ci84koxc8rqswkz6367rgx4ap2zx5yjify5upgyu2kr7ysh3x9a6pstbd4f58msg6bhoda7lr28sqwlyxzqqsspfvjyu24pmmb9ieopny1dlpi54z8575q0rv19es67gahnbp8pbr9oxq582osmet2simeuhayz2c2msufoklr4y5pqgxrrd5lyb4wtfrejtaig5htnlagosrmouy0hqj6emxm5qp1g9aja8ksglhf0n4sz3vrel9hsyqij1md1jbj2abn01i5mumrmla7z75wuz2fihkous1he9y11hyzpl3aoavie5peq8k61geagnyn0hgy710bxr7eaeutbauanijc2dxobheqdvacq9x6y4aqjmyjr2lhjsqhlieijmzddrs4h5gnug1jmar9rhlz48kjtljxqbqhmi7ev10aofp8se7jxiqni8y1fqkqttv7ac33ehuzh3hzzxvzhimp4ak97c0h20tt7wdfhtj7icb3enb24gu7wy93vnnzx7tsvy0zz0cq2a04ulc81xev05suixmhpxasvfuqwjp8esium8jjxgfdivby9818z0k24vzuva71fsqchbh1548z98t84x7qk77uu2wkmiaavnpgi64m81exv3ontmnrowq0s3vo3zk1iiwg0e9kfwju66ys7pcmvi8qxuzwiannvxxrq2tutdb8wflm6aw739504eb4igyz1ua2spottgekfcukwcxxq8zz52y15t2a0smfk6s52n1b0be64m1gwa0eo3hdr9dvqphsleh945c03lhvhci27d7ddti858osrhcheid8dcq3gnllcc43heapljwxggu8q55sygzdq50sxw9kkpteekzm9i5eag219nsn8hum3tjhb5c62ede'
    })
    parameterValue: string;
    
    
}
