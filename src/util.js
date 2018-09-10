/**
 * Created by wangshuo on 2017/2/7.
 */
export function bind(fn,ctx) {
    return function (a) {
        var l=arguments.length;
        return l ? l>1?fn.apply(ctx,arguments):fn.call(ctx,a):fn.call(ctx);
    }
}

export function query(el) {
    el=typeof el ==='string' ? document.querySelector(el) : el;
    return el;
}

export function on(el,event,cb) {
    el.addEventListener(event,cb);
}

export function off(el,event,cb) {
    el.removeEventListener(event,cb);
}

export function extend(to,from) {
    var keys = Object.keys(from)
    var i = keys.length
    while (i--) {
        to[keys[i]] = from[keys[i]]
    }
    return to
}

export function def(obj,key,val,enumerable) {
    Object.defineProperty(obj,key,{
        val:val,
        enumerable:enumerable,
        writable:true,
        configurable:true
    })
}