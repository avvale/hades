import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

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
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
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
                type: 'SERVICE',
                email: 'm5m0rufh1eo2c5w2mcakyt692cofxmsn4rnnoad3k6ewy3wkfzz7apnouio5rnmiklx3u9w23v0jajou1r7le8t19xma78k0ft7hepizjn753oeizsworhx9',
                isActive: false,
                clientId: '05cbeee0-68d3-4f32-94b3-c370c95645bf',
                dApplicationCodes: {"foo":51265,"bar":78203,"bike":"*K@ZO0nI4,","a":"k7/42y['od","b":72063,"name":20809,"prop":18643},
                dPermissions: {"foo":63903,"bar":95841,"bike":82604,"a":"dIg[71-]eL","b":53180,"name":"#4z(#nI76d","prop":"56P>E*jr#&"},
                dTenants: {"foo":"OzXQF:gRG6","bar":30266,"bike":":Ej,%)EFqr","a":"lZ_kwLk1Lt","b":53585,"name":"N^yW6nh4/r","prop":"NeDWa.Qp(|"},
                data: {"foo":78222,"bar":77594,"bike":"vhz%_#e7l)","a":18918,"b":"d;ZV{?Pp!<","name":39709,"prop":"l8f2)28AHm"},
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
                id: 'c8fddc7a-ac8b-40ca-893e-c09fb2314535',
                type: null,
                email: 'wf1z63mlv20ta98e24lw6kgvy317xvuvzspnms1gz91ekggc3pyzaqams8ta2l0jw6tybbnlish28h9stiunrj8ckgs33zrg8iy02vgjy56vs1nbn6tbdy2l',
                isActive: false,
                clientId: 'bcba2f88-516a-4898-a95c-669447df589f',
                dApplicationCodes: {"foo":"l01Z1#h#_Z","bar":15989,"bike":"2jX!/\\QGVo","a":"=f+.HG]]ue","b":21711,"name":"4b5&!ZTU\\g","prop":"]3W6vfC%\\H"},
                dPermissions: {"foo":90877,"bar":5695,"bike":"`PyTQ_on$a","a":"_'!R/ae)Bn","b":"qbGv=Z?-O^","name":"_t9#V.O(*o","prop":"S%Z@w8Tl\\f"},
                dTenants: {"foo":"wY,)^H)-r)","bar":47344,"bike":31683,"a":31622,"b":6092,"name":"OD!D9Mh.VE","prop":82604},
                data: {"foo":55729,"bar":"Ia3sEEtA@q","bike":75969,"a":"31VYqtz#WY","b":82782,"name":"R7seL0:$^<","prop":"%-$u?Lai%s"},
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
                id: '7852e6f1-1cf4-42b6-a4d0-ae484bdf59d9',
                type: 'USER',
                email: null,
                isActive: false,
                clientId: '3c1224a0-69ea-4c31-8410-31eb0a3354c6',
                dApplicationCodes: {"foo":99897,"bar":"rUBZj\\n&\\o","bike":22128,"a":"l??c(Ev][H","b":"6h3i:3EE/8","name":"[\\k%<sg%'g","prop":"?c!6O'Zig8"},
                dPermissions: {"foo":"odj-o%XFJz","bar":57920,"bike":12569,"a":46368,"b":"o7_;v{-qAF","name":"8b;Bg\\'zaW","prop":"30f{h-P=h]"},
                dTenants: {"foo":"zV>Ns=w\\!@","bar":41498,"bike":34033,"a":"dgp&3|HlY=","b":"88B>,1Iy)b","name":")fF&){u3lD","prop":55707},
                data: {"foo":95125,"bar":85086,"bike":"&1|{r7E@yc","a":"*Odbd%Wp_O","b":"(+Xfj{()>!","name":30809,"prop":8510},
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
                id: '200a05e3-03cf-4f35-b79b-f834ea1e4ded',
                type: 'USER',
                email: 'irtpnckdkxtj3yzdz6226rcbqdag3txj0gj89hivkpv0daulanq17h8ev63thl9dg71j6e3q08hsiygt5rthynedqrc3fgy3jpyeddo5b9519fkoqus0myvq',
                isActive: null,
                clientId: 'db4484e6-2ab4-46a5-9a49-a13f45752729',
                dApplicationCodes: {"foo":"9p8BSUsasV","bar":"QtGA:uuK7d","bike":"sR8&|b+^Dr","a":"T)'`C=Xn[V","b":"r^oi!wfnT0","name":63191,"prop":"=Lj_5}|SYD"},
                dPermissions: {"foo":"-a%]@fc-Wi","bar":"G:V[ICWuH*","bike":83926,"a":"I`\\LWc@/$e","b":90771,"name":"^Zc5&`w%C+","prop":"w)U;Q>y`C5"},
                dTenants: {"foo":16397,"bar":37131,"bike":"R-o%aq:;v:","a":"jA<s#m|^'V","b":33075,"name":"#^^+bz0zl0","prop":"4Y\\N6;0Jf7"},
                data: {"foo":"]Gr\"RG4AGG","bar":"nUG3JK=\\xB","bike":48696,"a":78655,"b":53138,"name":"WVW'+'GTAp","prop":"`qxTRpT\".>"},
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
                id: '6499f7de-1ac0-4ad5-88ee-9e3a2e1417e3',
                type: 'SERVICE',
                email: '9lg7esx5yrio7pywnvdxr3kk16v4g9ex5m1j6dt3p9ojk6xe0tay4j5brcc90fgmch2z8kyuoqmwu9eagzd53caujpwd6biyk3amgj7suhpnbhre9vrn91yl',
                isActive: false,
                clientId: null,
                dApplicationCodes: {"foo":70779,"bar":646,"bike":8743,"a":".>8P^/{wQ^","b":"gA?u*LD\"j<","name":"r/u()7J*7-","prop":66617},
                dPermissions: {"foo":82049,"bar":95488,"bike":32054,"a":"*F40)Zb,:B","b":"p(yxaqGL5:","name":"$K3|SED/_@","prop":15931},
                dTenants: {"foo":71962,"bar":57636,"bike":7060,"a":"$b7LI=wB{a","b":"e$D|lGE2<\\","name":16905,"prop":95571},
                data: {"foo":"Zl]E]WS]9-","bar":26234,"bike":"asa6e]XZ/i","a":50720,"b":96051,"name":98897,"prop":14826},
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
                id: '36eadaef-babd-4c7e-aca6-9a902e9bf2d6',
                type: 'SERVICE',
                email: '63rj3gw6o5msigebeffhb4ocgs9zd960qji2qbnou9h7e49oiw7roctlw7cseoxh959ockcduxwgjambuj6dxdcfc2set4w6vgqppt2oq1dzngh7uzouzh0p',
                isActive: false,
                clientId: '803fb592-134b-4486-b803-ccf15ed1d243',
                dApplicationCodes: null,
                dPermissions: {"foo":63367,"bar":44394,"bike":"J=Hb(kv$[]","a":2079,"b":78431,"name":5388,"prop":"#n-<DB9u&i"},
                dTenants: {"foo":37959,"bar":"F$A[l5o:<Q","bike":"QQeWh%/s6w","a":13519,"b":45320,"name":93540,"prop":42474},
                data: {"foo":43336,"bar":92904,"bike":37738,"a":82734,"b":2247,"name":"Fx<+_>+Mn>","prop":53579},
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
                email: 'y4kia89la36gf3d16s7ivrhcfnxdgp11pyrgomza3474igfk66s8ayolon7a4xvru8mn08h6icw7zk2c2pb4qgdz5finsdaxrfmh4addnmohh06t5gob2ilf',
                isActive: false,
                clientId: '39912804-0a47-45e5-818b-949157e1d572',
                dApplicationCodes: {"foo":45997,"bar":17827,"bike":"ZxdGxRkJ_\\","a":"(VuGA64>yZ","b":8624,"name":71411,"prop":20182},
                dPermissions: {"foo":33318,"bar":30406,"bike":91707,"a":"4gc\"W%x,61","b":"R_RQM*e5.V","name":"|1cr>ML{`@","prop":"z(nMqgw@@N"},
                dTenants: {"foo":"?s]<c@?4y6","bar":"6UpvlMeBf*","bike":"`ck.9Q\"vB'","a":"amhf0Mn?;2","b":"ox@\\&BrLS2","name":",-'a7h)\\-X","prop":"/3W#Q+}MJ2"},
                data: {"foo":86252,"bar":57633,"bike":72059,"a":1381,"b":"#eFE(MBT*c","name":79383,"prop":")Wu2ea$rCu"},
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
                id: '12205adf-5ee3-4448-9b48-e57e7b587c35',
                email: 'aoszfmp81daxbb836ti1py9pagu2e1qqbaovuqt55654uc2azedwt03loamphe64g6ikq7tdfq4p2r82nffcomrxq6kurtdqelagit1mkywdvym2urmejvpw',
                isActive: true,
                clientId: '3a476ff4-2de9-469f-8834-91d214ae3931',
                dApplicationCodes: {"foo":99363,"bar":21676,"bike":":<*[$B5:t5","a":"PZL[h)s$gD","b":29706,"name":1821,"prop":"qt,oc\"}%CF"},
                dPermissions: {"foo":84832,"bar":"'kNP4p<G_s","bike":42508,"a":9963,"b":98479,"name":97756,"prop":90867},
                dTenants: {"foo":51994,"bar":"8S-Qg_xeEa","bike":694,"a":"E9?\\Cq(A3l","b":66292,"name":"zD]uG6e7ee","prop":"8vOu!<(A*m"},
                data: {"foo":"L(v0Za>y4D","bar":"sdhzLe4wiM","bike":76338,"a":"Nq^-pibtPY","b":42355,"name":"981fjtspJb","prop":80510},
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
                id: 'a9a4efa1-ac3d-4377-95db-f7b40183bf84',
                type: 'SERVICE',
                isActive: true,
                clientId: '409ea473-6899-46b3-93dd-8ab3a81c408d',
                dApplicationCodes: {"foo":"49{%\\a;U+U","bar":"MX#leeYbgk","bike":66472,"a":26246,"b":"iO{S!.2rP?","name":"3m?\\jX>!9J","prop":"-_2>:AEi`M"},
                dPermissions: {"foo":"pwK07o>Lb3","bar":"8`jI@qK(p'","bike":"ter`E0L6`[","a":"E);nmq5/3O","b":81239,"name":78728,"prop":49105},
                dTenants: {"foo":72936,"bar":38841,"bike":"K%as|EiF!8","a":"xL\":l--o{%","b":"NI}a6i45hD","name":"ax4e(?xVvu","prop":73615},
                data: {"foo":"S[:E34pJ0s","bar":"@l+IL,&wRy","bike":13175,"a":"U0H?k>2zUW","b":77391,"name":33434,"prop":22561},
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
                id: 'b1604da5-de3b-498f-bb74-4fcb5f94ba7b',
                type: 'USER',
                email: '8f5rzsbaakgm38wj0drw2elf1sh044hygm03xxnmzlbn92itgsye4p81xdf8yn3d351hxoxvjjjjkca6doaik93cszhvy5bdokr8zuf23t3njafty2c6vxvq',
                clientId: 'd38512fd-ced4-4210-8ee9-674d407207d5',
                dApplicationCodes: {"foo":90573,"bar":"E6&<mMmW6G","bike":76601,"a":61699,"b":40479,"name":"4KEg8:-Cn7","prop":46669},
                dPermissions: {"foo":3758,"bar":"E'*xW*+w?k","bike":66002,"a":"vej8?pD6ku","b":65077,"name":"/Ww<M?<,Qd","prop":"19)cxIfh7s"},
                dTenants: {"foo":"6q'1\\p9Bv>","bar":15010,"bike":59055,"a":52441,"b":"kUs9og-GSq","name":28347,"prop":"0V1>={NnH["},
                data: {"foo":18486,"bar":17145,"bike":43969,"a":21420,"b":"}Ty1923[=>","name":"CynPO*!iX{","prop":"`fX_@ubGR<"},
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
                id: '189f8468-8011-431a-871a-ef4d1896b160',
                type: 'USER',
                email: 'gg8m02zcxw0b0oji9vtgt2horh533mvno7d0kx7tcjhyu94xx0twfriuwlsqilo4qvicmqodsi1buoodvtd95je3aceapn669lje196x544wcpcln6fsyw97',
                isActive: true,
                dApplicationCodes: {"foo":"p8/k55ukx6","bar":"V}bOU-ku5?","bike":72001,"a":"da@7+fSg^J","b":74460,"name":62700,"prop":"5}MYARGeAs"},
                dPermissions: {"foo":"cKl7>GmrU]","bar":50179,"bike":72789,"a":"ZHzGVO&W_)","b":27383,"name":28799,"prop":98147},
                dTenants: {"foo":"8_*{cs{3?r","bar":3469,"bike":"8[%,)5*AD-","a":13854,"b":83057,"name":"LONYp$c7_\\","prop":"hZEzZp|P;e"},
                data: {"foo":69960,"bar":43626,"bike":"<W/_ms;cG7","a":79849,"b":55453,"name":"[C<Z%xg5)}","prop":"t0Tgm%3kYV"},
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
                id: 'c83015b7-35ea-4115-8de1-91abd027650d',
                type: 'USER',
                email: 'b2suqq27anqgzf6xpao8pfqe0vucebp4c3ena245v07gfws9fliuvl069z0ml5dou58jc46511vd1l27z2l5o47jvi8fl933w31ynszlzm0rpf5c3brr3we1',
                isActive: true,
                clientId: '26a795bc-0a99-4ddf-b08a-ab8f3219fa09',
                dPermissions: {"foo":75008,"bar":90593,"bike":14204,"a":"8Lm0;:!e`(","b":"M/THYt$<G9","name":"|9p9'GKR_H","prop":"RJy#U9HQWK"},
                dTenants: {"foo":58852,"bar":2917,"bike":75605,"a":61743,"b":68950,"name":".wB\\7m84sk","prop":31318},
                data: {"foo":".Osb?Gg]<B","bar":96071,"bike":56648,"a":94833,"b":"rYdI:Sb^;;","name":43127,"prop":"'3[/Eznc&:"},
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
                id: 'ga5om8cp8aoo0qrx7sm9ju646ylq6gkj18yn3',
                type: 'USER',
                email: 'czdw47z0159qvcm8ikpd8fwwejrbrpbmjqmtp9jl8j3vm9hwkxw826263sg50i17050va1y42mcudgohwqzcu21rose9ub0kr2qldno2g67fauhsesggmp6g',
                isActive: false,
                clientId: '94632f9e-cade-444e-8b80-458fd4768480',
                dApplicationCodes: {"foo":">GAQYN_uDq","bar":12320,"bike":"4,_}*>|WfF","a":70937,"b":19562,"name":68282,"prop":"U@nk_g}}D["},
                dPermissions: {"foo":"=YoJ!hg63[","bar":")GOHWl(lR\"","bike":"}/x]yuOrH\"","a":"?.OAg-eVWL","b":82335,"name":"g@]*!'0\\0)","prop":61598},
                dTenants: {"foo":"w#IbT9DR/g","bar":22030,"bike":"qdsp|%tvj}","a":"*E{B<AobPA","b":"@s#\".r.=`L","name":"q.Dh']v@Z{","prop":38678},
                data: {"foo":"wkhKTD{auS","bar":"5L_A93le7T","bike":95622,"a":"g:[k<PD(A&","b":"\"M]wn:xs{6","name":"7jfe=g2^81","prop":47880},
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
                id: 'daf83a81-d63e-4b0c-8764-8aa63733c1e3',
                type: 'SERVICE',
                email: 'cfb6wcqq0rerzm42tciyqtp5tshbfu7omi8p2fjsxbl8m7h4asx8xq4e544d69plp23jkx73m1anacd2ta5ju8470en631wt3fshn8f1um0cs90bjaw1tdkz',
                isActive: false,
                clientId: '7nffbkrtnh99qxua8wfwsf8sdb20bbe9q9kge',
                dApplicationCodes: {"foo":5712,"bar":"%5nUhZ;%CO","bike":"bcerFg`<1R","a":"}u6?f{c^)b","b":81041,"name":"\\tJC=?6VF@","prop":65231},
                dPermissions: {"foo":35027,"bar":"tAq1I92rea","bike":"12>X_T:8Eu","a":2426,"b":11620,"name":63741,"prop":"V-o$Cy[LG^"},
                dTenants: {"foo":99907,"bar":"DT5Ey>=E-t","bike":33801,"a":"C-l8fERvO^","b":42716,"name":";8_J4[Ay=G","prop":72972},
                data: {"foo":"LQ<(.=`zL]","bar":"zM@r9YuLgY","bike":51984,"a":"%|Bl{ZDI69","b":"3l]0}PP,8:","name":"}F$N{}1cd9","prop":"Uw%th?/l1E"},
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
                id: '0f54579c-9bb5-47f5-866d-1c723f16b4b3',
                type: 'USER',
                email: 'gsnj7lwrfzqi8nckxs2ol6iwu24ikfd0ds4zaqlfyemjcznqv78s8jfjxu6ejr5l79w714z61kmdnf76191k4mrgvdmup35796we8ntndywiud84wpx9fc555',
                isActive: true,
                clientId: '02e4c9e3-d5e7-44c9-a860-a32cdac853ea',
                dApplicationCodes: {"foo":">Ni>3uXxHZ","bar":33431,"bike":25849,"a":93588,"b":"A$CcSfxns%","name":"jM%EWK=Da;","prop":"MTv[;)'*P8"},
                dPermissions: {"foo":61322,"bar":28759,"bike":"/rTh=nscQn","a":7482,"b":"JIR5z=}!GA","name":";|H)hTBr%_","prop":44133},
                dTenants: {"foo":96850,"bar":"]^;*<hY(Qg","bike":"J=n'(2:oh%","a":61853,"b":70758,"name":19574,"prop":"#U1gCk.SLU"},
                data: {"foo":"_u]fK/.jk3","bar":79079,"bike":"4MNG*%7O58","a":"fLeeWw}P*;","b":"5'3}Fbg]vt","name":"S:)--[l]G,","prop":46528},
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
                id: '3936b09a-0949-4011-8ca6-64b206fe6009',
                type: 'USER',
                email: '4i2l9ufogkpoao1lvkmu2y3dsbw923ctq802grbol00jeled87sj70p5ccvsk7brfy5yob4vwrbcvto2xf3gbcsojyw0haeg4hzbg6q6vromocxblh874eki',
                isActive: 'true',
                clientId: '91872919-c55a-4ed5-b4a1-3eecce7c616b',
                dApplicationCodes: {"foo":70622,"bar":"[p`!]0Y5=@","bike":"KNtBbxnp(o","a":"v2}3zpA4An","b":86720,"name":":IfF&Tu-9K","prop":1433},
                dPermissions: {"foo":96804,"bar":27190,"bike":59634,"a":75149,"b":"?Ww!f:3n@Z","name":17078,"prop":"MWe-SdqD5t"},
                dTenants: {"foo":"b4(cd$AyeU","bar":49500,"bike":63668,"a":98772,"b":"Jdt|CoK)e%","name":31850,"prop":":Iq[rPhg*C"},
                data: {"foo":34940,"bar":"%Zp8!;9KcT","bike":97376,"a":"9QP$ns_l}!","b":38801,"name":8809,"prop":81129},
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
                id: '4b354db7-efd9-4fb3-a941-8e4049d09dbc',
                type: 'XXXX',
                email: 'x5cp622txa00yzf44ypn2zf7fbmo83fpvj0ihllq841gvibgx25lkc1zbnyzjiqmafi12luslc38lzxtt6p54zd8gho402tc85mrw3ohqurc0w11pq0i1pkk',
                isActive: true,
                clientId: '672e26a1-d393-483a-82a8-84ac83669db4',
                dApplicationCodes: {"foo":"Nf!8oVDb6q","bar":27753,"bike":15881,"a":"UkE=O@zL>K","b":36958,"name":"Tf$G9PD`E%","prop":"N|y\\GJdAgV"},
                dPermissions: {"foo":"!gxi1yz5V0","bar":"h|^8-W7w!W","bike":",[wrO/:((<","a":24228,"b":"Cx`$_>0;q4","name":72600,"prop":47767},
                dTenants: {"foo":"v!Ic{\\=c14","bar":46444,"bike":"!`M:8rXSx[","a":",$*9kZM1{0","b":"p7)r8LSxP]","name":86707,"prop":"dKV9:\"<Cuh"},
                data: {"foo":3386,"bar":29661,"bike":";?UPi&%djm","a":5296,"b":6088,"name":"V_!(TE{i21","prop":6336},
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
                        id: 'f408ff97-d0c1-478f-b8e1-86a6e145b975'
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
            .get('/iam/account/65c0d35a-ae1d-415d-8e38-c7888c1ef54f')
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
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '28fe4bec-6e5a-475d-b118-1567f2fd5d25'));
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/3ef43c0f-77e0-469f-9725-c4242e964f90')
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
                    payload: _.omit(repository.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            //.expect(200)
            .then(res => {
                console.log(res)
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
            });
    });

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
                            dTenants
                            data
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '6d1aaa06-a92c-4abc-86dd-5b347441ddaf',
                        type: 'USER',
                        email: '58yr5l14uut8o5xljka25lp8ac0z3xy12v8rbexch6iemni95gavle8lc44pkescnln7a3oqw0khx3oh2u3w2qarbk9g74h3pxy47m0n2f35cvtol3ikt5hh',
                        isActive: true,
                        clientId: 'd22a5aa6-9263-4a1c-9608-5f6fe599130f',
                        dApplicationCodes: {"foo":"l}%WGf#G45","bar":"z^&8&}X#FB","bike":"8@26+wa7s,","a":54083,"b":"$Y0&,0\"u:h","name":"5Lxla?wL:D","prop":59728},
                        dPermissions: {"foo":"_J]GZaJCnG","bar":">ak[H{iLa9","bike":"?ZrObR{hL#","a":66383,"b":":BHb$eQ`BD","name":"hX$G`f?`Cu","prop":"{XdaGx}wRK"},
                        dTenants: {"foo":"\\q#\"K,*lKS","bar":40020,"bike":57535,"a":81869,"b":67003,"name":".YNn,URF+f","prop":"Y]85Oup4,m"},
                        data: {"foo":45498,"bar":98098,"bike":48820,"a":"E9|F\\g>Vc;","b":84212,"name":")]d8#|u5S\\","prop":"0uR;YN)%Z;"},
                        roleIds: [],
                        tenantIds: [],
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '6d1aaa06-a92c-4abc-86dd-5b347441ddaf');
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
                            id: '427a8607-650b-40ae-9eed-9cf066a28219'
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
                    id: '2cb95f99-0533-4cc6-bae2-246df6230515'
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
                    id: '9bb63dc4-5af7-4001-a224-1eecffb21f33'
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