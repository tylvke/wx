/**
 * Created by wangshuo on 2017/2/7.
 */
var demo=new Wx({
    el:"#demo",
    data:{
        name:"wangshuo",
        id:"input",
        age:20
    },
    methods:{
        changeName:function () {
            this.name="xiaoxue";
            this.id="input1";
            this.age=22;
        }
    },
    computed:{
        groupUp:function () {
            return this.age+1;
        }
    }
})
