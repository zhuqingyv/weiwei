(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"听一听_atlas_P_1", frames: [[1305,345,228,184],[0,0,865,563],[867,443,372,127],[867,0,436,441],[1627,0,356,239],[1305,0,320,343],[1627,241,233,208],[1862,241,96,104]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.小鸟身子 = function() {
	this.initialize(ss["听一听_atlas_P_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.图层0 = function() {
	this.initialize(ss["听一听_atlas_P_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.图层2 = function() {
	this.initialize(ss["听一听_atlas_P_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.图层3 = function() {
	this.initialize(ss["听一听_atlas_P_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.图层4 = function() {
	this.initialize(ss["听一听_atlas_P_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.羊 = function() {
	this.initialize(ss["听一听_atlas_P_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.羊头 = function() {
	this.initialize(ss["听一听_atlas_P_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.翅膀 = function() {
	this.initialize(ss["听一听_atlas_P_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();
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


(lib.音频播放标 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#E28623").s().p("AgkCDQgCgEABgEQAAgEAEgCQAYgRANggQAOgfAAglQAAgkgOgfQgNgfgXgSQgEgCAAgEQgBgEACgEQADgDAEgBQAEAAADACQAbAUAQAkQAQAjAAApQAAAqgQAkQgRAjgbAUQgDACgCAAQgGAAgDgEg");
	this.shape.setTransform(73.7423,46.6472,3.0687,3.0687);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_1.setTransform(57.0432,46.6855,3.0687,3.0687);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_2.setTransform(40.2384,46.6381,3.0687,3.0687);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgYAYQgKgJAAgPQAAgOAKgKQALgKANAAQAOAAAKAKQALAKAAAOQAAAPgLAJQgKALgOAAQgNAAgLgLg");
	this.shape_3.setTransform(22.6152,46.66,3.0687,3.0687);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AmLGMQikikAAjoQAAjnCkikQCkikDnAAQDoAACkCkQClCkgBDnQABDoilCkQikCljogBQjnABikilg");
	this.shape_4.setTransform(48.1,45.85);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.9,-10.2,112.10000000000001,112.10000000000001);


(lib.元件2 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#E28623").s().p("AgYAYQgKgJAAgPQAAgOAKgKQALgKANAAQAOAAAKAKQALAKAAAOQAAAPgLAJQgKALgOAAQgNAAgLgLg");
	this.shape.setTransform(15.7662,51.9795,3.0695,3.0695);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_1.setTransform(33.4493,52.0035,3.0697,3.0697);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_2.setTransform(50.2984,52.0828,3.0698,3.0698);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgkCDQgCgEABgEQAAgEAEgCQAYgRANggQAOgfAAglQAAgkgOgfQgNgfgXgSQgEgCAAgEQgBgEACgEQADgDAEgBQAEAAADACQAbAUAQAkQAQAjAAApQAAAqgQAkQgRAjgbAUQgDACgCAAQgGAAgDgEg");
	this.shape_3.setTransform(67.0433,52.0762,3.0699,3.0699);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape,p:{scaleX:3.0695,scaleY:3.0695,x:15.7662,y:51.9795}}]}).to({state:[{t:this.shape,p:{scaleX:3.0697,scaleY:3.0697,x:15.8207,y:52.0255}},{t:this.shape_1,p:{scaleX:3.0697,scaleY:3.0697,x:33.4493,y:52.0035}}]},8).to({state:[{t:this.shape,p:{scaleX:3.0698,scaleY:3.0698,x:15.8584,y:52.0572}},{t:this.shape_1,p:{scaleX:3.0698,scaleY:3.0698,x:33.4878,y:52.0353}},{t:this.shape_2,p:{scaleX:3.0698,scaleY:3.0698,x:50.2984,y:52.0828}}]},9).to({state:[{t:this.shape,p:{scaleX:3.0699,scaleY:3.0699,x:15.8961,y:52.089}},{t:this.shape_1,p:{scaleX:3.0699,scaleY:3.0699,x:33.5262,y:52.0671}},{t:this.shape_2,p:{scaleX:3.0699,scaleY:3.0699,x:50.3376,y:52.1146}},{t:this.shape_3}]},9).wait(8));

	// 图层_3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AmMGMQikikAAjoQAAjnCkilQClikDnAAQDoAACkCkQClClAADnQAADoilCkQikCljoAAQjnAAililg");
	this.shape_4.setTransform(42.2,52);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(34));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.8,-4,112.1,112.1);


(lib.补间1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.图层4();
	this.instance.setTransform(-178,-119.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-178,-119.5,356,239);


(lib.元件16 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#7D201D").s().p("AgPBOQhNgKgGgfQgHggBBglIBIgyQA7AdAHAuQAIAugVAmQgNAGgcAAQgZAAgigFg");
	this.shape.setTransform(9.9957,8.3076);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件16, new cjs.Rectangle(0,0,20,16.6), null);


(lib.元件15 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.翅膀();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件15, new cjs.Rectangle(0,0,96,104), null);


(lib.元件4 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.羊头();
	this.instance.setTransform(0,0,0.7506,0.7506);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件4, new cjs.Rectangle(0,0,174.9,156.2), null);


(lib.元件3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.图层2();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件3, new cjs.Rectangle(0,0,372,127), null);


(lib.音频停止 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_3
	this.instance = new lib.元件2();
	this.instance.setTransform(42.2,52,1,1,0,0,0,42.2,52);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.8,-4,112.1,112.1);


(lib.元件14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 翅膀_png
	this.instance = new lib.元件15();
	this.instance.setTransform(113.7,80.45,1,1,0,0,0,2.9,79.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:48,regY:52,rotation:1.0199,x:159.25,y:53.35},0).wait(1).to({rotation:2.0398,x:159.7,y:54.1},0).wait(1).to({rotation:3.0597,x:160.2,y:55},0).wait(1).to({rotation:4.0795,x:160.65,y:55.75},0).wait(1).to({rotation:5.0994,x:161.1,y:56.65},0).wait(1).to({rotation:6.1193,x:161.5,y:57.45},0).wait(1).to({rotation:7.1392,x:161.9,y:58.35},0).wait(1).to({rotation:8.1591,x:162.25,y:59.15},0).wait(1).to({rotation:9.179,x:162.65,y:60.1},0).wait(1).to({rotation:10.1989,x:163,y:60.95},0).wait(1).to({rotation:11.2188,x:163.35,y:61.85},0).wait(1).to({rotation:12.2386,x:163.65,y:62.65},0).wait(1).to({rotation:13.2585,x:163.9,y:63.6},0).wait(1).to({rotation:14.2784,x:164.25,y:64.55},0).wait(1).to({rotation:15.2983,x:164.55,y:65.4},0).wait(1).to({rotation:16.3182,x:164.8,y:66.35},0).wait(1).to({rotation:17.3381,x:165,y:67.25},0).wait(1).to({rotation:18.358,x:165.2,y:68.15},0).wait(1).to({rotation:19.3779,x:165.5,y:69.1},0).wait(1).to({rotation:20.3977,x:165.7,y:70},0).wait(1).to({rotation:21.4176,x:165.85,y:70.95},0).wait(1).to({rotation:22.4375,x:165.95,y:71.8},0).wait(1).to({rotation:23.4574,x:166.15,y:72.75},0).wait(1).to({rotation:22.48,x:166,y:71.9},0).wait(1).to({rotation:21.5026,x:165.85,y:71},0).wait(1).to({rotation:20.5252,x:165.65,y:70.15},0).wait(1).to({rotation:19.5478,x:165.5,y:69.2},0).wait(1).to({rotation:18.5704,x:165.3,y:68.35},0).wait(1).to({rotation:17.5931,x:165.1,y:67.45},0).wait(1).to({rotation:16.6157,x:164.9,y:66.65},0).wait(1).to({rotation:15.6383,x:164.6,y:65.75},0).wait(1).to({rotation:14.6609,x:164.4,y:64.85},0).wait(1).to({rotation:13.6835,x:164.1,y:63.95},0).wait(1).to({rotation:12.7061,x:163.75,y:63.15},0).wait(1).to({rotation:11.7287,x:163.5,y:62.25},0).wait(1).to({rotation:10.7513,x:163.15,y:61.45},0).wait(1).to({rotation:9.7739,x:162.8,y:60.6},0).wait(1).to({rotation:8.7965,x:162.5,y:59.75},0).wait(1).to({rotation:7.8191,x:162.15,y:58.9},0).wait(1).to({rotation:6.8417,x:161.75,y:58.1},0).wait(1).to({rotation:5.8644,x:161.4,y:57.3},0).wait(1).to({rotation:4.887,x:160.95,y:56.45},0).wait(1).to({rotation:3.9096,x:160.6,y:55.65},0).wait(1).to({rotation:2.9322,x:160.15,y:54.9},0).wait(1).to({rotation:1.9548,x:159.7,y:54.05},0).wait(1).to({rotation:0.9774,x:159.25,y:53.3},0).wait(1).to({rotation:0,x:158.8,y:52.55},0).wait(1));

	// 小鸟身子_png
	this.instance_1 = new lib.小鸟身子();
	this.instance_1.setTransform(0,24);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(48));

	// 图层_4
	this.instance_2 = new lib.元件16();
	this.instance_2.setTransform(20.45,116.25,1,1,0,0,0,14.2,2.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:10,regY:8.3,rotation:-2.3076,x:16.5,y:122.1},0).wait(1).to({rotation:-4.6153,x:16.65,y:122.2},0).wait(1).to({rotation:-6.9229,x:16.95,y:122.4},0).wait(1).to({rotation:-9.2305,x:17.2,y:122.55},0).wait(1).to({rotation:-11.5382,x:17.45,y:122.65},0).wait(1).to({rotation:-13.8458,x:17.7,y:122.75},0).wait(1).to({rotation:-16.1534,x:17.95,y:122.8},0).wait(1).to({rotation:-18.461,x:18.25,y:122.95},0).wait(1).to({rotation:-20.7687,x:18.5,y:123},0).wait(1).to({rotation:-23.0763,x:18.75,y:123.15},0).wait(1).to({rotation:-25.3839,x:19.05},0).wait(1).to({rotation:-27.6916,x:19.3,y:123.2},0).wait(1).to({rotation:-29.9992,x:19.6,y:123.25},0).wait(10).to({rotation:-26.666,x:19.2,y:123.15},0).wait(1).to({rotation:-23.3327,x:18.85,y:123.1},0).wait(1).to({rotation:-19.9995,x:18.4,y:123},0).wait(1).to({rotation:-16.6662,x:18.05,y:122.9},0).wait(1).to({rotation:-13.333,x:17.65,y:122.75},0).wait(1).to({rotation:-9.9997,x:17.3,y:122.5},0).wait(1).to({rotation:-6.6665,x:16.9,y:122.4},0).wait(1).to({rotation:-3.3332,x:16.6,y:122.15},0).wait(1).to({rotation:0,x:16.25,y:121.95},0).wait(1).to({rotation:-1.8749,x:16.4,y:122.05},0).wait(1).to({rotation:-3.7497,x:16.65,y:122.2},0).wait(1).to({rotation:-5.6246,x:16.8,y:122.25},0).wait(1).to({rotation:-7.4994,x:17,y:122.45},0).wait(1).to({rotation:-9.3743,x:17.2,y:122.5},0).wait(1).to({rotation:-11.2492,x:17.4,y:122.65},0).wait(1).to({rotation:-13.124,x:17.65,y:122.75},0).wait(1).to({rotation:-14.9989,x:17.8,y:122.8},0).wait(1).to({rotation:-13.124,x:17.65,y:122.75},0).wait(1).to({rotation:-11.2492,x:17.4,y:122.65},0).wait(1).to({rotation:-9.3743,x:17.2,y:122.5},0).wait(1).to({rotation:-7.4994,x:17,y:122.45},0).wait(1).to({rotation:-5.6246,x:16.8,y:122.25},0).wait(1).to({rotation:-3.7497,x:16.65,y:122.2},0).wait(1).to({rotation:-1.8749,x:16.4,y:122.05},0).wait(1).to({rotation:0,x:16.25,y:121.95},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0.5,230.9,207.5);


(lib.元件2_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.元件3();
	this.instance.setTransform(354.9,80.2,1,1,0,0,0,354.9,80.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:355,rotation:-23.7277,x:355,y:80.15},7).to({regX:355.1,rotation:1.2705,x:355.15,y:80.3},5).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.8,-38.3,398.2,304.2);


(lib.元件1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.补间1("synched",0);
	this.instance.setTransform(356,0,1,1,0,0,0,178,-119.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件1, new cjs.Rectangle(0,0,356,239), null);


(lib.元件33 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.元件1();
	this.instance.setTransform(356,0,1,1,0,0,0,356,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:-0.1,rotation:39.2061,y:0.05},5).to({regX:355.9,regY:0,rotation:0,x:355.95,y:0},5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-72.3,-224.8,428.40000000000003,463.8);


(lib.元件32 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_3_png
	this.instance = new lib.图层3();
	this.instance.setTransform(259,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(13));

	// 图层_4
	this.instance_1 = new lib.元件33("synched",0);
	this.instance_1.setTransform(195,309.5,1,1,0,0,0,178,119.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(13));

	// 图层_2
	this.instance_2 = new lib.元件2_1("synched",0);
	this.instance_2.setTransform(186,178.5,1,1,0,0,0,186,63.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(13));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.3,-34.9,750.3,475.9);


// stage content:
(lib.听一听 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:4,m2:117,m3:153};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,5,114,117,118,147,153,154,222];
	this.streamSoundSymbolsList[5] = [{id:"yx14020101蚊子声",startFrame:5,endFrame:114,loop:1,offset:0}];
	this.streamSoundSymbolsList[118] = [{id:"yx14020102绵羊叫声",startFrame:118,endFrame:147,loop:1,offset:0}];
	this.streamSoundSymbolsList[154] = [{id:"小鸟_",startFrame:154,endFrame:223,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		
		var _this = this;
		
		_this.m1_btn.on('click', function(){
		
		_this.gotoAndPlay('m1');
		});
		
		
		
		_this.m2_btn.on('click', function(){
		
		_this.gotoAndPlay('m2');
			
		});
		
		
		_this.m3_btn.on('click', function(){
		
		_this.gotoAndPlay('m3');
			
		});
	}
	this.frame_4 = function() {
		var _this = this;
		
		_this.m1stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav1');
		});
	}
	this.frame_5 = function() {
		var soundInstance = playSound("yx14020101蚊子声",0);
		this.InsertIntoSoundStreamData(soundInstance,5,114,1);
	}
	this.frame_114 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_117 = function() {
		var _this = this;
		
		_this.m2stop_btn.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_118 = function() {
		var soundInstance = playSound("yx14020102绵羊叫声",0);
		this.InsertIntoSoundStreamData(soundInstance,118,147,1);
	}
	this.frame_147 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_153 = function() {
		var _this = this;
		
		_this.m3stop_btn.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_154 = function() {
		var soundInstance = playSound("小鸟_",0);
		this.InsertIntoSoundStreamData(soundInstance,154,223,1);
	}
	this.frame_222 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(109).call(this.frame_114).wait(3).call(this.frame_117).wait(1).call(this.frame_118).wait(29).call(this.frame_147).wait(6).call(this.frame_153).wait(1).call(this.frame_154).wait(68).call(this.frame_222).wait(1));

	// 音频停止
	this.m1stop_btn = new lib.音频停止();
	this.m1stop_btn.name = "m1stop_btn";
	this.m1stop_btn.setTransform(171.55,459.7,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m1stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m2stop_btn = new lib.音频停止();
	this.m2stop_btn.name = "m2stop_btn";
	this.m2stop_btn.setTransform(759.85,459.85,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m2stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m3stop_btn = new lib.音频停止();
	this.m3stop_btn.name = "m3stop_btn";
	this.m3stop_btn.setTransform(1344,459.85,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m3stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1stop_btn}]},4).to({state:[]},110).to({state:[{t:this.m2stop_btn}]},3).to({state:[]},30).to({state:[{t:this.m3stop_btn}]},6).wait(70));

	// 播放按钮
	this.m3_btn = new lib.音频播放标();
	this.m3_btn.name = "m3_btn";
	this.m3_btn.setTransform(1295.1,413.2);
	new cjs.ButtonHelper(this.m3_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m1_btn = new lib.音频播放标();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(122.75,413.2);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m2_btn = new lib.音频播放标();
	this.m2_btn.name = "m2_btn";
	this.m2_btn.setTransform(710.95,413.2);
	new cjs.ButtonHelper(this.m2_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m2_btn},{t:this.m1_btn},{t:this.m3_btn}]}).wait(223));

	// 边框和标题
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#F29539").ss(1,0,0,4).p("EA1AgZTQiNAAhkBlQhkBkAACOMAAAAn5QAACNBkBmQBkBkCNAAMBM/AAAQCMAABlhkQBkhmAAiNMAAAgn5QAAiOhkhkQhlhliMAAgEiB+gZTQiMAAhlBlQhkBkAACOMAAAAn5QAACNBkBmQBlBkCMAAMBM/AAAQCNAABkhkQBkhmAAiNMAAAgn5QAAiOhkhkQhkhliNAAgEgmfgZTQiNAAhkBlQhkBkAACOMAAAAn5QAACNBkBmQBkBkCNAAMBM+AAAQCNAABkhkQBkhmAAiNMAAAgn5QAAiOhkhkQhkhliNAAg");
	this.shape.setTransform(982.1,620.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(223));

	// 右 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgmeAZUQiNAAhkhkQhlhmABiNMAAAgn5QgBiOBlhkQBkhlCNAAMBM9AAAQCNAABlBlQBjBkABCOMAAAAn5QgBCNhjBmQhlBkiNAAg");
	mask.setTransform(1567.6,620.725);

	// 小鸟
	this.instance = new lib.元件15();
	this.instance.setTransform(1560.7,579.45,1,1,16.6158,0,0,2.9,79.9);

	this.instance_1 = new lib.小鸟身子();
	this.instance_1.setTransform(1447,523);

	this.instance_2 = new lib.元件16();
	this.instance_2.setTransform(1467.45,615.3,1,1,-3.3329,0,0,14.2,2.7);

	this.instance_3 = new lib.元件14("synched",30);
	this.instance_3.setTransform(1559.3,609.8,1,1,0,0,0,114,104);
	this.instance_3._off = true;

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2,this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_3}]},154).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(154).to({_off:false},0).wait(1).to({regX:115.4,regY:104.2,x:1560.15,y:612.15,startPosition:31},0).wait(1).to({x:1559.65,y:614.3,startPosition:32},0).wait(1).to({x:1559.1,y:616.45,startPosition:33},0).wait(1).to({x:1558.6,y:618.6,startPosition:34},0).wait(1).to({x:1555.15,y:616.95,startPosition:35},0).wait(1).to({x:1551.7,y:615.35,startPosition:36},0).wait(1).to({x:1548.25,y:613.7,startPosition:37},0).wait(1).to({x:1544.8,y:612.05,startPosition:38},0).wait(1).to({x:1541.35,y:610.45,startPosition:39},0).wait(1).to({x:1537.9,y:608.8,startPosition:40},0).wait(1).to({x:1534.45,y:607.15,startPosition:41},0).wait(1).to({x:1531,y:605.55,startPosition:42},0).wait(1).to({x:1527.55,y:603.9,startPosition:43},0).wait(1).to({x:1524.1,y:602.3,startPosition:44},0).wait(1).to({x:1520.65,y:600.65,startPosition:45},0).wait(1).to({x:1517.2,y:599,startPosition:46},0).wait(1).to({x:1513.75,y:597.4,startPosition:47},0).wait(1).to({x:1510.3,y:595.75,startPosition:0},0).wait(1).to({x:1506.85,y:594.1,startPosition:1},0).wait(1).to({x:1503.4,y:592.5,startPosition:2},0).wait(1).to({x:1499.95,y:590.85,startPosition:3},0).wait(1).to({x:1496.5,y:589.25,startPosition:4},0).wait(1).to({y:591.25,startPosition:5},0).wait(1).to({x:1496.55,y:593.3,startPosition:6},0).wait(1).to({x:1496.6,y:595.3,startPosition:7},0).wait(1).to({x:1496.65,y:597.35,startPosition:8},0).wait(1).to({y:599.35,startPosition:9},0).wait(1).to({x:1496.7,y:601.4,startPosition:10},0).wait(1).to({x:1496.75,y:603.4,startPosition:11},0).wait(1).to({x:1496.8,y:605.45,startPosition:12},0).wait(1).to({y:607.45,startPosition:13},0).wait(1).to({x:1496.85,y:609.5,startPosition:14},0).wait(1).to({x:1496.9,y:611.5,startPosition:15},0).wait(1).to({x:1496.95,y:613.55,startPosition:16},0).wait(1).to({y:615.55,startPosition:17},0).wait(1).to({x:1497,y:617.6,startPosition:18},0).wait(1).to({x:1497.05,y:619.6,startPosition:19},0).wait(1).to({x:1497.1,y:621.65,startPosition:20},0).wait(1).to({x:1497.05,y:618.6,startPosition:21},0).wait(1).to({x:1497,y:615.6,startPosition:22},0).wait(1).to({x:1496.95,y:612.55,startPosition:23},0).wait(1).to({x:1496.9,y:609.55,startPosition:24},0).wait(1).to({x:1496.85,y:606.55,startPosition:25},0).wait(1).to({x:1496.8,y:603.5,startPosition:26},0).wait(1).to({x:1496.75,y:600.5,startPosition:27},0).wait(1).to({x:1496.7,y:597.45,startPosition:28},0).wait(1).to({x:1496.65,y:594.45,startPosition:29},0).wait(1).to({x:1496.6,y:591.45,startPosition:30},0).wait(1).to({x:1496.55,y:588.4,startPosition:31},0).wait(1).to({x:1496.5,y:585.4,startPosition:32},0).wait(1).to({y:582.4,startPosition:33},0).wait(1).to({x:1498.75,y:585.05,startPosition:34},0).wait(1).to({x:1501,y:587.75,startPosition:35},0).wait(1).to({x:1503.25,y:590.45,startPosition:36},0).wait(1).to({x:1505.5,y:593.15,startPosition:37},0).wait(1).to({x:1507.75,y:595.85,startPosition:38},0).wait(1).to({x:1510.05,y:598.55,startPosition:39},0).wait(1).to({x:1512.3,y:601.25,startPosition:40},0).wait(1).to({x:1514.55,y:603.95,startPosition:41},0).wait(1).to({x:1516.8,y:606.6,startPosition:42},0).wait(1).to({x:1519.05,y:609.3,startPosition:43},0).wait(1).to({x:1521.3,y:612,startPosition:44},0).wait(1).to({x:1523.6,y:614.7,startPosition:45},0).wait(1).to({x:1525.85,y:617.4,startPosition:46},0).wait(1).to({x:1528.1,y:620.1,startPosition:47},0).wait(1).to({x:1530.35,y:622.8,startPosition:0},0).wait(1).to({x:1532.6,y:625.5,startPosition:1},0).wait(1).to({x:1534.9,y:628.2,startPosition:2},0).wait(1));

	// 中 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EgmeAZUQiNAAhlhkQhjhmgBiNMAAAgn5QABiOBjhkQBlhlCNAAMBM9AAAQCNAABkBlQBlBkgBCOMAAAAn5QABCNhlBmQhkBkiNAAg");
	mask_1.setTransform(982.1,620.725);

	// 羊头
	this.instance_4 = new lib.元件4();
	this.instance_4.setTransform(925.5,565,1,1,0,0,0,87.5,78);

	var maskedShapeInstanceList = [this.instance_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(118).to({regY:78.1,y:529.05},5).to({regY:78.2,rotation:-10.1477,y:529.1},3).to({regY:78.1,rotation:0,y:529.05},6).to({regY:78,y:565},8).wait(83));

	// 绵羊
	this.instance_5 = new lib.羊();
	this.instance_5.setTransform(852,487,0.7506,0.7506);

	this.instance_6 = new lib.图层0();
	this.instance_6.setTransform(693,414,0.6754,0.6754);

	var maskedShapeInstanceList = [this.instance_5,this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5}]}).wait(223));

	// 左 (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("EgmfAZUQiMAAhkhkQhlhmABiNMAAAgn5QgBiOBlhkQBkhlCMAAMBM+AAAQCNAABlBlQBjBkABCOMAAAAn5QgBCNhjBmQhlBkiNAAg");
	mask_2.setTransform(396.6,620.725);

	// 蚊子
	this.instance_7 = new lib.图层3();
	this.instance_7.setTransform(384.25,515.1,0.4919,0.4919);

	this.instance_8 = new lib.元件1();
	this.instance_8.setTransform(440.35,608.55,0.4919,0.4919,0,0,0,356,0);

	this.instance_9 = new lib.元件3();
	this.instance_9.setTransform(431.45,611.1,0.4919,0.4919,0,0,0,354.9,80.2);

	this.instance_10 = new lib.元件32("synched",5);
	this.instance_10.setTransform(427.9,623.6,0.4919,0.4919,0,0,0,347.7,220.6);
	this.instance_10._off = true;

	var maskedShapeInstanceList = [this.instance_7,this.instance_8,this.instance_9,this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7}]}).to({state:[{t:this.instance_10}]},5).to({state:[{t:this.instance_10}]},14).to({state:[{t:this.instance_10}]},26).to({state:[{t:this.instance_10}]},21).to({state:[{t:this.instance_10}]},25).to({state:[{t:this.instance_10}]},22).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7}]},1).wait(109));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(5).to({_off:false},0).to({x:425.8,y:674.3,startPosition:6},14).to({x:468.5,y:581.3},26).to({x:420.75,y:649.15,startPosition:1},21).to({y:586.3,startPosition:0},25).to({x:427.9,y:623.6},22).to({_off:true},1).wait(109));

	// title
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3D8D8D").s().p("AgeC1QgLgKgBgRQABgSALgJQALgKAPAAQAPAAALAKQALAJAAASQAAARgLAKQgLAKgPAAQgPAAgLgKgAgXBGQgEgZAHgTQAIgTANgPIAdgdQAPgNAKgOQALgPAAgRQAAgagPgRQgQgRghgBQgWAAgVALQgUALgUAVIgZgWQAXgYAbgPQAbgPAjAAQAvAAAaAZQAbAYABApQgBAXgKARQgLARgPAPIgeAcQgPANgIARQgIARAEAXg");
	this.shape_1.setTransform(1474.625,221.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#3D8D8D").s().p("AiWDmIAAjZIEyAAIAADYIgiAAIAAgSIjvAAIAAATgAh1C3IDvAAIAAg7IjvAAgAh1BhIDvAAIAAg3IjvAAgAjcgfIAAgeICAAAQgEgSgIgUQgIgVgLgSIAggHQAIAMAGAOQAHAOAFANIAHAZIgVAGICIAAIAOgcIANgeIAKgcIAkAJIgTAnIgTAmICBAAIAAAegAjAiVIAAgeIC3AAQgEgLgFgLIgMgVIAggHQAIALAGAOQAHANAEAMICpAAIAAAeg");
	this.shape_2.setTransform(1437.325,221.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3D8D8D").s().p("AjRDaIgNgLQAagaAOgfQANgeAEgfQAFgfgBgaIAAhCIFgAAIAACjIghAAIAAgZIkkAAQgGAhgPAhQgPAggbAcQgEgGgIgGgAAZBLICFAAIAAhQIiFAAgAiAAgIAAAVIgCAWIB8AAIAAhQIh6AAgAishLIAAgdIClAAIAAg0IjDAAIAAgdIDDAAIAAgsIAhAAIAAAsIDFAAIAAAdIjFAAIAAA0ICvAAIAAAdg");
	this.shape_3.setTransform(1386.325,221.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3D8D8D").s().p("ACuDFIgRgdIiTAMIhfAJIg4AEIgcAEQgKABgFACIgGgQIgIgSQALgCAQgNQARgMAXgVIAkgiQAXgXAeghQAdgfAggnQAfgmAdgpIAhAQQg6BPg8BCQg+BDg+A1IELgXIgjgxIglgvIAdgOQAYAcAYAfQAYAhAUAeQAUAfANAZIggARIgNgZgAjMgDIgOgLQAlgbAkgjQAkgiAfgmQAegmAUgjIAhANQgYAmgfAnQghAogkAkQgkAkgmAcIgLgMg");
	this.shape_4.setTransform(1337.5,221.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3D8D8D").s().p("AA5DjIAAj5IiNAAIAAghICNAAIAAioIAiAAIAACoICJAAIAAAhIiJAAIAAD5gAiVDiIAAkgQgPAUgOATQgOASgQAOIgIgPIgLgQQAagZAYghQAYggAUglQAVgmAOgnIAfAJQgKAbgNAaQgNAbgOAZIAAFSg");
	this.shape_5.setTransform(1287.1,221.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#3D8D8D").s().p("AjWDNIgOgLQAngaAYgpQAZgrAKg3IAiAEIgHAaQgCANgEAMQAPAjAYAUQAZATAhAIIAAiaIjOAAIAAgeIG2AAIAAAeIjHAAIAAA6ICnAAIAAAfIinAAIAABHQAcADAiAAIATABIAhAAIAmgBIAiAAIAWAAIgHAPIgFAQIiHAAQgzABgmgHQgogHgcgTQgdgTgTgjQgPAfgUAYQgTAYgaATIgLgNgAilg2IAAijIFJAAIAACjgAiEhPIEHAAIAAgsIkHAAgAiEiUIEHAAIAAgrIkHAAg");
	this.shape_6.setTransform(1237.25,222.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#3D8D8D").s().p("AA9DeIgDgQQgDgJgFgHQAZACAUAAIAdABQAHAAAFgBQAFgCAEgFQAGgGAFgTQAEgTAEgjQAEgjACg1IAGiBIiDAAQgLAZgMAXQgLAXgMASIgOgKIgOgJQARgWANgeQAPgdALghQALgiAIgiIAgAHIgKAlIgMAlICYAAIAAARIgGCQQgDA8gEAlQgEAmgGAVQgFAVgHAIQgIAKgJAEQgJAEgMABIghABIgpgCgAjPDdIAAlqIA4AAIAIgbIAIgcIAFgaIAkAHIgNAmQgHATgHARIBVAAIAAFCIiMAAIAAAogAiwCXIBtAAIAAh8IhtAAgAiwgCIBtAAIAAhtIhtAAgABQBAQgMgUgPgVIgdgnIAZgPIAeAmIAdAoQANAUAIAPIgcARQgIgPgNgUg");
	this.shape_7.setTransform(1187.675,221.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#3D8D8D").s().p("ABtDJIgIgRIApABIAZAAQAGgBACgCQACgCAAgGIAAmHIAhAAIAAGHQAAAQgFAJQgEAIgLAEQgLAEgTABQgUACgaAAIgFgRgAjRCrIA1gJIA/gLIAAhXIhiAAIAAgeIBiAAIAAg3IAgAAIAAA3IBlAAIAAAeIhlAAIAABRIA1gKIA0gKIACAdIhYASIhWAQIhKAOgABPB1IAAksIAfAAIAAEsgAAQgiIgLgRIhdAJIg3AGIgbAEIgLAEIgFgPIgHgRQAGgBAGgGIAMgPIAUgeQAOgWANgcIhTAAIAAgeID+AAIAAAeIiGAAQgOAagPAZQgQAZgQAVICHgMIgUgaIgTgZIAYgPIAcAlQAPATAMATQANASAHAOIgZARIgIgPg");
	this.shape_8.setTransform(1136.625,221.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#3D8D8D").s().p("AB0DiIAAkDIhmAAQAAAmgGAuQgEAugOAtQgNAugbAlQgGgGgIgGIgOgKQAagkANgsQAMgrAFgsQAEgrgBgmIAAiCIBDgPIBBgRQAdgJAWgJIAdAaQgYAJgeAIQgeAJgfAHIhAANIAABXIDKAAIAAAhIhCAAIAAEDgAjYCPIAAlFICGAAIAAEfIhmAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_9.setTransform(1088,221.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#3D8D8D").s().p("AAPDjIgFgRIgHgRIAhABIAUAAQAFAAACgCQABgCAAgFIAAkdIhOAAQgLAagMAWQgNAWgNASIgNgKIgOgLQATgYAQgeQAPgfAMgjQAMgkAIglIAfAIIgMAsQgGAWgHAVIDQAAIAFgBIAWAFIgHAlIgHAlIgIAfIgcgGIAHghIAHgnIhkAAIAAEdQAAAPgEAIQgDAIgKAEQgKAFgQABIgcABIgLAAgAifDiIAAkeQgNATgOAQIgbAfIgIgQIgLgQQAZgYAXggQAYggATglQAUglAOgmIAgAJQgLAcgNAbQgNAbgPAaIAAFPgAhGCWIgPgJQAQgUANgZQANgZAKgdQAKgeAIgdIAfAHQgMAxgSAsQgUAsgXAgIgNgJgAC5BpQgKgdgMgfQgMgegPgaIAegJQAPAaANAeQAMAeAKAdQAKAdAEAXIggAKQgEgXgJgdg");
	this.shape_10.setTransform(1036.625,221.7813);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#3D8D8D").s().p("AguA8QAdgMAQgTQAPgTACgZIgFABIgFAAQgOgBgKgIQgKgJAAgRQAAgQALgJQAKgJAOAAQAUAAAKAPQAKAPAAAaQAAAogXAcQgWAdgmAOg");
	this.shape_11.setTransform(973.525,237.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#3D8D8D").s().p("AhYDXQgGgIgGgFQApgPAXgZQAWgZAKgiQAIgiADgpIhAAAIAAibICXAAIAQggIAPgkIANggIAiALIgVAuIgVArIA0AAIAACbIg+AAIAACSQAAAJADAEQACACAKAAIAtAAQAGAAAEgEQADgEABgOQACgNAAgbIAOAIIAQAFQgBAggFASQgEARgIAHQgJAGgPAAIg1AAQgaABgJgLQgJgKAAgaIAAiSIgvAAQgDAvgLAnQgLAmgZAdQgYAcguATQgDgHgFgGgAgZgBICuAAIAAhgIiuAAgAioC+IgLgOIAMgKQAGgGAFgJQAFgJAAgLIAAipIhKAAIAAggIBsAAIAADJIA6goIAGAPIAFANIg3ApIggAYIgRAOIgIAIQgCgHgGgJgAiHiNIgbgcIgcgbIAWgUQAOAMAOAOIAcAbIAUAXIgXAZQgIgMgMgOgAgBiaIgPgfIgTgdIAcgLQAJANAJAPIARAdQAHAPAEAMIgeANQgEgMgGgOg");
	this.shape_12.setTransform(937.375,221.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_13.setTransform(887.325,221.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#3D8D8D").s().p("AhYDXQgGgIgGgFQApgPAXgZQAWgZAKgiQAIgiADgpIhAAAIAAibICXAAIAQggIAPgkIANggIAiALIgVAuIgVArIA0AAIAACbIg+AAIAACSQAAAJADAEQACACAKAAIAtAAQAGAAAEgEQADgEABgOQACgNAAgbIAOAIIAQAFQgBAggFASQgEARgIAHQgJAGgPAAIg1AAQgaABgJgLQgJgKAAgaIAAiSIgvAAQgDAvgLAnQgLAmgZAdQgYAcguATQgDgHgFgGgAgZgBICuAAIAAhgIiuAAgAioC+IgLgOIAMgKQAGgGAFgJQAFgJAAgLIAAipIhKAAIAAggIBsAAIAADJIA6goIAGAPIAFANIg3ApIggAYIgRAOIgIAIQgCgHgGgJgAiHiNIgbgcIgcgbIAWgUQAOAMAOAOIAcAbIAUAXIgXAZQgIgMgMgOgAgBiaIgPgfQgJgPgKgOIAcgLQAJANAJAPIARAdQAHAPAEAMIgeANQgEgMgGgOg");
	this.shape_14.setTransform(837.375,221.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#3D8D8D").s().p("AguA8QAdgMAQgTQAPgTACgZIgFABIgFAAQgOgBgKgIQgKgJAAgRQAAgQALgJQAKgJAOAAQAUAAAKAPQAKAPAAAaQAAAogXAcQgWAdgmAOg");
	this.shape_15.setTransform(773.525,237.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3D8D8D").s().p("AB0DiIAAkDIhmAAQAAAmgGAuQgFAugNAtQgOAugaAlQgGgGgIgGIgOgKQAagkANgsQAMgrAFgsQADgrAAgmIAAiCIBDgPIBBgRQAegJAVgJIAdAaQgYAJgeAIQgeAJggAHIg/ANIAABXIDLAAIAAAhIhDAAIAAEDgAjYCPIAAlFICGAAIAAEfIhmAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_16.setTransform(738,221.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_17.setTransform(687.325,221.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#3D8D8D").s().p("AB0DiIAAkDIhmAAQAAAmgGAuQgFAugNAtQgNAugbAlQgGgGgIgGIgOgKQAagkANgsQAMgrAFgsQADgrAAgmIAAiCIBDgPIBBgRQAegJAVgJIAdAaQgYAJgeAIQgeAJgfAHIhAANIAABXIDKAAIAAAhIhCAAIAAEDgAjYCPIAAlFICGAAIAAEfIhmAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_18.setTransform(638,221.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#3D8D8D").s().p("AgNAIQgegcgbgWIAdgaQASAPAUATQATASATATQAUAVAQATIgfAaQgZgfgcgeg");
	this.shape_19.setTransform(572.075,236.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_20.setTransform(537.325,221.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(61,141,141,0.098)").s().p("Eg8pAPlQiQAMiZAAQrqAAoPkWQkXiUiEi0Qh0ieAAi5QAAg8AMg4QBEk/G/jrIAtgYQIBj+LLAAQBmAABkAFQAvgbA2gYQBCgdBHgYQE4hrGbAAQGaAAE5BrQBHAYBCAdQBEAfA3AhQDvhSETgjQDQgbDlAAQDlAADQAbQHqA/F5DTIA5AhQBWhPCYhEQFkigH3AAQH3AAFlCgQCBA6BSBDQFbiTHkAAIAZAAQFbADESBPQD/g6EmAAQJwAAG3EEQAmAVAiAYQFyD3AAFPQAAFxm6EFIgKAGQm1D+poAAQnsAAl5ihQhXAOheAAIgoAAQgnAYgpAUQg5Adg+AXQjPBLj7AAQkhAAjnhkQkfCamEAAIgfAAQiTAZiiAJQhWAEhaAAQhbAAhVgEQnEgYlQiWQgmgRghgSQnOC5pYAAQooAAm0icQnFDTpeAAQmcAAlVhig");
	this.shape_21.setTransform(1004,213.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(223));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1074.8,644,774.3,139.70000000000005);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#3D8D8D",
	opacity: 0.00,
	manifest: [
		{src:"images/听一听_atlas_P_1.png?1693882743419", id:"听一听_atlas_P_1"},
		{src:"sounds/小鸟_.mp3?1693882743463", id:"小鸟_"},
		{src:"sounds/yx14020101蚊子声.mp3?1693882743463", id:"yx14020101蚊子声"},
		{src:"sounds/yx14020102绵羊叫声.mp3?1693882743463", id:"yx14020102绵羊叫声"}
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