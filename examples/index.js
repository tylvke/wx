/**
 * Created by wangshuo on 2017/2/7.
 */
var demo=new Wx({
    el:"#demo",
    data:{
        name:"wangshuo"
    },
    methods:{
        changeName:function () {
            this.name="xiaoxue";
            console.log(this.name)
        }
    }
})
