import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ICountryRepository } from '@hades/admin/country/domain/country.repository';
import { MockCountryRepository } from '@hades/admin/country/infrastructure/mock/mock-country.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('country', () =>
{
    let app: INestApplication;
    let repository: MockCountryRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    AdminModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(ICountryRepository)
            .useClass(MockCountryRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockCountryRepository>module.get<ICountryRepository>(ICountryRepository);

        await app.init();
    });

    test(`/REST:POST admin/country - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: null,
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'bu',
                iso3166Alpha3: 'kjb',
                iso3166Numeric: 'jch',
                customCode: 'gjwi23cch4',
                prefix: 'l7s7c',
                name: 'i4m8br6mfk4plxn39xu3vtvoiy3xnbz5uwo2z5f3oboyy6du2vhyk7w787vgxzipkzn3z34mxuhhxe8ahlney90xc48s2ymd5o5mz4xsa00n9wa8z4qxyi9foncdijn5uq5c8jp92aozfeqp81v6vfshv2u31isob0byds7k9n4gckio53s34i6x6akb3ug88huv8wf6ya4edfxi2gvzq9cuarisdwebsmej3jpgcmudsgztp8cv8m5uj4xdkbh',
                slug: 'n4nl3vco2gky0xedl05hsrzy9r62p6gd68mmg0kycq0qk8wa9qbq7hqr60ehccydtxs6su83qeisr237fu9swj2i9vyo6geocj1t3lral8xxxjmdndh4oovwzwho1ep9boowyx9wweb6ay05usa8iwq646h1q9wbhqi80e65in8te376ff8ss2j25eb1yc1uxxym7g7z5hxb701uj0csyvsut96yz04sfkd0cvz9kol5bnlg8bptb93vxyncv8yqg32m0bhq4lx0rxx4buy3do8cqwsoinoi4sser94jb4owa8sc7g1h5cygk3ors9gy64c94drh8vkvhntgj4v32slf70auocalytcaqvqf3u4aeh50i2a4scr3xfpjk08h56z478tel9t0rknxpnopghpxjw4jrrcl0cn6qe3zw60296u6nz7m7po98j4ppgk65iohisatiz873wb5ed6byd7icx7ycnn6bqcormj2so7eoj326oivq6h51c7gllyzvy8q9gtavz9vc2of22pkjjpdinpafduq9bsmlwaujnqzxvboihf1hmjq03cmd4am7xjqrs2ldrionulvctgwxpjjiksqr4pnwk8v98cj29a58vhcjv6qqdvu0dn9z7hf6cuvtlptnmudufx0jcjpda7g8u6sswga4ekbwbs2ft36lomeh5x30o5234bathbvwac56ayo0uhe58elghph1f25jrzm7mvrutfw8zekj74a91s7hd7tuxdpttgqq0h0izwrwvnqtu514lazyl6j16pvrm1yfoipu4b2zhs1xglj5ponqxfr7s3ys4smhu8xhhsvtp3xfsd19gj5mqpl77531gb3wn67wuop4fqssgflfmd02miblfda94058chddxdnxhb6rdzct0gxibtn99n523x19f3z7sq5yycm5q1qfzkpgv8n3wps28lx7pmkyh9rjxjvlqdjbqdsojkdinb25quzlr26x7i54rznevmpph2f5vvlfopladgk7h70',
                image: '5ep7c0ber134024spa5cab1n9g9wlwf76cdux0jh7n8u5bj4ivs8w6gieyu0kdixyjrwth25j36i8y5hhcl50tbb0r155biljoumn7vbfd0mt80xiaufvvjx8v052363lddosegg41egvknk55hzea15ubs8rce19ab2nuwmyl8syvq4jz1criz8imc7nw0vr6nqe0outnk5ccvfoy8t7jjvb530wi8dmvo6x0hpsqhx74rnh121qhriquxy7bvr2l4jqrnl3uerqt1jdzl64yi8n314v7aob4b2c9rsx3qmh8cwiydgb4ql4fsnakp9h97wp8z5rnwhcavv1s1fiqdl6m5a43kjya3gsm8hs1k1kv52shd405cykkeptni7xil568ch4x4v68jaohnb105v8j4wokke0dczqsn6srl2jso9k6uv0nhfims9eajlrfn8lsd6utdwlf5fhahafe94q58wmhixm4kuyhpnjz129p25lw539btu18yt0os5o9oecw5ua72p8amgjd1teb4zhcc7yhhqzquz4d6vug3y2w54zqqdjfz57zago01qzi0zjrhrnit3xgnjff3w71vlkllnsyc6ov4hony0pm952dzkrxa0dwacgn6wty9rs7kx2bytrcv4j0y5kvga2jao668pok9b25hk0mp7fpqtr1p22lbz5piau5wu4fwltupmztlyxtdjk5ilzxt79jkkywp3lroh1unxhoqs7n3yfipkfhv33mfeiialql56pol2w3d7jr5pswrttejp7z3jx7ewztl7n1uvi49wscbvc4cikicdku78a4tvalrr192b8zsqwn38x22xfl8zm7jm5a1j0rmrrpzq8fhgu8xtpcdfmm66sxsavuj3dl9kwfotihwyc3aktp3sjoky6fsekk7qqni831iyiv4t6lfhcby6xcjnhz9y084wp13efrsn28a785xwcb4o3fzjcrn45vv9ga0lkfkmmsjbb0g9q6l02ukqi5br3qy00azh',
                sort: 160298,
                administrativeAreaLevel1: '73hawshm2n1c1vthgi77293rp59d74dh5enqw3ty87ec35mzxy',
                administrativeAreaLevel2: 'vwd610rqrrmmlkes64wcwf13nvwq7x929r7d4zu3id7wsu2ie4',
                administrativeAreaLevel3: 'm6jp8hvqzloelqfyn7p2obxw2r0tsgqn9qt3bct8ozet4i7gc3',
                administrativeAreas: { "foo" : "bar" },
                latitude: 603.11,
                longitude: 967.46,
                zoom: 3304298841,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'ok',
                iso3166Alpha3: 'uxl',
                iso3166Numeric: 'n7z',
                customCode: 'g93nvnaxba',
                prefix: 'bqduh',
                name: 'uixx2aowq7v8xjxvns67osqnuyjug9t8v5ayp0rkirg1y81col9uxx2rtak8kw0xc2vxygy53gztl2r952wuvo03rhbylnreghgfwrdsu6ln3v2pi73wrj7ae2fmg9qczng7yusrldmeweu0rj895k4jjnmv8qc2v16vjrd30ftbyot9wlruxoloih8ducoalh7m75vdjzcyo5ktvqag6bn87183q9p1nqzmgypdg705sqf1edlau45g3196hpo',
                slug: 'xvfv82ndr05dccx7mjpic5smlgv7qiwbp87e45fpu95m6wx34qr07umlwqg5vio8f1adgmznw224p643gw5ar29l4013ceor34bblwdye637eu2o2j9kj3nw6twy8oqi3rkmvdx1r0o057zp7zuol4z3ccf50a0tapddfvxl2imnd23eiehio6hkvd4s7kz3vmyov8514sdamkmpyvrx8fgp4mcq60vng9bnvndb1viqwmftrln8pzilhlnbhznec9wkcynjwqxesbpuwx9dar9ulu161man7of39r2cst6ulv0kcqsqlw9v56qphj7rrcfbp4catocry2qs0i0dh6w7ab1kjkaam8eofyqolc75xvndqqy6ey260hg7htj55edvvxjuuqkmbibed73vk5jl8wc1kkzz0rzdv6qkiknfdb30tn7kbgydfq6vgirn902cxd9w00cyzvrjns84oe1dfcgbtzpl2cdy8pxew5lcftqbjo0c3z4g7nhro7lzquuue3fje8q0enjce4sg86lqnbf2iw6t2y8gbakaeaqsabz1wscnvt87bcxq8imic404agotv5f6ko5m2t3y65orvws4i74etoncu455wpc0xfak3of24v73r36h59qtm2h331o1kfyfv55y82tcyt0f7ggzhaa78bvj7vbj9l9mpt8vnrxmtg0hd609tua35gaa2p6ug5cg8c64p0mnz29au7dqewzsl1jrktm7bz1q1z3cgyczdswsjhm6j6lk9vq3q4yfvf9kib08sx0sz2cyfz1nwa635t9lti0adqonzlom81s55xrjnl322rdy70p6doydz1smx83bkelghuqgewe038t84ya1ulnomywatom8qsxaoop4pdaphh9ibonekshm5pn52734t2pok47iycpne9k6u7autbfm4xxg5dtg71k9gox33s5xbwasx91knblyfiyok7czw4j6j5cmui4r47ymvgiqa5yjtrn1gteztaqgovr3tr9et1t3',
                image: '0wdonzcz1p1i6jabftfu4xwkio5wxk2xtn9rukbmdlq5xgpogo8jta1930de5i9nh9jqdida7ttif4nwg1e3iawxeip3dt5nipv5z85zr9wnk2m5belz3amy05mcxt0hlxjtnk9fy4hwhp5qx2imr1sjdr7sze1zabi3eljte69k53vzfgu7h1u0znhz9dr28kufmff8zwovjsvpulrwik86wtyuoesj23jjzdq2aqkrnlw91qo4yizg0v1opvfen5q6rswnbvbzotvjr7tn9d7k0btwogj0z6ilhhjdf4o7v4518pz0rd5z4y7io71sywrckixkb0bmz6bzhep2jmhsyergohrr4bu5szdtwikwzgjtvqo1699r2cv8hyew1i454uzc1fl5glohtpz77zs4lgubqdl4oe6repg4v30hlzyxt97haf1qxhpo82siebj562xbok23af265vpavnoe60b7hpye5xnmxl5y7fl6byqlw9tmoks9srb27x3msyja4y0mi1163ingiltmdjxxw2jp98o38oy7iw7zkguknc8gs8vvbz52qvgq8et8ovd3bqct197q9k1hsvhzlhr3vxt51zecjm9h6guzgos77ksx6if5stk8nu5vw8x3dne0nj2il7qggdjognd1e1huqp1iwrfd67n7w6gjyc4j1miqt1jibg0w65murkdiux3e1mcl1j4m77uvj1cinmhgxvavwt8q1ve0pphbk2e3g1yurkmkg6kj1f210u3ka96ay8wmi84t1un5904io22loh7gvv7yeezhhyc8k1oacdal3b2nvyrnrb0n619uu8njacskpf17xjht15jtxp9o9f3n3mxvulps3v8mn7n7db9vlxjgh5l33dr93q7s78wzwtlh08l4iqisrrkpq24jgt51jtnkyq1uplnioxvp63vfnsnzobrbrehd2pe142mtx9ytgpwfhzeilfyfgcmhshudpxv27ow59id78hiltviu677zf4d77atl11sg',
                sort: 696158,
                administrativeAreaLevel1: 'lxthzjyxxhfijghu25ldxs4vco4o0722wvidyv72tp0r8bgr6p',
                administrativeAreaLevel2: 'bmekuje1smjx8x48hbw5tzrj7y9t3fd00choqmki4f9hfjvl1g',
                administrativeAreaLevel3: '5l18fa2ncj3ugalpaqpm60qsqur2osls7glcuv6mbyci5d78y5',
                administrativeAreas: { "foo" : "bar" },
                latitude: 214.60,
                longitude: 893.45,
                zoom: 6744532424,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: null,
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'x4',
                iso3166Alpha3: '4oz',
                iso3166Numeric: 'zr9',
                customCode: '5dxxbvtzxp',
                prefix: 'ik6nk',
                name: 'eg6r8eldls1kyglk2ejzzgxinuwxr2lm7g4e49kjlgxh18coelgkcnhfdaawqt8cot4s3vhxj6piwld33clemki8rbaws5j7yd6vtliugah5rdo2tqyl538nihc9uuyyiitjn107hr0dsbogyo1vwzmsock76ixtxc26nqnoaq40maqd0862kma0fhdheiday67rju8xxofdnprcpwz19ri18idndns8mb80tzzamj9vx0fhib37zru4ubjyekl',
                slug: '6bippy5d3s09u2qnutv3xgor9rmrwddynqg305ezwmw0o4025osr1v2dznhtaxlgx4w4yoo7q3q9v23gdzvzqrn6ea767fmajvqprjcmvm4b2tywth8mqf47wweno5o2ko66n9h6dxt9q5vymepzjhyfza99z5glmq9vis37peiai9fah3ilqdyrreahwof9fwc1wuc294y950pqivq177sgw6ffqxq2en8dlswr2glxcen07w8n74z7sra813rzmgoosvn93p7xn2uok7xmx209ysehdo84maob28q62f1g56h2jvunvup2uyvm51aw1v4sok5lc7458py4fdyyd45umwbh1gkrejwinm1gmzpnvnx01ezn135bkcaeqzrdwoknhp7dj2uw81ebjgpmahy6j7xw31gpyvixdhpulkgbundr5mzfrd67i4xq9023nb6gpo0dsanvs1uormqt2ssrhuqmfm4ibxk35rf1hpn2eu12uj4vqru91m5o3r2qxh64oas12vo0yn6xutm0vj1toakfn3msaeo3jtp8it2y8d8bjkwyjyjczn10cx8fq2574xerm45ke455z4gnhs13n0l9jh1eynu0i507utpvdgp58y47chk1039yxeoj4fyc0qctmg5j9au97sd9mmabbpl1cgnhg8iiq6cw070u433dhtox0n50ukyaaebqd85tchzvgc7kmjntb21165dnehv4gzty7jn26y3nr3lw91uabe8zal34nsn86386ao9994dzuhktfb9hru0yucfgyaapzriz7j7ksq5x3u1hspvm4ondvo3zm135roiy9cv0s6k948v7lp2txh9ygnmhiied7zlawsh4fw605bpmgixg8by8v5ifmzqp41s7zji3z8jqoh5ruuiworlkr1ctg42kvt3rfrrmxr1cfrtwh82040ux0sw5733a4k0x08w6y53wuqil1hafdm98pcokt1d17gmchh7rcvlsqx64nd3t4caz857t58yfi22e',
                image: 'jish4h79ov3j1mhh0tv3pqgejamfbkc15i5w2lsj362chsjpcgv5zko2ha64e65459rbx176c5d2leyz6kevpfailm3j71k5qzs7yxkrbbwvkzds6rp6zky12tywkreu8wq35svv2vkrj9jaw2d6d7kwrsbwc21r24lg7fb66au21ynbekr4fkisva352wx9iajovsojyg8wlldm83vmeqlcki5d9wbn0p28523dbwum3ms77vyslhyvxfalum4modk2xgkg9gk0kh1b8dwb3ozbr6pvjc55a5l8xvxba0ad2lw965v8qaa0ag9av3koeb7169c7vihi3puqd6qtnwuvp033dddfmqmwbm11pka02xxhm0tf8nst9vla1gylclmvl7dd35pwb2dn3chv5fhhzfdk9pehdnnwrfaegt49aus4r1ter86qwgxfkz4y5i1a571450q0035zf7qjbo7r73vdcxbs581rjl8y5f26f54s09upey2y6kq3o173ouf6oyhbvec3ped9xf42bc60v39v9gpj8qxwqsmvznmx5bicc6qjxvr5ssc24orlg8ftoh8vcg3rurzsfz0l4ycj7ktdh6g818l68kdexqtms34qg1k6kmtplq433fv6ge5bgbgoi9yk1c505rrrvv943y643m1dm1d2jqcynp2tgmvzoz9l1tcw48h1fw1ucvdxzuvi6nrk4sqym09tub93b85tai16f7dxenhbcugr9ij2u1chmvimwh3qoanrefqjv8lhb2tlho15lpdnzcdz0b7vh76vz8579djy3lkmk2qbkyuim2wm2w3h9gw3wmlyye4d9f76kt4bg7sh4cx5hwyk8rmhirvifrbnjto7ac0ump0bswuepomfvh1f48orpsxsdjyo5l0y3z7i1ea5m97s7fcorsgo77pn6bfwqun1rsxefw3iucgb083rq9f8hhs4efr8qch9kd1brzvb3mm5w1fhnr9awhzi49mt6t90s41faovd5wkqqr5h',
                sort: 518149,
                administrativeAreaLevel1: 'zjsnoyv235s12wl42lmacmfh7lml5et5hbiypp07937idiouy0',
                administrativeAreaLevel2: 'uksdimdj837s1fa2gxdwwpbkk6sk0zfpf620jv8dd5l7kr3mh6',
                administrativeAreaLevel3: 'zvo0pc47xvmio6odrgzf8gdxeikiofeu18m0u9d2x6a33m4upg',
                administrativeAreas: { "foo" : "bar" },
                latitude: 975.21,
                longitude: 387.41,
                zoom: 1649317506,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'ph',
                iso3166Alpha3: 'ytt',
                iso3166Numeric: 'nrg',
                customCode: 'zqz2vtse42',
                prefix: 'i9cvg',
                name: 'icn2zo41lrim2vpng0gudj79m5ygllhx9q0j6riyvufv66b6owse59nvqb8tu528kpsfvtfi6xade1joawonldq1t77h5obo4q8p1eag3m72rbaqgqxx4ujceos1lnbazw477700sklxnitd9fz3ox0i4926dkanoypkpyjb3segprgyw37s8toqcbqbj0rzn9v2g2n03r4ryllydg2zicxrv0p5d5hx1jagutk01hxng7skp8sgduqq0xfew3e',
                slug: 'qak3bc4mwlc04e3demotoxsh3u5yaebxslk6hxnxazomk9tmsckg4v5oigi7fgu95wn4b5mvwnlo7y7ktwko0lz3osnizbvvwzv829mdodu4mic4kj2mw5ndey1je7qxgx7jrdeu26fd2sz47bidhmb3opmhb1xher91jm34g1plv1bb7knvu4ple5fhvs3d7vmbh0uewi0g80l322kdk5n43audrtu7nuaou7fq4wpul9ip95jjd63q0rkdvc2q9azurwq6e928cx6vt3raqiij9ijo6bzv3npujak19gfor055znu0oe9xd3xssjuqhxuftyxmuoje9rcow29rao9ftmsy0xqu77s20o6qj6z9yauc0ysioq0uxfxj6f2t75gk1jashe4r8e5gac1ejlc3nc1l97c18937x3nci52t0xulgqnfgrnfj63q8o2kwx2x11sb2sr178vmuj6cdb8ncr22zzvjyqybs0mh51ug599v1jydxe9cmqbioz2htwm7e86snfh1wyzqc6laaojyj596fwvna9gb7mzgqeu4qfcrtdymsbgjx3aoae0r1mo8n6ro26976jbkygsoeznrwqwosfajn9y1laife4f9a016kenaffi5ytqwifhkezjl8lgpo3hnje5riu8oywyk41qmvsq3yjx1k2eyqmsy2x3bi2nsrcvwbbtkguoylvrb8ozbwvalxz9uocm8qq9y5fr6sutz0as6jiu83puudekvbcfq15xjb51mma0zqj1wowgch4k8yl2yfzfctcq0o2oxlmwmaferkhtxc0os1jg3vgswvpsk3hlquc58drgm1m4kzvowwuqu38c180amq27g06mzph3y0fetf471l8lhc5yxcfkb5rcwg8diyovwftbshzyqtjz15poitjxwbc59p6dsc3s9q57azim8ughrtesa079zjyinrjk5961qyfjc8mwd18wxrocwcstx2vsl27htix7teicoytstjrt500ffdwxkevtz9bq5',
                image: 'a44s9pk8790ppzt6p0jug0iqhymmkqbf3gt19xchgiwz0vb8bblvku8e8i2xj80hclbm74qm6m3dffc741fr85k0dvu2a0t8jp7jny4tyilaewcaszgct8kueaadl98viomcmrx0zcbhbfsz6dzsmx05ppqlq83p111tfsdf2bhvgaya8za7cvc9o7jnm7u0mfy4lkxqcieerlz924epl7iz6f74tmo4gddfa4qdngnqe57g8mr6nbszxjn145arw0pbj15q82o46kfoxoegl0c4j3dyz27f6t74yw9kjap3bw99k9xi2fbthhv149yltn1lvqxyn5ckff50cr4v2esjltd2v7pdp5gtrbh63vw74tgiezdrwiq5pblowsnd3bk8qxtb51ziewyxl8yg2acxn0y63b9me5neq4ctqe1g7xkecgr26r4toy7jtwnr54yengrqcuj4odzpgod0ua3pzv05sx97egd05l8gno0yn7pc5cqwtnfxcar5jjtw3kd5o9g4dep2rmdn6e0g7y5grip4h2w34mejeqkaql5h68u8amm83kv0mbdgdi954dpn22vt2p8aujzpokzitrkqjapwjwqxdkx16d9p5q2wvt681ynhld22d8y3t1xyvrw1knuvg3hnqsczi1i2pde4uharrtql631qp2gshb39gzthsrq2isc2h546erk13276q56gtzp7masxqx1hhp4cioncw5myyj3k0wiasduz25wqdzum8pv3g62nhzgfm793b95m616pqo6gbheoxuj9qmda3st4g1ili3cbuerxtamhveg1vf8iwxd7cua19vj5cbcs3e0thxstofxh98bd5b7y712bzh7fgjek8b651hv3x59yzumzqftsdjm1iusc9dckfqkfoes3lhqirdeqwz4wr77yydjttzuhref1bpcwfk4p646l900238l2tjzx2figzu1oxf8zv8ykxha94rt0pv9ccbvz7feic6qne6q48c2ou0rzso7tskjs',
                sort: 187194,
                administrativeAreaLevel1: '5uk0yr4xfy9sde0ff42novubvsdj4w1dxj2b22k8qkxoc6qmvq',
                administrativeAreaLevel2: 'yktph3b4b6txe3edi318tuhc045r3ee1hq562qxixd0ez2w3mu',
                administrativeAreaLevel3: 'nixe3xovvwh4v3iuf9y5gxb0hudtvj9whgro4zcu813o2k1mz7',
                administrativeAreas: { "foo" : "bar" },
                latitude: 866.29,
                longitude: 772.21,
                zoom: 6288540066,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: null,
                iso3166Alpha2: 'q2',
                iso3166Alpha3: 'b6o',
                iso3166Numeric: 't5k',
                customCode: 'a5izcxbs56',
                prefix: '7yikl',
                name: '2e0zomekoeqwakp0h2qy4dqgmendmqmog4195qual20ij2ffgo8epn81eegtmc1qfcv5exc6bk40i2jjnh90qxuby6a4cmsscvbdyy4zul4ls7zrlj02jajcri8ht52p4p2byknpiyo0wl6skeltejbb9p3kf4lz92k9fufhvda7rnp6cmyv564vy2bggw2wpa4od9qmc0lbkywbrz9ycnmtxxy69vfvvkv5bnnrnc3ozjpgdgqege1v9i23sc4',
                slug: 'p2nx123qen72tnzi3ntc171nh5b49znn7mdu3znpibrk2eii5emejvtep1o5pflc3hvilbxi1cc9qw67pziquqgod6g5lgvfm3qw6tyhgbeudm4nc3mja9fipk17objamhvpouv1akpa3mqxaczejsdbslfgqjv8y3hvctci1fj6br0gk4rasxg2hdpfhs4rdd6even3fqgomixtr03n3qtvdgezltqr2ybl01nzap2ei5bsag7t29b37lz1z7ofrnkz16592vpg4qw0c1rusi7ntx3smmm22tnzhugekof2f3zs1s32yuw0idnpgc90xciip1v8e0p6h8dblcqlat392em06a4ypfk8caqgdhwyybbqzp520zymyj35p748fqv4uij5ylbrumcrsnst5ete0y19ux7ymmcxzu7vxnach23dj1304loa4688sfm1805izijcl89w2fqonei219xge4zpas6dpxrh1lc8zviwx3uli8krh5489nsfi1ubks3ge4ell6ij7hk02oewtfhzthf81hjoertl5f7gybu80f7udlmzdm553jjzogiko65cpcmhyq6upruu1k4ktqz8h7fh6avn67zvxpn5ak7suczoq2zm0dbhyck1fofcjhcmhmxzrt79mtrtzv5zfl1wdiea66m2i41jt68s677s6126fsmck1l4n9otvmbpb8mkhm6y4fiewl1wkcgdbbw0tq3ud4yiey1q9viy10u3qhrhzuugq1d1aau753afe0kwbfwtx16ixhil19sgdrg5u5agwci9f4mgb8bmz6rm5uab0b17tna6t0r3q5yky4g93o7mew933s5ufkcndpk4pc7u2mdfta8dfauegx3knim6yz4280mmqrxqf624a00lwgk5nb1yfv0pz91q7fb5mvcxwsxojowipeyk72s82dgdj383ga9nug5m7r1twqgqr25sjt00scmdfyqbxakb3tlynym0ukqjzvva1xis6uoh32fbixzopzz3cmzj',
                image: '6v2kepavm6sfgj6n66wnwm6272iakbbubh5t84lspyards607q1e1oljr0n7yfn9q9plvv8x0ojsrihganhqda88js2hy2mdhv5huzghi0pq52wrzmpo7w5i8j4mfl036tcuwq9itb3168c8dna7ofalmxpvydydspknmae5r5iqpmg02nhhykfe88ppruw7cin61hgt8hoqe2s7pu6jo9fe4as7xce854s145whilgua33hrhm00mb728eq3yyo7qnz6n1xc9wm5xd71gokesk7pgbsswt30xvqy38vlsy7ij607t42yy77sddv6dlmwru0xdzj4b2rr5gr99pxbt9epwaur3cr2dcf4s6nqai4n9lr0htprj00s32hbc6nt6ah0ihkz1c3kxbz4f1hayrzr7ebwpx9nfothu0hp8f6vxeshevdgbob1xudu07vpgfylfyuxibz6kgjrijz9mrxked4er3zn7hb0rpls5ybubt14dpstfzqxdqn7zvumkae05yil25ys3ojbp6k6rix4f1a6q970p8qt8p7n10l3vu7psl7bgszxfjqt54tiat77m5jd978cpuby4q2vrh1jwbt5mcki906ape33wvve403mf2ghm6rl1c5ctfykxz3vgwz42efl37jmmz235rlgfvrr6xdqp38n3yaco76x4d2ask28eci53bxua3q6dfl5mw2zhdduo3syns4dw7dmjq6tgt6yqtpogacdv2srnkinuxjfra826obf34hwzf7jwso1r44t65c7kr1bp9tp38bx1f4zu7j247b3lfptg851r2rq9vuald1kjt5u5jsmeal5nhrzf3uyu4fum585t8ro0rdq8u4anf8y8co0dzsjjz0wkcno5ymwg2h43ndptpzkcir1skos10jhw9f24utyng8ixg3tpxosikm7hn3jgy9ejew2fftpz0xwosfpp0os3kqnbzyryu9ys4va914g5r8wtpclgzwzxbhhvvcxtsgxekfxuzzbpcp',
                sort: 729137,
                administrativeAreaLevel1: '65oqrgfscsk984go4ozs1ogq6inn98vglsua2klnjdzceo9h70',
                administrativeAreaLevel2: 'txmjk83612touz95jxhvumydv3ja80adkzxl40my42iyfvjcrn',
                administrativeAreaLevel3: '92b0qrzeevjsspzrbfusb29dwq3vnxjj9epxm3jhmc55gwlh6p',
                administrativeAreas: { "foo" : "bar" },
                latitude: 360.16,
                longitude: 221.99,
                zoom: 3192380167,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                
                iso3166Alpha2: 'k8',
                iso3166Alpha3: 'aju',
                iso3166Numeric: '4z6',
                customCode: 'mbihq0ybmj',
                prefix: 'edo4g',
                name: '4igjhf1kgznusxw46b5xeuuvqvtcwahcv9442wfkoddsef07nd7qvc6ccbun18mwl13aawnuryazttl6ti77nkqm5mn9h5tpzduqbta4mozulqefq9hbdmupnqsep874aplipjf47ogv15qfhe8la1j72e5zg06iblbxitzcd8t1gwcy5oi7cizmjh2vbb8oy19znmh7ys6gyjhppr0ipsghqlr4djzoghxcgp2jxj1n5zysacsrod2ixnk1lhf',
                slug: 'mjo6oilugoj9ssqly0dnn4kwqdoq39sbjldsk2m9sr17xpr033i857zdylersu7qyz5xukc2ux7h7u5d8zca0gbc3fvptm2rpkg1rkfzzvkv5owvkqfe18ptcm7opw72z8xfxv3s4on4ugsylszez4ay84g7pnqq1h000i0w8pdqkk3q7754lceex82p4fl7lq1l3mldhqv20vgj8ycz9ssyrq16r09r7vvt1wlhc3zw4nqreo3u8vrgl08ych2fcj8hskexhl8hq9iomp54x3ukjodd6i03sjg4nlb3081qn3byfpmxebwygmp42bzeiv5h7n94lbjxg8fo8dvgfpt2601i4s1lixy9xoscdoa14dkty4pu4h74urx4uu5facvbv3zlxayj41mmiruo5sdsezobuq1sqau3izcd1tjzq8a4eyl6uixo4xowfj6ifvfgnsj60dk6z775f8u7tkzcqe1i7bufnc08lnnhh7ubuyaqyxodul7synjpa84s9t0wqcup48u7ik8irxiidrgqywd2hu2u6h35qiyebfwg3hvcdne53p7y3h2xgroywcjsmlp8y83mtmi2v8wj26f5nf1195jh1joug83s9w8c0uo8ou9hv8wrctzhauwde0q17cp6fyefbmk2qlhkamiwukpakqwq33h4koldzejcedemguvkz2gpq56u6vrrt8rtoourgn4h9aaqqd9dquch8tev1gfp336g730ygv69spyev5w22mbp1o9ugibmgax8zpp4nokw00on3me1rn3fjfbmbl830ge68iqk18jh6tf242g61zyi6iu6qdfuhhwo5naqjeii740nmly1x8wgfvn7ct5ts7smcn8xusgnaso6p1v5ueoay62id2dcvlybimyavna98hkgvk3bd11muiqqw6xcouqofbyexi2baxbxibscygvf6wp9kfis9r79u8yz6ic6n1xn8qovqqrz9sf0zqyopl9wmk3ow4ogtmdfpkx43y5fftql4gyp',
                image: 'rb24kmkzpxguq9zw4j72f9mvsf521wev2etzu3vod75xsf4c762fewomv6sgi60355yzyz1576lu9hnmtlqqpo8126na2a8q4gjdh7qyggklqklfwaqjxsefnu0qehc6ihchfhk7upgd7lowyghi1zg422iq649o1ei8h7rj7g8qa4o80o0dtldcjg1yutget4jx4qvn750fyt2l0to4n72dw5c1pnptjurzq9zh1rfmwllkiyvd2szoewskbu1nj30sqdfk0zql7egj9pss5skjpll5kx28zqh7gnl6w6s4av64cvd5s3n6smk48hru6rl1wk7iflbwcx2u5iphfj4e0w3ku5kmpwgp4yqmc5d53zhlo3ljr4p8945x5007x20wt9jcx3ynaj4elyasxyzok0jj3n2eg0sndtumd5owx1exsucy1t67jc60xzd7pfq77tnt65a0z1utiq4c4gp1e6xdcwe749yvhlsl6dd6zd232jlppez9p7s8ou60elr1tzmsc8xxu0to38z3ejxvwgu9x7tusaamauszdb6hh3mmqnxnxw3d7nsrx42f3snqdv4i7glxpah760blged2h8i3lfqwijs56m1ole7bvsnfdeoutmzw2ysblaghdin7rusv44fktqzkj3sp92oux5cvoqflxjd8sqg2a7nfqqiuoy0knbwst626kni46tbm68d5ezn1gszcwepgvwu5g6cve8tlauxvckuj9hoqecuctfojtvpfis05akicatjo4yt8o3iy1pj142fhe14jgt2x43qdwfgb4qlv87hdnft0xryxjzuup3vun6ga243o2bsgpwzhqu9cgpzpllbrmtue33emrkq2l4sx4zaq29imymgs825vmqnoquu85rlra8eqklz5nqeh7lfmg5hmvy5papihm9jfanxak4v2qty9z2u293ha2f276s6zs9xjihqwz8l3zn5qd18qraij3xb7qg6yyzuuzohoxwnkvn4rkdei1ggnf07psagy',
                sort: 515625,
                administrativeAreaLevel1: 'y5j6osib1l0dp50wuukejkqpfdz5apnlaskm7zwj7qcyq4899d',
                administrativeAreaLevel2: '13q73w3xahh7mbigqucw90nvjcvrxf1m95opx8uo9lib8s2hjz',
                administrativeAreaLevel3: 'i3h8fv3g4qgh9sghdzi3d5t8gd791o4goy2y8yq7pf8qe7hf4e',
                administrativeAreas: { "foo" : "bar" },
                latitude: 658.52,
                longitude: 364.47,
                zoom: 9297082755,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: null,
                iso3166Alpha3: 'xn3',
                iso3166Numeric: '55w',
                customCode: 'syynst0d09',
                prefix: 'jp8sr',
                name: 'ybwr6npo2jypy21pnmc68mmyzxvkbjs8sakoznlntx5v0xlwib1x6qwsv8e63yibidxr8ob2qpnah03ro555cmq0qnknrazgo49tavtime9d32aav2naukaqm0kev7nhqk019cgrhiajs9e7jg1fhdf2ka1o1ma0inb5xb136abdobcasonc559fg1i6zgsucb5aywy0dihtprukh1f4dk727rk2gv3aj4bkt994amm14hosgh7ie7r1r2g7h8n',
                slug: 'frkcz9j9c47xbmqi3k5q53hkb3lp78z3us8vy784kqp7gulghtgp5hs8c1b5fm6r2iws45gyt5w7bzwgikiaagdfme7unyjca9ulkilt9975fzr1zrg69l3if8e3koa82sp0ipcfmu5nfmn4kbcwiuzq4ya5gy6sk42a5lt55f70u68jcw6eyvysg8ibhv6x8cvgvllqp60nevfag16vtb6x5y1o73nb4wtxd1ob1to0byd7m9has76xql2qrixidbaijm8j1y41cjgvf3zvrubmjk5car54r9504xbvtwidqoirdbv2fuzwqyzeonpngaxlz9aq573c4814k9joiaejmb3zyc6hkehuodkrrp5cexk1wuz7tmgiiaxkhnkyznrvjpzkobuuisjqtde9i6lv0g29xzbp83f7r8b4als98440ztv7xkmbf2dzozcid6evhlcl0vk9iy5cdwux31dentwk1fnt6b8ogjfjdsfkx94cyvv86tkf7yp6e6a4rxv8dbt3dtbsgxbrj0881hew2lvxrqzr643k9593sgy53ojvnmdrahzid9h3658f4bynhi7pi1aktjmwiu60hw8b6kf3z47ngfj1vlbc7eh210ofwglsvrupay9bdgi3zl4yr8kwgo7w37a0fuastdxygktsdv7c0z7o4irqbsuy2wingg4su1gbsuayglr1y9sfsl02e9trhtx3c06rqhnaievwi67iu5g0l4wxsd5v6sa7ng1veaj1t0l7ppvhfbq6a30sryj13we38iqc7eoxnr342lkck2ur4fhcxdu1c51r91xsud8kud2xe5ixf8ou5qu94677fwyngiqpdl5cfpi3k22ng2np70j2b95l2mb5jyu8mt2tdm7byftszvxxou21v3w18pzk632tpmsgwr3c6sns50x6vsfryy8smqrnjqb8qmr64vuigh68icu2sdas8g0n64pyykg3jmfuckc73gh0ciq8z7bmyzhjdt6kfk82s99mh82p2hmr',
                image: 'npdmogigf4ijbcyp0ju4ixwirah85br8orwzrkhg8gjfawhl60li9ix8a4bq3piayrgj8d58r0hjs4shm2xkf905hjz6pz5melsbrfwpuum76j3is65vnqvtd6k8uv3o70cbzhcpa9xqpd6cfcmwf4q1sf91ohmfz2nqiodxq1ev5bsnue7jqi7tnkee8zrn74e8q8k0betftv94cxlwukoi6tfc45ciwm7oo40ptopmr1j7u0uek0lrs5vnd37jml93ou1o9cewhxw13zk9o38qg1pikdnd27m4eeiipkwg6kjgck2gukj1gb9mmf1k6izhyb1zmvja3j1ycezifuq6po7adntff426ej8qssg3mxl32tly0j88fruqvm5qc9brst66dretes0rk9h9jj7dxogl6fazcj48w4jlv2y60pkqri1dwsjvaplspdqg40o8fr0ofu8wxwyqtc4q9ediz2elo3cstby2wc8kzip3tvkr6ygk4aiu9mq3ujftls6keo0k4s7up8a10cwxvgcd1jsv66m2fmtxzdsk5d1nsg2is6g5bglnfe24sdjod4jlb6aamqa500gqfsdudtn84tznv57prfo0c9zzb8i4cire1m26kp8z68pc0zou0ovu2frsnmrasrwq83ko71ik0oa3b165jkpssq1lobjqlunqe34po928umaiawlnzknsyjpxhyyzrerj83yiqoylvxpaquwa2fwgqv4y2o37eiyllhbbt2w8izdohovr9upogbemv9xk4tu8n5ppxgboc5bym5b002x8wh5oyvwok0iz990x1th3be09ohqmz0xejm01kt8h8i2p00lcc2i7qlbv0mheb34oyye2lznuomvzil6qbqrwwe7ej34jx2hvfk9q3d8m9tufmtfahd0orpaa6222zblutsage0vmtuh16fb1xte0mjzwenppdxcy3u4ntkljnj3btjhda3v5dyxep8ffm274l55few32gepi5o00jw6luvgablna',
                sort: 694141,
                administrativeAreaLevel1: 'sq6fh0gmrt00ma4dys47ja9wx3zyefep631skpdoaya9uqgthx',
                administrativeAreaLevel2: 'mk23ssuehm6s1h1448f6ox7sj0cfs32k7rr9dxsnspvbdtpw83',
                administrativeAreaLevel3: '6ueaqqclt95iq3e34b5nyrhdtgatg0e6vlwjxt0bcszdcy5jbr',
                administrativeAreas: { "foo" : "bar" },
                latitude: 936.21,
                longitude: 362.92,
                zoom: 5484243876,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                
                iso3166Alpha3: 'f50',
                iso3166Numeric: '549',
                customCode: 'l9mhus0zko',
                prefix: '3fc3e',
                name: 'vxrafjw7n7kxzfgtb3ntmh9nl8bj5myrzyj46h3ncspfpk0mxkwk6zsv2535xq6u67v1whm59hwz2t0v2ql1690v86jciqdphvhqt4tg4tinldphelvu07xsn9si4p9w1rgh9tgoivhf1jpjbr7330ubb1a1gla6hp1lenft790o0qqih3tyhuugasnrjt3jzyv3zrqythzzdhcujw3uuh2ymdkhvlqusl175rpy06zz5xyncsrgq49gfaodje1',
                slug: '8j4e7o3x1lit2lpq8ului6o4fj7h4xqk2xjbrppg11t1go7uwrhnak2ebauvd4et767vdrrosm11hs3xt896qoe1y8m9q3rwwjudvoe4bjfzyqnpoue87zki8z5enp64mm5hyfk9n0j883vmlj6r81s426g3rjr5vb0wvu0slvuz2qiojhwmsnr5mj972e7bezgg2jk8u3587lgvekxblxmjg2pzlv7qhtvx18j0soioytys2dud5f6mxxtk3x9m8j7rw82dadqrf7s5s6mjnd4d380kwr3ka4a1onwhi03yr4hzxyg5uzceq8w9jf78c2nhnigt704ffmmfyxiahk6ke7abosvhlhoqg634a96mpsoh91og16ojrtmaje0klshcsojogg8asbmxnz4sp0aml7o06y956rf8etg3rtcfecuabtev84pdq3zxguugegbhe9jvv9uobgtq4dpk5my819oj5nkfx8molne108hpgpe3v4szhc3leqsx0dqtfuj05kugdp9eoxhjbiq7vo5k5rycukijj217a90yfdint7bwnmj3zj4b5hw3gv6vksnjkpy44g3uh1sfqaciutf8vniscvlvaj7n5jgql7bwfq4lv78r3zzubco01r1qtrvkgxut7n4udkztghp6t1kemp4ts58x4m10mdqne0osmdxah1xm84jis4kxkwywhv2zdecakbzs0rsnaua59y8uq6liqpawh85cl5w0xows2j8njwg26au8o2vgcp0ytplhk0s5zjea4e9nnnjpl5fgdij59s8pjba9swc3grpo7cuj2viiv3tdxg5wmf34rgrg0nopdz0mo5dt7nxr1r70ebb7b2arrsmqcc1h3fwe7qaq0w1u3fu4iacvg2lnymacw9rnfhao5sbqt0t6dgs0vtcljxeyyj5eh5pgd5a62q8ote8jjzi6piauw1gen5y98xs7gvyhypz6dnymrv4rey61ifzss4y40rkke3rqo1zzp9cv3k51q7hy0ido',
                image: 'mok279vpe9jqw7kw4j09wtzo03bewylrlgpt0c5ap2ts79r4fbydi82jlukyqs0sw7ccsvt5tslyu2lqka780rzhh3maq9oc7rjhfyppvkbx5kxgwltfy8hp764qsoukozh48nq97itmcbjqvou3r8vyzooishkpp4bzb1wgcuduunv9nbvs4uyrkrbqjai1l0e26o6htsh5mito1h3r3t0cg9vd2ikm81doy31vtunr70pej8jj3je1ftqj5w27j2nwt1n73ybena64h6o6ejfmr1c6oqk5lod7ddy4nmvi33i0zsg3j784rkah724kqywa1v8ws90jeykepfngq4janzjnujbyd0n8pmb5vb0fob3lu75tcx1afpa9qd9yjbuk462y8zpx3xnd4atxlqnmyx6io68l0opig2u9a5wl5ir7vdpfz6kaifwe2q3lcf2kk9n8yj614xphjs6wef1x9mdh7bcitzxur61zdci74nnwbtcxigl4woxd1112rbl7hh37t4xxvqtw4eh57qu502b9wh9e5p1stq3w8l1rdo9yihpkdwz2yasp1w8bxp1f8l6cdz6v67dhogcrfvsqepkmq3aopj2cz4i57nwlbmc5fl7bcbdl7vxe62wyzq8agkddg7imkzq63gvc9elm1n5h9f55vmvlmfifltv7yxndjak28ssk7t9uavew2jmzxoim7tocn8dxehh42jzsevq5d9a92h8mli8hbppr07j49qjry8q1hl0vkq4jnl5pvcoa9m34ribkw2n17v5jz8kq510hbh5z9mwu4doqbqoh6e1ffwe6k8gvfqu689uxut6s18hdnyrsjztzxvr9wka9045tu8z1zk044x0jiynfheys5dxb745f12bq9vwu9ao75n0qr51mlqc2fg9oksbsqea5coebal3c50tpsztsaud3hazurff1q3x3inoj742uuufw5sebku0veyqe8f5xdu260rr6gdkj9du3k93od4uexoo80pys2you',
                sort: 526621,
                administrativeAreaLevel1: 'fp33aw7f7qcbntf3ft6pdum66ieug2zu19byp0tl7wxgz6r6sd',
                administrativeAreaLevel2: 'lpx5539uwl8lctt7tlbshyabsgu4lur7qiqxui7z3ziezd8cza',
                administrativeAreaLevel3: '9qn6jk8ik2v9voglyivpw9z3pq0pcx1fw35hr0jvci0aeu96ij',
                administrativeAreas: { "foo" : "bar" },
                latitude: 350.22,
                longitude: 412.36,
                zoom: 6592715430,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha2 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'gp',
                iso3166Alpha3: null,
                iso3166Numeric: 'pll',
                customCode: 'ntblcwuhld',
                prefix: '81cgk',
                name: '5ywv68ngfm1go82tfk3wwsjwrngy3a86qoagbr5w3rc2e0sl3xhn8tjxn6ia8v1ji2litoqffkvb3axlkyo9wyhfcznyf5nddyzs46r1isil9edpq5y78udg1bhwndxatksgdomv1ms6l2e4upqx7s7f3n21ibkve82ioecy44jstmmlxlswm9rtl8wc50dk9d7nj385c1qkizrdqwc88395qaozlqzt1c0fg8jm6xjxlrpxeu8j8fojnqlf4cz',
                slug: '66z876afs2v0ea9khxby7yttmpc0bbu9b84sedxss8134pzlpznjc9drqcbu06ofagkmznavjhrnibux91euwc0vfz340bjtbaq7hyskw6rc7gy6rhlo89wtb2dq3i3cfjmprll4519hfm43fou9he9nmi60n0vprw5x40f5d9gtkvx4hzv8zm77wnmd07peyh1u79gjifmsl2jknpknb14tx8yzeoeeym4fj4iayowdu1k94is7iu7dhjmtsxagmbnbqrzcpztcqz5u75xi6pqi1thyvru2li7jk1ghzqwdixyfge59xd36ne6dn99lyst2025xic31jdh1sa4kbjfj6p5g24vt00pzri3n4zglkmm2lb02uhfp8oxqiqimgc8zub0vr9yia2thttivi2ssnqwlpdav87ovdhtve3nrpcxfn1fn4pfjgxvkk868j14iw8b7mgy437ky5zvhfyxroaqiz453ydecen5andri0vmf90e16fjm2dz8jx8swuv7rkn1m3kg1395p392yf7endmbdj8lex9gl17kneekn6m7mecjx3hrvcex8sx3glkynrkpms5j6o5ppexq6tm3fak1ad5gowdch5z3m1jdraubherapvlmwqzvx43v0c6rukmluvg55lwyvsxecrukih6qad8pjcemnjnig7yfpkxa6o2gspo8d22i4fzjz6vclwow0oltq5uxerjlagbqku2h904234ioklirfk2v9kadp06q6xdieyd98f2ybkc89nit48w2hi7vonmeayhq3xnvahcsbg2fj7wkphq38u2b8zfw3uxfkgl2adgb95e131wvy1rrj37yayjycxkv9lowodcu9dbgvowp4u8y9j8n1dnj20f1o6n559ee3qah9u76h08swxqa9hgi4hd3962zq4q8h2cp6zxak5h72z6c3phma0xgkpd9551v9r2i7ltn245xmq842brqo9fnxoeee9b75ze3dr4s3nv9hac5jbbs2pgh6jlewuwg',
                image: 'yzjqu3o7jknlyc8ke5aw1hsg5sw1cm91qr6ibo9tnppfzwykuwdows2ecavzxcvfbf57makcqyhia3232ey7qc2hlyepgaa8v6mkroo3zz8vecxpbfdwggvk6xkqu7e4wzdral78yyahwqy40alk1f3924j5pm12qy3cs4gi1fhl5st74tdnwt61bw7duib0c74k02d6a8e1ind7og4n5bc0sxekb1nzn4fnu6xrwokbqxe91fqqjr2lhjhwgqzvo9xt04cltxyfd8uqmo9z7c8bpxrb588goqnk3k9oqdv5kabsk8t2fj6ebhrri1mlvtdf5r30bv6g3x0gse22fqdkqsbqecxyfrhwkll958g4kwevztesosjv49h6om90wfo8hiv7pf17zxiro59mftmmxk2spwd4bf2hifu6qkcajz85xrlo9fi8x755zjkfa4vg565klwozbeqt81ksqga9kcp788f23ku3navxe0zuqzkona1g3pb7b0pi902n068gvtedjcr1aisi2q5pv39nx4vcwvzgg3lkh1ohogbiv2zi2nojn1yohzpfog68u33ahqzfton5d2sx743wqo9385ay7exeiyaslfqvl8eudpio993za7x5xdzbex38bdg2h0rto7sfxirl3snoo04ctrz0gmbiix6er8c2qv9a7ey1ry60wgzricrwy88vrwe7hlcodb7ey0n02rwj2oavnuh65fjkfs4jg7xog1uxg144g35fnmz37a2fu9bw4s9onpspcb6ftk3g7im2gdl1wvrlymlbg929o7wpligbb1b06dku6tgybevhbl9m96o5wnrimr4q52j1ipq4oz1lhuk9dwjwj0qcebv7e0i6zhc6gb9t2pg3vcg51exji4x82ksq2399yjcv9ljchbsu5tqwxcx2f08k5lnw2t4qayt88s7yqpxhkh8041vmfnrejsjne2kaxrzx84ugt4qzs3k8nty04jokeqdt58lkdmyz7duwdjeymmzgm1ss',
                sort: 838910,
                administrativeAreaLevel1: 'l7yip4n69ugm34mhikfmw6j6y9dw2d7nq9d08jtcg5ehqte3pz',
                administrativeAreaLevel2: 'k9q268kfdq48qyoi1ipgv1pxzujxtkpjp9z2r4at47saf023hz',
                administrativeAreaLevel3: 'btloip3b7vige428rpowubzdw38c02ngsxwdb4z7gptl1xeko5',
                administrativeAreas: { "foo" : "bar" },
                latitude: 78.75,
                longitude: 964.91,
                zoom: 1529162565,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha3 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'y3',
                
                iso3166Numeric: 'zap',
                customCode: 'tv8x8bflnr',
                prefix: 'c8cl8',
                name: 'phrhsng4hfuvsz6smfy34smbdor0wuyt1fex48pijuj4flto0j8lbw37o1dc307zdwqyvyu6j2kl9v3adyxk3i02m4dh52gzlxa7wmulhbdar2zsptrgflwpzm2bgwjkaqxwxz1fe49th3z7dzra5y8ine622rsyxii5puto3pde6ylrzov4npp9boihevi5jqua6eg4jz2q3fphwcv7gdoeyq4x9ny1dpp0ysqt7epuwrj7djzmtwxgkkdnkic',
                slug: 'mpdpl79vpbpvnl23am72lk94nddmqc9r8e1yw5dqnrk8gsfe3ohdaqtrzyerbhg1ol1n3218xutlrwhckehx153fo0iwoj7szerhskmlenhx7apflwh837f0f6zy000r24sov3jkv4ymznskpfz9tuwb8vpi8j82hc7mfg8hkrs0gcu7qoo498h6ccfmukc2ygi5k2f8f16t7evdbmniq24qdny2zjg33qm160cp168alkgfdq7qx005qiz14qgl09wh61xgzhujq9e8l44kms1ft448593nx7wbnzxedax8rjp24hzdc18f97l6c5g2zcxaqrxwghx9vm1vxu27hsnihbe1gsxxed5w64rn5ooxl0ev2stcx38bldgfq8shfefyrjwsg6ojduhmc2d97sy17do2wyexs6tppln559dcrkxrn2ff1ktysl6yq89mgrt4egvbk0afa93y13njz5ml8clq1c8oda1lx6ra0jzfm8enlzt2dl6dxxihqa44uhdy8dlxkd7nleae7sm4u7cceyl3z4idzqz31qpz25w776srxc4hw3l1yhg1dbifjmzlysybi46frq7secgly77k9sfc72wdpqdnfy9z223wtboxg73vf15u7m42pmn0y6bfypgi0te1k616gofcbdn3gyx0jy4canlg4zst5wx6vt6mgn50zv7lden40dq2rdox8hg8eygwshjj8wcqopk558gw26wziiee6oxuj6hrs3r93drcw3qcdfwxpo5obsqgexfdz0ml0vzmj5r43e1bqaxhq5kafmyx3usthn0yp1gtuzhh8q7yu6i8w9c1znzpf1tij8272xmy2p9s8nx9euznhkpkqp18kiccosz2tyn1rqtlh5bmxmz1c0wjrizmi5fxw827qqmlm05jiz781n2yhlhya7ejumb18t6sq82hktvnebxwmdmc5gi29brpu5qqz06ivnkp4wt6hf4ybe4qzsx5semkursxspbzmwz2y8k6tziudk5676tn',
                image: 's3l46cll89cdu8o1tls4gjbwa4zv85v0skzvp209tpkxuykxposcuy9esg0pseaq9vn95isulxtbz9h3tul1v48syabaf6eztbyl2ycgvs175ite1hq1og7qgfqhje8arivs90w1wjejg1ffl72f2twia7lilk2qwtqo7xfjv8f45r23eynr98re9blq3abnheiqp4cwmev5o7y47hn3b99snkkocrkfgoq5ga9dgxcgg97ppbl1b3w2pv3wx1g0r6tf6v0mghw9ra825pp66pujsi50er7a12ynh9s5vrkjka4qkflohurkd2u5551g1i961h2ctdccwxxzb2h74aedk391tmomtz25fdmpsk3pihh1l6smmzvppgspcemy4s13rczbwk9o4egnwqwkgszb4vs6ez1vwfe29tuzuewx7w1rt6dw6fg0bohxiduq84c6vckz4i6vtdcyr77vb6hx3i70atc4n5y9ii46kbu4qfwoubi4j97ta7rzqtxuw1nu5yg0uf19bwowywikdm2q292vznjcswtavg13n2egisxvvx3tyh1s5auqdd909w873q10fpv1lkwkgk3tjoapfgorh228onlmj0lvhklf14zgzohg61jfxlh7xtaagcy36je4x6k4235fmxfu3n7h7pjayhrc6qggo9il2w5psadqyyiox359pyndvd95vvzonkimy8kdsxt2s89ob8iizpzehc8d8u75d01189fiat5iyi4qzrsab97eepb25itdfu1535id3m82nqi26l34eanuawgrypgb16xaqtlg8ry98zr04w274dlrcn6n3e8ttzfq59t9aertlxtl9kmqcsetvkpn36i913mvch7j1haon0n0npxe0qi2mfnocqfwxvd3uzcuirqs86uhe0hrc8x7d0mfjs0mop66pxoxyftw9t9kkqz8ixdop1eljhb88qldz6f23ppl6ubhynl4r5fjf99iyrniwjun8kfu7ieznc2cd7uw17iur4x0',
                sort: 855877,
                administrativeAreaLevel1: 'sdmtsvh7rj6wtcjxbmqydzc4n4svo5hgsguurv6dkhh3e7uh1k',
                administrativeAreaLevel2: 'fbr5cn6o2krx3q256smdxj90qlj2rmumdbqjkapnp32yy56jrh',
                administrativeAreaLevel3: 'gqtpwz58n456bb52qk15fdj2syiv1mwbqtgk8uesfo54k5pz5d',
                administrativeAreas: { "foo" : "bar" },
                latitude: 70.08,
                longitude: 724.62,
                zoom: 3092304229,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Alpha3 must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'fp',
                iso3166Alpha3: 'cc0',
                iso3166Numeric: null,
                customCode: 'xevy8womeg',
                prefix: 'qllw1',
                name: 'n5r6qrlmhehhaaph1r4korhtkxhueqrfelg9b0blsp0o2x4fvbjxl9wcrycjllmh069s30zi6mrttrrw7ufxgop85gwgdrmws0smu2wh2446mbcspcwmh1ck5gcuja3rmsq6p3g18stwf88o0qgsbleemlcfb473cunvy8x1s7eh9zq58d5cgefso4ep50ude3bwqsun3bxmpc51nz98r305nm8uccru9behz1tcj30d31k47cyegfvgy2p0cr0',
                slug: '5xz0bat0tfy1qq4nohhftwpoq7j48u9g20pi1o267l48fer7u2gkew2lewe89lvud99nz9f4zyewy2mp68ob8jobawp9j4zuau09gzkwh6ftlkd99p2y77b2j93wnswqevmawq2srvcla2g1ulsn5acn24srpq8bkk4hhfdg07o9x1p5s8nkkmjobmx98dwkr5ftrs9w7hsrfiintq44u9j6kzvm6bv3fvsdkv1czwh4tbh6o99xrxoxctkcdeph1eubih67skyw21esm3hlc35jz04ehcmg90t2vk4shipte8zf4dggetf4pyzui8kzi7ieotdvmp01feas563khqllfw65b5gizv7aeoc35elx5cvfzy6iha2xuhb650h0zw85whp3nz0iypgllry5nav2pysoj29p8ugn4ra6ltqj8tlx2nyfbcbmugnku26thnhd08x7ghbdjmjdfkzptktdjutljmxhgq62s81h0ndiygrmv10337lkw33n4dw813gcwmz15kvlz9u40me3tz94c0ynm0vfxohbaaz05rh43xdwwbue3ylpd4wid1f44jz86n7vpryeb8snca426zphaboee72qdh1c5t99vaql4l2sglfqcfjln8i5qrh6cdnaeis1evnt4dmu01xyjjper2msdzn8lh9wjbewcr80mskyxifbhjjmy5qnbbbqmyyv4tnmfogjdrbbw82p0s2kenwojsvuxf42rdl4skettxdarou56e7uyqrikcjv38z50er2hq3ljsxbrrvpxzjtcoqfz7gjlq8cmcld6p7btzgcnvb40n7tm2yo3uscpe4fkg57doc0jdj0dpoptg0p37nmenc6e2c697cdn0a3k3lbz0u2kzt8hus1k62myz88a4g7e4bk8n7stbqsfmeqznyra3cr0a6rm42luofk3g75y0nfk1v6k5r6vvc47gqm25vh5fjvkcazt9fh714xva5tot3ow8u4mteiavad5c0jtdul2mhvr1rck1he',
                image: '1fuj9yy0wfuc0utfvjeyfkcvnxqz1xya8terwmj0nep4yot9fuhl0mhfv9v1txgaztvyuhjmxp8371qk7g0dhxo8cv2ahcpw0p8m04cs8r57552aukiugitzr2gui2ijzuh3ohpn6j2enl44drqnajrlyfh2l9jhqfhe6fhyn8flqshc2er6fmu1ztpvpf2ekpo9w7e1dkt6x4ximzgecnq8w7w15hs1cl13gexipmsq0lwzurqkexjkeg3xy9ockfeb1p6b9tgs92l5nodih49rvpovrc6fs7ftgm2q27f4v5afmt4d52qzpwp2itj99eognb4agvvfh3te63utv02rtgp1eiuqse51hbvefizm9u1qhc5dktgaea24buttlewrqs4q7gk8vz1ut96y2ij02q15accz7uvrn2qpvqsksuexrp8b3rtei52ee1uycga0mv0eoo4yu5ff7wyvz25rfrr1koo2hjvg86rw438s5fbfcb66yj88qmn2g1b1j6c1k2lf9782fqsemu1bx3l8dsw8o62s6zn3e7u1qjufu8n7erggx1u8429tq7ef29mzc3ei9q7dxp075g30xzygyh4d7ukvz7f3834ai0syf0zii61oho0nbb5rkkwqhas95rfyaysmzahs0wj3eo8ka9ra0hdmu6g03y5v23h7xgqizsmzflt6eajxwxjmt9gcf3apxsmlwz41uuuhh6yfb782h9sfn7vxi551scrmhlnbcnaed9truwvjjq7te7ln7njrqobemjlehonjugff2eitti31cp2mhbwshffo6n79cys7sm17urfyti3kl9rn7b2e7qs5mowcxwp58gycj8dt8z7013hjmdy0grnpybeod1223xu667t6el091lhuqrtnlhvhkafzxnqh1qa6um3bocsgah21slbl0vf1ozy2qc6q4wlhorwzycbnd89qrrkqc7xprpfb7witjd1f3u163ulx1chb8x0hiy9nnrlrg3bfkupc8f93xndy',
                sort: 240549,
                administrativeAreaLevel1: 'yp7haa6xpdbhpj53ozony06q3b80bwa4kpdc6ri0p32scfr7z5',
                administrativeAreaLevel2: '8qwdb95690r90a9s2bzonhx9z2hxqiblbiua7rehxjcaacmsrv',
                administrativeAreaLevel3: '4484swuq2xjclpcyozasqizodg4i4qpa67vvq57mj52tx758pb',
                administrativeAreas: { "foo" : "bar" },
                latitude: 717.53,
                longitude: 371.58,
                zoom: 9932475800,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Numeric property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'p7',
                iso3166Alpha3: 'qmy',
                
                customCode: 'hqgf5lbfca',
                prefix: 'lyt4t',
                name: 'pdemcmtq2dvy7xbg693o6u68zxrewsjnmyu3x4z51ie1sfglhia674hok6q3mdh65v811moszvzfr49ihafd206sda1rrhsiayt5ezgyb2sozj43j79m9sf8erd3g6ku6zz7a93gpavhdr8fpeohebpx5ug77lft4at67gqkyc0fvg18ac1ivu6be44b39iggs6uxpvf0b5rcaclptwyh3e92pp1rt2b072x7ofm520c2t5cxlbh75ii0ucis02',
                slug: 'kpkt3klj8aigczvzccj82pmo8qmvwtcyt57q6jl7ye3jbtmihmlyb37827pg66hzq8pzee8zkexhmxil0pdvlrg5kw7w3bzgjcg52sxvuzqm8cyc5xi8weftjc01ce8hn924w58blhd327o4519jixkk7ymncg2q63vr7na1mlvahysc0hw624j1ungu7uaa381jp3xd5waju3y6643v7z40hnnvcv0pq0k62b010s59nn4qropg02e989i87ed2x4528pv4fc8o1bvxwtmu2s1i3t0qo4xb9thwwlbqbfavw4m26elpvvdnqxocj1jyamenn58fwfge1q1fwmc68u6xg2e6bzmi4zcrqpgt046zz02kd08hnu69ebls8a0b7mp8dgj8s4bqvsvc9wzd5gukguzpvpjk5ae86bftc222t885401ppvebnh1zlwi1laqmdq5tjcrx7gvci5ap9guj5yoh759qnlwjopyw8uy1tepag2sg08drr8ubr65l0pegqidawc36c9mtn84ns2mkiq39i9l0au62k34u0m9cb8hzjybh1cjnuh5fiej2lqkrwqxq8cevw2e1pbs8rmlsi1md6m243pfs3ollpbmoc1vt5qiv7a12wpteedgnoccxpanldhqu8tptusyrtex2268ww2vm308tuh93rq20tnf7cg2dptzpalmtpzz4f9nd8ybc2dhsmcr6500ms0tjnmy31sfdlc5cfevz4bdelaqz48etno9cgpa0s5u6ygyuz6du491htwcfh8zjg12gdibcjla0l56yxxj8p7vjwqrkmdqwcldm7zqxh9428xmwg2lk1paozgziwvu2g9863lyb2nkmpcu0zs4x95528douniqwc9epfie4s8bw4e657x8vf57fdtgtf1t3pspd4y47bmrms75um2k578ogl2xt7nt9y5d97251kf5gm7aywzg7wl3y7ghbwsyvhjxpdavopdxmubduqm5d2b0x44o3r7eafj4v39q2jz69',
                image: 'nz5g8yh28kxq95pvoe9qi0hcym1s3yfik0ryjyipftck82kue2ws1lkuusldu0h7pikzup34n5oaj4j276jgg416acnqr6763qlpkn65n3w1ka0chlwib6i2p2prpy6hksk7i9xu4bqggc915fonotoyigyzkzw2w8hsa0aaleqvdesgfhns0bdo8q9ck531gpji0c7y3332walbeipdc1iw0r5b4flu1hnczl7v76vnvlnmufljmvki41hzbaomo72smnkccx9mof4faal0qpa0hnijtt9z5v3y3ky289bgek5aiwcpca2ox16ouil7ilpm006mjkwitu68y98dgaafzp5v5t0ohd5dqb0y4h8eq8py49zn864xlvm2f0lez1t24c175gmy5g4poax0v6fm6c9uvy911wt6574aadumch6qq3pf9r6mqa9ojzl20on0l9co7ut9hen98xl846cn0gxk2ji5y9wftph6xx1d9r4as32xaujm3x4s71ziyyxbhcdzefcu4zszpv2dn3ebt3iixc7yvcohxbr9oqbvqm97bl96q25a4ohsxm7tastukwe7uvydjwrh2d0n8hwog6lc8m3ayoo8njf0fvahpcemxbmhpdqfsm7nytrwxtpnn7p1pvf4f58eyvrk1o9oe4k9wecdljjldx9ezb3jpixldtcyjuur4wbptka98f8tgh5syp7ugg7a3xl544jrcpex8gy5bw1sva51um21efryq7yl89qozemae42a4yxmwehhcryokugfe0drd366f7zbmd2b87ocpry8uveqfcpmoujla2lan7sedz7ms8y6ioncqsg18t7omogh19trnik0nauj14orxpovf2rgp0x2hzpmr641tf8r0xulcbk48yez556a9m0bzj2zt7ishxhmh7pzp43zwi7148gdhkfmmeloopr6hvjfmqlwb33wcglaj2m7h0lmoo0f6crzq481eiuuzh48b421xpk8blcdtgjxrct14uzs13ac',
                sort: 823883,
                administrativeAreaLevel1: 'bypadp0z5ab4vn3o5b7pep9zczeyghobw4s1lu47tzkmxfu7xz',
                administrativeAreaLevel2: 'tdt3dozul274dfvvert5twm8q6pehfrfuh42mtbb1blwqkx0aw',
                administrativeAreaLevel3: 'g6e0qnnbv4v4dx0wh84ofxy6il9a7ce2h7jkqluf6f8e2kq141',
                administrativeAreas: { "foo" : "bar" },
                latitude: 964.60,
                longitude: 84.73,
                zoom: 4424642670,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: '1m',
                iso3166Alpha3: 'jhx',
                iso3166Numeric: 'kgr',
                customCode: 'vnffnjr9e0',
                prefix: '7ofm9',
                name: null,
                slug: 'fves1ljy8ebw7pn0a6m9zwswtwr0x5nmu4m2u74qhl1p6e44k9jlyrzbg9panivtt10agdrjghr5m25yvvba7saf16gj13s7t92sy2c65jph5hcb03awr31duweh047qp0e109uvnfbrxpphd79z5asws2uxj1jya6g8821zfi6yp0obyt4n4amlvkd8q5xch5zkj6ie5rgy60kdo8tn12x96ruw8ass4kur54v04x6my2qpkwz05getgrhxx4ks6y85frac2eklhylxhpg52z5v3fy0v8bkvom0lvylntktyi8ahkxe952c1ypv86opwpig4f4nwoj0humflxhsw4fdd6rp72yfnl5gd81e4v7d95wkkow5ousximy0cxeng129ayu40uym5i3b4aqlf10os7v5wg2j7q6gzzuwxjaqoqk1yc2jbrk8ref2sgyaeq2robyje3mgo2m3smsvsmarznlj7jnyuo8k6a5ekjes1f78611i46v427gd3yi74iodf2k8yqmeqot03gyczcpsk2lssul7j7tozkqpcx2d2740ltajgrai171t2f2d9drg8rhztbercs61ztjvofm0ewssdbyeqqs6fit6p1worwfbmvic4vtedxswbsnme52dwbjspgk44bo0goyliqtw0dks7h4qqghp1myell34odelxy4gv8qeksi421tu6n1isl5uwgxygx8d97yycwjdd4cvzxrdbj327ohsxrrpccwm3tvq863167qeowr3fecvprezpxqg3kijupde77u4jwqmd57u0t67muaru2uw0y6i47h46w48j2o5r8541c4l27zxklcsfsnn5un7eo55emkw893lvjwyisrebhua1v6je1u5n7yv6bx8dc9tubwuqgncem7hvfvihljcjjukxrg6lrz00byq3bh1utukpsyakybuv0qh2a5p1iylnjhtrv1x52dkeidqdnsf6d3r2ur9f282l8rks888mm0xxqo5jaj61c0hidnv8izb',
                image: '0o3yw5sfk6ycpnrvkoida8lvsd3ipu47yfkyrcg1tmo2ag6eopgb983txg32t8x15v58vwg4vrtem1woxi62qa0efbmcd0jaa22xy0nysegx0u7nodipn57d9hzyblyztydir1kme2537xe4klkx0p2dvlrlpxpdwgwd0ky3xh4x1k8e143y0gzpzb6ua524a4flpht2f1xzi8bv3adykj3gisifesz71f5h8d721alnmeoj9jyj27tehuj6bie79bo8n5shx61m3e05s7adrk270zlvc71qahbzlegcvi1928xx6hef9hjrjy7ed1knsaxlrc9a7tk82ij0dw0yayv6846dafjh8ncd8o8a9sgumemz633lcvb30v9gsteswm5vjp2825o1g9zeezhfm5j38u3gjpdmrcfk67cny9b13fby0hvhqm3d9ijse7xrzlm5r82ej79f3wamfryjuiuougvdz0qza6oa0l245z2h4dbzzepa7mrqi3cmr7ogu383rg77w53slls4jpg6qeu3kri9r6x3gbs7zfbcgylxgpi4kvyenw62u88tt5p3aknf8opf63amxyc4d51k2ng8vopv8651xhepsdedji482f8qmmt8xvtbufhj94xdkczkl3devd5w6wtazsbubsm0v1q7dkn7c4ucz02jyyspepigioll3brw5gay2pw87dda98jvyj82a3c5pjx9vp5522qvhotbvmb99l21wr4iryb9j3fsi2cnl5y993q0ou8nwmq8di4px7ooghr2msdh3a9zhotsbvukspzqmka823osynj4g9628rumcfgnc5jy7bsw2peipvguwh4ynxeuv1lj0hltwdzdb5r9npvd5hwobrs5ncvjaf96h376zy0ja1axo91rc4isa17ht6xhjz4rlmch6rjpyl9oymtf8nn96ffn5l7v5mydvtgymqm7llmhro7d6jm5a4djjvl768oeey2wzqcxwcgv3qgt72g0i3g5u46y4fb4k96z',
                sort: 391973,
                administrativeAreaLevel1: 'fraf9ou5drggrjnbt7j5bist0w133qzgw03z3kududmgkra2ld',
                administrativeAreaLevel2: '3hf4ynup9y2o86c3wdu7scqux1utwvas9749ozp5dva74jwwyf',
                administrativeAreaLevel3: '7i6amiww8uzgr6r4baxs57lj8dozz6dlhjob4u5dh7y3sf70ha',
                administrativeAreas: { "foo" : "bar" },
                latitude: 795.19,
                longitude: 790.20,
                zoom: 2189494334,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountryName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'jg',
                iso3166Alpha3: 'jbm',
                iso3166Numeric: 'h97',
                customCode: 'nyif1apnsn',
                prefix: 'yu13l',
                
                slug: 'a2402g5mqwwg1qjom6c0rysk4gjbrfk28ddiuo3pzjv5i54gwyjpdgqs2mc6420ycnjlmtk92wgic6qjn3xvwvz2dqy7glxaw3ldrmxsf65i59iyaatya634w8h4a85lnr826ann2zk94akdsgmruhq7qps33mxaxr8c6t32trr0q9hv1spgtq2sc24axqbq6jl9b3ozrln3kqrc295cm34jmg6ulhzljrqv8zb76cah0t4vp62taxm9gdm5ujyzu42wmst7y0l58rffm3jrmyccyeo5wklatnmklp0myro8dr9c4o9zrcpfbameexrf1zf1dtdq25xcsc8kjfv0ipwmbmns1kn57ovqt5u2z3jwd5xtwtm0cjfxfpub56h64zha9l0cuk2wkmug53n5isyx3eltpq2fsc5866m8cv59fdkapgdc8d3wqaj4z8jcthe8ney7x0mk7iy9fs8plyo22zztl95wk7xvlq8crf02zqo3ywj64fl5dwu5y55imxz28taac6dfb15vu7j9aamx9pthcjn1ptm86zh2b69a1ou8zdtlkpwpxgabspxk7twozltufrmbnc86glf7yos1rsmahhu9fecke22c3eeus07lxmsom6bes9y4xt5f6jx4jdkbnygajbpwzgd7arcc75m9q1ipqtfwjd6uk72z51702zgso99mg5ksjdpvobqo67owqa9u2pvskqvgkyjaovszz7gqghzycaqxeeaudmxnvispsa5fjf6r6o44e8nb8c6clbojxhel020p2ha3cwycy3l9h3wmfdwpk0vklyci5l6djsdgxp05cad3b5cmuhhn5349qnb0g2hwlt36zwjaaojkpuscafncbwvjlnb7vzi4lvi1jhig57x48i40qf5nx5k7fwdgu7d73biml8nzd5veb0xm8tet8s37nn2x7pfawqq49p65gmcqqf685c3gauhklkvm6r7x9iiecij2dv51l4dxd92m89bkf5i53hjr0b7tt0bb7165',
                image: 'rk19svktyt97zfhhd6819bqpq3p4siufw9rk2qh20zxpny4klffvumdy3ranj76xnondx6q17s5f7cy7fhdfkr4wpaydido6c9sqpwyy44ebmgzff9xkonk0rk60w2yndaaq5kzv565grpdlfyvf7vfi3vkaso2eaud51y3zff1qa99w650jaig0nuj6jvz8kwrua0t62zry9disycq35vtyjojmm7m8jzhwk573svisecmpewokugwtz5wr5p5leb29b4qxx38uv7j43co9sdn4ovm2xfxfb3p4v0kq3z87svi6naoas0d23tpgyrekqjfchgplf2ph8ltide69p14ds28cv7ifdtqz83dbco46a1wojo8f90mc3f4c02cq1lds6cb5rmdnladuf68wg8inj3kt4xaj0gu3v7idpo6jsqip875b9b58yi7ispj4nt5o2lywv5xube0sat63zvvh0wj1mgdbu9dtbvx8w0nlfnb2n6aggi5z5yimw4wv1xp6jivpszyhugn95qbz7f8dw7981cq0bmfxj4hymhld5r5yrl0ft5ljlf6mdbyu87beuvuvy83d7aifhi6kfr4kunamukz49ob3kzj1nc6kwwa7jdnzg04sl96v6lf6fydymyx4xl76wlvze4t1rxhkmtvmi69d9h2stjthpxt0xh2zc6vcr28x3ngxmy4x3hugouh9nvspolglnjdckq0q4q1pyarw6a6im0dv7tnq72sk7td4d5hx4mbnzklrl4mbmym1vy8qwwge3zub44cfwrz4i0nxwqcxt9irubmceuzimtq30qm9izftab73wn7lhb4pywbghchtgyrn79fv137phrvq03zxsba2p7a2n5tyaqly2otayodisjqcepv2e2ztcj2szvylo2v4xb9ft5fa8ntw0jtluzeysbqic7sn5oj0355bveitsd7asvnjl5vj122sm2g9zfo8z1wy5hq3d9zjx5nqkv1wc7b6u4dcx88d206dxljohvfc',
                sort: 223849,
                administrativeAreaLevel1: '5urc32atpbnq705qthg3udh78f39n288bm7umrvjxm09cn8zzt',
                administrativeAreaLevel2: '842q77k72a4o2krfghth14ltg0vs8fqrsir2obx87p2i9ld7jl',
                administrativeAreaLevel3: 'pw6rquo0o8jpnxc4prpxhc5w41x1sizd0xvjm2y9z0zl7mdtvb',
                administrativeAreas: { "foo" : "bar" },
                latitude: 618.59,
                longitude: 981.15,
                zoom: 1229861039,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'gd',
                iso3166Alpha3: 'gfj',
                iso3166Numeric: '2q2',
                customCode: '2tt6ilfelz',
                prefix: 'ry8ph',
                name: 'hq703ooxavm505z3pf6kshc8b9bcs71rifjp6x86fg6shzbsrne5v6wx1ph7efeze9jiidyfck1kvfvkjdcwvr26o6cjzbvqbol1mfsipbex2q6qjo1q4e0l0qc4b16vl1p27qxemipxmlen0hu2g2o4l64j9kx8zrg4p3fi8g436xxicrqk4s52qi1p7zyzerp7b6m39jus876pf23cxlwxqss54ypjar9xg0zv3v3gzdnw8ugm2kbdk8ke6rp',
                slug: null,
                image: 'he154wwy5vlb7rg1j68qitw7iyhv45u38og3kye38z84oss8jyl78sboqbj4xlsbj78ifewbzqcn0vih7u6a21do0cdzl0jqjmgu9l9m2pwlkxzxff2cfr84lsegq8c9tp4tm317voy1cm8lqbrjaz4nh8rd4zm36s9qvm0dlqu5muilj1l0ktd5p9xqvbiqcl3etmazkw1vyvlvklcsua6mc35kal39fc1zhmw8yhmc0s327tsdymlmgfstbg17jkcbg788o0u6xxg59q66oiz6lclg49460l679kwl5si76j3vrci324au63p33s9qrgl3salfi2nhepbf7ef7vq0ff3nhtsziar9hv0dx2yx1m88v4wy5l9bewcyvvkqpbyz34ej7y55hyeglez3mateglsgtikxndmles0ffvmnq7nobmsae2nuvh7bhfubiapz3c11l098pd2glcmw8ojwmq7uj1cn2plf86cfzh8v6be2mawshdve41p67vd0450dprbkd24ozhwejk5nek3n7vj8eilem6rwnej4xvgi8pvaikc5mnl20u6aor6klyiwiip1du8ira2v1ahdjl7h3xhp11kzv2yoee6ak7o6cz6hu4fikernbvhqnykkh9k0uenur1ubjy8ppy8llnzusdd2bv70e0gr6kobjv3rjcpuqb1gbvoyni4zkf10o03ft8im4x2eny30edgawq6muxewdf8lxan0viatzakie3ccruhy63wsmeqhg3jrzssyckcjgor48l7iyjuqy4m027psgov2vz3jidpv1db8dz7pvedtzbzq0dyfwdkw4du8fbydz3j39ge8zhko2g1xlvvv8e1xgcz5ua1x2kblw5xlfj21at42gh2btxvasuohq9vgtfjt6d99ogd6pib3v5ncvxth5vud1ziy870zir2cs2xemcm4mitlqv1xarr03pzpi7t3hwq3xrp90dzlt8vijtkm3qke96vhud0qwj48xe81r2c94gfftsdb0',
                sort: 342127,
                administrativeAreaLevel1: '1gdh3y0t7y0lnqva67ip9mthxxg96j5qcrzx0ike51d7uq59on',
                administrativeAreaLevel2: 'urqqinzz3ghaquax95s8hlxuag8uws0f5diip4eqr8yhh8c7ir',
                administrativeAreaLevel3: 'g35gnsj7w9iajxdxu9neg7eh1tuxt489tvjt3o29fv43obpdly',
                administrativeAreas: { "foo" : "bar" },
                latitude: 611.66,
                longitude: 275.18,
                zoom: 3199191974,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'i6',
                iso3166Alpha3: 'ii3',
                iso3166Numeric: '4uf',
                customCode: '14nij6k31k',
                prefix: '0dp0u',
                name: 'v0iua7rxud89ekafg877vr985apzr88d58ztumb5odg4ywp8clio3np1exjjdnnqoyktsu4tfd4x7rlvzoshtpw8896s4mcgy3dwnx2irsqoyieh8kx8xnctxavwem2e8em4cmygn3vggxen4ds5htz8c6zekf6obu5qk8pn5swrxqsg5bln4eogl7ytv7tkcfv7lg2qwyazuoidjn6bjz6nu4ivzyqj8ux55m58kd6dtlkpach21sjz3paqnkc',
                
                image: '9f2450cet9rrffbgqzhvxruipuusrgcve326wyjezyqjfyhk9q6mwvvrltjzvcq0cbxxd67edyeqvb6wz062gelmo8tgegm3ysl9b8glvio2wy22fay74ygdyykq807uuifx0yqkt63nfn8y2fxbbyhrqmntf5ikiidvb2mo482xsvcd8v1a1ms56rfpljges2lp6tsf4rx80z9ldfepw9vdru6azzwpaivb27aaxlt3lk7ho8vjnp6hibkyrwa8bf27x9ffnrz437ws5n77p3zl50wvnmqxh7exd4fcscym83r3xjnmzcfb2i6vul6hwwlrxkhy8ck031dmzqynmr4gkze73jqqnep89cwmfrrftkt644ofj76css9ar1xyny31e0a6mx3yrb0n68pa92zc0vlmupjkmmnvhybe1avanngzy4s4q4zwjadgbjpxws0ip4a28xny1gg8wgcy7rip55jdmsaibmdet02i1f90p85o2w6glnj7gs0mfm27agvqqaggdtlqd78g8vjfcfrfle8hm89j4sgztwwbw1fownh8ql9lurz9sa0ksd3eqgwuq7ncmeht7a9ujstjc5u2k60x759d0foynoslvtjkeym261bj06lnluyebo7a2boafzn8o90oprhye0yefp709zfr050bnaxhjvbj483mbny9qczm4ua4a5s5mtpdf78se3ux593eme6s24wdzfadof5on9pjtg8jswaeu5b56n4ebubgnl7rlbshhvcp26914img1foyx63mofp70vljztmoutrgahtlrhdx308pyeo2dco4undnh1mi06v0w7mdcd5jl4mq1syeu0estohme1ljn6s6cf6a51ca82tqy8k8rd9xwcexb0bdi1bfy4b55srnu2nh10mdjabtghqham5cs06bjd8m1vy0nemnug9fuojb5jo29kf7hafyxzrkubf8f5jyt75hfvwt3ddqxmuqwg9vwmi8fxmcky9wrtit2zorcuxaqf8jca7w',
                sort: 824878,
                administrativeAreaLevel1: 'r3ydndjh2tic6pohyh9cvpg8v5r662b4mlywpe0ga3aoskoz2d',
                administrativeAreaLevel2: '9iroqy0k3gyckvofittalzm0fyuc1ueczkube31v3pprxi5hmo',
                administrativeAreaLevel3: '3rf9fy20k8qdkbwdvi3t8wn831z9e2n0zsx7mljfjxijlbfbzd',
                administrativeAreas: { "foo" : "bar" },
                latitude: 205.43,
                longitude: 839.66,
                zoom: 2103278330,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: '3e',
                iso3166Alpha3: '1sb',
                iso3166Numeric: 'lqa',
                customCode: 'kyka5a8qnv',
                prefix: '22znd',
                name: 'l1l61lhb2nb1kspwh04nyo9xw0f4585bygd8nojh62uyyvqj45fg9urc1mdg45ta3is52ncg1kar6kd2v8iayguhh4vusa3nvsrujomilf9ci53g6uvz03amlw636gxnodxg69n63boledy2zdtleuv0gcka7b7yg3bz42rv8o9yskv6hd9e58h5rk9pul53hvw3l0x21sglbn19bk73nqfm124egd2ytm28kr71e7xhexcqospc84xjt6cvf30',
                slug: '1sugdwiuovpjnj79uti25jca8z38w5zucc5usinni1w9a91btir9rolucc5r5rnce7mtifcryiurzzpgxj9azhkl57bcwkjrkq80q3dm4vntbrxgy5md6ql314qiwvt8nph9ioz9u4ylstu3h9kyieqeq4bwp9cezm9oszndki1muubyyzan5gnny5ef6yc6st7e8y4xkruzqirs67burus2bgnk5w57sxz1u2qrxxbs7jjo5otq5cny2ipbqmkzumjiqzwkodfaoqt0ehqcmacx0trxgsc0efnqtg97soqzjbsygov8hi3aur9wnut2kblnnsy67sekub4d9kaw5us627248vk0lppzsnchv7vbjpmj7mlqi6yz06i9d0fs7kgvtc1vapmdqzzb3gw7dq9aoz5fg2gif72l38bktsp9lhbvayodmiivekod9dkikiy85jhyhs9htjmi00q31hf8wy1kt0o7zcycjteo3q0i0s1e0lfmdlivid2d1uxbuss62mfpegrrkhh1juf25om99cuxb8i8oifjnxi49dshiquu4htokpvwdpbb2chojgq3xfsccy0may35sudksrexh441fgn9x7a2caq80m0p9k63d6z9srx5y1v6qq9ae851cs5motc8zle9gkqd11l9ah5100u04c4w5fcmwwlrn9i4chayn8rd36feobjhsvx76c11y5akyb31dn1p7jfdxiy3dzt94c53joquw6opr58aatowgz311uhxj76h20sn8a6hnfrq3b6jsqik5xw2afk7i94u4zybvczn4wtpt62dhr6q6p6pkhyrrzsyzjqo9zu2x36ycgxl996om4e1qluhfx6ih318zp9jx7qrneodnoxyfnyzm974521clrgrm9ajpos5djazn17j0c6wr30itwk46l3uuublj5p5jeca56di1s8cxf6vjacmx0zeqeagc1ysic1yw53sio475x8lrvgzt99fzxoy8bjf1hkt8tgmbimn1d0myazw',
                image: 'ss67rd63kruahi0fpiav9txg9do34v2txggkdvo70e6mn9b063tzq7sfaqjvjz39vuzxj4odvgvpqvz6lqbdnicdm2gm9fra2coh5r3vgawx227y0hu2rz11sec1vinohobp77rlzpjs3d7ggqu2iormeo2aek01twrbs1x66pl8u786p7ftjtztwdqzsh08pd2fsvoav8inurnb7b5n0gbzoh2y75pdqujjazpgf6pd043su0aqjx2pqf05oqahmul696lrk622ukl1da65xtzi5t44tvn0zkfncmd5pu7r5g2ez63elvg32w8viz732utlp4m2yux9xhslud98gehhsekp5byywchqtgv38r6ho3aug1q1yhnaaqtunwtiz8293f4gwwkvyzvgcw1uiqcs0v57wr140365eatepc25b0c389eove59q1kz13qq7xtpe7uwazs8oi7n61hpbp5fi8jijv01lla7kx3gppgzslptmrtc390ro9vd8dvw12ml3f7a9kput2v15jpdxlock0gta0qr9xh203302mu8kwuge7ljkmu0cuhlqw8dvmkirxh2ui10idbokgfdi44zdfqk5rdv6r18fm1ogkzru2mbbwbmbpflt9zc7me30kiljr6npdemq8ddt2ryr3xjpw3knc3qemqfjwzv03nqwv6963u5a3t143i0fd9omjq3j9mjlrqwzkoy51hbaxqashoc7ulgklxvkpvcq8q4trcgmqlfah60eoaggvpgnltd1cj1mn30t4pz9cwkcvwpzmzr79h2pez6krnjehyb94bfufataxwrcsbcm1batkeq1n8714u9gtnj9p3wz98w9t1ohk7gurvrngiv126bib7a8ttn0bq3sjndh4ysreix5a69eu2efrn4bk3nnl3gidn7qp3138771fpm6hqxjyaksryb2ora73qkzewjpacocx4eok3ma7ww1fscn92q45vxz5hwd5okh3ogb06npwpatani0vdya6ffd3zh',
                sort: null,
                administrativeAreaLevel1: 's02if81y2bj5i11gppfk3a0ga5b4bhib8con6lm2q1uy8s4y5z',
                administrativeAreaLevel2: '1bytvr694bisjnikoxzq0knw1omogodg08r8s417wc5ymksm0n',
                administrativeAreaLevel3: 'k4hccr9kl4lehtsc0ktbgcr6w1ecfg2ikygz2nmd8htf7xuoga',
                administrativeAreas: { "foo" : "bar" },
                latitude: 979.20,
                longitude: 590.08,
                zoom: 7957805839,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySort must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/country - Got 400 Conflict, CountrySort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'iz',
                iso3166Alpha3: '3hq',
                iso3166Numeric: 'c9s',
                customCode: 'g6g0wy8rka',
                prefix: 'ux813',
                name: 'b9riekdjjk5nxpqnh90qetazx9uw2cyqaofqo4li3ihz6veq31rqh64ydbr9z2d9f8lzzpuzape9gnhwc4nrsfli6chdfbxsmmu2rblofdf0awvj98inv7o0plascox25rkgexjrxlub1orbb5z9jjts7c8k9g0g1nw27e38atwu4mm80gm0z86kq3ur90xrdxfauedgg3ut1afwgnzq7c48wgehrjt5sl8dhr444qyf5gyp54bavnyvge61xt2',
                slug: 'kchgcpz2dqfexssh3h7me966qrmvjfki3r6oqn0bv8soiybihp24mlhuk0qpc4eyg2o8n686ij24hef1xxmvhuu4ce9x6n71kgirtxudl6vza1n6tddqrvzrm2okahe26pc26dwsixi2j46uuco1nto86js0ir378vtfnym1of6fuqwlrlqlr1pazlv7zwc4h1pg6sywlr9ez1ezjqjismp7h3mdo6p909mzsft4k34yk7ki9itsggiaq6rsxwx4fcxoth2bztr38r417xpmb8nb8zckjgvraxrhtlntrz4rsou11cguvplv118ge4ddah1dbq85nshjta1bqgi7a1sjfeja1zb9807z2lcska5qxpd3c4acuu5wypfii88klpcq6cu40go2287vp9bghufq3z4k4fg0qbj1ra15kmw5fuxq9q0q2b0dg3oteng4t89hytncqchrpclb9g9st6vvso2wl0fpv5n06j6jqpjhmynkzq84m5bkd5j6pdmykqvvfeq1ojk26smzdcg7w5lp9j9fdnrs7x81qyyiqutv824zxb0oc2rgewi4hx3yiuug29c6q45kbfvr0dkhcahjpyu1mpkpga0x1demf9x36b6qhrsycowquo6iwkz2bgpp4p8a0esmtic1lrayo66pdh09y4ij1ns2dv7fu890eewa95v1cg3uzhzhkguvz5ogvnafow9w968q13kg970a0apqaydjrx94s2cyb9ut42xj1du4x6hc9xw4yybg5gvqhi7dwrzir4gjlnq13jaehqjnyjm571122l43ti3xnfn73yyhm7yd5isswlepispakiakaelodgzcdi0odpuou0kzcy8sr6bgymasosrrvfegj034bppn7g7u9v7rnd3y59kubj8ykaa3g30vqelo6od8xvxhio94apm9hd1f4ib1s3f97xbtzhatm1fhkwvi4ekmzwmd0j7dlkurb1wpe1vkvnwggm58bmfhkbz0x83f3p4hs7tp86je9kke',
                image: 'ruemcoe40gnxbi3nzl74erat8r0xml92qsj042bd0p6u3xwfsnxekvb342wxkv3d8m2bfbk1i80licg1ezwl70lunyinrcz6gzvcpzbm8zei963yy5771l54f6358xswb58y1rbcmq4x6ajl1o7cqeyrfy499p07ow5yiko8hn8u9a4w7b9ol84onhjx9axg6pg8j7jhaoebpxxhz5qxgojcyartjidp87wncb68yjwdbqk143l3a4f1966rda61xfu0mbcp6l3sy9o9xw2bs2uasluvn7evofgv367z2xbr655p3b1lq7j7zq7k5633wkr21tb3bfngfpmgzdb84uswlqjxu6avwensinoz1qia7xhmiovj3znftugovflq0s4tjeqz7j81zzsqc4u1dfcf5beh7jv9llzkjflakkfy3mvdhihh79wu6306otc8prsm1fjgxotzvkyy14clazrbhh413qip9ulr06ygnvt7b2t0elg31dn89hfrw7capbgvo1jlw1coy63hj7wtdb4e951e5oxp6lux3rnd82npp3de6wx4ve5bww5ce06337danqwobm3hu7jin2opfpidu2j7enfl93h6r4s9jqv4tog0ey3yib50ggm6wcyeiaiu0w1nzu8gqiwwhov65dkjbpigo4lmnjnc1kk49d78llx08khjtcloyt1tlqjhqom3jb5z8g3xi1bd9rukuk5hpyizdxb2blmkshe7thrt81dmvkbyi4hhljbgi4ornstnm2sdwrt6x1dqxka5lbjj8680wrzw0zk05y407f882vs5v6lm2pjkz2zecf7yrhegqgryiziedy7p3rg6ywbu7nb9gdif5lmcd9rztz5mzn8l7101o8y68zeta50zx0dg5agvy5asbxsisic6p5iu6a44ijlo0mj695xug5ckywl4vomtqrnzizh844lm0sxg2orka509d0zzt3r74qxxzw1qndewtgjjnqj3vrir47hvvwezo708mrctjhps',
                
                administrativeAreaLevel1: 'v5a8ggviyj0p2exedx2pdhzerirdpx4x02kmppv0khqqrpyi65',
                administrativeAreaLevel2: 'xgx9fia53ovykpkva05nc0ptcwv8u1e8oxg6s6t2niqocb720j',
                administrativeAreaLevel3: 'dv0di1cchq93kfveugf5jhawsbnz9meksldsu0ysfbtfjcxyp7',
                administrativeAreas: { "foo" : "bar" },
                latitude: 183.67,
                longitude: 38.12,
                zoom: 8245096173,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySort must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'z12p94hl1kx3wc12ksizydjqyunum995hmpnb',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'tl',
                iso3166Alpha3: 'o3x',
                iso3166Numeric: '0a0',
                customCode: 'ezqaot3t8k',
                prefix: 'z5zu0',
                name: 'unwqd2c3aecnzs5jzyhu77qgdtgvvj3l7d1ilylwlnvvyimkuldtvk4sb4w96uv2y0pczafo9sn6ssx6nnsdrg5yate81bpb83i9ptg4rq4rxk67qckyw7m2zv4dfqkcxbcs3hanvsafejmreypzc0jgrk7lmltplwmj4u4jasnl50bkreox65rjs8yret3p5zx1fenmfhtzmmhot8wa1x5clvqucdm42xwh0lq4raii629c3wbqaee5d8394x4',
                slug: 'vjshiqan5wmat22def8fyxbqaxg3inmokzq9gi8kk0yuakiusoiprw2k1tw3u49rjzpqdqfnen76y6kd4b5lab0uc58je2jl8a08oimtot087rk6qs2qkayn5e9wgvpph5l7zz4quxgfdfdio4axc9snz4wtr0phny5x2o75jwdb5qp1bl62jvbh5vi2hytj6x8rvi3kk1h9w56xwhjozpn16fxhyluy4134eavivcoh2mbfzykebvswijzs835nptvx3lqurir2ppael25o2mw3xbcp7fdhd0dhok0lmfqse2fqqf32o0o2xj4zmqq3732mgm1sa5mzd51dpa5w3wehfw9h5gqza0lzrekf647s0bctx9v17dkzr5t185okp3f487uu8ms34orzmxa86cldnjkyb7nntqbmcbtsbfsublphucos1l54kaoxutvwmvqzx75eu80qrg7u388lrm5koicchcvj98p5fwkyu2x0zdj3k4hx01i3dedc0j38x0v5p6hb6jbnb3byvk0kuhn0wutzymp0xan40b7c64ph6cw0k6r1b88gu5a5fn1npiiyq8ayg8ygmrfg4vk7n9ujrnylulharigkywdh5neu7o4d7rpl6b0k1d2wh8ybrpdyouqzvfkse4hiwza7mdo1rzlwez03qu6hxu2c07xn18w4i85iot8c0jjg9ubhc2vy5e02sy6do9jf0saf9pjndi6f6m77shd6y8kxv7d8ji8f3v57igt9vu1h2w2votbq9ja951tw0dydipfxal0v7t7pi0viqzxku7h6bnizuisgenuysezm57swiwmfebh1wtwrhx9ju59mchil39uwms8trj45s4r28gx2mcxifthf2fpb8oua6cuyl1dghrwtkjc41nohmwp0ctc8750qks9rrj9xa3l056i9osr9tyrnqjdxj1wf81je79zbtvbyfesnej5j22y56ne0l2xexlpeozkp40r4hyegtleoppzze4929k2xumkem4wg',
                image: 'vfwae3eurh3qn7cqwd38waior5p5mxy4qsz7gsr8vuyfnkxvzyxwwfei90q4rt2bdymdmambd5989ahd5s8i9eeo7r1ejjt34qjpralhqwnbum3wz6h0530av7f3sze92vzk9twsw5q4rlv6udfsrfurxe5sxysaibi8dtb06ljiofg61s3omr6cj1pi0g5fcx6kqp1tj5kapxcdafnj6nt9d67qiegk6cj92gmgwul0k6kfqnjwgak6dg2ma69f2i8bjbge3lzszk9k4z4vu69tbowncper6nkw7nayqsb3evpuf7tzrrufse55bnncra1f707xbe2r3ip7xcldur76czbuk56egs1ugw69e515bclv0qwbfdqwvg0a3he84b75csyo6499shwrdhtzr9a4z2jc0lqygrj7oqb38lflf7d0j55c8c4x62cig2rkjhjxrybg88lw662rh2kkym86zv0bkbcnw8kw70jcch9sfmangoc6ln81yz8s5q593x9kfoly2noihxas9oifuhlxdv3418yujsiyrom084nno30rwxxmyt5xcitwjabu2xklei8jsl5m6dd9z3u54yvtnht7ppkagqpeevskcftyla0ew2xpl3cuj0hecgioqqxlv3czi0bwsbd5hhu6b088y9me6a7ns951wym1d1oog3p06nhvnc0uy1hfmlze0sm0a49jnds4584idxckm9ku0pdp73g5id0xvl7ddv6f0bgvb5wrsu12be66elnqgd6yeeuhxuiobcmv252xxlltkmybw0y8dgsfhbqy3pcdb85vwjy5dhir93sy23g1if2hxhrh6df25um70ng5wnhx3ccr5pro82z1zujkbeff3jzkhs565ffoj5wyokmlo922hjlad8nukdr0f7e9k1xcoi7e6z1uhc0dg87lbtk5w1mtf16x8ek70n2wpzslvbdxf5z2vh7td9jt49r7v4kgq7hr841qfmfm8i7vfokjcyr82gnosve9revbyugp',
                sort: 979146,
                administrativeAreaLevel1: '1hqmr4e684wohnixvq7eirm6wbwc9id2s10qgt247fmys4b32r',
                administrativeAreaLevel2: 'owwhay3q5t45sd9xhurr269u6viulaflut3i6xvwhmf7nr26lj',
                administrativeAreaLevel3: 'g0yyb3wwjfu6nj507rkpjfq76xs1w72oybfqgk1darkgeyo0ag',
                administrativeAreas: { "foo" : "bar" },
                latitude: 898.46,
                longitude: 603.33,
                zoom: 1978347740,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: 'fkmeokxaeq9t1tm5b35nvifylgp52hp6k2vcb',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'hs',
                iso3166Alpha3: 'h7p',
                iso3166Numeric: '98o',
                customCode: 'xnr350xaer',
                prefix: 'an75w',
                name: 'wfh0zhqiku8klhwurlv9f55gch844j6jzag9zj8f4svr8d8wov3ja4hm8hky8jhmu9xsuv8jj1gjprj1ouibx2cp4ued2ulimrbq19n54gjt3dp9co1coxyajz80bopn490ofnq7dcs0dunlw9gssuks7d0tf0uncn2rzp6iqsghdaoecxu3g306l02x3dlzaq2ga7n2ux89adx8jgxh8uczugbw21r4jjyd5fi379zrp3ntavzu3vlon58ik3w',
                slug: 'z2r95x419n5xqy7vi9alamjdznseb2qfqpunfz2mllbqnyug6smvjcdz772ccm5disgp3vmvjgqqk6rgnj47j6kzte239z4raqir6tze52y9orwoatacrmge9trlykqp4gbzuahi499ez4ye5xsnm0x0kiqa8xtlp3t52tk66ncwc6hrzu6nb1un5wb7mgba8fvi4ri0ef0jkw71dgcfra9k0qnjvavwl3hq3tbnj7oo1h6w3qfsdqy3q16uj9desgjxq80d7lna2ibbdnou49enitoaod77zbt8nl4hx79frws2yvzowkll3zi3qf1lg2mn0pd6ejxor6k4dst4a75r7g4qd8vrlqfp8483sqlsa9mg5yjuzxuqadm2l9cygj3uhjnoikhen5gdtcnudftw29z4zoneuj97fi541gv2f4996j80t52rgnovbwbtyp64h5q3vlef5r7881sxb9ll73naec6mx0kf4t6jz11hd3djzfmw5jc14n8sh03rua8kvz84yo2ran77z39bo10w0rl6rwlcezm8gfub2r7ongskyqb4dq6j7ujjuiywk2v0ib13finqg9857u5t12yhqplixakbu85v5ukr4bryd77dyx69rak9x8k9er9s5wlnzx8k3vm2ksahb5o1dmbiqjmqiam9gqrjl0ejirawiaeh7xlefzvdh4hldtpez7z5suhug3lmudfne1sn8jfvxscjcx2ojezozkn171da3q7k46gf6o20vsy8eag709mws34hou3x0inma6uua48eve4qutt8d796m1i34wvg27mz3o8h1zt0f2xtfaokzbetgldjwsr9wx5pbvxa49goz7b08oplbyjmo2412gphu3mwkresaieysd5mfikmc6fy5zbxkc2x1uo49jojr7w0wz68p9nacicecs3nzexy2aw9dtu6t0vjiht0199f2v8euhnw9a54f8vbc7mdqazglxv6ck45lokw6t1zluxo4d0v0a37lo25i0tib6fa',
                image: 'bk17bs0ypp4xb0nfq7e7whfdttqnhrs87gl0hn86aal4k3q0i4a970b0m02n1ktxuqytd6jpovbz1e65e9mtjc4mu2ip0nj1csj702owhftvb6p6c7vb6wykkeafb9auot8iipi11nokjfkex6h96vxzxsu0f1pg2b8xsgaxo4471cr0rtr4duzzetj4wk98udduu9mo51m3vbykbzclz44wqypl6y0hmpe781muwzk5h1g26x7ha7im9ada944chr4egj5r02vctagkx7xmkjirnvgzb6uzy2pkti9gt4toqg2t0zq3g2380u6psjy9pynkhk0svz4sapr26tdkqhdyy6dvgmwg32s41u1tyobj8ljntnve92yg9klu97971zibvuqto5n56awwk9weon87of7y0js14wqaa2q6zdgjyu0rxy7nx3sdnnwxt83bn641mnkdodcjf4vj0euk3xtgupp69pcu4eag2dxx8waxb9kkg3krosuhllje9wb91dpa5lpg24wkxoffwgoryapyielalco76n6ceo4uxhwpfb1rkoqv6qzpiisd342mxu0jo79w66i11r7jo4vx4ruginrrbjyulrbssjf9bz5l18dcmd1k21342oap89ssar0m19bt3akwi44ypia8h96okw1l53kztcl8jgiop5o6vtbrqo3dlpuq23xxh6ocvpbudlbzu1dl6ugodlzwlm76k258sen3mdzkrozoap4z02tnmnar6lo759gy2n4b55mmhiy9glexxfjhkklh60n14cvpfv1wrf4hwkjt4zct52jg6eyjrhcjryzzfnoemrjoyj2q97ohbvvs6bw0cpw7iso6pc39lzk4v78rp11fh8zb3epn9wmn54ilvax59d21elds72hf9mwn3hf414hj9uyowxcjthame57spgixf5ypjqbyjcbm4ruvugkejk3ptrq61b0pxqs0mqudwqkrsxj6xvj84kh75d697ih02nl2em7bnwrjr5t9e9or',
                sort: 366222,
                administrativeAreaLevel1: 's5ialxe9hauf0ma2lovyf4395f4srbfp708iwo62d0d3yge74e',
                administrativeAreaLevel2: 'kjch7oz7wde463npq9m3inzxymgqypmd3wgio6kjqgwyd6uz1k',
                administrativeAreaLevel3: 'jvk0xb3sj9i51znfwx3isl5lidkhdrgy8lbbijnt3eqpmnoqce',
                administrativeAreas: { "foo" : "bar" },
                latitude: 750.96,
                longitude: 864.40,
                zoom: 2633296302,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryCommonId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: 'fwbg1j0b2exyh8b736pz4503bexb5g16ijmu3',
                iso3166Alpha2: 'ra',
                iso3166Alpha3: 'u5s',
                iso3166Numeric: 'tvb',
                customCode: 'j6o2ci2klt',
                prefix: '4rzhf',
                name: 'mi79egwa22tb2l1ktq02c7gt27inxu72gruixkh4q65zg3dglw69f39mnnysim4hq9w3mmtd4llayw32oqaipm3mrzqdlsckmcrhvpvd5px2fjp10t9mw24lilpkgytv03s4jdgwq4kmvysj0se6rdjd4w4isujvx9t236z4ueyr1naz8czluyr9z3tthc6lxqbgo3dszi4bib171out4139qjpzmjlgb3zrgmkf1bhptjm5v35lpu9fkqmokp3',
                slug: 'qldn6klnxokpf1y0kr030s6rzh4lmg9wiqv7orjpyshja4ksq7exct83odh6owg14yjz6y8clcxkcs01la4m95f9az6nlqijr5sa4tnvr0kac8kdzxycjacmombslsu18jfv8pjritrowjrit8qhivjej3myyj6goe06biya48i2tvlado278nb31rvszq6vmjne1pxg3mcbpeh5ryuvkbw4sd4eii7cdrqp0o2j663ycuyo13mgcbze1pje2e4v0hes0b0djthy81lczeizhzzd6to31rnf9me1pxmgundrsp1m9urrl987hkxk6qi8nikrxzd8p82qemk9hfn24adkwg9n5bjrya8cie1q3glde4zajmyqgt9yvt2regtn1w2g3m3278wv2ogjkx1y18vgl8xkfu77kdsm6bb00nu7af23ybxthp3jarx0ogyef0vz7kotillrnervw0i0svdiharqx483unlt5fz9q9tjewxbhjl4xuxjgoovw9n1qwpez4tu8j2oz3h19poebflxhqmfjteknh4bq91tsj7qfeuaq06srcaprypf9s1zkk5bnhgv7be91p18s1q0yp3zabbn8a2eppx6l9qfkhwgw0f03tq8el0vno3asae5fgt2n6vw3u5jspcwt7ync61m7dl7oxh43nv59413742y0opup338kf2oulltkb2pg8ag291hno6xq06zdvi6qafyqjeaklok2v1qp06jxeeh5nh8rp0zulzeuqjmp9p0aclqw441e5i8pnw75gh3gq53v7l7r3swtbkca0ebr6o87nh0jh1usrphywj3go5jh3gi77c5p5ouxj9yvx0p4ag2dtpm8sftjccegyb9kp5rwba1s2s8ykioyn4rs843npotcj72f7wwo13v50mecswwj6ode7cp4e8n7k3zgzkjez58j9ubmb9mqprljf3hu7f2akf1z1izdaofbmt6rlimcprty030oaknvzm9m624b70u8jtzxvumul5m7cr3',
                image: '537fg589ehixpxeiz1qnjrv35tkohn4pw8g3vywbfj13wjniknigtsjw38o0pyzvl5fqpra7hzbg64zzy7q8u4pxq5s8htb90uinniy1yqewlv52p35591hxeklr2ad0eqq2y9q1e98q5qnqqpt2oh07442vqsj92hycz8k7y5e9j2jjk4f5z7n2m887au5lp6svr8ogln6r0l1ujxzu7sf4olhpbgjm06cnjvnbf98bhkdia41obeu1uqelfynqes573pjyfyq0cd5r9lxvz3iikbpd44lmyqqd1h15cq2eecv1qsa1iv36ergt4pa5ksq414i7hygo4xanlydw55glixavdm5j6p6q2dwaesg3srhjjauvkczss15cy5ch4tznurhdexb69nhqmmnajdetxw40znpzopjh3zbdxefvrjfob9z7sbfo444ekb2zftl2u5fcvsf5wrampglwswn3jf6v9dzge98pg66cbtvzqwofn8mehi2o9fzdejgx7buiqsy9t585tq477ztzbtyoqdoy599v4qcxqx8ok7grwhvgbeq7500otstfdhjnut3anwyu3t7n3jt49vyjk9f3wu9btsyfyjk0qtnxnm5dy6tgbpedk0v8huqeyvw6095n92o7y9cqmf1kndu1by6lrrxd8gkvqob4sjx6pfz4okt3bajbi6sfhhx1n836ouvvmmvxwov9eiq6jm469bavvbwaurthxa24p18axmr82gf6ldqz1qnv3u0567ep87w77kepmpig0j8ql3w6g5lompjlq52u8ctbcesfx5l49nmjsbjymtv1ganu36fv9g4sg2psxw2zk9y00rzwdnipo9zm8gmtj02ak5kzf9wf5yxr3snl4yci9kaw58poiev4gr3k6sylduvs6zu57mea2ka6fxe9rqfbjkn0qy9529rwrq4os30u2up48x11i2am2ud6ewuo4xxap9d08jmbg6sq7ytw54wwwb7yx0f2v4lo36p7pqjnftz6tmfa',
                sort: 331366,
                administrativeAreaLevel1: 'qkuy7nw4a4j4otvumjzeaqave1q6pfqs0p4p8a9dhvfq9u7n8n',
                administrativeAreaLevel2: 'x4bafcxyo5hg7925eknz6rt8zp5s1uii1148a0ie3ngm1c1m3x',
                administrativeAreaLevel3: 'y2a4sr07q41r1v5gixv7zt1krawawey6kkht627q9p4m1hafsk',
                administrativeAreas: { "foo" : "bar" },
                latitude: 603.31,
                longitude: 213.20,
                zoom: 3182546004,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLangId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryIso3166Alpha2 is not allowed, must be a length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: '1la',
                iso3166Alpha3: 'uc5',
                iso3166Numeric: 'hnv',
                customCode: 'cl1mjir71x',
                prefix: '3wl7l',
                name: 's4lbr8yjnqbqygi7zhiasov5mhdmwjdrul8orsetouh2dpetj6t6uxefr0rl5c40m3jeu0r42nxnuqdfr6qopq78pepah1ycepb2tyo7lv0l27w7vhzbwz144qxh7ndwxa17fxu6d2oo72acllb7gdn5q07m13palyaivijbdsi2xbd2y98boc6csdbvpd39evteg8d64z0i8fl1jg4hez45svks7eiik3cmoyvvbkiiqz6dhjeckcqzioxi618',
                slug: 'sdt8tnj3qbxomxb3r3678ox4t1zvi69br54dxeup9inppph4xhp8l84fq46hn2ib6cervehaerl71hvsyeg0ohruub4xmvgl63l4zfbu8ltgjvng8dhiu8pxujvfs1wox0h1uos158cvhpiobr179djnh3yu5i8bah4yjon4nll027s4r1lhqf1yvcwoqb0sk7vsoe9fube1jq2c4buwimlokwaqo3w2xhrqwxgxy9l0u3jg7melhjw4kx02fpoa7cu3dgjxypznekxchuj5n5p5zzrgweyh418tnshqx6umi0x5luhz5phqoqm7w89elhytam288dnyc2q5ux654xramdrp8k3ilaxt9it40d97pb2alv79gujpv8984tufh871zbfv40fqzt8ichcte1hn187dzsseurqmwnsucyhd1l1j9x7rhm5tnlz6kdqnl1l66f6hvupivj2v3f9w1suqvqcrggukwq7i28kc4lwb4163lvukm0hykf23rg7nw592xs8orsbyeziprpqp6xxdhwdhmyz6tmrim9t4upqzw926lmle5mdtu8ih67o78iaewsxa3zjjgg4jj7lvcobjfxistwidqglwr8jqnp28zot6km0bq0hmerphc49e79k0032dbqcmqyurijnvuk2antsw5rivxwxpm9ulgf3cubj4c6ppu2utisxhwg2w4rws54yakbfx8jxq4x35hitegq7ygidi1fd53obvqp2avu8nipejk0tqv8mdozyt7o1kocmedcwe0tmb3k9al1yzdattmeo5azwj05nw0ad523z22t79jruc7rqtdxwqr3nmrnb9102to8f2x71sbf309dtmd3rmbsielahkl6v1erji95ll3unm952p8zpwn5wc4yxnc4th6g2f3f27k9zu1ctqkyzzdq3mdbmihg1kcb635xdmpuz2cpnyxu2224pnc6m2xtsykj07mmrdmhhx6ey6pvpj8dl5sxsfhdyij9uw4wcez9s2peg8zdt8',
                image: 'l8og869tm9dizxxwjqk66vutbnvacy5c8ubvel8ijb0foxrovlxd6fv8oqf5dgnm8ebh9eo9ywvg69dv5i8ib81idxroern3uv26jxf13kg6eo1bhnxewujisf8q1jllniggs8s8fx0zt5282z2t3s5n4b6chrc1ztihemjehfi0wai5fv85nhmei8mlyzf6jhka41dedsgoy27uv56ranigfcprytjd4xpvz05xl06sremd61m3qpvtz3yarxyropm6iou3947dyvsyycr45xo5nuy5cimwaup8kn1cbxfvsek3f1vxvhsztv4ouu7q3we2y0tc3gksrldjfz0tie6mr50zl5kwhryastvx760p4cplk1gmz7qm6v9m0vs99bln4z1jwbfpos8wj27dib8saqnyuewk9ddeo05p1dpgdctxwsuj44vderqsj2qbau61sz8lbzmelriqwvl7qwskbg92w4l7yut07afrmx1cpwxc71zezyxfmghfify49qil2zigc5gvr63pg0ag5gpoqybutjr7ifunhez6bjwip77evto40xbn3aqsgk6ixfa8hg2t1az6i77amar2o5gyrpfnwwbgsvfe6ot4kszoh9ti19iqnm71y5p5qupt9u961yiwmmmlcq8zyi1rh6w3ulpcb8t2dndwv7h0r88l3g7yg69oxituy57p2klumt2nik4oewbgsgflw36jokatquk77fk69yf0qw248pavy187vzz6l6idlieb3aiyz8hhpugmykc4rflru718ljhwk9jam6srde2on0ocw059ablh7jj8ecbzmas1k45zi0umlncdrszwrdgfk4shap8d9lmgag2a6s2eti9xm79n40ozt9cxdky529qon4wrkb2gsjrqkbvr3r8o58tvylr6uymsp8i7o0rj01omykf1yrp700b4h8aeo2l3js677r1u7gx4dooa9vzdakswdqnydbiqgccdk8gzu3le8orqucs8f4kxfrw745ajdi86',
                sort: 741124,
                administrativeAreaLevel1: 'dt91v6xj2qoftm7sjt7w7sr203ntg1ngjbem5govhmau4h4wyh',
                administrativeAreaLevel2: 'oyw1b9rch9bn30uxer9dt2kh45hlqomxon4jhvtt32qzg03ky3',
                administrativeAreaLevel3: '3962r81hrnibegr9vy0s9jom4grwbc27xn2qrn8aa3ke2rodjb',
                administrativeAreas: { "foo" : "bar" },
                latitude: 925.44,
                longitude: 336.54,
                zoom: 8034506471,
                dataLang: { "foo" : "bar" },
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
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'y1',
                iso3166Alpha3: '5wmp',
                iso3166Numeric: '0u7',
                customCode: '96ci2ix1do',
                prefix: 'uqeet',
                name: 'hsy6snm37tvhsmretsnkbgursj39h3rmhfqw67bebz8mteszlasp6xa0f85i7kmj6qbbzffbr7yzcn06z2k4i1n8utu6wm287zrfum1wzhjgrqprblg3pz3tnz0edua72rw6rlxt34nr902s7uury60i8n5vq03y4zrcpywb5myeqi1d4w866osbxz76s87wls1wxdktm9yo4uei0358sae0b6hbx3vc1vsx85gl1mq0vcbuad5pdz8xyfh2lq0',
                slug: 'frswwkkc22nskqly7rhhaoayn06apyeucpmuaocd32dd4iqsit0tyvjtmlmq36x4bxi80jxiz3zf2jqr662ye1q4hde42q97elnrd7umjy3y75qqo50og6nnvtzgmjlimz2k4ycsvcm3usygw2v6lmylki6x6z3mygbn5dnx5a8wd63wth5oae4wtsprvn1k19n6dls8rbsbnobx1omy539hpcxc6riv9c3p80y2ffbh02k9xn1yueqf842t3tnihllsc5tm0detj346xg0zkkpmpt7yzebxhaievw2khbzykh0pbfszkrx16fk6dpq0suuj6uz7kptzic9a3el9r8gv488qlja80ro6vvh5bsldnf5zgpd1bxe6vcfh38aialqmb0iz52e4330bwef6e6mzds65z89l4ync3jo0ei10v8z2zt8p3h53jwn4efcyrw6wmmzav1bpzrgo6m3zxlohj5s238kqbl1zfdtkz01xwox9dxnnfkge28rx7st2uvvzdigq5ktuav4a5sgcdy5dkx2ihvvmtfwnadu6zv5q29bhul0z3prjst4gzpcoxkf44ucj639uayrao9580aviu9b2ztc39tq247gxm31py5ipzi4udb16uh7t8s257luho4u6p4xv0avt3qqqvs5jzu7qazl0e20kffbsefq5cn73shiy1h8oqobenbpbwnv8rylsnud0cbl25u0jqe4e5z1vzy2xjejxoowi2ehsaqsldhi2vxs21vkwmda39ms7s3oibmpn2t3hvxh19n6u9hhp5oqegmfd8r3d5mwiucirefqm82wtzte5yghj8yb3zesybdyqh97cy1gg78jc8svvqc4og73fe07u737kqpurr5xfl8rl015pchn01wf4tqty06kl4d6v49zoxqdamc6ey2tt0pizivhvsqcizjkg1xv8x5mtq8xm8lv0z0acwi5b2uq1dmils1o3w7trhy0atndczhjufqa99mpu9homcyh2c2ta2uv1nd1p',
                image: '4kcuni8edg4al0dpifocmolk87g0vfwj0w5kuhsplfnc6xn6i7cc0rsh2cmj5r16t1tge6mmvx89mao2a85b7ddtg0c9q1oogz1mdedqqzika8mhnec94wkl9xz177xqe1qjsr12e8vgs85lfis7br42jkmxbitluthwvfg8dou2vo3sa6fusrlycf3xzvjia3bedup6w22i3wrav5pua7nsfy3qlaxi8i0x6jo27hd9rlxnvqublatxtpxq89xq8ge2r11mlbzj1ot27g75ms1ko5s7ngtd3m7jks7k89lbqhcuh4q15bewwi2167mdm0ybc8ufqasuzfq1dt8aw3xjhotq7ui4fyqu77j9zsqasxlqf46kwism6r3rwpz6cji1fry1aouykzfd99ifdii69g3u699fbfzhk5qlk9se3shbjzp6kwl0lkxtha6y954xil4a1rvfz92wqpcddafzu266qkgyd5hpogw6r72wm1xk1jka5z88ok22yqh8ylu2ki868korfhdi83xqtlt3z0zmou504s2uh5hvxjuno1u1l3srdlh72cv9hvobhs4y9dww95a53c0bfnbl1pante76w5xu5cnws51u96eg2u4dyt5jr6pr6smasof781kewyn5w7vkwpxyfekqaxzy554kkxomoeoakkcc046o99lwmgsv2a1qchlz0h284caucfrlewcg8hjfcufm60v68yzzoyeo20yizsjfipm96sstifjf21lu1dml4gia88l328at09q5502o7fnq2rfwu0mmjfmyj5ea0jcn197olkweuqe709l7byd20tklkdtworolfncly550u90bq3ybv3td3umdw2569blosw8289t9t8682cuszvu7iqeu3zjq4q65w5jh65aup1fkh3htb040g1xlaz0augilrdjqlk4bn9zszrsrc70zyk6blbud0sdrht80asbr6c2zb9f35jogq1g02ywzk1gv6gdm3j1ho6sn17f1qq4lauob',
                sort: 211589,
                administrativeAreaLevel1: 'xra1t3qgg3vvmyucfcxdv864m0mcqti1mdyrb4rmzvxxe7mn59',
                administrativeAreaLevel2: 'tc7nak34sj1ygjp7hgfah4ttxnlmv7mqq4hphtlpzd4pnga87x',
                administrativeAreaLevel3: '6ox8xj6mvlpliu0v8j1nps2hizay2iiwys7i16uy3e47tf351t',
                administrativeAreas: { "foo" : "bar" },
                latitude: 343.00,
                longitude: 134.73,
                zoom: 4259183870,
                dataLang: { "foo" : "bar" },
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
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: '8r',
                iso3166Alpha3: 'ud0',
                iso3166Numeric: 'tlw3',
                customCode: 'udyc2n2nfs',
                prefix: 'eg74f',
                name: '0l39qois74dde6tbsc0ptk8fydxr8gn3p0lzj8vhu59t6gzhgqf7wiq8jrcywytoibyhyq0xekd9g7hi8j2b3ka5z0ue5wbue7gae5rf6kqxkdh56eurx7hunaxx6y39gykrfr7erxfwdubvh5kfgkyb1oqhbo8ol0u6stjeq24k5g171dfn12g1s51alrjiph9f5ya09c0oavbbtercm6audd9kx7pgm610j1m90d49c9geb7k3ss0quf2msv4',
                slug: 'h36ko8oc2jwu1lv886h246bswd4jl30m5sr43btbqwsqka0vlydm938n8s3c13scquvf0qy14qobuo1u8lzrykzge9p6zcrrw0uiefucdsqcjiwgjhfkaqc8tn24mln0n4djuqr8egpl6azoq2hq50xzm37azh7ic9eaqucf52uo1cscpxvb132ivziikvcgn8tecwfz3ekug538o47gd4w90dm6tjrqa17uwlmtsxdmm7la4a9quvd3m7p9k8bzx4e0l7v9l0cfnxk8r4lfvjswmnkv9z3mbbhvj9q1twp1b5m0pj31o03htvddt84d15flh1twhovllw5gauznjuk7lzaawbjexmcrdjtwr25t10z6jbcqbba1t2y9lwejakkxyp0yzxytl7ijexrapfef61gzegxy7f13krntbg1zs7bf1bkdvhqhfvo4ai9vhdhydumw8k8n9nwcqeealvoj6qd3z2wz1b63dn8ktifn58hednkqy3rz862os9ergcrcmvmzfawacwga27so70bkzpz53d6p4tw1ze9aookj9km2caj0an3h72sg3it1y6srg0enkfii19ho29lwlxleev7c51danmid2a63rjv4ks03y8m07zeyh6tjjyc7k0eitshq67z7f50ttdavxwirbunjy468j4f6htqteqhbldulo852fnsvq7onowo7ogyxew36oygdicvuli1gb7qfsbkp2akqujhv9utq80itfjh7k0hi3afgze6hngeozz9tadoyb6x225htf2cs6bm9op0f15jzlh3dlf4rndhg1n7ctdjq0ngi3121481jmizgmj8isnppcemlwj4uyn8igipgwsfi0n4uz0ydauomguusavna9wv6pivzio0mpupxlvitxpk4o6x0tz4ugjo4pizw6ju0pke5w4v860tm34xfot7p5kdjj0ffeljykx9yr3bedjudo3eyylffenh45jsywvky4r6rqxliyr9gzp2st6829pmuckmos4zx',
                image: 'hs6vh0zpms8hkuoukxbu2j5ktgjmf3isaqwoi0184ue4qimgommz2pj87rirzufdpwiggpe1nnlepr7ncpofg0dnh53fn06cdzibzayk2asc5oq15ytyb2sbv49rpiw1bmbo9puknpd49mqctdijgs9jgdkucslagezg9js4v8wjj3lf99qq2mgdth7xnpn2ic7872ld6qz4whjv61u0bhds6sa5nj5hq1dfp9ykhmilwnh48vt9czkkn8rgu9j2lyk75o11mav9r7jezz8n9z0pb0myye10fdsbcp7sfvnu6m3kecvie9bqkintx5z6e8nah21atx3216popqmp6ui0bw160gftq0x3swl3lijczcwtibk32m47h32hmvm0te6s02kojrnat88omys00ef21gy49elgn5qma8tq1rrenqp7hit0j0odquoycb5pkcq5ixf5llrkqcg8kttw6thp5g3j7k6k303f7fh79oembrxypz2c092aj15aersz2q3tr6t2qbz6nr46rydicc6rv55hhwlyx0x3r6mh7020enqelzpmffaupvinvdmzxr4m45nxz7nsbp06qqc7xkzz3t4ky0m2j4dt84ovqn03l2swoqexqnw27dn2q91x7y5kz5vy1hy3d3ey04at9d41wrbb08kurizapt59z70f9c4ey6v18zvgtq3su0rohmxmnu979ou1j3isgq3n3u91gxlxwynkpkcvnalogeepamevehjqq2mqadko60pumtnnjobnfi6j8h8h16yzcc6dnnp5wtiqi14f62q03dllwa2019ns9q3lh1ogxpeiv97ozy7ofgs0hzoapb586wkbdha8t7w6uk4j3bl4indx980cjoevhtc0y921ssn6jpohlxkn7sbf5tf489uhhfg77mxp1m9bpzpisz6twcav2w0j963pa5efbb5slk6vqle5on5d9lvb07hepte2ag3gm4a37jb67ytbstib610wlt5ot4y7ocr655c8avyq',
                sort: 987494,
                administrativeAreaLevel1: '3vc735r6ghrs9rjqr50dzyvz271bwour0ow3isa4nfrvuxs7bb',
                administrativeAreaLevel2: 'acw7yoq5yttcqkrmn7vrz4pp7jayy14jd6lgu7t1xwikezbbtv',
                administrativeAreaLevel3: 'rqfubojq9w2ejkrndviezxrq4mmzenzy0xp4recebgptfo6vw5',
                administrativeAreas: { "foo" : "bar" },
                latitude: 151.01,
                longitude: 266.99,
                zoom: 3916963400,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryIso3166Numeric is not allowed, must be a length of 3');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLatitude is not allowed, must be a length of 17,4`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: '8j',
                iso3166Alpha3: 'b7j',
                iso3166Numeric: 'mhu',
                customCode: 'oufdu6yd0c',
                prefix: '96904',
                name: 'uoj45ha44ub38mbi6ha5jse93oz32821hmlm5i6zpwiuomlf5ion8sms9eolmvkb6qixlry9k62w1d6jnxve36zjtw9nh6vd71h89d2urlb91ztnb6bay1l5pvuwxmpucap4spk6ew17fxmtqae9ull51xqpp040ryougptfuhui876ifi8hu691gdp3d93zrege1zonvxggvoko19s9nhjo9joft7o9d5tatg47c3ff4jiv3a56vliensydagh',
                slug: 'sl6f1ttikvnqho0hd4gq9g88h56oyyq4jxtemei0tbwr1sq5hi6yhv7p7i8cbgyvja6hqrbiv621fuj0i1k9zbbwno6e17j2xlglkumparpoasxgcs27m98u2adg7eu3d6nminaaxu9ez10ekcuz1i3xin4vt6ikuza4otg6o6qd3ze7cxh9fjbxwrzwzdq1vo0tnz5hnf162v1trrkqq7rw7slvuxo3wqogwsv088tzdltxyrfy7m92irmhjzxlgo35k4xdg7585vomnffrtow9l8xpfn1g4dxfqei0qf2bws2hl6ru6nyiutfod5cteuatnb97z39oxz6w4x8z7iebkndwza0aboybf9vbtmlh58nr46ocs17jyn45vdywbswpt0024v6up4h1kswyzra2ce1agkoiixa9y6iuwpnjlnu06m473t01g0d76oifxg0ctmn62m2t4t1v0votw3yabu4e52t77q4wg3vw6fnwh2cvl2puvubhhdifdlxvrveww61brkr60m7idnqacq3iv0uqimgsbq0l2xgy6p5uvjfo4a28l04d22lnkltvgaov5iwan0ilwvjzf0ogwljj93zumy9iqfl7p8exxioy26oj7k9t26o3wr748zzpvpar866x2zf1qlvhc0cb0kvfgz5i1kbe7kd51twv5856ppytphohdb2078n11e64bw5a4shde9rd6569lafxmkmqspkzrn4gqvm34os3aw4i17k62um99ey3j1md3ui63zlus32at3bhobk7n6kkslh4x3lrqo1pzaqgfu7vsn44p3lyed6jkywabp2dfddk2n9mzdhmb6vt5gflkvy58gvyh6h59pa1sditt2wohx314rxeuyw9kr1gacfltx0fv2hipa0oazfivw9339cqbddhm0d8vlnevkyx7yphlwrvwf2km4kkgqls5pilgy7afy9z5so7gerfcqbdkrmvqa25acsx8zupruis5hrvcvrws6omb4jdtsj97laqkp0t',
                image: 'at3twa3excv2nebxy01iw3ui1bnxe4m92rqj9kpempc6koloolgeaq52wbfetytmupngbf907t01imx9i5qh63288fjelduh5s2bvg2lzjufule9v9wt1d78c2g1f9zuzriqu8nesa6r3a69w7jigysxm10xdr3cjqjl1dm1e9cplps3m1re5mrmbejdhz08corvur30fkee93e7x4frkra6cqju47emiyaucz5b3gq3a7rwjbhbs01ccs7e6aic5pt21vu23u1t4mp5v92chdyy1pxnvv0txvzg7afxq7lll6o73z8koesronvy4blx6odxddx73wbtlm8md5ff6869dhn27ugotgomupso3fuu3907phirndqnv0mtjcc5kw07uqryqbuw377doztn5m6et6q75bt3txantc524tn68lj871m5gqraj326a9ywc0kjxetiafv8a314qf2a0xv1cmgvtrnl8ewpf0mdvg0y4cjj8l496uasqccjf0hc43gsaosg6rt1fjqy5j0tzs6ybld3c5zdwre8aogez5cuxqv8rhg8jpuwentwtxfjyt0zbgths692hrpg517vwaq6uzjh39jznn137ihn7wy0klokfllxl04hxctneit3z1z3qiwvaivhzqrazdkrcxe7aez431sksdjsij2it5xx1zntakdw95patbvdf20tqzjabaxz4j8uukjt9joevyn5itayv20ppuy81enbkawxjtotyl11eo2ang2ffhjt43sxtaw5y7bo6ysu0uosmpwjb1rr5ibzsag7xdvgjq0dc5obkvh4zcxw0mulfip558t5kxqxhqm28yiydcj8o7n7qsbkievlpumqua4lp1nl0lngt1tmxctphlmd29xzqqoltw03jtphsl4it8495yudoqzm0rylm73opell5xyaxck0aprigaccsijrixmat43dmh4e3h8fazfa1mrevymn5qqwvz7koeeqrpf99t72qfsd50o4kyoagvt3oass',
                sort: 767676,
                administrativeAreaLevel1: 'xbrd31q9gdqg2xpp3qd1ldcdzk93aki4qqvwb7wtesq2slvz01',
                administrativeAreaLevel2: '53b3eltradjbfmiwuy6neubxn9nfw9esfn5uba1n30aglak1sr',
                administrativeAreaLevel3: 'bnj7ampen8mxiy84i0c568ao2vwpj90p3s7zeu4hzho4app0nd',
                administrativeAreas: { "foo" : "bar" },
                latitude: ,
                longitude: 757.65,
                zoom: 2111776644,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLatitude is not allowed, must be a length of 17,4');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryLongitude is not allowed, must be a length of 17,4`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'qb',
                iso3166Alpha3: 'v4e',
                iso3166Numeric: '86u',
                customCode: '556trq0m0n',
                prefix: '3l1qx',
                name: '11xdau7xd9uhr4hjumy979bj8l0dxulk5k231oenl3m6lggkmvp62kq4t3dri37ja9y3ahhjw7g1ajjcuu8vbiln5p676p1xsbmqvym7kv6lmf2wvgjclxbjl2efikq94ipoqmxwqggzp6qkk79v7ufwbzcbnggf3sv6isdvobrhsil2vow6cwrhranhkd7ui7ljnsh05x41uewaeiq5vxhm1j0usevhzih6rmj2ejpt7fa8is7rs9q8efagwlq',
                slug: 'n66huc5wdosopc1myckn0lnw8xuijjzy1pr2arreabbhnufhw79h4bhcql89b701du7h9iyvk5pwvj62hqetbrxmu9uh2b0jarpzm3vgzt2fghdl1ez8bkgrt82nqqu6pux3oiyo94sy9v503gcn45ygcx0v63xo43dobqr8wp9nrsre3nrv8rwekiqrtu4563bon61nliruoao7pte3jz1xataubiascqzh3gtnk2xtuh1v0pi9axdtw7bkpc84vixauc7iybqoz5r9uxbptd1kz55o4ebko2zse0dnh7f6kfd1j76xaeco5llzf8f6mujqrmagn3ttqs7vp3k7l56fiqedg5x0rliwfdvi3ukt3yq0ow6lj1f7s92j8vojsonofoutvqjx2gkbozc7y8sijilqrul9gvctf15lqomq51w6n5g7jqazu0j2oism5wxm5y4ntz4jk4v32vhjoxo6i73mmylqcsrmxsci8efhdus72xf8epsn8mjpda4iwbe84fjunwu1tho88e4w8fivtegpl05yvfdp4q5fsux6iayr9eo7l7f5khwzh67s6d49zooaoq7xr9yyhj0095glftil9f1xbiq3og4u4v0f94q5dz0powlwd9z9gne3hw6onmkj4vetka23rhwc2wwp9j1nrny3gzkcsrv548tpxx84c23p01dqc4t3jli8n0metattqq2uxihh74tre8ssjeigijyf8axolcxuvjccawazor8tkudsvxrt2jfxdpbk3tgwf71mgkykczyu3k1ohphg5er4qlckbs9fw3zmg71dyzms0619b41w9w20rgttp0nm2h8qmspzoy1ienv9w5dybpfnjml19axb6uyhhqyxq324zjcjc9ngc1hnvck0fwvcgslgwglhzfop3g0vrk4xqc4i6v6b2pjivakq6howffh5zkk3mbqa3x06vb77277d99h3myjc2okn1k72yxei11muscwwsd1ncos73frq6g3anshfr3rl3tj9',
                image: 'u6yqs939higwcv7l2ppo08wlsdkjkenry3cavwk09b2feji4c76ms012hogv6myzemyir7rxkgbrrao0o5bdsap300g3lhx7n846k5h2hf23qzxpgurywtgcz543qlt4ogwykchc21ybjfjvyyiny9jx7ixhitd889q8o3t8waett9ihuvds2rn0gk6darfq703ynoru8j7whvyhc66bqrx4a5i12zsybo5odxn3l0kcgqttwqzeacvb0bwbobh6yw54lnr9etmw3gqwxacioign9sobxi1hkigqrac58om6jzpafdjut6l3vo4a88iochf9t4df6g3nzj0vqmceq4l41vjxyr2gs7rm9oj80os1pcmhz1uot9dzpwc47xju2diubfiwi9ybtmotjyj8t2ft5jsifzhwh3h8zhe1yrvmp6cs8xeasfo2w5t8bras44cehbks1y4nv4pxnz0emwghxuhn2p38npb8pmg75sas1k3e8scebdkl2wkv4trj4tmctvrwahlkwwwls724emtecvbb41d2fzxhpg15kd4wwsiv5lmkoii3zgwnktyavlsmkv0la56g1yfxdlxoee6jtd9u9uhczkjdu6t6xg7yd10ds4yfrmtkuygfi46eg6ygq26vzj6cjt9grz7c0493g6lzv1iqcw7ufmwwo8i84o0vv1ha93ygknea6i4hgit7rbwst2xe1dcafypt4mpz8wkl9ykgt4nxshrdu3ad41ajkk7oz79254tgey19pcq7ncyzb4r21gwlmstyuizpxgvpq0vfg94q5y6hhafu37418cu99zn04seem6bnlnj1gaz9iz0yyn26kx5yyad18zacjdc0yfjloylcwpdgo0nb6821e373x20t3vpdolee3u9qgyu1yhn40v59n43u8t037x7bk0cqv3v2gqfx2mtatghzvx8uy6njbrwr35ammykqm9hmk560i2jp2de2u1cvstlzdgn9x09or6b0vpwhaiiilt3krdy9xbbd',
                sort: 913981,
                administrativeAreaLevel1: 'mc80agwwwkn7mwys3a19hm35bk2rx7yfh1mo6501wdh6jv9nci',
                administrativeAreaLevel2: 'nylfcpu6hu1oxgxpwwgw9ev0pqpfbx7e04ur7i6yxx6xk5quux',
                administrativeAreaLevel3: '5ocp7sovy5ag5tq55yemmbvvxb73hh96jpwhadivv9obl7egd3',
                administrativeAreas: { "foo" : "bar" },
                latitude: 881.46,
                longitude: ,
                zoom: 9971348673,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryLongitude is not allowed, must be a length of 17,4');
            });
    });
    

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryCustomCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'f0',
                iso3166Alpha3: 'hrh',
                iso3166Numeric: 'qnl',
                customCode: 'cw15tniged8',
                prefix: 'svx9r',
                name: 'fpgexmscojx49x5izgi5vmbhlw5yv6ec6el6fv7fatucimcglqi0n40i1o3wdj00q7wh1dhbuj1rvm0dgkacban7yu2lk4tuxqa5jp5is6s7sw7wshvuf2rj9fbbukond1u71mn0h7ud8dilxclnet8xb5cq4ygtk8l5w95eq5yjoy7mzxen5n0uhxh45lsmqv6f31qgcdr0mm8uts7ovclmq45x8lmb2wp858v2zsgmbfjylio38czsv6pvmlp',
                slug: 'e275w5mjwosrjrt3rd8emw1he56ml8bxzhq0yrcpok2x4c067hpq6hn30lpbcdm915555du802ofaprtea9nv6ucezjxirvmzer0jiakknzrbbhajahlvkh2zl24qye1o9apixny5qj6q8yu3hut1yjivwnsq5q31etra9c49je761x1navxfla8gr4h46uuokgc28l45opnapt6d419ftw7bm009b3k0yvtsmgtifnu176zjh3ct6mqm4cy4ipvvjfjd8d2ng71urclpqjw53bmoietby1ltjzm95n8a64ej75h71gmu4670u7yiley2ckrdjz8s3c0m1o4ll6gklpeippkynhwpzb1rbfzmie7dyy2tma8avnl6x6i3yj8dng1j05a7igv8qpq07kitfug8oileybunpuglt1al8w9zxmkrafjyfuw0twxgsxd62cb4h6hl4gcddp3hc9j8q0noqanmepork2c0pdupqw3rqmb8b0wgum463cl1zbxkox2yffeog42unt27lvze38j6uqbujjfbihb5pwtl3hj2ajs8cdrafa43aozjtwvfuxb9jydg81ksxzvebmojcngcrunb86225xrynhdt57umvvs4vak40uczd4gb390j5iy8zsedxplnyggbkpalcy58496u0hbcf8lkcm1iqi0mjmytstldinii2i8rjjm8ywc89o39s2f4w2qeiblow7fd67vlun7w2znq7rvnwrs65htk3kir2ut7k286uxvxov88wvzbl6ep9168453gxr6m81k9snsy4ife1h8cgr5psfboq7rman68td8jxxafdbwyl03x87onunrfeenb8xbd1lcab0ionzeq4nt1w5z7ct7ney3b0zwz1tz86ymkbbmwt3cw326qq5gun5ldn6mmoff3tqdm9p1sk9czhzhm8wjepz2rmvercitzei4hnl19f83fbdce3z7xtiyn8aohykaug4kwysahd4atdnufgd6s1cbjolkcflqnwz3',
                image: 'pk4dpo54ns5m317pzmfzhqol8hola8ekdlrrhb0ua63ovul0sq9wkjnio4pih68zf5gpz1f0xp8fxq5lhi13vb3vopb3rmzm20kurgmse9343f62rzuc1c5kqcnhbtjh713nh2chzlkpnlmbfb1vsp25g6d364py77sx8umo92t3qsajllt8oo4ylll29v22dd8hd0xc223uyxuj82tsfyshvrbvhf4il8dpe1q5mtj1iw236xvae9jkdcnunf4fmox2ae6qgfzq8re589ncv4yao88i3wpn347y0wwrh9sr1i4yhm2hdwi5evqth6kpmizs4rxsidvqqnfqlwoearz148bjznc588mqto1h1stw7cyr2au9k9gccx1umvdh7lx4cqgkihnmyysptmd9l01nqtfnvjdu1inajej4ulfk1pt79cm4bmtwaqewxsfw3bm1djb5rjwt59i5jl2cwepaeho2ggfi0bb00xo6y7aed8s79iv7zhjhejam23a6qlhwtpdl7rxiae4mwvkvrxpl8p5v1qxhcd3nei93kci2234uw3yjndrmwc2q15wo4dk32mzfkj16blqj88qxhkqo7zk2jgur9algc4xy11cb6j9h3snlu65p75p2cg4timukfqw5yssveh0vshwkz77crigr7dqgxv7gl469luqmbu6aze5bs835j4jebia63o73xkkeb4murpxboud3b92fitooug235zhtew1fe26zem272uyj2sxslikp8xpgrk0ruwlv3otqkwv7qyrdhv6rwipahuoc4y9zsiqehdahzifulgfejy26gho0zyu0fc559fsvmt4t2te9e8m8zokp7k6sij95uplbmgaqtdp6tetsqsguawz68maxypxplemratgkkqiiyjh5tzccmjvdkiktvduc7tvvhd3w6qsjidl5npmlry6qitry7ysuag7qh57uaig16px0djrpk3hoq0ofn3tozev1yqeasnu9ih5a73bwgm4odj3783ma',
                sort: 237745,
                administrativeAreaLevel1: 'fwrb7pbdx51rg8s8ebhxzn12fniltwrdahxq2k4ch7oeilifcr',
                administrativeAreaLevel2: '4uectuj0oq7hj7r1zyhu9rcg06rlwkvo1r8iqm5sjf7ia8xa5a',
                administrativeAreaLevel3: '8psyd42o3firo2q2i9jfm0la39nljq1nsex198xmj1dv024gj5',
                administrativeAreas: { "foo" : "bar" },
                latitude: 899.82,
                longitude: 877.93,
                zoom: 1034385756,
                dataLang: { "foo" : "bar" },
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
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'pf',
                iso3166Alpha3: 'xge',
                iso3166Numeric: 'mma',
                customCode: '6t8szcygww',
                prefix: 'yk6cu3',
                name: 'g4068onaeyu363t4na19sqhs17rr6nchhsakhioaglek1z1605q0sxpux33y065rwoesvd1wpzqediymkli6ldsygvt3huy1kpziu4qvecz55s2lyaoo4y8m5owes3hweq7beyn095l2p3hgs3o0gy23hqn0ektyybxd1g9glr10jm35bmzykdqku6v3gcyce9qxk1feg0rgcuuz9hvcn6pqhc1hm5mkzuwvuoa9235wq3yls4i27q9178jwips',
                slug: 'ygdq406dzx2f95mooewwn5vpz2lxlkiymfln1uv2eg2s7hfblo9nbd1408b71m5sa720fd1bcuz3ppc45mnp859ox09ngfxqkaljy5zu1yfsotmexa8mfqmw9lqxq14zz7te2orn6gqgoaokdmxslqjg6zgrrg79is5jle0jcoiq7r7564hwmt7dmfz3wyovtcr6lbn4nnhphpfnsqyedelaxhwis8k2e276bxn0xlp787nclbqj2ngvijequiq8l09cwtmuo0mx868i8c7p2on5iqnfl4dnmbb3ujacl5hzhztu0n1te3muh2zoxw2tz83pm0l5pbh3egai4od8psywbgayqio1lapugue9hw0ml7jfgonoe7qm5z4b5aydvumwtqzl9sapj61jx2hfd5vig4471a5ikt4pohwgy5tghpu4m349e5gsxa9ymvhl8tpx2azjnq7arz4nttcy2qaxy1yjqih95t6w7ku3ra3l8mcpsbw41qs82qjj5nqllbsd2w4rxvk74dn8bqui7joak2akl0n9f1l05f068gpu5muax1uvwnf8u7037hgj51h3d1vul1gsaa1z22r3xui5jw1nr343q1edzxsomimso0duo7g3zh5r28hr4pkmex7fg4bycgcbyz515xuf9qr5zqqks46c8zu2ofgsht23e54p359szwenpgmg59lyakmf6rnqdf4ptyuftqikdhsisemliw1h00u9a4wm7v6chmjf4wborva1ht1svdvu1afv04pnl7jzwtomkxbteqcjjlhq4rqqvilpxbmt8cxsuogzkqob7b220ldd8zxde1cxrbrsgl9i2odpeke2vlwxkr0lkasant0yjzkxajk27s00okloxnui4j5h5264pfj6dys0cu7b2for5dxe20en942nezbfydmkcaenv6r4xzdntepgdw02ez9kzn2z49ypz4060qisftorl21jivc4zf2y1liuc4hqgssyh2g80o9m7gj589k7ho4dmht9',
                image: 'vpge1vn5x3ix42jlidhgehgm9dkrjardf5japk7f7p4f67p68mkrj4dzalxdtgkm37nhob8lbsgnk7wpvgfjl8xehpofk6n35ryaex3bfcsvwgdke68qgjh9x72y65gpxqfcl1kb9nkya33y2lg5vdkmh85sbheqtr00g9fiz3toz3uszv66iek8i7g29btq1oyhxolq9p6hmjot6q2oxfp07a6ctz60jgmgtpvrl2u0ay00i0i3waiy4iu4z19f5r1olymyd6ftubmmx364tyb8i13kxw1w0ktl80h4r6obxp76kj0hsfghg4za2ul1qw6hkcfz75ua6xqiujsugm97nn0ge4a9dn9ewnvk357n6e1ie0jcbblx67rz0xvrjjtubgazm93uf2jzieno72cp0jhppq4wedp8f0zersu40nergdsz0wyd79fjxz0g2oa3fgeeysjqlfdn1ly6ueyqfzrptda7y1qm6zbicaircchqmf08sqj29xhe1qiyk4sdix3rwt5dusws2xaiu1pcp48uktmo7yjcb2fbyv370tbiwh1w3guageoe0mdssfzluzeig7lquau5i4i121jpquqyyhq02n4nl6wzr4e5h2m26c5y16m874f90uxi3gilw3lyyv3auvimhn2acvfjfq3hfja0x3pds3smmemlrrav0fp4eqfo3ci8yuj76cjrvfpfwojhpd5701kp2kavnp4e30wo0xuy3oic6vdbb1e7fva73als3v30mtbhgqw7g7kf2byry2lozzs5op805t126fq0mtyizvt0frcysc54qhz6j74j5bayywztkkp2v0ruzx04rbyjihi0hk0geehsw23b9ifrknaq8akwubddqgsrjzudpzl436qpb4d29i6xpkxw7lifpavjx897s5rbazdu1mb3w1l5vy0jt0wc7vwfthazooxvqn71guqk4dyv08dzxu3yglyor1a1velry81lo4h7vaalbkczz6myxik4mkx5ejqkr3y6',
                sort: 298494,
                administrativeAreaLevel1: '0q3wr5lgyr08mfdzkuinh24pz4a12gceubkkqapnj1usxhu2sp',
                administrativeAreaLevel2: '9a32i0tnndtqsw3j8qlek0trvfu5hiv56refhxcowz6jbg0wcu',
                administrativeAreaLevel3: 'zqcenm0lyoymv52sew2xanos0okxactnzqbfw8hwbynohrnt01',
                administrativeAreas: { "foo" : "bar" },
                latitude: 699.86,
                longitude: 38.26,
                zoom: 9867143501,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryPrefix is too large, has a maximum length of 5');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'h7',
                iso3166Alpha3: '1rj',
                iso3166Numeric: 'qkg',
                customCode: '8e6rahbx3z',
                prefix: 'rs30c',
                name: '4ccvgo22bxz71st43pgwx26aibptku00e5fttswpf4wf31nbh5j9fygtv5re6ufx83cdbwd285ngwz3dymn96ag2ofpoucleoxchsmu4df2vkwiu5ga8zni41fh7dodkoc745ctcbczmj9a96bziepgvnce6br4tiuc1xm99odxd3xjis6w1iat8qjbep500ms3use9ynt9p25wl847r2cv79uy5fntnwdmardshinq0jqjztc9scgxl51kyy8rt',
                slug: 'z0prnrnb6o4w2fir1dmyg3swv15vnzq185dn2jcqp2gfntowtssj72pkr7iczb9bhz6pyj76137a58a1kgg48p8msligv50anh62irranyllmc0lqykx1ozrvq5nxqtm7tzealuj3lpw2c2pye252e6asu0xx1mzm9kfgn1qhmdelpiaglvnsv5o1ecth9uutis6ff2x5ucbn4v0lm1n6pfnw36zux91ouxmk87mw0u3hcdslx2s9bw4aquclk9yzexhtxlf3pwatb0wnzmm2ng32as9jphkti6hbi0vqvhsji7fq3s6b8xgjrj75ku90e13a9z4xfhyorsjft6cab2pa5lfi61gkveufjgywn32kph3423dg6ip5in2n4orqnj0vyztnur1l31ybuwmbnnuyu6spz6frk70077yr61optn40ghjstrz7nsj2ynien48ov2bf74mxzqbq7cvmk7e9qb20ikqe3yuewosc7lybn6y134npzr9igscx6l9ffot30vcmb23ilgddanebrkgezfigxoy1c27hheowgz6do8zxiueu04ddidblzrtrg744vu2efgkusz72mloj7xdk81u9zkgdtzohtp940y577e8c3ndlf23ebm4mgthvnjalvoi4wjco8vrt1cy7m4x50c9p3iizth79mg7y2zaw6bdwrziu8u9o9x94u5dvq0f8im7tqmxxot0mfka5cf7iz63v6qu6xjx19wydw490zz88fo508n3setnvfqpkx5d3sgwmdcl8fbj81litt9dw1wzag2pu0gxej8p4y6p664phhfibn1tau5h0zx42gt6qv5url4z4x2qvt3pj1qnh17otnifq03x4rlf3eatlvacm01sj6c7sfvtmm09k1a4jlyksbv7vvc3pg8hx1kk820vn42i07wn1cu29w28qq78spbhczf2fwfauuaaanp8btgwz0gnaxpjws54scto1uetcir6qlwgowb8eteaibdmto6l6gmzwxdzmo8n',
                image: 'hb08kv09k3wi8p3s6heut7c9wi5obz21ostmfpickemq0vjx616p9jjx3h2ptefg8eoknth5pz2ogw4l6s7eyh0ex73chmakcblnqsbfq6nhq7q3jmdu7zk6iriocf0sb0fxj52n1fpzewdhsobsx4a9jpg2mbykyfors5myn8jcvwxotb2e2b07pru6k9h58n47c6sk2ioeo8zp4rdz2gw0r1fiusgg73lfl5lr30joqnz5b00n14p6nz450635idgrycawcr1k5n6dbr91s0aw8c8iuqedi5oqyad812zwqgvmeetdj9z5i1nuxygk33udfylykk86s5kbx14jf0boza9vlxqzd1213tddu4qslwn1k3sydv54wpwmwc1v3tetldvm6n76tyz7m01cvvlwfas0kuillmka3bqzujmiche5rrqvy9plhudvmibzj1b352o9q69jn2d7u0crnv2lcgdjmsaq3phugpg4n85bzmboundx6sepi2s04b8pimbpsvbtcdikly6o1udyhsvd0i7i9svo60dkjlxjgtp0vis7oypdsl7st5hpeu68e4iwrfyxi2pgdbeoonmlml1zc3bepczaokczry4wigkz4h68hctq3nubg4465574xohaj6onxg6ds6xhth2onqtqqfu37z92c6ficabxb6uxo8271a625mxgpvx50ds7uuql60dif7oxmsfmif54fdlxia7d9n4xm36t8n6ib8jdohg91a5lo3ibigw17dsgawd8p0a6zhibnc2llvpbfyzso7uvdhornq3f7ip0bdr3xoy7wfnzayf5k0pkbkjc89zdsupgk3k5aue80imyjp4ci5lbxq8cbkyqdkije0fe0bqbf55i3xddjxw0ku0y4ahcnyabp5o0anqs3wrwgfjsiucmc5kvh72pxztiacp2rwc92ggn6ihm30riqelnua5d5ohs441v36d98hx0nboawb60rxzy2o53wlp20k1iii5grl13jl19ze8ipzqb',
                sort: 851072,
                administrativeAreaLevel1: 'xown5tfta6h1cxzssg0pcejwpjvjg269vmyldg6hrfan87kbhw',
                administrativeAreaLevel2: '7fce13lggtdwomv1oz284cx3izays9ksvqq4zxooxd3ziviwtb',
                administrativeAreaLevel3: '2s0d2kapch8kg8wea4bl85kq8ymedqu735jrzyb7ja90yrambj',
                administrativeAreas: { "foo" : "bar" },
                latitude: 909.18,
                longitude: 638.58,
                zoom: 3530753717,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountrySlug is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'nd',
                iso3166Alpha3: 'rm7',
                iso3166Numeric: 'zi9',
                customCode: 'jmekx96f2d',
                prefix: 'lnl1r',
                name: '4zv50yavntt62ih6v158uh8jv9913r35thrdjohhuy6krlgz9lsn0rdwa6l5n3vxc4ux3c6jmwgwmqx6xjci2jmwgqfx8792s1irzxqlkqkt1joaoek50z731v329lt9syqdkgvck6xf7ur9hbku1phlf2vr5gubmtc6emvfkzialj09w85dcqd6f7zxa3r4oqucpovf3ge2nc6bxqq51yfzkugac0hkb3kaeprln91a48ugjt7xdijr2u8ufwb',
                slug: 'utmiixkkd3hfiplbuen65aihrmh7b13nxbztnyqulenk561z02hvo83xlvkrt9ee9djnji5f5tf6o2poki3opjhdeoqnup6ywjqg6fedj7z1g6qn78rpaw8708t1vk2zbqc7rvixjuo0iywabikmos8wnmbnfa5z8uhz5b1gjkj7vmbc0n20kwunipe0qzv60zqogefgx0jcbhwgi8gjtiz6iohqd0ihbltsntr9jp9t2wg6574lgo4eqhz5srcx1iy1rxfh4u5zzm6qslsjinco4q2v0gilf0fue53stta9k9avcuahxjb7vv076818us19sle8i05j31am7vwhemekdfue8a14z7c7or6w4fcbs25df0gxesk2nn6wf1s89w4gc4ev7kn7w5i5ixww0af3r73b9uo5rawvqjcg2kalpxum93xu56jrvvx54lanw8ucqoa5hy8v2jxsjuf3clekdlyxup7lug1ro2p51ys0v9yb1yzldy46ct0hdka6zpqqucfdc4p4h3hqnu9pf2mqvfe7yu6ab6xrv30vrkzksz66riunbvxmmqnt5tyusvqsjviq48rb0ftxdaao073py0nh5pbr59ekxijbukuxecvjkbyualkvq7bac4us3sxpoye3zkvcfmhn5n1r9le5ac8a078m4numlk931wqa6nvpwwtf1t7ztzdiq40g8vqdxwk2jga9iy1qhd6gvv7fr9i8fz5cb11dwsgeiuje1p7607na0fi9ix653dmhon9b2fp1fdlke17a1rw8kp3byc68ft9h4etj77bucg072vl8ydff0tskwp7myfbdaltei4i8o0tpks1djm1odf3iiceuq9n32lfp9n70h4c68alhym34h8kpfwx7qc1a8p913xn1x5e16uwq14e2ava1xgx00907q3iekfqj4sgjv1chezrxn4uxp7o7xdx7gzmu8emcvmejxi1yrumms5l39emw04enax78zd7nnbjujpne4uo74ev9cknrcf8o6',
                image: '8lj688eno5ohvi0qv87r6ld3tiuvj5tqkmyt5hfulvckhr0t4yy7ouuli8sh3hgzfe5llz21427nn3xt9rxn5shf3hopps32mb4c00k5hirkcrtdh46v1tlfmg54qajcagpgyecs91557tlf42xv97rhr8lrhjxkkvn3c8kec0z9is6je8gdlq2z1qbvnqibgycoc85wusueah4zowxshnglm9e49xqnjznuad14g7xkhc5lu4jjysrz0ctzh68tppe7m7t25458jz6ima66tuhuwxy036ncny9qa9irc7salftff3slu2kj6ed80a5aq71fr4fhf0mp4zft5tdyktbzplvbp5ki9g3nsop0zlz0f1763tcukjp9f30e8mjelle1kwwraxrof42z7auzczww7zxff2i07n5osx7afksj9w7y1nbnhild2izhecavnq8fgr62ifg8r82jv6j2a9ae5v7f7go1a2z0cevejhupoi317vfsrqtxxqr50ps7hvrwdeob0qqn14jrzi0822shvvej5i3d3ap1n5bo9tpxpf92fhbgmffckqgos9l9vx23mfrxcye3pir5i56v6zixnep3w82ffhpcn84671kg7w1cznd7sa756vm3h3thd4fnpevkko5i4hbi1v7w5b7bq19i8ltfmdsw2e2yi9j8dmpjdla22wpetozd9tprsu5wtdwqgk3ke6ilncnjw9oksrvehvx5oihicikddsr5fu0fi7812izb9b1t0shm0vchm8r7xfbnmd32a76yr6w57nk94y8n5yuoqdc911jyonjnjz4tbk1du36rnf955by7vck4ohac9652bzacubc9lfectslb02o6qohtmuwpkf18g3akfjop3rs1jqcsywy7dqrs2l2m3avopo6in17kz6d7eib9jj3tk0odwsraup3usba7uzsbn4d78upp4bz95jq9lfo5v3qwyrqxaqdwmfbpv0roh6dem5asjrgftwipme3twpqedxx4a456',
                sort: 515688,
                administrativeAreaLevel1: 'rsfw0vkowgtm4rwdpy0wwa9ekku4w52rqltnoiilc1rpo05nij',
                administrativeAreaLevel2: '91epmm586zlu8bweylnbvem0ktb2x5gvkg3ea2mx2mboljcxts',
                administrativeAreaLevel3: 'jw1m6ioso946v9hdt3mb1o9lt9ko3gv8dz3d5xf0wcxvza8xr8',
                administrativeAreas: { "foo" : "bar" },
                latitude: 30.54,
                longitude: 401.81,
                zoom: 3993498032,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySlug is too large, has a maximum length of 1024');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryImage is too large, has a maximum length of 1024`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: '9m',
                iso3166Alpha3: 'mzh',
                iso3166Numeric: 'xs2',
                customCode: '9hjly15f53',
                prefix: 'mpc51',
                name: '4nt0qtyg13cmze27fjz2tg723rwazpdkf5lctktxje7pkbeqb218l7tk23hlkc78gngs7d86l4ploswjqp75in58g21qigb232pxl99p5tz51os47dgufw621dqbn28qgnqgyatq0shv8v45puxhmcr5hk27t7vnh48vdvjksccjlz35wrs53yny9thlmdsg62ue7slspcsr11zmcl2tdau47biba7h4tytlgylkinpb8t2s7eu7z14h493weor',
                slug: 'b09rhufoxvm50vbcbvcru65stx0ls8jkktzu3nab5l6d2ph3not6xs540edjro9zeyn8sf4qrs7uiptghit6bg5lzrnrimam34z7c17jjwnmdls3hdf4x67e33iquamiq9djxo6riflaewlgx5dp5qxbvpoolwhd50o7smmk39wtikpahvjuqva8skdo23lsmssmgvzo5pypweot5b2k5lkje0h8byxg4vh7f9gqem7q5m77jyyaqt7fw8bilx4t6urxo6med17zn4bt6c12a09xwxlvw3dyg5egn6gs7pqkndnzoizlutnsdepqx509jg7krcvnf48t9fx9k8cqdpwjrduaslyrrjyuwe8utlsq87qf2y8ajf9mwbc29ia5ad8j5ny6cm1iqrrw0ihi3sgw9vz6a9ce2781l8gv2uq0rr4tc5nipitdic8kljuinlscmkemjzdwktihwro8y04qsf2sjzy7zoaxk58utq2sw4oaxnw66iosme8brkv7xvjdui0mqnr8sord1fkm2mhh3anvyof2vrbrddh1vnjfot1242jerjwd6mia32qcwe48x9rzwuev0y224cdk2xde7cz0y4fruvqn8eao4vvyyfmny225887dvxvpuiis4yr476dlqtg2wpo24yat3ql40bu0a9gmo27tmx1qgyy75rlpb4ejlnf3fnbjjoboryycgdx6eqjxpkowj8ap9ei6hboe1xfm7tcu9sso6fcddh2htg6636qywhxf59090hm97tiaoi7s17fjfa37p7lnfle8xsd4g60eamvnt2uvexadxfmv5vh80w9v3o1iv210eupuuse7fj1im9s1lc0si18zanh68neyg3dl4832766k1wtb1zwzuz92706lr13mxy99hpu3ospju1ozqc1gwnpcodvtkvz1v8kr37m7ivvjfyy8q9ij03yxr04g78esercl29m4bks03xtvxpennl3e923gkq4p22lsvcakmqqaesqstmok2hcx3daq',
                image: '95ytv4r29fptarsrmb4acw5go064hd4urayca9xgn70i5ovn777ofn4delpsb9rj2ao3b51vsk4rok9fz7bs3fbxsv86b9q1qntdl7jqleni4ugq0ozaidgqq9gmlhw7phtrj4tt8ek9ihbu82zw9piccb8onp0xulk1j8z0dvkg4yknx46jdbw9p177p2lqakc9wkn2jauv6mcatcejlggpifmbfbjh3amu9we944l5kbk1iajhys1nbzvxgqfhn6zxmrk1e6a3yae4mr0zieqlbwdwz506fzdw2my2znj3lmd1b690oybcl3r6guh3fx7lbvftok6jpo4pme5pf1u6wrrvm0bxjo5brdy2c8n9zt1uw02z9qrk7d2mi7j25811y899fah0kc4r4y6yc63b00p7yjtc5crv788te8dqbym0ubiif5u6xv1ow9xk3pmyexy4phkf5qy5qhqb0dgnnv0q1ud2q41bsrmxl5mfwjbrd8km228hrqdh0hqax22n6b371chmaxdcv5qv6cbl6dclm04gvad5hg47pso8pvxq0ihxmuho3fxjt4amcxj0r3e5mdcsflxhnspwfutqn1gvurbjuetshugebf0fxkcos4jx84lbbgnsxins52ezrvfrke2h2axtx63tebos5n9s5vqccpto8a2q575cgbc3qzsoi8t15snzeeaytvc3zrowdtt3z7d12r221oirdjgoff2hf4nmtz08t4a0lqzt5n9sfp1guqycv8uzcqwvqjvsi2mf16o2opprrbldhnuvaaeli58g6awpeby9wvj218kvx96052aj4og80kh6u06owg6zuztiqdqqxl7x9qf69dmfr4h2avqc4xb67fza3a1tzqz8vreaujhhznsimt7f9me2iv8k05mas7wekzu15qzfieoz8nch3ol1j0o37lhqz3ugnx9ysucjavrh5gsyx2qz0u9d8vlniqkf3pj9ag826cekqrc5mz2egtsezh4b5hipi8g6o7yp6',
                sort: 300705,
                administrativeAreaLevel1: '8vr6fl4pjfulsnzbos84fbvnqx8ada1yp0qaj5amcfhx2ti4au',
                administrativeAreaLevel2: 'wrunh8lphnrhueh43hos7bwqsuczjret2878spiaamclc4a89b',
                administrativeAreaLevel3: 'kjw6uex30pg5iuo05kdc21x0sar48wocwhgd4qyix8nc8r9mob',
                administrativeAreas: { "foo" : "bar" },
                latitude: 980.74,
                longitude: 684.96,
                zoom: 1989425532,
                dataLang: { "foo" : "bar" },
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
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: '9u',
                iso3166Alpha3: 'c82',
                iso3166Numeric: 'o7k',
                customCode: 'hfkqq2jhm2',
                prefix: 'wlbxh',
                name: '8ktlog3lp522i3xlw3t08epbbgcgtttvc0royqzyautjmpeatxj3bwbeu7tg00uo7nndvf7fru8w5kqntlpp7uu1utu384o1j17es9uifv6izzqscrhokkwc1rwovvymp8394q1o6jf9xvhyr1wkgjnlcqun8e90u0x7fzs4krerxxl7pn497dgbnglo6w1tqe321gnizj7hfzgj0xez0cb0al6caxjf3vzbt5f8sfs5oznnushkmtwfhr4doqa',
                slug: 'autjzn85bgw6p45p9xo9ia4aok9de83vz9y7bg7xibheo8i4dy64wko731w6acmw68mfmy6a9afjyty1dp9kvymsaqr9h8odrteyxs6ratn246odvesp15j51jmk4dar2yui30w5d5mjrqwug30g82t7d9yz4iob56d3wisr350q9219dkuk8k4zh8870ugzqm3t65f8qinhmlgnylf5bicyktrojxzycgxs48kvovmrcxfz0aj30yupeatgm51qb16ghdm9cgmrtugna18x8t9snw7ny77ed7e7rrt7ynefctifu9npt5rdl8ozckcvc3tjqr3hycg1lobnxk34ysl8s7gnn3y96ohi84ogubbakhd6a4o8icf5nbzcyblohhi2tllqnokopiy1xvnczktzd5tua22pcljpxnvdfwipj0r36vp9gxbuuzj5e7w6e86l19cemoaik9cq61hw6pkoixkvm8cgidqp4jya5ku9ul3t9zdkwc5a0z6trs194um2c4j7k43biudssi3r4ejdo0vwzvz2x8u67or7fy6h15x63cvotqblnwsmdv18pcvelmhb1bteymezd37a7nqix6bw5i9wvwy04eyt84taq5ewc018xiuclvudf2l33aqlkh5g6exewffvjeywzvzyc6mn8xehuhuvq6g3vct6umo6e20gwpl0pvgcnydkrxych9ri0gasyi1z72gcqt0pcncnzn3ntb6ccc5fg0q0z1quqwdrzwp9x84fvw4m4mm3n1wmzh8c5fpilm4dr1opz1hslv4np1kn4enufwru6t965cdjm5vzg6ocai4ftd749qwol8zjhto4kmq7rpq9iii4dw44xhp2ky7sjzp6pr937q4s4awrhmaw6nsjftcr1ijk2w1wonwhp49do36bedq02ur8y6v23t9wd61juv4oc27dtyyys9ipwzz3hrte2yr3jywl24kao1p9so0nbx4qhv7k0ansbk9bfy44mm5xceg6vcpyv0dhk8h1',
                image: 'qu0bhuw9z0977j22y6k6ct9ij2cef5f6ayycvyngg3m8x9zp2v4zl3l8hvkuyfglxqmrzthfea0rt3v4yxh898kpkvgizkf3mltmo403mngdgxsj5brhum0audc3pzkfbhmxg0l53vzfo4seei3eerwnpirwv9ongz5nh7p971xcy2eb9zt0c7pz87o5nbqeghucnzf9uikz7xsaupqbpgjqxrhkound9esfgar4q5738dzi1a5klx8ve4w81fqglahysebwynp2x63rn1q99u7x33lhx33ygg6gbmfhz0kav84dt6wx6ee5mggpewydce7jh8miura4u152jbenyxn15ruzvm5y5ot9iqcxivcjczfua7xykx3lieqv6dnru6vv8n6of1jsjbc3svtr2fszylxzruce4lv41dld5mfxwrp5e2m4va2pekvsgdipn3pf3afxrrnxvy1xm9gf4xgei68j5a4qusmlejpnmy9yye59bwycgwe4fjsu1zx9cygkugsaxdqvhfe1nym36ngab3xcnk8dh6pycsk3ksi0eiy30dpx398g9o9o1y8s581vin96kmpvo9mb433cjb5eh8da0z96fg83u3iafpbkjodvha11hku8l4t5ivwcxnshb44yfwcurhrjweaez5en8lx1ifcj0g7k8tn8g17zuchqdccgt41v25ivy4xpebqjssqemzczltk71q4fjb0pjqqygqyax37gltyjur5k5ihqduc06mufz9indtpnvvw4ljxtf786nlh7k700h7xgpi5bunm9bpr7y9629xba19kyp5phf9ir0qvne9z99wgpyc3kzi1wbjj0oxefd4q90crr8u8lhys6krdh0gc70ssi8l58la6i56awk0yw3dncjiaxs3nqbbfkz931zbv585bh30k4xs6yh1nq2213hnvd7d0m4mkhl4qp070mrawm6501l55dx15n4gj3nm8rvivxx9wed6fd51qt1xzdincmes60k5oh2o7i3oln',
                sort: 5279218,
                administrativeAreaLevel1: 'gx4aru3k25g897v57njghzv2713xexavxgahca9sxhlcxjbulf',
                administrativeAreaLevel2: '4zeo24sph7j6xdecjt25mdebhpszkt1170rseg0i0s8xn6wdww',
                administrativeAreaLevel3: 'ez0dq0c0dqaoyfm1z14ysy6mvb8aunhw5021fkkfh9cu1vyrog',
                administrativeAreas: { "foo" : "bar" },
                latitude: 446.43,
                longitude: 336.79,
                zoom: 5180540404,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountrySort is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel1 is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'gb',
                iso3166Alpha3: '1b3',
                iso3166Numeric: 'eyw',
                customCode: 'jxkl9xh23m',
                prefix: 'jcwju',
                name: 'kv6r5re9k8p2u85dbsbgkwndne1p0a2zmcjzb0mli571x91wnmfrfh1j3o1ibdslilpqvjap40d6jro0tkm2lgh0ds8u0gquww5net8ou8i353sv733g2305t2i8ngd4wq9tzybd4qt0wh9ykmhk96d5ixgvlixcd5yotj9gywl643ay4b0vj7oqfns175d7nyz0xyv91ul903e6dzehr3dsy6mhvf3wq5gqww2iku6x54xrwdrtarmawbfgujl',
                slug: '7nu5zdu0yt1cyu8j8nsnu59jfw1yp7aa25ncbsujn33l1kcf33vawrvph5fw78o6o2czquae7v10lz2w0bc9g8vcggxa0z0gbmftkt1ctr683leaa9fn9i4ei5a02z79sgn6ys0z2iffzb35tj14a1jbpk7ghn9znb34izph89cw6537wvt95i69m1sh0ps4uxguee5r3ib46o1b7gc5n2d93zp0rcb1kjxhql1k39ur3s8r51yklpfy2zcf6nj8gpwgrfhpmmeoqk083vpqxzlyo49o387aosubmysgeqqzb49reueqr7lvh4bbqvtgsogqb6c3cvnlp5gqcr6yjkh87khi2dcoh67od4r5a3cesspr9j49ipi7vsftemumr4c11aowoi9jis9txq04zp4xcdi31bx9l4w26klbm0jfcgcvssp9l9vl70fuz5se7esbus4qv5w55yyuccam5hcapmlgu627nxh6jcbzjeorhv73qseohaqeo8vn6983x3vi17avumleml0a7t43joigjrpepiplwz65kfzepi6xs7buv1pndu30ppmyfr9aibj0gbpik4nje50de8pmct95finfv63knadh1oq6b5nlihl00a6zp59qyg506wf67fjnty1wa1nauskve899yyr34e7ly49we5dcxtuq9wr6mleqnq9f89pjbtvw5zstfrm12ppezy45zyrsjnmtlr7omhn96k85rj07iwfcqwzffjizmn4ym02at87a1z0pegqmjk6psr8hxmxbd2c080atvabgozfffq0yn4okrzw685yad368306ztsnzxuarcm9hq8o10465g21t48yq56u01joeqqqpk7lyl4goh0a3r4yfqc1nv8y39dtmclkouo3k6fwcijbh5sdnvsh10yyykfk9wnrcp02cyu03fx9rxgk9sf53h251fdhmmaapg38w7un3l7dvaxalr9pl2darpqwhmnqtioqvpl7gtft91sin80fuhahaoyxcsd1t',
                image: 'dc7do6lzou4e0aimw53wbb2rzhgfxlpl5ot84ynrvjwsfsu6paoh6l3x90ajh7qivp9xmimw8y9bv6knln49x8cmq18quwkhkidyay8q8ktht8cmsp0yb0huitjs0423pdp7pn2qp7d9qcyn20025xyl05uuu2whgypf0tods09uoxjparp7fa4c1v4awozp3nmj2k6x5t5ykzayhc7rqppkwh2unfmjtir3ugj2naj4t6ree6vxgokm56sl5lzi6uq29dtpcm4vry9kcb8uxqpbth0xjuq7kem3jxb9rkb2xludqg69gurkos8as9hon222e80jod3ag9jscnkmtlo8rliza6g4czgk0unqq5wy8theyorp9mpc4zcrq005aymvdeqkbtisih5ya8dcygnx3kikkksh9vzcqgpeu5lzwslosnm3hm9odgqpj3vwfzej293d0ea4vbp0trsmhudnij1upclalie6798d5owh8t0fk8lawfsxfy0uhae21lw3x76j753ioyyhptgxa4swqnmp0ioa89htuqy8nj7apfdah369voqp2c5wm92fcn25azn97g0a81cerh6ywd9j6lta3st85gboi165llsx1zxdx9t51qnz34342xf9cdbxsrn764yr9byyx1pv1ln7jopwk2yxrly0qvsq1sln1635tyod301phjwsl8jz9xb3oj6cz31jx8vsmupk9l7emi62l7pfhtinzkkk2a05h81gl9ajp403o05ebws8lqfvf34ceccv4yuabmcwecla1j91e29ux2y4e0l4byd6ui4w8pxa0ok9wuy9x5hxihvzn33uvdurtxw3lq0rorfh34yokfowqn9gvoa9xerm6xvt1ejkhxqritdijj17yjdx8po9n0e0rbjotohinv8jvkn1jk6gbxz7yv3biru1wvsxeju97hrmxrbg2kl4rywalv3lxlsn0m9flhjffhs9gfy6vm9ob6pb93mr6ro6xpfsuckjzaeqxq9wd1x9',
                sort: 689418,
                administrativeAreaLevel1: 'lf5q13f40erv1fxtl6gxqc20ht9oln62w9dm5sl6dr92udcxd3v',
                administrativeAreaLevel2: '5xhikymff4bz824898zbj8nve1vvurywqch6nw98ucpwkj1n9z',
                administrativeAreaLevel3: '3i1r5i39trs8cb3swnap0f5qnyqxr5u2mn41lebi6bvsr3621q',
                administrativeAreas: { "foo" : "bar" },
                latitude: 361.07,
                longitude: 143.96,
                zoom: 4072827186,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel1 is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel2 is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'to',
                iso3166Alpha3: '1cq',
                iso3166Numeric: 'w7k',
                customCode: '7l7betopey',
                prefix: '97jro',
                name: 'od2hw6lrbmfsijayg5mo60avrdvmnqjtbpsy7oszlbes5beuf9pabcv9bi4zvcx34611yfa25vt7i29wg2qaqwt9gu2awlmmxanxspdd5cxla9t7yaqey8ynxxbxum2o68wbxheefwivjpry9eopu0zi15wspkuggtc7ne3oba0o3ztd9fv4h42qjpt3ym5t378vcsc1mqc409vebmao7hbaehohq1d22rk1rbml9q19y11w17ybkxnjw298h20',
                slug: 'l5g1jnwy1mrosrdu5aij09npbp65gfmzuer3i2tv0xky5a57fit4z0qthfegl8s5biogbcrh7gsfuk2ie7ppcqw2itr30q2p8senhzn5j0o1u2dcgmfka6lj2wxoqi4pi5pz7uufxoyavyf9isfb4yjnfaf8mej6x5r4q4d10avhtmyqji1d4wzmillwwyzw5vokna3713utv2zj6ios74i08e0gi7njucq8nxnk1vx4sjf7t5mji6lgfh6si4jc96y44cv4o50q9iaj6ddb8wbeuinwlpwvc01ra9vkubl6bljnhci2417azm8128k58ij9epjzxkk3z0hzsm7p11swt50ml5qr4iikyj9nrtk7a3iss0e6wxupzq4g6wim6qnfqcsyh04zg6jg951f1c0f59lz1jdyvtnb137jt7fy81ez5llo6dbm6mc5mlj0ftm6dnnbxea2mlne49f063l6vy070qqtv86kdnz8bxunwq877lxkyx739x00bw1auoro2kqkui9c9v1ieq9qi4nxfv1irtaei26qhp6khgqmmzvltore26ojgwb48qv9hwborkxk1tcywfu9shoeif12nh77da28o021zwlg89sqssk2gsact7advpxy4m34r4dx3nj29ezj21e3rs00lfwjsaq50c4sgmles55n86j3u1c9mjlkcdfxdv3glqga9r6ce7mbpwtmsod7zdyks3jrjepgvvrqukn8hiddfx7m56dwmpd3h5svq463monp9o2reb7jcpum5oaxecrb7tl6dankrkcolqx1c4x6f3ngwbku1po4j54m5oewnjcghy3uypzf71wofp5dei9s0qkamhjyj334vhs3uvnpkyj7x7pjevhug1fhjsa2illapn3wqg3zjva7uxssgdz83lcoe2jhqmd64sgwbgcy3ezksk9jtlvp69qb4lf43xiyrf9q6zqnvvia3y3qa8wzqnzz1r3jex95uv4vbfexkhpup9zecjlpqylre9fasm3x',
                image: 'd975bcf9wrciai23a9n90fvvfua4ijnhdb7rvze5wv2sljt7abzcyj7g3z3aoq62tng0gykaz7vim26k9l1cjz5y1a2r1qr87kpg1zt0ev9a2uv8day92mk4urskxprpuenruofc6kisxlwmr6wyksado82ge1pni8d9gca8ntr237g2npof66hm6kgcfg8pkq5csged131r2gxpfa05m8w1dxjfhpe38ev29p2q6r4osemgsxzsg67ba2518kvv2gg3tkxm4cpzyzkn2jjy3exy13210zpm7k12kqy4qt7lm82hxzdqfi8pzudqbrh23j9ughxn26rvaqdc0lmp69esat0bjokf2mu4ryhn2i5bln1d0lv1cxsfddngmx9p071le7u0k5lvpls9t0hu807ba87kcoa1m38b72jrik9kedlcy3hw9y6zle9d7w6ryz8r7p4sg2qaxm8cf9552yg6ktrpt1lzz0poz831gy98r4jtkyhu10ez39thpquefqyx8fjapj1x88j0bvmzpez59anau7hz4q9caf1bap2mw7km4xew37pfy49f374fggw716kntn3nmdntbs4d36c2xr3gzi2cohglzh6r2ojjrd17rp3z06if5tsq328ctg3d6kny8ggo59i0zloa2m83lle3urmfinpvwa0p7f06xf8ywhphqjserkjairwk97k5xijx5h36eaupi6iuiqyzxg03w844xhcngcqel4qpm6h3uhnoaa1dki4ruu1ebqjy7enwo160phbkeiw9ys1ntpt69pa68uhastfo3xhvsngkli7kxs3pmn47cce9vfoljnigg4kentbvcp10hrhhhakob3kc5ne4gaqyzvnbykn2pv9crp8mafnsigw58dqitsub82s1m6ci59rsfnm8l918wixpxtf6yxdzhdn2bza9r6cqv8m5rdorkugmu5k4i9nbhpxiz3pc3t3c88qnyf929hdfsjol03dthrdd4ibl40aufxv21p4i0t8n',
                sort: 102167,
                administrativeAreaLevel1: 'wg68zijhmstz8qdqwf6da1wvfrvgitnw2dh90pcu31o8clao5o',
                administrativeAreaLevel2: '23gvas0jqk5xz0wq74p160d26umymeglzqyqjmx1g2wp7y1tbvi',
                administrativeAreaLevel3: '8eq0yksfuti2z3cx65820jj93k55zxuv0qncrfixf7c48ln6f0',
                administrativeAreas: { "foo" : "bar" },
                latitude: 410.84,
                longitude: 375.72,
                zoom: 2265129814,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel2 is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryAdministrativeAreaLevel3 is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'iy',
                iso3166Alpha3: 'cnx',
                iso3166Numeric: '2yu',
                customCode: 'bxyvknght2',
                prefix: 'dopzf',
                name: 'hvvno1ws7s6vi5sbmgi4vo7fslqkhwj6sk612jhtkdopbpqdb2qvjqjy40o1pup41o5hjf35b3xf4n2it2kml60oiv6trhc46hgsiw5opu6p9xdpbq7kb8b2x0quttt47l88yckxsx65l07n7jyj5nm07i9oaygam9d8jcnu90fl6t21wwqghlve76tcs5yhpsdqm5juf3napwk67mi10aijgbldnx8e68xjhwnr0591a5kp6ug0gu9b3811393',
                slug: 'awan7cpzbq5047kvagpmutq22wd7l2vv2r2fwshu3qye3ic6aqp7ahyej6brbauzd7x0ydv7g7mhmz6bx7ygbgro78tkfa1g4vimhmy9zsz9ptnf47w6bz35r5mzkrpvjbgtdjrq2oybyfhnhh0gim72o8dqksvwwdaa0wz79cywdt9ouv4m5gcustmbhy4ljc6hwsxjpyil1h09xxyv2vgaskinusegbzdoiz723j3pem38zqrjqyw64t8dza96bxd9u82i309mlyyps7f1vry0v00mjf7rb0me29rn4drfw93sbei0axedgh5hbzz57dql76evttd7yxywnhpnxyth5uutx2x3e76wg52252ub8o7j1qnrw3mmjxjz2zzr2qq4hy4pn8ala8id0y73zcuvda8t06yq9wmi66c4nn7eppsllfd0vyscp886hs2v0f0oo0whlezkqtozf71h192imdc25zxj1deb921fwll0vtp4jt4av63bs9is1bf0kq5pr5eaf4b7cnl7xynrzejoohjcw1ep8yiwa62dewvotsllivgtnutuzha7t2thkr81cqb2nx4t81my6fmj0orct3zjjt0mubfbm3hrwwo60h65rwschcmhv0421a1zi264fdam10r5556bhhz9ge29z6nl5hju2rdx3r2q3qxsymjfz9vuazi85ijvjjjngbs077slsq6nt1kaqt8du80p1079y45he4udx9x3j90qg1ycuvpx8pehpecs46o5ykao11cze27gkmddjku5gi5zyl1swx9ysruyzwdr7knwxyksmy8xofyt7jz1z8em0zfn4q3fe2sagbemtuhjclt3m625kebeidwdbhgbf87hgbo6yktveauxk3xagoe2z5xq3tw8rg810eo7b9dofywv6m5e7augtd1va7cgs1ovhh9q0l07szmiis4dhaee7quz0jt7swojajrjmsi2ctjmhglmdg2shgzucievin1kbjsy0obn5qm3sd0ig9a2',
                image: 'z409mrlgtcvc83qp5wy43tl29cfjq7dkfqif5nyas7xn4azw0hnre8240drmr25dq2njfxqbm9y8yxbsn4eg28k4ypec81022vnxdhg76ap2xljj1qqxin9vulmmcokn8wkza01kalowm01gd3ex803yepn3qx36co5x3r5e3ff53rupj85u514axs65gucf7sy8i1iw0skie72bc6733l3xl9pto8wu7nq2om7ftrhgardq2qza3tf1ksrhwr7f2r3m11bbuw1w5n1dthg4r1ciyrgxo6gryufjer5v9s8bfxthljvzwv4ltk0yzjky4v44a2i1kr8gu9ra6uk6ojkfnb2eyek1lixavsz13wn9jmpq4zlg4ajblzvocq6yninb6ehk8zo5okoh4b7cxsusx8ttyzvdxbtukj9q3evwyq3mxkc9qi3k8tvrcvda628w4i7ztaa4pm4bdtxjopiahk00zf8fos69hc5d1nysp8gye7pfwlk75xekgunm6fh0prnkbo98fhs519siallxtwz7meemrkhl3rxv21oh1gom0feog8knbyl3syqy7ch13exw94ffs24qnxofdpttnjeuhgy0guibw7ti4hyc7vb6vprpu8mpve2dx5wh96ey2vau1mrjuf9muhjb8mctcf4gfol3xstnhur5cfjtn802nlfcal9icectqpwfvrtoh60apyoukovod2nbd01l644j6gumyklnpyczq4yr2ndmto4fqxkfx77osytmh47eeuv00tmklbnbuyj41r0pi38252ckg4gjebfc5c11boiu4nm6v1jwppmb5eyl851en0hju54unjeutg1ir6ss1nonrasrdpvulyj0xbo7abwqre7c8zq3pcacf3i4c85qz5905ks9p4ljxegce37h8gsx7ri6sz94hbtk3ap914nz9qzm0u5zrfxqrc5pojz2k81d6bdfwgvdvjiuriszp09l89zd02vmlihmgzelovkqa75l10dh126jxj21',
                sort: 318495,
                administrativeAreaLevel1: 'vl2qsbhlq80pjtjr750v5vcvhaizmc9izisn6s5tgk2zi8qi0z',
                administrativeAreaLevel2: 'tv9ntbbpmgxou0gp9zgwbhfcnuku4919vyz7dw6ij9obnz0w1m',
                administrativeAreaLevel3: 'cb89pp5ckx5u0nspj42612zmmx7los98jb0tw93na8c7mgotadk',
                administrativeAreas: { "foo" : "bar" },
                latitude: 301.90,
                longitude: 791.30,
                zoom: 2047058224,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryAdministrativeAreaLevel3 is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'al',
                iso3166Alpha3: 'w3b',
                iso3166Numeric: '8vs',
                customCode: 'ueb0njdez3',
                prefix: 'g7q0e',
                name: 'y07aitwi5fow93ofwosp21ooza4jna4fskr4nlnzvmmsb1d5xjhhkbgcghog7h65lr4a8vmd2mw03xtrf3ba9wred6cujjzmutxllt0rdzq09fsi7axzc4qojwqkgxbvzeynk6fodth95ugcgyejp5a5jv4bngv7vt19cvkp1i33766e5c5soptk79s434eh40d9kq6j0gh1tvoijorbyzt9q7lyg1k5ewml736289c9w9i8otom6sar1asm11a',
                slug: '063qf58zehkv0fy48jodnnmbcgeks8e7pi4khscykohybz5npy2l66fiadf6vjpsw75bvvvm2808ys43yvzaznmhu4extgj3modtkrjdgz9dorvzr2m6iznck19kk0nxkyrhmlkkipsvulk0jsd7ebi963y3dp0rjuf54sruua2dgkmh2ugyok5sdtumc1nh2qvdnolxhprv8vv1x0kvtwdjlyhxrn1yxldguxkcfxl3p53jbl6n1me7jwo4jp766ut54x80kyhm6pzqde7uiqou95uuxizb8z9hjahutx1lvam594s0r3rkm14yxvrxra8e7ge66sadm7tq7j6d6s379voxlyb35jsv0ijatycgroy3giabz634b1if5q8dsuq47uxgcofbijbf2c4l1x4qfhkn3gzewvxtgw4n6ry5yhwymy8qkshczjv65pevpm7e4m4mgekrec12fhnecijz0kfc5gnn0ugeenumixdsxuqh7tubkw04cxswfstkb59wsxccuolladc66in3uirxfb3kwikfpebzbuam7ng20t67tu1wt6v5f34cbr3ypdmadw9gf3cs5quheq6hd09fx7vehernnr8g1i9wel6tq4egam63y961iefzdj6ue1dkpnn00mejjmhxkj5mlsr9ifellpj9l2tyjrtl4qirj3r4umiak8fohvpbr7f0f4r2ace4vs3gxlvdiz29wxjnpkowxzdiy213ry7erqxk7c02ct10eb0c4mbj8yhmo56vmyf7guwlptytid2cmb2pi8tnahx5hl9f487t0x7cix163rjtkn9cobmcypwzed5769r3qxgolyasppavch0s2tqwgkuezdfr40vvi2sbnfhj2i4mreswj9mc3faq7lzmbalkwkfo6dgdp032whlkojssyzh1fcj3rxfv62dlnl1p435txb7o0vljmv85alhla84ty1tqsq7jgfh5h1sc7cdfqtnz26wldmbc9i4fx51af409avp8lsxblrjp',
                image: '8swzwy1idwaeem83pki430h2o916ftak6bxh8zqqvrwknhb2lg89tnnvhwo03kny579c40sudvydu8e20pcn6aa9pnxrwhkuf3wmldeyyjnwsrz39u3vuwesdji4vybp9mpeviugj6sgondxvw7vrzr0eu29bls29mmlderhnzoeezzpgq8xywi7as1o96embz1q5qbmx94h92a4nmb7r1gbgjymzex5dkollpzohk6q88y8g14o13t7qket08xar2kzytdmsf1gxm9j0386mpb0s6c8ztdsiuzjltcxox7plln61q8u7pxfzwozqoxukokh1rskf385zv0s1aeliwpm7umfmly3lnayk205ttxtoj7gzg33klrajwlgqayzaky53748n7gz3zmrucnj1o2v6mgg003glulym3l2k926zs0s7crjzcq6m8t21gpbl1ushum5m54phghalqvndxt85s42rtha9kuwg6a9t17968hvb18bccv9wdy1qj6q2qxee5kcpeosiv9fds5eyiq4yqcy833h234tzqcoao4seu069w1hibf8cu3kd5cb1j5d2prnt9i1df9ipfgc1q29eh37cg6kimwhl6d80gatb1cxk8vx4tiq09cnhx4puf46ubbcruu5l3acf2on15ulf6eqelrcuno78cj3e9m21udalgvqe4ecb6v5rg7uvx3wumroxm3owc4fxvyc46vrs1ypbv37ttaz728kqgxtxgf3aahqj9flx0kp1g7yihqfllogvm1evykweybs6691nln655cn1pqyn9j7wb0n3xwge6p6v4q6wq9tg8tsf8umka432ekdn83gtrz8sccc38sh7b57vnhd3k2xgmz9a2im3i4eb1iotaftgn08j1075w0v220i3igrexr9mn06zh8tc3khn7c8thknajvpxltj5tgoetb1s1aysxmujlcnv79xcnsehu6hmwx55grjod466ay0y9sxqyeytcxoua9miouwu9sfsfbt129l',
                sort: 898496,
                administrativeAreaLevel1: 'm0vx1d3nyv5s8seynn126uku50ft9ir4h32msjd0ncs0zl9x3q',
                administrativeAreaLevel2: 'xk70lw6g0gxm8x3ty0rn58p6xza6kt7f1tv87dptylk72tkkpn',
                administrativeAreaLevel3: 'pcxyqlaj3tjbndzyn8e5vsx18yt160ldrrvcm8h5r98ixe1qdy',
                administrativeAreas: { "foo" : "bar" },
                latitude: 626.54,
                longitude: 699.45,
                zoom: 86258948250,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for CountryZoom is too large, has a maximum length of 10');
            });
    });
    

    

    

    
    test(`/REST:POST admin/country - Got 400 Conflict, CountryZoom must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: '7y',
                iso3166Alpha3: 'nia',
                iso3166Numeric: 'ly6',
                customCode: 't8qbow3e95',
                prefix: 'm93lz',
                name: '5fnongzpn2upw1fpnoo8rhis5l6yufb8ty0idxwre5na3h7rqpiie63k1xlkoesnel5czm7y3jg4ho29e3we4fors9imldofucy0c78qq6a76d8h4nvgvn9lgg2eotzt1br83032wd88k8uhc3ciea61zrqv4gopy3e0q17e1hysjol8ixwl4zeusfxo4tow70v5ardrsxrx7e65fkjcj0nkurdq7ef0trwwj1v368kjr5dfbj2llvyklqk8fxg',
                slug: '5vv6q88xpdfp7d0jhkny243bkkgeh6cuntjsgrtie5yxg5hs6xy6ssbseixjxvq5nle1kcn86zl387j76uvkubz5tueo5nq4xk4xpetrcu3q0fkcr20whsggffth2ih5gxplxhw6z4nwcqitsoizuibm4i4he99izuwd4atk7t6cs4yfgye2p53lnpclztczf98ow02pgzm11lphvrb5d31ymf7rm7big7x18rmtbr9xc60ekxkha4s3ubt9gl3mmomvo8p7iiza4wjjcwszgqvjz87ect6m8ur89cx43s1fpwy433z06eqi9lyefvf9rp8f0wdxv0dcxypj0mqq6wx4ganosz69omd2o2b27ff4vjcolwowwhaxeiho8ek87wwy1he02t13l77jb7e490grblbdr41tkfwrio7ic2br9kdn8yjqqy76wt3hs9dpiomz507a7svqutne198siwa34dzutgzkvg7h3pvrm1o7mjhwiqapsjq7i45tpbcmn3xiugo13wytbo9sfk3ygwvmgxut0c4mxxpvw9f7shs542uy7uh3qteejjwp5s7beiv9yfbxe7a3d6uof4n3f5jn4h5sddk6xjwbu06nhtygsqdy5rvsdcumupvd9qdhtf7jdyplkjtvb3bc6svlx5zbxfvq6w8by1lyw9bd3ij2z0gqo8uzn3cob1ysynnopy7wl0ioqg18m1crtl6omifm7d0cw134pigxxjgyji5bq7z1qh7yo4vur2enhkevp8f0j5sg2kt44hst2w0qo082uc7d8e39furafellgcsa81v3kny9pxywq0iz7c6kygqbag1yssg9jk65r54oq52uasdzzxbmxkebv3rfftu8cnv94furl4g3vknu4yvs4kudqvujfpeq4vslj8rl9a76i2r9fdp9cf64irm1dal3dq1d6avlxr5ilotbzal8up5y8beffr3tj7s12hhfbein800zdpwwohv1s05sinu248k30x9po3e890743my2',
                image: 'wz5oi2puyj68o50jqschtpjz5zlrjan8ope082fjj2i99607ro2rg52121ghwvvaf3zzsqfi4qst812ncx1cqh65tkwnnmwa63u66px29jteejickjwcdknx0j4edh2kdv1zmud2srnq4tuqvf88gia6dx0u81xw33dg5ik87jz5whnwn4wk3v7apcvwq75qr0s34anpr4ifcih1x1eeh5bkyajuo22nkq5xgop4go4mvnynngzta9wd0t9n78xvw763swr4unkbgdp78gvcumt7ujokh8c84cfgfcn823qm718l6c0gy239cngopou1gx1hb9proegts6dbvx421pgrwizcshgcxh08dl564sjoq4n8lpebcufes8jc7rv5bcexg1in8sy3fws568s5dzy6a1piwn171gj08v58p0gpfa1ow1cn7i7brkm1gjobrfvsg7uhb28jdo71lwuool5dlhnh6g0py1ikt2inw5sye1runlys7pgz26g4ogg7akcvkt72q8hxuw8u9lwx6xxdek4oyn5ox0k5qyrdw5f8a17tpv1fjyj9qhg3gd40njy8kj0vqqe4igiw54erqt6equdtbsh9hgbyx5dps35msm7tzbi94a75oyc1b956o3teohm3k9624qp2jxjvifihxc6sauv1dxge9ern3tui3xny6rmm2dxljphq5jwo5qiocofe0tkoogc79rmt2pkv53p6a9hru41k8wlgc5ecm30r3ybg47oug5gkyoswbxxtr833tvzfk6ylc2djwwwqbaaapkqmy0j1ian3wsalhgqyecx72xi5x36x9fo4bbt8lkhvgtkhhm7mjhe1appv7dwmdzkxtfwfb4y0oc6udqc2oxcyar48b1ho13asrlhxd5a7gwzxo43rcpksmuidh2dxtuiv4brdp97g9goqh2nzvjabm4cdw1urtnxhzggsraylap4ewmee4bmxi4wbv0e0lm3zog680je3gidsie5g2ql0ivxrpf6m35y3',
                sort: 698395,
                administrativeAreaLevel1: 'c0o8ue50gnug2v3sr30kusoukjb67l6046s8t1onami9b0vcb7',
                administrativeAreaLevel2: '4p56nnge1js2xvt00gbwk2jhnk1ignonztfi2xr1r2qm7i42qr',
                administrativeAreaLevel3: 'jnbtwzxcmch6j88fqp5zhn3htct0rgb2cvegd2i9svkkfb2cq1',
                administrativeAreas: { "foo" : "bar" },
                latitude: 215.25,
                longitude: 323.53,
                zoom: -9,
                dataLang: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for CountryZoom must have a positive sign, this field does not accept negative values');
            });
    });
    

    

    

    

    test(`/REST:POST admin/country`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/country')
            .set('Accept', 'application/json')
            .send({
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: 'jx',
                iso3166Alpha3: 'msd',
                iso3166Numeric: 'eyt',
                customCode: '8iw8abmqtb',
                prefix: '9wrgi',
                name: 'lk5ukwlnpk3eehz49zfdrkx2n66ybvf87d2xyoy0jcw5fk5zkn1zh0daa7q4vkmxhnzp73k7skvlzy2ei0t349wx33vrkz0wgx9ow40wisftzfvst65yatya682p14vhs2s6qfbp08748yn2p0gpqw96efobid3m5tbw4lohsfuyz3kpoyfkii0wzjg9i0piikyvsoxnpq6p18iuls309gb946jyupmtd9061b5gz20sjgb7r8mky2jxp6kkdg2',
                slug: '75c4gn3xs7ziul4x4g8gs35qvw8vgxhp6tqcuj54qpb90au6eeow79z5iin5344gpji270nnnltgrotxd083uazwg8xtj99dspgmlbyx5t3zytpdk997ojug6a6ufneqi0yrxp5ymhgxp5yheqddv1vs9md1yikv625uir8fsrv932vsqh34m2u8goz7kq1d878jujob45fqpreuok37mhzee8ipf7l7t6ffz20g8n6likmsmr2d1gb42uz9gu8enub8kc35khliip2s7ra4axvvh02q0sanv63n5mqpulveb7a49xr71gmrudjpd0gjl01tdk8755z6ory0x68wy8m9k6bh8kyrcxfnj7znhqee42gb10fae7cmvm8ovgv5etvkr1gv2e1oppxhtly7gv36jwzkbqvpb19nf0w9el9u0jvylady0hhx6jx5kl0p6uh2sn2i3pszmyhjunysxv9l3taw0r4fqtn801r7xrkdx8nhazbbfqlc4wl05h3q736h5sjjgr6b2oevpg1ldv4q8qs7uxz1gwhqnr64sa8ji2tr8qczr5l9137cfu68rxr8p8uonj2s4cazt3we8n61vcgcfduwagzrw8yqz0flltmdulxh5oe6a742j7kep7rc71orxkkd03crasnj733akau82iv9asys4c4gzcl42skbl5cdkrop5d31owewxppxoqomsi6dh298bnv8pevl2sfml3i3uencco1kqwew0r2cll3j53jovet747vumtrsq805eughsn7ar1r5sammi4vtrbc0dft1hfrt30iczzm4dq0817lknq5na7q3081bi3m41c6pjciffqy4ig8gi3we0p6162rg3btq05llfx03u04wfu59yc1py2l2msdw9w09ljwc4wefsqtfknw87els9p4i9ny4fqw00hkxq2lbmntw483mb9029x092k74lbn04p9c2xwjtucez3ay03hqahkqvilqf2zcfzxhbl5s4nx0grq1q3cth734',
                image: 'mg5i6dia6rxd20xfcv68i5vo340e8yjan552u9kn6vayp2nab8401dssm87y0g7sepe45cn6rn7s9022uyq4yb4w57vdjjepswe9z2ied3sfw3i5wvdu6zfegxn4jqb10uzxv07k3wddjck96pujn5hrhmlhdphtugujyiec6p0mr7aj0eyf8q7n3j08spyg4aeu532lytmm2gy905yxs8irk72wupjmjwp8izpal706vhl2oxuwisk9ljg610ketky6h0yb25cxy01ive70jdscay48cflnj6nmol09346xasukyl9c9o6zyajuyyjk72iw7a5s5797ur8097xloc87jzabbiaufwji9tswo5njc7e4wokcx5kpvhnozuve2elmja6ujcf01h7mh0c8t2frbwetuch8t3hosyivqvoxse8vble6mi5le9hd4lsed2hl4fgujo5lt3fu870ra6lts1vlv8hurveg4zuy7a2g0h1j2wouwiz4g60019iu5gdxw5oqg7i3grm9b78ucj5atqntpm390fbf06pynw2q9g9f92607lf67j2z7x4annkfpj4rk3g2x1wg3v8ssmrwsx3da74gm0mqtpupr6545yypc5j2y4y2q5qrcy7l309actvfe9p341toa8yzl447zwdhwvhoicwxqzl9q6a516m4qess0jxj5ylp9fg1v0f1baspev5c7p7hytg0zhpojo8b7e2hxs8tvimh5hc406ukfh7yrjwek5xxk3dstq6pcs52lwfei2n2uijctmrgeratg1499basykyrl1crfcddklftwhreqj3msr6m8clq8pg4ajdq9lc1nba5lomo95nwzc5m9fh0u0zvldw34jmndy0fx60o3h8o2meyxr4mxc9y12idl6ux8f9tcnzh4hi1ners5avrq6xf3ss4v92bhlclhzx4dcb4fb853qxaf0cvp0647fyg63i235ab6a1dbalahyhdla5mypsalvpytbwu3qbv6wx5da3c',
                sort: 981725,
                administrativeAreaLevel1: 's990iq0qp5olydc4vxvibis6cuxrfb0ae9tqyxgfqsuoxx9onr',
                administrativeAreaLevel2: 'glxmnmjrrwio8q2m5zg2tsry7gash0bleckb96phlnokdkvs7n',
                administrativeAreaLevel3: 'mdjy641wlyu18no2b3oocd2rsbr6volxo4jciahwy0ps4gt4g0',
                administrativeAreas: { "foo" : "bar" },
                latitude: 600.74,
                longitude: 125.23,
                zoom: 9878887184,
                dataLang: { "foo" : "bar" },
            })
            .expect(201);
    });

    test(`/REST:GET admin/countries/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/countries/paginate')
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

    test(`/REST:GET admin/country - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '26939b8e-934a-4dea-b98e-d748cec33ad0'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/country`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'a1bc66d8-096b-4326-8134-acbb78c63489'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a1bc66d8-096b-4326-8134-acbb78c63489'));
    });

    test(`/REST:GET admin/country/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/c12a1d85-68f6-4c01-af1a-a46917cec621')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/country/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/country/a1bc66d8-096b-4326-8134-acbb78c63489')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a1bc66d8-096b-4326-8134-acbb78c63489'));
    });

    test(`/REST:GET admin/countries`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/countries')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/country - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                id: '7c5cf6bc-d1ba-474c-be3e-ad7556d191a4',
                commonId: '7cc788d8-e026-44cd-b787-db8f4272f669',
                langId: 'af21895d-010a-4ebf-be92-54ef42f3716c',
                iso3166Alpha2: '1c',
                iso3166Alpha3: 'wjs',
                iso3166Numeric: 'nil',
                customCode: 't01mod78rx',
                prefix: 'tu55l',
                name: 'eyp8znzyy6bm0henitz9gwehm6ezx5ki7y8xuj06shc9xo6oern50ci6abaiynrcie1xznvb4z0f7zqttp40fzpz3ukglkie0wavquu8a1h4n5wi8ozqn8ijh8fadjexd77uliasfw3ln33dx8a3t19xnfkhwj0coyid5tnznqqafntniyd5a9jb6lg14ebwo0percgavxgnr1wp34eya1e4j1x2vlf65t3ysmgczfn1dvruo2itwdhmitctzfh',
                slug: '4ekkr42l9p6v47125im3dd47340dn645ju0gffgrv6l8ha1t52731fj7ill77fc68nbs7jfg2ww2krs26b5sai45pgshjlp0ak58wlqa9lb0jnydztjikhm6v7nvathiw10x3sodss6e4epfuvgvetz0yjb43nh7rij25o9xw6xmtadue39028qwamluyck56x4an0fb4purpt9swfl3736edij2is5yfz104skkdamb2lgbb99h4lvtbqpx95x3xyfbh4claisk2oglj2wgmf8yozkiooa3i8l4rkiwswmcp9r9q88xfg5c5s5dgtanv6fwoqpn0ejwb6eq8zqilgal5tbfenze7b38wc9l2wak06zrc965ycszyugggw03lg6uuwxikgd2ofpdfxu5azajj9u5y4kky42msanohpqe4rp2vanovsn748cd9y46ggnh9tuczy1zve91rbz56c0yip2xtxd4jeb30ghz2fm2m863vykyi4pdwdp3fnyxac6npe469m9x5i2muqv373k7eoxc09hfhtwch2fe4pynpgorbecnqvd24w8nqz6keqvp5e0n9d94en7spb5n18qq6uox2yb0vu94xgnfk6oc6cwicr25rjrcfxg9bp5nkl4ben5n02bdaa5n4opepdgp6j9qjaw4trwmla7kwrr5temi6gdg980snt3h7ymilrmhe1obktlnij7a8158eq7jjylhrpaux6hhqvyph5sq9103a61kxh6afdfcve69okflif3lquvv12o4tsmd6z1obhwym2qna1u1xf9zfhgawn5ylv577p57uvjnf9srr5i3dik3174xxbfrw2dyryy4nfjzr5pjy0zajdvm8ppox9bvno274dualf5a03wp7u3b1fr1ho7kb27xaqafgdyzm3i527pe5ls59hvu919g9z8vijbs458gzoy9uchtqe2a3kjh0i42vkrbekttin6j3c6ymfbxkuel5k8w14zs1x0ibau4p1cetf1f1q3e',
                image: 'xv9thok5b37lyrh0xu1iuk33cukzocx0f10iwj6l1nz3je41q2qmn3tm0k89i2g9in7mo3nzhx464u6hm9bcer8mda4c7rn6ynpfs9hpwrc9miuqld4rilgasyv46xjqt8r51pff37s427x6pcay4e4bq54emal8fan58q8w9c3im92zidfokh9np6zzqy86wxyhpxw0dt4eu3myp3w72vdwgglp26myw3w3t6wyh5w5p5dj7xr4mnptfdqkh03d10wt4fg3rjwsbg1ts2rvs6la05lke04zcmisteq03jn524lzl6cho1ur7lltqvwf004jin5n4pprd3perlrkh7iatsx0cie8ip8i7ztwql9pgfl4wkg14egctpx39itdpn908lcz40822nspnk25f09r2ghq329nixpt5u7n7bsldgcde42exzqsyeyh9vbovw54yx5kb3ci15isrdijtmbptuai9nxvqppnka8rmpyuch13qwzmt5pnmd8qm2v1efcwy1j4vzqbad86ae6fxll6hjkezqd7m0iokahxepcwz5kvqeipwpf0ollh8pmyax2cx81wci7ysdjflr9jxs9v6evucak8rprc366narj87fmh5zbfo3eovf1q3r4d3veoiaqykad3c3hgiu22ygesu931nbakynt8zinqelw9wzr8d27cpnui8xq8ilp3jbc9ezu5kjxq6ff6z7rmoek9599ebuvtpo20emk0f07go62haa2lsik9gygx8wgqw7fppq93uh19ud2eg16i046hdbmykg1bp4w150uyhtl87hc5fwhuzcqckk6h6vk0b2niqtukqaf6w3j4beizsslymyia8y40xs0460qlifshoxxp8af3hfk69gtftpv2kgp6o7l76075r0ezq26jemsn5glovzvg438tpewwsa7ndfl77qf90z0n6tw4zr07m6o2oi46w1pr8akphfaezi08wgnv0qq5fdq1uk64vkky2wgz93tieq3z4zy47p5l',
                sort: 619634,
                administrativeAreaLevel1: 'k8fsp1dt9amvbg80p6c8gp3c7pj7jotde3zoxs2btpg6qwsm7q',
                administrativeAreaLevel2: 's6hk9hvkiu6fz131emvpavnzlwjmmklmzeey0tq4g7jmho31vk',
                administrativeAreaLevel3: 'gjgrd2b8v5hxebw928o4vwkvaqxydpg4yppa1i3z1hz6efhpnu',
                administrativeAreas: { "foo" : "bar" },
                latitude: 145.02,
                longitude: 233.18,
                zoom: 9620393617,
                dataLang: { "foo" : "bar" },
            })
            .expect(404);
    });

    test(`/REST:PUT admin/country`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/country')
            .set('Accept', 'application/json')
            .send({
                
                id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                iso3166Alpha2: '2y',
                iso3166Alpha3: '7za',
                iso3166Numeric: 'we8',
                customCode: '4jtsdwfh6o',
                prefix: 'ntmi9',
                name: '0eaz9bfvnszyl7rcwja7lw4lm8uadenwpjb3ksly4nsedkrn0eyrozbpemxhc8hkdmxmvq6ij8ongl5ovae78ixq8wdzjl2bu8z2ayvlnq9bq16obrz5v1u40phdadezsirgfrc8dduls0f6rq3iv9guo6riiuba9lm6l46zwxd3nqk7e2scau8czwrg5nw6utwz2p2qox0x7fakrnurjpx8wcits63zfuqa8jlzuoqg8bpiyn3topjxyl42noq',
                slug: 'fjz5fdai8btmfl1d4l2aernyg2di6qtk412520o6p9d6h0rkjkds77dvqiy2l7wdsc29ynyhwp6vdurgzb3an1837hnctp5bpw14gpo9zbrt8m2bc2xb336nfvi9n75blsgtpzw0qedi81k4wwc3pa0nhpav76jn930mhtsul897yp3plye3elm3xgtdkc0tvrq7izws7qdsfvfsekt1r28sj974ljmgf9ypedmoa852jv91g5k34jfwy0f700soctmixvs3w92wz46srlboo5fgembe5n19r9u8uulp8hi1q0k8d1v6x0zsper78jvpv4e9bcjh2edf19mqgxuqzr5b59hddd1ro7ymp6i27iwl4cx3r7c0g0w5z2wcrma6gby4ap9riqbhm9off6nw3ha1oe6yxc52goqgyaqxn2jcwk84921ih17icfpru17q33jypn1cjay2kvcook1y5igrw3e468b055jg8p3a1fh5grqfe16qzt9ovfb24xzlohey2aviwhw2q38kvr5gbmefy0g8cup7pma9qlhu3702ae8vpxd0spvank3b2oil4u1075fo7o9wyt3bmgo5t6goqsejimnyy8g5m61s6no1vjjgsut4b2vqznt8nrm78yhzcf7m89b5com9062u3oi39hj1kf0eonfumqtxnxsh9fnyep8xoao4rca09iafc076ngd7o9000d3yzi87yokp51t4ho442h1snynpwzm4awvtys2rknz0k6a9l3kivq1oe3t789hron0n63vw0ib2gznemtbdpyuu8ybtv971tk7lzxzjnvl2ynpyjlncjf1mhnmrwu9od3bgzzu997yzv4z7k5iyf601x8c6n3al49hi6aootcka97l7zs62i0xhx63nx3e1b79owg5k39x2jh5rj9vvurn40b4y28uo4n9krxmy7prkre9e125wggz9o54blp32x8lwjw8jmiegdjeb3ri5kasrklfa9cea670i5c6tt432x1fivaal',
                image: 'fooqp9k2abhremajz1v5t5gjramtbzupjre0axtlbapty7tbv90ti0nrcztyh6mmcgsy5c5t9xg1z1awimi6lbes3euqlmnyo5od5wxrlwrx4f84fp3i97mv21egvtwmdyay9xmhe1pdqo4jw9oxxkai5g06vz62g51k516luwrt1mpzcr198oi3y6r5ap2v4aqw53nu65sspu3fgalfvoqzzu9hmjo6sy97su2irszofzvktdqqlghm6i619qqvvq09mcujnuw3mqy4br4tsxy8cmgz5zhh1xk77wn1ql9ky5qse1dvayvbpdv3o38d48rs52th8yiatthsi55mexnn9hxihzimqdiskwtewlmaemmimni69gwv3i3w9tcr8tta699zs00oko3b8qdkbap6fcwd2cwlcncazd5w6tipfg3rnj6ltiymxap7w621gaadv7ml4ii2u7w2zinicnruueoeu2mqfd9suzt53m3r2kicohhzpeolawl6m85ryi9hv68gcvihoe724o1ca7ht0qddnh47svk1l2f0bao7tydjl86wrw0su6sc17za3jjfutxmoys9jt5xm9kln302k6j3hdi6oeea8y1vzrajcbilvfjoa5bc7qmpstcxif3nmjef3a16xjqzjutu9yaov7vwglf8h1ybsolvco9k5p5ak8q2ct1m9xp8kryd9jrli3blvwa97ng6kwkgf0w1kf8bmdfhjhit9v80qiu2237n4khqzgzomh4wc7fyko50qqn1ihud9yofc9g4cyauoq1oj69427fyauoqip16qqquvozxeubdqc1h1fq0v6o0teg74h7tfyn5uk6fqfiwy0whvwcj4i5p33kou02y9xumd6ud4dqwnluidyg8nt6roll9ft3qg2k9j8xddfhmjc59270azbz29m2o36suybldr2v1fcmyvjjodxefur1pcthl4z2vvmgqe8lr55qvd3l9to7sn5u0x3mygms0m7m52thb41lr2i8l108d',
                sort: 638088,
                administrativeAreaLevel1: 'i7k36mkl0esqn1zuw1iu3atpjuvjaob1w16cpanz1at0fpqx96',
                administrativeAreaLevel2: '6sj2thjvs3uxlp9ph3bqjrgc8tmpdkjraznlhed2xs3kyoskuv',
                administrativeAreaLevel3: 'cizr3ymx6yr1toai8wcvco1zv3dn1f1ydn68ixl6p56juyl5ue',
                administrativeAreas: { "foo" : "bar" },
                latitude: 454.07,
                longitude: 438.90,
                zoom: 9956010240,
                dataLang: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a1bc66d8-096b-4326-8134-acbb78c63489'));
    });

    test(`/REST:DELETE admin/country/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/8434dab1-16fa-4d72-9b0c-1d0772b4b2e2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/country/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/country/a1bc66d8-096b-4326-8134-acbb78c63489')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateCountry - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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

    test(`/GraphQL adminCreateCountry`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateCountryInput!)
                    {
                        adminCreateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                        id: 'eecceb61-19e9-4c4e-ab90-4e6ff1ce64da',
                        commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                        langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                        iso3166Alpha2: 'mw',
                        iso3166Alpha3: '0fm',
                        iso3166Numeric: 'wym',
                        customCode: 'm8qwincxbu',
                        prefix: '71orw',
                        name: 'gxkoegpbt1alpqq4fauekt8u31k46qs16s3vhxzre5298nqoo1l1asvu7e57a3zjvg0p8e15ollrj34nww08j8ltgjj774mzg7x71v9q7bjizwxgfcgm2ona3ix4e1k6f2sy4zjt8v5yl3hi6djzt0821z9vxuyfipbrmwt9zzc2qgi0zpq5n5h7vimsaps3kb6jvpskfifq87y8yrbp21i333jqp72n235znko2kbc94tgvr2wt4gdmjxrpwek',
                        slug: 'zmtjc4uh6c94oxwsq5vnm200mzh95jf52fqp8ji5hghdomiptswj2ju6lzkb84cs1x971lzqistkdvixo1icmwktvcpy9qt97xbt84gyck9hg0m6frp9gk23lgngxe0qdo761mj7gwq3hxsl6cavxivssd8q4to5yzueim9wct3wniigea68v3h2m79cqak4giq3u9st55hwbu32ng5z5hicuk6koxkwg7v4241xeegfub95vqahoetik5ijx67fys88tjjl6tyjmpls8ykkectd540y9awsabs8yf6cld7jw1x81fdrglsnd0c2qo242o0705wgvr0lf9vjlskb4vaedl8nassgq3eoza7x2udhcb4cz2ca9977zmnzrukj53k1wju3ob74lzk9f64yp7zrdtg9buzjsc4xrkoxrtjuzga107e6zujezxtntspnfkybzs3m2vujab06s0a3jbkm2ye3v39vubtwoip82orafru6j1amc9isnug61g6a7bcx92w4qaigss751wslvdd70x5txx4p6dn2guykhb8it0u6alp1im1tz8txz3y4d300bwz25i7vvz2az22brz56wrvnu4c562x78h43paj3se42ocsg7ujar00gxtk7p2pqzn1ydvplnqvlwngwftlpamh1oinp0srhjqy8p60rk57tht04jguqm5z5pl2v0fw8gl3yjx4mo0n9x8i5nda5mx3hhnv1vlaj0llewzdpcvspox12jivnz3rtx3z2dt7mlr5herqsf2sqkc757icuqkuytx5fyrxcl3d5eaefjtlpb9dm7ad3q4mc3652hcxxk896dvi2525k2uai72fpjvlqaedm0aox77rmv729633ud302g5wstewimqhykz5ecqleggmsf26ja7d5m5lax3ngp5v21wbblzbft2qihcyg1kraj9ucfxd8ib5vfuv2wpsta4x2q26cfep203mho916szf5obi3rwtghuhn9a61wnktjpanlxa33728',
                        image: '71j0a3m5zq02yhctwcub2puatgscz3ziek3p570825izj4en4izytixlvpmsa42lm50timksqtdfu3lwsl35tjh8cjs5e9of7eicpaxnnb7ztu6snfuwkdg3llkvoomu95vju5ntezst5lkkry6da500zw0atos6c7m5utermoffd9e2eh84rb8pz3mf1a04mg4i1ql744oz131qlk29vz1rqz1ouyirmbdjdxy9fasxf38chgvk6ee6rjkytqrms30kp511toqxn0caovfbhl7uilvkxn92d9vfr1s0xusraf4bkg65inu5zjwfj9tmp2t36ga8src8g7s82gkvm3jri5mxqcsdhd6kzrbse7naw5ebrue5ie4ujlapnmj0b5vb4uw7fu37277khfze1tg5a3396yqe29v2b8xn54yn9o4xcos6su6y0y87lfcdqc3h8dixbwoblkwyfztgqb5wb2g7a0bk0rrf5f5a6bib9pvk038igvkkigx4lx1jkmaemxtvgowliivbvyqdeoa3ha1rvprc2rl08rokv3mctscmeevfj2zx465ssnoj7exth6tion4lml3gfc2xz1tuwexu6s8pe6xql01s6228nkvotb4dlcpzvb89uwuvei0vfui4xwg2n7796ki3boj516gldavk5tsv1jq0jqzfis6a66ehclht78k1uzt1le7aybz91s4jkeia51b0o2g9w0z9xx6felyvi7m3gaf6hz33y920qp1krl0u15jblzv9ihj0anuln71t1psrkoepdqrmlckyj71z7yw7kmivwtv2g7w7608vq15lzv36j74d82pidmctpssiqbgyytfzgv464x1ivmdlws2kjsxj11gk42mrgjjvc29y622ru48ctk7xri572tdxfh7z3kwyjblmuln6nlltznf8xh25vvz23tb1nwb0t6g9qgd31vpffth8yp9xvb7v0ao2vfogi3zy6ut9fuav4j7idu9pez1yn4d5gyu9bk7jzi02',
                        sort: 634657,
                        administrativeAreaLevel1: 'hg3rap640l7trber2xgnc46oj5uq6c2uneqc4a8y4f3tb5jopb',
                        administrativeAreaLevel2: '90pdk814f8o8vpf4fyz8lfjiz53zg92781biz00xyyylp610ju',
                        administrativeAreaLevel3: 'fz3n1iie1kk1iidu08omcr7luk8ixncm3erbd6xv02c5e1j7yx',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 92.03,
                        longitude: 779.73,
                        zoom: 4982635240,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateCountry).toHaveProperty('id', 'eecceb61-19e9-4c4e-ab90-4e6ff1ce64da');
            });
    });

    test(`/GraphQL adminPaginateCountries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
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
                expect(res.body.data.adminPaginateCountries.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateCountries.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindCountry - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                            id: 'c6631c67-af43-4bbd-8bc8-4e934536756d'
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
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindCountry (query:$query)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                            id: 'a1bc66d8-096b-4326-8134-acbb78c63489'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountry.id).toStrictEqual('a1bc66d8-096b-4326-8134-acbb78c63489');
            });
    });

    test(`/GraphQL adminFindCountryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                    id: '8819e756-ad4c-4442-8785-37742565c7ee'
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
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                    id: 'a1bc66d8-096b-4326-8134-acbb78c63489'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindCountryById.id).toStrictEqual('a1bc66d8-096b-4326-8134-acbb78c63489');
            });
    });

    test(`/GraphQL adminGetCountries`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetCountries (query:$query)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateCountry - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                        
                        id: '018675d0-d3f1-490a-93dd-da578daa6b52',
                        commonId: '557e3cfb-2a8c-4fc7-88f9-019afbad050e',
                        langId: '9408b827-4b78-48ed-aec2-2b16fd6f558f',
                        iso3166Alpha2: 'ui',
                        iso3166Alpha3: 'g3s',
                        iso3166Numeric: 'zki',
                        customCode: 'orm397tpld',
                        prefix: 'y12kv',
                        name: 'zojg89zjprqy5oda1jwk4vgbzles565023mxeh1f2u30vqqsq4ae8vm89bazwe8rzrzr8tfhoswrie36qbqyfst1re6l02xddrxaf3puogo12nwzb3ggl8y440ykbzo3j86yg93ca39dqf3hhkkejzqxbd00o9xnflfxzytv2gpgs14o194utezkm6ely71ohjcg69ggvtb69od6nah6s46vbpgv8dur93s8mx96ab2fv2vxlehpybdoz7k8743',
                        slug: '5xrz48blbdjz4d7s51gnchb7o22onpnfuo8b7iqajanrsc7vptv7aibzo1df2wm1yybgt9qykjx9bsjgfa424v007zmbe89ku29bndu9y77at68i4vmy3cxpeccji2d7iu0wj00cikqf8hi8s0erg05qc5pkxh9go01g449v9qkzhxzl63oo7rdlooiycv36tix2o2fw8kc24xcoiaez77namoxm9598a5mmuy9otbnsbfg4b5art9xrajip8awpzd0hjl10x9a51vms55fch8spt607ugskaphl8cbhllpplo4uojtjx7n1891exuo26hzcrjx4uy6xgqde3dxgog1aaf7ue9wxgs4zxjmpaknt1fwvfcwgusze1nqz7n4d19o75hmsu6pe5oncnkn0dlk12uwbhjths5xwavpqu9y6dcigiexo1393t9u9c4tvcrwyrtl0mdbzfqpfgzci1etfp7ydy8tetqg1o08z63ii4vq5xdy5ku1e5h25cbt9qpz90uhbcz1mlztwinc8pkhthq8up2vgszg0eeoizeldni66wlgvrw03p4ht8ed2jf8gc64mt6hbzhr1lu6lwp7yo3z4l5x445x0ukfm5z2o1tftjldw9u02nsocyalg258sjmo92kutb5wof5dimeqtjm2lwc0slc7jmz1ot3kyv8vck0zw6vrs9vb9fvfi9wq7khsljsdqv927xisgte66t8qf30g8idctg4ggruasu588jwqgzangph2wm03gf2wav5luou4c48n74b6wzx8gm25detxv1f8ayistrmivs4vdiu87eu66xg52ov9u5vb9ltfu39g3abyfzj61j51r0xanaxhpyqrlpzbs59pr2cnebg3q1l63ochxoihtu5osvl6by4iov1jyf5rvxtibg2j9xltyxqexqd2zg6t5v4bozb4b6kjitx30nd73ggz1vmblhibh6yptbnn2t80noqdjwtpgpkg8rcjxelghsg386ebxk2ciyrbckg6q',
                        image: 'wxh0qydcd3lns0s7bx21hd5zlbjn467tp7kzqsued6at3qqq6ngrl9fon3a5ofwo1rnzxu2faloqtlga3asq57tj1fbzl8b8zci3uzsx7e45kau5k4iooc96r2uqprmjwq7tgy8e2do2labw2mzzk4c6o7izczwt1pycgvu1zdz5bml1d7od728f3adw9tuxtpy6d2an004mjh7khtwy6maqfw0zqipd42siuscf09cll7kckc231cx8seovrwqefw8q1c2g8s6r3h9go658nfd1yjmaciv8reg6586h5ij1jiakkoejwbsntef0ggo9rjsmn87fgaiuuzeod1e8u3cgkakayfkjlveltkzn1lctilng1qnf9spmgpt1hkie84rea7bj1pakywnptw2dns0xclexuvuixcmoahxzndxqqfn5e9bm97tjjo7unda2ctvkdhdnnfsahptaop33lgfuac9w59h3qlrfeg0a9pnhq4o47ulkorsqu5skpx4dx9au2a20546okb7ercqi4cwh5t35to4x9t6vetjxjs2bbnph8ytq03mp35wefy3fgag57ki6sovhyqfe7e9mak3603v9x9ey3tlczhuhdqwg9rg35swuoj5ftp5uqvjgifbmp1unqfpr60yy8jclbxg6go4bk61fuihjrywnquq32wqouuek98lv5g5yccqtj36ezsugi9yn8l6qthimq4vqbw5tzcthhj2d88xmeahphpl45l7gw1dvtw1t9c8gl1rho1hpqie8ibju7p1bjxnqob2xvzo01hbdhvrbqez9e462t5jy7l9lm27qfkmvujkl0sur86iwu9s3y6tefcq1qkf9fyuopm0gllrbrunp8acp37e2e8dqt6bj383m1cwuattdl4h0grat8fde6dybb7fdbunoqq1io6568ex771sxr441mimuk662a4zj2vymi0pwdzuftjw6158t143lk93yy9so2b3pqegmbn859p2a3ql3tttp0f16a0sw',
                        sort: 122471,
                        administrativeAreaLevel1: 'k4bgb6ekhrsbb1bz2wcxvzv8oasx7nqlthbmnmtj9sg87a8t9s',
                        administrativeAreaLevel2: 'cecrh375y5112wb6qjjdqchowxe7jxgpbz28vbc8ynwi0ilot7',
                        administrativeAreaLevel3: 'p5wbjtgvekm3q0g4foq7jvkv8sz40mbwy7md9vnknf7bqmmzng',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 160.71,
                        longitude: 475.43,
                        zoom: 2591837785,
                        dataLang: { "foo" : "bar" },
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
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateCountryInput!)
                    {
                        adminUpdateCountry (payload:$payload)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                        
                        id: 'a1bc66d8-096b-4326-8134-acbb78c63489',
                        commonId: '5a9995a1-0d6b-4e66-b1e6-aa1480982d69',
                        langId: '1a905c48-7f3e-439d-b751-6322c379d168',
                        iso3166Alpha2: 'sn',
                        iso3166Alpha3: 'jat',
                        iso3166Numeric: 'x13',
                        customCode: '52y5d0x8t2',
                        prefix: 'mhat7',
                        name: 'akw9wf8hejf21vc84uc5voq7i55o784xolkfzw8l63o022876db3ojs7nuptcag9nut0xgbxmfi7vjjionsv8px9ch5hkzop5sialujdfs7qc377uoj0xrialyplxvx4f6px91s3ilx4zgnpqeswli13pynudnsv8rylyw2zkuhvgstr0dub3iiyu55dmnay90grm4u7al8m3ej0fyepvddb052fzpxocdutqgsa6g9f1tc307h4ooo1sfo8pcw',
                        slug: 'ljgid2ilw1545nrg4belotrczcrezaf2oimqom98e4goe2xnfotlgfxo7dl23lb1x2a76hhy7vl4hxt13z8slkv8nzn26mrq70cigs6emowyqzaa41x13957w3zxuku5oksp7h8g8j92l76730wdzkyed7jz1m0aoj74xfudgvet8vna81gcus2ir6839knf9i98c19oh2q86jbqdegaimd22i0lyv6v9n5cbynkrrrps5ge9ccuyvorfhocxf8kr3b6wwnaso1iz8rhnctmeda3s2xx4q5xx0ihy4zeywcj3zebqppmcdykwqj880nqi4y4zmcohqr4wpygud6fgs4tmgjangl3sfzde5d2ywv8odpho78b8n6p3zbq9prte58int2gm2mnwwulbcj3q3jw7yndptokmjclph914t1ufgkqkxnhxxira3i1qft43dylmqey5tj523ef3ux6litpg9mei8ag45ukwl0clsl2u5f84u6thusp5yfv84jwcw7js2hp834u4acv5608ghfd5u5w9nielasofan1ni5qrzhtyj6crzy8rftummcc0do2ubupr8ni92pzds3i32k67bwttgeaxgppfft75zmomkm0g6bth5rpgabt8r0a9w7sfy6pyil1r8kwr5po16o04pod11uu6t5pjus94d7beayo7q7ej94qsetqzir9byz9pghwvhwxtv6o5ccibf3pxl46vogiusy229tl6gickvoa5rue43mfcnqkytk83x2gjbbl37xj9xaffgfndktemt4wafvc6cws570b4t3tuskujoc9orlctd52ctw0g5ga0xoods78d5935jcm08792w9fy3shzu7xoe4t7gddlscflsmu038955y0xteo6vhtir0pu1lwntszsrzyk98ftdy60bkj8sg6t4z41p2dd6szjwv4u8a0vlcwfxczm5vyobfj2mittdvfak0fjl9lpsgpi3lxu5lmvaf0c8rtu83v6mym6m5obx2nrhre',
                        image: '9bh22iacz7s65ez7s0io37xoi3l250sq0rjlrajz2xxy4czcd3hub3stl9k2jb7vovjsjk507v56eiov95krsoczq5v331xaovegqnuldoxy8h90vsm5ng2m1hdlfj3wfe1q2l5kiosbqrubd93ti0hnqeauht4q5deltkypvk9e1emqk82iddsywmcwgsonaotdkrn6rh9zdohmea8bjqbe4s48vv8oe2fgj0y83btjfi9gn1iayxga6vh8aolkwt4o6iqy0s3m92zyu1irui4mv9uimn1ris07xmkexfxzidjvdz86ey1zj7jzmdctsllulq22hukfqhxvrwmclrv5nl8xjbbmanh3matkou8qep69v2ae9g8mfdnjcqnfy1e39p4vn77x4lfpxx98vtpbw1rfvbmyq3sn97sffvsmkdsw4wq8o0oh002ayktybduyiw0qx7b6ic4d6um2y8fduve7iu5onr5xzu3d7oh99t3gw0l8nhykc1rin7hix8xh7d8qx1v5g8s1k28xuyz7aoixl9bt7k0k1hjgip4qq61dxrog5cf9d3eozl1an7a61c021ssr7uf6jxtc6zzlhtd7h3gdbh9j3pfwzynb6r5jq15903kgks8oe7720jleh3me9dw0j2t8nm4vrod3f7bx71uvni6g5pkm976hz72m2syzvbftbbpninsuxjbejntgn202krveq4b17zvrb5lqfdqxouhvnowllq7ebsm8t2vri6kcyrc6ici5hqffmk8ygaaadlln8frqmpqg6uiyk3fhgyqtamzci884mvhd6l8ixv9vajtzm1l685micm9s1mq9ybyonsha7uq4osrla2rf2c6mmih9am0t6xxbavbljkrv0cz6wfsgff6wkqcxznhqjmhcohaa73iyo37imnb2973nqihn1lysom8nvqi8mg41zdc34hw53p7p79w7ztnlu93h83uoc456tz0hqnfruos2fk2ylei59rsnnaus4rsdmfr63x54',
                        sort: 899575,
                        administrativeAreaLevel1: 'v9ryaorqaickd8d92usl1vra1i88ctdp2izbhpbfz3mhwzyxuh',
                        administrativeAreaLevel2: '03s0a3dtv1ig7dy3wem9wr3jva6ew3sr4dpycdl33ef4s36he1',
                        administrativeAreaLevel3: 'ipfmv70xqy89c9ilfoh98ozsikqj97npn4e4pm4oikkkh32eq4',
                        administrativeAreas: { "foo" : "bar" },
                        latitude: 553.88,
                        longitude: 21.53,
                        zoom: 4283214351,
                        dataLang: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateCountry.id).toStrictEqual('a1bc66d8-096b-4326-8134-acbb78c63489');
            });
    });

    test(`/GraphQL adminDeleteCountryById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                    id: 'f44d767b-7ea3-4c13-b511-df3f3023dde5'
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
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteCountryById (id:$id)
                        {   
                            id
                            commonId
                            iso3166Alpha2
                            iso3166Alpha3
                            iso3166Numeric
                            customCode
                            prefix
                            name
                            slug
                            image
                            sort
                            administrativeAreaLevel1
                            administrativeAreaLevel2
                            administrativeAreaLevel3
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
                    id: 'a1bc66d8-096b-4326-8134-acbb78c63489'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteCountryById.id).toStrictEqual('a1bc66d8-096b-4326-8134-acbb78c63489');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});