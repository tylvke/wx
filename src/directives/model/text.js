/**
 * Created by wangshuo on 2017/2/8.
 */
export default {
    bind(){
        var self=this;
        var el=this.el;

        this.listener=function () {
            var val=el.value;
            self.set(val);
        }

        this.on('change',this.listener);
        this.on('keyup',this.listener);
    },
    update(value){
        this.el.value=value || "";
    }
}