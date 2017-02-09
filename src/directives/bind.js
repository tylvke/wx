/**
 * Created by wangshuo on 2017/2/9.
 */
export default {
    bind(){

    },
    update(value){
        var attr=this.arg;
        if(attr){
            this.el.setAttribute(attr,value);
            this.el.removeAttribute(this.attr);
        }
    }
}