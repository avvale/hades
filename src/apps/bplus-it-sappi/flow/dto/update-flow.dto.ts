import { ApiProperty } from '@nestjs/swagger';

export class UpdateFlowDto 
{   
    
    @ApiProperty({
        type        : String,
        description : 'id [input here api field description]',
        example     : 'f7535896-33dd-443d-8c67-ebad67c40cc3'
    })
    id: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantId [input here api field description]',
        example     : '1bfe9550-9bec-48a0-973b-027e1c28664d'
    })
    tenantId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'tenantCode [input here api field description]',
        example     : '7dij34uy3pleq2e3gt0k415303cb9kn0js25upwrj2fkgw80rt'
    })
    tenantCode: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemId [input here api field description]',
        example     : 'd55f9b87-8235-4db1-8fee-6478dd366ca2'
    })
    systemId: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'systemName [input here api field description]',
        example     : '4p1tcjj2d44rzgvl8iy6'
    })
    systemName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'version [input here api field description]',
        example     : '02yq47d5cjb5cqgr0lob'
    })
    version: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'scenario [input here api field description]',
        example     : 'flsppgp4mglbkaejvolhjvy8novx23w0vfe2afx2qiek8gay2wlxu7jhamrm'
    })
    scenario: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'party [input here api field description]',
        example     : '1pvlljywjduw0t3qzanwbje6e6v2tdfusbbkl79l1qfmt7kc9if17tkklh6uxxp54aozoozz095x7f8zb5c39vftv0gxmmbzfzwq40ithaz0wsmcghxvxc6qyab5p5dottlsxfdo93x3ffupltx8wlu9bvang66r'
    })
    party: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'component [input here api field description]',
        example     : 'vt1geqr8722415x4unwujwukuke0g4fx9wt3ghmklc039r47m8cccr7w0aq083qjeraon78ez5ksjcp4zjzp0wokpl41emfo2rhhcssaut3wihvw6wgm44xfhzhi1ynq8qkxk8w0pcxzjoyzuk2vyq9pxb61qq8g'
    })
    component: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceName [input here api field description]',
        example     : 'u9v59asdo1969mewqrpn27vjf30gkyyorjtw5fcheli7vt88etnuo469rrct2fqcmjwz8bf122gax6dqfelkdx9i3rxvnxlb6c3ynkyhhsxfutjbt8ubkxvpco66mojzy9zhe94mgmltcrmepujv0vpwsbw24573'
    })
    interfaceName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'interfaceNamespace [input here api field description]',
        example     : '8kfgg0cfgrlw766ssa2hjptkw1klkv7j1bmkqacvbe748049uiqwsmeuwjaioexz0oth8p3nw4xj6xvlm3gbfjtyjpvgudmdpc9pq2du4jjo2stm3oadirste1rpe8egwj2866k4dm1wu67xk1p4y98tpcwknd5b'
    })
    interfaceNamespace: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'iflowName [input here api field description]',
        example     : 'hu49r7q6glbytjsyrrucqyrfgbcrz23rcl9i37xs8mjoxkadlqkwm6ji20zaw1dqp3rt12hai78b5ssdib2rcfl6t94pgfa6nknmisjzu9on07s7pylmuefrurjoiqe6p8rx1p45r9vt8w82yo4d0r7fe7ae36p9'
    })
    iflowName: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'responsibleUserAccount [input here api field description]',
        example     : 's48b0e1q1ivodhqti5w0'
    })
    responsibleUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangeUserAccount [input here api field description]',
        example     : '84rao75l01dplm7ns2us'
    })
    lastChangeUserAccount: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'lastChangedAt [input here api field description]',
        example     : '2020-07-27 04:35:06'
    })
    lastChangedAt: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'folderPath [input here api field description]',
        example     : '7afo1iquxmewhbkm3kb13u3v3n81c11unxsqkpfzzg1ejvsufq7st3b7o9kysfbr9husx891l5b4etzjclli7obg1utu2it1rzw5uq5nzfmy5cw6bvo0l6rpecsjdjc1w1tpmddu8u60di1ia6i37mv0x4v9kctzesn9r426dfuoe429dc8km948ck30nhajc807afyhvzjpvnoyrxdv9itd0ti690zadvc4ovp1ib3zr6bgiowu7pbsywue9vj'
    })
    folderPath: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'description [input here api field description]',
        example     : 'aokhe1f3wgrzfd4rdfbabsh8djz3zbi6lwjaptk5v2xxr4dl75cwvbvcyg0a0g996qoomv2ee2ksufkvu5z7qicsxsrsd4srajxow8187prz4ubq7wwcz4m043wv4q5ylmdjw51jizocgfp67rv8ybdugwnh5ukj4ysdxnxcwoxqxzur8s5csh9sh92btc0au7vb1kwc14yc6o0fj2g2u8ek9w1o55ywvfjpf664k1pk8gjd8sv6zaf698djw3w'
    })
    description: string;
    
    
    
    @ApiProperty({
        type        : String,
        description : 'application [input here api field description]',
        example     : 'kaakfwkj5xn3xiw1dpotz46scvjxaik1aels4i1hrjnsw8zswdxw0bd5zpan'
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
        example     : 'f1535e0b-2d7e-401b-bf49-4ffc0f31c9bc'
    })
    fieldGroupId: string;
    
    
    
    @ApiProperty({
        type        : Object,
        description : 'data [input here api field description]',
        example     : { "foo" : "bar" }
    })
    data: any;
    
    
}
