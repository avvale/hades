import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'bce0e175-0e73-4e47-a773-429215ad0f63'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '04cd311a-5e07-4503-8f07-e1390e4c8ed7'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'xq58bhkxtylfe5d8kzt2jpc30mut7c27gko380po2ndivzwu7k'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'b0407ccc-fe31-4f1b-8421-4fa24ffc08a9'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'c2zdglvybjk1ie8turp0'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : 'd27e58dd-b8a8-40a7-a121-0b02ac7bc6e1'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : '056moasvkqdj4jntuix41ykjrie9ew41w0zsym9cd9q87m64xejltkmdf8ik5pklo10lkq9auy5mzvwr529q7rm9axu3xs42jpz377t62bqf3z75vf0xu6njvxfpp7jpsncyq4y6jn0hniu7qr1qj055xu6dmq16'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'rta3iiq1bt1bnmg78oqc19bs1wz8kjk8pjjkv4a7gugdvub04sbp67nw1c42itcwkzozuibf18qed1wpnv9c7t464sex4b42gx4wgs6vmq8b38rp87zaudpdwe4t909ax23yqtdry56tk5uwjfxqi2bvh3hibdze'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'c0e2biddp4jy2719ny7vg2ckx668r80zdb4k9zqf8jngxmnx4xkemgon759g1enpyzrt5d0u8kl3ndy33omg9ixied3yrfp87cxvx0m0wozacw44ezvr6r998myf3mkdtzuzm4n2hxvsimg1ladphoj5gz424v4e'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '37d2fb5c-fb23-4e47-a29b-9f1386ca9ca8'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : 'mupm3whu12b6fv4svkwy0jmcm0ujypw7bgkg13uwhuf6faq2e39ciu9ux8yadb69bes8yq444t8leoeeu7olbl367p90qqz9zignf2n8ieg8baglt5vmlyy4z1s98z6ndb907ssqqufjm3pbssifxr9676ql1dpa'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : 'j8ukmgkceyupcb7uccedlpgn5e4di40kj14c46ilas9z5mnayx1n4y8wv73ma40ys0e542jryzndzph4iqj75bjnslgm0326o3t4gfrz7gf19g7iu5rjw72fmmzt6bvd04dhmfjdba4gm28r1avd80pxavb2rnak'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'xro1cq2apiwirh143m2ssj3bo3rx4228pufzlgfsjo4my6bwm2xm524j9ravv4yg6z43ydiw04ljbdenu7ug8qyf184j7wm16dhiiwjdyagaz9t80ebggaqd5eyy7ypvucrijp8f92mu3w4vpkvl8by2mwq2g2p2'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : '7ziufef7p1e8qu4u9qf1bhligm94hgy7bfs5lwav5gfq5sv2alw1vzeod06w05mao9ykf3eexrnl0i3os1h0qug1d6ljgr27gq8t3p41c5y25snq1o7w4k1fp8jqfnhuaqvvh9y5fozyig6b6suw1ml312ihbz94'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '8piimeeuxjnpufdo2e7y'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : 'dziqpyc3f4eujvuiv6m5htkx6mlu8fxmubj4lvfjx4n2z1ajzwwpmtjju9pgqlw6lmdzwyzyi17eua6er0zdylqi3e3jtcnpzoacp4ov28vj3zy7wz1dzpcycm2ynoqcbagqlww5u6znbe8wuu2ptq1zefqzzv6mg14subemqxdv3t163maf9ie7fbwxqyqit111gru21z02uik1ypmolyll0deloo09311goz6968adbnahvgc8ucsbdxvi5jp'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'lhwpwt9kwa95iykkz2siyj2tjb6pey51yh3efce4q1nrhhztrj9rx9liafag5druqjgiptmidaxtd3s562pyw3pout5sl60a00dhl2r8j6k5o98tryqhdjoa6f1z0p5kqzs9ew48xo4nlnius6kifcs01ueyq4ne546mkijuewzkv8bkmaxu9vanrw8nd07z14yct61cbooyuz38h47ywskspckp1ln19gm4rz2g3cc9y1p7iov3emnpadk3gvopscdec6bscg46fu0rouxy4ij64u3yax4lyl7w3tgxpybcwxtp5nz5hmnexwr3bnpm'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 't64g3l6onwousf2gfj92r57aem038vq3zy0crlnyjr888hb6sazflh9v6bk7z7kf416rveeut9yxpkoxgdveghlfaqyrbk07ftzuw8o5jt8h5brnsl2632wyufng0yuusydxm6z66ik9vivx0q7px44ybj4beuxlzew21sd2cb28x35y1j06z7u4rz3xvq5gpaw79xo0p1thwsixegozrk9y19jims311jlrday34eyj3kyosqu1wglulbewly6qb1ruciun00f9n11rqbu9dyl7q4msvpbdlcol69ty4b399xf7ehzfkhsc4hz43td4'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : 'iln9p4empszegus9h9zhdcsifcgupobwooo1u7gzx3rwcvnmqz0q3labxt2u6i9wl7xgck6yur6mj0hbujo0x7gm1bu1jjk8r3tz452inc6cs033s76v0iuyfp6ffalqaaqu3kb58ecrqfhf0abkpn4x2aavto5jrg83yj72bhdi86pad8z70onatkmfnkw75s467x9rt1wkf4g6scscta0tlntteluw2gqas1nrga5d8qwnhqkqp7slzymlnwdp16jury8dojoms6nedzg4c07bf8sh5ksv2vubj6rxdsgtoovdpzatrrs4dzxvq4cosydn88wknl30f1w54ndasdtl8kd3c34kxkjj1ekqdjzkx4fc5tqvstkip4uomnij4440ngibu6jiviyqttrxgjqkjynbm4hk0692htvq4opgcw3ul2svoe01ronnp6rpmgyiz9v46aeys5w1n12owlv9v7u9xmb5qnib7ltqtidbsyw8eg3mlzh9vx7t6x2f2b5kg0ss2hb9szlviypzjv3rq3ju57npx9yn3tymw08cdi0svn2eoywiundiv7o8ivucmsoevjrf18tjy5qv4abs78pw36jt6vxld5do3nucy3joowxi1i61r1ucuu6b0ux82yoe5x7gnzq4uqgszhgtaaolurg7cgvrubbt5hbprkgz3s50gump0f8uh0hi5lrfq29wl3cszveskfrmymih55ajf6de2m6jxm70sr9vu62cum0253f9la65fp9pk0jjvq5az492wvq9sjuxflun9iz14idnctxugmcs75kfl43m91ol5tp54sjx47jts6776hpfcvb2spvo67uh35p64iyd9vd3ubk12hngzcekhq53p70axjpjl2i9omsb8rqr84cysolekk94km9wqevslrcglwb6nyf9fgp1513x0y26u8g0melyzed9jm9a1pela0bg123d2era38v2js115rzz33zpwzzpu4psy6hlnla3lzq1dynlsdbdvgsf'
    })
    parameterValue: string;
    
    
}
