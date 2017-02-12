/**
 * Created by wangshuo on 2017/2/10.
 */
const vFor={
    bind(){
        var inMatch=this.expression.match(/(.*) in (.*)/);
        if(inMatch){
            this.expression=inMatch[2];
        }

    },
    update(data){
        this.diff(data);
    },
    diff (data) {
        var self=this;
        var innerHtml=this.el.innerHTML;
        var fragment=document.createDocumentFragment();
        for(var i=0,len=data.length;i<len;i++){
            var html=innerHtml.replace(/\{\{(.*)\}\}/,data[i]);
            var frag=this.el.cloneNode(true);
            frag.innerHTML=html;
            fragment.appendChild(frag);
        }
        this.el.parentNode.replaceChild(fragment,self.el);
    }
}
export default vFor;