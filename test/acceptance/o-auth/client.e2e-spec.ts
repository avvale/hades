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
                name: 'nkvulgy49cv9on4k0hejvim8dc229h83645tw6ccprt878wtn3vmky4e4mc949f5nskhwzs4h1u6jpyontzkzm7kzzmgpgg2xdmf62dhbha6l548aropqzuwfu7ab8s1ezl62bj3huh96bms239p42w7dl1fppbiam47v2fx5mh9m148wjfz35ue6vb3myfxnhq96vkix8oj5jegue89wh4x3b3yudzf1mvhqj1e11q53p9o78vl75119efe99f',
                secret: '80xr2zqcd1z2nr09mo8qq70vwhtq4k546nwvjnvzwbdrdg9060gadq0e7y9ff7j1bsi9cd7i0my1bxjoea6s6w3umu',
                authUrl: 'ghlp3jn3c9x30yefwjerk2saqzro1rmfbvan0wmuqpzy1tmkjdw1nfregnd09glh45mk35f4kxrk5ax47xl6i6vvwm003qbszwun1zrkd42ro98es4xp6ssoicb5ytijz4nhx1bv90aih1mp9bdeywc936h0xeuhv211xhdxfz7a0ty6yseexxptvy1x76o9wepz035o5u3u4mqj8jemhv3w7s7udwg37p85shfugjaodv98twh47eags9dpay5m0ono9jg9bstrkzf8b78hv6j8sf3w9wrycmkkahgmp773i0s34ti7jrhwfvm17s2okfl9pg7uo8kkcr1hx6ncjpkwz0pj6dzko5rkyquy61h72yv714edokeesizni80t0tix22gaq445vz7fkvjqsgbanrpp6bd1jfe9mpi5mtn9177opjp1v8w9hvsm0b5u6jjhb9sf9mz091ol9j7tnusacgt4gj6oe358u4s38mgxuunm9l5oc13a80xq94a4msrasgpur9hirv0i5c0y8n8hh5gzec351u2umd8ztqqrgds8low7whdq460l2ao2z1rfz2s6co3t563iylosvbc6afs8yhkpyxl9stlqsm88pytnr0qyh5hamv7w95z8of63xljczp4g01wffysgcxzmb9xe2eg7i8hr6qlalobil4bsf6gptls8idjaxz7nmzfseq0ffa0l9j8cqdhz1gxbadn8b8qvneo4eqlvlazgjn43k7jdn6oqo1omzp56gla8utxwhxcw3gx39t5waawp4nmppq0ddps53zvt98yad0kp59jh4xnedbrrjdbkz8u2n8z3750h1fotve8772gg1bey3xhyepvdvvstinyh3v24c0bq8s7lxgbi2xp6soyklk3jcwlxeb9cxjscqdq2n81dquczshi07hwwzxrdbkl1c6wxcluhv8yf2tfru3rcvaohq6f1p0jwe0kx9tir0ca743za8xtjgm7jxei3npabaz4zu2vd2cfafpthe6nkths0m00hinbd21yy6w67g5q84cgkxpn1fwfxzrj1v63x9e01ojhd75xmiv9oy8endby52h3cn9efprkvw9j66nmpcxmlg4vhbq463rpmvznt8z23b9ivzheo8g6b9z597h1r0t6d6mbda2cbsrc0orzan9pleq097z4wr2pe3rfneazbkubv162thebj3zebw91n5bwnf3e2fht64vxdl529qko8ob1zy89ebliosxntyekoz5opwadx3hspg0nmjbb3c0junhw3bj7k8y47gy3s4i9vw3qs1dk37zc71gt1hl2xh1fc759d5cu4m5es77p3atibf39vr7pxzyosg9yh6uqi533y4796galdjfz5yuwzzrq9bcojdmv6fc9app70pq9w3yasx3pgqsn2m2bj3pxm14f6269umij9amxbdt1qrdictxxj84f8uity6io87a60pk6hri9qbici1qxd762y9h8xxfdg8y2es4suucr4zptx7ntisli1hwck2n1vr8irhfaho5x7zt7ruwg7nws3me0bk3149mcxsybra26jlsq001zsy2t7u5xdyf4grfdqp8he1f76uzpgcmpdrugys3khfd3rcegn08dk5iysokuns8yw53uc9e7u1gvmaa2mys0prupwse9w746xzvlqc1qwlj6ma8c7q5fwxo04tbhqr4c8e9cxvt40c5k60l4squsqolcbu2nerzsekiz7193kr7flh8swsfcs27oqiavkbydmnq0cwhfmng3291mkypyxzp2uu7h75n5z3zkkhs2s0gukfiopnlq0hei37dkrys578u340poao0fdix10zwi6oxqziwhbe2prz15vq0jgnteig2limlfa13nhmmwqve4cm2fta7jjx0hucib931d2hmc140591jg7440osinyiu4tafy76sx9hrllgbvim9vikwe1aj5zk941ohpg4ius8ybzqvq01jd5qvmhic8i22s6o6ath5g6ih0bhp0xcsrro0av',
                redirect: 'mv00uftj378eeif8jrf9mjcwsq6mjpn61kgthg29eq5efudyo3aunzt9j1vci3fwkby7h7nsem8e84kmet029uu636rhujlp5qzoyxcwgrml2tnteccendz7n60evfu2r6d1fb1lues1nd59isjt16lroi9fvpbsgtvbaxdi0uuykehmikny0ne1nzicjiz1ptvgqwjkq2yu8709umo5r156w5annomckkyxwsvzlymh4x75h3b9pv2imfq8szmincl1gl52mt4854urcnhw4zsl8k970661yjae5t2d925zr5yew3doxxikuyvct6epofwr1w6tm3doghig7ar1k92m0rvjfb0v9u4jfwmm1b1tmkktc51k4ntkirznve5srplbpq4uv28ravc82a3ps04hisoo3iu39xify7nmwmpz63um0yxwktpvlqy53ht8yd8bzc438lz26bev6sbihh3gi5yp0xesciw6owmsjs64lk3dp1fezk22kgjnuu716zoxsggammauxae2vjm11jr40kyrp7grkfk9xovuf86mwiacrb3hz8nutvoc3hv5qwdbzynulj3pixhq8acw16n8z7lsywr04bizfgm71s14hj1zxy6xwf5z9fz7ab66nnv13gfcake0d7kg14n9mo4om4xyoi5hltvrqn6g4dn0b9am8b2yuho8a97zrpq6ke4ga5exexktxnprjpxt5kifhbq992pt59lz0m34i0zzlefoyu1l0vqznsrmdeugo6hiskoogpjb4mjmamp3molfy0ngwgabjibpbyp0k9q0li2h9ztlmdvyqokmssjjxxs698jbs369i004nt24sy1e8hoe4sd2ms4revx51sebr4bxo8uortik3gl5uyya2e6xhtxs7a7p12968b4ffkmy4jnov85twj8q7bl02uhhofq2mvmkw233d09x0fp0g3tu5xhiksp8e0lak0563fwmfp6l72ubjcoorcg9giwq3eoiv7kgfki1f7bxltvj5i5tn5fk35ga3wq0bmeo3h3feqnp0yvoucqt3ijfttoh12i233w8udnl104y9e96g7t2pst0ol7g0d03ypreeo1k355zhiuurmfnj3r3dzr50cc76f7v8jnbv5n0iw58pk8blwsyxjlbcn5g6g1hum5clrmmqzc7iqbrvnlyrl83e2ilress26g36ozeczfx8awg42snf1za11lvqijrfopyyb5o2ptz0sd5cvorlkyfzqhaeqnnmu1fb0fz9r2bsvqkoo233vl4viopwc7ezhowtv6gwytv5kfdrqh7gjdz0nydw2koi64vv7wu3q958f7yti8ht7827njyzzges2jf57l09lnuoedmgzc6mldb2a574dssrsqejlmoxb45t4jr0ewgvuexn6owqigwh7rprilqedrbe5dukq31g2wr97v4xlhtlkxlmd3ihcavmhjfuk15pb0omh8pb56pxx4vkt14dcs4fdoch8g7x9w3mu186gpl8qbvtrq987npzbvjq6k2tz21deselji4ctp1akq3mbwdaz1qcuqyk563mi15evy0dik8mqy5wqv03p4zdsa762xtf4jvr8xd9vitanc69bdl2vo1pz7tg618n84g7bsehf82vjz2uy1hsfesk5v7fefy9e9kiwqtolms537ms1qg5jew1dfw2tab1pze9o3isjraujt1z4lja0jqpl288hswc794zc0ht78w21j3kpwuz6pm0omq3wlb21pt6g4ctuobcg3sythp5y70my8un4dd62roh9fxrvqhsshnxg71gkzag41aja0g2k7qhkzj4zz07iic6wz8gcaou3pzu3o3gr0tl778s0p1gbfzzgctqz31l91xs4k898redxvv7nf1vvs3zxy2kv8gpk7nt580f8d27me8sddn66mca1r8fs9qkkp7u9w3brm0pf9h6qn1a7kkjye50axc1s6sh833b1hijfbxw0u0j02d8np3g2cy7mwm64100ie15h6o2ib4zlouftxa',
                expiredAccessToken: 5732945513,
                expiredRefreshToken: 1288718467,
                isActive: true,
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
                name: 'nd4xk83jc19aiv7e25wozafn842lyn6ea4vbyfeypl4el3z7t2vwxlxk6athxc0xayr1g3p6bg06x4djwxkmur0h4b3r6vfiuu1du9wrmv9tu9qpi27leisl9obispmuu9bnmj5hislirtqpwh9is9cd2fpq4xh1vor2jdvvo499gitwv04vcdrwsz17eekixipn0zbxhz346rj6rxh7gupndmzjoz9qyqt3sd246c4308kjyv09rcyi9vko3gf',
                secret: 'jf2jxo98dbom18zp7ezujrll06fw48m6mxs2c825ez498ze2vnd68aecba5n4hh2iatgu3hsmfus13i2jgqmzlngmg',
                authUrl: 'z9bgij4eoibbjoojw26vrd9hkkq1otbtkiq6zbqqh4nsupbxwjnkyw4q5cqvhantxn2u7ert7u2gxhipa6g2n0sxmf1sqjztp3h3yy4sp9c8yq5cvrwfms9pvozannv2xi39wqjg83pwe16s3938cs0rjlfffzgrgrjlcobbl6lk5rmoohptd4xx208yifibke92d32rx2ebnkuq03jpb88bicluc6jdkw3sbvqtgy19eyiguldy7ro4el9772egc9n4jtefskv6rh1xh8cr4pr8br8c88ozplnmk7s7sbzg7thasxv3kb6u63p1in3amljtvwhav9bgx4mpssek7dbl75k5v2qgkb8sp9amybzkj8t02ok9tp8s38z9wy4lkapgi70haetfogfjo4h4mi7s1tv49926qlc62vs882humxbcox8g8yv0rfh366kfn4pd5pd4z0so128ls7dfn5hkz59ps1pqo8ev189o92jjes9rvzb75xm45y1wsa66x83rw39afp203jfa1zgqap1qs80qbqzryuy1wpt4drhpbzplkzqhc9js7c1g68zs07boeqipx3gg3gtzx6gtg0m13d57x6rm0ibc1kuo0kaqsyzxgq89jhh0tq4t0c89z0jcwjltsy0h7op5al868ig8nu56iac03jdjz7fmiea4quwu33hssr28y31ja39zrmr28cft4xaabeom8dtw0j3zq5qvfkmtbttixrsmh92be938ug7y2gnfn9l3e7dqee4ui525uqopf1dzmv1yxraj2m4dxx6xuud56muemohv7clpbid2iq5yb1zkldgivxqank2k3dwnpduh8cgjr97jyo4pij05ynpo6e4b1qxdmzkxez6diwmxqchutauwg3k6o3n10lj2o4qb5b0d0nq0woamhgt2xpb4rxd9h90yck7cwl40wr5sxj7o8fawmnauzpm2sneodb20i3802xbli5ky7im9y0cp8quootaohznrn1wrlcoo86w4v3gm33yd6rlj7lg2dg1xswibfcxjo96l4dxyzmlyd25bp7xiu85v8g1j85poq75mkvimo6a4mvdlh66rzap94lb4507q91pcs4c5c1gvwy9rhzochdidobl9flc9pbab2eso49ssm9zwwsceei72puoocu43mdx8crwuw41z6nxz3un5eijemav9x73ev57ypy43t7840u2g5owv4cu8j79xne28jhl5lvc6artz7x12jpv3zlesw0l6sdcl7lgz5yyejksxa7g8tiajpjg3xonvpvhr3nrjdsl01oukk8hgt0oueoo556ouanlio6oim7pziv3vtg4ze6oyj16i0p0hoh5zi6rh9m6atmi8iyecvhous4uy1mxjw2fah8dzys2nllguwkud76qdf1mwymra1t25ntsuviq7n2r7u2pwwu8gvf3r4dvwvv66h7zgg39zot70wj8v24c7k06zo5wlvl7ely8mdox8crfkevktovuqxnxjcisbgz6iqtcucxbypziblitpmbdn5zfxdvi0i1ru6ue9qjwpibm2afvc3u28e09fqdqfj3v75sabeu8tuh8c1h9hoqrn7s64bm91jzs1sf342k6jyq2ruhg5xo5tygb6taxn6pviro1g293tcd3dhs1ygyusoiofeg4yurbll8mycyfucox453q07qbk6zcsouuexh4g3cm8dtvtrnvn4fzzn3dzic3any8t7uuealt07uogi7v5mqwoggujba9ryp10awque71701g0rrg6e4y955z5x11em8frzyo0jmulo2k54j1ssss5c4qa444a8eykgiq72h0tje8d7sju8ze3p5ut2m37fcvef7nrgael7xc0aljt1inoxxft4fq0nq1ks9n9n2n5zup7sxu5dwnbn8nn6q9z52ywg7cvj0oqwofwe4sdkcbxuq6br8ahsd0gl8r8s2afoq62u5gabrppxcb4kqw4quvm0xltqxryzhgueuvonh9hetq4no38swr0elqbd2ik0uj5',
                redirect: 'xxb3plnix2ztgyv4cpncb3x58tseq28gx9onxobuahevsgdisoc0ztvc2rbgp18mb08sla7067i830upkgi9fv527e0wdwk4qtyxyfulohtidio5skgefsha57o0l0b3s1u16s62qrasumhya790btzuljot2u1pdgznmhsa5vmasqe8bp84nkry3tr8rwry02hwt4r07b0sv6qyvrtws03r7xu023e838d2xj370nwh9r6ivyvyfiaijypxde7ss4gwp6sjzbgmal8e79yomyr42356tcosat6v9tx6ajvvzdd88bar55kah3tyk5m0etdqe1cqjq65hflsgv6rkp5oh5svbvfu51iszd4lvjcmx39gepw8x5zj5mw38jrgo0uohnkfvr61pap20rb5sa977v2s7qcgk39a14erpbokqktcqffy30jq4gx0v1j1xohjwmi7ltjyb5sp3ggvgsib3v27nxdv57x8j83cb0ktn92ho1gfdn20lfh9sa6ve9sed7xmtvki8meb5n9nh28ffwf5y0g7g00tbu6qjfvs8huewlx8fv2qnspkj95f97i9j8u4yqu6ptmfhlhuo4pznful9ewkylzij3vbyod75cl5wgdh5vryei9reozpza1bfnbnyomslrjbr0tkia8q9yqtj3hqwai4z34izkwl8nat7pv7rglnxyjlyioyz8sxbowprjavivfrfl615dx75wu61g0ucyvbth6jxedrgcpsy1pq47ijmswnex4p1da1yjaazp3yshcp53en672aerh5w0p23b6h4b23op823ox1mli5waup01q2kb5ie226iomtwr4qefah7y2xnltnffspo0dj44kxd5o1csupb4sj568qgqjb7bhg9md930khrao8d3sxau5v7djvhaph3p262kuerij3nxgrvg2x0re030vtx5c6bd3nidbll76f9okv8sbvld9gffoo2sy34yqo2fwnfvnb8p3vl320z0lnklakfxz5puhmbdq2tv0lkehnqfuv4f1b12jr5dxtlbt8437g3811c9xp3bzpdwrbmb9i05ay0mc4dmtzu9tn0ygdjp80fwwv87vv7qyo4nqyjbmgv7eoo4ptj0teajt5dvztojt1xlpy9f3ggqthgiic2swztj14eud5lh1b1q5ghi44o9sebx8dwgoya3v9ap3r5g13j99gcnsa1wmszytonx3ank3lq5i07vi7d28neasalxho2dd9t5vu2desn73nrzihfwum7q6nokdf269fla10o9bn2jk3jln12691c0r4qwsl8fxy4mi1clj34u2ll3tr25lv6e1ju1080bnl6x8k4p2fr3zfey5nvjcxwc7lssxlkd1h4jhajg3s96mticnml2qdszopael7uu87atg5a9dbpzrf636ftujdvxm8ay1cp34wvr2ctohuporsc0qr9oh4a1ksnmf58n5zmiaxiwgfi2rb1gnq94kvd4scpuk1e01rjsz0zoqvshxjy4jp6rvogg67ashr1wd9l3l355d49h3310ythfafi4vye076cs6p7xfxhipiij3zel6zr34cf60nmfgek4d42z5ivji1n901jn91gkm4nqgw53xjiau6y7vfrskcm6wu2c79uofxxo95zs827het31ephh2vfga67wdjdnj6y88bnwv4tdn8u86vgaafuetil6kvqi3tzpywegm6d6c166x66kkhk9f4bir0d0ax0z45titfqkb4jz2x51ag3qcwp89moiqyxziu4qora1r52cndtvwqevs73v5ujf59rc8d4evqpky94vyyqhyxr3luubfc0wgqfe2jh0ouj7p0jd7ynn8s2qqojzbskzdtlhny774o2341t0by95zi6l942buldr4sqxg152yvziahmx17ccm4lkq7ctmtbfn0wzw75ccglavbzka1b1r6zyvkra4ulknunyn2gix8i5pplqglir2nfqsujfy2gcqf14pvgcoubpms56e3ahaf69kd3s8yri5uf6xo',
                expiredAccessToken: 8577772892,
                expiredRefreshToken: 9152073973,
                isActive: false,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: null,
                name: 'uohoq28jvr1w2mlssnk9r0kxfqr6brivuzj3iuzodb6wzrjtyz5z23wmegc6ygas8yqhr7bsfo5g5j0w0nyersrsbtusjd0bib835pl9zh54s37j4at30kxq2zhwpmfkhvv2s1hhtuf8841wadc7twwxok3bozvwg75ghuzbuittmcr261qai08e5o92nhwyqoh0y92zmkqgbju90ml00wrqgxenf6swjncefox5lzyg8ug9kamn0gh3qzly8di',
                secret: 'm85yrh1paroi327oedbur70s2iwp46yaj7z0x4rljmy0nup63nm6anfqc05x6wvvhk9j6yw4ioj50im7rxi6374bay',
                authUrl: 'nd8vlgrgvvdz9ydlgt0lgbapur6ofyof4jb3pd0a4uplbi3yjakycieccpj99knon30s4y9phngnld1qpmrf3ybbk279odoi7hjj0t6ptxyf5t3v33io2ul9hcd5xy65zfjedbrmquapv12n0b4whhhm7tnsw2nw668knx8jmnvqfulgtm8e1agpo5d7ns5ia846ue6i2a6hysc88ekrec2ru300ctjjbpbght2882gjti71p6vu1s8nbxodqz7vny895khwh8f7dbwsplsj5zwg1f57jb721ilpvju0a40wrhmc6zk588uvxasy1lu8ahzem7w5qz15auuvm2b0kr8t2ey6482ewujk5n52mi9la7cutltz90lu745z67sivgkhfv9fgru9514sk1k34h8sxrs7z49ye21pmu0z8jtxh8y1qpcrkzmu834ai4cvara7t7x5ho2rb7j67hydj6as1cjzqwxv8y9bqg0h58y749na4fvz7v60iuvlighimmdz1mv7vcc9nsfpyhjkhlv4comxuypwqv1zbe4bw7o6az9bh38nifepzybdjsq5goycisgz7k2ugfoy5xowkg8qtk0z53ggin0ulqnvz01eh9y69ygklgrqjz2dn0kq4wahq6zjxk1jumn85ipx8kovyp6o65wi79e7h8vxmsmfbb6ftgz3br3t2owzszywf7ayumcg430ei9aej5oinl4uaxxz3vjv6shzuaocdl66yz7yi1u6bq3idkk83jvgai8vp29283zcbqmxbujlfyuao0ukxhltqagtzu8bfbvl9xxjvkqkyp8895mai0modd077tcmwigqowmzeh0miyymklrgtrmsjntag2o30xj84km1wqv0jd0uc1erilguu29t1iez4rf1wdaugnf2na2wt68ltg027cyui3kgxy3lbn72th69mtchgxoysh69bnrwnyp9fzwadvr9qequi5sb290rm2u0xph2xakpu4n2kncg4a9wldfj5r21uqfkvmwn3soqn6kfjgstt87s820dn2v7uz8w4qm4fdrg3ekejwhvwt03eaw5uv7to0mrhymwdse7zn5fpv5ksn78vx9kz3xel5zhlqi0b9psxv50y0k9i43uf5zcb2j32rcwgbqr43eyez74ur0s7oei49bdx99ofdx77k651mb8w3vd6gzdiflc7auak7pr4dibsscc169h5qn4e1ssl7taalb80wou8ohwcby6bjlej6y8jf16n6bci256chmewdg7yz865g5rj08lr3wsrjlyc8oadxnrhxa44zdxtyxcz69hgbe0aiiy1pqsusf7ljimj3y1lf2y9gs52vanjvkvggrjng37sqo2ur07v512811cs9lot5hvyy409wcr5q1l2t95vui3ypcniq2mgvicx34bi446ql3occblo6muh4y25ofh22srxhx6j5xfr49goks5uqd6q3quuacc0pyy8lgzzd1ho0pqjeddvliit5cak65k71zetwlf9fcyvjb2pp13earthfze897a4mozib430ogco67sdbdx97azlrw5cg8wv54fjcjr0hd7cv7cea6r85keb4vejbm1or4xq41xs6ias8karzgxs4ss4dxoqm45ze4h6tlgtyfy54g8ox6b9b0ar7j8s12eq9k38vjv1a9vzqo97ixu4h5kuovq6ghfoo8rmjupwd1ek3hzivwe72fvi11yq5qikgjdibdr37asjjqi4cs0qmxaa7horg80iecf637bj9r4q0u8ib6pacxpag4zwjcwt97xftil8tn1o4xgg9kqgffw24i8gd9u4ezf2nen8o6ulfuap22hasjt0te1r4dmg7vr9pf21hon2u96u7gwhpiqeqywvc7ru8qciuhj1maztudteg95aod60y5t9kt4yebx0ebo1c5mtgcbztqnvl6dqlipr0ru09a4dsw3wvgku3yirczq0fx66z4i3m9r01azxpo8m20iptm3jobnlhemvmbyk8bj5a9j8cpvmple14ws',
                redirect: '0xaobmt2lmaezok1xyou25hxab7qkgtcndrxovva561sezvvlgz0fjvvvt2s3r0oxn2clh21pdqeaztrbedz7z9hur7txtp4v45960ue9pvaw8bxxnkn2goc44wnum5j43mquun5gecqo01rm903v6o2jmraq6lzb5aj72kjyzxbajctmp5xlb0ih2a4pa91y1let4mfeo76gahw1zezi0n3hoh9spafbsmafzmij99am2pkokxdx8fqqdvm1hgnjr2m0i6ubhmfigjno2w4g8546wmhjai3ty7i4wo30vdusm9a5dcz8cbg1nx6pi24vfaggwsbed6dunrgvldzhqd7vv7u69vaz05qsiem7iuldguloipy18x3kl4wsui41dsfnmlny0jeve9bgh8v6tof5lxv88h5tw7j5tlujop3i6y8h7qic7idndmg1txcc6lj1s7rjl7g4ziwmbyuxxoqfxb97zfb02scvubroe24tw62ko3y5jydc8ccei0vk10cn6gqfdkq4n6upyyi3qzj9hexprbpq26kl2l3l6jivytnjf7egbjhlwpmwraiyoxhsatx07t9wd10fxehu7csbq7wceaue2imbc2klw6h0p8lnl01uptr1o15hejz739c3ahmcb2hzhyxylk66nqphl2sxtqejgrbkp86jgrfg7b8razgcs3iffjeinb3odnuxh6hiqku46loiorsa8zw4zmivr1fn33k89zmaas1j7s2d96j09fhi3x1qpgni7bfsstudpluutfpip1o5ew6e0ehmwsrdghofqzoo6vatw8w8d77u0tvtn4bbao024pzwqlsfhxo3rzz3q64rhgjju4dqz47n4tjc6rvvwi63pw1ghcecoix7htciz1afklbz0fl8b1awtmzzg1ikrm5mwltofk0vz7a3kerevre76i0m18bzhcb6chqxi34q1h9vhp7895luzd8joywckfzuhv1oagnrlzizbg56ivkcyk8eh5oxt2k6chpnx4dho642jqv4kge0966rz6jbh5pgrd5o43siqlj8pilxr2pxbv14pbzbbbxsymts91j8zbcrar01ltcsgodvan8gxxasjjh0l9nwa4m3tvkcmail5mh7c00d5aij8losar7keam13purawtn0e3nlrhior3zxnwn8rlfwgg5zdad866vp2rybxeua4id5x3se7cvdmpv84s0zn7cdre1s6m95zvd77w2rer3o937m8ts6pfw8cbxdq7vn10c6co5thyoyrda6emabe8xm1ntzzrwuigyscumhzzydufgmrb0wnlvgv2aars247tf38vayilcof5i5ohdbo5x0mus3csegm4axde5pa45sysnrsuo9gbwnc2re6q4it296egaow832ft55obj0lbbtdrr5s4mjb19lp0qhb6wztq0dwldac8ocaqw3kwk2otujrpt191itmqrkl2dzg11hz9jolqhy8i0v0l5yi7szd2ohpck1c97emunsierrdfjr2dqyrzr0gnm56cpihlvt899zfq2qe54a58z766rpsvrl9th4imqz80e7umpdkwtoqjst3dd4jjhvcolikveat04wbnfvjuzkh2wrjx8m92jmfy80jv6t52w4bwikj8fyqemzxxqy7992iowcrfnmaff3q9q2xl393tkvo6kusps3cevvkkm3u3zprat30izd30ar26xer2xv30a6lqi00cqfzognjf4snx2yiby0bxiztmkal01gik7z3jkvg0zaul4r3qfunxeeswc8gs2wty6g8gc95zon3vwz0skmku775bpqwtq3s81f60v5u24t3tdfzvnwg7ob7co0k04p70662q8rmk0zqsusxk1n2e92u0e14yzl6y0c24fpvkv9jr5sy2v17ohojj2ahl2grhjdvdsjzpa2wyoiqntzohzbyrjq72savn4f3pdasfnae0ae4b42lxtkg399hpkowegrrt0te1k7ljpjivy2em3fextzpv18gfvt8hqgvj9qdc1t8t',
                expiredAccessToken: 1795851273,
                expiredRefreshToken: 7029784344,
                isActive: true,
                isMaster: true,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                
                name: 't3sigwtfj3bb7lx8y1owhkpm3f2xdvn9iyv1b1qp93htz2nwr1cm38ud7w3d81oyrhf6tbpqjhlyzdp29tj7hbufo33v41gr1h27tq3yf3wy0qrmyi2x6oohwiydwtjlqob2tr0rpoqzdcfhuc2oy7htivh156mdmw2sr61fn1j73bl2x8vpklrordua9aohx1a7dlzdsjx9crctmx5kcmkzxzgfsqp2tjl7spsewof9l7cp508oryyff90mttr',
                secret: 'scnu7jgaanh81wdye6paqbd9fv85pgp9bkyse22eyugcq6qws95snjl8guw774zpf8wsw4yzejcy6frbgld7iwp807',
                authUrl: 'fl81514v01q8rrd3vnz27y76ss92jtj7agk6e9jxruiu8r238fyt018beipix8yq99cppu6z6oe7im6ulani8pkfo5vesmowmpns0cvtfsl1566hvtxuzfsp9f7o0peqn69z2yao5f2mqc640kefo5anxkmclu6b5pl24wyi74l4l3g0rn18zowzjfshlbucmekz8y4zbw14mm58i2hrosaiom29wr0pvxfo7vhwuy5v3wy5uy2p8qnbpkmc8as8a3607w37zmv6vves9k4p8qy0qyl64vee3riaaxyl05o6ampc4oult3c9ev2pcvc966i7spc1wvio0r036p2e0h3d1o4ltkawdhd6sxzyqnxkjuqlyud0fr9uug2g9umz0gsn8ytemd4879y057vw36vguhm4sfefsrz9gfohc00nzjwv3dtsa5yjkfisdsdqiszifx4d6bdo74c7731x5hmlsr1n0vcx0uchlgjj587wf4tfit6zxxy31kkequo1tlobkxj0v287gra30g4gvj43z8ww1ft2dkh9zt24svhc6p32gv23sq27dn3lbbmvjn31864iouv37fzfnyyxbde52gvlcfkttal5gyyhrde8ii53wttv04gazg7zzx3reqibm0rkjs6xq27ie2ay70v5wbe9mhns5in2axvr4s4v37fjr27seyrdtul1x16whnst3gjhjf7wnou9ykhpjmv1954skhvjjia5muk45ky2w9swfeta96m3qdqmoxoq4i8skiqvuojyj8ukeqe4yrww6sq9f7cj9u49264ssbathl90qmienxinzbd1x213fch4k0l2ay5yqdp0jx9u6wd5n0w72ez2fj3r8tyfro9q1muipy3t9zk3gtljddk1t6uvsm2s9l7gs96ynavr6h8v96in2961usr58uzbn7nztxxvgrg21hbvbhhpe8euvnvewp49yer5cplvbjx3s7dox4ezdlg143s7x3gqgbwewpub90ib0s9wkxfbtidgys5njgs1b5qeqfey34cqbjk8953k8zaxxwu1mg48qssc6gkqsvxgem8ae22e2toacvffxng6bvxc7o2a79vgjkp1lhsf8d8x3j6cxrwzqmaa7wl2h8rvxk8ks5bsjkpe8nuyzm48d8fh8w9ecez5ns4lf3x7kck6dsq7sh61v2avurbw3japa30qjix962ke519qjymuzg37d8u2u9f84ykbyty0c3fy4oh51uut6p5c4kblhusz54pll4afg8io1vftso7yu7429vbl7uszbdkqi6hk8ms9ujp7s8ef5k8lvtadu4nnn8qahxbrgi8r4k8it8udjwc50bfzzgbl19jzm1xagw5m3gfbfj6c5rzlxdj79qgx0zo6wo6x65ugsqqiufc9gxtmkhjnc5spxgxr3y0cgzv2ppur6xjuoel3zm3rcjl9mwxhs18bt3zfwb9981yje4btgesxeqfwrdv0pvcr2am3rsa03izovfgaxz0aop31af663rifukyxvqr6dbyjamkl0lyryibxnulpq91rxovcj0vw1jfa1eq1hbn1j5m5v7e1du9tewf7c5vclgpkcjzar8tg9blz6e3uvpsx5v3b6x055q6haj3zc6gn4ut9hhmfftlseifm1bc4yd0hswt480z7rswptevqn4asi5x4mahfx0i8dke9dw9xivh9jdhv4t9o9a3vyvilygkuxht5t62t6zu39ieayln5qwp0cb9yz26xjluhv3f0jpbz1jb8du7kdfd5faf2jn4xsusathjutuu1covpcohu0489ehtxw4w7az1brcrtbt6872ey0whvge1ghvxmnumekkj5kpgfhovt79tfzxv2wmvhsg6eq862zmb6wnd88i58iq0v1wo73x7kyug3gnya0vcu5wxz1wicgap3m60vnl00bama21nhz1a4wb51ha234up2kr6vqrh3hei8n3vzgac8ybdnhgwi2fhpnfzq8s0rtmj8urph2ekb5symvkdfnvrog51x0y3t',
                redirect: 'l262aofgwey6sbtsn6nh42tm67291qmymp7c5ysn5li94lmcpyfrfongujqnqe749d1fxx4v3ah8r3nzhjsaqdv7f98xmkosi73sva23ke6q2z3yzibdluwgh4o3249pbbpw4shtjw9ozg2gxpzm5yftr8h89tddw5kbygx93tqxfl8amrjw14d4b6aq3pajvlubjh2e684u5alky1r26w9jdaf8wjp8v3synzz6tnh92n0vx51d8a1jt7260f7s2rq01x0tqh5mo57io7ownpo8k3qtr8aa2kwqjzwgyrr4dfbj0a6iq2zte38yvtshh8k6acnf4gu23b9mur21dq2s2yhu5wea2ui91440ml0csheq4794k6gljog54cahiw5twbv40facx53rozcb1x7rgdhj2tt44ihz7ep6h235mtzfap8pfup2yr0uvnbz1gxl5yawb0aq8r6i8gui5vbf4d4kytawu4cy0atuuq8t11c6n13bu8hb4gzvj87nq97a5l8yo1p26fmypn6wb8ioxdwslpuy9acjs6itahucej4wg9nz9n38yh24v60t35g1hhml2l144t7jsy5j8sl3q6ks0rw0dzj41fxxnpklaqez1bpsgsh56tqt97fxb01s4eb5ac7qk475q277cnyxyit3yrb2wq5ryb43q3s2ijf5e8acdaxfcdsyadtja2z35pqjy5adkw1zz2l3nlaor10a3ynkbu3q07dj2hyhu65gx3695xjaowed8xqfmvkhgr1yds06tz96lnyzfd5x1hgejex813jl06qecq4fccyer36hfqrgt28rc23vzuyagdlj4im0on82lvypv306timhhgn3wf1vl0hrthf05ctrols0brh8on5xo3tuux43u3eu4i9dt1k8ryenq2cteq4hunodujubsnw3z08qs328ztd9z8o9devjcf446nggvyy535zx39sat6ev9sei5bjvc3yoszkal6i44zm1va3tqkvdmkum1vlzzisdirls66fyzao3t4yt6sli9jzoel6qaf5prc4o3urzouwpf0ixk0eea8h9j4axxoopmtqbg2aql8f8kkvsy6x7fcgrw12614au1c0xwgpfjpkhwy3qpi2og45t7l5r3cv63k0gez5kzka9q0khwe90rwsf2el9bl98wdo1hiis74yl5mnj100zyfrqjh4seqjw3mv7zj5v2elb9l1ojzbzmqt4y7x755a7n5oph8pycg1t4b9wyp9mza0gfcivc76lcn5dvaetrock4y34wiylewknwde8rc437qdpomkz9awh9bmvcratupn2aijda9hmnrl9zc682v7kdiea3j0v88ekesiet9fhd7l7ih265l5dlj4gpkoc2jddjv6z66v3h09jh4jbjn3itq2jo8ik2ak1ykke644gf80fj3e7jxmawg0x8vkbp34k6fs9jpqwtn16o0ikq99huk4asrqv2uqm5yno2ejaoa2k394j9km5hb68p9tsln8d26r4xic8r1wrz9z10iqr8w0b28kxkxwt9qur50gu5e98dxey440qu0gjq0wd4jq4blkf94v57408hd7yfzcahqkad6c91y1n9b17qhplly5pihapedqleo0i4pc3a5nfb956pav3pmq0uo7t814j33nbgiuwai1cmd7kdxk3qfn4eht0ymbei7sklzmroc9oduajtt6bwml5vur47gshxw0itnwt6v2am4gz14k7w2r6geiwft55lpjr2z09zjqfb4gcpcs9r5qpn7405hmanxen21psubgt5ynloo1714k9lou07mpneljugm6v3m4dctjleg0qw3c766pvxq3mv9jimcafoovy78ifaaqfz22rpwroa7y0iq3s7g2jnbr60e3gewoy95e7uuwhkycuu2qe34mqpy7aiynieek5i03hggwgxzufm60u0arnm09pjdl148sj7jsgs8i87j2gbdk0s079kzhkoo6869254uvx4yrqfp4swinnneuqa09ejbv2udux',
                expiredAccessToken: 3534718587,
                expiredRefreshToken: 9825971944,
                isActive: false,
                isMaster: true,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'CLIENT_CREDENTIALS',
                name: null,
                secret: 'ks68euhkauls3xmxymhhcro4u0xdpk493xyrogezbd6mquzozphay0pqg8g05ahhzs5kfdrynv879gto78oqy8wdww',
                authUrl: 'svic7mvii4leyan75wupj2guxagq62kb2d47pgzk1j89xg2n5aptyl3t7umji33uphchn7gczsdjiznt0t7fnf2xhytlizhjmblafdubjuaewckip8xtbnud645npzk52j9af1fffosh87t8b6qdjq6lxi309poaptppvye2wizka2l6pw17c9y1fz0o2tzl2ucl48g20tg6g8c72xh4zkt8r5bzxkq6ogdwsepw352ke201o1uxghoai17w6m8xgw4agd2oabprp930emmosy3yxhi5oy9fxe2shmu8tqs5y3c7vzaxggdkoextkeupwnukzkarsliwfylv0zfi2s363bm2llvu5sn3wueneyhei6xn35lwjujp3wwutsxg6zxydaj5tfo59axdq2fa3k7wa3ldhtkltvk7qg41ua2drwnfbhyace2ibfsleoyq7x13of7qofsvbrmkgzl2w6l5ius70znxwt26s7uzngd2cskunzrj4oq8l60w1hyyx7o60ncj86z7pk4f7m50dyvs01eeh2djuzua6cj6rxosa0tebgp13r63mtzi333478fcetvcf4f1m77zckf29tvjxuw7pynyifbyyzf7f7p512bnlfb4a0aklumohdfncgsxb51lpt4xk3naudvd2troa3ykx8pyfgszhwftp6gwp2nq0fxo4we2vpvk52yg1ehfxfnj9wb1cvn2s0l6jnal250ymcw1ymozoxja57a2bjkyoe7ysc0fevu7juqfigf7l9dvuk2xo3ovtr0bxe4tr05zp0rn2fezbck5oznskicqmoppm8qr0j86hydu4rbc2j8976y2am5jhd0ugpk0m7slqrih206mff5ipafyczpndfgpsxjuiuoa038sztkliio026og7bt528ewir70frjt6tmsvj15mtfuxp0j68faxdmqdfs3m1fpylf15rxaatuola6vjbcuoqel64njivnlcrhn18iti5d9v3qx79rrax310p9w84unppecl1sc4705b6ipyaf48wbmqy5rafa2wh90oe1ylfhaftx7udabe1igkp4668q3g2qobmv5kis923msi1zv2morufwlzoniane21juoda85t5j526ysovvgcfcelzbqi41nd5debeos952iijf65pjnvwe8l95r4y2yrrdf768u256igng81y7ulsvio50w5odxbvtm9nsbs69q95u8z5gxzv61m1mwudafsztzt07zoelske3faut998ud6aesfuzse99jpkys4uy7yr6yox5fepke33bznn48f0pzlpzlrd1tuhxgk5ydl23mwk2xjt4to6yqdvle49ho05seb1xzq16zbib1f8huspovzzfuyfhwdrz2nljz4h4u25v3b71oxt5iazea27rffp11i8c0crpfpxq7y5iwmv41r6i1vww5mo30bnpcz7aw3jq1hqwwqyoovdtfyqfyj76rq5damfwe1i8214onvya8jd4un9f0bo576l8cpdsppk0a18zlnsbkr1ab63uwnpkmr4t8qn03465zs4imfnkr4jglbawe2g5626arccc4w8td3vrtvu5uz2y901jd0cor7g1q1qyfv5vz89k0ej3p0mymxy4g4istx2ejy59ugln9lrtcaogc7q2flixuq199tj2dd3talneugw6nlg45bc9vtkg3aywsx86x13blc8o3gohqu4zcb0rtewsuml9nwkqc5s8n10zej3qw7kzzk2ummfbfp4gz71k8t4twikmnckux0sye899lvs1d727oiz35scqjq7y44333yjkw6ezojea7vtw7zu45o96p8dhkkxudc1m5yvslmieh5coimo2pz4w58sl8mmj5uaddb4o90di8w9hlhb9kaxbbjmgku4s5wfrsqbvqbpxx0776d0d0sjzhs7rh6wl44i2waczpfml9u1wj1dh41mous7b663bbplfqv54rred48765dnibhesl4xuzt47jv9tfdjndxnxdgql2b3020i9s1t02ikzn',
                redirect: '486i57lrmu8uzyq1whd0iqv6aflzwjnq6bkiexdgdpiacwfslowf1t866c5mop9bi61hnt4jhjyb55tazoq7sj87tdmezjxw8btql49cpygj55gqrv8lw3zpjcytchq1ha1vuex535ddxq00xsubfierchlca5vacrcn05pokfa4pgxppr534lre1zf2hxvrpq0o2etldefkiv7an4iwirmcl9x138h4zu10ow12rxhwqblvofaj04u302lszw6tyh660hl2jlzj2octxgb3qk1js6huymn9z09yfbufeyc06rk8j4vopu1pxjnv0opo57etp6bcmvfvyj3u0km3zan0xrnmez4ni31chqua5nw4cu1dwah2frt24hqk1gjjp749pf6qgh5il7lrq7k303jnad8dcvctfgwkgq8vmkektmz8oxzjvht3w77v2d39esg3f8yehog2xbvfskkxgminkctn401519qdhhx06ncvcrhjwmxir4zh30fmg280x6b8iuc8eryfob9d933x3whs2smpvb6w8h9mdqxdykzyi6jas3ufsp068tiz952ai4mw321ln7olh4gyntcefr24aqwz32b62scwpe9ipa5czk9dcybmjl3utthj0y7z812i29c52xeit8t3mn2fcfi92jzfwtfx6th79f26tjcepq5hx2n5ap36lro6k1w6yrqlrlmq5smh19dd8j57jph5d20xoq2mgvv20wo3e0kbabs8xujtl1f1lldbpwsvetn270yrkc5g35mo1v1ozrhtra3y6l8r97x58rpqm8oegry9sn95t5dlre3bc7uykz0c9xm5a9yhw39pdka844aroksq42eaub4jkgxn0tsnzza9jxog0do20tti7btw4ugq4856ai46xk8buqkz45nl21a64q25i1o9tnfi9y3e66l2se3qdqvm2zwspuk76omgymvq1c26kfua1b3v0n5dwlyowg1g1r17g2xwbpi7ehybqc3ed27ew72fzk7w3oso3olyvy7eb13ru4xhwmki6e5vn4kst7du5xgm0jtbkpjbkfc5pegfpyscuijotshpxp0f9ds9zpitqqoowdcmyxb7nf18g2ncwpz4s1ca79ixg3ef8fxlpl4y3e5y6lod05yxxyh5nuz3rfw38pleyk4i94z9nre0vclxptn7q1t58gfc42yl37w4ewj3qwxrx6vqtnguf5de5dlmiblrv2oolmk6cxukke8zg8zb3zqnemgs95xs9uf99xz2p4yckrakl80c96kdyp7xy4j8tfw7xy4t6yxc24vlu6x1z1o51rto5f2seez8niw98t0hv4fu4nb5jqvvilcie33rcu3ybkha3k6h6bevuan1e6ywq12gikmf5hqwzxd03ujc0cyxq516vytyn8zmy3drp2l16wpbx14jloempje3olcdfs434vrx0iwnbrn4yhhldqpeuo3w95jcinxcdvepa06z17lma0oxk9xzhtc9bqbfcyb5ljjlacrdzdohqq10lqo8f9pp4wqzvirjyxq1z25zekbwmc9ifdk3lzxfeeo8ed8hjikhnmoekqfhpdoiogr4a0833q81958ev70wtvtz6qjex5134nj9idi2o6zqu3mqfto6z5x2667thbfnuufgpioltdxc1bl4irmpzo72fo5abmerjy40dz6hqrnzj2x87km22mwdfq3oizb4ti03xa899pc33o2py37yrxdhgv7v1acg6ucql3uy3nomi5rx3m2tuu2jr8rsjzd5hl4zvlvn2kcjlgcjuqevna7hcmekr4adjsricluz7s90hkq5bbljvja4fzxiktrtpnfeff42ya2599cdhjoxcyg4fndfyezxlzpyeljq4w2lisrvprcei4kv8t4bv124jiann6fyi8ruqyw0vzfiowaowsetgmqsm6ab4wj7wmcg5wjbvft7cmkqn0vftp3e6nstjizku0ef5rh8q3naevdyynuczlmzm2mgg8hzmyz2q7l2zhvy7anxdc7o',
                expiredAccessToken: 8435126623,
                expiredRefreshToken: 6742892789,
                isActive: true,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'CLIENT_CREDENTIALS',
                
                secret: '30vlsdtml4xuskjwgv8k37x79au4w9o46s0fv8rq8xfikk2d38nmcu0k148df7dygd0v6j7k8j6vzw1a7flns1zqy5',
                authUrl: 'm2mirg0a1djeiki5meup2bjjkyo7odpqe0n5l06pu8qam4y6z435pe1qcrmxi4xrkru1nlryttwr792o0pq7hwzhh2r2xggl12uxpotacyfebmupv6q12igprmnjwaj7cfhcvddb7zxa2fqriovvi9ydqaso8jk23iu0q4getox9kongi2snye3js030609egukrvuuimid2vamrabwc2fm7mvp4yj6kc12im68smy43fwsc0n2nro8q5bkiunez6sj4s925dyxkc7gnyo6zvs7gyxo206trkezod3cyrta19yxiu3qy3jgt1hkauu22f3prgna7y2jctceplaj7f62gttagcl9n740z2xoh0e1bnvi7dlwfqs6u9hslm3zqdefwk9pj5osjm90xr3lw73ep4k2o736a8x9ns6x701fayvjbnvl7rvku7oxhzqe8n2ez5s1eqr284uip7dq2zlxvaa2c4465s0fnfsl81czzagt4sgqt9oar6oeo3l74wlaxpx83k9zfy0iygcy7qclxozvosqhrylhig1vlnty1n1aqzze1zv5i0egg1isfsggre432elw1go41dc3q2dc3bgwdnbbpw1fz01gzmnafrjjet3zhxathdmws07pl9t2h8uo0eockfakvd1p3nmftotz4laay36wwoh5p89q5ze1el25jp4fmg9frfeh8uvr5rxn2o3w0f93wasui745g1ki15pfi6g31xr25f0bheypl74kvn6u1mq20yn12ehpz1x5fiw20kidklyqarbv5gxxdmkh9t3hrbjx1ns9oukacwadyrc5vsrejz54uozi80jbd5tt3sjp7o581zkf1i3ghj5j0qhtmnunk1svbvypmxkdgt0fl2ud7mqitwakcctdi7h3l02gtaervpchbkeylc7dmhlzd93wlusila9ijsu65jsmf63ak1dpld5t8m5q3qanc1gqdahms9vsuglf8v10zwv46s2g0gaovnctdzl5gbae8btj9zmbiry3sci1d943fbkqqgth7fm1izt5t6lksejhax8km44i9oal3uq05knduo7u4yoo7yw3vpw2flj6vvspx8jcancb548dkkso5kltmae8skyiza9iziw5ajfugevm2q30kjhbrbaqmfopr11vu1qizn9qs5agq6036jc3mj7utyxsadq3x2ofjy2ctb8pplwwk48qmazlqw50inuqpdszwu58ty7ebs0bba96p904vm8efotpu1m55f4e6kcopdzwatfx99pdi9ki481fptwkjz4ozjdsxti07ms72t7ew0nc7osbqomlkwd2z1cq9ch38s659jqovcvm1wpc7ffhtrthp8lf0mdqn3w2fy9cyuik4iraz6ifb3vkg3ulldjihj9oi1sbrmwh5zv98pkfu9iy6uab63cna8dpn5mffdqmmjy843obi8uq6g067xhc8z6f20xhr7q89bjkbg2d8kzkpn92pf10a5ns8st95s0kp3784xq09go84b0wxo4tjj7ouubs2jscbhbf063iabafhayu2mkob5cpouxev2pm5z18q8atyeckubkf1ck963jsy7cvzb6gydobyf4b1z120890l2skk7jzmo2cnzko1duntmq42xu0tsewtumzfqrcrqvhsu3hmm79ft7gsqt922ltov0tbdrwz1hi7tqnd9t42jql9bgvqrz2s6790444ffejj7sg87b13uvt1pch6gdcvjdlixw7p2ogzb19w21zx6zgh3mrb90thvjkdivps6t2nv1z1825xp6fhu4dajjlcfjxhtgqzhj4rafh8rqdzw1645hsr9yi72mvo36cv3wuxllkb81ie88ww4n0cwqikhrvk4c17gylxygnj5r439jl8w6l0ifred5bjbffxkwcc0iobc202iat0r6s6dhg8zuk6pgd4jaofvcikxwyitvzhf7rjvx03mcvzqzuontdi2vv7qepf62f3fk0ascp05eye365t9p25dd3sbsd5usoa9jhmwsalpc9m',
                redirect: 'pdfhzyo0ouor8df63iht0rsfd75pr6ac12aht0e2tj5fdcmbytjzs7ixtmxvgkw34re9ny0tct1la6ij9jdwq0hrbd1pcnlasr7dlhznfedr5i86h4ezpp6t7ywso0zg5gosc7i6a4e02783f2nobv2pylpujmpdk30la4n7oohqodsbwhudhn02b30ztgcdicdakyb73to3634ijygwml9tigxpu1vgqaousy0pl5k5dwvtzxgkss06uks2oue41laejf9nl8nctrgf2tubtvcl2s84xksovi1j804fn954av2q8tecv4ly4pyzxo7auy68r1qr8h06764va4mnrypziuivz02lx4id7ygezsdd0r4xqi9g6uka4dvhv5bhdjjakjg6kefk9zu900ydoqxj3hph6bdo82pwqd13oga3v2r256gujuu4jrie32u3qxcstyz2fnvzkkh1q8rpr6wlbee5g3g4fckneoeuqyrnc5qsw72ldolocoim1dht6fe1b6xixw4uu8kkzn03iqi0sy81dw725gdunj1jtfahla4f3sooz8vgvozuyilm33e4cn1eqafppqsd6gtgiki9n9s55tcavkspezid2imenfcul78fj3wqlrjyt1h2zv1z4duaqqs54eub8o9kr01hhyt4w953ebqn729t00pre8xclysjyis6cbsh7cqic5ss628ljul0v4laxwzy7ei3eydxg3vs44kh7z0bl616e64e5ky26nn815rogw5f9j4a1yv8gqexxrejbdalw3gmmjajay2t918d98ofgjh0rq5r5dw2jbx4syupfcytqxfadd20rh3b3e0vnpacqfmhmtqft3288d04ow7kpk9644z0fa58ln4xsu0zhpko3bsxgfmejklz7adh7drhdhnmob57epmwtqi5jxt68vkrm6ul0hs7ja2m1ufkv6el4e7gu6szjsp3pehi68ui58gijkp7yfim2sftld70j5kcxifhxfzv4bfn561erebrc2fhzrnutl5yaviav5v1lwals8oo7n968mmtll9d3omip4h5xjx34el86v8tgb9e6bsrcs9oiq1008e9rcw1gt42gl3wtose5krqys54xinf7jrro38wj0sdt59f3hatcshop6ua4e3xkhluz9w2qbn3d09nkptqswm8ka00cmwlmjgztaot4n5btlh8pi50h0aweddfjjuxahvcuw3zb601keupo6isttqtlyksc4l5qi1wlvqzccqa19na19hkibdq3nh8ybk90wmnehav26sf0cfjivysne68eaekwaiqrcygzh9o50y6alegrkhy1nglhlx2cjwchx8yb31ot0j3cgcyrm1occopatn2dir1vj97dylmfbrx1uhvzm22ak6ukiukegw40wsclhnn6ma38w7n4zyo8grtzvu99gzlgyxagctgg24lfgqr0gxgud3nyhc9yhg0m6bsfyshz5qhvctvg18io4bkybo6d4b4rnu7mejsudwz8ay7d9znyonm5okwo7609hhx73scy8l1sq23kwlo9rtg9t9mjp06v5txncc5cjk9zeal0jnscj3ayj3np8kny11p87bj9hh44y48j6nu1t62ymg352eljl67iq8isy6xmoq8nxke0xcep0r0gpo9hfeovrovcloa2piiqolj8jmmwoewiewsdscj7i5suzvfocaeitrop4z3ix2j03e4g1bosustg21mwujgz2r7he46r9xj7apbhc1jo76z0xlhofru4fy9vlnk6zobdst2sbcyb00xp7tu0qzfkipfpcxtx76kdoevggp8ieut96dhjzlc2ol9uocr49lx4ks9o72g9hyqiqix5qskuudknfy4vaokzg1m7jsn5dwnk8trxn5szf8j6e47kq2u7q8pjj420jv1atglexr936qoheustlwfv3g2k6x41ewtu94adb76kdmyjcj43dd7v90ybg4b2qrclbex9nkzp6dpscqspm5phsz7tb8h4un0uubhcccfnfji',
                expiredAccessToken: 5938427044,
                expiredRefreshToken: 2610588226,
                isActive: true,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'iebzx106k7q409f6mg3egnbmaz2v46st2cfy0r1hemgf1qpop1tuckcy6wxq0wnex4z403dy3wc8pguh3ox43c4crmk31sh7i5lvah5bjqsth5nbgbza8bsvro9ia5owb374hj8lx3d0pbc6afpzpp79r1lyif5eqkg0qi3q8q1c7gwbmr8t6xschn37acnvqbe1h4jntq6qp1b47m8px1dygs5trgllgic0l6r7koczoqhmza9i6z9pwl4rkw0',
                secret: null,
                authUrl: 'q3v51fjf20artlxq5v4qy3iuxlczo43kkpk7tdnx3eqrr6tvmpvy4a7c8n79j9fwznc0urk1z5pml7zwdv3od42pnvusx5iv52kkn7pief9o9822t4tg22qsujy9w3lmgebhir0rvpk8aqr3jm18q19kijhnyto624eapcwka58kesgaiwqyewzcdojeqejou7f9uqgqkf9wbmqpj3wuphdjkndo986n4e84qgp4emcmsqoe69amk6wj6y34y9entxupr3v43ylbuqmnvyyupgnsqixolk3y82s3e735pakjwdti2xi7jip0y9oadumoh4hotd0vfjsn37zr8npyk5fba4zxdunz4n87976oj7tpybwndl8h4euz3ecesn2bl2mprwvk8gx915trqw3mo0p0mksrdy2ymcfsb2yfabvzgzdu8m85iqglajpao107mid087jhinlvfb1y67ih11vnwdtzuajbqai4iiwacaj30pk6ff88bfcr47e5xi9i3lmvmced7vxr27g1fby3e7384nxnyt1kbcyb4raozw9o26ubm3a0agnyqaecove9jxx66oanrzxrsvbwtd57ipnxkhpxe3uui43sea7qto53beqvrmbflobecpp2a0732rlhfm4oetj4hkpwqmypxfwtucrdspbgneod3l3b1u8kyqiitjdc6vkpgiz9zx13l92ins3l69nlo01wjgp2bg9nzg2kw5bq0117ix17akzcueeqwl2yhozhz6z073nfeqp4567xnoqlb8x7i6ppkdabq6bf7zaj8oqmqg4qku4l1x3knmrsfr46ogca3lfimsprnlmr4mduycylpis1pjjjrtp7j7v9dj9k42148kw873tgoq4qjzqxfbm0i4ehtyobm1o8kd7lc8mamihf576linqi1rdap5lxdwjwlr2nyy5zbox3q0hr7x4mko7j9twny4fiqu4xgthj81y8wcaa6ory1biwem46v782yemv4x5998hz44lyvpwmfjpzff3wgj6dx46e0qc9pe224q2d2jqedgbifchm0vzdhkdtklp15304kvk2w43s87l8io9aisk5gmn2l5rfidicrvwes3qo1os96uowjo4xxaf88ph333yc71kb5g0irkprlljxy1ns170axk6fu21eaxbis4rfiyhblbnc344hvslehx8yky3tc21oi683fz84b398s2ui2irfxizegkod092bltsguegjm5bf4vwjcq70acnx54knkh8sx3kerc0jgcyjqckmq1d6onmqqq75ebog4zaw33h2xk2ar5p2tf38hbi6sbgj7e2piw4fs5ykiip4p4uqnzpadyz49ah58mbcmuuh1ku3txtdex0bys67bfzmaxgfcebolozus4ph6bbix3gq0a0glrls6pd7g4zkcb41olsjzlsn3y4gk7verdzsiaulviwtxg023f6gmutd1b3vh1q5prhibebvn8aecd8zlnn78zx7mcgh9c9ytnskeic9sl30c9tqo11r1nuy5t63hjwercgw5xayjc556daimwmdf0bdlhm16u9msxht0jqu2owv96boke38uc1e61tebkqbf7ugfpv7lnc65roclue070t4noiiucy5qsy1hstycr847m9l9r7tet5zol6dsz6tg1jwg9nzx5l5y4y5ityvrlyexgcdf06yd86eiylvvb5dc0qd01kasj3iljc9jqgm2qd9fz3bfzgj6a7h0bgmeg3e3byg8s7rje1o4z6pd623v8r2ma3zh79cn3q8qp1sy39n1hsau4dz5w7y8frdextgkpoio3x8smnxdxl0gnrju59807eaic6wvu2mx1ajyt2sqgkq10ok9gvlm2hv1ceuhngrpb2q6kwfr7rn8nbzoayowlt60rdr6s5pfuy08h54da8850f8ojbqaslc2iuieyqelqerw0tzxk8te1l5cee59au7fpvexbwkv1j64x10r100qw55dm4945g3n5engbor3w25pwbmy5q5y19ca0q85cdg',
                redirect: 'o8feia9ab0jbwsbxc9kllnvhoru8d5qswa5y2rune5igbsxjep3tv5xyrt3ntfqvp4b5ql87n99f8y40ueq3r7jlegn6ite85llftrm1aewf0yoqyt0sdkwm3qmwu529jw4g2l9a8qixc04prufxiruumu9l0i2ccrkgydl1ppml8x1azt4bthboq0u68xuzvcdj50cyo7xylutmdqsqy8qhgmv2prq2yz01xbr8dskw3sv90aw0n0y6ufyfs9o3jq3aodmg4v6gzcflxa7kq7np3ydb18no1yr8lp2xyesybm3st5418znptjqf0o3h63jpfj5zodvwpadvoj8hfdl6pi65wxmgep9bjaloz44btn70abgxsv5moorbd4gqm6iishilkspa0jm39rwowabmz4rus0b6qaedvb5s843w08y9icvko2qu2uo8aa75i5z9gatljz0caf1c8y0q1lx1ffux28xeitn9fvtxwwbudu3z1nnzv05k1y5f8yneh3crgwvpkwukp0vjd4glc1261460mh19ubnjk1lpghu79q3txf980hxfibcjf5vd5a98melbb68bezk7gtpk41urwzd1dpslvjevpivufjbzcb80dk1lk8ja5nnu0i0crrii1s36eusy2ne3svdaul8kqc6dtn9dimb410yjqoxn5jb0xalrs6sbbhi3gfpvzgc8vu9t7z1e5lpr3wy28ylsm2uhh5zkaizy8r5ls09vpudjz9o7mvdee7chwhvh5xzpe16fw0tmvt9cpy7vty6x0lg9z83tbtb1f9378rxa5v7xhcqm9qlk1v76mqmquxkamp3yi86lk4nu69oh89v60u727ku7njb2krdx5xarjdzt7g5kzyf57roo9hm5u7165ls9g6w1bavlfoxnbgmwr3jz5is9fhrcwsjnbr2nf8atyebxofzttbqr06dlq54hfzvpr5de1aaqfhy0reaqveje1g5ch2pig0xhrk3n9zcyk5it3abc5qb3aqcw6q686tim0h1svsbqmmwjbuq3pral6hy1hal49f86mrim090jkksipbhl6hf179yk2h8amj99t2je8p8u4ogw2thq9xkrrbo9a9k9b559pjjw2skg877x6dbn5pinxhdbv4axnnhw954s3e3dhr9ia2aloxe39tro07n4450ozzs01qi79go29vrsz3fetqc2r0onoq5rrqr2pl3c18vszpnh1bhdbhbusugx40e5heuyvikresb62qil323f0umou3da9u8nvpbho1vvobn5rqvfd0q8xtusqwx17rs1cvmywdghc1sknfmm0vwkrjakjhe363t60lxqh29012ye8qf1vh69w7mh3n0hepnarnuxwt3y7ai2jqw7zqciw0msm5yydibnmqpapkqbbfql0nqhseg8g9t4l1iayjrpuxmkqipol41ftz52xw74ee9htgtcgetsmdtjb6n78czl522dsigh6q7q67henhp0c9kqv9ngy1nr2wdl0e6lu3bxc46vqoys1z4ty2nivu7ylmogh6j0ei6q5u46i55vr6ps6g2w3rg3wlw2d0p2k3rmuzdlvl6som1ewl2gzd1bm0zoehajrva2rwc9eiocjo9h23cd6ze5c7sksieqqjzucyaodm71levr1vcbmf03q6culxpdt50yzbrpeobfbc92i3a1cps1c5luz17312fpmm8ql6kcnqt1g4otomfi1xbreic8lugncxn4m8jnczgzaeldra1nr4aq568zstg8ynbo6mk227puoqnttxrojg62ic40nhbrrcomtyw3ivgkqyis4zqnyjismyb96po29n5v1lijqqnavgoiwrd5yzs93cu77nujpybd7tjl3ah0n8r88dnip3lizkz9snfo24lvd5h8sueps4h5gg4hely917pwmtzgjuhnyqd9ppv4r8s8zhaik7o19lor4nlumhat08dk1iqjrehd3ay4pmmwpdxlymxx45f5ksfuyuxficu9hry9ys4vnbrdfz98',
                expiredAccessToken: 2286885964,
                expiredRefreshToken: 4620032041,
                isActive: false,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'gu4itw4yigtml4oqqp8whx95ozgb1b1c257rwy1dlgzu41cgzawkkgkahhhb1fp1x0ks4esimygpbswbc9vh2vlnzr6c6xi77icaxa8mm662mlcbhtbzabqkqk0xe8sa22ti2von20dcu3cvmivpccbl27elt9qx9dbnrxm566biybfro8x37fp0yhb7y3podfs1lptinuls0vjrsau97upgjs13hcapqm6oxv79znsd6z905k7is8mlqn4viu7',
                
                authUrl: 'zdcotgpr2umpc4ymdzjh1o0w8k63jhv9rq9kw9932n382v85hzwer2mnoxt1y3axz8fzy4zezxxtd80obcs69xmkhsjhfg5vx8yoncm3tih0u0b4wup3jdf8x051ef2ts97m75q6p17e1iihknk6s6a7oar2koc2k7ub54oip0u70i4fh23mipyncyqqqnujudj7ojh6ckivut51woleamr2as1tq0b3t5a43ci7xqm5w4b5q5mjcp5ddhgr73ebzsiuq2es0pwfpbhzzj67th0ba9451y6lchdscjmw3y3ukdl1ekjf2whx61kym58srre6uu7vz0mu0j211zjgp7yc8kd43gab2wff486fm1oyrp4sfxqpbvx458qhy87auroa8pyo43u8hlzn5pvlcw49ttc7flse3y5mfks01766b8qdcx52wvl0i0bx5qk59e7zggo5d0zu7yx6uram51k4593p2f5oxu7cvb9r2w7vfu8kcrlxingmsoz2wovdfgrnmwq15aegt8teonpsdhmvz0nccyoce6o4kn3a4dj0ahxga9l7ogag8bnjp87gt44229ow5ssler5vdtwrcrsyb6zikfl7zvsn8ekc6wibka5c109z7lbh2xtb820ianxvlwhd6it5x90c688fg0mcw54cwiwqh84gksisyfbplrzuh4znfydx2vi6p4i8d4qjnpd5cbipj69q79fhjvdk7wv6vs36oph6dwg67u6re7m572tdovotmr35omrnvpiv043o6wls9nhr73aru74qxgqd4ybbq1el4tv5hocc2furwsr1y9evseqrq2js82wz3vv7ym4udr1nssuflrhjfujyeobo1p51omfqfqsx4knug114fzvfh0bge9m6jq5fs8dp0nl6mkzh1ff2s3dgstx7rvoru5px9yaysx8hu3me5pfx5m2pfjx4iqxdela843wyoc4dq8gycshnr2b1l55hw1csh5ew545i84cz3sfqzhv3j6neva7n58zr2aagpd4arouit8g8by0m25ldygp93opy42bu5q56rs2z1krz735v8y70v6j9yb0kkgm88hp6yror1dl4vglei0wu8fj5c8wphwg8h1hmekjnfrxkc88pjquorsua234u4p5h920t29348puht55r4tr7sev92bp3416m5r0zk2nzofgm51iq1f6c4rvyfsh7r4h4v48ris2umxf77u833zgrz6dakq1reuwy7so7pqx1ya3dcx65fndrb5zf87ec297e9qrpyw57viq3f7whoijttjvg17aaafc9kbko0gxcju6zj445in2u8n8g441yz7bii6n0bxbodh91hzpif8671wj94qi6lzo8fy0xvpaf02f1g75pps1xkzydkmv1bna2qztyv7ryoxdmxa61re141tk17zf2uno30855jodw1bhe3svcb756djs9pk8g9ij5r98qaeyavpwsso6cxsxg9oalkdrnoc2lmapju3znl4lkpx7rke6x03cxryggu69gt6ra0k9jh4p49qxr8kzguah8aikgxbmkclupx6d14y3ype2i2cx4m1e24t9c2vctw8ilu0loz4ygmgtvx66amicp3gbhj12oddpn34c4fwkgtlrrngryw00l4yrwe4ar0xlqasa7znwh89oq7uhiidkavs5qnwryhtb59hpr336xygfmaa0ysio1dq1hqy0ql4kipfbgglwkrtwsbb6kdiqtxo9jx09nd1zivallmb4z0jfp7gisdtp2ou85zvthidvlqynpzjq74u9fxcilcezwrvecq07azwwvc2ys6i62rd0dmb0wvngl8kk7btp732mxn06dy1butmsamdax996pk8wajnkscsv8lx9p6aa42lfbw1basxtt2f5msq274m105gctl50bmz04lvahoaptot760fofiljo3weuvvnv0i0ft7qyp9xv67viz66qkyo3t4dzzr3du3tx3tk8ch6qzm2i1qal70jbypcq5cse9zv3ybasa1xupo20',
                redirect: 'v2bq2jqdwp874ryozfxpzo9nudtl5xxkzjte1bfv0fz1fouw7rg0co8l2qyueuo49h8fxs4xluxotxvg1othd60kuqyohxxctuh3gsxu07cgv4u6qfhv2yijlpucc0xhhw5m35wr92136rtxie7s1ezmoyaa3tp9t8n3ijl6y912hp2hub2eacgbczocl47cbfrs67hnc4d1ownbcsaqvy2jpe0a8o02bnxclxuzktojhvv5zz305gyhjzfy8ymomim1prqko74n21m9p6kozthbpy9073x7vir7d1favhte3mxo2abh2asv0caz1yeivxc4hxvbgniyy7kuvteitvzl8feyjv3dz47udl3qqsim6d6rke5d1mbiizsq6mb1u3ipxmjfrk385cjytj9rg6xmarj3mvcc4pn9yelo8ih6rt7mrtdwen114vr0r632264cp9ffg3x6brikjfi2j8zfmnc105lubor6pj0wwnngoi3nb30j1xesyab3ifdnkf3n229a204wwm7xr4fxxx3vw6kf31517opz27447zy9q1qi7ls1p1jladr6ibuz0hs4eeul0bg3679wt2y2t4j4zwmb4rtv10tmy6j1ix5b6nd8ioqcg4x7tjwupvfc5uepviu59ldnhgqpsgiwb4lqvwxrdcxs585emv79laqy0ucxkv1yp5195329pkkesy17as5muymxmt8b6qfp8kj8ba5x956oio7m4qlbuolgur8usx5cj9bkpzf76tztfuvrf0nwoiqfiqibkfoywpr8qtluwei6hvo84m7xzu52tq6si8c5c3z5zqkfd71afkj0dswm9odhgwqdgldd8r1mahbnt6wuzi91fwjpci5im5tcpwakxom6s8rgueg33v0sr7m3xptgvyunpgecslts3noixwoa9zeavne2lsg4sxo8vcy191ytuzoqxk1sl01hjxe5md1n99pexg5z5x9yf2tq7g3qu171ir4f0xy3756yq799e6g484lwg06otn12mqgetfcn8f66ol2q1f0wmi7hui36vbetz3d7ym5xon71ivussrf2de1bt4y103yiwlukjhdad0smip4db3vga2j3q4a6qa760iwyzd992nz8cwe8cryj8iiotux2aputs8zcqy6o2pmdsbqbqmmabx99httpgja2d1bfn17kdv0necuc2wigqpeu1nih0fvt0ab75lcyi40e2orp2swkf4wcf8935fhifz8gf8p6m0wopvo9ycqxxqb106ph7g5jos31k5dzny3zcsus1zodx49jmngjqtslnb2o6odclp1aibcdo0bj6ldh2sk8k52hyb4q2d3j24mpl910byg09ss6bko4ns1s8je8eo44kntw8sx78yzv0zs149frpgzzy69pxh72lbmabrizphe8w4s6s3fp9zuukumd9qlcjpl6ywxtdo0gls4pcsefy64vus66k2jj4t8jwc6swf0dxu4ztv6iojsyr0lqbgqor4kgfxv8wq9qmqxle82cbud7sazr2edbgtyjkvuhv37p8nlgucgr3owk0w1wozwgpfhynrwe2qo9i423o89wtaqt9ob5lnw7yzb7d5g1mk7uqa1mafc2gnknh0izits3fa2m0gx0e2nycbj5vhkro13sm366033obt8ga297vyruwo4hhxf9igtpm2uoyabp6d4rk5pquelgygrd61uj1ustowi78qqcjnnkst9o0jnfq8v7iphe2izzjn09d71ypw3ahyv8y4e30hsypjet4ighw891lyqrnxjtz7bwgz2o03c42skaljbe7e4v63obfzdj95vmkymjfsj9jgs2orh3jyggo1wqmvalojipvea9s2wcxfe5zesfatb24hn9kwpdkroi9i50ogcb2evjnzbqj7wll69z3dqtas471f7ejo13rjs66rw94g23fc21qj1fkuncwl09z7fewr8j1rvtbl3hvro58oxmj6zvj8oq8uop5ok4hs1rnmy48bzqrghg2avqkp7vv859p2ub',
                expiredAccessToken: 3177590022,
                expiredRefreshToken: 5672934746,
                isActive: true,
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientSecret must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'AUTHORIZATION_CODE',
                name: '120mdcczkxzknigdzeyge7peca3xbahw7jrlu2y6jv7eho8kugqb0xses21uthexezorrexp3k1ph9g25jr985eh51nhvyaugxcpwgg07rrvbixnikboxwal0vwl25k5v72xhrb7oeeqouij5gct6d2h3h35xzxqurrynjdwo7lshx7ms60sufkgx0tqigcq5e8d72b5zhls329gixhje6fctfkmf5j3m5ju2nbuwz901mgyovut19we1ntfwkn',
                secret: '6ay8f5u1d2pz7f0k8wruft9exqksep6af1m0188fgnex4vqe1nvjf0hzh3ochx3fjjzmqo4zr6iwj1g5aa0cjd9a6f',
                authUrl: '0yx2al7ikvmoj3t4osdvd8y9y5f2sl2h6cptgfkkd4vinpun97qwm4gubkpulvdm2vpz875clmkildy75kgcd2qavawlxeijd1848eu7ila6xo501mzjovayf4j3atr7c0vznv9i1f89gf21v8w4bwsisnig3neg3kxpodnqpmgddzahtucm6mew3s5k7krrrzpoxoranrfzw1er4x797b7p0zp5i7tsr56acg61cnt8525rx3g0orxivx063er4okno17r25wbttmcnaxcw5cy2pjgo3b2m7x4n2ou3wy5hfbiikghe4vc136pt7sk1kxvojyj2bgj4i9ylogi78112qxi0alt9ghpas53gmqzdw0bcowslkmbu1a5xkz43r4otqcingidww4rzp73q8ff5op59k79qgbu67pwilzm1x125g04jkr5xojsju5tdcuf4vmbm75dl6wrtnk8yo6qqemkekjwk7gbagctfknztmtcosh84dm22pguju3jztxqrxe5tp7eurke2j1r6ril8pvu6hgmw4vijaka3wafjxhp7xsssilsx2yvdii3uf7medqrqixo55cfs97nfip2k5825ni78qq4t0gqlftho6bw4wktq6507426ixaksrkjvsp6lr5pdfy51ca6y8c08o531tizdqb19lnvg4evql1t94f409cfyvyt0g0ybpof1odr3a305q5wejrhir8iw2u9tz8bye3slnra90ftwlm8tyz9v0a72dsuqjsvxxk385fibgp7dfixjro8rv6p5qpg67pbpai2mbh3u2ltulwy9j165bx5k1u4c1ksg65h06bwet2y13e3ui1wylfys8r27h0vqb2khzlfe3bonhcqas56mguw85gx7c7b7jia6xdpdge5cwdtuo0yfoghon4olwn064ijriw5fmdzb2j8lf6cayzk183ziasxjcpswff0qprb5638m0e0hzo23a94adngps9ybikuzfa7rl3lvgf8sla2fft87doaxrijkuxs0mh5p8gsal535rmnktv71jqctl6bw750htp810hvahf78gjt9ae42zr1nb44ybldx193qqs9llg7vymh5r0fllrowss6bq0rvpadi8tzzy2w0lc28qdjhnfsad6l6lil2s90ou29b37cyaw7fvorlc411mhieiw87qaa95xawr2nrix5jokapsq4q4l4g5839av52uuih5raizc1viu4rxdafgxkovb12mx5jj3dxenazddalu44h98sa94r7qaaeg3dq1eh2uuywibjaib3ts5vuznrsonlr5d73sniacgppgbpgx1amks9s1xqnpss3d55bcgs7yd9dz7844gssakg5yc3l4cb857xnc1sm8wzj7akvrpr7ikh5t612gal17xl3smyi7liz1qhnrt45q54kvg1f3qr6no2752rzw9fxzayosut6ylwr2lrxjfryc94hqk4bk009u8ulrkzfztwtseyu3lmyrvf2gn1yt4brja7vanusm7rmkdlryssx3i9pvixp2ixn6grj7ckdqsalhlxd1tpr1lxpnxbynj682lsshnaljeww8074o7upatjid2nuxegj0p6iylolkdin2s1y8qmbuub3e4ps4ecpfxbgbguyipe2w6h2ykfsl20jgnrr9d4sp1zmtx2473g7mw2wpv5gqjub5uevyp6778loro7z2kfr6a6sn1f20qxpabovcleviyte4t6rc2pffi0xt82tf30yeg0hkibdztrb7100obordan74433mthe1v4f2fcd3lbbm80hx8u31whs1dt38te1j7tu5ybxyxabf774egg2v2y9ofel48zoyc39hs9xh2qzruiq6ukeaagtfoo1b8lmkxnztqaqcm563wz40ajmjtowgoolkixm31jfsz8cob7dkrt6qj0i8fok8agmcerxon3xnr8eqm1ei4lrsrilrcntpcpsmaxzar0feuyg3mrygxhadjb973fz2i8darb1ay8a1r58e85npees7ufr',
                redirect: '8w7twihgrmdk89qodf6wotzjvvs3hx7jytg0e1ord60cbbp5cu2ct707fofpkiayln6j9ltcefjmzbqojr73uhj4syg032c9xnp1cxxmepyximt9czibsb80jzicf5jtjnrse4zmtevfws193x4ob9if7zcqfb0o22a8eusqfqgodnb3iqzg63dwpj39ipiosjexwkbq4r7tj5bpv9pzk85bnuaop3hc1cjjoqbyh18f4osmz1jjf1dzo4mnq9xa28xrs2o7njilgywlagr2v84i1pq0gukyc6heqavofz52qhnvq7o9a6chjhqdoprwnv9ix79z75q90uu82usshjuj4s82qt76m78k05dt6ix2xzee5u53nfktordynt0cuho96ptj0wwxglxxefqn6qc6togeh8b9ch988zr9bz9ipyy0xsph4rjy78km9kol87rdx69ywedwokeqkvunb2lz9kej8q4zi67pi24typrb84rqtnwozrfoknoh1p5sw09sr1vsxykbpb0a1ukcswo7gfqedkjil0xjrq405yq29vkt7xhcsgkq9sjonrwtthavh9wi0irn4k8k6xst3pjejrzfd9nqb80pctfr76qfz4hzdkhvbadkguv0dluhgav1em8nvphhiphx65b9ii6vt5gjys9uh9auk1pss3ilp9azds84q0fhx9fxt7gt2tst418nh6e1gp74xqltfyzmli1tl2h0mdvfmay4ua2cdbt13oo5ak5urcqr6x1nrvy1o5gojfo39qv6m95z0e1iibxu8ga7cz8cz3nrhp5kn6hhrtwvhaql8ybtn10o12zz6po02cc239yr0gmoxw9xs5n3ri9snlgi4wrlc041uwtjsexm1b8d48aml3nwylw1urt14zfsw1m36ivfzfcxmb4rerc0wljkjbgq1nlivmel8l0j6hsqbltjoj4fn5i7yunxh8iz9mhqt7ltz1zrafm5b2gddzt6mpod34grtisa81mh6zxcvc0r479smgs9461xqzzm41pxwr9v1lxssl4rovw516y2oty8kk2zp64dufjynpwwijoch1n3ql9hvaayckk0i40de8l2ly3mf8l3p3ztav4ypsb5munj15v73s7zooxfb3rbihqueixuqski4zwjs8mlysvwoar4vnkc6ebstz2v60lub7zo7mjbr2czfihmsdyg76aofp3pwx024c3070rofimut5xaj8253ae36rmv1fd0417o6e6xki8wgl0eyeo74uqdjhfn7oa7x451lr0ab03l06c9ppbo4lrkrxrq2nngyqsd66bnpz3nymc1f2gymsoxwtfmw60vfvoj6eh7tughttwr5hmokj8kw72a0yg811w9eduqtpirak96v0ok58x2i0dtjfluasaex2leu4t4l99q8osxlgk7yg42y6ykw5nptcdfox0v8mni91pxuxvissxwf1kc4w8c0hmfnkqhfwgk9rd1rcglhulhk6zm1n3jholqoex64n1c8tx7s9hliyvkn1969ga3oboxbecm6o56p9o8oy01o1ridcjzcgjkv9bp4ptemn5pq4qed1q5r8416yg6gqtluewuy441pr4gqam21l311d5ctdhlghewmpt8va4ieolwv7misqwc4rv5cipbl7d9j6r8g9kg3aorp0n2zlp1dall7ku6t4i6z3pap6i2vjru97g4n9n7712xa73ni41esnmkf9l59n5t3hyey52su55ydf5btj9809nk2wov0xjgoti3ze0tttefjyahmhlywi1sutvx9fshlk93inegvvjgd5xgabchzo3c2ogrmbi1b99lqjj6aa1znnqis83wkp8i1hpqvquzgburrjshrx55ef0yuwtg3y0zblpseb5gxvx6nsa3pkc799rvg469dr08mq1wmn0ynlyz2vp7mq6devrg1bgodnqctsfzjvzsmc7mehox47qq2twldbix064fm58awnlmksanw94jkuy16b6ygf8784374y8qcea75ikvsqf5',
                expiredAccessToken: 7242450993,
                expiredRefreshToken: 1508885908,
                isActive: null,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'AUTHORIZATION_CODE',
                name: 't2yvcv961vtekbaxdtdrjavnv9mdinmynjofo6mkh394dsexghyiot3vkjh65935or6gipr0z290218rimssnvjv4fchte3rv3ocsmp6bvbzvfmtamh97d9khmh190mhqyivtfftge2mmqk4failobet5bbm9idjyfy49yv69lcnk4yjphm6gqexc47nuc6pamdxqsyflvrsh0hn46jodmwe7abubxbt49i9yckxt095jvuq2sf3946a3xvx7to',
                secret: 'ek9g0lc2o83qmjkhncyaxceqtvf6zq9woyjim6zv1rjhpxixjgc7v3c16ft3o8zqux2za0ay37yxpfsj6iqfh6skgo',
                authUrl: 'kpe7ge8bnedy0y4gpplg9x17xoys3lucoiq4bn2o904shghyck8orflnrvo7dfc4nunibhokzg9edut69cn9tb3esjz0es4m3syqztkbrdi9i96xi4m0lb7ewbdytr52011wd56drishcaus6yvoy1h7nvmrblzz1i71qb69cxi1qv0v8sbj8i1z2766yicwsz4w6wl138a0kwmdgglj0qfq94kvn1d0bnmkh0iiwdh81rygfrjling4qqysz3jm9sxrinhd9zdv7w2w0dbwbznl4dxkmauoqt8m56kdr90y1p8fek915spqqxtj0jbxliiq3kbr9mczntynxrmo3uriiimafn97bekiyy1q7rrzwswhchmlzs2135nblqhk1rz111el0irgvf41dr8i5cqlcgqq2g9zen8f3kwscbgcl3nz8ocfcj40mukpngem3mezo93xjg3y5ld395wts48fdng8vc9ygls4dgmj1wnyx13occc9vraxai7vg61z72wnxwzdo8iamdalfgkmnh3e8pwnnbmkf2g34m9gzrnwolhynoj0ojalxu76rn4pd43sdzu59y0k7nvojqx7d4138rj8wxcphhdbxynvfaw6t93s5s9z6gy75lajpzs3ubmrxtjyn0q3zi4fywjzb0wifayazsy527it10sdynlmtk56kamj295x1zuz4ks6qyf1x89b90kbvmj61c5scg8otoi4u79onr4aecpmp1xrjq3omsngm9ippigo4zw3oiacvglbyocgjb62dobwb27nw7c7asq7ptzyomb3lh21hvubtfpzzwq3ryaelvd20sdshw43rz8sp58v3mvconyn50q71vfvo3vmj93rm761t4gbncma8zewfpnvq7ub9omos7stte4bmsu0r4dmhrkbnaezjxbqudij1mes3z869tid3c8trfjgt0kwpeti7g6ibu6hngj88a10ye5ukmtnnxe4859fev2v5uvug9amhz86dhu50pxbe4vvhe61q7cd1lxn68al07wvbur6ipd6h9hctfyc1cqx3wh12jonxaz1brta045ntrwzwxpubvw8roosq4z9dorvva2ndzf4o7j2k448b8nxw1sv1k63dgtvfk05vva4ue4khwvv8tvlowbejz16yln3jyzosb1rau29hclo1rn6w92p1dqfdjen87ox4bitzsnzqan4yqrs6jdc60pdv8ynhd034lqmm3fm6by4twizsesbmugj2vg6rkh7nl1jm3zlb3agucyoz2veazt5ee0762ztw37x7iyn7ibu2fl9sl0gqc8rul23ylyr7clukn6ndqd5st3ihosxrkvc759dyrd7r9f4zsrikabitasypv49dtz9pol878uu2ywlfpbgs8rsyaw4i25ijpdt0bxufoz00znaj4j961fkoqkxppcc6gefwn92oymbbmng3hm3czwweikhao6j0od70vt1t1a07mglrmapd51f0ycjkk2xstyq92qk60i6y6reyr45pevau8kjylenjhmh914wfehjl2py9f6c5pf3jocxh93okrt3ykv5xu68eurgx7pg18dv8gvah0rt0fbwy2g0lowf8gc4mpsp8pnmpd297kbdicn8hj45f0br3jjgbxocdb5pcl0ng2eg77kcxrbhaj67ehfcw1w83vuiq7ct74q19lnwc1z2wosg9j10s9dao7eszdfjlpwb1dwq339xw26dh2ffj04o1s5p4ck166c1oyfyil59jr0p20zpx3tised9iaae3u4odkyz6lgcqqn4ek1zr5uutad9mn2ovdq5ox7f2unv36dbwm5s701k9gm5t7evxvxx56qszd4uk68kqyhzvdsyne9cp2ite4oc1f95d4bbiealm0liih4dl893f9q22m7yw81bj36uoc6yljxgu3uhyauj7sxr89uhzl47me4aa3ux9gx7gfmt5s4k934yscdc101qz2bvg0189g261mvzvm8umz7sodt84vow8gddt1hs5ri6gdvg3wa3',
                redirect: '3n0qm5thkvcinaqj9pdqhs8gvamf3jjduurxfdn4fy7mau18f8urx4q45p4thslqfe8jlt9bdavclsvvlzgetm6khi2fs8rnw3hobzrd7eyevb5tdxqawidtm32y16c6eciezwgm9zxfd4cs2ckm96kugcoyaqzrjy1kyq9zm5lfr5bqg4dxwu7pdy5f4k4fz88kgwsoq60vetuxg2g9pfq1gvvyaslgn002rli2xt9ihkli6c9flv53amwdgy78ufqpofcs9b9gzb6i9sffw8cr7mfeipplz4n42a3ltv834qa9xfhixa4xxq2ygznumays0usj9jog40lywkadva18ejf5dxz5jshj98w9hnh2rlciz8vjehhfleya8a26v7u6oa1ahr6jcdj7dye1d9j4xucz3sfbvej39hvbg0d607ok457sgqroxpupwogi7redfg3in2bgex0s92sodjqowvl3p54lt3zt0o9pwwg3ejc87hzyu9cu4hpdmww1nil1xf9fc3vt30ndwyqui5s1bgauluixa2h0ie4pc91c72ih9iayqittze2oi1qw4n79uxojy60uoz73iyhuiipxgkiq1f4ujxr5cdszlm9tns8mdl12kg0rmwe8l5jd27uiqs5v1p8myfutrgklijvoil47pwee17yss9nub0ymvr10ddb37w1fc4tffbezat61wgg7jd4i8gfzu5u812x7r2ooishqoy6d8ohd2j7kv0kxwpciuq58m7873wcdkff830qvztwpvr8jwf9qo97a3v0rmybe0ndpa5izr37b96jdmbepdobtm973rjrwk78n0xy6iv961bcms8x00r7thhyzvvc0uz7xpstjdlwcmpsqz4pd02m5lf8u302805jzlc80umfci74krz51ds1ekii0wlj6l4ak8bxw77uunvyacsjwnr1uoyi8akegso0b7lxbpd9z5vdxk5llxpoh5csbxb6sp1a24lfjck2ko9qzbjshuvv6imkwori5tv4xv6cprn9hqf45f8qf4pcihv1cw0bsn8n1lufi98f6c4yz8jxqlexf1oggsbrx3unlna1u11z394v8pr3z6eo8bd4bpbr6pud754p19swxsgr7os830254b5chb0mcryekjr98js289mxjten001vpkw8i8ivyctzp5wmoptul9jblwmle4allxu40r3uqclj2nv7hsm4va6g8i9nxz1dnwnptlf9wdpdwlfc04tdlvlgm17v8qzcg91o2fdodzmqh799f8m3zskmynmpqm94ft4534n7hauk6302ksffedwgmhihmtjtce9sd7tu984ievfpb12rvjynazl633mnczvz0clkr8rzg5pc3xxk0gwobtkkm6mqmy688zjwzgmye4w8dcyoqbm4jzew2gc5pbeh8io8vcairmf9d4bvu13jpwe0762vu2ok574s46a6asqhibgpghsddd7iwb1d8zwj22zuhpwghy2xnhhtygj5vj4ccb62muqwrsbl6zolfci0wz4w6pjrbw9qbmf9r9o8dhixir5jssjt7mylrg5902yydb32jsd4zjhgsantdj3a2zlil1x491sw1d7tyofcjvadwzryat8t6ot1o8o2ao09xo380gbatoi0i7l4zg4wktdwbt5zail6nsk0awvwv70u3v6t69zq3rjwr1lb3rrdu7d9x4gk221cwt4tto3eizdm517h28oyibzi1a9zplo0brqvv7t8hdwcdaouqe8eft1qspa3008yq71p69y1qiv9isuwtjws7ihjo3c4eexqwrdu9pg667xjkvhhsq94jtdx3smjbt7773fv4dfn8bhmf0wpbc057qxt1wdz7icpnipov8e2xndqhqotj8bezzdvpnd5yzhnxjmucez3m9yzq6gn6heizpgw4sgnaaoos67q1w3s0ayib2r6getldu3inbxg53pcmtgwnykb40l877l7342k7d8pbjm7p79400ecoljr1y7sxw6gad8yqr3y56ognvl1s',
                expiredAccessToken: 7439933737,
                expiredRefreshToken: 9678815100,
                
                isMaster: true,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'PASSWORD',
                name: '6xzqf1qho5v314oiq4ap2sbt6ktggu04mx9rg57tjfcda4vfa3j0bx0vwoel48j908aqqjjuqzq509hyoe6nrwc62472lwgz3xlgg0z8hc732tht8iyscd5wa3kblqrnq7tz4oovcvcmg70a6eq9mmdqtfgg9sr61tlwro8yktmw6f6spfj2vxd5s6g1q4yxx8gmz21yjl2fjjlx719p0ras3l0t5s085xqs65rw17mrvu4pzg3q0n9c59cs8y5',
                secret: 'x7huiac0aardp8i43lry6j7lzldizgotx326cmkhg32bq94ymjgh5j7xhu3w765aa51cwwv4b8q8tiwdl4f1u7u1z8',
                authUrl: '1zj28mh20r3ux1aken0wnzl4j5us27ao5vzu3wzwqzocgnfxj5v44uuafjjk83gyig22uu54yvjpwabw4238zs1k1jl85d251yr1617gy08ogylqpmovsxtgcie113tu2ginsmyelwux8geyr0z5iiqqaju9svicbqihhztlefbwf7nfco3wtg8vfrqol0g0h8c1m73fpi2qmwnlnexquxzlunzaws9ppwc91mqsgs8q2btyqltoifkkzf4nky6qfum5as4rcz64xbyx6b6p0gbq1hos7x77jq1rb68x9qpdofie2cxn0e4wgd0zcz1xamzv16c6iimyewyxk4fw4imvgmsvscpuwizzpld6jf2lji9o0p94gv0afcdpdcqapc861l8deyzzm1ewblj4rm33cicf4u2i6p05npopopgwuucpcu0wn7in3240ql3w1mrb2fpvofm64d48job88e99kiqeae8a4jb1hofg3ucftvv5olgqzyy787eoq76xukmkk8c5koahpscxjhzc3qreaycx663z5iqfmx6pik7wrbwi9a55ny2xuhaomuzgy06m4ovs91sgkv9es4vuhf3gdnbamek9wfl76gyugqiohnpphhvjgo3f31iajc1dw900wsbljl8lx1mho12g00bwme54zwe9bsyq6b2xrl0odggw6gw6s6o0677xmyxmobaiow1v49rcablnnebq79tx9g9nbc6vhoy2y09q9pau1rp6rps2mmyirtgfxfceghp8jh9ko0s4iepwfs1l0n84qdmkhqsnc3jjfq792wgr5w0re7tihlj830w3zv8eggc3wuzouadvp3q8wkwq4hqo5gftdgkw7m38uou5zcnox1r1k41sb12pb7ffjfpck0bpsn3ljdd85odb61l96bj4ig9sax4mi4aqyvlij5r3e0350xvmiep5m3m98bzh8kstle3bfle0mtb9iyr6quqzbaqtx1u0iodfiqtrjzv3xzbiqsk7d7yscitr09ilkfix291q7hlvmvhckms09uv7l9uezxy1ax45jrtk4h0ml3zir51rpywwsmd755vqzduatdv9bhi3tmf2wxizglc6r0cxc14i4uzpepsf673jn5jb32e04exiim1yfak4igcron016zlknxs9k8xh9pcq0gw4cwds435t6xtpoqp5c4pj7a2sngrmzt606kq8ahp8gsljnb9l1s7qe2zq0ql0hbuid0v4hzwty7jlnqtz0k7vz5ngfst31yr2qtrrew5tiumazp2wlwvpdrbiz7scs4dgeeipcisg1kmk4rom9githp8ytdcckfzqgxxf24ypr47pyn8lak1e5nt3oeac8v9plbqkx3yzcfnmwho8aav2o4zs5ihiko343bbgxk7vnrbt0j8uwxfztwr7vupso5u2kh17wg12p31fjc1b9wjpwyilj9upmxjjy2cvardff11lo64hr81rgruxc7bk2vzjy1z1rb07nb8qu015zjvenksgh1b7ngnjg84hck9ruadobrofzq6ojlx8sf5u16g2qq3yqv5ttnx39gnyv9j51ro9jboqjvi6ccc0xf5jimyibl4k787o9j7x7kbputq28szhuzoexkopej5b8ka3czgjju4s47a1xv1y5hb1jgdpmorznvfe2yk77xi2neheh1j4d4l9vz1tpvl5n3pan29oq6avujtt5k5orzyxsnrxjjqk130a1cbpysk4nuzsisl9a6ntgnsfetitjl55a1i7gqt1n9nihh2lgfqputifh1r0meh45og6bksl0rll4wjq3sag53ol6k6s8iy2xyxmpoz0znek2ptyzu6s4caahmimuedod1wo0dih0z2tj08559uo3vhff9bw95t06c97wc75pd0yd25es5n1b6cax2apd5tk51x432ucw8rh3w73kjeh5dmqi2ls4qbniu1o84y96x5aoe8hw0hfou8vbo9b9g3k647nfwqash2vhz5nz1el6gc9fyjg20cry76h2ms1v5oqu6yv',
                redirect: 'ou7gldpitq5bxpk1ky1m7ogtlg4ju8cgyenqnqgs2cybdhdoin6mf5jdfxevsztdw649won443673c1f4j58fjd0p8k34uqhkofd6kxjnk8pvjrloyv91qvmkuawvog1kb4za64l6c1nywe8gu43t19dka60zeblaxoz8296lvofmfnk7azqcgzuie5wa1a6k9yhny6m7ja7b5oki464519okrt7w60cvf4yz42jktllpnu9ws08t64hw4n9e439idz3tcmq3ba91ofsobzct8zeldqxf9tnfcv6ynoiylcqtegzlx6lzv3pqrps6c9piom9uurwy7m4y79eatbqppueeuxkwazx7hfwmwoyfrl4ih61rhnbdt5urymnskjtbx0kbjkl34wjufpewtikbqsup9ec201g0q2v8r30ozxkstwqhhba7fb0w23krf21yhnkw9v2nodbsdvx52bhgp089jly8smcaqw2us3bdrzrkrawcf7bgjxv1dz4tfwdcp7jwdfajg89ttmilu6dlnc6pqm1ghl97b4dabxwoyo3bip1qvzdv16ewtfq5qc9h1vxrazqe9ob9b7e6xnx1djw04dsi2w5yiimt19hfn5qtchh1koikldd1g7qbnyzzcjnh4lr6t6bkqnf6i2pfy1yd4uynv813apnfbk6a8rvpv9wuutfj2hsu3khw2e6axq4pvzskrehzsfctxjspx0ohro6xnfbcqonl7394mg65yygffti4svafq1bg6vb9bi3eu3ftr1hajqye4wf6jgp3t5s7tu9a1tzzxcs95xh89ykyvgqgslk4cd9a4jtmscu5l4thu7dklurcl41bbkpv1n4qfdeacftl3uopmsyv7eyeaddmapzvje4iec8l3dkp5e5qpnsi5tn0vsr7n71jkl002f8qi2yjrmiktshv84dktvaeq8pvdin4ryi43e4v4b55et73pr4a06nnzx1hstj6a1gbsgdmccji8cvmfutlwp1mxp59v9sp8pz6z0xnwgsicys5k96gfaa1ytrc5ek8wapseoj5ladjw6lw00sjxmztfix6ue9su7a18i8qhe2ihi25s53mgk713iqctg63gpfzjx8s47ly13u0cmjcba60t17rzelhtcxxw2pmgmrnc2fp2f5jje7uwoc7h519jpwfyueox7kolr38v1erhrszi6v7n5ma4ovhiy7e8jb70orpcqu72xik8epl3hdjeywy8t4blmrchitr8zzv1433z3c3396uxrxxsmdyovxdvt7v1porvhi75kfxmnxlxz903zyyf2rjtjh4ug7yag3kgf1njsse5bgtwsp8duvpgl7afy81kqwm2f8o0f2ne2ma353eqvsbquesqd2pzzvzcf0zysls2vhiqr02j3l5rt7o62stk06ndzbtqhvjqocl0cxem84fev6cmh3f25rx8hropqj9p05470pasrmseg6tlkjhc8jbw1yyj7t0bv5wlxjhdakudrcxmcbgyl8xejxfnead2tlwauqwq6f2wodbl6xureo185oqr72wqw3qkvzo5tzurpsnq03pnqmvz9ijtq2izonww2gkqjy45swnwpnxwofy9ujh722w2fh3txot8n4nl0hlkh7bn8hzqhnhf86zhxqv8q0xxvogd7h0ehjwn4bie9xk60yk98iidvs8k94y55ckgsjfyt52gvvzi84ji2apjzm0he3gpobo1cvfc81p7twk47sb50ntcursvrgdy5yqhz197sfi6m8819cc0vcy39lk0bxm913h2jaswawdjxnfwieq9ba5zezoro9lz95k0vxgvtlut9v3gjilt8cfhh337a103pag4dgex2mtt70tt87mhnbtfbykqms8m3o7qny25nrcwz3idcqk0za8t9hmxtirmutberl18l13nphg3knhw39s73ddowrx3wova33zpsoznp1u4tghfz62ph1xgmqfl4gepnda2uualu20n3d9xomdcv8j9xydr2czz7kpyfdl402ht1xy2w4',
                expiredAccessToken: 9111111852,
                expiredRefreshToken: 9714969603,
                isActive: true,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'PASSWORD',
                name: '7oqi0pcif3nrrg4rglkuukkfe04vxfbt6ko0eh2n4fq4pqcot390umjnbo7oc4b1pbtgab15oa4l0zd8o23i2awsrop9f6tufivwbw2dimxxz0wvj8amzfqgaylmnhsy0f7b95epeixbnyy0wnn7sc4vphrhy2p93xre1zkykkybfjy4l3uj646ojme7ipx1v6edu0mh9mfti3rbbqu8ezyfhwj70zgxuphgm308xhi6t77pscnc0ck0ookc9vj',
                secret: 'rk5sa58gfqzggcklagroezyg9lgt5r08w93hbebbfrys62wjtontaz4rf5m0hqp5kvy2ayb9vtcsrqc7ao26gsmhzn',
                authUrl: 'zzufmg7ohn4q4fxkfzg4jjq2f1dhzf2g9px5su0hjkq0v6vnjqs56wqogkj845mwlaz0x34mt56gexn5ba1gini90vtw5nnnmskqirktanhlu5g7s039347607jpdu3hiwosfegs21mzqsmt119wpsmqzqm3d96bnqw6sgckk65utptlmiq43x90kpt32surqix8wf217fp9cnza6nvgmdypp7ljup4fe0t8gixytt22ecqzwy4sv6nrc5b5kluu7vevmz62x4me69rakghgbdrnhkl8ii6ppjlee9vlr41ja63d116qcv0c6mv21x5aykqhr05etc6hxoe5l4bixpkso3ub4emmmq0a669u8z8rx2ijm6mcdx2tynish8ik9smyucaut580xrcfr4wan15xw2hbf3dbyzgyx07ilx8sn1tftv0x6dc7o4yltzytb4u67r14swmjqhmm5aa8rw7x2dsz043mxfe1i3fp14xp7yxnjy1w9jazd6wiusa55tzm4pn0thx2fd1y7jp5sfviny3d47jfo3puneo2zbt4ehx7wxvjq6usv8szd3bwp9j1mevlv7obqpp5dxnm99ojf6q8n8fc6omgij3y5nq7a3uoa8xe5oqiajdpnyprhyzgg7cuwds1yab9mn5rr5fnffirvxmczzh05qmd6osowfe9ihy6qfupdxvik0eo81y9asl9xktxfwiadtf1hq18o6psiquhjk500p34qt7ydw5g1tqidrr9rh1go65esutw44idxfzu7le82e7poj9omux8l9dvjv2p7jxxzqjnxtdveotj4gy12jp4bj7fpkac4xgvlksr71e1w5xwqwlojo65iox5b72ptmnevwlq84i1obc73mrr7kda0x3rywpkr32k7pqhu1b6rj68lxt4vjdxy2k4tkvnbt25vnuzavybkcfd241ndvnh0bh1nu39o962yghauwwxv39m730mibcs5fisloruq9egtuerfzh5famkc7oqxhauhwv6u1rq9aic2pg68ihscysms0ldxmqku107hmwvf7lq8d994397up0uhelxal7ntm634uw9412qwnfzdeu5p3ncvmcl5zig834b3ore83swxnrrwqrfaz5rp2gsya97i2vugvqze0t2stguslnlmjjny8jlnondaa3fji2qp3gcwn7mqrde2wrh1zfss71yx05tj7uq7ie9y0wsq99gxahhhkpsf4odd44zopirobspnrincar59v1zw6z4zz8fv800t4aygmk72ntjr352tv517qzxnrshzob3y25zyhgbg90vwfdfd73tqwcotpggso1v9kte0dp4djibn7urd1x3d0dhf5z1jdo8ef5dlsuog7vp84q1fdbt2j05ghj04nt1m9xn8vjwv8fp2k32ype9ihillp2vzvtivanplwe19258s109bi77x7p340zlzzuqlhgq7atmznns6qgqhwt0xz2vvct6gmzhdok92j0emi7itcs4lr76d4bm5ajlhb7qafj6u6cmukvlwqvb5n59jgqs4p9fgp38s8tlzsxftfv5j5sa1ba6tc7jh0dx2lxe0pd3x3pclxk4q5w3jswtge0r9rplbdv1hs074tbr25vuj47l6kuagdxeog2arywucdg8f0vmgvg8prpvr0nst3w9eph31hq18cr5mhvppac4kthjrgdtn2fc1xtrngm61nw2g0rgs7z3986zn7z4349ahdn9c8glsmyw5dg8bm4kirz0j3c5kv1tjx3okrvuw73ldapbpta07vef6qprgsbwas933j0q6gwfwr1ha0qaozht3y7hunljj7v96hwvtmwmm4ag0o979cv43u17yc42pva19apstgol1chtcyh53mf3t8iwn510mftpypji6mtx4n7wurr4ibcvvkieju2z5sm8772v33x1bi1v0n7qb9nbj1dy4pde1zmdcon5nnkp0a13o7b2jgc6fdv4j68u7k3rtdeefs68an1qya9otcvai3hf2fvrt3bubffy',
                redirect: '7dffqjqc3vl2wyqxo1x9wvzpsw4dd7wio50iglhe5ltdnuo0tlp91wlgm9v3x3wxtj4js0f19powitmluygwy6emukbiw6zz0y1ebj2dw1mh2q81ijfjmde120pkqaqxqwtmmt87cs7571fha5kbmnhrsmi4jgacxvbewgt86v83xobmiacy3gibckuedjpl2pjey7orz4rwh9i6wcogr4izxezw2s5x6vgizmaj7gsg1wggloie03ur812qg08jrkei1vjmp2tcpjgkxg21gcznd5kcwshttvfd2no15v1j0a1x0jd3wc51s3cyy6dclc2qpt7sxuambqfypx9k8xh8etiihwy7ra6qhfx3czg3ls4gh6qta3o2p4rhdrhlcap2kms437m3uk2f6afb13y1bpggo40ioqk4eo1yau1tz1qxspdw2publx36wptzhs8ekw5hifdpii5oy4fo7zc4uemlwu7hb5bnp14yyn7hrdwilgjt3j66385j0olis32at1sm1t7xhhy4bx572c992ozyti3dnrmj4qiuctzgwpw1c1a60kic93bvfu3lb6n7yceepjzki2doyjeizv2r902i25zezr8g1pwva3cwbmb6ty5k9sdm74r62rboyuml131knr2a4lage1w4zfufxmqzat9ols89kaw1kglspesuf9e3lb279ianu6hbt2858buxyaehogi97eo4y2191x8mjp498skxd7tm4ug8vm12rbsuvo1vz4msh0aebpt4m32jqub3443aee385qq9mzjlhbqqqw5sb6fva742i2nopq4gnn484dgkscqbu3kf4h35fqeukvh6tzpy6qwwkbivkozcvgxhkcaghjwcgmv7feubjvbnik0k92yeb432avk7u2nvn3pknlqzoymq6ispcxbuwli1v1soym7kfma9dd5mr21aju9mfb9xvnepbndht99f6ghtvcurvztx59rq7sangxa15rmp6h7o091zzfc1m9fsj2zu9k6xx1v2926rp4wp5ylp9podfzw9laditbfy9q1yxhxrj1la41qge1l8x9tm80uwotdu91nwxfzurthr5pmy3sp3ddwu1px1j3w8eeoiginnkkrusdcw86g92p4rk2abi60y60j1monpaoivpgqoyo9skm763rcbjl1yat7tyn4pu7ikx3ywy8690oyvf9m9fn6105k3r1c5ta5daab6vcmjzs0968gp76hoku7h678dlkcn275kwvig107qwstaszhdzy2ggmk46q7ieck3vb66ki596l20ubc57xqtemm3ki1vbnhmwo0pmlbr31rlnddzth2r6udzbl4ckx128wyaif4nk9im8iva4gk9v3a46so0uchp7utl2t9934aob814gu0xowm7e8art5o61u4e3fkpvtxodfsfcbosxdjyxc8ykjersl2dgovndivzywp6ycffkvpcumw6l5x6gkdu6wwthtbu7lhx5b9fxrjv56gh27r057ocg84mwdy74ephb6ku9u7begpp39efwz4svy68wjdyh4cx4hbk5lw8okh2nkx8s4tsxof9zskvmsq7aif5ctzjw0wqfmst1uyp1vmjrtalrjaupwqnvtd458j4gryd84a222f0l04tu2r7eqfzp0rj9a197wmvkv22mlu0vdi6bepj4p2reoejcfpqish7cvpyftvf0j83cz2dt0q4mnj48ema4kbo0j9etacoleh840fm8l99xof0ty3d19j7dqhfxxyf7dycl1t1z4x6dadpcl7ojk5zb1qgw5i1d7c42yy0b3vwwssjfe5kbwq8tchqp6eaducdmtz4woo2aofbpa56xsxt1lbc7y2jdwq6x8dwbwf2b1wzz9wk8za4bkqwi8b0usdv85hma3ksfi13hzdfodolmxsmmkbxj2pouasf8d24nqjdxp9x9ak213yq4uu9yy7xy5qlvu4qlnopxnkuw0nib7uu6pv6fbo3ljin8lyvbgfof7u7npwfy478aesn9fnv88qt',
                expiredAccessToken: 5167548385,
                expiredRefreshToken: 6455183451,
                isActive: false,
                
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
                id: 'bjiise1qn3xjijo0m0185pf6xza4wadqyrwbv',
                grantType: 'PASSWORD',
                name: 'oi51k7iyhqvk2nx6segmm9wl6nongj8ha90bqywi0o4q2gxe7mdylqkbo23w8dcmvgnqd1ei5jpv0v22wwea93xuvq80y2ux4nhk60roxv33lic5mv42xbwsme6f4maiqns8nmsl8puupio53cgv5fpjxs0n7tmcpqcu1ptkffn5555bhuwd1s5fa3thy6tcnb6el3zwuqazm3q6roagfh60otz6sys0sfaokt7o2x1hvo88jv59c94ikkarzq2',
                secret: 'd3dvrcrw76d1qkrcx8g5skgkv7j3qjinphkwpp4r8pz0d73bcmkc5bw3msj5aitm2ef5gw1kqcfsf27bgo7k1jx263',
                authUrl: 'k5qitbe76uhpu2fegpmoij0im4cwp7umi69flbj7hm7vrqv541efs09intjjjkw1rhi37myw70nuaoe3qrh9sv309jtytup9hn54oqiwjang0mdcnna8zl427n3xpgavvxfxudnmvjhcfzjyazarhzun73wfgdxd7bc28nc6y3frdqpmic25n9yfmbatss39rgtamuux889ahjkgql59n8zxtheyhgx3p42mj6k4xzhlf7ykf5lhwm93b0dhl6h7fwdgabr7jcth4a3iajpsaspqqmfn8glv3lxqjujt9owoievng209o3832j3edrn7nwhzuf62xsqb1jln4xxjw6izpissbuw87xco1198hn02tngtld1xpauvdbz48v1kh8tcl0oh2fir0qn7fxoux89rgo5nzxol3e1mfs3bw6h30jlox153346b9plwan35hy2431v87b8utbhgh8lul2si5wx2ddkp5do2sf9y7tl1smxbojx4gk3rle8rt46vwbnk9mrv9k99fac5syg4g7x64vfpis97o4bxw5fs6gg3zonbxq0je5ltvwb6w1czpk5sfqiby2mh76mqu706ueeurhya47h8s0q5cd443lxm9hzia41rp1ozjkthb75tlny9ppirc5ig2zhb7ixwau4xfqq9lplqqpg1odviud6c2mnmayefqkiuzb63r02xiuundm53gvoy86fpn1bi3iv5efr8h47nr5tmg4cjtmkr5wlk08krw2ikd9jpaifa8hzynsyckwjqcrel8d83hzkvxqdim1wdd75vz0xdyuil97ged7cv0sz6k0bwjmvi4s1kqqbngo8ijs3bvxrk2jl1c92oo7yb762c5pr3qjm61hbxbybd2frxga0gvzuexddesdt6rvv0zww0fwi1r6gpqpzfku8b4mnfndh2ni2550fwqb3tj88d7uaofu5oth4h7641020pf9rxjbw7lqanf7ra4si1sh5zxttpg6nyzo104fn66ezxp5adwmnpq1qj87caictbzemhw2p1hi0798kdmri9hya4xk98eo1an9vevbp41g7zq0hsrdomnd2c0rc6oxmxtqggs2knjn0irug9qnxr1wrssbar7iw0m2mwjrlyqhc3olm7p0myczn907wd32zoc98625jnbon3hpq5v1v645izu79zros58b6e89tmb5hi438tq6s0n895iyjc5ec7jxdw4ql3953feu0l0wqql7dtprivybih3sx1gklb91gosrm3n6eu0h0u0625ngsde7ootblu76s4ilr30mymlboou3g9mnmaokzfk9ig9gx655oau5rps7w6n6arfrigdfffs4m7o43rm5ic0txnpqqeumj45ahrv4ehkoywe7x2ymkgyzf1qyn2nnqo0fto6r6co5qiumj1ksy2v63n4iwtf4ijy7u0sr07g5l0wrp8ctiwkkzwle3ln2dhthhhrqh1ws27jtj39jcvct0mgymoz75tbsf19bmje9o0vixh0fappe1qae81wdbit8a6uzgsxw7srmehhb7ch0wpdq43l8gyou95rykogdv2fa5cjrtusugau9dco8nl58yblyvbjoi1qv8c49by1l6b9xothwcl9i6qti9gejehjjret7dzuvtjr16jubxzyqxhlerexg66pdwsfjixjys1f62xlooleavbntdfcyagf2kfx3ci74zw45t5w6ywd9kjtlpinkbu7oj9hfgdjw97ijah9t5crl2sruk5r1zwdps7b8xqw313ugz7le3ooeh022pjqgd074pxvgzs5jcctrap28k9439lsomk7qg411n7aog4ht64ocdps0y4sq5jfsx45g4i0urp365ksc6csy19xoqk8xco95vvceyhvvx8d2eebtv28yy36z49ih399sbvqiu28l1u0hleaawqj0m1woz7vom2qmfkkdoz0fscn196r1k1f1wdf7kyggq3xxnw83vqqnwcsj0dvposg7zo3e7hsiidx8294ivybf7zwd3bt64q',
                redirect: 'g93rjs4coxcb1maxz51zjw8w0g25q5fbheghd8mkbkuzpid5b9qpm7rwwi463qjh7zksxmkc8ym4gtqib2pgh51lr36zzvieix6r6m0ey1pw06vb7ibdooatp2ksmk392if1rrvhq1adr4sciml70dltg9lumvr5mfv5f1qhxi8y4fzj59houpld43jumdkgmu63ovlh706n58y0pvli3pne5bhecwj96xmc60bfj0eaug4nth4njgbjd2t559unxycq6229t3de01yo0anrreuxx5avgolbutk96aikmcavwzs1h8usvzmu5ex0vw42wpmbash7yvxbjiqevj5lcnl9tfoqvsxrtvpna9ibi0zuttbpoczf9xde1wbulz3cu7m25kqiyznkdm6bojendh0428gi4zfl920wibawc35aro1afylaqz1kxg8tndd1jbnou332hu7bfta6tht3wifzgg5kzvstan2g1qii4mftx5d1a0i3wquxqxm999kx3h1prwn464outwizdo8aey49c1jv6nzsmoz911o6upntxrcjhatf8hcmulp1koq3vvtwp9y7zs4zc5ny7u4jm5gh2zuw2c1ntqebkpa6kijhsuqtav7ac287837j9tx06y3hrf8464bwdhaegj1yi4chaysusarnj5exgq9204xxvejyilqi0wrw0qwldkl31vf6mge2phugkdyhwjlufuc62kzdg9n1wj33umldnqiqe0vw2vio3gta6sky8ke24l13jj74vj5a0xw1trt9n86g5vtlbomgcndt9cogcimrhrtnjp0lvfnrl22u4teutqjckd4im7a0ktkue5a1ft7qcb9qv29s2ib24y2vwk7twii0kex9ds6bclpem4iihkjnrzcmf0xgiwxzozvv16xm8w5gqq24wwinpdgbc9pr0a7bmpiul6wnerq0joewr8zknv1fcyaz6nrhiavp5uhs5nboz29j5invv4h84jknakhp83dbi2uka46tef0ry02r17rv1ceu37bsl26n5d66olfg175pixyzlkxafi4yav2qkb7i2nk2nitmc5dl2ze9bwev8i5mtaycge5r8arpv1gnei0axmbvtnyc4ejrgfn73sqsazymqzbeclq9knaat73nkf82y4r8mibtugsy28v80495vb9l590oeik9yh2oyoxq321dg2m6c30k04wk4k8ysk9c3fiak77knf4o59q1bg1yxexx6xdkwtn5z27iqphc9m2upgk91yilehj3hi2wdihbjjsintom0xzxdbgfb6qmbm5lvqbhlnfi15lyzsqbm2uckgwt76k3w9tny0u9sdqqy6mzo62sd3f0s3npy0gq6l2cs7p2zlihz4605i4shodmdp0scs1jaqc9bf6nd4i3bpvpkcy8cloo8rr0m98cd6h4jt6wyknq5w0s32inolz5ljydz97fw4z67gs0fql4dz3e5eab4p7l1ye390n0n2dyxkywy7sewkgpse4d69laghu893pl7qto7ej24wktemam4k470kt9o1riy48xb3i2yr6qu1gh5m325m9t96s56hr0ijoufunjni610ioa8hdcl4xdauj4aw3gagowvok5kxtprtho3qh7cegl2zdw0maj3znnuyb6lkfsd7qouik6194ywyhcpdhb749wwqffxqllgms8n025cpwndcxfet15oxxr5ybal70lgu59jashwp3ij256i173g2y2qyd2s5wvbyrxykpkojtnhbkvvl1kgpsk7q5kkkkkq5wc9xeahbjo10mvh8rxn97bf749y6bldovdnjo7ezi8xh5tbbwz5uyjt3ipq273sfkczo0f392rt2j1d70cu98cqlefga4m9kxwc6hau6hd5bybseeiof8g80jfy3mvad3gyr8s0rnpwl4c5qvxc056vashn899g8u9cnskuycmroavyltdsuq7odrpu85tok2hjp9d2qyon6cu3dk4o81aha7kkn13o2jk5h594iz1907fuac6ucdj',
                expiredAccessToken: 2830647630,
                expiredRefreshToken: 5544505222,
                isActive: true,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'PASSWORD',
                name: 'kstj2ep8snnsuz2pn0tdz9yvmmev60jfvgczn5bjuroc1c0ow9u4qyvkyi5cod4065k5nmyd09nahd3f8jbiklxkuo8iqqqz582lqrth9d36btxzstyyys5y7315n0pvojpfrfv03shd72144zscrh1hqioyj5hsgl23j4081quugfw4ccuy2ktbf9l5g7zt0s3s3qdbertad82ursdvlbvdluj6a7a4ei29uwh4b7k3l8inf2l9jz9v8l3m9ik8',
                secret: 'ylz7zy496jvuzanj4o8jg9c5tvfesbmbzpmnff8phxdv7azgqhfb0j6am55qqjroryyoivmy2n8xk1ft4lhwvh3iak',
                authUrl: 'p6cathdrf9a54he2isy6n8wz3f5w82xfwdt370p4905hs989ysaifm7cif2rcs53l5e6gahli0cqnhq2jwwoafa8zqdcq1zjra3l02mkhguiw1iednme11odqxc94x14dya9dzbrtcx7xoi0caxcjfuijltm02kdaijxqz3q9ty7v546wqu5tf9z6lfc1lzh3z1xm6yccas5ci5ykct8tih202l5lgpa0lyroa61qaz89keh57ldnrfv4gfdpot5q8vju1d8cyib30emnbnngm1g1vkomtpb6h12xopa717rwwadd576ahjww3tmq9yohwnyt482fc6rupxaq5l7xa7og47jgevq2et6uxtgfb58yueh8ggzikjz9s5zucpgren30wfgtoeoilaw8ypet6re6u3e5k1wh3uemz91dyqwo3qqrjl7cs8fw8j4oejg9ghmqild0jawzdk57xvy5jhdm8pcy2audo2t4o8boeiioowwobo77ne0omat3sgfodyiqj4zyhlgyvwmrbgexnid7zh2eel17sttoe5tda6gn74gwtuce1oefg4dkqklidyib896ybehlsrjnhikpxrlhrb7h258md8rh3rznmc3lnbcu2868ubl132ezi1wtgv499rvtfdf390jafmmtv9krtj82dw09rhyg6tgyej7iylopwsyse3zpsw1mxiyhis3lwyw79a52csf8v34c7j07e8ugf88n7pg7269ta96kug5325vdoc738b475nyqglkiln2bpsyyp73hmk54mlo7he5gdbit7cc8jtdn6w771n3hgajxepnlxqspxes9g3ivlcfo9pl58l0w9ucv8ezzywd9183mmdap4rmpdp926sr74b5mms3bg1urv88jxs4fm2742p6vto0qsbzar1wulzyfvrz5qy8dp9is1ixjz7dn33wil2jfk5dqmz1m5y17dqvo6hcl19wksikbcglvahua0bsfpfyewyixaxmj8vj0sngn5aris6kgxonom6umvmkk8fdp9xlu1go7hrudea24br867b63vz1gzo7wi89xubw3z07aloa9w03wyehltxroou9geem33gxm7ganafzpzofxequtslajkb0i9w2qx6w3irjeinjl3x32i3u1iyiherb8dme2tswr3g30lf92x3n1qzjhxxp5ysx7ge5yvwtjpr442mzw9mpdd3yl0j4teqyzs2s9jdtyqxyzmlocxjn9oggdonmtuz6ucr6kbvx7gi6x6xu3qqu60581tdml2tz30nh1fqj4il1nc4i9woa2i5nlmkmifsk8l4ova0ucgupeh4rntqvpdz6lec6q6p4n0a8uo2n2pf5ldp4vqfdywlh6692b1u7edihgo4i3bzbjdu8str2znz9s9ib7jk7hh4ndc22xyunryz6mwtnol78nr4pzsxfl22s6cyos2bplm3phe0glf4yovznjuhurbogdd15tswj0v0kwrnrxflm66br4dzp3rqlr6kagqtqki4vzkz2iu351yuwyxnhp68n93tbl9tad13pwwk23ebv8yzagj23tm3eutde7vyci2zr2tu0qgm3sfle1jwuv3k0m3fnf3c7wwsv1xuyceel2f1g2ud8sdskzyn2aoakus2pqli3bphl3u7yirhiz1qsistl7ma0ko2ugh9i55ubu82pnu2wr5klttk2p0xqhj7riskmiqs28xwtio387vd7g3o1h2cbiuv4ibij9ch9xt6xojavexf4qq0ukdy181bdyb5fzdguy7jsmen9pclsqagj1vchuvuf1wld6xr0jvernm65qpjmxz814v3a55g4p0zf6nproxdecjcnc1aysx3p1yeqcv426qgamv3manoa8mnhwg8n8v7ikme8405clle5bm499qbtzjxip6mm8yegqr0h7oo2tii37hqi0hggd5wjtxg5wvrb00nxsbimnt294ftl2ckqil6k71rbizffzkrz68wlf3muswq7040ibtkb6nqb0g0aazym4srx9adc',
                redirect: 'cg6lkw98hnq8z8p121js3uqfcckpfmdk10rjab6nkjvpkl5i8ibddnnnyq1s3zuhf1qog9p03hrscgzxjafwcm2vwad3ohxd0gk47ylzh6qkq1jay4fj7n4jo403mppwvp0t8u37ltjcq6vokfev0jbvzbh0ql0uuatwkgszqexs7oohdjmuem1us9it86dbht0i8qi9eeu17gq177pclob02syfzorligebljkwtj3qey5cg0gi0i8gmf6p1c2fsytcax56bvyej7sutpqy0xtiz99v78poq7k39vpemsm0h5bo1cx1ms22k5ga84d7j83fefys2r7jxdqnq6uf9vnbf4lajqpmav0ud9xi8bo9nc2l4m40kjifbmf46bkmrz7qj2ylmrf4wtmw0wdiuaciyj06lpzqwuqpz3ajynfq3m5dwkab61kvg7so6ct1iivi3tl2soh3z6vach7d11nxh5u1fgaao6s2h7n4vv6apmf09mxvincgql8mttw21ra93gncgddh8l0wnfvd8sp3ho9w9cjd945qetn0lyxia534hth2bsy5qmzxef17isj09jkmzforg52l0miv7m71oe1o71ilqmi4petggiqfqqmzr0ijh6biupgyukscifx1wm6y1dww1laiu84c6tvw48grahfh5o9ukxbhxv2dg79bl2e1nd1tatpp1d08zzcirmivw7cw0087dvsu7i1sz24ha5d8xuavmwbtrjirx55406g8yx9yusf99wmk2lipjshrp00fl1156rqq0j020df13rocaf8rl6urdj5mkcmtyoltqx07fcbg5ghjv3wi6gk1nne8313lnn1ko9jymd2q3dcsqvkfv17gca4oxatgaa68ew3wr6r93hsh64ctkxl72e20kyblzopvyye1wudtp0tj7wjxqivnm74cawt6abh5lxm0xuvaryolgwiycn3u4hffecphk82x0mgr1fu0d9p3wsy4em9yz276ldoo0d6pik60h2r2bbip6iqgwce5z8i61wzupng7kr0hlyn8q7j819x20gusljyme7odretfnhk6n4vnjvgrcmj91otbfd9y1o04vj2bfvbzo8ljcwqg8nw58y7fdzk6km2tfxxieh5js2eyoalmdyvx7ng8k3707tufa6hb96c5egsqzng9ph2k54204z7mjto6b0x55qe1hvyb2jdv434dk4qgbw7lwuw703cqmtelj71uve58re61sfmz11vbvus0nv3l2t1k26hlvd4ugyfr9xtgrxbsh9kih4f3j2h7aunxfbddpbxnah0oriz0z1s4xrxi6m57q6suuh58n103lyd89erfetlev29peqp84o4ut4m3k0gnunjaabch1qp8n3oftjnt5lzlbxo9pqgi4kqjjvp9b0kcz1jkbaoimf2jpngtd6u3ag9r2pxbio7jvpy3qxz45j4svz4rrl8t2ih9tje7gyajpcqnxeutu7vxyo3oo1ekxbgl8aszz7m1hvhzuy1qrcq9mz39c1q59e0zoddjfrv9spddo0zo439ockq4p9srxfxe9uty0k6l2ry2id9topsl5zeam3c8or986yado0d2lb9mazaealv65z4gehms76kd06cwjo10vyl3e1r7132z18m0qo8uiunar2ke2pijxqdog7x0wu4gtqvgbjum0h0e4ghpz95q68muzokkp6adl5fm6m4pec9hcfvzllt2okhvjrqsjv8r0og6gcwdk470sfph0vdjxowjjq5jxp1tbn7d2t4ztcfmks5vb3t3zgfkuebzguad80rvagal5fdfny7hx05uzp3teg6pelo6q0cuulwdozdybzm344wtfv3kqw69am3rs7vuw2vk4hd4zb03rzxeskrh9zmks238wrnj2l264hkul2y0e0tay5cw5lhnipzu2wyuukue82648wu9s2bsr0zg20sgxpgmbnhxgknq02c3qg85k8ahyhulcl7kwtyr00b65n9d0rathvluju9jauum6cql939kyw95',
                expiredAccessToken: 8730484088,
                expiredRefreshToken: 6477670042,
                isActive: false,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'AUTHORIZATION_CODE',
                name: 'ddj8b7kbk4hjy2frrqk3xzkirxlwmcdyj9c13dbcozcj19yfwxrqsm5wnvowzdls7jbfhtxiiuuqsp0uxpvopdh1ngmqov34tomljzoweoqlgqp1rfhhajvexzcwd442dqogn5kwnxo72ljayif5v9s17xgdbieyb6ji5gnz3vmz7ucpbgxszw9txhprbbrz8wtd5uqvcrtgfhdl86t5n7d1i6i9yy8dpnj9a63eq4nohskl6y6oq5i9h6bzulw',
                secret: 'qffkf82zrexvwfsf7p8kqqnkcxka1ezd80fk0fghd5ofc2oc91zdkp57j6kfu87jn2eoyzzdqil0dd8wr256mhawlna',
                authUrl: '7g9w6f0l71x7dawar4pcmkdlqmws8h9lrkwchqanuvt6p6758sejuh3boasyr3myzgeunnlh10jf1cr1iviegdr00gth7i44ai3smhiah9n85d9p9q067bovq24168bhx5wpaqw9ls2s7laepkmyj47s49avvhjeh54vq0nw8vpaoq4o6lfwccfmyl7ppx172t19s6t1kqr86fscde76kmfuqabbg5vryhljdojsuhr247xn7zfj87uv8lj51q14goyeikfdb76mygnco4y04id5851gbbk2kz8zvlqsmu9sa4xz4mu1f6h9ry8v1vj9syraso2te8sgtwrscv65axdgpyqs0kpeiw8vd2alcei7bi00bbh2c2a5iax1hmvny6e2yyx3q623e471snhoz00n4959v8gr45hx1hyj7aqjj2duxmknsm800kli4mu6lxnyncl5a63dcnultsq5qgohpm87c8qwo25wfe3ko81lkn0teoszgbs8ummvkpbc1abuz7eqzir457e1adqk09ral85z298x025nqs3vpzadugm3mzlv1msiuaj0jat558ec8gtkixwuwfxzn64fr1xkag3e35nboz6nelt70t1itdia0x6gly6dadg9tgpmmk98umetoo58hujbq2mc0nc4fwcacfdk8pe08j0aik5v4vt7fbjuhlcri52fzhsuccm48zeszllt93n9hf3zpc5e4wsggnb95d8pjbgeujyrrnwz6702us5ido51nseqnx3q8abxiqxp28kiyc8m2ackj9eaurg09kq7ka1ob9zxrw7f4iu0spe0kgfmts8x6qz6ayuiem9dw5bapocws4gn6n5cl47ekx0fsmgdy59ir5k9cyxtawxjgpj6csjczupa1chuylaxz63ez7zzx9dzy2ugzowzmoy6agiu6c0ey06taazb9t09o8pf0o3ban3qi7a8yns9ituu3g277itls28yynar1buktuxhe7qu5o0ydmrjx3a9pkeeu6py1awuat1wnttm9mz91edimrudc29plozelcntshwxsfunzjljlkauhu0p7pkw78ptnbae5xlk9pme9aojluj54ngoqojub9n56pei9eund6uf1i769s30efo3yk0uycl2sdo93t5fhhsaaqbqh8cm8bqy8gaynluubfsz6159d431qszr41ufia2ar4ynl0palr0a3mvykbg9i12e1wlzdl1twgcefme21cuxsnxkppido123mjme4eucbyk9o6fr4rl1udnepam3fvwafgvbc1m5ne8dey30ic617vxq630y9gdqpc827gpibyik50amuxygbbd9zlzmq3bjycn0tzj6yljy5lhsjccocpf2e93fgn5fpa28evofafsln8l8nlnqbmgtm6927h5w5wd090xtc1ohjs4e19yg3nmbcwvbhm7la0dr4d1gxtu9fgyuty30s4j5asazyy97ffvz4ezmwyjsd1xbfczsfupq93044nrqfcltsng417weqro2ilrtmc7xp2n8kdc0kp4g5jq7gbrqs6ohrb4ald0g3dfgt8cxgra28wd8folk9nn8fmrgnb8tjjm8uj87hxu3lbcf7pivb6q9qz8dcazik025is3mjeqhy1qov7zvx4bsaxmfwcj32o39766nn8o325zag7849ysea0qqbp4ywoh0n91qd3enlfoalf5u2xnauqi2wkp5gqz7igmvpn15ii1lmkaoc6kjafjcw95vhobdnnnouff792lr0zemrqhp7ohwznvs9avk3284kd7v7fg9hvvlfzzileg6fxnm9do0imkxw6dxf8aqbhu921ms5on7fc2hj4kanwh8cl50fk0daatntwfzfyp66rrkt37ijh5fb0rqtxw50786u71x456lzxsdl9cvs6d9kapwu83tga45ja7hl0e4ce9v1r3plewirs5clezie75owrm3bg5jwbkvxembdk43mddcksnpbk4vazidh07sxy3943wmn5uaukuchtjr2v27k2ub',
                redirect: 'i0ajwyyjnhqsou0vwqg7m0pxojwqqelocc52ob0vc82izdxjcfyaq58kmbx7wlq4r3o2mgrnoh4663raxcuz25xi14sqrczjyqjr2e6oxfb70uifl0et4vt08w81zrg4369ghj3q72demvglb2if3t034r1jcj1mc3u9jno0ea727ox6l1i7wsxn2zc6hccm1bz2wuxsap5qlhlvfq447b6rcx8ixyv8sejh3tinf6ug6ky2z4e47qa64kw6rs9pixv5vllmn1kpblarl4g85j0som7jxncxy9g8d8qjnagawjjqu45zpx87whr3jt2hnpplur1493g9op3h80wgf2u9a7n5hqd0zz4jy25ubeegs626gg0z3s75b3osinfcn3jkcag0ovylas2i3zqjtksg6i76b4uyldmgooeg0qry2yo1a4e1kvl9vrr4jari8odnvfqoh7ibgj8ku4ihnq1y9oq9wfu8i1mjpbbx5db3oroyytuqtbkvyhleeb0dym0w7pe62wq1ywhgxs6gd74va3vry9f3ii131akavwyteews08aaoz2gaengau51ntbd6v2ekkpwsa1sqa2aitu3hag2rdl9gnqg48p9pltdkakqrdpk8r5yq2l10nivnl9tu5b2c74dx1l3otmxtj92r52bcbnladjbgan66tt59zq1c5onjpi5drd0ehc9f5sd39bjrguhyv3943x1hkhv39n1j5pvcigkpdnvcqyrx1f1vtb1gx4uo9g7qkr593390lqn43kom79bj3fl7blw9v08rbta20i05lv5c9rd3dpp5pgjgfq6nn3v85rup2ro5d3r82zja3i370xplqp8pljatoorp21fsmu9sa7xasw8m2k7v8t8hbilx6b5rc90k9q6xs41bvma0mjjy4kqforaehcwmxm9dkku8nk6ajm2r21o3dp6u89gs91pydhyfo690aw9ijsngdx07ia6m7c2erue7cdpvni5m4n4pjzqp28i1fp1q7ur121bg3apkte477nrzbktml4rxg9phwfeuqxqhliglcw4a5ck14bmf1wgmtp3iylus37651fudsa2eggig508i0a9ykok56z2j0wa2axlyixnyegtc6enudqcadmfpcnhb6n65zo1uslp0b41oeyblvsbe4spxadlwdvf9tf25klrwkh0cccedndlbn3gin1uatxzf6xkv7cl3jxrgy7g6zmbwsrkvt32k481484jvbgix4m11hwrj02klxcc3hrpw36puksn7vm2iw0tv7iqcj1zdbsemh4e02hc5ovydt3ghrovqdzj3v25t9p9nyd7u5vmuqebu3eqncaad0g2lzjfm1vn820cxhbar5yjrog6tii0mlo7c9ezyn5ijb3vbnznicvf5g27k8jma4klwfdu2ds11dhgccn2nm98da3x2ip47cxpy245dsv29tkwqj6yduhomym62ky3bdqm0cc1t7jnnikw0fppluticv4po3qz9uebi13m5xmxbxy6gmp6urzy723rkiii6i7g52vnxscmwzxmghawgo6ot3p9k31gq3pikaxcjytqo1vr77gc2kwb3ly9cel0qb9wek975sgkgoeqkky013dgki7j3bsuc48iaajfgeopjxza7ya32kj6g42b117tom6ebez8uw9pct7fp0zkvx0rue7el8j3cqc0zewsv4fcxanpsu42u7v6hl13fzbtvelkmb9nb6frnihucphejbssofwrl90e3jysw34d8yh9kje2s4zzvrcl4ta0fihluvm6jzi5y0tsij134264uvlwtzs1pnjielx7xbkflcm0pfk8zkgnsk92g06y9sqpidx0gtiwrr5k6m9ucxz1dqmu5s0xn6mqk91c0ntpksbq4eyz6jfapje55o4jgzt4hv7hhpbxpo8s1gu89k3q2vmp8nid022vdcgaccujba4s2ynbnduydm4ozujx3c745rk30fcpfojkzqxwlitk0aukwaj90evo15hif5f2hvclswoe4ygu',
                expiredAccessToken: 4961762331,
                expiredRefreshToken: 6427812919,
                isActive: false,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'CLIENT_CREDENTIALS',
                name: '11vhpg239yhwfp03h0cqdbcp1d3yl5mw6doynmem8do2dpy0kda1nf2clvsj17kkg6t7xtrkqrajaae86oeflvp0xn1z9zy9e6v8fod6f2ej4du82tkntrhfc44wbdtxhf37n7gjjymy78661jo5d8uw7pryb2qunpdqu3y2i2bhc7uwl17idxoxhalese38d7ls32polui411w87b2bn07x2e6j864dkghnv1563fawnyv29dlnaos5ihi6m5r',
                secret: 'weqk18ale2vmhpw94ii4xhd6pyebirpad4pkg0vapl78wos77s3orbido4q6oa4pob6s7zyk1v6hyoqj39alh9uim2',
                authUrl: 'xv5vhvkj23auef8hmsim1xk136jm7kfl9hxplrnk2xdeept4ta8u2kqtzu96ij0t47dygkzegd4068l5rm435oxwon4dvsaydnz7g9g6jmd05ogabk3f01p2ceqxh31yfu9gvr7jxxsqwzdvxqmexkipefwngfgbdwedcsrzpb43t336hmwa6wj2301vx04wu0tavbs60um9dq0wwfkz8wa1amehtkl0ib6xw0e0o5miyhbxjm9k8g914nscssw1cfqshtyy9zet9845zbohrjq85y9jpsv7rq9g5ita5nk9whzpwhax8fvyo7jy1v5bvvfl2hxojflyx8pr6vw1sz46knvdwhmq1kdvehbhkloj5j3acpmdy6ki5mbbjj1ehlxq50t2sdlkmie5l1p7qju0m9qgxznvsbt8m2l5ghvn4pn8z22g5w4rtq732o6gx51sjh5u2hg6rlqmz5tg9o1mkuhr6066veani3stq5oo17ds9mbrgbjvv659tqqq8hhm7ocyarfxn7gn1gqsw0ic2z7ko5omaa4mg6lq9hb9sqoinkwzze3d28zccql6hboow8ir5y81vgsezn8qy2ba0jg0g1p912t86nnrojp78bdxkiw3enmjrg7q69hl9jy7dp1tz3y3z50l1jwyv4bg1nb7yr3o971lsz2edpohjv66h57zdbpawmyus99kwak6jv942z8a7j71yu6sbxaq40rc1xaslvjouow32ojok1gm3cjpwa885ij4tsg9gyxzblzd58tgr47fzzr3xsri6kvzmvpdeiihlxur37bhlfsvhrq1mf9azpxi7pk7pqsksi9kai8duyfktiasc9ndgt04z43rdyzphubq332fc0007u6emnspsunu9qiqpc6ps602ujnevnt6gg4lnn2ctgift5ou4aydwv0h94eufemj4vxiremk6o4tl3p9d7y54tjkv14vcfc9nk74yvzjkgxp6kgcs1nrd81y9tgk4ur3fjmq0yn189epmg10sodvg2no6uznrlvtbt9fke9msm6kufd56rcy4tcbgnikzs3oocm9degqhqsy81z4jr6lqmo9yrpwrfgan9ntc119oq6zcx4mqti9fbcayc5on6gf84owfw598o51bfzhsamw8nz98w3qpt5dsjboewm3cn2jkwyzflxzwf5w7m5kndr03vhm0quokr17tqvqc5ye6xin62evczlc0eo6sozat16vyigldlrlmda96717w3taxkbd8rehuvze7xf8sn51uaki0vlbjsrq7vjwvzua8a563fcl9hdah6elqoizwqhoapx3pcsui0fzrsx97hu4rtuyo8xchjwghbzkw6ydnzfpd1ti3xe7k6d0gb75e32wb0e420c4chnthzo12vbf5lwnz17huekunv6sx11lbrl4x7vr27k6xpwwiclq6qo6jd4ac76zc0cwcnxttenlszjsmscdbizn70fkwwc8h4iihmuxvgl1i2wdym5gg5usqj50j7dj7u8jfmys5ahgkx6irzpwundl5hnx1fc9du1jqzomtkl4v3ypx1lcli5th8wfg9x175s5ljwbfekeqy8av9frjav7gmntnrojweosp2dnt6wbimtuaxqwr476pzwg5l5bjn3algyuptbave07pctet808seo76kx5xzoa4fchryfqodko972ti5nw3dms13d77301qz4j0pv6wre92lo986eu08ev93jihqbuum2lqwht6vlz70yjtq1x36ulfmhctwaulrkyeo3kf4tdzydarpi0iiwzh7dkwpitvufc14i1mkuccuwvehlyxjszc7pntal5hea4bgbs0pmo6ktd7a93h8iqebwzgt3gn9gqn7wiorjgxoah4atd4a18fzzkitr3a7vdo8ruilz6nr62buxkwue14sb0veg8vkt83ckum7ua38x84brj0c8rb2hw1hy69rjrd7tevuqzdu8juf6slryrqn6jkl9mzwspdxhbgu45m0nfn4u182pcqqp807wcujkrt',
                redirect: 'pnw6se9xjjiwufu8in3bxrh67jar92qnuku75pthmttlrzpe1veb8c3kd9u88zs5nlkcag3xoxm81qvfw8kfjrig6c5neteddmvmcbod8xw5fw4wcsoacam5xqo889ftjmfxqpnx3q7zf1p5k4vlctaz23mtbe73con7wav2lw1jqc8m7m0y5q4fgvoox73cp585va334es8dkqpmd4oe576tomwo05qy6e89syfqy0sqsqvvaj4rssjvct4i7i8deuzg4vlbhrvtceahmnjqo82nv4zukumlggecxso944zz5g54ax8ozcnzxxcp8a9hz367y4b5tobh76wx64xnya3v4nc00z6qpo4vkmy6vt5qcpt87v9wuwj9w5ienmscl62lpcv4pk8rulspuze9vtz5pbv63my8828twl1pmmw64zfa8iy7ss939eqtabf41vhp70wstfthxa2k0kqdwteu0kbzqpo4en8dez6n3u9kxd40e4dhj66bz4f0thtla3inusjhy5a7ksvvausyy5ra81q8j1q6veihtuzeol115bv8idunx76cu038z8pgvz8t5ejz2d1ntc7uw4kabv373odtnunsd7920oniqltiaezw8jzpn14d0pekx7sinqrmc0rbunuvqc1td2mq94zcqgtg6xx9rjnj587ecurz7ganr0yqzj2pwjyylcgs71t025to06jpnsuatzh3wox7yim6uquju407b32aabqe4b25n8guyogf2bfbpdtfsi2bwp50camss7zvqgu4457wunlh3ssej5xjvvzjkenfv79oyylx4du8x6diynd7xmspdo0br09578zovez0fydn99uc7vj7lereyfd11gjed6lwyrbithv9wzvd37ykvnlsdjw1o2jsrmrkivkz57xesdblkun3qn85kvq0zhi3s3527dxuiw74ku4zbz5r6gtp7c1engfdsbzyydpmh6yb6qnft0rb9k9rao3e39nkxw0mgioaywdqsvrlo3ef3rifhe77hmml9jsmf0fyoatvlm4i4lzutq0fwfej95utsqclviquw5iyg1ics6e2pqrdf10u9oy6oi1wnlobwxai1rhi4fjjxkncitn92s3ddor8j606yv3hpb7f2wj1aqlteqfjrwso7odmyqmdrcsqvoqx0orfzklfr6ixwz4prlouo27f7zjampxiroetou6aosxykifknwhf5fdsl3zrkd9ftogxecgcjqi8oc451t2cpgyt1sy4ypoa42b9e34ycyollvq2lbtrc4buyp8lhvylqav0l53orft5zkjws98a8g0lq92g5x73dgfb1chvedhznlf2qp76i2ic1jm155w4ags0hsa547no7pcgmsc1a7nzf4peivlirz2yxq4dbpqx1o2vwxm0fv67grma7km3ix92qjdowb7g2m8en12w86rynjj8ffnyaeg1ify4pnym77z5i8i1ubga8trhp0xdpkgct2998ui53cgpkm0csf96lstvwr5gdk4pg624c3jh54lmc2f0n8p4kt1yzfahj1ih03gqrut0bxdei1bywro4jwqycw3acvercdtrq6fzwxerndvik03zgddkpslxfm40e2ra8ih1yzltf1fbumph5zk4f9m7r1dsuthhtayf64932o211yr0fesafj251s8vtcrozzi1mipm8v2nalry7xg319lumy2dkr6ltn7z338akhv2dz7cr2g9msx5xufjd47kli1r9rtl1epnvwdniasguxedgzssj34p5vt8t0vr68pkcu2rxr152sctt598hbnnrupuqsgwwiep2die7fdk0ua9h8k0qwy4w7iaubkzag2taev2z65nye3eyocj189a29wt03hzb9sl902qxpl1rvr5pt3hj22pbyjq7106lu66y6dtym9w314othqclsvotdynyt8esrizl4ooekm30qusmgcgt85t1gr5us57ysqlhuynmsfxc4y7rm04l7qa6mdzq5r8wipsori9xw16pq7kuca',
                expiredAccessToken: 9179548788,
                expiredRefreshToken: 2777082810,
                isActive: true,
                isMaster: true,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'PASSWORD',
                name: '3hy2lvw4cdiz6ec7o2infyhntsdh76j3lxxrhaervk0s7grpc51hbj7pjf34vjy0s61kjc8bd1oliziguz885bhgbzsr3t7grtcj71mub6bfq44ljazc5s6trdyxhzz8xikt6s2phmkg12wvfob6bv7xuw0j4hnbwk8hs8u0cqyrczatbz3r0cwal9g1wooklq7nfyexx76mgvnas42nzji111oun3gqg9yvznrfoa1c0udnwvjw8nxn3k27cmo',
                secret: 'ceqscw31jtccxb7zsuq1nzruxv5d966m465b472kqefe436vhif1zvz0sm0afjdgpx9mhlqnti4l2e4z4odimtnmt9',
                authUrl: '3z0n0p7zedebwbnskgxh191i08cp6bnbwa679l7kavik87yvqki4jczem22f9vy1t4t6a4a4zd9ez7m62sybklxs2xfvaix9xe15rivmczf6md6aopf8qeyoqxw3lkxqes75u90620onjxuinc3dt0me0z5cwerq2v7ql4tyksjem8dx489e6iquw4sqhbr9b5h2c83zif8h83cnoyvr1au6t28i747p5sqmw90rwhxfabqyyqby0603qadelgbysphjje8nvf79h30vr8o7ck2sim1fzgcc68pyil3e2qpjaiqxmwjg5lhdfmoe11voawm85yu6c9wld9knx10mtiuvbgjozlr72jokeukoz1mkyqnchtgqzi5ugy2y726j3e95tvz9x3x6jos264m6k0ldt3s7cgs8bi4dag18f90usyrk4z0cyim5cejconmd8p9tij3parn4wvwxrpvwqie2jyzd6a5b9l0ur70w9jiq1gdf61pep2zgmb61qr41amopqfdyn95cbre0k7n35xwy9gwkfrkd85x2e3jjcgchcsdycxx4sbl58bbvorp66dhwxg5aiw7xygexulh2g06spe4csbdth03j1l59e1vx9pt7k8307m7m94z369msg0nptua9aqqb5l6xdiyvrrn72z0q7n0va7wmzl2kdo5i2y5ze2q2go10vxe3o9kjwzjvgg77j6rya0cr2w8qw3cp1epgs2vzpzjkk3wkiphxusf0zidn04isqmzzo5texrzhx8u91uh2ecf4b9cvpo8oav4ksnstqdxy5iaa5o8ueoltc7tx5cpf12sszo7bebpk0cfb16pzie41r7pnap3n4kl66fne436dse4swn4osbh3ynq6dnjabwofakm6cj4a45yrztu450ud3lc50tq425p5ws9rmakszh0yd907ttgzm8edlmzl45hu4pmw1zizbcq5o1w4uqqc9bpq6zor1xwoz9megv4ez79b3f4xqosh189ave3mbq6okn6rmip6jhnytg3lf23gvlb0awmihemm3syc7p5qeun7yy44p0bunk91x03tw4smkwuo8dodijfu02gc473uk8si6ax51ew5rimdxzrzhzwd4dw9yy4e33sn6d6bpus1rc2amaw6tsc7ihbabg20dxwlwzxjoxiymdpzyfpsabchr3rsluhspb7n1qwck2m0pxx3k1mk54i04oadz8gpo7y2hcbhc7omwgupqc34ey6njc8ch1a4s6y5b3zncrurpusffzvk45ccu98tvi2jmrgorf1ncwzu0lszueitpiydvurmkr8pmq052wqesctt4lcmljokzpfvac9jr1e08vyyn88qgubyd5ib6j2bx90uvicxbc9dz1neoqsmhezxu42nmoky4gy2c2h68u4x6jext364sdvmg758wea1pygzlusgkc3sk2ccu5fgn9lumtwi9waju77b7m45x80say91ysvvdhfx57d9bqlr7slatz3kqw2qqjd95r57o8phfcl4bzwjr7gevghc1ztdz5nlsih2wdkorf6rgaqxm0jtvqtwx920skviwqiiqkyn013afvptoyneuymfw76tb8viybqd79njcnz07z75yv6eivhc5tj46rebv8dqmvort6903ziexqfd307e5omuiids5bn2wghvirur44some23by4v1a7t2bpw0q1euli7h9jzzml9l67piizm0cj768ck9ctd700rf4fflhta1aw1p4431il61zii88dnfpmuw1gmrrokehjrbatqgzgfs0zexzk2l05ruehucp2ch8rwsvom85voho9tn79u0z3iiul6xzz3sv8j1i3v9uoj1u6zk23v9kc78ckg2sx1x4fj00l8y0dwhaeed7tbpe3bud23nik9qzl23f03i44iz3ca5jt9be6llt8gdhku3cqx4mqtue49ca1tw4y9kym5b94umkmrvr3qqewbd84x02nl0wxbrbjhm1jz4f1gxjwjp5h00wadiyhzte16q2pcmzgt',
                redirect: '01npte25n8c4nqwgx0s4h5oaehc7xzmva7k51yk8rneyxnhxu2g7lkpdor1a21a2sjj3z73iy4h69xpaxc8lw3acl594zcotravp8vlpjpurdudlmeu2rronwg4wdsovfbpol0gdx6bczlmi7km8075fnhrhq4o3vjmc1j3cq7j0zcgskqszmpxltyn5ghwnege1m5b3akmas5xddm00c2i32v63gcna5rswq64wvgi3azgfst8dp6qvxp1ytc2nvgota95r2t6varcurvlfu6itsdfipzh4bj5wj682hwdh9dz19fsu3uho4a38f1rkziulvkg5zzcy1eq5mdvt4f4zi9f6pe57u00dwrtqlguf747zl686nsm5kbg7ug48sz6h1uweeb3yunblzmujtl5pzg30l3gu4nt3xz3mlyr5okvwr1ueqrdueip72s77woo4yq16smwo64zajfajzlrzcir84vv2clu4mzxqhdjcxm11kzrtf9n2fvyulf83t1v7cqkv5da9thjqu229jpzpw0clzm3awyh4zdlhv9192p8yzf3nhmnlfgetua5uc4cif049uj246d4zkq4o6wvuk8sqx87qbn959xwgg62t986r5l320ojfhcaq7vdyb0r3wtozpg57uly72joc8vxser9vlwbobkwcnv20snw4vmcblvzql2t3q1eqir8isrjz54pk29nfglj30qp70jm6ya7m0h1bbsd8u0hqvmhhv7fvgkkj11vjlfht4uhv4pxb1tp3lc1zplx82dc6wlig31r3v12mhsjlfunxwf6kwk7orb3k8ftcfc2gmvlf1rix7ekc0gpz8pckv5qyuzv8u1bvc0i247dthx7ssay6clk01h9ch87rejwpajuqrfloigujv0vhgxnw7zf11la43t3mum97n7lyxuc339dlr26pa3sf6cbitd86xzv9paj4kjv5n5v7wmpkik94kvdqpjyykzosmoms42tp6jopihziyx4ipz4dy8s1w62bsrtn64k4mtavp2m06ipyo355elnkqegapzzdf4qoy5cgioob1jk0go4i9u4stdz47eizy79fv7uu6zledb69u3vrvx69enkbhd0rqczbs1nn74f78ds5kczyjqvhz4boxbearntckw318cuf8h7anucy5zsojncu60tyr56f8zsq9tjvtev1xsixszoqbmpn4ick3wwavpjszr18z5r6oni55yil04rwvwviq4d4ynck9ytv3aj1grh7pyzc0jwup2qb4h3jl6unqk063nylsj7w0ekuqrl1k9m2hjmsqcnvrblwbojnu5h2lb1exnhi9pa0r2g5wxk47rubdnhr7vki89xod25kp8piza133ido9kpu2o5dlcyd27a6g2nnonxxk2llpio2mdyitrmfm3j0p8gb8u7xrkqsyyvl4mn1msig5l4mhssyjwd2himpj4z3wdocxf5znw1foohpgsrclwd9r6v0tvom45l38u5avs5g44o4symjm2lwsyib338zzv0ha37eg7qbewn7w27t60kfazsq1hqk0ygit00fyai9n2c56utsytj29jr1isywjdfr5d3q4zq49svxlo2lmgcdse4xiwfw1qn4a1jcp9shlhq0ysfwils8mi1nz47gxcwx5c5ns8qpo0ipg5jbtxbbtwyb4h5v6p9vbrt7r17z8mr6z8p3hocm1kwr58n4iwohf3y44y90e7p0jivoiybfyg51aa2h4eego45y7viqexpfwpeqr8v1kyj9aqpwlidtbkoojd7sc278nh3bowjuafodk1cxi4ku9cyxcb7rtcls7rzcn8jhnj2nt2uo1nb6qwkdlahvzvcv8pgvni5i6e698kvvf040low6rhdqdi2dxyhlkqbn9q3wkcr8fh2awaz5etulq47mfswpzouxxifmcspw0r8o9154nwtvzgpeh4dopou3cce99ao73cw2u69qxacmv9j0cynh9wt6qnmqvtodz1i0t66mck7hxdimgjlyzyhceuvwy',
                expiredAccessToken: 3547624084,
                expiredRefreshToken: 6871028276,
                isActive: false,
                isMaster: true,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'PASSWORD',
                name: 'ntrmuz15lpyxsh59gerhzpx2cjgyyia5sjcwd2qpuksqvb8hsioj6d32dvcdmx9f255m7niw4qv0a3jnigtvhbjvcq8zqty3so6moyhpijaq22vc7uic7ld1fnh4wuvf082z4w4387js4i8vzzeaqcr3m3irudd25bceidem2f72pf8hr930lr7l8uuq9dqepngs9sv6zbwdtknbg2hkhbdoczi2n3fvsbgmsn8c1uez8yp3y2ry83qr43kbzpc',
                secret: 'pvotgtxskvs7ihodefgcbr2p3qfiumnciuavck7p1h9dsu40pfhuwfw7hmd0qz7fvvxow3f5jcy4ezx83d2j0avi1b',
                authUrl: 'ja0to1guc58ktjj3srttwokagfm031k3s8b0me0eekq44qey3zr716j05nsdklwrcq5caghwxd1a0vpzlttczwyigbi22zqsphr6xtccqwhkejzjv9cqusk221ctnmnmnm7um31wjfyxycjv2b8xa4lvsq6xmvcvtbq6an9fveziacjniprugomvimffqrzaqq1va3uduehndjaybffafzxicrt1df72iv22vfxhe5kab19b427u5igx8tcwqgwb7p1mxzv4uivz1c6owdyejl2gg5ajs1fdl5iqt1kq0ahbilcsaad3lbcd3ksrvqdnaweik82h1z6ph7gbudavkgtldh6ryhe6lcbm4k5pa1sphsqwp802k6o5usoly5oei8rqqvppdpsodn2bux029p7ivgsfgw826iz2uj5u31h208fms27hx71e1wyq3thk3rd8wqv7eso1m5sd8tm09i0hbdb2aosgpb5owbsca6yadtoppx0fmvh22m0c1un7pf5blq3hnk9qk3kt7jbqrofosj9uq1yc66pli6zx0k49fnaq1vps6omqeuh5prpkrjmlcor167ujccb456qbajs1j16ocujt2q8l8pegcxowbxywh6nnz2rlk9rm443a1mkrqvk05yp7kz35lxwjg08gzuox7fynfpvy78vpv6qcibu43wlntxypm8l9dvutjv5lh6003uqigakd0xi1j0eamyzru8pg8zr9mkg9imtge00p7c6d3c8twe0nr2lfr86wnshmpim92dgfrdk7irvrysed2lq5kv0a9z1oob9dvugmeuw462gl7bcwuzgo3xn1tk7bv0srssuh5ytq26brbi42i34jbjadugg8o3gmebghos0ugz9vl2qfhinq3cs3vh4ecgswg21kn8cjsyxcb5izlat1u54o2u2kht934ucbw2y1o2qrzeojchlc9ba6gbw59svbrl6qr5ygryjz05flcysj1lo8pio519q8a5ridq24ru8oik5z0lfgp7ppbhob8ewb7eubmwdyxlyc22szlbd1epyroxn3osp9e40fqgixgr4zwj8vsif3mva02gqyh9bq8v2j01m61czzniabjsj6hewnh8mxsmd9lae9bmia4ouu7o3pz1vuskkdfcm560t0q51v1bi482uiuruwf6ral0opt7dlw2plhn6qycewl8jxukvlylyy3ilfwjqqhxjas40kmehb2zpv8wctnbcrv11btmafsu653hihr4jruhcbb4ai6udxrdm2nhda7gg0ktiupwsk4x5zbv5czase6gp5l67wdo42vulybjkigpj05wyj3dme1u4585204yzgtthtuxoxeai6l1or8bec26ebbm9stq2jf1mu5v9nkl04962likfyqg0rrwe6oueb2ivmd7q2s250aozoxptidbmajbizy6lqeoh9ryt58n13iy67gqdz9ewrnzt46s008e6osg77tp6ijwrma9o4pmgeebxizkj6sl8nggjwqf8oouek9sdec2d2vczh2z4rqh4udimww6ymz12kg8s9z06di4k1cpo770gtz1i4aceo6164jwz9d23jxlaa0z3vgafpc90lpd2bduhf6654bystt587xf4q9xj85ju1vdk2vpg2pl8fblvni1jq4384bdz18iwxt0l4doj8cmt72wj28erofh57kd17goojm2mstx0krh3bgdrv4ien8tuo9laixtvhp044v4viacau5pt8tx3l4mciwr1kcy1fcgjuxkclxcjol1suyooa1w0okv20ed6tppwc2htek1f6j3vdllt2zh31vkc8y1x9xuegnhji1fyil9g3kn8jiukmn78uatevntqm5uuapa369h2j95dm04j4hew92sgm62szoq64rcgqq2oov28o3r51jxmvfrg4jlu0531bqhevmgz2vrsl0qfzf4t2aj62mam35ngna7f23cv70fyd8byhpbfeqxycjbt5x8k3vktbdnk0o1o8i6ef63z1fk3b8mpltdea9sf0',
                redirect: '5kdidcn5yr56rf2jogqeubnofxdyjw26mhlxko4prwiyg3l6j3vpsff5lylbvbi0sz7j1gi4hxq15vuirq0xhjxw73utiuiwc6i7mvp29mp5yomzc6hvswlvi02dm0o7mrjw65r4n0wfzm6bw90kuaw2wak3nw0eoqr1cpbmy8z9r9sp9e0zjukk2vut815jt88pscuuxkog1e3hwm1nftz6f6y7juccw559qb7h6fucg1phzyl7v7j9prshtmtopdko5yrni2uw86khmbmth8310l3eya2v2hsbruowmlsr3w7siq52ut0zjrnud4twi487wi6xkxo7s5ow8ugyzvsr0gt4vpxh977lt2x532u177aii0plmxfxsu32cz67j7bje3fczt7g2tdkozwxniyyevmy4tq0vdkqtr7l0mqqa43z3968zel39ctmlgnuobn4ecjlascer9920zvwtk4dyckcpqoo80bkssmsu91uznigz4s4qj4xba6nwt8iglgzoqqyuoyua66fu4dk4c39fdae70uvgt0e90rrsz2ep75y3rap4z9kiyu3pn63mj1dr21avmwm8zpzb802csggl4ls0s3clbdfsxuukqoloh6nn8ke1yvquc7n9xakv83ykao5vzddfbb15ltevwb8fca931y42nbelc831nyyhvtmp09vlicjll0fgkntlqbz50n5cddlh26rqko4kapq6nlxio68wrpb15axoqxaxso4e62vdcpqj5mfattdi4gnm87wqbfqq0y96v9xwihwbb4hub46veo7npigwlqoy59vpyym42dltykf6sevxo2se9h782lo9s204tuyuyvvcbz3y1qy8e0xtzicdldgr8l5z1z7td13qg5x9i87uxhubnjrnhdrpdw84jp1elyir8kogpigw6drfsmmbczvy7oyq9iv2prnpfb9yw53xw1erbx6cijcta9cb8hue52wtkq4b7g2rry7gt0u5obj5wi7kjhssuthtdhi6cp8en9e7ek9tzbh1fvj5nw23cd5k92jinjgq1gp5en7ueyxylutkmpd3if37asgsmeh3gyuxyglgo4a09c48wv55dbicxmghb919q7doqbykq368rqfyefbmdpbk52jeuar3lrfpiobf9oyt7dcgy9u3wtwbgsz8t0n7pws7a6nfpvkztg9yqcgck80j4aahszp67qse5jo39e5uhc7dvys7a48zu1u5xttdd6eu746fnio9jdfdyi3sv6fmwmoh5tmcqsaejki2tk4le0lo97w5q3u1sjmqugu2zpmyp9lhofa9vtyvbht79fr39qg3rjh9be2heya8yxx8xfzq4wt336jf4k4k9brrr9es4byc8a0e1wo2mn9dq9daohkqd9h5fdtgglvp0utos7ebi0vhkrrpfzvjjxmzkgxa1vsfo1yto5n9a2c3kx4lpqnotyg2oy8e1rrp5nwy6h9bkhqtdjf0h3p1xak8fxb6piqgsxcn63vv47ms5878v041cj33vh9mm8shz0yv5ye68kckqufw61snqsdwxta4po0vx7ttq9exzfj8z1tt1rvcf8ticdddvuz36rmxn74r2vdm9bo4tkr245dnbyju3o6lw83r5v1l13n05guvmtit9hh75rzd86o65ad5nrf3ijzwfhsf1t93zpksyq50vquowv2d7zxhbleb0urepsuxcd3rzy0x5cp7ts1mmmg52ssfmr966s9ftvz812pw7wmpd7rtpf8cnuqdj4omlylr8wrf595676g5eaz1v8fruqertdqp1a0l44im15e39rmy89wd1m807enzt4w2em3w0o0y66gcn1ayldw7mao81rq8imrllelnr985ex441ka6v4ygvlexuza7lkwb0lowx7qq0j6visi8jqwxo4bi751texrmdyhekrautg6tw0ojcqctc2w6iiktjs5t21svkxcxs9636fypea601zrrmqgwyj2k2ygl753qe8ijhnzbfh0rtrumvo1xd9vl8uwhnhg',
                expiredAccessToken: 69813335353,
                expiredRefreshToken: 9546386409,
                isActive: false,
                isMaster: false,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'PASSWORD',
                name: 'gkph8nrpv2880h56bw0x7r6m2ecvcdkyy3h1oqwqza6x8m3sp14xajsb6uyqwxr19x2aqnpekek0p4ef8yj0h5alodmk20i4so8dehdymuczyk28qjzmkjecx1jyi54ravidyqtp3sfuumrybqpet90gllswwl5wswni86hoyn3fw1tt4u88tq008anwxbcxuhc8fnbhpzys13w8bjpnnu1n8gt5rm59h8jzksn2vitsrm1pd401ectdvrbubw6',
                secret: '9ougijks1gvo9tv68gfgaa3rgczgcpx54olw2adx2mos7f3whoa1opxoh0b48x87ubrwz2n4eukurv1wyhwl20lw1u',
                authUrl: 'eie64f6y86w3ag2130cl3f8re5sr64g8eqt9sgecae3end7b7a50dml198tfrrk0l61zz50g4tz7s8x9hmxzvtohdvxyevn57s5kdeytc0hycn8vkh82u534x86d5hkud8kspdgdg6gvmibmb3fty9qk09j1v89ul1clnsle3p38j0ry33de2t7fsne1rsllijmohpe6712ko4j20gcl5kbzwypc1su270u67rjb3hsalqo17mgy6229bn1oswpn8kfn0q0gpe9gbjlaayn6qllmrfvk24ezfxixtvdui0cs1mux90s04rt640i93v8okxsbcsrbn4he6mokfl8msmye3510kgvrsk33u6yk5u969a8o1hibjt80mb0yihzgjiss09uwtbbuz57xh0ex06mjlppl0hhcrvc4d5miqezmgdrt04iw9l9802hvinzbjppmu9r2of6t0n27l3pzoyr7vys88zozq2nkn74p9sdka8ceemxdmou073tddl2oox7ro95dirxijupo06izbdhskrwcqrl2nzm0vknbvy8pwgfk44skjs20okhg9wn3ihp8bxavt3tp0gm9sqe7sg2pznl4yo10gwm6thxod1f8cs9z8uh4wh0a4ecb14jsu28c3jsnug9n1j8fsgft99be08752uzvx5a6r1hf4ue8ije99zl6wtlk5d8umcc81dl9rerbpn7rkxrbgl8vqursqqbee63mwdprovmu0g0wsua01kkaohihsfjmmealdy0v1bwxomy8j219fva9h89vm9g9uszd5r9rsl7cvb9tyxm1rrt977hgxudoavzcluh7iamrfg0yn1swpkfqr3o697bpjd973fg50wh3s2zx24ucxgb7acq53fkmqx6ms8j1j1604gn8lzkvccm4at6hzl3skhih76t2vn11ivulur5t3dk1t1yca22jcer9xh72rvav11ne0poh6bwz2hby29mp175avramvfcnk8594zrakv3x2gwfck318jmztjrc6wi4gjrgssxx4l6w0oynl2r5l8ir9rhhca3wws1wg4gqq8yhfbxtk8wkauf6p91wulc898d5rli0z79snt7l36vte8hxvbq3j0fp3nzab9lba5h8pndukvkz2fsdc878dty084omi1ekv96b7r4l5akg2xncwyx4l1lkri3e00r2w7ebiog5pccrazu4yah9jh3nf2jxzhtj10hmbb7d1gkb51v89tpvlxt2g3u3bz1jwejmplf5scajphhmeny4nvsg2m4e4zcb9fnptf44yr3ega0dhztwlq8v9v45xscq19re5hf6x2ydrxzx6vy3ck7xki8yw76q4y41lti65rbj0m64rs0m2lcbvqn0vaz3dxs8w9ju39gsurm1wdqeqcuu376wfincls1ah0jij36mc71zabipkqjlhc39jbklhow3g9105odzsqw1qgh6z6euoi81jdzgy14ddypvw09e18d4210g7xc6yleo4wqh9pfjjc0shyb8v5yq7u0a1i7yee1vma5rmuhdcglhogat89c6w3tkq56ipz8cv8cwsciizhhwmubvbpp5pqgpsxre97p3jfks07jueteoa7w639hebnrkppr8rfrcyvvdw6rlmfoilytqvrkzsed9jtt2n94rref3jc4vh7hqbl8woo6luqgjijqttmt3m153qo67gflnedl1utzld6777rkrxkgv2oh397rl3tal4ilgrdrzr7pktomtzqkv5d4ldg9o597c3wdogubtdrfswi58r24vk4wyvd2jc0etrktb6w1nitnwb2edce3rs01x6eueyww0fz9vdbetodr16j65rne5h8mgjqqatx9xfuzaznz611zy4upbxbfzkqm7zt1izxyry3is7bunimktb97iwlifih00a3qk3sblj7uuijmlav6b21gh2776v2fdlsw2jrcdualgsvrkfpnsneinctvqrsf6fu1y572y9t49ige081h3xqunrzqy4dcepen59px72x1f1mil',
                redirect: 'sgi5jm0y84jbg41wh3xijcwwsbl1wx9jb9lg0i14re2kpgeuj1wf5sutigtr8v78wmwcriy3jjitejim29oghwe27jizccil6lgpny9l22lllvpfwzdy2ljyztotb30d8kveo1s47lt7yesfx5gtx44lew45ur0tfv14bnxx2tltrcr5h5oi00kayitmnuxn38ltlvidns8kty20d8g6y3y2k0amafq0cnbb1sritbzgo2v1jeiq6b5wsm1g53chb1pejzsc6u4uoh6xilcsxf28r43bluknkychn8ffnge6v7ircbcs3f6ckv5kk1y23tqucwr1i9e4umupxjm5z56o1q7aoqw04pwlzqb6wpjbocjo001cje7qh0p1zz35lsn0k710a6g4d4eg6bw0r354z6gofg4d5jb57zsjivkkqsx8qyha8v2eyy9wy0fc2p6md4hp743ndsnl4fj6n6lu8k1k5zqm0vuq48ok14zjipx1ardhsejclnudm19r4qzi7a4kekdwjz1b5mp0x3pkhw2g1728mjp1alp3m36r8iz448xi6pxw45p30kmwwae2cgbzcw0zi2yshqmiwdembhh83hrot2vcwu7j6u0mvkyabhw6rx7vdpzz1gclaw23a37rexuhzth0mnb2rfeg49cxb7x9docz7p50yhgcv28genaizqj6svvulck8yvya2bxp9q2badrbsraevvjlbgn4yq9q80k6pn5knar9yqz3nurt174sdoaeqq5zxdvgwmnd10o8umi6uzj3kja11h7w0ops72kcleihd4ql8r5kx2ei0wjvoikka5j5ms87qdrh149rij60leyqiwe1rgbyu3oxwk1mv0wboipxzsr06yv17xvl8ftxynmfpzm2246et8zknvpbbuxm72cva6sk6m30rrt05ekcwzh8poro46unmwv187cg60jg7jpiaeg9b7aqpsuzb0jw17hubaxrr44rkjlqxte2j4w03fkll5jraq1xvujdyszw6jarxbpbycdqgce5vqwgjiof4dr57aj4vjocue8pz9l85mmza4mm7nzhuj321j86g7q3cv2yd5ygsmawq6znepur2x6or7dydq1lllssk7hiwqsg77nhju8317hkliuerzjc2yrb8xc0ha50bt6xe7jxegoyvg0ij8s30wzrsyoi4kbsgr326xsdb8i6vzjnoxun7fn8ah8aboonfdivt0albzv0396d7760h8t47vs2qarhei4i7ckdatrx6w7hv6szlk5kou0q2z70huhd5bnjfqhcl7lek26grdw3r5wk5do4j099cmkfusqcik30sroy16ncyqf6owhdrsdi4c5wb6vvla7u5p29splzmucusig6kuf8w9et9dziyt99hykzcfb2mqc29b70oxsvlhjwwyxilwkiauluku3wusvdxixhv3r34b0a1vlop54gj6mpu1jqkqrfxvq6mg627rt6a4shcyvlm3afcc8zdhonrt38pgfmmxor76pfeqbd06jc9lppufsy1bqv1g074pm2v5fu9in1es5bmuryka8ozw1l6wxif5deafv7jrqmn2sb3msa35jujmvuwa004c1r4dfi4p4w6hh9q5f0q8it25xlbwro9zrbu5l3g209j568375s0uope2rvbedbhv6nbeb3eq6ap3wzr67ceb859bk471wieapflncn5hfzmfps20x4rwx4kwwhok158ojtdh8q69mjdgn4g7nf4jzkoecbxadedj71lr65qdkwe92ussvucl3cotnf66da9xs8753fbksp7coun55irskyzkx5h4tdav682j836dubb2em8o687ultkw1p6p5xgjpn70fscxk0a4fj23fb63bboivpah0gsne3nr9fbz2n3jd3n3jrobdysn83p5mj1vpqfqo7gpz3wtdhk1m7vwxv3cflxnd2cdg1y8b8tuziiznsg380tc7epmrpctkgk4yz0x7k3bq0ih3p5o5jlal1pxhm67euobes07jlk9o5',
                expiredAccessToken: 3278451672,
                expiredRefreshToken: 46112980159,
                isActive: false,
                isMaster: true,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'AUTHORIZATION_CODE',
                name: 'wjxi10ezvnk66ve1bgiznnwtbgz7dwuc3gjz1tlkxg210ios3kzlo2xm7tt3847zdbh6676ycas2skdi5vyx30aox8blni97s5qrg11n91pxgiq6ivqgpi9d0s1in4ers9m9r9f2jylsunv6nucq6m3tpic6h0fhcgi0ats93xvbe3d5mqua3quvm3y819iuu5yw3k5twlmg25uwpwl8bm1vemu1jrymfjotqbe2e7z0k7qcqtmut712pzyi6kz',
                secret: '8sr4dgnv3fbyjd17hptz5ceu9uld91akm84rcy6snhhf1o3m3gz54dco978xdbxq0voty8sya0r8fb0l8hlgqjbsfz',
                authUrl: 'zyzn9rrw8rrgba4ndfy5wd6w1wzw2pw03xs4de8rnl4595jv1u6i2e8d7ty2g2d2om288b4jsbwayu69xinlc7fs94fj1g3ukl0ldzpzmjbr7vrrr5p4ts8k7bhlxnu8itxmeix7pt4uoz36mtnawbnz8f99rfli48o52obufrm1079tv9ks378cm163urd4sl6531kxrg9bw818f3m7e86lc54j3m304frhowo64l2d2nmi3amiyem5y6lvqbox8b430qh8lmq96sp0g55jmztobvin929tdqz2v8kmkmcsnrkliz9bp1r04t1kfnfnrp2wltbjeqv11b462ulk72yzejnui5fqcfnhqdwnk32nt2mcbm5mmwpb38254lgaemdyz816ysqai8vetin7gadbfnueco7dla2xahi0x0epgfq7ldffdsbfqpjr3dsqtrgmbmk0co5c7k77t86h6mmmyi0yu9dmid3fpxjtw2z2tf9urveenkt2hoqbkm5a48cuntiz3jmqt1ru76jt8ya3vhpvi000lkwmxdckftg94rg06lpretskbn5w6t4eqtz6c3t1yzo5mzoeubquxpwjmnoul1u2l4xmgxlzwe8i3kizigri54n71u8udd75acsihargva5lhbp0wt15iwwaog830n7ehys7edc6w8q1uyqlz0n0xeoc9zpiidubdslb266izobivr2wtler28dw4sh7gtmvmbglu6zssvwa771c2ztulapwz7oj4011lf6d4o6b6ypdvfkv6cxbibsqc565fupgqqviv3rwe42y92tqhif9znwhrh1e9wu6ubyd1usdman5t9hq5g4bev13myuozv7tsckczjqnjcn8nw08vlne4uehd6830zego7otiq78jkxtd6f46wnj06w0s4m68lsadsr3vh00h63lnfp9wm6x0ctx8a29d6t8wqs8fcsddgnyd3957y93q0qtkn9v2h4jwhlvi3lpjrrlyvdzic7nch8kn5oizbj08e6fypgoe3fiweu3rcwuey1y0x6zqc7cp3jkppqxx1uek0i7x7e7cl1t5sotptru6y5jvyaalo61ss74ksh11p3620mpotkcpw98snfmmqjznfoumcol75ue4urg9anvh4sltfsjpmeesu6ihdpopv5x61jgtf3gu0uwknow2x64ikx9smlcv0jmykgmpbke13q8wmlb8mjrjjdudmbifqrpbsp4x7p94zclw3hnklozdjb6s30057z9obmi7weydezer7xa9dzyjd14iu9a5p6f7uvpkgr2j2o6aaollowcqo3j72phoz2lbek7tyvuuyqygwmlyp0bytw907x4s67qakrp5l8rfoxxvr6y7b0olioo640wucxpetjeoc09voihu1i4gk9nkyc25pu060o0pc4vr9iin5j3f9zgxymvnmnn2kprw1q9rouhjmmabymishqhoke8u7j7xyc3g0ym261baw3tf5t16fvtvc22m5kkkp2xhx95g00x1ips5ukadtzlowi65n741qdmrtxrvi06kmdw6mdb1f5hvy74wzucwm0dx6y31mzqmlwg9jztsodubd1q1k3o404syabgll8k1cj20w6u6dze65envzs8mjqxua74lzzqmamr62wyy02nhcbqi34xg4su06o06ts7stja28gz5q1cyqmy17k3h3jzfm5e93ccgjqe2zllt9dnvk9zxq51u3gdxnsakxy56pk3u3ev0a9q78wjbssvgj5welwqzx1p8969arwumkjdfovw3tmopl5uh37qj8fd4lhqzlzu3afkc8rmz8vtp9yjpbosix4qsudi9qddg28kuiuu3m9qbu5nnt636dtvfpytkzvawsq3o6hpj2hxobtwx334mpn24vio88zri1b0lh1c57bwb1zs76yihnb4obwyah3s5bilapjhl1wdjjuawkcbq4k3zlm6vrdj71793hllp309jhe1kvsrwm7ux050nuu6i4q87p3k8rmgoekwy1qrsnfnw3f2',
                redirect: 'ahfi37eqc2in8w8y5y77zdi2ya82hjactki03dvbp4xk4nrfe9stjses9wlwsjxr1srheax62zjdianjqpai8pzkexsh6bfe10ykwsb1rinwf6yu4j7fqjlar20f17d316nor1e318c8xxutb4sox1new9rmysy9onlir4s62ciwfx3ufw9v5as28hwf4fu374dq5uy7y5ixxwhwmi5vzj45cv9rfbznbi0hfaochsvq536ikzekc4l8b000jr3kqlzb0qu4mjiulkv7jh17ckqr1ry85xo9zy8dnz6ds7hg8okfw658hqnx78ommhzv1g5fynx3v7lspb3jugbs5tr7sgk3ie6s9oy8hu6yaviejm63yyiso2b1mxkr0vio1ax06lpyiu4zhvjwm8jvhaxsiyzwfjncx7v66ubgp723lvedr6vzyekbgoviaezdyns4vj4xddqa922v74urx1gpjpqx5j44z77r744dy7n6n9hbvlkte3saa5i5ybpueds8lwjnxcwrhyh6okelxheg4rjmwv9makzuxo2w1xwl4l8ezb2j8gm2rm6bbw35enccyn5y5yp0duknicubdc48hyjzf088gr59u9sl6oipuf2yzxoyvqop74eoisrcztlbk1abpihu8la8f5dhoea8eb87eouv5rqodjqs6mejdf4goh1uitl34xwu2d16rem9xg9r7ef3gd8cv664nu69uhinoajrg7x64usblhs8s1kc63da40im9mftraobr59gnaqh0jclt4gv1qytnt7oahaozqsmbs1fzrfbiunkvxgxm8z9adhjhw9txudu1zjz6sokdwykerdbz36gf3jschsvbrldu1vcs17lodbtub0b5qw08hxxiios67ox7lsyr4i1mfswiesqj7kys0aysh90byudjc33h5j3v9jvh4fl5d3towg6h8u8wri7jp6prqmn343vow8qklvjwkriavq31ubp4p6cblog21voaucxlcrglthumb79xwkn9elacqoe5v8splp2ceszcnzc25qxnm3h2yjfzn4kech7x4nv3cuqs9v5wevhkkqf6aygu063td890hoyk5h8rqb9wv6tzm1vzoong448abohia6h4ki4wguzfaza77loqup3eps13s8xd5x071f9rtngi9l6hpf7nq6kb14e7mj3wgvbmm6wefk4rll2s56jtqt5h6v9gu73apvb7bpvh85hhi1lqr4805pj10oz0d8lbq13hleb7ob50xdjhoongnfhq5mqzwk0xtxfjsb9x2gloiqzaakdwmank2ahiotc2r9gwoj0z6gx2t3esda7m9p1xk4gn5cz1kdy8c2ij7ft6o2jj4gxfnufpxujqqvljly2s557m57ckk29622a3hu38dulj1l6hidifh2lbv6ro75vqp6gruqkm92ynhixgeku0etirjzdo5bnr7xyzqjw691gw3g7ncz7fm5qyd17m8dswel0q88mcu9jpgiimut5s58kqahed8h1x3jwbz3vqcfa59gqgadyta6koergusmycf26kub1msm7kjeeq6e2h71b88o8ngpb6q712ml2rxr1up1joo21eeihk6hdqc0otb6dt95vqkh6svm59x3i1wxgswrgynwy1qmnp81dfj89ekfs8sd4gwfrr9f3jxg3el6vzfjwm5jn9x0z5vua55t6jxyi2ajhvn6k4u3fnhar0ac59xeo8j92a4l953tn90my0hijvew2z0pkr2r9qnc8valk9mjpk6p27xq96tr2sz80yczhbamxdip9pt8w02n9v5mwubktnrwyyyub6miimgca2sck6djcfmgn61ygaj1e9hffslh2fydsu02qcdl85gsecibcb6ah4b2vtc4fjn73nax89l4wwz96mdgh2n1ptwcxdcgn3qrhkyvb1mp5f7pgd3dfdr4qe7rmgnxhpmmb1rvp88l19wltz6oqed4lni40lnlrhijphxrampasczs4edt6grah3mb0h6vdnkdlswj7uc26',
                expiredAccessToken: -9,
                expiredRefreshToken: 4846376707,
                isActive: true,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'AUTHORIZATION_CODE',
                name: 'n7zsysh7v6wmxza8b8i4gg41z5198ky0wik6dftc1438tbyo0m6ir7cag9mvj21o6nl8j62njddzgg670eq0pnj059rrfsqgs2kgvo7pywov19kg4u9i7e26zc5nqowvhorece63bxq3xhewfa0vzjebcc2pwts1ab9jpm0bokvkon843r0zzfsrfuozocqiae2kngn6y2rw3p60x6lyqhofpjpvw7mqmcp0ero351n8o60o71756ik6rk5eytk',
                secret: 'k6fvfr1smqvzik3mgo6d6bf5oca42ll5pn7txq3e3pzc6xp67q08qzmt132pu66aenrmtnhs72m7brkvuwshzcmayv',
                authUrl: 'p4tykurvn0cpnu1pa3t6tw8m64yqx4e68w6nv5jph7euru4hgi6l12b2x20po39n40fe6o48g9nmrez8qiqobqb3tgqf8rq81j0ejom4hb8f0cyzahrelij4kqb1nzescm3zveh7xqn9ar01wg0wwqottsgbjryr0cd2kb516bp25t1dcj0mbv46jcsl7vwswiz3ye394ro37ww7izc4nbncl2l0si2xtveeh7ak0djsk80r22i88xb4ws38up8845ocw1zu8fj8ta1k89meyzeehf7m616iamq0tn0x12wua41yjpxxpxp8phuh33nufal50e1c54av7oolimd2ddgz8r87ko9wedu4nknop6y43pzoasecvqdgb6sa3j864waysqstixc25w8wyqql4hnazzbiofgij0wajudfudfggr4rf42xei10mf0nedejw5g6t8c80fixe8t5fykomir27eygekuvunhf2ktysl3dd3ti8i4gzktirz0005epf2hmxzth9j4vd4nyrfjjmfznzfc0wgciss14r84wseio38e1ctdma0ct17imvx5b1qp8ugq2b0gvwn678nwpkbdrsxxslggl4waai8c76lk1vdzbmzamumssiuhedj1gcsq8213bm56b83o2yoc2zwpwy6brxjna4cscqqhny38o9432f6o579psz0jusn97stum5lx7qfmcjqz113jza3knfvtd2e6a56idd53e1oih1b0t0a2blkavlqkrw8k4axll63445ss3soua0581xye5emdyhdxp2241jy7jgbsx4jw5tw1z5m4bamv59empv5ya9c58l6pqt63rask6ho8pnnyfm40ibw55r55ues65mchln7ahls1no870fs0zb0n1nlzf7l1e4wcn34h3ztjl6gxgfct8vk364v61lhytczg4hovf214kbzef4byhahtfyguukmdemt70qg8pcknvzpmbrts9s6o6jlh6osdwx6pav4cigzhtds7r847ovhg913fq3a46vye4bnl6ebghmvbjyt99slgll8je13aar1585abcrakc3b5vpnuver6y4wcxytjzciiqbb5yxxgjh95gyil77gn2qw19r2h287ogt4x0xu48s2e3uvx9xk217t6kqqnchodupy81925sf8ll44oq7gac2wnaalr5t7yrnqhh8h37bn8mdf0j6idasnmw7eq7g1k9vukaycc755qhweo3bglr5ynwxk9hfs6h9x3zsmddr5et0v847md23nyuf42vjsw5sr3uhrg593a5fcrxmtlvfhcnnf1drqaoi8ari8hp2ziimuxtzvbga8543xe4cvlrfwep375wtil7nfy4fq1c3ud3t2z1pszdmoehz72elp13d5s5qbjihno0l9354f01wvrpgn5d1r01dxc6nv5e1s23ynr7tufj64ocrvg9w90txgeggho6w3h41xj5uz9nzj6fw59xn90oxcbncu5fyfaaicc6qjctcb6hcc4t4qi8ignnwk7oqgz1fqx72akoshl28cyc1tu3e3bi89mcnzdrgwi53b68pvgt95f101uahv2u1liooi9ppi1uvl4ch10zo64265cz3achgg44ykgfjxuylrd5x0efkkb7va7is1glrkxcqldbjxxizh7okm2ojs7uiwdk664fw85e79r0y66sicevywyjoqskd0yv4jhee62paqajn5rnv3lf503pqqz45thzb1uc1hgqp7i4uhaicf4oxmfd0lvi6ouiqi52ykqws3rbtq74zc834qu29qhdmpkmjh7pcrxomu8ic24npa0e0xyclnqx52knjdrxlfg2mlbkt6ibhct4p8m66zd6detgr9rhb8qsz77mlstegbfbuxx0tb5xs95et0mpe218u3id9outv7k5uthi039tle9z5m5zmx16y1t3fs9t0aqr6mwtrb8b58gwz2qythzk2vuiel8x0jw608g45eri8nrjazvbub8z9gdngs6d9ojt4ik8rvk2w60fxkxt',
                redirect: '1kfxoitp1rw760f26wfzifekod7l469dp1nzkynmsmjwpop7j48jvuuo1deb9qodxhfh68qw5zoibn3pljkn312raaia8ivbqsj1dfvquf6dwdq28ppb7ksq0msrwi9rt8bz8d82i7ffftdhes18vhqkrgrwyhgd3o7osew7fptfv1a3m3lvgszldfqyddf87lysrlo7gcnb0q9l0vmnhqc0dz4rnjxjblua52hrznnhinsifds7r434zxk3kfvij4u6ikl4s1lfw628a21qffi11zume9tya5iyx2ws6axehj834ab84a13c4rq3ghqwjdxi1zxumrddox5qvvqmrcfwcvdbfpa91xjphguziv6ub5wnm2izi6u5d5anxnbbql39oezmb2vr9bs81n5hniwfzhh1c9l7nrpfgkysy7oddaud6tpr87pf1t4rv9e4cyo6epp5esmspadv570nnlsqty9raog6acm778unetfv6n1ogbjb1ozq1bgcn0w4opkq7pshaw66e9j6i6p25o5qbpu63wuk7v8v9a56ndd1khstwzvny95sp1dmjtzi9uc21epc1t46hm8zg40cr3fgdbospk9i9juhg2ye515o6mzkimhbvojkrkq6qwgh7ybyx31x40kg7ztk08faqk5qumylvqpccm9n8us4xpqxc7vo1bmccr8pa2nlsik17ykniskhtbk669r3yqua609ml1qu0z2ec6trnwewii0vdv22cp739yrjxt9n7su8bocveopvc11nnh1ctse3m1lorqedkmtztqs34kdrwvz5zebj9bdpnbvol9dkjqjmcmtqy15jaam0p2gm9mp1jjlh3op1mdl58bgt5djkbri3donz6iuhr06m1dy0e4cn5ixad8nljk2i90sfl5kfydkiwbogye3z4z3f4t19m3azn4e9zlgpbszrt49ae8xr38y6efkur4xjmstg3qioxv1qdnhol03a3q7lc1uipp6t7vf0u4732v1965ol02s4dt5ic15azwmtfryrln5nyiopyod23dtzfop4b5jda7u2ylv2smjjkipsh6ner0jrb01f4rd9ksj2x6sqo71yey4gkaxab4najirggidrtqgltsbsbk4ix460v5ucshr67pxs669fwd3fqvnkjlynvmchf1rx195927f53qauifihklvrcp704pirzari02ho2vmn55500iuikiduxy805fb39q1v9vq6rdd4l2sudpsx55l9ugxq5390gvpnx1xd614bmimawgah4i42fcqp3rycy58rurs67n9otroqlwcfw89p5yafg60qrb18kklc0u16haivf4wh7sos478mev0ijhf24bz0t66g2dmf1toqxzqvc8luogj5n57ro7d5yjsr58wogncdv7i6b5bzws7o0ym9i41ejw9zds64svrbeytv25no1rs2v38dn2500z0tz3lz9qgwo6l2hghzp67icvz4lqyzqxnl971jqugtqicfe07jxjlzlpwkrg4w67of78q7akalmspcnms0ztjd69exz6h22rnucb46l9u75zf5f5z85td8h3m65vadavvz7j04d43eqepwffeco5zakrmr6sp0lh14392jecz5jxtcls34ax51y0rjnn2j9qh57442328cbkdkhmg1kalyjzeiieason9enpjfj197mkpxnzhqi626eranzwwgwzk0zsstnohqlkqvp3mwc2lez1xlko2ctfa46ao1yyd9x93h6sahlcwgqn3xq544q43din6rse4nr7ghxlk7g9xfrre2ecd2xvi0zecw6ms6vire3k29cmw62qat5qyfeun7kru0en3rbaj6cveess1idvedvdp4ubqniqkphj9bq4759rj2vzbbd0g18yke79ys9tirfdtzl4krofbob3wx5a9r6wdu7wqi2swq9cba59d35usgm4cf1lw7z2lyjsgvpownvryo58jqstv65fz37fwj5vbxgupwfz3pj0sns40hl54gt8cktsgn85v',
                expiredAccessToken: 8696688590,
                expiredRefreshToken: -9,
                isActive: false,
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for ClientExpiredRefreshToken must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'CLIENT_CREDENTIALS',
                name: 'vezb8ya9hkfutkkg4bd6enrcoe3orurvt4ffus7q6jaun6xdf868218oovcimnvpczhygcyd0qv8ijibjr843kmbe5tf1jdylai4n7hebec0xrlv9beu5efuakb7w8dxy48bcasin4dtb62g0hwwhcd35xmysqjg74luwf94v7kxa1xwmdz8be8f13os0np0tm5gkhdcjfn95pytaqovqxg2yao647jda1dx54klrzqvyvpcgxb29y9660t1ed2',
                secret: '12uhqj3p715pepl8x8o0dcuvyi8a3wsr1korquhkb8amkk0hqsof09mr9ycopxrwq9vgyhkhzb8lsucp43hbsldy61',
                authUrl: 'vufw2r8dcxnz3p5of5zadlzn8e7g7kxjvsnzi7reuszzz7rujaf0vxg69n3zb2bgk4xozii6oeuqfejgkh0bqzeafmc9k9e0pky536xwvwtzudfzexmym1tdadzaub76l6o8enn798zmtsugs5nq9k4o6q7arzwga5i25n0ymue3g9wbjajdv490soc3pa0dao0r5jqybwtf6cqwk6fzlxjjjvmps3mzbfmpijh35t0vwn862m0zj25hcg0gldf0cyhhelhbfurm2l6xq6trz7665eyxjxnwdbwn733pz8jwsnqhi53ne0ebni9kfe2rsar43wl09chmqo52lxlfmrgbb2xk0juyuexxqbob88ik2bq6o5i9pzevzt1xth01foys9qjok2hkym52rc1jf3oshvpu3htabocp4x2vesgv5zissqc16zonekmktxrr8mj0xw0oigq6j9mbe6i5zxm59qaq2nxhfxblbro0poee9j9mes4yh6noh2cprj1h7dpgidczjs63as3eqtkthanzfveu17der8gjo7w7q6nppaom5usg9kpodh4toh6it7iuwxag95g7xjeu4y3qz1g9fyfwcqe6idn9w59j58229myah8kr3vv477gr1gyckr1u7qo6gy1knsw1yvgy48973cfi2mqcxfi4b73xu1haj3y7pkern0y0uixfy26enhbaflwcmizkj6y1g8zdpgdvrdbapm0cvluplqeqloxeq1x1dxpnly4dj8vdnt7ocnzelggeuaban29i3k1xxhh69wmejcx1ujs3s5fqktz2pserxbm17zwjrw8knixu3thiobhlv9jis7tp18io8n062nq9sya1w3wz949jef8p4c8fr62yes5rgib5bo9r9pbq1gya447updm883jx07neujnnncs8jdpfd1ci39o32o0vvbquld5fkfdh6qm2i0jk6sz3kdea95v7ulg2h6c2r668tkqt5jfxckpueo599if53k9tit8293ek3sukelltorc6pdaz9vpu8ki2pjneziarqugmfvysuhwov9xiph59fl4g2ofp1u1azixhj5rqhsspst3erqm2i3hmbb26wecd0otw3qzlodbngwxd1vstxyz7590xdeiyvlot6qttam3u7pkgbuobov5capyry3cbuke7cq7dqmmvgk6wiq8oo2saqc5bhwu33q3pecp60sayzz18eqos19q22y6630x9dbayftftybxd4rqhrzg64dgv4cpbhn8ma3d4hzf7mvlaxng6h4ygco1f4eptlxzzxajbzbqv50kr02ehfead02gc33ypj6tpvmow74297gwr3ffrlj5xpnh6s57zmww8q9hp0z3yhecseszre7ie8cxdvulb4ok8gb71irvtjz7xhvbdut2fydqeg3p66fpf3dqdhh15ziybfm83vs9mlvqjejzvh07ac5asrqpuyexz4gdq59ytfryudw43505ien85bp90o0uki4qfk1uuko83utqz928ic2psw9acnttn7rvg9ln0afrdutbnti4xdcu4gzevfxtnvop7g3iimxkjvrapkzknn3oxd648no7ae1fhppgctizmj317fc33n0nv4f5ialp7vkpvjh3mwik00xyehuvif4hwnd7iz69embt02kqahsna7bn4xm9mhlcw0qkuovwe8hahmvjdo2dimeskordp5zg8vcizpf7881opg3g0ukl7a1lxvn58y1go0zzm7irza3tjwgcgz3ynvtq7krlf11tljs3uvpj5qsnb0k3vdgt5cngjvkbvjwy56nxvoz9m4j97pz8ksnzvtj7iovea0o77e46eoqistd2opggczuufx7bzahmgo8gmw06wa22goefztvlsmd6o0f4fumdkw7xc566oc07jyoqjxiv110wdwzu7eqzlj9opmizzgbk2v6gm19nvq75nmo4jhfkcg1dmz5bqanffcq7wng7lwlz8s5vtn9kgp3z53vg0zorby2kjwe862v7uc1jrvd33fl9x',
                redirect: 'm7mjc4oqxo37w42dzu97kr0m3bced8pokvnx72zs1kjpxsvx9qc2wgf539rpouvgm7357thbmpuc5dudg636gd6ikuelm1unqkgh08cavu0elwtath5jc01ahbmi24ujr89undmpblvrwygyuyd5qloqj1r7rdx2vh6vi0a2oi8s4inck2zvt96z8henx7some08mgnfqd6xy6ga92u3tvfv4d2s9v0lut8f5wn674mp3cqrgsm4d48fkxz25uqy1o6ub4oc8f5n80peofxmw1erfnfd80lyl57cgvylxp17tyhly1f9lp22re37j6bnx5xwkajf7pcp3nzlpavixwnvupt3fhq5wnfef65at0zdlhvrbn4tsu72jpg2r4qmwon3ibjf3w7caenuw1d3p5vqh8x9w5zz91rj15ltl3eswlt48s7efvirrn1ksjakdy01xuh9hva1dau4woqh5n11tvb8e89u1qjl3mqqoj77hkqx55btb2arr847dl0ze0l69aaoj3u8hm4qb7l5s1zwfjbphqvur22pgw7y3lqxpf287zsy32ixgwtkcc09ou2snrrwgie3wsw3p7a34d1fbbhfoka3h7vtsiqse82kova8p1rlmw2kwasx0ahyp4zg0dp8gn68cf1kywcliw0g5xrcz3fsi00asq5br5sesh46g1mn2tc87y39p787da6w1z3s06e1xwuakxevjwwjkbm5ncj4bnt959rlsr7yitvqtmmw038x40m3sgweh0s0tcz3yclf78clwz3kux964kejcttfyd7jcl23cb8sn2bq5bu94ldyqiozl6dw7ih6fs3388vu01rq02zweuikfi3ffpewowz08xqvl6q5ykkq14icnnrpg2bx4ku64hcbnzu4v9h8oexs3xwefwk1glm1xrtmeo0bk9pass9g8xmy8lib7zp4fa5u7bhdj6adhglc7xuvloc7fcnmn45l546rq75gjf525w6rhe81y6zryb2x8svid0xwk7bebrbhk4q7gqksd2gi7oo3475wch76kg0myo8guqrjbmjwe8hldfjlc4mgh6hp4b1rtwirs50n87hp2hiual3tgjch98ozw64p6vm3ha3bfnkdjbgaoba0pwce53zmnxqarfc3kzhnnwh5vceqotgz1qonkdigdvlh39onfd00b9uucd6vbqyx7m852ji6asgo93xmwmf51am9vbwfgs0h28ioxv7ri9j51lhedx062brkh9vu2b7eae0altrju1qlrii23fb1yuhpvqdooq5jgudxtgfqcbqcxqr4r8h4tuqt64q3o64aemumotxunzkxeo9fvl1ilgdlnbsh3tlcgzq45ljzbbkjfftwsgc6p8rizybpbm0ofmwxvqgv0qcw64lrrvf62hwibx07c3iw3iqn2gqqxxg97gdqsgy4sa8frezs2yo30v7l55phfbedq8ca79p5walfehajpjv0d7rqu41wbfrbnkke3v5jxnmvg8gyy73ybki4vznlohiahug7j7srh3w1i1717qiu5mifz4fa70vongpu9rl836xjk3vwhl1n5jf30wv0ix1bqmwssi9dvx1mbnzw9vt1hcr1w2nqpkgzoujac4c21txorwetqb7mnc6nb7avlylzkwnofov3jrz9ustwsit9or3to8wu3hqm03hzy5k9seearer9uaejilndxmg31gi7do3aksy3ctawt6pq4c49onpcvo89kzjq6vlidyffoloypppitkxsy7q7kyr85jupuohzu2sjonqqxs3a1oaap8v4tp2f5sitgu2kvvhm97xmgxq8e4tq4or6p11v8hj5bjw4rxgf2gr63iw82tbx1xkg1fxd6osftkw0g2wk6c6mleaw8nmt41gq80rapa5oiqzrion955mr5y9ut4qtbmtn6ey4xo8d5olh0er1q6j7u3iue4ow2ui998b6iu683pqf0z1vyrj3ajhprf73cezxchmrcehiea0z69k9sxugsofapu3v5n2bkglzggvp',
                expiredAccessToken: 6831784867,
                expiredRefreshToken: 7204476303,
                isActive: 'true',
                isMaster: false,
                applicationIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ClientIsActive has to be a boolean value');
            });
    });
    
    test(`/REST:POST o-auth/client - Got 400 Conflict, ClientIsMaster has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/o-auth/client')
            .set('Accept', 'application/json')
            .send({
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'AUTHORIZATION_CODE',
                name: '3hbat38m1ryx46b94d563en5mhpd9zlcrgwjty5z0pzm5ma506km5yuhaelhdp662qr7wdegbq6inmr8jq7q24767hb1o44hp39ijhe527smgveso5b7xogeh7h2aglb33o718u0q82kpadfq16zr3oz489xvfwi51fcc62uzjx6ubiwt9cooi5x7ty1a2g5jhh0t71pu4y90k4tne4xph86ps3wso075uda0csbzawfwjfup9hckz883kiaeeg',
                secret: '07cqatq03sp5nlffyr2eogewcj8n9yzcpb0d8hg1eqiovvrkqxkcohnaqlm0whtghb0xq0315bc5bw5d21l48nc2ge',
                authUrl: '3fmwn9biu0fa4qw5ih6x8i5qhcyysxcquiryo11p7udfi5c4gfnm3z4jdcckdiiq2kgcultbo3s9pbygslnqut1fl3okpcwxzerso10h9sjq1hq40exfkfn1xaa84nuvo7qxmrsj0feu5pujclls2otrdkplbr0gudfs4fn3rzzh546n4y84j7wdbsfhkx48vztxabwvkr5ioj7571ezbfk40sz7on4cps5nz2mijnzk3qzz0bmn8gr15wyf1ishpkuuoed2t88dez0chnfw27c3kac0rba505gqd67cobxv9m0cvobv2kzhwpnueur44dttl192ivgdvlfhst8bx5yj3pmo4yhp8y0vi9dknf7e9uhhbhnzfcfccieo7jqbo8ult5cqbmxj0p241ypvt5w28q2ykm02feokyukth466jwti9wlfe4dpy84jhh5sxe291qpk5xct2w7bkfew3nrfphuvgoovld18x0u3orgjj5dbrdkg6420duty6z7nnvsy5mmlebytx9lgn4d2h199vh9i923dzhsrwmwgp4dg9n2s7aw6vmlja3qnkloljh9vuvqau5zlhj94f9zfrk2bw7gv4ncsik6rx496of01asxpb9a3yxqr32ygliw60cdk7t6g8bvwn3yo1qp8zjom9tuktbrp940rvvauncgbp0gpk6fk2w4pjoj6udcr3xhf80xbihhze0es7jket4ggd2489mpohhpbfzraynticvzrz65wxapcwl54agbtilplsoiv3dkkai8vxsjowhp7oy7d48vvazknsnibyxqbryqumnt95c8qpn2kfu27agv5ckfup6f4vvvihcehllpieekiv1dcyx3sd5w5sl8453n8p15vsnedv31hzy8w1wyw60uspx0vrohg32d18gd49xudxrxedwm76gq2eo75c1p7lpzu6vjj355v36a4tlhwqgxsi8ssnecaz8w47005qtcf76u26csov8of7zb56gihx3fui4issvlu77www0cglaftq3n17ow88nrcbm1q9jpvkfbwpe275b5vqbeeibr4qztygudkherv00n52cs2vtyfrnays8fspwmclemigudd8zq0dtt7gyoa30t8bd61igl6cntzlm5cfgq11ut1noew9a8bax76hxbrwaz8j1cfdjm25d3o6d9x7trxdbsmr4hpwxmlu7ptwm3vokvme6b05z7hgprnusx1vasfa91hz11xzoaqd66pzga4qnht9dxa7w6vbmvzd7lmiccpfgfv6v5etjiabf5226qg5fl8ykmyp6yn8lskott4vmht9vvvji1nl2bhke0r1ifmympwwxoj2wkye517eq7v1r6f3h28mak0tkvmgunn37u5iheww7eidwhrm3vj3qz1sr0985zzzhb3brecc3iuafixuz7hmkgnf0oys93o98ot7knmnpug1xbrvnn6vv0poglpss0ul19lzhhrns2fanvrfzg9ivb0td5jbhu546p17l7x08fqhhf5uzc6nb33n6pyouzpifet5ml387x32whshcyavah5wf54lymqp0nlc8fgwzxizzgqj1hpkd1jrpvzk7bd0rmb5w40ou4xf85d586g7mlpic0t8injk2gf2xypvu1fyyun7brp51rhsptvo7bjucy451u45kfgt15x8r01517he2j7y0lns1buflcdy45dq7u1ct7fneatbppto67dgy5ebfkrodq91or3obvf032is8kdb4mog11dav2hna2u9n4pyy567u4xhfcqwm1jv8a2sjbpqgyijr2ut81fb0sezhvtdczl7ew3lhkqoa86rf0ee94gefw42v6j1a328x2wpyctl23xnqzngzs67ymex16q99cmbgqzzqw9v0cn81pe40less8unhqkdxsg4nssusip4pxowa15hqexem7kyn2rrd9qo51tgccljsolohjcxwezesb8yi46fjs1d6kbosudvg5655ulbe6y1hrc2p75hyq6l5cvbc7k1gneku1xdynu',
                redirect: 'pqxqbqs97df6x77aa5ic87jdw0j442150pkb3vt7yivwrlfkw6a4u5ns7r26wtv28xyhqzj4dipevecsbrruuv0i4xlxpj3px6xxtiwsn87a71azr0asfif1f2j3baxoof2t5dcfi8tj2qsx6237b1aixs72wy6tao4f1y2ra0bwykznzul7e82wskvmtp48bscxhafc7xjjeufra7t3zf0n6bykgwk1l1qk0f1wzxsrhrsr7c0o5327jvp5h3tjh2imrz0iu4ydzsvw990e69dginzk8qbg564db4dojn4mcun3jroyknb434tnzooefa0x9dfv9ankmayxw6cfv1liye2wd9ygnyxwj2z9vkghgz7tux75shxykkyhyi3pucvr1u4lcd76oo6hbiwdqx6geoet9kjtan6ds63y3dqeqh39lfz5njzkfp79sd9z752pql9uws8ee18a1hqv47sgymq0r036vcyukkampembxdzwnkqgx571vr4pfwojw20xpqu2dw8xgdhchexbyhmjslpcheuwawpj5c59k0p03zzhjwa95rt0cwwamadr9a3867zl0rxc8sxl37wiqucrzla83dka527xpda2f4g5kr2nt0lwp8gqg6nerr61v66jq7tizd3976p0l5rhc2ng2qfy96vg4k1aenq04ficdfpp4da49t24m0q1fiecvbvrgq5k1ml9ejamgvb5qouuggypp9mf72fr7ju3b2ye6ugw1ay2bgworoebylouqidisdt4ispeyicve0s56hq0gd5st287x86cf1oyj0r0snk12pxi88ljbpiafr43172cpi3z15e3lf1zfasd82wi1987ke4qricaaxh6c8j02cg8z9wuv471vfs3xgkany0e5kx0wyyh051p4rr35kcwe8im7g905lewo0ijx8yakj7c5aqdqmxlbkxoh6fcjf8xu7yvicqyvg8droxorbqsel7oh2jhz0571m020kloqci5yza8bxp6gp1v1vnv8ztlpbox3vajk5ihvcpg16c12neq7w5fhnb0pwbnqf8b0i544vujm4ufgj4qtrwijs1786j53ipgc1cdvxd98c20r4leajedectqggc66zjgvn8pv2lbi3ccdvx3fdrhaghlttdhw0nrep2g8dwt0ynkrkax7wxvd2xt61i6npzfg6duabezrshey6eezvq68qn08x57n3wgz1fm8dxxf9q1l3wucqoj99ttl2e32vjfbzietbc0brcce42p0ugo2olj75g3l8cfu8str188a2cxackjlb0f77bqt1ydm94dlx9mzjjx7w6g36u7mcbdp7o9sgg8ofcqnhf3oyzux8vka4lj5g7pqml6gw7d2cbb8f8frcecakrdd4gewb3c2rkbsz50c6n6ckfh9hi7dvx5jnogkrjdoi7so964xs3dzehjyp1hsugti30efbq1bmdq0fkn6f7w82523vddmn5zxvhmsvpecdogoo5gyshoapz6tqvoa6vvbwk357rb0dzxr5d2lxm095hby1w8gufas7ekxfjop63i2gwoq6ggem1uz0luzstpxlcu9juyve5p5otxpw4qpwlf1jx68ggpx6nt5aqfmbnthq5x4kjlgey2sznhi2banedaysk8wrcfmsc49j0os1oj3dshrc2lxrw1qkt7b1rr5p0g18d5opfzkvc2x0wro6h6gxqit6fo7gbc8h7co4eskc22hhhpt1s8so67c47g6tqmsigbbe55p9zy63ms4k57f0dw11638wmqrijrkob4wra73fle77pzmgan06mrz40xmaus67kanokpkh5r1dkzij830b2t4buek08oh5gof87625qs3hp7j0naymqnvd93uu3mgg8zfyv1na38at2u3h1974ver44ia9aepm9uq47ivp4c2sowpkx8677pjpdvsnki2jj1515du7u8qep7rgr6pcaqv9yoav3ba33n5fs8t2uymye32dvtyt55eo5gbbzqlok12gaf3s1ijrmpyqu0',
                expiredAccessToken: 9326983451,
                expiredRefreshToken: 3055420780,
                isActive: true,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'XXXX',
                name: 'q3e8cedqa44f5alxtyqyook4xrjy4wcair7k70rv22i0m7uztxa8z8hcr961f7qtgexnzv49v2sqd6npndnbcy9axjx5e8qyg4uinmm09ffayjbgvvwkmtc4oy7kow6kol1iezgavcj7nuyjht9cc72oemocozqyjtwl2v60quyl64fz13ca052jtr4qleo0wqvmyg5axzjj1u1q376ux1wuzz0wvj6trgyj56l4zieaxvp4om3qxgvq8pjqfpo',
                secret: 'vbgcqkfo95cls5n70x2hhgyok1hk2ml5fn1jx0ym0buu05fx0xp6ea56yry48u2siawi87du473nwy7zo52pst2h71',
                authUrl: 'cxnmhi49619shic5jycutyqgspg8889uqqurczb6emlhrhjho9r36h3jz6s26cs68z6e88z0dm4xv04h1q34cxnnqyxfslyhyeg3vm8z4x1jfeb9riqv7lj95t1zv0ds0hb2xwyoi09haecrpzb85pqk3vze44kzxqi3hok3raw8vep1b18ch8amuvsfrehkova3zdpceoo04iced72x2j5tlti5yy5t2h7v4k7u5iuzv0w9k9k5hfd44tgke7x1vvdowzqclgh11j1z4kv6vx5tckyc4sbt6e13vz9pacbrzy2sc49vxst3j9dc1uyy1yrj4ji7ou0masds53xmc2ed56bz7teotkma5qiknh842h9jf5n0wwyew9et93g5czt64boqgwdj70wq966lgmdmhja4rbyj3mh49wnupn5sm61xrattjwwp8k2z9mgltdm9kwbr878q32nw6uijz0uvvjfe6ejezexi6fdszatsf2pmnzh1x8dcpqss8l7gmr1be92lc04iwtjc2duozhfad2pq2xgs3rt6qxilyjb480zwgel7j1l5h1lut6r11kmnpzg3npq2rp7r8vm2fmlyvxt8hnh9plfchke22h44t40ddob4k6k62behzx0pyz23ct6ue2nkkt6tg31qrvn09svuyeax474lb150ep6njvcr3v1c7gbp6h0lpylh5c91erm5vhvrhvfl5m6nzshsad0z22qviqlqu4gsidk6eihfdngru32p0cq5lg8rk8v05ha0z33puuifwm9190rkvacyoft5kkralzes8swly0iuilr2w8j0dzimslped0i56lleuwz1et1xt7koxurd5ewo90r7ohe2w15447vntrqf47rfp5ek8jjauy3oq6idp7n9wvpfp8iob5over2u050peb5yossbl0rtnj1qxgfzasnliuzfegiypqzitwti188h0okw6d6h38j2goyi4275qzhkee01yrfru277p8qa122dvefh4ab19ewfvpsa3pez4cbo7xkrqyxqdu58uknjfrww3cstn46h9cbk4wmes5m4amdicy29s3ct7z2flzvuye9a7guuy3ge9ahybiq10rcjikhf8j6ar9lkj7hlb5bmv8y50bpfxn51k8tlci5b4o58ow8sa5pco00rj7gdw3xzb1fb0m7f0c0x45mnzredilxum7lxo4ili8ia9blvpcyjl1cqzsdheytmewtvric1qq5gfwnupswaobso5sdqce8vfwn3scq4y779shd5v5mkufqzvrauqmsbhb0sotvy1oamweb6b3crtrfz24jkcjej9rb2vtcfstzqry59r38jj7pmqmdbon5sjp00c5frav1fvd88nlrtl626dwd5vtkzwl67aerqk3fju1bk35slrrbeiyrtfvmzxeiy0x0ietoz1mvaumyymh5bhitv2e8zhv21kia8htaocuk8z62xa5rota41erwic75rzwfbr20tixl4i4659i6l37iujbfy7orthns8i8n4nulu6erebvkzeknbn8xdpt384iw18yxp8yqmvq06fagjnlf5ncusg8w6ar8nwl7wx38xp5ggbokgumbs1euq00z16vdyxih2hbuqstj0joflit7u9zv35oe8lla970px3jn0fdq8yy61gbnidga04c7czmp6wopqftuhfj2oow3f04yev0jw9gjm4zuft4rvjixo6dq4kh2d4kqew77xvg8yvlms5y0ek286pwn380r4ox61hk7wvxdxucyokz7zt34sxjm71a2586o3vqrf15ii6hg846bca1qoto3civgh8igx64mlbg3do46stwgo09ze11aoslf7ycfr1rwbu981clusy6gbgtaz5hbweu86br5mpr1u046bpf453ocxitc4f7l16yy9njqsw3aqkhn4ev5al0cf8auv4ns8npgwxf0yh7wj17d2s7jfivfx5jwlq671d1uyxwvswwnssurqyjpvj4bph95pzt8i18luoo1kj8tjh728s4iq',
                redirect: 'fo4is1j5pwqq1g5du27l8cr5go4shmuj5idvtapwqxp4gs0r0mlkuvkku3fub1tkh0zajt1bhrvt1lm60j1lzw78d076oe9f2esxvchx2z93vgqy4edqfsg8yer6auhk0pv0tyggv1mdlr8mwkcdmy2gpptv3a31esato6pzlb81gvwg36ze2jfichm8di8l8a233jl2odqan5k44x6o300lmjzub6i7ms1d0l2mwiz21upyn30xsxatuy80x3sznk8bd85a3a06diznyu8xkg2hs7s6o4a45lvrfj7rpdvju06f8yi47ob4d28a3812p8v2066sp2x0cmw3l00rq86acm9wvsv6j029tx3t1vbjdxqzrjs4p9a6q5hjvl9m7jtd7vyf6qwh7ziuv6hamj1v3s9p0rwhf7qd6hk7lxwwc0ym9xnmd07lgvlab5ecmppbhx2hpaor3wnbthwae16fov650jkflhuxk8x4414fkrdz8j9l0m6ojjlxz8k8qqw8fxha4eyp0q7mh56quhnv5lqebo766mgak5tly6a8v8oudvkv6pxmjzyc4cbfxls6y1eiuvj5zw5mh05jkyqnemrjgz31huzymgzcrrgk0q1o7w1zfxeflkqapa3v8kvtrzqzd5t4pmvc5zsqvouw40pnkrd0e8rre0l4q4lgo08yonvfe5o0yve9alkenzhe8bdqaa7b59bhhxw2l5j91428u2ucpr7v4knk0cr5z37ymralokfqkajkz20fyja7rti9wtwbwh66zlyuvi4itb43k9mkcbulnbgus85vnxsif7ti3goyxrjxluv80aer6w1n2k59v2wls6yzkd6cngjyjcx2oq5wrgl6ejw9twnrzphdj05njvfwqd3jiq1wk85xnfq1chnumyibrc82g347ty8zsfqo8kidi80mo8sp5hngn8j2651di7g7njs81fsc71p9gnzmnr52vgvmmbb6f1jyd8z1age72op2e9ex8i5ej5kiahwwcsi3i1lcfjjxapyxenalwrmihjm462m8as0a0iq2pfgsh8q6ab28nba989cd7hyqwry6s3h17vwhrzhph45k5ek7jmmy0ol20c7n581oq08i81xpymf9o8bebyze7lifht9x9d6yvqzt5lgwcw59aju1n6c72ehi9y5dqefmln0ss7wamothq3v3z98ab75a1y55i3e608po05f4h8hpw7sjidyn93xayxaqg7sav9aslpltv9cmojjsx50upjuxeq1zyf0j3we05mu9qs2hgcy4d0wmpt2vg74okc646x24ulvqcv2cfvfth5yfg9r2csswtjsat2jzw6yoq9bwn1zyr10s4y1iu66ii0nul9hx3l1rwr4z2mm3z3aiz17tjrnb8sfo41504azlriqq55xcdltder9nk327en0zyx2h4vqlk06ninexwz81p660p1nuwtf1cgl0heufdd9lfk5n6m6agv93bdk3zfgm9wmg2kq38qc61474i5l4s5bf4vd6sxln4ko2wdyschalpfz6qmhvetn1jaooxxzas8butz2yjzrdowlov5zjso6akmyteizv6nvmy9birrln55dubnk09v2sd4hj2q7d7f8l5of52fe8jiwirzlyedpdymd2xenzeri3oi3ocw20ro366vjfvgm43mrumnrnkgg6nxra4dq9uwcbbdib2bhjviphy45fsucuau2o6mqq9pr3cfl21467lowis2hhc5s9uhomn5p6q2u96r9i8q83pndk4s0s583h2de1mv2eevf4jy4i2waup5mj4zo4jzzxtws27adn080yrlu5367zrsodk2f4ob1hiuctma1uvttmjz1bl5r4osyjenjctcvl26oct9dnz4mlvtwnqvmkcrta5mrz25yoa20pyrgxp0gilsu9ffohxq0crrkv4sg1f701pbyot85dc4kom1by1ke45pm07qpl6yqfa1s3s3qk4ylttsofk27p7pglroq3271j6l2yosiuuwnxfpvaidvz',
                expiredAccessToken: 5632882357,
                expiredRefreshToken: 6156751932,
                isActive: false,
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
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'CLIENT_CREDENTIALS',
                name: '85mkiq5rw1e4w3zk8ajqo0arl1zavsp6hz35mqg3pn2ct2lymc1yzm01puudbp0ahs0s2svybrslqa42j4xbyolpqv6ubepni8kxsbdtbza1oqtfuzt80jq3jyxht15rvbiwy3jnrjzqkmf8cqwu6anx3s5yu089fi3r7zie7t5i33s48ib4vfpvernho1amgn0lindjirht7w8sn5szy6cm2lwk80bhtdybbwim0edyo502y4t45d76ji2mwup',
                secret: '9g9swd8dpwixsjcrr2qwnknuylvvttmsjgcwza37svat0ffrbrwvbbtw578n455en6ywhon38vwoqzm4a7sefi7p20',
                authUrl: 'xw2846tan2jgjf4sn7sw0qn2wraei4icmxy8r0qupjn3x6kcha5kopvnugzc0431uk9rqnblpz0c9t27m7siyjsn49ve638zgy6az6iieh8y4fl0sbsaec37sghvvlqpr659gbbh5e9a4su07kv5xwlawivcmps0wyrqns00mb2q8l369oqbiekej61f8n7o5n1c8yffm79tqn3hec3kqkci971e16ztddb33lia26c447t02ovjlgqdppj1a5pt94dtg9xz8z3rzj59ne9yzhn5wncb4up1yk4vrwcnu9cj778lkkff2n29dhxhnvcrn8dgok2r0dexlljamsjeyek4t7xkbzj6tfp3u9iqiu72mxw5h8b3oust89ah2xpfwyf29lt87h2f85g44mn8ocg10zk11s08szru1i6t4fn4qbl32gj6d96qdhg2rzjkcjviu81wx4xzv2wefcvw9mho6k9lxx6dlvxkt2n4k2ifmlfvo9hpn2la2lioyulh2nop0magv4brd6hjv0e8fi7sb2o1crgxuzsgssu5ge83a3d8ctvabogusrsodggl4ur944eo3nj7a2fdqjalcd20z8l3bam7uyyyrhpirc3dv6bfiyzfogou7x0g9hgozd08t9anpcdisxtinpoy6jp0swl5oq0bpgfhiwxjzm696bywun27ih26j1e4rbjn0d0yvaki2nc94am6rbmb4qxop7k5gkdi52z8rsg9h40mar8oy5yh6pr1prtjv9ctn0anwegxsmn43xxaycugz3g4a1vt9gkstq2vaalpybzbs0v70xapvmbl7kcry1k4get46rld5mor6bqu98vgfyyhjljxo7k6dcr05m58uwcjz5a3blx0fe2d7zazuw5g9vunv5gqml12rxc1fkcg5gwmoycj5taw3qub1fd6pojxlj2ea9le9x4zsrnknk2b979h464nu3myulxoes8etg6xgcdonn8u2ofu40a7syokaaud5cud8m0xcdjudyobuqciwg5uv56on2vu7ro8wkrxf0tibvv8ka0k7i519zuopzreon5ythgtazykje5xmf6sdvro9pg57s55fsayj21vj75q5tmrnjsu9175kjwr2vq4t8ixf0g9c69gwurj40zpkcrh0nye5q1w0owodjvm3vmu4v7cm2nttyshfpv9ahb6okw22hul7oi6jfosm1kjv4i8cw87bny5imz1zqvfg1r9zjmf0jxmsv0ciu1s5vrmfsl8ugwplbvkwtqk12viuekbucq2ccbakpqi8ik8vr8449wzwvhkvkp07z9m5cy0xakz0c00o1hha35lac3gnibu238r9vzr4beo6ari9oy8eyglz8hii9jw8cv7yp0n6byedo0tqjy1ovycaop9dpbkumrfoc808pgv3dpj36lfsm4d5hjbdtx7ovh7a2ux6uue2ebkwju1vp8x43rhpvomdr9h6c1308o9wajwj6gupk5rsi7sm2p4wph74eod03fevq9ut90cfdqdy5lktk6pnvzc9doplnoi36j2sssgtzttkra31ny0gt6y3ib84rpves5x45i2m1mtt1r9js62w7frki0sqggsly8l4pies553ewwjwns00wy4azx71aak87pa7cz94zl1xyufgo8xb06w89k1v4xrg42kgtxqo31i45c8div6a1ao26f1f4gs4ngk3bkpxiuvq5mgr4153dvrgo8j5b7p8617k10ima0ji2pwv8fgd5p8caxgabuh910iyxx7v2r1zgzwsinik5e244vwqlqzh7u4gfsbazlk4cf0k3bkbc6xtl0kua76211qrfm4b7b7fopn0kiyeob41nw87q61nni3iak69ci0ldkt14ttoq8o024er83x64bkxbzzdx3tutoo99zmbk6xylvicck4x6yztowzn9v4ryq7mc3vh3i0716769tm7ycsmkhzqmr0wqn0dqejap4d5ljxye6xfsw52p5uha0o8dy15hpni8ka1oqwi417cssf2nn1epgy',
                redirect: 'g7gxryy2ey5bsh1w2s1diov7w29xphiphngeorrnznvd8szmb7p1u8y7xuykyea6ybevzlp9ndxkc4wcuv2abna2oweudewfqzkxl04p5d7fux6pfuw8hj49dqb6i4akfun5lb1hsj9wjsj4t4cocpfbh2cyyd3twgk3dgw43wgu4fpyqddkaf11x94h0nx7x0y8wwg2kqpslh2ga2yfm8zkpnj7f1pxnyf4kv42f5sqjrdeddbw7z8dw5f1hd20zwujgeqj8h4yiylbvyhf2s6yp8zb3fnr09d2tbb8tnqbtplgq3tb2y3pm8594izrichjhg2touh25b91uq9bpycdepfkm5cm0wcacy2ybd2cznum79goqd8rlypqsz0nxw8z4anrjcuztc2gnl97y3sg2q42cnv45p749jqoj8h6ml9fgl9s0h5oc2p7j1i08jlt0lhbrgobkmy5oyn6tn71ay4oezyaf03bvmm652utcsfi3ss9jt5pxjj8rg6o1fzc2nc0u2bm4zofzqifrjs0iswmf19jcgnsdw7w0r6vwr8oy4b7rylsuc11apofk0pkki1fqsrjd61yp9w9j6vcb7klypc1hszmmttiu87mfd9qgwlwccj7ch0hccf6vv1mp6pmx6zc8fagstbgisnqtb6q10dgrg7njgj1wu8vf4jpsjbgg147gnsrdvcen37ovvukw3aa3sg572rhhcz4urkvgccyo28b9d9a3v64hrh2tdzfn7fgivrbomy7suh9hffeu9bckwn5yqwvrpcjjxb1s4tpwaaxvshf5gvnnddj5njs35neiub2xomktyp0rwxhnmdgo076s63ce64n83ob0u3dvfitnm3hrcxkhxw5b7zzevmmh5z7oh6edyiigfjekmxg2prqte3hhyn5vwp0ana924b1l1rclb08cyyy9as5b4rvw0k8vrqxansjvrlat8crlr255fxkieisc3i0hw1atl8mzhblt5v4dfnafepgc1s70cb0hhbyvqc227i85sbr9e5y19n1wcw6grle1997rvqrpaww9yyzsh3lukh7fxcnuju3gemd7g48p5c6sk687nr4a36cqdpcjtlgzk38pnf31ziaya35zgf97mz3xl2yf9r20nv73x0o8adftfi8bx3a3vozizkg7pgnowpybcddllzp0rtq2e4629599efa9mwanwxp1gndk8qaumm56yuhfeezbp77fquiz46xwwm1ovx145t8nu7ojunojqckm1j46sv0swvo1zsyrik1t4becbd4xu8kteich6a72aoofyuwaxjjk7u8gqsf2i288eq2l4c9atkhumt27ad0jzf5oaw5jp2wi1pqjkm6jz4mfrdlcts7t9lzcwgud1avg0ubfmskkw3muo2y6r8slpu9pzoej8gab83mr6u0klfejp33t06qy4zpncj42w3ambqwn4hxmb7i33drda017fvekvtv5zzotf1arikl83xuaqgvefix2qq4th7uy8wywqwont1jz3clfx8cwsu0oso58kqu5yhd42kcm7wd6vqj6n4790nrt02q623f9clan6crht54rzo0dw1pt3ovswiopkz7blann3b6nbe33gan263we1kitjv4bk5iqelc5i2q7h2tw9mitthopplkgh3b85u7ge17frxbwtyuxn12he4hdb8rktfvm71pnif7pysyuu6gbla0aw1csgjnmz23q16voquqd1mp0zjwqttb4476hnigc5umi203b7spy8y57wdttcpe12ce89iuv7at764kv5b26omuudipop84bge7tt333dv6we9i7dqxvh99fx2ttl2esxjfhxy0b6q8z3np3dqu2c54ph5zh65hfmthtkn3tpkxyw30bk682kxq3uxpd20oahw5t0p0vczhs2w6mgxqvc64m42pnyrh7duygcxgocuny7y89akt4mkh5d4h1f7mu7whykwvfrfd7qr2sd310pj4ny46hrx46hz1wm9ntt2obaztudlmht8xcpj4',
                expiredAccessToken: 4592237036,
                expiredRefreshToken: 3220107503,
                isActive: false,
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
                        id: '902de509-fe3d-46ce-918a-f0ba58c235f9'
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
                        id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda'));
    });

    test(`/REST:GET o-auth/client/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/9a56cb9c-7e62-4f3f-80c1-ca123c66d62f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET o-auth/client/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/o-auth/client/7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda'));
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
                
                id: '861b6946-20f6-4239-a9ae-4084392eea04',
                grantType: 'PASSWORD',
                name: 'dmhst7hnps6sw2mvhpz1snz76nqrapudpd1ubak67agqjl9e6gpnu5hiz5nbvq6odv7w4i3d1nubhwnsbw884ef5ks2n8zs58hqbxi0ooersow9irobkzy368s9kdzhbjekpxmpi5hksue2tporxm19th83q7d55ongvbf2ga9d6a8vu0r90ox65ix27aqo7nd9y01tnffjtwnfgyn6u2vt47qu9h8z9ylv8dfqwj6pzvbsn8dp86uh00nw499p',
                secret: 'wnuc0801m26fdap9r7mmwmuwg9xmywu53c1709rxkmg07h1eu3gh8k6kxrelev3emm9ceu94c2zrexajvzkcpdy6mg',
                authUrl: 'bvqi1crrm6pb9v2r4hkw4wwzhd4u425uczxqjaif8lvq9pwtnm8nl5vtqkw8a8lpfi3avz1va9obosziny1qhjxr35tvez7uw3pe5lw73ctxm0ygdi7rclshrisrbgtq1cdb82v3o699e53xhlrqbjnz0gs9rdia3me13r17hm5vqnf83iz1t9bur2smqgb3r6rtaxmo305hn3gxlf5xeju3pt8ejnow5jy0eo394xw9ujyvn3zgwt8sag0464owbnk5quua0enxan3eetnk7bfqfx5gpzohpmgzlwxd40b1rytnw8tybfe4rsry6r251peayiss2wy6gtj8cfbng96jdhyu3mcy70a11y8fvf2ggggdufgc2wnv4lt0fviqmqc9rfbflp1byl9i3r6i85s1mbhhbr0oirh11kahy04u7z7moqfzo7pxjuxyy4aqnn92zb1wcqeg2cnzgt28w66vzzxgnl8thm481dmg27kt8mbbl5udfnk7oetf3lmmlprcigufb68he0ch9ygfqtw5w0juoacaa3y3uhluou2pl8vbxf2zecnvqcsjbtqmydlefjv8ubalfzc65rj4b0gcdfz1xvj4gm36nw50dxteoncnrrm4flmwgdgilvqbkpngepjgoj2fzo0qsh0ew8omkjgwctgemkk3ei3ro9yl77tueckbai0dgo3doiwgdonuq8fv8dverd889zrpyelvwq5gclgtxhmechfj6i8wbj5coo2zcwroqkuxhpr5yusrdzrlell0dj9gsp1xokc22l53gd00d1biab5b83oy4zys7z81dk5qgia1le1oyh3dvkvtqs8ttrzjwan8gh7y4f2sm5wsx439jd1od1j6w72f1qwicis75cys875amvltfud0bd58deydmp8vy9hgnc0tqe3irj19jzg7tkt7fjuq5r1jcm29efsohzsm0bi5c6zie1160bg4911nitmgbptgxtmupiw63wqsy4gtecv5j9vjk9lqtc0kol9bzp3fmv9gbhugsuamzk6rz2v68s3wceydd82m3ylfpifhmubc7nandcmpp50o9yrfccrzhzgrtt8xhr8j406fu1d9pfy40k4o12009qw576sfhbg1n1srujv6sdigsc1uy9byvloq822at30i9qmz8188rziftd2241pim8qdjarcg1qrwvutbhh35nce441vmpz9j5izjm5c2yupv5hwpvk0pnimqndy85i6qcs1qg0orpy9de6zld74uvy65gbgpwvc5if3ei7o3wjnevpr26biv2hmtxi4zc3mmtsht7crr4gvbvsgqfn2bor2ekmfjgiltjcvd44k01g0eligc9shtii7ohi5k34ku3oahhmlf87vl1bgv5kvhvq0e117p0pzwaf1wp6ubzj3jpz4gtv130vf43rfhh7at9ax8xsx7hkd5vvos7kxmexxm2ptd2xjlul6p6lf3ppcikfdwq960kops6byxa2tibxcpx9p46vmwepbia6t99zc3jqhn74is90c1hy42zeb4bpxcnua6ffd7dsya4qdyxjverqblze0aec7g0mhfoqaf1im4gjtm7qg8etpi6pk1zaydl7cy5xyib0ivzn4qy6dthabawm7lyj8c7xrxslgobyi3ut4q8ys7uurvp5p6cs4zwy0c4df1lnr68mp24onngunvpc2o3ynl4hgpn4afxwqot7etwp2sf5icy3oqhpf7d9xkx0yfvwcdzgwnqb13ifg03gdibz2f8dsknxitq70zby2zjznervnk01slcjv6oc94gcj8jrfs6d8czf21m6jf5qnk1xyar0aclmy05iyobpqaepyy69x370xlooshmqwkd80q2jugh37a049e8de0kqhj07gi5o93vluu62rbimctsdb6g4x043pjwbw146sxec1zrdz99ybedsuphni4spx6xvtn2m1j9ap6uiteo03ol88cjfx5n9lrzq153e793twgudm1ennsop6py3aogtpkuwye8f408xhtzxi',
                redirect: 'tqhf1vfaxksii6mq4ruv88j0y8gn7z04o8owe8cljmhsgfbe57osz2jl4fm9377ua0s1dgqt0nv30dql91e60fl0h9kgb728gns63qmycquwiybaknaa3mv61x1mss8rwuianvfa913qrm3u357ehxszvwjfbsh1oaw42dhfx5bg4tnv9zdk4bd3l8aqrq6ahb1jpw4mv8d7edtjbjvhi5pdpzga5ojbgwc4q35gz4csqt9zw6nyolif4ao7tvg5ya61f1jirfmo7h2rqv6d389f9yt1y5y8r8diyq3chtz3j1p3vkznvgfjak3dvxqjuqaovfdh6nmu3974eie8wh9huf4b3glaeadeytmm7thauumlfk1zijdrs9o9d9sk9tkl91t544zx85ruuc8ll07rtbyqe4y5gglo023opgdmblv31pwgczmxjn2c1xhiq0426jvkzufr0afk2aaw1do0bjypr29y42rhwyqdtq9t8xo60gdslizpc5k6c8j4u5h8x2uf721xbe438ftjl3kic2jmy5930n4y4ui1vvbm0gor2jlf8ldg625jyu87u1qzdnitc2yecrtuhjutvfpf5xccw9tmum471hjgrke1ofq7pwfeohdiyz4d19y8zblg2i6q2rs8o4171avi7wh0i2luztmae86214dqvtfxkulsnxb104ow7aos1w6z2gtmaki7m6ivewhvanuc8h4kk5t5dyklqadqbwi0gku8d20ct9f47tpw6o7hyqksqwr6zp2ej4cyms9hemc8vssztlpk29r8x66rdiioutk7v8z0xqxukvwxj2jud2lnn7618ylc63gmb1c0cq9xatot5pm7bm36uvdsr2j54tgvu54ln1mhyx449nd3ey10bf4f9vml35c10g8eank0935mjmi9zk5zfrrhcu7fzm5w6wtgkawv6o7tfulelv0tuxb5p3ngoj0crnrl3jyg8438ss8jo3kf1n3u807qfh0fnau9zqmb7jvso6hlyhhnc0yv695nplehry76ewaelzywg17cz5mwebn99mt1nxs4e6oxzilfhgcs1f4gt1k5o4opugrve79jkms5y8dev6wks6ofkt8urqpbr36ohv765t73np7beru1immxinmmhggtsqkxgr0sf0heieu7ijtjmfjntww1e159168y3nebpja0lqeghm3me4etmcnyg6319ovff66omz39guf5200fc70earyftprg3h0nmdy2vhaq6ytcfhwwtng0bysxu3g3223ea34g1s90ak5rbyir5gtsodm1rgr59wzkxcto6ktjq2s21g72ky6qxujzcequp21w3ma4jbbgel3wy9xne1ak4bcjgbidkxy3j5ur5lzlh4rhbdfmu0xcctie7211ap6f7ekd8fbfre3o8uh8by4kmtk65whjonarso2c4u0rn1fip6czrmh04twvj6t636nx05ilyw7ujhopfyanruyhonly68os1fofwilf36vwwgepkg3h4o7uuk99s8dk0z6ycf36ono39s01fm3ir5qp09ss7zog2gm0mxcv7z67l5mef94k6wd0y80sp27scuf3hz4y3z210dkjxspewgy59an9pgqfrejtv20wcrx19j0a11qnb22ja9hhqs13296okc8jui1wjtm97fu8qgo7r4dmb4zx7bhjtlnyo1chamka00f007qiyhe7z8jwkd52420hxw2wqejhbdi4tn1vwhcun771zvvh373iycd6hv3s0wypr9vr9mb64l4udpa5gmym8b591f8juxa8ma506i2ewt582hdwcsystl07t1nef4pcqj90894xhy5ihutjdvehauudi1fzo0jq0jj26mz877gyhin9rroed2fjhw252tsffxduzjgxt28oc8qiapxoin8rb4przvrro8p508jzyqqiv4ts21jtncq9vr7sxom3621zki17la8nxf0b1n564p29p3lr4kjknzrs0wp59gpwtcgr3334m71fgqp7ovpgu0sirfim',
                expiredAccessToken: 9377420904,
                expiredRefreshToken: 2482522071,
                isActive: false,
                isMaster: true,
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
                
                id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                grantType: 'PASSWORD',
                name: 'f1lpvg7pjo1sjl6n17by8jgguehjywt1ccgrglxgkhd655y7j21niiws9xjfb2lr07ekagg4v4wfwgh9uwwgt1pfgbddfz2ptz3jvt2y2q3qzqy4xva6zg13fo644q38o41hmpb2wyvjd8bhcqus48rz7oan9quqzxtr95c0czzttglrk1wr9lzbrg3bcl2r7cbkfdjk95wxau6ozqgdq4eacne7rce2pefn4hkrlp1u92hfa5y0r5r2djdgmgd',
                secret: '0xd8chn6skz2eux971o6v98n8busgu6j4vc5jc9d3dhjyyhvfy8jrs6rvvekgeim8ng4jjr3nabrp81dhntwswanle',
                authUrl: 'ovpohac8zbs37z13450apji45v7a2pwzmzspnadwxgis2lwbbc8cypna0xorfcttor8fvtsh4dxz4es3utmde24opd0kfkk3p0p3cob7pth4axbplnvoqi3qtestmek454lmwbc34bv60ao5os24035q4nck4n4d4cjdwswsk65k42izu3xcaf8pst0gvs1r1zxiszcide2jdc8pednkxg77mfvqcirmn6yh2nfkt8f38e0svkvm12mzwoztrqe2im05vf36ht16jawgf035o9wmevo6ltgyf9gxllsng7h4xuf9vsz03eholuxsxsrmy4yitjllsyt4bu2w18raq3ykln58wbqjtebne6d7w6pot6j7wdyjcbw79bmlwm9tbxbszyroect7wr9qquz6sfqi7us4f1f847l5x2x4ctazko09dk19wijg4g5hgdvgfsjyoq9m35u68y9txhaszkl8a0si7xvlz6szs0soamazymbdbgc1xte7njgx5m0niukm2enclf8m4el4nz4p9sd0kb28uk6rm0vl6qed4u8c78b7kfabugrsqxkv47r3kmdp6nk19pxw4041bvy001xjwq5ngr127nrmsi6av21lro7e7qwm3y2n4uunoggwyvlvv8t5v93z6ik50jst0bnsk1dd44nia1mgpkg7vzdfxp8y10d4r6w6tu16ieu3hl099890geyisz29smkiqd87q8ciwfruak7lnn2nwsn2siz1rpzlg8qp5o4ah5xqtyy2jgn0zi3os31ukz3fcno47sgk4dsykavbwkvoyl9fgr2zdztyiyal0bf9hh57g8pexq4t87wn3et40grejvfqxzvns97me5gre7a95fmuq5l5cup41fh40ovyecf81eqf9w0c2xggpz40ilr44pfeabh3s1xtk8h6a2tonrsty365izv7az6ibev0dh4qep8yoiidhmy8mlg3a53b2lfvcmc9l0wohodzpzcmnwxhgxd9u5mu31u07z840omd8inhvg0zsoh5yl7q55pbo717r5uebhm9csyuxlc09eoyxibq1beln9emzaslgn64lq9ec2upeotc9u540l5eclm5z303k1fntippfmheo0fxqqg46t7hs7b0421vi8zcgdndwreprfki4qazfov5vtmghhyhcr8p972k6hrwuymo4kas1n11mhom6afvngtgv1ffy6lxxz7fxvkaqefpkteqfukookpjgwicqkbue539rbtn8z062t8mlf74c0exlkmn11o0qhpk8vv7ttdfh2w3k9smtpn1wz94iypmlu93578zblp5lsqff1mo22nxuqih91hoszu6m307t9y3hl0ca7quqeat0l37i8t8y6dh9ev2zbm59xr1gwfthadvz9twa7qzjpyhv5oies7xxcngiktp3ouq2dbkeo5c7swj9r0eu52kilvm8bps80o84j6hlxrw7m7dtrkfp663tu95eii6qazo3ykispjnpipddhykx4sc5uy1gu5pl8wlm2wpcoqby0249815rpw8qeabw8hxdsmilmeapfkq1e4801btt19070c08mejmi60hrq8qobbhbtpeb5gtkmzyildjefsygskzege86kl4u7rq1vej9tqm6binl0b5rm57h833f1nk4sjaafoy2gkbjyzf0w9o84htnlwiws8va8s2yz1p6w5gnzxz46f7evvh0d6vhuuig4kjlzv5nx1ks2pcfv9fqiqxu745cgh3sp6ub6zh2nb4bvcdbgl543o4f7gt42teqe9r8xd8dkdufx3vjyetj0tglsofhvcq7olmvxorw498gst872dwfj4apht531d7ah5f6g2d1aqmgop8fzjkkhf04hv3grmzcu49ynqtog8n8ix99vzch3br5m5b3ijm0jzokd48u0zz854f4v18n6ldrjwwin5qvqqec58c8cj3mbmbg2c91r9g2v9953tvtelcq78ld2wf3k76tr90iw6o3upl3jclyp2lvh11ef2h6qw5id4dh0b',
                redirect: 'pw28jq1xzayaghq9eu604xor7x6005nno3hyapffyf29y1p7q9omeapv8uxkwzn2j6mkcesk7itgipoijxpr05mql02d63ncvyzebjwrryar4lu0azj4k2tt5bas7dozo9mhnffdh65m404y78srybdy4pydm07pleo50tc0lg1uc4bxiolp291o89eenhs9olq9578c3uufrdhhm00ma9lucpgo8l648jcs47hy2dczk93l93y6kcsgyxgv46cw9o2num00erru21n2usb0ymx5irucn4haj3aysp3lz175pyvzrj0vcqh2vejh0hwxct6f9y93h8vv5oz0ddgsxv2lwcutrljk8d58zt4i0xcdan8hhpej4xv721glrjarps74s7h7td4az84qyqdoi3l11bdtyyyfib687653t6qc6pc6tt4ck1zn9bvo7pdkwlwmas3e044lm3julth46wl2t114ieg3qn7rgwhvzi20nfe5bks6ypc3k3eqgk0nv42fuvre0cpds7cpupkcy1af2u4i0jkexhl3apsk2br7hjb26ur7uttqq2lfk0e0xl9hz1cvaa2fpoaji5pfkjgxl0hlw75dwpqutsa6uut2a98lw8uudvi9hreu51nqnobgumpjl28upeq4y05j9tgxo10cxxw30apje7qgwj9dgcy63b9cdz1bp14tyf5lcj01mkvq804y817quhr25g0y8uj21zpa27k2t51btkkv4664wm24fpelrfjtznbellyvihh6qy4cbv3ab9ydfqg4vox5s621dagxboho4omh2tusvlg3qvxfb0otavy1qz05l7b0rtiinuku3jgobrfxazbm541lg2xy4dty69o5yabmzqp4p33gngrsvawqvegzwucy5e5ypyglfecfdo78h8xa6aret6a6na905renk2pi69n3gdsx8rieyp0k0yoa25h5txgw9i4043gu4580u4nm1z0k8235xigwvdhksfoe4et2a0fthsdxwscu8qfnpx2otzoozwizt2cec38ecz0ud8u6wyfv8vfbxb5gdgl19cp4x7ogssp0w2it5kxezdlxizk5u1anc2tcuge7532h967s4duyvacxl9qfekq35pyr268p5bv97ttvayp83docmvhj4xq7y4opg6aqzscr9h5l68d2y9upb2bpv5bw6dcgrtf33hwky1pmpi8vjl0j0r2hfqgb05s4rgm5qjf0k1qud7ny18c93k88xoi57lubsamy62ijrgjud0bhwv246wiim7y0filcfznfycmusyj2srer3m5h1j3hz1c1zkyean6tqtlr7rh1wyrcwshwh4y50tryi8yh142d8m55392gpwsen4jdihwvumrqx8wcpwwxrnjzulqpqxjvhd7am22vcx05h74zjcpc80aetfnhq3gfgnyxeks15n3plzzy4ngwnmp3ckqy6a99iwy3m45o7wi81lmtbrtf9o4vm8p055gbi9uvbxbwa3xxqdvdhnryezclyni36yy4bmrcosx5emi328eie9j5cz533qg50u87sdm15ev2etzqgsnz4ogzfhouhc9bjbge4m7pzpln11576z42rjpiv24lucnje39t2fqzksvj1abc2ot63clq364lyvlwjf3gxumnufcyvj7sxzt55o7u88p4zcklcf3g5p0yk4fpey9fg0lz1dpqwkhonlj3tj53dgk1y803c4zcl8liv1197r5e3ujusth142ocnoyfdei3o0w1r5dstf3jhv9ae5u0m3l5z6uqq36hp0jaq51ognmxa61tx3t1o4n4vgsn9lmh2enjtxhz0ucx034qm8h2kn4jd3uak0e1hso9ftbyfbkimbkgyaonc6mkd78ezpnyo0awu887eokm4o8eaedw3zeg8y9n0jiqwzzhzjg972poggautihq4382in0r2n8azp1bmrr734vvu1xi3swgh8eurvn08d5tw7kigiz0db2oo8ox9ppz5rxrch1n405mqfhpnwmsywxir5rj',
                expiredAccessToken: 9471683660,
                expiredRefreshToken: 6002963038,
                isActive: false,
                isMaster: true,
                applicationIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda'));
    });

    test(`/REST:DELETE o-auth/client/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/d021d638-5a82-4c4b-9aaf-784ad134e20a')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE o-auth/client/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/client/7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda')
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
                            isActive
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
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '186c4a04-901c-4fe7-8d6c-d7d546f8831b',
                        grantType: 'PASSWORD',
                        name: 'dyjusilontxsitlyuewbw27uzq74r2j6scxou1td01uhfro6lolqitrorfzva8no0khnuumdqh4cixb03x2wi4msb32meh7lwcvcq3icw42xuhkupzyp5bxw3mvqt09mww168lst85fral5me8kswxyg6e40g7725yinuhyj75ulqhv6vfs1c8f3clrnw7owjmhm05h8fhbofraiqfep5kkkf6hqz4kjybe1wy7xzx12hiyzkv3wa4i11hdhyl7',
                        secret: '7jz87dxsz5uk91b32ay1axfesnaeud3hqx8pg5d9kysuerxq5ba2xonx87yk79lvk5kf2fbeyxqg3sjnxlpgeem3cr',
                        authUrl: 'uaz9rhiei2kllj3fgujkmj73kmxxx369z5morvqhgx2gm9zp6nnvbtyw8k2fwpkuu6e3liykql2umphqe4v99mkz5s6m6n6qb8ng48dvcx6y0e7s5yrvo0sq75e2ymb77s8im0z7c9lk5n04a2hqbauqmyk8wfbvr41o8i0ff2x4fwyg4bpjtteu9bxgavltsg42tkxf59bua2vm7dcn76iw3812jqhhxgn0ram6370tqicpt5bz6v95uf360lkhssb5ahtthdesb2e5egn63vf9a1r3s4h71h1rdxu5xbknp1o6o2zwktoyabrwa6b2tb17krcfx4ahiahicgcfqo7fivq4tha83qlnjjftgb6v617me46yz413ofw68qv2emkuqfsh2yysdpke8so1z19ofh8ja77rrd0ifnpb89xfuwhiardy40rw0hpf28iw00nc8pa0k7ogp1w2hop4ovnmlrdxt7uvm58vbzlknrvg9vqf7s7m7ufolwhylgsz4p5iyhoawlasad0fuenrjizhfsl6qfotx23bhk8zvhfaveusy9r6vcy77yilufpz8qk31xne26ufrmfiku81ks4pa2yukw2lp202sn5myz0klpt6a4ys13y659e2xussnzmlteaxt0uf1la4qwg39bkje0o1i1an5591ozkshozym5xoquy65rd0u1j48454g2fvylckb6wnqeujqu2t1yw6h69md4okq5bivnlxuy01yie9kf4zxhc6lz8j32tpl2unvx3yug8hvla4949yf50gzanay6hl7eym0j2u4vlx2w3t91vxnewfrm3z8qosympd51is0g4vuvh7q0c721w59qcyjz82ml0hgf6ww7d4tpe1wcflnitkf1vt5wejq91vcfdjv6w2tuvrj1vrsno49i9rmui0u56fm0qkrl8971imahc7hcu4cf4ecex736zakxxg9ns289ztxrwrpy32uy1r46fb7mp7fgxulayae6416a7sojdz97jttxhjz9ogfviauhvrb26nxddkkpb8j7xt3m671w1a9mfxjuh5yok3yt1865h2hdi9xyizgv39xqpr9a8yvad1o9c8by570ulgpolpe9yyrdmy347ezfbgm8wowdxc2dt64ltrduwh6uylel0q2a2mpywvupbsgotkcmkrib4iw010vgxj2x9h00cqwjmphicxvgw7b3635x5bbe3ce62i2fb4i5xmcw9pf9dxtsmnfzm0kayztcgh6e5c0oa7rmabbwpm7ywirbb7qehgcqyhqz26dnrzzhxqyhnvy0j2d6ub8sgbmy6p78zuuhflml3efefzlholj5b24q8ukvjikg2d2cowcfczlxzg1yjx3wruk4nngziz9ipm40h3skzogbqzlpa60jp2s6ahk1utp9njct8ymhdsytn70itwbxkn0ghes203v0n2npqz4urp62h59j0x9y3gv99cv6ncztel16i4bdykhyi8pvvemmol45vof07thvz25s1ipcavpizfdhd3rieer3n8xv44lw9b3eli2zcypwrnqy3nbl60vmi1wc6ovxrcn23ujzb2nkyrkrifukvvq3rbht8hovnguhd6tx861nszvm57byikitl9icufyeivkamgpfhh72ukeu1nr2mtiiwysnepga4sv6860ne4snj08j8mqjtl9gdr6wm59d7uxck1k3yjdama8waduc56d6tngand73tbv47wwnhvsjp0o19aw6uz1w5o4i7ic1t2qocuqd7tr5mm7ma2wp4wsfffw7qf4afe7025te6391mf4cv8o00wj95zh8xufn1bj5xjf14qtqklqgjg7bgyt4vx5hdpaom4ikc09bdbcsqwoae95a6anut5g4b6j2er2yr6oxxoruh2stto3mzkfehy19bz32wd3nyqbmvgyhvztox6fx40g4i3qxejdqx6bcboqd3y1pwnqs1l13uefr14hfg2d5aa1omvrffzbg0ex5wttirzud5dgq4a6njbnjhvf9i22b53',
                        redirect: 'vmitog0c6walbcyx798e2wket5gkx1yij9ncstnh0c8ao1tdyfl5bnbdqtnexpueyd86e0v78hnzdv76k5wz14he3rl2ua1hhk6z5kf5gxxnd4n4wytng1sew0dbskryybspxysf41zrnb1n3h86ydy3ojg7doebb8axb3eyxe7nfpxncfxo6kmqktq5y161igkux66d8l0u9yfzpnfxf1s4hz1776nfnucl40tr0815sotuzvd7q4ed72fum4gwkkpi4rosjqaiwzic3jmizrx1pdywlvu3pttsa0g4xt8j6so2hofaduzto2mpgfqytht18wppmmgu2kdy73hyzjrl7rieot64fikmv9svkirk6aeir7dkv7yqzxuopzbovz1jbveh475e9dmoog77ztx35ifo8nvv36m5tyeao7kacj11iaoggm290qcu4cqjuuo20bcmok948ff3e0o9yf6bjqowzb1d60rcdgaejwr561w1ilykw0tc3i1bh5kwfpwq7ted00tndz6mm8tguibbfwh8idv6t1lv1y4y45463wi5h9pjd769mp5negbsjyuqz6tumcl0wczh5ek8l3yt875q8kx903yorgcyvy91wwy85ovk1b57z4veshblqw0i7q1rx5lvhb4rwvfanqkms8q5vhfaloujc36f8cshwth23odqgnlo7tm34jnpcua41a9j1bapofhi3n7o91ujyt137k4oofhfqfjpjr4bysxlywwb8oqz1db9tl2raiwmhaifvadc5rb36cpzbcxc4dqafj5c52oare0enz4rptnog2colwr76v4amr0p1jihefb7bm46o8tq3g7ols30h07d88if964egwnu0auv5fsojd3cnx7otfiue5ahqc3dt1qmalrglnlehk0buvcw7gbt31hqwq70bf92dv9dvmbzsdunhse9gk6dw6wnaj3z3iqplsjaot82ls2mpqozxmkwjoc3v8kriord9epqoa7vs4jxfo59iq40utfz4t3dfew0w2t0pi38mg50pod5splagweh4vpxg2ypuv1oi2vyvslx9amrj3woaaigwl3mqbz1mblncojdhw5a1ij4omnilhpd08vbs3nqjel1wcxxyhi9j2r6m60qboqabietf96omshuhhpshmi8dfa2qxr09vs5iu3sya43fqlnf0q18t86auhb2seyyok760lfzsv67fpvmac3j4rq9vm223ch73503pw6qcwlfz3ju2igkkym9rrggh94prt52q53sh66187v9yhei4asq4k01hnotx7954cuc0a8k7nlmzak6uyldxwzp73qrxbhu39xq7qaw2rk43supq5784huqvltm72d1hh12x8i7dqb9dtxsur9u9korlr1h1f4tktov53m4oh94mg6obp36e60nfryug6ugrp0qtcyp3v7p6j0i68fk5w0ac4vk0d7zo8hnkyqpifubkokvnqolso515pp672qnil0tqelgrw98cnm7rdlvgg251xbkte44xehsfajjfgednqxl9rnqnhitu6wi012cexzdo8d5p5c27nkctgoilmxt347rvth73fz55d78ale8zn4gox7znev7qfjkqowyjkywekt8vh9leqixryt7ikh2snd2nutdxvj6g412rpm0h9mc97paqfrmtfg9npf7o3iwzrkxo8642dsyfa7d54mkzwp0kui7l8edhm1kohn660zxxpabgll5al7737kz77x498dhihwv2ijf65ns565rjlxmr6s6vbm0ujysjvkcv2x4u3a43d3jqdylnd1n81yndjeadwut9vslz9kja5e8va99zhclk8opu32z7asu64rog3g58z5qhqf3qvlgc9izbw27dc30n2vwq8xt8k8o02rxst17z58kelipkkwven5tdijtpqy9tlpcqepzq5zj74svlm5jkfaw5omx1ap3cnqrvkocya3hxjeq4s5iny3l6s2wxu20euex1l52orlyo621ybbck02i82re4jpjbxe3gqj',
                        expiredAccessToken: 7199439098,
                        expiredRefreshToken: 9491179446,
                        isActive: true,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateClient).toHaveProperty('id', '186c4a04-901c-4fe7-8d6c-d7d546f8831b');
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
                            isActive
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
                            id: 'f1cc6551-0024-4bb6-8a06-b12bae8eeb5f'
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
                            isActive
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
                            id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClient.id).toStrictEqual('7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda');
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
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd1923acd-a155-405c-963e-48149471e76b'
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
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindClientById.id).toStrictEqual('7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda');
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
                            isActive
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
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'c3eadc85-a527-41ce-b90a-9f6038e5c1f6',
                        grantType: 'AUTHORIZATION_CODE',
                        name: '5st093juu9s2g28nb1hviznnibbu0zq51cy4v5gg94v4jf9tztvmvdyojgs51dj7d7xjnmmzix1qqszw6qnn123f774i4g5wrne3imu2bj2ygz82x3nkaqfq9851exyshshhmoe4k43k3offtqmhem0ub3gwujwc146uexdx20hwvhi0noblws6x25st9n4fgej86gjozqh4s2ec17c201zg99vyj58kxsokjecy277fp1qkat6jxzzd5vtd8ur',
                        secret: '0tsy198f2ukpc7ingtli27sxtnddg12hf4k6b9yw7ipx4rsrdnwy7j36znmtckesgqwxngot2kac2jec4en044yp91',
                        authUrl: '3vcb1e2hlz3q5rlk1b31e775ndymq6ihz5jzesc0tyl6pv8y5nkiy02hw8ixv407y9lm8if5dau5l7tvrh05swwvz5owgfq7ydvzxgr89cfjc3d103dq0zh6lda9r3zqczylzg4assbi20q9ssnyhuiekrrjex6y8fgc9bowih9qtwzgs58cv8k7vzpqx56c0q0o84k1rbsqj8jedv730vbj84u8uunuby04yyrla8ig54obruqd51t8smybeefbxmclbtrfopkvpaoky4focy6hawa9evgyv35vqwrovuxtyiyhwlvyisik0ps1f7gtfiac6shcn5i7ciryo1bh2aztmr4njvxialctihdqe3ukibh9ycwixcpp1jgbpa9b7e7u0dbq2ievstp76u4tjk12uir2tpgb72cqs0zgu6qjvqzu6nhqgrktwn3tskf5wjei5gmwro0qvqysto7q11ai94enzeg69pm32jnoyigylngtfh26zsru0qvrpehouzxqpz9zo4bp97min25i7czc4bg1jc3dy42nmiure1r01cozyfxp2t7549rm68qp7rrhndajzgn3rje17a9ihgtll5hihvzx6vg7531zz2mvb931975i1aek2197f0o2fhz1iovm44q778sqohs9yvt5i2w28qjrtpnfw0uxy4trrnt9r8pq7kw4wz3rz38i2ucy4j2rtoaqchf7u9ynld93pbbx14ba69r7yciaokk5iydzzte07iwf2s5quyyt60xnnzkqtbwu38gmct4qww50ngcoyjr68k6w3sch9mhbdibeevkgre0l4q9j441spcxsu9zd5amf4ong2wvbrsyl68kleiop8mmsoagc9s1hkszunvnahr27n4sligqu55mndp1utj12trl0mok17gc7vp7frf2ssfg35weo2zakyhvuykjk1ic7uklgor2b29ublhnz41ggyavhkoivdvd1vdjyscdf7vdi0qab6cknkpm16a2587p51afcuoa4c1hi4c6faq1axw64ohbjiw08jnvnyqvqw4h3p2vwyknmascs8bj2qgwb6rx4uic5iazrr4lbjzcpmeik5uan9gqi5qgrhifmmunf7h8t55rawimgobs2p50hldcfg1xnexrbob1beksfa87gylajw4yijir3ichsdf0hj28wxu73vrp971kc7i44j21y3qns2cktmhxkbwgbz0nb71lge4e4v56n8k4yzoz9f493nifpr3e3cs5a85rz2ra5tza3sehcjchpsm7kcz5impih6hld1rcucbtssgf21srhcgw6nl2jwfsp91m4hfp77bb5pet3x7rodwl0mrawv0pu0lzof9ip9cvgien42w7es7oupruj2wyuw2weho5w4k820dl0ioava1125uuiaexpm8g437a2j93o3ei8aykv567idrnqhjxwjb9bt5u9ovq4wca5q85c61u3ccwwe63fzaedyrm80hfjysss8g8ydeqmywlwjmao90vfu2fv9dz0r23pkvtbrcbrpcgxa2z9sakeeyl97axhrafkaw48vb9g4f5igr5kwedy93q6p5ftg82sm9tx3quqao8234b468mfiy9rxisfw6xl9qkem45hlm4mx78t7lm6ro2ayeky87joz81kamtx7c9sm957rd1fyqliygjjjbxh05q46j39ix0lmjxwxsgplc3np1yv77tuobhihgogbhxf7t9vszrlq7e9ouzg5zet8m14ex6e12ho5ovjemf6hn9iiwjj8obcrsfzogaspvatvzz8jq9wn00l65schd9gvkysbw020fj1p8n5j7dfalbpjcb1q9vgaw1ashwmxsolw2oonti83asn2h0k0cfy5q16wri1w8ghrhbmbv1kei5965hlely84caultd97a3cqg5tzlhsrdd8hm6mpr9im3exx67h6ogxkafu4r9dpbr4w6zvkpv7xnrg7qhxe7i5hujjjf0t5fc4yc8d5rjpo2rnacirbtmu3dupgf4xgmgf2cus',
                        redirect: 'fvzxc9pmwmndiskqsix3kitswqjeej70zwevgjwj3fcrhxvhgic3l1ztuyy4qbpayjn1402hali2xeinqf286ad6aduhtek40lt36ysove8onb82rt930mr551g6861iz1056og5r0emame0p6i6h7ifckcufzhmedljxwe3b3x37a000k7fci9s28azgiy0xq54i9x0qih0evts7fh0pde9wqb39ov2v7lq0sjbvq0ga1ojlmjmlqbs928x5tgux6b9anhts4i935lbv8vqctdl13yblqo2ezyv9665kp7vvm2yzeq0f1vjlhna3w0iod334il7aghquwejjwaqc5r91usf89r9ngjyeymg59zzto3aol98vbrs6mknyl3yf32xcume6l46i5b5kin18sjim809jur4xw3xaug03bl45w9xsf92xzztwxabkt9yb7x2ke87hi6q3gph00sal02tuuor4pj689xpx3wzcmc834spg8kmvsbrn079tsskj6jm54ea83td2zo8gox8r6qbib0xnzzznrmblr7o1nyhiiwi1g1rzvk2xgzge2ob4wja1ggw6xi2210hnlv7lxbo3ad879bf0ciyyjgg4nhzaviusnu05heua0r3n0zlnv9rfpz18imqchiamusbi9ndcdusda1iyfxjrgtnv92rzw52u0em95yom1uoxnn6e1ei4nm01p1o07ug72a3xg70md2d90u3bam6tkxuffz0tvcuf5jgfu3pd234341eeahvn2maxr2nbs0e8cp6f3gimnznggtewuweony16gz0m2xvqne2q3dykt1ll75jh3k5s1qwbdpir43r1g8gqs5e9ib0pcm8nz8hmu1z501dtkrzdc189531mnj40wpkc543uymypwgu4ltrl8cbhzghm8jer81v2eqfwvnla8qs7irpi68x1542actge7un7o252z7pgrnq65wi6aa9ag48fy7byag85bpibrsu6o1moffstez29wzbyep1oivv5618ow3cemecc1b7wal9h9g21uit8a4h4j4aqpnez977w0wt9hizjos5o33jbiebg2q3sgjzjhwqqtnme1mje2j1w9w7n5ta39ywr33qxr9phty56mmvjjdmgfb3k5txjbfjgcgcg2wuliynrcxr6fvgqgaxy4egyswnznyjgwhlxnevcvqzsco4sv1tbuoj0dmqsh5ykfnd1v7a1ep7qosyljdu1kz1408rf5diyo5c2odsuxfya0ie9j5jhnk0liedsbd4e7iwv1eszigq2rz9x2m9zvx8wss0ggqlu0pm6cqpazjivihk6cy1is85wdgtomfwtr3rqlfen0b90i91ed0jimwx4aqwcnexmr4rsdt7r043c5oleq2vy7uaw54wwphixtez6it0gw61hrtjvj9iu1f4sjwblgu6zldp3fzcmklijg4o6nq6g0vyw97k7yj1t757qwdgyd9lo4rl98izwtvd2vz8q9695xkrj0lkutfcg59a9jsr3m5gqpiyrkcxfylm9uxsyq6qdiu9vhgk22oatfhouz8ueesapdxi2yu8w1nw1cdnu3s5ntoomlmm94y3nebshdxzorifaiezfubmv3nsd0jq5p9z6d17ru1vrc47lqk0fhk4je5pjc1m9o22w65zblss1ubgqb9ipja5ih08tn7kpe6srvipsml73zptc1v165km2ik1gcqzowoox1y9ynz978a92ucgzvovuur2nj72ikclpgey6jokk5tsta56l003gdgyvayk5bwuex6guvhjr6ehp9t9uct5mukq8klvm2wxpei9o5rxb4dgno9jcdrl586ctvk570aslzuydn5f1l79ohx4wk16hqrasqievldenvaku60r2cad9an6k5ge9l995195myx4yji5yfbn7h32oflhxn42w07wx6ej2z34t2cklxbrtdvhwzsisiv5q3dzw7d63pcjnazirfzgbvag9sqpurd3vtlx8p27dya5wb5m0vug8z02wya92x4r',
                        expiredAccessToken: 7452829435,
                        expiredRefreshToken: 4969822512,
                        isActive: false,
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
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda',
                        grantType: 'PASSWORD',
                        name: 'l0gs192bm0fy6iaso6sk1tz4qsyopa7cidvsxz6ej2mdh3iszc7so5a1goiqfuodmqjrocy43ytq3ubv5nmf0kms4qwno5xb39egneonp83uj09oiw1vvivahz5d7pjgaefb21mubt60l72j26mblmndscajkzned98v87xseqam5l3ixy5z48clgbvjn20cbyez99l83855wssj5tawn290ual5qq800xu9hy61w7tjac6ps9p8z1yy3cgt1rj',
                        secret: 'yyp8ssn8gbl942wfgo7uf2dm19wz72o18sppl76phbimq4p0sa6kn6mscqirpd2lozlfybijrflmb9d3jxyr0gbb53',
                        authUrl: 'agl1ges066shka1742p4jxpu1pqthcf6yjsh6jmdxtz8sqwfb2r3ubl09quwvdaycivaw9q4qz7v7bhu2p18ysgc0llmhumeow3qp8yu4kk5yg5mfr37bwl9w82y97sqfllkf0xrcdsvhm61vmt96ud1tgmp84gfdkpzfuqk2bbsg5ducuc0gcf7j6yaif7xzgw8in9vq9km7s3x8mmbi97u0k02rv8s3s79rpffse0loc8y7hd1lu94t8jh2c7pkghfrojfbdq2oousu8db1e3lh9ugk7p624kuqls7cd64c0a3urtj0jk6oa0yg0bt8j07plpo1t86vg1mi9rkpzsq3hibcm2tyhh23cg1rvnhsjedua4dd31rguo92uc7mkmo7lxhj9bz309ts1ts0fr5nsrc698apw57wvpf9jlp0us0wxrlajnlh7t37qxmd98c0mw0qkksk4eb6o86z3uw4s5nojrd91ybqf3jxfj8nra69mtj68tplifsh9trr3o9w5si1s6r0uju49iwbtejb08tfloaehbvx0p5dphn135jto9ihazutbvachkzxw849j6qhnboibs4ew5a5l5h5psauozuag1q66ofz0kpcfcxx72wn632xj5czq7xhe6zckfjx4bvtdlp2ivlhvk9j7cynh9ycv3blujmsuvkrr1d0uncf9qegkesvws962rp7zrb1y4gst0bdwdj0oet6itvtyfprq2opamvxkv2ubrvlo9ijq0i74yk463phvd5cejktn2kqoua0nfnmurhh7hcdr4hcyqbpxfc0lkoha3oe03w2zvjuz2c5i1vdae68wnewdp03x8dpuq561yrex7eqqqiwoj7nw6qb54k7dgb4xxav61tpls34oj8t8jyqxezp34rab8cu54rjdo73d2rww30vqmij02k9c4sup9be73lspji1wdke1jm1skp9br4v8kgfkv30d9dy3x32t7cvzz6aantr85mkrm3yehnisq2ubv15px41j7ngf6maj9hagup507q52ssm1sq80gwxz4a2lq9zjxp8tzwxrjckji1fqfzkndxs56b291erdyjacvnefcl0w8oo8wdbpehs6g18fdwjthpb4ks6sdyo1yb7hcntedafmqui4pf6ycd50gdl8myttlw6b4dfglmif4w5qrpsd78xjdlbkfbfe0pvgnjiyov7yqwoshlhnoxeaz3gf91ivldhrskcp4p510vwfo82h47tx0lk8ar9angsk1ppg17l9e9j679e13zat8h1pqx68ow22rlyu3p7fiw1j8e48osrlue67yj8l9ekbqgrri7ygil4sr81ow6q08zm9gifaa4gzxus5lafm3zc2tw7t7mxnfhozzg9tksgeabo5ifb35tls7qmrh7fcbnvyl6mg4kicqsmkkok6r7fphz95sgf77qvdjy75r6nqpuml2v6316m7myyoq0wzujazrzjxlvk9yfcjloo0tqve6j9jbgmtj7k782ugvtb2yji4bvxe3nplpsxaxtly0m2in1yda3n84dnu6863pvwxst0nltiuhdd8rxg1t0031u6lra8avqfq31j6gr6pe3hnnm0y9vv1i1k7sgr9a6lx7i7kiogruar414yhuq4rbu912utxf1cwytt0okx6oy6ytm4xbisx86ocfd03ehe9hzsf63qstq2br7kw4h1idsqstrklcbpaco32ysl8fahx2hl6adttywve38g8p7dgac336ah7s3pdxb2tm7x8za17en4p7g2ghnresnigp4nts3ailahpc9f91wus6d9tbr1nz2bx58lqyas7gmw0t79xho5bye9anxpchte6lu95nrrymq6esajl9e9im5nzhweilgbp0b2jmt6iwk0hriw67jh7vo468seo8vhylv1f6rivsfu0e2jkji0r7t81obacwx2a1zghwjniza00uuczbx4gl0zcy3a11brg5mcsah415phgw630j5vd9mwz4lcea4j60zwwtx2jaqver6kgt0e7hq',
                        redirect: 'pnqndcd7ag3jli65he8ciibkj8x3196vwuonw2ge9w1kbne6yyaje0omy1902zfe9mwhq3427azndmf2nlcw2b2i7hbkqoii8xk6et24sla47nf35y2fzfokk1w7wn9ainzuumifnawl0r4zx6s0k6nq4vl8upzdrnxchn55n6hen4fu6jsb9csza414vkibl7xco6opsc5mz468igpifom1ozxbpzqta3o77d6fejuvqm2e47sh9rft2dau3fu7xjc3p41f78snq068kogh46ntykveo2h10txt178bj1upe073310outhr5mzs8w9rmwfbf69fwmxv6y6apir6ohm10eagobpmuyesqlmzd1hiqhmjjsnezfrbv90xs4rj4rbndb0zxc0kr069i8zfh4zi56ara03k4c76ph6x5zgf26uk4ow19uzraa2es795becxmfbbz311npqmtz9f08bjwitgktrdnu8263vc18cm4au9lg5i0zt7c8qb3loi64qhryryfsmibn0l3zi0whzgbgab8wwngs7sjo4i44v6ziae6kdly1xdfi07taahy2q6mfl7sm56ltsbhwn2uxf0co6gtjlnm6gdmajfn64oounv9gxhidwtny6m0lytdpi9vmvf0yy580v68wk3ggp5xnf3kvfxsufaiq0rtvmiva2o4yxuy3p32p458bllpri50urxtu3zjyejo6lg2oz4t7trmr04kko0xlc7rqluuwg8c641qqb08xgbv1ywlic1gos4qlcy77nsfz77t10jjfkj35gjzgumj05pj264jyny5vb4mlzre2b3zwv99mwewulwswbx3ex1obfny90cyf2fnsmbpjyuf71e2vyfjxsh6szv7b94jbcqayp7l5hjybqmcuegcfz3w1ojxflc97ulblx61z92jt5xefxl3echb6r32yip5df7h6122xjr9zs9dxecgajl968i45il7cbyrr7tw00mdjd8b2p8ikme9ma2mckart14abe1w8ykp5b6n5r6t103hj79t4a2dt0g5t39sgm8rsjs36l3vmjvytjb1ciafgmdm5e8qkzqjosxat42f5ofh69m8qsbel45wcvxdbbizwpy4f4xtbein5xesdkos0s0dq3gpj88x49ja6zkuvgh5syn1zgm867em56heo276alb2usmilo0kfensp7d5q9o11rj3g6otp51d3hr3yb9bps1a67yvdpei38uely5az4vl8yasm8rqzd09hkkx066ce0jqnemzafxnkrfxfjjbu5q512v80oe7u61s7ebtm4q85j3mbq9669zozso7tzincjicn00icfon5evtc7tuxmy1t1oqje7l1ag1yz1car4y3rlojrxhbpgwssw0j4jw11orjilgzxd6guhb2r1avvjcpzopf8ngtv8t73epzdovp58b6elsd4tl42n7jpqbj3c1te579wayegurbp58khy4jprtgjqf833nliahhysrhc8nkdfxa4ugai4aarqt3j61jxnfhelq4o2gaivedz2skhxokkdw5ugf798men76w5k1hrvd3i7gw8kg82tqi3fsg498ncib8xm8yamk9dk8kbzdt9hjn5cvfdhuzn097j5iu6aio720vstuomd27jpl1t7n5rom3p2psd5ao3tvvr99d3a2xjrp6g1gb0p3n7ucw5hn3zketsnxajf0hycfhvhde3xanrljxowipz17nv3mxbgq05wxj18ralnhtm0gwfas3eznza3bfsizlpkjey8iep3yd5nfp6kfei95e4nuiyzigpjttcj9biipmylwv67fzdfjgyolzzhamt5ggicug63z93r4n3yol9yawt0fw43o2om10j9mjhdpt1n6mnjsr92m5e90m3tbup7xbc3hv3wszy4iqm58edb9gst59qwfh67xjz6m3kfey9u0gaj4tlt6hnatz9qmv6c7yr12hbxia50hqawixz8sp8xeaivbmylf0so0m4ctoij8vuuwqajpo12oaiim326',
                        expiredAccessToken: 1568282284,
                        expiredRefreshToken: 3130463461,
                        isActive: false,
                        isMaster: true,
                        applicationIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateClient.id).toStrictEqual('7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda');
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
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '9cc63c84-5248-43b6-acc1-893d85166213'
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
                            isActive
                            isMaster
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteClientById.id).toStrictEqual('7b8d49a8-1dae-4a6c-8eac-7d54a1e82cda');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});