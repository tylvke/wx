/**
 * Created by wangshuo on 2017/2/7.
 */
var demo=new Wx({
    el:"#demo",
    data:{
        id:"username",
        name:"李鹏",
        age:20,
        students:["李帅","王明"]
    },
    methods:{
        changePeople:function () {
            this.name="小明";
            this.age=17;
            console.log("b")

        }
    },
    computed:{
        groupUp:function () {
            return this.age+1;
        }
    }
})
