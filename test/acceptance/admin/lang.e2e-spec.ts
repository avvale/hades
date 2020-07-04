import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ILangRepository } from '@hades/admin/lang/domain/lang.repository';
import { MockLangRepository } from '@hades/admin/lang/infrastructure/mock/mock-lang.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('lang', () => 
{
    let app: INestApplication;
    let repository: MockLangRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    AdminModule,
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
            .overrideProvider(ILangRepository)
            .useClass(MockLangRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockLangRepository>module.get<ILangRepository>(ILangRepository);

        await app.init();
    });

    it(`/REST:POST admin/lang - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'l03x5ffrg3vfpcjzbz40ctjoeog0qzzqczpn25gbxs0kb2r2jd1awpp7cvn0xkwdn9ien8am44mttym3naqt27rt8wsfhfr2fwnjl1kc2rb29016zpkxjrwv2u1ryu6wrgl89hsof8lf9s5nuua5ksps7iiwzuadfj7fldlp7efyxkg3p20nf1kriuomzkkxwgr8m04xagr5lv41an33tq0e7yn2wyrcgwcg2zht5ae25w7832yqgr4etc65ti2',
                image: 'ossucamxagptsy17zpxvhezz5sb19dylijioz5ez85u8345vau3hivs1jbsyq67ntl2np0jcm9avgk5eq3brjft9i35iu3yem4q78yla76wzq9r2piffw1sjaycuhgckh8r0uj76d8pjtc7hxfft0sjjfu1irzsusaryam5fiimafjlz8wxpnglbf5uqqrg5mj4szxx6zyacym0ta2qjqc6d1oa59py1uosbvop0wntrjg27ynm472axouaid8z',
                iso6392: 'll',
                iso6393: 'b2f',
                ietf: '0zaum',
                sort: 738971,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/lang - Got 400 Conflict, LangId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                
                name: '1bcf3ocrxvu6o497el46vrxvno202cg9m15p6af0nhvkezc91xlav362d31olgji9o6x5lvh863a5l9nm67hga75w6a2wdmgvbwu2a388heu3q1yu5kfcork8l8v9g8ik7sh3t4mnkofqt409zogq9e0v40uch61z21x5rjwtma7q3otq7svmncttjsj7p27g5o5omhvdaszulk1f6stomtp3niv71y6zjls8bewvbvnkdt7du3bso1weggophd',
                image: 'tx1vcows6dg4amfnydv6is4lz7ail5sdjs3do062ys6id4gn69pgfjitocrgcvqdar2b5zs43dyo7kdbbex78vvksytpmhgc3x2oo7zvhyz8x4ydbl7ksqxetfoun4cvvod6sjapk4o35tvhd444r70i5gyzirc9lwbq40fva9mcq6ea410pouf50mepetlnakjn4clot1u1xd7od35u2ypaq6qq529o64ahidbsbo9lbphl50rr6snbagdg43u',
                iso6392: 'rf',
                iso6393: 'm5n',
                ietf: 'uxq9o',
                sort: 183461,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: null,
                image: '1rdjsi8bn7iu62t3g47r4m4dbs7475z9hwph3mjeec4kg3ul3v79vshijoiuc3zfj3qwjfvb1k0nsw7jpsl23g4qxofvsasrmy2kfcrb2au1akk1wg5wxsdqk59whcvaw8ej9iz6orb0av4a0jl68ne3sdocl6n6oyab1uyog0xu2irsuvn19x45r8lh2so6p4uwrr2aahzhalezj369dcmxv0i8io92a79s8ph9vjd6idgh9be7oz8585jmh37',
                iso6392: 'uv',
                iso6393: '2vd',
                ietf: 'ln2pj',
                sort: 792499,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/lang - Got 400 Conflict, LangName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                
                image: 'ys26lsi26v1iagvglcgucub68wgoieocaxph1fnmhcof2vze4mxo7gp75iho6eue04dknk9erazg62bmr7702gk4ixfd2iluppko9312hig6egizhiqwe0z9vw5o3l2e08dlatari2z7yit9nyfffw3l464pn9m75w2c3iuf76hybs7ymk0j45kaxc41b7323glb2tawb6iakv03k0jq31krhr0nkrcuwctkd5hm3kf3g7su9xrqelbrebmod3d',
                iso6392: 'jg',
                iso6393: 've1',
                ietf: 'a4gnt',
                sort: 833711,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangIso6392 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: 'ppzyw5we4b7yhuk3mnct20yrehd6c4wi982fvbpne5wxqiulp28reiskqrtg0d002fwkq2f4qaec7c7vgsklb1vzw62m31yxqdv7pmbstc7uqeru32zdcr3lyqobjpvaazgozj61sdml1979ky1goemfpyjddfct4calxqxlz58l8b2ghqn6be7aqg3pvnyxnywnxxc24t12qqvxe1v2n0yo9hjkkjwdhgqse9qf4egao7uthmo8i8z0u6oqv0r',
                image: '3c3amo1st19jbh4k3kfcbqs1mud16nq9ax1ra6aq4xmhbhr24qowq12dlzenwxxl6dpxjfxpxzy4c0abtjg57le52rq3ykf1wlvooevrcyofigs50z80eyhwlezkqy49cefzdydqaqx5c94kd0fxnqhttdxlopyyo716epf8o84lfisgfs4lyawjgrb3odc2jalo98gv7dsqd9xur6mp7l1ndnqu38wujeero843nb908wa7mhckuqjrrpc39ag',
                iso6392: null,
                iso6393: 'jqb',
                ietf: 'r04uk',
                sort: 256637,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/lang - Got 400 Conflict, LangIso6392 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: 'uw3lhcas491y276y5e5drcvkm7z4gi3qhmrvyg6cjst6jkfrivm6wx6gf5s3851sdwyutmw1a6u8ikg6zvi8fge4djhvubpx9alu8ei6832nvaj16qhyuwtrnecng6z11dgangcdf2ix1evcnohsfbl1kls9b4ipnxnqnfzubvjgbm3cyerocxe6qc8xzk4p0v7nlcio2dh3u5mmeppizckpr8i4i9ioprdy3on95iq1wem5iyjchr4zen83y9e',
                image: 'ggzy6kr05dtdxsy6vsc2rxgova6559g701kpioxuk3rh0zwbhkf3yktio10etleivz2vnnbimfa98l3507rkkt5ofruwj99dr4dnpr27zy0yk8pdz8kf1cv3zcx25faciwz8pj34jbroxokamepjrr5mc3pinq1z45f5krzy4hamvmfby4p34laes8129opu5ro2l2ihm86od3k8ukj2y2bad7jzgmycag6jgyy3qceg4twbdot8ig3883hmqm2',
                
                iso6393: '05l',
                ietf: '1z3pe',
                sort: 500371,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangIso6393 property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: 'a64wnaf09jennsl0hfv1x4ygd3ef53gdw97x3y4wnqc9p3aqlc2w2kbo85bxwt719tynr75pgjgvouzpzhxkgbujp6rqmcko3brk9v7bqyzrqf94l5in9x8al9usru484nfegcmac7uezkz51763g5dvs47a2mofnd4mqb0oisu0l5ctdkjjyjbxbrrpuodnjfut5spze67w4qata0bx39vdb8avvhl2o5yyaxsr6nlz3dpwmwsbctxfd7fa1j2',
                image: 'mw26o89cvufglmba5gcbtl5iczhkf7wm4x0fj69bb98o7gbaxp5ixfoztvizzpjcese69qas7h6i7xnfvoox24durtyggzmlkv90d1v7ht7gl5tihszi2u50sacq9zlv46ff1fo28p8929wnfm4fcommi433160e171g06roxr08u1knvbzz4x7xsreta458y82egboeydtwo7yc5udw70id7a9l9xvvjhr2d30yo59vij1q8lc3k2e27ndbez4',
                iso6392: 'rq',
                iso6393: null,
                ietf: 'grlc7',
                sort: 262362,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/lang - Got 400 Conflict, LangIso6393 property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: 'ltjk8t08p2s40rypfw0awwwtb0z8252iqgv8kr26kz2h3jnhw7y69wtm5jorim5szakj8u0d7ta5ls4s6awezb5dddqo3zh9v1yabxv1w5p90zt98r381wks5mp0eg2mnhj70h3pbx11pzxyoye6x73n5onyl6yqdjfns2hre43bh2c5mt2q5qvgnk6wbeg6uvk8hwunfp834sdg61kvi5dqcawhq8z1w67n6kczbs6id4t3vqzr7iojpmfitsl',
                image: 'rj9775x16jnl57vxt7a8pflrvwxthwzjl9135c5xazz23uignaycizbd12d0ahlfdqe21mc8l4w5s528htw4q6vkhqztj4z5oicy6l2ekx2085tkzjggsla3xymkn65fpxytsvz12u7rwe8b7hpnipg7g6m2rllmcu9dpdl2fof8urze1yrp4ikkxufaoyq1fo102452nego91fdse5t43yzwbphyawx9ehme1jw5eslz6v2jauhqx2zqirbpc0',
                iso6392: 'cm',
                
                ietf: 'suust',
                sort: 639001,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangIetf property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: '36jabragm9br7o4xrdvkmm303jy34rbfdg98hr4ghsavat259ifq9ec5jpl4ers6xdaotffy1ta5w326ivd0ccw0sy8y3sowhsd0xu8ka8gv2cs21urxpywef0ytavh29u9rhyq4bq0xndi9je81qmfve837mmc7jts9sz756kdetodrfkazrb8top989w33rj5lxfxbkjal6tehxuicv9koh37kwpdci1ub9lbu2qv6251esfl0n6268ms4bi0',
                image: 'rn0eygg26afcwniewjd8gz119eoziwuh0d0tg7i05sk3hv975gef55fvt2i2e5akwh0yhkm6onottge2u0kjjmclp5lhspclcf421bto12ix5zc48tm5lnx8rc5skx74hsej0qx2f0cwp9dtotlvdrbu027s1mwfxmbhvoox6pl4pmc5unwbspucwpccq47pmg1323c6vdncrgkhwlavl5oayvy4sdri5mcxa2s2mfwsl1ohye44z6yue50v97y',
                iso6392: 'xn',
                iso6393: 'r3j',
                ietf: null,
                sort: 607365,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/lang - Got 400 Conflict, LangIetf property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: 'nzguwv9s7gl8akqdn63h08s18mjeqzwyufg7q1gzn60758bz587iuayigv6v39tmd3dti8fnw0azkriaxqeg4kx0u11arirgxbakey8bt3jla8yhsykl18cuc8mp1gdg44ji3ztjlyhx97qdpky43y5rrbhl3lxougpc2elz379etshemseuhs1n6yh3k9qusrvgfzy6g0sotb5gla1959eczuze8zixyzk4zq5hyrbkdwpwr7hyuk1dnqebxha',
                image: 'yk9g7ucv7kv8rzszs1y43hu1lvv7k5o3o9igc5h5r9hklum0t4ztcds11pvcwja92hficar3jd97389ckr72nvtn67afp0lald386esweg5b5v1d3heicdo31w5a9iulwc4x8hvk6br3ui3zvsexzuad34wbqedfu8dj5yo1he7cvqtr0c6g2f2hruhux564wf2xc4fp8xj2q0mam22uufvpyrclvqi7tn1480oetavkpduyw33q6ubax24wyu7',
                iso6392: 'cz',
                iso6393: 'j5c',
                
                sort: 333359,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: '32zy7tbpn9phaph8be9h0f7vsxy3yfimr7tik6rrk1kafjq6tz8e90ss40pxrqtazo799ldy9a4tfn4nhkt2i6lb7g8oilt7bg4vhug1g69bov1e94ihr3licgpjrndnzeia3x3tz5uyk27e2koxye8vt5lc93gcyf50b8oeffla4exjt11z2knkcx8di9flqwwiicoo535b71t71j4xzdz6hnvc17kpe8wje501haqpjfpiws4lvs7mo49ct4t',
                image: 'vyv7pmk4teptyjgdywr6fgay0ba90duuqy834uki3khkift7dgiiyuot3tp9zkgbtard9t6t4644l3orvb28khaadzg0zvzejrecls19byatkc7qn276ohfbobpjx1i8pv5428dfis624zjfs94r8l8818dhf87954d0x3s694pcfxh97qpy42bhy55g03ycshf5kq1yxnbit1gs1b7f70vzxhrg4xag5bijkb325hp166oixqbrsd00z949y2a',
                iso6392: '4j',
                iso6393: 'wgt',
                ietf: 'xshjf',
                sort: 254741,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive must be defined, can not be null');
            });
    });

    it(`/REST:POST admin/lang - Got 400 Conflict, LangIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: '1lhyoyy0u3rgbjuf8wpl8bm6r0nzhmq3wtiibaxabmxvynj4yws6urorsho3lqjg828u0pdricik33998gxf7fhjozcq9n7mu7ddl7zkp51wnanuthqadzrkkutihlbh4h4l36rgyusicotbjx1povk1bp49kxcuwauf27s7389s6li0mx07qzzddm8jo53mpb1o8r3l26pplsbhnpntcz6aosfn8dd9gh6gefe7488hf3dc2vbx4rzri2rq1rf',
                image: 'ul32c0p0g2ec6r8dpnimi7igj0swz1ffyr1p5yzb3v6ou7b357fc0qok2gaqhlaopd9wyrwptroihum240tjztp6m8lwgwb510jbrspy7fd7dlgdt3skhp7sb02lnnhhvlmg6yfka4vwkb31h3544gv6fi2du9la6ybqmi785htin8qlf0drmda7upc3kb77v046b6ykyaqp5pz68158pj1rij7vh07syxsi7h3t4s21gl1h7aeiznrfuk7t0yx',
                iso6392: '8c',
                iso6393: 'aet',
                ietf: '7h057',
                sort: 871093,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: 'tmbrlr0vxhlq8x3s15ioryt574i9i5tuf55gx',
                name: 'e8mrwykt3zy6ahm7p0u21gkztlq1btmlb97879znjxxfi2zr1fll24c5g7wp8tyy0px4yecfgbpkeher5byce392ge9bcyv68kh73jdl6102m2g1yvp042bf7f6dzf20snpf4pyo1mry8r29lt3mqfuc66cokyntjkn0kkl2npnmgnywlyg9bjdbf0ojcx0n92nz5gitumjkhullhllf4dcxgykneedczud55teurc4ae1wo3tl7w9lvp54zaei',
                image: 'mw1f8mch9dfz5p7lftvy8cn2lx6ccbvhy5ztmck3xs1ogm4w70ca59f22sjapm2lbt45zcu838c39bp6j3ehw6ei7fjoeesk0w4e7ut3parm2758hla0dvc9rsb4wquwnlsp8526fipuzzogqfxcmkiv6hpnizk039ba3xfnk7dhmufr1d2yghchkoe0khyhbfwvu1ulareqdssnd9rmdkj1plhrgghny5njqtgm18c1zkwfkp0gdn3dsk2i2hq',
                iso6392: 'ip',
                iso6393: 'gcj',
                ietf: 'syoca',
                sort: 900955,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangIso6392 is not allowed, must be a length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: 'rp375aje2ucu0jbvp7k51keyncj3dwzlyjxx8bdrrfxpe5y9xue1uwztonzauwaec06o7qepxhsvsmldhpzffl3iqwcol36agoortgh8j14qcvft3wimnoqmpvzvzmj8pr6jzzo7hkgzrn7ewuenog9rkrcewi3lqqnd9thv6566rf2130l2b1j480othoq7k7ablvpjj81957pwtwsytddlw6xd4uwjkt0exg7i3kuifjqped90qpsentl00c9',
                image: 'x81fc04n5ihh2rpiurczvy95ojooqf5sm7oeeeyz5pxqn7ze3hlmqybsgekdwc4mo7npj3gh04uphh1mu5fl6okkcv1nuqio4iox5qomdafg2t9ikh3j8wdaxb1i8pflmpcjp6i808brhputwqdevkiye6yg98gdbkdyb4q38u5pa4u5f21l2a5m4rxy5g5ld4jq4ifuudylsowu36qlv2a9f7w2hm0b7pqfpi6tqdebsuf2175e9tm8rpnliqo',
                iso6392: 'rbc',
                iso6393: 'tx3',
                ietf: '5m3zo',
                sort: 922302,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6392 is not allowed, must be a length of 2');
            });
    });
    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangIso6393 is not allowed, must be a length of 3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: '2oi55ul6gwepjq710cw902o8w7m30ny7j550q49ohi6pkuyg7efqm13fqnlep3j6ja2bqgy3ztspb4t3py8ihd3hvuj1zl5b3xzcxj9csd68kgynyfpqbui0akf0acldc74h5lz3za0ac60napem58nrw3lm93nlsmx1f96u8qz0ovks1u4xo0osuw893b6fv8jy33yjk41alf5o7qiiscengpeiug966tn9zzjxuf0whznsylsstoyyupt4scy',
                image: '5kvacincewlg6xfjnhei8z0mnm9szdjtkyiilddz7hpugvy7f4dbm82b4x52ajjfnr770rgny3r8in10mw6x3gmy5zfpfb856ezxhzeyxjkvlbiedx4gzwjfcaj40naigvrw0lz0c9y09rgfyfh5vhe97ik2b56cn06zx5mxielqcsod8pk0ko3c7f8v9yalohmjo5in8da5wrjbzp08cyweba3p76ieolkqk4ke2gcmt8nwzkxpj5bh8pd6ghp',
                iso6392: 'cv',
                iso6393: '8lnp',
                ietf: 'n1im3',
                sort: 533051,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIso6393 is not allowed, must be a length of 3');
            });
    });
    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangIetf is not allowed, must be a length of 5`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: '5b4fmjxzlcfixspqmpjxx6iym3gd6gbqgvk63y6rlvsqme03t2lo5fae2exwcce1yfxbtfp4vcw1xw0k54o8dcvxza87o5giruxa9j919chbvaoxahipsirp9efmdpwugrpy4ui84tp6zygsyqtrgdnpsay95907pi4scm016jpt6afcp3j3u1mk0rorhxm1y97m08zm8pj1lsn15gno8n09w2symkpqsnod8tt4sb7fgihtfsmu4k1ef96ur3o',
                image: 'l35vlnnx8snb02rox7rmb5bt34wclbxvghl2jf9g9o74rh7ilen5jggqy595kdirluqm9b4c0ywd3k8gvay9bysxdzvvfcjbnkony7245wpci92l3ow4sqg8uxv3nnpuq0k5klwuu483lvgl9i51c8la4f0psty6nwdrriwpvk8pu46t1yztrczoafzcp80ubujid919ymq3tf55fnsncjeuletdeflwypcd1oua2oqbjci2gzkrs65ro76d5aj',
                iso6392: '8l',
                iso6393: '5q9',
                ietf: '6jklja',
                sort: 649644,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIetf is not allowed, must be a length of 5');
            });
    });
    

    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: '1h34vryhi865d7v6sl3e3y3ytjxkq1l7au2fvi4nifix5pro2ag758qttqj0v9cy3fb4cp530apa9ayyhd46w3m35aoqxnpvyyfs154x76907u5lv4z771q4pmd1i2mgsarqv8xlwglmhahq5ya120zjiq8qwzap5gsf5rd6x66fz6bc25lbiwft3ajj9t10qmuzqs5asjmohpbnkb9yjrajnv5zyzjsqrme0ra068r3htkhfps0d8dj7mp29yny',
                image: 'pulwc1zn66gkgi6mk28291ghc7kld3t3emp0no92mmszzgu6fz1fuuz7mjeumx0fw1agylj4lew1j86jx2thghty8q06g49p4o80kb2vnhfa6075xqz3x5elem303z6zsqt5jkzq8y52rq5qd15qudka86vlzkw7ix9tovf4ywq4oaacwthfne7f0b6ih3xhiq2ov66z8wuee272vemijvptsobxxolvkrumdtbmhjcwgx0maj5lyju2n3yz28u',
                iso6392: 'ky',
                iso6393: 'm24',
                ietf: '75idb',
                sort: 874882,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangName is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangImage is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: '2b0lzfttao4qgatv1cq3cj3mqzkb2gvaxyfcstw25nhwhhkp3cfpw5w8u1m0np3v2minfha60dc0vuvcvqz8he1wrn1znsfoybki84gspdo9chxru3yddwgy87ycc0due5pvzb2rdmo7i022m04flmu6hlbh2uy8mfztthcuhdj0ahy27ok5igdzpjmeqj2as09wjcy00yrlmfle9kj30izphwbp55b7tov9qxqjiv7za9yktggog9nqmanuhjx',
                image: 'pq8sm2ykhbqonh3pq5ww9bwxwu4ymhfoklh2x65c88p3bzbb5bhp4cro5xu877q7h7mkvvtwhx945m0x1iq6pbdajgm8ju7cr8e0v9wdauux5eavn4pxy3jex49e74p28vhvhng5b1ncd7l3f6qs191z310wp6n8tiruqmkz1pby20moeux8k1oq36gfz40v8vmnd8w1xqarnut8acmyjv76gendw1mt54vlpqp360he2axd9butsjxhul0onva6',
                iso6392: 'jd',
                iso6393: '49i',
                ietf: 'r0d6i',
                sort: 797637,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangImage is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: 'v7nggfmb8fflkllkza2kogfoon35kbfq9khx626fxvjrtujceewfit4agfknoepv71d6d3zrgtpm6dg2brexo3zc8parn0imtj8ayxt0snnl65y715tznpyjdehlkkxlamjqht95hm5r69v51utmd5hme097s1cyb3qv6bbwy63bo62fq72530vk2pxrvlrvec2ywj4x08o0mxgz3sf6y4lmrjiwlfgghagsmww4mpu5uj9b7fdcih47d9rlpwc',
                image: 'oyh1vizekapw60no5xm3e438yqmstf9r6owu1qxd927mrmrdeb6md7s2ibuufjjs84rwkjgw1m1hipkoctnbkq9o0u0ypnvimp98z6op9z7fbqxyroodncms01k52jfojlbvmui2qul6gya93yl63omun11oo3470tb39x8vb75y4ap8rdi36iwayczv5r7vg72bjij8u6rg1yzeud1ai8vu9oelmolovyltqaqjr29oxylv3z5pkfgpz8ll42r',
                iso6392: '4c',
                iso6393: '67u',
                ietf: '1zmea',
                sort: 1938023,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangSort is too large, has a maximum length of 6');
            });
    });
    

    

    

    
    it(`/REST:POST admin/lang - Got 400 Conflict, LangIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: 'hxrblwuz01cw7l90a48via7tkyzmopzcp4z3loowcu562ci9em4jgw606dd25ai24wae6oymo45fct6xc22blkzz7nd34sz7k4q5pmt8fz1rqul8s9r0e9187xt0891yzne84khjy8ixm8alwnax89seosv95j1lab7leovl78b2oofi8s841dovlds6cnwcw71d9yc7rcmdujfaw09hav2w9ojb8yhm1h6z58cayst4an6kcve46x54mfaj9og',
                image: 'bkhbbhu7y5qws26ldekyuh7p3go34rhahnfc8d4bo08mutrc9zpl34cs00z1s8b5orff1nmu3cp45bc691y56l15cj0zcezotrr6mb0cosd5m4eu5423w4s0xuyk462uyqpszfjj6q5l2c1xaf4anz4pt5qkh6vl233lnbx7gstryctamuip1nnisuozeviieft8qq8it4z88l5fq7d3lnh82vugko64qph6bfa6gclv6s23phg71cawv8vlw6e',
                iso6392: 'cs',
                iso6393: 'pee',
                ietf: 'v3mmm',
                sort: 783938,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for LangIsActive has to be a boolean value');
            });
    });
    

    it(`/REST:POST admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: '3nofpsnhuh817m7lcsvv2v14sh9mvob3nwl3eayo0y4rxnfnkmkaesde90lm35s1jk0x5v7vbkpy7jjvrs4t0sc6ojqhwh995d6ou5hecvsy3a1nmvnr5j40njq44p9bnpyljttff6skqvw26x4r4odebm8u7bmzblwk7pdte39gzyzaghe81mhrma3gmkh3tcf6szzs3vdyimgb90omvehbatpgzl7ovxqlbbztg1hbw50nk8ijj7nfs5ba59h',
                image: '7oqou4um11aahpb9gvbvga920l871b6ut3eeuytt3d51falk5eatml8jd1i1ipeqtxfrhpy9wz1qpe4207l4z6hwd1gazjrxy3tjb28gjflcx633lqk1j86rd7p9hot58czlxsyme837uxfto2asny46s2d1oss4ayzbnqli7tp8rniwpc4h1nnxpyzr9swbp2y3iuwge2qztbym6dput30o3a0g396gvkjl7rucfop58r4y5xlgfepoqltxpom',
                iso6392: '6g',
                iso6393: 'dh7',
                ietf: 'mawwn',
                sort: 806077,
                isActive: false,
            })
            .expect(201);
    });

    it(`/REST:GET admin/langs/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/langs/paginate')
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

    it(`/REST:GET admin/lang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
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

    it(`/REST:GET admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '86d2d929-7ca5-4849-b278-f17a0aca744e'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '86d2d929-7ca5-4849-b278-f17a0aca744e'));
    });

    it(`/REST:GET admin/lang/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET admin/lang/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/lang/86d2d929-7ca5-4849-b278-f17a0aca744e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '86d2d929-7ca5-4849-b278-f17a0aca744e'));
    });

    it(`/REST:GET admin/langs`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/langs')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT admin/lang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                
                id: '21703de5-0c4b-4758-a360-53c56d561be4',
                name: 'z1k9bm3g5o2kide26tuahvkw86hhr9wke2pwlmo213v9bjc71w088o9epv9vg8xzsw5649p9o5q2ptvl41v8paudglwg1ew17x1orpi7k91rnpm3wqsd2ovgtxuuxkrp7gpnyz2v5zc1r5ac3ptfykjacfr33t9s2refuyeoo6iwlm8zxk15hoc1aieis19up39f23jdk7h2rv5q5ao6mthtmmsnyzyjy4kbeu1zrel74xdau6fjfzq7le7ehnl',
                image: 'eryopxkjzwa5kw3rgjg444cful1s38blem2ls26id3tzfl0xmfvod2p492199lock96sya2asy8x3pwkpgk6dzju22ejzsyi7c4n7qr9kmix0hx4mes27b6kz52i8q58ue0qsjhdtq2rto1v7lwu0oqe5i67oy2s6nmd62e1unuhlagwnbbm33iy19yvxnac1pja2cqz3n9jirnsa2jlelfkti7fosmkry9jhwhabcjhrmkxsvdk5cmck7rcgof',
                iso6392: '3w',
                iso6393: 'lk3',
                ietf: 'ah91i',
                sort: 954844,
                isActive: false,
            })
            .expect(404);
    });

    it(`/REST:PUT admin/lang`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/lang')
            .set('Accept', 'application/json')
            .send({
                
                id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                name: 'cmo4v28k2as6tyns9ojqt6eki5anc0rxigg1x0ldp080mtnb6km6ffqgw9vicobrdspebqs1av2p9n69kvuydf3r9ddgpphlus59sle4eo2t1yjgjiq4f2q7cwgcjr4qj0oad5hwxeg9w1fkbvg2bat1qf859e1bora2i7yjc7mpgk33y1h6imcbxmiq4q0887fpmx7a7ajd5rwwqth3i2qbi1gmduotw95cnr6d8uj62aqfwy6e3sc48x4z6aw',
                image: '95o0bnrr0jne40pl9az35evn2g82gb0j81mzgwlai6u1sgpvr11fjn0kmwc6vka3d3oyyduchz5l2aw4lfsy7u02b39yhtricpffmjp3fq3pp9pjcoch13bfsgj3fbtb15qhvvo1uzwraz1xhp48o9sjdkfzx71ivv1fqcx37ka2tzzvai8sntt85yu1q5kzr87jnsiwpw91fc1oi4ezfdd0hkic5tq973kxh8cpwmw5gjvqaujevwxc2ayzu4x',
                iso6392: 'zg',
                iso6393: 'rk2',
                ietf: 'xfg52',
                sort: 254711,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '86d2d929-7ca5-4849-b278-f17a0aca744e'));
    });

    it(`/REST:DELETE admin/lang/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE admin/lang/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/admin/lang/86d2d929-7ca5-4849-b278-f17a0aca744e')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL adminCreateLang - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateLangInput!)
                    {
                        adminCreateLang (payload:$payload)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
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

    it(`/GraphQL adminCreateLang`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateLangInput!)
                    {
                        adminCreateLang (payload:$payload)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '8d94d52f-f228-49e6-9cd9-bd5ce4c483f9',
                        name: 'tv56c5a0b5msgefk0xszsvuzcbikjw7dilpz2ijo7re5ajc5nw7spr4uu166bshy1a96hldtfdhbp2bvu01a9cybjmczqdo6bza1jxoscnqtlrnbratejol8afrfyavpxehozq06ckgwc0p2c07et2tzgmex8621bf6gttgry80kd2arippotr6dzpq0kkh4rlny4wnabe4sexqdcdn23zfve1isdjlxszsnd0j0pbmyty3wlr8mcucf6zs9n2q',
                        image: 'lz005hetiw0raxs1f9snwzsvmxqghcr8is0q61tjsbij0ek2y828yze52pe79panec0x4ddeg8em86c1fw1gmpx59m0cu4gc2yawowc8uy0joetfjjazuc4bhu1kfhomhl3j5df2pc09so2yzwe1h7n4vd9q3tu26jbg825mizmrgn0j26s4ge2qith0bo7pz91vtfjxwkh23vd9r8ab1scvm7pmaosi6rfvmq6g8r77o1bfozplenq44mz9c5a',
                        iso6392: 'o9',
                        iso6393: '0b8',
                        ietf: 'sy2ce',
                        sort: 679181,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateLang).toHaveProperty('id', '8d94d52f-f228-49e6-9cd9-bd5ce4c483f9');
            });
    });

    it(`/GraphQL adminPaginateLangs`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        adminPaginateLangs (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateLangs.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateLangs.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateLangs.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL adminFindLang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindLang (query:$query)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
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

    it(`/GraphQL adminFindLang`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminFindLang (query:$query)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
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
                            value   : '86d2d929-7ca5-4849-b278-f17a0aca744e'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLang.id).toStrictEqual('86d2d929-7ca5-4849-b278-f17a0aca744e');
            });
    });

    it(`/GraphQL adminFindLangById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindLangById (id:$id)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
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

    it(`/GraphQL adminFindLangById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindLangById (id:$id)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '86d2d929-7ca5-4849-b278-f17a0aca744e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindLangById.id).toStrictEqual('86d2d929-7ca5-4849-b278-f17a0aca744e');
            });
    });

    it(`/GraphQL adminGetLangs`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        adminGetLangs (query:$query)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
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
                for (const [index, value] of res.body.data.adminGetLangs.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL adminUpdateLang - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateLangInput!)
                    {
                        adminUpdateLang (payload:$payload)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '518c36a3-6735-4242-9c13-56b3b926b395',
                        name: 'tc886wjwbgw3kb08kwvw6mjw2yxeqx4k0kr32g8u2lw090myk79qoyr36ea9nuulb1yotfsujx2gcicr661mnrmww3g6nkf364909nc5vloc897itnjr49lv87l6xnjpgoo54pii02cv5n3yrk70ipi7qmkad14w8z8lq7954hhlyyjqtlr3lxccpjdusoumvnw0df9pfbjwys567o3evcyj3phnw8bpnfmqk6k2bmajy28rwc88sbulh5y2ibg',
                        image: 'u8zsoxpy071d8lvp3c5849h87thtseo9u6jy5usv2wyqnp8k5j7epgrplk3z3c6orgjh1782nb4poyxmo7pufxf4m3drnzphh9ro7nv72j7um30ibaxv62b83n9am2k0ok15m22a0b7148mnfk0x4ddnuzhqefs00y3fut2fbtlzdq712qsukqjpxj0qpmrfqkm3xufkkqh9rkdobzg3ckvczlm8ufo4y053obhykoa5tvgsocmpddvfj88mhzu',
                        iso6392: '36',
                        iso6393: '4k6',
                        ietf: '3gc31',
                        sort: 126165,
                        isActive: true,
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

    it(`/GraphQL adminUpdateLang`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateLangInput!)
                    {
                        adminUpdateLang (payload:$payload)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '86d2d929-7ca5-4849-b278-f17a0aca744e',
                        name: 'iip73oedmepbdzzuyeom0r1bpqhtl0t4lc9eg3yq9mqy8l8ip7tkc8vfsq72kt36ikwkkien7dj4co3tms6je0qkfsl35nn3p4jjygd6w9r0f3hidyrrr3hp8qw3388uhl8dk37yktl05lghm610jvy6il87jwhcvw6n5o7sni7c76l1ckshnpjy6psmk97v0pruihlxratxdwlekqhlrfnzzdgcqlzizes1fa4mx61offrk9cq4ckkywa8rjfs',
                        image: 's0nl33xs5ty95qm4sq775e7o47f5zyhbxrdzyu05kr1iveuy3s7bxv9rmgk8roauj1yulx0l8mbyb8gzsu27lvcmqhhurzkioyl2twj3197my22mppjy71tc2dif31fb4p88cerxeucqjia1v8b9dyfhimo0lf5untiij7jar28lch7ydcaxe93nzhuwpjmn2xx8vqzx53b9zdz4ivdfytsc33wonoo9w85yzcgny4xwt11il31wizzm1r7rkck',
                        iso6392: '7m',
                        iso6393: 'rzq',
                        ietf: 'l9xob',
                        sort: 724984,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateLang.id).toStrictEqual('86d2d929-7ca5-4849-b278-f17a0aca744e');
            });
    });

    it(`/GraphQL adminDeleteLangById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteLangById (id:$id)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
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

    it(`/GraphQL adminDeleteLangById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteLangById (id:$id)
                        {   
                            id
                            name
                            image
                            iso6392
                            iso6393
                            ietf
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '86d2d929-7ca5-4849-b278-f17a0aca744e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteLangById.id).toStrictEqual('86d2d929-7ca5-4849-b278-f17a0aca744e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});