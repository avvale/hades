import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAccessTokenRepository } from '@hades/o-auth/access-token/domain/access-token.repository';
import { MockAccessTokenRepository } from '@hades/o-auth/access-token/infrastructure/mock/mock-access-token.repository';
import { AuthorizationGuard } from '../../../src/apps/shared/modules/auth/guards/authorization.guard';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { OAuthModule } from './../../../src/apps/o-auth/o-auth.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// has OAuth
import { JwtModule } from '@nestjs/jwt';
import { IAccountRepository } from '@hades/iam/account/domain/account.repository';
import { MockAccountRepository } from '@hades/iam/account/infrastructure/mock/mock-account.repository';
import { TestingJwtService } from './../../../src/apps/o-auth/credential/services/testing-jwt.service';
import * as fs from 'fs';

const importForeignModules = [];

describe('access-token', () =>
{
    let app: INestApplication;
    let repository: MockAccessTokenRepository;
    let testJwt: string;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
                imports: [
                    ...importForeignModules,
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
            .overrideProvider(IAccountRepository)
            .useClass(MockAccountRepository)
            .overrideGuard(AuthorizationGuard)
            .useValue({ canActivate: () => true })
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAccessTokenRepository>module.get<IAccessTokenRepository>(IAccessTokenRepository);
        testJwt     =  module.get(TestingJwtService).getJwt();

        await app.init();
    });

    test(`/REST:POST o-auth/access-token - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: null,
                clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: 'Possimus ipsam quaerat ex tempora adipisci eveniet. Nulla consequatur molestias. Dolorem repellat distinctio veniam culpa commodi. Eos ut ad voluptatum sapiente et et.',
                name: 'gmuvt5fi1pshmdyo3gg047xq53fgn2q36a45dgembfly22ul12ru7k5v8uoqe108p4uvwko15atfc9pxq94w4fqx1r0hgi7qh6rgd0mu5bbm1gz7rr8j0obxy4n63i64yvaj4w7nribmviketytwy7x4nr0jipxzb7xvgxaulqvw2uq5uir1bpp5n7lzusman0p5nnv23q86itmhdbk42jk0aocjuecynzt0343on6jrjd1lqzx76b3m2yg98dm',
                isRevoked: false,
                expiresAt: '2021-04-26 10:34:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                clientId: null,
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: 'Illum ut amet sit cumque sit. Minus maxime aspernatur provident et eius tempora eum. Rerum sunt dignissimos sunt.',
                name: 'n1qo2uvudwdq59ysp9bt4ju1b79uif0lpo5xsewxtmvn8e76kogng804hjm2c2snevu8gzxry4ltbi3ecioi80v3zw34de6r71qrl5njzftlf8vtihrmiquonsy09f9ddod1irt8n62w1usi29y6o9yat23vcaeux57kwro76ryci2h9xd3msvf08j7nn6vjpl2b9wwc16y2rt95luox3q1t27q0s9g4cv3vj8sgbxeuoxw27eriazv2ysj3j1j',
                isRevoked: true,
                expiresAt: '2021-04-26 15:28:55',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: null,
                name: 'sz7ksflx7nuxjrhkbasslusslyipdu1u69txmbrwx1ra9d944626hcrl66ag7t07ic6fey3dz2yu57unbb74hdcz6sibi23hdutsgfafij0zby4f3nstit1unpfhhh0ox1l42exnikwyj8hr370nvkj7pzivm9cukgsn30znq41xry154ipiqfsb1k6lxycj0okt8gat1m5thsb8ux8u4ochn7mxr4iqbe6rw2yvq65dxlxg6sobxx34gl24m2i',
                isRevoked: false,
                expiresAt: '2021-04-26 17:05:08',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be null`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: 'Sit iste sint dolor cum. Quidem magnam perspiciatis nesciunt ex. Natus harum illum. Earum distinctio accusamus similique dolorem ad dolore voluptatem.',
                name: 'n0q6xab1c6o15i7ntznxhrh2c0eww5cwxuq27v127fxe80dvj8rfg8qrij60ohz1hxulvqk38hjm9z45q0bgkrs5al3lkqxmqhwxvrhfywsa0z6usfprlatfrlrt1yh6wf5q8uauy4fnt684vlv6rpkmn6n5ib6d9p53reo02eq9zwijspjre8ns5h1j6rgqzls8r6pg0cg9gmznha5mcgatfqs6xtgl476bltl1oakwl39c10x0vuoq1jtnqlt',
                isRevoked: null,
                expiresAt: '2021-04-25 22:36:07',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be null');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: 'Voluptatibus voluptas et odit est. Ad maxime nisi. Nisi nesciunt adipisci quia. Id aliquam quis minus dolorem. Perferendis et modi ut quia inventore.',
                name: 'ysblqou0ocbw1sx9cnu7a6pnd0p8u6osah9qbbxwnsbypkzalt8sgfuqzq7hun4mgsh289gha2h2l4dwuya467v49v1pld7s789kx24xu4574on197oz3f4dx901q98k85wfx6w8xalwmk78iptvhidc34r5h2s7yzhoush4ml1xk72dizo5hffkqpnd9qqlzebtho4bgcsqkbw5je111se8u9qire2mwmwy07l3d9f38w49ktx1hz26i5lpfqx',
                isRevoked: true,
                expiresAt: '2021-04-25 22:34:02',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: 'Mollitia veritatis et voluptatem. Ipsa consequatur cum repellendus dolore placeat sequi. Magni voluptas cupiditate qui dolorum in.',
                name: '4347udge100nym2q72ljwyizl4m10pjrh8k73uapg81xmxwomjwqgxixivccigrz26kqep673xw042bpgabcbqr7btrgi1dqt8rurvazlhzrs984zn9atdqtuap2xksz8n7420rr37ly06as3bau0wxdtszcoizkthlxz1yqesgo4zlkorvbkn3sm9e1lynnaa8kcneo6s2c5m1h4wi2d5z96247p8e43nt90hfck7msvwkguecq342tl4x4iew',
                isRevoked: true,
                expiresAt: '2021-04-26 06:55:53',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenToken property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                name: 'we6qcoolqvuj4ued33c4du0c1fxcjy11yv4q2tyqna9ev531zm5lex8hf349rb757dv8epyemvhs3cwdvsxjf6u5docscpbvz1j3pvuj0dqsm8c9kxtgbss0rovn8bsjiuj1sgvlwzver5fz5x5tzlqe043xfscw7hdqx01xxvbqzpp03vfdm1xq3ws1034p43civ0dwxzyb9ws934dg0cfuvj5f9n1ye4nqnc0kngdk5o8ca2kmzuvyn4u0ikp',
                isRevoked: true,
                expiresAt: '2021-04-26 06:18:05',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenToken must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked property can not to be undefined`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: 'Qui ex et omnis voluptatem blanditiis quia rerum. Ullam et laborum voluptatem rerum molestiae dolores in at et. Vel omnis qui occaecati veniam veniam voluptas asperiores.',
                name: 'fldrea8zekp28vi4y5o2p8o9fr65fboss33chzjee6kwcf6t57j80jex9bbsk2zup1x1db010xsczzan5dnxe3h5dx3axsjw6vlrszd12yxeqwqunvs6eng6nwl89ugzmx2avybf7lxk48v9ho314e88f3w8rx0392c2acu836k385jx9lq1lcq5rqyw7kwqwst18xe4vnd2304mmwhcxjcrp9nuxiefwxcxghzoamp9okbz8cm7wf48d6bemhc',
                expiresAt: '2021-04-26 08:32:44',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked must be defined, can not be undefined');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: '4ubhrvlk2d3szd2uxzpmcdkd71x67rhtnqy57',
                clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: 'Eos laborum minima molestiae saepe quia. Molestias qui assumenda iste dolores. Sint atque qui adipisci. Atque harum ut quia ut recusandae dolore optio. Accusamus ipsa quia et veniam unde iste. Debitis nihil fugiat voluptates ex vel sit perferendis.',
                name: 'u5qsj0adi45lbfne1s8unc3x3c9y98xrnmohwco6l5lpdin5ofdczzb5x8sr1lhicfxv6zaqqu5t4swx4uo7hem3d13ind8nhsjqmy4389abhgsckrx8lon8qow6631c3vhh153cbmon2vmp22bva1skii3cza3m8rhlk4q5uc6lyi4bsnr38ortg15yq51dmtavfxyqs3dvzl31zbnneaaknx3m4y4gq550175bxtfpyk15vb64hllqwjhz0pm',
                isRevoked: false,
                expiresAt: '2021-04-26 01:02:47',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenClientId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                clientId: 'ic2pxyv26kbzloqorvlgrb3gffclo1hz8sra8',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: 'Nisi molestiae enim asperiores sit hic. Temporibus et voluptatem sunt inventore nobis facilis temporibus. Dolor voluptatum natus tenetur inventore. Nemo voluptatem id odit et enim quod amet porro distinctio. Magnam itaque a rerum itaque et tempora aut fugit.',
                name: '5ye2t0reampl41ya8of1yz97mmcoyujka31f6tlkz6x4b1c8c3dncwnaevfa5d34bds7d6hl8j346rm2tbj8obk56d0jp1vjptmvhjukmqyghfbyk8c3uf223xdnbukj2zjkl1ptzci1erli7fv39sllh3c8x5qbd11su22gephnze3ytsjw9hcvbdis3cigx3blsfjbej74syx74a0f34xjhrb8t7he2rh251dhx2lp07zy5fh7pnjg6jn5s6i',
                isRevoked: true,
                expiresAt: '2021-04-25 23:52:20',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenClientId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenAccountId is not allowed, must be a length of 36`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                accountId: 'ckkzz2txo01robrp86x04xv2j2cfp0rzb1ote',
                token: 'Non minus velit earum totam sed beatae quisquam sequi cumque. In eos quod quam est sit. Eum qui debitis sit deserunt at. Delectus aut autem et similique voluptas. Et non itaque in fuga voluptatem et inventore.',
                name: 'b8c6vm1omc0j9xdj687zxeq6q4alseuynt03qgip5kpn7aiychess4atdnkqdt76q5dm392g04t2rgwkpa13ptkfdhjr9go3o5ufp3yqzx4u55dgn7pcj5u6sa88gvryf7zpfnvn57baso4je4tfy8r8xk4xubyivkuvjlemhyjbqb2xbmy4pcfj5c06vz6s688fsgm16fmwrdg76gjn20z1njqcqccesmzjhs3ov642u9hoa5l9ta1774l047m',
                isRevoked: true,
                expiresAt: '2021-04-25 22:38:49',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenAccountId is not allowed, must be a length of 36');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenName is too large, has a maximum length of 255`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: 'Vitae nam fuga debitis tempora. Consequatur ullam id a voluptatem dignissimos molestiae. Quas a eos tenetur. Non doloribus voluptatem laboriosam sed voluptatem. Molestiae quo fugit.',
                name: '5mwlb0f57u9hilm9xgimfy85jorfidl38310siycgoy91qzvfi18zfi99hjl6d6tkxxoffhyyf3k5w9lc8y8tujh9h7453uyrmrm9om9us9v7kanlwc57lf91b8xmeslmru346herjq80eei0jjwg9na0q3cnza1fvatil6knao13osi6g5rkfg3gf7qcnoko4fgob3oimnv73cq17mxkx4dn1riji99wnimte2xs9x7ltwmeh1ez43rnoh5uwjc',
                isRevoked: false,
                expiresAt: '2021-04-26 12:17:31',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenName is too large, has a maximum length of 255');
            });
    });

    test(`/REST:POST o-auth/access-token - Got 400 Conflict, AccessTokenIsRevoked has to be a boolean value`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: 'Saepe voluptate qui enim vel sed voluptatem. Ut doloribus maiores culpa hic nesciunt. Et eligendi asperiores vel dolores ut rerum dolor.',
                name: '7uayz8beuztd547okehuo8s2r4l4traim9qwgqfqr2gx33djaanypsra7kdf594dx8idkuzyof7uoeowdluve7d549a9wifedrhg2n6r3nat08w6yvmnsy1x8h7iea3hi346vl2tnpy4squ6pds8wy7je3axgec92mqceakz79xapaj0o7xga2tng6bj0gkzqgzqperoypr0r9awu4xtt4liqqykxi3324myxgzivn9aq0rc9lq7kzwwi3ipfrj',
                isRevoked: 'true',
                expiresAt: '2021-04-25 19:53:03',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AccessTokenIsRevoked has to be a boolean value');
            });
    });
    test(`/REST:POST / - Got 400 Conflict, ExpiresAt has to be a timestamp value`, () =>
    {
        return request(app.getHttpServer())
            .post('//')
            .set('Accept', 'application/json')
            .send({
                id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: 'Doloribus quia est voluptatum. Ab error non enim molestias at. Ut distinctio voluptatibus repellendus perferendis nihil similique laborum. Est voluptatem et occaecati id magni dolores. Odit omnis aut ut placeat. Impedit architecto reprehenderit.',
                name: 'iqph95zns8gxp4p5rkirwpxtny3lyovyyfhq232wtplgdcqar4lho2r31ope0a6s0tptagvfb2263mugu7za5ch973z8gk2qr0cpelelmz825ic4onlfv8ldc6s6cvcutxjugoo4ectf1bkxstrme2z5smanwjtmyiqbqtvemiu3dgbbmez8y6jqief19hamuuu1jn8n8q0yg6lw2kg0aglfufsn0xna4rjqu20zxem4p82qveqanhnsden00v3',
                isRevoked: false,
                expiresAt: 'XXXXXXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for ExpiresAt has to be a timestamp value');
            });
    });

    test(`/REST:POST o-auth/access-token`, () =>
    {
        return request(app.getHttpServer())
            .post('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: 'Officiis voluptatum commodi corrupti et distinctio et. Voluptate voluptate facilis distinctio magnam et et maxime rerum. Quis voluptas nemo iste qui neque et. Ut animi quo.',
                name: '3de5hww9p0ge02ig4fol0hn60h8wc3jnaew5sy19qjtrta11323ac62b7z9bvo8sogx8pfml6sti5efso3evy27ltja5yy62m6xjsvjitbkwrlx0q2djim2b1z52wpljtln3072jeqg7f4s3bk4ngj8t9ktzbdib20dyzwkdd5shylx2de1kw6v8p2pxysk65f2p0kndbqnkrya9y1st7v4r5zky7cbgrfpklzxrr3hy725mu7w43rw2103t3m1',
                isRevoked: true,
                expiresAt: '2021-04-26 02:36:01',
            })
            .expect(201);
    });

    test(`/REST:GET o-auth/access-tokens/paginate`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens/paginate')
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

    test(`/REST:GET o-auth/access-token - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: '83d1ebe9-dacc-4b80-9990-3bbc522603e9'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query:
                {
                    where:
                    {
                        id: 'a8db110d-0566-4de7-a241-2b358a3f168a'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'a8db110d-0566-4de7-a241-2b358a3f168a'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/3f8d0f41-e117-4057-9e1e-a7984fb34064')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/a8db110d-0566-4de7-a241-2b358a3f168a')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a8db110d-0566-4de7-a241-2b358a3f168a'));
    });

    test(`/REST:GET o-auth/access-tokens`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-tokens')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT o-auth/access-token - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'f9c45396-fad5-47c4-87e7-5b94c8f0260c',
                clientId: '057c5d9e-061f-401b-9d72-3a85c37ff4aa',
                accountId: '7e70140c-278b-4fea-ad10-535b8f33ac90',
                token: 'Corrupti laudantium sapiente eum dolorem sequi. Adipisci quo itaque quisquam est voluptate. Magnam quae id expedita quia et.',
                name: 'dzwlg94p7h3rhwmszrlk5h70nh9cym9kqsg7lzfe2gtlc3rmgyk87w7b8vxzk1mb9kp4akiyi8mkm0zn3l8thhus2kbvx7uy45hvsam09zn5cib7renhssycwoh107d9mugc42mv6mttyoa73i7rfj8qix8enaopfid759c6j4c36susrucit4d8emc98mt49d0h33yu8lmn07lgu1lltsga6trl41ekx7g0fywq3lu793nz15adaahquf88wf1',
                isRevoked: true,
                expiresAt: '2021-04-26 03:48:05',
            })
            .expect(404);
    });

    test(`/REST:PUT o-auth/access-token`, () =>
    {
        return request(app.getHttpServer())
            .put('/o-auth/access-token')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                token: 'Porro autem et accusamus error. Rerum placeat reprehenderit repudiandae. Porro nostrum sunt ut. Eveniet voluptas ut corrupti ut aut. Aut voluptas quis eaque ad officia cum doloremque nihil. Quis eum est odio id ipsum et fuga ratione harum.',
                name: '4jg508aevufetwxm90wzq4efzec7q04rfzeon3frq98ov8jv2c01lqiq1jgoa2m5cn2eid8khofjz31m7q73r02liwcgy242k1meh3oggsjbxqhfc25oj7demztwxcvigezr9axr0e13xnso2dgk8en8j63zsrntqc0998iku7uj8nfzgfn9tfggkavnof1j8vjlto649ynz92kg956lxeyxvu8md61y3n9boxe7dglkko23qti5d8o8qdqkj5h',
                isRevoked: true,
                expiresAt: '2021-04-25 22:51:46',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'a8db110d-0566-4de7-a241-2b358a3f168a'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/ab572c81-3df8-4aad-bd3e-3daf4349e50a')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/a8db110d-0566-4de7-a241-2b358a3f168a')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200);
    });

    test(`/GraphQL oAuthCreateAccessToken - Got 409 Conflict, item already exist in database`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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

    test(`/GraphQL oAuthCreateAccessToken`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthCreateAccessTokenInput!)
                    {
                        oAuthCreateAccessToken (payload:$payload)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'd30a98e5-1698-4e54-bbba-0c8dbf92134f',
                        accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                        token: 'Natus adipisci nesciunt qui natus. Quo molestias atque autem et ipsam omnis. Ut quia suscipit harum eum possimus ut. Magnam voluptas eius est nulla omnis. Ut velit et nihil.',
                        name: 'fp20ruafx3gnbw3lw3czd5mpf3ru7j3vu5tumtbd6r35i1x6facne93nllidp3s5zu1knebqyh7b0oomspaj3kvbnn4p45d3gdwasnfndqfw96t41v7wh4xirkf4z0btq9fvcugdldp09zyxbwjz5u7rvtoypdjbp4kwoi4c21jpwll7elc14hg22p312dx65i4ioh7pziyqw0z5sngbq3cnu2nl96jxw2btvs1y9gna2hrqfgxxvjw05iyfaq5',
                        isRevoked: true,
                        expiresAt: '2021-04-26 01:44:33',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', 'd30a98e5-1698-4e54-bbba-0c8dbf92134f');
            });
    });

    test(`/GraphQL oAuthPaginateAccessTokens`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        oAuthPaginateAccessTokens (query:$query constraint:$constraint)
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
                expect(res.body.data.oAuthPaginateAccessTokens.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.oAuthPaginateAccessTokens.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL oAuthFindAccessToken - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                            id: '5923fd0b-dab7-486f-b995-5aaa7f125b6a'
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

    test(`/GraphQL oAuthFindAccessToken`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthFindAccessToken (query:$query)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
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
                            id: 'a8db110d-0566-4de7-a241-2b358a3f168a'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('a8db110d-0566-4de7-a241-2b358a3f168a');
            });
    });

    test(`/GraphQL oAuthFindAccessTokenById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '532d80fb-983a-45af-93f5-42eb8d5cc85d'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthFindAccessTokenById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($id:ID!)
                    {
                        oAuthFindAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a8db110d-0566-4de7-a241-2b358a3f168a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('a8db110d-0566-4de7-a241-2b358a3f168a');
            });
    });

    test(`/GraphQL oAuthGetAccessTokens`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        oAuthGetAccessTokens (query:$query)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.oAuthGetAccessTokens.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL oAuthUpdateAccessToken - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '20be48cf-a9f0-47c3-be07-fe3f8d609765',
                        clientId: '72c95333-6b96-4d4b-a355-0a70c0d997a8',
                        accountId: '4490381d-56e5-45d7-92e6-46c80d15883c',
                        token: 'Ducimus aut laborum. Qui et libero voluptatem est. Quia dolores dolorum occaecati qui omnis sequi. Saepe voluptatem vitae maxime sapiente deleniti quia. Iusto quae aperiam sit et enim fuga quaerat impedit. Reiciendis est illum minus velit et.',
                        name: 'lki9wuhijc11nnba5mlqaw084l9ix6ey694evm0hdg3nnl9aqbqpgwyff4dy58xts3i8xayn0wggcxindwpshqq3d1erkutm7x81zw8wa8nb50dhp8r4azadtcaxm5po4epqc80llh7hoffr55yg40amrqf7rd86660jio294ogbfxchc6rdbv0lo01km0lrzbs4cxszftqp5lfvh6ncsl0zrtszz2fppqubiez5db9nlpcku04py8lhj8auz0a',
                        isRevoked: false,
                        expiresAt: '2021-04-26 07:58:59',
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

    test(`/GraphQL oAuthUpdateAccessToken`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($payload:OAuthUpdateAccessTokenInput!)
                    {
                        oAuthUpdateAccessToken (payload:$payload)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: 'a8db110d-0566-4de7-a241-2b358a3f168a',
                        clientId: 'bf459835-5582-4dbd-9631-89e06f2ec49a',
                        accountId: '92b2c200-59df-4241-8862-18c1bd73727e',
                        token: 'Laudantium aspernatur optio sunt quasi vel facilis. Aut exercitationem magnam. Sit qui ipsa eum culpa error consequatur id ut suscipit. Aut fuga corrupti voluptatum libero asperiores dolores. Aut et tenetur et corrupti rerum aperiam sit eveniet hic.',
                        name: 'veyvsru4xw7g57ns462ji4tr2ndginv898taap0c28et7v7xy8xybjnk7qt77hbvnbitpkow2qfid6esh9mbu22tzwxkk50fs9dkcqcu1v4f5o0re4oqueee0ngv7zbkwuzrl4m27036l8mgwd8da01lysa3ns5lpvt6har2bhs4waoayabpjn8rqo0bqfykljvv1ksnnl7rcxoczy39x4ibz7mszhde91tlwjdnac7sgh57e40hhbbm6syy4y9',
                        isRevoked: false,
                        expiresAt: '2021-04-26 02:47:37',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('a8db110d-0566-4de7-a241-2b358a3f168a');
            });
    });

    test(`/GraphQL oAuthDeleteAccessTokenById - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '04f2d7e1-5f3f-4588-9976-6e8a3bb954f0'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL oAuthDeleteAccessTokenById`, () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        oAuthDeleteAccessTokenById (id:$id)
                        {
                            id
                            accountId
                            token
                            name
                            isRevoked
                            expiresAt
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'a8db110d-0566-4de7-a241-2b358a3f168a'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('a8db110d-0566-4de7-a241-2b358a3f168a');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});