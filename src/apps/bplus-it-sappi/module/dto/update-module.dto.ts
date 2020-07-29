import { ApiProperty } from '@nestjs/swagger';

export class UpdateModuleDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '61747cd4-8873-4554-b0cf-2a79ad77f5e9'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '9cb32b80-ec7c-4f37-a20b-848f976fec38'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : 'db2snedbmznzbspf5j76blgfyuj0mkz4s0u6eya30z8od7auao'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '811b42f9-4ee7-4b3d-bdec-b3eceafd54db'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '509cb2n6wz572ycstezt'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelId [input here api field description]',
        example     : '79cab625-3a92-45a6-abb3-b9d2a83413bc'
    })
    channelId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelParty [input here api field description]',
        example     : 'qgl2b9jo4j3jbufuhrznwpl6sklaubymy0qkwzkefk510evft4n8y7xzs35szsuzbllw1y1usolsi3qbbmgco6jw0wmh6v1n0ifob43agrfj4rljivvowmhp1g3hj95y5sp9kc4yl2dwbznxnq8snnnjxo2a193n'
    })
    channelParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelComponent [input here api field description]',
        example     : 'mhxr7dxsggazy3neeg0y8l58t2r1m7h5cjs0r35ta9i1tyeuh9bymo4y9l1fidbfxahv2i20jsj3f5t1i3nh0e471m30lm0z8hduuuyirmiw1dz7vjfpomcvsy3u5rwqcn6cslcx58naqh8d0jspjx37psewnskr'
    })
    channelComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'channelName [input here api field description]',
        example     : 'ezbzprhvovlh1ok744y3p9ub1l7bi21av0l1n42paofcw0jueu3ap56dokxi11obsrt6muicnly8nnop8p6wlu6ah0mabogi6dutcysfiwjtlc2gfdtd0b57pjgg45v6tg96sz7yo3exsrww6wl76aog23c46dgd'
    })
    channelName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowId [input here api field description]',
        example     : '97e4cdfc-4b24-4878-819a-a7c04dbf6dfe'
    })
    flowId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowParty [input here api field description]',
        example     : '2no871eu479lrn2k3t82w565cfnckttxevukk2b9j6c7spoj9h3fn07h46sh7nzoe0nivjifrmz71sxlz0i7pcu2wyjond5rxc0ohoa5edv4sex0bh0dv15l2d48ro2szi9c276xrn7pb0qzfxru7xrdhvueeta6'
    })
    flowParty: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowComponent [input here api field description]',
        example     : '97slycre5ayfsueeixxmwngs0yb1b03x74dnunif5yx71v9wbdb0gqhe05gaypk76sjrbsqcyhyltopqr989wx1ovbri0hdgoxd0pqyvh81amaqg1l28xlhhnsnicpsvuc2djm6n1g5ciu6ahp787bn7fzyyxzhs'
    })
    flowComponent: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceName [input here api field description]',
        example     : 'v37kxq8b10bxgkczald4fgm8ujt9wfxc5qnhmk3lx679nbk5zbxqnqj3jwgwwd23twfw4kxfi509dpgzoj5b7tj4jcx3w25qctgz3537hz6aq3k9xqorg6z9csx235iujrfqwaz1a4k08b5m8gy956xw2yh3x1oa'
    })
    flowInterfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'flowInterfaceNamespace [input here api field description]',
        example     : 'r794dxnyb0s3os6exj3am20je8fyxezjquz705hmyt44thu2f72w3br0yeggulyrhmxkvk0gi4fini30p0o9qhiy9h8ixoc5lrb1bacg5dk8dog82p93u6znop3aadwxzefkq4w6lx6523usvy3xthuw3te70nhe'
    })
    flowInterfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : 'nbls1c5fdi6yexxgn0ra'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterGroup [input here api field description]',
        example     : '2qwuqgi91dhw4gznr442j6z05ms1wj3i7q0jsmcswnrgu3ea9itntvw7fnqu8sftotakfbhd1v39chxws024ns02v5iz4lg5qnj21f9xjjfas143s81jhb2wwhvpgo5g9lp9qq7gkhetlovv1pxjjv01n9rtzskmknd2r6ht1lsytq56hvwycoor03n5nbvtimkh1i3k8tl6q1kbbjloacgo7o2oogagr7zmjsl7iysqw8ref3sksy3wqmzgszx'
    })
    parameterGroup: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : 'e56kjx9l2qnd041jzhjz94rs6m76twus8yono75hn2evt7fg3qruhqupvxfy1kudnil5r9k728whckx7cgvs661adnx4ej7a1joy3sx1cuxu90ueztnhz3kp472dh9cna799dyhv4efgf7g9l75dbiue5touc56nfij7lf4qiwwv9rs2jgwma2n01feuqp3i2rfi3ejany9hclo6x2cn1vbglcyhwp69fwt8drqb1htnz8o6g8pr4voewnpcp73fpya0xfgqsqgtg1fmp7dq4wklhy662bfcjvz9k8nxlcw5xhkaopaazqeau5ba2zn0'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterName [input here api field description]',
        example     : 'z5z6xrxp88dm5a1cv29mghgcgg3hpdxp6o4dcg6xscnc2g3suduizpsv6v74nwkeedce6b9tp42k30voxdyimxc6cixew8pevmnexmlwa47cgmmpjz59dlwmx3xgbf0y2519y2zmaahuk5myhp05crgdxecwzm6hx9ixqmzx0pxf4r67ehgmp0ozxv6ud1028koatzx9r0jnzu8w2jeivmip6y8qfoz3rrg2ibq59vhbxp87eu034f3hgwyhe6m3xpi5icc5smx6ruqfbyof9yc29a0q6swywoq5y0afom6v6vam9ui2cbm0v1eg591o'
    })
    parameterName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'parameterValue [input here api field description]',
        example     : '90x4cdt08pm2qxyconsf0g6omqytfupqkuft8d6r4svg7f08drhwbgduhqgkobfjzj4ylxttlok41fc5li7p76pu5i6m9ckncz744up9yvmmzhmjxv73icp3s8ybiflm1rasss5v3h4s071qr3mfmwlissdi240s25uzz0r5c51sjols3v1t2hy4kygrztzfvrfp75ls5yt9rhktvzs5be053134vdvlelxl84xrmxvo18nmrkp4licbvfeipe7yu0o7gizc4mtntlk33tu6mz0d9hmal7s1zg8obe51qvd7efrkwzr2qr1rrd4u1t36gha2f0xavlj21ydn8pjb4x0gp9wr2qt2b0rgi5j66n3aynvm5xs3l17sq8cowt4knwnd7r1x5u6s5w80rjpc81c00w2obgqieb4ry7qlsxl9mk0fhksta0xg08kigcipj3zlm5y7lva37xrobmhdcj5wmacg7bfa0klf777mw3rph6poivhl4cu5x5ifkii88ohirjiyxuop1mx4n8uvtf4uz2646g0i47dt5o32sbf4fshx4e7mmeecwqhbuszkrgjjrkfguu29dypzibziao1syovf4llzzt46a543a8x5re8i1rvv91i4lzcxizc6ivizuivu3b3w4z6dz32r45ff9xmhexjyiqlugdyds8da97s2mgjwymwp2gc4n6kfx9nwktn574j0zf79rxakafb0z59tg9ei48z6xzqv4twija4ivhf5cs6gu8xro2oukpfkazawh3is69ah41vx4ybuvdl2bvt0cb3igano99i1rh2wgra7hh1giuokbpgri3ypt7uri3ab1233gvd3vdit0in45a6xj1i0mhjg64yh6h4hgpkoazy2hs9rmie94to57jexdl670lohlc8d2ozz8gdpj5nbm4icjj10gkf7gj6udhaccamcg1z7jbgvwaum1d7broliy9wqtuxeql4qo1l0t8tppn9zwhguifhrp911371ddnbh18e64ja4'
    })
    parameterValue: string;
    
    
}
