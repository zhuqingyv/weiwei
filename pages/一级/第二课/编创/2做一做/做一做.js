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



(lib.老虎1 = function() {
	this.initialize(img.老虎1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,461,482);


(lib.老虎头 = function() {
	this.initialize(img.老虎头);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,291,256);


(lib.老虎bg = function() {
	this.initialize(img.老虎bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,764,804);


(lib._1 = function() {
	this.initialize(img._1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,219,214);


(lib._11 = function() {
	this.initialize(img._11);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,403,191);


(lib._2 = function() {
	this.initialize(img._2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,334,201);


(lib._22 = function() {
	this.initialize(img._22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,176,351);


(lib.body = function() {
	this.initialize(img.body);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,423,342);


(lib.head = function() {
	this.initialize(img.head);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,176,185);


(lib.背景 = function() {
	this.initialize(img.背景);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,768,595);


(lib.背景png复制 = function() {
	this.initialize(img.背景png复制);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,768,595);// helper functions:

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


(lib.元件26 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 虎牙
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#8E592F").ss(3,1,1).p("ABvgyIAkAHIBYAQIALACAg+gIIgsANIhlAiIgmAM");
	this.shape.setTransform(516.65,593.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AjYAQQgDgLgBgLIBlghQgZAkABA3QACAeADAIQg8gBgShJgACWASQgCgXgIgtIgGgnIBXARQgPBDgbAXIgcAYg");
	this.shape_1.setTransform(518,598.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(115));

	// 虎zui
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#8E592F").ss(3,1,1).p("ABFhLQgoAqhZAjQhKAehgAZIhSAUIJxhcQgzgDg4gJQhvgRgagfg");
	this.shape_2.setTransform(515.1,593.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EE858F").s().p("AjmA5QBhgZBJgfQBYgiAqgrQAZAgBvARQA4AJAzACIpxBcg");
	this.shape_3.setTransform(515.1,593.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#8E592F").ss(3,1,1).p("ABGhzQgpAqhYAkQhKAfhhAYIhSATQGcDEDVkgQgzgCg4gJQhvgSgZgfg");
	this.shape_4.setTransform(515.15,596.9984);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#EE858F").s().p("Ak3AlIBRgTQBggYBLgfQBXgkApgqQAaAfBvASQA4AJAyACQh+CrjFAAQiGAAimhPg");
	this.shape_5.setTransform(515.15,596.9984);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#8E592F").ss(3,1,1).p("ABFi1QgoAqhZAkQhKAehgAZIhSAUQGcHPDVosQgzgDg4gJQhvgRgagfg");
	this.shape_6.setTransform(515.1,603.6058);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#EE858F").s().p("Ak4gcIBSgUQBhgZBJgeQBYgkAqgqQAZAfBvARQA4AJAzADQh0EviwAAQiRAAi8jSg");
	this.shape_7.setTransform(515.1,603.6058);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#8E592F").ss(3,1,1).p("ABGi1QgpAqhYAkQhKAehhAZIhSAUQGcHPDVosQgzgDg4gJQhvgRgZgfg");
	this.shape_8.setTransform(515.15,603.6558);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#EE858F").s().p("Ak3gcIBRgUQBggZBLgeQBXgkApgqQAaAfBvARQA4AJAyADQhzEviwAAQiRAAi7jSg");
	this.shape_9.setTransform(515.15,603.6558);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#8E592F").ss(3,1,1).p("ABFhwQgoAqhZAkQhKAfhgAYIhSATQF6C2D3kSQgzgCg4gJQhvgSgagfg");
	this.shape_10.setTransform(515.1,596.6741);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#EE858F").s().p("Ak4AoIBSgTQBhgYBJgfQBYgkAqgqQAZAfBvASQA4AJAzACQiVCljDAAQiCAAiXhJg");
	this.shape_11.setTransform(515.1,596.6741);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#8E592F").ss(3,1,1).p("ABFhUQgoAqhZAkQhKAehgAZIhSATQGcA6DViWQgzgCg4gJQhvgSgagfg");
	this.shape_12.setTransform(515.1,593.9048);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#EE858F").s().p("Ak4BEIBSgTQBhgZBJgeQBYgkAqgqQAZAfBvASQA4AJAzACQiaBtkBAAQhjAAhzgRg");
	this.shape_13.setTransform(515.1,593.9048);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#8E592F").ss(3,1,1).p("ABGhLQgpAphYAjQhKAfhhAZIhSATIJxhbQgzgDg4gJQhvgSgZgeg");
	this.shape_14.setTransform(515.15,593.1);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#EE858F").s().p("AjmA5QBggZBLgeQBXgkApgpQAaAeBvASQA4AJAyADIpvBbg");
	this.shape_15.setTransform(515.15,593.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).to({state:[{t:this.shape_5},{t:this.shape_4}]},8).to({state:[{t:this.shape_7},{t:this.shape_6}]},3).to({state:[{t:this.shape_9},{t:this.shape_8}]},18).to({state:[{t:this.shape_11},{t:this.shape_10}]},2).to({state:[{t:this.shape_13},{t:this.shape_12}]},2).to({state:[{t:this.shape_15},{t:this.shape_14}]},13).wait(69));

	// 图层_1
	this.instance = new lib.老虎头();
	this.instance.setTransform(331,376);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(115));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(331,376,291,256);


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
	this.instance = new lib._1();
	this.instance.setTransform(0,0,0.7173,0.7173);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件4, new cjs.Rectangle(0,0,157.1,153.5), null);


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
	this.instance = new lib._2();
	this.instance.setTransform(0,0,0.7173,0.7173);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件3, new cjs.Rectangle(0,0,239.6,144.2), null);


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
	this.instance = new lib._22();
	this.instance.setTransform(0,7.7,0.7173,0.7173,-3.5017);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件2_1, new cjs.Rectangle(0,0,141.4,259), null);


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

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(6).to({_off:false},0).to({_off:true},21).wait(8));

	// 图层_1
	this.instance = new lib.元件7();
	this.instance.setTransform(80.2,84.2,1,1,0,0,0,80.2,84.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:80.1,rotation:45,x:80.1,y:84.25},5).wait(22).to({regX:80.2,rotation:0,x:80.2,y:84.2},7).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-36.1,-31.9,232.5,232.5);


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

	// 虎头
	this.instance = new lib.元件26("synched",0);
	this.instance.setTransform(519.75,622.35,1,1,0,0,0,521.7,618.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:476.5,regY:504,rotation:-0.7894,x:473,y:508.55,startPosition:1},0).wait(1).to({rotation:-1.5788,x:471.45,y:509.25,startPosition:2},0).wait(1).to({rotation:-2.3682,x:469.9,y:509.85,startPosition:3},0).wait(1).to({rotation:-3.1577,x:468.3,y:510.6,startPosition:4},0).wait(1).to({rotation:-3.9471,x:466.8,y:511.3,startPosition:5},0).wait(1).to({rotation:-4.7365,x:465.25,y:512.05,startPosition:6},0).wait(1).to({rotation:-5.5259,x:463.8,y:512.8,startPosition:7},0).wait(1).to({rotation:-6.3153,x:462.25,y:513.6,startPosition:8},0).wait(1).to({rotation:-7.1047,x:460.8,y:514.35,startPosition:9},0).wait(1).to({rotation:-7.8942,x:459.3,y:515.2,startPosition:10},0).wait(1).to({rotation:-8.6836,x:457.85,y:516.05,startPosition:11},0).wait(1).to({rotation:-9.473,x:456.35,y:516.9,startPosition:12},0).wait(1).to({rotation:-10.2624,x:454.9,y:517.8,startPosition:13},0).wait(1).to({rotation:-11.0518,x:453.45,y:518.7,startPosition:14},0).wait(1).to({rotation:-11.8412,x:452.05,y:519.6,startPosition:15},0).wait(1).to({rotation:-12.6307,x:450.65,y:520.55,startPosition:16},0).wait(1).to({rotation:-13.4201,x:449.25,y:521.55,startPosition:17},0).wait(1).to({rotation:-14.2095,x:447.85,y:522.5,startPosition:18},0).wait(1).to({rotation:-14.9989,x:446.5,y:523.55,startPosition:19},0).wait(1).to({startPosition:20},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:22},0).wait(1).to({startPosition:23},0).wait(1).to({startPosition:24},0).wait(1).to({startPosition:25},0).wait(1).to({startPosition:26},0).wait(1).to({startPosition:27},0).wait(1).to({startPosition:28},0).wait(1).to({startPosition:29},0).wait(1).to({startPosition:30},0).wait(1).to({startPosition:31},0).wait(1).to({startPosition:32},0).wait(1).to({startPosition:33},0).wait(1).to({rotation:-13.749,x:448.7,y:521.95,startPosition:34},0).wait(1).to({rotation:-12.4991,x:450.85,y:520.45,startPosition:35},0).wait(1).to({rotation:-11.2492,x:453.1,y:518.95,startPosition:36},0).wait(1).to({rotation:-9.9993,x:455.4,y:517.5,startPosition:37},0).wait(1).to({rotation:-8.7494,x:457.7,y:516.15,startPosition:38},0).wait(1).to({rotation:-7.4994,x:460.05,y:514.8,startPosition:39},0).wait(1).to({rotation:-6.2495,x:462.35,y:513.55,startPosition:40},0).to({_off:true},1).wait(188));

	// 老虎
	this.instance_1 = new lib.老虎1();
	this.instance_1.setTransform(164,365);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(40).to({_off:true},1).wait(188));

	// 老虎bg
	this.instance_2 = new lib.老虎bg();
	this.instance_2.setTransform(114,120,1.0285,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(40).to({_off:true},1).wait(188));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,899.8,924);


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

	// _2_png
	this.instance = new lib.元件2_1();
	this.instance.setTransform(9.1,121.35,1.1114,1.1114,29.9986,0,0,17.7,32.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({regX:17.5,regY:32.5,scaleX:1.2462,scaleY:1.2462,rotation:-23.229,x:9.2,y:121.4},11).to({regX:17.7,regY:32.4,scaleX:1.1114,scaleY:1.1114,rotation:29.9993,x:9.1,y:121.35},11).wait(1));

	// _1_png
	this.instance_1 = new lib._11();
	this.instance_1.setTransform(0,0,0.7173,0.7173);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(23));

	// __png
	this.instance_2 = new lib.元件3();
	this.instance_2.setTransform(33.6,146,1,1,0,0,0,13.6,25);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({regX:13.7,regY:24.9,rotation:80.7165,x:112.9,y:193.1},11).to({regX:13.6,regY:25,rotation:0,x:33.6,y:146},11).wait(1));

	// __png
	this.instance_3 = new lib.元件4();
	this.instance_3.setTransform(170.7,58.7,1,1,0,0,0,150.7,15.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({rotation:-25.4788,x:170.75,y:58.6},11).to({rotation:0,x:170.7,y:58.7},11).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-133.8,0,422.90000000000003,439.5);


// stage content:
(lib.做一做 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:4,m2:71,m3:118};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,5,68,71,72,112,118,119,153];
	this.streamSoundSymbolsList[5] = [{id:"马蹄声",startFrame:5,endFrame:68,loop:1,offset:0}];
	this.streamSoundSymbolsList[72] = [{id:"老虎",startFrame:72,endFrame:112,loop:1,offset:0}];
	this.streamSoundSymbolsList[119] = [{id:"牛叫",startFrame:119,endFrame:154,loop:1,offset:0}];
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
		var soundInstance = playSound("马蹄声",0);
		this.InsertIntoSoundStreamData(soundInstance,5,68,1);
	}
	this.frame_68 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_71 = function() {
		var _this = this;
		
		_this.m2stop_btn.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_72 = function() {
		var soundInstance = playSound("老虎",0);
		this.InsertIntoSoundStreamData(soundInstance,72,112,1);
	}
	this.frame_112 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_118 = function() {
		var _this = this;
		
		_this.m3stop_btn.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_119 = function() {
		var soundInstance = playSound("牛叫",0);
		this.InsertIntoSoundStreamData(soundInstance,119,154,1);
	}
	this.frame_153 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(63).call(this.frame_68).wait(3).call(this.frame_71).wait(1).call(this.frame_72).wait(40).call(this.frame_112).wait(6).call(this.frame_118).wait(1).call(this.frame_119).wait(34).call(this.frame_153).wait(1));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1stop_btn}]},4).to({state:[]},64).to({state:[{t:this.m2stop_btn}]},3).to({state:[]},41).to({state:[{t:this.m3stop_btn}]},6).wait(36));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m2_btn},{t:this.m1_btn},{t:this.m3_btn}]}).wait(154));

	// 边框和标题
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#F29539").ss(1,0,0,4).p("EA1AgZTQiNAAhkBlQhkBkAACOMAAAAn5QAACNBkBmQBkBkCNAAMBM/AAAQCMAABlhkQBkhmAAiNMAAAgn5QAAiOhkhkQhlhliMAAgEiB+gZTQiMAAhlBlQhkBkAACOMAAAAn5QAACNBkBmQBlBkCMAAMBM/AAAQCNAABkhkQBkhmAAiNMAAAgn5QAAiOhkhkQhkhliNAAgEgmfgZTQiNAAhkBlQhkBkAACOMAAAAn5QAACNBkBmQBkBkCNAAMBM+AAAQCNAABkhkQBkhmAAiNMAAAgn5QAAiOhkhkQhkhliNAAg");
	this.shape.setTransform(982.1,620.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(154));

	// 右 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgmeAZUQiNAAhkhkQhlhmABiNMAAAgn5QgBiOBlhkQBkhlCNAAMBM9AAAQCNAABlBlQBjBkABCOMAAAAn5QgBCNhjBmQhlBkiNAAg");
	mask.setTransform(1567.6,620.725);

	// 图层_5
	this.instance = new lib.元件7();
	this.instance.setTransform(1467.2,548.2,1,1,0,0,0,80.2,84.2);

	this.instance_1 = new lib.body();
	this.instance_1.setTransform(1387,459,0.9109,0.9109);

	this.instance_2 = new lib.元件6("synched",0);
	this.instance_2.setTransform(1467.2,548.2,1,1,0,0,0,80.2,84.2);

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_1},{t:this.instance_2}]},119).wait(35));

	// 图层_2
	this.instance_3 = new lib.背景png复制();
	this.instance_3.setTransform(1283,350,0.743,0.743);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(154));

	// 中 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EgmeAZUQiNAAhlhkQhjhmgBiNMAAAgn5QABiOBjhkQBlhlCNAAMBM9AAAQCNAABkBlQBlBkgBCOMAAAAn5QABCNhlBmQhkBkiNAAg");
	mask_1.setTransform(982.1,620.725);

	// 图层_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#8E592F").ss(3,1,1).p("AimApIg7AOIBYgNABcggQgfgKgLgMQgcAcg5AZIgeAJIhJAYIgcAJAB2gZQgPgDgLgEIAaAFIA/AMIACABQAEAAADAAQATACARABIgwAHAgjgBQgEABgEABQgLAFgNAFAhNAhIDIgdAiKAiQgOAEgOAD");
	this.shape_1.setTransform(987.325,668.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AicAMIgCgHIgBgIIAAgBIBJgYIgCADQgGAKgEAMQgGARABAYQABAWACAFQgrgBgNg0gABsANQgBgQgFgdIgBgEIgEgaIAAgCIA/AMIgDALQgKAngSAPIgUARg");
	this.shape_2.setTransform(989.425,671.85);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EE858F").s().p("AimApIAcgHIABAIIhYANgAhDALIAYgKIAIgCQA5gZAcgcQALAMAfAKIAaAHIAEAZIABAEIjIAdQAEgMAGgKgAC1gPIACABIAHAAIAkADIgwAHIADgLg");
	this.shape_3.setTransform(987.325,668.125);

	this.instance_4 = new lib.元件5("synched",0);
	this.instance_4.setTransform(629.95,250.05,0.7237,0.7237,0,0,0,19.3,19.3);

	var maskedShapeInstanceList = [this.shape_1,this.shape_2,this.shape_3,this.instance_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.instance_4}]},71).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]},41).wait(42));

	// 图层_4
	this.instance_5 = new lib.老虎头();
	this.instance_5.setTransform(854,511,0.7237,0.7237);

	this.instance_6 = new lib.老虎1();
	this.instance_6.setTransform(735,500,0.7237,0.7237);

	this.instance_7 = new lib.老虎bg();
	this.instance_7.setTransform(699,323,0.7443,0.7237);

	var maskedShapeInstanceList = [this.instance_5,this.instance_6,this.instance_7];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7},{t:this.instance_6},{t:this.instance_5}]}).wait(154));

	// 左 (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("EgmfAZUQiMAAhkhkQhlhmABiNMAAAgn5QgBiOBlhkQBkhlCMAAMBM+AAAQCNAABlBlQBjBkABCOMAAAAn5QgBCNhjBmQhlBkiNAAg");
	mask_2.setTransform(396.6,620.725);

	// 图层_3
	this.instance_8 = new lib.元件2_1();
	this.instance_8.setTransform(479.35,514.95,0.7852,0.7852,29.9984,0,0,17.8,32.4);

	this.instance_9 = new lib._11();
	this.instance_9.setTransform(472.85,429.2,0.5068,0.5068);

	this.instance_10 = new lib.元件3();
	this.instance_10.setTransform(496.65,532.4,0.7065,0.7065,0,0,0,13.7,25.1);

	this.instance_11 = new lib.元件4();
	this.instance_11.setTransform(593.4,470.65,0.7065,0.7065,0,0,0,150.7,15.7);

	this.instance_12 = new lib.元件1("synched",5);
	this.instance_12.setTransform(575.15,550.1,0.7065,0.7065,0,0,0,144.8,171.1);

	var maskedShapeInstanceList = [this.instance_8,this.instance_9,this.instance_10,this.instance_11,this.instance_12];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8}]}).to({state:[{t:this.instance_12}]},5).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8}]},63).wait(86));

	// 马蹄
	this.instance_13 = new lib.背景();
	this.instance_13.setTransform(96,416,0.7891,0.6555);

	var maskedShapeInstanceList = [this.instance_13];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(154));

	// title
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3D8D8D").s().p("AgeC1QgLgKgBgRQABgSALgJQALgKAPAAQAPAAALAKQALAJAAASQAAARgLAKQgLAKgPAAQgPAAgLgKgAgXBGQgEgZAHgTQAIgTANgPIAdgdQAPgNAKgOQALgPAAgRQAAgagPgRQgQgRghgBQgWAAgVALQgUALgUAVIgZgWQAXgYAbgPQAbgPAjAAQAvAAAaAZQAbAYABApQgBAXgKARQgLARgPAPIgeAcQgPANgIARQgIARAEAXg");
	this.shape_4.setTransform(1474.625,221.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3D8D8D").s().p("AiWDmIAAjZIEyAAIAADYIgiAAIAAgSIjvAAIAAATgAh1C3IDvAAIAAg7IjvAAgAh1BhIDvAAIAAg3IjvAAgAjcgfIAAgeICAAAQgEgSgIgUQgIgVgLgSIAggHQAIAMAGAOQAHAOAFANIAHAZIgVAGICIAAIAOgcIANgeIAKgcIAkAJIgTAnIgTAmICBAAIAAAegAjAiVIAAgeIC3AAQgEgLgFgLIgMgVIAggHQAIALAGAOQAHANAEAMICpAAIAAAeg");
	this.shape_5.setTransform(1437.325,221.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#3D8D8D").s().p("AjRDaIgNgLQAagaAOgfQANgeAEgfQAFgfgBgaIAAhCIFgAAIAACjIghAAIAAgZIkkAAQgGAhgPAhQgPAggbAcQgEgGgIgGgAAZBLICFAAIAAhQIiFAAgAiAAgIAAAVIgCAWIB8AAIAAhQIh6AAgAishLIAAgdIClAAIAAg0IjDAAIAAgdIDDAAIAAgsIAhAAIAAAsIDFAAIAAAdIjFAAIAAA0ICvAAIAAAdg");
	this.shape_6.setTransform(1386.325,221.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#3D8D8D").s().p("ACuDFIgRgdIiTAMIhfAJIg4AEIgcAEQgKABgFACIgGgQIgIgSQALgCAQgNQARgMAXgVIAkgiQAXgXAeghQAdgfAggnQAfgmAdgpIAhAQQg6BPg8BCQg+BDg+A1IELgXIgjgxIglgvIAdgOQAYAcAYAfQAYAhAUAeQAUAfANAZIggARIgNgZgAjMgDIgOgLQAlgbAkgjQAkgiAfgmQAegmAUgjIAhANQgYAmgfAnQghAogkAkQgkAkgmAcIgLgMg");
	this.shape_7.setTransform(1337.5,221.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#3D8D8D").s().p("AA5DjIAAj5IiNAAIAAghICNAAIAAioIAiAAIAACoICJAAIAAAhIiJAAIAAD5gAiVDiIAAkgQgPAUgOATQgOASgQAOIgIgPIgLgQQAagZAYghQAYggAUglQAVgmAOgnIAfAJQgKAbgNAaQgNAbgOAZIAAFSg");
	this.shape_8.setTransform(1287.1,221.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#3D8D8D").s().p("AjWDNIgOgLQAngaAYgpQAZgrAKg3IAiAEIgHAaQgCANgEAMQAPAjAYAUQAZATAhAIIAAiaIjOAAIAAgeIG2AAIAAAeIjHAAIAAA6ICnAAIAAAfIinAAIAABHQAcADAiAAIATABIAhAAIAmgBIAiAAIAWAAIgHAPIgFAQIiHAAQgzABgmgHQgogHgcgTQgdgTgTgjQgPAfgUAYQgTAYgaATIgLgNgAilg2IAAijIFJAAIAACjgAiEhPIEHAAIAAgsIkHAAgAiEiUIEHAAIAAgrIkHAAg");
	this.shape_9.setTransform(1237.25,222.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#3D8D8D").s().p("AA9DeIgDgQQgDgJgFgHQAZACAUAAIAdABQAHAAAFgBQAFgCAEgFQAGgGAFgTQAEgTAEgjQAEgjACg1IAGiBIiDAAQgLAZgMAXQgLAXgMASIgOgKIgOgJQARgWANgeQAPgdALghQALgiAIgiIAgAHIgKAlIgMAlICYAAIAAARIgGCQQgDA8gEAlQgEAmgGAVQgFAVgHAIQgIAKgJAEQgJAEgMABIghABIgpgCgAjPDdIAAlqIA4AAIAIgbIAIgcIAFgaIAkAHIgNAmQgHATgHARIBVAAIAAFCIiMAAIAAAogAiwCXIBtAAIAAh8IhtAAgAiwgCIBtAAIAAhtIhtAAgABQBAQgMgUgPgVIgdgnIAZgPIAeAmIAdAoQANAUAIAPIgcARQgIgPgNgUg");
	this.shape_10.setTransform(1187.675,221.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#3D8D8D").s().p("ABtDJIgIgRIApABIAZAAQAGgBACgCQACgCAAgGIAAmHIAhAAIAAGHQAAAQgFAJQgEAIgLAEQgLAEgTABQgUACgaAAIgFgRgAjRCrIA1gJIA/gLIAAhXIhiAAIAAgeIBiAAIAAg3IAgAAIAAA3IBlAAIAAAeIhlAAIAABRIA1gKIA0gKIACAdIhYASIhWAQIhKAOgABPB1IAAksIAfAAIAAEsgAAQgiIgLgRIhdAJIg3AGIgbAEIgLAEIgFgPIgHgRQAGgBAGgGIAMgPIAUgeQAOgWANgcIhTAAIAAgeID+AAIAAAeIiGAAQgOAagPAZQgQAZgQAVICHgMIgUgaIgTgZIAYgPIAcAlQAPATAMATQANASAHAOIgZARIgIgPg");
	this.shape_11.setTransform(1136.625,221.525);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#3D8D8D").s().p("AB0DiIAAkDIhmAAQAAAmgGAuQgEAugOAtQgNAugbAlQgGgGgIgGIgOgKQAagkANgsQAMgrAFgsQAEgrgBgmIAAiCIBDgPIBBgRQAdgJAWgJIAdAaQgYAJgeAIQgeAJgfAHIhAANIAABXIDKAAIAAAhIhCAAIAAEDgAjYCPIAAlFICGAAIAAEfIhmAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_12.setTransform(1088,221.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#3D8D8D").s().p("AAPDjIgFgRIgHgRIAhABIAUAAQAFAAACgCQABgCAAgFIAAkdIhOAAQgLAagMAWQgNAWgNASIgNgKIgOgLQATgYAQgeQAPgfAMgjQAMgkAIglIAfAIIgMAsQgGAWgHAVIDQAAIAFgBIAWAFIgHAlIgHAlIgIAfIgcgGIAHghIAHgnIhkAAIAAEdQAAAPgEAIQgDAIgKAEQgKAFgQABIgcABIgLAAgAifDiIAAkeQgNATgOAQIgbAfIgIgQIgLgQQAZgYAXggQAYggATglQAUglAOgmIAgAJQgLAcgNAbQgNAbgPAaIAAFPgAhGCWIgPgJQAQgUANgZQANgZAKgdQAKgeAIgdIAfAHQgMAxgSAsQgUAsgXAgIgNgJgAC5BpQgKgdgMgfQgMgegPgaIAegJQAPAaANAeQAMAeAKAdQAKAdAEAXIggAKQgEgXgJgdg");
	this.shape_13.setTransform(1036.625,221.7813);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#3D8D8D").s().p("AguA8QAdgMAQgTQAPgTACgZIgFABIgFAAQgOgBgKgIQgKgJAAgRQAAgQALgJQAKgJAOAAQAUAAAKAPQAKAPAAAaQAAAogXAcQgWAdgmAOg");
	this.shape_14.setTransform(973.525,237.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#3D8D8D").s().p("AhYDXQgGgIgGgFQApgPAXgZQAWgZAKgiQAIgiADgpIhAAAIAAibICXAAIAQggIAPgkIANggIAiALIgVAuIgVArIA0AAIAACbIg+AAIAACSQAAAJADAEQACACAKAAIAtAAQAGAAAEgEQADgEABgOQACgNAAgbIAOAIIAQAFQgBAggFASQgEARgIAHQgJAGgPAAIg1AAQgaABgJgLQgJgKAAgaIAAiSIgvAAQgDAvgLAnQgLAmgZAdQgYAcguATQgDgHgFgGgAgZgBICuAAIAAhgIiuAAgAioC+IgLgOIAMgKQAGgGAFgJQAFgJAAgLIAAipIhKAAIAAggIBsAAIAADJIA6goIAGAPIAFANIg3ApIggAYIgRAOIgIAIQgCgHgGgJgAiHiNIgbgcIgcgbIAWgUQAOAMAOAOIAcAbIAUAXIgXAZQgIgMgMgOgAgBiaIgPgfIgTgdIAcgLQAJANAJAPIARAdQAHAPAEAMIgeANQgEgMgGgOg");
	this.shape_15.setTransform(937.375,221.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_16.setTransform(887.325,221.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#3D8D8D").s().p("AhYDXQgGgIgGgFQApgPAXgZQAWgZAKgiQAIgiADgpIhAAAIAAibICXAAIAQggIAPgkIANggIAiALIgVAuIgVArIA0AAIAACbIg+AAIAACSQAAAJADAEQACACAKAAIAtAAQAGAAAEgEQADgEABgOQACgNAAgbIAOAIIAQAFQgBAggFASQgEARgIAHQgJAGgPAAIg1AAQgaABgJgLQgJgKAAgaIAAiSIgvAAQgDAvgLAnQgLAmgZAdQgYAcguATQgDgHgFgGgAgZgBICuAAIAAhgIiuAAgAioC+IgLgOIAMgKQAGgGAFgJQAFgJAAgLIAAipIhKAAIAAggIBsAAIAADJIA6goIAGAPIAFANIg3ApIggAYIgRAOIgIAIQgCgHgGgJgAiHiNIgbgcIgcgbIAWgUQAOAMAOAOIAcAbIAUAXIgXAZQgIgMgMgOgAgBiaIgPgfQgJgPgKgOIAcgLQAJANAJAPIARAdQAHAPAEAMIgeANQgEgMgGgOg");
	this.shape_17.setTransform(837.375,221.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#3D8D8D").s().p("AguA8QAdgMAQgTQAPgTACgZIgFABIgFAAQgOgBgKgIQgKgJAAgRQAAgQALgJQAKgJAOAAQAUAAAKAPQAKAPAAAaQAAAogXAcQgWAdgmAOg");
	this.shape_18.setTransform(773.525,237.35);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#3D8D8D").s().p("AB0DiIAAkDIhmAAQAAAmgGAuQgFAugNAtQgOAugaAlQgGgGgIgGIgOgKQAagkANgsQAMgrAFgsQADgrAAgmIAAiCIBDgPIBBgRQAegJAVgJIAdAaQgYAJgeAIQgeAJggAHIg/ANIAABXIDLAAIAAAhIhDAAIAAEDgAjYCPIAAlFICGAAIAAEfIhmAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_19.setTransform(738,221.75);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_20.setTransform(687.325,221.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#3D8D8D").s().p("AB0DiIAAkDIhmAAQAAAmgGAuQgFAugNAtQgNAugbAlQgGgGgIgGIgOgKQAagkANgsQAMgrAFgsQADgrAAgmIAAiCIBDgPIBBgRQAegJAVgJIAdAaQgYAJgeAIQgeAJgfAHIhAANIAABXIDKAAIAAAhIhCAAIAAEDgAjYCPIAAlFICGAAIAAEfIhmAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_21.setTransform(638,221.75);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#3D8D8D").s().p("AgNAIQgegcgbgWIAdgaQASAPAUATQATASATATQAUAVAQATIgfAaQgZgfgcgeg");
	this.shape_22.setTransform(572.075,236.475);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_23.setTransform(537.325,221.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(61,141,141,0.098)").s().p("Eg8pAPlQiQAMiZAAQrqAAoPkWQkXiUiEi0Qh0ieAAi5QAAg8AMg4QBEk/G/jrIAtgYQIBj+LLAAQBmAABkAFQAvgbA2gYQBCgdBHgYQE4hrGbAAQGaAAE5BrQBHAYBCAdQBEAfA3AhQDvhSETgjQDQgbDlAAQDlAADQAbQHqA/F5DTIA5AhQBWhPCYhEQFkigH3AAQH3AAFlCgQCBA6BSBDQFbiTHkAAIAZAAQFbADESBPQD/g6EmAAQJwAAG3EEQAmAVAiAYQFyD3AAFPQAAFxm6EFIgKAGQm1D+poAAQnsAAl5ihQhXAOheAAIgoAAQgnAYgpAUQg5Adg+AXQjPBLj7AAQkhAAjnhkQkfCamEAAIgfAAQiTAZiiAJQhWAEhaAAQhbAAhVgEQnEgYlQiWQgmgRghgSQnOC5pYAAQooAAm0icQnFDTpeAAQmcAAlVhig");
	this.shape_24.setTransform(1004,213.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]}).wait(154));

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
		{src:"images/老虎1.png?1693882779454", id:"老虎1"},
		{src:"images/老虎头_.png?1693882779454", id:"老虎头"},
		{src:"images/老虎bg.png?1693882779454", id:"老虎bg"},
		{src:"images/_1.png?1693882779454", id:"_1"},
		{src:"images/_11.png?1693882779454", id:"_11"},
		{src:"images/_2.png?1693882779454", id:"_2"},
		{src:"images/_22.png?1693882779454", id:"_22"},
		{src:"images/body.png?1693882779454", id:"body"},
		{src:"images/head.png?1693882779454", id:"head"},
		{src:"images/背景_.png?1693882779454", id:"背景"},
		{src:"images/背景png复制.png?1693882779454", id:"背景png复制"},
		{src:"sounds/老虎_.mp3?1693882779454", id:"老虎"},
		{src:"sounds/牛叫_.mp3?1693882779454", id:"牛叫"},
		{src:"sounds/马蹄声_.mp3?1693882779454", id:"马蹄声"}
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