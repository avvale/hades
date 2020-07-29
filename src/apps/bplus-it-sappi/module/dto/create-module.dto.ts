import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '29e4040d-242f-42f8-a1af-31d6f5b953c9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : 'a07d97c0-4c5f-4e17-a539-6839ebf07b7c'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'kpr4v69gaw3kevb7v25td08o0s2e60oxnfkahd4bzplqg8goxm'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd53c4c82-89d5-4a72-a011-5b34937c3ff7'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'uvbu17mqotzhi0ogw27p'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '01b5b256-9e4a-4b87-8258-0e53295fa86e'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'z1a98kbo11hpcbo6pzr3ngagpfqkkpuo0pllg0922s0uwr13xfb848c2q4ckqdnvgncwgl1g9gu84cn93jz82giiddozd3ipf4lvnykt796vkb0iui13cbavpey1jwcckjl26ys8syqruaapfq8mn2wwlih10595'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'ey1cn4kf1e7ch8sku90hrvwt7q9mgn9itsin8odm5vjvsoys3m110ety9anueo3h2we96hvmw8biz950tfnmg05tmavkinyyowojqlptfhuhsl9y96btebn1vjnr8g9ywnyg1ssrq4b3tly59ieyc34jg9jnjn8d'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ki83odeteetio3a9o02iyn30o0g8rfvsuiqvdlfbz7jb277zteyb295aumaj4wkye497v1yioscnc0722omt9ns4j0w7pywfy93x5qfz7mxc12h9iyo4df6yqiy04n8px0csu0o6kigr8u26md7903gwoo9f0l0j'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : 'be2c7a0f-d401-4456-81fc-4198c6661f75'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '3yupjk9041lysaq1x0edtgta05tb4owo38hws4zjm1zkxb34sb0z7p0fo1erd6uqa3hxqpniglycfdxb0gk2p3qt8az901xisea5dxs5xc5sdts7uqhmxwdtm2df46xm2adv6lswsh2e5z72u67mytl4gajq4a1v'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'qqo76h1i1ixynnuj95la8sni3zcjtmukq2212rm1umr0c1njldaexlyr0ms2yrrralxggsql1s0z5nu6g0ykf3gdal6yd6l77zjdnt0fxzpq6ikrkwbxxd1ss4ddeotsom6fqiyd4fv2ebiuci0fbo907aw8l0wn'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'qkqabz7bp672n953aa3jgl1pq0kig308uymz7h4dh0y1rzhlmuyvwxh1xlizulzzpdqljo1eqadtgidki00renr5sscedqtnhpx6q5m6uyqtihu1yhag51ff7vvvr60pe5eqorpjdvy9lmmw8wsltq50j2sc7ews'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'zjauggnmdzrgyhylq1yw50obsekbxeok68b8s5f807smy14uur9wbqa3pw6ax07w88cr1myy9msn3yzwuqyecvggehf3qc446vfw3ac8szj2dw4xlvg7ssv1ly80rviwohnhyo2ojxqtu6s852zd4ewzj0dbx3qh'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'kjzq59q1xzz8uxln4to5'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'thmgvl0xo2iw5fpmuvwuez1bcz3c1q6usuwwatjr89nd5qyr68gync8oszbgzn2bjminxd9r7tbt1gw1r6r8cn86ijvv2qxh79kkp9kshl7x1xo2hkhj15p436hf5hknvz1qr9cl86b1vpqgqc7tzshkkvj6mcp4msjc66a3qw7thwjcpjyyc8zwtzhbwejtd1oy1d0649mkacky9ffme4vl0pgvevyks0c62udc2177ajn6xvtgosfggy2tjq2'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'k7p3vvijewthfm3dy6jf2l3wa21r9wvypxeuta9ros77jsxgr45uc4ga27zaepsdfyrlicfjhxlk0vx2wnx312nllmqm73uhwi04zx2gvazfxgz4kqmh0ocugu8j4zeggmh6r6r99bes25slomhee1lvq8tnwpf6g3mgls7d33s2ttq8u8k5rxe3omr29sb3mhuf0jy5ep1p4cg0cu2ufgadhfgetpjx2euk8h2ixh0y4uk1vm4jea5z3z554tmzl2q7pxqnu37v4wiihd94mhtgauuexkqp2l4ilhbo4l8zfxr7b34kx3d3ocv6kp52'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'xi6qcllbuzksltq0a4oe7kbm0unsnh9b6jvk11489os3fd7fw6oe3tsy9tf15bp3uoomrg32k203appvynn1ota03r1pghomrr0dyxoi87t3hhfqa39neqtwczab6t7vo3hht70rpxwdnkrg70noaikboado3oz2tsjur54z343y0sumed1748rnts0lpu6c88220sh5f49y7nshpf88rbldmxbphiuj2jz7yvg74nke0l4ujk02jxj1uvql94vrz5rk9a6o98n0hahv6ppll2y0ehwjsqtp3mg11uoz4zgoyirxfqyztt1oueug3fsc'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '6qpy9or4mdsl4hmxo4iys624cv0e2kjjcucln2q34vhrg8b2wsd9bg13ltk4aiy7xz9h9hertfc5ejeod86gxkonzjft0va7vghfnm5abi7xfjq8lv63pp90qaxkpdkkevzg2769vuwst1z1hypgx6i4uv1oig04452knc70uh9es8hwdfxz3kqkjuwipe5mvzehdug294vii6txf8exm5mqukr5tk230yvk8bc0443580ov1docx58p1kefhr0kp9rk7iikiffymbld3uhjj6nmxczah95s8mwge19krp6cextmim7xrj4vc6auvgay169x3jto0swrg22d0kqy9ncrxkxd7smwlyqln2r3agig4uyen6xfjrdlrxpjruv8rfrjoc7ed29s75allyxttwqzs3aw6wvih1ak15bybn6iop5pnik8xkteva0liahmot685w3nsa14adnrr4y9xkpg4cctejqu0ovitrild9jktsnkjo8689z6p0vuvn7sbm35hk3m6gh80h1b2j4lg456325golu3i5alxg0mxggzck1ucr12hypalamspf9usqp0f6xrw1q3l66gc9vxb16jtktqz0ao2dmxykceybcy2ygwqcienfstemzx0ok84w85j5a1e4kb19j45f736bmg0ci021glve622z9szl2v7kx135u32mg1qg8k9cbsgibo14we07arufymfl6rm7umm6bsbvlsiv4z6u7ygqksvu0zh95twd5im0zx875qsbj9ms2sfhvtqj4q2x54mtfziljggi5hia4hgutwdzz7e2h2cui1r4pf471sizowc3he314tqmbu6t88kjfk4mpv8lo9s6uwph74u9ak9v9frnqd5pdzrnikjux52tmdriuruvaz7k4qhwkkp8fhs06cxz6invxi7yc8vao8x76k4uchx9qz24os4c0vrxjcud0v1qbvpd9ip1f7j57rekgq8pqa6lj873i0ccc009dd780owf5nzhql9x7kwx6g'
    })
    parameterValue: string;
    
    
}
