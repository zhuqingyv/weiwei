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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AqFKGIAA0LIULAAIAAULg");
	this.shape_4.setTransform(47.425,47.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(4));

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

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AqGKGIAA0LIUNAAIAAULg");
	this.shape_4.setTransform(42.275,52.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(34));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.4,-12.6,129.4,129.3);


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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("Ag3CIIgIgFQAHgKAFgLQAFgLAEgLIghAZIgPANIgHAGIgGgHIgHgIIAHgGQAEgEAEgIQACgFAAgJIAAhxIguAAIAAgUIBDAAIAACHIAYgSIADAHIAEAIQAGgZADgaQABgbAAgWIAAh2ICqAAIAAD5QABAKgDAFQgDAFgFADQgGACgMABQgKAAgRAAIgDgJIgFgKIAYAAIANAAQAEAAACgBQABgCAAgEIAAjmIiEAAIAABjQAAAYgCAcQgDAdgHAcQgIAbgQAWIgHgGgAAJBqIAAhYIBVAAIAABJIhEAAIAAAPgAAaBLIAzAAIAAgpIgzAAgAABgJIAAgQIArAAIAAgiIgkAAIAAgRIAkAAIAAgcIASAAIAAAcIAlAAIAAARIglAAIAAAiIAuAAIAAAQgAhTheIgRgRIgSgRIAOgNIASAQIARARIANAPIgOAOIgNgPg");
	this.shape.setTransform(167.15,24.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("ABJBqQgYgYgSgfQgTgggMglQgGAggPAeQgQAfgaAaQgZAagoATIgHgKIgJgIQAogRAZgaQAagaAOgeQAOgdAHgfIh4AAIAAgWIB7AAQAEgZABgYIAAgrIAWAAIgBArQgBAYgEAZICGAAIAAAWIh6AAQALAkASAeQASAfAYAXQAZAXAfANIgJAJIgHAMQgfgQgZgYg");
	this.shape_1.setTransform(135.675,24.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("ABzCAIgPgXIgQgVIASgIIARAVIAQAWIALATIgTAJIgMgTgAiPCLQALgMALgQQAMgRAIgQIATAFIgUAiQgLARgLANgAgpB/IgCgVIgEgUIAUgCIAEAUIADAUIABARIgVADIgBgRgAAhB+IgHgUIgIgUIAUgEIAIAUIAIAUIAEARIgUAFIgFgSgAgWA/IgIgHQAegRAQgSQASgTAIgSQAIgUACgTIg0AAIAAgUIA2AAIAAgJIAAg4IAUAAIAAA5IAAAIIBDAAIAAAUIhDAAQAJAlASAbQASAcAbAPIgHAIQgEAEgDAFQgXgOgQgXQgRgXgLgdQgFARgKAPQgKAQgQAPQgQAOgXANIgHgHgAiCA5IgJgIQATgIARgMQARgLAOgPIgTgNIgUgOIAMgLIAUAMIATAOIAKgOIAKgQIgUgNIgWgLIAKgNIAUAKIATAMIAIgVIAHgWIg3AAQgLAWgPAUQgPAVgRAPIgHgHIgHgGQAQgOAOgTQAOgUAKgUQALgVAGgUIAUAFIgFANIgFANIA1AAIAEgBIAMAGQgJAugTAjQgTAhgaAYQgZAXgfAOIgGgIgABphpIgUgWIAPgJIAUAVQAKAMAGAJIgQALIgPgWg");
	this.shape_2.setTransform(103.575,24.075);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AhsCSIAAj3IBQAAQAFgLADgLIAGgWIAXADIgHAVIgIAUIByAAIAAD2IgWAAIAAgRIisAAIAAASgAhWBsICsAAIAAgyIisAAgAhWAmICsAAIAAgwIisAAgAhWgeICsAAIAAgzIisAAg");
	this.shape_3.setTransform(71.9,24.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("AgkBrQgXgPgNgbQgNgbAAgmQAAglANgbQAOgbAWgOQAXgPAdAAQAPAAAMAEQALAEAKAGQAKAHAGAHIgOASQgKgLgMgGQgMgGgPAAQgWAAgRAMQgRAMgKAWQgJAVAAAeQAAAeAJAWQAKAWAQAMQARAMAWAAQARAAAOgHQANgHALgNIAPARQgOAQgRAJQgRAIgYAAQgbAAgXgOg");
	this.shape_4.setTransform(38.7,24.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_5.setTransform(23.85,34.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.6)").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_6.setTransform(11.15,24.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F7C677").s().p("Ag3CIIgIgFQAHgKAFgLQAFgLAEgLIghAZIgPANIgHAGIgGgHIgHgIIAHgGQAEgEAEgIQACgFAAgJIAAhxIguAAIAAgUIBDAAIAACHIAYgSIADAHIAEAIQAGgZADgaQABgbAAgWIAAh2ICqAAIAAD5QABAKgDAFQgDAFgFADQgGACgMABQgKAAgRAAIgDgJIgFgKIAYAAIANAAQAEAAACgBQABgCAAgEIAAjmIiEAAIAABjQAAAYgCAcQgDAdgHAcQgIAbgQAWIgHgGgAAJBqIAAhYIBVAAIAABJIhEAAIAAAPgAAaBLIAzAAIAAgpIgzAAgAABgJIAAgQIArAAIAAgiIgkAAIAAgRIAkAAIAAgcIASAAIAAAcIAlAAIAAARIglAAIAAAiIAuAAIAAAQgAhTheIgRgRIgSgRIAOgNIASAQIARARIANAPIgOAOIgNgPg");
	this.shape_7.setTransform(167.15,24.55);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F7C677").s().p("ABJBqQgYgYgSgfQgTgggMglQgGAggPAeQgQAfgaAaQgZAagoATIgHgKIgJgIQAogRAZgaQAagaAOgeQAOgdAHgfIh4AAIAAgWIB7AAQAEgZABgYIAAgrIAWAAIgBArQgBAYgEAZICGAAIAAAWIh6AAQALAkASAeQASAfAYAXQAZAXAfANIgJAJIgHAMQgfgQgZgYg");
	this.shape_8.setTransform(135.675,24.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F7C677").s().p("ABzCAIgPgXIgQgVIASgIIARAVIAQAWIALATIgTAJIgMgTgAiPCLQALgMALgQQAMgRAIgQIATAFIgUAiQgLARgLANgAgpB/IgCgVIgEgUIAUgCIAEAUIADAUIABARIgVADIgBgRgAAhB+IgHgUIgIgUIAUgEIAIAUIAIAUIAEARIgUAFIgFgSgAgWA/IgIgHQAegRAQgSQASgTAIgSQAIgUACgTIg0AAIAAgUIA2AAIAAgJIAAg4IAUAAIAAA5IAAAIIBDAAIAAAUIhDAAQAJAlASAbQASAcAbAPIgHAIQgEAEgDAFQgXgOgQgXQgRgXgLgdQgFARgKAPQgKAQgQAPQgQAOgXANIgHgHgAiCA5IgJgIQATgIARgMQARgLAOgPIgTgNIgUgOIAMgLIAUAMIATAOIAKgOIAKgQIgUgNIgWgLIAKgNIAUAKIATAMIAIgVIAHgWIg3AAQgLAWgPAUQgPAVgRAPIgHgHIgHgGQAQgOAOgTQAOgUAKgUQALgVAGgUIAUAFIgFANIgFANIA1AAIAEgBIAMAGQgJAugTAjQgTAhgaAYQgZAXgfAOIgGgIgABphpIgUgWIAPgJIAUAVQAKAMAGAJIgQALIgPgWg");
	this.shape_9.setTransform(103.575,24.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F7C677").s().p("AhsCSIAAj3IBQAAQAFgLADgLIAGgWIAXADIgHAVIgIAUIByAAIAAD2IgWAAIAAgRIisAAIAAASgAhWBsICsAAIAAgyIisAAgAhWAmICsAAIAAgwIisAAgAhWgeICsAAIAAgzIisAAg");
	this.shape_10.setTransform(71.9,24.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F7C677").s().p("AgkBrQgXgPgNgbQgNgbAAgmQAAglANgbQAOgbAWgOQAXgPAdAAQAPAAAMAEQALAEAKAGQAKAHAGAHIgOASQgKgLgMgGQgMgGgPAAQgWAAgRAMQgRAMgKAWQgJAVAAAeQAAAeAJAWQAKAWAQAMQARAMAWAAQARAAAOgHQANgHALgNIAPARQgOAQgRAJQgRAIgYAAQgbAAgXgOg");
	this.shape_11.setTransform(38.7,24.625);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F7C677").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_12.setTransform(23.85,34.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F7C677").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_13.setTransform(11.15,24.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},1).wait(3));

	// 图层_2
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_14.setTransform(118.425,18.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-9,236.9,57);


(lib._1_B = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// A
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("ABlD3QgCgPgIgJQgJgJgRgIQgQgIgXgFIAAgHIAfACIAgACIAWABQAIAAAFgCQAFgCAFgEQAPgPAGhTQAHhTACiYIhcAAQgXAngcAgQgaAfggAZIgEgDIAADyQgBADgKAGQgLAFgQAEQgPAEgOABIgOAAIAAgwIhKAAIAAApQAAAFgJAHQgIAGgQAFQgOAFgSAAIgNAAIAAnJIBMAfIADglIACgpIACglIB0AcQgCAHgGAEQgHADgKAAIghAlIgiAmIAoAAIAlgpIBJA6QgDAEgGADQgFADgKADIAABkQAPggANgpQANgpALgtQAKgtAHgsIBwAgQgCAGgFADQgHAEgKAAQgHATgJARIgSAjIBLAAIAtguIBIBBQgDAEgHADQgGADgLACQgBBegCBDQgDBDgFAtQgFAtgIAbQgJAbgOANQgQARgXAJQgXAHghAAQAAgVgEgPgAjECuIBKAAIAAidIhKAAgAjEAAIBKAAIAAiTIhKAAgAAkBRQgBghgLghQgLgfgPgaIADgDQA5AOAbAWQAcAWAEAXQAFAYgLARQgMARgTADIgFAAQgTAAgUgQg");
	this.shape.setTransform(231.25,48.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AiYETQA6gVAkgYQAjgZATgcQASgdAIgjQAHgiABgoQABgoAAgvIBnAJQAAAGgFAEQgFAEgKACQADAiAHAdQAHAcAMAYQALgQAKgSIARgkIANgfIBaA7QgCAEgFADQgGACgKgBQgXAMgbANQgdANgfALQAVAgAiAWQAiAVAzAOIgBAHQgcAGgPAUQgQATgDAiQgngUgYghQgYgjgMgsQgNgtgFg2QgDArgMAjQgLAjgaAdQgcAcgxAXQgyAXhPAQgAjnETQgMgHgFgSQAGgfACgcQABgcgDgTQgEgUgHgEQgHgFgHgDIgSgDIAAgLIAcAAQAHAAAEgBQAEgCAFgJIAIgPIALgVIAUgsIAlhPIA7iBIAJACIgVBFIgXBNIgTBFIgLAtQgEAQgDAQQgDAQAAANQABARAIANIANAgQAGASABAbQgCAXgQAPQgQAPgaABIgBAAQgMAAgKgHgAhiCOQgPgJgCgQQgDgRASgWQAYgJATgVQAUgWAHglIAHABQAQA0gEAjQgDAhgPASQgQARgTADIgJAAQgNAAgMgGgAiAgNQA/gaAjgcQAigeAQggQAOgiAEgmQADglAAgsIBlAIQgBAHgEADQgFAEgKACQgBAfgFAcQgDAdgKAZIAUADIASADQAKgTAJgVIASgoIAMgkIBWA3QgCAEgGACQgFACgLgBQgTAOgXAPQgYAOgaANQAzAMAcASQAaATAHATQAHAUgHAQQgIAQgQAFQgSAGgUgJQgJgOgQgTQgRgSgXgUQgXgVgbgTQgOAZgbAWQgaAWgrASQgrAThCAPgAj3g4QgEgZgMgYQgMgYgPgRIAFgDQAzADAaAPQAaAOAHASQAFATgKAPQgIAPgTAEIgIABQgPAAgRgLgAhKhvQgNgHgDgQQgCgQAQgVQATgJANgVQAOgVAFghIAHAAQARAygCAgQAAAggNAQQgMAQgRADIgIABQgMAAgJgGgAi9i4QgIgagPgZQgRgYgRgRIAEgEQA3ABAdANQAcANAIASQAIATgIAQQgHARgSAFQgHACgGAAQgOAAgPgIg");
	this.shape_1.setTransform(170,48.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgrEdIAAkgIBTAfIBpAAIAmgqIBFA1QgDADgFAEQgFADgKABIAADOQAAADgJAEQgHAEgPAEQgPADgVAAIgOAAIAAgvIhzAAIAAAoQAAAEgRAIQgQAGgdAAgAAhDSIBzAAIAAhOIhzAAgAAhBzIBzAAIAAhGIhzAAgAkWDnIAAnVIBSAjIAgAAIAjgnIBHA4QgDAEgGADQgGADgJACIAAFgQgBADgKAFQgKAFgPAEQgOAFgOAAIgMAAIAAg0IguAAIAAA9QAAADgHAFQgHAGgOAEQgNAEgTAAgAjMCDIAuAAIAAiYIguAAgAjMgmIAuAAIAAiUIguAAgAhJgfIgFgRICvAAQAGgSAFgUIAJgrIAHgmIBlAXQgCAFgFAEQgFADgKABQgRATgZAXQgYAXgbASIA5AAIAngxIANAKIAdAVIAfAZQgBAFgFADQgEACgHAAgAgIhHQgBgZgHgYQgHgXgJgSIAGgDQAtALAWARQAVARACARQACATgLAMQgLANgRABIgCAAQgRAAgQgOgAg1ivIgFgRICFAAIgMgEIgMgHQgCgWgIgVQgIgUgJgQIAEgCQAxACAYANQAYANAFAQQAFAQgKANQgJAPgSAEIAsAAIAogxIANAKIAcAVIAfAZQgBAFgEADQgFACgGAAg");
	this.shape_2.setTransform(110.975,48.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AgmAnQgQgQAAgWQAAgWAQgQQAPgQAXAAQAXAAAQAQQAPAQABAWQgBAWgPAQQgQAPgXAAQgXAAgPgPg");
	this.shape_3.setTransform(54.875,66.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AjEDgIAAgUIA2gGIABhgIABhgIAAgVIgBhcIgBhbIg2gFIAAgUIDSAAQA6AAAiAOQAiANAQAYQAPAXAAAfQAAAXgLAVQgMATgcARQgbAPgwAIQBQAJAkAdQAkAdAAAvQAAAfgRAcQgSAcgsATQgtAShPABgAgpBoIABBhIAfAAQAwAAAbgZQAbgaAAgxQAAg0gagYQgagZg2AAIgcAAIAABogAgphvIAABbIAXAAQAugBAWgYQAYgYAAguQAAgpgVgWQgUgWgtAAIgcAAIgBBZg");
	this.shape_4.setTransform(24.1507,48.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("A81IzIAAxkMA5qAAAIAARkg");
	this.shape_5.setTransform(164.85,46.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.7,-9.8,369.09999999999997,112.5);


(lib._1_A = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// A失败
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("ABmD3QgEgPgIgJQgIgJgQgIQgRgIgYgFIABgHIAgACIAfACIAXABQAHAAAFgCQAGgCADgEQAQgPAHhTQAGhTACiYIhcAAQgYAngbAgQgbAfgfAZIgDgDIAADyQgBADgLAGQgLAFgQAEQgPAEgOABIgNAAIAAgwIhLAAIAAApQAAAFgJAHQgIAGgPAFQgPAFgSAAIgMAAIAAnJIBLAfIADglIADgpIABglIB0AcQgCAHgGAEQgHADgLAAIggAlIgiAmIAnAAIAlgpIBKA6QgCAEgHADQgGADgIADIAABkQAOggAOgpQAMgpALgtQALgtAGgsIBwAgQgCAGgFADQgHAEgKAAQgHATgJARIgSAjIBLAAIAtguIBJBBQgEAEgGADQgHADgKACQgCBegDBDQgCBDgFAtQgFAtgIAbQgJAbgNANQgRARgXAJQgXAHghAAQAAgVgDgPgAjECuIBLAAIAAidIhLAAgAjEAAIBLAAIAAiTIhLAAgAAkBRQgBghgLghQgLgfgPgaIADgDQA5AOAbAWQAbAWAFAXQAEAYgKARQgLARgVADIgEAAQgTAAgUgQg");
	this.shape.setTransform(234.25,48.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AhIEbQArgrAVgzQAUgyAGg3QAGg4AAg5IAAjkIBcAfIA0AAIAkgpIBLA6QgDAEgGAEQgGADgJACIAAGHQAAAbgGATQgHATgVAMQgWAKgqAEQgBgUgDgOQgDgPgGgIQgGgJgKgHQgLgHgVgDIAAgIIAJAAIATABIAWABIAPABQAHAAADgDQACgEAAgFIAAiFIhKAAQgEAtgRAqQgQArgjAmQgiAlg8AdgABogeIgBAhIgBAhIBHAAIAAhxIhFAAgABoheIBFAAIAAhzIhFAAgAkWCrQANgIAEgHQAEgIAAgLIAAljIBcAjIAbAAQgQgBgRgOQACgYgHgWQgHgWgKgRIAEgDQAyAGAXARQAXAQACASQACASgMANQgLAOgTABIgEABIgDgBIADABIAEgBIAjAAIAkgnIBLA5QgDAEgGADQgGADgJACIAACwQAAACgLAFQgMAEgPAEQgQADgNABIgPAAIAAgWIhSAAIAAB7IAjgJIAlgLQgGgTgKgRQgIgSgLgPIAGgDQA3AQAcAZQAcAYAFAYQAGAagLARQgKASgSADQgUAEgWgSQAAgLgCgLIgDgWQgYAUggAXQggAYgnAbQgEAEgFAEIgJAGgAitADIBSAAIAAhMIhSAAgAithZIBSAAIAAhMIhSAAg");
	this.shape_1.setTransform(173.05,48.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("ACFD4QgEgPgIgKQgIgIgOgIQgOgHgbgFIAAgHIAMAAIAdACIAeACIAVAAQAIAAADgDQADgEAAgGIAAiCIhiAAQgHAugUArQgVAqgpAkQgqAmhGAcIgFgFQArghAbgmQAaglAOgpQAOgpAEgsQAFgrAAgvIAAjgIBcAgIBJAAIAlgqIBMA8IgJAGQgGAEgJACIAAGNQAAAcgHATQgIAUgXALQgXAMgvAEQgBgUgFgOgABJgvIgBAoQgBATgDAVIBgAAIAAh3IhbAAgABJhnIBbAAIAAh3IhbAAgAkOCpIAAmtIBXAhIArAAIAlgoIBKA5QgDAEgGAEQgGADgJACIAAEzQgBADgKAGQgLAGgPAFQgPAFgQAAIgNAAIAAg1Ig4AAIAAA8QAAAEgIAGQgIAGgPAGQgOAFgVAAgAi+BBIA4AAIAAiBIg4AAgAi+hRIA4AAIAAiBIg4AAg");
	this.shape_2.setTransform(114.125,48.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AgmAnQgQgQAAgWQAAgWAQgQQAPgQAXAAQAXAAAQAQQAPAQABAWQgBAWgPAQQgQAPgXAAQgXAAgPgPg");
	this.shape_3.setTransform(57.875,66.575);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AAPDhIAAgUIA1gGIgkh0IiJAAIghByIA5AIIAAAUIiKAAIAAgUIAygHICImmIA9AAICQGnIAwAGIAAAUgAAaA+IhBjMIg7DMIB8AAg");
	this.shape_4.setTransform(24.95,48.55);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("A81IzIAAxkMA5qAAAIAARkg");
	this.shape_5.setTransform(164.85,46.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.7,-9.8,369.09999999999997,112.5);


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
	var mask_graphics_28 = new cjs.Graphics().p("AnhLfIAA29IPDAAIAAW9g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-40.5,y:-0.775}).wait(1).to({graphics:mask_graphics_1,x:-36.55,y:-0.775}).wait(1).to({graphics:mask_graphics_2,x:-32.575,y:-0.775}).wait(1).to({graphics:mask_graphics_3,x:-28.625,y:-0.775}).wait(1).to({graphics:mask_graphics_4,x:-24.675,y:-0.775}).wait(1).to({graphics:mask_graphics_5,x:-20.725,y:-0.775}).wait(1).to({graphics:mask_graphics_6,x:-16.75,y:-0.775}).wait(1).to({graphics:mask_graphics_7,x:-12.8,y:-0.775}).wait(1).to({graphics:mask_graphics_8,x:-8.85,y:-0.775}).wait(1).to({graphics:mask_graphics_9,x:-4.9,y:-0.775}).wait(1).to({graphics:mask_graphics_10,x:-0.925,y:-0.775}).wait(1).to({graphics:mask_graphics_11,x:3.025,y:-0.775}).wait(17).to({graphics:mask_graphics_28,x:3.025,y:-0.775}).wait(1).to({graphics:null,x:0,y:0}).wait(36));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#39B54A").s().p("AiHFKIgKgCIgLgCIgKgEQgLgEgDgDQgOgKgFgFQgMgLgKgPIgKgXQgPghgWgfQgeglgnggIgVgOQgPgJgJgPIgGgPQgFgSAFgRIAGgQQAHgLAKgHQAJgIAOgDQAMgFAOADQAOABAKAHQAbAQAeAaQAnAhAnA0QAMARANAWIAuhKQAmg6AlgvQAvhAAsgwQAsgvAwgrQA3gxBCgwQAPgIASAAIASACQAQAFAMAMIALANQAHAMAAAMQADANgEAOQgDANgIAJQgIALgLAGIgfAYQgeAXgXAUQgxArgtAwQgoAqgmAvIgtA/QgrA+gpBIIgbAsQgKAOgFAFQgQARgaAJQgKAEgMAAIgDAAg");
	this.shape.setTransform(5.4143,4.5025);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(28).to({_off:true},1).wait(36));

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
(lib.学一学 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:5,"1A":406,"1B":435};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,5,6,405,407,434,436,465];
	this.streamSoundSymbolsList[6] = [{id:"yx320102音乐色彩听辨题目",startFrame:6,endFrame:405,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		
		
		var _this = this;
		
		_this.lnav1_btn.on('click', function(){
		
		_this.gotoAndStop('lnav1');
		});
		
		
		_this.a_btn.on('click', function(){
		
		_this.gotoAndPlay('1A');
			
		});
		
		
		_this.b_btn.on('click', function(){
		
		_this.gotoAndPlay('1B');
			
		});
		
		
		
		_this.m1_btn.on('click', function(){
			
		_this.gotoAndPlay('m1');
			
		});
	}
	this.frame_5 = function() {
		var _this = this;
		
		_this.mstop_btn.on('click', function(){
		_this.gotoAndStop('lnav1');
		});
	}
	this.frame_6 = function() {
		var soundInstance = playSound("yx320102音乐色彩听辨题目",0);
		this.InsertIntoSoundStreamData(soundInstance,6,405,1);
	}
	this.frame_405 = function() {
		this.gotoAndStop(0);
	}
	this.frame_407 = function() {
		playSound("victory");
	}
	this.frame_434 = function() {
		this.stop();
	}
	this.frame_436 = function() {
		playSound("fail");
	}
	this.frame_465 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(5).call(this.frame_5).wait(1).call(this.frame_6).wait(399).call(this.frame_405).wait(2).call(this.frame_407).wait(27).call(this.frame_434).wait(2).call(this.frame_436).wait(29).call(this.frame_465).wait(1));

	// leftnav_on
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E28726").s().p("Ag3CIIgIgFQAHgKAFgLQAFgKAEgMIghAZIgPANIgHAHIgGgIIgHgHIAHgHQAEgFAEgGQACgHABgIIAAhwIguAAIAAgVIBCAAIAACGIAZgSIACAIIAEAHQAHgZACgaQACgaAAgVIAAh2ICqAAIAAD5QgBAIgCAGQgDAFgFACQgHADgKAAQgLACgRgBIgDgKIgEgKIAXABIANAAQAEAAACgCQABgBAAgEIAAjlIiEAAIAABjQAAAXgCAdQgDAcgHAbQgIAcgPAWIgIgGgAAJBqIAAhYIBWAAIAABJIhFAAIAAAPgAAaBLIAzAAIAAgpIgzAAgAABgIIAAgRIArAAIAAgjIgkAAIAAgQIAkAAIAAgcIARAAIAAAcIAlAAIAAAQIglAAIAAAjIAuAAIAAARgAhTheIgRgSIgSgPIAOgOIASAQIASARIAMAPIgOAOIgNgPg");
	this.shape.setTransform(269.45,442.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28726").s().p("ABJBrQgYgZgSgfQgTgggMgkQgGAegPAfQgQAfgaAaQgZAagoASIgHgJIgJgIQAogSAZgaQAagZAOgeQAOgdAHgfIh4AAIAAgWIB7AAQAEgZABgYIAAgqIAWAAIgBArQgBAWgEAaICGAAIAAAWIh6AAQALAkASAfQASAeAYAXQAZAXAfAOIgJAJIgHAKQgfgOgZgYg");
	this.shape_1.setTransform(237.975,442.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28726").s().p("ABzCAIgPgXIgQgVIASgIIARAVIAQAWIALATIgTAJIgMgTgAiPCLQALgMALgQQAMgRAIgQIATAFIgUAiQgLARgLANgAgpB/IgCgVIgEgUIAUgCIAEAUIADAUIABARIgVADIgBgRgAAhB+IgHgUIgIgUIAUgEIAIAUIAIAUIAEARIgUAFIgFgSgAgWA/IgIgHQAegRAQgSQASgTAIgSQAIgUACgTIg0AAIAAgUIA2AAIAAgJIAAg4IAUAAIAAA5IAAAIIBDAAIAAAUIhDAAQAJAlASAbQASAcAbAPIgHAIQgEAEgDAFQgXgOgQgXQgRgXgLgdQgFARgKAPQgKAQgQAPQgQAOgXANIgHgHgAiCA5IgJgIQATgIARgMQARgLAOgPIgTgNIgUgOIAMgLIAUAMIATAOIAKgOIAKgQIgUgNIgWgLIAKgNIAUAKIATAMIAIgVIAHgWIg3AAQgLAWgPAUQgPAVgRAPIgHgHIgHgGQAQgOAOgTQAOgUAKgUQALgVAGgUIAUAFIgFANIgFANIA1AAIAEgBIAMAGQgJAugTAjQgTAhgaAYQgZAXgfAOIgGgIgABphpIgUgWIAPgJIAUAVQAKAMAGAJIgQALIgPgWg");
	this.shape_2.setTransform(205.875,442.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28726").s().p("AhsCSIAAj3IBRAAQAEgLADgLIAGgWIAXADIgIAVIgHAUIByAAIAAD2IgVAAIAAgRIitAAIAAASgAhWBsICtAAIAAgyIitAAgAhWAmICtAAIAAgwIitAAgAhWgeICtAAIAAgzIitAAg");
	this.shape_3.setTransform(174.2,442.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E28726").s().p("AgkBrQgXgPgNgbQgNgbAAgmQAAglANgbQANgbAXgOQAYgPAcAAQAPAAAMAEQALAEAKAGQAJAHAHAHIgPASQgIgLgNgGQgMgGgPAAQgWAAgRAMQgRAMgJAWQgKAVAAAeQAAAeAKAWQAIAWARAMQARAMAWAAQARAAANgHQAOgHALgNIAPARQgOAQgRAJQgSAIgWAAQgdAAgWgOg");
	this.shape_4.setTransform(141,442.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E28726").s().p("AgNAPQgFgFgBgJQABgJAFgGQAGgFAHgBQAIABAGAFQAGAGgBAJQABAJgGAFQgGAGgIAAQgHAAgGgGg");
	this.shape_5.setTransform(126.15,452.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E28726").s().p("Ag+B1IAAgVIA1AAIAAizIgqAAIAAgRQAPgDAMgEQAMgDAJgGIATAAIAADUIAvAAIAAAVg");
	this.shape_6.setTransform(113.45,442.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(466));

	// leftnav
	this.lnav1_btn = new lib.lnav1();
	this.lnav1_btn.name = "lnav1_btn";
	this.lnav1_btn.setTransform(149.5,442.1,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav1_btn, 0, 1, 2, false, new lib.lnav1(), 3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(153,153,153,0.498)").s().p("AAgBoIAAgxQgJALgNALQgMAKgNAHIgFgFIgGgFQAOgGAMgJQAMgJAIgKIAMAEIAAgrIgWACIgWABIgBgFIgDgGIAjgDIAigDIAbgFIANAKIgWAEIgZADIAAAYIAEAFIADAEIAUgNIARgMIAKAIIgTANIgVAMQAKAKANAHQAMAHAOAFQgDABgCAEIgEAGQgQgGgNgKQgOgKgLgMIAAA0gAhCBoIgNgBIgBgHIgDgGIANABIAJAAIAEgBIADgCQADgCACgJIAEgYIADgpIg3AAIADgYIADgdIACgcIANABIgCAXIgCAXIgCAWIAYAAIAEgbIACgeIADgeIg0AAIAAgOIBCAAIgCAiIgEAkIgDAfIAGAAIALAAIAAACIAAAEQgCAegCATQgCATgDAKQgCAKgEADIgGAFIgIACIgKAAgAhsAxIAagGIAegIIABANIgcAIIgaAHgAgSA0IgFgFIAVgMQAKgHAHgHIANAEQgJAJgLAIQgKAJgLAFIgFgEgAAZgFIAAgOIgaAEIgYADIgDgMIAOgCIAAhBIgLAAIAAgMIBGAAIAAAMIgIAAIAAA7IAIgBIAAALIgIABIAAAQgAgCgbIAbgEIAAgNIgbAAgAgCg2IAbAAIAAgOIgbAAgAgChOIAbAAIAAgNIgbAAgAAxgPIgFgFQAHgFAHgGQAHgHAGgJIgLgNIgLgMIAJgHIAKALIAKALIAHgPQADgHACgIIgmAAIAAgNIApAAIADAAIACAAIAIACQgDAPgFAMQgFANgGALIAMAOIAJAMIgKAJIgIgLIgKgNIgNAPQgHAGgIAFIgDgFg");
	this.shape_7.setTransform(189.925,374.775);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(153,153,153,0.498)").s().p("AhjBlIgFgIQBDgIArgYQAsgZAVgqIAPAHQgXAtguAbQgsAZhFALIgDgIgAgFA5IAAhLIhhAAIAAgQIAlAAIAAg2IAQAAIAAA2IAuAAIAAhJIAPAAIAAAaIBHAAIAAAPIhHAAIAAAgIBdAAIAAAQIheAAIAABLgAhYAyIgGgFQAOgLAMgOQANgOAJgNIAPAEQgKAQgOAQQgNAQgOALIgGgGg");
	this.shape_8.setTransform(166.075,374.25);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(153,153,153,0.498)").s().p("AgBBlIgHgFQAPgPAKgWQAJgVAEgZQAGgZAAgbIgiAAIAAgQIAjAAIABgZIAAgaIAQAAIgBAaIAAAZIA1AAIAAAJIgDA9IgDAqIgDAaQgDAJgDADQgEAFgEACIgJACIgOAAIgTgBIgCgHIgDgIIATABIANAAIAFAAIAEgDQADgEADgNIAEgoIADhEIgmAAQgCAdgEAbQgFAbgKAXQgKAXgSARIgEgGgAhjBGIgDgIQACgBADgEIAGgLIAFgPIAHgXIAIgaIgiAAIAAgPIBpAAIAAAPIg3AAQgFASgGAUIgOAkIA8gMIgHgUIgIgTIAOgDIAJAXIAJAYIAFAUIgNAFIgCgIIgDgJIgoAJIgYAFIgLAEIgGACIgCgHgAhghMIAAgOIBbAAIAAAOg");
	this.shape_9.setTransform(142.25,374.525);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(153,153,153,0.498)").s().p("AhqBiIAAgQICJAAIAEgTIACgVIhsAAIAHgbIAGgfIAGgiIAGgfIg0AAIAAgPIDGAAIAAAPIiBAAIgEATIgDAVIBVAAIADgBIAMABIgDAbIgEAgIgEAgIgFAgIA7AAIAAAQgAgsABIgGAaIBZAAIAEgcIADgZIhWAAIgEAbg");
	this.shape_10.setTransform(118.3,374.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("AhbEJQgEgQgMgLQgHgHgJgGQgKgFgOgFQgPgFgWgFIAAgHIAQABIAlACIAnACIAaABQAIAAADgCQADgDAAgGIAAhkIjxAAIgFgSID2AAIAAhCIBAAFIAaghIAYgjIj2AAIgGgSIEAAAIAzgwIApAnIAKgeIAIgeIl5AAQAFAmgKAZQgLAagUALQgNAHgNAAQgOAAgKgIQgLgHgFgOQgGgUAKgPQAJgPARgIQAMgIAKgNQAKgOAFgSQAFgTgDgVIAIAAQAIAOAFAOIAJAbIEKAAQALgWAKgZQALgZAIgaQAJgZAGgWIBzArQgCAGgGADQgHADgLgBQgXAVggAYQggAZghAVIBXAAIAxgxIBUBPQgDAFgGACQgGACgKAAQgWANgdAOQgeAOgdAKIAdAcQgEAEgFACQgGACgKABQgaAMgiANIhDAYIASACQAAAHgGAEQgFADgKACIAAAoIB2AAIAwhAIAQAMIAjAcQAVARARAPQgCAFgFADQgFACgHAAIjsAAIAABoQABAggJAWQgKAWgbAOQgcANg3AFQgDgXgFgRgAiiixQgDgggNgeQgOgegRgYIAFgDQA8AJAdATQAdAUAGAXQAGAWgLASQgLARgVAEIgIABQgRAAgUgOgAgki8QAAgegHgeQgIgdgLgYIAFgDQA5AOAZAWQAaAWACAWQADAXgOAPQgNAQgWABIgDAAQgTAAgVgTg");
	this.shape_11.setTransform(261.5242,294.475);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333333").s().p("AkqA1IgFgVIG7AAIA7hUIALAKIAcAYIAiAeIAgAfQgBAFgFACQgGACgIABg");
	this.shape_12.setTransform(197.475,288.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#333333").s().p("AhbEJQgEgQgMgLQgHgHgJgGQgKgFgOgFQgPgFgWgFIAAgHIAQABIAlACIAnACIAaABQAIAAADgCQADgDAAgGIAAhkIjxAAIgFgSID2AAIAAhCIBAAFIAaghIAYgjIj2AAIgGgSIEAAAIAzgwIApAnIAKgeIAIgeIl5AAQAFAmgKAZQgLAagUALQgNAHgNAAQgOAAgKgIQgLgHgFgOQgGgUAKgPQAJgPARgIQAMgIAKgNQAKgOAFgSQAFgTgDgVIAIAAQAIAOAFAOIAJAbIEKAAQALgWAKgZQALgZAIgaQAJgZAGgWIBzArQgCAGgGADQgHADgLgBQgXAVggAYQggAZghAVIBXAAIAxgxIBUBPQgDAFgGACQgGACgKAAQgWANgdAOQgeAOgdAKIAdAcQgEAEgFACQgGACgKABQgaAMgiANIhDAYIASACQAAAHgGAEQgFADgKACIAAAoIB2AAIAwhAIAQAMIAjAcQAVARARAPQgCAFgFADQgFACgHAAIjsAAIAABoQABAggJAWQgKAWgbAOQgcANg3AFQgDgXgFgRgAiiixQgDgggNgeQgOgegRgYIAFgDQA8AJAdATQAdAUAGAXQAGAWgLASQgLARgVAEIgIABQgRAAgUgOgAgki8QAAgegHgeQgIgdgLgYIAFgDQA5AOAZAWQAaAWACAWQADAXgOAPQgNAQgWABIgDAAQgTAAgVgTg");
	this.shape_13.setTransform(133.5242,294.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#CCCCCC").ss(1,1,1).p("AzdAAMAm7AAA");
	this.shape_14.setTransform(228.875,350.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.lnav1_btn}]}).wait(466));

	// 正确失败动画
	this.instance = new lib.对("synched",0);
	this.instance.setTransform(971.3,430.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#39B54A").s().p("ABmD3QgEgPgIgJQgIgJgQgIQgRgIgYgFIABgHIAgACIAfACIAXABQAHAAAFgCQAFgCAEgEQAQgPAHhTQAGhTACiYIhcAAQgYAngbAgQgbAfgfAZIgDgDIAADyQgBADgLAGQgLAFgPAEQgQAEgOABIgNAAIAAgwIhKAAIAAApQgBAFgIAHQgKAGgOAFQgPAFgSAAIgMAAIAAnJIBLAfIADglIADgpIABglIB0AcQgCAHgHAEQgGADgLAAIgfAlIgjAmIAnAAIAlgpIBKA6QgCAEgHADQgGADgIADIAABkQAOggAOgpQAMgpALgtQAKgtAIgsIBvAgQgBAGgHADQgFAEgLAAQgHATgJARIgSAjIBLAAIAtguIBJBBQgEAEgGADQgHADgKACQgCBegDBDQgCBDgFAtQgFAtgJAbQgIAbgNANQgRARgXAJQgXAHgiAAQABgVgDgPgAjDCuIBKAAIAAidIhKAAgAjDAAIBKAAIAAiTIhKAAgAAkBRQgBghgLghQgLgfgPgaIAEgDQA4AOAbAWQAcAWAEAXQAEAYgKARQgLARgVADIgEAAQgTAAgUgQg");
	this.shape_15.setTransform(859.85,446.225);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#39B54A").s().p("AhIEaQArgqAVgzQAUgyAGg3QAGg4AAg5IAAjkIBcAgIAzAAIAlgqIBLA6QgDAEgGAEQgGADgJACIAAGHQABAbgHATQgHATgVALQgWAMgqAEQgBgVgDgOQgDgOgGgJQgGgJgKgHQgLgGgVgEIAAgIIAJAAIATACIAWAAIAPABQAHAAADgDQACgDAAgGIAAiFIhKAAQgEAtgRArQgQAqgjAmQgiAlg8AdgABogeIgBAgIgBAiIBHAAIAAhyIhFAAgABoheIBFAAIAAhzIhFAAgAkWCrQANgIAEgIQAEgHAAgMIAAliIBcAkIAbAAQgQgCgRgOQACgXgHgXQgGgWgLgRIAEgDQAyAGAXARQAXAQACASQACASgMANQgLAOgTACIgEAAIgDAAIADAAIAEAAIAjAAIAkgpIBKA6QgCADgGAEQgGADgJACIAACwQAAACgLAEQgMAFgQAEQgPAEgNAAIgPAAIAAgXIhSAAIAAB9IAjgKIAlgKQgHgUgJgRQgJgSgKgPIAGgCQA3APAbAYQAdAZAFAZQAGAZgLARQgKASgTAEQgSADgXgSQAAgLgCgLIgDgWQgYATggAYQggAZgnAaQgEAFgFADIgJAGgAitACIBSAAIAAhKIhSAAgAithZIBSAAIAAhMIhSAAg");
	this.shape_16.setTransform(798.65,446);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#39B54A").s().p("ACFD4QgEgPgIgJQgIgJgOgIQgOgGgbgFIAAgIIAMAAIAdACIAeABIAVABQAIAAADgDQADgEAAgGIAAiCIhiAAQgHAugUAqQgVArgpAkQgqAmhGAbIgFgEQArghAbgmQAaglAOgpQAOgpAEgrQAFgsAAguIAAjgIBcAfIBJAAIAlgqIBMA7IgJAHQgGAEgJACIAAGNQAAAbgHAUQgIATgXAMQgXAMgvAEQgBgUgFgOgABJgvIgBAoQgBATgDAVIBgAAIAAh4IhbAAgABJhoIBbAAIAAh3IhbAAgAkOCpIAAmtIBXAhIArAAIAlgpIBKA6QgDAEgGADQgGADgJADIAAEyQgBAEgKAGQgLAGgPAFQgPAFgQAAIgNAAIAAg1Ig4AAIAAA9QAAADgIAGQgIAGgPAFQgOAGgVAAgAi+BBIA4AAIAAiBIg4AAgAi+hRIA4AAIAAiBIg4AAg");
	this.shape_17.setTransform(739.725,446.45);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#39B54A").s().p("AgmAnQgQgQAAgWQAAgWAQgQQAPgQAXAAQAXAAAQAQQAPAQABAWQgBAWgPAQQgQAPgXAAQgXAAgPgPg");
	this.shape_18.setTransform(683.475,464.525);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#39B54A").s().p("AAQDhIAAgVIA0gFIgkh0IiJAAIghByIA5AHIAAAVIiKAAIAAgVIAygGICHmmIA+AAICQGnIAwAFIAAAVgAAaA+IhBjMIg7DMIB8AAg");
	this.shape_19.setTransform(650.55,446.5);

	this.instance_1 = new lib.错("synched",0);
	this.instance_1.setTransform(967.8,571.75);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#CC3300").s().p("ABmD3QgEgPgHgJQgJgJgRgIQgQgIgXgFIAAgHIAfACIAgACIAWABQAIAAAFgCQAFgCAFgEQAPgPAGhTQAHhTACiYIhcAAQgYAngbAgQgbAfgfAZIgEgDIAADyQgBADgKAGQgLAFgPAEQgPAEgPABIgOAAIAAgwIhJAAIAAApQgBAFgIAHQgKAGgPAFQgPAFgRAAIgNAAIAAnJIBMAfIADglIACgpIACglIB0AcQgCAHgHAEQgGADgLAAIgfAlIgjAmIAnAAIAmgpIBKA6QgDAEgGADIgQAGIAABkQAPggANgpQANgpALgtQAKgtAIgsIBvAgQgBAGgHADQgFAEgLAAQgHATgJARIgSAjIBLAAIAtguIBIBBQgDAEgHADQgGADgLACQgBBegCBDQgDBDgFAtQgFAtgJAbQgIAbgOANQgQARgXAJQgXAHgiAAQABgVgDgPgAjDCuIBJAAIAAidIhJAAgAjDAAIBJAAIAAiTIhJAAgAAlBRQgCghgLghQgLgfgPgaIAEgDQA4AOAbAWQAcAWAEAXQAFAYgLARQgMARgTADIgFAAQgTAAgTgQg");
	this.shape_20.setTransform(853.85,573.475);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CC3300").s().p("AiYESQA6gUAkgZQAjgXATgdQASgeAIghQAHgjABgoQABgoAAguIBnAHQAAAHgFAFQgFAEgKABQADAhAHAdQAHAdAMAYQALgQAJgTIASgkIANgeIBbA8QgCAEgGACQgGACgKgCQgWANgcANQgdAOgeAKQAUAgAiAWQAiAWAyANIgBAHQgbAGgPATQgRAUgDAiQgmgUgYgiQgYgigMgsQgNgtgFg2QgDAqgLAkQgMAjgaAcQgcAdgxAXQgyAWhPARgAjoESQgLgGgGgSQAHgfABgcQABgcgCgTQgEgTgHgGQgGgEgJgDIgSgDIAAgKIAdAAQAHgBAEgBQADgCAGgJIAIgOQAEgHAHgQIAUgrIAlhPIA7iBIAJADIgVBEIgWBNIgUBFIgLAtQgEAQgDAQQgDAQAAANQACARAGAOIAOAfQAHARAAAbQgCAZgQAOQgQAPgaAAIgCABQgLAAgLgIgAhiCOQgPgIgCgRQgCgRARgWQAYgJAUgWQATgVAHgkIAGAAQARA1gDAhQgEAjgPAQQgQARgTADIgJABQgNAAgMgGgAiAgNQA/gaAkgdQAhgcAPgiQAPghADgmQAEgmAAgrIBlAIQgBAGgFAFQgEAEgKABQgCAggEAcQgDAcgKAaIAUACIASACQAKgRAJgWIASgpIAMgiIBWA2QgDAEgEACQgGACgLgCQgTAOgYAQQgXAPgaANQA0AKAbATQAaASAHAUQAHAUgHAQQgIAQgQAGQgSAGgVgLQgIgNgQgSQgRgTgXgVQgXgUgbgTQgOAZgbAWQgaAWgrATQgrAShCAPgAj3g3QgEgagMgYQgMgYgOgRIADgDQA0ADAbAOQAZAPAHATQAFASgKAPQgJAPgSAFIgIAAQgPAAgRgKgAhKhvQgNgHgDgQQgBgPAPgWQASgKAOgUQAOgVAFggIAHAAQARAxgBAgQgBAggNAQQgNAQgQADIgIABQgMAAgJgGgAi9i4QgIgZgQgZQgQgZgQgRIADgDQA3gBAcANQAdANAIAUQAIASgIAQQgIAQgRAGQgHACgGAAQgOAAgPgIg");
	this.shape_21.setTransform(792.6,573.7);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#CC3300").s().p("AgrEeIAAkgIBTAdIBpAAIAmgpIBFA0QgDAFgFACQgFADgKACIAADPQAAACgJAEQgHAEgPADQgPAEgVABIgOAAIAAgwIhzAAIAAAoQAAAFgRAGQgQAHgdABgAAhDSIBzAAIAAhOIhzAAgAAhBzIBzAAIAAhHIhzAAgAkWDoIAAnVIBSAiIAgAAIAjgnIBHA4QgDADgGAEQgGADgJADIAAFfQgBADgKAFQgKAGgPAEQgOADgOABIgMAAIAAg0IguAAIAAA9QAAADgHAFQgHAGgOAEQgNAEgTABgAjMCEIAuAAIAAiZIguAAgAjMgmIAuAAIAAiUIguAAgAhJgfIgFgQICvAAQAGgTAFgVIAJgpIAHgoIBlAYQgCAFgFAEQgFADgKAAQgRAVgZAWQgYAWgbAUIA5AAIAngyIANAJIAdAXIAfAZQgBAFgFACQgEACgHAAgAgIhIQgBgYgHgXQgHgYgJgSIAGgCQAtAKAWARQAVARACASQACARgLANQgLANgRABIgCAAQgRAAgQgPgAg1ivIgFgQICFAAIgMgFIgMgHQgCgWgIgUQgIgWgJgOIAEgEQAxADAYAMQAYANAFAQQAFARgKAOQgJANgSAGIAsAAIAogyIANAJIAcAXIAfAZQgBAEgEACQgFADgGAAg");
	this.shape_22.setTransform(733.575,573.45);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#CC3300").s().p("AgmAnQgQgQAAgWQAAgWAQgQQAPgQAXAAQAXAAAQAQQAPAQABAWQgBAWgPAQQgQAPgXAAQgXAAgPgPg");
	this.shape_23.setTransform(677.475,591.775);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#CC3300").s().p("AjEDgIAAgVIA2gFIABhgIABhhIAAgUIgBhbIgBhcIg2gFIAAgUIDSAAQA6AAAiANQAiAOAQAXQAPAYAAAeQAAAYgLAUQgMAVgcAPQgbAQgwAJQBQAIAkAcQAkAeAAAvQAAAegRAdQgSAcgsASQgtAUhPAAgAgpBnIABBiIAfAAQAwABAbgaQAbgZAAgyQAAg0gagZQgagYg2AAIgcAAIAABngAgphwIAABbIAXAAQAuAAAWgZQAYgXAAgtQAAgqgVgWQgUgWgtgBIgcAAIgBBZg");
	this.shape_24.setTransform(646.7507,573.85);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#333333").s().p("ABlD3QgCgPgJgJQgIgJgRgIQgQgIgYgFIABgHIAgACIAfACIAXABQAHAAAFgCQAGgCAEgEQAPgPAGhTQAHhTACiYIhcAAQgYAngbAgQgaAfggAZIgDgDIAADyQgCADgKAGQgLAFgQAEQgOAEgPABIgNAAIAAgwIhLAAIAAApQAAAFgJAHQgIAGgPAFQgPAFgSAAIgMAAIAAnJIBLAfIADglIADgpIABglIB0AcQgCAHgGAEQgHADgKAAIghAlIgiAmIAoAAIAlgpIBJA6QgCAEgHADQgGADgIADIAABkQAOggAOgpQAMgpALgtQALgtAGgsIBwAgQgCAGgFADQgHAEgKAAQgIATgIARIgSAjIBLAAIAtguIBJBBQgEAEgGADQgHADgKACQgCBegDBDQgCBDgFAtQgFAtgIAbQgJAbgOANQgQARgXAJQgXAHghAAQAAgVgEgPgAjECuIBLAAIAAidIhLAAgAjEAAIBLAAIAAiTIhLAAgAAkBRQgBghgLghQgLgfgPgaIADgDQA5AOAbAWQAbAWAFAXQAFAYgLARQgMARgUADIgEAAQgTAAgUgQg");
	this.shape_25.setTransform(853.35,574.375);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#333333").s().p("AiXESQA5gUAjgZQAkgXATgdQASgeAIghQAHgjABgoQABgogBguIBpAHQgBAHgFAFQgFAEgKABQADAhAHAdQAHAdANAYQAKgQAKgTIARgkIANgeIBaA8QgCAEgFACQgGACgKgCQgXANgcANQgcAOgfAKQAVAgAiAWQAiAWAzANIgBAHQgcAGgPATQgRAUgCAiQgngUgYgiQgXgigNgsQgNgtgFg2QgDAqgMAkQgLAjgbAcQgbAdgxAXQgyAWhQARgAjnESQgMgGgFgSQAGgfACgcQAAgcgCgTQgEgTgHgGQgHgEgHgDIgSgDIAAgKIAcAAQAHgBADgBQAEgCAFgJIAIgOIAMgXIAVgrIAkhPIA6iBIAJADIgUBEIgXBNIgTBFIgLAtQgEAQgDAQQgDAQAAANQABARAIAOIANAfQAGARAAAbQgBAZgQAOQgQAPgaAAIgBABQgMAAgKgIgAhhCOQgQgIgCgRQgCgRARgWQAYgJATgWQAUgVAGgkIAIAAQAQA1gEAhQgDAjgPAQQgPARgUADIgJABQgNAAgLgGgAiAgNQA/gaAjgdQAjgcAPgiQAOghAEgmQACgmAAgrIBmAIQgBAGgEAFQgFAEgKABQgBAggEAcQgEAcgKAaIATACIATACQAKgRAJgWIASgpIAMgiIBVA2QgBAEgGACQgFACgLgCQgSAOgYAQQgZAPgZANQA0AKAaATQAbATAHATQAHAUgHAQQgIAQgRAGQgRAFgUgKQgJgNgRgSQgQgTgXgVQgXgUgcgTQgOAZgaAWQgaAWgrATQgrAShCAPgAj3g3QgEgagMgYQgMgYgPgRIAFgDQAzADAaAOQAbAPAGATQAFASgJAPQgKAPgSAFIgIAAQgPAAgRgKgAhKhvQgNgHgCgQQgDgPAQgWQATgKAOgUQAOgVAEggIAHAAQARAxgCAgQgBAggMAQQgNAQgPADIgJABQgMAAgJgGgAi9i4QgIgZgPgZQgRgZgRgRIAFgDQA2gBAdANQAcANAIAUQAIASgIAQQgIAQgSAGQgGACgGAAQgOAAgPgIg");
	this.shape_26.setTransform(792.1,574.6);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#333333").s().p("AgrEeIAAkgIBTAdIBpAAIAmgpIBFA0QgDAFgFACQgFADgKACIAADPQAAACgJAEQgHAEgPADQgPAEgVABIgOAAIAAgwIhzAAIAAAoQAAAFgRAGQgQAHgdABgAAhDSIBzAAIAAhOIhzAAgAAhBzIBzAAIAAhHIhzAAgAkWDoIAAnVIBSAiIAgAAIAjgnIBHA4QgDADgGAEQgGADgJADIAAFfQgBADgKAFQgKAGgPAEQgOADgOABIgMAAIAAg0IguAAIAAA9QAAADgHAFQgHAGgOAEQgNAEgTABgAjMCEIAuAAIAAiZIguAAgAjMgmIAuAAIAAiUIguAAgAhJgfIgFgQICvAAQAGgTAFgVIAJgpIAHgoIBlAYQgCAFgFAEQgFADgKAAQgRAVgZAWQgYAWgbAUIA5AAIAngyIANAJIAdAXIAfAZQgBAFgFACQgEACgHAAgAgIhIQgBgYgHgXQgHgYgJgSIAGgCQAtAKAWARQAVARACASQACARgLANQgLANgRABIgCAAQgRAAgQgPgAg1ivIgFgQICFAAIgMgFIgMgHQgCgWgIgUQgIgWgJgOIAEgEQAxADAYAMQAYANAFAQQAFARgKAOQgJANgSAGIAsAAIAogyIANAJIAcAXIAfAZQgBAEgEACQgFADgGAAg");
	this.shape_27.setTransform(733.075,574.35);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#333333").s().p("AgmAnQgQgQAAgWQAAgWAQgQQAPgQAXAAQAXAAAQAQQAPAQABAWQgBAWgPAQQgQAPgXAAQgXAAgPgPg");
	this.shape_28.setTransform(676.975,592.675);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#333333").s().p("AjEDgIAAgVIA2gFIABhfIABhiIAAgUIgBhbIgBhcIg2gFIAAgUIDSAAQA6AAAiANQAiAOAQAXQAPAYAAAeQAAAYgLAUQgMAVgcAPQgbAQgwAJQBQAIAkAcQAkAeAAAvQAAAegRAdQgSAcgsASQgtAUhPAAgAgpBnIABBiIAfAAQAwABAbgaQAbgZAAgyQAAg0gagZQgagYg2AAIgcAAIAABngAgphwIAABbIAXAAQAuAAAWgZQAYgXAAgtQAAgqgVgWQgUgWgtgBIgcAAIgBBZg");
	this.shape_29.setTransform(646.2507,574.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.instance}]},406).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.instance_1,p:{x:967.8,y:571.75}}]},29).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.instance_1,p:{x:967.3,y:572.65}}]},30).wait(1));

	// 选项
	this.b_btn = new lib._1_B();
	this.b_btn.name = "b_btn";
	this.b_btn.setTransform(755.1,570.45,1,1,0,0,0,132.5,45.1);
	new cjs.ButtonHelper(this.b_btn, 0, 1, 1);

	this.a_btn = new lib._1_A();
	this.a_btn.name = "a_btn";
	this.a_btn.setTransform(758.1,443.2,1,1,0,0,0,132.5,45.1);
	new cjs.ButtonHelper(this.a_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.a_btn},{t:this.b_btn}]}).wait(466));

	// 音频控制
	this.m1_btn = new lib.音频播放标();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(440.05,252.2);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.mstop_btn = new lib.元件2();
	this.mstop_btn.name = "mstop_btn";
	this.mstop_btn.setTransform(488.2,300.45,1,1,0,0,0,42.2,52);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m1_btn}]}).to({state:[{t:this.mstop_btn}]},5).to({state:[{t:this.m1_btn}]},400).wait(61));

	// title
	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#333333").s().p("AkUEWQAcgfAOgiQAOgjAFgkQAFgkABgiIhDAAIgEgRIBHAAIAAgCIAAhQIhLAAIgEgRIB4AAQAEgSAEgWIAFgsIADgoIBaAYIAJAAQAYAzAEAoQACAngLAVQgGAKgKAEQgJAFgKgCQgKgCgHgIQgHgLACgJQACgLAIgKIg5AAIAABQIAAACIACAAIAggyIALAKIAXAWIAYAZQgCAFgEACQgDADgHAAIhMAAQgBAjgKAnQgLAmgcAkQgcAkg3AbgAhFiHQgFADgJAAQgNAUgSAXQgSAYgWAVIAVAAIAggvIALAKIAXAYQAGgTABgWQACgXgEgWQgBAFgGADgAB5EaIAAjLIg4AAIgEgQIA8AAIAAhaIg6AAQgCBBgSA6QgTA6gqAuQgtAuhNAdIgEgFQA1gnAdgwQAegwAMg3QAKg4AAg9IAAjwIBeAJQgBAHgEAEQgFAEgLACIAAA9IBTAAQgGgBgHgDQgGgDgGgGQABgVgFgUQgHgVgJgOIAGgDQAqAGAVAOQAUAOADAPQAEAPgJANQgJAMgQADIAcAAIAhguIAKAJIAYAVIAYAXQgBAFgEADQgEACgGAAIjMAAIAACBIBkAAQAFgTAFgWIAHgsIAEgqIBZAWQgBAGgFADQgGAEgJAAQgNAVgUAZQgTAYgVAWIAUAAIAgguIALAJIAWAVIAZAXQgCAFgEADQgEACgHAAIhKAAIAABTIAcgrIAKAKIAYAWIAZAZQgCAFgEACQgFACgFAAIhHAAIAAC6QAAACgIAEQgHAEgOADQgOAEgTAAgAjug9QACgbgFgcQgFgcgIgWIAGgDQAmATAQAVQASAVAAASQABATgJAMQgKALgOABIgBAAQgOAAgPgOgABcg+QACgagFgbQgFgbgIgVIAGgDQAoASARAUQARAUABASQABATgKAMQgKAMgPAAIgBAAQgPAAgPgPgAkYitIgFgRIBlAAQgGgBgGgDQgFgDgGgFQABgVgGgVQgGgVgKgOIAFgDQAqAHATAOQAUAOACAPQAEAPgIAMQgJAMgPADIAiAAIAhguIALAJIAXAVIAaAXQgBAFgEADQgFACgGAAg");
	this.shape_30.setTransform(895.9,306.875);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#333333").s().p("ABxEeIAAlMIhAAAIAAABQABAsgGAsQgGAugUArQgUAsgpAnQgqAmhGAcIgEgEQAogjAZglQAZgnANgpQANgoAEgrQAEgrAAgsIAAjFIBVAdQAkgSAggTQAggTAWgQIBaBSQgHAFgLABQgMAAgPgGQghAHgsAFQgsAGgvAEIAAB2IBwAAIAqg6IAOALIAeAaIAfAdQgBAEgEADQgFACgGAAIg8AAIAAE5QgBACgIAEQgJAFgQAEQgQAEgWAAgAkVCrIAAmZIBSAhIAgAAIAlgoIBLA5QgDAEgGAEQgGADgJADIAAEZQgBACgLAGQgLAEgQAFQgPADgPAAIgNAAIAAg/IgnAAIAABPQgBAFgJAGQgKAHgPAFQgQAFgSAAgAjEAvIAnAAIAAjrIgnAAg");
	this.shape_31.setTransform(836.975,306.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#333333").s().p("AgTEYQBCgoAzg8QAyg8AkhYIBsA3QgDAFgFACQgGACgLgCQg5BOhFAuQhGAthYAZgAiYEeIAAiZQgbAfghAZQgiAagoAUIgFgHQAagaAVggQAVggAQglQAQgkALglIhdAAIgFgQIB+AAIAAhHIBoAJQgBAFgEAEQgEAEgLACIAAAvIATAAIAngzIALAKIAbAXIAeAZQgBAEgFACQgEADgHAAIhtAAIAAAhQA3AHAbATQAbASAGAVQAGAWgKAQQgKAQgTAEQgSADgWgPQgEgbgLgaQgMgbgPgWIAADCQAAAEgKAFQgLAFgPAEQgQAEgQAAgAAWA4QAwgiAngwQAmgwAfg+IBnA8QgDAFgGACQgGABgKgBQgyAwg6AgQg6AhhBAUgAj4hEQABgagHgaQgGgZgLgUIAFgDQAtANAUATQAVASACATQACASgLANQgKAOgRABIgCAAQgQAAgQgPgAhRg+QALgZAKghQAKghAIgjIBfAoQgCAFgGADQgGADgKgBQgXAZgaAVQgaAUgcAOgAidhUQACgYgHgZQgGgZgMgSIAFgEQAsALAVATQAUARACASQACASgKAMQgKANgRACIgDAAQgPAAgQgOgAAWhhQAtgiAmgtQAnguAgg2IBhA+QgDAFgFAAQgGACgLgCQgyAog4AeQg5Aeg7ATgAkUjBQAsgLAvgPQAvgQAqgSQAqgRAbgQIBRBNQgGAFgLAAQgLABgPgHQgkAIgwAGQgwAFg0ADQg0ADgyAAg");
	this.shape_32.setTransform(775.925,306.55);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#333333").s().p("AhAEYQgyAAgggKQgggKgPgZQgPgYAAgsIAAjjIglAZQgTAMgTAJIgEgEQAggeAegtQAdgqAZgyQAYgwAOguIB2AcQgCAGgFACQgFACgMAAIgNATIgNATIBSAAIAsgsIBMBAQgEAEgFACIgPADQgWATgdATQgcATgeAOIB4AAIAngrIBRA9QgDAFgHADQgGAFgKACIAACWQgBACgMAFQgLAFgRAFQgQAEgPAAIgPAAIAAgnIj+AAIAABtQAAAPANAHQANAGAeAAIDAAAQAYAAAPgCQAQgEAKgJQAJgKAMgXQAMgWALgaIAGAAIABBRQAaAIAKAHQALAGAAANQABATgNAOQgNAOghAHQgiAIhAAAgAAsAtIBXAAIAAiDIhXAAgAh7AtIBUAAIAAiDIhUAAgAhtiVQgRATgSAQIAeALIBmAAQAJgSAIgWQAIgXAGgUIhhAAQgPATgQASg");
	this.shape_33.setTransform(715.4286,305.85);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#333333").s().p("AgvD/QgDgPgJgJQgJgIgNgHQgOgGgbgFIAAgHIAMAAIAcACIAfACIAVAAQAIAAACgCQAEgDgBgFIAAjJIhwAAIgbAhIhNgqIAIgHIALgHIAMgzIAMg7IAKg4QAFgZABgRIBbAUQAugIAtgMQAugLAogMQAogNAdgLIBNBSQgGAEgLAAQgMAAgPgHQgmAEgwACQgwADg0AAQg0AAgzgCIgKA2IgNBAIgMA5IBvAAIAAiWIBsALQgBAGgEAEQgEAEgLACIAAB7IBPAAIAwg8IAPAMIAiAaIAlAdQgCAFgFADQgFACgGAAIjDAAIAADLQAAAdgIATQgIATgYALQgZAMgvAEQgCgUgEgNgAkbDxQAagYAagiQAZgiAWgpQAWgpAPgsIBoAxQgCAGgHACQgHADgKgBQgqA+g1AoQg1Ang9AYgADLDfQgMgigSgiQgSgigVggQgWgggVgbIAFgDQBOAWArAgQArAfAOAhQAOAggHAZQgHAYgVAHQgHADgHAAQgQAAgUgNg");
	this.shape_34.setTransform(655.575,306.575);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#333333").s().p("AiyEdIAAkpIBcAiICnAAIAqgsIBSA/QgEAEgFADQgHAEgJADIAADHQgBAEgMAGQgMAHgRAFQgSAGgRAAIgPAAIAAgsIiyAAIAAATQgBAFgKAHQgLAGgSAFQgQAFgTAAgAhaDeICyAAIAAhUIiyAAgAhaB5ICyAAIAAhSIiyAAgAkRglIgFgRIE2AAIAOgpIANgsIALgqIjFAAQAvAOAVAUQAVAVACAUQAAAVgLAOQgNAOgTABQgUABgVgSQgBgdgIgcQgIgcgLgXIhjAAIgEgQIDwAAIgLgEIgLgGQgCgWgJgTQgJgUgKgOIADgCQAzgCAZALQAZALAFAQQAFARgJAOQgKAOgSAGIB4AAIArg6IAOAMIAgAZIAhAcQgBAFgEACQgFACgHAAIiWAAIBbAcQgBAGgGADQgFADgKgBQgWAUgeAYQgeAYggAUIBsAAIAtg7IAOALIAhAaIAjAdQgCAFgEACQgFADgGAAg");
	this.shape_35.setTransform(595.75,306.516);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30}]}).wait(466));

	// bg
	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#FFFFFF").s().p("EiLsBMwQhvAAhQhPQhPhPAAhwMAAAiRDQAAhwBPhPQBQhPBvAAMEXZAAAQBvAABPBPQBQBPAABwMAAACRDQAABwhQBPQhPBPhvAAg");
	this.shape_36.setTransform(959.9897,540.0003,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_36).wait(466));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(960,540,921,491.29999999999995);
// library properties:
lib.properties = {
	id: 'DB484B266704CB47A4D9ACBAE35EF622',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#F7C677",
	opacity: 1.00,
	manifest: [
		{src:"sounds/fail.mp3?1688611351261", id:"fail"},
		{src:"sounds/victory.mp3?1688611351261", id:"victory"},
		{src:"sounds/yx320102音乐色彩听辨题目.mp3?1688611351261", id:"yx320102音乐色彩听辨题目"}
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
an.compositions['DB484B266704CB47A4D9ACBAE35EF622'] = {
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