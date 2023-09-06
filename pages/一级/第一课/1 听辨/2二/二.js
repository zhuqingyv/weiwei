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


(lib.小鸟bg = function() {
	this.initialize(img.小鸟bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,860,730);


(lib.小鸟身子 = function() {
	this.initialize(img.小鸟身子);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,228,184);


(lib.小猫 = function() {
	this.initialize(img.小猫);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,218,319);


(lib.小猫bgpng = function() {
	this.initialize(img.小猫bgpng);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,550,567);


(lib.小猴 = function() {
	this.initialize(img.小猴);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,460,490);


(lib.小雨 = function() {
	this.initialize(img.小雨);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,943,1126);


(lib.小雨bg = function() {
	this.initialize(img.小雨bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1473,1461);


(lib.大风草地 = function() {
	this.initialize(img.大风草地);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1825,603);


(lib.大风右侧树 = function() {
	this.initialize(img.大风右侧树);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,740,715);


(lib.大风左侧树 = function() {
	this.initialize(img.大风左侧树);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,516,531);


(lib.狮子 = function() {
	this.initialize(img.狮子);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,413,288);


(lib.狮子嘴巴 = function() {
	this.initialize(img.狮子嘴巴);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,28,21);


(lib.狮子眼睛 = function() {
	this.initialize(img.狮子眼睛);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,30,30);


(lib.狮子bg = function() {
	this.initialize(img.狮子bg);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,858,564);


(lib.翅膀 = function() {
	this.initialize(img.翅膀);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,96,104);


(lib.雨伞png = function() {
	this.initialize(img.雨伞png);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,807,686);// helper functions:

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


(lib.元件25 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#E47979").s().p("AAJBaQhngNhDhVIgKgSIAYgWQBGgyBOAIQBXAMAxA8QAfAkAEAbQg7AvhIAAQgQAAgQgCg");
	this.shape.setTransform(18.3,25.0131);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E05D5B").s().p("ABxBTQgxg7hWgNQhPgHhGAxIgZAXQgMgXACgxQADg4AZgeQAggoBDgPQA5gOA6AHQAtAFAqAUQAvAZAUAiQAXAvgIBAQgHA5gcAWIgWASQgFgcgeglg");
	this.shape_1.setTransform(20.7229,14.786);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件25, new cjs.Rectangle(0,0,41.5,34.2), null);


(lib.元件23 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#E47979").s().p("AjRAPIgRgTIAagiQBPhQBqgBQBqgCBPBLQAnAmASAoQhUBXh3ACQiHAAhihqg");
	this.shape.setTransform(31.2,27.8974);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E05D5B").s().p("ACaBNQhPhMhqACQhqABhPBQIgaAiQhShmgDiNQADgHgDgKIBaAFQARAhA1AZQBRAnBjgFQBqAABLgsQAvgYARgmQAXAAAtgEIACAQQAECYhhByIgYAdQgTgqgmglg");
	this.shape_1.setTransform(32.808,15.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AixATQg1gYgRgiQD5AKD2gXQgRAmgvAXQhLAshqAAIgYAAQhVAAhHgig");
	this.shape_2.setTransform(33.85,5.6836);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件23, new cjs.Rectangle(0,0,65.6,40), null);


(lib.元件22 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#F3A94D").s().p("AgfgPIACgGIA9AeIgQANg");
	this.shape.setTransform(20.9377,32.9128,3.7715,3.7715);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F3A94D").s().p("AgGAtIgMhWIAGgFIAfBdg");
	this.shape_1.setTransform(7.1718,50.0731,3.7715,3.7715);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F3A94D").s().p("AgxAMIBigdIgIAZIhWAKg");
	this.shape_2.setTransform(29.235,6.8896,3.7715,3.7715);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件22, new cjs.Rectangle(0,0,47.9,67.7), null);


(lib.元件21 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FAD6C0").s().p("AAAgRIADgYIgEBTQgDgcAEgfg");
	this.shape.setTransform(309.0205,404.9205,3.7715,3.7715);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FADFCB").s().p("AgTAFIABgNQABgHAHgCQAKgGAIAJQAJAGADAKIADAHIABAEIgBAGIgtABIADgPg");
	this.shape_1.setTransform(299.2685,320.6914,3.7715,3.7715);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#F5C19A").ss(0.9,1,1).p("AAagDQgUgWgVATQAKgUASgKAgPgGQgHANgCATIgBAL");
	this.shape_2.setTransform(330.6662,238.1645,3.7715,3.7715);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FADFCB").s().p("AgxBUQgOgIAHgwIALg4IAIgQQANgaAZgMQAVgJALAGQAaAOAAAmQABAhgTAkQgUAnggAKQgKADgJAAQgKAAgJgEg");
	this.shape_3.setTransform(330.0992,242.234,3.7715,3.7715);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#F5C19A").ss(0.9,1,1).p("AgEgmQAQANAGAUQAGAPgCASIAAALAgWgIQAWgSASAV");
	this.shape_4.setTransform(78.5078,236.6559,3.7715,3.7715);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FADFCB").s().p("AAABVQgdgNgPgrQgMgkAFgkQAGgmAcgJQAMgEASANQAYAPAJAcIAGARIABA6QAAAxgPAEQgGACgGAAQgMAAgOgHg");
	this.shape_5.setTransform(78.696,240.5068,3.7715,3.7715);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#2D3333").s().p("AlLCoIgGgcQgFgegBgmQABhqA3g2QBKgwBggTQBYgSBYAJQBWAIBCAbQBEAaAaAkQAfArAGBjQACAdgBAjIgBAcIhfAAIgSiMIAACMIiVAAIgYiGIgBCGIi0gBIgOiEIgGCGg");
	this.shape_6.setTransform(202.745,127.471,3.7715,3.7715);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#EEB680").ss(0.9,1,1).p("AgZgGQABgGAFgFQADgDACgBQAGgEAHAAQAKgBAIAHQAIAHABALQAAAKgHAIQgIAJgKAA");
	this.shape_7.setTransform(218.1875,247.5697,3.7715,3.7715);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgGAIQgDgCgBgFQgBgDAEgEQADgEAEAAQAEgBADAEQAEACAAAFQAAAEgDADQgCAEgFAAQgEAAgDgDg");
	this.shape_8.setTransform(260.9459,212.9478,3.7715,3.7715);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#2D3333").s().p("AgaAgQgNgMgCgRQgBgQALgNQAMgNARgCQAQgBANALQANALACARQABAQgLAOQgLAOgSAAIgDABQgOAAgMgKg");
	this.shape_9.setTransform(269.5692,217.3297,3.7715,3.7715);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgGAIQgDgDAAgEQgBgDADgEQACgDAFgBQAEAAADADQADACAAAFQABADgDAEQgCADgFAAIgBABQgDAAgDgDg");
	this.shape_10.setTransform(154.6973,212.4397,3.7715,3.7715);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#2D3333").s().p("AgZAfQgMgMgBgQQgCgPALgMQALgNAQgCQAQgBAMALQAMAKACARQABAPgLANQgJAMgRABIgEABQgOAAgLgJg");
	this.shape_11.setTransform(163.4931,216.387,3.7715,3.7715);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgnAwQgTgRgDgaQgBgZAPgTQASgUAZgCQAZgBATAQQAUARABAZQADAYgRAUQgRAUgZACIgFAAQgWAAgRgOg");
	this.shape_12.setTransform(158.2515,216.8933,3.7715,3.7715);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgpAxQgVgRgCgbQgDgaASgVQARgUAbgCQAagCAVARQAUARADAbQACAagRAVQgSAVgbACIgFAAQgYAAgRgQg");
	this.shape_13.setTransform(264.6431,217.5333,3.7715,3.7715);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FADFCB").s().p("AhOEdQhigdg3gpQg1gpgHgzQgHgqgKhUQgKhhgKg9QASgSAhgYQBAguBJgYQDohMDjCzQAIAUACBjQABBjghBbQgKAdgTAYQgqA0hUAdQhJAYg/AAQgsAAgogMg");
	this.shape_14.setTransform(201.3093,221.1995,3.7715,3.7715);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F9D4B6").s().p("AgqArQgSgSAAgZQAAgZASgRQARgSAZAAQAaAAARASQASASAAAYQAAAYgSATQgTASgYAAQgYAAgSgSg");
	this.shape_15.setTransform(212.9012,324.4375,3.7715,3.7715);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FADFCB").s().p("AhLAiQADg7AohaQANgcAPgPQAagbAugKIACgBQAHgBgBA7QgBA9gOAQQgaAagIA4QgJBEApAdIgtBPQheg3AFhsg");
	this.shape_16.setTransform(137.2576,404.9559,3.7715,3.7715);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FADFCB").s().p("AAWDFQgfgHgKgbQgphagZhEQgxiDAkACIALgBQANAAAOAHQArAXAYBRIATA3QACAGAAAFQACgVAAgqIAAgnQgOgGgOgKQgcgVADgUQABgMAZgXQANgMANgJIAEgEQAGgIAFgJIAbgNQAsArgBAhQgBAWgRAcIARBmQAGAogOA1QgMAvgOAMQgSAPgXAAQgIAAgIgBg");
	this.shape_17.setTransform(299.5869,369.2713,3.7715,3.7715);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#E05D5B").s().p("AgaARQgFgNgDgWIgBgSQAEAPALANQATATAYAAQAJAAAEgCQgYAcgQAAQgNAAgJgUg");
	this.shape_18.setTransform(203.5667,342.9698,3.7715,3.7715);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#E05D5B").s().p("AgQAkIgOgFQARgEANgOQAIgJAFgNQAEgMAAgMIAAgGQAfBJglAGIgGAAQgJAAgMgEg");
	this.shape_19.setTransform(229.1159,334.8744,3.7715,3.7715);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#9BD4CF").s().p("AkKDVIBri8IAAgNQgCidAMiPIDOgZIA3ACQA8B2AeBmQAZBWAXCLIAAADQAKA7AHBTQiEAjhsAAQi1AAhwhlg");
	this.shape_20.setTransform(219.7841,439.755,3.7715,3.7715);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#2D3333").s().p("AE0IyIgwAGIngg5QgUgDg6gSIg2gSIgVh5IghB+IhLgJIAShwIAZisIABhlQAAhdAHhAQAUjeBfhvQBziHCmgWQCmgXCoBhQCcBZAXC/QAHBBgHBOIgNBlQgKBIguDnIgvDog");
	this.shape_21.setTransform(181.9277,214.7366,3.7715,3.7715);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,363.9,558.1);


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
	this.shape.graphics.f("#5D160B").s().p("Ag2AfQgXgNAAgSQAAgRAXgNQAWgMAgAAQAhAAAWAMQAXANAAARQAAASgXANQgWAMghAAQggAAgWgMg");
	this.shape.setTransform(11.85,16.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#7B3E20").s().p("AhOBIQglgigBg+QAAg+AigLQAigKA2AEQA3AEAbAIQAbAIABBAQACA+ghAeQghAegwACIgEAAQgrAAgjghg");
	this.shape_1.setTransform(11.6531,10.4899);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,23.3,21);


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
	this.instance = new lib.狮子嘴巴();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件10, new cjs.Rectangle(0,0,28,21), null);


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
	this.instance = new lib.狮子眼睛();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件9, new cjs.Rectangle(0,0,30,30), null);


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

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,0,0,4).p("AAAkbIAAI3");
	this.shape.setTransform(0,28.4);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件8, new cjs.Rectangle(-1,-1,2,58.8), null);


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
	this.instance = new lib.雨伞png();
	this.instance.setTransform(0,39.2,0.4167,0.4167,-6.694);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件6, new cjs.Rectangle(0,0,367.3,323.1), null);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#B5913C").p("EAgSgY3QgtCRg1CTEAh/gexQgfB2gjB3AChzhQgMAogNAoACBx8QgpCBgtCBAD54IQgfBsghBtAiJ4JQgRDAgyDtQgmCyg1CxAiF9WQAMB9gLCdAOL33QhCBchHBdAQF6nQgpA9grA+AK6zhQheB3hmB4AYi8hQAhBegLB3AYb2zQgdBpg4B5QgXAxgbAxASZwpQgRApgRApQgYA5gYA2AFj+ZQgbBugeBvASf+ZQg0BWg4BWAXV+xQhqF+ioGkAb6tGQg6CJhBCLAZKnCQhMCdhUCfQgaAxgaAwAOnoUQgDAFgCAFQhiC8hjCZAPPo1QgWAVgXAWQhiBZhvBZAE0EzQgEADgDACAMLOEQhCBRhDBLAQLIuQhRB1hSBrAVeAFQiaEXiiDvARerHQg/BEhGBEAKWhLQh/CyiBB5AC8qSQgVAXgWAXAizkiQAAAEgDACQhDCphECXABKBnQgjAVgkAVAlapeQhFDJhZDGAAJsXQhYD6hkD7Qj0DjjxCyQkEDBkACLABXooQiFCLiFB7ApCgyQgqBSgsBTQg3Bkg7BiAstFzQgbAtgdAsAp4KVQgXAogYAmAriNAQgdAsgdApAt3HqQgeAtgfAuAmDC/QhlDZhmC1ADoWrQi5CVjBBtAkFbpQkmCRk4A1AI3R1Qg0A2g0AzAHDiNQiIBfiYBeAFXs8QgoAugrAuAtDPLQjsE9jsB4AAptzQgPAtgQAtAHZvQQg6BDg8BEAehzpQhCC0hNC2AVQv+QhOB5hmB4AREtiQhOCxhPCbA9ILSQghAJgiAIA44J7QhqAohqAfEghVAMKQgUADgVADA2SWwQgPAEgQAEA00IMQhBAfhBAc");
	this.shape.setTransform(243.3,197.0421);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#8ABF78").s().p("AobaZQBFhFA6gTQg2C4iLCmIiBCBQA6j8CJiLgAtSZ/QBIgKAxAIQASADAOAFQiXByjTAwIi3AbQDHinDBgcgAAnV7QBEhGA5gSQg3C1iJCnIiACBQA6j9CJiIgA0USHIANgJQBFg0A3gKIgGAOQhNCmiaCMIiQBxQBZjyCbh4gAoyXrQDdiHDDAAQBYAAAzAXIAKAFQg7AghCAXQh3ApiLALgAGqRXQgbASgdAQQhFAohPAgIiuA1QCqjDC7g4QA8gSAtgCQAxgzAsgRIgCAJQgoC1h8CrIh2CNQAdi/BOiDgAuZPVIBSiBQAWC9g/DOQggBpgkBCQgtj/BIi2gA28RvQBggCA2AZIACABQilBejXAWIi4ACQDZiMDDgCgApUI2IAMgTIgPgVQhGhmgwiCIgghuIgThCIAmAkQCICIA2CPIAJAbIAQgZQAIA/gBBBQAEApgHAfIgCgCQgJBhgeBmQggBpgkBBQguj/BGi1gAKqLvQA7gHAsAGQAcADAXAJQg9AphFAgQhvAyiEAZIi1ATQDOifDCgTgAOVJSQAZgpAegkQAUgXATgSQAqgpAogPQgoC5iACwIh1CNQAejDBPiFgA73HWQAeggAbgWQAjgcAggLIgGAXQgxCrh9ChIh7CHQAwj+CDiPgAsTJsQBNgQA0AHQAOACALADQgeAagiAXQh8BWilAxIi0AlQC9izC+gmgAtmFOQAfgkAegXQAfgYAdgLQgtC4iFCsIh7CIQAuj+CGiQgA3SFkQATgPASgMQAlgYAhgMQieAHirgxIiqhBQD/gxC2BFQBSAgAnAnIAJAKIgpAEQhOCrieCPIiQBwQBajxCch4gA/LHYQAfgNAggJQBUgYA4AHIALACQiHCFjKBOIivAzQCQigCahBgAypDaIATgPQBNg8A7gMIgEAKQhMCpidCOIiQBwQBUjjCOh3gAumB0QBBhHA4gUQgsC3iGCsIh7CHQAvj+CFiRgAU2BGIA8iMQAzC3geDXQgQBrgaBHQhUj1Ati/gAQfDqQBUgXA5AGIANACIgkAhQh/BuiyBDIixAzQCvi/C9g3gAntFjQh7h2gziEIgHgoIgXhuQAeAZAcAbQA5A8AxBIQBYjdCThxQAWgRAUgNIAAgCIgQiaQAzAzArA9IADAGIAOgDIgGANQApA+AhBHQB4gqBvACIADAAIAcACIAJgLQASgSARgPQAwgsApgPIAAAEQgQA7gZA5QAOAFAMAGIgoATQgxBphPBiIh8CFQAhinBFh1QhKAThPAIQAkBdAKBGQhYhPg7hRIh6gBQAtgbAsgWQgVghgPgiIgWAgQg/BYhYBPIh+BiQAlA5AfBAIAFALQAtBaARBFQg4gqgvgtgAF/ATQAegIAagFIAHgBIAAgEQgPiYAph9IBJiHIAGAhQASgkAUghIAHgKQiTAoirgIIh4gRQgSAkgTAbQgDgjgBghIgVgDIAVgJQgDjOBMiSIAkgvIA5hLIABAPQAAC2hPDCIgZA6QC7hECgAWQA8AJAqAQQA1hHBAgyQBPg8A5gLQgKAYgMAXQgRAhgUAgQAbAvAWAzQAyB4ATCQQAPBqgGBLQh6iwgcijQgFgjgCgiIAPhwQhCBhhfBYIhZBFQAGBtgUB2QgFAigJAjIgDAPIAJABIgMAMQgWBYgcA5QgLgtgHgrQhxBViUA2IivAzQCui/C9g1gAnjm+QBAgyA1gRIAUgEQglBTg5BOQg8BThUBMIiRBwQBbjzCbh2gAaOoQIA+iNQAxC4ggDXQgPBrgaBHQhTj1Ati/gAWHlbQBIgHAxALQASADAOAGQgbASgcAQQiLBOizAgIi2ARQDOidDEgRgAQZrxIBAh2IAJgRIACAHQAfC4gyDQQgaBrgfBDQg9j9A+i5gAaXszQBBgmAygLQAQgEAOgBQgkA9gwA4QhPBdhuBQIieBeQB4jmCmhkgAkXvfQBCg6A4gSIAPgEQgXBRgqBOQg0BghSBZIiJB+QA1kBCSiFgAAMwEQBNg8A7gLIAAAAIgBACQhMCtifCRIiQBwQBajzCah2gATov5IgEgNIgWiOIgBgKIAEAEQAtAqAoAxQBQBkA5CDQAuBlAPBJQjCidhCiygAH8riQCzhtCigSQiwiig1ivIgIhQIgJhKQAUATASAVQBtB7BFCuQAiBWAOBCQAegDAcABQBhACA0AbIACABIgDABQimBXjYAPgAeFx4IALghQiVBcjFAkIi1ATQBohQBlgsQhIhXgrhXQguhagPhaIADiZQBMBhAyB7QAbBDATBKQATBLAHA8QBWgiBVgJQBVgIA1AQIABgBIBGhyQAYC7g7DSQgcBngkBDQgtjjAyipgAFHvEQgygtglgzIg9iBIgEgKIAHADQBzA6BmBgQAtAqAqAyQBHBTAjBBQihhDhohfgATO16QhOheguhdIh1AoQAtg2AugsQgbhDgKhDIADg0IADhcQhAAnhKAgIivA6QCmjIC4g8QBLgYA0ABQAPAAAMACQgiAkgnAgQg0Arg9AmQAPAUAOAWQAxBMAjBZQBTg+BXgeQBdggA7AKQh0B+iuBUIANA2QAXBdAFBFQBBgxA0gPIAPgDQgYA2ggAzQhHByhwBlIiQBxQBZjxCYh2gACN19QBLg6A6gMIAEgBIgKAWQhNChiXCJIiPBxQBaj0Cah2gAiY3LQA6hRA1gcQgWC9hvC7IhpCWQAPkCBwifgAM84FIAIgOIBFh3IAEAaQAWCvg0DEQgcBogiBEQg2j/BBi1gAHixuQidi+gai6IABgtIAChsIAWAeQBhCOAuC/QAVBXAFBCIACAdIgNgQgAe+40QBJgUA0ADQAPABANADQgVAUgXASQh8BmisBAIixAwQCwi9C8gygAhr8tQA+gxAygQQAMgEAMgCQgNAdgPAcQhLCNiGB6IiQBwQBajzCbh2gAFS+dQA1g5AugYQAMgHANgEQgZBhgyBeQgrBTg+BRIh8CHQAxj+CDiQgAam7lQg4hPgchTIgWiYQBLBGA8BbQAyBNAoBcQAqBjAPBJQhthbhDhhgEAhtge9QAxgmAqgTQAYgKAWgEQgjBQg2BLQg+BWhWBPIiRBwQBbjzCah2g");
	this.shape_1.setTransform(229.45,227.6359);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件5, new cjs.Rectangle(0,-1,461.8,436.7), null);


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
	this.instance = new lib.小猴();
	this.instance.setTransform(0,0,0.502,0.502);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件4, new cjs.Rectangle(0,0,231,246), null);


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
	this.instance = new lib.大风右侧树();
	this.instance.setTransform(0,0,0.3005,0.3005);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件3, new cjs.Rectangle(0,0,222.4,214.9), null);


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
	this.instance = new lib.大风左侧树();
	this.instance.setTransform(0,0,0.4959,0.4959);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件2_1, new cjs.Rectangle(0,0,255.9,263.4), null);


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


(lib.狮子眼睛_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.元件9();
	this.instance.setTransform(15,15,1,1,0,0,0,15,15);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(35).to({scaleY:0.4733,y:14.95},0).wait(1).to({scaleY:0.0533,skewX:180},0).wait(1).to({scaleY:0.4733,skewX:0},0).wait(1).to({scaleY:1,y:15},0).wait(8));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,30,30);


(lib.狮子嘴巴_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(14,14.5,1,1,0,0,0,14,10.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({y:13.8},0).wait(1).to({y:13.15},0).wait(1).to({y:12.45},0).wait(1).to({y:11.8},0).wait(1).to({y:11.1},0).wait(1).to({y:10.45},0).wait(1).to({y:9.8},0).wait(1).to({y:9.1},0).wait(1).to({y:8.45},0).wait(1).to({y:7.75},0).wait(1).to({y:7.1},0).wait(1).to({y:6.4},0).wait(1).to({y:5.75},0).wait(1).to({y:5.05},0).wait(1).to({y:4.4},0).wait(1).to({y:3.7},0).wait(17).to({y:4.1},0).wait(1).to({y:4.5},0).wait(1).to({y:4.9},0).wait(1).to({y:5.3},0).wait(1).to({y:5.7},0).wait(1).to({y:6.1},0).wait(1).to({y:6.5},0).wait(1).to({y:6.9},0).wait(1).to({y:7.3},0).wait(1).to({y:7.7},0).wait(1).to({y:8.1},0).wait(1).to({y:8.5},0).wait(1).to({y:8.9},0).wait(1).to({y:9.3},0).wait(1).to({y:9.7},0).wait(1).to({y:10.1},0).wait(1).to({y:10.5},0).wait(1).to({y:10.9},0).wait(1).to({y:11.3},0).wait(1).to({y:11.7},0).wait(1).to({y:12.1},0).wait(1).to({y:12.5},0).wait(1).to({y:12.9},0).wait(1).to({y:13.3},0).wait(1).to({y:13.7},0).wait(1).to({y:14.1},0).wait(1).to({y:14.5},0).wait(1));

	// 图层_2_复制 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AhGBsQglgHgBgNQAAgNAigCQAigCA2AAQA3ABAbACQAbACABANQACAMghAHQghAGgwAAIgEAAQgrAAgjgGg");
	var mask_graphics_1 = new cjs.Graphics().p("AhGBsQgkgIgBgQQgBgQAigDQAjgCA1ABQA3AAAbADQAbACACAQQABAQghAIQghAHgvABIgFAAQgrAAgjgJg");
	var mask_graphics_2 = new cjs.Graphics().p("AhGBtQgkgKgBgTQgBgTAigDQAjgEA1ACQA3ABAbACQAbADACATQACATgiAKQghAJgvAAIgEAAQgsAAgjgKg");
	var mask_graphics_3 = new cjs.Graphics().p("AhGBuQgkgMgBgWQgBgWAjgEQAigEA2ACQA2ABAbADQAbADACAWQACAXghAKQgiALgvABIgEAAQgsAAgjgMg");
	var mask_graphics_4 = new cjs.Graphics().p("AhFBvQglgOgBgZQAAgZAigFQAigEA2ACQA3ABAbAEQAbADABAaQACAZghAMQghANgwAAIgEAAQgsAAgigNg");
	var mask_graphics_5 = new cjs.Graphics().p("AhFBwQglgQAAgcQgBgcAigFQAjgFA1ACQA3ACAbAEQAbADACAdQABAdghANQghAOgvABIgFAAQgrAAgjgPg");
	var mask_graphics_6 = new cjs.Graphics().p("AhFBxQgkgRgBggQgBgfAigGQAjgFA1ACQA3ACAbAEQAbAEACAgQACAggiAPQghAPgvABIgFAAQgrAAgjgQg");
	var mask_graphics_7 = new cjs.Graphics().p("AhFByQgkgTgBgjQgBgjAjgFQAigGA2ACQA2ACAbAFQAbAFACAiQACAjghARQgiARgvABIgEAAQgsAAgjgSg");
	var mask_graphics_8 = new cjs.Graphics().p("AhEBzQglgVgBgmQgBgmAjgGQAigGA2ACQA2ADAcAFQAbAFABAmQACAmghASQghASgwABIgEAAQgsAAgigTg");
	var mask_graphics_9 = new cjs.Graphics().p("AhEB0QglgXAAgpQgBgpAigGQAigGA2ABQA3ADAbAFQAbAGACApQABApghAUQghAUgvABIgFAAQgrAAgjgVg");
	var mask_graphics_10 = new cjs.Graphics().p("AhEB0QgkgYgBgsQgBgsAigGQAjgHA1ADQA3ACAbAFQAbAGACAsQACAtgiAVQghAVgvABIgFAAQgrAAgjgXg");
	var mask_graphics_11 = new cjs.Graphics().p("AhEB1QgkgagBgvQgBguAjgHQAigIA2ADQA2ADAbAGQAbAFACAwQACAvghAXQgiAXgvABIgEAAQgsAAgjgZg");
	var mask_graphics_12 = new cjs.Graphics().p("AhDB2QglgbgBgzQgBgxAjgIQAigIA2ADQA2ADAcAHQAbAGABAyQACAzghAYQghAYgwABIgEAAQgsAAgigag");
	var mask_graphics_13 = new cjs.Graphics().p("AhDB3QglgdAAg1QgBg1AigJQAigIA2ADQA3ADAbAHQAbAHACA1QABA2ghAaQghAZgvACIgFAAQgrAAgjgcg");
	var mask_graphics_14 = new cjs.Graphics().p("AhDB4QgkgfgBg4QgBg4AigJQAjgJA1ADQA3ADAbAIQAbAHACA4QABA5ghAcQghAbgvABIgFABQgrAAgjgeg");
	var mask_graphics_15 = new cjs.Graphics().p("AhDB5QgkghgBg7QgBg7AigKQAjgKA1AEQA3AEAbAIQAbAIACA7QACA8giAdQghAcgvACIgEAAQgsAAgjgfg");
	var mask_graphics_16 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_17 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_18 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_19 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_20 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_21 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_22 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_23 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_24 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_25 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_26 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_27 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_28 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_29 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_30 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_31 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_32 = new cjs.Graphics().p("AhDB6QgkgjgBg+QgBg+AjgKQAigLA2AEQA2AEAbAIQAbAJACA+QACA/ghAeQgiAfgvABIgEABQgsAAgjghg");
	var mask_graphics_33 = new cjs.Graphics().p("AhDB5QgkghgBg9QgBg8AjgKQAigKA2AEQA2AEAbAIQAbAIACA8QACA+ghAdQgiAdgvACIgEAAQgsAAgjggg");
	var mask_graphics_34 = new cjs.Graphics().p("AhDB5QgkghgBg7QgBg6AigJQAjgKA1AEQA3ADAbAIQAbAIACA6QACA8giAcQghAdgvABIgEABQgsAAgjgfg");
	var mask_graphics_35 = new cjs.Graphics().p("AhDB4QgkgfgBg5QgBg4AigKQAjgJA1ADQA3AEAbAHQAbAIACA5QACA5giAcQghAbgvACIgFAAQgrAAgjgeg");
	var mask_graphics_36 = new cjs.Graphics().p("AhDB4QglgfAAg3QgBg2AigJQAjgJA1ADQA3ADAbAIQAbAHACA3QABA4ghAaQghAbgvACIgFAAQgrAAgjgdg");
	var mask_graphics_37 = new cjs.Graphics().p("AhDB3QglgdAAg2QgBg0AigJQAigJA2AEQA3ADAbAHQAbAHACA1QABA2ghAaQghAagvABIgFAAQgrAAgjgcg");
	var mask_graphics_38 = new cjs.Graphics().p("AhDB3QglgdgBgzQAAgzAigIQAigJA2ADQA3ADAbAHQAbAHABAzQACA0ghAZQghAZgwACIgEAAQgsAAgigbg");
	var mask_graphics_39 = new cjs.Graphics().p("AhEB2QgkgbgBgyQgBgxAjgIQAigIA2ADQA2ADAbAHQAcAGABAxQACAzghAYQgiAYgvABIgEAAQgsAAgjgag");
	var mask_graphics_40 = new cjs.Graphics().p("AhEB2QgkgbgBgwQgBgvAjgHQAigIA2ADQA2ADAbAGQAbAGACAwQACAwghAXQgiAXgvACIgEAAQgsAAgjgZg");
	var mask_graphics_41 = new cjs.Graphics().p("AhEB1QgkgZgBguQgBguAigHQAjgIA1ADQA3ADAbAGQAbAFACAvQACAugiAXQghAWgvABIgEAAQgsAAgjgYg");
	var mask_graphics_42 = new cjs.Graphics().p("AhEB0QgkgYgBgsQgBgsAigGQAjgIA1ADQA3ADAbAFQAbAFACAtQACAtgiAVQghAVgvACIgFAAQgrAAgjgYg");
	var mask_graphics_43 = new cjs.Graphics().p("AhEB0QgkgXgBgrQgBgqAigHQAjgGA1ADQA3ACAbAFQAbAGACAqQABArghAUQghAVgvABIgFAAQgrAAgjgWg");
	var mask_graphics_44 = new cjs.Graphics().p("AhEBzQglgWAAgoQgBgpAigGQAigGA2ABQA3ADAbAFQAbAGACAoQABApghAUQghATgvACIgFAAQgrAAgjgWg");
	var mask_graphics_45 = new cjs.Graphics().p("AhEBzQglgVgBgnQAAgnAigGQAigGA2ACQA3ACAbAGQAbAFABAnQACAnghASQghATgwABIgEAAQgsAAgigUg");
	var mask_graphics_46 = new cjs.Graphics().p("AhEByQglgUgBglQgBgkAjgHQAigGA2ADQA2ACAcAFQAbAFABAlQACAlghASQgiASgvABIgEAAQgsAAgigUg");
	var mask_graphics_47 = new cjs.Graphics().p("AhFByQgkgTgBgjQgBgjAjgGQAigGA2ACQA2ACAbAFQAbAFACAjQACAjghARQgiARgvABIgEAAQgsAAgjgSg");
	var mask_graphics_48 = new cjs.Graphics().p("AhFBxQgkgSgBghQgBghAigGQAjgFA1ACQA3ACAbAEQAbAFACAhQACAigiAQQghAQgvABIgEAAQgsAAgjgSg");
	var mask_graphics_49 = new cjs.Graphics().p("AhFBxQgkgRgBggQgBgfAigFQAjgFA1ACQA3ACAbAEQAbAEACAfQACAggiAPQghAPgvABIgFAAQgrAAgjgQg");
	var mask_graphics_50 = new cjs.Graphics().p("AhFBwQgkgQgBgdQgBgeAigFQAjgEA1ABQA3ACAbAEQAbAEACAeQABAdghAPQghAOgvABIgFAAQgrAAgjgQg");
	var mask_graphics_51 = new cjs.Graphics().p("AhFBwQglgPAAgcQgBgcAigEQAigFA2ACQA3ACAbADQAbAEACAcQABAcghANQghANgvABIgFAAQgrAAgjgOg");
	var mask_graphics_52 = new cjs.Graphics().p("AhFBvQglgOgBgaQAAgZAigFQAigEA2ACQA3ABAbAEQAbADABAaQACAaghANQghAMgwABIgEAAQgsAAgigOg");
	var mask_graphics_53 = new cjs.Graphics().p("AhFBvQglgNgBgYQgBgYAjgEQAigEA2ABQA2ACAcADQAbADABAYQACAYghAMQghAMgwAAIgEAAQgsAAgigMg");
	var mask_graphics_54 = new cjs.Graphics().p("AhGBuQgkgMgBgWQgBgWAjgEQAigDA2ABQA2ABAbADQAbADACAXQACAWghAKQgiALgvABIgEAAQgsAAgjgMg");
	var mask_graphics_55 = new cjs.Graphics().p("AhGBuQgkgLgBgVQgBgUAjgDQAigEA2ACQA2ABAbADQAbACACAVQACAUghAKQgiAKgvAAIgEAAQgsAAgjgKg");
	var mask_graphics_56 = new cjs.Graphics().p("AhGBtQgkgKgBgSQgBgTAigDQAjgDA1ABQA3ACAbACQAbACACATQACASgiAJQghAJgvABIgEAAQgsAAgjgKg");
	var mask_graphics_57 = new cjs.Graphics().p("AhGBtQgkgJgBgRQgBgRAigCQAjgDA1ABQA3ABAbACQAbACACARQABARghAIQghAIgvAAIgFAAQgrAAgjgIg");
	var mask_graphics_58 = new cjs.Graphics().p("AhGBsQglgIAAgPQgBgOAigDQAjgCA1ABQA3ABAbACQAbACACAOQABAPghAHQghAHgvABIgFAAQgrAAgjgIg");
	var mask_graphics_59 = new cjs.Graphics().p("AhGBsQglgHgBgNQAAgNAigCQAigCA2AAQA3ABAbACQAbACABANQACAMghAHQghAGgwAAIgEAAQgrAAgjgGg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:12.4542,y:11.4257}).wait(1).to({graphics:mask_graphics_1,x:12.4776,y:11.6776}).wait(1).to({graphics:mask_graphics_2,x:12.5011,y:11.9295}).wait(1).to({graphics:mask_graphics_3,x:12.5245,y:12.1813}).wait(1).to({graphics:mask_graphics_4,x:12.5479,y:12.4332}).wait(1).to({graphics:mask_graphics_5,x:12.5714,y:12.6851}).wait(1).to({graphics:mask_graphics_6,x:12.5948,y:12.9369}).wait(1).to({graphics:mask_graphics_7,x:12.6182,y:13.1888}).wait(1).to({graphics:mask_graphics_8,x:12.6417,y:13.4406}).wait(1).to({graphics:mask_graphics_9,x:12.6651,y:13.6925}).wait(1).to({graphics:mask_graphics_10,x:12.6886,y:13.9444}).wait(1).to({graphics:mask_graphics_11,x:12.712,y:14.1962}).wait(1).to({graphics:mask_graphics_12,x:12.7354,y:14.4481}).wait(1).to({graphics:mask_graphics_13,x:12.7589,y:14.6999}).wait(1).to({graphics:mask_graphics_14,x:12.7823,y:14.9518}).wait(1).to({graphics:mask_graphics_15,x:12.8057,y:15.2037}).wait(1).to({graphics:mask_graphics_16,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_17,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_18,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_19,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_20,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_21,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_22,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_23,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_24,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_25,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_26,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_27,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_28,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_29,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_30,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_31,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_32,x:12.8292,y:15.4555}).wait(1).to({graphics:mask_graphics_33,x:12.8153,y:15.3063}).wait(1).to({graphics:mask_graphics_34,x:12.8014,y:15.157}).wait(1).to({graphics:mask_graphics_35,x:12.7875,y:15.0078}).wait(1).to({graphics:mask_graphics_36,x:12.7736,y:14.8585}).wait(1).to({graphics:mask_graphics_37,x:12.7597,y:14.7093}).wait(1).to({graphics:mask_graphics_38,x:12.7458,y:14.56}).wait(1).to({graphics:mask_graphics_39,x:12.732,y:14.4108}).wait(1).to({graphics:mask_graphics_40,x:12.7181,y:14.2615}).wait(1).to({graphics:mask_graphics_41,x:12.7042,y:14.1123}).wait(1).to({graphics:mask_graphics_42,x:12.6903,y:13.963}).wait(1).to({graphics:mask_graphics_43,x:12.6764,y:13.8138}).wait(1).to({graphics:mask_graphics_44,x:12.6625,y:13.6645}).wait(1).to({graphics:mask_graphics_45,x:12.6486,y:13.5153}).wait(1).to({graphics:mask_graphics_46,x:12.6347,y:13.366}).wait(1).to({graphics:mask_graphics_47,x:12.6208,y:13.2168}).wait(1).to({graphics:mask_graphics_48,x:12.607,y:13.0675}).wait(1).to({graphics:mask_graphics_49,x:12.5931,y:12.9183}).wait(1).to({graphics:mask_graphics_50,x:12.5792,y:12.769}).wait(1).to({graphics:mask_graphics_51,x:12.5653,y:12.6198}).wait(1).to({graphics:mask_graphics_52,x:12.5514,y:12.4705}).wait(1).to({graphics:mask_graphics_53,x:12.5375,y:12.3213}).wait(1).to({graphics:mask_graphics_54,x:12.5236,y:12.172}).wait(1).to({graphics:mask_graphics_55,x:12.5097,y:12.0228}).wait(1).to({graphics:mask_graphics_56,x:12.4958,y:11.8735}).wait(1).to({graphics:mask_graphics_57,x:12.482,y:11.7243}).wait(1).to({graphics:mask_graphics_58,x:12.4681,y:11.575}).wait(1).to({graphics:mask_graphics_59,x:12.4542,y:11.4257}).wait(1));

	// 牙齿
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAageIAygJIgiBPgAhLgeIAygJIgiBPg");
	this.shape.setTransform(13.625,13.825);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(60));

	// 图层_2
	this.instance_1 = new lib.元件11("synched",0);
	this.instance_1.setTransform(13.3,19.55,1,0.2048,0,0,0,11.7,4.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regY:10.5,scaleY:0.2545,y:20.65},0).wait(1).to({scaleY:0.3042,x:13.35},0).wait(1).to({scaleY:0.3539,x:13.4,y:20.6},0).wait(1).to({scaleY:0.4036,x:13.45},0).wait(1).to({scaleY:0.4533,x:13.5,y:20.55},0).wait(1).to({scaleY:0.503,x:13.55,y:20.6},0).wait(1).to({scaleY:0.5527,x:13.6,y:20.55},0).wait(1).to({scaleY:0.6024,x:13.65,y:20.5},0).wait(1).to({scaleY:0.6521,x:13.7},0).wait(1).to({scaleY:0.7018,x:13.75,y:20.45},0).wait(1).to({scaleY:0.7515,x:13.8,y:20.5},0).wait(1).to({scaleY:0.8012,x:13.85,y:20.45},0).wait(1).to({scaleY:0.8509,x:13.9},0).wait(1).to({scaleY:0.9006,x:13.95,y:20.4},0).wait(1).to({scaleY:0.9503,x:14},0).wait(1).to({scaleY:1,x:14.05},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({scaleY:0.9705,x:14},0).wait(1).to({scaleY:0.9411,x:13.95},0).wait(1).to({scaleY:0.9116},0).wait(1).to({scaleY:0.8822,x:13.9},0).wait(1).to({scaleY:0.8527,y:20.45},0).wait(1).to({scaleY:0.8233,x:13.85},0).wait(1).to({scaleY:0.7938},0).wait(1).to({scaleY:0.7644,x:13.8,y:20.5},0).wait(1).to({scaleY:0.7349,y:20.45},0).wait(1).to({scaleY:0.7055,x:13.75,y:20.5},0).wait(1).to({scaleY:0.676,x:13.7},0).wait(1).to({scaleY:0.6466},0).wait(1).to({scaleY:0.6171,x:13.65,y:20.55},0).wait(1).to({scaleY:0.5877,y:20.5},0).wait(1).to({scaleY:0.5582,x:13.6,y:20.55},0).wait(1).to({scaleY:0.5287},0).wait(1).to({scaleY:0.4993,x:13.55},0).wait(1).to({scaleY:0.4698,y:20.6},0).wait(1).to({scaleY:0.4404,x:13.5,y:20.55},0).wait(1).to({scaleY:0.4109,x:13.45,y:20.6},0).wait(1).to({scaleY:0.3815},0).wait(1).to({scaleY:0.352,x:13.4},0).wait(1).to({scaleY:0.3226,y:20.65},0).wait(1).to({scaleY:0.2931,x:13.35},0).wait(1).to({scaleY:0.2637},0).wait(1).to({scaleY:0.2342,x:13.3},0).wait(1).to({scaleY:0.2048},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-6.8,28,37.699999999999996);


(lib.元件24 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.元件25();
	this.instance.setTransform(20.7,17.1,1,1,0,0,0,20.7,17.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({scaleX:0.6807,scaleY:0.9998},0).wait(1).to({scaleX:0.3615,scaleY:0.9997},0).wait(1).to({scaleX:0.5386,scaleY:1.3083},0).wait(1).to({scaleX:0.7157,scaleY:1.617,x:20.65},0).wait(1).to({scaleX:0.5386,scaleY:0.9284,x:20.7,y:17.05},0).wait(1).to({scaleX:0.3615,scaleY:0.2398,y:17.1},0).wait(1).to({scaleY:0.6197},0).wait(1).to({scaleY:0.9997},0).wait(1).to({scaleY:0.6197},0).wait(1).to({scaleY:0.2398},0).wait(1).to({scaleX:1,scaleY:1},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-10.5,41.5,55.4);


(lib.元件20 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#E05D5B").ss(5,1,1).p("AlHgaQFfBrEwhr");
	this.shape.setTransform(32.8,3.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).to({_off:true},1).wait(47).to({_off:false},0).to({_off:true},1).wait(2));

	// 图层_1
	this.instance = new lib.元件23();
	this.instance.setTransform(32.85,0,1.0716,0.2077,0,0,0,30.6,0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({regX:32.8,regY:20,scaleY:0.4017,x:35.15,y:8.05},0).wait(1).to({scaleY:0.5957,y:11.9},0).wait(1).to({scaleY:0.7897,y:15.8},0).wait(1).to({scaleY:0.9837,y:19.65},0).wait(1).to({scaleY:1.1777,y:23.55},0).wait(36).to({scaleY:0.9837,y:19.65},0).wait(1).to({scaleY:0.7897,y:15.8},0).wait(1).to({scaleY:0.5957,y:11.9},0).wait(1).to({scaleY:0.4017,y:8.05},0).wait(1).to({scaleY:0.2077,y:4.15},0).wait(1).to({_off:true},1).wait(3));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.5,-2,72.9,49.1);


(lib.元件19 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.元件22();
	this.instance.setTransform(135.9,96.2,1,1,0,0,0,23.9,33.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:24,scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.4655,scaleY:1.5495,x:148.65,y:103.05},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1,scaleY:1,x:136,y:96.2},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.4655,scaleY:1.5495,x:148.65,y:103.05},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1,scaleY:1,x:136,y:96.2},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.4655,scaleY:1.5495,x:148.65,y:103.05},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1,scaleY:1,x:136,y:96.2},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.4655,scaleY:1.5495,x:148.65,y:103.05},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1,scaleY:1,x:136,y:96.2},0).wait(1));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgtALQgGAAAAgFQAAgEAFgBIABAAIAWgBQARAAAGgBQAFgBAAADIAAABQAAAFgFABQgHACgQABIgQAAIgGAAgAAUAAQAAgDAEgBIABgBQALgCAKgDQAFgBABAEIAAAAQAAAFgFACQgKACgLACIgCAAQgEAAAAgEg");
	this.shape.setTransform(76.8912,28.6341,3.7715,3.7715);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F3A94D").s().p("AgGBCIgwgbQgEgDgBgEQgBgFADgEIAxhSQAIgKAHAFIAwAbQAEACABAFQAAAEgCAFIgyBSQgCAEgFABIgDABIgEgBg");
	this.shape_1.setTransform(23.6208,25.2473,3.7715,3.7715);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F7C764").s().p("Ag9AaQgmhMgrhBQBxACAzgDQA/gFA6gPIihERQgGglglhKg");
	this.shape_2.setTransform(63.9195,63.4381,3.7715,3.7715);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#F7D878").s().p("AhmCuQgHgEgCgIQgCgJAFgHIC4k1QAEgJAIgCQAJgDAHAEQAGAEACAIQABAIgEAIIi3E2QgFAIgIACIgHABQgEAAgEgCg");
	this.shape_3.setTransform(93.5257,67.021,3.7715,3.7715);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#F3A94D").s().p("AgWAnQgQgKgFgSQgFgRAJgQQAKgQASgEQARgFAQAJQARAKAFASQAFARgKAQQgJAQgSAFQgGABgGAAQgLAAgLgGg");
	this.shape_4.setTransform(90.4026,62.2958,3.7715,3.7715);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F0884B").s().p("AgWAlQgNgIgDgQQgEgQAJgPQAKgQAQgFQAPgFAOAHQAOAIADARQADAPgJAQQgJAPgQAGQgHACgFAAQgJAAgJgFg");
	this.shape_5.setTransform(15.1297,20.7098,3.7715,3.7715);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(49));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,183.8,155.4);


(lib.元件17 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 嘴巴
	this.instance = new lib.元件20("synched",0);
	this.instance.setTransform(178.4,270.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(49));

	// 图层_41
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FADFCB").s().p("AgYAhQgDgDgDgEIgDgJQgBgEABgHQABgIAHgLQAGgJAJgHQAKgGAHAAIACAAQAGABAGADQAGADADAGQADACABAEIABACQgMAAgJAGQgIAIgGAHQgFALABALQgCAFgHACIgDAAQgEAAgEgDg");
	this.shape.setTransform(321.1432,300.3321,3.7715,3.7715);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FADFCB").s().p("AgYAlQgGgEgCgEIgCgGQgCgFABgEIAAgEQACgKAEgJIAJgNQAEgGAIgFIAIgEIACAAIAFgCIACAAQAKACAGAEIABABQAFAEAGAJQgIAAgKAHQgKAHgGAHQgGALgBAKQgBAHABADQgDAEgEACIgCAAIgCABQgFAAgEgDg");
	this.shape_1.setTransform(310.1823,294.0519,3.7715,3.7715);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FADFCB").s().p("AgQAdQgQgIALgVQAGgOAOgJQAPgLALAIQAIAHgYAgQgIARgKAAQgEAAgDgBg");
	this.shape_2.setTransform(300.2018,288.3249,3.7715,3.7715);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FADFCB").ss(0.9,1,1).p("AAlhmQgMgFgFAAQgvADgcATQgcAXgcAoQgZAmAIAqIAFANIACACQAPAYAVAIQAXAJAWgNQARgLAGgRQALgTAAgPQABgCAAgCQAAgBABgBIgBAAQADgMAGgDQAMgGAFAPQAGAMAoAEQAlADAbgDQAAghgKgbQgBgHgKgOIgLgWIgPgRQgTgTgcgGg");
	this.shape_3.setTransform(332.5621,305.6462);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FADFCB").s().p("AA6DCQgUgHgPgZIgCgCIgGgNQgHgpAYgoQAcgoAdgWQAcgSAvgEQAGAAALAGQAcAFATASIAPARIAMAXQAJANACAIQAJAcAAAgQgaAEgmgEQgngEgGgLQgGgPgLAGQgIADgCAMIABAAIgCACIAAADQAAAPgMATQgFARgRALQgNAIgOAAQgJAAgKgEgAg/CiQgPgJgGgRQgJgPgEgTIBwAtQgJAVgYAGIgLABQgRAAgRgNgAisBzQgXgNgIgRQgHgPAAgGQgIgTACgTIB3BMQgJANgRAIIgKABIgGAAQgQAAgRgJgACmB1IgaAGQADgXAXARgAhjA8QAJgrAZghQAVggAlgaQAlgZAgAAIifDJQgGgRAEgZgAj/ARIgGgIQgLgVgCgLIADgoQAIgcAIgKQALgWAVgVQAYgZAcgNQAfgRAYACQAVAEAPALIAJALIgLACIgcAPQgdARgSAZQgXAcgJAZQgTAggGAoIgCANQgGACgGAAQgPAAgMgLgAA+hjIAEAAQAVACAaAPQAXALALAVQAKAKAFAPIACAHgAhHirIATgDIAKAAQAiADAZARIACACQAYATATAigAhHirg");
	this.shape_4.setTransform(318.125,296.6857);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(49));

	// 喇叭
	this.instance_1 = new lib.元件19("synched",0);
	this.instance_1.setTransform(370.6,356.8,1,1,0,0,0,80,66.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(49));

	// 身体
	this.instance_2 = new lib.元件21("synched",0);
	this.instance_2.setTransform(181.9,279.1,1,1,0,0,0,181.9,279.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(49));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,474.4,558.1);


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
	this.instance = new lib.元件8();
	this.instance.setTransform(0,28.4,1,1,0,0,0,0,28.4);
	this.instance.alpha = 0.6016;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({y:60.9,alpha:0.6},0).wait(1).to({y:93.4},0).wait(1).to({y:125.9},0).wait(1).to({y:158.4},0).wait(1).to({y:190.9},0).wait(1).to({y:223.4},0).wait(1).to({y:255.9},0).wait(1).to({y:288.4},0).wait(1).to({y:320.9},0).wait(1).to({y:353.4},0).wait(1).to({y:385.9},0).wait(1).to({y:418.45},0).wait(1).to({y:450.95},0).wait(1).to({y:483.45},0).wait(1).to({y:515.95},0).wait(1).to({y:548.45},0).wait(1).to({y:580.95},0).wait(1).to({y:613.45},0).wait(1).to({y:645.95},0).wait(1).to({y:678.45},0).wait(1).to({y:710.95},0).wait(1).to({y:743.45},0).wait(1).to({y:775.95},0).wait(1).to({y:808.5},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,2,838.9);


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


(lib.小雨_2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.元件7();
	this.instance.setTransform(66.2,180.65,1,1,-14.9983,0,0,0,28.4);

	this.instance_1 = new lib.元件7();
	this.instance_1.setTransform(564.6,98.2,1,1,-14.9983,0,0,0,28.4);

	this.instance_2 = new lib.元件7();
	this.instance_2.setTransform(350.7,-9.7,1,1,-14.9983,0,0,0,28.4);

	this.instance_3 = new lib.元件7();
	this.instance_3.setTransform(172.15,21.55,1,1,-14.9983,0,0,0,28.4);

	this.instance_4 = new lib.元件7();
	this.instance_4.setTransform(-161.4,-194.25,1,1,-14.9983,0,0,0,28.4);

	this.instance_5 = new lib.元件7();
	this.instance_5.setTransform(144.7,-784.75,1,1,-14.9983,0,0,0,28.4);

	this.instance_6 = new lib.元件7();
	this.instance_6.setTransform(-298.75,-433.5,1,1,-14.9983,0,0,0,28.4);

	this.instance_7 = new lib.元件7();
	this.instance_7.setTransform(199.65,-515.95,1,1,-14.9983,0,0,0,28.4);

	this.instance_8 = new lib.元件7();
	this.instance_8.setTransform(-14.25,-623.85,1,1,-14.9983,0,0,0,28.4);

	this.instance_9 = new lib.元件7();
	this.instance_9.setTransform(-526.35,-808.4,1,1,-14.9983,0,0,0,28.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.小雨_2, new cjs.Rectangle(-534.9,-837,1108.1,1046.3), null);


// stage content:
(lib.二 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:4,m2:82,lnav2:134,m3:135,m4:261,lnav3:378,m5:380,m6:445,lnav4:480,m7:482,m8:525,lnav5:595,m9:598,m10:649};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,5,79,82,83,131,134,135,136,259,261,262,377,378,380,381,444,445,446,479,480,482,483,523,525,526,594,595,598,599,647,649,650,708];
	this.streamSoundSymbolsList[5] = [{id:"yx12010101大风",startFrame:5,endFrame:79,loop:1,offset:0}];
	this.streamSoundSymbolsList[83] = [{id:"yx12010102微风",startFrame:83,endFrame:131,loop:1,offset:0}];
	this.streamSoundSymbolsList[136] = [{id:"大雨",startFrame:136,endFrame:259,loop:1,offset:0}];
	this.streamSoundSymbolsList[262] = [{id:"小雨_1",startFrame:262,endFrame:378,loop:1,offset:0}];
	this.streamSoundSymbolsList[381] = [{id:"狮子_1",startFrame:381,endFrame:444,loop:1,offset:0}];
	this.streamSoundSymbolsList[446] = [{id:"小猫_1",startFrame:446,endFrame:479,loop:1,offset:0}];
	this.streamSoundSymbolsList[483] = [{id:"老虎",startFrame:483,endFrame:523,loop:1,offset:0}];
	this.streamSoundSymbolsList[526] = [{id:"小鸟",startFrame:526,endFrame:593,loop:1,offset:0}];
	this.streamSoundSymbolsList[599] = [{id:"yx12010109大声喊",startFrame:599,endFrame:647,loop:1,offset:0}];
	this.streamSoundSymbolsList[650] = [{id:"悄悄话1",startFrame:650,endFrame:709,loop:1,offset:0}];
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
		
		
		_this.lnav4_btn.on('click', function(){
		
		_this.gotoAndStop('lnav4');
			
		});
		
		
		_this.lnav5_btn.on('click', function(){
		
		_this.gotoAndStop('lnav5');
			
		});
		
		
		
		_this.lnav6_btn.on('click', function(){
		
		_this.gotoAndStop('lnav6');
			
		});
	}
	this.frame_4 = function() {
		var _this = this;
		
		_this.m1stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav1');
		});
	}
	this.frame_5 = function() {
		var soundInstance = playSound("yx12010101大风",0);
		this.InsertIntoSoundStreamData(soundInstance,5,79,1);
	}
	this.frame_79 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_82 = function() {
		var _this = this;
		
		_this.m2stop_btn.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_83 = function() {
		var soundInstance = playSound("yx12010102微风",0);
		this.InsertIntoSoundStreamData(soundInstance,83,131,1);
	}
	this.frame_131 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_134 = function() {
		this.stop();
		
		var _this = this;
		
		_this.m3_btn.on('click', function(){
		
		_this.gotoAndPlay('m3');
		});
		
		
		
		_this.m4_btn.on('click', function(){
		
		_this.gotoAndPlay('m4');
			
		});
	}
	this.frame_135 = function() {
		var _this = this;
		
		_this.m3stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav2');
		});
	}
	this.frame_136 = function() {
		var soundInstance = playSound("大雨",0);
		this.InsertIntoSoundStreamData(soundInstance,136,259,1);
	}
	this.frame_259 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav2');
	}
	this.frame_261 = function() {
		var _this = this;
		
		_this.m4stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav2');
		});
	}
	this.frame_262 = function() {
		var soundInstance = playSound("小雨_1",0);
		this.InsertIntoSoundStreamData(soundInstance,262,378,1);
	}
	this.frame_377 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav2');
	}
	this.frame_378 = function() {
		var _this = this;
		
		_this.m5_btn.on('click', function(){
		
		_this.gotoAndPlay('m5');
		});
		
		
		
		_this.m6_btn.on('click', function(){
		
		_this.gotoAndPlay('m6');
			
		});
	}
	this.frame_380 = function() {
		var _this = this;
		
		_this.m5stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav3');
		});
	}
	this.frame_381 = function() {
		var soundInstance = playSound("狮子_1",0);
		this.InsertIntoSoundStreamData(soundInstance,381,444,1);
	}
	this.frame_444 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav3');
	}
	this.frame_445 = function() {
		var _this = this;
		
		_this.m6stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav3');
		});
	}
	this.frame_446 = function() {
		var soundInstance = playSound("小猫_1",0);
		this.InsertIntoSoundStreamData(soundInstance,446,479,1);
	}
	this.frame_479 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav3');
	}
	this.frame_480 = function() {
		var _this = this;
		
		_this.m7_btn.on('click', function(){
		
		_this.gotoAndPlay('m7');
		});
		
		
		
		_this.m8_btn.on('click', function(){
		
		_this.gotoAndPlay('m8');
			
		});
	}
	this.frame_482 = function() {
		var _this = this;
		
		_this.m7stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav4');
		});
	}
	this.frame_483 = function() {
		var soundInstance = playSound("老虎",0);
		this.InsertIntoSoundStreamData(soundInstance,483,523,1);
	}
	this.frame_523 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav4');
	}
	this.frame_525 = function() {
		var _this = this;
		
		_this.m8stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav4');
		});
	}
	this.frame_526 = function() {
		var soundInstance = playSound("小鸟",0);
		this.InsertIntoSoundStreamData(soundInstance,526,593,1);
	}
	this.frame_594 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav4');
	}
	this.frame_595 = function() {
		var _this = this;
		
		_this.m9_btn.on('click', function(){
		
		_this.gotoAndPlay('m9');
		});
		
		
		
		_this.m10_btn.on('click', function(){
		
		_this.gotoAndPlay('m10');
			
		});
	}
	this.frame_598 = function() {
		var _this = this;
		
		_this.m9stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav5');
		});
	}
	this.frame_599 = function() {
		var soundInstance = playSound("yx12010109大声喊",0);
		this.InsertIntoSoundStreamData(soundInstance,599,647,1);
	}
	this.frame_647 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav5');
	}
	this.frame_649 = function() {
		var _this = this;
		
		_this.m10stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav5');
		});
	}
	this.frame_650 = function() {
		var soundInstance = playSound("悄悄话1",0);
		this.InsertIntoSoundStreamData(soundInstance,650,709,1);
	}
	this.frame_708 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav5');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(74).call(this.frame_79).wait(3).call(this.frame_82).wait(1).call(this.frame_83).wait(48).call(this.frame_131).wait(3).call(this.frame_134).wait(1).call(this.frame_135).wait(1).call(this.frame_136).wait(123).call(this.frame_259).wait(2).call(this.frame_261).wait(1).call(this.frame_262).wait(115).call(this.frame_377).wait(1).call(this.frame_378).wait(2).call(this.frame_380).wait(1).call(this.frame_381).wait(63).call(this.frame_444).wait(1).call(this.frame_445).wait(1).call(this.frame_446).wait(33).call(this.frame_479).wait(1).call(this.frame_480).wait(2).call(this.frame_482).wait(1).call(this.frame_483).wait(40).call(this.frame_523).wait(2).call(this.frame_525).wait(1).call(this.frame_526).wait(68).call(this.frame_594).wait(1).call(this.frame_595).wait(3).call(this.frame_598).wait(1).call(this.frame_599).wait(48).call(this.frame_647).wait(2).call(this.frame_649).wait(1).call(this.frame_650).wait(58).call(this.frame_708).wait(1));

	// 音频停止
	this.m1stop_btn = new lib.音频停止();
	this.m1stop_btn.name = "m1stop_btn";
	this.m1stop_btn.setTransform(409.9,284.8,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m1stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m2stop_btn = new lib.音频停止();
	this.m2stop_btn.name = "m2stop_btn";
	this.m2stop_btn.setTransform(1324.35,285.1,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m2stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m3stop_btn = new lib.音频停止();
	this.m3stop_btn.name = "m3stop_btn";
	this.m3stop_btn.setTransform(410.7,283.55,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m3stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m4stop_btn = new lib.音频停止();
	this.m4stop_btn.name = "m4stop_btn";
	this.m4stop_btn.setTransform(1325.05,283.55,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m4stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m5stop_btn = new lib.音频停止();
	this.m5stop_btn.name = "m5stop_btn";
	this.m5stop_btn.setTransform(410.7,283.55,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m5stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m6stop_btn = new lib.音频停止();
	this.m6stop_btn.name = "m6stop_btn";
	this.m6stop_btn.setTransform(1324.35,283.3,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m6stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m7stop_btn = new lib.音频停止();
	this.m7stop_btn.name = "m7stop_btn";
	this.m7stop_btn.setTransform(410.7,283.55,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m7stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m8stop_btn = new lib.音频停止();
	this.m8stop_btn.name = "m8stop_btn";
	this.m8stop_btn.setTransform(1325.05,283.55,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m8stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m9stop_btn = new lib.音频停止();
	this.m9stop_btn.name = "m9stop_btn";
	this.m9stop_btn.setTransform(484.95,283.55,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m9stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m10stop_btn = new lib.音频停止();
	this.m10stop_btn.name = "m10stop_btn";
	this.m10stop_btn.setTransform(1398.6,282.85,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m10stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1stop_btn}]},4).to({state:[]},75).to({state:[{t:this.m2stop_btn}]},3).to({state:[]},52).to({state:[{t:this.m3stop_btn}]},2).to({state:[{t:this.m4stop_btn}]},126).to({state:[]},116).to({state:[{t:this.m5stop_btn}]},3).to({state:[{t:this.m6stop_btn}]},65).to({state:[]},33).to({state:[{t:this.m7stop_btn}]},4).to({state:[]},40).to({state:[{t:this.m8stop_btn}]},3).to({state:[]},67).to({state:[{t:this.m9stop_btn}]},6).to({state:[{t:this.m10stop_btn}]},51).wait(59));

	// 播放按钮
	this.m1_btn = new lib.音频播放标();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(362.6,237.7);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m2_btn = new lib.音频播放标();
	this.m2_btn.name = "m2_btn";
	this.m2_btn.setTransform(1276.95,237.7);
	new cjs.ButtonHelper(this.m2_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m3_btn = new lib.音频播放标();
	this.m3_btn.name = "m3_btn";
	this.m3_btn.setTransform(362.6,237.7);
	new cjs.ButtonHelper(this.m3_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m4_btn = new lib.音频播放标();
	this.m4_btn.name = "m4_btn";
	this.m4_btn.setTransform(1276.95,237.7);
	new cjs.ButtonHelper(this.m4_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m5_btn = new lib.音频播放标();
	this.m5_btn.name = "m5_btn";
	this.m5_btn.setTransform(362.6,237.7);
	new cjs.ButtonHelper(this.m5_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m6_btn = new lib.音频播放标();
	this.m6_btn.name = "m6_btn";
	this.m6_btn.setTransform(1276.95,237.7);
	new cjs.ButtonHelper(this.m6_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m7_btn = new lib.音频播放标();
	this.m7_btn.name = "m7_btn";
	this.m7_btn.setTransform(362.6,237.7);
	new cjs.ButtonHelper(this.m7_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m8_btn = new lib.音频播放标();
	this.m8_btn.name = "m8_btn";
	this.m8_btn.setTransform(1276.95,237.7);
	new cjs.ButtonHelper(this.m8_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m9_btn = new lib.音频播放标();
	this.m9_btn.name = "m9_btn";
	this.m9_btn.setTransform(435.1,237.7);
	new cjs.ButtonHelper(this.m9_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m10_btn = new lib.音频播放标();
	this.m10_btn.name = "m10_btn";
	this.m10_btn.setTransform(1349.45,237.7);
	new cjs.ButtonHelper(this.m10_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m2_btn},{t:this.m1_btn}]}).to({state:[{t:this.m4_btn},{t:this.m3_btn}]},134).to({state:[{t:this.m6_btn},{t:this.m5_btn}]},244).to({state:[{t:this.m8_btn},{t:this.m7_btn}]},102).to({state:[{t:this.m10_btn},{t:this.m9_btn}]},115).wait(114));

	// 边框和标题
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AkWEJQAjgoARgvQARgwAFg0QAFg1AAg3IAAjqIAuAVIEWAAIAZgbIAxArQgDADgGADQgHADgKACQgCAtAAAyQAAAyACAyQADAxAHAsQAIAsANAgQAMAhATAPQAGAEACgBQADgBACgGIAKghIAJgiIAHAAIgIBgQAKAPACAKQACAKgFAFQgLAKgQgGQgPgGgRgPQgfgZgSgxQgRgxgIhAQgIhAgChIQgChJABhKIkjAAIAADDQAAAogDApQgDAqgLAnQgLAogWAjQgWAjglAegAioC9QAngkAlgxQAlgyAgg6QgZgmgbgjQgbgigYgcIAKgFQAiAcAbAbQAcAbAWAYQAOghAOgiQAOgjALgkIA6AUQgCAFgGADQgGADgKgBQgOAlgQAiQgPAigTAgQAlAuARAjQASAjACAWQACAWgJAHQgJAGgPgLQgJgcgRggQgQghgWgiQghA0goArQgoArgsAhg");
	this.shape.setTransform(1166.8536,282.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("ADCDgQgVgdgOgjQgZAigjAcQgkAcgvAYIgHgIQAwgeAigjQAigjAVgnQgMgmgIgqQgHgrgFgtQgJAUgIARQgKASgKAPIgKgFQAQgnAOgwQANgyALg2QAJg1AGg2IA6AKQgCAGgFAEQgFAEgKAAIgLA2IgMA1IA5AAIAaghIAJAHIASAPIAUASQgBAFgEACQgEADgGAAIgbAAQgEBOgNA+QgNBAgdAzQASAjAZAcQAYAdAgAUIgBAFQgNACgJAHQgIAHgFANQgbgXgUgcgACGhgIgKAdQAFAtAKAoQAKAoAOAkQATgvAIg2QAJg2AChBIg6AAIgJAegAjIESIAAklQgQAUgSATQgSAVgTAQIgIgHQAXgdAWgjQAVgkARgkQASgkALgdIA0AZIAAhjIA6AIQgBAFgGAEQgFADgNACIAABkIAvAAIAAirIAzAGQAAAGgGAEQgEADgIACIAACWIAtAAIAAh1IA2AGQgBAGgFADQgFAEgKACIAAB5QAAAEgJAEQgIADgJABIgHAAIAAgUIh6AAIgMAPIglgWIAFgFIAIgGIAAgOQgCACgGAAQgEAAgHgBIgUAhIgZAkIAiANQgBAEgGACQgEADgIABIAAEdQgBADgIAGQgJAFgLAAgAiXD9QAXgZALgcQAMgbADgcQADgdAAgbIAAhLIApATIA+AAIARgTIAmAfQgDADgEACQgGAEgIACIAABmIAbgRIAdgSIAFAHIghAiIgtAuQgDAHgDADQgFAEgDABIgUgpQAKgHADgDQAEgEAAgHIAAhxIhEAAIAAAnQAAAagFAfQgFAfgRAeQgRAfgkAYgAiAgSIgFgSICZAAIAVgbIAGAFIAPAPIARAPQgCAFgDACQgEADgGAAgAkRh0QAWgXATgcQAVgcAQgbQARgcAKgXIA2AdQgCAEgFACQgFABgKgCQgPAUgUAXQgVAWgYAXQgYAWgZATg");
	this.shape_1.setTransform(1106.7,282.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#51C1E1").s().p("AigCSQg0AAglglQglglAAg0IAAgnQAAg0AlglQAlglA0AAIFAAAQA1AAAlAlQAlAlAAA0IAAAnQAAA0glAlQglAlg1AAg");
	this.shape_2.setTransform(1136.7559,279.2643,3.7446,3.7446);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AkWEJQAjgoARgvQARgwAFg0QAFg1AAg3IAAjqIAuAVIEWAAIAZgbIAxArQgDADgGADQgHADgKACQgCAtAAAyQAAAyACAyQADAxAHAsQAIAsANAgQAMAhATAPQAGAEACgBQADgBACgGIAKghIAJgiIAHAAIgIBgQAKAPACAKQACAKgFAFQgLAKgQgGQgPgGgRgPQgfgZgSgxQgRgxgIhAQgIhAgChIQgChJABhKIkjAAIAADDQAAAogDApQgDAqgLAnQgLAogWAjQgWAjglAegAioC9QAngkAlgxQAlgyAgg6QgZgmgbgjQgbgigYgcIAKgFQAiAcAbAbQAcAbAWAYQAOghAOgiQAOgjALgkIA6AUQgCAFgGADQgGADgKgBQgOAlgQAiQgPAigTAgQAlAuARAjQASAjACAWQACAWgJAHQgJAGgPgLQgJgcgRggQgQghgWgiQghA0goArQgoArgsAhg");
	this.shape_3.setTransform(251.6036,282.925);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ACFDFQgqgqgagwQgagugOgwQgOgvgGguQgFA1gQAwQgPAxgfAtQgfAtgzAoQgzAnhNAjIgGgLQBBgjAsgoQAsgnAcgrQAbgsAOguQAOguAGgyIjnAAIgFgSIDuAAQADgpABgsQABgsgBguIBAAHQgBAGgFAFQgEAFgLABIgCBNQgBAmgDAkICsAAIAhgoIAKAIIAYATIAZAVQgBAGgEABQgEADgHAAIjvAAQAKA5AdA4QAcA5A2A0QA2AzBYApIgBAHQgQACgKAHQgLAHgEARQg+gigqgrg");
	this.shape_4.setTransform(191.975,282.4);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F29539").s().p("ApaIkQjDgBiKiKQiLiLAAjEIAAiVQAAjCCLiLQCKiKDDgBISzAAQDDABCMCKQCLCLAADCIAACVQAADEiLCLQiMCKjDABg");
	this.shape_5.setTransform(221.575,279.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#F29539").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape_6.setTransform(503.925,507.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#51C1E1").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape_7.setTransform(1418.525,507.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AClD6QgDgHgGgFQgIgEgLgEQgNgEgUgDIAAgJIAKAAIAXACIAYACIARAAQAJAAACgCQAEgEAAgHIAAk4IivAAIAAFhQAAADgKAFQgIAEgOABIgHAAIAAluIitAAIAAFmQAAAEgJAFQgKAGgNAAIgGAAIAAmbIAqAUICpAAIAAhVIj3AAIgFgSIHOAAIAeglIAKAIIAWARIAXAUQgBAFgEACQgEADgHAAIjwAAIAABVICoAAIAVgZIAzAnQgEADgGADQgIAEgJABIAAE1QABARgEALQgFAMgNAHQgOAHgbADIgEgQgAB5CaQgGgPgMgRQgNgRgQgQQgQgPgQgLIAHgFQAzAPAYAUQAYAUADARQAEASgJAIQgFADgFAAQgHAAgIgFgAhbCaQgFgPgNgRQgMgQgPgPQgPgPgPgLIAGgFQAyAOAYATQAXAUAEARQAEASgLAIQgEADgFAAQgHAAgJgFgAB9AYQgGgPgOgOQgOgPgQgOQgRgOgQgKIAHgFQAzALAYASQAYASAFAQQAGAPgKAIQgEAEgGAAQgGAAgIgDgAhWAWQgHgOgLgOQgNgPgPgNQgPgOgPgKIAGgFQAwAMAYARQAXASAEAQQADAPgJAIQgEAEgFAAQgHAAgHgFg");
	this.shape_8.setTransform(1166.75,283.075);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgwD9QgEgIgHgEQgIgGgQgFQgPgEgagEIAAgKIANABIAeACIAgACIAVABQAKAAAEgDQAEgDAAgJIAAnZIA+AHQgBAHgFADQgFAFgLACIAAHGQABARgFANQgFANgQAIQgPAJghADQgBgKgEgIgAkOCmQAWggATgnQAUglAPgoQAPgnAMgmQALgnAHggIBBAUQgBAGgFACQgFADgMgBQgOAqgVAwQgWAvgeAwQgeAwgnAmgADmCLQgFgqgTguQgTgvgbgqQgbgtgagiIAJgEQA8AvAiAtQAjAsAOAlQAOAmgCAYQgBAYgMAIQgEADgFAAQgIAAgLgKg");
	this.shape_9.setTransform(1106.4823,282.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AClD6QgDgHgHgFQgGgEgNgEQgMgEgUgDIAAgJIAKAAIAWACIAaACIARAAQAHAAADgCQADgEAAgHIAAk4IiuAAIAAFhQAAADgJAFQgJAEgPABIgFAAIAAluIiuAAIAAFmQAAAEgKAFQgIAGgNAAIgHAAIAAmbIArAUICpAAIAAhVIj4AAIgFgSIHOAAIAeglIAKAIIAWARIAXAUQAAAFgFACQgEADgGAAIjxAAIAABVICpAAIAUgZIAzAnQgEADgHADQgHAEgJABIAAE1QABARgFALQgDAMgOAHQgOAHgbADIgEgQgAB4CaQgFgPgNgRQgMgRgQgQQgQgPgPgLIAGgFQAzAPAYAUQAYAUAEARQADASgKAIQgEADgFAAQgHAAgJgFgAhbCaQgFgPgMgRQgNgQgPgPQgQgPgPgLIAHgFQAyAOAXATQAYAUADARQAFASgKAIQgFADgFAAQgHAAgJgFgAB+AYQgIgPgNgOQgOgPgRgOQgQgOgPgKIAFgFQAzALAZASQAZASAFAQQAEAPgIAIQgFAEgGAAQgGAAgHgDgAhXAWQgFgOgNgOQgMgPgPgNQgPgOgPgKIAGgFQAxAMAWARQAYASADAQQAFAPgJAIQgFAEgFAAQgHAAgIgFg");
	this.shape_10.setTransform(251.5,283.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#F29539").ss(1,0,0,4).p("Eg8hAbkQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAMhqTAAAQjDAAiKCKQiLCLAADFg");
	this.shape_11.setTransform(503.925,507.05);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AjTEAQgDgHgGgDQgGgFgLgEQgLgEgQgDIAAgKIANABIAcACIAdABQAHAAAEgCQAEgCAEgFQAJgMAFgaQAFgaADghQACgiAAghIAAgeIgCgcQgVAfgfAhQggAggmAaIgHgIQAagYAXgfQAWgfASghQATghALghIgIgeQgFgPgGgOQgVATgYARQgXASgZAPIgHgJQAXgSAWgXQAVgWAUgYQgMgWgRgVQgSgWgWgUIAJgHQAYAQATARQATASAPATQARgXANgVQANgWAKgUIA3AdQgDAEgFACQgEACgLgCQgMASgRAUQgRAVgVAUQAbAuALA1QALA0AAA5QAAAngCAnQgDAmgIAgQgIAggOAVQgJAMgPAFQgPAFgXAAQABgKgDgHgAhBEPIAAlXIApAUIDYAAIAWgZIAwAlQgDAEgHADQgHAEgJACIAAEZQAAACgGADQgFADgHADQgIACgGAAIgGAAIAAgmIjgAAIAAAcQgBAEgJAFQgJAFgNAAgABmDUIBgAAIAAh3IhgAAgAgaDUIBbAAIAAh3IhbAAgABmBLIBgAAIAAhuIhgAAgAgaBLIBbAAIAAhuIhbAAgAAAhQIAAhPIhtAAIgFgSIByAAIAAhbIA8AGQgBAGgFAEQgFAFgLACIAABEIBdAAIAAhbIA+AGQgCAGgFAEQgFAFgLACIAABEIArAAIAYghIAIAHIASAQIAUASQgCAFgDADQgEACgGAAIhiAAIAAA/QAAAFgKADQgKAEgLAAIgIAAIAAhLIhdAAIAABCQgBAEgJAEQgJAEgMABg");
	this.shape_12.setTransform(1166.925,282.375);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("Ag7D2QgEgIgIgEQgKgFgQgFQgSgEgagDIAAgJIANABIAhACIAkACIAYAAQAJABAEgDQAEgEABgIIAAjNIj6AAIgFgRID/AAIAAhjIAgADQAhgVAfgbQAggaAWgYIlTAAIgGgRIFiAAIAdgbIAxArQgFADgFACIgRACIgvAgIg4AhQgdAQgeANIALACQgBAGgEAEQgGADgJACIAABNIChAAIAggoIAKAIIAWASIAaAWQgBAFgFACQgEACgGAAIjrAAIAADQQABAQgFAMQgGANgQAIQgPAIgiADQgCgKgEgGg");
	this.shape_13.setTransform(251.65,283.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("Ah3EIQAjgcAVghQAVghAIgpQAJgqAAg2IAAkvIA3AHQgBAGgEAEQgFAEgLACIAAEYQAAA3gKAsQgLArgbAiQgaAjguAcgAB8EPIAAl/IgyAAIAAEnQgBACgIAFQgIADgLABIgGAAIAAlVIAkARIAwAAIAAhSIhZAAIgFgSICsAAIAcgiIAJAIIATAQIAVASQgBAFgEADQgEACgGAAIhoAAIAABSIAxAAIASgWIAvAjQgDADgHADQgGADgIACIAAD3QAAAPgDALQgEAKgJAGQgKAHgTACIgCgPQgCgHgDgEQgFgFgGgCQgHgDgLgCIAAgKIAIABIAQABIANABQAFAAACgDQACgCAAgGIAAj4Ig3AAIAAFzQAAACgIAFQgIAFgOAAgAjeD5QgCgHgFgDQgGgEgJgEIgWgGIAAgKIALABIAXABIAYABQAGAAAEgBQADgCADgEQAHgMAFgaQAEgaACgiQACghAAghIAAgTIAAgSQgSAdgZAcQgaAcgeAYIgHgHQAWgXATgeQATgdAPgfQAPgfAJgfQgCgRgEgQQgDgQgFgPQgRASgTAQQgSAQgUAOIgHgIQATgSASgWQARgVAQgYQgKgYgPgWQgOgXgUgWIAKgHQAUAQARATQAQASAMAUQAOgYAMgXQAMgXAHgUIA5AaQgCAFgGACQgFABgKgBQgMAUgQAWQgPAXgUAWQAUAsAJAxQAIAyAAA2QAAAngCAmQgCAmgHAgQgGAfgMATQgIALgOAGQgOAFgUAAQAAgKgCgGgAhhCHIAAlIIA2AHQgBAGgFAFQgEAEgLABIAAEkQgBAEgIAEQgIAEgKABg");
	this.shape_14.setTransform(191.625,282.725);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("ACHEHQgDgHgHgEQgFgDgLgEQgKgDgNgCIgagFIAAgKIAiADIAkACIAXACQAJgBAFgBQAFgBAEgEQAHgHAFgYQAFgYAEglQAEgmADgwIlTAAIgQAXIgsgdIAHgHIAJgHIAAj9IAvAVIA5AAIAGglIAFgkIBCAMQgCAHgEAEQgGADgJABIgRAXIgSAXICtAAIAXgXIAtAlQgCADgGACQgGACgJACQgDBEgJAsQgIAsgRAPQgLAIgQADQgRAFgSAAQABgIgDgFQgCgHgHgFQgHgEgRgEIgigIIAAgJIAdACIAhADIAVABQAJAAAFgCQAEgBAEgDQAKgJAFglQAFgmAEg6IkIAAIAADZIFRAAIAXgYIAtAmIgIAFQgGACgJACQgDA2gFArQgEAqgIAcQgJAcgLALQgMALgQAEQgRAEgUAAQAAgIgDgHgAkFCbIgEgSIFOAAIAcgiIAIAHIAUAQIAVATQgBAFgDADQgFACgGAAgAgDhFQgHgNgPgQQgNgOgRgOQgPgOgPgLIAEgFQA1AKAaASQAYARAFARQAFARgJAIQgFAEgHAAQgHAAgHgEg");
	this.shape_15.setTransform(1166.55,282.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AjMEKQA0gYAbgcQAcgbAKgdQAKgcgBgbIAAgyIAuAUIBiAAIAWgXIAqAlQgCADgFADQgFACgIABIAAB3QAAAGADACQAEABANAAIAxAAIAbAAIASAAQAEAAACgCIAEgFQADgIAFgTIAJgrIAIAAIACBIQAJADADAEQACADAAAGQABAJgIAFQgIAGgWACQgVADgoAAIg3AAQgWAAgKgEQgLgDgEgIQgEgIABgOIAAiEIhwAAIAAAMQABATgFAWQgGAXgQAYQgQAXggAWQggAWg1ARgAkSEIQAbgqANgvQAOgvAEgxQAEgxgBgvIAAiTIAuAUICWAAIAAiCIA8AGQAAAGgFAEQgGAFgKACIAAAoIB5AAIAdgkIAKAHIAVARIAWAUQAAAFgEACQgEACgHAAIi8AAIAAAyIC0AAIAXgYIAsApQgCAEgGABIgOABQgMAOgQAPQgRAQgPALIgJgEIAMgbIANgfIl5AAIAABtQABAsgGA0QgFAzgUAyQgUAygqAqgAAZAjQgZAAgNgDQgOgDgEgIQgFgIAAgNIAAgpIhyAMIgHgRIB5gMIAAg9IA3AGQgBAGgEADQgFAEgIABIAAAlIBZgJIAXgiIAJAGIAUANIAWAQQAAAFgEADQgEADgGAAIiVAPIAAAmQgBAGAFABQAFACATAAIBPAAIAsAAIAagBIAJgBQADgBACgCQAEgFAEgNIAJgcIAIAAIABAuQAKACAEAEQAFADgBAFQABAJgKAFQgJAFgdACQgcACg3AAg");
	this.shape_16.setTransform(251.7265,282.425);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AhKEIQgRgEgIgJQgGgKAAgSIAAiRQgnAXgpAUQgqAUgsARIgGgKQAtgVArgYQArgZApgcIAAgoIAxAFIAfgXIAegZIkKAAIgEgQIDPAAIAAhlIiZAAIgEgSICdAAIAAhjIA6AFQAAAHgFADQgEAEgKACIAABOIBNAAIAcgjIAJAGIATAQIAWATQATgVAQgVQARgVAOgVIA2AmQgEAEgFABQgHABgKgEQgdAmgnAoQgnAogtAnIB1AAIAegmIAJAIIAVASIAWATQgBAFgDACQgEACgHAAIjNAAQgdAXgdAWQgfAWgiAVIAABNQAqgQAqgUQArgUAkgVQAlgVAYgTIAyAmQgDAFgHAAQgIAAgMgCQgdAPgoARQgoAQgtAPQgsAPguALIAABHQgBAGADAEQAEADAIACQAKABATAAIBnAAIA+AAIAkgBQAJAAADgCQADgCADgFQAEgIAGgUIALgvIAIAAIABBOQAMADAEAEQAFAEAAAFQAAAIgGAFQgHAGgRADQgRACghACIhXABIhqAAIgGAAQgbAAgPgEgAgTgxIArAAQAdgZAZgaQAagZAWgaIgCABIgBAAIiOAAg");
	this.shape_17.setTransform(191.05,281.6028);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("Ag9ESIAAj+IApATIBQAAIAAhtIilAAIgFgSICqAAIAAhzIhJAIQgmAEgkABIgCgKQAygHA1gMQA1gLAvgOQAvgOAhgNIAtArQgEADgIAAQgIAAgLgEIgzALQgcAFgfAEIAAB5IBmAAIAcgkIAJAIIAUARIAXATQgCAFgEADQgEACgHAAIilAAIAABtIBRAAIAVgYIAwAlQgCADgHAEQgHAEgKACIAAC/QgBADgKAFQgKAEgLABIgFAAIAAgoIjQAAIAAAfQAAAEgJAEQgKAFgMABgAgXDTIDQAAIAAibIjQAAgAjeC+QAOgGAFgFQAEgFgBgIIAAkHIhKAAIgFgRIBQAAIATgVIAoAhQgCADgGADQgGADgIACIAAD6IAmgdIApgfIAGAIIgqAwQgcAeghAhQgCAJgEAFQgEAFgFACgAimigQgGgRgNgUQgMgUgPgSQgPgTgOgPIAHgEQAyAVAYAYQAXAXAEATQADAUgKAIQgFADgGAAQgHAAgIgFg");
	this.shape_18.setTransform(1234.075,282.525);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#FFFFFF").s().p("ACzEEQgDgIgFgEQgHgFgLgEQgLgEgSgCIAAgJIAJAAIATACIAXABIAOABQAIAAADgDQADgDAAgGIAAhcIjJAAIAACIQAAAEgJAFQgIAFgNAAIgHAAIAAl+IAoAUIBOAAIAAi6IA6AGQgBAFgFAEQgFAEgKACIAAClIBNAAIAUgYIAxAlQgDADgGAEQgIADgIACIAAEbQgBAQgDALQgEAMgMAHQgNAHgaADQAAgJgDgHgAACBrIDJAAIAAhQIjJAAgAACAJIDJAAIAAhQIjJAAgAizESIAAolIA9AHQgCAHgFAEQgEAEgMACIAAH+QAAAEgKAFQgIAFgMABgAkIgLQgGgIADgKQACgJAJgJQAIgKAHgRQAHgSAEgWQAEgWAAgVIAKAAQAMAwgEAjQgDAjgMASQgJAMgMADIgGABQgIAAgGgGgAhdhIQgBgQgFgRQgFgSgHgQQgIgQgHgMIAIgEQAiAWANAWQAOAWgCARQgCAQgKAFQgDACgEAAQgHAAgIgHgACehyQALgUALgYIAUguIAPgoIA2AdQgCAFgGACQgEACgKgCIgXAfIgcAjQgOASgPAQgAAEh8QgDgSgIgTQgJgTgMgRQgNgRgNgNIAHgFQAtAVASAXQAUAXABASQACATgLAHQgEADgEAAQgHAAgJgGg");
	this.shape_19.setTransform(1173.3,282.425);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("ACzEEQgCgIgGgEQgGgFgMgEQgLgEgSgCIAAgJIAIAAIAVACIAVABIAQABQAHAAADgDQADgDgBgGIAAhcIjIAAIAACIQgBAEgHAFQgJAFgNAAIgHAAIAAl+IAoAUIBPAAIAAi6IA4AGQgBAFgEAEQgEAEgLACIAAClIBNAAIAUgYIAxAlQgDADgHAEQgGADgKACIAAEbQABAQgEALQgEAMgNAHQgMAHgaADQgBgJgCgHgAACBrIDIAAIAAhQIjIAAgAACAJIDIAAIAAhQIjIAAgAiyESIAAolIA7AHQgBAHgEAEQgFAEgLACIAAH+QgBAEgJAFQgJAFgMABgAkIgLQgGgIADgKQADgJAIgJQAIgKAHgRQAHgSAEgWQAFgWgCgVIALAAQANAwgFAjQgDAjgMASQgIAMgNADIgGABQgIAAgGgGgAhehIQAAgQgFgRQgFgSgIgQQgHgQgHgMIAHgEQAjAWANAWQAOAWgCARQgCAQgKAFQgDACgEAAQgHAAgJgHgACehyQALgUALgYIAVguIAOgoIA2AdQgDAFgEACQgFACgKgCIgXAfIgcAjQgOASgQAQgAADh8QgCgSgIgTQgJgTgNgRQgMgRgNgNIAHgFQAtAVASAXQAUAXABASQABATgJAHQgEADgFAAQgIAAgJgGg");
	this.shape_20.setTransform(1113.4,282.425);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#51C1E1").s().p("Aj3CSQg0AAglglQglglAAg0IAAgnQAAg0AlglQAlglA0AAIHuAAQA1AAAlAlQAlAlAAA0IAAAnQAAA0glAlQglAlg1AAg");
	this.shape_21.setTransform(1174.285,279.2643,3.8769,3.7446);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFFFFF").s().p("AD2EQQgKgBgMgIQgMgHgJgJQgTgQgNgZQgOgZgLggQgeAoglAeQgmAdgsAUIgHgIQArgaAlgmQAlglAcgwQgNg5gHhEQgIhEgDhIIinAAIAACDQAAAkgDAoQgFAogMAnQgMAngZAjQgZAkgpAeIgIgHQAogpAVgvQAVguAHgzQAHgzAAg0IAAiqIAqAVICgAAIgCgyIgBgyIA9AHQgBAGgEAFQgFAEgLACIAAAlIAAAnIAtAAIASgUQgBAAAAAAQgBAAAAgBQgBAAAAAAQgBAAAAgBIgFgCQgDgPgKgPQgKgPgNgKIAGgFQAhAHAPAMQAOAMABAMQABALgIAHIAUAOIAWARQgCAFgEADQgEACgGAAIhpAAQABA4AFA3QAEA3AJAxQAQgiALgmQALgnAHgsIA4AQQgCAGgFAEQgFAEgKgBQgMA0gRArQgRAtgVAkQAIAfAMAZQANAYAQAOQAFAFADAAQADgBADgGIAIgRIAIgXIAGgWIAIACIgLBXQAIAMADALQAEAKgGAFQgFAFgIAAIgFgBgAgjDAIAAjaIAjAQIAwAAIARgTIAoAdQgCADgGADQgFACgHABIAACNQgBAEgJAEQgJAFgJAAIgEAAIAAgcIg3AAIAAAuQgBADgIADQgIAEgLABgAgCB2IA3AAIAAhwIg3AAgAkLCXIAAl5IAmASIAzAAIAUgWIAtAiQgDAEgHACQgHAEgIACIAAEkQgBAEgJAEQgKAFgJAAIgGAAIAAgqIg7AAIAAA8QgBADgHAEQgIAFgMAAgAjoA9IA7AAIAAj7Ig7AAgAglhBIgEgSIBJAAIAZgfIAJAGIASAPIAUASQgBAFgEACQgEADgGAAg");
	this.shape_22.setTransform(320.0681,282.515);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#FFFFFF").s().p("AkMELQAjgiARgmQASgmAGgoQAGgogBgoIAAhsIAvAVIElAAIAWgYIAuAkQgDADgGADQgGADgJACIAACNQAAACgFADQgGADgHACQgIADgHAAIgFAAIAAgnIk2AAQgDAggKAhQgLAigXAfQgXAfgoAagAAZBGICGAAIAAhnIiGAAgAiUAlIAAAQIgBARICJAAIAAhnIiIAAgAjXhpIgFgSIDOAAIAAhGIjuAAIgFgRIDzAAIAAhAIA9AGQgBAHgFAEQgFAEgLACIAAApICfAAIAegjIAJAHIAWARIAYATQgBAFgEACQgEACgGAAIjlAAIAABGICLAAIAdgkIAJAHIAVARIAXAUQgBAFgFACQgEADgGAAg");
	this.shape_23.setTransform(258.125,282.425);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#F29539").s().p("AvEIkQjDgBiLiKQiKiLAAjEIAAiVQAAjCCKiLQCLiKDDgBIeIAAQDDABCLCKQCLCKAADDIAACVQAADEiLCLQiLCKjDABg");
	this.shape_24.setTransform(259.1068,279.25,1.0089,1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#51C1E1").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCLQCKCMDDAAMBqTAAAQDDAACLiMQCKiLAAjDMAAAg3GQAAjFiKiLQiLiKjDAAg");
	this.shape_25.setTransform(1418.525,507.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4,p:{x:191.975}},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_7},{t:this.shape_11},{t:this.shape_5},{t:this.shape_4,p:{x:191.975}},{t:this.shape_10},{t:this.shape_2},{t:this.shape_9},{t:this.shape_8}]},134).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_14},{t:this.shape_13},{t:this.shape_2},{t:this.shape_9},{t:this.shape_12}]},244).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_17},{t:this.shape_16},{t:this.shape_2},{t:this.shape_9},{t:this.shape_15}]},102).to({state:[{t:this.shape_25},{t:this.shape_6},{t:this.shape_24},{t:this.shape_4,p:{x:199.175}},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18}]},115).wait(114));

	// 图层_5
	this.instance = new lib.元件5();
	this.instance.setTransform(1417.45,283.35,1,1,0,0,0,230.3,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(83).to({regX:230.6,regY:217.8,scaleY:1.0001,skewX:0.2173,x:1416.95,y:501.15},0).wait(1).to({scaleY:1.0002,skewX:0.4347,x:1416.1},0).wait(1).to({skewX:0.652,x:1415.25,y:501.2},0).wait(1).to({scaleY:1.0003,skewX:0.8693,x:1414.45},0).wait(1).to({scaleY:1.0004,skewX:1.0866,x:1413.6},0).wait(1).to({scaleY:1.0005,skewX:1.304,x:1412.8},0).wait(1).to({skewX:1.5213,x:1411.95},0).wait(1).to({scaleY:1.0006,skewX:1.7386,x:1411.15},0).wait(1).to({scaleY:1.0007,skewX:1.9559,x:1410.3,y:501.15},0).wait(1).to({scaleY:1.0008,skewX:2.1733,x:1409.5},0).wait(1).to({scaleY:1.0007,skewX:2.0061,x:1410.1},0).wait(1).to({scaleY:1.0006,skewX:1.8389,x:1410.75},0).wait(1).to({skewX:1.6717,x:1411.4,y:501.2},0).wait(1).to({scaleY:1.0005,skewX:1.5046,x:1412.05},0).wait(1).to({skewX:1.3374,x:1412.65},0).wait(1).to({scaleY:1.0004,skewX:1.1702,x:1413.3},0).wait(1).to({scaleY:1.0003,skewX:1.003,x:1413.95},0).wait(1).to({skewX:0.8359,x:1414.55},0).wait(1).to({scaleY:1.0002,skewX:0.6687,x:1415.2},0).wait(1).to({skewX:0.5015,x:1415.85},0).wait(1).to({scaleY:1.0001,skewX:0.3343,x:1416.5,y:501.15},0).wait(1).to({skewX:0.1672,x:1417.1},0).wait(1).to({scaleY:1,skewX:0,x:1417.75},0).wait(1).to({scaleY:1.0001,skewX:0.2253,x:1416.9},0).wait(1).to({scaleY:1.0002,skewX:0.4506,x:1416.05,y:501.2},0).wait(1).to({scaleY:1.0003,skewX:0.6759,x:1415.2},0).wait(1).to({scaleY:1.0004,skewX:0.9012,x:1414.3},0).wait(1).to({scaleY:1.0005,skewX:1.1265,x:1413.45},0).wait(1).to({scaleY:1.0006,skewX:1.3518,x:1412.6},0).wait(1).to({scaleY:1.0007,skewX:1.5771,x:1411.75},0).wait(1).to({scaleY:1.0008,skewX:1.8024,x:1410.9},0).wait(1).to({scaleY:1.0009,skewX:2.0277,x:1410.05},0).wait(1).to({scaleY:1.001,skewX:2.253,x:1409.2},0).wait(1).to({scaleY:1.0011,skewX:2.4783,x:1408.3},0).wait(1).to({scaleY:1.0012,skewX:2.7036,x:1407.45,y:501.15},0).wait(1).to({scaleY:1.0013,skewX:2.9289,x:1406.6},0).wait(1).to({scaleY:1.0012,skewX:2.7036,x:1407.45},0).wait(1).to({scaleY:1.0011,skewX:2.4783,x:1408.3,y:501.2},0).wait(1).to({scaleY:1.001,skewX:2.253,x:1409.2},0).wait(1).to({scaleY:1.0009,skewX:2.0277,x:1410.05},0).wait(1).to({scaleY:1.0008,skewX:1.8024,x:1410.9},0).wait(1).to({scaleY:1.0007,skewX:1.5771,x:1411.75},0).wait(1).to({scaleY:1.0006,skewX:1.3518,x:1412.6},0).wait(1).to({scaleY:1.0005,skewX:1.1265,x:1413.45},0).wait(1).to({scaleY:1.0004,skewX:0.9012,x:1414.3},0).wait(1).to({scaleY:1.0003,skewX:0.6759,x:1415.2},0).wait(1).to({scaleY:1.0002,skewX:0.4506,x:1416.05},0).wait(1).to({scaleY:1.0001,skewX:0.2253,x:1416.9,y:501.15},0).wait(1).to({scaleY:1,skewX:0,x:1417.75},0).to({_off:true},1).wait(577));

	// 右侧 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("EgsLA5GQjDAAiKiLQiLiMAAjDMAAAg3GQAAjFCLiKQCKiLDDAAMBqTAAAQDDAACKCLQCLCKAADFMAAAA3GQAADDiLCMQiKCLjDAAg");
	var mask_graphics_134 = new cjs.Graphics().p("Eg1JAi9QjDAAiKiKQiLiMAAjEMAAAg3GQAAjECLiLQCKiLDDABMBqTAAAQDDgBCKCLQCLCLAADEMAAAA3GQAADEiLCMQiKCKjDAAg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:444.775,y:365.4}).wait(132).to({graphics:null,x:0,y:0}).wait(2).to({graphics:mask_graphics_134,x:1418.525,y:507.05}).wait(575));

	// 悄悄话
	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#FAD6C0").s().p("AAAgNIAFgUIgIBDQgCgXAFgYg");
	this.shape_26.setTransform(1374.5058,635.9518,4.959,4.959);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#EDC1A3").ss(0.6).p("AlGgYQAAAAAAABQAIARAYAdQAtBqAKBLIAKAZQAHAdASASQAAACAHAIIANAFQACAKARAHIAhAgIAEACAjwhdIAGAAIAtAcIA7A5QAWAXADAcQAFAWAMAKACqFXIA7hSQAvhDgFhwQgKhnACgeQAAgYAUghIAegsIAMgeQAFgjgRgMQgMgMgXAHQgqAWgUAcQgCAHgXAUQgOAWgSAKQAAgeAIgdIACgFIgChIIgFghIAAgHQgPgWgUgNIgUgFIgIAAABIk+IAAgOABZlRQgLAGgGANABGiEQgRhcARhZIACgFAg1lGQgNAWgJAXIAAgbIgEgKABGiEQg5gZhHAFIgKhNQgHgeAAgWACfh9IAAAvIhZg2Ag1BXQBgANAnBW");
	this.shape_27.setTransform(1390.8056,545.0236);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#F5C19A").ss(0.6,1,1).p("Airl8QggA2gKBIIgHAtAirl8QAohNBPgjAgHlpQhKhZhaBGEAo3AHmQAfgTAdgDQA8gHAvBDEAq7AGAQgYAJgWANQgzAdgjAzEAn3AKTQAAgTAKgZQAPg+AXgpQAIgOAIgMEgrdgIjQBhg+BFBXQAPA8gIBKIgFAtEgqQgKSQBCA0AXBU");
	this.shape_28.setTransform(1414.95,510.35);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#EEB680").ss(0.6,1,1).p("ATLGZQgMgMgbgFIgXgDQgdAFgSAKQggAXgMAlQgIAlAXAlQAYAgAjAIQAoAKAjgWAzKoUQARgWAUgNQAFgCARgIQAcgHAbAHQAsAIAXAlQAWAqgKAoQgMAqggAWQgrAXgngK");
	this.shape_29.setTransform(1407.975,524.9563);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#F9D4B6").s().p("AingOIgHgIQgQgUgLgVQC+AiDWgaQgPAZgTAVQg0A2g+AOIAGADIgNACIAFgFIgyAFQheAAhMhOg");
	this.shape_30.setTransform(1273.55,570.3625);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#78679E").s().p("AprT+QAKkNhfkCILAkyQDziVhPkyIlYvcQEECfE2BkQNmCjGvOSQqfPCzeAAQi+AAjLgWgAxuBdIgygvQiIiMhoiqQi5kvhRmJQAsAJAuAGIAHAHQB8B/C1AAQC1AAB+h/QA2g3AfhBQCvhZCSiYQAzAvA1AtQhSgBhfAtQjxCrCGEYIFqLJIoTFXQhch/h2h8g");
	this.shape_31.setTransform(1701.275,749.7742);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#9BD4CF").s().p("AwDMVIDnmZICukzIABgCIAAgxQgElNALkyQALkSAWj6IAAgCIBrgMIAOAFQBNAbBRAQIABAQQAIBXAWA0QBECnCri+IAMgCIAwASQBDAUAqgIQBjgPgeiRQBdgQBigbIBCgUQDQGlBsFyQAvCfAsDRQAwDfAtEbIACAIQAnDxAYElQn9CGmfAAQq7AAmwl+gAkdxPIACAAQALAVAQAVQgRgUgMgWg");
	this.shape_32.setTransform(1281.725,674.3091);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#E05D5B").s().p("A/rQaIAqhIIAKAIQKwJgVXloIAEgBIAFBQQoQCOmtAAQrTAAm0mVgAXFjiQhqhtgDicIgCgSIBFADQAXAlAvAUQBSAnBogHQBogDBNgvQA2giANgeIBZgKIAAARQAHCOhKBvQgKgRgUgPQhPhIhwADQhvAHhIBPQglAqgPArQgXgXgFgCgAzDryQgWg0gIhXIgBgQIARADQAMAWARAUIAHAIQBNBPBeAAIAygFIgEAFQhbBlg+AAQg2AAgghOgAuXr6IgxgSIgGgCQA+gOA0g3QATgVAPgZQAqgFArgIQAeCRhjAQQgMACgNAAQgkAAgwgPgAsezHQgxg7hXgNQhPgHhGAxIgZAXQgMgXACgxQADg5AZgeQAggoBDgPQA5gOA7AHQAtAFAqAUQAvAZAUAiQAXAvgIBBQgHA5gcAWIgWASQgFgcgeglg");
	this.shape_33.setTransform(1376.5343,654.5787);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#E47979").s().p("AQ3H+QAPgrAlgqQBIhPBvgHQBwgDBPBIQAUAPAKARIgPAUQheB1iIAHIgNABQhyAAhUhLgA1JmSQhogMhDhXIgKgRIAZgXQBGgxBPAHQBXANAxA7QAeAlAFAcQg7AvhIAAQgQAAgRgDg");
	this.shape_34.setTransform(1419.125,583.3628);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#F9D6BD").s().p("EgirAF4QAKjuCclVQAvhqA+g8QBmhoC1goIACgBQgWD6gKERQhhBiggDbQglEECeByIiuEzQlujXAUmggAiSJ6QgigHgbgMQgsjRguifQhtlxjQmlQBFgWA+gcIAMAGQCpBZBgE7QArCIAdBPQAKAYAAAUQAIhQAAinIAAiXIABgBIgEgBIggghQgRgHgDgKIgMgFQgIgIAAgCQgRgSgIgdIgJgZQgKhKgthrQgZgegHgRIgBgBQAuggAogkQAbgaAYgaQBEhPArheIADAJIAAAbQAJgXANgWQAsAMBDgOIAPgEIAAAOIgDAFQgIAsAAAuQAAAtAIAuQgIguAAgtQAAguAIgsIADgFQAFgNALgGIAKgEIAJAAIATAGQAUAMAPAXIAAAGIAFAhIADBIIgDAFQgHAdAAAeIAAAvIhag2IBaA2IAAgvQARgKAPgWQAWgTADgIQAUgbAqgXQAWgHAMAMQASAMgFAkIgNAdIgdAsQgUAhAAAYQgDAfAKBnQAFBwgvBDIg6BSIABBVQAFCcAMBMQAZCZg2DLQgvC1g0AvQhHA+hYAAQgeAAgfgHgABgneQgohXhggMQBgAMAoBXgAjdr2IAtAbIA8A5QAWAYACAcQAFAWANAKQgNgKgFgWQgCgcgWgYIg8g5IgtgbIgGAAgABTseIgBAAIgCgBQgugUg2AAIgBAAIAAAAIgVABIgCAAIgKhNQgIgdAAgXQAAAXAIAdIAKBNIACAAIAVgBIAAAAIABAAQA2AAAuAUIACABIABAAgAX0G7IgHgIQBuAPB2gHQEEgMDYhsQgfBBg2A3Qh+B+i1AAQi1AAh8h+gAG7lUQhoh5geiIQgjiVBahKIAFgFQAigYBMAMIABAHIAKgGIAAAAIAJACQgFBIAEBMQAOEBBpDVQhcgfhShdg");
	this.shape_35.setTransform(1389.4858,611.6);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#2D3333").s().p("AGyCYQg0gvAAhDQgDhCAvgvQAtgxBDgFQBDAAAyAvQAxAsAABCQACAygaArQgIAMgKAMQgaAbgiANQgZAJgdABQhIAAgqgrgAGqgtQgMAMADASQgDAQAPANQAMAMASAAQAPAAAOgPQANgLAAgSQgDgRgMgMQgMgNgSAAQgRAAgNAPgAqQBJQgqgqgFhCQAAhDAqgqQAvgvA8gDQBDAAAqAqQAvArACBAQAFA9gvAyQgoAshCADQhBAAgvgogAqahwQgMAMACASQAAARAKAKQARANAPgDQASAAAHgKQAMgMAAgUQAAgPgMgMQgMgNgSAAQgUAFgHAKg");
	this.shape_36.setTransform(1288.7317,458.925);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#2B2421").s().p("AGIB+QgvgnAAg8QgFg9AqgtQAogqA7gFQA8gCAvAqQAvAqACA4QAABBgnAqQgoAsg+ADIgGAAQg1AAgtgogAF5gzQgKAKAAARQAFAUAIAGQARANAMgDQAPAAAKgMQAMgMgCgOQAAgSgMgKQgKgHgSAAQgRAAgKAKgApPBNQgtgtAAgzQgDg5AmgqQAngtA5gCQA+AAAmAlQAsAlADA8QAAA9gmAlQglAsg7AAIgNABQgxAAglgjgApehYQgKAJAAAPQAFASAHAHQASANAJgDQASAAAHgMQANgNgDgMQAAgPgMgMQgKgKgRAAQgNACgMANg");
	this.shape_37.setTransform(1540.1172,547.807);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#FFFFFF").s().p("ASIONQgvgUgWglQEJAADugZQgMAeg3AjQhNAvhoACIggACQhVAAhFgigAaTHZQhDg8gEhjQgDhcA+hIQA8hCBggIQBhgCBFA+QBGBAACBeQAIBchBBIQg7BDhjAHIgNABQhVAAhFg8gAbtClQg8AFgnAqQgrAtAFA+QAAA8AvAnQAwAqA5gCQA+gDAngsQAogqAAhBQgDg5gvgqQgsgog4AAIgGAAgALAGlQhAg3gFheQgIhXA+hFQA8hDBZgFQBZgDBDA8QBGA7ACBaQAFBeg+BAQg3BBheAFIgNAAQhTAAg8g5gAKxCtQglAqACA5QAAA0AtAtQAqAnA5gFQA8AAAlgsQAlglAAg+QgCg8gtglQglglg+AAQg5ACgoAtgAaHEmQgHgHgFgUQAAgRAKgKQAJgKASAAQARAAAKAHQANAKAAASQACAOgMANQgKAMgPAAIgFABQgLAAgOgLgAKvD8QgIgHgFgSQAAgPAKgJQANgNAMgCQARAAAKAKQANAMAAAPQACAMgMANQgIAMgRAAIgEABQgJAAgOgLgAuNnGQhKhFgFhrQgDhoBIhNQBFhMBpAAQBlgIBSBLQBIBFAFBrQAEBgg9BJQAbgrgCgyQAAhDgygsQgygvhCAAQhDAFgtAxQgvAvACBDQAABDA0AvQArArBHAAQAegBAZgJQgxAZg8ACIgHAAQhkAAhKhGgA/GoNQhGhGgFhjQgChjBDhIQBDhIBjgFQBoAABDBAQBLBGACBjQAABohABDQhGBLhjACQhjAAhIhAgA9crlQgqAqAABDQAFBDAqAqQAwAoBAAAQBDgDAogsQAvgygFg+QgDhAgvgrQgqgqhDAAQg7ADgwAvgAsZpGQgOgNACgRQgCgSAMgMQAMgPASAAQARAAAMANQANAMACARQAAASgMAMQgPAPgPAAQgRAAgNgMgA9gqMQgKgKAAgRQgDgSANgMQAHgKAUgFQARAAANANQAMAMAAAPQAAAUgMAMQgIAKgRAAIgFABQgNAAgOgLg");
	this.shape_38.setTransform(1410.9846,518.6098);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#FADFCB").s().p("EABGAgeILKpJIEMv1QkPhFjhjNQitiehgjCQhqjUgOkCQgEhMAFhIIABgGQEUiWErkBQBjhRBLhXIA+hNQBeDmDuBfQBPAdBQAPIBDAIQgthDgCg0QgFgeAHgRQDzDzGvBIQCAAVD7DJIAAASIAMgIIACgBQAjgUApgLQAbgIAWgDQA0gHAcAVQAvAgATA4QARA2gJBMQgRCGheCGQhhCNiLAWQhHAKgwgUQg6BdhOBVIgaAbQiSCZivBZQjYBtkEALQh2AHhugOQgugGgsgKQBRGKC5EvIjWKIIt8IwgAOMAIQACCcBrBtQAFACAWAXQBaBPB5gFQCIgHBfh1IAOgUQBLhvgIiNIAAgRIhZAKQjuAZkJAAIhGgDgAQDjWQAXAAAVgMIACgBIABgBIABAAIACgBIgCABIgBAAIgBABIgCABQgVAMgXAAIAAAAIgBAAQgLAAgMgDIgBAAQgjgIgYggQgRgcAAgcQAAgJACgJQAMglAggXQASgKAdgFIAXADQAbAFAMAMQgMgMgbgFIgXgDQgdAFgSAKQggAXgMAlQgCAJAAAJQAAAcARAcQAYAgAjAIIABAAQAMADALAAIABAAIAAAAgEAnbgGuQgXAqgPA+QgKAZAAATQAAgTAKgZQAPg+AXgqQAIgOAIgLQgIALgIAOgAavsOQhgAHg8BDQg+BIADBcQAEBjBDA7QBLBBBcgFQBjgIA7hDQBBhHgIhcQgChehGhBQhDg7hbAAIgIAAgALSsvQhZAFg8BDQg+BGAIBWQAFBfBAA2QBBA+BbgFQBegFA3hAQA+hBgFheQgChZhGg8QhAg5hVAAIgHAAgEAqSgGiIgEgEQgpg4g0AAIAAAAIAAAAIgKABIgBAAQgcADgfATQAjgzAzgeQAWgMAYgJQgYAJgWAMQgzAegjAzQAfgTAcgDIABAAIAKgBIAAAAIAAAAQA0AAApA4IAEAEIAAAAgAYafFIEsjBIITlXIlqrKQiGkYDxirQBfgtBSABQCrABBzDCIAFAOIFZPcQBPEzjzCVIrBExIlQCSgA6cmWIgCAAIgQgDQhSgQhMgcIgPgFQlsh/jCiqQijiLgoibQg7AShQguQh3g8gtimQgniVAdiGQAeiSBrgeQAvgMBIA0IgLi/IKjAlIA3oGIAbIEIK7AlIAeoGIBDINII9AhIAeofIAqIhIEoAQIgEBzQgDBBgHBAQAcgSAggLQBSgjAqAbQBSAxAGB0QABATgBAWQgBBTgfBRQgTA0ggA0QhHB9hoApIgKAEIgQAEIgPAEQhDAPgtgNQgKgDgIgEIgHAQQgrBehEBPQgYAbgbAZQgoAkgtAhQhNA2heAqQg+AchFAXIhBATQhiAbhdARQgsAHgqAFQhcALhYAAQh0AAhtgUgA2suwQhDAPggAoQgZAegCA5QgDAxANAXIAKARQBDBXBoAMQBcANBIg5IAWgSQAbgWAIg5QAHhBgWgvQgUgigvgZQgqgUgtgFQgUgDgTAAQgnAAgnAKgAj30rQggA3gKBIIgHAsIAHgsQAKhIAgg3QAohNBPgjQhPAjgoBNgA0AyOQAZAAAbgNIABgBIAAAAIAAAAIAEgCQAggWAMgqQADgMAAgNQAAgcgPgdQgXglgsgIQgbgHgcAHIgWAKQgUANgRAWQARgWAUgNIAWgKQAcgHAbAHQAsAIAXAlQAPAdAAAcQAAANgDAMQgMAqggAWIgEACIAAAAIAAAAIgBABQgbANgZAAIgBAAIAAAAQgKAAgJgCIgEgBIgBAAIABAAIAEABQAJACAKAAIAAAAIABAAgAtd7TQhpAAhFBNQhIBNADBoQAFBrBKBFQBNBIBogDQA8gBAxgaQAigMAagcQAKgLAIgNQA8hJgEhgQgFhrhIhFQhKhDhbAAIgSAAgEgp8gUyIgFAsIAFgsQADgZAAgYQAAgugKgnQgXhVhDg0QBDA0AXBVIgCgDQgogwgwAAIgBAAIAAAAQghAAglAWIAAAAIgDACIgCACIACgCIADgCIAAAAQAlgWAhAAIAAAAIABAAQAwAAAoAwIACADQAKAnAAAuQAAAYgDAZgAhT0XIgCgDIgBgCQgogtgtAAIAAAAIAAAAQgjAAgmAcIAAAAIgBABIAAAAIgBAAIgBABIABgBIABAAIAAAAIABgBIAAAAQAmgcAjAAIAAAAIAAAAQAtAAAoAtIABACIACADgEghEga9QhDBIACBjQAFBkBGBFQBIBBBjAAQBjgDBGhKQBAhDAAhoQgChkhLhFQhDhAhoAAQhjAEhDBIgEAnrgHHIAAAAgEgqDgW4IAAAAg");
	this.shape_39.setTransform(1422.5743,604.575);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#282929").s().p("EAoKATMQj7jIiAgWQmvhIjzjzQgHASAFAdQACA0AtBDIhDgHQhQgPhPgeQjuhehejnIg+BNQhLBXhjBSQkrEAkVCWIAAAHIgJgCIAAAAIgKAFIgBgHQhMgMgiAYQgjiaAAiqQAAhBAFg+QAfhRABhTQABgVgBgUQBVlmEVkSQGPmPI4AAQC2AACkAoIAOAEQAEAhAPAbQAhA7BAAUQBBAXA+gjQAQgKAOgLQgHAKgGALQgeA0APBDIAAAFQAWBAA5AjQA8AgBFgUQA6gRAegyQAgAdAgAfQGPGMAAI4QAADEgwCxQgWADgbAIQgpAKgkAVIgBAAIgMAIIAAgSgAjCB3IkogPIgqohIgeIeIo9ggIhDoNIgeIFIq7glIgboDIg3IGIqkglIgogCIgPhtQgPh8AFiNQAbmhDfi/QEsitFvg1QFWg0FcA3QFEAyEAByQD/B5BeCLQBwCrACGFQAACOgMBsIgHBqg");
	this.shape_40.setTransform(1420.1875,414.2305);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#DA5620").s().p("AAvEaQg4gjgWhAIAAgFQgPhDAdg0QAGgMAIgJQgOALgRAKQg+AjhAgXQhBgUggg6QgPgcgEggIgOgEQAEgZAMgXIACgMIADgHQAWg8A2geQAtgYAwAEIAEgEQA0gwBAADIAAAAQAmgIApAKQAjALAZAVQAXATAOAdQAgA5gPA+IgCAFQgLApgdAdQARAFASALQA5AdAWA8IAAAFQARBFggA5IgGAMQgeAyg6ARQgbAIgZAAQgoAAglgUg");
	this.shape_41.setTransform(1623.2093,371.3397);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#1E1F1E").s().p("AjBPlQgSg5gvggQgcgVg0AIQAvixABjEQAAo3mQmNQgfgggggcIAGgMQAhg5gShFIAAgFQgWg8g5geQgRgLgSgFQAdgdALgpIADgFQAOg+ggg5QgOgdgXgTIARgCQCLgPCVA5QCaA+BbBmQE9FeCSBPQEdCVBymQQAHADANAMQAZAXARAqQAsB5hWDnQAvAFA5glQB3hIA+jEIgZExQg5FkiDDpQkiIEmTA+QguAGguAAQgbAAgbgCg");
	this.shape_42.setTransform(1725,444.3468);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#282929").s().p("AiaGhQgRgBgtgLIgrgMIgWhdIgTBkIg8gDIAIhYIALiIQAAgSgEg8QgEhIABgzQAFisBEhdQBThuCAgaQCAgbCIBEQB+A9AbCUQAJAugCBBIgFBPQgDA1gZC5IgYC4IgsgDIglAHg");
	this.shape_43.setTransform(1256.524,471.1122,4.959,4.959);

	this.instance_1 = new lib.元件24("synched",0);
	this.instance_1.setTransform(1285.3,526.2,1,1,0,0,0,20.7,17.1);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#EDC1A3").ss(0.6).p("AjwhdIAGAAIAtAcIA7A5QAWAXADAcQAFAWAMAKAlGgYQAAAAAAABQAIARAYAdQAtBqAKBLIAKAZQAHAdASASQAAACAHAIIANAFQACAKARAHIAhAgIAEACACqFXIA7hSQAvhDgFhwQgKhnACgeQAAgYAUghIAegsIAMgeQAFgjgRgMQgMgMgXAHQgqAWgUAcQgCAHgXAUQgOAWgSAKQAAgeAIgdIACgFIgChIIgFghIAAgHQgPgWgUgNIgUgFIgIAAABIk+IAAgOABZlRQgLAGgGANABGiEQgRhcARhZIACgFAg1lGQgNAWgJAXIAAgbIgEgKABGiEQg5gZhHAFIgKhNQgHgeAAgWACfh9IAAAvIhZg2Ag1BXQBgANAnBW");
	this.shape_44.setTransform(1390.8056,545.0236);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#F5C19A").ss(0.6,1,1).p("AgHlpQhKhZhaBGQAohNBPgjAirl8QggA2gKBIIgHAtEAo3AHmQAfgTAdgDQA8gHAvBDEAq7AGAQgYAJgWANQgzAdgjAzEAn3AKTQAAgTAKgZQAPg+AXgpQAIgOAIgMEgo3gIKQAPA8gIBKIgFAtEgrdgIjQBhg+BFBXEgqQgKSQBCA0AXBU");
	this.shape_45.setTransform(1414.95,510.35);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#9BD4CF").s().p("AwDMVIDnmZICukzIABgCIAAgMIAAglQgElNALkyQALkSAWj6IAAgCIBrgMIAOAFQBNAbBRAQIABAQQAIBXAWA0QBECnCri+IAMgCIAwASQBDAUAqgIQBjgPgeiRQBdgQBigbIBCgUQDQGlBsFyQAvCfAsDRIAcCKQAhCqAgDGIACAIQAnDxAYElQn9CGmfAAQq7AAmwl+gAkdxPIACAAQALAVAQAVQgRgUgMgWg");
	this.shape_46.setTransform(1281.725,674.3091);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#E47979").s().p("AjjAwQAPgqAlgpQBIhPBugIQBwgCBQBHQAUAPAJASIgPAUQheBziHAIIgNAAQhxAAhVhLg");
	this.shape_47.setTransform(1549.8,629.5329);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#E05D5B").s().p("A/rMKIAqhIIAKAIQKwJgVXloIAEgBIAFBQQoQCOmtAAQrTAAm0mVgAXFnyQhqhtgDicIgCgSIBFADQAXAlAvAUQBSAnBogHQBogDBNgvQA2giANgeIBZgKIAAARQAHCOhKBvQgKgRgUgPQhPhIhwADQhvAHhIBPQglAqgPArQgXgXgFgCgAzDwCQgWg0gIhXIgBgQIARADQAMAWARAUIAHAIQBNBPBeAAIAygFIgEAFQhbBlg+AAQg2AAgghOgAuXwKIgxgSIgGgCQA+gOA0g3QATgVAPgZQAqgFArgIQAeCRhjAQQgMACgNAAQgkAAgwgPg");
	this.shape_48.setTransform(1376.5343,681.7802);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#282929").s().p("Ai0fpQAcAMAhAHQB9AcBfhSQA0gvAvi1QA2jMgZiZQgMhNgFicIgBhVIA6hSQAvhDgFhvQgKhoADgeQAAgZAUggIAdgtIANgdQAFgjgSgNQgMgMgWAHQgqAXgUAbQgDAIgWATQgPAXgRAKQAAgeAHgeIADgFIgDhIIgFggIAAgHQgPgXgUgMIgTgFIgJAAQBogpBHh9QAgg0AUg0QAfhRABhSQABgWgBgTQgGh0hTgxQgqgbhSAjQggAMgcARQAHg/ADhCIAEhzIkngQIgqohIgeIfIo9ghIhDoNIgeIGIq7glIgboEIg3IGIqjglIAKC/QhHg0gvAMQhrAegeCSQgdCGAnCUQAtCmB3A8QBQAuA6gSQApCbCjCLQDCCqFsB/IhrANIAAABIgCABQi1AohmBoQg+A8gvBqQicFWgKDuQgHCYAsB8QhVgPiKgiIjTg5IhvnOIhfHwIkngPIAom2QAyo9AEhjQAAhagTksQgXliAIkBQAWtXFUnLQGZoiJ7iDQJ/iDKjFOQJwExCFLcQAtDkgHFFIgCASQBjjTCyixQGPmQI4AAQC2AACkApIAPAEQADAgAPAbQAhA8BAAUQBBAWA+gjQARgJANgMQgHAKgGALQgeA0APBDIAAAFQAWBBA5AjQA8AgBFgUQA6gSAfgyQAgAdAfAgQGPGMAAI3QAADFgwCwQgWADgbAIQgpALgjAUIgCABIgMAIIAAgSQj7jJiAgVQmvhIjzjzQgHARAFAeQACA0AtBDIhDgIQhQgPhPgdQjuhfhejlIg+BNQhLBWhjBRQkrEBkVCWIAAAGIgJgBIAAAAIgKAFIgBgHQhCgKgiARIgJAFIgGAFQhaBKAjCVQAKAvATAtIgsFSIh5OOIjXgNIiIAaIgdiMgEgacAgvQiHhzAijzQAgjcBhhhQgLExAEFOIAAAlgAhrWiQgdhQgriIQhgk7iphZIgMgGQBegqBNg2IAAAAQAHASAZAdQAtBrAKBKIAJAZQAIAeARARQAAADAIAHIAMAFQADAKARAHIAgAhIAEACIgBAAIAACXQAACngIBRQAAgTgKgZgAgjGzIgDgJIAHgQQAIAEAKADQgNAWgJAXgABxGcIAQgFQgLAGgFAMg");
	this.shape_49.setTransform(1386.775,470.5567);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#F9D6BD").s().p("EgiGAKMQgsh9AHiXQAKjuCclVQAvhqA+g8QBmhoC1goIACgBQgWD6gKERQhhBiggDbQgiDzCHB0IAUAPIiuEzQjpiJhMjagAiSJ6QgigHgbgMQgsjRguifQhtlxjQmlQBFgWA+gcIAMAGQCpBZBgE7QArCIAdBPQAKAYAAAUQAIhQAAinIAAiXIABgBIgEgBIggghQgRgHgDgKIgMgFQgIgIAAgCQgRgSgIgdIgJgZQgKhKgthrQgZgegHgRIgBgBQAuggAogkQAbgaAYgaQBEhPArheIADAJIAAAbQAJgXANgWQAsAMBDgOIAPgEIAAAOIgDAFQgIAsAAAuQAAAtAIAuQgIguAAgtQAAguAIgsIADgFQAFgNALgGIAKgEIAJAAIATAGQAUAMAPAXIAAAGIAFAhIADBIIgDAFQgHAdAAAeIAAAvIhag2IgBAAIgCgBQgugUg2AAIgBAAIAAAAIgVABIgCAAIgKhNQgIgdAAgXQAAAXAIAdIAKBNIACAAIAVgBIAAAAIABAAQA2AAAuAUIACABIABAAIBaA2IAAgvQARgKAPgWQAWgTADgIQAUgbAqgXQAWgHAMAMQASAMgFAkIgNAdIgdAsQgUAhAAAYQgDAfAKBnQAFBwgvBDIg6BSIABBVQAFCcAMBMQAZCZg2DLQgvC1g0AvQhHA+hYAAQgeAAgfgHgABgneQgohXhggMQBgAMAoBXgAjdr2IAtAbIA8A5QAWAYACAcQAFAWANAKQgNgKgFgWQgCgcgWgYIg8g5IgtgbIgGAAgAX0G7IgHgIQBuAPB2gHQEEgMDYhsQgfBBg2A3Qh+B+i1AAQi1AAh8h+gAG7lUQhFhPgkhWQgTgugKguQgjiVBahKIAFgFIAKgGQAigRBCALIABAHIAKgGIAAAAIAJACQgFBIAEBMQAOEBBpDVQhcgfhShdg");
	this.shape_50.setTransform(1389.4858,611.6);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#78679E").s().p("AprT+QAKkNhfkCILAkyQDziVhPkyIlYvcQEECfE2BkQNmCjGvOSQifDljACuQpoIvu2AAQi+AAjLgWgAxuBdIgygvQiIiMhoiqQi5kvhRmJQAsAJAuAGIAHAHQB8B/C1AAQC1AAB+h/QA2g3AfhBQCvhZCSiYQAzAvA1AtQhSgBhfAtQjxCrCGEYIFqLJIoTFXQhch/h2h8g");
	this.shape_51.setTransform(1701.275,749.7742);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#FADFCB").s().p("EABGAgeILKpJIEMv1QkPhFjhjNQitiehgjCQhqjUgOkCQgEhMAFhIIABgGQEUiWErkBQBjhRBLhXIA+hNQBeDmDuBfQBPAdBQAPIBDAIQgthDgCg0QgFgeAHgRQDzDzGvBIQCAAVD7DJIAAASIAMgIIACgBQAjgUApgLQAbgIAWgDQA0gHAcAVQAvAgATA4QARA2gJBMQgRCGheCGQhhCNiLAWQhHAKgwgUQg6BdhOBVIgaAbQiSCZivBZQjYBtkEALQh2AHhugOQgugGgsgKQBRGKC5EvIjWKIIt8IwgAOMAIQACCcBrBtQAFACAWAXQBaBPB5gFQCIgHBfh1IAOgUQBLhvgIiNIAAgRIhZAKQjuAZkJAAIhGgDgAQDjWQAXAAAVgMIACgBIABgBIABAAIACgBIgCABIgBAAIgBABIgCABQgVAMgXAAIAAAAIgBAAQgLAAgMgDIgBAAQgjgIgYggQgRgcAAgcQAAgJACgJQAMglAggXQASgKAdgFIAXADQAbAFAMAMQgMgMgbgFIgXgDQgdAFgSAKQggAXgMAlQgCAJAAAJQAAAcARAcQAYAgAjAIIABAAQAMADALAAIABAAIAAAAgEAnbgGuQgXAqgPA+QgKAZAAATQAAgTAKgZQAPg+AXgqQAIgOAIgLQgIALgIAOgAavsOQhgAHg8BDQg+BIADBcQAEBjBDA7QBLBBBcgFQBjgIA7hDQBBhHgIhcQgChehGhBQhDg7hbAAIgIAAgALSsvQhZAFg8BDQg+BGAIBWQAFBfBAA2QBBA+BbgFQBegFA3hAQA+hBgFheQgChZhGg8QhAg5hVAAIgHAAgEAqSgGiIgEgEQgpg4g0AAIAAAAIAAAAIgKABIgBAAQgcADgfATQAjgzAzgeQAWgMAYgJQgYAJgWAMQgzAegjAzQAfgTAcgDIABAAIAKgBIAAAAIAAAAQA0AAApA4IAEAEIAAAAgAYafFIEsjBIITlXIlqrKQiGkYDxirQBfgtBSABQCrABBzDCIAFAOIFZPcQBPEzjzCVIrBExIlQCSgA6cmWIgCAAIgQgDQhSgQhMgcIgPgFQlsh/jCiqQijiLgoibQg7AShQguQh3g8gtimQgniVAdiGQAeiSBrgeQAvgMBIA0IgLi/IKjAlIA3oGIAbIEIK7AlIAeoGIBDINII9AhIAeofIAqIhIEoAQIgEBzQgDBBgHBAQAcgSAggLQBSgjAqAbQBSAxAGB0QABATgBAWQgBBTgfBRQgTA0ggA0QhHB9hoApIgKAEIgQAEIgPAEQhDAPgtgNQgKgDgIgEIgHAQQgrBehEBPQgYAbgbAZQgoAkgtAhQhNA2heAqQg+AchFAXIhBATQhiAbhdARQgsAHgqAFQhcALhYAAQh0AAhtgUgAkhysIgHAsIAHgsQAKhIAgg3QggA3gKBIgA0AyOQAZAAAbgNIABgBIAAAAIAAAAIAEgCQAggWAMgqQADgMAAgNQAAgcgPgdQgXglgsgIQgbgHgcAHIgWAKQgUANgRAWQARgWAUgNIAWgKQAcgHAbAHQAsAIAXAlQAPAdAAAcQAAANgDAMQgMAqggAWIgEACIAAAAIAAAAIgBABQgbANgZAAIgBAAIAAAAQgKAAgJgCIgEgBIgBAAIABAAIAEABQAJACAKAAIAAAAIABAAgAtd7TQhpAAhFBNQhIBNADBoQAFBrBKBFQBNBIBogDQA8gBAxgaQAigMAagcQAKgLAIgNQA8hJgEhgQgFhrhIhFQhKhDhbAAIgSAAgEgp8gUyIgFAsIAFgsQADgZAAgYQAAgugKgnQgXhVhDg0QBDA0AXBVIgCgDQgogwgwAAIgBAAIAAAAQghAAglAWIAAAAIgDACIgCACIACgCIADgCIAAAAQAlgWAhAAIAAAAIABAAQAwAAAoAwIACADQAKAnAAAuQAAAYgDAZgAhT0XIgCgDIgBgCQgogtgtAAIAAAAIAAAAQgjAAgmAcIAAAAIgBABIAAAAIgBAAIgBABQAohNBPgjQhPAjgoBNIABgBIABAAIAAAAIABgBIAAAAQAmgcAjAAIAAAAIAAAAQAtAAAoAtIABACIACADgEghEga9QhDBIACBjQAFBkBGBFQBIBBBjAAQBjgDBGhKQBAhDAAhoQgChkhLhFQhDhAhoAAQhjAEhDBIgEAnrgHHIAAAAgAj30rIAAAAgEgqDgW4IAAAAg");
	this.shape_52.setTransform(1422.5743,604.575);

	var maskedShapeInstanceList = [this.shape_26,this.shape_27,this.shape_28,this.shape_29,this.shape_30,this.shape_31,this.shape_32,this.shape_33,this.shape_34,this.shape_35,this.shape_36,this.shape_37,this.shape_38,this.shape_39,this.shape_40,this.shape_41,this.shape_42,this.shape_43,this.instance_1,this.shape_44,this.shape_45,this.shape_46,this.shape_47,this.shape_48,this.shape_49,this.shape_50,this.shape_51,this.shape_52];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26}]},595).to({state:[{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_42},{t:this.shape_41},{t:this.shape_49},{t:this.shape_38},{t:this.shape_37},{t:this.shape_48},{t:this.shape_47},{t:this.shape_36},{t:this.shape_46},{t:this.shape_30},{t:this.shape_29},{t:this.shape_45},{t:this.shape_44},{t:this.shape_26},{t:this.instance_1}]},55).wait(59));

	// 小鸟
	this.instance_2 = new lib.元件15();
	this.instance_2.setTransform(1470.7,479.45,1,1,16.6158,0,0,2.9,79.9);

	this.instance_3 = new lib.小鸟身子();
	this.instance_3.setTransform(1357,423);

	this.instance_4 = new lib.元件16();
	this.instance_4.setTransform(1377.45,515.3,1,1,-3.3328,0,0,14.2,2.7);

	this.instance_5 = new lib.元件14("synched",30);
	this.instance_5.setTransform(1471,503,1,1,0,0,0,114,104);
	this.instance_5._off = true;

	var maskedShapeInstanceList = [this.instance_2,this.instance_3,this.instance_4,this.instance_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2}]},480).to({state:[{t:this.instance_5}]},46).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[{t:this.instance_5}]},1).to({state:[]},1).wait(114));
	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(526).to({_off:false},0).wait(1).to({regX:115.4,regY:104.2,x:1474.4,y:506.2,startPosition:31},0).wait(1).to({x:1476.4,y:509.2,startPosition:32},0).wait(1).to({x:1478.4,y:512.2,startPosition:33},0).wait(1).to({x:1480.4,y:515.2,startPosition:34},0).wait(1).to({x:1482.4,y:518.2,startPosition:35},0).wait(1).to({x:1484.45,y:521.2,startPosition:36},0).wait(1).to({x:1486.45,y:524.2,startPosition:37},0).wait(1).to({x:1488.45,y:527.2,startPosition:38},0).wait(1).to({x:1490.45,y:530.2,startPosition:39},0).wait(1).to({x:1492.45,y:533.2,startPosition:40},0).wait(1).to({x:1494.45,y:536.2,startPosition:41},0).wait(1).to({x:1496.5,y:539.25,startPosition:42},0).wait(1).to({y:535.55,startPosition:43},0).wait(1).to({y:531.85,startPosition:44},0).wait(1).to({y:528.15,startPosition:45},0).wait(1).to({y:524.45,startPosition:46},0).wait(1).to({y:520.75,startPosition:47},0).wait(1).to({y:517.05,startPosition:0},0).wait(1).to({y:513.35,startPosition:1},0).wait(1).to({y:509.65,startPosition:2},0).wait(1).to({y:505.95,startPosition:3},0).wait(1).to({y:502.25,startPosition:4},0).wait(1).to({y:498.55,startPosition:5},0).wait(1).to({y:499.45,startPosition:6},0).wait(1).to({y:500.4,startPosition:7},0).wait(1).to({y:501.35,startPosition:8},0).wait(1).to({y:502.3,startPosition:9},0).wait(1).to({y:503.25,startPosition:10},0).wait(1).to({y:504.15,startPosition:11},0).wait(1).to({y:505.1,startPosition:12},0).wait(1).to({y:506.05,startPosition:13},0).wait(1).to({y:507,startPosition:14},0).wait(1).to({y:507.95,startPosition:15},0).wait(1).to({y:508.85,startPosition:16},0).wait(1).to({y:509.8,startPosition:17},0).wait(1).to({y:510.75,startPosition:18},0).wait(1).to({y:511.7,startPosition:19},0).wait(1).to({y:512.65,startPosition:20},0).wait(1).to({y:513.55,startPosition:21},0).wait(1).to({y:514.5,startPosition:22},0).wait(1).to({y:515.45,startPosition:23},0).wait(1).to({y:516.4,startPosition:24},0).wait(1).to({y:517.35,startPosition:25},0).wait(1).to({y:518.25,startPosition:26},0).wait(1).to({y:519.2,startPosition:27},0).wait(1).to({y:520.15,startPosition:28},0).wait(1).to({y:521.1,startPosition:29},0).wait(1).to({y:522.05,startPosition:30},0).wait(1).to({y:522.95,startPosition:31},0).wait(1).to({y:523.9,startPosition:32},0).wait(1).to({y:524.85,startPosition:33},0).wait(1).to({y:525.8,startPosition:34},0).wait(1).to({y:526.75,startPosition:35},0).wait(1).to({y:527.65,startPosition:36},0).wait(1).to({y:528.6,startPosition:37},0).wait(1).to({y:529.55,startPosition:38},0).wait(1).to({y:530.5,startPosition:39},0).wait(1).to({y:531.45,startPosition:40},0).wait(1).to({y:532.4,startPosition:41},0).wait(1).to({x:1493.45,y:528.75,startPosition:42},0).wait(1).to({x:1490.45,y:525.1,startPosition:43},0).wait(1).to({x:1487.45,y:521.45,startPosition:44},0).wait(1).to({x:1484.45,y:517.8,startPosition:45},0).wait(1).to({x:1481.4,y:514.15,startPosition:46},0).wait(1).to({x:1478.4,y:510.5,startPosition:47},0).wait(1).to({x:1475.4,y:506.85,startPosition:0},0).wait(1).to({x:1472.4,y:503.2,startPosition:1},0).wait(1).to({startPosition:2},0).to({_off:true},1).wait(114));

	// 小鸟bg
	this.instance_6 = new lib.小鸟bg();
	this.instance_6.setTransform(1002,104);
	this.instance_6._off = true;

	var maskedShapeInstanceList = [this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(480).to({_off:false},0).to({_off:true},115).wait(114));

	// 小猫动画
	this.instance_7 = new lib.元件12();
	this.instance_7.setTransform(1341,515.2,1,1,0,0,0,109,169.2);

	this.instance_8 = new lib.元件1();
	this.instance_8.setTransform(1341,684.6,1,1,0,0,0,109,338.6);

	var maskedShapeInstanceList = [this.instance_7,this.instance_8];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_7}]},378).to({state:[{t:this.instance_8}]},68).to({state:[]},34).wait(229));

	// 小猫
	this.instance_9 = new lib.小猫bgpng();
	this.instance_9.setTransform(1012,88,1.5476,1.2829);
	this.instance_9._off = true;

	var maskedShapeInstanceList = [this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(378).to({_off:false},0).to({_off:true},102).wait(229));

	// 小雨
	this.instance_10 = new lib.小雨_2();
	this.instance_10.setTransform(1036.7,220.6,1,1,0,0,0,7.4,27.4);
	this.instance_10._off = true;

	var maskedShapeInstanceList = [this.instance_10];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(261).to({_off:false},0).to({_off:true},117).wait(331));

	// 微风
	this.instance_11 = new lib.小雨();
	this.instance_11.setTransform(1022,-51,0.8309,0.8309);
	this.instance_11._off = true;

	var maskedShapeInstanceList = [this.instance_11];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(134).to({_off:false},0).to({_off:true},244).wait(331));

	// 左侧遮罩 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	var mask_1_graphics_0 = new cjs.Graphics().p("EgsLA5GQjDAAiKiLQiLiMAAjDMAAAg3GQAAjFCLiKQCKiLDDAAMBqTAAAQDDAACKCLQCLCKAADFMAAAA3GQAADDiLCMQiKCLjDAAg");
	var mask_1_graphics_134 = new cjs.Graphics().p("EgsCA5GQjDAAiKiLQiLiMAAjDMAAAg3GQAAjFCLiKQCKiLDDAAMBqTAAAQDDAACKCLQCLCKgBDFMAAAA3GQABDDiLCMQiKCLjDAAg");

	this.timeline.addTween(cjs.Tween.get(mask_1).to({graphics:mask_1_graphics_0,x:444.775,y:365.4}).wait(132).to({graphics:null,x:0,y:0}).wait(2).to({graphics:mask_1_graphics_134,x:445.65,y:365.4}).wait(575));

	// 大声喊
	this.instance_12 = new lib.元件17("synched",0);
	this.instance_12.setTransform(487.55,519.45,1,1,0,0,0,225.2,279.1);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#E05D5B").s().p("AkRgqIALgTQCyCgFkhfIACAVQiJAlhvAAQi6AAhxhog");
	this.shape_53.setTransform(480.2484,781.8083,3.7715,3.7715);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#E05D5B").ss(5,1,1).p("AlHgaQFfBrEwhr");
	this.shape_54.setTransform(473.55,514.25);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FADFCB").s().p("AgYAhQgDgDgDgEIgDgJQgBgEABgHQABgIAHgLQAGgJAJgHQAKgGAHAAIACAAQAGABAGADQAGADADAGQADACABAEIABACQgMAAgJAGQgIAIgGAHQgFALABALQgCAFgHACIgDAAQgEAAgEgDg");
	this.shape_55.setTransform(583.4932,540.6821,3.7715,3.7715);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FADFCB").s().p("AgYAlQgGgEgCgEIgCgGQgCgFABgEIAAgEQACgKAEgJIAJgNQAEgGAIgFIAIgEIACAAIAFgCIACAAQAKACAGAEIABABQAFAEAGAJQgIAAgKAHQgKAHgGAHQgGALgBAKQgBAHABADQgDAEgEACIgCAAIgCABQgFAAgEgDg");
	this.shape_56.setTransform(572.5323,534.4019,3.7715,3.7715);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#FADFCB").s().p("AgQAdQgQgIALgVQAGgOAOgJQAPgLALAIQAIAHgYAgQgIARgKAAQgEAAgDgBg");
	this.shape_57.setTransform(562.5518,528.6749,3.7715,3.7715);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#FADFCB").ss(0.9,1,1).p("AAlhmQgMgFgFAAQgvADgcATQgcAXgcAoQgZAmAIAqIAFANIACACQAPAYAVAIQAXAJAWgNQARgLAGgRQALgTAAgPQABgCAAgCQAAgBABgBIgBAAQADgMAGgDQAMgGAFAPQAGAMAoAEQAlADAbgDQAAghgKgbQgBgHgKgOIgLgWIgPgRQgTgTgcgGg");
	this.shape_58.setTransform(594.9121,545.9962);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#FADFCB").s().p("AA6DCQgUgHgPgZIgCgCIgGgNQgHgpAYgoQAcgoAdgWQAcgSAvgEQAGAAALAGQAcAFATASIAPARIAMAXQAJANACAIQAJAcAAAgQgaAEgmgEQgngEgGgLQgGgPgLAGQgIADgCAMIABAAIgCACIAAADQAAAPgMATQgFARgRALQgNAIgOAAQgJAAgKgEgAg/CiQgPgJgGgRQgJgPgEgTIBwAtQgJAVgYAGIgLABQgRAAgRgNgAisBzQgXgNgIgRQgHgPAAgGQgIgTACgTIB3BMQgJANgRAIIgKABIgGAAQgQAAgRgJgACmB1IgaAGQADgXAXARgAhjA8QAJgrAZghQAVggAlgaQAlgZAgAAIifDJQgGgRAEgZgAj/ARIgGgIQgLgVgCgLIADgoQAIgcAIgKQALgWAVgVQAYgZAcgNQAfgRAYACQAVAEAPALIAJALIgLACIgcAPQgdARgSAZQgXAcgJAZQgTAggGAoIgCANQgGACgGAAQgPAAgMgLgAA+hjIAEAAQAVACAaAPQAXALALAVQAKAKAFAPIACAHgAA+hjgAhHirIATgDIAKAAQAiADAZARIACACQAYATATAigAhHirg");
	this.shape_59.setTransform(580.475,537.0357);

	this.instance_13 = new lib.元件22();
	this.instance_13.setTransform(688.85,626.55,1,1,0,0,0,23.9,33.9);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#FFFFFF").s().p("AgtALQgGAAAAgFQAAgEAFgBIABAAIAWgBQARAAAGgBQAFgBAAADIAAABQAAAFgFABQgHACgQABIgQAAIgGAAgAAUAAQAAgDAEgBIABgBQALgCAKgDQAFgBABAEIAAAAQAAAFgFACQgKACgLACIgCAAQgEAAAAgEg");
	this.shape_60.setTransform(629.8427,558.9854,3.7715,3.7715);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#F3A94D").s().p("AgGBCIgwgbQgEgDgBgEQgBgFADgEIAxhSQAIgKAHAFIAwAbQAEACABAFQAAAEgCAFIgyBSQgCAEgFABIgDABIgEgBg");
	this.shape_61.setTransform(576.572,555.5986,3.7715,3.7715);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#F7C764").s().p("Ag9AaQgmhMgrhBQBxACAzgDQA/gFA6gPIihERQgGglglhKg");
	this.shape_62.setTransform(616.871,593.7895,3.7715,3.7715);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#F7D878").s().p("AhmCuQgHgEgCgIQgCgJAFgHIC4k1QAEgJAIgCQAJgDAHAEQAGAEACAIQABAIgEAIIi3E2QgFAIgIACIgHABQgEAAgEgCg");
	this.shape_63.setTransform(646.4772,597.3724,3.7715,3.7715);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#F3A94D").s().p("AgWAnQgQgKgFgSQgFgRAJgQQAKgQASgEQARgFAQAJQARAKAFASQAFARgKAQQgJAQgSAFQgGABgGAAQgLAAgLgGg");
	this.shape_64.setTransform(643.3541,592.6472,3.7715,3.7715);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#F0884B").s().p("AgWAlQgNgIgDgQQgEgQAJgPQAKgQAQgFQAPgFAOAHQAOAIADARQADAPgJAQQgJAPgQAGQgHACgFAAQgJAAgJgFg");
	this.shape_65.setTransform(568.081,551.061,3.7715,3.7715);

	this.instance_14 = new lib.元件21("synched",0);
	this.instance_14.setTransform(444.25,519.45,1,1,0,0,0,181.9,279.1);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#E05D5B").s().p("AwHihIAnhIQKgJdVDllIAFBPQoFCMmiAAQrBgBmnmKg");
	this.shape_66.setTransform(480.25,781.8008);

	var maskedShapeInstanceList = [this.instance_12,this.shape_53,this.shape_54,this.shape_55,this.shape_56,this.shape_57,this.shape_58,this.shape_59,this.instance_13,this.shape_60,this.shape_61,this.shape_62,this.shape_63,this.shape_64,this.shape_65,this.instance_14,this.shape_66];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_53},{t:this.instance_12}]},595).to({state:[{t:this.shape_66},{t:this.instance_14},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.instance_13},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54}]},49).wait(65));

	// 虎头
	this.instance_15 = new lib.元件26("synched",0);
	this.instance_15.setTransform(519.75,622.35,1,1,0,0,0,521.7,618.4);
	this.instance_15._off = true;

	var maskedShapeInstanceList = [this.instance_15];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(480).to({_off:false},0).wait(1).to({regX:476.5,regY:504,rotation:-0.7894,x:473,y:508.55,startPosition:1},0).wait(1).to({rotation:-1.5788,x:471.45,y:509.25,startPosition:2},0).wait(1).to({rotation:-2.3682,x:469.9,y:509.85,startPosition:3},0).wait(1).to({rotation:-3.1577,x:468.3,y:510.6,startPosition:4},0).wait(1).to({rotation:-3.9471,x:466.8,y:511.3,startPosition:5},0).wait(1).to({rotation:-4.7365,x:465.25,y:512.05,startPosition:6},0).wait(1).to({rotation:-5.5259,x:463.8,y:512.8,startPosition:7},0).wait(1).to({rotation:-6.3153,x:462.25,y:513.6,startPosition:8},0).wait(1).to({rotation:-7.1047,x:460.8,y:514.35,startPosition:9},0).wait(1).to({rotation:-7.8942,x:459.3,y:515.2,startPosition:10},0).wait(1).to({rotation:-8.6836,x:457.85,y:516.05,startPosition:11},0).wait(1).to({rotation:-9.473,x:456.35,y:516.9,startPosition:12},0).wait(1).to({rotation:-10.2624,x:454.9,y:517.8,startPosition:13},0).wait(1).to({rotation:-11.0518,x:453.45,y:518.7,startPosition:14},0).wait(1).to({rotation:-11.8412,x:452.05,y:519.6,startPosition:15},0).wait(1).to({rotation:-12.6307,x:450.65,y:520.55,startPosition:16},0).wait(1).to({rotation:-13.4201,x:449.25,y:521.55,startPosition:17},0).wait(1).to({rotation:-14.2095,x:447.85,y:522.5,startPosition:18},0).wait(1).to({rotation:-14.9989,x:446.5,y:523.55,startPosition:19},0).wait(1).to({startPosition:20},0).wait(1).to({startPosition:21},0).wait(1).to({startPosition:22},0).wait(1).to({startPosition:23},0).wait(1).to({startPosition:24},0).wait(1).to({startPosition:25},0).wait(1).to({startPosition:26},0).wait(1).to({startPosition:27},0).wait(1).to({startPosition:28},0).wait(1).to({startPosition:29},0).wait(1).to({startPosition:30},0).wait(1).to({startPosition:31},0).wait(1).to({startPosition:32},0).wait(1).to({startPosition:33},0).wait(1).to({rotation:-13.749,x:448.7,y:521.95,startPosition:34},0).wait(1).to({rotation:-12.4991,x:450.85,y:520.45,startPosition:35},0).wait(1).to({rotation:-11.2492,x:453.1,y:518.95,startPosition:36},0).wait(1).to({rotation:-9.9993,x:455.4,y:517.5,startPosition:37},0).wait(1).to({rotation:-8.7494,x:457.7,y:516.15,startPosition:38},0).wait(1).to({rotation:-7.4994,x:460.05,y:514.8,startPosition:39},0).wait(1).to({rotation:-6.2495,x:462.35,y:513.55,startPosition:40},0).wait(1).to({rotation:-4.9996,x:464.75,y:512.35,startPosition:41},0).wait(1).to({rotation:-3.7497,x:467.15,y:511.1,startPosition:42},0).wait(1).to({rotation:-2.4998,x:469.65,y:509.95,startPosition:43},0).wait(1).to({rotation:-1.2499,x:472.1,y:508.95,startPosition:44},0).wait(1).to({rotation:0,x:474.55,y:507.95,startPosition:45},0).wait(1).to({startPosition:46},0).wait(1).to({startPosition:47},0).wait(1).to({startPosition:48},0).wait(1).to({startPosition:49},0).wait(1).to({startPosition:50},0).wait(1).to({startPosition:51},0).wait(1).to({startPosition:52},0).wait(1).to({startPosition:53},0).wait(1).to({startPosition:54},0).wait(1).to({startPosition:55},0).wait(1).to({startPosition:56},0).wait(1).to({startPosition:57},0).wait(1).to({startPosition:58},0).wait(1).to({startPosition:59},0).wait(1).to({startPosition:60},0).wait(1).to({startPosition:61},0).wait(1).to({startPosition:62},0).wait(1).to({startPosition:63},0).wait(1).to({startPosition:64},0).wait(1).to({startPosition:65},0).wait(1).to({startPosition:66},0).wait(1).to({startPosition:67},0).wait(1).to({startPosition:68},0).wait(1).to({startPosition:69},0).wait(1).to({startPosition:70},0).wait(1).to({startPosition:71},0).wait(1).to({startPosition:72},0).wait(1).to({startPosition:73},0).wait(1).to({startPosition:74},0).wait(1).to({startPosition:75},0).wait(1).to({startPosition:76},0).wait(1).to({startPosition:77},0).wait(1).to({startPosition:78},0).wait(1).to({startPosition:79},0).wait(1).to({startPosition:80},0).wait(1).to({startPosition:81},0).wait(1).to({startPosition:82},0).wait(1).to({startPosition:83},0).wait(1).to({startPosition:84},0).wait(1).to({startPosition:85},0).wait(1).to({startPosition:86},0).wait(1).to({startPosition:87},0).wait(1).to({startPosition:88},0).wait(1).to({startPosition:89},0).wait(1).to({startPosition:90},0).wait(1).to({startPosition:91},0).wait(1).to({startPosition:92},0).wait(1).to({startPosition:93},0).wait(1).to({startPosition:94},0).wait(1).to({startPosition:95},0).wait(1).to({startPosition:96},0).wait(1).to({startPosition:97},0).wait(1).to({startPosition:98},0).wait(1).to({startPosition:99},0).wait(1).to({startPosition:100},0).wait(1).to({startPosition:101},0).wait(1).to({startPosition:102},0).wait(1).to({startPosition:103},0).wait(1).to({startPosition:104},0).wait(1).to({startPosition:105},0).wait(1).to({startPosition:106},0).wait(1).to({startPosition:107},0).wait(1).to({startPosition:108},0).wait(1).to({startPosition:109},0).wait(1).to({startPosition:110},0).wait(1).to({startPosition:111},0).wait(1).to({startPosition:112},0).wait(1).to({startPosition:113},0).wait(1).to({startPosition:114},0).to({_off:true},1).wait(114));

	// 老虎
	this.instance_16 = new lib.老虎1();
	this.instance_16.setTransform(164,365);
	this.instance_16._off = true;

	var maskedShapeInstanceList = [this.instance_16];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(480).to({_off:false},0).to({_off:true},115).wait(114));

	// 老虎bg
	this.instance_17 = new lib.老虎bg();
	this.instance_17.setTransform(114,120,1.0285,1);
	this.instance_17._off = true;

	var maskedShapeInstanceList = [this.instance_17];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(480).to({_off:false},0).to({_off:true},115).wait(114));

	// 狮子嘴巴
	this.instance_18 = new lib.狮子嘴巴_1("synched",0);
	this.instance_18.setTransform(460,508.5,1,1,0,0,0,14,10.5);

	this.instance_19 = new lib.狮子眼睛_1();
	this.instance_19.setTransform(485.4,483,1,1,0,0,0,15,15);

	this.instance_20 = new lib.狮子眼睛_1();
	this.instance_20.setTransform(434.4,483,1,1,0,0,0,15,15);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.bf(img.狮子嘴巴, null, new cjs.Matrix2D(1,0,0,1,-14,-10.5)).s().p("AiLBpIAAjRIEXAAIAADRg");
	this.shape_67.setTransform(460,512.5);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.bf(img.狮子眼睛, null, new cjs.Matrix2D(1,0,0,1,-15,-15)).s().p("AiVCWIAAkrIErAAIAAErg");
	this.shape_68.setTransform(485.4,483);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.bf(img.狮子眼睛, null, new cjs.Matrix2D(1,0,0,1,-15,-15)).s().p("AiVCWIAAkrIErAAIAAErg");
	this.shape_69.setTransform(434.4,483);

	var maskedShapeInstanceList = [this.instance_18,this.instance_19,this.instance_20,this.shape_67,this.shape_68,this.shape_69];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_20},{t:this.instance_19},{t:this.instance_18}]},378).to({state:[{t:this.shape_69},{t:this.shape_68},{t:this.shape_67}]},68).to({state:[]},34).wait(229));

	// 狮子
	this.instance_21 = new lib.狮子();
	this.instance_21.setTransform(325,354);
	this.instance_21._off = true;

	var maskedShapeInstanceList = [this.instance_21];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(378).to({_off:false},0).to({_off:true},102).wait(229));

	// 狮子bg
	this.instance_22 = new lib.狮子bg();
	this.instance_22.setTransform(65,207);
	this.instance_22._off = true;

	var maskedShapeInstanceList = [this.instance_22];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(378).to({_off:false},0).to({_off:true},102).wait(229));

	// 下雨
	this.instance_23 = new lib.元件7();
	this.instance_23.setTransform(532.65,-400.9,1,1,-14.9983,0,0,0,28.4);

	this.instance_24 = new lib.元件7();
	this.instance_24.setTransform(216.35,-372.5,1,1,-14.9983,0,0,0,28.4);

	this.instance_25 = new lib.元件7();
	this.instance_25.setTransform(-91.95,-163.4,1,1,-14.9983,0,0,0,28.4);

	this.instance_26 = new lib.元件7();
	this.instance_26.setTransform(-77.25,-251.05,1,1,-14.9983,0,0,0,28.4);

	this.instance_27 = new lib.元件7();
	this.instance_27.setTransform(28.4,-317.65,1,1,-14.9983,0,0,0,28.4);

	this.instance_28 = new lib.元件7();
	this.instance_28.setTransform(649.6,-400.9,1,1,-14.9983,0,0,0,28.4);

	this.instance_29 = new lib.元件7();
	this.instance_29.setTransform(438.2,-372.5,1,1,-14.9983,0,0,0,28.4);

	this.instance_30 = new lib.元件7();
	this.instance_30.setTransform(476.4,-455.75,1,1,-14.9983,0,0,0,28.4);

	this.instance_31 = new lib.元件7();
	this.instance_31.setTransform(314.5,-414.35,1,1,-14.9983,0,0,0,28.4);

	this.instance_32 = new lib.元件7();
	this.instance_32.setTransform(216.35,-469.2,1,1,-14.9983,0,0,0,28.4);

	this.instance_33 = new lib.元件7();
	this.instance_33.setTransform(9.4,-469.2,1,1,-14.9983,0,0,0,28.4);

	this.instance_34 = new lib.元件7();
	this.instance_34.setTransform(-91.95,-372.5,1,1,-14.9983,0,0,0,28.4);

	this.instance_35 = new lib.元件7();
	this.instance_35.setTransform(-91.95,-455.75,1,1,-14.9983,0,0,0,28.4);

	this.instance_36 = new lib.元件7();
	this.instance_36.setTransform(653,-524.05,1,1,-14.9983,0,0,0,28.4);

	this.instance_37 = new lib.元件7();
	this.instance_37.setTransform(336.7,-495.65,1,1,-14.9983,0,0,0,28.4);

	this.instance_38 = new lib.元件7();
	this.instance_38.setTransform(28.4,-286.55,1,1,-14.9983,0,0,0,28.4);

	this.instance_39 = new lib.元件7();
	this.instance_39.setTransform(43.1,-374.2,1,1,-14.9983,0,0,0,28.4);

	this.instance_40 = new lib.元件7();
	this.instance_40.setTransform(148.75,-440.8,1,1,-14.9983,0,0,0,28.4);

	this.instance_41 = new lib.元件7();
	this.instance_41.setTransform(769.95,-524.05,1,1,-14.9983,0,0,0,28.4);

	this.instance_42 = new lib.元件7();
	this.instance_42.setTransform(558.55,-495.65,1,1,-14.9983,0,0,0,28.4);

	this.instance_43 = new lib.元件7();
	this.instance_43.setTransform(596.75,-578.9,1,1,-14.9983,0,0,0,28.4);

	this.instance_44 = new lib.元件7();
	this.instance_44.setTransform(434.85,-537.5,1,1,-14.9983,0,0,0,28.4);

	this.instance_45 = new lib.元件7();
	this.instance_45.setTransform(336.7,-592.35,1,1,-14.9983,0,0,0,28.4);

	this.instance_46 = new lib.元件7();
	this.instance_46.setTransform(198.35,-601.3,1,1,-14.9983,0,0,0,28.4);

	this.instance_47 = new lib.元件7();
	this.instance_47.setTransform(28.4,-495.65,1,1,-14.9983,0,0,0,28.4);

	this.instance_48 = new lib.元件7();
	this.instance_48.setTransform(28.4,-578.9,1,1,-14.9983,0,0,0,28.4);

	this.instance_49 = new lib.元件7();
	this.instance_49.setTransform(491.1,-601.3,1,1,-14.9983,0,0,0,28.4);

	this.instance_50 = new lib.元件7();
	this.instance_50.setTransform(141.35,-699.15,1,1,-14.9983,0,0,0,28.4);

	this.instance_51 = new lib.元件7();
	this.instance_51.setTransform(-166.95,-490.05,1,1,-14.9983,0,0,0,28.4);

	this.instance_52 = new lib.元件7();
	this.instance_52.setTransform(-152.25,-577.7,1,1,-14.9983,0,0,0,28.4);

	this.instance_53 = new lib.元件7();
	this.instance_53.setTransform(-46.6,-644.3,1,1,-14.9983,0,0,0,28.4);

	this.instance_54 = new lib.元件7();
	this.instance_54.setTransform(574.6,-727.55,1,1,-14.9983,0,0,0,28.4);

	this.instance_55 = new lib.元件7();
	this.instance_55.setTransform(363.2,-699.15,1,1,-14.9983,0,0,0,28.4);

	this.instance_56 = new lib.元件7();
	this.instance_56.setTransform(401.4,-782.4,1,1,-14.9983,0,0,0,28.4);

	this.instance_57 = new lib.元件7();
	this.instance_57.setTransform(239.5,-741,1,1,-14.9983,0,0,0,28.4);

	this.instance_58 = new lib.元件7();
	this.instance_58.setTransform(141.35,-795.85,1,1,-14.9983,0,0,0,28.4);

	this.instance_59 = new lib.元件7();
	this.instance_59.setTransform(-65.6,-795.85,1,1,-14.9983,0,0,0,28.4);

	this.instance_60 = new lib.元件7();
	this.instance_60.setTransform(-166.95,-699.15,1,1,-14.9983,0,0,0,28.4);

	this.instance_61 = new lib.元件7();
	this.instance_61.setTransform(-166.95,-782.4,1,1,-14.9983,0,0,0,28.4);

	this.instance_62 = new lib.元件7();
	this.instance_62.setTransform(517.95,-893.65,1,1,-14.9983,0,0,0,28.4);

	this.instance_63 = new lib.元件7();
	this.instance_63.setTransform(201.65,-865.25,1,1,-14.9983,0,0,0,28.4);

	this.instance_64 = new lib.元件7();
	this.instance_64.setTransform(-106.65,-656.15,1,1,-14.9983,0,0,0,28.4);

	this.instance_65 = new lib.元件7();
	this.instance_65.setTransform(-91.95,-743.8,1,1,-14.9983,0,0,0,28.4);

	this.instance_66 = new lib.元件7();
	this.instance_66.setTransform(13.7,-810.4,1,1,-14.9983,0,0,0,28.4);

	this.instance_67 = new lib.元件7();
	this.instance_67.setTransform(634.9,-893.65,1,1,-14.9983,0,0,0,28.4);

	this.instance_68 = new lib.元件7();
	this.instance_68.setTransform(423.5,-865.25,1,1,-14.9983,0,0,0,28.4);

	this.instance_69 = new lib.元件7();
	this.instance_69.setTransform(461.7,-948.5,1,1,-14.9983,0,0,0,28.4);

	this.instance_70 = new lib.元件7();
	this.instance_70.setTransform(299.8,-907.1,1,1,-14.9983,0,0,0,28.4);

	this.instance_71 = new lib.元件7();
	this.instance_71.setTransform(201.65,-961.95,1,1,-14.9983,0,0,0,28.4);

	this.instance_72 = new lib.元件7();
	this.instance_72.setTransform(-5.3,-961.95,1,1,-14.9983,0,0,0,28.4);

	this.instance_73 = new lib.元件7();
	this.instance_73.setTransform(-106.65,-865.25,1,1,-14.9983,0,0,0,28.4);

	this.instance_74 = new lib.元件7();
	this.instance_74.setTransform(-106.65,-948.5,1,1,-14.9983,0,0,0,28.4);

	this.instance_75 = new lib.元件7();
	this.instance_75.setTransform(442.95,-1088.2,1,1,-14.9983,0,0,0,28.4);

	this.instance_76 = new lib.元件7();
	this.instance_76.setTransform(126.65,-1059.8,1,1,-14.9983,0,0,0,28.4);

	this.instance_77 = new lib.元件7();
	this.instance_77.setTransform(-181.65,-850.7,1,1,-14.9983,0,0,0,28.4);

	this.instance_78 = new lib.元件7();
	this.instance_78.setTransform(-166.95,-938.35,1,1,-14.9983,0,0,0,28.4);

	this.instance_79 = new lib.元件7();
	this.instance_79.setTransform(-61.3,-1004.95,1,1,-14.9983,0,0,0,28.4);

	this.instance_80 = new lib.元件7();
	this.instance_80.setTransform(559.9,-1088.2,1,1,-14.9983,0,0,0,28.4);

	this.instance_81 = new lib.元件7();
	this.instance_81.setTransform(348.5,-1059.8,1,1,-14.9983,0,0,0,28.4);

	this.instance_82 = new lib.元件7();
	this.instance_82.setTransform(386.7,-1143.05,1,1,-14.9983,0,0,0,28.4);

	this.instance_83 = new lib.元件7();
	this.instance_83.setTransform(224.8,-1101.65,1,1,-14.9983,0,0,0,28.4);

	this.instance_84 = new lib.元件7();
	this.instance_84.setTransform(126.65,-1156.5,1,1,-14.9983,0,0,0,28.4);

	this.instance_85 = new lib.元件7();
	this.instance_85.setTransform(-80.3,-1156.5,1,1,-14.9983,0,0,0,28.4);

	this.instance_86 = new lib.元件7();
	this.instance_86.setTransform(-181.65,-1059.8,1,1,-14.9983,0,0,0,28.4);

	this.instance_87 = new lib.元件7();
	this.instance_87.setTransform(-181.65,-1143.05,1,1,-14.9983,0,0,0,28.4);

	this.instance_88 = new lib.元件7();
	this.instance_88.setTransform(784.65,550.35,1,1,-14.9983,0,0,0,28.4);

	this.instance_89 = new lib.元件7();
	this.instance_89.setTransform(468.35,578.75,1,1,-14.9983,0,0,0,28.4);

	this.instance_90 = new lib.元件7();
	this.instance_90.setTransform(160.05,787.85,1,1,-14.9983,0,0,0,28.4);

	this.instance_91 = new lib.元件7();
	this.instance_91.setTransform(174.75,700.2,1,1,-14.9983,0,0,0,28.4);

	this.instance_92 = new lib.元件7();
	this.instance_92.setTransform(280.4,633.6,1,1,-14.9983,0,0,0,28.4);

	this.instance_93 = new lib.元件7();
	this.instance_93.setTransform(901.6,550.35,1,1,-14.9983,0,0,0,28.4);

	this.instance_94 = new lib.元件7();
	this.instance_94.setTransform(690.2,578.75,1,1,-14.9983,0,0,0,28.4);

	this.instance_95 = new lib.元件7();
	this.instance_95.setTransform(728.4,495.5,1,1,-14.9983,0,0,0,28.4);

	this.instance_96 = new lib.元件7();
	this.instance_96.setTransform(566.5,536.9,1,1,-14.9983,0,0,0,28.4);

	this.instance_97 = new lib.元件7();
	this.instance_97.setTransform(468.35,482.05,1,1,-14.9983,0,0,0,28.4);

	this.instance_98 = new lib.元件7();
	this.instance_98.setTransform(261.4,482.05,1,1,-14.9983,0,0,0,28.4);

	this.instance_99 = new lib.元件7();
	this.instance_99.setTransform(160.05,578.75,1,1,-14.9983,0,0,0,28.4);

	this.instance_100 = new lib.元件7();
	this.instance_100.setTransform(160.05,495.5,1,1,-14.9983,0,0,0,28.4);

	this.instance_101 = new lib.元件7();
	this.instance_101.setTransform(905,427.2,1,1,-14.9983,0,0,0,28.4);

	this.instance_102 = new lib.元件7();
	this.instance_102.setTransform(588.7,455.6,1,1,-14.9983,0,0,0,28.4);

	this.instance_103 = new lib.元件7();
	this.instance_103.setTransform(280.4,664.7,1,1,-14.9983,0,0,0,28.4);

	this.instance_104 = new lib.元件7();
	this.instance_104.setTransform(295.1,577.05,1,1,-14.9983,0,0,0,28.4);

	this.instance_105 = new lib.元件7();
	this.instance_105.setTransform(400.75,510.45,1,1,-14.9983,0,0,0,28.4);

	this.instance_106 = new lib.元件7();
	this.instance_106.setTransform(1021.95,427.2,1,1,-14.9983,0,0,0,28.4);

	this.instance_107 = new lib.元件7();
	this.instance_107.setTransform(810.55,455.6,1,1,-14.9983,0,0,0,28.4);

	this.instance_108 = new lib.元件7();
	this.instance_108.setTransform(848.75,372.35,1,1,-14.9983,0,0,0,28.4);

	this.instance_109 = new lib.元件7();
	this.instance_109.setTransform(686.85,413.75,1,1,-14.9983,0,0,0,28.4);

	this.instance_110 = new lib.元件7();
	this.instance_110.setTransform(588.7,358.9,1,1,-14.9983,0,0,0,28.4);

	this.instance_111 = new lib.元件7();
	this.instance_111.setTransform(450.35,349.95,1,1,-14.9983,0,0,0,28.4);

	this.instance_112 = new lib.元件7();
	this.instance_112.setTransform(280.4,455.6,1,1,-14.9983,0,0,0,28.4);

	this.instance_113 = new lib.元件7();
	this.instance_113.setTransform(280.4,372.35,1,1,-14.9983,0,0,0,28.4);

	this.instance_114 = new lib.元件7();
	this.instance_114.setTransform(743.1,349.95,1,1,-14.9983,0,0,0,28.4);

	this.instance_115 = new lib.元件7();
	this.instance_115.setTransform(393.35,252.1,1,1,-14.9983,0,0,0,28.4);

	this.instance_116 = new lib.元件7();
	this.instance_116.setTransform(85.05,461.2,1,1,-14.9983,0,0,0,28.4);

	this.instance_117 = new lib.元件7();
	this.instance_117.setTransform(99.75,373.55,1,1,-14.9983,0,0,0,28.4);

	this.instance_118 = new lib.元件7();
	this.instance_118.setTransform(205.4,306.95,1,1,-14.9983,0,0,0,28.4);

	this.instance_119 = new lib.元件7();
	this.instance_119.setTransform(826.6,223.7,1,1,-14.9983,0,0,0,28.4);

	this.instance_120 = new lib.元件7();
	this.instance_120.setTransform(615.2,252.1,1,1,-14.9983,0,0,0,28.4);

	this.instance_121 = new lib.元件7();
	this.instance_121.setTransform(653.4,168.85,1,1,-14.9983,0,0,0,28.4);

	this.instance_122 = new lib.元件7();
	this.instance_122.setTransform(491.5,210.25,1,1,-14.9983,0,0,0,28.4);

	this.instance_123 = new lib.元件7();
	this.instance_123.setTransform(393.35,155.4,1,1,-14.9983,0,0,0,28.4);

	this.instance_124 = new lib.元件7();
	this.instance_124.setTransform(186.4,155.4,1,1,-14.9983,0,0,0,28.4);

	this.instance_125 = new lib.元件7();
	this.instance_125.setTransform(85.05,252.1,1,1,-14.9983,0,0,0,28.4);

	this.instance_126 = new lib.元件7();
	this.instance_126.setTransform(85.05,168.85,1,1,-14.9983,0,0,0,28.4);

	this.instance_127 = new lib.元件7();
	this.instance_127.setTransform(769.95,57.6,1,1,-14.9983,0,0,0,28.4);

	this.instance_128 = new lib.元件7();
	this.instance_128.setTransform(453.65,86,1,1,-14.9983,0,0,0,28.4);

	this.instance_129 = new lib.元件7();
	this.instance_129.setTransform(145.35,295.1,1,1,-14.9983,0,0,0,28.4);

	this.instance_130 = new lib.元件7();
	this.instance_130.setTransform(160.05,207.45,1,1,-14.9983,0,0,0,28.4);

	this.instance_131 = new lib.元件7();
	this.instance_131.setTransform(265.7,140.85,1,1,-14.9983,0,0,0,28.4);

	this.instance_132 = new lib.元件7();
	this.instance_132.setTransform(886.9,57.6,1,1,-14.9983,0,0,0,28.4);

	this.instance_133 = new lib.元件7();
	this.instance_133.setTransform(675.5,86,1,1,-14.9983,0,0,0,28.4);

	this.instance_134 = new lib.元件7();
	this.instance_134.setTransform(713.7,2.75,1,1,-14.9983,0,0,0,28.4);

	this.instance_135 = new lib.元件7();
	this.instance_135.setTransform(551.8,44.15,1,1,-14.9983,0,0,0,28.4);

	this.instance_136 = new lib.元件7();
	this.instance_136.setTransform(453.65,-10.7,1,1,-14.9983,0,0,0,28.4);

	this.instance_137 = new lib.元件7();
	this.instance_137.setTransform(246.7,-10.7,1,1,-14.9983,0,0,0,28.4);

	this.instance_138 = new lib.元件7();
	this.instance_138.setTransform(145.35,86,1,1,-14.9983,0,0,0,28.4);

	this.instance_139 = new lib.元件7();
	this.instance_139.setTransform(145.35,2.75,1,1,-14.9983,0,0,0,28.4);

	this.instance_140 = new lib.元件7();
	this.instance_140.setTransform(694.95,-136.95,1,1,-14.9983,0,0,0,28.4);

	this.instance_141 = new lib.元件7();
	this.instance_141.setTransform(378.65,-108.55,1,1,-14.9983,0,0,0,28.4);

	this.instance_142 = new lib.元件7();
	this.instance_142.setTransform(70.35,100.55,1,1,-14.9983,0,0,0,28.4);

	this.instance_143 = new lib.元件7();
	this.instance_143.setTransform(85.05,12.9,1,1,-14.9983,0,0,0,28.4);

	this.instance_144 = new lib.元件7();
	this.instance_144.setTransform(190.7,-53.7,1,1,-14.9983,0,0,0,28.4);

	this.instance_145 = new lib.元件7();
	this.instance_145.setTransform(811.9,-136.95,1,1,-14.9983,0,0,0,28.4);

	this.instance_146 = new lib.元件7();
	this.instance_146.setTransform(600.5,-108.55,1,1,-14.9983,0,0,0,28.4);

	this.instance_147 = new lib.元件7();
	this.instance_147.setTransform(638.7,-191.8,1,1,-14.9983,0,0,0,28.4);

	this.instance_148 = new lib.元件7();
	this.instance_148.setTransform(476.8,-150.4,1,1,-14.9983,0,0,0,28.4);

	this.instance_149 = new lib.元件7();
	this.instance_149.setTransform(378.65,-205.25,1,1,-14.9983,0,0,0,28.4);

	this.instance_150 = new lib.元件7();
	this.instance_150.setTransform(171.7,-205.25,1,1,-14.9983,0,0,0,28.4);

	this.instance_151 = new lib.元件7();
	this.instance_151.setTransform(70.35,-108.55,1,1,-14.9983,0,0,0,28.4);

	this.instance_152 = new lib.元件7();
	this.instance_152.setTransform(70.35,-191.8,1,1,-14.9983,0,0,0,28.4);

	var maskedShapeInstanceList = [this.instance_23,this.instance_24,this.instance_25,this.instance_26,this.instance_27,this.instance_28,this.instance_29,this.instance_30,this.instance_31,this.instance_32,this.instance_33,this.instance_34,this.instance_35,this.instance_36,this.instance_37,this.instance_38,this.instance_39,this.instance_40,this.instance_41,this.instance_42,this.instance_43,this.instance_44,this.instance_45,this.instance_46,this.instance_47,this.instance_48,this.instance_49,this.instance_50,this.instance_51,this.instance_52,this.instance_53,this.instance_54,this.instance_55,this.instance_56,this.instance_57,this.instance_58,this.instance_59,this.instance_60,this.instance_61,this.instance_62,this.instance_63,this.instance_64,this.instance_65,this.instance_66,this.instance_67,this.instance_68,this.instance_69,this.instance_70,this.instance_71,this.instance_72,this.instance_73,this.instance_74,this.instance_75,this.instance_76,this.instance_77,this.instance_78,this.instance_79,this.instance_80,this.instance_81,this.instance_82,this.instance_83,this.instance_84,this.instance_85,this.instance_86,this.instance_87,this.instance_88,this.instance_89,this.instance_90,this.instance_91,this.instance_92,this.instance_93,this.instance_94,this.instance_95,this.instance_96,this.instance_97,this.instance_98,this.instance_99,this.instance_100,this.instance_101,this.instance_102,this.instance_103,this.instance_104,this.instance_105,this.instance_106,this.instance_107,this.instance_108,this.instance_109,this.instance_110,this.instance_111,this.instance_112,this.instance_113,this.instance_114,this.instance_115,this.instance_116,this.instance_117,this.instance_118,this.instance_119,this.instance_120,this.instance_121,this.instance_122,this.instance_123,this.instance_124,this.instance_125,this.instance_126,this.instance_127,this.instance_128,this.instance_129,this.instance_130,this.instance_131,this.instance_132,this.instance_133,this.instance_134,this.instance_135,this.instance_136,this.instance_137,this.instance_138,this.instance_139,this.instance_140,this.instance_141,this.instance_142,this.instance_143,this.instance_144,this.instance_145,this.instance_146,this.instance_147,this.instance_148,this.instance_149,this.instance_150,this.instance_151,this.instance_152];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_152},{t:this.instance_151},{t:this.instance_150},{t:this.instance_149},{t:this.instance_148},{t:this.instance_147},{t:this.instance_146},{t:this.instance_145},{t:this.instance_144},{t:this.instance_143},{t:this.instance_142},{t:this.instance_141},{t:this.instance_140},{t:this.instance_139},{t:this.instance_138},{t:this.instance_137},{t:this.instance_136},{t:this.instance_135},{t:this.instance_134},{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_123},{t:this.instance_122},{t:this.instance_121},{t:this.instance_120},{t:this.instance_119},{t:this.instance_118},{t:this.instance_117},{t:this.instance_116},{t:this.instance_115},{t:this.instance_114},{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101},{t:this.instance_100},{t:this.instance_99},{t:this.instance_98},{t:this.instance_97},{t:this.instance_96},{t:this.instance_95},{t:this.instance_94},{t:this.instance_93},{t:this.instance_92},{t:this.instance_91},{t:this.instance_90},{t:this.instance_89},{t:this.instance_88},{t:this.instance_87},{t:this.instance_86},{t:this.instance_85},{t:this.instance_84},{t:this.instance_83},{t:this.instance_82},{t:this.instance_81},{t:this.instance_80},{t:this.instance_79},{t:this.instance_78},{t:this.instance_77},{t:this.instance_76},{t:this.instance_75},{t:this.instance_74},{t:this.instance_73},{t:this.instance_72},{t:this.instance_71},{t:this.instance_70},{t:this.instance_69},{t:this.instance_68},{t:this.instance_67},{t:this.instance_66},{t:this.instance_65},{t:this.instance_64},{t:this.instance_63},{t:this.instance_62},{t:this.instance_61},{t:this.instance_60},{t:this.instance_59},{t:this.instance_58},{t:this.instance_57},{t:this.instance_56},{t:this.instance_55},{t:this.instance_54},{t:this.instance_53},{t:this.instance_52},{t:this.instance_51},{t:this.instance_50},{t:this.instance_49},{t:this.instance_48},{t:this.instance_47},{t:this.instance_46},{t:this.instance_45},{t:this.instance_44},{t:this.instance_43},{t:this.instance_42},{t:this.instance_41},{t:this.instance_40},{t:this.instance_39},{t:this.instance_38},{t:this.instance_37},{t:this.instance_36},{t:this.instance_35},{t:this.instance_34},{t:this.instance_33},{t:this.instance_32},{t:this.instance_31},{t:this.instance_30},{t:this.instance_29},{t:this.instance_28},{t:this.instance_27},{t:this.instance_26},{t:this.instance_25},{t:this.instance_24},{t:this.instance_23}]},135).to({state:[]},125).wait(449));

	// 雨伞
	this.instance_153 = new lib.元件6();
	this.instance_153.setTransform(587.2,753.6,1,1,0,0,0,210.6,325.4);
	this.instance_153._off = true;

	var maskedShapeInstanceList = [this.instance_153];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_153).wait(134).to({_off:false},0).wait(1).to({regX:183.6,regY:161.5,rotation:-0.4786,x:558.8,y:589.9},0).wait(1).to({rotation:-0.9571,x:557.4,y:590.2},0).wait(1).to({rotation:-1.4357,x:556.1,y:590.4},0).wait(1).to({rotation:-1.9142,x:554.7,y:590.65},0).wait(1).to({rotation:-2.3928,x:553.35,y:590.95},0).wait(1).to({rotation:-2.8713,x:552,y:591.25},0).wait(1).to({rotation:-3.3499,x:550.65,y:591.5},0).wait(1).to({rotation:-3.8285,x:549.3,y:591.85},0).wait(1).to({rotation:-4.307,x:548,y:592.15},0).wait(1).to({rotation:-4.7856,x:546.55,y:592.5},0).wait(1).to({rotation:-5.2641,x:545.2,y:592.8},0).wait(1).to({rotation:-5.7427,x:543.9,y:593.25},0).wait(1).to({rotation:-6.2212,x:542.55,y:593.55},0).wait(1).to({rotation:-6.6998,x:541.25,y:593.95},0).wait(1).to({rotation:-7.1783,x:539.9,y:594.35},0).wait(1).to({rotation:-7.6569,x:538.55,y:594.75},0).wait(1).to({rotation:-8.1355,x:537.25,y:595.1},0).wait(1).to({rotation:-8.614,x:535.95,y:595.6},0).wait(1).to({rotation:-9.0926,x:534.6,y:596},0).wait(1).to({rotation:-9.5711,x:533.3,y:596.4},0).wait(1).to({rotation:-10.0497,x:532,y:596.85},0).wait(1).to({rotation:-10.5282,x:530.65,y:597.35},0).wait(1).to({rotation:-11.0068,x:529.35,y:597.85},0).wait(1).to({rotation:-10.895,x:529.65,y:597.75},0).wait(1).to({rotation:-10.7831,x:529.95,y:597.6},0).wait(1).to({rotation:-10.6713,x:530.25,y:597.5},0).wait(1).to({rotation:-10.5595,x:530.6,y:597.35},0).wait(1).to({rotation:-10.4477,x:530.9,y:597.25},0).wait(1).to({rotation:-10.3358,x:531.2,y:597.2},0).wait(1).to({rotation:-10.224,x:531.5,y:597.05},0).wait(1).to({rotation:-10.1122,x:531.8,y:596.95},0).wait(1).to({rotation:-10.0004,x:532.1,y:596.85},0).wait(1).to({rotation:-9.8885,x:532.4,y:596.7},0).wait(1).to({rotation:-9.7767,x:532.75,y:596.6},0).wait(1).to({rotation:-9.6649,x:533.05,y:596.55},0).wait(1).to({rotation:-9.553,x:533.35,y:596.45},0).wait(1).to({rotation:-9.4412,x:533.65,y:596.3},0).wait(1).to({rotation:-9.3294,x:533.95,y:596.2},0).wait(1).to({rotation:-9.2176,x:534.25,y:596.1},0).wait(1).to({rotation:-9.1057,x:534.6,y:596},0).wait(1).to({rotation:-8.9939,x:534.9,y:595.9},0).wait(1).to({rotation:-8.8821,x:535.2,y:595.8},0).wait(1).to({rotation:-8.7703,x:535.45,y:595.7},0).wait(1).to({rotation:-8.6584,x:535.8,y:595.6},0).wait(1).to({rotation:-8.5466,x:536.1,y:595.5},0).wait(1).to({rotation:-8.4348,x:536.4,y:595.4},0).wait(1).to({rotation:-8.3229,x:536.75,y:595.3},0).wait(1).to({rotation:-8.2111,x:537,y:595.25},0).wait(1).to({rotation:-8.0993,x:537.35,y:595.15},0).wait(1).to({rotation:-7.9875,x:537.65,y:595.05},0).wait(1).to({rotation:-7.8756,x:537.95,y:594.9},0).wait(1).to({rotation:-7.7638,x:538.25,y:594.8},0).wait(1).to({rotation:-7.652,x:538.55,y:594.7},0).wait(1).to({rotation:-7.5401,x:538.9,y:594.6},0).wait(1).to({rotation:-7.4283,x:539.2,y:594.55},0).wait(1).to({rotation:-7.3165,x:539.5,y:594.45},0).wait(1).to({rotation:-7.2047,x:539.85,y:594.3},0).wait(1).to({rotation:-7.0928,x:540.15,y:594.25},0).wait(1).to({rotation:-6.981,x:540.5,y:594.2},0).wait(1).to({rotation:-6.8692,x:540.75,y:594.1},0).wait(1).to({rotation:-6.7574,x:541.05,y:594},0).wait(1).to({rotation:-6.6455,x:541.4,y:593.9},0).wait(1).to({rotation:-6.5337,x:541.7,y:593.8},0).wait(1).to({rotation:-6.4219,x:542,y:593.7},0).wait(1).to({rotation:-6.31,x:542.35,y:593.6},0).wait(1).to({rotation:-6.1982,x:542.6,y:593.55},0).wait(1).to({rotation:-6.0864,x:542.9,y:593.5},0).wait(1).to({rotation:-5.9746,x:543.25,y:593.35},0).wait(1).to({rotation:-5.8627,x:543.6,y:593.3},0).wait(1).to({rotation:-5.7509,x:543.95,y:593.2},0).wait(1).to({rotation:-5.6391,x:544.15,y:593.1},0).wait(1).to({rotation:-5.5273,x:544.5,y:593},0).wait(1).to({rotation:-5.4154,x:544.85,y:592.95},0).wait(1).to({rotation:-5.3036,x:545.15,y:592.9},0).wait(1).to({rotation:-5.1918,x:545.45,y:592.8},0).wait(1).to({rotation:-5.0799,x:545.8,y:592.7},0).wait(1).to({rotation:-4.9681,x:546.1,y:592.65},0).wait(1).to({rotation:-4.8563,x:546.4,y:592.5},0).wait(1).to({rotation:-4.7445,x:546.7,y:592.45},0).wait(1).to({rotation:-4.6326,x:547.05,y:592.35},0).wait(1).to({rotation:-4.5208,x:547.4},0).wait(1).to({rotation:-4.409,x:547.65,y:592.2},0).wait(1).to({rotation:-4.2972,x:548,y:592.15},0).wait(1).to({rotation:-4.1853,x:548.3,y:592.05},0).wait(1).to({rotation:-4.0735,x:548.6,y:592},0).wait(1).to({rotation:-3.9617,x:548.9,y:591.9},0).wait(1).to({rotation:-3.8498,x:549.25,y:591.85},0).wait(1).to({rotation:-3.738,x:549.55,y:591.8},0).wait(1).to({rotation:-3.6262,x:549.85,y:591.7},0).wait(1).to({rotation:-3.5144,x:550.15,y:591.65},0).wait(1).to({rotation:-3.4025,x:550.55,y:591.55},0).wait(1).to({rotation:-3.2907,x:550.8,y:591.5},0).wait(1).to({rotation:-3.1789,x:551.1,y:591.4},0).wait(1).to({rotation:-3.067,x:551.45,y:591.35},0).wait(1).to({rotation:-2.9552,x:551.75,y:591.3},0).wait(1).to({rotation:-2.8434,x:552.05,y:591.2},0).wait(1).to({rotation:-2.7316,x:552.4,y:591.15},0).wait(1).to({rotation:-2.6197,x:552.7,y:591.1},0).wait(1).to({rotation:-2.5079,x:553,y:591},0).wait(1).to({rotation:-2.3961,x:553.35,y:590.95},0).wait(1).to({rotation:-2.2843,x:553.65,y:590.9},0).wait(1).to({rotation:-2.1724,x:553.95,y:590.85},0).wait(1).to({rotation:-2.0606,x:554.3,y:590.75},0).wait(1).to({rotation:-1.9488,x:554.65,y:590.65},0).wait(1).to({rotation:-1.8369,x:554.95,y:590.6},0).wait(1).to({rotation:-1.7251,x:555.2},0).wait(1).to({rotation:-1.6133,x:555.6,y:590.55},0).wait(1).to({rotation:-1.5015,x:555.9,y:590.45},0).wait(1).to({rotation:-1.3896,x:556.2,y:590.4},0).wait(1).to({rotation:-1.2778,x:556.5,y:590.3},0).wait(1).to({rotation:-1.166,x:556.85,y:590.25},0).wait(1).to({rotation:-1.0542,x:557.1,y:590.15},0).wait(1).to({rotation:-0.9423,x:557.45,y:590.2},0).wait(1).to({rotation:-0.8305,x:557.85,y:590.1},0).wait(1).to({rotation:-0.7187,x:558.15,y:590.05},0).wait(1).to({rotation:-0.6068,x:558.45,y:589.95},0).wait(1).to({rotation:-0.495,x:558.75,y:589.9},0).wait(1).to({rotation:-0.3832,x:559.1,y:589.85},0).wait(1).to({rotation:-0.2714,x:559.4},0).wait(1).to({rotation:-0.1595,x:559.7,y:589.75},0).wait(1).to({rotation:-0.0477,x:560.05,y:589.7},0).wait(1).to({rotation:0.0641,x:560.35,y:589.65},0).wait(1).to({rotation:0.1759,x:560.7,y:589.6},0).wait(1).to({rotation:0.2878,x:561,y:589.5},0).wait(1).to({rotation:0.3996,x:561.3},0).wait(1).to({rotation:0.5114,x:561.65,y:589.45},0).wait(117).to({_off:true},1).wait(331));

	// 大雨bg
	this.instance_154 = new lib.小雨bg();
	this.instance_154.setTransform(91,241,0.5668,0.5668);
	this.instance_154._off = true;

	var maskedShapeInstanceList = [this.instance_154];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_154).wait(134).to({_off:false},0).to({_off:true},244).wait(331));

	// 图层_4_png
	this.instance_155 = new lib.元件3();
	this.instance_155.setTransform(776.15,531.1,1,1,0,0,0,109,127.4);

	var maskedShapeInstanceList = [this.instance_155];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_155).wait(1).to({regX:111.2,regY:107.4,x:778.35,y:511.1},0).wait(7).to({scaleX:1.0045,scaleY:1.0045,rotation:-0.1912,x:780.35,y:508.35},0).wait(1).to({scaleX:1.0089,scaleY:1.0089,rotation:-0.3823,x:782.35,y:505.55},0).wait(1).to({scaleX:1.0134,scaleY:1.0134,rotation:-0.5735,x:784.4,y:502.8},0).wait(1).to({scaleX:1.0178,scaleY:1.0178,rotation:-0.7646,x:786.35,y:500.05},0).wait(1).to({scaleX:1.0223,scaleY:1.0223,rotation:-0.9558,x:788.4,y:497.3},0).wait(1).to({scaleX:1.0267,scaleY:1.0267,rotation:-1.147,x:790.4,y:494.55},0).wait(1).to({scaleX:1.0312,scaleY:1.0312,rotation:-1.3381,x:792.45,y:491.75},0).wait(1).to({scaleX:1.0357,scaleY:1.0357,rotation:-1.5293,x:794.4,y:489.05},0).wait(1).to({scaleX:1.0401,scaleY:1.0401,rotation:-1.7205,x:796.45,y:486.3},0).wait(1).to({scaleX:1.0446,scaleY:1.0446,rotation:-1.9116,x:798.45,y:483.55},0).wait(1).to({scaleX:1.049,scaleY:1.049,rotation:-2.1028,x:800.45,y:480.75},0).wait(1).to({scaleX:1.0535,scaleY:1.0535,rotation:-2.2939,x:802.5,y:478},0).wait(1).to({scaleX:1.0579,scaleY:1.0579,rotation:-2.4851,x:804.5,y:475.25},0).wait(1).to({scaleX:1.0624,scaleY:1.0624,rotation:-2.6763,x:806.5,y:472.5},0).wait(1).to({scaleX:1.0668,scaleY:1.0668,rotation:-2.8674,x:808.5,y:469.75},0).wait(1).to({scaleX:1.0713,scaleY:1.0713,rotation:-3.0586,x:810.5,y:467},0).wait(1).to({scaleX:1.0758,scaleY:1.0758,rotation:-3.2498,x:812.5,y:464.25},0).wait(1).to({scaleX:1.0802,scaleY:1.0802,rotation:-3.4409,x:814.5,y:461.5},0).wait(1).to({scaleX:1.0846,scaleY:1.0846,rotation:-3.6321,x:816.5,y:458.75},0).wait(1).to({scaleX:1.0891,scaleY:1.0891,rotation:-3.8232,x:818.5,y:456},0).wait(1).to({scaleX:1.0936,scaleY:1.0936,rotation:-4.0144,x:820.5,y:453.25},0).wait(1).to({scaleX:1.098,scaleY:1.098,rotation:-4.2056,x:822.5,y:450.5},0).wait(1).to({scaleX:1.1025,scaleY:1.1025,rotation:-4.3967,x:824.55,y:447.75},0).wait(1).to({scaleX:1.1069,scaleY:1.1069,rotation:-4.5879,x:826.5,y:445},0).wait(1).to({scaleX:1.1114,scaleY:1.1114,rotation:-4.7791,x:828.5,y:442.25},0).wait(1).to({scaleX:1.1159,scaleY:1.1159,rotation:-4.9702,x:830.5,y:439.5},0).wait(1).to({scaleX:1.1203,scaleY:1.1203,rotation:-5.1614,x:832.45,y:436.75},0).wait(1).to({scaleX:1.1247,scaleY:1.1247,rotation:-5.3525,x:834.45,y:434},0).wait(1).to({scaleX:1.1292,scaleY:1.1292,rotation:-5.5437,x:836.5,y:431.2},0).wait(1).to({scaleX:1.1337,scaleY:1.1337,rotation:-5.7349,x:838.5,y:428.5},0).wait(1).to({scaleX:1.1381,scaleY:1.1381,rotation:-5.926,x:840.5,y:425.8},0).wait(1).to({scaleX:1.1426,scaleY:1.1426,rotation:-6.1172,x:842.55,y:422.95},0).wait(1).to({scaleX:1.147,scaleY:1.147,rotation:-6.3084,x:844.5,y:420.25},0).wait(1).to({scaleX:1.1515,scaleY:1.1515,rotation:-6.4995,x:846.45,y:417.45},0).wait(1).to({scaleX:1.1548,scaleY:1.1548,x:849.8,y:410.9},0).wait(1).to({scaleX:1.1581,scaleY:1.1581,x:853.1,y:404.25},0).wait(1).to({scaleX:1.1614,scaleY:1.1614,x:856.3,y:397.65},0).wait(1).to({scaleX:1.1648,scaleY:1.1648,x:859.65,y:391},0).wait(1).to({scaleX:1.1681,scaleY:1.1681,x:862.9,y:384.35},0).wait(1).to({scaleX:1.1714,scaleY:1.1714,x:866.2,y:377.75},0).wait(1).to({scaleX:1.1747,scaleY:1.1747,x:869.55,y:371.1},0).wait(1).to({scaleX:1.178,scaleY:1.178,x:872.75,y:364.45},0).wait(1).to({scaleX:1.1814,scaleY:1.1814,x:876.05,y:357.85},0).wait(1).to({scaleX:1.1847,scaleY:1.1847,x:879.4,y:351.25},0).wait(1).to({scaleX:1.188,scaleY:1.188,x:882.65,y:344.6},0).wait(1).to({scaleX:1.1913,scaleY:1.1913,x:885.95,y:337.95},0).wait(1).to({scaleX:1.1946,scaleY:1.1946,x:889.2,y:331.35},0).wait(1).to({scaleX:1.198,scaleY:1.198,x:892.5,y:324.75},0).wait(1).to({scaleX:1.2013,scaleY:1.2013,x:895.8,y:318.15},0).wait(1).to({scaleX:1.2046,scaleY:1.2046,x:899.1,y:311.5},0).wait(1).to({scaleX:1.2079,scaleY:1.2079,x:902.4,y:304.85},0).wait(1).to({scaleX:1.2112,scaleY:1.2112,x:905.6,y:298.25},0).wait(1).to({scaleX:1.2146,scaleY:1.2146,x:908.95,y:291.6},0).wait(1).to({scaleX:1.2179,scaleY:1.2179,x:912.25,y:284.95},0).wait(1).to({scaleX:1.2212,scaleY:1.2212,x:915.5,y:278.35},0).wait(1).to({scaleX:1.2245,scaleY:1.2245,x:918.85,y:271.75},0).wait(1).to({scaleX:1.2278,scaleY:1.2278,x:922.15,y:265.1},0).wait(1).to({scaleX:1.2311,scaleY:1.2311,x:925.35,y:258.45},0).wait(1).to({scaleX:1.2345,scaleY:1.2345,x:928.7,y:251.85},0).wait(1).to({scaleX:1.2378,scaleY:1.2378,x:931.95,y:245.2},0).wait(1).to({scaleX:1.2411,scaleY:1.2411,x:935.25,y:238.65},0).wait(1).to({scaleX:1.2444,scaleY:1.2444,x:938.6,y:232},0).wait(1).to({scaleX:1.2477,scaleY:1.2477,x:941.8,y:225.35},0).wait(1).to({scaleX:1.2511,scaleY:1.2511,x:945.1,y:218.7},0).wait(1).to({scaleX:1.2544,scaleY:1.2544,x:948.45,y:212.1},0).wait(1).to({scaleX:1.2577,scaleY:1.2577,x:951.7,y:205.45},0).wait(1).to({scaleX:1.261,scaleY:1.261,x:955,y:198.85},0).wait(7).to({regX:109,regY:127.4,scaleX:1,scaleY:1,rotation:0,x:776.15,y:531.1},0).wait(2).to({regX:111.2,regY:107.4,x:778.35,y:511.1},0).wait(48).to({_off:true},1).wait(577));

	// 图层_6_png
	this.instance_156 = new lib.元件2_1();
	this.instance_156.setTransform(282.25,509.15,1,1,46.9638,0,0,128,131.3);

	var maskedShapeInstanceList = [this.instance_156];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_156).wait(1).to({regX:127.9,regY:131.7,rotation:46.9636,x:281.85,y:509.35},0).wait(7).to({scaleX:1.0044,scaleY:1.0044,rotation:46.7724,x:278.45,y:504.95},0).wait(1).to({scaleX:1.0089,scaleY:1.0089,rotation:46.5813,x:275.1,y:500.6},0).wait(1).to({scaleX:1.0134,scaleY:1.0134,rotation:46.3901,x:271.7,y:496.15},0).wait(1).to({scaleX:1.0178,scaleY:1.0178,rotation:46.199,x:268.35,y:491.8},0).wait(1).to({scaleX:1.0223,scaleY:1.0223,rotation:46.0078,x:264.95,y:487.35},0).wait(1).to({scaleX:1.0267,scaleY:1.0267,rotation:45.8167,x:261.6,y:482.95},0).wait(1).to({scaleX:1.0312,scaleY:1.0312,rotation:45.6255,x:258.25,y:478.55},0).wait(1).to({scaleX:1.0356,scaleY:1.0356,rotation:45.4344,x:254.85,y:474.15},0).wait(1).to({scaleX:1.0401,scaleY:1.0401,rotation:45.2432,x:251.45,y:469.8},0).wait(1).to({scaleX:1.0445,scaleY:1.0445,rotation:45.052,x:248.1,y:465.4},0).wait(1).to({scaleX:1.049,scaleY:1.049,rotation:44.8609,x:244.7,y:461},0).wait(1).to({scaleX:1.0534,scaleY:1.0534,rotation:44.6697,x:241.3,y:456.6},0).wait(1).to({scaleX:1.0579,scaleY:1.0579,rotation:44.4786,x:238,y:452.2},0).wait(1).to({scaleX:1.0623,scaleY:1.0623,rotation:44.2874,x:234.55,y:447.85},0).wait(1).to({scaleX:1.0668,scaleY:1.0668,rotation:44.0963,x:231.25,y:443.45},0).wait(1).to({scaleX:1.0713,scaleY:1.0713,rotation:43.9051,x:227.8,y:439.05},0).wait(1).to({scaleX:1.0757,scaleY:1.0757,rotation:43.7139,x:224.45,y:434.65},0).wait(1).to({scaleX:1.0802,scaleY:1.0802,rotation:43.5228,x:221.1,y:430.25},0).wait(1).to({scaleX:1.0846,scaleY:1.0846,rotation:43.3316,x:217.75,y:425.85},0).wait(1).to({scaleX:1.0891,scaleY:1.0891,rotation:43.1405,x:214.35,y:421.45},0).wait(1).to({scaleX:1.0935,scaleY:1.0935,rotation:42.9493,x:210.9,y:417.05},0).wait(1).to({scaleX:1.098,scaleY:1.098,rotation:42.7582,x:207.6,y:412.65},0).wait(1).to({scaleX:1.1024,scaleY:1.1024,rotation:42.567,x:204.25,y:408.35},0).wait(1).to({scaleX:1.1069,scaleY:1.1069,rotation:42.3759,x:200.85,y:403.9},0).wait(1).to({scaleX:1.1113,scaleY:1.1113,rotation:42.1847,x:197.4,y:399.5},0).wait(1).to({scaleX:1.1158,scaleY:1.1158,rotation:41.9935,x:194.1,y:395.1},0).wait(1).to({scaleX:1.1202,scaleY:1.1202,rotation:41.8024,x:190.7,y:390.75},0).wait(1).to({scaleX:1.1247,scaleY:1.1247,rotation:41.6112,x:187.35,y:386.35},0).wait(1).to({scaleX:1.1292,scaleY:1.1292,rotation:41.4201,x:183.95,y:381.9},0).wait(1).to({scaleX:1.1336,scaleY:1.1336,rotation:41.2289,x:180.6,y:377.55},0).wait(1).to({scaleX:1.1381,scaleY:1.1381,rotation:41.0378,x:177.25,y:373.1},0).wait(1).to({scaleX:1.1425,scaleY:1.1425,rotation:40.8466,x:173.85,y:368.7},0).wait(1).to({scaleX:1.147,scaleY:1.147,rotation:40.6555,x:170.5,y:364.35},0).wait(1).to({scaleX:1.1514,scaleY:1.1514,rotation:40.4643,x:167.1,y:359.9},0).wait(1).to({scaleX:1.1548,scaleY:1.1548,x:163.2,y:353.1},0).wait(1).to({scaleX:1.1581,scaleY:1.1581,x:159.3,y:346.3},0).wait(1).to({scaleX:1.1614,scaleY:1.1614,x:155.45,y:339.45},0).wait(1).to({scaleX:1.1647,scaleY:1.1647,x:151.55,y:332.6},0).wait(1).to({scaleX:1.168,scaleY:1.168,x:147.65,y:325.8},0).wait(1).to({scaleX:1.1713,scaleY:1.1713,x:143.8,y:318.9},0).wait(1).to({scaleX:1.1747,scaleY:1.1747,x:139.9,y:312.1},0).wait(1).to({scaleX:1.178,scaleY:1.178,x:136,y:305.3},0).wait(1).to({scaleX:1.1813,scaleY:1.1813,x:132.15,y:298.4},0).wait(1).to({scaleX:1.1846,scaleY:1.1846,x:128.2,y:291.65},0).wait(1).to({scaleX:1.1879,scaleY:1.1879,x:124.35,y:284.8},0).wait(1).to({scaleX:1.1913,scaleY:1.1913,x:120.45,y:277.95},0).wait(1).to({scaleX:1.1946,scaleY:1.1946,x:116.6,y:271.1},0).wait(1).to({scaleX:1.1979,scaleY:1.1979,x:112.65,y:264.3},0).wait(1).to({scaleX:1.2012,scaleY:1.2012,x:108.85,y:257.4},0).wait(1).to({scaleX:1.2045,scaleY:1.2045,x:104.9,y:250.6},0).wait(1).to({scaleX:1.2078,scaleY:1.2078,x:101.05,y:243.7},0).wait(1).to({scaleX:1.2112,scaleY:1.2112,x:97.15,y:236.95},0).wait(1).to({scaleX:1.2145,scaleY:1.2145,x:93.3,y:230.1},0).wait(1).to({scaleX:1.2178,scaleY:1.2178,x:89.35,y:223.25},0).wait(1).to({scaleX:1.2211,scaleY:1.2211,x:85.5,y:216.45},0).wait(1).to({scaleX:1.2244,scaleY:1.2244,x:81.6,y:209.65},0).wait(1).to({scaleX:1.2278,scaleY:1.2278,x:77.7,y:202.75},0).wait(1).to({scaleX:1.2311,scaleY:1.2311,x:73.85,y:195.95},0).wait(1).to({scaleX:1.2344,scaleY:1.2344,x:69.95,y:189.1},0).wait(1).to({scaleX:1.2377,scaleY:1.2377,x:66.05,y:182.3},0).wait(1).to({scaleX:1.241,scaleY:1.241,x:62.2,y:175.45},0).wait(1).to({scaleX:1.2444,scaleY:1.2444,x:58.3,y:168.65},0).wait(1).to({scaleX:1.2477,scaleY:1.2477,x:54.4,y:161.75},0).wait(1).to({scaleX:1.251,scaleY:1.251,x:50.55,y:154.95},0).wait(1).to({scaleX:1.2543,scaleY:1.2543,x:46.65,y:148.1},0).wait(1).to({scaleX:1.2576,scaleY:1.2576,x:42.75,y:141.25},0).wait(1).to({scaleX:1.2609,scaleY:1.2609,x:38.9,y:134.4},0).wait(7).to({regX:128,regY:131.3,scaleX:1,scaleY:1,rotation:46.9638,x:282.25,y:509.15},0).wait(2).to({regX:127.9,regY:131.7,rotation:46.9636,x:281.85,y:509.35},0).wait(48).to({_off:true},1).wait(577));

	// 图层_2_png
	this.instance_157 = new lib.元件4();
	this.instance_157.setTransform(419.6,627.6,1,1,0,0,0,-16.6,255);

	var maskedShapeInstanceList = [this.instance_157];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_157).wait(1).to({regX:115.5,regY:123,x:551.7,y:495.6},0).wait(7).to({scaleX:1.0045,scaleY:1.0045,x:555.35,y:491.35},0).wait(1).to({scaleX:1.0089,scaleY:1.0089,x:559.05,y:487.1},0).wait(1).to({scaleX:1.0134,scaleY:1.0134,x:562.7,y:482.85},0).wait(1).to({scaleX:1.0178,scaleY:1.0178,x:566.35,y:478.6},0).wait(1).to({scaleX:1.0223,scaleY:1.0223,x:570,y:474.35},0).wait(1).to({scaleX:1.0267,scaleY:1.0267,x:573.75,y:470.1},0).wait(1).to({scaleX:1.0312,scaleY:1.0312,x:577.4,y:465.85},0).wait(1).to({scaleX:1.0356,scaleY:1.0356,x:581.05,y:461.6},0).wait(1).to({scaleX:1.0401,scaleY:1.0401,x:584.75,y:457.35},0).wait(1).to({scaleX:1.0446,scaleY:1.0446,x:588.4,y:453.1},0).wait(1).to({scaleX:1.049,scaleY:1.049,x:592.05,y:448.85},0).wait(1).to({scaleX:1.0535,scaleY:1.0535,x:595.75,y:444.55},0).wait(1).to({scaleX:1.0579,scaleY:1.0579,x:599.45,y:440.3},0).wait(1).to({scaleX:1.0624,scaleY:1.0624,x:603.1,y:436.05},0).wait(1).to({scaleX:1.0668,scaleY:1.0668,x:606.75,y:431.8},0).wait(1).to({scaleX:1.0713,scaleY:1.0713,x:610.45,y:427.55},0).wait(1).to({scaleX:1.0757,scaleY:1.0757,x:614.15,y:423.3},0).wait(1).to({scaleX:1.0802,scaleY:1.0802,x:617.8,y:419.05},0).wait(1).to({scaleX:1.0846,scaleY:1.0846,x:621.5,y:414.8},0).wait(1).to({scaleX:1.0891,scaleY:1.0891,x:625.15,y:410.55},0).wait(1).to({scaleX:1.0936,scaleY:1.0936,x:628.8,y:406.3},0).wait(1).to({scaleX:1.098,scaleY:1.098,x:632.45,y:402.05},0).wait(1).to({scaleX:1.1025,scaleY:1.1025,x:636.2,y:397.8},0).wait(1).to({scaleX:1.1069,scaleY:1.1069,x:639.85,y:393.55},0).wait(1).to({scaleX:1.1114,scaleY:1.1114,x:643.5,y:389.3},0).wait(1).to({scaleX:1.1158,scaleY:1.1158,x:647.2,y:385.05},0).wait(1).to({scaleX:1.1203,scaleY:1.1203,x:650.85,y:380.8},0).wait(1).to({scaleX:1.1247,scaleY:1.1247,x:654.55,y:376.55},0).wait(1).to({scaleX:1.1292,scaleY:1.1292,x:658.2,y:372.3},0).wait(1).to({scaleX:1.1337,scaleY:1.1337,x:661.9,y:368.05},0).wait(1).to({scaleX:1.1381,scaleY:1.1381,x:665.55,y:363.8},0).wait(1).to({scaleX:1.1426,scaleY:1.1426,x:669.2,y:359.55},0).wait(1).to({scaleX:1.147,scaleY:1.147,x:672.9,y:355.3},0).wait(1).to({scaleX:1.1515,scaleY:1.1515,x:676.6,y:351.05},0).wait(1).to({scaleX:1.1548,scaleY:1.1548,x:680.05,y:343.65},0).wait(1).to({scaleX:1.1581,scaleY:1.1581,x:683.45,y:336.25},0).wait(1).to({scaleX:1.1614,scaleY:1.1614,x:686.9,y:328.85},0).wait(1).to({scaleX:1.1647,scaleY:1.1647,x:690.4,y:321.45},0).wait(1).to({scaleX:1.1681,scaleY:1.1681,x:693.8,y:314.05},0).wait(1).to({scaleX:1.1714,scaleY:1.1714,x:697.25,y:306.75},0).wait(1).to({scaleX:1.1747,scaleY:1.1747,x:700.7,y:299.35},0).wait(1).to({scaleX:1.178,scaleY:1.178,x:704.15,y:291.95},0).wait(1).to({scaleX:1.1813,scaleY:1.1813,x:707.6,y:284.55},0).wait(1).to({scaleX:1.1847,scaleY:1.1847,x:711.05,y:277.15},0).wait(1).to({scaleX:1.188,scaleY:1.188,x:714.45,y:269.75},0).wait(1).to({scaleX:1.1913,scaleY:1.1913,x:717.95,y:262.4},0).wait(1).to({scaleX:1.1946,scaleY:1.1946,x:721.4,y:255},0).wait(1).to({scaleX:1.1979,scaleY:1.1979,x:724.8,y:247.6},0).wait(1).to({scaleX:1.2013,scaleY:1.2013,x:728.25,y:240.2},0).wait(1).to({scaleX:1.2046,scaleY:1.2046,x:731.75,y:232.85},0).wait(1).to({scaleX:1.2079,scaleY:1.2079,x:735.15,y:225.45},0).wait(1).to({scaleX:1.2112,scaleY:1.2112,x:738.6,y:218.1},0).wait(1).to({scaleX:1.2145,scaleY:1.2145,x:742.05,y:210.7},0).wait(1).to({scaleX:1.2179,scaleY:1.2179,x:745.5,y:203.3},0).wait(1).to({scaleX:1.2212,scaleY:1.2212,x:748.95,y:195.9},0).wait(1).to({scaleX:1.2245,scaleY:1.2245,x:752.4,y:188.5},0).wait(1).to({scaleX:1.2278,scaleY:1.2278,x:755.8,y:181.1},0).wait(1).to({scaleX:1.2311,scaleY:1.2311,x:759.3,y:173.75},0).wait(1).to({scaleX:1.2344,scaleY:1.2344,x:762.75,y:166.4},0).wait(1).to({scaleX:1.2378,scaleY:1.2378,x:766.15,y:159},0).wait(1).to({scaleX:1.2411,scaleY:1.2411,x:769.6,y:151.65},0).wait(1).to({scaleX:1.2444,scaleY:1.2444,x:773.1,y:144.25},0).wait(1).to({scaleX:1.2477,scaleY:1.2477,x:776.5,y:136.85},0).wait(1).to({scaleX:1.251,scaleY:1.251,x:779.95,y:129.5},0).wait(1).to({scaleX:1.2544,scaleY:1.2544,x:783.4,y:122.1},0).wait(1).to({scaleX:1.2577,scaleY:1.2577,x:786.85,y:114.7},0).wait(1).to({scaleX:1.261,scaleY:1.261,x:790.3,y:107.3},0).wait(7).to({regX:-16.6,regY:255,scaleX:1,scaleY:1,x:419.6,y:627.6},0).wait(2).to({regX:115.5,regY:123,x:551.7,y:495.6},0).wait(48).to({_off:true},1).wait(577));

	// 图层_3_png
	this.instance_158 = new lib.大风草地();
	this.instance_158.setTransform(164,571,0.3645,0.3645);

	var maskedShapeInstanceList = [this.instance_158];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_158).to({_off:true},132).wait(577));

	// 选中
	this.instance_159 = new lib.选中();
	this.instance_159.setTransform(125.1,824.75,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.instance_159, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.instance_159).wait(134).to({x:157.75},0).wait(244).to({x:189.45},0).wait(102).to({x:221.15},0).wait(115).to({x:252.85},0).wait(114));

	// 切换
	this.lnav1_btn = new lib.选择();
	this.lnav1_btn.name = "lnav1_btn";
	this.lnav1_btn.setTransform(126.05,822.65,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.lnav1_btn, 0, 1, 2, false, new lib.选择(), 3);

	this.lnav5_btn = new lib.选择();
	this.lnav5_btn.name = "lnav5_btn";
	this.lnav5_btn.setTransform(252.85,822.65,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.lnav5_btn, 0, 1, 2, false, new lib.选择(), 3);

	this.lnav4_btn = new lib.选择();
	this.lnav4_btn.name = "lnav4_btn";
	this.lnav4_btn.setTransform(221.15,822.65,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.lnav4_btn, 0, 1, 2, false, new lib.选择(), 3);

	this.lnav3_btn = new lib.选择();
	this.lnav3_btn.name = "lnav3_btn";
	this.lnav3_btn.setTransform(189.45,822.65,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.lnav3_btn, 0, 1, 2, false, new lib.选择(), 3);

	this.lnav2_btn = new lib.选择();
	this.lnav2_btn.name = "lnav2_btn";
	this.lnav2_btn.setTransform(157.75,822.65,1,1,0,0,0,9.5,9.5);
	new cjs.ButtonHelper(this.lnav2_btn, 0, 1, 2, false, new lib.选择(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.lnav2_btn},{t:this.lnav3_btn},{t:this.lnav4_btn},{t:this.lnav5_btn},{t:this.lnav1_btn}]}).wait(709));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1069.8,764.5,737.1000000000001,75.5);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#F7C677",
	opacity: 0.00,
	manifest: [
		{src:"images/老虎1.png?1693880960613", id:"老虎1"},
		{src:"images/老虎头_.png?1693880960613", id:"老虎头"},
		{src:"images/老虎bg.png?1693880960613", id:"老虎bg"},
		{src:"images/小鸟bg.png?1693880960613", id:"小鸟bg"},
		{src:"images/小鸟身子_.png?1693880960613", id:"小鸟身子"},
		{src:"images/小猫_.png?1693880960613", id:"小猫"},
		{src:"images/小猫bgpng.png?1693880960613", id:"小猫bgpng"},
		{src:"images/小猴_.png?1693880960613", id:"小猴"},
		{src:"images/小雨_.png?1693880960613", id:"小雨"},
		{src:"images/小雨bg.png?1693880960613", id:"小雨bg"},
		{src:"images/大风草地_.png?1693880960613", id:"大风草地"},
		{src:"images/大风右侧树_.png?1693880960613", id:"大风右侧树"},
		{src:"images/大风左侧树_.png?1693880960613", id:"大风左侧树"},
		{src:"images/狮子_.png?1693880960613", id:"狮子"},
		{src:"images/狮子嘴巴_.png?1693880960613", id:"狮子嘴巴"},
		{src:"images/狮子眼睛_.png?1693880960613", id:"狮子眼睛"},
		{src:"images/狮子bg.png?1693880960613", id:"狮子bg"},
		{src:"images/翅膀_.png?1693880960613", id:"翅膀"},
		{src:"images/雨伞png.png?1693880960613", id:"雨伞png"},
		{src:"sounds/老虎_.mp3?1693880960613", id:"老虎"},
		{src:"sounds/小鸟_.mp3?1693880960613", id:"小鸟"},
		{src:"sounds/小猫_1.mp3?1693880960613", id:"小猫_1"},
		{src:"sounds/小雨_1.mp3?1693880960613", id:"小雨_1"},
		{src:"sounds/大雨_.mp3?1693880960613", id:"大雨"},
		{src:"sounds/yx12010101大风.mp3?1693880960613", id:"yx12010101大风"},
		{src:"sounds/yx12010102微风.mp3?1693880960613", id:"yx12010102微风"},
		{src:"sounds/yx12010109大声喊.mp3?1693880960613", id:"yx12010109大声喊"},
		{src:"sounds/悄悄话1.mp3?1693880960613", id:"悄悄话1"},
		{src:"sounds/狮子_1.mp3?1693880960613", id:"狮子_1"}
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