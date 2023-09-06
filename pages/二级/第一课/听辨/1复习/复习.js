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
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.实心圆图形 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC3300").s().p("AnbHcQjGjFAAkXQAAkWDGjFQDFjGEWAAQEXAADFDGQDGDFAAEWQAAEXjGDFQjFDGkXAAQkWAAjFjGg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.实心圆图形, new cjs.Rectangle(-67.4,-67.4,134.9,134.9), null);


(lib.stop = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("AgLBvIgGgIQAUgJAQgNQAQgNALgRQgIgRgGgTQgHgSgFgWIgJATIgLAPIgFgGIgHgFQALgPAHgSQAIgSAGgVQAGgVAFgXIARADIgFAXIgGAXIBSAAIAAAQIgTAAQgEAggJAZQgIAagNAVQAKARAOANQAOAOASAIIgHAHIgGAIQgQgJgOgNQgNgNgLgQQgLAQgQANQgPANgUAKIgEgIgAAfgzQAEAYAGAWQAHAUAJATQAJgSAGgVQAHgWAEgaIgzAAgAhyBwIgGgFQAPgRAIgTQAIgTADgTQACgUAAgSIAAg2IggAAIAAgQIBzAAIAAAQIhDAAIAAAkIA3AAIAAADIgBAFIgBA1IgCAkIgCAWQgDAIgCADQgDAEgDACIgJACIgMABIgQgBIgBgIIgEgIIAQABIAKAAIAEgBIAEgCQACgDABgLIADghIACg5IgmAAIAAACQABAVgEAVQgDAWgIAVQgJAUgRASIgGgGgAhChfIgHgTIAOgEIAJASIAFARIgPAFIgGgRg");
	this.shape.setTransform(92.95,86.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AhvBuIgDgIIAQAAIAJAAIAEgBIABgDIAAhMIghANIgEgRIARgHIAUgHIAAg1IghAAIAAgQIAhAAIAAg0IAQAAIAAA0IAdAAIAAAPIAAABIgdAAIAAAxIAZgJIADANIgcAMIAABSQAAAHgCAEQgCAEgFACQgEADgIAAIgUAAIgCgIgAgYB2IAAhjIB9AAIAABiIgQAAIAAgLIhdAAIAAAMgAArBdIAqAAIAAgYIgqAAgAgIBdIAkAAIAAgYIgkAAgAArA4IAqAAIAAgXIgqAAgAgIA4IAkAAIAAgXIgkAAgAgtATIgGgGQAMgFAMgHQAMgHAKgJQAKgKAIgKIg0AAIAAgOIAAgBIBDAAIAAgqIgeADIgeABIgCgHIgCgFIAjgDIAjgEIAggEIAbgFIAKANQgMADgPACIggAEIAAAsIAQAAIAHgNIAHgPIAGgMIAPAEIgKATIgJARIAnAAIAAAPIg3AAQAHAJALAJQAKAJAMAIQALAFALAFIgGAHIgFAHQgMgGgMgJQgNgJgLgKQgLgLgIgLIAAAtIgQAAIAAgsQgJAMgLALQgKALgNAIQgNAKgMAFIgFgHgAgLhBIgIgQIAOgFIAIAQIAHAOIgOAFIgHgOg");
	this.shape_1.setTransform(67.075,86.8);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AhzBvIAAgQIAlAAIAAiUIASAAIAACUIA+AAIAAjOIARAAIAABXIBWAAIAAASIhWAAIAABlIBhAAIAAAQg");
	this.shape_2.setTransform(40.95,86.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CCCCCC").s().p("AhUB3IAAiQIgMAQIgLAMIgFgHIgFgIQAMgNALgRQAMgQAJgUQAJgTAHgTIAQAEQgGAQgGAPIgPAdIAACrgAgIBuIgDgHIAUAAIANAAIAEgBIABgDIAAgwIgzAAIAAgOIB3AAIAAAOIgyAAIAAAxQgBAGgCAEQgCAEgFACIgRACIgYAAIgCgIgABmAsIAAgcIiFAAIAAAbIgPAAIAAgpICjAAIAAAqgAgXgPIAAgwIB3AAIAAAwgAgHgbIBWAAIAAgYIhWAAgAgrhOIAAgPIBIAAIgEgLIgGgKIAQgEIAHAMIAGANIBGAAIAAAPg");
	this.shape_3.setTransform(14.8,86.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhRBSIAAijICjAAIAACjg");
	this.shape_4.setTransform(52.1695,29.9766,1.1768,1.1768);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E28623").s().p("AjUDUQhXhYAAh8QAAh8BXhXQBZhYB7AAQB8AABYBYQBYBXAAB8QAAB8hYBYQhYBYh8AAQh7AAhZhYg");
	this.shape_5.setTransform(52.15,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,108.2,106.5);


(lib.play = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CCCCCC").s().p("ABfBqIgHgOIgxAGIggAFIgSACIgKACIgGACIgCgIIgEgJQAEgBAEgEIAJgMIAJgOIAOgXIAOgeIg7AAIAAgPIBDAAIAAgwIg4AAIAAgRIA4AAIAAgtIARAAIAAAtIA7AAIAAARIg7AAIAAAwIBGAAIAAAPIhLAAQgLAWgMAVQgMAUgMARIBWgKIgMgSIgNgRIAPgGIASAYIAQAaQAIANAEALIgQAHIgFgMgAhqBoIAQgZIARgdIARgeIAMALIgPAcIgQAdIgQAbgAhQgNIgRgKIgSgIIAKgOIARAIIARAKIAOAJIgJAPIgOgKgAhBhTIgSgKIgSgJIAKgMIASAIIARAKIAOAJIgKAOIgNgKg");
	this.shape.setTransform(92.75,86.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("ABYBtIAAgMIjAAAIAAiOIARAAIAAB+ICvAAIAAh/IARAAIAACbgAg+A1IAAhzIB8AAIAABzgAAHAmIAnAAIAAgkIgnAAgAgvAmIAnAAIAAgkIgnAAgAAHgLIAnAAIAAgkIgnAAgAgvgLIAnAAIAAgkIgnAAgAhnhcIAAgQIDPAAIAAAQg");
	this.shape_1.setTransform(67.025,87.575);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AgLBvIgFgIQATgJAQgNQAQgNAMgRQgJgRgHgTQgGgSgFgWIgJATIgKAPIgGgGIgHgFQAKgPAIgSQAIgSAGgVQAHgVAEgXIARADIgFAXIgGAXIBSAAIAAAQIgSAAQgGAggIAZQgJAagMAVQALARAOANQANAOARAIIgGAHIgFAIQgSgJgNgNQgNgNgKgQQgNAQgPANQgQANgSAKIgFgIgAAfgzQAEAYAGAWQAGAUAKATQAJgSAHgVQAGgWAEgaIg0AAgAhyBwIgHgFQARgRAHgTQAIgTADgTQABgUAAgSIAAg2IgfAAIAAgQIBzAAIAAAQIhDAAIAAAkIA3AAIAAADIgBAFIgBA1IgCAkIgDAWQgCAIgCADQgDAEgEACIgIACIgMABIgQgBIgBgIIgEgIIAPABIALAAIAEgBIADgCQACgDACgLIADghIACg5IgmAAIAAACQAAAVgCAVQgEAWgIAVQgJAUgRASIgGgGgAhChfIgIgTIAPgEIAJASIAFARIgPAFIgGgRg");
	this.shape_2.setTransform(40.95,86.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#CCCCCC").s().p("AhvBuIgDgIIAQAAIAJAAIAEgBIABgDIAAhMIghANIgEgRIARgHIAUgHIAAg1IghAAIAAgQIAhAAIAAg0IAQAAIAAA0IAdAAIAAAPIAAABIAAgBIBDAAIAAgqIgeADIgeABIgCgHIgCgFIAjgDIAjgEIAggEIAbgFIAKANQgMADgPACIggAEIAAAsIAQAAIAHgNIAHgPIAGgMIAPAEIgKATIgJARIAnAAIAAAPIg3AAQAHAJALAJQAKAJAMAIQALAFALAFIgGAHIgFAHQgMgGgMgJQgNgJgLgKQgLgLgIgLIAAAtIgQAAIAAgsQgJAMgLALQgKALgNAIQgNAKgMAFIgFgHIgGgGQAMgFAMgHQAMgHAKgJQAKgKAIgKIg0AAIAAgOIgdAAIAAAxIAZgJIADANIgcAMIAABSQAAAHgCAEQgCAEgFACQgEADgIAAIgUAAIgCgIgAgYB2IAAhjIB9AAIAABiIgQAAIAAgLIhdAAIAAAMgAArBdIAqAAIAAgYIgqAAgAgIBdIAkAAIAAgYIgkAAgAArA4IAqAAIAAgXIgqAAgAgIA4IAkAAIAAgXIgkAAgAgLhBIgIgQIAOgFIAIAQIAHAOIgOAFIgHgOg");
	this.shape_3.setTransform(15.075,86.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("Aivj8IFfD9IlfD8g");
	this.shape_4.setTransform(56.3369,29.9096,0.559,0.559);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E28623").s().p("AkaEbQh1h2AAilQAAilB1h1QB2h1CkAAQCmAAB0B1QB2B1AAClQAAClh2B2Qh0B1imAAQikAAh2h1g");
	this.shape_5.setTransform(52.1375,29.975,0.75,0.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,108.2,106.5);


(lib.节拍器f复制 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_1
	this.instance = new lib.实心圆图形();
	this.instance.setTransform(-441.4,-226.55);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({alpha:0.9667},0).wait(1).to({alpha:0.9333},0).wait(1).to({alpha:0.9},0).wait(1).to({alpha:0.8667},0).wait(1).to({alpha:0.8333},0).wait(1).to({alpha:0.8},0).wait(1).to({alpha:0.7667},0).wait(1).to({alpha:0.7333},0).wait(1).to({alpha:0.7},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.6333},0).wait(1).to({alpha:0.6},0).wait(1).to({alpha:0.5667},0).wait(1).to({alpha:0.5333},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.4667},0).wait(1).to({alpha:0.4333},0).wait(1).to({alpha:0.4},0).wait(1).to({alpha:0.3667},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.3},0).wait(1).to({alpha:0.2667},0).wait(1).to({alpha:0.2333},0).wait(1).to({alpha:0.2},0).wait(1).to({alpha:0.1667},0).wait(1).to({alpha:0.1333},0).wait(1).to({alpha:0.1},0).wait(1).to({alpha:0.0667},0).wait(1).to({alpha:0.0333},0).wait(1).to({x:-441.35,alpha:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-508.8,-294,134.90000000000003,134.9);


// stage content:
(lib.复习 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,play:6};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,6,36,67,98,129];
	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		
		
		
		var _this = this;
		/*
		单击指定元件实例时将执行相应函数。
		*/
		_this.playm1_btn.on('click', function(){
		/*
		将播放头移动到时间轴中的指定帧标签并继续从该帧播放。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndPlay('play');
		});
	}
	this.frame_6 = function() {
		var _this = this;
		/*
		单击指定元件实例时将执行相应函数。
		*/
		_this.stopm1_btn.on('click', function(){
		/*
		将播放头移动到时间轴中的指定帧标签并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
		});
		playSound("沉重踏步");
	}
	this.frame_36 = function() {
		playSound("轻声踏步");
	}
	this.frame_67 = function() {
		playSound("轻声踏步");
	}
	this.frame_98 = function() {
		playSound("轻声踏步");
	}
	this.frame_129 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧标签并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(6).call(this.frame_6).wait(30).call(this.frame_36).wait(31).call(this.frame_67).wait(31).call(this.frame_98).wait(31).call(this.frame_129).wait(1));

	// leftnav_on
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E28624").s().p("AAzCMIgCgLIgEgJIAaACIARAAQAFABADgBIAFgEQAEgDACgLQADgLACgVIgyASIguARIgHgSIAegKIAkgMIAngOIABgWIABgcIhiAAIACgXIACgdIABgcIBaAAIAAgrIhjAAIAAgTIB4AAIAABSIhcAAIAAAWIgCAVIBiAAIAAAEIAAAGIgFBIQgDAcgCAOQgEAPgFAGQgEAEgFACQgGACgHABIgUABIgagBgAhACJIgWAAIgBgKIgFgKIAVACIAOAAQAEAAADgBQACAAACgDQADgDADgKQADgJACgTIgxASIgtAQIgIgSIAegKIAkgLIAmgNIACgXIACgeIhdAAIACgXIABgdIAAgcIBYAAIAAgrIhgAAIAAgUIB1AAIAABTIhZAAIgBAWIgBAVIBeAAIAAAEIgBAGQgCArgDAcQgDAbgEAOQgDAPgFAFQgEAFgFACQgEACgHAAIgHABIgJgBgABEAwIgZgKIgYgJIAJgOQAMACAMAGIAYAJQALAFAIAFIgIARQgIgGgLgFgAhLAwIgYgKIgYgJIAJgOQAMACAMAGIAYAJQALAFAIAFIgJARIgTgLg");
	this.shape.setTransform(215.9,442.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28624").s().p("AB7CAIgGgMIg3AFIg1AEIgtADIgCgVIAkgCIAqgCIAAgxIhAAAIAAhTIBAAAIAAgeIg5AAIAAhPICHAAIAABPIg6AAIAAAeIBDAAIAABTIhDAAIAAAvIAXgBIAYgCIgKgPIgKgPIASgHIAQAXIAPAYQAGAMADAKIgSAJIgEgLgAA8AkIAvAAIAAgvIgvAAgAgFAkIAtAAIAAgvIgtAAgAAChOIBgAAIAAgpIhgAAgAh4CFIgCgKIgFgKIAVACIAOAAQAEAAACgBQADAAACgDQADgCACgKQADgJACgSIAEgvIhNAAIAEgbIAFghIADgfIBFAAIAAg0IhOAAIAAgUIBiAAIAABbIhIAAIgDAbIgDAaIBMAAIAAADIgBAGIgFA7QgCAWgDAMQgDAMgFAFQgEAEgFACQgEACgHAAIgPABIgVgBg");
	this.shape_1.setTransform(184.475,443.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28624").s().p("AA7CEIgbgBIgCgKQgBgGgEgEIAfABIATABIAIgBQADgBACgEQADgDADgOQADgOABgaIADhBIAChgIjdAAIAAgUIDyAAIAAAMIgCBqIgCBFQgCAbgDAPQgDAOgEAGQgFAHgGADQgGADgIABIgPAAIgJAAgAh7BFIA3gRIBCgWIBFgZIAEAUIhCAYIhAAWIg4ATgAgVgXIgegYIgfgWIAOgOIAfAWIAfAXQANALAKAJIgOAQIgYgVg");
	this.shape_2.setTransform(152.1,443.3833);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28624").s().p("AADCIIgDgKIAWABIAOgBIAFgBIABgEIAAhfIgqAAIgUABQgGABgDADIgDgKIgDgKQAEgBAEgIIAJgTIADgHIAEgKIgdAAIAAgUIAkAAIAEgQIAFgQIgyAAIAAgUIA4AAIAFgUIAFgTIAUADIgEASIgFASIBpAAIAAAUIhvAAIgFAQIgFAQIAvAAIAAA8IBDAAIAAAUIhDAAIAABfQAAAJgDAFQgDAFgGACQgGADgMABIgbAAIgDgKgAAAgNIgIATIAyAAIAAgoIghAAIgJAVgAgvB8IgHgFQAIgKAKgNQAIgMAHgNQAIgMAFgMIATAFIgOAcQgIAOgKANQgJANgKAKIgHgGgAB1BqIgPgbIgPgZIARgHIAQAYIAPAaIALAWIgSAIIgLgVgAiPBpIApgPIAzgSIADARIgvATIgrASgAiIA+IgDgJIgDgJQAEgBAFgGIAMgOIALgRIASgbIgbAEIgNACIgGADIgDgKIgEgLQAEgBAEgFIAIgOIALgUIAOghQAHgTAHgUIATAKQgJAagNAaQgMAagMAVIAkgEIAJgRIAIgRIASAJQgNAbgQAaQgQAYgQAWIA7gLIAAAJIAAAJIgsAKIgZAGIgNAEIgGACg");
	this.shape_3.setTransform(120.35,442.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(130));

	// leftnav
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(153,153,153,0.498)").s().p("AAgBoIAAgxQgJALgNALQgMAKgNAHIgFgFIgGgFQAOgGAMgJQAMgJAIgKIAMAEIAAgrIgWACIgWABIgBgFIgDgGIAjgDIAigDIAbgFIANAKIgWAEIgZADIAAAYIAEAFIADAEIAUgNIARgMIAKAIIgTANIgVAMQAKAKANAHQAMAHAOAFQgDABgCAEIgEAGQgQgGgNgKQgOgKgLgMIAAA0gAhCBoIgNgBIgBgHIgDgGIANABIAJAAIAEgBIADgCQADgCACgJIAEgYIADgpIg3AAIADgYIADgdIACgcIANABIgCAXIgCAXIgCAWIAYAAIAEgbIACgeIADgeIg0AAIAAgOIBCAAIgCAiIgEAkIgDAfIAGAAIALAAIAAACIAAAEQgCAegCATQgCATgDAKQgCAKgEADIgGAFIgIACIgKAAgAhsAxIAagGIAegIIABANIgcAIIgaAHgAgSA0IgFgFIAVgMQAKgHAHgHIANAEQgJAJgLAIQgKAJgLAFIgFgEgAAZgFIAAgOIgaAEIgYADIgDgMIAOgCIAAhBIgLAAIAAgMIBGAAIAAAMIgIAAIAAA7IAIgBIAAALIgIABIAAAQgAgCgbIAbgEIAAgNIgbAAgAgCg2IAbAAIAAgOIgbAAgAgChOIAbAAIAAgNIgbAAgAAxgPIgFgFQAHgFAHgGQAHgHAGgJIgLgNIgLgMIAJgHIAKALIAKALIAHgPQADgHACgIIgmAAIAAgNIApAAIADAAIACAAIAIACQgDAPgFAMQgFANgGALIAMAOIAJAMIgKAJIgIgLIgKgNIgNAPQgHAGgIAFIgDgFg");
	this.shape_4.setTransform(189.925,374.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(153,153,153,0.498)").s().p("AhjBlIgFgIQBDgIArgYQAsgZAVgqIAPAHQgXAtguAbQgsAZhFALIgDgIgAgFA5IAAhLIhhAAIAAgQIAlAAIAAg2IAQAAIAAA2IAuAAIAAhJIAPAAIAAAaIBHAAIAAAPIhHAAIAAAgIBdAAIAAAQIheAAIAABLgAhYAyIgGgFQAOgLAMgOQANgOAJgNIAPAEQgKAQgOAQQgNAQgOALIgGgGg");
	this.shape_5.setTransform(166.075,374.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(153,153,153,0.498)").s().p("AgBBlIgHgFQAPgPAKgWQAJgVAEgZQAGgZAAgbIgiAAIAAgQIAjAAIABgZIAAgaIAQAAIgBAaIAAAZIA1AAIAAAJIgDA9IgDAqIgDAaQgDAJgDADQgEAFgEACIgJACIgOAAIgTgBIgCgHIgDgIIATABIANAAIAFAAIAEgDQADgEADgNIAEgoIADhEIgmAAQgCAdgEAbQgFAbgKAXQgKAXgSARIgEgGgAhjBGIgDgIQACgBADgEIAGgLIAFgPIAHgXIAIgaIgiAAIAAgPIBpAAIAAAPIg3AAQgFASgGAUIgOAkIA8gMIgHgUIgIgTIAOgDIAJAXIAJAYIAFAUIgNAFIgCgIIgDgJIgoAJIgYAFIgLAEIgGACIgCgHgAhghMIAAgOIBbAAIAAAOg");
	this.shape_6.setTransform(142.25,374.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(153,153,153,0.498)").s().p("AhqBiIAAgQICJAAIAEgTIACgVIhsAAIAHgbIAGgfIAGgiIAGgfIg0AAIAAgPIDGAAIAAAPIiBAAIgEATIgDAVIBVAAIADgBIAMABIgDAbIgEAgIgEAgIgFAgIA7AAIAAAQgAgsABIgGAaIBZAAIAEgcIADgZIhWAAIgEAbg");
	this.shape_7.setTransform(118.3,374.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("ABCEnQABgYgEgRQgEgRgIgJQgJgMgSgJQgRgJgZgGIAAgHIAiACIAiACIAaABQAIAAAHgDQAHgCAFgFQAOgMAKgtQAJgsAHhNQg6AkhUArQhTArh1A1QgDAGgEAFQgFAFgGACIg9hrQAcgGAsgMIBlgaIB3ghQBAgRBDgVIAFhaIAFhrImhAAIgGgSIGfAAIA0g1IBQBKQgDAFgIAEQgHAEgMACQgEBvgFBRQgFBPgIA2QgIA2gMAhQgMAhgRAQQgVAWgaAJQgZAKgkAAIgEgBgAgSgbQgbgYgkgZQgjgZgngVQgmgWgjgNIADgHQBMgLA0AFQA1AGAfAQQAfAQAOAVQANAVgCAUQgDAUgQAMQgOALgWAAIgGAAg");
	this.shape_8.setTransform(230.175,295.4012);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333333").s().p("AB7EZQg0gPgsgXQhEAdhTAQQhTAOheADIgBgIQBNgPBFgWQBGgYA4ggQgTgQgQgRQgQgSgOgWQgbAagiAVQgiAWgmAPIgFgGQAWgYAUgdQATgdAPgfQAOgfAKgdIgNACIgMABIgNAAIAAisQgcAbgeAVQgeAVggAQIgFgFQAXgdAYgoQAXgoAUguQAUgvAOgxIB0AvQgDAGgHADQgGADgLgBIgHALIgGAKIDsAAIAxg+IAQAMIAkAbIAmAeQgBAFgFACQgFADgIAAIlvAAIgMARIgMAPIA4AWICjAAIAogtIBVBAQgDADgHAEQgFAEgKACIAACFQgBADgNAFQgNAEgSAEQgRAEgQgBIgQAAIAAgTIiuAAIAAAAQAAACgDADIgIAGIBOAhQgCAFgFAEQgGADgLgBIgEAHIgFAHICJAAIA4gvIBOBLQgDAGgHACQgHACgMABQgjAqguAgQAuAHAwADQAwADAuAAIAAAJQgdAIgQAYQgRAYgGAiQg7gJg1gPgAhHBtIgLAKQAUARAaANQAZANAdAJQAWgQASgTQASgSAOgVIiXAAIgKAMgAhQgGICuAAIAAg4IiuAAgAhQhQICuAAIAAg5IiuAAg");
	this.shape_9.setTransform(133.325,294.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#CCCCCC").ss(1,1,1).p("AzdAAMAm7AAA");
	this.shape_10.setTransform(228.875,350.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]}).wait(130));

	// 单位拍
	this.f = new lib.节拍器f复制("synched",0);
	this.f.name = "f";
	this.f.setTransform(952.95,810.95,1,1,0,0,0,-441.4,-226.6);
	this.f._off = true;

	this.timeline.addTween(cjs.Tween.get(this.f).wait(6).to({_off:false},0).wait(124));

	// 控制
	this.playm1_btn = new lib.play();
	this.playm1_btn.name = "playm1_btn";
	this.playm1_btn.setTransform(162.1,843.2,1,1,0,0,0,54.1,53.2);
	new cjs.ButtonHelper(this.playm1_btn, 0, 1, 1);

	this.stopm1_btn = new lib.stop();
	this.stopm1_btn.name = "stopm1_btn";
	this.stopm1_btn.setTransform(162.1,843.2,1,1,0,0,0,54.1,53.2);
	new cjs.ButtonHelper(this.stopm1_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.playm1_btn}]}).to({state:[{t:this.stopm1_btn}]},6).wait(124));

	// 内容
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#231916").s().p("Ag7A6QABgIADABIAIAAQAHAAACgGQAGgNAJgbQAOgjAAgEIAAgDQgBgEgDAAQgEgBgMAWQAAABAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAgBIAAAAQALghATAAQAFAAAEADQAEACABACQAMgLAPABQAKAAAGAHQAGAHgBALQAAATgMANQgMAOgRAAQgMAAgGgHQgNAkAAAEQAAADAGAAIAJAAQABAAAAAFIAAACgAANgfQgHAOgBAOQABAKAGAAQAJAAAIgQQAJgPAAgMQAAgDgCgFQgDgDgDAAQgIgBgJARg");
	this.shape_11.setTransform(1317.8842,340.3548,4.5006,4.5006);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#231916").s().p("Ag7A6QACgIACABIAIAAQAHAAACgGIAQgoIANgnIAAgDQAAgEgDAAQgFgBgMAWQAAABAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAgBIAAAAQAKghAUAAQAEAAAFADQAEACABACQALgLAPABQALAAAGAHQAGAHAAALQAAATgNANQgNAOgQAAQgMAAgGgHIgNAoQAAADAGAAIAIAAQADAAAAAFIAAACgAANgfQgHAOAAAOQAAAKAGAAQAIAAAJgQQAIgPAAgMQAAgDgCgFQgCgDgDAAQgJgBgIARg");
	this.shape_12.setTransform(1111.8687,340.3548,4.5006,4.5006);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#231916").s().p("Ag7A6QACgIACABIAIAAQAHAAACgGIAQgoIANgnIAAgDQAAgEgEAAQgEgBgMAWQAAABAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBIABAAQAKghAUAAQAEAAAFADQAEACABACQALgLAPABQALAAAGAHQAGAHAAALQAAATgNANQgNAOgQAAQgMAAgGgHQgNAjAAAFQAAADAGAAIAIAAQADAAAAAFIAAACgAANgfQgHAOAAAOQAAAKAGAAQAIAAAJgQQAIgPAAgMQAAgDgCgFQgCgDgDAAQgJgBgIARg");
	this.shape_13.setTransform(898.7648,340.3548,4.5006,4.5006);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#231916").s().p("Ag/BLQgEgFAAgGQAAgMALAAQAKAAAAAJQAAAEgGAHIABAAQAEABAGgEQAJgFAIgVIAVhCIgQAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAgBAAgBQAAgEADAAIASAAQAGgVANgNQANgNAQAAQAIAAAGAEQAGAFAAAGQAAAGgDAEQgDAEgGAAQgEAAgEgDQgDgDAAgDQAAgEAEgFIAFgFQAAgCgGAAQgHABgFAMIgKAeIAFAAQAOAAAAACQgBAGgCAAIgSAAQgUA4gPAWQgRAYgYAAQgGAAgFgEg");
	this.shape_14.setTransform(683.8607,340.3548,4.5006,4.5006);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#231916").s().p("AgqAhQgKgHAAgNQAAgTAYgRQAXgQAXgBQAPAAAKAHQAKAIAAAMQAAAUgXARQgXAQgYAAQgQAAgJgHg");
	this.shape_15.setTransform(1314.3962,411.0144,4.5006,4.5006);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#231916").s().p("AgCCCIAAkDIAGAAIAAEDg");
	this.shape_16.setTransform(1291.3306,474.5855,4.5006,4.5006);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#231916").s().p("AgqAhQgKgHAAgNQAAgTAYgRQAXgQAXgBQAQAAAJAHQAKAIAAAMQAAAUgYARQgWAQgYAAQgPAAgKgHg");
	this.shape_17.setTransform(888.3009,411.0144,4.5006,4.5006);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#231916").s().p("AgDCCIAAkDIAHAAIAAEDg");
	this.shape_18.setTransform(865.3478,474.5855,4.5006,4.5006);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#231916").s().p("AgqAhQgKgHAAgNQAAgSAYgSQAXgQAXgBQAPAAAKAHQAKAIAAAMQAAAUgXARQgXAQgYAAQgPAAgKgHg");
	this.shape_19.setTransform(1101.4048,411.0144,4.5006,4.5006);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#231916").s().p("AgDCCIAAkDIAHAAIAAEDg");
	this.shape_20.setTransform(1078.3392,474.5855,4.5006,4.5006);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#231916").s().p("AgqAhQgKgIAAgMQAAgTAYgRQAXgQAXgBQAPAAAKAHQAKAIAAAMQAAAUgXARQgXAQgYAAQgPAAgKgHg");
	this.shape_21.setTransform(675.3095,411.0144,4.5006,4.5006);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#231916").s().p("AgCCCIAAkDIAGAAIAAEDg");
	this.shape_22.setTransform(652.2439,474.5855,4.5006,4.5006);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#231916").s().p("AB2DgQg7gWgrgSQgqgRgVgBQgVgBgGADQgGAEgRgNQgRgOAXgBIAmgBQAFgSgCgQQgDgQgFgOQgFgPADgVQACgVgFgHQgWAFgMgJQgNgJAKgBQAKgBAOgEQANgFAGgGQAHgGANADQAOAEAJAJQAKAHgKAFQgJAFgKARQgKASAHAOQAIAPACAJQADAIgPAyQBcAiApAHQApAIAhACQAhADApgDIA1gCQAMAAgsAXQgtAYgVADIgGABQgXAAgzgTgAidDTQgMgYgUgWQgVgWAXAGQAXAGAKAAQAMAAACiAIABiiIgBguQgCgNgJACIg0AGQACAxAAAxIAdgFQANgCAKAGQAKAGgPAIQgPAHgggFQAAAsgCAiQAqgFAHAEQAIADAAAIQAAAFgQACQgQACgbgEQgKBTgZAsQgZAtgUARQgVARAOgYQAPgZAVg3QAVg4AGhvQAGhwgOgaQgPgZAVABQAVABAegEQAfgDAKgGQAKgHAXASQAYARgHAIQgGAJgIARQgJASgBBrQgBBqADAuQAEAvgHATQgIASgMAQQgFAHgEAAQgHAAgHgQgAAaCMQgLgRAGgTQAGgSADhSQAChSgDgxQgEgxgJgOQgIgNAIgCIAYgBQAOAAAegJQAdgIAPgLQAPgLAQAFQAQAFAPALQAPALgKAKQgKAJgIAbQgHAcgLAjQgLAkgKANQgKAOgHgUQgjAKggAFIAACJQAAAMASgMQARgMAdgOQAegNgUATQgTAUgaAVQgaAVgKAMQgEAFgEAAQgGAAgHgKgABtiTQAJAIgRAIQgRAJgeAAIAAA7QA3gMARgFQAKg7ACgdQADgcgEgHQgEgIgWAFQgWAFglAMIAAAyIAbgJQAJgDAHAAQAIAAAGAEgADGBmQgZgagUgNIgkgZQgQgLgLgEQgLgDgKgJQgKgJAPADIAjAHQAMgMAVgZQAVgaACgQQADgQAXAWQAXAWgOAIQgPAHgQAKQgQAKggAVQAvARAeASQAfARgCAdQgBAQgIAAQgHAAgNgMgAguhuQgYgdgFgKQgFgKAkAIQAjAJgFAeQgCAPgJAAQgHAAgOgNg");
	this.shape_23.setTransform(1362.1574,609.7709);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#231916").s().p("AhvD7QgNgXgbgWQgbgXAgAIQAgAHAGgHQAHgIABgbIAEhpQhgBMgNAUQgMATgZgYQgYgZARgBQARgBAugeQAtgdAtglIAAhMQglAIgTABQgSABgTgFQgSgFAUgFQATgFBIgbQAAg2gCgnQgBgogMgWQgNgWAoAQQAnAQgKAQQgJAQgDBlQAlgMAMAKQANAJgOAKQgNAKgjAPIAABBQAngfgIAPQgJAPgWAYIABCTQACA0gSAaQgJANgHAAQgHAAgGgLgADSDVQgKgUgLgRQgLgRgbABQgbABgWAFQgWAFgZgHQgHA7gOgUQgNgUADgbQAEgbgChLQgDhKgNgVQgNgVAUAHIAhAIQAKgPAehBQAdhBgKgZQgKgYAqAWQAqAWgRAMQgRANhPB9QAlgFAggHQAggIAKgHQAKgHAWAHQAWAHAPAKQAOAKgNAaQgOAZAIBRQAHBRgQAhQgKAVgIAAQgEAAgEgHgAA3CVIBYgMQAhgFAMAIQAMAJADgPQACgPACguQABgvgEgkQgEglgZADQgaACgaAFQgaAFgsAFQAAAmACAoQAjgFAcgJQAcgJALAJQALAJgTAKQgUAJgZAFQgYAFgZgKg");
	this.shape_24.setTransform(1297.3773,609.371);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#231916").s().p("AB2DgQg7gWgrgSQgqgRgVgBQgVgBgGADQgGAEgRgNQgRgOAXgBIAmgBQAFgSgCgQQgDgQgFgOQgFgPADgVQACgVgFgHQgWAFgMgJQgNgJAKgBQAKgBAOgEQANgFAGgGQAHgGANADQAOAEAJAJQAKAHgKAFQgJAFgKARQgKASAHAOQAIAPACAJQADAIgPAyQBcAiApAHQApAIAhACQAhADApgDIA1gCQAMAAgsAXQgtAYgVADIgGABQgXAAgzgTgAidDTQgMgYgUgWQgVgWAXAGQAXAGAKAAQAMAAACiAIABiiIgBguQgCgNgJACIg0AGQACAxAAAxIAdgFQANgCAKAGQAKAGgPAIQgPAHgggFQAAAsgCAiQAqgFAHAEQAIADAAAIQAAAFgQACQgQACgbgEQgKBTgZAsQgZAtgUARQgVARAOgYQAPgZAVg3QAVg4AGhvQAGhwgOgaQgPgZAVABQAVABAegEQAfgDAKgGQAKgHAXASQAYARgHAIQgGAJgIARQgJASgBBrQgBBqADAuQAEAvgHATQgIASgMAQQgFAHgEAAQgHAAgHgQgAAaCMQgLgRAGgTQAGgSADhSQAChSgDgxQgEgxgJgOQgIgNAIgCIAYgBQAOAAAegJQAdgIAPgLQAPgLAQAFQAQAFAPALQAPALgKAKQgKAJgIAbQgHAcgLAjQgLAkgKANQgKAOgHgUQgjAKggAFIAACJQAAAMASgMQARgMAdgOQAegNgUATQgTAUgaAVQgaAVgKAMQgEAFgEAAQgGAAgHgKgABtiTQAJAIgRAIQgRAJgeAAIAAA7QA3gMARgFQAKg7ACgdQADgcgEgHQgEgIgWAFQgWAFglAMIAAAyIAbgJQAJgDAHAAQAIAAAGAEgADGBmQgZgagUgNIgkgZQgQgLgLgEQgLgDgKgJQgKgJAPADIAjAHQAMgMAVgZQAVgaACgQQADgQAXAWQAXAWgOAIQgPAHgQAKQgQAKggAVQAvARAeASQAfARgCAdQgBAQgIAAQgHAAgNgMgAguhuQgYgdgFgKQgFgKAkAIQAjAJgFAeQgCAPgJAAQgHAAgOgNg");
	this.shape_25.setTransform(1141.6074,609.7709);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#231916").s().p("AhvD7QgNgXgbgWQgbgXAgAIQAgAHAGgHQAHgIABgbIAEhpQhgBMgNAUQgMATgZgYQgYgZARgBQARgBAugeQAtgdAtglIAAhMQglAIgTABQgSABgTgFQgSgFAUgFQATgFBIgbQAAg2gCgnQgBgogMgWQgNgWAoAQQAnAQgKAQQgJAQgDBlQAlgMAMAKQANAJgOAKQgNAKgjAPIAABBQAngfgIAPQgJAPgWAYIABCTQACA0gSAaQgJANgHAAQgHAAgGgLgADSDVQgKgUgLgRQgLgRgbABQgbABgWAFQgWAFgZgHQgHA7gOgUQgNgUADgbQAEgbgChLQgDhKgNgVQgNgVAUAHIAhAIQAKgPAehBQAdhBgKgZQgKgYAqAWQAqAWgRAMQgRANhPB9QAlgFAggHQAggIAKgHQAKgHAWAHQAWAHAPAKQAOAKgNAaQgOAZAIBRQAHBRgQAhQgKAVgIAAQgEAAgEgHgAA3CVIBYgMQAhgFAMAIQAMAJADgPQACgPACguQABgvgEgkQgEglgZADQgaACgaAFQgaAFgsAFQAAAmACAoQAjgFAcgJQAcgJALAJQALAJgTAKQgUAJgZAFQgYAFgZgKg");
	this.shape_26.setTransform(1076.8273,609.371);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#231916").s().p("AB2DgQg7gWgrgSQgqgRgVgBQgVgBgGADQgGAEgRgNQgRgOAXgBIAmgBQAFgSgCgQQgDgQgFgOQgFgPADgVQACgVgFgHQgWAFgMgJQgNgJAKgBQAKgBAOgEQANgFAGgGQAHgGANADQAOAEAJAJQAKAHgKAFQgJAFgKARQgKASAHAOQAIAPACAJQADAIgPAyQBcAiApAHQApAIAhACQAhADApgDIA1gCQAMAAgsAXQgtAYgVADIgGABQgXAAgzgTgAidDTQgMgYgUgWQgVgWAXAGQAXAGAKAAQAMAAACiAIABiiIgBguQgCgNgJACIg0AGQACAxAAAxIAdgFQANgCAKAGQAKAGgPAIQgPAHgggFQAAAsgCAiQAqgFAHAEQAIADAAAIQAAAFgQACQgQACgbgEQgKBTgZAsQgZAtgUARQgVARAOgYQAPgZAVg3QAVg4AGhvQAGhwgOgaQgPgZAVABQAVABAegEQAfgDAKgGQAKgHAXASQAYARgHAIQgGAJgIARQgJASgBBrQgBBqADAuQAEAvgHATQgIASgMAQQgFAHgEAAQgHAAgHgQgAAaCMQgLgRAGgTQAGgSADhSQAChSgDgxQgEgxgJgOQgIgNAIgCIAYgBQAOAAAegJQAdgIAPgLQAPgLAQAFQAQAFAPALQAPALgKAKQgKAJgIAbQgHAcgLAjQgLAkgKANQgKAOgHgUQgjAKggAFIAACJQAAAMASgMQARgMAdgOQAegNgUATQgTAUgaAVQgaAVgKAMQgEAFgEAAQgGAAgHgKgABtiTQAJAIgRAIQgRAJgeAAIAAA7QA3gMARgFQAKg7ACgdQADgcgEgHQgEgIgWAFQgWAFglAMIAAAyIAbgJQAJgDAHAAQAIAAAGAEgADGBmQgZgagUgNIgkgZQgQgLgLgEQgLgDgKgJQgKgJAPADIAjAHQAMgMAVgZQAVgaACgQQADgQAXAWQAXAWgOAIQgPAHgQAKQgQAKggAVQAvARAeASQAfARgCAdQgBAQgIAAQgHAAgNgMgAguhuQgYgdgFgKQgFgKAkAIQAjAJgFAeQgCAPgJAAQgHAAgOgNg");
	this.shape_27.setTransform(921.1074,609.7709);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#231916").s().p("AhvD7QgNgXgbgWQgbgXAgAIQAgAHAGgHQAHgIABgbIAEhpQhgBMgNAUQgMATgZgYQgYgZARgBQARgBAugeQAtgdAtglIAAhMQglAIgTABQgSABgTgFQgSgFAUgFQATgFBIgbQAAg2gCgnQgBgogMgWQgNgWAoAQQAnAQgKAQQgJAQgDBlQAlgMAMAKQANAJgOAKQgNAKgjAPIAABBQAngfgIAPQgJAPgWAYIABCTQACA0gSAaQgJANgHAAQgHAAgGgLgADSDVQgKgUgLgRQgLgRgbABQgbABgWAFQgWAFgZgHQgHA7gOgUQgNgUADgbQAEgbgChLQgDhKgNgVQgNgVAUAHIAhAIQAKgPAehBQAdhBgKgZQgKgYAqAWQAqAWgRAMQgRANhPB9QAlgFAggHQAggIAKgHQAKgHAWAHQAWAHAPAKQAOAKgNAaQgOAZAIBRQAHBRgQAhQgKAVgIAAQgEAAgEgHgAA3CVIBYgMQAhgFAMAIQAMAJADgPQACgPACguQABgvgEgkQgEglgZADQgaACgaAFQgaAFgsAFQAAAmACAoQAjgFAcgJQAcgJALAJQALAJgTAKQgUAJgZAFQgYAFgZgKg");
	this.shape_28.setTransform(856.3273,609.371);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#231916").s().p("AgsEJQgEgYgogZQgngaAoALQApALAQgLQAQgLAEgtQADgsgChUQhUAKgqAIIg5ALQgQADgQgDQgQgEgSgOQgRgNALgBQALgCAWAAQAXAAA4gGQA5gGBWgLQAAgogFgiIg1AHQgVADgcgLQgcgLAigFIBbgPQgCgUgKgSIgRgfQglAHgbgCQgcgCAngMQAmgLAtgSQAtgTAPgOQAOgPAFgCQAFgDAjAWQAiAWggAGQggAHhhAdQAcAPAIAMQAHANAAAbQAigFAZgIQAZgHAWAPQAWAOghAHIhdAQQAFAnAAAnIBZgJQAlgFAagFQAagFARAFQARAFAVAOQAVAOgQAEQgQAEgfgDQgfgCgwACIhwAHIADB+QAAAegGAgQgGAggbAcQgOAPgJAAQgGAAgDgKg");
	this.shape_29.setTransform(700.6049,610.7183);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#231916").s().p("AhvD7QgNgXgbgWQgbgXAgAIQAgAHAGgHQAHgIABgbIAEhpQhgBMgNAUQgMATgZgYQgYgZARgBQARgBAugeQAtgdAtglIAAhMQglAIgTABQgSABgTgFQgSgFAUgFQATgFBIgbQAAg2gCgnQgBgogMgWQgNgWAoAQQAnAQgKAQQgJAQgDBlQAlgMAMAKQANAJgOAKQgNAKgjAPIAABBQAngfgIAPQgJAPgWAYIABCTQACA0gSAaQgJANgHAAQgHAAgGgLgADSDVQgKgUgLgRQgLgRgbABQgbABgWAFQgWAFgZgHQgHA7gOgUQgNgUADgbQAEgbgChLQgDhKgNgVQgNgVAUAHIAhAIQAKgPAehBQAdhBgKgZQgKgYAqAWQAqAWgRAMQgRANhPB9QAlgFAggHQAggIAKgHQAKgHAWAHQAWAHAPAKQAOAKgNAaQgOAZAIBRQAHBRgQAhQgKAVgIAAQgEAAgEgHgAA3CVIBYgMQAhgFAMAIQAMAJADgPQACgPACguQABgvgEgkQgEglgZADQgaACgaAFQgaAFgsAFQAAAmACAoQAjgFAcgJQAcgJALAJQALAJgTAKQgUAJgZAFQgYAFgZgKg");
	this.shape_30.setTransform(635.7773,609.371);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#231916").s().p("EBQ/AFfIAAlGIhKAAIAAFGIgtAAIAAlGMig0AAAIAAgsMCg0AAAIAAlLIAtAAIAAFLIBKAAIAAlLIAtAAIAAK9g");
	this.shape_31.setTransform(1035.8,411);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#E28624").s().p("Ag/BLQgEgFAAgGQAAgMALAAQAKAAAAAJQAAAEgGAHIABAAQAEABAGgEQAJgFAIgVIAVhCIgQAAQAAAAgBAAQAAAAgBgBQAAAAAAgBQAAgBAAgBQAAgEADAAIASAAQAGgVANgNQANgNAQAAQAIAAAGAEQAGAFAAAGQAAAGgDAEQgDAEgGAAQgEAAgEgDQgDgDAAgDQAAgEAEgFIAFgFQAAgCgGAAQgHABgFAMIgKAeIAFAAQAOAAAAACQgBAGgCAAIgSAAQgUA4gPAWQgRAYgYAAQgGAAgFgEg");
	this.shape_32.setTransform(683.8607,340.3548,4.5006,4.5006);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#E28624").s().p("AgqAhQgKgIAAgMQAAgTAYgRQAXgQAXgBQAPAAAKAHQAKAIAAAMQAAAUgXARQgXAQgYAAQgPAAgKgHg");
	this.shape_33.setTransform(675.3095,411.0144,4.5006,4.5006);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#E28624").s().p("AgCCCIAAkDIAGAAIAAEDg");
	this.shape_34.setTransform(652.2439,474.5855,4.5006,4.5006);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#E28623").s().p("Ag7A6QACgIACABIAIAAQAHAAACgGIAQgoIANgnIAAgDQAAgEgEAAQgEgBgMAWQAAABAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBgBQAAAAAAgBIABAAQAKghAUAAQAEAAAFADQAEACABACQALgLAPABQALAAAGAHQAGAHAAALQAAATgNANQgNAOgQAAQgMAAgGgHQgNAjAAAFQAAADAGAAIAIAAQADAAAAAFIAAACgAANgfQgHAOAAAOQAAAKAGAAQAIAAAJgQQAIgPAAgMQAAgDgCgFQgCgDgDAAQgJgBgIARg");
	this.shape_35.setTransform(898.7648,340.3548,4.5006,4.5006);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#E28623").s().p("AgqAhQgKgHAAgNQAAgTAYgRQAXgQAXgBQAQAAAJAHQAKAIAAAMQAAAUgYARQgWAQgYAAQgPAAgKgHg");
	this.shape_36.setTransform(888.3009,411.0144,4.5006,4.5006);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#E28623").s().p("AgDCCIAAkDIAHAAIAAEDg");
	this.shape_37.setTransform(865.3478,474.5855,4.5006,4.5006);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#E28623").s().p("AB2DgQg7gWgrgSQgqgRgVgBQgVgBgGADQgGAEgRgNQgRgOAXgBIAmgBQAFgSgCgQQgDgQgFgOQgFgPADgVQACgVgFgHQgWAFgMgJQgNgJAKgBQAKgBAOgEQANgFAGgGQAHgGANADQAOAEAJAJQAKAHgKAFQgJAFgKARQgKASAHAOQAIAPACAJQADAIgPAyQBcAiApAHQApAIAhACQAhADApgDIA1gCQAMAAgsAXQgtAYgVADIgGABQgXAAgzgTgAidDTQgMgYgUgWQgVgWAXAGQAXAGAKAAQAMAAACiAIABiiIgBguQgCgNgJACIg0AGQACAxAAAxIAdgFQANgCAKAGQAKAGgPAIQgPAHgggFQAAAsgCAiQAqgFAHAEQAIADAAAIQAAAFgQACQgQACgbgEQgKBTgZAsQgZAtgUARQgVARAOgYQAPgZAVg3QAVg4AGhvQAGhwgOgaQgPgZAVABQAVABAegEQAfgDAKgGQAKgHAXASQAYARgHAIQgGAJgIARQgJASgBBrQgBBqADAuQAEAvgHATQgIASgMAQQgFAHgEAAQgHAAgHgQgAAaCMQgLgRAGgTQAGgSADhSQAChSgDgxQgEgxgJgOQgIgNAIgCIAYgBQAOAAAegJQAdgIAPgLQAPgLAQAFQAQAFAPALQAPALgKAKQgKAJgIAbQgHAcgLAjQgLAkgKANQgKAOgHgUQgjAKggAFIAACJQAAAMASgMQARgMAdgOQAegNgUATQgTAUgaAVQgaAVgKAMQgEAFgEAAQgGAAgHgKgABtiTQAJAIgRAIQgRAJgeAAIAAA7QA3gMARgFQAKg7ACgdQADgcgEgHQgEgIgWAFQgWAFglAMIAAAyIAbgJQAJgDAHAAQAIAAAGAEgADGBmQgZgagUgNIgkgZQgQgLgLgEQgLgDgKgJQgKgJAPADIAjAHQAMgMAVgZQAVgaACgQQADgQAXAWQAXAWgOAIQgPAHgQAKQgQAKggAVQAvARAeASQAfARgCAdQgBAQgIAAQgHAAgNgMgAguhuQgYgdgFgKQgFgKAkAIQAjAJgFAeQgCAPgJAAQgHAAgOgNg");
	this.shape_38.setTransform(921.1074,609.7709);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#E28623").s().p("AhvD7QgNgXgbgWQgbgXAgAIQAgAHAGgHQAHgIABgbIAEhpQhgBMgNAUQgMATgZgYQgYgZARgBQARgBAugeQAtgdAtglIAAhMQglAIgTABQgSABgTgFQgSgFAUgFQATgFBIgbQAAg2gCgnQgBgogMgWQgNgWAoAQQAnAQgKAQQgJAQgDBlQAlgMAMAKQANAJgOAKQgNAKgjAPIAABBQAngfgIAPQgJAPgWAYIABCTQACA0gSAaQgJANgHAAQgHAAgGgLgADSDVQgKgUgLgRQgLgRgbABQgbABgWAFQgWAFgZgHQgHA7gOgUQgNgUADgbQAEgbgChLQgDhKgNgVQgNgVAUAHIAhAIQAKgPAehBQAdhBgKgZQgKgYAqAWQAqAWgRAMQgRANhPB9QAlgFAggHQAggIAKgHQAKgHAWAHQAWAHAPAKQAOAKgNAaQgOAZAIBRQAHBRgQAhQgKAVgIAAQgEAAgEgHgAA3CVIBYgMQAhgFAMAIQAMAJADgPQACgPACguQABgvgEgkQgEglgZADQgaACgaAFQgaAFgsAFQAAAmACAoQAjgFAcgJQAcgJALAJQALAJgTAKQgUAJgZAFQgYAFgZgKg");
	this.shape_39.setTransform(856.3273,609.371);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#E28623").s().p("Ag7A6QACgIACABIAIAAQAHAAACgGIAQgoIANgnIAAgDQAAgEgDAAQgFgBgMAWQAAABAAAAQAAABgBAAQAAAAAAAAQgBAAAAAAQgBAAAAAAQAAAAgBAAQAAAAAAgBQAAAAAAgBIAAAAQAKghAUAAQAEAAAFADQAEACABACQALgLAPABQALAAAGAHQAGAHAAALQAAATgNANQgNAOgQAAQgMAAgGgHIgNAoQAAADAGAAIAIAAQADAAAAAFIAAACgAANgfQgHAOAAAOQAAAKAGAAQAIAAAJgQQAIgPAAgMQAAgDgCgFQgCgDgDAAQgJgBgIARg");
	this.shape_40.setTransform(1111.8687,340.3548,4.5006,4.5006);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#E28623").s().p("AgqAhQgKgHAAgNQAAgSAYgSQAXgQAXgBQAPAAAKAHQAKAIAAAMQAAAUgXARQgXAQgYAAQgPAAgKgHg");
	this.shape_41.setTransform(1101.4048,411.0144,4.5006,4.5006);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#E28623").s().p("Ag7A6QABgIADABIAIAAQAHAAACgGQAGgNAJgbQAOgjAAgEIAAgDQgBgEgDAAQgEgBgMAWQAAABAAAAQAAABAAAAQgBAAAAAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAAAAAgBQAAAAAAgBIAAAAQALghATAAQAFAAAEADQAEACABACQAMgLAPABQAKAAAGAHQAGAHgBALQAAATgMANQgMAOgRAAQgMAAgGgHQgNAkAAAEQAAADAGAAIAJAAQABAAAAAFIAAACgAANgfQgHAOgBAOQABAKAGAAQAJAAAIgQQAJgPAAgMQAAgDgCgFQgDgDgDAAQgIgBgJARg");
	this.shape_42.setTransform(1317.8842,340.3548,4.5006,4.5006);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#E28623").s().p("AgqAhQgKgHAAgNQAAgTAYgRQAXgQAXgBQAPAAAKAHQAKAIAAAMQAAAUgXARQgXAQgYAAQgQAAgJgHg");
	this.shape_43.setTransform(1314.3962,411.0144,4.5006,4.5006);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#E28623").s().p("AgCCCIAAkDIAGAAIAAEDg");
	this.shape_44.setTransform(1291.3306,474.5855,4.5006,4.5006);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28,p:{x:856.3273}},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18,p:{x:865.3478}},{t:this.shape_17},{t:this.shape_16,p:{x:1291.3306}},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]}).to({state:[{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28,p:{x:856.3273}},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_34},{t:this.shape_33},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18,p:{x:865.3478}},{t:this.shape_17},{t:this.shape_16,p:{x:1291.3306}},{t:this.shape_15},{t:this.shape_32},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},6).to({state:[{t:this.shape_31},{t:this.shape_28,p:{x:635.7773}},{t:this.shape_29},{t:this.shape_39},{t:this.shape_38},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_18,p:{x:1078.3392}},{t:this.shape_19},{t:this.shape_37,p:{x:865.3478}},{t:this.shape_36},{t:this.shape_16,p:{x:1291.3306}},{t:this.shape_15},{t:this.shape_14},{t:this.shape_35},{t:this.shape_12},{t:this.shape_11}]},30).to({state:[{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28,p:{x:856.3273}},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_37,p:{x:1078.3392}},{t:this.shape_41},{t:this.shape_18,p:{x:865.3478}},{t:this.shape_17},{t:this.shape_16,p:{x:1291.3306}},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_40},{t:this.shape_11}]},31).to({state:[{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28,p:{x:856.3273}},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_16,p:{x:652.2439}},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18,p:{x:865.3478}},{t:this.shape_17},{t:this.shape_44},{t:this.shape_43},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_42}]},31).wait(32));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1059.2,783.2,499.5,113.29999999999995);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#F7C677",
	opacity: 0.00,
	manifest: [
		{src:"sounds/轻声踏步_.mp3?1693897222979", id:"轻声踏步"},
		{src:"sounds/沉重踏步_.mp3?1693897222979", id:"沉重踏步"}
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
an.compositions['6CC2A54E1AA7D548BDC8E574C2A3EB8B'] = {
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