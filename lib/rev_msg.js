var ModuleAddress = Process.findModuleByName('wechatwin.dll');
//console.log('ModAdress:' + ModAddress.base);
var hookAddress = ModuleAddress.base.add('0x3CCB75')
//console.log('hookAdress' + hookAddress.base)
Interceptor.attach(hookAddress, {
    onEnter: function (args) {
        //console.log(JSON.stringify(this.context));
        var edi = this.context.edi;
        //console.log('edi:' + Memory.readPointer(edi));
        var edi1 = Memory.readPointer(edi)
        var type = Memory.readPointer(edi1.add('0x30')).toInt32();
        var self = Memory.readPointer(edi1.add('0x34')).toInt32();
        var wxid = Memory.readUtf16String(Memory.readPointer(edi1.add('0x40')));
        var content = Memory.readUtf16String(Memory.readPointer(edi1.add('0x68')));
        // 群聊时 发送人的wxid
        var wxid2 = Memory.readUtf16String(Memory.readPointer(edi1.add('0x164')));
        // 发送消息
        send({'wxid': wxid, 'content': content, 'wxid2': wxid2, 'type': type, 'self': self})
    }
})