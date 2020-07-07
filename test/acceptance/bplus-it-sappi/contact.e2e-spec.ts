import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('contact', () => 
{
    let app: INestApplication;
    let repository: MockContactRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    AdminModule,
                    BplusItSappiModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            dialect: 'mysql',
                            host: 'localhost',
                            port: 3306,
                            username: 'root',
                            password: 'root',
                            database: 'test',
                            synchronize: false,
                            autoLoadModels: true,
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

    it(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: '05pce0kb114axe4hn5kb',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'cww4b42g9a63lucn2c3ckf12bni0do5y2tv4amfsc49k5z314d18kqxbeeif810dgbe2b2q4nkrrjqjg9334il14ilmtnk3wmybio6u14h6d0i0xln85c1j6lcgmnuys915vzam070dv0pdd1g30isqlqtleew0k7h1vcwarxxn6hzvgtw0mjrz06nncwryimu8p3ctw860k7j0ncc0z2at9o1m2q53ts1evhd7bo9r2appy9aqrso8cy7k0bn6',
                name: 'r4o3eobofh8ixg8jiqg2eveds4k6pp3eqfqp3i8iuny6gy0entdfbia26xeimuawbhyevwe4axgsroliqfja5fvsc38alhpste2a08p2lj4m9rg2m1032vdy1ekvp04u4ihit2gipfw7ejg27p5lsuomwznjn0znmqdwq07ordv56b2sqixzc7qchepphtzygjbvvdd6x612jrodzdk7mbcg6mucqua9xezad5bllcr3ejfuhqs6qp2luhrpttq',
                surname: 'jl9ipbz0ewq1jwjv6aky38nv84uowu552bbizqcdeuad1bst7lyrrmdw5qab0j6h08cqrv3297bow3t1fvjxvtkj56qme901liz2s68ncmpbbd6cgl18ale9mxf6v78tkv1lz6s4r4v7esggq9rbgbjxd184r1f2a66m7rnjdlk34swcw2rdh6d0tyhnen701ewnh8dyc54jn4ayqi3r4b5o8mse7kmceiwlp8r898c55ct6ekhk5sjivovt593',
                email: 'rp9u2olh96z3g37d5c5dv3lvgzgx9bc4j7hhojd1sg3cluguife7zb527lt9lv757sts0u9rkk21goc8zpo6tdvcmilvr6tuqzcbwhhzsbylm7x074cxyqfc',
                mobile: '98i4rbgphhgidyfkf0mfu8av318cft4maoyth3duxz2kxoopjmyywccxqcni',
                area: '44pbqnl6onlkrubzpmueed3vf1iyjgbb56fne13ib4sm7a6s1jsz8vmb5sjn72kbqgo67eziw6ywae5834xzgqp3edzwsvf6xjwknno8riqxfod2et8ifazif0ph6tsqb750ytqlsyxesu2fzwuxnuqei777jmo5bc1u1xd8gfohs2f5ze7avby55mskeisgkdkwvdvtc0s86xog9rza0qruz2rxxb59b54fctz45wz5fxi5sbkpkwz5jg1w4qk',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'e531ni1a4k2kidfdirok',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: '77u3g4w94xtiu6roa7wz5b2tp6o1rdn5hekg819hmcojln5beht5q92c1wyu83eop5qe2onzhasbeqwghnj9ikyme926hrasvw5wchhm1ymzvi4ma397kjlwm8t6bvaz83uxfxfk5ddwa3ah0qom38fetcsj8sok2xjyqbsgzmz56kx9at9wzjk0r9fglbrrbsyuhlz5cr6esjfrr104i8ooyxvpqbtsuk9lyt8ziayhg5up2ufbz07qdhsxsk1',
                name: 'izjb33gu75ef5yqnl360p0refdgx8i9cvnsgk7vup306wwj3k2t6x91x174kmvcfd8x4momnb3g1b7jlasdiy1wq3bcx3bjx4h3rhhhovpn8o7zcm8aha6xd2v2c5zvp0xdw0eubfgfs5lko99x0gvukll49mhuynxh0p2nlajdxkn2xs7wsu1flz3i8h5myocf6qwi93854jye9rt5fupgq5olskfvsja40tlmzxxqvyk9z17f6k7ad9y33y6p',
                surname: 'dppreq7venp6tff4clhdx77dbc9hwgg40wtx4kumb2qbi44bncbqswpzdstl3joi6l6h72jixag25weymgi2ugbyyf7ct4l6hm2jxdplaq29duj4vmsg6kelpri8q36dgvnvtwli47zsvfdwigd2zqxmcqvugs439pt9e4giku01xjdxaj3hu5w3cpxjkbfwd6tqm53phifw8jytcr2k0yd3o6119h2y5q3yzvfxt1wjjq6dejwpk7nn9n6bf1x',
                email: 'wxoarnoj9qgfguik7fzhjt5y0zpw087u7k9npwi2rqduntigguy3tsbrbo74rki2pm7mger266ujvt5gg32jft5t20snwgtzxwhwklhlddxsbeltbgljo4c4',
                mobile: 'o99ynovjw9fcrjyvm3ynpz8ew0osqnrwj5ptwpv45uzcb0jt11oblfsh6oo6',
                area: 'pqqhtr7dpb54ldmzepop6jom7cf9cabw8ci2q4zx95btq24tjwbzwyfx72nv50uwl0jltbvjtdo6066ot7z5dmml17nqft1y7ak0sznuoqdbhr6lgj3gsdo5bc9xsmej6jaeief34wm91kl13jjy5677qmfqkm1yrs69gl341x9p2ecz1031m8tx1lokbzw3fihiiphpyrs4f3tola8srwtsetmhx47kub68v9wcuvbbibuiavb8ftd0jy0kug9',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: null,
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'e1ei2n7uzzswe1gm12ne',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: '3gvs6w55h5cxfyn3c0oq88tzoggy86rflipio7z7mv7c0tsahi2lpeon875l9jjwatkxaucqlfbv7igxdvx58sf3q450jw60de1xgqhhxff5avikp60nws0siifs70i938agx4bu3wb4p26xxt7y36egdz01900nehjx1ab0fhhxj65lq1aupuivcj9ekef8gfy655dacj9tmdhmycpl8s9oia010rjkpdnefzda1s4g7mivep5ccm8reug2z12',
                name: 'yde12cfc7em8fr8yopz0cbyrl4q55kg14oq0ksq673qi23ihnwrn2zi3mw21o4m4ddxc2azzl4ghogefuv2twjxnwuho80l11z5m4rfhw02enzk1h1mkyjfvwwlautquvzvbb4sgcv8a8lbzpgu2q6e1v6e8si7x3lgn59pv6lr8ro45n0ryyidtt29ja04baovomjxe828bvo0kvebj0s9tr63qdcj1dpwof8bh7e57q7dg9qo6fwlyyzdqsw0',
                surname: '1rhtsd6j2tpgnz0b99215gg23nc3jr2c4flsgdxm4qzfo3uloe4vczurklxbg1hsmr9attkisgqrfab8xa9lunaoqnw97fecpevvyjj6rsk0h6uiuw3oupp4vx3f3e7dhvguxjg4x4rxrjez4s31g2p3k1af7wt7cu9fmccttnfu86oze7k7g5l46j2f4auw43clqntvhwj0dm4hdthheykc6kr2io5196ccps3k2a0svoav2cdwm45hc0xwhfq',
                email: '42jlou5ufxv630cvwi7c44zqjpv2hfoi88ursw8m70idu577rk3c0x3vqe3pfyjs97onzam3m5ze3zq5ddf7vrdq0w01nsq17zpsgfjj0sztlxzxhj3krfrr',
                mobile: 'hpcr0fx5hd98qs0vy7fc041epw2d9frur4l6agq2ifak0zxn53zmn1b1emnu',
                area: 'rguwu8lklqp945rcnlt5pqmw9pe81nc6t6go87owmyaj92ky9oif9q274ygl4c7zoqv9m1ltexytzhncaji9ku8d23fdht9atigaf5q3hqoc3e29nkjalm9rm3ayw9lke2o7zc1bpcoamiam332tw917bz3w6tvgbrulot082ecms940zhvpc61ecribauxuflvvc00ncv0xf12ei86lspjhu4izztpq07mgfbv1ngyqpe5ctbi9n3um9z0yr56',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: '8170f3lmw5w19d0xi23f',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 't33ko6ai7pubatflsgczjzqydcltcfoszyxzbsl18qop3yywq6eaxj9vsc2pz1xwwhzhwmj1f7c1r8y6qqpfmyt3uq461nb7pdh79wpcopw5dicbj9vfua6j8klnbn2y5upg4vr06tuxvus488kunhxnq2ayni98x688bvc3cf6cy61jxo8ztozgct6xzd0idurjtqvofe3d9m1b9z8ffadkuo0b9ygnl9hf7chl699fvxvfz9jqmeorf9igxov',
                name: '96681xplmyonca8hcbkvrdxp82oprccr53q5wcggca5m9ninhzidbtw5fv0p1enfcvhd1whgbcypa1ip0ydifj65l7xxo47y2mt0iwlftkobjbose1qsnge72fa2cfkpwawj9lyic4p4enjsfa1fgzrdnbnm2hsgjbh9u3guclfhok8a8bwcclvkvl32674ic8hhp7f7hzn6zhk06oo8rxppm0p1xekgxvaoydoe1s5blxad4ut9ju34va6hegt',
                surname: 'gyst9o05809tln0zexvrjzvux3sq2a1mlkfkhc1dp01utzrk3uo211cru1tt362iaxz3hwe64yx1zsvkhlq4udph0a1qr9roi05igyla2nwd5bf2qipgtw9cb1b98kt3jp1gl3jnp96vo1rrppki4qbrv8c4nnm7f3bqica8hrl1zxcoiqi9adqhshr13mt0o2bij3ygzj979cm1y5fog3l1pipntgvkjpi7j7bysccainfhrnuwpze5wn519y1',
                email: 'q0y7t9qq8g5fw5za3uvon8ar07dep6oiyjmq4tqd6zq2ghhks6ktpd7plxh0meizmdw9eqorn4d9a3169hltlw0874mbw1cc10k0itttrr3w9wfk4by8ghow',
                mobile: 'jezy6xv8qtcgdph4saf6hyxi2jlbycfljq1gzd8qz67cq9fn73qok8xg3eeu',
                area: 'hjcq03241dlf3w4zc59ft430mb2nt1e273v3su8cn9mcywfkdeuiq1crn3uujdl30mqqf4xfg43m4qrbpfk62pjxmxenc2xai8q8ti1mfk2kgu7ywcr0brs0grnb22wtb2zzxpup7ix5frtpfod483abbikxjfpln1s75rmq68jz6m4bhjks1ih8bqrxwmhapivpd4jh5342a6z9csorqlhw1sz0v3ia3ge93myc3j2g9f5l54zzbj9wvmn0ydp',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: null,
                systemName: '7yozf8ll3qbvtkwswny8',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'i9hfk7tmjxsb96j2cqupp232avf2slrkhcqguz946mte91tmiq7lsj79iqerq71uldcwl3nnf8oqhbm6yrz4763m0qguf4y7tryhq36d2vcpe5xt57p1uvkceax75j08mailwhqvsy5wdfegk4uk0oyb1oisxg8n11x88geaqohh2zsxvupxe89tdo4df45cs59yw3c58uhhzu96b63udwjqfdheeomsb1sjcmk3qhy1virk3qh8uze2tjc10g2',
                name: '54f2fslne4449mffy88ty8ooij03rsvnypca6pjigigyn8vtkc77zbhd7mf5v51bbzlqahgltx57yi56oatpzi056vn8sqhosot8cymzrerpxnwnr70x1cwzhdidfoec0ckqjbcqpch693v0sca2j9l5hqimxfydrvat1b93p2uhmmegkrs5rytmbtuo1eybbz2mexep2vxducka4lsbhmfvujjyfa29njq6mt0sc642mj7xqxxg7roomsbemjt',
                surname: '9e09fohifi4xklvqehqvs486doossghiwx6kqe0sgj5g8i0ay1zbe9ulyd2za5fpb9lspz4dxgi908q8tier52dwj72ejc2kxgz499xaprrlas207wfze2e5lbjmkgi4xnfrimdrh5c8owwwos498nf8psf7c91xdljcquj2mxqsjmbjtqh6t8o5blk9oe8comroyzyjn0r7n7jsehk8gs4luurgsswdg8qvs7x73vdy5vnqbbuobt1q4jz3hsn',
                email: 'kcppqlwzmnmemjos5gs4ok3258rlxgt7elfi88nhe5iuokym36khth820hyhdu92zk0inam4fqsn254djjb1s03w5ugc10u0fl5x6tb7cx6ckxbdrfvdawy5',
                mobile: 'jcd8wtlbmsjhk4y4j6txsmubsyywfe7i8i494tl0a7gse6oavqvcomcw1lmy',
                area: 'kb0n4rbljpfaqvo6xidbsy1s1khe4ybp9j7kuzeb1pgiskvjts6vjff1dxl3fed4ly34yqytu8qpx6m763xykpgbskdyxj5lbze9jmtvmvqv1qle9e381j16nxz86abu67kv58ol8zwpesldxb30g4o63tuox0tlh0x09jvn19qu7v66m0fmt6g3x52tgxipci7s8o0iin760c4strxz3wq08jq0nqds3f50q3vps7y21zjj3w3ee94yak2czmq',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                
                systemName: '2vduimlao8rdj5cwedx0',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: '0iru5t6ihe5udbyotux20hapqr3uaz4jubvh1xc7jvky00t5ksgq18ihd5wt8k5op73l594n8d924kv60p25e912t2kx6s0avxtj4k8f7bxeapwk5qhu6rw2ftibrukmoa3gjcrqzhgvvs1fdsxa7t6pl3xk4hymv2iprextvveonyxbnwblp1q0b1fv7hdiakshrzl9yrogp4nxlv672fbfhbeeq1g4in3y5dfwzvcnjlt9ya3j9i47pnz6mlz',
                name: 'u2wkdm6nrwl94agog763j37ws9fljbwbmy0jbb6ovb297sbdvbamvztd8sqoo1lnd99s3v6ipa46p70hnllt1kancpdlg8vnkla35j13mt9b1ce514z5xgygcc0i0isycsr5fsz5ogvi8gvnenrxipnjdunz5pn43q6mesqqftkbpl1g8beo0ngvk9ambu3vk2xk8ekgg8fr7v1ar2d5dyru1d760b4ggxw95disyaw427i1s6av89ttjasgibm',
                surname: '42eu51u5br5bb5jateoaynbkkddl57catdceb18jb1orny4a20pdus7rzpelxou7r0eqny9yt658wo8mznz1ezn3alz9yczhaziktjjoz1imb6mu1pxmdzpv81n0oygr7p1ryifv8fo0nui5z9wlj9ovumuipx1dqro8ww9bvcsz699e79q4jp7jmpprbkgq1jgbaxn4s1qpqthr82v1miax5bdkpus6bwilvyz8uw5wuzmykj0f84n360skyly',
                email: '17awvkvdifl9dya0hfn7bzxsed42s7mu0qteq8buibg3pmfc1x6i45h0nzjttb2qqii26qu6tjgi9l9q9g154vw6sly6sc2wxrmikd66pav6inqsr2j1ysro',
                mobile: 'kr4vkqx2p0buehla51fh6gxnfgnz0toujivkq33yci0ynblfp718hoj7ugbn',
                area: 'pslahl1sh7f9bwnocn55hz329kmh9iohenhiiec1b3x0cpcznf6oyq4l3bqfad71rmh5c1t4om1tp1mw173qxlnnl8yuharq4dj2kpfq3bx61refr76gz6qyzpctqpw0kycnd4y9u4xy3jcjjfh6gxwh8ul9z79u6l0rcwarvdl16ohcvm51zs9x3am09r1stw51ui8dnpq3vwkhyi0xb3k6j25hlp4lioaqkvq4mjjfzmt410j528vvh5ash2f',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: null,
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'ijvv5d4xn01d4f6teno88uvwyux3khkm0jrcnhpl4lz32yyv9wucwd0ovh26esugr8myua5b6fyhix5h1xdxikrm65ho5gn0pg3ugbwycyrwgvrlb1fm7vqr5ozweq0ltuhgorpe5r2s3nbmuo4rzpqdtgmdxld8gllzoqt9ndtp2q6dtr4qfhgdyvg4jtn4z92zh7fsij9a7y32i7bg04hhktiidlbj42l0jh7rf0ghyz5ybgc8camexjrk93r',
                name: 'c7a67hfo2mb2b45m8dzk5m56nvamkuawckzpwwqxd2l1s6sfb19g50x22ywxxyxbsoavdlff7sqvj0frs2s0j14mj2twlv1m3n7d4xjoktewwv9cqjo7v8kctbv4g9kec0jnyimezbefjwkcmvqzmknk3puuudnqgn5rzlinjofhomgcihit75tiibah3ew4uuqd2lrqpiy5wru0ssds9q67m3b59eg9e64x06h0ju0oj9h3d849w4opn7pt59q',
                surname: 'xvect3porih28dtk3rb4lxmj4oflklqcgu8sv19n5iy93segdt1rrciqa76go6i03xypewwb8xb3c4coxwjilwh1g6bvdml8s8csjg03qtiksowd9wk1vt6j44z61fdisn42k6y32fqrtelk9yh76p9bcxf0xf9gn5m1w21p3a0lu2v2t8bkrcffu0r1dvpfizwjyjlrmckcuh1nht24148f9ywa0lpuh13w4nwkdgivf0w62xxy0oyr4ghn37j',
                email: 'frl89f9jx0r3y3c3ke4xbv2hef7e35daaibnjrbq8q6eo40xi8ineyxaeuivfuwes4p6n09benepu6p333jxeddjq0zjhhu7h1vx28f71nwjsdbwwhmtmy81',
                mobile: 'ym3jdl2mvrlhemzp9evayoiv5wbzna56i3qgr8js2c5an85onvllnqs3fko7',
                area: '82q5ylw6so2lhnk9nour47y730hcfm9o839ch1g0y93qxkessiltgui4a26znpnczuhl3euzm39be9fcd0nibdu0mmfmi05elc0bml1klqvu5qtu90uoywf3qdpmp8r5pgi9xe8o8h9bz5oh74dtdzlh4a83mjyeunxkz2gebxsfumqkpvvfc3qpdd9zbucl619ndlux71jk7yjs75mwet5biobaazyg5z680bfjs22vny8m25pju2qtny7r329',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'tg5pco1mi9r8ey5lgbixgzkuo8focgyvguwzcit8i6e6ub8dzn2a350pjuxxzlj93ecqsatjt687cc7nndprlb1ces6y05qt41uezoahfff8v23jb830je0iy0eoxlkaw0r62weafghjiy9lnrnv5usspqxgra4ks0ml7lngavunyk6ti9zdl3olrrj3m7rm7sgws565mztogpy2jhg2fn3nd7y1ticrfhzlrg9xyn5qk8uhotvbxzh4ifi1eik',
                name: 'soch0d8b63vzrxdr0gu6bkx2i9361kyviytrhekeq1thdzq13f2uboze1f19nc6ge7wr7y5c5js0zg6j17x4yocc48s8p0cx9z34yu5r5saowny0k054iezr2njsmujozxwqhg0u5sd7tb9730l5q8nxcfaa95mu7qwshfw6e90fdrj2eqozfdwueo7vyxm88pnaef68id7to47wau3d2yslz0egtjsk720ccb8tfxtbs48mkv5gsuzglv3vzav',
                surname: 'r912v2u0hxosmype9s0rib6e5pqt52eb4eblgqpm06q5k6iepvvecnynhcdacl7lr06m5kstnkqj4v96e3q0fhb84e7xrtv7qton9wo7yp2p95di4n7usna2zd4htpztudenx06uef90vapgnokfhnw2yod5yu0njw23duhpq6753tyx8oaf2iknpwflqwlapyfh3ytyu0j4dpdbdna0nk3kscnc1co2izougsd27sv83tlxrznkum9iilytwow',
                email: '435abs7libpoqawo1lrm7st5jrha3z6pz3w5lat2snf7mzbmq2i15qijd1byudqqyefqqrzhwzxbokz5x5eitlbn9taauz8b0st7vegr7vxznuchajh3e0o6',
                mobile: 'x6tjvvrgacdhk7r9xi7hx2u7pws7saqxrxb4q3vsfc6e5i1qxg95fhv2kgms',
                area: '4ieqigz2ew2dwx95ogt9vln1oli862ecy7dkqs3meewq5xfuhuqnkbtr3k6gshtn5tg0xowqmugxgnlhy20uzvnzd0dh96jhwq6bssz2w60785bcs3n742tdnb4ifxk09lnmx0acaj68s0g3pydcor5fns2kle7oki0xcjk9axsywzzi2ekixh36m7cn79yx0dhldkn98c8wo0w56sx49cdg7l4oqe2mhelvevwvytfmbztnt4fj5e339qicrla',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'u90bwesozshrh55ovsnr',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'j2rpjnl0tcoyhggaw7ftj4k1a4au8se8rnpv6a1qbijvgpfijdkm1rqmc2qs0dg1zhvq4eu2a6pj56i250m86zgi8uez1lw028ly98yexpbc8jwef5iasp1xqwimg8zrwlbzm0x5ow4fmdw2k4s3pfvjb0tid2gta67xk6in0xk05ki2i8s9a91pbx00041w9l07f4bxgik6rrsnoiccw43inkb5swfiyi8v60r9z4ukikrw1kv4hk3djwe1dnw',
                name: null,
                surname: 'zgo0ycrs86j4t8ica3h6mmvygmyg5btgr68yfjwerjwntbpb38p6hvldv72nq7ajn593lo0kg1jlj7kc8p7a6bcyw0ji8fs9klroca15re0uems135nlj97fqnh4q2ucd80sys46pztr63iwgrry9xgh6m6lfykpfanqjwv60u5hslup97c6hcslf3bc8iw7ot20ql1x0btk7idrxvxo5hd5rinscavg0pdffm9m5euaeqbnjo083s39ecsgbe3',
                email: 'p854n0gi6fnwatbhzphvk0z1zvkq63qbfezz3f22x12st16uu1yhc1snsp5xu3nunmb6nghl13ilmkok4mqdz4a6w9wbefmyydwyy4jmksisilu00vffidh4',
                mobile: '5guwk6ckjt8ihsbr5fbgzjtacuzkghbmzyp5n3ufc6cui3lnfeed91yi36fs',
                area: 'w4w6iqlj30691jon93e8szt45vj6qmt34xm07qp4dydz2gll5c7dy9px3pkygog31wukw72nfyuwehwmddm7bkgx1nmz1u9l2e6imxgf7q50tokt5u4tv8rsxbnxp7y7afjudq1tsqepoirzib5ptgari1gyu7f4bp56mazmyrtxmbmgl64jptkb2jb2kuycc4yf40rr7k940d3x78wz7o2d56eo04siuijxokomkxulfy6pq94pr913hmca1uc',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'n2gn1n4t6mdqr27wzi91',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'oh1hqqtuwrwvmf0x56l94c3542a2lr87tppb0qtidd4j91do6vhs090xa8pro4m1mwrn3qheeqd15lqazay7rwdxuth9jwvdwv889g5508c8vhpis8duuuwj6nqeznsm93g92qkuvzj05gd59yzwzgwfkkkr3ki4l4ts08qzrxccaf7sopz8logan1x3jj5imad6203o2imtkyr9pyaqz6abxpyc2b37r861m3xwftzfjvggiqf51fkwvmc3pmr',
                
                surname: '7gnex0eruyxt259ajs7miid9y6xwquq6uih6uncxrn761bwegityxuyztar90r9rbd89omoi1rukh2xynafprk7jjiv7qnoqvfut72nwxxacb4letccx61yhawrze46msh49v0dlx1shuyf603j9p41nj3je23bw8eqne5ikexbxm9a74q18lu1qjrpb2bcmqeyg3vqoqe3pzfhkb5n7wcniqx5q342po23gxrdwvmrhbjie0xt3y0b61cfmpxu',
                email: 'yayleppsnx8qcixavf8lpv4iahaf8ryv10u584nnfh8okxykklp3cyt7tlrpxlzh5evhi5xnai8jdyfudx5l1m3hzxmnl0cx1gwtmsxwm1hwc2hrapfb3eoa',
                mobile: 'ajv4qqvqgqbcrrdh4runaawh5sqiwpbbm42ewcvas3wybaul9grbt8okz4sy',
                area: '2v6a03w2e0j5u3hzz1wfuz3lo5p3684ejtzrsa6sfzciuovoaba1vg94bf45vsucr5wikiu2r9fqn4gtxh8e5uck7o1j0y2lgn4i82vq3sis03ywxqgza56iw8b0gyh7v1s8acr9qvegrhkvhg4akurnw2lqehjmuzcwhe2j548clq0zd4dc0j4o9paheja29hmlzm6mmy1anfgwefs370323243zfsso30rjnrfgdtl2vk50oi67gc6ezhkzsu',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: '04245kjbxc3gr8t2egla',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: '5bn3ogmwdh5zuamjlg37oprp5p6weve9lkvy049x8k1x3mj8ifg08ac3wl441nkq7w3olyatx6nt9hvg5yzwb347y2seeeq5xautf06u4hgte6iwx9a7tfm7eykeylgdeub65is4fxrjoybfk39hur5bejdxuee0jzj1anqg2n661veezjpgu1uhexw4c4xzm0txgd2z573dkwppfjtywlz6sfno57sf0ss9o2uyevvomg1pz5wttlgb8p04yz6',
                name: '2ojp8zyhv46n78mxmjeydeesfvitrk5z6zuq6s7mn8s6r0uas7d9890m5zksrav87a14cwfdak1tztel8zyuxk1032nnl0w78cc7us52jyaghl9f52562in8s5v43ijlnsrkullbwm5cc2v3rkcemfhrmnyi41ihu4d53m2mlmksoj2pyfpve1g5ydkzu0sre34bpleyn8p08gvz2b09zzvikbmpl1n9rx4me87kt4is3r53avhy0nmvu8eq5nv',
                surname: 'u2xjrvaipp5o36b4korn2unk3tsegn3ofliauwz89n6gnypm19uub15npwpzg4kz1wyuzkuw2mflcutdughygsrj332st71i8kq6m4kwf3j9cwyn0s3szv57z8a1lm7sud905vrakqjuer4ijzvv588798bi0zwei8etirasr6ikwzqg6lrd56qo1vm1g085teitobzd00sngincsaxyfsbk4spmbtzkcgy5806617wcb3ny17i526g434zv66t',
                email: null,
                mobile: 'odbe4ohsmw62m1m2w6meqxau09dhceozfja0v2snwv77raihlmnjzbhsck5r',
                area: 'i1etwhvmiud3awqk9h2jqe1ap5sffwr4v8qqd6tvcj6cu79ooyx4iif5dqnmmp6cc9scltiah7l89ktgkiknjwgrpttnvmhngo7hv6oajzkde1zfjlflgnm0cmvly7dqh0wxe32fyqpuwxxmozeganzkz6mynh76w0s577iehkp31tcrx66w3xakk1ldnwuv4vl2cg3jifp7v3gmtc2yj9emokfc7jp3w54meedqd1h9hk74iyqkgicna526z98',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'sjnj0t1uij4eu1129bhl',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'm4hff32p4dbwsfd58jjkynmh3d5a6fz4zp8g4b6q6w7r2gp7bqfcaernblqitxq6cprtoulq97rwgmb435qijm75rfua2mkmn8e9ffb0k8wv6yyliyr1g458zrzxrj5qmkwo6qgdu2o7d3i787z85bkm6swbm45ct6mfbh51xapkgsavfzir43e4ce2zsnx8orxfk7apkpjwn4zjgl65br358zzadvsqs5uen0gt01py3b7c2lfro1os939jkyv',
                name: 'ije86x0a2b2zojhqjig1rs4lsr846d1sqp0a9wggch5rme74j6gcuzev6gpei4x4vopexp1vy8brx7yndz2bgdx1nj2rg6d1act0c442em97o8h40oorew9moyg5hne32kj30hxawjt3j4o1xc3z4z7qv93060em30ks5b751ahfmxmvbc0ly6jwk89jw54gjiih5qihxr4ad01dbddvi1maywy5wwsze8oe9uiounemo767r3r6ys0vkclg8sy',
                surname: '63rq8wkjf644d86uityhqkeraabfjk4fa37fb7rluyffk1fi40w2kce33a8nnp8quiny4zrs609i4cs3o6h3sifm5jq2zg07twk2r37qsfn78cjs8vi9fcsvdvkg7h8ktkl7gb3m2ymtcgnr7l381la82crpkpoqynwe06xbhhoi2f6q2wbskh24py7n326acch74uk5ogl8vz4cce7pj6fnncgjzk4uubifw8pf5kb4457s88npi5zllsvlhs8',
                
                mobile: 'rbst41s2yel4zbz144x6kjb6rkhr2tfq7z3b6ozuztylrtir7d2yc90fliew',
                area: 'w1lweqes3rmojzcv9uly9svtoba38mnj95d0qlwj2dj7kkkx5fytwyxnio3oyv25yhekof6rv13fh82hg012khl9bztq4jgpduuo7txvyy87ztw7uans0emxxpz5dy4av1j46gmayjt11w1otb3ul3laumthwzcmu6hxwo5qxocoz3eruu9k0xl4dxp8geswi6pcdtnm4pav7z906xxa3mpys9x85nb9fy4zyxn8w4ley6xchj7nrlas4lru1x3',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'm3601fb18y2ci8xcj7t8',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: '6bsve65ibtbde42ucnd3a2w1tr1rtkqgdpp6zpduwylil2zqaumf6suo31f0tfjek91pxtwjcxvblh6ayz1y6pm9zfekrt0kfdhfwvwvmy8wkldg0fb9q473j79a32jfxzq6mddlhc7rgmp0fbfol12gh7ltlexcnobpj0t4fhoggadqdkuupekx37wkzp0x7mcburv4fzovdblv808xmbra82tt9j9c1eozhoih4ud4anpdcvgs28xwoz8ovi3',
                name: 'sz3ejsdaszfh2sljpfo933nulpaeia1y98c0pw3tbt6givhw4zcqlr3nkcjfrsl6998rs9pdagls9fycuos5g8fdr7eo6c8ct69g29jdcr8wzl5mj5xy58j1h1k9l3morosj9vcicr7xqmhd8a4tb0ypgzhew36t0e9vqu8ob9xa6kh7jemosax75zm58apr47sz5movr4c6869lmb1mef5dor6tiq6rdaypccyv4e66z7ukfw9iu5fp2yaoa7k',
                surname: 'tc8bqapbnl5ggovkyqt7czu0aaga96hn5h405z4zibdkc2azac46krjykrjlzmicbpn7patvqz4fes149g9a6hcv0h2rn6dk9dyc7n62cmpzdp0iprw8kbwjb1ozzxg3c6u2coxpgzle51ulcfzmzjnqiy9dcaf3uwp1otcfbf3zo4y5vz6t6qxs48wehwve3kwn6cqwnkuvyq3pof0p1hbyl7k8y1x1u0uj2tcun3f59i7u74t8a9bz1fjxzgg',
                email: 'dz3cj3dw1iwhsf2bjnd6ro0c1vaupjsb3h4jei2vu39uq4w7ecb3jm25zj8cdfcqc7f74k0pnxgmo3bv6f5s1g9beh27dtxxohhav8q5vcscuj2x198x8ak3',
                mobile: 'o20c2141wbq2qodhlpsqr4fdh8hfjm47a31zoy56fc8fyap6idygrel2fh5n',
                area: '5g02fxibmmatyjbd19y58oycr158q6r7hk0dxako3jt6d4eebejbuok1ekpa2clugudfjucv8c2rvzkrhe2l4xgiffvpoafucc58io5ocj0spngal09yldbyb1iaaq04oepxxq87vbppkbiatlguc4bu45r4m1dxqujhyaek49xumm67hefk191w88fcn2u5n7aw3vd5osi7d9gqfx2zbw5krr36ku314g73mv1kp03fe8t8ot0zf6ogxy5k7ij',
                hasConsentEmail: null,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'plcov6mlyitm6halnzfh',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: '6e75pcwgtz8yiossx3xorsyz3rzuzpdcislj6gq3bffrbza8ftibqy7qtqm4l8ty1kqqtv12egias172gjk7ck4ltua0d4t1laeu2rggeq7w89y06be1v396vcecepc9lndw2xfpqkzud7bcoca7ft9cdjjtu2lcn4c7cub7a19in2z63eijohbuoyi7h45i4jxwcbpzxxaovmninwsef6nidqnl41xacanl5ha7byfen72t75hwafqs853ft9l',
                name: 'x6fn2zk7npbrysk1tikc1np411qxykk4ztfj85h2jtqhgaw40in279qrlksm1ztpw7kqoqnejrbjcr8ge8zihgng8x7uabtkhmub4kjtga79h6t7w1pft80qdja49742n1jbkx8irgkurnu23t170to54vp1czzjs9i0wg88h2y4ztjtk3ak7uf1rlwcqqlitfnxead8u9k6siz117qg9zpe4s6e8s29t93o64nspvlbq2n6d806bkb2d2v4f7p',
                surname: 'adseho2gqo9zozrleay9qpsioxq9axcj8wfdkz63nm0gi4inremudh26e1q30ulqzzzuvfgchjrytvs4nnqhq8b7s1ssuq9pfrdgosllll19ta5ea7a9l1vbet3mgvxytg8qnfrbav1v2e9hlag8zp0x435oz71dsawsjp88j4ntole9yz6vysozriooi61j2i9m4hi0c1vm1yvl63fruhoyaxmuojnitf72vm7h6kkvtldrz8lp61h4ti26cc6',
                email: 'ig4et909j41uvu3hzjmcpq3bta1h8lunodjez2cie99oxax9gd2d8tqk0tur3zma7m70upvszmbz4ayi877aegvd7k8dfdpp8rlxrox325b2hfmcm2pisbf3',
                mobile: 'ynn7t079tzm7bzafix3nee4ffvxqtth01b96lcqzgdtijov925gagsrdkofo',
                area: 'zk3qta5khvlnoo2gqww9vs41o6wdefc6a3ov4d9w9ji66hnfiazdmiivul8sl4ok2iby483wzyqxo5nlodz90uig83dsco3w1i166h0rubb87v5gxekdosszc5zs8b008th3x22h4dbwibcraibkk4hwxmz180pffonbblphltf2dqkt6e83akkhmzfoqwkhjp4fv26rtshh6v2o5nnbfc7mneofp54gcp3k3mtvj902eh45ndf88kyhebqti4v',
                
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'exjk0zij7bh7z1udntra',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: '2jkl5za4swb1mcpos7ami6foycqyc42g3z3zfzx25vjf80d0b1jydadbs286gzq95dyj5k6f3hehczixyg9aq5v26yoe5amotyr1m8drfpirnthgrbrjyksax20x4oebngrwpxjzncql5n1s2qbjvhcg4z2evcnlq921miikej0at77g9exhw743pf45pjf1j7jw79t2ar0l5qjr6gzs1j3a06265qtta9q9wylqqxfuadtnf9y9gn4xbucand1',
                name: '1zsxm5u4tlmplkiqwb5cm3wmgpmu9xfvcmsmyei3ibh19tlzfk50dub5litc5kiz0s03wer6x8797nkmewgo9g1np59ezxt5s78k852ui2saosiy9trg3p8tmyz4hu59opw22b8n62xe7eg3wi8p3h7b1md9juyuqin7f819lyhtnkd5a65tlfoo6xn3ew3la2u68btygrdn93ann00r96ycdcbelx6txhx2d1lm95yxnrgbzh6thm5ial87e2y',
                surname: 'rwm94ebkjkqzi5g8vnq31b37agdd97a9qm9b1y20qa8c3v9xv9nnajohbmnklgt7nyacqv882byg66jwd6e7ayuia0ojvrwvrkg5qgbeo78z6xxt5kq20ak0ay6t1mib4pl6sj6y7wt988qqvcgtpd10c13l2izh3lhec4mw6p3jkyx8oebdf264d9jy80upd33lt5jfzfpupmmlchk9xqq3bj7bi88ezvre8mytzr4lyoulivreen2joz8vp99',
                email: 'v3l17th1bsa0v0ynok03whj6uuydyi7w3ihe65nyuf23x60pgz0e6n3lz306kb0p4ro003esg4nblidj9oh1by19sq7q4ayxdlqeswnbt98kv4h8xblr3l12',
                mobile: 'mg47hg53gney0bpv0jf11k54jj1jaeuxdp20eo2fhlzv05f44kd767l9fd4g',
                area: 'luvb7jpjbbxk2puu23vnctwlqk3iez105byezso6u3j14lcvngbdz21bzbfkf4ks5sdr08vt4708j03106ok2mx6gelhyth8wyw3sg11fmlmpn1aveldff93p0otzd1lfksi21zpxcjqegdffby9s4ialt2xourc7f7icav2mp7wckwllj94e5hpv7c00md72303d2cv8reb9bqquzfqso4vadv99qfsdgskdmvukiwvamlovfgkw8h5yvzi9uf',
                hasConsentEmail: false,
                hasConsentMobile: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'gauaoe54a7o3bmemiwlw',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'cpb6pf4qgu6d70ebk511pyfyxgp36i6casvs097snekb5totot34p7f5nctkbv612tyf3i4qz2e758xbm9wb8gti3ktuvtwtomtpaimq9d1dw6obn8d73xk5m9m3nxjhuqjhih2zs3zcdsrobu8aywiebxj0oqb78ofbnmckwkir4t3ssthemntvxi3vxp61bdnzm3s8qmvjqvd5lju8unzi5dp1k64dzkqyo03eh7oiv7hhm1xtfhiqhw2n68q',
                name: 'b856a1s3g6idim1fj02aaq234ts8wkyzs4y0xoztcfpvk3wl46cfidteyfcozd4128w9vv9yjpzpyfm8iujrine5sikcgct3quq8o4n7e7cgec41rdq8kdzxie0he0ntj2oobmuscgi5htxeatx4vdztx9h0akvo4cl3rybxpap3a0z87pxrw8f4nfk5wkx0281wcp1rgd1bln75895tx1hy6pf0kfgy8obcfsis1jhf2d07bfddwhf9pj3ccza',
                surname: '1d6iic4igz1qgjryl7r9yet83q6phv92qmak2elsd29rsanud2f7wvam6mf0iihvaa62vm5pbntrt235mmj9s8a3tcser78q07tl6oki7kl5g3wj2kcjp1fu3omnjg5dkyzajget4lfhjtttezmp2nd0umz0excqpmkinsrkbqltv46tu2th1m6gkjh4j9oidg2ghcfigt93owx45fhgn1i6ihs0jum0rl11wvkk1yvl4ob5o846k3gil9bw4nl',
                email: 'tktqkos61kpmiulq5qqpukohlvnudkse3mmw2ng4e3dapnjhb4guoruvmwh8w3ebqlpttf5u87kb906pegj4bhywpfgn64vskkfmv1uohs0vhcpmjlx9y6d3',
                mobile: 'adog0lagf5zsins5m7aedk5c9229uza5p4mc2cpm4emcli1fb5umrz4oodm9',
                area: 'pzso5w2u2j37i0gsjh53dn68dezghkz6t2ckc0d8fki2z8de6ginlue44xw2xib13shsodcctjcwmstjt98kur54gqly6m1dhcimz9mjqlstwwpyn4q282sqaqokaukwqp30yjrsscs4r54ejsknr13r3r31h0o2mnlu7rdpkktjtil73hxepyuo0ywai901trt2pffr3v2i784txoz17vjez89s8xb8ktpbzaw75i0ticoav9srids3zlw348f',
                hasConsentEmail: false,
                
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: '98v7lbcy252qo1lxjpsn',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'jr0uq62y9m7i5026lfrh3eyve9xfts66yy9j8bhyqb26fwfatijsizrvuo9mxodbib8ga9yiugo63oix623n3upskyl59vvgvlxw3hevcvwbjxfwaovbngfpez8ki05m11gfeu3aqra5bmxz8i4yykg95lu0hrrbfsa8tbmb5zeleiwcqrr3pwrm1ca2dhwqehup04huj9r3no90fz1ivvm399l7r4xj5o482uoj80qc2of89erdkuhwovseoli',
                name: '4sdcivzpnue7tpue92cuewosb4ulj0l23u0wu4p64wf8nrzol7nxcr9lw46db1fp1s6diwttldw30yaft3tg4d5idask47cd1gswwvmkzlxamjxm6olfp9deuhpzuc2cr2j0ui8xxwv0zt7ai8ys30hiewhlw0jhp55ruz61vfh7y6mxj2qtenyv0qcfqh3qe9vwkf9tyik1xm4ev91yjpebqwsf9fnaa3kmpjgs70x57j5b3dugpxcdp1hg0xt',
                surname: 'uxmo7m404ifjtkskjrjpwe4yq89oudo5a4r3d0j3q568ldsz2j66e77i0v2nur7bxqj315cmvk4a09hvv0pl2tt5h0rg9832oo8dqxff94hbz8i0dbmfu7b688chcllbb46pbtjrat4ttufx8qsaj8mtlqmm45g0yf5dwuh3o68yib5ptwd4s9jbuih4dgd264wfsxaxntq6m5wu83fecln92b2heuitmhhto6jp14o62oqboc9n5b9chvchigz',
                email: 'pcd68i4tn41zz3yhxpqyfcjqp3fcxs120k1lsnu7xe36j6y3r4858dyrs6sey56gujgq9o5jmscr3jsuzfw6m9w9s8ylo9fuvvd1sv00dq7qnojp1sl8ottm',
                mobile: '3hd87s0674ejlcovh9s9q5t5ywkr7car5eelmmstebvbi61o8fqtb4mllyl1',
                area: 'ez6ihplu1xw11p8o5ew1jz5sipnwhjlpm5vyi21qgngxw03dwi8wrod5u4uveyij7w9c6ajchc4ny6dpoe18ne0vwhrrl5pckmw0wki6tfwn2z1wlmpio4ymjrcefacxmx2kix7za365apjsu0kqlh714r2flp909jwn5t8fzw26mwkn1x6hl7j32x1nek0n1w96gj9plchg3ctqrkhydxngk5wfxrlfxh761gfy3zppwjx0ql5ma4xysl6ls06',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'gyvhb0tqpgwh37oe2nq4',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'juh0hkl5bap62vwll86fyuxp24e80vig3i4nshmw1z3dq42nm8m32ssogo9yoin0hky1o2r49qg84hgg4ebmc4zsehhvq0xdfppki2bargqbjonwox5ym9gmixetbh8n6q06lcqixxrzrgec8hwhs9bs4b98yve6g1vil3tjae5l2kbb2nkixw0k5xc8nx1n8cnmtuc4z2kcbifgwqdoalphc6o5da7dh2g5m81rzisd6r8brbambmjoinn1n9l',
                name: 'vmqejws1qjobjib2dpryo0g4fcpiyieab0r3sfjektelg39viifm4oybm4trm095ij3oewt4123txkuatn9ch0u2dw5a2n3ldhg4ciob2c8wnmfcd122qy2p12939yejmvil0qmj6sw6g5cxnvbm56r39rewacpv3889dls7yxb4h3wkpc1vitu3ajglhcli993ger5vy44c8gi2mj9rlgsr8sayiccf425g2dr888b8ktnnm7t37f85p146isl',
                surname: '6e19bgapluszliih28wqs5f241580pm6hajqtuy0yaivzcedyeb9y3lfyxvn0rwh8qjwfuhwqa5gdgunwij8viwsbw1pmvhpz1oplnc3q0noc9gnuvh7lipt25ctse5jhpms26dhuoppgn1gdcpqnifweku4c7ifvnnlmm4w6t8d071dx2m8fcqq2wwhwwqmwabjtk8umlvjvj1yh21ksuqexi9kgtws7zec8f9pi53zrgjpptnduov194r2az4',
                email: '4pmd99z9cb8rny206gqtn9g5bftf29varxfsidlbhfwtdwp91w5a0jxg7whbtsj28rdhinls9v7dwexywpptcb8swz6v4jw25da2yevat1fhtb12x6pyzuce',
                mobile: 'xy74dxsy91gpyrjn0ztgpklx6jchl1t8745b4j4nyutb7gqdos7p5bbnhd8s',
                area: 'jz62x5yh6k20bhy8c9va0edqadhlmzw3ttwlruy6o7p5wx9iy2i9bdkw9t511bx06doew4highpkgb95v53h8qp1mx7vl699v2s868qhge5lz4w92ato1aqnulgo6adt6rw8ntrwikx684g2w0109zz4uei2921n20y66zx0jh59h8fspbpnyki958wec67oavinnujiemgt8ts8pm6l9h21ou3no8nkd95durwygn7qqc0ql8ykx7jrop6iu46',
                hasConsentEmail: false,
                hasConsentMobile: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'yc98hlpei6zw3p6vu0rxxzwwixnl5vxf0uivq',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: '43s8k9d2o0wy5r8z40o4',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'qk3eje0usu0ylmae28vsqlp5n70tcegwxxz1ctvuakbevm3wp9b1oy8kpxybp3h456j20nz24k75cy70tqdvej0wdqb40qgwi70plf4plc03oqfwoljdw09he8xeo6cjm0lsjsnzd3sha9kvw6hrtce5ypj83kagr9g2u1oq2olsatir64762wxijkpfy5b0lp56ef27ipsf7tzjxg67cf1qn5bf8x4lut9l199j51ad6hr6rjvch5gzvv6m0sq',
                name: 'i9mjah9agwwroyy9ewvr4rx1jkw4lx5niq06cxiduyldjhxwnbmm70so2aznx2b463n084d7ailq235s45u55rb5firzc21jt7o4vskkmz4xuvzlkvsq8jpww2icuefshs0ep8pek91g65751dt6kc8d0fdgfom9xpdcrohfx7xkm25qn4oa0sdni5fptooj8xhwoiipqn1wcp2b5qiuu4qeyxuimnzpq65yeok1ecsf690cy11972tbmbhfpsv',
                surname: 'ixs6yhy2rnakzf3nz8kxpqojmd2dqbb3bnwuculc0lg0qqcankgf419qt52rneyycs5lt6z0cjly9ooa5frjkh5yycfzd6kjsxg1z94nq6y01vu6vm1hr0nctxjycw7bicr6f33803aelmq1j4b1irosi2egquj1aggld3bdantt9f3pxed1si1j4urpmbevfhp3sh30azee9mhc3mm2lqcyl0qaiw5m7ndkv85om1ca0vapkog4dwgb67iic57',
                email: 'dnh7y8m6sbuhe5vdlxb11s49zx1sglfcdve9eo616e1eobuux44922yagwu0nydls85vscge61yvm579i93sd7uenjl34qgdnw0dc38je0tug8lzzx8kzp9n',
                mobile: '9p8b9py419023w8qxqe400h45dage7u7ua78pq7fah75d53bch8n910cbvrn',
                area: 'elopflfdtajkmnwtjgjpjlqla63q5b979vmvq723t1x666l4zo3i1c2db957dyovhseqvt46xg7gkkm5vnlp4uhpv3lo99f6r6srd3pugngpxqrdywa5p28mv1jmmy1rowh53k4mpmtjqcwnhdz0wylkgnadiqt54a6b9ww9yvdn7jl4stbb4atwu6gamajmotwcxvxnvbwb720c7p6ly5ihrnm1j6p95canbfs942ckdn6hyoyacg3tyguhpv7',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: '1xgmbo0qbbyrvu6ummrud6wc9iopg1ae91sye',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'ojljo3uak5gj4xonlf7r',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'py4djcg4b8d60wzoq35cknznnc3fdx5t6lyf7hpf3utse203iifgcnzzzh0e8plw96m26phxq3ncv3o7z6i4y23el2q1ho6aaquwc4ga14mslt7nfcda0ghq4v4iy5s41pa8tzxrhbjalklsamn2fxpsv771plo0voudn8y29uh924p4e425xmegz5inq5usiujgjw9kmu7rabpt9et9d30rbwe408u49beu0tyagq0203fiv2f3w1ddxlf6sdn',
                name: '39bj5akqma3n66tv70xowbru9h3nlci4f5inz7053b4au5u5plub8o4ngqlk738kpbe1gv16x4u0sh6js6hdd8oiw0auob2s4aiu097bfglyo7los5meu9vrayhmxy99fj4v11tw33r6n41ihsb9nco3q5i23zx1irv4jx13b0pj4c72etc7gx85phda3mitdnd3is5ccnarenoxb0odlb1ma22xvij6ul5zkyxtq2ndla6vtp4ef8issvn49nz',
                surname: 'zsrzbplxfxxufxnz6alakt9je051bymdl7eh8d552u1zjt5ank3v5uyxcf2i437yq4j6m18tuh19you3acrrcamjir1sbuva2nlx3y3524tbfn4v37yps6z5oy5xjwhqtzlg7z5mnohvm7javx6mljmx7luofi4v5zz91826z04c17135w81ikf3xeuc75dcrf6eq7vtb3wstabhnv02xpu2tj1lxi6c2p0f00804615tl1e4t7obx8xjwhie0j',
                email: 'm5zynqxie0e0mph5eecqqavtee8m1n5zx3bbub1ea8dqpovmkhp15v0nfg11m7kmm6t04uezcbqekw8xwb8w8e1cveb3rs9lkxkpw2tsu6j35mwrv5xdybr7',
                mobile: 'lstke1aaif62hbai13tnp6gfqnmsnfcvb3uz1j4b5p2ttcn2h6ld81t07qs8',
                area: 'byb2d91qhqklde98vgffy7vyik89ktqma7r5hzbk75kiyfhkd1vhmavhtmeun2tcy76cisk8wgk6k2r0u65ajwapnk8p0ygpx9ovxumvnn87xgeb11kv82capfrf85bt8daoqt33ss5s00r9w5658zi3xliqxi01z8bmkgkg660opzlqt50cwzswuzpeh2jefe7mst9phkwcs8zv4igfnze828d8ix0tzb6eanb9t3l0f6bg1ngiuquorgbl48n',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: 'u9kcy9b2o9srthub20egkii4v70s08wthkt19',
                systemName: '3bmlqhmeenpftmf8cuqk',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'vpa0aybzhk9h2n6anz6tdazx0byz3fjabdhmen7mksyo0zl0aa4kiktf145rlvhmeh3pusl001rvjdzuyvjkhooicuba3igwpk7wkwij5hy5nndjrqqzj1komk0wn5q69rm04u4lhu59xf01wvrft3t2xl3zebwi7od2itx6vi32ms35gf0zusvsgn6bwm0s0wt8pxcnwcdy6jhdbipvtaf1x0hfnsk4h6hbff8bjecmx7s62lde26bu8ytbi0z',
                name: 'gll0b0xt32fto0hajrtea86oof9et34sxwoi278akesq1p8cz2h1k0fcb89muv1v3mcipsr9c3zx2dpxfiiafypx7rk0a18nuigt4mkvio847q1pk8is3khurx9ti42lqzkmtyxlso3h6tkvuywesz8op7r2ys7kchwkeeocu7nlfbcelsk1r7gjaqyfg25mpsk9mzefzbi0cvz4k34bquvj1yjfsxtuv2kh6lx2w2pj6xfma6lkqw86tmo7d0z',
                surname: '370k6wa95oszfg4v7tc8jq89scthfbpfkkdw2lhd6ra72zu72nz1d98vxfiaqxcy9de65q84xahinlenly9gzb3zftt1gms9jcv5l2qdifjm2bzx739mwtnftl5ufj5mthtu8s91q4a7wnohh13p6afe7zvgdq1d9xtav9xhbt7kxmec7kuk71iaki1bkvdnwzcecjjp1oma0co95vn7lh0j8xz6bphjrzlwgamk4dgon53qr8eu75rjvng86rw',
                email: 'h858johf8qjh8eyvo85ajsvyqnz2osczsfggxc53wjs8c0w4h8gfj2of102s969qcn54oqtnb4xuiw7xjslyefczx5ob3wo8d8due3w3vk4l563sb6d5lwbs',
                mobile: 'ufiahpcuamr7mo1gnmvhk0uqubcdjnrrbpz1fd7ysqzmehlnpj2afhqunjff',
                area: 'w2ygl2y555tq5gafamd5pbiut05207f9dqd9jchvi8xhrcctp7a9w8ogtji2nbhnzud931uelz0nzay0k0j94443932yhutqau0krwktc6xyaag2j7p200r7q4189gh65vbbgp1ec9g15chpcjsj5tsz23gagkg3d4angu6iatucgb87bn661fextyjlvonbapnaregnb75rmrjwd8dtip7fxsdncvf85qhr8sm8tl2or8v250n1xpl109l3utf',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: '5dt9udlaczljiynfvkvv',
                roleId: 'ahdar85c186qmo06gk6afx51b0ccpjn8pmprd',
                roleName: 'yjmi083q50dowajo7lmm96k3ibvjxgz63xu25wio5ly4rzgtfl0xk6d2n7qs1v8gwh2pan5a0v46e0x0p1fbb9z38vqlv0a95fgtiaxzxm4yo10mapjt7224u3wilo5qwvru6c8nzotm10pkbv4yn9aepzhl45v8g7kvav1yxccfnrsxmyxwcjiy2yerd7zxn8kz94uw3jk1gu2jkfr31221ff19hxzgebgcw71d9h595836npvjvikl69i6cyp',
                name: '8qnluey0znlvbcbgyw1x2i72wmp6tcxpgdzclviod9quavpc7d7ytejjehsgfypuk8yfk4kuobg7z8f9bpxyyvg8cetbauuv1y5ocbh0c1z233xmplbe9wj2a7mnk5u6ofg0i5sxsojg3i76utpa4ooe5jfpuvkm6flpp6nlhkhej8b52b8rz7jeuvsro6794j8wl54o6sfl3n8c7vuy85qhe7zqy09ihh68qz4hdkpv1eps90bo7thbdumm6y9',
                surname: 'rroy1ujh48u8ngrbxn79fgesxqx1jjrx5thkx1kafxe9qvavujfnn28wnkno96tcbel7jb4aes1rkzk676do0v15z65j5qwx656ptfqt3qbqwchnlj3uc1bx19ltzu4q1nu119lnf3m5y2iffcb7w7v0mosh9dy5iwpvbl9ieglp1o0qh7lfzb46jlgtj05joe6jlc9zdbulnpn8mrt1o5ou9gjkd0ddyomk3e1remnoiwan73b13m0hhzltjgj',
                email: 'm2i1475hi7u0wanyuvce5jobs0qrruhcbbrdjeezv0hapqwzfu4oxl6bjatnqpxt1oh3m4y7cxj72pj1n8us2n1zdz45hjt2ej9nfk1g4v1x1vzeehtraogh',
                mobile: 'gvw9ccs4q5oysxqb1a57kz5s2zq083vk8wp97627ymbi40vsdq24i93tu789',
                area: 'c1mct04bhb78o72yu2eqktj4ru2mex7xa6oby9o4k17im3nwq2soli5byzr8jkhp4xt78wq51za269inpse36u5sgalch0nfdvczwiqtfcfgn11s40pv08kvddfss8mh6c4nli9w0p0kt2we0olb6zf6u92sg0pfswbfgjpr29hove2c1oxro6uq8z83v3jg5wfd9f7i83z4bzaxzkgdswvromtsfse5ve4n814xc3aa4qowg9pnl9ozuhot7hl',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'g1m93p34vsrfh40dj0brj',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: '49yqs3fq8nd2qwevf251p41qzbellixc2z11eihbloa1cxy8drxz2vjb7j6wmvph0dti2a7dy52sy7gdj3luinz4kigki7m78zbza56a63ek85mo26e7dx6bhdrvq158jzkmfacq43dxunisywdy5llgdxm4u7rigdq5m26omj9c6aaw8tfg5rhneq9qznchyguxyxmd56dyygjf7rbbkq1xj8znydbwaf4g2hgcicpkpnhu8sx5m5ljeustqa4',
                name: 'lvlwf5z99mzrio333od27p9t6a3lumq2olx96lvbe90beaqrtzbqza3ade5zwkd542c994kaceyval6nvp690le7qolqy7o896uvg5y2p4nqrmiyfnhw2kx0dl27medeymn33pfjepiaft641pxe28uxgvk98ul5yjh3pzdnbwp0j6iklhqubu8r9hay7mp67fwk68qza9wsfhz3ne8935bhpf862tnuzqw9cwzjva047zmymdyssyu934laey2',
                surname: '82tq9m25zn4l2gz64ckik9x5lknrei7gcadtjnr8qodbv63kzg29llegume29qg0kw3gbapufbkyy3lh4fmebqrcdgwxdepbfisp88ygsydwhwfrkxq5xhzqbvl1y7qg0cvcik2og3r1lr4ysp72f5o17vo01vh4u1d17531ujfg4tk4xz53ay5i7ssg6s62thuq74uazmp0zig2l5y2q36vrpl2n6c9th7jbvcyx0277t5ggtdjshaex8tz4c4',
                email: 'd4c9lawmc9d2acyvslntun3wkq581bhsvibhv8onc4d8dzihoas1bfydmit6p7iwnidm39shvw4x2ednnh1gp1yvvlzp9yx6semp4zrn07hyc389enelk5m9',
                mobile: 's147m7j2xf1vypkl3otau7p2zh2afszv89dbaxp3mhevrq01rrddh4kvzjie',
                area: 'w32ypbrk2byzo1uca0afvcedolxnywglnjcgz348q1orm1m62nqey9y40ek14hmgm956ephwsltdnebwdynloy73nkrj013vt2i9l6ik29h9sghegn728fb4i3aadwzrcnze0dhw2q2hnxya7y6fgg5nwfgi5s0t4z2q9k462uuc38sl4l8goouj5qmaejuto5u2znz7ezqdcu5cpao5h2dnpvjv6p3slwz6s7tns7pcxg7suivrdk2dmo7aj1k',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'ellz5cdyrwvdertf1ppv',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'qvubutq7k72k6sy5wily2eoe087btrb7f8d02uw8ahlxcy1zr3xssztbxq0jw59bsxsdl0oc96fmpo8w43ss7iy5r78bmbn9v7tef9pvz4wzribdc3bj9wfp4l2huetqlvf6gp632gb8yp4qpsua8xu72nqp53cinyr67bxgvix8ddywkyv6ro0leme2marm07w5wt9qut1la5umboyvu190x4x1mj0jhb0jxnre6x14nhjle3rq0encsij94h4y',
                name: 'z3tfjaw1sc7wh1ydo527edpfrhwxbibae4rtvz9old7xatzh8a03vfzbsoaq7ehrlzag4yi5wf0zacslva6sxsoo59eq125vhek0omnrxyj2ph5xl9njak9y4c1x3r542fzx18yz75qe38imy6yh506u5fgcdup1o7hxldl6cpkkkzq1nnztjnnztlhabyvv6f7png2edywxl43re019akd0kihuhlfwpljzphmam8oxn2vccikfg7sw7oq76sq',
                surname: 'gaiz5b1homjqt5mzhnbhnbedgrbed3t7cfpil8odk74yqor616k66hcg4xr3c52hc5fl5tmz6zmt4jq57rf3t4eq4b9s91jaj2kb33r9lwx97j35ccg9rfmko9dpuj845aj81p3hsd01w4g5ghb0yaz0ach2uc5n1v07a72kehb9thrdzogzww4cg2gc0z89ur6q88e4pofwjz7km4pyzrws4uqtxud4hlnc7ynb5bq08rhxat3vvcxz0fpq7ie',
                email: 's79zd3r5zqp596txst0c7u4uoxato546wo4bwu8b04yxbyutnfqei794993ritz1zb66kywrje718v4xfq69atb4v08reejyev8x7wrsodg3y91ouh9xpk01',
                mobile: 'hhc4ifi1o6jbdp777hakq9bgu9534emw5vjg66vj4bf8dodl5cx19ayal42w',
                area: 'sty5zefie23u4cvw2edsi9ai66zzdwh9eqhr3tz9mzyf6n09y25yni3tx63itk5xyz1euzibzdu9mcf3eey20srqlwhqelj5xfeliovp4064ho0jodoeuq9483msv7vw125t6xov90hv2n11qx5t2bwyqtp6ant5nqnppskjwcvo74ktar31yu3mq83lpqk4ui9qx19dnepei0fmb141z9u6277mue4y4joetlm0faew2j03bhcx4ioqjpkzfj5',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'a9x10fsv8rze53rm7wrl',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'g9t9od2u8z2wwwvux09hddphe6c3dic28q4hs0lqes8wk9e5pqnut92fzabkg5deni26kj4a5l0cvidq4jrot6xsd3h2348l3p4vs4i5wi2uywsukt6mw8tb1d5t6136qhmxhonvk9cgev98gt6p1rcv6a2wcscjvlwhnbgi4fhjww81t9og8x5ovqmb8dr7wgwlnl4ysxqy6tqfk061f1u54vmcet725sazuzdmrpgzojbsowuwnrfjregz75h',
                name: 'rxyrvwt8ompdi28ke7ensl688ytvjdk5ieyouz9btkyaex9gv8un6h2qn7cs5y5ca4v4roommkg8modgl3zcbcgu9gfvq7erdv9w31i126g0vrsr5mvkpsyymr2vl6gfeclpwsv795q7ck6xhty2vb909604c2aa7mst6t9w1761dyk1vxx9lgpipozymieobsrtld8x6xb5qkvs0efp5yy3usewwajrz2zm7xlbsaot373a35sloo6aalpm95qk',
                surname: '9z6zz5mlkv9urm8uhluinb6k5lfyhr12no2zxur9jk1pia8otym0ppfxwivd32br53ej6fw994t5o730srnraoetjw2q29quqsfmbwe9cinbmacwzykdb2yix12pfthtarlecd9ujyxo90ukpn1olzpcyxq1kzmnl105orl8dn5ngyk4qbgw8rzc4hgpnz58i7e5eyzz81kwsrkns2cscp3k9nz90skg9pq7pw8xccy23ooqmatv330zx8b8ohp',
                email: 'l4yuf3ewbg103f605hlkomcrjcu9c5hk58e4vue3b4df0vazhqi11cnlodmx4adcr2xkx7i8xy0ares15c97ekcwcxzlg37zzslndab1ehh1a9z61r9k5nfw',
                mobile: 'oj4kwy28f3mdxvqbvii4xexp7z36640cbvstvlvb26amouekn1bvzmakvho3',
                area: 'cjimjbi46p28wz7svxnwn38ok4v8agr2fy6eqqvpontsy7fh74iysbtgcgq47eay2o6vcnztvrtmflb53v8crgp3h60fav1u1xe4qrtkbzxgsdvywp5n6uvkddge9g1rm2xczu8du4ep24dnpjspwxb8jfhfr3wq6dgbnap3hka1jbu2xazjnx82yjydr4uluw9k13sz4et008a994peztbxed3ekbtogtq07d7631o7s2cldf6ohqdi5yvzf07',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'wxexuej1e16uph75n44w',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'yxpvsj8fmsosax1dfqcbuza2bxkscw22yz8jsbydxjcfzgssyh0r7txlblz3h5jmhgt3g1r3v573a53qdmycmn3r2knaqlu71cfr7xqhgdqmorjulk3mbpmnffahhhnvc7mbkrqlvvga0e9a99m3vbjjwemhsu2zds8fe3za9qmq4levymnlb8wwxjwbhp9qwdotzkedp0nzhwihj2lftot7wolrcma691mc3h98a59364adrkbizl74la6bjj5',
                name: 'vgle0gbl362pawwwcv1cyc359lp11ohrhtyfv2jakha8p2kpijowxztitu4lpcvkm1gz5azwsawhfzfjkr8av9cqyx2jhn24hq4laai7ksbep1myc156cb33jgm9r8q4hnk84feroophi9qgugl5t1s3w7j6qohcjbbhji1p893sj99cqwekypd5azpg5zkg6y3uikaly15xy1doukozsrdr4f59y3i9zxewd30woiqanid2fj29q3aflupd8zb',
                surname: 'evxa12j79jousyayvxly5f566q2zybo8lekncgcoxm9k30x68mab8onxaj71k1wyv4h4dz80y6km03pa6yqq4y8nw2xpykvgrsqhb7zx3ebolv8w74vcul4tkcaxdb33y8c0dp462tu8vwp23bierxe5m63s7abyd2vw234mxppri1t1t5ku7g9rs1bqvyc4uk0byrzpla17r6a866edl0roai0jd4gvdo39n4fwh33350zpofi7640bvw6o3xdb',
                email: 'xztdnh5l0mr8dczn7g2vnokozmeo9gpo8uzd8h0ca2y7z7lq7qx68ojd6hsg295cph6ohnmjnuargswr7xe2xsau3e1zes9oxdfkraqekb3iztygm6ukvdqc',
                mobile: '90wj0w7ef061ezrysn9bus7h7y2osflxdslxhemh2p0ik2zs8440mij6dnva',
                area: 'cd7vexaklh0j1c9yvrbmqtp26ol3kr4vwisup5hjjn1sxy88g88sz4v2es30f13jbaioej4kbxfzte3y34r45anhpw8ib1f9gfzwmypyrsqcj62re25drp39seo5laj0t6djp9c27arq9vn4w062m2xr68rsq28eb72z53n9b1t009cd9loektto8hbe8pc518od9d7m7vwqarx4vr2g8rb88no0u6zd50gfvpltypgd3fjts012tjq8bkyt5hj',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'uftdk6egjtof5wk7yrch',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: '5t233xdox99mkfyqfofvgp30f6fwnsdm1bt39shoimttupwmb7bwvuv69v693qthnlr4ikxtofx9h1gfrs9gi9h74g9j6cs0jj47dd8k4wgd5mt5g65ui0kz6w8mtvi9oidppvmur6rg2hc2t98f409ct7lykhewv19e9jnlc42zuytx4jw0e7dt17kp79rqxg78p4dtjaj4sjj9b3x5jqqa8pwssc40mkens7ahrzo1ju0jk2a1hhn6nxcacr6',
                name: '1ikonpjtetvr54nfyqe9eihdz9pdnaq5cyw3a2rfae0umicbqqsi5f4czd3c36pnwkto00wzuup8irhcszrjp3d5h2tpn09zrffh2c1u7jdv3pgn97vaisy9k0utfut831xjgmxme5bswpaaihmn7ywh8dryimidis2okrkg563s5ryypet88ktki99z8r4jbrschp7lscg7u92ly3bs24i85z3jwv525koghsciyyyyhk5qop4pb7im8p7xn5a',
                surname: 'fkpgwjxf0xx0d2avtq6x4to9wnr5yop6ml49mgqeleksd5okb3wh6n6vtfd1j2x1wvadqfwqebnd7kyweu8ujhcgn27nf4cjsdmcg8swrxa2pao9j4opz2djswxtv5gxko1vm550ugspl3qr59zxadpu7v6174b5boujze2ttkbir8xgf971d2xln5marh1r93yxcip07wgobi62tudmmp2oj76k7aiu3rfi0cwvov6xi6o8yv1mcc1w21pr719',
                email: 'v1jcbecf69puo6gqqay8t2lj7phyr6s6xisgf9m56wp9tcrp9dpmne6lxsr0rfpctveyegaek48lug44ommp7z2sc4o3k3hot44ze1rp69q0xlmpir6fvjr3f',
                mobile: '5fku01grtop0z02lhvjad9j3pdsazjol214fluum0tfxhxhz5nw2qhyjvmkr',
                area: 'ei0dvwd5ruf54m758zmr1ho5kpx5a3onuml5rkne2nmnefvlojzhhxupa26nuikze1t5xh0tal5zobn5ml22yyfl026mhylg98h9jbpwq66ym8exgbey4kw3bksk386ybwbbobofb58iw1k4vjfqlc90f2dpzz35a08vlwwgeyw9l1nzt7fpdhedm4mpmfeq2dwqa5usto5yzh0jprgvdik33vekqmmeprqgm0xt8ak3j3u251hkf0uyn92r6zj',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'zutm9pazoxi2fc4s25u9',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'm2inskh71oxkuufdc61cb6e15n9u3plakdytxffci3831fcp4coi8m978czhlielqbzc3x18ldsdb9njozj6fkgn7fn8jec56ebc6urq2mj3jj2227hr1e2fim8au5p75sruhvvp2g3gn84qsnn6ftv7am2get31s71l7cl5d6ydt06bdlg2lw75ps6vpavu9v8rxgbik7agri7uw0qubq5dhn946tfpuglcvm911fed9rf03t76j5r0wpfe0yr',
                name: 'l8p6fb7t52lggcpml1p4rbp8mnhawwacy6pteh71oe03fvdkgiaunw34fa6c08by10xpftn9d3qnko38q6ql4io8kdhxg05ujfn9yaebt56v2sh7s6uy47oa9wp9ezbg7n64ky2d1m9545fa4t8faefvp1oyuays1mjc0wxlm64j98poyyc27xhleq1laro9p7kw4bpm4fz8uqsmer7vnuz16jtcc3d46jvefk3mwthavqq5be5hw3mxwdanjga',
                surname: 'wzt80pfuyrjuuggki9npt2ibv0p03bnob3l0t62ozycqv0thbdo0ve1gmx7uofjnwuokw4fyb2h70da50kkftc11nq3sziylhyey5iy29489jd5qciqlonvnwi8iwndf459awrircn24225bhuludq6t33das1wxuly92joe3pudo0bk4aqwmzj5so7wmogdk0jux9y46kbbz5d2xg2650jeme9p81l9wqd96u1oc8tpdj6ywwq2rt7fhewbk8q',
                email: 'cs5xbc5fopltql4wuv2z7ba0963keso0ngpj8393jgsfm3c08ynwlub20zz13v79vlqjh8f56jwifjy34fd8i5eh7py1zi8y3ala7u6w0l4ixgm6ij8quq04',
                mobile: 'blrgy7b2d8s5dabbzy8cun2xxejeig2gyn0e69q155pbgxe2b0c1fmk29cua1',
                area: '65qu5ah855q4czh0a8wg2mmo0yaxcna25yvxdwovdd3c89wsdgm8ywoc1f32183qu108g5eo3bjiq0iqu18t5he3j9v53xf59bjdoo68hvn4t8btk73b29j7u4f4twmij2gngx6wzgm2habq06utmelyumu21legfr9053g46ig2ou0unfo1rt86qw4i9kam2g1dfbol1fgbycvsym85m4lwdrfbjf14egakaubvw5a4br4v4fsx3sjlbvk1z7k',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'obujo4f7np2s95go4v2z',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'n7kcbw3w794u0upd32h9qzdhgux625rjb2i6u9g74egni29bb3jnra4f2hltdzrf5epc8cztzyrgxsq1yxs1b6zhsnepu9w415n0t6cha13iva6lvxiczav10j0flqscmygru5wg3ezwa47qr17ybcqwluguw6m2yvj4dprdd4ttto1ptgqhq3havpb4tp7gdlm6qny7uhrw890oenpx5vmh8hvgbjqjdyaqkw1t321w39uwiceovj85wj1kuy1',
                name: 'n4bqautn04r2rjezvnjw81wslarhq89ug3j2rhyd6f6r50qab46ahr0d3325u4gllyzo59ulyiowcigj2d3vlfub03brcpn3h9rezmxq4etwue7oz2n1ofjmffsnbqoh6vzkl1m9ck40ys172k65defynm4p2w71lb5hc45lx9jy6mueln3y82014cmigy8nb3zj6f6kv9mqv6l9nzlu7i0lo0jgj4hppzxvr3mtgq3523k7q2zng301ginaddr',
                surname: 'tbimdlyhizhqk6al8r2r1918lk9c9ofsaeachlpocfbgct7ons3cun7xndag4jal84lle61gvl2sr21wduirinkwesvu0rokssvfv537z8zfz0gmgia9t3iy99zv5wh8h6ajif1kqhxcizqsmpez13aa0ttktywdwvjvxxw5pwuk1igeo5cged160lsvb28tazio86c5becgdhdy02ae5ollbgp21jxrmhby7idrldv2hjcv6tszaizt0tx6rdf',
                email: 'thuxufkkx66cx0sj1g7jsi9jw3o00ja2xb5rp0jsb53zhfvq02ejwfirpg8qmtba779uw22uyac7pewq165txplqoj7dm9jqws4tr8oi1z5sfeq80jsy4apo',
                mobile: 'p033r21ukr3mlew03w1crv93k636xg185qzfspz9dir8j2t99lls811l2iss',
                area: 'frrfw69if76wju16rqcuxgislfkap3hj5gkfc1yyx8bxarx1j60h8u5vi2i9lps4i936r3m4x1pgj3qzdd6jla17yb7yprmhtxtshdrqs24laaww74w81nr9d9p11izrcny0ke9xrmnyrk1vrtysibdjnfw9g7p3t5piwwywb0du9oyatg7su437v2jmirfp88xpxqj1074xggaa642hbp38r5smjvg5f19elfuao161i3u9152v2mr7srb9c1hf',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    

    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'ki3j6w1t8acckyc7yqr2',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: '0oqj9pdqqapchq8v866wo2i39j7od072h5emzyk2lup3od3vnwlh2fyumtny0kss713xru6ny801a02wp8wcab2gim67jrbl09cfmyzo7ocg1ktr2p03qjf7993zqekxsa8nl2vdm7lp37t4j07d9m7oz5lir7qqs66ip76x6htqr9yy2i6sazky8bmmf4q7m8w1gwhkyyqlbttu7ctjbg9amxm73wxv0vp4zqbfld1rv1v6p5fx7caklpriq9h',
                name: 'b6as5u15pbtczsr5o39ux39su6tl6nmub9ev99glv88eyqfygk6id28odun8crq71ixa6nrot38ymwdvofi2ep10vrmzwf5sl166196j8r0j1o69sm2djo08x0plrzid5iwc9u3jgblqv6s7gi6so54pk8johyj9frhptb7bu8pquryojfzmyawmj5bahh7crgpzafprprk4utg4k58a3504yyhu2ibisfoepxk7uluehch7gwsrakglro02h1c',
                surname: 'r8hwpg6fkxkixzr1sn5fes6g9zb00je78mkckj9fykedh2mlbehvplsncaitvqwzmkx4mfipxbb89km0xmwqql1xcg27kiu9sv06scc95ir09bxcx4mf03pjwuzbwkh96xsxsnbkfcnaotx8jknf87vuuhqppzkdsx50e5lr665bkrohe94qa11ozffmycf0o225ynvegsdhgsgx0k2jxckw69o65k8v2dsqj04xu2p8e8r79jtndxt3s89z43v',
                email: 'sd859zrdbt4r0abnqwletf52zwo7xu92fbw0175l8ebzhuhfnajnt6tiw0p9w0o3d3z11s43dihz59km4hcxslvjz9xo8pv9cdrvs6oxgz9waac38f1g0fsj',
                mobile: 'ije0ymb4ln4dpgh87q77ispfntlajmno1d0h5y5x6tuxk4gp1uwn4e0r4b17',
                area: '4f38cbvvsf5tybez9ccjv8z1zw1zp4j3zalb86ilj9ctkbw8sxkks4a5s7hac3wwymri0zey2ptyqqqdid5h508acyj17zthxc0u9jltkayiksm6tq4hm1x1au0irgg7orm5qn5eoqh8834tbh1s6gnejyamfn0v95r0m49e2zc1ts7htye60m5uxctxj52z8kdag8f4zuadubb9zrijvq37wi82gaalxva3v3oxplbkurkw0aemc0xm1dfqg4u',
                hasConsentEmail: 'true',
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'jztf0e26oukj7etaktp9',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: '17mtio5d68nxasqgtgajlyxmwt0u8h2o3wov3jvni6ssfsn3qu6pbhnup31su2vehr9usv0h2c2bcngwcywqzmwk07hq2l0csx9r21k839d1uthts0gp33vcl09kq8lvgvedmf3lry4tfprlzwinqq12hikcqgbyf0s22p0npoior2wdfln2gjueb5f47mhdd2u2f7xi0279gqyiuz1ovzpymo6gaygsvqch2efdycvhsitr3k1yhxrkz3g64cs',
                name: '00ptpyj9xs9u0jxxxkamrjgxf0pr0pikrczl0xesdl93f926jmqw3llem7a1ahhinz63j7a7a7r6d2z69dmhiqf59u77juofflp9z5jgg2yrcti3az4jmktrrxqsyu7w3ytzsvqwpkd5tcjwcl171d2omk2udgisvxvmzy146j5a1z7i917mgnfhrcv2wtb2pf0p60o5965k77399nziad7skzpc66lhyfi6aotv5gv2wpp6s6q73fzfqh3ihiu',
                surname: '1gh2il4d3vk0gadfinltnwegnef8ypiruz6r8763ffjnz9qz762p8imw33u41prjpx4aguzw64jbhot5q8g9b4uzd7rllzz8gb3nuuivsldle4hiiz0z2ddpfw1ix5h6tcdt6lb9s033yl36c3unejguqvdq51m2m9dcu1x7orbwmjabo40s2t87kbaw2va2d731vfo8r5civt97rbk7odo27voqcxxu32tbcnrsebeea9zl7lwfw9ph2fjchu3',
                email: 'u34efzc03jjbjndglzhjvour3knm13d7bebfxlfpboci7piidcb8flef0ph7ypxks4bthx3mq3qb0xj4hsgzsqm0olzdtw8ne4njjckqcyjvpfhypph3azr0',
                mobile: 'os22q7tsewf8t4pmkvqyauudr81zxb5gyqpk3livoibtschoh6a1ry5ayspe',
                area: 'fcz7imlgbuimvcvt5nvi7b31f712xu8ct9odi9pki6gug5myduhhypboxjsioz3rum1bowumzp8dc24aurxdp8db0es3l3fg7anbkdbl5mu8w4uydavrr7jacngnndkn2rj05ze32k28n9bfgjs2rpk9ih45m2aqqnqgm91ff8cv8vtzpw49xq56i5gy3bhrkr8ausv76kp8as0zkya5alp4eltv9uz2vdlsxlre9ipwdizayi00x4oqiphl5c5',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'xyiscxvu5oqmys3i3mhn',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: '6e18css923d1edkdjhnie15ehn74d1kunay8l307bh46yy59qw0up308mbiwcj6pldfo61zjm4pyzip1jkqdtx8d1xav7q7r5wr2ri3susazd1lxm7dn6esrqvo43zzu0kkijm6t02ejv6s3819dedhh6m8y3kdtbqsk6ka0ejbwg7psgz9o6m3uavpg88pe1eio6ltfuwnaibk0m2b7sxm3bxh8ltn599bpacv9mg27c52orox6ke8lp64oy46',
                name: 'jr009p7lr8kop758xc4er2whggm7g4wkgrxantc6i1c63rng6lfebminf400h39rbr4owmdjej3wdun66xfbo0f15kw9z1qr140br2ainja40oiv7aabr1t6ctm5ji042km22hoyd7a7gg7v2xs9wkuz1pm64bha2idz5e0x4zv58oobkszoz0gcjbcry9iqv74aofjhcl81lsib808youtsu9ooc304kqbbr5ppb6pthg5k4ufv6l1wfae63n1',
                surname: 'gn4bwnkhlpz4w674pkn2xnm3ijex1ige5xiifkv4i1j38i8ogvzb0tr5q2hhiqxzimmdn902zy5iix5n6ayu9epejqotb2xcbdclflb611uzeggkwlrc2zarexttbjwvy17oosygouj4u2ll9iwpgkzfypnb7q5uwp3xg7fq3i0t552fz0jy6ui58qkw9hrs68pljcypxgik3z5336f5xhjirtnadvdpyjf0mf1zmq8uc10i46bvnh68gajjakr',
                email: 'kfoj3injana2xe55xb47gt0c5qci86zuhfu4a7a8mtof4yo4xdi5shx5prz5zzscbcynyoqjh4929rdpv4887kunmibyffzytqtg0q6nwqi1zsmy4hmdzj07',
                mobile: 's4gfe4enbgf2pywfa4dqbrm4x2ijvychsdj6v3bnjx10ilf3vid8ldx430ec',
                area: 'frc1ek8zyk832be8pm15ax60o0js7z2kht7y0c5c2h96kvz9k5r5o1f0fcv6l5a5wjptvgqqbobczvzaep5mkto4r7iul241wh1um0y7oa1qu76i60ndhsz152tbwnqvnsf257qbcaagvrl43y0gemmvljzms9zcsz2l59reu4fsxe0kp265699didd3nuwi1wfrx68gsfd64xymazm80jng0lq1ano4bc9bjg5tgr6vyd3btc42n8bgdabt6v4',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    it(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'g9ye4115m549npngbo9z',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: '991fqzgne4kicjmbo8m3n7vr2mjocg5k3uhz5t77obs7munndxsi7q6guq520gsipeaueotjm9owqz3jabl7rgtp9sy3cv01guirgtqimsj07lhczj734p9qyhyutu8m8vgwpblfp8baa0i2qnvg8gp157mor9sy49y6h7nssvt8xk4blcg62g33o3unlorolcfm6s9hn09qzgnm2kgiryy4yt1hohwf3ptt7yvtc33eb5v51r5zm7x1zvm0nj5',
                name: 'j6t78o4zu9dqzjv08fyz583v3c40a7pdiba7ep0ppsbchymdnr80tu7s81vwwxstsrsoaipquk5ha4yjcbj3p60vcdn14g7eczg1z6my9i8vumfi2scimcr17pg219f6tar4c1rc2lav35pyn3zj2e63aus8vf4a0aruxzidd5r5ix5oc5meedd3tg9m2i33ghts0ic3sul5g6vjdht2buhn4b1iqg0qentzwl741d45whiuuhpeycnryte26ve',
                surname: '78jmn41cebvibxkw6klx0u5tt72sb0xvydv8njog2tjcg1v0cfzzxyu5al063nrxi8ricrhuq1waykguhn46g62iibtf80qf0ov3dbtbim8or43tfp9id0fi77nhzf41lrl7n7xppg4l9pj9aqfvlw1bx8im8rniv8rosocq1w26cptg63synlr6ejgyx4vfxjjer8y64gakqq1x55f0xeui8f2ysyt0xkga0d62a1kxdn734oveoewxaprilxj',
                email: 'hx7xst6tli34x0ghbn1wc0fihbscb1ucp5k495ilx2ureexbghouy92vt9ep6c05g4jnjrtr4klmfsth3525b8r19jc4faciwgu8umv4e9dhekzpr4w4c1d4',
                mobile: 'kgy84umvf123iau8z1vo7o4x72prlvj0w6uoebbgcpramvmmwtf48juc2vm9',
                area: 'lvt8vk9d9u3rcdt7xg39hw2rqqne4cqjbvxu12h9csfgclcinmt4x3uz0fqtjgsh2gtsbbtzt5vkfa6zbpcqi63vua8n301i5ousd76if1z72wd96yb9h2szdon86jdl9n2rct0d9fxbby54ojcshk50mipi7s7h53suwybbl6kgqbo1ra734e4i72z7rr0ll3g5fiz0lvf81bc9jrh7g6o2g8n2016d9b2gxeugdd0es5gs6y08i6yxc728po0',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts/paginate')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command: Command.OFFSET,
                        value: 0
                    },
                    {
                        command: Command.LIMIT,
                        value: 10
                    }
                ]
            })
            .expect(200)
            .expect({ 
                total   : repository.collectionResponse.length, 
                count   : repository.collectionResponse.length, 
                rows    : repository.collectionResponse.slice(0, 10)
            });
    });

    it(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '00000000-0000-0000-0000-000000000000'
                    }
                ]
            })
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'f0150f22-5d78-44ef-9051-af1f0e215b0a'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'f0150f22-5d78-44ef-9051-af1f0e215b0a'));
    });

    it(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/f0150f22-5d78-44ef-9051-af1f0e215b0a')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f0150f22-5d78-44ef-9051-af1f0e215b0a'));
    });

    it(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'ef43e688-5b5a-42c6-b4c5-b6051d4191c9',
                tenantId: 'e99bcc4b-d92c-4845-beeb-445d79b9edd9',
                systemId: 'af6b2808-7d2c-4b38-a6e0-6c47fbb95cc0',
                systemName: 'ltazuktc7xglpap1979b',
                roleId: 'ccd011d1-3874-471b-a274-571527818695',
                roleName: 'o9k43yzz8k92mskkg3wkp0xg38wcnuts0npx59t6ifojr9qhfsmiotlzhq3kupfrl9jbdg0a36dy4n26hkf46k8i897cyv9wvjcoo9hmcid4isjckghsrylyva62zt7hj4l8maivpst20484y9q0648zdw9z1ygwxh2z695emngljevigtol5eelo9687ka0tjcqez0z1obdaj12xy7ebcrvb60z9z3lyo7r9x0vj1csagdvdltlv21w6nv8kc5',
                name: 'r823yvi25mjwm00s5nm22iyv6cn67wg52ofg4whc6at1hlruqn9xh8688akbkbzj5wr3fmlsqueapqkcw3n3dle9elsgqrbsnnl4uz2f4sh3tmvcyfcevba08644jxugy2flt7qaoy6jw3dz9y3rwjok5y8dixdtlo3dgj3sk85osrz29pq9dgxslogmvf1n9xws4ovo6j0x80j1m9teuq20xumugw4e26i81vqlcb1z1melntg3vkcqejviihv',
                surname: '6asj1c1p4j2cgvmcsaddoz8kdyy8zgv99uwl9nudjqqezptlhx2zssyfac407ttck5z7dn494jjei0uckpj3thqol4ykurz6fdszsd002nu946bvi6ii8jddzu1umacboao5cp4lvdrb1qpnev1v4kju8vy3x8vz11wwwwxouk8u7ef11s6rd1h1vobz0fd7kpn30r4arz5emfpkupmjv4yqqairjgee8l5dw7t3hndzz1sfc4a3zkcor08k1n8',
                email: 'y3radvb72fcjgqmctvlchg1i6gdej5fh4hytt26zynvluzlifuo3058amy674xuxc2k1f4uo4lgnn85ods2lzxjye8nnpki6ki0fylz7ckvqkljfncdh8mug',
                mobile: 'hn57zzqw7ttcn6ns6cwapa86yotgoyrf1cmaz48amg81on9o74db2g75807f',
                area: '776q0wkvl3rcvbhm6q3b8lksjf56nzx53ghktbgpkvbvlk50i39cx48l5dholncalx6w25www65ekfzbupp9jsuho282uwwn5hxqwnf03phk97xfofxjss44wjw78wk17mbyjpgs7nwmp3cxbyyav7veh5f4ylgpm9oi8xfam0oumbzzye5ibs3pnlllaxw8q41hnpsd6vgs0gcpwil9jr59ia2jtnibiqmstmfrnl840ttk21yxmjpxg107c8w',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                systemName: 'wjin0ttv0s9hn27t693r',
                roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                roleName: 'kl4jgkd0g1ee2cpk74860plak1oahq1ho2wjid4gxpu4hgot929nlw7toiszswxkxyjaq06uvtqjizd95ybxracyg6i6abjahjox1gjz7p5fwcb5fa5u5nihe4rwhad24bg8eg8qfqwvnyyk0saixkg3o1s7qppxl403v0alfd6klhocla6c2pe7owz2yjygj4eqynvvajkhz33z7w15b6n61rsq6jpd7lr6e8bjf5o8eul2mdgfc1m5z21qxvx',
                name: 'jrgw58eji2dc94ck9ejl7g0qrcoklo99yo1cpakfjvz5s2not1mzcvx0qq3ev72ix6ajyejq6mh0nzedkatnh6gpbxcv484o3mddmjsb7ed611uaum7yy6w7o6wyczui45xl2x92vmhlc5tmz2p8ktpt1frmhc8p5xcvn5lsxwhvxd5w7yxtp0juo4it6hbxfnox3ejnjcjd7o7xtkgkn0azygfsdr3zpidtnqca5a9wozn0osnxh9ripz9su42',
                surname: '7hpq3oytefq7cn38h0746ug73h4btmg4gbqi95dtj1iw7gg1p29bmabxmjnt7jtgye347qfv6tndxvdnc3ktbl7toczn0olwidzy67ixz4yh54bf1cn65y6u5cxz8drqfp6zldgn3e4uwp9hd1k4znk8ot4xch8pw58g60i1lwgsrajjtlyovaieog19qus9n8u32brkmwjh567t52lfp94ugye1q3et6hfitxefvw9dqrv3cmuk2sy1vf2bbx4',
                email: '6151bhaj7ivoqx7z3y6am5l12nuxn0jpellad50qi6leru4bnjlpkevb0ethrx7ipbr55euvcnmagg0fvo4s9ispfsgq76o7mqsvhhep1d1rzznb3sebwauk',
                mobile: 'j72zing5gjebkf8v79r9bxgad59w20g603aw0ov6x04d1sypd9zh84ze60ww',
                area: 'e8b3qtur06jwi2mva236jf5siz5gz0saeiotjbgy5yp429i8vsvq3r62gbakb0ugmnppjgqqlukjez5vqq0u9gdk2n11mdtpq7zkeclls54we0jb3eqzp7nsotof8hiim2yj8ubmjezp63y6hauwrkgj8nzjf394jzv8cln5hkvgzavf6kzmelra2i767ko7raqy36jyfk8g92gyoicdtoxc756nfj4fynvs7850cce552rgesxv33hu2x5xhmt',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'f0150f22-5d78-44ef-9051-af1f0e215b0a'));
    });

    it(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/f0150f22-5d78-44ef-9051-af1f0e215b0a')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
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

    it(`/GraphQL bplusItSappiCreateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateContactInput!)
                    {
                        bplusItSappiCreateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
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
                        id: 'c242d641-f62c-43b1-9a5c-8e784c03c5c0',
                        tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                        systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                        systemName: '4qffc7iuzciitq6f0z3z',
                        roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                        roleName: 'v0m4qgtoetgbd62ajdk513xprbgw6u09se9u601dfc968obsz1ddk1drl832axdi1x8lh954jjzs4eb8q9j3xqhd7hnza4evoxeyklkzkc2pv9exjzvosy54yw3kstv4zl47hge8e55s84hwursopuy7c0qlypz1kndqz45sp3d5rmnj9sv768qyhp4xdawcgkbj0ap6k5of6es016dg4ybrjfodvoo4svx9vv9iy22le5chlrngv2drvl2k14m',
                        name: 'sq7cptsvac3xv83odo62zhf0gjv1c6u5uk63w50bvia7ugaih8059j55fyc89uzw2vns0qtg53v3xrk9ka6eoj6vcey3kuj6e8c48mf4lm6p7zc1vfdokgf8xo2f131maj193b8pskuzuwcbwft7caaoddaw53q1lgqvt7opselgnnennyydnqu5zpbfx6929rh3ncqr2gculkvwwegq3f6xd734vc1el670tpuyjypcdh5z7t0gnm4vwzn0udb',
                        surname: 's03w6zzfip2n3u3tkjv3mhs2zxyqijy7cx3romvjznzuifkk8y1uafaaqpxg5ug36g8afisvbblv9q4jpkgo29h3gai9ycwz4u3l76do3r1beo1v3jsqreptlbyp5uvjvzupfpiq9sl2hx201o35cs0s48afdbary4lzmcue6hz9jp3afe0o35egzbrgrvns31gk2xzu52l9ltzfqhsh7yeqjk76yhht65gylc1yu810dlqfs61r4i0ifufkc53',
                        email: 'p2c3m6fshsbngjfbdfs9jpntarpodr8yuz9sc6d9fyswsiuwjzdh3z3ggmg9nntyvvwhou5peui9rkjhz22fahgagm6s9vi7rcur6d3ojgc0zgt4p62yqumz',
                        mobile: '8wd5x18rrb25jw4a0mm4b2ltluh585661d05cn2lbk0kzcsy70c2dmpac7zc',
                        area: '66jjo7gviia07ko52p4hp0qq5qgkwk1lvxt8zfwlnykg1bnac52g4o16ym6drz6ezgoqna7cnol2tg2qeqpdit2kqhuljslra9pq5wu983vzs6omn34p35pgzjre24yo3aklr3xh76bxzimyqi3qipbwj5eecqrebg3vi62q4678zjtu2dk50dnctpf003hxwhqz8bd2nysr7je3qrxbb8azmatwxa1uyn4evyscwdmo3wnsgqwtxldbgrf8xjk',
                        hasConsentEmail: true,
                        hasConsentMobile: true,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', 'c242d641-f62c-43b1-9a5c-8e784c03c5c0');
            });
    });

    it(`/GraphQL bplusItSappiPaginateContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateContacts (query:$query constraint:$constraint)
                        {   
                            total
                            count
                            rows
                        }
                    }
                `,
                variables: {
                    query: [
                        {
                            "command": "OFFSET",
                            "value": 0
                        },
                        {
                            "command": "LIMIT",
                            "value": 10
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiPaginateContacts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateContacts.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : '00000000-0000-0000-0000-000000000000'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiFindContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindContact (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
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
                    query: [
                        {
                            command : Command.WHERE,
                            column  : 'id',
                            operator: Operator.EQUALS,
                            value   : 'f0150f22-5d78-44ef-9051-af1f0e215b0a'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('f0150f22-5d78-44ef-9051-af1f0e215b0a');
            });
    });

    it(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
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
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiFindContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindContactById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
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
                    id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('f0150f22-5d78-44ef-9051-af1f0e215b0a');
            });
    });

    it(`/GraphQL bplusItSappiGetContacts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetContacts (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
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
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetContacts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
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
                        
                        id: '83297ad2-b8c8-4835-bb2c-cb81ff888307',
                        tenantId: '2f11b9f1-67e2-4eb7-9063-3646f119aaf7',
                        systemId: '1f513459-0b18-4fc9-82ca-2d1998ccfa4f',
                        systemName: 'rtjgp1c0cwgvvvfytkd9',
                        roleId: '4f40db70-4959-4cb8-8509-cf6047021594',
                        roleName: 'qbercqybps2tfzu8iizvmjr5npn7e0kdfg7li7vg1nwxyg9adwdey2eljyvbiv9crzuw0292837eslvfrtlr93yho2dwyv2yadscw5dbdcus4ln7x3a7rt8jpr3dtg91exxhtoiljatpo2ziljybgu2hawetn0vbyzjcpo0alkkzmd5lmb2gy9lkk0qo9wy4xeeh39ftdk599zr93x1knswuixfx4durc2rzhyydrdlbe5m9ybkdkjmdzjcpxp6',
                        name: '1udctuxqvgmlw51usla3nyyjth46xug0l9u3zqti4zjr5ffkx5rr4ghj5gnymcmrvr42b1n667f589o7njxqw34iys9eacry8c6oolz2rva86kswld9r9f3temmub4ydec8sxsk1zl3z2scdf7287zogo7wqoo4v5f705qq02a07igdryhreg96s7wfoptjcvipi81qnxpv85cbb8f9cp6zp7wqdj5ywoxid6x6eho4uwfn2uqdsjscuk4lk1gt',
                        surname: 'wbwyn434w7enqcch08x1d3pievi1d04aqx8w9lnmq6ojb8cvcq3px10ed6jc1hjn9j2q08fzej4ky87da3e80iqu36oiynqwam2gbxjz358f9attb9gzuxwqfg020cowoaewanz0gw2lzueaby8iow5cioab8kvblum90sp7d23qhqo30wudahcjohmlgx4zbu2iw7td3s50kl2fphox68bcz64s51uzb61xwr12pqt61b9ls9pmiwogxvr65ph',
                        email: 'il8qcfotsf70tu6z8skwt12eeuv2l0fhjnowpw60hp2h8csqpnfnljroq4upffhj63d2ti8h2bej7pijr1lurjhvfd1aji5bc1t7h7me6ntos27gncml8im5',
                        mobile: '67al8tmmxuwi6lzr15p6jzh4np77hq82zljciaqkilmuawv4jw1ne0qjbc8g',
                        area: 'q98i6uvtr74ku5mqdgqnvzp7cdmmymzbjajxlsj737istgo2mbtby3c8byedtyz7szr2p6dqikrvu1fk0wz2totqni0piw7shh1933ajj2apt1zt5jfgarvzbj5xelkp00pjn8plhscy1qn4795kw432d5p1z1z3skekkbskdvfash68qw0a8fx31ffyz0lvjabf6l8qmgaehk3qi6qiuly69xncb4o66pelbulizh44gq1rcqy3y6ifihvbur8',
                        hasConsentEmail: true,
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

    it(`/GraphQL bplusItSappiUpdateContact`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateContactInput!)
                    {
                        bplusItSappiUpdateContact (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
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
                        
                        id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a',
                        tenantId: 'd2966e7d-0ae0-4ade-87b0-55b8c2d396f5',
                        systemId: '121df1c1-08f1-42c0-bae4-4221ac7625aa',
                        systemName: 'ec71m000ji7bwmhzpjuy',
                        roleId: '0db2de56-02b0-4e93-9015-bebd4285b8ea',
                        roleName: 'isd420i6ogf7i2ocypcb0h36of94yhxr6133d16x0xvj1yffjgoxf13gbhgtz3mzj367i0udspebx5dada1rchvg09lmp1j7nkg161q4rfrrgyyl8kw7oig0u82o0gmqh1hwvmqn6rlxcprrs58fjqv1j9h7j1e3edi0f45vydigeic055esf8k2f1lgmg52wo7kkwbuacqt98dive7ir2ludqzofl0wpfwbnnj5di8ifkfjjqrw8iisw0vsonq',
                        name: 'dbixvvxbwkyqprlq84e890oocnzy4d643dq9mxr8a7txlubgdis2g78lu7x5wpl5jjjgvk4s9edkbgxw9w90jhs63l45gp9q5jwudl4os2zgn4r0zljgbsmdywe52n4xsssd1bugwow4vc597xips2j9wz899w6r9z1eg3os4ntpdrd13yjqqihov9a4yeecjaoxmohcccsi1uzh0iwf6gp8ee7jeexl94alxbq1z2t13emkrlke1jk2fy68h3i',
                        surname: 'ajgctb94ykmp5gtqbg5xg1czyw33tr8fuidf5wjl5z769hdpq2kadooiikitjdwev9s861pr68m0xmw14dgbefubxn1wmaoqijhysx0p5vcoizwnxcjwxku6wi8e7voiu7aid9boh3r1xk5w18cgwaaazpt7j90ede804oghmprvtfg8vros7tuz4sueta2hhfildcigd5evhnvdnk7ir5fm5rhg9gjlg0qxym6pzfrlp593l7rywa7i4uevica',
                        email: 'qs7d0ndcwuzwseg0i9pxdg0qb9qu3gh36m8vwoza0l6vy5w31n185vgxstqtz02rzldojz3biytlm0llx9t2hdff6exyl5h343yoyyol5xu6wky2859zpyrw',
                        mobile: 'b7wqozannz9mtqzdotzfu4oapi4jzz443diepwrgxbevey4j8o3s4hwby2m7',
                        area: '2aaxd9mj6c8prxk4tq52a27cipxchabnqh2h4k5unodd7qk0zmjntgbkpmcd8oz0fscj5b4myjsrtctqufyqn8wmbaumfub1wzhg98zqk2hd3o8mandye7ndldatgtreiyudcg4zbnmqnp45r1bbtgb3vzf65asicxdm12vl3vz4ahohpr54tp50wh7zrew5j8v2err9c6e6wcujoe369m4m6lks3l2ugd06tc4nj75gwpa7snz1w12iizz0thy',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('f0150f22-5d78-44ef-9051-af1f0e215b0a');
            });
    });

    it(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
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
                    id: '00000000-0000-0000-0000-000000000000'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    it(`/GraphQL bplusItSappiDeleteContactById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteContactById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            roleId
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
                    id: 'f0150f22-5d78-44ef-9051-af1f0e215b0a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('f0150f22-5d78-44ef-9051-af1f0e215b0a');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});