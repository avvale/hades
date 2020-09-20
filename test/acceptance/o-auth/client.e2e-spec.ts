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
                grantType: 'CLIENT_CREDENTIALS',
                name: 'uy5y9bzxt9hbv33lsj5qzsjzjwqy6whu21351oyn8trqnky9ixalmbkinqna8i1j0fcnds13qed2k12san81rcujie1af66744vkwwgafpq2t3e3s45o05bpq334trzvcfzkofattrgvodi10se8i6ad7kjnjj12wu7enz68ku3g5l08l98teqv67fhw3zzsxmi6swt09tswca0r8pg65gma9q0n6j0z8be3mjee0v3am81dd6avqlm4iotj9mr',
                secret: 'wajzm5mupku31yete7uuvwbu1ejg3h0skqopkx5z7f2pejdxl4i2jnqtx27g41lj2zdio6vud50s8tyrpasirhknln',
                authUrl: '17obxqwczd7zmlg3tjpdcrkn6uv4wqb6vkhq95uvycp91xubxnl2ekl8ckle9i8k2d8ef2d65rptb3wwgla0pc0u6b6d05hez7vjxx58syf67i4owhedr793xvkltib0vlrnc4nmbw7hydlrafhuddtz3ew5mui6mzs2ek8nguts7kzu6wl0xkr25s9yo1u7z2mzq19mxz00amy72gk463xbfm4rrhc567zm1h9dp6ae0y99acrnjcgvyjnuwk2e113swk897ltimwd7l4nfryxhzeudfvekt2he61x5tomb0bhjytzcw71674dst9kt2nfqegw9ttbu97utcgbldo6ygwqjwobgecxyld7ct90rjtc2e7p430s7fiwuu8ucb8mjryzysmjbx2o2dk81k98qvjg0du1pwijhh4fmimpla28xh6s0qo3gqkhlvg1a1tr1bofkglr9vfjy8tiez4ycuk7ct9rtl8m03adfqgdw9x3q902evakq0z8przzhqqexmfmxn95eekdtshru2iw0ncmi6dpu2be91kiau86sj845n70izud4ver8saa0gwot6aan9u02gtup1766ehyjcf89g6fgyf6uive5eej8chmllqjpwgv0bqpa4rctzcwh3lexs0qfs8n8aozalmzllq4l1z9h7ty5ifbnm7b03baaafgerf07yip6x27dl0699d2il74y4twh8x4jhyvlr5jmxl8jfcizde39wukutrral02mmu2ypstr20qynb5qgt0ywlb6yzqptqv9n2h3lwcxt5zvzhk6zyrqbws4ta05rciichqcwkcr1ymb79qijk681ejbq5bqltatieds6po4o8eiiekzkte9qdrgmvpu3op2t7n7bmiwyeez9r0d7xdu07ygag967lexqedvgq1mo4w9bafabctrk9nzwy8trab9qgn8l568ou3jd1osskk6l2u269mvxa2z735xy7i4dbrewz9748fmwn11j3tn1340h9bcs7dkkwxwao2ktkdhg8cv8jj4p6wnx5s141rtnmctxp65vkib29a2z4fgyfp93c4t5j0935rx6ogvuv26cpirm94ifynqtb3lxrfldf5jni5fcjdhup76e64j18v16ljp36yvhber9cf9vpzax55xd9oklvfx5hvss4m59z3kxvd2e42di9pglf52pwg7u4mm32uk5dhfw1g7mj40uvdnyzrw3vg6ovw26jaejlsw08sm2cydhqxkebu5v44n839okwpp4vrvfua080orujprokm0074a3jehw709t7vf6axk7to111avnxsmrv8hnqxmdc4gwn3o3mfu7511paigy6mnweznc12frtibcft40nog9lzohlx66j0g4xx63unwo9yaixkbsnt1qhhexpzczmsvy1bqerctxpz454yiqlvayr5737ucr9mdx5naboyvto05j4g9gcu4io73qbstcszu4ygarmgn8p5c0o0s907g0asqft5iytzuwq80wvzotls7c8g74xoa2zsrmfl221kp0micc2u8duz6pe33cke0do46hxxcpdzaagpqrq93mftjzp2fqc8pykluiwm88ue2firm8jgin2k7gtd26b7vfv0friw9gjbyj5kimumerjjyo2j0p8q3twv9qiasc087bdgbrfysspm16r6k11t0vmc6ck2o7h37r366y1l6fvzlv7nowynqxbfr6hx5sp6i0yko7uq0j9ukrxdgtcikkq4kfu0fbnktdqwiediwbf4rhko38m1vu6x9ou9m0419xctwoxip6lvoxj6ij6g9a2104cvv4wwhynrz8duafg76dpqlsb1v4m998jncgv5t6qe5u278hmkg58a21279fggqsjntxvdv5fjj02m94j2htlhcx9wk42okxj7kb44zco8ec3dbblobs1nv2h7fe2thoj16w9cb6afa7vgdd6r4690au7yjitv3epxz4ofg4hb2jl056fs8xn7oq2c3fwsopc6bm82qytd6br2nu212dtqf',
                redirect: 'ha6kko5m1twxphdiz52hgo58m3mjy7chlxds2st4mcoj2d1honr627xgjxtwsw3weq0lt9mjhx3tlcvkn2f7bifwjtz6128qu7wk2kloc0wqrad7bd0lhe2qnqlil3qqd4e05111zywkpihojztwyfgp9j8u4y5lktgpnqocoy5nfancbzwowxd3jaiphu9095t2zav72r5jl46eh4w7qpf2caxdodrz07e6unyla97vfepam2yi7kwvxxd7c8yph45ny6f1k2txmb8xi55qayt580iq8j3c469jhwr3hvozrrnnewllkphe6rw84a57el0z819xv81x6umbujbygl1iyr7i14hmxz74sk18h916zikw7e2sef1g2p0rx5yb2pdb4o8o7auq1kq8xdi9e2momaeaz9540azxnsmktd07x6a7f0q4soa0uaw93664x7hw1n8lfxgot00bo8jf2rxghdj2c6lpc5un2z75gzvx6jqa2swl1797cu5305vzm059k5ibphnwys5xfvyu0jm2xrkl5ygozqsrnfa5sauy1hot9nuute5hl8dr7dc778cz2lwaiz54uj56kngnsm1j6yxl2cpj62qnwhq1ky9vaf4iiwef3czbcea4doxnmwshshs28k6jwf6zjzcy39bbsc40o3k3f09lfe5kja6i7fq5e7zhd21rxulymycckx5x9ys6a90ijv7rdqade02rbc5s8l12ar9zkrlwilqkkse5unx4c1z98zgdno1w9vudvxe5c074ep2846vvtiw0si1j1waf4wdrczw3o724xpb7ae98yc87by88rrp5bpsihe8l0j1oulcrgkdfk0f86di4yqq29ui196aus4ctvvdre5ud1455apk5st2vh16x35tnyyaahnw63lv8qztymrdymuchh188n8cpeeg18tccyp45u41en7ylzc4adty43rvs87ho2qry3fy9aftz2el9n28tqatt7o25j7yl6gwg6srthug629em743la4bbjagq6jyt5zsf99nbibfz4o0yzdy0s8x5ds6ajvnra0rvvhpy2k1391jbepuq2tlz81leagn8qpr93q7wjwhl9ybxddiauuyoomun4c2b3n7cn738lfwt1w2tmaaycokrdotnakv6e35ig945c91ic61fp51pf2a3hscalob2ls82skmzp00mif6756bi9e65j8528qge51h5debidrq6vhhbr2zkit1xka9jz7jlekhtnr9ijc1zxnojtacj6zbv1zn2zjfoqf8dxm5b7ii5s9rjoy3etkkw00hbz1wp36pjbsrudsac3tcnll4uacdnysv6i8cxgtchmkclsjqt8qddhbg49k1pics58pylhpjjtil2brd0acbajx57g8t50ga43kayn6f5n71655y40we2prklkxhd9gar0p43ueb6zdoztiph4yl1v1fj9nw8x6qfobue3dtqpovg7pdnedmk0gdffoha2ghgb78hgbuodf4l3hrlsdpcqyp1yx46votp7puvh7fb4frk9jhjeps1fucbnbxlahz0npg35bppetw54dfxc9xij9ueboflmd7p5q5tu18etieflluxhwsmz3v9o7xlzlgd4r94mi8tortghxn72trdvzdo8glrvhlomt8676dwe2iybfl12wumotg6web9wlgx31q016f2sm442jq7t7thfqgj4cxtjnq37gav4iz29zg7fkaxdk5lcch50aru75i0dycmpdv6cjr4q6bxf3g17yeu86ls9loa7td9uyro7tp7vdomzxj4rdi5qw16b3m49efohopwph6i5uavyso0dqfoemthoxzrpows2s0n5ewr5bcanps4rnupo8qd5k4k6njs5w42g7msy80slrp7tj5knwmdbn4l3zwz4jxa5jhflfndtsn5s1stvnlkuywmv91h3hdmqu29gl41gbc57l9leu2iah06ilv4yc5dvr2oh6g9yr5iejqfe8owlh9luorbt2iaby9a70zdbr7jdluk',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 4264419583,
                expiredRefreshToken: 2216132081,
                isRevoked: true,
                isMaster: false,
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
                name: 'zl1ihg4167etgj6fw64wxv0lgxqh53uiq9cpononccdwytsod5nu63y36gz7dr4yryizrn9wjs3149b3dzuonwr21eu9d4dsjzj0dx6nuu0crw3zf597cxky4dfdnlqvml5rijcj72ftqimvvlksyfcatnllovpf5vyt53opa01x2lrytarqzj3xdug9n6israf69g93qqbo25a21wyacwmvdzroax5jj7oy3771k7y7qyrrgzcmdvjq5hq3jdr',
                secret: '24u791dnrwjfzwzi6wvf6p80mzj7cu6b3oqcpfrsbezzb5kjas8khw3253417lqh2qvum1m1ytf0sbrzew2lt9v96j',
                authUrl: '4mmznbb6w073irlbdgrgzexcl0ghegchxyhzttqqmapo7yla5va5p4x021p4byepxoqyfd0kw23x935j69r5t0intfiy166nhwwlyehrikzzxhnm6afpuqwb1vl6cu3gnqp7pt1fj33cmueiwhdk88xc2jtg6friam9pj1975jqvnif7uptvwbqmcdp4zlmbth40a0q11puf5vqwc3yrzxmgw8n9y3461vkgkfvnfwkx3i8g376ddu3pk4zoa2m51g70uyrsqogdpa31l6rpk9hmw89hzzv297gc14uil09m8sxbyqy3kcwn6l67usepauqwy8xxd31e25oheen7bqghaq2wpkkzuf118ksg5y5o6ifkig9ycogv83tw9mfj98htgk89pa8dcit00twm5jqnrzclmjqgwd561fpvl7720ud5t86o5pivdsbjfzmzg9wo2eb1t98qcx653sbbgdihgct70quaol2m59br9pzdvus2ip8miy4cl0f4z7fmdt81bsymfyl82glviqk27i3zceqliwwxl4h243y4t49smzdozyvbgfmipmjj4u1ccjrne0qym9cnm8rgvd3h3rfm5pgsqfnne2q1yxxtecnizmcgapsf5nhuv5l5hjhe4ofqvjjf8pu2s9ytpegfnkw5hya7s0kvb6rm3rrnh2xrn0pgzg8yjhpy85k2zenh5oihq9gaa0qgyljazaon2ddn7m71tzglq2furoflgwr3qprdpwzx4no92nj6786os2md1a012rfrj64ifhqjfygof68m8maiezhm2gsjh9hp74dxzbqfrmxplb34gzeswri58leq6nspo0qr0s24i3yii3l214redtalohfdd2kpnvtzqh7d2zom520jkyp7h64q4o2tui3y29e0f45nybtznqoz17g53bnbncgxnf4ztluwrnxpjvsxsxaj50bp44vupom3gnv81i4yg2edxvoixb9j8adu9cx063h93rrekkcobbs30fu97mf7ahd5620btj5mfglzpeg2tn342fpf515mqtnof21g580m9d2kw99uy93n9la81w95og7sdble9vfrxl2hy98e06z9loiuybzwmkixfjwpo2s5vwdos8tbxmaf9s4biyjb7chcawyw0udfho1d0clmttmcezkmph31hi07nyh271c7cca2d05pwnjlxzvqlyhhsmzont2x1x9b32gqsty8el4eanzj5nbi75y9af5fvm94uzh9tukwt21oueb0vr4tt77nq8ym269qceo4jffj7gztua42hkes0farkjgaaosqvj98pgays1zsqjd1zl5p7fmuejhjjofmsf3pgl5us255etwl4ymefdxar8s9k2tbfehinb7he6d5e5v0vhttdeyx2r8y0tjs9okrofr7dmt0ykvlgc4zbyi0z25k0bt0h42wkkb51xdvupwrvqjjm6mxx2oqtd3nk4jocwn11dai14er0cyt3xgu89gd9p7gig2i4ycpgfonmx2kpdiyx8y99syv4qj78hyqvw80yjfehwcp9d866hxh87395zzc947hs188yqhehvqe8c98p4h1x0yb8k65w4xu8pfnwihlixaays0psjwydt7ub2y3d2zfxbysuhf11gqfl87j6wtx0t4417qfc98y3g1r7dj5cc43300fhimlaeaolemon9ys69341sjies13h2b4lercoo4qtokbhm0i51vjgd0du9v09zw8jz4o23y13c3h2msnor3ak91zcuhjmowiapcvuerwoc2foh048c7cjk0ehl94l99n9i6icq02q87qniwluoij60iicafwi1so68yv9ezcf5u2v0waqe6yaaz0zqa5z4qx69dbisr9k6zd6q5r5o42ius2g58zebcnj5zcjk2yon72g171kflgbhc2dinoirszl4z2564fh4bqclhm4d33eq556k8q96y90tikte633decm3v3wvgg9yi3tw1d7cikb33e8h7kxeo82oafnt0zpf2w4gxc98p7ndys',
                redirect: 'u0cbu5057ntr4wgchs54cd41oi2l00j2flj0ue3y8fbc3r4f2e6nlntaolnk4it3qdmyto4i4163mhr4bgl9jj5lme8dwsy8l2l3qrfr60vf4u3l0vfpzg7ra8302dxevhdvz44rxk54vbxzdgxeclevwukuce2gbt7mfiyluiw3f5svvpwljoph7op00qfvnvs3mbt24uq7mab5xpcw04pkcy2rnj3034sth64dajm08b0uw46aa9a4kzsmen0efshdpthg09sr2q456raf0dksjnlxr8h6ignou8vnvtxnfi9c1dxtd06bvg22w6aku2q6tj1irytai8bdpi01w5pn1z1c6nkqeufedokeac2ofkv3m1n5w39v93pr8pd2k8tosalb4ybywo5mc83xk97vx12i55gpf7jh6ttxrojkrq1v8ybyuc8lrq4e517dseh9ra28n4sicw4avq62veghaalnvjzudzvertnbwcgodziz1w4c8snzmeyd4p6vyzuudble1cn1qo3sdlq8t9pby94egu69wm7bhgfz0t8ucq96xj3hb5idof4o7bm8ohfvu9wbwh8izxze9byz5odl68nofhdi9w446h3ohsi8wjgzp5fgwloozqdx01v6b1iae2tq1ovxn5lsdqctxi06n7hglq63ewyvg7qblaxc67cjl8hiokl8bs6m6p0ukynjdhbuppk393hiw65d7kvm96c00gqndqx4dlam21541ztxicfzmbly2fkwa0pqetllxbnu5f25x44vsnfy7jc44wk4detxieydthknn2km61jcfw143rbaauif877tkj6f2twzh7ekb1w7je089wj50ti142jmve2dq9ac0f8y6elwbi39clesu49s6knfv3ge8hbfj5o10rqredfsa2y4je2ht3i7wn6qnm55k2cy9w8613cxunth5keqnhr52a0b7a87zyquuwa0caprf3e1jh7p1weavnrfbuyjt4ujjkoodr24dia9z9drtzseaccms9rukxnp1o6g2i8513t0t8oowwypft0k603jsrqjs09mqwqg19mjf0pxcdy0i4m5xalfll4b47drv53o4xw0eex3rzmoydqiwb526bfhedm197lq4nv5nzht4d064dxuhee516qblmfukarybfzqd49x5xrpspnw8b8yeqnrtnvw58ol5t8i93x2hcev2jqyrjeakfexeapktqdhgimwt8wc243pialrh47ygvxoszpm4zz4qkkvri6g2qgnhgh5u937ojalya1gcvc7eyrk2ahjh8puqnks9izyknd0sfibkmhko0a8qbcc0smwkkgj2jmlyhg12b0rjmfl52r72bq5hkn69funlzl0ngnnm42ryyns26rzxsrixm0se85w9h22rbdmdmuib5z5me01r3ygrb2t9pyikoyqbsoulgv00jpsh29ivvb4flgvoh32nu8d6vtjejhodzxxrmqt8pmha1mlwfx6iexwm2mwgrrlytwpt5h5xq6m1j8h7hyp7rfhggl6cel0g2ba9pkbgxuisi4n26ny2g3l183xmfa2xajjz66dqc74kuf0v7d9dtmjk5fscs0y0tq8gkv89putjqehdg1xxcgswvneepyplctcsocczfdcznx1rszcbou0lxubbqo3a0bcdyx4wxe4elw49qecs8cgcyamus5cohlnrzvux07cqmm976o60rg8r6rfm2fefo689n2fb090fwena5abh8renkitjaoj09fslroutqti7f9jaz0jvyuky1vxa8shlgnbwbqanakxeek8g5uoy7zws43u0gt6lmd31vza5ido0cot2o12oj4b7jrzp4yr7akx7udvhlrapzafoh3nxt16c6cty01mvb0045ar7f4fdmqch657p9susudqmqbvhug2mpmc3zmzg0j37p29hussfqa83b7xkaclgapvgwbub7vi1vj3pitu1ha9szksgc5abaebkkbv1ho8p1qk5197kd55dw8j7m5pblez4cq5h1um',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 8957265173,
                expiredRefreshToken: 5698151653,
                isRevoked: false,
                isMaster: true,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: null,
                name: '7yi5am71c3f90n9aku9o8y05y8ew5j2qf2ksl25r85pkwavpci1es1ofwha9w7nl27c8er1skolcbaphurd8mthl79idbeusxjin1jpf9eh3v0pxyd9146k9al9jppsm5xwhmnqvau5kyukluj4pc3p7vwcw4h2qtxemvaj99ss55kstzyy7xb4p9qpcx616x8omydbqwk2u1c4peo7zz6fuxnfnpv69ttsy414nfc5nykaqfssfl6f2ul7rjfd',
                secret: 'l7luzhx1w9z3tgtz0lqwm7x823kc8zx5fdu804qn2z26nj26evuy4pcd6mksh2wz2816ey2uy7f558h00wvmf84hrd',
                authUrl: 'w76n55ynweksyvfck9dapwy799cgne9h92h27l34z4p0vnfsgopew72ga5ml8ls3m5ktc5lunzgfusd20rbk56e7tjzfd0mk7yyylzk28bou5l6r89zwyy7u2y476oeaczs7rlfjptqkocagtrnxdixp9twfdkwnk2ujbwcvlomhj4smg86bpz3whcmywu2yxmwz4x0pxlf7l8w0azuhvhepscm96ocp9ls7ve5u8b21vg20l9iyjdfialtkdtr4vy6es6my7nwaweevb460mn5qs7i9rputnuokdctcf4omeirjxauh711mxguds7viw7oaefteg0xj62rq0oqk279h6g0wctssskgdxzdg0g3kerie0ue1z3oehq24mzuaxzm0ohj6h4sm3aj8kjqr1ji3ew33exvemmt8vv0p3bhuwtkiqyj16fvjhr4ooce9oycrw6ufyypsfdz7fhe917kfhw6wo50qh62xkoah0rf6xx5nnzvcj0f786zqpr8b5n7e7w1imux8j5o903pcmnsuasx7qx7nbl7hignkapbpm2s53juvfxvuvn4j9rhpxjx8w90hxosmcxuhwtn4qpye5x8tzqvpg3nvwdne0zhvweh7a8tyvi17tla0rrn8dnglutya2zn3z5g1uy4q0tsdtvua6y9pliyk0t0glykduoxj2hscu4wmp1tqmyw5iw29e7nw95gt0dis9fp87eo9vr36yoi68vft0vf9u8llgqt4uan1datk02ybf8jugtqc6tzmu3hp2fcqbinrn1fiaczy0vxnqwxj1ox51fhmz9q46gvdo7945bx8ysp9gg4jlj4a6q1vzjjnk0nyvk9gq7xygqu6g7txbwiak0pvtgkd4bq5zampm1mwhes68hypy0duz8icwijpacvitagmf0fwaxriz6c0uvhh28s6ic1lkwgihfh2geg82fxzwmi03xgt7sdpe8nb8l1vppe05hg58xk1aanuggqa4huleql6eyj86auu5uw5y3r38mtdqb6ir51kz1jjypady8o0g0fwyf703rsvvvbnpyufof7sn8x4otjvml6k6wuf8r1iwgd9jtpkairktqssq2zrs3gnh1y2qzw42k4mww462jabuckl9sldcxe2a2vus35qd1lzhywr9hvr1eq1ug33unj2d7ele6uxfknwd6fv1qva5bh9j44idr37qehil5y9o57xltp29fgl2jimtthn65m84n4ytmq1hjx7es4nk6sullfqb6v02tj99eir5oo026waaqzipt7dxkhvvlywk7thl2172l23mw54efgt5afes7wmz74ajmiviy3vyuts6774u7uo1avxodc3xdupz5bmzhvnws7x8knde2x0h3o5nnany4yot64w3gzzkdtkimuhtvq7x67rkqjy93h61hcle0tytpvgpffgnui8976ml5jq2wlpl2l6e8kgotgxad84b6y5oaq6iq0ednff3jx0elo85njz2y2pf99v4f3oixfvdrlqadgbudfrtlfv803ji39ur9143y5ovf31s3w7f3xq8f87wo3jhptmmr5s5akm9jxps5r96l562xvvc5g1xa28o8mofjptdwh4l0iby8qnwyb57hxgm6iv7b9dya2rargg36czxhl8vpuszobu9cavjt1f0ehbt5wka05gpctditalxa8q9yftfiukdtqqschbzjxojr6d3qquwt7snx174ngnoa1jjs44fbo742y4nf5riku7z048ii7qfmxu6xaf2put6c0j3tsrffmxou3a4jjtfrrw0fzwmcjma67rvz67yxmrjnyw067543nse7bhj2rhjx4r9cn9y817rm3tfiky895fekya0p8o20liox6blka8ta230cd7birkaehycldl0d57da0fjvfbbdrspdntyf1hurnpxzi8osx5eype94g0au5g04sab3od0it1w40go2eth3denc895wc4ytbqz1xdl7rqqubnc7v2vws5ljjazzsqs02qlqchuy68envzn5mp',
                redirect: '2gx1ar0ewx88rg4wj6fsr0cmu8vowcrpubuh94jqjuw5l4yhw64e2c71mc7z9tqxj5vxa1nh14f2eyeza1hl30t70fsy410v6wre9ksavib0fivhtgwkcqyyzlywepqm2lpv8pnla90ao11ch3kt2v7kfe3t7qpuef6tydaxi9gkwxzbb7zkjvnqfz2zgu1ksy86xfqec2qjtf2jb3zub3p12v5stzcnd8wpxvm36q8vv8fj58ihf51w171qs0zox3e7pmj8d9hrhydf4ayvc2skuhqtjhdtd1sj309ibp1mcsckef08ulw3lckaewkr4e6zudprvakr59qo2p526dtggnankqilxqft576stch5cs1t316x95grs85lrfawhpwwgd1z0cq17dfi73bw7r4v7spexwgla7z8rx68dv2u6zn4dop7xxxsqdd71hbovyqjtxtlnv0vg446v32hjwjlxwdx2sq28989co0y19ji08fni65e839ixckyw58yk6zbb1enqm9y6fujqg78xvopdh23mipgofog3mknaxwjbow5brjd8h7uaw4gr8fn8z6wtwq7fdwwnrqvvvybdcpebnfs5iqgbfofc8p3esgabyc0u58ifg8f6coutuyhyqp0mpq8t0no2zxzbvftyq6esfxg9ml54nxlprqekt16zxc45bzg3gmutuhiz5r5h1fohhajpx1e1a85qxv60p9pavve48uwmandlc452rgwgkrjv5k1p0c0dv9ijlsjh14gboso6b9yymhzf1mafopn2rt1hatj29rwmwcl8c1ja74kx6fmim5ke29b52qeazf9y2slfp016ppx5hudsy3dktiqvtbp4h0o4hqrlyk39g6kaq2mfes41y578d40chvgjel9d9y1a6gvadxkebohyia3h075btzn64thtylvke4hca6u2xpwmobqxlspldnr4sn8ti13z291capjlb68p0g8xxkp79tiu68hl09j8vx6o1jbyvbv4u36fc2w7vo4nb8urqm0ggxqelfvsvow3qs2togztzfc8arptf25q0d1lcgd7x266vnycx141r5p68xsxjj394826rd25d0xqxwcv94ary4ojh4bw9pukqcsg0e7ginewj6fn9imoh5i04et8drv445salf4nljlirdatohuh6izug3wuqqfs366d6oq6z52235t8qgd8jt50s2kluypusqu84vbzq208uwk3i99fza4xigp6qlkqp83bwguioar2v3kp99qnnk3q7u5q4meux9qvye37qyo8iphnpobr5vjwxr5o5v2v3fh8jk2gayo4ni6tu7gxai7rguo10bnwcjeigkyu8ollj7s8xtrpwyd7c4y94q9k8ab9uuniudof8bjncimbtp4n1ubi713uu0gavkom8p11lzdywyzov8mx6iiopnnt803e5r32ngkfpnit665q2vihbot907msfirfan55r9z889sinr0593xzjmoh3davs4kxr6wb9ce3syh2d7d25cubql5pubgx9umxilfstt5cfntnl87uhqz9w529lwpogy8719ni53kewk7beh3lul5toobuckal5rzg6ydfygsut2kjjw5xtoe5866edibi9tb38af7b4y78a3zyliki1aztqw6nhga7zzta2surmvdhqeye79j7btwbkc6knak84otx39r0gr53l1tf8p232cjknicetbeqlqfy5guaxjwi97etwfol8tgnmg242ohl451cmziizbufqlms5qbnrbsfxapk8ee687ibmpa85rrr29r3vh8w1o0ia47wjc3ngahqiasbi07x8kr5y723lprqr5w9bi5oy7fiybuesvltwvidpe6xbr4q91hu7ot1ncfily51cu1annzwvhym5j7g1kbqktemddthe3djdt0tf781atzlw3pht36e9angyi9z80ubdnrrpbr9ddod0fc4k5q1leza20kaa7r55ekop8ybfj2nfpsam38v1w9s14yywwewbieq5v83pz',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 2947810868,
                expiredRefreshToken: 7105135930,
                isRevoked: true,
                isMaster: true,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                
                name: 'yt0e4xy4ohuckz0z8cmvcd4w46r02bu6eiknw6pya7596eomr6hb87lso56w96o9qo79f4b5eek9u1q3pqhcl38dkt5hmuzelcdx7mel7p6wh1feyncovkypbeyjdqtzujk7fi0n5jzspslmjmthbnlr0igbseaoo9b7obq2mwh8k02f1ttaqxave7vzpx2ew5zaw8ywozu013mlcmy6msbrqbeqsvg6t2pqeframrpo4u30vi8vkxyru8i1pzl',
                secret: 'vdcxe6qt0l01izmg56uo5ba04iiax16hm8sdx1f0wc32uv1zdm2nm1db0w0olc70t21le3fyo7zf0vql1a95usb1ue',
                authUrl: 'fowx51256f83h683g347fomt93msowck5202ld5moviypr43nx3gyglnp23waok2k5e86gasob5h0olg7pvok2h0p6w88gnaesboi1g9tpwj3kyq793gyx3b137h5jmfa5nuw9taxd4urg4d19zlkcz96h5qfxtgsvnlszz7irmpurp2igxnr93g9s8uuegazdlxcgnnfrorjpgyk6lvv9po2xpb1li0d6elimff83hsqviji6ja5fhl02fevbckao9rkotemey7qeocy20wuicsi0bjr7vogzl82mt7gu3bso5nhy6lcqz4jlno937t4yp5fh5kbo5pt7ywgtot9e8fwntdzhqa8ec8cdlm34depnamlskid4cz2oa0mqx5r2orpk2rybso15jhto0jdh92wdmqsgwmocl3b3t5oxy9jthaawakwqp96mzh1hck0fp5nidwvo8sjchf3j5rniym5mct51tigg3qwqmf11ueoc9psf1afuhytfzu4ka8x01uix3wms4u4cg6xcqqakvpp5rk78hz1xack703w1rp63dsfgqegb4hlznwup8gc1yoxi3vq53jovuqtfw1m3avjs8iratznrvy2q2mganfo0yxu7h35muo6tcu3r36vtd3en4hmo9reixd1ftoa8h45qfvlfgpn34rh1ui1wj7hao066immzx9jhxnazoo845vzswp5ik2xnb0ab1krf1y5nto584vtj7zgr84vzsyyhaw8oa5d7arsfrv2736iuvmboy2k1sddoenpeyaiyb764yvypcor0rylbv6dze3yviw1xfiegogif4ldh4251hde1bcxdf8keueiyzsi4xt6af88wzzsapxnnhvm40zn7owptfwpz5qxdjldy7c6epwufjyda4cclu4qvk4tm8tqpsjri35vks2u33jvjwqgu17t8t7jcm6cxwaafvabkf1sg6w0eeq8zjrgusxxji7z12brou8xlchd8z9jr9njt5u51ujnqmxkcu0zqux85q2sk54lup3ft6ag6h7ls11vyg39lwco4vtjvr2sd0dcgoj8k8k91va3qdbxjp87sbc0i3jw091vr57qijbw4e586dysievdix7jxs5kg0nas71awkza3ixqfll5sy4rqq5u04o3lbmi7exzelrhc3b7af2usq0y9vwcogr2bkgrcmojnbgwc79hj9qk4y7l6iuqi37doqkj6l8omeowau7j0cym782xxk56wumoz2ggyp69fqxbfgy9nccw4rq4kctsj5v9cgr9oymnnclseku2zqmol59g1y4z3ypgz6l4ake0hap8wz0prdxfz0c83g9518oxnud47jc25k3rjpnbn8omuxnxw190u1lk4qojtll404bgqnv1806pt3ogqky1rscnc7ntdme3cincp744ho0cz6fib60as30i7bif7gtrnt38eolqbrpf97jf5zf3qjegp29zms3kwanl3889xb4s3r23x5ua2s3ey8l1rma14gkq5b8wwfpwjabc9n4nebps2m2kjzwgotzr8x8tvazeg3xw0hmkkqffvq7uzii2ujbckxmdyxc6klvjksana9tfzsbsyyqvz2a5f3qa24sunn2w3sl294avrxbrxdfksrpe5akglabquxocsl496ouzrcpnb5uytdkj2psiod0vps87s46qmuvz17zxxn1lxolsyhmwl0pxcclr8e54y4vfwth0w6g4voir2y93h8p87x8pfhjacidqshl6h781o1i2peq5wki52dkfd7an1klydmy6onbnc7lwje0tuttkxtajvm246ylrolcxxzcpe7x3yr0v94coui4ze01a0okadvxgi6mcbw4ug1qdwtvrk7pav77eu3brygfa3m5vwt3pd9oaxda6j06fqj6qfk5mhsdzdgzahdmgdhfkwxpiwag4goba3hx0twi428px66h3njiccmp0twrvt0afmrt4l808xnhwz5g4xszu4fmhbncpsumco44zsu0ol6z7n876zrc8qzxhn0g',
                redirect: '99hrjm33lt3pmfgin2ol7ajmo73zvm1w3dxk01sst45erhuzxlrtw4chofl6fqjnckqe7kmwiuwhf51mpt507qp057ivf5iudh46rvzmj47cgcwt4gurhhnjywqnbd8zam5mksv1s09rn2dyad2jlingtsyuca9n3fxnen9yspewx7txuch59bq3zl6g3xjt87q4x6k5yaeqmz3a0h7xrxbdlr5ra40dm6za8b0pph1kqru5jbdoc7vl1gqmxeu6kpqnpjohfk8aqgfpdh30h3bqx64grk0l3776n1kgjykmm7jlie7yqsyan20mqs7t4wozklmiusfc0ocft6dklb6pooqion7g2qmtvaksbv88zfmvxnvsgxlnzp4sv22rinqnc5vdfo2zqn6stps73gu0wlh4wlh31bb4rh4ydod825n4ba6h493n33sr0srrr5vxn22uraj750m9zbypau4l5tt5cbgokj4q857hh34b9tb0d024gg9ezs43jac8mcv9h6pe0swu0oyrsxsbblnotyj81pwkecu6fiekfe22bsfr7n1nts4dtv5bvwpkhwlcawzde911rpvd75jf3i487e667lnd7rldq8ygrfh5hvloher1k7nxyevl3kyaw55d2agb5dpcoon1zyhec2c0g8rqsccga7kefsdf4vy81lob2wm2w3vnqnrz8x8v6pm4y0yq8xokxca48yovbezacrsorkel5e3vu9410ry3bshtfn2o92kl2kk9lh3grzpg11gjrjw41ezqbezyyrj9xyoa9bhzal82js01lqrnhjf6xcprxcz6rxhkec5zhf0l2i5ds49wqgn50ozgt1zqjhou50ftnyxszfp2stxe8o4bgn4s0kq1fxwiflj1qde22un1mwzras9ukaman1g25e5psn4xr1e5t98qhzefzkmdnlh705tn16az3j0f8svjrf1rjn47idxlq9hpu4ee8a7dz4k1qlc53xl8uyviqw0nzmonfyltgffwojty1tx72en0c64xzhihjevg1nhcsvdqaialcrmprm8fhncaajkk1w48w0aavxo4x43y48ea1m0v47fic627g30h5m6ixljqjcl6rwhcsdgg4x8y1zg7x3gil6mrlaxr92kuqqgqo090e4vmqfrfehq6yfhj1wmi4nkroyq6ititth5hdttfwmzo39i6ivshbjiv47zcbhqn8oojy5gin9rn6mt3sgh76f6jdvm1ysmejoo882nlgfcae9msohaamhjsrmmy0r3fm6rb9aomnx834jr9fugvupesybuo5ddxw1ajd2jnro59l9rnctxvrcbnvu2m13ps5x4xp1rf49dt4ni716dtt9fdmwkgw6k9k0d2vzozl5rccwc9r1hvgl46g8a7dt536fe2qt0hsb55zyc6x5qtlvms9j687bc4iyc0e8bkxgik29xd8k5onexe3f0ndeaexbkq3oe7lf1ukk4lzr41vdlkqn676w0vm4i9u2rs45jcezv9chhj8ei091nwbnmdmsg11nawyg8u1pkkv476kdb1qfn7yffgub1ryidrez1pxg2j8co6dohupe1fm8ar1l1c2u7gjwtkynel9zh6surbx7sfdmim7my0t20b1s25cyibkmhv0vd9cu5c7opsdro49i2qs3oh6s8js1syyg7lkxua33zurlz5d19b845u7vb8mdgv3h2agou37wnld55qaeal4tmuzg78lxpwd8au6jg2rnoldj68ulmk5mlfrtwv765o7r29hti11wjjmagnia1aprbiabzmzqcmeey260fux2lgy148eah68e5j656iyooh3sv6kkph7p44v3oipfq1y69vpyoci34y9tdke29ywboqwdzjgeukmbiq5xrikz6zpweezx1rsa9c1rlxrxpv9q190xfphw09vqjl2l00ukv4avw6c138xl2i1vm6hjiece5j5md6smb0q85xzb5jdhomqlhi3dcqjy4wcnp2pqry435zbm0zxn12k8gcj1f6jntz',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1374888667,
                expiredRefreshToken: 9311947184,
                isRevoked: false,
                isMaster: true,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'AUTHORIZATION_CODE',
                name: null,
                secret: 'vxj1uobt6xpqzl27cnq97btcntnf24zh80i2wk0tvjsrd4ij0wh4bmb1i0b3u0iu35ll3snhtmtnzvdv0iawtinrjt',
                authUrl: '0734j5ippivdn9twjch6rycl4xd7ll73i8482whb7z4mhq5vqg18c7zjp9tv1ye6a1pbdg43un8urigqa374rfwqjyv7alw3loler6qbe5t5da0pq2b1p5q34hr3eufla687u0gkydjxs3wkx8dtk0mwl5txc1wch2cwxtl2l9s8rf6k7z3h5vi41sp8j2en6gdtd8wn8x4a56fpkj2e3md0xxdpyqc8m82cdtiqoforlgmu45wdpe9ls04u4xdmpzthqbl3oxjywpanw76u3laa0ltwam8gietqcuzc093f03zl0d1sbie4n5jb04ktu99wm9r2ar75di1o1vthjzb4bac2up1n5n7bvzb0eo8kobdmx14wuu3rfxsqvmb372f62kty4jokg561zz3s4d6uxkhqmnxo2l6qwzz99p40mmnozztmfck423lt9ks200r9kpusyeygkvxeh6m6ud017w0ibpy985j41valqfcem2nmi28ktqpqmvnc2fur0ozsklcy457wltshp4yhxx4n5kcnrmao0rrssw6e9vhg2hrghhdfx4gtdr3v8sq43wu4zh4utq794kfvd0csx01orgh2gqwat41m1ecbbcvt4o403m05arbny8qgtb74y5jnm6ml2af5q0ol4ascmmzi0vly12pazn1knt4jteyw8ttad0r6gq7ct9i452qmcgf1jveoqwuasqbmqm8q6xeae1qen362jj0o2m4ddlipxsjpvbep7zufoux6mk7gwr67477i8fc5cnd2myoqe2f64ppnmr5kwjm2stp60mg1qmeyfxvwajanhzk00zp6jtz8pu4sf5islkfr1ne42dt48ke6dyvt7uhtzrn3xz71zod4qttu3qqx4g8rvsb0xbcqevvrxgpj5c8ubdo9gq85fo2q951evqyr9g3qvm8uubxhvwl52494lctlwdx7fkx20jzn7qfhxtbou6jw50ph14e5irfugof3autfsthglvkio7pnixijolhxyj2nwz5w9bdl4odqsbz5xd9fwz0146m6f35jiys7r9abyo3avi0p967sa5zu6v4a7dygqflwz97buz37id8i1toabed9s8dz7ciadoswxrmrkx8sejxp891tb7b8tqxghzjm52jpk3zfzm6g23h83fcg8aii71bybv7v619rrgxmy7bldphpchz5tk2dy7hzg809dlm662ofz0r02q9zupxck3diwuzdpmtl56f3evybprecvdwkw1k6ilxv6yftftg4bbuw6k5xmcbukndo5elmzu6yuwkxzjrgn57zrm88zgaaw59jj2j5omvhrozj4zc53czyrtjyialijfdqssp5oe96xxdug776cvrpi83o7isjyul6o535220zj8s6y4cpp9fh09tcaiw7nbmggqqmjshtkj4epx4khi2kmxobqbaqb8350npzoo0ieavmcdjuuhv0wr02pj2xvifa7klafcfzai0d6ge47krlkclrkob6mztoorqvo055izk3dzokt6k0oemv8qpzy07z2puwtq1t1s5d24wtve18phvkyvvgy6vyfijque7rdvvnzlbfmqgreh31oymxm3ptx2njeuxoti7j8j7axzxpftd5dyattmwfb2k0f2sslqvgj4kg8i3lm8e6szbbjlotcz1ha31yo8ekgahw4fhbpsbhcq28hp76sml20jgn7kzo9h7eyqm7illzff4kgwua6hfc2zvp1hde5z6582likhw3smfvsftf6b7g45m6refptekk3ebk62ev88pa042iax13z4elq1fq70ocqe1svkhwwn0w2ywed33tsnqn2pwsvopnqr4ou5dv76uwsokjdmsas4oidkh6d9tn6kaggy7trd636mfcx236v67oqlsk1ocjvfxikacvmlls5qfjjr630l772xe3uc7oe9v9kylbpnh6baxr349po9ghig7l512p5w57di1wx51lmmewjkz3gkeg568tbflq5bakdbfrgzyu7bkl3ag6tou36s2jmdoj',
                redirect: 'q7ma47akx7gtk14msawdjlbt1f877s85yzssk50p8fv1tm2p8t9p9x0hjp58ay413gzgf7n57fqp8jjrt0fl3zso69it35g6bf3urgp2vgxm48f6352m04tzh3fubovwgrljt7qe2pwkpao9u8pkpuzeznxwm1ofqbnfm3ohz71guog1bd6oguuh0r8wczhfhysr9ehc3cq9l1qkbbgwfvpkssjkvvqptfc8kzmo3a53savt6jcori7m5y264aidxpf16sb61rd1zug4jxdqumqdquqqaun9gmprj0nwy8haru8tojkq93ppwb5bmjokn2c69tgm24w3zcapquzj2z0nqn1y6ax47vvmkv7nvr7slwn3pr1u1jvl9wc90qthwi9fm6zhem1qvmdsjqc56pjewtyb27or2nqvrt8grc1m1kenf5bkp60huz7cvyxcghyqhegffuifct3gv2i6jaz30gh0z6m0kf6q2ihvnni2016zprmrls5kek4axgjoikjfduttedxntb1sr7t4vifjqc1bya33p9us3v2qs2m3yacx8hmfwo8debugcjmgfyl5984jinae01mptcrk8r0xup3vr3k92uzzas9s7q1plwbu7g7lul6qkx2ezfyqny1a0gqpggpoixhdbke4cllv7ajqgvj88vwvifr35htsar9ep4fyrqbrr9yhyydxf0bkqj2ln2ac52664sdk49u31q57qjm469nyil2865dvlygn4mr7p2z3bcajd13vxnd67twaypy38drn6la13jsca53m4pr4qml40apxenaj3rl9vv1eb5vs34efdgrj3egeoo6nxguh6zqf3eddk9qrfl2ms8v1jytv3lzzq6z5195f7fq0ysehiftfaz1y3aj13z646hwd7mezsf7tiky9mu99yzwkuur9w49atx2kq5zpdc0loy1dtgax1n009lnv2xqxcrl69iz0ncfsr3ndauic4rk7zhwwxwdx06gf29ipl2wb7uecsgiwwgbcjr20rmui88zghlevbwns2t4rsdernhl5wpxryjt59qbor98v5o4y80jbw7oqvnkxeqod12j073bzilttx5hey8op7xuuem078qs1jyh1su3k7a5ifyfrna5pnomqx791htsn1jkawfiavnpjq010eqqxi0un3da4lyrvkcw3ktat1zintiynixqb8q3gv9r4p42trnezammyq69x9zd3e8p1pa5xrnmg1raqc303taplma2l26tlvavn03wgkfnw8i1vzgyiydui6u6g54k33v3lp6zmbxu1al8ar23vmylnif370pa2bmb7qskwgk2pb3hu8jxz7rbk3ttb8z0wd0cbgy8a3l1u16upkasckl1ilxgometssilx9sz0me6g2xlbrlv50pg70u0tsughiqq0wo9hr1mr2i74wkwdcttdxuowhc6ineeycd8u6zr1z0bin6wemajzpfibgk28omxfhw93cpkbs75g8k4hxw03pmkbpzad0wihf2mc7aqzwhenupbno4fzar34gj2pt8puauee7rk1lgaoyohxw4kxnj1ulsehpe759m1evs47kff9ahxgmbz4oflso3syv5qvfma0cw9qluhs08z7kw77uyc01mjb5bz61hphnc0jzs7cifkx91sq84swvhjogskeduq87bbpc0wbvc2fjnqqx89c0uaui76wa3sui7k6ip2x5rq6ly9jebtu1hpn5fimp6v1qb01ws5y5bv8sn6twalflydc8qxvnn9o7m9ylkt5uip25dp3qnngmbl2yg0wk45141p25d16he7b1bvrzx6tpw5022siufww1rc9sjp4rc7y49vb2r1lon53jyfa1i3lkxyiy2p9vhx1vdewlijjnqvvtco96n0xwz59vylbgl29avaedumz9om6q2i78cdn0xozkq00016swrn4hqluvjr6z8z84ppmm17dv202kan84phill1gwnrb9xsvi8wro2fw9uglzh63rb84xbwys1733me3j9cozna2',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 9868523634,
                expiredRefreshToken: 9544524748,
                isRevoked: true,
                isMaster: true,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'AUTHORIZATION_CODE',
                
                secret: '0gcdzkpu16od7zialvrh2qfnx8wrugqek9ud1mqsnuubv5cxwoy3eocg8ftfz7oof532ows0iznivay88x572m8elp',
                authUrl: 'v3fh9m5pngkl9ahsr362zqsbvmz8zgc22usvcavlje64jg07pzyhfij1q836vujk3nd1yv11ibu6h6vg1zc3d2l2kyunz5jjki0j2xhfc69op9tcbhlajir5errlyqvpmv7twh0g812h4m0cf9p2wvayakd61tqochawxbxjyk86t8ygxy2671ph7oelfo9ygoifxqsteudjxfvvt4xznr7rbctvn6pd3kebkyssodb7tu654z3hxmu3w6n46restvy2lya5k97shws83gpkr678mw9ca80dbvdiqsv543997nngstb7wnbssqju4r29ueui8ahmg95tfr3061i9dtvt5ct2zta7muz399qnx8jekdwi7ddjzclwxvqnti7eqq4q7elk6v72khiknjzmrodl7gzbyp9tntvadzm195mfmjyo8bb8qogp7itae4spleuef9sepo0k1xfidmkae1m6n83wl7qb98mw2z50lawsbli7n267u7nb5u5nfaxmq00sk2i6fn68978vk2v0zvwvxhp7qh8msx8v2ez7yoc5k985c187i3g93a4td80v7qgv24c40ouhhnv4lci2c6qdwggn7ld0xw9sa0d3w5to5kdzar85la4dpq2oi2dvw8f02qt5zi0cwo9pewd19ovqjx6lenn7hxks0jble2dc435or3ll40w7t78a8ebujeja1fc1vy98694fhzyfljn4mg0tphf5s0bbecilpkawgjzmo7si38knlr6omsbj0rhig6c6jtq98wgaoxbd3fvxtqug7y1li4a5egekngwnrhmfc9j9ywpc0alcemijbq4bxnpmux28mo13nwo3806s7oc56cxkzj39sgxmd75ffe6nhxo3kuwl5go3d2b9ctmvqiosfkh5sspv5i3da6lpj0zdfyg1yvw408imos9dhri7dkny61b14qh021damegcxis38w79tmg3ucipg1spkti7b64apya8ie7nvxnakyb8cvqtvd6a3nqfn8dhnmobbtn7qg3ij6eqem1xdcper22eve74w3x38q04c23io7p51y3q0b0ctdwmjydyev8g1y7bcbckv4rbgtguu0bbo1tst0xvr3nhrwaqgkrn9z98jt5di1pvbpayvz7lc7snbrvrjqvwr0zr67g4zxpm6khl5ixoua6gmhr9ht99to4zt7y7vzce5o5csyfrdzqaxk8fhs0ccz1xcwvn0zprolk1o4a7lzbfgrc5tnf2drg3xoq75krm6auy27reahsym7xcak551wgyez9e5ro1xwwxuefm8lxp1dq2vegwg1o9xgkk4hxasogemk4c5vvsy0u829k2i90ht9sk39blwu7nrm7w8kbjmunjv6qeqn4087mgsrq95mgfm9187kdjwo37ui1hn55xend71mqsu3zsf0jh2geiaiduglemx7fqcm7kmmedud1qni1anzcsv9en9nkdao22at3ftmrikyec4a0j202i90s43ufi7krmk4ve7a7g2j7p0pfin2fjquzb3qb6b945wbyetajel61q9j2j388ix95s25yi8stg4vtxf4fzupdedlsyc131g2vnylmez17x7kmd1nt0xz78trwpjmn3awwspxtpo16k7rsd353gk26s93g910q5u264mttkbb7yuzf7y2n6ig3j1epvjm2uf64tk3d4vz7d8lvhikij1340bew4rx3758mixyxouat7yzpqf945w8vxhgwqh7prkm5ztod6zlyy10mfu86d39ugcqwv2tenvnwuwqq93dpg2aacb6r1fyluxpknjynxtn3yqfqvft20x7hmnncqk3x5uqscanefggmayuog70wy51jmdqk3j7hvyjzdd01zjzneayivz5u6ibrq4e5pmqyv1qqadrh0i5h93c5b7d6zn5klsh9j5hozl4glpguay6prmr945qalyttpqfxgnn0k88euhftsbnufaf98wfo1tc0wwlr9jpkrfidz7w7i3d0tywnprikia3w5ikw09u9jvofz',
                redirect: 'h6uc0bho0vycymkoxcdud0ow1ixroorqu8vxi9ntou1s4xjqligs1vpdyvmnih8b0i9e2j22r3q8uiv9px71rlvy5ha0fi7feawsdnw9uh2o6uh53f3vl95ubvu9ys54gdoey2x9kr1zlvroqeb6giatx1nxew71hhmh7975raakjjddjwxakw8r7l3crigjk066prhrpg1tayeopsr5fovrtesb483zf4gtonla1jqv6ojgqww8e5fx0b4e60t02w38fp3wbp41i4kg3uplbs03pxqequybwju5o6conkb281pbbiillskstx8smi5w7h4caia57q67u6ky0t8wacsgotv8qt2jlfpf9gt6t9u9bs3q3boh1hilfh2e0s0jk2buhrlkny74pl7bx8ddrqs7aw26r0tfmvw3kfzyt1cel43sv23y42y211qjyafzxkn8rmhqnvvjh1my1o4v07iqryq72x1q1z31jqmpn269yg97pvdgw1zvjp98ujgtakamzjxtpmz1e42zkxeywvqgcqy0741y4y6k6nlgxyln6nii5cdfctjfeuio4sa9gg4d81rwoodiz9xe6689kjq670c0e8l0hhv98shpii1meatj9zzksvt7hjuanvfp1t62k5clkeuusaujlin0g7bs4uoc0ueglv8msmrmj2mip28wwg09w637rsqkjra49ohkvg10x1mfk4dy7prowku85rgm3rbywdzo59lk4mcpx8kkb4s0dfr5nx7vz8s3v4vqq4qbds6oy8uxtme3jq8sxuvzz4hb8h1jksxg578tk9sz47p19u7fy1ccmivrc0iuyyl2al7wwljwtko0rrs47a810o93n1z4yhjkqulis5fxu0m9l4mo8o9kzc6qnij5ujmtisxpl9p9e7mxr3fcuhffa2fmyk824qehzoceaqkznu9swuzgg70mi4cyv1s61b212a8bf3dge4mrnrp4hpu78lfpc35pf2n3un1ajggpiu44kp9lelt8eh4qs6zmhyfz8t9onodjkcn7xvh797lne3mq9l7h8ex4jqzz2fglbruxa43basxqu7gczvy6bg5td5nu8ooq481w5fe14c04s6epwmzwpqdgyxlmf1d88vcoj76u958j41r7hjhk0ftya0hyf2adht2vbdgb614t8kh0v2yrofah974biumsawbhsfoy4mchrj4gk1buzlikyhb37ka5y08jd9vdl9crljlddvjrq2sd285cj5hswgghq5fly7gnxtsnerasxs5ilazfe9ww69dt9vdyuol7krrug6wyufe2xeqrbzgui4dsnx5wsxii53ipzeasaayjyn00n6jknu35cfe580bwa47433bx5bljqtg8pely6dp7uyt9ez6eq0tiynoskyv5a8zadbxlnb1vis16vx4ixdydj8z3vpt1nlif5qvnw1m13yak49a79t1aoqrcq2q7t2hexxm401rvm7m1ut6dir9q1a8wg1a7psvahha7ixtlysa3unbbbkdxyis8t5yl97bm6qwjtshdm75pk956bzfepodb58hszqnt2pg8p1bemhfplvlyxj6427c6q4gm2mxlzipra7a2mtycezoxg1pfrv8efp7fv6gbsiapd704ps44mjosbeiwpw9i5apxe5s7kfqh1rby403b8uvmwlmui77df6oxmxistnh9fliy6gmkixydzqp46mi6jb5l9f85ss4ft2225195pttz0cgdj3wcfxd2ytzcej7bb7y85qw5z4gm6jfx4zsn9gb8i1xclu80o8ajuuohj0lpz8xea2r9nzph1dhpopamgakmiarw42zv5yd4ni6w0utrgikz2r30s0f2w9m1vlhr51j2fd180l5ppac5k873yn4rawmu9zu70q8u5lrtecrlpf2l40m4uykde7915n3xq0l3qi8zypcnkfncgl2d445li92ah8l7635up8wqsu70qthw92j95t6devrt1ag5keyg8xzaypk0mq4jmahzqxppspi5ndejgi8v',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 5464750443,
                expiredRefreshToken: 5198166422,
                isRevoked: true,
                isMaster: true,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'AUTHORIZATION_CODE',
                name: 'arr4k3g5fzp0boj19i0yqq34or1mfwp7aevip8oe1ydmijv52o4fnvrypzutklijpdync7weni0lfhlrhnm95f2lazqy5fsd9lg880nxxrseao5mt9wmmekrrv53auv82q01p7h4n3e4d8gfdwnqqfcj8skvvk4bvw1ne6w8k941xaf6l4n66bnhjrmq2arxg7st4u982o7p4kigqdvbl3ch5larrzxfa92x1kzzm16zrkp7rr9kyv053vuu567',
                secret: null,
                authUrl: 'hgcuiski68wbzy2uea0g960vufm51xin7v1tlckelxwaybulatix6ru8876chrey1os0f2eetbm4zfhf51fmkcstnnzgf0tkazjpxp2zpr0kn65pncj9oqi7snwnb3zfn8cxacj2h1jhungxjf4ji82wsxy3lyyel778ox63sa8gvasyieeokydueipsfyg7ogqspfmptsyx576r2fe67wtfb3rgtzp757ini1mym8rvlouobzo3bx7drpzrgiww0h4kq5eq6g0r7jpjmw086cbjrfrus0xl8ydvpudirpg4ot3aijxag3en4l7njf2grud6a2qnx6r66sm9ih6ridpqvwntu4dkjd5puyra0l1zbjs9b8memmsqbk171gp1l7zxirhnq8yn5wjk9l5vk6dfwqiieff91y2gdl4vvtxtdisk5ym28mnpko9lnjhgv703isq5i4uebqzdwrfcqaaam5y57hno7rlksl7mewggshhu0ne6te0mfqfip7owr817j5x4sfkvtye7e10kz2u0evr2t8krhkzog75w0u1t0l22kux6ec8tdnb6kdf1cywqidiaonv4ca1bt3q80145m1ivhe0hlzjkm0vzxi8amyar1vixju71a83282l1hrz0ao4f4zxobo9p0zpm2a46f67zevp21glpcz9jgwxzod95apzj2zd32g5s7rvikajl1yk4242409adnou7rxkil3r9orkqcgx0sv6zqb7t86lemiplmcyrab0dltel1r6cg7586ihxmugb2zzjk3xhjphyxlidwe8a55b5lcg3n7mveo6drjdtk92j2647zv4p37pygi94hlnovgt5ddx0dh5ejzxgdsoz3pcw676axdg2d4h7x9wkpcbgyswc03yo5ybr97bq6f1f9i0uwc2pruiio5grs9q5umzcjvuedvosodfiitol3dqhitxn0ioo230bk4pk9vdaajhfgd615qpv6eayqvurbnbctm8remt3jrapgp6bylj42zifqdzzay1sseeds9g6ki8v5vt55j1cgvcy5kdz39acdp6d23cuxuyfs5hnl4ugguibgzxsqlibso1oya2tepfjhow4868ffkv35axrffp8fhy4dux2ildzjhjojhbhq81ui6u4afr1pv964k8umetxji81sy8bzq2xz91okzjthlog1pq8xfv47t5qgw1a9per5ciqlsisnc7s4sgugd3otakc0ylddtmcy81dpo9jqkvsfve4nl7aqm3q9lj1h949x0sjivyjokc67cf92sw6qpl3a4c6up1ebqklpoujp11glm75sspg8lcgfnjkv36yuxd1vatj431fj5gsyd4js504ii34x04fnse54mrlp82aacc1s92s7aot2n48mu6wb5inq5az7xfyug30fnrytuxx0nc4x5h2ud7djcbc9mqoi0wddecn5doxhpb5b4wbyrw7t0wk3w9aut1ropje9d8yk4oxg3rno5qkgoizuesicpnqf0ycwvpwmox1rvunvm8g7t7p1bimoe4rjy3zkhxspg14txrirs70hi5vv2mpm6ehwi6aqts5lvsye4emc6nc60jj4937clh152vxgrjbhc1gu7ofh8fgs9vftn8f0dlkg5esa4rdrnx74526730r5grnpwa0x06w56o6whcsd1o742q0bh7b5jnmvv9tg9maqomxeeifea7g7fdf5z8k05t4dgmqbuykoslv5qtoc34w7t27714pmpx9idarxhuk2zdghe9d726taehwqmvjad5pdjedxioecthszvoejogrejti2h0i3shexa1z8qaacoiuebp74xvy976mfndn0vbna4ljs528pmxqby9ladql1xkctaohkcqcmkfgmrbply65fk0wi676t7yjcbd43sfeeu9bfavxwezswhi1m1kbsppctfgj7m046vdf3ld0ct4v2c4khhaf71xo5sxqq36n0cr6wnk1stercu1dc09k2f2rioytqt8461v6gqwrjapzfikpwt33r15j',
                redirect: 'zcu8cwcj1hmufxf05a84get1hlalxtd0fzfts7u4bzkzzzbjwkgd32fhgjhu25upbhf5kp7rckniql6mrva5x6f3p66tjgri2vhhxfxyhb88tpdfh9v14suhwuwfvu712x47y7iexnz5dcanjznkvi9kaq7bu8ilkyf3yrbb6ejcxqeyw20pqnyv492li1dw2d9084c941311rc54n7zigt1wm6fxfkef5liv5359b037jwot2h4zn6hex8guqsk0hjm063bp7gmmqm3ao8f391a4x5q6xkmjb3qdt8x4x9abyaxxeb4ux2azs3g8ybeui2k8c9qownl1esp5pwqogx3d8jvs2ghz8bokhhn0linjmk34ip69rfb5rpcan2rm9oe3zwmmeb0t73d17got976fom7a7008gm0je6r64yy43lf1c4m4k9owj9pjmn1dknlj92gxj11ntyzlxgexgn0t7iuy85exvuuivjxuojzbx6n6b8cm9yhq1h1a7unqlrs5fa2uw9ewv36kah6yfyovm2nlnkn17jfeju38tjy93pbcc398yib4g8wpq22nznesbvj3fdp2mh593vwgry99iwz8vgyd4inh6ngqrmuph7xpx31nukyisrek9i0afrap5q1b9xcfebs0o7ixpgfl9ec1pawhlg1p4tci212sbf3o6io135j8t2ib8ket2edqx2u0nhu5pl6r240y5lrtx7pyc7z72hhxxdfz6af8m9khuvzw3dvf5jbgf020wa2voqv3erq5wv918p6ecff7pi70x8tslc8vcm5as4zr8y2ysqtdm12wcqpw8bs6sppnm27l925ooqgcvxcqlsvfy443dyadfhs45uo8lub4ga9ms6q25zrydj799z0ylgj75rj4lwjygj8r19nls9u3dbidcq08pad1hyv4x829yn79z1a2q8w85k9hafkdm5aicxln8dxjcppxgv0aw8oq455xq23xcrypflxjvyen7ouoh4sun5nrr8s9suimjakqf5iornznhacfz0gydpfo3wizbb4n7gppwodq1f4bq7kmfswka5yk0a0bjan5wp2d96ztk3s8odluwc2so1symnczipsjew03xu90phjro7awd2uazynyh8yhrm7ge5s19ki1bgw1c6gul5e2l94npjfeiaugttkfze2qyqne9dnbp806cbh9lfmb78hxoc1h7h196qy9qwe1b2m1dtskalxeu1aizud2am6g8y7mizix8qo9iw78xmwsfrwhvr5njxf52xxfxkdrjvwk1ywjkfkv629vkjhb6cabfakcseh0z4z5pypbzru23gxo3gzwjqzzgzsli4acz0712lv36r89mvw2j682rusnbobx4dofi22xlzpvwd88fdi7scs7xp8rjn0iqpvtq37uhigtuqyvnxjhgxwiv35ln3p012tzdiwrp1sf1yujm5ycey9lrbpee30pmmuur51wd3mmq8og6rrs2djoh3186fu45rmyqdm7rzoo0crscyn6zj8qfwe7fjsq1tlbmtk8rgpupgd9se23xnj80zjbaz2gcvp990v67r1rwelg4ch0zd8quxszlla63znbtah3a3x1m1jcmzhrd0zvf1sclr741rgab514et3gwtdynfay0zbx37elqb0bkzo0m6td9y6qzyhc5jiw7d3c8cgx2k2kyucvepspixjplts56syk1qp48wbzaro4ipf60yugaxn3485nuhzzcmj8hkn3dutjqdnnno68enoxhs36yd4rt2rh28forp5nvh8pi3qum05lqnjnz0v74yggz50j4lgux2ez2nfzymwopn0aei2s51093hax2ug6oxsl2595al4dq4jeqn5itgdgg55wdjo1gcfmu70d208uie1b7h8xggdxvv016ap06zk1gyxqtaqpabhgr7xt0ku27el5ovydqzlzrmjp12owlwu06l8t20zw23on5h15xbl8z2gjz2n8gjfzlnfu5cn0s0yib1hraxryy11ca3e4eq6ty95',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1571753595,
                expiredRefreshToken: 9665746653,
                isRevoked: true,
                isMaster: true,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'PASSWORD_GRANT',
                name: 'do7zvkmoz7dns5uilvwj5cve77aou1zvznshra67g684ajy2wjl4b9h9zirr6ewp9x4gvsbbajeny6aejq9k2jjv6no2ki5wzaswge166akbthpcvu2vxtwzmf7sa2r3yy0zp04l10b0qrvenaogk38d77j6c63twopudcxf7i9c1qcvcdnumfor8al0clmwnvpspvbck61xyf10598vj3kzp9fwcos6lkd4cnvpzy96o0ojxlha7jd7arynq3a',
                
                authUrl: 'ryiwilap0zw5h30dck58fcm1h1agooevi69b1ua6p6a0g2k3ewkbptabw041jikxo3s97q8l239pnexclwljld72otvncccypyup630bz4g7afocw6u520oh0fgp433k7l59n25m92mpjdidz4l2d6o6jllb7t1sawfjyvjtn65smyye9rgxwhvj0rb2w4k85gpeke6vt7jpqkn5blrf4gg2xl0n20l8d1ep8dg6lya48w32lq19i0z85bptbo0jjwytqx3ytwco0k4zbzntxwc3j48lh09lahuouql02c6919d4medx53blu29vhp2ddhyxbtobzlar02wu2dm12o4iwfgv7uoq0ioiaodjn868c8kttq91yydrkceizxq4haidh5yx8p62976687ahusxpbom4t9mew0m0kwkdklxczyr77nlrxjgf69jo5qktjxsh16s04dljo15qaxkeuk6ktsyuannv9suv12e46gb0s5trkgbux5dcfc7jirfhzi2u8pnmpw4xibmgw71vlsdd0qxgvrzgyulcb8youikiq1ifqa8teglamixms0dkt8snsqvwauvzgri7kniohu48g883r0kzhxrdtdyxf7yv57w8et2aftjmhssh67zkbk1c8gpg6pyib5qyzt5i270lxu3d01zrvy6athyugfoqlhemqv95bya0p3q0xbrwlxo0uqqmq4t2pdjvgdhnx847f5ltv7scukkw5xc2wnmo7f8k6itbbfcwjln74a7bc3ri81m0cuz8kdr16586x86ba23n0tm4xuexekg699vrswkdvng8tc5aceg4fs00wb8kuyuohie71lb5ssoak2zyv8b940wze1ttqp96iagjykkyfeh4m1gvfs3gm0fnzwd7ferfsfqffw0s7iim54bx44yurw5lb9oc2omzegt6luusbke3g4tigqkxmzpactgcatpxlu2yjuk2dq1va52j10mxylrqfkkeib0p8hv863j7aarzhmtcxhjqgc3805s1ujqhyk9d5b66qaxb35dekzg9jhpc9t53iz80f8u6mxqsdct91hckga1bb190j3truhdrpvc33vwuo4myvp0q13c52einkuk8spac6j2rqqoufmij1bo2dnrr99nlh80821irl70pqlfqqygq5nm8blrasitixq9mizq5h3osam4wga7q3cnvre8evh64y2hl2hr6sc8r4aol0qrky9dyvnetkejcwy1up5pag901tgikovycczre3kh8sw68ispb5mxmcad4gvbf5sl3ip0ph4zpjbi4pw2rnbyk969tovlj20kq48t6qrkumqq15aw7ri346j6zsm8iwbxl1c5fo8km3an072jbfxtjdpc2ycv0i01306ewclymk7zdclskowpma0w6cy839vx8tz4qiqbcos653myf0brurbt8p5lp1oa0gpigdyfhqff185onl6vatjity2pqy2np21mo9tdjcv3bodbkor4he3agr09tuq51mfk741ww75r5p9scibx6spir145fx5kv0ubaxtmcvvmmyln9e3ct4y43ayk4j1n1inhfur8hjsen8vbi668w3libu9egaz4dx3ini0bn0u3d0qt0180raazmxa09ixqorhy8dyjjssdp8ls9g5i59558sirf6pwy9ilmyz1u5gvciq6ew8yktvjvyd7b47lglx989066rvqena2cuhs1hrevqg5wxda3wvc2h6oak7ayq1x3el6en1dt2oabr8f1w6jzpihvv30yzzjrj9x8319ucvcfqxw97h5mu2n8w8b6lvnldvb8pyj549otqhyx5jvcuuk1z25k4jtrfpqy3dqekhx5c95c0nrru58w6hi4qfki33k5zqmv0ryu75i3laspomoar9xhej5ak3u2qj9jgbtbbyv3jlvfexeyvxv4iq88iv0p12rxccsdla4n6ixbbsfag6w2eg4br85b4ixrkodrzobdku74u457wy1zmfcnsmkbb00qjxrcbdt6e2wep2wnxrzb',
                redirect: '9z8frnrack0l7tqxhruzbftqtvtz7k6ftwvj78i244cibnhx69iak1ewxhgx3pbpukzi06pyg0dzl148ksehrspbptr8v2ojf2je37q3t9099tc324nm21nlunjs7ktual6c7modbp86u5ez91i9bilxcuavybuzpfl902jy6t3t054oe7iblmy5t87wkszhy18n3qksq7timax083t7lzakuqrswlnqf0bzsyawy77ndrc1ts1rtjlqa96vc3qek5yw9gegreb2xnzuoq3fuokq631os5lnrv9r45zmw6afdwz0wa7lnga0n0kh7nrodtq259twtnaxkaizt910rwf9fgb8lsvvnlxwm9d647udn1r0oj9n9dolm3qa53emgpohoazavmnftur12jkgfssiqrb0ttfmrvr6s5oza0ck4ydtxb2xq0gi6he3afgz74fdt8ae7h3u3dsn6s38ru0yro8r5vbsla1gtk5b5ewjwb0hpivguwb490jdu94p9uv8c9wzy9tdha04qxa4bd8hpjk642i65d4cwn58bgn11gsfvcfggfp6upxdq41hwwrygwasigzidub8ja6lhj9utftw496zpkzuwq1jixzt6i4od0xs3mirniwfyhku6rpqo0u8ri93bv219uhs1oan7la35p068530dktv66e9nnzruwtc0kp1gjd2yefmfqjw0nahngl2jo14lfwxcvvih473ztxa4amvp0xzrrrb9ku700rlndthv67aetvbwn3mzhgswwftg0qxq1mdw4kqml3yfonx7vmzhtc3n9hybf27grhh4f3ylbhg6wrbbnq1hj6lnpj928yoarng9ov7fn75bqpmgu0zlqrua7coipydviqn2vfyz6oglia2nzobzrdzbn3f8q25l9hs471by90q8l4f8b1krp31putre5felwjneq9q7n0pizkyorifwunuk690qtngip7kjb0lmcz16mupuxfvx16wxosy2mde2cmn91hzqjl7bnvurx2tio9aconkyo28qslrqxef7284zlyvxxb3oe6yvu92g6nb8c8qx4z4jqlf4rnapdpix38wbhujnhdq1gv4ax6s5y7rtcbnv4ios2iieohj3z35uqrj7hmum11u62xp8gnho8cscsrpvhwz9wwg075mqgvcbwi3r8a9yksn9o4r065gnr5pv5fdq8mc0x9n6qboxcvlhweqx944x82nma3323tqyg555e6swc14ui3obi9yduy9hm5kq1alx2qdiv5kmbeobo8fwc014gttw6n33ir2wslgb3c33ks0xj8ym97c2h8gkkbufd43qgxqwo835caxkpvpbyw13967242m4zkoigprskvo8t6g7oakt3c8xcunzpcjdx58ohzdwi3p0v12pnkeqkjvwhf286tubtifilkz63i76ldgqlgck30d65jk8mhn0oaixw4mvh48p0c588xho97p9cx9ohkxoh8vnm9043fbd5fm8cv5jjeud0qihv7ha4ilhafzql0musesme5a90h1neale7cpe2pvazfhwhoxrv9myebql38apyurer1im00yfod4uv4x7n2o90hpzooxq8pp7y878s8c3vyg5cwwkktk31h67l50kjnxcndymdxqcq63f7ignmihmh965apgxpk84dz7317ekgs8ge3xijac9hsu15de5vswuas4fnt3lu7a1af9ttvd3zbfcoapll17wqxstklpgxtqr4rr0knhppnstcz56acclrzt4knbx1rvbz4a0e3ro6pkz1xl5y3e5ji6vv4tne4c096ka5z586ezoriutgd54drpuhwzpwsfllu641hn8yh6u6ehkyp2pnfczy3gddn3olw04sety9rp93t1mp7km5xo3l80493o8aennvncwom9gz5sqfcknaxxgig6lbpx48e4bwuwmfdg33nrexmd4odnz4ajgq2b92nvrfcal02w2l7a3sw965gobadmcre8mxc9d3p0cz88ij51cwmieopombdadncu',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 5692627951,
                expiredRefreshToken: 8876570069,
                isRevoked: false,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientResourceCodes property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'AUTHORIZATION_CODE',
                name: 'hm6figoxw1y2ynfrtrqruhdtr8yrvu7wtds9jxykinzngtvtp6umnlt0ix7kjago800qe95kfo8nyrg9g8hbvybdoh1czj6eoq64hxqthhinn9sy3lh2gyq5i5bx25uauvuz5ay1gszezl4s2tc7rto2wzfszhtrdnw1206jdjei4jfk8m9kj3jjf6c7vo9xp4rxtvupw4fi6bi944qpf3tztwohzunrojl8yk94xouww9hn00kd4up9kfthgpx',
                secret: '0lmoljfwmqbb0ej1z6muwfz4sbi4cncx3d2b4weckwrcndfmxkqeqwv1sfq7a7lmidz4yysr2m7mw5e8hvatj6p78x',
                authUrl: 'y2b52t27lesqlcpcrupebipiqnh8mvm9akiyz3gwrj1cqvkr3ig7mjy3dg5wt040ivlaloja4m1xdch4um52o7m1hv1isixu5asro3ydn9halug13pgj4vhjfu7fckuegp8rzqfpsuomdc380e6klodvzhww47oafv3hab326ks5k1j9yrm9tjeeqh36r69sc8xjyul6cxj3dqaakq4x90lk3jfukxoi6i469oc4vzrrjt7wvgeyvzo4q6x8jer4jqolokodmoumdbx9kft7n6um9sjwdjw6q68k3juwhfh0j2cbvk8mned9dbm95l6l5e0swiglbblune046slk6p07mbzfhi612sf4exd3gr65p74e7e01v7rlqa8kfy1za8sdfau5lnqv2x0cwbda2onuobr6pshix1e8fnptq8eiha2pows3ywy9f4k13y7ijikz8t4cel94sms0twbvko9v2ij7l61fygxe6r7m5vcv8nt5d2y9hpqfc560w2jyq5s2gcmq5bsq5hwykrwziqzzwyj5vl0ag2kk10l09orscd76878oorui6jd41qrjnipyc1aiwlobkpl3s9n8uwbqb7n5hufqv00rw3gl4bjb6w2e79dx8s6gktbala02io7s5v0xy3fpue7ugxbnewmu3hjzymjpt7eoxdih8wh2e0rlfbhyt3h8qn3i6xa2smqf055i1ktxqb5t2ao8trek8gkow878h1b475slgpu8ke8eacr0iuy37k1ebwkiat6pvuq6zu6k0e1gebq08irlrvk4a6530yqencrn47y4kgzhbyyi4p2y7xgjtnhp0ld0frgcv6f60csrgwgjkb9ivhcrqteswf0hhyfjs6f7oq4x19k84sjijeji9s133n7whu4zgsz2he8jqmsyzsrf0hxjpwn2dqidrqrbe1e8d9v3l611wuz0ixw3htp9ubgw6t8y7d6fm11dr1vq18pnmbz73lxtl1ccbrkgl85ep2f89y5nbehirpkj9c0l83qe4pi6bbwcn1rm4vwiudz13qvcdedy6636g7heg5x9fhyihdgq0vbm2nx080xwfc1lonyktm97ncf7r2yly1opq8yj910tz5e46e6hru4cfybplv8p6wcii2q46ui5ztdqb5inqd3pcz6bwkay7sioft2ew39okcrs18oe2ud9crxcbjmst9cnzlhdtqj6o3v76g4msrvmgtyxn6z03dfnujti27w9dxk3qlr3vx3mo3kktne15l2pznoq19a2v5hxz3m4t69aqjk5y9qtw7gcu6d3s4x1wdihblmsclemu1huus4e0aqziiwni44ucjiiss2cqq56ikpvbrkeky3cx9stnap3z3gv3va6gw5ekjwfcsfcdjx94enedm4ik4mnm5h5nnbodyiubxxb7q7405u5rp13c7xelp1c00mta2hng31rlrzvwxxare1qtet75i5w382aq45ap4b9dz7pwo0pylf1hmmvztkvatq6btla2lstp2cfgxpr8ndrybm1kvft75uujb2d68xivaqupnj9avzo1h3xnys52mpktcw4dzkfz84n8dh42qq5cjo19q652i96y5w876vppv25erwf7uedojkrqxdjkh3jbvzzbwbt3w0yexz6qdkdkdq6ogvcb8e0bvhcf6p8lk414b9rjp1vurj4ch0h111o5seebf8cxd7mvbccj8raytbzeghvl3jnqlt3jlnjrp8k7ut87cyr6b5nxm8lw5vr5s3bnnu3sop5eq56hiolbk448qvuzoytr3o50ukq9fpl9sjlw9msbcl0nex6vvejlnyaqlj7v7288ea2z5a1z5xd5ivcegusihfyfbopoz4mpdifakzghism1884lxtfbarkcefyh26906lu2l56x0lm104z5icfvulf2926llg7du999rb6bjyc24ldow6dc0wt1c9a2qhjx83wu4ooj6xgzycfsls78osur0mp49eixp77hf9yglqsf1x143uue3lk764li0sa7znkbfkw',
                redirect: '8skqhx5msv80csznchdxidu88377x6a3nvbx1g5kc6dgixd3ejfsleqt5b2anbn12v7n001yzh11kmxeqotkbu40ede0zalggusmchcqbgkyzewwkzt06wvexr4xm06yq6xi8ttk5693vod23kwho9jh0degmya3knrir1nsgq25izhkkrd5ggvjixn8766qxk3fwayd51inwzv0pbvxt7ow3q7y6zgmret22i1un4foawaf40ki5lyhk7s4keulgd46gxk85rf9uu0yhd8xflc2z3poi73yo67bvk7h6kqiuq4i9dbdquckihnio25ba85lumqj2q2yyqxu4ozmsw1c1dygu8mx5r6rtssqale61ml5cjhx6t4knirg7vzciu9zz2ax33adh7l4yny787tf6y0ul9p32kselc95mpldsqi8zt1it7vo4fzg6k5cfatke62ns8kypdm4kscpxcd4dvk0qvv7jkfei8e7o257ksoaem2bns3qanwck9sdjhy285zogtfhraf6n1hdxbks6xa05cu72z3tkjfigm4yn3mhzsg5syqetbibqgctb7sd4btc16sef3592iconucbeplyxg1sdwrbxlxrse0107nedpnsfri469frmnyshvzzhdul5hk35d57fqm25ix9wplo2imr0c8eqkyldygazljxfhj3ql0novtj1achifm7tuat7r2xd1ui6wlfad29q3fskkc6ol1sauun3o90297df2eyu78a89izp49oqo3fm7wjc9za47kg05ce66z2z6ehof1gczagrvab3sko5a5crrtrcjowhpsjsescmb2bo4kr5m6idnzryoyp844no35a0g08uv6bijlmsoqt604yxe3jesm9mzcqhv97n4h6rjaz4vmlylyzz74h5kt9cthbe3afla4kws5vi2st1tl99tdusnxaqyfryffijg837lh5kfcr20o0y6eaoeshio02fbx5cf71mwhmzzbugewoqpky5r50n5605fkvheq5if0qiu5ye69jpslnzh45i0pyh2legvd0v0mae323uyzvwxht23nkham2mi66oo2oqyy7u4mmfoyszmxcsl1p013rihq6f1ejxtr11ehxhwt1tyheer86w3hiko6qai6jhrokp301d8ud0nm9i0sjtluqenev0535666e91gcsysff86umgw047qie94yuyfbwlvg29tiz4whbqjtn9g4tfh0xfcoi0eujrs361uijykjveysu7dmz8jrsrqsacecfzs0k0o53p5cyu2nzzxg0gf466t08yuhsufjgujzwiudme0xzhrsli918fj5wqa42mdf5ffs1n23njo9fd1uhzca1wj2qzjv0300nqbfwz179u85d8ixp7g37ibwrhp4jghe670s6vf9xs2am1v4n360zvv3a4umbzhcf3d1grj9o0jbc9zbxmm08p4y1zb2gfqzyw67uxhwxojf1s6f4l2jgg1wv75pg6z6hr435mczoadar6svfapmf17kb3rujgv2oic2jpjbfevllhkbtnlwmy30l3zft394zvg3tlpuj8d6xdo1ns347w6s5uprtvbat0lcduf4i2mmmvzcsb4hfobcc9n52s07kez5u50whqoc6qxxflp8w4arh5gdfwl30f1forokpktbz3y0zbx972kjq60ldlvsb0brblhzfjk6o7lxf6l2i0vbo4n74wyxwz5lhoqu7zwir93192x2axxnmumg10t28pe1lytovluy8heq6tighaxcwo3r1dcbkx6wzef32xs2s2fpw9338nfwpec7prqqvepu9o21ziadoc4pcs7kzsjc87gov54ljiycrenzz5codx0qh09fpt34xo071faogv29jso5xg4cyu6m9d8erzrom0seqpnrdq9bvml4dnngxvp0suvmefsiap05dh8vga0bqrffepuvj4t8a9ba3orw4vhz4x9nim8gyanvh74fsx5bh7wczl1xg36nsqv4afjz8jb51hrmu82fy67emskx',
                resourceCodes: null,
                expiredAccessToken: 5817130669,
                expiredRefreshToken: 6200541572,
                isRevoked: false,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientResourceCodes must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientResourceCodes property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'CLIENT_CREDENTIALS',
                name: '598w5dta0prd7jm2yxsgr6l8jg4khts3sbhuazui0yp52kluprumgzeatzzb346ddos44fguow3wv44hzujkvwpt69myzai2r23asmasd3lay1lm91u01duwqhipj1i1znxn21oyid1l0rmfmzp0r5iae2oelgu66v3u222jjc6p3dvnptl0nmc3o52p780307nmo2gqfy3cwj4abw7v8c8duj109cz2eypltu798pqa76p3qaaf2384o0it1bg',
                secret: '4hwngtolh0utrv98lhigl4ddffpf9b0gjpck8xu3c3igno7jokj1razqaxob8t1dkip57pm68x37sz3gtcz8cwpw0b',
                authUrl: 'nm71944tkz2rg64b2dw7q0682vegby9r44bwwgiidk8vch2bzmpyjsl8ydivxwstimcqqvxgfhlojhtvb8u3qzhp73t35g3bksd6c4rx1ml1k2hs28cew7el9l1dlisqegjfhv5yg2b88avw5jlvl9x3h8ffk964voy4r3rjs5ph2exniks8s2z5ues9pah8xzn0krcbn6rfgwh0pvx488a6bdgrcqrjicr44x109tbugqo9fz30sv5tmgoroqcw0sohups4pjduynpwjwsxcrcmts3nuerm080o2vus1efw8atmrh1c7s70ekk4vqd0p2av19bncixux25yxdeqdznbkhys9zeatr0d2j45spfcl5or5htz7p769dvwt8xgh969r6h1huzrql9yaifpedjy4rey9ptsxtjms3yf459s0k1jr72v2eg39y4qhsz9swvcproj9094pdjq3udcrz6qn4ycmytl5h2ha7iunptftjpc9ip64inmf9ub6saq0fajz7ofezzzz5vpx35it7lkila5trwlyg2ama8mee5yo5ogy3o48gah2siwr11oc8laqautuiypltwo8k6hvg8i4b9hxw06zp28h9l1bdrazqhzw1a30ghi9titcbfe6lstcb4zt2pqr5rkm10fl5sj6vtrxn50jzyro8kc1q85yyidmpzjw8vre1hde5eo6bln16nyo7e4t397srzepvlmiqia83he8mq3v9kmwnrk93f264ub46aji63c1pwdcmh2wp6p0nui3kg5sy8kaea5lxl6my08ikxpt1d01ql7vfij1ixbjbz18gsp9c8uivygplcsuti4hxwvt33qjs2tv9dgnsvzcl6mekbv303ay7p6xlkzwlz46ob2eipvsj1iecfcjfr51466eny1ll5ie4j19gaf82q9ndy7wf7t2mhsqkaxrpztx867mst1fybeyk9iu13ko38sx4giiir5xdmpinqcbwe7rk13u14npadzkptviqpb4urqii6y1tb2jou0hijz2j0dpzpo6nl2124qu5wg58yezq5mr1fuz2lsjbnlsbl83nqk56cpk1gu2e0vgq8fwanfan3k7v87dhynyyupk9nusmbpvkoqb1xb3yfgo1by898djlmfdltbex1i6tjnrq6d27pjpw3wxothjpxcanauxbka5rm7uq4r3dd8rl6dqt0v5r79wyq9oezojm2bfmdg9c1r1606o5le1buz04jwv5y4ttl1oovmfhg0qvbssxsi12vbvghzo3pzg7calqjc46xdg6qe8qqp7hk36au3vfeclrosydd0tfgoc4noxbtuauuh00wcxya7miclgr2et3ahwy0elfzyndwa8vgmw28doidrz9cds34gmxjk2umtrom3wluogmlt2nia8aijn8z63lilqz549p2y1nya4mrli90wammvmjzls4rw0m1x4nq7t0d5fe7gdski7854esbf2r7qn44i6kdznthqu402pba1xak4zz65ggfaq6mckiicjgidbiwo18kxan0mvyblpo5p5n75t37xzb21j2aalstzwo8cx18sevlfmslgc1gvl3q2yiei4pgpe6k4hu1eudwttae33cdpwpe43845i64k5adsmkag8pqns3ven3xqgzr7fy7rmne4h5u7cr9fkvd9kmvfcjt2v4wt1z99om1tzam4amfcc5wskk50imjse3gats19xzzqljm8ic7hgqmx6smcqvb4jqgoam44umonw1pj3n40a2v8u5ciy47w8769591p4it9on7z0wh08drvkvgmuh302hlldgz6f9t8jatfslecmp9abafbxi7lp4013he6dh3rvhnby1ge7cddnfuuwxkmlv6g8fm80t3kqerbaxceo9zcpw8e7b75r2x5wm9w6c91qxlorle7auv7730bkdvopb20qhmsict8wkaiodlp9cw7wrrhmckp2f078mg11pf3eek5ipiphwt3vimvz3qj7tzewkph56vm3b2t16tq14zjl7ru2uj0',
                redirect: '55lqq0g4iuo4wf3y4osh9e8mga72ulub36jwki5ti98r3a47v0ortamdqxhhkcu3h684tnm80u6tmyl4lr30gx9x5qrdnei4mvf4gmnc81yru1peczdp2j8tv8ij976yml0vqblav6onfqdi5n4iyzdqv5qrfp499d24zc9xnke6y69cjnic5dd3vuwnijckxn3azozes461cvgjiyvzbicykvvq0qcbylhhvk3k36s10d0cegrutntkkiqr6k9af3wcxaitxw1zupc9aaaj8u8i1kybaoegl79kcuvbdp5r16ffjobx9lp4lify76547rggmbnsdz03ucus7bar0y08s4ht3i7utshi1ufxxlp682s7ohot6j9pl1ovhinckorrib27ll2jyz9l27z4xmaa01e25qfwb7ba2imkhp6sccebre8fvjm7p0l3o54s9rc12sesitqpk6obe5zbjet6q1za2sdgn4rus61a471vob06rruz5nn2a6z4j3ua6r9yh396lmwavo7fp61g2ofpxg6f35bdh0cptlfsu4u4a8m8jit9qx0n7uja1e3s6u2nz0uxaeimtn2vw2s1rua5s1emdew0iulbri9580ctid3aqt6t2ora9ym0khnuanfbjg284h2saptbxgtt0ah729p9a27tngw33xtlgd0hw7wrebsz5ngzacx5oo05y95ic4sced85gc3hb2ch6qmbtz6bvkaoc6tnrd9srh3127d0n9to0n5avlymi9n4nqkciqxwpz3j7wipyrbq5x5ov80j6fpzhkvnb4ca97bq59et80iesdsuuluvzl9el2i8ukl4h1w5rnb9naacvolrb2ds8v9pje06cjzu1g6tcvbne11wummu346aponkxchphzlii5p7qxj1sh476k6mjdsfg4880fk38jj2pfpxombj521hvzirnb7eq74ffsoxwswzd7nbckq1xshy4it3j4k1nhjf71sf8syh6cry8kvc4urp7ypsqz0ibw1hgdivimp6l0xhis9mj1sifp5axzt9zbq2pyehmgqkruwm0xylir4nln8rpsztep90d9jl2poi9uenkeebnoef1wbt2iwvsb08fzrpa1o8dp6g8p1j5o3mziyrx8veqe57lqtkmr8x0xxjev5vwnnhsmatyr6a97wgvgpokcojgkeyw93u4kg4qy7tx7v3hpidthrxw7iz8keeful0jd17y1ophxxg629tynlsy44rdrhs6vlsokohjv5a7iw9dbtbu9b2c4kw2g0mesivfvuaky9joh30v6nxw83u1fw8dc9hyjddq4nlmyjpnvqbp4co3ms0odjfxd2nw23rvucrjtg1ohn21y89wl07s8227tzqv7xlbj9tw1m6lch8oc2pd3y079quamwr3am7u8z7otjb99199lag2wsipagdydalamup6r0ehuwcirp8uuaafappiuwid1q2r518xecre0ncij6eem4zf1324a3mdegx7u6kg6bm7pc7qpn91edls0903vesh8mn1wgd6ioexizekmvbgch6sd4a1xk3u14nc87an82x2aoa7kurzbf9trcgeibbp3nhg7i64sojl9g51klj2yt809w5x01v04xalbm4m22b1ogwvl1puapx3pkeh00x18aee65luv730t8q6w1kyeszcftso2syxltzfb3sy6imyixjel6s7xjz1ow546vyodd5d8g6vorvf39v4u0kfuurjm6hb2nkijk79njntsja3gu6q3ezw36i0vilu4gcb659o9keewcdz4nkcz2hvre32rppf8efedalpdfv1unqng3dzoe3w8lxvj26tppv2w58ibn5wnyaj1elogiundjpfx1lcdfnmen4c1ti6c3dzi97ne3zo8ioxjw1pqzq2txih1dx3a5z2iushbc7f1tlgfwumfbbwwncv10hzawym5vafwejm6o2chgz0zgjvvcsef3udac6p55bz73sw8upluvkmkb166bl086r04cf3npezetd7t55',
                
                expiredAccessToken: 5102626516,
                expiredRefreshToken: 6463212200,
                isRevoked: false,
                isMaster: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientResourceCodes must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsRevoked property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'PASSWORD_GRANT',
                name: 'ycnyfcc1qvy6m2onmyg51y7zo3aq9mwm5yqy9zoiuic715o498lzdmur8c169doo8sd04f2fa669sjg4ls7w9a3oo44qxx9rz7pho1fdby68ufu51ytje5qigg2oosojge485gs9rimkuxg1uc6y0g240dbw1pip1nlf1czfb86inipjuvq2xwhshyges7qbdgxogsptpc87efpcqaor9yk0smywuvsh6qhyrjsw9gzpx9al97qd85kd4t7xuat',
                secret: 'v096snzllnngbmokqrs8svzvgn3urynrqu1k11k1p2gcesmkvw6mbans2a1olaartsddz362ue2df0yd9sry3ndspd',
                authUrl: '3ttkl8fanoux1prqfgjuom6z3fv0xnis3nrcvv2500gq7qfxq9vvexidzlc96s9ymdr1uh0mb3aplairja7luhhp5d80f3symncogjilw4vi6lnzgcb8jak9o6481p1gspj1rwznf4eljyzmwgmrxn5477rido7lz314kgvf4y661bfqmzxcm2lkg2ysp4bllbvnyiddk8p38lcxf71yf9gwa7q3nm94iyr6wny2qf0gib4364i1jnulquporqyxz66ko9sbl32ddloe0kbbizhgcq1t10bibcoed3n3cv1gbazzawa2ttrerhnonqo3m0wzlvu6cndvqc6d7xl09affr9optbszk9ylbopm2bgsu3oee147kyez2db73t46s0cc9wi4agggcgbgjfhaev7ecwgksy6sf4dauhbxkcbs7adnmux7t05etxsmzc97g7f1vq6rj35ckjewc9kazbtdev4fs9eqrd0lyg5uw083plf4hdu7xg1vz7ryf2tp5g7yqaumfur8dxcvp0wo5v7s91dvodsfh7k1ns1cad40y0jb1ato7j0c1kbp6yp11qxzippr4mdy6fy3upmebktmsdodqhx12t1z36n6mf27hgwp7x1e5ef6j130b1j0dyovsrqxsgpbcx3t4tmko3eirg7d5q92ir9l8mo2006ntbxgcpodw5fulfcetddx47alvv40i5mtl76neblx2s4lhhlp3d0wip7f7qdkjep51ij1w33sko49r9gakfx8vl7ds6z3ifdbgct0cdcdoq6lsvd2c1z720jv08imqcqwt3mjlc2opuvqkdk12izuj4nhnqdnlvxro2c5vcx7wmbjonwk3ttybeauiqid4o2fgg54d9duu0onwqky0x9ukz50appmdunj1q8suwtw0bcfjl08nsyw9w8u6im7l9imjax937nwi47kms3gebs6acgyga78emhjfstkris3c9lkuyta3fbl00d22tmtrnrl1mfri7zgs3shn9xe2ib41w6hfozaid5y01yx1zka19256x8sypq1ievu9lmfrfovdtnyqc05xg3aozy7ohlioy16xu32j6nilzlxpexcpfiu1jkw9vlauasv7f3skj7s62d5g054bptgzof6woh14i1rfhjko4mwjzcmy87pgojv5c358upjj9chcwpbocmhh7qzo1z2km5p7y9egsctbvmpnh14y0dgo0qpuv3yfia1rzvgj456r7ry2lutamd9r4x1p3krcsevogago9dc2a5g9ehn499d1emvgwv5q1do9f0cqjqjvgdc2hkmw3vlmg2xrfjczd6ndjrosrszqmozwpoaqtkctx299ykmek2v52ofacs1dmbsxbm98cx21nf9qk4td8t95tf869tyqqz1sgzoztztoshq0oyig4n6a4lrgqksq70k4rbyqv4mkfpf88kyqtdsd8gm4c79afkgn7w8a8fv04khi261nkw382214fm548wkj5wappdg164rr1r3h07pru6oyzp9k16ziv8esq0wj3f077shoteu2mb7nyxxa6qv4m6o7uz028kohu3lqlci8ozqvxw34natdjzatyw31yl3atjkl6qdre36cevgntv155zdg06wkzfe1yy332x376g1dcnnp14f1b2uekbrrm8g8746of4lfa0k67ggo0pkx0it21yftiuove4f289e6g1wapyya1jvdyzu7gbrep64famsqxgyf4z32qnoud4ygvhv6hi62jzpmu217l76d6dow5tkiiucnpl69qxn3ecaiimjhfae7cr479wrdu7mql01xq5qzdb6p05wellrnty7mi85qshm3shlxi1fdjq0vqeh35rrubj3njjj75346jvzy92uild9niqbdwgbczz5qytpmwroxcmbwyo0g0jnd363dpbp787k998wu95796ars4px1ip36t8t6d7b3ninramv2zjimd34xmxfrj5xyixjx0q1f0eddpe2ks48e6r3xmthykasxsjd4prhn2qbgwiu',
                redirect: 'fizy4aovrsm91xwkd9tuggaa70oh38fghaw2fha3fy50cdiykyc0toztxqmmt1ewsgotey5wydlefe88wc6awtjmho1lyvwd4nvf12mov8h7plz0wgj4dms9tobw2og4z0ud48i95nm4ul6dw3kxvprmnlb6txada9clwvf20rh081f37859lb65cibqy7xizss25whisq6h9vi4mn1ohdxz1x2h7i1zttkccyanr2znsega9w0jsr6ipizq67opr8nqc9no29719i00oj4az8zlv49xwh2n771s0mw103ua6odebqldmu8dzzs1ug6dz2mg35x4q4fxybdv4f2b9hfmjbzbgib5t8lfo98plz1vmag1e3lgtet15pa1wntad4siq2p6i9qss6ixx2x4t76x54krj3st0u0moiw6bgwceqjxwixx95jmci3pf8j26pp763k7pmb2phr37zqeemzeuf7ksmwi553vbw84v6lagn00ox5qerv3athxj3mzsjmxu6uasfc9n36idh4ujtgfq53f3nhohmig4nkkyjrqd5mpugtzhtyq3rb56gcf5bnzi6bie6fn4jtdl1ix7k4by3g7bzqkfp3amlexrn5jb73chbs334uffidgdtxqmz6zjl4nvm4vgaba69zdix42h7441pbuowiwinapcuvw8v1hieyt8cujxs6cftgd9kot4i67xk4o9mcxvd57voz0uq3d4ymkz9v7woj84ee2vmag3npe35vp67zwssgjiu7vj41ok5sx4xqgqtzfdzbtaixesjlyt7o6armqe5b8gxtgolnrcoxh4paoce4eti2ptnx1pl4qgxiirvrjz8xvyird1yvldkwqdn2qyviva40xjsip5bltwl0ckuff4gzoftefd41csez0tu42bt7xrjnvcvoeod2mbymdyeufxwe54yhnp27f7p9vvq1je6hoh8hs2ezpfq7dx978tfy4noi697inv883n7cturp1tmye7ls7zybxjonkltt5b5fqbbgreid7q54yrnlt0wrckqpgru9ef9s8oe7bqfcsd5p1ql6l6190f4m4lvjvz5epknt1vdcgz15lyq08p67j6r9jlqsq47wozafjdy9rc2smw4by1zxpm5jxrtifen7969dppirk4xy2gft2zkric3tgr1vjtbnmtspijad44y3dxrh5i598egxrre5g5vw1vligaugpdw0exa3e6fd2iej5uw2fy1o1hxs0pww825zizkvegzz3m28qy5uawzznnlt7p3kyijngv7maowmf3ogo4zgh4ram0an98zcx8c3ephlg030r6rpb481chij96enr3f2g9qg4ehhbdqj3wfqsf1a7skei7rbj4ggvu16ijg7jc7upr9onqi9vqr7zmeengcksvslheymaqq48bmj0jfvpwqq36cerui0kt0enmextxe7w1hom7t883y84k9pra0mgftl6jcxklh0nuoocyv7o37qcmuwab5wi1ts52n8lcowiqvhjyp6hgdzrrbjmu4acvd4jmkdokiips6x4she58ldtu1ldza3g5elsh7f4w45ceuosof320x2bvc0wzzmpyy8q7ex7vj9z9lnop6apgmxo1ex63os40tymo5hnawnm2c1jsqnlv0ve0tmjjub0k8n5x5a4u3ldynkxupcaa2zzqqxmtl2viahin02r7vsz29gb0pzv53n733q1mhcejp8p954lrdh63b9heafg0tkc5a683ofzvn35wpf8gjog7k5zag47udapxei32jm0qaj4e7a0jzjp3kfz3u0ovjrtc3desbke9tvoqomj59kkd23h73nkt3mtwcr52it3af9rdy8nvy77fbi8m9r58uwkoem85bg1l70nst0ah9vczb94q019ui23r5ro81lnhrkex23v77pmlz2u7t3kd3x0jaedkesnhev00oolo57l1bkejcebh9soxpxs4xph31k1rg3qdio3nz3u95uelag1xcug4h8kgt7ybkr447pc24uzb87i',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 2468540020,
                expiredRefreshToken: 5920732583,
                isRevoked: null,
                isMaster: false,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'vdymoahwn7n5n57oxpihm2wsvut70lis2badfoad20p3vu7lyrfo75g3ad4f143qo6m2slk2i1gsyoirpzawxmcdabsxlkmi4fsiirjl68xgw9duuye6hpzanlgxo7b2e2q13p2r3r2pgz9srf4mrlri60q9ahifwe2hfeuye9hkc6yy331q4v6o5t8ae0pw9x2vm70us9p7haa07n8vev4f9d3z9f20psp96svok2h6n4v629hwg8m69i8mfdx',
                secret: 'xm2d5mzz4owv17zsnxbsxxvb69r97hcjuwtqhrc2xmwo15bybtn55ujsqi3rigld7ypf4wo3pgn1m95j0wepna847v',
                authUrl: 'oz2bagy0pn5yogqznbhuihh0h3cwz82h5zjtvj1amm22nl0u77yjvc7yvj07t6f9n877z2xd0afjbyvmnnpv37numkcpryan8td5o0liaurufj04ohzbt36b832pfdtxjug1kh0j93mp7a3fskk75tif1ed9s4b7wxl4ffvrw9334w47auo0knbpn6qryno5y8zejshpqg52mmvenexqp17cc5eoeh76qao4jgmkqcuml2jdlb50uvwu63l2oxxivfnkntrsiy4tsrt4zkhgewae77txqwee6oqouse833a1qofe3ntjz1kktv0dchbuuesbdpl6dzez4fzvgcz98x5u1jerymy56nx521krujotslf5lq88jsh1galnkpmlby60hi06hh3dzyngwnub0n7tyfcjr6kq890cj0ekb7k27e18z4abp7qzbq9gf2nh6uc8ye7gmi632c1pfi58klc7k7vkglz0vg5zalx7p0krlq17q2kke4dr9cbz2rcw1mqk1a7fq9hpa84boau3x27o2ytcdu9jf1absiyahcescb59g9kkbq3kitxodbsbdbctll0teoy7af32tkuz9f0v99ad43p04fgd3flc36o44bps5a8gf1t6aetx95du50qudaagcn2bu70z23x95ss54wrmme7kiftbj6tkmznboo2bn24mu9tkkk4hz6fuh2p6tvoajtzf7a4gcq08n0zconb0obzfv2o8mx51dvluzy7yzetc6mn2l3588fbl5g1f632dyil4he6tqs8eex7lrwribriookpmaz9p6cz4ju9keuemejnm3khg4bqwhqf62u4syi4u7wh8ppuxk3kjzsrwi88jwthgby3zam9qks81uxd1eni9dn5b19ijb0jfe0nrs65xw6m1iqku9jyef947b1z3uyibwqkseue3rfcahy8xag2fcn5iol3brl2tiqvsud1dsbb1s2hrcoljn26mdvklwnatub03tpphvzntw6v9g4wgm880pl63f11wk2qturkfgcvwi8gck8e8fxrwvfqublezypx2v26q0deglranj2mymapw4jtokq4sfskujnzilma9m45js9r61gacv3wf0qvpzvyjtu6ecj5u4dogeqokxr7usu1ep37sfzzkzh14778eaikpki58balb5zscpzvxglj4901vdeu7tix5jyp8hmj3jzcacnligrg2cmstgmt0c2husqkc1ygy22677jlm0vdh1t9oq29vcmlrgfsqsv4ocwg4r372b0e5mts8p0z5nxytm03pfa8mn9hxz9lg63eiksjd7p6ok7uvci0ybuhw3r6zk3ngxfwhrr8a2yeiu9hjl14dptjf4fjs8wmh99mwwmct2bx80pfhmnc5sawdc6wosr3va4p88geryiyqvi8klmvekx0o0mvs66f94ubekb2iejsk9mchyz5avav5lfggr31d1xqzfep3pa0hf9yq7innaguj1he8iqwq0wrk1w9rhsgrvakcl9mudh542pwn1oys55orrms8odot9x343v72zerp5983a7zbjqj3plx4azd8tod6itirkxfoq83cxxxknfmyauw781lww7683rdjaqjyv5vmg1zwhnzn26ubnmcr8u480q8wvbk7sbituzdmlbp2ixb8rx0ynmhz5l0i14v6q520gnfwvf1ks9sj4iy9au8sd94a65cs0hxx2iujdyh23g6vge3tl4jg2rv7i80rvd3pgs64i81cf8sdtesqu1ieyo2j3eaycm0euain385xdg4sqm0ksdxafcpbt31xb36p3jslstqnpg67eknmaii95kbu6a0xdxn0fewnvaze36zcn8imnjil9s40whmwap8dhdnr1gz2vomiejcl85n63hsx7tcw8wyprx5s8fw637fjok3sce89ivgs4zem2qncrohc58dnqzgead2j9g8bu7j751xxxiadfogoyzdtby2mllz0xp30sbdjb8kkteh1dqxknkrw5vvwvx3sxtff8g8na0qxsz6h',
                redirect: 'qj1nd0ecbjed977t23tqzo33l9set8nfogi535p43indc2hgod4xxtj1way3sucewl5m263oseve18kjp65uubn5gc408z5hx4zzyiwu2g9dcz8qlov01zazdu7hfk5tlmxg1kuo9wcenn9k10x7eerkby4awwu8ye7n0hft8osv2sruqwmtn40fqu0if8bcdqcwxr3u96hmtqw32hbow3820rakknh9nq1ksn2xmxwjsgprea9w39zdzdwqb88ezo2hk9p5pj7dsa5b8feelkecu5kl9brrwpvgm500e5sudfvg0lm5gs090b8exn4f9jfihfur8jzgiyxq9hud1om0gh8rr51bgxelav0lk4s1hbghlwkj8gdny2veg81jx3p2x0h5hlx0m4938rrhoggjx8solwaa2m3tj4knnppb4g06xjp7bl3jxlw6zpwg8g5ovb3c5b42o2fmtqf0vhtd66twhqkb4u39xchgml2qrqleayoe4dimcojvf5z2tt40x9wb23d9sxqul1q5b9czagvdxiv6gjp8miuyyln5sw8xqsjhrff4hgorgwltjprcehh1sf97wbqjdw0nrl8gkawu0zhx6k7cpav5wdmzrnppqj9uujoxbqihmsnotmmyfvc1uw444muu34htd0wzhvojnu45alsfwqsdxrp3qxoukox2zwrxiaf7qzj475xybmdq6hlib2pzvmc6qfxp0jfxle6piu29e9cm9xv11wp5jz46daa8kpan36kyx3893z5o4c3qb80sdqwms15tgg7kj4d9s75eqpy7skb3dgewq0zmpj74br5hwvyixa5cxqtes2zog1r3snyjpr4zm3o6qub95ii2n0u0vvgvyu4y32tf1xh9760f1vsyrmjlskg9522k90dp56victwv8yxrm6xvezqq83qn9brkk1t92mbziunnwdgy59868fen17jvz0yotmc9f355nl4v9ivn7r09bactnw7lrw4igaewgy6k020mh3jrrzac2ojk6qnj95ebh6hqttctyvk12u58529jix769x9owuxd1v6uq58xchbx9mu429oy7elbcnvv3fdasx8z3or1fvspwre7cf3wm3orrojlqkbp552r7ts9r1c7y54bw4u4g5u3oagw3sgkmpkszmou1it1e8k930tp04needa1y57fd8yip4lqaiffufienw8uo8uuotg7k0pmql3ty1bua7qveo66c9g2sz9c5wvukql9xleq0n082qfbkdnjxk5agnyx0ic6ekobpepczjwz5nuyqqvrhwp632zzkx82ueusf35me65jibupip5abjd4j76sqgio44met4z1b615pj0qre4oklfade21e836opm1jd4fkl82uh62z3g6wr8egb1y4e9h2yeutbqn74cj1aup3svcystbh17sqqevo1es9n52pkcj5bmb3dfqq099cjpisvlfdyp1cmlx80c2l6fverzre81b7924p7f1o63bbf5ffstpvnvanvr10xvlmwpy2d9w7lmaoxwjiht9n5zh043x2hx9jbu98ihfruvhxg3n3tytaouogscupan677qf0499nuuhhux1ksqvjeq8wk6po01s2ysh9y1oqkb839dbc2v3pa1nkp9bf4gwoc2h6c715kl9lk0bnz0lqux5ftrf5db84m4yvycmbto23hn6q4h5302rucj3q2s6pugxdl6qnvd01mxnmveieoa2p2hlnnrmk59jd7x0ybw0e2zugwcpz1239fwe0uod5xi23x3wsy48dyrdjycnwudh6nccz6o2qo01q4j66mb1bk80g1x6o2nj34959ftsxqwl4fk1i0c1gb98jtx9lh7k1a2kejjwxd5x9co735b6gcl1j378ak3i4rhsia6e6nlulr0hgw0xo4mxydknbjfzsa055ypcsghftedkpztml670pz932s3w2xx1hopr0m8utd5rbo4jq756da48qgzluw07vops3awzsc1vlu5kq0e933pjdsomt4s5mo6e',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 5820986939,
                expiredRefreshToken: 3456077306,
                
                isMaster: true,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'PASSWORD_GRANT',
                name: 'zb64xhga5zzysbasgdyp8frtjyhpapaotdynk9k4gis2uf0n5blp2cs8y4t6dc6lcqxoejno5uz0uzhhuekd7vurknrzc7ci3f143refgcsp7pow6knujhmcwpk9k9rgfxel66asv3t44kwe8d6rirnagomridhdxgeoonpxtmj5m5k6mtis5487k808uful9ap5cmqwhlbo7wgyw4b0is5sici3tsz50ln6y04tpidrw0cy3bndropeoaqlaou',
                secret: '777nwwbwbrlhashfhwa5p0hj60xikx21mceoebmi04fa0qkc9mp8jrel1db7hz2s2g7bw0c35r9cxbbtfk1ah32wb1',
                authUrl: 'nl8yno10rwqv2gktqu488qx5ifs9spqij436yy9pbqgkaure6ckzyqfbilolcvz9efg3rvgcs9luqtwyviflair8mo3l6x9byoqf9r7w711ogavpx03kfhqlw91qip8wwfbzuns8lqb7llwhpdmkg62aio3j0qrewjysgaty0p9e9xvrk7bkliqhs621lllu53phw0jswgjfxyey7c92amun3w2x7zu6g2lh3rq04h6le9ml5ek0shbk3512mmjnoix8p0arvuvw17iviagdh00seedgmw2h6y5drzh98r7kepvq7aehr03mff9i5hvd5qk0596o70qwc6fcb9oz19lrsd3ci571wc4ulyq2arzsxsv7fk18f053krh0iy1hiob9tzizcxsqsgpp0halt2cuthuvx38drene6ssfwf5ev5d7aukehuqq1rn62ttcm9n4d7rqtm7encda418iy4hqlwyfk0p51qc29xladj4tl70yb1qs1qrqb0dvlit80yywevr7fif1zcd1iydnbqt1eo8du2wrnpldfwl2ao239e9w9sq65xh8c9zr1tzp2tmyznn31aozj8e3eh5cvodz0ptpzopv5aw9zp5g7hu6739nkuajz497p7paxdtoe6zbc9g3mxcjhk3b1k6dacktd225antrtnumse9zc0li9nk0665cke98hfm3ovstmxs8xf7xzgnurxmm9qqq8gjqo4w5fzc86gso4lv81zcilhnv26xglfxdijr1f73q0v57u2kuqdi91gyd7mxxmzw7aavs1r6h6on0nr1zsettm8p2lnft74dfhj6idr7t4zd3l1et5l5hrqs50p0r27z312pooocrhrvi2m932o6ewgpceopcp9v0zc0i81iuuymb25hl1gah16wzr40ug7r14wdq5guz1nvvrovw9w19eslqrk0zgckozmf0tbk504adfsfjpafsqdd69x9v6eynrtuqq0ntxnarjkm9axk0dfcm7cg1jenxjp9uaa3iudwougzxwaz3qhbahb3dpt0w86onpu7vtpn51dbgyh14cke028pfanb9nqd7bhm0bmr0oj0fjdyl77tbovl4b8d3ggo1ii15ideblwa75zryq1hfm7v27iaaio0ij9gxktnxwxkhwhwgk6abjazabhomxypz7oj736xq42s1yl6ejexmfq2f56eijwvlncn2ymlkwk6uwnkej1oa1rje8xfk19f5se6u4yvgsynzeoswwtsnhuw8hj5y4sxd7jnl8yhbpyngnv4spssc5lmr9ghzzzw7bk5r6i4r4q5c8vj0cnqgb4plgdv2vez63xuitphizo66yavs6ua81p0za7gqjwtp7nn0p0pn46luoky4mzpbxx9e9he5dmkoo849ghx1638mowd4a1146jsheqkaerfi6pi68ugv49hsgjwrj0kxowhfrnz2t8k7zm2kjvv1datba6yrm6lqh41cm7vd2ot5dqla3xmajzch1iv36eof73lj7f2wemtmvqt4s9pdt00444fr3izh8gizylego1onxu58w7j1nrfznprjwmid2wut839sz9sd3ysldj4p3n06hfjpoxsqi373zn558xa9b6jswf2h1wrcxn6v5rvoko877fnznjyun7d5544pbdr8jzewdimoipoaigc4gdur7lhfv8cabfofvy5dfg5lwzx9gj1sq551szeh3gabcg79943s5eqbesxgu7dcpu3wb5850fp6fhos88cmyimtetz0cqiukcwtauwvs0ufuyzu3bd3vv7m9eloqoe177xetyv0ys80fwpkqtvdw8wg0z44pqmnvql2teu5cfa6zw92hbxbqiaowuhkj6aa6zojdfsgbhu11sxzheuvibxi6nfgide9bpsvmi5uqr2pr9t2957u800413gg6c4lrpnrfqgos89dv2sjoja3y1c2oq810u3gkyt7b8yw9e544y13r3byjvesthgil9zm6xx78uunc0edqgdqgicsqz0q26qwdh72bu5t1n7i',
                redirect: 'zqpxw7qsmoviw8qb37bllwhewnq5hmqw74xt1w2zgu5w9bmz1i7z4eg5eg6sjvj5an783ede22c0t90vwntwelceql2gzwjdst7e5qajt22nrmdyys747jf1ic80glr62046ldj70dcniplmwjrff0joa2av4vtihl9y3w8oubd32dil0r6m62wp5eplpwh7w13f30wgzad2z1xnu5arfdp0957bqpovtwpl9v9sh0vpw7noiy7dd46e92ew8md49go1xsyom5y6hdgraer5a51cb7za9mhd5abl43vclq4gm1ld6qy4j7ekfj66icys9x5g86fnlmicon1disip4ibpsodba653srzn1ktrbfnvan50f130yjfql729938tmurphzcv56cr5t0teq6y6vkyafkx6y6novsy0fnc9zkkzhsopu7mcma6d7pep22hjev2liet7stz8le8cj3w62cdmj684x2aixnaraewc6w0ztpebuok7a24t91jxqzbxam9kg557swdxktl88b9aevqo8gam98n09rqd6y3jknegn3316lgimccw0vxv8fa896jj314gsgaah273ib4ihqcc1ybnwxqubdva43t7z85ew9p2absjjafp1mivi4b2oo5jkoa35kyy5xozp8j4yvcun2ulp5ozg2l87gjdh4ynhgn7zrohd6j63e301z198jotc4yufoogh28fe2kjipirafxssnzfzveqjzxomsyt2ed2n2ugyty884cszkz80oq7qant6g4rg4g6ilpygzfosukmqp1p85110m2bclbya94dwlb0mj1b656m8i66ezigiyj3warh12c15ga5uiq09rdjosmmxmm27q779pabhkots9bwydd17lf664me7q0ruguhwim7i4fs4uc2ya0bv4s4hr31ad2c1h7gw2wtxq56x82evyaj9dbh0pma8ksrdmp2fea73q7p7vh1s4oam45ro2bv5lv3jil8y06z0lmg9eydho81mgpacbgpavyn73ucwkkdovslp1qlf5eq4snk7c6xkh27im4zhcubfte69pr3j5h9tgul224hgjc6t83u2dk54e1t9ij301clf1kwm7qqitnewk7hrlxuai3jzgkfzktyrb2qkntdzsbk35hr05q5ouiezlh4yj7c3yeurh3f0n3q3znsvz766prnm7r2bu2487tpim3h85cwauz1qc1at0vtex9eba43sf8fhqczg7cfklp58xwebv34dfdrb4evmsjig6cbtw42232k19uwxx9dmt2qq86wfbrwlq4ujbvun7sxn51tea5eq6hi3inutdmv0oag1caa210f2jmk13s9j6mn9iyziq3vtkcwt6swu6yh7mfkloylbiu3bbm2ked41mbew62j4t0qpwyij9wbi1dm7im7dafjpz24mbpl4zsi025zhwv8mt3s10g0cy1uaz4bkcorb4vwpvi09m6zsc741d281jin5ddhd023tytni4ic4nc4z799ypyuwrn8j7ent6w3qp35qv8q12hzpjlde4v00pmfh9ij9chn4jiz883999ll0hju6cgqn3zyobf8mtw9rugzarwshg11ubuspa0xm191m3q6867w3c8l6m5f16o68cin9x3dhpndso8nbwpwl39evleu71ninyp7ygc5wdtskt5vxusrx68daowlf8jscjomdd59xmbxs9neqd3vszzq2rc2s2ndihj9w6j9zsuncim8pgsma8z0l7tri1gvqh85g4nssxbddz1f0pnryib6zu3myin7sqgr1jo56gz9jh9v1k607w2i22anelpaezwpq27dw17czfkdrq0vvovesp8g0dl8yd57tjb4l4vuyeesek90dlia9w98mbds1rgzkvfdhvvdb10031p4nlu30nj7fbllf20za2rb5x7p2j560np1qhlus8dzou4lglay9vsixx7qcruqqxd0ptnyo4h2cq3kstfnvf527ognlzt8iw3oertqst8rt2kdp349t358t2qfmey',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1899100110,
                expiredRefreshToken: 5418975827,
                isRevoked: false,
                isMaster: null,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'jluni1sr7xeczaruu2byfqfemfkmcbd673qecz37p8ai47gbhvy12o2odpngfd9qxzgcg8ksasht96662bar80il53176yfzwqk71w1drnlxge04bdr0qc2eq812z3f14isoxdp44ay2fldppedyr1c4e2ygczrlew4hvx6xkcukl50ll7j4m9pjj0gvl7tbk4enzv962cd25b1z0svdqkeomp61f9k74l3pk80vgd36fepp0mew4j86i5u4fow',
                secret: 'gyr87bhkcnhk7askw6amdaxved0zjqfisiyn70luurqf58k0en7ryz37ztrnwve92flc9tn5scb2fam5uuhli4d4vd',
                authUrl: 'lw2y3y5b7gw2wri8u2sm3hwlmo97ojjiqmh6zaknvqlfcmr2sl6tu25rqn15zkzdr0urgscp1qfwtceyng6c4f1gfs61cr0ggp2unpjghcb2vfmjfqzcby3kk8w4pohu3evprejgmly4a18p43y07cs66afr3df6w6oi3irhnttjqiap80s6zv02grw4wgi62j28d06k6je2e4orbz3yq3k5jxro5s27r5twh8r54v7fmhiamorfjeixqdve3w0il6p2f88e9w8z6a3o55tjv5z1ye7xhrixghnt84wq5z0nrghcszo5atl90uj9qaiolaik5zle4px5jyflzadtojwaj7xnbxlyut012ti82gcpam2owi26tyyahnf2zpv6qzu8s7vk17tgii6r2q0f829qdvvev0b83n1qbh81dntuqhpjqhe7wj8ur73hjxo6ag2afhtlu4w3w3m72f6y67rd9oh7va1xkf0qq84baxi00dvvr20fpupbv19sb7xtoa5un5hdc42tw0bjkc5nygnb222tmv3o4vq1gguiem45bozbc7075f0yxaj2io7wg9trcd34xxn5c0j48tqpklzucoumnbgo4gqalccqvld9im0cd94gj40x6rwtryvk6dlx2dqofm17ebr0wxyodoh02d6r3u2l79bg9mrv1djw19gl2zn594whh8lxn1yrtj1jou3662p0ypf37d6xy5wvmagshu78l0uh29dhr0v6l8hw64g9fjcwl5an0hxsnpdd7ylobideb810ncu0k6bfgh5l7cavit12uknq8qd4scamzyupnok3m0wa4yjgso7up6umqgmm6x02iasf5gag5103rom9rj97nczez283vvu8znwargxtug64gxt9qn3qb6hhpqd1p3ahl0l4nn8zuw4eg5dmei9cmz0o7swt738b5n7dmxfjrp2e0bti6feho1ql7nrdokw6ae8xstadh12d4weq65q000q8ijyzuxvzxr11q0akegjnmbgb0wkm0jd15zwvo4e9b6j0kyyuagg4hjh90t1us9pdzxg0lqeg3qoncip2mz699z6nkujpcjgrif2n97m5i5ktlx3d17ol0s9w0rjbbm6u07y8s480ut2fox0bv6qlzb5aj999hcqqs6y1o2obn0h38qj8sa8om0rgo3nqa01514fuqv9r8gftf55lbl0c3w9sie9e3xtda69uhwuxfby42w0xpbl8chh2l7mp93jg0hz5pnzydei6r0me1hgbu4qaacclgym59o4bdpp7iugr983isam8vbxiswgj3ke0pmepky5jyfqotga71ujvz4nozttem871tpqw25w3j6odeyspn2wucn4psf3hk38zxw32cq9cm4v75z40euxqju4u0kj6efexxvjnqjthkw3qhfc9afk2goky5festx8k31eyn0uu8zi3y6dhnss5wytrk7w2wb9dicq1h43uqgdcebwxong72mg32e6gjfru8araza7me83peszixyollwn4f37x82wkf9x3rmfrn8d4ynnqxx5fn5xg686d41f1b4lc74n0x83c23thy8uyukk22wy64wd5q6160yz7fe15sbfj6jdhjyewyddvm6o4awco50iya6mwh5h6fvfppx571igfph323fdo8r9birplc1ry67gahwwq9taw13kyvwrowvpnv14rst9ntgzw92s9r26s9ide18c653m97c8szhrdkkt3euiuen4vamsk0ci47i46pspzaefeholrzz8rnra8euloepsbq13c5rhasuo57m55k6ohthaoyip4dbcc8oxqt3q9vpojt90x9ibou08h1earh7w3l18g6tbu70cz70u62azs7wwnspjcwyqdc4zjfti6ep0q27r69x680u8zl1vq3ybflyvs2rban3e1sa8ck2heedexh9ip0ge6ktwwhj7wv1zbwn06tjdeay0svg3uas0ufyjhcfblvf6ae58t3c0yzk5xyy1o3wafxrm3ymbhmmgaznpkdmer',
                redirect: 'x2col63uzy96kcqym2n0a9r2tssqii298md02dqxjwxibs4innlsnewi0qn5tnjudm4taq1hoow3hh7nhu5oj2jq627s4404uiyx1zyxwgd9aua2j48h05q03ikynltcogt8pafjqffynaruw8jmgmspp29qzvyh6f3vfnhfiu9zgar66n3wlntb6wx1pkoyt52bhyvm5xk8452mnjvnb2d3h6a39dsine7oyuy0j3bwojshgrw46gtmn7qldoczcjhjwxrrfvji2c31qzk2tj0yvz8gmvwf0euq1vtov59subuzal18yh8ticu0t8rt0gll5lkbxs06jq9kv4mctj7b3mofwe0lyyr0h3554w88pwr0rzl88tg8mnzstptmokszejk1da52h0s8cg0s85exrxpmn2jllnty56101ps6ajzbialmh96sgpt4edz3722tf0btjehmgxzmwmji2zghvvjepeykzie7q0pijkg7n2nrkzgmwulxcg7iguywgneckixg2072nrmolt89emcnbc94hn8m7q4nynl9h7uewbgsdbttcmwu2q5b72ci68ropqrjpt8acr7wh7gfa0zm9k4uv63t011m1zzeeu0pfiahniqbe4cmycs9wpn81nyczxr1zkok5f8htbeh2mfoimlqnfbdhvx00h0z0u0xaab793d1r69qkujtd9k9nmuv5cin1r1961vfl3h73x7qy7n243xhwjz05p5j73n81kxvl9j65hvbndi8dlhwd0ttby6owh5sn8zltgn132elifixramn8sxw6bxczxf7zxdhyqifil1hecz5ybjbihnm5v3m4rzkhcxvokmbqvycdgz0eov4ukc0fwc2prk0ko452nxfon5y5o7mxpwcdmlhxybtq9p2vnotpys5ns4brx0ccgw3l2a236byknt6enaw69hmt1k22h1634esvhg93stya7canbicfq7vugmlkbha8i4m7a9oeknnckog9heufpzy6dn9j7wq7bb1roeh5nl1j1m48rapltfbf9nw7ejbfbzrzmmo9pzheyfzrskrce8mro1vibs2em6b5wizw8d8hiuoxnc1w11gm1jnswyus9gf0wfzfp7vmgu4cq9j52srlqkuzi6muz8qi77ab8n5nhdotcv23dlg2ays5a24bgeojiytg54d8wyutvkuf33hkepkrl2n4bd9ffvvfnygmkl8j6tc5puso8nx0x2y7tpdfxk6eamo3sxknsrzvqfe3w0ef71ez6xu0i45n3mhbiu0g4e5u7mun9281mhj7brbqzfp2ox9pfrhd1t7k1day8xlgp8wlv6deoh93wi7dzftqlv2a1x7gt8ghfih5ggz9v4e72qdx4rgy7u5ysu3meezwqnp3cbfeqi8eheqix1pvnsa9nl2rg54o1y3jr30n1361f4qg4ycgt6vphaxt494cvkc1lwqt1xf5mgfan0g7kxqn423csr8i0b3xhdlve0f64gxeiy0rn3mrgezxlk4pqp52vk3vukwzzn6woar8gv0v3z94z9ptab1v72f64rzhhpv4nw3vknnfoycu06y2eqf9v67p98b9xgo91xswy0ktg0vesmy4nrwjss079tvb3qcc1swe3ged87d4up6slc9vsyy5rnbrlgciy7s9629256nfrriwq1qs888c7naqvi7ouz28gqiagt7jpfeevt0gpx55n5y2u353y3gcruxlt4n31ctp2i71sp7xgaxgc2yuvci9n7yh8tc1fwffxu6nk1lqho56jnqhz833su8w4soxabkd47hzmuuohi0myoz9eb8nwtzl55aukhbhbzy4jxzstq2zl28t4i0baoyykl4iu33ex0p3o9cvvqrpdp06jkp2orrxo7tvgujreg0amwqasod5u905ejhoo4j023jlso8gaqko9c8ua2hy5bxcfpnej4nh9ldskj8mhnhyhhc4unnu93jftjyzy0ybfbrr1u313fk8mmgqc8gfigow1p2b8mgs01uomwg2s54wbts',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 8193441746,
                expiredRefreshToken: 2833588666,
                isRevoked: false,
                
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
                id: '64au6grqhvzk2rrgw8b8e832iaoilndqzs2h4',
                grantType: 'PASSWORD_GRANT',
                name: 'oagv7uhy9gp94yykdz6lr74zdql6xgt9mxta0tcdto8qfduf51y6xtdte9sf8f8jie2xucqh6e7ame3vtk8odeyka5ns9zm6cjn09g2nl0p7r8fz624pqavf59gvyw2di7po2jlxhndatgg5hdxcmgl6mkxaukbyko3awomlhgleeky6h5wrrgz2aasxkqcmn71dtmhhr61ygcv44upfdemvs7nchalwsnpv7302ooq558h59z3iinywhu3qp6w',
                secret: 'm63el94spsi97quwdsmpzhldgnay9ykpyd9v1r3gxelr46fl19uemwdjxxxhwuif9tx0jz876pd9kq310xawqm4mjv',
                authUrl: 'yqqbmqc6v4by0x4md04k1yh1z4jlgkdphr4cug07l4dsjsjy4mxogf9dn3llhihticu0budd3e0u3h0swmrd4b0nshjx0ujom9w98cpw4ggtm63crz0sg4ctn825lwe8e3rlonwbzrfpke8a0e1si3r92qzwrt4rkylao6m3id1kkwd9az7jblnhxxznpjbtl3ofpxkglxkz3dvjfqvm9414ocv94ua0uzchx5hy4bnim7oy5of1jtfnobvmzy2xirwwmpihn4pb4khno4vqg76y3z8x2h4dbhz6jwidxiblhzyakhtovgjagiy8rzp1o659tinzwynz955mlkpnk9v3vvbc76uuumznq9aviuyeaghw7vlmbkh3ta6851m0l8k8szbnshx2bvdrh7l70ofxg21nfywroeoqtex343k6oerab140c0kxd54kmyby5cobti6cjajj8j30bx8yq65h0lin7jzkdi15w1q6ka995fbqvevcq0e5050drvl6pr938x1lv2ewlk7rk7t426rjcad17k856e0bqcfclkppx3t7udxdc7wrigqd2nb8kzhznji7rgwikpj22v64ph2wzzvknz9g68eo7um3tth0p2irxw3umhq4v35g0foeutv6upg9kpn3jw7cvpfwztpaxkfj50xn21x2es3xxuqnswk0v86j1x7m0onef54imthmvxjff1nyekh3u0kkvnfw3ixd6dfxw9xcp5rvdp3zlk8jr6z392pp9qhq1ukjghdke0gumqayfg76rvqpoecuzn7mvuj79vpi1rd38z1c62d2vjvtzq0n0yrh4y5us41z12qfohip0czyqci8gt9z9sa234enffjcnqfpahgsuv1xhux24l1x9r59y6hv4lbzdr399ri33mzh9ua2t30e2ksfkgruo30gsre7g96ktr9s1dsvbe95ergph42ivdkqrnpks0h77sfgli6wokr5zrxktttzrevuktm9sd2f8m78xfsch35vysfdds5c1taar8uxrcz7g0y12ftfm0dli9fcoe9uomf0bwkygh6ilfyl7uluuzjqs4dtj41536z6223hoxroq71hk5xh18rh4w5kuli4oyy6hv06zxc4ixcryxzhidopj1h9fata8x3je54ahi230k4hz9e0luijl55i0y02e0dmte3cot2ci685gnvuinyvmchjucjk75kep1wscgxolikra0k3w1cfykot911xutf0aynbfzygzmh49q9m6vwd7ng1gxlpsjvzi3ov0qq1iq9l3towxyv14eelr64p1ojfrgi60qgjfq0d8dpbsc7m7zz9nl6iygjd4q04400tpdera52q5lsvy3x5zepznyzaaz9ivfqmtlxcuyq727varidn1akd00sp3w6lwec59cmndggqbq6i9wys33hnmakyhyq05lmyz7phrj0wy5gzyjbhoevjdswdnhhpko3kjpazcsz6j3yynng8b5x408icdyxeyp350qap6ucc7upflwplxzten4r14bt2noy7bk50oa6496lzsigv71tnacyc82uzkwf8wra4ij98tuqratfo036ef87qwsfad64reojboikiupwc0thyb2kvj9otdbeboq0i1mszkqx9zzp8ejafhndv8s37ygpg7m0df9kxf6ulm341busg17xkgm6yjuy7lhkvauspxi2gzut89q8k74l2qah9lueou6dqcg8akuok6o8w0qt1fwyj1f8ghfi35vo6gb8m94lsf7lhrkgnaqjjh2wioabksutts964t9s20p6fhzuyrbipcws8zcooi6sp8g2dcolgq09shw6mxyiu7zw82bf4wopraowrkqdrboymso6cdxuo2f4x9cnbsuc75cltgthwg953a66w3d02nzjeboszf75hn6vheu1d2iik1t1q3kkpvtmkdxy43i3g2he44xf0bfwk3m8oriyswh30ix5ydh4efilbdq3eze4caq28i72egbuldfz6dqkzcfm1bzzsl02al6o8dg8c',
                redirect: 'u1zm9qs5fkh4lloej2loq3gjm6vj43541xtiblxkiah37flwphflg1r1vf1h8o0wx4lor1dz5tevq062t1rf87xx1rpyzhbl744rb3y6ydz8bp3q6ag10di0fgnvuqfo2k69p8oozn9nv9164g1ls7le61zwj6rg6jfyyanq382el99hmjjlk9aacm52dcrglyq7isifq4fyoqtkvl3tanq2b5jk2gnq15b1zhvvwq6s8tmx5ypvck11jnnjs796byh2j2t4afsmago2i6wv5lwvoz4hboriodjvmy3nv24wakx8dwowd5rtz3744tbifluh0owczqp4xeh8baw23vlbut4fw7zw8m40b901vrtg2bhvtot44r8l835klaz1xbmghqmb9hsgy4922411oh2fi8uumekijh7i0ctbu28qv7gkmcel7astqr23wabxswuofh940hek5aaed9v54mgpgavmwby4zc63h1d3uuvofk1shbku6hxmzq2lx197b8vzzsbrvixor8qhoaqob02rtgkwtgcmcpr1hvzfp4gop7m7fktbi893qky7voor17oezt65uex5x0qqyowsa2a9bcp1ucx2p155ypah8j3pspda1511acjibdc5rm5chcu3uxxio3l0w2ue0inpu40s494m9c03oee6eautb1faqjwd012g0fucxfv565rlidw8g4w8lg8pdfs2knstmhrhebmhgqbciz8eq19c0smi50onxz1dgwhyy2922ibs2v34o9gvltx4cns4vafkuwqws0jpyfelmppmkum6fzlsmfbep9ny8bese6yp3tezs7mmvm41oqlj6qh9n7vm8exncplb5ploj562ce3ue7wzohh630wfs6g3qzqdtvv0zvsdbxjbovdlydon6w6sj51lxpcmj6frx5qx5qbyi72uxw3pq5ym4p61g43214odua5415emd9o09qc9s9h22wow15k4j0a0tr83zrmpj2ai0pq8hza9pshaefbjb5d9hgw1y5ywqbn04u4nowpltnbnaxqbto9hwt0fyzjwjw91bczfn3eyr5l0kysg5orvyw2lk42sg3d3vzidv4kz7b1ueyws0uufrzdr3gm1wapsksq45uivnztq7hrkw1fhm13hvuhth21ea1s1izrzdj435zjz4j9a46uwurbjk19fjlwrn37rnrdngf825fu9nalybmpbja66zw402zja3l2tqt93lj3gollhczg4p4dly10c74k4i2wwr3rejhwpy2qiyssjah19uno3s5d4gw10ybotqdcom7nbhsp7wd1y6eghetjg4e1taf0m30h8a1wognxct4uh0gk30v1yinjcrxe9fogcjnjw6hdow2xmusy3jy0cf1hqf9jitbudwv9lcc4j4qr7xo0gq9qh6eipd7qh5nq4a03l4j5nig3kp9v0sxa9h711qxa8xwo4hkm6dsyao1qi8jq3g8nojxagv1j1q0stlarklklr91z6388pephc252x1u13wap20j2tk8zkelk5k3qrdt194b4kbr8c8l9rjluyp94x10kdgwi3tde3ayedog1rl5czuhnrnulhmtx2b29ubp0sb7z0w38y54loxph0lobyw9iljr553its407mmz9rd5rzvwdtl6e78llawfryds7hbbkdbh9xpjukiyx4ozwd6wbyw4ry87pdlisghlkhf9eheuu3xbd73ih55nnkz50tgp5wdsobcwa3tvq43bsh19dhz2qcevmvs9t27ksku1kfltuapyfkq32sm8g8sjimm5drjkum0yb9q2ffcoroenzyfmgt2cbki2xu1rs1l5silbpcyomgs86cbfhfyazix9zrpussfe9gkvyqq32v3vluj57stiwvp3z1copnm6njv72qy7tbo6tccvnle3dzwgla6x1mfbp342wjai239hzdzmqvnev714951s7pf74py5a9d2cig2tbg9doa249ql993zu8w97mr44xuw0k4qeuzn50x61ydksrzqfvvmpc',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6181466794,
                expiredRefreshToken: 9221016134,
                isRevoked: true,
                isMaster: false,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'PASSWORD_GRANT',
                name: 'nhomi6w49ro2ac0u3e0t8429ugfecfniomcsodgtppb1ead8my05hzrv13wy9aesci29yool1u5isn2s2rwlhihuhq7w7g3nucd5zsh8yjfgkqbtp912t9kttp2ivgj8m443vpgpz4e0mpczfvdp62032jl2m74ebuynxii9pu5z9z7sb7d9heuz3y0xaj8ntomdwir0gpx2tvzqrkqq25f8xwnex5va7218bgrf252ru8zyinx42uxkoveitco4',
                secret: 'k1a3a4y9fgftpawr395cc2jq77201fzh7ugv8pwsoexixiwg2awazycpjqt3npaa0im9rpciydxotrbbapus069nnj',
                authUrl: 'm63jugrst1pwaz2je2uuhjks4fxailvm7pmbvwiyvrbn9zc3k4gnstesrmd9cktev1196o7esp8gsdf90eggotchfknilwfpze5x35nf0krejfi65aw9lwsj0vt62iorgp847i4bsrrch8mjd309i5v374xh9slz921mypvxj327c8kc02emdbc34qwebet5rpn9q6o5jfmv4yyarsho2riiatv7gnv9amh0lf6d2apm75btaxobh55522lt0ove61pqk79lm4rhrygd4pxor48toqtn8w4hqbobvkyp3pq8eebekmavzikxcwmdlu07rjk1ftfeu8x5i69rx6cne7skocetejgcx1hbxuv144lyuovpn1d32fvlsxnnu8fjoxawqvez5uurskj0lqvo8zgzl786k8nazuf1tcy2lf05r8z00j0g1j55mgan3jdlq7v6baa9hlyt6rq4r0da6tbap8x6tw4ezev92t72ff3elxwrb3cpr60auebcj4vz1k0limgo8fr73r3imqx4h66ll5zstm9z913imt3f2n5fy4fgglsgfoqg6as53rtbxjrv7n2sw31e831tt4c355y4w6iant5z14uloin46giprmtz4bgh41kh5ble9kd1kxhgoa92doxovj87o01wqbke3nbffgcd6ixquxamwodgko7zml54ygewpt85e6salpnil73jrvrsyjm7jcx91z7bxm9hzaebzzbo7pde5umvz3ds7arafrk597jonaxfu0f0gzr7h25ibvqilfnh4654tvdtqatg96re1i7xpp6btoonyw1xqoqheokse4j6u4vs96d3snpb42leqizn2z3b2mdgz95jhj4goaomj6y78d4ibxsnvwkb04ipuyfba86kq0mffiuoqz64nlxhejwm6bg3pi4k4m3kdve5djfezw35586whmv63fr5dntrva0ibfczfq9mqasl1851tdgkgcpesbvv98dxguqxzjl7jklz3mx90g8mn3h2jq7enam6hr1okftfv55fcmnhypc1w70lafijmbcd7zx3bg6cnbrg4jkhn5hiiz0w5xepc6s4ast0ilax7d3n7le170jmunpeui32ragekvcdwug5xatx1jz904ywot1jknx2zrglmum3r4xu7lb767fzcmgsmqzmulxfe7jy8n1hb2tem6uijby7vfy19wmy0gb7h80eohlx57nzrrzk463xr2pnrnnlhbz2qlfub6mjkb9fs30m9vp8uxjko1416w2khqfrxuu0ewpowcu24knxaoku1j86r5nal25d8j6k2ortu7b7b2jrfqu4g2x1nod7766rf5dzz3qs74qshmk5zvq960v2acuj67rt731g4uc52vgvo5crj5xywqd2a2l835knc69nsh18f8dbkz8jfmbpagjtwtsi6422cldi8gmjyan3ofxxrux8b2iadjanf68qix6p9inyd6obwgs0r3ugqai9uaq2mqddjib8d7zncr0utmq8wt1fb2e41ea6fznm2bb8yql2ugbtiu5hstewznuu34n9jlwacauqdn5a3q376tx4is0ogm252lsf1znkzky1rm8gyz7y5uc6297o1zdwm52fy037k96fahuv3f4i2sqgu2v3z14qupw53nojo2ishr5boq7787b0m279ujvoinb7k3aclonrfr7w7lczd3r9o4l8gbqoul5y96r4ipbqa4wzucxytuzvvm0ourab9x2ree24yfuzeql1x0slmqhvs1ip3vbtx7jteecwvgud2jiyvcdikh7ab7ig4oekwxfukizyxe9y5f271onwv4zjw4kkjlysbrwgiswnva9bodjhqo9whzs91ma8sf36mpx85maz1158i1ts52ppim9du0pufrid5v1ws8dhqv3ushiqley7sva1nnt33ibsxov8t8wkp6tk9qp61xtm3w6zkqdnqyp1btlbpqtif3xjtoh2iw9wnrjctnrext83tt0c8v6c3l5l5spwxlmsx8wbr7v29le19vuc',
                redirect: 'xp88no8bxcpce8cpssaurcnaui7xp0mbvu4lxh15f8oy4lgwn12obqtrwerft1b53davj5mqnyics6zl0o1f9ltoca0afeftm78uaub0b2nkjx4omkjd7qczmtfpmed8iwwoiem86fjuccx1ustycv4tqs2tm5lh9wdsph8ywhncplwysgfx6ds3f1a12jkzvdnju5fons2iybvhnixa6a8xqle3xosut5pix623biesanc7r6et77o7bdcp0f419aj2ylv3wp81ofl1ogo9gfsnd917zzb2agg6gwjlj6vttoh5w4kmkp8pbrg36lzdhgv25yb1t1k9qve8s76t82vgfdnj181rva3ijct7vcd316ao75d8n98gw3ovxkggf523t7g5ogcvl1q0obrpcoh52gdxwowcw6o68emyqscw7n1wjpdxjf4wx6fgjt6efxqqhageu4art71u7hhylu1ezrh4sjjqvmsq8yh241dphhtmliuzybgogfug8bj2nyeue2soquqtk719wkjs33usdwfvt432248el613xcc4d515ax6ca387j9opxvnt80xfmu64fsak2jiicpk5zii14viscl8xwlrby6mq0opuuh0o0pgib7uk1iuj9zkj197ig6krds2dg40bi7vhub5468wl8zywz72d621aw7hgs7453prl5x7hbj8a3sz8r5lho0x1pdgzb9kilwfxzgosq5kemt1u7yv19vu5gzni799mow2delgbjt07om9dnyt24ddhomu5p6dtdckr3jzbi8xzl6e22s6qdqi0hkeb7hwzhtomrus2ibylxftoi4qqfcdjza5kbgr0x3q3d1r4kgdi4zw4b7l2xnc4nzsbo9manselm8dstwpb824zyea3rhmdz7zhodqnmgvn6shlplrai8aqt8x4f51bx2d2zupxqwfyzqolwtvh4lmwvafuooapfliucwkjlqyv4agxo6ei1ppvawur6fnsb9hchldkt99ffwlhaq1raclf5ci6725uk3fmzozfubvtvcxz1jk2wdzswea2gj6xj2yawvyodlov5gcr41ddl029un6nl4v9b0rxo5jaj79ot8wqlrok0silwe5z82b9fprw2mms0z8yvgsk9riekqwu31y5yfad15kd2x2j8zma44z27kc8pl4uq9pztjtdsaqdwstwb1hnv8vwoj14top06z8vyf6m51cwu9g5dacssnjh0cx6eo9rt50eoehk896oacn8kfxms4uaqk2dcwmr15wdgqy8lxugsgjhijdpulsq5lvdpumyjqxufm1lq2bbcb8ppq2vq14ibdybe642817bk3vuch4dr00nqt155lsriodkv3b1tp2dklqsv4e3jm3s38bijlrdcr3x8y36swsanoxba3h9dgzx3s73ua29kubgc6zv7en0ln2k4pitaul51jlifkx5plkhlwxq4r5x00c2aumqqazmfacjco19l2w909go0e9tv57uyhakb2epdb2x3l42jeoiyyd7a83d576emo4yb0cmog8zgpesf2aaupozpfyq2bzug3caole69ghbngday5hzy8u3zphbv7798hq5pyumk6v6eu27w6w9sd9f65f5s21nms2mhfjjkl9g0tqj93f3bu50lmaoxosvky9jogy1fc48xm2gc9c7q7k3dlju8fpwx7qzwdgmmd9spm8j266ebft4jk2l4q19mg2i2i9w0motjkehs78ip0hmr8ci4znvvzz3fspxh7u72gvc836f1g56k7r55b68u5mhxd8jhte8bgcxf0pbljsl6rf0s0g8xe7cb8iud0ak669fcmlwl4bx6pcy26vcm8ohkq9q05mdca00q32b1s8dd14pqie2l6mzz703s408i8nsehfoqe4453ax3avh3nsh7lpk4kyi6h6og9nj9l830v1c3wbkvkmnck9myvo6d2a23ano1doc042qbct8ubgfryr4ibi2n9aasqyq95c80o23jbfhxq7p9xu7qaqo1qg7ebxgof4s',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 4867472813,
                expiredRefreshToken: 6330907881,
                isRevoked: true,
                isMaster: true,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'c3p78sinlayx3vjl6v2b55rv5yqftxsn6r755nfqij5zzkpcrfzakvnhu77cqgs4gox3eoxr8gvazsfdysmdxz8u0h0ht20ghhvn7unzgan6z7w0t87hcl98gocmpkjbtzlankz3ei1sooelypvwke1ugg6j3p29kwi8i0wubeynp5fdr4omw8p09oroxap9gx15ipurswla3imo6a17r3mwrpje0ow7k79ix0t3r3ldnw2s3ki3bg3d6ayox57',
                secret: 'tzrjzejus3f5g91a627isdimiig97gyl4v1ye8yghao946hm5sw46f79d06kkgd1k9z2hsndk4hftxtgbkt8i2corga',
                authUrl: '4nd0g9sbcnmwwihmz6vft1xokeaps8zwen14ox7x7cmlv5ao0rs7ej5edb4twlq2ef37zeaursabdbtwemmskzgez22r1oqvc8v2kk1xqz3ro95pixdw659l881dr1fcozhxko4mstefc1hwzazl8ku1608vo891biapuvicpwynn81bai6pyo62t7vns9sxxjidrbe24ejv6hyz6ss48gu5oamwhethqvwcvfyxjcm1jg21ii3lkq177pq8eeg22z0krt8ldib6f1oeudmlx00f1fvscfg8o8hj35dfw777uonk0d56iheymwym6jjbsh6sx7d0sgsu4t6d6cjlj0d3p6xpc3huvbctuqasfmp7h3simuze5tkxvxcsxj2hhtsjh9qmzhu63qv6og8gbyu6gqi0euzukc9oiqon7nbbs1i456r4rfj49cjj8p3jgktvjxn2466o5kobpcu39w6c9890x7mpsr1t8rpx5e4n5yi1m2egmubm92gek57eu65k163pvrpmawpvyf0hxlx172gi7zm4zboez4r4sijaadnch18r8z7k62e4ebn9qjpxz8lit6n4ozfjh3shkmznq4q7dqvzs1mgk29345ee8mj4v1uchhy969bil8c3nqtkexx4fhsgqu46o0x09dmw1kfom8ag9o3kghl9t4u61tlrk89umrhswzi2ck77aovpnfty767fy52zcrqxbvckbwxfh733myahd36hk19wlsmzwiibxjhhmkjha1dvkwva1tlu8k55oyc6ku0ba0nq9fkzrmn11z0q4gqbn57b2sao1ef2t8lxrgs0qr4ka5562oxr5pivcirt54wvwopxejsb408k3mo4bokltkhy22ve2cj8mbc8i6zcd7j19aedbuxkrurtjsxtnsle91lwjrt5icm1gmk407cswjnimuo7vana0icvggykjr7vtd3ba6h11icbtq48rwepkioqeykc3wa4hlafbw6cwtquu5qu3iqi3mrwikyc22a6hcp7e0dhy9yzo30bvlumcy5fn79hrhk7xwdtn1yjpzdmwnktjqu34yfz82us7euiu35cfe9431rg5ikk8soaputxk42rfdc5upji2trxgwl545wox5ntnyu8dzjmj16j2ggi0formitznq7v2mjdalygq8azf6k3pruu4c5rdfves9zlt7z4bxu34miqttlspm8ytcc502zuwlewj955u82xtcie025n7xwuezrtajv7mj715rkzwvx0eq7u6k4fos7x7hwykiu1vylrrse9fj8jzxlfb5t8zimiycosqp6e156x07z4vpjie8oemsanajmeei48xn4ngnlh4nb55x3n4pbvaw8hffi4lxv7iyutkw3c98w5egixjtyjw08hh0z3f0n5nwsuiam8jvgl0v9uh259s5ory75smhmavy1tdvg6qvnu6wl5tr5vhp51j7470nwmhyz0hkty5phd3xi9cxy9zdps07lqon2ibi0altrnxbwrvflfyzhyju7n2w2ioyzb8nxzmdzw893qs10i95524b686crzrrq2davu3d409b91m293i0qbiqrlai9malb1cf2qfb400d1nn7l32wqoqrlb7yj471rvs2o6igxp499127otzads9kcp12nfmpl5n8tzieo6os9myoc9mcl2b018rdrzfk0jcewelwpblsiyoszwhyvxjsytgdv3r1hwuntqi4otbeck2c4lq4lhr4tasdyf5svthcuajaod8hcne27yceqg2f3hlytphuon1yru3d42ixoh1pkv9l1dh7yaw0vgmy75y1o0vgnx6b9dzmxl4spgsyttzk5t00bisck2xsj3nhmqxgdn0zya8drho6t5h0h0kn84qc2pofegziz68p0rhdeq5xohfoaqn4szo0bcnwh9thu1i6rwcw4e9w8w2qjryxgj7isx7z9wymkyafzl230jgnuy9cvwq2fbs2o6vacynoedbgrp8kyzrbcrlh53e4vk6ku382qlg10mwscs1w5v',
                redirect: '27hv65q014lxbclwsk4ywx9bonlpopfxuhsbtjyujgiq4p3byotplgl4q29jnnl79s89h8zlfr1mggqkassqb3y2ddj0jhw6sd30pm1u8565fzn2ovbh4eaxswmqqpsfmard3em7keavfi581l5w1l26hopxpr9vjyyesr1gmwji0a1i8i7g7y8knup2xbab60lnrc7oyof3mk9u4yzch9cxfwd1f7lzns5kvjsefh22ejz8g5m2lqk9tx43fs89l34kqcen2wecaf2j227d9lytmfq1bythbr1938gbxtobyfg53s7j6as3zanruahg1bw11nel52mj09arzklvvssp3fosdivd4enmsbjcx17j8f1ysctxylrz2eytl68wxjt8ncvyf49zby0ntss2akb66suen0ehxblu376pnor75p4y859cimrogt5pmay5hhgltr4ymi2f1n82dg5gwjyuzslcomwqg67eg19fit748l7w1nd0o881uvizwiscwe09uogugfgxqnfa4w9caeepdd21yihx9qm9izw1p833p66ey6q8q400ymaxom27vz5h367x8rhwvfe788qzwexm43jes56julp2dni1hi1hdzm37v99ariw6r0n5v77yokuvyfby0h4y6wt8bpchp6p5vgt0skd9v2s05evphk0j0jl464xoukt6mfcy0t9u7p96luwonc8zi81yitq2gkgksfdl1o4ivu97xh6dzl9btslag3aleynv21nl2ua3q5n8pnovnfbuxmhqgnxon6jxmxey965xvvk8sqzkhu6wsclx5c2jbz182kevjua716dqogsqur744lcb251sy6w1vwb0g35l5a4aflgql9xa6vp8fje1hpv8bzck6svtm56abd4mtqjzvimxe1ui0q13mo6rai93155oos7pjm41bp5ro1k1puoylp6cpx0p4n5m7netcllnh4kdleojl39dgedyhmzqqr6ud718zfg9ygt51r44g5va2za90bsjq2qlflhc1q8cvptpg2v5cnt44eptm9crvyshhhev7ak05sinwq8qr82atp734kslp613z587z8eovqjx28jckpnc7nxu27a3ej8fmerjkr6jkuhdd4lmcnarze5c2nv0tdcttsu5yvyxkdvaer8o2bg64gsb14kvzarp7j6zxloue8hyng4psfmhdljrmj0yky8z2oom3u1ziyo30i5he1bp1636nnwair5pmjgb70cz2t0cd08fwv1wp3oudjg9g02ibknopbb7e2xv4kcrfw7teyy9ynt5sa367qkwwd7spiilaqxos9kk0vyoapno4oduqirm3w8kcklsfwq5j0z2w6yc38ni8uxsmizomoc46h2r84sonllwiccmuymwq8d66p35wn6scckvfp5gcyqp9h1ysckcqtg51ktus45la9lm22kmxmrcb9sep2pottbn9mjkz5o5krn468lnurd7vjo8jt5guufb8f5sbzud81r60spfi9qgcayaa11z6oj6tct2p7hx3o3de7nyvssf34ggwzeev11re7lgz8n5mqcmfkb14hi9s0h1zki3cf43klqllfdol5fiadx3gpdd64mcwaz92gwsxv63i4vy46cpdo5n4xa4goa3bwtpyeb9z4uygt61ftepl5c7dcng1gk6e5mqyrjkf9sfj4dhuaxgb11k2r24sib7gocbc5nymhwzkft1r9a2e8h74icnn2780tgvylg5vf5fc3bepl8s29t13mwjzn4woyyzo4mdunvnlvjho8jkzmj02ow3etbijuj9f5seb9roacsfyknskurz971b8myo6mgyqdmbwalam015wdiv0wp9ncz6ihaqks4x2tcnvrjtp20awaxdcs8u87ltl7kcmt8lk4hvq9amtgbamsnfnwcqdt0nuzzm720o12equjpouudj15iu7s3i6fk1te9cu5mz4ywytznsdumxiubry3kx2p9t9rezkdi9h9io15akegnthzkoovugj9yg9ypdpb0',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1719612397,
                expiredRefreshToken: 5312179712,
                isRevoked: false,
                isMaster: true,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'PASSWORD_GRANT',
                name: 'nhs6z365mafgv49cij3kkje5n5jijb5nj8t9ib6ycdkeyh95bywuvupiueux1z02xugih7qtrbga6ijtslitxrpztxo8pwh41xeq5ywzlsu02a5ryes78lg4ejksmw0n2lbauwivs26q1zoq0nkexmjoaiy9g8cfalnsnnshdtkxtto8r8uy6p0vkfugvqthooxx31wv6ml0pm9yellu16sp4lhjiz37jah8y6t264pe9r81nt71p582imz6xqw',
                secret: 'k7juakm5x2r08ec4coxe9iles9o423whflqqjtyru25voki7h0elprhuhdgs1qrc8atstpikv94zqhxg433szmfo3z',
                authUrl: 'xmgd06atxz1l5ihdh528r16tsl07rmsfyzrqckbkziqx27gi6ubmcntjzqqv5hnuyl16fbyzh0xb43x254udctpfevpf81upx2r6xw3qknp2t2985lgmfkvz5yg6f9h3dao2fno1jwwh68hax4l3s0lzer6wrj7uhxkw3esyem7do6wxiqrf2bbo8z3t5kyvrie8n3xeoac5eln0fo1bwg0q6yi3s6zqktxjrwnllba99sv0q6i2uk12yzvllvv7lvnc6fmp0tu4c5vnnk9g1st8vqnqxd4te8aas2mahk9iv5wxgygps8oxj7zjnxt78ualfx2avc1ln9n6xjsfx1jf5vcn3nxzcfb4flhs4bf7utfs5gk4ecmu6o9h9n2h9fjfqh6j2i8b4t0wpbpzq6dm3avvwel4pf0y1m0hozslsk7jkpe0731eg8owg2ewj6m3rrs9rxq4n4e7qlimjlxxcr3nlgebwlkf6tsjajnkb8rpr42dv2rl90rb55ias2413zptutfzck9ivvttgehmumid8qdjielqzginqrcr5dcmcia4isl1iklt15gput0shcdxqk5ua98euzxnetm2imv8hh182u4wl6h7o1z7wypiml9nocapha1qe14slnej6dlvj8zeuvo6tuo3gx9js75ygh24z6gu9ox7tvouwiqw0977ozinzs99eh5av9xz9gzs7hxxb0m12p4fu6grkdh2ebw1lj1yt8yr1sjll41xprdeb9w3yfjq9ygqo5dljtirshk530hkde9fp6x8n89ujrwnvddswdlqxwjgb4joiawwt7qbpactasnjbhtqusmjbs8skx6oxy5g3mnzrdk6ro1quharotzruzs8bcb9kfgmkiopthhjw9sgj2056ghdvb6sos8tmdycviq742vodsinbsz563etihy3k50qrp6wgb3o9i7yjezejbpk545pn2d7wu5vaacvh92jp0ztwxiv2hu75er34gtz8hplh69vy33oc5xg0ldli9pl7xif7pq9bhbrdxbdf1rc63dc7661r45smtjodsvxdukfom5ag8nj8x9emhfus7qeyedcj42s2o4998y8qirvse8j9wimjng580jgnioktpmoxzmwbhteo0w6tug4yo6831yik1wkmf3tn0fcl0ltgil3n6da35vdy4drrz6n8ix09v0zc3tqciqhg6wnwtiojdnuf0jv6pqcoghe1qbgahkvv21yhhkz3p1mm2qg49v5mx9nl52z03wf3hjk4wx8ivefcn3v3xvj0uw9fm9lbnkoqbuuj94ji8pcear1f1xp1m241pid110x11ro8gjmt15jjomw8riiuncosdqelm1phlj2rnqbe7gclk44adw2v8hap2bjix1ljvjbbp3lbja73l84wnhz373b5ayz6ste9uzwibuy32mu648zeb8bx0qunh2832tn2zce02e6isr8jqy8avcbu4k3yxq9n7x7uu92uyijiio1zx8r1schk909oyl2yqy5s09ja1eig63d9afdvkwwrm24ob40vodfn9lprfxwzg5pxuu4qmhgqdzdj2gudpwwxk9fc0ddevbjgp5t0p8pgcepqnrs5l2d2sajwhf2igfidnc94p1852nd9dhk4g06bb4ln1yclg81tqpu92zo14lxf4p5xfo875l8t1kaup58995hwtg180z0rdfleoen1uejid06kk3dmzzlbws4y7kjq1u7hrfty7i1q6jzbcgbv07brpk5kmhm1z2ijuyrqeygczspahwez3kbmcnl7dh2696dk8x369soqsjjw9j6qfmamgofad60ayq4z34bj7569i54h5j7xukr1vfbsraq5kvmqncxgz11bvuunqqauioxmysv2paucnchjakwoffc1xwbkivefwq81k69035hf5obqa5fo77qqgqa8f4xd4z5j6b5kufrn66lpn463auu6c2p97xqq6c2nycrldp49d4bu2akb4jy8ty7gvygoau14m3a8c2y4tmrj8fdoyf4c',
                redirect: 'k3o7gwi0gkuhtm9q375nczgg2sk5em0sg992uf4hr7u73ldpz0udr6gkxuwjbwx6rcsmhko2ycyru8ohvgcuf2caakn49ct7ualzd6p0379ual55ia32xaps57l95wrldsu6y9b7pf6umtmmw5sd7527862te40n9fcih7t2rxonbjo1w4j88uid90wipq3h6f5uafkd1oymlodtjcjxi36p46dxbhbynd3comuw4n8eiiyp8fx9inz7uqmcaa9lhtz3kkk3ke8niyaxlou9fz9eetnehmvbj8qvqu7zu46nh0l71czq4tj70zxh6dlbiz2loch742zcjy76zb2ss098uzsn42hurqa9p1fi1xi6y7wq4xcq0dy4ozgd6zyx5w7ez25sbncpc8w0idvy0ktadja7gr9xgy3la584njdjtpwotwat8xmkpqblbfpw5fap4024cadu0gs76dfr79u6x6a9j8rrymvnpqy6g36hw3uq8refw508wxnwzmg6xu2kqko86cskwln9spfj2r2viplzw2owq88saga4hdvkoimo3a4jtxow0x3azezhyjtvedkh5euvwkyb1qwdb2wvsibqs36anrzmbl69uq1gkcwbn06wzhvjiku22t3zpsa9psl0f2fxbtof7jb5ztovd527w6j36wtn814bmxlx7miv39858avruvp1jnzf7me95hgi729cf4h7qlyo2a89tk4jdhw8spc6nq0ry4q4ryq0i1uhlwv6wn9ms3vom3r5k0dl765ck7iu11l35jhhxi6p716rhn28kyn0xrcdqg5kr4o8ez99vixr90wzl4fc58konz8zwuy9mvagt8jyfnyj2zga1axv5elwo07gomtt4cenvd7phkkka1qjkas6fttebs650gimo1oo8018h8ox1h3re7bridtvdbp2yoov4b94db29cfc6gdnzdy5noeq7k4l69j4ynyfpmbca0w4p65mh2hbgdm3nhq8nh6bcg9rxgrdplu1lxgapetu7l3lwaugdp0dsj4yyi6cc32vyw8a38faeizqqj1u29wir2fl20jrnb1zvy1dmf3fkv54a0wblq3j2cq58kidsfuh4g1i54jwaqx9yyykrvrfmwxkj3v94x0wktg7463hnsgya6nbjx8vblhrzqc4w74bbfxztedghajqqju77adn8brpmy2smhjxdwhyaet8knh5dbjodmokz16kp8riqfkecy3uqzjtu0do5av5sfh041p18zoao2s7mecsu9ami2vz0wsr56h7ab9h01gx5o639irtcdswkvfufem8tu1px8eritb1qbvdhjebs3aqvwp202ylkoeyozd7ids0zj7qhsozg5ufdfh3fnucft51d2rhx3ah1ph8r9tnkdbmu2e8gu2qzgpgcmbzr2b0y1253icz5simawg8hw5nr2uu52xuk50tizhrswfaijfuv46ab78dns3zk4kmafnrsrrq65adnghmmvktz6s59bgiijxdkmmwy1u5e42hernz7jiayo7hfo2xtxkvnjdkzlt8qint9h8u0no2b97c5k01dajviglmwef6q1o08n57u0vjrh9qazloa3df77m8fyu5f9klgrnb7s0fo4dbmw4tmx1jl1ghr0yr58y5ykkylar1tmumzmunqi5fha60n4v9cfajeo6w5gs34qaufatkr2tp027bz8uu0zo9iznphme4fiwxl87ey81kwjpde013yoghnjzex8xn4frq4cb4buyj33zc0t5o9s02899nexvpjbgdfnmw0bqvk6tvyza9wzxx9vtqjcok8b5qyuwc73y8oketgezp2uwj1luu021oczx7598edqrtjwr8xp8ng7s7zrqvfjf3s7o2bwl5wv11x4s0x3p53bwcthh1wbpltbfnsbugbt518n7mo11bjmw7yw04vkvmzy8kwx3pmbcjvxod44tmn4wo4azu8dsm27b6n3hfgdf1jhb6fok6ojq3epouu18z8py874hqld7gc16zaa0woutxd',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 5933774233,
                expiredRefreshToken: 5968361022,
                isRevoked: true,
                isMaster: true,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'CLIENT_CREDENTIALS',
                name: '2pqnxbugccn4e206kpxj874kkmt3o2hojyc78ww46ag38g1n58izm7jlga166n7zpvnn60nwlju6zv3sbl4o20shruar3n3bkxc510wfxxxvv7nu9m1p4i1tcy7j2db725a5xatgx0ree1ggp0vlzc8wk36inb082i0jsvfexuajrodk4ugylic23uqbpewi9ocjkvi7pedq0hdli8xbware9s0n0399bqiqdb8be2258x2l5g1zjz8lik50l2l',
                secret: '8gicev68pqr86n8q7s33k424bw68q15kb1l0pyqd5oaw665hwjjy8x1z3ikl08rf3wxhz1q86ld3gp5rw56n4f4y6c',
                authUrl: 'iadyafputh4mq8xd9we1v21rt1ix0wy0c6iwpgctr2l78h7as69ki7m8qkyodrczaauc120lk3yic1rhfxh2u2p3a9mghe4e97dgtncs7o61jq5991b03e288g9l9t6p4jamj88ikydlw2dfk5ijxxdhtj9dp3vtdohdsbw4uc1d6b46dn8o5zho7d8gmve3zmf7fyo93xsvv37uwgqgxk6yac74q2hibpbw3xjcix0ur3x7fmtqgh8t9x3smuw5cwmkgk27z9skx0sj6c1dj2dht2f7mjpo7h77a0zpcndybhjbw3pi8nycv3v5idhf9wt6fwghcwmdau7vc8t24a5wmigkjc3s9dtp1kbdxl0um47r3mbs23ls5a5dcoskwv99uk0dretf785bvb8beygzk45q7q17wjjcccxc3lnyaqegbdbizy9m7esr7jt70cx4d8f3q0o44zk11krcsw1t4wu2olpli1nfh1qt0as3xc4tqyujt7qjkvmt7dpt601btf2xl39upf0m2inl5ek34i2rh8g6gftzhgkilt11ymuv7z5smwha0yyc1wqy60815edwwu2vkl29we8j5z473z4tjke8m8ojip1zdm3w7f9qmtj7o8e021c1zdlvqlnvjnahbie9lt4hqv5l6c7tm1zywhnjg2hk123iypebzn3fvuvt6xdx4ucihjllb8lla9w998witkn1479k06xr93u7f8myp0e5tfoyc9rc1cro7es8rqlc7n1acmt53z6z0zxeaswpwcv9u3y47pqax19scvwbytzkzcyc9r04iit1x919l330nj4ksmggagcshogssn1jgl6z28r3j2aqpkvqmy4skofxakn63o5j55q25ipcq4afdakdw758u8p43tds1buiwff1lk0wvvl8jct1mpyxdamnacozhd5hsda8qc398t0p872v3wyb37eeumdq7tlfgr98z4893e439rmejkrwvr80muupnrqg0zakoe3qb0tcwj7wetlzsgzjwlch6mfr0aq1pq70g4yhzxy3zrrwb6car1l1p86j8yyu2suz981rpp4ukeic9ea8h9qprez1bvn9oj37fjcymj8nc51s4jgqa95yzdkbnrqeiop60v7bmt6bf2pdtbjf6zjf1m0qvgyghbkzih2bwu013fnsxf57x9pu10wptyp83lx3lqkehlhfude0si1l4ryf7qb8wuin45748wd6xay69azn0xz2uly9qglh8e6jqthylstxi8w1oolyrwzwvzkvzm3aavmc4r45f98vnjr78f7b1tkhgrj86ahl337wugo5udetgzqhuizae6lpld0edju5bdzx86h425dtyjcfwuj9ii6hp7t25o447s6r4bu5q4p56g680q25lpsgn7z29jzq7hovu0cqwjcpdbujivbhhevjuh8jn6shzhgqan48sk6ntqctzka1zbd331392f3hlwp1ljnxjkmh4qy906h1lw462krdu3k23ic2j1mo3vbmdury2qk5gge7k77djml57zwt5wfu8skzmo1xbk8x303jo8dduukfmn3xmafeav7ygndf2k2xyeu9jsiw79avkonrz6v37e3xzsg5u00bsflpwe2y2b0hyanafv8a53cdsiagojd6k5d7pvxr5l31stx8fg1j9yhvk07k3cofl3yk2payimux2o0bwxianunxmp7ckyl1nthjjgieumi79mxx2ozd48oxq597st0bf3nop2xy0tptfsq9l3bg854mii136s8spgry97z05x5q18am8n4cyo1rs37965slka4fri98utnfshnrovl9iavctuogtdrxomojwaz1or56wdsy7izvrgpm38l7re7k2t8hmr7l5dcx2tznqa5nnspmhrcvtgj7wegpzyjsz7rce04a34pv75heionpekd89bb4djd1x7v1u9m4vcckzxwmfw3kkydsg2bbomqvh6rzcooqxjvpupr6c3ebkcw48xo2wzdxscjgozzcjynlgojfyv82q157',
                redirect: 'oqsnolrdapzdvoh8w59ag4e9laidy8iy4t732i45dw2pa81pnc34pyonjquhdix15226fdt39l3jxeg53c4pdc83hriwkyy5gx68003lyz1byfgca6grzohbdjpd2q5qnezy3uw4gnqncntvc59kcq6gb1tpeuotzhgpeh9ipxjn41hbz421czwppmcgwd3hh1eak321h5m6jyf1vd8c9bpf44yzl4ht8ughuevbzjd0hmmm5xsysaxqibw9q3f6w8ms2fpy5f64po0d7py23wgjikzfeeaajlob42q6v421rsk79zcr7qo65bmca50l8h5bbqa27lzza5s164t6sitz6ikerfsb4a71h4tqorjrtv9jmt7yqbx74ejetm5okyuhh336zvk81vi9arc2ffg62iiuln0d78gfituz6qcyvjk2tgf1fi3u40hf4hjdursyfmnew5upbu3vc3fr4dhpuwypyql92gppf6k00qdflcuwxzxtb3jdt9l8ch7maa1pd08tih55y5svdbjsiv0x3nablivoj2ori06wpng5hvkfz2tkt4hojouv7vd3vk1hxw7yvgux3k567ob8cn7j35js2h2gzpklx1j7ifh8srufepshj7zvd9yljo0xr59kxue4pfwx9vwd8x4ywg11itnltz1w9t4n2zvabt8jv4phsqi3hi1dr3teobd4qaeknpztmx472vnqyo15h4id71baviv5m6mr45bknvsh53zsd0u1j63utzzufc2rrq5o9kxl28i90iwlxpw9k4wyzmlqgajgfz7xqrbibsxktpnuwekt33o2lq70kn7k5oa1xz7pjz3g4r85vy09qb7pljaezxj1hzrjt8ycy0x1tufyc6nrenpd4xsr3r90ovwle0octxkbmtecmwye1hjhbs05gesiz4cpues7v1pl3nsxo74r46gv77hc6j8ibxyoqa4jiuay0yo860jwamhpzle67ba1wcw1avraucmz9jknubtovt318i06krx67piv6ejacbfgy3fe4n89ljzasnkc9689yxaji9w2xtohe98y8t5zjq0rn2aqaqkvmmwy66p1laggtehg3wn297n9ikqasxw1s55vx434b7ou4cps657icoeh6jsytemd62b850nyb8xaldxmlc5d7qc8k3cucj2edche11jtcmmaall9tnhi8dheo6r3gjyndgbrwhmqxbhfiwomsbcjw3u9nz0az6ae31xmzd5tce7co7vu6rb0jn5w81g3sba51zc2fqr8u4l0g769zeb8j3jtg7y6sn60i7lsjb5s2v0xmdwo9odxorgn359aw2ihu1q9f1jngnspnwljiif0dhyx967vq6wlfpxyy5thew6j3vepx3e1xovvt52ebtagolijutukjsx8oxk720cf12p7407qfp9dun4c40x0by3jmfh79e65q91if9ntd7lvodnrdr2w2fc1r73h4six6miks446pmfxpn4ra008frw71p1k3g8owx6wuds87zaxqmfcxdl11v0oe75tgw6uquyb1bp7e0qhhbnx7mqqq41cqvkf4zldz7r4xn3jyxlnmi4086jpg6y0unnqfx4kvjbcqjdopycjnh9dymnz2plpuobgj4rbkb3g938twjlptybcnn4y3coyo3npq1262dtqrzyioqh7dv2ptqmxvlx5pxyf0vz3wh3vb3t560sa6txlmci32kjhq42qjaokc06ld5poty86phao9f7a5gxrk1c09rttxdtiq33knvqbkru952epu5z77dlkpft9xzmyoz7cxldiwae86d72hwx4mr08zddydqjeff07ankj49144005rb19ag1q9h0gxdzjm25snch7mpn9jeqex1oa9r0cyva4ppf84ukklf9qdp0yq4euhmbzr0jkzty1jckmgh91wkyh4h8hb5solfy25pwsab7ccwco6fbyg4w2r39cqatnmx9ijxn37fap2lhsze86fykglv9s3wyl9w9g73paq54tz22l1x0nnpi1t',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7722165954,
                expiredRefreshToken: 9087134242,
                isRevoked: false,
                isMaster: false,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'PASSWORD_GRANT',
                name: 'u2hlw34g61gszr42sogy1vtb3arbz3bl93hw7aq2878xa7c3uygkp9sqhvtagals9hr7ysozgws3p8zgv0gm0gwdbr4gxs1pesce998ujhqwyeicrs31mt4leovmdeakx127yukoqb2k67b5uumkv2a6vdeaym3669qmtx1h2op0tisvasc0izv7sbn8ghqz9hgozzjbf98mt1utrxaz6za94oivxrjp2tgqmr7agrbj4v1ylf4pmkcxsbyz6wz',
                secret: '2na4641pnufbfyo5jqa6hnyx191vvxrx4hnzcjmjf4hdxypkkk9e22i5qxzmjvd3btj7u9m7g0ja1vws1ggtgcduaf',
                authUrl: '88kzr55cvjsz4pz9xvv5w0naszlurvfh0ne3pmu1d8fk7fy3bmkpfc329t52ihrguyyzdgvdiyfpof5x9a52yr701kv25jogp1t9fvs5bc3ci0pmt622l5c66kd65t8zvpelqkfjcl5x5uybqqly0qd7rwghuj0g9xinodo6c82vsi87whhi3hd8m39i7ebbg2on8twfgel5moopyqjgy0tnnde9u3hl9eo4y011jxosotym43u5m6v6609e0d143ccaix62y0g6glt8cajkcicfpeiqxjr2ssplvdmnydfw13h5v1o6eszortmbbaamhtrf7zcong55y3w5moyepk5r9lbnv5l7h5fnynzbbxbar6mgm1xwrkjhbgki5yiomqvgds8kl3ojejsu2wo535arnnbcktzguqqdvp0ffqw37yymfrwv7cwhgxo6egeop9qsehk6ryonpr2q4w193lvihoaxhl1rnrr7wjhvft6djhfmwlr7z0k5nwoskps64rnk2wjhuov3fgicqn549p92qtzmp0pb4r8s9vdvdyjj46s7b5124d0cmh1lsumfln829nzva9ksl6od0l0ji5u59z2kyskj6ri383p826de2fh534pu6us6jxyxfxdagzzfnyhutmdbrmsw3wynpntnfitwj2zemb887rmmwn11tenim17wjr8csybw9rf5l4lppp89qw6d3o2n15gubecg832zi2vfaukk94qzotwp9r6jgo7xn0uoo044ik618t7a1ixdtw966g5fn13ugxqi1v9m66vez9j74ry4rcjec258rn20lq5y0of4gfck08aejuhxj0ryf0wh297qe0cinwe594mf442o3h8if5o80utwzlp2sfs0fkwlh1js7zrgkcaioo7ov1yxjvofz3ttf3cfyx1u9q30iftocuse4tvsery9h80i7wi43zobjgnn1nlrhql7we9gifxbitpf7qk7erkgqwumkxkg4v0syykyg0n996yb2yyatg1floz316ljcl93oue0fmifuwwwkkvwb7aetq6s0j0lmutf09i55kuigzkt5o2cqp85encld0qh8mk7h7lv0um895rzkoivtobdh66lijt8nrjkjctq9ej9u5br2a5puw1tycieb3h4pbpmgu838fvdklusqfgu89ametowchpxqd1nd9zrsjkpehw5advka0mfd90e67rmoujbfdjahyvsz219vh6s7fmetr1qtcdufzgcjwcnro4t0k19shd9ttcz8yx6zyox4f469v5kwmrf2ns2yjwh07o0zk3so45wvgees4z4b3flefcfov0xcltyacldrl5ppve9eez4o4u8htyi4fzm0hi7g9125kc1x6utg9l58ig9xfj6oehwwu5o9vsgszw717qxxn3ipwa0rfwy6dj8s0bovkxhiw4z9958d46yit72hlhovfwm8mz23qgkxg4a9gi2wzvcv5f4jy0eutgocad76fdhov6sc4jvejn72ontu796qpolclnk2iaimgcbgt4prtkrn8fp20xm9df3hl2n5gogru105udtmbbwr9p3tsfrn5sineibw7qh1j7v1d2k75l5xbchdr91jnfwcbqppixqw0obwbw1oxd9zcdrlm1dm8yup5p3odjbdnbge206up3pwki261m94sysy0d1has4teaiq9uq7xuoems2v4aw3yxqgfohfdrfmjyfyfe8zcnt9j6mfqpbwe5dugg8ptqwpabtii0e77ayz0asn6yaf9hvrnxopxqd0newyklnolqmh8y71t9cx5r6hmm5kwx6ae0yotyauzvw3q65ruyz48pno22hmzugwohcucnlk7vwnle5yuov1n1ltoo5llkrlh5c3kdsgr9iacl67a2gijlvca46gsai2aitvoxysjykvoqmc5cpea7beys0h8bnj26h6ufhs2n4dmslzc2exqjzg3sblxg2b98mkraw0mtvraksc774nim3o7fdy53rc3bta5ad3jfxk158ylowup2sdx0r',
                redirect: '8sef5bkzkp2nqv2xfu7zmk0lt42fqu258zqp8yd20mjzlqrp9m8t7828mgu7rqglnaclkf014bqvej72zht0pl9q497gjynd2xyupj84138e95qdyyb812nad1z4t7g7cc6vbactak365e0y5tb6xztrg9l7e9macdfnamooe912nznvlsdljlaybra7g00a9c1cg773cee74b4u02xi41xgww291sl16qejs4orda72ov79v66lvvjd3w2bryijrhdedb0td17n51v6ep1ze3901d62bclbfpvhz03x2jamlty1um6yhfnkvmngqk1gjn1pyqtacyae12pi589f8azwx544jvj3e57b6gpz9jng0i1i08cxtwkd0j557gjy78ppfrw19x4p5dzqmc6t8szosth8mvw36zavpk1of912l3krmrzkk01vhvgmfcea9ypkk1hxfl4pkqssntbvdrchyk1kkhug1wjh3dkdp9wf6s8fow4k6yys3xuh4hyq7yr145kbio4ya9tfem25p9ax68bdqs4plq2w6dl1mg3qntn2z0svlg00izfyr1z8ur6hs12n99ek73a8c5is9l5bvxgkg0lvusqbtm6itsefbiw2i9hy0t4ujrjse2he803z2wketyvjevv4fckz583d1hyes5izu0mooq6w0y7iwz4t9h0tb2793atstcf0pf21q1q5cia0brv217flke87dymzq6w2fubwr9g14b03769imwviq3biosvhmn9evbq9prfkfsarom2fop3rchxmg6oqfz5xz7ficzef6bur3lito399vt0l5lr63xw68yoy0lbi1hyxihgy2qrqi41nxzfibryh0ehvkuglvod03s3v1teav0bq1wqw5ihu7yfuwkk55olz02bjpgxsvwt36q5tuf9jfdqa5q81v0u6xkdv276ocmlr7lgnm948n9jse5feli8o0vbmtjuxt8xyjib20eaia6oigebbdqi06lokeu7okje67mz8toak5k42drndk20yqpc45ccctd7q036nbm1jxljl9qblp12r6gy2yyhfha50hbfzf56wcc3o8fky3ki3fonrdwx9a0zgo3ir7y2jm67rj5pmr1f1ieyopa97ujxx2znwna02t6xedyzxpvsyvbykww7m7yp3s14iciad3jg7nkuvg1fhta7pho4t9378535ay40l7b4h7nk1dinqeclqf7xpkykrvkiawjqttjaaet0r6nb96p2mmt39dkb2ahxoteem5g2tou85tqgc14chr5b3ld9hbnikgol124g4oyjvkjihz21lufwsec38xzvg7b9j778k9nzmb26j70dv1hg3po5mnixxigqdvcrfiaj5rsvsrnuqx6pva1t17g9y9fss30t8wgzevl2wlybyryzckvsj3w8jyywfy68ent843pfpdm1r8zi32f6jhosna927s3kjn0t69jihttcwhvno1x4su332362s9y6bh3qvauf7g3yrssrmakibp65meou1bifyfn0urdwda2zuw4p3utt6tykkhfbyqu5w1e6ttgn3gmcq0ipxbaev2xauqkmd9dmpt9zyanjfo29p81rk7i57bqyxlmbigegta2l1do8491ksgbythxsnqihrhb743pxbzawvj2dr1tajqery58s0guqqm10cei0x2fz2gta0goqs1l6l8sgwq5b0nh0ijdkzbs82pi17hejht8f6oar80c6cdjacioirs9typacqge5draaa7ggg5f6o97lxkp2rin6r2qcdswzezf4a8vtmrm8g3e335mchfoil8ehj3e7hmrdhwvetiwhe8njtk9kun8p44bhl3v6prqlu9s0gvbs4ay8j1xfacn2fry6k73rrcsxrj3ot1b7xln1dnstv62ipar84sc963zqc4a2r4q918hlyxwmo7zwuixtj9spm53iea41i7mw1e7clnq3tot1nvitbew39chph7psiuy7nhqvkqmpv1xkifty7kn6tz1fnomecx355xfw1',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 68171662163,
                expiredRefreshToken: 7044232008,
                isRevoked: true,
                isMaster: true,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'm4k4h74jyapjlsg09rl4kywoq8fuyrzlshshdnlp9306h0e2tik8b27ojrelr7numwlg81ceznrswd2q0vigsyi1p7vh203nigml2nrjhdn2jt2dnw29jto19nmfb5v5ny0nnvod9ssrhhywfgpen5aik4upjjtcbz86oi9hvnyi7qqjhnoaej33wy7h8yqaps6s5cqz1ku7kcubaozt7mnh526lqd3e4zgfczfab9u4ftp30wm5fsq8ptdpny9',
                secret: 'hc9n9bi8wrnait0p99gvvrutbx1suuaqcef5taegfw0aamnm0vrh58t2f2tuuf4heigqrp49sntczs2qw5m6f9oab5',
                authUrl: 'odhaqr6je9c6jaqd75uh803ekllwrqurksrtyiaok62r9wui2abpcr0fd58w6n078fjdeil8yamsnwkp8js8l7qwrvk5hiycq0mek0z0ekv77kp5nefwf31iqjvd9qz7qf4xg5s6euzqzruykn1797kwrh9ixy3i2u1xeegv1mqhzfnrtp243ltmry158vawprhwzdbthmgvqaru0z9mvihi77ywmvgwergnz3o3l4wnas38zoc7r52njzogn380ekacnxx27z7tg5ucckm6p3c6lpweqdiu0cnrhlsr49dxpenyf2r4wnw07s4rui5ihcvl1iuwna1h5rmf9p7ywz67c5s04y9fi05ceoq9mwcubgzf0t680jl0kestenyzgmaf7154d4ruqv4pvhic6k3pnr5g2w59vewocnmm8wbki4ldf701k6fhul7n2yrqyp6tlf5nutyi62fnflgju0dojajwr9rknavcuzko8nw8raeg80r3jlnflqqpi4za7bxlwzgvce3dmy3jixucsonnlpgkesv16ba5q9mb3ohmxy5r36q0fj3ihcn02g7ghfp5gygm9bviuy2pufpxe7xx17mql6kpqmmejid5mdr4wsebodlqd07vzfdh0a1jn9qen0l4d73ishsd59zgluc2udrv8acl03i98l5ehmg5wl4erh7uobet319yzz3c7emwwndzlpna1k6yudb42ci2b4f791dbepfuxptv463m1qjjxbm44gogm1gttq7fz1pjwtx00pq8bmlm1x7n99ulnsf9x5swc1ljjdebqk1s92ofuwkg6deuurly122klmc5b9ut7wkjbr6mosncndjmhk3d7mgp3h4vzi1kxn965d9knlsm1ty4odupyu98z8893el9c58shn5kv6r3nfikhjd0xybeaz266a4571zaq7nq5r07zcixz53cq6vcapntoqru41cxq7ii87szgymh7dx8j0p17hyezo3bjgb8ei4xaqye7s5qnp5acnns5r5c055pkdjdpmksjhv2a6b9g5i36r99u8uwla4zxb76u765wzl2okvgponufr29j3qmavwx10985651371gb9nms43aqgzhbn0xcd01kejzhjyoic7iskk4xbhl2bvu5g17s5m3khoh922m5t5s37uwhl7glr63cqxw5d1zyvuheiypg09ij8n05eelta1gzycsz6a2i04stqvckrytgu1t970uk6jp86lax6oswtnmj7d651komqskuhb38h15xr6nhdihj1jpd7vmy86ix2ojij78au3mhp744agfli9p05jyckm3s3tv2h6j3nlwj4mxf30li7vsw9hxzhvwxnhj9zlis4zx4bgx8zskt2kah07otjo4ffpiects4nsouo7t5eo9ywemq333h209mdanjzpwht3w4fxwp01cpmy8j64aqt166imcokbdwwqgvnm1zoflfw10j9daoq2zfi76e02mvvkirw95iq5jljtw1uy7s56yv1viq93xf75i6m8wt4clqi0lh2gt0atatd7qo6fe4a7qw8rp5x148b0rqnlojiwd432iepqewmuu1skj6nujcz8yaxrx0k2f7unalua4402244kc46apozkhb9djqtpdhr5s42bh51r95hz9qnb6xufcavtkcw8c71ersvip74jtx4mr8ip99ujxzxcgppc7akfw5pgoxt9s1ca5uy4862oxc5r5qm6iurt7ln4tkl5ovotspyn7m2tpm5iw0pogpgchhlltvp9e3heo9g0ib2uo10rh228nf2x1qf7gfxesp9mqau4vvc7ev67q6dye170pktholq9dkac1qz4zqa70y4lhqo4ak2w7v88u4937m0m75frvxzodwvnx5wbp77gskgshps310h4w1ae9szi5tn2zf54wuitm72y09b5or0g422i7x84g30ulbczcu6185yu3btilblhzz5a3f4wajjeqe5q807ep5mo3aoxr6ck7nj6hwgoc8ky7g8smqw78b0w7rtep',
                redirect: 'cz3oku9h830phrc24r424gystyg3k47dtywix81o8xmmpe5ujs44b30tmkp6jod9v6xwzxr90c4j2l9m6u25atswfug9idbkb4nt8rp955h3p5fp2qkmfee3103q2p8um4m3jzwlkhytzdh5lpfz8n28918l03dvhqgtg3742wyncm077ng2g8ccpg29ccu246l5qc02r3drm5kokkhon1z3x0rqzl4frel12lr2oixjor9fqsxee7inu7qlgio1hzzxzi2nl3nl94shfbww7mg8fpy6vf6oxv2z2goopgq1hw2sa2510zp1aa5f8yaesf3ok0vnp4wfggc935omszq31ef9si4q131varkgm56e9qsqhrulgljc7qy89k9nbbn7ghlafxbn6nwbk3jqkfjc97nuhulhv0hugsr9nlutrntwdhezzvfwas63kaka674tchpzmlp3qei4bwqehq7fopf30ohm8wgdvmqdiot38exo8hb3f9xqf0iv7fmdezvgb8wx605p9s5hseaaoxy7lz878gpshcnpb30mtctagy3h9chdujdsxw3aak4h9ru6aew0ldnx4za84sq2sn3vlur18hxsbtnd2s5i97ly9ozgav072mf1494nhk8q1ij9y48f1rf2cc8g2peb1tgxtq4ze9e5epxvzwpxgwsgf9u3mwla7acf2brdchh6rvwfailkcnrjaycrudd18nwb5b3qevsp62yf25nexymwvtmeke9d1ymttks04cv4xzrvmodyexx69tjx8g6u28p4iyze5ryxp0qodgk5qush6vzevr0psjzamgfnr10xtco0itrkwiat63qsn22ji67ffcv87tkqtv7mz9c7n4iehcpall94git2pd96lspuyjj5yevafk8o7pu17yr2nitsn57xvot2b4e6mkht4o4e0mh3wgfwloclzkwfuk0w24flfknvz3xui0baqzox06x47ie3o9tq12vitc0oxsc8oyzl8peish2mn9o6044spw7jywrnkglz609a9vrqylwc50omaqdewg71ehip299ht0nm9sn16duv4ef2oy3fxlbhwgrvcy62g314dxbab6l3wb4l5c1no9crk1ek78tn10nk848bwf5e5ryfdu7mwwjm70evbgjhip81fik8lt152hqgv78wxowli97vlupz98d9gxd75d1uyu8iam1qi1533m3p1j4gq7auclisd037lojx83hqit79qd4sp7wl7map5rxjyqb6puhpmq5cj63uhssycg30fz1prrtovj9ghwc7l11x815hn9ni00w97h6evwnl7ogwacjh8y4z0bq88ivzosgg9okel77x3dlbf0t8ffo6smrqviygmw5gcl606ybjmo9pla3gzqadzc6upfqp7eepgicqcn2zrqcdiren76uzekbbttazej7rvu3bi6kgyzc7bl10k86wfizk5xxkj1ey76ev3nisd3r1ge62ha04uwhl66jqaxidxjmil3ffs5fv0nl7skihqmlt7uo97x1bo2cnf9q1xex1tn0pkza2yfeivgyd94j7dd5mz9ksy1d9pbksb39etwh9mg3zdavs3h8l86j4fjdcqqt6w4uxv7ih3ws938xosmi3z9vdsd6fep0wj6xklq3yb1bbhjohnch9vplho3iryssggr078ujxachvcmrj0byupia5zb6t2jcgk6rbcdhfsqzbuw0u8x3zsw49bjcjm3whoyojevpzzyj6kkn1d5aojqlvzummfb5z0e1ml5cnmy9dk0eb348cveag7cfaad8actzn84lomloupw60uz5s63rgb9c7vaw3r1c4fz7fig0n3p5b56kq2du11lxzydba05agpb03aem39ta6nz67xi4jqsurjjk06i25hfrb9bn7k5m7wtunwpil5mv6x4eq09q4bzjm78tcb70fyoz432c9e8nekekknia9gluagyv2dudpomf9kavw3di52sc08g4aexzgu7gye3voke0t8komhpqny5u0xy31',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1648253657,
                expiredRefreshToken: 18989190213,
                isRevoked: true,
                isMaster: false,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'AUTHORIZATION_CODE',
                name: 'efrhn9ngrl316o57wjkgdbhka0qdleywk2qtlu9n3e1ni2xj0my3ofjihuxovs2ebxer192omr0fd8q7ojr57mw3a40q9ox93374tsks9ip2siwnzhq83t03p00vz0myptp6ifv3zapot61gppnbl5lfl6ny2rsk1nk1wbkg0jq9f9ktjc786kpc7wp63wn7ds7hvera40gafpokn82i3u7qou4rbur0f9pub2529ahdvrliidpqpedfrrn3dpy',
                secret: '0rdo1jbsehyxkivvqpiubthcyq138n3be71wcavotfao3lq40mu6d1v62bjm5wzuuwm2f7jsbxcv0xlkkszmeux0a0',
                authUrl: 'rrxr2b6gxayzfvf65owj9xwfa1ffifoo43g8mkgemg5frzplo1w49cf124xjyt7fjrgceouh3nc2czyfxkg8btpfdykv8donyfzeilz5z62vj11wy881jih13sgg9ggc66drakjj3rb9v6av4iykkdq8wpf25zjdybjhn7ht9nqh4h76dc5c8tzppr043cigii5bq9dy77oar2jk3acmvczmclneji7aer3f4zfybgnhz2dq0cyh1jps62qon0wuls7pqgxqopdvdn08sq3irce9a50mo9s850woy7jirywstssd9fv66bvkvar3hu6ow2txl37alkrquqoshesqw5553ax5pxb3avaojmftuev4clvneturimbrqijf8tvha5a276s2cl8gogbqswhl9yil7ldrqsbxq7notjl7ithzpctva5hmw51jsg3v1jh0ukg76cbaioykvtyxtwjd65x7enzgt7i8796d4c546izyfcylsx1m6sm72juu52j7jvx5nxr3lpbro2jpfbd2duwkoqmk1237gdkbnzz6hiddxwq3g416e4n09rafyuxydx5s5zacgmr0ho143lmobbkkr205zi41o6hsg419482hn3an46k7wm65sgiyic3pmnisq4hvkicowhh1fsl47fdvx5jxfi4traw9n9plfj74meowsqn36jrtulaou9s82oj80f997htt6ym6fuvnme4oi6b8ax3yv8b6jbh78sqfx532wvnocr6jmypdfx7ta5ur1pnep01wz8vpsgbejotrurrgffzj5wm6pa9rft6im9pst88ur1jdxatcl58jj3hwz4vof8ul7r0lehap873zjteiazwmcvkqoq7g1fkm8usay9jgibaiz6wzc44ppy9ctvxgjok3xw38qluhdpyyzgcxd7evjlmtuesccdkny5qgz7jo3zt4cgorzxuy1wg8bwlzjumddwnbfzqmoim95rmnqe810wyw4fxu67svnf98xukkn8ph0mavtkm5mz0u0revni77bdh24kxcoyma557w8vq9my07skp2ede4qevwnyirtjfv25o7b11ulb1p71rrnqz7ezap17p3mdkqf9u9yehr2ghlax6bup9g28anxhfo6dh1bjo7loyuy4ugtj3cj288c8kn9gtz3d955s28s6g5jm5akddydmg2827ybcfppl87hbjsowrfhwru6ixxfwi0q9raokqmfqb4qxt9upimi1l5bekk8nq0k4og9xv58czovoyisgaizhxhwgjdfrj8j3j6zwg87h5hzkkboqw26aorchtppumyjul575w5zs3cl22309os316m77q9t6rzeb0x4k8d0r4v644zr1ofsado2neeq8zq2myowkr763c5nmdvkxj67iksyminfc9j0gv2ddovlbp1ha9o4fkpqopkifhaw99av2stx0750ohdtj4m7huipo0zh4luw8gbh2gdvmjpugc07z3g5salzxt0egednjxyvpn6excgo7aise15741lwwaaqyruppfabokwd0n2rloxkb7s94ocjl2xzukg9ozjecxvf9i0gdytt3qcf93ql2x3x32qa1l8440j6508epv9c02u3sdfp4nwj90vwzvzoa3sfo4o8kdowlhq6feakez2l1tzznfhyj3erzh6vwwmgvriw6phaotmb7pvr0ku74rdicijqesrh5c6q7kxmmhbb48ol1aszge5wlvmjrwsd19y7ekikd2468b04fc6um8ujvr9fmx0sgx1xpk6zfc960ebq0y1r576tcnktiiuozocfkmow6iprxke6tzarf8q0ev4eom40i437nd82q7g91f35r3dmu2d5orxcffnuwn1d7eo43lf6f0sgo2rvp1yzw6fk9xcz8r20z6lt5yabyc04w62wnfxect771pty8s6ncinj4wqwgfxn2il9zlqzi6zmijx5db2rj5i5002kkl38gb2r8iztzsaj6fv2eajzhqxv9s7qr2f0wk7pco9hgsq3vw7qi9wbv1v',
                redirect: 'w1fdillc3q5jil8dhcy5em4zpch0xbowt5jowq72vrbe2ga8rs2uamvtkucwmjex8qthsjxqx6uaboixrlhx8z7m48biuqtr4thcmualbadgz98vixe8e51ab9j8nqg62eqg22wdy8mizil3t7tou3nhqae430niak4hcupdx7s8f4iwmke9877nkozwr2pizc6vatcabluwbu9do6nc0s2sruwnzll9fhslp7hyzrl63x29lordo77vb2n0xqhdo18aax0jzo0wbwov4up94kk1fj83qpdwmri8kupi4g26keybmoxgx5vqinanfjx27xvdoilt1e4xx3x4awj40nm3dpj3jfsrcafa8wa2muxhio1zxdvaczsfodsvtmdwzb7ig067ne8018y8n80u5eyplxyofq1slk81aylebg1jk2mpc61xu1hnbb39pp0ggsh0ewaq8ojkb1qk8aeunin4sm3ubuqunqnf8z9jf8bbh2xfi1rmt1flliscc1fx15brlvml8n81cvv7b52sqs8ulbeckyx44pqrxcwpkfttw29uowu5uiaumnfhllwx8rc11q068smz31s6mfdzl2y0oj22iftckt4mnmg2ly220mrurtv73k0w7wic7czaxro73kd8aj8t4ut5kbnzcd5xx1i81ium3mbh5bu5jp84xgwmbzoipjfza42trzfjtoke53xv56p6irwlfhaogigbun2uy90m7lb9rzvi9dr7xx5725m1i4mzexv99j5w0x3yg2ae4smt3j1yll9w7su889tt6ohses0ioxfww2mua4qos8tqeia6ym9mtm5uyyfdud6ooip4mk7h41piapuh0d2rc7n7s6kbq425ato1x6jnrqg7g7na8ohlbo9oitjgyvzhmoxxnggaux7kyv97bmfc145npxvvw6kmsb8vvrbo1491b6at8sjonsxptp8u7bbtri8uhm0w1r04zg8s0dq4ybtdkztuy4v160fs269limjlm4rrzit2n072gicw4wlqqe9l7i2apnfhr1gyk3cuzo7zvr5uk0nh3bfcd9cdamnykkm4jnd8mxrksxgbozenzlis39zxwi5djkpujchmidnln0eew3ol5zca7m1do3lgn5fa8467k3s6zkl1ka2uw09h467jbqzf7tedi3higpve0p1p7x3rle3t47pc400kl6a5ju5umcus121zssry6c1inybmudcvd5w6vlynf75xumlk0v3dw67mj748zkpk78o2oo6d94ovkll0tam34ql2svdgrrjr1d3x10kfs13c9csn77lrh70j4g2htc3yanhnpntsirn0dz4ub4eq09ol649w4y1ee9bbdon0yua1vpkbydhdm57ovt1f8h1yik27vkdtr7sastsc06bo10mhum2rci0ggc1cskpf0ut1st29bx2a4ykm8mhlrsewy9oseyzad5vitqzbdzvczkti1xebxe8yjgz9rqpaskzyfzm39adg96n17lmr2psiyizkcihp88i72nkahgoi3pkprsh6m5fo2d6z7vrc5hglvsj6s3p1txtqhevaso7xj6m416g26rdumk80ptnh1r83cl2ndzynkrmomyv72cchepfigkv10mtpghd91e12ohkry7pkh0ayv2dk8v7jixamadqt9dmctji2dqpvt460pj33t8udjkssw83u7ewfscpbvtjxkb6qh2p842t4rjitvl6w5nbpvuhacftwjg5d2o2as1hark79vrxvdjqretlrw35oxqon4ptdllmx89c2jwjslrmczf9vgdo89uworb6mf5t1d8c2p6arct6kgf8l5whumqbf3tshpni24hv6woii4zbg1vyklr5jt8jjz588cqe1dx6eaz31ibvchg3rqqgsjvz290svh5ygs9xcyq60w7dxsqqlnygge82neizqydvth8z2c2pfhhyhbbvxp9jcogzfn73y7ak888w085nnf32mxmchqnj24m17gdis0qbo61h1xm3iicav3utbsh0wollg',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: -9,
                expiredRefreshToken: 4348506562,
                isRevoked: true,
                isMaster: false,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'w6k82rezgoxc8a6uvhpjhw69jphu0bd9awl49tw9ll1cdrsve284c8yzqee31vkieacq2qz3xehubbplc6x8zhwkw4z2gtnxbo1tvd0vdzt3yoiknjtgfsy90bmq0sjmacags9c0csqi0nrzz6rg8zdmrfr7cvo9ywpqtc6c5ohlcflkrz0lshujho9qwdiqgmefj5ph1r0qgph2us5jilq464cko1tzyc0jqufzx8ugvntkvtuyi2p3v5sh5pn',
                secret: 'j8qt4wor13m412n7u1ykc0r415kqrg1r05ooo7n4pr127z6612qw0480fbb3g56ax0e6mp7qapul7qm3fpaz3a35k6',
                authUrl: 'aqqujbtxtkeda64qav26s7hz98masosjbatpkvrdpjcwz3epw9kcpqq45vhlgc66y7ltp14a8y4rmbzur19r85bjth8iex9yh986bx70f0tpdy7n6w126i79mp2cdo3f4ew7xfogwewfvcnvrl70dhuotj4gt3svzi71rdyuel68k40xjzx6uckorjg9wuizji3pkurpa409ek1a7wqa8wfplru56ocna6kuqhue4xrh9zrjk22fsepnri7vdpb5sfn78i8ijpcpgxpigugtmphye2axgogmb5s7nkpakpnn0tltde2kdhaipjrtko7dd5f1qps4q8y4dirsk262otlzmbz1at12c1rexlizphu4udl1fn1t037zs7cdztib14engaqwto19tqo6r0vrapg0ky5sqyjpp2q70dnrk44tqwhdxs937ymmmofpuc2ksfmxkj425v41qoe69patinpoxuhpimvcuiqo6jtittzgeijn5u2sfn9d8plyecft0yo8undu16clyd205mscfdubjmil45mghcjq322zio00kv4eas4s43hhl00mx9bkpuls3ymazsov465lw215q58jmybngd28zn9jllh7ju9nyxc2lu2zongserwhn31jmyv5h6mwe9aucrs7u36fl3b7lgwxd2l72hvrdsxnp782gqctz3cvucsqyqdxm6iwhgcz15hwjd8xrrw8rte9u04omyh0nlgax97tnc4eyzdtkluk6tq4sgeqg7kwx3mzf8xc5esdy1uag3yzou8kfaatj0xm5l3d848wq4hq769it64hxlz40i9c0gpcnfx379o2l9v0vi70qyiupjkagh75wi9u288sjgyokt0j37gxmcm557nweqcy76od9af55otpmr1box309605x6s14jqsr09h6d6n5ynbzavsjgax6okt1wvqv8ibg1dqo4vqjrpw9n7b4j1g49617cl8fg8y7zhsz94hkrzo6220if89up4b74i760hpmspxyzr78l1rdusf4ro7nt5783me2dshh4pf4xcgzp8a2tehq370m9paivxcpxrr76s1x025tjot5c2e3nxjtiltqkur87vh3nf8aw8r0rso7fi3dhcx8zq7q4v2ts6dkx2ucm7x61fyxnjwvxn27snmw81s9vuve1l4bq2nh086wqafc4jqsr4vimmv97yprmdhr0proroner7ju6q3dkrre6p97bjcw2an3ckxi1m6e5pw644xsmsdkraetka8o2rtet8r063fuqn6ayqxyg81yc1e064qbwhrhtgsze5top63bs9upthm7az5pfrld5c54jc4xemnzof0t97r9rjx2tbebhb0x3qz1mjjfpch0q6fnqw5ais71djsa51y91fairqdrngi5s4xp9k8g2mnm1mdp0skmhxtdl0t36x5o5xcit86c2psqw1r36s2ivu2lwuvlughgp4tckhimz78i9csym9l0jebhccyde4eefkbh44t75pudvmasw28iv3a6ev5v0j2kdo6u82zv75yfxwq3srzs4iwa2jbbmv4qeeu7wdv1pumf0k06rjxh3gthseh71eitdjmjyv3q4rtbyqyt3ocgxcq360s3bfppzlu1fkzhttlvvrd4xtv59myw6jh12ezcbejb8gttqcwrjyzwfjvhwyzvs6xaiiwj33kzqq0bgz6l96l76luld9tdaw64h34dx14p9pu473fzi1a9vxbursxb2ajs8dzc51v73sv7m0s7xmb980gu2xosmrf2cl5ogn9t9cb0dyv1fptxrb6eowqym2kprwen8jq02w0r5roky3raluwpqb3jw7obn0ejh75lpoludgr6jakigc1v6rnvc2i55wb2zxegrd04w2ixdsup5cjm1zyfrpqg2fuk4obyg3v104hpy0a6ntiztnqteqvmfxdqjt41bpq4tnbgsuvbt96951thfhgc0i4o5z9a35w2abhbdkdduj9cw9pxexekclocoycf7d4u4dwulnka558dea82ka0',
                redirect: 'hmpu7nui071zux4311v6pdl6yh3ie6o3u5bvjxgw8xf5gzv4sta9mgfmsxzlck8vvou17af9lei2koap7plnat7qht9k82ktiq39pw1j7qrcrpe9jgofo64dy2nnac53vdspc7lwyu1bfksa72knour0yp3w1ypzrsb33ty8416ujszd5wze4p9ysuyfbqra59e5xx62zic713odth9jljh95lqr6hv0iq2qf6514k6qfua94xpqx3v83xyhpacx7q6g4eelhy6t8e5kd5u6youc7skyh34dtrewbzz717la0qrqozvth44my9t5q5nqu1phaoxaul0u64j2dih9vwajnk4kwevkv6ymxemk4mpiat864m9lw5kfrxuh32gap0u8gspaqwrdk4izuj0bp9ux9p2hg66pt7ylou9mtxejjocl8m2ffawjfauzpvjhnfjcrqidgtg82c24iwyfodilbasmknq3di6tsjxtq3tc0ueulpnsi7brljy6h67jhpl3y3dagp03tdetkkv54p66tep9tbqmcxyiqa16a8cgmv2aboatlwqln422klv57j3h3b8ltzqvhsccde181822flkjquza2wrxhs2s6qu1ptu6g7f7310ylmndz69m7ljsgwhos0vmmrxbh2llfdhggaei6sveqseh93fui6lulzgr5yfz0kpptbac81w6gcg52rhoy51360ia2xxt79e1pxg5sqra6epnpagb93apna6x4dpsv7z7uti7jbjp3x5c31sp0zo6b3i99mze15r5z123k8881nktd82cye8k8k3o6zhggapb2eoztx69acw3bhf7oi2bzp75wd8am378e3bd7gjc7ouljzzv850hup21gvtwqqwi6zww85wbwzuhq0blo7ow997abozhuz2izoz99vsh5f1dduu739z4uvud3h9vijcerigw99plo357hs7u90kfap04p16ayph1jsknvxomuq9asekig1ptegs18xr2nuczcxkouci4vrlripdbcntq1guacc6vmtulk6ppwxycrvprjwmtuki0sw3deo2dfgkyen6e1m7sqgvdi97gtu9aceer5r6l8q2w5hborxpb8x9zqiezw6pmmvu62mdhhy1h7fatwh543k3l6wwwg3fx85y59qj7soechh755pewgrkuu23gw5l9mjpwt2fad1uha1j6gpi7cldfb2baplobmgcbx2xgww3s4zmr5d0rzno3vgn660qs9zgk8frhn1mra15yle0wv8oyg55edl4jp2pebfuukik7wvxtqkwacbmzujdo1odjb9sq7y0rp8a8d59vuz0oh70ltd1z3v2wqjmdenipa2vnthz92925d0ep1owbwwcxnmqpgw7sklo8tfni6dj23v74oruqd9ffltahpohlksjfd97yomck1uz2qk17kmdsitninrrrlyvb1eaod5t506jrqz5e27nbhoffkf83vpyowa20ged4538s7spylelai9fvzag4ezt65t6u4ja1uvl93fect0w0fiqlhagilr6u86a94f9opjspguenwf19rwh50ut0jqy1r6f081lnjuh95ph9jwed45176b0bwni2w8wsvbb9wccsy5ma97h6afgk9tpoalvv83x4ftcv83vh1qmyjcsavhncwfg3his08ggvd0715sjmxnjwyq7hlq8vgtp134ebzosea8c0u0mgoi2ejsermxhd33d29xc70aq0z2dshl8r6gv024ex4st6iabtrd49m99gnqep9levpk11k9ptzv6f7qtn9r2ef1qa4mgz71ltk3kl5bdr55lzs10sx3d916l7nv2lg3qvo2x9i321l1o85soysg5t2kzs74h7vwugkm948q77kyz7d6qj3so9ixgdsq3skxp92blmia9u8yh8wonqt8t0rk6mw4ii4xrvr954gii7sbsmbl4219ohgpdmu8hnpz9ebozxkai1p3tb3jajll15r9zycjs1075h2tg6gbpa4wmdbw94my0w68fk5cqn',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 3688582793,
                expiredRefreshToken: -9,
                isRevoked: true,
                isMaster: true,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'PASSWORD_GRANT',
                name: '5vzyphv5ze9qab8d6zyl8ve5vg3sl1l523s2vqyucmu3ck11ssqs9wihd2wiz1t52eobyi4qq14dddu03tvaqtvlr9du0opd5lp6zj45w2h37vjeayu6wao33a1rk037wlipejbi9fly9w18d6j8h0g2qrzo8rp08rmx35858uymjhi30bcdt8lfaxoka7oqpzet028tr4gvpn6rrcijn0lc5ov8985imrz6bd61lisyvj974rb3bwr8vy37sz9',
                secret: '294jj9qp61ecf0jjxwytztho81em58gh0kt2xgafc8e3h4m8lt34q8w9w5qepcz4389uiqpdgwhip1m6iu40sei533',
                authUrl: 'tghzm9meuia6pnds7ptnm9mfpo2xzi1inzll6tmnz3xydra0wekw30zklra0nivn4mhyxl9wzs8nrew59jkpnx9gvlox40n4z0hl7akqh4zk499ncfx7e0xr1bjmr50nqfvpsop5vnuxb9erkjovh5sg6dp6gwxxr1csrsc1zt2rgtbpbmstbi4pwj2wae4nazkcfm983yipurgsgknbpvhm1246h0zbf650ir3ucd8mew8u7yczds0dkyl2gwevgvpmlzi1ew1uwxzgibz7eilt5znano735pyjwiug39poe5oowcuyrw7l402u71alsrq6cpmpb3edewkwr2ms8psplrwjbrkxgc99li3vlp0ngzn8dbgagukwwg4v08ncvx5zc51imf3m41ksdorfytvzn3y3qkklfqb0jxgq3hkla8in77r2dmpol2w43xyhc6m4aszivcdd17j7fy0apjrfek931gmeu92i2k3tu8pvrp3jqj0p4et57k8nuyicdfanpk7d3n7tsry2n3wagzdty1mjxqrbaibrxd6gr7sl54nptyh4gs4j2kaw269l62od91lg5b2b2rj9oc3ed50foohu9if9mnya9617scsryktx6s6o1wnh8t8yvunqq6aiiczcqimtixmq27dcn3bg0mkgf5z3x0atomu1y34nog380l6kny71viuceohwmw6gjnzrdejnd0eehm7g2c01i6kjxxdl08lixnlc3izphddsiph06b3eazm6vq7li4jyedt1izvhfp3obi4hoo7ge8do6yk9pysvk8adqp5hgqmh8a7qvsi8db2teefftrd60e77nv4y1ptyyt06bkdvo1fg48xw6irmvvlef1vo909o1c0uk3fzfvdgnrkpbc0n4g22uchi4tuvpubd2847wam2am56ytl94g383o6cblomzfiv1jc01a3m2c346fap25r7bzbd40nrd8vzyq2yvvo0ru3e5nfru47zd8smdm1np2ljj88tzwr3x8b5ozzpvxex25rnk32u7u5wf3s2oxr5uj4vblmkfquf1jups1cm9hztlia9vpzf79ydis156nntk7auooec7k9bcmraoeozg5ueup8esm9s6zf5iv52llgtycuxf93f8pzgkgz99oqrw07g1exhkpa1f6kwsqxfqudhmhpcke5p1664z7zoxdv0eg2m4s0i21hmq0odf82q07b6mhmffr4ycjmifpwb8oc9ff1f4bfuiqva6lhzarh8q7igr2dfuy6uzxp30v6rhgdx6tyx87jjoeu4r7gpleubrkb5g7s4lbkqdw8ygyz4g7xhx1p6xm4e9nrg0cs6enwq26l3788w1yj8rth4juftfqk98j9w9rpoqpwqaqiqqz22wwj4dlifs6wap489kghn5hcim9sv1c95sfod43j342wepsgcqmhfuwa926k4f9gtkfmzgc93stgz75g7ivxdunv9nv8vlmx2cn3d7du230k5x7y1pdzp60fkym4vcjzzt3ggylkk47yy5w2klpd1z5sc683stjdy74w878wc2vb8t5x3zo09i467vai8fjw5obv3bn7vk7x6qy1de68ptx9z49jkx0n9hzzgpltpgb5ulbr89o0qx83axxz6lp528qwq7pt0ejx60hnrat20hpjqj9u6cldjpdwll30lkbu16ejo23468nuzt1ll0hns0yn8waclgjiscpykvgtkr265mqpkmhkrpw2f6o838g1kzuzpgdczyqfgnvh65nz2cm1u9idazl75xcgamlelaqdxyeqvmajpaynrl4e5fp740qmvfozb61tqqi02qj5gt4vnu44guhgnv83s5er1cns9w41l8qs98gizkumyqc788o7wwvn55awxax8q5ztmw2kx7ry7rt7an8u6gopxvfcdro4w8f3rzn6bt7sv82pcuca29m8tkhlxmajlleuewz7frttcseakly9azyc5tnvtsetah6rwypyfv8nkxh2e34et4xr3vj2v7n8vox4bjazkfg1p',
                redirect: 'h2baeimx0uozsqhv3qnzpxhfzd3s91bm8j0245c4qs263hv4zsezboy5v8fjslballltlcvqx80rr1xm8s5cli0m5uw6rhfbfk9mruarztn1i4htglcvr7bb9c8p3jhtik64w91l7ucahjlac97jose33q3mc3qe4uzmuhpo267fxd3g1p3i4s4tpcrmy6yjlzigwq52bwubfv68o7p48ixh24b9ms9snytwh5vkj09ghg8xcdtao3gnav5742vcyv1ghifpo05a9fx664dtn8bn1nz7weca3roz109fxmmtwmfyeqm72zxcx8041s6dmkpyegr4p9a3romhkvycfh0y8dwpa22yvo3zg6e0r3lvjzg4l8oh4gmysp2j7n4csyxskzzffezdqc8rqgdqwpi971wj1qpiavlk4wzvfdk8x3b5pdxq691er9czk6tuy01pz9aeiavf499288hp5h05wr82tpqbnkdp4doyx37ph1cz0lp6c6f3s9bxrkiehtri7m3kwlgfx8t5q6q7kfolzexv655jdnw2kobnm9px7ghhdq5kzvqe0ua15dp4s2vs4n24fs0spw73138zcd0xm55u3lew1eu3r4ogratrivnpc3ml2syt42qba8sqlgtrlu4a8un6e28whnp120t372icdbj2zhkcgxf8ogq6gr7heefag74chel4xr8pfv6kh6g6y7hw46nwlweqyb8tb6jia64qlev97o9xjpbfvhg56fc8goyrsumuxn80pnlbnkgkijdjtjbkf48ax6kq4x701f9gdk8jrzq55zm0guxnfeerc8ueqp6noj1zcimzvdu0v4jw2nt7htnsd1yava1gsr6p7jeyvaepithyipr2tdqtkvs7we40ic8bbpp7staoytyrdo2vqt1o2e6saxcou7u3i57hxezdwv0w3jufr3shwgax1ydjyimu1512msusvwdi6c266a9rxn7vzad39omaiuc2djxzuk8zqqp5oyo1001rtj3vhp6qsev927xa2pggxksi202pvhou1znktondxogzvkor5pfs8ctfycyqnfie5rqn360e0alyh0snpqpz432ty70nxeaq1ou7mgg70rte7e5yy54jmzv3i5hrayu1xc4zlujv57ou11rigucdgk6l33skbdbt7wwewdgoufkyyicy4nq7vb0w2xliu7yjz0hokldeycroiw2a53hp68cm9i7ykegdf8gm39jsyp8y2p8bujhtdjoqgtsqlr0dcqow3ux1b2kyu31nefckx1pzbuixcxakfrat6sel8ogovjy27fs4ga3tep01ptlsi3st58ol4a1lvafzscd9xq6l9lxisltw5i1h8yh6rudm4fpso1m5x8mkwyyxfuc3szee58tnzujda7pzrmdxfbadi99uryp9g6gikrfdpjytx2izcbb9ktpm1q4zuwou39qym4j4uhzl1jhekz1umkukivjgvv1va4bvvdlmo5pk8vs0tnlq3olfvtk7hyg80g7yt613520039lxarwkxq6bgqnvh1jjdl8oycifwupdd9e7ix05qzxl0ts7i3wqz4vg3nf9fpkkl2j7wdroful6189nkrgh0vi3tnvn9sdlo1nfn4h4v0geurseo4l2pz07tlgnha5orc8847xy40uwzxrtp33py7c5p3q9w70hd8x03hpvnkgug05z9uhhfboojgj5677uw6igbk6jxmxeqyp2sozcnhb4zbqcnigi4hkikcnvxb9wbppcc5qhvxhbbuzgurwnswumymsy7yvwbaunu30pdolbv86j4wudyfrkgfy6ins8lcd3xrocrib4m1cbr4gj1oyfaue7rxri2duueodnuo0s7rcwcu2dwfrnqgqprs91hfhbju9p60qz5ooyz7hh17xrzft9jdku5b96eet96me1udgbaahbjyuwnkhxs3lel6yj22srezt02gxxvvszesci7v4rbma81jcpk8ojccaama187bkbssj8ko0b7sspq2k40qkokq5094nl',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 1660034576,
                expiredRefreshToken: 1765319325,
                isRevoked: 'true',
                isMaster: false,
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
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'il4ap9eh5pujc24jzv5sm4rf3rpy0g992tcvt3fqom2q3qm3rey7bp3kme5xi3oug0xq19jk53qtqa8b0syukk7yhu9eqqnfxeabv81u81h13iw7oh4t75quoiu37lanektwh6wnkjkeckoxrpsfmvw4r7dyebcoz8trbk77jx3zpjknm3dez99s68kvzy3to3rvuh0fxs1b3cgwwgweffnswursl4vyqop5aijxpjuppjuutfselj3ig77gafk',
                secret: 'mwewa4p0g556ofqy5gv69j0jhsdxh97a3splkfbq0b2i6nz7jrt20bntwb8dt7t7dkp7rakmr2sk1xnuwpkms3h8xj',
                authUrl: '7qyzf1bpwcy8wsfgmxai3lryl8w6tspzt7t9zoqrbpzeu21kn9bq8opkc3xplr4qkd0xzplt1fww1joppif5uv4ftft86zb6815f8q8qa6gbeatq9p6gt209rd9d63mz6y1sfhegvwlmc906zarko48bbjgmkmr6fxb3k3nlu1dtbpr733q569bt7zylgfg2x1y92mmqidbpyrx8nrdtehdb8tp35q63u820zc0ggrw34aam4jez4b021pc6o9m1m9euebwwkwhwtnap5zf20rzm57u0tttbdakf2dd8vlah2qzuei70dz2goxmo3ls65unjk3htbofapq5epypu2p5ggxxe9o4nnpjddyz5n46b9lu9izshb0m8mnechtfj773zsp6h7cl92o1r5q855bnmkze83ygp0fqqto52g229fiffadj5p6ygeqimhiw5m2a99nv05uu4wov5ezkwzrsm40869u5yab1ub0cbdaagdshnyipaikdfc66ndb5t5kgvz63hg7ktoyxi72qpirjeu5u5nzb6x757tgjdjf4m7guln5qmetq6pdpwx1gwluu671b7tk49kj3merl2hndwrrv3zjnn9nu27hagmpozsxp1om97bkcbo0lg5w0yesws6f7nsk7znltg22pmytdcnzh89mohnfxml208h5dt26lmwyx9to89f5xlxo7vh9fgnzccpot7oy0b3zojnlzb2o1qe734wfq8vpymft0g7kl4puitdg5b1w6cdmg9d4cpfxfn8ru6whz7x25fh970hnfmou8ap0rqemwrvyyja796sqf03vqxvy4h99omqy6xft0dypb9pbw00tcrrn0kgs1y8phjp1xew6xecbmde5uduth4maw63bkqs6hqcvfy48vou3g4x8ds9x7cbrirtvftod9i68jjnkcnx5xogdu8jpsci54ww282g09apgmq6sfwceoc1ifs83h3aesl01k0295ppt9fosg6yiirdnt01za735o5n2xd3xbyi8sh2kvio5872hcan99sp0205w5bqvt7n4yxa535tuq8kyvfdwunop0x65vqeo0qb9z8g5brn0nacvl7vrc8p217vf11wv2v7zjpqj7ocrv3tbbdayyi9b8ybxg3z5cimahnllcvbtayul1pjbxvfb3bwcco5o3q4zh3lcw9komttfqbycaulopdsfzc6eca7e1srizaaq8n278b6vevjdwvfv2fyso4flbjqc94lh8prm3fdrxzrb4h7lu9mzytu540o6j8yhimfbagesrt3b59bfoucpsoszfyq5j39bxl9jeumasimk0xqg0lfcnxtj0tskyg97ztb9d1ynqijedz7lzyach380niek3gvtd1mvmk7hb1ghejh73ywx7m0ewb006h87u7l1fihj0cbxfgzkosqurwf6j7nz9ipu6qslv82u58heq8tzo97842yk18ujcctpmbdagr2d2jmdwr2xkv0p8utlpqvpb5u0m9jjvn0dkplxtpas9jpai8ly46dsejcxssayxji5nnxvv2ipwivc9158bjbc4flrevx7rl6l92kt8u7bp4bplesbntmwvwxr06d4ye8btubkfkje9l81fs0qc0imublkl68u5rw0g6agle7cyi8npsvbmv5bsegrgse07m1vfi7h8kg2gjr932ne5aqdyo5l5dozc8psiva0yo95voj5mdpvtlumanc6cunao6umahl6acl487wlpke5cwchzia4exoni32c5r2lkvvhpnwh4dntx9bpu7ub6hem13mxgdofwtjtbutn8sgjy44malm5vy7f1fzksguyplmpcifceyhlbcfk54sryx74cbz0fm6kzh44sysn1gyymlnir61neurn0pgrlfdboz5x9rhqulvflar4h3w4buza6ctvyl55wwak9u3myp6atcsdi91rhzmrx7ki0weu7iks4tk3tn87jffdaytbiujxaf8vhu9l92fnywaa39xogt9vgao7h3kq0vixl5guawnxugnfu2',
                redirect: '3kf0m2k3790qw5uf28e7nh38vdinxikmkl8xce8v706s1xudhvykyry33zqcern1702h4famctdfs0btye8b3vcy801pglidtxvcr7nrb9355js4s0iz1ubjy4aqln14pwo0xbv8uqqx5lvt4h04bqa2zrca4t2ec0iurq3h7fyl47kr6wscb8ybumdfda6pz2l0384w81d8t0xoyaqn437f0usjbfbygcv449aolikrjlqdsm24vd7a8gyutu7ih4ixvp9j45zg8nnayfbbai88b4sucz5raq8e4b2cqmckqo1g983tooqeexqjyyzgn5wzh5goyt29x1iivgazc5ll5k4lzg17dw8q0k1wl1l7tszh77f0dxomksv1gwnmq3i4c9nh9iiyflx5omrd5yoxvjy5a5ahagjurd7s4yzxqhp1ewxsgz7cvxz87jpi94ue5meuwwhj1nigxk2gbadgbibe92owr39rpdii2mfegm7a029ndu0615gn3thgx1r77g3xqe209qfiogg64ofuij2xqk8wos4c7daw78idzgcg0w3t0m6t3x6awsdnn6sn5950zi5z592kpzbtn6iazriotganh4uobfxwf58dazwowqokyo1m9tus512xsrxsx4lwe6zmcjq6unvk1x4ytc0vres3u0c3aq34x1j74o8pz54whf4napwogwiy984br01fgi62xve5vgbd3bffl1ajw2iungssr1r98v09grknrlxiecvg4y2pd5jt3srgnsi4t20dixncyxqcuyjfnzn6e1t4e79uqianv2azlyvr998d65faisq2tebrj6qcsg71l482zbablimrth2iaae3rs6r1hptipv81az4v1zzero54lcazcebshe11se06r5hd7pdhw0dcxjfg4yqxedt2xaii2lv68gshigixg8qdkeuvt7ydg0nnkg2kk0tkphh48rr28nwz1igaq362muv604av4w01e4pvqbgttmyohra9dffv1mt82615sqgtka3id1v6xix8x4msbvd06h2oveuhlvzpzswam69a9dmyvu6wt4fe35hwgo9tx8gdcx5idua5q3uhxim7tigdasf57oxcgv5bp0ew5f0rzpiuqlp8w8krzuxuxy1x3fbq1s95wkukphl776vpsml0r5in8wqfni8aoa9stce7gr06dmll85062te4r26mbflrxu8bg38txgjv8wvsors41ioin0f5gfu6735r1n9b76f7srbext6t4d7azz8kgwgauvgne6yoeawwrks5hcf9kjjz4t58pf79y0e3wcvo79cz4oz6j9foqj910bw88fnkz26s8078sh9d3i7lnkf7bc2pae2u1h5z39vbpqxivezc1xxpomox3qd9pua4el5avhdnopmuspiw559fcejknsflqwyf53ntyhm6qq79iri3r6srdoaf1iv9loylc7afy5f4ru37h6tyaakoo26bqu8poubr140l9sr00qxdaspe807wfo657vb9sz6ofjrhwjp48dxja754l4ffzrww04p5lja6yychneys04sctmsl62e859b43a1mb43jkeu07yqsy0mb53zeljhghbnxxnf81a2rm9drn3rn4m663i26b43v2ndr6byps9p4gigudw3sa23vkj23eo88hjl4v3pvzfv3pwggychhuwnesy11peqfpslr5q8qx5lcm7wfditoi9crm0eh54ec8ddxzqhf2hbgi9m64ygw096mgy9g5qzeytbr1vcdojv20xalz3cya6z35h032s0ceoswa0e7j66nnv7z0elodusmcied44lght5gqsjdirgm098e3p467d570eazdbrlyg9ruh0g5o2mbzqn4uy9bgx31qobdpzu6upotr1j8l4mruws3qkzh1xydidf0g25s1weil4m9hr1eeia8qt2k6w4doz568akqk60k19dwzrdvdmicp96uqdbkgv4l3eti04vx5m5dkxj6rpppzuq7t5v3kxhqdvxb7b058wolqm',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 3290953591,
                expiredRefreshToken: 1158984961,
                isRevoked: false,
                isMaster: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsMaster has to be a boolean value');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientGrantType has to be a enum option of AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'XXXX',
                name: 'zmzzcxsiq3m6t7gioqxf77jsipqqb8tsitqnoh9hyrm8zuo2qlfkflqouku727cgfje9vem1ewqnfh5ahy8n9r5f6imapi7utz5dymwr81ctoc5ju6a92jmywrook9hz0gxluh0e6xxw9d6sv0okao0lfnjsfhnnyspk4k1wsmo3zfbr30cz1ll6bqsvm4l78qr8l66g4noo6r5hjx0lixp0udf6kzhij9a2u1qv5gcz5zk3hogzf7ju20mimw0',
                secret: 'gh32x0wfos3mkorqzailkf4wqtyvkw2aouyzh1p8z3xrv9sy33sasie0fu53ch8jdtig6j6pe1mnwl3bteudags3mk',
                authUrl: '4v9i988o63oa1gsnv2llgcbiji7bu4azqz26nnuspv91pvyx58xjqip4htv42k51ugb6zjsaz8351108ob6zlwuwcmdql1umqd5abj26qx92n315dtt0n91ue19628po1638izhlb73xclaiw7qsh2mwasltwy46qr51d04rbvn4z1om05r8o9avy49aikdvpuy71o57z7fqi6z8tdfebucxymtbfhef69rxebfex3xuqmdx40hzea115c5eao6oy3btze8lo9uzqqejm82u0dbl6fv88xspqncm8xqvvg1hq2qmjbvrl24d193xhnty204cs399pgkgwqtvecmoxuii5kscxl1zexinnl47dsloslwswf3loujd8u8rse9zpsal7bbfywocpq6jeuyf7h32entovxvekqgkawkzwqoog8j1eaexu6auvji34jp39gxxe4q206e2dmx1g0bvy89cphikuiv568lrum0imgpuezov1ber0x5a09b14w5orxyfeip22bsdxi93x5cgny6tdwjfkfp0x069cnedcd1tsko518wthtf7all9o1zay69d3quc618cj7zqosg01x1hgjzcz2216jgqgx4kqmw4izrvk81c1618750vfbba0lsoo40v1fiyefm79ioxwvx146fbq21780kev1lyqvhwqrspn632982s3nkyfs6ire8503nzojb4nqynn3sjsibya6irngjfv7215hbir5ylueoific73sgrmnob07mhk28nikdwifit7qsprynnjo6fxneorttf0ry58suonmdj3ryd2hv0qnvzh3fpweibo6w7ijj9tlov6rkbep0qh8h440vpid3z5rzb2na7kq0gsba8b4o98nqp8nbl15i9gerx6djgle7xfqpftghn5dlds0uzkmq10xelmkgh37a2xwyd50iyryhbt3zrpvb7uv2asjnms9a3uku40cjpffx15hxkrxy5fuv93eimel8bbyy0vgxb7lggyraah76mm6ps54c8s5ed1e8po4bire4z33ia9c2n9pujxdaw4951cb7mzt9thiylyz8cg8gauyjb5wx4d6pn0grj3wz75c8ijnwjfqn0of0e4lxjq6kvsgmew2j4tr12hyf8b20am1ya6cbw3dqowpzd0qbk5t9g9hamzhau4lgi7sl7mi7i7c0wnfbhkbq8gzr4xj7a915w5d5ko4qienc4p52wan3xvuxj8dheccm3z50490xhtllkbx20r33pfdl2uc98n5zaf3h1kbtv9sq4hd4x4rn73bz8wp20gs5wip4uddh0yt7jkm0j852cxktibvhvzo4hrffuus08hep9z1p6ryx3uqbpb3ixwbwhidaqjfdapbnfita4g6h3tigrayyn75813ogtoejgnqrayqwkz9kgelf8kbn6ozb6ygid79q6ok0ca1otpkq6aiz5qf2kijc93r3avv015v6tsekesbkn6k4j99trdgciz830lztn4vvao7g9td5fegc22c83nukwf044imj0ijoixpca7f0k5q5lnzr8hmsq5t4mx8oeqk69e2igc3ru6czbapx4qqd9kslesz62jrk8oncap32quojcddt3jhlm80el9fmyjvvyecajkm3jy10bdq8pe8z2zml3x5abtmop79m9yxvqbus1891ikwa83rdo735typ7pnvbmko5ctd50fy2gdrm3ixbhqummdo7w788ylp0ym2hhhw807e4ecmml07zmbg91lbfl1fp5iasjrewc4cohx6oijgermjyh3onoti9h8npo2ngt4fk8xcxg4ip4zoubk3vjodeja7m71xcsxcb2cj4f39ptjjinqiyjfq2kvi0l834famjxti4xc204uhbvao0l1ufjdz2gc4s0qxxwhm70afkewbdkewvp3fx4nsqvs97xqk48dhm2p1dzxric4pxkemfpv0hiwpkbpgn75ze3w9texyltysp1orvx6seb8xggrymgfezzp2tg3uqe2d7uhmfnb2z9iski',
                redirect: 'baprdkl1r2764qjh9ehdl52tmvui3y3arct45q9cilzyoogpe849u2v9nvqgrcxtgvps0e96igybscn9n8ssaakdqmo8rsiv1ffcqu4907j0xp252a45wu0croftsauvehkz1z7tkn3gyd0sgvseqjryvg0bh5rduo4zpy2f25tu50kdhq1q1nml2z3ckbqhb0mdry3uh53f8eh7zsi0g294hpzm2zinyof56cljzlzxl26uew29v4dxr778e9ytp4ddblqzn3xs3wmevitvvtclwql8vixgxyi4urottbiq3z2hmywgh0u0ybnhfgdkwnp1vkzwg5aii202v6479ix91gm51hg67fsa6cxnhf6wtss7wuv465e3oemm4me740pybodr4rdwb9mmqparezxacd4hh63mjsf4vpsrh12tvx0tjyq260b05syipu1nuqdzl9kqexv1u7hhvlgxikv38e7u6cxzp09ngvid3i0vzucdcptttnemg7qthnbl3o7krlbin8c28knvwjtvshdcub2ydph1pc0e6zk9y0josmdg62o92pu5ublka7a2f6esfmt39xkiadeik8mg82nw9yag7wqy3wa2ck6l6khhzlvb7b5zmcuud9v704qi2y8ltc1y4b0t4vcks2y0q758pbqaahwsgpohciithzkn7307lvfowjut76i5xhroxzpcyc3xuy9bcev9wia4p7y5wm2y0uf0lscc12w7zdnhapj0yxm1i4w9aps98m1a3nsjzbk0qok6eivg72i6vcqnlsnn85pw41ubz020mesdys8st0p49y5xfl658clgpk2n6rqcffe0lm7plvnof1qpbk83bpolpfatznw6mqscb8g4lhu6uee84d5bd3y2sp7jirz1op9xq3ki7p4t84e0322kya2ibucdx1o0gza2a4hhzbb49vv6m98pma5m9hl6a9hjoxfdtyn8hvqcvs3bjx1pwcl61jchkkdubtvwd5n6829z8yt9o5uu12kzkkmlgv0bf4e1s3a5dgcepdui5vvq6g242qd2hmk1kr4xdkj2h734st2kvv9h65s5ob7rg7534bgq0vfnvvvbhb3b6anv4cvq3ewdh224tjn13cowynjhg2tvq1mwu81zxk78o3bi7hxvkfdcn2n5y1iutfb476x42wl575fxxb7jhca36p75naa7gzp0p0ethf47rfv2gw0j04q7h368e4bh3z5yqp4blrxh8m2ve9n50h8dsj7tamllir9ffb4iif63rzun45w3a9tlr4srk6bdm692j4wtke9375ggkltrg1zjwparkxy08rykeclhaklygquxv0h781fh5a0s4jz6bytzc02l5oqz28b4txejbswtiicpot0vafvfvb22d1straa5yko8jirjymjfdqd2fsdk5wz4l0ykk6awwu8bppaoppcomvz7qmkmk95jmch4qm6fqvp3jmqklunsixqt97v0nw4kax8szbl00j2v8n3t2ieykhxalsuovv16vsw867nxnej46ydaxktn57qkloi3d18rf13y19dm2nl54f04uf5tyjp19rd7z57km5lekmy1r8bre794uhb1s0be0suwadeutjudooighgu9hx1xs8i9ucv255zi557ayatfu0std9ygy863oz4kgtrkg61d37klh63wsi3tcj91hc3uu8ccc9brf7u8gop3smzc62vbbyenuhbry32kzpxcdh05ktxgvhi5yxjnsiq7arkot8l3bej9hg98mqmx1y8mv08qgpjf5iqs5wfpua0xahig4vnzyh88zl4d69omkwlgfkhc4jn78g63ckh06j35fn7hbdp1l18q7njrdzayo7ur1c8ijbg3y4iin84puilogkwmiv8g8xadham1w9jk1uajvtlm3ffui2f2kp9a1s1wr7t7jq1f04mw52gy9k73mrn2wmn15kh94y7ssdf0pujuqdc5pr7b0rfes93ehm9e7bc9hdig8ulvawsgi8yyvrhzn6sth03dhf9y',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7353774365,
                expiredRefreshToken: 4212119016,
                isRevoked: true,
                isMaster: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientGrantType has to be any of this options: AUTHORIZATION_CODE, CLIENT_CREDENTIALS, PASSWORD_GRANT');
            });
    });
    

    

    test(`/REST:POST o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'PASSWORD_GRANT',
                name: '6qsst8m7h02dzp73fpzz2ydqftu9uknnndnmkwbua0k0v79lgxoqvatothpzzgzsdwbsmno42hpnnxx18qy6ltrb8apix9kriddasbruvh8qqbl2oowj4b0mvao8pfjmvop3l63cam3te6ktjwxwqmqdbc1ftwj1kzuq0di5lf3rant5t7ztk1t00otpueylgt49fnny1vl37juwoskk4xo923l3by66oddtuddocqj5r7u2yjjqc4m2la3lr5e',
                secret: 'hebzuwf6b5v0vbl9u07qwax455okgyh8vgvgqg2zqau4yijjg57nb8a1eorjk689nxnxlkxxzw4dynk61ylnl2dygf',
                authUrl: 'a2b46fwuklnqhheiyt2ty9jt69gnhou1lmf0dcx15jaakcnzpip7ypz8ntltklcwrlpgrnvb61qwdcu46h51ystbg7p8ko9pq0q7qi1jro3ocpoqls56uxyxmvitdousmcx6rl0pjsv5yj4f3572msq3pn1j0a93d8eidaafprr5ht2gv8fr4cwjk23uhxnvzy4yuiuccstjowtt49x7eb4rrdheq33vc4sk4l94rl4uh1kads8ams4kwig23d31nv6ys5zk75zrrpsmnnmzkxicdk9ioca63kiic5aujvkxn3xcouhcgtzpw8lywkf28e4zk0lbjrw4vbmo25ap5c36hsu16407mibnus97h7h9l5jtzguk1b3vvypttkhrbf7qjycu4x0r9lyuyse2s27g03o5tap9u6h33cv0y3uklu8joqjey5lfbojyjyv61hncqjwindtnd9p1ptd3qftnrt1edwy7irahnzgjv7z0cpjsc06xie4kod5orj7b8yzqazteig6x15100dkfuv1drledmko1uf0wwwq02wwc1gdqohataq4ddq91l2io1zoh2allagney5rshepz7y2gh6z28md7hwlkt8ynikzpz9zrw1exc5rvrj0e914ois2nd42pshl56i5r8j3bwg0scwm7swa4eagok9tmo1hu1xtnhbtljroyveiagzdyo33gtfxsguys9o9tsinqnk7y967k1r0w25so5ixvai9qyox5prl684imricqrm102ycvqm4xthuypnv5t9pff70r6pepx0y2pqnwpjmhh35msqgkbwdy7xa8n0p6nfkap2b3g9nkbam8hxnoxyc6ymrcu3y6vjd6xqrzn5jheuyg5g77yhg45hgqv2x2cxedfrzer8f2vx9athptc3rpomhls8vjo72sreganecenjt5rgzf8omtntvd06ess1f6hoe91poczobxhoxar04mbm4sle4s718gq4r3thkqloqmoc8b6uuu3vtg83may0shm42nq76emptzwmia5rnxfud275p4b3uxxlzqki58p1gdx97gu45luugimwxaj9qn40yuy6r1a2nbq97eyx1tc4wvk5felemc9rb4iawwz2t2sksftkn17ea8q2ezi53guv7u0l401qhlsjifp9tn6bo22nsuocc9mj2g051r7eoiopimp40zmp6gdy9u0tm1aw0y57oj10vgc8z5vnyuqsdsc6fyjpmhdyvsjmgn9ycl41dlawo1b47lqbvjmwxf3bd10eonstw5g25jq69ub4bvgy5yctek2wesi7q74gf3xv7ejsfv6x05bov72n1omc0ci4vrb2z247yrl2mwakyz99xud0jzyzw3xhyg8hcxrlj4r5ydvah7802x9u28lm9p9bmdyrvdljt3u57rg7xokddj6b5hfhaqdokihdwpk2qj7x28qe1y0sq8kn7sjiitg7m1eholg3j50o2uycwjd5geyctsnrb8zreuu5opgvfmwm02u9jnvf70b6z9ifa39z2g0qn8w01odxujonm7iqypm96fye2vtf0vxnywg203epekrah87yqpk63h0inznq90h79dh2xk2scvjlr33qowckn5vgh1no9gd6i374cwh1ukxash2ek8kkg6nccxao69fqqr71zucxuuw6113vhozdwl2uug1bm95o1yk5grq5s9jlinnuy6far3lxy2nbdzoxps14tlnm2qmpqdsl3ch9kyqvkkqkrvheqrd4quxejlu9wk4umqxuh4j72gay9uwwe7t32ssl9xoq4wfsinyoaor258fzinv9681xj2i5qgcdrqlh3mi62q6yzdoy848tai5sucrmo1jsq3ndv2sxq8u4k61xpsvtwfya5ulaxe85xztm2ocp9z0nemfphy5au3mn337riuxr17wwp60z9bjjfl8t2qmk17k1ij81o3m8hq41u02437myj1ip3czydo5j637vs2dfrpa3rjhcvkrp9fsjtaekio5kgimzzc86agr6n7yp73',
                redirect: 'jkuqsmp5z7x3d255tt0918i4exerbjejdb3ap7crika6e9dm15od9riv09f9euk7j2gmceialdll1aevczqkfz3a5sgw307fvpyg0ge2s63pm6t62nlc2dk45ca0fpmuw1d3ddfelivrqkke9kemacghxeg2m9s8m5qkm3k2pdbxxv057sw82yczeq6gwvj5irn6ohwy0e6ds7c8xi3l2olbpqolq4f2fexvviis11ftt96tadr7d03nmff36b524pp07ovi38ubdewydyzu44enlwcp98g53k8o9d2b2seui1kjxr9y7f70bq24f0hrjcuakpb6a0my1e992dhyhw2vcr96cdby52f6kilke3tta3ivguvoa8korpuc5mdr1ybvtf7xt6wax5tx6tqihow6m4t6hu3a65rgt4dse2ewo5bzwiybna4yivtxkzmccim722r3cvk1eni6ko90rz392uedvhi8cmxmts4v0vjta2x6nnl40ajxq5njekrahpdyh63mbei2yakjkbq25g3z41dfho5ruw85w7nbkim8qa8p7oyznw7130fd5u96rbtg77q8exu7y1ikwaej2l6qp650h2zy17qzwk7yqh2xasrau65bhnf9r8uzafggfkjmourokypvwkn381gf0qb81cc9midvxhye1kl56bv3tkpgc2rsiel9xha3hlt1bjt6fbf6210hj7o9fbnelmn0wwfy6ox45uk68ac2a4fta9tie6o7k9xcoi9ue27b31b1hyj0czk48e717uv4csgfo2sg3qojhrp8mr6z13fb5ms831yd77weoxogzmd4acpsfsdnl7x5470his2tpnkx3h0xcbyovuzhmrjzy35kfvbfifhy3tj0pgn6v8d732muv6rkp6yz2onad99n9glug25hs52odxcx1stfkz5n5wiqusvvpxll39954pds9rnd59wotmhezohi0mvm9nhflyorg7nt9hx6k4wccwyzss318xj215zmmedd5mbwfvka8uvlsy5lru5mmj54c0yno2vhwdl84ei1z9wyb7xt89jxm1d4h828xmdp064xenhn1uu9r5al3ournxjb0xuwb8q3r73py87zjbgpqkr1akpzce1af0ptu4d33ai8tl61sdkdfk2atsa8rcowgqmcsvgkkk18wjo7fxjj2f41ul6dbk6y4c00w8m7th95mudzn5q66p0d8lj7aksdzlmqtzo07jz8qqy5pncyvj2xriq0hv2gxhk2a45dii87d0b385r4bc5iyvumu4glnwh5o6wpnc9paowurx97qnshhy7jtzjzidud21f5lnf3tga1bpf4wlqs9v0a6h39wu107uo2wkgnjkyv6omno4g67nsodfdiyvpyd70xwtci013b4w9poofrmdnouqvp1hzyssl61x7gssm1gruna245r5r1b0di9dme8piuxe08kq6670j6vly98c9l50mzux8wkkdz9ua6t3r861oxep0xjff2ezblsm5vv78go04208zejr6xwxlz4qrstkvu2hao0vxsoq844epynwgtowyrue9rl9h1cwx3u28qee72cpm6rxdkgezy3b02j5002627avepxx8jzpzvzkg2vwq51o09siva60voiit2zqqdltooto0srv4u75v0275npkfgcw129vfb30g4s73zrlhiywni5t7lm47bvr8brstod1hjou60d1fdg3poisvmk0ji38frnrtsto29fndiltbrffedcavcag4wl4afdqvtxtzmof5qksfb105zw8k4z6mzo8gjd6jjnx4e29p19hzrdxoejejlj1cp26bzodutce9zu3rpz82u17i124koa74yghi1uw2418z7fdxy3v4l2b7h1rebeg3mludeatvgiyfjx5xufhglaxsg76t5u9ubvfifi945nhentgt2nvs7ueysjposbmr5zvfslldcaxr6gijak4em37lzalx8uc153rqz9iohwq3saxuynw4ktmus8mmmmb94c1l4dhzw',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 7501659936,
                expiredRefreshToken: 5950969941,
                isRevoked: true,
                isMaster: false,
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
                        id: 'e22a632b-a316-4567-821f-ca5af3c93bb5'
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
                        id: '895b4570-a8b8-4b47-bd7e-9643d2017523'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '895b4570-a8b8-4b47-bd7e-9643d2017523'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/dc230869-ec2e-43e6-af76-c8744addf045')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/895b4570-a8b8-4b47-bd7e-9643d2017523')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '895b4570-a8b8-4b47-bd7e-9643d2017523'));
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
                
                id: 'a4747fa3-46fb-4f93-a09d-661c9020aef8',
                grantType: 'AUTHORIZATION_CODE',
                name: 'lgepv6e49wxd3uxwi02trimy0e5zrumbstte7mqa69cxh79wkdqd0wfjnll4nffmpi0x4d4b4bgdyrx7eyp003xacvew45kh7qa58paqpkwsx7vvb751p5bopejhd0r9614j95cikxzxknjj2gg6gwffsjpluvmx3q9kaoxun8igznhhk9by2tiecq6424e166kobmxmnl5tcudgocuzbpe4obadxks1yfsc4cd2k41ci2uipko04a2qssnegx5',
                secret: '0r2rhhektjbhyk2e68i8lyxiwqayc6xqjfubxins9ww4nh37x8rcfnp44lpxb0zslqx5fg81xkzqjw9oc1w0ayd1dt',
                authUrl: 'n20t81anmj8k2vx5rb2ueik1eegzob3kmrf5y08f7upm030lrmgd9u3rgwq1m8jte275uln5qchiu3j782nsi52a3qzwa8qrkli5uca4peltxht95sz8nix7hoxnjcgnf8ojraq1j6aojnepj5847cras5eo9tjksfok7aljcmgm3uh9xpx2kstsx3rcrpggaknhm25l65thp31d1ut6etjyxk59q8c4sx36dwyyqsqv4hii0bqnvutpxqrkvdr16h9eo042p8ocv84xdn99gbshuwby6ylmiyje5nhnw82w87rg1cmawte5p08cx5vhsbcg8fkz4zj2cadt1x0kvliosugb0l7igvudpgi96dkwovlr7x3de44nd5mqw5t0bt7olbaz39dexrqgbkd784zsy8s6lpu237igj0z9xoyy02npwn3041nrz45ym5jk7014dq63ijdttdqyhmxzodzvt63bhlzqpgi9srp7vp1u3oz6ehibttoefvou89k5n3bavmenrvca8dwa69jrqmr7hmrrm7bz4imokczkd0exn1eovq7n8vn9xkhj5fc8par209266mmyz3uknm3m58cc0sdcch7g9mjqybhhcbwceq4r2w1d7yucmpdm2jzkq0kb9qb8higkk8xq9o3wcw81292qpdlbz8gb6yitgg3t2dxyn391oyw3czl4rnf69g5f8we19gpwwyxk0f46nnhnbx4bu4oj8j11x281p149ckd1l7a2c8y1r7eamnqvo5ssl6ndvv20zbbchnx0pgvgvun7gq8wms94meuxgb90jb5z07ymusuv61r0avcj2lajnrbbh2m42fe4puckzyt2oe9qflv796zolke2s02vkj6wwfds2ticj1s4w5rqdqixsify5vkuyqfllb2bdh46fm7dgb4bhcgbce2bnp5h1lkl10al1u9nz8l1jgtqhg4bgh5dpotku5j9zzg08vbdw7t2m7xudn0vhq6ujtrn4upsnq1cmtt8k6cnq54taanwjjqv37ytxav84lexvven0q98isrzog1q5310azmiydr218tn216rypfk8ay6w4aggld45cvmguf22z3m3iwszfnrirjnpv0pfoaozi1nyj4feobzxjc2tlmcvqbq1zkxetw1w85ocz80do6w5ciujhntcnz3t1n6bfel7ldhe7623r9cwihyj4fj0s4jn15keg4o98ow4mkpry3tbo5b4ltm5dfxq11kccj6o70md2a77ijvqiqbushv4vo1wsmypzdzs1fp6l3g4qhlila493fbw17p75ys9gyddhvcz2e4tfdhq1710u80g33o8y0tj1d7owwjrro3vuqwv4sulgudrh80aj3e59ewizfzyokeq1v3hk076vnzq2nkwue2rsjds3y4puqsb7ziu77wdg0b3skg74hc07ze4950d1b098a4tpe5lv4gftjx8cs2ml7nr6w56tdxz9vojjupmdzqrk5z9m2f96dvio9fgw9pl08bdcjc1kx2o0djnbfn5ws0rlo6crpc0fhew6y07ysudxm4sfstqqx609m4bstiyixjipmk5b7ohkrb6pkg77ufs13rji66vkmhv1fd0xla0sjg8b7496hqtnwt7v29ah4kmy6mx717l7qhda6aoeh5sf87a5mpmsvdi5dnfd5xp4uikaeqksy91q7gmztug699fpilmtg021xdti189i5b17a0wq95siyc62izurj7z2foacrvugu0q7ls3vddvkj15n867bzy1ri3k2ibg313awnyq0zbx7q0or6lubnwjahspgv1ziw2r4d7gowwzba65liv36ln8ats5wfikqmv4v23slr8f4968s8wxi5fep3ug2cp3f7ut88pa8022iannn06jebkfvps155bt1ynj11danxc1fp2zbyz7zgwc43ymhs3lyt9h9d6fo1yuhabaz2jvrnm4crlrvv1lhw42vc4p94jkap8ujmtpwhjjqygvg70c6542ll055tpttqfdvabigc9i12f',
                redirect: 'h8okx46350btrqpqhgcoz9opozegp1cwvbshsgde2um0af5tnykqabxxxkdzloc33708ehgxns4ds9v122ukxw0h96set4wdgxz2wa4gt5ymz58tomp3lwb0pljwtsljkj3my0dls1phvjx7cn526yhwthpx0rv0r918iksl073v4ynl2omfm8dv2c50njdpd2uit5hxc7k7bvtvkf8hdxjv3q7wn3sq46ow7u3fqo5mo96uvgfmvxqv6v62doa4rd0uswldxe06rovuery6bzmspyj2cmdug3h6xl5s5ts7acu3ib92sgj1jb60za7grzg7uqq90qfoz74k9hh9vhrf5yu2doqin20r39evjfvg10x5qfr0bborjx2wbt8cmnfw4zuacabo9vtp4bp5d0d4q0ccli5qgv2rqxn1tasaqw2dcbbqg1zzkagtbm8988mm4cp6xg32tsfty5ah75ycdmf0r7d016k0ot73u6ntkk6sfaf8d3z4m0c3v4n9saqmhm5z1ym372ut605g0t7ql13g4ax329hb58uh14mrxapnw7frux24cczad0565hf11r9g63nsdwm74mnkm68e1k43ltbhwynpkkl06nio4v3e3q6zbk81rkc1wihyuiizvwvdr2rve27oh5hbnli10vpvmvxp6k2w2eqj5nmv41mp7fcohmm9w7lswzs2e2aes0ebxs18j6vyy6qfyce4uarxkkd12hxpo61q0dr4wegdb3osa3ltc4q57e7wk1mbjfzcvkgniytm63p0vrxy8zg3uk4p6ptokvejifx63bei4sh673yivk6jbecs5tvfha9zopbvplf5nl9wep28hgc0w0w3lolws94b0ivwe6pny0y0odgdsv15dcpj2tm5adaal3o1ckev75wiwza9fp5urp17vb82nnznsju98t2owu6kdturig18ctrf72kg3eg8djzg83yrlte6pgdtc7si3igsmvoig3j4veqno3726t3p83lnhwwdv3ps8i80ircidtxat6nc0jjm3f5cywxrcir9brwexmo0k1xq05n1qol8u8vsl343rplq6aie6dojn01twgediff7apn5y9olirq0iqv1762aiirdj000rutb6u8vg2h7ae1m81lh2f5ek2czj32nkxxm4bari6vzcbu20hnzt6uss7jvmtacuilci0icqzjp16h3302pkj8vau79629f1qhliq2ohu7xx6f9eg9fpqxst6xhjuyk8ptyhzj2dd48xsm6q8xw2a7wtnpxhaj2mo8os4m8jcumnndloxdhsum7j18hvcsiculnx3fuxm0vpyir9ctp9iqvqxz5cx1jqne1st7z0cefk9ty7is1fghq4dg7hroudvervtbmh0mwrhv8gy55bwqpk2h1z412ez9xrq4ng5nab4cv3ah08ur37bhr6jegnja919mvw8seveu6rvp8wx9vhaabx2mwpjpa7o3zqenfxk1p3ar8pdmnl42igaaolnck5wd4yt4szzse0s6kfn6vxte9w3i02e12b87ecyxx5jha82co5bugyfxzg0egtrfecuk0yrdqkw26ecrjvx1q8fax4m3agd69no9ep03aeshk8lwvdxp64qzzutms5igqp7ahoz74jnfb0ajnnr8e6cmsbnabegks4ekzdoofd34jrg6x4ngro4sbvffkwzfovbkvl9ips5wqbd4lzbh87g5ecv3zzmzqmd2n96nhlfdsencejui2fkan5rr6cu4q9qmv70cex2znsuicomctgzcy254rurwussshg2pf8au9th54i1c29zesn7u3xmuzgb5jgqj68cxhf7t6khf1ghmomi9p8ijbpxoos66i12f4e1ilz5sykuc2aivdjsi3u9sgc2nmoubxlybbt6obpv3jmp3fwqi2mte85p2b3vpv6n0smhiw5poc463537x90j20aw7iguinz7bk6p4acgvemfbyl1tu3mutj9a4bthobfyu1hwmcrk9idv2inqn078cpua1grlm',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 6027743319,
                expiredRefreshToken: 2200717976,
                isRevoked: true,
                isMaster: true,
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/client`, () => 
    {
        return request(app.getHttpServer())
            .put('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                
                id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                grantType: 'PASSWORD_GRANT',
                name: 'pjl7mj5b3x7yxxab6bxbzv9ydxy4ep99g694xkqqms6eu3dtpwxzcjk3li5s1vguafw1nkaoz5p51852n999nolvdioehc3xw9h1cbruvp6dav6irh3yu2v4yuv84u08t1zjz0a063fxw9kq216l2zufpjoq679ajbqpnvyrarql48p85xte55buf5jhxdd1s7o0d2nhth1ml6emo5ku3s8ryw6ba14fcb2vkje8ayjvc1pk3jgvne0457m5and',
                secret: 'r2ndpnraw4prd2oyuayur8k74x33fi2iwvlmzy44pzf01iajah1rhs9snduxngdncby2q72koe8m8d746udh8lqicz',
                authUrl: 'vyw4odcb5xylfp3wzuyifkj8ddu9fzpw0tlxtxofr4yjlz88wypxukbmom0ueeyqezey4wwzswx4i4i8wc408u8wr8bgt8tsn795a0wskjt4v6d5j6coahidy7nvs1f4t03s37m8bcm8ot8sr9mi0g79icsagog2en3fi6jz7nd72fjtgzzoit7kjarnbf0kjzgmpp63cj4f15262g877or91u2qr24nenhihz5vw7m11kz3cvpivxqge6i9a119mfsqydlfrj74jfe3j3flaf2cn694458v8k35xycrlxmjr8i4n9erqa8ssxcip4xpfbdthva33uhfr3q72964mcgqyqni38ql3rtjyjjyha8u0z7vnqcysgcyrnvot7plt3x5gsatulfooi6era3lfeijot2p4nloavrwyk1t2qo0httmuyk41glog0hqd828nozi1wkbldpm0ltfvax9z5w8hfg9ka6q0877r9osbwaqsxrq88dvianqu7381aj6addtjpjnoaqbitsf5tvto6ajsrxpyotyl5nn8cnhcstdnqivo76medja8cq5seu0u8ito963qrqhwd5mxfdhhq36py49z160nfhh4zzb84a5ryyj8zksuj8hriq0htzp4up9qyw7u0s1khyiasacbvwesbm7gsa3rpernt1g0oeg49p2v82wp62n0v7nmnrupe7u0dpnlna2lhkeil7i82klgjb19kdyb7isjn38wsc1ptdwrvye9vcyj4b7tbo5s6et9gh6xorzi9qnl6qbx308krw5j6a7mw6jgzcfqnhee7pi5yhrutrpmcu9ax07rca0s9rs8zo4pklj01miv97xwx9f1m7rglfyun2bgmr3erwuhomxi9uh90y7dj5bs59nw9jkdqswen4p2v4fg9bwvtn57466nictovntjpe9ik0s6urfsvtfxcvmhezb4ffmz975x0yy7zxjx2hpta1jvj9b7bck4cxqj5zc6zh0ek2d1lxelwfwz9mpqq70b32c6xsmthzjyvydt0tr2n6isiifb4ervopp7bgxe2vdl9ucy2h20dzayuomvyqsh88v52mzbt1k2uup54feu5i6alpap9jcqil9fpqai4krcwj8hjgumqjarkc7kq9mbnd0w3p1lqeil9gohupd0t0312xfthqjx3b2ljben79nw390b3lmawmkeq3lqukvwkuje0xjg0nk90kwtc1amgotqx9be7zf0812o2ap6fhlazfakthtnmgjl3b1opv8rrphyhhj8siulefjxzrehlhwjeacd73ecoak56s6lprbvn2y9gigfmiqkd0dshu3als0m6vq06nrbge9y9m5mmcot8ylssnr2h8hczazo14ux9vfhxxaoreocl309b7gtyp0q36faq8m3ksq8yyowzx3m8pk8or9ovk1koc0ad33wdwcj2ckhgd4lgyi7580uv1tyiesce0wg7hrwl6y1al5fxw08ltqhzh4z06k6npgyk4newbwe7buxxqxh84hfo4l7l8pgjm4x7jhy2ddvevukfyvgtwv0g8ia95xv049tinfu4s3yiz68n38l7d2zpg9hrwi1g8o9cfpgpuicfcvmwq6qkboxyo29mdqeyr4cmnynsl9m4v6xf561vmcpea2shgqhlhdl3bvt8wiopvix0gmtg46fy2o71k0yyjumahevbrqjloqjun87aqt7vu7wwe6j9qd4oi5tx1y37bljs0epga46de0o4ovdvrod3v5lwllrfqgc75mmqm9svw4czbeaq799lrupo7iyj1wooyjz0n0cprtzxo7zzyaifab7cxio6w61l6msvl2h5lzh0g57uma4vw1cx49hhnvbz6m9rfp1y6ng13beag0f9tetrohiie8lwvhuwfmayl7l5hm1v8apjy21hj7dkdcx0raeu0nygmtulpdncf35r075ah7endalsjlonghg85i7eh0mhy20gortjbrhxc0836i739o9b6y7q80q5z8qw5nqc8ki26uab9ba6qg',
                redirect: 'u50dyh603kbqy51tezfg82s9ykhz3vzi3nl2bkdk2luyp5a7huz4xdh1n646dkweup3qzotppffa5r7bpo7pc7m2zzvourtxbuszjam1ouk2xkq38j1ba4bd8r1qwuavwba3cbxfljtr77i307cx1oykebvmhab2iotqplqlhfnwbo9pu3imoragtn0cuqksu91x8snplilws9hjwpc77gn7ji2grx68a8d6gx2ruhynasm8pel2bsiryk0qevn7qducpi707nserndv5x248lqy32d9k1lmz7jf729guk3znq54naimuvh0h9xsmr1dycrweu2ar51n0um92dh5zh0wryptkqk7rx1aojkpd7hyoxc4xxkyp3dd9ht74qpzvj69hoixdhqcv0fycwyww5u5t9vppbc7ohja7dt4je94ihcmfhp8tsqk3vppt125tbh9tbisws9ps42oo8twrspsl0fggc4cauhkmlolhhxl454khw5l6lywximx4m5nj3idhdsf0tnl5yh9iiv7fv8to52lm9g7z0dufxnqbto8p65kkn83hwc8dgoj8nvjqanxstyyp6y9jwwp1sbyfnced73x5bxbcogw6649k41lr5hfm0jftuolrumwjo4svaylk1qz518ye885t74lub5of5xgv0pbo9k63j1g8kypvgxdts2mdvyseku5w9fuurhuk1t9gepzrvmca5argbyivlmqqzv9p24g7fjxu999xc13mx4y65mlwo7n3lu94pt9jtp9ljird7il11sgpzqozhw4te3pous5mytnwjgkabcjfg37comvv5iv3kvr8m0ltkrcab8p7h53q1czkz4pbkmnoehinjit1fc7nzehifitge4yv6azir36s3g143acqsp55vt49v7n9tbn7gu2xy31p3vqemzaz0nxl09pa1cojamjhdi3jd9di6cty9tux951p5r3nb0qiv8dszllriial363wpimhriul6n978lijdq7mogsb7srb67g6nwtyqe2bgw2ry4p6vz450xqmpeco2bh6uzsd46lfsdexkpgfqk08co319i1eondxcht42f2ptgdjnhy86qri4hpu0m7d74pcm63dehgulr2w18pyv7y96ixcp7bked50bi8ir5afwu73whii5ucz5cz9wewrg21y5r7lo5zu3lkimomuez8w8j4jas5h6wfp3kaleeh98sqw19g69s8nkpims8q2mkso0a3yr1qchfoxd86ndisryxoyv1u4e7ajy8t878eax7pkx6hn104juz5i7hqmm2x3justtxpn1jykh9h1sk53y6268e04whnaegw0m1c494ot67z00hgehz21qke18yhuerw6car6tayaupsyczem50rdf05wwacui4zvn5kx621ly5ryemi6n5l6qkjladl14b3x2i3qyv4ncac9lrm6jwffxhphcuhrnz2z0pt8eu0o1ewzv5bctfe4ieddo0l4ewsy1c0inpvce0hkeqmiwe3c0g8k2m6ixrjrzhhfq80tsqykdwgu3t7173r8aeblofmo3o3xc22g9h1eoszk3rkoa0gdo9owlls9pv28ldaouqctyv9mf6fpgmvsc2gik27vo1ny0q0b8dplivjwkt6k629fyz7ue601mkrffvil1bvqiswuuy451atox06afv6wasgumaahyz8egwvy39jxmo7dvnmbp4bxvpcvawulb2ixbofwipg2e9kn5pcajlfgcyasyktzjxv223sn10jmn5fe9uatigord3t0jt71hn7z9hwi3datbak13um3se13f7zz477cfxe33backy1v7axvr3d4zpw7z7ghedip4ssup3hm6057xrcfftn8umygpcsdcpa8fhkh2km8t1xtylvrv60nsn9ha3qhhbwghcwz0hi020qm5f6r715pb1ijp1dnryjwg30muxq25ombbcmts2zrvcsd8oenvgqxcz4zr0h1vxq4ap18z7xbjpiv4qmdjfru4st5phrpane6fewa56c',
                resourceCodes: { "foo" : "bar" },
                expiredAccessToken: 5991177273,
                expiredRefreshToken: 3933969543,
                isRevoked: true,
                isMaster: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '895b4570-a8b8-4b47-bd7e-9643d2017523'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/58840bcb-196f-422c-82c6-d5fd4c51ee6b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/895b4570-a8b8-4b47-bd7e-9643d2017523')
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
                            resourceCodes
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
                            resourceCodes
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
                        id: '89fea47a-e7ee-4317-af15-7859587f2826',
                        grantType: 'PASSWORD_GRANT',
                        name: 'oace781u4qg5qmg2oq5mxmbtwqqsaoqqhdd2sykg7ob3x25w6dkgclz7x3eexvn6fj4whmmjv9ncmf93yi0umivddco2dorltbc7ckpxg4njver67ntnxoo1gahyspj7d7x5w0b7bhbdmne4amnw5k6gjiscvjhhec6nkjvbg7lzrzixqh3mlnvq380kdxoa6rgo9yh6ks8fkniy9h0bylc56qpq3e9dslqax2v76etm4l2bohcuyh93vh51ed5',
                        secret: 'b2qyyqwik3d40erp2wgp4b7kp2npu4ht2fir3k340fn4jgbgqortlr0ev3pzlt7h4qgrv30tctwz0m7xwugc1iyz1u',
                        authUrl: 'qotfpsosr7hffp45mcj0p3blnxgl3f17n9ydibre8gqbtd7xwaryeqnqahz8bhuwsr2i9559xfwevqjmnid7a3tr0zwvk3a7ti92lr49iulq2glerms3wp8vd1mfh16kv8g2pt047ssfrwwgxcmikykuhfj1xem1pidapdkxw5qx3rh70n8qw5q88la6yvpj9zhazmjw12y1ci55cm76dplhoan6exq2ydwlzsjjacv96px64507plv76utkgtz3e5a988octblxewhte4t6h13jv2jm9shaxgss1kccmatj8plsur9a31xq3af6pc5cg2p6qht8nxngrc429a473pka4x4ufaxkwvzak456vna6qddnq88p7gmrefi8hgxl309n9cw78y624mivff2fqqn1sipl24co000rxc5i5zx0k13yx497yv9t7m25c46yz8eo8spv82n7s3qh2l52olw3f4lm0g0a94l76xx2k9l0dzioimuuwb8j9645tlxxqrckuw3xd46n5nag5t8mjqlqg4e59f6ns07zprz11p5dtw1zz45g74vcq3ro7g3f0jfpgvksut7euh2qy47ryka9oanledl8n7bhxtjtycvzvn0o3doucbik9yjtuteeok70veew4dsp8yvxgrwtwi7m3ui68i4i6k5pd9jh4w1lk4kfdwnd0uqlr8f2rvsh4vvdrvq3e0kaydox42yt22yt9c1l1454rdb29a9jtn4780hshhzy8k8qwiya2e2kl431t98bhm2b8lvkze9llgrkzwgwzhk1gcx50b5hs2bs5mg0lnq4efd0bv94k8ti7bxv0jnubne74kih4k6q105029568xysvunyxc5qm32xxzt8iisolvqxv9dtvn9vzfu70s1iya1ii3pv12c3qqt16n2bdfhbg2tsr63o1c0i9rz7p2b3pikpay2tbc74k91qkkajmjzi1nthfwru9zrz5n640rd2n2ai4rzpjjpfofpkzghopdrgx1yrxggd7f32i6hgnkh7umgicmz6uvv7edxbmvi5v4obc7rh44y8md769xr67dv8xgvsq6hcaog0d42vktz6eow5l9sebe2eu997oc51vne9enwgzxod5bxrlhgq4etse5efj8rzg802bff474qm00cj5wt5mq7bee9ejrohgd24thusigbllnm8i72mqwgcg71oo13984btqvltl0ji37c15iuxogemc63ta6uvn4bf7u6jt7tsg7ge1hti9gloayyn9h1grl9du1i1nx34n9bges9xmpsxd7nwo273og0mtq8ywzewc7rfrktnaxrnwcu2z5fdjpf5txfmcrqk80he6hw3z9wqvo3v1p2g1mpuac8i9s0cut35qknrotkocxs30ro7q5qjg54k4zlnzzmggteap9s17rxti1y15az4kn11xx7nwwy9amwjqkzll75wxk6f22pp6r7h5qoetyy1bqe3jnpalx0s6fl3ceikdnn4bn6kyevvmtrvuure5k9tyhlfunia6oa1wnrqqv79wjw0cg0rgctyjvmrekj1vvht13wwo0tkkvz1iq3b8xpjmutbmct3damsqi9oz23dyvrf9cuuoot0ugv2hcymip837ney48dxxztyzf1k0m0rhwt67lba5b6vw8zn1pt0fh54xczejhemr1ux4hs8zozcjon0pejntma8boqj4v270mgf0u69brd3ogbkqwr48vd0nkizkcqbr8e6vr6i3l3m2umq6f6tupjba0v2o4rmfpxan2296xx79kzhptttvir12afj1m606yz5zqp8sfpsishhsfbetujtol86o11iylxd9rt6wzc9x078zmienyvzotnshqpb06qeqkdqzn6qji5w2y6hdk8coely1s5bs3amy4b30g6zlchgdqpjw4mns8potg9fg47vw151xbu9a9z1q7bo1rn8ztfh7zc0dutnh3jqupval8zfnwvuwst3rs4za0b45r1f8jwfxp1s92kshsa58t5x7lzh5ohdzayk',
                        redirect: '556t5oo3bzl879uf9hvh56zqj284dhu7wgf1l3ir31mb0hwc40zo4o7x5pqqf9b1vwf76atirf935nunoha7o07eb273b4udcf2e13lzrv2uxqtnr04v64fsoydgcdt5m2oo6agxa7xw9k5z6fxhmhw11uvpi300k603vf97c2qd1lsnqv6zhf409azvow16gokdrr5xz0hfhinefh4emj6mb6w6pdgv7ayqftfvcq2qj40j6amw1eifbb8xt124fms6j1w5vit7tju0f61icu6iohoayfchnajijaffa2b43ps39zois8oemkfhx79cuz9syxukxhzgb7ctmz78aorwe7skt89kw686t3xnw394x86cxj0162uki94266o47dj0nb8lbebk49ydq7uiwfav5a8pxvfuk05x2xz68mbzfqrudm95bzfj6dinhqjmj3u8zksr34gmcm67rz14mokgo6waiwvrkunqjle4cxc8kyh1omega3jz7y941fryl32q6ybxrssxsr4gz9rnbkrvjdr8eufzemvn3cyzcvliq3f5p0ikv4orqvn5b6uj3tcw14pl5k81rcni9g0y6qbf2w1g9clz0wsqxmem5bdwukb4bh3dyxg0klvr8x4oolnzbzkgz7d715osgls3z36cso1ow06usxhmzuf2dys04mk6nre23yc5t24iv627z3tig2x8lm4a93cn8m2hzv0x71rglnfxwns6brpav1chn9nunurliftiayhnxcdebj10fl0oetr2v2w8zu15zdnbgteaefqg5o3jmf62ib7ljjwga7blwfyx3697f120v4lssuix9cvqdcrb20wbplfaza1pjw241c3w4cjukmi2bgc5119pk86oveqp2dy3ayifn5lwuz6scv42cyrdg3tmwp380zq7c2i50q03y78rkhqx8c398mjg7s61z2cl20xzkh7vsni1lp67qeb5pwqggtamus58nokeb3v0sedhvym3ecdxf1jjv4gokaw3x5wu8bl3d3g3nww9h9dlmez2h4ybpkcre36wzxtcf8ytumnm0s2or14u1i5b3p4osss8gaug71k4o2u24at6lbbmglws2ugeqdt0m6zvq9b7lv3n35jslqf9a4yjbl23c2kcszy26gga3gf83zomfumlkx9d44nx5vnz18vhdfxpqmjnbjq5b78k5pivn542ugwl8xitkd847clfcc0a6rb7i6n39d9bqd788y2r50b62xt1w93jvdz1h21t33tggi9zeo96ykayg6148vy3xtddob9g2cyshoib40h1ldpp37s9izh0jcco3w6bsde3x7szkbgi32v39964wxvyzwafc94psacjv3n9t7muwkx56wgfjxbed3785yygrnt62nswy1yf6a5nse28rd44dpapxusvdc7h936y2qwm5o2cjke2nrk4pru1ihdpdbxpfcsh3tbxl5tq40za16qsnm1h0ndq56xx5m03y4c2c0xf18mnt0uc276e8mur8k6qonzrxkjr6gi06neeybas63xjou4be7zrwjnahfoqvpj2o9eox3u11ujamg3n4cgtuj27stmih6kh03ukbyfu65yvc87rolowl3m71dvh3dvk7zbzxpjp3s006mzhs98kdk0w3pe3tzqf4qw26hljpl4rh2gvcg9ka2ep7nis6g7d3gkdudp3dq9ndcnaw696ladfo9kjfsli2h4fqz62upmxwwo0ykooeaaspye3mblmx5g50lmcz3znbu5s3ib0jem9dx109twal6mrol6twsprvt2uzpn7xpdu8hkms3tv814y6rropj2bgmyy8nmpp7l0yxhmdnas3g7123cb689puv7lhlwomyfm9y7crnopdtvxmfl5w3a5ruznsph10mckv3z02748rz506i5ljcn257zlhqda4pxon2gqr81qqmpf55y8c3ohaqui9y41sgd8ok8sq3lh4rvy3w4mchv0jv7zq6t1dqhdyum4lh7oglf9iane5tq9dv10o3pe',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 4704178884,
                        expiredRefreshToken: 8480061895,
                        isRevoked: false,
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '89fea47a-e7ee-4317-af15-7859587f2826');
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
                            resourceCodes
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
                            id: '16baff70-73b7-4f6a-ac39-bb2d312e8f86'
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
                            resourceCodes
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
                            id: '895b4570-a8b8-4b47-bd7e-9643d2017523'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('895b4570-a8b8-4b47-bd7e-9643d2017523');
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
                            resourceCodes
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
                    id: 'b315d7d6-12f7-4dcc-80d8-3d86baaf8e45'
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
                            resourceCodes
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
                    id: '895b4570-a8b8-4b47-bd7e-9643d2017523'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('895b4570-a8b8-4b47-bd7e-9643d2017523');
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
                            resourceCodes
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
                            resourceCodes
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
                        
                        id: '7dc761e3-83c4-418d-964a-3399de1e63a9',
                        grantType: 'CLIENT_CREDENTIALS',
                        name: 'u31073ytkuua8tpt23kkywnxomtf4v325ccq0ewlfy2pl91fmj1p1zqc689yd6ovipfjm202qokli5l7fhzj4h1vvp78c05006kybw3k1d42szsbneu1iroticvg3h0wkqiodz2gvoxki5elbvilalzqigbl3ustbujhnjrhlgyi3g0m4oxx1trjqmk2m6climhxgyri4o8t7wcp0s78wlcpuxqsvt602x4c2yrphh6qwmzn1crdqa28kiev0ij',
                        secret: 'tpplafd6kbl6r0jnh070k6o0qdldwb88q8guchfhhvmbs9ds4x74u1x0j7a3tl6t14n6mjd8wdzql1l5i1s0u1gh2b',
                        authUrl: 'cis4j6jzto8ycim6qs759lrcwhjte9dotrvrgtad4mjspbrixb9aeagm5c15ps0ykf8flq8ocxad0n7lzxuzgn9j8astxbaqv6jhci82gvkh2spt54y9sbcf4bhuaayp6w0200kahri1fbu9xr735fphy19rlb58thi75aa47i1ro04koa15sun1kyvfz3h3gh7tszg4wnldt0yr3h66ew009br1izuxco396egnoyh17feplvo1gkong08s6tnjsxmngjhtlmrf7uomnyk3g7b8z3alvgkhej98q9n49rptgkm7mps7ps2rm4mcs2d1x26368iz44yxpzamf3k7871s1z5o6q69o5oj0vq4wna1qvkv7sql0y45m4vgdt47kspb624w9ifyu6oglg44oxntld9gl06f6wl0dz99sxa165ebrkh43u77yo2x4kadwi5bqggjjgttt6qmb73st03s1vcp0yikf5wg47soitl3ev8w8iipw2rrfq4bt87x31nci44nsylfcb0ul01m7lqjq8i4bv9g5urqeuc5cugn9p7zbfnabakfsuyw0zbm36tsu9cqmjnpc63qmxtok034vp3euznj3cw1pzm3zpitckuq6au2f2d712juodyfydta8mztjnjkcxckztlgrp70uovsdq9c73be82yvfrfhb3oalv83jb1tou94olo9x4e5011wddhagtcuvzrhhv7u1dbofj7jir0ga8b3g64maotsfruc0lljaw0x616i10ri727n6sixnhdlwfkltnneuv66ghp48mj2qmo6c7be7ew1dgxomr6nxbju4buuc9ddepjfwqqaata121xxn87rbugbkweu4ha0sg4co7e0u6myty991pk11tveamlqy1r88e3vpw94qr8ugnqsqgr1ak6zqliwcgy1v8sd6a0m0uqbvph4v1pvuxv5qr4fbqpp1ccy6hq9txmvjb9kz0eh2ka44apfcvxnk3l6cfvr01m59nxs1tdknyt4gk464im7kueo5q54x2pn74s18qgizurej89vusujtjpva362m2t0vp7k37a8mwsgg071ys0h70ja2hfd1ra83gk411mgdy8v2nyhf71foc0z9bd3bc0nid1fwahles9nl3wsh3s4do0qfgqp2ndcle3miafmmip3yls0txndyo11l2eejaepj2uyeb75vd2jos15dfwyoqz55o76v42b4fbzhyjy1rjm9re3uje2ke7e6ikwe3gktrnp6s9gyjm3zige0phger7d4o1bko6z61lp9fyz8h0biau8kr62vl6c27jdwnw9tdqpqjjkuigloxgvn69d3ap9k1x7yp72ahw4255gzrev3m7mxa2hip3fqk0zms9r4c3h6qk9gqskmo5pkwieb3jjgvlmujxm7kltceje24oryltu8myrfrb1sxbz9x0qb021ygmbhlwezgcvxyyslxv6nhj6z7jrj9tgt5ewcu1knx5kesdclzgm1it3hs5x3e1vnn041oh1fdjuq1n175ihf30b282a5lbhdwgqy3kqe6nemmyzd6y196haazw3kwlcl4r8deq27mfe0qnrohwnksc9d309yu95xng8w7c3g0gpd2tlbpbxhjohuqrx5n9elzqsl68d3r6nggcq91dbbc2tm6e1sclgnqnmro2qjnfvz2pc892hdaf89pl44x6gdp6zqnuddkcuwmm2jse2z1c519ibuy1fozye33t4o7t53evqt31rbhhbcd4fyco0rh4ywix0eaxg9023maah0jh0qj28d94fpapm7jv28r322oa18af406cvj47cbf3ozzp5oh9hcod0s17xnnokb2v4idvd1u9z5cyjr6lzj78sbffq3n6pt0z3lbgou9ph4jqe1vi0stvfoj1eiy29hxiaxkuyqntk094mkpscp14q6wu0sd93s6giio9wjk0dilebgu9zwqr3rw14843zobez83k5vj0sa9uwiepiygckgly3wihzkirzp7eqavkk20ff0igic6z2',
                        redirect: '96v8m05qd9kulcd2hl6xcb7rizbafse8oep0s504naplv4dobpy2eoxo3m5zd32qzt115uo2877y327efb3dasp556fe22mh08xmf1bl9bkr28yfgyifmp4rxbbypoc3gn4uto8oq0ghmx2zqqsh4c5popexctomz3u33210150d3h09lkobcr3b6s0wz5te5h4sh3u5ucqt1w8i21yz2uo76pp6ycby94r3u6dbns08loi7kaoqlxw0ngwotyx4sw44aowossuembdqnkvdyzh68xar2fdvbej7e1caofdqkc6woabgwz5prxtscinquta835tys9lbk4qrpm1su1d6t5p4xivjh6untnn3vfj67s2q3apoc4ursblallavosdgmpmki2n0ncohdzngawb2jj0o9oygox65jgixdthiea7bl6gh1a3y24tz4aarvcjgw057pbqxw84uibmo23hg83t3hu7117m993r2mxuv14ebhjjqkht2op4xwh1les553y6oh1yluqnatw7o8eknisnryeu07e6980fhxea3e05kxnv1pe7dfkwrnf69z9jmtzaw2u8myqqqabvcrwanp9ty8ya11nuveyf14y62elkh2g6m50rkwb35eypcbl8qxbq5hh1xw0j980xrny5hxzcz6f3fyumoxwdf9rxesuetyh4zy6l6l9bofxd0eirdwomc1a3lnzgwbk9mec2ptr06jyl831cinzh38j83kqysupw0zxepgseyhjdjpv89nupdyht04r63ilo0pahfrp6rhnntjqg2zgpqrveo2uaeddj2zmb1bi80s6z151h2dvg8qa3px0rutq946plmt73g4tcuti6b8obawkkgil9wx05fikoo3ean6po7rqpz40x2za0emf9yuzbtrmgpmakt8231e5w0iktgsfddf5vjgwpp36150fd9rs650puo8gk5a57uqdcsb4y1fy7whbvnngt3pc5etuchpvb6q6lbp4yuuq103hacjwjnw6yfyqq5ntgwq88c2vpx8slujwrmo1z01chtkt0sydlfl0igoss04byaa2jremiioklurhxxqpqa1wdricbqxumgshbuh2aa15jsl84d5wmlxfqgfut1yqk9v2xnnkux7f628e96359fymffhw72nslqu86jvklor53xy4lkocshgaikuxhg9h8ma4jx5ta4dec2vu7tvi5910uek9qktg010pf9s10sebopk4mm8vyvqztzhpctzw139trtmzhexieepq93vuzxly1s5ln75hzt4891fdcrmxc66jfql5xt51pl05qsvfwlnxzuud1sqgzrz01muuo2dr2t57rzqqxq717yvdc0do9lg066n79fd5sjh7ra6ipz0gis8dpuwr2tl2hsnwjrjz8aucgkdzopik68tntp9ff3a03btfmjdiw98yr1b2pbj9o42zu33t5te6mkhh4izx4yjep442x92mza0d5xekend24s31h5uojxhxhp9kk08rt7nbamlj9bflw5c9h9j0q1rzq8egpnrza8779wtgb4m6g4hiz20x5qoxs7eig7goscl1uixbt1mbyeldx1fqwl1rv6eend334068c57e47m9ytwahbo5u2iv0sccfqel3zcwhn2tj1egem23yi4ccviuvhbynkc36z0q1cp21bdulys6xrx7xekfgm9jbgjp2ix8kpybufslep78rh4tw0ep179duhq9vq9gec1vi5uljujadfrqhnmimmwlawex9ii2gc0z9frpsv4gb6r85tbsja1nm78n5epmrpck6gre1xxrxcl9iou4y90zmd4cjetvxokx5wzg6oc46x4rgzcpo80lq12nxu440uwhwsaumuwoi21u6udv9xmgsa2k1d3oiveukyagrj6qe8jik3s4rygc1vqm99xnreihw240sg1air54n34gbaxvdd4c494ge7ntgnzrth59n4oy6l8acdeuxfqsfoypysal3tgoe6y63fzir3f1msl79ad0uai9uk',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 3103542136,
                        expiredRefreshToken: 9699889813,
                        isRevoked: true,
                        isMaster: true,
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
                            resourceCodes
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
                        
                        id: '895b4570-a8b8-4b47-bd7e-9643d2017523',
                        grantType: 'AUTHORIZATION_CODE',
                        name: 'xsvp6czqiv1e0bkoopjgzi5wn68kdnxqie2rm0gb5fuzdq86nmp6c930ja5xahlx5z4bv5gzt13ti6nt40nmho9qct6vrjixait03fh91tzjngnwm15bl944tn5vyj7nc5w2hcaj4aktxaarrhafbgug0agmu7nngz3ji5td9h8f8zsmcpk6dphj38kdbpsjm9k6uetww6l8cln7a6jqb5n8e1siz335k30yrakma6gagrte1f21oppqi38443y',
                        secret: 'ajyafs7oguwb7tqoqki0zt5fi1q7xofapij20ci90711ssdlbtp38ehmvcgxjwh86ec9aew5drmx0h01kpyx2gh9wb',
                        authUrl: '2sqa3alm7sdo24nh90sy5cjloi5qgl0lwcb1xe6dp2cke8tnpxm1xuj63orb9pfni6nw7tv1g4jl17c01zg75z1o6c8fxgyia1qnwey7zuo769f0ve4hbvsk754zw3tsqqg9tu8vaprglxeitgz9gggzxfdfvtb13h0ve64sbgfnu5lz8ku218v4cu544qaggi9kg06ucde8lvigglvgxleiwittrsakw8xq7r5svgqpzjyoywgfy99a3nomncl8iu9bdnvsb8fdx6l5bnok9awjl8moizwl4q2g41qf7u5v6p2krc7hgs5qruzgm66qvwvmg8jv97uok64rgodovp2tbb407ptvsw024kpo16wka21pujfonzjkvy0wfyyejoh88efiz8y5bvwpwofqdi4i7cfdysxcnpehnpizah83reh38vqpdtcas2vb65c05mfcjkk5rwfgypuovegv3m81i4mjbyww40ulnt199o1p0bej3ibfm91zu4298logbh14ldfcsfig2qbtp319zktm2k4d4tt6t4t24pvi4gejoh9i0gretomv6mgthv8yzlqajpvt3dvoagrp7gxsjydy7oy2jesyskl19sm4vakvfp9fu2okdtcplrl43cmtr0jvn2gns2siqnmi6me6bjueqqzhv47sq0jy0xpk6kbv5bsmap3yhqwi2qmks9772uy2xe2lhjcw80hg3ewymluemg3zvqt4eqhzdrgpg1u6n91kad0c2menxm2561efzaq5ygzjeu8yplh0opwc89yrqacung5nwx4wo4pyg1f4xsleb5l7600gmnbm2qfut13ymvu5akh15ktotwpiwdnj3dt6m5c76mh79ewhng1unvj3f1bqj2duafm40mvfdqvqzdl1x9yy0yg53yh8gnk0ghie6iu6329s9j1xwg30fksf78fpnrf61je0xkwu41p54hpgkdb0kj0vunclzrnrw3v9cnmx2ojgtvga46uksd4uen7tn7gxkltia3qguczvzhg7iwl8erp0lyakxe32xzp280q7v2owy9dbdmtizp074x0xoslgd9810xvi9gooh2eoox22zpmf2xj2g56bu9wgfydgnely0eox3vdxyljugutwvoxlmn9uz6m3836dnwvgwoik10ta5lwk5vqhzf8abmzrd2y7nk6oykb374ng248bxf7p95f4xzd1vq6kgducywcg5lqozll15errs3l7x4tcjkp4210uv04ww9ml2pnxe9w0ioe29honuo8xmzpy6lc7fbzc6lnak3xhg7nmu1ib5s3aszqkxhajoufi40yv1tbul4ae1jmtihhnv2ud884ylmrjeco28aodbm9mrrjtitjx479lkxaxwmri9ujj2lbku89t4u514vorr3m2erxfbfejz8mmbpwe72c3vnpr4ccglqlchkkn099vqndh12g96ddzc20n8t5q6jlsxlgnb2jnpc8sjrby4143en8hezhjn9zbpmlz563ielmgf0jjm5vw6apr2xkfpawiolv6czj6y8z8z7unvw1rbltqfoar9w0u15q7hd9dl5p2uotnfrlqjf2n2ubo2buta5ghv4qu8iz35wpgbn9diubf8ap0bgoqdceeif1e9eea6mrtiht0ii58584shd0r6z425lwgf5uqygfl93q5sx0kqxbryxi4qthlpzl960rnlk5yd87ze6luzmynuhxvmgg1j14k1xk4jbx51bttwedh3zjwnu6v40l9n78ozj0xm2jusn89eas0t7mc46fm5j4qgsgydl7d8yeunmmv06aw4dlqhhmm61xwwlpna8pi4idwzcuxuqkgz35a7lj42gta5i0djxksg0h7qfcour1syw2fepbvmyaqffxfbm4tja47jtuiy6ao2a5r76up3ip6uq285xan2qovx1u7ost09cggoas8380cd326shk1nh6ybf2ysgyvut4hau6j23u8frepqrme075relj73rsopwcs7lacoyv7pu9r920e7s3s1yukqant',
                        redirect: 'pdacevz4f55lbchge4l9btmi47u3lda7o0x4fxj8kf6tzyhebsnlriujr7up2faq9bwrhihizcvy5mwzaxvv1t4zbqs5rdswxgpdvjmo2xzit0904ixap4vtv8clvmqmjecsx56w1f7tuorvtljx6ikppkvbk74lhb1vnclk69x4de7pol8e8fhyjgpdm64jzvqmejzzv1d95he0advgbum6wxjk1psegyit7u731e9tiw48g9531w84e750adez7hb5b1d55wvrz422rljxeiqewcc51rqeh64rkcrf6dzbzgxmd8h6tp0tv18amdoym5m604opg4al28c9kdswi3y0zti5idel8tyju4cujf05xdj89twgdyzwoi8kby8jthwy5dce0hetkskaxhpgeepexex7zpyajvorx1jwxmmu0n3s7x2kleffb13622h1st85ub5e7dww53rc928ajvp3lzqnr5egefstodjs1ymaxywme8mx070u2ppzjn1gnxjtn64u1ihgcenuhrgbzumb263zegubs1mf4pbmf4vudym84bi3pxuchz908hmkmk1xc5gkdq7uofmlx93phvpzslu5fyaufulvnqbfotuhes7mr3yil3cte4dmjajarhx0imqb87zxgkymnr59g5jyrhjtv04wc75uf6v7apcue2pydw6q317lr2fxnggjj57kcrbtlj6p1hmu1kullsfguoa8wolhnenmsp8efcx7hb0a7z7vj9j1k0eb6xynic2sujrdwuzncsanpp4cz7ixzr1bq7uewe3zdzuo2kyxbilbk5q63gau3wnv3absozfrsryk3cwrdm2ixn5rexi9mjtvz6t9r6ecla06hb90z26hg36obfc3c6ioklqfoju2zw399b4bhvssylyqxrvjdi7xb71ocvrvces959kdrybo1a2u5c1rw6g8rv2gyv4fyvnoum9pm90ojdbewgfl6bdxmkn1acd36ok36kng27xg1wnb7l4g9m69yqtwuc6ijwm973v080ppjirxyc28xd9y6mo916andy30z3tjd93vmzf5fw9a1dgtbi76ndqu0zu58m1dihkw9595cv54q7ityzqdzltlji4cgnqi2nckfakdzgkvdr6u4g2o1wad8hm5biix7qm9uxcqj8h5cakitupuvwnx3cmsot7s7np136oc24ac62ihscuv92zn7f1jkafflr91vzvpflykrafs6352jmsxxcwdpghwl2ogsvsk73eyw5xm7cyhf0ksnccazvg9x2egucdme2ggzzalcwp25azbch07clv5be4rrhz4vgf5ug95u89eqga0uoa0eefkr5ef31xgpyw03bxmkxqojz9mg1cyg884z6mbh1k1rcpijt5szrqqaa25ow8t6iodt2uu79x07tgwk7s0vgdtwul37tbmmyr50rntfvpmgj21bzkuqo4m3kanpbj090fkwwh90bva1bz20gvw9xr88g2ettivyf5u90alnxnj3nwo3vc9voq7tt26dia5wmtckxtxs2zthn42kjgw50i3597nipvyfqqi4nm0ttd53ux5gho07gf57jzw7ny4x4bycm89v8qq41epcni1dg4pwlhz43ir905i4im6sk9s0t7dubyeoxs3b7pk2zcc0q3lg9r2gafcxegcp2ue1f3t9r1lavt25a3fe71d4l19xlfr4zq8cmom3xcobt0eer5gpa0pzspb4yjlw5n0tp7box2gcsuqht82fs54vnhsmhckjffv5xw4vzeq55d69jdwagrl1g8ghk3n418k8obd2sol5nf9woma86k0cn080c81crh560f0r558qw7dmr4mmx4azypuq14w9j2ipxd6zcvaj8ddk081o2klfpap844qqtizdju017050lfi2d9ljdroa0xjhq59k65ysywfnxedm45bp1j4nkpxz1klw48dnml0x1z6xfk3u36g5q8e8320dldc2fi6s76etswmkjhj5s9xx5uci1b5ulzy0tjy38gdfo6l',
                        resourceCodes: { "foo" : "bar" },
                        expiredAccessToken: 3655349993,
                        expiredRefreshToken: 8300954112,
                        isRevoked: false,
                        isMaster: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('895b4570-a8b8-4b47-bd7e-9643d2017523');
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
                            resourceCodes
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
                    id: '1c51e079-7c53-45f8-8009-2cb7334a69da'
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
                            resourceCodes
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
                    id: '895b4570-a8b8-4b47-bd7e-9643d2017523'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('895b4570-a8b8-4b47-bd7e-9643d2017523');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});