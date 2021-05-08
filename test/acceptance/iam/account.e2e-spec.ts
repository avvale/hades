import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountSeeder } from '@hades/iam/account/infrastructure/mock/mock-account.seeder';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('account', () =>
{
    let app: INestApplication;
    let repository: IAccountRepository;
    let seeder: MockAccountSeeder;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
                    IamModule,
                    GraphQLConfigModule,
                    SequelizeModule.forRoot({
                        dialect: 'sqlite',
                        storage: ':memory:',
                        logging: false,
                        autoLoadModels: true,
                        models: [],
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
                    MockAccountSeeder,
                    TestingJwtService,
                ]
            })
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = module.get<IAccountRepository>(IAccountRepository);
        seeder      = module.get<MockAccountSeeder>(MockAccountSeeder);
        testJwt     = module.get(TestingJwtService).getJwt();

        // seed mock data in memory database
        repository.insert(seeder.collectionSource);

        await app.init();
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
                email: 't85cyie8gidqkko3f9e9yd1bkvflmbbp8lpyqvpl5pu2i0gbopem4s2hnn04e8dyxin0wdb8euecodhtj4v9x57yhqv94g5cqn8gag0yd05d4hvjka7p4kvh',
                isActive: true,
                clientId: '15c47954-598c-4e82-b9ef-c603f814add5',
                dApplicationCodes: {"foo":15642,"bar":"gr;RiQN8PN","bike":40457,"a":"^AmjXRj's,","b":81153,"name":16614,"prop":90393},
                dPermissions: {"foo":",Rr'//[?^Z","bar":61298,"bike":97323,"a":"p&cLVNZ-mZ","b":"j'\\K=K+vT5","name":19233,"prop":61473},
                dTenants: {"foo":"{w+EDT&Q[5","bar":"oGFQUm6d<6","bike":59894,"a":"lT^M$I[4Ac","b":"+wRKyoo#+b","name":"YmI36Z\"`t4","prop":"o=k\"N4]nG6"},
                data: {"foo":"sL;o*C]A@f","bar":2374,"bike":"?Z[wVea402","a":38258,"b":74786,"name":"YKuq(}`Zt>","prop":"e2kM|tyBWa"},
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
                id: '08643d33-6c31-4e57-ad6d-47ba039a38de',
                type: null,
                email: 'id3a1rjxskx073hdsu7wfgauwuvlmt4n8pirxa9wcdc8gj6upjg0pmjfs6sjgefjp20q3hej5qj3bqafbehpcotazhzyvcs5krjyos6hmum2p736c3whpu9x',
                isActive: true,
                clientId: '9a941d9e-28d4-4d0e-9d63-126adc8b7cdb',
                dApplicationCodes: {"foo":"5+y8qGUF51","bar":51322,"bike":89152,"a":"at6\"BgEQr2","b":75515,"name":"qL`M20nH>#","prop":75173},
                dPermissions: {"foo":57108,"bar":"OzYSwH?{_f","bike":30215,"a":10415,"b":"jTv5l_YaVR","name":"Jxst6Byw$k","prop":94873},
                dTenants: {"foo":83306,"bar":"pb4c\\o/i[2","bike":"!%lr@vNBP'","a":"[!},qJOORv","b":95407,"name":70441,"prop":"WWh]juuE%p"},
                data: {"foo":";-/lGNmN*p","bar":44018,"bike":83074,"a":78372,"b":38274,"name":"z;A5?*D'U.","prop":"3@:m'FpFmM"},
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
                id: 'bbbbb356-6edc-42c2-b003-2a06b437048b',
                type: 'SERVICE',
                email: null,
                isActive: false,
                clientId: '3495ae98-9a00-439c-9fbb-8e89734f0f76',
                dApplicationCodes: {"foo":320,"bar":"^qdo}_iF2C","bike":"\\Yde0?Ml]/","a":60468,"b":21318,"name":"/x%QS{z^$e","prop":88375},
                dPermissions: {"foo":"&J6WN-5Ls%","bar":"U#Ml7[4P-o","bike":4460,"a":"Q6=<|#Mh)I","b":97782,"name":13507,"prop":3788},
                dTenants: {"foo":18126,"bar":70847,"bike":9545,"a":85971,"b":"ab\"(sSK,_!","name":"2uP)v4(k,z","prop":"8!2B6WJycc"},
                data: {"foo":"\"|NXwgS\"ka","bar":48127,"bike":98389,"a":16782,"b":98100,"name":"F':{`-)0FU","prop":"+.1ZMn.wq:"},
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
                id: '0e5bd53b-fc25-44e5-b71c-d7435b8dacae',
                type: 'SERVICE',
                email: '57forr7pcagrzlftq9xu14oij0q0ec6bmu5la06eszajq481fz8h4u1ngenr7205g9f0wv3yxdb7uwvckgavxb1hqvjikm1z9urthw3chij35w7gn8md01mv',
                isActive: null,
                clientId: '5dc15638-68d5-4d71-b402-74f42f18a3a5',
                dApplicationCodes: {"foo":"yu)B>xBaNx","bar":41894,"bike":"L!Jfiof@)&","a":"8\"Z8(4>1v5","b":88831,"name":16905,"prop":"7>512WJ09Z"},
                dPermissions: {"foo":"tHH\">@q\"gu","bar":35190,"bike":81178,"a":"Rns0>FQW;s","b":47395,"name":55517,"prop":"XRwddaGSs9"},
                dTenants: {"foo":"1nC?!fJKoz","bar":27275,"bike":51191,"a":"@X|v@_UFj&","b":"?n+r`WV6\\s","name":63169,"prop":35427},
                data: {"foo":12242,"bar":50061,"bike":">S5|uN^gAd","a":28655,"b":79385,"name":40134,"prop":"A}a<q'2Ns/"},
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
                id: '2855bc1e-8400-4b61-9ef1-c15a223bff68',
                type: 'SERVICE',
                email: 'a4bgjdqhc420glyplr44vrjw9nbnjcu7ogicoxrc3k99h1u0bzdqfkmoy31gpag1znn3iamm2jamdylnsmldqbiv4wcfxb998j2evm34fxz0yxdiruoxvunh',
                isActive: false,
                clientId: null,
                dApplicationCodes: {"foo":"aH7gN!4`Z@","bar":93610,"bike":"22vv4r:]VI","a":"<oFgb}/1h-","b":96753,"name":654,"prop":"Tu8mjB\"UzG"},
                dPermissions: {"foo":76730,"bar":31382,"bike":":t`3d!:DXO","a":":A%VH*P%ji","b":"MAkk6nFWc|","name":"(m;=ZDulMP","prop":"N,KP?=TW-5"},
                dTenants: {"foo":"9(u'\\?==(O","bar":"4Yv4*//Gn*","bike":"4M2/eiRbDT","a":"TVX{5jlIHD","b":"y1,?-wpC3l","name":25392,"prop":"O\"l=3fV[Vl"},
                data: {"foo":"k;c<Qa>|:o","bar":18922,"bike":70432,"a":"-@Hts$co9N","b":"DdNYNN*X+x","name":11101,"prop":12303},
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
                id: '334ba582-0da5-4b8a-b6be-5c101b4c13b8',
                type: 'SERVICE',
                email: 'vwa4mq66ib1fn1ag0to2rb7ufv03o8yi262p2ywvn2fzz2hlri2q0y57jmdt82l1msq9p09x2aow98gv9wxg47xtqora9mlvtqms650cjad80vetcnnbhx4v',
                isActive: true,
                clientId: '28c23521-0f44-474b-83cf-e71bd5d9c6cf',
                dApplicationCodes: null,
                dPermissions: {"foo":81227,"bar":89387,"bike":17359,"a":73325,"b":"WmK&1doK5w","name":"0[T(Qabzaa","prop":80591},
                dTenants: {"foo":"I#zo]f#I&/","bar":"ak=Lkj/];?","bike":"$PS!G5([N.","a":"STjW3xIIz]","b":"**4CY2BAN!","name":15128,"prop":"'B&?gK}/?L"},
                data: {"foo":"OS0vyZ!Yi.","bar":3611,"bike":"sP]OYVf\\@a","a":"/6,)2k{O90","b":4940,"name":51431,"prop":69243},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDApplicationCodes must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDPermissions property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'ffc9ea8c-446e-4fdf-8d78-507ec513d89c',
                type: 'SERVICE',
                email: '6hlehfaw5ihzl357w8ejkau0nfczhfctdfam01axw144zsirxksvoyb3s37aybqiexhjmqdlqaqznci1sikjzsscxkk5ff7sa4cd0abdisd2b69l8hy2hvzz',
                isActive: false,
                clientId: 'c5d7df1c-49ab-4526-939c-bbd40162a163',
                dApplicationCodes: {"foo":15812,"bar":"AaV|p(Wueh","bike":"w/$wg\"bL{S","a":"e%QA?gbcf+","b":";w3I5qM(!\\","name":"$+AsNJr6i1","prop":75774},
                dPermissions: null,
                dTenants: {"foo":"[7sw`w\\/X-","bar":41336,"bike":47978,"a":98208,"b":40704,"name":"%\\iUsibH$h","prop":98094},
                data: {"foo":"c3c]gxu'S7","bar":21538,"bike":37248,"a":"XLv\"F\"7l]S","b":14951,"name":"b$,,;Zj7!V","prop":"$@EA^{q#95"},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDPermissions must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDTenants property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '11930b6e-588c-488f-8879-59d00d9ac061',
                type: 'SERVICE',
                email: 'fihphl4y1gyvpgy96luypobqviypgysuosukmra7r05yfyii7u9tpr1c5sn4mgoo4adtnplf39svo1g0vo6nbbsjm9cuqoqda92ow3l0d5qqn9jeaih6zhv1',
                isActive: false,
                clientId: '0ef7ef18-89a6-45a4-ae45-82524a6b1ef1',
                dApplicationCodes: {"foo":73414,"bar":59654,"bike":"h<6lPLDuqo","a":"clW*h|hKnA","b":15054,"name":"XsjK/D#-2A","prop":56894},
                dPermissions: {"foo":"\"H[^(>xh65","bar":"E\"{TkzC`6$","bike":1526,"a":"(@JyB\"\\Bxi","b":87977,"name":"*ojL/pnx0^","prop":"P1JkW2@{oY"},
                dTenants: null,
                data: {"foo":"O!j(WR`}2}","bar":81958,"bike":"gLIO-%M67C","a":55151,"b":"'LS6k:?GB6","name":"rn\"h5jWfXh","prop":"x3M=Y{!%IE"},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDTenants must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                type: 'USER',
                email: '7r5vouxisn8z85rzuvk8lm2jhkhax094nslpif1td4z32d50vhxtrzn8m89jr1pn916bk9wmxns9m2lt7en0d9w5yglndaf4bpiy4ypq8clv6k3l0aykkdn9',
                isActive: false,
                clientId: '8db91287-4eee-44c0-b6ed-3bc2c75b2fed',
                dApplicationCodes: {"foo":51430,"bar":68131,"bike":"!'#-:u\"^r|","a":34977,"b":55498,"name":"sK-'579_sb","prop":"YSF_CQ4DT8"},
                dPermissions: {"foo":91382,"bar":"[lcmGo/7gP","bike":"mV*{wj5s{7","a":"?[Ou${yD)A","b":88413,"name":82942,"prop":"/9z)Hidq.w"},
                dTenants: {"foo":12184,"bar":583,"bike":17809,"a":"Mi|Nwd:g=4","b":"-O89*&]m\\S","name":92686,"prop":"vC8-84pLvS"},
                data: {"foo":37982,"bar":"<MZIFykvw+","bike":49180,"a":41335,"b":"<6$k*\"%AYv","name":"t+pu6R0']}","prop":"24%v'{BU1j"},
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
                id: '895d4582-09df-429c-b86b-eefdd87a4a17',
                email: 'purajonmdxkpoej805an4fb7ly06mj07c782ikzjdf2xejvuu5w6ef9teyh4e20yb45td7vfldhgunfzaxdruag82k58n0bolp4vskxho1hzt3l8rpjy4nez',
                isActive: true,
                clientId: '0189ba67-c246-4918-8ac7-9c8b695f27ba',
                dApplicationCodes: {"foo":"b:hzQ%)Jgk","bar":81631,"bike":"k=Z;.:w/d^","a":"_WPbNh5`e-","b":"$vfKSyJ:u\"","name":353,"prop":"O#e4.lL-hu"},
                dPermissions: {"foo":59275,"bar":"t6T9nUEU7K","bike":"|iG\\!|UqqM","a":77979,"b":"Zv7.$kh]M\"","name":19425,"prop":"6a}Vb!yi'j"},
                dTenants: {"foo":"0T90%0U2W1","bar":99730,"bike":"M\"i:0z;9a%","a":":--X6Vjaze","b":"W7\"u6&fyRc","name":"-[<g$NUm,q","prop":"H4#8=?}Be8"},
                data: {"foo":55263,"bar":"(xq3v{kp]J","bike":"v,8v}[MwK*","a":">ep#k!(GEy","b":72568,"name":65265,"prop":15294},
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
                id: '7a66f6bb-4e43-46f3-87ee-820d2c2119bd',
                type: 'USER',
                isActive: false,
                clientId: '45bc8cdd-8056-4412-8f61-963cefc93de5',
                dApplicationCodes: {"foo":9141,"bar":96419,"bike":71977,"a":68645,"b":51459,"name":"vKK2TG5\"-$","prop":"i.eu6!K.O("},
                dPermissions: {"foo":59566,"bar":"-ZLnL}*E]`","bike":90370,"a":5773,"b":"y6qk8x{CBE","name":58781,"prop":"a}kqn|}Y1-"},
                dTenants: {"foo":77474,"bar":"YP^wgJ||B;","bike":"9D1i`FoWE=","a":"l|X64|BhT=","b":37965,"name":"ppIhs3Hg;>","prop":12588},
                data: {"foo":83365,"bar":82724,"bike":21875,"a":24959,"b":43309,"name":"p4AuSb\\kR8","prop":"CSz5;T67oD"},
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
                id: 'f9c8b175-0942-4855-8e53-b16fb0c0563e',
                type: 'USER',
                email: 'pmby3hkopj546rbeu0dgt6sp4lmozf6vktt3ftybvg1dhbf7tqctywt6rfjdlfnsc64mdoq683rtrrgwzmrntppugac48b3qc5l2oin4t6rgyig0rq26xtpg',
                clientId: 'ba93ad65-82fe-4aae-9503-49b1dbc8db76',
                dApplicationCodes: {"foo":38390,"bar":39348,"bike":71272,"a":85591,"b":4686,"name":11992,"prop":46957},
                dPermissions: {"foo":"X!E^gM<h?:","bar":"v/GEG=o]Ss","bike":24185,"a":92240,"b":48578,"name":39495,"prop":"+1II-J\")|_"},
                dTenants: {"foo":"@[T.XbHFa4","bar":27498,"bike":48223,"a":"|*LT[:siL0","b":"!/7\\N\\)YRF","name":"2K+3A<{YlA","prop":">Hr?E[fp[n"},
                data: {"foo":"MCyf.-]@B\"","bar":"{:wsy%7MZ?","bike":"hQkMVj\\m,T","a":"e>0qrT.jxy","b":"e3S95z\\3I|","name":49,"prop":"JCUF/:$h$B"},
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
                id: '9d6e0970-283d-4c42-a81c-32d72eb66e54',
                type: 'SERVICE',
                email: 'aqblvz009n0tmvon4v46s2lbkwz4lgk46lrc03cv8ozg78ajalj9yyp4h21euva7p24zz4muc32qa6dnuz02azcubw3wbyh51jod9xfubnvwgm0xhzniybkj',
                isActive: true,
                dApplicationCodes: {"foo":56063,"bar":"AMHI+hUR9)","bike":"$P3Tgq-G6m","a":27680,"b":"r*U)0BmCC]","name":37488,"prop":74238},
                dPermissions: {"foo":67720,"bar":"o&1bt?S0Q=","bike":";NX5.UUnH$","a":65539,"b":"]6WS<z[]k4","name":49111,"prop":"Vx\\5,|0VON"},
                dTenants: {"foo":"RV9naA]dMO","bar":98120,"bike":59217,"a":15197,"b":"R.#mx%{u,l","name":41829,"prop":"Z(J-E7sM`Z"},
                data: {"foo":988,"bar":11145,"bike":"V{&8o:}iq,","a":"Uz_d5GF2XI","b":35350,"name":40066,"prop":61853},
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
                id: 'f8c931c9-1ab3-4bb3-b20a-6eccceca04ae',
                type: 'USER',
                email: 'li5kjz9rwlbiu4suqx9de5kzbt1axwayoxezmy9q2i5aokmt0lk2brccbtwhjzh037b6wtx80hsm3p17782b1mlddha4lux5xbefmmusq41vh54utdzqwjxb',
                isActive: true,
                clientId: '9be476ba-eaa8-4e07-8d41-cdab4db9c37b',
                dPermissions: {"foo":98379,"bar":"l1<('q37P}","bike":96809,"a":50286,"b":26486,"name":"8(W\\;PRJfy","prop":"MQp'D]^=r6"},
                dTenants: {"foo":76517,"bar":26948,"bike":526,"a":"EU7xwJzq&s","b":"4TBE[;Ee'^","name":"T)V(KJ+b?'","prop":30682},
                data: {"foo":"U.(w$wWZjo","bar":47447,"bike":"xKA{:6-(S=","a":80637,"b":"NUZVXz9+)=","name":"ol8)3\"olr|","prop":4893},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDApplicationCodes must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDPermissions property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bf7e3eb8-4680-4e23-a074-33b8f43b2672',
                type: 'USER',
                email: 'aebmhrqsgun29lu0uqpvpaq1rmsb2tphbo9sf3xik0slglji3nlaa5q8im02wcxfitshd8669dfe2hzhm416oyxfhcomkiz2dcp0mize83uu7lpokv1w9fn5',
                isActive: false,
                clientId: 'b9979687-16c4-4922-916a-1db52862b1c2',
                dApplicationCodes: {"foo":22498,"bar":"m.DQ95p69{","bike":"ktw3/w\\#`,","a":">$$B&BT6aH","b":21488,"name":50774,"prop":"dUiQD&lA@5"},
                dTenants: {"foo":32010,"bar":3937,"bike":"S-u7$am`76","a":"d]P|MAp[An","b":"%{:c-X\\'J}","name":"yko#[$+-^A","prop":35511},
                data: {"foo":86402,"bar":"Noh=O}?c1%","bike":"a(2fm6jeGe","a":"[RN3MdgNbX","b":"L.$G3c?3U\"","name":"TD%SM1|J%e","prop":"sI4d?Nvy{["},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDPermissions must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountDTenants property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'bb16dbe0-216f-4249-a61c-9be9ece19762',
                type: 'SERVICE',
                email: 'zkv1wi317m5ct1byxqq7k52vri14y776oe5z9o638xwj6e3nf5ddzmr4l54ykiygo52g095luifrdrtpmtykfurocj8mk9nip3tvl2vb25z72tgvywt37017',
                isActive: false,
                clientId: '2f77c446-e032-48b9-94b8-66a98725d190',
                dApplicationCodes: {"foo":3539,"bar":12776,"bike":73413,"a":4582,"b":".3JW^&+b$u","name":30289,"prop":12026},
                dPermissions: {"foo":"frC_I&u/,[","bar":"o;T[Oon,)n","bike":85245,"a":95043,"b":"Q%TmleqPn2","name":"jaC-F*hB!1","prop":"U2s5)@GfOB"},
                data: {"foo":"Lba#[/NePx","bar":88033,"bike":6096,"a":"Vz.Szb,}T$","b":99033,"name":64067,"prop":49930},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountDTenants must be defined, can not be undefined');
            });
    });

    test(`/REST:POST iam/account - Got 400 Conflict, AccountId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4w4h78eujwgwvuvobyix205ug4418u9i61xj3',
                type: 'USER',
                email: '5i5hcud90ierd5z7srgg04h1o0jcjwj4x9qy0l2c1df7vcyf5ylka3ib49z8aht83l8mlwb3g9th1sxx88yksg7mjayh82ssyn36x6lnp3vo29wamxy3g2bn',
                isActive: false,
                clientId: '6781ddb6-4349-411a-988b-7a5872cb9c04',
                dApplicationCodes: {"foo":37949,"bar":2753,"bike":"n37RF=n@4X","a":24284,"b":13196,"name":93124,"prop":":hOsCVIf3)"},
                dPermissions: {"foo":"HB!@pC>B(x","bar":71467,"bike":"BjR[mDWe?^","a":77578,"b":"ga-2+ZGua<","name":16094,"prop":3480},
                dTenants: {"foo":"<!\\lt4{tpP","bar":"k(A:Yb<btb","bike":"P4j;{A?+<5","a":"R7#5QDiY)`","b":53999,"name":59003,"prop":"jcV/s;fmU+"},
                data: {"foo":3489,"bar":93127,"bike":"D?,SqcJ%]g","a":"BR.[24xA;e","b":"jw}HLtcI`k","name":47541,"prop":23714},
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
                id: '10e2ba3e-3fd5-4fbb-8bc3-75010958ace1',
                type: 'USER',
                email: 'w7k0gydstaf4w22ch2o30j86qubdkjx12kjdrd1t9alxcs0d386upymeh56xrt9jzn80tmd3q86ibeskdfidm8i9bwufvfrl0wdujycxjn9kqqxihsrlmeoc',
                isActive: true,
                clientId: 'umqkvucwh7atosy51cvaeoda0v18au4x3lvmv',
                dApplicationCodes: {"foo":"0j$86y\\!Ib","bar":10508,"bike":"^khNEU>!t=","a":17094,"b":36664,"name":"C]ns]MRWmr","prop":"nm9_y\\QYVd"},
                dPermissions: {"foo":56738,"bar":89869,"bike":99042,"a":39226,"b":30763,"name":"/av5=PA.jK","prop":64691},
                dTenants: {"foo":27515,"bar":53671,"bike":93950,"a":"w2++!TCK25","b":48635,"name":"KdsbFmY%uA","prop":21732},
                data: {"foo":"[Wu$:Of<<x","bar":253,"bike":"gukI2X|y?A","a":"NICN\\lv]U;","b":"`R%hGM.y9e","name":97634,"prop":"gfa;_*,R9#"},
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
                id: '8e1d796e-29e5-42bf-905d-65b6fac0e472',
                type: 'SERVICE',
                email: 'ydz7d1159idrvacle94mih2h8gww8ec78gnvol7selzywmycd165zg9lwjke1af2xllvfljcxy5sd77qsl3xjfx7l5ah28y5hej87q4ryh2296st3d8ztoao0',
                isActive: false,
                clientId: '658e335a-93cc-49f5-b7a0-47a06d4ed7c5',
                dApplicationCodes: {"foo":53962,"bar":"+]CRUUyi@(","bike":41572,"a":"qt^j?3PJhv","b":33201,"name":64375,"prop":"\\Z/IQ8:v$}"},
                dPermissions: {"foo":"4T:$na3iy=","bar":57367,"bike":8766,"a":"YA?D!rTLUa","b":45998,"name":72988,"prop":10260},
                dTenants: {"foo":46114,"bar":13980,"bike":"|1S:\\^{e}W","a":15999,"b":"qrV:-;O*fw","name":"]>Z9swKJMW","prop":65761},
                data: {"foo":12093,"bar":11438,"bike":53261,"a":96488,"b":41872,"name":"}8>caM3`23","prop":93513},
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
                id: 'f20ef7bb-ba8b-4147-97c5-4f3121ba5050',
                type: 'SERVICE',
                email: 'vldvh06xzflydh6qe9f39ckxw996qlmth3naqs6to2i5qi1a2j9hgtktodjf96n6dv4mhf4yvrhsbj4apomzpb9rt46hm3utyuydsmlevri9mwb2db65js72',
                isActive: 'true',
                clientId: 'fc6e1b07-c7f2-4f7d-bc3e-28dd8347993a',
                dApplicationCodes: {"foo":"3s$l<c@&9k","bar":"y{wgSq\\^Pg","bike":42579,"a":34572,"b":97226,"name":"w2yy?W]KaG","prop":83627},
                dPermissions: {"foo":61200,"bar":42543,"bike":"+fk_qmq.Lo","a":20549,"b":52054,"name":"b_0A.YRqc.","prop":13621},
                dTenants: {"foo":81713,"bar":29286,"bike":"$>8Rn_A:W'","a":5459,"b":81585,"name":6777,"prop":")u4Kh#:0}V"},
                data: {"foo":"Rr7=Zw$eu;","bar":"`HehbPC4zv","bike":98401,"a":65554,"b":75769,"name":83873,"prop":"jG1\\L[+4@d"},
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
                id: '1a61492f-2301-4e19-aea9-247fbddaeaa1',
                type: 'XXXX',
                email: 'ohjxykuj2uws8udk1ee195f6x2l3wgufiherw1vazhy2qcsw3jb6y2szsywi8v4jd53jvja0flkr3vn7yiyc57d8u62kf82889dl4jwjjhf3fv8gblfneace',
                isActive: false,
                clientId: '7247bd0d-e998-4cac-9c78-e4064f7373e5',
                dApplicationCodes: {"foo":77457,"bar":15059,"bike":"|4+YjP0PLW","a":72063,"b":"'7UqN(o1F6","name":"diVkAt1+i9","prop":91319},
                dPermissions: {"foo":20882,"bar":"4F$6P-n%UR","bike":"n*pWz8c:K@","a":81293,"b":"e:y*H3o(a0","name":76868,"prop":"\\`D9q0B'^G"},
                dTenants: {"foo":"`v6)]?/<{y","bar":47529,"bike":"D+3#d$Tp8\\","a":45568,"b":":yIXw<7pu_","name":"DYTuf063AH","prop":82026},
                data: {"foo":"'krQ;f^P%1","bar":15928,"bike":"$<a8Z_Bmv6","a":1538,"b":54076,"name":35854,"prop":"^YOB^TO}>^"},
                roleIds: [],
                tenantIds: [],
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccountType has to be any of this options: USER, SERVICE');
            });
    });

    test(`/REST:POST iam/account - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(seeder.collectionResponse[0])
            .expect(409);
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
                total   : seeder.collectionResponse.length,
                count   : seeder.collectionResponse.length,
                rows    : seeder.collectionResponse.slice(0, 5)
            });
    });

    test(`/REST:GET iam/accounts`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/accounts')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(seeder.collectionResponse);
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
                        id: '520ab36a-7c79-45c1-aef9-d7801fa3bb60'
                    }
                }
            })
            .expect(404);
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
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:GET iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/iam/account/c5da2337-d3d9-4b9b-a964-e61f6bbc2988')
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
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:PUT iam/account - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/iam/account')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '23fc2902-ddc3-4a2e-9894-029b3450f1ef',
                type: 'USER',
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
            .then(res => {
                expect(res.body).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
            });
    });

    test(`/REST:DELETE iam/account/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/account/c4c88125-7c3b-4af7-913b-95ca4eb3a867')
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
                    payload: _.omit(seeder.collectionResponse[0], ['createdAt','updatedAt','deletedAt'])
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('already exist in database');
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
                expect(res.body.data.iamPaginateAccounts.total).toBe(seeder.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.count).toBe(seeder.collectionResponse.length);
                expect(res.body.data.iamPaginateAccounts.rows).toStrictEqual(seeder.collectionResponse.slice(0, 5));
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
                    expect(seeder.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
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
                expect(res.body.data.iamCreateAccount).toHaveProperty('id', '28fe4bec-6e5a-475d-b118-1567f2fd5d25');
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
                            id: '7820c726-f586-435c-afe8-17e4fd11a162'
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
                    id: 'e07fa0f6-a7f0-44cf-9fcd-873594426915'
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
                        type: 'USER',
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
                    id: 'ec08dae1-4d75-4ebe-b869-cbdc5ef65ba7'
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