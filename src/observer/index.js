/**
 * Created by wangshuo on 2017/2/8.
 */
import Dep from './dep'
export default function Observer(value) {
    this.value=value;
    if(Object.prototype.toString.call(value) === "[object Array]"){
        this.observeArray(value);
    }
    else{
        this.walk(value);
    }
}

Observer.prototype.walk=function (value) {
    var self=this;
    Object.keys(value).forEach(function (key) {
        self.convert(key,value[key]);
    })
}

Observer.prototype.observeArray=function (value) {
    for(var i=0,len=value.length;i<len;i++){
        observe(value[i]);
    }
}

Observer.prototype.convert=function (key,val) {
    defineReactive(this.value,key,val);
}

export function defineReactive(obj,key,value) {
    var dep=new Dep();

    var childObj=observe(value);

    Object.defineProperty(obj,key,{
        enumerable:true,
        configurable:true,
        get:function () {
            if(Dep.target){
                dep.depend();
                return value;
            }
        },
        set:function (newVal) {
            if(newVal===value)return;
            value=newVal;
            childObj=observe(value);
            dep.notify();
        }
    })
}

export function observe(value,vm) {
    if(!value || typeof value!=='object')return;
    return new Observer(value);
}