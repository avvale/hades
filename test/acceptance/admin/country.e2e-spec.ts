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

const importForeignModules = [
    IamModule
];

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
                iso3166Alpha2: 'iu',
                iso3166Alpha3: 'b2z',
                iso3166Numeric: 'j7l',
                customCode: 'ws74f2b5pn',
                prefix: 'y1du7',
                image: 'c370egw0af6irhenzcr2ty97rlbph8ovtr0j4prk3z3z43k4x8lrtvwohubb21icoznltfigb5485k7lsjh6ow45sekogf1hl7h0wlax66ghy6yejemowmbvba42krlb3owmvl3u26qqq50eidyp4w8v8ogc7mpwsdexe40fahcn3a5ebseogt3kq1z1nfxbnns67z2pa7hda4js5vy4zp1a1pw3rnbytdtbzcr24jzx2p59ryf3lmvhtzkrfcgjnr64qizklee3b4y79m6iqszy12ef57ndchmlz4p886xhs1wzblr5mqacagnewrfihq00bffqvy7xngd8ortyqpy8nxwo8jdfh58woo3cl8j25il78z1yrpifbbdju3pa6p79mo9dcous6rsguu167kuzob7acmk6hezqvlx9ey1baq55jkvc85850poryyhrp2nnmuvl2qepcezkd05xxgldtq7p58d6tjligywjf44aacb3fjzy3n60nbro4obbqf8fwnleis8dk7esh714ynj3rrzagyyx59ckfaufvk04xozcv1o9vf4z41a81n0dbmugnxueb5mvke9mx15vvbpo8cswc84lwdl2775syjljcf4gbxqplmlu2uk7pfn16nmxuvgi1c14c20ejgxjid98an0ie7ngxw26adw8bzlknquotr24pyyrjyr8zoqrqa258frcu7y8tvzq2ouxzmcgepxsfcdqh26ty0w6wencdg90m3d6awk2jak2cqgi4kl3476buo6xbcrhxtle5twgttlgjg9nv9humalxksjm8rikydc1em6a4it7hqrhtqlr4s4nmsuwcoyb4gw0eoxuf6lekiq4vfzirjtso15m0c3wpykwrxcikpv4a5cw4p4akc8zake2sg7y96as0v8p3865s6bs2gfxywivsyt6lmkfq6v6nz04gr4ugo115vppaybfs579ankt62mvwyumf3tl4bqxuduzqxbx9ty9zp5rl5a4xkwt5pswu8s9',
                sort: 384325,
                administrativeAreas: {"foo":"A}pLz*5*wI","bar":39202,"bike":60488,"a":48760,"b":65457,"name":95369,"prop":"JaC+kcz%Q&"},
                latitude: 63298713232326504,
                longitude: 82526502987966580,
                zoom: 65,
                dataLang: {"foo":21249,"bar":54914,"bike":70398,"a":"]qg}Y32\"\"/","b":"q('(aCQ3w>","name":50453,"prop":89391},
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
                id: '85c8e0a3-2cbc-4b78-8b6a-c7a1f1f41ba4',
                iso3166Alpha2: null,
                iso3166Alpha3: '0uo',
                iso3166Numeric: '79b',
                customCode: '10a5m7eon8',
                prefix: 'dsq7a',
                image: '1w3cahhne9jzcw9474xy13iwnw3by945swsqor6041y5m0ivubdle8340nssg4xgamzrupb0s1ykmmowfsmvn4pm61zh51li1s50eg3mvaamxn0ivbglhquduypczap7og8vmjdbh6ok8w3iv7hxznrk5jyp074n37tn8b954oe0pyi20qrkwqmuxy8sjj0ohpmi003v550t6gflfrqpkvmj1i4wiba5w3o74nl1jv474o9tllvj0jp35yahivvad3fhm038s3qcglhcche7dp6khv9v5tmo2g7xxz8l0mz224csbrx0qldvwn8b0h99a6tkkz99phyg0747qi8o5c79940sytqs4xhpzr5vsuhy6gw1eqb8mssf4x8z6iw2qyfonmy6wprojm2x1q1eoj4iw5fcin7thpthe4ww63jz6c2vjiqqr0q8168ogzrz1vt97v2g0t9yrlcxnc0py6gedsyn6exmco8zbmicjyw1a3pfj5zktec0qfamj3d1le3zxzhd4soznkj4ol9oksn7iwm5w017hw1py86rcvfjtldxa2yrkztt5ig87i0s092150x41op75n9vmnze3qqviqe21fg1gjdw02ryrsvadi1z7vdrpvvoib3uimyliz74iwhwtb1c629vi99nm5ar51q1gv0vraql4mg36bhc84e4o91m1arkxiaztic2gsxw2l8bgpdj2im8bd1npj7e62z8htl9vu1koogbikc069btladogk021bljacbm2to6u1xprqqzbk8smgvoesun4l45e572t208n6970872viocdjfzu6tnfmf9oabtdeh0br3eleyk3zj6ukvwkolfg4qhe542ucrh4wjinx2ejif210ucklr9kzsd2vyyeljurn56ozpjl1q8xttdqsufp5ifrbhqdklilfazktu0uq6xqqlxtqbh23dyokqcur6nb6syz9f9mk3tn3f3kejyuyda30zofzgjsksirc9t4znlmeduypxnx9aq4s09',
                sort: 764116,
                administrativeAreas: {"foo":"EGlM(W=`:B","bar":"&9n1A2=<UW","bike":1501,"a":"(u*my`QDsw","b":18296,"name":46038,"prop":"@5'Gj(PGP("},
                latitude: 35746078123195456,
                longitude: 20725380509603264,
                zoom: 13,
                dataLang: {"foo":59262,"bar":27230,"bike":88897,"a":56705,"b":39446,"name":49562,"prop":"iJ{A':R6PS"},
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
                id: 'be65198e-6731-41a8-9e3e-f5c7afd6e9ab',
                iso3166Alpha2: '6p',
                iso3166Alpha3: null,
                iso3166Numeric: 'd52',
                customCode: 'mktkht0pym',
                prefix: 'fbjd0',
                image: 'gcpettc4dpgwyli627u5umpf8aq9as58qnjj1ir222h2fp9x3ienrt4yx7zwu10nybitqytfeei31ajcx4jhh7ybmmjikwq9z8bdoziii43yvznqmnegnvlt2759se5n7n1tupsn0lgb0ugg86z38u4qyhnbidfuvffz5eakef37no2qx27m1sacenx1v311v1zl2pb5v6kpe6z1gpw1ezk7e38hmbwfpegrdfkgjconhvmzgio9h1vaweikv2cg7mn3wm2vnfvodswp8xxln8wo1inv5le30eiocjibn8e4x8ahgr8t8hdkm9yal7xnbnovgpuqizk0fkwxvwnfkwgvop1cxkq9z5htk2ca2dd8fu0zc3uzyv0wde98w4aurxuyu908rvvtfc5c674ckmfbib0ziayrgff61mxlwxv4sp2wo5etq3k3yqjxou2d5fxwez9817ws1bhwjkhpdbet925ty48xxh9l069ty0qyvkr3sq1soqr1asa0k0di4foqbj0s96pmiottyfaucc4hrch5hkmqo4sn2lhng6xbk3993zq8ht0tktg6rz4l8q1l389ax85ij5awb8d0l3c152uu60wfd4z2e6mnbuh06dpsmfupe9dlaiyce84n9fz3qyto0ppbwd08r1ez58v6neqqvb76ndgi2ril2zxq9sjggbu6wvwevuh2vsajpvz68yr5jdlddzluh9x2r16c00n2dte3r20gjlmtu8b8j8zie8bjzxm9bwlap4r30chp9b6wdjhgscft9ulli6mdiylgvqgmc5euz1v0qdl3p6sw7bd035ynb9w2u2rhd9s3ufoijxxl7ll4pqqy391atwchlpr2vdnwkqwd42ebjodes0nkccutjmct73obx3dxbu6lw8mrotswpu242f2t73dqou8t98qqiu7puzp5oxnaafu2sohoyuo9p886z4yd9tsnawpurkhicrb44etq8b6dv7r7dqndlowli5lt5b2h6f179fgr4omzsnc5',
                sort: 444623,
                administrativeAreas: {"foo":"A[pH*B\\.:z","bar":83677,"bike":45470,"a":11143,"b":"}tg}wU^ib%","name":"';v.ceUHri","prop":"VNKL(&Ki\"%"},
                latitude: 16498136857727116,
                longitude: 29390337496344120,
                zoom: 99,
                dataLang: {"foo":"P2XLF@{$>Z","bar":22451,"bike":48531,"a":93057,"b":55476,"name":7889,"prop":84427},
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
                id: 'e1b52b15-0657-413e-8325-da3e1fcf4af6',
                iso3166Alpha2: 'o4',
                iso3166Alpha3: '964',
                iso3166Numeric: null,
                customCode: '2g9tem6ty5',
                prefix: 'ugx2c',
                image: '7zrgfz9roxbcp6rrkv39r2t28vfmzylr90htocwjb6ylqfaucacdiypso1wikzaepzy7ck9ammif7rgubmj0bht9yh5ntj6fvkz18j2kcsf6jdj2u85wytlis6knaajtfcyqk1l7os1ja6h621xvtp84swbfi1t3gwcs15y5w77027uk4fuqoqoofe0hwqesp4oc3xqic4yi1er3opw7t25d3drjo6sdxocg5gd0i7bhq5y2tkgdt5wx8zjfuca36daw9sm1h00hmx37ueo6zi7jxr4x6qfd3ju43wqpd4o1wbj3a10j4ng6opz8ay0jm2mxj3ehpj75kb2s4xrjr2rj6rdk51wmwlyn0ulc8emzgt54oh0qeyetflgxmnkkd0x12yhjtj9lixfwl3zdcp87rkymaowcbg9xhp9gm8e0112z9f2kugua1jhss0jfzja13rh3i0jmwqil4as6ce4fvxwyqpre92dkrl49yy0hczrj5ssi40n8e7qcrw516sxifost0aykznk8n9lvi31ks4mic5fwh3yjit1u12yr58uamhp7n9m92rqlgueyurthfhofzibjt5riv5266si9hi90rgn3lrodzvvyrnsc52572qz2dlh51e3mrffqo1aa6l5bi1veyy74j3mgwrjkcbih9ftt2s8n37822fqkahx81p9dauhi5wvqtkrkd9dipp3k7n6y4r4by3xvhy443xmddxk2u0e19x1bh6l5l39yb1lr7o596vffk5xayhg8296f2mos9zp7rpd26mf4fvzwffcqhikjllfpqd3f5aorl63nvol4n9ix62sqhet0t4uaz8rxxqrhjtsrvdkrid98b111q2x8wos4en7xvd7juq9bc0n05zbjyhrm6fxef9lww12jygf7bkf3xhhu2eaamupl858x6h9uqfuqtuxlk0of1pbc8k0ee8ul6k0iyqmsq6egjw1651he1b74ns4o8wdru5t264t1e7w3wh9r2e8q4847gf0w1pv5',
                sort: 346243,
                administrativeAreas: {"foo":46161,"bar":78653,"bike":57458,"a":2467,"b":"FR@KD!5Y,'","name":"et^D?WsIbM","prop":"OU,<GQG[6o"},
                latitude: 93019157638910660,
                longitude: 63108116570786584,
                zoom: 45,
                dataLang: {"foo":24695,"bar":62038,"bike":48495,"a":62470,"b":83328,"name":".$JCIo,f$%","prop":"[2=eLjU;;*"},
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
                iso3166Alpha2: '09',
                iso3166Alpha3: '590',
                iso3166Numeric: 'ig1',
                customCode: 'qx90xwr2w6',
                prefix: 'nrv6q',
                image: 'vcx8tgmn1ulkpul5yhrexn7o5ye9fvdbhxyunovge1kaj4xmchzxf3l9hdyu9inr3t7l9mcl7ijbh7b45un0vspymtrvw3ioc5v19mbhr4fkgbrcop1d61k9rnwb8gyxpls8mzjltolb1ugewqjpid7o4fj9b9re71c6xoq8wyy4dbhk6qbo0ctf6km5ngmiu5u9uqqmddpengmgl2a3hh9ab3szvj4iw20kc1dfd5bexa59rxl7szaiuep93tcg048nivqvwlz0nen7acf2i42pmzijvy2vx2t904barg6n5vyi9mlcdgz2qjlp5n525oe1mrteudmojxu1tayq54bwrp9pm7z9awqvpc8g8dta123r4ied4lobw4oo4g29gd11c0fg7cbyd4ubl6hswxlrx0nexmks327jun4iacji583kvna3lonri8ifmzr6b35pdb3xd48gk90rok0962z6fs9hm3b24ghcubg5fjwhc54xjg2cxpz03tnrchpksb43nycigxcfsfyciuc4dm3gythmw42r5966eqv3w1lin19lk7xxmx2me2ls58bkz6bflf0a9vdw68gsifnb1iswld9wq7zhzro9znuynhvo87vrremtujmz7hagroa43vqyh5t93a4x9xblcwl1y0mhwzragpchbm3bge4n98gcrx12jazgz7frldz015ybtligkpe6mwx71lhvrczn219d83bpmbzvm4idms0cr0pkie1ub3j5wiq1bpmnqt3v9vrkgtspzyutbk2t6br40cp8sqwr7k19l8sqhulkqwebakcik9r09x02x5znt1r7l5omczwf721lzx3io2e6h6s4126l84bkqknju3h8pc12rvbu8dsvff1v7y6b6tmo0sfa2yajwkag4n9prqz5omugl2m0saq8lrj84kjqo0maiditwlnpunamucuxz6d74qcmx6fqa3wzemu4vnvyyv4s9uf2ubg2v2p20qsty49vt527scatkeil75kkarcl',
                sort: 168752,
                administrativeAreas: {"foo":"%Q\"bH7b.j.","bar":30220,"bike":"g\"hYMS%Q^a","a":"M$6uaN7Eri","b":84824,"name":40458,"prop":"5Xvw|7/uHt"},
                latitude: 21744849661395860,
                longitude: 90285144506995860,
                zoom: 38,
                dataLang: {"foo":39514,"bar":61122,"bike":"&h!6<)_J6i","a":37017,"b":"AL286xQjrV","name":21381,"prop":"5-N@q@?kXv"},
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
                id: 'cdc5a7f6-b037-4d14-b08a-872fdae9e711',
                iso3166Alpha3: 'xd4',
                iso3166Numeric: '51x',
                customCode: '4oar5cbfue',
                prefix: 'pk97o',
                image: 'vmdvigi441lysfvapkj2ueyvllevmlak9kgurpfdoai0ew2jnn9u6l44y4kzx12xv6mu3mxi4im3i0sanlfevuhrpmtzx7fj4yc8nw0px8eg15jok7ludz9tsr620dfdjo1oa6hh54cn42nbuvgekry1vr2y5rx4yb9unzq8lhd3lhd9nd78il6dxv2nlz4mhoca0oymaj1dy2mrh7srn35kc5ry5awc9leh3r1pb2gc42il7h0mq8q4fk1xtisgl8k6mni39ykcvo12gsx8qathfka5wex0e8atipno1f32gjiwzmkhk1jxj4jwahmt1g0frybb2c00bshfdj5e4dia2ck8w5k417ojxsonvv391x9323ppj89n3bqkcw0qkxz9sucx4w46je5ep5qmzp1061b45bhyfftxcx8yfxlfw9tgjjixcyhtzi0cbvg2z609435v1hpezuv5scz5qx55twzdvb2njjnegey7jg842ht4gghfw3ku2qbqnggk9dn3nkbb71ztp746r9zfrpv12vm3913xt6iujxluvhjnuztvtik43yraze6nyab6k0h2vg0jgb1xqanmnj7c7hi86dd3gup6sulwle27fsgxe3py3x6zoesi6vrwur7bth3p7ew7lxmxgi958moi1xrp8w6y6rs677rf7389ni6m57qx14xfb8a04nyxmrbjcw4i5nyqqzsflcluvyaa6v2xxditqvdauv9r6jujp41nkkt7mvqmx2ap19sd8ymhnpqi4ofpnzx5dzjz59f2oq27t1id71jeb7wk8sygel11pxy6vu71um6ludu0k2puonb1eaoiqa3rikvfwnvly3ztqbszujw0qo8uudpkekdgyrw7jkesbg64eci0etnxmbb2z3ote19eknxyat3rprfri83x20l9ho0elpybwkzi9v7lfbrziz430x8v1jzwm6qdn4eizgouf191rhlpdsvicl6f9qlgnyz9gr2xenyvzn70kdfgngi7nrict5py',
                sort: 698281,
                administrativeAreas: {"foo":81306,"bar":98315,"bike":77124,"a":74795,"b":33448,"name":"@t#b>*,93M","prop":74216},
                latitude: 66281117430482520,
                longitude: 94666534449986600,
                zoom: 73,
                dataLang: {"foo":43447,"bar":",L`Zt/@ysu","bike":61897,"a":18436,"b":"$!hP|}shZe","name":".;p1f*9cQ(","prop":"N((6K#h.J)"},
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
                id: 'b2ea284e-8f54-473c-81ae-02a895ec9152',
                iso3166Alpha2: 'n2',
                iso3166Numeric: 'vpv',
                customCode: 'nuxdyuye9n',
                prefix: 'xhs15',
                image: 'rx642t2uinsarebjf3nnv5a707bc3ov1ktbyr33e3hu0uw42xo0hq9o8klfqffn4wfmgxcajtr6jhm543b6xv88du3xj60jo7nct2zj8jipdomxn08r1p6o93urnn8lrq8dvqujs5rmj7hph35zdwb83tbns0icbqd6wrldtxy2u7vcwr55i45765fpuhcvjffveaqg0654gc2rfwf47loica3ghziqeywvuoiiiekpai74e75rtrk82ou2qj513ru1kobkt44bl80tle3is5puxl7siri28qgu6xylg2m29yqrx0a2btv5iulth1bo6e4gerkbg3uyx8581m6pvottk0h5uz5ypchp5dbgbi008if2thozfy7l3hb9pin1tin75j8emzzef79icw3ts8dvhg4z2bxax6wpxaennhodr62nziraihef5vtcam8h9vuow67rb3qgpo88dxyuxm0u31vb38ko73dsi18aqj9uskk7gbvjtap539wk7gz5taukcolmv6xiz6b1ix82w0suwfsh1xkzqgt35ln1xba42w99tmfcxl9zujaekih62h7s7ak4y8yesk9jat03t4sammg810kbkzdnachmiyoip0t7vwoiuxec9teqmuvjmp8v356k4al53z24h1ossu7p5mtrk5wbwvfvyjurxsvhr0akzfs9xljby1bg9bdpk5vxted24o1oybqbl5o1xh0foom0nuan49c0430cm2w1qtdjto59o8m7vsvjri0kgx02uttdbqvbetlg106c621kxfe58p52u67t67u90ehc1kvgoj86kzp55lpboxwa980rssitc44rf7yj2xblrk15ypw5jxnc1364sbukqz26w902kuysgfmmwwob0ceuv4xsj0xcoic46avcwz6ez0xccws6opmbesvkmimwo83qeqenwxiq1ruo97ur0mcx56ev9cklpxujewj71blyjxv7k5fjjipfa13ubks2502p5oiy1v2ovmgbjyzxp07xw',
                sort: 743281,
                administrativeAreas: {"foo":"n0Fg(<2[N$","bar":17936,"bike":"ZP9$O6r$F9","a":"hn,(DBo8&q","b":"LYD:wE0Fyy","name":70303,"prop":"8T:G*TcEc4"},
                latitude: 94553720429437040,
                longitude: 48766783970199290,
                zoom: 37,
                dataLang: {"foo":69334,"bar":36583,"bike":16170,"a":36487,"b":49524,"name":14170,"prop":1445},
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
                id: '1e742c97-1c27-47a2-b885-ed4b15892263',
                iso3166Alpha2: 'b1',
                iso3166Alpha3: 'z8r',
                customCode: 'dr33ekauxs',
                prefix: 'ongil',
                image: 'wicjhza8slbcjyugzcpbynpeqj26sdg5df0ocbi51x4zk7qajci2i2xpij2nyof49detpqh7rv6v4p8gzk0cvtp81f0nbv18k1zfjczcoejq6u98hqh065v3r15nky5mmer1iehcrfveqnqtwfoxtkuhomfel4su315ywbtq825n1qyun4fahlgdh6t5g7atmhgkgxnzp3fwwmj9vpkmdstiqhlebmn2b02ww0oda6z88wv28ch871a0791r5o36jwthp467bg9vedvwj26oqo8bme6eksn2kt15n7vqm5qb7yz7xehw9p2nkse39u5a896pnqiqa2rfeibni1co7i2yf7igwqpt34x7w3qrcfcomuvmzdr98tqo4ar8qcz0x7ck9j1gq2zqaycus1usjwsv6mae290eu7x2pfictwilwls0mvnvubnlhjh83xp8d7kukrevfrasqtx7eaaxihvkmelm5svb2i1a3loezvu3rbxjj2popccuwp6pqfx15p2vl7jzsir80z962qpegnobczn374xjq2ruynm1dpsjfzv1969zml739kwmyiam551syjv0rd6usk0d33idf50bmpjy2m5yb1x3n1f8h3xw6ggxb0ntc5p1os869rrbg20vpg6l4ncpp5bev5a1q4vkv975yqqxbcssi4rnvrtyksjc4sl9wsy8pw0vrcouc55qhken4ppo2gixk8i7zb038o0g1q1fj71nxpu5ih5qmdudvf8ww2i63yhfftg1v6x4h2e5xrdkjaqaobn2aiagun68euappnl75q3crpytzlc5hneplxcklnkvxn8l3w167zndplkttu7456xgpin0mj5o4xb4g0ym4vamjxsyeq6r24ce44jibui86kjtpoki2wv5t6dzs28mr4fj1ec3fq3zv1xw6j0j3lz5c3jfzqhp8pgb8ppn9oc4en07ouohmfso5k7g0sle4xdn89q08w1yee5ov6torwarunmnhh7z0wviadhzk31talt8',
                sort: 216818,
                administrativeAreas: {"foo":92145,"bar":7427,"bike":"!KQ\"SvHamn","a":"d2e;gq/=*;","b":20973,"name":60242,"prop":"q3sk+%_lVr"},
                latitude: 67468579147262790,
                longitude: 11547500749743474,
                zoom: 23,
                dataLang: {"foo":41319,"bar":"}hm+FY)Bay","bike":3699,"a":98900,"b":77209,"name":"#I+Z|z2qY}","prop":"rv'ILI^Jdz"},
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
                id: 'o4dzf4jiku3pu6lu48cuulzu4zkraplokysfe',
                iso3166Alpha2: 'no',
                iso3166Alpha3: '7ih',
                iso3166Numeric: 'wpm',
                customCode: 'xgxt2omiaf',
                prefix: 'no32z',
                image: '49tjnv01fgtw28pkxnei61rna5kcp0gy504vcajgy0fwlenhhgs44ciffefz7nwokw9ei3hppe22oyao7njgdpgz95c1wkqotso8d6sr65wdui6kh3swwo8cnw5f58wl7tq5ovroraqp0hkkgw03ypgokjr4i2rnfdr36wjcx607q06znhpp0m85iaaj1gzw7hfverfwwfaktsb0mra38o6q1gvraymurmi97hvshdz8gpxxkrb7hdy35bm4lltqkgxrdgk79zk7iiwt165omlzwnkocfbdcp3udbbot5vi0wzme85203weopa7244lzcxi4lrvj7vqmcgncuffnvam1jpbkrnui4gq80v8gl5rbz12prekdn5xqk7l40d2wrzzfjb4fid86jcaxo3s5xwffevvo8cssx74rfbs9ckguno75zzo4fjv0y6drt2fveiv2ourj9rq230xj9t7voveabu95oedsj0ymvwl4krdc333f1rxz4k41ssc5zar7hmjdaez670n4ewxb2bzlwlxv8tuafe8apx0o093toy5cwkb8nn2x8kfdqvg8vv2r4q5iiycmqx2titbl0r6r93bzfqds0gxxspk2hbydhjrscs9qjzdonr2znrjq6ftxqodike5iayqf8w1tp39yxquotbn8f4gkxs08ikc53wnst3d5fsa6ftxkz2eopfpvk6tww9nd96zlp3bv9xh06efrskl0rgbjvo00hp5x7yen662xksfwsq3mw5lotul7yrp3lj59dnk8yqb2spoeg0i574fgbqnkzdoue5l99qzta7nn5fwmi1h3r9vq62s1th5qpqhsbqy1gpeo8a6k8wj3r2tz4dvmekb0g41tlcwo2fspnjuqxo14enui0q0voub3a2ty2m80uj7yskm3w7ybqbmpbf2j46rpox17jp0pe5twcm3q476ob3h93jeahg9oank68hqnv3x3njv2rw7i0kpet7ihevp40uheuexr61xtmiywu1tng4rcor50',
                sort: 783755,
                administrativeAreas: {"foo":"uox_&wW1[0","bar":16336,"bike":"Q]$W8;I}FR","a":83270,"b":53110,"name":"j5,0Yyu0JB","prop":91513},
                latitude: 90878365090931700,
                longitude: 28323736879463500,
                zoom: 79,
                dataLang: {"foo":57162,"bar":"1he/n&O`KA","bike":"H]{8T@QI&u","a":5304,"b":35986,"name":"KL_Hvq_sjn","prop":"b9knl$60W!"},
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
                id: '89a90643-6a67-443e-bb68-9477ee2e452b',
                iso3166Alpha2: '5u0',
                iso3166Alpha3: 'f24',
                iso3166Numeric: 'xh6',
                customCode: 'glj0gdg0dl',
                prefix: 'csok7',
                image: 'ykdxepnsiy34qut6egf0i23bigf9h5j8kwcie7god8du44a2v5o7srr2dra03mzpxhsgsbutsyblkcj8kerwg6yuhf5bzgunvbzvlo84hbk1w0hykmiqkaod5nuxke7ighni5y0gxsefx082e4955qz2ntcur56oizhqqb9149iczrr2xyjanbtkf2xjwak38lbu1ub7hwsg4lde2uvsuyb3dth6wx1s68u302mud1uaitagss3f4ippx027lq3obfdd6lumz42glcqiluffwfr0idrhrazym4j6lrrivdro3uue4k0w0y5e0is48l16k13lzmxwkq5oyps7yldtp4vownhoj91r5ataz6s0hsibpzz5axsw2ef6nwlod4j96t3ugudutjyyqnf1mnj8nfzxz9o5ev7w9ssesolgglq1c1fx23rpgvblnytakgqwftoasj4pcbqw2w5h7u7yxy02kszus184656rjvgh7f82mijc4hf1qi6duqh9fkxzkn3br0pzrymfzk4xb3lqzwtth3w95rlv42vasbylw1i6cqdspjfjq17mghs8mrkmhpw31rtcakhp9rg09nt2cgxy32ja7e2dhj5w6jiagecx8l7xg4ne0z3uqolk2x9qokmrdxnrgiw2959p2hm1ddtfcvh5zitfuxblyqz0no67zxpsmpn0ksc1449rkt5ouxsdfaxnf0lgg45vf40a6b3u8tnt3bcyk49yma0fox6eil2aleax9wu1i45keq6bxmf7hoz37c566smrciq591wdkx608wkrhx750c24jbfis9180n2k5q2ab97dx7ifh1xlcbatw81rj03w4ewhfzji5to1daf20ppipjzfiu7it839ypo3axxf0eii4ba4305g7mautv1samddn2fykclq6x6uiacurkg2li65zo01x703edm8gb97gbhorj407n3lnhx1zs5ydivl0syp15eo45fjricc6l9ai8sio0zdi659x4p3mlgpjfgqsgqa',
                sort: 161765,
                administrativeAreas: {"foo":"o|cQ{L|ry3","bar":"E$tgI{NBRS","bike":71558,"a":39497,"b":76870,"name":57513,"prop":"jh\"VZ*lJ{Q"},
                latitude: 78847768080147700,
                longitude: 85309884734546300,
                zoom: 42,
                dataLang: {"foo":"rjheQg|OH/","bar":"eSvpdjd4!3","bike":70465,"a":23313,"b":35293,"name":";S[hg/9/&/","prop":20450},
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
                id: '41502373-a8c5-4bf0-abb5-c7f1becea1ed',
                iso3166Alpha2: 'np',
                iso3166Alpha3: '6waq',
                iso3166Numeric: '1lo',
                customCode: 'xw32gaa1sb',
                prefix: 'rvuc9',
                image: 'qgvhsbo47ckxgo1ycghkhemj48bwu21kt5783f7hn5yq0toqys671o721s7nnl3iercud91bwmy8kf8ija8sqx5rf9vhdikralkknps8q005il4yhhsc81avy5z18iv7wbbhxcpzcvkjpnkyk8wprj5iu6a55a6vhxq1v41ewq1kjyuix1y343y9exortxuy1fii1a8jnvh225bxdifvqie9zx17wwusnw81ztb0ubvhrxatb04x4986m1sicaid9zld60f73kvqk2uu9fmgocer9nz6tclitycq8w3yss89v3wqdbn30bpg5o26nvzl18f26o6s9e9bwjkf5ccfwa1zb15ytsr4py8cunu5p4f6z46nx7am5puclhy170muo5o7445eznbo1vtow6xebdis9ju0mfdyxg3ae1qwhuaof0wamon2lt0vg4bzqlqa2gyyamuuz4ocdlfjmidc34o6fxx71jbbv8lclqwbldprevpw68v2eb7mye0qdat3koexitmtx3hrli74i6coq4ampqgb8rfivs50qeeexzptzh7dqp6z9dmg45hz1ms04kl6qij1qzysampaaefx0r50je6x3uhcee8k9unmcnap35kp1l0uw4aa7r2j6bjbzem29rivkszqv3zevbk0eiqkuqfg427ryca7n4x0d4yu8g1rwrc34132owe8yy6v2gvvpa908jxqy1ubgiccuw6tme8zzeiqzc7x54mkbif4hi44ylybtf83upkp6ep1tbobh4orqw0mmjpuha1s1mol9yi5xmx8anpud9lx0ms01xd8uof61wi2pihuudywsphj6xjo3aljs7cq7jxc9fjd89rydnirmzx0vqsqrhj3jhbqyiqft067iipd05nlf33upp93ltpf4s1qqa3mm9x4glh5c5yoiocp3dzlz9h0w09yt6maxoonc2f1fkf2800teteke5zkhpdeweirxkpl00s1kt4bonkwdr2ud9bgnr19ud10vb29bf87lji7',
                sort: 423313,
                administrativeAreas: {"foo":95744,"bar":"nh&wR?mB3P","bike":"V6>liJDy.E","a":75416,"b":"7<t.4i$u0f","name":"&}uGm'ku-`","prop":2624},
                latitude: 12733342731091566,
                longitude: 44210655882163920,
                zoom: 73,
                dataLang: {"foo":"c-jHu$MC0I","bar":"Q{/iXW36Gt","bike":"=_%%']-|Pi","a":"9ZU$i;.S$'","b":37908,"name":"M}7C]p;1b*","prop":"@,9}jTRf62"},
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
                id: '0eae0121-dc76-4d71-b295-508108247404',
                iso3166Alpha2: 'x8',
                iso3166Alpha3: 'r8n',
                iso3166Numeric: 'jdz5',
                customCode: 'etf0iyl6ke',
                prefix: 'j0hso',
                image: 'oqoz36q4nk4pg01o75f5po60277bt9vkm1mdtkx8iur7l7msdf3b1lknaorbtgr7o92emvd8o96e1xveohrmc92zzs8m3peqyck7rgg6kmrd1c4mbrjs1s72xd7sp888esipdj47jwpcs94c5xxj2dn1ry2ry9e5fgncq71hb33evupatj75wt7qjecn5bn062m6h6pln3f85eqfsqonrt9pp8z6r3ldx9d2ad0ek3bg95umfn54m59pd77fejgf1jgkxrsfab40utw9j83qkp2ndz5xhs8pb5uhlcuwmb3hvhfsrs9z4dxwbqci1ee8ql49144bws8tyz9bl3qvj51uqd3z953hma5t1fad2ugz0zskum5cgofuxw9t66q5iml3uafhbk88k6qxzvsbobk9crljaf1g176602md22c82xmcm4i8rpuk0gsy33ijxjd40lp8le1xz7m9maozgo56of6vwqof0benvzy8gr2n1mt2n0hnc18ag03rjetyt2bjfd4m30v1o6tmz7pfmn5r9lwl1berkg6y5ernsdngl23i8lgtb5qynwlolo8s4zms00myug4qz7j0givd3v8l2lcckjztxpjnvjcfp0uvudlv3ghjqjri3t4b891auy6hvvht8svcqcmaafy9cshyvvnashfs9bs9cc1pa7e9k14r1ny7gh3l9rl4r87swkheom3rexkgmt1az1vjtzm2ukuca5gtcra0r6om9fiour4tdu67hbdj3mgv874su0mivsw32lac07ax7q8ns5cjn5ytjsl126dq3bgwx69qh7vaomu7tmy4qf5boe6hcbhyfl91nenou3443bzb9p7hn6ws7kv4bqg1opgp0mvmkxaovzxbc3eva1vmq0sva8dksxhi0x23za7kylgjouchig26j4zqvw59rmp0yuj47a7rkjm213fnc0vne1eg12p5lgkdhsw1h501ax6zxgkvzu64sokscqkw6qo1tl6f25hbhq83w92fvhlmd09u',
                sort: 552634,
                administrativeAreas: {"foo":"dW^|5UdNGa","bar":"yON!-Y!j_m","bike":"VEs{!5h?9m","a":63229,"b":34377,"name":62970,"prop":88458},
                latitude: 61285999796889490,
                longitude: 32083454933003616,
                zoom: 84,
                dataLang: {"foo":"K#`^W7TpkW","bar":24141,"bike":"U8q7NZ:M1m","a":21873,"b":",Aa]7bgU/-","name":34502,"prop":27573},
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
                id: '92f8fe02-d465-494e-947c-a5f01b5716d6',
                iso3166Alpha2: 'z6',
                iso3166Alpha3: 'dhf',
                iso3166Numeric: 'ptb',
                customCode: 'y5dh3dcdgei',
                prefix: 'wn878',
                image: 'uij2voog85tpsokctv9ahqlp1dy6qkwmhwnjkvb6t0dyl95laowjy1c0ith9mu2robr7prmv5rzzuhdz4l09cd8l41m3vqrmc7ds16qvkepxo8swcp3lchtyzy68gb22z1taqe56ntiwn2leu2omup0z9hcwk7usn6au992eetnrqwfyi11n4ekvgxvr252qih4q2z943vt7ei23thlmi42t1e03hny4gdm1jhbr1g9yczaisubu1zeohqn5z6p74lg8iigh112uazu3ga438cbo44hc07ji2fe2kwk385dfdo9mkkbgaavud28lhqmri99xfu7wtafwsckqd3qy1pd7wscez1uv9v4lix67t4pa8iicgan5n73uiuekuzp68t6rcbp6j0r5lmgio7qmkdarj2ervvmkt24fcg0rld5y2j7fa8lr8n7hi1ocy3mwmoo8isadckx8gijj15swdp5zw8mniacfohn9rd6obpvd5jytrn9fcgnqx6t6zbzu2csiplv5tpw5ul9kgxlkgczy1gmzj2yg1z6dx0eh85gs9x38pa2w2dh1zgsdn5ij4o7gek0hvqktht1cyji09z99h2dg5kt1rmc344bbjs50olfwgbyqlvjyaj37ub8w6ggefkbedz52jyi1kmq2xk2y9ssaf009xmq1r730b3kna2poi8j85r6la0xdyhwri0vlxbtv4xohc6k2ldk3xpax8isrda7v2ws2kit2g73cn384a52wqc5df10xdjh5eacgzd8qnln8wavq7c7gfce6sbyxqplr40xunuugztsxj08mfhtsdhkeedkfr7gvvec43bqezhekmzux0nd224k7qxvx26m3wwklklpoxhz2n5vb39dvnj51gb3c82lgx1qf7x36yhmj90r5wmegmr7s7bcp1nr3x9z8ce0c3fqbs15uiq17pkcsdmru8f0ex7fepkd66ycp7qs6m2ppw9ga2v5nwqv1jn7btfp7g347irrdfvl8y1677ne5kkir',
                sort: 953832,
                administrativeAreas: {"foo":"/ze5H&=ab=","bar":44912,"bike":"C@_#J9HXNs","a":1329,"b":42967,"name":60213,"prop":"ZjYG[-|Cxu"},
                latitude: 11721475394708382,
                longitude: 98288525892088850,
                zoom: 87,
                dataLang: {"foo":"s=WgpGZA;7","bar":93379,"bike":20613,"a":91696,"b":24676,"name":75419,"prop":17303},
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
                id: '3bdcb084-0fdf-4ea4-8fb4-9cdc8776d9ef',
                iso3166Alpha2: 'bv',
                iso3166Alpha3: '0w3',
                iso3166Numeric: '6dc',
                customCode: '86gmaykth6',
                prefix: 'yrnfhd',
                image: '1qf7kqp5jzuvg1u1ytuoccta2620d87gngm0ok8xjh4l0xesroyzj7fdpnh0vrtx48d1n2qvxmawki02dcmrgm8ur4hvmb0fp22cry3ukc84cyhgupd6gudc7ts6z9c1bcodekie53ilk5wcc9cecdkghdzs8f2aevvuspy9dlrln64k695ovlt4w0egn3w80lemjpqr9djgi62wl62pqag1r69gd2i3th0pqcq0drvl2piowztl2jzx4iofhmbr8hr250n8m2tu04cma2bfhm7kgfbvn2fv27e4tcy6u1i48m5825g33jtmgv5r8taar66xz51atoowb1c5z0t5n46227mndljgnj62h9sjc3fxlzpngxnu7cj7anlh5v4q92xqzyyey6snocgvg4ml2r0v6whndi8aah5y5r2dfvkvrhhxbvq7vkl3mcbjig47ku546dcbqhqp47d931yhjl41mqigpev9bw7036738iibkjrdd09jny16hby5y6as4ora1mmcq41dw5fjvl21ebxq72v1edn0uyx1weoifpufs5cffiugbh5m5gb0qtofccaob35vmhb4hw9dlkil2z284il3rgjg7aghg5h21ghkenp59lu8s9eovn4cuvwt6mpv7mmrsnqthustc6gfp2sefstt9osrkri6z14nfn8jt9frskc67f135ynzirhiyu09oyq5uoa51c1v4nv051xhadp7qbzvkuslfkw1put24auhuxi5ot883j48b7q8bof26dxbr7r0eiovu3ft4uim12b23yex0fypxmyf30j0skvwmbcxzad04jmkh2cz2rsbtt3ng4pv4clzcng64006g3fwhqwlx3uyvleppxzqz8t3qqa9pk4lresareuiy151syrzs8eec7nr6b7bhocpl2vm30ru05rp0pvsi9ikv34xp72j42m7yqtbeo3vkhyi2eo8sghxh707mvxpd5hqcmho6m1zc504uc5ukghewf5d693hok99huik4gkg',
                sort: 275085,
                administrativeAreas: {"foo":84761,"bar":92740,"bike":40612,"a":"(q\\guL]/xs","b":44613,"name":13706,"prop":"vbv0;Frkvm"},
                latitude: 62438682893125870,
                longitude: 70312410047183040,
                zoom: 83,
                dataLang: {"foo":19384,"bar":9551,"bike":28101,"a":"eGS\"5s\\-@U","b":26606,"name":".w!DUe$H;W","prop":47556},
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
                id: '1417160a-35fb-4472-9b5c-e6cdc889b1a9',
                iso3166Alpha2: 'jm',
                iso3166Alpha3: 'x7h',
                iso3166Numeric: 'i67',
                customCode: '70o4n96kf3',
                prefix: 'ywts5',
                image: 'cln17bqeiyynph5vuojxch2jtfn32wbti0bh3h8yaxr1radzns8whfdnttcge4ccrppgkxkvh971dk2lp52kx0kdpvkl2mlx3p8e3oboqjrnfminyebkq3vrgfsjch9q4t7csc42ottj4omx19bf00u63swrk0cjneb7do70yyktt73mxor3xdernm92cqhywlhhg6evk7ztxhm7d5alf4r09sr9d0bhevo990dhbk9673mi3n4luejjphvjbt784ivuzvtd0x3f2dnec1mlkar5bkxoe3dr6jugg4pu7zsrf3raakaim11tc72cpovfoi7d6x61qwj3xhbsg1m2amvdvatf1j8vg1sxjzeo7u1e17lucfm0olqszborq1dyeobirizy2md3hi2so1ihkmhbmdtrdjrbywj67sbyk7vcei0fldy7tlv9vnkz1p2yd4km4lhobizr6vmapydmfqej3wzx6ue11fna4tx46f8ygr7gwa5d8c3c9m8ei0rpg3sddicj08a4a9iuu7r4zmarw9yh09s484xuxhz1541o9c272gwwytfnni54tt9yge6e7anmbyxa34f59n2amrtdudsn4qvecnat4b04jc4ts0sye2cihuis5ypgyv5b330b9xb0rgnmp28n1mmv43l7krhrx2sbg41s2it93tg2wmp8emeteiegzoxxla0vdrqp899yaq8bya427ykqhx0lw3rb3bpvnpqihx563ib4ced3wzdlnpelk2pnr5r6ren19ox1alrypmdi5d318n6zzguwdoegst3gfwtje0cwzyymjj87s493osfwmxfgwejzehlow17ovsx1jr4uiruffypsco5nff6205mfz1gflwkgz0b0ww1ycffw2dp4hvhir64b5tuu9y2449o0t3m0c0ucoxoregw8p7con5phaxrvacy0oyjhgp0cbjq5boeuy9mn497qxi4uotfw4tokw4dj0ikh7nidl3yckk9sgatuershljijo98sx2imx',
                sort: 331276,
                administrativeAreas: {"foo":"&!8u.iW5Gb","bar":27178,"bike":"}`V_u;e,\"6","a":87641,"b":"J-/'U|Eo1H","name":"*,=_B!;T[v","prop":73577},
                latitude: 31360958928732264,
                longitude: 28520345198110040,
                zoom: 57,
                dataLang: {"foo":"B@>[u,'LEC","bar":"_lMarlf?Fk","bike":"p?Ezx9$+/L","a":56346,"b":"?7:\\aMfD'h","name":58024,"prop":"a>4{c1zIMe"},
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
                id: '35a2044a-9981-4f76-b471-32e9914b881a',
                iso3166Alpha2: '1m',
                iso3166Alpha3: 'nh5',
                iso3166Numeric: 'r7c',
                customCode: '1u9drrc6nj',
                prefix: '33p5y',
                image: '7kojlhu11sj765318jldimbyk9cndffcpjj6gbolra4yw48bhd9y9hf01z46jkyipg0nguz04obo3xaxlqq8zm5mpq82rcxknppgwcnpv77or74s2hskul360iuiks5cgq4bb94dc395rbtvo89j8vwnr02i9n9y19ifzflbguv09oi8433rk2q769odj9gdg3zoirpt9yfbhbl6286f0watkyfxl5gdlydvb7hmrs1yx58vdg006zs8ea8f278hunnaqppnb9y38cbcllwjefoyglozv7zz3pzjuf1gn867r18ropy4bf2b1s1qmu0u66uaews874ckvf81qnmzoe3kl23fmzmlnyod585rxk7gz9o1o554egondpoxaz7mwbznwogjolglbcn0i8wiolqdgidgd3wgq5n5rw8p40pr5wf1kxnrfb3gd7g2b9amdjrkqva86fcz7p8emf73qqcdu8irggv9auir044ecih1u3vhs9jy48nhroa4rut87u1e3y1iut3s3tepqdbi877aw36grsg62d6pwi5q1gouwzar5mppw9uv8yss86qb5htcx1t4efhrxal2db37qmcz3qprzztds6fqvjceg229g3odtdtsshv6xvugp6yzhfrhuwxgghuv4ekw1dpsekagt13layoxzjcpavsnph4wpmtkb77yzycie3z3holmw442sc24hso5gr2vhhj7p1wkd4ol87cpit75t3gjf52cdxv9hvotpdccez1n8vql975dgyw8ktehafhahsjbboyg68aieuz46esinywvm3ofzi1m9p549a3orcqrai2e996yyzxdlbxo92n5vi28l08geoo60nvqs6qau8g89tf80ssy2xfb8ioweb2sajwgjnvc9g20rmgmnsihfn8kj4gb3flfv41mhhd820n3lzv52h0s91ntpkx17stwgb8aq51oh6q3dcebbqi6334z0imfed4cp12sfwlai2nc8hcbr44xjwz8i5od3kb5q6nh',
                sort: 7931368,
                administrativeAreas: {"foo":77231,"bar":55516,"bike":"rrH,(y|8?K","a":16163,"b":"7%-,O%C:Z/","name":"D!Q&SouO2(","prop":"1Bt\"vBiiJ{"},
                latitude: 84065109646264140,
                longitude: 99974743331389330,
                zoom: 53,
                dataLang: {"foo":23036,"bar":76771,"bike":48314,"a":50997,"b":2951,"name":75490,"prop":1346},
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
                id: '36c6fe75-08c0-4da3-b9f0-b226fedaeac2',
                iso3166Alpha2: 'ec',
                iso3166Alpha3: 'ogm',
                iso3166Numeric: '8ve',
                customCode: 'bjjpjm7d8j',
                prefix: 'qfnys',
                image: 'imyosp2yk6mehivi559qs81zs96f1gb8dxa6s1dzvpfwi3ybj8occbxt9fn48v8ehuiyshv4ig2w7xby46thhcyipqh2fpc9xbhngwobzs240fbsuvwxkr7pzsq5rhsdj6kndlu4yxs40rona51wbew9ichnm2ozg7nd8ecm1hs5g1lizaxaod6tv525kkp3djf8y3gs4i14z0scsvwdgrob62cr7hccdz3um47mlzwvfgcr4au177y2a75tdgui2zsn0an1ejupq74ah56vfa02wzou5racwp6njck672wuam7s7qhxxmily3cj5qedgv24ckl4irc42wwj8tb4h3wm4blr5cbhv8mcs7qs5lhlmdpjfxwveeh3soa35nk56zy8pji6h2exoq4dh0aptv3nvsr0xc8i36qj4esijsmlr9676tt78vchowj7z9y13y8rkjhlzpbmsfllcp3132yk9db3sq6nhjbcpeulgc5ctjryr4q7ln1008oykjjf5g69t588x7l8mcof4l25dhyj1wvtxaujmls4q1dmzdfyq09svb02bhmo7wcp7pmtpd1bnmjzrfa2zt2s0jdj3dhwyf824b0f7n9jj0tuodwqfycmj3ehkpo5zka6libl12om2y2be5w9gqpve743h5p1wacm7dq5ff6q5aqestok7ikp3h2fu3tj33ybigsb01xoybtvg8462oleeyd65atvt0wd0astvdqj8htwvbfd0tom023e602entzu03prz7ldn5pl08jto0cuphxrjxvhzm4d0qd5jn1isbs1c3q5wflbkfu9tpiwhsnrfmdd6n26pp87mh1ox4r9tobdewwf4w1qaem60t7s1qng3xvhxk18r30h7q1q5bhgn8n9r9hl10b5yw11gans7tf8r7b37dc6gg551ym1f55ul1fz1msn0c02emu8v51hxoule4swxinzxl6g0jiydwnbbdced7q3mbyyr6o4qjjq4wk6zhdvavxmia0fd4pmm1ux',
                sort: 221341,
                administrativeAreas: {"foo":73016,"bar":34674,"bike":15910,"a":"qGB?(yxcpv","b":"ZY8^Xey?-7","name":24169,"prop":"}+}8f>.;Y%"},
                latitude: 406611899626297540,
                longitude: 18071822511351604,
                zoom: 19,
                dataLang: {"foo":76038,"bar":46879,"bike":80014,"a":36999,"b":"gRIgfhqGyZ","name":44754,"prop":"io|xSL6N&6"},
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
                id: 'b692fd03-1877-4e90-8c99-c9dbc27c47ea',
                iso3166Alpha2: 'a0',
                iso3166Alpha3: 'lvi',
                iso3166Numeric: 'xns',
                customCode: 'p97lquhshd',
                prefix: 'az10n',
                image: 'jowzhnhz4rp1zbjn27mbo2jdd9o9viie47bx6l66v8sy5s50fy5vs8auzz7wueql9o76nxdoi3kvhxh8sxsj8j5wpst81em0xtphilav5qg7ropl48cwo4kydqre31arr925cf4135bugmm1zv9nnacxrvmrowbd7menx2oqtf88w5qygg1ny6b0iohuy29zjkz55rexlfksfwuoy2im2krsixoixubp7zcnfkdd2csn7pee2nlh0dig796wfe5e7uek6qk44hw12olqjbxux7je9kb5yrykuuoxfkwfw6e1xyl1yivjayliilbs16iql0883pmjfrd2tvqz6ly00z20cgtmnotw8ljkepneblwe00ugpcurazwe0k76ub6tw515zgp6q7j4tr3tlazpr7z85xbysznkxywsbmyf1e9oc6kbqd6bkjykmulizoyzapuld6xp679q9a2vbc1rnpbvsk7nnrpj3uiarnkp0ukag6f7xrqmgyowwpz2n9tf4cjvtf11zdfjzujpnsfgpl0lovlen33wjxhg1z8frtibvgh3we4tfemvuyziawz1brqlzoq078q3gixas13i10yshix702j0dru4zgk0n804hiup86sxgehuqmqpcr6jvrae84qnx63b5b4lts2tw0vk3ji8jzyo3plalwrc8e8hnr2y0ojh4xsp0no75sxn9xfo09bmpvmt6boztrqb2kr1bbi117gxbma6ati9uop61h3ufodwyhjaifmqj5jevojw0hk1xzcwvmzdyz49c2wgp0i2dfzqmhodji5prsz44i03yysri1dwzyrkpar8grh3hi9tcndvdf0nv04bqgq6yz4eitcwba19nwrj0auvujjhrn59qe5mdaxflp04ymltcfyeuda6h17p703kixtfjp13aok3tztrqv6q9dvtdzw5a8gej6itjltupdb8w57fuod3fmsec3x2c4ppqfgwejp2k1e1uhhru71475uwxmqkry9czqyugix5nyi3',
                sort: 160409,
                administrativeAreas: {"foo":20132,"bar":9300,"bike":"1lk`LxQ0{d","a":"h[Z^o8h\"%y","b":"===^\":_;[3","name":27467,"prop":"uqm?k0L95}"},
                latitude: 11790396641885732,
                longitude: 518138509688379200,
                zoom: 74,
                dataLang: {"foo":1467,"bar":98798,"bike":79479,"a":34976,"b":"f)X+P?(SLC","name":15568,"prop":"%aRd&D^fQe"},
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
                id: 'bbec8b70-a1cb-420d-b1af-dfbd8c2d662d',
                iso3166Alpha2: 'dk',
                iso3166Alpha3: 'ytd',
                iso3166Numeric: 'zay',
                customCode: 'qwpg6nv4qx',
                prefix: 'jzleh',
                image: '7afw0qo4foy8guyysk2mwbuic9rrmfv1npmxmk1yjak2v1h7d92vafb4xejdrq6c9jng3pfuqfqq0he0v6soyedz8w1pca5ri6fprbaykwubbemiwonxomlsx0bjsejwdlc66d74pzo2k3l0360g2xiyzbmzozwq3q2anbkqjau35eifhhcc4v1v2b4hbg5jmasmro1okyuul4tvk80m3ymsd0oxd3nosz4tck513jxyq7g42qd3sme2wr7gw7tbgekjl8axiktqahaxy0leru7nyjnm5i7sqmd4h890uw1mkrb7s6encnen8th6pn4jh2qjlgmal9m5yj9f8e6j281j9nwdrc5yh7tqkqt28byh40r80ikl2tx5pz5ubp16n8x7imhk58lf792pixpv5ku70qplvwp2ro67pv5suqnxey4jq56rpq3mm25tjncu75evexrmk0vrohpd3i5kxhohbwo1wrri2atllp9a1zags09irgr2hrvzz0p3r5t09yureylto4xnz7yh88e3qq6w83e63vzyveucfo3t69jyk4ithntri7zxadhblrk6tv3dmfl7g23uu5govxob2pqsxhcr46n3tbgrfehtz9q21iti7urv0fm1vruypq7py1qripv4wutg0n34ajiyh1gaim00ltoloceyr5kzz8ouyte99yi3hprvgbiiu12aftw4dzc9gw00plomkswtr7lu6ch5y2l4j5u54mxknze8ybnz22wvnyqynxdftyx2gm38cbqsookz0erfpb6l67hd7r5piwsmes2g526dhyq51b24cu2lgyepoyvqffit4u65z6cevff6gyysc6toqf7wszdh1pdjkwkswp11eyd1oo7ksihgexpdtwq2shtbtqgczr7lhkrjycr1r630hxenq554kf0l38h1guuk4q6a460558td467ub8qjdxb5afq58bvcgkcmfijoy4grcya89j1up4ckcerqhqcnq6wjlld78qavvuq1m0ob5kzu',
                sort: 398213,
                administrativeAreas: {"foo":"Csxw)i`E<%","bar":"(=vZV9ECtN","bike":31556,"a":55947,"b":"-S*aqT{P]H","name":44884,"prop":17663},
                latitude: 76480535318161380,
                longitude: 91562073494659490,
                zoom: 217,
                dataLang: {"foo":"Z[|GM..'W3","bar":79715,"bike":36961,"a":",*jNj1+kq6","b":"\\W\"#$IO/Q4","name":"t8ej'Co[a\\","prop":"ja/mYLW.:v"},
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
                id: 'eacbb826-280b-457d-af62-dc3925812f34',
                iso3166Alpha2: 'cc',
                iso3166Alpha3: 'j92',
                iso3166Numeric: 'h01',
                customCode: 'qlnflvmgur',
                prefix: 'peq6j',
                image: '31elula1xmcbk6b84orzd8xbbnjv9ffnh7qkf673i083ga946vc905hesiahzj8jc0gmqqknnm6gjrw1d8arr8ofvws3nifj85wt20n32qged71xgoa7gbyroen06ct03h6go84bxyr7d8277qtgzspl9856wj5b6uyamlvxobrn9nere7pjo4k2avx0zrgadk87xj25zl2i3hm72upl885ri43taxrqurf0adkqm19w7saeappunysc26o4gtm0bpjjjyv8qbuwdwy5wnlhf25s261i7ieel396vmnmltajlijk0r75fg58p1m3f9bvpqm395smwm1qu6zp37hv84seprwarv58ncw88fzi3veetwetx1dt1xsc30cpxgcfrzi5e1596ywzggq3gnc10rj5sflfit8nlle3765mqa8ntnnrho7e4ihopifc1ffxl900vcro6v92k0wb9h8bnmvge4im7cjkc7gcixzs1opnlgg4sbcczha2ll4w91gg1994hykttehciggh4395xk6ro8hnhidzonzn4n0urydmt9omhyzuye4bzpxexgwl6vi39xqu2t6k5oqc07vof99igno8o4g3ei2m59pbkzul1gu1hdtgqejjl3i83k49xihbqx5k5044q7jsbkmny61xwfqw41g2gjh6o5friy4tbu5k6bx99k6xqooh29b4b3fwnss5qvzth3tmfvr7bvoy4etn3cvfecc8cfq47mxb7ror2dgukundm0xbn82remfwq3yd7cwy1n5ba39g4gj2e0cuz5lsjx7n956pdz7veq3s9ou9ezbribcbvbmuep4xoawhoqa2munlxnrmosd4tdwfi34xz04oljy09rmpgofqbuemeag6hylzf4n3gqgnca2akb59ritovnibr8k74k8x1uw6aqzi9h70xxtp0myw1n0wb9vfhhtmfk8lkxmzmmtrgyg50f9whpvb32hqbulib0zp6c2n0zymaiu65exjen1svf2i3rmhoz53',
                sort: 865738,
                administrativeAreas: {"foo":"xB9wb_%VY>","bar":77385,"bike":5248,"a":"jwxo$%|f,[","b":"*)|iH1jm%V","name":"0U+14m]i@S","prop":"qPYcI6Rtbs"},
                latitude: 58223290435945944,
                longitude: 53854494761432030,
                zoom: -9,
                dataLang: {"foo":96141,"bar":"y#z9;^boY}","bike":"v2XRn)GrLX","a":53350,"b":73107,"name":"Yi$}t%G4GR","prop":87970},
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
                        id: '727dfaeb-9e2c-4b2c-a00b-e233a6aee356'
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
                sort: 613749,
                administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                latitude: 29546188866878148,
                longitude: 30544687053904984,
                zoom: 41,
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
            .get('/admin/country/d77df4de-af17-4d3e-b843-3f6c18b2be44')
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
                sort: 555572,
                administrativeAreas: {"foo":"=AJQ}D%\"Q9","bar":84261,"bike":"k5ZCrOMM]]","a":"QW7EznmMkQ","b":39478,"name":39847,"prop":"iZ8f,kreW6"},
                latitude: 85968570780399490,
                longitude: 83544256455540670,
                zoom: 13,
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
                sort: 937461,
                administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                latitude: 93027029378278340,
                longitude: 18464387555427864,
                zoom: 90,
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
            .delete('/admin/country/cdc8098f-2f16-4952-a823-b9b60a49556a')
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
                        sort: 456718,
                        administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        latitude: 41262818256987736,
                        longitude: 90011055238935780,
                        zoom: 55,
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
                            id: 'f4003b8f-0315-4267-9967-7a53d8095783'
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
                    id: '95f21071-2052-4070-917b-fd607c25e684'
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
                        sort: 321722,
                        administrativeAreas: {"foo":"=AJQ}D%\"Q9","bar":84261,"bike":"k5ZCrOMM]]","a":"QW7EznmMkQ","b":39478,"name":39847,"prop":"iZ8f,kreW6"},
                        latitude: 12180804609681076,
                        longitude: 99945409292876460,
                        zoom: 66,
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
                        sort: 933964,
                        administrativeAreas: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        latitude: 83901323759017620,
                        longitude: 30189105541989596,
                        zoom: 32,
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
                    id: 'a20ecb83-0d3f-407d-81de-41198082b2df'
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