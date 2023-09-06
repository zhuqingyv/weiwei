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



(lib.木鱼bg = function() {
	this.initialize(img.木鱼bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,750,552);


(lib.木鱼棒 = function() {
	this.initialize(img.木鱼棒);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,228,109);


(lib.听筒 = function() {
	this.initialize(img.听筒);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,264,131);


(lib._3电话 = function() {
	this.initialize(img._3电话);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,752,563);


(lib.水滴 = function() {
	this.initialize(img.水滴);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,84,126);


(lib.水滴bg = function() {
	this.initialize(img.水滴bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,574,468);


(lib.水龙头bg = function() {
	this.initialize(img.水龙头bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,653,558);


(lib.Bitmap1 = function() {
	this.initialize(img.Bitmap1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,272,451);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,84,126);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,84,126);


(lib.Bitmap5 = function() {
	this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,272,451);


(lib.Bitmap6 = function() {
	this.initialize(img.Bitmap6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,272,451);


(lib.Bitmap7 = function() {
	this.initialize(img.Bitmap7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,235,191);


(lib.座机 = function() {
	this.initialize(img.座机);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,190,129);


(lib.皮球 = function() {
	this.initialize(img.皮球);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,160,158);


(lib.皮球bg = function() {
	this.initialize(img.皮球bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,596,549);


(lib.碰钟 = function() {
	this.initialize(img.碰钟);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,177,187);// helper functions:

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


(lib.ClipGroup_3 = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("AksCKIAAkTIJZAAIAAETg");
	mask.setTransform(30.1,13.775);

	// 图层_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AASAzQgCgGgIgGQgIgGAEABIALADQAGABADgDQAEgEABgOQABgNgBgTQgBgUgBgGQgCgGgTAFIgZAHQgHACgGgDQgEgEAEAAIASgDIAVgEIANgFQAEgCAEABIAIAFQAGADgCACQgCACgBAFQgBAGABALIABAYQABANgCANQgCAMgIAHQgEAEgCAAQgBAAAAAAQgBAAAAgBQAAAAgBgBQAAAAAAgBgAgeAiIgIgGQgEgFAGAAQAGgBAOgIIAYgOQAMgGgIAGIgTARQgMAJgEAFQgDADgCAAIgCAAgAgLgGQgGgEgEgHQgGgHAKADQAJACADAEQACAEgBAFQAAAAgBABQAAAAAAABQAAAAgBAAQAAAAAAAAQgCAAgDgCg");
	this.shape.setTransform(38.27,15.2718);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgkA6QAMgEAIgGQAIgFADgEQgQgLgHABQgLAMgLAGQgMAGAKgIQAKgIAIgKQAHgKACgHIgFgRQgDgKgCgCQgBgBAAgBQAAAAAAgBQAAAAABgBQAAAAABAAIAGAAIAOgDQANgDACgCQAEgDAEACQAEABADACQABABABAAQAAABAAAAQAAABAAAAQAAABgBAAQgCADgCAKQgBALgCAEQgCAFgCAAIgDgFIgYAEQAAAAAAABQAAAAAAABQAAAAgBABQAAAAAAABQAFADgBACIgEAEIAPgDQAHgBACgCQADgCADABIAHAEQAEACgDADQgDABgCAFIgHAKQAQAIAIACIALAEIAOABQAJABgKACQgKADgHAAQgGACgEgCIgKgFIgPgKQgPAOgRACIgIAAQgBAAAAAAQgBAAABAAQAAgBACAAQABgBACAAgAgZAaIALACIANAHQABgCACgFIACgGQAAgBAAAAQAAgBAAAAQAAAAAAgBQgBAAAAAAQgCgBgPAFQgEACgFgDgAAAgOQACACgIADQgIACgJAAIACAKIAZgDIABgQQAAgJgDAAQgDgBgYAGIABAJIAPgDIAGgBIADABgAgwgXQAIgIAFgLQAGgJgBgEQgBgFAEABIAIAEQABAAAAABQABAAAAABQAAAAgBABQAAABgBAAIgLAOQAIAAATgHQASgGAEACQACAAAAAAQABABAAAAQAAAAAAABQAAAAgBABQgBACgSAEIgXAFIgLAAQgHAJgIAFIgEABQgBAAAEgEg");
	this.shape_1.setTransform(26.9127,15.7992);

	var maskedShapeInstanceList = [this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3, new cjs.Rectangle(16.5,5.8,30.5,19.7), null);


(lib.ClipGroup_2 = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("AkpEXIAAotIJTAAIAAItg");
	mask.setTransform(29.825,27.9);

	// 图层_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E57F12").s().p("AgMBdQgJgHgBgMIgOiNQgBgMAIgJQAIgJAMgBIABgBQALgBAJAHQAKAJABAMIAOCMQABAMgIAKQgIAJgMABIgBAAIgDAAQgJAAgJgHg");
	this.shape.setTransform(34.575,40.25);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(30.9,30.3,7.399999999999999,19.999999999999996), null);


(lib.ClipGroup_1 = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("AjhhBIAAgjIFzhjIBQEqIl7Blg");
	mask.setTransform(22.575,20.025);

	// 图层_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E57F12").s().p("AACAWIgBgNQgBgIgBgEQgEgLgSgJQAUgCANAOQANAMABAXQgRgDgFABg");
	this.shape.setTransform(36.625,8.5811);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E57F12").s().p("AhXBbIAYgfQADgEAIAAIBYgHQAOgBAJgKQAIgJgBgOIgIhkQAKgJAMACIAIBmQABASgGAIQgHAJgRADQgSADgZACIgrADQgNABgGAIIgPAUQgGAIgKAAQgEAAgGgCg");
	this.shape_1.setTransform(31.5391,26.2671);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F2A468").s().p("AgECLQgWgbglAHQgNACgTABIggACQgOABgJgIQgKgHgBgOIgPi8QAAgNAHgJQAIgJANgBIEWgWIAEAAQAQACAHAMQAHAMgDASQgBADgDACIgHADQgSALACAUQACATAUAIIAGABQAEABABADQADAFAAAHIAGBSQACAUgIAJQgJAKgTABIg/AFIgOADIgOADQgDAAgCADIgEAFIgKANQgGAHgHACQgFADgFAAQgHAAgGgIg");
	this.shape_2.setTransform(20.8103,20.9156);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(3.2,6.2,37.199999999999996,29.500000000000004), null);


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
	this.instance = new lib.听筒();
	this.instance.setTransform(-132,-65.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-132,-65.5,264,131);


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
	this.shape.graphics.f().s("#7F5A25").ss(9,0,0,4).p("Ah9C3QBgAUCNgQQBUgJAEg0QAEgvg2gqQg4gshAAIQhLAKgtBYQgXAtgMAnQgfBkAvA4QAiApBLAYQA/ANBRgFQCjgKAUACAkaiqQASAkAmAYQAuAcA0gCQA4gCAhglQAhglgWgoQgVgmg1gMQg5gOg2AfQgnAWgeApgAAHmDQgtgYg7gBQh0gEg8BuQghA+ARA3QADAKAEAJQgTAcgQAkIgIA2QgEBAAZAyQAuBeCFAb");
	this.shape.setTransform(0.0224,-0.0128);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.1,-48.6,74.30000000000001,94.5);


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
	this.instance = new lib.木鱼棒();
	this.instance.setTransform(-114,-54.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-114,-54.5,228,109);


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
	this.instance = new lib.碰钟();
	this.instance.setTransform(-58.65,-62,1.0047,1.0047);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.6,-62,117.30000000000001,124);


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
	this.instance = new lib.碰钟();
	this.instance.setTransform(-58.65,-62,1.0047,1.0047);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-58.6,-62,117.30000000000001,124);


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
	this.instance = new lib.水滴();
	this.instance.setTransform(-42,-63);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42,-63,84,126);


(lib.元件11 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#D9DAD5").s().p("AkJByQhtgvgBhDQABhCBtgvQBvgwCaAAQCcAABtAwQBuAvAABCQAABDhuAvQhtAwicAAQiaAAhvgwg");
	this.shape.setTransform(37.55,16.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件11, new cjs.Rectangle(0,0,75.1,32.4), null);


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
	this.instance = new lib.皮球();
	this.instance.setTransform(0,0,0.8525,0.8525);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件10, new cjs.Rectangle(0,0,136.4,134.7), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(81,193,225,0)").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape.setTransform(3.55,3.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(81,193,225,0.078)").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_1.setTransform(3.55,3.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(81,193,225,0.153)").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_2.setTransform(3.55,3.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(81,193,225,0.231)").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_3.setTransform(3.55,3.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(81,193,225,0.306)").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_4.setTransform(3.55,3.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(81,193,225,0.384)").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_5.setTransform(3.55,3.55);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(81,193,225,0.463)").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_6.setTransform(3.55,3.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(81,193,225,0.537)").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_7.setTransform(3.55,3.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(81,193,225,0.616)").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_8.setTransform(3.55,3.55);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(81,193,225,0.694)").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_9.setTransform(3.55,3.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(81,193,225,0.769)").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_10.setTransform(3.55,3.55);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(81,193,225,0.847)").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_11.setTransform(3.55,3.55);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(81,193,225,0.922)").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_12.setTransform(3.55,3.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#51C1E1").s().p("AgYAZQgLgKAAgPQAAgOALgKQAKgLAOAAQAPAAAKALQALAKAAAOQAAAPgLAKQgKALgPAAQgOAAgKgLg");
	this.shape_13.setTransform(3.55,3.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,7.1,7.1);


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


(lib.Group = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ClipGroup_3();
	this.instance.setTransform(30.1,13.8,1,1,0,0,0,30.1,13.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group, new cjs.Rectangle(0,0,60.2,27.6), null);


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
	this.instance = new lib.元件10();
	this.instance.setTransform(68.2,61.1,1,1,0,0,0,68.2,67.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleY:0.9768,y:99.45},0).wait(1).to({scaleY:0.9541,y:137.85},0).wait(1).to({scaleY:1.0288,y:176.25},0).wait(1).to({scaleY:1.1546,y:214.6},0).wait(1).to({scaleY:1.109,y:253},0).wait(1).to({scaleY:1.0647,y:228.4},0).wait(1).to({scaleY:1.0322,y:203.8},0).wait(1).to({scaleY:1.0132,y:179.25},0).wait(1).to({scaleY:0.9946,y:154.65},0).wait(1).to({scaleY:0.9766,y:130.1},0).wait(1).to({scaleY:0.9719,y:105.5},0).wait(1).to({scaleY:0.973,y:80.95},0).wait(1).to({scaleY:0.9742,y:108},0).wait(1).to({scaleY:0.9753,y:135.1},0).wait(1).to({scaleY:0.9763,y:162.15},0).wait(1).to({scaleY:0.9774,y:189.25},0).wait(1).to({scaleY:0.9784,y:216.3},0).wait(1).to({scaleY:0.9794,y:243.35},0).wait(1).to({scaleY:0.9803,y:222},0).wait(1).to({scaleY:0.9813,y:200.55},0).wait(1).to({scaleY:0.9822,y:179.1},0).wait(1).to({scaleY:0.983,y:157.7},0).wait(1).to({scaleY:0.9839,y:136.25},0).wait(1).to({scaleY:0.9847,y:114.85},0).wait(1).to({scaleY:0.9855,y:93.4},0).wait(1).to({scaleY:0.9863,y:118.25},0).wait(1).to({scaleY:0.987,y:143.15},0).wait(1).to({scaleY:0.9877,y:167.95},0).wait(1).to({scaleY:0.9884,y:192.75},0).wait(1).to({scaleY:0.9891,y:217.6},0).wait(1).to({scaleY:0.9898,y:242.45},0).wait(1).to({scaleY:0.9904,y:220.6},0).wait(1).to({scaleY:0.991,y:198.75},0).wait(1).to({scaleY:0.9917,y:176.85},0).wait(1).to({scaleY:0.9922,y:155},0).wait(1).to({scaleY:0.9928,y:133.1},0).wait(1).to({scaleY:0.9934,y:111.25},0).wait(1).to({scaleY:0.9939,y:89.4},0).wait(1).to({scaleY:0.9945,y:115.25},0).wait(1).to({scaleY:0.995,y:141.1},0).wait(1).to({scaleY:0.9955,y:167},0).wait(1).to({scaleY:0.996,y:192.85},0).wait(1).to({scaleY:0.9964,y:218.7},0).wait(1).to({scaleY:0.9969,y:244.6},0).wait(1).to({scaleY:0.9974,y:226.2},0).wait(1).to({scaleY:0.9978,y:207.85},0).wait(1).to({scaleY:0.9983,y:189.55},0).wait(1).to({scaleY:0.9987,y:171.15},0).wait(1).to({scaleY:0.9991,y:152.85},0).wait(1).to({scaleY:0.9996,y:134.45},0).wait(1).to({scaleY:1,y:116.15},0).wait(1).to({y:97.8},0).wait(1).to({y:79.45},0).wait(1).to({y:61.1},0).wait(4));

	// 图层_3
	this.instance_1 = new lib.元件11();
	this.instance_1.setTransform(68.65,303.55,1,1,0,0,0,37.6,16.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:37.5,scaleX:1.0959,x:68.55},0).wait(1).to({scaleX:1.1917},0).wait(1).to({scaleX:1.2876},0).wait(1).to({scaleX:1.3835},0).wait(1).to({scaleX:1.4794},0).wait(1).to({scaleX:1.4109,x:68.5},0).wait(1).to({scaleX:1.3424},0).wait(1).to({scaleX:1.2739},0).wait(1).to({scaleX:1.2054},0).wait(1).to({scaleX:1.137,x:68.55},0).wait(1).to({scaleX:1.0685,x:68.5},0).wait(1).to({scaleX:1,x:68.55},0).wait(1).to({scaleX:1.0799},0).wait(1).to({scaleX:1.1598},0).wait(1).to({scaleX:1.2397},0).wait(1).to({scaleX:1.3196},0).wait(1).to({scaleX:1.3995},0).wait(1).to({scaleX:1.4794},0).wait(1).to({scaleX:1.4109,x:68.5},0).wait(1).to({scaleX:1.3424},0).wait(1).to({scaleX:1.2739},0).wait(1).to({scaleX:1.2054},0).wait(1).to({scaleX:1.137,x:68.55},0).wait(1).to({scaleX:1.0685,x:68.5},0).wait(1).to({scaleX:1,x:68.55},0).wait(1).to({scaleX:1.0799},0).wait(1).to({scaleX:1.1598},0).wait(1).to({scaleX:1.2397},0).wait(1).to({scaleX:1.3196},0).wait(1).to({scaleX:1.3995},0).wait(1).to({scaleX:1.4794},0).wait(1).to({scaleX:1.4109,x:68.5},0).wait(1).to({scaleX:1.3424},0).wait(1).to({scaleX:1.2739},0).wait(1).to({scaleX:1.2054},0).wait(1).to({scaleX:1.137,x:68.55},0).wait(1).to({scaleX:1.0685,x:68.5},0).wait(1).to({scaleX:1,x:68.55},0).wait(1).to({scaleX:1.0799},0).wait(1).to({scaleX:1.1598},0).wait(1).to({scaleX:1.2397},0).wait(1).to({scaleX:1.3196},0).wait(1).to({scaleX:1.3995},0).wait(1).to({scaleX:1.4794},0).wait(1).to({scaleX:1.4314},0).wait(1).to({scaleX:1.3835},0).wait(1).to({scaleX:1.3355},0).wait(1).to({scaleX:1.2876},0).wait(1).to({scaleX:1.2397},0).wait(1).to({scaleX:1.1917},0).wait(1).to({scaleX:1.1438},0).wait(1).to({scaleX:1.0959},0).wait(1).to({scaleX:1.0479},0).wait(1).to({scaleX:1},0).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-6.2,136.4,333.9);


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

	// 图层_2
	this.instance = new lib.补间5("synched",0);
	this.instance.setTransform(6.75,116.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(55).to({startPosition:0},0).to({_off:true},1).wait(12));

	// 图层_1
	this.instance_1 = new lib.补间6("synched",0);
	this.instance_1.setTransform(132,65.5,1,1,4.7062);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({rotation:-4.223},2).to({rotation:4.7062},2).to({rotation:-4.223},2).to({rotation:4.7062},2).to({rotation:-4.223},2).to({rotation:4.7062},2).to({rotation:-4.223},2).to({rotation:4.7062},2).to({rotation:-4.223},2).to({rotation:4.7062},2).to({rotation:-4.223},2).to({rotation:4.7062},2).to({rotation:-4.223},2).to({rotation:4.7062},2).to({rotation:-4.223},2).to({rotation:4.7062},2).to({startPosition:0},23).to({_off:true},1).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.4,-10.6,299.29999999999995,172.79999999999998);


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
	this.instance = new lib.补间4("synched",0);
	this.instance.setTransform(228,0,1,1,0,0,0,114,-54.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regY:-54.6,rotation:35.7179,y:-0.05},2).to({rotation:-5.2505,y:-0.1},3).to({rotation:35.7179,y:-0.05},11).to({rotation:-5.2505,y:-0.1},3).wait(17).to({rotation:-5.2505},0).to({_off:true},1).wait(26));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-24.7,-133,262.7,262.4);


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
	this.shape.graphics.f().s("#CC3300").ss(9,0,0,4).p("A4pHpQgKgpAUhDQApiHCaiGQDLiuD9iKQEqijEuhIQL+i2JOGyQHQFVBBBxQAdAzgpARQghAOhdgGQh4gKhDgFQh6gJhKAFQjXARAKCY");
	this.shape.setTransform(220.97,7.701);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#CC3300").ss(9,0,0,4).p("A3AHrQgLgpAQhBQAHgcAMgcQAthqBzhpQA2gxA9gvQAygmAwgoQAqggAqglQAqgkAvgeQBAgpArgWQCZhNCdgyQBAgVBNgTQAagGAagHQA5gNA3gKQDNgnC5AHQCVAECKAiQCDAhB+A7QCJBBCIBkQAFADAGAEQCBBgBUBRQBiBaAvBEQA+BHAMApQAVAugoARQgOAGgXADQgiAEgygBQhmgEhBgEQgIAAgIgBQh1gIhJAHQjPAUAMCU");
	this.shape_1.setTransform(221.2533,8.1036);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#CC3300").ss(9,0,0,4).p("A1XHtQgNgoAOg/QAFgbAKgcQAnhqBshoQAzgxA7guQAxgmApgqQAkggAhgrQAhgoApgfQA5grArgWQCUhMCbguQA5gSBRgTQAagGAZgGQA5gNA1gKQDLgoCwAEQCSACCFAgQB/AeB7A8QCBA9CIBkQAFAEAFAEQCBBeBFBWQBRBZAZBHQAsBDgBApQAMApgmAQQgOAGgWAEQgiAGgvABQhiABhAgEQgIAAgIgBQhxgGhHAIQjIAXAPCR");
	this.shape_2.setTransform(221.5542,8.4859);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#CC3300").ss(9,0,0,4).p("AzxHvQgNgoAKg8QAEgaAIgcQAhhrBkhmQAwgwA5guQAxgmAigtQAdggAYgwQAZgtAigfQAzguArgWQCOhKCZgqQAygQBXgSQAZgGAYgFQA4gMAzgKQDKgqCmABQCQgBCAAeQB6AcB4A8QB5A7CIBkQAFAEAFADQCABeA3BZQBBBZABBLQAZA+gNAoQAEAkgkAQQgPAHgVAEQghAIgsACQheAGhAgDQgIAAgIAAQhsgFhFAKQjBAaASCN");
	this.shape_3.setTransform(222.1239,8.8484);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#CC3300").ss(9,0,0,4).p("AyUHwQgPgnAHg5QADgZAHgbQAahsBdhkQAtgxA4guQAvgmAbgvQAWgfAQg2QAQgxAbgfQAugyAqgWQCKhICWgnQArgMBbgSQAZgFAXgFQA4gMAxgKQDIgqCdgDQCOgEB6AcQB1AbB2A7QBxA5CIBkQAFADAFAEQB/BdAoBdQAwBYgVBOQAHA6gbAoQgDAfgjAPQgPAHgTAFQgiAKgpAEQhaAKg/gBQgIgBgHAAQhpgDhEALQi5AdAUCK");
	this.shape_4.setTransform(223.6436,9.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#CC3300").ss(9,0,0,4).p("AxGHzQgQgnAEg2QABgZAFgbQAUhsBVhjQAqgwA3gtQAugnAUgxQAQgfAHg7QAHg2AVggQAog0AqgWQCEhGCUgjQAkgKBggSQAYgEAXgFQA3gLAvgKQDGgsCTgFQCMgHB1AaQBwAZBzA7QBpA2CJBkQAFADAFAEQB9BcAbBhQAfBYgtBRQgLA2gnAnQgLAagiAPQgPAHgSAGQgiALgmAGQhVAPhAgBQgHAAgHAAQhkgBhDAMQiyAgAXCH");
	this.shape_5.setTransform(226.6163,9.4758);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#CC3300").ss(9,0,0,4).p("Av9H1QgQgmAAg0QAAgYADgaQAOhtBOhhQAngwA1gtQAtgnANgzQAKgegDhBQgBg7APggQAhg3AqgWQB/hECSggQAdgHBlgRQAXgFAWgEQA3gKAsgKQDFgtCKgJQCJgJBwAYQBsAWBwA8QBhAzCJBkQAFAEAEADQB9BbAMBlQAPBYhEBUQgeAygzAmQgUAVggAPQgPAHgRAGQgiANgjAIQhRAUg/AAQgHAAgHAAQhgAAhBAOQirAjAaCE");
	this.shape_6.setTransform(230.0106,9.7653);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#CC3300").ss(9,0,0,4).p("Au2H4QgZg3AFhRQAKijCbiGQAsgnAGg2QADgegLhGQgKhAAIggQANgxA5gfQB5hCCQgcQAWgEBqgRQBRgOA7gOQDDguCBgMQCHgMBqAWQBnAVBuA8QBbAyCPBpQB8BagCBoQgBBYhbBXQhQBMh6A0Qh0AyhaAAQlXADAoC1");
	this.shape_7.setTransform(233.7356,10.0236);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).wait(33));

	// 图层_1_复制
	this.instance = new lib.补间2("synched",0);
	this.instance.setTransform(302.65,54,1,1,0,0,0,0,-62);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:247.75},7).to({regX:0.1,regY:-61.9,rotation:-11.4433,x:247.85,y:54.1},2).to({regX:0,regY:-62,rotation:0,x:247.75,y:54},2).to({regX:0.1,regY:-61.9,rotation:-18.7042,x:247.85,y:53.95},2).to({regX:0,regY:-62,rotation:0,x:247.75,y:54},2).wait(25));

	// 图层_1
	this.instance_1 = new lib.补间3("synched",0);
	this.instance_1.setTransform(58.65,54,1,1,0,0,0,0,-62);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:136.35},7).to({regX:0.1,regY:-61.9,rotation:13.4336,x:136.45,y:54.1},2).to({regX:0,regY:-62,rotation:0,x:136.35,y:54},2).to({rotation:9.1753,x:136.4,y:54.05},2).to({rotation:0,x:136.35,y:54},2).wait(25));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-46.5,390.7,236.7);


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
	this.instance = new lib.补间1("synched",0);
	this.instance.setTransform(42,-14,0.4821,0.4821);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:0.7563,scaleY:0.7563,y:203.15},11).to({regX:0.1,regY:0.1,scaleX:0.6892,scaleY:0.6892,x:44.85,y:232.7,alpha:0},2).wait(27).to({startPosition:0},0).to({_off:true},1).wait(3));

	// 图层_2_复制_复制
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#44B3C5").ss(3,0,0,4).p("ACeAAQAAANgvAKQguAJhBAAQhAAAgugJQgvgKAAgNQAAgMAvgKQAugJBAAAQBBAAAuAJQAvAKAAAMg");
	this.shape.setTransform(41.375,247.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#44B3C5").ss(3,0,0,4).p("AkGAAQAAgWBOgPQBNgPBsAAQBsAABNAPQBNAPAAAWQAAAXhNAPQhNAPhsAAQhsAAhNgPQhOgPAAgXg");
	this.shape_1.setTransform(41.4,247.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#44B3C5").ss(3,0,0,4).p("AlvAAQAAgfBsgVQBsgVCYAAQCXAABsAVQBsAVAAAfQAAAghsAVQhsAViXAAQiYAAhsgVQhsgVAAggg");
	this.shape_2.setTransform(41.425,247.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#44B3C5").ss(3,0,0,4).p("AnYAAQAAgoCLgcQCKgbDDAAQDDAACKAbQCMAcAAAoQAAApiMAbQiKAcjDAAQjDAAiKgcQiLgbAAgpg");
	this.shape_3.setTransform(41.45,247.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#44B3C5").ss(3,0,0,4).p("ApBAAQAAgwCqgjQCpghDvAAQDuAACpAhQCqAjAAAwQAAAxiqAiQipAijuAAQjvAAipgiQiqgiAAgxg");
	this.shape_4.setTransform(41.475,247.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#44B3C5").ss(3,0,0,4).p("AKsAAQAAA6jKAoQjHApkaAAQkbAAjHgpQjKgoAAg6QAAg5DKgpQDHgnEbAAQEaAADHAnQDKApAAA5g");
	this.shape_5.setTransform(41.5,247.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("rgba(68,179,197,0.89)").ss(3,0,0,4).p("AsbAAQAAhDDrgwQDogtFJAAQFHAADpAtQDrAwAABDQAABEjrAuQjpAvlHAAQlJAAjogvQjrguAAhEg");
	this.shape_6.setTransform(41.5,247.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("rgba(68,179,197,0.776)").ss(3,0,0,4).p("AuKAAQAAhNEMg2QEIg0F4AAQF1AAEJA0QELA2AABNQAABNkLA0QkJA3l1AAQl4AAkIg3QkMg0AAhNg");
	this.shape_7.setTransform(41.5,247.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("rgba(68,179,197,0.667)").ss(3,0,0,4).p("Av6AAQAAhWEsg9QEqg7GlAAQGkAAEqA7QEsA9AABWQAABYksA6QkqA8mkAAQmlAAkqg8Qksg6AAhYg");
	this.shape_8.setTransform(41.5,247.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("rgba(68,179,197,0.557)").ss(3,0,0,4).p("AxqAAQAAhgFNhDQFKhBHUAAQHTAAFKBBQFNBDAABgQAABhlNBAQlKBEnTAAQnUAAlKhEQlNhAAAhhg");
	this.shape_9.setTransform(41.5,247.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("rgba(68,179,197,0.443)").ss(3,0,0,4).p("AzaAAQAAhqFvhKQFqhHIDAAQIAAAFrBHQFuBKAABqQAABqluBHQlrBLoAAAQoDAAlqhLQlvhHAAhqg");
	this.shape_10.setTransform(41.5,247.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("rgba(68,179,197,0.333)").ss(3,0,0,4).p("A1KAAQAAhzGQhRQGLhNIxAAQIuAAGMBNQGPBRAABzQAAB0mPBNQmMBRouAAQoxAAmLhRQmQhNAAh0g");
	this.shape_11.setTransform(41.5,247.525);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("rgba(68,179,197,0.224)").ss(3,0,0,4).p("A26ABQAAh+GxhXQGshUJfAAQJcAAGsBUQGxBXAAB+QAAB9mxBTQmsBYpcAAQpfAAmshYQmxhTAAh9g");
	this.shape_12.setTransform(41.5,247.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("rgba(68,179,197,0.11)").ss(3,0,0,4).p("A4pAAQAAiGHRhfQHMhaKOAAQKLAAHMBaQHRBfAACGQAACHnRBaQnMBfqLAAQqOAAnMhfQnRhaAAiHg");
	this.shape_13.setTransform(41.5,247.525);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("rgba(68,179,197,0)").ss(3,0,0,4).p("AaaAAQAACRnyBgQntBlq4AAQq9AAnthlQnyhgAAiRQAAiQHyhlQHthgK9AAQK4AAHtBgQHyBlAACQg");
	this.shape_14.setTransform(41.5,247.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},21).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_14}]},5).to({state:[]},1).wait(3));

	// 图层_2_复制
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#44B3C5").ss(3,0,0,4).p("ACeAAQAAANgvAKQguAJhBAAQhAAAgugJQgvgKAAgNQAAgMAvgKQAugJBAAAQBBAAAuAJQAvAKAAAMg");
	this.shape_15.setTransform(41.375,247.5);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#44B3C5").ss(3,0,0,4).p("AkGAAQAAgWBOgPQBNgPBsAAQBsAABNAPQBNAPAAAWQAAAXhNAPQhNAPhsAAQhsAAhNgPQhOgPAAgXg");
	this.shape_16.setTransform(41.4,247.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#44B3C5").ss(3,0,0,4).p("AlvAAQAAgfBsgVQBsgVCYAAQCXAABsAVQBsAVAAAfQAAAghsAVQhsAViXAAQiYAAhsgVQhsgVAAggg");
	this.shape_17.setTransform(41.425,247.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#44B3C5").ss(3,0,0,4).p("AnYAAQAAgoCLgcQCKgbDDAAQDDAACKAbQCMAcAAAoQAAApiMAbQiKAcjDAAQjDAAiKgcQiLgbAAgpg");
	this.shape_18.setTransform(41.45,247.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#44B3C5").ss(3,0,0,4).p("ApBAAQAAgwCqgjQCpghDvAAQDuAACpAhQCqAjAAAwQAAAxiqAiQipAijuAAQjvAAipgiQiqgiAAgxg");
	this.shape_19.setTransform(41.475,247.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#44B3C5").ss(3,0,0,4).p("AKsAAQAAA6jKAoQjHApkaAAQkbAAjHgpQjKgoAAg6QAAg5DKgpQDHgnEbAAQEaAADHAnQDKApAAA5g");
	this.shape_20.setTransform(41.5,247.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("rgba(68,179,197,0.89)").ss(3,0,0,4).p("AsbAAQAAhDDrgwQDogtFJAAQFHAADpAtQDrAwAABDQAABEjrAuQjpAvlHAAQlJAAjogvQjrguAAhEg");
	this.shape_21.setTransform(41.5,247.5);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("rgba(68,179,197,0.776)").ss(3,0,0,4).p("AuKAAQAAhNEMg2QEIg0F4AAQF1AAEJA0QELA2AABNQAABNkLA0QkJA3l1AAQl4AAkIg3QkMg0AAhNg");
	this.shape_22.setTransform(41.5,247.525);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("rgba(68,179,197,0.667)").ss(3,0,0,4).p("Av6AAQAAhWEsg9QEqg7GlAAQGkAAEqA7QEsA9AABWQAABYksA6QkqA8mkAAQmlAAkqg8Qksg6AAhYg");
	this.shape_23.setTransform(41.5,247.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("rgba(68,179,197,0.557)").ss(3,0,0,4).p("AxqAAQAAhgFNhDQFKhBHUAAQHTAAFKBBQFNBDAABgQAABhlNBAQlKBEnTAAQnUAAlKhEQlNhAAAhhg");
	this.shape_24.setTransform(41.5,247.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("rgba(68,179,197,0.443)").ss(3,0,0,4).p("AzaAAQAAhqFvhKQFqhHIDAAQIAAAFrBHQFuBKAABqQAABqluBHQlrBLoAAAQoDAAlqhLQlvhHAAhqg");
	this.shape_25.setTransform(41.5,247.525);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("rgba(68,179,197,0.333)").ss(3,0,0,4).p("A1KAAQAAhzGQhRQGLhNIxAAQIuAAGMBNQGPBRAABzQAAB0mPBNQmMBRouAAQoxAAmLhRQmQhNAAh0g");
	this.shape_26.setTransform(41.5,247.525);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("rgba(68,179,197,0.224)").ss(3,0,0,4).p("A26ABQAAh+GxhXQGshUJfAAQJcAAGsBUQGxBXAAB+QAAB9mxBTQmsBYpcAAQpfAAmshYQmxhTAAh9g");
	this.shape_27.setTransform(41.5,247.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("rgba(68,179,197,0.11)").ss(3,0,0,4).p("A4pAAQAAiGHRhfQHMhaKOAAQKLAAHMBaQHRBfAACGQAACHnRBaQnMBfqLAAQqOAAnMhfQnRhaAAiHg");
	this.shape_28.setTransform(41.5,247.525);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("rgba(68,179,197,0)").ss(3,0,0,4).p("AaaAAQAACRnyBgQntBlq4AAQq9AAnthlQnyhgAAiRQAAiQHyhlQHthgK9AAQK4AAHtBgQHyBlAACQg");
	this.shape_29.setTransform(41.5,247.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_15}]},16).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},10).to({state:[]},1).wait(3));

	// 图层_2
	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#44B3C5").ss(3,0,0,4).p("ACeAAQAAANgvAKQguAJhBAAQhAAAgugJQgvgKAAgNQAAgMAvgKQAugJBAAAQBBAAAuAJQAvAKAAAMg");
	this.shape_30.setTransform(41.375,247.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#44B3C5").ss(3,0,0,4).p("AkGAAQAAgWBOgPQBNgPBsAAQBsAABNAPQBNAPAAAWQAAAXhNAPQhNAPhsAAQhsAAhNgPQhOgPAAgXg");
	this.shape_31.setTransform(41.4,247.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#44B3C5").ss(3,0,0,4).p("AlvAAQAAgfBsgVQBsgVCYAAQCXAABsAVQBsAVAAAfQAAAghsAVQhsAViXAAQiYAAhsgVQhsgVAAggg");
	this.shape_32.setTransform(41.425,247.5);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#44B3C5").ss(3,0,0,4).p("AnYAAQAAgoCLgcQCKgbDDAAQDDAACKAbQCMAcAAAoQAAApiMAbQiKAcjDAAQjDAAiKgcQiLgbAAgpg");
	this.shape_33.setTransform(41.45,247.5);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#44B3C5").ss(3,0,0,4).p("ApBAAQAAgwCqgjQCpghDvAAQDuAACpAhQCqAjAAAwQAAAxiqAiQipAijuAAQjvAAipgiQiqgiAAgxg");
	this.shape_34.setTransform(41.475,247.5);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#44B3C5").ss(3,0,0,4).p("AKsAAQAAA6jKAoQjHApkaAAQkbAAjHgpQjKgoAAg6QAAg5DKgpQDHgnEbAAQEaAADHAnQDKApAAA5g");
	this.shape_35.setTransform(41.5,247.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("rgba(68,179,197,0.89)").ss(3,0,0,4).p("AsbAAQAAhDDrgwQDogtFJAAQFHAADpAtQDrAwAABDQAABEjrAuQjpAvlHAAQlJAAjogvQjrguAAhEg");
	this.shape_36.setTransform(41.5,247.5);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("rgba(68,179,197,0.776)").ss(3,0,0,4).p("AuKAAQAAhNEMg2QEIg0F4AAQF1AAEJA0QELA2AABNQAABNkLA0QkJA3l1AAQl4AAkIg3QkMg0AAhNg");
	this.shape_37.setTransform(41.5,247.525);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("rgba(68,179,197,0.667)").ss(3,0,0,4).p("Av6AAQAAhWEsg9QEqg7GlAAQGkAAEqA7QEsA9AABWQAABYksA6QkqA8mkAAQmlAAkqg8Qksg6AAhYg");
	this.shape_38.setTransform(41.5,247.5);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("rgba(68,179,197,0.557)").ss(3,0,0,4).p("AxqAAQAAhgFNhDQFKhBHUAAQHTAAFKBBQFNBDAABgQAABhlNBAQlKBEnTAAQnUAAlKhEQlNhAAAhhg");
	this.shape_39.setTransform(41.5,247.5);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("rgba(68,179,197,0.443)").ss(3,0,0,4).p("AzaAAQAAhqFvhKQFqhHIDAAQIAAAFrBHQFuBKAABqQAABqluBHQlrBLoAAAQoDAAlqhLQlvhHAAhqg");
	this.shape_40.setTransform(41.5,247.525);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("rgba(68,179,197,0.333)").ss(3,0,0,4).p("A1KAAQAAhzGQhRQGLhNIxAAQIuAAGMBNQGPBRAABzQAAB0mPBNQmMBRouAAQoxAAmLhRQmQhNAAh0g");
	this.shape_41.setTransform(41.5,247.525);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("rgba(68,179,197,0.224)").ss(3,0,0,4).p("A26ABQAAh+GxhXQGshUJfAAQJcAAGsBUQGxBXAAB+QAAB9mxBTQmsBYpcAAQpfAAmshYQmxhTAAh9g");
	this.shape_42.setTransform(41.5,247.5);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("rgba(68,179,197,0.11)").ss(3,0,0,4).p("A4pAAQAAiGHRhfQHMhaKOAAQKLAAHMBaQHRBfAACGQAACHnRBaQnMBfqLAAQqOAAnMhfQnRhaAAiHg");
	this.shape_43.setTransform(41.5,247.525);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("rgba(68,179,197,0)").ss(3,0,0,4).p("AaaAAQAACRnyBgQntBlq4AAQq9AAnthlQnyhgAAiRQAAiQHyhlQHthgK9AAQK4AAHtBgQHyBlAACQg");
	this.shape_44.setTransform(41.5,247.525);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_30}]},11).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_44}]},15).to({state:[]},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-129,-44.3,341,327.6);


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

	// 图层_8 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("A/aL/IAA39MA+1AAAIAAX9g");
	mask.setTransform(156.325,81.925);

	// 图层_6_复制
	this.instance = new lib.元件4("synched",0);
	this.instance.setTransform(147.9,137.4,1,1,0,0,0,3.6,3.6);
	this.instance._off = true;

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(5).to({_off:false},0).to({regY:3.8,scaleX:0.4128,scaleY:0.4128,x:171.1,y:129.35,startPosition:10},7).to({_off:true},4).wait(1));

	// 图层_6
	this.instance_1 = new lib.元件4("synched",0);
	this.instance_1.setTransform(74.4,147.4,1,1,0,0,0,3.6,3.6);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regY:3.7,scaleX:1.3759,scaleY:1.3759,x:76.05,y:99.2,startPosition:10},10).to({_off:true},6).wait(1));

	// 图层_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#51C1E1").s().p("ABsKIQicgFiogwQiogxiFhPQgcgigCgUQgCgTAVgTQBPg4BDhBQAwhBBpimQBTiDAvgxQA4g9Atg5QA8hKAlgqQA4hBAWhKIAQg6QAJgjAMgYQA4CACagaIgXA1QgaA9gLAqQgMArgFAyQgCAdgBB9QgBB9gJAbQgJAcAOAZQANAZABAFQAAAEAYAPQARAKARAHQA3AngJAvIgRAbQgQAgANAcQAbA8AoAsQAVAXAXAVQgmBqh8AyQhlAqiSAAIgfAAg");
	this.shape.setTransform(104.3411,119.4493);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#51C1E1").s().p("ABnKCQiQgJigg0QiegziHhQQgagfAJgbQAHgUAhgbIA/g1QAmgkAQgnQAhhOB/iYQBBhOBLhTQA8hMA7iJQA7iIA4h3QA4CACbgaIg9CcQgQBggGBOQgWD5AngLQAngKAZANQAYAOgBAIQgBAJgVAtQgVAtARAGQAQAHAWA3QgCBaAEAcQAEAcApAtQAVAXAXAVQgnBphzAwQhWAjh4AAQgaAAgagBg");
	this.shape_1.setTransform(107.6953,118.9779);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#51C1E1").s().p("ABnKCQiQgJigg0QiegziHhQQgagfAJgbQAHgUAhgbQA9gzAAgIQABgIgDgrQgDgrAagpQAbgqE0kbQA8hMA7iJQA7iIA4h3QA4CACbgaIg9CcQgQBggGBOQgWD5AJAKQAJAKAJAPQAIAPABALQAAAKAYAVQAXAVARAGQAQAHAWA3QgCBaAEAcQAEAcApAtQAVAXAXAVQgnBphzAwQhWAjh4AAQgaAAgagBg");
	this.shape_2.setTransform(107.6953,118.9779);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#51C1E1").s().p("ABDKCQiPgJihg0QidgziHhQQgagfAIgbQAHgUAhgbQA9gzABgIQAAgIgDgrQgDgrAbgpQAagqDUjNQCeiaA6iJQA6iIA5h3QA4CACagaIg8CcQgPBfAXCBQAYCCANAZQAOAYgDAYQgDAXAQATQAPATAMATQAMATAJALQAKAMAYA3QAxB1AjAWQAjAWgbAaQgaAbghAVQgmBphzAwQhWAjh5AAQgZAAgbgBg");
	this.shape_3.setTransform(111.211,118.9779);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#51C1E1").s().p("ABDKCQiPgJihg0QidgziHhQQgagfAIgbQAHgUAhgbQA9gzABgIQAAgIgDgrQgDgrAbgpQAagqEsjIICAkoQA6iIA5h3QA4CACagaIg8CcQgPBfAOCEQAOCEgCAbQgDAdADAWQADAVAOAZQAOAaACAOQACAPANAGQANAFAVA3QBrB1AjAWQAjAWgbAaQgaAbghAVQgmBphzAwQhWAjh5AAQgZAAgbgBg");
	this.shape_4.setTransform(111.211,118.9779);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2,this.shape_3,this.shape_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape}]},2).wait(1));

	// 图层_2_png
	this.instance_2 = new lib.Bitmap5();

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(17));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,272,451);


// stage content:
(lib.二 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:4,m2:97,lnav2:138,m3:139,m4:217,lnav3:254,m5:256,m6:325};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,5,94,97,98,135,138,139,140,216,217,218,253,254,256,257,324,325,326,387];
	this.streamSoundSymbolsList[5] = [{id:"yx12050101水龙头流水",startFrame:5,endFrame:94,loop:1,offset:0}];
	this.streamSoundSymbolsList[98] = [{id:"yx12050102滴水",startFrame:98,endFrame:135,loop:1,offset:0}];
	this.streamSoundSymbolsList[140] = [{id:"碰钟_1",startFrame:140,endFrame:216,loop:1,offset:0}];
	this.streamSoundSymbolsList[218] = [{id:"yx12050104木鱼",startFrame:218,endFrame:254,loop:1,offset:0}];
	this.streamSoundSymbolsList[257] = [{id:"yx12050105电话铃声",startFrame:257,endFrame:324,loop:1,offset:0}];
	this.streamSoundSymbolsList[326] = [{id:"yx12050106皮球落地",startFrame:326,endFrame:387,loop:1,offset:0}];
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
		var soundInstance = playSound("yx12050101水龙头流水",0);
		this.InsertIntoSoundStreamData(soundInstance,5,94,1);
	}
	this.frame_94 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_97 = function() {
		var _this = this;
		
		_this.m2stop_btn.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_98 = function() {
		var soundInstance = playSound("yx12050102滴水",0);
		this.InsertIntoSoundStreamData(soundInstance,98,135,1);
	}
	this.frame_135 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_138 = function() {
		this.stop();
		
		var _this = this;
		
		_this.m3_btn.on('click', function(){
		
		_this.gotoAndPlay('m3');
		});
		
		
		
		_this.m4_btn.on('click', function(){
		
		_this.gotoAndPlay('m4');
			
		});
	}
	this.frame_139 = function() {
		var _this = this;
		
		_this.m3stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav2');
		});
	}
	this.frame_140 = function() {
		var soundInstance = playSound("碰钟_1",0);
		this.InsertIntoSoundStreamData(soundInstance,140,216,1);
	}
	this.frame_216 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav2');
	}
	this.frame_217 = function() {
		var _this = this;
		
		_this.m4stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav2');
		});
	}
	this.frame_218 = function() {
		var soundInstance = playSound("yx12050104木鱼",0);
		this.InsertIntoSoundStreamData(soundInstance,218,254,1);
	}
	this.frame_253 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav2');
	}
	this.frame_254 = function() {
		var _this = this;
		
		_this.m5_btn.on('click', function(){
		
		_this.gotoAndPlay('m5');
		});
		
		
		
		_this.m6_btn.on('click', function(){
		
		_this.gotoAndPlay('m6');
			
		});
	}
	this.frame_256 = function() {
		var _this = this;
		
		_this.m5stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav3');
		});
	}
	this.frame_257 = function() {
		var soundInstance = playSound("yx12050105电话铃声",0);
		this.InsertIntoSoundStreamData(soundInstance,257,324,1);
	}
	this.frame_324 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav3');
	}
	this.frame_325 = function() {
		var _this = this;
		
		_this.m6stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav3');
		});
	}
	this.frame_326 = function() {
		var soundInstance = playSound("yx12050106皮球落地",0);
		this.InsertIntoSoundStreamData(soundInstance,326,387,1);
	}
	this.frame_387 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav3');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(89).call(this.frame_94).wait(3).call(this.frame_97).wait(1).call(this.frame_98).wait(37).call(this.frame_135).wait(3).call(this.frame_138).wait(1).call(this.frame_139).wait(1).call(this.frame_140).wait(76).call(this.frame_216).wait(1).call(this.frame_217).wait(1).call(this.frame_218).wait(35).call(this.frame_253).wait(1).call(this.frame_254).wait(2).call(this.frame_256).wait(1).call(this.frame_257).wait(67).call(this.frame_324).wait(1).call(this.frame_325).wait(1).call(this.frame_326).wait(61).call(this.frame_387).wait(1));

	// 音频停止
	this.m1stop_btn = new lib.音频停止();
	this.m1stop_btn.name = "m1stop_btn";
	this.m1stop_btn.setTransform(584.9,362.8,1,1,0,0,0,42.2,52);
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
	this.m5stop_btn.setTransform(508.2,361.55,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m5stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m6stop_btn = new lib.音频停止();
	this.m6stop_btn.name = "m6stop_btn";
	this.m6stop_btn.setTransform(1425.75,361.3,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m6stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1stop_btn}]},4).to({state:[]},90).to({state:[{t:this.m2stop_btn}]},3).to({state:[]},41).to({state:[{t:this.m3stop_btn}]},2).to({state:[{t:this.m4stop_btn}]},78).to({state:[]},36).to({state:[{t:this.m5stop_btn}]},3).to({state:[{t:this.m6stop_btn}]},69).to({state:[]},61).wait(1));

	// 播放按钮
	this.m1_btn = new lib.音频播放标();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(537.6,315.7);
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
	this.m5_btn.setTransform(460.1,315.7);
	new cjs.ButtonHelper(this.m5_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m6_btn = new lib.音频播放标();
	this.m6_btn.name = "m6_btn";
	this.m6_btn.setTransform(1376.95,315.7);
	new cjs.ButtonHelper(this.m6_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m2_btn},{t:this.m1_btn}]}).to({state:[{t:this.m4_btn},{t:this.m3_btn}]},138).to({state:[{t:this.m6_btn},{t:this.m5_btn}]},116).wait(134));

	// 边框和标题
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ag1EBQgDgIgHgEQgHgGgOgEQgOgEgWgCIAAgKIALABIAaACIAdACIASAAQAJAAADgDQADgDABgHIAAnkIA7AGQAAAHgFAEQgFAEgLACIAAAtQALA2AQAuQARAuAUAmQAXgWAXgaQAWgZAUgZQAUgZAMgUIA3AiQgDAEgEACQgGABgKgDQgQARgYAVQgXATgbAVQgbAUgcASQAnBCAzAtQAyAuA1AdIgCAGQgNABgJAJQgKAJgGAOQgzglgsgyQgrgyghhGQgghGgVhgIAAF0QABARgEAMQgFAMgNAIQgPAIgdADQgCgKgEgHgAkZDTQAvglAigwQAhgwAXg3QAWg2ALg4IiaAAIgFgSICcAAIAZgYIAsAnQgDAEgGABQgGACgJAAQgOA6gZA3QgZA4gpAxQgpAwg8Akg");
	this.shape.setTransform(1166.45,356.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AjYELQgFgIgBgPQAEgeAAgZQABgYgEgRQgDgQgGgEQgFgFgIgBIgPgDIAAgNIAZAAQAFAAADgBQADgCAEgKIAFgLIAJgTIAPgmIAchDIAuhvIAMADIgVA+IgVBFIgUA8IgMAlQgEAOgBANQgDANAAALQABAOAEAOQAEAPAEATQAEASgBAZQgBATgJAKQgJALgOAAQgJAAgFgHgAhkESIAAl1IAnATICfAAQAOgWALgbQALgaAIgYIA1AcQgDAFgFABQgGADgIgDQgLAPgOARQgQARgRAQIBUAAIATgYIAwAlQgCADgHADQgHAEgJABIAAEVQAAAPgDALQgDALgLAGQgKAGgXADQAAgIgCgHQgDgHgEgEQgEgEgJgDQgIgDgMgDIAAgJIAKAAIATACIARABQAFAAADgDQACgCAAgGIAAkYIkNAAIAAFDQABAEgJAFQgKAFgMAAgAgKDQIAAigIAjAQIAcAAIAAg1IhaAAIgGgRIBgAAIAAg0IA2AGQAAAHgFAEQgFAEgLACIAAAdIAmAAIAWgaIAGAGIARANIARAPQgBAFgEACQgDACgHAAIhVAAIAAA1IAeAAIARgTIAlAgQgDADgGADQgGADgGABIAABkQgCADgHAEQgHAFgLABIgHAAIAAgaIhdAAIAAAXQgBACgIAEQgJAEgJABgAAWCdIBdAAIAAhMIhdAAgAjSg4QgIgTgSgUQgTgTgUgMIAFgFQAvAFAWAPQAWAPACAQQAEAQgKAIQgFAEgHAAQgHAAgIgEgAADhbQgDgUgNgVQgMgVgMgQIAHgDQAlAPAPASQAPASAAAOQAAAOgLAGQgDACgEAAQgHAAgJgGgAhzizIgEgSIFEAAIAYggIAJAHIASAPIAUASQgCAFgEACQgEADgGAAgAipi8QgFgNgLgNQgLgOgNgMQgOgMgNgJIAGgGQAvAHAXAQQAWAQADAQQADARgLAIQgEAEgHAAQgGAAgJgFgAA+jKQgDgTgOgSQgNgSgPgMIAGgEQApAHASAOQASAPAAAPQAAAPgLAHQgFADgFAAQgIAAgJgFg");
	this.shape_1.setTransform(1106.25,356.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#51C1E1").s().p("ApYIkQjFAAiKiLQiLiLABjCIAAiVQgBjFCLiKQCKiLDFAAISxAAQDFAACKCLQCLCKgBDFIAACVQABDCiLCLQiKCLjFAAg");
	this.shape_2.setTransform(1136.75,357.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("Ag1EBQgDgIgHgEQgIgGgNgEQgOgEgWgCIAAgKIALABIAaACIAcACIATAAQAJAAAEgDQADgDAAgHIAAnkIA8AGQgBAHgFAEQgFAEgLACIAAAtQALA2AQAuQARAuAUAmQAXgWAXgaQAXgZATgZQATgZAOgUIA2AiQgDAEgFACQgEABgLgDQgQARgYAVQgXATgbAVQgbAUgcASQAnBCAyAtQAzAuA1AdIgCAGQgMABgKAJQgLAJgFAOQg0glgrgyQgrgyghhGQgghGgVhgIAAF0QABARgEAMQgFAMgNAIQgPAIgdADQgBgKgFgHgAkZDTQAuglAjgwQAhgwAWg3QAXg2ALg4IiaAAIgFgSICdAAIAYgYIArAnQgDAEgFABQgGACgJAAQgOA6gaA3QgZA4goAxQgpAwg7Akg");
	this.shape_3.setTransform(431.35,360.425);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AilEPQAqgaAVghQAWgiAHgjQAIgkgBgiIAAhJIA5AFQgBAFgEAEQgFAEgKABIAAA3QAAAkgKAmQgJAmgcAiQgcAig2AZgAjgENQgFgIgBgOQAEgfAAgZQAAgYgDgQQgDgQgHgFQgFgEgHgCIgRgDIAAgNIAbAAQAFAAADgBQADgCAEgJIAGgMIAJgSIARglIAfhCIAyhsIALADIgWA8IgZBFIgWA7QgJAagDAKQgFAOgCANQgDANAAALQABANAEAOIAHAhQAEASgBAYQgBAUgIALQgIALgQAAQgIAAgFgIgAC2EJQgYAAgHgIQgHgIAAgSIAAjpIA3AFQgBAGgEAEQgFAEgIACIAADLQAAAFACADQACACAHAAIAUAAIAMAAIAHgBQADAAACgBQACgCABgEIAEgRIAGgdIAFghIAIAAIACBSQAIADADAEQADAEAAAFQAAALgOAFQgPAGgmAAgAAlEGIAAkHIA6AGQgBAFgFAFQgFAEgLABIAADlQAAAFgJAEQgKAEgKAAgADOgHQgDgNgHgOQgIgNgKgOIhtATQhBALhNAMIgFAGIgGADIgUgvIAGgBIAIgDQAVgLAWgSQAXgTATgVQASgUANgRIiLAAIgEgRIE2AAIAcgkIAJAHIAUARIAWATQgBAFgEADQgEACgGAAIjTAAIAsAVQgCAEgGADQgGACgJgBQgXATghAWQgfAWgjATIA+gEIBNgGIBVgHQgKgOgNgNQgNgNgMgKIAHgGQA3AVAaAZQAaAZAEAVQAEAWgKAJQgFAFgHAAQgHAAgIgGgAjSg1QgFgNgLgOQgLgNgNgMQgNgMgOgIIAHgFQAuAGAWAPQAXAQACAQQAEAQgKAIQgFAEgHAAQgHAAgIgEgAilizQgEgOgKgPQgLgPgOgNQgNgNgNgKIAEgEQAxAJAWARQAWARADARQADARgKAIQgFAEgGAAQgIAAgJgFgAA4jEQgDgUgNgWQgNgVgQgOIAGgFQApANARASQARARAAAQQAAAQgLAGQgEACgFAAQgHAAgJgGg");
	this.shape_4.setTransform(371.6758,360.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AkQEGQBTgYA2gdQA2geAgglQAgglAPguIkHAAIgGgSIETAAQAKgpAEgvQAFgwAAg4IgBh6IBAAHQgBAHgFAEQgFAEgLACIgBBvQAAA0gEAsQgEAsgKAnICOAAIAegnIAKAIIAWASIAYAVQgBAFgEACQgFADgFAAIjaAAIgHAUIgKATQBVAYAzAbQAyAaAYAZQAZAYADASQAFASgKAHQgJAIgQgIQgPgWgegbQgegbgqgdQgrgcg2gZQgTAlglAeQgkAeg4AZQg4AYhPATgAhdAJQgOgSgWgWQgXgVgbgTQgagUgXgOIAEgHQBIASAkAXQAkAYALAVQAKAVgHAKQgFAGgJAAQgGAAgHgCgAg+h0QgNgRgWgUQgWgUgYgUQgZgTgWgOIAGgGQBFASAiAWQAkAXAJAUQAKAUgJAKQgEAGgJAAQgGAAgIgDg");
	this.shape_5.setTransform(311.65,360.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AkWEIQA5gnAlgrQAmgrAWgvQAWgwAKgxQALgzADg1Ii5AAIgFgSIC/AAQACgkABgkIAAhKIA/AHQgBAGgFAFQgFAEgLACIgBA9IgCA9IDXAAIAfgmIAKAHIAWASIAZAVQgBAFgFADQgEACgHAAIi2AAIAAADIAADAQAegjAZgoQAZgnAVgvIA5AbQgDAEgGACQgFACgLgDQgcAzghAsQggArgoAkIAABNQAAAJAGAEQAGAEASAAIA9AAIAlgBIAXgBQAFAAADgCQADgCABgEQACgGAEgOIAHghIAIgnIAIAAIABBfQAKAEAEAEQAEAEAAAGQAAAJgJAGQgKAFgaACQgaACgxAAIhDAAQgZAAgNgDQgOgFgFgJQgFgKAAgRIAAg0QgeAYghAVQgiAUglASIgGgKQAmgXAkgbQAjgbAfggIAAjtIhEAAQgDA3gMA1QgMAzgZAxQgZAxgsAsQgrAshDAmgAB+igQgIgQgPgRQgOgSgSgRQgRgQgPgMIAFgGQA3APAaAVQAaAUAFASQAFASgJAJQgFAFgHAAQgHAAgHgEg");
	this.shape_6.setTransform(251.4778,360.375);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("Ag0EBQgEgIgHgEQgIgGgNgEQgNgEgXgCIAAgKIALABIAZACIAdACIATAAQAJAAAEgDQACgDAAgHIAAnkIA9AGQgCAHgEAEQgFAEgKACIAAAtQAKA2ARAuQAPAuAWAmQAXgWAWgaQAWgZAUgZQATgZANgUIA3AiQgDAEgFACQgFABgJgDQgSARgXAVQgXATgbAVQgbAUgcASQAoBCAxAtQAyAuA2AdIgCAGQgMABgLAJQgKAJgFAOQgzglgsgyQgrgyghhGQghhGgThgIAAF0QAAARgEAMQgFAMgNAIQgPAIgeADQgBgKgDgHgAkZDTQAvglAhgwQAjgwAVg3QAXg2ALg4IiaAAIgFgSICdAAIAZgYIAqAnQgDAEgFABQgGACgJAAQgOA6gaA3QgZA4gpAxQgoAwg7Akg");
	this.shape_7.setTransform(191.7,360.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F29539").s().p("A20IjQjDABiKiLQiLiKAAjFIAAiVQAAjDCLiKQCKiLDDABMAtnAAAQDDgBCMCLQCLCKAADDIAACVQAADFiLCKQiMCLjDgBg");
	this.shape_8.setTransform(307.825,357.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#F29539").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQA2g3Ahg/QA0hiAAh3MAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape_9.setTransform(503.925,585.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#51C1E1").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape_10.setTransform(1418.525,585.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AkJEIIgFgRIHEAAIAhgpIAKAIIAXATIAZAWQgBAEgEADQgEACgHAAgAi8DLIAAkGIglAiQgTAQgUANIgIgGQAjgfAhgsQAhgrAbgxQAbgwARguIA8AbQgDAFgFABQgFABgKgDIgWAnICeAAIAagZIAuAqQgDADgGABQgGABgJAAIgdAbIgjAeQgTAOgSANICDAAIAWgYIAwAlQgDAEgGADQgHADgJADIAADuQgBADgLAFQgLAFgLABIgFAAIAAgfIkyAAIAAAdQgBADgIAFQgJAGgPAAgAAWCPICHAAIAAhjIiHAAgAiVCPICFAAIAAhjIiFAAgAAWAaICHAAIAAhfIiHAAgAiVAaICFAAIAAhfIiFAAgAh8iGQgQAVgRAUIAPAGICQAAQASgTASgYQASgYANgVIilAAQgNAUgPAVg");
	this.shape_11.setTransform(1166.875,359.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgUETIAAlYQgoBVg/BJQg+BKhUA2IgIgJQAzgpArg1QAsg0Aig7QAig6AWg8IjWAAIgFgSID4AAIAAiNIA8AHQgBAHgFAEQgEAEgMACIAAB1ICkAAIAggmIAJAIIAXASIAYAVQgBAFgEACQgEACgHAAIjgAAQAbA9AnA2QAoA1AvAqQAvAqAwAaIgCAGQgNABgLAJQgLAIgFAPQhFgwg5hQQg4hPgkhoIAAFwQAAAFgKAFQgJAFgLABg");
	this.shape_12.setTransform(1106.925,360.275);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#51C1E1").s().p("AigCSQg0AAglglQglglAAg0IAAgnQAAg0AlglQAlglA0AAIFAAAQA1AAAlAlQAlAlAAA0IAAAnQAAA0glAlQglAlg1AAg");
	this.shape_13.setTransform(1136.7559,357.2643,3.7446,3.7446);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("ABeEUIAAjcIhTAAIAAAhQgBADgJAFQgIAEgNABIgFAAIAAkJIAnASIBQAAIAAh/IBAAHQgCAIgFAFQgFAFgOACIAABkIBPAAIAWgXIAwAlQgDADgHADIgQAGIAADJQAAACgGADQgFADgHADQgHACgGAAIgGAAIAAgnIhWAAIAADNQgBAFgJAFQgJAFgLAAgACEAnIBWAAIAAimIhWAAgAALAnIBTAAIAAimIhTAAgAjIDbQAOgLAEgFQAFgGAAgGIAAihIhWAAIgEgRIBaAAIAAhRIgwAAIgFgSIBuAAIAYgfIAJAGIARAQIATARQgBAFgEADQgDACgHAAIhLAAIAABRIAeAAIAZggIAIAHIATAOIASASQgBAFgDADQgFACgGAAIhVAAIAACbIAogaIAtgdIAEAGIgoArQgbAcgfAfQgCAHgCAEIgFAIgAkXguQAPgXAOgdQAOgcAOggQAMggAKgeQAKgfAFgYIA9AUQgCAFgFADQgEADgMABIgLAaIgLAcIA4AAIAZgfIAIAGIASAQIATARQgBAFgFACQgEACgFAAIh5AAQgTAlgXAiQgYAigaAag");
	this.shape_14.setTransform(250.85,360.275);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AhcELIgEgRIB6AAIAAluIhfAAIgEgRIDCAAQALgbAMgiQAMgkAJgkIA8ATQgBAFgGAEQgFADgJAAQgPAbgRAaQgSAbgRAWIBAAAIAZgiIAIAIIATAPIAVATQgCAEgEACQgEADgHAAIhoAAIAADwIAWhBIAThBIAOg1IA5AZQgCAEgFAEQgGADgJAAIgYAyIgfA/QgRAhgSAcIAABjIA7AAIAZgiIAIAHIATAQIAUATQgCAFgEACQgDACgGAAgAA+D6IA3AAIAAluIg3AAgAjlEAIAAjnQgKATgLARIgYAiIgJgHQAVgnARguQAQgsAMgwQALgxAIgwIhIAAIgFgSICZAAIAbgiIAJAHIAUAQIAVATQgBAFgFACQgDACgHABIhhAAQgHAmgKAkQgKAlgOAiIAMAGIA5AAIAVgXIAuAkQgDADgHADQgGADgJACIAADiQgBADgKAEQgKAFgJAAIgGAAIAAgpIhGAAIAAA6QAAACgIAGQgIAEgNAAgAjCCoIBGAAIAAi5IhGAAgAgUCTQABgfgGgjQgGglgJgiQgKgjgKgcIALgDQAiA0AOArQANArAAAdQAAAegKAJQgDAFgFAAQgGAAgIgIgAAbiWQgDgSgIgTQgIgUgKgSQgLgSgLgOIAIgFQAqAXASAZQASAXABATQAAATgKAGQgEADgFAAQgIAAgJgGg");
	this.shape_15.setTransform(191.325,359.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#F29539").s().p("ApaIkQjDgBiKiKQiLiLAAjEIAAiVQAAjCCLiLQCKiKDDgBISzAAQDDABCMCKQCLCLAADCIAACVQAADEiLCLQiMCKjDABg");
	this.shape_16.setTransform(221.575,357.25);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#F29539").ss(1,0,0,4).p("Eg8hAbkQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAMhqTAAAQjDAAiKCKQiLCLAADFg");
	this.shape_17.setTransform(503.925,585.05);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("AgcD8QgRgLAAgfIAAjtIhKAbIgMgOIBWggIAAisIA7AHQgBAHgFAEQgFAEgKACIAACGIBQgeIAAitIA6AHQgBAGgEAFQgFAEgLACIAACGIBRgeIAGgCIAVgXIAtAkQgDADgGADIgPADQAABPgDAvQgDAxgGAZQgGAagKAKQgJAKgNAFQgNAEgOAAQAAgJgCgHQgBgHgFgEQgEgEgIgDQgJgDgKgCIAAgLIAYACIAVABIAKgBIAGgEQAFgGAEgXQAEgXACgrQACgsABhFIhcAjIAAD5QAAAEgKAFQgJAFgLAAIgHAAIAAj6IhQAfIAADzQAAAJADAFQADAGAJACQAKACASAAIBaAAIA1AAIAggBQAHgBADgCQAEgCACgEQAFgJAFgYIANg6IAIAAIABBdQAMAEAEAEQAFAFAAAGQAAAKgMAGQgMAGgiACQghADhBAAIhbAAIgDAAQgpAAgRgMgAkXCrIAhgMIAvgTIAAjNIhGAAIgFgSIBLAAIAAioIA8AGQgBAHgFAEQgFAEgLABIAACSIAVAAIAZgjIAIAIIASARIAUASQgCAFgEADQgDACgGAAIhNAAIAAC9IAsgUIAugUIAEAIIhMAyQgsAdg5AiQgBAGgDAEQgDAEgEADg");
	this.shape_18.setTransform(1286.626,359.351);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("AgwETIAAinIgvARIgxAQIgFgKQA5gUAzgcQAygcAsgjQgTgRgPgTQgQgSgLgWQgWAbgZAWQgZAXgcARIgHgIQAZgVAWgcQAXgdATghQARgiALgfIA6APQgCAFgEACQgFACgLgBIgKARIgKARICBAAIAcgZIArAnQgEAEgGACQgGABgMAAQgSAagVAYQgXAXgbAVQApAXAtAQQAuAPAvAKIAAAGQgMADgJAHQgJAJgEANIgdgJIgbgLIAQAMQgDADgFADQgGADgHAAIAACGQgBACgEACIgOAGQgHACgGAAIgGAAIAAgfIieAAIAAAWQAAADgIAFQgJAFgOABgAgLDeICeAAIAAhlIieAAgAAeBGQgYAOgaAMIARAIICRAAIAOgPQgVgKgVgMIgmgaQgVAPgZAOgAAAhDQANAUASASQATASAXAOQAUgSASgVQATgUAOgVIiJAAgAjcEMQgEgHgBgMQAFgpgCgZQgDgagJgFQgHgEgHgBQgGgCgJgBIAAgMIAcAAQAFgBADgBQADgCAEgHIAHgLIAKgRIAUghIAkg8IA7hjIAKAFIgaA1IgfA8IgbA4IgPAgIgJAZQgDAMAAAJQAAALAEANIAHAbQADAOAAAVQgBARgIAJQgIAKgPAAQgHAAgGgHgAjWAYQgGgMgLgMQgKgNgNgNQgNgLgMgJIAFgFQAuAIAVAPQAUAQADAOQADAPgJAHQgFAEgFAAQgHAAgHgEgAiqg/QgGgMgLgNQgLgNgNgNIgXgWIAFgFQAtAKAVAQQAVAQACAPQADAOgJAHQgFAEgGAAQgGAAgHgEgAhriDIAAg7IilAAIgDgRICoAAIAAhCIA7AFQAAAGgFAFQgFAEgLABIAAAtICCAAIAAhCIA8AFQAAAGgFAFQgFAEgLABIAAAtIBbAAIAcgkIAJAIIAUARIAXATQgBAFgFACQgDADgHgBIibAAIAAAtQgBAEgIAEQgJADgOABIgHAAIAAg5IiCAAIAAAwQgBADgJAEQgKADgNABg");
	this.shape_19.setTransform(1227,360.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AAeEBQgDgHgFgFQgIgFgLgDQgLgEgUgDIAAgJIAKAAIAVACIAXACIARABQAIAAADgDQADgEAAgHIAAiIQgbAYgjAdQgkAegsAiQgBAFgCAFQgCAEgEADIgjgvQAQgHAdgPIBBglIBMgsIAAjCIicAAIgEgSICgAAIAAh4IA7AHQAAAGgFAEQgFAEgLACIAABhIBmAAIAbgiIAJAHIAVAQQAMAKAJAJQgBAFgEADQgEACgHAAIiiAAQAHAtAKAkQAKAlAOAdQATgYAUgdQAVgdAPgbIAyAhQgCADgEACQgFABgJgCQgTAVgbAXIg0ArQAaA0AjAiQAjAiApAXIgCAHQgMACgJAJQgJAKgEAPQgngfgegoQgegngUg4QgUg3gMhPIAAEuQABAQgEAMQgFALgNAIQgNAHgcADQgBgJgCgHgAkZCkIAjgNIAugTIAAijIhBAAIgFgRIBGAAIAAiSIhDAAIgGgRICAAAIAZgjIAJAHIATARIAVATQgBAFgEACQgEACgHAAIhLAAIAACSIAWAAIAXgiIAHAHIASAQIASATQgBAFgDACQgFACgFAAIhKAAIAACSIArgUIArgVIAEAIQghAYgrAdQgtAdg2AeQAAAGgEAFQgDAEgEACgAgXAZQgCgSgIgTQgJgUgKgTQgMgUgKgPIAHgDQAtAZATAZQAQAaAAASQABATgLAHQgEACgEAAQgIAAgKgIgAC5izQgIgRgSgSQgRgSgTgMIAHgGQArAIATAPQAUAOACAOQADAOgJAHQgEADgGAAQgGAAgHgEg");
	this.shape_20.setTransform(1166.85,360.425);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#FFFFFF").s().p("AB2DpQg2gagrgjQgrAig6AZQg6AZhIARIgFgKQBAgUA2gcQA2gcArgjQglgjgagrQgagsgSg0IgwAAQAAAvgIA1QgIA1gYAyQgXAzgwApIgIgHQAjgsARgyQARgyAHg1QAFg1gBg0IAAieIAuAVICFAAIAAhkIA+AHQgBAHgGAEQgFAEgKACIAABMICZAAIAZgaIAwAtQgEADgFABIgPACIgUAXIgaAbIgXAVIgIgEIAOgjIAPgoIiaAAIAAB0IBkAAIAbgYIAsApQgEAEgGACQgGABgJAAQgWAwgeApQgeApgnAjQAvAfA5AVQA4AVBAAMIAAAGQgOABgJAJQgKAJgGAOQg/gPg2gZgAgtA+QAdAmAmAdQAiggAagnQAZglARgrIjaAAQAUAuAdAmgAibgoICMAAIAAh0IiMAAg");
	this.shape_21.setTransform(1106.85,360.3);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#51C1E1").s().p("Ax4IkQjEAAiLiLQiKiLAAjCIAAiVQAAjFCKiKQCLiLDEAAMAjxAAAQDEAACLCLQCKCKAADFIAACVQAADCiKCLQiLCLjEAAg");
	this.shape_22.setTransform(1191.125,357.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AkMELQAjgiARgmQASgmAGgoQAGgogBgoIAAhsIAvAVIElAAIAWgYIAuAkQgDADgGADQgGADgJACIAACNQAAACgFADQgGADgHACQgIADgHAAIgFAAIAAgnIk2AAQgDAggKAhQgLAigXAfQgXAfgoAagAAZBGICGAAIAAhnIiGAAgAiUAlIAAAQIgBARICJAAIAAhnIiIAAgAjXhpIgFgSIDOAAIAAhGIjuAAIgFgRIDzAAIAAhAIA9AGQgBAHgFAEQgFAEgLACIAAApICfAAIAegjIAJAHIAWARIAYATQgBAFgEACQgEACgGAAIjlAAIAABGICLAAIAdgkIAJAHIAVARIAXAUQgBAFgFACQgEADgGAAg");
	this.shape_23.setTransform(370.775,360.425);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#FFFFFF").s().p("ACQEQQgOgWgagaQgagagfgXQgegYgagSIAHgGQAcAKAXALQAXALATAKIAYgpIAZgsIAWgoIi8AAIgFgSIDCAAIAagZIAtArQgEADgGACIgQABIgeAnQgSAWgUAXIgmArQAiAWARAUQAPAUADAOQADAOgIAGQgEADgFAAQgGAAgHgEgAjNDhQAOgKAEgGQAFgFAAgHIAAibIhZAAIgFgRIBeAAIAAhaIgwAAIgEgRIBtAAIAZggIAIAHIASAPIATASQgCAFgEACQgDACgHAAIhKAAIAABaIAbAAIAaggIAIAHIASAOIAUATQgBAFgFACQgEACgGAAIhTAAIAACUIAqgdIAvggIAFAIIgrAtQgbAdghAgQgBAHgDAGIgFAIgABcAAQgBgQgHgSQgGgSgIgSIgRgfIAHgDQAmAYAQAXQAPAXgCARQAAARgKAFQgEACgEAAQgIAAgJgHgAhEgJQAYgaAWggQAVghASgkQARgkAOgkQANgjAIggIA7ATQgBAFgGADQgEADgLABQAPApAbAmQAdAmAhAgQAiAgAjAWIgCAHQgOADgJAHQgJAIgEALQgfgagcgjQgagjgWgpQgWgpgOgqQgQAmgYApQgXAogeAlQgdAmgjAcgAkWgrQANgWANgdQAMgdAKggQALggAIgfQAHgeAEgZIA+ASQgBAGgFACQgEAEgMAAIgJAcIgKAdIBLAAIAZggIAIAHIASAPIATASQgBAFgDACQgFACgGAAIiKAAQgRAlgUAiQgVAigYAag");
	this.shape_24.setTransform(311.35,360.219);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#FFFFFF").s().p("Ag9ESIAAj+IApATIBQAAIAAhtIilAAIgFgSICqAAIAAhzIhJAIQgmAEgkABIgCgKQAygHA1gMQA1gLAvgOQAvgOAhgNIAtArQgEADgIAAQgIAAgLgEIgzALQgcAFgfAEIAAB5IBmAAIAcgkIAJAIIAUARIAXATQgCAFgEADQgEACgHAAIilAAIAABtIBRAAIAVgYIAwAlQgCADgHAEQgHAEgKACIAAC/QgBADgKAFQgKAEgLABIgFAAIAAgoIjQAAIAAAfQAAAEgJAEQgKAFgMABgAgXDTIDQAAIAAibIjQAAgAjeC+QAOgGAFgFQAEgFgBgIIAAkHIhKAAIgFgRIBQAAIATgVIAoAhQgCADgGADQgGADgIACIAAD6IAmgdIApgfIAGAIIgqAwQgcAeghAhQgCAJgEAFQgEAFgFACgAimigQgGgRgNgUQgMgUgPgSQgPgTgOgPIAHgEQAyAVAYAYQAXAXAEATQADAUgKAIQgFADgGAAQgHAAgIgFg");
	this.shape_25.setTransform(251.725,360.525);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FFFFFF").s().p("AgwD/QgSgMAAggIAAhnIiSAAIAAAcQAAAEgKAFQgJAFgNAAIgHAAIAAlMIArAUICOAAIAAhoIA+AIQgBAGgFAEQgFAEgLACIAABQICWAAIAWgZIAxAmQgDAEgHADQgGADgKACIAAEKQgBACgFAEIgNAFQgHADgIAAIgGAAIAAgjIibAAIAABeQgBAPAJAGQAJAGAaAAIBUAAIAzgBQAUAAAKgCQAHAAADgCQAEgDACgEQAEgIAGgYIANg4IAIAAIACBbQAMAEAEAEQAFAFAAAGQAAALgMAGQgNAGghACQghADg9AAIhWAAIgEAAQgpAAgRgMgAgaBaICbAAIAAhpIibAAgAjUBaICSAAIAAhpIiSAAgAgaghICbAAIAAhwIibAAgAjUghICSAAIAAhwIiSAAg");
	this.shape_26.setTransform(194.426,359.376);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#F29539").s().p("AyAIjQjDABiKiLQiLiKAAjFIAAiVQAAjDCLiKQCKiLDDABMAj/AAAQDDgBCMCLQCLCKAADDIAACVQAADFiLCKQiMCLjDgBg");
	this.shape_27.setTransform(276.575,357.25);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#F29539").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape_28.setTransform(503.925,585.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_10},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},138).to({state:[{t:this.shape_10},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18}]},116).wait(134));

	// 遮罩 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EASTAi+QjDAAiKiLQiLiNAAjDMAAAg3GQAAjECLiLQCKiLDDAAMBqUAAAQDDAACKCLQCLCLAADEMAAAA3GQAADDiLCNQiKCLjDAAgEh8mAi+QjDAAiKiLQiLiNAAjDMAAAg3GQAAjECLiLQCKiLDDAAMBqUAAAQDDAACKCLQCLCLAADEMAAAA3GQAADDiLCNQiKCLjDAAg");
	mask.setTransform(961.225,585.05);

	// 图层_3
	this.instance = new lib.Bitmap3();
	this.instance.setTransform(1392,437);

	this.instance_1 = new lib.Bitmap1();
	this.instance_1.setTransform(424,411);

	this.instance_2 = new lib.元件4("synched",1);
	this.instance_2.setTransform(588.5,542.7,0.5806,0.5806,0,0,0,3.6,3.6);

	this.instance_3 = new lib.元件4("synched",11);
	this.instance_3.setTransform(500.05,510.2,1.3759,1.3759,0,0,0,3.6,3.7);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#51C1E1").s().p("An1H+QBOg3BChAQAwhBBpimQBSiEAwgwQA3g9Aug5QA8hJAkgrQA4hBAXhJIAQg7QAJgiALgYQA5CACagbIgXA1QgaA9gLAqQgMArgFAzQgDAcAAB+QgBB7gJAdQgKAbAOAaQAPAYAAAFQgBAFAZAPQARAKARAGQA2AngIAwIgSAbQgPAfANAcQARAnAXAgg");
	this.shape_29.setTransform(525.25,516.15);

	this.instance_4 = new lib.Bitmap2();
	this.instance_4.setTransform(1392,437);

	this.instance_5 = new lib.元件1("synched",14);
	this.instance_5.setTransform(560,636.5,1,1,0,0,0,136,225.5);

	this.instance_6 = new lib.Bitmap6();
	this.instance_6.setTransform(424,411);

	this.instance_7 = new lib.元件5("synched",0);
	this.instance_7.setTransform(1434,500,1,1,0,0,0,42,63);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(81,193,225,0.847)").s().p("AghAiQgPgOAAgUQAAgTAPgOQAOgPATAAQAUAAAOAPQAPAOAAATQAAAUgPAOQgOAPgUAAQgTAAgOgPg");
	this.shape_30.setTransform(499.975,509.975);

	this.instance_8 = new lib.木鱼棒();
	this.instance_8.setTransform(1452,419);

	this.instance_9 = new lib.碰钟();
	this.instance_9.setTransform(591,533,1.0047,1.0047);

	this.instance_10 = new lib.碰钟();
	this.instance_10.setTransform(347,533,1.0047,1.0047);

	this.instance_11 = new lib.Bitmap7();
	this.instance_11.setTransform(1337,492);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#CC3300").ss(9,0,0,4).p("A4pHpQgKgpAUhDQApiHCaiGQDLiuD9iKQEqijEuhIQL+i2JOGyQHQFVBBBxQAdAzgpARQghAOhdgGQh4gKhDgFQh6gJhKAFQjXARAKCY");
	this.shape_31.setTransform(567.97,486.701);

	this.instance_12 = new lib.补间4("synched",0);
	this.instance_12.setTransform(1680,419,1,1,0,0,0,114,-54.5);

	this.instance_13 = new lib.元件6("synched",0);
	this.instance_13.setTransform(509.8,601,1,1,0,0,0,162.8,123);

	this.instance_14 = new lib.元件7("synched",0);
	this.instance_14.setTransform(1566,473.5,1,1,0,0,0,114,54.5);

	this.instance_15 = new lib.元件10();
	this.instance_15.setTransform(1413.2,439.1,1,1,0,0,0,68.2,67.3);

	this.instance_16 = new lib.元件11();
	this.instance_16.setTransform(1413.65,681.55,1,1,0,0,0,37.6,16.2);

	this.instance_17 = new lib.补间6("synched",0);
	this.instance_17.setTransform(527,530.5,1,1,4.7062);

	this.instance_18 = new lib.补间5("synched",0);
	this.instance_18.setTransform(401.75,581.3);

	this.instance_19 = new lib.座机();
	this.instance_19.setTransform(432,530);

	this.instance_20 = new lib.元件8("synched",0);
	this.instance_20.setTransform(527,530.5,1,1,0,0,0,132,65.5);

	this.instance_21 = new lib.元件9();
	this.instance_21.setTransform(1413.2,445.3,1,1,0,0,0,68.2,67.3);

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2,this.instance_3,this.shape_29,this.instance_4,this.instance_5,this.instance_6,this.instance_7,this.shape_30,this.instance_8,this.instance_9,this.instance_10,this.instance_11,this.shape_31,this.instance_12,this.instance_13,this.instance_14,this.instance_15,this.instance_16,this.instance_17,this.instance_18,this.instance_19,this.instance_20,this.instance_21];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_5},{t:this.instance_4}]},4).to({state:[{t:this.shape_29},{t:this.shape_30},{t:this.instance_7},{t:this.instance_6}]},93).to({state:[{t:this.shape_31},{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8}]},41).to({state:[{t:this.instance_13},{t:this.instance_11},{t:this.instance_12}]},1).to({state:[{t:this.shape_31},{t:this.instance_11},{t:this.instance_8},{t:this.instance_10},{t:this.instance_9}]},77).to({state:[{t:this.shape_31},{t:this.instance_11},{t:this.instance_14},{t:this.instance_10},{t:this.instance_9}]},1).to({state:[{t:this.instance_19},{t:this.instance_18},{t:this.instance_17},{t:this.instance_16},{t:this.instance_15}]},37).to({state:[{t:this.instance_19},{t:this.instance_20},{t:this.instance_16},{t:this.instance_15}]},2).to({state:[{t:this.instance_19},{t:this.instance_17},{t:this.instance_18},{t:this.instance_16},{t:this.instance_15}]},56).to({state:[{t:this.instance_19},{t:this.instance_17},{t:this.instance_18},{t:this.instance_21}]},14).wait(62));

	// bg
	this.instance_22 = new lib.水滴bg();
	this.instance_22.setTransform(995,302,1.4948,1.0883);

	this.instance_23 = new lib.水龙头bg();
	this.instance_23.setTransform(70,253,1.2956,1);

	this.instance_24 = new lib.木鱼bg();
	this.instance_24.setTransform(989,239,1.1461,1.1141);

	this.instance_25 = new lib.木鱼bg();
	this.instance_25.setTransform(75,239,1.1461,1.1141);

	this.instance_26 = new lib.皮球bg();
	this.instance_26.setTransform(963,278,1.5087,1);

	this.instance_27 = new lib._3电话();
	this.instance_27.setTransform(101,242,1.0733,1.0764);

	var maskedShapeInstanceList = [this.instance_22,this.instance_23,this.instance_24,this.instance_25,this.instance_26,this.instance_27];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_23},{t:this.instance_22}]}).to({state:[{t:this.instance_25},{t:this.instance_24}]},138).to({state:[{t:this.instance_27},{t:this.instance_26}]},116).wait(134));

	// 图层_1
	this.instance_28 = new lib.Group();
	this.instance_28.setTransform(1508.55,115.15,3.0656,3.0656,0,0,0,30.1,13.8);
	this.instance_28.alpha = 0.6992;

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#FEF4EB").s().p("Ag6AfQgYgNAAgSQAAgRAYgMQAZgOAhAAQAjAAAYAOQAYAMAAARQAAASgYANQgYANgjgBQghABgZgNg");
	this.shape_32.setTransform(1528.4226,214.8226,3.0656,3.0656);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#FEF4EB").s().p("Ag6AfQgYgNAAgSQAAgRAYgNQAZgNAhAAQAiAAAZANQAYANAAARQAAASgYANQgYANgjAAQghAAgZgNg");
	this.shape_33.setTransform(1500.6793,208.1551,3.0656,3.0656);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#EDC074").s().p("AgbAdQgMgMAAgRQAAgQAMgLQALgMAQAAQARAAALAMQAMALAAAQQAAARgMAMQgLALgRAAQgQAAgLgLg");
	this.shape_34.setTransform(1563.4465,100.7841,3.0656,3.0656);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#EDC074").s().p("AgJAkQgNgEgIgLQgHgLABgMQACgOAKgJQALgJARgBQANgFAJAOQARAVgIAUQgFAMgPAJQgHABgHAAIgKgBg");
	this.shape_35.setTransform(1565.2567,101.4756,3.0656,3.0656);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#EDC074").s().p("AABAnQgGgFgFgMIgFgMQgDgHAAgEIgCgKIAAgCIgCgDQgDgGABgHQACgGAGgDQAGgDAGABQALAEAEANIABAOIgBgDIABAFIAAgCQABAIAFALIACADIgBgBIAAABIABAAIABABIgBAAQADADACAEQACAGgEAGQgDAFgHACIgFABQgDAAgEgCg");
	this.shape_36.setTransform(1585.0551,74.6085,3.0656,3.0656);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#EDC074").s().p("AgYBFQgFgFAAgGQAAhKAegwQADgGAGgCQAHgCAFAEQAGADACAHQACAHgEAFQgaApAABBQAAAGgEAFQgEAFgHAAQgHAAgEgFg");
	this.shape_37.setTransform(1576.28,84.1953,3.0656,3.0656);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#F2A468").s().p("AgLBiQgKgIgBgMIgOiVQgBgMAIgKQAHgJANgBQALgCAKAIQAJAIACANIAOCUQABAMgIAKQgIAJgMACIgDAAQgJAAgJgHg");
	this.shape_38.setTransform(1517.4825,182.003,3.0656,3.0656);

	this.instance_29 = new lib.ClipGroup_1();
	this.instance_29.setTransform(1519.3,118.4,3.0656,3.0656,0,0,0,22.6,20);

	this.instance_30 = new lib.ClipGroup_2();
	this.instance_30.setTransform(1508.85,142.65,3.0656,3.0656,0,0,0,29.8,27.9);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#F2A468").s().p("AgjA/QgRgKgKgQQgJgRgBgUQABgUAJgQQAKgQARgKQAQgKATAAQAVAAAQAKQAQAKAKAQQAKAQAAAUQAAAUgKARQgKAQgQAKQgQAKgVAAQgTAAgQgKgAgigiQgOAOgBAUQABAVAOAPQAOAOAUAAQAVAAAPgOQAOgPAAgVQAAgUgOgOQgPgPgVAAQgUAAgOAPg");
	this.shape_39.setTransform(1452.575,195.575);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#F2A468").s().p("AB1DUIgogBQgBgHgCgIQgCgIgEgGIAoACIAaAAQAHABAEgBQAEgCAEgDQAFgFAEgRQAEgRADggIhMAdIhEAZIgLgcIAtgPIA2gSIA6gUIADgiIACgpIiVAAIADglIACgsIACgqICIAAIAAhBIiVAAIAAgdIC1AAIAAB7IiKAAIgBAiIgCAgICUAAIAAAGIgBAKQgDBDgEAqQgEAqgFAWQgEAWgIAIQgGAIgIADQgIADgMABIgSAAIgLAAgAiCDPQgBgHgCgIQgCgIgEgGIAfACIAVAAQAGAAAEgBQAEgBADgEQAFgFAEgOQAEgPAEgbIhMAaIhDAYIgMgbIAugPIA2gRIA5gTIAEgkIADgrIiOAAIAEglIACgsIABgqICEAAIAAhBIiRAAIAAgdICxAAIAAB7IiGAAIgCAiIgCAgICOAAIAAAGIgBAKQgEBBgEAqQgFApgFAWQgFAWgIAIQgGAHgHADQgHADgKABIgZAAIgggBgABmBJIgkgQIglgMIAOgXQARAFATAHIAkAOIAdAPIgNAZQgMgHgRgIgAhxBJIglgQIglgMIAOgXQASAFASAHQAUAGARAIQARAIAMAHIgNAZQgMgHgRgIg");
	this.shape_40.setTransform(1418.425,182.5333);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#F2A468").s().p("AC6DBIgJgRIhUAGIhQAGIhEAFIgDgfIA2gDIBAgEIAAhKIhhAAIAAh+IBhAAIAAgtIhXAAIAAh2IDNAAIAAB2IhYAAIAAAtIBlAAIAAB+IhlAAIAABIIAjgDIAkgCIgPgXIgOgWIAagLIAZAjQAMATAKASQAJASAGAOIgcANIgGgQgABaA2IBHAAIAAhIIhHAAgAgJA2IBFAAIAAhIIhFAAgAACh2ICSAAIAAg/IiSAAgAi2DJIgDgPQgDgJgEgGIAfACIAVAAQAGABAEgBQADgBADgEQAFgEAEgOQAEgPADgbQADgbADgsIh0AAIAHgpIAFgxQAEgaACgWIBoAAIAAhOIh2AAIAAgdICUAAIAACIIhsAAIgFAqIgFAmIBzAAIgBAGIAAAJQgEA2gDAiQgEAigFASQgFASgGAHQgGAHgHADQgIADgKABIgXAAIgfgBg");
	this.shape_41.setTransform(1370.95,183.175);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#F2A468").s().p("ABEDTIgwgCQgBgHgDgJQgDgIgFgIIAkADIAfABIAVAAIAOgBQAGgBAFgDQAJgIAHgUQAHgVAHglQAGglAGg3IkbAAIgbgBQAIgbAJgkIAQhKQAIgmAGghIAgADIgFAaIgFAcIEOAAIAAAfIkVAAIgKAvIgKArIEwAAIgCAQQgHBEgHArQgHAsgJAYQgIAYgLAKQgJAIgKADQgKAEgOABIgKAAIgbgBgAjGBjIAAgfIEqAAIAAAfg");
	this.shape_42.setTransform(1321.025,181.9583);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#F2A468").s().p("AjQDLIgLgJQAegcARgfQASgfAIgiQAJghACgfIhSAAIAAgdIBUAAIAAgJIAAgKIAAhOIgdAAQgGAWgIAUQgIATgJAQIgMgJIgNgIQAMgTAIgZQAJgZAGgcQAGgcAFgeIAdAFIgFAfIgGAeIBwAAIAAAdIg9AAIAABOIAAAKIgBAJIBEAAIAAAdIhFAAIgDASIgCAUIAQAWIAVAdIAUAbIAOASIgWAaIgPgZIgVgfIgVgfQgKAlgTAjQgTAjggAdIgKgMgAgtDRIAAgeICWAAQAIgRAJgVIAPgrIANgoIAhAHIgPAnIgQAnIgQAkIBUAAIAAAegAAeCKIgMgjQgHgTgHgQIAagHQAIAQAHASIANAjQAFASADANIgcAIIgIgfgAgKAnIAAiVIDOAAIAACVgAATAKICSAAIAAhbIiSAAgAgaikIAAgeIDyAAIAAAeg");
	this.shape_43.setTransform(1273.925,181.25);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#F2A468").s().p("AiGDLIgIgOQAGgDAGgGQAGgGABgOIAAifIheAAIAAgfIBeAAIAAi7IAhAAIAAC7IEqAAIAAAfIi8AAQAbBAAyAuQAzAtBGAUQgGAGgGAJQgGAIgEAHQhLgZg0g0Qg1g1gchLIhOAAIAACoIB1geIABAQIACAOIhOAWIguANIgYAIIgLAGIgFgPgAgphFIgOgNQAjgOAggUQAigUAdgXQAdgYAWgZIAfANQgYAcgeAaQgfAagiAVQgiAWggAPIgNgMg");
	this.shape_44.setTransform(1226.175,181.7);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#F2A468").s().p("AA7DXQAAgHgDgJQgDgIgEgHQAYACATAAIAcAAQAHABAFgCQAEgBAEgEQAGgHAFgSQAEgTAEghQADgiADg0QADgzAChJIh/AAQgKAZgLAWQgMAWgLAQIgNgJIgOgIQAQgWANgcQAOgcALghQALggAIgiIAfAHIgKAkIgLAjICSAAIAAARQgDBTgDA5QgDA5gEAlQgDAkgGAVQgFAUgHAIQgHAKgJADQgJAEgMABIgfABIgogCgAjIDWIAAlfIA2AAIAIgYIAHgcIAGgaIAiAHIgNAlQgGASgHAQIBSAAIAAE4IiHAAIAAAngAiqCSIBqAAIAAh4IhqAAgAiqgCIBqAAIAAhpIhqAAgABOA+QgMgTgPgVIgcglIAZgPIAdAlQAPATAMAUQANASAIAQIgbAQQgIgPgMgTg");
	this.shape_45.setTransform(1177.625,181.1);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#F2A468").s().p("AiRDeIAAjSIEnAAIAADRIggAAIAAgRIjnAAIAAASgAhxCwIDnAAIAAg4IjnAAgAhxBeIDnAAIAAg2IjnAAgAjVgeIAAgeIB8AAQgDgQgJgUQgHgUgLgRIAegHQAJALAGAOQAGANAFAOQAFANACAKIgUAFICDAAIANgaIANgdIAKgbIAjAJIgTAlIgTAkIB+AAIAAAegAi5iQIAAgeICwAAQgDgJgGgMIgLgUIAegGQAJALAFANQAHAMAEALICkAAIAAAeg");
	this.shape_46.setTransform(1128.95,181.55);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#F2A468").s().p("AjKDSIgNgKQAagZANgeQANgeAEgdQAEgdAAgbIAAg/IFTAAIAACeIgfAAIAAgZIkbAAQgFAggPAgQgOAfgbAbQgDgFgIgHgAAYBJICBAAIAAhOIiBAAgAh7AfIgBAUIgBAWIB3AAIAAhOIh1AAgAimhIIAAgcICfAAIAAgzIi8AAIAAgcIC8AAIAAgqIAgAAIAAAqIC/AAIAAAcIi/AAIAAAzICqAAIAAAcg");
	this.shape_47.setTransform(1079.625,181.75);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#F2A468").s().p("AgjDcQgXAAgNgEQgNgDgGgJQgFgIAAgRIAAhAIAgAAIAABAQgBAIAGADQAGADATgBIBXAAQAKABAGgEQAFgDACgLQADgLAAgVQAGADAIADIAPAEQgCAbgFAPQgFAOgLAGQgKAFgTAAgAjPDEQAMgLALgOQALgPAIgPQAJgQAGgOIAaANQgGAOgJAQQgJAQgLAOQgKAQgMALgAClCxIgXgfQgMgPgMgNIAZgLIAZAbIAXAdQAKAPAHALIgcAPQgGgMgJgPgAAMCNQgMgKgOgKIgbgSIAQgNIh6AAIAAiLIErAAIAACLIipAAQASAKAUAOQAUAOAMALIgVAVQgIgJgMgKgAh1BCIDtAAIAAgkIjtAAgAh1AJIDtAAIAAgjIjtAAgAjLhKIAAgaIByAAQgDgLgFgMIgLgVIAbgHIhlAAIAAgbICxAAIgKgSIgJgQIAdgHIANAUIALAVICbAAIAAAbIhgAAIAaAGIgMAXIgMAWIB2AAIAAAagAhCh+QAHANACAMIgDABIB1AAIANgaIALgZIigAAQAHALAGAOg");
	this.shape_48.setTransform(1032.175,181.3);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#F2A468").s().p("AjNDEIAegsIAfg3QARgdAOgbIAXAUIgcA2IgeA2IgeAxgAhhDQIAAgeICPAAIAAiBIhtAAIAAgfIBtAAIAAhvIiAAAIAAgfIEkAAIAAAfIiDAAIAABvIBxAAIAAAfIhxAAIAACBICNAAIAAAegAibgTIgggTIgggQIASgYIAfAQIAgARQAPAJALAHIgSAbQgLgIgOgJgAA1iXIgOgdIgQgbIAcgKIASAaIAPAcQAHANAEALIggANQgDgLgHgOgAiAiXIghgTIghgRIASgXIAgAQIAiASQAPAJALAIIgTAaIgZgSg");
	this.shape_49.setTransform(983.95,181.325);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#F2A468").s().p("AgtA6QAcgMAQgSQAPgSABgYIgFAAIgEAAQgOAAgKgIQgJgIAAgRQAAgQAKgIQAKgJAOAAQATAAAJAOQALAPgBAZQAAAmgVAcQgXAcgkANg");
	this.shape_50.setTransform(922.2,196.85);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#F2A468").s().p("AiRDeIAAjSIEoAAIAADRIghAAIAAgRIjoAAIAAASgAhyCwIDoAAIAAg4IjoAAgAhyBeIDoAAIAAg2IjoAAgAjVgeIAAgeIB8AAQgEgQgHgUQgJgUgJgRIAegHQAHALAHAOQAGANAFAOQAFANADAKIgVAFICDAAIANgaIANgdIAKgbIAjAJIgSAlIgTAkIB9AAIAAAegAi6iQIAAgeICxAAQgDgJgFgMIgMgUIAegGQAJALAGANQAGAMAEALICkAAIAAAeg");
	this.shape_51.setTransform(887.25,181.55);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#F2A468").s().p("AjKDSIgNgKQAagZANgeQANgeAEgdQAEgdAAgbIAAg/IFTAAIAACeIgfAAIAAgZIkbAAQgFAggPAgQgOAfgbAbQgDgFgIgHgAAYBJICBAAIAAhOIiBAAgAh7AfIgBAUIgBAWIB3AAIAAhOIh1AAgAimhIIAAgcICfAAIAAgzIi8AAIAAgcIC8AAIAAgqIAgAAIAAAqIC/AAIAAAcIi/AAIAAAzICqAAIAAAcg");
	this.shape_52.setTransform(837.925,181.75);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#F2A468").s().p("AA7DXQAAgHgDgJQgDgIgEgHQAYACATAAIAcAAQAHABAFgCQAEgBAEgEQAGgHAFgSQAEgTAEghQADgiADg0QADgzAChJIh/AAQgKAZgLAWQgMAWgLAQIgNgJIgOgIQAQgWANgcQAOgcALghQALggAIgiIAfAHIgKAkIgLAjICSAAIAAARQgDBTgDA5QgDA5gEAlQgDAkgGAVQgFAUgHAIQgHAKgJADQgJAEgMABIgfABIgogCgAjIDWIAAlfIA2AAIAIgYIAHgcIAGgaIAiAHIgNAlQgGASgHAQIBSAAIAAE4IiHAAIAAAngAiqCSIBqAAIAAh4IhqAAgAiqgCIBqAAIAAhpIhqAAgABOA+QgMgTgPgVIgcglIAZgPIAdAlQAPATAMAUQANASAIAQIgbAQQgIgPgMgTg");
	this.shape_53.setTransform(790.875,181.1);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#F2A468").s().p("ACcDMIAAgaIk6AAIAAAaIgfAAIAAk4ICVAAIAJggIAHggIi7AAIAAgfIGnAAIAAAfIjIAAIgJAgIgJAgIDDAAIAAE4gABQCUIBMAAIAAjiIhMAAgAg4CUIBqAAIAAg8IhqAAgAieCUIBIAAIAAjiIhIAAgAg4A+IBqAAIAAg6IhqAAgAg4gWIBqAAIAAg4IhqAAg");
	this.shape_54.setTransform(742.25,183.325);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#F2A468").s().p("AgZDKIAAlyIi8AAIAAghIGrAAIAAAhIjPAAIAABWIAFgGIA+AgQAgASAeASQAdASAVAOIgXAeQgRgOgagRQgagRgdgRIg6ggIAAEBg");
	this.shape_55.setTransform(693.85,183.375);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#F2A468").s().p("AhYDQQgHgGgHgEQAjgYATghQAVghALgoQAJgoAEgqQADgsACguIhUAAIAAgfIEvAAIAAAfIi6AAIgCAmIgCAkICaAAIAAAPQgDBIgEAtQgEAsgFAXQgEAWgIAJQgGAHgJAEQgHADgMAAQgKABgRAAIgkgBQAAgHgDgIQgDgIgEgHIAlACIAYAAIALgBQADgBAEgDQAGgGAEgTQAEgTADgnQADglACg9Ih7AAQgEAtgMAoQgMAqgVAhQgWAjgiAZQgFgGgGgGgAidDaIAAkPIgVAfIgXAaIgJgOIgKgQQAWgYAVgfQAVgfASgjQARgkANgkIAgAIQgLAcgMAbQgNAagOAaIAAFCgAA9igIgIgaIgJgaIAggHIAJAZIAJAaIAGAVIghAJIgGgWg");
	this.shape_56.setTransform(645.3,181.8);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#F2A468").s().p("AB5C0QghgbgSgpIgBAAQgKAagRAVQgRAVgbAPQgdAPgpAKIgIgNIgJgMQAkgIAYgMQAZgMAOgPQAQgQAJgUIhxAAIAAgbIB6AAIAFgUIADgWIhhAAIAAiSIDpAAIAACSIhoAAIgDAVIgFAVICJAAIAAAbIhxAAQASAfAfAVQAfAVAsAJIgMAMIgJAOQgwgMgigcgAgQASICtAAIAAgkIitAAgAgQgpICtAAIAAgmIitAAgAiZDbIAAjiQgLAmgOAhQgNAhgOAXIgIgQIgKgOQAPgVANgfQAOgfAKgiQALgjAHgiIg+AAIAAgeIA+AAIAAhdIAeAAIAABdIA0AAIAAAeIg0AAIAAAUIAOAVIARAcIAQAbIALATIgVAXIgKgVIgMgaIgPgbIAAD7gABwhwIAAgmIhMAAIAAAmIgfAAIAAgmIhIAAIAAgcIBIAAIAAgpIAfAAIAAApIBMAAIAAgpIAgAAIAAApIBGAAIAAAcIhGAAIAAAmg");
	this.shape_57.setTransform(597.1,181.675);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#F2A468").s().p("AgjDcIAAjkIDXAAIAAC/QABAMgEAHQgDAHgKAEQgKAEgQABIgqAAIgEgOIgGgOIAjABIAUAAQAFAAACgCQACgCAAgFIAAglIibAAIAABLgAgFB5ICbAAIAAgqIibAAgAgFA4ICbAAIAAgoIibAAgAidDFIgJgOQAEgCAFgGQAFgFAEgIQADgIABgLIAAi0IhKAAIAAgfIBpAAIAADSIAzgnIAFAPIAGANIg7AuQgVAPgHAIQgJAHgCAEIgIgOgAhGglIAAgZIB+AAIAAglIhkAAIAAgYIBkAAIAAggIhvAAIAAgZIBvAAIAAgnIAgAAIAAAnIB1AAIAAAZIh1AAIAAAgIBmAAIAAAYIhmAAIAAAlICEAAIAAAZgAiGiJIgagaIgagZIAVgTQANAKAOANIAaAZQALAMAJAKIgWAXIgUgXg");
	this.shape_58.setTransform(548.8,181.675);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#F2A468").s().p("AgNAIQgdgbgZgWIAcgYQARAOAUASIAkAlQATATAQATIgeAZQgYgfgcgcg");
	this.shape_59.setTransform(485.7,196);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#F2A468").s().p("AjUChIAAgkIGpAAIAAAkgAirh+IAAgiIFYAAIAAAig");
	this.shape_60.setTransform(452.1,182.675);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#FEF4EB").s().p("AsoNMQiXAbiqAAQmUAAkdiSIg0gcQlKCXmuAAQmKAAk4iAQlDCsmyAAQknAAjzhOQhoAJhtAAQoUAAl6jkQjHh3heiTQhTiCAAiWQAAgxAJgtQAgi0CkiUQAzguBAgqQAbgTAdgRQF5jjIVAAQBKAABHAFQAigWAngUQB6g+CSggQCfgkC7AAQC7AACfAkQCTAgB5A+QAyAZAoAbQEsh1F6AAQHxAAFsDKQClg6C8gYQDqhhE2AAIA0AAQBTggBcgUQCegkC8AAQC7AACeAkQCSAgB6A+QAxAZAoAbQEth1F6AAQDMAAC2AiQBaARBUAZQDKA8CrBtQAVANAUAOQA+hABsg3QD+iCFoAAQFoAAD/CCQBcAvA6A2QD5h3FaAAQEDAADLBCQCEgiCUgKQA3gDA5AAQG9AAE6DTIACABQAaASAZATQA2ApArAsQCoCsAADZQAACEg+ByQhNCTixB4IgHAFQk5DPm5AAQg5AAg3gEQkbgSjihtQg+ALhDAAIgcAAQjICLkPAAQjOAAikhQQjOB9kVAAIgXAAQiiAfi5AAQmTAAkeiSIgzgcQhgAshoAfQj+BMkyAAQlyAAknhwQhWAihfAPQkRBrlXAAQjmAAjGgwg");
	this.shape_61.setTransform(977.675,170.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.instance_30},{t:this.instance_29},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.instance_28}]}).wait(388));

	// 选中
	this.instance_31 = new lib.选中();
	this.instance_31.setTransform(125.1,863.75,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.instance_31, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(138).to({x:157.75},0).wait(116).to({x:189.45},0).wait(134));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.lnav2_btn},{t:this.lnav3_btn},{t:this.lnav1_btn}]}).wait(388));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1069.8,597.1,737.1000000000001,281.9);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#F7C677",
	opacity: 0.00,
	manifest: [
		{src:"images/木鱼bg.png?1693885903737", id:"木鱼bg"},
		{src:"images/木鱼棒_.png?1693885903737", id:"木鱼棒"},
		{src:"images/听筒_.png?1693885903737", id:"听筒"},
		{src:"images/_3电话.jpg?1693885903737", id:"_3电话"},
		{src:"images/水滴_.png?1693885903737", id:"水滴"},
		{src:"images/水滴bg.png?1693885903737", id:"水滴bg"},
		{src:"images/水龙头bg.png?1693885903737", id:"水龙头bg"},
		{src:"images/Bitmap1.png?1693885903737", id:"Bitmap1"},
		{src:"images/Bitmap2.png?1693885903737", id:"Bitmap2"},
		{src:"images/Bitmap3.png?1693885903737", id:"Bitmap3"},
		{src:"images/Bitmap5.png?1693885903737", id:"Bitmap5"},
		{src:"images/Bitmap6.png?1693885903737", id:"Bitmap6"},
		{src:"images/Bitmap7.png?1693885903737", id:"Bitmap7"},
		{src:"images/座机_.png?1693885903737", id:"座机"},
		{src:"images/皮球_.png?1693885903737", id:"皮球"},
		{src:"images/皮球bg.png?1693885903737", id:"皮球bg"},
		{src:"images/碰钟_.png?1693885903737", id:"碰钟"},
		{src:"sounds/yx12050101水龙头流水.mp3?1693885903737", id:"yx12050101水龙头流水"},
		{src:"sounds/yx12050102滴水.mp3?1693885903738", id:"yx12050102滴水"},
		{src:"sounds/yx12050104木鱼.mp3?1693885903738", id:"yx12050104木鱼"},
		{src:"sounds/yx12050105电话铃声.mp3?1693885903738", id:"yx12050105电话铃声"},
		{src:"sounds/yx12050106皮球落地.mp3?1693885903738", id:"yx12050106皮球落地"},
		{src:"sounds/碰钟_1.mp3?1693885903738", id:"碰钟_1"}
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