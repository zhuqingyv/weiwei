(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.sol_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("sol");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag+FWQgNAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJANAAIB+AAQAMAAAJAJQAIAJAAAMIAAJvQAAANgIAIQgJAJgMAAg");
	this.shape.setTransform(9.325,34.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D25E50").s().p("Ag+FWQgNAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJANAAIB+AAQAMAAAJAJQAIAJAAAMIAAJvQAAANgIAIQgJAJgMAAg");
	this.shape_1.setTransform(9.325,34.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,18.7,68.4);


(lib.si_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("si");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag+FWQgNAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJANAAIB9AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape.setTransform(9.325,34.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#D25E50").ss(0.1,1,1).p("AA/FWIh9AAQgNAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJANAAIB9AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape_1.setTransform(9.325,34.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D24D34").s().p("Ag+FWQgNAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJANAAIB9AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape_2.setTransform(9.325,34.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,20.7,70.4);


(lib.re_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("re");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag+FWQgNAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJANAAIB9AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape.setTransform(9.325,34.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D25E50").s().p("Ag+FWQgNAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJANAAIB9AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape_1.setTransform(9.325,34.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,18.7,68.4);


(lib.mi_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("mi");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag/FWQgMAAgJgJQgIgIAAgNIAApvQAAgMAIgJQAJgJAMAAIB+AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape.setTransform(9.325,34.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D25E50").s().p("Ag/FWQgMAAgJgJQgIgIAAgNIAApvQAAgMAIgJQAJgJAMAAIB+AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape_1.setTransform(9.325,34.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,18.7,68.4);


(lib.la_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("la");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag/FWQgMAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJAMAAIB+AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape.setTransform(9.325,34.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D24D34").s().p("Ag/FWQgMAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJAMAAIB+AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape_1.setTransform(9.325,34.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,18.7,68.4);


(lib.fa_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("fa");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag+FWQgNAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJANAAIB9AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape.setTransform(9.325,34.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#D24D34").s().p("Ag+FWQgNAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJANAAIB9AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape_1.setTransform(9.325,34.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,18.7,68.4);


(lib._do_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("_do");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag+FWQgNAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJANAAIB9AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape.setTransform(9.325,34.175);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#D24D34").ss(0.1,1,1).p("AA/FWIh9AAQgNAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJANAAIB9AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape_1.setTransform(9.325,34.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D25E50").s().p("Ag+FWQgNAAgIgJQgJgIAAgNIAApvQAAgMAJgJQAIgJANAAIB9AAQANAAAIAJQAJAJAAAMIAAJvQAAANgJAIQgIAJgNAAg");
	this.shape_2.setTransform(9.325,34.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape_1}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,20.7,70.4);


(lib.sol_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("ssol");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231916").s().p("AgqDhQgHAAgGgGQgGgGAAgIIAAmZQAAgIAGgGQAGgFAHAAIBVAAQAHAAAGAFQAGAGAAAIIAAGZQAAAJgGAFQgFAGgIAAg");
	this.shape.setTransform(6.2,22.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#77311E").s().p("AgpDhQgJgBgFgFQgGgGAAgIIAAmZQAAgIAGgFQAFgHAJAAIBTAAQAIAAAHAHQAFAFAAAIIAAGZQAAAIgFAGQgGAFgJABg");
	this.shape_1.setTransform(6.2,22.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,12.4,44.9);


(lib.re_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("sre");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231916").s().p("AgpDhQgJAAgFgGQgGgGAAgIIAAmZQAAgIAGgGQAGgFAIAAIBUAAQAIAAAFAFQAGAGAAAIIAAGZQAAAIgGAGQgFAGgIAAg");
	this.shape.setTransform(6.225,22.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#77311E").s().p("AgpDhQgJgBgFgFQgGgGAAgIIAAmZQAAgIAGgFQAGgHAIAAIBUAAQAIAAAFAHQAGAFAAAIIAAGZQAAAIgGAGQgFAFgIABg");
	this.shape_1.setTransform(6.225,22.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,12.5,44.9);


(lib.la_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("sla");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231916").s().p("AgpDhQgJAAgFgGQgGgGAAgIIAAmZQAAgIAGgGQAGgFAIAAIBTAAQAIAAAGAFQAGAGAAAIIAAGZQAAAIgGAGQgFAGgJAAg");
	this.shape.setTransform(6.225,22.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#77311E").s().p("AgpDhQgJgBgFgFQgGgGAAgIIAAmZQAAgIAGgFQAGgHAIAAIBTAAQAIAAAGAHQAGAFAAAIIAAGZQAAAIgGAGQgFAFgJABg");
	this.shape_1.setTransform(6.225,22.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,12.5,44.9);


(lib.fa_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("sfa");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(1));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231916").s().p("AgqDhQgHAAgGgGQgGgGAAgIIAAmZQAAgIAGgGQAGgFAHAAIBVAAQAHAAAGAFQAGAGAAAIIAAGZQAAAJgGAFQgFAGgIAAg");
	this.shape.setTransform(6.2,22.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#77311E").s().p("AgpDhQgJgBgFgFQgGgGAAgIIAAmZQAAgIAGgFQAFgHAJAAIBTAAQAIAAAHAHQAFAFAAAIIAAGZQAAAIgFAGQgGAFgJABg");
	this.shape_1.setTransform(6.2,22.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,12.4,44.9);


(lib._do_2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_2 = function() {
		playSound("re");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(2).call(this.frame_2).wait(2));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231916").s().p("AgpDhQgJgBgFgFQgGgGAAgIIAAmZQAAgIAGgFQAFgHAJAAIBTAAQAIAAAHAHQAFAFAAAIIAAGZQAAAIgFAGQgGAFgJABg");
	this.shape.setTransform(6.2,22.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#77311E").s().p("AgpDhQgJgBgFgFQgGgGAAgIIAAmZQAAgIAGgFQAFgHAJAAIBTAAQAIAAAHAHQAFAFAAAIIAAGZQAAAIgFAGQgGAFgJABg");
	this.shape_1.setTransform(6.2,22.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,12.4,44.9);


// stage content:
(lib.全音 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {"do":1,sdo:6,re:11,sre:15,mi:20,fa:24,sfa:28,sol:33,ssol:38,la:43,sla:48,si:53};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		
		
		var _this = this;
		
		
		_this.do1.on('click', function(){
		
		_this.gotoAndStop('do');
			
		});
		
		
		_this.re1.on('click', function(){
		
		_this.gotoAndStop('re');
			
		});
		
		
		_this.mi1.on('click', function(){
		
		_this.gotoAndStop('mi');
			
		});
		
		
		_this.fa1.on('click', function(){
		
		_this.gotoAndStop('fa');
			
		});
		
		
		_this.sol1.on('click', function(){
		
		_this.gotoAndStop('sol');
			
		});
		
		
		_this.la1.on('click', function(){
		
		_this.gotoAndStop('la');
			
		});
		
		
		_this.si1.on('click', function(){
		
		_this.gotoAndStop('si');
			
		});
		
		
		
		_this.sdo1.on('click', function(){
		
		_this.gotoAndStop('sdo');
			
		});
		
		
		
		
		_this.sfa1.on('click', function(){
		
		_this.gotoAndStop('sfa');
			
		});
		
		
		_this.ssol1.on('click', function(){
		
		_this.gotoAndStop('ssol');
			
		});
		
		_this.sla1.on('click', function(){
		
		_this.gotoAndStop('sla');
			
		});
		
		
		
		
		
		var _this = this;
		/*
		双击指定元件实例以执行相应函数。
		*/
		_this.sre.on('click', function(){
		/*
		将播放头移动到时间轴中的指定帧标签并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('sre');
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(56));

	// 左右遮罩 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EiP5BONMAAAicZMEfzAAAMAAACcZg");
	mask.setTransform(959.925,564.975);

	// 图层_11
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,255,0.847)").s().p("AhBBvQgcgPgPgdQgQgeAAgmQABgnAQgcQARgcAcgPQAcgQAiAAQAjABAcAPQAcAPARAcQAQAcABAnQgBAngPAdQgQAdgcAQQgcAPglAAQglAAgcgQgAAkBVQANgcAAg5QAAg5gNgbQgMgcgYABQgXgBgNAcQgNAbAAA5QAAA5ANAcQANAcAXgBQAYABAMgcg");
	this.shape.setTransform(630.325,827.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.847)").s().p("AhTCrQgXgPgNgcQgOgdAAgoQAAgpAPgbQAOgeAZgOQAYgPAfgBQATAAAOAIQAQAHANAPIAAhvIgkgEIAAgMIBjgTIAHAFIgCBGIAAERIAcABIAAAOIheAFIgDgbQgOAOgRAIQgQAIgUgBQgdAAgYgOgAgbgeQgOAJgIAVQgIAVgBAkQABAjAHAWQAIAVANAKQAOAKAQAAQAJgBAIgCQAJgDAIgGIAAiqQgIgGgIgDQgIgDgIAAQgQAAgOAJg");
	this.shape_1.setTransform(601.675,821.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,255,0.847)").s().p("AgyBWQgVgMgMgXQgMgWAAgdQAAgeANgWQANgWAVgMQAWgLAagBQAbABAWALQAWAMAMAWQANAVAAAfQAAAdgMAXQgMAWgVAMQgWAMgdABQgcgBgWgMgAgbhBQgKAVAAAsQAAAsAKAVQAJAWASAAQASAAAKgWQAKgVAAgsQAAgsgKgVQgKgVgSAAQgSAAgJAVg");
	this.shape_2.setTransform(682.975,681.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,255,0.847)").s().p("AhACEQgSgMgKgWQgLgVAAgfQABggALgWQALgVATgMQATgMAYAAQAOAAALAGQAMAFAKAMIAAhWIgcgDIAAgJIBNgPIAFAEIgBA2IAADSIAWACIAAAKIhJAFIgCgVQgLAKgNAGQgNAGgPAAQgXAAgSgLgAgVgXQgLAHgGAQQgGAPAAAdQAAAcAGAQQAGARAKAHQAKAIAMgBQAIAAAGgCQAHgBAGgGIAAiCQgGgGgGgCQgHgBgGAAQgMgBgLAHg");
	this.shape_3.setTransform(660.875,677.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,255,0.847)").s().p("AALB8IAKhAIg9AAIgJBAIgRAAIAKhAIgsAAIAAglIAyAAIAHguIgsAAIAAglIAxAAIAKg/IAQAAIgKA/IA9AAIAJg/IARAAIgJA/IAtAAIAAAlIgzAAIgHAuIAtAAIAAAlIgyAAIgKBAgAgiAXIA8AAIAIguIg9AAg");
	this.shape_4.setTransform(638.575,678.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,255,255,0.847)").s().p("Ag0BxQgcgQgQgcQgQgcgBgpQAAgfALgXQAKgZATgPQARgRAXgHQAWgJAXAAQAhABAXANQAWANAMAWQAMAXAAAcIgBAPIgCAMIiVAAQACAiAKAVQAKAVAQALQARAJAVABQAXgBAPgIQAPgKALgPIAJAFQgOAdgaAPQgZAPgiAAQgjAAgdgOgAgXhZQgNAWgCAzIA7AAQAPABAGgJQAGgJgBgUQAAgdgLgPQgLgOgSAAIgBAAQgRAAgMAWg");
	this.shape_5.setTransform(746.225,827.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,255,255,0.847)").s().p("AhoB8IAAgOIAegDIAAgdIABgfIAAgcIAAgjIgBgZIAAgUIgBgUIghgDIAAgLIBggcIAGAFIAEA/QAFgXAMgPQALgPANgHQAOgIANAAQAQAAALAIQAMAHAEAUQgBAPgIAKQgIAKgQABQgMgBgJgHQgJgHgJgMIgEgFQgNAMgJAQQgIAQgFAYIAAAjIAAAcIAAAeIAAAdIAoAEIAAAOg");
	this.shape_6.setTransform(723.225,826.8735);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(255,255,255,0.847)").s().p("AgnBXQgWgMgNgWQgMgWgBgfQAAgYAJgSQAIgSAOgNQANgMASgGQARgHARAAQAaABARAKQASAKAJASQAJARAAAWIAAALIgCAJIhzAAQABAaAIARQAIAQAMAIQANAIAQgBQASAAAMgGQAMgHAIgMIAHAEQgLAWgUAMQgTALgaABQgcAAgVgMgAgShFQgJASgCAnIAtAAQAMAAAFgGQAEgHAAgQQgBgWgIgLQgJgMgNAAIgBAAQgNAAgKARg");
	this.shape_7.setTransform(828.725,681.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(255,255,255,0.847)").s().p("AhQBgIAAgLIAXgCIABgWIAAgZIAAgVIAAgbIAAgTIgBgQIAAgPIgagDIAAgIIBKgVIAEADIAEAxQAEgSAIgLQAJgMAKgGQALgGAKAAQAMAAAJAGQAKAGACAPQgBAMgFAIQgHAHgMABQgKAAgGgGQgIgFgHgKIgCgEQgLAKgGAMQgHAMgDATIAAAbIAAAVIAAAYIAAAWIAeADIAAALg");
	this.shape_8.setTransform(810.95,681.575);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(255,255,255,0.847)").s().p("Ag9C1IAAgNIAdgDIAAgdIAAgfIAAgdIAAgjIAAgYIAAgVIgBgVIghgDIAAgLIBkgaIAGAFIgCBFIAABEIAAAcIABAfIAAAdIAbADIAAANgAgYh3QgKgKgBgPQABgRAKgJQALgKAPAAQAQAAALAKQALAJAAARQAAAPgLAKQgLAKgQAAQgPAAgLgKg");
	this.shape_9.setTransform(882.2,821.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(255,255,255,0.847)").s().p("ABaB8IAAgOIAagDIABgcIAAgfIAAgdIAAg6QAAgdgHgLQgIgLgQABQgLAAgNAGQgMAHgMANIABAMIAAANIAAA5IABAdIAAAfIABAdIAYACIAAAOIh7AAIAAgOIAcgDIAAgcIABgfIAAgdIAAg6QgBgbgHgMQgHgMgQABQgMAAgMAGQgMAHgMAMIAABTIAAAcIAAAgIAAAdIAaACIAAAOIh/AAIAAgOIAdgDIAAgdIABgfIAAgcIAAgjIgBgZIAAgUIgBgUIgggEIAAgKIBfgcIAGAFIADAnQATgXATgKQATgLAXAAQAYAAAQALQAQAMAHAXQAVgaAUgKQAUgKAUAAQAlAAASAVQARAWAAAtIAAA2IAAAdIAAAfIABAcIAaADIAAAOg");
	this.shape_10.setTransform(851.75,826.8738);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(255,255,255,0.847)").s().p("AAhB1QgNgJgEgSQgLAMgKAIQgKAJgNAEQgMAFgSAAQgdAAgRgQQgSgQAAgcQAAgUAJgPQAIgOAVgMQAUgKAkgKIAUgGIAWgGIAAgbQAAgWgEgNQgEgNgJgGQgKgFgQAAIgJAAIgKACIgDAfQgBAWgJAKQgKAKgNAAQgMAAgIgGQgHgGgDgLQADgfAcgSQAcgSAzAAQAtgBAVAWQAVAWgBAvIAAB2QAAAMAEAFQAEAFAGAAQAFAAAEgEQAFgDAGgKIAHAHQgIARgNAJQgOAIgVAAQgVAAgNgLgAAAgJIgJAEQgYAIgMAQQgMAQAAAYQABAUAIAJQAJAKAQAAQAIAAAJgFQAIgFAMgKIAAhbIgOAEgAhPhkIAHgDg");
	this.shape_11.setTransform(988.325,827.2494);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(255,255,255,0.847)").s().p("AhmC4IAAgNIAegDIABgsIAAgsIAAh1IgiAAIAAgOIAjgEQAEglALgXQALgXAPgNQATgRATgIQAUgHAVAAQAUAAAQAHQAPAIAFASQAAANgIAIQgIAIgPABQgNAAgKgIQgLgHgIgTIgHgNIgGAEIgEAFQgMAQgDAZQgDAZABAlIA5AAIAAASIg4AAIAAB1IAAArIABAsIAoAEIAAANg");
	this.shape_12.setTransform(968.075,820.8484);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(255,255,255,0.847)").s().p("AAaBbQgKgIgEgOIgPAQQgIAHgKADQgKAEgNAAQgXgBgNgMQgOgMAAgWQAAgPAHgLQAGgMAQgJQAQgHAbgIIAQgEIARgFIAAgVQAAgRgDgKQgEgLgGgEQgHgEgNAAIgHABIgIABIgCAYQgBARgHAIQgHAHgKAAQgKAAgGgEQgGgFgCgIQACgZAWgNQAVgOAogBQAjAAAQARQAQARAAAkIAABbQAAAJADAEQACAEAFAAQAEAAADgDQAEgCAFgIIAFAFQgGAOgKAGQgLAHgQAAQgQgBgKgHgAAAgHIgHADQgSAGgJANQgJAMAAATQAAAPAGAHQAHAHAMAAQAHABAHgEQAFgEAKgIIAAhGIgLADgAg9hOIAFgCg");
	this.shape_13.setTransform(1041.4483,681.875);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(255,255,255,0.847)").s().p("AhPCOIAAgKIAYgCIAAgjIAAgiIAAhZIgaAAIAAgLIAbgDQADgdAJgSQAJgRALgLQAOgNAPgGQAPgFARAAQAQAAAMAFQAMAGADAOQAAAKgGAGQgHAHgLAAQgKAAgIgGQgIgFgHgPIgFgKIgFADIgDAEQgIANgEATQgBATABAdIArAAIAAAOIgrAAIAABZIAAAiIAAAiIAgADIAAAKg");
	this.shape_14.setTransform(1025.8,676.925);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(255,255,255,0.847)").s().p("AhCC2IAAgOIAfgDIABgsIAAgsIAAjgIgggDIAAgMIBhgTIAHAEIgCBHIAAC3IAAAsIABAsIAeADIAAAOg");
	this.shape_15.setTransform(1124.2,821.075);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(255,255,255,0.847)").s().p("Ag4B6QgVgFgTgLIADg9IAcAAIAOA7QAIADAJABQAJACAKAAQAYAAAOgJQANgIAAgTQAAgJgDgHQgEgJgJgGQgKgGgRgFIgZgIQgegJgQgQQgRgSAAgcQAAgXAMgTQAMgRAWgLQAWgKAgAAQAWAAASAGQATAEATAKIgEA3IgYAAIgRgzQgHgEgHgBQgIgCgKAAQgTAAgMAKQgMAJAAARQgBAMAJAKQAKAJAYAIIAaAIQAiAKAQASQARASgBAbQAAAngcAVQgdAWgxgBQgaABgVgGg");
	this.shape_16.setTransform(1077.0257,827.25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(255,255,255,0.847)").s().p("AgyCMIAAgKIAXgCIABgjIAAgiIAAitIgZgCIAAgJIBLgPIAFAEIgBA3IAACMIAAAiIABAjIAXACIAAAKg");
	this.shape_17.setTransform(1185.825,677.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(255,255,255,0.847)").s().p("AgrBeQgQgEgPgIIADgvIAVAAIALAtIANAEQAHABAIAAQASAAALgHQAKgGAAgPQAAgHgDgGQgDgGgHgEQgHgFgNgFIgTgFQgYgHgMgNQgNgNAAgWQAAgSAJgOQAJgOARgIQASgHAYgBQAQAAAPAEQAOAEAPAIIgDAqIgTAAIgNgoIgLgDQgGgCgHAAQgPAAgJAIQgJAHgBANQAAAJAHAIQAHAIATAGIAUAGQAaAIANANQAMAOAAAVQAAAegWAQQgWAQgmABQgUAAgQgFg");
	this.shape_18.setTransform(1149.475,681.875);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(255,255,255,0.847)").s().p("AhCC2IAAgOIAfgDIAAgsIABgsIAAjgIgggDIAAgMIBhgTIAHAEIgDBHIAAC3IABAsIABAsIAeADIAAAOg");
	this.shape_19.setTransform(1206.9,821.075);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(255,255,255,0.847)").s().p("Ag9C1IAAgNIAdgDIABgdIAAgfIAAgdIAAgjIAAgYIgBgVIgBgVIgggDIAAgLIBjgaIAHAFIgCBFIAABEIAAAcIAAAfIABAdIAbADIAAANgAgYh3QgLgKAAgPQAAgRALgJQALgKAOAAQARAAAKAKQALAJABARQgBAPgLAKQgKAKgRAAQgOAAgLgKg");
	this.shape_20.setTransform(1349.8,821.1);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13,this.shape_14,this.shape_15,this.shape_16,this.shape_17,this.shape_18,this.shape_19,this.shape_20];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape,p:{x:630.325}}]},1).to({state:[{t:this.shape_4,p:{x:638.575}},{t:this.shape_3},{t:this.shape_2,p:{x:682.975}}]},5).to({state:[{t:this.shape_6},{t:this.shape_5}]},5).to({state:[{t:this.shape_4,p:{x:791.025}},{t:this.shape_8},{t:this.shape_7}]},4).to({state:[{t:this.shape_10},{t:this.shape_9}]},5).to({state:[{t:this.shape_12},{t:this.shape_11,p:{x:988.325}}]},4).to({state:[{t:this.shape_4,p:{x:1006.125}},{t:this.shape_14},{t:this.shape_13,p:{x:1041.4483}}]},4).to({state:[{t:this.shape_16,p:{x:1077.0257}},{t:this.shape,p:{x:1102.075}},{t:this.shape_15}]},5).to({state:[{t:this.shape_4,p:{x:1129.875}},{t:this.shape_18},{t:this.shape_2,p:{x:1168.775}},{t:this.shape_17,p:{x:1185.825}}]},5).to({state:[{t:this.shape_19},{t:this.shape_11,p:{x:1228.525}}]},5).to({state:[{t:this.shape_4,p:{x:1274.875}},{t:this.shape_17,p:{x:1291.825}},{t:this.shape_13,p:{x:1308.5983}}]},5).to({state:[{t:this.shape_16,p:{x:1331.0757}},{t:this.shape_20}]},5).wait(3));

	// 标记
	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#D24D34").s().p("AhmCZIAAiTIDQAAIAACSIggAAIAAgLIiSAAIAAAMgAhIBzICSAAIAAgeIiSAAgAhIA9ICSAAIAAgdIiSAAgAiRgSIAAgbIBNAAQgCgKgEgLQgFgLgFgJIAegHQAHALAFANQAFANACAKIgEABIBKAAQAGgLAFgNIAJgZIi2AAIAAgbIBzAAIgFgNIgHgNIAfgFIAIAPIAHAQIBtAAIAAAbIhIAAIAfAIIgLAVIgKAUIBNAAIAAAbg");
	this.shape_21.setTransform(529.625,353.25);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#D24D34").s().p("AiKCVIAAgcIB7AAIAAgvIhRAAIAAgbIBRAAIAAguIhUAAIAAgUIgRAKIgSAJIgJgNIgNgMQAfgNAcgTQAdgTAYgXQAYgXAQgaIAaANIgCAEIgDAEQAeAiAjAZQAjAZAnATIgLAMQgGAHgDAGIgSgKIgRgKIAAAUIhVAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABbgZQgZgRgWgTQgXgTgVgYQgSAXgYATQgXAUgZARIC1AAIAAAAg");
	this.shape_22.setTransform(496.65,352.775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FAEDEA").s().p("An2HEQhbAAhAhBQhBhAAAhbIAAnPQAAhbBBhAQBAhBBbAAIPtAAQBbAABABBQBBBAAABbIAAHPQAABbhBBAQhABBhbAAg");
	this.shape_23.setTransform(513.1527,352.7459,0.5716,0.5491);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#D24D34").s().p("AhmCZIAAiTIDQAAIAACSIggAAIAAgLIiSAAIAAAMgAhIBzICSAAIAAgeIiSAAgAhIA9ICSAAIAAgdIiSAAgAiRgSIAAgbIBNAAQgCgKgEgLQgFgLgFgJIAegHQAHALAFANQAFANACAKIgEABIBKAAQAGgLAFgNIAJgZIi2AAIAAgbIBzAAIgFgNIgHgNIAfgFIAIAPIAHAQIBtAAIAAAbIhIAAIAfAIIgLAVIgKAUIBNAAIAAAbg");
	this.shape_24.setTransform(684.525,353.25);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#D24D34").s().p("AiKCVIAAgcIB6AAIAAgvIhQAAIAAgbIBQAAIAAguIhTAAIAAgUIgRAKIgSAJIgJgNIgMgMQAdgNAdgTQAdgTAYgXQAYgXAQgaIAaANIgCAEIgDAEQAdAiAkAZQAjAZAnATIgLAMQgGAHgDAGIgSgKIgSgKIAAAUIhUAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABbgZQgZgRgWgTQgXgTgVgYQgSAXgYATQgXAUgZARIC1AAIAAAAg");
	this.shape_25.setTransform(651.55,352.775);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FAEDEA").s().p("An2HEQhbAAhAhBQhBhAAAhbIAAnPQAAhbBBhAQBAhBBbAAIPtAAQBbAABABBQBBBAAABbIAAHPQAABbhBBAQhABBhbAAg");
	this.shape_26.setTransform(668.0527,352.7459,0.5716,0.5491);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#D24D34").ss(6,1,1).p("ABBEfQAojNCdidQDUjTEsAAQEsAADUDTQCdCdApDNA3LEfQAojNCdidQDUjTEsAAQEsAADUDTQCdCdApDN");
	this.shape_27.setTransform(590.55,417.675);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#D24D34").s().p("AhmCZIAAiSIDQAAIAACSIggAAIAAgMIiSAAIAAAMgAhIBzICSAAIAAgeIiSAAgAhIA9ICSAAIAAgdIiSAAgAiRgRIAAgcIBNAAQgCgJgEgMQgFgLgFgKIAegGQAHALAFANQAFANACAKIgEABIBKAAQAGgLAFgNIAJgZIi2AAIAAgbIBzAAIgFgNIgHgNIAfgFIAIAPIAHAQIBtAAIAAAbIhIAAIAfAHIgLAWIgKAUIBNAAIAAAcg");
	this.shape_28.setTransform(595.525,355.35);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#D24D34").s().p("AiKCVIAAgcIB6AAIAAgvIhQAAIAAgbIBQAAIAAguIhTAAIAAgUIgSAKIgRAJIgKgNIgLgMQAegNAcgTQAcgTAZgXQAXgXASgaIAaANIgDAEIgDAEQAdAiAkAZQAjAZAnATIgLAMQgGAHgDAGIgSgKIgSgKIAAAUIhUAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABbgZQgZgRgWgTQgXgTgVgYQgSAXgYATQgXAUgZARIC1AAIAAAAg");
	this.shape_29.setTransform(562.55,354.875);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#D24D34").s().p("AhmCZIAAiSIDQAAIAACSIggAAIAAgMIiSAAIAAAMgAhIBzICSAAIAAgeIiSAAgAhIA9ICSAAIAAgdIiSAAgAiRgRIAAgcIBNAAQgCgJgEgMQgFgLgFgKIAegGQAHALAFANQAFANACAKIgEABIBKAAQAGgLAFgNIAJgZIi2AAIAAgbIBzAAIgFgNIgHgNIAfgFIAIAPIAHAQIBtAAIAAAbIhIAAIAfAHIgLAWIgKAUIBNAAIAAAcg");
	this.shape_30.setTransform(750.425,355.35);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#D24D34").s().p("AiKCVIAAgcIB6AAIAAgvIhQAAIAAgbIBQAAIAAguIhTAAIAAgUIgSAKIgSAJIgJgNIgLgMQAegNAcgTQAcgTAYgXQAYgXASgaIAaANIgDAEIgEAEQAeAiAkAZQAjAZAoATIgMAMQgGAHgDAGIgSgKIgSgKIAAAUIhUAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABbgZQgZgRgXgTQgWgTgVgYQgTAXgXATQgXAUgZARIC1AAIAAAAg");
	this.shape_31.setTransform(717.45,354.875);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#D24D34").ss(6,1,1).p("ABBEfQAojNCdidQDUjTEsAAQEsAADTDTQCeCdApDNA3LEfQAojNCdidQDUjTEsAAQEsAADTDTQCeCdApDN");
	this.shape_32.setTransform(656.45,419.775);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#D24D34").s().p("AiKCVIAAgcIB6AAIAAgvIhQAAIAAgbIBQAAIAAguIhTAAIAAgUIgSAKIgSAJIgIgNIgMgMQAegNAcgTQAcgTAYgXQAYgXASgaIAaANIgDAEIgDAEQAdAiAkAZQAjAZAnATIgLAMQgGAHgDAGIgSgKIgSgKIAAAUIhUAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABbgZQgYgRgXgTQgXgTgVgYQgSAXgYATQgXAUgZARIC1AAIAAAAg");
	this.shape_33.setTransform(793.4,354.875);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#D24D34").ss(6,1,1).p("ABBEfQAojNCdidQDUjTEsAAQEsAADUDTQCdCdApDNA3LEfQAojNCdidQDUjTEsAAQEsAADTDTQCeCdApDN");
	this.shape_34.setTransform(732.4,419.775);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#D24D34").s().p("AiKCVIAAgcIB6AAIAAgvIhQAAIAAgbIBQAAIAAguIhTAAIAAgUIgRAKIgSAJIgJgNIgNgMQAfgNAcgTQAdgTAYgXQAYgXAQgaIAaANIgCAEIgDAEQAeAiAjAZQAjAZAnATIgLAMQgGAHgDAGIgSgKIgSgKIAAAUIhUAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABbgZQgZgRgWgTQgXgTgVgYQgSAXgYATQgXAUgZARIC1AAIAAAAg");
	this.shape_35.setTransform(714.45,354.875);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#D24D34").s().p("AiKCVIAAgcIB7AAIAAgvIhQAAIAAgbIBQAAIAAguIhUAAIAAgUIgSAKIgSAJIgJgNIgMgMQAegNAdgTQAdgTAXgXQAZgXARgaIAZANIgCAEIgEAEQAfAiAjAZQAjAZAoATIgMAMQgGAHgDAGIgSgKIgRgKIAAAUIhVAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABcgZQgZgRgYgTQgWgTgVgYQgTAXgWATQgYAUgZARIC2AAIAAAAg");
	this.shape_36.setTransform(774.9,354.875);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#D24D34").s().p("AiKCVIAAgcIB7AAIAAgvIhQAAIAAgbIBQAAIAAguIhUAAIAAgUIgRAKIgSAJIgJgNIgNgMQAegNAdgTQAcgTAZgXQAXgXARgaIAaANIgCAEIgEAEQAfAiAjAZQAjAZAoATIgMAMQgGAHgDAGIgSgKIgRgKIAAAUIhVAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABcgZQgagRgXgTQgWgTgVgYQgSAXgXATQgYAUgZARIC2AAIAAAAg");
	this.shape_37.setTransform(929.8,354.875);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#D24D34").ss(6,1,1).p("A3LEfQAojNCdidQDUjTEsAAQEsAADUDTQCdCdApDNABBEfQAojNCdidQDUjTEsAAQEsAADUDTQCdCdApDN");
	this.shape_38.setTransform(868.8,419.775);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#D24D34").s().p("AiKCVIAAgcIB7AAIAAgvIhQAAIAAgbIBQAAIAAguIhUAAIAAgUIgSAKIgSAJIgJgNIgMgMQAegNAdgTQAdgTAXgXQAZgXAQgaIAaANIgCAEIgEAEQAfAiAjAZQAjAZAoATIgMAMQgGAHgDAGIgSgKIgRgKIAAAUIhVAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABcgZQgZgRgYgTQgWgTgVgYQgTAXgWATQgYAUgZARIC2AAIAAAAg");
	this.shape_39.setTransform(858.6,354.875);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#D24D34").ss(6,1,1).p("A3LEfQAojNCdidQDUjTEsAAQEsAADTDTQCeCdApDNABBEfQAojNCdidQDUjTEsAAQEsAADTDTQCeCdApDN");
	this.shape_40.setTransform(952.5,419.775);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#D24D34").s().p("AiKCVIAAgcIB7AAIAAgvIhQAAIAAgbIBQAAIAAguIhUAAIAAgUIgRAKIgSAJIgJgNIgNgMQAegNAdgTQAcgTAZgXQAXgXARgaIAaANIgCAEIgEAEQAfAiAjAZQAjAZAnATIgLAMQgGAHgDAGIgSgKIgRgKIAAAUIhVAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABcgZQgagRgXgTQgWgTgVgYQgSAXgXATQgYAUgZARIC2AAIAAAAg");
	this.shape_41.setTransform(922.15,354.875);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#D24D34").s().p("AiKCVIAAgcIB7AAIAAgvIhQAAIAAgbIBQAAIAAguIhUAAIAAgUIgRAKIgSAJIgJgNIgNgMQAfgNAcgTQAcgTAZgXQAXgXARgaIAaANIgCAEIgEAEQAfAiAjAZQAjAZAnATIgLAMQgGAHgDAGIgSgKIgRgKIAAAUIhVAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABcgZQgagRgWgTQgXgTgVgYQgSAXgYATQgXAUgZARIC2AAIAAAAg");
	this.shape_42.setTransform(1077.05,354.875);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#D24D34").ss(6,1,1).p("A3LEfQAojNCdidQDUjTEsAAQEsAADUDTQCdCdApDNABBEfQAojNCdidQDUjTEsAAQEsAADTDTQCeCdApDN");
	this.shape_43.setTransform(1016.05,419.775);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#D24D34").s().p("AiKCVIAAgcIB6AAIAAgvIhPAAIAAgbIBPAAIAAguIhTAAIAAgUIgSAKIgSAJIgJgNIgLgMQAegNAcgTQAcgTAYgXQAZgXARgaIAaANIgDAEIgEAEQAeAiAkAZQAjAZAoATIgMAMQgGAHgDAGIgSgKIgSgKIAAAUIhUAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABbgZQgYgRgYgTQgWgTgVgYQgTAXgWATQgYAUgZARIC1AAIAAAAg");
	this.shape_44.setTransform(996.55,354.875);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#D24D34").s().p("AiKCVIAAgcIB7AAIAAgvIhQAAIAAgbIBQAAIAAguIhUAAIAAgUIgSAKIgSAJIgJgNIgMgMQAegNAdgTQAdgTAXgXQAZgXARgaIAaANIgDAEIgEAEQAeAiAkAZQAjAZAoATIgMAMQgGAHgDAGIgSgKIgRgKIAAAUIhVAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABbgZQgYgRgYgTQgWgTgVgYQgTAXgWATQgYAUgZARIC1AAIAAAAg");
	this.shape_45.setTransform(1151.45,354.875);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#D24D34").s().p("AiKCVIAAgcIB6AAIAAgvIhQAAIAAgbIBQAAIAAguIhTAAIAAgUIgSAKIgSAJIgJgNIgLgMQAegNAcgTQAcgTAYgXQAYgXASgaIAaANIgDAEIgEAEQAeAiAkAZQAjAZAnATIgLAMQgGAHgDAGIgSgKIgSgKIAAAUIhUAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABbgZQgZgRgWgTQgXgTgVgYQgTAXgXATQgXAUgZARIC1AAIAAAAg");
	this.shape_46.setTransform(1058.55,354.875);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#D24D34").s().p("AiKCVIAAgcIB6AAIAAgvIhPAAIAAgbIBPAAIAAguIhTAAIAAgUIgSAKIgSAJIgJgNIgLgMQAegNAcgTQAcgTAYgXQAZgXARgaIAaANIgDAEIgEAEQAeAiAkAZQAjAZAoATIgMAMQgGAHgDAGIgSgKIgSgKIAAAUIhUAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABbgZQgYgRgYgTQgWgTgVgYQgTAXgXATQgXAUgZARIC1AAIAAAAg");
	this.shape_47.setTransform(1213.45,354.875);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#D24D34").s().p("AiKCVIAAgcIB6AAIAAgvIhQAAIAAgbIBQAAIAAguIhTAAIAAgUIgRAKIgTAJIgJgNIgLgMQAdgNAdgTQAcgTAYgXQAZgXAQgaIAbANIgDAEIgDAEQAdAiAkAZQAjAZAnATIgLAMQgGAHgDAGIgSgKIgSgKIAAAUIhUAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABbgZQgZgRgWgTQgXgTgVgYQgSAXgYATQgXAUgZARIC1AAIAAAAg");
	this.shape_48.setTransform(1281.65,354.875);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#D24D34").s().p("AiKCVIAAgcIB7AAIAAgvIhQAAIAAgbIBQAAIAAguIhUAAIAAgUIgRAKIgTAJIgJgNIgMgMQAegNAdgTQAdgTAXgXQAZgXAQgaIAaANIgCAEIgEAEQAeAiAkAZQAjAZAnATIgLAMQgGAHgDAGIgSgKIgRgKIAAAUIhVAAIAAAuIBTAAIAAAbIhTAAIAAAvIB8AAIAAAcgABcgZQgZgRgYgTQgWgTgVgYQgSAXgXATQgYAUgZARIC2AAIAAAAg");
	this.shape_49.setTransform(1201.15,354.875);

	var maskedShapeInstanceList = [this.shape_21,this.shape_22,this.shape_23,this.shape_24,this.shape_25,this.shape_26,this.shape_27,this.shape_28,this.shape_29,this.shape_30,this.shape_31,this.shape_32,this.shape_33,this.shape_34,this.shape_35,this.shape_36,this.shape_37,this.shape_38,this.shape_39,this.shape_40,this.shape_41,this.shape_42,this.shape_43,this.shape_44,this.shape_45,this.shape_46,this.shape_47,this.shape_48,this.shape_49];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_27,p:{x:590.55,y:417.675}},{t:this.shape_26,p:{x:668.0527,y:352.7459}},{t:this.shape_25,p:{x:651.55,y:352.775}},{t:this.shape_24},{t:this.shape_23,p:{x:513.1527,y:352.7459}},{t:this.shape_22},{t:this.shape_21}]},1).to({state:[{t:this.shape_32,p:{x:656.45}},{t:this.shape_26,p:{x:733.9527,y:354.8459}},{t:this.shape_31},{t:this.shape_30,p:{x:750.425}},{t:this.shape_23,p:{x:579.0527,y:354.8459}},{t:this.shape_29},{t:this.shape_28,p:{x:595.525}}]},5).to({state:[{t:this.shape_34},{t:this.shape_26,p:{x:809.9027,y:354.8459}},{t:this.shape_33},{t:this.shape_30,p:{x:826.375}},{t:this.shape_23,p:{x:655.0027,y:354.8459}},{t:this.shape_25,p:{x:638.5,y:354.875}},{t:this.shape_28,p:{x:671.475}}]},5).to({state:[{t:this.shape_32,p:{x:808.35}},{t:this.shape_26,p:{x:885.8527,y:354.8459}},{t:this.shape_25,p:{x:869.35,y:354.875}},{t:this.shape_30,p:{x:902.325}},{t:this.shape_23,p:{x:730.9527,y:354.8459}},{t:this.shape_35,p:{x:714.45}},{t:this.shape_28,p:{x:747.425}}]},4).to({state:[{t:this.shape_38,p:{x:868.8}},{t:this.shape_26,p:{x:946.3027,y:354.8459}},{t:this.shape_37,p:{x:929.8}},{t:this.shape_30,p:{x:962.775}},{t:this.shape_23,p:{x:791.4027,y:354.8459}},{t:this.shape_36},{t:this.shape_28,p:{x:807.875}}]},5).to({state:[{t:this.shape_40},{t:this.shape_26,p:{x:1030.0027,y:354.8459}},{t:this.shape_37,p:{x:1013.5}},{t:this.shape_30,p:{x:1046.475}},{t:this.shape_23,p:{x:875.1027,y:354.8459}},{t:this.shape_39},{t:this.shape_28,p:{x:891.575}}]},4).to({state:[{t:this.shape_43},{t:this.shape_26,p:{x:1093.5527,y:354.8459}},{t:this.shape_42,p:{x:1077.05}},{t:this.shape_30,p:{x:1110.025}},{t:this.shape_23,p:{x:938.6527,y:354.8459}},{t:this.shape_41},{t:this.shape_28,p:{x:955.125}}]},4).to({state:[{t:this.shape_38,p:{x:1090.45}},{t:this.shape_26,p:{x:1167.9527,y:354.8459}},{t:this.shape_45},{t:this.shape_30,p:{x:1184.425}},{t:this.shape_23,p:{x:1013.0527,y:354.8459}},{t:this.shape_44},{t:this.shape_28,p:{x:1029.525}}]},5).to({state:[{t:this.shape_27,p:{x:1152.45,y:419.775}},{t:this.shape_26,p:{x:1229.9527,y:354.8459}},{t:this.shape_47},{t:this.shape_30,p:{x:1246.425}},{t:this.shape_23,p:{x:1075.0527,y:354.8459}},{t:this.shape_46},{t:this.shape_28,p:{x:1091.525}}]},5).to({state:[{t:this.shape_32,p:{x:1220.65}},{t:this.shape_26,p:{x:1298.1527,y:354.8459}},{t:this.shape_48,p:{x:1281.65}},{t:this.shape_30,p:{x:1314.625}},{t:this.shape_23,p:{x:1143.2527,y:354.8459}},{t:this.shape_35,p:{x:1126.75}},{t:this.shape_28,p:{x:1159.725}}]},5).to({state:[{t:this.shape_32,p:{x:1295.05}},{t:this.shape_26,p:{x:1372.5527,y:354.8459}},{t:this.shape_42,p:{x:1356.05}},{t:this.shape_30,p:{x:1389.025}},{t:this.shape_23,p:{x:1217.6527,y:354.8459}},{t:this.shape_49},{t:this.shape_28,p:{x:1234.125}}]},5).to({state:[{t:this.shape_32,p:{x:1360.15}},{t:this.shape_26,p:{x:1437.6527,y:354.8459}},{t:this.shape_48,p:{x:1421.15}},{t:this.shape_30,p:{x:1454.125}},{t:this.shape_23,p:{x:1282.7527,y:354.8459}},{t:this.shape_35,p:{x:1266.25}},{t:this.shape_28,p:{x:1299.225}}]},5).wait(3));

	// 标记色
	this.sre1 = new lib.re_2();
	this.sre1.name = "sre1";
	this.sre1.setTransform(809.65,579.9,6.2539,6.2539,0,0,0,6.2,22.5);
	new cjs.ButtonHelper(this.sre1, 0, 1, 2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#77311E").s().p("AkHV8Qg1AAgjgiQglglAAgzMAAAgoDQAAgPADgOQAIgfAagYQAmgmAyAAIIPAAQAyAAAmAmQAaAYAIAgQADANAAAPMAAAAoDQAAAzglAlQgjAig1AAg");
	this.shape_50.setTransform(448.375,579.55);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#D25E50").s().p("EgPkAhZQhPAAg1g1Qg4g1AAhOMAAAg8+QAAhOA4g0QA1g5BPAAIHOAAQgDAOAAAPMAAAAoCQAAAzAlAlQAjAiAyABIGOAAIAAVfQAABOg5A1Qg1A1hOAAgEADPAhZQhPAAg1g1Qg4g1AAhOIAA1fIBgAAQA1gBAjgiQAigjABg1MAAAgoCQAAgQgEgOILKAAQgDAOAAAPMAAAAoDQgBAzAmAlQAiAiA1AAIB0AAIAAVgQAABOg4A1Qg1A1hPAAg");
	this.shape_51.setTransform(676.45,662.25);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#77311E").s().p("AHdV8Qg1AAgjgiQglglAAgzMAAAgoDQAAgyAlgiQAmgmAyAAIITAAQAyAAAjAmQAmAiAAAyMAAAAoDQAAAzgmAlQgjAigyAAgAvtV8Qg0AAgjgiQgmglAAgzMAAAgoDQAAgyAmgiQAlgmAyAAIIUAAQAyAAAjAmQAlAiAAAyMAAAAoDQAAAzglAlQgjAigyAAg");
	this.shape_52.setTransform(735.7,579.55);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#D25E50").s().p("EgGLAhZQhOAAg1g1Qg4g1AAhOIAA1gIFuAAQA1AAAigiQAmgmAAgyMAAAgoDQAAgPgEgNIHqAAQBPAAA1A4QA4A1AABOMAAAA8+QAABOg4A1Qg1A1hPAAg");
	this.shape_53.setTransform(496.525,662.275);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#D25E50").s().p("EgZAAhZQhOAAg1g1Qg5g1AAhOMAAAg8+QAAhOA5g0QA1g5BOAAIHPAAQgDAOgBAPMAAAAoCQAAAzAmAlQAjAiAyABIGNAAIAAVfQAABOg4A1Qg2A1hOAAgEAMnAhZQhPAAg1g1Qg1g1AAhOIAA1gIF3AAQAyAAAjgiQAmglAAgzMAAAgoDIAAgCIAAgCIgCgLIAAgEIgCgKIHlAAQBOAAA2A5QA4A1AABOMAAAA8+QAABOg4A1Qg2A1hOAAgEgGMAhZQhOAAg2g1Qg4g1AAhOIAA1fIBhAAQA1gBAjgiQAigjAAg1MAAAgoCQAAgQgDgOILIAAQgDAOAAAPMAAAAoDQAAAzAlAlQAjAiA1AAIB0AAIAAVgQAABOg4A1Qg1A1hPAAg");
	this.shape_54.setTransform(736.8,662.25);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#77311E").s().p("AHbV8QgyAAgigiQgmglABgyMAAAgoEIAAgBIAAgBIAAgCIAAgBQAAgMADgLQAIggAagYQAigmAyAAIIUAAQAyAAAmAmQAiAiAAAyMAAAAoEQAAAmgSAdQgHALgJAJQgiAig2AAgAvrV8Qg1AAgjgiQglgmAAgyMAAAgoDQAAgyAlgiQAmgmAyAAIIUAAQAxAAAjAmQAlAiAAAyMAAAAoDQAAAyglAmQgjAigxAAg");
	this.shape_55.setTransform(735.55,579.575);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#D25E50").s().p("EgGKAhZQhPAAg1g1Qg4g1AAhOMAAAg8+QAAhOA4g1QA1g4BPAAIHEAAQgDALAAAMIAAABIAAABIAAACIAAABMAAAAoEQAAAyAlAlQAjAiAxAAIGXAAIAAVgQAABOg4A1Qg1A1hOAAg");
	this.shape_56.setTransform(977.7,662.225);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#77311E").s().p("AkJV8QgyAAgigiQgmgmAAgyMAAAgoDIAAgBIAAgBIAAgCIAAgBQABgMADgLQAHggAbgYQAigmAyAAIITAAQAyAAAmAmQAiAiAAAyMAAAAoDQAAAngSAdQgHALgJAJQgjAig1AAg");
	this.shape_57.setTransform(1021.975,579.6);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#D25E50").s().p("EADNAhZQhPAAg1g1Qg1g1AAhOIAA1gIF3AAQAyAAAjgiQAmglAAgyMAAAgoEIAAgBIAAgCIgCgMIAAgDIgCgKIHlAAQBOAAA2A4QA4A1AABOMAAAA8+QAABOg4A1Qg2A1hOAAgEgPmAhZQhOAAg2g1Qg4g1AAhOIAA1fIBhAAQA1AAAjgjQAigiAAg1MAAAgoDQAAgPgDgOILJAAQgDANAAAPMAAAAoEQAAAyAlAlQAjAiA1AAIB0AAIAAVgQAABOg4A1Qg1A1hPAAg");
	this.shape_58.setTransform(797,662.225);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#D25E50").s().p("EADPAhZQhPAAg1g1Qg5g1ABhOIAA1gIBXAAQA1AAAjgiQAigiAAg1MAAAgoEQAAgPgDgNII6AAQgDANAAAPMAAAAoEQAAAyAlAlQAiAiAyAAIEQAAIAAVgQAABOg1A1Qg5A1hKAAgEgPkAhZQhPAAg1g1Qg4g1AAhOMAAAg8+QAAhOA4g1QA1g4BPAAIHFAAQgDALAAAMIAAABIAAABIAAACIAAABMAAAAoEQAAAyAlAlQAjAiAxAAIGXAAIAAVgQAABOg4A1Qg1A1hOAAg");
	this.shape_59.setTransform(1037.9,662.225);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#77331E").s().p("AkJV8QgyAAgigiQgmgmAAgyMAAAgoDIAAgBIAAgBIAAgCIAAgBQABgMADgLQAHggAbgYQAigmAyAAIITAAQAyAAAmAmQAiAiAAAyMAAAAoDQAAAngSAdQgHALgJAJQgjAig1AAg");
	this.shape_60.setTransform(1155.825,579.6);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#D25E50").s().p("EgGOAhZQhOAAg1g1Qg1g1AAhOIAA1gIF3AAQAyAAAjgiQAlglAAgyMAAAgoEIAAgBIAAgCIgBgMIAAgDIgCgKIHkAAQBOAAA1A4QA4A1AABOMAAAA8+QAABOg4A1Qg1A1hOAAg");
	this.shape_61.setTransform(857.35,662.225);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#D25E50").s().p("EAMnAhZQhMAAg0g1Qg5g1AAhOIAA1gIDcAAQA0AAAjgiQAigiAAg1MAAAgoEQAAgPgDgNIJGAAQgDANAAAPMAAAAoEQAAAyAlAlQAjAiA1AAIB8AAIAAVgQAABOg4A1Qg1A1hOAAgEgGMAhZQhPAAg0g1Qg5g1AAhOIAA1gIBXAAQA2AAAjgiQAhgiAAg1MAAAgoEQAAgPgDgNII5AAQgDANAAAPMAAAAoEQAAAyAlAlQAjAiAyAAIEQAAIAAVgQAABOg2A1Qg4A1hLAAgEgZAAhZQhOAAg1g1Qg4g1AAhOMAAAg8+QAAhOA4g1QA1g4BOAAIHFAAQgDALAAAMIAAABIAAABIAAACIAAABMAAAAoEQAAAyAmAlQAiAiAyAAIGWAAIAAVgQAABOg3A1Qg2A1hOAAg");
	this.shape_62.setTransform(1098.25,662.225);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#77311E").s().p("AQ3V8QgyAAgjgiQglglAAgyMAAAgoEQAAgPAEgNQAHggAagYQAjgmAyAAIIUAAQAxAAAmAmQAbAbAGAkIABAVMAAAAoEQABA1gjAiQgjAig0AAgA5KV8QgxAAgjgiQgmglAAgyMAAAgoEQAAgPAEgNQAIggAagYQAjgmAxAAIIUAAQAyAAAmAmQAbAbAFAkIACAVMAAAAoEQAAA1giAiQgjAig1AAgAkPV8QgyAAgjgiQglgmAAgyMAAAgoDQAAgPADgOQAIgfAagYQAjgmAyAAIITAAQAyAAAlAmQAbAaAGAkIABAWMAAAAoDQAAA1giAjQgjAig0AAg");
	this.shape_63.setTransform(1156.45,579.575);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#D25E50").s().p("EAMqAhZQhOAAg1g1Qg5g1AAhOIAA1gIFvAAQA0AAAjgiQAmglAAgzMAAAgoDQgBgPgDgNIHrAAQBPAAA1A5QA4A0AABOMAAAA8+QAABOg4A1Qg1A1hPAAgEgGMAhZQhMAAg0g1Qg5g1AAhOIAA1gIDcAAQA0AAAjgiQAigjAAg1MAAAgoDQAAgPgDgOIJFAAQgDAOAAAPMAAAAoDQAAAzAlAlQAjAiA1AAIB8AAIAAVgQAABOg4A1Qg1A1hOAAgEgZAAhZQhPAAg0g1Qg5g1AAhOIAA1gIBXAAQA2AAAjgiQAhgjAAg1MAAAgoDQAAgPgDgOII6AAQgDAOAAAPMAAAAoDQAAAzAlAlQAjAiAyAAIEQAAIAAVgQAABOg2A1Qg4A1hLAAg");
	this.shape_64.setTransform(1218.65,662.25);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("rgba(210,94,80,0.659)").s().p("EgGLAhZQhOAAg1g1Qg4g1AAhOMAAAg8+QAAhOA4g1QA1g4BOAAIHPAAQgEANAAAPMAAAAoDQAAAyAmAmQAiAiAyAAIGNAAIAAVgQAABOg4A1Qg1A1hPAAg");
	this.shape_65.setTransform(1459.925,662.275);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#77311E").s().p("AurV8Qg1AAgigiQgmglAAgyMAAAgoEQAAgPAEgNQAHggAbgYQAlgmAyAAIIRAAQAyAAAlAmQAbAYAIAgQADAOAAAOMAAAAoEQAAAygmAlQgiAig1AAgAGbV8Qg1AAgigiQgmgmAAgyMAAAgoDQAAgPAEgOQAHgfAbgYQAlgmAyAAIIRAAQAyAAAlAmQAbAYAIAgQADANAAAPMAAAAoDQAAAygmAmQgiAig1AAg");
	this.shape_66.setTransform(1223.525,579.575);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("rgba(255,255,255,0.149)").s().p("EgGLAhZQhOAAg1g1Qg4g1AAhOMAAAg8+QAAhOA4g1QA1g4BOAAIHMAAQgEANAAAPMAAAAoEQAAAyAmAlQAiAiA1AAIGNAAIAAVgQAABOg4A1Qg1A1hPAAg");
	this.shape_67.setTransform(1459.925,662.275);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#D25E50").s().p("EADPAhZQhOAAg2g1Qg4g1AAhOIAA1gIFuAAQA1AAAigiQAmglAAgzMAAAgoDQAAgPgDgNIHqAAQBPAAA1A5QA4A0AABOMAAAA8+QAABOg4A1Qg1A1hPAAgEgPoAhZQhLAAg1g1Qg5g1ABhOIAA1gIDbAAQA1AAAjgiQAigjAAg1MAAAgoDQAAgPgDgOIJGAAQgEAOABAPMAAAAoDQAAAzAlAlQAjAiA1AAIB8AAIAAVgQAABOg5A1Qg1A1hNAAg");
	this.shape_68.setTransform(1279,662.25);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#77311E").s().p("ACFV8ImMAAQg1AAgjgiQglgmAAgyMAAAgoDQAAgPADgNQAIggAagYQAmgmAyAAIIPAAQAyAAAmAmQAaAYAIAgQADANAAAPMAAAAoDQAAAyglAmQgjAig1AAg");
	this.shape_69.setTransform(1504.975,579.6);

	var maskedShapeInstanceList = [this.sre1,this.shape_50,this.shape_51,this.shape_52,this.shape_53,this.shape_54,this.shape_55,this.shape_56,this.shape_57,this.shape_58,this.shape_59,this.shape_60,this.shape_61,this.shape_62,this.shape_63,this.shape_64,this.shape_65,this.shape_66,this.shape_67,this.shape_68,this.shape_69];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_51},{t:this.shape_50},{t:this.sre1}]},1).to({state:[{t:this.shape_53},{t:this.shape_52}]},5).to({state:[{t:this.shape_54}]},5).to({state:[{t:this.shape_56},{t:this.shape_55}]},4).to({state:[{t:this.shape_58},{t:this.shape_57,p:{x:1021.975}}]},5).to({state:[{t:this.shape_57,p:{x:809.675}},{t:this.shape_59}]},4).to({state:[{t:this.shape_61},{t:this.shape_60}]},4).to({state:[{t:this.shape_62}]},5).to({state:[{t:this.shape_63}]},5).to({state:[{t:this.shape_64}]},5).to({state:[{t:this.shape_66},{t:this.shape_65}]},5).to({state:[{t:this.shape_69},{t:this.shape_68},{t:this.shape_67}]},5).wait(3));

	// 键盘
	this.sre = new lib.re_2();
	this.sre.name = "sre";
	this.sre.setTransform(809.7,579.9,6.2539,6.2539,0,0,0,6.2,22.5);
	new cjs.ButtonHelper(this.sre, 0, 1, 2);

	this.sla1 = new lib.la_2();
	this.sla1.name = "sla1";
	this.sla1.setTransform(1290.9,579.9,6.2539,6.2539,0,0,0,6.2,22.5);
	new cjs.ButtonHelper(this.sla1, 0, 1, 2);

	this.ssol1 = new lib.sol_2();
	this.ssol1.name = "ssol1";
	this.ssol1.setTransform(1155.8,579.9,6.2539,6.2539,0,0,0,6.2,22.5);
	new cjs.ButtonHelper(this.ssol1, 0, 1, 2);

	this.sfa1 = new lib.fa_2();
	this.sfa1.name = "sfa1";
	this.sfa1.setTransform(983.2,439.2,6.2539,6.2539);
	new cjs.ButtonHelper(this.sfa1, 0, 1, 2);

	this.sdo1 = new lib._do_2();
	this.sdo1.name = "sdo1";
	this.sdo1.setTransform(661.4,579.9,6.2539,6.2539,0,0,0,6.2,22.5);
	new cjs.ButtonHelper(this.sdo1, 0, 1, 2, false, new lib._do_2(), 3);

	this.si1 = new lib.si_1();
	this.si1.name = "si1";
	this.si1.setTransform(1339.05,661.8,6.2539,6.2539,0,0,0,9.3,34.1);
	new cjs.ButtonHelper(this.si1, 0, 1, 2);

	this.la1 = new lib.la_1();
	this.la1.name = "la1";
	this.la1.setTransform(1218.65,661.8,6.2539,6.2539,0,0,0,9.3,34.1);
	new cjs.ButtonHelper(this.la1, 0, 1, 2);

	this.sol1 = new lib.sol_1();
	this.sol1.name = "sol1";
	this.sol1.setTransform(1097.95,661.8,6.2539,6.2539,0,0,0,9.3,34.1);
	new cjs.ButtonHelper(this.sol1, 0, 1, 2);

	this.fa1 = new lib.fa_1();
	this.fa1.name = "fa1";
	this.fa1.setTransform(977.55,661.8,6.2539,6.2539,0,0,0,9.3,34.1);
	new cjs.ButtonHelper(this.fa1, 0, 1, 2);

	this.mi1 = new lib.mi_1();
	this.mi1.name = "mi1";
	this.mi1.setTransform(857.2,661.8,6.2539,6.2539,0,0,0,9.3,34.1);
	new cjs.ButtonHelper(this.mi1, 0, 1, 2);

	this.re1 = new lib.re_1();
	this.re1.name = "re1";
	this.re1.setTransform(736.5,661.8,6.2539,6.2539,0,0,0,9.3,34.1);
	new cjs.ButtonHelper(this.re1, 0, 1, 2, false, new lib.re_1(), 3);

	this.do1 = new lib._do_1();
	this.do1.name = "do1";
	this.do1.setTransform(616.1,661.8,6.2539,6.2539,0,0,0,9.3,34.1);
	new cjs.ButtonHelper(this.do1, 0, 1, 2, false, new lib._do_1(), 3);

	var maskedShapeInstanceList = [this.sre,this.sla1,this.ssol1,this.sfa1,this.sdo1,this.si1,this.la1,this.sol1,this.fa1,this.mi1,this.re1,this.do1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.do1},{t:this.re1},{t:this.mi1},{t:this.fa1},{t:this.sol1},{t:this.la1},{t:this.si1},{t:this.sdo1},{t:this.sfa1},{t:this.ssol1},{t:this.sla1},{t:this.sre}]}).wait(56));

	// bg
	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#231916").s().p("ECXHAV8IglAAImXAAQgyAAgmgiQgigjAAg1MAAAgoDQAAgPADgOQAHgfAYgYQAmgmAyAAIITAAQAzAAAlAmQAYAYAHAfQADAOAAAPMAAAAoDQAAA1giAjQgiAig2AAgEBxgAV8IgpAAIh0AAQg1AAgjgiQglglAAgzMAAAgoDQAAgPADgOQAIgfAagYQAmgmAyAAIIQAAQAyAAAmAmQAaAYAIAfQADAOAAAPMAAAAoDQAAAzglAlQgjAig1AAgEBepAV8IgmAAImNAAQgyAAgigiQgmglAAgzMAAAgoDQAAgPAEgNQAHggAbgYQAigmAyAAIIUAAQAyAAAlAmQAYAYAIAfQADAOAAAPMAAAAoDQAAA1gjAjQgiAig1AAgEhKsAV8IgmAAIh9AAQg1AAgigiQgmglAAgzMAAAgoDQAAgPAEgOQAHgfAbgYQAlgmAyAAIIRAAQAyAAAlAmQAbAYAHAgQAEANAAAPMAAAAoDQAAAzgmAlQgiAig1AAgEhdgAV8IgpAAIkQAAQgyAAgigiQgmglAAgzMAAAgoDQAAgPADgOQAIgfAbgYQAigmAyAAIIUAAQAyAAAlAmQAYAYAIAfQADAOAAAPMAAAAoDQAAA1gjAjQgiAig1AAgEhwXAV8IgmAAImWAAQgyAAgjgiQglglAAgzMAAAgoDQAAgPADgOQAIgfAagYQAjgmAyAAIITAAQAyAAAmAmQAYAYAHAfQADAOAAAPMAAAAoDQAAA1giAjQgiAig2AAgEiV+AV8IicAAQg1AAgjgiQglglAAgzMAAAgoDQAAgyAlgiQAmgmAyAAIITAAQAyAAAjAmQAaAYAIAfQADAOAAAPMAAAAoDQAAAzglAlQgjAigyAAg");
	this.shape_70.setTransform(916.325,579.55);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("rgba(255,255,255,0.149)").s().p("EBFFAhZQhOAAg1g1Qg4g1AAhOMAAAg8+QAAhOA4g0QA1g5BOAAIHQAAQgEANAAAPMAAAAoDQAAAzAmAlQAiAiAyAAIGNAAIAAVgQAABNg3A1IgBABQg1A1hPAAgEhRcAhZQhOAAg1g1Qg4g1AAhOIAA1gIFuAAQA1AAAigiQAmglAAgzMAAAgoDQAAgPgEgNIHrAAQBPAAA1A5QA4A0AABOMAAAA8+QAABOg4A1Qg1A1hPAAgECQYAhZQhPAAg1g1IgBgBQg3g1AAhNIAA1gIBXAAQA2AAAigiQAigjAAg1MAAAgoDQAAgPgDgOIMIAAQBLAAA4A5QA1A1AABOMAAAA8+QAABNg0A1IgBABQg4A1hLAAgEB9kAhZQhOAAg1g1IgBgBQg3g1AAhNMAAAg8+QAAhOA4g1QA1g5BOAAIHFAAQgDAOAAAPMAAAAoDQAAA1AiAjQAmAiAyAAIGXAAIAAVgQAABNg3A1IgBABQg2A1hOAAgEBqtAhZQhOAAg1g1IgBgBQg0g1AAhNIAA1gIFzAAQA1AAAjgiQAlglAAgzMAAAgoDQAAgPgDgOIHlAAQBPAAA1A5QA1A1AABOMAAAA8+QAABNg0A1IgBABQg1A1hPAAgEBX5AhZQhOAAg1g1IgBgBQg3g1AAhNIAA1gIBhAAQA1AAAigiQAjgjAAg1MAAAgoDQAAgPgDgOILIAAQgDAOAAAPMAAAAoDQAAAzAlAlQAjAiA1AAIB0AAIAAVgQAABNg3A1IgBABQg1A1hPAAgEhkTAhZQhLAAg1g1Qg4g1AAhOIAA1gIDbAAQA1AAAigiQAjgjAAg1MAAAgoDQAAgPgDgOIJGAAQgEAOAAAPMAAAAoDQAAAzAmAlQAiAiA1AAIB9AAIAAVgQAABOg4A1Qg1A1hOAAgEh3GAhZQhPAAg1g1Qg4g1AAhOIAA1gIBXAAQA2AAAigiQAigjAAg1MAAAgoDQAAgPgDgOII5AAQgDAOAAAPMAAAAoDQAAAzAmAlQAiAiAyAAIEQAAIAAVgQAABOg1A1Qg4A1hLAAgEiJ6AhZQhPAAg1g1Qg4g1AAhOMAAAg8+QAAhOA4g1QA1g5BPAAIHFAAQgDAOAAAPMAAAAoDQAAAzAlAlQAjAiAyAAIGWAAIAAVgQAABOg4A1Qg1A1hOAAgEicxAhZQhOAAg1g1Qg1g1AAhOIAA1gIF3AAQAyAAAjgiQAlglAAgzMAAAgoDQAAgPgDgOIHkAAQBPAAA1A5QA4A1AABOMAAAA8+QAABOg4A1Qg1A1hPAAg");
	this.shape_71.setTransform(978.225,662.25);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#231916").s().p("EggQAGNQgQAAgMgLQgLgLAAgQIAArMQAAgQALgMQAMgLAQAAMBAgAAAQAQAAAMALQAMAMgBAQIAALMQABAQgMALQgMALgQAAg");
	this.shape_72.setTransform(1005.4399,669.8284,6.2539,6.2539);

	var maskedShapeInstanceList = [this.shape_70,this.shape_71,this.shape_72];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_72},{t:this.shape_71},{t:this.shape_70}]}).wait(56));

	// 不动内容
	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("rgba(153,153,153,0.498)").s().p("AgXB0QAQgaAHgdQAHgeABgfQgBgegHgeQgHgdgQgaIANgFQAPAbAJAdQAKAegBAiQABAjgKAeQgJAegPAbg");
	this.shape_73.setTransform(304.5,297.15);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("rgba(153,153,153,0.498)").s().p("AhIBuIAAhoICTAAIAABoIgRAAIAAgJIhyAAIAAAJgAg4BXIByAAIAAgbIhyAAgAg4AvIByAAIAAgbIhyAAgAhpgOIAAgPIA9AAIgFgSQgEgKgFgJIAPgDIAHAMIAFAOIAEALIgKADIBAAAIAHgNIAGgPIAFgNIARAEIgJATIgJASIA+AAIAAAPgAhchHIAAgPIBYAAIgEgKIgGgKIAPgEIAHANIAFALIBRAAIAAAPg");
	this.shape_74.setTransform(289.175,295.4);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("rgba(153,153,153,0.498)").s().p("AhlBrIAAgPIBdAAIAAgpIg/AAIAAgOIA/AAIAAgmIhAAAIAAgOICRAAIAAAOIhBAAIAAAmIBCAAIAAAOIhCAAIAAApIBeAAIAAAPgAAwgjQgagUgWgbQgMARgRAPQgQAPgSANQgTANgTAJIgFgGIgGgGQAWgLAVgOQAVgPARgRQASgSAMgTIAOAGIgCADIgDADQAXAbAaATQAbAUAdAQIgGAGIgFAGQgdgPgZgUg");
	this.shape_75.setTransform(265.175,295.025);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("rgba(153,153,153,0.498)").s().p("AgsBbIgDgIIAQAAIANABIAHgBIAFgBIABgDIAAhoIhgAAIAAgRIDRAAIAAARIhhAAIAABoQABAIgDAEQgCAEgGACQgFACgLABIgaAAIgDgJgABQA3IgPgaIgSgZIAPgEIARAXIAQAZQAHANAEALIgQAHQgEgKgGgOgAhjBKIgIgFQAPgNANgTQANgSAIgUIAQADQgJAWgNAVQgNATgPAPIgHgFgAhQhUIAAgPICnAAIAAAPg");
	this.shape_76.setTransform(240.875,296.4);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("rgba(153,153,153,0.498)").s().p("AhsBiIAAgPIBLAAIAAhQIAPAAIAABQIAjAAIAAhQIAQAAIAABQIBMAAIAAAPgAhEA2IgJgRIgLgRIANgGIAKARIAKARQAFAIADAHIgOAGIgHgPgAArA+IAMgQIAMgRIAKgRIANAHQgHANgKANQgJANgJAJgAhNgGIAAhbICcAAIAABbgAg+gSIB9AAIAAgbIh9AAgAg+g6IB9AAIAAgaIh9AAg");
	this.shape_77.setTransform(217.15,295.5);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("rgba(153,153,153,0.498)").s().p("AgpBoIgFgEQAJgHAHgJQAHgKAGgMIgJgTQgFgLgDgNIAMgEIAFARQADAJAEAGIAGgZQADgPABgPIghAAIAJgUIAKgYIAJgYIgcAAIAAgOIAuAAIgJAXIgIAYIgKAXIASAAIACAAIAJABQgDAYgEAUQgEAUgGAQQAKANAMAHQANAHAOACQAOADAPAAIAjAAIgEAHIgCAHIgdAAQgRAAgPgCQgPgEgOgGQgNgHgKgNQgGALgHAJQgHAIgIAGIgFgFgAhVBlIgEgFIAEgFIAFgHQACgEAAgFIAAgzIgcAAIAAgOIAcAAIAAgiIgSAAIAAgOIAzAAIAAAOIgUAAIAAAiIAbAAIAAAOIgbAAIAAA1IAZgQIACAGIADAGIgcATIgNAKIgFAEIgEgFgAAzBUIAAgeIgmAAIAAgNIAmAAIAAgUIgfAAIAAgOIAfAAIAAgSIgcAAIAAgMIAcAAIAAgUIgmAAIAAgNIAmAAIAAgTIgcAAIAAgNIAcAAIAAgUIAOAAIAAAUIAhAAIAAAgIALAAIAAANIgLAAIAAAgIghAAIAAASIAhAAIAAAOIghAAIAAAUIAmAAIAAANIgmAAIAAAegABBgXIAUAAIAAgUIgUAAgABBg4IAUAAIAAgTIgUAAgAhpgrIgFgGQAJgLAGgPQAGgPAEgRIANADIgDAMIgEAMIAoAAIAAAPIguAAIgIAQIgJANIgDgHg");
	this.shape_78.setTransform(193.175,295.45);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("rgba(153,153,153,0.498)").s().p("ABLBeIgdgTQgNAMgSAIQgQAJgXAGIgDgHIgEgHQAUgFAPgHQAQgHAMgKIgZgOIgYgNIAKgSIAKgWIgjAAIAAgOIApAAIAIgUIAGgTIAQADIgGARIgHATIBUAAIAAAOIgaAAQgEAUgHAPQgHAQgKANIAeASIAXAQIgMAMIgWgQgAALASIgIARIAUAKIAUALQAJgLAGgOQAGgOADgRIgvAAIgJASgAhkBmIgDgHIAPAAIAJAAIAEgBIABgDIAAg8IgQAGIgPAEIgEgPIAQgFIATgFIAAg9IghAAIAAgPIAhAAIAAgwIAQAAIAAAwIAaAAIAAAPIgaAAIAAA4IAcgJIADAOIgfAKIAABAQAAAHgCAEQgCAEgFACQgEACgHAAIgUABIgCgIgAgagfIAAguIA7AAIgEgPIgFgOIAQgDIAGAQIAFAQIA4AAIAAAtIgQAAIAAgfIhmAAIAAAgg");
	this.shape_79.setTransform(169.025,295.475);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("rgba(153,153,153,0.498)").s().p("ABDBtIAAgOIiVAAIAAhMIAQAAIAAA9IA7AAIAAhQIhfAAIAAgPIBfAAIAAgoIhNAAIAAgPIBNAAIAAgmIAPAAIAAAmIBPAAIAAAPIhPAAIAAAoIBfAAIAAAPIhfAAIAABQIA7AAIAAg9IAQAAIAABag");
	this.shape_80.setTransform(145.175,295.5);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("rgba(153,153,153,0.498)").s().p("AhrBmIANgNIALgRQAFgJAEgJIAPAEQgGAPgJANQgJANgKAKgABVBcIgLgSIgMgQIAOgFIAMAQIAMARIAIAPIgPAGIgIgPgAgfBdIgCgRIgDgQIAQgBIADAQIACAQIABANIgQADIgBgOgAAaBcIgGgQIgHgPIAOgEIAIAQIAGAQIAEAOIgPAEIgEgPgAhNAmIAAhJIBFAAIAAhJIAPAAIAAAaIBbAAIAAAPIhbAAIAAAgIBJAAIAABJgAg+AYIB+AAIAAgtIh+AAg");
	this.shape_81.setTransform(121.075,295.5);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("rgba(153,153,153,0.498)").s().p("AgNBBQgKgeAAgjQAAgiAKgeQAJgdAPgbIANAFQgQAagIAdQgGAegBAeQABAfAGAeQAIAdAQAaIgNAGQgPgbgJgeg");
	this.shape_82.setTransform(105.8,297.15);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#333333").s().p("AgqBKQgUgMgLgTQgLgUgBgXQABgXALgTQALgUAUgMQATgLAYAAQAXAAAUALQATAMALAUQALATAAAXQAAAXgLAUQgLATgTAMQgUALgXAAQgYAAgTgLgAgrgrQgSARgBAaQABAaASASQARASAbAAQAZAAATgSQARgSABgaQgBgagRgRQgSgTgaAAQgbAAgRATg");
	this.shape_83.setTransform(952.15,258.75);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#333333").s().p("AkfEaQAcgvANg2QANg1AEg3QAEg3gBgzIAAiiIBkAiICKAAQgDg9AAg/IBrAKQAAAGgFAFQgFAEgMACIAAAwQAAAZACAYIBBAAIAVgaIgGgCIgHgDQgHgVgOgUQgPgUgQgNIAEgEQAogEAYAGQAZAFALAMQAMAMAAANQABANgIAKIAeAYIAeAZQgBAFgFACQgEADgHAAIitAAQADApAGAoQAHAoAMAkQALgbAJgdQAJgcAGgcIBuAmQgCAFgFADQgFADgLAAQgPAmgUAlQgVAlgaAlQAKAPANAOQAMAOAOANQAGAHAFAAQAEgBAGgHIANgVIAQgcIAOgcIAGACIgQBrQARAgADATQADASgJAIQgSAPgXgDQgWgCgWgLQgVgMgPgOQgQgQgOgSQgPgRgMgTQgkAigvAcQguAdg6AUIgEgHQA0ggAngoQAogpAeguQgbg6gOg/QgOhBgFhFIiYAAIAABeIA2AAIAognIBEA6QgDADgGADQgFADgJABQgBBBgEAoQgEAngIAVQgIAVgOAKQgNAKgSAFQgRAFgYAAQAAgSgBgNQgCgOgFgIQgFgIgJgGQgIgGgOgEIAAgDQgNAwgeAtQgeAsg3AigAiLghQAAAhgDAkQgCAlgKAmIAWABIAVABIAJgBIAGgDQAHgGAEgiQADgiAChFIg7AAg");
	this.shape_84.setTransform(910.886,239.625);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#333333").s().p("ACODyQgCgQgEgLQgDgKgIgHQgHgIgQgCIAAgIIAIAAIARABIAPAAQAGABACgDQACgDAAgFIAAkEIg2AAIAAFNQAAACgIAEQgIAEgOAFQgPADgUAAIgPAAIAAlfIgyAAIAAFVQAAADgIAEQgIAEgOAFQgOADgVAAIgOAAIAAloIgyAAIAAFSQAAAEgKAHQgKAHgRAFQgPAFgSABIgNAAIAAmiIBaAiIBWAAIADguIADgxIjXAAIgFgQIGuAAIAwg9IAPAMIAjAaIAlAeQgBAFgFACQgFACgHAAIjaAAQgVAZgYAZQgXAagYATIC/AAIAlgpIBOA7QgDADgGAEQgGAEgJACIAAEAQAAAegGAUQgHAUgUAMQgUAMgoADQAAgVgCgPg");
	this.shape_85.setTransform(851.075,239.9);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#333333").s().p("Ai6EdIAAkGIBgAkIC3AAIApgtIBUBAIgKAHQgGAEgKACIAACoQgBADgMAEQgNAFgSADQgRAEgPABIgQAAIAAgvIjDAAIAAAZQAAAEgMAHQgMAGgRAGQgSAFgUAAgAhfDYIDDAAIAAiMIjDAAgAkcgKQAngZAlghQAlgiAfgmQAgglAWgmQAVglAJggIB6AeQgBAGgIAEQgGADgQABQAUAbAeAUQAdAUAiAPQAjAOAjAJQAkAKAfAGIAAAKQgSAGgNANQgOANgIARQgJAQgCARQgtgVgmgdQgmgegcgmQgegmgQgxQgcAvgxAsQgwAtg8AjQg7Akg/AWgAiFgaIgFgRICYAAIAtg8IAPALIAhAbIAiAdQgBAFgEADQgFACgGAAg");
	this.shape_86.setTransform(791.3,239.375);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#333333").s().p("AkdCuIA4gKIBSgRIBcgUIABAFQgaAWgrAgQgsAgg/AoQgCAGgFAEQgFAFgGACgAhiEGIgEgQIA2AAIAAliIgEAAIgEAAQgTAYgcAbQgcAbggAaQgfAZgfAUIBNgIIBbgJIABAGQgbAQgvAZQgwAZg+AcIgGAFIgGADIgmhbIAFgBIAKgDIAKgFQAPgLASgVQARgTASgaIgUAKIgUAKIgGAFIgGAEIgmhbIAEgBIAJgDIAJgEQALgJANgTQANgTAMgYQAMgXAJgXQAKgYAEgSIBpAqQgCAFgFACQgFADgIAAQgQAUgWAVQgWAVgZAUQgYAUgYAPIAhgBIAlgCQAJgQAHgPQAGgPAEgOIBVAsIAAiGIBWAgIBYAAIAjgtIBUA6QgDAFgHADQgGADgMACIAAG+IABAAIAbgyIAIAKIATAWQALANAIAMQgBAFgEACQgEACgGAAgAAhD2IBjAAIAAiWIhjAAgAAhBPIBjAAIAAiJIhjAAgAAhhLIBjAAIAAiGIhjAAg");
	this.shape_87.setTransform(731.575,238.775);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#333333").s().p("AiyEdIAAkpIBcAiICnAAIAqgsIBSA/QgEAEgFADQgHAEgJADIAADHQgBAEgMAGQgMAHgRAFQgSAGgRAAIgPAAIAAgsIiyAAIAAATQgBAFgKAHQgLAGgSAFQgQAFgTAAgAhaDeICyAAIAAhUIiyAAgAhaB5ICyAAIAAhSIiyAAgAkRglIgFgRIE2AAIAOgpIANgsIALgqIjFAAQAvAOAVAUQAVAVACAUQAAAVgLAOQgNAOgUABQgTABgVgSQgBgdgIgcQgIgcgLgXIhjAAIgEgQIDwAAIgLgEIgLgGQgCgWgJgTQgJgUgKgOIADgCQAzgCAZALQAYALAGAQQAFARgJAOQgKAOgSAGIB4AAIArg6IAOAMIAgAZIAhAcQgBAFgEACQgFACgHAAIiWAAIBbAcQgBAGgGADQgFADgKgBQgWAUgeAYQgeAYggAUIBsAAIAtg7IAOALIAhAaIAjAdQgCAFgEACQgFADgGAAg");
	this.shape_88.setTransform(671.35,239.316);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#333333").s().p("AgvEdIAAjLIjnAAIgFgRIDsAAIAAh0IjAAAIgGgRIDGAAIAAjYIBxALQAAAGgGAFQgEAFgNABIAAC8IBZAAIAtg4IAPALIAhAYIAiAcQgBAFgEADQgFACgGAAIjIAAIAAB0IBqAAIAwg8IAPALIAjAbIAlAdQgCAFgEADQgFACgGAAIjgAAIAACsQABAEgMAIQgLAHgRAFQgQAGgSABgABJhfIATgwIAUg7QAKgfAIgeIBuAsQgCAGgHADQgGADgLgBQgdAkgkAeQgiAegkAWgAishrQgCgngOglQgPgmgSgfIAEgDQA8ARAfAaQAeAaAGAaQAGAagKATQgLATgVAEIgHABQgSAAgVgQg");
	this.shape_89.setTransform(611.2,239.475);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#333333").s().p("ABmD3QgEgPgHgJQgJgJgQgIQgRgIgYgFIABgHIAgACIAfACIAXABQAHAAAFgCQAFgCAEgEQAQgPAHhTQAGhTACiYIhcAAQgYAngbAgQgbAfgfAZIgDgDIAADyQgBADgLAGQgLAFgPAEQgPAEgPABIgNAAIAAgwIhKAAIAAApQgBAFgIAHQgKAGgPAFQgPAFgRAAIgNAAIAAnJIBMAfIADglIADgpIABglIB0AcQgCAHgHAEQgGADgLAAIgfAlIgjAmIAnAAIAlgpIBLA6QgEAEgFADQgGADgJADIAABkQAOggAOgpQAMgpALgtQAKgtAIgsIBvAgQgCAGgGADQgFAEgLAAQgIATgIARIgSAjIBLAAIAtguIBIBBQgDAEgGADQgHADgLACQgBBegCBDQgDBDgFAtQgFAtgJAbQgIAbgNANQgRARgXAJQgXAHgiAAQABgVgDgPgAjDCuIBKAAIAAidIhKAAgAjDAAIBKAAIAAiTIhKAAgAAlBRQgCghgLghQgLgfgPgaIAEgDQA4AOAbAWQAbAWAFAXQAEAYgKARQgMARgUADIgEAAQgTAAgTgQg");
	this.shape_90.setTransform(552.6,239.475);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#333333").s().p("AApEiIAAoqIBdAqIAjAAIAqgqIBUBJQgDAFgHACQgGADgMAAIgbAtQgQAZgTAZQgSAZgTAVQAmATAYAaQAYAaALAdQAMAdAAAbQAAAfgKAXQgLAXgXANQgXAOgnAAIgBgbIgEgbQgCgNgDgGQgDgGgHgFQgHgFgKgDIAAgHIAkAAIAHAAQADgBADgCQAFgDAEgHQADgHAAgNQAAgggKghQgKghgWgcQAEgWAEgdIAJg9QADgeACgaIgyAAIAAHWQAAADgIAGQgIAGgQAFQgPAFgVABgAhqEKQgLgfgTgfQgTgfgYgdQgXgcgXgXIAFgFQAiAIAbAKQAbAKAUAMIATgzIASgvIisAAIgFgRICvAAIAtgpIBGBFQgDAEgGACQgGABgKABIgwAsQgcAZgcAXQAlAbAMAcQAMAcgGAVQgGAVgTAHQgGADgHAAQgPAAgRgKgAkmALQAXgeAVgmQAUgnARgpQAQgpAMgoQALgnAGggIBuAkQgCAGgGADQgFAEgNABIgBABQA3AQAcAYQAbAXAIAYQAIAYgIASQgHARgSAFQgQAFgXgOQgIgggRggQgRgfgUgcQgLAXgOAYQgNAYgRAXQAyAIAXARQAYAQACATQADATgLAOQgLAOgTACQgSACgVgQQAAgYgIgXQgHgXgMgSQgcAngiAiQgjAigoAag");
	this.shape_91.setTransform(491.525,239.125);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#333333").s().p("AjAEcIAAjqQgSAZgWAXQgVAXgZATIgHgFQAVgjARgpQARgpAMgsQAMgtAHgtIhCAAIgFgQIBOAAIAAiYIBqAKQgBAIgEADQgFAFgMACIAAB8IABAAIAhg2IAKAKIAYAZIAXAaQgBAFgEACQgFACgGAAIhLAAIAAA0QAsANAWATQAUAUADAQQADAUgKANQgKANgQABQgQACgSgPQgBgWgGgWQgHgXgIgUIAAE2QAAADgLAGQgKAGgPAEQgPAEgQAAgAgREYIAAoiIBXAkIBjAAIAogsIBNA9QgDAEgGAEQgGAEgJABIAAHDQgBADgLAGQgLAGgRAGQgQAEgSAAIgNAAIAAg9IhrAAIAAAhQAAAFgKAJQgKAGgQAGQgQAGgTAAgABEDGIBrAAIAAiDIhrAAgABEAzIBrAAIAAh7IhrAAgABEhZIBrAAIAAh8IhrAAg");
	this.shape_92.setTransform(430.55,239.6);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#333333").s().p("AgzEeIAAmAIB1AKQAAAHgFAEQgFAFgMACIAAFLQAAADgMAGQgMAGgSAFQgRAFgUAAgAkgAhQA2gnArg1QArg2Aeg6QAdg7APg3IB+AjQgCAHgGAEQgIADgQADQAcAmApAgQAqAgAyAYQAzAYA4APIgBAJQgSAHgMAOQgNANgIARQgHARgFASQhLgmg1hBQg1hAgghWQgQAkgcAnQgcAmgmAkQgmAlguAeQgwAdg2AUg");
	this.shape_93.setTransform(371.3,239.375);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#333333").s().p("AB1ECQgEgPgJgJQgJgJgOgHQgPgIgbgFIAAgHIAMABIAdACIAgABIAYABQAHAAADgEQADgDAAgGIAAhVQgKAPgRABQgQACgSgRQABgYgEgYQgDgZgIgZQgIAtgYApQgYApgwAgIgGgEQALgSAHgUQAHgUAFgVQgJACgKgEQgKgDgKgKQACgWgEgWQgCgXgGgUQgFAegMAgQgMAfgWAdQgWAdgjAYIAABoQgBAFgKAHQgLAGgQAGQgQAFgSAAIgOAAIAAm9IBbAjIAiAAIAAhhIiUAAIgEgRIGlAAIAvg5IAPALIAiAZIAkAcQgBAFgFADQgFACgHAAIixAAIAABhIA9AAIAmgrIBPA9QgDAEgGAEQgGADgJACIAAEgQAAAbgIATQgIAUgYALQgYAMgxAEQgCgUgEgOgAijCHQARglAJgpQAIgoACgoQADgpAAgnIgnAAgABSheIAAAZIgBAZQAaARARATQAQASAJASIAAiDIhDAAgAgzg0QAUAKAOAMQAOAMAIALIABgsIABgrIAAgJIg4AAQAAAYgCAbgAgxh4IA4AAIAAhhIg4AAg");
	this.shape_94.setTransform(311.675,238.975);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#333333").s().p("Aj9EaIAAnNIBdAkIBkAAIAAiKIBuAKQgBAHgEAEQgFAFgMABIAABvIBkAAIAqgvIBUBCQgEAFgHAFQgHAEgMACIAAFqQgBADgLAGQgMAFgRAFQgRAFgRgBIgNAAIAAg1IkuAAIAAAbQAAAGgLAHQgKAHgRAFQgQAGgTAAgAAcDPIBsAAIAAikIhsAAgAimDPIBqAAIAAikIhqAAgAAcAaIBsAAIAAiYIhsAAgAimAaIBqAAIAAiYIhqAAg");
	this.shape_95.setTransform(252.575,239.75);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#333333").s().p("AixEdIAAkpIBbAiICnAAIApgsIBTA/QgDAEgHADQgGAEgJADIAADHQgCAEgLAGQgMAHgRAFQgSAGgRAAIgPAAIAAgsIizAAIAAATQAAAFgLAHQgLAGgRAFQgQAFgTAAgAhbDeICzAAIAAhUIizAAgAhbB5ICzAAIAAhSIizAAgAkRglIgFgRIE2AAIAPgpIAMgsIAKgqIjFAAQAwAOAVAUQAVAVABAUQACAVgNAOQgMAOgTABQgUABgVgSQgBgdgIgcQgIgcgLgXIhjAAIgEgQIDvAAIgKgEIgKgGQgDgWgJgTQgJgUgLgOIAEgCQAzgCAYALQAaALAFAQQAFARgKAOQgJAOgSAGIB3AAIAsg6IAPAMIAeAZIAiAcQgBAFgFACQgEACgHAAIiXAAIBdAcQgCAGgFADQgGADgKgBQgWAUgeAYQgfAYgfAUIBsAAIAtg7IAOALIAiAaIAiAdQgBAFgFACQgEADgHAAg");
	this.shape_96.setTransform(191.35,239.316);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#333333").s().p("AkCESIgFgRIDWAAIAAiEIiQAAIgFgQICVAAIAAhwIh6AAIgEgSIDvAAIAngzIANAKIAeAXIAfAaQgBAEgEADQgFACgHABIh2AAIAABwIA6AAIArg2IAOAKIAfAYIAhAbQgBAFgFACQgEACgHAAIiiAAIAACEIBsAAIAtg6IAPALIAgAaIAjAdQgCAEgEADQgFACgHAAgAkjARQAmgaAmgkQAmgjAfgpQAhgoAWgnQAWgnAJgiICCAjQgBAGgJAEQgGACgRACQAVAcAeAVQAeAUAkAPQAjAPAkALQAkAJAfAHIAAAKQgUAGgOAOQgPAOgIASQgKASgDASQgqgYgngeQgmgegdgpQgegogQg0QgYAmgiAiQgiAkgrAgQgqAgguAaQgvAZguARg");
	this.shape_97.setTransform(131.4,238.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73}]}).wait(56));

	// bg
	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("EiLsBMwQhvAAhQhPQhPhPAAhwMAAAiRDQAAhwBPhPQBQhPBvAAMEXZAAAQBvAABPBPQBQBPAABwMAAACRDQAABwhQBPQhPBPhvAAg");
	this.shape_98.setTransform(959.9897,540.0003,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_98).wait(56));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(999,588.8,882,442.5);
// library properties:
lib.properties = {
	id: '14CB93263BA1D74EA5B3F38304C0AC64',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#FF9999",
	opacity: 1.00,
	manifest: [
		{src:"sounds/_do.mp3?1688461695083", id:"_do"},
		{src:"sounds/fa.mp3?1688461695083", id:"fa"},
		{src:"sounds/la.mp3?1688461695083", id:"la"},
		{src:"sounds/mi.mp3?1688461695083", id:"mi"},
		{src:"sounds/re.mp3?1688461695083", id:"re"},
		{src:"sounds/sfa.mp3?1688461695083", id:"sfa"},
		{src:"sounds/si.mp3?1688461695083", id:"si"},
		{src:"sounds/sla.mp3?1688461695083", id:"sla"},
		{src:"sounds/sol.mp3?1688461695083", id:"sol"},
		{src:"sounds/sre.mp3?1688461695083", id:"sre"},
		{src:"sounds/ssol.mp3?1688461695083", id:"ssol"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['14CB93263BA1D74EA5B3F38304C0AC64'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;