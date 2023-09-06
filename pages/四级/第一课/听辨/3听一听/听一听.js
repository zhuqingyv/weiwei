(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"听一听_atlas_1", frames: [[0,104,1815,99],[0,205,1815,99],[0,0,1815,102]]}
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



(lib._11 = function() {
	this.initialize(ss["听一听_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._22 = function() {
	this.initialize(ss["听一听_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.yp320101 = function() {
	this.initialize(ss["听一听_atlas_1"]);
	this.gotoAndStop(2);
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


(lib.mplay_btn = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(61.3288,41.0635,3.0707,3.0707);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_1.setTransform(44.6187,41.1018,3.0707,3.0707);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_2.setTransform(27.8029,41.0543,3.0707,3.0707);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgYAYQgKgJAAgPQAAgOAKgKQALgKANAAQAOAAAKAKQALAKAAAOQAAAPgLAJQgKALgOAAQgNAAgLgLg");
	this.shape_3.setTransform(10.1681,41.0763,3.0707,3.0707);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AqFKGIAA0LIULAAIAAULg");
	this.shape_4.setTransform(47.425,47.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.2,-17.2,129.29999999999998,129.29999999999998);


(lib.lnav5 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAPgOIAjAQQATAIAQAKQASAJALAIIgPAPQgLgIgQgJgAhwCKIgHgIQAbgIAUgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQACgHABgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgXAJIgGgJIgHgHQAdgMAXgQQAXgRAQgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBrAAIABgOIABgMIAUABIgBAMIgCANIBuAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICfAAIAAASIhXAAQARAUAaAQQAYARAdAIIgIAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgVAMgiAKIgFgIgAA2ALIgMgMQgHgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape.setTransform(204.35,24.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_1.setTransform(172.225,24.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("Ah/CQIAAjjIBNAAIAAg8IAVAAIAAA8IA3AAIAAg8IAVAAIAAA8IBRAAIAADiIgVAAIAAgUIjWAAIAAAVgAAvBmIA8AAIAAhJIg8AAgAgdBmIA3AAIAAhJIg3AAgAhrBmIA5AAIAAhJIg5AAgAAvAJIA8AAIAAhHIg8AAgAgdAJIA3AAIAAhHIg3AAgAhrAJIA5AAIAAhHIg5AAg");
	this.shape_2.setTransform(140.275,24.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AACCKIgHgHQAWgTANgWQAOgWAGgWQAHgWACgUIABglIAAgVIAVAAIAAAVIAAANIgBAOQAFAfAJAZQAIAYAOAUQANATAUAQIgIAIQgEAEgCAFQgYgVgPgZQgOgZgKggQgGAbgPAaQgPAbgbAYIgHgJgAhACHIgDgIIAUABIANgBIADgBIABgDIAAhsIh2AAIAAgSIB1AAIAAhsIhyAAIAAgSICdAAIAAASIgYAAIAABsIAeAAIAAASIgcAAIAABsQAAAIgCAEQgDAEgFACQgGACgKAAIgYABIgEgJgAiCB1IAAhRIBNAAIAABDIg8AAIAAAOgAhxBXIArAAIAAgjIgrAAgABogOQAEgMADgQIAHggIhKAAQgGASgHAQQgHAQgJAMIgIgFIgJgFQAKgPAIgUQAIgUAGgWQAGgXADgYIAVAEIgFAYIgGAYIBLAAIADgBIAOAFIgFAdIgHAcIgIAYgAh/gaIAAhAIBKAAIAABAgAhvgpIAoAAIAAgiIgoAAg");
	this.shape_3.setTransform(108.55,24.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("ABQCSIAAhRIgqAAIAAgSIAqAAIAAgvIgvAAIAAgSIA/AAIAHgUIAHgWIAFgUIASAEIgKAeIgKAcIAhAAIAAASIguAAIAAAvIApAAIAAASIgpAAIAABRgAiECKQgEgEgEgDQAPgKAJgMQAHgNAEgNQADgOABgNIgnAAIAAgSIAnAAIAAgnIgrAAIAAgSIA9AAIAGgTIAGgWIADgTIASAEIgIAdIgJAbIAcAAIAAASIgqAAIAAAnIAnAAIAAASIgnAAQgCAPgEARQgDAQgKAPQgKAPgQALIgGgHgAgqCJIgHgHQAZgVANgZQAMgZADgcQAEgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgGAWgNAUQgMATgUARIgHgHgAgmAPQAEgMADgQQADgQACgRIABghIAQACQAAAQgCARQgBASgDARQgCAQgFANgAA6glIgDgTIgHgTIARgCIAGASIAEASIACARIgRADIgCgQgAh4glIgDgTIgGgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAtAAIgJgSIgIgSIASgFIAKAVIAJAUIAjAAIAAASgAAmhUIAAgSIAuAAIgIgTIgJgTIARgFIAMAVIAJAWIAkAAIAAASg");
	this.shape_4.setTransform(76.25,24.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.6)").s().p("ABLCRIAAimIhCAAQAAAYgEAeQgDAdgHAdQgJAdgSAYIgIgIIgKgGQARgXAJgcQAHgcADgcQADgbgBgZIAAhTIArgJIApgLQAUgGANgGIASARQgPAGgTAFIgoAKIgoAJIAAA3ICCAAIAAAVIgrAAIAACmgAiKBcIAAjQIBWAAIAAC3IhCAAIAAAZgAh2AvIAtAAIAAiPIgtAAg");
	this.shape_5.setTransform(44.65,24.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_6.setTransform(23.85,34.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,0,0,0.6)").s().p("AggByQgNgDgLgIQgKgGgIgJIANgRQAKALAOAIQAOAHAVAAQANAAAMgGQALgIAHgNQAHgNAAgRQAAgagNgOQgOgOgWAAQgLAAgKADQgJAEgJAGIgPgJIAIhsIBuAAIAAAWIhXAAIgHBHQAIgEAJgDQAJgDAKAAQATAAAQAIQAQAIAJAQQAKARAAAZQgBAZgKATQgLASgRAJQgRAJgTAAQgSAAgOgFg");
	this.shape_7.setTransform(10.375,24.85);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F7C677").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAPgOIAjAQQATAIAQAKQASAJALAIIgPAPQgLgIgQgJgAhwCKIgHgIQAbgIAUgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQACgHABgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgXAJIgGgJIgHgHQAdgMAXgQQAXgRAQgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBrAAIABgOIABgMIAUABIgBAMIgCANIBuAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICfAAIAAASIhXAAQARAUAaAQQAYARAdAIIgIAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgVAMgiAKIgFgIgAA2ALIgMgMQgHgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_8.setTransform(204.35,24.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F7C677").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_9.setTransform(172.225,24.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F7C677").s().p("Ah/CQIAAjjIBNAAIAAg8IAVAAIAAA8IA3AAIAAg8IAVAAIAAA8IBRAAIAADiIgVAAIAAgUIjWAAIAAAVgAAvBmIA8AAIAAhJIg8AAgAgdBmIA3AAIAAhJIg3AAgAhrBmIA5AAIAAhJIg5AAgAAvAJIA8AAIAAhHIg8AAgAgdAJIA3AAIAAhHIg3AAgAhrAJIA5AAIAAhHIg5AAg");
	this.shape_10.setTransform(140.275,24.375);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F7C677").s().p("AACCKIgHgHQAWgTANgWQAOgWAGgWQAHgWACgUIABglIAAgVIAVAAIAAAVIAAANIgBAOQAFAfAJAZQAIAYAOAUQANATAUAQIgIAIQgEAEgCAFQgYgVgPgZQgOgZgKggQgGAbgPAaQgPAbgbAYIgHgJgAhACHIgDgIIAUABIANgBIADgBIABgDIAAhsIh2AAIAAgSIB1AAIAAhsIhyAAIAAgSICdAAIAAASIgYAAIAABsIAeAAIAAASIgcAAIAABsQAAAIgCAEQgDAEgFACQgGACgKAAIgYABIgEgJgAiCB1IAAhRIBNAAIAABDIg8AAIAAAOgAhxBXIArAAIAAgjIgrAAgABogOQAEgMADgQIAHggIhKAAQgGASgHAQQgHAQgJAMIgIgFIgJgFQAKgPAIgUQAIgUAGgWQAGgXADgYIAVAEIgFAYIgGAYIBLAAIADgBIAOAFIgFAdIgHAcIgIAYgAh/gaIAAhAIBKAAIAABAgAhvgpIAoAAIAAgiIgoAAg");
	this.shape_11.setTransform(108.55,24.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F7C677").s().p("ABQCSIAAhRIgqAAIAAgSIAqAAIAAgvIgvAAIAAgSIA/AAIAHgUIAHgWIAFgUIASAEIgKAeIgKAcIAhAAIAAASIguAAIAAAvIApAAIAAASIgpAAIAABRgAiECKQgEgEgEgDQAPgKAJgMQAHgNAEgNQADgOABgNIgnAAIAAgSIAnAAIAAgnIgrAAIAAgSIA9AAIAGgTIAGgWIADgTIASAEIgIAdIgJAbIAcAAIAAASIgqAAIAAAnIAnAAIAAASIgnAAQgCAPgEARQgDAQgKAPQgKAPgQALIgGgHgAgqCJIgHgHQAZgVANgZQAMgZADgcQAEgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgGAWgNAUQgMATgUARIgHgHgAgmAPQAEgMADgQQADgQACgRIABghIAQACQAAAQgCARQgBASgDARQgCAQgFANgAA6glIgDgTIgHgTIARgCIAGASIAEASIACARIgRADIgCgQgAh4glIgDgTIgGgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAtAAIgJgSIgIgSIASgFIAKAVIAJAUIAjAAIAAASgAAmhUIAAgSIAuAAIgIgTIgJgTIARgFIAMAVIAJAWIAkAAIAAASg");
	this.shape_12.setTransform(76.25,24.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F7C677").s().p("ABLCRIAAimIhCAAQAAAYgEAeQgDAdgHAdQgJAdgSAYIgIgIIgKgGQARgXAJgcQAHgcADgcQADgbgBgZIAAhTIArgJIApgLQAUgGANgGIASARQgPAGgTAFIgoAKIgoAJIAAA3ICCAAIAAAVIgrAAIAACmgAiKBcIAAjQIBWAAIAAC3IhCAAIAAAZgAh2AvIAtAAIAAiPIgtAAg");
	this.shape_13.setTransform(44.65,24.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F7C677").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_14.setTransform(23.85,34.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F7C677").s().p("AggByQgNgDgLgIQgKgGgIgJIANgRQAKALAOAIQAOAHAVAAQANAAAMgGQALgIAHgNQAHgNAAgRQAAgagNgOQgOgOgWAAQgLAAgKADQgJAEgJAGIgPgJIAIhsIBuAAIAAAWIhXAAIgHBHQAIgEAJgDQAJgDAKAAQATAAAQAIQAQAIAJAQQAKARAAAZQgBAZgKATQgLASgRAJQgRAJgTAAQgSAAgOgFg");
	this.shape_15.setTransform(10.375,24.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(3));

	// 图层_2
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_16.setTransform(114.675,22.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-4.8,236.79999999999998,55.199999999999996);


(lib.lnav4 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("ABACSIgggBIgCgLQgCgGgEgFIAiABIAXABIAIgBQADgBADgDQAFgEADgNQAEgNACgXIAEg7IAEhVIizAAQgNAZgOAVQgPAWgQAPIgJgGIgJgHQARgRAPgWQAPgVAMgaQAMgZAJgbIAVAFIgHAVIgIAVIC/AAIAAACIAAAFIAAAEIgEBfQgCAogDAZQgDAagEAOQgDAOgFAGQgGAHgGACQgGADgKABIgOAAIgJAAgAhNBqIAAiJIB7AAIAABxIhnAAIAAAYgAg5A/IBRAAIAAhKIhRAAg");
	this.shape.setTransform(203.5,24.2833);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AiJCHIgIgHQAUgSALgVQAMgVAGgWQAFgWACgVIg2AAIAAgSIA3AAIAAgGIAAgHIAAgzIgTAAIgJAbQgFANgGALIgIgGIgJgGQAIgMAFgRQAGgQAEgTIAHgmIAUAEIgEAUIgEATIBKAAIAAAUIgoAAIAAAzIAAAHIAAAGIAtAAIAAASIgvAAIgBANIgCANIALAPIAOASIANASIAJAMIgOASIgKgRIgOgVIgOgTQgGAYgNAXQgNAXgVAUIgGgIgAgeCKIAAgUIBjAAIALgZIALgcIAIgbIAWAFIgKAZIgLAbIgKAXIA4AAIAAAUgAAUBbIgIgXIgKgXIASgFIAKAXIAIAXIAGAVIgTAFIgFgVgAgGAaIAAhiICHAAIAABigAANAGIBgAAIAAg7IhgAAgAgRhsIAAgUICgAAIAAAUg");
	this.shape_1.setTransform(172.175,23.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQASAJALAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQACgHABgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBrAAIABgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQAQAUAaAQQAYARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMghAKIgFgIgAA2ALIgMgMQgHgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_2.setTransform(140.35,24.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_3.setTransform(108.225,24.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("ABwB/IgagVIgbgUIANgNIAbATIAaAWQAMAJAIAKIgNANQgIgIgMgLgAgtCKIgHgIQAZgKARgLQARgLALgNQALgMAGgMIhSAAIAAgTIBZAAQACgKABgKIABgTIAAgmIAVAAIAAAmIgBATQgBAKgCAKIBPAAIAAATIhUAAQgGAQgMAOQgLAQgUANQgTAPgdALIgGgIgAhpCCIgGgHIAGgGQAEgEACgGQADgGAAgIIAAh2IgwAAIAAgUIBEAAIAACHIAegYIAEAKIAFAIIgmAfIgSAPIgHAHIAAABIgFgIgAgFAbIgRgLQgIgHgJgEIALgLIARAJIAPAMIANALIgKAMIgMgLgAARgBIgRgMIgQgKIAKgLIAQAJIARALQAIAFAFAFIgLAMIgMgJgABigJIAIgSIAIgVIibAAIAAgTIBOAAIAAgeIhBAAIAAgSIBBAAIAAgeIAVAAIAAAeIBDAAIAAASIhDAAIAAAeIA/AAIAEgBIAOAFIgMAfQgGAQgGALgAhYhaIgRgRIgSgRIANgNIATAPIARAQIAOAQIgOAQIgOgQg");
	this.shape_4.setTransform(76.175,24.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.6)").s().p("AgfCHIgKgGQAQgQAMgWQANgWAGgZIAVAFQgIAbgNAYQgMAYgRARIgIgGgABuBvQgGgPgJgPIgRgeIATgHQAJANAJAQIAPAeQAIAPADALIgVAJQgDgMgHgPgAhoB8IgIgHQAEgCAEgFQAEgEADgHQADgHAAgIIAAhwIguAAIAAgVIBDAAIAACGIAjgZIADAJIAEAJIgoAfIgTAPIgIAIIgGgIgAgRAMIAAiKICPAAIAACKgAADgIIBlAAIAAhiIhlAAgAhXheIgSgRIgSgQIAPgNIASAPIASARQAIAIAFAGIgOAPIgOgPg");
	this.shape_5.setTransform(44.05,24.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_6.setTransform(23.85,34.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,0,0,0.6)").s().p("AAXB1IAAhCIhmAAIAAgQIBjiXIAcAAIAACTIAgAAIAAAUIggAAIAABCgAAOhFIgJARIg4BTIBKAAIAAhLIAAgNIABgQIABgMIgCAAIgJAQg");
	this.shape_7.setTransform(10.575,24.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F7C677").s().p("ABACSIgggBIgCgLQgCgGgEgFIAiABIAXABIAIgBQADgBADgDQAFgEADgNQAEgNACgXIAEg7IAEhVIizAAQgNAZgOAVQgPAWgQAPIgJgGIgJgHQARgRAPgWQAPgVAMgaQAMgZAJgbIAVAFIgHAVIgIAVIC/AAIAAACIAAAFIAAAEIgEBfQgCAogDAZQgDAagEAOQgDAOgFAGQgGAHgGACQgGADgKABIgOAAIgJAAgAhNBqIAAiJIB7AAIAABxIhnAAIAAAYgAg5A/IBRAAIAAhKIhRAAg");
	this.shape_8.setTransform(203.5,24.2833);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F7C677").s().p("AiJCHIgIgHQAUgSALgVQAMgVAGgWQAFgWACgVIg2AAIAAgSIA3AAIAAgGIAAgHIAAgzIgTAAIgJAbQgFANgGALIgIgGIgJgGQAIgMAFgRQAGgQAEgTIAHgmIAUAEIgEAUIgEATIBKAAIAAAUIgoAAIAAAzIAAAHIAAAGIAtAAIAAASIgvAAIgBANIgCANIALAPIAOASIANASIAJAMIgOASIgKgRIgOgVIgOgTQgGAYgNAXQgNAXgVAUIgGgIgAgeCKIAAgUIBjAAIALgZIALgcIAIgbIAWAFIgKAZIgLAbIgKAXIA4AAIAAAUgAAUBbIgIgXIgKgXIASgFIAKAXIAIAXIAGAVIgTAFIgFgVgAgGAaIAAhiICHAAIAABigAANAGIBgAAIAAg7IhgAAgAgRhsIAAgUICgAAIAAAUg");
	this.shape_9.setTransform(172.175,23.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F7C677").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQASAJALAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQACgHABgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBrAAIABgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQAQAUAaAQQAYARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMghAKIgFgIgAA2ALIgMgMQgHgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_10.setTransform(140.35,24.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F7C677").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_11.setTransform(108.225,24.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F7C677").s().p("ABwB/IgagVIgbgUIANgNIAbATIAaAWQAMAJAIAKIgNANQgIgIgMgLgAgtCKIgHgIQAZgKARgLQARgLALgNQALgMAGgMIhSAAIAAgTIBZAAQACgKABgKIABgTIAAgmIAVAAIAAAmIgBATQgBAKgCAKIBPAAIAAATIhUAAQgGAQgMAOQgLAQgUANQgTAPgdALIgGgIgAhpCCIgGgHIAGgGQAEgEACgGQADgGAAgIIAAh2IgwAAIAAgUIBEAAIAACHIAegYIAEAKIAFAIIgmAfIgSAPIgHAHIAAABIgFgIgAgFAbIgRgLQgIgHgJgEIALgLIARAJIAPAMIANALIgKAMIgMgLgAARgBIgRgMIgQgKIAKgLIAQAJIARALQAIAFAFAFIgLAMIgMgJgABigJIAIgSIAIgVIibAAIAAgTIBOAAIAAgeIhBAAIAAgSIBBAAIAAgeIAVAAIAAAeIBDAAIAAASIhDAAIAAAeIA/AAIAEgBIAOAFIgMAfQgGAQgGALgAhYhaIgRgRIgSgRIANgNIATAPIARAQIAOAQIgOAQIgOgQg");
	this.shape_12.setTransform(76.175,24.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F7C677").s().p("AgfCHIgKgGQAQgQAMgWQANgWAGgZIAVAFQgIAbgNAYQgMAYgRARIgIgGgABuBvQgGgPgJgPIgRgeIATgHQAJANAJAQIAPAeQAIAPADALIgVAJQgDgMgHgPgAhoB8IgIgHQAEgCAEgFQAEgEADgHQADgHAAgIIAAhwIguAAIAAgVIBDAAIAACGIAjgZIADAJIAEAJIgoAfIgTAPIgIAIIgGgIgAgRAMIAAiKICPAAIAACKgAADgIIBlAAIAAhiIhlAAgAhXheIgSgRIgSgQIAPgNIASAPIASARQAIAIAFAGIgOAPIgOgPg");
	this.shape_13.setTransform(44.05,24.625);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F7C677").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_14.setTransform(23.85,34.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F7C677").s().p("AAXB1IAAhCIhmAAIAAgQIBjiXIAcAAIAACTIAgAAIAAAUIggAAIAABCgAAOhFIgJARIg4BTIBKAAIAAhLIAAgNIABgQIABgMIgCAAIgJAQg");
	this.shape_15.setTransform(10.575,24.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(3));

	// 图层_2
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_16.setTransform(114.675,22.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-4.8,236.79999999999998,55.199999999999996);


(lib.lnav3 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("ABACSIgggBIgCgLQgCgGgEgFIAiABIAXABIAIgBQADgBADgDQAFgEADgNQAEgNACgXIAEg7IAEhVIizAAQgNAZgOAVQgPAWgQAPIgJgGIgJgHQARgRAPgWQAPgVAMgaQAMgZAJgbIAVAFIgHAVIgIAVIC/AAIAAACIAAAFIAAAEIgEBfQgCAogDAZQgDAagEAOQgDAOgFAGQgGAHgGACQgGADgKABIgOAAIgJAAgAhNBqIAAiJIB7AAIAABxIhnAAIAAAYgAg5A/IBRAAIAAhKIhRAAg");
	this.shape.setTransform(203.5,24.2833);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AiJCHIgIgHQAUgSALgVQAMgVAGgWQAFgWACgVIg2AAIAAgSIA3AAIAAgGIAAgHIAAgzIgTAAIgJAbQgFANgGALIgIgGIgJgGQAIgMAFgRQAGgQAEgTIAHgmIAUAEIgEAUIgEATIBKAAIAAAUIgoAAIAAAzIAAAHIAAAGIAtAAIAAASIgvAAIgBANIgCANIALAPIAOASIANASIAJAMIgOASIgKgRIgOgVIgOgTQgGAYgNAXQgNAXgVAUIgGgIgAgeCKIAAgUIBjAAIALgZIALgcIAIgbIAWAFIgKAZIgLAbIgKAXIA4AAIAAAUgAAUBbIgIgXIgKgXIASgFIAKAXIAIAXIAGAVIgTAFIgFgVgAgGAaIAAhiICHAAIAABigAANAGIBgAAIAAg7IhgAAgAgRhsIAAgUICgAAIAAAUg");
	this.shape_1.setTransform(172.175,23.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQASAJALAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQACgHABgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBrAAIABgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQAQAUAaAQQAYARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMghAKIgFgIgAA2ALIgMgMQgHgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_2.setTransform(140.35,24.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_3.setTransform(108.225,24.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("Ag6CKIgJgHQAXgPANgXQAOgVAGgbQAHgaADgcQABgdABgeIg3AAIAAgVIDJAAIAAAVIh8AAIgBAYIgBAZIBmAAIAAAKIgFBMQgDAegDAPQgDAPgFAGQgEAEgFACQgGADgHAAIgSABIgYgBIgCgKIgFgKIAZACIAQAAQAEAAADgBIAEgEQAEgDADgNQADgNACgZIADhBIhRAAQgDAegIAbQgIAbgNAXQgPAWgXAQIgHgHgAhnCRIAAi0IgPAVIgPARIgGgJIgHgLQAPgPAOgVQAOgVAMgXQAMgXAIgYIAVAFQgHATgIARQgIASgKARIAADVgAAphqIgGgRIgFgRIAUgEIAGAQIAGARIAEAOIgWAGIgDgPg");
	this.shape_4.setTransform(76.075,24.25);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.6)").s().p("ABQB4QgWgSgMgcIgBAAQgGASgLANQgMAOgRAKQgTAKgcAHIgFgJIgGgIQAYgFAQgIQARgIAJgKQAKgKAGgOIhKAAIAAgSIBQAAIADgNIACgPIhAAAIAAhgICaAAIAABgIhEAAIgCAPIgDANIBaAAIAAASIhKAAQALAVAVAOQAVANAcAGIgHAJIgHAJQgfgIgXgSgAgKAMIByAAIAAgXIhyAAgAgKgbIByAAIAAgZIhyAAgAhlCRIAAiVQgHAYgJAWQgJAWgJAQIgGgLIgGgKQAKgNAIgVQAJgUAHgWQAIgYAEgWIgoAAIAAgUIAoAAIAAg+IAUAAIAAA+IAiAAIAAAUIgiAAIAAANIAJAOIAMATIAKARIAHAMIgNAQIgHgOIgIgRIgKgSIAACmgABKhKIAAgZIgyAAIAAAZIgVAAIAAgZIgvAAIAAgTIAvAAIAAgaIAVAAIAAAaIAyAAIAAgaIAVAAIAAAaIAvAAIAAATIgvAAIAAAZg");
	this.shape_5.setTransform(44.175,24.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_6.setTransform(23.85,34.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,0,0,0.6)").s().p("AgfB1QgOgFgKgHQgLgHgHgJIAOgQQAKALAOAHQAOAIAUABQAOAAALgGQALgFAGgKQAHgLAAgOQAAgOgIgLQgHgLgQgGQgQgGgaAAIAAgUQAYAAAOgGQAOgGAGgLQAGgKABgNQgBgSgKgKQgLgLgTAAQgOAAgNAGQgMAHgKAKIgPgRQANgMAQgHQARgIATAAQATAAAOAHQAQAGAIANQAIANABATQgBAWgKAOQgMAOgTAHIAAABQAOADALAHQAMAIAGAMQAHANAAAQQAAAVgKAPQgKAPgQAIQgRAHgUAAQgSAAgOgEg");
	this.shape_7.setTransform(10.35,24.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F7C677").s().p("ABACSIgggBIgCgLQgCgGgEgFIAiABIAXABIAIgBQADgBADgDQAFgEADgNQAEgNACgXIAEg7IAEhVIizAAQgNAZgOAVQgPAWgQAPIgJgGIgJgHQARgRAPgWQAPgVAMgaQAMgZAJgbIAVAFIgHAVIgIAVIC/AAIAAACIAAAFIAAAEIgEBfQgCAogDAZQgDAagEAOQgDAOgFAGQgGAHgGACQgGADgKABIgOAAIgJAAgAhNBqIAAiJIB7AAIAABxIhnAAIAAAYgAg5A/IBRAAIAAhKIhRAAg");
	this.shape_8.setTransform(203.5,24.2833);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F7C677").s().p("AiJCHIgIgHQAUgSALgVQAMgVAGgWQAFgWACgVIg2AAIAAgSIA3AAIAAgGIAAgHIAAgzIgTAAIgJAbQgFANgGALIgIgGIgJgGQAIgMAFgRQAGgQAEgTIAHgmIAUAEIgEAUIgEATIBKAAIAAAUIgoAAIAAAzIAAAHIAAAGIAtAAIAAASIgvAAIgBANIgCANIALAPIAOASIANASIAJAMIgOASIgKgRIgOgVIgOgTQgGAYgNAXQgNAXgVAUIgGgIgAgeCKIAAgUIBjAAIALgZIALgcIAIgbIAWAFIgKAZIgLAbIgKAXIA4AAIAAAUgAAUBbIgIgXIgKgXIASgFIAKAXIAIAXIAGAVIgTAFIgFgVgAgGAaIAAhiICHAAIAABigAANAGIBgAAIAAg7IhgAAgAgRhsIAAgUICgAAIAAAUg");
	this.shape_9.setTransform(172.175,23.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F7C677").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQASAJALAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQACgHABgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBrAAIABgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQAQAUAaAQQAYARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMghAKIgFgIgAA2ALIgMgMQgHgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_10.setTransform(140.35,24.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F7C677").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_11.setTransform(108.225,24.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F7C677").s().p("Ag6CKIgJgHQAXgPANgXQAOgVAGgbQAHgaADgcQABgdABgeIg3AAIAAgVIDJAAIAAAVIh8AAIgBAYIgBAZIBmAAIAAAKIgFBMQgDAegDAPQgDAPgFAGQgEAEgFACQgGADgHAAIgSABIgYgBIgCgKIgFgKIAZACIAQAAQAEAAADgBIAEgEQAEgDADgNQADgNACgZIADhBIhRAAQgDAegIAbQgIAbgNAXQgPAWgXAQIgHgHgAhnCRIAAi0IgPAVIgPARIgGgJIgHgLQAPgPAOgVQAOgVAMgXQAMgXAIgYIAVAFQgHATgIARQgIASgKARIAADVgAAphqIgGgRIgFgRIAUgEIAGAQIAGARIAEAOIgWAGIgDgPg");
	this.shape_12.setTransform(76.075,24.25);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F7C677").s().p("ABQB4QgWgSgMgcIgBAAQgGASgLANQgMAOgRAKQgTAKgcAHIgFgJIgGgIQAYgFAQgIQARgIAJgKQAKgKAGgOIhKAAIAAgSIBQAAIADgNIACgPIhAAAIAAhgICaAAIAABgIhEAAIgCAPIgDANIBaAAIAAASIhKAAQALAVAVAOQAVANAcAGIgHAJIgHAJQgfgIgXgSgAgKAMIByAAIAAgXIhyAAgAgKgbIByAAIAAgZIhyAAgAhlCRIAAiVQgHAYgJAWQgJAWgJAQIgGgLIgGgKQAKgNAIgVQAJgUAHgWQAIgYAEgWIgoAAIAAgUIAoAAIAAg+IAUAAIAAA+IAiAAIAAAUIgiAAIAAANIAJAOIAMATIAKARIAHAMIgNAQIgHgOIgIgRIgKgSIAACmgABKhKIAAgZIgyAAIAAAZIgVAAIAAgZIgvAAIAAgTIAvAAIAAgaIAVAAIAAAaIAyAAIAAgaIAVAAIAAAaIAvAAIAAATIgvAAIAAAZg");
	this.shape_13.setTransform(44.175,24.175);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F7C677").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_14.setTransform(23.85,34.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F7C677").s().p("AgfB1QgOgFgKgHQgLgHgHgJIAOgQQAKALAOAHQAOAIAUABQAOAAALgGQALgFAGgKQAHgLAAgOQAAgOgIgLQgHgLgQgGQgQgGgaAAIAAgUQAYAAAOgGQAOgGAGgLQAGgKABgNQgBgSgKgKQgLgLgTAAQgOAAgNAGQgMAHgKAKIgPgRQANgMAQgHQARgIATAAQATAAAOAHQAQAGAIANQAIANABATQgBAWgKAOQgMAOgTAHIAAABQAOADALAHQAMAIAGAMQAHANAAAQQAAAVgKAPQgKAPgQAIQgRAHgUAAQgSAAgOgEg");
	this.shape_15.setTransform(10.35,24.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(3));

	// 图层_2
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_16.setTransform(114.675,22.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-4.8,236.79999999999998,55.199999999999996);


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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("AiPCLIAAgTICIAAIAAgsIhmAAIAAgTIBmAAIAAgmIAUAAIAAAmIBhAAIAAATIhhAAIAAAsICDAAIAAATgAiDAaIgHgHQAVgOAKgPQAIgQADgRIgoAAIAAgTIApAAIAAgDIAAgrIgeAAIAAgTICOAAIAAATIgeAAIAAAuIAkAAIAAATIgkAAIAABFIgUAAIAAhFIgrAAQgCAVgLAUQgLAUgXAPIgIgHgAhLhBIAAADIAqAAIAAguIgqAAgAA/ATIgFgJIAZAAIAPAAQADAAABgCQABAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBIAAiOIAUAAIAACOQAAAJgCAFQgCAFgIADQgGACgMABIgdAAIgCgKgAAtgQIAAhqIATAAIAABqg");
	this.shape.setTransform(172.2,23.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQASAJALAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQACgHABgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBrAAIABgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQAQAUAaAQQAYARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMghAKIgFgIgAA2ALIgMgMQgHgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_1.setTransform(140.35,24.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_2.setTransform(108.225,24.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("ABQCSIAAhRIgqAAIAAgSIAqAAIAAgvIgvAAIAAgSIA/AAIAHgUIAHgWIAFgUIASAEIgKAeIgKAcIAhAAIAAASIguAAIAAAvIApAAIAAASIgpAAIAABRgAiECKQgEgEgEgDQAPgKAJgMQAHgNAEgNQADgOABgNIgnAAIAAgSIAnAAIAAgnIgrAAIAAgSIA9AAIAGgTIAGgWIADgTIASAEIgIAdIgJAbIAcAAIAAASIgqAAIAAAnIAnAAIAAASIgnAAQgCAPgEARQgDAQgKAPQgKAPgQALIgGgHgAgqCJIgHgHQAZgVANgZQAMgZADgcQAEgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgGAWgNAUQgMATgUARIgHgHgAgmAPQAEgMADgQQADgQACgRIABghIAQACQAAAQgCARQgBASgDARQgCAQgFANgAA6glIgDgTIgHgTIARgCIAGASIAEASIACARIgRADIgCgQgAh4glIgDgTIgGgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAtAAIgJgSIgIgSIASgFIAKAVIAJAUIAjAAIAAASgAAmhUIAAgSIAuAAIgIgTIgJgTIARgFIAMAVIAJAWIAkAAIAAASg");
	this.shape_3.setTransform(76.25,24.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("ABLCRIAAimIhCAAQAAAYgEAeQgDAdgHAdQgJAdgSAYIgIgIIgKgGQARgXAJgcQAHgcADgcQADgbgBgZIAAhTIArgJIApgLQAUgGANgGIASARQgPAGgTAFIgoAKIgoAJIAAA3ICCAAIAAAVIgrAAIAACmgAiKBcIAAjQIBWAAIAAC3IhCAAIAAAZgAh2AvIAtAAIAAiPIgtAAg");
	this.shape_4.setTransform(44.65,24.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_5.setTransform(23.85,34.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.6)").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_6.setTransform(10.625,24.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F7C677").s().p("AiPCLIAAgTICIAAIAAgsIhmAAIAAgTIBmAAIAAgmIAUAAIAAAmIBhAAIAAATIhhAAIAAAsICDAAIAAATgAiDAaIgHgHQAVgOAKgPQAIgQADgRIgoAAIAAgTIApAAIAAgDIAAgrIgeAAIAAgTICOAAIAAATIgeAAIAAAuIAkAAIAAATIgkAAIAABFIgUAAIAAhFIgrAAQgCAVgLAUQgLAUgXAPIgIgHgAhLhBIAAADIAqAAIAAguIgqAAgAA/ATIgFgJIAZAAIAPAAQADAAABgCQABAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBIAAiOIAUAAIAACOQAAAJgCAFQgCAFgIADQgGACgMABIgdAAIgCgKgAAtgQIAAhqIATAAIAABqg");
	this.shape_7.setTransform(172.2,23.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F7C677").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQASAJALAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQACgHABgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBrAAIABgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQAQAUAaAQQAYARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMghAKIgFgIgAA2ALIgMgMQgHgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_8.setTransform(140.35,24.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F7C677").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_9.setTransform(108.225,24.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F7C677").s().p("ABQCSIAAhRIgqAAIAAgSIAqAAIAAgvIgvAAIAAgSIA/AAIAHgUIAHgWIAFgUIASAEIgKAeIgKAcIAhAAIAAASIguAAIAAAvIApAAIAAASIgpAAIAABRgAiECKQgEgEgEgDQAPgKAJgMQAHgNAEgNQADgOABgNIgnAAIAAgSIAnAAIAAgnIgrAAIAAgSIA9AAIAGgTIAGgWIADgTIASAEIgIAdIgJAbIAcAAIAAASIgqAAIAAAnIAnAAIAAASIgnAAQgCAPgEARQgDAQgKAPQgKAPgQALIgGgHgAgqCJIgHgHQAZgVANgZQAMgZADgcQAEgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgGAWgNAUQgMATgUARIgHgHgAgmAPQAEgMADgQQADgQACgRIABghIAQACQAAAQgCARQgBASgDARQgCAQgFANgAA6glIgDgTIgHgTIARgCIAGASIAEASIACARIgRADIgCgQgAh4glIgDgTIgGgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAtAAIgJgSIgIgSIASgFIAKAVIAJAUIAjAAIAAASgAAmhUIAAgSIAuAAIgIgTIgJgTIARgFIAMAVIAJAWIAkAAIAAASg");
	this.shape_10.setTransform(76.25,24.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F7C677").s().p("ABLCRIAAimIhCAAQAAAYgEAeQgDAdgHAdQgJAdgSAYIgIgIIgKgGQARgXAJgcQAHgcADgcQADgbgBgZIAAhTIArgJIApgLQAUgGANgGIASARQgPAGgTAFIgoAKIgoAJIAAA3ICCAAIAAAVIgrAAIAACmgAiKBcIAAjQIBWAAIAAC3IhCAAIAAAZgAh2AvIAtAAIAAiPIgtAAg");
	this.shape_11.setTransform(44.65,24.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F7C677").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_12.setTransform(23.85,34.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F7C677").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_13.setTransform(10.625,24.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},1).wait(3));

	// 图层_2
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_14.setTransform(114.675,22.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(4));

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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("AhcCQIAAiMQgIAZgLAWQgLAWgLAPIgFgKIgHgKQAJgMAJgRQAKgRAIgUQAIgSAGgTIgrAAIAAgUIAuAAIAAg2IgRAEIgSADIgDgIIgEgIIAfgHIAegJQANgEALgFIANARIgRAGIgTAGIAAA7IApAAIAAAUIgpAAIAAAIIAJAMIALAPIALAQIAHALIgNASIgHgNIgJgRIgJgQIAACRgAgmCIIAAgUIBUAAIAAgvIg/AAIAAgUIA/AAIAAgrIhGAAIAAgTICjAAIAAATIhIAAIAAArIBCAAIAAAUIhCAAIAAAvIBPAAIAAAUgAgSgqIAAhdICSAAIAABdgAABg8IBqAAIAAg4IhqAAg");
	this.shape.setTransform(204,24.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AhgCTIAAiLIDEAAIAACLIgWAAIAAgMIiZAAIAAAMgAhLB1ICZAAIAAglIiZAAgAhLA+ICZAAIAAgjIiZAAgAiNgTIAAgUIBSAAQgCgLgFgNQgFgNgHgLIAUgFQAFAIAEAJQAFAIADAJIAFAQIgOADIBXAAIAJgRIAIgUIAHgRIAWAGIgLAYIgNAYIBTAAIAAAUgAh6hfIAAgTIB0AAIgFgOIgHgOIATgEIAKAQIAHAQIBsAAIAAATg");
	this.shape_1.setTransform(172.2,24.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AiFCLIgJgGQARgSAJgTQAIgTADgUQADgUAAgRIAAgqIDgAAIAABoIgVAAIAAgQIi7AAQgDAVgKAVQgJAVgSASIgHgIgAAQAvIBVAAIAAgyIhVAAgAhRAUIgBAOIgBANIBPAAIAAgyIhNAAgAhugvIAAgTIBqAAIAAghIh9AAIAAgTIB9AAIAAgcIAUAAIAAAcIB/AAIAAATIh/AAIAAAhIBxAAIAAATg");
	this.shape_2.setTransform(139.575,24.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AhDCQIAAiQQgIASgKATQgKASgKAPQgLAQgKALIgGgKIgGgKQAMgMAMgSQANgSALgVQALgTAHgVIg7AAIAAgUIBAAAIAAg3IgbAEIgbADIgDgIIgCgJIAsgGQAWgEAUgFQAUgFAOgGIAOARIgYAHIgdAIIAAA7IA4AAIAAAUIg4AAIAAAJIAMANIAQASIAQASIAJANIgNASIgKgQIgPgVIgPgUIAACQgAAWCDIAAj4IB1AAIAAD2IgWAAIAAgZIhKAAIAAAbgAArBUIBKAAIAAi0IhKAAg");
	this.shape_3.setTransform(107.05,24.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("ABQCSIAAhRIgqAAIAAgSIAqAAIAAgvIgvAAIAAgSIA/AAIAHgUIAHgWIAFgUIASAEIgKAeIgKAcIAhAAIAAASIguAAIAAAvIApAAIAAASIgpAAIAABRgAiECKQgEgEgEgDQAPgKAJgMQAHgNAEgNQADgOABgNIgnAAIAAgSIAnAAIAAgnIgrAAIAAgSIA9AAIAGgTIAGgWIADgTIASAEIgIAdIgJAbIAcAAIAAASIgqAAIAAAnIAnAAIAAASIgnAAQgCAPgEARQgDAQgKAPQgKAPgQALIgGgHgAgqCJIgHgHQAZgVANgZQAMgZADgcQAEgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgGAWgNAUQgMATgUARIgHgHgAgmAPQAEgMADgQQADgQACgRIABghIAQACQAAAQgCARQgBASgDARQgCAQgFANgAA6glIgDgTIgHgTIARgCIAGASIAEASIACARIgRADIgCgQgAh4glIgDgTIgGgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAtAAIgJgSIgIgSIASgFIAKAVIAJAUIAjAAIAAASgAAmhUIAAgSIAuAAIgIgTIgJgTIARgFIAMAVIAJAWIAkAAIAAASg");
	this.shape_4.setTransform(76.25,24.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.6)").s().p("ABLCRIAAimIhCAAQAAAYgEAeQgDAdgHAdQgJAdgSAYIgIgIIgKgGQARgXAJgcQAHgcADgcQADgbgBgZIAAhTIArgJIApgLQAUgGANgGIASARQgPAGgTAFIgoAKIgoAJIAAA3ICCAAIAAAVIgrAAIAACmgAiKBcIAAjQIBWAAIAAC3IhCAAIAAAZgAh2AvIAtAAIAAiPIgtAAg");
	this.shape_5.setTransform(44.65,24.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_6.setTransform(23.85,34.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,0,0,0.6)").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_7.setTransform(11.15,24.65);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F7C677").s().p("AhcCQIAAiMQgIAZgLAWQgLAWgLAPIgFgKIgHgKQAJgMAJgRQAKgRAIgUQAIgSAGgTIgrAAIAAgUIAuAAIAAg2IgRAEIgSADIgDgIIgEgIIAfgHIAegJQANgEALgFIANARIgRAGIgTAGIAAA7IApAAIAAAUIgpAAIAAAIIAJAMIALAPIALAQIAHALIgNASIgHgNIgJgRIgJgQIAACRgAgmCIIAAgUIBUAAIAAgvIg/AAIAAgUIA/AAIAAgrIhGAAIAAgTICjAAIAAATIhIAAIAAArIBCAAIAAAUIhCAAIAAAvIBPAAIAAAUgAgSgqIAAhdICSAAIAABdgAABg8IBqAAIAAg4IhqAAg");
	this.shape_8.setTransform(204,24.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F7C677").s().p("AhgCTIAAiLIDEAAIAACLIgWAAIAAgMIiZAAIAAAMgAhLB1ICZAAIAAglIiZAAgAhLA+ICZAAIAAgjIiZAAgAiNgTIAAgUIBSAAQgCgLgFgNQgFgNgHgLIAUgFQAFAIAEAJQAFAIADAJIAFAQIgOADIBXAAIAJgRIAIgUIAHgRIAWAGIgLAYIgNAYIBTAAIAAAUgAh6hfIAAgTIB0AAIgFgOIgHgOIATgEIAKAQIAHAQIBsAAIAAATg");
	this.shape_9.setTransform(172.2,24.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F7C677").s().p("AiFCLIgJgGQARgSAJgTQAIgTADgUQADgUAAgRIAAgqIDgAAIAABoIgVAAIAAgQIi7AAQgDAVgKAVQgJAVgSASIgHgIgAAQAvIBVAAIAAgyIhVAAgAhRAUIgBAOIgBANIBPAAIAAgyIhNAAgAhugvIAAgTIBqAAIAAghIh9AAIAAgTIB9AAIAAgcIAUAAIAAAcIB/AAIAAATIh/AAIAAAhIBxAAIAAATg");
	this.shape_10.setTransform(139.575,24.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F7C677").s().p("AhDCQIAAiQQgIASgKATQgKASgKAPQgLAQgKALIgGgKIgGgKQAMgMAMgSQANgSALgVQALgTAHgVIg7AAIAAgUIBAAAIAAg3IgbAEIgbADIgDgIIgCgJIAsgGQAWgEAUgFQAUgFAOgGIAOARIgYAHIgdAIIAAA7IA4AAIAAAUIg4AAIAAAJIAMANIAQASIAQASIAJANIgNASIgKgQIgPgVIgPgUIAACQgAAWCDIAAj4IB1AAIAAD2IgWAAIAAgZIhKAAIAAAbgAArBUIBKAAIAAi0IhKAAg");
	this.shape_11.setTransform(107.05,24.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F7C677").s().p("ABQCSIAAhRIgqAAIAAgSIAqAAIAAgvIgvAAIAAgSIA/AAIAHgUIAHgWIAFgUIASAEIgKAeIgKAcIAhAAIAAASIguAAIAAAvIApAAIAAASIgpAAIAABRgAiECKQgEgEgEgDQAPgKAJgMQAHgNAEgNQADgOABgNIgnAAIAAgSIAnAAIAAgnIgrAAIAAgSIA9AAIAGgTIAGgWIADgTIASAEIgIAdIgJAbIAcAAIAAASIgqAAIAAAnIAnAAIAAASIgnAAQgCAPgEARQgDAQgKAPQgKAPgQALIgGgHgAgqCJIgHgHQAZgVANgZQAMgZADgcQAEgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgGAWgNAUQgMATgUARIgHgHgAgmAPQAEgMADgQQADgQACgRIABghIAQACQAAAQgCARQgBASgDARQgCAQgFANgAA6glIgDgTIgHgTIARgCIAGASIAEASIACARIgRADIgCgQgAh4glIgDgTIgGgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAtAAIgJgSIgIgSIASgFIAKAVIAJAUIAjAAIAAASgAAmhUIAAgSIAuAAIgIgTIgJgTIARgFIAMAVIAJAWIAkAAIAAASg");
	this.shape_12.setTransform(76.25,24.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F7C677").s().p("ABLCRIAAimIhCAAQAAAYgEAeQgDAdgHAdQgJAdgSAYIgIgIIgKgGQARgXAJgcQAHgcADgcQADgbgBgZIAAhTIArgJIApgLQAUgGANgGIASARQgPAGgTAFIgoAKIgoAJIAAA3ICCAAIAAAVIgrAAIAACmgAiKBcIAAjQIBWAAIAAC3IhCAAIAAAZgAh2AvIAtAAIAAiPIgtAAg");
	this.shape_13.setTransform(44.65,24.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F7C677").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_14.setTransform(23.85,34.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F7C677").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_15.setTransform(11.15,24.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(3));

	// 图层_2
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_16.setTransform(118.425,18.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(4));

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
	this.shape.graphics.f("#333333").s().p("AijEeIAAjPQgXAggcAbQgcAcghAYIgFgGQAYghATgqQASgpAOgsQAPgtAJgrIhTAAIgFgRIBqAAIAAhmIg0ADIgzABIgBgGQAlgNAngRQAmgQAjgTQAigSAWgRIBXBRIAAgOIBYAkIAzAAIAogsIBNA9QgDAEgGADQgGADgIADIAAFoQgCAEgLAFQgLAGgRAFQgRAEgPABIgOAAIAAhBIg9AAIAAAsQAAAFgLAHQgKAGgQAGQgPAFgUABIgNAAIAAk4QgCADgEABQgEABgFABIhaAAIAAAqQAwAMAWASQAVATAEATQADAUgKAOQgJAPgRACQgSABgTgPQgBgXgGgWQgHgXgLgSIAAEJQAAADgIAFQgJAFgPAFQgPAFgVABgABuCXIA9AAIAAk9Ig9AAgAgdiAIAaAYIAcAbIAAh8QgGADgLABQgKgBgPgFIgdAGIgiAFIAABvIAng5IAMAKg");
	this.shape.setTransform(229,48.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AiNEWQA0g8AahBQAbhCAKhIQAJhIAAhQIhEAAIgFgRIBJAAIAAhAIAAhCIBvAKQgBAGgFAFQgGAEgLACIAAA0IgBAzIAqAAIAsgsIBIA/QgEAEgGAEQgGADgLACIgBAzIAFgCQAsAZAUAbQATAbABAXQABAZgMAPQgLAPgSABQgSABgSgUQAEgigEghQgDgkgKgdQgBBPgDA4QgDA3gFAkQgFAlgIAUQgIAWgMAMQgRAQgWAIQgVAIgcgBQAAgUgDgPQgCgOgGgIQgHgLgNgHQgNgHgSgEIAAgIIAXACIAXABIASAAQAHAAAFgCQAFgBAEgEQAKgJAGglQAFgkAEhEQADhEABhnIgyAAQgBBBgIA9QgIA6gVA2QgWA1gnAuQgoAvhBAmgAjoEdIAAl+IgzAAIgFgQIA4AAIAAirIBlAJQgBAGgEAFQgEADgLACIAACRIAiguIALAJIAYAWIAbAXQgCAFgEACQgEACgGAAIhQAAIAAFhQAAAFgKAGQgKAHgPAFQgPAFgPABgAhyBdQgMgFgHgNQgIgSAGgPQAHgPAPgLQAJgIAKgOQAJgPAGgSQAGgTgBgVIAHAAQARAoAEAeQAFAfgFAXQgGAYgNAOQgJALgNACIgJABQgJAAgJgEg");
	this.shape_1.setTransform(169.879,48.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgsEeIAAkmQgwA3g7AtQg8AvhFAhIgDgEQAsgmAoguQApgsAggxQAhgxAXgyQAYgzALguIjsAAIgEgRIGkAAIAyg/IAQANIAkAbIAmAeQgCAFgFADQgEACgHAAIi7AAQgLAcgPAcQgPAcgRAbIApAPQgBAFgEADQgFACgJACIAAFPQAAACgLAEQgLAEgRAEQgQADgQABgADUB+QgQgfgaggQgZgggdgdQgdgcgdgVIAFgFQBHAKAtAVQAuAUAYAWQAYAZAGAXQAHAYgIAQQgHARgSAGQgGACgGAAQgNAAgQgIg");
	this.shape_2.setTransform(109.6,48.2);

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
	this.shape.graphics.f("#333333").s().p("AikEeIAAjPQgWAggbAbQgdAcghAYIgFgGQAYghATgqQATgpAOgsQANgtAKgrIhTAAIgFgRIBpAAIAAhmIgyADIg0ABIAAgGQAkgNAmgRQAngQAjgTQAigSAXgRIBVBRIAAgOIBZAkIA0AAIAmgsIBOA9QgDAEgFADQgHADgJADIAAFoQgBAEgLAFQgMAGgQAFQgQAEgQABIgOAAIAAhBIg9AAIAAAsQgBAFgJAHQgLAGgPAGQgRAFgSABIgPAAIAAk4QgCADgDABQgEABgEABIhaAAIAAAqQAuAMAXASQAVATADATQAEAUgKAOQgJAPgSACQgRABgTgPQgBgXgGgWQgHgXgKgSIAAEJQgBADgIAFQgIAFgQAFQgPAFgVABgABuCXIA9AAIAAk9Ig9AAgAgdiAIAaAYIAbAbIAAh8QgFADgLABQgKgBgPgFIgeAGIggAFIAABvIAmg5IAMAKg");
	this.shape.setTransform(172,48.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AiNEWQA0g8AahBQAbhCAKhIQAJhIAAhQIhEAAIgFgRIBJAAIAAhAIAAhCIBvAKQgBAGgFAFQgGAEgLACIAAA0IgBAzIAqAAIAsgsIBIA/QgEAEgGAEQgGADgLACIgBAzIAFgCQAsAZAUAbQATAbABAXQABAZgMAPQgLAPgSABQgSABgSgUQAEgigEghQgDgkgKgdQgBBPgDA4QgDA3gFAkQgFAlgIAUQgIAWgMAMQgRAQgWAIQgVAIgcgBQAAgUgDgPQgCgOgGgIQgHgLgNgHQgNgHgSgEIAAgIIAXACIAXABIASAAQAHAAAFgCQAFgBAEgEQAKgJAGglQAFgkAEhEQADhEABhnIgyAAQgBBBgIA9QgIA6gVA2QgWA1gnAuQgoAvhBAmgAjoEdIAAl+IgzAAIgFgQIA4AAIAAirIBlAJQgBAGgEAFQgEADgLACIAACRIAiguIALAJIAYAWIAbAXQgCAFgEACQgEACgGAAIhQAAIAAFhQAAAFgKAGQgKAHgPAFQgPAFgPABgAhyBdQgMgFgHgNQgIgSAGgPQAHgPAPgLQAJgIAKgOQAJgPAGgSQAGgTgBgVIAHAAQARAoAEAeQAFAfgFAXQgGAYgNAOQgJALgNACIgJABQgJAAgJgEg");
	this.shape_1.setTransform(112.879,48.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgmAnQgQgQAAgWQAAgWAQgQQAPgQAXAAQAXAAAQAQQAPAQABAWQgBAWgPAQQgQAPgXAAQgXAAgPgPg");
	this.shape_2.setTransform(57.875,66.575);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AAPDhIAAgUIA1gGIgkh0IiJAAIghByIA5AIIAAAUIiKAAIAAgUIAygHICImmIA9AAICQGnIAwAGIAAAUgAAaA+IhBjMIg7DMIB8AAg");
	this.shape_3.setTransform(24.95,48.55);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("A81IzIAAxkMA5qAAAIAARkg");
	this.shape_4.setTransform(164.85,46.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

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
	var mask_graphics_29 = new cjs.Graphics().p("AnhLfIAA29IPDAAIAAW9g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-40.5,y:-0.775}).wait(1).to({graphics:mask_graphics_1,x:-36.55,y:-0.775}).wait(1).to({graphics:mask_graphics_2,x:-32.575,y:-0.775}).wait(1).to({graphics:mask_graphics_3,x:-28.625,y:-0.775}).wait(1).to({graphics:mask_graphics_4,x:-24.675,y:-0.775}).wait(1).to({graphics:mask_graphics_5,x:-20.725,y:-0.775}).wait(1).to({graphics:mask_graphics_6,x:-16.75,y:-0.775}).wait(1).to({graphics:mask_graphics_7,x:-12.8,y:-0.775}).wait(1).to({graphics:mask_graphics_8,x:-8.85,y:-0.775}).wait(1).to({graphics:mask_graphics_9,x:-4.9,y:-0.775}).wait(1).to({graphics:mask_graphics_10,x:-0.925,y:-0.775}).wait(1).to({graphics:mask_graphics_11,x:3.025,y:-0.775}).wait(18).to({graphics:mask_graphics_29,x:3.025,y:-0.775}).wait(1).to({graphics:null,x:0,y:0}).wait(35));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#39B54A").s().p("AiHFKIgKgCIgLgCIgKgEQgLgEgDgDQgOgKgFgFQgMgLgKgPIgKgXQgPghgWgfQgeglgnggIgVgOQgPgJgJgPIgGgPQgFgSAFgRIAGgQQAHgLAKgHQAJgIAOgDQAMgFAOADQAOABAKAHQAbAQAeAaQAnAhAnA0QAMARANAWIAuhKQAmg6AlgvQAvhAAsgwQAsgvAwgrQA3gxBCgwQAPgIASAAIASACQAQAFAMAMIALANQAHAMAAAMQADANgEAOQgDANgIAJQgIALgLAGIgfAYQgeAXgXAUQgxArgtAwQgoAqgmAvIgtA/QgrA+gpBIIgbAsQgKAOgFAFQgQARgaAJQgKAEgMAAIgDAAg");
	this.shape.setTransform(5.4143,4.5025);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(29).to({_off:true},1).wait(35));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.7,-28.5,78.30000000000001,66);


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
	this.shape.graphics.f("#CCCCCC").s().p("AAMBxIAAhQIA4AAQgOgHgLgJQgMgIgJgJIgxAAQgIAJgLAIQgLAJgMAHIA5AAIAABOIgRAAIAAgGIguAAIAAAIIgQAAIAAhEIgKAFIgJADQgBgDgDgEIgFgFQAVgIASgLQASgLANgLIhCAAIAAgPIBRAAQAGgHAEgGIAIgOIhQAAIAAhFIBRAAIAABDIABgBIAQADIgGAOIgJANIBLAAIgQgJIgRgIIAKgJIANAFIAOAIIALAHIgHAGIAtAAIAAAPIhIAAQALAIAMAHQANAHAOAFQAOAGAOADIgGAHIgGAHIgHgDIgIgDIAABDIgRAAIAAgGIgxAAIAAAIgAAcBZIAxAAIAAgpIgxAAgAhLBZIAuAAIAAgpIguAAgAhRg5IAxAAIAAgoIgxAAgAANgqIAAhFIBTAAIAABFgAAdg5IAzAAIAAgoIgzAAg");
	this.shape.setTransform(79.45,87.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AhkB2IgCgIIgDgIIARAAIAKAAQAAAAABAAQAAAAABAAQABAAAAgBQAAAAABAAIABgEIAAhGIgiAKIgFgSIASgEIAVgGIAAg5IgjAAIAAgRIAjAAIAAg0IARAAIAAA0IAfAAIAAARIgfAAIAAA0IAfgIIACAPIghALIAABLQAAAIgCAEQgCAEgFACQgFACgIABIgKAAIgMAAgAgLB2IAAi9IArAAIAEgPIAEgQIADgPIAUACIgHAXIgHAVIBAAAIAAC7IgSAAIAAgNIhaAAIAAAPgAAFBXIBaAAIAAhAIhaAAgAAFAHIBaAAIAAg9IhaAAg");
	this.shape_1.setTransform(52.675,86.7875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AgiB3IAAiBIhFAAIAAgQIDAAAIAABWQAAAIgDAFQgCAEgHACQgGADgMABIgfAAIgCgJIgEgJIAbABIAQgBIAFgBQAAAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBIAAhGIhXAAIAACBgAAjgoIAAgfIhGAAIAAAfIgSAAIAAgfIg9AAIAAgQIA9AAIAAgfIASAAIAAAfIBGAAIAAgfIASAAIAAAfIA+AAIAAAQIg+AAIAAAfg");
	this.shape_2.setTransform(27.475,86.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhRBSIAAijICjAAIAACjg");
	this.shape_3.setTransform(52.1695,29.9766,1.1768,1.1768);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E28623").s().p("AjUDUQhXhYAAh8QAAh8BXhXQBZhYB7AAQB8AABYBYQBYBXAAB8QAAB8hYBYQhYBYh8AAQh7AAhZhYg");
	this.shape_4.setTransform(52.15,30);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(12.5,0,82.2,106.5);


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
	this.shape.graphics.f("#CCCCCC").s().p("AAMBxIAAhQIA4AAQgOgHgLgJQgMgIgJgJIgxAAQgIAJgLAIQgLAJgMAHIA5AAIAABOIgRAAIAAgGIguAAIAAAIIgQAAIAAhEIgKAFIgJADQgBgDgDgEIgFgFQAVgIASgLQASgLANgLIhCAAIAAgPIBRAAQAGgHAEgGIAIgOIhQAAIAAhFIBRAAIAABDIABgBIAQADIgGAOIgJANIBLAAIgQgJIgRgIIAKgJIANAFIAOAIIALAHIgHAGIAtAAIAAAPIhIAAQALAIAMAHQANAHAOAFQAOAGAOADIgGAHIgGAHIgHgDIgIgDIAABDIgRAAIAAgGIgxAAIAAAIgAAcBZIAxAAIAAgpIgxAAgAhLBZIAuAAIAAgpIguAAgAhRg5IAxAAIAAgoIgxAAgAANgqIAAhFIBTAAIAABFgAAdg5IAzAAIAAgoIgzAAg");
	this.shape.setTransform(79.45,87.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AhkB2IgCgIIgDgIIARAAIAKAAQAAAAABAAQAAAAABAAQABAAAAgBQAAAAABAAIABgEIAAhGIgiAKIgFgSIASgEIAVgGIAAg5IgjAAIAAgRIAjAAIAAg0IARAAIAAA0IAfAAIAAARIgfAAIAAA0IAfgIIACAPIghALIAABLQAAAIgCAEQgCAEgFACQgFACgIABIgKAAIgMAAgAgLB2IAAi9IArAAIAEgPIAEgQIADgPIAUACIgHAXIgHAVIBAAAIAAC7IgSAAIAAgNIhaAAIAAAPgAAFBXIBaAAIAAhAIhaAAgAAFAHIBaAAIAAg9IhaAAg");
	this.shape_1.setTransform(52.675,86.7875);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CCCCCC").s().p("AgiB3IAAiBIhFAAIAAgQIDAAAIAABWQAAAIgDAFQgCAEgHACQgGADgMABIgfAAIgCgJIgEgJIAbABIAQgBIAFgBQAAAAAAgBQABAAAAgBQAAAAAAgBQAAAAAAgBIAAhGIhXAAIAACBgAAjgoIAAgfIhGAAIAAAfIgSAAIAAgfIg9AAIAAgQIA9AAIAAgfIASAAIAAAfIBGAAIAAgfIASAAIAAAfIA+AAIAAAQIg+AAIAAAfg");
	this.shape_2.setTransform(27.475,86.75);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("Aivj8IFfD9IlfD8g");
	this.shape_3.setTransform(56.3781,29.9663,0.5591,0.5591);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E28623").s().p("AkaEbQh1h2AAilQAAilB1h1QB2h1CkAAQCmAAB0B1QB2B1AAClQAAClh2B2Qh0B1imAAQikAAh2h1g");
	this.shape_4.setTransform(52.1375,29.975,0.75,0.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(12.5,0,82.2,106.5);


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
	this.shape.setTransform(10.2233,41.2493,3.0715,3.0715);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_1.setTransform(27.8624,41.2274,3.0715,3.0715);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_2.setTransform(44.6823,41.2749,3.0715,3.0715);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgkCDQgCgEABgEQAAgEAEgCQAYgRANggQAOgfAAglQAAgkgOgfQgNgfgXgSQgEgCAAgEQgBgEACgEQADgDAEgBQAEAAADACQAbAUAQAkQAQAjAAApQAAAqgQAkQgRAjgbAUQgDACgCAAQgGAAgDgEg");
	this.shape_3.setTransform(61.3965,41.2365,3.0715,3.0715);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape},{t:this.shape_1}]},8).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_2}]},9).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_2},{t:this.shape_3}]},9).wait(8));

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ArfLgIAA2/IW/AAIAAW/g");
	this.shape_4.setTransform(42.3,52.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(34));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.3,-21.3,147.20000000000002,147.20000000000002);


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


(lib._5_Bbtn = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#333333").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape.setTransform(42.525,51.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AiWCsIAAgQIApgEIABhJIAAhLIAAgPIAAhHIgBhGIgpgDIAAgQIChAAQAsAAAaALQAaAKAMASQAMASAAAYQAAARgJAQQgJAPgVANQgVAMglAGQA+AHAcAVQAbAXAAAkQAAAXgNAWQgOAWgiAOQgiAOg9ABgAggBPIACBMIAXAAQAlAAAUgUQAVgUAAgmQAAgngUgTQgUgTgpAAIgWAAIAABPgAgghVIAABGIASAAQAjgBARgTQASgSAAgjQAAgfgPgRQgQgRgiAAIgVAAIgCBEg");
	this.shape_1.setTransform(19.0009,37.775);

	this.instance = new lib._22();
	this.instance.setTransform(66.3,10.75,0.7162,0.7154);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CC3300").s().p("EhsFAIxIAAxhMDYJAAAIABRhg");
	this.shape_2.setTransform(691.75,43.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-12.6,1383.5,112.1);


(lib._5_Abtn = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib._11();
	this.instance.setTransform(66.3,10.75,0.7162,0.7154);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape.setTransform(44.825,51.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AAMCtIAAgQIAogFIgchZIhoAAIgaBYIAsAGIAAAQIhpAAIAAgQIAmgGIBnlDIAwAAIBuFEIAlAFIAAAQgAATAwIgwidIguCdIBeAAg");
	this.shape_1.setTransform(19.6,37.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CC3300").s().p("EhsFAIxIAAxhMDYJAAAIABRhg");
	this.shape_2.setTransform(691.75,43.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.instance}]}).to({state:[{t:this.shape_2}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-12.6,1383.5,112.1);


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


(lib.mstop_btn = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(73.6,73.6,1,1,0,0,0,73.6,73.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.3,-21.3,147.20000000000002,147.20000000000002);


(lib.节拍器 = function(mode,startPosition,loop,reversed) {
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
	this.frame_0 = function() {
		playSound("节拍器声音");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(31));

	// 图层_1
	this.instance = new lib.实心圆图形();
	this.instance.setTransform(-441.4,-226.55);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({alpha:0.9375},0).wait(1).to({alpha:0.875},0).wait(1).to({alpha:0.8125},0).wait(1).to({alpha:0.75},0).wait(1).to({alpha:0.6875},0).wait(1).to({alpha:0.625},0).wait(1).to({alpha:0.5625},0).wait(1).to({alpha:0.5},0).wait(1).to({alpha:0.4375},0).wait(1).to({alpha:0.375},0).wait(1).to({alpha:0.3125},0).wait(1).to({alpha:0.25},0).wait(1).to({alpha:0.1875},0).wait(1).to({alpha:0.125},0).wait(1).to({alpha:0.0625},0).wait(1).to({x:-441.35,alpha:0},0).wait(15));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-508.8,-294,134.90000000000003,134.9);


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
(lib.听一听 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:5,"1A":82,"1B":112,lnav2:143,lnav3:148,lnav4:153,m4:157,lnav5:159,m5:164,"5a":528,"5b":558,播放:153,停止:157};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,5,6,81,83,111,112,142,143,148,153,157,159,164,165,527,529,557,558,588];
	this.streamSoundSymbolsList[6] = [{id:"yx420102听辨和声音程题目",startFrame:6,endFrame:81,loop:1,offset:0}];
	this.streamSoundSymbolsList[165] = [{id:"雪绒花片段",startFrame:165,endFrame:527,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		
		
		var _this = this;
		
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
		
		
		
		_this.a1_btn.on('click', function(){
		
		_this.gotoAndPlay('1A');
			
		});
		
		
		_this.b1_btn.on('click', function(){
		
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
		var soundInstance = playSound("yx420102听辨和声音程题目",0);
		this.InsertIntoSoundStreamData(soundInstance,6,81,1);
	}
	this.frame_81 = function() {
		this.stop();
	}
	this.frame_83 = function() {
		playSound("victory");
	}
	this.frame_111 = function() {
		this.stop();
	}
	this.frame_112 = function() {
		playSound("fail");
	}
	this.frame_142 = function() {
		this.stop();
	}
	this.frame_143 = function() {
		this.stop();
	}
	this.frame_148 = function() {
		this.stop();
	}
	this.frame_153 = function() {
		this.stop();
		
		
		var _this = this;
		/*
		单击指定元件实例时将执行相应函数。
		*/
		_this.playm4_btn.on('click', function(){
		/*
		将播放头移动到时间轴中的指定帧标签并继续从该帧播放。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndPlay('m4');
		});
	}
	this.frame_157 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		单击指定元件实例时将执行相应函数。
		*/
		_this.stopm4_btn.on('click', function(){
		/*
		将播放头移动到时间轴中的指定帧标签并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav4');
		});
	}
	this.frame_159 = function() {
		var _this = this;
		
		
		_this.a5_btn.on('click', function(){
		
		_this.gotoAndPlay('5a');
		});
		
		
		_this.b5_btn.on('click', function(){
		
		_this.gotoAndPlay('5b');
		});
		
		
		
		
		_this.m5_btn.on('click', function(){
		
		_this.gotoAndPlay('m5');
		});
	}
	this.frame_164 = function() {
		var _this = this;
		/*
		单击指定元件实例时将执行相应函数。
		*/
		_this.m5stop_btn.on('click', function(){
		/*
		将播放头移动到时间轴中的指定帧标签并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav5');
		});
	}
	this.frame_165 = function() {
		var soundInstance = playSound("雪绒花片段",0);
		this.InsertIntoSoundStreamData(soundInstance,165,527,1);
	}
	this.frame_527 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧标签并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav5');
	}
	this.frame_529 = function() {
		playSound("victory");
	}
	this.frame_557 = function() {
		this.stop();
	}
	this.frame_558 = function() {
		playSound("fail");
	}
	this.frame_588 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(5).call(this.frame_5).wait(1).call(this.frame_6).wait(75).call(this.frame_81).wait(2).call(this.frame_83).wait(28).call(this.frame_111).wait(1).call(this.frame_112).wait(30).call(this.frame_142).wait(1).call(this.frame_143).wait(5).call(this.frame_148).wait(5).call(this.frame_153).wait(4).call(this.frame_157).wait(2).call(this.frame_159).wait(5).call(this.frame_164).wait(1).call(this.frame_165).wait(362).call(this.frame_527).wait(2).call(this.frame_529).wait(28).call(this.frame_557).wait(1).call(this.frame_558).wait(30).call(this.frame_588).wait(4));

	// leftnav_on
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E28726").s().p("AhcCQIAAiMQgJAZgKAWQgKAWgMAPIgGgKIgGgKQAKgMAJgRQAJgRAIgUQAIgSAGgTIgrAAIAAgUIAuAAIAAg2IgRAEIgSADIgDgIIgDgIIAegHIAegJQANgEAKgFIAPARIgSAGIgTAGIAAA7IAoAAIAAAUIgoAAIAAAIIAJAMIALAPIALAQIAIALIgPASIgGgNIgIgRIgKgQIAACRgAgmCIIAAgUIBUAAIAAgvIg+AAIAAgUIA+AAIAAgrIhGAAIAAgTICjAAIAAATIhIAAIAAArIBCAAIAAAUIhCAAIAAAvIBPAAIAAAUgAgRgqIAAhdICRAAIAABdgAABg8IBqAAIAAg4IhqAAg");
	this.shape.setTransform(306.3,442.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28726").s().p("AhfCTIAAiLIDDAAIAACLIgWAAIAAgMIiZAAIAAAMgAhLB1ICZAAIAAglIiZAAgAhLA+ICZAAIAAgjIiZAAgAiMgTIAAgUIBSAAQgCgLgGgNQgFgNgHgLIAUgFQAGAIADAJQAFAIADAJIAEAQIgNADIBXAAIAJgRIAIgUIAGgRIAYAGIgNAYIgMAYIBSAAIAAAUgAh6hfIAAgTIB1AAIgGgOIgIgOIAVgEIAJAQIAGAQIBtAAIAAATg");
	this.shape_1.setTransform(274.5,442.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28726").s().p("AiFCLIgJgHQARgRAJgTQAIgTADgUQADgTAAgSIAAgpIDgAAIAABoIgVAAIAAgQIi7AAQgDAUgKAWQgJAUgSASIgHgIgAAQAwIBVAAIAAgzIhVAAgAhRAVIgBAMIgBAPIBPAAIAAgzIhNAAgAhugwIAAgSIBqAAIAAgiIh9AAIAAgTIB9AAIAAgbIAUAAIAAAbIB/AAIAAATIh/AAIAAAiIBxAAIAAASg");
	this.shape_2.setTransform(241.875,442.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28726").s().p("AhDCQIAAiQQgIASgKASQgKASgKAQQgKAQgLALIgFgKIgHgJQANgNAMgSQAMgSALgUQAKgVAIgUIg7AAIAAgUIBAAAIAAg3IgbAEIgbAEIgCgJIgEgJIAsgGIArgJQAUgFAOgGIAOARIgYAIIgeAHIAAA7IA5AAIAAAUIg5AAIAAAIIANAPIAQARIAPASIAKANIgMARIgLgPIgPgVIgQgUIAACQgAAWCDIAAj4IB1AAIAAD1IgVAAIAAgXIhLAAIAAAagAArBUIBLAAIAAi0IhLAAg");
	this.shape_3.setTransform(209.35,442.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E28726").s().p("ABPCSIAAhRIgpAAIAAgSIApAAIAAgvIguAAIAAgSIA/AAIAIgUIAGgWIAFgUIASAEIgKAeIgKAcIAhAAIAAASIgvAAIAAAvIAqAAIAAASIgqAAIAABRgAiECKQgDgEgEgDQAOgKAIgMQAIgNAEgNQADgOABgNIgnAAIAAgSIAnAAIAAgnIgsAAIAAgSIA+AAIAGgTIAFgWIAFgTIASAEIgJAdIgIAbIAbAAIAAASIgqAAIAAAnIAoAAIAAASIgpAAQgBAPgDARQgFAQgJAPQgKAPgQALIgGgHgAgpCJIgHgHQAZgVAMgZQALgZAFgcQADgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgHAWgMAUQgMATgVARIgFgHgAgmAPQAEgMADgQQADgQABgRIACghIAPACQABAQgCARQAAASgDARQgEAQgEANgAA7glIgFgTIgFgTIAQgCIAFASIAFASIADARIgSADIgBgQgAh4glIgDgTIgGgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAtAAIgIgSIgJgSIASgFIALAVIAJAUIAiAAIAAASgAAmhUIAAgSIAvAAIgIgTIgKgTIASgFIALAVIAJAWIAkAAIAAASg");
	this.shape_4.setTransform(178.55,442.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E28726").s().p("ABLCRIAAimIhCAAQAAAYgDAeQgEAdgHAdQgKAdgRAYIgIgIIgKgGQARgXAIgcQAJgcACgcQACgbAAgZIAAhTIArgJIApgLQATgGAOgGIATARQgQAGgTAFIgnAKIgpAJIAAA3ICCAAIAAAVIgrAAIAACmgAiJBcIAAjQIBVAAIAAC3IhCAAIAAAZgAh2AvIAtAAIAAiPIgtAAg");
	this.shape_5.setTransform(146.95,442.375);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E28726").s().p("AgNAPQgFgFgBgJQABgJAFgGQAGgFAHgBQAIABAGAFQAGAGgBAJQABAJgGAFQgGAGgIAAQgHAAgGgGg");
	this.shape_6.setTransform(126.15,452.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E28726").s().p("Ag+B1IAAgVIA1AAIAAizIgqAAIAAgRQAPgDAMgEQAMgDAJgGIATAAIAADUIAvAAIAAAVg");
	this.shape_7.setTransform(113.45,442.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E28726").s().p("AiPCLIAAgTICHAAIAAgsIhlAAIAAgTIBlAAIAAgmIAVAAIAAAmIBhAAIAAATIhhAAIAAAsICDAAIAAATgAiCAaIgHgHQAUgOAJgPQAKgQACgRIgoAAIAAgTIAqAAIAAgDIAAgrIggAAIAAgTICPAAIAAATIgeAAIAAAuIAlAAIAAATIglAAIAABFIgUAAIAAhFIgrAAQgCAVgMAUQgKAUgYAPIgGgHgAhLhBIAAADIAqAAIAAguIgqAAgAA+ATIgEgJIAZAAIAOAAQAEAAACgCQAAAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBIAAiOIAUAAIAACOQAAAJgCAFQgDAFgGADQgHACgMABIgdAAIgDgKgAAsgQIAAhqIAUAAIAABqg");
	this.shape_8.setTransform(276.45,505.475);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E28726").s().p("ABPCBQgQgKgTgJQgTgJgRgHIAPgOIAjAQQATAIARAKQAQAJAMAIIgPAPQgLgIgRgJgAhwCKIgHgIQAbgIAUgJQATgJAMgKQAMgJAHgKIhRAAIAAgSIBZAAQACgHABgIIABgNIAAAAIgxAAIAAgMQgQAOgSAMQgSAMgXAJIgGgJIgHgHQAdgMAXgQQAXgRAQgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhoAAIAAgRIBsAAIABgOIABgMIAVABIgCAMIgCANIBuAAIAAARIhxAAIgDANIgDAMIBqAAIAAASIhwAAIgGAMIgGANICfAAIAAASIhXAAQARAUAaAQQAZARAcAIIgIAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBgAAIAAASIhmAAQgFAMgNANQgMANgWALQgVAMgiAKIgFgIgAA2ALIgMgMQgGgHgFgIIg+AAIgKAPIgNAMIBsAAIAAAAg");
	this.shape_9.setTransform(244.6,506.025);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E28726").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_10.setTransform(212.475,505.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E28726").s().p("ABQCSIAAhRIgqAAIAAgSIAqAAIAAgvIguAAIAAgSIA/AAIAHgUIAGgWIAFgUIASAEIgJAeIgKAcIAfAAIAAASIguAAIAAAvIAqAAIAAASIgqAAIAABRgAiECKQgDgEgFgDQAPgKAIgMQAJgNACgNQAEgOABgNIgnAAIAAgSIAnAAIAAgnIgrAAIAAgSIA9AAIAGgTIAFgWIAEgTIASAEIgIAdIgIAbIAcAAIAAASIgrAAIAAAnIAnAAIAAASIgnAAQgBAPgFARQgDAQgKAPQgJAPgRALIgGgHgAgqCJIgGgHQAYgVANgZQALgZAFgcQADgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgGAWgMAUQgNATgVARIgGgHgAgmAPQAFgMACgQQADgQABgRIACghIAQACQAAAQgBARQgBASgEARQgDAQgEANgAA7glIgFgTIgGgTIAQgCIAHASIAEASIADARIgRADIgCgQgAh4glIgEgTIgFgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAsAAIgIgSIgIgSIASgFIALAVIAJAUIAiAAIAAASgAAlhUIAAgSIAvAAIgHgTIgKgTIARgFIAMAVIAKAWIAjAAIAAASg");
	this.shape_11.setTransform(180.5,505.975);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E28726").s().p("ABKCRIAAimIhBAAQAAAYgDAeQgEAdgIAdQgIAdgSAYIgJgIIgJgGQARgXAIgcQAJgcACgcQACgbAAgZIAAhTIAqgJIAqgLQAUgGANgGIATARQgQAGgTAFIgoAKIgoAJIAAA3ICBAAIAAAVIgqAAIAACmgAiJBcIAAjQIBVAAIAAC3IhBAAIAAAZgAh1AvIAtAAIAAiPIgtAAg");
	this.shape_12.setTransform(148.9,506.025);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E28726").s().p("AgNAPQgGgFABgJQgBgJAGgGQAGgFAHgBQAIABAGAFQAFAGABAJQgBAJgFAFQgGAGgIAAQgHAAgGgGg");
	this.shape_13.setTransform(128.1,516.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#E28726").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_14.setTransform(114.875,506.175);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#E28726").s().p("ABACSIgfgBIgDgLQgCgGgDgFIAhABIAXABIAIgBQAEgBADgDQAEgEADgNQADgNADgXIAFg7IADhVIizAAQgNAZgOAVQgPAWgQAPIgIgGIgKgHQARgRAPgWQAPgVAMgaQAMgZAJgbIAWAFIgIAVIgJAVIDAAAIAAACIAAAFIAAAEIgEBfQgCAogDAZQgCAagEAOQgEAOgFAGQgFAHgHACQgGADgJABIgPAAIgJAAgAhNBqIAAiJIB7AAIAABxIhmAAIAAAYgAg4A/IBRAAIAAhKIhRAAg");
	this.shape_15.setTransform(307.75,571.9833);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#E28726").s().p("AiJCHIgIgHQAUgSALgVQAMgVAGgWQAFgWACgVIg2AAIAAgSIA3AAIAAgGIAAgHIAAgzIgTAAIgJAbQgFANgGALIgIgGIgJgGQAIgMAFgRQAGgQAEgTIAHgmIAUAEIgEAUIgEATIBKAAIAAAUIgoAAIAAAzIAAAHIAAAGIAtAAIAAASIgvAAIgBANIgCANIALAPIAOASIANASIAJAMIgOASIgKgRIgOgVIgOgTQgGAYgNAXQgNAXgVAUIgGgIgAgeCKIAAgUIBjAAIALgZIALgcIAIgbIAWAFIgKAZIgLAbIgKAXIA4AAIAAAUgAAUBbIgIgXIgKgXIASgFIAKAXIAIAXIAGAVIgTAFIgFgVgAgGAaIAAhiICHAAIAABigAANAGIBgAAIAAg7IhgAAgAgRhsIAAgUICgAAIAAAUg");
	this.shape_16.setTransform(276.425,571.625);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#E28726").s().p("Ag6CKIgJgHQAXgQANgVQAOgWAGgaQAHgbADgcQABgdABgeIg3AAIAAgVIDJAAIAAAVIh8AAIgBAZIgBAYIBmAAIAAAKIgFBNQgDAdgDAPQgDAPgFAFQgEAGgFABQgGADgHAAIgSAAIgYAAIgCgLIgFgJIAZABIAQAAQAEABADgBQACgBACgCQAEgEADgNQADgMACgZIADhCIhRAAQgDAegIAbQgIAbgNAWQgPAXgXARIgHgIgAhnCRIAAizIgPAUIgPASIgGgKIgHgKQAPgRAOgUQAOgVAMgXQAMgYAIgYIAVAGQgHATgIARQgIASgKARIAADVgAAphpIgGgSIgFgRIAUgEIAGAQIAGARIAEAOIgWAGIgDgOg");
	this.shape_17.setTransform(180.325,571.95);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#E28726").s().p("ABQB4QgWgSgMgcIgBAAQgGASgLANQgMAOgRAKQgTAKgcAHIgFgJIgGgIQAYgFAQgIQARgIAJgKQAKgKAGgOIhKAAIAAgSIBQAAIADgNIACgPIhAAAIAAhgICaAAIAABgIhEAAIgCAPIgDANIBaAAIAAASIhKAAQALAVAVAOQAVANAcAGIgHAJIgHAJQgfgIgXgSgAgKAMIByAAIAAgXIhyAAgAgKgbIByAAIAAgZIhyAAgAhlCRIAAiVQgHAYgJAWQgJAWgJAQIgGgLIgGgKQAKgNAIgVQAJgUAHgWQAIgYAEgWIgoAAIAAgUIAoAAIAAg+IAUAAIAAA+IAiAAIAAAUIgiAAIAAANIAJAOIAMATIAKARIAHAMIgNAQIgHgOIgIgRIgKgSIAACmgABKhKIAAgZIgyAAIAAAZIgVAAIAAgZIgvAAIAAgTIAvAAIAAgaIAVAAIAAAaIAyAAIAAgaIAVAAIAAAaIAvAAIAAATIgvAAIAAAZg");
	this.shape_18.setTransform(148.425,571.875);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#E28726").s().p("AgfB1QgOgFgKgHQgKgHgIgJIANgQQALALAOAHQAOAIAVABQANAAALgGQALgFAGgKQAHgLAAgOQAAgOgIgLQgHgLgQgGQgQgGgaAAIAAgUQAYAAANgGQAPgGAGgLQAGgKAAgNQAAgSgLgKQgLgLgRAAQgPAAgMAGQgNAHgKAKIgOgRQANgMAQgHQAPgIAUAAQASAAAQAHQAPAGAIANQAIANABATQAAAWgLAOQgMAOgTAHIAAABQAOADALAHQALAIAHAMQAHANAAAQQAAAVgKAPQgJAPgSAIQgQAHgUAAQgSAAgOgEg");
	this.shape_19.setTransform(114.6,572.325);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E28726").s().p("ABwB/IgagWIgbgTIANgMIAbATIAaAUQAMALAIAIIgNAPQgIgKgMgKgAgtCKIgHgIQAZgKARgLQARgLALgNQALgMAGgNIhSAAIAAgTIBZAAQACgKABgJIABgTIAAglIAVAAIAAAlIgBATQgBAKgCAJIBPAAIAAATIhUAAQgGAQgMAQQgLAPgUANQgTAPgdAMIgGgJgAhpCCIgGgHIAGgGQAEgFACgFQADgGAAgIIAAh1IgwAAIAAgVIBEAAIAACIIAegZIAEAKIAFAJIgmAeIgSAPIgHAIIAAAAIgFgIgAgFAbIgRgMQgIgFgJgFIALgKIARAIIAPALIANALIgKANIgMgLgAARgCIgRgLIgQgKIAKgLIAQAKIARAKIANAKIgLAMIgMgKgABigKIAIgRIAIgVIibAAIAAgTIBOAAIAAgdIhBAAIAAgTIBBAAIAAgfIAVAAIAAAfIBDAAIAAATIhDAAIAAAdIA/AAIAEgBIAOAEIgMAgQgGAQgGAMgAhYhaIgRgRIgSgQIANgOIATAPIARARIAOAOIgOAQIgOgPg");
	this.shape_20.setTransform(180.425,635.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#E28726").s().p("AgfCHIgJgGQAPgQANgWQAMgWAGgZIAVAFQgIAbgNAYQgMAYgQARIgJgGgABuBvQgGgPgJgPIgRgeIATgHQAJANAIAQIARAeQAGAPAEALIgVAJQgEgMgGgPgAhoB8IgHgHQADgCAEgFQAEgEADgHQADgHABgIIAAhwIgvAAIAAgVIBCAAIAACGIAkgZIADAJIAEAJIgpAfIgTAPIgHAIIgGgIgAgRAMIAAiKICOAAIAACKgAAEgIIBkAAIAAhiIhkAAgAhXheIgRgRIgTgQIAOgNIASAPIASARQAJAIAFAGIgPAPIgNgPg");
	this.shape_21.setTransform(148.3,635.875);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E28726").s().p("AAXB1IAAhBIhmAAIAAgRIBjiXIAcAAIAACTIAgAAIAAAVIggAAIAABBgAAOhFIgJARIg4BTIBKAAIAAhLIAAgNIABgPIABgOIgCAAIgJARg");
	this.shape_22.setTransform(114.825,635.9);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#E28726").s().p("ABPCBQgQgKgTgJQgTgJgRgHIAPgOIAjAQQATAIARAKQARAJALAIIgPAPQgLgIgRgJgAhwCKIgHgIQAbgIAUgJQATgJAMgKQAMgJAHgKIhRAAIAAgSIBZAAQACgHABgIIABgNIAAAAIgxAAIAAgMQgPAOgTAMQgSAMgXAJIgGgJIgHgHQAdgMAXgQQAWgRARgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhoAAIAAgRIBsAAIABgOIABgMIAVABIgCAMIgCANIBuAAIAAARIhxAAIgDANIgDAMIBqAAIAAASIhwAAIgGAMIgHANICgAAIAAASIhXAAQASAUAYAQQAaARAcAIIgIAIQgEAFgCAEQgVgHgTgMQgUgMgQgPIAAANIgyAAIAAABIgBANIgCAOIBgAAIAAASIhmAAQgFAMgNANQgMANgVALQgWAMgiAKIgFgIgAA2ALIgNgMQgFgHgFgIIg+AAIgKAPIgNAMIBsAAIAAAAg");
	this.shape_23.setTransform(308.6,702.325);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#E28726").s().p("Ah/CQIAAjjIBNAAIAAg8IAVAAIAAA8IA3AAIAAg8IAVAAIAAA8IBRAAIAADiIgVAAIAAgUIjWAAIAAAVgAAvBmIA8AAIAAhJIg8AAgAgdBmIA3AAIAAhJIg3AAgAhrBmIA5AAIAAhJIg5AAgAAvAJIA8AAIAAhHIg8AAgAgdAJIA3AAIAAhHIg3AAgAhrAJIA5AAIAAhHIg5AAg");
	this.shape_24.setTransform(244.525,702.425);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#E28726").s().p("AACCKIgHgHQAWgTANgWQAOgWAHgWQAGgWACgUIACglIAAgVIAUAAIAAAVIAAANIgBAOQAGAfAIAZQAJAYANAUQAOATATAQIgIAIQgEAEgCAFQgXgVgPgZQgPgZgKggQgGAbgPAaQgPAbgbAYIgHgJgAg/CHIgEgIIAVABIALgBIAEgBIACgDIAAhsIh3AAIAAgSIB1AAIAAhsIhxAAIAAgSICbAAIAAASIgXAAIAABsIAeAAIAAASIgcAAIAABsQAAAIgCAEQgCAEgGACQgGACgKAAIgZABIgCgJgAiDB1IAAhRIBOAAIAABDIg8AAIAAAOgAhxBXIAqAAIAAgjIgqAAgABogOQAEgMADgQIAHggIhKAAQgGASgHAQQgHAQgIAMIgJgFIgJgFQAKgPAIgUQAIgUAGgWQAGgXADgYIAVAEIgFAYIgGAYIBLAAIADgBIAOAFIgGAdIgHAcIgHAYgAh/gaIAAhAIBKAAIAABAgAhvgpIAoAAIAAgiIgoAAg");
	this.shape_25.setTransform(212.8,702.325);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#E28726").s().p("AggByQgNgDgLgHQgKgIgIgIIANgRQAKALAOAHQAOAIAVAAQANAAAMgGQALgIAHgNQAHgMAAgSQAAgbgNgNQgOgOgWAAQgLgBgKAEQgJAEgJAGIgPgJIAIhsIBuAAIAAAWIhXAAIgHBHQAIgFAJgCQAJgDAKAAQATAAAQAIQAQAIAJAQQAKAQAAAaQgBAZgKATQgLARgRAKQgRAJgTAAQgSAAgOgFg");
	this.shape_26.setTransform(114.625,702.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_14},{t:this.shape_13,p:{y:516.425}},{t:this.shape_12,p:{y:506.025}},{t:this.shape_11,p:{y:505.975}},{t:this.shape_10,p:{y:505.925,x:212.475}},{t:this.shape_9,p:{y:506.025}},{t:this.shape_8}]},143).to({state:[{t:this.shape_19},{t:this.shape_13,p:{y:582.375}},{t:this.shape_18},{t:this.shape_17},{t:this.shape_10,p:{y:571.875,x:212.475}},{t:this.shape_9,p:{y:571.975}},{t:this.shape_16,p:{y:571.625}},{t:this.shape_15,p:{y:571.9833}}]},5).to({state:[{t:this.shape_22},{t:this.shape_13,p:{y:645.925}},{t:this.shape_21},{t:this.shape_20},{t:this.shape_10,p:{y:635.425,x:212.475}},{t:this.shape_9,p:{y:635.525}},{t:this.shape_16,p:{y:635.175}},{t:this.shape_15,p:{y:635.5333}}]},5).to({state:[{t:this.shape_26},{t:this.shape_13,p:{y:712.725}},{t:this.shape_12,p:{y:702.325}},{t:this.shape_11,p:{y:702.275}},{t:this.shape_25},{t:this.shape_24},{t:this.shape_10,p:{y:702.225,x:276.475}},{t:this.shape_23}]},6).to({state:[]},430).wait(3));

	// leftnav
	this.lnav5_btn = new lib.lnav5();
	this.lnav5_btn.name = "lnav5_btn";
	this.lnav5_btn.setTransform(151.45,702.1,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav5_btn, 0, 1, 2, false, new lib.lnav5(), 3);

	this.lnav4_btn = new lib.lnav4();
	this.lnav4_btn.name = "lnav4_btn";
	this.lnav4_btn.setTransform(151.45,635.25,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav4_btn, 0, 1, 2, false, new lib.lnav4(), 3);

	this.lnav3_btn = new lib.lnav3();
	this.lnav3_btn.name = "lnav3_btn";
	this.lnav3_btn.setTransform(151.45,571.75,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav3_btn, 0, 1, 2, false, new lib.lnav3(), 3);

	this.lnav2_btn = new lib.lnav2();
	this.lnav2_btn.name = "lnav2_btn";
	this.lnav2_btn.setTransform(151.45,505.75,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav2_btn, 0, 1, 2, false, new lib.lnav2(), 3);

	this.lnav1_btn = new lib.lnav1();
	this.lnav1_btn.name = "lnav1_btn";
	this.lnav1_btn.setTransform(149.5,442.1,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav1_btn, 0, 1, 2, false, new lib.lnav1(), 3);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(153,153,153,0.498)").s().p("AAgBoIAAgxQgJALgNALQgMAKgNAHIgFgFIgGgFQAOgGAMgJQAMgJAIgKIAMAEIAAgrIgWACIgWABIgBgFIgDgGIAjgDIAigDIAbgFIANAKIgWAEIgZADIAAAYIAEAFIADAEIAUgNIARgMIAKAIIgTANIgVAMQAKAKANAHQAMAHAOAFQgDABgCAEIgEAGQgQgGgNgKQgOgKgLgMIAAA0gAhCBoIgNgBIgBgHIgDgGIANABIAJAAIAEgBIADgCQADgCACgJIAEgYIADgpIg3AAIADgYIADgdIACgcIANABIgCAXIgCAXIgCAWIAYAAIAEgbIACgeIADgeIg0AAIAAgOIBCAAIgCAiIgEAkIgDAfIAGAAIALAAIAAACIAAAEQgCAegCATQgCATgDAKQgCAKgEADIgGAFIgIACIgKAAgAhsAxIAagGIAegIIABANIgcAIIgaAHgAgSA0IgFgFIAVgMQAKgHAHgHIANAEQgJAJgLAIQgKAJgLAFIgFgEgAAZgFIAAgOIgaAEIgYADIgDgMIAOgCIAAhBIgLAAIAAgMIBGAAIAAAMIgIAAIAAA7IAIgBIAAALIgIABIAAAQgAgCgbIAbgEIAAgNIgbAAgAgCg2IAbAAIAAgOIgbAAgAgChOIAbAAIAAgNIgbAAgAAxgPIgFgFQAHgFAHgGQAHgHAGgJIgLgNIgLgMIAJgHIAKALIAKALIAHgPQADgHACgIIgmAAIAAgNIApAAIADAAIACAAIAIACQgDAPgFAMQgFANgGALIAMAOIAJAMIgKAJIgIgLIgKgNIgNAPQgHAGgIAFIgDgFg");
	this.shape_27.setTransform(189.925,374.775);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(153,153,153,0.498)").s().p("AhjBlIgFgIQBDgIArgYQAsgZAVgqIAPAHQgXAtguAbQgsAZhFALIgDgIgAgFA5IAAhLIhhAAIAAgQIAlAAIAAg2IAQAAIAAA2IAuAAIAAhJIAPAAIAAAaIBHAAIAAAPIhHAAIAAAgIBdAAIAAAQIheAAIAABLgAhYAyIgGgFQAOgLAMgOQANgOAJgNIAPAEQgKAQgOAQQgNAQgOALIgGgGg");
	this.shape_28.setTransform(166.075,374.25);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(153,153,153,0.498)").s().p("AgBBlIgHgFQAPgPAKgWQAJgVAEgZQAGgZAAgbIgiAAIAAgQIAjAAIABgZIAAgaIAQAAIgBAaIAAAZIA1AAIAAAJIgDA9IgDAqIgDAaQgDAJgDADQgEAFgEACIgJACIgOAAIgTgBIgCgHIgDgIIATABIANAAIAFAAIAEgDQADgEADgNIAEgoIADhEIgmAAQgCAdgEAbQgFAbgKAXQgKAXgSARIgEgGgAhjBGIgDgIQACgBADgEIAGgLIAFgPIAHgXIAIgaIgiAAIAAgPIBpAAIAAAPIg3AAQgFASgGAUIgOAkIA8gMIgHgUIgIgTIAOgDIAJAXIAJAYIAFAUIgNAFIgCgIIgDgJIgoAJIgYAFIgLAEIgGACIgCgHgAhghMIAAgOIBbAAIAAAOg");
	this.shape_29.setTransform(142.25,374.525);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(153,153,153,0.498)").s().p("AhqBiIAAgQICJAAIAEgTIACgVIhsAAIAHgbIAGgfIAGgiIAGgfIg0AAIAAgPIDGAAIAAAPIiBAAIgEATIgDAVIBVAAIADgBIAMABIgDAbIgEAgIgEAgIgFAgIA7AAIAAAQgAgsABIgGAaIBZAAIAEgcIADgZIhWAAIgEAbg");
	this.shape_30.setTransform(118.3,374.6);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#333333").s().p("AB4ExIAAljIhEAAIAAACQABAvgGAvQgHAwgVAvQgVAvgsAoQgtAphLAeIgEgEQArglAbgpQAbgoANgrQAOgsAEguQAFgtAAguIAAjUIBbAgQAmgUAigUQAigVAXgQIBgBYQgHAFgMABQgMgBgRgFQgjAGgvAGQgvAGgyAEIAAB+IB4AAIAtg9IAOAMIAgAbIAiAeQgBAFgFADQgFACgHAAIhAAAIAAFOQAAACgJAFQgKAFgRAEQgRAFgYAAgAkoC2IAAm0IBYAkIAiAAIAngsIBQA+QgDAEgGAEQgHADgJACIAAEtQgCACgLAGQgMAFgRAFQgQAEgPAAIgPAAIAAhEIgqAAIAABVQAAAEgKAHQgKAHgRAGQgQAFgTAAgAjSAyIAqAAIAAj6IgqAAg");
	this.shape_31.setTransform(262.675,294.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#333333").s().p("AkqA1IgFgVIG7AAIA7hUIALAKIAcAYIAiAeIAgAfQgBAFgFACQgGACgIABg");
	this.shape_32.setTransform(197.475,288.85);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#333333").s().p("AB4ExIAAljIhEAAIAAACQABAvgGAvQgHAwgVAvQgVAvgsAoQgtAphLAeIgEgEQArglAbgpQAbgoANgrQAOgsAEguQAFgtAAguIAAjUIBbAgQAmgUAigUQAigVAXgQIBgBYQgHAFgMABQgMgBgRgFQgjAGgvAGQgvAGgyAEIAAB+IB4AAIAtg9IAOAMIAgAbIAiAeQgBAFgFADQgFACgHAAIhAAAIAAFOQAAACgJAFQgKAFgRAEQgRAFgYAAgAkoC2IAAm0IBYAkIAiAAIAngsIBQA+QgDAEgGAEQgHADgJACIAAEtQgCACgLAGQgMAFgRAFQgQAEgPAAIgPAAIAAhEIgqAAIAABVQAAAEgKAHQgKAHgRAGQgQAFgTAAgAjSAyIAqAAIAAj6IgqAAg");
	this.shape_33.setTransform(134.675,294.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#CCCCCC").ss(1,1,1).p("AzdAAMAm7AAA");
	this.shape_34.setTransform(228.875,350.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.lnav1_btn},{t:this.lnav2_btn},{t:this.lnav3_btn},{t:this.lnav4_btn},{t:this.lnav5_btn}]}).to({state:[]},589).wait(3));

	// 正确失败动画
	this.instance = new lib.对("synched",0);
	this.instance.setTransform(1010.2,494.6);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#39B54A").s().p("AijEdIAAjOQgXAfgcAcQgcAcghAYIgFgGQAYghATgpQASgqAPgtQANgrAKgtIhTAAIgFgQIBqAAIAAhnIgzAEIg0ACIgBgHQAlgMAmgRQAngRAjgTQAigTAXgQIBWBSIAAgPIBYAjIAzAAIAngrIBOA8QgDAEgGAEQgFAEgKACIAAFpQgBADgLAGQgLAFgRAFQgRAFgPAAIgOAAIAAhCIg9AAIAAAtQgBAFgJAHQgLAHgQAFQgPAGgUAAIgNAAIAAk3QgDADgDAAQgEABgFAAIhZAAIAAArQAuAMAXASQAVATADAUQAEATgKAPQgJAOgRABQgSADgTgQQgBgWgGgXQgHgXgKgTIAAEKQgBADgIAGQgIAEgQAGQgPAEgVAAgABuCWIA9AAIAAk8Ig9AAgAgdiAIAaAYIAcAbIAAh9QgGAFgLAAQgKAAgPgGIgdAGIghAEIAABwIAmg6IAMALg");
	this.shape_35.setTransform(832.8,507.8);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#39B54A").s().p("AiNEWQA0g8AahBQAbhBAKhKQAJhHAAhRIhEAAIgFgQIBJAAIAAhAIAAhCIBvAKQgBAHgFAEQgGAEgLACIAAA0IgBAzIAqAAIAsgsIBIA/QgEAEgGADQgGAEgLACIgBAzIAFgDQAsAZAUAbQATAbABAZQABAYgMAPQgLAPgSABQgSABgSgUQAEgigEgiQgDgjgKgeQgBBQgDA4QgDA3gFAkQgFAkgIAWQgIAVgMAMQgRAQgWAIQgVAHgcAAQAAgUgDgPQgCgPgGgHQgHgKgNgIQgNgHgSgFIAAgGIAXABIAXABIASABQAHgBAFgBQAFgCAEgEQAKgJAGglQAFgkAEhFQADhDABhoIgyAAQgBBDgIA7QgIA7gVA2QgWA1gnAuQgoAuhBAngAjoEcIAAl8IgzAAIgFgRIA4AAIAAirIBlAJQgBAGgEAEQgEAEgLACIAACSIAiguIALAJIAYAUIAbAYQgCAFgEADQgEACgGAAIhQAAIAAFgQAAAEgKAHQgKAGgPAGQgPAFgPAAgAhyBdQgMgFgHgNQgIgSAGgQQAHgOAPgLQAJgIAKgOQAJgPAGgTQAGgTgBgTIAHAAQARAmAEAgQAFAegFAYQgGAXgNAOQgJALgNACIgJABQgJAAgJgEg");
	this.shape_36.setTransform(773.679,507.8);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#39B54A").s().p("AgmAnQgQgQAAgWQAAgWAQgQQAPgQAXAAQAXAAAQAQQAPAQABAWQgBAWgPAQQgQAPgXAAQgXAAgPgPg");
	this.shape_37.setTransform(718.675,526.175);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#39B54A").s().p("AAQDhIAAgVIA1gFIglh0IiJAAIghByIA5AHIAAAVIiKAAIAAgVIAygGICHmmIA+AAICQGnIAwAFIAAAVgAAaA+IhBjMIg7DMIB8AAg");
	this.shape_38.setTransform(685.75,508.15);

	this.instance_1 = new lib.错("synched",0);
	this.instance_1.setTransform(1010.2,631.65);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#CC3300").s().p("AijEeIAAjPQgXAfgcAdQgcAbggAYIgGgGQAYghATgqQATgpANgsQAPgtAJgrIhTAAIgFgSIBqAAIAAhlIg0ADIgyABIgCgGQAlgNAngRQAmgRAjgSQAigSAWgRIBXBRIAAgOIBYAkIAzAAIAogsIBNA9QgCAEgHADQgGADgIADIAAFoQgBAEgMAFQgMAGgQAFQgQAEgQAAIgPAAIAAhAIg8AAIAAAsQAAAFgLAHQgJAGgRAGQgPAFgUABIgNAAIAAk4QgCAEgEAAQgEABgFABIhaAAIAAAqQAwAMAWASQAVATAEATQADAUgKAOQgJAPgSACQgRABgTgPQgBgWgHgXQgGgXgLgSIAAEJQAAADgIAFQgJAGgPAEQgPAFgVABgABuCXIA8AAIAAk9Ig8AAgAgdiAIAaAYIAcAcIAAh9QgGADgLAAQgKAAgQgFIgcAGIgiAFIAABuIAng4IAMAKg");
	this.shape_39.setTransform(889.8,635.1);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#CC3300").s().p("AiNEVQA0g7AahBQAbhCAKhIQAJhIAAhQIhEAAIgFgRIBJAAIAAhAIAAhCIBvAKQgBAHgFAEQgGAEgLACIAAA0IgBAzIAqAAIAsgtIBIBAQgEAEgGAEQgGADgLACIgBAyIAFgBQAsAZAUAbQATAbABAXQABAYgMAQQgLAPgSABQgSABgSgTQAEgjgEghQgDgkgKgdQgBBPgDA4QgDA3gFAkQgFAlgIAUQgIAWgMAMQgRAQgWAIQgVAIgcAAQAAgWgDgOQgCgOgGgJQgHgKgNgHQgNgHgSgEIAAgIIAXACIAXABIASAAQAHAAAFgCQAFgBAEgEQAKgJAGgkQAFglAEhEQADhEABhnIgyAAQgBBBgIA9QgIA6gVA2QgWA1gnAuQgoAuhBAngAjoEdIAAl+IgzAAIgFgQIA4AAIAAirIBlAKQgBAFgEAFQgEADgLACIAACRIAiguIALAJIAYAWIAbAXQgCAFgEACQgEACgGAAIhQAAIAAFhQAAAEgKAHQgKAGgPAGQgPAFgPABgAhyBdQgMgFgHgNQgIgSAGgPQAHgPAPgLQAJgIAKgOQAJgPAGgSQAGgUgBgUIAHAAQARAoAEAeQAFAggFAWQgGAYgNAOQgJALgNACIgJABQgJAAgJgEg");
	this.shape_40.setTransform(830.679,635.1);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#CC3300").s().p("AgrEeIAAkmQgwA2g8AuQg7AuhGAiIgDgEQAsgmAogtQAoguAhgwQAhgxAYgzQAXgyAMguIjtAAIgEgRIGkAAIAyg/IAQANIAkAbIAlAeQgBAGgFACQgEACgIAAIi6AAQgMAcgOAcQgPAcgRAbIApAPQgCAFgDACQgFADgJACIAAFPQgBACgLAEQgLAEgQAEQgQADgQABgADTB+QgQgfgZggQgZgfgdgeQgdgcgdgVIAFgFQBHALAtAUQAuATAYAYQAYAYAHAXQAGAYgIAQQgHASgRAFQgHACgGAAQgOAAgQgIg");
	this.shape_41.setTransform(770.4,635.1);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#CC3300").s().p("AgmAnQgQgQAAgWQAAgWAQgQQAPgQAXAAQAXAAAQAQQAPAQABAWQgBAWgPAQQgQAPgXAAQgXAAgPgPg");
	this.shape_42.setTransform(715.675,653.475);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#CC3300").s().p("AjEDgIAAgUIA2gGIABhfIABhhIAAgVIgBhcIgBhbIg2gEIAAgVIDSAAQA6AAAiAOQAiANAQAYQAPAXAAAfQAAAXgLAVQgMATgcARQgbAPgwAIQBQAJAkAdQAkAdAAAvQAAAegRAdQgSAcgsATQgtAShPABgAgpBoIABBiIAfAAQAwAAAbgaQAbgZAAgyQAAg0gagYQgagZg2AAIgcAAIAABogAgphvIAABbIAXAAQAugBAWgZQAYgXAAguQAAgpgVgWQgUgWgtAAIgcAAIgBBZg");
	this.shape_43.setTransform(684.9507,635.55);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#39B54A").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape_44.setTransform(495.525,501.775);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#39B54A").s().p("AAMCsIAAgPIApgFIgchZIhpAAIgaBYIAsAGIAAAPIhqAAIAAgPIAngFIBnlEIAvAAIBvFEIAlAFIAAAPgAATAvIgwicIguCcIBeAAg");
	this.shape_45.setTransform(470.3,487.95);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#CC3300").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape_46.setTransform(493.225,640.775);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#CC3300").s().p("AiWCsIAAgQIApgEIABhJIAAhLIAAgPIAAhHIgBhGIgpgDIAAgQIChAAQAsAAAaALQAaAKAMASQAMASAAAYQAAARgJAQQgJAPgVANQgVAMglAGQA+AHAcAVQAbAXAAAkQAAAXgNAWQgOAWgiAOQgiAOg9ABgAggBPIACBMIAXAAQAlAAAUgUQAVgUAAgmQAAgngUgTQgUgTgpAAIgWAAIAABPgAgghVIAABGIASAAQAjgBARgTQASgSAAgjQAAgfgPgRQgQgRgiAAIgVAAIgCBEg");
	this.shape_47.setTransform(469.7009,627.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.instance,p:{x:1010.2,y:494.6}}]},82).to({state:[{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.instance_1,p:{x:1010.2,y:631.65}}]},30).to({state:[]},31).to({state:[{t:this.instance,p:{x:499.1,y:519.55}},{t:this.shape_45},{t:this.shape_44}]},385).to({state:[{t:this.instance_1,p:{x:535.8,y:628.15}},{t:this.shape_47},{t:this.shape_46}]},30).to({state:[]},30).to({state:[]},1).wait(3));

	// 选项
	this.b1_btn = new lib._1_B();
	this.b1_btn.name = "b1_btn";
	this.b1_btn.setTransform(793.3,631.95,1,1,0,0,0,132.5,45.1);
	new cjs.ButtonHelper(this.b1_btn, 0, 1, 1);

	this.a1_btn = new lib._1_A();
	this.a1_btn.name = "a1_btn";
	this.a1_btn.setTransform(793.3,504.7,1,1,0,0,0,132.5,45.1);
	new cjs.ButtonHelper(this.a1_btn, 0, 1, 1);

	this.b5_btn = new lib._5_Bbtn();
	this.b5_btn.name = "b5_btn";
	this.b5_btn.setTransform(1133.8,630.05,1,1,0,0,0,683.1,40.8);
	new cjs.ButtonHelper(this.b5_btn, 0, 1, 2, false, new lib._5_Bbtn(), 3);

	this.a5_btn = new lib._5_Abtn();
	this.a5_btn.name = "a5_btn";
	this.a5_btn.setTransform(1133.8,491.05,1,1,0,0,0,683.1,40.8);
	new cjs.ButtonHelper(this.a5_btn, 0, 1, 2, false, new lib._5_Abtn(), 3);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#333333").s().p("AgqBJQgTgLgMgTQgLgUgBgXQABgYALgTQAMgTATgMQAUgLAXABQAXgBAUALQATAMALATQALATAAAYQAAAXgLAUQgLATgTALQgUAMgXABQgXgBgUgMgAgrgsQgSASAAAaQAAAaASASQASASAaAAQAZAAATgSQARgSABgaQgBgagRgSQgTgRgZgBQgaABgSARg");
	this.shape_48.setTransform(1792.65,327.4);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#333333").s().p("AiSEXQA9gXAngaQAmgaAUgfQAWggAIgoQAJgnACgxQACgvAAg9IBqAVQgBAGgGAFQgFADgLAAQgCA7gEAwQgFAxgOAnQBBAHAlAUQAlATANAZQANAZgFAUQgFAVgTAIQgTAJgbgLQgSghgaggQgbgggcgaQgRAfgdAZQgeAagwASQgxAUhIANgAkhBkIAhgCIAqgEIAAkbIhFAAIgFgQICNAAIAlgzIAMAKIAaAXIAcAZQgBAFgFACQgEACgGAAIhBAAIAAEQIAhgEIAggGIAAAGQgbAVgqAcQgrAdg+AiQgDAGgFAEQgFAFgGABgAg5CVIAAk+IBVAjIAUAAIABgoIAAgrIhtAAIgEgQIDuAAIApg1IANAKIAeAXIAgAbQgCAFgEACQgFACgGAAIh/AAQgSAWgVAWQgUAVgTASIBZAAIAkgoIBJA4QgCADgFADIgMAFIAADkQgBADgMAEQgLAFgQAFQgQAEgPAAIgOAAIAAkEIiJAAIAADvQAAAGgKAGQgLAFgPAGQgQAEgSABg");
	this.shape_49.setTransform(1752.125,308.1);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#333333").s().p("AkYDDIAigQIAjgSIAAjPIhFAAIgEgSIA/AAIAmgxIBPA/QgDAEgIAEQgHAEgNACIAADCIAHAEIAHAEQAlgaAVggQAVggAHglQAJglABgqIg7AAIgFgRIB8AAIAAhbIg3AAQgPAagSAVQgSAWgUARIgJgFQAKgaAIggQAIggAFgiQAGgkACgjIBgAXIAAgmIBoAJQAAAGgFAEQgFAFgMACIAABXIAiAAIAog4IANALIAdAYIAeAcQgBAFgFACQgEACgIAAIiAAAIAABbIAyAAIApg4IANALIAdAZIAfAbQgCAFgEADQgEACgHAAIhqAAIAAAGIAAB1QAAAFACACQACACAHAAIATAAIAQAAQAEAAACgCQACgBADgFQAEgHAHgTIAPgtIAHAAIACBLQAMAGAFAIQADAIAAAKQABAXgVAMQgWALgzABIgiAAQgcAAgNgGQgNgGgFgNQgDgOAAgYIAAiQIgWAAQgFAzgTAoQgTApgiAeQgkAeg4AUQAgAOAzAFQAzAGBLgBIBdgBQAsAAAxgDIAAAGQgZAGgNAUQgOAUgCAZIigAAQg+AAgogKQgqgKgcgUQgcgVgXggQgGgKgGABQgGAAgEAJIgVAnQgNAYgNAZQABAFgCADQgCADgCADgAAbjiQgEACgIAAIgMAfIgNAdIAtAAIAAhEQgDAEgFACgAjNiLQgHgjgQgiQgRgigSgbIAEgDQA9AMAeAWQAfAWAIAYQAHAYgJASQgJASgVAFIgIABQgRAAgTgNg");
	this.shape_50.setTransform(1692.15,308.275);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#333333").s().p("ABlD3QgCgPgJgJQgIgJgRgIQgQgIgXgFIAAgHIAfACIAgACIAWABQAIAAAFgCQAGgCAEgEQAPgPAGhTQAHhTACiYIhcAAQgXAngcAgQgaAfggAZIgEgDIAADyQgBADgKAGQgLAFgQAEQgPAEgOABIgOAAIAAgwIhKAAIAAApQAAAFgJAHQgJAGgOAFQgQAFgRAAIgMAAIAAnJIBLAfIADglIADgpIABglIB0AcQgCAHgGAEQgHADgKAAIghAlIgiAmIAoAAIAlgpIBJA6QgDAEgGADQgFADgKADIAABkQAPggAOgpQAMgpALgtQALgtAGgsIBwAgQgCAGgFADQgHAEgKAAQgIATgIARIgSAjIBLAAIAtguIBJBBQgEAEgHADQgGADgLACQgBBegDBDQgCBDgFAtQgFAtgIAbQgJAbgOANQgQARgXAJQgXAHghAAQAAgVgEgPgAjECuIBKAAIAAidIhKAAgAjEAAIBKAAIAAiTIhKAAgAAkBRQgBghgLghQgLgfgPgaIADgDQA5AOAbAWQAbAWAFAXQAFAYgLARQgMARgTADIgFAAQgTAAgUgQg");
	this.shape_51.setTransform(1633.1,308.125);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#333333").s().p("AC1EBIgDgUQgCgKgFgHQgHgIgLgDIAAgHIAIAAIAOAAQAFAAACgBQACgCAAgDIAAhQIgkAAIAAB+QAAACgHAFQgHAFgOAEQgMADgSABIgOAAIAAiSIgiAAQgDAggMAeQgNAegXAbQgZAbgrAXIgFgFQAYgfAMglQAMgkACgpQADgoAAgrIAAiTIgUANIgUAMIgHgFQARgaAPghQAOgiAMgmQAKgmAGgoIBtAiQgCAGgFADQgHADgKAAIgHAPIgHAOIAuAAIAogpIBHA8QgDAEgGACQgFACgKAAQgRAQgYASQgYARgZANIBIAAIAfgnIBKA5QgEAEgFAEIgOAFIAAEnQABAZgIARQgIAQgSAJQgTAIghACIAAgcgACUBjIAkAAIAAhgIgkAAgAAtA0IAAAYIgBAXIAgAAIAAhgIgfAAgACUgNIAkAAIAAhYIgkAAgAAtgNIAfAAIAAhYIgfAAgAAlihQgLAPgNANIAsAPIAmAAQAGgQAHgUIAKgnIg7AAQgKARgMAPgAjsD/IAAi4QgVAbgYAZIgHgFQAVgsAPg1QAPg1AMg6QAKg5AHg3IhIAAIgFgRICbAAIAogzIAMAKIAdAXIAfAZQgCAFgEACQgFADgGAAIhXAAQgGAogLAlQgLAlgPAjIAJAEIATAAIAigmIBGA2QgDAEgGADQgFADgJACIAADeQgBACgKAFQgKAEgPAEQgNAEgNAAIgNAAIAAgpIggAAIAAA3QgBACgGAFQgIAGgNAEQgNAEgTAAgAijCjIAgAAIAAjEIggAAg");
	this.shape_52.setTransform(1571.7,307.975);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#333333").s().p("AkXELIgFgRIBUAAIAAk9IBzAKQAAAGgFAEQgFAFgMACIAAEiIBJAAIAAm2IjTAAIgFgRIF2AAIAxg9IAPAMIAjAbIAlAdQgBAFgFADQgEADgHgBIi3AAIAADDIAyAAIAvg8IAPALIAhAbIAkAdQgBAFgFACQgFACgHAAIijAAIAADjIBWAAIAxg/IAQAMIAkAbIAmAfQgCAFgEACQgFADgHAAg");
	this.shape_53.setTransform(1511.675,306.5);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#333333").s().p("AjmD1QgEgQgFgLQgGgLgKgHQgKgHgTgEIAAgIIAIAAIASABIAUABIAPABQAGAAADgDQACgCAAgFIAAhyIgaAQQgCAHgFAFQgDAFgHACIgkhfIAigHIAtgNIAAhnIhCAAIgFgRIBHAAIAAiQIBqAJQAAAIgGAEQgFAEgLACIAAB1IABAAIAjg3IAMALIAYAYIAaAbQgBAFgFADQgEACgGAAIhSAAIAABPIAtgOIAugOIACAFIgoAgIg1AmIAAC0QAAAegGAWQgHAUgWANQgVANgrAEQgBgXgCgRgAApEcIAAh7IiJAAIgFgQICOAAIAAhIIhtAAIgFgQIByAAIAAhLIBqAJQAAAFgFAEQgEADgKACIAAA0IAYAAIAngwIAMAJIAcAVIAfAZQgCAFgEADQgEABgHAAIh1AAIAABIIAoAAIArg1IANAJIAgAYIAhAbQgCAFgEACQgFACgHAAIiPAAIAABqQAAACgLAEQgLAFgPACQgRADgQABgAhsAHQAvgSApgYQAogZAggeQgWgYgRghQgRgggLgrIg9AAIgFgRIDmAAIAsgoIBGA9QgDAFgFACQgHACgKABQgQAdgUAaQgVAagZAWQAfAJAiAFQAiAFAlACIAAAHQgaAIgQAUQgPAUgHAdQgogKgigOQgigOgdgTQgpAZgxARQgwARg5AMgAAkioQAZAYAeAPQASgWAPgXQAPgYALgYIiZAAQAPAgAYAWg");
	this.shape_54.setTransform(1451.7,308.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#333333").s().p("AkYDDIAigQIAjgSIAAjPIhFAAIgEgSIA/AAIAmgxIBPA/QgDAEgIAEQgHAEgNACIAADCIAGAEIAHAEQAngaAUggQAUggAJglQAIglABgqIg7AAIgFgRIB8AAIAAhbIg3AAQgPAagSAVQgSAWgUARIgIgFQAJgaAIggQAIggAFgiQAGgkACgjIBgAXIAAgmIBoAJQAAAGgFAEQgEAFgMACIAABXIAhAAIAog4IANALIAdAYIAeAcQgCAFgEACQgEACgIAAIh/AAIAABbIAxAAIApg4IANALIAdAZIAfAbQgCAFgEADQgFACgGAAIhqAAIAAAGIAAB1QAAAFACACQABACAIAAIATAAIAPAAQAFAAACgCQADgBACgFQAEgHAHgTIAQgtIAGAAIACBLQAMAGAEAIQAFAIAAAKQAAAXgWAMQgUALg0ABIgiAAQgbAAgOgGQgNgGgFgNQgDgOAAgYIAAiQIgXAAQgEAzgTAoQgSApgjAeQgkAeg5AUQAiAOAzAFQAyAGBMgBIBcgBQAsAAAwgDIAAAGQgXAGgOAUQgOAUgDAZIieAAQg/AAgpgKQgpgKgcgUQgcgVgWggQgIgKgFABQgFAAgGAJIgUAnQgNAYgNAZQABAFgCADQgCADgCADgAAcjiQgGACgHAAIgMAfIgNAdIAtAAIAAhEQgDAEgEACgAjNiLQgHgjgQgiQgQgigUgbIAFgDQA8AMAfAWQAfAWAHAYQAIAYgJASQgKASgTAFIgJABQgRAAgTgNg");
	this.shape_55.setTransform(1392.15,308.275);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#333333").s().p("Ag7BiQAlgTARgZQARgXADgXQgOgDgRgIQgQgIgNgOQgNgNgBgXQAAgXAQgQQAQgQAagBQAQAAANAIQAPAIAIAQQAIAPABAXQAAAfgMAfQgKAfgZAbQgXAcgmARg");
	this.shape_56.setTransform(1310,333.25);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#333333").s().p("Ah1EVQA7gVAtggQAtgeAhgnQgRgcgMglQgNgjgJgtIggAAIgFgQICgAAIAsgrQgYAAgMgGQgMgGgDgOQgDgOAAgWIAAhsIgxAAIAAAfQABASgEAXQgEAWgNAYQgMAYgXAVQgXAWgnAQIgFgGQAVgZAJgdQAJgcADgcQACgdAAgZIAAhPIBaAgIAeAAIAngqIBFA2IgIAGQgGACgHABIAABUIABAGQABACAEAAIAFAAIAGAAIAHAAIAIAAIAGgCIAIgBIAFAAIAEABQAMAHAFAHQAFAHgBAKQAAAWgTALQgUALgnAAIgYAAIBJBAQgDAFgFACQgFACgLABQgOAkgTAgQgUAhgZAbQAgARAjALQAkALAmAIIgBAHQgbAHgSATQgTATgJAgQgkgRgegUQgegVgYgaQgpAeg1AVQg0AVhDANgAA2BFQASAaAWAUQAQgZALgaQAMgaAIgcIh1AAQAMAhASAagAjgEbIAAhlIgHAFQgCAGgEAEQgEAEgGACIgthcIAdgEIAngIIAAlZIBKAiQAPgRAPgSIAbglIBZBGQgDAEgGABQgFABgJgCQgaAHgfAGIg7AMIAABTIAOAAIAlg0IAMAKIAbAXIAdAZQgCAFgEADQgEACgHAAIhmAAIAABWIAQAAIAmg1IAMAKIAcAYIAcAZQgBAFgEACQgFACgGABIhqAAIAABDIBBgMIBDgPIABAGQgXAPghAUIhNAsIAAB2QAAADgIAGQgHAFgPAFQgQAFgYAAg");
	this.shape_57.setTransform(1271.775,308.3);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#333333").s().p("AkcEYQApgtAVg2QAVg2AIg8QAIg8gBg8IAAjaIBrALQAAAFgFAFQgEAFgMABIAACHIBsAAIAAivIBzAJQgBAHgFAEQgFAEgNADIAACUIA8AAIAtg+IAOAMIAgAbIAjAeQgBAFgGACQgEADgHAAIlvAAIAAAnQgBAigDAfICNAAIAogqIBQA8QgEAEgFAEQgGAEgJACIAADbQgBACgMAFQgNAEgRAFQgRADgPAAIgPAAIAAj9IiVAAQgHA1gUAwQgSAwglAoQgjAng4Abg");
	this.shape_58.setTransform(1211.55,308.1);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#333333").s().p("AgvEUICdkUIidkTIARgLICjEeIijEfgAiEEUICckUIickTIARgLICjEeIijEfg");
	this.shape_59.setTransform(1136.6,308.125);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#333333").s().p("AitEcIAAjtQgaATgbAPQgbAPgcAMIgGgFQAcgbAcgmQAcglAXgtQAXgsARgxIAIADIAAg0IiQAAIgEgRICUAAIAAhQIBpAJQgBAGgDAEQgFAEgLABIAAA4IBhAAIAAhQIBrAJQAAAGgFAEQgFAEgMABIAAA4IAnAAIApg4IAOALIAdAYIAdAcQgBAFgEACQgEADgIAAIiHAAIAAAvQABAEgLAEQgKAEgQADQgRAEgTAAIgNAAIAAhCIhhAAIAAAzQgBAFgOAEQgPAFgVADIBDAfQgDAFgGADQgHACgLgBQgKARgMAPQgLAQgMANIAgAMQgBAEgEACQgFADgJACIAAECQAAADgKAEQgKAFgQAEQgQAEgQAAgABaELQghAAgUgHQgUgFgHgQQgIgQAAgdIAAhjIgdAHIgdAEIgDgGQAQgHAPgIIAegSIAAi7IBqAJQgBAGgEAFQgFAEgKACIAABlQAagUAagXQAZgXAXgZIBRBJQgEAFgHABQgGABgMgEQgkAYgmAUQgnATgnAPIAABoQAAAJAEADQAGADAMAAIAxAAIAVAAIAQgBQAGAAAEgCQAEgBAFgFQAGgKAIgUIATgzIAGAAIACBVQAQAHAHAHQAGAJAAAKQAAASgMALQgNALgdAEQgfAGgyAAg");
	this.shape_60.setTransform(1091.4,308.05);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#333333").s().p("ADsEbQgVgEgTgMQgRgNgMgOQgMgQgJgQQgKgQgIgRQgfAegnAZQgmAagwATIgEgFQAqgeAkgmQAiglAagqQgJgYgFgZQgHgagFgaIg1AAQgBAugMAvQgMAvgcAqQgeApg2AdIgFgFQAdgjAQgpQAPgqAGgrQAEgsABgqIgtAAIgFgRIAyAAIAAh2IBcAJQgCAGgEAEQgEAEgLABIAABeIAZgqIAHAHIAQASQgEgdgDgfQgCgegBggIiGAAIALAGQgDAFgGACQgFACgJgBQgRAYgZAcQgZAbgcAbQgcAagcAVIBAgHIBJgKIABAHQgWAPgnAXQgmAXgyAZQgCAEgDABIgGAEIgjhVIAFgBIAJgDIAJgEQAPgOATgXQARgZARgdIgVANQgLAHgLAGIgGAHIgIAEIgihRIAHgDQAIgCAEgDQAKgLALgUQAKgUAKgYQAJgYAIgXQAHgYADgSIBkAfQgCAFgFADQgFAEgIAAQgOAVgUAXQgSAXgVAWQgVAVgVASIAggDIAhgDIAPggIAKgcIBOArIgFgQICKAAIgBhCIgBhDIBoALIgBAEIgBAEQAnAAAVAJQAVAKAGANQAGANgEANQgGANgMAHIAaAVIAbAWQgCAFgDACQgFACgHAAIiAAAQABApAEAmQAEAnAGAiQAMgeAIgeQAJgfAGgeIBhAsQgCAFgGADQgGADgLgCQgPAogTAmQgUAogaAmQAIAQAJAOQAJAOAKAMQAFAHAEAAQADAAAEgIQAIgNAKgUQAKgVAJgUIAGABIgPBsQAOAgADATQACAUgJAHQgPAKgQAAIgIgBgACXkBQgDABgEAAIgBA1IAAA1IAnAAIAYgfIgMgEIgLgHQAAgTgHgTQgHgSgMgMIgGADgAkcCnIA1gJIBLgQIBWgUIABAFQgYAVgoAeQgoAeg5AmQgDAFgEAFQgFAFgGABg");
	this.shape_61.setTransform(1032.3,308.0871);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#333333").s().p("ABsEgIAAghIlKAAIgFgRIFPAAIAAhLIkwAAIgFgQIE1AAIAAhLIk+AAIgGgQIE+AAIAngrIBPA8QgDAFgGADQgFADgKACIAACzQgBADgLAFQgMAFgQAFQgRAFgQAAgAgwAiIAAisIiLAAQAFAlgLAYQgKAYgTAJQgMAGgNAAQgMgBgKgHQgKgHgFgNQgEgTAJgOQAJgNARgHQALgGAJgLQAKgMAFgQQAFgPgBgSIAHgBIAJAXIAHAUICPAAIAAg9IiqAAIgFgRIFIAAIArg2IAOAKIAgAYIAhAbQgBAFgFADQgFACgGAAIiuAAIAAA9ICLAAIApgpIBGBDQgDAEgFABQgGADgJAAQgQASgYAUQgYATgWAOIgFgEQADgSACgWIAEgsIiRAAIAACbQAAACgIAEQgJAEgPAEQgPADgWAAgAA4gBIAAgRIB0AAIAAARgAjGgCIAAgRIB9AAIAAARgAA4hFIAAgQIBjAAIAAAQgAizhGIAAgQIBmAAIAAAQg");
	this.shape_62.setTransform(972.1885,307.6);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#333333").s().p("AgvAAICjkeIARALIicETICcEUIgRALgAiFAAICkkeIARALIidETICdEUIgRALg");
	this.shape_63.setTransform(926.8,308.125);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#333333").s().p("Aj9EXQBCgVAngXQAngYAUgaQAUgbAHgdIiMAAIgEgRICTAAQADgQABgQIABgjIhDAAIgDgKQgfAbgoAWQgnAXgxASIgEgGQAygiAlgoQAkgoAZgrIiJAAIgFgRICYAAIAOgdIAMgeIh7AAIgEgRICGAAIAIgbIAIgaIikAAIgFgRICtAAIAIgrIAGgqIB1AXQgBAHgGAEQgFAEgLAAIgGAXIgFAYIBwAAIArg1IANAKIAfAXIAiAbQgCAFgEACQgFADgGAAIjeAAIgJAbIgJAaICBAAIAngwIAMAKIAcAVIAfAYQgBAFgFADQgEACgHAAIjmAAIgPAeIgRAdIDOAAIArg3IAOALIAgAYIAiAbQgBAFgFACQgEADgHAAIirAAQAWAXAfAPQAgANAjAHQAkAHAiACIgBAJQgZAQgPAUQgPAUgCAYQgygWgmgpQglgpgYg0IiIAAQgNASgPARQgPAPgSAQICCAAIAlgsIAMAJIAaATIAdAXQgBAFgFACQgEADgHAAIg/AAQAAASgCARQgCAQgEAQIA1AAIAogzIAMAKIAdAWIAfAaQgBAFgFADQgEACgHAAIiZAAIgEALIgFALQBVAJAvAQQAwARATATQAUASgCARQgBARgPALQgPAKgUAAQgVAAgSgPQgRgWgigcQghgcgygaQgPAagfAWQgfAXg0ASQgzAShOAOg");
	this.shape_64.setTransform(851.925,307.875);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#333333").s().p("AjMEBQgCgNgHgIQgHgIgNgGQgNgGgSgEIAAgHIAZABIAaABIASABIALgBQAEgBAFgDQAKgIAHgpQAHgoAEhJIgtAAIgXAdIhBgkIAIgHIAKgHQADgVACgcIAEg3IACgwIBRAmIAUAAIAAhxIh2AAIgFgQIB0AAIAignIBKA3QgDAFgHADQgGAFgKACIAAB/QgBACgKAEQgLAEgOADQgOAEgNAAIgMAAIAAgeIgkAAIgCAhIgDAkIgEAiIAqAAIAnglIBCA3QgDAEgGADQgGADgJAAQgEBBgFArQgHArgKAZQgKAYgPAMQgPAKgTAGQgTAFgaAAQAAgQgCgNgAA/EeIAAiGIiFAAIgFgRICKAAIAAhHIgkAAIAAAPQAAAEgQAGQgPAHgdABIgNAAIAAkaIBQAeIBdAAQAJgaAKgjQALgjAIgiIBiAmQgCAGgGADQgGACgKAAQgVAWgYAWQgXAUgXARIAXAAIAlgpIBDAzQgDAEgGADQgFADgKABIAADHQAAAEgRAHQgRAGgeAAIgNAAIAAgSIgkAAIAABHIAjAAIAng2IAMALIAcAYIAdAaQgBAFgFADQgEACgHAAIh+AAIAAByQAAACgHAFQgHAEgOAEQgNAEgUABgACKAwIAkAAIAAhYIgkAAgAAbAwIAkAAIAAhYIgkAAgACKg5IAkAAIAAhRIgkAAgAAbg5IAkAAIAAhRIgkAAgAAPiwQgEgbgLgaQgMgagPgUIAFgDQAyAHAaARQAZARAGATQAFAUgJAOQgJAPgSAEIgHABQgOAAgSgMg");
	this.shape_65.setTransform(791.475,307.95);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#333333").s().p("AAyEcIAAl/IgkAAIAAEXQAAADgHAFQgHAGgNAEQgOAEgUAAIgOAAIAAleIBUAgIAbAAIAAhdIiBAAIgFgRID0AAIArg5IAMALIAfAZQARAOAOAOQgBAFgEACQgGACgGABIiBAAIAABdIAfAAIAhgmIBHA2QgCADgFADQgFAEgIABIAADLQAAAagGARQgFASgRALQgSAJgjADIgBggQgBgNgDgIQgCgIgGgFQgFgGgKgCIAAgIIAEAAIAJAAIAJAAQAFAAACgCQACgDAAgEIAAjOIglAAIAAFpQAAADgIAFQgIAGgOADQgPAFgVAAgAkHEXQAjgnASgvQATguAIg1QAHg1AAg5IAAkKIBjAKQgCAGgFAFQgEADgMACIAADwQAAA/gOA4QgOA5gjAuQgiAug8AggAkUCVIAAlkIBcAIQgBAHgEADQgFAEgKACIAAE4QAAADgJAFQgJAFgOADQgNAEgOAAg");
	this.shape_66.setTransform(732.95,308.2);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#333333").s().p("Ai2D7QgDgNgHgJQgHgJgLgHQgLgGgXgEIAAgIIAKABIAYABIAZABIAQABQAGAAADgDQACgBAAgGIAAgxIgjALIgmAOQgCAFgFAFQgFADgFABIgihVIA0gFIBIgJIAAg1IAnADIAMgVIALgTIg0AAQgfAYgjAXQgiAXgoARIgFgGQAYgRAXgWQAXgUAVgWIg0AAIgGgRIBKAAIAYgeIAYgfIiRAAIgFgRIBZAAIAAhOIg+AAIgEgRIBCAAIAAhTIBoAIQgBAGgFAFQgEADgNADIAAA1IAbgmIAJAIIAVASIANgfIAMgeIBaAsQgDAFgFADQgFACgLgCQgRAdgTAfQgVAfgZAeIASAAIAegpIAGAGIAPANIAUASQAKgqAHgrQAHgsAEgsIBxAcQgCAFgFAEQgGAEgKABIgPAwIgQAtIAyAAIAqg3IANAKIAeAZIAgAbQgBAFgFADQgEACgHAAIgaAAQgGBEgTA9QgTA9gjA1QAaAbAfAXQAfAXAlARIgCAGQgeAGgRASQgTASgHAdQgegXgXgbQgXgegSghQglAlg1AdQgyAehHAUIgEgGQBFgjAsgvQAugtAcg1QgJgggIgiQgHgigFglQgQAWgSAUQgSATgUASIgIgEIAJgTIAHgTIgHACIgJABIghARIgiARIAWABQgBAIgFADQgFADgJABIAAAUIA3gHIA3gHIABAHIgxAWIg+AZIAABUQABAbgIATQgGATgWAKQgWAMgrAEQgCgTgDgPgABkheQgJASgLAQQAIAdAKAaQALAZANAXQAOgoAIgrQAJgsACguIgmAAQgIASgJASgAAGgLQAHgRAGgUIAMgoIhiAAIgdAfIghAeIAjAAIAlgmgAh2h2IAVggIATghIgoAAg");
	this.shape_67.setTransform(671.85,308.15);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#333333").s().p("ABxEeIAAlMIhAAAIAAABQABAsgGAsQgGAugUArQgUAsgpAmQgqAnhGAcIgEgEQAogjAZglQAZgnANgpQANgpAEgqQAEgrAAgsIAAjFIBVAdQAkgSAggTQAggTAWgQIBaBTQgHAFgLAAQgMAAgPgFQghAGgsAFQgsAGgvAEIAAB2IBwAAIAqg6IAOALIAeAaIAfAdQgBAFgEACQgFACgGAAIg8AAIAAE5QgBACgIAFQgJAEgQAEQgQAEgWAAgAkVCrIAAmZIBSAhIAgAAIAlgoIBLA5QgDAFgGADQgGAEgJACIAAEZQgBACgLAGQgLAFgQAEQgPADgPAAIgNAAIAAg/IgnAAIAABPQgBAFgJAGQgKAHgPAFQgQAFgSAAgAjEAvIAnAAIAAjrIgnAAg");
	this.shape_68.setTransform(613.075,307.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.a1_btn},{t:this.b1_btn}]}).to({state:[]},143).to({state:[{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.a5_btn},{t:this.b5_btn}]},16).to({state:[]},430).wait(3));

	// 音频控制
	this.m1_btn = new lib.mplay_btn();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(487.7,299.15,1,1,0,0,0,36.9,41.6);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.mplay_btn(), 3);

	this.mstop = new lib.mstop_btn("synched",0);
	this.mstop.name = "mstop";
	this.mstop.setTransform(487.6,299.15,1,1,0,0,0,36.8,41.6);

	this.m5_btn = new lib.mplay_btn();
	this.m5_btn.name = "m5_btn";
	this.m5_btn.setTransform(487.7,299.15,1,1,0,0,0,36.9,41.6);
	new cjs.ButtonHelper(this.m5_btn, 0, 1, 2, false, new lib.mplay_btn(), 3);

	this.m5stop_btn = new lib.mstop_btn();
	this.m5stop_btn.name = "m5stop_btn";
	this.m5stop_btn.setTransform(487.5,299.05,1,1,0,0,0,36.8,41.6);
	new cjs.ButtonHelper(this.m5stop_btn, 0, 1, 2, false, new lib.mstop_btn(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m1_btn}]}).to({state:[{t:this.mstop}]},5).to({state:[{t:this.m1_btn}]},76).to({state:[]},62).to({state:[{t:this.m5_btn}]},16).to({state:[{t:this.m5stop_btn}]},5).to({state:[{t:this.m1_btn}]},363).to({state:[]},62).wait(3));

	// 控件
	this.playm4_btn = new lib.play();
	this.playm4_btn.name = "playm4_btn";
	this.playm4_btn.setTransform(162.1,843.2,1,1,0,0,0,54.1,53.2);
	new cjs.ButtonHelper(this.playm4_btn, 0, 1, 1);

	this.instance_2 = new lib.节拍器();
	this.instance_2.setTransform(518.6,828.4,1,1,0,0,0,-441.4,-226.6);

	this.stopm4_btn = new lib.stop();
	this.stopm4_btn.name = "stopm4_btn";
	this.stopm4_btn.setTransform(162.1,843.2,1,1,0,0,0,54.1,53.2);
	new cjs.ButtonHelper(this.stopm4_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.playm4_btn}]},153).to({state:[{t:this.stopm4_btn},{t:this.instance_2}]},4).to({state:[]},2).wait(433));

	// 不动内容
	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#333333").s().p("AgqBJQgTgLgMgTQgLgUgBgXQABgYALgTQAMgTATgMQAUgLAXABQAXgBAUALQATAMALATQALATAAAYQAAAXgLAUQgLATgTALQgUAMgXABQgXgBgUgMgAgrgsQgSASAAAaQAAAaASASQASASAaAAQAZAAATgSQARgSABgaQgBgagRgSQgTgRgZgBQgaABgSARg");
	this.shape_69.setTransform(1252.65,327.4);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#333333").s().p("AikEeIAAjPQgWAggbAcQgdAbggAYIgGgGQAYghATgqQATgpAOgsQANgsAKgtIhTAAIgFgRIBpAAIAAhlIgzACIgyACIgBgGQAkgMAmgSQAngRAjgSQAigSAWgQIBWBRIAAgPIBZAkIA0AAIAmgsIBOA9QgDAEgFADQgGADgKADIAAFoQAAAEgMAFQgMAGgQAFQgQAEgQAAIgPAAIAAhAIg8AAIAAAsQgBAFgKAHQgJAHgRAFQgQAFgSAAIgPAAIAAk3QgCAEgDAAQgEABgEAAIhbAAIAAArQAwAMAWASQAVATADATQAEAUgKAOQgJAOgSACQgRACgTgPQgBgXgHgWQgGgXgLgSIAAEJQAAADgIAFQgJAGgPAEQgPAFgVABgABuCXIA8AAIAAk9Ig8AAgAgdiAIAaAYIAbAcIAAh9QgFADgLAAQgKABgQgGIgdAGIghAFIAABuIAng4IAMAKg");
	this.shape_70.setTransform(1210.85,308.05);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#333333").s().p("AiNEVQA0g6AahCQAbhCAKhIQAJhIAAhQIhEAAIgFgRIBJAAIAAhAIAAhCIBvAKQgBAHgFAEQgGAEgLACIAAA0IgBAzIAqAAIAsgtIBIBAQgEAEgGADQgGAEgLACIgBAyIAFgBQAsAZAUAbQATAbABAYQABAXgMAQQgLAPgSABQgSABgSgTQAEgjgEgiQgDgjgKgdQgBBPgDA4QgDA3gFAkQgFAkgIAVQgIAWgMAMQgRAQgWAIQgVAIgcAAQAAgWgDgOQgCgOgGgJQgHgKgNgHQgNgHgSgEIAAgIIAXACIAXABIASABQAHgBAFgCQAFgBAEgEQAKgJAGgkQAFglAEhFQADhCABhoIgyAAQgBBBgIA9QgIA6gVA2QgWA1gnAvQgoAuhBAmgAjoEdIAAl+IgzAAIgFgQIA4AAIAAirIBlAKQgBAFgEAFQgEADgLACIAACSIAigvIALAJIAYAWIAbAXQgCAFgEACQgEACgGAAIhQAAIAAFhQAAAFgKAGQgKAGgPAGQgPAFgPABgAhyBdQgMgFgHgNQgIgSAGgPQAHgQAPgKQAJgIAKgOQAJgPAGgSQAGgUgBgUIAHAAQARAnAEAfQAFAggFAWQgGAYgNAOQgJALgNACIgJABQgJAAgJgEg");
	this.shape_71.setTransform(1151.729,308.05);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#333333").s().p("Ai4EhIAAkEIBbAiIDFAAIAngsIBTA/QgDAEgHAEQgHAEgMADIAACqQAAACgMAEQgMAFgRADQgQAEgPAAIgPAAIAAgzIjRAAIAAAdQAAAEgLAGQgKAGgRAFQgRAFgSAAgAhjDZIDRAAIAAiJIjRAAgAgnAqIAAiCQg2Amg9AfQg+AdhAAVIgDgGQA1gdAygoQAygoAngsQAogtAVgrIjpAAIgGgQIGoAAIAtg4IAPALIAiAYIAjAcQgCAFgEACQgFACgGAAIiyAAQgKAQgNAOQgLAPgOAOIAaAJQgCAEgEADQgFADgJACIAACZQAAAEgKAGQgLAGgQAEQgOAFgUAAgADpAOQgSAAgTgUQgMgTgSgWQgTgWgYgVQgZgVgcgPIACgGQA8AEAvAPQAvAPAdAeQAQASABAUQABATgMAMQgKANgRAAIgBAAg");
	this.shape_72.setTransform(1090.95,307.625);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#333333").s().p("AkfEWQAqgiAZgpQAZgpAKgqQALgqACgnIB0AUQgCAHgEAEQgGAEgMAAQgEAQgFARQgHARgIAQQANATASAMQAQAMAWAGIAAiwIjwAAIgEgQIHBAAIAqg6IAOALIAeAaIAgAbQgBAFgFADQgEACgHAAIjWAAIAABSIAyAAIAug/IAPAMIAhAcIAjAeQgBAFgEADQgGACgGAAIiiAAIAABYIAMAAIANAAIAtAAIA5AAIA6AAIAugBIAAAHQgUAFgIATQgKATAAAZIipAAQg1AAglgKQgmgKgZgaQgagagQguQgWAmgqAhQgqAhhAAXgAi2gRIAAkCIBfAlIC2AAIAogsIBSA9QgDAEgGAEQgFAEgKACIAACfQAAACgNAFQgMAEgRAEQgTAEgPAAIgQAAIAAghIjAAAIAAARQAAAEgMAHQgMAGgSAFQgRAGgUAAgAhbhPIDAAAIAAhAIjAAAgAhbifIDAAAIAAg/IjAAAg");
	this.shape_73.setTransform(1031.35,308.175);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#333333").s().p("AjJEdIAAi+QgRAXgUAWQgVAWgXAUIgGgGQATgjAQgoQAPgpALgtQALgrAHgsIhGAAIgFgQIBTAAIAAhfIgpADIgoADIgCgGQAdgNAggRQAegSAcgSQAbgUARgPIBaBNQgGAGgLAAQgKAAgQgFIgWAGIgZAFIAABjIAdgqIAKAJIAZAXIAZAZQgBAFgEACQgFACgGAAIhJAAIAAAfQAsARAVAVQAUAVACAUQACAUgKANQgKAOgQABQgRACgSgQQAAgWgFgXQgFgWgIgUIAAEWQAAACgIAFQgIAGgOAEQgPAFgUAAgAhKD8IgFgQICMAAIAAhwIhdAAIgFgRIBiAAIAAhoIhnAAIgEgQIDgAAIAkgzIAMAKIAaAXIAbAZQgCAFgEABQgEADgHAAIh4AAIAABoIASAAIAmgzIAMAKIAcAXIAdAZQgBAFgEADQgFADgHgBIhsAAIAABwIAuAAIAkg0IAMAKIAaAXIAbAaQgBAFgEACQgFACgHAAgAgagtIAAjdIBRAeIBjAAIAkgmIBLA4IgIAHQgGAEgKABIAAB7QgBAEgKAEQgLAEgQAEQgPADgOAAIgNAAIAAgWIhtAAIAAARQAAAEgKAFQgKAGgQAEQgPAFgPAAgAA0hnIBtAAIAAh0IhtAAg");
	this.shape_74.setTransform(971.675,308.15);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#333333").s().p("AiyEdIAAkpIBcAiICnAAIAqgsIBSA/QgEAEgFADQgHAEgKADIAADHQgBAEgLAGQgMAHgRAFQgRAGgRAAIgQAAIAAgsIiyAAIAAATQAAAFgLAHQgMAGgQAFQgRAFgTAAgAhaDeICyAAIAAhUIiyAAgAhaB5ICyAAIAAhSIiyAAgAkRglIgFgRIE2AAIAOgpIANgsIALgqIjFAAQAvAOAVAUQAVAVABAUQACAVgMAOQgNAOgUABQgTABgVgSQgBgdgIgcQgHgcgMgXIhiAAIgGgQIDxAAIgLgEIgLgGQgCgWgJgTQgJgUgLgOIAEgCQA0gCAYALQAYALAGAQQAFARgJAOQgKAOgSAGIB4AAIArg6IAOAMIAgAZIAiAcQgCAFgFACQgEACgHAAIiWAAIBbAcQgBAGgGADQgFADgKgBQgVAUgfAYQgfAYgfAUIBsAAIAtg7IAPALIAgAaIAjAdQgBAFgFACQgFADgGAAg");
	this.shape_75.setTransform(911.85,307.966);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#333333").s().p("ABxEeIAAlMIhAAAIAAABQABAsgGAsQgGAugUArQgUAsgpAmQgqAnhGAcIgEgEQAogjAZglQAZgnANgpQANgpAEgqQAEgrAAgsIAAjFIBVAdQAkgSAggTQAggTAWgQIBaBTQgHAFgLAAQgMAAgPgFQghAGgsAFQgsAGgvAEIAAB2IBwAAIAqg6IAOALIAeAaIAfAdQgBAFgEACQgFACgGAAIg8AAIAAE5QgBACgIAFQgJAEgQAEQgQAEgWAAgAkVCrIAAmZIBSAhIAgAAIAlgoIBLA5QgDAFgGADQgGAEgJACIAAEZQgBACgLAGQgLAFgQAEQgPADgPAAIgNAAIAAg/IgnAAIAABPQgBAFgJAGQgKAHgPAFQgQAFgSAAgAjEAvIAnAAIAAjrIgnAAg");
	this.shape_76.setTransform(853.075,307.95);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#333333").s().p("AkgEaQAUgwAIg3QAJg3ACg5QACg4AAg1IAAjBIBCAVQAegSAbgTQAbgSARgQIBSBIQgFAFgKABQgLAAgOgFQgZAGgiAFQghAGgkAEIAABFIA4AAIAkgoIBKA5QgDADgGAEQgFAEgKACIAACjQgBADgLAEQgLAEgPADQgPAEgNAAIgOAAIAAgnIhBAAQgDAqgMArQgLAqgXAnQgYAogpAggAimgnIgBAkIgBAkIBAAAIAAiKIg+AAgAhbEYQArgzAVg5QAVg5AGg8QAGg7AAg7IAAiyIBQAZQAhgSAegTQAegTATgPIBXBOQgGAFgLAAQgLAAgQgFQgdAGgoAFQgoAGgqAEIAABxIBaAAIAng2IANAKIAcAYIAdAbQgBAFgEACQgFADgGAAIgvAAIAAE7QAAADgJAFQgIAFgQAFQgPAEgXABIgQAAIAAlSIgxAAQAAArgFAtQgFAvgSAvQgRAugkAqQgiAqg9Ahg");
	this.shape_77.setTransform(791.725,307.875);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#333333").s().p("AgoEXQAIgKAGgKIAMgWIixAAIgVAlIhLgsIAIgJIALgJIAAnYIBcAJQgBAGgEADQgEAEgKABIAAGDQATgpAMgxQAMgxAGgyIgsAAIgEgRIBDAAIAAjZIBXAJQgBAGgEAFQgFAFgMACIAAC+IAJAAIAgguIAIAIIASASIAWAVIAAh3IgGAAIgHABIgcAtQgQAXgRATIgJgEIAGglIAGgqIAGgrIBBAYIAAgxIBLAYQAbgSAYgUQAZgTAPgPIBUBHQgGAFgKAAQgLAAgOgEQgZAGgjAGQgiAFglAEIAAB2IBKAAIAng2IAMALIAcAYIAeAbQgBAFgFACQgEACgHAAIgxAAIAAFBQAAACgIAFQgIAFgOAEQgOAEgVABIgOAAIAAlWIgmAAIAAAcQABAngEAqQgEArgNAqQgOAqgcAmQgdAmgvAfgAjDDdIB2AAIAfgrIAGAGIAQANIATARQAOgmAHgpQAHgpACgrQACgpAAgpIAAgJQgDABgGAAIhQAAIAAAZQAnATASAVQARAWACAVQADATgJAOQgIANgPABQgOACgQgOQABgYgFgYQgFgZgIgWIAACsQAAADgIAFQgIAGgMADQgMAFgNAAIgMAAIAAh6QgNAVgPAUQgQATgSATIgGgHgAi1heQAEgcgEgeQgEgegIgZIAIgCQAmAcAMAbQAMAcgGATQgGAUgPAFIgHABQgMAAgMgNg");
	this.shape_78.setTransform(731.925,308.15);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#333333").s().p("ACWD6QgDgQgIgKQgHgJgNgHQgMgIgYgEIAAgIIALABIAXABIAbACIASAAQAIAAACgCQADgDAAgFIAAnSIBsAKQAAAHgGAEQgEAFgMABIAAG9QABAdgIAUQgHAVgXAMQgXAMgvAEQgBgVgDgPgAkaEXQA8gqAdg3QAdg3AHhFIh0AAIgFgRIB6AAIABgUIAAgUIAAg7IhkAAIgFgRIBpAAIAAjSIBqALQgBAGgEAEQgFAFgMABIAAC3IARAAIAng2IAMAKIAbAYIAdAbQgCAFgEACQgEADgHAAIhrAAIAAA7QAAAVgBATIAgAAIAmg1IAJAIIAXATIAbAZIAAkKIBnAJQgBAHgFAEQgFAFgMACIAAE/QAAADgKAFQgKAFgOAEQgQAFgQAAIgOAAIAAhWIgEABIgEABIh7AAQgIA1gWArQgXArgrAhQgrAhhCAWgAjxhsQACgjgHgjQgHgjgNgeIAFgCQAzAVAXAaQAXAaACAYQADAZgMAQQgLAQgTACIgDAAQgSAAgTgTgAhFheIAJgtIALg1IAKg3IBeAkQgCAGgGADQgGAEgKgBQgWAdgWAcQgYAdgYAYg");
	this.shape_79.setTransform(671.55,308.275);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#333333").s().p("ACBD7QgDgPgFgKQgHgKgKgGQgKgHgUgEIAAgIIAIABIATABIAVABIAPAAQAGAAADgDQACgDAAgFIAAgnIiGAAIAABxQAAAEgKAHQgJAGgQAFQgRAEgSABIgMAAIAAlHIBWAiIB7AAIAkgpIkZAAIgGgQICIAAIAAg5IheAAIgGgRIBkAAIAAg2Ih0AAIgFgRIB5AAIAAhKIBpAJQAAAGgDADQgFAEgKADIAAAxIAwAAIAqg2IANAKIAeAYIAgAbQgCAFgEADQgEACgIAAIiTAAIAAA2IAhAAIAngyIALAKIAdAWIAeAZQgBAFgFADQgFACgGAAIh9AAIAAA5IA1AAIArg4IANALIAeAZIAgAbQgBAFgEADQgFABgHAAIhXAAIBNA6QgDADgGADQgGAEgJACIAACtQAAAbgGATQgIAUgVALQgWAMgsAEQgBgVgCgOgAAOCAICGAAIAAg1IiGAAgAAOA6ICGAAIAAgzIiGAAgAj2CuQAWgLAIgJQAGgIAAgKIAAjxIhEAAIgFgRIBKAAIAlgkIBEA3QgDAEgGADQgGADgLACIAADUIAXgNIAZgOIADAEQgKATgWAgQgUAggeAnQgDAPgHALQgGALgIAGgAi9iqQgHgdgPgbQgPgbgRgWIAGgCQA3AFAcAQQAdAQAGAVQAIAUgJAQQgIAQgTAGIgKABQgPAAgRgKg");
	this.shape_80.setTransform(611.45,308.1);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#333333").s().p("AgqBJQgTgLgMgTQgLgTgBgYQABgXALgUQAMgTATgLQAUgMAXAAQAXAAAUAMQATALALATQALAUAAAXQAAAYgLATQgLATgTALQgUAMgXAAQgXAAgUgMgAgrgsQgSASAAAaQAAAaASASQASASAaABQAZgBATgSQARgSABgaQgBgagRgSQgTgSgZAAQgaAAgSASg");
	this.shape_81.setTransform(1124.4,518.8);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#333333").s().p("AkWESIgEgRIDuAAIAAhuIi1AAIgFgQIC6AAIAAhEIgVAGQgMACgQAAIgOAAIAAikIgiAAQgCAggMAiQgMAggeAeQgeAfg3AWIgEgEQAbgaAOgeQAOgcAGgfQAGgfAAgfIg6AAIgFgRIBAAAIAAgMIAAhXIgxAAIgEgRIDTAAIAmgvIANAJIAbAVIAeAZQgBAEgFADQgFACgGAAIg6AAIAABWIAbgoIAIAIIAUASIAYAWIAAh4IBhAIQgBAGgEADQgEAEgLACIAAC7QAAACgKAEQgJAEgPAEQgPADgPAAIgNAAIAAhVIgEAAIhLAAIAACEIBdAHQAAAHgFAEQgEAEgNACIAABEIBLAAIApg2QgBgQgDgMQgCgLgFgIQgGgJgKgGQgKgHgTgEIAAgGIAIAAIASABIAVABIAOAAQAGAAACgBQACgCAAgEIAAj9IBmAIQgBAHgFAEQgFADgKACIAADoQABAZgHASQgGATgSALQgTALgmAEIAUAPIAYATIAXAUQgCAFgEACQgFACgHAAIiuAAIAABuIB7AAIAqg3IAOALIAfAYIAhAbQgCAFgEADQgFACgHAAgAiMh6IAAAMIAhAAIAAhjIghAAg");
	this.shape_82.setTransform(1083.275,498.575);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#333333").s().p("Aj9EXQBCgVAngXQAngYAUgaQAUgbAHgdIiMAAIgEgRICTAAQADgQABgQIABgjIhDAAIgDgKQgfAbgoAWQgnAXgxASIgEgGQAygiAlgoQAkgoAZgrIiJAAIgFgRICYAAIAOgdIAMgeIh7AAIgEgRICGAAIAIgbIAIgaIikAAIgFgRICtAAIAIgrIAGgqIB1AXQgBAHgGAEQgFAEgLAAIgGAXIgFAYIBwAAIArg1IANAKIAfAXIAiAbQgCAFgEACQgFADgGAAIjeAAIgJAbIgJAaICBAAIAngwIAMAKIAcAVIAfAYQgBAFgFADQgEACgHAAIjmAAIgPAeIgRAdIDOAAIArg3IAOALIAgAYIAiAbQgBAFgFACQgEADgHAAIirAAQAWAXAfAPQAgANAjAHQAkAHAiACIgBAJQgZAQgPAUQgPAUgCAYQgygWgmgpQglgpgYg0IiIAAQgNASgPARQgPAPgSAQICCAAIAlgsIAMAJIAaATIAdAXQgBAFgFACQgEADgHAAIg/AAQAAASgCARQgCAQgEAQIA1AAIAogzIAMAKIAdAWIAfAaQgBAFgFADQgEACgHAAIiZAAIgEALIgFALQBVAJAvAQQAwARATATQAUASgCARQgBARgPALQgPAKgUAAQgVAAgSgPQgRgWgigcQghgcgygaQgPAagfAWQgfAXg0ASQgzAShOAOg");
	this.shape_83.setTransform(1023.675,499.275);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#333333").s().p("AhTEhIAAlSIibAAIgGgRIFwAAIAtgpIBLA9QgDAFgGACQgFADgKACQgCBGgEArQgEAtgJAXQgJAYgPAMQgQAKgUAHQgTAFgdAAQAAgUgCgPQgDgQgGgIQgHgKgMgHQgMgGgSgFIAAgHIAWACIAXABIARAAIAKgBQADgBAEgCQAIgHAEgnQAEgnAChKIh2AAIAAE8QAAADgKAFQgIAFgRAEQgRAEgZABgAiLhUIAAhcIiOAAIgFgRICTAAIAAheIBpAJQAAAFgEAFQgGADgLACIAABGIBpAAIAAheIBrAJQAAAFgFAFQgEADgMACIAABGIAfAAIAsg9IANAMIAgAbQARAPANAOQAAAFgFADQgEACgHAAIiGAAIAABDQABAEgLAFQgLAGgQADQgQADgTABIgOAAIAAhZIhpAAIAABIQAAADgKAGQgLAFgPADQgRADgSAAg");
	this.shape_84.setTransform(963.7,499.15);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#333333").s().p("ABmD3QgEgPgIgJQgIgJgQgIQgRgIgYgFIABgHIAgACIAfACIAXABQAHAAAFgCQAFgCAEgEQAQgPAHhTQAGhTACiYIhcAAQgYAngbAgQgbAfgfAZIgDgDIAADyQgBADgLAGQgLAFgPAEQgQAEgOABIgNAAIAAgwIhKAAIAAApQgBAFgIAHQgKAGgOAFQgPAFgSAAIgMAAIAAnJIBLAfIADglIADgpIABglIB0AcQgCAHgHAEQgGADgLAAIgfAlIgjAmIAnAAIAlgpIBKA6QgCAEgHADQgGADgIADIAABkQAOggAOgpQAMgpALgtQAKgtAIgsIBvAgQgBAGgHADQgFAEgLAAQgHATgJARIgSAjIBLAAIAtguIBJBBQgEAEgGADQgHADgKACQgCBegDBDQgCBDgFAtQgFAtgJAbQgIAbgNANQgRARgXAJQgXAHgiAAQABgVgDgPgAjDCuIBKAAIAAidIhKAAgAjDAAIBKAAIAAiTIhKAAgAAkBRQgBghgLghQgLgfgPgaIAEgDQA4AOAbAWQAcAWAEAXQAEAYgKARQgLARgVADIgEAAQgTAAgUgQg");
	this.shape_85.setTransform(904.85,499.525);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#333333").s().p("Aj9EXQBCgVAngXQAngYAUgaQAUgbAHgdIiMAAIgEgRICTAAQADgQABgQIABgjIhDAAIgDgKQgfAbgoAWQgnAXgxASIgEgGQAygiAlgoQAkgoAZgrIiJAAIgFgRICYAAIAOgdIAMgeIh7AAIgEgRICGAAIAIgbIAIgaIikAAIgFgRICtAAIAIgrIAGgqIB1AXQgBAHgGAEQgFAEgLAAIgGAXIgFAYIBwAAIArg1IANAKIAfAXIAiAbQgCAFgEACQgFADgGAAIjeAAIgJAbIgJAaICBAAIAngwIAMAKIAcAVIAfAYQgBAFgFADQgEACgHAAIjmAAIgPAeIgRAdIDOAAIArg3IAOALIAgAYIAiAbQgBAFgFACQgEADgHAAIirAAQAWAXAfAPQAgANAjAHQAkAHAiACIgBAJQgZAQgPAUQgPAUgCAYQgygWgmgpQglgpgYg0IiIAAQgNASgPARQgPAPgSAQICCAAIAlgsIAMAJIAaATIAdAXQgBAFgFACQgEADgHAAIg/AAQAAASgCARQgCAQgEAQIA1AAIAogzIAMAKIAdAWIAfAaQgBAFgFADQgEACgHAAIiZAAIgEALIgFALQBVAJAvAQQAwARATATQAUASgCARQgBARgPALQgPAKgUAAQgVAAgSgPQgRgWgigcQghgcgygaQgPAagfAWQgfAXg0ASQgzAShOAOg");
	this.shape_86.setTransform(843.675,499.275);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#333333").s().p("AjMEAQgCgMgHgIQgHgIgNgGQgNgHgSgEIAAgGIAZACIAaABIASAAIALgBQAEgBAFgDQAKgJAHgoQAHgpAEhIIgtAAIgXAdIhBgjIAIgIIAKgHQADgVACgcIAEg4IACgvIBRAmIAUAAIAAhwIh2AAIgFgRIB0AAIAigmIBKA3QgDAEgHAEQgGADgKACIAACAQgBACgKAEQgLAEgOADQgOAEgNgBIgMAAIAAgdIgkAAIgCAiIgDAkIgEAhIAqAAIAnglIBCA3QgDAEgGACQgGAEgJABQgEBAgFArQgHAqgKAZQgKAZgPALQgPALgTAGQgTAFgaAAQAAgRgCgNgAA/EeIAAiGIiFAAIgFgQICKAAIAAhIIgkAAIAAAPQAAAEgQAHQgPAGgdABIgNAAIAAkaIBQAdIBdAAQAJgZAKgjQALgiAIgjIBiAmQgCAFgGADQgGADgKAAQgVAXgYAUQgXAWgXAPIAXAAIAlgoIBDA0QgDAEgGACQgFADgKACIAADGQAAAEgRAGQgRAHgeABIgNAAIAAgTIgkAAIAABIIAjAAIAng2IAMAKIAcAYIAdAbQgBAFgFACQgEACgHAAIh+AAIAAByQAAACgHAFQgHAFgOADQgNAEgUABgACKAwIAkAAIAAhYIgkAAgAAbAwIAkAAIAAhYIgkAAgACKg5IAkAAIAAhSIgkAAgAAbg5IAkAAIAAhSIgkAAgAAPiwQgEgbgLgaQgMgagPgUIAFgDQAyAHAaARQAZARAGATQAFATgJAPQgJAPgSAEIgHABQgOAAgSgMg");
	this.shape_87.setTransform(783.225,499.35);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#333333").s().p("AAyEcIAAmAIgkAAIAAEYQABADgIAFQgHAFgOAFQgOAEgTAAIgOAAIAAleIBTAgIAcAAIAAheIiBAAIgFgQID1AAIApg5IAOALIAdAZQASAPAOANQgBAFgEADQgGABgGAAIiBAAIAABeIAfAAIAhgmIBHA2QgCADgFADQgFAEgJACIAADKQABAagGARQgFASgRAKQgSAKgkAEIAAghQgBgNgCgIQgDgIgFgGQgGgFgKgDIAAgIIAEAAIAJAAIAJABQAFAAACgDQACgCgBgEIAAjPIgkAAIAAFqQAAADgIAFQgIAGgOAEQgPAEgVAAgAkHEXQAjgnASgvQAUgvAHg0QAHg1AAg5IAAkKIBiAJQAAAHgGAEQgEAFgLABIAADwQAAA/gPA4QgPA5ghAuQgjAug9AggAkUCVIAAlkIBcAIQgBAGgEAEQgEAEgLACIAAE4QgBAEgIAEQgJAEgOAFQgNADgOAAg");
	this.shape_88.setTransform(724.7,499.6);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#333333").s().p("Ai1D8QgEgOgHgKQgHgIgLgGQgLgHgWgEIAAgHIAKAAIAWABIAZABIARABQAGAAADgCQACgDAAgFIAAgxIgkAMIglAMQgDAHgEADQgFAFgFAAIgihWIA0gEIBIgIIAAg2IAnADIAMgVIALgSIg0AAQgfAYgjAWQgiAWgoATIgGgGQAagSAWgVQAYgVAUgVIg0AAIgGgSIBJAAIAageIAXgfIiRAAIgFgRIBaAAIAAhOIg/AAIgFgRIBEAAIAAhUIBmAIQAAAHgEAFQgGAEgLACIAAA1IAbgmIAIAIIAVASIANgfIANgeIBZAtQgCAEgGADQgFACgMgBQgPAdgVAeQgUAegZAfIASAAIAdgpIAHAFIAQAOIATASQAKgqAHgsQAHgrADgsIByAcQgBAFgGAEQgGAEgLAAIgOAxIgQAtIAyAAIAqg4IANALIAfAYIAfAcQgBAFgEACQgGACgGAAIgaAAQgHBFgSA+QgTA8giA1QAZAbAfAXQAfAWAmASIgDAFQgeAHgSASQgSARgHAeQgfgWgWgcQgYgegQghQgmAlg0AdQgzAehHAUIgDgFQBEglAsgtQAvguAcg1QgKgggIgjQgHghgFgmQgQAXgSATQgSAVgUARIgIgEIAJgSIAHgUIgHACIgKABIgfARIgjARIAVACQAAAGgFAEQgFAEgKABIAAAUIA3gIIA4gHIABAHIgxAWIg/AYIAABVQACAbgIATQgHASgVALQgWAMgrAEQgBgUgDgNgABkheQgJASgKAQQAHAdAKAZQAKAaANAXQAPgoAIgrQAIgsADgvIgmAAQgIAUgJARgAAGgKQAHgSAGgUIALgoIhhAAIgeAfIggAeIAjAAIAlgmgAh1h1IAUgiIATggIgnAAg");
	this.shape_89.setTransform(663.6,499.55);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#333333").s().p("AkUEWQAcgfAOgiQAOgjAFgkQAFgkAAgiIhCAAIgEgRIBGAAIAAgCIAAhQIhKAAIgEgRIB4AAQAEgSAEgWIAFgsIADgoIBbAYIAIAAQAYAzAEAoQACAngLAVQgGAKgKAEQgJAFgKgCQgKgCgHgIQgHgLACgJQACgLAIgKIg5AAIAABQIAAACIACAAIAggyIALAKIAXAWIAYAZQgCAFgEACQgDADgHAAIhMAAQgBAjgKAnQgLAmgbAkQgdAkg3AbgAhFiHQgFADgKAAQgMAUgSAXQgSAYgWAVIAVAAIAfgvIAMAKIAXAYQAGgTABgWQACgXgEgWQgCAFgFADgAB5EaIAAjLIg4AAIgEgQIA8AAIAAhaIg6AAQgCBBgSA6QgTA6gqAuQgtAuhNAdIgEgFQA1gnAdgwQAegwALg3QALg4AAg9IAAjwIBeAJQgBAHgEAEQgFAEgLACIAAA9IBTAAQgGgBgHgDQgGgDgGgGQABgVgFgUQgHgVgJgOIAGgDQAqAGAVAOQAUAOADAPQAEAPgJANQgJAMgQADIAcAAIAhguIALAJIAWAVIAZAXQgBAFgEADQgEACgHAAIjLAAIAACBIBkAAQAFgTAFgWIAHgsIAEgqIBZAWQgBAGgGADQgFAEgJAAQgNAVgUAZQgTAYgVAWIAUAAIAgguIALAJIAWAVIAZAXQgCAFgEADQgEACgHAAIhKAAIAABTIAcgrIAKAKIAYAWIAYAZQgBAFgEACQgFACgFAAIhHAAIAAC6QAAACgIAEQgHAEgOADQgOAEgTAAgAjug9QACgbgFgcQgEgcgJgWIAGgDQAmATAQAVQARAVABASQABATgJAMQgKALgOABIgBAAQgOAAgPgOgABcg+QACgagFgbQgFgbgIgVIAHgDQAmASASAUQARAUABASQABATgKAMQgKAMgQAAIAAAAQgPAAgPgPgAkYitIgFgRIBlAAQgGgBgGgDQgFgDgGgFQABgVgGgVQgGgVgKgOIAFgDQAqAHATAOQAUAOACAPQAEAPgIAMQgJAMgPADIAiAAIAhguIALAJIAXAVIAaAXQgBAFgEADQgFACgGAAg");
	this.shape_90.setTransform(603.75,499.725);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#333333").s().p("ABxEeIAAlMIhAAAIAAABQABAsgGAsQgGAtgUAsQgUAsgpAnQgqAlhGAdIgEgEQAogjAZglQAZgmANgpQANgpAEgsQAEgqAAgrIAAjGIBVAdQAkgSAggTQAggTAWgQIBaBSQgHAGgLAAQgMAAgPgGQghAHgsAFQgsAGgvAEIAAB2IBwAAIAqg6IAOALIAeAaIAfAdQgBAEgEACQgFADgGAAIg8AAIAAE4QgBADgIAEQgJAFgQAEQgQAEgWAAgAkVCsIAAmaIBSAhIAgAAIAlgpIBLA7QgDADgGAEQgGADgJACIAAEaQgBACgLAGQgLAEgQAFQgPADgPAAIgNAAIAAg/IgnAAIAABPQgBAFgJAGQgKAHgPAFQgQAFgSABgAjEAvIAnAAIAAjrIgnAAg");
	this.shape_91.setTransform(544.825,499.35);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#333333").s().p("ACBD6QgDgPgFgJQgHgJgKgHQgKgGgUgEIAAgIIAIAAIATABIAVABIAPAAQAGAAADgCQACgDAAgGIAAgnIiGAAIAABxQAAAFgKAFQgJAHgQAEQgRAGgSAAIgMAAIAAlHIBWAiIB7AAIAkgoIkZAAIgGgRICIAAIAAg5IheAAIgGgRIBkAAIAAg2Ih0AAIgFgQIB5AAIAAhKIBqAIQgBAGgDAEQgFADgKACIAAAzIAwAAIAqg3IANAKIAeAZIAgAbQgCAEgEADQgEACgIAAIiTAAIAAA2IAhAAIAngzIALAKIAdAXIAeAZQgBAFgFACQgFADgGAAIh9AAIAAA5IA1AAIArg3IANAKIAeAZIAgAbQgBAFgEADQgFACgHAAIhXAAIBNA4QgDAEgGADQgGAEgJADIAACsQAAAbgGATQgIAUgVALQgWAMgsADQgBgUgCgPgAAOCAICGAAIAAg1IiGAAgAAOA7ICGAAIAAg0IiGAAgAj2CvQAXgNAHgHQAGgJAAgJIAAjxIhEAAIgFgRIBKAAIAlglIBEA3QgCAEgHADQgGADgLABIAADVIAXgOIAZgNIADAEQgKATgWAgQgUAggeAnQgDAPgHAMQgGAKgIAGgAi9irQgHgcgPgcQgPgbgRgUIAGgDQA3AEAcARQAdARAGAUQAIAUgJAQQgIARgTAEIgKACQgPAAgRgLg");
	this.shape_92.setTransform(483.2,499.5);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#333333").s().p("Ah8EYQAxg4AZhEQAYhDAGhJQAHhIgChJIhZAAIgFgRIEWAAIArg9IAOAMIAfAbIAgAdQgBAFgFADQgEACgHAAIjBAAIgDAxQgBAZgDAYIBQAAIArgqIBIA9QgDAFgGACQgGADgKACQgEBTgGA0QgGA0gLAcQgLAcgSANQgPANgVAGQgUAHgbAAQAAgUgCgOQgCgPgGgIQgHgJgLgHQgLgHgSgFIAAgGIAVACIAXABIARAAIAKgBQAFgCAEgDQAMgKAIgxQAHgyAFhdIhYAAQgIA8gVA4QgUA4gmAvQgoAvg/AhgAjWEdIAAkvQgfAdglAYIgGgEQAYgmAYgzQAXgzASg6QATg6ALg7IB5AkQgCAGgGADQgHAEgKAAQgOAjgQAfQgQAfgSAcIAdAKQgBAEgFADQgEADgJACIAAFcQgBAEgKAGQgKAFgQAFQgQAFgSAAgAA1iqQgCgdgNgdQgMgcgSgVIAEgDQA4AHAcARQAcATAGAVQAGAVgKARQgKARgUAEIgIABQgQAAgTgOg");
	this.shape_93.setTransform(1579.075,499.475);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#333333").s().p("AiFEVQA1gUAhgYQAhgXAQgaQASgZAGgcIiAAAIgFgRICKAAIAEgjIABgkIgTAAIAAARQAAAEgLAGQgJAGgQAFQgPAEgSAAIgLAAIAAgrQgKAGgMgBQgNgCgMgMQAAgVgFgUQgEgXgHgTIAAE2QAAAEgKAFQgLAFgPAFQgPAEgQAAIgRAAIAAjeQgQAXgTATQgTAVgWASIgGgFQAUgjAPgpQAPgpAKgtQAKgtAHgtIhFAAIgFgRIBPAAIAAiYIBrAKQgBAGgFAFQgEAEgNACIAAB1IAcgsIALAKIAYAZIAAgEIBUAgIB/AAIAjglIBHA2QgCACgEAEQgGADgHAAIAACPQAAABgEADIgOAHIATAQIAbAXIAaAXQgBAFgFADQgFACgGAAIiTAAQAPAZApAQQAqAPBHAFIAAAIQgfAIgQASQgQATgBAmQgkgMgZgYQgXgYgNgfQgNgdgFgfQgLAkgaAfQgZAdgzAVQgwAWhSAOgAB8BQQgCASgDAQIA0AAIAlg0IgUAGQgLACgKAAIgPAAIAAgbIgZAAIgDAlgAARAbICHAAIAAg5IiHAAgAh+hDIABAAQAWAJAPAKQAQAKAJAKIAAhXIg/AAgAARgvICHAAIAAg5IiHAAgAgQiMIAAg0IhCAAIgFgRIBHAAIAAhJIBhAHQAAAGgEAEQgEAEgMACIAAAyIAwAAIAAhJIBiAHQgBAGgEAEQgEAEgLACIAAAtIAggsIAMAKIAZAVIAbAZQgCAFgEADQgEACgGAAIhQAAIAAAZQAAADgKAGQgLAEgPAEQgQAEgPAAIgLAAIAAguIgwAAIAAAiQABACgLAFQgKAEgPADQgPADgOABg");
	this.shape_94.setTransform(1519.45,499.6);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#333333").s().p("AjCEcIAAkIQgWAPgWAOQgWAOgYAMIgEgGQAegiAdgpQAegqAXgqQAXgpAOghIBlA7QgCAEgFACQgGADgLgBIgaAaIgcAbIAcALQgCAEgFADQgDADgJACIAAEcQgBADgKAFQgLAFgQAEQgQAEgRAAgABDDyQgEgPgKgKQgHgGgJgFQgJgFgNgFQgNgEgVgEIAAgHIAOABIAhACIAlACIAZABQAHAAADgDQADgDAAgGIAAjxIihAAIgEgRIDpAAIArg5IANALIAeAZIAgAcQgBAFgFACQgEADgHAAIhQAAIAAD0QAAAcgIAVQgJAWgZANQgaANgzADQAAgUgGgQgAkQhuQAZgZAYgfQAZgfAUgfQAUgfAMgYIBeA7QgDAEgFADQgFACgLgCQgWAUgfAUQgfAVgjATQgjASgmAPgAgXjNIgFgRIC5AAIApg2IANALIAeAYIAeAaQgBAFgFADQgEACgGAAg");
	this.shape_95.setTransform(1458.85,499.625);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#333333").s().p("AkkDEIApgVIAqgZIAAjGIhIAAIgEgRIBCAAIAng0IBSBCQgEAFgHADQgIADgNACIAACzQALAKAMAIQANAJAOAGIgDgEQAWgjALgqQALgpADgwIhLAAIgFgQIBQAAIABgSIAAgTIAAhPIg8AAIgFgRIBBAAIAAiKIBkAJQgCAGgEAFQgEAEgMACIAABwIA1AAIAAiKIBkAJQgBAGgFAFQgEAEgMACIAABwIACAAIAkg4IAMALIAaAZIAcAbQgCAFgEADQgEACgHAAIhXAAIAAB0IANAAIAmg5IANALIAbAaIAcAcQgBAEgFACQgEACgHAAIhmAAIAACdQAAAFgKAFQgKAFgOAGQgPAEgPAAIgOAAIAAi2Ig5AAQgHA2gbArQgbArg4AfQAfANAtAFQAsAFBBgBIBZgBQArgBAvgDIAAAHQgZAHgOAUQgNAVgDAbIiYAAQg/gBgogLQgpgMgcgZQgbgZgWgnQgGgKgGAAQgFABgGAJIgRAeIgXAnIgYAoQABAEgCAEQgCAEgEACgAArgxQAAATgBASIA2AAIAAh0Ig1AAgAjAiJQgHgigRgiQgRgjgTgbIAEgDQA8AMAgAWQAeAWAIAYQAIAYgJASQgJASgUAGIgIAAQgRAAgTgNg");
	this.shape_96.setTransform(1399.325,499.5);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#333333").s().p("AAQBSQAWgKAOgOQAPgNAHgNQAIgOABgJQgOgEgPgGQgOgHgKgNQgJgNgBgUQAAgVAOgNQAPgNAWAAQAWAAAQAPQAOAPABAfQAAAcgJAaQgJAbgWAXQgVAXgjAPgAh7BSQAUgKAPgOQAOgNAIgNQAIgOAAgJQgNgEgOgGQgPgHgKgNQgKgNAAgUQABgVAOgNQAOgNAXAAQAWAAAPAPQAPAPABAfQAAAcgKAaQgKAbgVAXQgUAXgjAPg");
	this.shape_97.setTransform(1326.15,479.975);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#333333").s().p("AAtCgQgRgOgHgYQgPARgNALQgOAMgRAGQgRAGgYAAQgnAAgYgWQgYgVgBgnQAAgbAMgUQAMgUAcgPQAcgPAwgOIAcgHIAegIIAAglQAAgfgFgSQgGgSgNgHQgNgHgWAAIgNABIgMABIgFArQgCAegMAOQgNANgSAAQgQAAgLgIQgKgIgEgPQAEgrAmgYQAmgYBGgBQA+AAAcAdQAdAegBBBIAACgQAAARAFAHQAFAHAJgBQAGABAGgFQAGgFAJgNIAKAIQgLAZgSALQgTALgcAAQgeAAgRgOgAAAgNIgNAFQggAMgQAWQgQAWAAAhQAAAbAMAMQALANAWAAQALABAMgHQALgHARgOIAAh8IgTAFgAhtiKIAKgDg");
	this.shape_98.setTransform(1292.424,505.925);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#333333").s().p("AhxDoQgggTgSgnQgTgnAAg2QAAg4AUgmQAUgoAhgVQAigUAqAAQAagBAUALQAVAKASAUIAAiYIgygEIAAgRICIgZIAJAGIgDBgIAAF0IAnACIAAASIiAAIIgFgmQgTATgXALQgWALgcAAQgnAAgggVgAglgpQgTAMgMAcQgLAcAAAyQAAAxALAeQAKAdATAMQASANAWABQAMgBAMgDQAMgEALgJIAAjoQgLgIgLgDQgLgEgMAAIgCAAQgUAAgSAMg");
	this.shape_99.setTransform(1253.875,498.05);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#333333").s().p("AAgBXQgPgQgBgfQAAgbAKgaQAJgbAVgXQAVgXAjgPIANAUQgWAKgOAOQgPANgHANQgIAOgBAJQAOADAOAHQAOAHAKANQALAMAAAVQAAAVgPANQgOANgXAAQgWAAgPgPgAhrBXQgQgQAAgfQAAgbAJgaQAJgbAWgXQAVgXAjgPIAMAUQgWAKgOAOQgOANgIANQgIAOAAAJQANADAPAHQAOAHAKANQAKAMAAAVQAAAVgOANQgPANgWAAQgWAAgPgPg");
	this.shape_100.setTransform(1216.55,479.975);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#333333").s().p("AkOETQAeguAPg1QAOg1AEg5QAEg4gBg4IAAjcIBiAhIEBAAIAoguIBQBAIgJAIQgHAEgKACIAAGBQAAAcgHAUQgHATgWAMQgXALgtAEQgBgUgDgPQgDgPgGgJQgGgJgLgHQgLgHgWgEIAAgIIAJABIAVABIAWABIAQABQAHAAADgDQACgEAAgFIAAhsIhnAAIAAC7QAAADgIAFQgIAGgQAEQgPAFgWAAIgPAAIAAjSIhhAAQgGAogPAlQgPAmgcAiQgdAiguAdgAA3A0IBnAAIAAiBIhnAAgAh3guIAAAvQgBAZgDAaIBeAAIAAiBIhaAAgAA3hdIBnAAIAAh7IhnAAgAh3hdIBaAAIAAh7IhaAAg");
	this.shape_101.setTransform(1142.075,499.325);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#333333").s().p("AkUELIgEgRIDqAAIAAi4IidAAIgEgQIChAAIAAiaIhbAAQgdAxglAlQgjAlgrAbIgGgEQAWgkATguQAUgwAPg1QAPg1AJg3IB5AjQgCAGgFAEQgHADgKAAIgSAqQgJAUgKATIBRAAIAAiSIB2ALQgBAHgFAEQgFAFgMACIAAB1IBJAAIAwg7IAOALIAiAZIAlAeQgBAFgEACQgFACgIAAIi8AAIAACaIA4AAIAwg7IAPAKIAiAbIAmAdQgBAFgFACQgFACgGAAIiuAAIAAC4IBkAAIAxg/IARAMIAjAcIAmAeQgCAFgEADQgFACgHAAg");
	this.shape_102.setTransform(1083.1,498.075);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#333333").s().p("AhVD5QgFgQgKgKQgHgHgJgFQgJgFgNgFQgOgFgVgDIAAgIIAPABIAjACIAlADIAYABQAHgBADgCQADgCAAgGIAAheIjiAAIgEgRIDmAAIAAg+IA8AGIAZggIAWghIjnAAIgFgQIDwAAIAwgtIAmAkIAJgcIAIgcIlhAAQAEAkgKAXQgKAZgSAJQgMAHgNAAQgMgBgKgHQgLgGgEgNQgGgTAJgOQAJgOAQgIQALgHAKgMQAJgOAFgRQAEgRgDgUIAIAAQAHAOAFANQAFANADAMID6AAQAKgUAKgYQAKgYAIgXQAIgZAGgTIBrAnQgCAGgGADQgFADgLgCQgWAUgeAXQgdAXggAUIBSAAIAuguIBPBKQgDAFgGACQgFABgKABQgUAMgcANQgcANgbAJIAbAaQgDAEgGACQgFACgKABQgYALggANIg+AWIARABQgBAHgFAEQgEADgKACIAAAlIBvAAIAtg8IAPAMIAhAaIAjAdQgCAFgEADQgFADgHgBIjdAAIAABiQABAdgJAWQgJAUgZAMQgaANg0AEQgCgVgFgPgAiYimQgDgegMgcQgNgdgQgVIAFgDQA3AIAcASQAbASAGAWQAFAVgKAQQgKARgTADIgHABQgRAAgTgNgAgiiwQAAgdgHgbQgHgcgKgWIAFgCQA1AMAXAVQAYAUADAVQACAVgMAPQgNAPgVABIgDAAQgRAAgUgSg");
	this.shape_103.setTransform(1023.7707,499.5);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#333333").s().p("Ag6BiQAkgTASgZQAPgXAEgWQgOgEgQgIQgSgIgNgOQgMgOAAgWQgBgXARgQQAPgQAagBQAQAAAOAIQAOAIAIAPQAIAQABAXQAAAegLAgQgLAfgYAbQgXAbgnASg");
	this.shape_104.setTransform(941.75,524.65);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#333333").s().p("ABZEfQABgVgFgQQgEgPgKgJQgKgLgUgJQgVgIgbgGIABgGIAoACIAoADIAcABQAIAAAGgDQAGgCAFgFQAMgKAIgsQAIgsAEhKQAFhIADhjIkBAAIgaAkQgOARgPAPIAzAUIBOAAIAjgoIBOA6QgEAEgFADQgGAEgKABIAAClQAAADgMAEQgLAFgQADQgQAEgOAAIgOAAIAAgwIhWAAIAAA1QAAAEgLAGQgKAGgQAFQgPAFgSAAIgMAAIAAjpQgWASgYAPQgYAPgaANIgFgEQAbghAbgtQAagsAWg1QAVg0ANg3IB4AsQgCAGgGADQgGADgLgBIgPAcIgOAaIDtAAIAwgwIBKBDQgEAFgGADQgHADgLACQgDB3gGBRQgGBSgMAwQgLAwgUATQgSASgYAJQgXAIgkAAIgFAAgAhhBMIBWAAIAAiEIhWAAg");
	this.shape_105.setTransform(903.175,499.4264);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#333333").s().p("AkgETQAigrATguQATgvAIgwQAJgwABguIhPAAIgEgQIBUAAIAAgSIAAgSIAAhRQgRAagTAWQgUAWgWARIgIgEQANgeALglQALgkAHgpQAHgoADgqIBoAYQgBAHgGADQgFAEgKABIgPAmQgIATgIARIAvAAIAlgxIAMAKIAaAWQAQAMAMAMIAAABIBQAgIBdAAIAlgoIBNA5QgCAEgGAEQgGADgKACIAACIQAAACgMAEQgLAEgQADQgQAEgOAAIgPAAIAAgdIhmAAIAAAPQAAADgLAGQgKAGgQAFQgPAFgRAAIgLAAIAAhHIgCAAIgDAAIhQAAIgCAeIgFAgQAzARAXAXQAYAYADAXQADAXgMAQQgLAQgUACQgUADgVgUQABgbgHgdQgHgcgLgZQgJAlgSAkQgSAlgfAhQgfAhgvAbgAAvAMIBmAAIAAh5IhmAAgAhOg+IAVARIAYAWIAAiCQgCACgEABIgHABIhGAAIAABeIAAANIgBAOIAegpIAJAHgAheEKIgFgQIDFAAQAJgcAGggIALhBIAHg8IBuAYQgCAGgFAEQgGADgKABQgMAWgRAZQgRAagVAZQgUAagXAXIBEAAIAog4IANAKIAdAZIAfAcQgBAFgFACQgEACgHAAgAAKDQQADgigGgkQgGgjgJgeIAGgCQAuAXAVAaQAWAbABAYQACAYgMAPQgLAQgTABIgCAAQgRAAgTgTgAg3jOIgEgRIDYAAIAqg1IANAKIAeAYIAgAaQgCAFgEADQgFACgGAAg");
	this.shape_106.setTransform(843.925,499.025);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#333333").s().p("AhTEhIAAlSIibAAIgGgRIFwAAIAtgpIBLA9QgDAFgFACQgHADgJACQgCBGgEArQgEAtgJAXQgJAYgQAMQgOAKgVAHQgTAFgdAAQAAgUgCgPQgCgQgHgIQgHgKgMgHQgMgGgSgFIAAgHIAWACIAXABIARAAIAJgBQAFgBACgCQAJgHAEgnQAEgnAChKIh2AAIAAE8QAAADgKAFQgIAFgRAEQgRAEgZABgAiMhUIAAhcIiNAAIgEgRICRAAIAAheIBrAJQgBAFgFAFQgEADgMACIAABGIBpAAIAAheIBrAJQAAAFgFAFQgEADgLACIAABGIAeAAIArg9IAPAMIAeAbQASAPANAOQAAAFgFADQgEACgHAAIiFAAIAABDQAAAEgLAFQgLAGgQADQgQADgTABIgOAAIAAhZIhpAAIAABIQAAADgLAGQgKAFgQADQgQADgRAAg");
	this.shape_107.setTransform(723.7,499.15);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#333333").s().p("Ai1D8QgEgOgHgKQgHgIgLgGQgLgHgWgEIAAgHIAKAAIAWABIAZABIARABQAGAAADgCQACgDAAgFIAAgxIgkAMIglAMQgDAHgEADQgFAFgFAAIgihWIA0gEIBIgIIAAg2IAnADIAMgVIALgSIg0AAQgfAYgjAWQgiAWgoATIgGgGQAagSAWgVQAYgVAUgVIg0AAIgGgSIBKAAIAZgeIAXgfIiRAAIgFgRIBaAAIAAhOIg/AAIgFgRIBEAAIAAhUIBmAIQAAAHgEAFQgGAEgLACIAAA1IAbgmIAIAIIAVASIANgfIANgeIBZAtQgCAEgGADQgFACgMgBQgPAdgUAeQgVAegZAfIASAAIAdgpIAHAFIAQAOIATASQAKgqAHgsQAHgrADgsIByAcQgBAFgGAEQgGAEgLAAIgOAxIgQAtIAyAAIAqg4IANALIAfAYIAfAcQgBAFgEACQgGACgGAAIgaAAQgHBFgSA+QgTA8giA1QAZAbAfAXQAfAWAmASIgDAFQgeAHgSASQgSARgHAeQgfgWgWgcQgYgegQghQgmAlg0AdQgzAehHAUIgDgFQBEglAsgtQAvguAcg1QgKgggIgjQgHghgFgmQgQAXgSATQgSAVgUARIgIgEIAJgSIAHgUIgHACIgKABIgfARIgjARIAVACQAAAGgFAEQgFAEgKABIAAAUIA3gIIA4gHIABAHIgxAWIg/AYIAABVQACAbgIATQgHASgVALQgWAMgrAEQgBgUgDgNgABkheQgJASgKAQQAHAdAKAZQAKAaANAXQAPgoAIgrQAIgsADgvIgmAAQgIAUgJARgAAGgKQAHgSAGgUIALgoIhhAAIgdAfIghAeIAjAAIAlgmgAh1h1IAUgiIATggIgnAAg");
	this.shape_108.setTransform(483.6,499.55);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#333333").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape_109.setTransform(1526.575,482.925);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#333333").s().p("AAJCtIAAhXIiFAAIAAgmICUjbIAzAAIAADRIAyAAIAAAwIgyAAIAABXgAhiAmIBrAAIAAihg");
	this.shape_110.setTransform(1504.925,469.1);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#333333").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape_111.setTransform(1200.775,482.925);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#333333").s().p("AhXCeQgcgVgDgnQAEgLAIgFQAIgFAJAAQAOAAAIAIQAJAJADAWIAHAuIAIABIAJAAQAjAAATgTQATgUAAgnQAAgpgSgVQgTgVgiAAIgSAAIAAgRIAQAAQAfAAARgTQASgUAAgpQAAgigOgRQgPgRgZAAIgPABIgJAtQgEARgJAHQgJAHgNAAQgIAAgHgEQgHgEgDgHQAAgbAPgRQAOgRAYgJQAYgIAbAAQAkAAAYALQAYAKAMATQAMASAAAYQAAAggUAXQgVAXgvAKQAkAGAVAMQAWANAJATQAKAUAAAYQgBAcgPAVQgPAWgcALQgcAMgnABQg0gBgcgVg");
	this.shape_112.setTransform(1179.125,469.175);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#333333").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape_113.setTransform(864.925,482.925);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#333333").s().p("AhyCwIAAgqIAogrIAjgoQAZgcAQgWQAPgVAIgUQAIgVAAgYQAAgjgPgTQgPgUgaAAIgJAAIgJACIgKAtQgEAXgJAIQgKAIgLAAQgKgBgIgFQgIgFgEgIQACgbARgSQAQgTAagJQAagKAeAAQAkAAAYANQAXAMAMAVQALAVAAAcQAAAYgOAWQgPAWgcAYQgcAagqAhIgaAVIgfAbIDAAAIAAA5g");
	this.shape_114.setTransform(843.325,468.775);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#333333").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape_115.setTransform(516.025,482.925);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#333333").s().p("AhlCvIAAgOIBCgJIAAgrIABgrIAAjIIg3AGIAAgRIB8gdIAHAFIgCBLIAACgIAAArIABArIA9AJIAAAOg");
	this.shape_116.setTransform(494.375,468.875);

	this.instance_3 = new lib.yp320101();
	this.instance_3.setTransform(451,526,0.7713,0.7715);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#333333").s().p("AgqBKQgTgMgMgTQgLgUgBgXQABgYALgSQAMgUATgMQAUgKAXgBQAYABASAKQAUAMALAUQALASAAAYQAAAXgLAUQgLATgUAMQgSALgYAAQgXAAgUgLgAgrgrQgSARAAAaQAAAaASASQASASAaABQAZgBATgSQARgSABgaQgBgagRgRQgTgTgZAAQgaAAgSATg");
	this.shape_117.setTransform(1362.35,326.9);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#333333").s().p("AhTEgIAAlRIibAAIgGgQIFwAAIAtgrIBLA+QgDAFgFACQgHADgJACQgCBGgEArQgEAsgJAYQgJAYgQAMQgOAKgVAHQgTAFgdAAQAAgUgCgPQgCgQgHgIQgHgKgMgGQgMgHgSgFIAAgGIAWABIAXABIARAAIAJAAQAEgCAEgCQAIgHAEgoQAEgmAChKIh2AAIAAE8QAAADgKAFQgIAFgRAEQgSAEgYAAgAiLhUIAAhcIiOAAIgEgRICSAAIAAhfIBqAJQgBAGgFAEQgEAFgMABIAABGIBpAAIAAhfIBrAJQAAAGgFAEQgEAFgLABIAABGIAeAAIAsg9IANALIAgAbQARAQANAOQAAAFgFACQgFADgGAAIiFAAIAABDQAAAFgLAEQgLAFgQAEQgQAEgTAAIgOAAIAAhZIhpAAIAABIQAAADgLAGQgKAEgQAEQgQADgSAAg");
	this.shape_118.setTransform(1141.65,307.25);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#333333").s().p("ACZD5QgEgOgIgKQgHgKgNgHQgMgHgZgEIAAgIIAKABIAZABIAcACIATAAQAHAAADgCQADgDAAgFIAAnJIBpAJQABAHgGAFQgFAEgLACIAAG0QAAAcgHAUQgHAUgXAMQgXALguAFQgBgVgDgPgAkREXQA+gnAsg3QAsg3AchBQgLAMgSABQgTACgTgPQAAgTgFgTQgGgSgJgPQgVAYgZAXQgYAWgbASIgFgEQAcgoAXgvQAVgwAPgyQAOgyAGgvIhcAAIgGgQIDPAAIAtg/IAOAMIAfAcIAiAeQgCAFgEACQgFACgHAAIhyAAQgHAZgKAZQgKAZgMAYIA+AAIArgsIBJBCQgDAFgFADQgGACgLABQgTBNgjBFQgjBFg+A3Qg8A2hfAigAiQg5IgVAeQAtAIATASQATAQAAATQALgdAJgfQAIgfAGggIhNAAIgTAggABACJIAAl1IBfAJQgBAGgDAEQgEAEgLABIAAFIQgBADgJAFQgJAFgOAEQgPAEgOAAg");
	this.shape_119.setTransform(1081.1,307.625);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#333333").s().p("Ag8EfIAAnrIjdAAIgFgRIGwAAIAyhBIAKAHIAXASIAeAYIAcAXQgBAFgFACQgFADgHAAIjtAAIAABnQBKAMAwAVQAvAVAZAaQAZAZAGAYQAGAZgJASQgIASgUAGQgTAGgagMQgRgfgZgfQgYgegcgdQgbgdgcgYIAAFaQAAADgJAGQgJAGgQAFQgRAFgYABg");
	this.shape_120.setTransform(1021.625,307.425);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#333333").s().p("ACeEYIAAg0Ik4AAIgXAoIhUguIAKgKIAKgKIAAiyIBoALQAAAEgFAEQgFAEgKABIAACjIBvAAIAAjwIhPAAIgZAnIhRgtIAJgKIAKgJIAAinIBnAKQgBAFgEADQgGAEgKACIAACXIBUAAIAAjpIBtALQgBAGgFAFQgEAEgMACIAADNIBZAAIAAivIBoAJQgBAGgFADQgDAEgLACIAAC5QgBADgKAEQgLAEgPADQgQADgQABIgPAAIAAgjIhZAAIAADwIB1AAIAAi6IBoAJQgBAFgEAEQgEAEgKACIAADUQAAADgLAEQgLAEgPAEQgQADgQABg");
	this.shape_121.setTransform(961.3,307.525);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#333333").s().p("AieEYQBGgaAsgpQAsgoAWg5IiMAAIgFgRICXAAQANgnAGgtQAGgtgBg0IBxAOQgBAGgFACQgEADgNABQgFAtgJAnQgJAmgOAhIA9AAIApg1IANAJIAeAZIAgAaQgBAFgFACQgEADgHAAIinAAQgWArghAhQgiAhgwAWQgxAYhDAPgADJESQgLgXgRgZQgSgYgUgXQgUgWgTgTIAFgDQBCAIAlAUQAmAVANAXQAOAXgEAVQgFAUgRAHQgHADgIAAQgMAAgPgHgAj/C3QAWgNAHgHQAHgJgBgJIAAj6IhBAAIgGgRIBJAAIAlglIBDA4QgCAEgGACQgGADgMACIAADuIAdgLIAegLIACAEIglAwQgYAdgiAlQgDAJgGAIIgLAMgAgwBVQgFgVgPgSQgOgVgRgLIAFgEQAtgFAZAKQAYAJAGAPQAHAPgGAOQgGAPgOAGQgGACgGAAQgKAAgNgGgAgWABQgGgSgPgTQgOgTgRgLIAEgEQAugGAYAIQAXAJAIAOQAHAPgFAPQgGANgPAGQgGACgGAAQgKAAgMgFgACwABIAHgsIAGgvIkoAAIgFgRICFAAIAAhMIhnAAIgFgQIBsAAIAAhWIBkAIQgBAGgEADQgEAFgKACIAAA+IAjAAIAog0IAMAKIAdAXIAfAaQgCAFgEACQgFACgGAAIiCAAIAABMIBSAAIAogoIBEBBQgDAEgFACQgGACgJAAQgRATgYAWQgYAXgYAOgAjEirQgHgdgQgbQgPgbgQgVIAFgCQA3AEAcAQQAdARAHAUQAHAUgJAQQgIARgTAFIgKABQgPAAgQgKg");
	this.shape_122.setTransform(901.925,307.65);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#333333").s().p("Ag6BiQAkgTASgYQAPgZAEgVQgOgFgRgHQgRgIgNgOQgMgOAAgWQAAgWAPgRQAQgQAagBQAQAAANAIQAOAIAJAPQAIAQABAXQgBAegKAfQgLAggYAcQgXAbgnARg");
	this.shape_123.setTransform(819.7,332.75);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#333333").s().p("AjjD8QgDgPgGgJQgFgJgKgHQgJgGgUgEIAAgIIAIABIARABIAUABIAOAAQAGAAADgCQACgCAAgFIAAh4IgcAPQgCAGgGAEQgFAFgGABIgehkIAggEIAtgGIAAh2IhCAAIgGgRIBIAAIAAiKIBnAJQgBAHgFAEQgFAFgLACIAABrIAfgyIAJAJIAYAYIAXAZIAAgyIBVAjIAIAAIAFgoIAEgtIADgqIBzASQgBAIgHAEQgGAEgLABIgXAdIgbAhIgbAeIBcAAIApgtIBPA/QgDAEgIAEQgHAEgLADIAAF4QAAADgLAGQgMAFgPAFQgQAEgQAAIgNAAIAAg0IiIAAIAAAbQgBAFgJAHQgKAGgQAGQgPAFgSAAIgNAAIAAk1IgmAZIgxAcIAACrQABAbgIATQgGAUgVALQgUALgqADIgCghgAAoDPICIAAIAAitIiIAAgAAoARICIAAIAAidIiIAAgAiBgXIArgGIAsgHIAAhiIgGAEIgIABIhJAAg");
	this.shape_124.setTransform(781.1,307.575);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#333333").s().p("AjUEdIAAkzQgSAQgSANQgSAPgTANIgGgEQAYgmAXgzQAYgzASg6QATg6ALg7IB5AkQgDAGgFADQgHAEgKAAQgOAigPAfQgQAfgSAbIAgAMQgCAEgEADQgEADgIACIAAFcQgCAEgKAGQgLAGgPAEQgQAFgRAAgAh0D2IgFgRIDNAAQAKgyAJg6IAQhzQAHg4AEgwIB1AdQgCAGgFAEQgGAEgLABQgMAngUAwQgTAwgYAzQgaAzgcAuIBCAAIAwg/IAOAMIAiAcIAkAeQgCAFgEADQgEACgIAAgAAADMQgSgDgNgXQABgjgCgtQgBgtgJgvQgIgvgTgqIAHgEQA2AxAbAsQAcAsAHAmQAIAmgHAbQgIAbgPAOQgMALgOAAIgGgBgAhnh2IgFgQIEIAAIAtg8IAPAMIAgAaIAjAdQgCAFgFACQgFACgGAAgAAqifQgDghgMgfQgMgggPgZIADgDQA8ALAeAVQAdAWAFAXQAFAYgLASQgMARgVAEIgHAAQgSAAgVgQg");
	this.shape_125.setTransform(721,307.575);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#333333").s().p("AgtEcIAAh7IjqAAIgFgRIDvAAIAAhHIhPAAIAAAIQAAAFgLAGQgLAHgRAEQgRAGgSAAIgNAAIAAkZIBdAjICMAAIAVgpIAVg0IAVg2IBpAvQgCAFgHACQgGADgKAAQgeAbghAXQghAXggARIBRAAIAmgoIBOA6IgIAGQgFAEgJACIAAC0QgBAEgLAFQgLAGgRAEQgRAFgQABIgPAAIAAgZIhQAAIAABHIBrAAIAwg7IAPALIAiAaIAlAdQgCAFgEACQgFADgHAAIjfAAIAABmQAAADgIAFQgJAEgRAFQgPAEgXAAgAAsA4IBQAAIAAhRIhQAAgAh8A4IBPAAIAAhRIhPAAgAAsgqIBQAAIAAhOIhQAAgAh8gqIBPAAIAAhOIhPAAgAhoibQgIgfgRgeQgRgggTgXIAFgEQA5AJAeATQAdASAJAXQAHAVgIARQgIASgSAEIgKACQgPAAgRgLg");
	this.shape_126.setTransform(661.35,307.55);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#333333").s().p("ACLEbIAAgzIkaAAIgZAlIhWgqIAKgLIANgKIAAi4IBrAKQgBAIgEAEQgFAEgMACIAACmIBlAAIAAjnIjuAAIgFgRIDzAAIAAh9Ii/AAIgFgRIDEAAIAAhsIBuAKQgBAHgFAEQgEAFgNABIAABRIBBAAIAwg9IAQAMIAjAbIAlAdQgBAFgFADQgFACgGAAIi4AAIAAB9IBvAAIAwg9IAPAMIAjAbIAmAeQgBAEgFADQgFADgHgBIjlAAIAADnIBhAAIAAjBIBuAJQAAAHgFAEQgEAEgMACIAADXQgBADgLAEQgKAFgRAEQgRADgSAAg");
	this.shape_127.setTransform(601.675,307.65);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#333333").s().p("AjkD8QgDgPgFgJQgFgJgJgHQgLgGgSgEIAAgIIAHABIARABIAUABIAOAAQAGAAADgCQACgCAAgFIAAh4IgdAPQgCAGgFAEQgFAFgGABIgehkIAggEIAtgGIAAh2IhCAAIgGgRIBIAAIAAiKIBnAJQgBAHgFAEQgFAFgMACIAABrIAggyIAKAJIAWAYIAYAZIAAgyIBVAjIAIAAIAFgoIAEgtIAEgqIByASQgCAIgFAEQgHAEgKABIgYAdIgcAhIgbAeIBdAAIApgtIBPA/QgDAEgIAEQgHAEgKADIAAF4QgCADgLAGQgLAFgQAFQgQAEgPAAIgNAAIAAg0IiJAAIAAAbQABAFgLAHQgJAGgQAGQgOAFgTAAIgNAAIAAk1IgmAZIgyAcIAACrQABAbgGATQgHAUgUALQgVALgpADIgEghgAAnDPICJAAIAAitIiJAAgAAnARICJAAIAAidIiJAAgAiCgXIAsgGIAsgHIAAhiIgGAEIgIABIhKAAg");
	this.shape_128.setTransform(541.1,307.575);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#333333").s().p("ACBD6QgDgOgGgLQgGgIgKgHQgKgGgUgFIAAgHIAIAAIATABIAVABIAPABQAGAAADgDQACgDAAgGIAAgnIiGAAIAABxQAAAFgKAGQgKAGgQAEQgQAGgSAAIgMAAIAAlHIBWAiIB7AAIAkgoIkZAAIgGgRICJAAIAAg5IhfAAIgGgRIBlAAIAAg2Ih1AAIgFgQIB6AAIAAhKIBoAHQAAAHgDAEQgFADgLACIAAAzIAxAAIApg3IAOAKIAeAZIAgAbQgBAEgFACQgFADgGAAIiVAAIAAA2IAiAAIAmgzIAMAKIAdAXIAeAZQgCAFgEACQgFADgGAAIh+AAIAAA5IA1AAIAsg3IANAKIAeAZIAgAbQgBAFgEACQgFADgHAAIhWAAIBMA4QgDAEgGAEQgFADgKADIAACsQAAAbgGAUQgHATgWALQgWAMgsADQAAgUgDgPgAAOB/ICGAAIAAg0IiGAAgAAOA7ICGAAIAAg0IiGAAgAj2CvQAWgMAIgJQAGgHAAgLIAAjwIhDAAIgHgRIBLAAIAlglIBEA4QgCADgHADQgGADgLACIAADUIAYgOIAYgNIADAEQgLATgVAgQgUAhgdAnQgEAPgGALQgHAKgIAFgAi8irQgIgcgPgbQgPgcgQgUIAEgDQA4AEAcARQAdAQAGAVQAHAUgIAQQgJARgSAEIgKACQgPAAgQgLg");
	this.shape_129.setTransform(481.15,307.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69}]}).to({state:[{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88,p:{x:724.7}},{t:this.shape_87,p:{x:783.225}},{t:this.shape_86,p:{x:843.675}},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83,p:{x:1023.675,y:499.275}},{t:this.shape_82},{t:this.shape_81,p:{x:1124.4}}]},143).to({state:[{t:this.shape_108},{t:this.shape_88,p:{x:544.7}},{t:this.shape_87,p:{x:603.225}},{t:this.shape_86,p:{x:663.675}},{t:this.shape_107},{t:this.shape_83,p:{x:783.675,y:499.275}},{t:this.shape_106,p:{x:843.925,y:499.025}},{t:this.shape_105,p:{x:903.175,y:499.4264}},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_81,p:{x:1620.2}}]},5).to({state:[{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_83,p:{x:1201.625,y:307.375}},{t:this.shape_106,p:{x:1261.875,y:307.125}},{t:this.shape_105,p:{x:1321.125,y:307.5264}},{t:this.shape_117},{t:this.instance_3},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109}]},5).to({state:[]},6).to({state:[]},430).wait(3));

	// bg
	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("EiLsBMwQhvAAhQhPQhPhPAAhwMAAAiRDQAAhwBPhPQBQhPBvAAMEXZAAAQBvAABPBPQBQBPAABwMAAACRDQAABwhQBPQhPBPhvAAg");
	this.shape_130.setTransform(959.9897,540.0003,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_130).to({_off:true},589).wait(3));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1881,1031.3);
// library properties:
lib.properties = {
	id: 'DB484B266704CB47A4D9ACBAE35EF622',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#F7C677",
	opacity: 1.00,
	manifest: [
		{src:"images/听一听_atlas_1.png?1689314290010", id:"听一听_atlas_1"},
		{src:"sounds/fail.mp3?1689314290072", id:"fail"},
		{src:"sounds/victory.mp3?1689314290072", id:"victory"},
		{src:"sounds/yx420102听辨和声音程题目.mp3?1689314290072", id:"yx420102听辨和声音程题目"},
		{src:"sounds/节拍器声音_.mp3?1689314290072", id:"节拍器声音"},
		{src:"sounds/雪绒花片段_.mp3?1689314290072", id:"雪绒花片段"}
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