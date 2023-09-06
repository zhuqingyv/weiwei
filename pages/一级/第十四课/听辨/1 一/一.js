(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"一_atlas_P_1", frames: [[0,0,475,475]]}
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



(lib.Image = function() {
	this.initialize(ss["一_atlas_P_1"]);
	this.gotoAndStop(0);
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
	this.shape.setTransform(73.1944,47.9874,3.0698,3.0698);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_1.setTransform(56.4897,48.0258,3.0698,3.0698);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_2.setTransform(39.6792,47.9783,3.0698,3.0698);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgYAYQgKgJAAgPQAAgOAKgKQALgKANAAQAOAAAKAKQALAKAAAOQAAAPgLAJQgKALgOAAQgNAAgLgLg");
	this.shape_3.setTransform(22.05,48.0002,3.0698,3.0698);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AqFKGIAA0LIULAAIAAULg");
	this.shape_4.setTransform(47.425,47.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.2,-17.2,129.29999999999998,129.29999999999998);


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

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(5.2,10.7,73.8,83);


(lib.对 = function(mode,startPosition,loop,reversed) {
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
	this.frame_11 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(11).call(this.frame_11).wait(54));

	// 图层_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AguLfIAA29IBdAAIAAW9g");
	var mask_graphics_1 = new cjs.Graphics().p("AhVLfIAA29ICrAAIAAW9g");
	var mask_graphics_2 = new cjs.Graphics().p("Ah9LfIAA29ID7AAIAAW9g");
	var mask_graphics_3 = new cjs.Graphics().p("AikLfIAA29IFJAAIAAW9g");
	var mask_graphics_4 = new cjs.Graphics().p("AjMLfIAA29IGZAAIAAW9g");
	var mask_graphics_5 = new cjs.Graphics().p("AjzLfIAA29IHnAAIAAW9g");
	var mask_graphics_6 = new cjs.Graphics().p("AkbLfIAA29II3AAIAAW9g");
	var mask_graphics_7 = new cjs.Graphics().p("AlDLfIAA29IKGAAIAAW9g");
	var mask_graphics_8 = new cjs.Graphics().p("AlqLfIAA29ILVAAIAAW9g");
	var mask_graphics_9 = new cjs.Graphics().p("AmSLfIAA29IMlAAIAAW9g");
	var mask_graphics_10 = new cjs.Graphics().p("Am5LfIAA29INzAAIAAW9g");
	var mask_graphics_11 = new cjs.Graphics().p("AnhLfIAA29IPDAAIAAW9g");
	var mask_graphics_51 = new cjs.Graphics().p("AnhLfIAA29IPDAAIAAW9g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-40.5,y:-0.775}).wait(1).to({graphics:mask_graphics_1,x:-36.55,y:-0.775}).wait(1).to({graphics:mask_graphics_2,x:-32.575,y:-0.775}).wait(1).to({graphics:mask_graphics_3,x:-28.625,y:-0.775}).wait(1).to({graphics:mask_graphics_4,x:-24.675,y:-0.775}).wait(1).to({graphics:mask_graphics_5,x:-20.725,y:-0.775}).wait(1).to({graphics:mask_graphics_6,x:-16.75,y:-0.775}).wait(1).to({graphics:mask_graphics_7,x:-12.8,y:-0.775}).wait(1).to({graphics:mask_graphics_8,x:-8.85,y:-0.775}).wait(1).to({graphics:mask_graphics_9,x:-4.9,y:-0.775}).wait(1).to({graphics:mask_graphics_10,x:-0.925,y:-0.775}).wait(1).to({graphics:mask_graphics_11,x:3.025,y:-0.775}).wait(40).to({graphics:mask_graphics_51,x:3.025,y:-0.775}).wait(1).to({graphics:null,x:0,y:0}).wait(13));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#39B54A").s().p("AiHFKIgKgCIgLgCIgKgEQgLgEgDgDQgOgKgFgFQgMgLgKgPIgKgXQgPghgWgfQgeglgnggIgVgOQgPgJgJgPIgGgPQgFgSAFgRIAGgQQAHgLAKgHQAJgIAOgDQAMgFAOADQAOABAKAHQAbAQAeAaQAnAhAnA0QAMARANAWIAuhKQAmg6AlgvQAvhAAsgwQAsgvAwgrQA3gxBCgwQAPgIASAAIASACQAQAFAMAMIALANQAHAMAAAMQADANgEAOQgDANgIAJQgIALgLAGIgfAYQgeAXgXAUQgxArgtAwQgoAqgmAvIgtA/QgrA+gpBIIgbAsQgKAOgFAFQgQARgaAJQgKAEgMAAIgDAAg");
	this.shape.setTransform(5.4143,4.5025);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(51).to({_off:true},1).wait(13));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.7,-28.5,78.30000000000001,66);


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
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC3300").s().p("ADZEqQgOgDgJgJQgLgIgHgMIgHgJQgkgugkgpQglgrgogpIgtgvIgZAeIgQAVQghAugdA3QgKAPgPAJIgQAHQgSAFgSgFIgQgHQgMgGgHgLQgKgLgCgMQgFgOAEgNQAAgOAIgLIAGgNQAagvAiguQAbglAcggIgTgRQglgfgrgiIgtgiQgPgIgKgQIgGgRQgFgRAFgTIAGgQQAHgMALgHQAKgIANgEQANgEAOADQANABAMAHIANAJQBAAvAyArIAsAlIALgJQAzgsAxggQAugfAzgZQAQgJASAAIASADQARAEANANIALAOQAHALABAOQADANgFAOQgDANgJAKQgHALgMAGIgjATQg5Afg3AqIgeAZIAuAuQArAsArAzQAuA2AtA7QAJAQABASIgDASQgFASgMAMIgOALQgLAHgOABIgLABQgIAAgIgCg");
	this.shape.setTransform(30.275,29.9981);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件1, new cjs.Rectangle(0,0,60.6,60), null);


(lib.B = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#8ABF78").s().p("AAEgcQAMgNAKgFQgHAjgWAgIgWAaQAHgvAWgcg");
	this.shape.setTransform(331.1962,325.9609,4.8978,4.8978);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#8ABF78").s().p("AAKgaQAOgLAMgCQgPAggcAaIgbAVQAQgsAcgWg");
	this.shape_1.setTransform(307.8094,221.2711,4.8978,4.8978);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#8ABF78").s().p("AAGgbQANgNALgEQgKAigZAfIgYAXQALgtAYgag");
	this.shape_2.setTransform(192.5895,432.4873,4.8978,4.8978);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#8ABF78").s().p("AAGgbQAOgNAKgDQgKAhgZAeIgYAZQAKgvAZgZg");
	this.shape_3.setTransform(245.118,406.2843,4.8978,4.8978);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#8ABF78").s().p("AAEgcQAMgNALgFQgIAjgXAfIgWAaQAIguAWgcg");
	this.shape_4.setTransform(286.749,372.4897,4.8978,4.8978);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#8ABF78").s().p("AATgUQASgGAKACQgYAYglAPIggAKQAfgjAigKg");
	this.shape_5.setTransform(272.3006,368.196,4.8978,4.8978);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#8ABF78").s().p("Ag0ANQAqgZAjABQASAAAKAFQgfAQgoADg");
	this.shape_6.setTransform(219.2823,396.7313,4.8978,4.8978);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#8ABF78").s().p("AAWgQQASgDALAEQgdAUgmAJIgiAFQAlgeAjgFg");
	this.shape_7.setTransform(156.5909,424.8856,4.8978,4.8978);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#8ABF78").s().p("AAZgMQARgBALAFQggAQgmAFIgjAAQApgZAkAAg");
	this.shape_8.setTransform(99.4095,374.805,4.8978,4.8978);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#8ABF78").s().p("AATgUQASgFALACQgZAYglAOIghAKQAggjAigKg");
	this.shape_9.setTransform(59.3702,316.382,4.8978,4.8978);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#8ABF78").s().p("AAXgPQASgCALAEQgeATgnAHIgiADQAngcAjgDg");
	this.shape_10.setTransform(362.1746,241.2518,4.8978,4.8978);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#8ABF78").s().p("AATgUQASgFALACQgZAYglAOIghAKQAhgjAhgKg");
	this.shape_11.setTransform(270.0966,276.9657,4.8978,4.8978);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#8ABF78").s().p("AATgUQASgFALACQgaAYgkAOIghAJQAggiAigKg");
	this.shape_12.setTransform(331.1962,296.6685,4.8978,4.8978);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#8ABF78").s().p("AAXgPQASgCAKAEQgdATgmAHIgiAEQAmgdAjgDg");
	this.shape_13.setTransform(295.6874,341.2256,4.8978,4.8978);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#8ABF78").s().p("AgGgbIALgaQAJAjgGAnQgDATgFANQgOgtAIgjg");
	this.shape_14.setTransform(400.8399,230.2096,4.8978,4.8978);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#8ABF78").s().p("AgGgbIAKgaQAJAjgFAnQgDATgFANQgOgtAIgjg");
	this.shape_15.setTransform(369.5931,284.8197,4.8978,4.8978);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#8ABF78").s().p("AgDgbIANgZQAFAjgLAmQgEATgHANQgJgvANghg");
	this.shape_16.setTransform(423.2348,171.069,4.8978,4.8978);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#8ABF78").s().p("AAXgPQASgCAKAEQgdATgmAHIgjAEQAngdAjgDg");
	this.shape_17.setTransform(398.1732,163.01,4.8978,4.8978);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#8ABF78").s().p("AAOgZQAPgJALgBQgSAfggAWIgdASQAWgqAfgTg");
	this.shape_18.setTransform(391.8061,202.9045,4.8978,4.8978);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#8ABF78").s().p("AACgcQAKgPAKgFQgEAjgUAiIgTAcQACgwAVgdg");
	this.shape_19.setTransform(230.1798,144.1313,4.8978,4.8978);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#8ABF78").s().p("AAGgcQAOgMALgCQgJAigbAdIgZAWQAJguAbgZg");
	this.shape_20.setTransform(216.5885,188.8234,4.8978,4.8978);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#8ABF78").s().p("AAKgaQAPgLALgCQgPAggcAaIgbAVQAQgsAcgWg");
	this.shape_21.setTransform(195.8955,237.4338,4.8978,4.8978);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#8ABF78").s().p("AAKgaQAOgLALgCQgOAggdAaIgbAVQARgsAcgWg");
	this.shape_22.setTransform(132.9592,296.6967,4.8978,4.8978);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#8ABF78").s().p("AAGgbQAMgOAKgEQgIAigYAfIgXAaQAJgvAYgag");
	this.shape_23.setTransform(80.0633,321.6754,4.8978,4.8978);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#8ABF78").s().p("AAFgbQANgOAKgEQgIAjgYAfIgXAZQAJgvAXgag");
	this.shape_24.setTransform(272.9128,101.5208,4.8978,4.8978);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#8ABF78").s().p("AAKgaQAOgLAMgCQgPAggdAaIgbAVQARgsAcgWg");
	this.shape_25.setTransform(104.3072,310.6554,4.8978,4.8978);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#8ABF78").s().p("AAFgbQANgOAKgEQgIAjgYAfIgXAZQAJgvAXgag");
	this.shape_26.setTransform(162.8355,309.1861,4.8978,4.8978);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#8ABF78").s().p("AAFgbQANgOAKgEQgIAigYAfIgXAaQAJgvAXgag");
	this.shape_27.setTransform(157.0807,289.595,4.8978,4.8978);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#8ABF78").s().p("AAKgaQAOgLAMgCQgPAggcAaIgbAVQAQgsAcgWg");
	this.shape_28.setTransform(252.7095,150.2535,4.8978,4.8978);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#8ABF78").s().p("AgRgVIAAgdQAVAdAJAmQAFAUAAAOQgeglgFgjg");
	this.shape_29.setTransform(280.9941,138.3765,4.8978,4.8978);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#8ABF78").s().p("AATgVQARgGALACQgYAZgkAPIghALQAfgkAigLg");
	this.shape_30.setTransform(334.6247,88.7079,4.8978,4.8978);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#8ABF78").s().p("AgRgVIABgdQAUAdAJAmQAFAUAAAOQgeglgFgjg");
	this.shape_31.setTransform(348.5833,113.6427,4.8978,4.8978);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#8ABF78").s().p("AgBgcIARgWQAAAjgPAkQgHATgIALQgDgwAQgfg");
	this.shape_32.setTransform(262.9711,205.3534,4.8978,4.8978);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#8ABF78").s().p("AAKgaQAOgLALgCQgOAggcAaIgbAVQAQgsAcgWg");
	this.shape_33.setTransform(212.6703,260.4533,4.8978,4.8978);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#8ABF78").s().p("AAKgaQAOgLALgCQgOAggdAaIgbAVQARgsAcgWg");
	this.shape_34.setTransform(240.9549,184.5379,4.8978,4.8978);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#8ABF78").s().p("AgDgbIANgZQAFAjgKAmQgFATgGANQgKgvANghg");
	this.shape_35.setTransform(322.4895,138.4989,4.8978,4.8978);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#8ABF78").s().p("AgagKIgMgaQAgAPAZAfQANAPAHAMQgsgSgVgdg");
	this.shape_36.setTransform(279.7697,173.8853,4.8978,4.8978);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#8ABF78").s().p("AgWgQIgGgcQAbAXARAjQAJASAEANQgmgcgNghg");
	this.shape_37.setTransform(195.2832,282.983,4.8978,4.8978);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#8ABF78").s().p("AgVgSIgCgdQAXAaAPAkQAHATACAOQgigggLgig");
	this.shape_38.setTransform(231.894,253.5964,4.8978,4.8978);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#8ABF78").s().p("AgVgSIgDgcQAYAYAPAlQAHATADANQgjgfgLgig");
	this.shape_39.setTransform(311.8501,164.9468,4.8978,4.8978);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#8ABF78").s().p("AgDgcIAOgXQAEAigLAmQgFATgHAMQgIguANgig");
	this.shape_40.setTransform(192.5662,330.3689,4.8978,4.8978);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#8ABF78").s().p("AAVgSQASgEAKADQgbAWglALIgiAHQAkggAigHg");
	this.shape_41.setTransform(162.8355,330.7645,4.8978,4.8978);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#8ABF78").s().p("AgOgOIgJghQAiAhAKAhQAFASgCALQgYgZgOglg");
	this.shape_42.setTransform(186.7938,299.2681,4.8978,4.8978);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#8ABF78").s().p("AAKgaQAOgLALgCQgOAggcAaIgbAVQAQgsAcgWg");
	this.shape_43.setTransform(121.5719,383.7545,4.8978,4.8978);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#8ABF78").s().p("AgDgbIAOgZQAEAjgMAmQgEATgHANQgJgwAOggg");
	this.shape_44.setTransform(162.8884,368.2041,4.8978,4.8978);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#8ABF78").s().p("AgUAEIgggLQAwgJAhANQAQAFAIAJIgUABQgaAAgbgIg");
	this.shape_45.setTransform(99.287,285.9422,4.8978,4.8978);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#8ABF78").s().p("AgVgSIgEgbQAZAYAPAkQAIASADANQgkgegLgig");
	this.shape_46.setTransform(402.9485,98.7045,4.8978,4.8978);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#8ABF78").s().p("AASgVQARgGAMABQgYAagkAQIghALQAfglAhgLg");
	this.shape_47.setTransform(357.5217,110.9979,4.8978,4.8978);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#8ABF78").s().p("AgSgVIABgcQAUAcAKAmQAFATABAOQgfgkgGgjg");
	this.shape_48.setTransform(384.9492,138.4989,4.8978,4.8978);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#8ABF78").s().p("AAKgaQAOgLALgCQgOAggdAaIgbAVQASgsAbgWg");
	this.shape_49.setTransform(352.1342,150.2535,4.8978,4.8978);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#8ABF78").s().p("AgVgRIgFgcQAaAYAQAjQAIATADANQglgegLghg");
	this.shape_50.setTransform(369.6437,180.1299,4.8978,4.8978);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#8ABF78").s().p("AgOgXIAEgcQARAeAGAnQACAUgBAOQgagngCgkg");
	this.shape_51.setTransform(324.042,235.7196,4.8978,4.8978);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#8ABF78").s().p("AgzAMQApgYAiABQATAAAJAFQgfAQgnADg");
	this.shape_52.setTransform(245.118,256.4102,4.8978,4.8978);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#8ABF78").s().p("Ag0AMQApgYAjABQASAAAKAFQgeAQgoACg");
	this.shape_53.setTransform(316.8703,191.8821,4.8978,4.8978);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#8ABF78").s().p("AgEgbIAMgZQAHAigJAnQgFAUgFAMQgLguALgig");
	this.shape_54.setTransform(290.3851,253.5964,4.8978,4.8978);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#8ABF78").s().p("AgTAKIghgEQAsgTAiAFQASACAJAGQgdAKgiAAIgJAAg");
	this.shape_55.setTransform(279.7697,221.312,4.8978,4.8978);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#8ABF78").s().p("AAGgbQAMgNALgEQgJAigYAeIgYAZQAKguAYgag");
	this.shape_56.setTransform(258.2195,263.3919,4.8978,4.8978);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#8ABF78").s().p("AgEgbIANgZQAGAigKAnQgEAUgFAMQgLgvALghg");
	this.shape_57.setTransform(342.8149,210.2512,4.8978,4.8978);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#8ABF78").s().p("AAKgaQAPgLALgCQgPAggcAaIgbAVQAQgsAcgWg");
	this.shape_58.setTransform(436.1309,97.8474,4.8978,4.8978);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#8ABF78").s().p("AATgUQASgFALADQgaAXglAOIggAJQAhgjAhgJg");
	this.shape_59.setTransform(415.5603,130.5808,4.8978,4.8978);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#8ABF78").s().p("AAKgaQAOgLALgCQgOAggcAbIgbAUQAQgsAcgWg");
	this.shape_60.setTransform(230.0574,110.949,4.8978,4.8978);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#B5913C").p("AgaldQAFA2gTBXQgYB0g8BvQgfA5gnA3ADZlpQhGBzhwB5QgjAmgjAgQAAABAAABQh9E1h8AQAESltQgYBWgpBgQgTAvgUAnQg/B4hBApAEglTQAPAqggBEQgeBChHBCQhKBEh2BDAA/lpQglCYg9CaQgtAqgsAgQiOBqiKATAGRltQgrClhcCuQi3Fbj2Aq");
	this.shape_61.setTransform(258.1811,237.7169,4.8978,4.8978);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#FFFFFF").s().p("AgfAgQgNgMAAgTQAAgTANgNQAMgNATgBQAUABANANQAMANAAATQAAATgMAMQgNANgUABQgTgBgMgNg");
	this.shape_62.setTransform(81.475,84.975);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#FFFFFF").s().p("AjDD6IAAgZIBHgHIAChjIAAhkIAAglIAAhkIgChkIhHgHIAAgYIDNAAQBOAAApAhQAqAhAAA3QAAApgcAgQgcAgg9AOQBKAJAiAiQAjAhgBAwQABAjgUAfQgUAegqATQgqAUhEAAgAhBB2QAAA2ACAyIA3AAQBHAAAkgcQAkgbAAg0QABg2glgcQglgchPAAIgwAAIAABxgAhBh7IAABlIArAAQBFAAAhgaQAigagBg0QABgygegXQgegWg+AAIg3AAQgCAwAAAyg");
	this.shape_63.setTransform(48.9756,63.625);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#51C1E1").s().p("AgWBrQgkAAgZgZQgagaAAgkIAAgnQAAgkAagZQAZgaAkAAIAsAAQAkAAAaAaQAaAZAAAkIAAAnQAAAkgaAaQgaAZgkAAg");
	this.shape_64.setTransform(53.6165,66.1131,4.8978,4.8978);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#51C1E1").ss(1,0,0,4).p("AnvHwIPfAAIAAvfIvfAAg");
	this.shape_65.setTransform(242.914,256.6575,4.8978,4.8978);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#E6F2FA").ss(1,0,0,4).p("AnvHwIPfAAIAAvfIvfAAg");
	this.shape_66.setTransform(242.914,256.6575,4.8978,4.8978);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#E28623").s().p("Egl8Al9MAAAhL5MBL5AAAMAAABL5g");
	this.shape_67.setTransform(243.225,242.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_67}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,0,487.9,500.6);


(lib.A = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#51C1E1").ss(1,0,0,4).p("Egl8Al9MBL5AAAMAAAhL5MhBkAAAIj4AAImdAAIAAGgIAADdg");
	this.shape.setTransform(243.225,242.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AD0DzQgMgMgBgTQABgUAMgNQANgNAUgBQATABANANQAMANABAUQgBATgMAMQgNANgTABQgUgBgNgNgAgmD4IAAgZIBLgHIgtiJIiwAAIgsCHIBIAJIAAAZIilAAIAAgZIA+gIICenXIAnAAICgHYIA+AHIAAAZgAiuAzICdAAIhPjsg");
	this.shape_1.setTransform(57.775,47.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#51C1E1").s().p("AhwILQiwAAh6h7IgMgMQg8hBgdhOQgWg9gChFIAAjdQABhIAXhAQAfhWBGhFQBEhGBUgeQBAgXBIgCID4AAQBFADA9AWQBOAcBBA8IAMAMQB9B9AACwIAADDQAACwh9B9Qh9B7iwAAgAEbCIQgNANAAAUQAAATANAMQAMANAUABQAUgBANgNQAMgMAAgTQAAgUgMgNQgNgNgUgBQgUABgMANgAAeAkIAtCJIhLAHIAAAZIDGAAIAAgZIg+gHIignYIgmAAIifHXIg9AIIAAAZICkAAIAAgZIhIgJIAtiHgAiIAIIBPjsIBNDsg");
	this.shape_2.setTransform(53.925,52.275);

	this.instance = new lib.Image();
	this.instance.setTransform(0,0.15,1.0231,1.0225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("Egl8Al9MAAAhL5MBL5AAAMAAABL5g");
	this.shape_3.setTransform(243.225,242.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_3}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.7,-1,487.9,487.9);


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
	this.instance.setTransform(33.9,50.25,1,1,0,0,0,42.2,52);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AqGKGIAA0LIUNAAIAAULg");
	this.shape.setTransform(42.275,52.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.4,-12.6,129.4,129.3);


(lib.错 = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(-0.05,0,1,1,0,0,0,30.2,30);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:30.3,x:0.05,alpha:0.1111},0).wait(1).to({alpha:0.2222},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.4444},0).wait(1).to({alpha:0.5556},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.7778},0).wait(1).to({alpha:0.8889},0).wait(1).to({alpha:1},0).wait(21));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.2,-30,60.5,60);


// stage content:
(lib.一 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:3,m2:82,A:200,B:252};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,3,80,82,195,200,251,252,282];
	this.streamSoundSymbolsList[3] = [{id:"yx121401听辨音的强弱1",startFrame:3,endFrame:82,loop:1,offset:0}];
	this.streamSoundSymbolsList[82] = [{id:"yx121401听辨音的强弱2",startFrame:82,endFrame:200,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		
		
		
		var _this = this;
		
		
		
		
		
		_this.m1.on('click', function(){
		
		_this.gotoAndPlay('m1');
		});
		
		
		
		
		_this.m2.on('click', function(){
		
		_this.gotoAndPlay('m2');
		});
		
		
		_this.A.on('click', function(){
		
		_this.gotoAndPlay('A');
		});
		
		_this.B.on('click', function(){
		
		_this.gotoAndPlay('B');
		});
	}
	this.frame_3 = function() {
		var soundInstance = playSound("yx121401听辨音的强弱1",0);
		this.InsertIntoSoundStreamData(soundInstance,3,82,1);
		var _this = this;
		
		
		
		
		
		_this.m1stop.on('click', function(){
		
		_this.gotoAndStop(0);
		});
		
		_this.m2stop.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_80 = function() {
		this.gotoAndStop(0);
	}
	this.frame_82 = function() {
		var soundInstance = playSound("yx121401听辨音的强弱2",0);
		this.InsertIntoSoundStreamData(soundInstance,82,200,1);
	}
	this.frame_195 = function() {
		this.gotoAndStop(0);
	}
	this.frame_200 = function() {
		playSound("victory");
	}
	this.frame_251 = function() {
		this.stop();
	}
	this.frame_252 = function() {
		playSound("fail");
	}
	this.frame_282 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3).call(this.frame_3).wait(77).call(this.frame_80).wait(2).call(this.frame_82).wait(113).call(this.frame_195).wait(5).call(this.frame_200).wait(51).call(this.frame_251).wait(1).call(this.frame_252).wait(30).call(this.frame_282).wait(1));

	// 音频播放标
	this.m1stop = new lib.音频停止();
	this.m1stop.name = "m1stop";
	this.m1stop.setTransform(240.75,402.15);
	new cjs.ButtonHelper(this.m1stop, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m2stop = new lib.音频停止();
	this.m2stop.name = "m2stop";
	this.m2stop.setTransform(1010.15,402.15);
	new cjs.ButtonHelper(this.m2stop, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1stop}]},3).to({state:[{t:this.m2stop}]},79).wait(201));

	// 音频播放标
	this.m2 = new lib.音频播放标();
	this.m2.name = "m2";
	this.m2.setTransform(995.7,404.35);
	new cjs.ButtonHelper(this.m2, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m1 = new lib.音频播放标();
	this.m1.name = "m1";
	this.m1.setTransform(226.3,404.35);
	new cjs.ButtonHelper(this.m1, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m1},{t:this.m2}]}).to({state:[{t:this.m2}]},3).to({state:[{t:this.m1}]},79).to({state:[{t:this.m1},{t:this.m2}]},118).wait(83));

	// music
	this.instance = new lib.对("synched",0);
	this.instance.setTransform(484.35,460.65);

	this.instance_1 = new lib.错("synched",0);
	this.instance_1.setTransform(1248.8,480.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},200).to({state:[{t:this.instance_1}]},52).wait(31));

	// title
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#51C1E1").s().p("AgdCvQgLgKAAgRQAAgQALgKQAKgJAPAAQAPAAAKAJQALAKAAAQQAAARgLAKQgKAJgPABQgPgBgKgJgAgWBDQgEgYAHgSQAHgSANgOQANgPAPgNQAOgNAKgOQAKgOABgRQAAgZgPgQQgPgRggAAQgVAAgUAKQgUALgUAUIgXgVQAWgYAagOQAagOAhgBQAuABAaAYQAaAWAAApQAAAVgLARQgKARgPANIgdAcQgOANgIAQQgHARADAVg");
	this.shape.setTransform(641.675,293.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#51C1E1").s().p("AC6DBIgJgRIhUAGIhQAGIhEAFIgDgfIA2gDIBAgEIAAhKIhhAAIAAh+IBhAAIAAgtIhXAAIAAh2IDNAAIAAB2IhYAAIAAAtIBlAAIAAB+IhlAAIAABIIAjgDIAkgCIgPgXIgOgWIAagLIAZAjQAMATAKASQAJASAGAOIgcANIgGgQgABaA2IBHAAIAAhIIhHAAgAgJA2IBFAAIAAhIIhFAAgAACh2ICSAAIAAg/IiSAAgAi2DJIgEgPQgCgJgEgGIAfACIAVAAQAGABAEgBQAEgBACgEQAFgEAEgOQAEgPADgbQAEgbACgsIh0AAIAHgpIAFgxQAEgaACgWIBoAAIAAhOIh2AAIAAgdICUAAIAACIIhsAAIgFAqIgFAmIBzAAIgBAGIAAAJQgEA2gDAiQgEAigFASQgFASgGAHQgGAHgHADQgHADgKABIgYAAIgfgBg");
	this.shape_1.setTransform(605.85,294.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#51C1E1").s().p("AiRDeIAAjSIEoAAIAADRIghAAIAAgRIjoAAIAAASgAhyCwIDoAAIAAg4IjoAAgAhyBeIDoAAIAAg1IjoAAgAjVgeIAAgdIB8AAQgEgSgHgTQgJgUgJgRIAdgHQAJALAGAOQAGANAFANQAFANADALIgVAGICDAAIANgbIANgdIAKgbIAjAJIgTAmIgTAkIB+AAIAAAdgAi6iRIAAgcICxAAQgDgLgGgKIgLgVIAegGQAIAKAHANQAGANAEAMICkAAIAAAcg");
	this.shape_2.setTransform(557.25,293.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#51C1E1").s().p("AjKDSIgNgKQAagaANgdQANgdAEgeQAEgeAAgaIAAg+IFTAAIAACcIgfAAIAAgXIkbAAQgFAfgPAgQgOAggbAaQgDgFgIgHgAAYBJICBAAIAAhOIiBAAgAh7AfIgBAUIgBAWIB3AAIAAhOIh1AAgAimhIIAAgcICfAAIAAgzIi8AAIAAgcIC8AAIAAgqIAgAAIAAAqIC/AAIAAAcIi/AAIAAAzICqAAIAAAcg");
	this.shape_3.setTransform(507.925,293.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#51C1E1").s().p("AgQDcIAAksIAgAAIAAEsgACAgpQgigYgggdQgggdgeglQgnAzgzApQg0Apg4AbIgLgOIgNgNQAtgUArgeQAqgdAkglQAjgkAXgoIAdANIgGAKIgHAKQAsA3AzAmQA0AnA6AbIgNAOQgGAIgEAGQglgTgjgXg");
	this.shape_4.setTransform(460.65,293.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#51C1E1").s().p("AhqDHIgLgKQAbgeAOgkQAPgkAGgmIgkAAIAAgcIApAAIADgsIABgrIgtAAIAAgcIAtAAIAAhVIgsAAIAAgcICOAAIAAARIgBCsIgCBwQgBArgCAWQgDAXgEAHQgGAJgGAEQgHAEgIABIgUABIgZgBQAAgHgCgIQgCgIgDgGIAYABIAQAAQAEAAADgCQAEgBACgGQACgFADgNQABgOACgZIAChAIgzAAQgGArgRAqQgRApgdAjQgDgFgGgGgAgTgXIgEAsIAuAAIAAgnIABgwIgqAAIgBArgAgSheIAqAAIAAhVIgqAAgABUDRIAAmgIBlAAIAFgCIAUAMIgQAxIgQA0IgQAwQAZAiAJAdQAKAegBAaQAAAUgEAQQgEAQgKAHQgEAEgHACIgMADIgOABIgPAAIgCgOQgCgIgEgGIAOAAIANAAIAIgBIAFgEQAGgEACgLQACgLAAgOQABgXgJgcQgJgbgZgiIAOgtIAPgvIALgrIg/AAIAAGFgAjRCAIAAk4IBjAAIAAEIIhJAAIAAAwgAi3AyIAvAAIAAjMIgvAAg");
	this.shape_5.setTransform(412.75,294.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#51C1E1").s().p("ABxDbIAAj7IhjAAQAAAlgFAtQgFAsgNAsQgOAsgZAjIgNgLQgJgGgGgDQAagkANgqQAMgqAEgqQADgqAAglIAAh+QAggGAhgIQAhgHAdgJQAdgJAVgJIAcAZQgYAJgcAIQgdAJgfAHIg9ANIAABTIDDAAIAAAgIhAAAIAAD7gAjQCLIAAk7ICCAAIAAEWIhkAAIAAAlgAiyBHIBEAAIAAjYIhEAAg");
	this.shape_6.setTransform(364.475,293.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#51C1E1").s().p("AjaASIAAgjIG1AAIAAAjg");
	this.shape_7.setTransform(315.525,293);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#51C1E1").s().p("ABxDbIAAj7IhjAAQAAAlgFAtQgFAsgNAsQgOAsgZAjIgNgLQgJgGgGgDQAagkANgqQAMgqAEgqQADgqAAglIAAh+QAggGAhgIQAhgHAdgJQAdgJAVgJIAcAZQgYAJgcAIQgdAJgfAHIg9ANIAABTIDDAAIAAAgIhAAAIAAD7gAjQCLIAAk7ICCAAIAAEWIhkAAIAAAlgAiyBHIBEAAIAAjYIhEAAg");
	this.shape_8.setTransform(267.775,293.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E28623").s().p("ABQDZQgBgMgEgOQgFgNgGgLIAhACIAYAAIAKgCQAEgBAEgDQADgEADgKIAFgcIhBAZIg7AVIgTgxIAqgLIAxgPQgSgJgVgJIgpgPIAUgnQAQAEARAHQASAGAQAGIAcAMIgOAdIAjgLIACg7IiJAAIAEgpIADgyIABgwIB7AAIAAgpIiDAAIAAgyIC9AAIAACNIh+AAIgBAWIgCATICHAAIAAAEIAAALIAAAJQgCBCgDArQgEAqgEAWQgFAXgHAIQgJALgJAFQgKAFgNABQgMABgSAAIgmAAgAh+DUQAAgLgEgOQgEgOgHgLIAYABIARABQAGAAADgBQAEgCADgEQACgDACgIQADgHACgNQgfAMgfAKIg6AVIgSgyIAsgMIA2gQIgogRIgpgPIAUgnIAhAKIAiANIAbAMIgOAdIAbgIIACgcIACgiIiBAAIAEgpIADgyIACgwIByAAIAAgpIh+AAIAAgyIC4AAIAACNIh3AAIgBAWIgBATICAAAIgBAEIAAAKIAAAKQgDBAgEAqQgEAqgFAWQgFAWgHAIQgIALgIAEQgJAEgKACIgYACIgggBg");
	this.shape_9.setTransform(508.225,209.1);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E28623").s().p("ACuDJIgHgRIhOAHIhLAFIhAAFIgHg4IAzgCIA6gEIAAgzIhZAAIAAiLIBZAAIAAghIhPAAIAAiCIDTAAIAACCIhOAAIAAAhIBdAAIAACLIgWAAIAUAkQALAUAHASQAIASAFAPIgzAVIgDgPgABqCJIAngCIgIgRIgIgPIAngPIg+AAgABqAqIApAAIAAgvIgpAAgAANAqIAnAAIAAgvIgnAAgAAYiDIBqAAIAAgkIhqAAgAi3DRQgBgNgEgOQgFgOgGgMIAcACIAUAAIAJgBQAEgBADgDQAGgFAFgYQADgXADgvIhOAAIAAAAIgfAAIAHgyIAIg4IAEg5IBeAAIAAg2IhoAAIAAg0ICeAAIAACfIhmAAIgDAeIgCAdIBtAAIAAADIgBAKIgBAIQgCA1gEAhQgEAhgFAUQgFATgGAHQgIAJgJAEQgJAEgMACQgKABgQABIghgBg");
	this.shape_10.setTransform(460.8,209.8);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E28623").s().p("AA3DfQgBgMgFgQQgFgPgIgNQAYACATAAIAdABQAHAAAFgCQAFgCAEgEQAHgIAFgcQAFgdADg3IAGiKIhnAAQgKAWgLATQgKAUgMAPIgQgNIgUgOIAADhIiBAAIAAAjIg0AAIAAlmIA2AAQAFgTAEgUQAEgVABgSIA/AJIgMAkIgNAhIBLAAIAABOQAOgUAMgZQALgaAKgcQAKgcAHgcIA3AMIgJAfIgKAfICIAAIAAAFIAAALIAAAKIgFCIQgDA5gDAlQgDAkgFAVQgFAVgIAJQgKAOgLAFQgLAGgOACQgOACgUAAIgqgBgAicB/IBNAAIAAheIhNAAgAicgQIBNAAIAAhPIhNAAgAA+BDIgYgnIgZglIAtgaIAaAjIAZAmQAMATAIAOIgxAeQgHgPgLgTg");
	this.shape_11.setTransform(412.625,208.125);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E28623").s().p("AicDlIAAjfIE+AAIAADeIg9AAIAAgQIjHAAIAAARgAhiClIDHAAIAAgjIjHAAgAhiBWIDHAAIAAgfIjHAAgAjYgWIAAgzIBqAAIgIgaQgFgNgGgLIAvgJIhrAAIAAg0ICjAAIgHgSIgIgQIA7gKQAHALAFALIAJAWICbAAIAAA0IhkAAIAtAJIgMAaIgNAYIBnAAIAAAzgAg4hnQAGAQADAOIBjAAIALgeQAGgPAEgOIiQAAQAIAOAHAPg");
	this.shape_12.setTransform(363.825,208.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E28623").s().p("AgGAmIgkglIgjggIAygrQASAOASATIAmAmQASASANAQIg0AsQgPgSgRgTg");
	this.shape_13.setTransform(301.025,222.525);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#E28623").s().p("AjdAfIAAg9IG7AAIAAA9g");
	this.shape_14.setTransform(267.125,207.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(283));

	// 选项
	this.B = new lib.B();
	this.B.name = "B";
	this.B.setTransform(1345.9,647.2,1,1,0,0,0,242.9,250.1);
	new cjs.ButtonHelper(this.B, 0, 1, 2, false, new lib.B(), 3);

	this.A = new lib.A();
	this.A.name = "A";
	this.A.setTransform(574.2,653.75,1,1,0,0,0,243.2,242.9);
	new cjs.ButtonHelper(this.A, 0, 1, 2, false, new lib.A(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.A},{t:this.B}]}).wait(283));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(960,540,629.9000000000001,357.70000000000005);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#F7C677",
	opacity: 0.00,
	manifest: [
		{src:"images/一_atlas_P_1.png?1693895491371", id:"一_atlas_P_1"},
		{src:"sounds/fail.mp3?1693895491403", id:"fail"},
		{src:"sounds/victory.mp3?1693895491403", id:"victory"},
		{src:"sounds/yx121401听辨音的强弱1.mp3?1693895491403", id:"yx121401听辨音的强弱1"},
		{src:"sounds/yx121401听辨音的强弱2.mp3?1693895491403", id:"yx121401听辨音的强弱2"}
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