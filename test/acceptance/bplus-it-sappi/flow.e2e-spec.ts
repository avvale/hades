import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IFlowRepository } from '@hades/bplus-it-sappi/flow/domain/flow.repository';
import { MockFlowRepository } from '@hades/bplus-it-sappi/flow/infrastructure/mock/mock-flow.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import { BplusItSappiModule } from './../../../src/apps/bplus-it-sappi/bplus-it-sappi.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';

describe('flow', () => 
{
    let app: INestApplication;
    let repository: MockFlowRepository;
    
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
            .overrideProvider(IFlowRepository)
            .useClass(MockFlowRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockFlowRepository>module.get<IFlowRepository>(IFlowRepository);

        await app.init();
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: null,
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: '41d8fyui4w9jiti94ya5',
                scenario: 'c44ck3zfrex15cnjiraeabdwcv88d0nf6cre15dzxbde1qhuabsdmfetilxl',
                party: 'e2o7zx57frcgo45iogprhr3mnwutfqng1eu996qfxtfqmikoa31hk5gdl8swyos6h9nn7eado4nspkxlwhlkipygw518icf57hd9pogfpsntl6xt1njnt3vd6u6e23rfygj5e0fgoigcnvhw63qzo0schsht483l',
                component: 'ddwu50745vwucdxkqdkukcwtv86wubk958h2zuw4k4na98d1xh455hl5g9tqf1coomqdeqyis1negzsg4c2mzp9jxe6n5uuk4gs7fauivnzes3ex7a6zdb8y59mj9lvbney7rrq56gtmplewzniyrg6x9nsr8ebr',
                interfaceName: 'lmr8hzv51nqw36i9rn9wrz6upso8max4gz3tlgjmaifdw4yohtlk3pl098ukjow0ochwysry8ph0hsc5edoemtiz02zs0x71jhaioc0fj08l9i5j14qmrap0q78atnnnt0ptvz2c0vqi16a4cd79ou541kus6j1e',
                interfaceNamespace: '8sgm6oqhsjawegc2n0mlo0hq4ue4drxpet3pksu92fwp5xzugntbfsr5i1lp04hc9l496ofrdmwew3388mmkpzuj07b06hwc5igjmw4zr3hsqjhhw0vfljcsxdwrvolw4ke0tkruqmjsqqyix3li2dxi5gbmxs4i',
                iflowName: '99rfysxxakgf8d47gl2jyln1l0uwfrrl7scrqpzskwjh7zz092di91mq16vha6s8oun1r3ttya0v8hl11bvu7qgctkeah70m9npnp8i3z10qmcu84u4l240ponbg9o1sgkn18ilgggc7msl4siloj0sdnhpnrg3w',
                responsibleUserAccount: '43uvcksc97xklwfcu9qp',
                lastChangeUserAccount: 'uiukqcvdxkp641kqgiar',
                lastChangedAt: '2020-07-06 05:51:45',
                folderPath: 'f0bpx1n8dxbxrg9wpk1mk142eg1h3lac978c2nb3t3omtx3y8k818izzcd5bbca1bjls3jix5jb4298qpa8rc2x8u6ec6fgthmmd0e0eylvd75y4sm7oc2jgdq3al20wgl39gd4x7r08yjorfqmt0lyq8vmdw1a6ik6y2szuukc1e7tmrwcuyr5avlbqqmw8ay8w80uxk64l3dgp9wm84t9b7dbmd033bs7tkwmyr5vwr7pua9phmgl2ykf13j0',
                description: 'msloj3gdydy77n84q91372anpa3xwb3ap64cpgbl7szlpe3qvt7yswdydzwjmv12wfp9yqebk0usvchqveqs81av4wgrnzxw26tgohd1xog3tmqm5dp0l9dujgqcj8af897qa5xnby7es1wmweyi0sslx5gdeckv2v3uk6ckm7h5vnyoj2k2o6epvglyjz9gbm8breocdi3234altjxv2kgfcsx11hc2myl0d4hckx3np3sinmi80om8tqdzyyj',
                application: 'ycwlr4erbdv4bmaotixo4x8x222x2m7472bxmqwm461lcz7d280tdykp209a',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'qghbmnpqbl7krwv6byk7',
                scenario: '61fz6tb2q280ael6taxj61guz2l3pvvkk97ayo5b9c41jcjyfsyecs2y9z2o',
                party: '9u6v3mytao268nvszmmr6y70sg96sbgeva4ro3v4qmp5f1pstl8emd19qmts4ylxfj57jds2yzel0w7mjnxmlfjtszixf8kvvyogi3niyfeqpbp0vmyp6xp7mcnwqp1q56zj6dyeo13q8lp85p651uh2do7o2pzu',
                component: 'ft8zwnckg38g5zk6elzv4p96srqnidje6zekqborlxftnj5inh1e7ggzpesiuc1zirzmij1y3jc67gmj1ajmbg0cqg4wgn5641j37l0d0478slad5k3sstbkhzow3momswn4t1vcqi6ab5hlnk1ft5xipm0rphdq',
                interfaceName: 'g5sx5p5t7oxa9yp3237r3fjnlvh4ivvl9rm7ecdplc3f8khkffz4bfcd5zekhbbd8iqx6shhafkq538rlbu00hcx6gjsusyud9n67zpk46f2a4eabmnvdeuq419cuzh9s3vd7u9cmat1jr73e8b716wbe5fpni5h',
                interfaceNamespace: 'v9620dbeyzmds70fqq6wk7sasyq8rlr1lvi2vg9ttk881ogokwocv7qfomtnsdk3hmo1t41sx3kj3m5cf8ao7ybzotwziki0x1aw49yx0qeqla4hl35vlk36ia6e3qvgdhu81yi2dcr4zh72rhxtzqf4rrrx6ypx',
                iflowName: 'eemmslo5ly0khz29mkjgw505oig0aq1hhja6pzlbdxq93lqq9r3az7kwr3cerqopar246i72hplg877oax0valhtudkeyfc0z2fb9xiqb076gl91wtazasuimlajwt4j1dcp4daz4c4ueh9ynqwe6q47vauvqx2s',
                responsibleUserAccount: 'bbdtzgsm2wuokalbnjgv',
                lastChangeUserAccount: 'e0g0z0jb8naarv5r6qb1',
                lastChangedAt: '2020-07-06 00:52:10',
                folderPath: 'ecz1uvjblle8u0e0sdjivy9rpv1h5ni9d48yz4e1e839sj9ngjq4jod2gqs6lkgtnilytxlekcgnyl2k1gk79kw78yy1lryu6kd8okhlbqcbjry20bpi6lbixla26ccrcci9oa2rt89n0txcgf0q38dygvm1jxnd67oe7qiohsij72srdxyzfhs1a8uwnbv098zg2vjjuoe808w9us3ftb4ecgk1lbw68ygwa09oplahp21on81j0fcwq8tq021',
                description: 'v57rn97zwvxq30zk9fr2w9xbgt4793yt1r2vlppsnqwhtpgxqm5myrrwwoem77wbjrnnvftanrr6fqp16nf0wzsw66l4jxww4p7kix1n0081ebn47k727lra8u7ttkh3mgs12ey6xalai8iew52vwr81f72olakcwurtxptcizrtssl2u3vk0aas10pbc0zktvsyqtjtlzs0ffhicxuv392r8wolz6n1jsb0zu7bmymbb3md1xvk7ej4pzu98sy',
                application: 'n5c62bxsw0kbdhw5wlim9xda22myhxe73ebwehv228o7bfydppt475r2szam',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: null,
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'ki9d2tt73xive7ayoap4',
                scenario: 'vms0v2sds055kvwrqvhswkvpxbzczpvu2lgy7tfgjcn5wmv6el1dmxn77hzg',
                party: 'ockj9ml8rnsrg3pl8cocqyukh389cpjqhyvnqu50urnxicja793iw860ah9li6v5ym3arw6ttqrfxwt3g6k2oduz2f7u2aelmh0h8t2j5rte0e22unlw41nuqmweiuo3y3wtineogzii3091ejsjhr3dkyqlf9f1',
                component: 'l66jwm2oxiaxhyftc6iz5fq8aip56ch7mcabmj2h5c0kcjlppnwloqef2yvw17hf1ktufqz0wgf0ge505hs69bqepwt3h7ekvaz49bcqsy7dpcbqzlhv7o9c6okgn118r0d1wn7t62own13nifd1edo9j31n0e5j',
                interfaceName: '90emh1s4wpxk2c671epb6ba38fv8moa4czdb8jgnnqw4nigpmeijgrzqz911js0te7ysfannui4rx292zjxul12kqlccs11zb4dap5f5ggq8xymndhy2tx3w3iwt6g125clv1x9p8501rq8i3eqfx6zfcfkjcnxk',
                interfaceNamespace: '7cuure3t0v8epaf593bkh45mgsft0xq9c12oogikn5f592g5vu8zldi10r1q59b4zk5j46patr0be65ehlpy0o5l4lfbrh34x06r7c1bhyrvt01g425aqhosyh5yc8egi2f1aml712633e5s7mlbddoq0edffem4',
                iflowName: 'y1vfpnad8p75y414ir0sknjdvpjc3svw8q2hxve1ea918eyvljwc5k53u5jev9w55762e0wvw8fu93y7iojhiz4oswoiryhwpll4qfrclt281m8tv0v3qzktstgwrg25st6lsc12lanyyr72blxjac7813s8y91n',
                responsibleUserAccount: '9mrmr38sv48156pik3vu',
                lastChangeUserAccount: 'ejemntufe4dmd3lm2w1c',
                lastChangedAt: '2020-07-06 03:00:24',
                folderPath: 'to2siraf0ucfn5v7wjh7i0sq56hp6s6xq1huype9ow90kcwkibl0plu9mta0z0layqj0wdy6cnjomyryg2jtmx5omdeo3g8znpkqhxhiqzxtsqi0cb71hmwuacfoyuzqrztnnwl2yuynfjnn64qlz3lgpv3yim1nze3emkqokwbzlemhnz12kckbyr68vkzi1x3vmkrsbrrjug48vpvepx9dy276y7zcdc0jn3h7abk794krckblnv6mehvjckz',
                description: '2e5p1n98gvy29mp04aleo92ijj3uhmipmnwf7miweyf9u0339eu3v6yqfl8rlnoze51u6092w75ab2t8d70xkng84aa8h6cb19apisojoqtjj0i46nnkaogrk1adxoyo7lvjf7ry8vl2ebzesnd39730gao4vicvy4qdeh4vbkfpkiwm9ejk28fg6191jjsye74oi3io76c1nbnryk3w7chjo6uffx50r0zj5gztnb2462jtl5g537i7rozrllo',
                application: 'w1d2q36jkzi52nexi0qqhxi323q0lb3k2sorwyv2d28bqeheato08f4bpsat',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'mjskncsmyn5o60r7q6tt',
                scenario: 'g62q9wyqflnpq7vrbjvgwujp4k9oj8io4if4s8itk7qcs1qm0ucdpypqplqp',
                party: 'efod6s90rr1efrjh7d1i5zaoc2j9yfyow9ythob2qqogy09ywkuykgxk24a2pbqqrl6mmwu3daa9tlqt1l5hui7fft48aarn2laokz31y78f384nbo0lx4c9jj3254rvkqmva7a0ilp81y7c4s6wywf3geiq1f4s',
                component: 'vmfm52bsnmrik03om435nrtcmt4rwwbsm1v1yrryjw30qf8wjpmm072l1nkfcfsn51vwzypnpu0f44y4ifr1dd8gdguugekm9cknrbv6lzdhjov18wjndl1xj5uq5mxx796skyhxpu8e85y6q5cafsetbx08fwv8',
                interfaceName: '387kq0v5stlgujmlm69l9zpulcod46pnbba9nlewljat0fhx2neb5xih8aqalnyjtu26qub28jd7qgxo8gndiai7jy1lhr4v3nqmgz3gaij2vir1ae77wt5fvayrv0xtinolyb5tzzdl0rl8gmvyb01w7uzrcjaj',
                interfaceNamespace: 'h8djohmslkg9mj1q0s5co27ly5oa7r8y9bw3hoahp6fx41hiim3dlyc2xwt0ovj5qsdbngbzj72cx88iew37lystvnvrs1t125xjfqjr00m7aj6gfpdey2vuzzwkuzy6a5vi6kwlp9o8mtlmpmh74al6x3vtx06j',
                iflowName: 'cnwqvnhj64wdf92kg3p8kiue0ll20u8x5ogpofaakz9jmdvi1h3edpf756ip6jv1tx7a5pda8rkujgiod55mows15vdpa4xa0ahijvnh039m5b3krzgqfguh974l0fdd40u7masp98sp8ypp06rrr5nmbjgok4et',
                responsibleUserAccount: 'dexbhrd43s4ecxwgu8h6',
                lastChangeUserAccount: 'sokc6hnuz3ijlrswc4s0',
                lastChangedAt: '2020-07-05 23:11:11',
                folderPath: '17sawpbon8o3lzagjrzyugvxvkxmqd1znb7m8cr27ncmeq5lfmask9jhl0de3ijzhdtv4a27eu4pm7717uk6ln5zsol7acprbnh5xgknrkij9tc0icz9bpqmzyykm9s8qa2yas95aoxue0726ltrlfpdjes0yqa0gsvun8gbru1p1613h6zcvt9a4yfv8ltjohauzv6dapg4sebgkq6o2udbvzfk72gyxge64xifhqi9aqzax8ky2hfvkazbg68',
                description: 'e2a19d2864qsx8qtk0643pophaned665hf8d95dym7hefdfgk7xu8acqxtvctaxmdo5ll0qxy9ymiq2r10muwa8uwgpcnu640382xp5cgt4kj5l3f83bhrohtmay4jkr2w9esqdyw53uk3mc5maglvt7yselrvw7skiz0ospuquuc0rbeunrzttq51qpv7vqnyaiopdrbo390aj9qcnd9izo6iiozc6fum61yuy9gif5edh08ji72goyf06rspp',
                application: 'p8xp3zjwmsruy5guf6zma7mj8vvkznp34xdfej19mkbw2ykr8pckk1t4qgkx',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: null,
                systemName: 'za6hq5r7anx0m3lzdset',
                scenario: 'fn9l6f5ulbxaqlipkwazhed5ua4ne9974f6x24f7eq5n2uybw9k1bzfdyo8d',
                party: 'zly08q9ezw8z6gpk8hw58adsuzaligxxi9zbln80dyrokw4egshmur6g0byossje2n1yx09ztr3yrj1hbyvb7lyw5rg2fqsxnv3fh6cosbvetjab18c0ankve37y4g474edyr27r8ohdzlecvk1acpgf9e5rlmjg',
                component: 'antsdmg2ef1qhbnshex6fy47v8l6lsjqp3pvvzism0vmfnlgr6yxhtgjgl8v861gthehwenmqqwt76wpbp4q8ur44ec7eq9bmewbzlletsbo3ss6v94y0v45yo6pno5g03c38tm73axz5w19qi2oztyg23pdagxx',
                interfaceName: 'pexgdvkrw9uiknkx58krd8b8bn4761yc3hz7c6unfw0e23l0jby4e34c4fnf772onfyvenjrspdz6rkssyy1slmrraz6pzwgvjppo10lx2f5vr3os37w9v3b3bze44idbylik18tu4vbfbzjev44408a3onoge49',
                interfaceNamespace: 'wih3udmaa5fi604hlnx776fpgooqzyyhii5cgd9fj5pqevx08ttyaq6wesr8gfy320bahrijwgeu63iq3acshe2tkilkre62ntvoquxnoe5xabo1i3pvlmbvjarfu0rh8p1h27f0meagd2wl9huevh0wb6oetsts',
                iflowName: 'nf4br1234fk1tad5svswqkrh8l7yxfca6zbde4ouec3nvat0tlax0mmfjowzvk9l1c2mo1nc8wmvqiaje6m0j99xepkwp7tepy8lukuyc632g86nxw0eadkofn719tl42dtmt1nirqqr13ckpciogokqccqdikzn',
                responsibleUserAccount: 'gbhx96hqtqns83nr9whg',
                lastChangeUserAccount: '3q0dejray71qmpff88nk',
                lastChangedAt: '2020-07-05 20:10:46',
                folderPath: 'uiilewm5vasi98d7la7glgkyvxa7xsg17y1wohqhl2ko18vdkmwft5ip0vv6ek55w6khnpz0a83g87p2anxn30gol17pv6wjqm80s0tlw9p4es9zxs7ei2odo6iv8de13vmuq69qf3ad0o1lf571ayjdlzrvkvlw97dhrbes3bi5olk12xggmwwbnebjko1d6lrk8n806xb2hxg2lfmo87ui0xwo11k5kf8975prfx0nh2iv8uq2jt6enz2q2ho',
                description: 'nyi3vlq0cwmt912ygw8cr1qkwvmbk8ljd3ex9muabdt1n0ke0lqkg1e6yoib8eyfpvgso5ijl4p7foi5io4h2s86ai4m1e7zc6rqydrhd2ryjz4gat00r0sb4bxr7z9dtg9arprxtr3qo6xjy31a1rv6berygm6neg9mtjpeb2bxpf418dfrieo2nlx77ok7cck5hb44zii3qtiweuvaxah4jnefogw1acl04l9agtzyo59smz8p757anjvaasn',
                application: '6puzmdbk3fj1p7bkzhst0g43a36i2f5vl6pu76iqe6nfuhx5k9y1avkwk7kx',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                
                systemName: 'lgk3jfgouj6ukho2bmtt',
                scenario: 'custbtn2oi223wrb8cez3z0m3o4p1xdgcj9kdi7eakge7we1pzu2e0wvayw3',
                party: 'fxxutwus5hb0k29y652aeb7jt7az0h2nokystyr5uo8py5r5xy801ieuq3myw0fv2u5y6izz6l9z4vqkp89ew8v27bu9y7k049s2zx0mqqe7veskg4sfj5vjjufgcxin1lz5dtqhyvpard4bo5wwbgfw21b6aycl',
                component: 'hci82ymih0jou60dj5azjd6kwpb53tm3g4x20sdljichvoca8d6e1kj2vg8llk0k8jt43wctuqifsbihqdldys6xxzxueol8kv1kjx7i3kwcuqbqcqnuuiy2cvbdltj8tgdrwag15v44s3o5rvft271hny3hq632',
                interfaceName: '5oxzh9htq7phmzjzvnf6ffy9qj9e6o5786sykkaxmlqbax7nf1lsonfv3n44psmyypv7otgmrfidq6qj1z0d6yemge7vwrox43tuesa2kzgp4j894i873mqpigp28fl9sqjv2130maa09h8jnz6kmphjpml94z2v',
                interfaceNamespace: 'go61l3mpy9pklexffcgvyb53yso2nljex54gdo1bb0r6951z35vitk8lt70ojc8ue3vztamqwqvxjtthjbg2yi1d0an3n2etj4vugatbbb9qlbuek3hbqydm45e0oob762u3spbdv1euvrt0y2dif1xg5w2wtvia',
                iflowName: '8120evwr8g73zbyzl8iywqowynelsyfda7jm44yqo8gyeouabmav83tbepj2sc8c1gb2ibetvws4henmu7b9swgrhfg6wsw8z8exvp052lvlkdvxx20tuzno9k3zypdcog2szle18m0yhlo3vx7c55gu28hjj0qv',
                responsibleUserAccount: '0e1sn64g7w5oassd7qss',
                lastChangeUserAccount: 'cguox8s8zvxnk0ahlx88',
                lastChangedAt: '2020-07-06 14:31:26',
                folderPath: 'kr5jo2rcbfn1bqjsdsz69pqvnzczub4ic4bk5ggjk3u4p1a15e35vyxciv4qyl7wkewgx4l0by8ynjj7opkhoy6pdawnn8y59rrqjt2fscty9fv2j7hqtyuzzvtjfzr8tk3viq8d9s1eigz2kbpmvzhx1j5e0fffruoua3ljzsl8cetbeqvxd7vbizfyeg4g4w3b65yz9dv1mre87ocibf8u43a1gsnr739n7pz7v5fj45gws9g2pg8tdsls5ow',
                description: 'ktmh4g7sb61p0km55jjl95d16o89yeqnwhbrdtqmeqw3f3w9ljar4ay72b5v5b68fpuuyinsodzu9auny6ma07axn4x3q45gulja5u7k301thnfo362lhzdupc9pc8rb9sbdvezcxaf8ph54aqggjzclny26swu7ajrj0c9n3p9fjsuj88hf0wgcdvn2k65ftw128kdhqdrh19vsyxf5d723feom2f3i2sipovyvbq0m9e0780txlvqbjaucwcr',
                application: 'n811u2rkelx8i1wy294pv8n950ezs2brc726836jki17u8hejskmg2igf977',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: null,
                scenario: 'd65sgr4mm7ctgooetbjymb011xmvqr3o1a286fwichzudh98e2v3igvw38t1',
                party: '86jwvl2rbutc3q6122kia1ggkspk69obpc49isa2mm4q8txvxpqsfhf5tarppam2t43qcsoy6adpe3lh0ec7naxpdvfe3f9v7bbyrl0l8kcrtej1tc1ct0ovo55jzcyj5em8c37plbm43u4s6tsetu74fkwawess',
                component: 'yp8c6x99gysy89bvkpjwzhrzkkg05zxe1agmfgoinmfc9c2o0k4c51m3hypivr5ecmi7zpopafy8bw7021w7ng7rpaf3z6z3wr6w977k1hduwy6okcmp0gkiljuk6k61spkw37xy5zf9bikmm6ub8n4r4hjyxzrt',
                interfaceName: 'cetdi4f02pbzfd3di7rzjk92cjsbufyq7mdwpa5rnmktiec8c8i8700gcl4h8bwa1bhcdx9xun39b9wowggm15gnn92pgc5inndh0ytcgy5ochim0240j1edcwortaa6t9c2bcrk1ixloaslj0muim0icpvcijgw',
                interfaceNamespace: 'k0pnnsa5k4xyff88dpsx074xdwvyk81ltxqts4ofy1mvxqdkrtrunt5xhkgkwka4skghibgzejx2uoavw44qq7tdl9abdvghke9vd1nmdig5bpgwliwrn7hw9lcm9zgo1h7jatkvh9idekyc6rs427j4l1gslyx7',
                iflowName: 'hpio001az4keg65kelscqxhdjanve2w713hfgkgi5lxa91rnzb5xxe1qzn4junr68qn0siirtj8solp4anqwh8l48wcrbm8q15zo9c84wzhtyltdxizaczawdffqcky2y3q0bruai1hea4arosblcu60iw8dn7sx',
                responsibleUserAccount: '9yc0y7xachzmuoxosi4o',
                lastChangeUserAccount: 'lrw4mhgx9o1lhoylhqw5',
                lastChangedAt: '2020-07-06 08:53:38',
                folderPath: 'yl50w2lxlfjou9whnkjakm6vo7sllky54yfi2s6iue6jeiu0fqv7mot6rmxwknmnuld7jpl51dzliixr87sj4girmbrh2yeerq19bjykreheub4k2eyi92tviucya51qg0drg12fma1p8prdjqqg3o4qnar7k8qepvvmsnq470s5oki0i9xclfw63u0dkhg9a5zof3hffjh49aph6yvo81eu3d5qwm2fsz6pmzsrbfmq9we76ve27l3tnam06ac',
                description: '49ipa1v1swjofyda6d1be1phl5r5u78114vapl7qnv7qfr597kq8re3zilidg3npb9sr4ybm5arh3mzy7asgjfski960b10tfbzc8n5nuwo12revnmjxr70zzsd6ep0nmk5d1ykj4kunsduaw5da07w99p3i4i7yj16osgiqkn5i4022gkmvnwanaz3ohu8czvr5gf0j3vz0awdob93jky77etg3hj81fzcsitowt7i1o43hvkpb2akg2ya0odl',
                application: 'tj1qap28m075w8e6lt6702y19jdwu59nkchbg4nkxqpgy60t4ouxpk8co7ri',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                
                scenario: '2667ue1yuqet26w9anfbzjpamp2scyjn1lz85ofrsuhbkqgpt8e28pt57uob',
                party: 'brhh512mtoq5xqtahz88ki3fzqkekw9azr0h4chg6ehtlw7ai1kgiikl6x7b4iwvbcqzojgi1sfg55qw7i2mansraarxezk4c7rz0pn9miw1d8nvlfucjdygg5fghuz12op6stuiek1te5fcv7g09daoccbxribc',
                component: 'alb000tddzoaisv86nu9iwwwt3y8rdt5fmstyjfo4ryp1s665ocis05cm7v7qjp09gdltv70mexjdqpyrlutj2i7z4l04me36a70imryad7dr8vl1taea074zdgy5291mnszp38a82zfz27dn3nm8m5xspga7qjc',
                interfaceName: 'cwys1n5dej9irwlebuc5j2ezjvvtellbq3igb2u3cm45z45xd4mv84wvv46bg3krkjddyp3d5a4knd64j6nke0s9pekcjsoruzn1evl4rlxjo6wpooszeq16zt1po24ooait73fg9i4nvqxj7qsrjzupu0wgq3uq',
                interfaceNamespace: 'v870co2agb66z0v1tlzsxinlesrvff05rk1j9wo954eushupg7z3dn3nvr7cqjm7nydvqj8ptdwy7vc20lvovuifspbhqib4sjwna53hkys89nhdak5nnzrhaffpn0jgpgbiauyv1ubc5u2631oqc2lfcvjpqld1',
                iflowName: 'k2dov8gu9pkvnc0yrbxas3047l63xjodr0pbjkajt2w3kftku3s149nei6i28ii6ui1wckugh4457ndla7tfsk3jz25ft9k3mb4alqu4qjj292s5glmr7pvexilbpz3vkwtvip2rrdbeorlal0cs89aej9di2vbo',
                responsibleUserAccount: '82knjaag8plzwhiaxsat',
                lastChangeUserAccount: 'v30qgb8utv0iuzqsx56t',
                lastChangedAt: '2020-07-06 17:33:12',
                folderPath: 'iznl177isrf0ovu50dbhvnt167n8m2f2pa7zbc13odgcafllooga5oy6lh2mte3omtccwo5dy7zjl1yekbch0ff1cuinytci9s7v16ioqu9lm4e11nq6nqt6b1b2v3ubf87rwlg3ofc52elpw8tkm0hkfh8mk1iam96n6cdij416x06bf9b3befatqd4ybv3p059kitso74vecyxqw20v2jywwysdonxf927ya2bd8ke4qwxbm8ya035opsvnqu',
                description: 's6mwzl62ulzxokz5hhdsyt5ykllh0zpbji9gewyska1712moknruf591lz7rx1pncshuqi3bm1hcvibpuvasan6n55yl8jr99c5sm328vr2ooxwp2tlsm63xj2eztgwry7wh6zchr78ph4ztxy65ape82eznjd9o0mneypxrsoufvu73hmlzh1fpotzhpmrjmdil5gew5t0c9zbrq7n3jkdy48dqflgpr4u3wgpmg1x1shopljci1z5yx2sy3nj',
                application: 't1eptl88jztior9i8hid0bvxfl7apccybh68oktde1ko6upphc0407vohizj',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: '5xc93vldbkw1b8nzkbeb',
                scenario: null,
                party: '5176n98q3xkj2tk53na7edobf4ybkwyppxif1dcpsgiurd45jnet3dgud2trqpaev8uj9mxcm9m0x541plraba28h76juk4mkwm7oc272v5g3rjccng4p8gg2sz6ce1ya6q0znb2vot2dg2dzw8euf1p5oehenv7',
                component: 'atqp8nalb9vibe6d9e0q8tyn99xmg5fhojfv4xo6af7e5u503vgfqj24qxd1hefr8ag06glpvl2fsl5gxu64enhntvc9h093do352ayeu8yp50scpui5z41gxa574k1h6ux98jn341pjfa6lypm6n8wja1tc3h5k',
                interfaceName: 'o93y5qa929jxwykjrdsx2sa3goz7p39pcjcucmsxfeahf84ijxsu30o6xqpqo9vgh9shd4upkr3l62511y2d7ri0oprwmdt66velbycf1gtlh5bcrmhoi2x2mzyja87ptp69ywy3paaqla0tb2rmmnmsqdtcry12',
                interfaceNamespace: '6rv0hkg88f0h4xua22f8ufkqwr07mcwbnndkmnukxdx4p13nfj43p5g17oh752x9rn5m2yqyw3u3dwebkpurnmg6kjh7j6gkxf6ixcjoqy7g7nvza8q9zq3gdmq3lpucf8xt3rb617id1sae31ok6tr30hhvmn17',
                iflowName: 'hzb2xds0wo3jefpolllqmuktsduo7xubsr7dcefaggwr22bx395njvr3y1nelzn12z0skdmpl62c6g6ixt768waryobjw8s0u21quzbrwbzrbqf0tvojoqv4dd2a0kiiey6ycgn9sy58kycdmg91bopz7k4br9oz',
                responsibleUserAccount: 'laxclxb7zcnzqo9au5na',
                lastChangeUserAccount: 'e0wsjtlupmu4f3vnp960',
                lastChangedAt: '2020-07-05 19:26:50',
                folderPath: 'nyausarau005gbt9wvyv0f8a0mu5zdvrflrflm261srdxf97fxz83n0qwtl7vur4bkrfmo1cbz0qc8l1qpp85j8outqz947kjpw07bf0tz08wg6qkbbak4g8tvstjfstsh0wjjwgoai0e9d16yjy2auxyqc86aws1umldtinybqa4e509ezu1lqfexob28dbksgn0huyil6l5aw4iqh97l6211ma8lrltz6bxwsx8lg111z7edtdq36vb2235mn',
                description: 'nrdfnppfmznc2z4cytbxe257nwxu3v15da38g4uaeb9jcbykxmxd87de6nq2003hka9yb1reljjqocdxqmx5iln36k5adwdtsh3kdj3y7pr6qyi2vl2ggcqpfm8zrnaoko1t8i829679awohluearhve5tc6gpjocm5cb1u62hy3nq7a0sz5xw020rgw5i61p4n6vk8mm3ocvoiyr3onkmtp5nh88ppjr7ogmxk4m78pjctpgjc6e59dbl8k53p',
                application: 'p01yj22ft0av7xif3ksy1s8juq0e811iuf1s1juahfl9h5b72mtwe1k1kse0',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: '9cks7j5hxjzrrg1rg59d',
                
                party: 'fr9d70q52p6ca957z3oqogmney63yftuctox586mu5uvkzol9etnrmphvybzpimzx70ugh1qwuyfruetrkj3v2nsh23g3t22pdoqftrubdit6t0m48e964dwnkha4kgtx3705xlijwgsi8m8msweeuimth84axlv',
                component: 'zetwlfpjfrcctsbe6g3x8a41b5i8i1v08jt42ccopjd9md3ysfo92099wwuf2cyxlxpr6t2pidzpt1ehkaitykxlrv93iszafilvcurcx27p08773r73nrgymmk1io5jmahtod9hjcg4bxsk8tzdeszdni1eencz',
                interfaceName: '7l8qndoctvre0z67gnd96mbao6pvijdu30ycued121w52qmwghynwyw4sz2eqj89y1gbukqcuxqcwthk9xjfnnbrp74rnnety1syh928ktqqrs5ox6u4fhsetmgfcso208fslv7jsw1rwvybjgz6aeo7hsbujymo',
                interfaceNamespace: 'h40z1yd5nca344j5cj2w339as76j6379zr43j93prqa7wfco4nkipchc17ksfscuegc5qwoidgf09vwe9gems313cziy5givs7khi7ak5ca2usx5nxy3d0c06kh2rxdk9vg80n7rqkv0inwq3rf2cmx0jlgduh0g',
                iflowName: '0z7xqacyvggbap8y7c3sxyxoi76bvbztdmmp33y4g886fbxg7rrhbou0g3wg1vc8stdues7mexg4ns2dm81qiqv0lhubybn17o29t8uokxob7uixu2at3nxobibm9cyorrv3b7cmtczsrgz8g9vmk8newwa7viss',
                responsibleUserAccount: 'ymmu4iaog7e57lq2qjlf',
                lastChangeUserAccount: 'mfs46n7il9en8t0714md',
                lastChangedAt: '2020-07-05 22:57:35',
                folderPath: 'dmqt1spu6hvy2xg9kjeu3mh6qy6zrx9wk0t7f9uks1oa0exydc1yhxr1n4va0lhujm4blb5pm0l564lbumc2j3zbernvqewkc1d8xdfdbyex0iqvuwjhmhzakmiclqd297ltbrue2roxwwkw0e35ng2inywpyebq8cvy29uqc91hl664h6chud0v9fv1m01ytzb0z1dolrpm5mii1rsfxaf2w4eb3d5sxwhjrn4nxe9peu582mnkv2zu6jtvzu2',
                description: 'kr4fmzdjoc30phhxeueclr9c6ypc452wnxc5b73zxhoisn2nnjaqey2w46075upbvfzyl23wait8ud4jxhdt691vmc2w4c9j2stb9h999q1x74q4o9pe13mfbt3n752qi11ml9vekihhslt4r4za7qjmy6a1yjaoji9r0f84ef5csdete7mf2w2phkfwjqzdjo6bg2bdtxkolcvi88ayrvplwnlvldjev2dpf5wp6kiwkwdu8tz0u8a2phmyho8',
                application: 'q7cvf9j01hi67f8qxinlrg9hinpj5yswwlprd7eara3b2b3ermeg35kqht43',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'dpnsuddux7ampehl6fhi',
                scenario: 'lvz6m8s1osjfh04si77j38e2hqeeoudbto6lqlpbb2dxf4n2r3n1cm0cagwc',
                party: 'tx9qu7klrsds0iw7ir4zhoqy09kk85ka5sr9a1xrqauilvqmhx35lcbw1uy2g1f60lai654z571mhni8yi10zjc0iav74ttaohvl3jyw6ekoobiroupjz2fh32fhkxv54yo5dx8wrghwhniato89lxsx0le7hbdk',
                component: null,
                interfaceName: 'x865jfwe7ydmxtbydt3um3n2zf6q284svbyo0oezpx96sqzcc449zn6hc3gns6sh4d4xu6yre5jr2rxoak2vh3j0c7u6bqwkgmb2d688rt7s7dweciklmzip9r8x8gkvst9tzxehvkabt5amwigaizh3wxe5r6lp',
                interfaceNamespace: 'ixr2x0w36qllrxzn1cubas0rcm4vp1wgtyysqiexnfq7dfu6rcf503he2z67xee3aw1kydcr5myf38lzzpgjewfrg6dmostzfrorxh6rgtbo0bdgymxqazn62ohi3hvr9j0rwxvit8mmbrg6d6j7la9x3afs3ju9',
                iflowName: '0tc3uxqs2azigcql5gonnhe2e68f2zbb8vomlxdnhgfussxiyijs7fjo0iqyez3hu5qgre8oj77ijm5h7t7gg9gomxrnckawucafa5ah5thh69db6yf53yoseor35tpc8vuw15jnmd143d3runnjyq8aj0b8nmyw',
                responsibleUserAccount: 'kx7v54zr3xe8culehb7q',
                lastChangeUserAccount: 'li9rawgcvbvq829pmrvq',
                lastChangedAt: '2020-07-05 18:50:11',
                folderPath: 'p7gicnqt7ng0bese8edxpzcq7a6lnxj9vho4x4evdeqjzup7cg7juw6xpxl5d2mrrs03t0u11pyywdyb5pra5dqkk9oojy8f8zkku8k5l2qlsqklbpuvp4py9bckti17qbuuv5g9lw0rupms49zat2yr9mzezrklzp013t83l6paxqor3azave2fh7nciy5707f425hmnjuhhjv9nesmrftdjs4dw6f5nsp8lhbtivy0vn19th7syha3g47x8sd',
                description: '7uom6zgwcyzilyh8y4kcdobzksk4u63gf5vxnau4y3wy7hjcov50877todpngx3axnmqmsjwpusqdofwavxqutjudbwprhfrpfzger36ge2wvojiv49s6mxgzpr5xspgxo6o13unpgny254i8p0i4uz4on0lcsqky23skrwj9d34242b6p9avnbhz7uynugk4kdobocpjghur9osnobehih62m8hjl4hokqkipvern6uf1txljpku4zz4571n86',
                application: 'gfw0b82m5m9aodd5u5c01ynu809marsh4r0iwau4wii9ftiesbcmf3zlwjbw',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: '8q3r589tu2bd2jcxxy82',
                scenario: 'jtgd8dl3bynvy2xna69gtlweiccuappr1l85zg8f56xugeh592wx4j2hamtk',
                party: 'k77p9dn5ijukkm0jq9mwvv9glar9fhjyoaa03f4gg741yq0xjvzvmv9uynkl4x2odmd2arkhn94i7l198015qx04zinsrb0y0j7qaanvv13gpwex1n6kaiglllypb1nzc0bv3j2bqv4eda8rgi2tn0pch2g17s8z',
                
                interfaceName: 'axwqr7k6xc80j3s477pe8r0db3w30eoj7trfgewbyhx644v5fby0rwvp151be15vlbvh4ka6kotj8i46ju5k9ymkcqo7zluxs1kqg3701zpj15vtzoe3zg1k0t4pp87cegj70ipbrpr3kg7u9tnrstuls9am0ggr',
                interfaceNamespace: 'x7nahstgq82diyj7se7zmwcbtzrvpio5ik2n2x83sshuxawj54zm2jdkizz9zui51avpoi0our0ypasu8lrplymcpwcz9c8juwr2zo07mvbkkhascb2dth0cwage959mzf3wqqqi5fea3qy5va65alxkia7wrddg',
                iflowName: 'i7bml9zqzjzuzjknimz83wkr6ea5n0w6r0piqczyq490yfw5t98omftol3igjp1dvy307mu0u7lclakpn4om91ul57oq6p5pr4tcoepqvea4r90in30kyyg5i5mk8e5bsumofztegiel5mv1v7mdz5ae5zlf9v6n',
                responsibleUserAccount: '99chskgqup36ym7d8ttu',
                lastChangeUserAccount: '45c4998fkh4azxfqznln',
                lastChangedAt: '2020-07-06 05:33:51',
                folderPath: 'emyhhlqo3xod6v51glopsii4rzo972yehj34iw5yppej23y9oyy6n56lg1atyhhk348afdfb716jl5cav03mq4v27k3aoeo1xzdyu22w5865hnsk4490ircoxn3emhpgja9ltwivs81hqb3ayx50aotazgdiatymvyyth8w33ypg0q9yvdowfdx80us1qi806ac7onin4kspymbt6beufg1mk0l5m08g0bex8t0odjt0hxh5uu1zx779tuv5n59',
                description: 'xa93zozccw06jhj56jnli70qaoxhc38xenxgz4ktwyzfb60jy82htk6lxau14r7o067gwc48ta1rj5y2jijd3pshm2nj8ekd1ae99cfyuxdycdcd9nfz8bs90htc173wpp9v6h44de2fzbehw8bjyvkarlmu84496z9ebad583zxw36okk5uc2m0elakkzbvht1cyq6tm6jslf2ajdkklnpasd9501f3gfgje26vqmmy13emr7o05vwq550fi81',
                application: '6qwktqp71xz9a8kb9jy3xl5vwd7v8m5gom6genll29ro4rlwxz1e8t3ia8nq',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'aupr9xokcw0ztknwxib6',
                scenario: 'mbd1db8xvdmnnoyt8zjq9mnxoaurvthnsb1ib64lq55huz29o2rcsuxvd9zg',
                party: '8kl5neibxjbjvy2sutkrwljso5ifp3r6to3cam0ig3dy0fpd7t8ol6vp4ybh1vnqwr2nltj218pp7u0ggdq2oabmkvxk58kxzh8kt1uxxa6nf7kw0ezljvjvb9c0q30kxrsylprvsjeetrgl1ibw7aamhvrzg472',
                component: 'nz9dih98royx284ikxt779yvr1g6j9vx046g9j8ftsj09xsii1ocb7ny5zsxaci8j0gb84rmm5ok6119ijqj10dt1ri9obz7tunaq5e9xl2ww5ohzo361h77q99mq7ix5w23iane5pzdtoibd1rn1bbyolov5fn5',
                interfaceName: null,
                interfaceNamespace: 'qce12oaasoaytfxglhqyqsg3zcffie3ok43bfyacrl9n4z7iyt9fl8uir6rleydefwqr041mj8q40def2qu9unp47xgq02v9fqsjubgu80y4v2ljvmkvln7utvf516cvrzhfmagnu4dzswf2mivj5pk7vy9ukpal',
                iflowName: 'skct9070aw3ln52p26uhvql6z2a7epzmucudk5adto72jgk0j18lcl39mrytzkkjppornej2mo5uazlghhi0jhx5er75kjjq5icc4ik28dp8pglfz660aa5mcfk0h9x52uxlmy31oeyaeqnc74irvyn0qblqbudg',
                responsibleUserAccount: 'miy1nk1q1sx1wgx349kc',
                lastChangeUserAccount: 'gj4yxk8o6wuyh6wpjr6h',
                lastChangedAt: '2020-07-05 19:32:56',
                folderPath: 'p20jcf7vjpb13x1h7wfwa2s4ef23vzlqszcvj2qpvj9zr66gwrffju46q1zuz9y5j1xkmy78gejc2z8rb4uydx7mc0b2mo1gr0e8j5zjkuej8gagife4oof4kurl2xy0xcxq4atdgrqgionkpppxfuj4uynqws94encdwuba8e6vidtqwp1yv2d7fmx4aef997si4wy3hpjvh0ef63ctx27oguhjyr9pa1ey2kj7st6ecubcxkbucawn3d3pfyk',
                description: 'hrvvpjxq4ww4qqxgwss9nz4zbx19ci24lxxmjpp7ss9baakcz4zzx9l4pyl7ys5n1q4j3fvqbi95ph6v27nxfprbogylh790fyrw8ew59zv6dpq59ph86mrkkmrpk2u98r911fl7s04kqiy79455cbvo8kquvaww2vshywj17vhsn2dy1q7mjogqvmotllogey37rj5m4465r4cc4v0gfebsgekm08nddfj7hxzznistq5slrv22z2xih72bs4h',
                application: 'ffi37pvim9205dv72rmykvxgfvjp2ae63kvevnufs3w2x2kh6tn9eo2279w1',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'rqq1hab180hp0of9sw3b',
                scenario: '93t7iluorx1bwkdzheq0nls1vlppee9dwws64hfcphjaszo827i38j01d9sl',
                party: '61hd9dpvcx86yp3cr537pl6thg4hmv6z46sit0u2pkallxdad4iv2b64m8maqzwlmn4fgr6x8nv1ydveu7gu7fxngrmsx6ph1xsw6hy4a63okll2hqy4qtzte1cpp612b51zm2f0t4d3li4jqerj400oyucrnzfh',
                component: 'mc668dt23upx8ra3dkq9b0jd8vs2gvau6yxyda9of20y7kjiymgu8de36hcegf26imlw7ch82mnhkjjaz4vvnswspjqrz7d4yujvatwwowmsy71564r2d1beuootg2ukzedq59bpfn7v8o20sp3vckwh3x7p04zm',
                
                interfaceNamespace: '89tidx5bno9f3q5xt7i6o7kjgafp9a2agflndkmlea07g6beir3v41d83oyl17zxgb26t2fogw13dy8v1qnhu7js08mam4it1iutnriq6hbf43j4i40bhickfjkz5ob5ocq1zeu3l7jk46l863r51igeg9mzu1ih',
                iflowName: 'z3j1hnnc231ymxz44109apn2m3equj91u12mcdwn2c4p1dgbk5gcun2eyvbidfgjvxx66ugg6qab7pea7xifm0yuwprwua3gybxte5ztrkwg1yysr9mxpuvj77qw3qg56f6c27j7e1zaxhq25i7tvnzs18qfsvs9',
                responsibleUserAccount: 'di98yhsfx9ur97lvd0it',
                lastChangeUserAccount: '0n2t6wmyd232bsa2as4k',
                lastChangedAt: '2020-07-06 15:57:32',
                folderPath: 'i30tuvsjs5o7r1644lhkzyh0xpbg31wdqtshfmpg44v2uliet5oao9i1cqy9xo7ulb2dnfe90wzixzg5027ytmgrwbdq3zstdtmfcliw6uin7luccyykcgd712lf63lqkd6skb16cop5dkezjrins9amme3et0ua5e7z9aw7rrbf8cpfrcbf4a2yqt6k0r01uglrdo5o7vcx0ky0ouluge1g6o7cr5hq1x390lqsmltrrnnuchbz5fv9bx6pseu',
                description: 'i0mgbcmw9bznowf813owzrrna4i9mt5ij87b3ygq3h5cfuk3t8ra7uw9827m8ys3ruz5klg5q4f31esmcklbygl8kvfz1qmbp9s4dlj1xb6wl0q8vkk3bpyyxxxta2bufd5e7n9x2r3z9v80g1aj7to0h9k1v1wk35n1msz6nxdhutj2hax1xtxrzcb7eyx7kb08teg68piys1yeq8xh7ckhxle4h0vur1huvbugmi2wvtrqxzs1y9xyfpr093s',
                application: 'nrhczhozshfp7jqnpd2nyuga0779dkcu2f4fddxult3lofvgxqsp17egtpe0',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'l90bcfrjr2sisrcq6on8',
                scenario: 'v2cgrzrpzwlurldn2d9dsum5eg4b08pkg5ls88vbb7oqp4wbe1rgtfou1e2d',
                party: 'uu49s35ub41k8klmzbkzg11dxw2azgh08fggmsvdoz1i29yyvn82xjayx2niw76ki0njukzmphimz6cqx2eevll1f8qp43gxp26rj67590ch2mb904fpjr5aihzqfevtjjspfx6tq0mr8ct810zbbp56759b69gx',
                component: '48p992552g8g6lmwd46di04z76p5rfb9vsrzoktvtynxdx2una84w27pgonscsqs58xi2wcg2tyrgtqo4ernlijlucodt5rxugzgkbx3owd6sjvvtbqdtlvyjbwyeevajzqyzlglfvegr4gj11i9idl99uwkj5gw',
                interfaceName: '52as97te51r6imahets3hpnso67fa576j83y617ro6ujncpyctxln42y36zrhosnqbuiia71jdqj5q021my7ao72k00h3793u69936gix7any1qpb1o5dugxsmrw7i9v9ako8t9bu94cjsjmyzdsfvsyszy9i3qb',
                interfaceNamespace: null,
                iflowName: 'rqnvrk3ysosp7pwvyuy9e6v8hzkdvi1q4d07ab8ykfpxl9nh7l3w4z63lnheahcvsnre7utmu5vc3cygjfx5s0ch29o1ibnimms4937qr2t72a2lmkh6vby8i90bgiq3a5eoir6bz6jreenwj8yh7163wjsdj7b0',
                responsibleUserAccount: 'k2mox00delhlwdk5b5lf',
                lastChangeUserAccount: 'mxug1l1xpdgzey8icnve',
                lastChangedAt: '2020-07-05 22:18:19',
                folderPath: 'hm6i5xzeqjjewfqpkeaum2h1abzist2gv5r0kmaa0o3c9158fz0vs44tqz3u9jd6s15z0jjg4yc3gr8fno1duljmmkgpsfrqszz4skerptndp7sofslecwidn2dais5czs6uieu102ihblz3sh0uw9vntmqxov455biccutfhk6xf6mwnh2quz3allo7gugpwmgrh511ttkgb4f07empm80luzlencxe5n7bzx723qda3hpyrzar9sap8x1okp8',
                description: 'bjyis3cmb2myg5zeuc98inarn0dhrzpf32bfy4e9e00snffqhs78obvtq36xxtu67mvqjcwck3ot4tq0qvnvw8t3twwx4tz4gfylnaeglikwcv1oowqom5e9dnk0dqpofarirrgkt9a6ypdfom1dkqzl1fawzf6eu3et2dutttu7hzhtyk03npij45gq1n4626908cz72omll26ovqhcknpcunzvbrguqkcf6twuqkae3r3gckp954d85m230s8',
                application: '6n5g5v2fyjz4ndhx5di3zv65lgdlagq1cebwsa8oxbb8l2i7bc8p1fcv1lvj',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'pvuss38rs6nzxlvnxm1g',
                scenario: 'xi82tqhc6j8xinaybusuznqmupier3wkq8eumk78ml4f5x9da8ecydlobqmq',
                party: 'xz4nl4y5ve07ff6b8x7hpkfpbz9123wmig5zyuh53elpcbmy1povfflldz4g8mauuqqedydhiq9bbqfaxs5bf4c7qav0krym4vtgievpyin7p9i5qa5r251nl0rssr4mw4ckjge9rmj0rkp3x45gglzrqrrow1c7',
                component: 'b3gsxetw7t9z2ks7tro8p6virc57f9kmz44yys8x2zgin8c3vp8oadm5lrwu34nq1pr63z28n8n4wkf104yj2p1m15mlm6h8bc3o32x7uziw0s21cv7ctg3relnyxgtt75ssrmaid0aeepfq88ru4rs1zzbhm9m5',
                interfaceName: 's0sntrjlxfiw6jnh95gxqci6odd8m3t710ugax9b74dbnre163gghbn93jkpejynadsmwmkc6nu7dh7kvynwolm8oi89gbgtvvln80bbxs9ipgg4motok5gl7s1h9wi9tjsuvn45o0zpzwigxilsul912iepc4fa',
                
                iflowName: 'jyparwmdbx7810i3tu1aaig9t804ezsfc3vwdoq7z7chkwbyem46rb8xm9bhdp7ouc0i0sey9h5c6l81thcgouukww3oxw1t75ueg5uv5ddn7chi2lfq4i51ns2qavibactz77c5eizcfbaatnsrc5baes7n7v4e',
                responsibleUserAccount: '1o0kf0t7w2z8exh1a81h',
                lastChangeUserAccount: '7xlstgrbzzeaife97ltn',
                lastChangedAt: '2020-07-06 09:34:59',
                folderPath: 'h2onb1d4c5sxknqjqk2p6jf7q6jnscpi9oq9nb355628wpdefiz9rkf73a58l727c62yg1dtms76go57vun3rkscoewp9ma2ejur8802sfvf24b3es8ahg5cwaqjk2rinyzq8lafb6kzul6dvqybzfob69v6svibrowppbtbdoz813pwrjrntj4830udrhzk6yjb8n14lfsgzyd1cutgtc2y5mo7dggzqm9ze53cq20iwr3kcpachnd7semltdn',
                description: 'xigfuabi5l0p0pui9ysmhwnzpsa7wonu4ee5m0fgl6kn9b4dua8jcy7y0iziekhqml4nxn5qcpxd6cwj05idix5f10yrd8q0p3ncegf3144rtud8l1gwghzeqq1pq6xwu2gvtt8ui87e0araursz1yy3my20b95dgeu86vqjmfwpza252odvj2jou07u3vrsdfidbjso9mhvypi4u1x2bwn0cnsqtk3m5cxvvbdhsge5d91zhe43rzuwjva2d2k',
                application: 'o5dxh6qbtedlej8fjaklc47efef0tw2sfujyspma2rkbwedyrh84xgt7wt6v',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: '4v6k95gs4d8zg4bjm9us',
                scenario: '1bqoqq8gfik85hpbaohc9q74e7k29qv55ocv1vwtt5j6mbbu08k608deqbxh',
                party: 'jzii0c96pk7w4fjzj1yjajr9ekr6qxce8uir3lvfb2q4x55v0r8r30tzvqfssqqd8o8llat09vw7lvc8qw715v4ea8n1d7kbrv4sh18yo82e7q7yjrwozayqu5wfhs1ay1q2g9fn1ljv2uo0977griedtzea3evw',
                component: '9xc14jea2k9p3dt0yvamrtmn1jdvyhp16ja291kkgo8ndgrbq39m4lqfzgckalfyay0oflu6m5ibgd15flpibd1a5eiheqqa4h3c4onkccyl9zw1agovtucza80qsbfih6xo5rkw6lajlwzndkar64jlw14wwhqk',
                interfaceName: 'yfe14k6xhu2zpe7wwe6rwshlmywyvyn0cm2b7y89q40jhbgn7rcpvyirveh0fbu5g9kp879t3h4t6nslm87y86ks74wlcm53glijtgmdaj74ei0sg2uaty8um7thjqtfpmr4lrpbctfcdydmctgjmj2rfw4vgr8w',
                interfaceNamespace: '1g3ym2us3tr41atqjlvx1vjuxr4bb1ugc1josxxs2na28otrn1dx0o0892hhl51zv4brsbxc9blz64defrar7ixbfzhuan8wau629jfnrtek6zt5zpar7e5itw0we2eu8u0hae5a7c8e9qjqb0ywv02xijerzbsp',
                iflowName: 'fkec83ypp35pulllkjij7pwppjpppgxp2qfgh4k6h3fb8kvnl8tx0kggs8myc9il6yfvi4r6jwuaozr7ay76xyfyh6bykzh8s5y2mxtwxei7goj1b1xc372vi3dd27z9t8podsv893a155rqpkjc2kbsvf4w94lp',
                responsibleUserAccount: '04cneeg3rkzpmgcqgt20',
                lastChangeUserAccount: '3z1yzvnedfwklrs0kpzb',
                lastChangedAt: '2020-07-06 04:31:42',
                folderPath: 'zpf5f8y90je9pcuan80xo2otu9fw24qa5tih5t6660dbv42vsi928cs9bna2c8oud0fpjq49v5i7pkop6d82sdy40qhj9np2lj82rwvp98841g565k182zyykvdaoz05ku0nl4jmh4jdad2lpsy9l96wb6i4ok896wv1z15qq3m4zx7m4h96yd1vo5m8nysbc581gq0nzcbegtiyvu69hmhuecozx583rascaezv5gwzymvqpdyyxs1yxg250un',
                description: 'euxc73ksfqlnjv6uddgdljjirjrnfqvknhyzgi04kotsb9c2hyyoxl43tk85bvp2g0i9hm5rot7v31hw7ssjk8zx1xcza6rziqra3ckptjgto841f1cw65c6ohesi7htfbokpgnug0i3dhj2kmckr569jm2uy40o7ks58egv18w265r330jxxrmom5m6owzfghjuhhcpw4tu9erwzw8rcg90amkvv0fzvtmeiu0eltotcn1a99m3u0yzwejwjr2',
                application: 'apz09ydrhitgime7sweez3ef3elqq6690qfr4p75cv1sr63r0lgmu00iq4gh',
                isCritical: null,
                isComplex: false,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'fr4wu3lxm41pkrb1kefy',
                scenario: 'i51onsrogg4rtsow3o45z8pmk5ivw1s2vh3hhpilwevnxpav6mefhbwktj6h',
                party: 'le47cxdpavysocrx6wxyb1r1iw1pagj7qpty4kf2i5iokonbxd516af2fsfqi0oyluh7u003v2ihp0gnql7g98frd69ozebv1g6s7c108iqjc8hm1v7pg61zcykbtwo7rrqkdnplpth0f2sd9pxk3lykxkungov2',
                component: 'rxayxhtui0tvjqks8eck8n04w9saqj3hngahppo36juqgdek3zwv7jtcfoiynkbbqvk7n7ukbfhfcf0auonjoexhnrs2w4vw7nkpiy5f392i85hitnfi9mbjrok7wns7ncxbxgqiw9rd5im73mktggxmub0g49kh',
                interfaceName: 'skmthac4sgmoqsawa5erxjbv70534eqo5m0nj9qpgd5vazk7ik5cp44o9doxpwvzt1ms74ml64y61cr84xvr3skzurw45cdsykt6sd9fgf6g3mzrjh2mj3catsobntazdyzasaessglnmi6vx809tb3rud5x5do4',
                interfaceNamespace: '6045n18hujkr44lshft98maosm5624pt2x05brjcwgx7fxqyzxbiuqv1xl4u2c7bcdyt2g6cn4oyhya4jtp73vy041purigjuyj7t0a6fssabu46lhik6nj6i48eukzpkobfu5nbmhmq3a0fcg4gkjco96uo04mi',
                iflowName: '4id05kg9whbgfe9k87vmgm2nxen66lyvr8cgs4eo4nb6y35p4bx0m3t44qygsfxv77bqbvu94ac6d2bfqytyoivy1bnxtarozf4gfvrhunsi25x0nh1vhqg3h06vsts8rckehn2h264dba5tvv4bwf52og9pjshc',
                responsibleUserAccount: 'ud6r632wr0wlb22cynjn',
                lastChangeUserAccount: 'nb52ygmlqda6yek5eeoh',
                lastChangedAt: '2020-07-06 16:06:39',
                folderPath: 'lefjdc0hngtpddtgotkcr1byrn5w72paz7wy01gdzmswpv92sxehbu8bkiv6ncpjfw18g9dktmrjl6i19422ki78x1d0pd8icptfxt0sb6qbyiowa0xxaendjruvg84d9tqgqnjet4ls7gix62g46uikcqqg959rmnk137xpekm4ptswdfp5tx5nd6qk5ebtauejco6krqcx9nizijc6k23gvtf7ttn4018p63yuu7o1nhdyecq2qfetknl3dmq',
                description: 'vloq94u14hj3dbkjmk20bc0xrqzbekrjsajiuckb4r13hwhjoj2zrgrykx67nkn34ruuzjk9o704uoi1xdj0edet0tb73wlwbcbn9ks8l0uumnp65qtqmshxy41c3nz5q8pjj9kiq459z9dc7kfmqw2a9iuvwghn3ffbfuyt5202vuu1v7t71imvqv1j3v8q4bj29nyzc0t3c30cbnxjuzmfuf2dnorm774r8cx1t4v5bnvkw7yfosqwrl0omhc',
                application: 'mzm1xsgsk6o9x8lse30jib86bkrug4qqlxw69qt3urri8bozannhfepya0jp',
                
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical must be defined, can not be undefined');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'fdz7l4f3yovj1o1s03fw',
                scenario: 'bp7xnkxl0ga5c1gmb5g1oqt9it8ryell4jy59wad983ey2r0r0leunpzm3x4',
                party: 'kh9vx72gbp26o1rrnajegcdxtys4cqw4x9lvpt0qgilili1alurn6vjw9g0zcm84p4tgr0s4rm63cff09he9icz4yx9fpkgjr8ivaoong7psiyuj1jb5umjxne9co6md70y1maqs6wgybm5awabccbgfx3kqb7y3',
                component: 'q4419e6kipnmlagx1h5637gf6144mildct3lzazomtp2a0i6ty22ed51p7qbtw37sj94yi5qd1uqb4msrwylk0g7xofwsdkwtn6hydgefkdwg7ha0bh791mztkecj24jse5d8fst9njn1mory18527pcytlflr2w',
                interfaceName: 'f7gi1gme0ooldxak1lckp6ijph22f7jkb3azce35bgrcqhfg7eko0ccmytua6cao5jldkstjwyfwp7d458fq4rep47ubnlfg7waigagipv6ubz0xk32k8axpfuix6kcjzkre3c5h3k2mojl2mtqv7uau9tqr9cxd',
                interfaceNamespace: '55o7hryjb813ip5l8i4jzswl8vrur9a3ranme54ptjr391bn7p3mcl3ifh6ek9q9yuofizxqchp6myktbb9cwejjk5svrgfab7fxfyf8qknxcd317dqkzt4l39n7kfa77qsw2x7cbm0g2hypbutj9dakqrdms225',
                iflowName: '3ejpg0w8zdptkty9hinw6fy9a7vi0vf7slq40pvhxowys6uclopsq5g7421m4as33myz59wx1ssqldi02rui4jt4704ccd216tcssy418n67sw206jws3c31rj7e0xj62sy4g2nthauhee1nwalmxjo0lpvkbexw',
                responsibleUserAccount: 'pqvdw6kmt5wmavh8a430',
                lastChangeUserAccount: 'krjgzrcjpkv3hjo02g4o',
                lastChangedAt: '2020-07-05 19:34:35',
                folderPath: '9ahzv0gan1btprbwxplu01qjbc5mcesjazwz2duycgrznpzuktvy8sfo39btf3xod27y4cs2l7fwuw54oqr0fr901sloswh8lp2tprywtlafrc9ty6kkv50a50xeslnoz03qt31ffawgosg2xq7vq36aast8qxg22ogivkzb9z0yyonyr0ux7hvv169u1gioul84pqe7gzy7qg906kel1vrd9t5ujzcxoewv4jvzazl9utn99t2wcnzvpm87mvf',
                description: 'iqmoocmo6808rqegjwi4pk2s2pnzepfym3w2zle8gwrv45nbpb35skoiy78abetmqa2p9iosqth9kkb9w14asr713ni54ufwemshjhxxnaq120nyj10z4lqc548tqmz1oi0chft2xnnqy9mn5pehcnbklv7gze76ln1dqa2alfju7qrly4l91d4xgolszaasj6hyu07t3vjwjsnii6sci8opdqpq4pnjza7ug621k70e2nxilylnmbiuqijdykm',
                application: 't8405mb9ka9v6gzaov2mq80fd1cqv6suyih1gg8j3ghe8cgeqxef0of4f2yo',
                isCritical: true,
                isComplex: null,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be null');
            });
    });

    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'mvw8uixojeadbiksihmi',
                scenario: 'yxb92pdepgocjh3zc4j2lb4iee4e2x4utjn24hud9gjqw3ow5u9d7eu4k70m',
                party: 'lzwed8nomt651qfo18d5nk0ixhx0uyals1x2hi93mjxv0a4u8xqp6d6ypj9vy1nzgzq7gixiaj2xztvxwoycly5nghbdt5y8y0q0jpq2hl2fo57y25p1c945biyv82zls8j64g0lvftjm68ovdq18a0d67redsau',
                component: 'yjc382drbomr77ldur3txaz28a3a2128grxqhrtg44789verguyr00vp6bcy60qbuqmewrz65vzckkkgt6234ep3wxx32umbauqdxwgpwlifdlvzflto92srv5rlkn208m0crqeqbgpk9iamz17bqe9ikydlcfzw',
                interfaceName: '6iff3yc4wj3axtor5qced5f5abfe58mfcs48k0vikygf0vgx4ektksc5w0vdn2u5icl3558wit8nga6jtb4sjbkux2ghnqmycp79fpfvrfy3hz3sh8x08had0t2deopktxc1asieonfldjfgnfuv5cx5walmppve',
                interfaceNamespace: '25aaiereasjtn0ueq25br5b3z2mww5i39ayc2mit7od960qe7j5do38irspp7yywa06u9saw2zkzgmlhxmhqfw9jgjgvt82dh1qqt5aljb3dzwa75txykn2mpphhzw6ypbgtlsnodrgm90gg5ubleiqw72idoyyo',
                iflowName: 'vrfj9e22mla86eqlstnawas1yap0zqjt3q8qi72bcdg3hl0hcubrwy757thk846d7r96r5kfd4udfxav9zwglmyhnap4vchbutls5d8rpd0vtsbvtvc14ivcjwqd8krqofjkmowwyvu1o1q8l3xpgestkubmipky',
                responsibleUserAccount: '9j3huu1urs5zez3yglkt',
                lastChangeUserAccount: 'viw0t7ais0m82z7p7j8k',
                lastChangedAt: '2020-07-06 10:59:23',
                folderPath: 'vmgcoglh5uf7pts4fhgk04te47gxkgzl1bf4ekkxwn3mmho3tndqwbw2n98ttaxafcoz4acnbch4mf3zromo91h9eyo2mrrsnopykeztk5b7389i126g18p8pstds9eae7dm4l0cpe4vbqlrp77ul2pmqsem4bnbddjhc5yujb4gkrmj2r4ht0sj6vhr9zmwi593nojw9gmc5kw1whgd7w49d82cu7rghh3bx25b9wv01mgp4zqdyci7jnujpl3',
                description: 'rvp47vl5ihcyrx7wecl4vq99rxjel5pepq7uh3am7i52l7njoyuiflsgqv9np0rrmy6fulginn2nusi3c0qxkec8tmydz3cpkdgdmu8yjdd8pr2ngys2kbwu6bj7mnowebm7x4ysjq5cyjl82hp2mlb4gvbioky86apdv9hd5v87rjuo3nvoj2c202q6mw4chgvnwufno7xsf3v0yzixk6vp35engur5za295aa816wbos73e74ztszi56kmk8o',
                application: 'qdy891sbw5cyhsi31p7fhz87ydlvbbjegktje0uio0vppgvn6hlzkw3s4n8u',
                isCritical: false,
                
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex must be defined, can not be undefined');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: 'kl3aik84z1wga48udtsg3akc4dlcfh7eu0y43',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'gs268hctnk74f5mr4esy',
                scenario: 'lsgbwrym22ngww2ir142jdtbwjut1r80x0pahoa746rdoaed37bz36g0gh1f',
                party: 'g6iadrpynsefw4l7hg0g2p7tmjvcxhbae69a29ix4i0ac4eldfcv3x4z2ihagybxt5v3945fqh0mcs9hdgspfybu5na3er8ymm8ngfu1xuywrh9pu93ji5kwyahfpfosas1mnrs5bx1ex7byrxzltcrqwxbc0jl1',
                component: 'bf1oqx9eobfdm1ic2qcxhm37pd8zlucltylt21be8i0afgj4wt769lpv53ywzolziip75eyeglb8h96uf2csxqjp1149uv9uayai8vxxa2czb4mqx3g689pfq3wl15q079t3vid3ueglawxlzjydftnsmuxsl2v9',
                interfaceName: 'dzcf1dkhznoh9bl0dswi4s7pt95b7aatsujo473vx3yan9l35gy2enegfg6qsuvnoa9eyvl4bc29xy4ln8w4c6d81k5b1ykuzadoi9fikmujhyih4q285f1pzqab3shybpbpgjs1am0j8law6zeg9c85hoegvxu3',
                interfaceNamespace: 'mbw9wu2nzkryuehlo9oo9eoyn9s7cpy5df17r5cl1z060hzxpgvh1cff8a4f96ksg5ff2jqz9s1jv0ojcbiboyj4rdopj0jkcqpp1w7rqu2wh1h5fzjnfm07aclhbn23w9jfwy5edpe0ul63i13r7iii8ckh6qrt',
                iflowName: 'tphc4r0d3k7h183f5ngvk0z5x35l97l6kja9lz7j2yic8d7aci9o3bpeytvfdcs6wejcpg1zizh7kt9kgg0dmzbz11m8tjod0qe80v559fgxt5w8p3vvpcf3kb2u7nip9qo7jurr6hnlqrfv5o2h86oy8njsgavw',
                responsibleUserAccount: 'e50ab73r4ve7xz2dc5ep',
                lastChangeUserAccount: 'wjgys49r47gyqzhyuqp9',
                lastChangedAt: '2020-07-06 17:07:55',
                folderPath: 'kv7b3sxx2vlwqss4tnbpdwaikithw8q02oqziqd0j1s0n84o6kjz4bq97y1ouvra35fc6w24mraanzywszq9ahjdjwwb8x7ooirry9eqgx15moa8t3ye8b61e0cmh5lvzx4n6cme6rzv2dn5vpohfka6l5l28vgd8z6assom8xl6swj0yt508669j7x9fj37o5s80rm74lqri3m29ucy1wxqyh1oa9y2pmqbcjmdbs7ddgk6vanfw46vgrb5thf',
                description: 'jb9ew3guae3viw5tdg0ewumithveil1jpjantumuf5ypby897pxskgv1acvenx2b6jb8grj2lc78cga87orftscvkffj8ks6cw5uty9cgpqakrio8ex0s518xpe6kg2292kp7bm23qee5r9r11cpuztnlup6ourggd80h0kksgnjfvb930niovphjzfcnv3gvsy4qwsrkkfjb8ss2dsv0chaan501ctio7bnp9osu966k7akair4l79ellmdq3e',
                application: '9cv8di63ptbq1xq5mj6ucokp01rclgho3dqvvekkfp58cez0y8ch1um7q8tm',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'vudr2dwycbv6zfaih4oac3cprp4mmsl4sf10u',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'icjhr2hdzqdadv2ckh74',
                scenario: 'tash6p8dmu1d3onat42z4hwtbwa55v0e6bdoj7d1sokk7f3v5k9h4qiu3edl',
                party: 'gu4nlu8e1ru7cmbnasswx8zdhjilx3gl9taosn4av0v16l3l5joy2ybowxchuru7i018avd526ahdkmf6q3ceyekczerr9c6quxejd2e4ofzon4b8pwk1206uu3gv8wo1wlarmi7zbw3al7wn6whc7o8uhit4owo',
                component: 'zbnl9878l3yhnifjd1brbdv8yk0hbmt66u8189o3zzlaa2xj1cvjea5j532hnhjyk0llvdt19tmky8zyp3xj1j4vyoq8zgid7cf5wefothjzc7buux39wjpheduxp3t90plmh357y78l0ue9y25tzi8kq5zf53np',
                interfaceName: 'ptu6ir3e0t45e82htxylmxt29mrtc3kkfpcvq6xhofnhr5du682d6obk11y02xco4nbbgqifl1ol3zxcbbb11azlgqdt5vail63z349109i12eke9rndod24o9j4z1hwjsfn8q7bh9hb7ytdp9orhzr24l7pf3z4',
                interfaceNamespace: '5g95kzxd2m1oex8kgdk4jo4rq7gd1g6wl61juqi6qv5yo84edlhkjwcago9zuhdeszmrcvxmbks3wuuwhhcsecsjfqfxmteccxr7chblkasjjyudvwl48r0qxtrww7v8sfthak9ut6jidoyo9qcj5p8sf4hwopiq',
                iflowName: 'am65396yrpdc4bu5x7tibq0q987c7c0qtr2hczio85zzl26bokuxkiac9njj38ozaqrblfnggfyobs8x9kpu3ev58bnbules8yjjkax4uek5lfr2s46onjbhfdpa987jollec421u94lwueygko2e051rv9pbax4',
                responsibleUserAccount: 'kgbxpatkoaps9q0g6j64',
                lastChangeUserAccount: 'y17a0zx4wmqz0u514873',
                lastChangedAt: '2020-07-06 04:29:51',
                folderPath: '4ahrhlo2tpnmbqh4lv62hggym39qfyraakjt8hrxvo94w8xk753chz779p85kgmdch3ouz5ws9xarsdy8uq10qmr7xic9myhl4ig1w0pvy107jco1ji8wrexwiy88i1xakxjvp2qwuqc5uvjb0mvh5ooqn5ck176kjmfibzjwow9towqmh6lysvqctphoev64i7yqo3ae1hindms92n0kxiauswevm536n4jycor0xw97rn57kt4773sc7zr9la',
                description: '7gct2x1jsero7hjon7zt6q7ktn90tg5hinuddfug0qax5bd0oetkhpxyvmk03riph1klf5q75kga79vol0bkyc9igt8olwnz4bldhk6dj1wvoso8ukg2yce3b86vkuxffr8pkeo8j1won25joj0n5dv93eihavtx6q1qkkr9q9n79uk5fath9x3l0dvwwp8ynwurdwsigyso944x96urgn1qej5uscn8mi78xah4r783u6snd34vssblbfqwroc',
                application: '7lbgsu2k0gecdbedo6c7fcjl3p2tjvhax7au4lyaxymv8crtwysz5imot06y',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowTenantId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'yv2b0zb9x15z3zsx66om8ba1u8cp84pidbc39',
                systemName: 'obyjqkpn94nvpbmz9tmk',
                scenario: 'noz3x610tknjbfx0s0yc756luagzig8ef2up9msuyg0nyz0nymlv9np2kmy7',
                party: 'h07ddfr44ftne4liid8mc32xztalvmb7dxcgckr15256dv3m7btjxo01ecwwgezicwdgsd80rv0ptubwpnpkv2xiql01ugmuqw8clylred7dpe4kif86jy6gd6hlfbh5xbfhstu9gacxyewcwpopagb6r691zp3d',
                component: 'biz48oya04sqd08z6utsyhb7vrac1k3bqvjml7lvz2vhfjca9q4rmrtg95kwmi44h896fh9frll7ejt2zz7skuvdx4vlt1p5a7fns4mech40fcf3wvhhv6stsnaf4gcokkemob25u08yhha53h7uoippa9k2zims',
                interfaceName: 'kyp162s6ws2oidsjazk86fh32hd6utgkt82dq6ydm8x5u2rytowadv7bupzkkeb077f21qaw0rk7yg1o3snebagucwlgqdwus4m6ww7jx4as8vjggv3g30xltdnr5wo4yigmz4rzmb5ypscg8y2xaxahh2ktatpc',
                interfaceNamespace: '5ymokftkq81ivg7wpm1m1exbfnia5kn510uozfd2w9j861upzeafgc7t9a17ndzptq13s8e55xcvjggbutvvlqei43uli2kmeqgtm10yl4vx838fbg77hhpchfi0hculk6dom8c1lkalh3yq1wa3x774qa7ctdcs',
                iflowName: '73k2tw4ubp9bnofu1dvkgp4et9nt8cx18s10ud6b7u8kvdg5zd0e7dde5geovnzyzcuovty7nbjaywbkxcxm78hu60hzrz89lywktlolhs5klndein3hdemzzpaagld8u9rk9r7t1mwy9y8n0l198h5w3r0wkjvf',
                responsibleUserAccount: 'sgzai033qefbi5no8y35',
                lastChangeUserAccount: 'frhe96hse3iheegocag3',
                lastChangedAt: '2020-07-06 15:06:14',
                folderPath: 'nz4zgxqnkaegg4z0xj42g4ttmm5aqo9m6mc03hfb82bn07i6ptjcrlzxd6ue3dtsj6nl0u74ljk17hytv9on2zrk52qn9fy4jwsvj2fr5pa1hm4ds4xqyb18vkyao16wt769fgnovmaifz30xcs4d6dam10g1wo8sfgn3dqzof2vuzqc0m53e6birjn5uizrg5m8wr3in36vq6burelrd0hvpyn4f43b20yasictbr6uzi5q0tl7jzxe46nwupw',
                description: '2ci1tg7tpipmdi4806pqpnqi0cejqrd3zey27130kbjik3icfargbr8312vkvm7o2u32ne4injyb97w0cgxqe0q3mp9ccos4114vlspoqoot48y7cxh0jfg8gonxsf3jbz0bg5xuwui4zwhwtl2yh2w201cjj286pu266zp7633zxy5wk6qs8pv7zt2u8tt94uck3n4jvuktqyxyvvlqq10fx1qa6oys0qm8efm9iziqpul3632jnwdine2twh6',
                application: 'xujrayfpffuii2mkl7gujujn2i23fz7nf5x4cbo2tep39vlyk3iiktee4l98',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemId is not allowed, must be a length of 36');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFieldGroupId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: '63912i93tx1lt2k44l1g',
                scenario: 'vcya91uxec9w6zr7by7ffefus3pwlerprlod5u19lrjv308vpfamwg9jz5fu',
                party: '2kw2um5snp60c3p9rxg7wma15s4e7ha48m96wzo3l5qc2txuo0uo8gtav0b8kkhzxac9b632nxa1v14hwwrk4pbz55sfv16l4bd6dmc0p0eot92hoqxt18mq3ksaecpqpe3i2gadzksytntu06v960o138g6iyzc',
                component: 'qhgb02ohdr94dgmfgcc110izazn45cdan7499osoj5nlhbeqnxzgis1nly5e30xknvybkw5w4xwrpkqxg7zfzper7zl7te2q57gt12om69nafdbw2pc2suvl9fbp5ikq785mngnfi7p293htivw2yylyofr05zzf',
                interfaceName: 'vn072bju4tlw8pzazjbi1dl8fxodzf3j0c4qpbqhkzv6x9f5jetzcehxvjoetjtbhrd01vmrtr126zm1o9eb8vt7ahnds6opir5gkdbdnhp254o37c7lvb0fgc75ahmfpy5unw25socbndgs47x600q9g51w54ra',
                interfaceNamespace: '68syznte9tkp35g4wosw7oly3rus03bm8g9os9hce7rt01asb1y4izisfz6iul4lguysf6p0zuya32b2e330b7sntfjrorh4hzjkxdo2jqc0mxqlms1xf2t5dy8zkmglqvg6eg4uqdiwfj4t5fkxeglifoeud6zz',
                iflowName: 'rd3u9ei0sj5ztoj7zicu36pxwqjp2sudnu1syx4i4ksx4l1ek1owawys5efuyr7oynlg15puih9a9n0etcjvpkuogn2ozbz9akjw2c96iz1v09v4m08h7dp4pqrea5kmedo5uzavff2sxi9ol0vzs4w829ifdy8y',
                responsibleUserAccount: 'ypvvkotovh1a2l4xvlf7',
                lastChangeUserAccount: '3vp1xbwhkrdhioi9zrm3',
                lastChangedAt: '2020-07-06 13:25:21',
                folderPath: '15shaoavz0yvcg182iqm08lqqtoth0uc4m4lymermr8g0zcku6vuzyk5xmh4nbl2ux1k76ihw77lcl94c26ezpdtco77jgc140f0vqku0xnlsuq773lo8eik53t8fcgnhwfksjcjorcuwkx723skgmxpv3fpxr6dr92zfy72xeswhq6bpat7irkq6ne0n8n2ae1ng5civkfbr1n4s1no19k3bsso4baj8ta6h7ndtj3c0asl3kkdzr95qnvs6vq',
                description: 'gt5x9r6dgzfabf0z2kfbj4pwbnfitns6osr0rifmxnlb2mh6sitdhmib7lptwzsrxcm8vclhs62ynukssiluud1h8c3wqrgzfrkbpg9gnhjokba2rdq3uyz8ezht3h843hyostqgszkafsm2q07dr3omvq2z8q59ojf2mseqlwj6a2pb1nx5t558peb8rk1rbydtb3meye1oggfgwclsqtuiaq1g7aj3i1gj1nu31eajkdb2wiw8h1355hka3cl',
                application: 'bla8oracyvtjtho551g39882h8fq7es86r31sztjx4x1vh13jpuew0aespvf',
                isCritical: false,
                isComplex: true,
                fieldGroupId: '6be7nj2w100bck5ntaxh6onq9x5waw7s2im4u',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFieldGroupId is not allowed, must be a length of 36');
            });
    });
    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowSystemName is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'y5s8aqog8it8bxqa2czyv',
                scenario: 'se7lfy395cremgk05whbyn0028f9sy33iio9k6og23u5oaxkwzcn7x102zc6',
                party: 'bd9g7rotydeetdzp0195szjjjlj1vzpvzynanf7yrw4hvdtr3cqm75t4lpvmbuaz5auqxrbqwrrcij9l0uzh6fr07p6xr0ipcglctx2yz5iy1ba3rhcurohc5z8bhdfu1dnen6u5uo02hztn297fd2djjjfcpfd1',
                component: 'ppm48mfdpjsptq4go7mzs38hxpg4f5e9exu0haan8wxpu57coqvuc2z8elrhv7ja0934o9awkgfi6kn3nkb5r1aflb1k314ar8fdtirx3l6y4jrgpzvs5twubl79vk54gc8xqujh9zi0gs8awz6cuy890iwv3saf',
                interfaceName: '67lb1mqkgg6m05uc9symxpun917rrx0z5fp8olgqv1tgxaui72w1o2vuauwti6vlx3w5pfvg2f06n7dryn7gxd9ex22lb82g567nhkd3x6ababy3xzrmsx4wnqrxio040ked6eseq1tsyx19f8z3irxk1eobdmms',
                interfaceNamespace: '1ky87b1s1o83s8ylhves7g5bau7o79amcdikiub6sr365d0pqh9941fblgnzqh9f53v64w38rd4znuovx246qlvxyud66lljr4ooylb4o9wjyn25b971tya81qxm95rtf5silpky4i7kdfprw76kygw31uhjr358',
                iflowName: 'ii66w85v2axfq7jrlqgfdnu18vsojvj9dt8hmot82vlm3w7gi3c774sgdmljfl9r002hy3ntprnvrt110p5z1f72cxfv6qztqeipd9onbwx1egub0opxa77swx21lkm6i77xyqr2xdx6j0dgiz5chd4cg5vr9ppr',
                responsibleUserAccount: 'jormkyuivb1l3p0mxg3z',
                lastChangeUserAccount: 'xn8mm7az4a4sma6w33z9',
                lastChangedAt: '2020-07-05 19:28:20',
                folderPath: '0ah1hrolodi38pde5zgij14vct5aj9xbh44rdmp0tmylm0t0je8qrcn0lf3l3bfapsyxdxawu6as1uove2xqdxl0zpc34bz18k52xmm7skt00m2ab2kjmrf96lwhso1g2jg6nbmzea5hkc3js71ecwgn5f369ycxt144c5txppnoulqhebjdlmq7zq1555kl55od5c0u4bib96po1z2r5uio4kbh9d505ub5u7gl5pq5osmzkgdalfftp4vqyg6',
                description: 'wk6pzfg5uobu88px3bhujk1novexdladixadxmjj0xi4xd8w89dr5ydg6guk338ts5eemebc0pq9nlsh2hzonrx056ucwwonaq3thox1iuhlqwf7dbyuqipzz1n8fysc157059hs4g0q0w0gabvj2oe0e3sagbbj833zm06lk2boj2jnizv68473w3eqt3hb7vcbs1qn3oap2fxjwlv6rxhjroz0y1mydi7t6n1mlrunm2v607nn4jmh6b9ffw5',
                application: 's1wagyx4thne4jxrf73qa6frm7wjdajyy4xyk5dpfju350fk98sg7kcp217c',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowSystemName is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowScenario is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 't8j2ltdbtm0j8tv2xqaf',
                scenario: 'wq8rgkrvbkxouadxv3oahda9uvffm08byw3vdtijtyjzknjppuaxuefdco836',
                party: '57slqklo2gv4timorxyeqxz0941khvkywcrgiaryxf20z4vfg439ieap13a2f3wao7ilxv412y2ad17vj5tpnxlepruwrbzfmyg338rd5aomn0k94q065iyyjy6wii1y1qz2jcucyg5c0k0jj91r8vc8z9xy1zr5',
                component: 'srqahpthbc4dk9a3javirmydde9rhvhez70pqjavmhoqraw3cpgs2biw8ucgdlny8ze5ob8fzgu8jw2vq3malm71aolic3dddvxyd88mmef54205syh17vbdszxtu49kggv3g5g6xwyconi2pk4ndltron0ufz43',
                interfaceName: '0qp8y80y1xubqs8jgka03bkshhfk4s8mii0ikva4o799rc3p8ejygw0ati3bf797evmb5ejg6sgqxnbrbh5ga8lv5z1tnzzp0gndd74nrhcgdh7bdakiwjose9qtk2hlu8rrrmkfv5vfhq9n2m03trvour6uqhtv',
                interfaceNamespace: 'pchgfdlz1p2fo2sumnhjiq4k4zlyhtlwc8450otjdcsc027v8baku0g0csf6q9bxsfuze7hksyzm2f062nrali1cztf84j0ozy7pxhlbwkm4skxgytw750dmdqcefg2s9l9c7ioni8s4ro489uozu567q0bc47c3',
                iflowName: '6wjk7j3sa3h2fems4hsvw9uj2mjqyqvrkzw4vwj80kbecr2txbicmmtknobj9sko8e4uqhpgjjzjc44gfdgzd0lzwvxhpwnmskda1q6qgxl93at2siew8sfe1xxdencx7ymjumqfozos84qyy8066zwifbhfgyz8',
                responsibleUserAccount: '00tzvxsdbjyj6bmnph2q',
                lastChangeUserAccount: 's2gew7kng8euofe6iwwm',
                lastChangedAt: '2020-07-06 17:35:00',
                folderPath: '5tvfsayxbgujf6tx2r17thsp7mrbufice8ipbxu6ddzegzz3d14u6vxzwe92dzrjd7tn6zvh26hin7z08rfb6ob3mo4skxnxq1eorera00oif3cpegoi0haoam6t20bctj1kc9hvlte3oy10jutfgc8cggutana3nzkosdc47xaef45408b4zjft4jh1ksn9en2vu3xgdiyuxhl10y8acrgg550fpehwilxcsqxvywyr04q6xaqjz6yk0zqaj1n',
                description: 'z5aebpxbhm5za7kjjmrg0d8bqgwkpkve8n4lzfzoqliq6bemts92flgxgmic02uv8fvxfsxutprmnx53nd8khtgds6gc92cxgt5fptncxf8wgdc505p18qyv9sig9hkqx7hz7lkbwba3ropf40w3wxbuk186ze00pnixs9stsxmuhpylq8oyarapdrhybeh2if9ak2bc9kf3of7i047fx7ft02bd0wc8wzlxc3gjf7s0ya7w4n77ljjqsx3b30s',
                application: 'lgle3syxayas3u0ftmi4umuemjtxzpf6pegkor2yh7bgkr69z7437w8ja00x',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowScenario is too large, has a maximum length of 60');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowParty is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'j4bzsn42aggp3z5kwm0n',
                scenario: 'gqv7inu62jm7oarc6mvytu8peobtat3lak7l3aiiny2wvdlcmo6ymm1yyrpu',
                party: 'emsg0uon6byeuswwwuistzf2007nd7z5f8bt7txeyz1muzeb554nej53a6p9cb79mgukzyw6dwwd3k2232fmcx00a83g2dajkhbglr04j2ba0zr45tnua08uo0ogp8uwwfite1yk4glyycrupdn0wzwji0j0fwuey',
                component: 'zm2pwl8xeaiiuthfw2arpp6rx7vk1cv33550fpt03jbrz5fta814j65b1lz65tfbv2nq5tx9ydudtfut0j50kwmckfclpvtz6w32io5brqu5pdcu642mpjmnpmcycufroeg0yuzfbvx2u7i7q0pdbofsx4i6ea6b',
                interfaceName: 'bjda08amgl8molijlx6s7x2xf77ke8b9fxw396i7h9dmy4sxdpuqyxbm25oav7at9v3ejvd6lx3cahklqc1cuz72t96flsztw7f7k0uar36bq4853aceadmmtrj82x1l6wmax9xmo5shcntgzd7cb8k6r2gbnnny',
                interfaceNamespace: '1y9xdmydmj2pwfb1bdj4z9jmi866mc65xbr9jrtgavvc7clvw6y1u5jp8tsss9if4lyw5ihmaobzspfgxmyt72806jdent2hg4fujkqfzkkh98a5ifqb7tj3l615tmpsthze8ebyt38o6yog5e8jkkukhcfvtr0e',
                iflowName: 'u3yyl2i338gq547ja91io10ttjwo7cb9num01y8p8hmvdl0h1hfnbvyjs0icnbt60zgjn3ngazurjtt8solwvc5euxjoofyprkatxuemf8a2z7l8lca4694etclu8vmw7azbiyc2ag3q0cqkvw4b2mzxkcszfiu0',
                responsibleUserAccount: 'yblxa31caphq31gy3md9',
                lastChangeUserAccount: '16rwu5p00lzc30bn0lgz',
                lastChangedAt: '2020-07-05 23:08:32',
                folderPath: 'b4z4euto3x72osqapk13b619f92b4k3plh8wok267rkcae3onmnsjso9dyxbsvrtvaxnrbytuo0wwwnufkwk51nocww95h6x87rp00iqw4bly6vsjtjerj5rspqeuixiik64jh2cj2x3bh1d31hcrktbej2bqv73oo6c73orhviy4gwjjx67nz9s6n2ep0dbb1udzt0heppm937flgvpcto69806rsfm40esu4aw7t5jsmphix6h5a6rbf41uyy',
                description: 'fhpn88oc1gcjj8e5ccj5idalkh9klwrssbhvcbl75583mbpf4qn1fnlzw4282fb6n4ok2pzyh9zqqfucvdl5r1jsryny17k616xr6pw67eze9ke7junfsvbal5h1g1ljynitep6zlmsxwckc8dkacrmbg0k5k0bkdjmivz8epcovieytk2e9u2tlnmmelebylyja3dufueszkkt25o8xqj9mzlwklqdg1fmakopnjk011ewdenk5f5u58lrxh5k',
                application: 'drtwtkgabzr0xs0slmf4gjpxcqjaxyl17wrff2w209kbxwcqo60b6gfrpxuc',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowParty is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowComponent is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'c3xnh83owgsho7plvvar',
                scenario: '4541uqoycs1qxckhxj04tktznxzcl3n64cfim67s05b6pjzbrzm3jy4xvnhd',
                party: 'bnqadn31o556ubci0ddf73d7di9c4w213fe8v9qza1z79suqped5qd0mh8e5ogu4ko58kxgn0st9r9mpgbrdj8fxhscz3o8km1ssbp8g2c80tpx9s0ltj3nx0vs401rgld420jjxcxkc0z018yduof0s3ka790hp',
                component: 'bdx58l0idh728gp1ckzoi57xanrtcl369wm1fcokwgy53uhi2mkf4258857iu9sp1jkmukywbeppcjsrx9bw71git8deu3ex8fz5egc86g4pw379hoasjvvbcwe092us40np1ylgqaa9kjmzehqg6v72lq4v6z97s',
                interfaceName: 'lytjo4cd4zyp356hzbjszrjbkg34la1ozp6d63ahtuelo84qoacntoo5jtnpf55gphl71m35irpumbxb02xug6so045dx69fco1r53latzn98n2tnzbx1yobssbsxfcn8z1p3trsai5t6dzq4hu3jt3c7bnsf71x',
                interfaceNamespace: '4ipxo3443fbi75jey2r4ctki6dejn26ucwa0x4l5gpdz545y6655oh5niyz5rhk5aga6wzadan95d6uen060qke5n885q2pscoi446mhhvm0tknt1qhpaahkz9oungupo6onnm1hburjpe7d34dipxwbkhw424v5',
                iflowName: 'qeduto6tat9zigoagrt7svqj6urdery6l7xijf25371x9labrydjxngc2xcnj81swrmx0ql9luo8n452jgg7om9owj2bwm66bp2mbi7lpfxo9j658b21tdgsmhe3bfvcxr3wi9rdsjkjk1tpidoyhfrovwtmlodf',
                responsibleUserAccount: 'cqn9lac0y5zi2bd4g1y0',
                lastChangeUserAccount: 'yq9ecgaklr8nrsmbqz8u',
                lastChangedAt: '2020-07-06 09:51:26',
                folderPath: 'p35lspuuckyet6dkaqyyg8c8qe5m9fcbu7bso8b7oaarrro4wloplboey4aa7so6z3093l9hxmbgt8qt8qt9h5fz8x5bsz3dg7u5yck5ug5vkkdflax0t8hze4fx8rt6g5gus1nsdvlubpnzmvwqqcfy3da1ry4b16dyx0le122i7fpi09r17pxk2n2wovp3dzjoccfbqd22uf7ineizd8x2bbcjnodgr26v6cxf2fzu1tf9eivrtid1qj9772j',
                description: 'd71zys34pounptfi9zytk8m7cgdygyykyqgdmfkl0opnqnxdugtibvpg8u5e9lx0jdqwyrpaq1ixgozsc3tnsreplhvf3eg03aj5ytrlncyz5g207ipjw8rkqi7322x7rfabqlc1bdcvgcw4yvrsst2qh6xev7zl0r3one5e77pr8v113k7rpotwa5bwfux27lemmx6fgemm0rifq5obkwf95x8wy1i4kuijw3zbslls48ebgicha8efxblm8f2',
                application: '3l8l7350xbv62alrag9ymyjrrqoftufgxnnx72ms1oz9he6mg0iy0nob1ha0',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowComponent is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: '8auuiei9klf20hu1gef1',
                scenario: '9cdz6i9m4dajpxgde0r2e9nt96k66dlu1eo9rdi4hudt32aodlpcvfnz7b7w',
                party: 'h4wafvswlmwatu9no2dobr1cuf9fuv5dy8rclp5eqxs4c007xpsse9o5d59gg4grlduhdma56zh493cdjdfbuwv1tre7t8bw7gq3wvlbhiko6inoatbphzjl507hj3i1yrx5ju85p6p5vbuu195bewbtuca6pdox',
                component: '1jhznyo64a0e4t29t4j7j89pvzpdqj915uaoj4g6gz2k8sp3rkhm75bvuymp8j95wa9f7v4nqlwhp56xecp2z1op7n1n4t0dmvd5cb1gw73imbsdqtfojxtq2al4e6ejqbznsc6cbjow2eoctb7eq67k67gnkumh',
                interfaceName: 'b65lfjpxacd3d4umz5zqqlckg3qizxg78zkhvbuemw8eo2gh2pyr8bt8bh1y4mglavuj48x4ju9jydw84q01kguyupp8d6tf1mu7toks8pdlti9lqfdiii6tirmzzn2e6lkepnlcemulmibvhm5fwnuavocj9s8wc',
                interfaceNamespace: 'adqr0l9cy32b794heidy30opwbs5py78b37nwxvb4nyhvwc1bha57wmsjfztv05jv3ody6805a3t3vqho8dlpny3t8mpfp5jgklsnz5zduy8ud5m3nr0b8jzg2vnux9h3ux68l0e5ykyn7coy2rghmhdu6g01kww',
                iflowName: 'gwxa9c4as3a3emy9wjs6753nvmlwybrbdnw4afdmypxbq7ay962at3wd3h63zy1udo3tu9x0dh2zpigowxypmzsa03nrpmr2ir4dh6hje61nmdbktzvmttxzqston0zgrgivf0nd8kwkuwksjlsqv1zgsdq3s1o5',
                responsibleUserAccount: 'pii98akuiiiiqrfhgfwl',
                lastChangeUserAccount: '467d0e5e5m90069uk2jl',
                lastChangedAt: '2020-07-06 10:52:51',
                folderPath: '1sqdzulax61qoi9yagpbnw9n4t5yizs88qznh16b636g77dz5w4prntnfvwjtuy0r0sdwh593vqt18odyxmtasjercl9ne5229zlgdi1kbglbk93bi5ba1ws2g1tzj0o2rju04dr8focfnlzzy0xheo5rpw588mhpx780a6oi874wkklz0md0wsgubjjris3x7zyht3y1cd19qglxf2vv99vymmmrixt2bkl9br23pgoyrnd84jin6ixpau314c',
                description: 'nixqtmp8b8xx8l2wmuh367ay4xspgotd14wux2ialwdqoounkvvy0uhpanjknljy92ns5y0ejydnieitk4e24der8hhcf9pv2n6si6ka6o6q1yzhrsvch5gjn79d8z6n8p1bqkymyk6s45713qectn5moi4437j2h27kc0qqj14kwxk6b69uybq129rztm7j4j32li9aciibnknrkbu8ixikumktsljnauf4trwolm95j2c9x5v8fyl4cgasa4o',
                application: 'ev5re8zkhp58v40ehhup04dp72yw3m2ipsffmq1sasrrau57nk3mntb4awyo',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowInterfaceNamespace is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: '51sjzzsyxqa0kyv45rwu',
                scenario: 'fn2wl68rz1xizcmwk4u6j1a04cadn9xhfpb4v77coc7r62gvc5g3q5k6lg1x',
                party: 'aarmodjbrntct85dj4t4io8eyzmld1xl3wpck96hewfojkny2vkr261vja2p6vstdzqxskscpj889asfs1ou70uqlrfaure2jom4imlt1zic4pe7ibh2aq8o532xwp4otz9s1jbq2n7npfsf57iq0re5px2oihaf',
                component: 'y4brn4vwmv6ei2wudfcn1m7dl5iqdhhmagxvn65fgs9jizwbbr5ast6s51u2n9leixzcx6ysc73iouvrpyxsp0dmkpabtby2an64hyrx5rn1xreqqwpya0nqmuplvufzbjqouvzoi7xx8k6pspej25qctf9s0d3u',
                interfaceName: '94dbz6uefp6fq9lzovzspo18xos7nwujxlkh76p5ltg10t8xyjnqeogp0fvhbscmsuz3gqle2qt58mw96uxxkwsb4dzr094jtm0k3l1lh2fynhdyzvph8bhuh41bwqdqftzqga4y9rj229vv5nwc7c48tl9d6ixc',
                interfaceNamespace: '9yp4ummz8eohj5wp2l8rc7sxyklkj3h0sd9wshun8hbmm6a0wcpmj8h8tbieu6wu8qh5xjpph2tbjdcg6y7qodff61zkea07hjskbflvx5c253pjzve59ycgfvi3xwmr6oz0yzta28zdcnjx0t0m3ckfwiehdijfp',
                iflowName: 'rnm5uglhu1bsvrnx87zfktptwfirwvuxd77yi4x7aovp1tkdig80ty1xwf80cf1puria2eg4rh8avlgbjpacf1zhfb5uggrg8wszm6c7f0erdy279599tt39mlf0a3fwo73g2e0wyipub91k7ma26wox0xwk3elw',
                responsibleUserAccount: '7tq1pqa54d0318xr4nrt',
                lastChangeUserAccount: 'y05cjstmk4c7eak8ghm8',
                lastChangedAt: '2020-07-06 05:59:29',
                folderPath: '0thg58qcry813mh7l18qkjf2jfg8pldzpvepsvx0oric4pmck3ibpc89hg3eh4cgjpb64rv4wdanld6wukqpvvp8lwmzm11r07dlmx0cyw80vv3drgtt84pgtdpjpgukusofqzwvnteo1eor86qsc0j1gvn4udckg1l337pzmp54f1p0b01p6oqo6qxse2cirsmo93uahh7o6jnfcm1id53fuwshrubcg19uij8wtg2h3s1pptscdijwb7jku3y',
                description: 'rn3beq6p6t803tsnvyps4kmrsvsvcryookv5wdl62owlwd1gnyk3z6qy1k2bzur3wpd2790bxwdsb7j1i1rtdj8ztyvvgwmbptg996x1qf6f4g7kclukuga42q29wokjwbuz2aye2u2mnaueajkf0xclq594iz23bckl74ndj3wqfegd6k4j9xs3bg3el99zwvfeg171pz1vmnnzpuykzgc0hi33i66zeva7qtj6bvfr9ojqawttwincyejootm',
                application: 'l1wclbs1hxoysvvh2kv4uwik9ind25nbiaafuz1qkysezryr6r2gxz7c7262',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowInterfaceNamespace is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIflowName is too large, has a maximum length of 160`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'rgkhwlcd7r057w62jiqx',
                scenario: 'nlo3a9hheh12cr5ydoafpxae3py543d3jqzsu9qojuriwnz3ta0hw3bdnecv',
                party: '0ytss6zggs3s7rq16eqa1lyumm1hwynqq575ckk2n7mcgctls0stsf0l9hi055vh3m60n6vzesm66fvyd7svgx7b2r5d33crhnvojev0kb6pttkfhu10e4gomrj08k8brlhizpo2fe1v2y98g1hgr6x9b8yi8p7g',
                component: '25bj4hlqf743zcu9udetahlpdwxvrf6if66bb9r1gzt9d9uvlkd9nlwt2pl3av9w2ny0ygr6dq36hqfyr59f9ua8octqvbydtfsx7cekz5xhc53lw2mjlrnwbhctl4p9ubrc40m40nzu7fwx7am3zi5yrtd71ese',
                interfaceName: 'l9tohjcxgqb3xv0zxnxeosm8jr4oyw5v6jpuimxtoob9glpe51xzf36242e5cipw7swduoliwaem94uc0tdk8cx5ky87ng1tz2lqcf4jm3nkmocg58n1ehf7j14rkd9dg9bhtl7v0bsovwd0tqiuvlrwigpke6da',
                interfaceNamespace: 'o9z74sq0n4qgkuu0hygy8l6un2uc0laih5yialo0taprthq6m61ksvwt0vqv13w8kcsid4k01x7hnfqwa1xqd47ja5w4m0hnzpbfsfelb5sx9dzhmtn86n599aqdf67y8lmnsqnkfqezxqbeq3yj48cz1hkgqscy',
                iflowName: 'hbkq62rjnhjukf6rs86xbqmut1nxxyceefqy39ay7nuapeetx81svvvep0o0pstvs19sx88b84jq1mw37tmme3g28k1ynhdnrserwnzry3wj4a5pgsgbefy12jszo3zweii5hdxmxqm1x97a1oarhdxtdt27gxtw0',
                responsibleUserAccount: 'x3lclxqbquu7sw0xq82b',
                lastChangeUserAccount: 'se1nalccl1hzbptnu0j4',
                lastChangedAt: '2020-07-06 00:33:36',
                folderPath: 'i4sef3vx10rho7pf609c94le3cv4nbpij58ok9w5wrx51ipmb2ub6laa7ukj30ujatu8zf3z1fq3v9qiqpvr6gfs6wsxzosnaky5eymkj4nlg3fgqh2swdvmd1bzuhfbgfe46yiguukbs4fvynp2titg7ofg6jv7286wlubld6clf84795xqz1gq2g89nxjmznmcosfti4h9qn5rmau0jjd9dvd52qttgkw0s1t1tr7gkd16osncnksn4urxbkr',
                description: 'f1y4z28x0m3f57h6211ic6x6j5souzw1swekhje68zaujdn5crh01ma5qi5hpswhkrhpko98bki4t0ogl9gmkdntr5sxaaz5ciua3daramcmo07o7lbpffv89kcmxxkx4ajuf4qfabft4evh794tamcexu0y72msxx0qyn8a7jf1ye0pilaf1v2vs7n447mtn8sk4f153fi0sd6rofpthqftztey0k2b1049jctsv2fvktjo6t9v8zk0d3ifesm',
                application: 'qvcook6qlzgwc2rmkdou5pw8yxhz551m7rha1p3xs1wen9i7whe3zzb54zhg',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIflowName is too large, has a maximum length of 160');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowResponsibleUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'lc83f39lgn200222lfyi',
                scenario: 'v2a0fol7sqpckj516ii6yahg240tsmhqmod7qp49l8rrwnfvfpocu1npir5z',
                party: 'f4o019g6kxfkvusoyehe6zxzsgaukoxyfmzozbl6xznu1nut2t7tzxrfsbhpk82b2d0seay2xxs3d9cir64stl1iprnibrmlt676u1bgl6m582rgytfgs26s8jxse5048m1le0lc2rxa6lj76wryanelu04r5y02',
                component: 'r0fyg70jwfwz7qb9rfhix2ehcqho2j127yno67ocqrintrqlhx2h02cg7rve67l08funcpseecoqsg3t2fhrdwwp7r87h1ohzq0jxnorj8i814neart3e065289jf250xl2xvdepdx46651wc4fvyrknddn97swc',
                interfaceName: 'rm56d1z6o6oddxnbs9bwrxoaau9spwenk1xd9ygey6m2rjzv9tahljprfz8yif32nbbaa9k1zh3lt6vecg6zrexuz4pucqqsgfktljaf354k9anwisew1bnxg8x2lyhupgb13efv36i9e9e649uglwzu0deblwzo',
                interfaceNamespace: '3n2hnm103ou1prorbs3z8ej7jc1mv3haanf4hmxjqszm238g8x67ngjrqi4iblj39y91wwe5v8spbl9m4y544tn3c8jy7hokb4yngvbkid4f9v77nc9vcs0lekpo59ussa2kt5ef1r86dghmtaqheduf5qky896o',
                iflowName: 'v5m4aurdrjjfzpsht3lfitumgfjm426kth6wyff0fezj07kicudcw9xu6e1tpsgxx5e5dsjolvhuv9u1ysomdjmv33018mh5z4n0lw29yynckq4hq1gx13143roaivqni1mkq0j89zbyjpasz2qr13v0ltwguz5u',
                responsibleUserAccount: 's20cdmkm6zq2tb1nxua5v',
                lastChangeUserAccount: 'f0tzz0ya9gpj284dqpr0',
                lastChangedAt: '2020-07-06 15:16:20',
                folderPath: 'm6rc4w2fdyaz5swcy4qr8rb2zq3leqaimywwt3ub6msy2el3r0bwsah2rsqj8xvma6kavihlfpgbz4ibcyod2zi4ajy06z2aueitifng17hj7n0j437qjawl4zvcgf81i411zpeiw3f902n71h798lr6qb1q3jwf7834zeb4uzzrjks03kzxqj690a157bgsr7k4h9w85n51qwcczyzwh6y39hz5tlir8e6gr8d0gsv3lhjxpbvdauq0wbqt2y9',
                description: 'n384cjh96di2rgp25ayktfa2quvdmxlxt4dqs56z5q4bx1zargzpoiomdih9kmtdwkfaw2x4jzeh3r0mwv0s1vb0suxekitn1demfaahurb4zzicbnd1a288edwjyklir6xb1ynnxo2ri7rkni8oqe5nul6lnlznu6pz867m3mduphhh0nb28h0erbhkgbpjnnkgprttzzhtofpcz9z3z712cp86zz4ncbkpx7j8664obwksgegcaks68xdvqsf',
                application: 'luj5k4g6yt224w36jl0tou3ues5y3zs6j335bp6o1onvwb1l5n3tvcn9kypt',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowResponsibleUserAccount is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangeUserAccount is too large, has a maximum length of 20`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'y1sd9dg5vvpicwyxgxz8',
                scenario: '4n9pkps2tkl7tzssrubfducvf31mv7mx2g6fqytoik30t8umduwmp5jic885',
                party: '2pw3qgl9bo4ab6ul77dbczxicc5jgwtqt11ws4jl8ubdghf15g8syez7k0nmrrmf59xjfvvgj8zf1d9ofiolglbb0bn0zwofte2c1x62egdpz3yin3ugusupkreg3fyisrul2jchqeer6kwro7xpg0insccs3qxf',
                component: 'qv5fg5zguftgph5eyr1tpwbprhs9jbnrz5z8tvvpz8emm4hxuvyr6pt9an1zm0ft3p3c6g5ijepg4wvciua6zoeqxgnxc75ngpho78plqvqjnldwvrapcbnd46quidjfzajgml5aclmfys86yazelmu8i65voj20',
                interfaceName: 'dai5c1wyem9u459z2nuoy231kkt9gscsyf0s1f0he8idiocegfc01ilw3xscjvv4jzlcr9v7wnf5yxabmik4q1ajq7qzha2bix1iei8b1si9tv4abs1zlvqyjzs2novb7pwhavtl956c3bgl1ld8dwvuy5rhjbl2',
                interfaceNamespace: 'g9cou0b35vti6l906xqvre98w94fb2lh59owsh4us9ex2bn8r7ijl9jb37cf9n94b0ccqy4vwg1xklz0ezhcud6yer1rxv8x7s18hvjgna90cmjwx140vaidxmxn6u54ti7qutdh0rrf6bm2fjen1whe6a3rqsj7',
                iflowName: 'kix782n6dyu0htt2qpncc4oixuyxuymgvt0y1e7f83fjbgcwt36hhbwurw3ek84u6jfu2lc9j9rq6ziplg70zx5yclhn18oy62ry7oreqy3otls7r80reerv4mvk3qot90g6devsyxveo8i8tszu38obgspp2nyc',
                responsibleUserAccount: '88i5e1fery6ye9zv5fex',
                lastChangeUserAccount: '3kx88qxv7pal54s0rupnh',
                lastChangedAt: '2020-07-06 15:58:08',
                folderPath: '2qm10db43ssu4de8xogb1dgf2zjf9fiv204kt0zrabfbdxbu4cntw8tjc86imldwrwgs2zjy4rvxccjcpr3ldfjmmme0e5nhkhojdlav8kh4co29g4sdvvgoi40sdo8g2tfqw8t0smkyhrytl7juhtby4ceh3a6cl9b5ft83ho23u74mt7kgu6dj0z5o4by9y6n0ne0d9udxevnxmcs777rx358uq7lhlbksrmhwkcbh545qfalrdv49jhesuex',
                description: 'u15hpjxp4dsyovlzijs1eebnbzldx24h981jvq6y56dsq4uf8xwr6f1n9yupl6igumehopdf4jkufl7az6dppjn9i57r6gvqbl6xf5c9vvhb1pfgvrn09t4pz0hf10k522eq584sl2s1fgrkrrlmv2qwcpdyftqukespsys3cyf82wyifn21pncsp7k5vrhal089vej67km3y692rhwu11k2oaldk42ksm6lxdsq5ai8rs43zj1gq2wxklzb5q2',
                application: 'nsmlmb2355qh47mvqq1nmfguf9ha03dp07dprltgs9ld8qi17us1gmja8t7f',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangeUserAccount is too large, has a maximum length of 20');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowFolderPath is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: '82n5invl4a7l5voxwmh2',
                scenario: 'zcqy35vtfget5y7h0hchmeq9bu1ag8hdjcypfp3n0a1ppv5zga6lorktu4sn',
                party: 'dzimmyrn1uomy2s1qx4j3j6mg5ltsfximwg3lr2om137af22r4laavff5a0tq4ffw9jldsxy06te9v02b4u87umbavw41pac5trgwsgi480tg8um08anva5nfmzwehswjtlwfjjg5iap4w0u8fkm34b4sfm7gpww',
                component: '2o2lwdew45ilywd2imx74wi4yyemli0np3i6fxrsp701kja1w890fv7qcig9t95x0hhxqf33gw6qhmz6ndkh44qvj6c8zqfvlspco03o28rl5w1ph9pdkzgko27eqq39kh68lkwg8j1ykp1o9zlk7z3gexoovfok',
                interfaceName: '17sy8ney65rww2brb7nijc09dd879qhbhrb7d7uqhs5o5imven0j260vk7gf521cp6mr5y3xxehcj0azfegnz679az4hp40cpq6esnnwxe4f79nw99er12jcslfucix81xb05oh0my7q2hmm5341r39fpqx7h5gy',
                interfaceNamespace: '49yscgbbxv0b7znqb1uf40b3lf6nw29zehv0sas03ijqqsg87d30273s6l8wrg46r9uxre23o0a0n0wsmfdtw5skwwfcka2u0fduups4uy0ni801sfwbsata661t03vsgiirkuh9e2vjqrtplthrw2skfhqrjkn0',
                iflowName: 'om0iuvjdnt6ku71oak38srrjoyl2ly4yda71morhwevl187yg12krumb9pj0yf34p0tlcwms21ichawip91mcrqrvt9fq4yonuf9xyakyj07cyux1iv66d67amly23srbiltgbcln2u7yifef48q3hazez6nsj2b',
                responsibleUserAccount: 'ahi8fvt4j12hc6ax55gk',
                lastChangeUserAccount: 'hohus8tntuqubsngjodo',
                lastChangedAt: '2020-07-06 18:35:42',
                folderPath: '35exd094q9zocoaq29plh8ba70omm3sav28canap14p70i7oqogc76lou82o9u2je6e66y94u7ns5k5eeeb8o8urn6nm83ndsqyrbi3quhferu1l1rz5198be3mtdumzjvq8qgl867h3wc5ca8ih5ia14c8l31l0pusmxtpxus9nrbm6gk03ce4q5qr3dq9odteeacgl6ehb7mbnshhllgxf3pku0557ozdk0wv8yjuhzf3ya712svjjbj7yq5jg',
                description: 'p3ycji8n3u7ty253856we6fyxhe3q1qfrfsa45zcllp5jhw6r19gw42xla7ojw58sz2u3fe1968sd0wu6xfyga2vatz3ifbhrw1lgjedkddtxd949b722e9k1lt5a6sq4bsouebx76hx3qflcqsnfrma5ohcjxwn2e5idxz1yidoyleadvhk6sbslen3pb7whm8nvkyxa4znev5ehvdfblblp6151h0o24d7fc3vryuir1gcqal5vz4bpisipg1',
                application: 'j2xdxjqgdlkcw710yw8druefv8l6djyx6mm93nv54hy22ebqnscmt7vnnlme',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowFolderPath is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowDescription is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'i0mgui70c5vy4n6mx3oi',
                scenario: 'lyplqvskzyuom5xx8ck4jfqu4vafp8fjyjx1seendx9av0r8ibsawiwi66ut',
                party: 'fxi73epjx2auw9zo2a34juf7eg4qqz1j3m9bjqmruv0f2wmhhg56p3lzopqah3dqfzyddiij8sgjyo2j32yzv1krsdj29105b39wdj1lnz3ake2qs1057g4dfvpwgz9532biyd0cn0mmt30nrol7mzxywt4yzmei',
                component: 'kvt28fyet1dkvyummxb482rgkhc3x6s8lm65dy9qnh3nw1let2ih8ixpvw9seqvxv53ehqq430duu8fk6petr0dwpferamd5pvhvfbjprvw0wz6gn39wicziudn0z89llbm5lhvglyqi0xiq3k742cq91z0zhw01',
                interfaceName: '39rseye0ia8wj2t2x6t0mwcjo5lc9x6afwa4mmvyvgclltbbo6tlrz41zi35f86fl7ru2c4ecwi5muiupe6yh9znzchrnbjv5aapoh3jxvhqt1x8gjc4g7ry8ajpg4kpx6n01y57226x8mxq0yp5hov5hvlbj3f1',
                interfaceNamespace: 'm8138mfrkzq5kukixv5ggxim4jsa12eyvfja31uw7w22x0fcjuky8vj4i1uu5uji2x4cbqprdipc0ufkzcxpj24dfoi5iq798nexs3tb4gay1eqbpizqws2rkp4n8jxvj6a3om3vs3fimdpkuvvyzv1yxte7tgc2',
                iflowName: '40fjrhddd8ey3eadugvia64rzxttlukv1dupn724powsuxb588s5rbwlejafif9hjzutwi77c3pgmnim1htzx578vca5bphwpbkavk5j9b7slhn7rzn5imfo9esf8rvj67vi0gps59bt3rf6rfbl02mku53id72j',
                responsibleUserAccount: 'u8zaj9tthmpxpidu29za',
                lastChangeUserAccount: 'tc49fustczxo7ak638cd',
                lastChangedAt: '2020-07-06 09:04:30',
                folderPath: 'od45wwz4x96omzckfg0i1y85cgx7ii5q6ni7bitexgv9dstu85urixu53bg9nzict01n2x9go7lf1e4l5e14f5x6drnjxis31wfjz21gvydnxn0vl77nuivwude30jpq0keqoymjktj2dsv3283efaqw7ae20mq97ehvvvvi9mxjejegdil1rgze8iuc3u7htbjw7jpe1en72id4nh4ovoocqv0q8o22m0vi7xnnsb0gtj98lq5nuvpy42egezu',
                description: 'bb8uornetdw6sm1f7e4ypmb9cm9gc2rmzs5cb0q6dbkfi1okjy52psgpwmsu6rsmmjz5sbgzvntwzqa7o560d7v7l986842znjqg01tet1lhfws1ffmtjk8b103ipht6khbwv96wxasj76v416vyv1259ag27epe35v6d46sd14s62z4gql9bwv60oewldzmo64wt71f4hox9xfk9q4w28ite2sp3eyzxi1pkmv675b8h1c5swgitxptywvbsogz',
                application: 'q2h155i6hrldu6433foaw31hqv4amma85wnyqpad0oi40oeystwxs7cl3m1t',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowDescription is too large, has a maximum length of 255');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowApplication is too large, has a maximum length of 60`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: '3sqp8nht5mjwlmty69sn',
                scenario: 'hzth13bv0b5itvo5dk56w1zc19h29768ry5x7fogf2pwyhzbisu7tvrlvwuc',
                party: 'q573efr74hapn9kcp4jx52oh7zfws83yhtuwzenhv2mj0gcuwhfzln7cdk8xxskxaepthvuglupyodw9mq8tc20qxv5kacxw7cfyx8b1vx1ksbhkijoc05chyq8nsucaf46bvw3y53d41o2ygaa53zj5pmy6t7n4',
                component: 'agg8awsr6z3g4f8qagb6fnedf97q1lgh1nv54yfvyu4x2blcoh1ienax9ckw7ql1t0ao0q1b7ogpr9765lsxlvid0zgoz7c1qej3uvogjp9jrfk0cl5amvty36x3aw7abnkdq07qmb6vt3rwsj0veohbpo8x5q1j',
                interfaceName: 'nj79i3tpos4m0prmmnler2l170tekwufu13wde3cob35cbgg82h3ztcogqtk68ukr7tofwadr1hnbc1vvxbjcj5ya0jex1j59o2mzvuka3wqx1s2y96pmna7mg4qecj3ocdh6e7jhabmyy7is909bh6t8sonf5hb',
                interfaceNamespace: '6zib1p94l995qqnyfdmh0aheakoecbm7k6lx2tfftjhjejp0jfdst56o3ca00mwcr21o1bfi6oew1rrb3p66rgdzmwtejc0peq91zy6xzwa6oc04via8u6mx0nnw6ueuqs5mmhua0mlep78s1vimhvfvdgdjgbty',
                iflowName: '3mmlw5jyx1wxrjg1p9e8xtiepst53e8glo8a6dnyd56nztjmt0dv60qiqtwzalxjz1bsxagy5oedvev2bljdg3fe6x8605aadq5olcmv9hdmv8w7liftulvzx10nqaz5k8c8adhz5k6t2r1je4joyjlknohf00xt',
                responsibleUserAccount: 'o8dz8zud8wgjyt6vtg4w',
                lastChangeUserAccount: '4u2z0oez955rueli3sme',
                lastChangedAt: '2020-07-06 03:21:20',
                folderPath: 'p87tubjbuslobkbtdcd3bdwkypsskan4uieonz72tjymvbvf9pj8270ewbd43n8szqjltfyghajhahqhay5p6x2chyau6kbf5v3zghqqbx41hod4hqbn1lkyimk0u7rthvgcfdq3z0lp0qqlmfrwyh8l36eqnhqn21arluinnloopqjx6m05sdb1lc33yocs6sryoysc3un1znvsmsx7ln6oovs1o2oakoxv0r8t04azk8slmokj6gla0vdfik4',
                description: 'vjg8e4m12gl9qb14memy77x1qmf2xillp07reoq57a8d1mm1y4laemkc9fp8uiyr85t0dn3xv5mun1funckxabyzvz17xks7ie9shlgg5sg9ilkhf5c7oym5p3a7fhvwypg7u62yrj22pwoi9ttcpoac4mo8d7fiiv30188pse6o8ttqv4eenpbbh1ios381lr1mh6og71nqrjg9ba9yihmzi4ziukh8v8wzf2pwbxmir6xeyspc0s2n9nry6n4',
                application: 'e6g1rm8lcvwydcgpmg0ixd7qgnxu0ndpmcrwv4aoedrni0m12dqoof8s27opn',
                isCritical: true,
                isComplex: false,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowApplication is too large, has a maximum length of 60');
            });
    });
    

    

    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsCritical has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'y0gm5j3zq18d8qt3vtgh',
                scenario: 'pgb2wpv4qvu4vici6ijsk0k8w3cl7vk21szq53bp29o78vc2s1s0lnqtzr0p',
                party: '6rx5omoctnp33hz2sr8y6my84jv5qaqhwyaz3t3jg1hrhj4ie9qft3wvymyt4wwbsaqwkthpg9sc2fyoju06tk7fu4uz3o1dvb986l6fd7faefxdvlhy3keg6nnpnjhv2c3aecselm2fe43ljhgk1vzsantbvbhq',
                component: 'fxlzxz2of9h63gp2tcslqmnckgw54qty1k7w8hgj496ym5hjc3mbg87fdox2c2rbh5b0k2d5qbppc9qpzji1ajl6sbfulo0urpgi7yypb7pwrwn4pmlmxop8tqckfx58rjtl2s7kqv8m3n39bjjumhe0j9bim784',
                interfaceName: '7odtyqpyqhakf6hcpjgchbtqojaap7vesanlgvo5at2oi7rztt2qobmgqr6u7bu0sy4z5yzx52uru58hs0ismx50ghsqs4wrnpy7uy4vvwt1z29y1uufu91egwbztqehk3oxed2odbi1nm0epm9gvufeibh298y8',
                interfaceNamespace: '1psv29jsvs241j7f6l6wby2dy7mo8fd1w0r6qjrflsacgzg0fjld6jzxgeucl4gxbk4q0fktai3ujzslyv3e2g75b476dm5sn3ymlodk7g8i2ktqtilh1f17cmvc9j7lhatmy4yyps1ecnzd6sfsk05kqldm3oij',
                iflowName: 'dzqqvwivgxe4w66j8wlyvz6qgmxvrrp0cnhl9j217uvwvxh0cqwqybt4wjkwk91fu50p1tuc5qwxgvkjuojru1r6whty64u9fbutadp6y175eik204bpfhs80as0hwn6tt70nkquo8dp8cas3fzrlytu03399c4y',
                responsibleUserAccount: 'imss1bu1i9xuo9q4787u',
                lastChangeUserAccount: 'mqixktyswybqdlre7a7k',
                lastChangedAt: '2020-07-05 23:45:16',
                folderPath: 'etg7nfphz319jymtxd0hcrip8bp9q01urnwdnjqh55evkalvo00cu935umog7l5jnyf5mucoztz75poqursb0hrql9jilx7hqc2to809n60rc4id7ghygcpu3psl46mndcxuenejeyhbdgsrbptmga281bf1grtcb9mstggz7bims5cvu89zxeyx4v1xjkm1ue7rlvpdjg2dwpnjnb7xqpxfe5135z4p0kgz6qkljivk2b3e7vgkk7kx5zdstd8',
                description: 'cdnymrc445ijhn4otsuy5fi96606lhlgyq46xpd86h493y52whfmr0hxwfjrr9qciwel540618jvf8ntrm4daqhykq1wtrinwdj7o8cipr9h8yliyi19zqqdnojpeqaxk159etet1pj9r6ll83yxnm2lh34umjysji735056e59kl0d5a4n1h4a6tnwku0slxaw8go2yzjc9s593ve3e5g755gjb5nf0em3yuec5g7djo3mapnzxdqbtk7gim2b',
                application: 'cds0xczp7xrro0pkye7w73blt93iqhnxbb04m4u3rx7hjf8pkwjacqkj4v5f',
                isCritical: 'true',
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsCritical has to be a boolean value');
            });
    });
    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowIsComplex has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'aywtzxz8qh5rz2wxs7h0',
                scenario: 'd6iyrpc55i3ri58fggfytyfdcmi5w7a5oltvr00ktozjlqj8ahr8svd424a0',
                party: '5wn3um8ci7mu0ya24l8pxv1cf2ht1mhwvk7a78raima7j7y2k0nh2vmbvhum04dzsjgdq4ds44o2lq0wd2p6hosa209hdcbf148sersj65bqs1yr80bwntifglv6fd6bf3b5c98sjzzfooy4aitfy3onanzzai5z',
                component: '9yre7b5dxromuqf65e6xkp39m4ekc0wfdfb9xs6wapnxbx6i80tjvm3x1lvtoppwr24sbpl75mkpp64bp4dq5eef817ceb0epikt05t254mjp2jmgj7yc9afha78m6h1ybu8e2y645nfh2mat6z5ssur0qcmq761',
                interfaceName: 'ir5stszq9bm5i83c8yt87nj88tnpfo6n5nunrs1as1bdhjyj7q0qnw3lcixigjpgtu7ot09fgm527ofke0vhw6xe44tzkg4moyu26izi7wa06a79jlsk8c0yku6skfwxxd4cump3tmmzruunzqbgmlnh40sc08sn',
                interfaceNamespace: 'sqmmy9nidlmj2k74gy3yt9e951x18g2fau3e6ginhhpm42wnemionmnrbz00xetevvwsls0laromusd77kkqu04mfq3ozf9mediw1bfqanb4hiyqzox02mozif9bmeln1fqpb231umsmvk6cs6ghck7tgtowfb55',
                iflowName: 'tkkfai3l7197uqeqz51jbh26vk09rsaalmnxg8cf6vfign2dekbh11t0ip5o22q1og0w4q21izx7ldctpv4wrr8souuupc58pemd4i2rp33eluy2thpf47wrz6r0ryw9amya0nn0keur45g3so160grkgs6myoxk',
                responsibleUserAccount: 'mk0agnabt8sugkmaph8c',
                lastChangeUserAccount: 'a0tvamumsocnv405d4qz',
                lastChangedAt: '2020-07-06 17:27:36',
                folderPath: 'xovruq2bld9syh4mickkxqkykx27ihwutsxx7b8eftn47be3j5ex2fadz1e0pqqpdtv5eo5vtelwmzwzwro8b8q046jiph48f7rvbziidw5mxqk09kgdn5iyffrfizjhmtvut5c7vi08ttetzxe8pfdlg03uznps3r7qsly3b4w5qzr9tj95qv1i5sd6f9fszn2llg0fj5sb0pgewwic0ey4skzn65amv1wcj26s22obiv23pjdm6msx0rcm68d',
                description: 'ehh9pjebovxmr3cetv2p2hxbu4d8dhpprvepdh5yx85peg1hz0ewlin6j4rlwnedwgqp99lc80l3z8ekege8v4ut1jv6rz3n6k4novhfulju28eav3l5t8au2z4854yknptapbdcxtk8n0vg59f0836m318havkqgnm6531hzodzj1zijgb0guzn4evg8y68hjtx01qyom8r1gx2li68n1mi2iu0kbqt5zbv9po0bhpsitxckbtxnj4wijwsk97',
                application: 'n2tmfykq82ld3ldtd589e9879bg70ojcf5pj8t4qiej6rsihfghqbiyd33wz',
                isCritical: true,
                isComplex: 'true',
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowIsComplex has to be a boolean value');
            });
    });
    

    

    
    it(`/REST:POST bplus-it-sappi/flow - Got 400 Conflict, FlowLastChangedAt has to be a timestamp value`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'pylsnz23fh4x0r7ywmp4',
                scenario: 'v25a2j0ch9g5u9nw57h3gkngacnbh7dx3m4p4zfoms56u9ue1ov0x2od9yry',
                party: 'xkl1jv9ciueai1fflma68gnd6zqsg6mmztxl1p18p2kwqqtagtcwgy2nnqt0iuvaa6wku3qw6rmald9ewnbxvd1igtjpmsr73v0dyhxmadz6ikdufzqp4i6tvyeaoohh3kjt9fco3sl2dhl3387cdqtyqkkvv06o',
                component: 'pbtwwr4u77pdw9el60uaf5c72swrqtkh2n284q4un0g8iej9xnx9oaakpa7zchxoy1cc624ixa1e4f1kpol27dbnc1bigbd7cpz17xszx5tkpb2abmik2xthgzmhhsib2ujhtauhta702tgeq5fma2jwmwjjtlnw',
                interfaceName: 'ej0f1j5kdy80mjhnlzyd23fput53gjg7in9htglb4t0b24u0fdx6ne3r4jerc9h047oqtzr5blovcelhmcz9vupn2pvg2hzns5mnojkkef6791jvtcwiik8qfwyjsxmtk5uvp71btmnzoavsdqs73edw5ye1nq1r',
                interfaceNamespace: 'gh9mdft3vsauq4updhuiqjrb7cwg6nyats56qi2dou4g2537ncyyx0ni5x0mzj8g9mpzyimq2gm5p4hsyfj2h4e9iczt9uydbyvilfj5jig73mf9x6tsv0jcw8g5gbkqtmey7adv5vl1w7q5aj9b0dvwartvw395',
                iflowName: '2qk6g6f6ycy64cm87q0w3tijvwc1t0qwf2ghlixz9houpv30shvct2i67v0wuk3z7ez38gx79ksarorecye8y5mwj6pbglmlps9isjcvwl68lrdedvqutsxatzttt41cobu885qubpisvxzlq1e0dbdj3rjvma26',
                responsibleUserAccount: 'lb9fwr3d64p4rikicivw',
                lastChangeUserAccount: '8hnrxveorlggas2lkesb',
                lastChangedAt: 'XXXXXXXX',
                folderPath: 'wzz7haq2zsajyhfbcxzm1mmwozoy6sjmqisonhi4xc5qj4ike6hklztqpxk8l5juwp4zuf57qv7y3dj7jexnnf4qpjo54emk2bpecov5ppeydq19ar22w0rv56moa7jifefxn0nj8wlrd24q0zc8lr2jb18vkgk9jan7jnbw8hx8yqxyf6mk01r81k6bdukc4blzxog1oxsd8x5r7blno082ffgsi57knafea6d32iduu50hs62to2xagqjgdwl',
                description: 'g5eh6bls26e2rxehoumglxch0pkk3hnmq66x3quw4wn2oobgrdakf8gb5s3qx9212fpybpuoamqierto0ua861d40j14x0chd0lvkpsosnekapjs3asa37ignj5gljc5grfazg7ag9jrhyw90nwfpa5th3v5wxnd16mmv9dx4ezkdd4okn671j7d46a2l7qgzls4w8sx1tkb4xnoyju5znbwdzyt06p28wqen2tnch2wu7lmwo0esf7lte5rpdh',
                application: 'el3sdgi2a2alfm75mfwzfo6ub2ls8x8otk4k9buqbj8yn17bzp4wkpwfyl5m',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for FlowLastChangedAt has to be a timestamp value');
            });
    });
    

    it(`/REST:POST bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .post('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'rynfziuhcaob0qgywdev',
                scenario: 'i7npp4hryiwbtkfx5coox0oa1f8d03ekqr00nz7o56slrjfju3geaxg609to',
                party: 'j4z10maybnvmhc2296x1ykzpjjcqux5xserwsu1rzb8i8f0pr7y3ufmvixjgou74r37392zbrgy5nbyzm4pqfz81q66l1d529yzpgthru5em50ygul4yu9fa0g6fjlrhad0y3hb987q3iwe0ov7ntfjjbdw99idw',
                component: 'sg6h76f2knnw3xck11vjhe3cc3svjgq88mdkbuq0z3prqppmtvb0oll3tfrcjcmjkh4eljqp3dbczqnufgmugrtydqfmtc4lnwtp4nzrekostn6b8uekrkn515mzxzxdex8kvxuzrgd0o3j3brxt5x7e2b4xc8yy',
                interfaceName: 'ofja13gkb3p0wrs14b8kqox946o6igx54mc1pcddrkpx3ktdqyrsmgtwbdbvkybeyt3mqx198fgyrdmqc8idbt9rmnf2mjwc5nkier365i7o0zgb8r3cfzequi8xazbwo9ew731gol7e2u3nm6m99mno70w7d68i',
                interfaceNamespace: '5pkws0trqzvrh9duruz7gh8owtc24rwcg4a19xpkc22quhqw4m815kxsw5pui49tym8pk7vdd1ivrqt5m961nl9cazbq6j7se7r1be2fc7hrc83ecimj85dp79c6sktujtpc45z8aqbnpufvlisl0pl8mrb45eeb',
                iflowName: '3hp5b71heyush1hn3utbojd14bzziz8v4ywyeavzeb1ee8ihzapvtcyhmynurmxq40fh44xlin13gqu3mtsfybvlfjth2dmj17ru0mq06en4n5d4k5qanckc7s97d9dgbui2f6n9mi41db4hpjeezybpfucy5x36',
                responsibleUserAccount: 'djxqywnj9u6p7ct01f8t',
                lastChangeUserAccount: 'k57i6y3mx073xui6p8kk',
                lastChangedAt: '2020-07-06 13:48:44',
                folderPath: '2m0dix1cg9g6kjtoe6bhj68ongew5tcbv70xg40q2ix7hvs7mvm2rl93f8wq6bawk1f0h7gr2jbq85ya10g6md1sszu0vivy5k1st6x433m8bpyao1srf1st91qgus6tq8ajcmx3duym6r5laexvzqxgpxoevxivun9rtlwdvc73ax3avizjcgtawief0pchvil58qaxdcq8r193k8hmru3xs4v41olgl3ww7vov1mrslvhq8zi3rvle6jk0vtv',
                description: 'e5oaook8v4kz3xwkwj3lwmavcx6h076hwvolzoba7udxy8wd76b6qzsxzep5ftsi4d4spwrsw20qb5asu2mwyci1io8izn7jpu79zo4uy2gmbnk61eo2zjr7kxyfx7zxv7ggvv0mqi3y3ng6rdbguxyks228auk32n5lquosp9en8g0zvrq4n5vje2wfju5v59pyc6ni5g5mnvg2x6f7f9s2p3ntz5ezbsy8bzrdheo426z7pv27cu225f5y3q4',
                application: '3mlu4ckfy90i01u3cx5izmcyh4sitmyx9cm2s0ygeguhsgj64yw1k7ms7n6y',
                isCritical: true,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(201);
    });

    it(`/REST:GET bplus-it-sappi/flows/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows/paginate')
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

    it(`/REST:GET bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
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

    it(`/REST:GET bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '52ab0147-24ff-4651-bcb8-b0084ebb39cc'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '52ab0147-24ff-4651-bcb8-b0084ebb39cc'));
    });

    it(`/REST:GET bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:GET bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flow/52ab0147-24ff-4651-bcb8-b0084ebb39cc')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '52ab0147-24ff-4651-bcb8-b0084ebb39cc'));
    });

    it(`/REST:GET bplus-it-sappi/flows`, () => 
    {
        return request(app.getHttpServer())
            .get('/bplus-it-sappi/flows')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    it(`/REST:PUT bplus-it-sappi/flow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '0e3ff543-0aee-4e89-8e1e-c4ffcf505c8e',
                tenantId: '07c1571e-cb72-4db2-b987-d1d49e53ccc6',
                systemId: 'dde5ec1e-d361-42e9-b28e-d40e5ad38725',
                systemName: '0uitlt3si1b58uwr7ivr',
                scenario: '9vfovtn682epitxa42qhsluou3vwvob72453acenhfkr2if4fg24bq5xluvi',
                party: 'x254yv5z8vr8vog6m43vvnvbakt9155z0flfe5nil1mpxz3jrlsu0y0bm766linw9ue2f5yuqw0z3oytl0dgbgwbebyv682gpyj6atwbe8jjqez1ax77faz8w63vq0dw6y5elpy603dum7sw4wljmc4g1jr0sq8z',
                component: '1k87v5hsphjhljsh3pziy835rxc747rp0n5ucnpoy6o5fsdmwxr4jrox667kpq75w43vxjj150wjcbwsyvh0govdm95dquomob982rhtvaj3ritqxstn4x82kzcrbphrf971uq91g3tewkbe82b3gfyue4dfpz3p',
                interfaceName: '69xnfxc0osyfltff3r1yams9zt4ag697piho4ae9vguz4u7c8wuhpjgwx2smmm051hhukiy08kq0esse815ervwaqxknrbd6jkvi1nqzmvan8r03zjepz5lrga6gc3imt71iwviv0p21qhq2ml31ocok87c5174s',
                interfaceNamespace: 'il54dcttmqz38bt8u2mkzi0tneb4lru9x63emvcyamr8mlueqx71ebp8q35le2xwahd9rqkbryruhma3o8j5hwtox2hma9mzozidasn91pm6n08uuhkdv3pub5ya08l0qa6jkhtkz50ctpy3w8jy1o43ls9fzf2l',
                iflowName: 'dfh6n8vaxe407cncuf0k1tkefhptsoktjffuuo1g3eqh3ze6k8dz0ykdq81mh576ipotqzhvz6jvba5f4hxkcr1wysup1wv9d89sdps6aj851obqk9a5dkxpkbemrfzg7cgwukmvrk9mx93t7p1lhbo7uwjhvlpp',
                responsibleUserAccount: 'f0qayyb03u2z56ussmws',
                lastChangeUserAccount: 'cugjjiemmmhwp4d9wpdv',
                lastChangedAt: '2020-07-06 14:50:36',
                folderPath: 'puxmpsyk9oreramubcpn4tn6eeuinbrnqhe6lqrud0k2g6stl1w47qme22xw95wyea2iydru7j36z50en7wrf899rsyzvvfsdfzwdfxp0iy127198dzwvs94s3kkqdfircxwmo79zytfhlw5knnjkqx5er78q7znwel0e5pza7gelsrqudwd0terv3ah3mna4q3rnx4bitn9u0or3akkzwurtjngx1cjnz0nedfo8diwjbof7yr59qix0ogdyc1',
                description: '4zu4ijehj7ak07odmyx1dc9sgfcywctebbecnxdigy33cflv79zmtxnwqbkttbl8et01hzpro7k49vegeiwaj4bcjlsz8d75rg3yjn9dwj22vd4j29otrnys52vbrq8vaan75cg4p98mgzer2kuvzabu2k55wp2xc2jsn7excc512ybbf1dw6k91gyx3n5zsq52pok24rgribndj10zyxjdv8ucy4ppl8pghaa3d2572wr9ptthfmai4415zx8d',
                application: 'ewqfu3u2j8kuedrors08rdp3oljedn0kxui9e8kaxcdin0uecmqpytvtx2y0',
                isCritical: false,
                isComplex: false,
                fieldGroupId: 'cc7c596c-737d-4c76-8656-21797c31a476',
                data: { "foo" : "bar" },
            })
            .expect(404);
    });

    it(`/REST:PUT bplus-it-sappi/flow`, () => 
    {
        return request(app.getHttpServer())
            .put('/bplus-it-sappi/flow')
            .set('Accept', 'application/json')
            .send({
                
                id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                systemName: 'i1e2puy6q3ptt36312bw',
                scenario: 'fef2i2iifz2lyisoenzqaqr16omiwsi9hur86invcpjmipuapvxxzdw62qa2',
                party: '2ivhpffcje9969wkyriog6cjztv5rdrqzokpp3c8itfphsvm2cl8bnwyivyi95ywusbiut68nh71bhhkoent8aybrts1f4fbnot3r0ivqtpqwna4xa56hk86ffgi3086rt2kz6on39rdfwd519ai49u9isupy33l',
                component: '86m03twyhhf0dceoet56xvz83h2tevli97zoefa1pftwi7k4uy7hsc51dj2gzua69wc6o2j3r3kr8dmlaquccz4ypd47xi15c65dpnnfs1bunpocoil4esah5v85sxugp3jnrftrzlwjx9abdq9zw8cvsgpbd6zs',
                interfaceName: 's3lavwfzke1lgckz3mqszjt3zd43gznbto1lq9w6fmorn8en0oqn7g0osrn76e8qadi1sa2ch3pbnn0dt84s0cnvp87uyy8rtyg16fbz7wdja5abhgfrtyrxd7h4aa5pf2t391zcipbbe7li9clxmrajtu55x85p',
                interfaceNamespace: 'deutt9tu1bxm5lvpddvn3c71lnsk2nvxwklnjji61vr2vqin9hvf5kaw7ygk1qf7nk1hv499kxtgse9kxolvdy0ljoiuv9jivbbvb5n7h7kr1b8s061moqtca6frx41p6hi6snakpw398buysf5pa96an87nu26k',
                iflowName: '1ibc2d8wzxtu160zs2vlp7rlqxaexge2re73zqw74ghinnddrufffeubsyj0kosi4xqncpnbwr8w0ix3dt8d6ar0ryoecsp6x5624e978hiwznwovqe6jn9q7yi02rr8cr2zpsl3dwip8dvczfoz3gmwkwn2912h',
                responsibleUserAccount: 'iq164yk1qkznyedx7q8i',
                lastChangeUserAccount: 'i5ctu4lp8tofsppy5quz',
                lastChangedAt: '2020-07-06 06:32:01',
                folderPath: 'o0438uk5n8yhyyfju42pcj7fghecy0exuoeuqdy891bmjehcqwppd78jo8mbqtolkuge8382g9wcuduol59nhgag18uwrdu883gs3d58lk606omjk62jr2t4pmq97ajzufw1u1mgo53wzyqeog70b5w4le66tik0y3wih6h37fa66areewnydxhuav9oqk81amhe4gsal5jx53gx2vkn58712fjfqemnjrqpjlruy862oq681pofdnepa4cpprm',
                description: '5am2vl7rqzod0yw2t3tz6bpw84ifa3xfqe9kt5j7g2wa2isf6g7hpvvm3hdud7c9r0oj85tbos3ikl66qg6fwxhgk7tujpy0pouyssujn5lh93z0wk6uxxmt1e5t9etfzl5xxs84hz91n2ug2e69waq08rtba6ktw5bivpmupcmtgjfxdmdeh3u4cqs1yk579uuujradk7gcj4oj8a5cirjr4ci981z18oasfnm5b8mlht0c3eou8xss91tgt3w',
                application: 's2kwou9h1wbj6xer83rvxsy3m4le7pqp3aeahfgsoof85bmm0rlphkxsspci',
                isCritical: false,
                isComplex: true,
                fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                data: { "foo" : "bar" },
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '52ab0147-24ff-4651-bcb8-b0084ebb39cc'));
    });

    it(`/REST:DELETE bplus-it-sappi/flow/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    it(`/REST:DELETE bplus-it-sappi/flow/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/bplus-it-sappi/flow/52ab0147-24ff-4651-bcb8-b0084ebb39cc')
            .set('Accept', 'application/json')
            .expect(200);
    });

    it(`/GraphQL bplusItSappiCreateFlow - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    it(`/GraphQL bplusItSappiCreateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiCreateFlowInput!)
                    {
                        bplusItSappiCreateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '07b9fa2a-08e8-48f4-8cdd-5a9aae32b02a',
                        tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                        systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                        systemName: 'vxnr84ehmefdtkaez3f3',
                        scenario: 'o1ytlo0y5n6sm1inbdizzp08aa6cml8adpx8atihbsm9swtanx7qf3s6r8gc',
                        party: '0x4kggysqt5a4bb556cqjh7opeximyuya54x08yjp0mp7k3uop3sa8n5to5rl0yjch9sfciwtwvh3buutng37zopc55r58lqfnc61l1ghvj2izaljcrkjarh1y4akbtw4e6l56pksf0nzxw2jz6npktx2qfd0kjy',
                        component: '6alwql3w01xufk4p1ndqtcewsy1x9w3rdu1q28e9v0ogetih72tnfw6svuci3qvac9o44vq0dwtf0rml2eptkek0g6bhdue0eplgf5z2amwbui8tjzi6xof3vn0mwbldbdj8wdc6yqu609dx2i74lc8lizela859',
                        interfaceName: 'm34ga8xx1ggt8lp8wz65cui44uyhtt6v9bx1sc2hsfw4rcdj515qigsh17y48pcelzg7ynqc9wlu233q0xh3hb91edlivc4zaszewo99c9wfp0j8x3rjo0am7ol1c9n9mbo12zlfwvvl6muue81umex91zs37xd8',
                        interfaceNamespace: 'zqy02msixp4dnjt57kj8fx8cigeutxoskgehy755t3zwhj5ogmhcycfkesadl5q8fdivrq7gbt329hons98hjr6xh830btixnkba6w5rfntmylj42svwlajehdcjwfvb3ep9csny9ayc83il39a09qn0kvulpvpc',
                        iflowName: 'gatohqd67lxrzjbcukpqqfhqojz9xuqk8s8rs34wn43ix4twwssezqhhkuzsevlfg39bn0bgi8hwanjx0p6ext2w935zd0bkrvws5wdm3epyj1aixy5bl59hw5gj0517yqltqkgcktkhoaf3787s0oz2mdutteqb',
                        responsibleUserAccount: 'kk1jd916dglur07dlxer',
                        lastChangeUserAccount: 'ax57laov269ssz62ml0t',
                        lastChangedAt: '2020-07-06 12:48:23',
                        folderPath: 'z4o5ienoq1r7t9szqdz69ael0a19n1w83j8fo53qmpdske6epkbd5fzkbec78unvormva52eqw1o1b2ar3s4rkrrfhauny4h81o8d9p8udpvvjlo1kiuunklnmp91i621cl8f0eakasi3nxcvnanpwk9vryn5fgntm3k2qilsl4hhffckzszfbac1fzhw9l8qdjjev5q1o7xxcenqjo8t4uhr2nzj3o5984ydvovywcjd9n1h9wanmmr03yt3x2',
                        description: 'q3fmfgc21ro6z976f07iwmm2br91dyulh42kw4xw2xgo55we6l6cij5yoiqga3ja5vyarti1dxghowcv5tdg76m21ksgdi4p3txbr0n8utl5l8xr4k59dc9s7zpev9lutxu1e44dd3ur2oq1y28zvtcgp0udeljvhjzhu5vyeewqbz15uytsp8pvplvjgh3nmzmufik6d8001qye96j17ekjtbpe0tb0ey723g45xkbkskvab1zetvpw82f185f',
                        application: 'vhss4bwl4wleelkb829gz570lmiewy6cup173dkc2l7m9o5ddchq7odir3s1',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiCreateFlow).toHaveProperty('id', '07b9fa2a-08e8-48f4-8cdd-5a9aae32b02a');
            });
    });

    it(`/GraphQL bplusItSappiPaginateFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        bplusItSappiPaginateFlows (query:$query constraint:$constraint)
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
                expect(res.body.data.bplusItSappiPaginateFlows.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.bplusItSappiPaginateFlows.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    it(`/GraphQL bplusItSappiFindFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    it(`/GraphQL bplusItSappiFindFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiFindFlow (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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
                            value   : '52ab0147-24ff-4651-bcb8-b0084ebb39cc'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlow.id).toStrictEqual('52ab0147-24ff-4651-bcb8-b0084ebb39cc');
            });
    });

    it(`/GraphQL bplusItSappiFindFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    it(`/GraphQL bplusItSappiFindFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        bplusItSappiFindFlowById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiFindFlowById.id).toStrictEqual('52ab0147-24ff-4651-bcb8-b0084ebb39cc');
            });
    });

    it(`/GraphQL bplusItSappiGetFlows`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        bplusItSappiGetFlows (query:$query)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.bplusItSappiGetFlows.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    it(`/GraphQL bplusItSappiUpdateFlow - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '12a3e9f3-b2f2-412a-81bc-9b69aac9c8d5',
                        tenantId: 'aec024e1-b9aa-4e55-a7e0-9b19c5c85bf8',
                        systemId: 'b8baec82-1ab7-4a7c-8037-3f839024465a',
                        systemName: 't9mqiw6xev72d3lchyf4',
                        scenario: 'rv0gbeepmq04mgpm9jgx3slwe3hdm8v40nris1bc5r40ingap16enzslmd0a',
                        party: '1ibug7yz33z2nf272c7fkuq9mdiiabg2rbvp16sma61u4zr402cf8s66mr1xkwfpj3i78h7985a294dwayw404yvo78nd68o8hl5it81bcfe723ni9rx7emyb22dk1r0ie43ximzvauerrqpdksava0apd52s3ue',
                        component: 'nh9azpbw2kua060xkfkjsed2b5q8ffy4g2k577qzx806alhvvaf5ygfmjlapya4m1jehldfvnebgqka0k469i0ai34uzgq39cqgbo3pcb622ajubj7rect1knworcli8iatumhqtgutzyd8lj9o7s7jyzhc694iy',
                        interfaceName: 'ow78unp590ej9e3pan2sj3hkvjl7szjgv0o0ddyzxi85xrp6hlwq8r2rqwfdqpnfjxzc6owra5h32lgsyo7xykxikc9imh2e0crouzzvf8qdsigyvgq8bvfrn5xtsxyja55z9fna5mbue1e0l0v1vde5fjsue7ap',
                        interfaceNamespace: 'yik9md3feiqex24jl139wn3cwytafpruh97y75wqwx9f0eb1e525bjbzwn9jbozzy4svm4shf1fsz0fs0t7jtr35u74leb3bnz77yb2x1fojiz02q1pz9frt0jyda287jq71qrju796dxlkxohgn7s1tvy9mo1ol',
                        iflowName: 'm9df7l56xk5bp06vc9fctzmwgnlux6nq9870wkud8h2zwcmhpwmkmhw6iarch1ldyojh6b91u41ksxtmkyy2okfms5cc4o6gbggqrishvwcs3s1jb54ifgl9skal7iqn6sfja8h1t3grrne2dd1k8ynt7ky7l6zh',
                        responsibleUserAccount: '5qn6x3p74wq95snay349',
                        lastChangeUserAccount: '1vriykt4ltdiei0wgjx0',
                        lastChangedAt: '2020-07-05 21:25:08',
                        folderPath: 'rpr9psrurft8gcxbtco3hx98f628vkf2li9s734cs05ccimnlojoox7tt7xiv4kp5s3rt7cxrwxi130k5i7jbxx67g62qp05i93uhkxnl7c31n74sd64y30vb4s5r8i2qphcf2e0jr1yov3knmwffmza925k0m056zzgl10n0tzv4d4vji261vxpjb4gttsaphii9oxv7wn7p7y8g4kukgs1nfbhgabe3bmvjpgsup0xd8p6l6nwbmdubehklgk',
                        description: 's0k1kkpu4hrb1qahsaqf4um0svk1ew1t4kjpniay2prfv96h1tawn0p6gp0mlqnitn52iebd39xvjgivvc61ng3my4kqie4j81ob6g4hma3829mohd2vi9zo3p8y22x3vwijkzz8cwyk069d0l7ldt3xi7la9g3yw5pdhvz72sru96lbv069ix1zxxfjs2gvhywhg4rt6zcwxxt17r21q234txfwlskoav6xl42ndlfpugyyqmozug0m2bluxde',
                        application: 'nsuaefy963g0leiqaz25vrq0in34zryafu8rj721qjpofnshiv0b6rtoc7dp',
                        isCritical: false,
                        isComplex: false,
                        fieldGroupId: '4d310ef4-d27e-48d7-985f-18c463d0e650',
                        data: { "foo" : "bar" },
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

    it(`/GraphQL bplusItSappiUpdateFlow`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:BplusItSappiUpdateFlowInput!)
                    {
                        bplusItSappiUpdateFlow (payload:$payload)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc',
                        tenantId: 'd32ae511-ac63-447c-8687-05a47a9c6f80',
                        systemId: 'fcd3c078-15da-4412-9f89-10406c5be431',
                        systemName: 'r71q0q4aspvvu9xzsmmr',
                        scenario: '1gxsgq4grhgemtmt1szufnz2d7y75tcodhr8jbbwckmrlyq78lfoy138ncsy',
                        party: '8htbfbfu6hf8f516lqzrfk5wlqgbrgg5sp6tbnidcqu3yi6aiaj01rumrntix668cxlzmn74nf45idttoq3d06oc9mzsl7odr7c2zb2oguodtn0zoeugye11znjl5v90w0fy2qfgl8r9kw3cp3vdr28a3ajhpgdd',
                        component: 'nu34408tcf9bmfhef3hfq4czfv3fw6whd9ojrnvc7snkcdi9j22fpfnjjc9v3bt8lazo0pp6x4yv6rd5jqmh9morz6mav2r4qgd3h87cfusfiqjqnquzj9bt3mnl2kspk6ye7991pr2pnw1i9zgl8x2x39kzgca2',
                        interfaceName: 'jdazme4qnebvgppoig583m8kbkdisbssyx06t30dh65qbm3uo4x77i6xnhz8ycxjed7qrblm8kz0w7ooxzrbbr1z0pbtyl4psvdt4lqcrohtp8d6f92omhjifegiiguuu4bz4z1d7tm9shh10g95a5j4mm12gytr',
                        interfaceNamespace: '0vn2t5llce5ptezj11xh61vr1nw2ooiq4uadhqradu2hqmzaulu34qgu6ahwd9zd3xn2nicmifkl5n9c3emzsc3p3d8am5cjjgowfs162m1b5a8nmh87dvpsdx3mytfzzu7gus39ksfcmb6y8fi6nvkx06k8lz6g',
                        iflowName: 'kgsd9lcum0k7pdj10vqzno05qyne5sjmogdyh80ydl655nzjlwrjlwo08hc8mie1vlozr1y7fwz4swjf1mjtl39wknjyhxq8p86av3f37eaj9xc2tejt29lyd189335grtl35chuepykn2wzsq6x5bcs86kgzhrp',
                        responsibleUserAccount: '7hurb758m28xt5fn2z61',
                        lastChangeUserAccount: '8qj58yi29rqafuwov0l6',
                        lastChangedAt: '2020-07-06 14:23:11',
                        folderPath: 'pmu5c6va9flubxqqxhfbusmduwjlm2tovubtx3xoauvghzuer5fa0d5k55o2nawvh779llkiv4x49y291wrth80sw4t3ou39vqtyz5voi6x955btt61g2l7y8aym24nh3djp48rdn4gbbump48w5ozp11bzbxoo9zdf6mt8k9okp19dh54446wew5r13z32aodhrhyvwlsninbjc4n46yy5p36y1x36vpj5og9ly87k09xlm7bjztrafbgo0xqv',
                        description: 'dxxe6grtj4dpldyf9s3h75j6tuqd7vfhxe9h7i2h0n3g56cou6ignetbg9hp901hb9gftswywqiufzbv4fjgl92aej6kqf8or9zcvbnm9l123vm3w9me7kepnjogpiw042oosxjg4rvh68r2ucitu65ixokszkxk0yxz9lp7a59r8k7wynazfv2alh91qijf6jvgkhz29z31dhae1dl4jlnupm5d0u0svkk84q90gb63qta437kzpr14viqqqlz',
                        application: 'kv6rbibceg308gijb26eidg3j4lnu020bgdvwsww1e8d4cjn5dx169gj2k78',
                        isCritical: false,
                        isComplex: true,
                        fieldGroupId: 'e92b3792-5b0b-4ede-adad-c9631564eab8',
                        data: { "foo" : "bar" },
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiUpdateFlow.id).toStrictEqual('52ab0147-24ff-4651-bcb8-b0084ebb39cc');
            });
    });

    it(`/GraphQL bplusItSappiDeleteFlowById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
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

    it(`/GraphQL bplusItSappiDeleteFlowById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        bplusItSappiDeleteFlowById (id:$id)
                        {   
                            id
                            tenantId
                            systemId
                            systemName
                            scenario
                            party
                            component
                            interfaceName
                            interfaceNamespace
                            iflowName
                            responsibleUserAccount
                            lastChangeUserAccount
                            lastChangedAt
                            folderPath
                            description
                            application
                            isCritical
                            isComplex
                            fieldGroupId
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '52ab0147-24ff-4651-bcb8-b0084ebb39cc'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.bplusItSappiDeleteFlowById.id).toStrictEqual('52ab0147-24ff-4651-bcb8-b0084ebb39cc');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});