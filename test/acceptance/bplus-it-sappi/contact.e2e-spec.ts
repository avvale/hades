import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IContactRepository } from '@hades/bplus-it-sappi/contact/domain/contact.repository';
import { MockContactRepository } from '@hades/bplus-it-sappi/contact/infrastructure/mock/mock-contact.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
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

    test(`/REST:POST bplus-it-sappi/contact - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: '6nq2h2ad0mqsx8gbddmt33s5gkjwh5ioa9e2d4jkczp6k90lgk',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'kpatsb0l2a9m3kccr3mv',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: '1h0t4m64rxaoxmpemgfqf3apglnwxs6jv7duifiqdnl2tvbqti6jcn2afgjgmzs7j97v3dbiyx7e981tsz5xq0hmwkveje3hh4odun8925q5ao70qmswvsi2fw43152ccoloimkld5ncngt1p49dbba1wr4nz6plzmiaqhr7hbf32z1k7fpmj0gzpt0dcm309zcwc5xeiwwckax2ikwmmlfrp0nomps52f6jqu24eh886di0ihcntr0gt771b3c',
                name: 'pp0h2xih8zvrozavvyr57tgbsxryt1i8lt4ugijz8aednxkx47y5zdle7zt5as52gbgfxxefp29c6jqv9kgi5u7f61xzbxkopk67o0byfsi09osw9lb2611gzgt76rn4w7p37zgvkiv0q4zurgj7yap1dixadf0dk8j9uqbh62kk7ns3yrhh2o6mylwftu4hm5rzy8m7r6hp10k0rf4v61c0nnvvus4k9999cyr6bztz01v7t6cgszs4d1fcgaf',
                surname: '83aesvqg2dgmrwq1um23sy5ij2uhj1vcqwjvm37xs5se81xe5ywe9pgquz8gyhznh4e2rmf8pi9b62u70wzofxbm0l188sz463s6a760c53ylgcyreen5rohi0iybaegxqarc9s6jyxra3j9cmx2dl6lg48tw2nw3ma3zg0i42pxj73f2pe570jexel31wu6an4xtvivjaet2fhcayzys91grzfheruxhen32upvl3fkn05981n56p6ga1j5ynn',
                email: 'ffs6othcqp4f4m22on14a32w23qft5qe6570thteaxi3u2y6ycbp6xstovrplqyvnj0ac3a08jqzrx5dcrgpsqrxehm8u12jtwyqbnnqrqcori0vcv1qa82y',
                mobile: '6qrt7wv3pexn2d38t42mjshkcrkm4s10fuozuvdqpfblod71yfeg0ikqom73',
                area: 'qe63kxslvbqzw835hhh4wzxgb8y2ii6rdd7ltwfoejlcj6lwz64de6xk8bk6lv1m0i832li9mj0gmfi62fgm2tqojxc2ibq6t1cua5mxjs2n7uadpl2ds63jn9o38prrfqiqdwug2326g58tvw05v0c8kn7k7rqvbov1c9lu8vupbmnsji23f47k8v4j8vix7e2gkfki2zqpf20sh62w6x2u15ok4erq4adomnozeq2nrx1fct43cpce2tulu6c',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: '3y6r97gaeknh1fq8jo8gfpg06vk3i3ql3exh0chqqxqjwgvntf',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'm06nggfbvtrv646ydi4x',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'g2i48qtihfvxs88ztaje7x0i0qclwcidcx69c9lwdu04hxm1qvi7j6bs5n05txsi1z0v6hqei0dqk17vz6qf11hd7dowginw8zoiw7fmp0m8n84yxt7yohzsssh47pwr9dbdpc7r0tmz7k4eqsgix8qc3jz7nmxc69i97laynei7j240f19rhjq8wu9dps14zfxqyhlxw29sbnqt9x6p9fgk2sc5um2yy8s2s86x2kmxsq93x1czwphu06a96vr',
                name: 'oxkczg0tf04yy3h57mb444cx4h4w67g6bh8rup2j1gjkv28ahtn82ahvl0z45akymapf4yyhe2lroqsuhlono9lmz8g6yr2i3prv6m9uhutr3j7xd24yr29p15xm188a91gieem0iict8uwnxjp6jp3sqeek7y89bshd7c4varfuhyxj0gn2v6rzdk36xze8yd9jhh8dcum2a9sjkf1l70jpz872wkp06rf07klqmi49v7ucot0xwfigkf675bx',
                surname: 'nvb0t6ifezjosj9isoitmvo7pbq05h5azcoj66z5sfbposz8vobym885tfhayfdp7ksnxvfbope158ydxd6qysj1v3ixq2cxccoduxu3ivj2a3je86ozmpy5ywst7qzsuehcj3vgivwxhxj5v7zm6slq4h1jo1jfxguu6ib7fs4i7cz3y8avjy92c1nk8zphybpsq27x5rr5rj1v9q29bnx4c29r19gx4bpdvnt2m8m4heos5ffooyvh2v4ty1g',
                email: '8p2qa1k8qpu23u4jherbfk7ul080jlsc0zi0pkggkfi24wpy9ami9g2me3ml7x7d2efepn1rtcsfwbg704a2ddw9v35fhgzq05792585viuvc3maf6moonrc',
                mobile: 'e42wmj2arla3dpxat6v0bl114w6ixx9bwgm7sm6ailz8cm4yfgusb3oxchor',
                area: 'olw2snnnvy4moeyaebe4aia3fo8r559mfgvann9ov5jntnatmylke7mtqsz1q87eakzrv1rmm14i09i1xihqdxwpauxsxlqup0vrhmid1kr7yx5o77xjhuaid7cuf4tdg5j9fc4exnf6qnaskhcmd15l8uzo2a4t6ncn9h1cjn9d7g1n4ce91yt8wle05x7ekx473hcmtt6p3gpzciypqce0ahe7gn9621kcrglf77fkbz5pgcn7mdkydinesxl',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: null,
                tenantCode: '6q95ze1dojbchdj9frtss3y1z6bodmdigrycq1xxqftecokp7t',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'lojw6f2byc6e56emsjzy',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'cyh6j00k0p9ao1uqlmhzttee7gpip8vbc7rbxbl92u8fkrbz2lwzb51q091e7pn2ngn1naxjtnk2sgoylrfa3rhoo3m3vgbwbouskm72onurnjg9g7swgv9uia1qlt4o0h99o6d3h3l6jupqpb6go5x74etfq9r9uafgg6eb86gpf74es1uwb7u1ntak2bkt3j3qr56owe79b6idd56rphxp9s1lo1awms9aspjdb0qqic8gh55sqxwr1yu84x0',
                name: 'ya2j7aub8azujftubtdf28cspolvuz3fa78ozsbut0s57q3rpp3pz8f3zk9p37bqcffdthkpzycczs0xdsuwvidf26b4ugcdj0wrebng7hobbw9tum53zv78ribze5z7dm3avzckjzmmoxr5ctrsvdbkc9lcdk0y2yihje3a9m64r2z1ni5dhjyjw21x92vehqi6atnn6bg3su7ljgyzagtyni8en7phhjykj7125f06gjesvac3wub53qwrjfx',
                surname: 'sh6m4xi1mz2pa6t7sch84vfffvdue5pezsmc1ob9451pykkszdmspybsygqh2uuiyq6gy8bowna1hltmhoa1kz09ega18arkxup09swzoo7ha679710a162jfpytirga01qahwonjp70yvy9ahcs4uiihlw9ooayzjm0lbcoci1sdq14vbclckuev2f6ix0rz60spyevxqcn06f4pad0ac3961t88ydl1s62feo6xtpc2ftjd23cctierq8tteo',
                email: 'rvwkj3nc2j7j5xy6akn6sy0qjhpt1dk65kww7icd7niubfpoax0cgh0hzy8g9xbspim5jcihrrvf9i1dcytjh1q80lyzfu31u3l6mm3sykjphwuiuhqshy5r',
                mobile: 'o2u010bhzoapflko36nq0dnqn9z52d4evng2qejqeqevk0ij4s9r314x93bl',
                area: 'tp3oumykks0sjbbty624ax1izd452jt8ef8uq13364z08cb47p15ndtilnmrv8s89cnnh7t6uogrkxrfgsrl9u2c5tzxuex1slcp5j91f0rj1fuu6sghgp0povxfmrxmukusy668cqqnyxqgdglcyxi1p3o2g536zno21sdvnu5ergbydla244mmjjyf4dblwsx19bv30ptntlm104oe1t6xsz1naao9ivqdu748v041m2w6nvolzzxn3506wl7',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                
                tenantCode: '3xpu4symw5yc8bjr1oes0fl61p3k1pwjbwsqov1fdu0zgvqhml',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'kffsfu2l1e4rkjswarzl',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'vat704i3jffg59piggjitd7alvpm8kf74fbsoydhn4iqf8yde86cwk6ko3fi6n8rnrxt8prhioa27o035ajd2fqs9o493lkmq1vop24h2ceoqd8o5pmndkgjipivy1ke14dxh12jlztzspl661tyhq7urcbk2t45ay8grclipdtts0d7kuojb5xgg36bqbx7mls2xdffaqq5v9uom28frjz4733apf7swyfbs4rxxfcp4gicpta4mv3xzwmzdbq',
                name: 'iro93blab8h8xbfa51bbpp45p44l5nj4n9nqo8jff2tegfwna951i5yhudjbyh9v2korsyhgasd062ytgqh7nyuv8ekyehg6r1tfay7ayrf5tuag2729vu5jlqpr9nnibcen9numxycr43zfkiygciwr1sseism26w0nhr4kv4gg7s4f6bzz5f2g2ts9rsg49aqtm2lozj6zvm9r6sv5o43s98jnbs98jk0rw8jb8vztjbtyjuus1s6111ytmia',
                surname: 'v5r8ykm4ko5lturjprrwjda4d0cyd6c5kutnvhk63k94qplv5p572cmwgy5ohtpw4e5n06u2ox0th4o3mj98z813m54183t5paukcrc4pn929w0zxju8t8w5ra4yj2h1tkba45w1aoxaq1wq0gyswzps7bnpg5974tz9r5qhwxwnnt9tzwil7rh22av8czm1lkcinmg5qx7zdc5fvqvd4hcahwnwif7tkp6aus5qmp3l8vj7zw0fa3822o04oni',
                email: '2151u9s3hgztoo2oiy7j3q3r8fbt3ha3lhydg7a8lmg29ngpfb92mu12iwgyhrze2zzcjli9bg8f8autzpzd2nzdo4428rlntrxoy17qywci28tqsao4rblt',
                mobile: 'cpjymrh8dbc2usihd4scjsx46dvefnxwwqnfki68ndic2w6t53p4j3u6as80',
                area: 'qzogmmp1fe1yl9osecxyrnv0tdtn935ms2whqfkn5t8u17nm9ae5npsv1n7ll9ruz7rklrjk3bao62m1uodrl85ml1la12l5lwkwdin1ozaarwzux5ivfc3rdx52441pmeuffx17bqv2qrm9j4fgau52oyz8zjikojzt7sgelnb9902qxusdim0lww87gnnrjkw7xs64yz3di51990od9anv0qqljh3lo18cw98jpbukqnj1w8wns98jk666nvb',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: null,
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'c6l3pbusushofqs7yauh',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'vlpf7l6ydxr4vszad19j1mb59sjryl12xjb24siwp5l0wwv973n01o0wbyx7vn09baz5n712qp2qzmrfqxgpq8a6jxuqaydbpx057xb2fhwyak8ip99h141iqqeabtksorlwtw51cq2fcrkfz7k2e3ehbghcm4vmd1mm9wiwg7gnpyoiwkdb6l6jcl79fal5i1wu0sj7672fuwczlblhahqtbovwx18mrxwavbcxstq0bxzvc9poxk8la9eatub',
                name: 'dvqor5tlcq0ea0ujz9i1b5l8pohc2ol3yiy7uiiym07qn1dly3qbpmuzrga0s0u212hbw18wsrid99jzhqux4m4aqwj9clirzry5tvqtg0pido3g1ht0zh6dwgvwixr25pkq5ka7v18t055rzqe8jhssdtbua29sflh31eqw4qh0uvugj6434u0migyvg0aevd68dacjqld5c0bla0iunhwtuffir67k9mrn4l3osnojz0a90a6xn496rdj455u',
                surname: '99ly0pvq0pcc42dq4vl82d99mrmawqv96ulk8mu1o35vo8hl490gvf05f4xbx8zcy0m6h41u3cbxgoum1jt7zp9v8oqd4i5816w3sq6vyf8oqh74j7c2aum4a91a5thfj2qcbd5axswmr3dyxnhmmbbmbl43n72bvo285k5zjvdhonbzz5xiel4rhh93br8rhashx9u7je08xz7c5v5d9msuthg28bmd4a6hrcl4rwxb6g1qdftw96lc3truqma',
                email: 'va77gnizu67ner0f2i9eh2z2c9h9dgak4780gzd3febp3vk7y7fztzh3u3d59h1zccnrpzk957z5jc4e4mtcz34ujzjoy56d31neetg945e9l5onc2iy5snz',
                mobile: 'n7uko0ndz7rlqfzzhxlzvg8f4dfj63b42082rs7fmg9zzm46lsp406wyn5y9',
                area: 'on8vcf9luvia9epye4qvuqiyqnukm2hzam29z0p9zef3ywtb8hev3xia05m14tvg8ejqx8xc2sqehn2sjv14ifk5s714frsosyi3bwpkjlqkjn2in3d9wwwvbws77yoo6b8xsthkzuoi3qsv54ia3zffzchpfxgeegzv8uj0wijfgpbw0yq5be1qsay701o8x2g9e412qft5dlvwwnitrkb4giqoxzjda7oa2b3b4ucovhhib9fbq2lf59bxt95',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'h31fthz1i9jqoxm3zehb',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'y091z2jbcal5jstu8mua90pfz95fodllglceowwzm7sd8r5o5kkddcvoto9511u3ilz47jdtik4o9rwwhu6c6wb6tm4stb0g02cwsbkq5bi841m5tqdmwua6olns8ines25xg04h0h4lp2cfuhp4v2gstzbuxuqk81l94ltno8n0ok7zw0178fn705j1mh9nhgojujlr1vun0eyeymsvw04jippipwfkmu1vpoasck0ci8554xppf0q2ros5xef',
                name: 'mmrof3qay69voefv3l8kbdcplhzondr3itiz7xdc2j2fq1tgnps8f0gh9ps7077g9vwq78khq5duimeyvp8ok0rd52lpim7st7v2jkbt3em437j8oi1tceyy2qega2roetae1kzpopmzrmojjucyjyuex35ngljgj4sabyofeqz7dcw8heup4hv009vfci05ezq6qfo5pataa0rb356orrgcldqzxkcdmlna2re9aq1ayu55hhhyqvqdu27unhy',
                surname: 'pvf1yaqz05q1t4x72zyq9di3mhinylpdl3ofrs56mag17qarsjxv0qjtm2bofbb491p5rzswj5e9e59a8kmk8ibp1fzaxtk8ybfvuddgf6fa8segn249e77q5r9r77im9kr07xrvhzjvvarn81cafkj79zt45z69z4ggu33ep6az9bpnf5r5zx1jdjjgko89pwj7lh1gpmzsejchgw4hkg6rvvx2evt6edfm2wn6mjga5hx938p32nclzazygj2',
                email: 'bg0k8g4qp0yfytvrar16efkzsynwvrwwgtylo0c3m0kq7ojkmmmlguek08s4abfkxdkyuuox3i6elyghwr1zxukogj7cdfx6x89kbvafqgezs4yi24ebrjf6',
                mobile: 'z9i1gkpb4ite9yhlaj9gk1ja3cglad5ijmxg164bcdhevai3o4g760c4zxxf',
                area: '1v0l25iuct1ef2gfcrnce62qo9fu8nqxe6sbwy4lv2y3oyqomqze2ll1vxxngoj7k31rfqar53cxrsmexfh3nzlg5vq84y9ihbonvxel88wj9kpv408h6u50zyra82qc10ejtv22abpt400tsbfec4ywapccx1r77jcq4ccxiisljlnpe7w2sgp5u2ed5c4dcwp4vou767tp5fqq4k6bzxwn8tn1a4b7h3vmh43hei7p6bkzt049t84apx720tl',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'icqtx7sick8o6o4j08xxfeyghhp8u1kqfuqpv0emyoqjmnwasy',
                systemId: null,
                systemName: 'a27lm6w3yoiimp7ayl38',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'b0c89irbqkpjcs5eh3ns4y9qqj5w5f1vtkezdw4x3nr7x5hrsucwnldbvpmd4kwkmlq17ajxufkplukrjnangkifmgdidjbkznlqvhawayzlhc5ms7rbgxl0s4kwa9r7kbgfe12a117crqbsu9hyg7whl3adjz6gxyopxhpri178b6mi98pxf0w3fl3wot88nlraqjgp41ghb35lrj3f8kiesl7cfayyw3y0rpivzct5x3x1isoby5vofr7cie0',
                name: '8cab9f7az6qmw56h6zgc5u615poml9pamrer6axw323k6q0bs8mik3c3a212epw90lybymh49re0rerb9i7s9h5kx0mnm0j5gtgy47mp556wacxg2n6qdj30b84gghcl0hnjheaz3kcqaxnunt404gu06bok5grtste7l1wj2611odf6bsqv1srco6eqazy0ex2973awejwdhtafnqph5yzf00rztzh9ex6gqg5es9q3yueefcxoe1so5dy62i7',
                surname: 'tk50z9c8o4la060kv2t39tucn07ncalpq4uxyi8qemkndwkkfdqjyt047lyutncevbpp9lu49rxw1xff02wieyo7lbo9qia8g7zupvz1vhgdvgufg75zp3jrtmo11ygndtrhbupmi348wbqnauw58qlcjqeb5qzl3svo7yd0zu0xzb0ni1j5rxc7tvvrhicmwwjpukrlu6rb01xf8rgwh5c5huazdrymlg6rmpvbgvujtuppk70ymo0o53rm6wb',
                email: 'x17oq0v8krr38bw6bc31tct0n6qg6ksptatwck0382jqbln0n8as47xk37bc0pad9s3lcs7ah4b8eeqzj3dcf2su5134y7ou9cups4csbv5ugfx7qh2grg0b',
                mobile: 'moqo8e7y33oecorz5yfta5b3da9o295fc2bl01zrmuek68rbhs62pqff7fu8',
                area: 'w73ran0by9hgm9ifmzlcoqi39v0wnjut8sqsx3tolu8fvgw439vuj4xd5z3kajcybbq4od8sinkkn0ojl1uiyh756bcjljw6n47040brhush72mxhwh2hetukhxf02eftwk2nc4afdd7bmn5pnj4trtfa6bfpnguh0ewlclzi8cfsb9p48lvknusxi01sqe9wwzo8arpgxon90djx1d39oer1pdj4kzjtmtnwju25wpqs3gn127c41qsje1phnt',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: '5vuztrngmzfudqtrl8m09bqcf2l2eba9odr994m7vq8zl5ji8e',
                
                systemName: 'hqclho23aum8su697ycr',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: '7gvvuq4ut7q2m2azns6tgf066gz3oghoc8hyeiyvvqnutbf7xjbx2ltiex6y56fhngc0cjfcs77j3ui5r68wngyz3hgs3v73o7pvr6x98dhahgcoejenb80jr7qgrpam2gfxurlukszd7j0mk75h827elp3qpdgroa6olhe5zbnel5r2pidn4kt4ei46fgt71ogy3lruj5oydmmukuqe945qm6wqtdultog7nmdi3u5ymlbqgesee1jr4x28tx8',
                name: '4ell2q3a351rs18v3yuafsjk57gzdgn1y9kxul4rwzg6i5qu8r9zibr6qlntptexh6go4o7t0redqmolasbkyfqmkf5xggxs6v4r5gmjpysrvi348rkxl2ay6eo9mcewjunt6ly23thncqeu0wnlbjxilc96zvqdym3i0vhppmnbz5o2n5eynpaodcz3e3pr8ymyeknekiittk4vne22ab71uvrlrdz1yxcx62ife0zy9ssxugpwmq7f16w85s4',
                surname: 't2lbybit5dpim7n97y54i0omyrz3t5d568m293o7k5gnw20rwrrgrhgucef9oo3oqhuhhgno7nn1nmq74w59ku0av8t86e9kb4eklzkf9eaagu2gsqvav1sr80eguy2ln6vtdli2w71fe0ekwqm166vt5wqyczvo34stij218yddfru2ouophrazzag8v0lri6hksb3t3b79j28zcywashuuuo4ohd5f4ucv6ln3f54xd94k0c4sbcruffeofg6',
                email: 'u01j7m28acm5uptj5ou9ij4fzj4hmpuqyre2ipygbc32tvgy6k2deptrh7zruj6tnggs6rfiy4prjkpo7obur32io5o4a05hn8j79854cdv4pb74evqmprha',
                mobile: 'txkbusrhifak9qzj0ok4q00gzzgj1faad3ow01utwc0nyr7tbnn53d15dec4',
                area: '0jrbvj8puukq3dktqcwo7p9bgfq501mr0wkw1u9dafogkyntacv3z6wrkn1b9qr43clpoklboyprhu6x8ix8tuqhxvw32nqjouj7tkoeo1ipozqkbf4puq9nvdlyd7of9968uv6wnyte7btvys10svt0jb1gy9ls5rsnn60k1lkqm48nmsontywhg5pnwj6bgn0qzqeo0g87pkes625fddzir1hk97np6uavxib7p9fe169gosfho57v7alxczf',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'twrye62ry7a8mz1kqu5yx75ms273a2r3xzfcfb4bb5ua3hfwzx',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: null,
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'qjgdw6e9c2tikutypd9a2op86cotem6u7hu5jnu82hkahbdo9ahcyb4ybhcpv1nesa13fskx0o25jo4mxy9gxm99zhx2915cfej3s4h4lipjq2lym0tbfaeqecgavxqxnjmj9uhdyx90dph31xoadqg98gxlpnmblrokuojpjlkxhn6hrpil1gd4js1a7ihcr1xc58wpdxa9ttl0lfpypdac9tubztjxob2bw797ksheechms0x97c16h3fkh54',
                name: '8t7w2zt07tnbwr2z352hae1byu0xglxgoind9k2xx8qoacrbxj3jvpabd3p6q12h61cyqgsjshpb5qq3x5wfrj6cq9v3j1dsg4ijts6rnye53dix4ecp2i1phbnjgaqy0izkwv535yf2p40z1t8xtowi7hnlal2x0lncemsdl3ir87poaksktuk8x57jk5vb5utww2y43c7y2j59on17hgroadbvx7969p81xffbh1z6v81832rinmk6ytq90oi',
                surname: '8a0szbz5tjv0ekib40qzg0punvd1iv0fa2dcqrswh4u675jppabspv89iymgzuaxbxsfpbv69j7umorbgdggnzf2qtq1tkjcy18bw9d4yyfui5cmoewrgywhc6wzog2ak7dh1cfu6w5prjlsfqr61m6riizlmh3m5l2gg9pjtpxxw5p5rkx5dmgjybxz5a802nn5b2urm7o4st1blfzotpbcz1qva6tnu8uutxsftx4aj18plqdajpaocm1o5av',
                email: 'oc47tomui8pixceqmbjq2w5jsmdoz23gsufc4eu0r87jj74vhbf0wlbks3cdvyerzxuatlvbdr3w5z0w0of1w50nwj9ijl7pszd4iczxril4olp2ikyv3s2m',
                mobile: '1nhlmndszgp9eib1ai3tnl3ijdaacnr8xojoi8d49m37pxs0vjv2yy1pt3ql',
                area: '8ofgsz9hd7ckvgxccvdzyav1yl44m1dxvzrdg0rwbrlkgx2o7191wokkofqdi9wgzrriktwc4io5lc9i5cbm719loltn0xedxdlsch7msntglrpie91zyv39zvc2ijlydo1dzfa5gu64qpbqn4cp72zk3ef92rq4sfbug0f9o1wh83cmfkvatttg1660sjrbpajproypedhyf0l25qq2jfmzxhphik0uuzs0eh18q8c2j2ncuflg6635hqawj0x',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'wzvhirfa72gueitfw5miez8kjaqj2vz8l2mr7gvsy4k94h5jo0',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'xm55lb8vw9ijwdlu5q13870kc5bpnyudm1o737ef77z8vtk69262sgaf02kj6qr84nnh7cpvl8noh84nguknlxpa9skpoo2pqaypswt3n1htomgzylfdnvyscjcsh83pioir9gqfdbyeei7z9wd26c2x8vsy79c2qjhe3ujj0jh5gas15jgyzzq7sgwlbgur3rz12p48yvu5ys5br8u5hdtgqkezzixibw57muojgld3l7b4vbm1wypkzuvs5ul',
                name: 'at3vzje83b60hx6c8g2plpxdohp4c210iw77pnfl1v65hy1nsfhre0vwszax7gl9u7dkkjxq8w4aqu8gb0z54gwwvfkstupj88iv4earl5z8d9bkg904kvh0whqnk1cko0brou0axbktmgl32r2i0tmxqhpz80y4s1bi789fqgnpgdy9sj3wmw3bbaowsw6bbydnwpatrg9mc5m150s3ostfae26pjbux26g61d623tukbhzxa3uvc7djsazbqq',
                surname: '2k6z3hg4it8w5mwcemjihrizd1927v99m3y9o4nw7kt910978sishydtnqs8qdzrx28q2plqziouykv0ozp1omtum2zqj4zcsqbcztvtnlvh2u4mztbz7e9i3xbsqkjz14tlkrcmn2qerycje43z9kij4u7whzb96t359fu1qpxtpdwqxi7ptpkjxa9p0y8zvowgcx8ow86u7ztadmyqdq03j1p26kpn1w5vqqd39jvly6v7mj0qdhpabmiv5lx',
                email: '1dwbkcnj24gcbgcn0pgcjxdu8506q0xd49j8s6cr1d34e5fkzn6d1j6b6wdcw1ov8daryp0pshp1eljt262j7idbvaysrypr7ycm9lhjp16zyiot0x9uupu5',
                mobile: '1c73n9qmsnaacez2pistckfdclha9ixa0gi8olu9l5da0b5eqmgy96pg67am',
                area: 'ge1iiz3mn4wu70devpm1y8j946xbsz00xm7hz8qgb2n03byl6yxs4zf8gdmprnl9qylh69fq0p4o301w5peumd3bk4im7gnccj1g7ycwnw0qcy8y8nqkf4yi0dh6ys2z8cw6w41g9mrj3xalwff7gzlwjfrlb1x5qihiiy0icaxbjiv6gjkrqib4g916p83hjer9st18wj1q0ksbvb062nh1ox2j3s49iw88kne8emu9h1ri0hqwidhgy23n416',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'haov68un3377dr29zyj07n328n1foyleqprhbs8653omm5t9kv',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'qw4jlzo1vvm4drsbh73v',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: '070kzlo62wh9vk06ldnrk0y1x04yjm0p0wbffi5z96y3d8qid4gt0f8f8nx4ahhbd7rj8xr4twps17pzn9rs6z7u78got3gq61ygqkryo46mknvch9487lzhspdzmq1nmzzf40azz1fszwor7kunvowwn2uuwyj2t2hjl45kdfwww3fpm1jjdjzlempzmq58m6dejvb4iwih7xbn39q0su6aivlk4rca5gpntkhjciedpnay4cxkpekkhowxlj1',
                name: null,
                surname: 'in89bkcee12aaiy2hcmtaz474iff7p5g09xoltim1reb27s9volwvuv7zzu28v7hho9hl96qt4tqgi2bdli9iifqtvpr18glhufzohkfhjcz51bd1g1k6apddxlze1fqmaewlekgfsxr1e81rkjtg0um1t239xsecq17sgkt58cfzixv2hcmzcienr0k7x7cfyafy1mrf30lshyemmyffr8ru6hy0vbbd5zzb6kovr4carq0uv3mziqrhp75ejz',
                email: 'mqypa91un9ga5qalhkgayribwph0kdhzenkl1yffaqjjr2b4q6mtim63smuxsz1h5wdoe7c5juw3nlly48blaseos3869rhiyfahghv1opx9g58ugh2sc5c9',
                mobile: '3ryi6hebk3oa19h0w88ucitf6f50qlzgke7batma95n59u33cqz6czvmude5',
                area: 'o4kslcqrnvdc47fteek509fl7svis0dogteepz9hofb1fixokdnvmlqwzrrnahmw8hd6u5y91dzb0mwkpm8f2p4rvy5uingjx3cq5kw04tzugkomw3y8joxhagp4z2o9k43ki0obo54ytcr7abunwjqpdt4wj9ei4djp8243btpsmwxaejxtmgeibl5nyf0s4b6sk5xyzjpmntqkl3pwvvxgs4jc0x478po9skcqnlup19mee1956s11kzj30v9',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'h2be9g63f7iqvgtve8p4fxel8xbd3v2ubfohwuqx28hvizt96b',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: '4e7p2js608gghz5b32xu',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'hzw1pgi4u5fc7hql2wfxxku4i75w1ehadu1h1w53v2zkorexdk0xnz80snvtsjp2tu3v73rxxo27a97854a5bov5tixrr6flqr2ab0vgxrkhmj9212kms3aqztr13n3otmi72fd7yju56ryom0ta6cjtixl94jgw5ndddde4f8b7uov24d7ssr05wzlgtd4q1awaex830dged8p5ujek01abhbph1uyqogjl4hcy4vprv2jvb0l0n4enavr0zg9',
                
                surname: 'rwkzqc2lc92oq38ognlbpeedelilxqskbsyhtcumi2rv9ji1m6oxwv34qqg2duxtbyfrrars4181t7s7sn9dy62tbnzips42kmnjwu4vn3j1se8wrsmr1zpbmlmayyrjxpu0wum6w0706le6sbroq1wyczsigs1495akglf1mdqf47y8h2ntt5t0uwg2x6qdqhzzfjbdrm9cl4fdhauc6f33u88cn6oxx0id3bl08fv6nu8kjkrq5s3b5agcrde',
                email: '4djn98q2ns9v4vaengyjzbrxgarfdfy6398m2jix2yqtvs3g3vkl9em4yzh9ogtgyd0h1sko1jwcpvt20n3b1a2tczyv4tne00he2voglkfygdfl5np5kub6',
                mobile: 'erg2l71nhyah66xgwkpa8c1nmqx34937ohz1uhxln39dkigxxk3o5xkylzb5',
                area: 'vjwrke0a7yliy0yj0rgkjtbhcsk6cz0wcokfo7gbfjlf1r5wtflk9vyr485xkugolgrlc9zpowndjtfmfk88pflizhg0o1fxwtiqwdhemmkbytrxg6fwwnq2kusla7eujxx2yne0pfzjq0q94wb7o3q59ra7mcvl1jblp59vct9ws1tehgimbky5z6c359a5o69kqm6gw1yz094nz75qgo1a6bfilfpydxb65ihufqm6el09hdfblyayqq72ljj',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: '6jlx1yy974sqbirici6hmziy4gowo9cj27htna81iy7p6ep9n1',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'dtr56vxfqt1fy21f0gp3',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: '3gomy9btm0hdkxrw50v11d58hla5uxuzqbh07kzcsek7uj6anv99v5vj8u89o1zknt9rl9smg8u9uolfwu431nbyyqgpdfng8ytvd7dk7y419mdv0c3b8mlt4lbx6gafprru8cmyqspc0del0hpm6f2olje6hqsu005mfcf1geod5309f9ccs13vptyzf7qjg99aoyk0cgoyyrosfqyeloa6ubr4dkcgxf8vc2paafkxxfirybatf10vrao1jm8',
                name: 'znpuf9jlprxmydd734xv6jzh7efxa5qr70f14fzrin2z0e94hwm1pfkxwl1gpkk70909hn9ypdr5p4ts7p9leweqpwvuj0mjod17cvcvn6muojxns8krrvx1xu9a1ounvkoe1e2lcyqq1x8q1r46fcg1484vz9045t92ocf8mvdabv15bkas4xmgojh7zahrzff854w6w1lb5lbiethmza7nbuxvtzufghcgeuc4w1tpvc39k0p0muxjz3a7avc',
                surname: 'ns59s88pgljshyhl795drk72t7ewbtkt9qvi695dozh9r5l1t0rxai42h8l1tazg1fr81a0epks38q3k6k3g3b5w260hkv9ax6w0vz2mmvob66d4043cisdqs3xuijv4j4dpxzsg11iur4mgfzx2iarpggnikr4k1bh4qbr7y03yz4vt6r5l661xr84g8vvv7g71uwrvxyq3sp9w6n4hjdwl6mjjy2g0igqx4rctgsvjbti73rgopmvgzjqvv82',
                email: null,
                mobile: 'xe2lhu32oft5hwa5gzsy5vpm46wykaqokrh0cpo1xhv2uew4ejq8ejv1s8d7',
                area: '46zj9o5rp6l4affu7k9cvssc8bdwgqfw9n8skdj1txgw1ws8iqcx72v443tzw65m9xqbio75cb33hjxo7mn00eafdqwtbiw2k56n3xs8szurgx0dduizsstepap1k6m2t3tckklvhgt4wjos2gopg0fl4k2su83fbclwxuawzurf6zkvms55frc0354n55mqg9lli5prdj3ice6eh0me95i64txyxa9uorbqxlq36icgpjkqbcr898uxnraxq11',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: '0o4ng7u1h1odyeo7816fff30r18bj3tkkp2lalgnfsmwsw7m2l',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: '0z2i42knocyw2r18n3xn',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'ziyn5hmon4xazf07an3468z7jh6dn4f67y2hmzqdzbz8fwrm4sdw2tzb637wm6ndrb04mh5a13sl6rbsb9d1ms1snpdmembmy9ql72dehj5rxtitvy2jbtskps5ygnxxel8427o7b1deoqt28j18xxqjiego88xzoalv80wtwizx1lz5usqwj5x9t84bg4ldl4rv3wbjijsouuu7u7zv6ahtleyjyo2ezgtpl62hp8fg4p45g81c5m1vdwtnxwq',
                name: 'iqz2gk91yy2h7v1t6zzidk34nrwu64rzty85gq9kunlfzr06eirsz9qs5x08oc8tphd9tgve1x2v27adphbcdzigk27g6rvfpy6ufqei6hf803kbr2gx60xcp3eg17000gaprta6x8t9bdwdjz1djqjzpzsd79hrfdwh8ohjydyk1g4w8scn7rmu360vstwbdhqcc79u0gyj9y2olhb4pa4btt90enwmwmshk7l6gag8c5x4ozex3n7rmk6ej9s',
                surname: '0solm3x5avb40bgpwsk55w46dot83u0qpx6f9um7jqzsvou02rcr2w8uw63jg54z9onb6wb7w0en2q8wg7kk9o7oubbv7u74xr11w9ngk4xbeasiwu4j2wlc27r8ykj467v8ogp1eosjsc6lce0yqxub9xauwbfw6yaxm0utd8coay54ndujwh6fumb3uxr9kp2yj4i6t33wvm0mrkt7oxnwpgxsa3ntrropmr481phllj1ka8hok5dwwmscpqf',
                
                mobile: 'c43fvvsewmij3az5y0ss08tnpdv8zw56qnoahud18ipucpznuon5sgwyf0bw',
                area: 'j2of3b60aa52pw7sxg139ispj20kg3qok8bgfuy0br9k8kkd9oycsxazqog6pjf6tipasin7ji5em66m5z8y5neg3xv2f6v1wz16sl8syc6vuwcndjof0ntq5fvu5gaxloo75epmv0alvs6qtn6b3y9kfy170zpufd7hs0lxks73mck9u068jq7peybzjstfarpsgi4cmwfsbb0ths2l2xmip16zky8kd16m8pscv8a1lrhn7qa6vrh32bcwmc6',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'z8r2e4mo0omee4loh93tbni8whwhui1wnal0jkoge5v12nv37j',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'n310hytlxcxt7g5qbrwe',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'c3gzm4rausvqk8qco37twfobqjdzfuz392qm21caq6jmv39w45h3vemws4uwk68h2z9qbd7q9gxcdxppkafocwkm0ex9m08ius88lv5gbclew4ar34nfd6w7hxmv4at7rjkzstsjyy57wm93l6h055lhgi3q9ak31y1ccfuqva02rjdoqq7gph8et5yaos61feaic8bwnsfhmq2f3x3lbuqahg2o7n24i9syf93kphltr0b0yqq7emmqxilfulg',
                name: 'yma6j95f2q85f0frxt022u0o7slqzck99adqe8ejqi3j1rgfafrv23p9tpm1r4o6o3sw0e63zzod5vsafxht4eeoxjx63jbbixufs1yh2vc8fpeflnl8n4ew4rkzhoczadwxeyo8i66p5557uplha3ls8k7wbeuop02rmlxy0f82zrau1c8sz6wuafu3g72o0rg47ujmb9e5j3gvsswvho1wdklewt0o05c02cqnu81enfk9r0i0jqt9s09bd13',
                surname: 'gz6567yinsh4d6ucwou8hbe8tomk0tqex6qi982ow49k9ac27m47y1ox18ghxgvdlcp5w3euf938g64g4559xbvrmimr9l6vh14xvrdapqdrd6wlz7vpng1jbb60eyspdr6wfl5i87sbnm8arq3h9vfd87tzl530mvy23sisdx1ywpsgmofyee10exzha8xbapfbe72ophmi1hjxgjvfrhuu4l83brng2fa1epuvbtol6cgwlip8tczk75ciel8',
                email: 'b1gdid1tf71q9n7560gxy6bgmpp0fk2r2q91skcss97zgkpl6idgs1rna1iqrlnn3s3nnt9sam6t7ibv321n0tdl62a45chy6h0e59dxu9aclhcnjw525ewe',
                mobile: 'ybnc61idsr0yvur6f5cf7xj3t3nm4d56yz6dpdtqxnqof4qnxfcawddgs83g',
                area: 'zt62b2uluaf3u1nwy1jjyyd8cll5jgeu0rqksuxto0bkg683ovd1488qof9eozprq1cw2xju6jof2w3ldlgavn69cqohheywtp7221p0ep0b36sf7k2sxgdnuwkfwu1bgb8xxnlv23go86dt4gvglwwe3z9byny83fmbj51mk8clnq7wkab1jd3kipmz6kf8amxkd29tl26tm6t1b46l3n4fg5updgr0ph8xsvq8j8cxc9gwb43rclynnwkecv0',
                hasConsentEmail: null,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'z0e3ggr0hzcmbhzeqx0fhk383nniz4zkk8hn5qmhtojc4fifwn',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: '7uqplnlkme897t1ebx3t',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'lowc6hyfmfn2cit6z6m9m9j4bz6zegoaxx50ilu8bx9n1nqa4lx2y0q6t0uk8vt5d1mzlx5idqjfeqjg1lfr3onbcyt7wxmd6t8hl8reiapcj7lj7s21kuwh2zwsq087upwosa1c1y0zo0496mgiso9b0qcwso0fpyysphpjn21jlbh2taiu2y6d8v3inff2ljpr0401u3bmoa94wpa3z1fffyhbbrjhflyag56n0m1faycoqi9lipajh82h5lj',
                name: 'oo1ky9ckkkqhohhbwh3pqg3m9f7t1tv4ip6pleburqed6rdqgt6388wescnjvnykor10mj2wol2uao5shmy4g16wnredp92we05qx8xwqt0ra3ieb5b18z82abhde6px2tmkun10ookgaks1386muy2fpnr5mv8gl1a7npy1code8s6rf9dfambhr8cepoc22l9zdad9lzvtmrr453uzd5pjhtufzi5r2ndpdd4h5bkslpbg79t2yb4ap2zhlua',
                surname: 'osbkjz3ki47otztdg2e2kzhtdtp7tmpy20wo0o8rybofwflf1ljlw3l7pq3q4kfuei2ijeo0mc69dow36ga8yfmjib6kjm22rivdtahcypue5y41fk0keraobhecik408vs90cia54snz162390kjzyyc1tthunyy9avdlh1t75l3gapnw88gthsu8i54x5c2t4dhrm8i6cyqkv0b6t7ykequtb1rb5xnttlku6bpfqtxo2nupd0zy6lx3p0i04',
                email: 'qo0v7i009jccaksscai2q2xctwx8ejmaqyfdotqgzqyml1du7jd1lcqngpln9nlq4tlx44h3wo0jo8kkihlpa5mv8h3wdf5qk3x0j40nf35glp9gvdmou63f',
                mobile: 'wk5guphztlat6j8mb9o8z7h2gainez4f2y8khazbt0epdmqlr5ayggtyuadm',
                area: 'y0dd3c2cmj0oxut27hpjz1t65k31npn6hjowto71armian4adq3l52tug3ztm7gp9vkxc9y20xpmcj6jprk635ar1xmlkoxv4h6n4293xvp3j1qxvu2vvj3z11k9gr6rr3ylixgjej39744w7vuu4je3g7arxwb19plabmm4b7tye0gxiqtohgcs2bx6r6jkkztjadf7r6ec62rcbpupuakagyrabtawzv85j8htrfpo3bexmjffhjp7goalmyp',
                
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: '2mnmi4if2xcmqfr7e6fp0k7gic7h6px2rksfhzisw4w3fzknru',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: '01lzopshskxjr22fpbsx',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'jc937xyaeajgdn64mktstog02n0bv5z60tnrp66472j89illom07kb0o2p8aglyx40n4kv82gltdjc55j2umtpuww39nwvfosul0jjrlcm6e2fieqrj0r6pgsyrpa0y4vgnjb221jrl4qiigyzsyfnzo65phakw3ph206xv20in6gkibht9ff89oxpogegi7e6rpkai858fybzmw05nzmc19ijj3od6stlc9rlv2nsyix0c4a4q978p9o5rnys4',
                name: '05q7brsajtm3scpiy65raof7sl1vtwb7hpjkpaaudifyr2g5w9nheegzrcaidb9qjy0ugf6lwvlba10wht1woyws233e2j9adjjkg7kilomykbxm993um3rum58liq3hhidsncti9uiborwfvswiw1lqzow0hb32ce6pk21ct51fnfjemlz0p4vtsj262brlvatvezjawifb5tafixsyw2hydndzhjzhcjnr91i6lgzvzjxp2agaj6nb8o0cjbr',
                surname: 'xjcnhc1jedy2zvth38tt4a7zcsotrnrmgvavf2u7dc114d6vegd12a2b1qyjbbhe2y71b790pb0d7nw7zdb2zzsot3ukqlqosqtkl3g7ua8czpbi365nezglw5hjuyqem93ydqteqsdm7w7pa8uw6weo4w8rpblj301mwi68bjbpo1m25lehhom3pqxws83j8ahcc5vzv7qipmj65fcgi3caymomv0pjmwcxip0ktn51laipky16psoko8h8jdp',
                email: '4tpo2dm86vvthtpduowj341b2pge89htr0efgfpg6l9offub1d3ayjvv0rsyk8mzflvt8pyss7pcmudlutpmts3uuzt7jdo74yli07qkc5ifk0am5a7vv2h1',
                mobile: '0ra54odxvmyu7a70pvr5mtucijb0skcstis2nj34s7l4raf820fowoh5b2a7',
                area: '4vlrlu0ckbx0rj09dyinrrqycsy5j6bgi3zwnnhv2xzsny9hdu1byi9ra6dr8lma8zdk0nhg22tpedkc5h68zyu6wm5tfiy50tqaj6qfaqbiuw33mjuhcqnms86u4kyq8gbu2rwvx4tsedqk852uwbgz45vm0fui4ya1xe34oeldok75eiio31objtgbyb6a9tkxyxb0hvxkwziv53ekmw1k96pmazv2l62xvkgr6x1xoumfo6wlxoy0luj7lts',
                hasConsentEmail: true,
                hasConsentMobile: null,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'awinifgxmnmfze3so4ojcjneddgffvdndanpa5o96r2yn8xo86',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'gkcvs2z8n77kgm3k96xl',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'ua10gyw7sfg4cih2foq2ofjee96uprvsm7gx9uy6tnapsazg09f8za96cmg6uu2qgolkb2slypqxyca6w14cwpp29vdbvns09ts4nnet1x25oxanbyimkxyt5qbwyrb4l3afm1djw0g4dlr3es4d83g1cr10m08ge7l77j9euyx2min1jf6w2ax7mptclxnwgms0qzzopetbzyt3032zv8fkuplozernbw01ydwx6tt9x2isri4fcdph5sb3cpb',
                name: 'oju0cjdrhz886wv5zar1v3xg64w86qq8rms8c87e6et135yb7qp5jkk58kvyhrhsahbz4ex9lgdnoxuscy7gwk9kfwgzj43fc8pt7h6wbkvpmmdu18k2rfk7q3m3u2ggic0d600ciaul6eb9p0cq6qu91vdsmye93bwsgr2vq46z0rzkw4frcm081dtvdg1ypg3wlb3flzkx1kczj4qu7moivajgn3q4mhkuf3uq62bcd7v3bcx5fhjo6jjurhx',
                surname: 'wf4o3pitbz6mc9iwt479gfd1qdujww34o8lsnh2va20o3oq11x6e69gpq4qxo31fsn129o7u6asmj18yin4kvuu64ex77jfpfhesp27n6369q1clnsdt6kqrp2kkw6pa5k90voq5fvfobxt46d70ndripgsmxbtebc73rathqr5a1o7zz6aogrerffch77wipnnn0cued8n3iqgnevp1txo3kmmy5f9x29321v8jt06y847yszc1u8tty8itz82',
                email: 'zfs6hbyhklnrwecyqka09ap7zcsdx01wxnbxi9lqud6rfznxjm2to6khn3whzdd4z3yfm3sgnv61dqrq2ox4m0vv1he5g5jnu2csiupfo5h3oooahms5wm1n',
                mobile: '2ecirb75nwt58n6fzln1ce21bldkk2l02l35bce6ae40i165y3wmtd8znwau',
                area: 'udmqgjc19bp0jlgbvm23e71qtyc15sywrms9kjwoax750m0lq063mo9w1sb13lox8ymbwdcoawvz46q9hhxogvtt9x1nzpb1fiw5zvgijtnxya8wh9ajyqj30riwwd8zni144oglp3ooaoqlioykt3hxbp3oyfr40wl9o5k7d28ht597gzexhhstnvobldsh64k96q1waau4osx8q1ud2gex0vr7nz9trvaxkqn3gtts30yuyq0gnj741dj6gqd',
                hasConsentEmail: true,
                
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'uohmno4ui6os5n1uuf6q6ll7vovrnln9uvi60fzlf4m95dto6n',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'gleiyb6ir1mwaz46oiki',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: '85eihzuct9hs0mfue05f97y69h6ld3xkdrq8oyl8bmagfgjdmo0b16otzwmffjfd18vqj5uyyyloqfld8067yiwktbws5qsqcrsq6bgzw9fnka5znz3jc0pwxel4ij54ypcw7108touynwxo293t0qb342jm999qbaecptdtphi3u5x2pbo4pzdqmxvdj97q7w03qq71es1wnioab61p71l62t3yg6iug7mp23aezwakn5h4ecwzgmifzb3njfi',
                name: 'dceal2s38olpq51cfhyv746nyxfsbzmqg34elof71s0lppl0snzn3cz0gtr7qzvjidexggm3szll03r95qnx18cggkzgru5662frurkvhyksb0ic26hrlu0gklsiw3ngyd7cnstf462l4ypau4d41uk98vp96zw0javuratj0h561epiyytq45fiml5yp1zv0v8qhs9i5bjriaoxq5ks6g8owg4om1yt27vsyffdtwh8ad81zd2yk7gien6b89j',
                surname: 'om0j2zw5l1ih2hh9odlb8xew0t4ro6zx0tn9kugb911nqjbb444qkyh8f46aqh08ppnpyw7qkmf537vdw3c85y654p55ccesok112s7jmbitm7h9foyfzofgy15i3cv3i8w0otn2xm2kg8l70j1rnu4w3pg3u2l6lva0s7h6nfew9h2277boh0uuornccvuacz7q9ah8x7ozham8epklrjzdhpp3tclif1yrt3rjb95jst338ix4thjdggxde9p',
                email: 'a6phkdvfhk3zwwr2k970vuamkkvj6cmfo6xzljown3drl8tkxfe8jrga2eydh545nl9sgi31epn362wl9j5o9fdkkur1xrdxw6o5fqlei9w45dptfybfmefv',
                mobile: 'k7p21xc3akavov66cne5exhwyzorgfl0hnh9f5zgpp0m3abg34pi0vwbmrvc',
                area: '88jktqu71hniz1iccm36x2u8yvm8x0gkdkv0lebjqhymajr0vf0t8aeqg6r2cupb9ec0t5t83s8sfcolgtiokmnsgxvf43jx5w8dnync4wol9t2zbl8p7a74cj5zz78tj1o6aqr3ylhpj3edwylc33olzweidq7hjmug7ll3y1uya5fpmn48bynwoq29r9wb5qusrarfgpqwl8e6xvewldmuhznhs6wg5rvuuus4jzol2pio3pwreoc4b9e21xy',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 's4legjuvh3ilmjsl0m7hguchl1ote96lt1e5v0uf9y2cv77nbs',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'y23h0h025mri4dkb0zg3',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'sj2736q7yj6rtsf441j5r7gys2vq1h1buym9vhpc5va7btqh9pag754eev3hlq6qnqxmaukh08aiv0hs8u6g35vu5dpvfnb9vu7c7kc42phyul8o5ayoc03gqtywbtz5bvzf0rs9g40ot4imu7jeyb9nd4sd7iou4e3qgvpznwb1dvmm39e22wmr0b1xthc31dbr220deoovqtxuql4r5xz9czz2xwi1hr9qhkclc2sumg9qw6i1bjzabikjxew',
                name: 'ym9w6wsw7kkga0gzwzsx2jm5phyo8qmklar1kvo7p1x6ancogcbjtf0ftab5toabp9wdz8ug20g3ebgjmhvz83sv0xh3wdh86fktibe4dr76o5p0h1ebs9j9h1oyppl3wqlv36jlrca7fhqkbd1sukd1qxng0tb7fbk6zk3x2uc4h31nz4qogmam0evtb6w2rmtpxgp5mp4q1b13ods9lp7irszz0suoqa2vrha77261hi0w9rrhrwg82t3nu3j',
                surname: '3ngbt511yrixx9cdmviw6r8jci5gi9gtlp0gbajigmispfjbvy10jpmne3hqpff33u8j8r4k3i4eh8z1g3dfl5zm7wn7woybgffmp4jajwt1qtwiti41puactvnzg12myvy2l2q8pm8l3i9hfo4dfqed21nvjmiqx2ch3vpjuyszo3vtrxaiqa2o5jbinpfhzf2e50ws6vlq9pxn53x8pqrcfh2376qj0njm3rl8r8bje92jb5y4x22cy5twqpn',
                email: 'wh9imuq1x837n7wyfgb8irb5ctr8z0m1r3ug0y8r4xk3azbp47w0lsv2vo3c6lemjtzx1lhyktt57wu9gdiyxgnbds8fm4hyrqq4fsuqk5xsuwo7vhvi2663',
                mobile: '5r26v5sllf8ode1isjmvuftft1yeo5qgi940w1347qh5ijonfyjflq1m1brl',
                area: 'od8oct28v7dlb322it2kwe4qktga8ajf3bgb2nv2nb9f2rqdm39ngjxzn81osspesfpnt4jrlpjq77smrv3s9ydvml3m36yoj680eterz9wzsxah14h3iggiio59xlu4hw4jqn02jfn6gah5n07i1v194w2s817mvvwcjj9jx0cldi81sq5l9jvhlb4fpnh47gc66zwery7oqo8yy6l73p2uizhvx6hnn3wzakdicy74mk00vzy0k1c43aottve',
                hasConsentEmail: false,
                hasConsentMobile: true,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: '34s1b0eb2kt55a68h7s6mgsnsyj1hjjttpowj',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'opya68wc13xqk8roopoz483o5cma1app2fg7dos9nkfpmzy6gq',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'slqkl1esth2ibktppna9',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'qw0nnp99qv8gq691xgfd98rt2jafdfhoj1w36s8rhu84n3hg9jpbr8k9h7oo8qe0na4ok6o8998h2hga4qjaqhobn3k9itmlifxnurfkls8iql52efexmrboficptizlrzyf66k3bolmyvtcpjs3eufjiauogbqoighxhr1i7e4wk1d286bm3j3s2o2ve1nwz3qm1padsoa6b53z4bzq0sy7w6hcqg8pv586s20aw4fehiog8uw5bwsxbyyxqlr',
                name: 'dg5g33sb7agld1sgksac9230n64ot8hkgbo8dxlwdoxfwdgara9n5zpn2mijupn465n9i8f0k0z02gwhlja32qqleatgt3fpgz95xlf39vrmbr4ky0eg1om45yrie10eefjcvedg67gxvvoitlsu4y8el1ty76sertyvt7w5ykxp2d91wv9fby1w7nvrwmq6xr68ye20hh24wu6eb1p9qbpfji03lu5nsr0tdhwifkudmbufrp4djtr9qe2ysh7',
                surname: 'sb6k1urmw6z6k8q6pktwephylnijh61ohkym43i1u2x1m9z6ttqem7mclf14asz09ukb20x6a3oi7lof448lxvo9uy075knhtl7a476hw8zluuu7zevsjy3c759hj1l7srngzmv0ay65dxq7rqyimod4r8rwzdm3xchispjv6516ccwiox5dfogko3tu4isfu764ngy6cl64wrtmd9fp2k7xmj9yitswvbp6v9e9lgr2gy2pxhs5j3s2fkpryo1',
                email: 'rak7rdxjr4a5syhvcnxbrj34u32aqm1laii8ya4gq0bwzwaw65hiodpbazpl8rcf7iots8pyvs1k3847te07efsrm7nny4r3f647jrqdh9iuo68j7alytlfs',
                mobile: '2b6c97ed2t649xgfh2kbq3svvv6cg6dbhy7091swvwrzb6d9veafu7764umf',
                area: 'xn1z7vp6ei2cekx962br2wcv2p8c596xm6jtcfgf5sjb5gdm67hm3rqr98e03town23ngsw8bwhtz32ipp3sth76fy59dvj34uziyze0flhvvj1deolsc0r7nyjyvvg1b7gkun9je5lovg0isxpbqzqxsqob73cqppptjxj0o3ivvoss7cew9pmsui76ct4f05sw3k7w427sd3fm7yyvpdfkd36upu66d7e95wrnot3cwqnticfsfjtx83u1u78',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: 'vjoq0eqan6nko6pyew1wch9lpzw16gk0mpbbl',
                tenantCode: 'zp4vqaorzl1du8rl42yszwzug3ady6vae0wcibqy7hlzodjwt3',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'lc5bvsj8xe00pn31m25g',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'v3det7qbysobw8u1012f18v8qa9t3zp7cjm8gdstkysuduyx52ioc1xnx6c9vrkv4at6rwlmupri6yvqj540jrwjpgdlcaoe7dgahun9iuh9r4zazscbf25dbky9tj5thoqx8unu0kuiekz3yft37mjyij48b6mp0rfmbc3iigjdgy0olcx5pskfwbbjkykgh9cuxi4e3hbk76ox91ei33wi9pxxe2gsww8z1o043ga8l424f50o7h76oszgz15',
                name: 'jlz1l35o98k4l0l3j3prd1q11n5bq8a2nfm64g5rmno8cgxugrhntpqdto87g2uc5lx4silqw9wkwsghas8bpdnrkq04ughgegs302nehs4t9k8c5rlbsn85ynppuiztr21pp32o6nvrtr94pdi834a35mmitw1odx4ekspdeh06ibhocdvztkx11yanoaavbpclfc6hj75ff4ujciom71e6q08i3fqeir654qhxcxbwbcgsg4vfaxg4iiz1ym4',
                surname: '2zt7vx2cjmtn672lrwayocetaann5jrfaoydzyl5si4hmm7sc6h31qa3nwyrxlpkyhh8dyjlbx25agbizv3s9innlu3r4cvikv4rhnkpcw5y1ud1yw2aaiqyqbl3qinqrqvqtshr2g5f4tswhjvd1zm8rpwzvqocp7hd088yts2duf8amcan11wrtyvu27tbnz10iw987e3d9csie753c9mw4k50s68k0c5zkl0742xvn909ta4h65al3t5wf02',
                email: 'xbby0y8vakqogn4lvoh7hd8twm36oyf5dahlqqbzg3kq7mxdhjefgkedn4qouke70holryrxc2ws1sdm92uvajpqhi94aozcgqc7fvhoixyai90ppq31y6l4',
                mobile: 'lhd7kxg1dvz7hmaybbnlnqkgbrtizop0roumtlxdppaw3sd5yoi4m0qa3vez',
                area: '8c8gzbq3jjtufcm1b5v68ybwv1cw9kvlbhyp1wcb0opjewneko8z1rvbjh0yyiycfgdt75hgz0b2k137iqyma2zrt1xcpwh268kj42spdjlc6gcn5ksbunfyfno8e1raugfkvoqilawohe13wuaofu5h3j8864xy05qtulvef3gi1vf33fgi7donam97uroi3pu9rdg1olkjdixl2bq1tg73tcy6rwxoovehalliuh0aet2tdl6d7h2dbktraz6',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'f57uwdol1rpilyh61i88rhm8lo5h25zb85e28hpgck5eoqn9qt',
                systemId: 'r8c23dqqvzp68sxi17zzzeololz5vx4duv03q',
                systemName: 'np06gvwuubda9ytohuvt',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'zs9ckv84qdfhcmxgyej7hhfceqo309hft3edfwcu76ub925lgmwexlst59bqkc15ptje34y4qh1fim8yojnvlnwlgz13vif6n2d6kkeob48lmrxs9h7f6s1blafy8e6jgglsbu3nhja29yc1v319sjy5jcafo2rhs7bc7rihyro698sjrwij8lbjp86fhr95bnez8auu3uhxyb6bwugnk1osqyvzug8hr8io39dn24ryvrjsp2zvsadgd8m2v2l',
                name: 'a1m4x4gydihtkiguh2josq62rtx2p1pu96bygfqrskbyca5nz0flad9o8411n13vctuumodsmsq8aaic02zw0wcwgkdpk50qlfppqt1630v8rjskleexbrjscjfdd8gp4rj0vqd11lgmuhep25ht2l5swicjy3u5q3279l4lc8axasmw8wnidgy69e5hrsht43ill8zjkh0zap57l9jwprmni21z6bgwnr50ca0nl9ibjnh5rukkkdbrq2md3p8',
                surname: '3yqtyk0tmiccytq3lb87ieur02kk0ww9lb1nmrah32jk3vptv3l973gpf5dzb842g9s3v3v5vckkkyo3sqxsixg49knuxvsjy0beffsmumw9k3yyje4vbftw5mh395s8temm8tqyjbr0afc8rr9rgqti8yfhq3xq59s45ywda128m6lgcm5laifk814ue41wg8rdprw7qw3nxxdut8wll5l9mw0wuvpa7zpzvsynfghgqs21m73v1j0pmssyjwo',
                email: '7ouvualpogmvidca9zaa8flajtid39j4ej8mqvllf0m97pl4afh7ie9qejjzxyprq1i9d0qmcn5fjbhdvka1b0692333h62t4lrrc2tppvxkqm5zfsj93wsh',
                mobile: 'xnx54f4cvreofntwiwn8esr54jawwvrh5o2yiay26rnrzddnqn77ye3gjmmc',
                area: 'y8fhwdkjhjrzmz2jrtv5i787u5knwi7wir74uu7ovue9qjyq5rp7l8iwe7zwgv9yxxfudeaqr55u7ygpnz1cn24wx0z3qt7sx6pp4zuk068qita69hmm6fkdjdgkmn4211s43vbq5o9tkglzxu96qq42dd2ztac1bstjg3bgf8r4qh9zrdk309h7qy9favhxdrgifgkpkh6e5ishi8qf49fh8c8n5bbokgszum97ahratxzhyyt7af8rlamfxmm',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'qo524h5ned6sad9lnlwit9psml8hrfwnpjtxynlsj8mrrk7mve',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'z1bfiand9gi0qm1y9tr3',
                roleId: 'f12ak7hamw15e8j6tga9mhma20l4agphycafl',
                roleName: 'qt1oosbkw2rd7iwvrr5i5de0fe53ieo2prxjcftuqiiq8pbvf6s8uf26vtcl1if76j2xhqti7wx30z8rfpppio5euwb1b6qw1kqfd047cnsuun1kq45yyy436m96thg1jou2vwif78rn9h24vhttztrozod632mfvifo67w9ngwvtcpld9cx7vhwapgh58srksqprxl6d6lr3uqocg12vgjftvoqazzea1sdfe4e1ocw4gz2s9zu6v18vh5iy0y',
                name: 'jlq15mxagiiklxdlt121ctzrt4gikpxcx1bp10l2x96y8inspdx4g37krio18cvbybrqmtf0a2myy5542f2h3obh3bl7aiwkof3zpknouxsdfqzswu3r5xuod06domdx4z3bqs3dobn9amcq7cvi6pb1kqeyolgz1kvnezwehjnehu4vbvk4qshzx8xrocdyp7tfsva0vtg7mi730vwd9qii0zf59ei1ljndncsm7tyyxm069fyvxg306chlvps',
                surname: 'tbsyln8uyfx3i7dsv6vxbmoyaft8vgqzxpm7z65dbr8pd6lmeax0v7qg2k89nypnln9rlnuat13p3u2kbz69emj953j63b8ag8vesxa6wvwrn28pfqo81bwr0w5ly420mj0xmnjwdj7zdooa7deysu01xu0y3jba6zxfxnoolqzo26jx9xnv3m8yyhd89h7e92uzjai5gv8tcx7nw5m6nvwexyzddf74t784mtmd67hd1mgmhy7e50w55z0phc8',
                email: 'k7haoaj30pik58wbz2r851lk2me5xjx5pwj209vwdyfivnf8drvherjpqv35xlqo81y5cgqx3b6u1lfi73bcexo102khx43v4dcj69q6aoic52365d9zwqoj',
                mobile: 'p517r83fcpck9uw5evaogn1mzu49qto5igefqjfh1s9igl0rgpauxzizazsa',
                area: 'edxafe3n36qcmtc05qxd8ddv3x9l2o2rep7782frnc31w5pi3m4pyp50cj8phoaa8v9pdhtf0w2l55ctz206p3bp5r8y6id7sdfjrb5efffpqzphioyjgt69ungr63871gjgrb6bi0pqn8839m2plkcry90fr2zdoumt102wksbs5i3jfqf3xg25ddplk6fvmrrvbuyknlmhr7ocsozd1wv93vu6jgf1bx27hea3coastlilqtj75f29yicnsqe',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'nhppictitsy4tkt5te68ks55tghnmcmxr5r9py1rkdhifp4mtwg',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: '1584yakpsnlqk3dvku35',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'suw61ylfa6rnbcg7dfdteexqvs09taqgyvu8849ixgimpoi25af69pkrkwei5d5jbt1rczeasfb440b12u6bpiwfrh8la7j92cyx5dibakkr32cw8f0ld0ozff7e2i0u1cchimc84zo7l2pxv7z8w4q0ki8atlqejk6k0hupe3350ragpof8lr7d4oq8wf53sc75teq4npn44bdauxaz42348kyja12cbbmsgunoac69fv9en6gcer0ias94nmg',
                name: 'fwmub1ig63dgpiif1652dqvge0gsni5tohoif95906hrdm6oph2qkspi701qlzrygftzzgg14irco0zekq7a3a8m95cr9m0mllypxp7zdmsxh2vwvsesvqezoovg868cdm155zc9k11c173a73jyn86y0mgwtrq60a8emqk39rcysyzx75mnfnuv97rc6iuzuotdgbvt479qfqa43sth5eigqizm9gbfgio4kybilz9hrt3laceo7q8ear5z8v7',
                surname: 'fxf8bvx4cwalemq56lxolnk95w170c4d89mcjqe46z1hhrffkucngxmzchzm8mz3ftrszl42gvc41beipxnswb2r3bhzdqgeh4hmgsu84wah27uuq7qc2a9ctrqvglmrroavrgtnhenz0i5tj980l6sfuc2e3hyduh3czx7ay98wu3cr03dkbtsxnzec5jp2vlu1xnwjcipioaa1p5slvex10ncimh8370kqi9jvexqq2ucqjwjro8xiqc6p54q',
                email: 'uoh0nk1rp4v9j38ri8t5bzgc7d2gvcge6sqq98ueqo2epv0d95nds94b8enizfhsy0w53gf6o8vkes9sy6zdn1txop5kfbvuvl5fq6l2tplzn7hv2fmgx4to',
                mobile: '3jn2505be5ao96ds9e24xvcnxagtitw1xec8gq0fqtpxcg6odb4k1swwek0g',
                area: '2xv9w0gxt8r88eer0pidonhxy8w5k1r9oyyp4nx3n5j7ozny02ebdhtgjs6mgkntlo74fw1mwz9jvwezu8ebh9w0qn6w43o7n21mb0elo97y3d9s0d51fv86n6rk4fdvgmj7c2fg5eoi6x6f9eltm3k7aqt0iec1ct6xksjczjomlx6xb1x6g371qybkaeueouw7tzpj09j7uwrvkcq0ape6thykq6ttmnichyspepycsd3l67s9w7yecqqv141',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'ltmn2vcs0wl9ng73r2r8odylsfqsdmqy04g4jvtczvwoasdqyt',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: '4mv4t6g2kngji1vgaq3px',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'r3pwqg7n1bzr6e82q8eafxu6b1opaqwejpp8aqwd9z46rf9v4ucgh4gf6uhgze37frhvvkpf9lr3cjxmztc4gm477r6uy1bohm5ae4256s17nmljigkmq6qubwo17qg475yt7ml4o65v8j3gth2zd9uln1e96d0hqcl7b7ttq7euph85s8hs1q6b2ehar1l4rpgkjcj14sujigswf53uj2jurss5i8pnn9gv3594v5yg5e4pqox2o8uio0qksht',
                name: '70zt1grfhlc9tmcuqf04tjxbnrngv2zecwsg9hwut0u2vjk0jggsh1hcognp2kf9i67ack0x1evx8d9zdaze2ial2xg6yepp6vya6g31gb0kdq4y0ftnejcr0zloyo43u2o1lobyho1nqyjms289hn84j02moinzpxvmflw1kws12akmc39dqf71nipebaaay4gcu5fx0dia3z7beqtl2bxrsrbpj9eyypo2d389hnbv4161sr0qnxdozbrghcd',
                surname: 'rpmtg27ytndi1arypmgzs31ful0xlwskfo3sy6zy1su7222zbxcw125jmrixwmapb1r9iz7keoc6gpx2blkbn75yzwrs2dkcplz30chmm4sy5wr0acxbl39zrrdeutrsqnumtzkyn6lygp1hkn3ahsh1wex4i0xyfkp5rbfdhq0f0hru9fbh49c12d3hyedmryt16b9zzfdb8hin479h3yw02fy4kno88kl6epdh1mluo1tbh4o3opn1iwb1z1a',
                email: 'rin5uayod0lb5q2w55dn9jcygoypd06gwcwmwy67v2z1c0p0lqwpfrsaz8zvz380u8twpyh2rzdbjdq4b5nahbvyrtg97kzunsr8sapikfq47198hc51q5k1',
                mobile: 'jgpn0jkwrjufrzc8etg6rc26xt1m6lks80sstodb0493m0tu6ex7z68b9vap',
                area: 'og3mfqqqpoub0z3pvafeagkmeyfif2gf3p09xsegnr7avah8x5i7hf6fj9lhuh9pej03qrhh4ep2bre9q2aub3m3i30bevl34du6554fd1v6o5quvq59x0r7qo2os6flp06l5a5jy6i9umowzt8mbfquqwia79r5vtyfc2avudp1qb3psv9tilg7jaimtsetq91xr81bpnsbl2km15grbq5lli7wlqrntzt6g9h8feoa2yv2m59zzxaac9l9pug',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSystemName is too large, has a maximum length of 20');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactRoleName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'c10lodi6heemn1h3yzdhqjpd27m9fzjzukkzlzq9avomdd4rdj',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'iqh4zhyohyapya6r05gt',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'ws1tahroidsd11c50bnzz5cef05ryhokdbf6crtbe3ggjxdjvzm54h16ypicfnkwy1wm4yrjtka9fy3snhntdsmbn1ggca7o3zj8c85l16zdc5bqo5xuxe0f3bopsv2x0we3ed48qs2ya38eolivzbadq82c05j9ko61bijear37mh7rco7lpua91dh4eb0vtqbf2t85yvjnri3gp3qh3coaz498vllrxifvgc6m9mag3wfbc30t83qom7k3eg1r',
                name: '8mmd4dervzxr7qbmrlhjy8tgaq0aq1gkgjenhotx225wbw0tsi22bx8cazph8ya6tgu36h9tejib82n51bwxr6ektqkj90fvfkf6jflkqbx4bf0w52x4944z652vhum9ail2aq3z2p0r1cqqhp6t3vpp2tca3kucr3avy0jiww93ghugdkm2qpscer2q9mle8ibe0bjk1j735531jwi8crzp50a40l5a068yyai1vpmbotrw9j16m8ibsz6dao1',
                surname: 'c3lyudgbqx3tcr3bqmudxgcjcsm2wr0squk8qgojh1nmjj9bzsle8tk7w97sajqxt1fipbd2pp2ho18f03blpsa6lc8je5otjt9u75z3pjbl1wwwc9cqdgq2l2otb8328v9bhpt4v4fakobxruyvzx79mriy0inb5xavas86lalsqup6vzfjwwn8t9e1hh33vc7gdra6sb9ornxidk2r7rpj4t3xynwokgd2pre1cu84eyxxijx991abfz08oct',
                email: 'rqmbq8zn3xiin4rra7oax809vwscticzldhefzhg98bjx6hlbpk788k5rc4olbh7nw10rdttcdo9l5tko14ievagbly2f5hvhp3wctvooblbra0qnmkf46tb',
                mobile: '5z6skojl95y07u35oybq5opu4bqe3brgjvkjlul0e8qb5l5d3cbbjm1b5pub',
                area: 'r3075ern6rz71ulrjvytb2h7cz03z62ovjmjyjpsp65ahcxne0v5rd7yi1boznzt9d6jg45szm27abdiicv9zfs02bxd9akjp6cr23feqfdlsozwb0dzqit5cqlliwfue3eeuq8uyzj1b0atcn6wl13dix4xgl0ts13zsmvha0jab7oyf9aklyqduyov90ed9xgn8p0yqlticvpnmmnqizccwvpkqsdcr0koo0fpu86u3j37y0amau6y97cq3v1',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactRoleName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'eqwzlpzkyqb2lyos3xwayvzwyx5woxjzcn8mt99larocat8w52',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'g1ly10m2lfsuawqf62ko',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'i9fyp7drjbu3xdhwa3s4fyuaiymy2vlu1dxgvrkdc5za142grijjff2qm2d6p7kg3a9nzd9i51fjpmvapiuyyairvbah6c3lvuvyz1qjqjd5jb3lgtx89eybptcvdvqvxlfpsqbhtw5yzdv27jb8swt8er5csb3zawuh9883ppnq490yimf2v2x8svf7jp0ltck2qysqpkzk8b661359z1uodr0pvw24afl0mfqk914f57ua8crpfgqmvhwmcel',
                name: 'yznrcnh746olny3aqvic8bqxnaf1x8khfflile8m6yp28dulc6z96qfeezqjvfhf1s9ze3zjv7e0ayx9ajsnyjtg58x8sabteng8dq8s7j162rz4vjlevaknyuxsc65okl8pnbcob6hv2g3zkn4qb4yswffqd4h4z65ife2tjubpbjawwnqajtz1adusde0e3k6250tggleo0xbhkxwbci55y0j2qidqikoq3c51idipqrmdi9zd528mxof5wscd',
                surname: '9a7pfx5m491lat7vwq3z0cz0cgi8vpxtiolqjnqdx5f9l6eqb7tkzq962299ioy0fbg36xs1zax4srf2k33ucxyvislfd7djqzy1qqd7qtom2qp8jjlg9lojyb4y6l09do840e595x594sex6uw6pru6r8htunesu3wkfepl3o6ianz53c3fv6q6w0cg8oqsbxg20cdfymzlpsyj24xfbdtqmm9witk9fgqpbmficuvpwqn53svhm2frp2h2a20',
                email: 'vxdpzhzut2ltpvh3plg7661od40bwibrm7gkv4zwxh10xdrsgrtpksxbkkf419keshmdvbe5nlka8ww65s1ok0ijf428ydylsuqzi4iw3beqam00ih2cymm6',
                mobile: 'soh7ndrd8e1zn91hax5k8spflswqadh2ezuke5scbnyvlp7sb2w8d8vh5198',
                area: 'c6cxgk1b3kbx5wvdh948dek0grzqmc0wx76cp0qxcgp7ljs9f6v7zhxzcence1o6zock7rufwhwb1crhnteeuakl55s06r0x92h7mqji8xgdq60841se0e6qved40o7nkd1uaw8pe9oyzqy1gdh3uek9wf2etfmwaubtv4pkvnqik2dh6ypqy5nmq77smxpnx1flbmclfc0jct8r2xxa8ofbuq6ecdv6fi3s3ln1poupl4nulx7nt1545afxf5h',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactSurname is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: '1fcsvr2dmscdr1ecus414p6xxhsyxgmt2ptbwe4m1wyajamgt6',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'mp0qkqanzmd21wz6tqvf',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: '4yz4s0q5juqbw2dmm06xmrfr7uye9zpcslq2slh6zfkia9g5infg4hobowxd8feykk8lkyzsn668qzs6kzjrj0160na2qk3o318u07sx0famq7l0ijt1v9c5ivggbaogtuvho10nuahryztsybw0fzsi3trkqecr1qicrp0wbe3qqwbcisk85ht7djl0w3hko0be78847b246u9a2kkuzbz3jnvtk4hdgevxp4zlihar0567iyasuyk05nasnip',
                name: '8nra52uvvvgc9n2miyng5122o63p7bd04tf04z24tzvhixh0ea6b4nrlsnvxcaz8sbtqtbr6pqg8apyy4px6zjn53lhp1qga86fcz5edr1ze83x9lpz67cjkq224de293lxlmh2mta1mguy5kz164hwmcdjr0lmdc6np00ueqzfg3td29mht4kiqfsbdfcgfvtplanl1dpnucia2jnvavikjngrtg14cigfqgjwulhrwqolck7ahtzjr54a0ctz',
                surname: 'lk9pyvzcnquys7itac328cctvh5w9kvxcebj0h8sjnfbspg1syxtvu8uktvvqto5107fgr9cebbi9vufi6b6vky5dzbqkadzag5ahs2rp1higxvxgg1ijz3v46j026b6d4rf1c8nxfwnx9ikwqn3zoydyyw2cpchknfh1f1e59a5gcesg6s94xxjra6jzf7rehq5uk6ylk7e4ujvmma4yrrumv6tcx7mo4uupctepvmlalsqgxr98rt36fbsp8fs',
                email: 'cb5yxnvbeo1grs7zy4ldrmjk0ddny8l0039ozoqibryvflhs26x8f20i1k1et1ftidyckvzk21yza9chwb0v6eni4sskkotmtyhn6wzhopds4wpg16x579s2',
                mobile: '2pwdknr9wb52cxb6x21axsxm1iewiuks9c1suibnrwjdslnnlev2817h043w',
                area: 'nokmnvvu82icph5bcawys79mbmw3lal8dqcfw4sytlolptc0tulikybk1yljf3b0so2qhc9tajhv1gqvsqkaqxpgkoattl899ertvvim4b2f6151krghubabs1omiz3ynyeueaespq6zpnltfd4yae7jud1oyv4oxgo6ysjsuxeyn35sjgm9giy23ak7vfs8530d64ba6542arr1ssxoigr2qjmkobxzvnfmzlki0ipa92wsfwd6zqy5pe24jbs',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactSurname is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactEmail is too large, has a maximum length of 120`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'x48w86wdjx78lzuqy2v0bewr8i960vi37sfx3nu9vdgb95na8b',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'id3kdznizmu8s6s6co6p',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'r5wuojuswprpkqniq4vhzo2myrbwdxzn7iudheseoow99bzcgpaqfbebx895cyfv0loqagggumdxhn5td51ail0ewyq1zxkcdpfmmwc24xpoa52n2foicj8k1izpq45f4x0pvrpe6txtdpx7fwivt0lsorny3fua1z1ystrexhptw8igr9ejrg4i1oktyfkdmou589jygkwail164ttfc6qsfjenkw34cd460kop69kg3uic3ggx6mowihf4hk7',
                name: '0lxx7pdgnb1qq0eq3w0cid52uhdg1oquypm708izrnxdsim20he3n3ckda1wxk2c2t24bteche00az75flg0kobbc34a8l07m55nzolhfrvbm9x08rcje80oy47eqw6imxajune39u03uhfi4cm3735840en039q78h61voxubp78o1jrl44onmw5zlh0m6vcz60reuotv8aym6gzhxqv81jcgzoxvag5ri3sfmhxgy7rhpoozlqmjexa1z6nms',
                surname: 's1gnml559awzi02elya3w9wlvqx91wcuphzuauvyo6bu4lc8nm4tt4fgmsqhfjvpgo6ceoary13tq99bjb9g9eucztvdp3weh1mdo1u8clpqfbz16cg55w8o6n1onnatqoqd0b3g718iq2dmg9d0r9fx68g4qciw1mq1yzlb4b2qbyolneodh1i2a2bnrbpkfc8ako4ycm5299ekf8jvtub8lgscauqiogpr4ddq1vdt3fjk7m5u3sg66w0tm5j',
                email: '6kd5h5kk1tsrsjlf0qd4ma4dqlnvg3wr6ntsw0wjuw0nislv3gdw3d07mrujvvjpfqqzqqcocywbcs33gb4zoq787qke5phlll50ohdugbzo929gu0xdqhwf9',
                mobile: 'kkc2e3awo1wovh3iao8nz6xgh1q96to3nv2ofvoggnpu39vt2pkxv9ord2fl',
                area: '8u0r0xsaasbj7r03cwtca28ferrtr7uooumd3okq8kazdzb3lrdpm2yjg7ghbyoegmiy0zvh8dp1byf9bu6oao5ylw4snuclpz5su47naewnbmpyyn19i2w9yrfvltysv3fithk6tppzz1irzdd672283xp7dxsn0dsx39avlf429e3f9wm4qzxbi7z1pzj7ldkl0kvldecgyhfdi9a4y2w5tf00hu33vfbdvfqedc09d1i5uz3kdm0uv5w4sdk',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactEmail is too large, has a maximum length of 120');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactMobile is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'kiz8ltmypsxkfvy0zhl44k8640n0y5eu58876rr12nzbn04x3k',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'xp10t25apco7mw0mknqy',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'qwh208i8a8nvkta71fc77sijju2k556218u90b9wrs712wkgwp0n03igsp3b85x99d9lh5j2pttceh4esqg2s73rohx33ranq3ikcigcjlza0wuwkftgwusrrpwz89v9h479guepx2cmdvcjn5upo3bspmvspfc2xf9agvjq48hglrr3ime6srsxd9sl8qmljny89dxigodcivgdfph8ru6z42e9mazx4o1twkt991oy1m00kpl99ct284rsn4y',
                name: '0buas20efaesvd7unukkam37i7pk9h8ol56owp22q5t0qezdf7z09dyq8uj4ng1nhxisptg8idfwcp0sr89uu1ey22t9jbs0teif3b0gf7lbftfba6neopxa6m0bm7kep2g1opuf894gg7shnwc8i8abnfilg691r1tuhvkjo9463pwi6l3cq90plm5ymv0veqna878iw11nmgxooh6rwe5rqsqydm5tmrylonb0sqwhkc7dut8i8ufgudxqq1k',
                surname: '8mjbl168sy0w1stekdhi9qocgig0wys3i2lpqlw8wsp7qrknbl46eqswquw9jh33n7x2qayilfj40x5y1xebnz9h5qpswcmdqp8u8zn4eturm1kktrgj10rb7advn8ec3kutub9vgwhdmlvrz8vn0q4ujqsx22cdntpgi69do8ssjn4932odtvng6ka6vrclyt6ey348rtmazebhyjpu4r8fdr4l9rk37n9ow9jzvb7hkjfs1dmwp9i4825qclv',
                email: 'd4w3ypgr7x6qysnor25dhta0wl3ppdzkz27pwr55xn99g3t1tsumfo1x6qe1rayjhjmt7iq0j1k5lg03fhlvdbhfr6deeejzw1ouiuxwf30xrcw2tzd39qi1',
                mobile: '63df68f9omvrsvwijgrz2z60ht72azs7xdze42w0tsyjhi7vh3qvrg63h2p4j',
                area: '59ihv1hz9qf42sij5sgece7wqrwpquxl83525mznon3xecosshemcy27nyorrcinjsrvo7kk8icz5csatjw4rmjrvzd11r6me7g6848s4rz9k9oyr89pl7px22n2d49otrxobszo6whxk0lq2t9qubxpci466g2jn0yjxu4pjw91pk4uihqs4wcykc3c3c9mt2ej8r5dm8je7u70csj1wldc3g9w6cwn50rhj0lve686r43y99p2zt99rw1yzl3',
                hasConsentEmail: false,
                hasConsentMobile: true,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactMobile is too large, has a maximum length of 60');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactArea is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'a2k85ob96m88xs4oy2aknvbvbrqic6quyg0vnw8y7a1dbaatie',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: '2g4mczfw55ey0ip61spb',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'fz894njzkmmg3ryji18hubypa8f4ebmqctnp5d1b131tznh46m2pn7fg4kpx1qwwd6iyl2q1f5sbzkejopcnynjylhtzlfudkail12q7ny8cgqlfa9s2qaqi4nj27fwkevfcd2t15x7adj0xx45ddq78edca24jh08w8dzzk8i3nnjajd4t2fyw248vcx4lkl5p68kweuqkiw1sb78m741t9odv9zrk640utgltex113q1ooe7ilgeq7rs7rmty',
                name: '5lofhsmirvmg772ar6mmbfrkh1wosjla94uyscbu592jy56jwxy9fbw14ilbb1lgw60iolj83qng7etcsqo2iy1ckb7pmego98zltqq5li2fa7ihakxz7nm5a4if29c2hpivb2l86v3qekk5d3hgqxhx6506nfhma0cwx0fbwraboot3v4ggsg3et0gcflbo52kjljcy6vg6ofef3q205aedag2gyung8myf70t14xff2544ar5e5808bk8bjm6',
                surname: 'fuo6ah65rxnc20vxdmytj03ad4k134jbqkd6yeq4sd01o87pb0hvg650u07t8l2mtf15lc7yt8rb2kvxxtzp2anfnvzylus7yv8rvjlw2gcv3ct4f4j01a4a6qls8qig84no5tdm83i18zy1nps8jntyel0edbdbsdvw4ubmls0ovhihxoxfwbug7x7q1syr29jmi6854tjuamju6mfugppgd5hzt0y7fav1bb99l5e1s7bfv8ppy7ofisd6oen',
                email: 'q5ogj9o3mju8w157aikaduslnsywyxlcta74ddlsr80jesdxqrziflcyexth78kz72gmee0405oc9j0eguod2idby723aoq7d6j475f2sdhifh4fmsme0g5k',
                mobile: 'eqdd70a9tcxg56zdh3d3dnlqohoe9yjl7wt179wgg1mnbz1lt70ixlqpbygx',
                area: '0f2ifiji40zdx392nxeiuylp4sym7ghgvzx1ouvw97zpqccc5map8wloklqctg4kucomgj3mjh0kxv861r8oi4m2u9zecyuecdleo26mzzho2b44f38lgou3kn8jzcthfth9lxcz7reng3yid2hkp7cr7n749o88uv6a2hyobi1s5gc3lzjzfuyd8uo8f64m3m1xibqvkg8hvi0up9i3f319zqskhxo0agzkm6503ulrbv18zkddrtqyudgucd42',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactArea is too large, has a maximum length of 255');
            });
    });
    

    

    
    
    

    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentEmail has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'jx3vmqdmq77ys34n83zong5k1xn631vepqp8pzlhf5t0013yni',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'lp0m1c5jjrl2s4eo7b9t',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'kbpqyhhme1cyl6nnqz9u8o6if7f404p6ofgvpjay7yl7t37jbxam22bqszcryji7nja5jku6r6rosat2avinf6ck7o820n95s3ezy02hto70vjkd0d3lf11anel9948m8bmt25366g9640vfxu50043n2q3mxyt6n8tqnwnx1r1cgkjet5zx9ipdnoozvofr6qhiai3338iyvmh8vaypx238fgfddwgfjctodfa9xl21n5ov90vvk1z8akln4pt',
                name: 'o86ao03jus2fy9cr7huiu4lz4v7hz3sumsh1rxrtnlxhste8t8kraiymud54u52r96wps1aqsc0m5i6jgyb1ggtv60zlon9bqivtpexxoa6jhhtxjicv52qe7tywmv4ho1kyxdfj353l95nkjspxnfqe2pa3acpx7i9s5wnt08zo0g0zqbsbqbnlfhvz7zvcaoz2hbstijb3we5nnnd44b9ii73d5eisobto1auqzmge4g8s3mxlwgnoq9j34ao',
                surname: 'csizlwhtvcd8qmcmb13znuhwl85g0f2m1y3agpeleo5onm673n789zhxacymtub2jgp3giayciblfu3ohmugvs02vf65uxtpin67bkxxhptc9p4bzg1un8r1l89oczwa3h90mx0zg0z72cigdx5ouqlxeqlzgo3n8spf2fh55l2s5i6804bpgt3sto5n85zjjg4rjk84nlarc7chkkksu001soxchw2732og30gxefaexqild87d3bjnenh95gy',
                email: 'bqbu5r2aawt6ory28hqczedc80q7zjm39tdka9tjo051vdpw343whc14yyv6nlyytmcdad3qhb95p7mbmht1tph4g0a0wla70vd1o7knegca8a6rwyf5j8wp',
                mobile: 'b3yzvh0hzqoiz4a2h75qm1sbaddfkkpcic9sf3rkr6mq36x4yowh12hw5pv8',
                area: 'z66lg84nz1kqofellxdiioxnf773jsypueoeh2qlbt4u28sk67b4ukrm7werub0qncacj0n6j07jx7b6w41po6toq1m8ykwccoe0wb0npzw8w8uqebvsktf7yb6o2hawlknw653ctz11jxlctt6r7ampf79krvphk6c23y7qoh54a0apzp4r8n95rjk1mp2b2u7jy7durcrka09cd3ans51e8vl6uiqim0qs5vlmyquq6esdihd92njyff85rpu',
                hasConsentEmail: 'true',
                hasConsentMobile: false,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentEmail has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactHasConsentMobile has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: '18ukdh683tqrwhkw2gv15p4ypu0kl0b9o9a38h8ij9vtf6cxha',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: '6p5ftgacdb4lyjqelu2k',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: '7gdzu07qjajguy5388h1hc6v2lnn6pkrkmf7lkrp7x27owiyijo803xt9lykj0w1alyvjhnewolwndsl1aghrf320bydu2elui8gec7re20b1hwj6ni4j7xkurbbj8q21lktt0bn3iji3lvvr93v2aelekok7ffp9vk1cn0vy8mzhz8rlxkkujwiq7zhpm433cm50eq4l4vemdxrvfra9ud3n6m24a3tcg6anztpr6xy7k0mha9wvclxwnnbgmj',
                name: 'evddgme8v3hjbyo34ozvd6st5kr9ql3gi9qaflkgmfn95sjz4hi1pfldt5n4wa3ewg87960pxhlbf7q0eq7o3vhz6zu496n2vwtcty9f9rylfg6jfj53fogrznsh8tpu3c04oqjkshbc58ftg6t1xgk8aklibyya6g2uaztqree8ldbzc9nkj1y1amrgg3v6mi1umf72j2gpb16cw36ud3m1701j6iyb15th658lqp8w0l0nksv854q8fg06tg1',
                surname: 'yb8c4pjtpnq7gbbwe36qu5pnx7mo2nbdl1e6801tj4wypdyxgkg5p2s3smsh11podnaj39tue54xg1y5ivn3bvtt8m6ctfoycs99i0l5qp513nok3xt275njwpj85mmucuzrlwnvcmsr4da6ijtb7c9if7fqs655pc461rda2b7ezbz7rbix2w6ofy7lujwatvfi72od0kugfxl8zgrjhhf1xivfzhfxfhii58x47nneoeqsvchxif4qp758zi0',
                email: '55015l9qe2j8401bp59f5u6k60p0y0m2w83h5midk7kcpulgmjh1b6b5xjqf45dqeubhexhnji9y3100uer8hwv0yj0lnhxylg8s83bepl1uecsnwlk033lb',
                mobile: 'va35ds03uoidq0rt5o5sxkmh9f0axrqp6vc3ovci13cosy21eek4t48djont',
                area: 'azfbm5soadwmb3ljp36cft93dva5048cslua83xs9r9ivrcr0pic7uflio6xpnpjx7ub3cvxe6v9oaw2ueihdfbw4ytypukrg52ufg4uverbstzbrcnrcxkouqktql00bcm4p7i35ykhsae6069jmm5cjftk8h9gzhzqkji3rznrh7f6kzwrza572nq2pvuwrkt3xxpmqtjrplzhzdid8sol63p3os9tz09e8p2m0b9u4z1jltiq0xsyz3s6y7s',
                hasConsentEmail: false,
                hasConsentMobile: 'true',
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactHasConsentMobile has to be a boolean value');
            });
    });
    
    test(`/REST:POST bplus-it-sappi/contact - Got 400 Conflict, ContactIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'a69f27s864bfxfqkkdon4s6thm6xzvpgg63dkuyy4wdy5wnyqs',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'gis94m219covgvqvgb7i',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'jcv2eb86obstt1jw1tkgzdfmo5mag7i4p33un64v3khy40yaghk7cbuysrdutg4gvtpa63wh8d6qzjjlh12rbgkshar3jucz7bzdyt3dcahjzbvcmbqfsnxzxux241qx8l3dap13e0d2q02cmfoj21qukql4w7bx0jjpicmxtj6cwmin8j32hnpca7itb0hh81iix35lcid6ujk0eiqkh07n2nvoh7ix7o36yb62habu4bn45rseajjnphgw4ad',
                name: 'uk29g2j3vumgw8j9xcb8b3i5ppmegqua9uuu3xvbblv0n0iq643g2kwc3cw9e7hnpdxygqddgn3prb3llso9911ovgi66b2bd5fam1ksp8di60u09n8m2hie03lmafexmz38n4d4nn4a5fjccfxai9squhi7e83cyhm6ezzn9fr45zssxgu6e668qdz7rk20bkvdj47ivkia2vlfii27exr9wtlthp032v0l8yusuqarurtggtq4uh0550w7wo9',
                surname: 'fv42cgz30z0zsta6luz8mw4zagcvye3u7ni1f1hocnyaynjjxw730r8mq56tdqi4885bbwdd9dg4s7utjqm6ai5utudp1wn407ierzrwyrkozkjv513s94kotsfa3821eezoz1tda4vkuadsczdrikchv4o438c1gz196rh7jdmt3h3lr0t7dcwc5jfcld6st7lkz2t1ye1qy4utmy6948f88ky5y270hin8b0ia2o1n77q173buk8x743ix739',
                email: 'twetdrg67m0uun0bikr9l5j5z815tgovsw89ze0ucxm4m5e6mtaz3yrn0cz1h2bevdeniuwgn2s9xw6y44s89a6uf5nwuz4tq8gnjxygxovsy68ki2tgclku',
                mobile: 'uh0lbcvtrw7kwuji0q0376aa7pd86ipn2u8eg49oufs4hgcczonwf7byg3px',
                area: 'tru3yxuj9g0fmntjywx5aif6mafcyzn008n897tgs9k5q9hgz7nkmazuk4c990snfne8o90jnsk1au9ky5wua1ik6bmw2nqztjxh4zydaw385cjco1pf3lml1pfpc55j8o5q77w1cutk609xodto429miftaujb9z48vj0gmyhl8qi8qs36kkv8mog6bb3qfy2imyokcwyhhnlx7jjtggg5q6tu9mlvd41a6u9fq3ltl4pp2i6lh34aliesbw4d',
                hasConsentEmail: false,
                hasConsentMobile: false,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ContactIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: '71tat6l2abtuap8m5g3rksjkhkedr4h32y7qy7ajibjnn98egk',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: '39wi23mze1fh10hldjy9',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'rx420kw564deu6kfcfar1ly2oz3zx9cqv7mx305nofwytzxb5u0vygjgnxojzxuv9bjynqzh99sfxab1i837srerllailw0x8fpdq8abyn90848v4ll1yl21b1wklw4dpr6h3f2cpn6gatca8nakj8r65w8djt0xlbqykelcwefijv1exrgjn70erwudfm5kcx84uwxidv5ul6p0z7ohhlgprpgh8ismfbxw4p3myqloacs7w4ngyd69wvftmq9',
                name: 'kkubitvidpugncnkejfiambrntz75c3azw48egqza0qci5k3ycip0exfg8ojkh1xstf416fhb6er5fspr3bysx2xc6fuwkdkyooszragazsl4qegziy9a1avbhri31caz0ay84r20q7ndlujrvzpsd1tfzoboy21fybsbvfej1b4k4kfk8by8m5dn9wegwjdohjobvddp42jvtn2q4sj5u507l0hscs9e74a1zdvcy3488h3bqwvc4mmdl3dlla',
                surname: 'hwii6v5kuzi5qgr3vrjwig8scuzc6zyw1o7vula8bbc3bn4evwx8dvrn075ei3rr4in0ypa7wkesqas9kv4leefjwg223q0cqyn3hv618kjacdftewmuesuerzbggfg6ixhhz98i6c9pf0qlo9hnhvd25mpbegia919f8yxiirfazamwdk437pzrklqfjl3p0a9go0p1f7wm5yixuc17w1pqgu9cw8g22xzc4g6zavycxnsn6wmfzxt84bkhln8',
                email: 'x20yypflnxebkxa1zvdyzek78x7u83dcp99xxc0bz0pgt0dwzhzskdw5gbeyntble1c0kiapctgclsndsx23yqyvgjg63iulm8edk14j4wdrqsanpe105z0r',
                mobile: 'evimc46ygykk997q357arynwy52n6e9w5kqdft5qc00lk1h3a9x9vbiqb1bm',
                area: 'hkrnv3k2kirtgdc2ngyt4dnfp3bh2chn68yeck21o702lidu0kh2o7p3z2ehwme8md5cc1whpuvex59kkhko7l6c0dxxobzzf7cnwbjfubp4aivjv2b8b48s4arl9im8g2q9olpwuo2ual9gl966myvgr0cjpi347wtm5xptjexqe8vwtbzj2d8x7hwaguzlq2r0151uepndmw81j8zmwtvw93kmlpnu21d7cpz1vsc13xsh7jryrkz2x5yjhnm',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(201);
    });

    test(`/REST:GET bplus-it-sappi/contacts/paginate`, () => 
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

    test(`/REST:GET bplus-it-sappi/contact - Got 404 Not Found`, () => 
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
                        value   : '75e4bebf-c771-47ad-96fd-bec0624c582c'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact`, () => 
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
                        value   : 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62'));
    });

    test(`/REST:GET bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/cf9c8ec0-ecd8-4228-b26e-0e05b608ec28')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contact/c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62'));
    });

    test(`/REST:GET bplus-it-sappi/contacts`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/contacts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT bplus-it-sappi/contact - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c13f92c8-a153-429f-9d33-3e3ebc7afc41',
                tenantId: '133754a1-7729-4fcd-b41d-b147462ab2bc',
                tenantCode: 'v1ev7qr9ytb54z5nddixv5i1tc17shbequw17qdtesmmqn9t8h',
                systemId: '6557a26c-5e5d-480d-8e52-d6f58781d5ec',
                systemName: 'dtwovwqcygus6ta3ec5h',
                roleId: '76f7db43-68d4-4e72-b265-14a730cd0bcc',
                roleName: 'tjvg0p0osjv3mwa7ltox2wv85f9qpp336imz9rtt3vs83jha61ijbaglz0llgfecw7wrvp8bqm6yn4aclegq3dt8mucd6sda005g42753gc0bgc5mw88z8i5jambsm6mlwhebdbj94hjutt0vod8tvtblayqbc3otwck27yyxrvgwuizjyky7mdhd2j3xu4xy1ulrneo7lv6mkg3k0hq7xxr186sq2rdadw5i0fjefiejru0lzbekuci1h5r4rb',
                name: 'myfj0vj1n5mrqluqpj3ujndoow0ioaizndhq8tuph7rxhbbdaqkmi9h2d8inivrrhqvj6pd9l9mjlgnm1amteuer2dfs9vds83ycgogy42lrgkl8ea25e43yqietn4z42asga2x8mgojqyulhvb6qxd9yyn0n9ngvjhby15qaaxj93btdbrjot2x8r2zfmegun1am790knineh5tqu8qgulghbkx5myh0gj4hibwke5j1aazidgfxfus6xnl3u1',
                surname: 'spyq7mibwx369k9v3ans76ihikkzzfariejyf0gxg1tarix5m3fdgooou5o6nayzzr7tn68y8vpcffgvdkc0djpp9w4r1r116iewexrm46qngq8zgq5d37bejzukmx96g9c1e5n6ujumw0rx9jb2i2gzc49lzyry429pu6ca09bis25cwineb9ky9806cumqlplwuf2idheypsn81sgv7qzppewxdnefhsbvagml9mzht9gktdflay1vdu4qybl',
                email: 'qxzrfbq13q1zj01hqobv20ko3g16v9heso1xsq497xbcm23sos30sxszu19oefpqi1kjtf3lubbht2z3gjf655p4hdax72kfeeuizmawj4tjjv3gmeebk236',
                mobile: 'by0enqysmg1o9zk38dc8niolkzdzmefhual9gs5kxog9dhcjrik1wmlosy9r',
                area: 'wtolbk0mq4lenksgkigperzev07s76xqq4l4zl1m9nzbz7bsy9n74st1kahj7xp6x0o3572ksciug5tv5w8pf1oif5l9n1lcfy4h8e99239ovgc18flz302loq23c4dtdnwsf0dige92komw6s9cdd5nh2jf5kjq1yyb1bwos8jcqb9nlxxeovj1qj5sul4myerp1o3oxpz2zh6zzk5bg57u64nj97qln20bluuphqrybez05sj3bd5r53y0b13',
                hasConsentEmail: true,
                hasConsentMobile: true,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT bplus-it-sappi/contact`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/contact')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                tenantCode: 'rshstkl7prevfw8jmu6uujcrkkdxukh2icpu93sxq0gpjcx8ly',
                systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                systemName: 'i6mh7lnyzkladrf9ibay',
                roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                roleName: 'k4ky31pbk3elna8jqlct64cy02gcgynga3x1thle9l53r1bxr5g80sn3i6m30mfb2zo4whp5nzpgn0xulyyhrqfk5xe0jk08krxwfpjrf7q33c4etlgz9rx1rw9d1m40bjkatg3cdroxdm7ruyu9xsqh4ctsmwaigjeabe2vuktbfnde3am10860m87l1h0gphzlpapom68cq4nd5n47nykl00p76nelxyi3rexab85xnwcet7yzn4iz1egf8v7',
                name: 'riwyfpw88hlkbyavjknjsva2c0pbxqvfsw67wqfb91wnrn0se5ur9zu2rx1qrcycxjgt3zpk8ke2s5616k2fq4o3z3mihx08j26efbdam5ecvong9gyzejz661m4vcc9vm9debgu3udt4vzcx1pyyfrk7rz78ig7irq4nne1n8gsvnnmk7hss75yy95uyl4lmd7n55pn24ddaikr5nzdyj0nbuz13ulvszsts6u2qlk7oejmv65l62zbfg0zwv4',
                surname: 't7anda3f333jzq8exnfcb3nq9it41u66owehnupqxbtytk0i4r4bnxaiv26hs179z3uijjwn8fpbfi41fdbby3xa0ep141x42uypf156y6vdhu3otof0yszvezunj3mw54vwlgcrwmvtar3fknwh4owkd8urevlyf78atvm98xgtzo4q8gczgd0r7wjvcnu1v6txzs238o7g0zomxhsb3c27d4zkkttc5qf7hmna03840ysqs045mssbtu63qej',
                email: 'mv72lx8u9uao0pwn0wepat7d1mimmfzhnnallc5orv5m5gp0fxcf3i8mlhecbpvf27b1s8myqdy47ytkzsx3txn56i6rcwb9didnwh6rtgfmrqn8i17vbksq',
                mobile: 'm9z02g6gcl5tdinr05vmye7mwh9q3qs1qo0hmuqt7as082km4gmnhu4vxnwd',
                area: 'ogauvbfj1awicq8dp9l23m8hvs21fxgilwjaepfl427uxy1agvy2eav3qol1fxkq0pzhh1mkycxdvv7sgxr7qfcwxzsp8kgx1a2fzlqtbfsjjaujgstrqadbza9907wnug7xb9zxswd8av7a6zpaizmyjo6h5c41ns6qt8sgglxakxx1g53knqvfu0rppb75v2b91dbgge00r6hb75ylfmvwau7thwp0iswbjrw7e3man80l7q4rzy4bfpcxdrw',
                hasConsentEmail: true,
                hasConsentMobile: false,
                isActive: true,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62'));
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/6f0f8bca-f1af-441e-8220-82e3541fa21b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE bplus-it-sappi/contact/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/contact/c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL bplusItSappiCreateContact - Got 409 Conflict, item already exist in database`, () => 
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
                            tenantCode
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

    test(`/GraphQL bplusItSappiCreateContact`, () => 
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
                            tenantCode
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
                        id: '3b87db51-280c-4772-9cf9-f122a780b923',
                        tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                        tenantCode: 'auk3hyok7vg1wjmujlu2l5fw88sq4jtf5b83489s4w4idwpetw',
                        systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                        systemName: 'gepmkeztds0ldfsdk1ku',
                        roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                        roleName: '6chrxn7j4v6wjjx3akrugkalxjn9g7dj5vow688rx4mr3jyxihb9al3ivn846uaeca6p3yywdho19q12ss96z31xxgmeywc2slrp8qabzr9itkj39maqmmgdr812pfs6t6rfhx57ganmyx1f6i0tsfoaux5jq9glqopsmv00pyic5pkgce0dnosst5czwvs10jmuk7csn31uist3p79b2kun5xc0odg9rxasvk1kzwmxe53j2zoj1eelvma5zdm',
                        name: 'k03q1ll6y6tchcqjnx7gvrt7yhriyldod724euli3xjvhe0soxl26mhzjsb9e0kdj4w9515vu86uqhe321k3097oxv27eaqgzfhc6qsajvs3g9mgecr1s4iima8ick0lptj7s9068hveyd0dwwhvzfcgbwgk82nhg72sgol8fwfzuajte3km2rhzgbzu709b1ppti67rho22l8jukd7zqame8h2gwjfdj1gw2dek5teyx2geiiwml2azfxjxpwj',
                        surname: 'reakc9dwkh6c491ah296vv9gs43l6n44dt7xh3a9nf37hmepjiwg592gpzkmkhyq4bihnoztnlr9pjrd1bmgbe8c1qp098ktwys0cn2pwh4i7elrogisro6qdh7zyz0y2no98de4i4wpp87br9nsa1xkqxsv7wyux944wthxvtklyzsq1laaws606lhfynfa66zfx64gbz2brf7949l4qltdk6cjmndwryc4abjg9njzqykuz4k7urb7e00ds82',
                        email: 'bthq6qhb1oidtrcltyzhjs9qbro92fnywje6o65iuqs7d272zb8r5eyovmrk4a2hbp01a0orbk41yi1zer7wf2byp000y4q5qqtlau82bf4muv2nedeys0up',
                        mobile: 'n9ap6vw0iqf3nu925usu1vtxjwb9l494zlktro0v2q5iv27ee88fvr8w4f5p',
                        area: '7kbapkyd66lm6pwhe47un9g7zmz17iau1ytutuxxktj6zsfstzcyrlwvqhhi0kswbnr9aeaxfep61o37nakgvcc1eagqmz217wk95t6izvu1swwyew0mjyq4zi714o6jr4nhc1xa088qtrur9ds90541pgsz0pkr2vxhyasjr66uvqej570ja3vcacogpb78fb27lqgjhmhgxd0tfuahydnc2jy9jlq3kmnqzwdsy3b8ia73jivdwvqwn50rb3f',
                        hasConsentEmail: false,
                        hasConsentMobile: true,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateContact).toHaveProperty('id', '3b87db51-280c-4772-9cf9-f122a780b923');
            });
    });

    test(`/GraphQL bplusItSappiPaginateContacts`, () => 
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

    test(`/GraphQL bplusItSappiFindContact - Got 404 Not Found`, () => 
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
                            tenantCode
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
                            value   : '9be63c3f-9fa6-4c94-8040-bb21dda1210c'
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

    test(`/GraphQL bplusItSappiFindContact`, () => 
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
                            tenantCode
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
                            value   : 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContact.id).toStrictEqual('c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById - Got 404 Not Found`, () => 
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
                            tenantCode
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
                    id: 'a58534f1-1d12-4f59-a44c-550a30abf73a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiFindContactById`, () => 
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
                            tenantCode
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
                    id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindContactById.id).toStrictEqual('c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62');
            });
    });

    test(`/GraphQL bplusItSappiGetContacts`, () => 
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
                            tenantCode
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

    test(`/GraphQL bplusItSappiUpdateContact - Got 404 Not Found`, () => 
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
                            tenantCode
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
                        
                        id: 'edd41da4-7db5-4647-add2-a10d2036fe2d',
                        tenantId: '7393c193-b468-4172-8339-d6ba8f08784d',
                        tenantCode: 'copb8lc8rgo35td2f7h0c1iu3kstinp1mpkslv2o2r34v1c0qp',
                        systemId: '1b47f1d3-94b1-4f27-8714-467276c8bd35',
                        systemName: '9mnn1uhy0i1rm5ewdlc2',
                        roleId: '66aff846-1431-44a4-8876-b5a732e24a97',
                        roleName: 'cae7fe2r3168i28dqsfkbifd3qug6qpaxufsfrb2lwzl3j4zil3ndahagsytka78ksrov7ksoms6e8y4jwu22yyvzauduxdsn7ax99dxcrmklzsdz2ajpbnhsq1bjcfqmd6o1tsu8akeyx6ctjlnj4ki4evljdekb7lu8448rz30rnehu06brstokqqdprb2wbdikryq7lc9mdi79f17owp7p6rar2t43m1gemymtshhduivxrj2rye9rsszzej',
                        name: 'vx4negtdrkrh6lnnkkmgowguj0yhxot0iwkmrov0sh2ouu849qg2s9xlv1w03ahgy7e4zl8r8922zifi2bsno943529d9ywq94hfjz3c3y2nnj83lpobq09ouu1mxn4sf4654l20btcgzh6ehpfre017akbdtj8kb1qkd3e1t7xqxjqy0o0z4ej3m0ctinxq8cg5qc15w83oyg3xks711c3z80ceulkmdb9ndt3dk63mmbtq03p27jxjzazxn6g',
                        surname: '878ao7vomcd5cnqtjfkx65ycdzatjh2anjk93vu6nzn8mqvsi3insigk7up8a95v31uha414jjhuht86ozqp784k93hlk0uth29qodx48ewnftfzzhgr3kbz4elkuc4fisjms8kz5qm67w629it290gmza9ggjrlkdabc2449p3oksrkprfaxewpyxylv5ukhi3pe1nomjj5s6gngjvt5nf77mjrdur0ke9gkcmbvi5s3sivuxcqt67a8t9k9cb',
                        email: '11bahrk6e1p7kaozz7fqejcvt5i7e2l4zzxpyu4ca4hl3m0w9wt0rzw7o9rkhdss4p346jd7y6nyq9k3v61melqwe9p61vygyrm5njl5n96wvwdkyyzl95ge',
                        mobile: 'xc1ffznshot9cwthggaawjqqadfzns8i30bzxhxtv33muhn6z25r29y8wcbd',
                        area: 'fh2wub6t3yhm1625feell4dtnxxghn7wtel0l84h0e86auig5vy2w951sxnffkpr9x2j4x9twccaisxbfdpgsy2orw1cd4brkjjp7evjzmgoubnenepmbs32v7pioewlgy0stzpks5clw6x8pj1fpfk49p75h74qukcyyztrk9zfwnj62a31u2ymyv9oir7k9i723jhoa32sggle6oiwyb8qg2kyi2ghfew45ai90y6szex8mlxvi6wwq33jqzd',
                        hasConsentEmail: true,
                        hasConsentMobile: false,
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

    test(`/GraphQL bplusItSappiUpdateContact`, () => 
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
                            tenantCode
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
                        
                        id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62',
                        tenantId: '45bf99d4-ae5b-4e13-86f6-2ff1a1074f3e',
                        tenantCode: 'quk6auoct8dwlfutbgi4smtv4pi5y25wz8x3b02keg81mrrhfb',
                        systemId: '1a53f617-42a6-472b-90bd-1510f149f1d6',
                        systemName: 'ampli5ixbgr35dgytu6c',
                        roleId: '94a94c4c-37c7-4b33-981f-a8bf52bd9bd6',
                        roleName: '4votid9kef065lj8op10uetuypn27u0lpup7ib1kkmazdiejf5r6omndn8gdnxh2aaii5x4r7918qkkmoo2w3r4xif7qz4fyg41uqe3fpibhtnbvgssqa44wusq5imh92kliyt5avlzf1u1b8xlyvvjvxzw2svh9129154yhi2wqy5plxd27mhr6e6a1fmf8eh0u8axoo1pn22jutzro8v9s2ftxgkhpewfxardc4o68n5s1h0udbuthnqya7vb',
                        name: 'p54p9ymxgapbofn4bdgusxchxkfiwkbi7lk6z66caq6m7unbi3jftkfr592q79q5aw29764tmdrc7vsac257vrg4f0rp271lxa4d8m66b0k7gkbd3dmc0bdyrdo582j2orl021xz7qtnysse9byc5o18469sorfou89rx9i7rv1u496hrt60jhfkexqs78vzh8f4kgpl0a2w8c8h2rpycf4kljbr60yd9b01pfh122dg7xk7sy6htv63s4uuf65',
                        surname: 'ektu7cp8k2ac9i6jxijeev1k1zvbaz9g4h7lx95o76k40pr33ojlfxcrtirkstfom03y9clsbclgg2y5cmxhh4kmeazt8ay92d1eqnjjwd0tmvl9szqyl707nh0gs92m81b2x0nq8bvhrx9rsxlfmktrdotspqu3kc3mkas33z1shyrpgb30c2pb5362753olocv9e5amicaw8vmehga0qv82zjmmdw0w5g3kgbyoo5zsbfc1u85p20wstc6roh',
                        email: '418y2q767fyz6esumf0prg17zg8pk28j83zb7jqxw26ga1gfdarphtfpehhf70h82wahqzmitbk93pbq47djtuap23auu4t8rxiplktsefas5ghxftxnxmrr',
                        mobile: '3rqztl7r73f5ply9mc4atsunnfp6z65bpxiiuisf4hidw22of3hhfarq1obb',
                        area: 'mkbmj6yh40q095t5ddh6x8zl2nuqbk5lp9p5nomgip5tv22jdiqydmdq8kaxqv08fewogya3j5nc96dv0mlf8bath5qwish680gr7wc84ue8h72ld1a1fpsn623jduebxl8mm1az72l439al0tsjq23tgyuzzg0dar24jjw5jhmp7cmkk7i16iq83cnioqa4yi5b7h3xan2py1glpeo2ynk0eznb47hou39wwmzkwlw6zcq3mn6plswrdpfzthl',
                        hasConsentEmail: false,
                        hasConsentMobile: false,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateContact.id).toStrictEqual('c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById - Got 404 Not Found`, () => 
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
                            tenantCode
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
                    id: 'c793f99e-cd6e-432e-aad0-9cf9360c7ab3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL bplusItSappiDeleteContactById`, () => 
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
                            tenantCode
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
                    id: 'c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteContactById.id).toStrictEqual('c10c6d26-1a68-4c3b-b74f-3a8a3d6cda62');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});