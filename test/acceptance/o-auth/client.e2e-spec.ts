import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { MockClientRepository } from '@hades/o-auth/client/infrastructure/mock/mock-client.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('client', () => 
{
    let app: INestApplication;
    let repository: MockClientRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IClientRepository)
            .useClass(MockClientRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockClientRepository>module.get<IClientRepository>(IClientRepository);

        await app.init();
    });

    test(`/REST:POST o-auth/client - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: null,
                grantType: 'PASSWORD',
                name: '002mubquvd7443qwkd0x7shrlqk2uy4oozpx4xtyjl7ojjkb4uxcnhius4i9difscmq8unbocywq3dcxtqgq3vmbflmf8t6xejoyh96ilhr8zcxm9kylzkii2lw00nnxacl1cwm2ttcsmr5revgv4xqv2c68ix8ex3rcvjujtr95d0qpq9ghguki78kjfjbtubeljazc7qrks3xt2ksmkim1nq2pmb6604circ7dlw7g9q6bak978mdmkwmmb5b',
                secret: '00pjbcs05y2p0nmk8y9fyd7kwee2cgz07xlgaoqgkandyiwuiarzeotnolbhr6hq3imv0ibjlp9x7v54d1zees1zvg',
                authUrl: 't8ghr3m2smxzynvrjqeisa0v3csy2ih1n8yvn2ebqanaf74iitrgmef91g0lj6eelstyakfsiy3gbco6eln9df2j3ftgk90squq3c681l2pcyefnpymk5f72bxd52aqv4a2k3teinwrjlptmyq1vz9a1adcl78feagdfm3kx255z6jsxs16r6tuqe83dgc2ypy151pckdrhkb0ev2jr6y8b5ioxah6wm8g7is9rczonogzf52omltaa5izu2f0z1cvgtjvykbqe8438f8uhlmvf653stn8tvyungpih05zs347scfyrl3pwgjyo52icr447qzvrixndvwqe7penmuhsnw17krug6kgbk6bgyvmwo7fllija2q3qu217odjqux5kz4w4zfad3tvt2m9qgkapsl5z14on48kzz8q7bmpwr27xh77gb5pperay8g32wt4az10dlcahnfweybw6fcr1z3dkvw1qntywoeaajnxmgfh2x4kpnjws24sqwlwx2xv39c80ull2zyqdzoia0sdj0ca8n02yal6fzsl4epjxg6a392qxx8ieytf9tnd2gop007p5zvjc5t11ms7p2odwhleir3kaoir4vuhylcff01lorje3k917bj86o3xu40l5nrej29oi9ct3m5ta7ivamqbypd9zsan1eadj2617vj9zcjw8chcncvvk81pwca6t35z852b0im596og7jfq76eofxoz7kay9c7q32j3pj46bhxn9uwqtoa3f97btccflp442dupqhrotgu0hp2lpxzjn4hmos90b1b8w6h5um4orc7n7bqrr3ab6hninc5e6xze2ud7nuccr1eqjuhstnjj8q1325gqgz6qhgds8cqd4q6msemurvh0o8rx3u14y9xryuqnt1bp8lbaa2yq8bu8caaozdcglkb0zw6o7xpmp6gsjrd4z4mhsxu0yve2sm7il1g5wvukahgk6k1geuxl5rla0wawcyl74uvnn1et0wzp1r1m07923ug83s3nacg9hjbhewk9kaojvli5n7fl4qpkzmag9m8r4sspiweeu51dpuc44ieftadrqktyp3wygh4q9kb2e05em60pronr7lsnl63hv4efzd00218h6bw4flt6m3esy0un9qsdy76og3ayy9cdplj4n1a8palcasx1mhjrk5gh2z9n21g01zq6hqilwk6egjziwszdeih8l4lqg4zfl5xlsfyx2a2nov7i2eozqaqunomgip0dti3jp6r2quo46g77fc4x1zaqsypcbs9g67109qbp5ynb3ic998hvbuuetzcemer0gpfqsit6wet34sfclr6x8k1wxcgzg4zhfs9axs9h22ozngp9hvs0ivqrx5ixj7ft53rcxzfe0wu2a70nqy655svtyuheq7rn6uafpynjums4y3210gqoqgq2qz2k0kcp8fg7m3j7sx7chwn4c5h7u4gtrdyxzn8ezp9d8i8hb7ddcne7pt7ce218gpfh1lszjtd9ugfhbzmiz97o5ap0yu7kz434x6ryb95q7firsbvb57ys7r1clzzxtt8qpt19nggi0du743g93y20tmr9ek1y9tsf11f4y64tniq88iqg89msfx2b1090in5w48ccxpns6wuie1vymblaz2h73om9y1dr3e51ecdk5kkotilj7890pyj7coeyx9hjapqg8gzmafvgy9vxhe13knsvb6uym7we7vcbfo660srmpxoxp7j16qj7munk6u9nvld7eb2nl86f2lgcz0okwu9rg2o1a1ddph8ore0uwunb7egx6c1i48ithtjkcr2ruh1h1sxa3im2pata65tvmeoras2bx0yd04dc7dr5f3izl47lneui2tsp7i6j0jpa1ntpb5wq84fgpxidkm7zdesttz7eb57h1rlvo2ucogzpwqvu87qewgvwaqvwdxcr9v32dr60022p82jxmif13lnklq2ghpuxbn3fz8d44xha2gdsazd9az37j0dzl8f5pafki4a9ma5oj7s3i4sidh',
                redirect: '3pkztmhax3res5q4q1yj0j4mxp70n02b30jm8tw7cvp2arcy8wrts8qi71l7mt4h994c8crl7ze7o0comkhpactu0xm9hjnmk2kkzloedh6shgzclh1i9fjfmz6ey2q52zupew78b72zx2kdjmtc7jdrza526bqu7uijs8yyq8msnpplkgpa9nicyul18dfis8zcacwvtdwwdjwd8i8jgfzbet3e73t6v0tv7xoghsnkmfl3vnotcowycrncrsyvsjjill2u5wv1kla1279mnk7t15n9b19v1tqyitjgeec8uy3n6vc0ye6hrv9cck1ql13m7fto5u6i9sc1136yup07d08wmby5twwcbgqle2fw60q5s53a0rvipm4oyidpkhi8dse97ez7bwrcsdhzut8yjbymlqby8q5yxyuz3on98gtbj92d9rg598efpjm741rnu9sr7ljfwazd70x4m9fyys2o0ur7miv8vbwc1potoi31qm5jguuxprte6mhrqutdt6mua3hg9w5w4h2xclx8p3h2cuhv3cswxrbtlfphsx0dufzambu2pbg3yjbwo9y1iezl3zy3h7njaajtfeczfz4owrbldvub8563amm5fbluyh6bm49ba392glr6w9qc9usx9cqn1t979f3jcjtfnr5f22t08qjzsqfpl2rd6991n1ug5h5dctds4l2529zc62ravcjvm4fifhthlhyvu56orm3z96dx0okvng4k1ptwybuc2moianj450sqqvkwalmayq3mfcnjoalktroawm03cx0xqswii65upbzbgnair8my3nfdszz505kgahlmm6c6l3xbmgtonbnvj0l3935kkler9o1swpxx96s6rvpiy82kxq557832km2ft024on7xqy8s65mj8xiirdc7gyc5alikhcs95ka29i4lrow3t0wi9u0br1geuzrglgatluk2uc9cqi5ixi1sielo32az9r87mlki346xyrmam66igs1mzagg5h6ml0t8awpfgn10ganpbxzhkqloalqazds0hr3oxmc5l272qxtjfv612nuez905bxsijlrnrr8kfic1ri1kymc0l0edjbt2wvmvhntrbrg84gd91dhemfr2qol11r235b8mh3sd33g0lvd7r9go8rzx9u8hh8kkex8p47g1g0b830vokkpn1etunzfzshkhrxp7vvyjr7ahgie5kordca2bhtgk2d0j9mm5jht7q5lbh9h2pm6w8ommr0t17feqdxulm4failo2e1in0kkq0qt86o13nwhel8ouul153abgff4i5h4txn190ndnau21q6qn9q1j578yxziwfcje2x5g2dumculmrph3hdt5bpu90fbs7psm6agspqy63hkv4br8miqdubur0xbggddq5ye00k75qvyr95s7to68h0yp42q4iibu0zzfsxfqxw6q8p33z8chkwkvtbmbtacqg3tbtsmwqtwz13uw5ilw2iw9wckpa092ogokojuoi29dvnqksflpng0tu48fsqmh4wiohs1y99wamybjd849rzfguk4we961sm5n0u9wmw23f6snc0340lcssy6u5odq9cda9asm4lugp7st6b6n8urgsjdbi71xxtttikh2bd0jbh3n6wudvv67c0thglq8a4j5bmlvfd76uajsksnjhfr7r8gz0uke57rmstdfnoaoz4m03iiyk5omktkpbniunpjkb3c4xztzf6yjcpvrxbu3p0m67zwlf5gpshv4bz5tb5ji544hjhjc1qfh26iwc1u6lflv68pn0ufknk9sx2ssidf0v5mbzhq5cud8rfowtxnar98clcdsum3m17zum0x7udkiyhcrb58cr2dd07rnwefe151e48nwnpdkgj7omlgooajni844ykuhh3t1uqqru3tbbffx59lslvznxmktl0xyqcix6q7lqwzukwo3qtznob90alwhpp2z6tbjr625f2ywolbckp4li1rllsvmv3yjqztklzwrpt5lycty5x06y840',
                expiredAccessToken: 6025596554,
                expiredRefreshToken: 6794062348,
                isRevoked: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                grantType: 'CLIENT_CREDENTIALS',
                name: 'g89ukxbvf2chqh4rxrfqy8y4sgju9pbkqx1vpj3bgtkxvmwecopdyh88y5h0agtp0bkdrwuspdk21bodbrv6q6tj5od3yxupo1p2xaluz9di98skcdn7kwv6cymwj81zbww9kkq0d0uoe0132e8hwvgow9h6ttrtijt1d93sdz5pcdpjridsgstvlbn6n16pskelowtb8mhkdsarlsvt5wtumjp1dadvl6z22j2y7bkg8ua1x352l0z0lu8hm7w',
                secret: 'q8sims4sdwgg1rsxo3b58ip5v7eno0bnh7fgnanthnb3tfuehrw150orpyhhveejxj3xjogu7hrje41y9zy8voc8d1',
                authUrl: 'eg0f2bjogb37qrrqk6o8x3dpdp18p2fdkktm8dniffa4xxhc174wy3hm0f7as19u3dw81m1jqjvii0oa4ostneb3oglaunrpnqhgiy3gz1nlrn93c3sn085j8lvtlr9wzr7udnguctsewh4aa1ph9sh2oqzned4im3jx25yig08f558cnv1ilcop1m7ggvz0tkeq6knt4njjb7yc2eqrk61lgpjoy7y0ga0vb16oreqin7aek37u1dj0ouarnxdo85oj1ucxltmbutndj059x86pk88xkzg3iar9sm1tz2osoiwqfkk0a3krmmxemgf015omonv5mww78th94vihssf3ez9jf2s6a4ziakplgip7btphyowvgisphx4a00j89icoo7boqsmc9kt43h34nrvxzt4s62pm6btiikh1v5scmbv880hda4vgx2qqzyyqj9ygmg3l6lntesxw35kwf7ahf1s4wexiuwmdbs6bv459mqx2wfoy97xcyqr7iad9b21195amb03atcgy3do4k9mhn0l02vckov1uz3zfzd7oobpzy1hf2iu2b7q4dy8cwhpbaju7h8rrc58rq7x4sa865h5ne8ciy4v4sfpjwtx5r483wk9e4gxr4o1ia83ncsam513mxgkclxob9zy6946lq988reztieouulefk2zsyk8w9f4a20m61miaib4rxsobzjxcjfwpig8dfalpqxnno5crph4cmszjx8lul9jk6xfo0kkmnccnura4l2thcy241umu8q91l8df7k8xg39zawbnkaptwt7s45r5i33lgp8bhzuopvccvn125a8jin7svse1tyt0hh77vbbixmj5i1a0tiy9kdw5el4dhormsbsig4yha4pxl3zcjda4hc01pmbl4texq2zlu72hc2niuyqfuyttwy5wpx1ghl5fcexfonurneqsd4ke6zjkjtnzk65yoz47owr4x6wwlauafmrarqtotwtiqernnt9a2j3dcqgvgtmefq48c5uj4ykz0nk5k7nn51b9a54yrw44cyt5wf7b8ph1mgl5p1gc9y815pc49u6kxzi1dqksqdxy7lm28l865m9k68m6cvwrx08n0bly9aqfvkhv9hsybaq513itpsyroqwywo0y9bsvcrbbzdlj0jv9trh5ka9h9x6k97n9aohn88jazaw7xxjuwz6jmjmohb8ditaqe43nsryq9kxajb7clg1qg4dxlzbnu8vx7blqp0l3ei8ify31pu1m9uudvoqmbwz346pxao3fk8en2z811wdmc6gchv99m75uyjgeo6hvhpoxw9kh2qd2y56wgkgpjds8l3j92jrwum11ky7sl6zovhnaflsx8kgnfhvnmm10oitpj9uy267eh49wohuug5n48vuwudvg0rx5yphlp7ibjedmp8tvuhsxjtktwqpkqh22qvrdb1ri4buhlby1j0gpnvqs69cjjrxxvmepgocr8kz2lpwrbam7wimj8wdcwt3slczm22ro0cbo8islyqd6u7w02jtcpqz53y43kffjcdkqfxul3wfwf43q3rba7td7tvew9v7bgbagg280j4w8rla9ozav7uepo2befxr12p10pcrhpjcnyoa0eatg0dskb5chkctkicliwammrkfg5c4g1jxijaspwd16zbmsuc1stetlhdk6yp0dk9aiaqufm5q2q8l8vtd772vlzz3gfs3ve1kxiapb5pi1scl3p8n2l9l5uyu9wnfjy27id92mryquczpwiqjlo32l4k6mdrk6mkvyu8oszzvupf5igx8s0br8fljaq3hl1l190ibtzwoykdn75gq9hrhhx4bkoq6upf9faikgloprf2rx31tg8u52lmkk36oo794z8rc94aldknzccofpki24fjmygmnxq3wculih404o3wbqrz9cq1sjf8ui2acrq87vdh0w0vj48wl5ce3e3b0qckwoixs80o2oznlrj1itvwwvo2wyxrflaefdn627dhbjaypexrb1k035vuwe7hqvuaxd',
                redirect: 'ore6h504riwn1z63m1aah576xu0famlk6r0t525rou9go7rt19yqq3szcdkicn47l2c6aqb1lzhi0tkboz8w4g167q2v7h3o2tm1wwuthsig0uke8mbejph0k8rs8lar0v62q08pk3ld8thsg6g2jisafho0m21cxhbscjhqu1s5zvtgc09sopgq6zd4ll6m6go15iewbrf4sn9hzc0tw47qhoay44jqwqekmz8gcswbmbp4y9auxz9qx1uay8xffs9pwvad993xs1unq6nu7ifzgwrr9myghhcral1i2026ul60hsnzcdrx1fxbl7akk80qt2hmpevkrw676e5mp1zq8bb9ltj1iurqw3euwdrhbzg9ml65oqm0wruzm4f6mdnrqb7vlswhmfty1iyr57d4nhj8dx8uch8xy4akhnud56mh4adzynwiofsyy85imfhk3dg9louo1bncac9054yah224563x16ldcv0g69a31cdyd97czau1i98wji64rbqqbvmk2uxeid51ia2svslud5vdh6d2ycim4ags38afkp8nwzklykmzafttxhkm8ww6uzslf01usbjexz7yvk31lxsss92ktfaxfr6mcgvcby404yh10t2ugs7uq0qezve9b7uvxt1r91xaqnwbyv4l8zy97xjsjs34h591eazmeu4272nbeih4910u7i8qksp2yuitisfyulzqci5dkvs9bk4g1x7ojuhtcp69c4widbj92mmx6yl7ceugw6iszq83xwlpvmhjwbmyepjweqluj9akt4oxakau0udtdft1n3akh4624fjvadmma59t6tup9liubagq8r3b15gpvjny6ramedi0r14xrtfzmmhx7w17ppuicgdbqbybudtcwe5m0x5njhs63lll42i04mkhx488thd4ig80m1sgnph91zf4l4yhgv7cldbd59uqwlc165ti934b67kizpanl0g4kuv0lre8sl3d723rlhlbwjqi55r5ebk0ag3aeo31ar638iyg19nfsrank9remvlo5wzvf1ag7tlewtl3m4is8sh42qbcmqihy7q1su9m6p18d7n466g0vheeo70v9igv2c8hz4aru6p0k9nmds0plj94p7nawtpez56eh5wxjc9pplidwmu9thbbunb9lj2o7m74yh4bx2cebijvgkyi44bxk58c75xftdte8ltey1iokxgte34dbgy8q8asvo1ejv5t2w782gjdq02llx2au8sswjthcyck9bdupv6uv9jgwsuhveg77q043m84xlo9zmpy7a1yfi2iukbv49dpfspsanb2mi25uquiumf9sw6lwzxacqi9od92rocgrpoinijh2l58dae4p2zogqq0nouusi1h1ux4d609xytfmyd8zgzlwff6tlmuhkn766a2rcj6mmsqa3csjqqh4eec5ukqpb6e1atzr8ivmt013938k8cmjek9aupx1y03dxo41zc1xh3si59d7o45d64z4p3ai5ntvdvurfiiopbr6nfwurs2wylc39bu6vh50vfmmi5uhy5xwu75tsgc9jfhg8oyy5gyj06b57gelb9a304qmb7lxws2j8cxjwvlvybywiue8t3fffho8okqs0rbqr3t5c92myyqmsig2by63cgk8g5ebe2gomkoe3fw7sd5gf582h6j5p5fqetnncg9eaotpeykn7jxyn1t9rorcjcxc21hyhwoic2df5hc2pccsxmiz2atoydy0ndoqg5u2vk2edxzn2vbo4iso5hh9jsdz07n6ukn2qhpssfgmbg9g50hyg7blyno7goaxn0457n6xc6e3veqihrw82zcn61mfjxohioo7r9dap5b5zouwz1oawx8rurzopjk6sb69llsvje3wsibpq3451swqmju1jbnrnox3kqfjjc2scz04otsayp595zbpps38gkkb7lsbsqn0ta7t743qzu0rzdpng77xc525t8jro4ca51gmfe2kn2neky7jt830i546d0yptqptp64x62r79ck',
                expiredAccessToken: 6158118276,
                expiredRefreshToken: 2058998703,
                isRevoked: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: null,
                name: 'yb0u75dyo5gwqxkrkn3961dm326q1ebvi7a72ev3mge5iqa7qn00vh7md4mebvqmtgw1ucj5rlcdcj08d7tjio9tfzoqskm9oncec8gbb1li5o5p0g8l7arhw10l32udfjrx792hfe9pa4lhagzn23cccdy92gn53q0nbiizclteq1cbp1a559pizustgwx8vx0x7xi47xuvz2ljhbk2xdcqxi3nj2wbdgv97dt6l2nkdt5283d4tpbi3vsk0kb',
                secret: '6d3clfd0qd360ys1bgkv4yqqe2ixmcp956gqo80y1ro10rf4l1jib5o4dh8jxfl6mlfq94deoqvxorr7vbrmz7nzr8',
                authUrl: '6yxx632n37sejo3e1wssmx331emt081qfc9vi1bka0jx55ogku37as8gy3bg8ay968p82lp921tggz62faxdl7c2qvxxiz1o35c1milscqqnm475g450egzrc1o16w1nohgbiduptf7s4whfox2t0ais8rthhsiqj753a6ts3zwl4vhfucjwb18tzuqna1qxe87zr9hm6r3gfyfn61f48fih767nn2k4jb19ug0k4j8hj64nvbm7hnxmsaymxznpdbxld5qvz546fhc6waebmz76pltqbwdzofmalnq6ek6yvgr1gsnsljaukzub6jpevy76fmpbfrlc90uahcxemdxdqupne5tj0k9t1d5yi8jq3fjdb1hnz4qr8ptibfgfaw6x2ypsmhw63ti0b3bcl61rl1hrpnhl1kwupiw45oyln24o4w7j6lxpyoq8llhrvkafc4yrcxwrvx7r6libzgs0n4tzur30l581mbr84474ogcg3mt49q0q43w0dvx27mahdtan0uf1nvwa4wz9piyl3rtkfki011sn3ifr624he7aw5rgl554h6j1fl4w14q510l82bzhpucnrdaidli5jspoiivt01q5aeyd8iewji2krbg13fp198skz390d8mjyd538bw54xktwx94igmuxl1bh05l2omr4tjrk4qs5bf1ixsca8l2eudqpsltpsmwglx603sozj3yi03fup574yww82gbn72dgxm2klzzia6zcer0ou4qyzapuc4jdc0glax4a5jjhyjjj4rlc85b7d24p5pcb1xpu1pcxmszsg2cjccplwrrqhugc8etfs3ewme67adkaefv8e21xjc53edec4y8xdgg1elacsigmist7qq4yg20bw40adv6f6ebfiadlrd96jv5tojmiuc0mz99svl05fbluc77ch2sndtu0g64zzjobku3s5cooj1nenvv8ir7pibr5e2fheog28qa7wiuk7o6k4p5zkou4cina346qwsfathk28q6szmfdb10nynu7o6yjhpotk8nc3q9sp21p009wn9x5zou9ck12b8dz9zx4zhxtj5xq13srvltuu663toehhjsb0pj5ru9ex9aehmc3lqp7l6j9ddlgjsd9a321rrqzo8535c4p5phhdr6a0cqw3u0w7tkagl8b6lefxiiau2t1ch70mb3i5139wb2g7tqldidfyslhmk8qy7d1qy7q50d2tyivup3p7vhnaef64dt2s4485csqo8q2pl1wm8ltfbx67yrmytqeycyi7jlqid8i5xr8dgp58vas1mwfawaf378w0qc9nnpu0xnqt6b1rtgn2029fisyascyi3le1fj4dvl4zqocnh7o2se07yc5rkrhbonqit0ccfxrytw79hktpir43znomfi0xjkemgu2jm3kn52c5065mgtyambh7q4lt1i5inxj1ektrdl0xzswlorzxdm66kyb0f9gxpis5g7akzr6nj36qk16xs0rmo7w039ng715dcszp13ro31g892wfh3obs5gm2gq4t3v6avfjij18x8vvi4klqhxz6kq8q6028l0nnrirzdauec7wi65dzv7933vfxc40vl1l9yv35shwgxdd7n7fl66wnfl5dvpp70jqm25oiway008gptynh1m1abo8jieaksud7pbm9py9zinklzqe8g6gtc2eggkv7n3efk4crh31p8k64euyz8j6nqtzwu0eyywqj5pcwyr4fv4d9wpmqaex8hhudjiul6mfcjxghzttfsu4kpxovv4hvd9ftof8mtg99au7cwvffliirflnzpt5b7ffewcg3s73trldkxf2jhtmccgmrlinq65g31m1gzwwkzbtzbg6v4jtzikmtv98j6issudjwt9bw70bd3b6h7z7b8tjd8i5n5911rhgw6s2fv5dry2psty4f2p4v3fopdtjhnpvj0r993joqjpcnvzhveb6zf1uvo00ajj0gnqrzn52wf5m8g0fhsfkttybqd5mrxipgi82fmnar9fanal',
                redirect: '8vm2owd5xcivosjit0efao27n5ou9m99iwfalok48uzeiel0o5b437ks53hchq6cz5t0sxs0497hbxhnunsc2mos7c3a8st027cw5q6suktp18v8lzpjxbg5x0wnafscscfmf2g9jpxuof32dj6ig0t94miogp4fk1wupzh6eolkjxogyul6yt9bhkwjx8ewqcqu5a4jtig90xide4mnoyqzrv1v57bk5zxb887zq9omf0i60w95j53qj7o40go9wpoc2zolggaibgoqrf9k032ifnbg7lvbhgvg8x27dnd54keodxd4opi8aom2uwa1km1p0au74krg2bhxeem8qktncsjzr2tnnryr9xjde0tnogz3vouuwfirj36dyy6dkkjaa4v9zk8xciube1atams3qbdsjmt2xw2gyw9g6lg56ykz0l4kj1zknho5aruj2yzzi6slu6pf066y1zmybana1ywzsloc0n8mzrnn8nqfvx3h9gpfmmlxsu3hxfkw85m5ek8kaxaeqgexzpzl6d9h26tudc320iuby5ccikqub67tmw1289o0mkfetv5a8q9asy8q89ymdysrmbrplj8bbvjlxmhih3if57xlprl7f3pk2lbfcwdjorwa7wynol77lkl1mn2yyagqud1ud9u5f0gmi62bs3pynokl0osnflqkt9czsvhwombv8bp18igkxqk45uz15oj9suu98pkarlmmt1oc2l1pzwb24d9rigqejdh0ayu7l13se9lqem4p5ztlrcas5wceuakwpvq95tn9t2lodupnx9nhkte0q0ytrj9jslpkrtg1qgegk0d812w774ozbrwatepvdzl648k60nw4c06nx9g1b7xaiks1wuhy8k7lvezkkvrhthum7xkvzzr8nt01kr4d5uq87u8xjixmhgxkioc7zy7s3qzi5ioxgmmctc8ecjgasmyig51qlok82uumh4eszxavoz0e0c30ffz0r0hg6mn9ygsqsiil6p0twrz8z0dfc3460tcq4ne118wexx3c4fqufbkpu9tf5cvzjbcn749hbh63dd0z9io6nr7gmpmtrbb9k8qvv2uayqydgszuca1r6ll9vziuarxdg9gnd0fzu0vta82z1pd1jm2tj2e1o4anx07cevcmyfsnzbjn4ovef96skb0acb20bkuckqzox49rp4y8b9uwor9tsz3hoygfllwshgsnv54dr3tay4wlllrdoklry0i2lxl8gzco470dfd2xrvsashqy59l3mkd75m4awkb4t35cctd48t0xmf32fa0hy3visff6bn49ub3a9aqqp9nh5wqwz3iedisvjt28ok6y2wg5mywgni9zu63lopwtsf6g14vquu4c12vklka9b0uijansizt3v9tvetq3j846gcl1u92wq6i2n800t0u7fsxpxr0m56j9smg47hvedkbmzrt0fo0futjyf580mn88ia1yvmvpj4qyv8t3xn8f2s53o35897f32hvdtfkr1vmqnpivci779c35p7dmwzv672588l3mu4tpslqodbaf8l9snl3xmgkawyr8uj6e3wci0uu90t1ak7ohjjwp8mp8td6uyli6makvrloizjcbdhv2y92xik1b3j1otz3hnrfvpccq6z4bdyz1xhc5moeoiafg32yet51m5ulyknb20hhhp1jlma01cg0jday3hahc8816uq26633k25d4nuua6xbg29b31fo96x44pzj2gghspl1ltcaxpaqe6shoag58vt380p48mqpembhaiseeia5w6p38oze0epki87fsdxf50f5780xd0l327h01t3z22qhaet0o6f0anue389prp8i07sj6x0p46udayulp2icbebw3ujp1ob20ytt60okvdihjftljw9bxzftr3957y37usshpqglar1nd4miapf4958gvxyp622ygngonxsc78b9xcxuvxstexi8tea5hg0kp5ycdhyqywyqvyvcgb7s7ijyd50ofe2i3835zc8e1wjmhsx8u',
                expiredAccessToken: 8670499091,
                expiredRefreshToken: 8914832032,
                isRevoked: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                
                name: 'txkhbhd04jcsk7yn2yb12ldsc9485wqxy13w9l06mwu18gter7mx1cpd41ibdfcopleuggrabotb7i5bhs73js6i1c7lrqkai1a1vhthmjuiynzjf02m5ylyyg26lw6v6bfw9edhjz8k3g4xjzq3gx7gyt7c0ejqo24iqehuhpw9nniwuec00wlx2miytt6se4rqyr8qrqrhfmyyntj71fq296dvlrib2ico0j4ekvksq2dcmg1wblwpin2tzpt',
                secret: '1qbl4ejrnausjsa5r5z91wyi43c46c9brxj0jkruqna2k2jzxdlc1esvuxoe3ly23tdbm6bhb6omdd20djqrzm37kr',
                authUrl: 'tadeyergo8xj4ks5rtpnam3skcal4x5pdj3l3x1kns0vkgy2ad6k68suraaqfupjrs7436s50k2x946s08cv4dfrxgm6wjcsbicc7b7x3udqp5hztacz1qapezlb3p83ypq8csdxm0vv7sixcg7yh42g9web5u62jhkp15jei8av4p21t5vfj8o21atzkvpo0duqzd5olohuqvbmvzebsaqej06teuycfcrhazrdcku4c82nolzm37858c93y9u95kscnm2xrxrggs98ff1kk8f32w4l3rem0lk7dile5z2pa685b58z38p4ohzsatcqmrlis4ch7mzc93ggiot87i6c0orifd7dnqh368nxok4yqp6pag5l610kjhxgeub30tq0xsy6mj32lorva1vmr7kzx0xwz30w7duzc73otsi0ojojv8b11p95zoh2turma4dq65zp0e9aupcxgvseic9pwt84yd2hs8y3gdoknzozlvc8sb5ldzhuoagqtp9rirohdc8xd6n6gshuldd5i562wy2871ux5aklt3ensjx9ts1ulx8myypxqi2hqdj6w9v83rzp1ex9vhlerfe2p3ampto3f5yhdrn0hxvntgkt2dvhji4zmzsrk57lbgrk1yvcofc3m9ho9agw0mkesh4mreoh3c9ulbr8xjwtfruvdr75gweadprxgwr8gjyu1khxihnkxs64eavg8d690a0goqe6s9c76q16r35hjx82wiompm93ukgfvwfxt9gvfizm4t3xxb6ow6w3g7aq0cif5wohds16ecqrlb6h131uwmg5wbtt9vu102m3nh2hycdf93ixx29o7cafisn70dcuxoe70zgrezvhwn7tuqqnnhn243uup52rtgy960zeeqr187ii3sjr707r8strla8ijdb0eqtphbsra74js6rojzcwv7jvj3rzzhifc7reknq88ovmlq9kz6s7f5ire4eg9lxcmn12qfpbzdac3fm9fxa2749yehqlekd7w0lxzhpa7ohjzan95hvy68vlf3o5mhpfa5m2hanc4tzfpd06n2z3fy234x2xff8o72qxzwc3lt3r4vaajizlokye3lsmqsiwq9c8cwvwf3kx16o63s6atpyocw0r8yq7k59j1m7vakabrxwlxxb9et77wbsqmnit9r6frafqvue4lgbk0ajw0kzxqgbvxounqc2zn2n2d2q197hxmd58mu9kkc02maiw19dzzqtncfvfgbsljp3qk36r0ltvxz2q1gb5q11w3i4pix0dl8vtunii16pchuinz9fpd1sxmj69laimkcoc7xjayzl746m54349e8o0n2fqa7ogc6kxoevvx965pdw72klaaxzqiik4vzi8ec9dhbrzc8c292b3z2mo05q16iq9ngal7p0wzefdb0lpmv6fwx3oqcy1k76ihp1e6wwh02bysnnmgt0uqws88mkudyj9rovxm9b8nx0xr4mfzszk145sm1rguiu4pklpmawh52ok20uljlrugf0ev068y21iv3wa87vtjl1o91ef07x032bjr8xxvpyplcqws5owsgiwjkzlf43dtn5gfrcs8vcms8hht4ltedjbideoy550mg7m74s1hmshxt87ee2t8es9gw3ah1qboy6xk5601kzkqk1fea025g048x3qa5nmjtnw69co378ejspn0ksepri968619ymao4m2o8kal5bvldfwamek2l65aa3o028uchtkc59p0j9f3ryw9e5aexr4zxoahl4863kd4c8tl5ntltbdxzysldo17hvbyegdzepsn3vohas7iuj4utnp9l7e73ypqhze2z69nuwmbzqk40st3rmpz582muedqcmjyv581bv5t43unnsm8f86ucffmcs7gvwj7s2dwevg5abov5kz5i1nyj0p3flp77ifz10xyhf75frmtve7d97y0020qfubxq1d3l71zv3c7d4u9wix6f2fds1b22db0aoltewtwzbfrfi6xenz9kawtl9w6bxkpchpyvb5',
                redirect: 'qx9a9wlw0nk9cnlmgp95mxu4hu517laaj87rz3txxfzjx2tqz05e8axowag52bvryrlihcjce6fv67q1og3y5ql1icyukeqjr318ntiexvxtuhlh00m5760sdoymayjt51x8v9az0q34q94ms2g78w18kfgyjvlypqxt4f84xqkusx333l4r2uvnigxzcwft3zzv7d07o7hyr4n8e7in7r335ywwr204w1f3tq2kx9nrs58uu3w6omkz2e2060tlml0fan4gm1v62r0bzs53tpl0w5wqo6tcyv8jigfklqufhbsruh3bsrz2h5fzocggapbxb2ai3d87zd9p7uqoqzxufueddeltpdses41f4ana7rjytb6y4o6b8pth6e8g396nz3dls9nwac2xqcxnus13qufvl3nsl230c478f31py1jcp2uewmdkg3hztzd30damkz81onksiym0xb81jl7bqh95mbm0fulx6yswdz8ehm7q1djmn6z9globkykv1oqu2yhpaqlehdao3ome0wvc304ago34f62c4mkxaaj0pea43wjg02lcv90dp8ir8yheo4u2u9wsp58hg7il6rbrzr3q5lvvhpy6vxsf9wlhuzjakmivm5q3je4s9m8c302ec4dicwhj66gdsgxwnrwthv7u2f0grfj4hiitejfmmu94dla6hjkeq96w7zji0w6f7zv9je3s9ut0ptg53d9cz4he0gwzpxr9wlyfu2172566dnoo2v4lzku3xydxeuyf8z4wolqte7z4g1pb9kw15t8o4yil9bs6p5y2h5mgigqs7p37nu1ni7uvg101dfw6no18xdsl99wc11zk3oltxzhpphu47mlnmsvjb89t8ayi9ble7ij9z69kess68uaisew3ztqngld7iovg6sj83drz0joxbeoyc8h6qlkw6ogxe2oflhm0dlqidoxzi2uz3usa78ehkr6cpvaacihx8wpu7ebhu1u0byikkp7a0zzqbh0qmotf1am3gpvmzgohr8vwfe8cmuyp6hcjdetohlv98f9v1atvyuibn5m6fef1569x9tcsqhp8onrzb08hot0bre8ye6tthdk6nwpdim0tk7g5ajr12wdb5d29y8wubbm8hxbl1aofqgl2pa5j6pkidatb5l2semd06w3wyf00tkg3j1p9bt0u3q3zx8w8fa9q9imntz8vop33945hv19vvofbqpc6nhqapsjbfmr544c1t5i1i70282wrkxc7w38vwkp7kg252jolvx6jp38of5n8w5rerm7ca1pggi1hwdzvcqj9aurutzi77cer6zrphnfotdce5doicgnypaefalwb4cfypurlssym8v9e70bzpwg4zmxjdj43kcnui1q0s3timxajgppeym9xqbtshk5f6e7gbqlgnyv41dwy6bhcivvw6c2251i1upo9nn7bjyna3ksa81314cqiyeebvoq2sl841tcivwhsonazm2pifyzuf4fd54f4by2ito54lgdgvr22gbb9bhqlamnb7kmd2vwk4bq643enfq4qzaw3vxcru00jhww6x23uthz20dgsnwlbz05sw3vk66ar6iqpecwpfmqi0pltvxo1lxf34bug90vfu821clucm31td0pddtzcerq3cgyxaivpx7ti2a4bttje1ube1ew0fv1oke9fon40dgw4xb35vjr8it5r2hmlzy0lfm92dlbjpspo9hqjit7aw2ecd8zayj7v0ocgyrf2lqcjr8spyiydjxciij0pnionia8sqsvp01b8q5uht79xot8qxs5xun1f2ys8tfu4ljhk395hrl01gsfggf9sy1qa1hxt26aomqo4ps2280cj09n2uarxtrlygcxm25xttgogm9eh6mkurcpafaj4tsqaujyhiax9k4g6h36xlkvevs9t62i6hta534c6hswabz90lh6gjgl42h7had6k7adfk9grmc58l4aq769jptvn1hlj4k390op0o4n42mbyw8ztz4ozhfojt255hv6wuahi',
                expiredAccessToken: 8661070105,
                expiredRefreshToken: 3446583915,
                isRevoked: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'CLIENT_CREDENTIALS',
                name: null,
                secret: '7mu4bedy344fsocs5uhk6t1mvhy3judnzwtoqahbk5y9zvtvejtmeom1lf51dkt0r8hmqy3l5k99mz9woe9699msxp',
                authUrl: '3eljiy9bmoy6a0q1r11b74ctczd1r40g5cg1frn9bwe7f772zdkf7nqn8cj6msya89qvru23lh950ny42bq52v440amsdetxnywbnxriug68hyml2tp27tlkuh9uxpiv5drp1a62qjjucvmhazqjeohaf2bxf357pgbsaomo3k4hzy0pg83qasuc5582grwb97366r6c0yqym29dj0zo7rnw0vt8y8qdeky37egoxtrtxs1731wu6kvjipu7rmcom6dl5l18g078zfeq5fwyyplqwi5i16lun18m6sk2vdh7nux6nksnuun5nckeu5a0dtqs8aq1xm1az63xsdoubw1k550fclsx76chuoslx8yt41wb9ol9h21zqxtrnw7j9eam1y7qgw9phi0t3uay9avvx83989iut2bqy6wuy7bpfcqjl1csnsrcbq6ozv0j5p8k8ols2i312jldquouucxcjyndja7dz49sktobbdo2rd1ocyv3epv3hx7rcdxuutvo5cshoxenq8znoxgu301vlijtcrnmjh1atcpmc5t1dgwrylgxm19jqpldcckmkjac8rss3uotzsga5amnodev2b0rj1db11fsdnrpc1aid5rlqvn7poh6ob68h7gluph1ryqnpuc7bue5gtvo14de6wszckdrvgp5wwgsvgiycugnquxtitfe3dlxrz9m6ncc0hk9yy9bwpwkpb1kdob18m3x85gtpullbpgworx7fjaww2ibql1o6s5ma10jm7u8p853c17fs3heqcz8sgpkrwh96gyhyegc82frytkpuhwku7ue1zyj68trjvatjnsu9aipezun57tcuu1xhp19hvm6xw5orgz20fe2tjxocv7cxf11bs2psn5b31gx7fe3o09q5gxw0rk0hcs1jpndf10rnwjo2gw133pzvyphpoxhdsipyv7lbo9ty9csp0ymu4lv129vtl0tl974ptfg3niskvfwpnryymq91d5flnnxwsws5afn9x3rtv8hzvusnkm6e3mwdh5f64okhy1r138u26jn2dehesdwglwbam274t7hkhe1pgcrndym907t9ik24e8p8cufuy34dpdd72sfwcwypodjobrjcb0v2f61jryj7tskr3zi2ba9jwue8w4vg4uhrlqca2amy2j3kw5gpvy43z2a0myvhwlkd30rn5v1nm1fx2q0qvunzzr53jwyt1c6hxsc2iq6zys5f3sbkl3clvhs1oyessrngfc1fsso16x1kekf4nn8qlhp22s58yj80i1206satwao01tqncd0hhubgddaerf4288c6b9cnxzma64yri1tppqassopzms0dm0mfvgbfxnl9jnvuu1oh3gg1269cyumveqmgfsvni7neke3s48hcr55uudc2z55sjuwkyh4rutc5bwg39p81uv05thsq3q38mr3flv568pk4gatyzbr9amszw61exsyqcimprr3o2o27t9g2c1uq1vef7sfwzts7416ye3vt0ajeuc4y8kqsju4c359drv4pftcvimk76k9lfafk1cqh6463izg6h1dczv0h5wmkecvz86h4o0z1qc609rkl3wx4w5cq7f6pg6lqlwphhutuitzhhg155y04tsk8vih7wki5nafow8fxkwt2sqm4dg6wu5f7og8i3wks5p9gb4uslwqgi9z4uvxr8k73ff6t3slwtrtavogy39uvbcvsuhyc317zvkx79en2u8y9spitdhtroas19h60vwdvimujim3z7pobb0hf8ur8pftfd56zczzof68yl6gw7ylcnmrdcq7ie37edj1qos4i8dmx3wye8j6sl188ajuaetfloqer5dtwzags192e1nb723ktgovabcmkdq806jk2p2l50sjk2r9g8fn10ib932kqja86i4bgcbv32c24qese88zy7n6mx083foj8jcnquxymco6i3ohzv0nqkaq73o0ye6pfpz1h3eh7uqwo9a67yy0cvab4b1ieczslsma2zw937yobcemtj36',
                redirect: '3vtv5zht258p9eofcvo3jc37611hpn9vxg6nem8741w2uxxge8at3hagmizswsjh1nzm9vg5v8td2sofpdjw0taf0vhe4bohp05njg4sous8979dtzgy066436w7muj2ldvts9ukyqwt2i6dya2p36a0mp2m3bswuc6nyzua15t63fzd1yyl6w2o27rtm9qjvdq0inpbig6tfuqo8n3xf8sy5detinso2caza2b4g0peiqnyb7svg3f4xmtiqkkh1lycj9l0596d26p1x8h5mdhmqgetj7m667bhbgjp438nognt3fn9cz6b1lmt9bhhspeyxk7ac4phjps4eb68ordz8af55ms1nrkzm2onsg3xt3h68wpp693q2f2p95ltijsecpdftwnnqvjssrbccacrrwxaz9du25449wycysaqql3upzn74n57j8qid3p0p0rnck3ib7q10vw93i08fsaasjiexuhocrnuh0kro6o3uhnn4c2amil6257ms8zfcv82doeshgis8xp64ykribydrco3lnk9g4s6igjj6jjoaukkx1yuimher8c2tycvd8j8l5wwbv6n1rpthsptdv1q9lc2ut9l75fvnn1gjv053jbbb1z7lrq5wq94x9faqa7sqeahpm03r6wi0p01i3a8xeegyw0df34you54iqa20txvof2vk6m4oee0ec0z1uhiiee4dqhf9cy157hs0j1v76neg6ifr8munea43h26a2rlixrpj58bzk5y91a7s9pqa53oz3pkgox62cw6s9ixz7qj8s2g8dq0mq18mzqd103b5f4qbtech1dmru1p8lkp3idaeu3ptlc978u91tcvynma1z27hk5e9j56mo29yl36zmjmxnp8uajai9l5kr2qwkdzwqft7hltxyonmd6wwh3m0mvuwi4shga56kuqhlxj2ofdifqo1k4cvlmlemdkm58ntyuhytybcudnrh3ypo18nkz4zk54h3x7qh8mn9ckpxbjsg7o0t1gliti9b6rz9j3yuu62a1ca6ylw7hof15hpjg48mmcs9r4gly3fwl4gy2t8ltctybpryww6nn406dzvi7ipqftqoltbzhco4m7w6vxe7s1x73wvplzedvxtizd8lj67lyssu6tqeinwnjmrduytug8zqvw6ad0mauyhaweu8y9lysen1n9iow6xormx3g9z1186hfiqrfnowl5e77vuwsrzwncd6cckmhci2pet5lxaskarezobuwo52yrb7keigqj5qux1dwgec71p5xbzcdgw95pkm1qzco81xu8kwmdex0mrn1wwmo8ard5yr6aoixr2yaizpukrsqcw2pk1wx1yjh0elnrzfbz1ztc3b2v8zx8w4lap36xjq7ftaena4iq1zxj5vrpqvo2chu5dskyyfubp0cklwyqip9py7affsxb78sy3cdjw5045bydfo3rusrkgivpguizt28sn7w4d8ircrhsbpxr8q2u97adawqrqkw8745mflkt3pchwheb2g6ehv6nrd57fh0lnol5ibetimd8vxqz1lsxllhea82esg181mlzvy2ut23ksjulmxxm2z7mhmo6uks82b954ylw5pse1h2iv1kk7nwpd1m41aooso2kxru5qhngjufwlgztleeaxzglji0ct4kaqrtcdbvnleop9ow2jcufb16vhdal0f4866ihmiw7bhggxeznjtcb2oz7c5h8jk4qple5x96gp96g1plwse2ei1pbv94g3y9eez3zjjo18rzeu6ru6dxw6wyx5dr4yzvpg5v6fllsng626izx6uuepvkoi3c78liy6ty8ypndtkeoreieugpr9pts514k83gdbqd3ncf9t5xu48h0ce9bjvxe422d16jiio64lsku8y42w4go97k9jftlvlpqe717tb8c4wpiu6rna5imdpn5zrlsvr80hrcmn40bp5p6zij1h94ew0ztn5qpbjpaw9rb3t1rt6gq3dqkw25a5l1qb0dxzjvgfcantl1jmklqn9d0uzyj',
                expiredAccessToken: 8474014491,
                expiredRefreshToken: 9317645409,
                isRevoked: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'PASSWORD',
                
                secret: 'e5n1nbbhd6n5uzattygh8a0x91y8b3wivlh4v4flylm3z2modebkrf1f9xmk5kzzp33eiufb01s3iqcrokyo6e94rg',
                authUrl: 'ipiqehvwl46ca7ccsnutyx1wthq0suj5jr3bp3ekkp7v4y7un9rdjby0ee4hgzjfe1wjvtig9ieek5675yts93hyc0anblk165ri4sp51jzncdv88hlh5ixlh4y3emjvkbtzuxd2r0hjqgy792ynhpsun9slt1y5ecqs6h6p0scw84fi87iu5ripwfo92eje9wbneeafgotxs4rhknf38mbq6s8okoo8p57apj0f91239k2ri9usjf1h7zy3k0bshdkdbiy0as4gaaxpclyureiqog0tus504zgfohg0t01y8cr2mk2ukaehlsstu17yaqtc3vf5ocegafhgvjw6ci06ek75ja9y1g80yuv5xp6hj09c2xwr8xm1m9yls9va1hvlh0xffxjd3g6gbv6af1mn2el4chm7za9y65z8b0ojawh17niaxgw7nib7fz7pnvol6kazgrocth1ss2rd6o4d92v2xekvu0qzt195bekfqgmpu7yjv38ol1dtdiq8adecimqhri9g1i6prcgn0u4ap6p27ldlhs25mxk98jqjqgrlozqbfjtdr40rey4gcm6fhy3lmtty3f5twz85ie733s3st01viff5jtqxa6phintm06x9zhwtay4pybx1v6yvz2ohcbbxnnuwii16x4uq109ywx87rmy6rh6gateujni43hh23gxc4jbzvsw4gz2jfzu2pfw477el7e6o2lctx2g5xyk7z9ue4md8zl5hw7gx2v15xzq9ivw459co3ltru8dyj08whn297ldkp4eobtvcrx8ii5rsvag7ccgt1p2phfd9ckc8ukzhblpj0vgxinbccs4hzlm0404iyx3mtr5mxxj8mtrkbxtiz2u2swjzk6fjqalf48kf426c0oq1r099aejtfpznwj7ipjc9c2y1otlz8ljgdus6ouw0vh9lujzi4z19pld1gv0k7ls5g7u6mfctd7lu9q4fc63fmukwjrx1fzi2y1cpqe02ab2s709merhlosvkusjbtba4t2c37up5fd2fbthuwi96s5yxe8qaqc1eifm3ogkdi4vqb0imqa7dlhwubd0bdh6udd775d17urgdlbys3jo8tabehx4vqalwk5zdi50dy6z3zg2vwb6ncwzxgxnok8x1gq338aqzh0b4ulhp2mrq8ej3r5slq717xz7bzl64ah3viib335yivepgkz6dwb5evw5wmk02ltosxxbjy11ee0zzmfu9waahemzb3idamg0cw108j4gt7smcrmr2lxjgc11raiyt3dzjpcflwyw4q5t33sykazydpgkkre4fccq939prdiuzhqio3jcfeq65gj8kjue2h7ng3e0zn7af0ur8fe76cuzubp7ff3w9myk4yq29u3mxwdyumk0l6um3prta6q3u9beff6f15tjo4eoqo8k8zzsmjnb02d7plcugmelavugtfw5ecjo2b5hh6ylse421bhhroe07iweibc6kno02pxwzpfod0klrtzuhlv7d9zplnmt0xejuq2m9ob2422kjzaqidgucy3wby22788c911mil84yof73gwd7wamxrt4fl44r4e3x1j1phzncz0q1irfzkrhokosebvdmxkqindlf59nuxfhvzewdbgzzrhp77vbm79lb1u26clnx702xt8cq5h9vsn9zkf1k5bqtlvktllxmcijc3j8i0zopo7zlld5quew7wxhkfm3v4h8p0ronwqw12z9d97x0jd60z4h4im28921nyr337neneaqqyofk3upszudxiksjrcctud0f1ae7t4g2lepjspw9ihmm2n7iv4rcruj1zqitgxz4tgnvbb5c76ng4ptsm7aizpfanhqdyfro453rbaijsa5ssvaexgxk0mn9bf3yjw4g5vuntnlpx79misugt4ez8juk7klu6avt2ibmuscheazzryef6vd476uv19p84aoitm74lsd1j7kj0eqxw2xpqj8lk5iea8edwop5gmw49u2h1jm972hsdx7iaapp1jx8nxkb5imc',
                redirect: 'zbq3nvkbm23ka70rz50h1lvojk2soaimc34ejpouf8pcmaxlub813tuib4e4hzw7r63m27blmsw2pdn4hi5mlihb0nc61gd51qnn6up7d9wqrsjc052r5asiob1eswaet9q1qd7e0hb6w99ol0n3zlosa99w5l1jkxpxe3u4lqcdz766psdglfgaqr27big71e74xxpmg25qhp5xudfkqwph026ovoldbk9yghm6xlphrea7cc3phxggamidle8i6c2rtwi0667yqerggslzjvu1fucmdba1yqko5jiithegjq05k6alx4a2bh4i5ceaq4owb1y3pnjxqeynp8rllr3czra00a3sq8s03qh8bqxxihj3y0nz4sbqewzot4h6gggj5p5hanp9lck22ln3bzurmm842osux4chbfiaipcuk5ibvk25d43pli1ofqnggf4arq6vktnr3ukiwfh2b7vscz2pkb3qhonbz2m1doruhnculvu4xov8khz3klzercfv55xb57q43k399z97lm6ygls4fpqt42jyhr8f8lzhv0r9zmpuvdvy8hl27du1tifh8vgnm5d43ctviemgczddjgodvafvi4m762p6o7gohqcro9plw9wow7fb9k2ul8i5p8x9vwaa29i6tzwp9mlp3p69fi4xet6uwyvslsh9y7ek5nqbbnwewobaew4c5oh89lm0w275grooeh95q8ezl74qvso512txif9vcocicjn4tbnwye4jo1nvcjcwqrvsl5klets0k8syg0hikoku07zz2e0yqj5a46a9ng5j3mzfdb046wu9xufrpg3xtex40axkzxr3twf986iytmk89b047o0twtmalus3xr6wvmvh887340per6ifhbph5ln1xaeu5cogbq3n6rlx7w1rk9ca6w1l9y7oruqtk61o8mamw37swz71q2pv8x3plic35wxgvdje800qfu4ll7ck3w1kgcuc9ycnmpmq64004ug2t0if1qfyw0wt4sn8p5qek0oi04qwhvzm9wexny2ec9i4uh2irmj6vvqav6sehvcb6mzko4q412knttxdtws9bwkelwl5teuqhyyduc1ne5qk04ze5ul2r7o7wx50so9b9exb48ozzclwxi08at7r8f6torg1wb459tlorh4tx8rpxrkag4xjeb3gxe972bsf8ksdh7ukij45e6r3unj4ygh6rlvyh2dunj0j6owlifoafi02laymxriex7o1wrtvb9nn20lfzzcrjep644htci16sah4cxgxdttvwzolxiamtcmuxkq43rl8gidkanf8t84eby0k6dxsyrxeuujom6j0trmnqgj5u2fwqmic4f5gevkvm5ql099taxl4jdj3fdpe7y31sgbu1yammf6q7oatvb10mzngl9b5hanje1uben4iusvs1g5of5j1j7c8ve0thamg1qoj5jws0jd4m5ilh4puwb8ej0apr1l6gb6sbr5feks49f0i3l0q1v7nz3a0x488a78hrlul67dpf73o6odelt5wwqndlox6gvjwbhtqnyxdn4av38h4w3o76u9uphql0re9yjzlwpiqk2e202d7yrvrfvv9k1us440o0kq5sa8cxq9n5s457up3ylv2evx14195bsxlsodh7o2twagr0cay8epdh16kozt4ksyibvmqmj7qym3f1pr7bqhg7oie03luvzkwkhucyartykuf8ps0ljrimq12hjl4lw1rxhgdwt2p1de88ngzcpyxzk15bsql9kx03cw5v757pilg7sj7oyun9f9hebph3rlwxrdsqnhcfsn2blyvyzas72628y4llgohny3g8qhuffe9cgpv9ynnicw3lfj6bed0iaea5xiqb9swxixhhk9bzb1eq149zhor2avpzce9krfwqt4du3847ge703voqk8x0a3y2qvmlb1e1j8ou1lkz1f990jzp8egig1bp6furhqp9101ekqpotmesgiy163hjmwiigo19b15dc5u2kg02d1n4m5u3zop',
                expiredAccessToken: 9964598451,
                expiredRefreshToken: 5352552480,
                isRevoked: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'PASSWORD',
                name: '9lwoorhxkt8f4ghwkg7vra5opkpb6macy588hyzt5hc8ozhj2pc7shsuscvbnc809kkr7w9dvhxui0com0gw6deefvzvnnioe4enia7ckk6f5ribzs3kq7fw4cusuejxz6x3bd0v19h6mvnj7ungxr89otjxze8vrjvbo5cbcus6dabnge8v1c0yj35mso46bjrec40vm99b1o9jjo15mja3ejwx0iug93yjqycsry5g9xuhi20ga2qqu0hyfw0',
                secret: null,
                authUrl: 'spn3sae65x6ax93kbwjr0ta6auiqj87ttb2xqmojhrxspnw3pdjai5z8hs2npgh6neu2ftb01kjsnyflzrxhr472ax3ddk2wr16pjpnl7e89u49uryoz3wvdyza3byo9h62q9qjy2j1318q0otfqlxm3igyis5hw92k5384hnflhqbk2770kpuaehf3yj0smtms0xaxy2yn0i82mb53usd74mfmolhsn8l1gxxx7tkd7eo00aw2yn7eohg032iof9tdz7jqlhnrh1ueeszt5ruzsh6hr185eigsp38at6ccnze9p92g6vvpvmavs2ge47iaew1shx8d9jmvkmbselflg8w9s3yc2s0ymiqfgyrluwlo7431phd2gn81hk2jbf8m36zjwrwnwe1getphb0becb40scp9ufbnzof8yab0tf15paslmacmxwmgq2gz4nc1x4ejv8gqsuq9pg1mat50uhwq7v8qcmc1luiyc73ws5mlzz5h53b9ymvimwzhv3sc23pp8b9qskylxnk1yx3tvaoluf9tphbpbgly084cbiigb3zrkou9dhdcqu1n41t7d6mfjhfk0jfksb9f4dmjxj9y3jgsx90ydzh671hqxidla6mfsx4ckh3rbrw6arixfdwiuywi5tjfolc06tc6pqqjfjn9hm1kyuwwfuyq8efidy6p9zkbibqqmjxz5rhtv2a5x8rzrh9exhk24iik62mxqzhqnpp3w8lnunvjdvt8fs30hd2lvtlsif3yhr9lr9lhrwkuhvqw78acgvmtcsfio0dpizi95l0ypjaobmof1cvgkglner9sdi03rnik782b8hv2j887ol7yf1ug6dooxbbls2izurcnhpm2ddb0aimz4wmn1600hntn2h3tozu5nu9jkdnf4p213nxkyuab809a4hhybs6rjvzi7lqiujhzrlk0yq381dpjmwnuar7uswywu0654656re6okmhgbji2430n1d8v2ft3vvdl844g1ucz0nleuhvyyrjrxrjjp4r7ebjnhxgvrwx1g4kf6n2jx41ntimnhpsb7mjc6wn8aus6wz7e2myoru79b3dpxdzggtk0xq14lisivu08tgdn9y1ecivcs75lu71f2hp04sh9yml55qhk56pvbvru5qucmc4sdjtoqum4hngyhigyv618cj3mmfndiqim64jjgeumm5t2otpp7ed39e3voqt4mejef6qw4q06c35eev4zwrlsy0oretg956l6d20vju1utpjd1flw8zqpj2a5m0e0pgv63ozhr2zztjoq43pa0ex7sd9q07flizr9pvmu792uevmumxm2lxadtrp1r8khj22ydx4m3y7cdbcjolvgm26dtd433exy82p4zefwjj74kxqqn7qtd1meqdvozrcp4eydcvr1hpm3n5i75coibnvw8deipxh789x1bx0zuw1h2tbyhsnwac37ee705ikf2xhuay0pcrm4bop4mepre1zpjfo8f297gio76s4dhka3ju2hbowep4hxmji81jmvefs58dz8kpj1m6qvu4b18896fwoya6vvpkdd98mo708zuhnoo2nhkoq677eb2kam4soz2qlmqq0dbrgsj0x0nntswkvz9z3uk69fom5om94o1d4xut7splj2ys657axchiff61d44ai6vowvex8ecd5dn310wiwx9orn896ctv3i0rzxi09197jjzo17w1aekd90w1x2db3tk2mvkr1puuxqkrmskawg1zof8sdsdn2ifgkvamb7kmn3a0s7eky5t3k2a859xs82n79v0pk3t86n381qm44pq0e4clknibbw40w0ej8mndelsitgx84awt75a1rzsc7dmqz7g5tojn4aevcuck21xeulqdae02alyxkw8c1u3a43l1kbpvykjgkg20kg9yymkwyy7yhcywpby0iesjwum4ssq3nm82ghszzv8xdl7fvpl78xvz9yls3458f7pdnwajhk046bhijkrwpn05mrt52h2so8tyk8qqg8pmgrt',
                redirect: 'rdxbhvjyvcwyckb5s1ekqxkdcez9n8ttmzopbxd7zsgzs193147zcvmgsrfar8eelbrbfk6q2m90597m3hdx8z0hf8u8f2oljtggola9yov2g8bpsy519r3edc5mv9m7r0761ktlvhuo53dt2c5s6mxgdvxgdqd6fe4yzckoalkj0nqjbozhedw0z6ro1d7unwuvk24blgqv48uae7hcok8oyiwt6nkeiipw15x54i65py83dhtghc04w0nedwtughh7c04to6tupzhah1teik6d5r3i7stbocsrwqihqrr575foxv5s48e1gf4a7s4l2qkkr36meugo82dyfg23bo697fx151vnh7ochcebwbe27vlklln9i6fwfh6kbfcwv4ejcaqsle4ezo6inud60f8xvxwuq8pf1pe7cvrb7azijzxtqduvfodtijj7z1h9bq5q43mm6u1u14gyhor495ke1n27fp93foax1n5gsr5er6bfkw9tbaf75twld095v3rxs9bftpvv75uzqp5t1plbh484xkdf2hwo4jrpau7xfbcmol6s734jttda3yz2qewd3my5i8cm6q43g3a4q4wizd8vzxiflaj6ixzq05qginvby8yz92q0os0vdmgi3od7nkouu61h21hmkdtgcg9pwe7a24rosqyxtyh0p0fn93ruuybirjbxtjz7xml90pfbnaw3sdhf471j4ik312ged1f4e65pnj4anmw6hg2gmgnku4rxgm8rxju45ke2ujlsjkoyi580js3sf9r5f5ttbojqypvx37gc461mxhgxq8l2tc6pq7lrlllfw0mxwp53ctw7s7y0bmz5nkr1rhvzsdq2ru1cthy10nijif8pkhp5lupjbuyaktlyrtwkjjngqc3yoqnnvfso0dcetg9xadfvmlin0vp3c8dxzttiummrmcqikdgmgfqg8nqw7u3xtuwsjj1m2ydmrpqkvxv0ug4u1k6m0v2jj9sqyhlgr3opg714iizz6j9m3szntbdgh5jjfns657eq7wyut6z3yopan53wrxm6cxhyxeig4ub1xz7r9dchkpfoasq14zf92ak6u9lme4yzp3ervg5rnfycx8dp8grle6h6f3ucgvicm98hkc2or2119i6x1nugh594bnuvy56wtped31y07vhrlatoka9mw30k8elj0tdzl8keh67u9532b7pyj4r9g0rma178w2fuane9xvbddh8vk4kfptn3f73adb7dexxke43wtur6cxgk4hfrn1aca302nwj5t4rzap9a64qo8rpjrp859era1wrds9l4hxisnrdolgdz1psifmsi5dphlsf5vb3k4k77ilziwyl8ebr664f5oofkslh2qzuebdgk37mkdfj4ihfsi8ps5uecykr84g1nfk1g3uelgmndmvm0nk3ooq7hrx7na2i310qhy3c4wogowidvarifujnqsqy6z6jcs2uagtq911q9ut1t4agn3h7dq2ucwr20ewtj2yoscksxd66hgbz0q2aabunzxt11bvcu7ce8euw68wyev5f4ujqbjib39y4ni9oz8gifm7m3cojlm2naplss8cmn45iv95ubklk2vqmaenfpzutovf3b43voohf05rkhf6ab7kmwzpiyu9feawy4vsxubc07lxw1wjrvsusds2pdrvx6d3ajr92qdzj52i03y0k785qkpyuws3u7qcnr92y1dag5v9o6pohvzb5sh2okn1i2rhy2g3ev8extdvafnojltwam2ywbi3uajuc13mziqz4xjfzzcn7myh633ndwonhrpbxyn91hsaq0cwaufzlro9t1m6783qxwz2rxv82j5x0nhgahy7wrssmpvjp9gxh8cl9wkxdhgd22x99j3fknkxurtphgsfzl1n0eg4zpaxgw1vwde9cdraiwzeq0x4g3irhi97c5qsz8k13z0pphejysoix42kt3t2altw4akyvix38v5nlgood6ntvcu3nq1y7lyhkrzecxae3sauaw9lwjbqrxs4t0',
                expiredAccessToken: 3291561216,
                expiredRefreshToken: 5803517485,
                isRevoked: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'PASSWORD',
                name: '4bqstiqd33ypabjafcsuylk6rrcok1vnzulmtqoesqjikyyfklw8pkpmktejx10pmu7bodamyown0gjb7bvf7ukrmlejubi5wfrsfov65acz0b5f0fyeioloo9h3nsfzi2d2ab488i0076b71hs8ufz0p77yzr299eilyyvzupkq37vrwrojgl6ry8zgjb51b2yh6y2oq71pbgaw6pltk25lbxn3ne6wy6i044k02c97zql0b7hynsah764f0dp',
                
                authUrl: 'az3imgqgdm0mpf91ol6k82j0jbh6x3hn59k5uwb6qht5k71wm77gbw3mo9levh9nu02gi4j3tn8rjs2mq0nwac4f7bdlhomh9m0sesiedizyk6es13q7msojcv8vusk0o1ufbzfee5qztk8la269mylskc1d47uzj3ed9yychna6u3qg0p9v8vg825xyzu11mtk3eqzqgciqarvg0lhe4p12n7vma6th7ptxexpkqhkuioj8nbws19xii02qgi3psedt1y01isooo1gqtpzlssufq83q9g9knprcdpd7wnmov2a840f0yna9z922fg83hqc0asbwqov0iw35i8xgeojfncykzkztrv1s82k4qh8o9ddlh1oocx9fy4n5znnwtzje2hfmg1kj6tzwdz0ripkhqcrabs3e3wiemv8m60owqugyhgy0qk2p5dq9zjz54lxcif33b9xx2f3tjg41ujjmiblobedzunlsxdqkmu10zurehvtdn55xwzjtcilp8clk30d7j12f5b8ga58zotpnmwwkfkigowd6nyq24rsf3goyi39u66whfvg0a30ws804y251mv5qwq90cnl7qsowxq0xofksqz90cb200qm5nb4kb2y0d2nb0djymaotld6yl3gni91zu5ziushjegdjxlovmm2pepn95n85uaf83xzk9q32v4so0qt4i2d2whrwlhr94iz603rqcemfpjh2wn5awiu3jah4b49vaf2v0npf06g3g5417k8llkhw2dvlxfxs093175nkl0mt9eln3il132pfsfufj6427vys3mt25n1jzqs25y85mj1dfl4jxi0plsxjk5rfvw91kpk407q2gvpkhmy1wgir0obkwiui0zgd8kt42os3ripsjg3p0je0hp81kk79oj9d9lxcq19byils1rkj0b8mnif6annsv9n8rcepu480u7vdhalxng03jnu48d8eegsgurveat5e9cjlnjce36qzva5u6907vpiozpzuqndu4y13bt2wrt690y7hhyueovawsmzsvp6jp43mpx3ujv8e102k3fr2u9wznadhcb1vahzh5nkbvrbx91aiqawjv7nzi37h3mku3lu5c95b9jihqgb23vjp5z83u9ijv7zp16k4ed4owy4m347fqcwew1rsk83lbe325bo2omjrvtfr5oaf6hhcv6d7u8jc5kn9pz5v020h6i3dgiln1w3tfixm74tt9xuj19rkgq1lwfzw50mo8ybdimscs6otg8coa4xtysjypae6n8ydmj9rv4tlmknyknjr6v9rib0zc4w122lb6hpxsnpan5brnrsyk1tsk2f1hoq9koihfaix8ysby4kwk2x9gn1r62p3vrk4jmhex35sbguw20w7mfkrphonfleyb6l27inyrf6mbyw37bmoycwmwstkajv0lgi5g5fwcln1t1wv7pq3czktmi0mo97vauy8rg194us2jd7jj2xilk04p7nmp7sga04a7drr19pplhu85mp5s49h5k65l6nxz3qe2h8xdavzleme1lazpax2q4mp8ag61t3n8gzh588s7g8v7r5agvri6mksec63obfue7kf2qadh4zad7oupmtp5fol8o62d73sno52l75ke6ejzlus4ltma9alrbew6ni515w70m8wbbu3wo2a6ycd4legr8dbfgiat6yv5lbmzkr651lzfqkp91iw88ccrmt6tth7pe0v2r32qmquzgbh7xga005wq6jchf6wpvi44dqvsjyh0psqtipd2pw5xjr2dssppz80n1a5rz86wmx415ochlmzs48pgmdptg15lhuvc1gtaicoqn8i0mq34yl1kgzum7ra28o4jyi7cimj7vrsruyh53yg2ttt8t3xh042fgqkrz2h87wyacomgndrjcgufgvv5yffacjyot04hwlvbpqohkica06ncvq10gukbg2yupbw8q1wi15ztpmodydzmiefvsrudd1llgrcmisbh809biy2qo3u1eqn0nv530keo3kgud6g',
                redirect: 'fp5qe7jfzvc1fvhf6rzsv99u9p59msq6uidc66fj7rh34ny02sgit9oyc74cehzfulhm6urgbg02lxvvxsafed7mokni91edvhmgsw8wqc3ods4slzd5mbwcx0b21cwnx7v873nd6nroous0jfhal5fo4kt3xdfwko3u687l77f4z5o5x381hjlvdc9ismz0sfnakkkh40xfnfbfg7srmfrtxlxtk55wcnyq7u38cerf4pth7eeai6fox8asl2d6wavwwy1vtdaaismnfagx1qmj3s4vyfvpmxg6573ka2d9bokl2fc825d2euziwj6cm78tfi435w6jqi28tp8mz2x1rtcvx0wgp0eqcp6zcvsu0lo77swgf02thf9lqndtxjdixtab0eiplsy4yhkbgzcvppoyt02ejbk85rwlh5ze5pcenuawi8kx8buklq8mynkrln8o64zrtg2etfmfnh1np5gm68k542jitmdyv9rai8vc1p7nqxfm3kvagqlwrbm7usoi4kmttuzck121khu1pmjjs03fcp3c07l9hnnybnt31ogkfj1bbm312kertwlxylk0mtthmzwj7gepg3ytlqt4r1joa6w7za0aacpmlizsgklatihfq8k79gteoslx5bkxeosoyd4hh9lbvvu2z476hndy7cx14rtsb6fuzqs4x1j9u977w1lew35svmir18ftv1022g61xx98lw3jpdzk4vtty4kuf0h7185s2cjaii6il2i37p1viskieeadnnhch7qf59w2c1qijy3qfo88fuonog8eqwsavzexj20bi3s4iiq8f2tpauh9ur2gltkluufyblk7qjdgfelr3rugspndz7og34twmkvmmt822cjqap844y0qulb8fuwstpeov5em47ydgbukk217onf2x73upp6koxeoja7oeh0xr7bnxlctd21zbmnvs4073pktct3n19f23dqbp7q0wvrtgk42xwg31am43dxrx28l8l48exb25ww4feyltlryap8czti7g7mgjewxr72uhbjnohs2s29nu691vhyxlj1ri1h847gm6gikoeug4x4f4zov2qteu96q51d50wxuzvsshcpecn989gomzzl7pliquhdarz2jyd3rey13m66sewtofxf4qpdzekxjx417fsaclzjehd08t8hh7428qiygbbp7x2w2u0hjiz4bfcq3jndzto03bmm97uj07p80fhiujobeggmn41hquffi2gk676rv2hrhj6wryy3pdz0tpqgt0bdkiinairw6gzux6cgufnkbur2sz2dci3es40rgbtzlvxw8mbx7apmgpsaro5q9nkfotdpbsoddiyf6m9pkv73o2vp7zvbiphob1me60smrjtcmf8jx5reke4037d2bmaqyt8yy8jzaxocn6xti3t5l79kjwu1yfrhrzvmgf2ls6bfc9u6dcoh6w74fos0ipig3rjna8fcmva2gffl8ng3qg3lv21wt47tg4397k1ufn3tranttyuxhgs2eksgudfedmqdtwr48496yiebkeftmdqi4hbv2xzaksbo2vxths5j891l6ydisu20a2cnbwuzw2gtottxiez4qd1e2gnk7q4aemrr093kfmu8nt8vb7dtkckxwomm1l5a84iis1fd60ghn7o7hfwfxvzui4uxn8fuwu6gxh23rdx4lzzcg3wu2pindw5p0f4y95ec8hxgftef6fkaccdkqiw318fhqvuuupuqf038w52xj482omb4qjb94q8xez65onk8teghxbx7bg5alwadhcf4ur631asnt55a8p3iwt15206x2y833c22ldn712skjbjxrz2ul8rr4wqywlkujtblebok1697a8t7j50bvptqve5cjd9uytdi4o4h0ye09j3rv3fzqp502nxqn7iu3s06l4hwx2sxcyji25omdri8qkdwtp1znmgvo4en62l32umw31gs8qjqpefddl3ecynrrhncqsa08wif15ckvdlg4m0nhneoktehzqxal',
                expiredAccessToken: 2696104929,
                expiredRefreshToken: 1478348855,
                isRevoked: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'CLIENT_CREDENTIALS',
                name: '3e5yve33m747c3ql58q9ba9i2taqsckri5phgmrl6zy1jt80gxpowbxiux6ldun494zqathhamface9l3agtxt4tyroihk4xstigwi3oof0gv67z6p2bgnszrzhl8pv256udamvpjolw8et7t1hwbebzv7ql9o8fm4g4yvdjs7z7j4hk583r4isaupr8g06thrdfxc2n7qbmh5f3sub3k55f334cu4mrt95xu7wn5qsv24tafp5xadotx0xnc7h',
                secret: 'xxr2p5hsxzyw982a7efwlodijngqu7e8rupc6ot4zravyejgml8jc6qoe7v7m7274m6d4mfurkm20k4e68h354zuab',
                authUrl: '3qqy5dwjs7tcgwcmi9qf9smb2gkoq5rpgt81694q7pfjy57y5vblu3zylqmns50js5kjqi5ol57gf9p9udbf33tyjs0synhkrgu97gu7t58gy8vfll5cloe0vi3t8bhx26i2enp0jg7r9oz695nuevzv1cvr6jo543s5sz38vsqvore70fexlnow91d73eg59eme0y7u9et1br3q3bhyrtxo2jeo7qu7jmttl93phd38n9ad8axudns4e2n7gztdlk5ozr7523std583gszzojmbmex961fsklgl8icffubt7g6zfx71v9v3n8dmhj592qla3h3d480pc4k46bi4jxuo6nb7a83heq71dl1ce2mq52ntid37rcwif740tozkj7lfubxf0t5kxs61sdwji8ukkedl2hukvlx6778aajigdwpu90izsei1lfvh5hlvaaib5ep7y241utqutbsumvosyh4pnqelin5psjff0kbsuse7l6c12isw69lka5xlq4ru0vcei397ignscov128crncgmcvu7jo7v3vvgpoy7jyfcpm0t0iparwxnveeqbvu9n5uql0a4a96z2fm09pt83iil58q18x0bkq4ez8i35g73n5yd2c2azrxgozbnfqtwak0tpxvv8rl3cwp2hzx93ip93zqt6lzbs8djzi1l5ssq7g2daymgqj1wl52vnlp3pbsc9f29lb4lwj9k6b7ahmi7j1m4jrf7au99057b1bmnhemizcbfqtscc4opiqe2gw4gh17dtw8ewbt3v92atroza7prxxxarklqc8rd01md0mfw6vitmjwmcvrmu8afq2cgkse5nubiv9ukvpff3km6n270pwb3gt30r4fogm5qycfrqr3w5put8wp9hb3r3teo06h4ajb5gyo7b36h0xgrxy58xjj1cpg71r0u1n2hpjp5rpvip7q28n4tsk5tbs3zpusqz0fxi63v68sxzu67or6dssi7zsn8dvot14xrr0j03zcf2caidzbv9o0wwozrmkhz29np0t5t5kbrh11ymx2d3ib1nwu61ut67cbytwob54xibv9f82q3cny58moyysq5107ssr1or7245rep4bzkk55ux1b5vrc9t007fe0s2kgg8xqnflym43xxnmz7kci6f85kzjcqlineq19a93cvysoxs8r4lkw74lxfh03psfmlnhtk1yr7tj6f5w5665uxgf6zc8lp7ui2fyzr4jrf9n11hm2abkyr1inrowo03vpx4fstcn0jed3u9bt6f3h8z7gqedi3tdllpma15n686i7ob8xvghg1pu9ontp0akfuu01j9r1gn9um4oqb1g3v8zo03nvrrurwey6rrythac7w6qljkqbu6u3j4cx8ni1e5le3952j9qpvwqudcm8shplwavz4qkawwh2cmssrrx6epiao604ayyy13akr3z4ns038ham5p2fk25w296vk5h9in71ra6thum6vem5fc0wzn3ld6cfj07ntyr9q8ztw071pblq7d43egwu9b13ow2m41gngqcdbfyp4p7s9sqa5oe4fisxkclvqpz88scq2yn7fqdjzs2g419k3vgkucezlju03yzxkzd4rl0n0r6rqm316rqmzgbnsmddatics1xs3c6xrq1vf39kxqev694gc3dshhuhny2m19kktaa9b2glhs55k6midxbq4aqg26g6szm5v9sd5pt78wq8a76iz53jlxmzcoix8z9gfkwgcay8nwyfn1azzfo7meyzjc86q3p4ft9izlzqiavauxaz1tzd8on8qomb68wzn6hjl1ncqlx2ex0jt6mxjgiq2765cr4uaj61zhjctopq5fbm7j869akal8563h5gy3cxs8lw7b5gup5w9fzaln27bm5ozbm42yw25uxwggxhbylgjji1au7ac00gvv2lw70w3sp7ymmzjcp0mk32zjzasw3ubdy75a86t67gsnbe5l3f2loljbi1q39g8mzv47tbskc251ts4pk4gok7aycvqiuroccto',
                redirect: '7t98kdlrzb8nkvtzmseha40374tha4n7uv4l0qnifvak0ea5q8t31kh2n50msjy87vg4iy16fkmxatk6ynl4rxu1wr41cvfjl1undnshs2vm46jwqkjijc7q1j8stvgmtz36yjsn59becesw0uh12cvp3bdra6zrapbis5rtbtkbai9lgtafgv011lavz56h2toymp582p3wrx0drm9xnvzm2z14fngfry3580qdgge334ytk6hcaavott8t7yen06ha2fyoelb8mpbz8fmf02d5ayfifbzboe55tmq7x2m8901r0gf6xz29ss04bhun8layi47ta17e5rt5ormbmmey1d41y19k0mwe8c6qv0lbctlgvxm8b5k32ywzcrkcgkm8on5fzqw6x99rrr4arpme83cdkzsp40b9k7f67v7arepqbw0o028gv90s7894agxwokz2np3exst1etd4kplxcvs3xvmsz9uj28hiu7228wwlv9ecs931fullilfr0ktea1sxlnk8e2itoqn1f62ktn93wtr4uftu9zdf4e49xxymrzqp4jkvyvg68pdkjwjcx5u39xuy00jtpq44newh1knb8wvea725cp80sfa5z3vzdxt9ceklybba4kzz3cs419n3jil1dfpgfvwy47wjr5jwd8o2v2l1chv37fx45qkf51ltark1nchzp8cb44r9xq9o9fdsb7kk3lk7rd7cnlthhf0li8riof580sk3tnj7yxqbozlhp924cq4ed3qcapmgllmjvhi77tml33f4akdoh4vdhz5e0b1e9zcktz64cw6ci63hfkl8kpmvelmwic85okfaei39z6blh7i5glku6d949ob58xmbdwo7m4md9xb95gxxo1xnsd0kpapx5p51t30uaugu9qzrlab5kjk75ztq8ldndmfmv5dag7o16qm1289tkl5aqzq0ufz80xmk8l3kula8erfnirmvzbwszui2xlt1kota0sogipz5qapxuac0yg70ch2rdpwawq4nbhhzmdm1anuclrow8jekyywom4ywngyqp17h0a5xwkqyudyxwc4tvn4jku1coty94n84ovu92r6rt1qkhwcjon7n0ez90575ucd1jh2ia8xnbfc0k7rjdgruogivs0f9too7f2envvgd2c123haj8radeqnbcckds0qk8ow9s8ogki2ay9m14iguakreho7z87jg6gj5wqcadwdc536jbvz7tapg4id3h4r7qtjr5iaxywn4xslmqgdsahp13lfn5fhqfjcmbrmhjx18b6i2l79nerdh6pkikhtwwaalzoibi0sjuhum4iih903td1rna6vuifbnuklkew8euctq7p24fboph3ah2gr85t807bgyk15ump71f73sbdim3nz4qtd61vsvxa545sfxpyd4obubd8rikerfnnnced22wqxj8ir8s4kyfps0uby105ojghk8a1faoei6yrl7zt2zzhfrh6phw6jism8r68ezz6utnqq6kaub9g5ui4tykh90pvh6ohtrf6rm5dwmizjnbqz5n003fjsqjron3ad9j96zt8um3r4oa2hoqmdvupuosk0g6caqwl44cyhkr7h4hk6y9a2z6g6mdho1g3nhvkbx02h3tlamweq9ml3h2vyf5nf7p9tfqkj6lqrqbncxa9phphwn9144i7v1y1nck95lilpsfurz1t6rfghz57r4jcblvqha1usvxudhgfti43dfktwvscygkan4wu2egf7442twn3q3b58yqpudoqwgcd1nk01cxmca4kbmjxkscmt1r56ferwjdv1oi1xk278dzjnx0bvoj7vwu6owlgro6ag8jk9zohey7einvvahs9l3ktk0ect7ynxrmi0m8ol36wv8866kswwevyjkc7yvmlfzmaipjb1lbzxike3p9nnq4m2r7zkb2h0towk45sfophfagitwwo1qmbyctxv8vxs1g7lutx8sue0n2wo3qur8gbvapsbxcnpmuin5xmq7z8r2y89i4b48',
                expiredAccessToken: 9262829011,
                expiredRefreshToken: 5949825990,
                isRevoked: null,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'PASSWORD',
                name: 'adqe5tzl92lq76gire14cu0i2mtuevmsbv90f9fzllaz43yzlahln9mr3ztajqfnm1cbojthjp69tihkb0s8lg08qmwlw2wcp37sdn1vagys8jqesgorprp5rvyiqf18ahniq4vqqztw8k2l5ug4f2f0a0rzqozgd185p3zi9p96ubh7jv8h5k5e5e4fnjhvfua4k5fl1wpuafsc29j6r0xfp88uhbszb5t5kpdtue3cn3wcxvqqpn32gbbc55b',
                secret: '7ii3y65gfj8q1tp98902nfpcl26q456jt2p2loaig1s509p0rk7spac01r395iqsl47it7rx0s1ljq5qfvu0pdklwl',
                authUrl: 'opl2i0gbmsmcoe9mqc4to9w7if57yto0dq05s2dt6v9sza6wwq3kqghq13ssjwmtu9f1md83br3ebincdtd636aisv7dqv1uqwzap14o9sepkapfa6gi7wdoocrz61edu8ucb14qn8gbqz2fv32fd0x8jogrxntla7cve0mbygdl2twk01a5sdxsg6gtmvzsk9ppk4ui06t0kj1unz8breo4lq6etnou1u3w05yu2fq6ilxux864thpf6sduz7kqos4y5uyvog4ps9z0vev4ngap1sr59z2b6obkjz1vjs0kjftyxkrk1ir2u4w1fv9j7y7zkdd0h5o4r6d7gbar72g3kdfmkpoms6a4xbcgufv6grbrw6ztnkx8am5my5s525ekqbp38yttrkmba5ayua8dwztoky61j9eskbl7on0l32mfswv8bh7ck507zryq4dripz95h9fiyxvfl82ayv6mywm90k4n1nt25k5bo8x416cd4mehhvjalv6dvn6b2tjfhkwza8ydhwuz44a65kz4db2v49sz9zhsy6vut4pkrqtovu9g7483889tm0oqkitsfp85rfcllm8tpms9ij44itj4y0xjwgf11fy03pxflknlexaqvgg7oeqtgoc24xh4glbinxvect31ntdov5wp1wpyov02jpi704h849he2xi7rzi5lbltx90lgw1crfdym44jnt94fef9jul922twll5k36mp7nnmh0mjpmv31n89n6e0jpu16ej29dicai70wuk2t5zasqgca0bn4dccavi132rq6gwmap3y53dg4ow8viro8mkdg2pfchmzbnfxatfj3xug5b8iivagpw7i6k7j4j1nvc66jyed9g2erwym41ajjo5uod6ppz6w4yy22aanl2bmlz4lj4ij6i7tkz3fvbi81hhb4cocue3dvsiechi91uybl4d8kszluax6l9oagr5r8hw7eef45ogkyjore8ala9c2je6yxl194r37cs1j21z336rioj66auqek3oe11rzmxfh9d4smjomfod8kdf0acrocl5zyx6fjlc2rn6xbzo4mi49cc1iimg40b834gvst6jtb0sn4xm8vdcf84h2dqxli6axv1nfdgdi66mpsq62vvh5upg4ob5ilblo7zn8j76ntvcsnbxrj4lyofhpff6cc5zvgqklgsd4y70ejldtwsw6hp4qmzt0xuwze0ahq5k6hyiipnvzbedn9410idiomsqpmcoww4u6e84xchq8q3fxpzlyr96tm199b07cn78vj2mvw82eynrjgw4qs72wmpc2w4u7y9vbd10d840dtp9ca0pjp9r609tbylb2stt7jvaq15kxigovyihshlgfem9mii7sy5dhkynwe5xme6m31wcwd7sdcgr14fhyk1u5rzdzri7upz9gg461onmtx05k9uahofx4g0513dkezct627k527m0luayezanidokegsu6gwjy5qm3jscwqk5bj9op9ydnefu1l53vp1w2f3fr14728z8vnb68phbdh5truk2g4i9a2c5lyyu37ox5ei8lue7iwpampqoes39d1m1m1u03tuhmaz026hpz4vp9qvq63lja9eahc1jc3mbw8hkq55asyiokntxokkim9c0tmvseo4ezmkwcenkqq63phpk3rdnbl7fw6bq2a79g3dttih6lt4uqonhqvi1fhdlbauky7n64eh3o9ajs6dizwm5q6116c0sx352tejlva02jeo77k8fvowbs654q5x116xc132zdusar5bpluua8ic09g3m4sk6qn65lh5c36p00c9zhqcf0acimnipu2np2agw5cyw0dcogo2ut8kyxmyh4bgrofqslvinukxq13l8km2hmutap3y9w53yaclg51dfud804zli32zlk1doml4eht6bazlskpc8iakqlm58l4w3shzwx6itneafivcqnc8ztfrqb74tj27mia0ap7we1258iwjuw0ppwczilms1qgy2ihf38k957o73s6ezh9de',
                redirect: '480d186xumb2tafbev7kokrsm37cuibjxewtu4ovcndaant2fzttl4915v5kgqs8ldvacer6e7kal0utdv64x81o0dq2fm1y1j4k85jlof3yqtbl7rzkp6yay2tz3uqsm4com75a8423rgmk85970s496pcxnikqysybli4ilmp88nymdntdz3ie4nesmrrowl740jqi4tsnslwrnh3wxiqf40tx8vogyk2aj4y5euyrhmme7vcxr9zf2cohrfr4e7a8bx1zhrpsm51gl3s4mk0x7w5st5onei6luuh1r4svl8azdqx1foa871h9588m7jihll0m1f2utlniqw5n6eph020qm1z4yq3kb9j8o8siva6n15u1u06u6b23s5i1qhucx7qbwywq1bbwlhr2j0dwh253dcfkl15lj4undq3yel6z296tz1u9rrf6tobduisdhhy5j05yyo5ni95ksdxx7o0z4ytw31ypo2zah39v1zb6jndfsaerii2xrh44va78bq7cyyi9lt2rs7eaguqaak4lvnqle1oe1w2xkdhfzqn5z1devbxfma7cafbr8i5fxm8f9zjd9j1j6fvmkboxldt6w892n1m24slp0vdxgygnbyq0t8771nae1hjmtugqguznne2a385b0g8fmkygj4d1i7vh0mh1wqongfstc79ene7gzt8rsl13qgzzcl779j0310qc0jia135v8k6spundocb2s5yu9a05atspz3m38i649ta435474ma7wp1kz2rqdq2hhtacj46o96hwkkyja1l0g0dszx5sb6egt6ex9w2ktyjdn5z28vss41bva1m48w7a24shj1rbq0r4d5ia47nasdjcic5u5kch1pi5zfao67t8okm7i0tzy2rv3bwqak7u9d6b1v9jo9q1e1obhxm947izq1qck9uxa78ljbxk28w7txscyaap4loneew266jtptcr1b5frjpog1mzoyuu25n96nweonaxn7qizefmsnjoj7o61ug3djj2tn8u941xlmkknopwzihb16qo55k4sjmdjim7lbeh5b5lqgklejswezbwy7d5yjqxrf3yrh14z7132rf9dio6sfqc30fso9fl3nv8u0mjsvuzsz3wvhcr5nxpdoe7h2rybu11i9q3hg0rs1v3lg4xo6qgewg6wpkasgga4j8g0oatgzyb07clk3jvple4fa98n310b781pecsslpse1khs5yowzu4haw4yanhpwobaxipt82eypqnfsjsp8cvpk8njqk3xmdgoegi8asr95hguoa7xs3ds833pukl696tmh0vupzfz2q7kapnj4rcfquysbsjupkkgnm81yc4uipnr92cx3ilojun7ldvvtgs91z7v23o3sqpybrxm49finjvg6xc6zo0wvdq5qz3mkqkat6o9puyf2sdidnx4nky1ipd3k1cgcnit4yzpycn8art2mzpszicql5b5whnmpwem5pev2jgjd8kpxxb3q35q07lf8asx2zlkhkjyamsj09yja4wlyiqlzpwzsjhf48qwtjlxujxwc32m7wolxvwe6n54dhmouertlilve8fs0rrq5f6f18uy1mqwpaqkko6rhiskr6qg0tuyk1ylqno6c8hgkn5pc28t2r5hg7u1h1h7pojat28lkeqpli12qgurpwznw4tv3lwc0yvca56b7onk8u6nhbd8mu8xmwn1oekbantacgilt8gnaxfq4cu3az8c1fic0u8o0ooyb4qtt9xazb69ut6kvw1ug8mwpkr7ejs21ajl6r7du7w216cuxzgp0un8yo728o08e4a0sp3e8kb1i2r7a5v34m3t1rd1rik6b1bmz32svjeda7ok0y2rahmgs30vn2ky5rqus4ge5cw7xpzin50q3vuu159odf3lpykq8x8q6egypfzyvaczn7wq1eihwl45jbbfierh9fwr6wqozum5mi7wv13zcm9e7bl9og7wnb28rlqm5cn0ocao8tkoou2fht7s4xnxzgn15igrxsuzbtb',
                expiredAccessToken: 4998277576,
                expiredRefreshToken: 1644427185,
                
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'x3spowxrl53dfx3dr77q2sd9g8xxpykb7f5dh9zgk1y1p27zstniydkc0mowokg0ns6hvqsk62fm5y83lofdb09d9fj2ewstncg3idnrzhdjabwiqidzcvh17fc5r4gl9cca9r3rwx4ax0nnchltu62x8m2b3aonw3gizbc7t0iyj67bgwpmtzcubh243h1lq50khwfgv0toi6ycendshpyxnom5dz16nj1rr49m1d35ydtt4j2cr9fj8e7ztsy',
                secret: 'matjxsdcw3ddl7jx3ymsldsgnzemiqodl1i7i0udxgkavwpykszbnni9xnzb3znx4y9fvbepgcztbv6zy8dfha0nnb',
                authUrl: 'z7lnypcv6v2su55tterlg4bw8or6ckskpumvmuu8r6ay8lxgfkjyn1t3oxazyg0kzr6ao6x299apxpu6ien0y8tap7caddbjqkr2v8cyo9in0z893amj3qimuo3w1f6jp1a97lvy5ku3dggdjomblk9726d4rr4fskiirin5b90a6e5qoisgfujjw9kacjy6nix026fd17ei8abkd5m48gd3belqmr030fdbr8cv7ngia93qntxqkzwpiplqeogpt57rowpdsiz33kqxhzxcwrzl8zn5ky260pf9rertanwy494xbqmprf4slqgvtm76ifehlvw3lp7lkevd5dyxhv80rk55gue5gj7rrlhd9eoywai6jhtndnghqds0y381ocmyv57bfvlrbmkyqtiihqf7d4wcs5y2dvtescwr5jg80nbp5ppa1zrv9w5thvpzihqu2085ayud1a80xeokjz6ernst9plby8wkqf6dw9wvicq1rtv8kb045h6x3z9pksnaftbnf0m7v5de7rsqawyk159rbp9oa47xk39ruyi03rsw7cf1lk8k6k9mg87yc2qrxs99z52juk6r9bu43v811emmwuz8el0fy8iq56502p6wygizdumoifybh47j2pvxvdtfs6qr0djrc65k6155nqd0sw5rkzaiuzjbrvxlwi1uggzqbcjk44wrcal069xeuxwc7gi7t60ns8r3ffs8m9cns07iy1oor1xzbi8uj85nc9l07dti5og4qy7d7wpszdu6vmxpy49h2tywhg7xm1sl3uh683chd4ixgdigke4qqrfr95fk223s4oag833e3d0uamcmzamua5na34hkui00dum7e5rduv5jy8fgjlqq7tfiyt1k6j68uiqbu3zrsg16npdb5xz74tfs1617yjxt7os4bg7mkn1sk5do962prls1swhomke5ji38f1d6dwlve25xj0iye39ylg2d8nctee5uyh0kb4stmu1rg2c8qlim3emvirwnwumvx7oqjh048z3b9bxo0eyduib1i55b9ecihib0uqfvuuuhplpf5hqxqn4h23t9kl630xk64h9l5vzoa7l467zwfoi63vglbgo4ajfe58lujwle77l9wjqelg7c8tbydskdxnucsegg4panvshybfxly4vrsl708jbox2og8fg48ibt5c0ll3vwjq35ucuh8e5gon0k9684msxzvtowtrxx32p4unrbil43cv0hfhqrzsibtaw3c3wkzgfd9f7jot3jvp7hgqniin0subt7yjvytq0ihu21i2zlft4nmc11oggkl2syopfxgt9qksl79gt8zowtipkzhwqxkmvw0oglih71rcd1xyekbzbp1c98dexv7edcyplry1p5sn2b90cwb9ngpljfa8tvgrxkmjo53a2xjpe253cj8vmd6bmu8y9c5l5ksw0p8ud9qxqcnnxztrwwrke3vubh4mrxrtkxxq0acaj7spyd924x88yn9wbjn0a40ja0so4vtrzj55c5mz0ixqke3tfuwld966rjniylhejz1hwa478j8sakfqaret0o007fatut7lmdn21506ju2pk0thpr1u3omjsgt2f69dr2ckfrrzti04dfhzgc0ubxkk87jmwikyt82231i5ovgli4w2vgepm1g97o5aleeoizimkodcuhw9m6dbnkg7icotyrdft6oom8qimhxd5xtpk32bw28ljei79dppswghqfk5je17sk3lxv0g8vz4ne2xeh9c7gi79tanv8ko78qzwsc1xmwefy191l9t86ye7g97wlzl9wcpigxg6dzgzqda6rwdhwh0k61h7cgam8q36f1y3rnrd4bgflgkx3n50ycmf7ahe4mindroupa32e6w4irc5r37v0b42bgue4mgy8irlhhl3nicuasvzvyolrqsj8qvhfa2ty3vjk09yi46nrk61me49m6gxl729bsas365xbl8mhw097j1g5yghtpp91584gmlwd8t8owz2uzmbevybkr4v57dnu',
                redirect: 'e8w9escltk1xlz8ir349xxjlegse48u2dv366l6rgkluhadghynx8b5fr0xldlsp45m3qglqjqzexkaomqndpwe38en45q9nu1qdzwyqvlwlhrsyyi97wj76rh1ne0tasd8dvqv0pin2iqdp544mb20gwaa733943sg57iyli6qtxn748iqrzdw0nmcmu1butldackrg1qvaay63cip4eb8efcziodce7wsiqjucvaqlzso1szp6b9p547bp2s0a38h09mgvo4r8zayrr0935qr8ei0ioddr9472o654d1vj74nr06xn56cgbojaqxldp9dumvsqbr4ciihgzz5xqk14k0bml2hzcac8l5owlqhzeu5qhumpu2kcw2cjaxvlrhjsqxv0q6v1di5539cylzzlbi41spwoifnpa3rdaors901t8clnf1o7oguka94chw2h9gwrl2wt9sz7ib61bdiduvjyabcitm625tyoww5omx1pvyjj812fe1ftcoiwxg51asgbjgh4kj3r7fsx9gseouqxjoli36sx5lbm33mgrlpdneajox6tgwftaoiau31or91xqile4q2k24yfxa5edrzudj3ynh1r6cu9w2qbltb218y8m1wdb305x7j4168esf0k1a5ghj0b25xg7be4v5n4hiqx6me6yvw3xmze5r8474dgk0e38f2k9igpaml7sk4n36z3d2ejr9ax6ry2wvvhgj560ua2dwcz944cec3464dnquccenfp3tcfdd4a750mkqc2rw432a1hp3rpk5doha67m7exmp1s1m6trzn6za9i8v02f3b6f2to208gp6lnkrbev946r4t9nlmowu3zh72jbdbz0asxneg8d5bbpau9bqd3ln31e10d3awn2hol4j50abiij1os5zi4wrbvpfyxdxc52vwkx2btixwkqq00eed9fns8dp14oryxma7mses50zv7th1gu3xtx5y19051jl3lwgtm2ve8fi3r5ugr9mdq9h8mtqkajvg53jr6b42r8mmyad9sf1ccjhs6olvp23sc3rafpwlfu81i5iersm5d7mnaqfxbj8tw8cbktyzs0jaeg9o2sy81vfos2jkcovopdlj48dm3kvs7xm03htuvsejph6bdmry1d077jc81qv7okjv4cmdiw8hdhm2edobe54clz1ulxwjkep0ztmj817h626xov391o0vv3rjpxi7kddv9j225a2t1e553dvrx3ijtrqdv1ap8gkbg4moouxywe9z2limbe4346wkiawtk81moqzlp8bzqcgpaw67trwvvtij81c6saxriijhoeodlt4875obtz2uhw42zfly6xu50gkkfec6m75v4udbt7gpgja7c4xrevfmw9kqhfcz4zlqusctizqk4m6mcom826uiua72pq76hxvbzualyc5fnlzt7f6xr2wn4613n0zkat18xvh3w2xy7qcnuyhsufz2q84ug39gt5uct92qnk98nm4ysyj93a1ftld0m3kh2vwa1xyxh5fefjvf10ah8zojt156b1ih6mgzpy3xk5itu0jyxvbri520a5lalmzg2pofcmxwojlsfabivgdaee00xrswqjb8njunyo0edqx0lollvewkbrer1uy4rsuie5ti9lacc8889znfhhsi8o1devt4r9eheqv84ercawv3wj23f7obkvxpafbrefsn738o438gt4lm8x0xcwwp3d5ks83mgsu5q400wsryzdamhzbfmaqwa72pwnsye22erbfp3jfxpb596rcc1b0jo5gwt2rnjhfwxb1ouw94exi0yraqe77fo6vgbs66g56zx4hl44mpcx2otli3g4r7k5j4u0c9kfrtsji9ytmjv6mdaiq11mz2vnd547365i769gm57y5fjeyuajzwubhii6xbzo2x219di1ytuju70gjvpznrimd45nv3jpwwr81iukfbkhjcxqpw6m2wcjwjxijqm1eil4n33yja8aat20dpanbo6qztxxi39wuhj0gaii9f0',
                expiredAccessToken: 1303587549,
                expiredRefreshToken: 3735469334,
                isRevoked: true,
                isMaster: null,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'CLIENT_CREDENTIALS',
                name: '5e4h9n5f21v3v52knnkepc64o4altpvs4zu7eud8v14jp3leqk3e4kq9n7yp2teub0tma92082bjg6vnv5cir77xdlfdzsrne6z84hup5vszugfvigp0dqab689pxlzedp886koh4rgyr641krduyt0r6r44nzutneuhrc1y3r3xaafvk2hukadnjeiistix4exz5eju2dozp8ep8c8v99m8pv88okxjmo5tni237xdys570fbj5d01yc8siy7r',
                secret: '7m0wllyif7kajmvkmvipgbxvn9whnzmzsl40hh6owaqp8z3nh72w0s42yn9k0kwh8mask8hjonailpga2vmzaet1cl',
                authUrl: '21tiuavxa7dag0vc9rl6vnazxvurbfhk6jerz7ckohudf8jo3yyzy0021oc6b5kz9uewpgf95xwhr2eek140lcfy3z9nz4gy7mhzx7ugnpylxem02cbkfoybjx8cvpsx5ul6ph64e5jek9rj8b5qh0j1hbxoj2rh8exez4eodv9z9qacru5vp2dms8qf6l7f8226niktzv2xg2r9walu9spictapnppgc1s5m0v8cr323jx727afzp16uwyyjjgmj0izaf50on1npm3kadt8c8ypo5lbvz5g6yxgrdhrs48e0ex6e4eooblenb9qxctactrotfzmw2giykw020nb0c63uqcddz0gtbpiw856qk3r6ylhs4tp9uwcqc1ploisznrlhipfkuoh7f5xweq1pkz5czw6zkswwsgnykymbdfjk7y6wpnlw17xi453cfab8q86cew0mzgzssguj0j24yy92bzp8poia5w6txg1a30nvglzltj7gpvj71w7g2nc6oyo5f1y6t5h89q6mormkdnul9dwyj9logke60whsqzycz536j6hmgvqank58dgr6ybel67ysx91yk5f64vqs2o2y120u0erjxa7i88f3z9k93hizu4jsikzv5lo5bxlp3zwo8902cpibrqtp8fd3vs4c23xw454uc3lsfhntocrxqa7e5x4joj3rxln8fulgchvvfyu9s7j9z5mldyvxmszxyrwsnyyao0woe6htjvrq8b0goxeazpfovbxpj006v6xxfzdq9a3uyt3m7f53ca9i8ts7ub9mpmrk2qggpdfcda8amsupbp32on5m741b3c42egnf4jv3lskrv09cotlgdoy3be41xfmgiwdfs7j4t4vu0d6qouzemo7ik36kd19iicmpq3ssmwdbyqciup69w4qglrdo1y26s96qb0tth81iy0iye7krvc8bblw0hjez52rp4prdinz4jsv81to0h7w39piad19lj12o52wun92vv0et7i3djstmn172mvt76pzq2fngtddo9fwtbgbwmnvy2mgi8w2456zt2bgdieitw5mazodhpyngu4zuiqfxrgxtqp5sitt8jf0241l2zip4b7k2mrlx6s54t6w8jc5sze0xesh3daogq56cw2826chluchjef2d8ng1wa321xi91mcihersxo9xpsn7cwn3woxkwyy2v2kmid8n8clbiwbkto0e7hqqgnstptkbhl62h2dnf9dc9rfvvxvu7fvyig0zqzmd1svr2l5t956rwd0mwc1q4w8t1rb58sguswvnk6rdn35ajsnzhyf8yttdyi07swf65hp095wusxlt7nejmtarfh6c257x7xb6gyjav803ga7nugka707e8seqb7ykgah9xquxng24rb6g35h5065p55igtwcbltd634ye34vys4ccst4wfl2whe7auw4nmff65lifpv793yw0h7tt2k34b1ctnzxiftsubyt0eba903k0mrcs7vq4tm9ry7z5802yu4zxzm4efv83ippz6zcnejv3rm0a3wv6vauaobx4yufhayjg0fzadci816x263oz1pws280s3ogk40t5whwxxk25dlzhd1n5ajslyjdakqf0o3kriiirbcdwrxclp8l0zohrv4m3p1zb1yk2nf3yn9e1vwm52qvqx2inlshvgrhrrirf92at19wtmtgd8txyff89bybws799i3foi3nqrt8itupj3gar8echkpdqeg90wu01dmskk15zd56pzmqe9q9fq6i4r2etosvzdtvftu2tea2kqvk8i1qn3vw5s0zrv872oyfh4mmd6f1h5wm7gtn9ft5duuke0xkopwne3s0zbcrszk3bk735cdgsb1fel0g54onh9yoiuarx2p7x29k9o9gup3uuw8cho5lei7zgb0b6chnxd2g6zlnm1z7ck91b6husv1m1kx5p43ztsnlo8empm676ix9wlgo6wspqrupibyfkxy0913lc7dgcihdfk2wxcjgwnkmj8bqozq9n7xl',
                redirect: 'uol6hn8s0aewxeex0yttmnbppr48snz73eywl6x7atayf50i20l3pklfh143k8d4dmdn6wu8ghimhnlqufookwfvvv1j3evc9itzrpzk6odq65pnb54tlfmacqpkhld47ejylpr96o2xa1bxhj122w1rtduweui6j3lzgpfq6ay0qlohgqzos91m6jdsdvw0qw0byzj80m7zd9mnt77hoytv1nvd60sppav0v51qwqlnih4hm8ofgpua53zsu6ar90ocu7nwzzkeviirv0cxscmauovts7erxemh7de7xzt215rstvlhwkhlr5sqgkjen2sof8ke2rzo0tp1n87ylz62gz8dpxri3ol11wg052oc6fo047dky9hh3mix1k19ll7zfexjgfurgw1zgz2pwvj1ct5gpvvfecbf9bajflga138ck9r9tizm47ihqdnn7565msp08qmw2ihl51ahup7qdjufjlvpf9u4y169mk4hpe9mzwn0poudehelj6hvsrwo7miwqtdtgpp34k0xdeyr1pphvorlagddl0ljvbucx7gjkbygvrz6ybdzjtl0wlrknt0fs4a8ym2ke3gtyy1udrf2af5o22wptvuvpme7y4gn9lrn7vara86p60wqjwzic1br7xp9f359fvqtvhe129f2jfc77jlprc4b14i635ppvik873w4g3i0wfeej90wc73t130pz1mrkv4q25kmea76hd2y9dqrhotwq2dbn0fh95qb0gsiids4smy66i1qe6e1aifrjjgnotc9obp50uvjj87os8tl4knxe9xxgjo754wz00turdptc379htuz2bpt5j6iho4aipw1yqce16leqkypv4zkyzmn7o8rtgvf0lbuzbou7muntt69qj0jubwn5hntw80hfedthijffuispm6adnx0av7qtcsm5h1wak6g4xmdcddneddp83dxhmouxy6dmg18587atf6r8h4qmfn75pobbwl1dhwv8jf8p95stnykd3e09btl5n3yhxpxoq7v4fatg3yn5s3runm14y8xcfzp06x514vx49bp84yesfyvujljrii1bclofrozcdpovl10y7krq0xb1mmaazcdhkgf3zdh1hhngwlqp6f5lxl6psa13f2mwdodxaro5oeoa3vtbpgqu179x6oxfd6wcb9y7oq4iima6u2bqd0k3a7yxt04ym1dtt95wl9f3mn2ep2jwpylmw0xass84sse3dvnblxp5dqdwvvf0nib7ifdhyfir6m4z46hzi9pm7j0amrl8uttdmxl14881k6wmsgypqt8c6qocvduz7oo4yl5igl4ieojetdd5kpaefv9f4f7l0tz2qsty2opih2z0beolzprr33wvm4yoaaqmqa6vzg1tel4yliqlcfm6836013q97p70rf3a5qlgnkihkjvr3tdc5k9k5j1pbgsxf194v884w0uc5uqbz9z2vswea7mvdwc2jqev31lzps7rt4ty9esops7dpk3m33a9oj0xxjq46883op6p1k4nik7gbwpbrphf1kkprv2is9girl2rgdxsfr50megf3x2e51mtlgdb0dmxm1e3xpjy6wlmk9xenqolxj2o0f9yxnzpt6geukgknc9s60kc506mjmk5eorz3wh3f8mmco871l37d1fi164snxx6gi0fvaeb4rlpaa384x9q5jjuumona8x7m0dez9umqr79lku9ruc7wzw7ai404kp185ics8pv0l6i74n16u6siqphn52ncan003oda4gdd9lo5s9em6eyhemanctt197s6lpsw02c6mouybbynlzlveef2fa7m4no87jz7rnnin2nvji3ejnemqp6zkmk7stw878wc1dbg76tfge4ea4pctom3bh0d8wisfjx980ld5gxk6uf4fh3e82asnad2azq3vgynm2fzfgbb4m2rfobzpxjo14zgnw2cgmumhet2pa3ag2hmx2e8vs9hhqgjwvqkrglznmjomnnbp4trz9bnq4u3x383i7nc9zyttu',
                expiredAccessToken: 1310941899,
                expiredRefreshToken: 4962769640,
                isRevoked: true,
                
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: 'stor445nw8ypuwik9k60vfv62eh1ne8r8gk5c',
                grantType: 'CLIENT_CREDENTIALS',
                name: '2k30tg7cich8u7cg6e8x7vat6ni6xbwxuzfu749ow6kai8ix3k7jnejs87uy8sv4zsls24pho17v15qtxhcspwf2h0mkwa3eb4l6xf3v6zvim1ny5r7o616w3qxubewszsoggkp9hsj00a3pxky0njtyed94ub1e0rp68lk3zaviryn16vahdhg2izlvhex7nywq8c9tvlk6edtig0iy1navivi50axzedf53w3q6hxvdrnm5sz1r8kfe08fuu4',
                secret: 'dq4dgvn6jxs6ezebahuszggrgzit2vhswzk96adob7dr3wkfg6xfozkp7hsjcot0fem7s3oph96i1ctlqnfoaj76qs',
                authUrl: 'ox5mgfip0n30mxr4sfqn7npkzb0dzee7w801lhwa7d4m3wta7rns270b8y9ouehp9qd2c0se573l0gidn9n0rrb4umgicxciurvh5yg7lsipo472fmtmu0gqpi6fpwlmg9o1c5t27kj7cauz0mmqghhppdsul0a7psgdolqpuna4xx1vbs6qrm37jo06tfvdu64b3jast830jrmfix9i3m7ziqhzp41hkwldblj31xzv64ty96ckj6pz2ylxgf41keqje3wn4iltmgkfvce7peooeg1bldrkfqo8kftabpjzuz16yc36psllufzv5704mwklixx5tgmcbcg3a0rbqzvq76tl8r61f4aewhaq2bnabs0uqi4b4bkaz6tdgdv60pjzrlpui9iztstsm3q4940pv9qtpbt8u75qry3zexnaq575o2g4ekr3cssj4i80sxhnw2g5wuozm7zvcmti1idjowihui1dioz8snj7wdopkamzsdjjdr43zw8jt7ief7tq77n1bngvvvj0cfmdmzm458ct8puc1d47prm5cjing88bwmlhv0hkse5y526f7t572cjcqq9drxt1k5h2djyfgqti88le32reoruxfk94wtlq1j31jebqibjuy07m0qjz1ffjr6wsifomp9o1tdsxzn9exmplbm3nbpq2xv68vtrczo8jx0zif8hyqgl5hqwxbjayv5fbttq3sp38un5gylzjag2khr6avtgvqz50ocf0toyzmp418wjncfdp1cy4ielq9nz7oipfo4fl156un1u8g5hlf9681ubr61w8tzt59cwerpolvxdl3fzxdrll10wyqfgdb6dpt22fvhio9533sdbbe3hv1l3x7s9yfa4z2epzpach3pzvliaqzccpk0i8sd2ijctiqdnh2gmtnp5jfqx9kwsebnpcbu7gmra8mwogmmgnp48oot7xpw86haw5mfjj5h7gzm0n4hn1svaz6h33qpqkoxstvf5ok0vv38r6chqu8gitpl4xxselex59s90vp2mygh0pj14nqaekb1wkbdzt6x2hdqp9k2j9yp65szaorrmc09fd37psrjiaignolm27g0a19uepg1e0hh0ftvw1be15f6id58f3r8ygs6l42lqr6jgaorc6ejkqebz8a2vr7jin8aulyxveefodzxfpuedx4934ru5994tn0nzgwbkzhct5fwngtsg40jxxk5scxwb0507xx1bn6436l5k3vitb5qr4ao7qncar967rzft3n1z1w5c2jejybiliey80ka2zqnnc04wjgorll9gaz6i7rztb4puix7o861l06w3x3gwh4uoagjm0mp0xyk32czdcya38crbymnlorq2d8k2cdnveztugjnvgqdelj11ezv7yt1jv2ev0gxgg6c0j26eyocshh1rsk580cs9ytaxn8gg3o2yz80kyml9xsq5j3zffpnfhc6a18tvwtuqxkqh69txpeid1govzmb10cskdd1ay8mp1n8yyi5v1ead8uwcrbfjm4gj4k85blzjmbss2s83n0lwdt9jlrczi9cftsc9z7fq16n0og9j8c0poxilmnsmgebpnyrtp6320m040elqlql9aluyhnscd4dqpfg1oylpmauxuuu24emri9pz02tgtw1afpio8grj643qwiem2n0wcodtx1dqitru9440egg80g0kwfdhbl8jbu6ipfaz0juvwj23z5x7cf95reywi0mtqecgxi0muml70qz64gyv6lszlvt777a91x3mo19vjkvghtretrhx9we529fw1tof3sbguemfz9g7y52hmihucsjzk10wjhjmsxljgk2csx2zl20jje9oksm04ilatxydk14f1yfspo73bka309nh9rem91wqkmr2jtdrtf7vrz7wqjtakxyd0guc5ouzhv9r1uy7o2ehzctrxd1lg1v8uicbp2mab0obcortnu3kzp4tscpzqt8l0mpwfvevv81q8vbcln132h9d38wven3866x1au3c4sset2z6x',
                redirect: 'et4892l4qb55gtdukueftyas1lnj3f6oe0fjtp2z3lvbp1ywjc2wg5kgp15tu8fue9r1xucg0o4476uoii17ek494wj8dbs78vhs9isp0n8sk9wioful1jp4n9xd5hd53p8h4c8sm3jvsq9ay4ixst48tin9xr7exjfr6ek7ot8xhfp9bkdwj09fcyr0dlgph9wctwat3h2vi1fwi8octznvplka3zqia2d2skd59iwv3l165tifep4umcsx6zbggjzqcosrpz36uyquoyzw1cvrnv6oaka1uuqivby4y1h2sw49s2eza0s8b45z2w3b445qk1ym00aci8r46t0gsjg61qjs9p58uerdrm7eietirptf2lyg0dum41ce5ybrawjfso1tsuw896v1cxas93dhayz18jpz1cbyj02js28q9556v6cz5dl0un7c7ji1qezaeggwxahp68n7tqsikjy0ubckuge97wgcizn6z8hw8lzrdspuhtcp2o1iup4cvvw77mzjp5hyntpj0phqt66uks2x1e7w9134e5vat2ahozx1b9mfdyl6yuamt51aiavc38u3ztuuviqmfi2dlw3ymbhg2kv14vhh96ale4rge4nu24nota3k55g04sou1caye4g9cenvmi8xr4p9zdf55xnhjo2dhaypf1sru0f2vfoz3itwu7ia2he54klo22v0pc0l19skvsvcjea9fft6zttdea4mbutbita93d57djq7978swn1jhck0hpwkx2tqcicxejbu1o4q8bgqpzfe2e5k88ku83zyced36tp1yw730jwe5r2tjnflxf5ymu15p0uujcs7davwvhgjvjy9evohatqf26ufn5yeh7g2v840gq30v5bibhryka0ztg0d5smq12l3zds56bee2wr5td9zjgmocxlwuu237yu63w44xj6aoo7dnmir0g9j4heknyhj5hu2u6nd8uegt06y5dlaj8fjwgb4okcl8jczc0sv6am66qkaj7qel1cs56r93a8rp1a2tjwbi25dh78efdk3lielzw1k29i8wzlt9qfsi1iwf89r7jtd4gynpfhx9h7fobdv89e5dfnwmkep2qqi598yr56w7f6yjpkbefhzpdaadmye1kh1xe117cyxxlag2o2uhypf8s8zg9184q2ufygjw5r3k2l3gh0pk1l3kjrux1cuiivz8rm7iry6aa9ycqnph6c8wyhxwp8fm3klqgm57c226e9k7kv84mxdnlkw42q0b4ql2p7ljr0yaghvcp1jk2scwcti5kiv76px76hljgjmykkuo0996tpfs47q6be55b8xlpc3vchiksg252ij4locrbfk3u8lsjmde5tfrg78rsx7gm1tlfcqfztqlcub4086e3eshht17c9l0sg4wkc4mdy15cizbfq7pg5spoa5ckmeb28d75tfaumtfgv74cpie33ygtiddz13cy14uqi2l4ybq9zvo1qc5w72j2eg7rd1srmp1fbw2a47bnuy7eadxaolsr3pyuvbgky1o4rx3klakqjuehlyw1g9z68qyiyo8s87ltrq1c3bbh5252qsjzptnb9ebs8w69rrkbjii3vj616wl0adebytdwxul1j0wmw2ap6bj27h1u8bz8uzv65zk65dozsoihn4okhhc6qaemi4u1revjzxyqw6h1p6vph32k9z4n36immdi9ct1ul8nygw36wl24z2vskj81ejznclmiqimjsh57mvxt3q3jrmjdaajup36nqbd99pjhn68dvz7wifylob3dcytghckmp6arlfy5ws2ybhdst295junb4ps8ayvnizajjcvg0y2axgcnrfowohfcghtumvcer3lcl17m3hj3nifh2kaqahanxr7puz6rgao2znwarm4kteg7dhjxczmrqhmrhx4vvnjsos3a6pc299cqh15gy73d7licm1pizqedv5b1oj05u2ti0kav6wbvw0rhl9b42yxr2esdlswy0giqflhjnw3j90phkkiv5mhfirbbwk',
                expiredAccessToken: 7245504833,
                expiredRefreshToken: 1513986382,
                isRevoked: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'yfwqry0xaut61u2tu4t204jjjsz0wn8k3fjp6s4ebft6s27wkf60r7kykfjthxjdi20id1r9e09k9aogltu9qm6ujiuck63unqq05wv92own638lrzadcr6kka77kyqo4wiiyt9bk0k8lyi7mxp0r374lwhjumznf8i4s9xd4jogbymc0m4lja7xb3t0jrrof1losj284wd6x7s2zk79cz9tnkkrykcdz67rn9brhbskbjwqfq0hdkv2ji9krgjz',
                secret: '6k0mfdn2fre65jenxpdnzsrtd3ic08lrr2roqcovs50dn94v38xtaohxz973uwq3l94gr073cmmlukf2uj7e5f96qy',
                authUrl: '3pndkvjg1kv0ktlbzcymstmqcjwoq034hzackkpgefd2omzajrc7cqs4g7fezjja922jwyyybri6az81yjyv6d74lcfznryhps34p92ri2pv9e9hlwm0po4s9htznc94z7satjr6mjfzchenwu2wnwupgmzrgdicwxeek0iwq0aoags7ioia9tdfw7yix4xkrfcyafh9jr29lrbzltsrxy779pj4f6d2idmnb6pe23qfg4o7ua8ixvt50x3cejon9ypxocl5y49r0cosat65j8gvtt3u81zeiqlhn7ihio5vxkqfbb26qrw7akgma4xa21s45vuuh7qhl1byv1mzovpvrsh1b5zgi9xjaqxh37hhiohlxq3psimnynq0r2w7019ks0btwwuov8l4arojthtt9q3qowraimv5xxn221967dildi2mz2uz7uf13sbwgeowll20sda1uk4cduok3hqix3f5ug7m9klnh3y4b697yvczlskfw7f1jy4jmezk9z519r1tlnc5hvan4ccm1gefjniho5cl3fg7dsq804zj37e13vpwwakznfcbgf1j87rgnve0qxtdsicsdwlkmiwkjqh7sg7spp7falvlc06y5pbebnuzeumd2p3c1e86mro6eo0zz4ojhb01p11vuwixgp2l6poroz2gzsn46vto5kkujszazgawz3cmja0smwqx0zbsb7gf7eetnqkjzm76471o3p6yl2ox1pj3nwldq1dq0sytd9h6qsy0il2wg4rhssr09i4ggswr2a3fm0v24zzftkl2xqpdlk4l8biedb0l9c933puj2jf4m97o33hux3xx0ckq6j49kf7lyll4996rnpu5bf4cgslz7240flyx9nzrf3531edn57om7on7s8uetcq02212tkjxphtw5nlzwqd18ws3koztxhhlbjurseko434fq1apjggc7wgjkizp40aogfpaf78g5k55occwnh6hd9pnf97qofmul1i33bmj1rz8hgz1jijwcsxe6gdx4wuil96aqof79lurx4gdz6f0mpozte4sjvj6zgxfvr2fn7z93rwa9esme2xs9vi3ysviilx3pdd6civdvegpgcok8d910rp9e28w0np5njcccdd7ddy340wfpvu7ncfe9dse7lqp402opyhml9e9d2rmuym2bsvp6qzk16lx3597qaijzqea368p94g3x1gkszc7j26gjb3u91a9yfsazm6n6xvblqkbtdm06qgjxnhxrvuqb6omz6zwwvkqt75s49purf96xtwwxe3sq6etllc3863pnq721c8ajqw58j1ldkan9hpsppm4uojj4ru9qpu7g6ld6zkxlod1i09xn0gk43e7lgfuih1ju0iatwwiaijmon26in62llkmqsx7fzypggqqtni00xwplzugerj2j0g10zlffnxxomvpp2kl31m2iz8jagdf903najqagg8ku0kxhcn7ixzx1qec9xylvqf7rizgklsuw6er0nferlqtqaqv889f2clu3xp87ppw21ozi2g5q19r5yc8usd6hixz8o50jo74xcscl6e133c4bb113d9zgke6u37z3phzhfq9zh648c2t8gfgr6b8tiw4gs0igqaw4cfhi3ab80a726da34u0t53b4afmgzw0x3kuxaw75xmzlyo2dfw3p4yey9cxcq9z3eto7e19fnqja6l7n127bvi6yxpzn1d8h6cujnke0c9m5hgplj9fromqsidvq899gnkx9oaey8v3n8hofby3w00ay1bkc77qoe7d6jilyslq87grfhbkcweqetad3ntst9xz5s2lncivfivyscq3g42g4pa6q2qolypuus0vukryk1hirgst0gdjs5lp3jyv91jfxm29soyqcjvcezltsa4v2hgr01x9nmh15w43r1em1ph816ge1l6tsh473p1wolunmzn6wy91260qmc6mfurxq9c6r8a1bglnlxloqh3ze9mim0axx0hdymrplolid9rqliqmxvpqcvmc2eex',
                redirect: 'eezv3uvpoldoptgorowtd9t0apdjzwffusrbin3bgcn01r4gv8ol1crp286y8rhe90jxthgp8dq1zmnvfkvre1hmcdnhl5sa24zagnnjvc374ewiaqkbgqibx3nuzdlemmi5vsbzunvf20ryjbncyomesebzpwiuhz03hyekkubg1g8rrsp16su9alkpzhhaeun34w5gzz0zbtfuf66h2tu87kqjfk2m6geny5yyybnh9m5k9hnrky7ascyluj1z0ilicbh2gub7cnf8d2aogdy29llyfwprbb9blr1dqn26g5gdgrs68whdwbup4s67nqt5jpoof7blkp2um3utzjtdd00vkyrkw8p1h9gukscm534ubpfubuu1or9ye260wdflzwy3an6vodf6dgwt5lhpfwkvqyfvwx4lu1b4iacg66f16uosg22jj1i89hua23tfftqpms517irt6v9uf2x7701y53mett4f005936txdu6n3o3eh6zlbyja9ehmm0a4o4cco3m41l407dgh4hgdwdh8wvxx05zub6su4ymvcuuzwkka59wxwpylvx42guw47ls8lr6s7ip6p7qfcd8u3hjp7pv1u5sdo4zrxiacnx00re9oelq224k9pi7j64l2ynvas0h3v9l684206nu3a9sm2gsczyp6tq0x1yzg1idgwvh9wou5e92jjivsq08225niofe6yle4v0ny0zaec7afg3tro7mpsii6hwgtptrlerc3xyky7jhipqqht76hfz311wxyjrok2qek69d8bqjof076j7kjlvgyx1v05gkki1nled35xt19y2h5d0hhv1yd41fcxessbjfdklgak1l4ncmb1nfcxjfri4qm4e3at6xbm0uazb679wfs9tz88wy40mlw148b9mplnc9jh7ldrux0i1u697lk8eikmq3x5d6cdd2uw3myhxcfhhggqhydulvx0phves0hf4lsjvn94tjulezgt7bkiyzhu1bjgxd19b6ua7ivxkq73hux7suqx60l5iiq42412ooxetwz4ccjrzeizpurpevbi7eme1zcr038xzyt6yqafmlclkfueacm6v9xkqdwwxabmqxryef2o7tujo74fwbjvcxir5fow1ho89kwm304opwnl5vnbexsboj7rxo80f9a9f560x3rglsnotnv12nu2bh0v0sxo3zot8z3a9qb2omea6hjcbf8zaw8ch2lpmxpvs0blhjbofgmvf6zqx3f5mh8i1p50uxcl6z62x4ke0brm8mgrudebqxwzfkzqk0f964zr1o4f669iyd3a7lnh2ism4j41f048ondabunmcvjqsxfwd9jw9xhtd27xqdbr15plbfrlyy7fitrchpvaehz4wvnixdahz70o5cw4t5l0phd6l8qekulfyurjv2elxvxvob9uigedazmzrbfsnz1y10777wii9ji0r7043yjhdrue55t4zl43pa27ve1pqgrw4rhap4x6e280oxmv9y6ktn91qibwzorylovj8sh6f25ocruucjudsjb6vprimplnfhjsxl2gbo19pocmyhfr8x2anbzj04dwdmrwfehxw63kfeegttntw3mkskylul6xs4tthbhqnmr4uo4ltbkdn1jxd7714rj25xzrruiprudljiijpqsu9t7vdt6b7811ivth3hopfzbd0rvumj7y7ftfgri1f8rqu462nodqmkfk898yruk1r8yt4wagxdo00avup32vp9z9v0w6e74rt5z5i4kb9hnvjtgvcn9p0p4bf40hicf2vepgiu61zbvw71l0tgnc24mlbrc1z16tiwnnayhq5a7tvgumwbnui8msimuc1zz7m695lnh4q2gv5orggtpootxux35oybtq9u82xspc0f7ntu1xf2s3ireh7php2ii0sg2kg2m9zwhvt26boq4rvvymwg8wjhc10wc3maifx32tcqexctnia69ac2s1xpfu17cquzbtnvhp6tv5aaobejj08fsraneaioinaylur3l0n43',
                expiredAccessToken: 8485811797,
                expiredRefreshToken: 1893170966,
                isRevoked: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientSecret is too large, has a maximum length of 90`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'PASSWORD',
                name: '1qdrsfcji9ozaragw5mf6km3ykzck603ju1vp4ll1fhp9thncmjukr0382wap5buo0m3vlrqm3hb51djgud1419opreg1vgwrfm79spnbea45whc8ih5ok1zngbpo6rh0c84ytjs27q3s3fm7shafynigsk1ryobtgictah32pxkftfpxy3fqk3ztte7bkw8h5en8nu5no75958opvem619h87f8wzpzl85p4ze3cofup078jvd6tt596dzcws0',
                secret: '9zmeecpetzj665icmjih9ykq80hry4f3c9onr9k8ieohdydi16gas9dnl8kya9iasvqzyzsqp23p4lrntjgn1ggvszw',
                authUrl: 'vus3c3rinj1v0wyoikcb8t5ots452g2mwa5vwkbk69c9r0kce3yqy9trsne86xy1qg3hdjzh0vfrflq2mf5ww1x9l1bqd1y07sekv9cna3awdtscvz77fwr7cdva6p7lsvccqlpj60hzl3yt0tizevjl8u0e7zr2mdmva9z3gpvx772v1ov3n8g7w5ijz3ld76efzaqqqxcuyt021k7cw09intz3ykwkmvykv9224kd0yc77dcwjcppnciaroeyco9qgx5vd7xhcxppxnwscb74dqbyrx9w4ee1fa60biz10jqn5idq42eu2a172cira8f53pzxy4szl0onuehgmmpi2xd5hrsj2m7bgkpxqzu1rftdefcsujj738oiyffknzkd7sd5zr445t3xaplv3d3kyp3on2a47d83wuz3ch9g96dhedvlwghjm32t8dru9mqxvm9n5ax4dpcvmbhk7uxcmh6ykpgqw91kerycnr998nvi0a3vsgr1vbs46l670iytayrj00ma4sgk5iqcou1q4o3p26zghgzlf2unbjriw7em1btthoqlmcuzumq7x0ug302p5uex69kmyh6rm3rpa7atz55irzurvynexuttpp6h124yueg5fnes9swamxjhvu9kz88n2ricasl1oahn0u7rqrux7h3cmwy55t2ovp6kwvjq628vy9sacjh4w11rqg7zl5vonswzbaoh09lshnzltgo2xgns6ofi0p91jpuieey6jz6149nwqjk6mlayz3fjgfb6vduagniggv5hzxfrz06peic1hjpzvdyuoyfpujmerj7l0pdla29qu0dncdjqvbmopjjf81ur6438dbzepr46zvc268eijnvhvh4mvqd5h09yljirm90ojt21jqtz7gydrtbqf2knfwlyldqfqbduakvqhy2wxj7ptkhr2g9xqq3t27dspwp0syajm91ygq6vdqfyn0v1hcuwny3cqtoam1rnkzh325gtjv5h92c8uwpr7138se9jjfp8jx09xh3iv93ff5oeh3gzsnjxphcwzomqp3djginvyrv6oyh8puf5854730ri30xqvczegwp9xyjcafi0nn6lin1f85d0g6sjg2bbxbxea6rvjan0smhe5gfqr6ynyhr4smjun7x71oh0o76cmcc9ip8t35fz8rva0twhsdbxm3v1f9zbpb2w4hnuon8a9ftcwc40l12xc77y1k1rxguhplo9ofj91zj9zc7hny2u03sex0jdnusha6dotgp81ckajimh0uaumbi94c7m1ailqf7mwlgbkf5u7c1n5jbegjpbmrc0gnx977wi58lz875pgdnrmwuhhbaefax5h1ae76fkoqgv9714i2461joxlwr8jo1ifrqw09xadbpmi9m331yb5ijrhi6e6yof0js9srw17eab8cjqcr8f4ezc66c36zye358acuzgue45e8u31c2cxhvv0cpx8iqx3y9427d8gotmmnpk3w16x0ns2ujcvn7758blqht0a7b5qepwgbqn2u1l9sgzahbjgp5wnv0490dniil63l5y32qt63ke129qbtsbnofyg5qieb630igufd9o67i6w859zk1fbril6y3hunrx0y8liycoy4zqssltohqa2dqmybqy5x6ypjipu1ms0vrrk1nmt2olkjx38qpbt206mhh7l0q46fdds789mwi4mps90kwsnvoip0sperrz79qwzfckhxrutgdfl7va806lhjiax74tin9ebgklleuhneg150l8aidwindhhfj7uvn7nt6narw2zbu4icetajz0l8skz5xphpq2hxg4kd1rpqcbysb44v5yf2otj2c5lkuv2n10jku6nki3lpdws0xgfcan344aguc905htdgmk3edo6w8eayakzhlg2t06pg7ryu9bvius1m1ahjk8g6mmqg0hrjfwezih22mno8jvs1j529mpugnlqot06dfe6o2fo7utzg7gmnlsggb9y9mwk3xawrop4fkjyeb7h1nu2afyxotz4',
                redirect: 'j511u0m8opmn98t4ujzlduih6o3fvkzjps39xn5vaau7nsvssuoj8xrmq7tpu9bmdtl6fh29v9ova66lz2s81v4ibpa61l189o22ri3qkv33d0r48a6t2vy21umf6ajsd2ue3ew3pe00g6bkoda7cpt8kjppexwehfu1y1xe610g8uo523kjwq6567kmp24t8tw1kpm53yy4o3btyxp0m8t66ebztibt0r8ldh9ahhgpzlmeq762bslmtky7l9sjd09mtddjdanfrr8or9dablowwvee8z3cg60bwzrqlq3zj99by9x1leuwkbchhrsmjy0jhgsi24qmm7rkal9uvuvecrs8i5ih1mqt5gyz9hbn7sly6ees89dy0tdnyrh0af3wdama0fzenr0vfbdmuqdzi0c23bgc7ytuthnrgjos4n08rf2q6sblu5qim1vc6md5mm94mzhinlh6zrskolpszy2iy8n7v6q4cy16uhvssx7vs8fqlenr1y0x362j0w2fu6o2gxwk70rcq0yx8q6xjvjlxfgc0381dlu2s1v5lq9qjennh56ucns1avq1cs3feuzwd4nwb08rbeoar3jk6tn17g0zlfxt6i445gx4g6zl9x4mapten1y9binw3d9kfb3hh1deao84msqxqvvfu58th6u59bz62epfnwd1i3ewqd4etcfpmtuejjoyj8y4dpduor90aayju086o1uinkd9hcx8kb5c8rkmr3bmnkcicl51fuoawuaj2pf0e388dmtspbmf6v7lb52uj424ujhgjufvi7x95ygb36p1fpb3zy403j6jltl7m2hrs5y9j8txg3oi97eh7bsbg7hrkg6qpridscwm3vd6vrnq27w2vifi4x4etbbuu3j09ydrogtm8ubdabhu19kdbtk80nevwf318ka4yzie9ymhrdb2p3bk441au3ze7v6d9fyoqi204m49bsgbh1wz612sdl00bg09g5m440z1velufujmyqs0t6s2k19nsuh1y5iu5zbt820aruu1kvmiubsk7e9udnojm6m2d4qfje9bbwdansqscgnd22nl4rmv9b7xjvey7brr8v4l0ant9h3npjfw1nrqyj290znfenk1o8bjdr8i36ugjy3e2pxyld25cxau0bih3ltfo6s8h05f1q0qg6yi6w97hk5ti8zq1taoosnna3cu33piuu6hy7f4fv9r7p7eo4og9ldij7jqcd6fxrkdxrdd48on07h4gzwfp3e1vgo2y3sge1tso1djwpwr8es94loy5s0gd2tasjbquqy8ot10o3p8umuu67ao30opib0eqa98l6nvkqfd5n6k2k2ieq4cuq0jbapewhv6xymo5elwb5yfmfd0lh8wo2ttzyh7p122c9kvxqo5bn9s8j3036uz2p6q0rotqxidcshgm4d9pr36bisyvavt5ehs9jt6q49aowm387vs8rplyq576udbyce9wlc92hpt8lhd9x6vqlf5l6590hpzpk73bbt5luzpcjv3pwxneldwgug59wypn7try4b11w4xqt6dvn07pm52wxgfsodogq88ztgnmx6swej94dg6dejx5ehiav5ruybzk6tpxmizuoknhkpontvtdsj5xnqki7cl24nianqht61ert937d95mzbhedadxmpezkrgyhfjonbq5d7ddnobxn8iahhvm21n90muz6mqtye33pu3u9y93urzcb9xipe1mw442l45dlw6gdn9neplwhpve2lpfrlunuqn3dfx2pn4nvhdwqu8heqlqx2023ci5i8oui94vgm9j1crhlzbjsxys7baxh9jzf8qdlfs0yb6vajevu88aithijzi70j1uoke7r9jnmudbia6lnfa8ahj3xs3kwmvj1r6t5angmpoopflc9vmjghlnhahr1k764n6e5kk6kocu4wbnjs6vtcj81kxnosrtyxmsdg7jzywb3hl777bm7jtlc3zqnqy4qgh569nyy6283e2zn3dreoel3okwhs6sbpgw8owo38k',
                expiredAccessToken: 8151887031,
                expiredRefreshToken: 5693353199,
                isRevoked: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret is too large, has a maximum length of 90');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientAuthUrl is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'AUTHORIZATION_CODE',
                name: 'b0s6hn0ctslaur7qud1hzi5ywhxcbkakkix6a1xw2x729wbet9u1tt9cwokoqzv4t225o2lblc3ifsw4oacjv6esn5arwejg5lktc418jvk82xopnl95b560hd540p761qjsmdc2vd8wgl0sku7im4hk2r19c7at0m0wsq287qu7exkqiayjg9hy5nbe5b27jt2ayezs7bldpskpgoi92lrip2snlxo61m22d44r548v45ru4wsktnboi20xobj',
                secret: 'wtbjo9lyyfrg4hf5ti4s7xvra89zn1cr6kp1f2e9zcctoatuutkd3m452rt9pcfe4l37bpbuplzo8c1mbjwh498dts',
                authUrl: '8nhdom8w3hkh3cj4960rd0g14v1w9i22nr8ef0jp3kzwt9vvd8wxyhkmicg422dpvaa9v78g57xmy1l9bsuqly128dhganqqas6fd46v51hqjowe3m42zeejum8dln3uo6lks5cyrnhpv8j59ufn4im2v60ukq8ez28bgi2j7ahn39or59lmbwwmn043ghd78eix7cpc7jb8fw6dhl04vchtgpqj262mal2vx7pc276hg46lt18s7uwsby5yxedkxvkont0voxplq4mkwb7vtet1l2ym2dw1l7woabk70qpjgag3imwdngcr317brqjudzdc108cwuhkyiw02jtlcqgghwzt1ha8tyxlju4o87ufzvpxolpb9b0mzk5cjc06l01rjxs66962fvzixb1sk53mf1jde1e4w3g9gblfrv4fwfix3xbtoo75ub035xcs6ju642fvsyhf14c75qdfprvdy63fk0ek9mp8im5r6coziqasjhgckot6tmcomovoskidjlw78chnu1s43lzd65yscpnzc4py5e490abmkg6wljw1cb0w1ybfspftk6oqcltsbm5qoyuo6pjpw405r347te2h807v9pf73peqggcha4jqyp1clpe4tq0m10x1jwmkqzlcrz7500yhub9dtla3qswdgbfulkmy2cwta0rhigvv7lf6lixwjt5sp97l12nz05lypz85zvun8kdhtvi0wtbaw327xfq9r89ygm5q0ngv85slx2gcx6j0da7ii696yofu59lvtfse52z7w7y8bvop79m2ukjreabzhj2pcrm2akt8qj9vfieku5h47ub7nt8utgs0496bqixfbs696pcktzv1naf24rzwv8oyzaa3xcnx2g2c60ro6wmi1r498w44ikx5hs049wazt9zsjvvntoalehunjuoq070fz5lkwow47rjwc8os2ldnt9zotiultdvfwoaorw7o02ztuk08l9o11138191swl07ue4l89rw0rjmdj9xrziph5xdmkvlm12lltvny1x5i9d69s194gbfh7imhuvsvp9z1vtl2w7e6wd088apgmj47thmccvb3isj8k3241qkkw99ewczrxid99jwe7wz0oux0pyzzz4fcuhm4rganietfqg977dsh4v8l2jjetrnpq1m028gnz8n3kvkwuojo413wy5ds9u355rl9fj03v0rlbsfceq1qd66pl8iwk94yqtn1k9wfbbvcsiw5xtyqqfc18b8qbvp93vm3lm4a6ggi4oenhbzjo5qemuzrakdj2zx1yfw0k0yxfqcgkciasare36q1nrxaq88a2jtnx8orf8ilo7311fxf7ijx8d7usrj1an9p14dsiaibybhxmg7p9cbge00u53u89xpiqmzmj15lv1eiirumh59tbm6jgrjsjbj3x1suzgbo7klg578n8fhzy4ykv0ibrjmwja7n4r0r0lbjx42y5e8yz2md4pct4is83dj8dpggpuq11aqxv0blygm9o3qgto0q1h4urfrtmnwue1wtq59kxrujh3b6rlziha4dfs15tdtg4yinwonr74x5n7y64l7i9ah8edpu7h8vfbflm9oz4wbz92laho9dm01djp5jpdo89gd16vvkztag4o02qoc5y49j4vcpield99cgy8p2d9q6hu11pnc2ekskmq2nivzdpfvldnjpa4wyp8bs7osw9cxqxaismdpy7h2meg1il7ouzkwki4lzlkh26ngtcx9fifmqqzy4yrnphzgetre8ro9l4ejkchspprvp82f1l76pr5vwcdzsvolmzv4n6dxwo5rxm04c439gof2bwopkl6z29xwezv5nytt09956ltc4f60z8olyo9rj7cwq4ao0c07omqizau5tcwsqza0idq8sa60dgokipe4d8gfcru3v9gj4l5bc2nntk7ib2amiqnrqhdi1kzbf1r8n681icbwf92s53d7kz13au0i0o5fy9xqq6geg2lajseeu7feevygype2l029onnotb8iha2xp',
                redirect: '995eaz8rppv6mveaep4o1jyvugup2r36ccx2lakngfreolujsp1uis7d9m86m0rozzogdscfhrkbsqevijeynbhnfmpru4eqv1bgjzdfwvl99yzjrmkzys7h1iv6yvsy1qqdl1ythfgmlrb79vvpp0h37re8lmdxbhfibncdgvkaspre1nol3ozaeqgvve3kgtfs6l35iictoqwqzs00s6tf1w4iu1jy95zmx8fz0w5bi4jlr2bpb7iujy31hphzhkwfksx65qfrglnav5q07kt3s1wfj4j2ex12bfb0cqi9rvq21xgcksa64hwevjee1luxpnjxi5jwl9kf6sdc0lz86b9k3d31xpss6azj2giwi5sfv13xp81ckkbbj434l52kvfjiery3ljovhf69la0f1uwe4pw0i882a26tcj7imk8fjpdsldxfhj76bq96tkuo9bepvxca53tew4r12b8jf2etcgvb0on2c84tpxqyi03a7d5um0pzcd8xbg4c4k1nu0e31p9c381z67j5z3kvnlwmuirxuzfdct13yvv9ai6k8l51rb2y58sxs8a71o5shra50v67a1mkpjjyqnqcw29q6gc868v6sbhr1xaljjyarvsb5qxebze4s9rtczn6o9zfivrvrkzukeqhhx1flgllsxjnjuytjadlx2mrplhzu87ot4krq6pkrbfxynelid4710mlp8w5ntl81hspqnbf5nuph148ogna13u3g8zydhzsja3s95eby6hm7tp5nlr5gumfdntsu2fzd82pfoxzrd6l6qlm2jvu2vlu8vue4b7q00tblcy50obot0i9t2kcn3ku3mkn60tith4kx5cdge6nhbu01zs8kbuqvle2ieq77f6gtod0brrwpa1dsz2spo77fnc8peey9hptef2dm0appq0gwqm3zux04pg00wc0tdn7nz93mfnt2o07dfqvis4fw3da5g48owrh5kga5fvd9dky35qcg31tkb73wo04elkbia72n6vjtwmeja1kw5xphsmv30kq5s17d14u2kztsndou6u0b3jwyj0kykjvunywelzeogaue13uhevpikrj9awnpzopibsxk03vuhj03t2f0s29g50oeypflxgfxggvwyk1f84e4kjr6eg0wvzs04g36t64r3houim4gv5g8e1yfuvazxkqtk8c2o18qfpj0isnyum8p3kpm1c87eo5fzykeu5x6yxj4d9kdscyb1twb3ia0e3d1wh4lnonwxfzc8iwqy2fixvvitc4g0v891vf01hhu4n3f7f7w2k3yruz1ij77wzmuluj5rzy1mwdjxvfle4ztdxz0pdri10s53dkn5f8fim4jwjxlwldf0sxaksbt0h81w245opwr12l2wr9dwj7k4xpuznv88ezxe7zcaiifn8pyz7wb6a1k208mr2cbg71h95p8mfuxn3q8pem5cmirvqbzyi8hqyhi2yhivvsltik7034qq22wcr3yoa6p7azmmgstcq0qvv0kslfr6u4823mog94lzofilaom7ygu1evgrw1fni9gtnk5nmnukcapz9l895x42skd889yzhd72ljbzhio5z9mp2ra22ynpw22z9im4uv7u1e6lh0zy2g4gtjkfue8wrusnmmv9bnpzkx3rmw17dba5ohad24q03enai0y4oaqqbbmc7dp93v5bceqoac4b9l6oawniyxvjius3f6t8v82c7lbnut71jrhxxfd2isf8tztgad8qhai8mkq4u29xnh81w42acelamcljj4dq5o0ps24ndkfebbz8iy2mwfeywphk0yvtduy7gnen77lktpp8etf665b551etlpvie2w63y9jb1rmh3kwb5k30l4rzq68dhxr1ofrfraq7c3dwzphsejktf25v7hjqr6fc0akm2w20z1by27y8jr7ejgyfghvijlzz89l1809pwt38r04b9rrc88vy1dsauzygflo2mzzk9rtsz0lhgipx2nzom4w895i1eek3h9hcqgxlo4fcmhicp',
                expiredAccessToken: 6428984011,
                expiredRefreshToken: 6679525261,
                isRevoked: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientAuthUrl is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientRedirect is too large, has a maximum length of 2048`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'k2uw92gdgx94a56u5sjtq9pe3touhca4fmp76xti5xfsvx7wym0yo1335kt4yfrxueax5wz00zutrplinywhhf85aho1uu120py9es3swbeuoyq9jkvgtn9tbool7qjki2s8w6t6o9lkmknjd3xgt3msu7er4vd3cwsmlvnbmt5c5jgcxuhxzv9en7af81beqkk2mtvwzizhcoy2338buzzdk0bbrs6ddu8q7qf5vgxh71qn2odnbmk8u4jtyzy',
                secret: '3ko00kp3g2xaf81efu6cpqxflsnabog4c7xs9xcvietpzh8e6tqlz93yu8a1qo7nqdtwsrvqargfvhd09u9lvmzmh1',
                authUrl: '713028l27ia67zgcw995t4qdkb0phmgd5qc4xmirg62f5947ymikl8lfds9c97pak1h04u3h1eofnynz69ktn2t96xvc03amtkt7dq7c6yaak1zmnxoed9x9lwpun1ivwgjmsvg6oolutudzias9c5uhtphcmunkz5fip413zn6tmym0chwt845i0rixsm1c5tjszdyx2yku2ujwpp0ounlmuvylc81gt7jgzgcc7aob2fv6wgs0ocwb3fzau187j5c022mpfyju52f7z8i4sgt69doqcdb6da1n8y3ylutl1r1gq21siczxlq806d461h5f4n0tr0z2kqp4sc0jwrj7uxwo0u2h64ltlyeavcvoxwfn1r6f3zp92f31jvs3zz8up667kquuhrztebictx6zhs20ginxo7pjr15qv730s73wv1b5t8m4rn29izzkdf6o4g1atg9fgen7xaiv5oiz54fcz3337al5v63ll2brtd0dal3sornrjpc0sxzldnd18sfntxtbpht5j7yxwuf13sea9539k8biitd7x90o8zlc68ju0ka8vlugt9mj50hs7x5v6vfmhaej5x4ccgilcsnd2rgpjt0c1o5x7raf6av2dtvwy0xwpu7g401hvlwddg8l09rnueer92gqi1klhux8z19m8p987sz06cjl9c0v2auxuchrab7ozpjabw6l9a7oph7z8z68d6q946615mj2cnzeqtg3bwpbq6jclw1si5ceyaonnosg680iyxv5cawx7x9rhmj63gaxh1ox2ep0vfkq4k3mr6f1cpdfq8ohy8vvpeoepu70kou5hoixvdwadxb88fwr1yaj1cerdh4hex6q8zuewcwxglqz6qiy4c0z9461vjdaijehn41dtmt84dvppk07p8eu5w0n2zq5ds6blvm9hhb8szpnwkvux3o94z1esw5fjmpdlyti8dthmc7z7cud3r4l9gr6zmpeojml51gmlezjnzm7nc34qbpbz4qrdbwzhlaar2lkxz1gux3na1r0mtjm88qlrqec0musekq2jj4trfbyjjy5n5uuf55ihx6soim6w5u8zk7zspv2r479f59r8q1nvk40v9ibmzk0i7kt18prt6kov9fx2a5evm6jh55o6d2eye41xfxlmgpzmj5eryh36lf4x28xe8uf2open0nnjuts7so4oitrvbw6rpzpq6mvdnlub6fjffrdcaf8onnjv0jvebrxfv2j58sgutvmi0mz9jencgej15u3ccp3p8ezcbzl9f04yykzxs2p4qxvo18j6bbh8iy9cpcvw1h3of0cpxgeuph0fay71wq5o3pzlbvutzzkgond1aq5q7lodgv2rnhnyfo9gjnq0exsq2m8ek3w1ixpg7h4mqpbl5ttmu04x7kfxcwwee5xc1emzo8e892m3e8g2vxmpkywhuov6y9r8uehusapzn7cuiusk4z1lffes7k0jmgtfu3yw1s0pvi79lpxtahrh6deawabhvdamwm1zo3izyskl6w0x320d77l6glocaim2sn885nis6pkzq662jiexq47f07wmx7mziwa07va57v88lu7pd2gtamtr6cudjaxfb3z6uklipl5nezb8vzajvqgbrbngeioaia810kslcgw8x0oue9a6hsk04xlvhyw6khipdbxk8r02hnyu3k6tkrbktj5d2z8bxzytjazbap9721j7lm69u9l2c004cqw063f9z9fwfw6nd05aqnk2w5d6eux7hn52ck02xd5hjlxlmctpm3n5h0xg21y52dljmvme0akgm3rjfmaxuhr2hu6dgdqamuyo5kzc237mxycyvv73rrfnsvd83lo3djjqg00tso4pwqm7clpuzkn5vbvwzh1us153lccyvsl9318hgbxnht73nt325lqdp1ymb48e3rmsex8xacmovfk7odslhoubzyl2npmr2qq6gc63yg0yiwoerne87su49agj1i9xrjd1yjbgvbnzv6vgdgw3yawhcig8mu6gapasegm',
                redirect: '0cy238ncd5omaa7gfaan841ru2chsxifbdn9d9ngdlncxnfi5f53vhjpfbl14r0qqofj1bizlf6amts69pa7ylgqo9t7dxfsuihnewgund2tl8zsghmi439jqr4n0g66t0pcmt7ddyejwa7phls79lhvmbz8hun32rhjl4t26hm6kgz340qx45m6pfkhu1680ixag7qf1l3xs0pmazpm0dldp4ba08xln040uhjg1t4zy0hn1onqykmk44x729wsa2zbi8k49hv0fkc02up9259qlzus6e7ay4vs28h9no841516dq5j6e42vpiabmjsonmubxzhy3lizej34b1andxdmhinppeci6pvirfjd77k0ok7ab4tvazt7u2z2tj17isonftok45u3tdijtriltus47zq66563alsx35qb3okru0j435hqpur9q12ofmespf9u3hcqbu3hw6m96l0u5hfgalk49n2yp5qoqzx9hgeg380proe46ybovc9z8mh8hia3ry5lpgqwbw5u2kivw6jax6q8k5b3tx1pj6koyg2h896v9a4bbc48jomvawb4s0cf5i3tyhtacoanm57mghkndmf6wl4gdjvwg2b0pg8xgszoh7wz2rs8jrfzb8rbnztpycl85m1ax5xdolmjkilvjchhn735jzbcx6of29w8i1dsg2fk6yw8ruruj8evrm26hg76pdsw5bnh8myjh0y25kom7r1yasrmb592cq6t0d5gxk79ux5drbttujfv18bwkx6bcckdxgeslzv890j6ecxc11pfc9wn2hxkadwvqpp5mebn3pzy3uxjtu84xkbasen0nnx6jkkd2x9si17l2digkg8nb00o6kunl7yc8zr6209sxuboqjh7r51b5y7yhx01aswj7pldd8l6i8068bviqq84ch9n1bnywdg7xeu4rspn5m48xkvi8qp27h7g12464qlq1wn45o00fil8f2rdhym2frna32sqwfnty73ygz260mk1woy4ts6923ghcjpemb9cwh1m59eilda69wgtmhma9nwaxhlnkv4k9f12lisewohz56rdia1imd1firvh62m941tj8r3n2m210gg4kvj6zfgmk1uss49m0snd47cx2tf2i9wq8duol9b1hmxu5f6akee93e3g13z949ztfenhz9njyuyauvrwcc8r8q9118sllpkqs2vzvx5s03998qztw32epayox197pfc5o4dmhfzotn85n0ansfxyz93wc9isr9q0xn0g637wmcbwcjxdiazdhbo46h4n4jc05h4ijm800vpukihueghyu4xh6vzpckv4oix0d5dkqyqewr5d4i2wr1bize056hh63zzri39xlp04dfpmo5v3t86eik19315tdqwhmowgbnt7zjkymf2jc8vrrqomlvma8zi9vbwgxyhw6g5ms88vhvitvfkyrlhk49uqv1x38vaihluamqkruyy8rpeda7ht892lf3y0x5m90hpusrzk0mz1a3lr6wm6c0s8bykrooktgp4d1jejczvwwsemk6ud251k03kfomde4qrqaxe082ymeuckqihz8lnyql9jfpo5yub3kg98lx7vhkj452r90l6e7it4gea3xbeh1x9olgdsbfyj8u2xxuo1ead8ak1kjgwh8d606lx5odjwvo33j9lm84m01vbcxlz4we4l3slamq7f0bpwgfxwne76e7jiy8sjb5jxx50jrq27tbpedscufjncqw0bll37cj2wu3zvjnbfnplzd5xk79ebm5fgg45ugjpryk7ao48wo6fgxjzlp367al0nn1kzlafgvs6h4j8e53udeb9ppa0btzylgw5z3l0nc7h74zi85nh481fqyvmqesnh4945d5g0j6w64w7w2vwsgf5kezeztamfqccm8kogmp71a83dy96by3691j08o7ru6m4ovmgn7mihyn969l54mipd6a749e0icidoimm92ihuyh0138piy848xp34r25ct0t47upahj7xiu7usj58aa1q',
                expiredAccessToken: 8568878200,
                expiredRefreshToken: 5920203915,
                isRevoked: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientRedirect is too large, has a maximum length of 2048');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'AUTHORIZATION_CODE',
                name: 'rqzsw6gyw8dxryvftws60ho7dnfxjx1bt10vbigdahll2fnqqlnl7zs2frnaol2n7jvojkywkq9yh3tko89xxyln5g8oae3k7rnx19lzmp66tcpjuf0061qd72pss6ov9lgmv1zqg1rejua420st6fj2yegd0ny0b3vmz1qp4wr8zjpi7ayi1rdghwkekxu3e5or5i1a37ahvyp1mvfgmms2ojzaow0semybwyatd6sbrooxu4ukdemg5fcuzpd',
                secret: '07sk7hms8olziafg4r4cp8xvcyejebb7iio1rzbeyqux19496kfu17jk3d4j9xf5f9ip2gkqia6yw110ts388494um',
                authUrl: '3jxvhkttsc15mu3owxycvi9y2p7mgzjakjtseedz2ajma6zg6hs3oz9i4l4nfypxfz84b59ig7k92daxe74t2ywalpou5cef0adchddgc9zf13p1p0leiw49lrlq70awyv0bit2bo8xrj8hythxvq62s3sylxx0symyept04z8xftkdvq7a5rk5ahaqdr5tq5nj8we0a5pjo7vb6a7aoj16u6rlcf98n178sbwrfgscrrk7ca7p94kxyq362hno5o2q2xxd6xvwx44ug46o1omxzlh4jrvfop4ldrgkfprubd4ilevgtkwn5d8628cnif7jtse2ssizcgyoikbqpamoqhjj2ium0cdlf0sd60mmr7qudp3bm2joatwwfk97mw7m0iiqo0tqwdszt9gl2cxjeuuh950tnu36sur2qbc8z9cqwq0lrziy8nt6b6fn1230pyq0waonplpmj6nth148mzpyan6126g4nfw55doa5yqztbfaptuf11st6dqwikagzpzkhzkqdsr3gcxrofjl9i3ves858kjl97pslafdwdpdtn8cgywsw2unvlo0q8o6w4m6ikmtdsylehy0ulsb6coodzj0qylx0ywncimaqasocynwlyljqea5f2hjytmpfnu7i7pu3p15cune5kb5zj9spli4k6msyvm2qxc6rn1sthobvx765lpwouc92xnu5z2d9g8whf8zb8fhsle22bqvgaeaq09jqm1fscg08qbtk2qs8yz19f3xgx6dohkvy8uoxwnh1xrrdei2uft8z8zoc7wao353pykypni4yy1g89b84kbfa56dp1ciecg8fkg6vr15ez4shbbabugg609vzle1yq38vaqk2p275lf3ygv6zg7myi5yz2nqthxl669fy3n5016md6m8zx0v3mmpxjiorhx6gzf32dnnk4jjiifhi03xuujquyyfw5pupyh5mw0lrzsdtpaf7gkwyy9ztv3iv7b6mt4kxrojubl9mwsoxfqdzj3hn80iee95jm00ig7aydqkssjobe0z6un3z3nx1cosb04zuxzy4fx4y72ya1a3hys2j50p92ss2dk8b9i4y0anqdag0dd3fglmnbg87w2nao5cyqxzawzdb4td6pkazvwqw4aqq0jtg939021h0003xeqbl4dnhubpcno9nzkm4qrnzu4o28b0nbv3323bh6d81jnvg8u8xnzoty8in7vbzqqh1eyjacyigu6nu7e497mk1k54xqkddy5gx9ud3n0znl925zb4vfuqrdmd93jeyezyv7gtzzacdd3r77wc34kwkfqu4lc9ga0o4z8my9d82r1nn4eckp95d8h2ttyldm1fyszas0qq3ov11m5jpfggkdqo8u5z4b1qb66m515sqh9c13qktzl69jf5kjsdbs2w5vc378thd1fthkwv51jlx25rs2xokexedm8fopqd029la5guwpmn1clp505yxk8iloychj6zlmat0lhqig9thxvaq6j3h5b0jynx0j09fu6fjha90fwsc0oqslqbj3a38ec9wkachckr892vvpq7dppnxgnf20983go6j0s825nlcm6vzy24d9wt9k3caraldxu1rnsxxoqbf4fqtyadq51hyo5ycubcsu1lh0zts2tw5ikytnnduj9n689i3of7c382kewaurbz7f9o59rvp5e8yb8ba9fhaqksd00chbeqpzw4eu3ut8slkcrhczn9iftq5nrp90ee9tb71z4097irqmn7s4wfkkqfm7n1qwix126z1clfyy518zk77pmcvwli45svygf70g78a8fmtdo6elw8wj0b7t3gm3jhntlvix7pmye2udgivertza0dl4t78gb1clqe950m2yra2mv3l8jqzwrx1qnf5dt51vojq1fp6n1go7ihpdkb735y2f58ohp7r4wx5ro0gea1tmsfbpidvmhgqkjqwc9ontou8o7kjnj40p85ecf8gvdltyyxj201bgzb4pdcp4uzp90q1zh3bi218ou4laefw7rd2',
                redirect: 'ovc349nlla3pggvr4bk4da7h0qtvvo14um0vj3s9o2a8y2qhoimt6cpvih21npfrw9dzm04tfphkvgflqgec6c8wtv1zxy93gnppw4p02lnku7mgvdl0bo5z7bvjmyxxxk5ge1v04t0s5a3impkn08ucxk7aztep0bt1gamhr1vqszi93nkbhmvobxg8e1wn9cudkzwb4f78rb8g02bshu82e88eet0rmg2g5loxsanxpihn5shghhv7rgi1jlzcdbii70ra1sj9lbh47ai35knew9m2mqfypu3a68y3rpopqx2zufhhthvouhfjk3r830wjn1gau00cvurqz61lipk9641grb2qflx97tqpoghouni5p42zdzeowlex2cjv8n8brtvwo1dmsvdpqp0eqntrkutszye30ps7fu66eddav75cxijsjht79e06ygdwvaiqgbmj60wj7qm0m86re5s2l2lufhhx6mqalnycnw44ecmii1jmm8yysyep68yaammog6yzzgqxwy321qd7156rb9g3k4ifg88jel5ssc8iwsr8ohdui7eim37d9au4e18eskxf8wqgexsv8df7lrnq6kizzctidy92zt3e0g8bsex41lwvzg6wnlathvkw3aduottbww588de9eilh839oo0fuh45fqbnnigxqtakeeju5zzfxklcz66b601a3d3c5ljhikmks2twqxkcbngg9b5kbz4m4ma60yzuigj3cys9f7jw3iyoodigvclq4qyob5armfnm3pbov3zvbr6sg4syjkpgekjs61rasr8j73wpv1w0o2adwrjobsgb6w2829bv3ttvhz9i5xdyhbpaf4xdbzdokeq6r9x3patagwrnu7v0937j3df3jsjbqpd9eor7l3esytsmkmp3cq8t7xis31u2zpkrhdxc0pania8oi8hrsrtntnhu20zlhjaeurm7h63xh3x159vwkejf97htusgeywqc7328obsueotxqurecjs18gzn513c43a6mlf40io32gmz7td5gm28fatj1f77fqtknodm0hywjivryzaygrz7rqx1f6lqt5e4u71pqb5gpp9dzd3e3gbdijxxoqudda37y68wh4d3s7kanxvue63bzmu3jhfkqmxaq0j8fnno4pdfao0zmmhz6xd5025wrbaqu94l8u4tbstn9heqhe5waid0ox13r1970m9en8lp8owbupq1k8rupwjo6it86du7hrwcnoy44nhb0y8aoguvdt17m6tdosbrkb7bmkelwim7sg03cc0t0w9d8w7udkisvihakvt99qvgav6we22vrk79xkqq6vvkpnrz8gnz2rkcr7ijsd453x21iu6iy8kyldgi0ayk32rowh8finyjku64c7juk8oqt2hpe9keb375uhl9a47xqv8wvocrrop3nmsys9aawx7m4y414d6ivptejnd7s3mkjis0eb1h5slp3fogj9rhyvfrmp0v5ynr7byiwx3t3w8xhvhqvafyjon2kggbz02ic76fhlpbmsz7sfghuvdmbrdkocidrvyux74jczgvenncgl5i4tw7laddbdhbhnmyh84rsf4azvfaieg779hgek7vw7q2oagapggr0utuo4t2ijkgxkjhlcn7r38eczm1jbibgbmpc02e97oj71npv5sao7b6eupgy4jam51tbtla45cnohzscqztupa7ypxvhbrgqt6je74b3ag8506l9e7y9symzl2pacjmb615mrdzc6snhzavqrxrtdtd8jcg1zt1it2lsd1oqy7oaeav5kgkedqjcichlzd74rw3ticrzwca0eodwodj49vbz75xk96lizwbvwyiitb9hl3xwo98xh534sw9ape57zxhnhi52xezzq2xbd5olz2vmi24r86pennd7xnov7uw6qcznwkk20ivy1a8r00hhed814xcbkxlxvioqhpnfxqkwsodtja3i1qybw51fe8rzawdfulzh0yod84kiay3rox9m98h3mfsd7yk49s37pr18',
                expiredAccessToken: 14163839760,
                expiredRefreshToken: 9772915621,
                isRevoked: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredAccessToken is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'yqpr2zrxwcoy2r1fnpccca74apw48jyyyr6a25n16b1zph9vp0rlscya70evvg656bfmmois30d18gat7x4fuvfahbdcgrole72j9um832mgsauhizvy4te2566rpcmbj16x1ykdrcewma2gmoeuwkglv7zwol980quufz9ydefc4rhkeu5jqtp367uudaaljx2729qzncpucs3jcq74xho3velg63wcu6saiwr6funhxf8cv1n2zudhyexott8',
                secret: 'h9h9ppcy7calmuho6p7mk0m4ecgozehmrdsors0dkdmb6rgcbewh0dgh8kok4j5pd84uf10ha9z1rv3zpu12hyen25',
                authUrl: 'eboj039crh21a01fdgow5fcn2cbvs9ospoddvuud8nj5boqoza56w494669inszd68ux1k7w4i90i7ycql4n03mi94zt6dwi2bfptvnrc940u2renc9d1cg45h3vu9wko15uvjxkmrgow3hnl1goikuhpxnsnnal04cxe7a57c642chcex6lg1wto4y2g8nfhzi8i54px4znqg4i404vwjdi1ug6r680ci1ela791r286sjxdnehfmyaw5u14m0zo1ptfcj369smlabg5b4nwmjm02s28zdx6kzlgrrfxzoshft554o1em48dhtogq7hpegpnla61o8e2iz1gyadzz3c7b34lfpt4akbnpy8dtbeodj4w60k26haf5p1ngji3paormwgk8mv36qmxrl6y353qox5hb5jhoyvzesk0aucd19jwdb4njb7r1l44vwp5x93b3cwrwskttv8ffofhy2y9vo047eis0lis36l4evic9utthpdmcydspcqeqzx78b353kn5ok43km4i1ag810dddrp4if45hzlw5fye5axv9yxfruz441loh1a8fvt091itjlpgimccjpnfryd61bfa6kta7oxfrzkhsq30jn8wtvyy3zs4n7yre95g8n3tfgot0acujwv8riyeau8oqm4kminccek4818nsf1vx7qma3p578fff27k9uera4fwm4q3tw4y7kjiszycx8zdzt1bqzzzdipdxj777ln1n461dpwbsop8gq48kq27ivev2sak9ujeg7e90vt02v8j6b6mqupxgdygkzz0umlnw0wsntmr5k0ipd229cxtrrkjr1aax74dsoaib4iwckgedp10j6xgiqsb2gndj93yhccqs9t27vk7kwxls6nk8fq3qwqorvvwuqpuwnhkpuj33waqu4wt4hjb6ljua8eqj5g3vd4g5fxxjjrkkrd6ub3sbms54lsixoj5e5eqculpnscfptzb2iyus4yh5tznzl6fmru6cz09mqyj3u417xy0in1gkrhvami0c8xz8m4zproiph0g8h0jj7umcgtgkkqbpyuhfsgojsrgd1yu1caev40tzd7pnwqjmmx8lyex6y77s9u9b1zett08ay55hb70lg6mwj6yq29a4c2qi8g0e4edp5r409js4cy5nbk5y5oaysyy3t73qwonpf7c6n1inm26crftvv9nsfvo525gq10rwyp4h27r1ewzugwsjnjcn9rnm3mp8093ltrvi4ze4art992t3q79kgasorojvxhyekney36qyt916s7ry28x7xc6sbzgkxctkj38ofl84wgrnxk4ujqng2awiowinatx957d0nh5dqnlojdyqom6vgertpy7cczuro8pfph8bn7oxzvhytw79ovw4854poyr26gxogjmvy69xr06ftsz6dd14xn4605p8icd4hmf8v9b86k34zjyg1cack1qnejarp0gze5lyp021bkcdegcvp69wycdu89cy0lhva8tuk0p6c2fx4b3erd6vmtecfm9tzhzky49ceceyd9h8p1u7imc4b2jv6j13ut73m3da2ugll03os4qfv18lmxkwx1mvvypmz8wz8ea4rw7m8xltw5gaie956m2x1jlu374cahfnuyt6dv86ntrjusnixpb5ihn69mnmjgryp9j5kgyphsvyr9hree8t8lk6zcmorfnqvtb2g3z9eg8pmamgr4fjtjy41gmc1dgnxckoiauno6oxhrzr181s8pffvgeecs5q0s34mxfm2a5asxwfawf64aya25tvbfjdl3fpcu5kfyxg5lwg824ycqz1a0xx01enlgmafmcgnl39jvlpvb3we8xo7h51nrce7bwh01tcr9lhswu8ahbdbf7lhy7rq10i630kmdeiue6icoelvsn36k3yqzmfppwovn6gfs0p1xwjn4gyaoui7r0mphghbc10x3lg4eqtcq2fh6m0h7nigcw6bxahvjjdm8q8cduyczcvq07e10pfx1wqi0hemq6z0jd6xih9bpr0vq',
                redirect: 'o3gu3iy8koay7t6smp2x81ve5miz79j6a6dlxhrow9mpsku6f7brp4k0lqdjdgjz1yg2797352tvmehbmb6cz5w9jdl526agcdpsvp5tou6mk4gxudmpwyitlopgca67fc2qt5busg5izl0hiyo7zw79zplfzl5iul67qiy90ehdycxvue342ivmkzl0gxx2674pi4biubae4lz3gg6runbmm89gzoift7vlmcae6pmwqp0hen112hglzq2t1oszq5yp2ccqpoe3cnbq3ipr1kx5rorix5v1o00xcncnpv49rfbqb2wsbklggwv99re620sdmsexyyttv74j2d95u9ehhjnfb0vpq5ltn1g5k0qdp1h69dx2r5ue47tetipm66xbwhe8imccz8ymyqzr7qjdzh6u3jcz0y4jy2vjihx9bz6v9jz93v68ndlpmewa5l3818zzkvc9uhjtkoiol750nqmf3q3ezfcxwt5f3udrw43y6cgx67ttgwam10ds4il2s4592kgpf4lha4hwewgh85l09kfggwyd7fsevhteje3llhv0lxmt8kxwq577zrjd5tlv69fxgi67b06tpyk7nlpn6m2lka1yz5a1tq3xupzjl9t87covyxxmdgwv0hdru8cwo9yxbymjeqz2xcjphhf6syxi1joe98060514ajd94zgxfq6p749wnoa4wqng91f3ncb54vmwl156zeth3780xixzgk7nbwxzk5h2fdmlbxgch152dp07po67r3rpp5xj7eu0ek8mbxrd0mgvnqpaajvdug6z28duw777s84g10r0rjymuz0gofrrq32mz93zfhihslk1u4ksgzs87q781c06oyuj0x8hlzomppz4mcvli71n5tlse4cz6a7rfnjedevt5ar7wzpr5valdi9feonplfooo1cxwoypix5z8noqov9t7hx2m6b7ne0ukg4y11bqc7t7jmlvnypu4u6lrafv80jtyepefiqj6z0uo2lodvhwsw0pkcmz5vm1niuztwbyqkuv87z8z8lnr4vowgmmntc5o6704e5s7q268j8iywg0rwd5xz5495x60jgozf62aii1rbrkmlfzzzg3gbcfkob9m19n64idscb3e6upwbeido712zei2f3bgz8rxuyu9fdbrmbbvjvlo58as72bgvun9rr7ydotjv1e3wp2x8epeiversu69a9tt0lkrb1k77o6e1legg8i7ikhcza9y1g63s5uco4trgpf23dj2v8pb72dtrdjgsgayu91u8razg4r8ebezol2yjeap39gtrwpb9xvtha8jrikg1eiu2hqis5zzbboww89mqdui55ipefv6na0g60orpddl5srn58k4hz3cvh963prc2162i0atozh2uev8jxu58rutvprofruk0a626rr1revsjcscsynz6pstjruw0o4beqpmh7npipw56q2abs2tnp19imf9prt7ojyrwlm8kaj2feseebx6aezt0zcwdgs2sgqv74394qwboyodl3l05f2h7cro74730s7ashmyiwlufltq60we9b3xh8lhx7dw1ca0pv4b1vbhuvmwym9lylo5cmwa0ngi4j434nt2bmecs1n7yw9yqiy61n5mu8e4gtcwrmia9z089326o3xzs9z2xeretjdmcnzfftup0yudw7pg49s04ig5mbnm0f6ebno231qi3a8zpni00cfi4du8aogqilrjmzhqlntdhq2jpxv357wioyfs212ynqvbwfs9kw27zzvpry84onv49vs0y5yn76b4tzvt1iyoy3fpheyyj3usayv4dwenofhjruapnlqcjyxn189lcp5m3kwm82mas0qcsmwkmn15gw93rk9lq5ia3izg666gw6yiuaid9hag07ruav73mbjvengcvbg1zc5ykqc7jwqo40i3jpimh5po19ciyjh60q82guozu10vkapwu5zrc3a01n8s3yp3aat7pyxmvxbw7sg2i67bdk6gl2ol9dkdx1qru610je0u2yymsm2',
                expiredAccessToken: 7136482268,
                expiredRefreshToken: 24514659296,
                isRevoked: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientExpiredRefreshToken is too large, has a maximum length of 10');
            });
    });
    

    

    
    
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredAccessToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'y0djmlodsomxhm7gforjn2hv5o15a0lm6l9w4n1m42zxiwuymi6x5axrn52yf3kzii92grayj9ekyb1ni84qqs0gz9zwmjmfev3en88ksgcmdjkem1k6a7rvgdoit2xjoyvisf0dxfc8a1wbgb4f89upgcx9tkjb6wlr1vfcrswbn1v2f9hotb0ysyxft6521crb4a54d9az4oc4k9ab2vd4y36fzynd6ftvfz55xwxt6pfucllansbe48qmq7m',
                secret: 'au46nbzl9fzi6o81ue7u7xej3wviwhenv58bbeaywquiw0rwy311f43ardejl5h03u8xiua9r40b4f89wxj6iyud4f',
                authUrl: 'kkpei2iys1k1stls6z1t4hkojaa4kaf26dyortaexfwnh4gdmncy28ya15qw2bd2g4uwi6narg6xngp4yse03hpsshu7ihmn7hgs0tie7o1miki4xrqn0am5icjwmvhzpfv0oe8s9o391azc232zx8ujw30ponatn4pxsm7hyvay6nz7pl0szsvdhir3ujr13653tpa9820nft0r78vghxj7096z3ahlqfv6mehai97po5ssj0vk8axlhlia3emsygbppx4o67qy3z5n379fulju415jh7dqs5pcsedkaccoq9xhihq40owjog4ujwnhj5m3iiqi998ogoju8ljxrpeparv5fo0yhg6eaodlfzlsf07n9c85vbc723h80vx64o5n8q2eypidzedaosgbt6ke7b3jxx2plryd26chhdqzw2l77qtz2td7oa3x88bq6pq55apyn44zrcfy2t71q50941rqvuonh13bv9ezvlqqm8a9g8hl9xwxgb2776ku1dwxmmcrdentszic1vz97d9khs5rdc7g41f2lfpgs2puakvxykmtfa5v00d7lc60x6yael3vij8emeqrq1x6qjcea6xml1ijbg8gbov1v6ztvryd16lqxwyzk7vey9eua29983brv7xuxwkwobb3gehmp7uqcdi3vxdkkyajqtba4v02lonms8cdp36o51f83jb217uuiym79cd19scrw99jiulgb7jyegosrxn9xdyrvvzmbwo45fnufk645i8xjngnq6le271b7xdfkhyu76a4ihzyogjcx7o5w2sftolplpnsz3rbh2z9gr5r1lm91bd3j6xrds2rj5q11ssx8nxi6ju6qbaboasnpzjahr1n5kowqgkhxj7go5cbceuaqp4salnxte6u04s8ulaz3mlse6q3502b15fcv7shsrqjf7cd95a6kobauoynb9m3p8g5gkqjy4947avr0hivliiviq6763nvjyn1sbf9v8p39q3kzaib2lf972vy51irzsq91sjtg2e7y4eumqmycantl31e0r96msyj4sq52rpwk1e9m3kevuhg59vqogh8e4lpks1ili451ozohr8aqn40ecqvhiqmdztnt790q4usbeusgla6ljzmr7uatu1phh6jd8pqtdm867ualk2qg0bm3i07abccpflbjb2990y4cw9p16z0b8cpupyq6pt0lhjp9y9ola6py4afkeof5o00a2k2usz6xrn7qa6dizitd69877urhw4j0n3f1u4mk1uotg1ew11fjglvhse2y3e4guzpvkdxrlri4w1oprk9ywlc6qfpwqsuqofuicbi9tjnt9qngopg5xwmuwln71onpa2p1spefzi7dw0xfcplcb6a8o9k34kmo1brvhagw1k8p21whii41en3v3a9rnwvmu7brioorop4pxgnpgb7xpx1rwh8ymyv0iubjcdz2uq1v6f8y8t8r57w3e08x7wzuebn3ms627pbsm2f2fqsix88q8vzr8t4gxsnfutw3xvdp6ph88wax317qng7uxrbpb9m1fr8nfe7zvsrotknqv11bmf4ghagkve0jkcd3gouc1dywnv3uokn6bcna8ttbbejsdyrpecql7ki0xszb7yd04z5bz0j34ldbinbaj5plbndopxizg83lhdl8v0p4q0pp2fvj25r6ffc308210ulwrco80r99vsbxc1p6c2e2zqwr4ripfq3qru9pr40gbw0lztb8lje367duvixfy0ssdoy6qf9lp5b4md5lccrv7esy3mw4jmq7rhidgspysodxyec2777k7b3x2wh335s5xo0yzjzde867ctyudeosdvcbayx1fogqfdz4ebqtpqbv66ihr3jwjpyr84i834apgpvmtft5p4z8bkn8affgy4gzx27m5473e2tul61qgwfum57tktag4nd1c9dp6o1q7yz9nc1g21prpdvryihxzqw42rd9u2ogu3sdw7teo8wtddyc8rs9whzs9g3499a6k7y3aqvbot6zq5o',
                redirect: '9oexg990z2s3nj2eeluj8302562j9l0iifvczrk4bpy2y4ozz7pk3tg3ctao2my78aewncjsjgu0y0ldpfwgte02fyoajwpsxnoe75hg7zxnha7w66v8r3an6ckaxp0ipdzrgtfxcpppjqcrz1fe7ks4ehfzql03ldcmpp55300gh9v8ov0ufunau8ghzvy0u8ri2e9aotmc97mrq27jvbxb3l2x7h42gkyvqnb21hektn1ds3ggrqbouqejx9q76vop1ouu0gam1me2jdqxni8bn4dj78xqpdxewzcd8uymdh3szxi3059macsubxdqb1w91kc7pymajhosnzgc5d2ckidlcozlg27q9yikaasqrn8g0p0xctsk4nrhe97gzff7t38pu5bg2klnjb8c093bdff2c9pmtvpyj8aqbedcszbpomvpc0lcu0bya4xsiwhcolyt2p4etffghxpuq7txvq4ba95iaddzfgdmh89ij2f0vbkdlho32lpaw2xqhxbrz1lxfyu76iy5724fwjzorar4gunvj2kuk2gipiaixqv75th6tczsbbfbpqvcd9ilste26mipxblbhg7mkw39q26yc9ki6by6hrlpk1qh4nw7808ape1sgnwwa8uklxy7ipacyybgmii8z783qe40cd50qxc97yusg90iikzy6wwia6c54qzzlfgk2o2gd2kw5eahsry4wh9ijstg7nibert61eebdmxp722dlw0uzpgr39md5sbvnyy66fglt1k2xm24xbognx028h5ejxxwfnzflyvibixs7txzwq0s8x0pzstml4zualzh0tmd3289zkdu58htztfcm8zitbk43yucq8iph1k0v101odem2gn8d4nu51nm2b90j1to48uuaog96kl3evjzbt1rwv2ps8vaoacup24fu14gf0lvd29bw8a67hpg6nm4yi5sociq0irco1e9k32gkk42jrzndpm9t73m5ac1yd9iqgpbinb3rkj8uo63ejbsyqd2asg7et1qajskw0658igty8fx2bbp0oieo4n65q7iebg31tiqvs3z5ttnebnbartc6eloxjjucs14oxod5401chz240va2yvdqr9q6g5hemc5l3u43sed20zx1iwcapp0mv1nnxd2kqe1qm8t5osx1lb7ue536g6w6ijywvn0tsjembj42d6r4aky6b63a9byysoanrtm9hx42pw1hrol3f84l9y0409xektt6gkhe421pnaar1a7rl3j9332de5102h9t0qjhycku4pno1fbcgp40a3uq5zb98uq7lmoguiq2p9evjwxriip00fkk5jf2gx9fnxehzyjypds4942wedxjtu2wx9byi7ynrppe282kls5t2590941wvg9wn00715j8k54yq7rwxt86j1kwic93u9ylrg70f675t74udvry620m4f7ocf2yjgm2g09jacibn6izvijidtcu43os6n1ev7mw5lj3yfneishfb88frlsjpozgs2mg5wzonzsr6l25xjl0shsvzr5b6k2k5rhu01i4w70uot62i1mbpk6150ynauqlwexxofgsgx61ae9kdxf54iwor9l2wt1v5yxg8lpbhjbopsnjqqrqa3kn794tl0ive8c3dsykyxccx8wa15xus31j7jbwf4agk8j8vq1sot92xfgn29mptuuf9rmmnapps3upzqedak94dmxaydei4tpw2zk8q8rpautqb1q06idg0a59wdxsd67e3evjenrsjmaa1tyyejmtn0i40tsgqdaiir0gtovwcfeouszvblyiaq20pm2p735540b0zma1gqinkxxomukpqfxj00ka4gienrjetbbj68gkvkxw1ei35nflhfr8cb5wjohxb18w4e4p4h6jpmmggn4kmvbd9xsdswg5k9pra7gfv6hxbkwci7km9szf8oln0frpy91rshlw0m9nacfmmh37ngw6fago1vtk24hg97qej8i2ruy3ra7pqq1wmmwp0m81myruhqn03tqc0qh',
                expiredAccessToken: -9,
                expiredRefreshToken: 9658644547,
                isRevoked: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredAccessToken must have a positive sign, this field does not accept negative values');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientExpiredRefreshToken must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'olfa9vjedpzfauexjp7ix4lfz0dvszyrrqsxih7uy4nv3uljci1taixfqwi59sz9gphrto5lrajrgbkc997ddmfjianhhg0rwb2luk8mars35f7d11ufx1i0n9s0gl5yq08q0mxioxafdrgnb7l1dtqsmrbmyjjr6u0ky3juiubyloh63d54gqn03wolu7z5afat17hzj15lhbm2ck34la0m8ehomce0d69yc4mw308f9c16j5vgmn3h6tvy0ze',
                secret: '4sielpbt12cbgxbypnnzs5pkh17rm0454cj3bw9cmigo5ec9bfgbvo7o71ddj89v50xxgv4d17wrx5xdk0hm1cpger',
                authUrl: 'nngfh4twjg0zq85ewdrht8dtitz78ikiscaxbed4yratuyvb4a0bte0xpiuafvqdckuhszydrfkihs2s71hna6foayhl3fj7q3l6027e59zjea2boswn9ft8vysza2ixh5g5v39vsktlvl2q2akvqcrz14adrxxm61uewjjvplsys5bjvie5hzt514qbj9njmttl1mxevquamps6lwy395ict36cqrrfo8ldr68kwh066fd4k0w7poz1sjajsh5ymvbif84zbuls08pohqrdojibrppt5bje88kncf4w2pcg98oetzr7lxiaavt7r57ljnuj5yzm6zaplrvtrrvpu2pclvd4bvdwa6t11x5p4g8p59ovm8r7spjuhc7xw07xvva8f84ovq3izzoar1t8t6wjxpq3jrcv2n4q15jjymjkjwujue9y07cqty9wimktppljeybkiabiicbe9p72wyy64xcjke87k6xal94c84e9yqco38my1eiug9tsyv7o8lk0bacv97l6ghubuen9bxmb5988kui1b87n9ddx1eglofdcsbn6pzf76827sef6egvx4evdwrptpjykbo5069563vzb98rxy5x62kh2pmg56ieo3hd6zgg9v920jnx80bfs8oopxtlk4xirih1x1a4rhzhd8gf5lbqonhmujkigs4fr5g5pzrf6rcye9inwryfjjm4krb4l6vf4shijk1a19kbdx8nifn940mxio8w4msjmcuisksvcnynlse2lt6rfvj1vyz1zivul0zbdkmxuzlx6gme93z5u2pjl6ekp370yb30gx6la83y2enqazwof2mbmkg84d7bkq3uzr9zq3p3rhr6sbmewzs4yck3ckg898ccoii10hiet74jpreit3bap4elafe1b2fo22wcqaz1rag8ds4hzjjv332m2rjt3gsmq2uzp2e5z1khm7z86i8lnj9zkyic1hcrkgr74c754435sx8e7pt228oft2918azs8g1kg8shndh95gcpd3psf9dibw01mz2f4ye6w5swez7fvdds7vcw5cuk6vqac4wb6lfmelasmfejffsp5caz99loimxeiys3hfl2mwo8zwomx9hnk7c098sxww3w3la09imfeqo20gnukh6k3p0dhofszp9n80ls27zx9g3py5xse0blrxpa7tmmp7pjuxt6slgtzznsgqc6z0wtv3ykgv71h5o1jxg5uqw0we49x4c3vo7wvu52iz33uupma84oqcvofm2g88f8ohpdp6xfnctyppe3j5f0ysml3iup0rawabkrh6csy89vbueg9664duagzf41d9s51fmzf2bvkzvy4ekza53i0hkf9cmrv42e9sgh62bdwcr665orqrjs3kglbwliv8e8dhq5zjgg2txnjr5egr41e9mpwshjvdpsehln9i6vaya5hqs90wcjuemu0toplmi5w6qmo28q64c0bjs1kg9d1lb9cbh7xd308ked0a0arr0cm1ynx5lbiewqz11lu3ioenkvquuz31skqvxu5wat5eg8j4rd373fnfs0f50bb0yx5d2lyommljvnyts8c98ohvkcbia0xhfre53ew0gh1p0j988hwtlwtwrhurd3wvvg09rt4a3jcxhkzuai1fdyt29wchcdqcwet84hvker55fnymojzg34nx9s149nfx1qp7x14zlmodr02f0b5vbouls64rwri5g76wvgl4tsuxy5iqfl727ta0jn3qnnalf5bgjtbndatjct3eh6vm5tf7ym2d7s1kwwncz4g8mhl6xdodtey5y8m0911dhjt2u75b6dh2yn8br6hxan9oocwmp6mmuykfcqijvkzltqeswolv9s5sp21oqzyv5ewno12cz6xn9d8euk66w8mv19b3crzu46oirmgdqaj5zqsj18wrdgk1byp2qkrc31sjzbzefl9uzv6p3tliupbajyl9q82qzsjluevsdnvz1nz1qjfkjv3aa1ko2d35onrswb2brkms09mi20hgdyj1rgo',
                redirect: 'dz7sq72hsjvfwsivn215sih3c9t4wcd5tg2l26hhkrabs19r0gh65u162jol2dugri5hf6ocqh2s24ffer4s9wxqwtipv0nhzny08sauqihcl62kz1eldwxq8eej0ttjeeyg9vksuupkr25cmximv58citupyts7a92f0zvoyge3wz333q1n2p23iml1ngtxgj99ejpjgz9cm05aa88tqevb0h42o1gpgytximz385yukkfoqcytbbn96d20g54rtfto26avwljenhnaopib2zq3u57881th6zvb3j9j6wq38ogoy8sbld0nilnggjaxzxbassdqtovv6zlkai253au9i1qz1ihv1ukntzqfn8m2myvglhqh1biy4g30z3x1542e88v03mytftasz2tm10jp8eqh2vjoc2uom5lzw0u3ihrl8kz393eyoq3996noetk5srcfv77ft2puac3lv3stw5dygo6z83bvmosptx5di28bf8ihsbl3x6cmpklnce48ja72vld0xbmajv08voszfcn6k7qz6z01k8hfrbh4dczkrbs6jgqvvshbwbhjqmkyv31i6zavj17mtkmiz70aqhhtdytxncwss6o5kdw8273war8k2gm3z272fbhcminnsd2tqfxgrwk6j2aats6xydv1wqambc5jpbi4gt2gwcxwywd9ru9odhkthzntg8u35hq8c1bqe2glaw5cyqd401flm9m08cw7ekne31q4l9qehtx5oxebd1fqct059u2xx85pcojy0in5a0shpzkgid9qfk19ki6wgymu6jlwl4d8si9512sa8digxzbuqqt4pr2x6mc3dmdrc0de1ruqalt8g8wv8q0nb06ejfj8vaj7glbt9ejrql8bkljtfk96xna0kqtbsn1jwtxhj9ggi0uqe4y6sy22oddvkgsq71nwa4y1351svw4wwt42xdvrwugw5gy81usx5curobsdouur2wcl50y9836vh8h0kecb19c2d1saj6qcglgiwklzt4k950g9b6plhf2w4drsa4w22n6qd27q9txnr5rrzjh5vqs1vs6a7degsqqcya8ei4p82i21ksyxryrnrxe778mr663i9ug0ax483vjiv5gb7numh022mi73piijr9nk1hofhh8170wnbbpwjnstv0u2h9ezvi3jxxb0uia2z972p1w98u0fs5sylcu30kmmiybkixmxsqejlmldfpe8dzdfgu977sctwjqwqa8oqbi5un2qm9dp5tcaxyfj3kdkxtucy4ipc7ny6eqrgvbl5hjhatlhl8eibf2bdj02kbuu8cbb5y9nzkn2au1btvinvwpj0ztd8bj1bphry2oijjibf2f402rye4rmsz84jt7lix72099xc5zvf08vzewtnecb26csvhhpj8h79vrmjqq6be4bxvc9fuhoyo7dgybd6pw6l315mkx6vsdvl4qm3diwox27ho1ore3b3u68kg9pwmqod7bcwry0oqe3brmbi0nucxb86943a3grix4roudculfhls7kao6gvc45pdjkpq3v7tefpbwe86nvg80auv33fh3ottwwlbqsye8xqdnav7u4mavezjrk10429uzz8b8kgto06t3z96q2j37h2vhaic94utibdgv5p02c44tjp8c5etelflsssqtlnfm1soejv6ll0ym5coqyovl9a688ezcj2jvybk3gkqfyb0rhjv1egok0piqo1vp1jpmc7h0pkg5g7938cvfv366olbld7o3fn84ss6emyfwkpiet9741kfa01k4u6vi1toek2a2uug0e08lkq2o4vla07aza2zoox13fmbhnlouss9mkwxaqncljnrblhu4sw273h0z6u4af36mo2z7llu3w3ho7md6i5qd3xcgcq23z6kh8nksi6nm5r97l51xeugn6fnv2cn9ye8q4ficgel372ihe4q6a35j8mk44lf9nt7mw09c5ajkkc99gdiwf4z5x5g37b8ylgkfx3g0t6vzv3dmokcgl65hwx3xt',
                expiredAccessToken: 9706900671,
                expiredRefreshToken: -9,
                isRevoked: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'PASSWORD',
                name: 't0ptxk5k6u1gja7zsg3255qimb25a07k4khs84lbntn5nts6bqcjfny5v2j5okkt4d1u87mg0vwpx566qvkdt8kckn9j4u9l475ehfh8z8ftcvhdueui4iaqe59zg3qv2v9kaslci4vg47x063llaf4ggxqay4ihqe0lyfh3qyavlvt307jqcuuvyi6b9b31yhp3og63r43f6hjvosughd5wol1rhy0wochcjrq1grt0gdwi1po9nc2k72hcf2o',
                secret: 'd4ep4qdhen6j17g13wc5321pvvjk5jgbt0f2f0g6p139jmbo0qrv78wuxtn2bpcqkpa5a3lubtki6wwr4i1j54kes8',
                authUrl: 'kpvtq4p8ycx7s3q78kprnbg1tl3hvta7v24erfoli8mtqxlq27nlipfvqoopylas14ihndt96e7p9hi85t8yqbgkpegouqxnuajes82sankn6gecq86q2u7064zq9d98tbacrshz0oy5zfmlb0ibwgfksb7rrynxrcbmdr472hbr5uevokhymovhqfu4se9unzcb7tauouzn2ar543w0mop29acnlblhmxqrlv783lg52ggjzolb8wf4p91w7vrdvi6rud102asrxcrxjz2de61v86ins6sneruabbw7n3hc71uqltu8tifmp33m8ha9q7ewhacmcfmhkfob0hojmmb5mybtkxuenhrbya1sepn8u0qc3l97lmfboilozr4t4twg9cm6zahrhslqbzgxna7afo89joo1ieoqd82xj26vzutpu0qp8ppqywz373wj5whlamdnbk6kr1z9ss31j0of7ickkualilkgtn6s9b552x2gkltvk865ndjtkqv9zipjl5pv7h6mhni0h99bpur7xkkgozxsjxmaffzv12ttstja6uog05jozlmo8qy7pu1jtt4t9ydie4r5hy42rbkezwq4ei0o388aiz2b8qj4e17sazwwrem712jkqjd7h80n9jn162apbvp2jajgpqnll05k8pingjm6kof9g9y5may562uhjf0irq95wnds6f7zvqdtnz8vm9qwbw7rxo2ktszunyalhe83knbc9156sotnjuotvx54lh62pcjhpn8zlozv1s8oy5nivs5dk5lf9kcy62abex6bo5iv3jkkc4rxe65rkazfuojevs3c5wi2mnbraub1yw25lk97htsrw2iv0lkwebmtntuulaoosk19rct1pzszgqvhsetocr8krn9gl28ckr1tqihkw3trfzg8yho7y6mnsdm4gcdrolmiu44jwqpjdztpx1e0ce3j4208bbckrdf6j2qwlww82k427nl9p091j8f68vhizjr22y0ahq25cxmvkrq3pndkm4u9ju34rsa3h3eg1qdyiwa3ud36dl8xy1krlt43se52lbf0mr5sscpncgtlgdkc0dnzubgcp93dx0h17ubmq4718dnj6rrdgc7dss172z02k0fep0xle7ve6d6weug4m9fejeuqyrkqvtq0lefbr1t6lylo5jz4cph7qqz4pqmjsy0jmo764s9cyrys96x2tj2ostpn9j0uhgp6u9fwd2w2ggcmuhwsph592y1dhih9oaywyqee7n2jgvfpy4nutqe5uluhcah5swk65lwsfjqp225nn7gw6ijahoqpza2dno32esplh17jlfiqpd4d84uhcepzwrnkxbpqco1coj9gmmm6yzicd7oimem3psmfsda3891waqcmmb6g0pjfmhv87nyyz8kr2298pchr6xg19264gsp90h7y7dq1y0vc46folqswxn0knbtmkkuv943kpx3rrodilqktr0tn6qg2tacm2vznazzzct84o26yvdho54846i9jcvrrw4n6v37f7x9h9dupsstxg138fose8gl3gsd3gjyqjgki1xorfjxn1eftft3une5k0se7d8by47zzswxqxnhvs8jwcgy7vsj4bfbe3ohj0eiqh7t0n0c2agzum8t3rgi9h1zs509byb5mj19pda0hhuxx09zxgsgk64j92dw4z9gmysmr7pkewvgxx2tmzw6hyho9okv2vgsf94lhj2ptqqpmgsl1eto9leo96c7jobryt70cylprtjrac1ij2ekxnehc9vzx3rx700l014h0tmvemduvshfckd8aevbr7pjtco74xkd9yh3bxmtklfpjk2shirdzjiaql2ehjzlg9c1d117cw2mhmbjez6qcpbsq6km0l633vqoc6rsmk9luxepdfnj471xrjn2lm9rmz3pi67vcje1bptob9icomxyrt20uf4xtcjkuzr7dcvd99dj7cmi3yzl4ompjoj2v4n8ofwy27n1chf64urq87sw3dea3as3221r5q88kqmdu',
                redirect: 'kfu3mp1o5em0j8cgqo4ogoez3un1n99lk896fpheegodub4v4a0ayws01vm6fgj3upwgwp5s7jz07ekigutw432gi4qvt2lq98ufe2d7g7w2oic0549cbg7yow4muzui3wyty9i93bu710yro557mxd8an97u14120mxf15od2w21o3af540rc238p97nsp3didwfxeymebgn93uumhst52gr5pxrtb4pp0m7ow3favc2gt2ivb3fgagsuiavy3kcf5o7ok6m1sr0q1aade6tn8r1ealgbg0fg0le7hiovm56zlsulktfv2kbb7l7j8zro1cez28y2ydj4v8u3adahsvyc5zne469ec2s55d8k8hqaax7tgew7s8glmnncc29ikuihbtmg206kgvhqkbg0hwbkmh9b4jnhat2fjr7kbhuv7v6ewgl3t58nfm35dfcqgp2500tx3qfjmqy7jb8t0jaqyyehuj3iee90z5n9x3hs40511rak336qys3naln024962ilxp3xy3d8ks096vx0h7klvoyf042zo6lj20rjy7viky49k91x52qi4s48rmhq3t5oqtr8t46215timvvrdpvmzjc2qq71bsu14guy20ybs9kffbksts6br5mlz0nz9okugeitirprbxzk69uv7ij4i83j93dezb34qqyx8a8upxc4imehp1y8cyzoaag3hpx2uerpssbqg290i2jgke3nbqxg0ou1djeolgh17sho5tjw6b5v7b74i17vdlxseurd4e0gijr53dw349ii3f6myfcmyhcafks20ude4w8n4mny3slig7oig84lupw9dj39fygu60qvbu6skonuv7awntrvcnh8qj3yom66qn2x193494im6gawryjmsgctyppu9ptuiccxuahvijxcgoitsr6mflp8ysyuqfyx2jwnda87jjo2pjicq6rn3j3asv70jehwkqmi8ex379gf75bk9x268zr3wkcy7fj1wdcvhe5lb4y570u7gy4ndxrdy5wd4cxqhetsqjvx0p48tkqcmumiubopa69jgf2q46eg6a99swl94bd2v43o2vzwup6m0n0dj9729z0q52ngxbt06o99bp0vlz2yx0g5kthktydjje1clksr47xkygwe0rqvb1rb3vr37f6jzpxzc8wpqlmed1s2sb0itsl387nca6gtjfhpxa49r5y3nye5zfztxbjk0geb569yzygn68i5zygyfyqikjunu5xdlyz6wunbmrt0gsg6ny3zclobermayv5pb3xg73g4qrwxqdku8mev3j1ns1jlozanzpqvn5stcd8cstpdp4qm0vgs6912jxwmils24imsvntof9orjvlkav2ylm5gkahpzgnpzonkj17i62vtyntscvwsnn9z1pb3mlpznhx58glfwajzvtqdyg3iqahx21vs2sq6ny01ylblcvfg4tazupj7hrg115uohegw23rh84sdmuvtu724cueb29eqwk4cgizcvv50e27jgfkwkho26xthc7ib8mqxqlm1o9gy4vb8ckhotf0w661qlfxex4duqyn8pxwbs5mex22xe608pyq3qx6tuk3xbqx7mszktnlkxf3wyre8618f7evi56nhkqe62lj5xw85uhzhpqmpx89fwd4usyr2wyus6ssppeghw7ozllrtq4o98swk29xztq726yrcpgnubwjq1o9ctr6wswlk7butl3fq9bvivl1buyukkh98jxku7e4k943i7cduc5p4g44t9ez6dsxvnjysgqdb5h1ti6gx267ojochea74biddr9qyfj7et93yas45n4uj1hw3fgvjbxk2m9newc7w7hcoq9hpofp3js9oxudfmwyzcoi63a35c6ua517daf2uhdhqgt9g0nw7feh4v5a2bfk65u27cy4cwg4e2zq82t3kxzzkjdh3k8m83jom50vjj85t1kx9z79je33wfn8v2wjx9fi6agm7tmze8lejq3fjhvxuaqxxsyrdefigmzy65drixuetiog',
                expiredAccessToken: 1286196454,
                expiredRefreshToken: 3513857974,
                isRevoked: 'true',
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsRevoked has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'mi1usntftbib1i7pjheof7hvtlbbimg21sggw63by30ba9367m842sip14s6wj5dclvx9vg73084ok8aq12pl5y0n94yc7hri44fca49oy2crrkknr6v3677cn4w266ihgx320vk0caq1wuuilul3wiggu4sh250m739ynbbqflrm8ten1brf3l9zreoby65p7f7y0xlcys95ot5cekxqpseojz82m35x1tl46yyzxghq1m3copk3cjb1tremq9',
                secret: 'u09smw5516dxz3wjsuetu3pkculbj39iabnzvs974w4mm9wgi12i4mkmbexazny8p7uxllvwbpefvnqtpux4dy5eu2',
                authUrl: 'w7tyix2cxl5bh4otk0fm2ylxv39xtyyepa6fqscpsjdphis047ql3o7es0nm0e8dmswg1tpfr8osalwzowp5oyenc315zal4hh9t9y5i9tycon4ymhj77hfyz1w0nfgg1pc68jhqekn3wvw511pag31l1jbhkz8n8cispdj3u2srvpf9cagvkilu1r35ismy1dmws5mw1qnn4ig9052hrkhgz7rj7gez29fqhxxdzcifhw30pxh0v1yogm7kchn7cdg9uv69li5zteani0yuvmxxpvuajvsr89wqk84nlzgkspu2zkl7dfkizu5nb2qqpstop81vz1sfqjhvf3gfjn4gegzyvmhi0j5dbnd3yba6faqq4ox3j7n8lxhuqo634swkssylt9n0dmh4i69e773lqphqh8geewq4dhzmieuwwx52qa1jn1g1yjim1705e88an65lgazvdj0ad3xgld4oe2lpeqkm89k87l8i3rg5i6any4rif1ec9zz7d2soe2lkognmwbroteisqkb9zps594wltes106iekjtof2exbzqigb5d9ioqzx0v131vm4anotcd6m9l69erfil03pilbtrcrvjodec2tx6zjoqr9h4pr6pfa6b3serxxopz6orut57smxfqnzbgnqclksztvtvnssbprt7696kxni9gxgop501sfdcr3ru3s7mmjytw3h6eafn3fqig4wk4vsjbrt3nbcgjeku68y29ratmhgkf8vltnp8w6mmoew68pcpwncyg2axbng8uzgk8k31ewwsjp6dmx7c3obcwu3xglbf984juvmor8hv9v73eec0ym3ffmbnmox4uc9p4tbhzl2cgcrvfyq60seyx63rt7fhzp8qpkedcqpj9neq50nl16u79nyborttwogm5paer6bdpziiz1zl5lm6kldvfmoijc2gsx8o1vvdfq9jp7zzylok2fnns94hed65mf47gzobwfngsfx1088x5c3imb8m2mxfzqldb7df66zsxyws22lux1635hugxoao87z8is7r9q492m9n6dgyowy9hsj96wpf9d718zlwumarc7wa47rx6uib895vtrb319p4er9q0bw7e9wdm36z240s7clz3q7ehgkvmtr74ztge2rtwk32apqcvbqxz7c8f0tud0585ezpzegqk9fr07moai8qui4s0yshxma66wofm9kvur8omm9unn8rk8lfob3py02iuyke82oijzfkrs9gj29iy40e0pz6beyohdx43f2p4lgj6wlbbv9ym6dujni6jpbacqex2m52oe27jpeaoob9t91oz141cqpx18pgeo62dv9c6sn3ablb4ymbxsajm0yg48t0j4q2rs9ogfhsp3b2nhl09wos72gz8luivbfxgi7v5l0m5q9k4m26ltfvv2jcmhc1i02hpgbxmt3dftwtxxxmnde8be5t6ojaj1otjhx7i2iskbweuqscdl83g700lmsj3gw6olazq5kty8oucsl1dxaozygdpbhbcpkbcoq6mjessq9tt1eyz1al5v1w9rxchvx9nnq5qrssumws8vkzfkqvl8fldkl6wypwzq4dg5yb4rmrwn52hmxld816nqrgqaj7a8tffxsizlcj6moucgilumtca5uanz9qimhzey9wxxhadj345ajk3o4lysjmr8jthyf016nkgy2zh14ohczvay1hbeofoau19ys56fre6j3jn6vlny9aq7a13d6mrsxdp32dnddzdblykgy2navphu1lowbrovyxla45myqgsgjcd56386axzbtvkd589r70tthord40suin1uxknerocg2v7st5eybvgabg77to9f6ts4ik2vh91xp75sj2dpce1pf3eesn8gil0z1x6dxhnxihhobnxoq4r9c85sxaima07efns2up1aigl87diryvuy744xbhual1y5gh1t0hoai54gyqe0dpmanxqpm36v8iamq92t8nhldcnltfxdqwhz1bodvcs5xg07mtckaf5tcg3bjyt',
                redirect: 'vmdx77zbc53jcg16jlthqfcs107zwk2bt9a37zkc684o0o8q5gs1al5ihud8wj98cu09bqhwybsoyz79s740iw571u02bydz7px53b04lvji1oqt34qz7zzf6gl1gq265kj2gjmvjv39qzf6qwgzyg7u65gvol9bx7ad1gz5xvy6hgz0n8sgpksoihi4g0tsfmqpvehzie3epo78n9k0ud92vvg7w6bkbs5kqxxpiy4v7c6hq4sa4ntt1to9vnfh1q6jaf5po31h1x22ey481qwo9i7futq2cq294fapl0dozwab5hs1yakz1zzpadfj4zdgnlx2t8xb6zhmvyo67oylmh55ues9n7wzf9j4fnlgbdxbwku5gm9wpbeby4b53owddomjsh7ow47l5ki42exjt2spdjgikccbvcwjzjltucwxsxo3lwnmlt3gu793dma3sl5b4797tg1w6gg46ohd4klhu4me94nwy3usqbvqshfkb9vkskfv5w52gel9bwn03mt9fj0jqnkuxxm0pr1gc96ubwje8y2xfe0d6r0i8h049x7qq74j6ltk2wu1x78jzbg8liyq6y0jldt15e10uovtrb595spsnxrqthyrdomnqe60n1bdrg2fhvlxkbajr3ck898j1idjsghx2me71duhtb0x0aiy5q3k0o2tx6qpncozgy0y7cmph3cosq6yi3thtv817llsrlfuxfrjpp3xincac76e3ypre95288olgqbfhs6rn1mvlbtd1skexlsqk84tem20pssc96kv6s3h6mi1fyc597eg0ylcmpg6tatloprtycej6ecweomzm5cimujmwywtxpg29pcuirk8e83dkjxs64fb9717yoavavk39spn80k0l7wxehhlkgcin4ero1x1odc85c6e2vto6ogiayubjbz9h98ru50rw28lqz3x5npxe46wgn3xcu9805x7k9n412ozrza67fgbvj6wdyn27mpos89tpdgli7l9raaj1pb1n9qaytx4lym6xxsi2g2ggq5jfp64mno2v1oej0jlmn2oe6yewt7h25wszo471i70ctl9daiz89q85c14v39pptlj6y9luhd68v5cy0br2chtvxdbtarmm58vzv751ym8d5aj9f7svyz85u3ltywlqax0kxvlq67a3a4nwk9nra8huyta5el1tiak4utk28217zjhsab953gf7tga3vf771p22f72maa7goz9gbv8ismd1mlt2415yiz6cj1dehp8j7omvcem70cw9okmisgvefxogur2dkwixisey33l2kux8q17sylh4fq4td2fnegpq3eatalu34loky62kijmpn9anj9k8jxq0ma9dw68z5bem1j7yu57rgvdsfel83rdyk7luyg8lh1g3ywq61wasby67xftuio6rgve3ogbfrfwazqagaocgh8rqxxej724abv1vt9na5bqpv6ysayuts3tdktkq8vbx23m19ndtr83v49kjg119na2pu36st7vjieeb5lowy4az9f3yemik3kq5961m9m14csynbj6d9gq35b6cnwrf98adoajb1ffydb91be79pydtzk0940k1brv242tyk5nau1hnzlcjf8pu76f584qeyllgkdkzx0uk6eyz9lt1yfndotlf21cbumrgw2223qs7lcw2ys8x3bckrxagm1l0p78lvnyid581hn8giuqdwt6nzjbh688bxmiwwgbusfpfzsexyywxuyzixml40geb3ofle4egyg5cxgov4oke0oeshgchc2dtryf4ur7706jemw6uqtlfdq99ure8cqxnew9dxkr8azcza366qv60wps3br8lepizmt759v44vyjeu1h5x7ero91502tkg8ft2lrveoa9ymennlwwtfcs5mqcd5mc8l521ccdc2prciptm8devgyspjhun3rb0u60qkfybbkc8s40lo9cziu5ck78xzbfi0jaeoszk5895v5lb2czzreo4esxwnucrum81i894qgfo9ew9d0',
                expiredAccessToken: 4544424395,
                expiredRefreshToken: 8315914514,
                isRevoked: true,
                isMaster: 'true',
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'XXXX',
                name: 'as4r47hrctssqd3snta6nhkovzay2hwd0o3no8m9seaumomi9dr49ad9xtlmxdmexxv8mi77vxqx9m7g4fm9c194k187vijmmxefoc58r4xk8vfgexc2th7mrfujke097rvzbg96923ypo4eksi15fj3w5m5ups41kbja0ua6hg8t0j7354wy9p7o3hwvww0844xcgigz75rzek6vk7tdfl9jy1jl6cir7abn763sjuj0vvh72e0ut29woadpx8',
                secret: 'qgw9m9xmd86uqc9tdvxgrx97b3egoganerooo9u0zxilglzuh1hvn5230hn76sumcjucu6az8qho98titodi17ptw4',
                authUrl: 'u8a4p3ledc3iceccqlquw5k43qhycymnisb7692g7b1y9acb1k903yxdeopjgoa642n7opdo9z52ezeifs7rkfsygg109vrx48jgs7fv95onvf8k8hv8mndx0n40rqhpno6butucs1ljjgnl7dgu5ghk20qkm951v9j9x44ojyn93c5sd0smxgxjnfu8gkka73hnn7pnhy99pwjqydzs3mb6psm08qmlzgl7e8iv1ftb4bnwinuc5lx3zaudnscpn2nnvf9f8855oz5szhkxpi6kxwolqcht0jnzjykjtve5rtsi67s47qeysvjv5s8ngugt69tlp3ev7qfyvdh96c3ilphomipblnk3fjgqgp253e6g7ssplqykhpwd4dzeg8b5fu2q6gj8tnh1h7rkavxr17y7jlsss5r3s54qqxf8ugmwc15uh0ejjk6kcb8l707g12fjqtvj1h57tx3mkulf9x72anrhsr83dakzgy2vfckqpo29fuauohngc9ovobiyylsfx23qz7l5h7lbrlzxtfj8v28xkuuj15pnqnkg20plq2c6dy0gyko50d6id2zep9m8ysndyek51og5xyvgeoew0chvlhlbrxcivdfsqx15idyot76cf4izb3lo0dddsjl00hx17zfvi5ih2e9vyqtjrt2n3f3lhpglatj9113wcrqozjqkx0fgswh54olk4us8j1mrvh49nv82rzcnj5meq7104ob961dd1rxlwnmbxsiljm4nx6zjeq933okdrfap22ur6fbew2vd62aa2kkblte9bqyjdgunc9xw3qf82k8aycd67ren0kqjlrvw9ddzal9ghmgeiopw7zx5dewgsxubl33nsgaeujkplsi75z17ys7h8uxv2hx3fq11t4fug5do3wx2idx9zgozyed6bpx4mnle060e5cjljdc9e2cpyyh7wbugpgie4ia2oloens4c3q5alq75i9u7pjasmks7ujeys9gx3h080mbd3b3a1onxvecjp946oujjrztfz5be438fzw0fm5uregrn7v0pu94usyz30mv0gh2sbtmb57ctx0adt81oaatq5kmn3u7sowf2xebk37m0tukd4gve1xtyv214wdik84504yh0yry94q70m1chb642036vdwb3so1pmbrrqlt3rlwfu4oqzqwxmjcsnrs07pry2r9zxs32xqbqud2brf9rc8m14jwsw18rr4u9pez6mr2vx8f1xft8lwwm915t1vlrqimg2o9k8v75pdj30gkz7j9cou66aajdd9nhhknvgqip3jguu6jhegj98pph5tvmti2m9sdtz4fetdtley4i928kxe1024ngj56pabds0l7lqdvffouqh410tq7t8zrqkv9x3uncwnwh5hl03tynff3cfsr03q8jffxyjpjz3pyxsfqfsy7mz7svxktuyxsnpc1xzb6tf6w4492gru7s34lewlz0sbooyjvemi5ijpa4e43cbdkw07bb12g4xsy5yf6fd8l9fhvaxh7h60huv5vafio7ojp3e92caycl3ii498z8759n67zw4tcfxts094773q7ycoten2zglrwxsr2a9ru0byfv7ay6kwimpwysqv063zwbapzh6f7br3849xo481w852h74ztfv49ki8r9hcyvi21bv0us9mqnulkj27dqzxsu9czgqap23zy8cg2clg6kyvbhvizgu5axm45tegpurhnnusacgxflckajccdel5if1nowa485l6g8qt0pefvgka3o180qybuqrr85ge5buy8h4mva4kuy5zfs90hg2pliiqitzkz1kd1qagelhhggh7t7fhm5n7zws1xxan1ljz4p0ygnlj43x4aythnp78559vg83yqlfm0yt7yo9zdnqayyxicad8byz5ik2v3wzfqf3ed7dyk5b00mle0omi62k1crdkacecd001uutxtpm05lh7k9nqjnh2cah3tx039j9eq12skwhbzvczeib87e3ec3n3jnym5i8zi2whfzsjhxf05p',
                redirect: 'hlsv578ue4d24cumi9zqk0oqfiuohsucjkkq2wmu54scptrf2is7853pwbz6iyadxhvm92no1m5w94mlhnvbwvtqqy1o13jqf9b34dg6zv7snc4wzs60tgfme7byqdccws5abb0b2wbgghzntkmtda5xk4mdliphk1e1z2fdklgfhl6t8oh74ua3cehi82zhue00c7beb3mx0makrtavxlg14gb6azznur9r4yg716hes7w7ok8rswwj42cmro1nqf43cmpx38oktsyedi46u73ln175tyjsh6v5zey2qbq8xvpd1e81t2x30q1zfqzymbuqnbyo3aigzbplq0tkod5nfwozr4rjl4crzelhehydeob511deooglt36t9qxh9gxg0napj6rnakv3c27xpio0lo5xqta0d85flihk18wcg3uvq1a8utvahgindr2cp3bbmyo100kt05gzijc1p5p89hpg5dbuonbq4b3ntwxeknvvzk7fozwllchyq5mm0akag26dcqmje3dioy5qpai9kpsse0mna126nczh8flimk5l605w7fffuah5h3spjsitu029mblwm7kc26m0z0qirex3975nwmh4meofkzhuurrrwyiqf25bsea1xefpizemjwycy9u3cs1oyfow4rziwmo754e1x9fnyeg3jz4kgupqqe5e214c09s4dwedjn4r3nthppdmvizch5jmwuydo1rvtoy5z6m9o5henw5mcs3xfm7rj7zbz1jzebute75o3uez1ntozf07c4vea4aotqhitnciq3owyxkwqublgx4ia1u9baelxpkcvqoaqmjffmfmw41sc6sixcyozi9xno0vbtl4vm3vnp6woi6yfpjwcsgizhw57oyw9hic9saf0yz7s8zvys2g9c6a8czosfio12w56v4r61pzv61uf348cy62xxsf1e8u9w0mdwjv6pwhxryu5385wy60l9tu73er82jtldcpzpquj757d2lb3jg00ylp6in8uhg0mf0gdzgr2prahmjs7kas8zhso4ztwq7tz3rnfin7t0db2oz8jpge7ftbw5jne9mo5f62mnjqtqudz6tn8dxy7es2e5h28ilibei8rx9g8912qk25zzu5oxc16y7qdoenw7euiusxzocxotyvy3aj2ogzuw6y48hhg7mb72n9pcfrt473wwsp5d5qytchhpblyazjy23mhbclww1zjos0f83txr3v507wjqvjjxks1f0p4whxmeempzf31us6uobsmn1y1wdo6szbtigg3f504mrj8e8p7ipms2notyp5pkup4yc2d0bgh4s61lpkzuxrpl3f7fmdcsfgk2uof7nvsavt50ztel32xjvgs7zi3qp13ww32t3mwvo6l1terrtnnn9ivupcme839dadni3mfarf5e8jdpirlqq7jojn2ek2s0kooq7a5zf1dacbtopja38mbnqlccrpwmsv7qpx4ob8u1gcxncmiwp1njxiye3hay4ujo5t206h5rhosb7mwzan679ooelzqkd6203xwcl00l58uvo0ym3vazbo2u7b7e851hsp04a9883surk30mzm8qqaf9x4cpzs8rkacqu8zc3t7srsop83qxobx9zlz0m00g2ebtr64g0a4s62125yqv92tcb599ygz0pd1a2owf24277i5hd9upinfwuffrld596p4uswtj1gpgs1wgigzotnzmn1pardlfcpgx2ttjxyp5x23iint47t4losy0fw49rdumfe2zsu0z1n8gddodty1f3yiiof6em41k1gcufrcuswts43ypwq99jh9cmzo4xiwtp4em7cy8n71ln6d4fspticzoxuf3j05i0ggwwpwlswdw9ecs0e6ons9iylmx3kfqqzygts4j2g2cbkuz06zi9s10r1226hm748zsf3vpbzu1spd52p79svtwmbt9jmgwv1i7xw5cfm5s5wn1qcfods9wx1ctiwufu3pri9yiji6kqvbsa2tvv8hekzxmyd3bhuq54a5q4v',
                expiredAccessToken: 9830363489,
                expiredRefreshToken: 7816289097,
                isRevoked: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD');
            });
    });
    

    

    test(`/REST:POST o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'AUTHORIZATION_CODE',
                name: 'atr4o1kmc2w4e255s59um2y4eoa5qgm1b1cjizw70i3c96gnjgxosj8mwqjrl6b77f2pmfukxjgm41olooqlv0j98nhu71y1ammn3ukr0o1c8t6utj4wck5yxhnxl8pfo45g5usyeo7xfuuwkwd83vuvq9677imli2zqpynaswsceqhyqtx48taevljucthddgs72gr571nlcfiyjf9oseuh4mcfibv7rktcy8iicpw88fwqabx2jnpsu2zncwa',
                secret: '5qey5azbqlkpmm8gy9sqkdgsy5urdx8w2ks6v3dagrnm4dre4h3lnrcjpmcrqv4ysi2kxmqj64z5cb3ltspza9gir1',
                authUrl: 'njsrgvs0w070512ma8nhnpmbuton9llgtk5oh7yh0dag4we0d9x71triutizvoszlqk2vc49u4uubrmje2rly2m10abjsqpjz2cm4phm3g89clny8o9g8aljpv5wewdbky4lneaq9kxln3fk3af8oohczeiq48mly7z1qkybh6rq2y2hhivhrk8svqf0bal0rurg6rf9bt525pwt7g2rjloh2ylwoa6hiidqmrx4l2hbozpcmc9wiylzqawgcybo9dgczbqb5xrmi5gmm6qpmv4rc2ncvs9j3gxddmsh4v2edc67ayecef3g6fpxfd2uwvstkft7gf7sha9n71vy7z3eym0194eap15ctla4jxm7br94j2hd7wg5nqyj7oqee04zd3bplg5osyqa6l6o0v2wl86zydbvt4t537qlnvrre0sewqsywepvq3t9vd9jlbv6akn41sx0v8spjpywtwsklhjzmr7ie0tj5c1f7hkbk434vw91fs5csofjqnr2mim1fr0k7uzk0mnr8wdppqknlr0gbikm1x0w82znuod80rcy0mxrzfry5aomvenhuz17si685fum9sa5c8xipbpn3ibpqd13fazdxn8v7gb0uaa7iqr2m4yzzlhww9regqqy7wgvygje6mtwzyb6eenn8jxm8vc1j2xyftz21vr7rfy4g7rp8k3a032foguqw5vg0leyojlchlou7virf8231mn22pznfqmsr7pqdwd3f2bu4j8tj00vp4t2yx4z5xkvmvx3l5ka9h5q703fp2yinw2djwcqwdldypftt7y469qc7pjx5r1clps97nx2i57hgjeekht7ypuhtou447gvqvlwytenzmlx9x3rgvq7p6waemgdog4lrslzxydmu3hn24aet12wwuzdjte2f1drq9n1tos0cbjhkrqsvneetj4awnqjv5ikq9tnqfibvbrvicmwtjvykmytjsjr1knju3adv4l5kl52hbhwrldfnh1yvfq295txf7d0uvchy688bda5qby2iemhpgqw7ia6ihiiweg59y2fc4xrjq7tpgwgcokafn5r5si7hdbl44iyovit0ito9gob7xh64yj3sfjl9eewjsvw8yci665b9ckwyc71q4tynv4s8rwljw04eoya1mk5mjti6waaf0k9fni8r6ng7aj3zngfmbufml6pcis99spgmxrcoi383r2c4evt5h454iqc9ql3xa6dozdfir3xei80y6blem9vuuj4d514m366w41h3nvucsg5fud27sd7xl57tpbfz23hy2r9g4srcrrrue7tp599ufkzynu87qg0iy66wsd4m3t4p8cdctdhqy97822s7a7m2imzgigzvoyfxs6hcce75kthps0rlj7n8gubbvlkj8q209vq5dfh5853o8v9d6izbuk2fte4f3njh9swomzt2i8tn67459z8sr26p4tncz3ufsrmm99daowav6q42gqlotnmcnh19eeuhm8ecr577p97p6y3xah9vo5wyatvd326tbjo3owt5ww0q4pfk5amj0v5uoqm4en51rnrmrm5hzxqiafjj6emwutmro39lzdop9u5sd6rpj1ax19qvg5vwksjvbyu5set6ab1z3blulpuy77djv1tkhi0sc6wp7n9ojqjgco1drmn5jet4bj4001vjigr65pb2eleas2erverk1py8dy3iohsqwot6v1ec7ai42lwzwsdsgripg63wob8ihazmuz26lzfifj42lq0xb56fo7g5pa9yytjvzncfrq5s32g8wh1grdwcon8mfxb39y0y9ufiqf0zvv0vifewcqlh9hngchbvjy3vdu2igbwb7njvz1zrjmu7eyh9ztbgsvn4bn8tdxslr2i5e0ndvzp6ll35a3ts99a6u8zovikhud2iavejt44zo3vx5o3id3us8o6ymurbd5frjpr31w63576n3vgyt1oluatz1uiu4u5mf9umf8pkxqlcbbg34xoi0b40c6tmnvt2k4ozdiynsducw263r1f',
                redirect: 'etdz3f2109lxg9a4lz4628cw9qyhc2g7jh3b3hkrnrntv6k57dkc4zxftoqq7yxlu1h9snm63h2o02cwayi40paix5crkqb5syjvhubmdb6s6k0we762xx6064mixsxt1o1eje6g3wxx7h88c5e7fw132b8ktflt1mo9u2sukmos0zut85xppvqkt8vsc6znrxuhj3r1e9vpcxq73jsr6y7dsic9l5btnodn4xm4n0b2zgm3cwse8zpw522w707nmv0n1p89c6bg3oq2ilo8ypf2io6adzrmewsk4w6ij0rg3o3feze9v1qyjj1h2pi7y6v6g3wl2gwlfumqrg0fajyqm7p2bhl7q2r6nkt6922pjn6scm2zgvlq75zn8zi0j2dqiskykyk2074eekbwp8e7afz2lluouj8pkgc9uyaq9em6myav2cu9yk2cii58v0p6xorjtnz70ag47avc6ba7iy79jjz9re7lebo5gpnie936pdoz6fgkzpjjpohhkodkv1jv16ome34y0pvmw9xg14g0agtf2knswszgnyqkg4fnj1c72hzzxxeekw8pgj9c007trcdzfvpth1bt7nqze8ybe3w3ed164lfrrplgpnhavkak2m26pnez8oyqwpkjply8c2k3jl0h4t841pvap7ibatmqtucgirs1nuikxwuo3wbyxpd5gckxd9i6s0e3plwuiknje5yoib813oelq92ww5b4k30cw3zb8gb56uobld19w2v3dddvbhcc8uh378bfhzv8df525vsszk2k0qjh9zdvsexdifrj6gm7em8caecz2ijbuben34ato4z0eu7rv3acbkcf0ipt3gssd7pbpaenkz4zp9f2i3uen30syo9lkp7ydg7f3ncvyhyn5706m3d1zh5td8h4xt5op1sep7qkm7zqkyul7g92v7czpm5gh04mckh30nuc3d4bvehfz5c4vtrkcrghkkkuk77mqiw7t45eahsnzxvw0rxnts7tvl1orloi7x2m7sgex5z8cod9s4f3hi33haglrbnlx4bisp86hgqtrkcyw1cuwdheqhs6bcxtalo1bxwehxtb5rob9skh7m2l2pzmh7bm5026m1h4bmr9f8xbccj8keqhsweykp0ai1v7nm5o4b62ljpx136eegbwtmka5vg0tfotmssnlkdfdbkuaggq9xyhtlyogn6asl0bn2wa0p1rvi9r4w0mj5ov5x7coa2vse8ehk9zjllsrqwh9szqdmh4jsnmbnsvevrlqyihtvhw7tdqtke72txk7er6quda1lidgcd6vpcuauhtral4fzkr57kwqkgd9y3upkid10aww07038czyaev7xsjcwygde8ezqhznzstgekmbfgqlaya73drerbgalby2qnre63h4g5ejhqkce7rosazfke12f6qkht8ecai26px58gqycuybd7ajl06urpiozdqfonl3ofpc0j3fojycidpgds6s8t886r19vaelxe95sl8jya8mlb3w8n96ot06iufyecuf0zqhkw5bq5azobvledb35hu2v92xf5idcs3eerri5ixjhoj82qarjqn38bt8ibsx8tz37hwrplfx5sy4oxe3xnjnvyt9x9cfavaxzsoxyi8rc2ydno054fuvy2463nb6hzacy30c370t7q2qrqmblseqyricsbwdyal40pfoo4e4pvh0yqri64s4ck3sck29eyzxblqz0k4uf41tb1hp32ed3d7xwr0mehcweprlfohivx6jw1y46elfsujg8im0uqaug0n0jbhk0bwxe6gdzjz5sqd0oznjbfa2gg6xabd85dn38sb8iau09wut0e47sqjyprgtug92poj7pemwod88patar7jzcbppn9c9m44s80jgnmda4tb68jwbjg1g8rkig9s1wtl48zyfuk1maxc5sejunbz173rwq6j81fbjwewamqwxr1lfkke8nee5v8mrkv56ofzzwj3l0eqg8bcl0jy7h20noiabsdc7u99nj6yud68jpx2',
                expiredAccessToken: 7196310431,
                expiredRefreshToken: 1049366103,
                isRevoked: true,
                isMaster: false,
                applicationIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/clients/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients/paginate')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    offset: 0,
                    limit: 5
                }
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '41d3f9c7-7736-438e-836e-5bc6ebcca056'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '3539c36f-9b8b-4570-ab78-fa96ac8f5192'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/2065b029-e101-41cc-9a91-d99caa25ae1e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/3539c36f-9b8b-4570-ab78-fa96ac8f5192')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3539c36f-9b8b-4570-ab78-fa96ac8f5192'));
    });

    test(`/REST:GET o-auth/clients`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/clients')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/client - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: 'abf565cd-88ab-4f6d-9848-da0221e6daf1',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'ddd85z4va2nirncqnfmcw2jdy0dynltkho4h6fv89e9w77w4tl68vou4aganwqcq7nqu2was1in0u4toej23m7xfh63yqp1vhc06hshr4ni6wqqu7d2acaad2b3jbr669jq87sc57p20kb20iekfjxt2u2sblkcngloaboluiy1gn8ltai0stkzkz16edb1d4prkat5n6797r724m81aje09wt98lnw7y6878qi6p0sxd2xxp7tz2y1rzvfwas3',
                secret: '18pzh5am77hnukxqrlivytxcgj5mljwzgjozjvrh6xnizrageavvgwlgjhtq011sbgft3x0kd1pe5asgx3q714pl3d',
                authUrl: '4qktdtd0wfm9gpk392u9v72y15x10sw08178wty9u3cgx5e4n6p14vhixazm0w8aa18vapotj1alpg0nhq995se38an797ppaxi7n8yynehdfm9wfow9nn47sko3k07nrhbljskitq3fw22mq1gy98yzi0ftu6yrdoh0z5u9rbf7rkyq0lk5m5f1lk64oylgjcr5p9ux0tt4jdw2hqqjvs6weze2kmwi8mlgaresv8ogs3ri5xm1adp2ar1wqxz5zi3tnhzq1kliu1bgp4tqmz8rg2bwa4hzo59mkmy1lgjs6cjph94ynvz82y7y0ecn3p92f6pw4bae2y4r8xy6ld04lr1d1spi25kfok1aoku5ag1lmn9ha22bavv9mc2u8lgnz8maeoe9uhgtxijd53wp0se4pawx71jidzi52nlfk0erdbg3ebsymiiegm2611ztf3w6n0v0b9xyv5q0hgvri3uc72jc0dpddv2g1fbq6e9yewtzkiv0w7wvh2qazxc07b3p8ilj7q2sii9xr141ba6fivmgwo7gz8963sweiuhhnvbkghw4klxkk61oetn04jafe2rqf6pt4v78middjpp1awh0u24xknnxprabjve5m44c2oxborgypiuvpr8jb43n9ilekurc3yepq1spqio4gfnr9ckjnp7w9prui4lj8nx1sm2ey5p6wzdvwrysv3r5mr4yuc7psw1yb5hkcu0w4yvjkkmo7hkplyz0utiz95z8kltfq1mcv5td626wsquwjubbs95ba7md50cnqqmvglr3hbrnufvjodj40kribnvy4pumjab3t4mvn72hvgz75q313djd7vsxbaxcz4rhgk22rm5kyyddridy8dcpo68ru48ldbflhdio4p8ty4ef98jvcu69yr75578dhhf16glk6q58tpe2ri4xwjwailhsyaneutkrds09f6h1dm6p8x0g90emk3k8xrpy3lil7xc4whg78ox21cya21yntsincz2re3blqjnzmsfjlv20scd3eii8e0kugcrzlxpeo1p7k4m96rhpmidk3baf2q8tfj93n6mwpgadxvvqgu8dvjniwbhqc4qp1tu53ktgxv5m7o9wwzbox9j2en76emnao6ru4eeqxramsykhxlb6qmpn0qrs3usz6t0p5ooxxa8vhorz3bfqv2ufx6axy1f9r5vekpqid13zo0jmqhcfjkufsi8ncnfsy25af51gi5ybisjlacox6dxofc5a5ilenp7b0wfkkbfrzdfb8qkzf1berznomphb8teykqklmxi5ffjam0cqnnm92jt9l3eggw9fhj25lurbpvkf9rh96x63shldwnbuw5c1gu1q1ss1m0d3yqeqy5wubrmr75anhth9uvu9v72ll77vmyw4zesjzl0muxv3xuswsxcx105odvavjthsotde91b7q8nd6zmoj87fcduuw60cfcp6m6efp4qzr9hzuvxtreo7vggz20zblpyw72ep6kbowclam8go65ijlqsyusa6fb2juz6ucecuchrbkk6xobujik983hig6p16jzndgh92owmtyqda28xvxabf1mczu8dd3319bmt9omt8x3zysdzaoykwrg7pgn0fp3rnlrgdo14mjp82998fqye1naq15ll1ooniuuk7tnr7buokaas9001z0ga9d11cvyuve5se9zbvkl4vdhgrqnyfymera5i04m6d6mpqi4wdok9a06c6xp36xzbo66s71xfyq2me9x2pn11dtlkoztx8u09e5aoukp5amxrbfx0g5ibeqxw5sgoktqioq7eh93gx5ywnc7kxoy2844e0m6vib8x2zzss4yssstpwx8opafe658eacdh0wpiipfw3ojehomkp2s0spaut52si6i8dai80nlh7q0kdcc2oenliqr0pmp2bd506nngw3gve50nhc1elr9ud70gaxllyjka8t5ej6mito7ualwvdstqllu168janlixh7ob53uqk8nqs023fggq2nbvn448fny05',
                redirect: 'yhd4g4mjx388rf3ppb3fmv6kyki0ifvlg4k7ta3asg8i2u57acrpdltnxcq14qfrgzfeoue3pgoje5sy4f1pef6ulzp1qylcoai6dfboku95gen9tejm5l58zv0et9y19an17b66jnyjmp9ig42khy2558ye1hs3tc2p5hanasmd923xlsv3pyoiqv697lyfwt1td8usv7v809t14vgdgxo9br9mzkcyantua446sgp2xzxdiwhaig58xpte6jmdwa8y9cxs00m9zxz4iyogtbav210048incct16y3kumecjz0nnqbg2u6rgcl7nr2qrepqxjvlphsz9wpr0lsbi459n5kxobk7urc4fqier0d2185xa5tpaw2zrsgajp1lfmkvxw33aabgdvoegx45h0kgk01vcakvymas7e7hj9nw2hu660mjs4ftrnh1q76vagr21r6us8mfgxnz5xj2zht399pf2p5zqod09f6wewz6gemc6rp1qiatojlhkgcqvxxeoqacxowccvpxpujlamnm4xd1laqrjj6mm7yi74zrmagxi5pn5b7u1yirpskj8i3yrdmt1mpbd5fv5d6u9jbi1hnmb2lnj4o97qph6dnmu71ohxev3hz77lwmdbalab9bj7xm523caoajkwdaywss622w5ebpfb1eoxgq1767vk27zzu3kuagm3awvqvc2g76znll86h5yrr48h2j55ulbmubkgvx0vebjoijrt4no1ovpkpwi8wkk6gf3cheq1w5hat38d0n9e02l2o71d6j34f4nmo1xbo8pehsd9mnztsplnp05i5otx2efj6pqmcdz0re2y4p975sv6g4hh1zusegpowzft8s31wrnhfbnjpf7gygk3pf76e11xj1vza2orkfl85hmec9d6dckyrx6p32a919zldeg89k1y5ijz2513jdkulat6zmxtivkhyq9x6kardmjntkgr0c6vspzun4xbiz48mu1utd1nbhj4jje0l9mzhrz2lvuvunaqwflfpql54itlffrz4cwdkrifv1ijckfo3kt1mwuy3l4ukiw2ndae200gwizkkvbq9flpa0c1bnbsx95cchsyik68g6idcrv2gslu677gkcqy70lxh5av9895x583z30lhjfncydkhjogik6hhdy1a4eqhv9zyfq9ksqe622buikzemxmfhn4gjuijrvu0qcps2zhu7t2kzy72lfkqwm4jpdckmgi5qczqigutxpmyiqn2khwvv0tbohhadjie33leo3wvxbxc0btjctkap9otfqg0q0ry9ne0w5a4fr5xpkg3tukrtcj5siulz2ua4sq9jkls4zb3l1mq6pdnw4blojid8cl67m73z511f9owj3em3fb8yqkxseoacwihrs68d4qad91fjfu8s9lpl9os8o2it9et82p1jetrsrvj7o0f00sy8cuczwhrjnsqo9bqb1boq0io5gqcmqc9zwir3mhjl3e4es40lf35mjkfoh6w677guldlb9jftwxp3gfhorqahv843omc16elinaegk0b821bb5bz6crxqzlg1518blbjo0sbs79uziskdlzucdodo4c28irokc5sro5ka9qg27z57ajot5tnxiynraat0dpzm3cae2w0as9noluxfv0q05yt01dubbx2or0vfbs005rluqykjuyg5icbyxdcwwa051dlwq47suaw51tk8ddfn1g4a2qr1n6rp20bfqgfoq466vxir4fk2ogwqb1ysfjzwllpft0n6gx2bra9c4v967i5wpnwzjq4wzkhnuk01uhxpa2r4i3uzs1uqqdjkt9cvli7xm7o8sjizguaaya62ixdr8sx7pd8ejk7smx4yxbbesg4hm290eezkknhwjk3cxqymitot19vzst0nbqid6o3ykgt3ylnnlr8647ldv18x2o6zxyryy8cbd7nf20svvq5tyjzwwr9mb29n3ff5x97q3oh5shnysmlrqp3kwy1q37ly1v0tfn240fxs7qlhcb2q7jbkp64g',
                expiredAccessToken: 2076196922,
                expiredRefreshToken: 7927409604,
                isRevoked: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                grantType: 'PASSWORD',
                name: 'yvuv6qnn3qli6wjjypefcofwurmeq01ifjrq1kr950jubwi2cn87xhgmg8keyd1hzfdzkjys84etxlel7b06aakttgjuid7w60dle7485bvwy5pdum4i97il12conwlskqtl90k81ohtpt0t133gzhugfw8phph2czi3refyybrc7lsk6egh51te0a6z6vu1hf7nnsgvdig6wiiobb2foy4nkpnr27ie5bwothzztq05m4qd0beae1lx6a3qa8a',
                secret: '0zwfpds2t0fen8wgd6ez5yuvmdyh1py1g6hl7om9f706b15falkkngr4m059rggfgbetvmjl2cmcrjk50tt25z4t4s',
                authUrl: 'szvzvsepcsfspapvvur6t65r8tx1zyzk8ckuyfh7fgr0ute8az7izru29pgiuu5fkx9j2mq6wu4fyjspavme0ynpj5v9co4t2ydpj1qg0s864folylglx89ne1srwbof7lcnncsxf7ga4w4dviwjj06m130zi5iutijl78sbvh5syjn5qq33rrx2qr28mcvjp0sbx5bq0ozlafc767yihxgoxajez349suhyt1hfun7byyyrc06c2l2rgr4bn5pm07vjtlgfbi7hax3zct8yhswqm79le74cyzxw0lgbi94ngn06smirrfeobl78fy0zo9dn8vl78gn5wy0qmk70ugoifut3opddoccf5snip9kckz0mtx63hholaxd36mmydc7nl8rizocxqszffwgq61b9bnxazdfvum7pgpp9vqztrvzbvw1x3ylam1ngtlv11ob6gci4uxl3t2feila0lriu8f2g09vl0g7ahw6fg5ypehvf67mjtjxev8nvt0nmyj5gf0740xnee5sprfkjvaba9703jg08z4898kcn7tnwt9rx1q0rs8gh1el8co48s8dx7qvs8vht77a67yjm4idbixlg6w0kub4fajitcvbsr6rrsb8q2hyrk3ovwwrh3j7jcvjgcrrl7q7w0iggreecv7mdkfgpiwdg7pr0mdrztu8r4wc3st6twgz84rg0z189xrjftpkox8dkp8tnkjp8n2xhtdsqa0jrx8bon7kmuor1r4xv3f1iau01spnu8slgm9b18b5p2ek71aypxpj40cp1v62pk9cm10uk3ox65e97mwc2w1icu5oimiqbynei7cdlkt9y9vet72f2304k65zrafmvt154fdcezrna349bexo389cgv77wut6pe8r5b2e3hrdh7d1xpbsaol6a63vx6rvteuzgffjuy4aeqwx1cnh0ybh92mmrxwsf27hwpejja81tkx8n7pdad5h8gl6ol624y7bulh9h58ekaesxykdermbz9b2lkz3qbyemzinnakx9esw2tdsnisl46njne242hcs3qvpg24cu1kio747nyqw9tl5i6eectoaipr4fbpiwqaxkk4lkparh6po2rjxekhk2gkf219k6rlsu507sdlmi6bptdi6rifnopvam95cxhkpqplkp0toqr41lhboml1yleurqd4kzq1ihmqc1j7ixg1tfhd073em318aqfejf1890mnye46aeupl7z3onvetls431gxenfxtutpoa1dvprumbdss6vxvonxpgwrvqyf7qkbx0dwxzosg0h7mmkxnl734v6o1n5d28teutrudo6ye189q5ee2pyz5t2wuu54dw60usqho9mxd3kwa1nkv8zcp0y8l96ecwere96v06yjjlqfqogzgznhpdbadzxix0kb5uflyaq7y12gbldcqif0z3ppuaczr9h61eeym8dbexeqwd4xt5gvvfy7evo5lx74y5gf68yc8scu1toejjy3i79ep3aer1b7t8liadqvqbi4xa3gixbk6n7wnktlhm0k6df8mw008zdqrndg0qbd6mrn1o81k9g6h54fl17qh3erdg0xcby701ra1ecv7i4l6s7349we9e0hdx8c6yilx9ryys2q9rd8mwyot1kymxn614an80d9bu6f4fuzrl7ugo8rvxly369gg39w5gizg4285z45rnhhpsf9i36rvsffko71ytoygzmo7ijnzjapenpnfyk0qdue5fdkt0r6nsd51898mqs571d8u8e7ke1u3bryg5myjwgjbfbkycr6tiz32hr863dihp6f85isve1s2zwht00rkr62svruqvkff41vqq2asodcn5naoikv0duvh9qrrswa2s6a4qelkkdacfe8458jx1r9ck2hx20qqrywasrvphhbgd9emyv4ecr4ci443v92h3nlcqd4fzt1mb68sbv2osphcwg97ifgy68t1kssm0mif5f0ot5pihhicprbgp0mxu445a4jkx31ahuyoyw2v7v2ttxcq8cq0m',
                redirect: '7yv69uy8al6th95m0pii776cf58a0fd56nqiwuroc1qmo7l7vjbt3lyt7fw3hl1xfhdd5ll6d8ml7lu462jypqaf5h8vpx0erzxkjq1d7bwxnl34ysnww39w1tyl2wel5evlm2tghykihecewmcjmhx1rjb9l1m1bjtfe7jmfmdb8wgqbr1wd5zhbazr03ov58fh3f2rlukg00pv64d148mhn0dh129x8vp33d6yxkfuqvkonfdtuodb9f5epmoh7glvw6f5mjrrsn6b2xqng7lcuatxq1lqhzdp8t11x8l6awwtz46vwnx8oifwo3ru1it3xxky6fchq831rjd0brrubedoungt0e5hbzzm149rkk2agace16mm5n6gnzp1013ffa83bu4qiw1cmf8mknyakd9h04jlk1qeoow3c7i7x2yskdhfdo6dy3enxcxa724nfmbehtut5u0wkp5yt9o11wf1itxt0olav3kf15e3xqi4ivs977vvfo8e9smolbvh7ms24sda4v1602322wsc9f9w3gynfko7lvrb3yqnv3z74le1z3dqxdurvu7mbtra28clmwogopygar83g0rthe1mtug0tw5utizz4yst9gpdquaqc1jcwuruca9u5d7jbf24nm9gufed4new4prinlx90wz1wote9rmya98hjmclxayeaqev3qvnvq8lmb28z1b9w44hmiyvl73gihogsv5fp0gyjw4cvn8tq00wnpi1wcr741guuzz10zsbd455rjdwnr6lmosr2d8mrzw10fvlxfrujpkgch0cpg98ryft1ce92iyi45dikxsoxltkmd4j3ptco195laze5cyzm4vkc58bmi20nud2jfnsrybb84ofx8ckkzduftlusp1qkio8hgo23iiekn5qb72q6l94ntr786tl6gwmjml3f9wan6t4vu4nu0pjmuzde9rmu46zm1fj4jx77wtxx8ha653l15fqwsiqc4b09n42kdywbxa53d3pxbwdx7r5wuyyxbs4qz8ug5ps1atruuzs94siw4bki80j58q5q89qpulhfrc7vej8vhkpenislcujjxienl6recmh8q9bm0tm5e3h5frliud35gdmyk3aovv6erm2dhjlladjzp3bxm8gfzn1rx1m057s8m39nvvnufbbfvn5pevu89a13d1rtvq4ah85sitdw14i08f2t104hajeixbj8bgn4bbjzpiiplr3w5j484tu5vhd18sgqj99sc5nm99mxxaik7dentb4howkuk1g5bmpacz8j8h591j2wcfna9gbmrepu858y6ccifxbj4ytmbj2sxefpq1q4rgd2y5yuycnb4buk53qpp1ujgllggznstm58on0wsbm7a8jta7ry00hex9hifnhbnry6qheqhs7onxl0hyfo6nhb639twhskc9l25rlftwn8pni12ew0y37cp58k5clatsncbmb970dub853ldynpoui9hupo0bepejrnztbmqfo1zywn20ha8zx1bjvg2c05v6r5qrpyypn5y52q7j37t766uq5o2alt29w8x8p7efnj9x6dsvluzg6ahoxsm5e269izxobvm55fvjd4zatu8d1qkbc6xrjovcl9cejpmnl46o7gh6kuky9ess5svtkjo5zhk5bn3dr69m476qa7srxgnkdbfknfdvqf7laixomqvdbig45iygp61xyaewnewj5kwjjobj86tlqernz1qj1p8tvv3f5pzvtb1sc6gr6aeeqw9uxptvbvhnlnyqlznuck803q9js7renen9stqay4rs2zuxnfgu9s5zsvcj1moiemlikyaggtbba7411owdjyo1nh3zj3i2jqt7w3zo8knhdq4dqlez5p6w9ng8l1ukqbghwlbw3kq57yejb9u70w72eqya5iceplsjzhdvubjdc14ts6g1t8jku860d1ngmflne4ggefgiws8mpwgpw4njn19r8uwyhz72o0xwrq4mr71juo9wzwto4fje0pa9mncrbtjy5ieu',
                expiredAccessToken: 4730103732,
                expiredRefreshToken: 7866585037,
                isRevoked: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '3539c36f-9b8b-4570-ab78-fa96ac8f5192'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/a2ab1205-f4bf-40cc-84da-a5361fad1059')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/3539c36f-9b8b-4570-ab78-fa96ac8f5192')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL oAuthCreateClient - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL oAuthCreateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthCreateClientInput!)
                    {
                        oAuthCreateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'edb9e34f-dd2e-4c73-b7bf-7a79f066a18d',
                        grantType: 'PASSWORD',
                        name: '80e323tv6wcvqmx9ufzzcyll8o2729j4el6qlbryg92dl68sukckfk28oqzyyhm7g3t40rq9yspnwyfkg56te4rx2jfj06ztw1v5f06lcyghyxkobj7ea55wyurrjuuppkqckzut7b6wvt0xqmwifm7hvfyief6hlmnjtriuj6n8w9d704589qil4ftf3n25nnwmd3wti7429s9jcymgx4v4ufkaz4awnnvxxgqoidn1oc3b4zrq6z6dy68ybhn',
                        secret: 'st3du18xqkv2xqkx48hb9xj4f7w5ctaisk9gm62fmugkk1qly718zgrb02ygyiavmxkeyjs3r8u33alwmpzi15roif',
                        authUrl: 'uh4zrezpsi97qziwudwv4p72p0mmxbdvztgebn9hvov2e33ignvfwxfwea5sxcbtsdnpiivbws0fagz3yqsethowax1vdsmlrwhnn76dmmfhemx1gwaprixznf7ohe1bvgqwwcj6p2mveohcp53g0h82gxm8at4s70i1ey32wir2it9a5c6zvdqpetwadceyy2y2uiyjwd3j0umlkugp79c4n1o4x7kfkhkccmju9zrdkx172lbtntnwxktvu3whqio0ez6y01mjmxzk9w2h0znc28szwmiiexeoifqjauqjdk7mo1o14puyrrwa5k8pfzm7cinqqlvxauw2bmljmmxwpk6e5mbj1ae2cyk3j9h2xf56nol9c0e6swbo7tghm67iuytvknnw26uzvy1374e9krzdrgtk1dik06ebn8ol25amscasi4lcvlyrdeypskfl1gonz2w0s3rkermpvo3td9enfep7ca879hs75jub7izxf1ksgoxyg00vgonxvvvrr97qke1afh06054gpyovcdrurrnqi2yv1n0p66w4ez3bv0cii5w5iuaqfljb6xe96wnvxj19tqwkduuuciotw4yqaaha8gf5emnfssvz47qgo8cgyqx8gigbzayons1tbr077nyv0vvqz1zg6kgxcz93z6yywm0knc6pzi1vqzc5i3cgddwxm4a2g6fazpn6o8st3x6q1i8ntiaig3bigutelxgfe91mqxv1abvh1lfc06qpdaww3s5xxngcbngo3xpemjipj3ezqmuxnzk70bu1f9raev5au3f99522i5lrj0cse503se573e23fjivxkvwno2o3pnsolfy2fib1lmxinqhn6tadj5f9fg32wdjhpozu3dc5w0cv20qkn6e1oph5168couuhb5ns6enyehl7knu8towaty5lraj5hcnrgzwbiyxyt7kyvag0z69vcpnguzwwtiz2nwcagt36tleudh9eshkrczmosnkpabdmnpmhxgwde9ri830tsokerhptn4xbey32a0vxfxpk58cwksi750r7u88fyd4mt359z559qepb6owb6yxqxgi1a4en2wni9a96kb1vpwtggjfdg7e17y307c1zbbtbdboluu63xnthasgo27efkr2hveg2mb2ytqjnbe3urcsct7rb8sj1omae2d5ngsswwsgcp0pmrqw84zf9eb4isubrkjcc14c2kr8rxpsxfu4uy2ijci0nyukvfqe9rrl0j3dx12061b30np4qc30gh7pk20n1vxhqiqtd8k8uzfwnubu90plym49o5uo1mkdgsfidlztgmpce9say07dogi2v7iyhciaxntradk7l26qjgp9n1fa6ht5de13t18fgfssv14rguui19jfbr5sp9iavdgkw5o37ldwlwqfv57xyfeagblo3rwjwjh0n6pvzbxulbtc1ajx8qbhhxa0qyjtybcnmi5y4yx6rbdc82jnjx7iyrr7ud89pncw924zkhgluky0owremqkyx3sj5v87qdsy02eucb6mgm9shillv3v8n2nupbocg5znayorj4p8vm4jjrord8dt2cy1if3qzrjicydau95k92mzsox4cwsrlzzs1icb58zsr2arb9b29cvvn0auinca44p5fabzk8qk1mzteh1mftdeaaa14zt105v1aezyyd2gwtevs6zsrierm5ou24tyvn6uxg48tsoq8uovagghc32jvuppge2gjqz8vu5juhxqhu6oetv8641pmuql2vaf7ndjtufel9fifb6pp9ldurmcmz3bat877sg50kt34swlqn1wksl6mny4bexo8ugpz71ir07z1id1bopnq4ng08u7bl4oezse01jbmsjv6i5k09e5yvqfwl44cf1b18cqps6ep0x70l0b9f7jpozk5hfohfxw0zgukd4tbv3ou5qdvntelzdtje22b00h94lrnyr9wm5vkyqmwfe8ewoz3v3hb5nv0i5m8v3g7faf2oe0awuop02f5qfp0y4a7t7kuhkf',
                        redirect: 'ltg71xgnooj0z9iqgwaefuoiyn5236atgf1tt64y148gon9ok70uw1ov59dta5k6wxz49ssid5nb77kn7pjtlcwfzeshqcrwgzftuuhy8l4p34tvi84mtgf83gm0khgx6qx65gtm08fgpy798h1ppojss7pbionmeuptzec1p8hr24p9ca1tf2zqw6ffeqntd5a669blsnlevwxqm2nkyc10kcjw114mn2bm17ftnipz77lkho9zuyrfsjuvzgs3gs5mys8n7fhypznm9s3if1n9zd2ty44l58jfwofumrwm934mmbepmo1ag32xp809vkcubwpml6xf5egbivxx8juolewo0b1v1dlbmkovogfo5l56er684xv762cbmnu6bujb4xk1c3uiql2vazolxnh74lvgcnow67j4nfobk5tl3jsf4v1r0fx4ktc2i0qd26rdv6g6wbx371mqu73zqu92638ygb35auadxuipuql7xh877w6774q737lxq7ck9tut23eti2435ayeynqj4mtx9tfmmt3jv6wtgdns8qs3i0rkjddxww7vq9w4hll2nonv246ks2ib2ci9f3yuci477rbnsnfob7saynzhvanyghn8647jlyscjvhmji6p99kb631n9brax6v6y4ltzjf47oekz0erhfom3c6t18dqb7h8h7qwx5nzvbt3k9p54zrab4ujsn7g65z8ib5qsaxi1n97tg16g4ashwnrqbo2t1xm2uq8d8sknb4fyhgfi43b02x1mtjhb0boj6zqmjt70hkz8ydn5fe018px9x12vhs3y4701u811r722gjzc5ryis09znpnhz167jyp35nyxckd1f6m3qr2h9nb7aaxgp9ngv2l7d3qgz4crgkijoyxg4xkqor1cy6k3nl375verbdk4ptxdt0ysaxx56jedzg9bf2srm0m539khnrlrtmnvua11j3ku8et1pqfb0d4anv3252trqu1wo6dzejkgubzhl6dcm95tcb6npc6woxmo4l4w82tdrgo1iboumgiewd00kn0575yzayaaf1z2urdas34tzd5qtzxd21ptf5vl9e8eoonwjx01oqnxvkzgygkhv9434y788vt6685rklcnepjjlariqa560xperdzaxffkl4khv6pdi6es6m8lxosnibxkzcqhe3r3ttd2jol8mrbxgv4aoyn4fzdg7fkhe0cy4en1cipnf2l51rq2408oi6is1fhcz83lfn5j2w8zqi7oram6d0acuh8p1yih874i9fdql3pduxc07zj37z9bx9pq8ipsqdscwlw6nl51w3du04q6hym0f28muy8nm4rjbi68mlujvzakofoh52a6hespdbtoyzweisb2j5j4mdt2dhyz0zs85aumqyz1zei5f6kcruktfiszqf0pcbioh1vxg2flf3i14913f09bpvq1bgg23ap3a2tqlkdiz2rzlq1cuj655gfje5tsp98k3jzjqydno3nj29kipp3mwk44n20azuuubkk3q93vkyg98y1xxfmi7gcinj1xoene4xpdjkt9lihmwsspbwllnkr2l80gl8ooiy66l6aq8ylwbmif6r2l2bqvyjlanq0la2qgeig3ujskfg11yrfdzcoiphhyl0c244d4l91spqo4xl7eqvawewyg1122rgewkks3x97s3kyhhypz6qjorpqwbclei2xv97dfyy3212n5v8sivjc3pof3tud9hyftmkqsrljewckng9q3x9zrtlu8l5t6kzbfy87r6n2m004dvqjjwny3az06xcl8vvtf35lyb8w8v6cmxlki8hke100xtqteu5w62lr5yc2begcq1vm6l6xb8se2ssrwzg5av2nebas4r4fask6dinu8apjj5bwq1prvpekwk5us0omou2nvhg4n688hren6mic7nu1upn1ourirb00c9pk38wq458o9sw1o6agpmpyw4anhw2cctm9ht1awtntjsc55oth0ax3ub0qks7ei6dw57c8bi9rpr1hottg',
                        expiredAccessToken: 4777621215,
                        expiredRefreshToken: 9555577258,
                        isRevoked: false,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', 'edb9e34f-dd2e-4c73-b7bf-7a79f066a18d');
            });
    });

    test(`/GraphQL oAuthPaginateClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateClients (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        offset: 0,
                        limit: 5
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthPaginateClients.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateClients.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '71a2aa4c-b4f2-4027-afc8-71040a8d9699'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindClient (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: 
                {
                    query: 
                    {
                        where: 
                        {
                            id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('3539c36f-9b8b-4570-ab78-fa96ac8f5192');
            });
    });

    test(`/GraphQL oAuthFindClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9e7a1a0b-d760-4c5a-a352-86288556af1f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('3539c36f-9b8b-4570-ab78-fa96ac8f5192');
            });
    });

    test(`/GraphQL oAuthGetClients`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetClients (query:$query)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetClients.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateClient - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e84ac251-bd41-4add-8426-c8c24f78ea5d',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: '4oohn3y8eouclq8gg8ek08mj48jl35jfvjt466eop80wqn25h26grynsn3zomaq60ohiew336w5sxuoukh00e7thk3qo3wmt9w060h47q1lqa3q29c44c4bfkd2x3kgjxvphk1981x5gu4g514zyj4bd6g2cp7twsajo9knnap1oct1hivcp8w2kz9354qm3g21uklg6wm0pksackxbj81dy0wgu00bqabm4w5x0pouf6l40bv2u64njq1ugqsv',
                        secret: 'fsyrldgg2vthqssve5w3zofy7udzvdjn650ccnpg2a563iqlkrsyxt2j9wg9lbtggj421z1g4kpcarvcmajusx1g1l',
                        authUrl: 'opqw6r5hug1nxndr3rm609qf8110naxyk1bpy3u7vedx57cf2h5cpdkfhr9hrockq9472zfwmz3r7j40djnh6fje3ph55rfxxm4nva8j7zeecjzu561lwax06fksfm794rpgu5hhnk8qeggewliuozdd9lcalez21r0gpikbdbfdsglc1gjhcslaqul2328dv3mnahtxqkebqmcctxvnbpivvc5kmc458bmbqzsemtg399x2v4f7fr1cx1q3xoq62up83o9vswzlxa9xz5g21rvvm9bv0ajjj6f3tmj45378grz19zc7idevgdj71at9h3tlxxin0rahyryhuizpr4489uwrpmoiqxsjhzk2eng1xs1267ogudmbrtnjyn7bjzm7c1dp61h5f2dn03vffpy5e5rr9t72imz884vd35i2nz62sb7hrrmeq1jaf2w2hg3x3bel2lsxshlbz7h2887fl7o8uzmm3viv9m38l4i5snmg5i008mkv80rygvn8j8m3agi0kiowi44ui8mtx5b6ot6t6iiso7gk0yq53cuvgnreaor5sukb5kglah2wxdda1cxxd3g5k4h0w8a3s18hdsgrbwppn0e6tu3gz30exya3toiu5y5t74ydcpwritqlphfrmlu5btnk6v1bsa6t5jc9kn41lscxdtfczi5ou688mw9na9rec8asvgxnz10414qd371bo26h1hfre36g5fiobnl3zemftz687a9bx8d8eowh7nic48iau6up1vigvuw7lhls4jctxdbjr6ybtypk84z74toh6uwzik50qc6lw8r8wfctzj52swjgrixf8em9lqcq72utunshrz7l0rhkfazfbyd7801rr0ru9852wjbrssu0aacz1uxz9tj36dkfozjqoz2i9e302hlpyg5hq55dpmq5xbm4vxhex8zf6l2sokbmou5i41d5cnycpd8akz7o0znb7lxytqlbdx2mrkid5w1w8g6n7kt9mequq65w8nd6vg0vraj7ef1sojzkxciv234zxc9daufo85lnqtmbab20a8zy4hvtng7a2iazlwkelznfqvobufsy50mp6aelj62px1jyqrdwf47qunbd878hc88hn39g170lmqppei3esnhf5cnmrko6vdhdod86wa5r6not3p4f8k6dzp3s7a2ja6tbay0uchfhzsiho2826ihxv5sf4014gfe2a37a0o34fx8c76gbfoqh0s47qq0p8rkfj282yfjo7icidqyrdsyp0n9ap4fawr7i7mtwyzt4mpvjb2zkd1gw4bppjtnwtnw6pj8ojzqzrwisrnm2dht2orapd6hn8n7op07vwqvppozg6qai6eg5hq7qb6nat8zl1zmsccn1tqe17t5byxyu7xlpjb9pz1bubj0lc8otyshfmeeedybotxoyqlg42o5uvb7pi4qxvldrh4vm269q02itofgywpg23x1oq7563xhap3xqqelx8s90wf7f0736fjanwa0ouqyys8u39ii6hgrlomf2aemqe90jps5r0ww2mat6n1dwl9k6viksnexmtq1s885kv3xqd0kl5a4e57jlal62b0abzhpov2ftlum365pl9c2a0lkmhmziy4048aqj9sxhp1rw7nn90ydc2m5jjgzfo9ybmje4wb58ki1khhc2chdzq8w3v3ch5r2kd9p4lt3efvhhekygytqvedivrofkymppcalgqcy3j928uy38ignk170iphgdl8yb6mqej0w1v6is9qcziikjk5pou4pmvdw8rr6hajatc170b6xpmpvquwwuehqzw12pmf6z1f2aci4vwo8oterybicims4f3sj1713qs56wgx14gaudcxobotqlqpt95vt8defz34zj1j826pfukme3yain7xvbnh2jsg4uubwhfpt7wv11udukwyyizv7temfgwdo57zfgqdk5y2ne2bdit0ctb22ira3z1iohx6ykiqup2udhl64w3yvvx8f2h1g2vkgo3rq3k7x8dikynesit30f',
                        redirect: '8tygeo6pl2neqkq7pofww6o7qxiig3zfbktq6jb6cq13cayeqrb9nv4ldkkovfxqq2t5lmffobvcixvd3mb76xk4ldiauzedse33mcuz6ho633o5pgsmrbgw8dv72i4vp91ccsiql4d806955f8rdvw4ep8fp5ilg9l058vmu4mbwjt8gyfukkrhia6qdtgqa8pvc06hc98xepjp6c0xagwh70bt1akyclinsmhf1eros12jwq73qlw4xirr7xda1g1ghxkj6l1llnbxovvf35xrcvupf4ae4klou2lur3yj3kiqq422222rqj4420h5zq2ykg7q625jpysxoeyvifdxzehehn98apxtoabdzsmm5vahxuh1edxn7t9ycm8g7sxe6s3o0so9kczxsycqpj74ykgjqfemvgsqnef5sq7jlumagqy2u3x2l56l3d5ljuxpflfzrw3i3gcsvgdpvb15r8xhg7f7ibzz51l1spm1j6ev482xxrkwd0be0a2y3ja60cfazqn9fsokjt7iey1iv5s81bihp4r4s07i3ldfxvh2zzannbgakixgr0herrwsy2km6emej7pg4hesqybwtxrwvkcfju4anbcuhkdfh96nreh68gx2f5h7gee8hkm5s0e5p3ehv0eatbxsma0m35r67o5zicpk1gvh3zh4oq96fcpijb97uss4pd542di19lx14bcnwjsu7knqmolnwbqwi9gejblbmt3jmq4f6p7saqvec66d77cvi5fzkih5p35xkhzto0bj02npok0m55i3smkkjvcrsqvyjicxvxa49kg81pff38tkic1qcmceswtkh9ri5jo1l1h6lugpt7ca22r28lbiv739s1agy9mpk4qvmoeq6fv0t5s6sa83qvhsm9s9xoe6sa9y5gl5jwh6drfdtwnsd1ay3bnfjfxbz21k8wewohgmsl956q4xzyu7c6ih49x5f3kvbsjih1w2feyojeu3c46kj9bb450kjal7hup0d6usmtt5jfzbr520vcroo2vfdtr33hcosnuzkyj5n6z5w2t7sshwfz3d68lepea0yspav1a2lidi84dp2j0ioyhjwmpd97hyllbovhd5ex64m0fqd7923xzc2jcb5v7nrcr4jlzh2o2c6rgu4n3plehb9qd9le7hq9odg8w8d4o3kmpima4okpviey6dv5xgq52g57g69h3ps14g8o32moosyr8ao80gwwd3074d9y2fvoiqdeegu0oka9s8efof3o98qraczhtikickwifjxpb4prqhq8pjzpzu1fm0ulmf7nrg6tbdxtn6j43sxtinmrrmdhpued8cgnsx91cwtf3729ohxxwefrmm2lny4mv6g2k57bjsqlwomg3g52wco0xs69ssa86jbb5dbux8dlbnheog0fixii16zcqnrwsh2yufkkumymiq1ezwi40c2idcya70bx5v5x3p5hjtq0dbeue98jmj6cd9aqudb148au69ve4jr1e1prdj9rj3lpuxsis3tryrnm9f3qvike812jht02yeeuefb8x0uxy44h4ev4no567wdodi9bacu539vvex38465xpdyn1i5rggnhzi8niy3rbu13vlgofug4dndzu547x0slotvylegzzewjb7jq2snfe2q60znvnfkb7011p2rppeubxcp2b34rgsmen2yapn1oiv5e2j52bsfolt1wkbqf8by4erk9am9bxy14qle1926vfb7do2wrcbglmn62tcm95n3ua6m2h790326c8dhuyk6jlr42x1qlx2q7ezsym0mubcdn4lyv1tdbiobeqqygyvwyn28qi6fa2asqf0aa37rvmyay04ely4j9sizkcaqjeuiijhv9aoq9m2n1wccdsgx0wyr003gdfe47fdq9xxrb5bqa45girxy6zjbyicr5eta0lqyfmlq9ftu9f21k0dl6efx7wh3o03jkzkzwhh8g0z9lc42urex3ws4xaucex7xnp4k6zyoglej5igxl3xb1qpjoj5755b',
                        expiredAccessToken: 6970024201,
                        expiredRefreshToken: 6338042949,
                        isRevoked: false,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthUpdateClient`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:OAuthUpdateClientInput!)
                    {
                        oAuthUpdateClient (payload:$payload)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: '7jrg5w6e6r1jiti9zax0bqurjb3faelocs7pcfbmi2toggjtf8rzxrasg0yujmssgzcx2vmwtwzsour7s48d7ow45utmwjadpd7h4hoezvey1bcit4olf4fv5mfcl9blox1cg4nk8u143dgjs95cgvgqjans3c5gdf149z71a21i0o53h9jp359zx9pgyek09fbn7g9wmqbg2e1f496xzhid8mn05ipsik35xaecc1x9mi1euovj5zaqg3r99iy',
                        secret: '108ufnx90he2tfclmnctnljcdh36y2s5667z70h2ulztl2aj4u77lsxivn9ppwh151grla2121ro28fke5cw9y40ee',
                        authUrl: 'ilzrj6iu6pnwg8wi84sfh6f0rql6vxbhwjxqksgbp10yjr1fbbv8lq2vl56klvwma1wstko2hztxj3jd783c7ybxad5l9ile2zad39pdachbk5tzsk694lc4skqcghak5m86n9wrwwaa50vmdcteq8bjqdy38hsfbc38u4vbeguhn6mkagdf77pcsx3cnyjstsvdt9v9wx16804dnr3wx3r887vd6jl31l3fs68p5esi16xyzki6e6eiof7iy9ci4by7iwbm8mu8xd84ubmnqsm2uv3rd3jncazs0smfqz40vp18858zf4abm4qjqmq8klsedh7uqsqto31l6zsf0gierswtvfui9w132xmfqwjqspghim8suijy01d1qgdaahuu4mralf1nfi29bz836rfvy8tlq6fm4eusj1essr9525b7wt4sl610jnixk86ho5hajqb0u5yn7ifa73r84vdrliggqiqyev4b85d0qjkgz5jneo0rq2smm1wn468gr2b9zwykackbiopjjt1vjoiyn0nf15c71gqz3bmr65fmd96lqw4j5b1jax2nq8kmors6zcspr85ngnx4pgmydh26e4jra2v84s6s0yaeo15nwymmtanoqoq51m5qgazhjypahi0no032ae4rzp943qfykr5vphcbuaz4zqzngmilh31xy13huwk5z9acy7jcoc1q4215uwovye4hxwzypcdr2g39h1jfl3jvpigwq0dw02qbgnug7dfz2nda1dj50s4htpc4oxl0qu18pg1woehwwy9xbqibpx3pwb7j783u8wbvl8xm71mzbrs6hz3pdswp59aw0u214ky82kum2is9mw997hx2c4qhzeekom78kxrb96a45i2v3nwj2b4vzt3gggzdehvpszj3odvyeor53af9of45n84di5waj9x7k9j06tmvgjz8grb4ytwyk001qntc1ussbw8c074txhvacn1pkf7uyttlpy8y2ni3itwrlpfyd2dhz6glxzhypwo7hmkoiu6dvqooq5ojsbecsk7isfe6jp7215ftzl44tr0wbykmv758q2c5e5t7pm8t20aw2qowukkff6pxivm6kc4m5imt5kjvh72zz9px00wraotukba0eclxv7cnplhmtihnm7ve1pii89e6krcc31z3dz7rvgm7m3h5h4wxgnl8bnmov841ru38bmkbwj50z4p97sd0ii1xfq4qlelav3cb9fxg7sm66mjxqqtevzp8yer3lzin2z5p47d2eri4p35cz230rq3imughruinira58lriz8s2gw42jy0ypajcjhctfi66clr1dhae6jggeha6dwjgj1ymc1oad0ciseyk9leexcvwx5fn74ah96obd6r7aza6jcup60sobxpoze0n8tywrslj2igmyz0vibae8bcz82ybqe4oh3l65at9w05v0b9n8n4kvufp6uxm06n9ify0badwjgvq98mqi01f177mlx4674qm3sml0g1610lgehxcyu5evoiomi7bvp1v6vm7usf7u6r6bvlg4qm2ecmvov77c7jzvs2ov91niwzi9wqu40dydrvhlj16j0oj5pfp2zmz7gg1zezad06qjd6fldbeaecuhitf2z8bipg6hfxd4nou2sxchpg7nezm8x4qwg0vfyy1m23tuo2p1i07nxz2o9wv07px4dkbk2egklqn22axm6isxiwcbc90ey1mrlxql31mrcha1hkq2rs6dip3r1muyqthrtrak3arnjuyd94mctfn95jxy0si41d7nh8p1ta8m79rbrxvmld0uhmil3blmkci3d5apwt5zajzlbx4j17r87m2fzr49nw2u0nynm42s795fh6ks1lc1o9qks9guyp5g121hw26erid64ygqf4su22edgciev5e3n0yhpg39p8kt1xtr9tvqs1rogxzztkpxcmto96znr8rs1oxelirjly6mc7mebx0htl5rn2op2o9exe2l0thbaf2f7k1fqmk3xhyjxaqibdqxfpf6mnw',
                        redirect: 'w6tppbrsyf2lvxezm77pd8hos39kaak1qwtx2xtu2fmk0dgok9jlftmco7bljeum82mpc28o5e17zio210z1304d37qnjc93xq8vijiqsrtut9uu15vu0g8ed7im2ww04rmxm7dth6elst2m35ibaq3okaxs1e9he67k2b4g86av9zyo69yh5ccprk7ot5u7cdlbb52n8f7z00l1akyyeqf41tgyjsesqqld0sx0f1lfj8jb20u4qqlsn34o1dqs0dklb9k2dqozcxhbuqnl8bctr1iiljl9oh33cwgk3h9qi396cpwv5lxwoe1a8hnokgl41l5e5isp4qhxfja93eiejyz1b16zcogp43itpnea54dvhzsruynswcms6agi2dseqwhb10pfrwb8qs3otmecw2l09l17tdo54utfpoc5dlkr80dlgbdsdvu94nco99l9cw58vp2b4rd1pamqnqcjqggxfql7qlw8jygprydggz0dlw17heyxhr8talt336jpbnovuidv2fe9tp6hc0bqvocdjfg62l97j5o2spife43yo8jnakthy90uv0x8phvfkuis36n9fx7gcn28fde8s7xpzadeyss3vj8mjeby0cdgejp19l3pz5k2rilend97bjej1pjq3f3jmyygl8gr3fvnnhql02h9j3ktd6dhywu21w7z9lhd8zsrn0htf6x7z9spnb3xdmuq9nie0cjmr8x3b12nzvoqmbjhy8207fash7l43wvaw56j7z19at2b82uyoct8u168wdjvsaok7xcflzjr2kwvbjsfvhlqmlxix3ukcw7e6w14hkl4xdswumwv8zq4bu2m9fmifuawro2t748znvfwur7lpnltc5xsv07yxxbszuw6btlovmphychad0hmyp8qg1z705sh4j2jm399bxv5t93t7er085wkr38z3odla6smbfnojivs487baafh88vrig4d5459ncnnxvai7ie9lq0lt5rkdqfrp5r6asec6vd4ghdzr3y646hgpw2836go6aszdl95t5vbp3ffjovet8g1f6zn2pur71ecdz7xa3ctfxeki07aszloxh2eix4xl4bg5rsqls4wdgufk4lau1h19kmkpo83ddnwwoymyb3hcq3e4eaqlkjlqg5tbr3aytc1r9jjp9e952rvh2d7tsuele3aokmm39knfpdmailuu5c7tmkzu9u67bln3293fmxbokb7llwht7o83put0xgdknsyt48ngptit1w7m0bx9a5lsj5w8ucicgg5dls8c9l85jb8ple9g2yl5stqwfcmk7pq47pteuwgira6nur3fn86dkcrdo3rn8e99vd4k1y3ritpmhzxyjgqoosdv084tgacfidaf6veio0bgggtgk5iwki9eeex4qxfwliqwmkagoy11z4qze22eict3tm1tqyt81kt4gi4c7qgmujirnizu0ofb9vo6tjuc9pbbz1eph81x6brfz03w6mcz8hwtf5jftzmb5ejueknmslapgn720nqkuylj8m2wb3lrjh76qt8hs6beubz4iwb5v247k3i61kyfrkhpljhftascrzq57fmizr73bwn9f07xvsonpwxy230g11hhysw4l7la1iqj56blv5mu73oj7cw3ey99s54cut70rtm1t8u2z5kbxe16ohasgrag3u5ojgbgjjfw91x5r7o3alxryvjn8l6evdbeepfzlhyje8rlwkemm1myumbhqlwi7qmrmv4u9uaaaach4z8jtmlhbtozy3aamd7rzkjy2nzpcqx93gpq4rch7j7t26xm3wr1d1arv95dfpogrjgda1fyzrrwis3mxhpiwya8u7lm2bj8lyod7tom731ogzfmx0wy25em0wc8m1ib31i69d4b4jy130vhdzr88gdc48f86xk0kr7f0vx7nfgq73hd26xcz65upbluo22etvnmeaivmxa8idmy2vejc7oniiy6u02hc9exlp1dr1eunegnbfex7dowdpfmwrmx3sksf2q9iske6v1',
                        expiredAccessToken: 8222080487,
                        expiredRefreshToken: 3079993150,
                        isRevoked: false,
                        isMaster: false,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('3539c36f-9b8b-4570-ab78-fa96ac8f5192');
            });
    });

    test(`/GraphQL oAuthDeleteClientById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '08acb53f-cd5b-4080-b781-682f3945b481'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteClientById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteClientById (id:$id)
                        {   
                            id
                            grantType
                            name
                            secret
                            authUrl
                            redirect
                            expiredAccessToken
                            expiredRefreshToken
                            isRevoked
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '3539c36f-9b8b-4570-ab78-fa96ac8f5192'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('3539c36f-9b8b-4570-ab78-fa96ac8f5192');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});