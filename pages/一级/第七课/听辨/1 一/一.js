(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


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



(lib.小鸟bg = function() {
	this.initialize(img.小鸟bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,860,730);


(lib.小鸟身子 = function() {
	this.initialize(img.小鸟身子);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,228,184);


(lib.椭圆1 = function() {
	this.initialize(img.椭圆1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1056,1877);


(lib._33 = function() {
	this.initialize(img._33);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1181,1181);


(lib.Bitmap10 = function() {
	this.initialize(img.Bitmap10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,800,572);


(lib.Bitmap11 = function() {
	this.initialize(img.Bitmap11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,880,682);


(lib.Bitmap4 = function() {
	this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1156,735);


(lib.Bitmap9 = function() {
	this.initialize(img.Bitmap9);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,685,294);


(lib.body = function() {
	this.initialize(img.body);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,423,342);


(lib.head = function() {
	this.initialize(img.head);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,176,185);


(lib.图层1 = function() {
	this.initialize(img.图层1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,410,348);


(lib.图层2 = function() {
	this.initialize(img.图层2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,228,725);


(lib.翅膀 = function() {
	this.initialize(img.翅膀);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,96,104);


(lib.背景 = function() {
	this.initialize(img.背景);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,622,587);// helper functions:

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
	this.shape.setTransform(73.3944,46.2874,3.0698,3.0698);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_1.setTransform(56.6897,46.3258,3.0698,3.0698);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_2.setTransform(39.8792,46.2783,3.0698,3.0698);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgYAYQgKgJAAgPQAAgOAKgKQALgKANAAQAOAAAKAKQALAKAAAOQAAAPgLAJQgKALgOAAQgNAAgLgLg");
	this.shape_3.setTransform(22.25,46.3002,3.0698,3.0698);

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
	this.shape.setTransform(15.8961,52.089,3.0699,3.0699);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_1.setTransform(33.5647,52.0989,3.0701,3.0701);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_2.setTransform(50.4335,52.1923,3.0703,3.0703);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgkCDQgCgEABgEQAAgEAEgCQAYgRANggQAOgfAAglQAAgkgOgfQgNgfgXgSQgEgCAAgEQgBgEACgEQADgDAEgBQAEAAADACQAbAUAQAkQAQAjAAApQAAAqgQAkQgRAjgbAUQgDACgCAAQgGAAgDgEg");
	this.shape_3.setTransform(67.181,52.1857,3.0704,3.0704);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape,p:{scaleX:3.0699,scaleY:3.0699,x:15.8961,y:52.089}}]}).to({state:[{t:this.shape,p:{scaleX:3.0701,scaleY:3.0701,x:15.9338,y:52.1208}},{t:this.shape_1,p:{scaleX:3.0701,scaleY:3.0701,x:33.5647,y:52.0989}}]},8).to({state:[{t:this.shape,p:{scaleX:3.0703,scaleY:3.0703,x:15.9882,y:52.1667}},{t:this.shape_1,p:{scaleX:3.0703,scaleY:3.0703,x:33.6203,y:52.1448}},{t:this.shape_2,p:{scaleX:3.0703,scaleY:3.0703,x:50.4335,y:52.1923}}]},9).to({state:[{t:this.shape,p:{scaleX:3.0704,scaleY:3.0704,x:16.0259,y:52.1985}},{t:this.shape_1,p:{scaleX:3.0704,scaleY:3.0704,x:33.6588,y:52.1766}},{t:this.shape_2,p:{scaleX:3.0704,scaleY:3.0704,x:50.4728,y:52.2241}},{t:this.shape_3}]},9).wait(8));

	// 图层_3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AmMGMQikikAAjoQAAjnCkilQClikDnAAQDoAACkCkQClClAADnQAADoilCkQikCljoAAQjnAAililg");
	this.shape_4.setTransform(42.2,52);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(34));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.8,-4,112.1,112.1);


(lib.元件7 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.head();
	this.instance.setTransform(0,0,0.9109,0.9109);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(18));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,160.3,168.5);


(lib.补间6 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib._33();
	this.instance.setTransform(-168.85,-168.85,0.986,0.986);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-168.8,-168.8,337.70000000000005,337.70000000000005);


(lib.补间5 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-23.7,-75.35,0.9898,0.9898);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-23.7,-75.3,47.4,150.7);


(lib.补间4 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.图层1();
	this.instance.setTransform(-205,-174);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-205,-174,410,348);


(lib.补间3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.背景();
	this.instance.setTransform(-4.8,-293.5,1.3852,1);

	this.instance_1 = new lib.背景();
	this.instance_1.setTransform(-856.8,-293.5,1.3852,1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-856.8,-293.5,1713.6,587);


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
	this.instance = new lib.Bitmap9();
	this.instance.setTransform(-279.8,-120.1,0.9963,0.9963);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-279.8,-120.1,559.7,240.2);


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
	this.instance = new lib.Bitmap4();
	this.instance.setTransform(0,0,1.0005,1.0005);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件2_1, new cjs.Rectangle(0,0,774.9,492.7), null);


(lib.选择 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#F29539").ss(3,0,0,4).p("ABfAAQAAAogcAbQgcAcgnAAQgnAAgcgcQgbgbAAgoQAAgmAbgcQAcgcAnAAQAnAAAcAcQAcAcAAAmg");
	this.shape.setTransform(8.55,11.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#51C1E1").s().p("AiYCZIAAkxIExAAIAAExg");
	this.shape_1.setTransform(8.55,11.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.7,-3.7,30.599999999999998,30.599999999999998);


(lib.选中 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#F29539").ss(6,0,0,4).p("ABfAAQAAAogcAbQgcAcgnAAQgnAAgcgcQgbgbAAgoQAAgRAGgQQAHgSAOgPQAcgcAnAAQAnAAAcAcQAQAPAGASQAGAQAAARg");
	this.shape.setTransform(9.5,9.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F29539").s().p("AhCBDQgcgbAAgoQAAgRAGgQQAHgSAPgPQAcgcAmAAQAnAAAcAcQAQAPAGASQAGAQAAARQAAAogcAbQgcAcgnAAQgmAAgcgcg");
	this.shape_1.setTransform(9.5,9.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3,-3,25,25);


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


(lib.元件6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#541F23").s().p("AgRBZQgmAAgVgbQgWgaAIglQAIgjAggaQAggaAlAAQAlAAAVAaQAVAbgIAkQgHAkggAaQgfAagkAAIgBAAg");
	this.shape.setTransform(16.4019,109.8505);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(6).to({_off:false},0).to({_off:true},21).wait(44));

	// 图层_1
	this.instance = new lib.元件7();
	this.instance.setTransform(80.2,84.35,0.9999,0.9999,35.9999,0,0,80.2,84.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({_off:false},0).to({regX:80.1,scaleX:1,scaleY:1,rotation:45,x:80.1,y:84.25},1).wait(22).to({regX:80.2,rotation:0,x:80.2,y:84.2},7).wait(12).to({_off:true},1).wait(24));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.1,-31.9,232.5,232.5);


(lib.补间2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.元件2_1();
	this.instance.setTransform(-385.5,-0.05,1,1,0,0,0,387.4,246.3);

	this.instance_1 = new lib.元件2_1();
	this.instance_1.setTransform(385.4,-0.05,1,1,0,0,0,387.4,246.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-772.9,-246.3,1545.8,492.70000000000005);


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


(lib.元件7_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance_1 = new lib.补间6("synched",0);
	this.instance_1.setTransform(168.85,168.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({rotation:-5.6904},3).to({rotation:4.7167},3).to({rotation:0},3).to({rotation:-5.6904},3).to({rotation:4.7167},3).to({rotation:0},2).to({rotation:-5.6904},3).to({rotation:4.7167},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-15.9,-15.9,369.59999999999997,369.5);


(lib.元件6_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F5AD89").s().p("ApbA9IAAh5IS3AAIAAB5g");
	this.shape_1.setTransform(23.45,11.275);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(64));

	// 图层_1
	this.instance_1 = new lib.补间5("synched",0);
	this.instance_1.setTransform(23.7,-0.05,1,1,0,0,0,0,-75.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({rotation:10.9761},16).to({rotation:0},16).to({regX:0.1,regY:-75.2,rotation:-11.7708,x:23.8,y:0.1},16).to({regX:0,regY:-75.4,rotation:0,x:23.7,y:-0.05},15).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37,-4.9,120.9,157.5);


(lib.元件5 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.补间4("synched",0);
	this.instance.setTransform(205,174);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:162.05},12).to({y:174},11).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-11.9,410,359.9);


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

	// 图层_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgwpAqDQjEgBiKiKQiLiMAAjEMAAAg3GQAAjECLiLQCKiLDEABMBqTAAAQDCgBCLCLQCKCLAADEMAAAA3GQAADEiKCMQiLCKjCABg");
	mask.setTransform(416.1,269.05);

	// 图层_1
	this.instance = new lib.补间3("synched",0);
	this.instance.setTransform(914.5,293.5);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-22.6},23).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(57.5,90.6,774.7,447.5);


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

	// 图层_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg1JAi9QjDAAiKiKQiLiNAAjCMAAAg3GQAAjGCLiKQCKiKDDgBMBqTAAAQDDABCKCKQCLCKAADGMAAAA3GQAADCiLCNQiKCKjDAAg");
	mask.setTransform(387.375,245.55);

	// 图层_1
	this.instance = new lib.补间2("synched",0);
	this.instance.setTransform(772.9,246.35);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:2},23).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,21.8,774.8,447.5);


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
	this.instance.setTransform(279.8,120.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:110.2},5).to({y:120.1},5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-9.9,559.7,250.1);


// stage content:
(lib.一 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:4,m2:51,lnav2:124,m3:125,m4:308,lnav3:332,m5:334,m6:416};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,5,48,51,52,121,124,125,126,307,308,309,331,332,334,335,415,416,417,478];
	this.streamSoundSymbolsList[5] = [{id:"yx12070101牛",startFrame:5,endFrame:48,loop:1,offset:0}];
	this.streamSoundSymbolsList[52] = [{id:"yx12070102小鸟",startFrame:52,endFrame:121,loop:1,offset:0}];
	this.streamSoundSymbolsList[126] = [{id:"轮船",startFrame:126,endFrame:307,loop:1,offset:0}];
	this.streamSoundSymbolsList[309] = [{id:"yx12070104汽车",startFrame:309,endFrame:332,loop:1,offset:0}];
	this.streamSoundSymbolsList[335] = [{id:"yx12070105大钟",startFrame:335,endFrame:415,loop:1,offset:0}];
	this.streamSoundSymbolsList[417] = [{id:"yx12070106闹钟",startFrame:417,endFrame:478,loop:1,offset:0}];
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
		
		
		
		
		
		_this.lnav1_btn.on('click', function(){
		
		_this.gotoAndStop('lnav1');
			
		});
		
		
		
		_this.lnav2_btn.on('click', function(){
		
		_this.gotoAndStop('lnav2');
			
		});
		
		
		
		_this.lnav3_btn.on('click', function(){
		
		_this.gotoAndStop('lnav3');
			
		});
	}
	this.frame_4 = function() {
		var _this = this;
		
		_this.m1stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav1');
		});
	}
	this.frame_5 = function() {
		var soundInstance = playSound("yx12070101牛",0);
		this.InsertIntoSoundStreamData(soundInstance,5,48,1);
	}
	this.frame_48 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_51 = function() {
		var _this = this;
		
		_this.m2stop_btn.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_52 = function() {
		var soundInstance = playSound("yx12070102小鸟",0);
		this.InsertIntoSoundStreamData(soundInstance,52,121,1);
	}
	this.frame_121 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_124 = function() {
		this.stop();
		
		var _this = this;
		
		_this.m3_btn.on('click', function(){
		
		_this.gotoAndPlay('m3');
		});
		
		
		
		_this.m4_btn.on('click', function(){
		
		_this.gotoAndPlay('m4');
			
		});
	}
	this.frame_125 = function() {
		var _this = this;
		
		_this.m3stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav2');
		});
	}
	this.frame_126 = function() {
		var soundInstance = playSound("轮船",0);
		this.InsertIntoSoundStreamData(soundInstance,126,307,1);
	}
	this.frame_307 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav2');
	}
	this.frame_308 = function() {
		var _this = this;
		
		_this.m4stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav2');
		});
	}
	this.frame_309 = function() {
		var soundInstance = playSound("yx12070104汽车",0);
		this.InsertIntoSoundStreamData(soundInstance,309,332,1);
	}
	this.frame_331 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav2');
	}
	this.frame_332 = function() {
		var _this = this;
		
		_this.m5_btn.on('click', function(){
		
		_this.gotoAndPlay('m5');
		});
		
		
		
		_this.m6_btn.on('click', function(){
		
		_this.gotoAndPlay('m6');
			
		});
	}
	this.frame_334 = function() {
		var _this = this;
		
		_this.m5stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav3');
		});
	}
	this.frame_335 = function() {
		var soundInstance = playSound("yx12070105大钟",0);
		this.InsertIntoSoundStreamData(soundInstance,335,415,1);
	}
	this.frame_415 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav3');
	}
	this.frame_416 = function() {
		var _this = this;
		
		_this.m6stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav3');
		});
	}
	this.frame_417 = function() {
		var soundInstance = playSound("yx12070106闹钟",0);
		this.InsertIntoSoundStreamData(soundInstance,417,478,1);
	}
	this.frame_478 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav3');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(43).call(this.frame_48).wait(3).call(this.frame_51).wait(1).call(this.frame_52).wait(69).call(this.frame_121).wait(3).call(this.frame_124).wait(1).call(this.frame_125).wait(1).call(this.frame_126).wait(181).call(this.frame_307).wait(1).call(this.frame_308).wait(1).call(this.frame_309).wait(22).call(this.frame_331).wait(1).call(this.frame_332).wait(2).call(this.frame_334).wait(1).call(this.frame_335).wait(80).call(this.frame_415).wait(1).call(this.frame_416).wait(1).call(this.frame_417).wait(61).call(this.frame_478).wait(1));

	// 标题
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#52C1E1").s().p("AgfA4QgPgJgJgOQgJgPAAgSQAAgRAJgPQAJgOAPgJQAOgJARAAQASAAAPAJQAOAJAJAOQAJAPAAARQAAASgJAPQgJAOgOAJQgPAJgSAAQgRAAgOgJgAgfgeQgMAMAAASQAAATAMANQAOAMARABQATgBANgMQAMgNAAgTQAAgSgMgMQgNgNgTgBQgRABgOANg");
	this.shape.setTransform(1763.1,229.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#52C1E1").s().p("AiBDGIAAi7IEHAAIAAC6IgdAAIAAgPIjOAAIAAAQgAhlCdIDOAAIAAgyIjOAAgAhlBUIDOAAIAAgwIjOAAgAi9gaIAAgbIBuAAQgDgOgHgSQgHgSgJgPIAbgGIANAWIAJAYIAHAVIgSAEIB0AAIALgXIAMgaIAJgYIAfAIIgRAhIgQAgIBvAAIAAAbgAikiAIAAgaICcAAIgHgTIgLgSIAbgGQAIAKAFAMIAJAVICSAAIAAAag");
	this.shape_1.setTransform(1733.3,217.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#52C1E1").s().p("Ai0C7IgLgKQAXgWAMgaQAKgbAEgZQAFgbgBgXIAAg4IEuAAIAACMIgdAAIAAgWIj7AAQgEAdgNAcQgMAcgZAXQgCgFgIgFgAAVBAIByAAIAAhEIhyAAgAhtAbIgBASIgBATIBpAAIAAhEIhnAAgAiUhAIAAgZICOAAIAAguIinAAIAAgYICnAAIAAgmIAcAAIAAAmICqAAIAAAYIiqAAIAAAuICXAAIAAAZg");
	this.shape_2.setTransform(1689.45,217.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#52C1E1").s().p("AA1C/QgBgHgDgHQgCgIgEgGQAWACARAAIAZABIAKgBQAFgCACgEQAGgFAEgQQAEgRADgeQADgeACguIAFhvIhxAAQgJAWgJAUQgKATgLAQIgMgIIgMgIQAOgTANgZQAMgaAJgcQAKgdAHgeIAbAGIgJAgIgKAgICDAAIAAAPIgGB8QgCAzgEAgQgDAggFASQgEASgHAIQgGAIgHAEQgJADgKABIgcABIgjgCgAixC+IAAk3IAvAAIAHgXIAHgYIAFgXIAeAGIgLAhQgGARgGAOIBJAAIAAEUIh4AAIAAAjgAiXCCIBeAAIAAhrIheAAgAiXgCIBeAAIAAheIheAAgABFA3IgXgkIgaggIAWgNIAaAgIAZAiIASAeIgYAPIgSgeg");
	this.shape_3.setTransform(1647.65,216.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#52C1E1").s().p("Ag6DEIAAkyIAcAAIAAEygAiLDDIAAjnIgRAZQgHALgJALIgEgJIgGgJIgFgIQAQgXAPgcQAQgcAMghQANggAKghIAaAGQgHAZgIAWIgTAuIAAEggABkC1IgGgOIAjAAIAVAAQAGAAACgCQACgCAAgGIAAk1Ih3AAIAAgbICUAAIAAFQQgBAOgEAIQgEAHgIADQgKAEgQAAIgqABIgEgNgAgDh8IgRgeIgUgdIAXgMIATAcIASAdQAIAOAFALIgXAOIgNgZg");
	this.shape_4.setTransform(1603.45,217.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#52C1E1").s().p("AgmDAQgdAAgQgFQgSgEgGgMQgHgNAAgVIAAjEIAeAAIAABkQAjgKAhgLQAigLAdgLQAegNAVgLIAZAVQgcANgjANQgiANgkALQglALglAKIAABHQgBALAEAFQADAGALADQAJACATAAICIAAQARABAJgGQAIgFAEgQQAEgOACgcQAFADAIADQAIAEAHACQgDAggGATQgHASgOAIQgOAHgcAAgACSgrIAAg7IkkAAIAAA7IgcAAIAAhWICrAAQgEgMgHgOQgHgPgIgNIAcgIIAKAUIALAUIAHATIgIADICdAAIAABWg");
	this.shape_5.setTransform(1561.3,216.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#52C1E1").s().p("ACIDDIAAgZIkuAAIAAiYIAeAAIAAB8IB5AAIAAiXIiFAAIAAiSIAeAAIAAB2IBnAAIAAidIAeAAIAACdIBpAAIAAh2IAeAAIAACSIiHAAIAACXIB5AAIAAh8IAfAAIAACxg");
	this.shape_6.setTransform(1518.425,217.15);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#52C1E1").s().p("AhOC5IgMgJQAegVASgdQASgeAJgjQAJgjAEgmQACgnABgpIhKAAIAAgcIEOAAIAAAcIimAAIgBAiIgCAgICJAAIAAANQgDBAgEAnQgDAogEAUQgFAVgHAHQgFAGgHADQgHADgKABIgZABIgggBIgCgOQgDgHgDgGIAgACIAWAAQAGAAADgBQAEgBADgEQAFgEADgRQAEgRADgiQADgiACg2IhuAAQgEAogLAlQgKAkgSAeQgUAegfAWQgDgEgGgGgAiLDCIAAjxIgTAbIgVAZIgIgOIgJgNQAUgWATgcQATgbAPgfQAQggAMggIAbAIQgJAYgLAYQgLAYgMAWIAAEegAA3iOIgIgXIgHgXIAbgGIAIAWIAIAXIAGATIgdAIIgFgUg");
	this.shape_7.setTransform(1475.275,217.25);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#52C1E1").s().p("ABsCgQgegYgQgkIgBAAQgIAXgQASQgPASgYAOQgZAOglAJIgHgMIgJgLQAggHAWgKQAXgLAMgOQAOgOAIgRIhkAAIAAgZIBsAAIAFgSIACgTIhXAAIAAiCIDQAAIAACCIhdAAIgCATIgEASIB5AAIAAAZIhkAAQAQAbAcATQAbASAmAIQgEAEgFAHQgGAHgDAGQgqgMgegYgAgOAQICZAAIAAggIiZAAgAgOglICZAAIAAghIiZAAgAiHDDIAAjJQgLAhgMAeQgLAdgNAVIgHgOIgJgNQANgTAMgbQALgbAKgfQAKgfAGgeIg2AAIAAgbIA3AAIAAhTIAbAAIAABTIAtAAIAAAbIgtAAIAAASIALASIAQAZIAOAYIAKAQIgTAVIgJgTIgLgWIgMgZIAADggABkhkIAAgiIhEAAIAAAiIgcAAIAAgiIhAAAIAAgYIBAAAIAAglIAcAAIAAAlIBEAAIAAglIAcAAIAAAlIA+AAIAAAYIg+AAIAAAig");
	this.shape_8.setTransform(1432.4,217.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#52C1E1").s().p("AgfDDIAAjKIC/AAIAACpQABAMgDAGQgDAGgJADQgJAEgOABIgmAAIgEgNIgEgMIAeABIASgBQAFABACgCQABgCAAgEIAAghIiJAAIAABCgAgEBrICJAAIAAglIiJAAgAgEAyICJAAIAAgjIiJAAgAiLCwIgIgNQADgCAFgFQAEgFAEgHQADgHAAgKIAAifIhCAAIAAgcIBdAAIAAC6IAugiIAFANIAFALIg1ApIgZAVQgIAGgCADIgGgLgAg+ggIAAgXIBwAAIAAghIhZAAIAAgVIBZAAIAAgcIhjAAIAAgXIBjAAIAAgiIAcAAIAAAiIBpAAIAAAXIhpAAIAAAcIBbAAIAAAVIhbAAIAAAhIB1AAIAAAXgAh3h5IgWgYIgYgWIASgRIAZAVIAWAWIASAUIgUAUIgRgUg");
	this.shape_9.setTransform(1389.5,217.15);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#52C1E1").s().p("AgaCcQgJgJgBgPQABgPAJgIQAKgIANgBQANABAJAIQAJAIABAPQgBAPgJAJQgJAIgNAAQgNAAgKgIgAgTA8QgEgVAGgRQAHgQALgMIAZgZQANgMAJgMQAJgMAAgPQAAgXgNgOQgOgPgcAAQgTAAgSAJQgSAJgQATIgWgUQAUgUAXgNQAXgNAeAAQApAAAWAVQAXAVABAjQgBAUgJAPQgJAPgNAMIgaAYQgMALgHAPQgHAPADATg");
	this.shape_10.setTransform(1335.575,217.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#52C1E1").s().p("Ag8C4IgGgMQAFgDAGgFQAGgGAAgMIAAkoIBJgNQAlgGAhgJQAhgJAYgIIAYAWIglALQgUAGgXAGIADA9IAFA6IBcAAIAAAbIhZAAQAFAvAJAjQAIAlALAVQALATANACQAGAAAEgRQAFgQACgeQAEADAHAFIAKAFQgEAggGASQgGASgHAIQgHAHgIAAQgXgBgRgYQgQgZgLgsQgLgsgGg4IhlAAIAACgIA+gQIABAMIAAAMIguANIgdAJIgOAGIgIAEIgEgMgABMgfIgFg3IgDg8IgtAJIgtAIIAABiIBiAAIAAAAgAiJDBIAAjzQgLAQgMAPQgMAPgMAMIgEgIIgGgKIgGgJQAVgVAUgcQATgdARggQAQggANgiIAaAIQgJAXgKAYQgLAWgMAXIAAEggABBCiIgNgdIgPgcIAVgGIAPAbIAOAdIAKAXIgWAJQgDgLgHgOg");
	this.shape_11.setTransform(1303.275,217.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#52C1E1").s().p("AiBDGIAAi7IEHAAIAAC6IgdAAIAAgPIjOAAIAAAQgAhlCdIDOAAIAAgyIjOAAgAhlBUIDOAAIAAgwIjOAAgAi9gaIAAgbIBuAAQgDgOgHgSQgHgSgJgPIAbgGIAMAWIAKAYIAHAVIgTAEIB1AAIALgXIAMgaIAJgYIAfAIIgRAhIgQAgIBvAAIAAAbgAiliAIAAgaICeAAIgIgTIgKgSIAbgGQAGAKAGAMIAJAVICSAAIAAAag");
	this.shape_12.setTransform(1260.55,217.025);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#52C1E1").s().p("AizC7IgMgKQAXgWALgaQAMgbADgZQAEgbAAgXIAAg4IEuAAIAACMIgdAAIAAgWIj7AAQgEAdgNAcQgMAcgZAXQgDgFgGgFgAAVBAIByAAIAAhEIhyAAgAhtAbIgBASIgCATIBqAAIAAhEIhnAAgAiUhAIAAgZICOAAIAAguIinAAIAAgYICnAAIAAgmIAcAAIAAAmICqAAIAAAYIiqAAIAAAuICXAAIAAAZg");
	this.shape_13.setTransform(1216.75,217.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#52C1E1").s().p("AgPDEIAAkLIAcAAIAAELgABygkQgfgVgcgaQgdgagaghQgjAtguAlQgtAlgyAXIgKgMIgLgMQAogSAmgaQAlgaAgghQAfggAVgkIAZAMIgFAJIgGAJQAnAxAuAiQAtAiA0AZIgLAMQgGAHgEAFQghgRgegUg");
	this.shape_14.setTransform(1174.725,217.175);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#52C1E1").s().p("AheCxIgKgJQAYgbANggQANggAGghIghAAIAAgZIAlAAIADgnIABgmIgoAAIAAgZIAoAAIAAhMIgnAAIAAgZIB9AAIAAAPIAACZIgCBkQgBAmgCAUQgDAUgEAGQgEAIgGAEQgGADgHABIgSABIgWgBIgCgNQgBgHgEgGIAWABIAOAAQAEAAADgBQADgCACgFQACgEACgMQACgMABgWIACg5IgtAAQgGAmgPAlQgPAlgaAeIgIgJgAgRgVIgDAoIApAAIAAgjIABgqIgmAAIgBAlgAgQhTIAmAAIAAhMIgmAAgABLC5IAAlxIBaAAIAEgBIARAKIgNAsIgOAuIgPAqQAXAfAIAZQAIAbAAAXQAAASgEAOQgEAOgIAHIgKAFIgLADIgNABIgNgBIgCgMQgBgHgEgGIANABIALAAIAHgBIAFgEQAFgEACgJQACgKAAgMQABgVgIgZQgIgYgXgeIANgoIAMgqIALgmIg4AAIAAFZgAi5ByIAAkWIBYAAIAADsIhBAAIAAAqgAiiAtIAqAAIAAi2IgqAAg");
	this.shape_15.setTransform(1132.125,218.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#52C1E1").s().p("AgaCcQgJgJgBgPQABgPAJgIQAKgIANgBQANABAJAIQAJAIABAPQgBAPgJAJQgJAIgNAAQgNAAgKgIgAgTA8QgEgVAGgRQAHgQALgMIAZgZQANgMAJgMQAJgMAAgPQAAgXgNgOQgOgPgcAAQgTAAgSAJQgSAJgQATIgWgUQAUgUAXgNQAXgNAeAAQApAAAWAVQAXAVABAjQgBAUgJAPQgJAPgNAMIgaAYQgMALgHAPQgHAPADATg");
	this.shape_16.setTransform(1077.725,217.225);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#52C1E1").s().p("AiqDEIAAi5IFWAAIAACaQAAAKgDAGQgDAGgIADQgIABgOABIghAAIgEgKIgFgKIAaAAIAQAAQAEgBACgBQAAAAABgBQAAAAAAgBQABAAAAgBQAAgBAAgBIAAiCIkeAAIAAChgAhbCrIAAhtICzAAIAABXIiYAAIAAAWgAhAB/IB+AAIAAgrIh+AAgAh4gNIAAhUID1AAIAABUgAhbgiIC6AAIAAgqIi6AAgAi6h7IAAgaICyAAIgHgUIgHgTIAagHIAJAYIAIAWICmAAIAAAag");
	this.shape_17.setTransform(1045.65,217.1);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#52C1E1").s().p("AiBDGIAAi7IEHAAIAAC6IgdAAIAAgPIjOAAIAAAQgAhlCdIDOAAIAAgyIjOAAgAhlBUIDOAAIAAgwIjOAAgAi9gaIAAgbIBuAAQgDgOgHgSQgHgSgJgPIAbgGIAMAWIAKAYIAGAVIgSAEIB1AAIALgXIAMgaIAJgYIAfAIIgRAhIgQAgIBvAAIAAAbgAiliAIAAgaICeAAIgIgTIgKgSIAbgGQAGAKAGAMIAJAVICSAAIAAAag");
	this.shape_18.setTransform(1002.7,217.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#52C1E1").s().p("AizC7IgMgKQAXgWALgaQAMgbADgZQAEgbAAgXIAAg4IEuAAIAACMIgcAAIAAgWIj8AAQgEAdgNAcQgMAcgZAXQgDgFgGgFgAAVBAIBzAAIAAhEIhzAAgAhtAbIgBASIgCATIBqAAIAAhEIhnAAgAiUhAIAAgZICOAAIAAguIinAAIAAgYICnAAIAAgmIAcAAIAAAmICqAAIAAAYIiqAAIAAAuICXAAIAAAZg");
	this.shape_19.setTransform(958.9,217.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#52C1E1").s().p("AgPDEIAAkLIAcAAIAAELgABygkQgfgVgcgaQgdgagaghQgjAtguAlQgtAlgyAXIgKgMIgLgMQAogSAmgaQAlgaAgghQAfggAVgkIAZAMIgFAJIgGAJQAnAxAuAiQAtAiA0AZIgLAMQgGAHgEAFQghgRgegUg");
	this.shape_20.setTransform(916.875,217.175);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#52C1E1").s().p("AheCxIgKgJQAYgbANggQANggAGghIghAAIAAgZIAlAAIADgnIABgmIgoAAIAAgZIAoAAIAAhMIgnAAIAAgZIB9AAIAAAPIAACZIgCBkQgBAmgCAUQgDAUgEAGQgEAIgGAEQgGADgHABIgSABIgWgBIgCgNQgBgHgEgGIAWABIAOAAQAEAAADgBQADgCACgFQACgEACgMQACgMABgWIACg5IgtAAQgGAmgPAlQgPAlgaAeIgIgJgAgRgVIgDAoIApAAIAAgjIABgqIgmAAIgBAlgAgQhTIAmAAIAAhMIgmAAgABLC5IAAlxIBaAAIAEgBIARAKIgNAsIgOAuIgPAqQAXAfAIAZQAIAbAAAXQAAASgEAOQgEAOgIAHIgKAFIgLADIgNABIgNgBIgCgMQgBgHgEgGIANABIALAAIAHgBIAFgEQAFgEACgJQACgKAAgMQABgVgIgZQgIgYgXgeIANgoIAMgqIALgmIg4AAIAAFZgAi5ByIAAkWIBYAAIAADsIhBAAIAAAqgAiiAtIAqAAIAAi2IgqAAg");
	this.shape_21.setTransform(874.275,218.225);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#52C1E1").s().p("AhMC4IgJgKQAjgOATgVQATgWAJgcQAHgdACgkIg2AAIAAiFICBAAIAOgbIANgfIAKgcIAeAJIgSAnIgSAmIAtAAIAACFIg2AAIAAB+QAAAIADADQACACAIAAIAnAAQAFAAADgEQADgEABgLQABgMABgXIAMAHIAOAFQgCAbgEAPQgDAPgHAFQgIAHgNgBIgtAAQgWAAgJgIQgHgIAAgXIAAh+IgpAAQgCApgKAhQgKAhgUAYQgWAZgmAQIgIgMgAgVgBICVAAIAAhSIiVAAgAiQCkIgKgMIAKgJQAGgGAEgHQAFgIAAgJIAAiSIhAAAIAAgbIBdAAIAACtIAxgjIAFANIAFAMIgvAiIgcAVIgOAMIgHAHQgCgGgFgHgAh0h5IgXgYIgYgXIASgSIAZAXIAXAXIASAUIgUAVQgHgKgKgMgAAAiFIgOgaIgPgZIAXgKIAPAZIAPAaIAKAWIgbALQgDgKgEgNg");
	this.shape_22.setTransform(830.85,217.2);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#52C1E1").s().p("AjBAPIAAgdIGDAAIAAAdg");
	this.shape_23.setTransform(787.875,216.8);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#52C1E1").s().p("AhMC4IgJgKQAjgOATgVQATgWAJgcQAHgdACgkIg2AAIAAiFICBAAIAOgbIANgfIAKgcIAeAJIgSAnIgSAmIAtAAIAACFIg2AAIAAB+QAAAIADADQACACAIAAIAnAAQAFAAADgEQADgEABgLQABgMABgXIAMAHIAOAFQgCAbgEAPQgDAPgIAFQgHAHgNgBIgtAAQgWAAgJgIQgHgIAAgXIAAh+IgpAAQgCApgKAhQgKAhgUAYQgWAZgmAQIgIgMgAgVgBICVAAIAAhSIiVAAgAiQCkIgJgMIAJgJQAGgGAEgHQAFgIAAgJIAAiSIhAAAIAAgbIBdAAIAACtIAxgjIAFANIAFAMIgvAiIgcAVIgOAMIgHAHQgCgGgFgHgAh0h5IgXgYIgYgXIASgSIAZAXIAXAXIASAUIgUAVQgHgKgKgMgAgBiFIgNgaIgPgZIAXgKIAPAZIAPAaIAKAWIgbALQgDgKgFgNg");
	this.shape_24.setTransform(744.9,217.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#52C1E1").s().p("AgoA0QAagLANgQQANgQABgWIgDABIgFAAQgLAAgJgIQgJgHAAgOQAAgPAJgIQAJgHALAAQASAAAIANQAKANgBAWQAAAigTAYQgTAZghAMg");
	this.shape_25.setTransform(690.05,230.65);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#52C1E1").s().p("AiBDGIAAi7IEHAAIAAC6IgdAAIAAgPIjOAAIAAAQgAhlCdIDOAAIAAgyIjOAAgAhlBUIDOAAIAAgwIjOAAgAi9gaIAAgbIBuAAQgDgOgHgSQgHgSgJgPIAbgGIAMAWIAKAYIAGAVIgSAEIB1AAIALgXIAMgaIAJgYIAfAIIgRAhIgQAgIBvAAIAAAbgAiliAIAAgaICeAAIgIgTIgKgSIAbgGQAGAKAGAMIAJAVICSAAIAAAag");
	this.shape_26.setTransform(658.9,217.025);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#52C1E1").s().p("AizC7IgMgKQAXgWALgaQAMgbADgZQAEgbAAgXIAAg4IEuAAIAACMIgdAAIAAgWIj6AAQgFAdgNAcQgMAcgZAXQgDgFgGgFgAAVBAIByAAIAAhEIhyAAgAhtAbIgBASIgCATIBqAAIAAhEIhnAAgAiUhAIAAgZICOAAIAAguIinAAIAAgYICnAAIAAgmIAcAAIAAAmICqAAIAAAYIiqAAIAAAuICXAAIAAAZg");
	this.shape_27.setTransform(615.1,217.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#52C1E1").s().p("ABMDDIAAiLIhBAAIAAAaIgaAAIAAi6IBbAAIAAhaIAdAAIAABaIBaAAIAAC4IgcAAIAAgYIg+AAIAACLgABpAdIA+AAIAAhpIg+AAgAALAdIBBAAIAAhpIhBAAgAhyDDIAAjEQgJAWgLAVQgLAWgLATQgMATgMAOIgGgNIgIgNQAOgQAOgWQAOgXANgaQAMgZAJgaIhBAAIAAgaIBFAAIAAhFIgfAGIgeAFIgEgLIgEgLIAxgKQAZgFAXgGQAXgHAQgHIASAXIgbAJIgeAJIAABKIA4AAIAAAaIg4AAIAAAKIANAQIASAWIARAUIAKAOIgRAXIgLgTIgPgXIgPgWIAADKg");
	this.shape_28.setTransform(572.1,217.175);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#52C1E1").s().p("AiwC3QgEgJgDgFQA3gFA1gNQA2gMAsgXQgKgLgOgLIgbgXIAYgMIAbAVQAPAMAMAMQAcgRAYgVQAYgWAQgbIh4AAQgaAXgiAUQghAUgpAQIgIgLQgFgGgFgEQArgQAigUQAkgVAYgVQAagWAPgWIAfAHIgNARIgQAPIBtAAIAGgBIATALQgXAvglAiQglAigvAXQgvAWg3AOQg2ANg4AHIgEgNgAivAPQgEgIgEgEQAlgFAlgNQAmgNAjgRQgLgKgOgKIgbgRIAVgQQAOAJAPAKQAQALALAKQAZgPAXgTQAXgSAQgVIh6AAQgWARgZARQgZAQgeAOQgEgGgFgFIgLgKQAigOAdgSQAcgTAVgTQAVgTAOgSIAeAGIgMAQIgQAQIBzAAIAFgBIATAMQgVAjggAdQghAdgmAVQgnAWgqAOQgrAPgpAJIgGgNg");
	this.shape_29.setTransform(530.45,217.15);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#52C1E1").s().p("AA1C/QgBgHgDgHQgCgIgEgGQAVACASAAIAZABIAKgBQAFgCADgEQAEgFAFgQQAEgRADgeQADgeACguIAFhvIhxAAQgIAWgLAUQgKATgKAQIgMgIIgMgIQAPgTALgZQANgaAKgcQAJgdAHgeIAbAGIgJAgIgKAgICDAAIAAAPIgGB8QgCAzgDAgQgEAggEASQgFASgHAIQgGAIgHAEQgJADgKABIgcABIgjgCgAiyC+IAAk3IAwAAIAHgXIAHgYIAFgXIAeAGIgLAhQgFARgHAOIBJAAIAAEUIh5AAIAAAjgAiYCCIBfAAIAAhrIhfAAgAiYgCIBfAAIAAheIhfAAgABGA3IgYgkIgaggIAXgNIAZAgIAZAiIASAeIgYAPIgRgeg");
	this.shape_30.setTransform(487.3,216.675);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#52C1E1").s().p("AgPDDIAAiMIh/AAIAAAbIgcAAIAAjIICbAAIAAhMIAdAAIAABMICdAAIAADGIgdAAIAAgZIiAAAIAACMgAAOAbICAAAIAAh1IiAAAgAiOAbIB/AAIAAh1Ih/AAg");
	this.shape_31.setTransform(444,217.15);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#52C1E1").s().p("AisC4QgGgGgFgEQAagfAOgjQANgkAEgmQAEglgBgnIAAiOIAdAAIAABkIB8AAIAAhvIAeAAIAABvIB8AAIAAAdIkWAAIAAANIAAAdIgBAcIDSAAIAAC0IgeAAIAAiWIi3AAQgFApgOAmQgPAngdAhQgEgGgHgGg");
	this.shape_32.setTransform(399.875,217.225);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#52C1E1").s().p("ACVC6IAAgSIkpAAIAAASIgcAAIAAlzIFhAAIAAFzgAiUCOIEpAAIAAktIkpAAgAAcBvQgcgIgggGQghgGgdgDIANgUQAeADAfAGQAfAGAeAHQAdAHAVAHIgNAWQgVgIgdgHgAAUA2QgSgGgRgFQgTgGgRgEIAMgSIAkAJIAjALIAcAMIgLAUIgdgNgAiCASIgIgMQAegFAegJQAegKAcgOQgNgJgNgKQgMgKgLgMIgVASIgVAPIgJgJIgKgIQAbgRAagYQAZgXARgbIAYAIIgJANIgJAMIBxAAIAEgBIAQAKQgNAWgVATQgTASgZAQQAaAMAcAJQAdAJAeAFQgFADgEAHQgFAGgDAFQgfgHgfgLQgegJgbgPQgeAQggALQgiANggAHIgFgMgAg1hYQALAMAOALQAOALARAKQASgKAPgMQARgMAMgOIhyAAg");
	this.shape_33.setTransform(358.1,218.125);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#52C1E1").s().p("ABkDCIAAjfIhYAAQgBAhgEAoQgEAngLAnQgMAngYAgQgEgFgHgFIgMgIQAXggAKglQALgmAEglQADglAAghIAAhwIA5gMIA4gPQAagIASgHIAZAWQgVAIgZAHQgaAHgbAGIg3AMIAABKICuAAIAAAcIg5AAIAADfgAi5B7IAAkYIBzAAIAAD3IhYAAIAAAhgAieA/IA8AAIAAjAIg8AAg");
	this.shape_34.setTransform(315.7,217.275);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#52C1E1").s().p("AjBAPIAAgdIGDAAIAAAdg");
	this.shape_35.setTransform(272.175,216.8);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#52C1E1").s().p("ABkDCIAAjfIhYAAQgBAhgEAoQgEAngLAnQgMAngYAgQgEgFgHgFIgMgIQAXggAKglQALgmAEglQADglAAghIAAhwIA5gMIA3gPQAbgIASgHIAZAWQgVAIgZAHQgaAHgbAGIg3AMIAABKICuAAIAAAcIg5AAIAADfgAi5B7IAAkYIBzAAIAAD3IhYAAIAAAhgAieA/IA8AAIAAjAIg8AAg");
	this.shape_36.setTransform(229.75,217.275);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#52C1E1").s().p("AgLAIQgagZgXgTIAZgWIAhAdIAgAgIAfAiIgaAWQgWgagYgZg");
	this.shape_37.setTransform(173.1,229.9);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#52C1E1").s().p("AjBAPIAAgdIGDAAIAAAdg");
	this.shape_38.setTransform(143.225,216.8);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#EDF9FC").s().p("AyQOOQjbAcj2AAQpIAAmcicQgogPgjgQQndCjptAAQo5AAnDiKQnUC5pzAAQmqAAlfhUQiXAKieAAQsBAAoij2QkgiAiIieQh3iMAAijQAAg0AMgxQAvjCDtifQBKgyBcgtQAngUAqgTQIhj0MCAAQBrAABmAEQAygXA4gVQCxhDDTgjQDlgmEQAAQEOAADmAmQDTAjCwBDQBIAbA5AcQGzh+IiAAQLOAAIPDaQDug+EPgbQFShoHBAAIBLAAQB4giCFgWQDlgmEPAAQEPAADkAmQDTAjCxBDQBHAbA5AcQG0h+IiAAQEnAAEHAlQCCASB6AcQEkBAD2B1QAfAOAdAPQBZhFCcg7QFwiMIJAAQIHAAFxCMQCFAzBUA6QFoiAH0AAQF2AAEmBHQC/glDVgKQBRgEBSAAQKDAAHGDkIADABQAlATAkAVQBOAsA+AwQDzC5AADqQAACOhZB7QhvCfkACBIgLAFQnEDfp9AAQhSAAhRgEQmYgTlHh2QhaAMhhAAIgpAAQkgCWmJAAQkoAAjuhXQkqCHmQAAIghAAQjqAhkMAAQpGAAmdicQgngPgkgQQiKAviWAiQlwBSm6AAQoXAAmrh5Qh7AliLAQQmLBznvAAQlMAAkegzg");
	this.shape_39.setTransform(960.675,210.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(479));

	// 音频停止
	this.m1stop_btn = new lib.音频停止();
	this.m1stop_btn.name = "m1stop_btn";
	this.m1stop_btn.setTransform(370.4,411.8,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m1stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m2stop_btn = new lib.音频停止();
	this.m2stop_btn.name = "m2stop_btn";
	this.m2stop_btn.setTransform(1324.35,412.1,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m2stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m3stop_btn = new lib.音频停止();
	this.m3stop_btn.name = "m3stop_btn";
	this.m3stop_btn.setTransform(410.7,410.55,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m3stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m4stop_btn = new lib.音频停止();
	this.m4stop_btn.name = "m4stop_btn";
	this.m4stop_btn.setTransform(1325.05,410.55,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m4stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m5stop_btn = new lib.音频停止();
	this.m5stop_btn.name = "m5stop_btn";
	this.m5stop_btn.setTransform(410.7,410.55,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m5stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m6stop_btn = new lib.音频停止();
	this.m6stop_btn.name = "m6stop_btn";
	this.m6stop_btn.setTransform(1328.25,410.3,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m6stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1stop_btn}]},4).to({state:[]},44).to({state:[{t:this.m2stop_btn}]},3).to({state:[]},73).to({state:[{t:this.m3stop_btn}]},2).to({state:[{t:this.m4stop_btn}]},183).to({state:[]},23).to({state:[{t:this.m5stop_btn}]},3).to({state:[{t:this.m6stop_btn}]},82).to({state:[]},61).wait(1));

	// 播放按钮
	this.m1_btn = new lib.音频播放标();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(323.1,364.7);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m2_btn = new lib.音频播放标();
	this.m2_btn.name = "m2_btn";
	this.m2_btn.setTransform(1276.95,364.7);
	new cjs.ButtonHelper(this.m2_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m3_btn = new lib.音频播放标();
	this.m3_btn.name = "m3_btn";
	this.m3_btn.setTransform(362.6,364.7);
	new cjs.ButtonHelper(this.m3_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m4_btn = new lib.音频播放标();
	this.m4_btn.name = "m4_btn";
	this.m4_btn.setTransform(1276.95,364.7);
	new cjs.ButtonHelper(this.m4_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m5_btn = new lib.音频播放标();
	this.m5_btn.name = "m5_btn";
	this.m5_btn.setTransform(362.6,364.7);
	new cjs.ButtonHelper(this.m5_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m6_btn = new lib.音频播放标();
	this.m6_btn.name = "m6_btn";
	this.m6_btn.setTransform(1279.45,364.7);
	new cjs.ButtonHelper(this.m6_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m2_btn},{t:this.m1_btn}]}).to({state:[{t:this.m4_btn},{t:this.m3_btn}]},124).to({state:[{t:this.m6_btn},{t:this.m5_btn}]},208).wait(147));

	// 边框和标题
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("ACIEHQgDgHgIgEQgFgDgLgDQgLgEgNgDIgagEIAAgKIAjADIAkACIAYABQAIABAFgCQAFgBAEgDQAHgIAGgYQAEgYAFgmQAEglACgvIlTAAIgQAVIgsgdIAHgHIAKgGIAAj+IAvAWIA3AAIAHgkIAFgkIBDAMQgDAGgEAEQgGAEgJAAIgQAWIgSAYICsAAIAXgXIAsAkQgCAEgFADQgFABgKABQgDBFgIAsQgKArgPAPQgMAJgQAEQgRAEgSAAQABgHgDgHQgCgGgHgFQgHgFgRgEIgjgHIAAgJIAeADIAgACIAWABQAJAAAFgBQAFgBADgEQAKgJAFgmQAGglADg6IkJAAIAADZIFSAAIAWgYIAuAmIgJAFQgFADgJAAQgDA3gEAqQgFArgJAcQgHAcgNALQgLALgRAEQgPAFgVgBQAAgIgCgHgAkECcIgFgSIFNAAIAcgjIAJAHIAUARIAVATQAAAFgFACQgEACgGABgAgDhEQgIgOgNgPQgOgQgRgOQgQgOgPgJIAGgHQA1ALAZARQAZASAEARQAFARgKAIQgEAEgHAAQgHAAgHgDg");
	this.shape_40.setTransform(1166.15,405);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#FFFFFF").s().p("AgwD9QgEgIgHgEQgIgGgQgEQgPgFgagEIAAgKIANABIAeACIAgACIAVABQAKAAAEgDQAEgEAAgHIAAnaIA+AHQgBAHgFAEQgFAEgLABIAAHGQABASgFANQgFANgQAJQgPAIghADQgBgKgEgIgAkOClQAWggATglQAUgmAPgoQAPgmAMgnQALgmAHgiIBBAWQgBAFgFADQgFADgMgBQgOApgVAwQgWAvgeAwQgeAwgnAmgADmCLQgFgpgTgvQgTgugbgrQgbgsgagjIAJgFQA8AwAiAuQAjArAOAlQAOAlgCAZQgBAYgMAIQgEADgFAAQgIAAgLgKg");
	this.shape_41.setTransform(1106.0823,405.4);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#51C1E1").s().p("ApYIkQjFAAiKiLQiLiLABjCIAAiVQgBjFCLiKQCKiLDFAAISxAAQDFAACKCLQCLCKgBDFIAACVQABDCiLCLQiKCLjFAAg");
	this.shape_42.setTransform(1136.75,406.275);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#FFFFFF").s().p("AgUESIAAjlIj5AAIgFgSID+AAIAAiRIiGAAQgUAigXAeQgYAdgaAXIgJgGQAWgeAUgnQAUgmAQgtQAQgtAKgvIBBASQgBAGgGADQgFADgKAAQgIAXgJAVQgJAWgKAUIB9AAIAAiKIA9AHQgCAHgEAEQgFAFgLABIAAByIB6AAIAdgmIAKAHIAXASIAYAVQgCAFgEACQgEADgGAAIjAAAIAACRICoAAIAfglIAKAHIAXARIAYAVQgBAFgEADQgEACgGAAIjxAAIAADVQgBAFgKAGQgJAFgLAAg");
	this.shape_43.setTransform(201.925,409.35);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#F29539").s().p("AmQIjQjDABiKiLQiLiKAAjFIAAiVQAAjCCLiLQCKiKDDAAIMgAAQDCAACNCKQCKCLAADCIAACVQAADFiKCKQiNCLjCgBg");
	this.shape_44.setTransform(201.85,406.25);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#F29539").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQA2g3Ahg/QA0hiAAh3MAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape_45.setTransform(503.925,634.05);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#51C1E1").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape_46.setTransform(1418.525,634.05);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFFFF").s().p("AgHETIAAiUIkIAAIgFgSIENAAIAAhjIiIAAIgWAUIgqglIAOgGIAPgFQAQgbASgjQATgjASglIiRAAIgFgSICfAAIAZg4IAUgwIA4AWQgDAFgEADQgHACgKgBIgPAiIgTAnIDmAAIAdgiIAJAHIAVAQIAWATQgBAFgEACQgEADgGAAIkxAAIgnBMIgkBFICEAAIAAhoIA8AGQAAAGgFAFQgFAEgLACIAABRIBvAAIAcgkIAKAHIAVARIAXATQgCAFgEACQgEADgHAAIiwAAIAABjICfAAIAdgkIAKAHIAWARIAZAVQgCAFgEACQgEACgGAAIjlAAIAACGQAAADgJAFQgJAFgOABg");
	this.shape_47.setTransform(1166.825,409.375);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#FFFFFF").s().p("AD+ESQgQgDgOgMQgbgWgOgpQgOgpgFg2QgFg1AAg6IkQAAIgFgSIEPAAIAXgYIAuAmQgCAEgGACQgGADgJABIAABAQACAiAFAgQAEAgAJAYQAJAZANALQAEADACgBQADgBACgEIAIgYIAIgcIAGABIgFBHQAIALACAIQACAHgEAGQgGAIgKAAIgHgBgAjjELQgFgIgBgOQAGgvgCgfQgCgfgLgHQgFgFgHgCIgRgCIAAgNIAbAAQAFAAADgCQADgCAEgIIAGgNIAJgUIASgnIAghIIA1h1IAMADIgYBBIgbBKIgXBAQgKAcgDALQgFAOgCANQgDAOAAALQABANAEAOIAHAhQAEASgBAYQgBAUgIAKQgJALgQAAQgHAAgFgHgAh4g6QAVgZAVgiQAUgiASgoQARgoAMgrIA7AUQgCAGgGACQgFADgKAAIgLAaIgNAaIDDAAIAdgkIAJAHIAUARIAWATQgBAFgEACQgEADgGAAIkNAAQgWAmgbAfQgaAfgdAWgAjWg6QgFgNgKgNQgLgOgNgMQgNgMgNgIIAFgFQAvAGAWAQQAWAPACARQADAQgKAIQgEAEgHAAQgGAAgJgFgAgtheIgFgRIDRAAIAagiIAJAHIATAQIAVATQgCAFgEACQgDACgGAAgAiii2QgFgPgLgOQgLgPgOgNQgOgNgNgJIAGgFQAwAHAXARQAWARADARQADARgKAIQgFAFgHAAQgGAAgJgEg");
	this.shape_48.setTransform(1106.9583,409.2688);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#51C1E1").s().p("AigCSQg0AAglglQglglAAg0IAAgnQAAg0AlglQAlglA0AAIFAAAQA1AAAlAlQAlAlAAA0IAAAnQAAA0glAlQglAlg1AAg");
	this.shape_49.setTransform(1136.7559,406.2643,3.7446,3.7446);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#FFFFFF").s().p("AkUEOQAYglAMgsQALgsAEgvQADgxAAgxIguAAIgKgQIA4AAIAAjFIAqATIANAAIAHgpIAGgpIA9AMQgEAMgSABQgGANgKAPIgSAdIA/AAIASgXIAvAkQgCADgHAEQgGACgJACIAAGIQAAAOgDAKQgEALgMAGQgMAGgXACQgBgHgCgFQgCgHgGgDQgFgFgKgCQgKgEgQgCIAAgJIAIAAIARABIATACIAOABQAHAAADgEQADgCAAgHIAAjaIhrAAQABAvgFAzQgFAxgRAuQgRAuglAmgAi7gQIBrAAIAAigIhrAAgAANEPIAAkNIAsATICCAAIAUgWIAsAhQgDADgGACQgFADgJACIAADXQgBADgJAEQgJAEgNABIgHAAIAAgyIiKAAIAAAoQAAADgJAEQgIAEgPABgAAzDJICKAAIAAijIiKAAgAiGCRIgEgiQgDgUgGgUQgHgVgKgRIAIgGQAgAdALAaQALAbgCARQgDATgJAGQgDABgDAAQgGAAgGgHgAgcAHQAagZALgcQANgcAEgeQAEgdgBgeIAAhXIAsATIBXAAIAUgVIArAkQgDADgGADQgGACgIABIAACJQAAAFACACQABACAGAAIAPAAIAPAAIAEgBIADAAIAFAAIAEgBIAGAAIACAAQAJADADADQAEADAAAGQAAALgMAEQgNAFghAAIgXAAQgVAAgHgIQgGgHABgRIAAiZIhkAAIAAAyQAAAcgFAgQgGAggSAgQgTAegmAZgAiHgvIgGgeQgEgQgGgSQgHgRgLgPIAIgGQAgAYAMAWQANAWgCARQgCAQgIAFQgEACgDAAQgGAAgGgGg");
	this.shape_50.setTransform(251.0278,409.55);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#FFFFFF").s().p("AiYEVIAAiDIgmAPIgpAPQgCAFgEAEQgDAEgEABIgdgzIAygKIBHgPIAAhpIg/AAIgUAVIgqgiIAMgHIAPgFQAKgaALghIAVhEIhBAAIgEgRIBLAAQAKggAHgcQAIgdAEgVIA4ASQgCAFgFAEQgGADgKgBIgLAlIgNAsIBGAAIAaggIAIAGIATAPIAVASQgBAFgEADQgFACgGAAIiFAAIgYBHIgWBBIBBAAIAAhoIA4AHQgBAGgEAFQgFAEgLACIAABQIAMAAIAYgdIAHAGIASAOIATAQQgBAFgEACQgEACgGAAIhBAAIAABgIAvgKIAwgLIABAJIgrASIg1AVIAACFQAAACgJAFQgIAEgOABgABHEBQgYAAgNgEQgOgEgFgKQgEgJAAgQIAAkZIA4AGQgBAGgFAEQgEAFgKABIAAB9QAfgWAhgfQAhgdAdghIAtAoQgDADgFABQgFAAgJgEQgjAdgnAXQgnAXgkAPIAABvQAAAJAFADQAGAEATAAIBCAAIAnAAIAYgBQAFgBADgBIAFgGQADgIAFgWIAKgyIAIAAIABBSQALAEADAEQAEADAAAGQABAJgKAGQgKAFgaACQgbADgyAAgAgzgbQAfggAagrQAcgrAVguQAUguALgnIA5AUQgBAFgFADQgFADgKAAQAOAkAZAiQAaAiAeAdQAeAdAfAUIgCAHQgOAEgJAHQgJAHgEANQgbgagYghQgZgggTgmQgTglgNgmQgRAkgYAmQgXAmgdAjQgdAjgiAbg");
	this.shape_51.setTransform(191.375,409.175);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#F29539").s().p("ApaIkQjDgBiKiKQiLiLAAjEIAAiVQAAjCCLiLQCKiKDDgBISzAAQDDABCMCKQCLCLAADCIAACVQAADEiLCLQiMCKjDABg");
	this.shape_52.setTransform(221.575,406.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#F29539").ss(1,0,0,4).p("Eg8hAbkQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAMhqTAAAQjDAAiKCKQiLCLAADFg");
	this.shape_53.setTransform(503.925,634.05);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#FFFFFF").s().p("ABeEUIAAjcIhUAAIAAAhQAAADgJAFQgIAEgMABIgHAAIAAkJIAoASIBQAAIAAh/IBAAHQgBAIgGAFQgGAFgNACIAABkIBPAAIAWgXIAvAlQgDADgGADIgQAGIAADJQgBACgEADQgGADgHADQgHACgGAAIgHAAIAAgnIhVAAIAADNQgBAFgJAFQgJAFgLAAgACEAnIBVAAIAAimIhVAAgAAKAnIBUAAIAAimIhUAAgAjHDbQANgLAFgFQADgGAAgGIAAihIhUAAIgGgRIBaAAIAAhRIgvAAIgFgSIBvAAIAXgfIAIAGIASAQIATARQgBAFgDADQgFACgFAAIhMAAIAABRIAeAAIAZggIAIAHIASAOIATASQgBAFgDADQgFACgFAAIhWAAIAACbIApgaIAsgdIAEAGIgoArQgaAcghAfQAAAHgDAEIgFAIgAkXguQAPgXAOgdQAOgcANggQANggAKgeQAKgfAFgYIA8AUQAAAFgGADQgEADgMABIgLAaIgMAcIA5AAIAYgfIAJAGIARAQIATARQgBAFgDACQgFACgFAAIh5AAQgSAlgYAiQgYAigaAag");
	this.shape_54.setTransform(1166.45,409.275);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("Aj8EUIAAnWIA7AHQgBAGgFAFQgFAEgLABIAAGxQgBAEgJAFQgKAFgLAAgACeECQgDgHgHgEQgHgFgOgEQgNgEgXgEIAAgJIALABIAaACIAbABIATABQAKAAADgDQAEgDAAgIIAAmkIkKAAIgFgRIEIAAIAUgZIAxAmQgDADgGAEQgIADgJACIAAGhQABAQgEALQgEAMgOAIQgOAHgdADQgBgJgEgHgAgcD6IAAj6IhSAAIAACuQgBADgJAFQgJAEgMABIgGAAIAAjeIAoARIBPAAIAAhGIiYAAIgFgSIEMAAIAcgjIAJAHIAUARIAXATQgBAFgFADQgDACgHAAIiLAAIAABGIBMAAIASgVIAuAiIgIAFQgGADgHABIAACGQAAAOgDAKQgEAKgKAGQgLAGgVACIgCgOQgCgGgEgEQgEgEgIgDQgHgDgNgCIAAgJIAJABIASABIAPABQAGAAACgDQACgCAAgGIAAiFIhSAAIAADuQAAADgIAEQgIAFgOAAgAgPh0QgDgSgNgSQgNgSgPgMIAHgFQAnAKAQAQQARAQAAAOQgBAOgKAFQgEACgEAAQgHAAgJgGgAiXi4QgGgOgKgQQgKgQgMgPQgMgOgMgMIAHgEQAuAOAUATQAUATACAQQACARgKAHQgFADgFAAQgHAAgIgEg");
	this.shape_55.setTransform(1108.2,409.175);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FFFFFF").s().p("ABeEUIAAjcIhTAAIAAAhQgBADgJAFQgIAEgNABIgFAAIAAkJIAnASIBQAAIAAh/IBAAHQgCAIgFAFQgGAFgNACIAABkIBPAAIAWgXIAwAlQgDADgHADIgQAGIAADJQAAACgGADQgEADgIADQgHACgHAAIgFAAIAAgnIhWAAIAADNQgBAFgJAFQgJAFgLAAgACEAnIBWAAIAAimIhWAAgAALAnIBTAAIAAimIhTAAgAjIDbQAOgLAEgFQAFgGAAgGIAAihIhWAAIgEgRIBaAAIAAhRIgwAAIgFgSIBuAAIAZgfIAIAGIARAQIATARQgBAFgEADQgDACgHAAIhKAAIAABRIAdAAIAZggIAIAHIATAOIATASQgCAFgEADQgDACgHAAIhUAAIAACbIAngaIAtgdIAEAGIgoArQgbAcgfAfQgBAHgDAEIgFAIgAkYguQAQgXAOgdQAOgcAOggQAMggAKgeQAKgfAFgYIA9AUQgCAFgEADQgFADgMABIgLAaIgLAcIA4AAIAZgfIAIAGIASAQIATARQgCAFgEACQgDACgGAAIh5AAQgSAlgYAiQgYAigaAag");
	this.shape_56.setTransform(251.2,409.275);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FFFFFF").s().p("ACFDFQgqgqgagwQgagvgOgvQgOgvgGguQgFA1gQAwQgPAxgfAtQgfAtgzAoQgzAnhNAjIgGgLQBBgjAsgoQAsgnAcgrQAbgsAOguQAOguAGgyIjnAAIgFgSIDuAAQADgpABgsQABgsgBguIBAAHQgBAGgFAFQgEAFgLABIgCBNQgBAmgDAkICsAAIAhgoIAKAIIAYATIAZAVQgBAGgEABQgEADgHAAIjvAAQAKA5AdA4QAcA5A2A0QA2AzBYApIgBAHQgQACgKAHQgLAHgEARQg+gigqgrg");
	this.shape_57.setTransform(191.975,409.4);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#F29539").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape_58.setTransform(503.925,634.05);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#51C1E1").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQBQhRAihjQAZhJAAhSMAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape_59.setTransform(1418.525,634.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40}]}).to({state:[{t:this.shape_46},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47}]},124).to({state:[{t:this.shape_59},{t:this.shape_58},{t:this.shape_49},{t:this.shape_52},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54}]},208).wait(147));

	// 遮罩 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EASTAi9QjDAAiKiKQiLiMAAjEMAAAg3FQAAjGCLiKQCKiLDDABMBqUAAAQDDgBCKCLQCLCKAADGMAAAA3FQAADEiLCMQiKCKjDAAgEh8mAi9QjDAAiKiKQiLiMAAjEMAAAg3FQAAjGCLiKQCKiLDDABMBqUAAAQDDgBCKCLQCLCKAADGMAAAA3FQAADEiLCMQiKCKjDAAg");
	mask.setTransform(961.225,634.05);

	// 牛
	this.instance = new lib.head();
	this.instance.setTransform(309.4,517.3,0.9109,0.9109);

	this.instance_1 = new lib.body();
	this.instance_1.setTransform(309,512,1.001,1.001);

	this.instance_2 = new lib.元件6("synched",4);
	this.instance_2.setTransform(389.6,601.5,1,1,0,0,0,80.2,84.2);

	this.instance_3 = new lib.图层1();
	this.instance_3.setTransform(344,467);

	this.instance_4 = new lib.元件5("synched",2);
	this.instance_4.setTransform(549,641,1,1,0,0,0,205,174);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#F5AD89").s().p("ApcA9IAAh5IS4AAIAAB5g");
	this.shape_60.setTransform(496.3,617.275);

	this.instance_5 = new lib.图层2();
	this.instance_5.setTransform(472,606,0.9898,0.9898);

	this.instance_6 = new lib.椭圆1();
	this.instance_6.setTransform(386,461,0.9898,0.9898);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#F5AD89").s().p("ApcA9IAAh5IS5AAIAAB5g");
	this.shape_61.setTransform(495.45,617.275);

	this.instance_7 = new lib.元件6_1("synched",3);
	this.instance_7.setTransform(495.7,681.4,1,1,0,0,0,23.7,75.4);

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2,this.instance_3,this.instance_4,this.shape_60,this.instance_5,this.instance_6,this.shape_61,this.instance_7];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_1},{t:this.instance_2}]},9).to({state:[{t:this.instance_1},{t:this.instance}]},43).to({state:[{t:this.instance_3}]},72).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_3}]},181).to({state:[{t:this.shape_61},{t:this.instance_6},{t:this.instance_5},{t:this.shape_60}]},25).to({state:[{t:this.instance_6},{t:this.instance_7}]},3).to({state:[{t:this.shape_61},{t:this.instance_6},{t:this.instance_5},{t:this.shape_60}]},82).wait(62));

	// 小鸟
	this.instance_8 = new lib.元件15();
	this.instance_8.setTransform(1470.7,559.45,1,1,16.6158,0,0,2.9,79.9);

	this.instance_9 = new lib.小鸟身子();
	this.instance_9.setTransform(1357,503);

	this.instance_10 = new lib.元件16();
	this.instance_10.setTransform(1377.45,595.3,1,1,-3.3329,0,0,14.2,2.7);

	this.instance_11 = new lib.元件14("synched",30);
	this.instance_11.setTransform(1471,576.5,1,1,0,0,0,114,104);
	this.instance_11._off = true;

	this.instance_12 = new lib.Bitmap9();
	this.instance_12.setTransform(1159,563,0.9963,0.9963);

	this.instance_13 = new lib.元件1("synched",9);
	this.instance_13.setTransform(1438.8,683.1,1,1,0,0,0,279.8,120.1);

	this.instance_14 = new lib._33();
	this.instance_14.setTransform(1263,489,0.986,0.986);

	this.instance_15 = new lib.元件7_1("synched",0);
	this.instance_15.setTransform(1431.8,657.8,1,1,0,0,0,168.8,168.8);

	var maskedShapeInstanceList = [this.instance_8,this.instance_9,this.instance_10,this.instance_11,this.instance_12,this.instance_13,this.instance_14,this.instance_15];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10},{t:this.instance_9},{t:this.instance_8}]}).to({state:[{t:this.instance_11}]},52).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_10},{t:this.instance_9},{t:this.instance_8}]},1).to({state:[{t:this.instance_12}]},3).to({state:[{t:this.instance_13}]},184).to({state:[{t:this.instance_14}]},24).to({state:[{t:this.instance_15}]},85).wait(62));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(52).to({_off:false},0).wait(1).to({regX:115.4,regY:104.2,x:1474.4,y:575.6,startPosition:31},0).wait(1).to({x:1476.4,y:574.5,startPosition:32},0).wait(1).to({x:1478.4,y:573.45,startPosition:33},0).wait(1).to({x:1480.4,y:572.35,startPosition:34},0).wait(1).to({x:1482.4,y:571.3,startPosition:35},0).wait(1).to({x:1484.45,y:570.2,startPosition:36},0).wait(1).to({x:1486.45,y:569.1,startPosition:37},0).wait(1).to({x:1488.45,y:568.05,startPosition:38},0).wait(1).to({x:1490.45,y:566.95,startPosition:39},0).wait(1).to({x:1492.45,y:565.9,startPosition:40},0).wait(1).to({x:1494.45,y:564.8,startPosition:41},0).wait(1).to({x:1496.5,y:563.75,startPosition:42},0).wait(1).to({y:560.05,startPosition:43},0).wait(1).to({y:556.35,startPosition:44},0).wait(1).to({y:552.65,startPosition:45},0).wait(1).to({y:548.95,startPosition:46},0).wait(1).to({y:545.25,startPosition:47},0).wait(1).to({y:541.55,startPosition:0},0).wait(1).to({y:537.85,startPosition:1},0).wait(1).to({y:534.15,startPosition:2},0).wait(1).to({y:530.45,startPosition:3},0).wait(1).to({y:526.75,startPosition:4},0).wait(1).to({y:523.05,startPosition:5},0).wait(1).to({y:523.95,startPosition:6},0).wait(1).to({y:524.9,startPosition:7},0).wait(1).to({y:525.85,startPosition:8},0).wait(1).to({y:526.8,startPosition:9},0).wait(1).to({y:527.75,startPosition:10},0).wait(1).to({y:528.65,startPosition:11},0).wait(1).to({y:529.6,startPosition:12},0).wait(1).to({y:530.55,startPosition:13},0).wait(1).to({y:531.5,startPosition:14},0).wait(1).to({y:532.45,startPosition:15},0).wait(1).to({y:533.35,startPosition:16},0).wait(1).to({y:534.3,startPosition:17},0).wait(1).to({y:535.25,startPosition:18},0).wait(1).to({y:536.2,startPosition:19},0).wait(1).to({y:537.15,startPosition:20},0).wait(1).to({y:538.05,startPosition:21},0).wait(1).to({y:539,startPosition:22},0).wait(1).to({y:539.95,startPosition:23},0).wait(1).to({y:540.9,startPosition:24},0).wait(1).to({y:541.85,startPosition:25},0).wait(1).to({y:542.75,startPosition:26},0).wait(1).to({y:543.7,startPosition:27},0).wait(1).to({y:544.65,startPosition:28},0).wait(1).to({y:545.6,startPosition:29},0).wait(1).to({y:546.55,startPosition:30},0).wait(1).to({y:547.45,startPosition:31},0).wait(1).to({y:548.4,startPosition:32},0).wait(1).to({y:549.35,startPosition:33},0).wait(1).to({y:550.3,startPosition:34},0).wait(1).to({y:551.25,startPosition:35},0).wait(1).to({y:552.15,startPosition:36},0).wait(1).to({y:553.1,startPosition:37},0).wait(1).to({y:554.05,startPosition:38},0).wait(1).to({y:555,startPosition:39},0).wait(1).to({y:555.95,startPosition:40},0).wait(1).to({y:556.9,startPosition:41},0).wait(1).to({x:1493.45,y:553.25,startPosition:42},0).wait(1).to({x:1490.45,y:549.6,startPosition:43},0).wait(1).to({x:1487.45,y:545.95,startPosition:44},0).wait(1).to({x:1484.45,y:542.3,startPosition:45},0).wait(1).to({x:1481.4,y:538.65,startPosition:46},0).wait(1).to({x:1478.4,y:535,startPosition:47},0).wait(1).to({x:1475.4,y:531.35,startPosition:0},0).wait(1).to({x:1472.4,y:527.7,startPosition:1},0).wait(1).to({startPosition:2},0).to({_off:true},1).wait(358));

	// bg
	this.instance_16 = new lib.Bitmap11();
	this.instance_16.setTransform(39,267);

	this.instance_17 = new lib.小鸟bg();
	this.instance_17.setTransform(1002,252);

	this.instance_18 = new lib.背景();
	this.instance_18.setTransform(116.7,321,1.3852,1);

	this.instance_19 = new lib.元件2_1();
	this.instance_19.setTransform(1418.4,635.3,1,1,0,0,0,387.4,246.3);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#323232").s().p("Eh8mAjCQjCAAiLiLQiKiNAAjCMAAAg3HQAAjFCKiKQCLiLDCAAMBqUAAAQDDAACKCLQCLCKAADFMAAAA3HQAADCiLCNQiKCLjDAAgEASTAi6QjDAAiLiLQiKiNAAjDMAAAg3GQAAjECKiLQCLiLDDAAMBqUAAAQDCAACLCLQCKCLABDEMAAAA3GQgBDDiKCNQiLCLjCAAg");
	this.shape_62.setTransform(961.1,634.95);

	this.instance_20 = new lib.元件4("synched",2);
	this.instance_20.setTransform(489.8,614.5,1,1,0,0,0,430.8,293.5);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#323232").s().p("Eg1JAi+QjDAAiKiLQiLiNAAjDMAAAg3GQAAjECLiLQCKiLDDAAMBqTAAAQDDAACKCLQCLCLAADEMAAAA3GQAADDiLCNQiKCLjDAAg");
	this.shape_63.setTransform(1418.375,634.55);

	this.instance_21 = new lib.元件3("synched",2);
	this.instance_21.setTransform(1418.4,635.3,1,1,0,0,0,387.4,246.3);

	this.instance_22 = new lib.Bitmap10();
	this.instance_22.setTransform(110,296);

	var maskedShapeInstanceList = [this.instance_16,this.instance_17,this.instance_18,this.instance_19,this.shape_62,this.instance_20,this.shape_63,this.instance_21,this.instance_22];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_17},{t:this.instance_16}]}).to({state:[{t:this.shape_62},{t:this.instance_19},{t:this.instance_18,p:{x:116.7}}]},124).to({state:[{t:this.shape_63},{t:this.instance_20},{t:this.instance_19}]},2).to({state:[{t:this.instance_21},{t:this.instance_18,p:{x:117}}]},182).to({state:[{t:this.instance_22}]},24).wait(147));

	// 选中
	this.instance_23 = new lib.选中();
	this.instance_23.setTransform(125.1,898.05,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.instance_23, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(124).to({x:157.75},0).wait(208).to({x:189.45},0).wait(147));

	// 切换
	this.lnav1_btn = new lib.选择();
	this.lnav1_btn.name = "lnav1_btn";
	this.lnav1_btn.setTransform(126.05,895.95,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.lnav1_btn, 0, 1, 2, false, new lib.选择(), 3);

	this.lnav3_btn = new lib.选择();
	this.lnav3_btn.name = "lnav3_btn";
	this.lnav3_btn.setTransform(189.45,895.95,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.lnav3_btn, 0, 1, 2, false, new lib.选择(), 3);

	this.lnav2_btn = new lib.选择();
	this.lnav2_btn.name = "lnav2_btn";
	this.lnav2_btn.setTransform(157.75,895.95,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.lnav2_btn, 0, 1, 2, false, new lib.选择(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.lnav2_btn},{t:this.lnav3_btn},{t:this.lnav1_btn}]}).wait(479));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1034.5,654,812.4000000000001,259.29999999999995);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#F7C677",
	opacity: 0.00,
	manifest: [
		{src:"images/小鸟bg.png?1693886611588", id:"小鸟bg"},
		{src:"images/小鸟身子_.png?1693886611588", id:"小鸟身子"},
		{src:"images/椭圆1.png?1693886611588", id:"椭圆1"},
		{src:"images/_33.png?1693886611588", id:"_33"},
		{src:"images/Bitmap10.png?1693886611588", id:"Bitmap10"},
		{src:"images/Bitmap11.png?1693886611588", id:"Bitmap11"},
		{src:"images/Bitmap4.png?1693886611588", id:"Bitmap4"},
		{src:"images/Bitmap9.png?1693886611588", id:"Bitmap9"},
		{src:"images/body.png?1693886611588", id:"body"},
		{src:"images/head.png?1693886611588", id:"head"},
		{src:"images/图层1.png?1693886611588", id:"图层1"},
		{src:"images/图层2.png?1693886611588", id:"图层2"},
		{src:"images/翅膀_.png?1693886611588", id:"翅膀"},
		{src:"images/背景_.png?1693886611588", id:"背景"},
		{src:"sounds/轮船_.mp3?1693886611588", id:"轮船"},
		{src:"sounds/yx12070101牛.mp3?1693886611588", id:"yx12070101牛"},
		{src:"sounds/yx12070102小鸟.mp3?1693886611588", id:"yx12070102小鸟"},
		{src:"sounds/yx12070104汽车.mp3?1693886611588", id:"yx12070104汽车"},
		{src:"sounds/yx12070105大钟.mp3?1693886611588", id:"yx12070105大钟"},
		{src:"sounds/yx12070106闹钟.mp3?1693886611588", id:"yx12070106闹钟"}
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