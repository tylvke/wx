/**
 * Created by wangshuo on 2017/2/8.
 */
import text from './text'

const handlers={
    text
}
export default {
    bind(){
        var el=this.el;
        var tag=el.tagName;
        var handler;
        if(tag==='INPUT'){
            handler=handlers[el.type] || handler.text;
        }else if(tag==='SELECT'){
            handler=handlers.select;
        }else if(tag==='TEXTAREA'){
            handler=handlers.text;
        }else{
            return;
        }

        handler.bind.call(this);

        this.update=handler.update;
    }
}