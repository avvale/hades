import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAttachmentFamilyRepository } from '@hades/admin/attachment-family/domain/attachment-family.repository';
import { MockAttachmentFamilyRepository } from '@hades/admin/attachment-family/infrastructure/mock/mock-attachment-family.repository';
import { GraphQLConfigModule } from './../../../src/apps/core/modules/graphql/graphql-config.module';
import { AdminModule } from './../../../src/apps/admin/admin.module';
import * as request from 'supertest';
import * as _ from 'lodash';

const importForeignModules = [];

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
                name: 't41j76fyttwadgkhtkhqb3jobae0ksxrswnwgind8pzvc3wdvw8267zftnyboauozakwqe05mk2l5k6x2q11lzw1ecehhhyagin42ilwf398gt29c2jvvhhbcexbq2s6mi9qcttyvuam9np8rlaf5p8bhp3vq6p2s7s7vavmtg3ynce20ml8jm3qgofan7pqyb12gix2vf5ixq60v8x4d4uu3e2t4u2ufpyzkrdo7lw6djmgiseuvm91ux730ko',
                resourceIds: [],
                width: 932831,
                height: 237709,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 43,
                format: 'ca12bek3uk',
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
                
                name: 'tfp6nmxh3wwvfepbbvebsusesq8xjf9ookuin6pd1dv1by1hsh3lu8l3yu78g1m0u9r76es2b9cxywxq16caxc097xef1hdit7x0d5kokzxd2szdigcz39yb09a2ysr3u3o9oalrm19x7yk2k03llx3sg5rzidjxhbl72mhsya19vytx0bnor5v7wp3kp60n64jadoh6jwquabddmo0gnhb7ig6hfuio6d8b84i2ha99kyqnvwfxbfe4nzaqqk1',
                resourceIds: [],
                width: 942925,
                height: 138283,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 34,
                format: '0afk5sdd47',
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
                id: 'c55c5a51-9234-46d2-a605-607f524a679e',
                name: null,
                resourceIds: [],
                width: 937538,
                height: 119601,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 74,
                format: 'a2o45kxb0h',
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
                id: 'c55c5a51-9234-46d2-a605-607f524a679e',
                
                resourceIds: [],
                width: 868498,
                height: 363980,
                fit: 'HEIGHT_FREE',
                sizes: { "foo" : "bar" },
                quality: 59,
                format: 'w37usvox3y',
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
                id: 'xab2lrhx0cya2zh9dr7urt095rwcxg8e1yx4u',
                name: 'v0vz6um78saf0ndct993pspifv0hwzm9v7ab4xxfpzumxcxtvwvbwrqzvtr3bhyixt6447d1hqq8eau212s2y1thuurdfmprdl9vg52yqk6o90p6uozzszzbt484ujpahd7vf80y18eg4qc3m6xhasb2z06ilyvxxam6ta5evfj47h1e2120e5but9nv9ddr6kuybbothrbvz9fp17f3m5uo6vvk4vckfldfi9z68v4s8s1srf3ob4f2iuqz5e5',
                resourceIds: [],
                width: 898894,
                height: 417483,
                fit: 'CROP',
                sizes: { "foo" : "bar" },
                quality: 38,
                format: 'b0f3y3vr83',
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
                id: 'c55c5a51-9234-46d2-a605-607f524a679e',
                name: 'a6r4697c4qmrrar7jmendgwi4with0zbjqnkp9qh175grrh6ycmcymmv58bwfan4zzk0atu1ls4mpx6jxkguw5mvxugzv1sy4ggq91xsc4kb35n95lk8nxkh5cugnpc07zbkpm7533ix4n6npjcuvo2hn26di0oxcoh1xu0q5tua4cvwe4ufkepiov3at7gvue3yeourqgsjx42s7g2ny3qvpusvwu3p8uoig551lu2bt1ban2gg1as4pel0wyqc',
                resourceIds: [],
                width: 248250,
                height: 261262,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 68,
                format: 'hc1osja1lp',
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
                id: 'c55c5a51-9234-46d2-a605-607f524a679e',
                name: '8q6v7rni26artkqvtve0evqimjvs76k6pji7nj92yetlh28wiw59vpbytpomo51h8y15crwhc2up3okavvyai86s9eqe6pecevjc2sdqce2e0alxt94twpgei53ovtex4wxcim3wkifd4p3vtoq4nog02oocyoal1s6vagl8wsfhcvb2xb0fnv4dnglyk5bwunc6r4r5mmlg1n384xusv9y7apuaofx99a0fhid1un6y7e3zmsfnh7tv3f22m74',
                resourceIds: [],
                width: 4607523,
                height: 815628,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 70,
                format: '4uyugs8ocz',
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
                id: 'c55c5a51-9234-46d2-a605-607f524a679e',
                name: 'v0bpbc1btfrabo90h2saq6f9e2a9jkwlo4wewt8rd5ybi5zmuv4eyjynkpb9rm57pi490n9eob1hlhwejhpghpkz73af67mdh21sqvk70cqaw859r2c6mwyyx4cmjikqb0d815nihxpo7k95o4crn76sa6941924xfk6skjnir3d1xg7099oyvkt41nsmpgr7uu7g1h2vuamq5syn9cdht7l5x5xbuc0cngeyc900slc59cpgxf9a15b48s0os5',
                resourceIds: [],
                width: 314333,
                height: 9335693,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 35,
                format: '2evx4ymhz3',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyHeight is too large, has a maximum length of 6');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyQuality is too large, has a maximum length of 2`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c55c5a51-9234-46d2-a605-607f524a679e',
                name: 'm97soinjovfmow7xsmqz737avzqo4tjesfi92j7bv62uifhfhatioi70mu22t3s8gkpy5ioc1hc4rprceiloksgq4kx03r9ljnhico3ry62ycxp8b4qgkrq14oviyzlqxxrc873jmaj79bd4zvnoifmpm2i8zer3ph339lkhkx2koql79s2szp7ez0unu3cu53ihtpujrsf3jnugow460wa0f5a7u3oabxsflty3rgz1ch0dpc74avbzh7g2b0n',
                resourceIds: [],
                width: 216320,
                height: 747195,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 329,
                format: 'oxu89qtoj1',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyQuality is too large, has a maximum length of 2');
            });
    });
    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFormat is too large, has a maximum length of 10`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c55c5a51-9234-46d2-a605-607f524a679e',
                name: 'avcewr4mq3e2g7m8wxkshkbucwgpdhibbhmwa58fgokk8htd5spixq59gcimlb5m8qgy2la1om5b06lzn4n7tbpo75kk6ki4bthidf7ufxb4bo46thydo7nqrotgrmjlryi2bxqsmeuml8piaa3pxbgpqqn8voadb9h6m9em0kj32gcpsf71j384ugkii5dx6rrwq6rtm1r93xit1h5b1kzxynku2wz0iw2j7pugasl7oams61tas5c4rf9ujxp',
                resourceIds: [],
                width: 800649,
                height: 774894,
                fit: 'WIDTH_FREE',
                sizes: { "foo" : "bar" },
                quality: 28,
                format: '7ywk95wir5n',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFormat is too large, has a maximum length of 10');
            });
    });
    

    

    

    

    

    
    test(`/REST:POST admin/attachment-family - Got 400 Conflict, AttachmentFamilyFit has to be a enum option of CROP, WIDTH, HEIGHT, WIDTH_FREE, HEIGHT_FREE`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c55c5a51-9234-46d2-a605-607f524a679e',
                name: 'qm581fswvlp6jrbtv5n3pnl8b1qio6ckkuwa52bd3lxd0f8x705i8gvlgrkjet2djz3hsj7wxh11utfnezurbyupcz085l1a76svjdpk1t9jdiog8i8giwyxm7ndbahh4bsanfc8v19dl9kqs91wnzhsqv9vz2ds92vl5knnr5oq0yuk8iw3uyzc0t0fii21f5jvwcljltye68s9kj8tfnx9pyaor02y5iya7cxuhxvyy5dny2shxtaqrsyakem',
                resourceIds: [],
                width: 133478,
                height: 311258,
                fit: 'XXXX',
                sizes: { "foo" : "bar" },
                quality: 50,
                format: '4zq0vu59um',
            })
            .expect(400)
            .then(res => {
                expect(res.body.message).toContain('Value for AttachmentFamilyFit has to be any of this options: CROP, WIDTH, HEIGHT, WIDTH_FREE, HEIGHT_FREE');
            });
    });
    

    

    test(`/REST:POST admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .post('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                id: 'c55c5a51-9234-46d2-a605-607f524a679e',
                name: 'j9z0mnid9nx8gz4j46xr0afyc8kx6e6z1i64i74w7zd9eiv25btmlzueh0jtmln6e0u9cpbnmxe8pmqcpjchrjn6t1muumq5cuw506gsnpvymsprhsrh1bi4nogqvmg8nemgifda35roy16c5trk3cve9kqse1iff0chm2fpezvp695wpt3c2xkyo57r6r262xvrhsf99x61njjxi06rix7khdf20rqu4vnuss03f50b8o5cldz51m8lu9e4tx2',
                resourceIds: [],
                width: 393787,
                height: 503604,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 29,
                format: 'k2w49fotpl',
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
                        id: '0763232c-4638-4934-88fc-12d517a5fcc7'
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
                        id: 'c55c5a51-9234-46d2-a605-607f524a679e'
                    }
                }
            })
            .expect(200)
            .expect(repository.collectionResponse.find(item => item.id === 'c55c5a51-9234-46d2-a605-607f524a679e'));
    });

    test(`/REST:GET admin/attachment-family/{id} - Got 404 Not Found`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/718ddd67-ee17-484d-8153-c021d458af0e')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:GET admin/attachment-family/{id}`, () => 
    {
        return request(app.getHttpServer())
            .get('/admin/attachment-family/c55c5a51-9234-46d2-a605-607f524a679e')
            .set('Accept', 'application/json')
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c55c5a51-9234-46d2-a605-607f524a679e'));
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
                
                id: 'ffc8bbf6-5b8d-4fa4-a247-3a85e905f991',
                name: 'q10mjkzobop78lro9lbxht6o22i1e44uh3el2t1vbcgekczz472sd1t3zcztmatrb049rid3yy2lsnysgeqb81qnc6tuxvflvfk35ulvr0qw02rdsgvn6ahxth1oqi1rpk7gi1vg3lys1g9s4i0wyqzdm2sgh62z8vaxtzin80uog0841qv6jwts9rd37naavflg1udils07rutr5i49ax27ds58mih2n5mbwr2jai90g1llv9k9871gksiofuw',
                resourceIds: [],
                width: 495583,
                height: 264465,
                fit: 'HEIGHT',
                sizes: { "foo" : "bar" },
                quality: 21,
                format: 'qkreqijbmm',
            })
            .expect(404);
    });

    test(`/REST:PUT admin/attachment-family`, () => 
    {
        return request(app.getHttpServer())
            .put('/admin/attachment-family')
            .set('Accept', 'application/json')
            .send({
                
                id: 'c55c5a51-9234-46d2-a605-607f524a679e',
                name: 'xgy7tf0apkl5lkjmt4jw7c1rmhdqfhnnj8fl02m5a2uayt1odg2t1m4zpft6bx0sdpn9t84lhdv18xuh3u235uskuyn61fdoc536bdd9fs66viual6oy1kui87p6sis4no2nskyrpjlcp90f8h43oaup7uaakgrv8eefnimzz7cid6akqdl8uxe8e6k8nd9psz96kuj383v9mbayb63m8kj2iy75i18oe9miwfgu23algzk42cyf7y2yrqf7m6w',
                resourceIds: [],
                width: 338859,
                height: 175520,
                fit: 'WIDTH',
                sizes: { "foo" : "bar" },
                quality: 18,
                format: 'hh55ktuahs',
            })
            .expect(200)
            .expect(repository.collectionResponse.find(e => e.id === 'c55c5a51-9234-46d2-a605-607f524a679e'));
    });

    test(`/REST:DELETE admin/attachment-family/{id} - Got 404 Not Found`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/c0da56b8-559b-473a-98b8-72c2b023a1ec')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test(`/REST:DELETE admin/attachment-family/{id}`, () =>
    {
        return request(app.getHttpServer())
            .delete('/admin/attachment-family/c55c5a51-9234-46d2-a605-607f524a679e')
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
                        id: '2a9fb9eb-d940-4fbe-8968-84566f7dad27',
                        name: '32ucbb1h97n0sh38vawggfsycbwdqcq8zaw77y9ttjjndwgjcto2k1yqcj2l1dn8ppdzm8abn6jk3xxf00ssox60gl5dxpmt2gq8bzgc7p49yvk38hmcnwnpx2ikx7aeorsppuf1f1hr8eof7bjr7ymubads9b9xfuss2qa5twyx6kazljel61k3w4s1036zmjxdnz5folwmjr9mqisy0pt2bd53qguag0z2kp3e0zti2ag9ytz5wspxpkav3q5',
                        resourceIds: [],
                        width: 798024,
                        height: 577771,
                        fit: 'CROP',
                        sizes: { "foo" : "bar" },
                        quality: 21,
                        format: 'sgtn6ejg5l',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminCreateAttachmentFamily).toHaveProperty('id', '2a9fb9eb-d940-4fbe-8968-84566f7dad27');
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
                            id: '10e707d2-140a-462c-aa3d-051b7d95e852'
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
                            id: 'c55c5a51-9234-46d2-a605-607f524a679e'
                        }
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamily.id).toStrictEqual('c55c5a51-9234-46d2-a605-607f524a679e');
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
                    id: '19d4b7a4-8b24-499a-ada0-48eb2bf079df'
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
                    id: 'c55c5a51-9234-46d2-a605-607f524a679e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminFindAttachmentFamilyById.id).toStrictEqual('c55c5a51-9234-46d2-a605-607f524a679e');
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
                        
                        id: '937e7ce1-a3e2-42e3-bb7e-52affc937270',
                        name: 'zo5xlj7pv5lr026fpwmxblrpi4wg35t48iuptsqy390tm5bqtisr2fhf9kkldenk8m3z6bs4pvcwnpht5olywsy3d5o9mfaj82d5l1z14mjxmo065v52mockd8tby8ka9vg10to0c2ursnpii0j1f6kbmjrp642j4bcmopokvczwhsc7d66ipr7cywsiwgiorco7rxa5u5pgl03fg7nxp72nzc0fm9shwrb0mru51qlmpj71oh95s8yfwkuq89o',
                        resourceIds: [],
                        width: 656615,
                        height: 185539,
                        fit: 'WIDTH',
                        sizes: { "foo" : "bar" },
                        quality: 49,
                        format: '48479p7dip',
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
                        
                        id: 'c55c5a51-9234-46d2-a605-607f524a679e',
                        name: 'donxingfpi7r3ugo5ienlptx33hxrywc78rb8t8ca5d0i9lthez9h702aalub43p3c4bihhldu17kbqokkkvpwvn1kl0p7s2wlhr42be4tndpagdoi69p7hvcmqm0e0eq0sk6gktqcql0lmuhrltinfhh96adq3ypswabr9n2aq479d8kp6d87ha7279thkagia5msz5lwmc3p0w20pi6ez9q2icxstummkm1dv1kmg7y22i9bb7bp51ito2nrj',
                        resourceIds: [],
                        width: 357001,
                        height: 858021,
                        fit: 'CROP',
                        sizes: { "foo" : "bar" },
                        quality: 62,
                        format: 'n4zmj0c1xa',
                    }
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminUpdateAttachmentFamily.id).toStrictEqual('c55c5a51-9234-46d2-a605-607f524a679e');
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
                    id: 'a02f0262-0b07-4ac7-95f8-107cc1af5610'
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
                    id: 'c55c5a51-9234-46d2-a605-607f524a679e'
                }
            })
            .expect(200)
            .then(res => {
                expect(res.body.data.adminDeleteAttachmentFamilyById.id).toStrictEqual('c55c5a51-9234-46d2-a605-607f524a679e');
            });
    });

    afterAll(async () => 
    {
        await app.close();
    });
});