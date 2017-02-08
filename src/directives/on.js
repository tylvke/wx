/**
 * Created by wangshuo on 2017/2/7.
 */
import {
    on,
    off
} from '../util'

export default {
    acceptStatement: true,
    bind(){

    },
    update(handler){
        on(this.el,this.arg,handler);
    }
}