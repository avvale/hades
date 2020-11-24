import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/domain/administrative-area-level-1.repository';
import { MockAdministrativeAreaLevel1Repository } from '@hades/admin/administrative-area-level-1/infrastructure/mock/mock-administrative-area-level-1.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('administrative-area-level-1', () =>
{
    let app: INestApplication;
    let repository: MockAdministrativeAreaLevel1Repository;

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
            .overrideProvider(IAdministrativeAreaLevel1Repository)
            .useClass(MockAdministrativeAreaLevel1Repository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAdministrativeAreaLevel1Repository>module.get<IAdministrativeAreaLevel1Repository>(IAdministrativeAreaLevel1Repository);

        await app.init();
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: null,
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: 'ojcq9kdz',
                customCode: '209qjt7k2q',
                name: 'ttbhd18ttutggwhz9rayc5jddnq4ap0empp9muehqzic6eoyw3skterejm43ogknrv9xr8avktcb0f3d5j8xz19m1xtznv05eu8cdh8go87z7pcc9t2babt1oozofwvq0jnt42wl2l513hals3dqkdqbr332ehh9ai4pwo4lt2bb62b6y2a9ehqt33o8fckaz7vtxjsf99mi2gmzto4fmsmbg2enspj6q23fwfc8xvfk7jeowxyjw8c4f7d2ct4',
                slug: '0zs0fb75re151n2vyne185uynzvkcaybzise5xhan36sf1nsw4rg8hynb5dnken0nnego7a5f65udeeatz3rv3eypjmm9oz90ozea4n6wyy3gc6ot72rt8afx1h0kkufoyvvbun7f8h20q9jb055ohrnxv3p7lz6w8zu1yfiyaw5ypl5frfi24tztbkyitd9t6ozpu1mayw5887t2dmvlzxmcjaomta8no02ccumgp2yu6xdpxm8r25aofjww3o',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: 'il2485qy',
                customCode: 'hs0iyr190c',
                name: '6hblbtwblg73jqcxup4l7rcf6rwqug4v0rqwyidy0tcwkczrcvcjfxxip4w8dxj8bi6qoklsz6acxegyk0wf5ngzf9gqh4zjbkf5v1b89r8od8eic4rqwm94b1a03v26tkx12yfu0w1e5bdb4c5j394hfkp4vj2s03ukvo8cftd7zz20doksz3zxqm5mdyoz7xq913b21rh3s23o3j7f53jgsjn67pufc8gh28soon259q7gx67u4brjt38s4c6',
                slug: '0pi5qldolzajg2utnaijdprqkdlpapcye9y55bzdmg5xdf0btrropicoic0di8a4v8r1emwccme8na3sx05qm197w4ejra6o9bhbmbyfu4l0p8e93c7uor3w0x8liyhbci3kbrth7rprvalsj2hu1j6qkjayytug1xmjx9mj137r215rx6o04qn91jf73biutre0z8n0841brqmo61f0jmnwknrrcf7du2u93e71zpib4skq4yn1d6kgr7170wt',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: null,
                code: '074jiqw4',
                customCode: 'bbnwlxaloy',
                name: 'otuj1orf1rxw8aetkwgug2hslp6apcuo2aomddoy897xje9yeuxfvuemvzwtt8xn5zh7lg1j60frloda05szdfezcy4h2hlkti6s7di7jntuzu79n0j57d91b4rza8aj6lti2szv0ee38j7rj920c8o4xyuksndh1no3667rdu6vy4aj0jdz33rms2kfuz9nf5fu7t7zryuzb8w75y9lcjkc2vk8764nzn3z6z5tfzevczwr7jzfmyzadhtupur',
                slug: 'q57frmjww0i1cb85kmmsz4kzjmth6h2o7bw7c68gin5431fmsikghzpziogppnfcm8a50nrezyc7x0xpqpxusrb4eh9byp787l6boglrx7y2h8b3kzd2h8ywi4kdgipcgt409h0iz2k1tkk5sz1smri4raohe3rgrg31ueaz6tyy86h40w9fnadkp81r80ngt8wcw8l22uryc1ykwd3rhioc14ryztmqva5sfvlnapksfqvxzh1myq6ufu4qc9i',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                
                code: '16hvo9cp',
                customCode: 'n6tmca9vcc',
                name: 'z1kawjpqbod0db5gsj14js0832thdgyy03k9igwjp1fxh51g5zqb4wg1vs5ebwlfzng2oj30oqsf3mnq12cj6qemdnc4kapphl6gjakn0etkvq9jlyrf3xr0wag65b6z08m390f4cs0mt8ajz2v70hqgs20ltb3de56f6wy3hgmiepo8yobi3ww2a8p702vrpu5k0cnchphhyqgrwsz55t3m12km79lnw1uwm81qhyycauypn4veklm6m0sqpde',
                slug: 'ghv4n4ts2ag644f3ccmfc5kbaoxpuw222e9g3mzn4zgxo0ozuzimup05crbe58vi00utmg12l5z8we0r19jrcfpiyls6phk7zm6z0nvvekqqd3nuvtcyhpfvv8ksohavfcznwoppeujynme9ldfgwczr5ftgmlzobfktoj28hqxeqpujh77lgdxq34q300gvz20trs06bsh1xhqi1op7eostv2od57tbvxsugw859kth3djrhp9xmf1fz6spyhb',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: null,
                customCode: 'u5uedtp6ww',
                name: 'ery57hfl1b2sjgy6z84crla3ppeho33wvletfk14chxvpwx6htw1mo0qghdma92g2dac76m30qannny4ba2od3kxf2sj6q2kdumzymknu6v8yhkwzbd3809cs3fttezm8fpqg8nj9rr67lmlqf7xvnhn4mu1bev5onu1e45qp1y9iinbg9g2wig203qjiq1n3drv55bu2ik4eoi4ox5rfmqv0au98y1ozflapluig2v9n5jz0vpbjw1pgywhnt7',
                slug: '1w6ac11dqkfui9oeg6944ossexj2i54k5bxi7qm7xxjcjppevihukqvjuqhi4k828nsia2237e6tcnxs0ed1pu54i6u7y43ehalhfq2p30dmtci7xk2lnu1b361qrfl9nt3rnasfdwckm1nni7aodn49yz5eel7s2xrnff3j4wqykw7zcbhlv7obsx521zcycbsitxy9z18wda13y99lujoshs9b0ozrtq5s6eucy2kp7rthj40d1a8l0fxeeik',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                
                customCode: 'ssrnl8gfc8',
                name: 'kl0coaqglki5p5cm3etqzitu5dqx03b4ob59j4fpk0vvcqqb6l0uehn3hsdbu742sos4h2a2yv2dh3cjz8tffwonzi3silzf285tspnht4litx51jsz5h24efftlozio6esasi8ge6ydwqcj85fpwmwww2luwgx4dv4jrbrjjpah32jf93y264zlf6dpysd02w1j61yl6w2x7ran9d47us65i8afn0s222qo3qobfktaezl3znfl8j5dezrvhpw',
                slug: 'cgy0a8odeqz6ii0mh7rhaaf7qg3hjrts3m8u70r3uk6sr39aezqbi4x0p5emkq2f4rtuxgxykdmxfz4f2c8332vz6yh3kco1xej3q4rrm81znj1w88f6ri9uqje1tmr1meyi081imqwifg8uk76ap7rcvdlpvg9cdq2m0vtjpahtqin7hxc7ej6li7d5zoh63fkiy0auw2frhl4vg94odc76e3zd4khgkmhjjeqgx6b8g0al6cjg4rwixekqcnl',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: '1bm59vny',
                customCode: '2qq1h7qr7d',
                name: null,
                slug: 'yn4rfh5dggi56j28fkqw7jvzfxtc5legs7fa08395f5bepvot0o5opdq2p1ar63e6bwkzg4ucjf2t1v05kswiinmgxwhv7xtv36x1hi99crq6onr4i9po37rtgdjowjx2ktdzky7seucpg0vmi84itbn5euoqinka3dzv68zdocug3z2tgxc0a49jiiwwquwt4opb772jqrxsibk83tmy55rt3k7xrfzg174s66ml8ig1w4a1wafughslf1aqac',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: '9g8vytmo',
                customCode: 'cyn2s4a0m3',
                
                slug: 'r31z97w9zsc8up7wd7ncc2ao115a0agocigrnfazvfr32sxpfwfh5rgor81yzx0pflol53eyvdc7ck3g3i4oed91r203cl8sg4yjahuf3h75aeioqa709lb59abguho4zfggyrgsz8vlulbkgeqab8xkwlrqb0zcxf7nbxippdcmc56cq1aseebtrcwbtkgcn3fbsqi06smuil9e7dls5ccr5t185vd2oaz0f1zajt0fdk2ebatg5fr244ttab5',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: 'mfqbxz97',
                customCode: '5xlx0gyn1p',
                name: 'iwinsngjr58zhlafbmnrqbc5pii0ejuegwf31afwi6jz6cjj9q2gocaqxrw84ttq541y2g6s1216cb8xnh183n93ff5e1o2rfbrgycb605vcbzq7ggcprgvrurnc35e7n34jsgctulp2x1x6n2725n2myncabv4u0xjlibzmt5o5uucjfy7ep5s5hsuxr9if75vx0sezeeyhhinqtqlm4kgp7jkndcglrpevg51lqp6eywnl1k8q76eyl7gov6o',
                slug: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: 'bp69q3be',
                customCode: 'gg371bln3u',
                name: 'zl48qwgybk7dx0vjmlulb6v0cgr86cwy7zrdju384c669hxpmt0vzxycdfs8ygz6arzsj7xq7igsjxityrxkf2gygr6dz9hczssx2f9xjqoddbuudg9v1oqbvtv7li16k9m4kodpzso5qaixbsv3ejk7rddmj98l8kb0j57hcv17853lfv7h7z45tvz5xxn5yy9hvqu6n1niykst2sl2w5kn3rccceyz9bhdrrk5sxxpo6fxgyjknbafdviy419',
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Id is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: 'n9x72em0xgrd9zlp5zr67kcdj8dgixx0mhlax',
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: '5jupeuw2',
                customCode: 'bqdpsing1x',
                name: 'yja1b08gzmwt4f4lbcalgei87de695256j7r3aku9cgw6wfsnkspelwrapzv4xeevwj1ikkdgrs7i6l0u3uxr92nxwg8jx1qyczv11hmixq6wur3hviqolj6re1hi4m8hahokvm7g6rx7fty459earl7t4sv7fs2xajdspqld41x2cplo7ukland783sy6nvxgbr6o79v46jj9zv8u9src8ziq5baltlywbqdv59j76dazlccvjxwhvg7sgu80i',
                slug: 'ak3hq643q9r015k4sxngz7gm7b2lgu2pk73h9sradiio1kq2p8rowe9zgra510go2uipj35prju7id3ik1uk8mjhiujftxxl6gzbem9i9jpevopd2dqd1m4x7uavmzaaiyd51eobvr8lz72p8d0cl7ywzkncv3mur70jaqg1q7v02rh6zhq827u3kx8ovlb87c9znxsed0ajbzo1iw0s7mp1dk9p9g3trqytuzfyq17p9abbgu93ybx47pfxtkr',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Id is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CountryCommonId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: 'ggh7weetg106a6e1cweic02yn76v9jsewfcp7',
                code: 'cvspe7yn',
                customCode: 'x2ku1eiujj',
                name: 'hnn964y7cl9vdktync22g8qgi0z62bdemwhdun2kcomkv35c0y73jn2k8six0km1evknssu0v67cpekyuzj7bjo0yrg1rtvvkjsabrellt6r4ostxk3ul5qa4vwphm0say0epoizvw7se0oy9m3yyupsdy74xz2z0jxaz4ywz7k5s5ec9na5aljmsm7co5kym08c10poiix3q2w4nsezg9n805vra0cd40bjvlkdoszo67s4qxbppk2bidhu2h0',
                slug: 'wbrkk1cga9yrcbta86a59n2qp5x98qfn7gjpb7ap9yn3x7t8ncfh0w1exq410a2ylu6i97l10ftuiz3j6mfjpvxhp3lm6kaoa87cvaee9pa48568srxuurcb4gutro9ga5j9mbsdcx1ybz6mhb01ke2efc2zt8xk54zl8lfjho8rfh2n2g057a2kh42tlhl6svoiapu7zwj0hfh72ubcizcum88bm41jjvyf4xj9bsg9gxdll7ftzem5anljjt2',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CountryCommonId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Code is too large, has a maximum length of 8`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: 'ds5jp326f',
                customCode: 'cu26966d2g',
                name: '9i1arwmzywz0ehv02get6bgbxfcjzsabdosktxpavcn9jsito2nugzwgrxgurcx7t3brrku8ionkof3hmgyyuz52ndwlui0gt633e9zsivshx6fr8xe3oxnqx6usbe6hbbax1x4hghhdp997xs62vjmg8f1lz03ih6mtj1tvxfx60p7kzuqmj73o46obxk8cxob42mgyo73gy8v2it8watrf4o2lbtb8ez2vt6w90yxecsyahzhfoxxwqawrhr5',
                slug: '5829y66xso9rdpsn85u5als60i4xl8ddzzripzr0y1v52u7o0avf8jkrqpgjwu1tn7jixgk4pkfxd9djip20aux4xxdkwen8t1v5spkezftxwyfjkfomebz783mbvz9hsk9cipb31aj533hc2din3lwl3vhuy26d7alhfo6avpqvbzpr5gjtnoepnyhzsx8z2w8q7xn18jivid863ben5un788jtvwoz5wfp8hq1kzdz370su394s2wnfzs7ofh',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Code is too large, has a maximum length of 8');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: 'miv7uw6x',
                customCode: 'ibn8hdpgssn',
                name: 'm23uxa4v7rf4pnvlglxd6bru0zxt59k50dskseqdlsakv30a1k8gufpausqmx6xa5w1jimbp5brtu7xfffunyluc2si2af0vnab2eud8ckkjxmp6ic1egivyusv8kpxz4lmmqjwszzl36tm0kohcwcj98010av7675eufi3a2js0x4n6tosin0n7ls5rp04gucumy8fbu7057c6mnfv8q64ncjl5523q3sgxegesza2t08qolw2coabflkxcgz2',
                slug: '5bv10phcqg7a9ct9sabmdd18b9ieojsvrwttursmvxzlqtv0owddavb9asw7ln0cihskyjwv6b2b3nsj2f2yhzgba2edsomfioutzbc74u4ctd44bkv3gwa810t6snvaei3j1gq854rfd13hr2x5w2ohmes8u0e72h3wa9pw9j05ewd0706w0cmy7hhxyamfovjy8qgwooyt0ov404cktks57aahjkgza1r91emn2ja1o4mj80tcn52d1grkh38',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1CustomCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Name is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: 'm2wqlcjc',
                customCode: '3dcot4z90h',
                name: 'gcgqovuqpyjh3sslsf9vs151hwmyftxuto5lvybes435bm59ad2ql42ppf0gxlep6x63u1vzq2dq9lkvvepblqk5r6gwwy17tpc12z4p6hysuswm6zeh0v630wcbeampuvp1ry0fo9is8jhwhks91uvfg5ahwknylml3pz5h49ooff8vt9e63zgekbfk51u94fr3ejhoand1it22bo6n0yqo78pkk1gp46d7tjtka9n1vx09qoyvtf9qsfwlj7c4',
                slug: 'evfespzswutb39hhdugb18vpze08orbe5bbycfm8s892gptzgmnobuthntacnpmrfc2wy8hdxeum46fd5gtdbp7rdh46ibwsqbhcgfcc1bva8n5do2jpvs08fo4ojmkkckdifr7sd6bd1wc561ed5deagg8k2345ujoe3dgbxdwgsybfyu5nyg80btwe6hivm5ytebkdazwj4fyavkzyfvy53ggur3vrfjzw67kdlunj4mjid2lpcs1s9okil98',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Name is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/administrative-area-level-1 - Got 400 Conflict, AdministrativeAreaLevel1Slug is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: '7m3abro8',
                customCode: 'p70s0s6uye',
                name: 'mzuin9h593px0i26qyyl0za36anwm6dvbmqq2gukrdnnentjk33gzi64zlowr15ruffmcj4tli9t4nyzcmdmnlr0kncfmmh71xucib5ha3y2ib9hfrbzf34tmvnt1jw1ldmdtfxq48sh5i978n9t7vtzwx2t9395464pnnvlz13kj8baboq9g1jpt942c3kqtayab55geejg4uwts11780w0du2hssnfek687u40kcs357gv35329pivrcjrsnp',
                slug: 'ptblhjgvnk5q67gatf8vvhii4t7q0ny53z5b9sf7xzrsi3jr7r9zyhq65gtxv08lxw7m0f1ljn3pmhf2bznrpzsngute72eclb42tl66ickgdo0oexe9nxvhv3lyjk8uysahd8gc89da01vdjhwf3bug3l46x56ctrgs85gt60z2yfkself9p3lc9l0d3x9geoeoiw1t5qjksjt9debbzf91q4fy3vmm52zcic3cofe2pvaibysnttwh0t9zw1ud',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AdministrativeAreaLevel1Slug is too large, has a maximum length of 255');
            });
    });
    

    

    

    

    

    

    

    test(`/REST:POST admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: 'xgm0berv',
                customCode: 'hfarwnk5tt',
                name: '61tpe2a6xi8dok3sn34b542t7ydedljpf2dxhasj6n9tnhp5sh3fg6znjerej31fhc8vikd7oyzjx0rd8q07vrgakbmdy2ei6o2mobf2a1ofifig3nyfbc0d3z5u43hgwf4mce67b7eexu66jz0ujtegv0u3m3xk0buq2mqmk18kkvbg2k978qi8mctpn9awfzw1hddhqfch4td2zezelhfgdtqa6t9j4m3qxp3nuuyh31difkddfb3yznjdwze',
                slug: '14ajjwv8qpr9l9gx5vu69q6n7wx8dcixtcmlfdp4exlvk1js77076yngl92yqz7d57u1ilrpg7rwum9ujajvqxk8hsertamrphtyxvi0k6wyhz59flz1h29rr5348bwlopgetaybqs837ul4f927nqt5lg6wxnhtzp7y32bv7nj78mdt0xk4gs917oikfwyl2jtn390ks8vi9utkwa3owhc9o6isy5hteaxgewb53iqnu3ebdu60npf7xjcdamx',
            })
            .expect(201);
    });

    test(`/REST:GET admin/administrative-areas-level-1/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1/paginate')
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

    test(`/REST:GET admin/administrative-area-level-1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'eff16b99-b86e-4439-8087-f35a4fff593d'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '209d41b3-3d03-47b4-80d0-9e26a8f6a585'));
    });

    test(`/REST:GET admin/administrative-area-level-1/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/6d5b36ce-c190-4232-9924-ac6b1849d793')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/administrative-area-level-1/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-area-level-1/209d41b3-3d03-47b4-80d0-9e26a8f6a585')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '209d41b3-3d03-47b4-80d0-9e26a8f6a585'));
    });

    test(`/REST:GET admin/administrative-areas-level-1`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/administrative-areas-level-1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/administrative-area-level-1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                id: '688c457a-4cfc-41dd-9852-806cf6fd3c8a',
                countryCommonId: '9ccfcbc9-287b-419b-9f1b-880e10973eea',
                code: '7tjaa7zt',
                customCode: '45ng5b6zqj',
                name: '5jq80fxjgkfgq9fsf7amlnlj2ynycripszdhtyyoga8get42414yufyoq1e82ba42uxl6xzxdmch5x3tavztmewtvjjjr905vftjrghp25boc1cthk78v0j07o3w37qa3uelpy7bcn00xckftsig2wym3jrvyaeecy5bnidio6xb0kignt1z3qsmbm9c0uemn6ixzw7etv4zwe6rfv0xen1r6m8407bcl88univsraa8ymhi7dxzlyswzdap3mo',
                slug: 'wxpkgnc2putvq3s2x7u9e244x1avw0q0le0brx38qhjgzpt20a6n5bzmoic1e6kkywdjbm2muvnht629eg5b8ojkey7guta4azb67nos9bywcpdzutw0nxg7n3rsznkz6uhm07das4716uef5ksu5l8hv353xadsffql3xrd0hc7bnj8062ftw1gw14arnlmvgt6x51obprs7sf9s71qs93wra4gbggpls2nzmx9aq8bj86mkntc7ocx1res5ua',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/administrative-area-level-1`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/administrative-area-level-1')
            .set('Accept', 'application/json')
            .send({
                
                id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                code: 'uwimno2h',
                customCode: '3jn8huv7lo',
                name: 'pge13mkbz3030eo38d1g7xi405egkwdfnq7fxxo49l0ok4s93grnhvi4kmakmxprsxrz3jwx4sq7sgk0wyyzyf68r6vdeav9tt3153cmvp5lobk2b679ik4vsf9gvi06jrajw1u78eybd5ss0it1wpbszp36t02ednchv9kocti5t6k7a15pyf46vzbxv9px77fjywui3qj6r2jywafeids6gnwa3stelbgjjunbe8vl3xuuvfodbssoqadi92q',
                slug: 'rlqkh8ze8dl9dhpa4txyq40yih8eu6o3r11trwz16qmghkf3axe15aq7p4gmx0yv54j8p2e4cye7u1zk5h3vdnj901oas2exmqriflndcn5h8zj8k1i98ovg9rpy2dkwco5ibt8cs8m2heol35mr1hn0567pudm5p3riuxt9qvfuqvmp1k0nwglnr8prmyrin9g0lmvwu4usev17d6wylncbsc8sqoioj10d0u68m3e8mqyfshdotuykrmh7oso',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '209d41b3-3d03-47b4-80d0-9e26a8f6a585'));
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/54cd1d63-c3fe-44f9-8497-74a2a5b1ad44')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/administrative-area-level-1/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/administrative-area-level-1/209d41b3-3d03-47b4-80d0-9e26a8f6a585')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAdministrativeAreaLevel1 - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel1Input!)
                    {
                        adminCreateAdministrativeAreaLevel1 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
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

    test(`/GraphQL adminCreateAdministrativeAreaLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAdministrativeAreaLevel1Input!)
                    {
                        adminCreateAdministrativeAreaLevel1 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'd8034039-c19d-4310-96e6-6094ba49bd2a',
                        countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                        code: 'mijo0mdq',
                        customCode: 'pz16hz5fqi',
                        name: 'g52bv0ua63nzxss51uqquxzr7su05u6p29fk3pwlliwf33l4kh7gq5xlxzwoapglddqhbcm7rpnx1i8hoyiyg46c018yg6hbrv5ilrhyvj14ngl0zqtoilfedcols8jbr3t82icd8n2ep8hkibzi1kdgvai4xmck4x2f8vogb0ajazcfnnyye5u2hf7rc27gujul1kzxnsofau8pr5c4w7ky0rktpyyahd6cfonac6wvp35x7pn2tom0zo3szn3',
                        slug: '8d384di9wtk1dlyi7y7fj6i0u8ppijsi91gvqi24g8wcjd4uq7n316okl1mv4fbqoq3zycxxxd208fzjrda8rk4t15s7eipq5udvu0dc3sun90bwrr7p47zsh8srn3o1yyelc5lygsj5e94uuuwb8is3swl1xrntqac84ckw1mevsgshu7tas53d13j0dmkfc1dwei7tonfqbpom7qdcxo6bduqebs50apckdlm1fr9wbj1afb4bkcgrx97vqoj',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAdministrativeAreaLevel1).toHaveProperty('id', 'd8034039-c19d-4310-96e6-6094ba49bd2a');
            });
    });

    test(`/GraphQL adminPaginateAdministrativeAreasLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAdministrativeAreasLevel1 (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAdministrativeAreasLevel1.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel1 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
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
                            id: 'eb4bc08d-1d44-4fc3-9fce-95cba7aba975'
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

    test(`/GraphQL adminFindAdministrativeAreaLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAdministrativeAreaLevel1 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
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
                            id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1.id).toStrictEqual('209d41b3-3d03-47b4-80d0-9e26a8f6a585');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel1ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '500d0216-4923-47e3-9d22-0aadedaffd6f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAdministrativeAreaLevel1ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAdministrativeAreaLevel1ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAdministrativeAreaLevel1ById.id).toStrictEqual('209d41b3-3d03-47b4-80d0-9e26a8f6a585');
            });
    });

    test(`/GraphQL adminGetAdministrativeAreasLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAdministrativeAreasLevel1 (query:$query)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAdministrativeAreasLevel1.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAdministrativeAreaLevel1 - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel1Input!)
                    {
                        adminUpdateAdministrativeAreaLevel1 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '3a18a438-2507-4a4a-bdf3-173dc900192a',
                        countryCommonId: '6888e4f2-b9c9-4f78-b521-a4fbabba85fc',
                        code: 'x7l82kky',
                        customCode: 'ubvvne129g',
                        name: '51ht17bpip7rhlgas7th2hb8o36gefz8aukhkaeyjruekyl4ofcqu02kmpg51u3j3d6hx9pzyrx6w8mcjj5wsdf9ew5w4kmw1jr4msx9t2hs64ad4931zskrzwbkxzvo2b7s3s6dparirbqyi5gjddn9px21kwbr5xwx9h28g6kfflnvrw93gjx7mw6b5s4hnenwih6ngm2ddqmfryb2d823v0apxwj2zvhltn1mtncmpwwiq753r1u3moqplvf',
                        slug: 'fs460tdi0whx4nll0ohvnbb1ed6ktjzcf3rqwa6f8ze99s1wi3a7x3ayczjw3xonhvzcviijhg2tdg0nuz42q04k6fw4c2e7flp2indg62k0wb0yp5kknzdibliklq0t5k97zaq6gfgvqasitbgplayf259hwxhnwmapja8ae19zddcirak696dr6ezw9izr31c0dz5plzs6tndjvxq4uvxctiawj6quu15xiw7nkdqyk0athaxfglxhx9t3n0u',
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

    test(`/GraphQL adminUpdateAdministrativeAreaLevel1`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAdministrativeAreaLevel1Input!)
                    {
                        adminUpdateAdministrativeAreaLevel1 (payload:$payload)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585',
                        countryCommonId: '184ce2e2-7cfd-4924-a192-71855f45ba03',
                        code: 'q33vndxn',
                        customCode: 'qs3g0e2hr6',
                        name: 'vb7qktpp2j4nre6trf644quqx2ipjd5i1aieuq0vcw6k44vr4xvylvxcbo0q7knw7z8ckn6jpbp1wctrdqyy7i534jkf6lt9xxs1g7mq1i50q9b42wxf52kn263ie428mx6ei02dp7m7zf9uzge61aem9hashwhe35vqacj06yvh4o917o2cm8bcelqdb7ui09za18g2b2p9aybyjiz98wo2css1qk4gqwal32ay6bksqooq4tfbpcym9xim109',
                        slug: 'z17uspheio8fdhifwsnpyvqauxxelvt95edayd7h6vg46bityq3ljquot1zadr1lirsmifqd4so9wjukvdaoybthpqerd0fa01xzinstwpga0b9sn78achubuogd71p5t763i1mh5yotm7w6jotlspwevjwk7molvrc8ai0ob0styxxdt2jzfpbbw8avfv5b1odllzxr26ol7aikodx4eu3qghd5uy7cv0smlnqrzdlkh4zjnnvdhhe67gx78p2',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAdministrativeAreaLevel1.id).toStrictEqual('209d41b3-3d03-47b4-80d0-9e26a8f6a585');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel1ById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel1ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ec5b7a19-5020-4474-864d-7ee4c1eaf8a5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAdministrativeAreaLevel1ById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAdministrativeAreaLevel1ById (id:$id)
                        {   
                            id
                            code
                            customCode
                            name
                            slug
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '209d41b3-3d03-47b4-80d0-9e26a8f6a585'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAdministrativeAreaLevel1ById.id).toStrictEqual('209d41b3-3d03-47b4-80d0-9e26a8f6a585');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});