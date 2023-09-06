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



(lib.an_Video = function(options) {
	this.initialize();
	this._element = new $.an.Video(options);
	this._el = this._element.create();
}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,400,300);

p._tick = _tick;
p._handleDrawEnd = _handleDrawEnd;
p._updateVisibility = _updateVisibility;
p.draw = _componentDraw;



(lib.lnav2 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQARAJAMAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQADgHAAgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBiAAIAHgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBqAAIACgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQARAUAYAQQAZARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgRgPIAAANIgyAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMggAKIgGgIgAA2ALIgNgMQgGgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape.setTransform(76.35,24.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AhoCSIAAiyIgOAVIgOATIgDgGIgEgHIgFgHQANgQANgVQAMgVAJgYQAKgYAIgZIATAFQgFARgGAQIgMAfIAADcgAAbCSIAAheIhcAAIAAgUIBcAAIAAgyIhPAAIAAgUIBPAAIAAhrIAVAAIAABrIBUAAIAAAUIhUAAIAAAyIBgAAIAAAUIhgAAIAABegABJg0IgJgFQAKgOAKgTQAJgSAHgSIAUAGIgMAaIgNAZIgNAWIgJgFgAgShEIgOgZIgPgYIARgIIAQAXIAOAZQAGALAEAJIgRAKIgLgVg");
	this.shape_1.setTransform(43.9,24.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_2.setTransform(23.85,34.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_3.setTransform(10.625,24.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C7D58D").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQARAJAMAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQADgHAAgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBiAAIAHgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBqAAIACgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQARAUAYAQQAZARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgRgPIAAANIgyAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMggAKIgGgIgAA2ALIgNgMQgGgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_4.setTransform(76.35,24.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C7D58D").s().p("AhoCSIAAiyIgOAVIgOATIgDgGIgEgHIgFgHQANgQANgVQAMgVAJgYQAKgYAIgZIATAFQgFARgGAQIgMAfIAADcgAAbCSIAAheIhcAAIAAgUIBcAAIAAgyIhPAAIAAgUIBPAAIAAhrIAVAAIAABrIBUAAIAAAUIhUAAIAAAyIBgAAIAAAUIhgAAIAABegABJg0IgJgFQAKgOAKgTQAJgSAHgSIAUAGIgMAaIgNAZIgNAWIgJgFgAgShEIgOgZIgPgYIARgIIAQAXIAOAZQAGALAEAJIgRAKIgLgVg");
	this.shape_5.setTransform(43.9,24.2);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C7D58D").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_6.setTransform(23.85,34.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C7D58D").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_7.setTransform(10.625,24.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_8.setTransform(114.675,22.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_8}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-4.8,236.79999999999998,55.199999999999996);


(lib.lnav1 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("AgiCLIAAiLICoAAIAACKIgWAAIAAgLIh9AAIAAAMgAgNBsIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBVIAAjOIBPAAIAACwIg8AAIAAAegAhxAiIAoAAIAAiHIgoAAgAgYgWIAAh0ICRAAIAAB0gAgEgoIBpAAIAAggIhpAAgAgEhYIBpAAIAAghIhpAAg");
	this.shape.setTransform(76.25,24.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AiJCAIAZgXIAbgdIAagdIALAQIgkAqQgUAWgSASgAgLCJQgKgCgFgJQgEgIAAgPIAAiZICQAAIAABRQABAJgDAGQgDAEgHADQgJADgNAAIgiAAIgEgKIgFgJIAfAAIASAAIAGgBQAAgBABAAQAAgBAAAAQAAgBAAgBQABAAAAgBIAAg8IhmAAIAACEQAAAHACADQACAEAFACQAGACAKgBIBRAAQAJABAGgEQAEgDADgKQACgKABgSIAJAGIALADQgBAVgEANQgFAMgJAFQgIAFgRgBIhTAAIgEABQgNAAgKgEgAhjAjIgVgMIgWgKIAMgNIAVAIIAWALIARAJIgMAQIgRgJgAhSgWIgUgNIgVgMIAMgNIAUAKIAWANIAQAKIgMAQIgRgLgAAqhAIAAggIhaAAIAAAgIgVAAIAAggIhIAAIAAgTIBIAAIAAgdIAVAAIAAAdIBaAAIAAgdIAWAAIAAAdIBLAAIAAATIhLAAIAAAgg");
	this.shape_1.setTransform(44.45,24.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_2.setTransform(23.85,34.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_3.setTransform(11.15,24.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#C7D58D").s().p("AgiCLIAAiLICoAAIAACKIgWAAIAAgLIh9AAIAAAMgAgNBsIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBVIAAjOIBPAAIAACwIg8AAIAAAegAhxAiIAoAAIAAiHIgoAAgAgYgWIAAh0ICRAAIAAB0gAgEgoIBpAAIAAggIhpAAgAgEhYIBpAAIAAghIhpAAg");
	this.shape_4.setTransform(76.25,24.85);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#C7D58D").s().p("AiJCAIAZgXIAbgdIAagdIALAQIgkAqQgUAWgSASgAgLCJQgKgCgFgJQgEgIAAgPIAAiZICQAAIAABRQABAJgDAGQgDAEgHADQgJADgNAAIgiAAIgEgKIgFgJIAfAAIASAAIAGgBQAAgBABAAQAAgBAAAAQAAgBAAgBQABAAAAgBIAAg8IhmAAIAACEQAAAHACADQACAEAFACQAGACAKgBIBRAAQAJABAGgEQAEgDADgKQACgKABgSIAJAGIALADQgBAVgEANQgFAMgJAFQgIAFgRgBIhTAAIgEABQgNAAgKgEgAhjAjIgVgMIgWgKIAMgNIAVAIIAWALIARAJIgMAQIgRgJgAhSgWIgUgNIgVgMIAMgNIAUAKIAWANIAQAKIgMAQIgRgLgAAqhAIAAggIhaAAIAAAgIgVAAIAAggIhIAAIAAgTIBIAAIAAgdIAVAAIAAAdIBaAAIAAgdIAWAAIAAAdIBLAAIAAATIhLAAIAAAgg");
	this.shape_5.setTransform(44.45,24.15);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#C7D58D").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_6.setTransform(23.85,34.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#C7D58D").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_7.setTransform(11.15,24.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_8.setTransform(118.425,18.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},1).to({state:[{t:this.shape_8}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-9,236.9,57);


// stage content:
(lib.听与唱 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,lnav2:6};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.stop();
		
		var _this = this;
		
		/*
		单击指定元件实例时将执行相应函数。
		*/
		_this.lnav1_btn.on('click', function () {
		
			_this.gotoAndStop('lnav1');
		
		});
		
		_this.lnav2_btn.on('click', function () {
		
			_this.gotoAndStop('lnav2');
		
		});
		
		_this.lnav3_btn.on('click', function () {
		
			_this.gotoAndStop('lnav3');
		
		});
		
		_this.lnav4_btn.on('click', function () {
		
			_this.gotoAndStop('lnav4');
		
		});
		
		_this.lnav5_btn.on('click', function () {
		
			_this.gotoAndStop('lnav5');
		
		});
		
		
		_this.lnav6_btn.on('click', function () {
		
			_this.gotoAndStop('lnav6');
		
		});
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(12));

	// leftnav_on
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#69AF4B").s().p("AgiCLIAAiLICnAAIAACJIgVAAIAAgLIh9AAIAAANgAgNBrIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBWIAAjOIBPAAIAACuIg8AAIAAAggAhxAiIAoAAIAAiHIgoAAgAgYgWIAAh0ICSAAIAAB0gAgDgnIBoAAIAAghIhoAAgAgDhZIBoAAIAAgfIhoAAg");
	this.shape.setTransform(178.55,442.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#69AF4B").s().p("AiICAIAXgXIAbgcIAageIAMAQIgkAqQgUAWgSASgAgKCKQgLgEgFgIQgEgIABgPIAAiYICQAAIAABQQgBAJgCAFQgDAGgIACQgHACgOABIgiABIgDgKIgGgLIAgABIARgBIAGgBQAAAAABAAQAAgBAAAAQAAgBAAgBQAAAAAAgBIAAg8IhlAAIAACEQAAAHACAEQACADAFACQAFABAMABIBQAAQAJgBAGgDQAEgDACgKQACgJACgTIAKAFIAKAEQgBAWgFAMQgDAMgJAFQgKAFgQgBIhSAAIgFABQgNAAgJgDgAhjAiIgVgKIgWgKIALgPIAWAJIAVAKIASAJIgMARIgRgKgAhRgWIgVgNIgWgMIANgNIAVALIAUALIARALIgMAQIgQgLgAArhAIAAggIhaAAIAAAgIgWAAIAAggIhJAAIAAgUIBJAAIAAgcIAWAAIAAAcIBaAAIAAgcIAVAAIAAAcIBKAAIAAAUIhKAAIAAAgg");
	this.shape_1.setTransform(146.75,442.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#69AF4B").s().p("AgNAPQgFgFgBgJQABgJAFgGQAGgFAHgBQAIABAGAFQAGAGgBAJQABAJgGAFQgGAGgIAAQgHAAgGgGg");
	this.shape_2.setTransform(126.15,452.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#69AF4B").s().p("Ag+B1IAAgVIA1AAIAAizIgqAAIAAgRQAPgDAMgEQAMgDAJgGIATAAIAADUIAvAAIAAAVg");
	this.shape_3.setTransform(113.45,442.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#69AF4B").s().p("ABQCBQgRgKgTgJQgTgJgRgHIAPgOIAjAQQATAIARAKQAQAJAMAIIgPAPQgLgIgQgJgAhwCKIgHgIQAbgIAUgJQATgJAMgKQAMgJAHgKIhRAAIAAgSIBZAAQACgHABgIIABgNIAAAAIgyAAIAAgMQgOAOgTAMQgSAMgXAJIgGgJIgHgHQAdgMAXgQQAXgRAQgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBrAAIABgOIABgMIAUABIgBAMIgCANIBuAAIAAARIhxAAIgDANIgDAMIBqAAIAAASIhwAAIgGAMIgGANICfAAIAAASIhXAAQARAUAaAQQAZARAcAIIgIAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgNANQgMANgWALQgVAMgiAKIgFgIgAA2ALIgMgMQgHgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_4.setTransform(180.6,505.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#69AF4B").s().p("AhoCSIAAizIgOAXIgOASIgDgGIgFgHIgDgGQAMgRAMgVQAMgVALgYQAKgYAHgZIATAGQgEAQgHAQIgNAgIAADbgAAbCRIAAhdIhcAAIAAgTIBcAAIAAgzIhPAAIAAgTIBPAAIAAhsIAVAAIAABsIBUAAIAAATIhUAAIAAAzIBhAAIAAATIhhAAIAABdgABKg0IgKgEQAKgPAKgTQAJgRAIgTIATAGIgMAZIgNAaIgMAXIgJgGgAgRhFIgPgYIgQgYIARgIIARAYIAOAXQAGAMAEAKIgQAKIgLgXg");
	this.shape_5.setTransform(148.15,505.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#69AF4B").s().p("AgNAPQgGgFABgJQgBgJAGgGQAGgFAHgBQAIABAGAFQAFAGABAJQgBAJgFAFQgGAGgIAAQgHAAgGgGg");
	this.shape_6.setTransform(128.1,516.325);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#69AF4B").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_7.setTransform(114.875,506.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]},6).wait(6));

	// leftnav
	this.lnav2_btn = new lib.lnav2();
	this.lnav2_btn.name = "lnav2_btn";
	this.lnav2_btn.setTransform(151.45,505.75,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav2_btn, 0, 1, 2, false, new lib.lnav2(), 3);

	this.lnav1_btn = new lib.lnav1();
	this.lnav1_btn.name = "lnav1_btn";
	this.lnav1_btn.setTransform(149.5,442.1,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav1_btn, 0, 1, 2, false, new lib.lnav1(), 3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(153,153,153,0.498)").s().p("AAgBoIAAgxQgJALgNALQgMAKgNAHIgFgFIgGgFQAOgGAMgJQAMgJAIgKIAMAEIAAgrIgWACIgWABIgBgFIgDgGIAjgDIAigDIAbgFIANAKIgWAEIgZADIAAAYIAEAFIADAEIAUgNIARgMIAKAIIgTANIgVAMQAKAKANAHQAMAHAOAFQgDABgCAEIgEAGQgQgGgNgKQgOgKgLgMIAAA0gAhCBoIgNgBIgBgHIgDgGIANABIAJAAIAEgBIADgCQADgCACgJIAEgYIADgpIg3AAIADgYIADgdIACgcIANABIgCAXIgCAXIgCAWIAYAAIAEgbIACgeIADgeIg0AAIAAgOIBCAAIgCAiIgEAkIgDAfIAGAAIALAAIAAACIAAAEQgCAegCATQgCATgDAKQgCAKgEADIgGAFIgIACIgKAAgAhsAxIAagGIAegIIABANIgcAIIgaAHgAgSA0IgFgFIAVgMQAKgHAHgHIANAEQgJAJgLAIQgKAJgLAFIgFgEgAAZgFIAAgOIgaAEIgYADIgDgMIAOgCIAAhBIgLAAIAAgMIBGAAIAAAMIgIAAIAAA7IAIgBIAAALIgIABIAAAQgAgCgbIAbgEIAAgNIgbAAgAgCg2IAbAAIAAgOIgbAAgAgChOIAbAAIAAgNIgbAAgAAxgPIgFgFQAHgFAHgGQAHgHAGgJIgLgNIgLgMIAJgHIAKALIAKALIAHgPQADgHACgIIgmAAIAAgNIApAAIADAAIACAAIAIACQgDAPgFAMQgFANgGALIAMAOIAJAMIgKAJIgIgLIgKgNIgNAPQgHAGgIAFIgDgFg");
	this.shape_8.setTransform(189.925,374.775);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(153,153,153,0.498)").s().p("AhjBlIgFgIQBDgIArgYQAsgZAVgqIAPAHQgXAtguAbQgsAZhFALIgDgIgAgFA5IAAhLIhhAAIAAgQIAlAAIAAg2IAQAAIAAA2IAuAAIAAhJIAPAAIAAAaIBHAAIAAAPIhHAAIAAAgIBdAAIAAAQIheAAIAABLgAhYAyIgGgFQAOgLAMgOQANgOAJgNIAPAEQgKAQgOAQQgNAQgOALIgGgGg");
	this.shape_9.setTransform(166.075,374.25);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(153,153,153,0.498)").s().p("AgBBlIgHgFQAPgPAKgWQAJgVAEgZQAGgZAAgbIgiAAIAAgQIAjAAIABgZIAAgaIAQAAIgBAaIAAAZIA1AAIAAAJIgDA9IgDAqIgDAaQgDAJgDADQgEAFgEACIgJACIgOAAIgTgBIgCgHIgDgIIATABIANAAIAFAAIAEgDQADgEADgNIAEgoIADhEIgmAAQgCAdgEAbQgFAbgKAXQgKAXgSARIgEgGgAhjBGIgDgIQACgBADgEIAGgLIAFgPIAHgXIAIgaIgiAAIAAgPIBpAAIAAAPIg3AAQgFASgGAUIgOAkIA8gMIgHgUIgIgTIAOgDIAJAXIAJAYIAFAUIgNAFIgCgIIgDgJIgoAJIgYAFIgLAEIgGACIgCgHgAhghMIAAgOIBbAAIAAAOg");
	this.shape_10.setTransform(142.25,374.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(153,153,153,0.498)").s().p("AhqBiIAAgQICJAAIAEgTIACgVIhsAAIAHgbIAGgfIAGgiIAGgfIg0AAIAAgPIDGAAIAAAPIiBAAIgEATIgDAVIBVAAIADgBIAMABIgDAbIgEAgIgEAgIgFAgIA7AAIAAAQgAgsABIgGAaIBZAAIAEgcIADgZIhWAAIgEAbg");
	this.shape_11.setTransform(118.3,374.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333333").s().p("AhCEpIAAkzIBaAjICUAAIAogsIBUA/QgDAEgGAEQgHAEgLACIAADaQgBADgMAFQgNAEgRAFQgRAEgPAAIgQAAIAAgzIidAAIAAAXQgBAFgLAGQgKAHgRAFQgRAFgSAAgAAVDlICdAAIAAhXIidAAgAAVB8ICdAAIAAhRIidAAgAknC0IAAmwIBTAiIAhAAIAmgqIBOA8QgDAEgHAEIgQAFIAAEwQgBADgLAFQgLAFgQAEQgQAFgOAAIgOAAIAAg3IgrAAIAABEQAAAFgJAGQgKAHgPAFQgPAFgSAAgAjXBCIArAAIAAkKIgrAAgAgugEIAAkZIBXAhIBxAAIApgtIBVBBQgEAEgHAFQgHAEgMACIAAC4QgBACgMAEQgMAFgRAEQgRAEgPAAIgPAAIAAgmIh8AAIAAAVQAAAEgKAGQgLAGgQAFQgQAFgSABgAAlhGIB8AAIAAhIIh8AAgAAligIB8AAIAAhKIh8AAg");
	this.shape_12.setTransform(262.425,295);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#333333").s().p("AAxEMQgEgRgJgKQgLgLgTgJQgTgJgbgFIAAgHIAoADIApACIAbABQAJAAAGgBQAFgCAGgFQAMgJALgeQAKgeAIgxQAJgxAGg/Ij8AAIgfAnIhUgsIAJgIIAKgIQAGgaAGgjIALhIIAJhEIAFgyIB0AVQgBAGgGAFQgGAFgMAAIgFAoIgHAwIDvAAIAwg9IAQAMIAjAbIAnAeQgCAFgFACQgFADgHAAIlpAAIgKA7IgJA1ID4AAIAygwIBRBGQgEAFgHADQgHADgMACQgKB6gVBIQgUBHghAZQgUAPgZAHQgaAHgmAAQAAgVgDgQgAkhBiIgFgSIEeAAIAvg9IAPALIAiAbIAkAfQgBAFgFACQgFADgHAAg");
	this.shape_13.setTransform(196.725,294.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#333333").s().p("AB4ExIAAljIhEAAIAAACQABAvgGAvQgHAwgVAvQgVAvgsAoQgtAphLAeIgEgEQArglAbgpQAbgoANgrQAOgsAEguQAFgtAAguIAAjUIBbAgQAmgUAigUQAigVAXgQIBgBYQgHAFgMABQgMgBgRgFQgjAGgvAGQgvAGgyAEIAAB+IB4AAIAtg9IAOAMIAgAbIAiAeQgBAFgFADQgFACgHAAIhAAAIAAFOQAAACgJAFQgKAFgRAEQgRAFgYAAgAkoC2IAAm0IBYAkIAiAAIAngsIBQA+QgDAEgGAEQgHADgJACIAAEtQgCACgLAGQgMAFgRAFQgQAEgPAAIgPAAIAAhEIgqAAIAABVQAAAEgKAHQgKAHgRAGQgQAFgTAAgAjSAyIAqAAIAAj6IgqAAg");
	this.shape_14.setTransform(134.675,294.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#CCCCCC").ss(1,1,1).p("AzdAAMAm7AAA");
	this.shape_15.setTransform(228.875,350.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.lnav1_btn},{t:this.lnav2_btn}]}).wait(12));

	// 不动内容
	this.谱面讲解 = new lib.an_Video({'id': '谱面讲解', 'src':'videos/1.拔萝卜范唱.mp4', 'autoplay':false, 'controls':true, 'muted':false, 'loop':false, 'poster':'', 'preload':true, 'class':'video'});

	this.谱面讲解.name = "谱面讲解";
	this.谱面讲解.setTransform(1111.45,515.5,3.625,2.6667,0,0,0,200,150);

	this.节奏练习 = new lib.an_Video({'id': '节奏练习', 'src':'videos/2.拔萝卜伴奏.mp4', 'autoplay':false, 'controls':true, 'muted':false, 'loop':false, 'poster':'', 'preload':true, 'class':'video'});

	this.节奏练习.name = "节奏练习";
	this.节奏练习.setTransform(1111.45,515.5,3.625,2.6666,0,0,0,200,150);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.谱面讲解}]}).to({state:[{t:this.节奏练习}]},6).wait(6));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1059.2,654.2,779.0999999999999,262.69999999999993);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#C7D58D",
	opacity: 0.00,
	manifest: [
		{src:"https://code.jquery.com/jquery-3.4.1.min.js?1693893351151", id:"lib/jquery-3.4.1.min.js"},
		{src:"components/sdk/anwidget.js?1693893351151", id:"sdk/anwidget.js"},
		{src:"components/video/src/video.js?1693893351151", id:"an.Video"}
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
function _updateVisibility(evt) {
	var parent = this.parent;
	var detach = this.stage == null || this._off || !parent;
	while(parent) {
		if(parent.visible) {
			parent = parent.parent;
		}
		else{
			detach = true;
			break;
		}
	}
	detach = detach && this._element && this._element._attached;
	if(detach) {
		this._element.detach();
		this.dispatchEvent('detached');
		stage.removeEventListener('drawstart', this._updateVisibilityCbk);
		this._updateVisibilityCbk = false;
	}
}
function _handleDrawEnd(evt) {
	if(this._element && this._element._attached) {
		var props = this.getConcatenatedDisplayProps(this._props), mat = props.matrix;
		var tx1 = mat.decompose(); var sx = tx1.scaleX; var sy = tx1.scaleY;
		var dp = window.devicePixelRatio || 1; var w = this.nominalBounds.width * sx; var h = this.nominalBounds.height * sy;
		mat.tx/=dp;mat.ty/=dp; mat.a/=(dp*sx);mat.b/=(dp*sx);mat.c/=(dp*sy);mat.d/=(dp*sy);
		this._element.setProperty('transform-origin', this.regX + 'px ' + this.regY + 'px');
		var x = (mat.tx + this.regX*mat.a + this.regY*mat.c - this.regX);
		var y = (mat.ty + this.regX*mat.b + this.regY*mat.d - this.regY);
		var tx = 'matrix(' + mat.a + ',' + mat.b + ',' + mat.c + ',' + mat.d + ',' + x + ',' + y + ')';
		this._element.setProperty('transform', tx);
		this._element.setProperty('width', w);
		this._element.setProperty('height', h);
		this._element.update();
	}
}

function _tick(evt) {
	var stage = this.stage;
	stage&&stage.on('drawend', this._handleDrawEnd, this, true);
	if(!this._updateVisibilityCbk) {
		this._updateVisibilityCbk = stage.on('drawstart', this._updateVisibility, this, false);
	}
}
function _componentDraw(ctx) {
	if(this._element && !this._element._attached) {
		this._element.attach($('#dom_overlay_container'));
		this.dispatchEvent('attached');
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