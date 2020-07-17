import { ApiProperty } from '@nestjs/swagger';

export class CreateFlowDto 
{   
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'e10d268b-bd1e-45f2-9ded-8357f70b1b20'
    })
    id: string;
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '2ffdcc30-f31a-4219-b72f-7bbfd220a38b'
    })
    tenantId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : '51a15258-4069-4429-b84f-ad11c9664dd7'
    })
    systemId: string;
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : 'kq32u1wlzolc6vtbuu96'
    })
    systemName: string;
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : '6gl8zxgo3xud2yeg3rgge8la30e8u9axxre8gzkm3m3jw5hj6g9oxwfpsk8a'
    })
    scenario: string;
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : 'ai5c9iezwjlef3vrymbb1ady3ttrje4xr5swzj4dfwuk5n79us2d0gfdtlbjka9hu7qrvi64z6b3do02ho26ejfp8okqcaaxkieiebvj4aguzfoofdnn4hdg1sdkonaoe2v4vrku3hwk5f002qqrjfv64g9dviko'
    })
    party: string;
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : '9yczzs1p77friwy3qqod07ny9ln2fpdsd3kefmrnpyjxvzbtum7720hm4pjb3nsh20fqsc1iuatui49iz4z229aimdi2ldf2z7fo85e849ovvzj9tl2ujfvuiylquke2afnu0lm05r7gqa54yz1i4eshzb02nc1y'
    })
    component: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : '43p7mrvd3pzc5q94ua8nczhe631c27sueiq1yl8myt8v4p429dthnvavavfvumrqqxa1k9hgcaoviqkqepdkfsdr8i0k00ljea6k3cu1xx2yawrqj3kuiqqh1cbjbvmyx5es3d7w4nq2f3wnxclfz2muclcod62x'
    })
    interfaceName: string;
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : 'yg8eaf3ztf69lmdtr7nl1eacc59te4ze78w8tudc6ixvp3lla6rr7kr38lov01g3i3wklvov66v062kshop5i6543jo5sxxnsywhc66e6hanotomhv3qhqyp6s28vdrxw7hlehmlkx4mz56lcbwngt13iirn24p9'
    })
    interfaceNamespace: string;
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : '7vklpyjbanmnckkuscheowo840zquz95fjagr2ytzgycxh6k5t8gskml5ywfbz8odyg16l2382e79izcb1aqgl3fodetk9s5r5oo0os986km563ohqyrgvl6kb5m65zq7rvti4r5gfgcq87efofphw3805rrh4lu'
    })
    iflowName: string;
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 'jbg30chd9t4jlrtk7n68'
    })
    responsibleUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : 'u9efsh023qd2zfborwxw'
    })
    lastChangeUserAccount: string;
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-17 13:12:56'
    })
    lastChangedAt: string;
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : 'vuidtql1a4ynqnbc4usawwyqtkga0nxd7fdxvvoaxkbl29zdza4ebdfd1uc00hepqwqx59qenwk0ga0bvq2dxht7h2zeowwvp6nhpbwo1hjp5vfrpog24rdpxw8p0a7wp59y7xufwseyku320gnx63slv77u0sinqu2pysrv3b33vrnls3wdp00pmvnfsph2lb8fl57w0c0p1lyy4k21ygofks9t10dkqaxt8ms212sqizvsflkfs3zdho9go5g'
    })
    folderPath: string;
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'afh843rs3vd6qwe1u6ceu4boyp3g0zv3ipgecj5vva20l35bpdox78wbngdfh2fjdoym40uet9te3g81tlsqrfq43jgnaqmatblm4i62fyrwl8jtemc415icwmza4iubf7zyt0ooylskw3kdptmpyd95gt8ml9jo5h4ja2qq6gnzaf75ku4sz3fronnuej87apjqbfxjzcvjvy914tl8p01lzsd7cmh49fxme9500yjftbasdyyb79tj9acs6vk'
    })
    description: string;
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'rr9x6jvjejthuwgk5xf17xjaxshaybf3scpjwghzw89bi0f5q88booiw9kza'
    })
    application: string;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isCritical [input here api field description]',
        example     : false
    })
    isCritical: boolean;
    
    @ApiProperty({
        type        : Boolean,
        description : 'isComplex [input here api field description]',
        example     : false
    })
    isComplex: boolean;
    
    @ApiProperty({
        type        : String,
        description : 'fieldGroupId [input here api field description]',
        example     : '53822b83-7ad8-44cb-ac0c-b809c8ffb81d'
    })
    fieldGroupId: string;
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
}
