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
                clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: 'Ea consequatur et velit nesciunt. Et quia molestiae est dolorem. Cum eius magnam aut consequatur iste ea et aliquam ipsum. In consequuntur aut sit nihil tempora distinctio qui. Beatae voluptatem quidem repudiandae eveniet accusantium porro atque.',
                name: '5v6we4y49zi2f7g76wzccsc0jpb96423w9bvpfhxeufykgenubg3fos8q7d3lmpoplfd08s8o9gr83fkh0cbxxxhyk7j2njr5zsgko7teldhvf5m8aekmf4coxkox9iuankb528ai2wpii5it9ixqoza5dqz4dof18scbtbvxoemkwbm2uvive36izk0ir1cf0dyj49tgzyxbzrhz6mex4l3n7h1bqq5c5z2k8t2wjmus675h5wuixhvhr0yw5j',
                isRevoked: true,
                expiresAt: '2021-04-26 22:03:52',
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
                id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                clientId: null,
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: 'Repellat vero asperiores suscipit ut. Laborum odit nostrum et vel neque nam. Nam maiores saepe ipsa. Deserunt sequi quia aut eum consequatur sequi.',
                name: 'szsvtgh1p92285zx119b8yqcfknlzds6bcn5oikbpzhcej0re4r2wgpjujqb7gpol6jgt8eg4lqhhiim0s31zbq6napmigb5xoae04f1hs1umieq3nh7p5jc4wyin2o0mp6yjh9t7yqzsc2h0ti1z8fs520figmh9irnelbsu02k7dm8ra3jyvo3zm9kxy8pkycvii74c7xxuslos3mmkn9ff5zri2l40oliko7xhkw0iz8lwsvumimqaxzq2jx',
                isRevoked: true,
                expiresAt: '2021-04-26 06:57:02',
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
                id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: null,
                name: 'xvhmvm0e0575bsm3xds0smyszjly2swj9was2t3ezua5fvolau0fa9u4rburzyigfb4w3swyptsq5rn4t19fy5gx99roihomxedn6scty48ifjrn1funso3k3oz08zfx6kuxci9u0duq00xkck03nbqf2bqa8hfa2c256hiqr2u2qpstvdd3cd5nc6zvu8x6zxkkocqktez5eocq7bx2qnbnwuknut7an2qhxbwd4o7swmwywma4oyxo0ykhx16',
                isRevoked: true,
                expiresAt: '2021-04-26 07:35:22',
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
                id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: 'Velit vitae non nesciunt ut possimus beatae in fugit. Quis illo dolore quae id quos tenetur occaecati vero voluptas. Omnis molestias vel omnis odio eos sint nostrum voluptate nam. Quia distinctio nulla. Fuga animi rem ut fugit. Dolore ut cupiditate praesentium.',
                name: '3wnhnyhveppj72n70k39rjobmh931iwj98xk5y4jywribkuys2g02ct14zh1kbf0xf1jfumfl06om024vv7wu7x1zprvjqqjdj8p1ajjcedwek83cz73d0of3yl7mka0vicman2hhylyjzqz7es9li0dku8w438323bpnvqau7iwzmgog73gfon8x3c96jwq4z5pnly65wl4pxywro70t60qxpr6kagqs5svzjmaaufzi4xa84xfmko0nyxxqep',
                isRevoked: null,
                expiresAt: '2021-04-26 13:43:53',
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
                clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: 'Voluptates laboriosam vel sed quis eaque praesentium consectetur. Quae consequatur est. In culpa cumque repellat vel pariatur in vitae reiciendis.',
                name: 'coow0j329nk73o6brqe6k6ydupcr0zfvd2mk3jjrsd5x22li4sbl8yl9op5q8m6ocwisy9cfi0xnjhhniiu7m3gjhp1aca76b3jde79sh6fphjrozyhs7and35az707r9e1284p079ylmm960yjyyq1m1d7045r3mq1imtgfwz44d40sx7o2dhcxgawika5ae3g94xl9qom8qyxqsblolw7pyf8baavyx3nwuhv83cuu75xxivzyv1iv9p0tsjl',
                isRevoked: true,
                expiresAt: '2021-04-26 09:02:39',
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
                id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: 'Nihil ut voluptas excepturi officia aut laudantium quibusdam provident suscipit. Eveniet voluptate recusandae. Officia soluta incidunt dolorum nihil eaque esse. Quibusdam voluptatem deserunt quo explicabo aliquid rerum praesentium autem aliquid. Voluptatem aliquid rerum.',
                name: 'r4f8xwezkuhwaihvh5fbxm3eoi191y1tznr7sw73bug4a00gvynn3qfeq1qow63bcw8vhs4bngdyo91hjjz9n400xzvbm73v3i8dv3v3ts36uolw02ufdwcjjlz3pfvepo0mchlb7vd07zwm099e16auvwwerjc2zn0z52ycelu0lt1f6zu02ke70fnaf71gaqbkaaq7pdo99ylrfe4zpfmp9uhokqnhnqob5vl4xnxngr0fcio7vdu3zsagug3',
                isRevoked: true,
                expiresAt: '2021-04-26 11:49:04',
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
                id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                name: 'rpmgbz3p0ilgt2m89jj40k0tvx12ocek3qf94nj8or427gghwd1995j1y6golilohqufyxdl32xjuhp3n1pnmn44kxksovhwr8pcatyjdici5newspux4266uxiu3pzhmpykf6j0e7np0lk92fmee6pkq48xl4afctp8njobf7192e50any2se9f7xozl95su30v8cg4vyhimawtv86d6rq4jldi54asut78w2ar7xe6lqeoi6zwd8mugr56b6h',
                isRevoked: false,
                expiresAt: '2021-04-26 04:01:38',
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
                id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: 'Nam voluptatem in delectus delectus nisi impedit qui. Beatae voluptatem placeat voluptates quos quia. Beatae et libero corporis non. Dolor ut ullam possimus quod quibusdam eos reprehenderit molestiae.',
                name: 'ck1t1gqrr10rcad6om5jemr5g9zra2t4la1r2uwyszg1put2efth6ghehmo10qqecg2fvzl837z7z17xp1kuwhyb26ucwlwdg72sgg9b5egyogj3dtxqk8vl9xukxq00f3srqrvfzkwlfv80z9t12h9p5vpia964sak9gg3d7ts04vtheanmef3r1sx9ff83g1voghyqvknc2zq9271cy69nnha8q02up6j28gtb13oxsxv2e87ypsvolk4ger3',
                expiresAt: '2021-04-26 09:53:38',
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
                id: 'sulzd43y6enw0yvsm68nh3ccnjwkxkwtxqum5',
                clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: 'Quod id occaecati ipsum ratione. Iste corporis beatae porro enim. Quia ut facere. Temporibus vel eum voluptatem magnam repellat ipsum. Assumenda ut a unde. Occaecati consequuntur nam beatae perferendis autem.',
                name: '8nt7q0qvepptld0ox7z61gyjlxsopzrpaciaxvhh7t4eobafi9knw76hvhhneabtiggycogh2b6j2try2vhrynvgq02pbqlz59wsweg60ly358pniresbod2g47xeplg6162qsyb3b6imno7yrv2wz0ze2fpf2k4iqbz9fhmx21hlqkf4kbzom9xufjqdilgs4c8v7zx1rzc1ktooyxxitp04e0u6ydksqft24mr20ue4z72vlt2zmibmsgbpi9',
                isRevoked: false,
                expiresAt: '2021-04-26 11:51:45',
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
                id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                clientId: '7f8fpqc5y3kayie73s7waffr9o06hqxa8gat8',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: 'Molestiae quasi delectus quia voluptatem odit. Vel nobis atque cumque. Ea quo itaque.',
                name: 'm3268xvxixk1ruxk8grrzd96wcrwofbk47ri6n9l8mki2z0tgez7c67k4c1jpw50wckajw40wtdtnscp4cnk92f1874xzz1pvio5hliizzbhm79sqqgnry3apa2z7mp8ae9k9r8ksu4c3kqdrbig5xxe0pwxttt89mxbrc9cagvzvgyyoztrxypfo3c7dyzsq3y23nrccaxbzy3slp0r06i409yo4rkwmhw2h363goxuyg2s72jv5yzrty2j66m',
                isRevoked: true,
                expiresAt: '2021-04-26 17:42:07',
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
                id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                accountId: '58p6tjnus7aklfiij5nksctil8wnovh9bx04h',
                token: 'Quia autem beatae enim fugiat velit et voluptas et. Amet ut facilis provident recusandae ab omnis. Est enim ipsam placeat repellendus iste. Ut autem velit minima ipsa. Et quisquam quo qui illo nesciunt. Odit ut ut rerum.',
                name: '9tts0v6ldziskdyogcp1diuvm2zk0v59vo7x2q2yg1q4ryyizic2gvfyc2p9vc1hm5kq2apqsc5sh4t9agy03yiro1cvsj39n172uqurkwn0pziql9ezfa5x6t0fd2vjpin4ltiek1zly4p06dd7y42jup4u2j9y5yxin2fnzgmxyqep968nur0g7nobtpey6v3na6r68bp2nhiol6xnh6u8kj2mknqi475kwccg8ys0vx1ycscdx95c3zkl1fu',
                isRevoked: false,
                expiresAt: '2021-04-26 12:36:46',
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
                id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: 'Quidem excepturi voluptatem quam adipisci ea quia. Necessitatibus iste nemo amet aut placeat. Est deserunt non.',
                name: 'acolxhgu2lc50zxcjkl5s5xku1cbc3f18fp726a1zo9koo25n0xaor4135uajep01w6lljydpjadcu2m598ysbf8eejfxaz8pa7jl7pwvj9xb1gvsee0ihghpnjsftgar3bgb3cyesntwfhia48ab1asokj3g9yszwtizm79aaozeb121sfiwj4j7t119dovvipwlsm5k0qpue0ygksy2i9zf0rvxmc39aat321muj7s4123nx8rva4nsfsb6y0g',
                isRevoked: true,
                expiresAt: '2021-04-26 15:00:39',
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
                id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: 'Aut sunt est quia voluptas. Et quia culpa. Exercitationem voluptas iste et quos aut inventore aspernatur quis. Magni et tempora ullam necessitatibus molestias quidem facere delectus ratione. Aut incidunt ipsa modi impedit fuga iure.',
                name: 'dbsqyrpvfs7tg738gb8drfor70ed3g2f6q5txgzwn43ij30cexnqvvb47963dzia6yexq1lznxpxff9fya1ru0yk563nnzvuf6irvpchrflr1igvq1dop1j4bpt7k28nn9veqexanjrpy1f98mntfelp7kji5c1edrjki1pu7hgodde8b0bw00sronfzhmyp8orj6q9sz820ca508s8dvul05o31r3kwflmbux6mwn1cy5d3pkyar5epveiubw9',
                isRevoked: 'true',
                expiresAt: '2021-04-26 11:29:01',
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
                id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: 'Quasi fugiat sequi reiciendis. Error sapiente voluptas quia et tenetur impedit accusantium. Eos magni rerum et aliquam.',
                name: '9nzphoewujad8oq2bhwpogpggaq6v6rrqf8ezuhly9eqtq0ccskiv5izow9wkkpy09uzjaavqwoxkilswaq889esouzzwn6zkpd5uar78xd1b9nlh3e01vkxsa36gi4tw48giqka96e6hhidvuwp7mih5kh2z8puz3xht1wtjcqn6qatd7k52tavvp10nvj8c10sjno29070bwncdu4jn0glem1qhd3gloddpbkzhfqlw69d70ng1jf7615ggd5',
                isRevoked: true,
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
                id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: 'Architecto nemo consequuntur nihil ut. Rerum quibusdam delectus quae non et exercitationem officiis. Reprehenderit officiis minima. Impedit voluptate esse suscipit quidem repellat at. Iure eum eius assumenda temporibus eaque harum maxime impedit tenetur.',
                name: 'k4swnlzi4443nt2gaoge7ueh01ujry5z8x7mzwlaxlyo4mm5zjgww7st5j4dutamdbyzo3fgw5zktwc6tyo10ez62njecuii34u70e9vhifldo8we8r73msc3agj4fltusoyzfkzwv7ioyxvytn4m9eporw22p3ozsbpib8w4ps63ig0dpjq61bwaejp9tpt09fpl1ljilezyt7e5avn9811bkmzyfk7mssgl18fazkn19o7nxg89qsdnv9lrqg',
                isRevoked: false,
                expiresAt: '2021-04-26 07:41:21',
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
                        id: '8cf9698e-c14f-402f-b5ac-118078ecc522'
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
                        id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c160c7ad-d538-4b5c-bb32-6946ec81cded'));
    });

    test(`/REST:GET o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/42f0a50c-62df-4ea4-b46a-4c6677d85c8a')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:GET o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .get('/o-auth/access-token/c160c7ad-d538-4b5c-bb32-6946ec81cded')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c160c7ad-d538-4b5c-bb32-6946ec81cded'));
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
                id: '680a4634-8e20-4347-b52a-811a3c568cae',
                clientId: '0eec6b15-e6c4-4c5a-8ac5-ee6f7ebdb1a7',
                accountId: '0d472ca3-d57f-448d-a266-465d40d9e3f4',
                token: 'Quaerat hic modi doloremque cupiditate. Est maxime non repellendus molestiae suscipit. Sint velit eos vitae vero cupiditate dolores temporibus natus aut. Quaerat dolore saepe vel id placeat sint est neque voluptate.',
                name: '7qdjvezbfnqen73x0w71wvb6ccw4wj07h9us53ldojiu6pudbfsrdlkres1tuaxscqbrouvv5dld0wr2zhtcxp7uoy6ae02bvjtnvfpgh2oigo6enn5oethfytx3e697xu1i4dpzvsehfa5ed9n3vi2b49xtc95p4bgydoa8k02zs9xv8xdadornj306rejwir88eesong59r7iuf7cdvcoc5hjhr85hgczc3x9mfp0yg8ak8j0v7o7wblzzpac',
                isRevoked: true,
                expiresAt: '2021-04-26 11:44:40',
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
                id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                token: 'Aspernatur aut rerum recusandae et aliquid autem quia alias. Omnis mollitia aut est unde molestiae id eveniet recusandae. Quae ullam consectetur expedita et delectus labore. Ab quo rerum a et ab. Praesentium et eveniet eos. Molestiae esse amet.',
                name: 'dgtou075ym8gcer7ohfkhkex4wq9e2xvjk8blxbt72a97zkle65v4kp69a3hckl4ipldlgm7fz2r2ln1skh8kkln7dpwixjtgpuscnd8loup8o2szfk7y3m7mevxybtbz179n5bjsgblmlfiq5zurezm297w6ylm1n511um9swdnr5sqya631somguecxr2a26w6l9v73kuab5xepvnf93jocxu2i1nyzt11cji85hiwqsb5v43jz4ni069jxm2',
                isRevoked: true,
                expiresAt: '2021-04-26 22:25:10',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c160c7ad-d538-4b5c-bb32-6946ec81cded'));
    });

    test(`/REST:DELETE o-auth/access-token/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/b66825b3-a5d0-4a28-91bd-3635e973a754')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${testJwt}`)
            .expect(404);
    });

    test(`/REST:DELETE o-auth/access-token/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/o-auth/access-token/c160c7ad-d538-4b5c-bb32-6946ec81cded')
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
                        id: 'c02c3a8b-9757-439a-9c4c-9693dc66993e',
                        accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                        token: 'Eos numquam est ducimus. Sint nemo ex voluptatibus ea ipsam molestias qui accusamus fuga. Nihil eligendi quasi pariatur aut itaque quisquam. Ipsa quisquam et qui voluptas praesentium voluptas.',
                        name: '53h7rgf09mbrg7z5x2zfwym402cxpfrf0ntl7kmf6r6rhr9nx0oeiup7txvycqa6qeai17c5zq99gjtmoo7msegrc5f2koqzwj3jzdhlbz2ufxfef8styhnaj5vtjj5wqiol4nsvzl790q7mwg9wcl6z6mbdwycwnyau2vi5oa6finglxlwh9b1v2hqgwynki1bvazlapi460magjh08ryub6eiqoday9m28a1hc4pfc21ha6zdkiljdd3hkrll',
                        isRevoked: false,
                        expiresAt: '2021-04-26 18:03:40',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthCreateAccessToken).toHaveProperty('id', 'c02c3a8b-9757-439a-9c4c-9693dc66993e');
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
                            id: 'db414fe2-4745-487b-a482-d99a0309f491'
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
                            id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessToken.id).toStrictEqual('c160c7ad-d538-4b5c-bb32-6946ec81cded');
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
                    id: '0232ce15-5b86-4d10-b08c-b0c6fc1bbce1'
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
                    id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthFindAccessTokenById.id).toStrictEqual('c160c7ad-d538-4b5c-bb32-6946ec81cded');
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
                        id: '521eb5d1-2c74-40ff-82eb-5fded437209f',
                        clientId: '009f5275-a1fa-41d0-928c-b82d87992cfa',
                        accountId: '38767572-a5c1-4346-81d5-718076d42ecd',
                        token: 'Esse consequuntur dolores sed temporibus rerum. Velit labore vel expedita soluta debitis deserunt quae eos. Labore ea qui beatae praesentium. Aut ea explicabo magni asperiores. Culpa cum sed dolore doloremque expedita omnis consequatur reprehenderit.',
                        name: 'da3x78ekebng9fwane4wsby3s8rluhde3lfuaunbo9ugsnjy15capawdyrw5x8hxov2psxa8yhjl3n4g01525lkudu8zawg0anufo3rbdgkqe8h044kwvwm8719rwdopb0fap8eyme88qa9px1jayeeu40j6xbbod6j5msi71sjj9159r87zgpek54dtz778qqkdsk851lhuk02rdtuuotzy98uyu58bm268o7cptsgaj56coygkh2dcdvm7atr',
                        isRevoked: false,
                        expiresAt: '2021-04-26 10:26:58',
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
                        id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded',
                        clientId: 'ccadabcd-2a8e-4397-9d5b-cee02423f55a',
                        accountId: '9bb1e5b2-281c-4753-a8e6-5461f9e5b79c',
                        token: 'Ut ut a. Officiis quo quidem doloribus voluptate. Assumenda ea eos exercitationem aut sed earum. Eos perferendis quam accusantium consectetur sequi voluptatum consequuntur perferendis magnam. Expedita voluptas ut veritatis pariatur illo non. Et explicabo ipsam cumque non ipsam doloribus labore rerum rerum.',
                        name: 'd4ociuuzwutyb9zrf7fhu651qp9zs9v9vvfztsqbuwoyp36bw4u4qjodu9nhjts8dqnpx3popuxgfjysvbpicho5nv9lfhxhz9wkt14w2gwhhpcejv9v0hydev9x9nhnrn7mwpirghk0r6fit7fycc8ws2u3bh6mc9y19e6d6sn1mn7ya3v8trrnbcobmrpfg9un62lz62jplaompd54byi0d8ssugoqqhtc9gayjmrtp0hvun679u36qxphhhj',
                        isRevoked: false,
                        expiresAt: '2021-04-26 14:33:54',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthUpdateAccessToken.id).toStrictEqual('c160c7ad-d538-4b5c-bb32-6946ec81cded');
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
                    id: 'd0053bee-b29b-4df0-ab33-ff596d8c2795'
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
                    id: 'c160c7ad-d538-4b5c-bb32-6946ec81cded'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.oAuthDeleteAccessTokenById.id).toStrictEqual('c160c7ad-d538-4b5c-bb32-6946ec81cded');
            });
    });

    afterAll(async () =>
    {
        await app.close();
    });
});