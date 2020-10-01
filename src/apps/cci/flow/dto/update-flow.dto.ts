import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'c45f4620-5513-43d1-98ce-01a1f1e700b7'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'hash [input here api field description]',
        example     : 'lfgiv4xurnwqlgzvi3iw75ldpbmmbhf32v95pmzq'
    })
    hash: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '18e4cf70-7135-4e0d-9d1b-52237216a034'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'vzcmoip5dwcsyd5n8sdzvkbt2o6135ycaq3w2jkomx9081zejy'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '3970645e-f8e6-49ab-9d26-5f471736d93c'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'wpj7x6j3uwjamhx5uw0z'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '9ntde5mq91wra2nibxjf'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'kqq6oklgx0kswr8nsmjqh6qzd1h9ucrfem70k8h8s5ugb4rxaw1i5p1wfzfy'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '1cq549ud8krpwlqbhgbottcnjtwlye2zvlnwm9ce3cnbl34cnxn12926txx5mu3tx9i8n10lsh7vskm9ujcfk70invxo3z3b3czd204srmrkwtosfmhicdnyx7giu678et0hxcg8rodjf3mmajuz8mstb3ossgwz'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverParty [input here api field description]',
        example     : '4imktp3ech4u7213tqmuzuchp1znrb4sc8jdwdbe8wc01oi1k0qxprkwqi7vovlct18q7gk2sfwmrjfeqs0xlmg9el8le9fno9gjceei3lhaxqopznnsm8awg7ztpldd16gwy3exllylrmveqgpxcu6hngfjif9s'
    })
    receiverParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'pp42wim2a8qslk41b51082jlzgj1o1cylo4stpvv6a07spg1lcybyz46lggbfh2czqkw94dvlpecl7g9ev9314w6t1wgjb797o7b92ad4gdsm174xm63s322wvy9izfss7czy2mgc52xhtj9iq29h6li5guv6n98'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'receiverComponent [input here api field description]',
        example     : 'u0mbh1am0hjkeciuui1gjare512yz4peeh4kzv2vzi5fkrse873vbspcxe7joikgz80n11k0sav7wsaopz7wjqm3hury5b7gqoxvcyrvwtwa7ribs6y76ao4rydf0g3rkjg83rfjg5bz97rul9oemlwl5xclkw5v'
    })
    receiverComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'v27cuhmg3i4gjp27uqkt6h2mwkvskhzcruuaemp3b8gydurq85ellf0nmuycxm4hwy08644izzsghsey6xlcinjs7lmsdkf4dxyws7um996oufzfp2hezz0uvfp6fbbphbi6txyi973yfkefv2c3ejh51eubwktx'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'f7he8jurvzgoqi5xlyufsotxr5fk43ktz5au2ted8wh8km4ws3vwvgfkjyy2s7s75ornl3fmu2qjnuly3scr7ztrzazjg1kz3x9f9v6zhozvlajefrj6fcuz8nteujq63spvgpbafh0o6m9jng98zdhq0daulzja'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'h0vvua4yckpmt6ttlajhmq3bnvd6pr2fqz6ksk3ky69zb4l0dht114dck1wj9xovikrwmkie9gei2q9d7qo5mctpoqvuv7ped8pnmclc4zmeljc7bkko6g4w60gfelqabjgxkfozd0dhou1e5z6drwf7u3j1pmhj'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'phhj6gr7r22bpt7acg1q'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'u28o54adzctx056h01zr'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-09-19 20:04:41'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '5n9jpwgtdw6gjf7j1irqmslxdps4rsbnih2gm2mejkv59pyprwou6uyn611y1nrvch47vn45eu7k22ew1q23lqxy0krak1ni0zgp0fb5vawxj0r0hw2xwjz0thcji72idid7zryfe9813pyv9ma267jbvs3ppglekw1czpu943vwlm3yply0uzv54rer7557mj5ia144jvos9cljoz4twzaoy20m85wkhq5sob5quwbbzidf7t4qrgxw7mh9gj4'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'pw9pw4wpf17m6svaniurck85ykay1xpij1j9pmvrrned1nd2eq3r5h71j62u9w3mjy8itvi36xucp7p6zfpyypgvabs9e6h1gwl1omdgcfkx2snlyo17qkos0sjhl5tv4gzwga2ovz85gdimyh4ufd0tdpras1cf6ycysqhxcrpn54eanavf0ignyy9eeuptsh2tgsrsfkvgvfrqv35d6e0qloq33l3u6jpqxxeqoi1l4qtvff7xe0ftqob2riw'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'alcp2lap13e2t89wzrh3ibbc87lzxrwg1cazgzcts1poldi6zta5gzu132c5'
    })
    application: string;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
    })
    isCritical: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : true
    })
    isComplex: boolean;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '42257f55-fd0b-4fb7-aee5-97c6b677dee5'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
