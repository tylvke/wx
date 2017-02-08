/**
 * Created by wangshuo on 2017/2/8.
 */
let delimiters = /\{\{(.*)\}\}/;

export default {
    bind(){
        this.attr=this.el.nodeType===3
        ? 'data':'textContent';
    },
    update(value){
        this.el[this.attr]=this.rawVal.replace(delimiters,value || "");
    }
}