import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { IAccessTokenRepository } from '@hades/o-auth/access-token/domain/access-token.repository';
import { MockAccessTokenRepository } from '@hades/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
import { IClientRepository } from '@hades/o-auth/client/domain/client.repository';
import { MockClientRepository } from '@hades/o-auth/client/infrastructure/mock/mock-client.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';
import { IRoleRepository } from '@hades/iam/role/domain/role.repository';
import { MockRoleRepository } from '@hades/iam/role/infrastructure/mock/mock-role.repository';

const importForeignModules = [];

describe('account', () =>
{
    let app: INestApplication;
    let repository: MockAccountRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    OAuthModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRootAsync({
                        useFactory: () => ({
                            validateOnly: true,
                            models: [],
                        })
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
                    TestingJwtService,
                ]
            })
            .overrideProvider(IAccessTokenRepository)
            .useClass(MockAccessTokenRepository)
            .overrideProvider(IClientRepository)
            .useClass(MockClientRepository)
            .overrideProvider(IRoleRepository)
            .useClass(MockRoleRepository)
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAccountRepository>module.get<IAccountRepository>(IAccountRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST iam/account - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                type: 'USER',
                email: '7l2qnflomrfxqdd8xld0w1yaq4nauzox7m4bjuc2hy4fr0mba7b6jfhp9dfzzvptq56g7r5karcgzflyuz9on71lxitmkxemj433m3icswk0ji525ntjpa36',
                isActive: false,
                clientId: '127b2dd6-c6ad-4f4e-ad4a-58b55a27bb8a',
                dApplicationCodes: {"foo":50536,"bar":"En+%FT|6eR","bike":67728,"a":"Fo{RK\\w8^(","b":"KYz!+31-Bk","name":"f7+\"W<.Cuf","prop":69062},
                dPermissions: {"foo":51302,"bar":48728,"bike":"9^Jc\"<2E7y","a":27431,"b":"{R^SvA$SK;","name":"Kqvl`Ws=9R","prop":"ANY(=X]f#,"},
                dTenants: {"foo":"XjJ'Jq82^{","bar":"2E-ZCAgqO[","bike":30585,"a":"RGe&56|90|","b":"WP>xZRZrz|","name":73840,"prop":82024},
                data: {"foo":8612,"bar":10013,"bike":79326,"a":"kIw_r_Uz+b","b":"Eg%!JZy]m\"","name":9556,"prop":"KzE'tqSS+L"},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fc31a043-67ba-48e8-9be6-4915d1f04188',
                type: null,
                email: '2oqm82jmtsz7tiqv7rvqsva0k12ooflu76m6bz80vgepsvfyelr76sf72a1t0j1slrijvc4u7wqcvmhhzd35wr40hr22uoxuuhp44a0pm1c9tedoaj93oqrh',
                isActive: false,
                clientId: '28bb97e6-2d20-434b-8e42-8e7fe7e49a53',
                dApplicationCodes: {"foo":"20_K#Y1C(`","bar":"bjTP5kuost","bike":26594,"a":24082,"b":"{Y{aM(PJA6","name":33759,"prop":75643},
                dPermissions: {"foo":73299,"bar":41771,"bike":"I%WWf$<Jie","a":"74sW8IZ95P","b":"`7Ae;P8On6","name":67574,"prop":48439},
                dTenants: {"foo":20700,"bar":"]T.b!Mrn9Q","bike":"z98}rR7%x$","a":95441,"b":11120,"name":99755,"prop":8948},
                data: {"foo":"J^?bPK%O_A","bar":26923,"bike":"L9MJbuJ0|b","a":"&a2;oFuWmm","b":",z(:5*Dd&r","name":46236,"prop":"Lx<[d7g^</"},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountEmail property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '0caa3ba4-806b-4260-9044-14b04ddac3b0',
                type: 'USER',
                email: null,
                isActive: true,
                clientId: 'd0f352b0-5abb-4af3-8d66-b6dc710b8e36',
                dApplicationCodes: {"foo":48278,"bar":73709,"bike":"REh3}<d\"\\O","a":"sf(]?-=awX","b":"_#HV<+cs|j","name":":aExOU*6MF","prop":86891},
                dPermissions: {"foo":"IA?M.'V_i;","bar":"ye6.tG=WE&","bike":"`*?B{)b}#h","a":"%H;}'&&,,T","b":"L%`CaI2{7g","name":34614,"prop":79664},
                dTenants: {"foo":"htMnKj.c3R","bar":13237,"bike":"ohI<P/!XKS","a":43928,"b":30128,"name":3171,"prop":"BaKM])vT@o"},
                data: {"foo":"7BOVJX[;{7","bar":93971,"bike":"]7wqEd,33m","a":1020,"b":"N'>cL'QOE\\","name":"(Ofu?\"UVeT","prop":2996},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountEmail must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b387f569-d074-435d-b6c3-1af27458ef56',
                type: 'USER',
                email: 'p5qc16gh1bspjd4k9xtso3g3g03v6hjn64hmjnjv52ts959by5vamn9ffwtfqyrbi4a76xen495sg144qp8o0a1b4uniqiwjiokk3go857jdawy03941vir2',
                isActive: null,
                clientId: '49e564aa-9266-4cec-a3c8-ba45f0ff5f12',
                dApplicationCodes: {"foo":72996,"bar":31013,"bike":"#k/;cfvGwZ","a":"`X6ikVKmO!","b":"JFSK^@\\5$g","name":5806,"prop":"`xrn_gAH.2"},
                dPermissions: {"foo":99660,"bar":23624,"bike":55259,"a":55632,"b":"(=+TnOUZ'Q","name":3063,"prop":"$V(c`RT#4!"},
                dTenants: {"foo":"J|17C0/;HV","bar":"#OfetSk%O)","bike":13589,"a":76065,"b":38963,"name":"}7F5[;ZA,x","prop":"#[|KkY!X4;"},
                data: {"foo":":5G$G\"Eq-x","bar":80853,"bike":"J^)P/B,VL6","a":25565,"b":"zr4j4iQ7Jk","name":"dDctxD(V8e","prop":"J].!mP_;cp"},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '611513af-0f5b-4b78-b5fc-ab2694bb470f',
                type: 'SERVICE',
                email: 'gbfi0da4kh7slej419xhvaccffydijled14k37rigeseem4k1esgzqeduwgr8mq5ro8m19quo4fguxjijasc3wtmzhvqkau0drvcg9vqvi1dt167aeykxni5',
                isActive: true,
                clientId: null,
                dApplicationCodes: {"foo":43003,"bar":"Y-9z=!1.G=","bike":"4yHLsUr5#=","a":72461,"b":82538,"name":"UL!0O\\]M_0","prop":"eB8e2Q%t7;"},
                dPermissions: {"foo":95560,"bar":"}!G%PR:Nq^","bike":"&G;@;$529j","a":"K<p)(uggST","b":38612,"name":13086,"prop":")zAT3rK.l]"},
                dTenants: {"foo":"OC)\\AXkT;N","bar":20849,"bike":38361,"a":66523,"b":11506,"name":"kpA1721,/\\","prop":"F?:\"#=/$#9"},
                data: {"foo":"l:kmYIhrGq","bar":38352,"bike":46697,"a":32038,"b":8197,"name":"k{J(LWdFWv","prop":"-=:67CMz69"},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDApplicationCodes property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'cbf33ed4-ab6f-45c4-8b08-1ae2bd428e4c',
                type: 'SERVICE',
                email: 'tiei6ja10peff2p6i0tbwn4vcfrbju9k2ybrsw9uiaikf16isi54gumhte5iyl4ttnjgh6rwwmdl3poqhkj4vkd07j8u6807o635gpyo9c4cw2cclywj3tqx',
                isActive: false,
                clientId: 'd04f1169-b003-4230-93a3-19fa048c5731',
                dApplicationCodes: null,
                dPermissions: {"foo":1946,"bar":68148,"bike":"DJNI/Dr-.P","a":15987,"b":13342,"name":"JGO}Yy$-1S","prop":"BY:wE[R(&9"},
                dTenants: {"foo":"=w2Fr[X3Rz","bar":"e7&,&&d\\*p","bike":"JKWx7K,{qu","a":"/Gw5(_;W3S","b":67169,"name":78549,"prop":43467},
                data: {"foo":48938,"bar":"aGUVP|@QbU","bike":"Ny9!;\".7|i","a":94146,"b":"O-\"AN6Ud='","name":"'Q,(L`>^iB","prop":42820},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDApplicationCodes must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                type: 'SERVICE',
                email: '9get8jlsfpzv0twyx8wv2qi6askvoozr4dvvcqroihpoz7fcfc2uh73m2a2vyaydibktyetgw3lljwst6ld3qkk1s0bp4t5iowsmpjew7t2lox6njcnzze9q',
                isActive: false,
                clientId: '3b27739f-acb4-4df7-a80a-660bff4afc94',
                dApplicationCodes: {"foo":33325,"bar":"E\\r)Yik3L;","bike":"b9$aYC--wN","a":50501,"b":"-P{.mQn_{[","name":"%,<u^}2FNy","prop":37846},
                dPermissions: {"foo":54976,"bar":"1>lA$)WNhM","bike":70318,"a":23477,"b":47187,"name":95298,"prop":"B$rs@bx=iz"},
                dTenants: {"foo":41956,"bar":41690,"bike":"?5]$-u(!\"@","a":"Pc8RT1H#\\F","b":20751,"name":93452,"prop":"6bgkV@Ug#]"},
                data: {"foo":"9t-]Fg*4@r","bar":11922,"bike":"d,&C1({b$1","a":48031,"b":76235,"name":48243,"prop":"z'Jf(AX]9\""},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountType property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '706c1beb-ee7f-494c-9e84-b9c5abe19533',
                email: 'a6gh7fdu7378plu1esl32xfsb6ue79hlrdbwq1bg19dinyks2yqdtduzgyz3xkfmzcu59r4hnnefhs7lp1nku6ohpbwovo2dtpia8ilkh0dfy2ldb8t8i4wu',
                isActive: true,
                clientId: '7e0a1ffa-d33f-4c57-8849-22ca3064aa79',
                dApplicationCodes: {"foo":"<Gq3,s$syb","bar":"<yaL=NBC@^","bike":"dI0-'D|gRx","a":"VSI:*'m3tl","b":"e0{xm5hd'|","name":"/.L(=)`8?L","prop":"+**&}PPq]>"},
                dPermissions: {"foo":"0o;gYf!!l-","bar":"eE6M=wE?Bd","bike":21939,"a":84820,"b":39290,"name":"+;4;p1H9Oc","prop":69814},
                dTenants: {"foo":"^]`_\"&u8mt","bar":65529,"bike":"?9;:$*+zE@","a":"#55Lg\"pmWf","b":57861,"name":"khOjmFC'aR","prop":"g=L7X$zU\"="},
                data: {"foo":20023,"bar":"^%/E514Xw&","bike":"R};.CywJi-","a":34066,"b":34354,"name":53738,"prop":"Yl'DLpOO%^"},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountEmail property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'fb43271f-b7eb-4e9d-b7c3-35862469690e',
                type: 'SERVICE',
                isActive: true,
                clientId: '05fe02e4-d095-46be-bd70-73671696c9b1',
                dApplicationCodes: {"foo":"y_<!(|kdR/","bar":",&|:7E(4\"3","bike":49730,"a":18786,"b":"@gC3`R?rgU","name":30192,"prop":"ynm[+H%NP?"},
                dPermissions: {"foo":49349,"bar":35000,"bike":88121,"a":"VZh`1+5m?#","b":"+i%rA3bNb<","name":"Exnia4jnKL","prop":93450},
                dTenants: {"foo":"`&h=gaz/?a","bar":"!`|XuhT#{'","bike":"4^?a6}VqTQ","a":"N$57wH(zdB","b":37180,"name":36744,"prop":"z1MpevdDvO"},
                data: {"foo":"SG$qt|};s{","bar":"A5|Y\\\".p2P","bike":89571,"a":96038,"b":92461,"name":13272,"prop":73647},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountEmail must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '738d8a69-59c6-422b-8a07-9527f1d7a311',
                type: 'SERVICE',
                email: 'zqhosequ6m1kszvk6ijagpxb1383urja1hattnqg4vk2fxshd4y8cx1mjhelz0vt7itaxpa0d40wxtc3q54dsxecndc8bd2bpgumw5t5u0rmkzwn4v1h145y',
                clientId: '765f340e-157c-41dc-ae3a-82af16b49e2e',
                dApplicationCodes: {"foo":35754,"bar":2869,"bike":"=1aW{^(>}P","a":56821,"b":"cW>N!w'W';","name":29882,"prop":"H\"W(pB%>)Y"},
                dPermissions: {"foo":".]O(l94#qh","bar":73858,"bike":60373,"a":40151,"b":"`>QXXKM;\"t","name":87914,"prop":"\"qHvT,h-Zt"},
                dTenants: {"foo":43795,"bar":"lhg4jJ^t\"5","bike":96024,"a":26621,"b":"G(C|GDT`nP","name":93602,"prop":36963},
                data: {"foo":"xu}BF<S9%e","bar":"[L<3=.l00M","bike":"SczD-0oRgX","a":451,"b":"`.i7OYY{vV","name":60621,"prop":"k9Dc[]q>/;"},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4b2b3b7d-5a98-4a40-86f3-7e56c13536de',
                type: 'USER',
                email: 'txhmwuac5a0so3xakjnkjnzt18t49wvoy1i7f3a8m2ofyb5pw1a3d25mew7uqsv9lbj7b083moo97cujksz5cjwuttdj62u4ryhwxuy5vfnopqpk3cnz2ncp',
                isActive: false,
                dApplicationCodes: {"foo":32057,"bar":"R`Tq)DYxH/","bike":26391,"a":18810,"b":"Tz'40V>KTg","name":14581,"prop":"Gu7b(bEBo9"},
                dPermissions: {"foo":65126,"bar":3744,"bike":"]1cS\"]T1;?","a":"Iii:%}&c_w","b":40527,"name":"S+tt1=:V|5","prop":61331},
                dTenants: {"foo":99593,"bar":"bStA^Vk-PV","bike":15188,"a":"=%h}qO(->X","b":"H<g8qdvO8!","name":"l3AChx=\\K?","prop":"(jc3l3;8,b"},
                data: {"foo":43686,"bar":68948,"bike":7506,"a":57324,"b":"3(+)\\Nz1%l","name":"n:p>J,y6UF","prop":"6'}q]&kXyB"},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDApplicationCodes property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f82327ea-3f41-475b-8869-4a20ab4a6a4d',
                type: 'SERVICE',
                email: 'eznlkaf2gvxve9akalpwb92511jj3km1cq2q267fqjhri5zossaoax5pv7ojkvx5ies81kmk8hqxs49roxdy270eke8r2bosb9yjqr2su0osq8x10imny4pa',
                isActive: true,
                clientId: '77cd2495-b80b-499f-9d81-debc19bda04a',
                dPermissions: {"foo":"_I*[\"\"H:4e","bar":"Lo|>i!3{|&","bike":"CxEaTPe<cZ","a":"eBY>6sa}cx","b":"B9X6vKvD,B","name":44199,"prop":"9K7bphh&Yq"},
                dTenants: {"foo":56633,"bar":86161,"bike":"m;`U.pvN6&","a":20412,"b":89088,"name":54680,"prop":71899},
                data: {"foo":95036,"bar":82124,"bike":"e@,b7f40{@","a":43207,"b":60450,"name":57016,"prop":92912},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDApplicationCodes must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ms24951s1o3bj6sh871mr3465nc4n5a3ib50b',
                type: 'SERVICE',
                email: 'f3dt7qvuw4rigkrn4ylbga6h204podhjolwjdgqdv44fqvh2ee4r7ft0jstf8u5v3w7exfsumisn543u00cce830216zq6sf0ysz6zflh2duce29te3k44eq',
                isActive: false,
                clientId: 'cd19691e-cda3-4296-94fc-d3ccdc6e7a2f',
                dApplicationCodes: {"foo":"'H%su'<:uA","bar":"5*Iq!^|4f6","bike":4768,"a":"t@8CXmvreO","b":"VhOI{6_\\YU","name":"5`S;_?Y$^2","prop":"%f_B:X!aT>"},
                dPermissions: {"foo":34056,"bar":61091,"bike":"Ui6bJt/']V","a":25500,"b":"x.Or|a432%","name":83128,"prop":"Bo%Q.0<]L."},
                dTenants: {"foo":"{s6TPfg\"'/","bar":47193,"bike":"$$4m!')-]7","a":19121,"b":"(I?M{a!]k)","name":"GR2$Wm7M]g","prop":1498},
                data: {"foo":76553,"bar":"fG/9a2r5HW","bike":52755,"a":"m=])0SQnhm","b":15112,"name":"H&-du<\"qbj","prop":34493},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountClientId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4e0da382-bdca-4a55-b712-62132913fdf5',
                type: 'USER',
                email: '1tmyvon4p4fsxtep1j4s3ejvowrt91dzkv4sgz31qhqxmzcbskse2axz33i918x8de5olwnu4bqofo30460u286takdhdrumbjthqxcyrz7m52l18ycb6ok3',
                isActive: true,
                clientId: 'e1k6g8zrqx0z7e579hbt6s9h5bdaazlyil12a',
                dApplicationCodes: {"foo":"xfa(.JY|_c","bar":73138,"bike":"wgDYK}??9D","a":83226,"b":"aTyQ@.4Dc]","name":"8&MT6oyL[,","prop":"lT,mV,N|G#"},
                dPermissions: {"foo":62040,"bar":"4)=yvPfp`}","bike":"Ag+!=R'@`|","a":80410,"b":83918,"name":33160,"prop":55941},
                dTenants: {"foo":"pJp.50'Wf*","bar":30096,"bike":71899,"a":30768,"b":45807,"name":";wdQ%)PT;K","prop":";+Jy_J2\\;T"},
                data: {"foo":"`a[bu0$cCg","bar":"NT)>=lML0%","bike":7676,"a":6445,"b":"WuD<zHFB,S","name":".[5T.<}]'I","prop":"=irfl)p]nd"},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountClientId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountEmail is too large, has a maximum length of 120`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'c8e7d4dd-a8a8-4cc6-9ae9-33d4a27d36ba',
                type: 'USER',
                email: 'r7hrwlxj4m6ig5b6de0yw6fi3xds14actfr8mi6710r014wxqeoy6xs2kvfcl1tribh423pypd5ivdpe105bonoixe7ql40glyq0uw287q6odw39yvowqn2ks',
                isActive: false,
                clientId: '1ac28131-30ca-48f6-97d1-575565ba10e8',
                dApplicationCodes: {"foo":"3q>f{,gRHv","bar":60209,"bike":"8+;k\\5wv3&","a":33656,"b":"o#*^{[Sg[g","name":32379,"prop":55395},
                dPermissions: {"foo":48841,"bar":63061,"bike":75642,"a":71451,"b":35484,"name":"iV{w4vv^2f","prop":9789},
                dTenants: {"foo":43970,"bar":25479,"bike":50524,"a":"qFfB|AY()P","b":"Ge^jJ*@p]y","name":98801,"prop":"T`!tq<SI>e"},
                data: {"foo":"|V0(B\"6BYL","bar":"AT*WA@I'^[","bike":"k9umsRM$|*","a":41018,"b":"4c#FWn5Lg;","name":35011,"prop":"ELn4\"/|B2H"},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountEmail is too large, has a maximum length of 120');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountIsActive has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'b49f9cb7-57d7-4c87-8f7a-34a86c0616c1',
                type: 'USER',
                email: '4qf6tk9xwfyg0kgf76qe8t7kbuh4wzl8p4jqcba7foib06pxfn53lihg9fvk9ngsjaxxsmzinhbaig70mw98mqrekvln700pt6145ikzfwp7smbx76z18p2i',
                isActive: 'true',
                clientId: 'c961a716-4361-4ae4-a1d4-3a6bc972f08f',
                dApplicationCodes: {"foo":".5u;%B)=1)","bar":")^Xif)k==K","bike":42871,"a":"Smr7I+ZDwC","b":"LuAcym+V{h","name":96964,"prop":"Y?zdjgd-_,"},
                dPermissions: {"foo":53588,"bar":"Z/(NdSH]8,","bike":54314,"a":"pe'T@GSkD\"","b":"A-?*KPnF-'","name":14076,"prop":"V04/d`mSe0"},
                dTenants: {"foo":56564,"bar":85849,"bike":"n#+l0Qyl/^","a":25975,"b":96413,"name":"ysL\\Mhkm,L","prop":"TDVqRpaBr["},
                data: {"foo":90755,"bar":23056,"bike":"1@.pb8ojY(","a":31704,"b":"*8<5E\"sM`J","name":"SVGBXRu%%p","prop":"f&4aCMhFc("},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountIsActive has to be a boolean value');
            });
    });
    test(`/REST:POST iam/account - Got 400 Conflict, AccountType has to be a enum option of USER, SERVICE`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'db8880de-8f64-4654-a1dc-fba580b099fc',
                type: 'XXXX',
                email: 'nmii47xeiq7lqcddp5ac1zbhbesoc32q8k8di96p1z9meq67mm0qc0loe8fx8sgt0wopnk19ssnxqmkhufeiqd0qfilybopd78m3u2qfycdrx7b5w7n3ra70',
                isActive: true,
                clientId: 'b2c7f325-fd0d-4dfc-ae64-530f67fd464a',
                dApplicationCodes: {"foo":8869,"bar":59048,"bike":"<\\>G{wD@:'","a":"=wKV.aD\\OW","b":"`J>DJ/yx->","name":"]AYHLsk,^c","prop":14175},
                dPermissions: {"foo":15425,"bar":82074,"bike":">fu8KfT<:u","a":44328,"b":61198,"name":16696,"prop":"O#3TQATRlh"},
                dTenants: {"foo":6718,"bar":"J|g@QaSP]J","bike":19542,"a":55908,"b":63795,"name":"Mti9`;{sM?","prop":"9T8l.z+&H$"},
                data: {"foo":"M1r%hmC*-G","bar":"($r(Yn1(+l","bike":64545,"a":8354,"b":"'Gf`[Py!]t","name":"m1cqD6\"+8d","prop":88581},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType has to be any of this options: USER, SERVICE');
            });
    });

    test(`/REST:POST iam/account`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                type: 'SERVICE',
                email: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarb',
                isActive: false,
                clientId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                dApplicationCodes: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                dPermissions: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                dTenants: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                roleIds: [],
                tenantIds: [],
            })
            .expect(201);
    });

    test(`/REST:GET iam/accounts/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/accounts/paginate')
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
                total   : repository.collectionResponse.length,
                count   : repository.collectionResponse.length,
                rows    : repository.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET iam/account - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'e197886c-632c-4955-bd4a-d0a7e07b6965'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/account`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account')
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
            .expect(repository.collectionResponse.find(item => item.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/7e1dcd10-6780-4f8f-adf8-0ba3446c3532')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:GET iam/accounts`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/accounts')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/account - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                type: 'SERVICE',
                email: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281',
                isActive: true,
                clientId: 'bdf096b0-633a-4fa0-b0f9-065c35331eb3',
                dApplicationCodes: {"foo":",:Sa$Y0&,0","bar":91331,"bike":76594,"a":"5Lxla?wL:D","b":59728,"name":"_J]GZaJCnG","prop":">ak[H{iLa9"},
                dPermissions: {"foo":"?ZrObR{hL#","bar":66383,"bike":":BHb$eQ`BD","a":"hX$G`f?`Cu","b":"{XdaGx}wRK","name":"\\q#\"K,*lKS","prop":40020},
                dTenants: {"foo":57535,"bar":81869,"bike":67003,"a":".YNn,URF+f","b":"Y]85Oup4,m","name":45498,"prop":98098},
                data: {"foo":48820,"bar":"E9|F\\g>Vc;","bike":84212,"a":")]d8#|u5S\\","b":"0uR;YN)%Z;","name":"<Wg;S84Y1H","prop":"[OF8wg\"'#7"},
                roleIds: [],
                tenantIds: [],
            })
            .expect(404);
    });

    test(`/REST:PUT iam/account`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                type: 'USER',
                email: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarb',
                isActive: false,
                clientId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                dApplicationCodes: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                dPermissions: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                dTenants: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                roleIds: [],
                tenantIds: [],
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/b3520652-817b-43e4-b98f-711291263da6')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE iam/account/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/28fe4bec-6e5a-475d-b118-1567f2fd5d25')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });
/*
    test(`/GraphQL iamCreateAccount - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt', 'dTenants'])
                }
            })
            .expect(200)
            .then(res => {
                console.log(res)
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });
*/
    test(`/GraphQL iamCreateAccount`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamCreateAccountInput!)
                    {
                        iamCreateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'ff152480-c49b-49d8-ba19-08a1583d7aef',
                        type: 'SERVICE',
                        email: '58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hh',
                        isActive: true,
                        clientId: 'd22a5aa6-9263-4a1c-9608-5f6fe599130f',
                        dApplicationCodes: {"foo":"l}%WGf#G45","bar":"z^&8&}X#FB","bike":"8@26+wa7s,","a":54083,"b":"$Y0&,0\"u:h","name":"5Lxla?wL:D","prop":59728},
                        dPermissions: {"foo":"_J]GZaJCnG","bar":">ak[H{iLa9","bike":"?ZrObR{hL#","a":66383,"b":":BHb$eQ`BD","name":"hX$G`f?`Cu","prop":"{XdaGx}wRK"},
                        data: {"foo":45498,"bar":98098,"bike":48820,"a":"E9|F\\g>Vc;","b":84212,"name":")]d8#|u5S\\","prop":"0uR;YN)%Z;"},
                        roleIds: ['99b06044-fff5-4267-9314-4bae9f909010'],
                        tenantIds: [],
                    }
                }
            })
            // .expect(200)
            .then(res => {
                //console.log(res)
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', 'ff152480-c49b-49d8-ba19-08a1583d7aef');
            });
    });

    test(`/GraphQL iamPaginateAccounts`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateAccounts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateAccounts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindAccount - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                            id: 'f314ac83-d27f-4a29-8402-6d75d4d258a8'
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

    test(`/GraphQL iamFindAccount`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindAccount (query:$query)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                expect(res.body.data.iamFindAccount.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL iamFindAccountById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '1080e70d-d273-4720-a37c-ae8e73d2f54d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindAccountById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        iamFindAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                expect(res.body.data.iamFindAccountById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL iamGetAccounts`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetAccounts (query:$query)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetAccounts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateAccount - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                        type: 'SERVICE',
                        email: '12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hhyu65obmmem5e8o2tbd0jczfzwdlk281',
                        isActive: true,
                        clientId: 'bdf096b0-633a-4fa0-b0f9-065c35331eb3',
                        dApplicationCodes: {"foo":",:Sa$Y0&,0","bar":91331,"bike":76594,"a":"5Lxla?wL:D","b":59728,"name":"_J]GZaJCnG","prop":">ak[H{iLa9"},
                        dPermissions: {"foo":"?ZrObR{hL#","bar":66383,"bike":":BHb$eQ`BD","a":"hX$G`f?`Cu","b":"{XdaGx}wRK","name":"\\q#\"K,*lKS","prop":40020},
                        dTenants: {"foo":57535,"bar":81869,"bike":67003,"a":".YNn,URF+f","b":"Y]85Oup4,m","name":45498,"prop":98098},
                        data: {"foo":48820,"bar":"E9|F\\g>Vc;","bike":84212,"a":")]d8#|u5S\\","b":"0uR;YN)%Z;","name":"<Wg;S84Y1H","prop":"[OF8wg\"'#7"},
                        roleIds: [],
                        tenantIds: [],
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

    test(`/GraphQL iamUpdateAccount`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:IamUpdateAccountInput!)
                    {
                        iamUpdateAccount (payload:$payload)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        type: 'USER',
                        email: '4iyw9pwsdxcmgcu744j2ddgy4xuct6c58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarb',
                        isActive: false,
                        clientId: '28fe4bec-6e5a-475d-b118-1567f2fd5d25',
                        dApplicationCodes: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        dPermissions: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        dTenants: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        data: {"foo":51491,"bar":"t9btiDw@[J","bike":84025,"a":12310,"b":54302,"name":37301,"prop":44799},
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateAccount.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/GraphQL iamDeleteAccountById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e58f6e9f-619d-4efa-b790-22f90d82e9d3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteAccountById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteAccountById (id:$id)
                        {
                            id
                            type
                            email
                            isActive
                            clientId
                            dApplicationCodes
                            dPermissions
                            dTenants
                            data
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
                expect(res.body.data.iamDeleteAccountById.id).toStrictEqual('28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});