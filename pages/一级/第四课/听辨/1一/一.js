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



(lib.小猫 = function() {
	this.initialize(img.小猫);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,218,319);


(lib.小猫bgpng = function() {
	this.initialize(img.小猫bgpng);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,550,567);


(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,101,95);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,108);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,101,95);


(lib.Bitmap4 = function() {
	this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,90,108);


(lib.图层0 = function() {
	this.initialize(img.图层0);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,495,365);


(lib.图层0png复制 = function() {
	this.initialize(img.图层0png复制);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,495,365);


(lib.图层1png复制2 = function() {
	this.initialize(img.图层1png复制2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,460,311);


(lib.图层2png复制2 = function() {
	this.initialize(img.图层2png复制2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,218,170);


(lib.图层3 = function() {
	this.initialize(img.图层3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,93,120);


(lib.图层5png复制 = function() {
	this.initialize(img.图层5png复制);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,85,64);


(lib.图层6png复制 = function() {
	this.initialize(img.图层6png复制);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,57,20);


(lib.羊 = function() {
	this.initialize(img.羊);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,320,343);


(lib.羊头 = function() {
	this.initialize(img.羊头);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,233,208);// helper functions:

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


(lib.补间9 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#DD6E1B").s().p("AHIiHIAAACQjeD4qxAeQJjlWEsA+g");
	this.shape.setTransform(0.3125,-5.834);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EC7A23").s().p("AnKBZIAGgDQKxgfDej3IgBACQgPAegUAfQgeAsglAkQgfAeglAYQkEC5mjADQgrg7gYgtg");
	this.shape_1.setTransform(-0.0375,0.1125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-45.9,-20.3,91.9,39.8);


(lib.补间7 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.图层2png复制2();
	this.instance.setTransform(-83.95,-65.45,1.0002,1.0002);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-83.9,-65.4,167.9,130.9);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(img.图层5png复制, null, new cjs.Matrix2D(0.774,0,0,0.774,-32.9,-24.8)).s().p("AlID4IAAnvIKRAAIAAHvg");
	this.shape.setTransform(-0.0198,0.017);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.9,-24.7,65.8,49.5);


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
	this.instance = new lib.图层6png复制();
	this.instance.setTransform(-28.5,-10);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-28.5,-10,57,20);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F7CA2C").s().p("AhYBZQgmglAAg0QAAgyAmgmQAlgmAzAAQA0AAAlAmQAmAmAAAyQAAA0gmAlQglAlg0AAQgzAAglglg");
	this.shape.setTransform(0.4768,-29.8545,1.7844,1.7844);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFDF2").s().p("AAVEtQgegfgJgoQgKARgOAPQgrAqg8AAQg7AAgsgqQgqgsAAg8IAAgGQABg3ApgpIAGgGQgkgKgdgcQgqgqgBg9IAAgGQADg3AogpQAWgXAbgKQARgHATgDIASAAQAjAAAeAPQAGgtAighQArgsA8AAQA8AAAqAsQArAsABA7IAAAGQAZgLAeAAQA7AAArAsQArAsAAA7QAAA7grArQgkAlgwAFIAEAFQArAqAAA8QAAA8grAsQgrArg8AAQg8AAgrgrgAhMgTQgKARgOAOIgHAFQAiAJAbAZIAEAFQAfAeAJAnQAJgQAOgOQAWgXAbgLQAQgGAUgDIgFgEQgqgrAAg7IAAgGQgaAKgdAAQgiAAgegPQgDAagNAUg");
	this.shape_1.setTransform(-0.0159,-33.3496,1.7846,1.7846);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#286B59").ss(8,0,0,4).p("AApodQg4E4gRFSQgBAMAAAMQgKDLAFDU");
	this.shape_2.setTransform(-4.3651,39.8599);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#286B59").s().p("AhOEEIgFACQAAgNAFALgAipATQhTgGhRgdQhXgggkgsQgqgxAsgzQBOhaCqCGQA2ArBSB2QgYAIglAAQgSAAgUgCgAhBgZIABgZIgBAZIgNgHIAOgSQAwg8BJg2QCqh/CwAnQBjAWghA0QgdAthxAxQhwAwhxARQgvAHgmAAQgyAAgggNg");
	this.shape_3.setTransform(-1.1896,55.803);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.5,-94.6,125.1,193.3);


(lib.元件13 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#524941").s().p("AgWAFQgKgCAAgDQAAgCAKgCQAKgCAMAAQAOAAAJACQAKACAAACQAAADgKACQgJACgOAAQgMAAgKgCg");
	this.shape.setTransform(3.3,0.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件13, new cjs.Rectangle(0,0,6.6,1.5), null);


(lib.元件12 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.小猫();
	this.instance.setTransform(0,0,1,1.0613);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件12, new cjs.Rectangle(0,0,218,338.6), null);


(lib.元件8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(255,255,234,0.8)").s().p("AhJEtQingNBnknQAziVBUiSQDSEVgkCyQgQBPhBAmQg1AhhOAAIghgCg");
	this.shape.setTransform(218.1227,125.1181);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,234,0.8)").s().p("AhGEuQimgLBgkoQAxiVBRiTQDXEQghCyQgOBPhAAnQg4AjhSAAIgaAAg");
	this.shape_1.setTransform(218.9921,125.0887);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,234,0.8)").s().p("AhCEuQingHBbkpQAtiXBOiUQDcELgdCzQgNBPg/ApQg5AlhYAAIgRAAg");
	this.shape_2.setTransform(219.8943,125.0428);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(255,255,234,0.8)").s().p("Ag/EuQimgEBUkqQAqiXBLiWQDhEGgZCzQgLBPg/AqQg6ApheAAIgJAAg");
	this.shape_3.setTransform(220.7633,125.0295);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(255,255,234,0.8)").s().p("AiTABQAniXBHiXQDmECgVCzQgKBPg9ArQg9AshjAAQinAABPktg");
	this.shape_4.setTransform(221.6339,125.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(255,255,234,0.8)").s().p("AiWADQAkiYBEiYQDrD9gRCzQgIBPg9AtQg7AshkACIgEABQihAABHkrg");
	this.shape_5.setTransform(222.5213,125.002);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(255,255,234,0.8)").s().p("AiYAFQAgiYBCiaQDwD4gOCzQgHBQg8AtQg6AuhjAEIgIABQidAABBkpg");
	this.shape_6.setTransform(223.3996,125.0079);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(255,255,234,0.8)").s().p("AibAGQAeiYA+ibQD0DzgKC0QgEBPg7AvQg6AvhjAGIgKABQiaAAA6kog");
	this.shape_7.setTransform(224.2579,125.0159);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(255,255,234,0.8)").s().p("AidAIQAaiZA8icQD5DugHC0QgDBPg5AwQg5AxhjAIIgOABQiWAAA0kmg");
	this.shape_8.setTransform(225.1298,125.0285);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(255,255,234,0.8)").s().p("AigAKQAXiZA5ieQD+DpgDC0QgBBQg5AxQg4AyhjAKIgRABQiSAAAtkkg");
	this.shape_9.setTransform(226.0052,125.0195);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(255,255,234,0.8)").s().p("AiiAMQAUiaA1ifQEDDkABC1QAABPg3AzQg3AzhjAMIgUABQiPAAAnkig");
	this.shape_10.setTransform(226.859,125.0388);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(255,255,234,0.8)").s().p("AikAOQARibAyigQEIDfAFC1QACBPg3A0Qg2A0hjAOQgMACgLAAQiMAAAhkgg");
	this.shape_11.setTransform(227.6973,125.0578);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(255,255,234,0.8)").s().p("AinAQQAOicAvihQENDaAJC1QADBQg2A1Qg1A1hjAQQgNACgMAAQiJAAAakeg");
	this.shape_12.setTransform(228.5662,125.0615);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(255,255,234,0.8)").s().p("AipASQALidAsiiQESDVAMC1QAFBQg1A2Qg0A3hjASQgOACgOAAQiGAAAUkcg");
	this.shape_13.setTransform(229.3862,125.0856);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(255,255,234,0.8)").s().p("AimAQQAOicAvihQENDaAIC1QADBQg2A1Qg1A1hjAQQgNACgMAAQiKAAAckeg");
	this.shape_14.setTransform(228.4869,125.0578);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(255,255,234,0.8)").s().p("AikANQARibAzifQEHDfAEC1QACBQg3A0Qg2AzhjAOQgLACgLAAQiNAAAikhg");
	this.shape_15.setTransform(227.5546,125.0544);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(255,255,234,0.8)").s().p("AiiAMQAViaA2ifQECDlAAC1QAABQg4AyQg3AyhjAMIgTABQiQAAAokig");
	this.shape_16.setTransform(226.6566,125.033);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(255,255,234,0.8)").s().p("AifAKQAYiaA6idQD8DrgEC0QgCBPg5AxQg4AyhjAJIgQABQiTAAAvkkg");
	this.shape_17.setTransform(225.7083,125.0146);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(255,255,234,0.8)").s().p("AidAIQAciZA9icQD3DwgIC0QgDBPg6AwQg6AwhjAHIgMABQiXAAA1kmg");
	this.shape_18.setTransform(224.7546,125.0227);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(255,255,234,0.8)").s().p("AiaAGQAgiZBAiaQDyD1gMC0QgGBPg7AvQg6AuhkAFIgJABQibAAA9kog");
	this.shape_19.setTransform(223.8466,125.0116);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(255,255,234,0.8)").s().p("AiXADQAjiXBDiZQDsD7gQCzQgHBPg8AtQg7AuhjACIgGABQifAABEkrg");
	this.shape_20.setTransform(222.8999,125.0041);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(255,255,234,0.8)").s().p("AiUABQAmiXBGiXQDoEAgUCzQgJBPg9AsQg9AshjABIgBAAQilAABMktg");
	this.shape_21.setTransform(221.9358,125.0252);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(255,255,234,0.8)").s().p("Ag+EuQimgDBTkrQApiXBKiWQDiEFgYCzQgLBPg+AqQg7AqhfAAIgHAAg");
	this.shape_22.setTransform(220.9842,125.0275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(255,255,234,0.8)").s().p("AhCEuQimgGBZkqQAtiWBNiVQDdELgcCyQgMBPg/ApQg5AmhZAAIgRAAg");
	this.shape_23.setTransform(220.0423,125.0424);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(255,255,234,0.8)").s().p("AhGEuQimgKBgkpQAwiVBRiTQDXEPggCzQgOBOhAAoQg4AjhUAAIgYAAg");
	this.shape_24.setTransform(219.0756,125.0832);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape}]},1).wait(1));

	// 图层_6
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(255,255,234,0.8)").s().p("AiIAWQiEkdCxgfQBqgTBJAgQBIAhAXBNQAzCtjNEsQhkiKhBiOg");
	this.shape_25.setTransform(214.7172,64.7711);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(255,255,234,0.8)").s().p("AiMARQh6kfCxgZQBqgPBHAiQBGAiAVBOQAtCtjVEjQhfiLg8iQg");
	this.shape_26.setTransform(216.1277,64.9073);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(255,255,234,0.8)").s().p("AiQANQhwkiCxgSQBpgMBGAkQBFAkASBOQAnCujeEaQhZiOg3iQg");
	this.shape_27.setTransform(217.5281,65.025);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(255,255,234,0.8)").s().p("AiUAIQhmkjCwgNQBqgIBEAmQBDAmAQBPQAhCujlESQhViRgyiSg");
	this.shape_28.setTransform(218.9451,65.1304);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(255,255,234,0.8)").s().p("AiZAFQhckmCxgHQBpgFBDAoQBBApANBOQAcCvjtEJQhRiSgtiTg");
	this.shape_29.setTransform(220.3554,65.1975);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(255,255,234,0.8)").s().p("AidABQhSkoCwgBQBqgCBBArQBAArAKBOQAWCvj2EBQhLiVgoiUg");
	this.shape_30.setTransform(221.7504,65.2474);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(255,255,234,0.8)").s().p("AihgCQhIkrCwAFQBpACBAAsQA+AtAIBPQAQCwj+D3QhGiXgjiUg");
	this.shape_31.setTransform(223.1625,65.2709);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(255,255,234,0.8)").s().p("AilgFQg+kuCwALQBpAGA+AvQA9AuAFBPQAJCwkFDwQhBiageiVg");
	this.shape_32.setTransform(224.5591,65.2823);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("rgba(255,255,234,0.8)").s().p("AipgIQg0kwCvAQQBpAKA9AxQA8AwACBQQADCwkNDnQg8icgZiWg");
	this.shape_33.setTransform(225.958,65.2825);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("rgba(255,255,234,0.8)").s().p("AitgMQgqkyCvAXQBpANA7AzQA7AygBBQQgCCxkWDeQg2iegViYg");
	this.shape_34.setTransform(227.3194,65.2729);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("rgba(255,255,234,0.8)").s().p("AixgPQgfk0CvAcQBpAQA5A2QA5A1gEBPQgICykdDVQgyiggQiZg");
	this.shape_35.setTransform(228.6699,65.2545);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("rgba(255,255,234,0.8)").s().p("Ai0gSQgWk2CvAiQBpAUA3A3QA4A3gGBQQgOCykmDNQgtijgKiag");
	this.shape_36.setTransform(230.0114,65.2322);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("rgba(255,255,234,0.8)").s().p("Ai3gUQgMk5CvAoQBoAXA2A6QA2A5gJBQQgTCykuDEQgoilgFiag");
	this.shape_37.setTransform(231.3037,65.1984);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("rgba(255,255,234,0.8)").s().p("Ai6gYQgBk7CuAuQBoAbA1A8QA0A7gLBQQgaCzk2C7QgiingBicg");
	this.shape_38.setTransform(232.5777,65.1569);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("rgba(255,255,234,0.8)").s().p("Ai3gVQgMk4CuAnQBpAYA2A5QA2A5gJBQQgTCyktDFQgoilgGibg");
	this.shape_39.setTransform(231.2159,65.2034);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(255,255,234,0.8)").s().p("AizgRQgYk2CvAhQBpATA4A3QA3A3gFBQQgNCxkkDOQguiigLiZg");
	this.shape_40.setTransform(229.7857,65.2163);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("rgba(255,255,234,0.8)").s().p("AivgOQgjk0CvAbQBpAQA6A0QA5A1gDBPQgGCxkcDYQgziggQiYg");
	this.shape_41.setTransform(228.3484,65.266);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("rgba(255,255,234,0.8)").s().p("AisgLQgtkxCvAVQBpALA8AzQA7AyAABPQAACxkTDhQg5idgWiYg");
	this.shape_42.setTransform(226.8648,65.2854);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("rgba(255,255,234,0.8)").s().p("AiogHQg3kvCvAOQBpAIA9AwQA9AwADBPQAGCwkKDrQg+ibgciWg");
	this.shape_43.setTransform(225.366,65.294);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("rgba(255,255,234,0.8)").s().p("AijgDQhDktCwAIQBpAEA/AuQA+AtAGBPQANCwkCD0QhDiZghiUg");
	this.shape_44.setTransform(223.8674,65.2909);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("rgba(255,255,234,0.8)").s().p("AieAAQhOkqCwABQBpABBBArQA/AsAJBPQATCvj4D9QhJiWgmiUg");
	this.shape_45.setTransform(222.3446,65.2496);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("rgba(255,255,234,0.8)").s().p("AiaADQhZknCxgFQBpgDBCApQBBApAMBPQAaCvjwEGQhOiUgsiTg");
	this.shape_46.setTransform(220.8194,65.2112);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("rgba(255,255,234,0.8)").s().p("AiWAHQhjkkCwgLQBqgIBEAnQBDAnAOBOQAgCvjnEPQhUiRgxiSg");
	this.shape_47.setTransform(219.3004,65.1639);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("rgba(255,255,234,0.8)").s().p("AiRAMQhukiCwgSQBqgLBGAkQBEAlASBOQAmCujeEZQhaiOg2iRg");
	this.shape_48.setTransform(217.7712,65.0622);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("rgba(255,255,234,0.8)").s().p("AiNARQh5kgCygYQBpgPBIAiQBGAjAUBOQAtCtjWEiQheiMg9iPg");
	this.shape_49.setTransform(216.2306,64.9098);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_25}]}).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_25}]},1).wait(1));

	// 图层_7
	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("rgba(255,255,234,0.8)").s().p("AiNAtQg2iTgaimQFRBTBUCiQAmBGgbBHQgaBGhTA6QghAXggAAQhiAAhQjgg");
	this.shape_50.setTransform(239.3236,121.2714);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("rgba(255,255,234,0.8)").s().p("AiGAvQg7iQggijQFRBFBZCdQAoBEgXBHQgXBHhQA8QgjAZghAAQhfAAhWjWg");
	this.shape_51.setTransform(239.7348,120.5413);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("rgba(255,255,234,0.8)").s().p("Ah/AwQhAiMgnigQFRA2BfCZQAqBBgUBIQgUBHhNA/QgjAbgiAAQhdAAhcjNg");
	this.shape_52.setTransform(240.1112,119.7814);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("rgba(255,255,234,0.8)").s().p("Ah4AxQhFiIgtieQFRApBkCTQAtBAgSBIQgRBHhKBBQgjAfgkAAQhaAAhijFg");
	this.shape_53.setTransform(240.545,119.0646);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("rgba(255,255,234,0.8)").s().p("AhxAyQhKiEgzibQFQAbBpCOQAvA+gOBIQgOBHhHBEQgjAhgmAAQhYAAhni8g");
	this.shape_54.setTransform(240.9709,118.3071);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("rgba(255,255,234,0.8)").s().p("AhrAzQhPiBg5iYQFQANBvCJQAxA9gLBHQgLBIhEBGQgjAlgnAAQhYAAhsi0g");
	this.shape_55.setTransform(241.4084,117.6024);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("rgba(255,255,234,0.8)").s().p("AhkA0QhUh9hAiVQFQgBB0CEQA0A6gJBIQgIBIhABJQgjAngpAAQhXAAhwirg");
	this.shape_56.setTransform(241.8602,116.882);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("rgba(255,255,234,0.8)").s().p("AheA2Qhah6hFiSQFQgPB5B/QA2A4gFBJQgFBIg+BLQgjArgrAAQhVAAh1ijg");
	this.shape_57.setTransform(242.3502,116.1044);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("rgba(255,255,234,0.8)").s().p("AhYA5Qheh3hLiPQFPgdB+B6QA5A2gDBJQgCBJg6BOQgjAtgtAAQhVAAh5iag");
	this.shape_58.setTransform(242.8303,115.2087);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("rgba(255,255,234,0.8)").s().p("AhSA8QhjhyhSiNQFPgrCEB2QA7A0ABBJQABBIg4BRQgiAxgwAAQhUAAh9iTg");
	this.shape_59.setTransform(243.3259,114.227);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("rgba(255,255,234,0.8)").s().p("AhLBBQhphvhYiKQFPg4CJBwQA9AyAEBKQAEBIg1BTQghA1g0AAQhSAAiAiLg");
	this.shape_60.setTransform(243.8392,113.1477);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("rgba(255,255,234,0.8)").s().p("AhGBGQhuhrhdiHQFOhHCOBrQBAAwAHBLQAHBIgyBWQghA4g2AAQhTAAiDiDg");
	this.shape_61.setTransform(244.3934,112.0361);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("rgba(255,255,234,0.8)").s().p("AhABMQhzhohkiEQFOhVCUBnQBCAtAJBLQAKBJguBYQggA9g6AAQhSAAiGh8g");
	this.shape_62.setTransform(244.9135,110.8381);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("rgba(255,255,234,0.8)").s().p("Ag7BSQh4hkhqiCQFOhiCZBhQBFAsAMBLQANBJgrBbQggBAg9AAQhTAAiIh0g");
	this.shape_63.setTransform(245.4996,109.6327);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("rgba(255,255,234,0.8)").s().p("AhBBLQhyhohkiFQFOhTCUBnQBCAuAJBKQAKBJgvBYQggA9g5AAQhTAAiGh9g");
	this.shape_64.setTransform(244.8806,110.9569);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("rgba(255,255,234,0.8)").s().p("AhHBFQhthshciHQFOhFCOBtQA/AwAGBKQAGBIgyBWQghA4g2AAQhSAAiDiFg");
	this.shape_65.setTransform(244.2874,112.2212);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("rgba(255,255,234,0.8)").s().p("AhNBAQhohwhWiLQFPg1CIByQA9AyACBKQAEBIg2BTQghA0gzAAQhTAAh/iNg");
	this.shape_66.setTransform(243.7108,113.4285);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("rgba(255,255,234,0.8)").s().p("AhUA7QhihzhPiOQFPgmCCB3QA6A1AABIQAABJg5BQQgiAvgvAAQhUAAh8iVg");
	this.shape_67.setTransform(243.1502,114.5496);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("rgba(255,255,234,0.8)").s().p("AhaA4Qhdh4hIiRQFPgXB8B9QA4A3gEBIQgDBIg8BNQgjAsgtAAQhUAAh3idg");
	this.shape_68.setTransform(242.6354,115.5877);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("rgba(255,255,234,0.8)").s().p("AhhA1QhXh8hCiTQFPgIB3CBQA1A6gHBIQgGBIhABKQgiApgrAAQhVAAhzing");
	this.shape_69.setTransform(242.1158,116.5325);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("rgba(255,255,234,0.8)").s().p("AhoAzQhRh/g8iXQFQAHBxCHQAzA8gLBIQgJBIhDBHQgjAmgoAAQhXAAhuixg");
	this.shape_70.setTransform(241.5904,117.3065);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("rgba(255,255,234,0.8)").s().p("AhvAzQhMiEg1iaQFQAXBrCMQAwA+gNBIQgNBHhGBFQgjAigmAAQhYAAhpi5g");
	this.shape_71.setTransform(241.1232,118.079);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("rgba(255,255,234,0.8)").s().p("Ah2AxQhGiHgvidQFRAlBlCSQAtA/gQBJQgRBHhJBCQgjAfgkAAQhaAAhjjDg");
	this.shape_72.setTransform(240.6463,118.8719);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("rgba(255,255,234,0.8)").s().p("Ah+AwQhAiLgoigQFRA0BfCXQArBCgUBIQgTBHhNA/QgiAcgjAAQhcAAhejMg");
	this.shape_73.setTransform(240.1925,119.6583);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("rgba(255,255,234,0.8)").s().p("AiGAvQg7iPghijQFRBDBaCdQAoBDgXBIQgXBGhQA9QgiAZghAAQhfAAhXjVg");
	this.shape_74.setTransform(239.7598,120.4696);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_50}]}).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_50}]},1).wait(1));

	// 图层_8
	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("rgba(255,255,234,0.8)").s().p("AiXgvQBskoCTBoQBZA/AcBKQAcBJgmBHQhXCflkBCQAaioA3iSg");
	this.shape_75.setTransform(240.3395,67.8963);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("rgba(255,255,234,0.8)").s().p("AiQgxQB3kgCNBsQBWBCAZBKQAZBKgpBEQhcCbljAzQAgilA8iPg");
	this.shape_76.setTransform(240.7021,68.6673);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("rgba(255,255,234,0.8)").s().p("AiIgyQCBkZCIBxQBSBEAWBLQAWBKgrBCQhhCVliAmQAmijBBiLg");
	this.shape_77.setTransform(241.0833,69.4296);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("rgba(255,255,234,0.8)").s().p("AiAgzQCKkSCDB2QBPBGATBLQASBKgtBBQhmCQlhAXQAsigBHiHg");
	this.shape_78.setTransform(241.4945,70.199);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("rgba(255,255,234,0.8)").s().p("Ah5g1QCUkKB+B6QBLBKAQBLQAQBKgwA/QhsCLlfAIQAyidBMiEg");
	this.shape_79.setTransform(241.9142,70.9212);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("rgba(255,255,234,0.8)").s().p("Aj7DlQA4iaBRiBQCfkDB4B/QBIBMANBMQAMBKgyA8QhsCBlGAAIgdAAg");
	this.shape_80.setTransform(242.325,71.6763);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("rgba(255,255,234,0.8)").s().p("AkADcQA/iXBWh9QCpj8ByCDQBFBQAKBLQAJBLg0A6QhmBwkSAAQgsAAgwgDg");
	this.shape_81.setTransform(242.7659,72.5356);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("rgba(255,255,234,0.8)").s().p("AkEDSQBFiVBbh5QCzj1BtCJQBBBRAHBNQAGBLg2A4QhgBhjpAAQhCAAhNgIg");
	this.shape_82.setTransform(243.2298,73.5055);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("rgba(255,255,234,0.8)").s().p("AkJDIQBLiTBgh1QC+juBnCNQA+BVAEBMQADBMg5A2QhbBUjHAAQhTAAhngOg");
	this.shape_83.setTransform(243.7053,74.5619);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("rgba(255,255,234,0.8)").s().p("AkNC9QBRiQBlhyQDIjnBiCSQA7BYAABLQAABNg7A0QhWBJiuAAQhgAAh8gWg");
	this.shape_84.setTransform(244.175,75.6806);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("rgba(255,255,234,0.8)").s().p("AkSCwQBXiMBrhvQDSjfBcCWQA3BbgCBMQgDBNg+AxQhRBAiWAAQhtAAiQghg");
	this.shape_85.setTransform(244.6785,76.8608);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("rgba(255,255,234,0.8)").s().p("AkXCkQBdiKBwhrQDcjYBXCbQA0BdgGBMQgGBOhAAvQhMA4iFAAQh1AAiigsg");
	this.shape_86.setTransform(245.2013,78.1146);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("rgba(255,255,234,0.8)").s().p("AkcCXQBjiHB1hnQDnjRBRCgQAwBfgIBNQgKBOhCAtQhIAwh1AAQh9AAiyg4g");
	this.shape_87.setTransform(245.7321,79.3783);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("rgba(255,255,234,0.8)").s().p("AkiCKQBqiFB6hjQDxjKBMCkQAtBjgMBNQgNBOhEArQhEAphnAAQiFAAjBhEg");
	this.shape_88.setTransform(246.267,80.7005);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("rgba(255,255,234,0.8)").s().p("AkcCYQBjiHB1hoQDmjRBRCfQAxBggIBMQgKBOhCAtQhIAxh2AAQh9AAixg3g");
	this.shape_89.setTransform(245.6816,79.28);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("rgba(255,255,234,0.8)").s().p("AkWCmQBdiKBuhrQDbjaBYCaQA0BdgFBMQgGBOhAAvQhNA5iHAAQh0AAifgqg");
	this.shape_90.setTransform(245.0929,77.8974);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("rgba(255,255,234,0.8)").s().p("AkRC0QBWiOBphvQDQjhBdCVQA4BZgBBMQgDBNg9AyQhSBDicAAQhqAAiLgeg");
	this.shape_91.setTransform(244.552,76.578);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("rgba(255,255,234,0.8)").s().p("AkMDAQBPiQBkhzQDFjqBjCRQA8BWACBMQAABMg6A1QhYBNi1AAQhdAAh1gUg");
	this.shape_92.setTransform(244.0252,75.3048);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("rgba(255,255,234,0.8)").s().p("AkHDMQBJiTBeh3QC5jxBqCLQA/BUAFBMQAEBLg4A3QhdBajVAAQhMAAhcgMg");
	this.shape_93.setTransform(243.5133,74.1145);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("rgba(255,255,234,0.8)").s().p("AkCDXQBCiWBYh7QCvj5BvCHQBDBQAJBMQAHBLg1A5QhjBoj8AAQg3AAhAgFg");
	this.shape_94.setTransform(243.0211,73.0193);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("rgba(255,255,234,0.8)").s().p("Aj9DhQA7iZBTh/QCjkAB2CBQBHBNALBMQALBKgzA8QhpB5kvAAIg5gBg");
	this.shape_95.setTransform(242.4976,72.0166);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("rgba(255,255,234,0.8)").s().p("Ah3g1QCYkIB8B8QBKBKAPBMQAPBKgxA+QhtCJlfAEQA0icBNiDg");
	this.shape_96.setTransform(242.0419,71.1686);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("rgba(255,255,234,0.8)").s().p("Ah/g0QCNkQCBB3QBOBIATBLQASBJguBBQhoCPlgATQAtifBIiHg");
	this.shape_97.setTransform(241.6031,70.3891);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("rgba(255,255,234,0.8)").s().p("AiHgzQCDkYCGBzQBSBEAWBLQAVBJgrBDQhiCUliAjQAniiBCiLg");
	this.shape_98.setTransform(241.1806,69.5634);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("rgba(255,255,234,0.8)").s().p("AiPgxQB4kgCMBtQBWBCAZBKQAYBKgpBEQhcCaljAzQAhilA8iPg");
	this.shape_99.setTransform(240.7332,68.7287);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_75}]}).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_75}]},1).wait(1));

	// 图层_2
	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#3C291D").ss(3,0,0,4).p("ABLkcQAAAYgQAQQgCACgCACQgMAKgQACQgEABgEAAQgXAAgQgRQgRgQAAgYQAAgXARgRQAQgQAXAAQAXAAARAQQAQARAAAXgAAmEdQAAAXgQARQgRAQgWAAQgYAAgQgQQgRgRAAgXQAAgYARgQQAQgRAYAAQAPAAALAHQAHAEAGAGQAFAFADAFQAIANAAARg");
	this.shape_100.setTransform(151.7,91.925);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#3C291D").s().p("AC2FTIAApqQArgDAtgBIAAJyQgtgBgrgDgAoXFDQgRgRAAgXQAAgYARgQQAQgRAYAAQAPAAANAHQA4hSBQgSQgjgwAAg3QAAgzAfguIAQgVQhOg4g0hWQAPgCAMgKQAxBPBIAzIADACQAwgsBQglQBFghBQgVIAAImQhQgVhFggQhdgsgxg0QhQAVg2BMQgEgFgFgFQgGgGgGgEQAGAEAGAGQAFAFAEAFQAHANABARQAAAXgRARQgQAQgYAAQgYAAgQgQgAHRkSQAtAFAqAIIAAJGQgqAJgtAFgAnyj2QgRgQAAgYQAAgXARgRQAQgQAYAAQAXAAARAQQARARAAAXQAAAYgRAQIgEAEQgMAKgPACIgJABQgYAAgQgRg");
	this.shape_101.setTransform(199.45,92.1375);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#F4D23D").s().p("AjLE6IAApzIAgAAQBVAABPAJIAAJhQhPAJhVAAIggAAgAnuEUIAAonQBegZBtgIIAAJqQhtgJhegZgABPkjQB5AXBjAvQDFBcAACBQAACDjFBbQhjAvh5AXg");
	this.shape_102.setTransform(246.8,95.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_102},{t:this.shape_101},{t:this.shape_100}]}).wait(26));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(142.7,34.6,153.7,120.80000000000001);


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
	this.instance = new lib.图层3();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件7, new cjs.Rectangle(0,0,93,120), null);


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

	// 图层_1
	this.instance = new lib.Bitmap1();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件6, new cjs.Rectangle(0,0,101,95), null);


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
	this.instance = new lib.Bitmap2();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件5, new cjs.Rectangle(0,0,90,108), null);


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
	this.instance.setTransform(0,0,1.0008,1.0008);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件4, new cjs.Rectangle(0,0,174.9,156.2), null);


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

	// 图层_6_png_复制
	this.instance = new lib.补间3("synched",0);
	this.instance.setTransform(76,71,1,1,0,0,0,28.5,-10);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:30.4,regY:-9.3,rotation:-5.2987,x:87.05,y:63.2},9).to({regX:28.5,regY:-10,rotation:0,x:76,y:71},15).wait(1));

	// 图层_3
	this.instance_1 = new lib.补间5("synched",0);
	this.instance_1.setTransform(33,54.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({rotation:9.6999,x:45.35,y:42.95},9).to({rotation:0,x:33,y:54.8},15).wait(1));

	// 图层_2_png_复制_2
	this.instance_2 = new lib.补间7("synched",0);
	this.instance_2.setTransform(133.95,65.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({rotation:9.6999,x:143.1,y:70.45},9).to({rotation:0,x:133.95,y:65.45},15).wait(1));

	// 图层_1_png_复制_2
	this.instance_3 = new lib.图层1png复制2();
	this.instance_3.setTransform(38,43,0.998,0.998);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(25));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0.1,-8.2,386.79999999999995,287.09999999999997);


(lib.元件10 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(62.55,189.35,1,1,0,0,0,0,94.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleY:1.0069,skewX:-6.7166},12).to({scaleY:1,skewX:0},11).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.1,-0.3,142.2,194);


(lib.元件9 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.元件8();
	this.instance.setTransform(-33.7,74.9,1,1,0,0,0,110.5,109.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:-81.05,y:96.55},7).to({x:-82.55,y:74.9},7).to({x:-113.95,y:110.55},9).wait(1).to({x:-82.55,y:74.9},9).to({x:-81.05,y:96.55},7).to({x:-33.7,y:74.9},7).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-81.7,0,233.89999999999998,156.5);


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

	// 图层_3_png
	this.instance = new lib.元件7();
	this.instance.setTransform(56.6,153.5,1,1,0,0,0,56.6,111.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:14.9992},7).to({rotation:0},7).wait(1));

	// 图层_2_png
	this.instance_1 = new lib.元件6();
	this.instance_1.setTransform(187.5,95,1,1,0,0,0,50.5,95);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({rotation:14.9992,y:95.05},7).to({rotation:0,y:95},7).wait(1));

	// 图层_1_png
	this.instance_2 = new lib.元件5();
	this.instance_2.setTransform(376,203,1,1,0,0,0,45,108);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:45.1,rotation:14.9992,x:376.05},7).to({regX:45,rotation:0,x:376},7).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.6,-9.7,448,224.39999999999998);


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

	// 图层_2
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3F4A4C").s().p("AgXAWQgKgJAAgNQAAgMAKgJQAKgJAOAAQAXAAAJASIgMAMIANALQgEAJgJAGQgJAFgLAAQgOAAgKgJg");
	this.shape_5.setTransform(207.7629,51.9701,3.5903,3.5903);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(10));

	// 图层_3
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgjAgQgPgNAAgTQAAgSAPgNQAPgOAUAAQAUAAAQAOQAOANAAASQAAATgOANQgQAOgUAAQgUAAgPgOg");
	this.shape_6.setTransform(208.1219,51.9701,3.5903,3.5903);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(10));

	// 图层_5
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EC7A23").s().p("AnoDiQgWhbBXhYQCfihAQi+QD1DiFFhsQBRgaAtAVQAyAXgFBRQgFA2gZA2QjmC8qwBgQgbgwgGgfg");
	this.shape_7.setTransform(281.613,70.175);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(10));

	// 图层_4
	this.instance = new lib.补间9("synched",0);
	this.instance.setTransform(239.2,91.65,1,1,0,0,0,-42.8,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:-42.5,scaleX:0.9023,rotation:36.4656,x:239.4},5).to({regX:-42.8,scaleX:1,rotation:0,x:239.2},4).wait(1));

	// 图层_6
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F2D321").s().p("AhEBNQhWgsgaiBQAtAvA/AIQAxAGBHgRQA4gNAkANQAgALAHAbQAHAZgUAbQgWAdgqAOQguAQgoAAQgtAAgngUg");
	this.shape_8.setTransform(117.9318,202.7545,3.5903,3.5903);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(10));

	// 图层_7
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F2C31D").s().p("AiPCCQg8g2ABhMQgBhLA8g2QA7g2BUAAQBUAAA8A2QA7A2ABBLQgBBMg7A2Qg8A2hUAAQhUAAg7g2g");
	this.shape_9.setTransform(189.8112,65.8826,3.5903,3.5903);

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(10));

	// 图层_8
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E9A116").s().p("AgoAlQg1gUglgnIgHgJIgBAAIgGgHIBygMIB0AYIA2gCIgJASQgGAVAUAUQg2AUgyAAQgpAAgogOg");
	this.shape_10.setTransform(188.8239,125.1009,3.5903,3.5903);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(10));

	// 图层_9
	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E9A116").s().p("AjEDQQhmhbgxhzQgzh6Aah1QAJByA5B7QArBJAsAnQA6AyBKAEQCHAKCngQQArgCAugpQATgRA7hBQgVBThPBZQgbAfjQAAQjQAAgjgeg");
	this.shape_11.setTransform(137.1225,206.1748,3.5903,3.5903);

	this.timeline.addTween(cjs.Tween.get(this.shape_11).wait(10));

	// 图层_10
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F2C31D").s().p("AjHDsQhrhegwh4QgziAAih4QAJghAGgEQAKgIAWAXQBdBmBzAYQBrAWAhg5QAFgIgBgPQgDgcgdgcIBxgMIB1AYIA3gCIgLAVQgEAaAfAWQBmBTgQBwQgNBehbBnQgcAfjQAAQjPAAgjgeg");
	this.shape_12.setTransform(138.3922,196.1162,3.5903,3.5903);

	this.timeline.addTween(cjs.Tween.get(this.shape_12).wait(10));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,331,291.7);


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

	// 图层_2
	this.instance = new lib.元件13();
	this.instance.setTransform(42.2,285.5,0.5,1,0,0,0,3.3,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regY:0.7,scaleX:0.5458,scaleY:1.3643,x:42.15,y:286.3},0).wait(1).to({scaleX:0.5917,scaleY:1.7286,y:286.4},0).wait(1).to({scaleX:0.6375,scaleY:2.093,y:286.5},0).wait(1).to({scaleX:0.6834,scaleY:2.4573,y:286.65},0).wait(1).to({scaleX:0.7292,scaleY:2.8216,y:286.8},0).wait(1).to({scaleX:0.775,scaleY:3.1859,y:286.9},0).wait(1).to({scaleX:0.8209,scaleY:3.5502,y:287.05},0).wait(1).to({scaleX:0.8667,scaleY:3.9145,y:287.15},0).wait(1).to({scaleX:0.9126,scaleY:4.2789,y:287.25},0).wait(1).to({scaleX:0.9584,scaleY:4.6432,y:287.4},0).wait(1).to({scaleX:1.0043,scaleY:5.0075,y:287.5},0).wait(1).to({scaleX:1.0501,scaleY:5.3718,y:287.6},0).wait(1).to({scaleX:1.0959,scaleY:5.7361,y:287.7},0).wait(1).to({scaleX:1.1418,scaleY:6.1004,y:287.85},0).wait(1).to({scaleX:1.1876,scaleY:6.4648,y:288},0).wait(1).to({scaleX:1.2335,scaleY:6.8291,y:288.1},0).wait(1).to({scaleX:1.2793,scaleY:7.1934,y:288.25},0).wait(1).to({scaleX:1.3251,scaleY:7.5577,y:288.35},0).wait(1).to({scaleX:1.371,scaleY:7.922,y:288.45},0).wait(1).to({scaleX:1.4168,scaleY:8.2863,x:42.2,y:288.6},0).wait(1).to({scaleX:1.4627,scaleY:8.6507,y:288.7},0).wait(1).to({scaleX:1.5085,scaleY:9.015,y:288.8},0).wait(1).to({scaleX:1.5543,scaleY:9.3793,y:288.95},0).wait(1).to({scaleX:1.4665,scaleY:8.681,y:288.75},0).wait(1).to({scaleX:1.3786,scaleY:7.9828,y:288.5},0).wait(1).to({scaleX:1.2908,scaleY:7.2845,x:42.15,y:288.25},0).wait(1).to({scaleX:1.2029,scaleY:6.5862,y:288},0).wait(1).to({scaleX:1.115,scaleY:5.8879,x:42.2,y:287.75},0).wait(1).to({scaleX:1.0272,scaleY:5.1897,y:287.6},0).wait(1).to({scaleX:0.9393,scaleY:4.4914,y:287.35},0).wait(1).to({scaleX:0.8515,scaleY:3.7931,x:42.15,y:287.1},0).wait(1).to({scaleX:0.7636,scaleY:3.0948,y:286.85},0).wait(1).to({scaleX:0.6757,scaleY:2.3966,x:42.2,y:286.65},0).wait(1).to({scaleX:0.5879,scaleY:1.6983,y:286.4},0).wait(1).to({scaleX:0.5,scaleY:1,y:286.2},0).wait(1));

	// 图层_1
	this.instance_1 = new lib.元件12();
	this.instance_1.setTransform(109,338.6,1,1,0,0,0,109,338.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regY:169.3,scaleY:1.0032,y:168.8},0).wait(1).to({scaleY:1.0064,y:168.25},0).wait(1).to({scaleY:1.0096,y:167.7},0).wait(1).to({scaleY:1.0128,y:167.15},0).wait(1).to({scaleY:1.016,y:166.6},0).wait(1).to({scaleY:1.0192,y:166.05},0).wait(1).to({scaleY:1.0224,y:165.55},0).wait(1).to({scaleY:1.0256,y:165},0).wait(1).to({scaleY:1.0288,y:164.45},0).wait(1).to({scaleY:1.032,y:163.9},0).wait(1).to({scaleY:1.0352,y:163.35},0).wait(1).to({scaleY:1.0385,y:162.8},0).wait(1).to({scaleY:1.0417,y:162.25},0).wait(1).to({scaleY:1.0449,y:161.75},0).wait(1).to({scaleY:1.0481,y:161.2},0).wait(1).to({scaleY:1.0513,y:160.65},0).wait(1).to({scaleY:1.0545,y:160.1},0).wait(1).to({scaleY:1.0577,y:159.55},0).wait(1).to({scaleY:1.0609,y:159},0).wait(1).to({scaleY:1.0641,y:158.5},0).wait(1).to({scaleY:1.0673,y:157.95},0).wait(1).to({scaleY:1.0705,y:157.4},0).wait(1).to({scaleY:1.0737,y:156.85},0).wait(1).to({scaleY:1.0676,y:157.9},0).wait(1).to({scaleY:1.0614,y:158.95},0).wait(1).to({scaleY:1.0553,y:159.95},0).wait(1).to({scaleY:1.0491,y:161},0).wait(1).to({scaleY:1.043,y:162.05},0).wait(1).to({scaleY:1.0369,y:163.1},0).wait(1).to({scaleY:1.0307,y:164.15},0).wait(1).to({scaleY:1.0246,y:165.15},0).wait(1).to({scaleY:1.0184,y:166.2},0).wait(1).to({scaleY:1.0123,y:167.25},0).wait(1).to({scaleY:1.0061,y:168.3},0).wait(1).to({scaleY:1,y:169.3},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-24.9,218,363.5);


(lib.元件27 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(165.5,145.8,1,1,0,0,0,165.5,145.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:140.35},7).to({y:145.8},6).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-5.4,331,297.09999999999997);


// stage content:
(lib.一 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:4,m2:41,lnav2:75,m3:76,m4:163,lnav3:200,m5:202,m6:295};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,5,38,41,42,72,75,76,77,162,163,164,199,200,202,203,294,295,296,326];
	this.streamSoundSymbolsList[5] = [{id:"小猫_1",startFrame:5,endFrame:38,loop:1,offset:0}];
	this.streamSoundSymbolsList[42] = [{id:"yx12040102小鸭子",startFrame:42,endFrame:72,loop:1,offset:0}];
	this.streamSoundSymbolsList[77] = [{id:"羊_1",startFrame:77,endFrame:162,loop:1,offset:0}];
	this.streamSoundSymbolsList[164] = [{id:"yx12040104小鸡",startFrame:164,endFrame:200,loop:1,offset:0}];
	this.streamSoundSymbolsList[203] = [{id:"yx12040105蜜蜂",startFrame:203,endFrame:294,loop:1,offset:0}];
	this.streamSoundSymbolsList[296] = [{id:"yx12040106小狗",startFrame:296,endFrame:326,loop:1,offset:0}];
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
		var soundInstance = playSound("小猫_1",0);
		this.InsertIntoSoundStreamData(soundInstance,5,38,1);
	}
	this.frame_38 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_41 = function() {
		var _this = this;
		
		_this.m2stop_btn.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_42 = function() {
		var soundInstance = playSound("yx12040102小鸭子",0);
		this.InsertIntoSoundStreamData(soundInstance,42,72,1);
	}
	this.frame_72 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_75 = function() {
		this.stop();
		
		var _this = this;
		
		_this.m3_btn.on('click', function(){
		
		_this.gotoAndPlay('m3');
		});
		
		
		
		_this.m4_btn.on('click', function(){
		
		_this.gotoAndPlay('m4');
			
		});
	}
	this.frame_76 = function() {
		var _this = this;
		
		_this.m3stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav2');
		});
	}
	this.frame_77 = function() {
		var soundInstance = playSound("羊_1",0);
		this.InsertIntoSoundStreamData(soundInstance,77,162,1);
	}
	this.frame_162 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav2');
	}
	this.frame_163 = function() {
		var _this = this;
		
		_this.m4stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav2');
		});
	}
	this.frame_164 = function() {
		var soundInstance = playSound("yx12040104小鸡",0);
		this.InsertIntoSoundStreamData(soundInstance,164,200,1);
	}
	this.frame_199 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav2');
	}
	this.frame_200 = function() {
		var _this = this;
		
		_this.m5_btn.on('click', function(){
		
		_this.gotoAndPlay('m5');
		});
		
		
		
		_this.m6_btn.on('click', function(){
		
		_this.gotoAndPlay('m6');
			
		});
	}
	this.frame_202 = function() {
		var _this = this;
		
		_this.m5stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav3');
		});
	}
	this.frame_203 = function() {
		var soundInstance = playSound("yx12040105蜜蜂",0);
		this.InsertIntoSoundStreamData(soundInstance,203,294,1);
	}
	this.frame_294 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav3');
	}
	this.frame_295 = function() {
		var _this = this;
		
		_this.m6stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav3');
		});
	}
	this.frame_296 = function() {
		var soundInstance = playSound("yx12040106小狗",0);
		this.InsertIntoSoundStreamData(soundInstance,296,326,1);
	}
	this.frame_326 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav3');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(33).call(this.frame_38).wait(3).call(this.frame_41).wait(1).call(this.frame_42).wait(30).call(this.frame_72).wait(3).call(this.frame_75).wait(1).call(this.frame_76).wait(1).call(this.frame_77).wait(85).call(this.frame_162).wait(1).call(this.frame_163).wait(1).call(this.frame_164).wait(35).call(this.frame_199).wait(1).call(this.frame_200).wait(2).call(this.frame_202).wait(1).call(this.frame_203).wait(91).call(this.frame_294).wait(1).call(this.frame_295).wait(1).call(this.frame_296).wait(30).call(this.frame_326).wait(1));

	// 音频停止
	this.m1stop_btn = new lib.音频停止();
	this.m1stop_btn.name = "m1stop_btn";
	this.m1stop_btn.setTransform(409.9,362.8,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m1stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m2stop_btn = new lib.音频停止();
	this.m2stop_btn.name = "m2stop_btn";
	this.m2stop_btn.setTransform(1324.35,363.1,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m2stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m3stop_btn = new lib.音频停止();
	this.m3stop_btn.name = "m3stop_btn";
	this.m3stop_btn.setTransform(410.7,361.55,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m3stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m4stop_btn = new lib.音频停止();
	this.m4stop_btn.name = "m4stop_btn";
	this.m4stop_btn.setTransform(1325.05,361.55,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m4stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m5stop_btn = new lib.音频停止();
	this.m5stop_btn.name = "m5stop_btn";
	this.m5stop_btn.setTransform(410.7,361.55,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m5stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m6stop_btn = new lib.音频停止();
	this.m6stop_btn.name = "m6stop_btn";
	this.m6stop_btn.setTransform(1324.35,361.3,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m6stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1stop_btn}]},4).to({state:[]},34).to({state:[{t:this.m2stop_btn}]},3).to({state:[]},34).to({state:[{t:this.m3stop_btn}]},2).to({state:[{t:this.m4stop_btn}]},87).to({state:[]},36).to({state:[{t:this.m5stop_btn}]},3).to({state:[{t:this.m6stop_btn}]},93).to({state:[]},30).wait(1));

	// 播放按钮
	this.m1_btn = new lib.音频播放标();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(362.6,315.7);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m2_btn = new lib.音频播放标();
	this.m2_btn.name = "m2_btn";
	this.m2_btn.setTransform(1276.95,315.7);
	new cjs.ButtonHelper(this.m2_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m3_btn = new lib.音频播放标();
	this.m3_btn.name = "m3_btn";
	this.m3_btn.setTransform(362.6,315.7);
	new cjs.ButtonHelper(this.m3_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m4_btn = new lib.音频播放标();
	this.m4_btn.name = "m4_btn";
	this.m4_btn.setTransform(1276.95,315.7);
	new cjs.ButtonHelper(this.m4_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m5_btn = new lib.音频播放标();
	this.m5_btn.name = "m5_btn";
	this.m5_btn.setTransform(362.6,315.7);
	new cjs.ButtonHelper(this.m5_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m6_btn = new lib.音频播放标();
	this.m6_btn.name = "m6_btn";
	this.m6_btn.setTransform(1276.95,315.7);
	new cjs.ButtonHelper(this.m6_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m2_btn},{t:this.m1_btn}]}).to({state:[{t:this.m4_btn},{t:this.m3_btn}]},75).to({state:[{t:this.m6_btn},{t:this.m5_btn}]},125).wait(127));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#52C1E1").s().p("AgjA/QgRgKgKgQQgJgRgBgUQABgUAJgQQAKgQARgKQAQgKATAAQAVAAAQAKQAQAKAKAQQAKAQAAAUQAAAUgKARQgKAQgQAKQgQAKgVAAQgTAAgQgKgAgigiQgOAOgBAUQABAVAOAPQAOAOAUAAQAVAAAPgOQAOgPAAgVQAAgUgOgOQgPgPgVAAQgUAAgOAPg");
	this.shape.setTransform(1259.175,195.575);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#52C1E1").s().p("AiRDeIAAjSIEnAAIAADRIggAAIAAgRIjoAAIAAASgAhyCwIDoAAIAAg4IjoAAgAhyBeIDoAAIAAg2IjoAAgAjVgeIAAgeIB8AAQgEgQgHgUQgJgUgKgRIAfgHQAHALAHAOQAGANAFAOQAFANADAKIgVAFICDAAIANgaIANgdIAKgbIAjAJIgSAlIgTAkIB9AAIAAAegAi6iQIAAgeICxAAQgDgJgFgMIgMgUIAegGQAJALAFANQAHAMAEALICkAAIAAAeg");
	this.shape_1.setTransform(1225.65,181.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#52C1E1").s().p("AjKDSIgNgKQAagZANgeQANgeAEgdQAEgdAAgbIAAg/IFTAAIAACeIgfAAIAAgZIkbAAQgFAggPAgQgOAfgbAbQgDgFgIgHgAAYBJICBAAIAAhOIiBAAgAh7AfIgBAUIgBAWIB3AAIAAhOIh1AAgAimhIIAAgcICfAAIAAgzIi8AAIAAgcIC8AAIAAgqIAgAAIAAAqIC/AAIAAAcIi/AAIAAAzICqAAIAAAcg");
	this.shape_2.setTransform(1176.325,181.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#52C1E1").s().p("AA7DXQAAgHgDgJQgDgIgEgHQAYACATAAIAcAAQAHABAFgCQAEgBAEgEQAGgHAFgSQAEgTAEghQADgiADg0QADgzAChJIh/AAQgKAZgLAWQgMAWgLAQIgNgJIgOgIQAQgWANgcQAOgcALghQALggAIgiIAfAHIgKAkIgLAjICSAAIAAARQgDBTgDA5QgDA5gEAlQgDAkgGAVQgFAUgHAIQgHAKgJADQgJAEgMABIgfABIgogCgAjIDWIAAlfIA2AAIAIgYIAHgcIAGgaIAiAHIgNAlQgGASgHAQIBSAAIAAE4IiHAAIAAAngAiqCSIBqAAIAAh4IhqAAgAiqgCIBqAAIAAhpIhqAAgABOA+QgMgTgPgVIgcglIAZgPIAdAlQAPATAMAUQANASAIAQIgbAQQgIgPgMgTg");
	this.shape_3.setTransform(1129.275,181.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#52C1E1").s().p("Ah+DdIAAioIgrANIgnAMIgIgfIApgMIAxgNIAAhvIguAAIgLAoQgFATgHAPIgLgIIgNgHQAJgUAGgbQAHgaAFgdQAEgeADgeIAdAFIgFAiIgGAhIApAAIAAhiIAeAAIAABiIAzAAIAAAfIgzAAIAABmIA6gRIAEAbIg+AUIAACygABaDWIgDgRQgCgIgEgHIAfACIAVABQAGgBAEgBQAEgCAEgFQAGgGAFgSQAFgTAFggQAEgiAEgzIAIh8IgbAAQgJAwgPAwQgOAtgUArQgUAqgZAjQgZAjgeAYIgMgKQgHgFgIgEQAogdAfgwQAegvAWg5QAVg6ANg+IgrAAQgLAqgSArQgSAogXAkQgWAkgbAYQgFgGgHgEIgNgJQAagVAWggQAWghARglQASgnAMgoIgtAAQgMAcgNAXQgOAXgQAUIgMgKIgNgJQAUgWARgdQAQgeALgiQANgjAIgkIAdAFIgKAnIgMAlIC+AAIAAAEIAAAHIAAAHIgJCKQgEA4gFAmQgFAkgGAUQgGAUgHAIQgHAJgIAFQgHADgLABIgYABIgfgBg");
	this.shape_4.setTransform(1080.125,181.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#52C1E1").s().p("AgEDLQgHgGgGgEQAggeATgrQATgrAJgzQAKgzACg3IhGAAIAAgfIBIAAIAAg0IABg0IAfAAIAAA0IgBA0IBrAAIAAARIgGB8QgDA0gDAhQgDAhgFASQgEATgGAHQgIAJgHAEQgIADgLABIgeABIglgCQgBgHgCgJQgDgIgEgHQAWACAQAAIAaABIALgBQAFgCADgFQAGgGAFgbQAEgbAEg1QADg1ADhWIhMAAQgDA7gKA3QgJA3gUAuQgVAvgjAiQgEgGgHgHgAjICNIgGgQQAFgBAFgJQAFgJAGgOIALgdQAIgUAHgbQAIgZAHgdIhFAAIAAgeIDUAAIAAAeIhvAAQgJAngNAnQgOAngOAiIB4gZIgNgoIgQglIAbgHIATAvIASAwQAHAXAEARIgbAJIgEgPIgFgSIhSASIgvALIgYAGIgLAGIgEgPgAjDiaIAAgdIC5AAIAAAdg");
	this.shape_5.setTransform(1032.25,182.075);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#52C1E1").s().p("AhjDHIgIgRIAjABIAcAAIARAAQAHgBADgCQADgDAAgIIAAmBIAhAAIAAGBQAAATgGAJQgFAJgLAEQgMAEgWABIg5ABIgFgRgACtA1QgOgkgTgmQgSgngVgiIAdgNQAWAhATAmQATAmAPAjQAOAlAHAdIgiAPQgGgcgNglgAjSBpIgPgJQAWgaARgiQARgiALgkQAMgjAGgiIAjAHQgIAkgNAmQgNAmgRAkQgSAkgXAbIgNgKg");
	this.shape_6.setTransform(983.925,182.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#52C1E1").s().p("AgQDcIAAieIiQAAIAAAeIgfAAIAAjgICvAAIAAhXIAgAAIAABXICwAAIAADfIggAAIAAgdIiQAAIAACegAAQAeICQAAIAAiDIiQAAgAigAeICQAAIAAiDIiQAAg");
	this.shape_7.setTransform(935.525,181.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#52C1E1").s().p("ACnDSIAAgVIlOAAIAAAVIgfAAIAAmjIGNAAIAAGjgAinCgIFOAAIAAlTIlOAAgAAfB9QgfgJgkgHQglgHghgEIAPgWQAhAEAkAGQAiAHAiAIQAgAIAYAIIgOAYQgYgIghgIgAAVA9QgTgHgTgGQgWgHgTgEIAOgUQATAEAVAGQAUAGAUAHQASAGAOAGIgNAXQgOgHgUgHgAiUAUIgIgNQAhgGAjgKQAhgMAggPQgPgKgOgMQgOgLgMgNIgXAUQgLAJgMAIIgLgKIgMgKQAfgTAdgaQAcgbATgeIAbAJIgKAOIgKAPIB+AAIAGgCIATAMQgQAYgWAVQgXAVgcASQAeANAgALQAgAKAgAFQgFAEgFAHIgIANQgjgIgigMQgigLgfgRQghATgmANQglANgkAIIgHgNgAg7hjQAMAOAQAMQAQAMARALQAWgLARgOQASgOANgPIh/AAg");
	this.shape_8.setTransform(887.25,182.775);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#52C1E1").s().p("AhZDQQgGgGgGgEQAhgYAUghQAVghAKgoQALgoADgqQADgsACguIhUAAIAAgfIEvAAIAAAfIi6AAIgCAmIgCAkICaAAIAAAPQgDBIgEAtQgEAsgFAXQgEAWgIAJQgGAHgJAEQgHADgMAAQgKABgRAAIgkgBQAAgHgDgIQgDgIgEgHIAlACIAYAAIALgBQADgBAEgDQAFgGAFgTQAEgTADgnQADglACg9Ih7AAQgFAtgLAoQgMAqgVAhQgWAjgiAZQgFgGgHgGgAicDaIAAkPIgXAfIgWAaIgJgOIgKgQQAWgYAVgfQAVgfASgjQASgkAMgkIAgAIQgKAcgNAbQgNAagOAaIAAFCgAA9igIgIgaIgJgaIAggHIAJAZIAJAaIAGAVIghAJIgGgWg");
	this.shape_9.setTransform(838.7,181.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#52C1E1").s().p("AB5C0QghgbgSgpIgCAAQgIAagSAVQgSAVgbAPQgcAPgpAKIgIgNIgJgMQAjgIAZgMQAZgMAOgPQAQgQAJgUIhxAAIAAgbIB6AAIAFgUIADgWIhhAAIAAiSIDpAAIAACSIhoAAIgDAVIgFAVICIAAIAAAbIhwAAQASAfAfAVQAfAVAsAJIgMAMIgJAOQgwgMgigcgAgQASICtAAIAAgkIitAAgAgQgpICtAAIAAgmIitAAgAiZDbIAAjiQgLAmgOAhQgNAhgOAXIgIgQIgKgOQAPgVANgfQANgfALgiQALgjAHgiIg9AAIAAgeIA9AAIAAhdIAeAAIAABdIA0AAIAAAeIg0AAIAAAUIAOAVIARAcIAQAbIALATIgVAXIgKgVIgMgaIgPgbIAAD7gABwhwIAAgmIhMAAIAAAmIgfAAIAAgmIhIAAIAAgcIBIAAIAAgpIAfAAIAAApIBMAAIAAgpIAgAAIAAApIBGAAIAAAcIhGAAIAAAmg");
	this.shape_10.setTransform(790.5,181.675);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#52C1E1").s().p("AgjDcIAAjkIDXAAIAAC/QABAMgEAHQgDAHgKAEQgKAEgQABIgqAAIgEgOIgGgOIAjABIAUAAQAFAAACgCQACgCAAgFIAAglIibAAIAABLgAgFB5ICbAAIAAgqIibAAgAgFA4ICbAAIAAgoIibAAgAidDFIgJgOQAEgCAFgGQAFgFAEgIQADgIABgLIAAi0IhKAAIAAgfIBoAAIAADSIA0gnIAFAPIAGANIg7AuQgVAPgHAIQgJAHgDAEIgHgOgAhGglIAAgZIB+AAIAAglIhkAAIAAgYIBkAAIAAggIhvAAIAAgZIBvAAIAAgnIAgAAIAAAnIB1AAIAAAZIh1AAIAAAgIBmAAIAAAYIhmAAIAAAlICEAAIAAAZgAiGiJIgagaIgagZIAVgTQANAKAOANIAaAZQALAMAJAKIgWAXIgUgXg");
	this.shape_11.setTransform(742.2,181.675);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#52C1E1").s().p("AgNAIQgdgbgagWIAdgYQARAOAUASIAkAlQATATAQATIgeAZQgYgfgcgcg");
	this.shape_12.setTransform(679.1,196);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#52C1E1").s().p("AjaARIAAgiIG1AAIAAAig");
	this.shape_13.setTransform(645.525,181.25);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#EDF9FC").s().p("EgyaANGQh4AKiAAAQprAAm3jqQjoh8htiXQhgiFAAicQAAgyAKgvQAJgsASgrQA5iHCRh0QA7guBKgtQAfgTAigSQG2jpJsAAQBWAABTAEQAngVAtgVQEoiGGjgBQGiABEoCGQA5AZAuAcQFfh5G3AAQJ8AAHAD9QAYANAYAPQBIhDB9g5QEoiGGjAAQGiAAEpCGIAhARQBVApA5AvQCHg6ChgeIMUAAQBLAOBFAUQBhgXBogLIIAAAQFiApEPChIADABQAeATAdAUQDJCHBFCnQAlBaAABgQAACJhGB1QgZArgiAoQhZBoiUBZIgJAFQlsDVoAAAQmYAAk7iHQhHAMhOgBIghAAQjoCQk8AAQjwAAi/hUQjvCClCAAIgbAAQi7AgjYAAQnVAAlMiWQgggPgbgPQmACdnzgBQnLAAlqiDQl4Cwn4AAQlXAAkbhRg");
	this.shape_14.setTransform(960.025,175.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(327));

	// 边框和标题
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("Ag7D2QgFgIgIgEQgIgFgSgFQgQgEgcgDIAAgJIAOABIAhACIAkACIAXAAQALABAEgDQADgEAAgIIAAjNIj6AAIgEgRID+AAIAAhjIAhADQAhgVAfgbQAggaAWgYIlUAAIgFgRIFiAAIAdgbIAxArQgFADgFACIgRACIgvAgIg4AhQgdAQgdANIAKACQgBAGgFAEQgEADgKACIAABNIChAAIAggoIAKAIIAXASIAZAWQgCAFgEACQgDACgHAAIjrAAIAADQQABAQgGAMQgFANgPAIQgRAJghACQgCgKgEgGg");
	this.shape_15.setTransform(1196.45,357.3);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AiuESIAAjZIg5AAIAAApQAAACgJAFQgIAFgMAAIgGAAIAAlaIAqASICKAAIAVgWIAqAiQgDAEgFACQgGADgHACIAAESQgCADgKAFQgJAEgKABIgFAAIAAgjIg6AAIAADNQAAADgIAEQgJAFgNAAgAiKAoIA6AAIAAhvIg6AAgAjnAoIA5AAIAAhvIg5AAgAiKhZIA6AAIAAhvIg6AAgAjnhZIA5AAIAAhvIg5AAgACNECQgBgGgGgEQgHgEgLgEQgNgEgOgCIABgKIAXACIAZABIASABIALgBIAJgFQAKgJAIgrQAIgrAFhMIipAAIgPAWIgogdIAHgGIAJgGIAAkEIArAVIAUAAIAGghIAFghIBAAMQgDAGgGAEQgFADgKAAQgGAKgHAKIgRAVIBXAAIAVgWIArAjQgDADgFACIgPAEQgBA2gDAkQgEAjgGAVQgHAVgIAIQgLAIgMADQgNAEgPAAQAAgGgCgHQgBgHgFgEQgFgEgKgDQgKgEgMgBIAAgLIATACIAVABIAOAAIAKgBQAEAAADgDQAIgHAEgkQAEgjAChFIiMAAIAADgICmAAIAVgXIAtAkIgJAGIgOADQgFBWgKAxQgLAxgRAPQgMAKgPAEQgOAEgQAAQAAgIgDgHgAg+CQIgFgRICqAAIAbghIAIAHIATAQIAVASQgBAFgEACQgEACgGAAgABlhNQgEgNgIgPQgIgOgLgOQgLgNgKgKIAHgFQApAOATASQARASABAQQAAAPgJAGQgFADgEAAQgHAAgIgGg");
	this.shape_16.setTransform(1137.35,356.125);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AgwD9QgEgIgHgEQgIgGgQgFQgPgEgagEIAAgKIANABIAeACIAgACIAVABQAKAAAEgDQAEgDAAgJIAAnZIA+AHQgBAHgFADQgFAFgLABIAAHHQABARgFANQgFANgQAIQgPAJghADQgBgKgEgIgAkOCmQAWggATgnQAUglAPgoQAPgnAMgmQALgnAHggIBBAUQgBAGgFACQgFADgMgBQgOAqgVAwQgWAvgeAwQgeAwgnAmgADmCMQgFgrgTguQgTgvgbgqQgbgtgagiIAJgEQA8AvAiAtQAjAsAOAlQAOAmgCAYQgBAYgMAIQgEADgFAAQgIAAgLgJg");
	this.shape_17.setTransform(1076.0823,356.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#51C1E1").s().p("AigCSQg0AAglglQglglAAg0IAAgnQAAg0AlglQAlglA0AAIFAAAQA1AAAlAlQAlAlAAA0IAAAnQAAA0glAlQglAlg1AAg");
	this.shape_18.setTransform(1136.7559,357.2643,3.7446,3.7446);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AjTEAQgDgHgGgDQgGgFgLgEQgLgEgQgDIAAgKIANABIAcACIAdABQAHAAAEgCQAEgCAEgFQAJgMAFgaQAFgaADghQACgiAAghIAAgeIgCgcQgVAfgfAhQggAggmAaIgHgIQAagYAXgfQAWgfASghQATghALghIgIgeQgFgPgGgOQgVATgYARQgXASgZAPIgHgJQAXgSAWgXQAVgWAUgYQgMgWgRgVQgSgWgWgUIAJgHQAYAQATARQATASAPATQARgXANgVQANgWAKgUIA3AdQgDAEgFACQgEACgLgCQgMASgRAUQgRAVgVAUQAbAuALA1QALA0AAA5QAAAngCAnQgDAmgIAgQgIAggOAVQgJAMgPAFQgPAFgXAAQABgKgDgHgAhBEPIAAlXIApAUIDYAAIAWgZIAwAlQgDAEgHADQgHAEgJACIAAEZQAAACgGADQgFADgHADQgIACgGAAIgGAAIAAgmIjgAAIAAAcQgBAEgJAFQgJAFgNAAgABmDUIBgAAIAAh3IhgAAgAgaDUIBbAAIAAh3IhbAAgABmBLIBgAAIAAhuIhgAAgAgaBLIBbAAIAAhuIhbAAgAAAhQIAAhPIhtAAIgFgSIByAAIAAhbIA8AGQgBAGgFAEQgFAFgLACIAABEIBdAAIAAhbIA+AGQgCAGgFAEQgFAFgLACIAABEIArAAIAYghIAIAHIASAQIAUASQgCAFgDADQgEACgGAAIhiAAIAAA/QAAAFgKADQgKAEgLAAIgIAAIAAhLIhdAAIAABCQgBAEgJAEQgJAEgMABg");
	this.shape_19.setTransform(251.675,360.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AgwD9QgEgIgHgEQgIgGgQgEQgPgFgagEIAAgKIANABIAeACIAgACIAVABQAKAAAEgDQAEgEAAgHIAAnaIA+AHQgBAHgFADQgFAFgLACIAAHFQABASgFANQgFANgQAIQgPAJghADQgBgKgEgIgAkOCmQAWghATglQAUgmAPgoQAPgmAMgnQALgnAHggIBBAVQgBAFgFADQgFACgMgBQgOAqgVAwQgWAwgeAvQgeAwgnAmgADmCMQgFgqgTgvQgTgugbgrQgbgtgagiIAJgEQA8AwAiAtQAjArAOAlQAOAmgCAYQgBAYgMAIQgEADgFAAQgIAAgLgJg");
	this.shape_20.setTransform(191.2323,360.6);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#F29539").s().p("ApaIkQjDgBiKiKQiLiLAAjEIAAiVQAAjCCLiLQCKiKDDgBISzAAQDDABCMCKQCLCLAADCIAACVQAADEiLCLQiMCKjDABg");
	this.shape_21.setTransform(221.575,357.25);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#F29539").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape_22.setTransform(503.925,585.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#51C1E1").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape_23.setTransform(1418.525,585.05);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("ACXEDQgCgHgGgEQgGgFgNgDIgcgHIABgKIAYACIAaACIATABIALgBQAFgCAEgDQALgKAJgrQAIgrAFhJIjLAAIgPAWIgqgdIAIgGIAJgGIAAkIIAsAVIAdAAIAGggIAFghIA/AMQgCAHgFADQgGAEgJAAIgPAUIgPATIBuAAIAWgWIAsAkQgDADgFADIgPADQgCBOgJAqQgIArgPANQgLAIgOAEQgOAEgPAAQAAgHgCgHQgCgIgGgEQgFgEgMgEQgMgDgNgCIAAgLIAWACIAXACIARAAIALgBQAEAAAEgDQAIgJAFgkQAGgkADhCIivAAIAADjIDKAAIAVgXIAtAkQgDAEgFACIgPADQgFBUgLAxQgMAxgTAQQgLAKgPAEQgPAFgQAAQAAgJgCgHgAkXDvQAogpAegyQAegzAUg4QgXgrgbgoQgagpgYghIAKgEQAiAgAaAeQAaAdATAbQAMgqAJgqQAIgqAGgqIiaAAIgFgSICbAAIAXgZIAsAoQgCAEgGACQgFACgKABQgHAxgMAzQgMAzgTAvQAhA3AIAkQAJAkgJANQgJANgSgOQgEgVgJgXQgJgYgMgZQgXAvggArQghAqgsAjgAg1CQIgFgRICpAAIAbghIAIAGIATAQIAVATQgBAFgEACQgEACgGAAgABbhMQgEgOgIgPQgJgPgLgOQgLgOgLgKIAHgFQArAPASATQATATAAAQQABAPgKAHQgEACgEAAQgHAAgJgGg");
	this.shape_24.setTransform(1166.425,360.375);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("AgVEUIAAimIj4AAIgFgRID9AAIAAhtIi/AAIgFgSIDEAAIAAhmIjWAAIgGgRIEhAAQALgSAMgWIAVgqQAKgVAHgTIBBATQgCAFgFADQgGADgKgBQgQAWgXAYQgXAZgYAWIBeAAIAfgnIAJAIIAXASIAYAVQgCAFgEACQgEACgGAAIjUAAIAABmIB+AAIAeglIAKAHIAWASIAYAUQgCAFgEADQgEACgGAAIjEAAIAABtICnAAIAhgnIAKAIIAXASIAYAVQgBAFgEACQgEACgGAAIjyAAIAACaQAAADgJAEQgJAFgPAAgAheihQgDgSgKgUQgJgTgNgSQgNgTgNgNIAHgFQAwAUAVAYQAVAYABATQACATgLAJQgFADgGAAQgHAAgKgGg");
	this.shape_25.setTransform(221.275,360.125);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#F29539").ss(1,0,0,4).p("Eg8hAbkQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAMhqTAAAQjDAAiKCKQiLCLAADFg");
	this.shape_26.setTransform(503.925,585.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#FFFFFF").s().p("AjIEBQgCgHgGgEQgHgEgMgEQgMgEgRgEIAAgKIAOABIAeADIAfABQAIAAAEgCQAEgDAEgFQAJgMAFgaQAGgaADghQADggAAgiIgBgeIgBgdQgYAhgjAhQgjAhgqAZIgHgHQAcgYAZgeQAZgeAVggQAUgiANgiQgHgegNgdQgWAWgaATQgZATgcAQIgHgHQAZgUAYgZQAYgYAVgbQgNgXgTgVQgSgVgYgVIAJgIQAZAQAUASQAVASAPAUQARgXAOgXQANgXAKgVIA4AbQgDAFgFACQgFACgKgDQgNAUgRAWQgQAVgVAWQAcAuALA0QAKA0AAA4QABAngDAmQgDAmgIAgQgIAggPAUQgJANgRAFQgPAGgXAAQAAgLgDgHgACLEAQgCgIgHgFQgIgGgRgEIgjgJIABgLIAeAEIAgADIAWABQAJAAAFgCQAFgCAFgFQALgLAIgwQAHgvAEhOQAEhNAChnIjUAAQgSAlgVAgQgWAfgYAZIgJgGQATgeASgmQARgnAPgsQAOgsAKguIA+ATQgCAFgFADQgGAEgKAAIgOAlIgQAlIDHAAIAXgbIAwAoQgEAEgFACQgGADgKABQgDCmgKBjQgLBjgVAaQgNAQgSAHQgRAGgWAAQAAgKgCgHgAgdCcIAAjxIAmATIBXAAIAVgXIAsAjQgDADgGADQgGADgIABIAACpQgBADgKAFQgKAEgKAAIgFAAIAAgkIhgAAIAAArQAAAEgIAEQgJAEgMAAgAAGBVIBgAAIAAiGIhgAAg");
	this.shape_27.setTransform(1166.475,360.325);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#FFFFFF").s().p("ABNEUIAAhmIiAAAIgEgSICEAAIAAg0IhmAAIgEgRIBqAAIAAgxIhpAAIgFgSIBuAAIAAg3IA7AGQgBAHgFAEQgFAEgKACIAAAgIA2AAIAZgcIAIAGIASANIAUARQgCAFgEACQgEADgGAAIhtAAIAAAxIA9AAIAYgeIAIAGIARAPIATARQgCAFgEACQgDACgGAAIhyAAIAAA0IBQAAIAaghIAJAHIATAQIAVASQgBAFgEACQgEADgHAAIiLAAIAABYQgBAFgJAEQgJAEgLABgAkYDLIApgHIA6gMIAAiEIgnAAIAAAWQAAADgIAEQgJAEgLAAIgGAAIAAj+IAlARIAkAAIAAh0IA5AGQgBAGgFAFQgFAEgLABIAABeIAiAAIATgVIAqAhQgCADgHADQgFADgIABIAAC/QgBAEgKAEQgJAEgJABIgFAAIAAgWIgnAAIAAB9IAygLQgEgTgGgRQgHgRgHgOIAJgCQAjAgAOAeQAOAdgDAVQgBAUgLAHQgKAHgNgNQAAgMgCgNIgEgbIhBAbIhVAhQgCAFgDAEQgEADgEABgAiUAiIApAAIAAioIgpAAgAjcAiIAoAAIAAioIgoAAgAhGAAQAtgRAmgZQAmgZAfgeQgOgPgNgRQgNgRgLgUQgVAZgWATQgXAUgZANIgHgGQAjgeAfguQAeguAUg6IA4AXQgCAFgGADQgGACgKAAIgJARIgJAQIBcAAIAZgYIArAnQgDACgGACIgQACQgNAZgSAXQgRAXgWAUQAfASAmAMQAmANAuAIIAAAGQgLADgIAIQgIAIgCANQgvgLgkgSQgkgSgcgWQgiAcgrAWQgpAWg0AOgAAui4IgGAHQANASAPAPQAPAQASANQAPgSAOgUQANgTAKgUIhmAAIgFAIg");
	this.shape_28.setTransform(251.625,360.225);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#FFFFFF").s().p("ADSETQgGgLgJgLQgJgLgLgMQhCAIheAIIjdARQgDAGgEADQgEADgEABIgcgxIBhgBICHgDIAAhEIh7AAIAAATQgBAEgKAEQgKAEgNAAIgFAAIAAiXIAqASIB4AAIAAgsIA6AGQgBAFgEAEQgEAEgLACIAAAXIB2AAIAVgXIAxAlQgDADgHADQgGAEgJACIAABTQAAADgGADIgNAFQgHADgHAAIgGAAIAAgVIh8AAIAABDICMgEQgOgLgQgKQgPgKgNgHIAFgHQA6ALAfATQAeAUAIATQAIATgHAKQgFAGgIAAQgGAAgHgCgAAVCKIB8AAIAAhDIh8AAgAiMCKIB7AAIAAhDIh7AAgAkDATQAmgIAlgLQAlgMAkgOIgBgJIgBgLIAAhcIA3AHQAAAFgFAEQgEAEgIABIAABIIAAAEQA4gaAtgeQAugeAggiIArAgQgEAFgGAAQgFAAgJgDQgdAbgqAZQgqAZgzAVICKAAIAOAAQAGgBADgDQADgEAEgJIAIgZIAHAAIACAkIAPAGQAEADgBAEQABALgPAGQgPAFgmAAIiQAAQgUAAgMgBQgNgBgGgFQglALgnAKQgoAJgnAGgADWgTQgFgQgLgSQgMgQgPgQQgPgPgPgKIAGgGQAwAOAXAUQAXATAEASQADASgJAIQgFAEgGAAQgGAAgIgEgAjcgYQgMAAgFgJQgDgIAEgHQAFgHAIgFQANgFALgKQAMgLAIgOQAIgPACgRIALAAQAEAcgFAUQgGAVgKANQgLANgLAGQgLAHgLAAIgBAAgAgJhmQgDgSgNgSQgMgRgOgNIAGgEQAlAJAOAPQAQAPAAAOQAAAOgJAGQgEACgFAAQgFAAgIgFgAj1hnQgMAAgFgKQgEgKAFgIQAEgIAKgFQAQgKALgWQALgVgCgbIAKgBIAEAPIADAMIGFAAIAZgZIAtAsQgDAEgFABIgNACQgLAOgPARQgPARgPAMIgIgEIAKgfIAIghImGAAQAAAbgIARQgJASgNAIQgJAHgLAAIgDAAgAADjPQgDgRgOgSQgOgSgQgLIAGgFQAqAGASAOQATAPAAAPQABAPgLAHQgFADgFAAQgIAAgKgGg");
	this.shape_29.setTransform(191.8611,360.09);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20,p:{x:191.2323}},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15}]}).to({state:[{t:this.shape_23},{t:this.shape_26},{t:this.shape_21},{t:this.shape_25},{t:this.shape_18},{t:this.shape_20,p:{x:1106.4823}},{t:this.shape_24}]},75).to({state:[{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_29},{t:this.shape_28},{t:this.shape_18},{t:this.shape_20,p:{x:1106.4823}},{t:this.shape_27}]},125).wait(127));

	// 遮罩 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EASTAi+QjDAAiKiLQiLiNAAjDMAAAg3GQAAjECLiLQCKiLDDAAMBqUAAAQDDAACKCLQCLCLAADEMAAAA3GQAADDiLCNQiKCLjDAAgEh8mAi+QjDAAiKiLQiLiNAAjDMAAAg3GQAAjECLiLQCKiLDDAAMBqUAAAQDDAACKCLQCLCLAADEMAAAA3GQAADDiLCNQiKCLjDAAg");
	var mask_graphics_75 = new cjs.Graphics().p("EASSAi+QjDAAiLiLQiKiNAAjDMAAAg3GQAAjECKiLQCLiLDDAAMBqUAAAQDDAACKCLQCKCLABDEMAAAA3GQgBDDiKCNQiKCLjDAAgEh8lAi+QjDAAiKiLQiKiNgBjDMAAAg3GQABjECKiLQCKiLDDAAMBqUAAAQDDAACKCLQCLCLAADEMAAAA3GQAADDiLCNQiKCLjDAAg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:961.225,y:585.05}).wait(75).to({graphics:mask_graphics_75,x:961.1,y:585.05}).wait(252));

	// 图层_4
	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#3F4A4C").s().p("AgXAWQgKgJAAgNQAAgMAKgJQAKgJAOAAQAXAAAJASIgMAMIANALQgEAJgJAGQgJAFgLAAQgOAAgKgJg");
	this.shape_30.setTransform(1469.5129,516.6201,3.5903,3.5903);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#FFFFFF").s().p("AgjAgQgPgNAAgTQAAgSAPgNQAPgOAUAAQAUAAAQAOQAOANAAASQAAATgOANQgQAOgUAAQgUAAgPgOg");
	this.shape_31.setTransform(1469.8719,516.6201,3.5903,3.5903);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#E26D18").s().p("AhiAmQgIgBgDgKQgDgJAMABQBSAKBIggQAkgRAUgTIgGAMQhAAvhAAOQgaAGgXAAQgNAAgMgCg");
	this.shape_32.setTransform(1550.1839,550.7795,3.5903,3.5903);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#EC7A23").s().p("AiHAwQgGgZAYgXQAsguAFg0QBEA+BageQAWgHANAGQAOAGgCAXQgCAYgQAYQgQAWgWAPQhIAzh0ACQgZgjgDgRg");
	this.shape_33.setTransform(1543.3741,540.047,3.5903,3.5903);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#F2D321").s().p("AhEBNQhWgsgaiBQAtAvA/AIQAxAGBHgRQA4gNAkANQAgALAHAbQAHAZgUAbQgWAdgqAOQguAQgoAAQgtAAgngUg");
	this.shape_34.setTransform(1379.6818,667.4045,3.5903,3.5903);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#F2C31D").s().p("AiPCCQg8g2ABhMQgBhLA8g2QA7g2BUAAQBUAAA8A2QA7A2ABBLQgBBMg7A2Qg8A2hUAAQhUAAg7g2g");
	this.shape_35.setTransform(1451.5612,530.5326,3.5903,3.5903);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#E9A116").s().p("AgoAlQg1gUglgnIgHgJIgBAAIgGgHIBygMIB0AYIA2gCIgJASQgGAVAUAUQg2AUgyAAQgpAAgogOg");
	this.shape_36.setTransform(1450.5739,589.7509,3.5903,3.5903);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#E9A116").s().p("AjEDQQhmhbgxhzQgzh6Aah1QAJByA5B7QArBJAsAnQA6AyBKAEQCHAKCngQQArgCAugpQATgRA7hBQgVBThPBZQgbAfjQAAQjQAAgjgeg");
	this.shape_37.setTransform(1398.8725,670.8248,3.5903,3.5903);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#F2C31D").s().p("AjHDsQhrhegwh4QgziAAih4QAJghAGgEQAKgIAWAXQBdBmBzAYQBrAWAhg5QAFgIgBgPQgDgcgdgcIBxgMIB1AYIA3gCIgLAVQgEAaAfAWQBmBTgQBwQgNBehbBnQgcAfjQAAQjPAAgjgeg");
	this.shape_38.setTransform(1400.1422,660.7662,3.5903,3.5903);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.bf(img.小猫, null, new cjs.Matrix2D(1,0,0,1.061,-109,-169.3)).s().p("AxBadMAAAg05MAiDAAAMAAAA05g");
	this.shape_39.setTransform(483,573.775);

	this.instance = new lib.元件1();
	this.instance.setTransform(483,743.1,1,1,0,0,0,109,338.6);

	this.instance_1 = new lib.元件27();
	this.instance_1.setTransform(1427.25,610.45,1,1,0,0,0,165.5,145.8);

	var maskedShapeInstanceList = [this.shape_30,this.shape_31,this.shape_32,this.shape_33,this.shape_34,this.shape_35,this.shape_36,this.shape_37,this.shape_38,this.shape_39,this.instance,this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30}]}).to({state:[{t:this.instance},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30}]},5).to({state:[{t:this.shape_39},{t:this.instance_1}]},36).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30}]},25).to({state:[]},9).wait(252));

	// 图层_2
	this.instance_2 = new lib.图层6png复制();
	this.instance_2.setTransform(1285,539);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.bf(img.图层5png复制, null, new cjs.Matrix2D(0.774,0,0,0.774,-32.9,-24.8)).s().p("AlID4IAAnvIKRAAIAAHvg");
	this.shape_40.setTransform(1298.9,522.775);

	this.instance_3 = new lib.图层2png复制2();
	this.instance_3.setTransform(1316,468,1.0002,1.0002);

	this.instance_4 = new lib.图层1png复制2();
	this.instance_4.setTransform(1304,511,0.998,0.998);

	this.instance_5 = new lib.元件15();
	this.instance_5.setTransform(1459.5,607.5,1,1,0,0,0,193.5,139.5);

	var maskedShapeInstanceList = [this.instance_2,this.shape_40,this.instance_3,this.instance_4,this.instance_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.shape_40},{t:this.instance_2}]},200).to({state:[{t:this.instance_5}]},96).wait(31));

	// 动画
	this.instance_6 = new lib.元件4();
	this.instance_6.setTransform(435.5,565,1,1,0,0,0,87.5,78);
	this.instance_6._off = true;

	this.instance_7 = new lib.元件3();
	this.instance_7.setTransform(1454.5,616.5,1,1,0,0,0,210.5,101.5);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#3C291D").ss(3,0,0,4).p("ABLkcQAAAYgQAQQgDACgBACQgMAKgQACQgEABgEAAQgXAAgQgRQgRgQAAgYQAAgXARgRQAQgQAXAAQAXAAARAQQAQARAAAXgAAmEdQAAAXgRARQgQAQgXAAQgXAAgRgQQgQgRAAgXQAAgYAQgQQARgRAXAAQAQAAALAHQAHAEAFAGQAFAFAEAGQAIAMAAARg");
	this.shape_41.setTransform(571.85,497.775);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#286B59").ss(8,0,0,4).p("AAXmrQgaDNgLDYQgBALAAAMQgKDLAFDU");
	this.shape_42.setTransform(495.6378,662.3952);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#286B59").s().p("AhOEEIgFACQAAgNAFALgAipATQhTgGhRgdQhXgggkgsQgqgxAsgzQBOhaCqCGQA2ArBSB2QgYAIglAAQgSAAgUgCgAhBgZIgNgHIAOgSIgBAZIABgZQAwg8BJg2QCqh/CwAnQBjAWghA0QgdAthxAxQhwAwhxARQgvAHgmAAQgyAAgggNgAhAgyIAAAAg");
	this.shape_43.setTransform(500.6104,666.703);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#3C291D").s().p("AoXFFQgQgRAAgXQAAgYAQgQQARgRAXAAQAQAAAMAHQAGAEAGAGQAFAFADAGQgDgGgFgFQgGgGgGgEQA4hRBQgTQgjgwAAg3QAAgzAgguQAHgLAIgKQhOg3g0hXQAPgCAMgKQAxBPBIAzIAEACQAvgsBQglQBFghBQgVIAAInQhQgWhFggQhegsgwg0QhQAWg3BMQAJAMgBARQAAAXgQARQgQAQgYAAQgXAAgRgQgAHRCHIAAjEQAzgaAkgfIAAFDQgjgmg0gggAC4AbIABgCQAsgIApgKIAAAsQgpgNgtgLgAnyj0QgQgQAAgYQAAgXAQgRQARgQAXAAQAYAAAQAQQAQARAAAXQAAAYgQAQIgEAEQgMAKgPACIgJABQgXAAgRgRgAnBjkIAAAAg");
	this.shape_44.setTransform(619.6,497.775);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#F4D23D").s().p("AnvEQIAAomIAkgJIACADQBACLBhCGIAAADIAAAAIACALQhQCNgyCQQgkgHgjgJgAB9DqQgRgigdgfIAAlCQAsglAXgrQALgVAGgVQBJAUA/AeQDFBcgBCCQABCCjFBbQhIAjhVAVQgGgUgLgUgAjLAPIAAgrQBzgcBQgpIAADFQhOgxh1gkg");
	this.shape_45.setTransform(666.95,501.325);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("rgba(255,255,234,0.8)").s().p("Ai7JbQingOBnkoQAyiQBQiNIgCgLIgBAAIABgDQhhiGhAiLIgCgDQiBkbCwgfQBrgTBJAgQBGAgAYBNQBQhoBhBEQBZA/AcBKQAUA0gNAzQgGAVgLAVQgYArgrAlQglAegzAaQhQAphyAcQgoAKgtAJIgBABQAtAKApANQB0AkBOAxQA0AgAkAlQAdAfARAiQALAUAGAUQANAzgTAzQgaBGhTA6QhRA3hGhOQgUA3gzAfQg1AghPAAIghgBg");
	this.shape_46.setTransform(649.6568,500.8392);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#FFFDF2").s().p("AAlIYQg2g2gPhHIgGAKQgQAZgVAWQhNBLhrAAQhrAAhNhLQhNhOAAhrIAAgLQAEhkBJhJIALgKQhBgRgzgzQhMhMAAhrIAAgMQAEhjBIhJQAmgnAxgTQAegMAigFQAQgCARAAQA/AAAzAbQANhOA7g9QBOhNBqAAQBrAABNBNQBMBPABBqIAAAKQAtgSA1AAQBrgBBMBOQBOBNAABrQAABqhOBMQhBBChWALIAIAGQBNBNABBrQgBBrhNBNQhNBNhrAAQhrAAhNhNgAiZh7QhCBDAABbQAABdBCBCQBCBDBcAAQBdAABChDQBDhCAAhdQAAhbhDhDQhChChdAAQhcAAhCBCg");
	this.shape_47.setTransform(501.8,577.55);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#F7CA2C").s().p("AifCfQhChCAAhdQAAhbBChDQBDhCBcAAQBdAABCBCQBDBDAABbQAABdhDBCQhCBDhdAAQhcAAhDhDg");
	this.shape_48.setTransform(502.325,581.05);

	this.instance_8 = new lib.元件9();
	this.instance_8.setTransform(623.55,500.85,1,1,0,0,0,59.2,60.4);

	this.instance_9 = new lib.元件10();
	this.instance_9.setTransform(501.85,612.95,1,1,0,0,0,62.6,96.7);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#286B59").s().p("AhOEEIgFACQAAgNAFALgAipATQhTgGhRgdQhXgggkgsQgqgxAsgzQBOhaCqCGQA2ArBSB2QgYAIglAAQgSAAgUgCgAhBgZIABgZIgBAZIgNgHIAOgSQAwg8BJg2QCqh/CwAnQBjAWghA0QgdAthxAxQhwAwhxARQgvAHgmAAQgyAAgggNg");
	this.shape_49.setTransform(500.6104,666.703);

	var maskedShapeInstanceList = [this.instance_6,this.instance_7,this.shape_41,this.shape_42,this.shape_43,this.shape_44,this.shape_45,this.shape_46,this.shape_47,this.shape_48,this.instance_8,this.instance_9,this.shape_49];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_6}]},75).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_6}]},5).to({state:[{t:this.instance_6}]},3).to({state:[{t:this.instance_6}]},6).to({state:[{t:this.instance_6}]},8).to({state:[{t:this.instance_7},{t:this.instance_6}]},65).to({state:[{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41}]},37).to({state:[{t:this.instance_9},{t:this.instance_8}]},3).to({state:[{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_49},{t:this.shape_42},{t:this.shape_41}]},93).wait(31));
	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(75).to({_off:false},0).wait(1).to({regY:78.1,y:529.05},5).to({regY:78.2,rotation:-10.1477,y:529.1},3).to({regY:78.1,rotation:0,y:529.05},6).to({regY:78,y:565},8).wait(65).to({_off:true},37).wait(127));

	// bg
	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#94C8DB").s().p("AtJDUQldhYAAh8QAAh7FdhYQFdhXHsAAQHtAAFdBXQFdBYAAB7QAAB8ldBYQldBXntAAQnsAAldhXg");
	this.shape_50.setTransform(1411.529,755.1976,3.5903,3.5903);

	this.instance_10 = new lib.小猫bgpng();
	this.instance_10.setTransform(75,127,1.5476,1.2829);

	this.instance_11 = new lib.Bitmap4();
	this.instance_11.setTransform(1575,610);

	this.instance_12 = new lib.Bitmap3();
	this.instance_12.setTransform(1381,515);

	this.instance_13 = new lib.图层3();
	this.instance_13.setTransform(1244,557);

	this.instance_14 = new lib.图层0png复制();
	this.instance_14.setTransform(1029,350,1.5695,1.5695);

	this.instance_15 = new lib.羊();
	this.instance_15.setTransform(348,487,0.7506,0.7506);

	this.instance_16 = new lib.图层0();
	this.instance_16.setTransform(110,316,1.5928,1.406);

	this.instance_17 = new lib.图层0();
	this.instance_17.setTransform(898.45,316,1.5928,1.406,0,0,180);

	var maskedShapeInstanceList = [this.shape_50,this.instance_10,this.instance_11,this.instance_12,this.instance_13,this.instance_14,this.instance_15,this.instance_16,this.instance_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_10},{t:this.shape_50}]}).to({state:[{t:this.instance_16,p:{scaleX:1.5928,scaleY:1.406,x:110,y:316}},{t:this.instance_15},{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11}]},75).to({state:[{t:this.instance_16,p:{scaleX:1.5928,scaleY:1.406,x:110,y:316}},{t:this.instance_14},{t:this.instance_15}]},88).to({state:[{t:this.instance_17},{t:this.instance_16,p:{scaleX:1.7734,scaleY:1.5654,x:979,y:288}}]},37).wait(127));

	// 选中
	this.instance_18 = new lib.选中();
	this.instance_18.setTransform(125.1,863.75,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.instance_18, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(75).to({x:157.75},0).wait(125).to({x:189.45},0).wait(127));

	// 切换
	this.lnav1_btn = new lib.选择();
	this.lnav1_btn.name = "lnav1_btn";
	this.lnav1_btn.setTransform(126.05,861.65,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.lnav1_btn, 0, 1, 2, false, new lib.选择(), 3);

	this.lnav3_btn = new lib.选择();
	this.lnav3_btn.name = "lnav3_btn";
	this.lnav3_btn.setTransform(189.45,861.65,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.lnav3_btn, 0, 1, 2, false, new lib.选择(), 3);

	this.lnav2_btn = new lib.选择();
	this.lnav2_btn.name = "lnav2_btn";
	this.lnav2_btn.setTransform(157.75,861.65,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.lnav2_btn, 0, 1, 2, false, new lib.选择(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.lnav2_btn},{t:this.lnav3_btn},{t:this.lnav1_btn}]}).wait(327));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1069.8,623.8,737.1000000000001,255.20000000000005);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#F7C677",
	opacity: 0.00,
	manifest: [
		{src:"images/小猫_.png?1693884116843", id:"小猫"},
		{src:"images/小猫bgpng.png?1693884116843", id:"小猫bgpng"},
		{src:"images/Bitmap1.png?1693884116843", id:"Bitmap1"},
		{src:"images/Bitmap2.png?1693884116843", id:"Bitmap2"},
		{src:"images/Bitmap3.png?1693884116843", id:"Bitmap3"},
		{src:"images/Bitmap4.png?1693884116843", id:"Bitmap4"},
		{src:"images/图层0.png?1693884116843", id:"图层0"},
		{src:"images/图层0png复制.png?1693884116843", id:"图层0png复制"},
		{src:"images/图层1png复制2.png?1693884116843", id:"图层1png复制2"},
		{src:"images/图层2png复制2.png?1693884116843", id:"图层2png复制2"},
		{src:"images/图层3.png?1693884116843", id:"图层3"},
		{src:"images/图层5png复制.png?1693884116843", id:"图层5png复制"},
		{src:"images/图层6png复制.png?1693884116843", id:"图层6png复制"},
		{src:"images/羊_.png?1693884116843", id:"羊"},
		{src:"images/羊头_.png?1693884116843", id:"羊头"},
		{src:"sounds/小猫_1.mp3?1693884116843", id:"小猫_1"},
		{src:"sounds/yx12040102小鸭子.mp3?1693884116843", id:"yx12040102小鸭子"},
		{src:"sounds/yx12040104小鸡.mp3?1693884116843", id:"yx12040104小鸡"},
		{src:"sounds/yx12040105蜜蜂.mp3?1693884116843", id:"yx12040105蜜蜂"},
		{src:"sounds/yx12040106小狗.mp3?1693884116843", id:"yx12040106小狗"},
		{src:"sounds/羊_1.mp3?1693884116843", id:"羊_1"}
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