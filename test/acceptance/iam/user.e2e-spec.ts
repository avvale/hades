import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IUserRepository } from '@hades/iam/user/domain/user.repository';
import { MockUserRepository } from '@hades/iam/user/infrastructure/mock/mock-user.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('user', () =>
{
    let app: INestApplication;
    let repository: MockUserRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    }),
                    JwtModule.register({
                        privateKey: fs.readFileSync('src/oauth-private.key', 'utf8'),
                        publicKey: fs.readFileSync('src/oauth-public.key', 'utf8'),
                        signOptions: {
                            algorithm: 'RS256',
                        }
                    }),
                ],
                providers: [
                    TestingJwtService,
                ]
            })
            .overrideProvider(IUserRepository)
            .useClass(MockUserRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockUserRepository>module.get<IUserRepository>(IUserRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST iam/user - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                accountId: 'fde8668d-5372-4f00-a17d-19aa9c8dddd6',
                name: '3xjq7mpz8s09hucjdyb3jt1q7rn9eq2ek3jrndcvet4osfv93khy6odgogvhv605pa1zsmapynods75w04zepmvbkdq0c5nrgrh7s36tnv7cb9vuaox3q5t82qln5fht1fnub6xhf22lb9ipaxagnn2479ewskipnniqi230jes627o3ab22wjyxg94g9adkngtyr8tzo3udifv2qi4jy0uiuhnqsexesuatshgr444zodiyeo7ouhdo7mz73x6',
                surname: '51y7yojxandh421nz6yuud4vkcpvn17l6pp1p1qhfv1d36oocymfhqyz7zoor7t70ig7plgix41e24zwn99w2w5za6mcgryi4gwj1kegyi9z7mnm3b4x23qp96itqmexe046kbcj5j0qez8xpr1ktf3d9yddiu60hdj9pxwbeeesx18bekm5joihw2ig10ti1pla8morsns5ais842yrx3bllip2dgu65j90swbegaxnxit74icj0in5uyoy8ea',
                avatar: 'pzvr9gigycoysa2wgr1yxq8gj2iefj26u0o3p0q4grzujh02262aby3bd3g0jxb9oa4260tjrq5tfm0vspjxq1ag555cvst1qis69sjpjv26kdmw4zlm5xzvqipfsuz7288dou63rt1bbpdbf7fo9oc9doqohxhd1fdj9594bzk82j3qpxd212w4p54exm9i7rti5mxk2a07u3445kts1yf5dh4tt96qmvqnypa2hw59idjy8npi16lcnlnjah4',
                mobile: 'd58yaakomkidbse3z6tva4pbuer3v72ddvk9io21f8ds6onnv7dydp6c90yv',
                langId: '472d16e7-4c3a-4ed5-820f-6bb2de769938',
                username: 'g7r3jim2qmcnm09pgyggzmcq4tonxfu3tn72oyv4dkfeuxad4ny5u00rvv5k995f3xuakb75ampasobnoaeyyc4ett7d87fq1eldd2buh2ntaxs29w7iwdb5',
                password: 'j6r12g2wodhmblzu3v2dvgkqhv1emwb8v8ax5kizyrt4ffutcqckcrzcos3ccff7126iif3c5iqt3tt6yke7zc7xwhr2b7l11336m9gcfz66qfbci68ziegxzdbm5ly0s9g9bloilh81nv62n5c92gaa61qho2jpsnvlwp9eug1z0kl5kuv9s09wcvov2t7j8zyaqtviwiybmmh59pyh39zvxxal8j655puq82bguyb7e803f7r2ixrmxlv6yy6',
                rememberToken: 'exkjniz2h6g2tb5j5sed2y0gm4jr4hiuz5sktssggto9tbtglx6wsopduedd6zeq40waakaxdz1x2a7vrtmgkdajqlni9wb7zvyoucrpfw86oyqk99jblwbobwpuq4b0jtv24xkh26tsa1zpb4qhudgthwr1fo5lhhglc19ur9o7go1tpr5vvwom58rkoco4ml390wzz3n30oyuinfkgn81bj2vvayff1ljtobm2uh5bv077vuz917da4rkxvz8',
                data: {"foo":"Bmlx}wHq^w","bar":"K0B\\kXb@Wd","bike":11684,"a":"1>8<`!2`KW","b":"Q6$.>[[IL7","name":"!v>^*xE\\*Q","prop":"w!WYBO}&hq"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '78adb3ad-b3bc-4bd3-91f8-188d28162be0',
                accountId: null,
                name: '5pp344yvn97bugx437zi40avj9fpmdgcw8h7c5jyp6kr6fhqn987sbmyf6jr38z881nhij5e730m9o1ftz4hg80gh3yk9mt3j9lkod4zw66gx7p5qu67uextcpei1dfwlw04l9yp26mxzhl35arz8a1ineoinp6p0472058uc0dfpadfab9a6ut6zlxvt7dd3az9ho2rdefzb7y6kohlm0gk4mgfarmzfb6syh0z793jlm90w4gr8qu7039bibt',
                surname: 'hq53gispjocunjhbg9i99kmtnqbvs5fcb2nthwk7c771dyo4sqspe0no3t93v7kbc7hia7tn075wmefemsbaf1yedc4z80s9a7p24y2h03yb4ymaf7t89j092ua58q3h27tnr1wfils0kh5uv64ntnouf3jp8b8dq7gooqhfxo91tclof06qeuaqwwtwcy6c919pgtw65kbo85mavrizmmubkyb8a7kcqay50eh5hosc132yynjnhppdodgidul',
                avatar: 'xe5hwvh241nr16ddylwfrzb1079sftd2csdrzojf2kfnvw9t5mupxws4fymud4wmjezwgty60gpkuoptsenvcd0bzoa0rtblgr6oe29u1c75ojyra7c6es8emd1ramgn79c4li42ly0ob1dlbviwczy2151g1317e72hkjy1yyyx4t8n8q4l5qd5b62m2082a4jmyvmosfa9r2qvfbax4w64lbkb11z37q0w563u6flg0ecvzb6cyoowjnu0msw',
                mobile: '54xz3jhbobqbb1wkku2j65mg0tczo9j9bozp8kf8zp5dyvp89o9rg9my48ql',
                langId: '9ec619cd-c12d-42d7-b68f-65e502243f45',
                username: 'cos55cams1kwd6pfu7jmga91f7uigo4ovggswnh2anvlzc3v2n50nsr7957qia1pyh6j80vvauertu8gblgkgehk4ck5c6m1j4q357sth9sia0j0eri7frs5',
                password: 'twt1cg31testv64r0mr0bvwtg8j1fuxx7tmfvrshu4ww1mufi1c0qr7n7d3bzx2w6hbm98qnr9pskoi7j8qqngt57mnio9gtooart7jx3tyu90c80xfyb5eu7ok7ag6zidkk35trduoa4h05orhxbes7b4xe49nqzsa6azbe0rxwtm6iafrskwde5029btt8d0r7x6zntzdrplq1u911ymsn5unzz3sp4jnsdkbml5i905dqigrq880va6u2gx9',
                rememberToken: 'fc9fjwfr12uxszzhhb92oqfuz51qtloxvhdhts8sgjeavbax3ckvg6v2nlzr89vflpmj25p8m2kgq2kl8h0vl2tyw7e4sy7jqyucqw5twfi0lyps4f8bsg1jmpgcxq3n3w3c3zv1aqt000w5nv5am563qkt6u6i2ooqkvvf7ccf6cw6x416b2qiz9unrvx4vfyaqnxv8gtwoy9a42r0wbuvf0i3os2eite17vz3pcydn5aqr6ful16lp5i31xj7',
                data: {"foo":"u:`]8LKoY;","bar":55627,"bike":"wL@\\>D[hKG","a":";`iADZ+@p.","b":"@M#}.U0Z;S","name":"-BJ;pZ>cjk","prop":55044},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f8e03f7c-6f27-4964-8fb1-e024dfddea29',
                accountId: '2821abf0-aa3c-4897-916d-f59b15c6ce83',
                name: null,
                surname: '8ev9gq810r87uleysbj8o0yyedari5acxdukh3v3ek728t5jwg7ye930zqz2dad7d6t85njcjh41axm3spcd4mqh440xgqnlwua3cgmejjtpa2u4er6mu49r5x5ip32lihb2h1wm1t1bzkmu06kx1i18d6bfm4v4hd7g1on6mg0y4cem65ifd039flzkciqtjww5gpl2y148f24gqgdyh77at2pm5078825ee08ru28hswwpo68up2xhqzd5yfy',
                avatar: 'pa6701nhcbej2unneujkgibbpct4ztawsdebcvfblvq6eyqz90yvqegx8gh0xdszlikqgsv4ldz07t59sf5ysnxmo1kch5bmin3rl8eh0ktlpduvemj7vpieq2ezoe6ruvlrbt7lkqkha5rcvga5a2ur3sc9mrbvdqhlkc8pfhlm9y8fjtrs1x8mpt7m07vhjbasmey4aj18dudwyrnobx97jd8ia8muie3rosiqhwvrpb1jikcg6n4xkokssob',
                mobile: 'gpspf7kd8h4m8p3t466q3bcc4jwefsi1pvo64e3c6cx7wsvd875fscmpomdx',
                langId: 'ffe68aaf-bfbd-4f34-b02c-bc0695dd82b3',
                username: 'y3t4kqtdoy6z4xmdjvo08rsmitaaochiyvvb90rufzdgrql6kb8o8ilzezjwwoqobjwszmw0elojhkx5m5bfponj2ufxpcwb44hsg27fan3vaiwm3jv402n3',
                password: 'vjq2w131bwxsieetigr1j1puqnrj7mu8kogymfoqpbv8c63jgwmsxtmy7d20sin8ud9h00pdy2octchs8on52hrerltea1r1z3kb7wr0s1xkpkuz2uir5pnlcxqriy7d062yrzdtfpn7jmk56ohsgcklws0ejzxu2d5d17fc0bxsygfvdtxabvdj9t3jr1vwfn8jpqd9b8htp60qylh7jwt8ip1c1sqry1gi6s33yufjf6w8cl5hhj2r4gokdya',
                rememberToken: '95rue7m9z4sbe9c5lxrp0u4aby8kqaboyrw9zekheanhg3vlhh55vysmoz9xzkmwnz43zfs9j2959b1uvslbzhe3zhna7xi662xb7ciakbumtwme967ozjuso51tgrsttv5rox6gy845d29oh4bwgrf3zoystalkkhburt26hzhugcf9mf5mkyf4zgt6r3kjj4dvi7i6j1sn42m2o9pdznx2xkx056xajjrs0vzu1gsua1umh3t3u7e7c02ig9q',
                data: {"foo":"K.9/,?.8gR","bar":"K@[lKm&S-)","bike":"FsCmsl[\\G.","a":37079,"b":48756,"name":"k+?&pyrWh]","prop":"+q2asB5dD3"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ad9351d9-0105-403a-98d0-e8f15d00d6c2',
                accountId: '1364f809-1c5a-44cc-a5e3-b746d229e9fc',
                name: 'zq98056top9jfl6m0guql9qqmapp0al5eyo7eojn32ank63hr09oltz3ihfny0482j74ktt5pz5kz8rz1o6ys665v6qjsljm1c1mdg5qyzez52f1lpcwfpr3p6q4b39gxr7w7vh5m000wtbslyl1x87g65rzg2zsumgqoeee2ielrrx03caci6xlhfe2up83pn2u0a64kfmqc6gzzwbxtmtibdpuq1ryfdeew6u2m45rwg7lp1lifzzm9s14567',
                surname: 'pc5q3xor7h92zsibrtl1dmoja904cjbm3ir4k9hokqd121kd809fduri2rohs3wm9ljxa60n0acz5llqe9wml8i3xli34c9wn2xau21svy6sg1esgeir34vvxamox5mp9zo8ot1hggdo6dtzs2to87nfqpzui61fhh5ltq35mdckzn6vbdh0td453uedwqleuet8afed660d5zjazpf9jn217md52rwf7ql9xqppgygm6khgp3pknvy7b9c4nd0',
                avatar: 'ejp95ousc5pftpmkwoy61iqf9ew9xfxe3jajv6lzu2u362429u9rnkokyvlunztn36etmob5af0pkm5onazgy25kcxvoqwxpems3ftsqjfqq932k9tpkxyacn3sd1f9zyg3ktsceq6adzxf1v82bvyz9dwpqmfcl2v6v3oeqq1qyw9x4jht49six5ie01vxpn7x3wpm9i2u2yvtrbrcbxgkpyu3q5xho2qysz0qt5z2wvivuj05qc9uops8kdpe',
                mobile: '98yf38e9kz0xapcpslqyp08hw6hp1emn5e5yky8kts7g8rfuy35r3fus42qp',
                langId: '2bd06edf-60cf-46d5-8c7f-cf3aef3e47af',
                username: null,
                password: 'gp1ba0ew4j4qrtd1y3bwlzlvuthxxahvvlo4t66c61mavf19382b0vp58l5ltalvr26g3jfupw6hqiyvderc3v52mn96jqoldq01ibes1eo691ouyfy9b3nycxp00ut1cdil67qw1v2hu78vv2z6lvd7zp30rd0aqthebsyorhpjwyp63e1tmld0w96wxko26r239yyfn1w4wpv4slo69a7vpv3r5akj83j6006qx95zzckhhlt5rf3obct4hm8',
                rememberToken: '2pinhthqq4y774v24hperu3pv2682rsuf90rivzxqvimsgig56r11qz319wanuni8t3h0gwc1wt3wzl3de7dk8f6g9tq9udac3yfiwily0ekytxf23ld7wprp1ly5o0jymtvtr9xplo76dt5hw7464wxghdaxu8vpun29pze2j3dfu0wx824sca8qde7urpwplfz4k1neco43e04pepi7kil80tztf1dki0gjya19y674bg9qcudevgjn720pig',
                data: {"foo":16946,"bar":"O6c[iHp./M","bike":"]N!E$<qa[/","a":"i_%Dqg?nOJ","b":"86?4R&\\U5B","name":91192,"prop":40801},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '00c7a52b-fd1f-48c7-92ae-3a7d9d270547',
                accountId: 'b1c8226c-f5ce-4baf-b9f1-daf8cd7637c3',
                name: 'vqdzv1wck273qvzj6dto1f697b10cmr13gh7933xd6tvw5to68w9m8cas0a4qpaut9xelaytfd1qeryxah3t386w4lak1go5k3zjf32mvohdod0sax3urdu45u9a1334v30we9ttu9h7dlqfwk0kqaxliuozr4on8s09i0rexgwkhl394qftso8941ycg2bofwoi2mpeokyeepuqk31me1acmga2932zel4mry0kht3ncw3x6iiea2m50gfo0is',
                surname: 'gi6xjqxrwomfg3jf2pejqfg1j2rz4ogxzr1psgnun4v4aphm783pbbh3es3ua1sr5i5dbdyis2cvknui172xy8ezzobfjs8uma3uotj5gl1llfom7np3t2a1zygnan6pijmnzloilxo5mp3pes1rrzdwfnzm0wcr70ztlx3aw1u93vnk8kko3qx6dp6jn6piwq93fxfafolpaea0snj9xvvpqgw13xzep4op4y4i13papo8mze5idpgxubepke6',
                avatar: 'f5318f028q0f0fs86ycnsr4a7vhmk1m82lr1ngew948qp55uhqi419pdnnva1c10lab4qxyw6v6r9n6n4y9z7fsf8vbud66qahawzpipqbhrh2fdjyuvhrtvguwa9akm3p1rjyfykg0g1l582syvtpghtuybopuxc8ws5qkm97x3a1pvpwixblmibfk3o71lnlat3m4sjsk2aj5e3l8205gvxktku4hnauok7hy1txq6uqxrvq3t0l6or1gcwvq',
                mobile: 'kevz6zuhp4ymy0spnflb046aehheyll97mgjxnv0qye1qh46vukk9glqq4ob',
                langId: 'c3b74eb4-5ef9-4a96-80c2-d427b14e05b4',
                username: 'kvby9iih0hngdouriffm8yd6gj2986p18ztifmo6wxerniasahq6n8yt5oy4ungji73sfmfapcm0o3bvvtsajoidal40vpa71kmihej0z0qxaif3ymmg8v0t',
                password: null,
                rememberToken: '3l6zgtb4nul0mgnu46l82v617sz8k7h5k5ev74yo4dyjbw406tmzv135opc4r9363zyteuulm4p5a5s14kqezd21h98fiahrby6re7n2f7bn9kj9h0mxhnz2t2lrpgs5v7jt5v1efpj1oqa4b8w9sj0alw0x5jtgzzi1rk9fdxlboyp0chhrpprngbzs25qzy9gdxs1d23ippqnt3yv6mi392ijfyepnsf5t4d1gcqygtfknxgsjdnjmqawmfhn',
                data: {"foo":38989,"bar":"(pJ{+KO/)b","bike":20642,"a":"IukYAbayO/","b":"@y8GGz-g?&","name":27165,"prop":56362},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                accountId: 'd5461058-bfdd-429e-bb5b-bd65b3140a68',
                name: 'juypw2vckya76gykqqcg7tplrzcoyj43l6rie50en44ou9prelgo9qkzhz7dwma4vsagjrhqojt8d6uaz4t9wg8fylwll71mec272awexo6urut9vsqez7s1aer8pf6ekmsu9pqly4svppihcq13ohfe4ijt8wz9slh8bn46vw52zbpfen6he99s06zq7j5d1xvw2t3dizhsv3bihwtcfpapbgz1rdpmb8tdumbdnkmsujpsh6i0d6ziqdyvw4m',
                surname: '6kgyjv0sz7z5gkk9aiiq6oibg0ild7otlylaih5f3wkrv4ccxwbu1p825szy2g3zcub2dup2uu88yigoglffarlg3yzn7wgk0catmnbhj1u5cxudaam9egkk2ieo4jdnd2wpqs7zqb9iamv5nrzauvf279noh1dlben01v1fhl4zjnftjtfw8p3x5authsl4ftqvsxdq143tlctbs4ewo7gcugucdtfze8vddvbapqy55b4m84xcoieh5wscla2',
                avatar: '7q8yvizlm9l7jaco7amm4s2o7pi6u0kpsgyo3bfat8501aakpxwt16q24v0pjke1mqd6llkfgx0grapwq1vbm59kzuwiu8mn7reibww8k2p8dkh3kyqt3tifir5htq8dasj7bh55js47we2spj8hcdfwuxdaewoz63bqroem00dasv3iohoqqqvie8346ukmb80xta97wlpvj1i0male3zt0luv45vlwoqc6lg5u7rau2gfogido2z94k3ymln9',
                mobile: '53alt8ajbspjoi9shhkote2gu8gbxvqto4r8vz3v0bba0jowh39xfbsjsxdj',
                langId: '96256040-7610-425c-83c0-7c5d89fbfa14',
                username: '3dy2xj0r86xl52939044agd7ple2s6hnm5a9xz37gtcit33u3u467hme9769bhgu8wtxrl9gwrm732r5ldbj94d59gnugoh02fagvfqxhwwa955rqwgqrhdg',
                password: 'bpwqqm0o0jbwhqz9zj0cs06tgt71za83w4alhxpny39kjqoqxuyv0bttxo48bii1zmnvaj0oxdhjkc3o3uajw5efjo9p3afjioielki1onygjqgis3t3irs6ryznmu5u02q1axsnyfaymmirryty1y70h49e6k6wrrd8al3dmwogwj4u4knw5mkyaigu2egn102tulcnvm49tvllaw03c2ubf5ytwzp7hwynaovw7mc1s72gxz12lsasqb37v8i',
                rememberToken: 'nnd2fety23691hetnut8hwda25dapnnss3y0wsllhv70ibr1dlkb74vjxac0yfs7l4pc32hn5luxtmak8hzxm7vj7tliea2xpjwscoq6mutcjvj7lufdyp8gtdnh3zxl96p4fgxt9n0028o7rsjjasf483p1rdehd6j6dmtmy0753zw1rry08b2ddgnz0h8g50h6v2t20sm83nt2rnm0s1x0jubgjhv28ycqjewtgh7ypo6valmzvpyb4unb41h',
                data: {"foo":72460,"bar":52012,"bike":"&>kbI5T:_^","a":16562,"b":67169,"name":4541,"prop":50599},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd113b0e2-3508-46f5-b273-04dcf5c9a97c',
                name: 'i57a0y8fm8e2dp3i5g68u82lfd11nntyry55lg95t1wh7iums00f7uiotcza9t6q3w2x2fu9srn4ulxc56dkakibhzb4xilkm1x9n43wnodn7id0sw5cy69p1jr7hazjxamrzfyod7ggbltdwg8e87r5vyfxik49dni7v90juqde2b3tkzh7km6b451hip98g5ntia16lq6d2x8sj57jz1x9x1hd105k03f3gj1xwnplwf371lyu8taljsyav57',
                surname: '8zyv9qt7n5eoclp9t4yw00jfv2bos3yenjk5qnvzzjyaxpqknu0z20q335foivkhzzsn0u1x7j3gl5lvbdb6hx6pq3jvz7fv9xhacy3r3qhabthwmybglj3u8ndchmsb8prw3eqiferpg52i88tj3xbs26qgvl9jy9p3hb84t3qqgcerloo1lupmh7rs7kbv3h1azyh3ythouiwd67nra33ycx3y9yis20t7ksdywksys7qfv7tx4r3p53g7de5',
                avatar: '9nfbl722z38vndyueeskv5wevducpeaxz1xtng27ppbfbcygmg83i87mhxi4eziwmqyfc94btc1ihxecexr99dnqruizvo1tq4xzli44vgjahqsjlr8aqyk3kgue604jilk02s92jqb0uo34x8eghmthiuk4r709218ni39gwog6kiexblawj0i5f2ql6yd52g2pjv4voa5ppjpuk3xu9s8xs50byh0g43ayk56hjdg77fstf7x4zenb8mg2t3z',
                mobile: 'qu0vdkmpj5nkgmjp6hjj4gphrs1k0whi5436eyhid9staoj1ugztjh0d2jj6',
                langId: '015858ac-bebd-4619-a38b-ebca496da947',
                username: '9l77lrlrfae18kmfts17927srs29whkyvgj1wmkcvun8nq4o2s7a710jkymp8j0xk49ps0cdtu3vvinobymog91tiez8ap6zi0w9ulovm7ic6ao0yzrmq6fl',
                password: 'xbixs4nzppxd6xkhnw54sipl0d73m0xby7zhkbof8ms5zz10nkmhm5tgb5lb8gbodnklqybozgy8xmbdyk50tyvtub555gtj1s5dexjieessndu3qz19jlx5kz3z2vteumu9qt3t15fljjwmmlh0ai187wtiogmdx6gmzzvxlsnu1wt4avitkzw46og208jdxbjpiegc79uwm5wb5kkue9k4efwdlcdzuxrwik58a0g6cvpgfl0lk0123p19ge3',
                rememberToken: 'hd5ixgvzu01fa1s2bo5ta4c8f0vdvv2fzmr423uh06hpxa0c85szwlyezdlvxzxmujxj3271vid4fnzsfnotsc8a9umkm2esl9g9butzz15g3mns3ja0u3ie9n7q52jslmhdh9b15wd9wlfgg5dtv67jfdtlot0uz9vbwbq3tag9iqm7k52rv97twpg72ma71jqilvvtdefwqso697n3ruiolsqy6jrry5ndmwkrycehvnwdjfa23orne26p98e',
                data: {"foo":80413,"bar":"Oy,)MHuHy\\","bike":2125,"a":51697,"b":"U*q=@,JKN^","name":"^KC'v>sEO)","prop":"`xK}W;`RTg"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3d78f3ad-0684-423d-850a-eaa4ef9aa924',
                accountId: '87ed8c58-b453-46fe-b0dd-66ca81f63ede',
                surname: 'iw5fqyu266h7bgac2ubn6enve7317ujrd5wdzj3cs4b67jj95sp1zi6zy4l6fav94z8owaoqo3ax6xy45frpfvejkzmwusp79d151qcnp2rs1n9ud9bisdcgwfeq5lcfop7f3k6nl10hj7p3iyjbswbaryexwtdffu9xelfzgmzs4epp4zhlb2sqf92smzmt9mu8e7eqv06v6i1se9mask1b64tkpjonx8jcwcbbwp9by6qcz0qzrvkv5j6q5wk',
                avatar: '1n2syt7tz642qktnjo01whhdippx87kwoljib4zc3j26qpewaq24pkexxo40i20zpi5ecvvh5fryqv1cjwrf6woq1q2ukqfoqd39d07n8fxvxwi6lgyubqg4p0m52hok5ra7bfqhw465ari0ctqoz7hnwljkcqfqc2l238lmdcmwyxvtc4bhf4ch7ouqyabz2lo21hpzkwbw3ii7fo16ml8gh68q1iiz5tbazusikxzntvfruv60ob6mp7npyit',
                mobile: '4rbdm9s2ucwauddwqzv0sy7tkm3ma2o6lt5gtlzban28t6coyqs9g0m9need',
                langId: '1c2caf58-72aa-4c65-93b5-05bf465da037',
                username: 'ukcww7q73w58x0dkmu616jp553wut5655igy998dkbbxoxg4kuu5y2mt1zshzbbny4tgp9cqawvhtgcyjk564mvcpk0uwdmp1eayz72ml5tg0qoz13uj2rf5',
                password: 'p742v0yjpluesyp6sgk8cjn1u6ohjybx7egdoncqeaymsz3krk1o8lffgbi3qcbqrxdeb7xfwiiuqkqmhrm8uztxpuj8ydncd4qo3dg5dpri0ybqow1rtxwhedsnxqsy5rr9gzh3t0hzawqm4lgwm3zveoem1sc9pox4dbzll44lailp2c39ypxdpuoslg1f48mh15fzaaz0kz4pu6y6kimrhza5hkfm07r8guoox4b6h8ssnt363osc1rj3c1b',
                rememberToken: 'sn1mg5swi1bwjntk6dmsfsrwc3roz0n6suz9qctxu76clud8u1pppa6i0w9fk9wa1y6ap3crvlkl7rv8ftjyeizeuu2ljccy2ypx2zs8k1c94mq0ymmy6mvgqvd5pb50n7l4oe7uw4se6pb23xwrqqho3bqww908vwvu4b7mf5u9mkoukqsmu7kwabyukzmcucowgth6f0ex1llhcnvw5k3196spkflp8vbczcfeiqqehf0088hhc5dhdr2zztr',
                data: {"foo":"{R_qUIU\\bU","bar":52913,"bike":19575,"a":"bAZeOq\\wHB","b":97295,"name":55638,"prop":"01\"r]SI3e@"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7f544319-a283-47fc-ba01-2cd3f5f5b024',
                accountId: '7245f045-ea55-4b73-8d8b-683c1f41dd36',
                name: '2np36mihlameskvt4z6v604ogdoajoqs5mraa316ivuxp169r6gudqcb3h2yapgi0nejbje25opfmff0tew2qvu5aymmhz1xmbcklq810x3dttvcvc7tneyqzhpr5kn5hfdh559xx0z8vk1bfmmcaxx0kuep3jv1vhaepk4t84zm972nz26rjg3svk8c41kmbm8313ppcqwv2f0cklapub5kpvwk8xpwfptu19wviifz2ekiik0efudq54wr990',
                surname: 'h12ez0jqkaf099npssynzo1smk9xuiye88ea44xkdwfns836k30ojmo884wq6qnxgt3rvuuk8ndtt2imxa3mnb4y90nkqyj3x11qwmhnivmekbxkrvhnpueg1qld8ldkand8m7kays74gdoprexqaasn6h6c8nqyha8stehote31ea7dnwfcmqyqbude7252fpgjfgl8dkkjjzftpjvwbk231xd0l28xedo9b8qehgntwoalmultiedgieljp8l',
                avatar: 'c19pice3nw0bp3syz124e2d2nxzfxxjtcclhex06oshxpwg9icqapr3l0jt1s29g54hm1xwlwzzwywpeph9o1cxhdnp5nl5m2r0k30mestcgns1pt8gtzw9iliyteyuvs6gir0bfsgfxo9yjxtrumkl9hszxrn9m8z4lc2yyt1baqiuf43nsknxred3y2uioirbxf7ttegnil250j3tf3j0cucf07j9jxcbp1pji0bfdupn5hhx65n4yxkj0ei7',
                mobile: 'er6r3wh4l5bz26ej49z9kq0qvsthroimlf4vm8ez0bc9es24rzohdd4ja40s',
                langId: '6cf5f56e-0500-4f2b-9e9c-f277e9d5097a',
                password: 'x09ow06veutir8qiukcrfpmy788b8f29x4kpyzvwwm7qmb1c1vbk3romektb0bvna2petf886i4cq6a4lfvyckjvw72jnnbnq3aykbveuu0ie6cvzsc3zof6olutnpxkbwcumizpc7mkxejsh7fkogw6636u68yznie00h201s51ikirnjk7iri85ewol6iezuo3aoahaqkayfx123qs58i9e37oqey5j4bt0t43pv575w6w6fjigu2np5y6ioe',
                rememberToken: 'takcb19c6yyhscwq3568q9rvggeqydhs1ibmnryubl87or03gx1eh0bx1pg30q0ap8i4rquo8gqcud0t9x7ambdpg0ki1bb9swxbdagcct5xm21jc1nw01rg83ywob2j91ozagm5x06hydfwqv8dgsh1ghfhee4jtcty7gp06qg3cgg4f7kveugfn9d21i7liwdjutma5f7p2qi35321qo385iqheqeejai2mym6yf29985fd3y728605pl6iq9',
                data: {"foo":"(ms;iIaoxM","bar":38887,"bike":43854,"a":37153,"b":61656,"name":32320,"prop":"ITC\\8(4jr+"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ec9464d6-1984-414b-853c-92103d05c6b9',
                accountId: '70a7ef68-e41a-480e-a7e6-f9226e1bddb6',
                name: '1o40mdq7tn3oem0rdcrohjzvlurq2x44ym48kjx41cefd2yb4r7gyvyy8082ds38t0fk1mmg66vzv4hk3g9if2sz8swp7g8jyc0ac912z2rxuuq8onyx6pwx5zv2ofm4mjpqafdhjias2xhjb81v0sc3d26630tp35yews9kw9vorfpjmfviz9sv43w0ri48yt1kwi6rjua00ii3m2cfr0j5vv1l3te3z94qjp65afnosh6ipnc7ox5gps63nuo',
                surname: '66pax3g2qwab1i7jqx7w1q18cliuts534avu1256i8usflqcvmjdbhouvans2p4ndx4gpx8j61l8lrnwxo8tr644kkn74ao7w4c16470nsrai7jpfzj61uls2rquo2w43v42wwxbb021kpz6q3zwabczeznun9ni88qxsxuv2ystx3wqxlzjvkke88zxgvbpd69g7epzb2wdrxlpjpmjpabczmuwmuoi14zywkldmm8a73uoz7rptwihq7u6jnf',
                avatar: 'nud9rb0kuz8xt41po8cjjdqvxsfoeo4eg23qhg4qnl3oqwfco2p53juf3bd6q3yp2x4ravrh9g5d937v8oarvee90fynh111wozoqjmhmhpi8b5u1ms9on7psl65yo2ibyjoxa7vhomx4nd9b3gnikrg04azj0o6p56n9zfkq2wmkkx4yiali68negt0u4fjzs5dzalt93qp12vgkw8er9v9njjo92mghdxhl20a6bv7gltwjqpsjfttzj8b888',
                mobile: 'p04sp5p9gjvrzbkvke50fp1gnhof8hjd3kdtz9xt4bw3sw04xs8eaz0al5m4',
                langId: '101d8fd6-aa2e-4622-a736-c689b432a7c6',
                username: 'e3nrlnhq4ubm09cd3846im6t08s4v9skg6aoawy07bqbdc3nl6fvxqymyud1flshpkz3uby346fu52e9mnlfyumjyo108u5mlcujdmd14ecv5ovbmt5vtqsw',
                rememberToken: 'ciabp8j6mkru5nhcl448xch6k1cwpvdbxfhsskewp89xk9y8rv0tvz32gvz1r8igui5nkj5v4ys261d0c102litq73bm39y8cj7nbsct2gbbvpn0uw3geo4obhlahbc140d8mp298yy5vb6s6n9j734e1rivcbxsyhhq8pw2dv32z0md5xgfhddo4mgi238omajaoykmqr8niobxsm7oii50lpsnramf6uu8bzamqtsiy8mxditvmixs8m6ud6y',
                data: {"foo":57309,"bar":1137,"bike":")3+<;jG`P8","a":20743,"b":79309,"name":"s{93f7UQF7","prop":"A}%DygpB1>"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3i4ztmoxkkoxbhwf9zpgb6v8fu4zogpjp2c1d',
                accountId: 'd8a956b5-72a7-4788-9505-4946ed3b4f4d',
                name: 'ycln09z00exfmkmebniosm0iez7ylx5fy2gkxsycq0vv70mzahuqnv0f9nyz9uylurfc94ejydabqavbw3t9iuqw32lkusojcv6tb9uhknllfo1q35qtmvm9a79m50vvndep11ai42iomedz3vli6y8cqwc924u7iib01vsn341w9xcefdvj7tc0sy8ye8j0drlmjexsayu7llp1qhszu0e0c9zqaaqw0msb43hquzgfz6mi31xgv3dakhpdieu',
                surname: '2da3rr252usulnb2tlu7fj59kw13p4uenllkh0k40svdq6x8rnduifhet382jwmg1t1exqtbjvqslag5lsma32ngi7wmy4lnsqm8dtwbcxhptu5kv6u3p8rkgzsvi8h1sq99ou0rvpr3m4bx24j7a3assxorpe1g92gko7fvkf6796lycm1ii824ds8dyf4gr7hse0gqf96xp7qbu82tlwxbdrhza7941n216n3oak2rxjrapbcsy31u5q2ib56',
                avatar: '7i7oelwfca6s6gaby886r49we9b4my32w6d8kww5ppyij3b8vpwyvdipd9d8wryfefhkw1pv6rhjpe6bfwnnrbe1nls5o8ou0uqt5wbdo5khijpkdvj1zb5rlpzxfqc4ntzfhre55olusyzeb04u6vmwsnzniqmrgdwppv0vkhyiz5vwopedbi5ateuwxoqnmberku4teswyl03y4s2hm1devi6imjq0cjqntvosaazyodgigyr61rgiuwvvd80',
                mobile: 'j9tit5dr8yi5f78xe4d2fwdppnyiswl03jbgz8hhcrij3nfq60j5i7pnplxy',
                langId: 'bc83ece0-2211-479b-aea7-61ec065fdbb3',
                username: 'wa3dvib90z09nnpfbhojirzs838duxry594w3h47bizohz7d04b7cq0xif6u3hrd8f0927filod2f9t1826n4zd8a2pwryuixqwkq8r86ofdwjbsye4mq963',
                password: '7hy2bvc89qgg58lpm9bpokjadxqosvls3qg4o5qrkmxu78ttmk2ddqbl2csgg6moflqeibvi6ege5ts4m7ncd26mjzydzxemh2l1qd8ipzobb1gj9czy0ab7bd9ae0yrlrjkdz6tia0iz9rw8hq5xnkmqwr7z96cmyudv6261lgdjzkm4njhuww5to3gtf7e2nmb1v92ksx4wnhgve9xxmreftewx7dkrbfbrevvbk3flfviz6uqs1f6yi6ck1u',
                rememberToken: 'l4slevc52p2i6a590kn21sjq1h84pnxlqe70k9cnhbfmot5u1g8b57lhhx2asntt0sgdo6ocw0ifzvilr57dwbd0gd6ime2p147g97y1lx14goltnt5owt0hk3gi16vaxq1hjnynnwmwiisphnqg6885qth26igplck025c98qo24z9yhrx9wayil0au8luci7hgabksupn4epoh34fpi4roqaf1huyc9709hn9yrrbioejz65ob8e1lvfvwtie',
                data: {"foo":1555,"bar":18783,"bike":"'04uB`S6i>","a":15890,"b":45308,"name":"5)8C,&gnH.","prop":"V;fens}-_i"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAccountId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8330a26a-3081-47b8-874c-eb1e88d2749e',
                accountId: '0gu7noss9bngunxqn8nuhxt6jym2dgd6acat6',
                name: 'dgbveect7pbw09o6ivdfydpcjy9pytaj3bvtgrx39y7d8xnit5mojxzvyub7vb0xvyujheqcn47yy0p9dwm26aqxflkpo2zd44g7ken239f9qcf0gjo05bkak8sgzyqldk2l1ye4gkvi1x8d5edf2d9afbmtan8pgb50s9vyu0316wxvaxhd7wut8sq7ylv3oyskpobjezfjwodet55dmsln4j8fursjny7yhfjtviw3kzv9mpzeis748u7whpf',
                surname: 'k4eeyzha0v63ejx1ibexcf3hqtk8ejh3yej0gp9wan6762u0dgkt0fjhamwxf0zgsrulrwatx1i50cgejqhy2pjgs59xrocyxj5glihpyxxbnyu7zx3hxe9dim9ov3m29nbqtfo83or5wd8oz1h9dbwn0ck4zlz4xhp1q4vxwru8claycf1la0ayxwosegmx0d476y6n0oi4033avmdj649evkmpekyad6zdaotj5zcvyy7w5nargmlg6vwx5cx',
                avatar: 'unvnqohbgd3pfoaaxatp6dbbz3v29ws5fteclkgh8mowcriievvgfgrrwmb05x9bruqa2yor5ot5ecku3yf1zswwefzxmeq6wwl2d3n06r74h0d84pj9251pz1o5w1hq3szf3yy68cdw211174d805rcvirl5uprkttspsiitdkx02bp5sz8hisuml2f0r0efg5xed4u09ljwfwc6c822dpsixc7xnm5ekqpoceguappfm5mjrgkfo8jt7011fv',
                mobile: 'est0f5l8eh5pzuen0xo08ao4ha964rfqkr90scs1ytudgev0n7zj4llnamow',
                langId: 'fecd60b5-8bdd-411b-9a9e-f2de73acb13f',
                username: 'fb14qk3rnmyffgpqc1x2vv3fp0ccujxot72m856d7z9hp5yrsdwyelqofee086m41gjw0aehjbeb5x5e51jm1d8k020tm7zzqit9feiv642pwgq072egpvfc',
                password: '271x46d0qispsqwiegb93dg6u5f4d5crbgnwruiqomcu8on6q9zosw5nq7csb5z0p7xgn114goc15gi5acmjh4zj6v8op8djdw9kdyd99csnv6m5vtmd78wnzm92zriphu1vjs6aesk02zcat63o1l7vrr9ijw1xiew7x61ov46vpbwwgwwkyck9nxzbzl0aa4epsucjj0w18j8olv54i55849gp8jpt8ydbi9unjepy9ydkpjtsy3zc0bvjgu5',
                rememberToken: 'jt8k4cbpoj79wlg45kcan9y0p1ipt7jof0805ih9lylgfg0mx09we5zlflvn6yvak1p7pobz3yauijplmpwkzksp7luj022xi2ck3phvysiw3k408xn0wpy8i3jwz7bluapjg64rjwhl8cyloi9659yxvso9h7pezqeg4zggokdi9vjw8jocyjnhf15dxvc5bh4pq0k43p2r58cu8pquix9s2t1kwzwl37wzwvju4tpj4qkje2zw5ig99umn7u6',
                data: {"foo":"e}4|n'Nu<(","bar":69483,"bike":76285,"a":40927,"b":37280,"name":89503,"prop":"!rD1(bYoV("},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAccountId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserLangId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4a0baba3-931d-43b8-90df-89583c59bc30',
                accountId: 'a919089e-a14f-4ba0-bbf3-cff459a03fb0',
                name: 'nz4q0fh9ab30s4vljx1eb9yec6247hf4f8cd5us0zogdyg6dsx4ya97grasf6mny31n9vz67f0qm3eqx4ropn6iqlmvceyt6ijzncxmwl9czzpdxl12wrhvjadi2nz7mc3vv909ec5nn1t4o41cb7r4vq9y1xlr74vzhtdpxg90rovxrvqom5qpzs429bptf17ksba9xdrg8nodpquh9sf1s2o5djp60iarxj88froaek06cucfi2aaix3b99rk',
                surname: '04d0up73l99mn3tvyt9fy887zt5jn8zskgy6ifx19752lcpdon9smh92mw50ka3o7swxzakm5cnsuh37esqxfttg1b6u6ybz7454d3a6cn1pijeqcad81empgs5ki3nwifqpulfpaqvihny65lfjnx0w1e6m2bt1n010zwc5cgh8teu92nfk5tzd2tcn41t204sn746lb7pyalqilivslzzqvk51653nx1giqixmr01o7frvmlosehilh9goyny',
                avatar: 'fgngcam2rx6qwfrvx0ty1qk61ssbax6kn89ok91jbaa7of93t1l143tkne7jgp8zxpoliqvj066mv7g7os6r0ze4cdgl0p2r9l3e0nmd5g6q6a9amrqufb0tvrium43yr1ssbp9pn9f3at3vpug4qsogqy61qluvfx958g5e6e6vl8kifdcpwh8uapkv1ok2wmiw96alexe8i2ojjzaaujds18emgl6j7xj64hfcg4tqpmqgk47bs704ertvq4r',
                mobile: 'caggwhbuyxgi3z5eunll80bl29ulmgdfa9uga7iey5w4s88t8zgww4cng7m4',
                langId: 'j8usd0tg4bjraogrggbmdb99bjzxe10wzfkq9',
                username: 'a4n5om3eh9fsbv3vhe66mzm3ibfxytrunkd1ni18wg4x1q8cdthwnno6ngdxdcthirtlq4fa2zuv751vpl1okmk0a9z7cldft2a7xdyf400ktcih1c4rimfk',
                password: '29jqyttmvolkv19nmdulcwge3ysvbo3gxxefzyxi2esuaiwleqq35cz0sac6r70z33nz68g5x393x20qpzpdrpltv1l9itieacnj394k3smfj1ldnrvphl4e84vv6ps64z6jd0t7yhmkgr75tat35693qduzn1dm0427j00koo2xg9uunxch7hdlfda2mx6thujatdh6gdzrsaa1zzr8jwlis8vu982kygmjpt9ats0p9srhzo05zlvb6mspqis',
                rememberToken: '2s2525da3kpy4tgc7ma63d7ckwuxw5701ntjr2t6enhulgcacgr4ae8djcesek47jum14o7do5ojy95nu6d0kq67wwxck3bqeixs1agajx3sa3wqqei2wyhuqm9k2tujnqvtbm0y601j129cb93zfqnine4ax6unxwt6lku7qn36rt1udy19egauyy32t1qd3w2b325hdw4v3b1le19h11ptnx0sx6x583mkk5rj1k9kg0lhehl1u7d0bvbwybk',
                data: {"foo":"x\\kSVZ[6j^","bar":"g`OSJ-vz7h","bike":"N\"8Ps^PQ`c","a":"@1$,7lbeY0","b":59061,"name":"=ADD(S*Xsk","prop":19468},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserLangId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '41196776-bf6d-4853-ad99-388aabf1acd5',
                accountId: 'eb404705-953c-43af-9ef7-2a92c257a3f6',
                name: '7wdq2142m29h3j7nqkqv3k68cm11funnz7erw208uh3de4azegz16j5jcet8tul72qn9r4leymx4p5bxyugh7w4qf3teciqfbewyitl92vlyhqt50qe4r7gywqdr1wxfsdc80iwselk0as6n8gmxtnd6kkya5zejckr819w2iunq22x3fb9jl74w0yrr32xm0vntajxjx9emepnwgr6lt4v7vqhjmaa99rdk7kcr4bdusry96v9tdl4zbwux3upw',
                surname: 'tv7arbm0yzr9hlqm9oeax727o3yonqhlndwu0usjbg8228j90i7sx9g0m9h29y5t3z7mzgiq1vzcznaybjk92z3h7a41qoiafr6dfmog70h0kcimvnem1s9mrxnr9tkvycp0djg79jwp8a6ib4f6044zzefucg3rsdpnv1fy6nc64ibemxrliz8ucm7ijp8j1en8vlpg9gzuj6d6ng1xan55dapur2cvn0uliecrgb7foqhe4enu5792feqnjm8',
                avatar: 'icpfzh3huwgz677xq7waoonwq0f4x68hfluegy1ef86ofvc6ipo1kfxis6tfbzge5xd6tk92maptfhv8ruto8pog5puqrvymt4xxoq87gxr79lbk3pv1evkzyd7mvubpyoejajoapup6j4vdt0sfonow4mfzljqu9kuzn7v3p2p1isibpfwqh293z7smmthgoktqtder2bge9kyyop10dgyjtgs5ngbal0fi7zvc3axmg9e2hhx675wr8hejdm3',
                mobile: '18lsa1iyj3ky7augtj4tjkuc27ith412rjoz9yvj4iz4hafoorlmb69uvblf',
                langId: '90712f8c-b9db-40c3-b1c1-947822731705',
                username: 'eb6xh2go6sqm1o5d1t4lh8afvxs5fwxhqf4yh3qajs5wh1swmm8o4etvg1e5hghokmpq0d6us9q7i70q3k56v48ud3uqmvwzsfdrwej3hljh2i9sd1o14uj8',
                password: '1i7te3eqaacx1gb9z8fbi99fn3zy6m189rq80h2yb439zf2iajcle9jb5rgff9g1oleskb7yh2czpwxtgit7sakjdsep2x4atsh4i6ya9guoowyahqr5rc7dzqijyd3zv2b4ayy557jv2kjkrh97j9d50bff9i9vbijgwc3rtpznydwtw5dvhv2xa4mv9go7q6rapuhqhvo283xxdtd6khsbo902yhwrxc9lq9ei6z1rjvdzzm07ii91wzxkf0g',
                rememberToken: 'kdgcug2ihmq1hijzali9m240dmwe9zp17f8n2skozzgk7nemtafzg7wb74ek75f155ejftffemaeddh4l0onods3zzif5znuzr5m8ssxe0kxfpulutjskk707ynva66lbxth26ugpv6twj0wg1fje7aln4owwnzshtpktfisz1xeu5zblfpo76mk6i3i98cf1jpik5470bf3f905jliflgjwv310hc3lxfsq6fjjv0jym6e1cuihcqotbl3ocot',
                data: {"foo":":z0.xPN+]F","bar":68556,"bike":"SC4c(/G#T5","a":"eSIx=DNv2]","b":42687,"name":"2lYp9:}DQ\\","prop":"1}jn7&8DA&"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserSurname is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c2ee0a60-3355-447e-93e2-cbda04008eab',
                accountId: 'b6f73324-7e39-4d97-9801-9292dc64a674',
                name: 'nrpnm6u2vy0u0sovwqjyvvw1hfgiwzmwbmprgjqrp8bso2y9tv2ygmjw0st3h8iwa7ftx79l50uprew2o4t89xhxqfcha239kld4hm0lepwulaeavkyhorqpt3soolp3wch5cmgcea5vagwg3k8xxbvzvluj73i954g48rgf779qx16uluqjau11xk0glf44p9mjpw8th5jdwf6xh6iqraoeulyg3v0u8rhiigapm4h3zv5i6vyypseuk7y7qhv',
                surname: 'kcflxunafgaf8vrct1w0ylngq026vym62xk74tduzpujk5iswkv4sy1hmh986ytejyj2ku4jyxtrsjwqst7gduz3br8y1v7b8jrp30bf7lugo41z3fhb0naurhh6ay3aiard7p7sucw8fqibr6s6s5n9fbypxckfd5mm93iaas94snxl6gkso1dz1a7oghk4wgjt55v4w0satnndwf8tzwgxen07yfr3rbiov6fcysi2wv0r6krruvod9oz8aboh',
                avatar: 'tf7bsc5yw9hq225mnel3udnpcx722y7f5g3opa7vhl5mw83fbnlot4jbpb1aysn6av0lw1gsnfirreope07we7z4nx0qro5h8c0gn7jdyzolhz7aqptmkwoc6n3cbp2u8iywwp5dfq17fwdh85cp84q9q3dzmkfv8s5onu8o0njbu8w79s80yf5ko6fw19axxj0621a2do6f0h6onrojukj753oxdcr15oe7llofivebli5wbqwgsae96wgannp',
                mobile: 't7j8cmydbicd2y1ejmfnraixjxojobyfsl6bg6ebbm1eintg690zfrl0qz45',
                langId: '9a43d6ed-6c94-4ff1-8421-020057880345',
                username: '4zfip6mxdnfrpkn1ecs8g60zgbnk6pmo628i1svhw6e0wkzg34qaq9seln0cv8musjoj8cg5yj47vxs4wn1flrzp3t7ucj2bj0tgzsyvxylg0ri3l37ao7sg',
                password: '4dfciu8be1tne2irfvh76b9qz674atgt9hohuuc7t1cwwvtur83p2fj20iki85kgkt0lghcejuxcbq5yemxb5x7qvfpe8wqwarlvhab7oi4d1st25t3gy41vesko6uq6f517x3015n93qkhxkdw5djsyxhesnu2zcoyid1xr4b2e52ggxfusvymvmidkskfynp3lpaix87tgjlubhn4mdeahhb03kjf4d2imqoi122dac5e12tylo82wh56wzw6',
                rememberToken: 'v1sv0monseqhmhtnwrpq6ve8kjj1l026fcvg8zyxra0hfdnkd9pwaqpjfb0qukgs2ft9lqnap7hpqkawxcd44redvvi8dqfdu4cnu7r4xnw25rvvpl0vbing47i2802bxd2451m8oa3ukdluq4x0gdql3wavu2m1p6r4gpgcywa8bpwnjvhg3z8r7jpda9vp746lq4suhjpzg0iitvxv95u1ibat2ba2qf7qlyradkwbmgvogbad6ihfrjpbgex',
                data: {"foo":24888,"bar":9975,"bike":"H[jmw%H\\p`","a":"uJQHIJC)A!","b":"^(6f`k[o}v","name":79108,"prop":80462},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserSurname is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserAvatar is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '3fed0631-26a1-4bdd-ba2e-2c357a3070dc',
                accountId: '46fb7db0-5b5d-4e75-97a9-657959c5f3f6',
                name: 'u9q04216wnj96k3tuwr7obgm3cf7jokbezum1g0w91ztirfg55n9zvrfv34elttgcjne9qobtsyad1p30uyq9nb0691n9u2kig7x06dj1hvrpsjcy07x2617dj8yht4bfhqw8u5vqplc9g6zyp4f36sxf724pfgyvqacfeu868gjz19t19k80bc8phlvrhcmm12l9n3vm8clogvi87wj16lyyj0wrm05ajimxpaekg27tzvsi42lp1hfbr33qee',
                surname: '345uizxwvizs7z5j0x8ztl774kw5nv6pbsl2p0caesy8pawjb344pz8665hse3whdgxty031tx5pxkr24innxlyetnz5eomtluwmo5hl8bs3zgtkaujwckya7qhvd1aun851o7bwp11oi85eivk5wfxu5f0z2pk7odvsjpemd4fsvgjeldta9vxf4hkpd2af3ts7k1pkr3e2paznq0g2v4orvwi7zsmg8sj65m4eyjn9ymaxqi56z67yblt54ri',
                avatar: 'tv5f4q38uicww447c33z9lcugvi1lhfgz893vxle9d1fs9fpiu3mhnzas57dpw7eszb46a9yjifutry3zxm2t2wp7k6z7pp3bbpves6ihs0k2bzhtc7xe9h5m2jta8cd65o1vlz5qfmt54a98ri4q5qyqw0r3jgukg428jtyb5xq207ychnmgqhn4m80w4k6t0ijdf33eo0g1lqfwhcato671nj0rpazss3wrl0oz5qyfqkyuvn3knsm7lg0tp2h',
                mobile: 'vqposajjre3ig7y90871fy8zoen1nbpxo0l0jp95myxmuhgi4qowouguond6',
                langId: 'be5ed48d-2dda-4799-88d1-5f12c4d8a3d9',
                username: 'qbchs14na8aldiy6871cr7qlluh56rj0w3j7utbwmc8hyu950fjmk620p9rebs0grz62z6uajt11iq5g9w4lojp875wfxfi1wekcoxts4v7snwyizl866mhu',
                password: 'ur98fpyt2amcm2lycd135rgblka2mwiez13wfhoh9sbi0qqme80fgeyxv709ch9e0620ef2cbqd49fbjz9b6pgl1h8h2jnsif3aubsbnbmhz2cfkx5edd7lrtt74bsu9xo1xa7pa8zbr1e74vcuurtdd63dcky6jx8z2dz05udnc7dqzlcr3kn0vt3s4z3jstwd2nbv245mt2bhrcx4aq5rtks6ih4yz2l2mtnyw1vv8j3i0wo13u4ey3hwtwkw',
                rememberToken: 'phjv91h9wopwp0bd0lygd069a8wgs4sunma20j1u46cq5s39lksb2nz3xnfdjk8uda97dpa7x4dgidbfvuz2z3sd52vpvl3hjzwanytwsqstkvs7kmv1d4wem0usj89nhwa5o0b1mgqoz3mijxtxpt4igh10wa7l28rn2ev2mstojuhr3ng6pv550wz2h9hxwv0j76etii7dc9ipv990zfitgtete84ikd4s9aoz0jln2pzdp3xp0uf1qux9v21',
                data: {"foo":70651,"bar":"wV{?7g\\H;i","bike":"wur^uhZH-L","a":28772,"b":"Gen21yA-\"_","name":"85Nx:g9Y.V","prop":"-Wicho]A<6"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserAvatar is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserMobile is too large, has a maximum length of 60`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a67aefdf-ea3b-4971-af9d-4bed7a6dd71b',
                accountId: '9d9097d7-f7dc-4c9b-bac4-d03ef69ba8c6',
                name: 'pwtsl5zi5drhk9kvlzhklbxanf297537mm261znxd4969ogjmuzzvx9i0t747avi8c5lj303qfokjbcxln0xstll7d6a53hbygjl4ldimxruguuu4f8b8mbzjsrzzfi6qngeecnq5qb96t2ogls0yfir81yk1ywb1yy2auel258snh353ajbuqyhuhf94vdvywp00iwr6drwu61hddkwdc1sxxm1n5nuvgzs76rbhez6sz4r1hjizk20t5odupt',
                surname: 'ytpih2ma86d2s6iiz65elg93dsqr1vxtbnnwn7y9ym8v23o38br3uzt1gaasq2sa01eeu5915ofrdv0p8lssxovqri8cikm9dkb2lpmnep6c54oos5dilg9na6cjwgnyxkjdx59411lk2cmgm07g5k7ihp9egoyegsfh0ehlnfhf3r13w4sijbkqnmlt7nllnrggeo95ju3mh93wy11mqbs8ovavpp39j30p63vqoblej2536zy1f4lppulkse3',
                avatar: 'mq4lljoqoio2gk6v6shsm48jkxjv94dqj6cpuwor1766u4gt8irg2xo25drl0qn54x6x9p1iewkk03xg6ak9qqaeyht1wzrsw2ygnfs3mea2a5jzoybekri9lxj31htm8ryyrk8e3bnte6ruwizo7f1d3jaa1d5yh427wtjvmr4r79sv57jcqq26vzd3q623tkv8mompe2ee5bt9vz3irbvh88wbwjqpltslumsl6j9x6mfvaz5rd80rc61qnqw',
                mobile: '1auleev0z2a181vfybubdsbm3puw0mvb6ep83x488sz4y35gza9pi6mbhex0k',
                langId: '9b16930b-0b79-49bb-8b24-785465cd857c',
                username: 'sizwlrvd98f23j56l4jl4e5p08qs82odd7vdpncx7bgoby1qx8q9e4pu2jk53y57rptqhfuff6r9ewbfaoezcqtjinny8vti7ebkoyllkdt40he4ec3ltynr',
                password: '0x502furnzpeufjb0w4c0vo3vrho2y1g0eqc0jav6fx69sr7w5i5sivp3t21qlguyu1mwsa8mrl2670mrwkzc9jaiqat8c4cm8obpg9owvqhnl9r582tz15qe97l5pq4f3un3f3ljvvsjlybuovwo0rubb9pex96ylao4086w06lf6ky24ucq303892c9a14ghn73m08c9f9dv6aqjd7b3g0afhbdblp8ttc07klsg7bkadwwz2za5sbqvb0mbc',
                rememberToken: 'e6ek6s7ysei1457k32nqfhktqks6b1wdwi0ty90cy3xu8xgctooqzq5erppr9zw0xqx7ukat2dxlge98901ns4bckmd9fxrh6wtlk2u1kg6kri62hadfuwa2yhypkssf7swh0mugv5ywmxpx1a5p3ddvpv38equwmgvdbzfpzyknjk3pwbebvntldlzdnugqltwnt4xjwe8ztxighge6j6corpv4c2ba3294fb6cfy81mvlmlg3ydphaenfk4ri',
                data: {"foo":96100,"bar":"h3L|KrMDMg","bike":21049,"a":"[.F7Tm@\"CO","b":"KY!Gp&sA`#","name":"2ZdJI^i/Su","prop":25441},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserMobile is too large, has a maximum length of 60');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserUsername is too large, has a maximum length of 120`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '924361d3-dd8e-446e-8615-ed01f82ec368',
                accountId: 'b2dc7c7a-71a7-4ceb-8880-9eeaab368cea',
                name: 'j7vrnamzvq1ka1pa6sdar1alawb9yng0t2fhfqcyfdlvy7wxjkb28d9qlkl9xnk96mdvywix9hhrzpqj225lqe03a86vphpiz4eec3g70exok0mht7s2525s4oavfhco35dhwcfw64lo0czz9siflc8se9p7mc0t26b3ec53bdmrq5w9ahdyjkoaz7dfh3isjztk29up4pcffou1yan5rccohs6lju4rkyzwsn51yrpo7cjgpnub1rvjksutldy',
                surname: 'dl5mc8fxk996ocq19iusv3lyud9awuy74cb0uw5o3lz7z1jcp65y2k751hkmia1qjp4dz2e08k5hue7iaisdfdajx56r01b3on18fugsrsawaf58fnrkvith8kmk23m0gubqkd9x52tmcdex3r5s2pm0s9sy4v3oht1cdcan2q00b1m56guekelqgme13yllp5v1reog4y1ad7ezeyiie04lyb48cdnlm91aaij3xp2qdwcrbep3g5poz0k58pm',
                avatar: 'dkygb0rb92j0vjhsfzfperm3z0ick6p2vqprdzckldayp3ghkdn1dkur8pi9wnkpj3t9oafhmsnwu1k9tx6ix9c4tsszzr4uj40ox8e3qg392othur83kqkjeiyi1f4ep21rbik29cugbhd6067lhq3554n96beyf904seixafj6whham0k4c8dx9f0dmkvw2srdy5s67xesy75nknro435dxtydoqz1ji5xwsw13j8z4cq87yqi0t21u6z0utm',
                mobile: '2gvixoadvrqdtj1ccmws4oyvjjrig6o1y2b9d0ks445ntd2pozlgdpp8cprn',
                langId: 'c65c3110-78e9-4927-9a76-be4a27115bb0',
                username: 'hkfdcfims68uylb2pga9w6rlqhsa4gto15ayhzbsljlu4p4agtjbs8x7ahk4dj2y9ejz8q4d7psqczs11tt6t8ar3i0flrvrkn8uw3h4i4wpeeuh3tcngsi82',
                password: 'pup1ujpkxtxlc22hv85w2218m5eqg7yv03fxvccxhya0ngkcn1xpw51brjjfwewxeipp16w3e25ymt2h8qkgjhzdwfg0b6tmrcheue6yacg6klnjoh65ijc0gzruhn6spwbupbg3g1ofqkzcecrlp0ktpmakpwvwfwxc3iz5bodparslncdtww886x4ho0nzx9u2y0k72nto3cijscqbpnjcce5wy7t25f7ocbi9proae2rwhg5xji0mks2wa1q',
                rememberToken: '9nrvzpnhcogkknbpn2qg8vu55sk8gfbe8ndm56c7sjbv1ckxve20lr2vyf1r1bglo2pug91c63rq5siw1pxlbmh5dwjqu45dgc1qltceonyd6mynv438x2lczo7ld0ihlo8x932h0g137qglb7z8aqpexsq1cyxyk0h3v0awhdu27or7hkmyzp922itjn39j2th54ws184rtppk3ubrdlodk8b1of37ua9422a5netxufd7kj885q4lcce5flun',
                data: {"foo":76710,"bar":43193,"bike":45401,"a":"b@C}2#8.RQ","b":67350,"name":"];dK2o80wW","prop":39032},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserUsername is too large, has a maximum length of 120');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserPassword is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7ffa2dd6-438d-4ec9-92ef-51049842bbba',
                accountId: '50d4f6a2-89c2-4cd5-a6a6-32cfd65e0d65',
                name: 'cyftydcjyh2up782n4tbse1znggec7rjv4ordrxyx5p40l21wtlw08n0q574kj4f830nw5i6co9arxvu5lct6qlpg3ylrt3wa8xxxlyl8puxaez84imi57kzafv8qv3gif30hdpivkxr0ugv409s0gon0voepkmjzafpdbiimfqh48u2yx339dohbewpxv8szmlch1whdrjh08wjufnw8f7kpv4wy094kyf9ro8i7mdvzv3tq18318iklr5mrqs',
                surname: '3366qqtjkm9usg3x1xyp2esvbjzngkclj8gcau7ymuf6pgi0nyiaj9xb7azd8crorvmj1gqm4fhcek8vsufm2xcoqwkodrj881jojujjgjken5mx63mzm35r19u654j0eshdsd0lsya0mhv52001o4mxzxdvrl01jhz1p9p6186nyzkfn8fgvl10uh09vwca8k255esqjf091jcrlytif1xnodxsdx7dv7rus06sx7bm683bute7qmmf1a48trj',
                avatar: 'ncu9ryen4oqtxgbecojbzy3n26hu0zeraajijmprruqgzeq9ji1fcfqkpu4ckt4amjyrasi61mvabunzqix3oik8iqw28nqz9xxf61eablri56zigb5j6dqlqbjnvjhlujmv0y3ic3mq11ug505dt8vjxbllj2yrji3qnh05xjoni13wmmzmxqi884jm3v9dz4nv2m8usspjp58s59tuje4dw7f72tnjk1r1spmst76iboyfl3q8oowa1bgcykt',
                mobile: 'h6c0iwclc9c98hz5gjr48d7pxp0u2stjbpdadzh5pfk8wvymm9220z71yekc',
                langId: '4a4b4685-fc80-4d55-984c-f28ad2504a97',
                username: 'qepafhf5opnhtrjrctd6uvs18j708dd0co1m40f0a4x5dyj1ucmlehjlrkc0cd9h0agjk3eae7gx13iotyzxi80z48zrye96gephs7r9782eu82e6rgr8yt7',
                password: 'a0q2ym96d6e2t98vfx87tz194qj9yn7q6kh1rggv2yi2hgje3iptb6bfr0pep05q2prtnrce9duw4ttrbr4wfczuuuu2xsn230v0p892phe376a610fknwxu8ou9op3unq7k0q5p9py9ooq8uzwuixntu80tzinrboe2z3l16kxfovcu2cln843g5c165dcps080j5s1vas7ka1wrmrc74z93r2vstvw1fiim5t219yn8xhttrcmfkx3r005o1bu',
                rememberToken: 'ow4g7mmwuh17pl944j14p1f685rgszv88qap3t5dcninqf0ihpkh5x8r59tlcnp6nk5ql64xe91rvlvpeo1oyg6kse1qm0xm4utbia8hk441s8ly8oy0zvd8c6dt2obs2lxjgozznck5ndcngy69vxaiimt6lkqtido01xje6txl5xjnc8hpfxozz6gg74zs4i1as2dhs6l0trh8tqj16yea7i5ps7s869rnzjv0yx6uea5l74aq2qvbrnaa737',
                data: {"foo":14201,"bar":71956,"bike":33352,"a":29437,"b":"O_Ko;L/D@X","name":45474,"prop":"d?w)q}j]rA"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserPassword is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST iam/user - Got 400 Conflict, UserRememberToken is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '182f1039-24ea-41c1-8d47-cdb9c3f362b6',
                accountId: '4ad5929e-906a-4b5c-9e0a-7b8b55bb98a5',
                name: 'gikzitee9onbm8gkhs58h3g7qeax7k0m7vdcrgns9uuz6zwmm3zt5oov5vztd1atxqv7fqholm06f72esu3l98w4szhcffws2867i9n5f6igseyquxvmz0d8hvb1y2z9nvi26lduigj5jnba125jgyjkvazt1osm4kl4yd0fvnc8nvhjcc842f0tm7rnuatl0tpc4f5fely6nuy1ws3d5kt498rcvmae2qgd6e5ijk3gd1fj7a99oxu84jom14e',
                surname: '2v6ibjeg1ejho4zrq3o0ubupg9pwpqjijfttx0rfsjoe5phls1uhdv7moiqy1r3a41840xo1ardd8aavz9c8izbabs928824yqj3zehvuspl2nmontw24trvz0sc9pzzawrkt5rp9b51n9p8hukny431y3puudutf6igjpfi4pihdy6fx3v5t61ftbcn6ixr231iwjqkbzndtlk97qgq17buww9mt82onzjhpjgnpjs9irvvt1z8cn5ni8x9sdk',
                avatar: 'hzco0trek6vdrqudwqlwcqv9nrmk47tpe68hr917bctf7hh1c2ps7sewz8vhd0yti5rcp9j0x2ccopl64nv3f872apycbyarf5msfoe5kn3a4cavvsvg0bwrj012v50bm2ztwx21mowtocwkg0cznb67l31y63tmxkvadabu7yfm7xqkyk4eifs4jnsctwplf5h47nutaqkn42wfx1avysqecqlike4na0mtyg5bav06od7cfnqzdwler1x58cy',
                mobile: '9mvj0njg5tvc6ld6yai948zmsh674bmyjdgbbg9rxh2kr394iv5fjvzm3673',
                langId: '38b6299b-f9d9-4eeb-b2ab-6ecbbf349202',
                username: 'f3jr3ewdkzw2vkz5jx9echkzx7jo6srrymrqak89zpmxn6xoi37a1j90o827nq0a2cvqtb7vkqazguvyofxx2dhyedg6w4asozd1k20ewfi3imwxntx46sqm',
                password: 'npxzlaz5vsl6nk8p3rjojgbwdbfb074afma7mj9d1p9p6md9gz2s2hc3gyu10cgtbbimscx74b0e0x4ymgmo3a87xl0hwpw25s6asl520qw28v4xu4xn9yyouhqwgr7u33rdref2d7pmlzsl1mm2j0x6nsrohx3pvej1cm79jw75lbnwq94qty3xb0g9aguagj76g8az6eejmngydjwat3gjxw5z7ju6024qt9mzvoe2y239j5veghsz4pcub28',
                rememberToken: 'wewwnca7h7k5opt22w9z2ijm3pva9ibdxks4a83dnwldtez0l1v2pxor6ox2dj43mttmpzn4me2gndckq0gb0lonitaixxl138lqm0o9avucjdknhnowg0u3y4j4g8of8s1roh8q5qwopfuz8wwdzs33z6wc1xpqpkokaxq7mu6bmvhy2fx8uedk36tl97gjkyr073tof0fhbew1o3928mqpck20fdteb4sp68el6p80um61g9xruedch91o6wtf',
                data: {"foo":47665,"bar":91951,"bike":34118,"a":"G(0ny5l<-s","b":"y-A\"j_0W14","name":"#_D:.}|w84","prop":60099},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for UserRememberToken is too large, has a maximum length of 255');
            });
    });


    test(`/REST:POST iam/user`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                accountId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                surname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                avatar: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                mobile: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                langId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                username: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarb',
                password: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                rememberToken: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(201);
    });

    test(`/REST:GET iam/users/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/users/paginate')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
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

    test(`/REST:GET iam/user - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '22ae55e3-d11a-4f9c-bf84-a839459600b3'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/user`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET iam/user/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user/5b0988eb-5855-42d8-aa3b-7769e3b8297e')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/user/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/user/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET iam/users`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/users')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/user - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                accountId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                name: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu',
                surname: '74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudr',
                avatar: 'w05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jf',
                mobile: 'vrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6',
                langId: 'e6873d02-c595-4f91-8cbd-a652b9335fe4',
                username: 'wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q7',
                password: '8cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k37',
                rememberToken: '1q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axo',
                data: {"foo":"u.5d\"#tugD","bar":69120,"bike":"rx|zcxp$2&","a":"#P\\#G|o#;.","b":"VTNzdv:sk2","name":9491,"prop":"\"O9:B*t<{Z"},
            })
            .expect(404);
    });

    test(`/REST:PUT iam/user`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                accountId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                surname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                avatar: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                mobile: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                langId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                username: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarb',
                password: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                rememberToken: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:DELETE iam/user/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/d888af2e-148f-4ab2-b652-b9646672bde3')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/user/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/user/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL iamCreateUser - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
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

    test(`/GraphQL iamCreateUser`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateUserInput!)
                    {
                        iamCreateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '0d5fbbd5-26ea-4366-84cc-91b98c7ba70a',
                        accountId: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        name: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g4',
                        surname: '3tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm',
                        avatar: '0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmx',
                        mobile: 'nqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bx',
                        langId: '826f16bc-7297-447a-adb1-6514ef358762',
                        username: 'weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2n',
                        password: 'obxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbq',
                        rememberToken: 'qm71u6kwzsch7bsx394fbgxztxh6k371q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd',
                        data: {"foo":8265,"bar":11354,"bike":",<1&@'vm9q","a":"iuA'mm20kz","b":"$;x_ju.5d\"","name":89737,"prop":"gD7a{rx|zc"},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateUser).toHaveProperty('id', '0d5fbbd5-26ea-4366-84cc-91b98c7ba70a');
            });
    });

    test(`/GraphQL iamPaginateUsers`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateUsers (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateUsers.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateUsers.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindUser - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
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
                            id: '1cb9b580-df67-42ba-b5fa-4fbd67a73559'
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

    test(`/GraphQL iamFindUser`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindUser (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
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
                            id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUser.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL iamFindUserById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '37dba1a4-a7f1-4791-8eff-1c1258416226'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindUserById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindUserById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL iamGetUsers`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetUsers (query:$query)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetUsers.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateUser - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        accountId: '01d3c56e-5728-46aa-8427-4d9639511b96',
                        name: 'scnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu',
                        surname: '74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudr',
                        avatar: 'w05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jf',
                        mobile: 'vrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6',
                        langId: 'e6873d02-c595-4f91-8cbd-a652b9335fe4',
                        username: 'wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q7',
                        password: '8cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejyobcfizd10i97ukt7mdvihhnnuik8eyuthti0edezrm9q4svqk8xna4yd70xk5l3g2djfu9iznyhj6r9mzu0sy1fpl8j40h34rcwamj2qv84x95dxdoy80p7hnh2vnu51m6uywg0w54m30nmzsclytr0qsgzsu8hlxnoooiw9608obx75jsj0bfbqqm71u6kwzsch7bsx394fbgxztxh6k37',
                        rememberToken: '1q8abl7airl312raizbook4zo6lhtvhi2i52vr5zwwfybzgvvsjcb22tydt5cmlhsfuq1g3az43iypz35lr19fq5xdcyamk0ucu88kcxjwbvq9q8ret96fqrjswnje4vs26k81996zf869z6auhukkabcjfyaqfpchcbzv8m47qme17w39lng0ial3n897ava9kygwz5bvh5a58mfwce584ww1s31cpd4284k4a62c2xt9vorwc2tt66syl1axo',
                        data: {"foo":"u.5d\"#tugD","bar":69120,"bike":"rx|zcxp$2&","a":"#P\\#G|o#;.","b":"VTNzdv:sk2","name":9491,"prop":"\"O9:B*t<{Z"},
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

    test(`/GraphQL iamUpdateUser`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateUserInput!)
                    {
                        iamUpdateUser (payload:$payload)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        accountId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        name: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        surname: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        avatar: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        mobile: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3',
                        langId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        username: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarb',
                        password: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        rememberToken: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelb',
                        data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateUser.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL iamDeleteUserById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd66d700e-29ad-4b1c-82bd-b5fd498ff59b'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteUserById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteUserById (id:$id)
                        {
                            id
                            accountId
                            name
                            surname
                            avatar
                            mobile
                            langId
                            username
                            password
                            rememberToken
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteUserById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});