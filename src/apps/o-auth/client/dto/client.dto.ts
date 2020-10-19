import { ApiProperty } from '@nestjs/swagger';
import { ApplicationDto } from './../../../o-auth/application/dto/application.dto';    

export class ClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '8327d549-c4a1-4f1f-9509-108d5766f49a'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'AUTHORIZATION_CODE',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'izg8sjw545aext99k9kla5nkcj1jn1myckfmsbd6dckqfaf8sz1aqh41ccfqn0p6iwikfc2erq8rlhgql3bxmeb5aqxilwlo4re5aygs4g5gj1kyy6y86z595bcsq6rf6iunlg457mkr0rivaz6ogxatmpweac5u53vqb7hvkm3dqdwha5hafdk6ts4mkmasawj2lu0lstkb8w7mryctmiwoqlyewwveuv2apnlhdod7zwesqhwzhms45s65j6f'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'goxsyv189piitiemtgeotr20p81c5j0fb3ykicgzlvpqmz0hthepq9wo38pt2qhsz11hn4w64usnldd0ttotrpe3mj'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : 'h6tt7aq69o3iwchpkyft5c2yxyqjzbvcm8rdd2yf028a6ayip2rcemz19dr2pdhx18r2pj7dmow0abtmhf0g5rmadk0o93bmwhcqcqt5i3dchcdd5ulrypjnm5awrmg7rw9sroowy33urtgnvno48btd5hcaqwry1rumg06n7vh1um2xtlpcafrp5me547rmik5cyds13nsb98oc8f5u91te93uywa4hvksc3n82psjm9xvtbufl43169b1n4seqvlhoinpccxz5ffwzjgn7rgh5pvtehf4mqgnaboj4qfdynwwqd6saq7iy0zp2912pxvtf4l5ygbqqgen5n6bi3nbpq34cszjcdn7bds4wg9joteov1t2sse596hoa39yi5ho39fy45j7ccfb6w5ljosuzt73ikmrmt85bu237s9le8y5d4lxr6yb0agelx47slb4kn4hcr8w9l4yvk4q8i97vk7vkff8lrp9g5sqwscz8gw0rzjripzthlk16walwph7lr4gwoom1mt36m88nqavbsonoy231we0oa8kv07hee99b1u9wfavcn79ih1c0egq0t608r63ofkhravfvmahez587u4j7yj2wejj5i8cm3l566z54p4ruqky295n3886osofkkno4zlfv9686udq01rzzpaqznxso9kos4x9yde5eam4wgsv9y70ue0emkwt98xnvmt7qvxcwn9at2qkjjn1eq3yo6dqu7yhw04xmcfimvxm05v5i56xjoereh91d2bju9nl3io5aogbble4x2jiu19y6dk18c08za915srh51p6phhjw8v21lmm58uyxgb1egshaw1gu4lx3er016x11zbj3v8mveg3bfbg4lmyph01dm3r27w3jgoyjl0xur8ptfv5l3xgfutjdtzrdzybfelbsaqcnu3cu3j8j42qqbcjllm054ub65xqc6fnb1n2ufnskxlk8mnazqnwsksfc3bqhj5h0togqshbz0sv04qlcjno0c2991tj1i2jyi5tvf2brynkuwwj4kabrzc5pwlnvuxfi9qe7rao3czx1vkxqxlng7pzh8cohon510u8qsj22rlewgbblba306g65hox4v45kzyd9x9y0sb7ne3wjcab1f2sawkw9tf0eqxp2uib8zb6yew14704d5ldo6m3j18qkdz6ed684hx3izz7vvelw310c096mv69fisxpwk38tppgtkd0vyylzjyhwnb2gbob9tjjfkzlfe7o8amic4vouhfhgx8f47ztmpyi4h480ev8k8m93867v3vfoukv6v2mp1xbdtzm05kj80e6nc35sjboend14bg4tdzvhyxtv5p91b73vkm0kowz1zmqkzdczrvtds5ztd1dc0em7mzd029id8wsrqmya6ynlhrz0icgt73bq8z4ecid2yiwl9lko4i5wsgbhwpdfv8xqq8bk1ha0p3kcz275oqq6uisqc1zwrsuecylkr1twbifnmv5vnv1ce9yhgkbcwkefbkjy39f74nlclxosnl04dd6hjg4f27eeml5a8p978yblrnz55b2sh8vvgmk5aktae699mc9p7x2unltad3s1nskrmu7bs96m3skdsgg3khho5bgf9hp3lf7r88emj7b149wtfwlt0jygfcicvctjz7g10pmd50ps12yznxfacycnb7ix8y6cxh2ruu9gbctw16wytkdwxbh7arlj0i9br46jrz4wo1f0o9xf0aur98ydnu9me4z6rciomcxdu8b11ntiu7l6fkzvwxnn0qi47wneqrjrc5p4kfcard8s12pgj8hjmte7q2qomnbp9ekcpfedw10s1mz3gy2sovl3o78fgdt1l34hz07pjsib0ytz2q3v0hoab9k2wqlccxkiw1m7uty9nazoxjb7mcrgnrrkzircrhoz11kfyi2rf45e5kdy4q9pcifgsg8iwa5hvh4px5ujixo3at649rf1oj3krdcd2sphm47b71sd6mpuj9u3f8r3cx4iomk6i3apvzm2lwlrgyk'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : '0s26nfb73rnu8ycml0skilocnjyhjnvv5a5xtor2b5sngnto6wm8sigr542nuhul12hxdzgv1wchqmfzrqo08oa462pk0mnpab5gaiilkhtmoy9q5t0dc9srrd5cf9cj615ewo34tzcv9ymomjb1mfjdvl5hdrsvpoira9neidncma36w9cxb1m3ami0yn9zian4dhc59z09r8m5sjn8pb87divgerfot3mbbckquiglg59p11rdls9nbvl088w5aendg5vv7kkbg5mw3fkeqgcsphysdiq5bzr2598kcmepinhfgfxwl0lb2zly3nyd8brtx8gi1logavon26vp5yaca1rrck8ul2qh6j8xm4jubh2m7wcl5udyrrb15mh7sykhjq7eobdi2nfnjzo3egw0i3cf1zstxgtd91dmuoc7wdwwapogg5awuz62rsykhbto7pwtosz39rk20yngzwjppqy7se0p9g1z8l93vg0871tgucs37j8pwsr0vdn2jb7aojcn79rpl92iv6cqzxqlm57530gk4gi2ziozwl2yhmih6z4868lan569udi96tf42vcxgm5x8iz6owhnjosybwt38eplfmx9xitb258qm72d2f3c9wlgtla6z4pyuycuuz51jrixk4szv6wfzsz4q706rtk8f29shxgm3r1plxltybhcma1do5n05wgl8iwr0exfrcw5x25fw2l9dynjvxqmob9i0ngt7gqx3054wkgwf3v7f30jihiayw83164r8305usaxlhoalfzkapd2wqtl0dcd8b22ttgzwmevbxv50l0fjbnynflox7lw34rl5mtm9rgi8v14agt08g4kelpykxynaabqtd13bd0w12sutucyof99cb8v4wqd2rrzlhr880lmhzsf2cqfnzucyzuamzllh7360zv0q1juisqkkgxp9dxf9d2h31590en92s8dgp1rntl0trbse5ks3anthn2shg4m2wiwbudctlz1bb764y4t9ol3w50lmmj48jistzbq1yk3lonh1nsqc1zqg98vh3qidx9mpuqlbuegdx28189xnzdpgiiw3dmbjb65aqu2qx8557uo732sureb58y73mgd8hkj6b076jjfuwhe8myswccr8s2xlibmwwi47771vpn1etxrvgtxcdov6focvdlb9oew0rl3tb0dlpk1jvrx7aay3zwy7qzq9wvuv9j3r01iv67134nd8dl0d2ja9x3bz3dl3svk5at0lzqom858hb4q6zz6pk7duf4llfrxpyu5uougilpxwjthobti8h520y9zrnci0cf8irxe2ffrnhm3p9akluwt3zq0lshl4axq1zt41jjfgy2vfgano4ymzg5atogu9ggbn3023g39ti4oojz4pdsfa20lby6fd65ytc9xxqz5vkhpw3719ma5cbxei4n7wh2sgzt4syqlwyxm06h31hyzot9devq6c6981oex11kyvemoyn60tm8zfpztg8me4qzzppbrxrgti01wf4wqk4z3y1x5luk2f7mvk4qx7dkdbeplegw27nha7fgg8vw4hvuqpa0mlteqrncd9t1yorbuc3ye1sdpu7fptmljlrbqfb50h8u2iquvhw4tnawp8w5qygi2g4rl7jg94d30xtx48useths3v8ayf1hdpc3lupw98dw9kfcg4hngd7y937dwcphtvdzsv1asex2kaqbc9bw0phsmbqvsbc8bhivanp51gkdeu6jaaictoop1m145xa4irkebylblaguro651uq44z9m3lsng957eu2t4iuxjldblkx0il16hmel9fkq5m26m00ui1qohninc1y6sz5b1m1g6prpnxesd8mr54ufv0o9wl9s8a8xr6ovd945iqvhinafg4rpmaq10ju18m4p4zakv7akrqsddsgde8vxzqj5mhwgjga6k1gjsq2c9mgw2fa9o932l28q56a9p19h3j12m5f9b6fxm691wsu5bj6680nku50iaiqjbxmttxzb7o92v831n323r'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 6985369758
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 4154437447
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isActive [input here api field description]',
        example     : false
    })
    isActive: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
    
    @ApiProperty({
        type        : [ApplicationDto],
        description : 'applicationIds [input here api field description]',
        example     : '',
    })
    applications: ApplicationDto[];
    
    
    
    @ApiProperty({
        type        : String,
        description : 'createdAt [input here api field description]',
        example     : '2020-10-18 21:11:32'
    })
    createdAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'updatedAt [input here api field description]',
        example     : '2020-10-19 01:43:52'
    })
    updatedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'deletedAt [input here api field description]',
        example     : '2020-10-18 20:04:35'
    })
    deletedAt: string;
    
    
}
