import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IBoundedContextRepository } from '@hades/iam/bounded-context/domain/bounded-context.repository';
import { MockBoundedContextRepository } from '@hades/iam/bounded-context/infrastructure/mock/mock-bounded-context.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { IamModule } from './../../../src/apps/iam/iam.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

describe('bounded-context', () =>
{
    let app: INestApplication;
    let repository: MockBoundedContextRepository;

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
                    })
                ]
            })
            .overrideProvider(IBoundedContextRepository)
            .useClass(MockBoundedContextRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockBoundedContextRepository>module.get<IBoundedContextRepository>(IBoundedContextRepository);

        await app.init();
    });

    test(`/REST:POST iam/bounded-context - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: 'gpp5wcij3ufuph0eyeqni4jqk1s82cw1zbvn2lp04pqce5ykru4c7ljt2gzts8osojdsaoyh1u8xh5d9r73mrirve3xgc4g0o37f3ztci5x90xrnol0dk5csxq6vkm6vo2m0bej9mgqtm77ro1hhr9gwuyydz3i0i0z7i5tvcnivh5qwke5d35yfofaeebnnj362ynph2x70b3a33crihtr8o6mib96mqha4uacj55uhafln9gf5yebtpmxbrjr',
                root: '9v3injv3oorx6nr8l6lhvtr1u3ac81',
                sort: 871157,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                name: 'vvu1g7luwddqje6rjk697y3kc4tvy2s8crcrx2wk01g30ko6um7xlvkgse146mrfybguges7qvslap5hiyw08txh96wutixmv9zsnhturoa6lfxpotiyfzu6dti4e0bf9cky6ugn6gipvahv6w8u33vhct2i4rvuuiv2g4dp023eabl5piv3ied0c7es9rqseme3d55r8xee2yelspm0oxcc6eh5p92tpytx2jj5ql3ytz0pl0pm7zj8wmgve62',
                root: '5pg36dft5fkxv6114esydohia17t0d',
                sort: 501353,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                name: null,
                root: 'xtok5z1d1jn8m5xbdg7s3wvrcsgks4',
                sort: 325200,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                
                root: '5e7qktzqc923f7m81noiw1f5ex2gdc',
                sort: 593682,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                name: 'xp5lkll8f57dff1ex8jt70e1gfk3ddst2kupcp98gctqnsvjqydizlxmjx5n8pwyzhsz7ekd8e0tkco73ef3u54c5jgw6qj6dhagosq46tyb2b410rpe51d62onkksa36t5vfkkctonltm87jmocqr071qrlswl1t2xkicbgaspbims7sl9i5l3w62wmnasig3h1qo1vl6sr6xnuvryewhl01lssyr2703ppgrprg9u419vs9ein0a660le98bn',
                root: null,
                sort: 168008,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                name: 'a428l5azr86uc0l7lvgtnc2hsfytgsohfb69vm4fyzyvmyvjr8qas786m2o7v2iktpp32cmr2crzrdhek7xhv91w65eyti2j8sqvfdrrpub35s6kfivdcl72ae21ucm6fbs5cdzj1mn5wbj2xzqzvnr0d9oosmub3h4hp7ekkkd71udz6vhdrgkr7qlsjllkm32v7daxmtrng24nvak47vg5rewcsvt53msh86vqjm04ydfg8a8u73068sxwuxu',
                
                sort: 676289,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                name: '9iizg1uz97m5woecf5ghzysgyuo7s0c33fcud1r7kfwnigrel1ziwuaq79wcvvfcbzfocuj68lzm7iurt8xxlnssfx2vl6u51tvw72j8pd5smdjx1u5mdzovgon1niqovfje6b4sz9ed5sh8ipodl0du5z6vtz146wl8j3ibfzpd5479muqn5ny91q2uk61k36ybn2yacoopt4k4pcqyqp3b9oqbb5d39ewunhl6w9w6nptdw0a7q3qv7u875qw',
                root: 'uv6ua0g4omld8sudjtdh03huzuc2c8',
                sort: null,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                name: 'rn92oigri0xjclwgqgfeqmkauwn3ah64o2bj1vjo1z29pmahpfqd49i0adii0e5e3nl6vc232j3760ju2801qhwhvrillnu56dh7gck8ges3nab6csm3i6zf5uyg6hvpkzxqo3aj6cnv3pxg1xeo3dufuwo49a3sd688ycyhew1qk5w6ah6mdyjiox1jcuk91loosur4htfr00ew8z3pwy4up8rpy4ejhi1c870wpk8l5vfp7es65fmo7t9e9qu',
                root: 'hlywi9yteoz0d2jslfrzdh7dj40p5r',
                
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                name: '6s7mxps3wj6yyc000grrafs3yygugm1zthq8q35nf0p8n3i05oz4p4grgj33bjlt5ipx18ma2wehqcc669bhty08mc4ffpwhkxi2x5ihvlwzxykgge6nkf2d9045livjqc3w6m4hm99wjea6xs3mq8fka2lskhbo3aicqj1ihh4acg9ow80sv1wax3lv7yzqisaaazy0vonxypngy6bnd5bnq6amsar1a0brzfmtwf2kzdxhjolr1wqn0t8qq5e',
                root: '48gkldb0nm99bqbd4w2v2vq7u6vko7',
                sort: 766165,
                isActive: null,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be null');
            });
    });

    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                name: 'ja24on0td5442j5f99xcj3thyfi4808j9rj8x8wpg5vcqocajbjx84du1dgcqlc11xnzccclkdpc4kf4mrumivzgyzbpvcyfgb4jadlf7ajn36fsbr9zmicsknxtjcht3947iwnha2raey25g9pjv5je9r8dsiy252t3vqmfseme49l69rq3bhzaoskejfw9v7ql0157yi422wr56482nefl5huiepyvcfih4qe9t4vszltrt65ssjnunan6d6r',
                root: '8bj4xfpvgc266wt3junkpzp0d3ayfc',
                sort: 205768,
                
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '3uj9non25idrw3a1ar1ja9eqhxlz9nhm13dtt',
                name: 'gkv6cv40m8zpx0ks1tfq54brovk6f5ltqt57iapbv8ponxc9sxndfmau9b5marq6fmjdxasvz3905muzgkcsvifh4ok4yl7wcit03yhgs4nhwdjlrv47r40dg8ywxioduzn7kizxwbbgr5bgi5zfyvwjiw3myu7vg9kkiviyjzqm4bls36ufrhku6btaafx0yjdt0oyi6mc9alrieqjhjvf78gnxjfhp5jlja33dro54akwbnesgui3wj3r6s4m',
                root: 'kmfw6g3d4fwioux1zndev0j4jss8sa',
                sort: 843929,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                name: 'kznwsngapk0d800vsfhji7dwu09joejods5oq5aqhl2n8uihz6fcssebv8esdlwh65rzh37f2n7mfzpr0rmkgoxbqy1srobqf0flbpsroshr9cw6e208xcia4htfzvwwyavgeasjs7ji1hh7nfd4m9yttfp1cmg2ddnc2x8hih5bbfarjqhpywf33n4okcnllqde3opzr1xwboenmuqlp2kmma8gq76345wkyp8zz5fsyhq12nfusazb6c747fig',
                root: 'm3tolm38pwp951jgz0ujfen3qfomam',
                sort: 671525,
                isActive: true,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextRoot is too large, has a maximum length of 30`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                name: 'krsg4lgfk27g64yx0o2xj41tahv0ys01qlqr2b96dtgsq6atd4jo0j7r889xaxd4q08srinemsrc7e4ko1mtj3hwkqhl77wv8at34s411652jroqnf6xaiu65m4ia3h6o5xnp8ukul49qstqj1kvr83n02sv2k8b4nu3zclr2cf64nz8x2ozheeq5jevy1u224hivgm9nnasct45xl377unk0pn0c3cksy5faha17ouo570daultnau8ujpuh83',
                root: '84fpmpav87heqjwngoohzbhm5tycfcw',
                sort: 542503,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextRoot is too large, has a maximum length of 30');
            });
    });
    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextSort is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                name: 'tslglzakf9cdegurd9obstxplziuoukbac12kw3rb2hxiuls2x6mb04t4u29hb0p4ircr8o7njhghkrz4erydgvuekebi5ewn8m4co1d8nrrdsabew8t71xg041kvfosfrav9yf8waz9lp0fnwd24r1h0cy46lua52ctm5aodaspcgjs5x57cyljqrnrldzj5dfuzje7uwcu3cij79u2k43a0wneh52cvzylete0koxi70fzwjjzam9ly6yfet4',
                root: 'kdkepkr04xka429i09epuugyzcgozg',
                sort: 2460166,
                isActive: false,
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextSort is too large, has a maximum length of 6');
            });
    });
    

    

    

    

    
    test(`/REST:POST iam/bounded-context - Got 400 Conflict, BoundedContextIsActive has to be a boolean value`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                name: 'de0mpu1h3m3k5gfx6h4k9sr1o9l9f9ji9nzn883l4dsj7qzskgv3194u1owa8gukeq8zin3rrg4zy0f7ngh3uni0h8ry3yhfi3gak2au7k0mv1j6vapd8h8ixyxmtbt2b5f9ljzzl1wagb3f5zl8gscewczogtb93dzi13tugiqhoomce4e6mmqn0drj8pnw5x1ovnwnv8fl83xtkk6qmskls4ejvr6t570z88eedjtge7kxj3ny7mmtoyv7ipv',
                root: '52113hnnjqqraayz11b4venq0s2duo',
                sort: 710450,
                isActive: 'true',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for BoundedContextIsActive has to be a boolean value');
            });
    });
    

    

    

    test(`/REST:POST iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .post('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                name: '2w3z6tvlqo1xof4lvfircz89qc0qk5n0x4hvo5p1fe2c298b62acrs3y82kbo73vdh0db0sfb4fmqq4glplpqd0y8wsqdeqhsvkpge8h48ckpuf0ux1a31mhrr08isugdttzfr7uzzx5a9egrn0o32wxg14bn3e71it2kw1bchbin7fbsksr8uppekeibuy2s6jl768e82ysdaal5vsqrddkm5q4waubc4k3js3o4mh72pplrx78j8kexdir4yn',
                root: 'm9kligf8nahqppt1qty2cdgj48qks6',
                sort: 801324,
                isActive: false,
            })
            .expect(201);
    });

    test(`/REST:GET iam/bounded-contexts/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts/paginate')
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

    test(`/REST:GET iam/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'adc4fd72-10d7-4947-95af-587d3e53391f'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === '86cec213-5a39-4d91-8648-4d1fd5dc85e1'));
    });

    test(`/REST:GET iam/bounded-context/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/e59b0196-39df-46dc-b154-71d68d8da1b7')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET iam/bounded-context/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-context/86cec213-5a39-4d91-8648-4d1fd5dc85e1')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '86cec213-5a39-4d91-8648-4d1fd5dc85e1'));
    });

    test(`/REST:GET iam/bounded-contexts`, () => 
    {
        return request(app.getHttpServer())
            .get('/iam/bounded-contexts')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT iam/bounded-context - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: 'fcd5678a-4ced-4451-9174-927d25a0b92a',
                name: '2y0s43d0puv1cxr3ck2tkmxh1u35qn2elk48xrr0rupg63px19365vftgb1ypb7vgrq2ys8jkgncbaf7nc3zxr1gzg17jdf7coazmtmvarpnmz5cf3xkynizszecxuhkuyom40rdxv3go8l9h2m89j0vzz38q5aezl9uphhrrbncfv637gwyn9wduifugnzphiy6yotrrqwwy1bzmibddfoeu3fd8agmo30a3szoaoxrbg6udanq964kqxq7w7h',
                root: 'whfz3pe9v7cb3pekf8fow81uzzvy29',
                sort: 608323,
                isActive: true,
            })
            .expect(404);
    });

    test(`/REST:PUT iam/bounded-context`, () => 
    {
        return request(app.getHttpServer())
            .put('/iam/bounded-context')
            .set('Accept', 'application/json')
            .send({
                
                id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                name: 'ul0ftcwrwdqpmm9jtl66nrk3cv15jsyoae83mflcj2wttxcb2xi9hxtoy3julbdyivd3nhuvr9lcpq2vo03jat5u8fh06p8dmb6l35b0ou69jl8x3wfzsu7k0fsdpwa1qbbwv6vx9b7l03q0opxqpalmsgnad00afzxzb2mk4fg6hua2tfynd42phred2teqoeabom9f3rek6pmkmspagevt6f6w0xtb9p9yauzxv4md869swk8okpc6i7ky5it',
                root: 'gsx8yhquxafrjst8q5585i7scycvm3',
                sort: 641012,
                isActive: false,
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === '86cec213-5a39-4d91-8648-4d1fd5dc85e1'));
    });

    test(`/REST:DELETE iam/bounded-context/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/ba75153d-2170-4d29-9d23-2ea4c4b27451')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE iam/bounded-context/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/iam/bounded-context/86cec213-5a39-4d91-8648-4d1fd5dc85e1')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL iamCreateBoundedContext - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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

    test(`/GraphQL iamCreateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamCreateBoundedContextInput!)
                    {
                        iamCreateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '90093619-f3c4-4976-abef-f06e7bc1bc26',
                        name: '8wbnvwegoduxd5xvrlhmol5kxy3lt4j245uolw3ub9xbflf2q7f0jhh1b08c2bd26o42e65xvyru0ju52y0rzqdr6j1jc1kzckjdgrfs7t845piqfci61lpknezh0yx1mgqz4uzjmcaakklj0gxa6fbm9x29vkswg8qsqn7ybzk8p4mass00syjmnodzw1p9hrmakf20u9ejnkhl9uor56ms4yo5rtmtlwne7dvkxbshv0bb94x1iknqm9ufb5m',
                        root: 'aztyft9fmnq58i2obfw595lkdm9sb7',
                        sort: 665986,
                        isActive: true,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamCreateBoundedContext).toHaveProperty('id', '90093619-f3c4-4976-abef-f06e7bc1bc26');
            });
    });

    test(`/GraphQL iamPaginateBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        iamPaginateBoundedContexts (query:$query constraint:$constraint)
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
                expect(res.body.data.iamPaginateBoundedContexts.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateBoundedContexts.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.iamPaginateBoundedContexts.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL iamFindBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            id: '2384ba4f-669b-42af-9552-6cd8c8124753'
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

    test(`/GraphQL iamFindBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamFindBoundedContext (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
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
                            id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContext.id).toStrictEqual('86cec213-5a39-4d91-8648-4d1fd5dc85e1');
            });
    });

    test(`/GraphQL iamFindBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'db23f223-efe8-441b-97fb-41208dde8089'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamFindBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        iamFindBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamFindBoundedContextById.id).toStrictEqual('86cec213-5a39-4d91-8648-4d1fd5dc85e1');
            });
    });

    test(`/GraphQL iamGetBoundedContexts`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        iamGetBoundedContexts (query:$query)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.iamGetBoundedContexts.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL iamUpdateBoundedContext - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'bb1f40e6-26e5-422a-9ecc-545160d21eac',
                        name: 'f2dcyusctfbvlh0bkuarh7p2eu7na2zflopoqis2gj90h3b2e0kfx3ji2onjpoc7vtf3yffapreki4nrm89t5ieiitqm9l3z6q3zaziyi92m2l03iovdbhj5e4sy0mxzui4ncjfe1jshgsnmegrwjf7ql11ct2azqhjg2usbi1km8qmnhr8mp6dpgjw6dj221y7hhwxl44brduv8gzmadzzff04xhbtace9pmbrsvr941587vrb03ak2t73rgai',
                        root: '3n75myb739djwhny3uwllh9px9ayd8',
                        sort: 865738,
                        isActive: false,
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

    test(`/GraphQL iamUpdateBoundedContext`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:IamUpdateBoundedContextInput!)
                    {
                        iamUpdateBoundedContext (payload:$payload)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1',
                        name: 'sdl3tp770tf7e9ngc82xhgo7fob49m07f5sc6gfu6kg5xy9sl09ietojhlv3qiqbnkzujicj6ljbxe5ij5ojge5jml9ah7als0h47ti6jgvkgqtv2rem7yoaoqqht9h3l44lhlfbnsua5ou8svgkrit2v51ob00wobx9958hook9q9zrcuhqye8cyi01k44zau60a26c1xe5fb2cmrxt2tk66jm9w3eb0s49s2q3qxcfkas0vklt3okjxb95s9g',
                        root: 'h1jet7mdj9tnt8h8qcf58xluaau1mh',
                        sort: 481080,
                        isActive: false,
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamUpdateBoundedContext.id).toStrictEqual('86cec213-5a39-4d91-8648-4d1fd5dc85e1');
            });
    });

    test(`/GraphQL iamDeleteBoundedContextById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'ba0aedb9-6453-46e6-8c97-7ce516378eb3'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL iamDeleteBoundedContextById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        iamDeleteBoundedContextById (id:$id)
                        {   
                            id
                            name
                            root
                            sort
                            isActive
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '86cec213-5a39-4d91-8648-4d1fd5dc85e1'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.iamDeleteBoundedContextById.id).toStrictEqual('86cec213-5a39-4d91-8648-4d1fd5dc85e1');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});