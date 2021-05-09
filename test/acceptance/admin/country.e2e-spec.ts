import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '@hades/admin/country/domain/country.repository';
import { MockCountrySeeder } from '@hades/admin/country/infrastructure/mock/mock-country.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('country', () =>
{
    let app: INestApplication;
    let repository: ICountryRepository;
    let seeder: MockCountrySeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
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
                    MockCountrySeeder,
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<ICountryRepository>(ICountryRepository);
        seeder      = module.get<MockCountrySeeder>(MockCountrySeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                iso3166Alpha2: 'xq',
                iso3166Alpha3: '56t',
                iso3166Numeric: 'py0',
                customCode: 'jlhrc4t3ui',
                prefix: 'xpvkx',
                image: 'paoxcilaxuiba9alyp5byfc0aip9s1kza1lxeqtmc9wsubma2raph9o3vq0zo6s5gerz97ahnpy0c2lu2la04ajy86zfzn8xlvikfpr73p1aou16132xc3ejnnb5ppc6b8gchlk9rpadrqjn4fev2cngw0hxs2wce5bhowz7cpon6x7s1us6wb3qnek6bk2yu1sk4yowdicmeixka83egd0f0f2uirejnyvdk8zio12oy88ecqw6lsq5be5zisw0ebtzzn7wmtbl5v9mwnqvi6cxo9yqgduxcezvna33qjfp1hnv8cnntoq8vqq64adyth2v0pm81hbdj4f676h1dcw6dcd132yzj3lnpxavm9h8dlh0ik3yx33pni18ijw3ikzbrvcu1gsqs8zx8l5rwi9r0v505gasvqbmi1vy1qzq9qxb5gklgxgncugkwu3g1lclxu899jgcas3t61698f68sepo8m62pkg9103w3omr159bkflrcpp9ullrwxm2mhnqd696chepqauvuj8j16vrf40ib3xrnv48ai2lsmfzyo1thy7wxjancs8kg68xze9mq9pdk4gp5cjcap46qe0efplthahath4flzzuk6hnarx66v6rgjsqy4pnta9mq6ytnaookdp82vsfl10n6cmligdl3w1nfflfbabpwsb72kj0g1qfghh9dloys3eyeq8i9t90mq78hjl4w7hduryc9ncb65sw301wxe97ehv7x8vk0zqe4c4hzrzjlntw4vsodprp3taoeyw81qh8cz9cgtfxb48o59t5uxwh81ymyh9wndsqmu6d97ioidbjfy7lhsk0adudiojdhx0y61va5kagb2wd7lyv5j0ndqwialyz1lmp27xktonycvjguxsk0dcejan6dh3931sqii33stgo20a7rq2jq6w1adnz5hm97iz9vaw60l4cl7rqo0so8xl0ba2spsssvgrbt46q0pmyyn9ke34ulbhxbmacizj8m5lqfhbllc1fl9hd',
                sort: 757583,
                administrativeAreas: {"foo":40112,"bar":51008,"bike":"+6z]a7vN,y","a":"0W`?X%B|Mp","b":16403,"name":3379,"prop":"q@SuU9wY5P"},
                latitude: 61944123592784820,
                longitude: 37541580924300350,
                zoom: 11,
                dataLang: {"foo":"57VplbiSj2","bar":"r|f=NjOS7D","bike":3768,"a":5830,"b":49918,"name":16562,"prop":29633},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '884f39fe-d61e-4f29-bd54-6fa82587194f',
                iso3166Alpha2: null,
                iso3166Alpha3: '9x4',
                iso3166Numeric: 'ea2',
                customCode: '8j42vu30b1',
                prefix: '98wk8',
                image: 'yjm6t3sksyv3g7dum7s03zgxkmkbb1y68609m3zw32zh0joici6q91hv1upj83y9lxun0pmxomhcurv37wtcwzfnuaguivg45cnxqx7advq1bgfspog0x36v35eeosnb8bniwe8sg3dfvmp62xng603zc8jj05l2nbgesh7ib82nrpwiemigix0gcfpgrlokvwh2qmif20nm036w3rppgv6sgpgykaqjxq7sqz2gcpwy6t96jum0omz8g7fxqadebzhd8ev8q8nnzqb4vtweiodztahzimg9l4tay4e2l9g8si7veztm81sfgd4z709klxny5lf2awee5vv7t72dq4zpepgrawjuuwtda6efrpu2e3wua7g9c6886hs3lftrbvqzmnsjj0efsoj8688v8carjqv76puno9oqzesfsv9lkg2tt4t0ffkyvefr78iqu9x2sfh6wuviq7l3dqko8ec07wqpor55brupvuk7jv0gls7pkwdqcfslk0s7242o9q3dplmml14zrgu4d8rfpezju2c7ah445ae1v885cfefvybo25208s5wdyhoiebvl2vk37b1gvebqyz75mrqnd948q6aubzmtlsgsz9zjxtiuq5wtjcpx0gy166us0f2bf05z70jtbh91sgl43duvhri0j62tu3iqy42hrtnhoumnomzko7p85jtg6hs4stbtt01yxqrz32hab5cqrz1fkru33hy2a1blwiyx6g4012lvddtibk736clqmiooelkjbvvdn0mhz67u2xy6n9janm3snzzsuyj07gdg798alxazh362mnzi9f5hjuwtjrhbom0143hackmlgmgvnss7yh80i1yshu2z06djjbal5pdwm3ge4iv3b4rco7vvbwvlxlen1j5tevvr2zbt2myt5dvv5wclq3rpqcq7v8432ascvlnzc321gb3fky28ast93326xqf30odqhws9rdgxu3rlrtdqz3x4co4hppp5irc6asx83uli4alwufdhlbu',
                sort: 661922,
                administrativeAreas: {"foo":"(i8o]sJ,^J","bar":"BA[y?d?oJK","bike":"{ZeR<47(D-","a":"3k{=J^Tc[[","b":33773,"name":95269,"prop":33485},
                latitude: 80697979869262560,
                longitude: 42036476718907510,
                zoom: 36,
                dataLang: {"foo":739,"bar":93801,"bike":"g.<hrzIYh}","a":48887,"b":99822,"name":"s%@<D5'b|z","prop":")paspf@'a1"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4dfd8091-a17a-43e8-b20a-a7829a18bbae',
                iso3166Alpha2: 'sc',
                iso3166Alpha3: null,
                iso3166Numeric: 'c18',
                customCode: 'epjs9f8cvb',
                prefix: 'jl57y',
                image: 'xzab2dgkvbvct0dkp69xwbttz4dayr1x05c7f4s364wh4n6tmugj3zypoiojf3fc6cia7v9n1i8uk2cyd18wecvshtj1po8t7gtgqxzqw76nbpcsa2l0q32lamqtd388dbqvx6ltbtkk8syjk96sgx5brjka6qs8wambn2p0hybehbx9mw775dkrs6ms3qbccieg95m7vo45nn1cooovf3jg1uw779a1kdavkm6ugerf89p2h1i3biee3soz108mb8i2c2nndxbab15rywwzgruzmmqi0m8va6irv03e71wfabwna2buq3q290whps40tk1oh4f0g1s7xlqklfpf2s8mxgx2nxhro6jiuknvue2gi4egmmd50yz1osa5db2291fbsnrn4u5hcu5vprw6w276fpnwx7u6m2l75ss95hm2cg8lvf1jptdpxiwo5sc5p3dx2mqur6l9p4mjkzqol02c00cyuc2vy962x0tfb2eqbuya2qz2bgpjioplq57latwwrp5a2susqj1tt5dsyj0s40mwwpa6xbvbc4p2lqxkrmwxtoaiwywtjvnf41ibdbzn34obcxdsv6l96j8eph7qxopekcrqsdnp6ic3evu3otkvl22oirrvyf6ybk0ps387uixs1qk92od8vr470t7zaacsibyxcjcqhjh3buvz2d86awrphaal5sh3pppmemctra3i1k4cmsqtnx3vhkq8dt7nnaxge4w8ptha4locr3uba1enqrbx6lvugns6t26s8va47g76eoj3ugzey0my32y182jaqk0ppr1ig9e6zxs2xezlu28cvjjh1w39r77ri9a0i6ke6qd9xzuq7d8qqsk1iscoecs2ofigjhzedx7qnd7wziynfzzgwv8y29pi514a9lmx7t0xtdzhl0h0r1zlu7ge7s2rp6himh4zs3qpc9n3anpoxuly7u14jvxryo3x5przf6hle73t1nf51ah6d6kz36gzlelhpu3mut3l01yv8b3trellmumi',
                sort: 794914,
                administrativeAreas: {"foo":"7l_^x!!`Mn","bar":60383,"bike":"y+XS4%b#HV","a":"Y*+*+lA82}","b":"_(N<VDXtk\"","name":78618,"prop":"+&02g#.Ms\""},
                latitude: 86758881760152430,
                longitude: 17401588421757424,
                zoom: 63,
                dataLang: {"foo":89296,"bar":"I|[HiHEH=|","bike":"4YjlCw&e[F","a":"JY<gR?FU'3","b":"CF&EE;[ucZ","name":"a?Fu*-2b2^","prop":"I*\"hi!(y\\/"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7965d9b4-f671-4744-ac87-5bef7e058106',
                iso3166Alpha2: 'ai',
                iso3166Alpha3: '7uw',
                iso3166Numeric: null,
                customCode: 'axrdbbzbh9',
                prefix: 'n1xn7',
                image: '4z4j6rqbnumwaa4d4k14h3c2ely2b6c3j3p0zv6eozq0xt9ueo4n3qjvcalsd7pd104k0czf6ejypvv0hn2z61cijdxrryq4ii79pjj06vec97s6ko630i9vlvbymapr2yrkape0km0m2ia0o11j4g5x79rqwiqgqh0v7d1jd3eai4jllwo06ogj8548o03br810duohdw4z84i6qry7uwb81sxfmucgq53ynygwvztxy3ns9wq70ya092590hzgept4uanucil3y43y4a19evz0lc3xkuu0z5nfritrmk8hrnkuvgb7i219wwgacnf395hlnytoi47anfz3rarr7l5g4nni1tols97l7hn97tefzxkwspbppyp9vmfh50ehy9it5bchen9z4r0gq1yv7bo6km4r1n1mj4nq3sae19vso7krinmypge5pimqnxnw19ob1zvdphus7tdnlrjkmx5q7j1k8qtqmy25he3ogce8pidnls8n58g4ajil9d81gjb8vnt1b57eh131xq77a4539zhss7q4sikj9u6vmqvmqmvgusm1r8bbrm8ub1o7wjwtpbvr6vb2d6iuazdlnreujf85fou30rm92pmlbo5mcdobl4ri54j6okv3mtvjkvupvgq5pfvrg79bkqwiidmi80mb0syd5zh2rxkw81l3js6u3y2yxkyhlstmewoh6a4yhr5o132kwju5w8wgqz8oh217mx846menbux6uia5t85qjyxpoocbwbmdc8ridgxr7s4gg1q4bon43hvujv6uin6d4a98w5rby53ey93932fnhps4hp19jw2si8bbj5ddab3zi0ulw8orva2b9g0es4c7z0556wu5f3a8bsat4r62dpcspfux0e0rcs6d8bmlnvraeym1ex4cnfrvznj5pv5kgwxcd5ztebylltfxuit4muq7qlqd8zl1i2oytqdddthd191gs2v78ypp01ns5675dlvxjvhanwpsfnlibdzh9uhhjfpi2r45kqod',
                sort: 500317,
                administrativeAreas: {"foo":"quDLF\\0vvO","bar":",^*Jpx\"Ky0","bike":59477,"a":86065,"b":30648,"name":"ls6HoWpK!*","prop":"H\"f8@.h/-7"},
                latitude: 37767232576122390,
                longitude: 34063604278890532,
                zoom: 12,
                dataLang: {"foo":"GD8G79Ivi:","bar":"}uvkGRD$Bf","bike":"6N?OwFOwRF","a":"aFYo7#'_#C","b":">U.zRKF>(v","name":37511,"prop":"XA^K,bIpDE"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                iso3166Alpha2: 'v2',
                iso3166Alpha3: 'r01',
                iso3166Numeric: 'jfk',
                customCode: '1gnslcq802',
                prefix: 'n2meb',
                image: 'uhnci6qlfzq16mmt2upoio3c5z0isqstnze5wmdsvex02ehf3ws157d1lzepynpv39ml70260b2d5pi16c5r435c4aayn4od3fos0cdw6w1zvs22uiw2f1hjqlc5ygq6ifiybzkes6rpse9zoyln2coa0s2rhomg89okgcc3rx9fqpal4ytrnlkndqf9cu6c3rmbg558q3m1abhsye2k8q5ux6bn67dmbfpd4zexfbnap419lxabedvx8hp5yzdzlvtiliaoanshsepndnep9g48bxzmcfy5djgxkldj4zdgwfjp9z59xi1ox43f17jeffylikggorzjxcaae1y9528zvixjivozuxvr1cgd4u1qw0yyw99voyp5i34wzntxwyx53cip0373go7yyzxdqo3zttz07z385jdjghi3er0atbt6sj4upnxqv7vg2ftl7swnkke3225hltmdz8qfmaovcdnpgwfx4qyjuufz6acty6aav5h4rwfmvqhqf9f21ccsf8s1n4uhjuynjo61lpkzg6bpx73fsnl4hvdjg5zz6izf4n2ozrttvdyncarpdyh0ztqk68og66pcb56vvjkp1w727der7gj9ad4cihan2tr0v5ltdlmis9j3a3k0r047090t9r16d9uhf36awvhlzm5yr69xes86mq7z9xcpoxsuk7qc2xip9bqudrvbcsl9756n2qw3hiocsge9d67pbt5tl43uo4p7lhmst150q07txqbmwn06ptfo0lqni5we3zcdc5biuom0jmav02vher27qre2go39cfnnghwlkn9ktw7pvafc1pn1nnbi4khe5zdjjrf3269dfoudigox5ymxg6tu01ygjj5sv3czexhidnee19y9d5nfg313if9hpivdaklizy93edgcv8bqiglykx3hkwzk2suslrviv3mgnovm9xuk0tkh198za4gjf7vp9ppia285ylzruu3lqz21wvcbkwvz3rx2h3vshpznffs1t3uuoschfx66',
                sort: 225524,
                administrativeAreas: {"foo":81340,"bar":";GbbGr`UM*","bike":64005,"a":"Dx6c739|w?","b":"Uz5=][/[Dy","name":75838,"prop":"rWauxrfWb5"},
                latitude: 91138719135360780,
                longitude: 65629909287011896,
                zoom: 39,
                dataLang: {"foo":15923,"bar":95503,"bike":78565,"a":"p%>>kJROt)","b":"%G|Je><iG7","name":59967,"prop":25385},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '8e9bcf00-f7d7-4c3a-8ea8-a7db8eaf9441',
                iso3166Alpha3: 'brz',
                iso3166Numeric: 'zgm',
                customCode: 'rkjpctr1n6',
                prefix: '4x9z5',
                image: 'n29zp2744ffelm6afs091v5ivzzk4cyqddig5zykchk5h1qn59hiujmilskr2oyvtx46nnjeyp8bituv26yeoactrwsfua7yk98gy12n872r45vjciy935dvkciere3931h8jdrm4vhwyypfigko9qniwc1ll72k8ar8eggi6ooli3v1j98xzjd2kr94lbtrlvc59k0b7fub48rngg82pendel4jg5ch04ag2s3vqtqnj0yhfar189fco8whr5e27423tutsl8fgk6zavubl2ys8qe3dxqqp2enlk2pegs7bcovvam7h1azvq2wgrx28f8uet2tf54vdljgjk9gd3uewn79jt7mhqzpajg6q0vig4k6ks29pgvavshjkogi4g8zl26eqryyl7dme6krzfo2h7u28znudfl0crmq1285ijwqnbku1hogfhuwj1lx5vyeavpcth1pqqy042a8ekese1gtol4ga1dhee9ag32g8b9u8y8x8jy9ume1jy6q5d2reebgv30mhkc6k7ihjosfjon9lyv6gqg04e9v2iidddio3cvlcvrgunp78i8qbtc63nsta8ou7rpy38xty7i9jc9lglecwbia67wkuwx8asts19sozqg4yvrk9o4soewzubgcjabch3h66wpqlse591rdq8lbsb9nu7w3pthdq3iss7dqq0n7n0rno7hkfm2cvk47frqhch901837p9ivpdfd3apnxmh4ilu7ihf92ukek41phxidy2hik3ws0t5noic1xzaraeeprbq4ppw0y0t7p1rixkde3t25pr4k1nxut7s8disxts59ag3txjqqsuf9e8vud3n2wjak6wnq1t4luih5mabhwsqsjqgvrihyr425c6i82dqj5tmqkfr24cxrnulj3a7btilw491ee994gxjv2e7retvf93324arq3c1ssk3n20wt927obcjqj1bbnaksai5dcc6nlpfdvve3f0m9leckufwdawdrmr407ejb1qysj6vyvtqr5',
                sort: 143773,
                administrativeAreas: {"foo":"\"$LJ^mUt]I","bar":"83g4bP6xeN","bike":"ZDXK`GBJTP","a":66903,"b":"[zv\\9vFmG]","name":44428,"prop":"&;Kt|!4o-r"},
                latitude: 19182084018487090,
                longitude: 60507289655492920,
                zoom: 34,
                dataLang: {"foo":"nTY:e)hjo4","bar":"0T%(/.KX.t","bike":"=p9;X5m<}\"","a":14533,"b":63822,"name":39994,"prop":86383},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd41b51a2-a141-4704-97cb-065e4e43c973',
                iso3166Alpha2: 'i6',
                iso3166Numeric: 'jar',
                customCode: 'm3ypz4wfg6',
                prefix: 'zaes8',
                image: 'dvga64cjwt148kilnmcbyvbj3s3alilm69t31q1946iotwxbznveypc27mttjnvpw9r5se2z2rt4h2iy4pgvi09fwi7mtlz9valvr6tfs4tl824l7sdz8jh4owgt2ns6bznepu1aa0yiwh9yogi8bqb72uy46fcwnrvr4wmr0gpqnyg2x54j1p1c7atexyds9t542d4ur6k6dy8emcbv0uygwn5spel19tckjhlkogwiv9aqrwdu2qic5x1ccbr6w1t2v2295yzu613mov7s7n4tynqub6mj4cun9o609sz1w96hu0io0j0x0e645sfzjjdzajmkrez6eeg4e3zgc5b6ckf2sy9gy1lqj968ul48h6ymkovu4ecg0n1bp2qeqoix41jq9om049uxim0si8svio3qmouay53td9cj1kobo8zm1wkd9ew0cssen4irzvjmt02gmixweea9udxe7tteess7kpo8zt2sfdkudc7ytxb82xl5phw4twu46as87yxv66c31ag8qndlbeibdo1uy5wdja0cvqili0xij1mpf04b633synefrhlmjvrapg3b5gq2ytartef563lfsqb0amjzi5xgddqcl05dmiyxma8wrjuccf6xdha0wdxaazsmy7byi3p7ny908ciwwdaz9621y0hpybqqjh5pkrq1htdwiw5usqpbk90vqaviuhjxu4brudusp4yo8xmlew76a96wjvp3lvmrajo2tzszbdcpp4d40r7w27sle0vxrg5gu640o1ptco18rekavg4oxtipfr87hco5yln9bs63c627rijqftep8wnrajegzp7y7wntmup2qkv2vtmtv4x36t3paqm44lzdt2pk7x0e24sw8alf524ykehyc9r03tsktgpulh8vh7di1slxqu8vs86dlwjkv5t07p3xdf0lqj04e1emfa9f44xnpbsp6qdkylpoln4bw67y514zm2g9vamqoqg1u0yk8sl8a1epcjfaw8anldj6for4tzs4',
                sort: 985805,
                administrativeAreas: {"foo":"BxZ>>xigYE","bar":55545,"bike":53814,"a":49490,"b":"Z({[oBVVD'","name":26957,"prop":".fMF^tztR1"},
                latitude: 62859013605251070,
                longitude: 65670513602297130,
                zoom: 48,
                dataLang: {"foo":"?Thn|I+N\"?","bar":"!5q6Rw|*Rk","bike":",X'Wx){nfy","a":"NW)d/V*`WS","b":"a9dA%+Zjo5","name":"Nio>l_98_t","prop":"sHZnIO-Ox0"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'e9a34464-4b5b-48db-8836-963c061760bc',
                iso3166Alpha2: '81',
                iso3166Alpha3: 'jcj',
                customCode: 'qvos9994j0',
                prefix: 'nyxcx',
                image: 'kleznhu37kcrkugut2ws9m2o9kuoh7xy6tex6vjbv637j2orhvy4nehwadkddkw6lvno4cweozz6ajm7l3atyfwewlnn1z8k8lag1jw0bjtfg5jdokoresu2xlmecfy6c0b3ynofsn0w56y7dhop1w0i7fwrkjkg0s5lq26v5h4l75dcenjjpnkvbjiws7kpi3j9z9cbshz5r9ujo273oum5hfamntc779gxbpzpbkxzs4d9fddmrbdknvtr46xdydsmxq7uxthuoug3kky1rdlujlhggwwio9n47dvqxu9usdqxvko3h7v2uy74zqc866flnfes59ta71teb6swe6xtblmfwibwliimmej2rf704r0wlo800v6upulpu5dm9tvm52xs5zr14uxadgp7krfkvwy31ltrn5dvkgl3rxi5avx0a49d7fg9wgh2aqdbrflwtlo0efkh5t6f3azg22trst645kkujvuead829ek8xcpmbbimoqt5cf87pugxfpe9oe74jrpvguppw3j4e5380b94qfttb2n51f2ytu9658u79wemqn0qhs626pdahextu0luyrskpy4ez6ko6z15lnpxvi5z554n0uylwa8y8x94rqw5f8ljmt6ou7ljrn8n548f0jxmx6t1pc97nu8opmkpm6p1wvmp77n10mhl7f2dmunrj7cnbcgheqrtx05c5ktih3tqpl69ec527lf6xbpxo8x19dia2xefuvdy3qxry60znbrvbjnit4gk7su1mhes1umvsabe5is80cuva4a0euc3zqwf0fhuk0cmrmhh3gf7shvrejp6fk9aov78ovvb1x9b1i5ijwyj9h91odey3vvztuhjur86mrgmc59vbl1xw3etarmhtkbrsv1z0qaz4jblxmdkhk4ifn5dsckcmwujqaua0uru00t0q6kq35k95k9ap5s1edwl9zi6ma3odtyi9uxs9mehorsof1q6bdizhftapq8cpw1dm7hizt2q1e3zy1s96n7p',
                sort: 106852,
                administrativeAreas: {"foo":77146,"bar":67653,"bike":68182,"a":9684,"b":85943,"name":"!}+V)1[)AB","prop":61767},
                latitude: 89086923667150500,
                longitude: 97796190821755420,
                zoom: 19,
                dataLang: {"foo":67440,"bar":13765,"bike":6807,"a":89886,"b":"Mw\\E/'#`:)","name":"RV{a3:zbXd","prop":31109},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be undefined');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5qh9o6zbhbsrrbn5bgfk45bew66859kanp7d0',
                iso3166Alpha2: 'ue',
                iso3166Alpha3: 'ebo',
                iso3166Numeric: '5yg',
                customCode: 'h96jukavk8',
                prefix: 'cft0s',
                image: 'vs4268068ra5lvdtqnyer2bb9ftkoi9s1iszdxjtnqqn81bnacyfv1njue2aqr6lhilv4l07cf9bbrbu21q8i7j3oeyz48mwn9vd680lb86a547w9ppx8gcpgfizijxt75470vlksu3pvn8x9f4web1ykhlx9almi8otizwbrmmgnrvcz9y0mlwf2lac27pery80zgdhh1zppouhd70mxcv1qt4c3ajshugbpn0u6unlg19v5ra56cjslrq7bb6jmai67w9j8gim1878cieq7vvhtttaf1lwwu4gi43y27bkwewk3oqvle5q1q7is6g4or4mynry66jdt89wvq58au3gidqo60r5pqxwqjg6yrjbzjt9crg2uudn8g45vdrf629esd9r9qgmsq821ijfe6e6nqdk675u8n6i1d21c8e8qhqx69raw0a98kc0hca2vmb9b62aewaoycb9cadfvjw002zyt12o4yv44bgk5cx3a72wz2pmhiwxmez14sbfsg6a5ajiqt7kxs890g2sqr2l54p990rjfxvbm3odbwzowilmz4stnypwj89ie2n638vrbpyjakrmz2yj8y4hsfjtty83logil5n3rpwo498xor7e2h6aa6ovrut2sd0bxuzom1zlauawbd7jntj5gb74zfvweaop5vdcg7q7vgnwcws5g2ujgff10hrd90adj1b1poz9x81gs18n34xur35q3qvm9g3epjow5d14sq2cog888p1bzpclqbrwx5rjix3mplaa8yhfm25kddccu444kkqmuy5ef52prrw7tbaug8wri1ca1r0n811rv6v7jmctwxxcwfjryqimiaj8rxibsn1ueacv5r6ax69aay0gc5qswa6m07bf39ecnz2508mbbtb72xprbf6yagsyw0dobu1fa4a8g4h63bhqgqp3rst9eshro6f56y87rl4n5x7jve4qfs57dg6uxbp07fz1oyuaa3pfano2wnkxg5fpiinqi52flossz6o8oia3',
                sort: 478363,
                administrativeAreas: {"foo":"W+/?vD1Kou","bar":69047,"bike":33798,"a":"}EUEi2lZ9x","b":91934,"name":"xa3hakZ<9_","prop":"4W%10P&n:@"},
                latitude: 26885752994406376,
                longitude: 59471659139431930,
                zoom: 89,
                dataLang: {"foo":"xw7WxZ'fv{","bar":"NnxK1&`]e4","bike":85353,"a":"I3dVB,W6Wp","b":46769,"name":60626,"prop":61041},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 is not allowed, must be a length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '13c45a42-21b7-4e32-b24b-efc27001d1fb',
                iso3166Alpha2: 'ojx',
                iso3166Alpha3: 'hmt',
                iso3166Numeric: 'cpz',
                customCode: 'wa08qtaqao',
                prefix: '7v4zc',
                image: 'jlqemx2dj6capcp8s6vtti6un5kegl8aedyleke4l2kxjs7osbtszwahnnga3aeue405nrlaarloco07ah9iejaxz3gv8zcpteizcl9iamiga6jz9l8ceyqgqn7lvi481o3j52yhiwty7ub67dh36sj69yelwv49fgo25ze2uii4vh9vap9wh6qcq9pe5vg1dm3ruh7y9ouvaoejrqb8ifystuuznbzka0c68sgpmf11upcg0lnemtpcyyukuiywd1n448oxzrink87n4s6l8xq6icue94yggtmk90r20sya1n4ku4n957jy5gi32l2vv1g6uc9y483qhsoayijo2spzojtpjx0lxnushoj1ldcwddecib7kqrq372elbq7iox0nj2nlnc6z5xzmfovpdi5jt6277arpw9vpsib1i540o1wfgwl9buoq2fle2g61848c6d1986rd0unoh2hnkhkdl3jrn7opjrym60ooaho06p70n4gy7yilcdqca2cnf9vlu9fwrnmwixv5wz8rah0g3gurz1ecmvy7stbmc23pj0tk0stdoc2e4xd56zotandewcljqo96m376yozh0r3uth0d3n3165q5dz7j04xwh4j3sgqpk2n96g2hgqewhell08jamd7wgdt6whzoqfa4btazrqcnytks1sxxw57kupxpvo0izzuo3wc1n7pjaxzvxujfs9tk6l6kcln1qp0wj9cxgkf0fa534hru7fmvelu4s3hipicu8izxpc5gvbdap3b7wn7rqad1zigtf9gdg46x334vn8nvh5hcwlxva9kelgcy90e7tq59ck1cy6ho2rvgv6358gri2fj1tzpbea7n1k79dr8q79erk2bctah1cguv2jpy96l62p5ml868vvzv7giljpgoiuqq26gzdux14awlmc1o1u38ej0ip96z7tbivj10022e55bgdk4rxj2h6ulfrrxkjblmtgeviacb09iszyc6uizf1v9125sirlnp9oyp6loxaqau',
                sort: 525762,
                administrativeAreas: {"foo":52807,"bar":"^l[})LWCy+","bike":15613,"a":12908,"b":"!8QBmlzsYH","name":22574,"prop":62709},
                latitude: 43645402194142210,
                longitude: 85000678989548320,
                zoom: 99,
                dataLang: {"foo":78490,"bar":49548,"bike":329,"a":21369,"b":67058,"name":"$#|z2p4H!3","prop":"iVn`{h!c\\1"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 is not allowed, must be a length of 2');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 is not allowed, must be a length of 3`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '59e93a57-933f-442d-8578-3c9db7c6a330',
                iso3166Alpha2: 'fo',
                iso3166Alpha3: '2yqj',
                iso3166Numeric: '4hj',
                customCode: 'p56ks3bk0z',
                prefix: '7d3so',
                image: '8zhqpa8dn40lnvd2ddmycuqzth1dglxrazapqlwdpi0foq5nyjjhh9ujmzqva66mq9wb0acafcnhowroqjeiceh04lw4uzu6fsnchadd3o5eege1hwjdv1xnfqsyuv0p73u3cbcdrvtk0fqrncf70tv47uvvck2xp0vu7638fm4wxexmtcg0a8vlg4g7rqh6qcodcksjh7odjrrvslz4gqywnv66fcmufhz42vsk8vttreye5npmudlryc4tst20wxqhudt3j4mykyp9mcazgg1afkvn121zlhwdf7a5mem34f55o0gz0csm2kzxwc4801xta6murp2k6vgq1gbsjw32em60sricmpz1uxl2dutibifu37fcw3tgzs1q2gukcvefrelzypf5bf01xc4jqj3vme09buc66il3v7a7czioox2t6zg5v61evdemkd0985or2l1u3ajhvpndy77ytgitjkig0jsnufoy04i0siimeciccs2addcqu074rucafd3ln0eus99iwurdepmplu9fnbkg05k9pxxpq9llmqmro6h6vb6e78o1kuy5p59djs9gl50hu36wvucau1h4dq1pxg2q1g4mcq2imko764pvixlk2ndgjtfcj76mzkckxqy4vx637lauoifhlee8rumdxjxe3dcohkexu0i8u4m14l7j9ts3ynhizjfpubu0uzyktiezbqdeha4ab1wsjkuthjmdkg61fkbl3jfino49ndzicwl7h7wq0ayo2l79sq0f9t5mrrc6txp2w1krt3maj2t5gykcleqb72y7tch3kc2phhaalp6lqc58plgblowguf03ngmt85ibru792acl47mggz3dy2qctl9ph3dob4fhegurq1vjo1jv7bry4ftxfxvx816yz3fmiltcqhustw684qt7vvvz5v17n84e3ajxcocb97f2j85xx4mxm6gq19t55wikfyzshtpxw89jwkqk5g4b7a0fykv005znew0pggul6evo5rvtautt',
                sort: 240413,
                administrativeAreas: {"foo":83079,"bar":28955,"bike":"\\bQ8I*,XNJ","a":35804,"b":"$=f;OVhIi(","name":"gW4{MIX.zq","prop":"()d$xKFg5I"},
                latitude: 65516289954815944,
                longitude: 65585747082611300,
                zoom: 46,
                dataLang: {"foo":"w;ql?.-9qT","bar":"UKDh#$uXY=","bike":28840,"a":74705,"b":"j.u.]@[=5f","name":78854,"prop":",{cR!$XHqV"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 is not allowed, must be a length of 3');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric is not allowed, must be a length of 3`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '7f83a573-f510-4b30-9af8-8a141d4c444d',
                iso3166Alpha2: '18',
                iso3166Alpha3: 'a4o',
                iso3166Numeric: '1hfm',
                customCode: 'wrqu2o3r45',
                prefix: 'zb86t',
                image: '6bqzg1l86070oi0q6yh6pph8b5itj7b5xpvc1bblvdn6vph78vyj7qli71vts25gfk9n14y7xsk0xqbmjt3k1v4vmbeld60mq4w79bnejzangr4n1ny46t1iqv3eg2r0i15oys8u3aq5zw2q5tpau1ol09axzq46yu107ycj0w5r5m9vxxia5occnomrlobibah8yn5qnmkmbt9dr7dnh80ace3jfvkdqx4rzithcwzde0rk6fkc27lcrr84ovnx4e0c70xjlugylzqbzo0csyxrcodnfhh78fsaliqqnjwrkw77qtam4xw3ml8262l08izit2wv3su8bh44eyugkl51f30k9skpg02t69k1jiwvn4exy3padw1lj6vjwflgpwdgizfsm168cp9pvcc595sunwysqks7jzos5lebtuckorz0xb7388gu1q42pwg5e2tn77g2xevkbn0m8u58717vonj6l3mcandmu7kxqhgukcp86uliffags0jl02ktl6ouv7jovldiwco0yok348km4jek3c0lt8o75mpj63kundgk2ra418t3ly9f76uuc6pheooe9x785v7cv5s48xq42e4wc4hlnbeux897ild5t0zn2k9x76hwlm5oxmpaisxrh3lazqbwlmmd8667xsw96g52ipkbn8uqobju4la5hpuu8k41jw3uoicbsqki7tcrw549k7pi9jodlv73unyf6blnkr5ygu1t83rmk25r5q0yxv07fe7lugn2jit5wlq4jmnl3dkiortqb55zsrp7e695om3lh3y9bb9acfb0vimpbabrw2aerlvkm6ml7oktyfp8eldwdi91ty9cpn87vwo9ds7a09txq53faoorp1f1i9r3wmq9a8d7bpz8n2ee0agatk1lwc8z0rgfn35tojhhidlpl0elp6vakq1hv7lyj1t8duetcfd1cy4wf43o7mxoycvw8ne8mmnt5gmtnac88151rp06ccfn6x69e8g7bqt7dxn9w46yvwbz',
                sort: 764352,
                administrativeAreas: {"foo":"I`'7)Hr(16","bar":"LKA%xrgmNy","bike":85690,"a":"44n(K!2hdn","b":"m>Z-c%lVFs","name":";%`#&m;v/X","prop":23398},
                latitude: 82505314249677090,
                longitude: 62733526383904984,
                zoom: 54,
                dataLang: {"foo":"u-bA@IZa?}","bar":75333,"bike":"S+};uI:-hU","a":"ecDeraLq:%","b":21276,"name":13518,"prop":83338},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric is not allowed, must be a length of 3');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCustomCode is too large, has a maximum length of 10`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'dcf22559-0f42-4f88-98d9-9cd0b12e628f',
                iso3166Alpha2: 'vm',
                iso3166Alpha3: 'k1u',
                iso3166Numeric: 'tfn',
                customCode: 'ha31bmax1ft',
                prefix: 'kq75e',
                image: 'pg1lxgmfk8efdnbmkyogqbjh458aik9etx0sokci7r1y6yb0p107bn1u1jw2zmzkv4ktde9zb980ixj6utf57mge8btpqbvm80au61u2sjzwc95w2u36xegv5a78thh3xeset6yo2ty25s5pdkqub1skp3c5azhwaequotlb8f25lumxsno7fz49i8pyu5weo76pj6yly2llqmjmc9om1ylfsihe8lj7djburkic8z44exvp1q0fnus1u8091sqixk28l6dsf2quq7s8kygeaixkw5n8nmu8gm3lfylg2pu4g72sq4z4tt4ldpxsigrbk9ukhdu6saq8qz3cvxk80apjxky04dggf0zb0z77cgf5fdqamu7t902ufrauook8lpexnkf668gbfd5pfax14vfk908tkbf8nzh255doyzw4x9l156wgz2j0nxnvutgf2nmtyze82y1x592lt8cvqgribnlo6j6823gyi2eys1za0dixh50fg3jw0rlnamn49fejr37qqmryq3iuo9wonj0cd1l6zi8957n9zs3aec1wgcmkwxf3imwdtdc7fd27yhugrbzezifkj5htkfcnk4ebf5qy1135t0s0g9lze06h94v4fzs3a09cujhvtn1ay53zuegireyh2ut1hqmg5wzk5qf3gig77wl2h2wes2hvc4bm0fxclyzy6zcs0fytlxsfphs3tbwwj9k6a0s8u6yirpz6d56wnvxpjxmqpb8asixa77fhldk7vjoob233j3pmylnrlyshljjcczg4avkg7d9hob4sjo6vjnvctvu9hytzg4kcsnu7xzmsepyr3txjq5u1tayke9xtu4425mkuyla6wysos8wyi5y3g76sq2jwl4lap0m3zr8oafqbel4oeb5zv9vohq4ymnf6yf05ixor55sapk7ifli27rckvkoettophi84sjk52kzbsqtg7hkxnr7tbfv4e6olcvkaa3jvv2e375a8seax2yqdplvnviidezuka3a02g3t',
                sort: 761268,
                administrativeAreas: {"foo":27308,"bar":"-]mZiT'9`Z","bike":"BuXH_[V}oS","a":"OCX5RhJE3^","b":82051,"name":36899,"prop":"*N9$s'%/Kp"},
                latitude: 82506687025788380,
                longitude: 82915849272790340,
                zoom: 84,
                dataLang: {"foo":"jf:c8rNd$B","bar":24125,"bike":"$nDvow)N@J","a":44509,"b":91734,"name":82667,"prop":"6YLUPpr/`)"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCustomCode is too large, has a maximum length of 10');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryPrefix is too large, has a maximum length of 5`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fa0e6959-928a-4c3b-9d6f-0dc40c0f3671',
                iso3166Alpha2: 'kn',
                iso3166Alpha3: 'f5x',
                iso3166Numeric: 'pq7',
                customCode: 'bbau5pyjiw',
                prefix: 'mw4gof',
                image: 'u5f92w1vpf8tnyma8ylwgra1fj6k87wespxyuad5xa9doby5bbnk6ckuzg0cnw0glssduzlbbobpyhw67yvur9ff41tgbzhfm23851ypo0jcnhaqpq67kp73uqkcls103lvioueqqpkayiw0roke6m7g1exn97pq5262yxhzcmm8v70lby7x5yqqw6rrp7h9ytjz9ls94r93npc3xr82zlokn973keowdouwcgohi21yexaz2f8nqbfx68p93vjg9b503kqrs18d7wkmh5dliett3kd1or8ckue32kxlyt63ap6dtv63an6amzigwh8fgb9o03wveyim8lydreqhnie11wadt015nkxtipla7kufelir7gb3sapbgityeb84ac6qcm724fpr5kehg60yd8hmsllpbbuyq87fjnniostcwpxcen75fhks2g4euhy4xcxnwl3gpycopr5m29hnunfw4h1v3lnbeegkbxqzr72be3tcwmkqm1yftfys98b63qjg68mski86hqgvyxx9weqnazk1oc704nilfdpyt52b8mbuw80bm0y21a58v32bs5elya1rq5mvliyef2339uvjcw4mn9sfpl0lui52gi0g0l55h4m483cersij4szyk4q61rc46qt9qe1t3d8mjx4zehc4cwegt4zdpu3vo0ys4fue92bkh58dds70xpnh6ppey71ld0w8i2fkisq524z0d9uuypl19t5jaqts00vjr97hb03g334xa9glyki59d0j1j562frh0jmx1nh742usx1f7yeanx4cj5uumhlahztv7fq21o46abcfbelg5rrx10nx70lgs57nk8oauiayp9ghcgwlswo6quimy5vgeb89h2wan9l4f67s408h44qkfiy4vzweqfqj8sc68765zok89f6x5kqgfk60np08rqivtyp44kh6lrpoj7zsnafjwvvy42lxsp0fp03m0vetjz9q7lvqyy9mh7sxnnogsoghkt7l0yjb0i57xaa87',
                sort: 935296,
                administrativeAreas: {"foo":"GqGFx$F1pc","bar":92778,"bike":92206,"a":"{Ene}C!aPT","b":30294,"name":"eI$]3v$>(8","prop":"ARz>nID;7,"},
                latitude: 57915514985656410,
                longitude: 52802767738136550,
                zoom: 59,
                dataLang: {"foo":"7Eo}>YYD%@","bar":"Utqxs6lc]_","bike":"&6@+\"GNSZ3","a":"S-Phy'W-^c","b":30961,"name":"cw.>cky0+$","prop":29729},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryPrefix is too large, has a maximum length of 5');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryImage is too large, has a maximum length of 1024`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cfb0599a-49c3-4291-849c-7cef90cb99aa',
                iso3166Alpha2: 'vh',
                iso3166Alpha3: 'c6v',
                iso3166Numeric: '3qc',
                customCode: 'tt1upohajk',
                prefix: 'rxuh0',
                image: 'u30jnfdilmp16ko9r809fo7knitvpj9rk0y67trl1fos98w3o3vzj5vcnq0ddyayne4v7tz5q3url2ueyaqp9wv7epzjefwi431v1udeuv5eefp06rkofmy0a7a8v8kelzzw0fu094x9k5p06ct3rm5qpjict0mx6r0jr6arhr0g64cd9bfhshbdmqgth4z8xpa4nl1u5xrfp1okkxmiixhmny5rqgcv2vncbdu3cc965vcscsb21etw792rd951i9ot7n5wtvwo9ekzk8a1269upqatxp5nocthvy1a7yfzqeho2ttgc0cnx328hermmcffu2nnmfzlou79op1tv6ixrqted7s1vpqcfipyh5p3vsmf7bxlxwgk5ddb7x21j3pwyywn1thoa4h3up61bbce1tugvs9rt6bwscq1lvud570rlunexe4tva29gaut5nkr8aw4aahcjn111wo8cipvrvpkhpo2qp6bwonykb8atkiak0qoyg0d9zo81afm2zya4ffnqt0u539yvvvisjt58rk3su1lz0nudpnrokenfvdhr3zib606mxo1506kzyizzjklxowsw0jjhch38nzcblghki17prelkbz93dv19a7kwmnnrf15a3ba6cdpuoap20ragtoylqptz63huoyon5ay7g2gcbgwldb076riv5qpll3z8xqhk7nqvnm8hst57u8sv98xqmui9ps5hzosqa5n2cdycyyqp5s7ay56l8j2zd63d05e65fxlzi1vzcy1pb48dts3kffyflvgtblcnkw3qn3hwv8jlew4we2ls53bw3nmgsuscsly2780gaw7zscuki2fjhw4s674v8bfmnrtie7ytabwokeumlgzgontyogdjlr1lix6gmep6dsc3se3hblz2vdbgx8lnmpleeqbg7z65js5lx5fhfw8qj2d11vtcslqf3f3mnps39c06ee5skdwnhj8vd10l7gt59las3xfbgypt8cqsf4pkjk71tt9q4opoggo0fdy',
                sort: 423169,
                administrativeAreas: {"foo":81852,"bar":"S};`Wx`yx&","bike":61688,"a":"m0QpCvv\\3E","b":"PUMS_n7E[\\","name":18469,"prop":":@6Wv5X-/F"},
                latitude: 49273920644003920,
                longitude: 17323783808673958,
                zoom: 48,
                dataLang: {"foo":"{?Uc$qy62$","bar":81071,"bike":40139,"a":20944,"b":10531,"name":"_lj\"6Mrynp","prop":"F,dh=w<BlV"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryImage is too large, has a maximum length of 1024');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySort is too large, has a maximum length of 6`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '5105bd95-c64c-4ad6-a9f6-91951f95ef20',
                iso3166Alpha2: '0z',
                iso3166Alpha3: '0qx',
                iso3166Numeric: 'aew',
                customCode: 'b3gjt6fsat',
                prefix: 'yc0ai',
                image: 'e074zp5cvkqng7yk6ro8jh4yanz5cfjt5e8gsm4iyja76e2lgd4izt14rfj1z7t70a128v53w85t5mt69se5wqchdeja6rftcmpba68ap937qafk3sf6fryvordkidu9feb4kh1sw00f7tb1db6ga9s48ri9ontjtsg0eqxjcfilpv9h3ddyakro6a54oqvqg4bwmsmttf0e1sjc61c3av2id6y6qiu223yy2pjgyvywslb3r0k02wgj9kchjht1eaqb8boxa6j0zewxbfla1dc79pok0khi0ikrp2h4gp5cdt7539vec38gjdfwemdpsjr8piesohg64hrs43ragglcsebrc90pppaw0mw50x24rz5q6wj7ymebt1l7tw4242qc1p65gzsoh7uqlvtgg2n12l7jki4risczykfwfll729uxcch7g77y8usdgb1p8nm18x2yiwn8dkati507g576xq28umeojo7nvst2s5mzdtqpkrq7qmgydkkm7fj47rmzhv9wdy3mkkuozh0j1os0iws35ir45nn566i88zn3ryc18m6u7n1f1j28j48d0czi9wgv6knef4zf8e9fqqshxikm2shjg2cclr1k4ipxgwh0ieo993hbw8vgdcns0ffas9iil8yrfvb7gw441tuicyn030j9hb3z1hizqothzpl8wulvw473dkd8npph3i1dw0601ovy7f0fmkh132e8f7j6buhxt8sy3ydaf90yfwn0oknlttb7ia1fnqkxy4iz7fisen02bbl9kphcanpmv4r1hhyqllrjhfrto5z3w9cbzooxn9o67tr4vk8x0ufywo7xmvvbavwxagmcv1f9u2wwuawuo0kby6qqa6pxu6aojvdgby4p63lh8xjcfyzfr7uzyiiy90tf4z31kiy6t0e7ne1if3bcscmj5olkroo07y3wg2bzfao3v4796z2wa6yixp43fa41mhwe791o1wiut7r71cushb482khnepuvgnfpb4uliolabo7c',
                sort: 9503705,
                administrativeAreas: {"foo":".i8)yPc`Ip","bar":"P^+^[wircC","bike":14620,"a":"F#0Bg&qp.x","b":25527,"name":97741,"prop":52931},
                latitude: 22454470069690824,
                longitude: 63232721635467540,
                zoom: 98,
                dataLang: {"foo":18447,"bar":22823,"bike":28593,"a":39025,"b":"AXnd&\\A2=^","name":"g>X<<Z5#'/","prop":"X<CD;<4xkF"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySort is too large, has a maximum length of 6');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLatitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4033b9dd-a09a-4edb-bbfb-76d122a5e457',
                iso3166Alpha2: 'kh',
                iso3166Alpha3: 't6s',
                iso3166Numeric: 'a4v',
                customCode: '7bbe754uwq',
                prefix: 'xo4ap',
                image: 'szv2j0c1l2nl9ogasg179wgo1ord1y62dhqh3oos2w69g2gnqx4006r9abhyz8irbfiejutdlmwm28e2rmooxanepbpiifsqipo0jpbz57ohijf9spxm066kfq5jnetutxe6y8qw1cxm5xcz98d6avbig4cv09anasl9od1ywfy6ynevw7utq8rkqnbgi8rtwdf74tuy8nervtihicmbdtd9ff6qonaf7la4qbzhbfz69hpltm6nfli2u2zvrymb8bkhlah9ntfihgo3gkdmz7960adyi44hsffmpfbfa10i3hj85p1mw7e2drc0lov8yifi8v05hds6rwpvz2a9m3zq4vccswb0hjtfokajrf8jzecabp4ovnhawjrlik3bw79ek6qauwt6w2ist0bl2ulv4rjoebn3kgpp1zmavu0cpxy4i4ch7dhjgrelfcxoodoksdal0zcu295qlo5tsplhue8sdh0dr8xfybx5gczosybuawm7t80ddi8ouqteijmj07m6hthndv4u587zxw82us55cr9ybjehqe41v1lhps42xl7oro0mzpmtf778zmrolvrvz6rtbd3c8w42gy6b8bdtp46y2jwma5y5b2b0bdzy6za6e3hf3tvfnjjt7cnq42dnu7qcmv14lblwgomdbvxbwm437w7ihby1h6mrybdeo6wjexrlg2h3xzd5q62qgb5p4d3otptq1oq6qjm1jgt83hoh44zfrip2vcg38uxu2m26ej15wqywql9y6nw80gh3gloc3sywng0rdfxcnz5l0sqkdfwbi5mepf1f7mjtc45h4hw877t2cah59hi77wjb1mj114o9a0w2s9sd0np37ro8so92c9pur7ltcbzzv4j2o5rxuokhjq3po8x2hgz3qhwzvkwa7que934k4030k1nhjb9irljxwjw7nm5o3kdoyt3hnki9jwt4yl0e7k1jzdvcu84n3rabr0qylq446ldiido80trcc5b2k6c0uk4p1e9nzw5o2tul',
                sort: 301255,
                administrativeAreas: {"foo":"[*>JE*}}ue","bar":"S\"J1h'P2Re","bike":"]^a+g0stJA","a":84529,"b":16531,"name":"%ElT!O2i:u","prop":"eT_49M}#{j"},
                latitude: 105041240510128860,
                longitude: 42157995088260780,
                zoom: 73,
                dataLang: {"foo":"+U0?&+&zie","bar":97545,"bike":83551,"a":20950,"b":25326,"name":"{2$&4.d#B^","prop":18394},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLatitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLongitude is too large, has a maximum length of 17`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'af0df481-2f61-4a32-b765-78d5c0e571ce',
                iso3166Alpha2: 're',
                iso3166Alpha3: 'f9k',
                iso3166Numeric: 'ofq',
                customCode: 'ts42leyjl5',
                prefix: '0jcs2',
                image: 'm93gbsib1nhegytl7xj5xab82u5676l4cq9kidfe7xctjyc728usbrz5l39a4h4bl9e8vhndq4wjlzldugunbsk4hm5yad7kto4yqgbu4g99x4w17o2cj9u2jwkgr5ru0itd7smetnkyqxi0gexasr7thiyu0k2qs356fdvv3x84r67ob2htl3jinygy8gl4da4vnjtlhc2yz06ewpdlz5e2juz089ja3dozhr0702uy24ul7v4v2pnyh67mds86e55tmjylaqn5v4zo3gzsa6i880s4sow8s1fnf5exougfp0x9izi0h7quyowmvnudoorf48bndk28jh6w8b01mkup36t4ft2txb88bajfxchu53b46pagw788x5w8bki6gb00jt1iwu6inz3blui3vj4qsk7odz0ktadrj6rycw0k4z6wt3u6060yw5bzp7ivkvde4luze2hmc45w0qdqeyzzk1uc7shyhd2zylcsmu2k71fveuu4qen0q1bejjjmbzz71raly68jrqbbpwytfxzbkftrsb7sg8f2mv2ljso8nfh1yf88h75xulecp085asbdl728hzf6w3kidqitdlgukxfw5o3btn288lwfw0y5prtjsy7d8ismnhgbo15b0s559ujrbznmerq7wgfv5woz7l1jy4qr1nx3mnixgd0z8yq6h549shzrlfin1lf9m3wau3cmnyg7q1th00jyzqfjw63yr4868hqdurydjhr3137ymvlbozexxmg7ycgjbl5ihcpf0q6lasbxita812ayhojfl1mg6wsq16dxvdvrvpzo3rsw8nye1ztlvwyv03cpty6gip0yn71xrsgfi788sxs6s7jmefredtzkpw76ocyrv83gv8i1xsa7o91a1f529spyl0sz2ib5yh30mp6a4yt33oomylf1wyd4r2m759qyqm5gn55sqibxq68ehb6bt7kph2tvk1ohmwfamagowh0hce9hnigrc37k7251rxomiyvru9pstigwtd4o',
                sort: 662326,
                administrativeAreas: {"foo":56055,"bar":93949,"bike":"RTK|K!ol@L","a":"|xEV(]YkCt","b":"-[B(B._Ml%","name":69465,"prop":"r`/R1'FEyW"},
                latitude: 24717270293975176,
                longitude: 742593229196714100,
                zoom: 93,
                dataLang: {"foo":77635,"bar":"sGj_\"I\"?7c","bike":"97r3u6Hz[C","a":9339,"b":99275,"name":86598,"prop":"u|{X](tBaT"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLongitude is too large, has a maximum length of 17');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom is too large, has a maximum length of 2`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'd87502fd-0918-466f-906d-1bc28d2f2f46',
                iso3166Alpha2: 'ed',
                iso3166Alpha3: 'jwa',
                iso3166Numeric: 'c8n',
                customCode: 'au9b21ciuh',
                prefix: '6uwut',
                image: 'j3bmu4wc92aidgwv9a1gio5y30soytc2ipqqgt9nufb899mrkeqhm43c314a1l7j7s0zo535ra1jhom26d3upmyotzpnquj46l7njp9alxbkgow4rit47ttn9nfwou73l1p6kr1itc8sfxqq2qj26q7adpsvlsqtnny6722w5seen1phja6cc8tz95qhc053nzdzz3bljde56n4uk1ax8o0rrxxxs76qydtvp0338gz3gjqyx4jsmjt0l8klpp7k46y99qqlyx3g071w6cd1g5oofqv74kt22c6ussxcuuonfdgz8mgin9p6w5t59fmfvejpi4w5pbr53vrj0qc9yh1d27sdlnqf52vv4edgod268g9gr93jejcwetwk1i9qdk9n7tpsjrkfadwi54o5zbyz9l4hzomqbbs67hf2yd8kts5cnot55r6u068l4tln3t2bhxrj3vnukylej3v1p60b5h8hdsvq9zzihszxwxxnlvgcudttnk08n6nn765ncgwshtuwc90n5y70npzacmctl7t19x5mnsum4k7c8jsfocp3djkfyqe0bcuovlvvr1eqwma7ia1lh66z34wx736nz3kgzu7hpzdkg0n40eg2hwu3jkavczoz96pmet8ozqo4gdhutuh9tecr4d3hx8sfehx32f1um53k36plxtnsc2l4mu0wpqrk0fy8e8wt0qb5ri5vpssa7szsj7teluh56gaxefh2dvg1lv09x7kz3iumg3ha5cx5fnpuy7mu5aoass6z5tpmhylobxpcnszl0t4dj59lquck6s70m3zy8casb2z89ex7rphpfvc348epfcpsjaatxuwt7ijs3cpwqesbnmklli2g765pl3q2cwz6ccslhl0018m0as74ep26x3rdbxq8ntv1q9bq3ghq2h8v6u2k73a2dr84k73qqfum00esy38rt2dbohom1i8suqn7b9i61jb2b0wrt6jb03iubhqv2mdoyjugtrzb48hjhykaoiroo0fvtmi5',
                sort: 181060,
                administrativeAreas: {"foo":"16QeevD}=z","bar":"-fg4n8-G$u","bike":99171,"a":4905,"b":"3c'n|-c/r|","name":"adpi3j<QXD","prop":"V4peW(k-HZ"},
                latitude: 95638674951107070,
                longitude: 74865044638668530,
                zoom: 889,
                dataLang: {"foo":70638,"bar":53243,"bike":32468,"a":"^+;>r%%EaE","b":"BR\":weN3A[","name":6261,"prop":"ef2jx#{:w6"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryZoom is too large, has a maximum length of 2');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom must have a positive sign`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '838fd707-9ba9-4a8d-bd06-dcc99100ef32',
                iso3166Alpha2: 'of',
                iso3166Alpha3: '49i',
                iso3166Numeric: '6zp',
                customCode: 'oag3js35y6',
                prefix: 'l0xbj',
                image: 'g63shqp0heknl3kbsqyeg6emtwmpjlpn31emged1ypkedd9uvzo0scw7s3e8pulsd9dpa2929dsm8lnosuqqadgstsgq4ayl63juq5ncvxjtiko01f5r8liouf0ut3jhhfmvrhdcftfsuwqhtcy2l2izp2sxouuzz4tz0d9xbzp46splpbytj82uy3torg0qcpx27325v0vap5vdxvf14vh63a2s3jwpv6d7dnonmvtjsqaq9cj6g63kxilj62svi5ry2zdr7tqn7jz3fzfnfcus5d9yjvfvxdeq8r068wp0vqipe51yp2mi5p0el7ecrmjclh8ep6yttrnfujule0bjoeihax375atodm4r0amkz4jfehua6kddonkfz3wcf54nw8utyb8w6eoa8byj5j777h39a8jio5xlwd5dnyv1bjunvr9emlurwxksu96y304zxxtzn1kz3osr78pc1xvulyev855rv1wws27z4xcsfyhovo70tylbumzzt4u569x7sed3zo3wwt918mn5nqumoyq5pwsqdelplqgi3039zump77odkbmfcun2avyhlid66nox4uuagx4mft1zs5rfma07t1ha8bc37hpcolumrnlh6zi3fc94lq5r82mq3687y7hum4hnmovr3ey5xuzwjzyiwf4wzpga5rr8yk44z6tk7ko26xq16hdw1m6id2teafq7k06ad3vgkl1e0ba4y009fjv3o45h792b4mna3tm97qc2rxot946wyl5hobghu6mhptg9ds3ynbl3e8cz38bdy29zyszyabdlysyt9cc31dzzt5v643ifqn6uuwk9krcoe2ikukzj9dz3hg0jgzht8novo89r05atpw78wnr305mzqw1d2ozls48wyst26ent0aof1ai0vhkpzy3ag33ns4oso13c8wgo4asyrdl473yj30ycljdjlpbfc8f7n8333pbkqwd51a17rg81rz9ke2o9ib8yebvcuv6ynmpe6xd9pao70gl5x4av',
                sort: 746174,
                administrativeAreas: {"foo":55584,"bar":"(|ol.1YAXN","bike":"(zUv'&Tfk`","a":7994,"b":"s5D7D4G7/$","name":6299,"prop":92082},
                latitude: 69803916111086300,
                longitude: 60525088484310584,
                zoom: -9,
                dataLang: {"foo":"Ic]6(.PnA9","bar":2132,"bike":"\"J-wta&7e=","a":39657,"b":40598,"name":"`SChl^*w(w","prop":"v\\Eoqc]Uzk"},
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for CountryZoom must have a positive sign, this field does not accept negative values');
            });
    });

    test(`/REST:POST admin/country - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:GET admin/countries/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/countries/paginate')
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
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET admin/countries`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/countries')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
    });

    test(`/REST:GET admin/country - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '877f489f-9c93-46e7-ac79-89cb684c4b71'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:POST admin/country`, () =>
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                iso3166Alpha2: '4i',
                iso3166Alpha3: '4iy',
                iso3166Numeric: '4iy',
                customCode: '4iyw9pwsdx',
                prefix: '4iyw9',
                image: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                sort: 219933,
                administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                latitude: 67150675693228490,
                longitude: 89921839842652260,
                zoom: 59,
                dataLang: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(201);
    });

    test(`/REST:GET admin/country`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country')
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
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country/1dbbef48-44fa-4926-b94e-601ee1fa1362')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/admin/country/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT admin/country - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                iso3166Alpha2: '12',
                iso3166Alpha3: 'v8r',
                iso3166Numeric: 'bex',
                customCode: 'ch6iemni95',
                prefix: 'gavle',
                image: '8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejy',
                sort: 471697,
                administrativeAreas: {"foo":"=AJQ}D%\"Q9","bar":84261,"bike":"k5ZCrOMM]]","a":"QW7EznmMkQ","b":39478,"name":39847,"prop":"iZ8f,kreW6"},
                latitude: 16052071626677388,
                longitude: 97928310145284430,
                zoom: 87,
                dataLang: {"foo":"^=+yD5\"wU0","bar":")K'DSIp:O}","bike":"zMS2g9[|o!","a":"y#IbX8S-\"N","b":11926,"name":"Bv;[S(dr6+","prop":"9.BvD_z6!c"},
            })
            .expect(404);
    });

    test(`/REST:PUT admin/country`, () =>
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                iso3166Alpha2: '4i',
                iso3166Alpha3: '4iy',
                iso3166Numeric: '4iy',
                customCode: '4iyw9pwsdx',
                prefix: '4iyw9',
                image: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                sort: 136344,
                administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                latitude: 42386746271664740,
                longitude: 46405399739304650,
                zoom: 29,
                dataLang: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/fddd553a-4b4d-4624-9794-cac6888660c9')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL adminCreateCountry - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

    test(`/GraphQL adminPaginateCountries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateCountries (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateCountries.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminGetCountries`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetCountries (query:$query)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetCountries.entries())
                {
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminCreateCountry`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        iso3166Alpha2: '4i',
                        iso3166Alpha3: '4iy',
                        iso3166Numeric: '4iy',
                        customCode: '4iyw9pwsdx',
                        prefix: '4iyw9',
                        image: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        sort: 726245,
                        administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        latitude: 32395573368682544,
                        longitude: 79439562003960720,
                        zoom: 65,
                        dataLang: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateCountry).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindCountry - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                            id: '8e5ebc51-339e-4397-9c1d-2c18489e035c'
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

    test(`/GraphQL adminFindCountry`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                expect(res.body.data.adminFindCountry.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminFindCountryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eed12195-511e-427d-a6b0-2a044f3252f1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindCountryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                expect(res.body.data.adminFindCountryById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminUpdateCountry - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        iso3166Alpha2: '12',
                        iso3166Alpha3: 'v8r',
                        iso3166Numeric: 'bex',
                        customCode: 'ch6iemni95',
                        prefix: 'gavle',
                        image: '8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m4qxrqvlqixpc2nobxg4lg72vmo4cbxex9iyq9y6r188q78cfjo95qnvoklo5na3hzbtg2n4mojykzpz74iejy',
                        sort: 662363,
                        administrativeAreas: {"foo":"=AJQ}D%\"Q9","bar":84261,"bike":"k5ZCrOMM]]","a":"QW7EznmMkQ","b":39478,"name":39847,"prop":"iZ8f,kreW6"},
                        latitude: 56039715410123700,
                        longitude: 28293396762636024,
                        zoom: 69,
                        dataLang: {"foo":"^=+yD5\"wU0","bar":")K'DSIp:O}","bike":"zMS2g9[|o!","a":"y#IbX8S-\"N","b":11926,"name":"Bv;[S(dr6+","prop":"9.BvD_z6!c"},
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

    test(`/GraphQL adminUpdateCountry`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        iso3166Alpha2: '4i',
                        iso3166Alpha3: '4iy',
                        iso3166Numeric: '4iy',
                        customCode: '4iyw9pwsdx',
                        prefix: '4iyw9',
                        image: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281zptz1leq1e77myn282zl1ect8c684xo8v4ajo1l62460waru7gxtobxgad0lxognfmpgduelbosmfyshp9ibmvhpjzrh18nv9cfp1qiocdyrl1forbodwozlqpexzxjgkmv10g43tgjhehkgt8ou5lht4kje3qnln97hwu74thggz0hre9zemrbkpahus3nq90zw7jml6wiamh31maoakraj97l6flmhe9xr02088wlcbqwwl6af0emzsn4pxwbua64ndegmz4rykqkvq7a8wx02h49zlvb99np7emp8xsql36g9eqgg8mrhjejd3z0qfm12yhof94rvr4akboilzkpivwoxhmn26uiw52bi2lbsj76kyelgewp26fn0mknij0sotm0npea6p4cbpg7yy8z59x3cbwwbyeudrw05a5gtg6gvkrflox14jxi7gtz7qlp3i8cd3npqjy1b29phn8ihg72yqwdv78ybjzcf5usxu4yv329914wq1yny728jvysn8bq656apncpzms4azd7q47mwmjdl16hq2y6rkdhngpbq94li9bhnd9jnunagcg8xlkbgyfyj4hctbai7bguii5hrd26wihmhwdmtoghud4gufs4i5kqyfmlilkuzwjlmxnqeb3x2bqmiyvbnnzeoizi0wgya50jfvrywskab2uhk7cbu8wrj4fdvmd3bxk5dy4dprg4lhahn4uq2fb29wy7cigf6weih8t14tbkczm3rsptnfb5pl77bxx9wsvagw7gyy5xzvkurk9m8f9wo4tq62ka9nq9iaegmolj9du5wwltytex1yjk7bvukm28jrqf34m',
                        sort: 369401,
                        administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        latitude: 65218384591320460,
                        longitude: 19072033225027948,
                        zoom: 12,
                        dataLang: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateCountry.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL adminDeleteCountryById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ec935c91-f7a8-4f5a-8c90-c09d7f45d3af'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteCountryById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {
                            id
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            image
                            sort
                            administrativeAreas
                            latitude
                            longitude
                            zoom
                            dataLang
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
                expect(res.body.data.adminDeleteCountryById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});