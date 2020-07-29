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
                code: 7655555786,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: 'n4dkres4b7l82w9bvs8ybxquibm9zgwaedj3or99tr9spkw08o',
                urlBase: 'raqnps1cwrx8hjaa1ki3aiyij9lkls0olysjx3cm9ghekcsk64v3f6rv8fajsc57ewfh2rv1af706eqzo71385m6kybbd6qaambfrekregp6ss187ejmdctd99r2p1e7dqvhk8dbrkjglam4hlq5oufmrpzs1r9nge9875ssuyl906x6bi0xx3vggfapwisjgo2vymtq1drreh9va1b0jdrjptmm8670j09o9bv5o1iyfj30igh9p88qkha2usu',
                params: { "foo" : "bar" },
                offset: 374521,
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
                
                code: 9569276932,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: 'pkrlo883jvtawvou630hi2knzpbfwtlgd5m2r9tqh3ryvok2w4',
                urlBase: 'o0u5y0m7x53yokm35jlv0syb2fe9t72ytcupy9t5vnmmwrps5fh8nhqj7lwtjn2pce5pdtepqal7maj031xjbkhgh4eq5cwt4nkjpper4z89wl91ym1wp9b3knv4phmk6rjroovaeh7dvspwo0anwz24uc3e1jixs9tmpoqiyyju1zxgam3ddb2oc4mdlistmy1s4x5pjflnkop2yzlrhutu74x0gj0ofcxl691p1t4jkkyx0cv1wl0qily1slg',
                params: { "foo" : "bar" },
                offset: 673055,
                isSessionRequired: true,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: null,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: 'fhx7t5ogg1dwbvbdh56ywq9zhpd6awmda37d6vkes06j1juyp5',
                urlBase: 'nsnsl22k13fjf7aa11t1mykkbvbofkaa8m09crj2ua445c1lf7bwtsb9b8ehkiua8l8so0vrcuau7gzals09zzjtspdob18psy3qz03s5ci5jqafe53fxqr8vhe3zc3j240zwhh5h4ycl7chdif9d7yc404f6gzczhldbr5huulf1abkj0pel5bsj26l7hbncknk3vpk1xwyfrsxjkqfw5b95wkih048gcamsakbdyqhu3js55e82e4s5mt5n1l',
                params: { "foo" : "bar" },
                offset: 456624,
                isSessionRequired: true,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: 'ga2ejoihpgot23tjf4p28o14yr7sy9d4bt2shjkvj1wlgm6cp1',
                urlBase: 'dqn7u3cvegv7qrh6hc3glalyh3da7ddid87bycbcmvdytv3fd74b1nen8ipsst0bsoix3tnvaaslawngopwlmuqb2zkvlgmmrmsnbaxfm2vm5uj0c9enkt8zs8zlnz5d9i04ifgh5be6es7jaj3e9db4gyvb96yvcmsda8l7xkt51jaotnmal7wgw2uk4711jag1yw7rfrhjvysip0b5oa5n2901htomgnhu9w4sv604lthfdzue8ghy4lfio99',
                params: { "foo" : "bar" },
                offset: 993030,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 7356123170,
                tenantId: null,
                tenantCode: '01po39aqzfzuy066tldtz5q0wwcnwins84ddrg94gflcy9uxsv',
                urlBase: 'rmu18lq8qguxkkeqsnlksy4hstns4gj4hv737qvs76mpudrs73ap2uzymlg9eidhgph2ugry0u2d7wss8gqmo7fxveygtnwsfxt6vkiwfetg1xpfgld3eygraismope5pa3eyroeu63541julxw7st6vxt89x8km8cexm6lbnem3sdqp0dbqjvwo27o2og3bxxfxtyhx5s4bignqg0r3x75308v4e62qj6pmnt2cfuh9j5hnzlxhm7p5sopn0a1',
                params: { "foo" : "bar" },
                offset: 274723,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 5770133864,
                
                tenantCode: '8y1947ql78ef77ddyid6ttsvoa12ua9tec9ytobhtnkt6ac2wc',
                urlBase: 'ni2ur6cetyp1aaco0kb96g4apwziko27zusrmop84h2i3dvf2o5hhefya6lgkq38ubpx0wa95guhzhwcym7zk5lc70ci3y4xucm9vdioyeg8l381435z9l0w2v7m7k3uzqx40xbih99p1pscb5hxs2t2zvfd6985axu4qvzapz3idbz62nt7l7a6dnq2bf1zdj1wwwo9ejuzvybpduhg5fv6bzltfj257dm8c1basce6ofnaw8nd3mmpklkhnaf',
                params: { "foo" : "bar" },
                offset: 951325,
                isSessionRequired: false,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 3270515902,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: null,
                urlBase: 'bfefys9s5rdb2j58yfqy2lt96nnmy76sxdh8iysng2mf5oc77b43h5hef4y50vnssznp30v3mhh7r4q37eyhl2m1541pu057vmmjwqf1xd71cf2cv4p46dalejm01wijiyxqrw6ckxtnydymfpmkqbdn1qg6pbkhd1ek0q4knlqjlza91msk12b9iiucoqz04anvkdjrmlo3h488yo55qopeafdtb0qmwa4u5zznov3kfqbjyx1c8l1ozg22knt',
                params: { "foo" : "bar" },
                offset: 889507,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 1101984706,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                
                urlBase: 'j5bpyxwslq39th1nc8wuv1iubjtru0885hgytvhka1k30x8cmef7yb9xgblzgf5c4c237hzixj1gli7sjt9u1p6zi1orshnyicm4hcbpx5iyjtx63jm4v3hxy71flmbu4y24ap0s21j2ggxj6oxusnn63a50zfjqqla6brrfrj3ls0vffhq4ex9h51j9kzmqvm1mhv7s3avfxnc5ta3tvu9olhtfqzvus2w9s9s7omw1ep4ymh63bzvruekzbzm',
                params: { "foo" : "bar" },
                offset: 707030,
                isSessionRequired: false,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 8694286119,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: 'znhu5l0661uyt1ywx3uu9i5sh3gj1u8bzuszdaredzmm7s1p3t',
                urlBase: null,
                params: { "foo" : "bar" },
                offset: 633739,
                isSessionRequired: false,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 4282806107,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: '529blr1me7c699drlo52n3p5zg5s5pfemgohed9cl4yf1mowc2',
                
                params: { "foo" : "bar" },
                offset: 302572,
                isSessionRequired: true,
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
                id: '3z7rg5mx1r1669zcjev2xmbvql1gj304fgqtj',
                code: 7042995248,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: 'oymonv29kb31ypgvkyn8kcy52eeta70cyozj96xt8dc93x4qxk',
                urlBase: 'qhxzau3agltt5rfpdo2zhgvm8qwkjeyyx5z0c6ocpqd0pgf1tkfweuf4wtcgonch8wpy0e12wjk205fsf9rkuz1l39tv1ououv7og3vfld2foopjxlag1gnthb6f7c5b5ru77c9vhwdh6yog80rkgi3bhs4i5p1o1ul081gc6uk2tkb69c65a3udqeuxr89yhtesmcke1b0rpqin6h3nx8nzgmtg8zu9evfdp13wxn0a648lasc7tzeh8ii0mok',
                params: { "foo" : "bar" },
                offset: 936895,
                isSessionRequired: true,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 2025399222,
                tenantId: 'q2ekgw22kmu1o6gzdtz2ijc8uduc52vc534zl',
                tenantCode: 'd7ksvw0dci31f9xs1guu78nqepypwaf2487c2cbdz2e1lzlnbe',
                urlBase: 'u6gr9244g5v78yggvdus5a1s1c2l28ko6g3ih8aissidf5w6upuokcyr7czh0urr6jq9kn3vu3g9bqnz4onshx5io3vjvn2acucmbnj5wdqexvcyg0jtoh7m4tlh77sn21cd1h53w8wa7irzmwl910bzwmh3sef5185lqze9hk1fwjpbjmilvvrjkhjclhu0yjuqquhc6qdwg47hkq5c4myfkfp1kh3w9h3q0n2fvg1wb2b3d4eo4z5mn70ty94',
                params: { "foo" : "bar" },
                offset: 406054,
                isSessionRequired: false,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 60553264568,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: 'tq57p6olx95i8getfhw158nx1zrwyf0gckbr1afznn1r2cywf7',
                urlBase: 'yliqboucs3vnvywr6pk63f31ch9r8tf3c21nm0hdq1bs4mkxr2htthj4uwjq4k8fyn2kxpdat92gp62gwzmelojwx372nvebvdy6ttfe72zh1mlz1bszykaphw8cguovbi6mfe7bl2vqh66lx4owf61tf4y1xiwhgkmb2woaad5cgw35y7xuemz3vw6bmnicd4qnu6rwt0ep021jjolxbin1wbucw0hqg2sr3i2thwsye9acohbocey0ft2rmqd',
                params: { "foo" : "bar" },
                offset: 126606,
                isSessionRequired: true,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 6859470325,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: '87edkr0qsemm1c1lxul9dmrrnn0dwlc68h2qeos4f845zuik5qh',
                urlBase: 'kuqmvlpv1pcwdv9l9cqpl5lhlerc8e2h0r2lfib1ypgtn9yf8ej6xovuiybv30r7qk85fltlm55ie4yaeaua35f0gupdttwd6clz5u6xqqeyu9r0qifkdfjjor63cjy846kcbplwaq21v4gymgg07oleigznbmp647jxmudns1br56f3vagh7ktw529u5snq3n40sdaihcy0q45nnx7b0n939noyho4orfm5elqlqidp3zei64va0iswkkm5c7s',
                params: { "foo" : "bar" },
                offset: 581600,
                isSessionRequired: false,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 1244649818,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: 'n88r08dfnc4f5vvykukh29hjz49lluxgn4uej17o7avd8obsdc',
                urlBase: 'uhh5uq23gahe5n65al09gjfqeay6tqk2wg065bml2yx0krpdzhilaw8fx38hcv0s6d6u787omwmjplnfzforyv40gr7i8pii1oo32oc8hzo6lom60itqcrb60orh8ujs50oeqgszkj8kc256ry1vpem8s6cx1cu1f54d6uncuhzh6bboim0qwpbj0rn5bwjdcuc7l9487x4k2qiosz4t6r9s6w8bpd13e2ml26z0q7dmj5v0ywbncue1xodlo7ku',
                params: { "foo" : "bar" },
                offset: 143750,
                isSessionRequired: false,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 1209912961,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: '81a12tdv3iwt4xzsfxcl8fb5gcfpiefagve8ksnuv8b3gsxdfl',
                urlBase: 'n8yiamua839p11fvxfwk5bbn94fu9evxd5zi6i59sxp3kv3zgwvgxfp59pipa7y4kkxk0yt3orimooagh83iysg28bhxpnwxlbofz5k9ib2068zuguil25dtr6k0po6iqsiy899enbfgsbjahpfvuz4jvpj3vyn9k75zjtqu79i3fr5l9ngq3dxhwr08gijx7yrei5dzesfryus7m4bifzitktossvk5v0rf7e82wnttlx3kd18ux74qto11n7a',
                params: { "foo" : "bar" },
                offset: 7475271,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: -9,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: 'xk60ncf7qtqgwucsafia5tdkeke566dk9124e4d6msdcnub6qf',
                urlBase: '603n661ipr3vflth403wy4vstxzhgympth7oy27y5jmcq3m429tyzbb70ljvshjqjdwpy9dp7y47m869n6mbrinr138cui0q6p36igkwvv9ryy424hvowcb868ywmhqhad9xp3bih9zl7hppxi7jxjiwu0qlw8cfdjwpy6ydbm9t39jokyftcka7x39147irthk49r5pr3nvxiwx2dso6zh6ftzofkc4c30yi735eee77f41rqci1y5xqhxv0z2',
                params: { "foo" : "bar" },
                offset: 894523,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 9101210801,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: '3vqx0j5jncjuy86w1lhzn60aaeosiwlt4mhklroyodlkbmcyzl',
                urlBase: '36v99zyf02p369emfgeeo71qysmkoxafxlwofnu5r67ozcrkgiwkvc8shvxgnisd5vzfa9wjtyjzve2nmeqo8h4ahbietpy7qq8l9534ugxwlei70n3eo9e0fkzdqsubqe8uzkrng8n74q3nt4pou1polikwu5r2dqc1vhlw8h4lcz2ud2jk64ksizd1ykkn33vyvf40laz240y1ogh0arfozni7l9skufzqn1tacs6biujan2z58tkyzl32fd0',
                params: { "foo" : "bar" },
                offset: 108771,
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
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 4593404242,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: 'uq5qjxie3br1oq9a0o69b906x7jz659ceubsswvhmhsw676xv2',
                urlBase: '7c695s30uxrbz4z1luj159kddadsdkr8zmuhaau435q663pghkj1calve2rgcfw3xidz54g9jrmzld2ct67vcc7ed8m83luir9x5czrzyyutzmg1yz7qmgc82ambofxg48a8xdoynpbof5fslk84098gb253z6esq81iha98ves5g12jfwnac622z5m5up182wmw24locnouxzwq84or6n3yge2mj9bs4xpood2wlzp3s0kgja2ate7yvmm7i8a',
                params: { "foo" : "bar" },
                offset: 442383,
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
                        value   : '00000000-0000-0000-0000-000000000000'
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
                        value   : '20da9779-7e32-474a-bb18-e80dc5561456'
                    }
                ]
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '20da9779-7e32-474a-bb18-e80dc5561456'));
    });

    test(`/REST:GET nfc/tag/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET nfc/tag/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/nfc/tag/20da9779-7e32-474a-bb18-e80dc5561456')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '20da9779-7e32-474a-bb18-e80dc5561456'));
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
                
                id: '3ce018b3-58f8-4a1c-a603-34d32c02b84c',
                code: 2594523010,
                tenantId: 'cde3fe02-4645-405a-b948-99cee12d6e6f',
                tenantCode: '2kv78h26cek8i91ta8439lpngqcxshsdi1uw65z8ushrqodsox',
                urlBase: 'atna3hi85vbhidp8gu8pja8sfrpfwjoaqg46qm19khge8eb2prrqbkdazer9ln3ibl8vh2i0k01y2nyvxqwmitbu1yaw1f8qon0s0qogr48dokdxee34hnyynh9ckj89l3kpbqe8t33s14uh75y3oq2c725v09qetz1ri091dksc25nlt91fledegfuvh8kkxgczi4iwo474dgh9gqwg5atkjaxca9nv1zdaunjlswwnpvfy1yefpmetgop2z3x',
                params: { "foo" : "bar" },
                offset: 839688,
                isSessionRequired: true,
            })
            .expect(404);
    });

    test(`/REST:PUT nfc/tag`, () => 
    {
        return request(app.getHttpServer())
            .put('/nfc/tag')
            .set('Accept', 'application/json')
            .send({
                
                id: '20da9779-7e32-474a-bb18-e80dc5561456',
                code: 4790839580,
                tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                tenantCode: '5jfnfbhucxdl4bu4alofma2u0tc8ezcq7jppkd0scgdpo85jep',
                urlBase: '7stegffqlgk1x2gle49plzmpbcdtkdwenhkhd76tk5egs2dyb1hb53652t49izr9t995814kumvpnsspcrihkfsg3lkan7elb0upz14k6pftxxyqhyhuaifsbneod7mrihleyky28g3w3i3egfeoqw9utqvcw9prelms5z6j7wewbjny0px5bgnuptknscoq2kc1is7bh1yd74fb2t1jptodi2xik7jk3qe65bumfp2scd675zrrlb943fxiuze',
                params: { "foo" : "bar" },
                offset: 655857,
                isSessionRequired: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '20da9779-7e32-474a-bb18-e80dc5561456'));
    });

    test(`/REST:DELETE nfc/tag/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/tag/00000000-0000-0000-0000-000000000000')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE nfc/tag/{id}`, () => 
    {
        return request(app.getHttpServer())
            .delete('/nfc/tag/20da9779-7e32-474a-bb18-e80dc5561456')
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
                        id: '4a3ca1cf-23d5-425c-bb58-ebeb1c9c5272',
                        code: 1897789991,
                        tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                        tenantCode: 't5ixin42x1bi2hrfr3icqqn7iijz8wtguap12elj794c66yklb',
                        urlBase: 'om8ux3759yv056pj2ffqyaclaod5v2tzkzsx2n2zq60yheipkt9ts32k5ybltgbl8a0hj8rrp0oo1l45n67qmd38822aqw1nkxgpjidjnp4rpesetifgnzbk8so0ilh593ky6p5jpssks771sx4xxqjiomqum26r00y77bkk13ig99sfutusplxlh93z1lg80h64414lfseqzlo1ylosx6rqr2pcat1634d4w9b37vd7cyxa1w3j7ya4m1nsger',
                        params: { "foo" : "bar" },
                        offset: 702018,
                        isSessionRequired: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcCreateTag).toHaveProperty('id', '4a3ca1cf-23d5-425c-bb58-ebeb1c9c5272');
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
                            value   : '20da9779-7e32-474a-bb18-e80dc5561456'
                        }
                    ]
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindTag.id).toStrictEqual('20da9779-7e32-474a-bb18-e80dc5561456');
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
                    id: '20da9779-7e32-474a-bb18-e80dc5561456'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcFindTagById.id).toStrictEqual('20da9779-7e32-474a-bb18-e80dc5561456');
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
                        
                        id: '4fc9a696-3f94-4882-8101-2ba5860b9672',
                        code: 7329414634,
                        tenantId: 'ccfbc5d9-a50f-4b80-9445-5a13e2db7963',
                        tenantCode: 'inkqqgjxpb33qpzlepcwv4geeeub8rt574stijm6zc87ikjage',
                        urlBase: '9aludnr8bf3vmb9al9w6jhpg6a6pytv5z4gjymq801c2a982d7lgqkpko5nbc3ve4dogwbqapj85jpytgwctkmd0q770o5fk3bhcygnuvb0ejiqnv0j436epxujgbjqcifmcvortt5r4ucy1dirkmbfesbizpbq0gva3oa1vofdmirkfr55ttjprnzmucexdzgolcsu3gxqy8ilo96t8x3idvh5ungpofoijubu2x4yr8z3b90zellyogj6uvt9',
                        params: { "foo" : "bar" },
                        offset: 749133,
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
                        
                        id: '20da9779-7e32-474a-bb18-e80dc5561456',
                        code: 7257841194,
                        tenantId: '8252d797-ad18-4335-b200-078de890abe9',
                        tenantCode: '48ekgnb823dyrowgmbptdbskdjeaof3rxy8g9jcn0si82lluf7',
                        urlBase: '1xvnjip8pm1x780wbjw5jrhxnzixauoz0lttu9dgg4wampt89yc2bh7pozwh9shbouv1wgukn9dewbxooz1edqiiq950nct9xd62prp9y94pgcpezd3eok5jyr42znm31dif9xywjog4iznyu7mz1k8v68htzfpwo4nhb80463kmhxdb28rim1v53omzih44mps42ny5p82ztimnlb1z7zgaj94755wrhn0c8yw91fmxrpm3ghzb1g1a5psr330',
                        params: { "foo" : "bar" },
                        offset: 176585,
                        isSessionRequired: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcUpdateTag.id).toStrictEqual('20da9779-7e32-474a-bb18-e80dc5561456');
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
                    id: '20da9779-7e32-474a-bb18-e80dc5561456'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.nfcDeleteTagById.id).toStrictEqual('20da9779-7e32-474a-bb18-e80dc5561456');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});