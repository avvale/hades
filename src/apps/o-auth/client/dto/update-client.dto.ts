import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : '2bd7a018-b574-4dad-839c-8d0f99fc40d8'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'grantType [input here api field description]',
        example     : 'AUTHORIZATION_CODE',
        enum        : ['AUTHORIZATION_CODE','CLIENT_CREDENTIALS','PASSWORD_GRANT']
    })
    grantType: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'name [input here api field description]',
        example     : '1jndj1sxjmasd4g3ru2jommvihl1hmbbxmt471kzyk2wbn0fczeparqj5z1r90f03b1q8ll3u70454zjw4s200x2ch7yvvy8h4wh7gtqmgmhfucdanrbmrm02fzyblvw445f371g15x47ielwyg1r2r9j9k5c4twl89ej9tdpk6l9xgoxnjeiumw61skq4bbsax4pumg43d0aas2kcr9ogw0pq1te8jv95l3rnktpx1muivr9sodb92n0on1bdp'
    })
    name: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'secret [input here api field description]',
        example     : 'l9mu0ey1byivg0urs9krdnzev6ng8jdnp6t26w2roco5215earreadisbyxbg5ba170jp4uj6octhn5uhp2rkiwk7f'
    })
    secret: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'authUrl [input here api field description]',
        example     : '2fll0fh9v1akdm9wvp9in6372t1kg05zpa2ar3ai92x16hbmcj8im0826qs4adh1z6u9zmie2q932k9ry85ve53c76p4bnc6ax4t1lapnr3fnv72w8piszgax5qx2d0vg0v5dncnx3sss2rh7jsc0tq9u05q8beeoejgpr5x2qhy6fnh2fao3efc51n1akcgybi0erdsb7chhlcd2vcp057tpwltayhymqjsgaw45jwsh9rs11i72e7ymac0n02ugqemunbpwfy9ja3sb6bpixt751nhdsv8dpcpv21sl2ne4g11ne8su07o3d6698rvhfxul7mbsk8zng2p553c9u8zvg2etrugc8bedk619vz2q93iot844vk55bloezxi7x22ptuvr9yoz0xwbr3iuu4o8135hd3qgj7uhxe6nongz7gmzbqyyklhbmpvdit57q40o8dmse4bcbhbso6r67572ky60o1tj2nyz2fvsflaa8d6l2vqmfktl760784mzrc47pwd5pu2plvchxec6d5648a8atto6gkrno2vw34243qxhdl8q5mtzpyqpsi9nnygh6m881174n1ljcwkvgbvqscx3ez5gkti9lngnknv0a2z80mrom8n74khdxzj3r5l076bfb6pgt30pxqvnynabg745tddjnt3ftioc364wfoazasn91ejfvtengalul2qci2ow93qou5kfmvgks3z72pid0qflpioojrhiaprv4mmruawt3z9ggmbgpdvh9enila2tsxez8owwdy37w13dvusreoh8s9zqfv0vzqjmka6u4gf7uxa8chd4thb496sxexerdf5p4gmvvm1p9jb6jl8puq2n31kaz8q6hz5ru3mi70ohqlj14m6ldegippqog8vq1zrjhtpgcdh2xan6ngb3ctxupj05jbst9yy92vmxax63kjs34c1hqak5q3l8o81782418agc0s2omal579rbyxsjf1kdepe7dydxq73n278dvcqm2700rc2rl2dvd289s88nqsvch1nny7qfyxhw5m2ccel83inv3wulv1o1ckjqvqx75u4rsz8u1byh8ufxe7l0c98i5ty82o4vwyngdhybowrtju2k4fewg4vz1x71cpf4g03561y34b771pok8rxjf7mb248lx8bmt4gjge0xbnmg4w8lbvcx3x8cu1bv97ql2y48sledr8pb6vh1o9geuh50lpsu268nenb4pi4mshd5kc6v72kurzjacmg51r0ysgr6geu5dcqyexmiq3wy4grnc1fb1x6xm242kofnm74jqzjrrs31rp47q19rnz21om3nav1v826vxkqp9jcey13llz548xjqg88e3udgtebxup4pkjieossb7m2jev1ixil7encgb7vusxl6sahv41ut12fe1byub4jljjus0nxqpcbuu1889ush3gqamkvo3cuabja311r8s0wyyb3gnh2e2a1a4kcvkm5tvh683nqhwcve41tiabqkct4z2v8o9h0acxfqexazgsyqnxe55hfdb1ov9s3xxdku3m7i3tnk3b7rbdp1my67kbvgrvengxm56g8uxi2ufh5n66znjkok275dpg42xqb46aiu3ryd9ski87vl5yqooj0ay679y3s6s6bz7qwbjtwa0lo6lvzm5ekb7fs9to9k6oghxt4gkqzh154zuumdce7vgq0d8auvv3yaq28jjmzza8dgmfdygihb1qshvj16q2s6pzxdai2bughuol40a1uhfwx4ggn2qp8c92fnf9k5dht1bpovmsmqpeoagfxzaqt0v0ec8sycpa5esy1jflb9jvgdleqdgx78te44wl0a2kx7j5qlh7qs253h5b968zbn1q3whkdf0y3ir86tg8h8xrye0t4xn71jieom1zl2lq9wlso65yhhd3semdar2v7cggumvcy1aoh1fa5uwzimar1mjearpmg9h748rixw9c48qvjxoyviipg80wkufubzzpn2ka24zusdu34dlugyzpvhd3ain1m'
    })
    authUrl: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'redirect [input here api field description]',
        example     : 'laus5jurgef7p7kfupyfwpvx43nnktdpb68rzfogee4xzi4c74vzf6l377c8z8w7xa2pmvr4yjrr5vwaio2cdpneocgdebjv1967u3rri9now0frxaxdc1tfvkl82rd9yfciapbmgsbsk2yfey6q0hbti9257cwrb82cztqtfx4uprikg8zs5ddhlkyhnqa9qrhfptk66wt5pzkjxs1s2thw9ane2qt5nmy1mzxptlyye5pefetzxfxmjgvycictg9sltdrks5ygvfcvjqouw0xnjyg62cbn3vsiyb9iy1gu0tgrhppw9lgxjlllfs8fxi0aaz4kp7341jdlhaf8d1yxae372ad2emug95x4sz8gjbyuq7egjok8x2s79wh1jlwrdfa18rx2535zryvg5vnbzy05q1vci7mw0gbfqsh3cyhtmv2dcjgobkxxssd1wq172aoe3vfyo7s59cui20rhb6aztqfdul2dvs0wujw4e7k8br30li6duj5ycznl8gdo8h8a8dftymcgumpukwbbti4qp3sx4wayzbyaym3dxaqq7uaenmjb6gwg6b96er9up6olr9t9etw0uokfn86z0qj24bn5bj0okslmnypoe2csqfm1woy0a3nzl4yesu9eh8b6opzic80lej654h1myqzubqssx55wc2h858vbvzi1w1oajwj7a1m4e6ghjb6trph3pokuk85ck3jws9ivzvmkjqzzse79c5dyuspuc0s8bieddrqgducv7e3tvleesovz77t3rncxcfolwt7qd2xpv6hxglh1rheezf9l4kmvthzl1nijtgzwibjcw22xn09ukkv6us6ypx9ql9wy4z9xbp0z7cqdcefydbl8d8og087g3lzazaim7m83qxlxe6qa2vtwmnsmjywwtcx3duvpggf439m8yoa731i52o8gitaidwawgspvkjlsmu68rdsvucrnq9p39zr1h6188jm60x12dt50snpvxvcgm7rs1wt7obp8oz8buwyv0tkdpqggudqruzs5gzmhisgxwochn1p56zamuocf8ttu9dn5tvqdxvvey8tr1q32ksjthamtq4g6wthvh6zfy54z5u3zyyyk1ywb8qjjcqo5zjf0b9tdc8tvym4746stz6rm0szaj392uc7p9o17ubunwmerz55k0mftvnog6r5sishjviwlpj8bj24ixi9g13zr5wqi8wuv333ygdlegq813o0ya4utjyz360kbubhknzu56rs5zfsxfh3q1ly7g5yp0kyo1kz8pa7k7t75yspuoh7903piyubok9aagayuqz3mc512m9c8sj98sgyoh5c7hcrw58hd5vn1jkyi34d68hqdy94edrjvdw2u85i3hgzqhrq15yhh02xyc3qrb3wfuzhzd9hisbwa05vxbrd3qzlxd1kl5p8d7trfdvq6ght4gxkxs2zodcxbothmteuux6zs4ws4hiqo447c9i2fgu81kxdbas9v9o5c5g5t30gmdrozoitojeswjvn7rmbndb8oilnj7koynnfh0nuvmw5bbvvfoegbdxf8cqykx41yqprfucyypg9kslndnugacz8z7y4xvf0057u9c1aufjkav4o4nmk05a4b2at18dm0umnxycyddcpgt5lwb8t9d8bldfci4l45v5jimxp5trm2ayfdcpqyvjya42q84acnrwmmclic9uz0fk6vbx3xq8ffbws6octnviu9ke0fq5nly00f0v2m0dra4oomi4qghcem8kwe1u1yzx4its7oghakzgok95mz7ou3k274crnlhwjr3rtu7ok0r3usvf56k0lu4e37ceab2hi2lwvd9lo3fggoygq71ppr9pti1ccophdlmvzm53ckpaz5w1o695vv1u7rmalwledd4se10x8r3prs7m7n8yvqmb92ion6tpcs59v00pzwhecs5u8gyfq8pcicwk9tb79lmsb6qwrbsuhfispe3vb6jurg5702qfs53hiqqfwg3tmdnx9tbxsnldeyftbkkqz1'
    })
    redirect: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'resourceCodes [input here api field description]',
        example     : { "foo" : "bar" }
    })
    resourceCodes: any;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredAccessToken [input here api field description]',
        example     : 1430137464
    })
    expiredAccessToken: number;
    
    
    
    @ApiProperty({
        type        : Number,
        description : 'expiredRefreshToken [input here api field description]',
        example     : 1197085266
    })
    expiredRefreshToken: number;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isRevoked [input here api field description]',
        example     : false
    })
    isRevoked: boolean;
    
    
    
    @ApiProperty({
        type        : Boolean,
        description : 'isMaster [input here api field description]',
        example     : false
    })
    isMaster: boolean;
    
    
}
