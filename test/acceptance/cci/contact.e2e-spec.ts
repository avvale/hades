import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/cci/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/cci/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { CciModule } from './../../../src/apps/cci/cci.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('contact', () =>
{
    let app: INestApplication;
    let repository: MockContactRepository;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    CciModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
                    })
                ]
            })
            .overrideProvider(IContactRepository)
            .useClass(MockContactRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockContactRepository>module.get<IContactRepository>(IContactRepository);

        await app.init();
    });

    test(`/REST:POST cci/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'g05wdj30qjl4fpnqukl3zfzopl624oye9svasnzsruvacu4az4',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'r2v1e72z9wmsozzq0f5o',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'hgqj8kafgjfz98usbrhce41rch6v2yh5q4ovkaj06abu87k5wd098wezrkdd7xv4fitag9xoqf2iuuwa6la4yrzv8jdx679iy075bql2894yyyl0dogfxcbw5jh1j6etw23mk2dl71boyn7eqhiu5kva6udc1elzqhocyv65mf869ke1n2xugrgi85l6jzgg029vhi9f5q4smudl9bweom4o8nkyvn64o0fobezsmu6vqg1evlybaeis6ekpgxk',
                name: 'n0z3cd19tcvdowj7sm4twjr1xdwcx75ap7j08ji23rykcqbug75tewv0gc5iq7o9jsxhzmps2k9tokvvdab1mimm2pciubt6a6w8a2cr12m48sdumfiy98gwm0w9zo6p5z5k8655dzuhkdhh8qex7uor8uguwk4jq6wmu68zdq9l4r0nxfmt4j9zix91u80c2z3xhbophmywq5je8f4u679ue6i4q64nci7cfg4aqn5peylvc9hlatwkugz7s8f',
                surname: '988phw18ftlyv3nrea861bfzwac718x39ced1zdt65vveymd2sl3mfvfrypke50829jrrtcjcsnr5cyj5kslm9b31chv8f9o897rb9mim3r7jy3kkb8sdrd0ku4w18yes79zndxdhlvm0av5cx9tyxxab03cptkhsfy6hnygb92q6ns90dqc61k2gauhgga2dkszjd39okpfmr0n19ozpc4iem5me7798qiatw1o4xda80mh3j4ld0f6tp4pdk5',
                email: 'b4me5217cyin87w2yfpsryo2h9fn5fvk5memkozvzw68lk7pp89mdh1htldluyjkqf3wcvwtv7adrj6fdjdm78hj1qy8q6be06lzaqtldub5l9ewkqdhfg2s',
                mobile: 'mfqwbhugrkc32sc0easbizk30mff5v6vqb2esavsl6xq3k6cxv666nob3nww',
                area: 'so5eunpx3gr5k9wo7vlj4cvpogg335gcm0dl4ah7y9yt52yqpon9gqlu5di0q5gmvaxruhjwvrn6a7ztp3krb9l2v6h72segjqvuy26zzz0cds5cacgg7x6j0mc3xzl70f5lzz3i1d4s49ywxwci7jcp88dh0j36vlj8id36nwaey1pgvokxfxf8swgjv4lmejmhj1q5z7clxsdc5q5wl61nqqxyfy1c61gvyl0vgiz28i5dcq9o9ultsacnnzo',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'dk5lw1y4jt1ffl4u0cczityxkgw6x69l6g0iz7a5lhf7fazvzz',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'f63jg46it0saapqsvrxc',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'y9v77gi4utbitg4q12meodgesacygeo8ni17mt15zc8esaujjtqcgulv2wej4gk9553tezznyc31n40wfw36u9mdcp2eqoiyg9810b32d5vadj8uk68q7nh7xclxxvoxw0tiqgxh3hetaucsip2vhqfax831zn1y6kkozx6pzij233h5yvhdbd85t8t6mvru85nfqajn76holvs6pzkrd0qm0hajqmghoegil8oshfubfzftog0nnc0617l3bs7',
                name: 'toovbermosvoznz6ltvyeuzcojqau1nntoupoyqm4za7fx59d5bquh7y2gzrwqk7uy2jccy53unxsdl756m9dyne1vnrrm8gvo5lwqv46ut6ed4g0kwq8tyfy36f8eo9dghhpa1y3cx4lu9medn2ik2qryif5ufxxk8lo0dhpnds5xp4y96k9aerrr2e2w9cwkrcmuykfl5sdssxxpuculiw1dfkm35guzgzleptsxrquoyd8jx0uvrsxx5bfgo',
                surname: 'lm7gi0dj8dfh7q588oazbszt695n95vil2ug6tg1902yxecjy62gf597q8mo4kqlcq7u2p9izzqwwomqx1b9vb6o7sc0rk6vmcdosr93yqwllnjesb2zzu3jcxs4x5jmvj1xhjaj0mrts4h21djt6jwbyaoe2ekav9fgpxo0zzq28a837ni15kxs02vcb2dp80ofwlnwqvyyae1ll64z9coe6fyd389hdt1u0wo5tqglbeea708vcrp9rhp61ah',
                email: 'axcsm0th6aerjkvqcuxexlsrh11cnkpuoxujlw80z9feni0ipv9v64smosi7lmcsqdt5omme45tyszjr5ifoasbut1vxl6yrpo9rhx87y70u8xgmgqmp3dp4',
                mobile: 'fh1127okpvhe0sm5b3l6cq6013dctsuzgj670mrq3mk1xu2blcgdl9ljznd6',
                area: 'pli0nxyvhsgfpxacbsdvy49rdds8g54h6yo7sq84g6g12rg7xnb1ubjp7pmh1lqmmu294c8nhmaybyoybzh6spsdaha0uzcde03wb2aeobk0ckcfzfawirrv4k4j98u3nt236sxrefu099ep1v3xjng8cflx2kg7pjdhq7ui7o25wf0680idjikp7577p28pb8vw6empiijqplut3konypb15n22770juncpxktj3ekzczhh35ez40ds43kd0wm',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: null,
                tenantCode: '003m9agr00ihz4vohagc3fno20e8ggvh9828j5e9xal40p1btr',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'g0ozjk8gikp83lbk8zbr',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 's95m54tl0wmd1kz4hx5tgstvyiwdlrw5dziij0amkf8z7em55jipoqrbzvirdwyh15zkj0dc703kwnoh7ae0dpoevpyoq5sfzv0qlrg4badkw9yfu8wzwugcs8mr0dm4xy46sobnitbd55he4x89iqtai3lbm4re0j7vhquxkm4htgsbkrod8asr14d04x4pe6licr40i30dqmzijcz56xhmthlwhqch3hte7ktzpl9s32nue6e731bado8cmuh',
                name: 'zzhfo5p6o5hzroi4xb8f0ipy3qw4f7pxjlg3krz1v2e0acalb8nn7ghmi5jrbzmq5c9zdkq5osh2ud5i9s5jvfmdielb7planu7nbzvkq5btqs8hvqal54dydh6pwp2i677gvtd8to0rs1gw7a23yfst8trvc9oswmrwih39a47c3bo87nsy2qqvto1drtkrs8fdhl1j4u9yilrllrw07fb8g94e4cxhufgtkw12boz3muam0hszgvxnz73bfdc',
                surname: 'i4f7qak9ts83acwkjl0zat1sp024d9mtk03u1w3ig00oolglai21tzwxcfhxdl2oie6e3smk3p4jygotzzmy1d18u49nvbo9496ka59u3y0wzuuqkre71nx7ivrkwyouwmm3qg0zid1423unfw0pzwqpdcj03fzob0evj8lpugov0tomk0b3jnsgmg088fma1aiale2k05ybirgrjzi66byb48053kp0m4j8ewwpspk5h50vo7jrnah5y7gggqa',
                email: 'brk79hh5ihql36z2my3n6t52vblxyt9jwq95mqpxntfulbyg0khn16idvpdkfgao4k3ybeqmcps9lmk58tqmo0t4u401jhtldlxh97xlckho3vhla3eetjhj',
                mobile: 'kc70ez1qtus4l20xf7pcb8gnwk8w9zusjy4zoso9iekc1nh81u2oeu5ec8tf',
                area: '4a1wazzrv91kilvs6cixqxuqt6lpcdh6oz0g9d5ci300wl2iwxl20iq1fadqu6ss0ap2aqwlrpwivnnjwp1rgy1d4k5pcdq8oao6rzou6148080v77kwugscqtgi6p9a92dll531l57xhitiu2qjrpu5cf7o6vjuvh8khyshvvxvkkanty7lud7t2df65pkh1o8kdbm4a6yvnwminv83d7vwxb4sgzx2m514ihc425019i5k9g0yjmc8yacxbel',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                
                tenantCode: 'takumzef817nl39wtp660qfbiu6ij3yukkc4njoyanupt4329f',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'sjmg86hhny9x1lipxwc3',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'kgkuvabm1xpqb38elcr363nr964p7csb9pad2ff75yc1u8a549l02nm4rpwka1ct0ziruk2r4g8t6qnmrvpfi80h662vvjq7rfl5gktivls8386mamg7n7gc7sh92l3789aj25e0cb1c0hj706jnccjn27o3p69l45qkuu8yciirebhjfpqd02tdb8upzykod1feingg6nw1llv18l8p0uuii6zjqliqrdezjs6xp5gw2fugjnc3i3vdcj07j14',
                name: 'cshdlwvmu7nijh647kucqne2e9e7sl1omw7tg4hn4iqirlnx919ntuead4ibb7mxooor41k5hiugx0cglk7x4f7owgurokzt6qeqo853b6diiihtgp91xs3jk497ch5dzmdhohrakjurxvyfjhq8uzjga4eqt2cd06iimhve252ih4mr5k7dijgflh49g1y7cifyp4qxjamvqpq3xpq9xzqjmddad2hlultchp68i0uimy1mqm94dg5ql92nmgf',
                surname: 'ufwy005w9x219quj88gofp33n9hfcr1ewg3v1bwzh7wgdicdsa97m6q6b97au65y4zm6si8q7u4adhyodjd8us44j35dr0wjhgfjasgi9nf09po2c5fa4zhygjxuae6yytrrr3ybph72irfs27adhg2i1w7jlmg5k0extfqgetnhncvp5ssw0eqf4hosdrz43jznnvnaviusbc17cv4g8d7k7fsttoz6kifdm4zzyk5bwlprk1piqdx6mpt1w4n',
                email: 'hgd0ykz2t7qjgz11h416cvghj1wz5ewm8kfdgxo4pis38th6uy9xcj8v83kn3ok4tr7rqia16xpmmsnnjwzpk1nu95qkj66ixrxo7ip939d1iklnhw98xzbg',
                mobile: 'h67lehiflw89wunxumxf420wfvz1rodsbzxver71p8dncb5s8f83clr1fqur',
                area: 'jw5rrber1qnh3vt2wphtkboamkdilq43ahlihayhmeyfs7em68poy0b7ef40wrwht4q1fo9wiostf9alewdo73bvzw9x2quiv0n0at2cttiyqlq6ch312nsx7kl4qfe0cuhhqamv8c472mj6q64ulxj2u9sn7omebpmz5751xm2kr927lp5749lahkm7fzj629wslxqmwxafyj80djjh4j4nr1hivjba2oz5n7w2z77znovstmy2wz4rqcmn6di',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: null,
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'rrn5wn95iqwagg0ojln3',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: '5i3ogk30kpvrk3gxvfl2u68d0q8d8r5uizbtghbs2u7xm5rohv765mh8skzo819juh0zoglaxoy0h2s10k7xpgpa3lyyl5izykfxuorkyd2qtza9kvqjyderrxvjyjo14z64p2ve8dj1yrcu3b5au7gtgf4oswaqmfioak5w4fy1ftueryhsqansnwvfxzgpwtcamv6no1xhynm592ixt4gqksl8a3u60f2c978mhnq501y70itrj3qnoj3uj56',
                name: 'lce2vaqx54onwk5nd7xnkiw1hg56jmw3fitb0m9p8s6n2ubdnbilevb7y91fejh3th3j1zc2uafahp8itrpy4xgszb6rn0yiolo9x286qdqovqoqavd2jgxhvqjy67mrsktub8qawic51me6o3neew3c10n0xtivw3cthds5qkpy63sif7pg0x73m4rlp6bxu3a8gc4sr2ehdd23pf5qt50qsfewae8o1mcaxficzma8a1ib1hqi96dcgze6pnj',
                surname: 'mfr2i6l4cl8inbyh62qkay8zdv63egvtuw9xjh6l8j5tn4bw3lue2tqkadt2rk0piia7l51ezlohf3g0i1myfs2gjyf8ybjgt3s9oruc7dw1faoqg158gbqxfvpngty1nederwp44ouejh3r1wzebez2cawfcuzm75so0413d8rk7x8i99feksigqvqvyq3k82hwf03wdqbyr64ns5lbl2pxlknxdt9cfnff10auod0c5tvmw73cw06fjv64d51',
                email: '9liydovm6iqyx3qk2q9hc6831ksn0anpw09zn9dhd7p2oshyn7k9ge7h0la7lu3btjrgs1zyx365cwuw1fxhafgoi1ccgm11l0tyjg4459xdqh9tpmse6tme',
                mobile: 'so6ohrht4d2qsazwp2nn8snbh7u50nn6rs8roadw5oh5iwdhp6l8vgeys2de',
                area: '32mb48duff5sljyiisdbb677j0thfqfmyl3wau7bk5sfjoctvogxlz660zme8vvpwk7dm8pdm967g1l6gnidobac4ycxz7ujql2bcz5evepha60a1xinlv63vb8bfm8d49zwzjiix36sw53rlx4xyl17sfz6tt6fqcap0k8xyijw97ylzhvqyeil31wru5jkgbpmet4iipjo9xfa3chl4wml8wn5jf1pd2aoc5h8v8itt9bqk5plhe3unq9elva',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'wzj6a1spsj6hcq8xdjuv',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'd8dbta38o2xdhuub2amxeq7mzjz0rww9tdwvm5tzaebaialnbtv1xidg6tnof7v6oktrc7w2isx5s0c6zi2urisskik4yao1fy2z7be4os1lbrcmd743qm5pbyfptci308dpxuggvf62uv3x0bx65y6jg2tb830duyags8pg081pvye7uea0vhwgs8vkq53q972wuutj36zivoza2hwzzigtdvei5vgjaz1cj2iwzpt0ullzvwtjhkwrqrkz6fr',
                name: 'ztb70d4c760zoxir0zcbfexi9th2j3y2ehh52vaqn2ty75tdu3uboclpxosx00z3eu1fcqgru32i79631ua9jkwbixg87de13ebef2ppt7pqjyk2o603s421i3mcy6bm5gduwhcskscs8lekdp86vcl4kt7n0kteqzrsn8svyklddxi51pqmaj0phg64jo3ilf9gq4yl5onygurpdm83qznf5i2htvhcaa0pe1gnqi129mkk8x5zed4z3si7cep',
                surname: '24zbv8b5jqr5coox0vyoohgq4jcboky6g0zaxmwc4ptt1jymjcc9461xcac20exvx1bdwe1ehj43c4ufrpf6zr0igq90hpb6457tqwjrxr8ozurskfpc0s1jq7smkvcwaasqtvs27oc8ktcx9eu4brye2cqvspq8hbs3jy5hnocsqtfsmfxk4s273cqq0hcn4zg9kblr0eqxy5mfjd780m95tkvxll14edciiw1kqs49s6ws6rwcl9cjjplrszy',
                email: 'do5fo6z0o0fi2kn6m9ov7y3khrzd340zxfpjjbsj1xskb5o5u1vqv0k64umtq0l72vxfhdf5ik8ekbo2ofmihps467vxg81x3o8vtixe9kn70630f65gs6vw',
                mobile: '1pl4qmtv9uk94gu7fx7ajke3keevxunjgp5160nb5z1ljk11o6k6q8jmkbpz',
                area: 'l9mie3tv2n96wtyc8qqayydo5c9i9bya7s2tv5y31fn4ubj66h2q4m79h4raky3kqitc2qh9i5lzayzwrump4gwemqf7oown7ikkjq4mdja3e80j7l3er4hgwnrcwf1g24clwwj2qwzeozoso3y32cea8qafhyqblm2tvqkdw7terw3u04nd2tbs9vk77naky20ui56etckl5x3bme4y976v3jv7aw6kqtf7txlzsfapmm7izaec65jh8giccis',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: '0hxdj7h1i8k71jfnv0idjezaqfimi8jqtlc7ro5ybt7g6slixq',
                systemId: null,
                systemName: '9y1bium0iyy0ox1zbmo5',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: '9ay2kejg2snr38u6jcnhupfgmt2jxm44hk9z0yd583h4169wikfgb9dxv5o9f3kwuybzmtih0mpk3jeghwd4kcoc06yt9jpci5harb5xz31c511r02wmeqdjxm97suvex2qrwz2a0xfd0msnc5ck9tbmp2wpp3fwkk6hjc33axe6mnrgnyb9qykvuabqwszsjumaqfvpu49ti2phrshandeb00e7m8k2ab8a8xkc5s5jznuxjq66ld9wuydu7ws',
                name: 'zptdesek2zy1y5ty6wzj3ykuggzht365jzuk5nkiehjiscxcwlm70tuk3duj03c9ffuew6rajpxj1cmevzbwk4hsffz482fxepiuged7aowzs9gqc2mxqylygj272ibm2b6fznjc04s5xwl4trcvzc9lmecv0gcmywxiyxmt17xo78knx3udtql4jzhm29bsslk7575tweh0rd01eqdwapw07vno1r3moyo1yxo6fu08ld2h8713uy83dq0afz9',
                surname: 'sg70x7z7ctir2xqbibg5s0zx3wlbm5k7k1auddk0z45itcol34wp87tdstf1yqk17g6f641i2lrcdc1mf2t2tv5c3f6l9hdyxmiercmsosl7269z6rftpmy34i5dayi9mpt4g7v6njd0irdneh33mn2vwnf03psy4pvq6378s7cy4utv69d624pmubetvfjg36x36dk7n2qqhoqb5k49hmi4bm0czly1kx6lan642c53hkd4r69mvmk4qhju3pu',
                email: '0tuvk8z148r6pimv7t147pvrub0wmd1eajbboah49ko9xivre47iq5g4df52fm31ryneg3m2jd6r0e87cfu8vqm1y6se37h33kr89ub9s6dx5zzjvzfhuwte',
                mobile: 'nyo23sjxbo63npcq539h7rdq0y2ewc37faffy94ia5u28xt5oxj25caaj72j',
                area: '4tlk9vd4exbx39u8bhwi9no2o3c9i48kb8x7zmfd0f6e83e40tcm70cpy0vaq5i0bvgdh4a559vyt1czgs0a4fq8re6r7uqzj8eu5vu06yx4e7rx1f5ddubmrojk8ecjtujuw8c4577dd4e1fwf83ddfzj32rlhnsvl4lvnhubl0754hd4at3eljsseskma13whrcw836mlq06d6rhk0ktps08qscnqsnwgipjc253m57omh939edob62ev5z8v',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'llzph6mti06lywgitqwt8l2aooys88mj9hioqca9rl9oxblr5t',
                
                systemName: 'uk2f3jpfzhxzkqrbf8q7',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 't819x3ybwc0nwi9o6618s1acwsjwt2skfi7nqa9ldu866oepjsdwmnq2al76rt3u3izye4k3do4rl8xs0ywn1nyz6itmk59zmzsgpqutvq52s4jmkemyetqxgocn4s0zzwevsb2zayoywxg8kb5krgvxbwh9ek3ptpu48aplyfrf1z0muytso4pa7c96nk48e66snwjavd8abm0rcblw8q93p6yu56cau68itdmtg8o50bpu4n4i8fl0ty9kgls',
                name: '1swh82uqrf70bk33hlgyoog60l6pb20m18hv7wikyr9q5e6pedz94m51lcwl92pd7qbf955s48gkzgtl4hax6g5rrq4jur1m5ib4pxzqlbl4r8yhu9h72wvetwknfgzivn7c3mb51ykyzz93n1k60mnir6d3p1hiunlff2xt6d4u23ei44qadoenm6t29wfhvq52ry0712wni3m0kzh5tcaqzjjvuoaapx0uzo65qjtwjy0ty83n0xhwuo9dsjm',
                surname: '5d478gaqbed3cocpjex446kjci688c36t3rce3sn1e4jtxyt9m5ghqir4ttsqopbcg2bmup5uc1dpntbjdu1es8naxfkf7ufj2n1tus9qu5cqhtzjfya3uwe2kw3bh6rxqql51sziwabmoy1jc260kufejxbe5bxuspcgn0xmz4f45y7r49a0zeeuesyokep0akvkzq3lc8kg044l4htewndwiovkbidc7o19yzbv0bogpjks6lsd70oao3499s',
                email: '7y2j1kmbfjdagomtlhy482lex7166oclu18lwt4ah26mxg63vvdsjpmmbjgvea27j45tv2rua4l1wm5x4jyywg129ia3vqvmlveb6lqxrda86ep810goqams',
                mobile: 'n3ykape8qd6cu6l0q4uswme44cecxnz4kjvsouven5ggx3l4ib5o5twclyjb',
                area: 'x3yagmw29m889xkh0rtikpqg6c61ej9tjcdlm3bw21lqw6jxloygwj8gm6nazvtx90p6bru56sj28i1c29j9cdtsepyqx5i5oqy25ssvxsx3l82zv0gpid0gm9p1r5ltzkhnzf1j4klip881265yxtb292285k39932kur5en1f5dnc4zl1zq2tp1sxur314d85dzi4at1gh95vphxswrqpnbwfcdkldpvfow7uppg6pb7e59lvyz6ti7waf4yy',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: '7oanoyhkujc61d1r72x4wkit4b2sdctaa3cdd9i4iubhouhaoj',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: null,
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'fvxhv2q5a3h93la9v03jx37gx15elco4anovmknptwsrke2g4kr7o1bd2cvdvkxfgotxl7atgjbcwg4c3hm6ykjdhsk1zwkkurd47kczm3ua42te1bvcoalv1zboyhy1peh69ntwgn2dun20c68dxbxh1qzdvhw3ub187s9oitqd4ff9i2iiohiq1m8lcmy8v5zbocirac36tjrp7bzu1lzplu0mnlrax7zece8k9ybtilkkqvjd8wc73ii8dqv',
                name: '8fvopdnplbs4zs9p1x19gvnuqojwyv64m2i1hbrrymfqvc5idvxl9en3zcavg4ppkket3ndffjr2161smkb0syhivdr26jjpmk7fek164118kt0nwbdsn1ttrr9rbnfgk8eyeo2rz4v0tv4u1toii2mtgllvhzfsa7l9mjjhr42jn7os01zrewe8mfebm5zzui4nvtc80xc78w6zi8cg4wys4v183z88oi5pdpnowxoeyjhkua10e6v6tfhpf8w',
                surname: 'kx8u6mqo7lfc682gnkwm420uwhl4z5a62tijfhlyr209gvg2uv3l6aep8duddyq74ggvb0yu43b97u5aqyb1n0h0xjv3rjbj6h2rs8bq93520wfm5bk4p8j52182lxz8ev4chgadyejwpb0rghjlvsvjsxoxjme2fyn5yv9cxfs2bgryhs5gm61knt9jkcl95b10vmgsywri5efbfek5n48iq5txqodhmtxeyc76kdu6jkqt292vckpifderinr',
                email: '5dw62j7wdlmk7b31q7iuq1x83q6c6mjt4t0rm2rvp0celcuhhvpdikm1ghbqm8zw0yhp4pmu8y6jmwj1f0g0i433y48dv4plojwcbss5ipp84q4phehyvhbe',
                mobile: 'h7oa68fxyfe8upuq546xj0fkz5ym0sc27b0c59j5xkcd12ycud1nnhfeu40c',
                area: 'azm2y74zsl33pj0yopcscrfll5wec7blgo3syh6lahxtpkl3qnhuesv6j18nq5svuzbu9f5871eamim56tphtgwhogps4dc1k6b920hegvii5rwedks4uw6cqfgc110p9taj6c0d4na368gzop93plggbpq6sgc23hhebx4a9acup1fy0du6bmmtx6h9y3zkxqgdm5vg5in2hls3l6kt7h1lmlkx8cncddtq6k3mffb0281x7prjcmdww6wf28z',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'zm8rzt0gi3uk4qza8cbocjmj871v7etbdpmz2sx6tspj6cs24f',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'wsbkyu9arsrgmhby50ts65cbm0wi6eahgnlx6qe440mdnaajdgjwf4esh0iw0grho6vwp0u0c8qe6tyfk45ddqqhqyxu8zmjub66rrdc9cyg5guy7y144ybvhvrmpxranoh0ee6jxilnrboeqtdrsnbjood9p5o3s0hccgi6jzlxl9zvhry5ynz6qr487igb9dudmq19shumr340lli29jma6q0vodajkhohxqnaoj25amiggftwvmkgamdn07t',
                name: 'yob0rcyxd61ja0ew5vjaviwjghxpdl0rn02iw8uw8dpx5ekhina05o0lifmxly08ptc2wap3wl77wly0hr9ha6u6rt6h9nuw4vbmvzq4y9ylpy7a9cbe04804ihahcdtj5mq79qz1hkkwolhhnnwa3dezxgl117hq9ugymu8q2y7qt0ycexmbr1oumorwis1yfzad0cg53je1k5tfjmihces745r9xmyz0s2s3xdxxyd5xmv0uwsswe24wtp7ua',
                surname: 'uoa9lr3ya6w3vydqmtvwwuvuq6dxrdmbo8ddsk1x6zyaowecsz5wlke9u7zegm8u416stj9dy6jg6eoc51azy7wumbrafc2mfiicxj2wmt630omlgcqak8alnzx9s74jshidgum85n9lvqvibfkcli20yyp4n4ff6es4j1s62pilfcohwb2hfn3hyxs6h1ldkk5bbcvezd6391kgn4rvaiyys0twztsxbn5uhjv0e0o80dq6rmvit6yqhetxz3r',
                email: 'ildhk8i33lqnzhr4p2mrsqkk6t48lr922vx6hfy8w3wxqkbh4nhx887i5eyx47422q8ml5s6wmtnwc071stoxq66r11e5iuq53vgbbbvcgex48h2k8l40ijx',
                mobile: '05omsew2zsiqwohyawzfav5w9jh5tfryu3wnyk2eefrn5tsqjf8crrxnlw72',
                area: 'nvcaqybn4c2oyphf6fbqorafdkuadb21lq3f52a4ftm29athw34k79aymz5p6r5oc1ldy59xxpkrt4qxxec4yq2l4xnbszftqbnztaoboeuaymzpecxpz5znw2j4onghiybn9zvn8iz83lb1a7u3k66upx4vg2c1qf9x42z1uhgoxi505t8tq33rq20c3sqhhov2epfpi9ynjudofr3kr2qycezo021914wiin9mmrmjo3a5zuktjuvc7h1hp7r',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'wjhprqsst5ppz4fj1k2wlzz4ajqhidacav8hbgyt6ceffuy6jj',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'o86ndmd62edv4m7mtf9k',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'm46hwqrln2fdvq714i3ya5x943h0630l1toy502le2957h2ssgs5c9z05w1qzb2lxej8vblk2z393qucbxd4kdex4zj00ol52o668t9fge9yzyvut5l59n1nreasesd1jkq6p80lwddmer7cy0950ncqhgnotm36b15hkatf4h7x1bkrv1sryis4ee7axxlbxoxm3y0pj394fn9e6c337jhl1rfnx0dscf2hz788o67ptoohfcl7my5sn5b6ayw',
                name: null,
                surname: 'k9byn758jjv49o4ob8vd5sqqmbdsvz8paf8didgeg8mn3noppcw3stbahm7mq6j4fir7kbcahgc1zb5xjlflwdzvs0tnn4xcgydf0whatnxr5egom6lbncfed26binxm6kdub37c9hg8xo864b3w32q5rwwv7x3xipxy09668nliy39rxefwjgu8xlmtdsnnflbzaqn1yaigw7g1l5mj0id6zotqnffikny2n9gt09nqe84tar2a484tg43qxev',
                email: '93tt0m3xrapavy4gk5a3s2p5wgt69k6oj1rtdh4ojo8zrlzhbm2sl8qos6m7iqvxrdvopnmctcaaw6b7yn4r5nz60ehng9ci20pms6g36yliel1gwyedj7r9',
                mobile: 'huwsej2h1t364qihsgh0m7d9pkpk3ghm1f9a6d78frs9ta0f1m0wv1gre0gm',
                area: 'rexwt1nxqo935cimnhsqcvirf6sepkt0yvv1rkxjllwfd7xkd6fy3xfygaij51oe9xj4msxb6xpoa7mlewh6l5rwkl7o2n29jh1w8ymubt41z8kzfpaod7abzw2ojm9xx3ujc0s8qatfzy9zehqux9rvk7t9hnqrtfwdfrd9vujjnazl3wayyqqryx1zchrsyf2y0y2tb37glcliugb4wwd6jd3d94csztfs2922ap6vy8ol0uf1mzxwofq1mrr',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: '6vqkg4e6ib16gswtccpphlzuvmqq9ro860ptwrwxl1wabhosdq',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'mts1dlz9onahfvza621y',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'me1h24dtbtrkuoflwzjxfbmdf3l670ostg0i8rka56woj9irg6os7doohigrze0qshl0l5umps2f0a4vmwv97nx3q00j8uypkfrt15wpvvhz6moe6nyxaao8cl2bdxs2ekwwle85364l9sd3utual4rpxom4wv7afqcvmzxcidwlzo5oforevb5jofshgzm3idczhojsbxydpxssm8gqu7qmphj2or0txy0l3onaq74ti2mnqfhjho6d1ip6i4y',
                
                surname: 'hlgsog3bb5bb41s115okvjvyl8gjxfx3kt8b6r2jetkqyjunkvdmbejd3rrpykmcxkdr48nlbb90lwgzmg9sgnnz32np37mxzgbf626lzikznlqn74i6qok1hv78t5v89isl63sqndgiijwex4t5pe3m3vpckge4wj6zck1z6d9w9b91w6bxrnmxwkstd3pgw1f3wyqimwon5hgn7k3xuxmijwfuqfrhenecgv4mugch9xkm1ncgckg210j42as',
                email: '5zhxyx6iywjnutuocalnyuau3asqmeyz6lknoi3maz80fl0rqt80920zzwe9p2614xp1zrslj6x3i7z068s6vms1wzupyn70ft889rhrwphsucs9zwydisyn',
                mobile: 'x7pd449ed2dnnc90hs9ncxyt8ituf8w0it2u7gcudfw20v30umjolhvq3h4z',
                area: 'clixdks47cgb5dp3mz9ny22cyw8y2epoi2ziofi8dn4g3niz293msirq7adybdijj9fh7kj14gf51r4arh695zl7xla4citgpxjnmxrczx9vs1cmh0272gxr0nes7014rhqw7yjck6lwwqhyp5t3v9qj9n0sbzxfw8wliqy54mk6xu2j9ue9z1gjua7aq787gk3dffj4xgxob6ha90m3qu7qdle2xb7vhza43lw7e7vslcdpkvlpq6xibshhdlg',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'nxw65gga6q9e6nu5tzu7n73y5cy1vedyx2yryo6xxlc28tqu7p',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: '970zzdv6gwzpkt4ji1mr',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: '6ifncub3gg4196db8n2abodxhogiyjdsq9yigfycg5k1iv184pizcxgxgdj4hipfd9drrc1kx36p87tyqyr7xph5k3uumz1jan1ijvlvvc18qfn64jtjpki5nn9xx8563tu3eh8qkg7i3kcrjh93yz3z6v7oyzs2mb66a4woh3ygb10prwyki3rugg3dlyro1dve1xf8flkofpgsqjglmz6idmoasqwhs8mkxerxzu39gbt93sglpnwbu5l1mon',
                name: 'lkmytnthjkn2f0i2bdwph1sn9hp3h5efradtatca8jvath05jceex7v5auclvap4caldgdioxona1mh9569q6xmuonbgnentwzjitw93kwv471s0jtofh938576i8huppnlt3glrox9z5rjnrxnpu1izw6t7kbcagn2byzcwd7b0u7rmvobk0qqv960t3s7hy6ceb0ouy1v6by2fr1138ul1txzarr69scnjgipsbrhptvg3ro5rhx4m6r697ti',
                surname: 'efu9g1xxn4xw2qxjubv052j91ryc5y420369y7fatv8perqjgdkiu3jb156k0iakgvd3heeal0f591l5rd41lbsd1habu76yqh4sc129c3ys7e34y7i0x62yo226rr571adn34qxp4bcx2ejxoz3vfmnwjfv11442cf3gbmgmg2cffxe7ro8j3hlhx7x5619jz0w7krun3624bss3p03iijjnzdgeyalhb4ccere3q6vg64bamvm8ohggvynfm3',
                email: null,
                mobile: 'j2k2hu1iwdkltu0m6jr6lgqlewqag5t8hcnhwycr985pdsmelrtdqrsfekmw',
                area: '165a3lt7e6jp3aoasbn0mvtgi9964xrs9wz1aju4e1fr4vug09jly0cgk7hndn8owtgoy6fte3jfwb0saqthutv71mdst42qtxo10uaj4mo9i8mw2fsbxbk4xub0jjn2fb9542o8o4nkqfmpebapmb9innvn1zwe9hwt0pah4anaxxmym5xt62d40my5q63np11nwrchpw175xycgus40sofpf72pkw8i2775d7wcth2wtoby06x9m8ex03whg1',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'uzduxr0j0y6wmzovld62fgb6dvolv5ct08vx969yszazkahoc7',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'lbvicpxffe8zscp9g2qp',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'y4cbzrcce9or09dl2asc76lb41jox6jzn65g9q46qpyph8qv73ghp0r6q6kae3njhsfdemrqz561z61gx05qx2ua77t76uqb7kzyb8ff7t4sw1tczysxl6p7wocxue8vr3aupgv69rzfhdze749vxl96qolx5x9p76yonfkhj5kjwa6gouxtbpwu3xv5wvez4wauzrpyqleswuydv6m7d3w49ogqwz84i06g977k3jwni43rkork76afsyehw2o',
                name: '880h4c44826kjkmeeuaxkybxmul5540abyi29xox0mpunb7zfsazbzujpdvz80fnpdlu9mc3n7jgqzdt2ysbq02eg134rlr5yzb0q3beese4m5bpxur0j2m7uoio96iaf5i7715qituk4273zdoapu8pu6vb2ecrtm03kvmd1yg7kbtxw9f0jb49mmr2p3p5echwtq2f270vrtevhh6fjly5nxkdq2t87coyrjygz0csn94ould380q2mcttxdi',
                surname: '9x0livnhe75min8pf2mf80blw4vumnlqqaau9vlwg5voci21wia82dv2u7vvdur61fza74h1oszug9jsbrq0b4b3z873jmky3h95m9ccr1fu9jyu1bhnqbus9nrnfgz2oz7gyd363wkwz6xxog5npfrj10xg56vf1bjdm51rw1906keww32dol2gxd87fhcuoud6ijz0dfe52qglbndwwrnj66w28jwlrs7ynb2u2m1jq96zo0luh7dx0a76lm5',
                
                mobile: 'adkcuhc0hvfkglk0zppi3vt4vqzrrz78uytljiyjxg4rwix6l78j4451iy5p',
                area: 'giwfgaowovn6rqvmmn8b4dcb8fgrp2qnoob3h2zb443yf579q8lp6d795adkhi5i00tvoh8yxqfdyu6a84h59dklvhh29tlz6zbbjepfqsczn1zb9z5ofbfefwvvqk4g9qzjv2ib1sds96ic6b1xffgaqo6ml7syjjrx3w24p45danos43oiyindeljodid0gy240qxcaeyagiqintuyk5qg0x3m5f8mzow1zji1bqqupvpvk6e3emo8kc6h1zr',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'i1kqqco3u5mudr106fyzkmh9n6dtnfqjbq9lrgwoa9fv5fbz3d',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'es6cdy7g8fex3hsw85j0',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'uolsx8r4yiveyb4a53nauc41ai3a1iup3n7u9vf6cso39hrscbfdaklijwem42s0esorst65e0c50yjgw4rdxth74eeepmtp6ehb4teejdbi1c8n653o3f66rreyj0u1thvtxtu16dgzppg2y53u3fl9tg82nz6sulcvu60pnxuo36p4xrj13ulxpm4c4zuhbigyruwa2i9bkqjq7upr5tzfsbhvmcus86svghk5keza42kn2r7kxoqjl3szn1j',
                name: 'qkxc9u78zk4g9kyb59a7n42fpp6we8his7ekm9fq8lk8e4bq0p8h4ejjym3ij09u29hdhcetyeldo8mmsrj2wk24wt6qancfpu5tmsdg45vqvgqr4ny946sjp0nn7ackmj6jg3r3wvozaffaamfrf2yk20lr0htdtcc1xpwjfb5vnc8mgola8bulxcw9qfglh75azh4jnx6apt9w9a8bw2jdx7tozyn8dh8hr2bm9lqo4py6kycwu75himrz3si',
                surname: 'p0eex7xcyseqwxz2r136rq36s8cz5ioyyraf806oug1aoa3so45udsrx0eomkpwxnr738bfs4xy1qvwh0zmyrktaptxwnghy1i97jt5wi4a1szfwz7mrno1uycdcojyey4cwmksvxm5s194jn9bi8sulb8bh9khpl1h8p6ezdkh7bwa7nm1tl6dl5vyfazqhgszt1wel2qde1bzv7797ungpm1i0j04hgn5iisa9kmjr4fgkrj72by06eldwcgl',
                email: 'squsnmeqzs72pzdjl27d5qb7q0j5gs8dsuw84uthin1q9au1txinqkgsvvsz9m5vpf40dmgwgvzadqm85gw8tot8e49c1dic805ed4cgo0qvh0ib12qwxmcw',
                mobile: '2yekgq3ug1ff3te0d2lrticyb1dsz08dt78vmedbv74wkrsqbn2khr0vtpe3',
                area: 'xwgvjh8fs6mhu7e06htpjaaj1qh59jxaz8sngxt024esofrhmzn2zx2zt8j5s9fkm2r40tv206gqzmuw8huf846hhalmhlnysh24qvhs7y7djrs71f6bfil8snhbmmezyv7jknhx6gtpsdpvfqse45wclj58wmflk2drwgz5c7a5m6mjgw331o4m0eyrkw4o7w0v26nppwiy9zi9jhmtybco3kg5hra1zp4sib21bl3xu5rvzkooahtt0ct61lg',
                hasConsentEmail: null,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: '3drt8cd3rlrxh11xnpbl0op4j5r4q33nqvzpgpx04e5soiq5p4',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'e4qc2qb3cgb2f8x4bv7f',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'acujyfpdveyoe80b9blpdu4lrf3thbqhly50sygr4x2j8e6zwh585ylq4k4ge2808ztc1ibpodzciiva6ux9m3kxom3vlo0ovug96fj3d00zm547qjsrrj495vsuy70m3t3f7ehrc2rgpu2uobvzl4jj51xxkwmkk19m6kksyou3dc7fsrsnr4e8unq78bjivo8dp7ef82eh9q4bfn72rrah2iree213jex5uqs4hm256iow71mvzolcey20tb8',
                name: 'qzuyt5yzk6htz55xj6jbv9oa0e2gqto4zajge5mnark24cc2xvrajjype192ybsim7xty4h1bs6h6l0t59dfso0ibzx2oiuglicp0yqf23l4f33wel0muwerc58wq5lc9p6l1rkg24tgj7zpaanerkqy97s6wrurbj769l5lazqr3xuorwlncj6xkpb44e7gysbawgwvk2tedeo8bls4gpym2jmf6j2qklnmynyfkryr7latcpwi5fd00709tim',
                surname: 'zv5eqhzywpdj0slxae83we87xxoytdv38su1pzq86lq8gx4gv56qscm0h72nyoqfy559y2ilq52mq123jftz6fzhw3g511zv29lnggxfxahazce5sqwstpviu72bxocy09tvz56y0wrxpj3rvu8ziwnipryq54u8pzlaog8jhl2i8m3hmvhjkvurhtikg05df7ms0uehf8zd5h83ivufx9iiyefihk16w5gdbz94kzuc3fdpv07bpyn0bbijxf8',
                email: '2ms8fw4dzs4v9iuw0bxt8au57riyid52amldk9s93tprqrr5k59d319fd5zyxu1ge5qa5yo580890xjpgmb2w4k2k5r75qnk0i7w9lmt7gz7xp13r8aipzyw',
                mobile: '6n1016criyp7a0hrhejr9pxjpppfptjtpjxftq2nkcfizguxofp6w28cmi02',
                area: 'tdrewxo9j2obvcounvkbb8umlsvhyngsyqzem9dxvyrvabde7jxi4a1io9b86ps5wkrj9kt3jb4ym4tktgattjla5vrn334oga13wjbym6dm3ed2ryu302iauc2k3k95fgm1u93feidp42saqgk1h70ab3afaesj1l9igy57k3ccvn8f504tvv5gtzrjretio6mtgr11ydfcu9nvgh6fxlrmmh5jn5ongbpf5jcz69nu9vzhgkkbn9c7eah9716',
                
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: '0pdilsx9jv6k6teiv8unw5kf52u3cbupnjli5ky2hocfyxguap',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'ldwdc104e63j3ymub1rb',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'fgrw5ilv6rh5n1mj1zrvd7hwzxvxpvy2zw343hdq3z1d9abpz3w1w9fexmjndnqvejrfor78mbp4vwj60zcs729ctqe01a9d32hlctqesxosjmyxskfl5uk9nbd42jyqgwdx8hq1u6ydx5e5czmsyi0yhbzeub2bbw6out1h42f4btx8dnoqa26pb8kshwxhpdzg2axplg6fgo7edxf7wxnolai8vyivaqjw54jthjhk3fkrdx1bwxofjv9hvfd',
                name: '1rztn7r5qh6mq3752tplk8mj8h1qvprtb3k7zq7gat4iq3tnw9yxyd2xeekratmxextaq1rmikju5xscuke6fh8lstc22504f9urj06hrq83092r636e1v53i8whoshycad7v8rrc9umt5erhcc16vbpks2jv9j4dx1x1j86z1zlisr1vy5ybbaixu7v4xeddja7tzeitptelcnu5r666bdmkvr3jvqjc218luspf1lciv5jyj56gfw7ccpfr3f',
                surname: 'joym8zto74d3nch25rkhvej63nmtblnyteuf2ig9kvxoyuf8hepaejso3o7wu22shacar266fvus4s1fesr6eqqwq6ehi855sblpdtql5d31efam9oafc597ugqnuzw7pvqfaju6gyzbin3ad6c9bvhzgb5x9ghhutenusskb5zraljw9czjaaji3bujo57raeo7y4354y315abzsnatf79jbgx2hu2has99ghasf18hal3fqdyso4re8f2be7c',
                email: 'gz7uj30nvxuzgpitx7glr0g144e7f7jv3a45dtm7kfi3zame0ls5nq1zjn75pfxuqp54trpt7tit7jgzmulrpvbvxhprl92gl20q3va3sh5iqrta7ohm4mze',
                mobile: 'wivxyu5r5g00fj19m757jh55qdb7b5a294y9l9s0kax9jk0erq923ppgtuic',
                area: '8ijxgxezj9qnvg14jldngnpme8q8w9k2smrar446c09whr00beb5o5ljuotqs1ml8lyvh7xyqq28gfjaf4xcbcx8a0nk514597c6zubavmxwc4i3e2tczv9mi22jfxzy2ei48icqgld9sb2scnxvvcdgvbag0sramye83871val3zhob3yjn5mxw58fkr4fsr1veazfle2q6ezw4gfxra3lzeilsa1dk97fr8wx1ru6begrzcdfj4wfm0ctv9da',
                hasConsentEmail: false,
                hasConsentMobile: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'qzuww7msmmxepvjrptxb07424i3bzf2djy3jmij9swqvezv9zd',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'eeyukbi12q63vqs6pg81',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'o1gvrnso28s78u9swxcm7xw75mtb61zy8h06w4x3ruhme7a738o32lwgllw069yxfyrdh9p5tkuegx55iyoajqbrzw2vs23hpst4hg9kiqfrsxk7e5en2dsf88c8fw0evcb12uweoirr4bwho7fh1ntbwz1mgl4p6j1th8ev5hbij2y4qak8zkezdvkgmgxsm95hgfszqa1yqisfx0zhrz4lg4cd3541tgdh9bfww8xh4lv3t5guuuxpwcquudq',
                name: 'umq93q3zdgyj56dwefqh5q5mhhkvu6kkvhpa22k5r1rii4zq0a0n6w6x87y2hbfuraf75244o6k30can303mzrgscpaprz14f9mqko6d016knjqwh5d666nhphnwyj0en7z5dewbcpn5gcuhq91yylnlprt340fdmyk7ua5boxhhl6diextbfvp50ow6ecea7ok1j16sgd5kd8xrv7dscmf5un9nbtukenj0k5rvvm9kitkb5hppv7drrjaq3te',
                surname: '503kxyfg007h31nwk59a5zhf4muy9glacomqniyalicit7mfn9junm9mlkulusxho5324bjrmwrk0n2uvdbc5wdyf51tdnmbz6l5bgt2xfmfstzv7bepjk8xcapkii6b2sjrn5j84u4x26n490q3sv05udxs0lmnx0cpab6f10xqrbpaik9u0nvier4lu5altlh26rpr31uc2iz61rpd8vjd7sekwmqro4zp8pgozz5ltmfyyvrwen7idqqvyz5',
                email: 'f893yscrf5uf551cybcb9e170b2ql6numkutgz8bxr8avdxs3001ati2obf1ejsbq0egocw3vt44obn8itflr6xazj1jnai2f4v3mi80845oioznybm9qb6u',
                mobile: 'yqkvjv1982drk4wj7dsum193foqfeqi0t1p7tmfvorxwh4vr6rmonkwhh9oi',
                area: 'm1gd5a2ca1n2po50thg3hyo11zd5l40m6y7aqcc4onw8pumlw7qh128bbb7g940s31z29yv442atgx1xbybc2zmv0uw19q8tnlboi34a1sxli5y52wpxjamxju1ya1fz37d17hk7j7snogxo1x45kns26x2jde4gibzcgq7tblv25qyprldyakwdfke4qyvwfny5p0av1xy8hqbteqlz78pjk28k71nq2mpek4ew4tx4ebu4d1as9fd0iqkz6zg',
                hasConsentEmail: false,
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'syt8wjm46sbspdnw3stbnmgr61pkfsms4wjfbkzm4h5tn4mpe7',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: '4yzk1uf5tc6a9s82yind',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'e6290hpw27mo203uhmah0kg7oszyjhw72tjf7jy0r0gkb29ejhi3u6wj5fv44j495j1duo37k7os9lpqsri0t15ipivydyss06qs8ejaz81m2tsciazdxrde09z7s1l2hqnjj0jhmdma86fwcjhjyatsylzxazkpwxc4jkri37lfqlyk1d5ema09fkxkc2s9b2u1c0rtmtz6bvrfkfx0poimdn8cbxqbmdjgyqulfe0zlozrlz8gvty3zppqdn8',
                name: 'fzbmtkvbr5d2sf46z6hgfezbw5hlha4yqwg5tyhxck1uwvlm2q1a7rnn1hj3mlef4ih4b5vdm74qrfsg8r20rjx8e3td2mn5enhf059a0zdkh4eci3zpz1agdphtwgmrp4nojj3icsk8o198622ts45isleon6qydqoe7r1wvv0str8kya9uffodiv6jflqfbvv1uqchzyfilunqbvycz381vtj3ofkmip11r18retvnlw3y1121sigg6rk7vhm',
                surname: '8ff2tt14jghlgkeboun89qf51ksfs31ujdtcbqs24smzql4dsw7me7bb4snttyhpaq4fcblexro6gzyug19zy5e0q340q0b2nq9ws8qo397ug8d7mvh3c8tkheh8cdi0alsrm1fyacsal2tcaw99ix27v1m1ke7b0l84czam49fogbov0c86dk3vff8iuugbrt1sc0zgu1vv1crzk4zn2cxqfgwxpnmyhjn077b6b1kp04d9xdp2kfagogxcvc6',
                email: 'm4o8vcrbem3x0gehbi1t42w5wnvmsurvyo0idred99wxfa0fp7ib4r7yjo452rmmzuu0umt5xxxt9megqtiai9t88uhhz0x10hywp9dygl42ebjbmi0g5if5',
                mobile: 'ub9xawq21yf67jkexqyrleklfx9eg0ll2hmoqr2behzn3yb5to49f6ehrrob',
                area: 'wdueswcq12tzwnzd6agmfzzuhsmlzs3g0qhe5bn3vj9s03fvg4o6gnenvposmrm82sb81i1ncm4xe721kvolltnayhuw7t00mwceb4qunmqplizukfkrnw1eskps97c1bqykydr48gnacgs60x6zd5l7ieifrsvunzdz2ozhbvtgb8asgy9sbt7g37ffqpby2wvpsol6c8gd21m6s18iw1wdiu1dn533ewq2po1l2t2v6rkta6x2upnbv62ch23',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'a9vq6t29ppallgplllqmc65210006g4ckktcamohgdn4ovyr23',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'ysejdo081brt1bwoucle',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'bezqhgdbil60rhxhj0rps9z1mx3hb2kldy2f33n2p62dbxqpguespic8oalfj9et9gbt48t92jsngc8jbctbkj90ima6konainjnntlz1jf0w6voryklxcdr47bmudy6shvy3857x44lzum7y2n5bdkii43pyidh23emsyi6usljaa4wc8c82kz8hdud6e56b0zlbh3aiotqjm0cehemmjmev2r7gu1firyg6pgud9wljte69i9wtc13p42lgkr',
                name: 'y6waxxh3tmxkivfx19o3g7g74ehws73m1c4118kfug7ruis1l8p4zbxu5xdt3s29r6kftanxzpsd2a1kxd1487ue0wdyopvdk3dnxqhl07npi3fmx41n6o3ifi4ia3sjxlpftvblsvsne8cwh0mnzt2j1vtrayblx6gpwxff3ucfxlhpka97tvnnfsvgfsist6c70v22i5kauye61tux79nbbj542uu8jmllyd9ecbyg1a69n84ej25weuvp1gm',
                surname: '2hi40dpz6v0hzwdpmal30upquvylv7zulmbljabdozt1n8refuq63n2pzcgh8d9l3c3iw4c84mygr0ehq004ur7u2rdnenb3v9l8aa7bwjcd31b0imlqk7zsv76muj06crfxddtvqu7zd779rsgh78dw3c2vda3jsxg1utrk657tc24x5o3h0y7dv1kbqy2qfeowfhco9p7hhuphh0zvf0vf3bm2zszgxrkojrzk57tbdjzcr75rmraemkqb8kn',
                email: 'wnpd9n6w5mize7wbrdbiz6sbdis4yd8pozt385jf8nwb2z1r52mgmkegyzn7hi872lzvn0qgjlg22cx7pbhucinijh0hllky96ouigrycjnzaq22y3wlz3ul',
                mobile: 'nj60jglgxqsx8u0pg7pdko11ilzeylvrg9tj9taj34jsxl0dh6pxx0s6gkf5',
                area: 'kkje89uld4sxp5g762i2b6qmnut1539dp6em6fcspb1ohgp8z0si2mbq2a1fp9uk3ighj20ualrv6avszoonvyd7kvmm42h3kqy4kqc4m9mz3eioxl13bs49v0gwuxphg37ilv3x1h3wjbtj3lipvgjqw59d42x9b5rb50uqhhopxywdoqiosajmmwkd6sfqb7mbr6095sjsrn1yr80equ5qffjrj1laqy5ve7liqzrzbh9l75g15t80suo385b',
                hasConsentEmail: true,
                hasConsentMobile: false,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '522z4tzk0k349gcjixef1ugavnd8na2reu8en',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'veslme16bn5qbildsvu5ab8fe4p6mhodvrr6z2slgmdrti3q3t',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'ab37d71z7e2b1w2leoho',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'uxulh7mdf8m4j6q73yl9ch87brymbbj7pxolrgh8l3kj44uvjsg9vd1ufi6i1vt0wt2jxadh2p3kz6f4ty2la660rscblyrenzcdpkh24by7kujrpfv9h4l8q5dtu42irl6wxcbprxm3z8i8vnwbuu5ib4esx4lpaigxqlfrq0epk445qvky826cbnr7dkl3zy9ktvoq8nqzhhnaxg44nfwwvsc8w52bxjo4g2sc0eubu3nx0ja14moun3h683p',
                name: '20otrdqa9r9g48xg92sakgeusttyuhwsy1a2vqg61cqevfsoe9j97l2n188d6hj9uafp4o6ilo5me6dh5uqfxqvrhvmji97rd2qwy8gqa0ajefrr1bno1vz48gw35c9htf664mjjqd4sa1x3bpf6m8aipu69pze640qc96putjvmaq5n58rjeu6nuie8l69bx9s2sn82n6tce859j4g2b0fiooyxtxqtt6bdpp9hqy9mn1e9r8ss354zo7b2dxk',
                surname: 'xnzli97ar7d6ljz5legimgsd4bauaxv21i5hmh8pdab5a3hkrbwhw08vg0udl3ynxlo0t3kgl53pycdhiqp1yk08lvm7elcm35xmjli29uocn0cbpe1mxmmcqfpp0e1tolyyk8p7jqsqj11p1bna09h0h6pcdgrvltepp4jezfygwxbxfq4f2k4o7s29tmejog7aj318e4ffq88oh03dbne3jiy4z8xv1i5rg16lsrcfmmsp7935ac46rybdtzd',
                email: 's0wt8ttt5jhlbeb1k6697cln07u55g06vg8zrp1awk0xnnpm72nqyskzmmik8zdrbuwypzthpsb9oruje9f8fxn2i3b004lslwp3abrclqdqu123kyvhoil4',
                mobile: '2x6c7znr2m57cwuimk0dut951fqynve4bnzy1fulg7hnaudtkh5y9blmbdjq',
                area: 'k5ipnd70c0np5d5l6urumbqt8salpv4d6vj7ymd40lf9zl4u3qbusk1vo23ozaw3ketnh4k2qhanxv0hcbwhrrlbr34cknovfsehkdu05fob6seqr43k7n16q0tino3qpe59xqwdq3jnn5nzdxau6l4952y0cdntyjdt2ee4aoo3ckvx7b3584kcvnwgf6mkhgzlcshizjdsl24pdrw37ncgb2fsa3ukroed7hi6rmfyzj8actw7r2rhlvw38bx',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'd9t454fn65j346nj9p7my189xe7b428etunv8',
                tenantCode: 'co82vdid5gnzrrhmskscwbd3pftsofnz0tkvvsmu356tqkc6ys',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'm4uct9hakfo3i9k2ti5r',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: '0mmn2lxk9oijvznzbbw3grnv4w9nedckt1rhx6runow4ui0fn6ozrtr5yhn3fvmeddoba1wre5pi2chyrzo99tdd28iclwpvztfrr988i5sf3ja9spjw2cnnr1l1x6h46qz5043nqdpsvb18zp7k4bt86jh22fmbuennbhzrw9s3r5aggspe8i8oc7a752dc92v2wbtzkom4rq77ytrvbe8n887lqazlsyhkkjzkqif3n2wazoy3p6w2o4khmc7',
                name: 'ui2hgnero678nhex7efhryuh9wdxhfynh5izwjih1gd1welmljzzded4vptjnqi1ny8k4wwz2wz7qgk4msklzjksnnfqu1quut1b36hc55xacfohtjx757twdaa673fkb5rym9b3x4wtx4nzfnaawfhfz5ggl0hwuvskg3lnkb4mh72n58e0qjco9g1bsid71k0dl8wdomyn2nl87m95ne487w72i2yv1dyfa9ru3a2hw63ke12pnfz5w5rfg88',
                surname: 'e5of59ujn9gzs9igtqd3g4mdqb07wvlg1156qy3oa6nno4uq9nrh4xs91rueolsu4a12ougbh0wpri0jsz9a6xjnalviey5biaze6ujnqu3pcblfdup93n51fya4u27fhe2u8ilaa2lear5gmq3puja5ysq17x7afonfudcjbfky3i1yutgc5nkal6z0n0cgqtzoewcn0wcdruo3dtfijprn39skfmdzg6qn5ph2sg0lxlk9l2nla6gan9onsxk',
                email: '2e287h74838cgxf2bcyl7s624bkm8o046jygh2t1xst4yzy1knqcjkxyhfypzkacagm360jppzfz6cn7x3h9rd25b9g8rcwt9qzna61159zysyvhf4a7jn6b',
                mobile: 'ta9rmbfhniddgiviaur5vus105jhej58dn7ornng7bik4rrue6qr3u5xh4xx',
                area: 'cyb6efukmzq4xmocq5l7lxqiiezlcbkyb6kz3c6s9pcjty7w0gpnj69xrqodx6p3pryihvyya0g8s4gahfeoesxb1g0qzxwwevvp5ru63hx7i6cafukrixbf5o4duo7wwmkl1awop1seuit0lk4r8uzb1snxvbmkgx6j9wkxryw572pdqjp6sfr2m4yheqa8mkrvauc2q8mvql6q0mk0v8l6ydfqrw8bcu9useu4bp3jlusg2cjx5za849gbkb5',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: '63orlusgltjodkpkoj9d3ttp0tlad03xeqevmx75osodglth14',
                systemId: 'za6zntx84vwpvgulii3iujtyiadarjmkrskaj',
                systemName: 'w89x5pz97x4yl9q2z8lo',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: '6ldjmj4pbfsb915dyklcdap3pl2ybkyxgdvh76fxrrcmssaiczeqfvb01n2dqfd0y86f9dag7iq6krkiwpqpd0d3oia3o4lkv4ouqkaifgxyof7vvgfg47kvcnr32rpe11vbqxaa11xcqcwxvem0h1vwgn4gcjs0yguzw0qi8n64den2dq78tn9f14d73bm1xo5gad6ye7ex5jwnsx455j1iyl3wt8vlotodkwwukxr8l1fb7tgd5xc1vtxd70a',
                name: 'f04v594m9a88ifbmb5j4gepe7q5vkq7kixz78u5t341o5j6sc9crg0f5h47a9soe583m6zgzg8x7n0iesnq638c5ik33vzu33qy2x65vs53y8h75pbdevhqiagglbuk820aahwlo308j87w7n70lw3msljnlldgudqbgzkrsgj04cvkjnvyqhki8fp113cf79lsd3bayo87m0qh6qk02rw29p3e9l7e3w7xc3g73wmge1d0s75whpqkf8pdk2gc',
                surname: '0k24ba62bv929jzz7z43vp6gr8l80t1w6n87pa90k25y02t8x2z6uh641trdtge1zcyatz3s6uisuz0kxpaqer08j77iadxbtj4e12nr2q8db36k2qerag0o5ln9ye2zdthc2cvyr9xylls3iixwnukxgs7fd6c6rw2o1qnn8j5tu7aqckdcsnm4iaq4765bukhxl0dp47heka16p4wvvke8ssi24le6apn5gtbqri5l9d7xqyosbnaef1qfndk',
                email: 'fiuoy4xnmbs027ffbhrx4gab9ixzvmkz5averghb1uejc9ggb9zb4auw28uarpyyin9fouueobv1oxrlg9k7gc9w1aypq0onmg8et1kt96kn8w9tdusqlbz8',
                mobile: '4lrgcphd4bx056wwjz6oo8q1mi705740120l0jxkfzz52xdw5c4hdsz8hi32',
                area: 'dnj5jy2tng8jmq6momyruuhqyoj8yu911wtgpngjwy51fz6gph4d6frzxk4uknmhh1jiqitddm1z3vuoigvba3n4hvpch6fx475m54rg0v9z2y84oltfc7j0yodmu8n605f5uqym7uajcruagvhx4phk9mbuv2x3mjwvcrevt8n5ulp2n2p4v95qsp5sq8f7grv9y64ygrfss6srg8j889pdzarydofohmf5s7k08gtypcdls6ohzudj00xfway',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'jpowa9raz5551ks817tewt2k0qk763nlstqqp9s22t1xg55nnx',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'dr8dz82o1jwisthrzep5',
                roleId: 'emb20sk6epk9p8vnwv2w6u78me1zr9njownpc',
                roleName: 'nemmhahatflg6pv9mcedv25gqgf0atjl18p2rbmaxnxc5kn6f2q35n4drcru9uqi4tkf95ixu97r1nk8q4ov8f3jd0erjyg9ur2omavakoyttqfrd3bm7kxxyh2jg4j9qglolm8duo4u6hlcuuceg8eauqon4v1i5rpdjakszqknsq4m11bsichm6w8gmgezhctfgevt3yjpp2ihtdojtk7cgi06a657a6kk4l57nj5cmjsia00csba2ildm8v4',
                name: 'o0pgkb0uly1dds0rz8vpiy1uemv0rbpizkhppkzyylg3ny8wpul6sncbzpm9g6g6tb1l5l6bn5sxjqs2513kk19dv1t7s9l6n9hvs7r9f35j8kzi5hkoyhkppvvklof68v7papim1fjf4qhbsambgutsjp1q12aymojlgc48by3lb234oguqiay2gqu66qoona6u7k1rg970yggkky53jzgdjzuv3zilspsdnyq509bb9acx0yrsumsa2ah1hol',
                surname: '3cq001g1kcpon2wvlqbvblyd2eo3frrbrg509kd0fu2n8xbsz3n56brlaxo1koxq2lsgq48k8zww86e1smrwp4ik6aamc7j05yk3822o0v14akp67lj6gwzi0pv0lvmle10xeafpq68wlc3smrpjcqol8p4t6r9w111dugl0cc4m76f0hrbppagmsxaoj2ggassb9i1s9pxbk4uie5ph94ja2rg2a9hq8pas6pfkuq9v12guyg63ubjusrllq53',
                email: 'esc6h8h5n6ssujbl6ord3b5hpnkfp3ddxw0gq4om29kilbtmx2r59e94r1ahopg626lpy101msn4eydhy1ip4q7ex22h5ured8gwmtvz1vcy4ux0iwtseu1j',
                mobile: 'xy2gpg2uaa2tbodpraa3fs41dx9l964a79qhsvmm0sxbith9ez1nyf39699k',
                area: 'nakcoo0l0u3z5g9fift9hbr9598xhya01tyuv32d4aceq4vu9ls1o7hbsa70w2wn55v2mxwo7eytag96hyun59goxj5j6046o3rd1m7g0d5bg2w9e6jfrm5omegw1e2ir8ql1584ut52krgxuqigh08tp2vf7x6erfvr18dgw9qoo06a7w6cekq4sxy8vbv32ukyv71mbczu6crrbebg2qr8bhchu3ohw11mib7gagc5sz9cfflsfomlvyzjt4t',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'wmb9d9cg7yxebdc3amr5i45lrvc13ethgt5tgeh4u6qugo5oy51',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: '6jzka41yrfldpzod127t',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'gykmflozpslo5gdpfw6mtkgvxji1bkmufomauhl0b2sfg2p859tzknxisp0v6myo7oi5ootserrx3ozsnkshya6r0ifjixayvfug3i6671d3kdw0vj39y3qvs68saxiqtci0vysojdiqx91np5wkh9fdbrs8m16q9k77pepp7d99vj49zqn7oh7rv1wl2rfq56q48czrdl2wxx4jw57jwexlydjkmukcdfcfqim4q8hgga0gr7qioimu3z9f23j',
                name: '02w7zrjpnxyat82y1eknki9slrflph8f063c32u51y3z5ujuhwlpzxqlepqocf0r077dbdqsv2w8dwhwp2hxrxtvgmb3pffv8l84u8hkvzf9k0k4uu8xtdbbocpkoe5sgm1sjbnnkb9ll43tz4equsuxe8gx17dmvujbkflz3ah61sginpev3044l2iegyaxptkt5ev8tkjj53xwh6u8tsktgpcwxojjl66w7fjwnxh7ag8ax6bvj2e91xbnxlp',
                surname: 'ubmwk9dyf8hfhdxkgolu76kcw5fmj4wndigepgcpr5k0ljd2lgo4h4p6pbx2u632a45x7u4ios3x1d9y2maxhvzpr4f6qdwi15ygics3giwaqtmvt8h34nrt1k4w4zgqbo8te68yjccks02829xaql061gdpwf52ck02gntpl3r87vqqoobl7ik7e792e3vid66otksaqpr830m441i0x5nfa1yy3wuoru5ez4av3uxz7qpgcwx5xhuq1hdt7uf',
                email: 'ifsdneofw5akd09keonh0v8lnrsw0q8zjf040lvcnttp6qq95k9jmbkci8z83xqm6y7hkpd4061186me2anh5hu4rk7mi87qwxnkktlkfyvs72fgei565jkc',
                mobile: 'fq142vh1a8vzcv0hf2skltaje0fb2o6j6ix3l8y1cqxhm245kvoq780ddstx',
                area: '4yv0u1rv26vb12uqa702xznpeetofobrnlmh53oqw4sw2t43ae99ib2gtwjabmauz2pak82k7jyh9ue3672lpj32lpnva32deetth7ltq5fm74xvg4lrm0q9fwb2gotzuqj8gfsn780yeuxiy6krsnhs6g4eo8a7bmc1eo4hm0guw6ot6bpswnk1nfck68mjrj2d1z3053mmuiuu68ffzpthkawni1m4vrgxysnth2hlxddn3j1x5f7uge543vz',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: '6xoxbl6t4baxnlpqugygmhpcg4g9btes6bneyrfkcesdrqx5b0',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'qp0csl2d3x3qaeknqveof',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: '34diid75e2pe8muxpy87qthjzxqk1s90qy98e5cqb2wcgnl4zu033dxgaao3p13yritg97xnjy06wz1q7rk8j9upxa9duvno2t5mea3phjaw7t1nw9id0er9hwfnugvhydhhrdbvwat269xuj9htf4agf06nj1pzievwusl0r1xpcd9rq6v7w0iff16oaq1a2ldwvkjk4ghfawewuoh8xlpoy6ygqlugp614mewugls2w576ns6tvnganvly1xh',
                name: 'w8gz39sjpvvkxgygjqyq4hsu0li3mrfhjp4e2mf0qzg44o275lraohkk01a6ghfkatyzrhc6g3aaaktuwupb5zsq6heec8nfuo0msnvza1bi6cu9y4dhvlulmxhc0l32hgrzhnamcalldjdtq0yx1ktywgr5v3o5xfpjbleq481pw97kv1wurh135zayi3p8wsi46gk7j96348ldfj4xcozfac48js0ehhj3h1aj4xn3rcm22wkdvbjqd41nfsm',
                surname: '7jrmane6tkpzrz548mmxicy2xwbe8m4f1v1y1euuooiijrjupnw771l3sn5o0d0astujykbxm5870qlznbo8ve4bqvta9g9szz9ulq3lp4lbj6fca7pf2q6dvk3aa74oftln48euef27higiwi9irzqn9wx0m1w2yv7gpuz54gnfxmrkzmsqq1q2ty6kp9jo7v2095hos0rr5lmu5j6ci132cnr505cayxat3o3ue28jnpwnr658r56lvcde5av',
                email: 'tice266ngs2y4padw3lolq6nnkk19cmc24dfycsyv0rizepoilyit997z4d68kr0uh7290hlz3nkh0bj6ppb0wxrajrnsy5g1h4eg10u8zicmmcd6osaen66',
                mobile: '1st06fyzrn1fa7yfwgrhwou9lzfhddrao6isa88lrmcmel9us54h6v2rmf94',
                area: 'e6zbdgev3cv48ztxajwjlx60cn0dhj6i1yuz36hz6ed4sopqmsx9untrihzdr9n15dx6xkxj17hh0bygar8p0ufh5dv5bwrdootzii343j5c87ksnvi3266ivc34bbthxxz97qiji7hgsdwnwcrfzqu1xitadqsugavfeb2as2fgb7crddahj1ln84w9gx2rvbqyss4ghece764exqv83onhsw84czmv38feiohg985chlgp1a0ld62zrbuefo4',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: '81yv3fsxp2kx2ccl65aodqqoogs9nn88izb8qbeqhyapbsx2le',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'v8vl13rgdepwr0zn0o0b',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'v5dbk66joiijj85qyqbq81o7r68pofccvjn6zqzcequmujo7aasd89hm3gzmrc6p1eyxexjin47gb253eizct3fhe0rfneeomkm705lrpnwhs4mv00z9bxqx0q9b4q4udgmij0x3qh1w13xkwu0m5kpknzi8u17q1djx0fk2nsrlxakvhcwhfoha1dhz48o2za5ccrapby3vgxtsaenq1o3yv8p6bjiewrebic7lfidxrumprtqyj4s1d5b1chr1',
                name: 'rrl3tx3795471yzi5mretrdv8aubu47flmlq91cegayfmwwcunxg8kfxv2vk3ytu371im8yyikcbpasparunl0k0pqc3gmr4quz552f9g8coy92r7ebzy8rvaq9lmtvzlv0lvrv899fg246amtevj8hsgkkstufi3xvi9mwtx6yxyjw4l69q4pfxaza0iwcduzyaehpwxv01l7ytsddscch9746se58j9e9f39zwhqew8lf1cy424r5j0jov8j8',
                surname: '105o2dx36pgyyki2u2xxg109gjgdbx2fti36d603rsypt71wk3yl04huf3xhfo1vrz2ebktioza4jo67vta24mjjg0se6r8bem5prldcxc7ncsvgshgnu0gcl1oi6kk3aj1nm5yiby4233c62mxae793u7oaisftedombbhrjomh76bt66eq3x98xmf31v93zltv1boj7ei6ef8drs0p30z07o574ix4q3x2vfuoemvoxcsuiijy0rbrgaj4eo6',
                email: 'aejjmy3aziusb2ag2rl6g6e59m3dths063mt5hemqll6iagbh3d6a7dh0bwmjv1x1qzmy21ka1z9wxy7bz9yr67nngbgg2ym8eezd9wvd3vkgycsqlfmx1cr',
                mobile: '3pxley4plvmrqp7plapigr5sy4b78c71hv30g64to3a37d90p23cagqhl888',
                area: 'nh3winprl8hdkqg5qijfy53fd7fswbb0husql1jseituy5wp1erhqdeffu7hzyp72g75d003q96e0fzb2d2fidltr0ksb4zd6gsnjqc4fm4f4yn0zggkfnpe5c7ebi8cw3i3egtlkhs48jddchoob5ivfqu0cx4gzk0yx5pl7zeeuxwy88keq67jigxu42p1ndhgmb1ko84siph0iyp64iban3ech91qbhjagk774y9uu0p75wy3kkkxlusrsnb',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'tqh32jy1fy0raovn582478nct2c35mczlsa7qoqkopep2huh56',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'pc7ppbztig7h2hh41qzw',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'bg7kwq9wtxbt2sv1gln4nq9ni1jeyf9glmemaatp8n3odhb3k5v964gsi6lecev89ne4wy8cdqanf0s3oe5zkn5v5rzc3qg8mj9yplg39wig62pr3uggesdslcwpgvceewga0u62nhheute7w18x8ccp7amcdfuv5ce5paf9a7e7us2xspk60im3tyzp18f4isahbcq5j3dhzgcidv4owfm2b7ledwudnkgtgg8hqea94up4ogif1u7pnvhxey0',
                name: '1uoroqcgw2a94c2cfd0e2s0e7muds8zo7maaqc3gj1nvpkgh5dvab7pcnxzcitq7gp97350p79ogjde37ghyh0g58z5sqhnrf2grh3gw2ywjr1lu08xi3dx0uyih98db99hmc8fc5s6gh19phgks55lnuiaslobk5lmmd8a9u83v8tx58nr2k4zmcxbz3ntwkbxjysxz3evkpbce68992zdh05zur1hxuncsdn6otidix8eegswkw59aqqq2416i',
                surname: 'k1q6mwxtd3trwn05odcodeaazpoma9esh0mmevz1sewzuw0cmu5nery2qgzz8mf4fxtwdsnlk87bnudzsolstcee5cu761mfrupbglgh3775t95g5xts7yccyzek9uspj0zw8b76d66veae94em7hqawoimkwb9z0pacphcddmpt965wvybgrvmwcmb5yth0vr28u3vqhrjz1uboulkampllrg87q7ucgmcfva046hlgr7smhz5taciwxyfpuz5',
                email: '8rudfpq7qp6spgjgdks3702y1r6gxsdhd361ujx17bxk5gvhl4pryu1us289i24i5xhbsbcvp6221rkl78ojuke1r6v2cy61he886eths83eq5pm1shouv9u',
                mobile: 'rrsa65jk1ukqd103au6hzv14hev7cmuseaqgwy3w6gzylbl8r65a82y2qvjl',
                area: '9z5wux3o4j6v6dzlsal0rv9stykvhcuvme6cvfirlwlaibyfo4kipqaqwa1v1zu1crt25624oj46zqnrne7401k76hfxf24jnb5rc2qx7liax91nm77t4pg9t7ysu2smhnwpizqhx3u5g0zwu0ksomojx7ftpxv9fzjixmpn9bhy2ed4orrrgzk04nyp80mha298ypweyuqr2hdd1idj8uffmsh3k7nj7tpql8ll9j5yl4goxn16hlfanoggw06',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'lpc3rkwemjnrugb042x60q1mo75420b54wdt6dpc1m4a3polry',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'ijn8rby1pcqatv56dt7x',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'm3zecnqy33d2echcotcve65xmgkxkgkwx9qu0i79t3yavvolhhrfow8q9t9l1bapnxbuac0zuf6uzpui0hoce06diezkuwbgpab5de5b7czzy6uto91n72ao7c4avwnoqvtywmd1oh90r1pz44hkbpebl0iq307dygfy35e2mvadhs66ybg8gf5xz8hrsyqr2sad3yxtca0mg84n6iqow4ztgd5705vn1scdgpohc8a5uuioes2m3922a6h6eau',
                name: 'mikbc1dxn4z2a0copg8m6iec6ub8akzv9cf4oy9tlc4ocfown0842d6kqkqv9tr34f5r7u4gs7vox8gt0tn498nolqciel6ywlfpalasmoxsozu9zg1ubyxzk99c9kpuee54rfwv313g5wi491qas15wigjdazpwx5ytrm5uox5l20681cfodudset6mjp0cnu94cbmvmxxq37f2c065qwlv2uowdwsqslp30tt3pa6r7jif7cz7mau9go2fjhv',
                surname: '7zzbdp0hw9duk9eow0ikjxi2pa0xwq9kyvxmxi56e6q65eq9jstp4d3j0vjf607p8dmc8izkjs2nfpyq4l7pusa9wzstguxjyvlxghguds5iui4elkdggg5ena09g1nmsw65p5wavh5ibwiq77tfsktmy6i36ntfnpf872pa04027w96vkpkxp05mfh0nt6371grp9fc1f99f1omp8axym865dpsbbg5ac97tlzxtwnh9dj8tzgorp08jltkicpu',
                email: 'tw3t137jipbmsr4yf6i9shohnuiwihkfyw4gtddxqb41l2xu38bnfm4jdcxq7k4wkpk4a0wozdrpr4j4p13aq9ppr2enuvho9ihey5322uzh2l1pyo0r0yfz',
                mobile: '4iewa68uq4mwn6ey0ryblxa8qfkl1pwetk2qxgu5pss67f7vhi7nr0t80vhb',
                area: '56yysinsibhjlbsq22fivql87u3hhws4xueiykf2aiaa8fpsksoww6gphlwmqfz1w5psy2pogf5wyn6hi2ozfz0xequ74rqk84mi025rjqwi0js66w0vvdux4uovw8i4dzbsztaxfmnr9ig7ahf6ebkjnffdf9s1sfqb62ivncmzqdyxkwk1c2wo35s67snl7yg4frnq00qges7h852a2q51acr2fbgzigmpyv9qlhdsnd01j7thflnqh8ub1pf',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'scggtvo8vops1t786iz5rredpmxep8ertmhb082kkg6r44pf8d',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: '80hd872746afgvorrx5m',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'lfaxg1317d44z5pi0dfgx1fre7c18ny9kflz7rj0jx5d4riwz60nbrnq2rd685fobs5wn80mw9se6vwctivlojeev9ja94xdmmysr67etu1n79on1hzsmucvgj1irvr10pmwovnw733t0391mnrrdnfxicq3637tgtpm5cbqmnkwwb0pu4jrybtpd9zua7l6tv197fcaqotqkjlcqhkmqa79zl0zd3ad6nnnbw5lmm3p5eubvdilvu93rorpcx7',
                name: 'bytooqd9kjpxqyjvf11ys9ghclv8xcvdtnkr63grfkr9seu68n3h939p0cy41kciixurhztslto9v8g1r736xe8tj30tdd8wo5qxdq2r9zyhalpdb0phiknj5g5xggfi48ukwokuwoqavqbey7tnk5b6l5kddhqee4ug3pjbkm7mdy9xypvk7sviu0s2j8tuib6kovzpcs8kqfphhyvpg78eats39pzh5glyf9e3886iyul7zulpqmpvspk88cm',
                surname: '7hvj60fp49tkdmxl998i8170ux75b1rubxmpk7hjrjtu16cymaky4hacbg6lwmzor8smn9xxv0gd377ieb1e9erg546fqihcksmhrx0jrxvn9sci3h8jgt0ostmz8i6qz348jw3kb4k3k12a62awslym1ku9bbh178bnmcsa7i5twmfkv0ft6nxfu1xiaw4mia4pj0h8y3nx3tn8o0wljoc3b68tvtp4dhqi5rzhg0lwnott4an22mmtuie62t9',
                email: 'k0vyqrmaz9gi1x9av3um13wp4o7t2mmwf86s08jx73369mypb3lusgk7ce2hcn13hc2xbhoy6u89fum1dukvg9vr0lv46qtforjcueusfdssg2wczlgmfbc6v',
                mobile: 'pa12n463m1xst3zmuou1h2xht3uqm7yjgkvve8tm2kgw7qhw1qttobd3jqeq',
                area: 'gxs6fk3hl6n95dly2whzdx1smmg89488otybjus1qaxjuflqvgk5eo0e96yeurp5fwzjy2hcyinnk7dvpj1jkfrexf7fhjp5izhn99a2v3xnoidhu3ocwlbyny11vf2b6eizp5wfojhii1c54prr152an7xkix3ce76rh07gegcm4n0bpiik0kl8f3h9pw6i32ofhs6nf63y3bjmddqprc98jlb1xp5uky0vsqcacejzcj1cbgojc85oj3bagz2',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: '7jxpemm5v2jmsxnh44oac7al3u0509180m3krjz379lkfbgjmb',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'i4nlogxysugf2h60ut96',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 's1jcq0vin3hob7dbjsqyl1qvoq3jud0gxij1p4rw158qh3je0o4om65mutwzlobogxo4470o7kb6dgfj7rw6az8or0rf0425qfwblzfu794urivo7eh2mv3keumwvv7teqmbuoz3x5dj83c4r5stqfpsetf5qk8s3eqo5qmy3md4wl0u28qyfceaignw0wo7j9b6jl6e7abvhgtok7snvazkez80f6czabodgcn970v7078fznfhsws90qevrsw',
                name: 'eaidcpj6adgjd8zqeubpd088xytl9fq0z1d9agyvm13iexwobgme88ivqoqih58bivv9ylxiac1qi1chhhz5exlg9w4vl3ser5cfs4r3bm3zc9wg8o3vt8t311uq92yt3b1vjqyltills3e3ukydnbq5sycbbt6405mad0lallzxb952p3045wm6da3hmkt000ryw2f78szqx28ywqz511r59trqqgn349jbjqogv1fs6f0c7fwzf92p9gzie5e',
                surname: 'vb51lab9277m4ov1fcowosnkoux97lrkhgjvf8asez2dmvzggrijjo44u3cpc99s1jx6fyhetj7by90ejzvult8fuv082k89nxaqdvv49u7skcj857fg1orxa356zi7lrs9b0zc9ithubnfr49mvurox011qvy93cbtqhaqv9axmsgx3p62708eqjz0u08b7d3kjez47wbvltva3qjr3sv9trwkpm5ouhtkjed5k3ykevryqbsh1t3cgxqw854y',
                email: 'r9vxrkhpmlagukv0l7io5vfu31u4cky69m8ai298na5p9mag99updusguynmcui0i2bbvhdxxxlbfcim7eeiefwt201rm0cq7kr8i8z3yez1jkgbpxdifhf4',
                mobile: 'ebfd8563fmoph7fro6p1ttreoa0auf02l1dr48uvx2x5t0ga8g2p01cr41f28',
                area: '420a562vho8yplajmjqp9hk2mmomqayo0zqbwm4h48rmhmhxo976beehao5hnet9fy9aoznoyk4agg5izs6osqutpoe791d1fqwno5nsvr6lb6oojxe8cgutnrfr3bkgxrrffntsnaji99is1tftzycat07xg0euibiowhbey0yrzl5fplrjubjhxpzox4w7qff8pr75z50n0xkr6bvb809bzif3qn0mvcafyeecc9zq28se4xch4hc4qp5h5yy',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'mye805qydtabjiw293x9445b1jhs87s8q7kx3gcgvjwqol8lwe',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'gulxpbjnxaavcgbbbpg5',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: '71rkwjzw3potu0v631ruk0acxnlu0lew8s0rwdcmg7w13ykzbfoloyqd6r577v4gp39m0wa9yrox26dxm416ku2609x2o9ipzxp3wiiag23et1vso7xiw3svuiyooavqm6mc7gcapovi9nogeguhks32sd993p3hvwedmfj1zcfo666ccxm0vgqblgpl5aljwhyltklwwubrt94au6y7yogjs6i7eknke4ofyvore4cz29w6mleug9eibg3w9n0',
                name: 'j7cxyyix4p3yvc26di4rs6mihw3ljdn02lxmi4u09k5bsa7f9cxcsp0xd2atevogxnjgbqcwe9zccmdz3yb6620b8nlr51yccrw30cqu1wvfhzwlscrma7wjvkxiszxlq6xn0ijdk6qlfvr7z19oqiiprthb6fcm8boox2eivbk1dn7iicv4taq3mfd0jn28ncjijinm4zcdr7e6ylwfa05x6q52zwg608larjnwp8fqzc7zw73czz0amrhkzno',
                surname: '27tzax4s7uo3yof4bjtl6otds4y75cj0pehf1lsy44fru2gdyrnmatqzk7a8ngpojcokvsnyz5frwqdwy2o2ew1007bpta0lz867x269v8g1ts6mz8g7odi3c63b8rf50de3cn1ugvmvwkte330m7fb1kdwmcettlm1yafk2am1j2ia91w7jnngo48k1djjc5zrl3bomlzwox2ia5durpqcd0ffhafgoso8i6m52ns0toydpmbgvh6gc5r53iqf',
                email: 'v4vf70dmosj64sumpqp5vtwxddbwjauufld0exwwomitdxts9j6wbxqwqa7n144zboe0u4xpr3nk2w9o0q1wmytqzvepy98wrn6llm52judlsysd3st5p26o',
                mobile: '3vkfjq4be9mzp2333c9reeje4pqk2ijsdet248qwykmi0grzdygb1rn9go98',
                area: 'o9ijaqhvfjpbrinw4b4ia6igubiqwoekhynuxzfnxihl2w1u8vp4ps83i2f26by0cs4dnjc8ela83iiwryu34eti3akz842pz3mbraosoafj8deovbseigw5vnq5srfe8tk511e51vqo7hc28gnc0ekpdpvk5caioebvvvysqrwdo483qjvne98r3l2fuvnluz7xlyx9mf5gskm8498tq1k6qp4eprex8feztqauh502c4qgquuv01wi71m6hshl',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: '3ulg6t68l96kbi1s1d3i626gbm3w23tpp0czv8a7kdaj9iccx4',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'n1gzjte07mx7wz6w3dqw',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: '80llw1tq2pi8n6l0ze5l41the9r1nn2zuevcgiyt35x2x55lz1bnqakrpot1z1tsfeswzfuiwh5mb7uk1ujounv5w8zt24hekpvlsy4i0lpzvg1m4p1or8um8fmaqatgmlu1x6sl6mywkqti4vpnk3ydh85s5anxc2ez0zazbw09t32lsol5085d7bfwym0t9y9tnz4afrlqfs507v1q0a6xfdsr6k7c3qzbonew3233tlmkr0jvi0ufkt9jeyi',
                name: 'kqab8na3m20g0k0zpaw4zij1pojtjj435oehdjdpklcrthqhdf2m89wl6kmftrp1vynznf1qf6wgkpbql03thipvwdy5ijbo50t2n3um45eulpo77vuv63kt3i3umnylww6di1mcou8zo7nh4s1okimt3ep4j8aywtil0mdpjsd8uaoerqppkru5ea636n9146lrqwkw60bsx7srktjdi4726rvxpp2ab8d1yfff7ohifd8uxi5n8l1is3a52r2',
                surname: 'cx5uzccql6rpisvx6brrs355953r7d4b1cpurm9iirmqolau00v3afcmnsj23gqr87418kxxnp80n23b7bxvac98isi3p64zfg71dssoplsuviwecfezcfkn5iff3n3uchufmh28j04ktpl1ddsfy60xqmcvrkpd5n06719dh2s47kc8mavaucj32jm7uk5pjst5escpmtb5xdw2sat43nzvy97he62nua9x5exp5x84o7ydbq1x9m8jojoc4rv',
                email: 'r9diroihkztg80f5tkd55t2y93uha5sphxdgvqo8yan9900hl7pw8brhu2q9y77bhxucuhvcv96vlmwl8kvkt7ylmfpbfn2l17jzes264b3316lcvd596wtl',
                mobile: '93hmneypuzl1nqu8n9nwv216200z4o78bz8ddkvttsw5l6lyldcburteizji',
                area: 'nyzvkobp2gkcrvvnq6q4arww7tzu5dpxafzjmik1a9xv174ugejt2fpw49u6i4zfjk6ehrmy2shi7nqbqka0gmtb409a5ir6o3uvlur29uutt6wxbrqdpgxv6jshw20yk7a57e0qpqklz331i1qmc4odpriiimx2dk8sngqhozqsd164s3l552exq2fp6epbd1jtxqk9r5gk4a3lnit046loww9g96mng832gxp209rf94d1vnfnoqu214u1fev',
                hasConsentEmail: 'true',
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'q2zb40w430fn8h5ab16hfcexuvvkzj4m41dlm8m51otnsfwuax',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'atr54y95l2tq6rxboxz6',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'wo9prn97d9iwoye7vdpnxpx12psmu8ex7rlgz2dq70jgx0oq8lkl9i778ooubjb3zorjcam4cn871r5hzrrkl6l5n5zn1bywqalh1d6ytyt94569lfsh6ylf0abzx3hr37j5tja9f9pwwk7j880i5ck2232ezwmcryqaawuumlxvrojse46xaj130e8w2dopj37nkmtgit6z762uib92b8t0l6tgjqaagfj1cb0soro1rzbx2su94kb69e742x5',
                name: 's8qcg5be00ujgdwpol9c41ttl361to4lli0lm1lho3kql22kulthlul0s936d1d6xwsh9kkpks2377ugdryk214nr0ljcxry22ggl5wn339wxjp6z43dmvs1zszdj2txv8p9tc25xw5kzd1uyn3zincslalvjn1y5s87hlqem79rvo4rlp7kfju3fymdx1615a0amtmhx8dsrdm6sz6o069d3l9hj88plxcgmxymmdrx8sfzq93c8fhkngk0391',
                surname: '48o08fzghv34y1vwvlj8koqe4jvwacp5r95h7xdmg5gr34dquta2bjow2xw710o69vzyz2pvccfernrg2qks97z8a1n1bocp07502icfcgw9x22cw21e980drcei4otco5uqv1nxz9zskk0hf38h240hsywz6rfpgucas30trkuo5ctgo10xbcda8lqt61s5joxi8ap5z6vqkmg3yz21xpygr6c4cdhakbxo94wcglqhlhh076gxvl0awzn1ccb',
                email: 't74nmjpziwjn5g07safjdsxwp1i85g5685llbittv5cr7mkewafa4t7nfs6s7wlvy822et20eokzcv5j1vr1d8tabwwd1u1yb1b585d3h2x6rv7923xajloc',
                mobile: '6is0e495d4zon4of8hg0hu69y29jyo26e6yu041x48fn2rzntd6yxb3me1zw',
                area: 'kxirusoenoko0ylabwv5romlisswbl5dfcbtri0u7imb430rlf7vipxwtuzm86ny9h15m4mu6x7dr5afp7oskrh67sy4yybrjrt375pdig7t8c1d6jeacl2ouw4obh5olavg2vpjswldqr44bgjjyhtzt4636mthrjkgsdpok5oouhzutg5tw8qszex7848hk4iufu90y07djnz9dacpk790l0hdhk7potqvfs6z64v4pd0qu4qe591ug4m10y6',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST cci/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'c3e72afg5hp3njwbd0idb9chbt9hxva0j1q6jdycdpvu90qy3f',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'dgery5k2wwkss95uedm8',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'vc7cgj1ccw37v9av3gjsap2rvu6xgkhytn6umupzordxpqjg7azlzgbtuoigsxar1hkm4fy4li5i2kwi4zp22ndaquh3lq1703ri3jbbo6ut2ziujzm47icy7zpbhqod75uz059wttkvgqogv70ykrnque4go3tuy4h6h4frktpmc9ildap5klze5tb2ag2raiq8trp9sfw21v2pemcsca47bcyvg5vk4n785ug0528rwpwabj7iklayxacg2o9',
                name: 'o7viskee5mxrzi4350e0m5imgdorpmnurmu95tgt0qo0ny3ifxac19e7cg8xr3oqncz1n0q0krh32acw7c757o9vifaplyr7ng9mtw7azlm09rjddq6zmrucs5pcw0tsbab5hgv9vqvs5diotyfaxj8z2l46x3d8f10s53h5sj8uw5pno6av4mztfxkkonk0ggfn1s12wkvbd12ml70g03v7lslt7c6dlstovla4dabgbaadbir56vmm1etvs4e',
                surname: 'zenykkk25kqfujybx96tvhwn2om0vkcr48m8seo5mcr1jswse0y6odyl7f6qjpqwvx5nmytfmww0n1a465ylw67cla63l18fyyv8men6yyrl5k0bfsghxm2xek3ll21x43hcan1biuo1nzw467zt0sa5bwm078tq5y3671uxlzumvemernt7kxoxzl3btu5fx2tbngxzfn6334bpn7rk9vztttp4taqri3q81jc02mmm7gdeb3m22jxejvbzn9u',
                email: '4ecta4cimu48zuoqepf0mmw8tjfcsn2krgmghzxsbg0ldpdvz676g4h0qk9scsd4g4ymvo9whl78ggksela39ws8d3qtbx7f90kbfu6k4ztwkyb99yqinith',
                mobile: 'ewixqf6j2dftwrn8l4hpb0k7g2hzhfh533fh6slqa7e1jywqt4ye6d6qoqcm',
                area: 'o0tthhba82jakv9ngowoo0bk3x7okeb3hf8sunoj3awsghks50d3akcrv2av0lig3iau4g7dlfdog8nod6235936etme71s0rkvuwmbndldliogq9jjoomnfpe3ei7m7zzzxzqjya3jny8fvrpjjrqa4t03lvhw91bh613974v7lrghl95xmnpfcklxbdvgsdrm2qdc6tbqhhzi9hdy0tmwevgt3vo9sf9ez28v9vo59q4br5g416to7ju41hh4',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST cci/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'hhqe7d35nui9mna4xr2olrjy8c1zkye1zqt8l1396v9ni67oa2',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'jqvxvco9ivmqxlllt9ru',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: 'jmxjdk3ssb2a6hogs6kxdwh8l283etp4worcs7gfn8s35dx126hu0ksyxfvmsy14dfx6a5gobv0wqn0tq9xk1oz49kv8m7ujwoy79rcstmmojt3recql18l4mdqaw8i040cmtj2a9nwr7mbbvzxbaweqx6zcd2ktqbdky74ec3u0v0k0z3qmxvlv2dl1fo4l47osfyiahw0i0rnf154p7pv5kc5m74ww68t99vnlpas5atxhtykjz0hc9s24jik',
                name: 'ap4aywz3vq2tuvajkoot4a3pkdsp3kz7jizizevgw4atxurkebay33z2bq4057r81ve8hvm2xtf8zx2wpb1vf21apqam5oy7dp78n7n9if65w4kqhl23xg80wzasm37qxyosr123ectm6wlna1h5i8xt9hr7br115o7bswu9yrfexwxdcld0d15uyo7by6go1pj3810zq3l5dmv4nd5on05ij22d5uw875ookyptnaadqsxb0tye36wzaotshyu',
                surname: '01rhq5njgs4duw7pd6ozfwt5w8xfxdafodtwjw2aejjd8lcie6mz8bq52371e3erblp3kmu5pjqh7nlw4ty52kyv4wdjxhn8yx9wip09xjsmjdhi0sra16w5p0din2reoe55jiovfallmmoashc8srs2rw0ccfdn9bj11o7dtl6462aajofjrzcimw51m9sebpb5qo5h367gtur6fgl3v5axv8c58y3auf4c16ss9tzn3v7r9q3b311w88y80aj',
                email: 'qr4eymalrbf1xegftz9p2vo7t3gwuyodnrgfca71g5shh7da28692q3m2qx3bcvs5w9mpgqk45d8dpi7u5zkoy549mzw0utyoeybdhdenxybq5fx24uy055h',
                mobile: 'xjkzyjb37dqds14jn0a5dip5us4aododw9dkvhb7v56ir9og7kjrmecojvh1',
                area: 'we2gl01czrmlrj09apgzjvsw269lugmzqsalk2dnm61luz8znz4sdy4eravcobb2btq7rp61opunn1duur7p6z3jkkyyqwjp60e8jga9pu91zip05fhhj7eloaha5r1rzm6kyzvysrsca1jkfm8o2jmfpt4ih3gxkg8gj2cuivvz12mg0et94e2qdp4ud8b6p42xg78s7nvbot2769ur3xdny42krv4mkk7obvs8w537qy6y73kw2z1cmhgmqb9',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET cci/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contacts/paginate')
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

    test(`/REST:GET cci/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '2ae6e980-24e7-4a77-8b52-d9422bf17dfa'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET cci/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '10ee82f5-c66d-4385-9aa5-3960c73c9d65'));
    });

    test(`/REST:GET cci/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact/0ed26c68-450e-45a1-90e4-01860898d8b4')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET cci/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contact/10ee82f5-c66d-4385-9aa5-3960c73c9d65')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '10ee82f5-c66d-4385-9aa5-3960c73c9d65'));
    });

    test(`/REST:GET cci/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/cci/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT cci/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'aff7be11-39e4-4f60-bf79-4a769e661d79',
                tenantId: '5ab7ad39-7bd4-4375-82ec-d39719f44978',
                tenantCode: 'rp4rp13sgo9w3sqfpgf7opahlumwr1xk8erjnodct4k5i6xzrn',
                systemId: '122115e7-f551-4220-95f3-655adafb171d',
                systemName: 'whwr6h0yndu88baplu5d',
                roleId: '2e87bcd4-7f61-4c7c-a54d-9741cd4e6ca7',
                roleName: 'q36stps9yyf2t8qs5edtrji9l33z56whi5x9zkzpwcunhwjd1frls194vttdjo03yrdp6hhxqlx4xekrt6ocb86bp4538p2imed1ch1duzyxo8u14hr1wk5qcbvbsndmp72je91kxvgnw9572ul0z2idkz765n5jii0l0xyr71aw7p7jvs9wufgyptsb4s905ka971h45ulnrgt7c2p66ihzyq38662toreolkcu7ra4koor5tynnswwstgec5q',
                name: '8fci6leycgkewms7fmtzbpvqigyhrq5c0oiqj46hcexfd7gkugui6f9p0h705l5oxfyt574sn8nfxnx5bmwucpqkpxezjqbw2hns2ajnekeqcnq449ujf80ukzvlnqsdubf80o3mngyw8y6ztelpogclpq69cxglxlqfd02wgsxpaarw5lkyuvqrffb4m2wp87r1k9k4rnz6sv8aht73l6h0kh1e9538a1oycaeqxs2sk52ym5y857uuvovzs1p',
                surname: 'd5aec1igaf1uxtlbwyb5zblil831fml8nv4681pn8jcf77lxl4cn841xil0te1c4wamccdpparayb0oapt540ebsqj67vznfhg5yr7a1jp55pi28aed8hfvsc9qinlmls5i2qah6s3ur1kgs274ayksaqeivk3ov49x9fup154rdq6owsg0e5fan1bd92mtzodoejihgwsdbw89br4havlo84nb294lbixzwmclhpwcm6yzqww9atzo0494gqyo',
                email: 'md3v8vflkl4qrrm7tzjgob54g87f8hrpponzl2usdcf48e8ac7m37n1z7ze978ut78ed0199cf1kteqdx1ynet1syvq57z1nutfc7gx62wk3ij6c9qpd8fge',
                mobile: 'mcxhirgw8yarl76wf4pqq22w53do0bsscszaf7kesib045mzuor7wuck99ka',
                area: 'rtdgnmvm7hcubk1hnhjv6mdl2gpvrnj1mb26xc03r5dmxg24fmhtdrolkfzzwju3ullehfcrinc29nyz7gdk3hmdelk6ywlh34tbgjkw9n7gmb8li9jrehc0vb1srwyvxkwakhxbou03kwpnsb2huu14pxepe1kvemk7kbkf66pbt17crj1clgqo3dm30iaydmhsd0i15x6pb2ms37gqyo3leybgbkzskue6efuxxmaovmvyy1v69ouu4nel3vt',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT cci/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/cci/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                tenantCode: 'bmj2abqrg9daeed616p1ddfdohsew0xzznbkva4qin5au9ygca',
                systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                systemName: 'x4vqya60x49rf7w23jo3',
                roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                roleName: '1qbkmur0ctmyhc8ns80scu6hfystkw4pntw3cvx58ilp5dolftcqni9wwyxkw5b9dscnqf3itokivwj7r4vugoef35txxrceexktwgrobhq8kzq6xxbt717d8ek1x4upd6k74fi078vm2f56q8e61u5ia0bgy8u45ckiau3l6g31clwr1gpm38zjbgxm0au04qfwste3crp0shku4hk9q5c81y4oky5stxrhnb9vo9zhm95n3hg6v26jgkszgqr',
                name: 'ls9je9z91s7dpe4sfdt79ublk5z8cesb55ra3aq92vvkr3suo8u6p9v0hj9vdwgf4yqz8g8irk2w3i5pldnx85bviua05bz2gsew4xhy30ldiggbyjedqhqcx4bqjxx1ffcuwz7d6l5bojyzc5soxfhj2his3fd8ypuica79htij89td9ocsz4ks8beadgpdsx4aidw5tcgm530qn1j8en2ubgu4u8sajr3x3dh5pcch14zhiacgavx67bxenje',
                surname: 'aeanbo7pvihidenjcyjy95128bb60mxe4t6z2vsgmvyefrb4yokvaadm2ln83vdwdez268k5e5jwqirg4pg0dzseqdah8c5z4ta7ffkz64drlpa03fh6g0zvayef9568kbhr70twcc8qe5ga4r765bldty8mz6g141wm4w509i4t2eno5me7s4k6ku2hu63ofu5smo31k9qpjbm0owc2kim5q0yyd2n3psrw1o9izfgmljzapypxbplkq7iq4yw',
                email: 'ofp0af9yjbkdykubzidi9w1gyau7dp1mhi64jpgtjaezv4g3azmuv5ty4m1cczqi67iq3j99ak7dbzdskpqjng0y1pr6n3x8w9nt9iu1h9vava4gj0bfaqjt',
                mobile: 'v9nis4k3kab29wl0ff48baeb4jfx8nypuowp13zqcgil4gs9uh47zu3eez94',
                area: 'utggytebunz30zn5i3rzm7c7e5dii5ifryjgew5kv59neazhxclek88uxhkn8zdoh5ywe1vkaumkh18e2x2v4kvokwbsd1xzrl6vx4j0a32cclczbg2fx0y7tdvs213vbu64n8ua7xa41k73yukjy8s39l5ue4enpiy7a8wdzqr7ay742oj6kx4p2a9mhin1hr46ce6sz5689s5hbw9kij8kaxk98r5tibjebnopw44vqz8hm6k686n3rhr9zan',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '10ee82f5-c66d-4385-9aa5-3960c73c9d65'));
    });

    test(`/REST:DELETE cci/contact/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/contact/945d66ad-b2dc-4759-99b7-817d7614ba1f')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE cci/contact/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/cci/contact/10ee82f5-c66d-4385-9aa5-3960c73c9d65')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL cciCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateContactInput!)
                    {
                        cciCreateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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

    test(`/GraphQL cciCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciCreateContactInput!)
                    {
                        cciCreateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '1c94b571-d99b-4f40-b21d-51b7834b6d6b',
                        tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                        tenantCode: 'pvb6lntjzm0mv4vr0ikcs3uutz1x7pgjto3bwr3wrm45jqgqtg',
                        systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                        systemName: 'l7jdukldf8hrzqvwtqek',
                        roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                        roleName: 'cl73o7jfzohh554xcspv91elobpq25nmi1rojk861xwfk3i23ho9xcoikfyqt364qmu742z4fcl8zxn8pea391r3igmazql834817su6pkot5921di1aszzl8bcpsnweq1xannqylf2lrg4la6baxz7b1aroe0fo4enkzb80wm957akyeni6mbucqmpaza4ngkf37sz8b48rmr7tj3iqoykfv6356311np8pfrkyjrxnbj1rtywsnfpfwtanbxy',
                        name: '0a73687kog6x20dd9oybroocwr9oehjbzqv62ob3npqpfv0sd5oyjbifadbseueemoav9wgk629cvoy2jiv3c74ngnvu3h8ug8n3zowq3mhbl67kvc72w4xtmv5qweliaj7r9ywqsp1odvwiqdwmlvgb51dck10k9znlb752l5uuufpjflxrkwi8l3o5kmfpa3ody3xbvqcqavqul016706t7cmzoorqop4gd0cp8edyj9ep5ebr63hzi76lrm9',
                        surname: 'rbsrf3i984tzdv8pikk8b09bg4cn2qe3e23mm54tjixfwuvjn8chl6vnxy04t742yeq2gq1a7270t74ew130q81jhmcdq2x77fnd46tc52ffj8chb4qgz9lzbeava2r20izn4uxjnhr7rrixzfoon9j74erq0qqwdtvhvl71u5zb5e2vwej440gvgrnlqt2pek2jdm2b8k0o41v4hhkkel22uz0wess2or1q7zx5ufxxgk5e4hiktkq1k171cbc',
                        email: 'o0yw6iwqqbishq5h5tmlkr6hb7cub3120g34zb29iflfzelmt0qifyssxfzz4pdk2p7ikzblnl3wnlh7x943ghp5dvgirgfg6yxv4i0ufilwpoxyurh6cd8y',
                        mobile: 'xydzbp5plf8mxcmll64p01c8708s4chkuke1u8ep0h2uopzrol9j1gl42hcq',
                        area: 'vj7voe7q8ilviovfvg947r3lyzrkp7ys4758dcoaiuczp72turauq292tf516rdrtc2btwm75pp5v8hazo3xncrz7mx3x3cr9ygzn78nkqr3bcr0e8hvt6j9hp4vzh39i9nrzf0l3oiy7k7kg69quunjho9e5d5jjqx8mxbybbe2pke67grbhskqera2e8l7yks28vb2agtxkx9afq8okk1becrpkupqpehetahwwbtnfjrbs2pkebizytm1h5y',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciCreateContact).toHaveProperty('id', '1c94b571-d99b-4f40-b21d-51b7834b6d6b');
            });
    });

    test(`/GraphQL cciPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        cciPaginateContacts (query:$query constraint:$constraint)
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
                expect(res.body.data.cciPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.cciPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL cciFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindContact (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            id: '31cf42d3-62c0-42bb-b760-b521d5d3d904'
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

    test(`/GraphQL cciFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciFindContact (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
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
                            id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindContact.id).toStrictEqual('10ee82f5-c66d-4385-9aa5-3960c73c9d65');
            });
    });

    test(`/GraphQL cciFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a5f22687-8083-4fb6-95a6-8c05b11e35ac'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        cciFindContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciFindContactById.id).toStrictEqual('10ee82f5-c66d-4385-9aa5-3960c73c9d65');
            });
    });

    test(`/GraphQL cciGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        cciGetContacts (query:$query)
                        {   
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.cciGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL cciUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateContactInput!)
                    {
                        cciUpdateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '25c4c504-9aa1-4dac-bc00-dbde7000c2d1',
                        tenantId: '2d0932e5-764f-43be-87ce-a26fe20b08e5',
                        tenantCode: 'ztttpyafpcyuryqg5okc49jpn13b0hcs5rs0fs9slt9q8j564l',
                        systemId: '1bee6d68-9c9d-4dca-94ea-ab729b863f2b',
                        systemName: 'gwvybpvfrl9mkfc255dz',
                        roleId: 'e72bdf69-7a78-428d-b37a-c46fcf067b13',
                        roleName: 'mbeq2vm2yjn18k6v1kk17rt1hricc0l4i2g3rlqg1glwz10g4nxc4qv0eiu4vlguq4qv50hfy4lnq9pmg63djcj11ow3g1xikfm64tdzmzau4kyvlnr4h38utcy9i9k93ye650guc9kypojtwkumup8xo5ook2vp55zloch2pywxxl7159mh8pf9w337a7uwcwtuisqchlzt10rjs98uju4v3q58spkhfg3jibyn4r5yozqr5hkff8rlfoc15jm',
                        name: 'um8qp8pf5bgpw8p6bxhbt52ynhyqo7ysismd3yhrzwuk7tlieka4blvm1kfcu3zkvhgxejvvagq6nia2ywsgt2tbmp2kwwcftmqgmiqbd7duxusndxrfkdrwzqnj60ihf1sgrjhd4ou4f5i2vwifmsz5w4hak6e775y7yx1h7agdv6o1m0ks7fglscag1h51e6v1l3digrybo716wed13kvg2fuzdlnaj3o7tag4bb6u0ek4n3mlhokck5xoi9v',
                        surname: 'cfg3j7kz0hdvrfn3xed2f7dz0r1t4s2jtp1qd8rctrqhyp9o5xacznkq1zzqahogfezt2by6iblrjjzdjlrfyxr0jri5sj5dxzesvvuqniv7n5yjs13h4quvhzrb2ferlt5wj93r268ws6n67uzd1fddbm2b1c0kx503w92o52gh6kjl32iww08wzp6daqajx7li8i0xdi17dr8003g8wpv6rm3im5131ecjry4368ao0t47za5ohhuplzm3j4i',
                        email: '54r5g8muqj43n40v2vdry6xgafqbyge4v61htyxsj8rsrs2s9kguemr4xkeix6bcij7351yvkj8279tdhsmup0nihbuqzzz63t6c7b8hkikwflcwzhcfzf4m',
                        mobile: 'iuw3fm6oleicxxqyac7dxugz57x54wnpzvnhy8uyq9hape4i40akh2djv05l',
                        area: 'ns3gtvwuxcg4795rv0k22p9t16y65o670uf90n0i37g028p3ftzmzave6vkx1z3e3fnkowhdzs6wxd7jqkprquevlig18a3tjz7emms35ic74quifuy9hbz3j4va9zov5u25unhgh9wsxhq8pxrtvitjum2jg8o6zeivl7kqm5grq4hciv5g3rdz1zjmfpu85w7dgt17ipmk52x2a56fn8q6pqpy6xh6u66gavmu8udpxwlgf2c0hden8tzbhvo',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: false,
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

    test(`/GraphQL cciUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:CciUpdateContactInput!)
                    {
                        cciUpdateContact (payload:$payload)
                        {   
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65',
                        tenantId: 'e7029787-9d79-4921-ac47-c7bce32c67c2',
                        tenantCode: 'rfrbfy9uwfknb4m2p80pfd0ydijfphg2lt1eu0k5q183xhqxw4',
                        systemId: '03867004-4e31-472e-8306-17dc50d0b36b',
                        systemName: '323b5ksp28pk51u7t4dd',
                        roleId: '07c901b7-2220-4b89-8a39-64b11e65829c',
                        roleName: 'm48rih8eiakyk83kqabcmgxordwiizoe0535083wi6xfr5tlfjosogfggi18uvlujpo24mki6j4wvt14aq3fxrs0ojc6tiun8g1fnhld71n7ued9sarsi1r2suyo0s9gsjjyybtyj222ysvarsj1x4p7pr0o7ke4mh9rn9khk024dcx0yhu5rvsp6e109z9zwt5xmxsabgrmaazvhzpjeeksao3btwi1jc9up7i2iu6v3iio0buzx07ku61eedc',
                        name: 'qaepvrnpuqs2q8yrgugj71f3dc4f85akdgw5dqkdjd7ugrrli8ob57qof5d0s5ol8eza4t8y13g8i5oyhyi5v6zw6pt1doyzv8bi84nv65oaqq8umln49lhgchq8k3q6fxjar5vq3v9ga4codrkt8tez66s7deteged5j9amfrqv1jbeogatoatl1vdnrsvel9ycdami08tkd8o5ieas6uwneinesj1jl5zxg771kx6nrz1x9gbh3kiorpqy0f2',
                        surname: 'r34bxzbxh1ksd9vawbxs05792u5dwq0h9p0hqcdv5kghp8lrla6gxxiftugpbyswuewaasfrse4df2mtkv6lrrg3hbb333d99gdz47whp5f6lbrz8ckl9qkad93jbatj759sjgrtydb6jeqmh8sw4u7purfns79j16d55e7om6qw82b2vagrok1htogvtsp4441fedhtrxh851ypefhogdoz0dz8130s0fsy53wbqhfjh3jmxfbod51y8i7v28a',
                        email: 'goye9slmwj1h6w9hvq2yp74kx15jc2of98fymelnus2k2f8pcxsnmyf8vqvj7idy8b0908hzy2j261vjjaupfd2jt8k7rkocs3mhnsj5yj25pwycv1ajuqex',
                        mobile: '2mmbbvbcjjradwr67cdbjoy7jp6nvkeqs3xmktzb81elv1x55ez6cstmzfpx',
                        area: '7qyfb5m5l8ogzycmrfzk04kuy8v3je8mfm1cv0aiy1zzj6nu7yw0dpnmfkqc7iog44tyhqf2tg4hpc8qzlrjq77j260nllbhn0vjp1u0lqu9r4vlpjbl0ry9m4ggc6jf84tnecixncouf8z474i5z0kxo6enkz9pbmq2rlsk2wnabkssgsz4ua3uwku2hmeyfzo9rhqno22m3taj31gmbxxu6vibzkt2b0ha799ceu5tyezxpo7yij7gbdlyhfc',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciUpdateContact.id).toStrictEqual('10ee82f5-c66d-4385-9aa5-3960c73c9d65');
            });
    });

    test(`/GraphQL cciDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '785b96c4-78e6-46ad-b807-0fcb319d7ff2'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL cciDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        cciDeleteContactById (id:$id)
                        {   
                            id
                            tenantCode
                            systemName
                            roleName
                            name
                            surname
                            email
                            mobile
                            area
                            hasConsentEmail
                            hasConsentMobile
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '10ee82f5-c66d-4385-9aa5-3960c73c9d65'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.cciDeleteContactById.id).toStrictEqual('10ee82f5-c66d-4385-9aa5-3960c73c9d65');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});