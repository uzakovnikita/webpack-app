async function start() {
   return await Promise.resolve('async is working')
}
start().then(console.log)
class Util {
   static id = Date.now();
}
import('lodash').then(_=>{
   console.log('lodash', _.random(0, 42, true));
})
console.log(Util.id);