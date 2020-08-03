import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { ITagRepository } from '@hades/nfc/tag/domain/tag.repository';
import { MockTagRepository } from '@hades/nfc/tag/infrastructure/mock/mock-tag.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { NfcModule } from './../../../src/apps/nfc/nfc.module';
import { Command, Operator } from '@hades/shared/domain/persistence/sql-statement-input';
import * as request from 'supertest';
import * as _ from 'lodash';
import { AdminModule } from './../../../src/apps/admin/admin.module';

const importForeignModules = [
    AdminModule
];

describe('tag', () => 
{
    let app: INestApplication;
    let repository: MockTagRepository;
    
    beforeAll(async () => 
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    NfcModule,
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
            .overrideProvider(ITagRepository)
            .useClass(MockTagRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockTagRepository>module.get<ITagRepository>(ITagRepository);

        await app.init();
    });

    test(`/REST:POST nfc/tag - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: null,
                code: 6463189624,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: 'iyf9qncyh543vn1epcozjnyzk5u0et3uxvx7gf8mmvbar7wcy3',
                urlBase: '4180xvzdu10fhcqnsvtg14zpql6xxzja5f8pqerop8566awkhbem4aztne2ddpmj2vur3t0f65b827q2knc1akh3r4bsd7s6qq6hknzqjq449qh6hhaktwkx0bh784zx69d73w79kbfmadrwrvur8nrwjmbleu5gkea52ykkc54f2cr2lo62ndjtkrusyjsumoqh3ikufng1x9oj0lvily8udb8pwpbzwvzmprqefr6o15gziolkn5bn2735l8i',
                params: { "foo" : "bar" },
                offset: 356385,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagId must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/tag - Got 400 Conflict, TagId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                
                code: 4425494943,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: 'fluofmosfnxkz09ebykrfw9wbgy37i9snakeybzek9y12ur58a',
                urlBase: 'uw98kp8kj86b4ohgu0srb5azpq46k4q9tnlfzkzw1ckwretx31pqgdnib03h5trxg46zaoaht3bbagt9iwo6kr29sguwfvyjzcakvycy9wvmqk188t5p6unrcs6ng10knh4ls0lhwd68yg1znttsls35ori2l99e78wh04lnosbl03cuhpzapyyye5tesq38sqlyew24hdld0pd0nkkic25r2t2kkmq0cgyfk60yrdt5c5qq0usdpe3rlby5k0p',
                params: { "foo" : "bar" },
                offset: 589854,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: null,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: '6q9q5sl897wbzg9e9bau63lolxluoziqvru8q15g5yvi533pvj',
                urlBase: 'j8ynz47ecfyv4lwmugzqx0v3lkskbzs6o20q2tt39slseg5u41d4w2kxa1c3u8ypi6flcuttkbswrgc0tl0ahvtp16u6lhml2r4im98rnunmr7gh12jh0lclpwwnl9bf8fxhtmr7yt7d4wss38wnve4bp8gf4hdwri5p8hhq4hllyi3sznzsjysg5jfbf6xyohifv36wpuxnhwhwpoq7minvdt10jvfn630o5aiv8vfbiiatj62n29hryz4fvrk',
                params: { "foo" : "bar" },
                offset: 954307,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagCode must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/tag - Got 400 Conflict, TagCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: '48lxhmzikrlgy59pim5ptl39jk07v6ige8rzp64huhil4wac13',
                urlBase: 'ho3tmsctb43p8flwi9imstngf8d3uo6054ry5kdvmcdvt4c2yuilk9mpp6lkwde1ntg62zlczxxtew85koewu7t1xigg27elamux5ypajs1spai056kpdrm5phknytma3bm3fyyawjj6wqow2oyvlnqmx1hav1tjakh79fzhws80uislmcxqk666jjb1m0dl8n1zsct4hn3ekx2swh2zxpytjzumpgwqldt3gglfxqu3ejt3ap3797169qzypso',
                params: { "foo" : "bar" },
                offset: 779956,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 2694593916,
                tenantId: null,
                tenantCode: 'vsan17kmy966d9wjr58evnksx8nsg95si4q2le3ldg9dgvlxxe',
                urlBase: 'c1jcdf8772najugyp7o7yvoassz8049mma4w69lnmadvfy17jq3gfvqbipdam1u9auzjxc2wh5rgjrg7xmf1bo9pj5tldrli5jqkkvod0xvwubrytp6enuma0h30wfi88ibn7uixf049fhvxxk1jjjogx3bb8r7ni2kqikz16wj5nutauz0lp8y8t5iid5zfhurt8us0n4j7mjnt8f8x5dr6scoy3ws7hga4s7g6dje3fczo4wtfzxi5kgwsadf',
                params: { "foo" : "bar" },
                offset: 413109,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantId must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 3133778096,
                
                tenantCode: 'ioi53pmr7r3dyfzsomzuqugoef6jiog1ifbc4pmj24jzhsubcv',
                urlBase: 'u651d2zt7esq2k327t66h9l32ercje7b7os8gugxcowv4zcjl51gfxpye8z08vy3oapnuag66w8iegct2t5s7mag3xbxvljwdcnqppc3d30xmy1om94dldnvlgmykjrobma4m7kfa1zvgdeigw6y61ns8twlray4c4m3ku6as9yzoqfakjnq76lmwoux25kmarvok55sl03ht23wgb9w1sevmm6z89po2azr13iemxf8dbpg8xacxusm7kwuiux',
                params: { "foo" : "bar" },
                offset: 402440,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantCode property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 6815841115,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: null,
                urlBase: 'aum7c1d2wm68x2d4zs2h9o9u489mayihnpk95i4mxeef94c1drbdecij9mw37rvro17u1omgexb849emi7794lvepyf5j8lhcza0g717lwn5z25u5siwixwfgku66a5jpnoglb5l5p43gq412278sh2x0g27p7p3e0zjon45wmbkdso1y71nbeeu7mcdt0uqhrhaux9gkz3xrlv8mvvj4dsy0a851f07t2xu6ghvpn4iqudeykorolurpy6ritr',
                params: { "foo" : "bar" },
                offset: 489165,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantCode must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantCode property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 9822623578,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                
                urlBase: 'htwewausxdwonppogd39s1iti1mt44a5hna5kfyfgrhlth63yrt9ce217rh56onpzhrk5o6uwm2oup7xxf4izm0f81xrnaejcv7zjqlpqwc5126l9vuggdjm9sjmb7aw76jbg1055298jt4j7wzrt71tj3em7lb1od0i1jz5ygnnay909ul53azi2yb0541d53kfvrm1jd184qx3112mqqzinw8k5vvjkizdst3omh3apj8ts9or5s4uvmpdkti',
                params: { "foo" : "bar" },
                offset: 708675,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantCode must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagUrlBase property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 4458799944,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: 'jo520ghcc8xsyjevwmjhc2fiugtha4dl3k3vp68l1nlonbtoc3',
                urlBase: null,
                params: { "foo" : "bar" },
                offset: 195566,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagUrlBase must be defined, can not be null');
            });
    });

    test(`/REST:POST nfc/tag - Got 400 Conflict, TagUrlBase property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 1368780618,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: 'ihpqrxmw5xvsryi6q6m6f3aynkvogiy8h8me53ni95jpe5wbky',
                
                params: { "foo" : "bar" },
                offset: 631934,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagUrlBase must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 's4ys3wgn9erep6euh78787d6grqbhq8ip7lo3',
                code: 6339690253,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: '6jaoyaqwct0z4lzju4j3hacfk7r2zwwp3l63zusjwv4tzj4na4',
                urlBase: 's8nb75quf0i20z8jii1l9dgqlpa22x84utugzajd7lff9imeuw6g932nawlj46iykpe6uv75irdj0dbtcf489o96jkxthmtuhaye5s98h3xg7tgdxzsunwhpvjtb60fvvhgkswa4dn011qgrvxiqh0xtwpc5bfrp3z5dzmo6nmg3tl1hnofmhz5jhtxbmyexjcl091s7fxuhdwbdtmadior46xvc4wujrtfg7hnn0h1yotbevav7gouqph8zotd',
                params: { "foo" : "bar" },
                offset: 262078,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagId is not allowed, must be a length of 36');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 7243209516,
                tenantId: 'kk90du95h5tbwhgc626v0rtbnxrcqc98wushc',
                tenantCode: 'guqwv6qcu06dp3bs3mkgrp0oh7o7cdj9pw0ejyhtdpjr52e4ui',
                urlBase: 'lvd6ln2da9jl1ksrmk43smy4343glwjhbz3eddeduy73hvfu4dceitbd2bltrj8bhtwrq9z5z3di60exbrboduiw6mplf77cdnsl096um0jwqoxrioliagtxoizcev04py2ycuhgh4pv47b6d11kmgdlk171wyvaalyknz7ncxnsurgvygz38wb57ra2z2om0ythvkoz9jom6j5ymsuoohgx0bx5j9h9uspm1fv0b09w6x5gvs011b4l8w71zac',
                params: { "foo" : "bar" },
                offset: 909486,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagCode is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 60921553369,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: 'usg62nurs90uy4myir1zupvkd3jsxq9favt6tl2v5674ja0r29',
                urlBase: '45q3y1795ln6smtct69huacq31n73ogduq8igl0tx05ss29xcyjr2rzbne99zsjz4jcmuw522nslm71ad42is2ijdp4cclsiptc72xgwgrowwuqox5v95sohhnt6e04l4xfobnj7nbjzg6yxv21aj5ysh7hq3he3nv2j01sqypnh5osgbdui7gqy9zq3v7wkc32iyx7qiz7kc0j7gtimrv3bzzstieue792ci5hqw530d74vlfmx0n7exmlik9l',
                params: { "foo" : "bar" },
                offset: 846608,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagCode is too large, has a maximum length of 10');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagTenantCode is too large, has a maximum length of 50`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 8394697464,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: 'o8i4au8820obcyomsr9pj2fkoouwqzb131ok25tn2fcq327tlqt',
                urlBase: 'lua6gfu42ktjsbywfxv78jakxxf8buefmckla8meo7c4xwu6856bb41q9syf6oyrcmwbpd38n905mkf7ils90wnontozev00sz6bubojnk7x43jig34n4aou1q5dn4fjjkv6bqu8gjs4cx481a4nqrsdehbzpxj0f6h1mrlvbue11fhbclkc6d5mydgm65trwr0cluooah750qqz5oihm31mig7z0xdpyxfcnipqcmt279a27dborxc95jbilgj',
                params: { "foo" : "bar" },
                offset: 442107,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagTenantCode is too large, has a maximum length of 50');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagUrlBase is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 5413473875,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: 'fvivsouhnazoxatj6ogkj0d6ld06j8ok5zycoqf8rpxgia1ovw',
                urlBase: '5m29s1qicoacm9b0w65wtq2t1i1nds28pkfsfm3omm3qylbclt52i7alhqwv8o6czpqjbse9zyo5y1yntubenq8pegps0alwfyrzwcmoteks13qpgvmo6qbgr2ax758l08lkh1tzg25kkw6g1rpai47ihti0jxcckwu0v4iyln6nyechl8654n4p60892sjzqxoko4f2lmwfw5lmjagjrvt2lchf78pkol2522seq75xqs0rq0ofnx6m1tst6nap',
                params: { "foo" : "bar" },
                offset: 729602,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagUrlBase is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagOffset is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 7280019565,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: '99hc1ba0webpgdujtxnmlq5y1l99cs26avojlhta2r6uiokucm',
                urlBase: 'eulvzh6udr8tiy9i9nwtbimgnnvxr31m85s15i9rka0odyzet6cxyedsj7ro07exolia612urviq64p8ofxtv0hbk8zo3yqtogosjtm0j9a919rkoowk06edkkehlk5aki5m4tb0g3cfmphe9unv537z8vkxx8zu0t0pkf6jfrt5vc2ss1ozesgtg7h5daev0i43js1fzv4kbxefxk7xhac2f2xap77bqwlfymutjvhfk56zatvzq4agd0zwiif',
                params: { "foo" : "bar" },
                offset: 4488167,
                isSessionRequired: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagOffset is too large, has a maximum length of 6');
            });
    });
    

    

    
    
    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagCode must have a positive sign`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: -9,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: 'hfmwqqiu17moxkbj2ptf270p2ozl1xcb73z8qdpbc6oxy3kubo',
                urlBase: '8gtxec6c3lic6vj4h9p9m1y8zr11d94bea6whie3edw2pnxodp2b5d9mmgdqg94rq1h9vb0m87voqb01kircue7x48sk42noz0mhg67j783d0i6iyob9olpmuok6a4q07bxx0w94iv6x8cpv9wk3sirvwm1sexb2jc7td3uku4ccc4pnw5zxvinbptc3biors8v72t76j8hqglav3osrxp620qcybdsoyjacz60hv1leqhokldk4cexglbpb53n',
                params: { "foo" : "bar" },
                offset: 127300,
                isSessionRequired: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('The numerical value for TagCode must have a positive sign, this field does not accept negative values');
            });
    });
    

    
    test(`/REST:POST nfc/tag - Got 400 Conflict, TagIsSessionRequired has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 8120055453,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: 'vpb5b6nsvzbeks1x7wzivbhgtoegbhryj0b65xhrccpxaegesw',
                urlBase: 'cmnhgxxx6xt5w18yymiqgx0s4sa1w9ole0fg2v087246hffsbwbsaseow0l0r585sy6mnd6353b64hpg8x74cd71kp1he5rchujih622x8qgo7q0ldfcxmfmgf3r22kanqwhm0hm9xa3gn7cc66h3wpr19gmu02ypeg3xm650d1p5jan79c22tb2kwytyr14cpnf32rcc8bgopu6xgxrupo5narg3dr4r4qjqnepd3iqq7asvos4dxkfywbufho',
                params: { "foo" : "bar" },
                offset: 891175,
                isSessionRequired: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for TagIsSessionRequired has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST nfc/tag`, () => 
    {
        return request(app.getHttpServer())
            .post('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 6564599560,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: 'kogxnw4t8bga4e2slwzkf87ocrsigaqdien3fj6n8mvwea8cz2',
                urlBase: 'd8kuaocbilp22x9mgdrslvde2fs9g1l4kcwea448702xqu3yhjmv5exty7b9ph2mer5xv5gx6mscgu6bfo00z65q994h5hj59ni4qghfqy3kpg514zypadok0m6ijqqrrcz0iq7u0y8ttc6nra1nzsstu992gyufh7z15d0fup82jlmusnzf2y4tpjmjpfctvot38pvh1y9io81ngwggl5oqu8vmfxres4c3zfrp34hm761v5n17pbcnkjapsrg',
                params: { "foo" : "bar" },
                offset: 594204,
                isSessionRequired: true,
            })
            .expect(201);
    });

    test(`/REST:GET nfc/tags/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tags/paginate')
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

    test(`/REST:GET nfc/tag - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : '8c16f4a2-dda1-4b64-b8d4-acd8de00c6fa'
                    }
                ]
            })
            .expect(404);
    });

    test(`/REST:GET nfc/tag`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                query: [
                    {
                        command : Command.WHERE,
                        column  : 'id',
                        operator: Operator.EQUALS,
                        value   : 'd3dee798-f6cf-4df9-9217-fa39aecca96d'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'd3dee798-f6cf-4df9-9217-fa39aecca96d'));
    });

    test(`/REST:GET nfc/tag/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag/bcbb1d9e-5c27-4355-92b4-b51d2e82b1c9')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET nfc/tag/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag/d3dee798-f6cf-4df9-9217-fa39aecca96d')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd3dee798-f6cf-4df9-9217-fa39aecca96d'));
    });

    test(`/REST:GET nfc/tags`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tags')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT nfc/tag - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                
                id: '02a8a134-5029-4698-b576-60dcc1f06539',
                code: 7808748773,
                tenantId: '3bacbbc2-9e3b-4936-b8b3-8501f67fb8b2',
                tenantCode: 'j1zolwytipdm50ehzlsfp9scel27kv2gt3a3pya8ha34d6a3yj',
                urlBase: 'cnr770ibweq9m3cv508oxd42pwrwj7zc1cymles4w4b7t2dfc9f7icm287n7vdmk0f97zqybho4wuyitt21vg5doidjqccxv1i369llzud5mbvaqyll5q9xvgvzyv77z351l081oswy5owf7h606641rfzy5ddnuucy5sojtchfvdgkbgkaxcpv4suroi1lrlr57po4hg9zy8mj2bq9otd62mwbwgj8kp8gnt2qysaqziegc9ukxtz50stbrhok',
                params: { "foo" : "bar" },
                offset: 716111,
                isSessionRequired: false,
            })
            .expect(404);
    });

    test(`/REST:PUT nfc/tag`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                
                id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                code: 7310961934,
                tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                tenantCode: 'fxn53gvsrcr6yk1k8rq123w7xrh66t223ugvn7j74jlwdwcwrd',
                urlBase: 'fc4uljzm7v9hqoqioghf58a1bjl7v3mbbxnsryyg52jelqpbw4qnaqyej8khquej6cawm7yjpvl4r0q4j99zqkfo2zwbrtnhr9opm8lff7grrq04nfluqz5ci4y250yxvulkhit5fxhowziivmck9ejupwkdf47b9e8ulri9z20chyczuh58n73gns84n7pr90gqaibtccuy5ssr46p08p8u0kitttnklydcae5cu5v3ejh9gfdqcd4mqzhyato',
                params: { "foo" : "bar" },
                offset: 199536,
                isSessionRequired: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'd3dee798-f6cf-4df9-9217-fa39aecca96d'));
    });

    test(`/REST:DELETE nfc/tag/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/tag/d7638845-6574-4676-ac10-e1620330bcc2')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE nfc/tag/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/tag/d3dee798-f6cf-4df9-9217-fa39aecca96d')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL nfcCreateTag - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcCreateTagInput!)
                    {
                        nfcCreateTag (payload:$payload)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
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

    test(`/GraphQL nfcCreateTag`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcCreateTagInput!)
                    {
                        nfcCreateTag (payload:$payload)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '275c316a-336c-4e86-b41e-e1da87c3855f',
                        code: 2908044743,
                        tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                        tenantCode: 'ch2ogzv8thq7xf6b5g8dyz6zcawbf3mi6957o89lqgajuplo11',
                        urlBase: '0t00t4f8rx672u2ob9nfofcykplcckxbsd3ea8v81uldqeg1d3v2wy0dbgf1kz6tew4d847ixvr9uoqcqop2eyt1qe1g48zsaezpcds7titht3xoi1krftmfsvfd8cj879k0xijf41hk4gso81l81jjqn6lxlzhacyuoqoian1ry9jk8s4whni2x3pgveip4gpep2vabvfalrgky22b33zap6jfjm4s6d34a41af0nd5tjt8gjahsepvi66eosq',
                        params: { "foo" : "bar" },
                        offset: 453627,
                        isSessionRequired: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateTag).toHaveProperty('id', '275c316a-336c-4e86-b41e-e1da87c3855f');
            });
    });

    test(`/GraphQL nfcPaginateTags`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput] $constraint:[QueryStatementInput])
                    {
                        nfcPaginateTags (query:$query constraint:$constraint)
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
                expect(res.body.data.nfcPaginateTags.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.nfcPaginateTags.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.nfcPaginateTags.rows).toStrictEqual(repository.collectionResponse.slice(0, 10));
            });
    });

    test(`/GraphQL nfcFindTag - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcFindTag (query:$query)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
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
                            value   : '3820e4bf-5207-4211-9349-6157d1745857'
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

    test(`/GraphQL nfcFindTag`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcFindTag (query:$query)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
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
                            value   : 'd3dee798-f6cf-4df9-9217-fa39aecca96d'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindTag.id).toStrictEqual('d3dee798-f6cf-4df9-9217-fa39aecca96d');
            });
    });

    test(`/GraphQL nfcFindTagById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        nfcFindTagById (id:$id)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '89339ebf-607e-4291-ad02-5ff06a26818f'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL nfcFindTagById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        nfcFindTagById (id:$id)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindTagById.id).toStrictEqual('d3dee798-f6cf-4df9-9217-fa39aecca96d');
            });
    });

    test(`/GraphQL nfcGetTags`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:[QueryStatementInput])
                    {
                        nfcGetTags (query:$query)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: { }
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.nfcGetTags.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL nfcUpdateTag - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcUpdateTagInput!)
                    {
                        nfcUpdateTag (payload:$payload)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '8f70a7e9-173d-479f-a496-730320fb00fd',
                        code: 2442316574,
                        tenantId: '8c890972-37aa-41f6-96cc-fa4c0cdb8533',
                        tenantCode: 'ehimwn828ta7ozyrrh32nvdb39yy2bhxzfpab1f5o5bun5mj4n',
                        urlBase: 'h0mrma1qqh3yr9hnq2wck36em4suo66kc5ybsqqjah0g9k6a2qptn0okorxz3w7h7pi1y0a7txg58pywe316rxxwy9skwxuzgfn544xevj63445xngoxs8zmwifd7ibuuilogfz65cgz5kotcel8r241ryz2bp78hrsqd39eogpt99jjci938esci976x6c491h2vyi9611eprf1ttn4lzrf8qyeesp4fpwbzh9pwqftvxtdr6si3u6l570zuu8',
                        params: { "foo" : "bar" },
                        offset: 344466,
                        isSessionRequired: true,
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

    test(`/GraphQL nfcUpdateTag`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:NfcUpdateTagInput!)
                    {
                        nfcUpdateTag (payload:$payload)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d',
                        code: 5070185792,
                        tenantId: 'ed76b37c-6380-4331-8d33-a8bde35e16fa',
                        tenantCode: 'zshpr0aiqsrsdiikd6h9xbgc6ts1psczmnp98mu76froz6d754',
                        urlBase: 'rlblryw9te48cxypl93n7lzx0vawkacw2saz8zfu0k70ayg10h3vu32vtjruw6gz6lj5xfc9snjif9rwiopo5eutkfnalgmvezhwc7ut3mmx1laf6qufigdim3jvxbh65u4firl2fr5m2mr8woz2jijlzbla3awuctq9tut3genu9r9vp4gpt1m4c0ucj7q8125sh0fo8g51fv30rxr09yt3lp8884toe5tyzlwpy2veriuio0m3snj5xbyk0lh',
                        params: { "foo" : "bar" },
                        offset: 171897,
                        isSessionRequired: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateTag.id).toStrictEqual('d3dee798-f6cf-4df9-9217-fa39aecca96d');
            });
    });

    test(`/GraphQL nfcDeleteTagById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        nfcDeleteTagById (id:$id)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '7ee39af0-b995-4ff7-b2ae-1b38ee97fb16'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL nfcDeleteTagById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        nfcDeleteTagById (id:$id)
                        {   
                            id
                            code
                            tenantId
                            tenantCode
                            urlBase
                            params
                            offset
                            isSessionRequired
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'd3dee798-f6cf-4df9-9217-fa39aecca96d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteTagById.id).toStrictEqual('d3dee798-f6cf-4df9-9217-fa39aecca96d');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});