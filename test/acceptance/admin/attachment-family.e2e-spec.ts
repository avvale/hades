import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';
import { IamModule } from './../../../src/apps/iam/iam.module';

const importForeignModules = [
    IamModule
];

describe('attachment-family', () =>
{
    let app: INestApplication;
    let repository: MockAttachmentFamilyRepository;

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
            .overrideProvider(IAttachmentFamilyRepository)
            .useClass(MockAttachmentFamilyRepository)
            .compile();

        app         = module.createNestApplication();
        repository  = <MockAttachmentFamilyRepository>module.get<IAttachmentFamilyRepository>(IAttachmentFamilyRepository);

        await app.init();
    });

    test(`/REST:POST admin/attachment-family - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send(repository.collectionResponse[0])
            .expect(409);
    });

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: null,
                name: '42bsvkrkt2to0br42x84a80xy5dprkjmtck8tevefuqx1fkg7qx9jz3tflr0l38ugjxi85e7wl8pi3wqtvk4737lr88lwwqe8lrcuiz9tkl9b8d6eh91u3uu4exacb919ezdjhtp1vzgn2vfm18dvbm6joalt2uwrest2mkdvim0hqchao56b5a43snqxlje07gaumhb4y8bk9bnje0g6iusw1cca3q7iy6118x9wkpx4sj82ck7yldb8se0b2m',
                resourceIds: [],
                width: 205011,
                height: 630794,
                fit: 'FREE_WIDTH',
                sizes: { "foo" : "bar" },
                quality: 388,
                format: 'DATA_URL',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                name: '1rrzouiw6e2kicjzqcfomalo2ztw1dg2mjk3dc082kuuqmp1lviq1tmog6supmqdcxiirs6pn0q6q3liivp2ju3mi2abppexoc1pf303zr45kywkhd0dxzdutl8wkswntrt2zw19z7pnl9k4foneev3tfqibk2z2ap2ujefbjppbhmztgsgvj5rgp1pq843q4cx934nt19bl6nb0ojjngbdhxtztthodamcdmltz3r1r46dfbclonigm38vvulz',
                resourceIds: [],
                width: 773081,
                height: 882265,
                fit: 'FREE_WIDTH',
                sizes: { "foo" : "bar" },
                quality: 261,
                format: 'DATA_URL',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId must be defined, can not be undefined');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be null`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e18f88-0596-438c-981c-df2687bc4be5',
                name: null,
                resourceIds: [],
                width: 669568,
                height: 359976,
                fit: 'FREE_WIDTH',
                sizes: { "foo" : "bar" },
                quality: 424,
                format: 'BMP',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be null');
            });
    });

    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName property can not to be undefined`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e18f88-0596-438c-981c-df2687bc4be5',
                
                resourceIds: [],
                width: 770187,
                height: 221949,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 985,
                format: 'JPG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName must be defined, can not be undefined');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyId is not allowed, must be a length of 36`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'jq22ugvl8t92eaqk3f9zgsqfyjnlhginfvlj8',
                name: 'e5jzdeimpz053k8vs3h5mc8nxm38tv1qbqiv4o8rf0jgy1e258yg4k2bsuh4122zegx0jw2w28xywbpafxsutetc8x2dj1ldrh0gsnssshdpod8o9mnaqge495fje20lgehcsi3zekxwk50l0zirffswijf1ddr70n5sr535pfhg4r1odq6k73luiyy4n5tlvghpvejqouik4qudihkd0cxjjme7ywjath5b3z81ocdrwrt9n5nojs0d0i99q3w',
                resourceIds: [],
                width: 497296,
                height: 740092,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 593,
                format: 'PNG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyId is not allowed, must be a length of 36');
            });
    });
    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyName is too large, has a maximum length of 255`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e18f88-0596-438c-981c-df2687bc4be5',
                name: '3gut5c87taujpsg9r4q8nsze8y1id4x6pdzcvocipf24pqyo09go22ds6gxyke2nzv9g7wa6j6d8yd5bmfscdtuvs9otkfrqtpnqb318rmt9mif78orngdl3spozytke92ziy79dxasqujicnbf1vzvrocnswj2u495g73fi4jf14a6a3hf6c03u7s44wu3qw0ieipmr62ewnd2a3f0xpall96cokedrabj4g1bhu84d6zgttkdc3z7yni6e3ruq',
                resourceIds: [],
                width: 288183,
                height: 951952,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 681,
                format: 'PNG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyName is too large, has a maximum length of 255');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyWidth is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e18f88-0596-438c-981c-df2687bc4be5',
                name: '7pcf2ip93msu4z1a5wk4srolfzo2gm5x1bioefd0v3qh4x9ayypogie5rfgtmwmjrej6k8egv75di7kzcnqrzwhzl7tv4o7tca2cxuxi22p0z6gecrowqemjapkvg1yqkls1wd9c92ng5wsrakpch9nzgl0lefkksu69c6kozknfkdmwx6bbzq3eqsg9y51efvj7d8121164inuwbf1tgad2usdtj8aj8hao9nj3x9jficon0poacl79nz5a2ch',
                resourceIds: [],
                width: 3095212,
                height: 270877,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 505,
                format: 'JPG',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyWidth is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyHeight is too large, has a maximum length of 6`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e18f88-0596-438c-981c-df2687bc4be5',
                name: 't76wl3qxfd03torq9vfb7kc1tbeyxtau9k4bu6zuoahqhna7n6yhd50403qz9lkucq5t0musqklrqcknh7uood6aac6x6hom3kqt0fzmmkbvgnm65dcyt1jhxdyst75gw8epicoz6qmxjfka45uvjt0ghj5qqausmmjdvv517jeyhx9t97t70ngil4tdiyt836446uxylrxnwiqgl2y5nxtppkufi2p1ktah9qis127wj41x7hq2i3ti6lhh3sf',
                resourceIds: [],
                width: 568729,
                height: 4963559,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 433,
                format: 'BMP',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyQuality is too large, has a maximum length of 3`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e18f88-0596-438c-981c-df2687bc4be5',
                name: '0dxfnqxbwup3wy3jk1sndvh7qugti4p6jk0jgict92rjv18ppx8vqbxywdc5if6e6on79sf7pxf9k5vei3ar2v594ums3qus98ij7q96agtay9znhred5731t4fv9ah54fji34cy7olv1m7a6gi3wz7eua8zfs5i0tz5r7vd4rnr2c44m65s8hlcj8a48vdjvrg4mnkv720lzveau04vi5lqw051zxw3veigb9x7ufgc8nd8yezmbuj187k9azl',
                resourceIds: [],
                width: 846171,
                height: 249776,
                fit: 'FREE_WIDTH',
                sizes: { "foo" : "bar" },
                quality: 4346,
                format: 'DATA_URL',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyQuality is too large, has a maximum length of 3');
            });
    });
    

    

    

    

    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit has to be a enum option of CROP, WIDTH, HEIGHT, FREE_WIDTH, FREE_HEIGHT`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e18f88-0596-438c-981c-df2687bc4be5',
                name: '0chp2xkx9ii0ntoihy13tx4ac8g20et7v3vr5we92l9cdgthl5v00g367w4xcb0bpwgjobg2hmquxtqemxbdxjein0dkvxlbevzrgz1ms6keltqa5uim9km5cr10javesq389029fh9eckazs2o6gnazd0o6qlbf85rirrmx5n3i2qljgdheogw48ntaej7mpgaxeia894y5aphu07xrr37i5ncxxqwx6o95j6wao2ywlgemnpzmwl3j2ybyuwk',
                resourceIds: [],
                width: 701915,
                height: 906876,
                fit: 'XXXX',
                sizes: { "foo" : "bar" },
                quality: 817,
                format: 'BMP',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit has to be any of this options: CROP, WIDTH, HEIGHT, FREE_WIDTH, FREE_HEIGHT');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFormat has to be a enum option of JPG, PNG, GIF, TIF, BMP, DATA_URL`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e18f88-0596-438c-981c-df2687bc4be5',
                name: 'tzw5we0wzrb21ymuttl15jy4zboh7fixq9t1f2pxzixr0nnjcaj5sksj9u1em9sc86b52keefsv6aeel91f7mfwtynla5my9sawfsxqq22ehpshvwx5st0z69i6mtet2txosl2xks2kj255pwcoh5p9yzsodcmcf16yjlk4bunh1hl91clyua06g4ij06gna86ky24bcarterpst4byyklgen9lpkfec0rd4nt563el0nd504al8ydzy4jy1vbv',
                resourceIds: [],
                width: 168904,
                height: 940394,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 190,
                format: 'XXXX',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFormat has to be any of this options: JPG, PNG, GIF, TIF, BMP, DATA_URL');
            });
    });
    

    

    test(`/REST:POST admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'e7e18f88-0596-438c-981c-df2687bc4be5',
                name: 'f77wyyp40pnx9muqgnbxtdf0qdplvkh9vvfmy4d6vm2wajt268ksxcox7w9roq904gf0wnnknz3hbyzerpjuxzibwsasop8sdbp3ij3f6mwnilymspfa6vh03qikpgn06b287tf993h5ww7h9m2gt694lhnkpoq4zm7x242dk3jhf4smz6evi3q48h6qfe5ksbghfv57u8kshy2f2p4h4jo1lwrytqnmn8b4y31kyxjy7kkeigjkzd7nik1oc37',
                resourceIds: [],
                width: 347854,
                height: 650089,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 796,
                format: 'PNG',
            })
            .expect(201);
    });

    test(`/REST:GET admin/attachment-families/paginate`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families/paginate')
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

    test(`/REST:GET admin/attachment-family - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: '7ef2846d-32c7-4460-8bc3-cdc368076650'
                    }
                }
            })
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                query: 
                {
                    where: 
                    {
                        id: 'e7e18f88-0596-438c-981c-df2687bc4be5'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'e7e18f88-0596-438c-981c-df2687bc4be5'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/920b0e06-fd66-44fc-8b8c-50b8d64fb1c3')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/e7e18f88-0596-438c-981c-df2687bc4be5')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e7e18f88-0596-438c-981c-df2687bc4be5'));
    });

    test(`/REST:GET admin/attachment-families`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-families')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse);
    });

    test(`/REST:PUT admin/attachment-family - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: '49c22d34-e2ba-4895-8991-bebf6c81ac02',
                name: 'wrfphg2nv02e4j9ynruij1gm3j3n31as40hybdqpxicwkrbwau5gmx3ybsw19n3yqm6vps69ak6qd4hg9gfssnjlms3uqdahtx26sop3lfc1dlkbefh8cayrt0ch6zsn4haj5cjw3x5ru9sgzc3bwvgf532d8fyb9n44fp1m4usi7vxuoffwtvkfgl9txzokom8o1s5p1vq8jqbvootpu006ob37mzojadi4a8u4kkdfmpz4bhvfin08h3yaebn',
                resourceIds: [],
                width: 602951,
                height: 928268,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 661,
                format: 'JPG',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: 'e7e18f88-0596-438c-981c-df2687bc4be5',
                name: '1tt7tfd3s5dpze02nu4u86lg3hgwbubr3e0fwsiro2nd06tk4tg3al1i6q2clmfcy6f718wje004taqobzqg3822a3ui2h8wk3nwcf0lgwcvknm5i98t0vxha8hu4wnjdgm4mbbl3w6angulhe63gwhy3nprw02s1dgo8s3jbsvk2q52sesyahhpf4ijg68ib79g1jabqvmsk54v7nan52cpt4ym75ixqkjs1uamxotbtnzfb52wsgtnm8egdak',
                resourceIds: [],
                width: 370464,
                height: 775839,
                fit: 'FREE_HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 582,
                format: 'GIF',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'e7e18f88-0596-438c-981c-df2687bc4be5'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/883a658f-55e7-4cfc-8948-6280f67b96aa')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/e7e18f88-0596-438c-981c-df2687bc4be5')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test(`/GraphQL adminCreateAttachmentFamily - Got 409 Conflict, item already exist in database`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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

    test(`/GraphQL adminCreateAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminCreateAttachmentFamilyInput!)
                    {
                        adminCreateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        id: '56a99b90-7a89-4235-93c0-94b36ae7eef3',
                        name: 'xnz57r2ryruz8gwxjw21ppsipe0nfvral6b2cqasfhdvrnkc2855zyexj9acg5hxrms9y7qxvt798994sm0qzve3f9fbj44wjlp4d8c911c54i56k082cdf5jvh0oadhdcyojovyt8o4h55a9jrq6w0wodr7jkqchi2etpyozo0sw45ow3byl8f1sqg9sp6bdtjvpc5rajtbyhuepxly5iqnw6fwymk28q517m89nvbymawmxg5jgr4xhwovgnn',
                        resourceIds: [],
                        width: 396936,
                        height: 369450,
                        fit: 'HEIGHT',
                        sizes: { "foo" : "bar" },
                        quality: 696,
                        format: 'TIF',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', '56a99b90-7a89-4235-93c0-94b36ae7eef3');
            });
    });

    test(`/GraphQL adminPaginateAttachmentFamilies`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        adminPaginateAttachmentFamilies (query:$query constraint:$constraint)
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
                expect(res.body.data.adminPaginateAttachmentFamilies.total).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.count).toBe(repository.collectionResponse.length);
                expect(res.body.data.adminPaginateAttachmentFamilies.rows).toStrictEqual(repository.collectionResponse.slice(0, 5));
            });
    });

    test(`/GraphQL adminFindAttachmentFamily - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: '3f180c72-c185-463f-9a3b-7a2d29e3c4e8'
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

    test(`/GraphQL adminFindAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminFindAttachmentFamily (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
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
                            id: 'e7e18f88-0596-438c-981c-df2687bc4be5'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('e7e18f88-0596-438c-981c-df2687bc4be5');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '77f57659-9d38-4f63-860c-f3e3c5365778'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminFindAttachmentFamilyById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($id:ID!)
                    {
                        adminFindAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e7e18f88-0596-438c-981c-df2687bc4be5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('e7e18f88-0596-438c-981c-df2687bc4be5');
            });
    });

    test(`/GraphQL adminGetAttachmentFamilies`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    query ($query:QueryStatement)
                    {
                        adminGetAttachmentFamilies (query:$query)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {}
            })
            .expect(200)
            .then(res => {
                for (const [index, value] of res.body.data.adminGetAttachmentFamilies.entries())
                {
                    expect(repository.collectionResponse[index]).toEqual(expect.objectContaining(value));
                }
            });
    });

    test(`/GraphQL adminUpdateAttachmentFamily - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: '45589445-184c-405d-a6a2-74c9a34770fc',
                        name: '3iov4s0x3lmgunt490bzmip4z0rp1i73phaomcl5551fb1vgz44bgj9ldm14rtk46bebtvvuq9voc033ua3c5tshj8u91xpx17htyv9z2z83bd0ak3h6nlj3umybwgnbm7wuqebvwb5d0bxujd20j6f12gv3xbckkrju4kiwej410em1gr77xnpjyax02hgz39yrfbg5smaz7ds6gq2xvnx6vyx17yqiepqdrn3t35ax6j16hjx2fts3prpjjfv',
                        resourceIds: [],
                        width: 216578,
                        height: 205371,
                        fit: 'CROP',
                        sizes: { "foo" : "bar" },
                        quality: 383,
                        format: 'BMP',
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

    test(`/GraphQL adminUpdateAttachmentFamily`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($payload:AdminUpdateAttachmentFamilyInput!)
                    {
                        adminUpdateAttachmentFamily (payload:$payload)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        
                        id: 'e7e18f88-0596-438c-981c-df2687bc4be5',
                        name: '0pp8e7vcq0ejehbvrxll45ltg35oirwcoykz9ua612alys4klfhcpg9fxdsxi7yh986zjqmsego8wn90qv7w1x8uaxugt493b0vz4hxc3kqgklfm31j1irr6ls8noy8qthh0svermv0qtvolykayf1mruwxfbgpcn43k30aglm2umfdvlmr0qc6xoqy035bjaip1tovb8ftghd8mqcm1jh77003t828k5w0gypnq4dzyyw15mnxew62uwh494ki',
                        resourceIds: [],
                        width: 848258,
                        height: 494208,
                        fit: 'WIDTH',
                        sizes: { "foo" : "bar" },
                        quality: 555,
                        format: 'TIF',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('e7e18f88-0596-438c-981c-df2687bc4be5');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '365d6bcf-9a2c-4b78-b080-d23fa71a9a22'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.exception.response.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.exception.response.message).toContain('not found');
            });
    });

    test(`/GraphQL adminDeleteAttachmentFamilyById`, () => 
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({ 
                query: `
                    mutation ($id:ID!)
                    {
                        adminDeleteAttachmentFamilyById (id:$id)
                        {   
                            id
                            name
                            width
                            height
                            fit
                            sizes
                            quality
                            format
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e7e18f88-0596-438c-981c-df2687bc4be5'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('e7e18f88-0596-438c-981c-df2687bc4be5');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});