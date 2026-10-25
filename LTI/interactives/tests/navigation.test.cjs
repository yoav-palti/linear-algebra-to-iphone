const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
function setup(bounds){
  const buttons=new Map(),events=new Map(),pending=[],pointerEvents=new Map(),captured=new Set(),timers=new Map();let box=bounds.slice(),toolbar,corners,selecting=false;
  const classList={add(){},remove(){},toggle(){}};
  const element=()=>({classList,setAttribute(name,value){this[name]=value;},appendChild(){},addEventListener(name,callback){if(name==='click')buttons.set(this['aria-label'],{element:this,callback});}});
  const sandbox={window:{},document:{createElement:element},queueMicrotask:callback=>pending.push(callback),setTimeout:callback=>{const id={};timers.set(id,callback);return id;},clearTimeout:id=>timers.delete(id)};
  const source=fs.readFileSync(path.join(__dirname,'../runtime.html'),'utf8');
  vm.runInNewContext(source.match(/<script>([\s\S]*?)<\/script>/)[1],sandbox);
  const board={unitX:20,unitY:50,getBoundingBox:()=>box.slice(),setBoundingBox:value=>{box=Array.from(value);events.get("boundingbox")?.();},on:(name,callback)=>events.set(name,callback),startSelectionMode(){selecting=true;},stopSelectionMode(){selecting=false;return corners;}};
  const container={after:value=>{toolbar=value;},classList,addEventListener:(name,callback)=>pointerEvents.set(name,callback),
    getBoundingClientRect:()=>({left:10,top:20,width:400,height:200}),setPointerCapture:id=>captured.add(id),hasPointerCapture:id=>captured.has(id),releasePointerCapture:id=>captured.delete(id)};
  sandbox.window.CourseInteractives.navigation(board,container);
  const pointer=(type,values={})=>{const event={button:2,buttons:2,pointerId:7,pointerType:'mouse',clientX:310,clientY:70,preventDefault(){this.prevented=true;},stopImmediatePropagation(){this.consumed=true;},...values};pointerEvents.get(type)(event);return event;};
  return {disabled:title=>buttons.get(title).element.disabled,change:value=>board.setBoundingBox(value),event:name=>events.get(name)(),flush:()=>{while(pending.length)pending.shift()();for(const [id,callback] of timers){timers.delete(id);callback();}},click:title=>buttons.get(title).callback(),bounds:()=>box,toolbar,pointer,captured:()=>captured.size,select:(a,b,afterRelease)=>{corners=[{usrCoords:[1,...a]},{usrCoords:[1,...b]}];events.get('stopselecting')();board.stopSelectionMode();if(afterRelease)afterRelease();while(pending.length)pending.shift()();},selecting:()=>selecting,pressed:title=>buttons.get(title).element['aria-pressed'],buttonCount:()=>buttons.size};
}
test('native rectangle selection zooms in either drag direction and home restores the original bounds',()=>{
  const initial=[-5.6,.7,5.6,-.1],view=setup(initial);
  view.click('בחירת אזור להגדלה');view.select([2,-.1],[-2,.6]);
  assert.deepEqual(view.bounds(),[-2,.6,2,-.1]);
  assert.equal(view.selecting(),true);
  view.click('תצוגת הבית');assert.deepEqual(view.bounds(),initial);
  assert.equal(view.selecting(),false);
  assert.equal(view.pressed('הזזה בגרירה'),'true');
});
test('a click or thin selection does not collapse the axes, and pan cancels selection mode',()=>{
  const initial=[0,2,20,-2],view=setup(initial);
  view.click('בחירת אזור להגדלה');view.select([2,1],[2.01,-1]);assert.deepEqual(view.bounds(),initial);
  view.click('הזזה בגרירה');assert.equal(view.selecting(),false);assert.equal(view.pressed('בחירת אזור להגדלה'),'false');
  assert.equal(view.buttonCount(),4);
});
test('selection affects only the selected graph',()=>{
  const a=setup([0,2,20,-2]),b=setup([-5,1,5,0]);
  a.click('בחירת אזור להגדלה');a.select([2,1],[10,-1]);
  assert.deepEqual(b.bounds(),[-5,1,5,0]);
  assert.equal(a.toolbar.role,'group');
});
test('magnifier remains active for consecutive selections after JSXGraph mouse-up cleanup',()=>{
  const view=setup([0,2,20,-2]);view.click('בחירת אזור להגדלה');
  view.select([2,1],[15,-1]);assert.equal(view.selecting(),true);
  view.select([4,.5],[10,-.5]);assert.equal(view.selecting(),true);
  assert.deepEqual(view.bounds(),[4,.5,10,-.5]);assert.equal(view.pressed('בחירת אזור להגדלה'),'true');
});
test('pending reactivation cannot override a switch back to pan',()=>{
  const view=setup([0,2,20,-2]);view.click('בחירת אזור להגדלה');
  view.select([2,1],[15,-1],()=>view.click('הזזה בגרירה'));
  assert.equal(view.selecting(),false);assert.equal(view.pressed('הזזה בגרירה'),'true');
});
test('right dragging scales x and y independently with Matplotlib direction and a fixed anchor',()=>{
  const initial=[-2,3,18,-1],view=setup(initial);
  view.pointer('pointerdown');view.pointer('pointermove',{clientX:410});
  const horizontal=view.bounds();
  assert.ok(horizontal[2]-horizontal[0]<20);assert.equal(horizontal[1],3);assert.equal(horizontal[3],-1);
  // Pressed point is (13,2), at 75% of width and 25% of height from the top.
  assert.ok(Math.abs((13-horizontal[0])/(horizontal[2]-horizontal[0])-.75)<1e-12);
  view.pointer('pointermove',{clientY:20});
  const vertical=view.bounds();assert.equal(vertical[0],-2);assert.equal(vertical[2],18);
  assert.ok(vertical[1]-vertical[3]<4);assert.ok(Math.abs((vertical[1]-2)/(vertical[1]-vertical[3])-.25)<1e-12);
  view.pointer('pointermove',{clientX:210,clientY:120});const expanded=view.bounds();
  assert.ok(expanded[2]-expanded[0]>20);assert.ok(expanded[1]-expanded[3]>4);
  view.pointer('pointerup',{clientX:900,clientY:-200});assert.equal(view.captured(),0);
  const released=view.bounds();view.pointer('pointermove',{clientX:500});assert.deepEqual(view.bounds(),released);
  view.click('תצוגת הבית');assert.deepEqual(view.bounds(),initial);
});
test('right scaling is restricted to hand mode and safely ends on cancellation or lost buttons',()=>{
  const view=setup([0,2,20,-2]);
  assert.equal(view.pointer('pointerdown',{button:0,buttons:1}).consumed,undefined);
  view.click('בחירת אזור להגדלה');assert.equal(view.pointer('pointerdown').consumed,undefined);
  view.click('הזזה בגרירה');assert.equal(view.pointer('pointerdown').consumed,true);assert.equal(view.captured(),1);
  assert.equal(view.pointer('contextmenu').prevented,true);
  view.pointer('pointercancel');assert.equal(view.captured(),0);
  view.pointer('pointerdown');view.pointer('pointermove',{buttons:0});assert.equal(view.captured(),0);
  view.pointer('pointerdown');view.pointer('pointermove',{clientX:1e9,clientY:-1e9});assert.ok(view.bounds().every(Number.isFinite));
  view.click('תצוגת הבית');assert.equal(view.captured(),0);assert.deepEqual(view.bounds(),[0,2,20,-2]);
});

test('undo walks through zoom, scaling and home without changing the selected tool',()=>{
  const initial=[0,2,20,-2],view=setup(initial),undo='ביטול שינוי תצוגה';
  assert.equal(view.disabled(undo),true);
  view.click('בחירת אזור להגדלה');view.select([2,1],[10,-1]);
  view.click(undo);assert.deepEqual(view.bounds(),initial);assert.equal(view.selecting(),true);
  assert.equal(view.disabled(undo),true);
  view.select([2,1],[10,-1]);const zoomed=view.bounds().slice();
  view.click('הזזה בגרירה');view.pointer('pointerdown');
  view.pointer('pointermove',{clientX:350});view.pointer('pointermove',{clientX:410});view.pointer('pointerup');
  const scaled=view.bounds().slice();
  view.click('תצוגת הבית');view.click(undo);assert.deepEqual(view.bounds(),scaled);
  view.click(undo);assert.deepEqual(view.bounds(),zoomed);
  view.click(undo);assert.deepEqual(view.bounds(),initial);assert.equal(view.disabled(undo),true);
});
test('pan gestures and wheel bursts each form one undo step, including an unsettled wheel burst',()=>{
  const initial=[0,2,20,-2],view=setup(initial),undo='ביטול שינוי תצוגה';
  view.event('down');view.change([1,2,21,-2]);view.change([2,2,22,-2]);view.event('up');view.flush();
  view.change([3,1,21,-1]);view.change([4,.5,20,-.5]);view.flush();
  view.click(undo);assert.deepEqual(view.bounds(),[2,2,22,-2]);
  view.change([4,1,20,-1]);view.click(undo);assert.deepEqual(view.bounds(),[2,2,22,-2]);
  view.click(undo);assert.deepEqual(view.bounds(),initial);
  view.event('down');view.event('up');view.flush();assert.equal(view.disabled(undo),true);
});
