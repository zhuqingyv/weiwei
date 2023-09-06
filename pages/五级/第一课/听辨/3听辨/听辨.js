(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"听辨_atlas_1", frames: [[0,168,1400,79],[0,0,1366,82],[0,84,1366,82]]}
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



(lib.Bitmap1111111111 = function() {
	this.initialize(ss["听辨_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap211 = function() {
	this.initialize(ss["听辨_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap31 = function() {
	this.initialize(ss["听辨_atlas_1"]);
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
	this.shape_7.graphics.f("rgba(0,0,0,0.6)").s().p("AgfB1QgOgFgKgHQgLgHgHgJIAOgQQAKALAOAHQAOAIAUABQAOAAALgGQALgFAGgKQAHgLAAgOQAAgOgIgLQgHgLgQgGQgQgGgaAAIAAgUQAYAAAOgGQAOgGAGgLQAGgKABgNQgBgSgKgKQgLgLgTAAQgOAAgNAGQgMAHgKAKIgPgRQANgMAQgHQARgIATAAQATAAAOAHQAQAGAIANQAIANABATQgBAWgKAOQgMAOgTAHIAAABQAOADALAHQAMAIAGAMQAHANAAAQQAAAVgKAPQgKAPgQAIQgRAHgUAAQgSAAgOgEg");
	this.shape_7.setTransform(10.35,24.625);

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
	this.shape_7.graphics.f("rgba(0,0,0,0.6)").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_7.setTransform(10.625,24.425);

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
	this.shape_15.graphics.f("#F7C677").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_15.setTransform(10.625,24.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).wait(3));

	// 图层_2
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_16.setTransform(114.675,22.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(4));

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
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("ABFCRIgCgKIgGgKIAgAAIASAAQAEAAACgCQACgCAAgEIAAkBIAVAAIAAEAQAAAMgDAFQgDAFgIADQgHACgOABIgWABIgOAAgAhACNQgOAAgJgCQgIgDgFgHQgDgHAAgNIAAiJIByAAIAAADIgBAGIgDAsQgCARgCAJQgDAKgDADQgDAEgEACIgKACIgNAAIgSAAQAAgFgCgFQgBgFgDgEIARABIALABIAGgBIAEgCIAEgJIACgUIADggIhJAAIAAB2QAAAIAFADQAEADAMAAIA5AAQAHAAAEgEQADgDACgKIACgdIAJAFIAKADQgBAWgDAMQgDANgIAFQgIAEgMAAgAA5BDIAAiuIATAAIAACugAiDgWIgIgHQAUgPARgTQATgSANgVQANgVAJgVIATAGIgDAHIgCAHIAbAdIAaAeIAUAbIgQAOQgGgLgMgOIgXgdIgagdQgPAagUAYQgUAYgYASIgIgHg");
	this.shape_4.setTransform(75.25,24.1833);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.6)").s().p("ABsCJIgDgHIAKAAIAGAAIACgCIABgCIAAgxIgZAAIAAA8IgPAAIAAg8IgZAAIAAA8IgOAAIAAg8IgdAAIAABEIgQAAIAAiYIB8AAIARAAIAACFQAAAHgCADQgBAEgEACQgEACgGABIgOAAIgCgIgABjA8IAZAAIAAgyIgZAAgAA7A8IAZAAIAAgyIgZAAgAAQA8IAdAAIAAgyIgdAAgAgrCHIgJgFQAOgaAHgeQAHgeACgdQACgdAAgZIAAhFIBKAAIgHgQIgIgPIAUgGIAKATIAIASIA+AAIAABJIiMAAIgBApQgCAXgDAYQgEAYgHAWQgHAYgKATIgIgHgAgBg1IB4AAIAAglIh4AAgAiLBqIAqgPIAygTIAEARIgwAUIgrARgAiGA3IgEgKQAFgBAFgGIAMgOIANgRIARgbIgbAEIgOADIgHACIgCgJIgEgKQAEgBAEgGIAJgOIALgUIAPghQAIgTAGgUIAVAIQgKAbgNAaQgNAZgOAWIAmgEIAKgSIAJgTIARAKQgOAbgQAbQgRAZgRAWIA3gLIABAJIABAIIgrAKIgZAHIgMADIgGADIgDgJg");
	this.shape_5.setTransform(43.675,24);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_6.setTransform(23.85,34.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,0,0,0.6)").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_7.setTransform(11.15,24.65);

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
	this.shape_12.graphics.f("#F7C677").s().p("ABFCRIgCgKIgGgKIAgAAIASAAQAEAAACgCQACgCAAgEIAAkBIAVAAIAAEAQAAAMgDAFQgDAFgIADQgHACgOABIgWABIgOAAgAhACNQgOAAgJgCQgIgDgFgHQgDgHAAgNIAAiJIByAAIAAADIgBAGIgDAsQgCARgCAJQgDAKgDADQgDAEgEACIgKACIgNAAIgSAAQAAgFgCgFQgBgFgDgEIARABIALABIAGgBIAEgCIAEgJIACgUIADggIhJAAIAAB2QAAAIAFADQAEADAMAAIA5AAQAHAAAEgEQADgDACgKIACgdIAJAFIAKADQgBAWgDAMQgDANgIAFQgIAEgMAAgAA5BDIAAiuIATAAIAACugAiDgWIgIgHQAUgPARgTQATgSANgVQANgVAJgVIATAGIgDAHIgCAHIAbAdIAaAeIAUAbIgQAOQgGgLgMgOIgXgdIgagdQgPAagUAYQgUAYgYASIgIgHg");
	this.shape_12.setTransform(75.25,24.1833);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F7C677").s().p("ABsCJIgDgHIAKAAIAGAAIACgCIABgCIAAgxIgZAAIAAA8IgPAAIAAg8IgZAAIAAA8IgOAAIAAg8IgdAAIAABEIgQAAIAAiYIB8AAIARAAIAACFQAAAHgCADQgBAEgEACQgEACgGABIgOAAIgCgIgABjA8IAZAAIAAgyIgZAAgAA7A8IAZAAIAAgyIgZAAgAAQA8IAdAAIAAgyIgdAAgAgrCHIgJgFQAOgaAHgeQAHgeACgdQACgdAAgZIAAhFIBKAAIgHgQIgIgPIAUgGIAKATIAIASIA+AAIAABJIiMAAIgBApQgCAXgDAYQgEAYgHAWQgHAYgKATIgIgHgAgBg1IB4AAIAAglIh4AAgAiLBqIAqgPIAygTIAEARIgwAUIgrARgAiGA3IgEgKQAFgBAFgGIAMgOIANgRIARgbIgbAEIgOADIgHACIgCgJIgEgKQAEgBAEgGIAJgOIALgUIAPghQAIgTAGgUIAVAIQgKAbgNAaQgNAZgOAWIAmgEIAKgSIAJgTIARAKQgOAbgQAbQgRAZgRAWIA3gLIABAJIABAIIgrAKIgZAHIgMADIgGADIgDgJg");
	this.shape_13.setTransform(43.675,24);

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
	var mask_graphics_30 = new cjs.Graphics().p("AnhLfIAA29IPDAAIAAW9g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-40.5,y:-0.775}).wait(1).to({graphics:mask_graphics_1,x:-36.55,y:-0.775}).wait(1).to({graphics:mask_graphics_2,x:-32.575,y:-0.775}).wait(1).to({graphics:mask_graphics_3,x:-28.625,y:-0.775}).wait(1).to({graphics:mask_graphics_4,x:-24.675,y:-0.775}).wait(1).to({graphics:mask_graphics_5,x:-20.725,y:-0.775}).wait(1).to({graphics:mask_graphics_6,x:-16.75,y:-0.775}).wait(1).to({graphics:mask_graphics_7,x:-12.8,y:-0.775}).wait(1).to({graphics:mask_graphics_8,x:-8.85,y:-0.775}).wait(1).to({graphics:mask_graphics_9,x:-4.9,y:-0.775}).wait(1).to({graphics:mask_graphics_10,x:-0.925,y:-0.775}).wait(1).to({graphics:mask_graphics_11,x:3.025,y:-0.775}).wait(19).to({graphics:mask_graphics_30,x:3.025,y:-0.775}).wait(1).to({graphics:null,x:0,y:0}).wait(34));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#39B54A").s().p("AiHFKIgKgCIgLgCIgKgEQgLgEgDgDQgOgKgFgFQgMgLgKgPIgKgXQgPghgWgfQgeglgnggIgVgOQgPgJgJgPIgGgPQgFgSAFgRIAGgQQAHgLAKgHQAJgIAOgDQAMgFAOADQAOABAKAHQAbAQAeAaQAnAhAnA0QAMARANAWIAuhKQAmg6AlgvQAvhAAsgwQAsgvAwgrQA3gxBCgwQAPgIASAAIASACQAQAFAMAMIALANQAHAMAAAMQADANgEAOQgDANgIAJQgIALgLAGIgfAYQgeAXgXAUQgxArgtAwQgoAqgmAvIgtA/QgrA+gpBIIgbAsQgKAOgFAFQgQARgaAJQgKAEgMAAIgDAAg");
	this.shape.setTransform(5.4143,4.5025);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(30).to({_off:true},1).wait(34));

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


(lib.b5_btn = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Bitmap31();

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EhqtAGaIAAszMDVbAAAIAAMzg");
	this.shape.setTransform(683,41);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1366,82);


(lib.a5_btn = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Bitmap211();

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EhqtAGaIAAszMDVbAAAIAAMzg");
	this.shape.setTransform(683,41);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1366,82);


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
(lib.听辨 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,lnav2:5,m4:9,lnav3:14,m5:19,"5a":273,"5b":303,播放:5,停止:9};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,5,9,14,19,20,272,274,302,303,333];
	this.streamSoundSymbolsList[20] = [{id:"外婆的澎湖湾范唱",startFrame:20,endFrame:272,loop:1,offset:0}];
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
	this.frame_9 = function() {
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
	this.frame_14 = function() {
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
	this.frame_19 = function() {
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
	this.frame_20 = function() {
		var soundInstance = playSound("外婆的澎湖湾范唱",0);
		this.InsertIntoSoundStreamData(soundInstance,20,272,1);
	}
	this.frame_272 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧标签并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav5');
	}
	this.frame_274 = function() {
		playSound("victory");
	}
	this.frame_302 = function() {
		this.stop();
	}
	this.frame_303 = function() {
		playSound("fail");
	}
	this.frame_333 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(5).call(this.frame_5).wait(4).call(this.frame_9).wait(5).call(this.frame_14).wait(5).call(this.frame_19).wait(1).call(this.frame_20).wait(252).call(this.frame_272).wait(2).call(this.frame_274).wait(28).call(this.frame_302).wait(1).call(this.frame_303).wait(30).call(this.frame_333).wait(1));

	// leftnav_on
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E28726").s().p("AA/CSIgegBIgDgLQgCgGgDgFIAiABIAVABIAJgBQAEgBADgDQADgEAEgNQADgNADgXIAFg7IADhVIi0AAQgMAZgPAVQgOAWgQAPIgIgGIgKgHQARgRAPgWQAPgVAMgaQAMgZAJgbIAVAFIgHAVIgJAVIDAAAIAAACIAAAFIAAAEIgEBfQgCAogDAZQgDAagEAOQgDAOgFAGQgGAHgFACQgHADgKABIgOAAIgKAAgAhNBqIAAiJIB7AAIAABxIhmAAIAAAYgAg4A/IBRAAIAAhKIhRAAg");
	this.shape.setTransform(305.8,442.3833);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28726").s().p("AiJCHIgIgHQAUgSALgVQAMgVAGgWQAFgWACgVIg2AAIAAgSIA3AAIAAgGIAAgHIAAgzIgTAAIgJAbQgFANgGALIgIgGIgJgGQAIgMAFgRQAGgQAEgTIAHgmIAUAEIgEAUIgEATIBKAAIAAAUIgoAAIAAAzIAAAHIAAAGIAtAAIAAASIgvAAIgBANIgCANIALAPIAOASIANASIAJAMIgOASIgKgRIgOgVIgOgTQgGAYgNAXQgNAXgVAUIgGgIgAgeCKIAAgUIBjAAIALgZIALgcIAIgbIAWAFIgKAZIgLAbIgKAXIA4AAIAAAUgAAUBbIgIgXIgKgXIASgFIAKAXIAIAXIAGAVIgTAFIgFgVgAgGAaIAAhiICHAAIAABigAANAGIBgAAIAAg7IhgAAgAgRhsIAAgUICgAAIAAAUg");
	this.shape_1.setTransform(274.475,442.025);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28726").s().p("ABPCBQgQgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQARAJAMAIIgPAPQgLgIgRgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAHgKIhSAAIAAgSIBaAAQADgHAAgIIABgNIAAAAIgxAAIAAgMQgPAOgTAMQgTAMgVAJIgHgJIgIgHQAegMAXgQQAXgRAQgTIhVAAIAAgSIBiAAIAHgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhoAAIAAgRIBrAAIACgOIABgMIAVABIgCAMIgBANIBtAAIAAARIhxAAIgDANIgDAMIBqAAIAAASIhwAAIgGAMIgHANICfAAIAAASIhVAAQAQAUAZAQQAaARAbAIIgHAIQgEAFgCAEQgVgHgTgMQgUgMgQgPIAAANIgyAAIAAABIgBANIgCAOIBgAAIAAASIhmAAQgFAMgMANQgNANgVALQgXAMggAKIgGgIgAA2ALIgNgMQgFgHgFgIIg+AAIgKAPIgNAMIBsAAIAAAAg");
	this.shape_2.setTransform(242.65,442.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28726").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_3.setTransform(210.525,442.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E28726").s().p("ABFCRIgCgKIgGgKIAgAAIASAAQAEAAACgCQACgCAAgEIAAkBIAVAAIAAEAQAAAMgEAFQgDAFgHADQgHACgOABIgWABIgOAAgAhACNQgPAAgIgCQgJgDgEgHQgDgHAAgNIAAiJIByAAIgBADIAAAGIgDAsQgCARgCAJQgDAKgCADQgEAEgEACIgKACIgOAAIgRAAQAAgFgCgFQgBgFgCgEIARABIAKABIAGgBIAEgCIADgJIAEgUIACggIhJAAIAAB2QAAAIAEADQAFADALAAIA7AAQAGAAAEgEQAEgDABgKIADgdIAJAFIAKADQgCAWgDAMQgDANgIAFQgIAEgMAAgAA5BDIAAiuIAUAAIAACugAiDgWIgIgHQAUgPASgTQARgSAOgVQAOgVAIgVIATAGIgCAHIgEAHIAcAdIAaAeIAVAbIgQAOIgSgZIgYgdIgagdQgPAagVAYQgTAYgZASIgHgHg");
	this.shape_4.setTransform(177.55,442.2833);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E28726").s().p("ABsCJIgDgIIAKAAIAGAAIACgBIABgCIAAgxIgZAAIAAA8IgPAAIAAg8IgZAAIAAA9IgOAAIAAg9IgdAAIAABEIgQAAIAAiXIB8AAIARAAIAACFQAAAGgCAEQgBADgEACQgEACgGABIgOABIgCgJgABjA7IAZAAIAAgwIgZAAgAA7A7IAZAAIAAgwIgZAAgAAQA7IAdAAIAAgwIgdAAgAgrCIIgJgGQAOgZAHgfQAHgeACgeQACgcAAgZIAAhFIBKAAIgHgPIgIgQIAUgFIAKASIAIASIA+AAIAABJIiMAAIgBApQgCAXgDAYQgEAXgHAYQgHAWgKAUIgIgGgAgBg1IB4AAIAAglIh4AAgAiLBrIAqgPIAygTIAEARIgwATIgrARgAiGA3IgEgKQAFgBAFgGIAMgPIANgQIARgbIgbAEIgOACIgHACIgCgJIgEgKQAEgBAEgFIAJgOIALgUIAPghQAIgTAGgTIAVAHQgKAbgNAZQgNAbgOAVIAmgEIAKgSIAJgTIARAKQgOAcgQAaQgRAZgRAWIA3gMIABAKIABAIIgrAKIgZAGIgMAEIgGADIgDgJg");
	this.shape_5.setTransform(145.975,442.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E28726").s().p("AgNAPQgFgFgBgJQABgJAFgGQAGgFAHgBQAIABAGAFQAGAGgBAJQABAJgGAFQgGAGgIAAQgHAAgGgGg");
	this.shape_6.setTransform(126.15,452.775);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E28726").s().p("Ag+B1IAAgVIA1AAIAAizIgqAAIAAgRQAPgDAMgEQAMgDAJgGIATAAIAADUIAvAAIAAAVg");
	this.shape_7.setTransform(113.45,442.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E28726").s().p("ABACSIgfgBIgDgLQgCgGgDgFIAhABIAXABIAIgBQAEgBADgDQAEgEADgNQADgNADgXIAFg7IADhVIizAAQgNAZgOAVQgPAWgQAPIgIgGIgKgHQARgRAPgWQAPgVAMgaQAMgZAJgbIAWAFIgIAVIgJAVIDAAAIAAACIAAAFIAAAEIgEBfQgCAogDAZQgCAagEAOQgEAOgFAGQgFAHgHACQgGADgJABIgPAAIgJAAgAhNBqIAAiJIB7AAIAABxIhmAAIAAAYgAg4A/IBRAAIAAhKIhRAAg");
	this.shape_8.setTransform(307.75,506.0333);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E28726").s().p("ABPCBQgQgKgTgJQgTgJgRgHIAPgOIAjAQQATAIARAKQAQAJAMAIIgPAPQgLgIgRgJgAhwCKIgHgIQAbgIAUgJQATgJAMgKQAMgJAHgKIhRAAIAAgSIBZAAQACgHABgIIABgNIAAAAIgxAAIAAgMQgQAOgSAMQgSAMgXAJIgGgJIgHgHQAdgMAXgQQAXgRAQgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhoAAIAAgRIBsAAIABgOIABgMIAVABIgCAMIgCANIBuAAIAAARIhxAAIgDANIgDAMIBqAAIAAASIhwAAIgGAMIgGANICfAAIAAASIhXAAQARAUAaAQQAZARAcAIIgIAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBgAAIAAASIhmAAQgFAMgNANQgMANgWALQgVAMgiAKIgFgIgAA2ALIgMgMQgGgHgFgIIg+AAIgKAPIgNAMIBsAAIAAAAg");
	this.shape_9.setTransform(244.6,506.025);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E28726").s().p("ABwB/IgagWIgbgTIANgMIAbATIAaAUQAMALAIAIIgNAOQgIgJgMgKgAgtCKIgHgIQAZgKARgLQARgLALgNQALgMAGgNIhSAAIAAgTIBZAAQACgJABgKIABgTIAAglIAVAAIAAAlIgBATQgBAKgCAJIBPAAIAAATIhUAAQgGARgMAPQgLAPgUANQgTAPgdALIgGgIgAhpCCIgGgHIAGgGQAEgFACgFQADgGAAgIIAAh1IgwAAIAAgVIBEAAIAACIIAegZIAEAKIAFAIIgmAfIgSAPIgHAIIAAAAIgFgIgAgFAbIgRgMQgIgGgJgEIALgKIARAIIAPALIANAMIgKAMIgMgLgAARgCIgRgLIgQgKIAKgLIAQAKIARAKQAIAGAFAEIgLAMIgMgKgABigJIAIgSIAIgVIibAAIAAgTIBOAAIAAgdIhBAAIAAgTIBBAAIAAgfIAVAAIAAAfIBDAAIAAATIhDAAIAAAdIA/AAIAEgBIAOAFIgMAfQgGAQgGALgAhYhaIgRgRIgSgQIANgOIATAPIARARIAOAPIgOAPIgOgPg");
	this.shape_10.setTransform(180.425,506);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E28726").s().p("AgfCHIgJgGQAPgQANgWQAMgWAGgZIAVAFQgIAbgNAYQgMAYgQARIgJgGgABuBvQgGgPgJgPIgRgeIATgHQAJANAIAQIARAeQAGAPAEALIgVAJQgEgMgGgPgAhoB8IgHgHQADgCAEgFQAEgEADgHQADgHABgIIAAhwIgvAAIAAgVIBCAAIAACGIAkgZIADAJIAEAJIgpAfIgTAPIgHAIIgGgIgAgRAMIAAiKICOAAIAACKgAAEgIIBkAAIAAhiIhkAAgAhXheIgRgRIgTgQIAOgNIASAPIASARQAJAIAFAGIgPAPIgNgPg");
	this.shape_11.setTransform(148.3,506.375);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E28726").s().p("AgNAPQgGgFABgJQgBgJAGgGQAGgFAHgBQAIABAGAFQAFAGABAJQgBAJgFAFQgGAGgIAAQgHAAgGgGg");
	this.shape_12.setTransform(128.1,516.425);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E28726").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_13.setTransform(114.875,506.175);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#E28726").s().p("ABPCBQgQgKgTgJQgTgJgRgHIAPgOIAjAQQATAIARAKQARAJALAIIgPAPQgLgIgRgJgAhwCKIgHgIQAbgIAUgJQATgJAMgKQAMgJAHgKIhRAAIAAgSIBZAAQACgHABgIIABgNIAAAAIgxAAIAAgMQgPAOgTAMQgSAMgXAJIgGgJIgHgHQAdgMAXgQQAWgRARgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhoAAIAAgRIBsAAIABgOIABgMIAVABIgCAMIgCANIBuAAIAAARIhxAAIgDANIgDAMIBqAAIAAASIhwAAIgGAMIgHANICgAAIAAASIhXAAQASAUAYAQQAaARAcAIIgIAIQgEAFgCAEQgVgHgTgMQgUgMgQgPIAAANIgyAAIAAABIgBANIgCAOIBgAAIAAASIhmAAQgFAMgNANQgMANgVALQgWAMgiAKIgFgIgAA2ALIgNgMQgFgHgFgIIg+AAIgKAPIgNAMIBsAAIAAAAg");
	this.shape_14.setTransform(308.6,572.025);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#E28726").s().p("Ah/CQIAAjjIBNAAIAAg8IAVAAIAAA8IA3AAIAAg8IAVAAIAAA8IBRAAIAADiIgVAAIAAgUIjWAAIAAAVgAAvBmIA8AAIAAhJIg8AAgAgdBmIA3AAIAAhJIg3AAgAhrBmIA5AAIAAhJIg5AAgAAvAJIA8AAIAAhHIg8AAgAgdAJIA3AAIAAhHIg3AAgAhrAJIA5AAIAAhHIg5AAg");
	this.shape_15.setTransform(244.525,572.125);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#E28726").s().p("AACCKIgHgHQAWgTANgWQAOgWAHgWQAGgWACgUIACglIAAgVIAUAAIAAAVIAAANIgBAOQAGAfAIAZQAJAYANAUQAOATATAQIgIAIQgEAEgCAFQgXgVgPgZQgPgZgKggQgGAbgPAaQgPAbgbAYIgHgJgAg/CHIgEgIIAVABIALgBIAEgBIACgDIAAhsIh3AAIAAgSIB1AAIAAhsIhxAAIAAgSICbAAIAAASIgXAAIAABsIAeAAIAAASIgcAAIAABsQAAAIgCAEQgCAEgGACQgGACgKAAIgZABIgCgJgAiDB1IAAhRIBOAAIAABDIg8AAIAAAOgAhxBXIAqAAIAAgjIgqAAgABogOQAEgMADgQIAHggIhKAAQgGASgHAQQgHAQgIAMIgJgFIgJgFQAKgPAIgUQAIgUAGgWQAGgXADgYIAVAEIgFAYIgGAYIBLAAIADgBIAOAFIgGAdIgHAcIgHAYgAh/gaIAAhAIBKAAIAABAgAhvgpIAoAAIAAgiIgoAAg");
	this.shape_16.setTransform(212.8,572.025);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#E28726").s().p("ABQCSIAAhRIgqAAIAAgSIAqAAIAAgvIguAAIAAgSIA/AAIAHgUIAGgWIAFgUIASAEIgJAeIgKAcIAfAAIAAASIguAAIAAAvIAqAAIAAASIgqAAIAABRgAiECKQgDgEgFgDQAPgKAIgMQAJgNACgNQAEgOABgNIgnAAIAAgSIAnAAIAAgnIgrAAIAAgSIA9AAIAGgTIAFgWIAEgTIASAEIgIAdIgIAbIAcAAIAAASIgrAAIAAAnIAnAAIAAASIgnAAQgBAPgFARQgDAQgKAPQgJAPgRALIgGgHgAgqCJIgGgHQAYgVANgZQALgZAFgcQADgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgGAWgMAUQgNATgVARIgGgHgAgmAPQAFgMACgQQADgQABgRIACghIAQACQAAAQgBARQgBASgEARQgDAQgEANgAA7glIgFgTIgGgTIAQgCIAHASIAEASIADARIgRADIgCgQgAh4glIgEgTIgFgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAsAAIgIgSIgIgSIASgFIALAVIAJAUIAiAAIAAASgAAlhUIAAgSIAvAAIgHgTIgKgTIARgFIAMAVIAKAWIAjAAIAAASg");
	this.shape_17.setTransform(180.5,571.975);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#E28726").s().p("ABKCRIAAimIhBAAQAAAYgDAeQgEAdgIAdQgIAdgSAYIgJgIIgJgGQARgXAIgcQAJgcACgcQACgbAAgZIAAhTIAqgJIAqgLQAUgGANgGIATARQgQAGgTAFIgoAKIgoAJIAAA3ICBAAIAAAVIgqAAIAACmgAiJBcIAAjQIBVAAIAAC3IhBAAIAAAZgAh1AvIAtAAIAAiPIgtAAg");
	this.shape_18.setTransform(148.9,572.025);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#E28726").s().p("AgfB1QgOgFgKgHQgKgHgIgJIANgQQALALAOAHQAOAIAVABQANAAALgGQALgFAGgKQAHgLAAgOQAAgOgIgLQgHgLgQgGQgQgGgaAAIAAgUQAYAAANgGQAPgGAGgLQAGgKAAgNQAAgSgLgKQgLgLgRAAQgPAAgMAGQgNAHgKAKIgOgRQANgMAQgHQAPgIAUAAQASAAAQAHQAPAGAIANQAIANABATQAAAWgLAOQgMAOgTAHIAAABQAOADALAHQALAIAHAMQAHANAAAQQAAAVgKAPQgJAPgSAIQgQAHgUAAQgSAAgOgEg");
	this.shape_19.setTransform(114.6,572.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3,p:{x:210.525,y:442.275}},{t:this.shape_2},{t:this.shape_1,p:{x:274.475,y:442.025}},{t:this.shape}]}).to({state:[{t:this.shape_13},{t:this.shape_12,p:{y:516.425}},{t:this.shape_11},{t:this.shape_10},{t:this.shape_3,p:{x:212.475,y:505.925}},{t:this.shape_9},{t:this.shape_1,p:{x:276.425,y:505.675}},{t:this.shape_8}]},5).to({state:[{t:this.shape_19},{t:this.shape_12,p:{y:582.425}},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_3,p:{x:276.475,y:571.925}},{t:this.shape_14}]},9).wait(320));

	// leftnav
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

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(153,153,153,0.498)").s().p("AAgBoIAAgxQgJALgNALQgMAKgNAHIgFgFIgGgFQAOgGAMgJQAMgJAIgKIAMAEIAAgrIgWACIgWABIgBgFIgDgGIAjgDIAigDIAbgFIANAKIgWAEIgZADIAAAYIAEAFIADAEIAUgNIARgMIAKAIIgTANIgVAMQAKAKANAHQAMAHAOAFQgDABgCAEIgEAGQgQgGgNgKQgOgKgLgMIAAA0gAhCBoIgNgBIgBgHIgDgGIANABIAJAAIAEgBIADgCQADgCACgJIAEgYIADgpIg3AAIADgYIADgdIACgcIANABIgCAXIgCAXIgCAWIAYAAIAEgbIACgeIADgeIg0AAIAAgOIBCAAIgCAiIgEAkIgDAfIAGAAIALAAIAAACIAAAEQgCAegCATQgCATgDAKQgCAKgEADIgGAFIgIACIgKAAgAhsAxIAagGIAegIIABANIgcAIIgaAHgAgSA0IgFgFIAVgMQAKgHAHgHIANAEQgJAJgLAIQgKAJgLAFIgFgEgAAZgFIAAgOIgaAEIgYADIgDgMIAOgCIAAhBIgLAAIAAgMIBGAAIAAAMIgIAAIAAA7IAIgBIAAALIgIABIAAAQgAgCgbIAbgEIAAgNIgbAAgAgCg2IAbAAIAAgOIgbAAgAgChOIAbAAIAAgNIgbAAgAAxgPIgFgFQAHgFAHgGQAHgHAGgJIgLgNIgLgMIAJgHIAKALIAKALIAHgPQADgHACgIIgmAAIAAgNIApAAIADAAIACAAIAIACQgDAPgFAMQgFANgGALIAMAOIAJAMIgKAJIgIgLIgKgNIgNAPQgHAGgIAFIgDgFg");
	this.shape_20.setTransform(189.925,374.775);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(153,153,153,0.498)").s().p("AhjBlIgFgIQBDgIArgYQAsgZAVgqIAPAHQgXAtguAbQgsAZhFALIgDgIgAgFA5IAAhLIhhAAIAAgQIAlAAIAAg2IAQAAIAAA2IAuAAIAAhJIAPAAIAAAaIBHAAIAAAPIhHAAIAAAgIBdAAIAAAQIheAAIAABLgAhYAyIgGgFQAOgLAMgOQANgOAJgNIAPAEQgKAQgOAQQgNAQgOALIgGgGg");
	this.shape_21.setTransform(166.075,374.25);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(153,153,153,0.498)").s().p("AgBBlIgHgFQAPgPAKgWQAJgVAEgZQAGgZAAgbIgiAAIAAgQIAjAAIABgZIAAgaIAQAAIgBAaIAAAZIA1AAIAAAJIgDA9IgDAqIgDAaQgDAJgDADQgEAFgEACIgJACIgOAAIgTgBIgCgHIgDgIIATABIANAAIAFAAIAEgDQADgEADgNIAEgoIADhEIgmAAQgCAdgEAbQgFAbgKAXQgKAXgSARIgEgGgAhjBGIgDgIQACgBADgEIAGgLIAFgPIAHgXIAIgaIgiAAIAAgPIBpAAIAAAPIg3AAQgFASgGAUIgOAkIA8gMIgHgUIgIgTIAOgDIAJAXIAJAYIAFAUIgNAFIgCgIIgDgJIgoAJIgYAFIgLAEIgGACIgCgHgAhghMIAAgOIBbAAIAAAOg");
	this.shape_22.setTransform(142.25,374.525);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(153,153,153,0.498)").s().p("AhqBiIAAgQICJAAIAEgTIACgVIhsAAIAHgbIAGgfIAGgiIAGgfIg0AAIAAgPIDGAAIAAAPIiBAAIgEATIgDAVIBVAAIADgBIAMABIgDAbIgEAgIgEAgIgFAgIA7AAIAAAQgAgsABIgGAaIBZAAIAEgcIADgZIhWAAIgEAbg");
	this.shape_23.setTransform(118.3,374.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#333333").s().p("AknEoQAeggAPglQAPglAGgmQAFgnAAglIhGAAIgFgRIBLAAIAAgCIAAhWIhPAAIgEgSICAAAIAIgrQADgXADgXIADgrIBhAZIAJAAQAaA3ADAqQADAqgMAWQgGALgLAFQgKAEgKgCQgLgBgHgJQgIgLACgLQACgMAIgKIg8AAIAABWIAAACIACAAIAjg2IALAKIAYAZQAPAOAKAMQAAAFgFADQgEACgHAAIhRAAQgBAmgLApQgLApgeAnQgeAmg7AdgAhJiQQgGADgKAAQgNAVgUAZQgSAZgYAXIAWAAIAigyIALALIAaAZQAGgUACgYQACgYgFgYQgBAFgGAEgACBEtIAAjYIg7AAIgFgSIBAAAIAAhgIg/AAQgBBFgTA+QgUA+guAxQguAxhTAfIgFgFQA5gqAggzQAegzANg7QAMg8AAhBIAAj/IBkAJQgCAHgEAFQgFAFgNABIAABCIBaAAQgHgCgGgDQgHgEgHgFQACgXgGgWQgHgWgKgPIAGgDQAtAHAWAOQAWAPAEAQQADARgJANQgKANgQAEIAeAAIAigyIALAKIAZAXQAPAMAMAMQgCAGgEACQgFADgGAAIjbAAIAACJIBsAAQAGgUAFgYIAHgvIAFgsIBeAXQgBAGgFAEQgGAEgKAAQgOAXgVAaQgUAagYAXIAWAAIAigxIAMAKIAYAWIAaAZQgCAFgEADQgFACgGAAIhPAAIAABZIAeguIAKALIAaAXIAaAaQgCAGgFACQgEADgGAAIhLAAIAADFQgBADgHAEQgJAEgPAEQgOADgVABgAj9hBQACgdgGgeQgFgegIgYIAGgCQAoAUASAWQASAWAAAUQACAUgLAMQgKANgQABIgBAAQgPAAgOgPgABihCQADgcgGgdQgFgcgJgXIAHgDQAqATATAVQASAWABATQABAUgLAMQgLANgQABIgCAAQgPAAgQgQgAkqi4IgGgSIBsAAQgHgCgFgDQgHgDgGgGQABgWgGgWQgGgWgLgQIAGgDQArAIAWAOQAUAPADAQQAEARgJAMQgJANgQAEIAjAAIAlgyIAKAKIAaAXIAcAYQgBAGgFACQgEADgIAAg");
	this.shape_24.setTransform(229.1,294.725);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#333333").s().p("AB4ExIAAljIhEAAIAAACQABAvgGAvQgHAwgVAvQgVAvgsAoQgtAphLAeIgEgEQArglAbgpQAbgoANgrQAOgsAEguQAFgtAAguIAAjUIBbAgQAmgUAigUQAigVAXgQIBgBYQgHAFgMABQgMgBgRgFQgjAGgvAGQgvAGgyAEIAAB+IB4AAIAtg9IAOAMIAgAbIAiAeQgBAFgFADQgFACgHAAIhAAAIAAFOQAAACgJAFQgKAFgRAEQgRAFgYAAgAkoC2IAAm0IBYAkIAiAAIAngsIBQA+QgDAEgGAEQgHADgJACIAAEtQgCACgLAGQgMAFgRAFQgQAEgPAAIgPAAIAAhEIgqAAIAABVQAAAEgKAHQgKAHgRAGQgQAFgTAAgAjSAyIAqAAIAAj6IgqAAg");
	this.shape_25.setTransform(134.675,294.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#CCCCCC").ss(1,1,1).p("AzdAAMAm7AAA");
	this.shape_26.setTransform(228.875,350.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.lnav1_btn},{t:this.lnav2_btn},{t:this.lnav3_btn}]}).wait(334));

	// 正确失败动画
	this.instance = new lib.错("synched",0);
	this.instance.setTransform(533.5,475.7);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#CC3300").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape_27.setTransform(495.825,492.975);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#CC3300").s().p("AAMCtIAAgQIAogFIgchZIhoAAIgZBYIArAGIAAAQIhpAAIAAgQIAmgGIBnlDIAwAAIBtFEIAlAFIAAAQgAAUAwIgyidIgtCdIBfAAg");
	this.shape_28.setTransform(470.6,479.15);

	this.instance_1 = new lib.对("synched",0);
	this.instance_1.setTransform(535.1,633.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#39B54A").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape_29.setTransform(493.525,631.975);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#39B54A").s().p("AiWCsIAAgQIApgEIABhJIAAhLIAAgPIAAhHIgBhGIgpgDIAAgQIChAAQAsAAAaALQAaAKAMASQAMASAAAYQAAARgJAQQgJAPgVANQgVAMglAGQA+AHAcAVQAbAXAAAkQAAAXgNAWQgOAWgiAOQgiAOg9ABgAggBPIACBMIAXAAQAlAAAUgUQAVgUAAgmQAAgngUgTQgUgTgpAAIgWAAIAABPgAgghVIAABGIASAAQAjgBARgTQASgSAAgjQAAgfgPgRQgQgRgiAAIgVAAIgCBEg");
	this.shape_30.setTransform(470.0009,618.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_28},{t:this.shape_27},{t:this.instance}]},273).to({state:[{t:this.shape_30},{t:this.shape_29},{t:this.instance_1}]},30).wait(31));

	// 选项
	this.b5_btn = new lib.b5_btn();
	this.b5_btn.name = "b5_btn";
	this.b5_btn.setTransform(1134,630,1,1,0,0,0,683,41);
	new cjs.ButtonHelper(this.b5_btn, 0, 1, 2, false, new lib.b5_btn(), 3);

	this.a5_btn = new lib.a5_btn();
	this.a5_btn.name = "a5_btn";
	this.a5_btn.setTransform(1134,491,1,1,0,0,0,683,41);
	new cjs.ButtonHelper(this.a5_btn, 0, 1, 2, false, new lib.a5_btn(), 3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#333333").s().p("AglBAQgQgKgKgRQgKgRAAgUQAAgUAKgQQAKgRAQgKQARgKAUAAQAVAAAQAKQASAKAJARQAKAQAAAUQAAAUgKARQgJARgSAKQgQAKgVAAQgUAAgRgKgAgmglQgPAPgBAWQABAWAPAQQAQAQAWAAQAXAAAQgQQAPgQAAgWQAAgWgPgPQgQgQgXgBQgWABgQAQg");
	this.shape_31.setTransform(1787.2,318.65);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#333333").s().p("Ah+DxQA1gTAhgWQAigXARgbQATgcAHgiQAIgiACgqQABgqAAg0IBcASQgBAGgFADQgFADgJABQgCAygEAqQgEAqgMAiQA4AGAgARQAhASALAUQAMAVgFATQgFARgQAIQgRAIgXgLQgPgcgYgcQgXgbgYgXQgOAbgaAXQgaAVgpAQQgqARg/ALgAj6BWIAcgBIAlgDIAAj2Ig8AAIgEgOIB6AAIAggrIAKAIIAXATIAYAWQgBAEgDACQgEACgGAAIg3AAIAADsIAcgEIAbgEIABAEQgYASglAZQglAZg2AeQgCAFgFAEQgDADgHABgAgyCBIAAkTIBKAdIASAAIAAghIAAgmIhdAAIgFgOIDPAAIAjguIAMAJIAaAUIAbAXQgBAEgEACQgEACgGAAIhtAAQgQATgSATQgSATgRAOIBOAAIAfgiIBAAxIgGAFIgLAEIAADGQgBACgKAFIgXAIQgOADgNAAIgNAAIAAjhIh2AAIAADPQgBAFgIAEQgJAGgNAEQgOAFgQAAg");
	this.shape_32.setTransform(1752.05,301.95);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#333333").s().p("AjzCpIAegOIAegPIAAi0Ig8AAIgDgPIA2AAIAigsIBEA4QgDAEgHADQgGACgLADIAACoIAGAEIAGADQAhgWARgcQASgcAHggQAIggAAglIgzAAIgEgOIBsAAIAAhPIgwAAQgNAWgQATQgPASgSAPIgHgEQAIgXAHgbQAHgcAFgeQAEgeADgfIBTAUIAAghIBaAHQgBAGgEAEQgEADgKACIAABLIAdAAIAjgvIAKAJIAaAVIAaAYQgBAEgFACQgEACgFAAIhvAAIAABPIArAAIAjgxIAMAJIAZAWIAaAYQAAAEgFADQgDABgGAAIhcAAIAAAGIAABkQAAAFACACQABABAGAAIAQAAIAOAAQAEAAACgBQACgBACgEQAEgGAFgQIAOgoIAGAAIACBCQAKAEAEAHQADAHAAAKQAAASgSALQgSAKgtAAIgeAAQgXAAgMgEQgLgGgEgLQgDgNAAgUIAAh9IgUAAQgDAsgQAjQgQAkgeAaQggAagwARQAcALAsAGQAsAFBBgBIBQgBIBRgDIAAAFQgWAGgLARQgMARgCAWIiKAAQg3AAgigJQgkgIgYgSQgZgSgTgcQgHgIgEAAQgFABgFAIIgRAiIgXAqQACAEgCACQgCAEgDACgAAXjEIgKACIgKAaIgMAZIAoAAIAAg5QgDADgFABgAixh4QgHgegOgeQgNgegRgXIAEgCQA0AKAaASQAbAUAHAVQAGAUgHAQQgJAQgRAEIgIABQgOAAgQgLg");
	this.shape_33.setTransform(1700.1,302.1);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#333333").s().p("ABYDWQgDgMgHgJQgHgIgOgHQgPgHgUgEIABgGIAbACIAbACIATABQAHAAAEgCQAFgCAEgEQANgMAGhIQAFhIACiEIhQAAQgUAigYAcQgXAbgbAVIgDgCIAADRQgBADgJAEQgJAFgOAEQgNAEgNAAIgLAAIAAgpIhAAAIAAAkQgBAEgHAFQgIAGgNAEQgNAFgPAAIgLAAIAAmNIBCAbIACggIACgjIACghIBkAYQgCAIgFACQgGADgJAAIgcAgIgeAhIAiAAIAhgkIBAAyQgDAEgFADQgFADgIACIAABWQAMgbAMgkQALgjAJgnQAKgnAGgnIBgAcQgBAGgFACQgFADgKABIgNAfIgQAeIBBAAIAngnIA/A3QgDAFgGACQgFADgKABQgBBSgCA5QgCA6gFAoQgEAmgHAYQgIAXgLAMQgPAPgUAHQgTAGgdABQAAgTgDgNgAipCXIBAAAIAAiIIhAAAgAipABIBAAAIAAiBIhAAAgAAfBGQgBgcgJgdQgKgbgNgWIADgDQAxANAYATQAXASAEAVQAEAUgJAPQgKAOgRADIgFAAQgPAAgSgOg");
	this.shape_34.setTransform(1648.925,301.95);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#333333").s().p("ACdDfIgCgRQgCgJgFgHQgFgGgLgDIAAgGIAIAAIAMAAIAFgBQABAAAAgBQABAAAAgBQAAAAAAgBQAAgBAAAAIAAhGIgeAAIAABuQgBACgGAEQgGAEgMADQgLAEgQAAIgKAAIAAh/IgfAAQgDAcgKAaQgKAagVAYQgWAXglAUIgEgEQAVgbAKggQAKggACgjQADgjAAglIAAh/IgRALIgRAKIgHgEQAPgWANgdQAMgdAKghQAKghAEgjIBfAdQgCAFgFADQgFADgJAAIgFANIgIAMIAoAAIAjgkIA+A1QgDADgFACQgFABgIABIgjAdQgVAPgWALIA/AAIAagiIBAAyQgDADgFADIgLAFIAAD/QAAAWgHAPQgGAOgQAHQgQAIgdABIAAgYgACBBWIAeAAIAAhTIgeAAgAAnAtIAAAVIgBAUIAdAAIAAhTIgcAAgACBgLIAeAAIAAhMIgeAAgAAngLIAcAAIAAhMIgcAAgAAgiLQgKANgLALIAnANIAhAAIAKggIAJghIgzAAQgIAPgLANgAjMDdIAAifQgTAXgVAWIgFgEQASgnANguQAOgtAJgzQAJgxAFgwIg+AAIgEgPICHAAIAigrIALAIIAZAUIAaAVQgBAFgEACQgEACgFAAIhLAAQgGAjgKAgQgJAggNAeIAIAEIAQAAIAeghIA8AuQgCAEgFADQgFACgIACIAADAQAAACgJAEQgJAEgMADQgMADgMABIgKAAIAAgjIgcAAIAAAvQgBACgGAEQgGAFgMADQgKAEgRAAgAiNCNIAcAAIAAipIgcAAg");
	this.shape_35.setTransform(1595.7,301.825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#333333").s().p("AjxDoIgFgPIBJAAIAAkTIBkAIQgBAGgEADQgEAFgKACIAAD7IA/AAIAAl7Ii3AAIgEgPIFDAAIArg2IANAKIAeAYIAgAaQgBAEgEADQgEACgGAAIieAAIAACoIArAAIApg0IANAKIAdAXIAfAYQgBAFgEACQgEACgGAAIiOAAIAADFIBKAAIArg3IAOAKIAfAZIAhAaQgBAEgFACQgEADgGAAg");
	this.shape_36.setTransform(1543.675,300.55);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#333333").s().p("AjHDUQgDgNgFgKQgFgKgJgFQgIgHgRgEIAAgGIAHAAIAPABIASAAIANABQAFAAACgCQACgCAAgEIAAhjIgWAOQgCAGgEAEQgEAFgFACIgehTIAcgGIAngMIAAhYIg4AAIgEgPIA8AAIAAh9IBcAIQAAAGgFAEQgEAEgJACIAABlIABAAIAegvIAJAJIAWAVIAWAXQAAAEgFACQgDACgGABIhGAAIAABEIAngMIAngNIACAFIgjAbIgtAiIAACbQAAAagGATQgGATgTAKQgSALgmAEIgCgjgAAkD2IAAhrIh3AAIgFgOIB8AAIAAg9IhfAAIgEgPIBjAAIAAhBIBbAJQAAAEgDADQgEADgKABIAAAtIAVAAIAigqIALAIIAZATIAaAWQgBADgEACQgEACgGABIhmAAIAAA9IAkAAIAlguIAMAJIAaAVIAdAWQgBAFgEACQgEACgGgBIh9AAIAABcQAAACgJAEQgJAEgNACQgOACgPABgAheAFQApgOAkgWQAigVAcgaQgTgVgPgcQgOgcgKglIg0AAIgFgPIDHAAIAmgkIA9A2QgDAEgFACIgOADQgOAZgSAXQgRAWgWATQAbAIAdAEQAeAEAfACIAAAHQgVAHgOARQgOAQgFAaQgjgIgdgNQgegMgZgQQgkAVgqAQQgqAOgxAKgAAfiRQAVAUAbANQAQgSANgVQAMgUAKgVIiFAAQANAbAVAUg");
	this.shape_37.setTransform(1491.7,301.95);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#333333").s().p("AjzCpIAegOIAegPIAAi0Ig8AAIgDgPIA2AAIAigsIBEA4QgDAEgHADQgGACgLADIAACoIAGAEIAGADQAhgWARgcQASgcAHggQAIggAAglIgzAAIgEgOIBsAAIAAhPIgwAAQgOAWgPATQgPASgSAPIgHgEQAIgXAHgbQAHgcAFgeQAFgeACgfIBTAUIAAghIBaAHQgBAGgEAEQgEADgKACIAABLIAcAAIAkgvIAKAJIAaAVIAaAYQgBAEgFACQgEACgFAAIhvAAIAABPIArAAIAjgxIAMAJIAZAWIAbAYQgBAEgFADQgEABgFAAIhcAAIAAAGIAABkQgBAFACACQACABAGAAIARAAIANAAQAEAAACgBQACgBACgEQAEgGAFgQIAOgoIAGAAIACBCQAKAEAEAHQADAHAAAKQAAASgSALQgSAKgsAAIgfAAQgXAAgMgEQgLgGgEgLQgDgNAAgUIAAh9IgUAAQgEAsgPAjQgQAkgeAaQggAagwARQAcALAsAGQAsAFBBgBIBQgBIBRgDIAAAFQgWAGgLARQgMARgCAWIiKAAQg2AAgjgJQgkgIgYgSQgZgSgTgcQgHgIgEAAQgFABgEAIIgSAiIgXAqQABAEgBACQgCAEgCACgAAXjEIgKACIgKAaIgMAZIAoAAIAAg5QgDADgFABgAixh4QgGgegOgeQgPgegQgXIAEgCQA0AKAaASQAbAUAHAVQAGAUgHAQQgJAQgRAEIgIABQgOAAgQgLg");
	this.shape_38.setTransform(1440.1,302.1);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#333333").s().p("AgyBVQAfgQAPgVQAOgVADgTQgMgEgOgGQgPgHgMgMQgKgMAAgUQgBgTAOgOQAOgOAWgBQAOAAALAHQAMAHAIANQAHAOAAATQAAAbgJAbQgJAbgVAYQgUAXgiAPg");
	this.shape_39.setTransform(1368.9,323.725);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#333333").s().p("AhlDwQAzgSAogbQAmgbAcgiQgOgZgLgeQgLgfgHgnIgcAAIgFgNICLAAIAngmQgWAAgLgFQgKgGgCgLQgDgMAAgVIAAhdIgqAAIAAAbQAAAQgDAUQgDATgLAUQgLAVgUATQgUASgiAOIgDgEQARgWAIgZQAIgZACgYQACgYAAgXIAAhEIBOAbIAbAAIAggkIA8AwQgCACgFACIgLADIAABJIABAFQAAABABAAQAAAAABABQAAAAABAAQABAAABAAIADAAIAGAAIAGAAIAHgBIAGgBIAGgBIAFAAIADABQALAGAEAGQAEAFAAAJQAAAUgRAJQgRAKgiAAIgUAAIA/A3QgDAEgEACIgPADQgMAfgRAcQgRAcgVAYQAbAOAfAKQAfAKAgAGIAAAHQgXAFgQARQgQARgIAbQgggOgZgSQgagSgVgXQgkAagtASQguATg6ALgAAvA8QAPAWAUARQANgUALgXQAKgXAGgYIhkAAQAJAcAQAXgAjBD1IAAhWIgHACQgBAGgFADQgDAEgFACIgmhPIAZgFIAigFIAAksIA/AeQANgPANgQIAYgfIBNA8QgDADgEABQgFABgJgCQgWAGgaAGIg0AKIAABHIANAAIAggsIAKAIIAXAUIAZAXQgBAEgEACQgEACgGAAIhYAAIAABKIAPAAIAhgtIAKAJIAXATIAZAWQgBAFgDABQgEADgFAAIhdAAIAAA6IA5gLIA5gMIABAEQgTAOgcARIhEAmIAABmQAAADgHAFQgFAFgOAEQgNAEgVAAg");
	this.shape_40.setTransform(1335.75,302.1);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#333333").s().p("Aj2DyQAjgmATgvQASgvAHg0QAGgzAAg1IAAi9IBdAJQAAAFgFAEQgEAEgKACIAAB1IBeAAIAAiYIBjAIQAAAFgEAEQgFAEgLADIAACAIA0AAIAng2IAMAKIAcAYIAeAaQgBAEgFACQgEACgFAAIk/AAIAAAiQAAAdgDAcIB6AAIAigkIBGAzQgDAEgFACQgFAEgIACIAAC9QgBACgKAEQgLAEgPAEQgPAEgNAAIgNAAIAAjcIiBAAQgGAugRApQgQArgfAhQgfAigxAZg");
	this.shape_41.setTransform(1283.575,301.95);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#333333").s().p("AgpDvICIjvIiIjuIAPgJICOD3IiOD4gAhzDvICIjvIiIjuIAPgJICOD3IiOD4g");
	this.shape_42.setTransform(1218.625,301.95);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#333333").s().p("ABqDgQgCgMgIgHQgGgIgOgFQgOgGgRgEIAAgFIAbACIAbABIASABIAKgBIAHgCQAGgEAFgMQAGgMAEgSIipAAIgXAbIg/gkIAIgHIALgGIAJgfIAKghIAGgcIBNAlIB2AAIAAgxIjVAAIgEgNIDVAAIAeghIBAAuQgCADgEADIgNAEIAAA6QAAACgKADIgXAHQgNACgMABIgNAAIAAgUIiIAAIgHAYIgJAYIClAAIAjgfIA8AxQgCADgFADQgFACgHABQgIAjgLAYQgNAXgTAKQgNAHgQADQgRADgXAAQAAgNgCgMgAjEDzQgJgGgFgQQAGgcABgYQABgZgCgRQgDgRgGgFQgGgDgHgDIgPgDIAAgJIAXAAQAHAAADgBQADgCAEgIIAHgLIAJgSIARgjIAdg/IAvhnIAIACIgQA3IgRA+IgQA2IgJAlIgGAbQgBANgBALQABAPAHAMQAFANAGAPQAGAQAAAXQgBAWgPANQgNAMgWABIgBAAQgKAAgJgGgAgPgSIAAhgIgEAAQgPAWgWAXQgVAXgbATIgFgGQAKgTAHgWQAJgWAFgWIAJgnIA2AcIAAgmIhYAAIgEgPICaAAIgFgCIgEgCQgDgRgIgQQgJgPgJgLIADgDQAmgCAUAIQAUAHAGAMQAGAMgGAMQgEALgNAGIBLAAIAigwIALAKIAZAVIAZAXQgBAFgDACQgEACgGAAIhgAAIAACEQAAACgOAFQgOAFgaAAIgLAAIAAiQIgYAAIAACJQAAACgOAFQgOAFgZAAgAjagnQgCgWgIgVQgJgWgMgQIAEgCQAsAFAVAPQAVAOADAQQAFAQgJANQgIAMgRADIgFAAQgNAAgPgLgAC0g5QgCgYgMgYQgLgZgPgRIAFgDQAqAIAVAPQAWAQAEARQAEARgGANQgIANgOADIgFABQgMAAgNgKgAiuiYQgGgXgMgVQgNgWgNgRIAEgCQAvACAYANQAXANAGARQAGAQgIAOQgHANgQAFIgIABQgNAAgOgJg");
	this.shape_43.setTransform(1179.65,301.8289);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#333333").s().p("AgBDxQARgRANgTQANgSAJgVQgGADgOAEQgOADgQAAIgKAAIAAgeIgnAAIAAA5QAAADgIAFQgIAFgMAEQgNAEgOAAIgJAAIAAj3IA1AVIAAhiIg2AAIgOA9IgMA2IgIAjIgEAcIgBAYQABAPAGAMQAGANAFAQQAFAQAAAYQgBAVgNANQgNAMgVAAQgKABgJgGQgJgGgFgQQAGgcABgZQABgZgCgRQgDgRgGgFQgFgEgHgCQgHgCgIgBIAAgJIAXAAQAFAAADgCQADgBAEgIIAGgMIAIgRIAPgkIAZhAIAphpIAIACIgFAWIgGAYIAzAAIAAiBIBSAHQAAAFgFAEQgEAEgKACIAABjIAZgsIAIAIIARASIAUAXIAAhxIBGAZIARAAIAdggIA8AuQgCADgFADQgEACgHACIAAFdQAAAXgFAPQgGAQgQAJQgRAJgiADIgDgbQgCgMgFgHQgEgIgIgFQgIgFgPgDIAAgHIAKAAIAVACIARAAQAFAAACgCQACgDAAgFIAAhtIghAAQgCAmgMAkQgLAjgcAfQgbAegyAYgABHAUIgIAFQgFADgGABIAACFQAOgjAEgpQAEgpAAgtIAAhlIgDABIgDAAIhAAAIAABjIAVgYgAgwCEIAnAAIAAhzIgnAAgACHAAIAAASIgBASIAgAAIAAhrIgfAAgACHhWIAfAAIAAhpIgfAAgAjbgtQgBgXgJgWQgIgWgMgQIAEgCQArAGAVAPQAUAOAEARQAEAQgJAMQgIAMgQADIgFAAQgNAAgPgKgAi0iaQgDgXgLgXQgKgXgLgSIAEgCQAtAHAWAPQAWAPAFAQQAEARgIANQgJANgQADIgGABQgNAAgPgLg");
	this.shape_44.setTransform(1127.425,302.075);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#333333").s().p("AjIDvQgJgGgEgPQAGgcABgZQABgagCgRQgDgRgGgFQgFgEgHgCIgOgDIAAgJIAWAAQAFAAADgBQADgCAEgIIAFgLIAHgRIAMgiIAWg9IAkhkIAJACIgLA1IgMA8IgJA1IgHAjIgDAbIgBAXQABAPAGANQAGANAFAQQAFAQAAAZQgBAVgNAMQgMANgVAAIgCAAQgIAAgJgGgAgMDsQA7gfAsgxQAsgxAghJIBXArQgDAEgFACQgFACgJgBQggArglAfQglAfgrAUQgrAVgyANgAiDCmIAxgIIBGgMIAIgfIAFghIAGgeIAAgTIg1AAIAAALQAAADgMAFQgLAEgVACQAiALAOAPQAPAOAAAOQAAAOgKAKQgJAJgOgBQgPAAgOgNQADgTgEgUQgDgTgHgPIABAAIgKAAIAAiRIBEAbIAuAAIAbgeIiPAAIgFgPIA+AAIAAg4IhEAAIgFgOIBJAAIAAhFIBTAGQgBAGgDADQgEAEgJABIAAAxIAFAAIAhguIALAJIAXAUQAOAMALALQgBAEgEACQgEACgFAAIhTAAIAAA4IABAAIAdgpIAKAIIAVATIAWAUQgBAFgDACQgEACgFAAIgqAAIA0AmQgCAEgFACQgEADgIABIAABSQgBADgOAEQgOAFgZABIgJAAIBOAYQgCAFgFACQgFADgIAAIgbAaIgfAdIArgIIAtgIIABAFQgcARgsAXQgrAXhAAeQgCAGgEADQgEAEgEABgAguASIA1AAIAAhAIg1AAgABJAuQAdgdAWgnQAWgoARguIBUAxQgCAEgFABQgEABgJgBQgeAjgnAaQgnAbgqATgAjlgjQgBgXgHgVQgHgWgJgRIAEgCQAsAIAUAQQAUAPADARQACAQgJAMQgKAMgQACIgDAAQgPAAgQgNgABThQQAZggAUgpQAVgqAQgtIBRAwQgDAEgEABQgFACgIgBQgcAhglAdQglAdglAWgAjGidQgBgXgGgWQgHgWgIgSIAEgCQAtAJAVAQQAUAQADARQACARgLAMQgKANgRABIgDAAQgQAAgQgOg");
	this.shape_45.setTransform(1075.875,302.2018);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#333333").s().p("ABYDWQgDgMgHgJQgHgIgOgHQgPgHgUgEIABgGIAbACIAbACIATABQAHAAAEgCQAFgCAEgEQANgMAGhIQAFhIACiEIhQAAQgUAigYAcQgXAbgbAVIgDgCIAADRQgBADgJAEQgJAFgOAEQgNAEgNAAIgLAAIAAgpIhAAAIAAAkQgBAEgHAFQgIAGgNAEQgNAFgPAAIgLAAIAAmNIBCAbIACggIACgjIACghIBkAYQgCAIgFACQgGADgJAAIgcAgIgeAhIAiAAIAhgkIBAAyQgDAEgFADQgFADgIACIAABWQAMgbAMgkQALgjAJgnQAKgnAGgnIBgAcQgBAGgFACQgFADgKABIgNAfIgQAeIBBAAIAngnIA/A3QgDAFgGACQgFADgKABQgBBSgCA5QgCA6gFAoQgEAmgHAYQgIAXgLAMQgPAPgUAHQgTAGgdABQAAgTgDgNgAipCXIBAAAIAAiIIhAAAgAipABIBAAAIAAiBIhAAAgAAfBGQgBgcgJgdQgKgbgNgWIADgDQAxANAYATQAXASAEAVQAEAUgJAPQgKAOgRADIgFAAQgPAAgSgOg");
	this.shape_46.setTransform(1024.925,301.95);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#333333").s().p("Aj0DxQBDgLA0gOQA0gOAlgUQgfgGghgGQgigGgkgEQAMgNAQgRIAgglIiFAAIgFgOICWAAIAXgfIARgXIBgAgQgBAFgHADQgFADgPgBIgLAMICWAAIAjgsIAMAIIAZAUIAcAVQgBAFgEACQgEACgGAAIhfAAQgJASgLAQQgLAPgMANQA1AJAZANQAZANAEAOQAEANgKALQgKALgSAFQgSAEgTgGQgSgKgagLQgZgLgggJQgrAUhDALQhDALhgAEgAgpB4IgcAaIAsAAIAlABQANgLAKgNQAJgOAIgQIhDAAIgaAbgAiNAzQAZgbAMgeQAMgfAEgeQADgfAAgbIAAhYIBQAhIAmAAIAAhDIBYAHQAAAFgEAEQgEAEgLACIAAAtIAsAAIAhgiIA5A2QgCAEgFACIgMACIgZAMIgdAMIAjAeQgDAEgEACQgFACgIABQgKANgMAMQgLALgOAKQAcAFAdAEQAeACAdABIAAAGQgTAHgMAQQgLAPgFAYQgkgIgggLQghgLgbgQQg5AXhOALIgCgHQAegKAbgMQAagNAWgQQgPgNgNgRQgMgQgJgUIgHAAQgDAagKAdQgLAcgaAaQgaAZguAUgAAihMQARAKAUAHIASgUQAIgKAGgKIhkAAQAOANARAKgABmhyIADAAIAkghIAHAHIACgNIABgNIgxAAgAgPh9IAAAGIAAAFIAwAAIAAg0IgwAAgAjCAxQgHgGgCgJQAEgegCgTQgBgTgJgEIgLgFIgNgCIAAgKIAaAAQAHAAADgBQAEgCAFgFIAJgJIAMgOIAYgbIAsgxIAIACIgSAgIgTAjIgNAXIgHARQgDAIAAAIQABAIAEAJQAFAHAEALQAEAJAAAPQgBAPgLAIQgKAJgVABQgJgBgHgFgAjNhoQgCgSgJgSQgIgQgJgNIAEgCQAmADASAKQATALADANQAEANgIALQgHALgNACIgGABQgLAAgNgIgAiditQgGgTgMgTQgNgSgMgNIAEgDQAqgBAWAKQAXAJAGAOQAGAPgHAMQgGANgOAEQgFACgFAAQgLAAgMgGg");
	this.shape_47.setTransform(971.875,301.9);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#333333").s().p("Aj7DyQA8gkAngyQAogzAWg9QgKADgMgCQgMgDgMgKQAAgTgFgSQgEgTgJgRQgSAagXAWQgWAWgZASIgGgDQAWglASguQASguAMg1QAMg1AFg4IBmAWQgCAGgFADQgFADgJAAIgJAhIgKAfIAqAAIAngpIBCA8QgCAFgFACQgFACgKABQgHA8gQA3QgPA2geAxQgeAwgyAmQgyAmhLAagAh6hgQgIASgLARQAdAHARAKQARALAIANQAHgcAEgdQAFgcADgeIg2AAQgIAUgJATgAA0D3IAAnsIBgAJQgBAGgEADQgEAEgLACIAACKQA3ANAdAUQAdAVAHAXQAIAVgIASQgIARgSAFQgSAFgXgPQgIgdgOgaQgOgcgRgZIAAEhQAAADgJAFQgJAFgOAEQgOAEgPAAg");
	this.shape_48.setTransform(920.0065,301.975);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#333333").s().p("AgpAAICOj3IAPAJIiIDuICIDvIgPAJgAhzAAICOj3IAPAJIiIDuICIDvIgPAJg");
	this.shape_49.setTransform(880.775,301.95);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#333333").s().p("AjbDxQA5gSAigTQAigVARgXQARgWAGgaIh4AAIgEgPIB/AAQADgNABgPIABgeIg7AAIgCgJQgbAXgiAUQgjATgqAQIgEgEQAsgeAggjQAggjAVglIh3AAIgEgOICEAAIAMgaIAKgaIhqAAIgEgOIB0AAIAHgYIAHgXIiOAAIgFgOICWAAIAHglIAFgkIBmATQgBAGgFAEQgFADgJAAIgFAVIgFAUIBhAAIAmguIALAJIAbAUIAdAXQgBAEgEACQgEACgGAAIjAAAIgHAYIgIAXIBvAAIAigqIALAJIAYASIAbAVQgBAEgEADQgEABgGAAIjHAAIgNAaIgPAaICyAAIAmgwIAMAJIAcAVIAdAYQgBAEgEACQgEACgFAAIiVAAQATAVAbAMQAbAMAfAFQAfAGAeACIgBAIQgWAOgMARQgNARgCAWQgsgUgggjQghgkgVgtIh1AAQgMAPgNAPQgNANgPAOIBxAAIAfgmIALAIIAXAQIAZAVQgCADgDACQgEADgGAAIg2AAIgDAeIgFAcIAuAAIAigtIALAJIAZAUIAbAXQgBADgEACQgEADgFAAIiFAAIgDAKIgFAJQBJAHAqAPQApAOARARQARAPgCAPQgBAPgNAJQgNAJgRAAQgSAAgQgNQgPgUgdgYQgdgYgrgXQgNAYgbATQgbATgsAQQgtAPhDANg");
	this.shape_50.setTransform(815.875,301.75);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#333333").s().p("AiwDeQgCgLgGgGQgGgHgMgGQgLgFgQgEIABgGIAWACIAWABIAQAAIAJgBIAHgDQAJgIAGgjQAGgjAEg/IgnAAIgUAZIg5geIAIgHIAIgGQADgSACgYIADgwIACgpIBGAgIARAAIAAhhIhmAAIgEgOIBkAAIAegiIBAAwQgDAEgFADQgGADgJACIAABvQgBACgIADQgJADgNADQgMADgLAAIgLAAIAAgZIgfAAIgCAdIgCAfIgDAcIAkAAIAigfIA5AvQgCAEgGACQgFACgIABQgDA4gFAlQgFAlgJAWQgJAVgNAKQgNAKgQAEQgRAFgWAAQAAgOgCgMgAA3D3IAAhzIhzAAIgEgPIB3AAIAAg9IgfAAIAAAMQgBAEgNAFQgNAGgZAAIgLAAIAAj0IBEAaIBRAAQAIgWAJgeIARg8IBUAhQgCAFgFACQgFADgJgBQgSAUgUASQgVASgUAOIAVAAIAfgjIA6AtQgCADgFADIgNADIAACtQAAADgPAFQgPAGgaAAIgLAAIAAgPIgfAAIAAA9IAeAAIAigvIAKAJIAZAVIAZAXQgBAFgEACQgEACgGAAIhtAAIAABiQAAADgGADQgGAEgMAEQgMADgRAAgAB4ApIAfAAIAAhMIgfAAgAAYApIAfAAIAAhMIgfAAgAB4gxIAfAAIAAhHIgfAAgAAYgxIAfAAIAAhHIgfAAgAAOiYQgEgYgKgXQgKgWgNgRIAEgDQAsAGAWAPQAWAPAFAQQAEARgHANQgIANgQADIgHABQgMAAgOgKg");
	this.shape_51.setTransform(763.475,301.825);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#333333").s().p("AAsD2IAAlMIgfAAIAADyQAAACgHAFQgGAFgLADQgMAEgSAAIgMAAIAAkvIBJAbIAYAAIAAhQIhwAAIgEgPIDTAAIAlgxIALAJIAaAWIAbAYQgBAFgEACQgEACgGAAIhvAAIAABQIAaAAIAdggIA+AuQgCADgEADQgFADgHABIAACwQAAAWgEAQQgFAPgPAJQgPAIgfADIgBgcQgBgLgCgHQgCgHgFgFQgEgFgKgCIAAgHIAEAAIAIAAIAIABQAFAAABgDQACgCgBgDIAAizIgfAAIAAE5QAAADgHAEQgHAFgNADQgMAEgSAAgAjjDyQAdgiARgoQAQgpAGguQAHgtAAgyIAAjmIBVAIQgBAGgEADQgEAEgKACIAADPQAAA3gNAxQgMAxgeAoQgeAog0AbgAjvCBIAAk0IBQAHQgBAFgEADQgDAEgKACIAAEOQAAADgHAEQgIAEgMADQgLADgNAAg");
	this.shape_52.setTransform(712.775,302.025);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#333333").s().p("AidDaQgDgMgGgIQgGgHgKgGQgJgGgUgDIAAgHIAJABIAUAAIAVABIAPABQAFAAACgCQACgCAAgEIAAgsIgeALIghAMQgCAEgEAEQgEAEgFAAIgdhKIAtgEIA+gHIAAguIAiACIALgSIAJgRIgtAAQgbAWgeATQgeAUgiAPIgFgFQAVgQAUgSQAUgSATgTIguAAIgFgOIBAAAIAVgbIAVgbIh+AAIgEgOIBNAAIAAhEIg2AAIgEgOIA6AAIAAhIIBZAGQAAAGgEADQgEAEgLACIAAAuIAYggIAHAGIASAQIAMgbIALgaIBNAmQgCAFgFACQgFACgJgCQgOAagRAaQgSAagWAbIAQAAIAZgjIAFAEIAOAMIARAPQAJgkAGgmQAGgmADglIBiAXQgBAGgFACQgFAEgJABIgMApIgOAoIArAAIAkgxIAMAJIAaAWIAbAXQgBAFgEACQgEACgFAAIgWAAQgHA7gQA2QgQA0geAtQAWAZAbATQAbAUAgAOIgBAFQgbAHgPAOQgQAQgGAaQgagUgUgZQgUgZgPgdQghAggtAaQgsAZg9ASIgDgFQA6gfAngnQAogoAZguQgJgcgGgeQgHgdgEggQgOATgQARQgPASgRAPIgHgEIAHgQIAHgQIgGABIgJABIgbAPIgfAOIATABQAAAHgFACQgEAEgIABIAAARIAwgGIAvgHIABAHIgqASIg2AWIAABJQABAXgGAQQgGARgTAKQgTAJgmADQgBgQgCgMgABXhRQgIAPgJAOQAGAZAJAWQAJAWALAUQANgjAHglQAHglACgpIggAAIgPAggAAFgJIAMghIAKgjIhVAAIgZAbIgcAbIAeAAIAgghgAhmhmIASgdIAQgcIgiAAg");
	this.shape_53.setTransform(659.825,302);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#333333").s().p("ABiD4IAAkgIg3AAIAAABQAAAmgFAmQgFAogSAlQgQAmgkAiQgkAhg9AYIgEgEQAkgdAVghQAWghALgjQALgkADglQAEgkAAgmIAAisIBKAaQAfgQAcgRQAbgQATgOIBOBHQgGAFgKAAQgJAAgOgFQgcAGgmAFIhPAIIAABnIBhAAIAkgzIAMAKIAaAWIAbAZQAAAEgEACQgEACgGAAIg0AAIAAEPQAAACgIAEQgHAEgOADQgOAEgUAAgAjwCUIAAliIBIAdIAbAAIAggkIBBAzIgIAGQgFADgIACIAADzQgBADgJAEQgKAEgNAEQgOADgMAAIgMAAIAAg3IgiAAIAABFQAAAEgJAGQgIAFgNAFQgOAEgPAAgAiqApIAiAAIAAjMIgiAAg");
	this.shape_54.setTransform(608.875,301.825);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.a5_btn},{t:this.b5_btn}]},14).wait(320));

	// 音频控制
	this.m5_btn = new lib.mplay_btn();
	this.m5_btn.name = "m5_btn";
	this.m5_btn.setTransform(487.7,299.15,1,1,0,0,0,36.9,41.6);
	new cjs.ButtonHelper(this.m5_btn, 0, 1, 2, false, new lib.mplay_btn(), 3);

	this.m5stop_btn = new lib.mstop_btn();
	this.m5stop_btn.name = "m5stop_btn";
	this.m5stop_btn.setTransform(487.5,299.05,1,1,0,0,0,36.8,41.6);
	new cjs.ButtonHelper(this.m5stop_btn, 0, 1, 2, false, new lib.mstop_btn(), 3);

	this.m1_btn = new lib.mplay_btn();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(487.7,299.15,1,1,0,0,0,36.9,41.6);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.mplay_btn(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m5_btn}]},14).to({state:[{t:this.m5stop_btn}]},5).to({state:[{t:this.m1_btn}]},253).wait(62));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.playm4_btn}]},5).to({state:[{t:this.stopm4_btn},{t:this.instance_2}]},4).to({state:[]},5).wait(320));

	// 不动内容
	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#333333").s().p("AgqBJQgTgLgMgTQgLgUgBgXQABgYALgTQAMgTATgMQAUgLAXABQAXgBATALQAUAMALATQALATAAAYQAAAXgLAUQgLATgUALQgTAMgXABQgXgBgUgMgAgrgsQgSASAAAaQAAAaASASQARASAbAAQAZAAATgSQARgSABgaQgBgagRgSQgTgRgZgBQgbABgRARg");
	this.shape_55.setTransform(1330.3,567.25);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#333333").s().p("ABZEfQABgVgFgQQgEgPgKgJQgKgLgUgJQgVgIgbgGIABgGIAoACIAoADIAcABQAIAAAGgDQAGgCAFgFQAMgKAIgsQAIgsAEhKQAFhIADhjIkBAAIgaAkQgOARgPAPIAzAUIBOAAIAjgoIBOA6QgEAEgFADQgGAEgKABIAAClQAAADgMAEQgLAFgQADQgQAEgOAAIgOAAIAAgwIhWAAIAAA1QAAAEgLAGQgKAGgQAFQgPAFgSAAIgMAAIAAjpQgWASgYAPQgYAPgaANIgFgEQAbghAbgtQAagsAWg1QAVg0ANg3IB4AsQgCAGgGADQgGADgLgBIgPAcIgOAaIDtAAIAwgwIBKBDQgEAFgGADQgHADgLACQgDB3gGBRQgGBSgMAwQgLAwgUATQgSASgYAJQgXAIgkAAIgFAAgAhhBMIBWAAIAAiEIhWAAg");
	this.shape_56.setTransform(1289.075,547.8764);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#333333").s().p("AkgETQAigrATguQATgvAIgwQAJgwABguIhPAAIgEgQIBUAAIAAgSIAAgSIAAhRQgRAagTAWQgUAWgWARIgIgEQANgeALglQALgkAHgpQAHgoADgqIBoAYQgBAHgGADQgFAEgKABIgPAmQgIATgIARIAvAAIAlgxIAMAKIAaAWQAQAMAMAMIAAABIBQAgIBdAAIAlgoIBNA5QgCAEgGAEQgGADgKACIAACIQAAACgMAEQgLAEgQADQgQAEgOAAIgPAAIAAgdIhmAAIAAAPQAAADgLAGQgKAGgQAFQgPAFgRAAIgLAAIAAhHIgCAAIgDAAIhQAAIgCAeIgFAgQAzARAXAXQAYAYADAXQADAXgMAQQgLAQgUACQgUADgVgUQABgbgHgdQgHgcgLgZQgJAlgSAkQgSAlgfAhQgfAhgvAbgAAvAMIBmAAIAAh5IhmAAgAhOg+IAVARIAYAWIAAiCQgCACgEABIgHABIhGAAIAABeIAAANIgBAOIAegpIAJAHgAheEKIgFgQIDFAAQAJgcAGggIALhBIAHg8IBuAYQgCAGgFAEQgGADgKABQgMAWgRAZQgRAagVAZQgUAagXAXIBEAAIAog4IANAKIAdAZIAfAcQgBAFgFACQgEACgHAAgAAKDQQADgigGgkQgGgjgJgeIAGgCQAuAXAVAaQAWAbABAYQACAYgMAPQgLAQgTABIgCAAQgRAAgTgTgAg3jOIgEgRIDYAAIAqg1IANAKIAeAYIAgAaQgCAFgEADQgFACgGAAg");
	this.shape_57.setTransform(1229.825,547.475);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#333333").s().p("Aj9EXQBCgVAngXQAngYAUgaQAUgbAHgdIiMAAIgEgRICTAAQADgQABgQIABgjIhDAAIgDgKQgfAbgoAWQgnAXgxASIgEgGQAygiAlgoQAkgoAZgrIiJAAIgFgRICYAAIAOgdIAMgeIh7AAIgEgRICGAAIAIgbIAIgaIikAAIgFgRICtAAIAIgrIAGgqIB1AXQgBAHgGAEQgFAEgLAAIgGAXIgFAYIBwAAIArg1IANAKIAfAXIAiAbQgCAFgEACQgFADgGAAIjeAAIgJAbIgJAaICBAAIAngwIAMAKIAcAVIAfAYQgBAFgFADQgEACgHAAIjmAAIgPAeIgRAdIDOAAIArg3IAOALIAgAYIAiAbQgBAFgFACQgEADgHAAIirAAQAWAXAfAPQAgANAjAHQAkAHAiACIgBAJQgZAQgPAUQgPAUgCAYQgygWgmgpQglgpgYg0IiIAAQgNASgPARQgPAPgSAQICCAAIAlgsIAMAJIAaATIAdAXQgBAFgFACQgEADgHAAIg/AAQAAASgCARQgCAQgEAQIA1AAIAogzIAMAKIAdAWIAfAaQgBAFgFADQgEACgHAAIiZAAIgEALIgFALQBVAJAvAQQAwARATATQAUASgCARQgBARgPALQgPAKgUAAQgVAAgSgPQgRgWgigcQghgcgygaQgPAagfAWQgfAXg0ASQgzAShOAOg");
	this.shape_58.setTransform(1169.575,547.725);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#333333").s().p("AhTEhIAAlSIibAAIgGgQIFwAAIAtgqIBLA+QgDADgFAEQgHACgJACQgCBGgEAsQgEArgJAYQgJAYgPALQgPAMgVAFQgTAGgdAAQAAgUgCgPQgCgPgHgKQgHgJgMgHQgMgGgSgFIAAgHIAWACIAXACIARAAIAJgBQAFgCADgCQAIgIAEgmQAEgnAChKIh2AAIAAE8QAAADgKAFQgIAFgRAEQgSAEgYABgAiLhTIAAhdIiOAAIgFgRICTAAIAAheIBqAJQgBAFgEAEQgFAEgMADIAABFIBpAAIAAheIBrAJQAAAFgFAEQgEAEgLADIAABFIAeAAIAsg9IANAMIAgAbQARAPANAOQAAAFgFACQgFADgGAAIiFAAIAABDQAAAFgLAFQgLAEgQAEQgQADgTAAIgOAAIAAhYIhpAAIAABHQAAAEgLAFQgKAGgQACQgQAEgSABg");
	this.shape_59.setTransform(1109.6,547.6);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#333333").s().p("ACeD+QgEgOgIgJQgIgKgMgHQgMgGgagFIAAgIIALABIAZABIAcACIATAAQAIAAADgCQADgDAAgFIAAnXIBmAJQAAAHgGAFQgFAEgKACIAAHCQAAAbgHAUQgIATgVALQgXAMgtAEQgBgTgDgPgAiBD/QghAAgTgFQgSgGgIgPQgHgPAAgbIAAjvIggAYQgSALgRAKIgGgFQAjgnAbgwQAbgwATgxQATgxAJgqIBoArQgBAFgGADQgEADgMgBQAxAJAcARQAdARAKAUQALAUgCATQgCASgNALQgMALgUgBIAgAaQgDADgFADIgPAFQABA5gCAiQgCAigFASQgGARgLAIQgMAKgQADQgRAEgXAAQgBgQgCgLQgBgMgFgHQgFgHgJgFQgIgFgMgEIAAgHIAVABIASAAIAJAAIAFgEQAFgEAAgcQACgcgBg9IhJAAIAADuQAAAIAEADQAFADANgBIAyAAIAYAAIAQAAQAGAAAEgCQAFgCADgEQAFgIAHgUIASguIAHAAIABBNQAQAGAGAIQAGAHgBALQABAQgMAKQgNALgdAEQgcAFgzAAgAh1idQgUAdgaAcIAmAOIA8AAIAmgkIACABQgKgZgOgYQgOgYgRgVQgQAdgVAdgABGCRIAAlnIBgAJQAAAFgFAEQgDAEgMACIAAE6QAAADgJAFQgKAFgOAEQgPADgOABg");
	this.shape_60.setTransform(1048.65,547.875);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#333333").s().p("ADBEDQgCgLgEgHQgEgGgHgFQgHgGgPgCIAAgHIgFABIgGAAIgIAAIAAhtIgWAAIAACBQgBACgKAFQgKAEgQABIgIAAIAAiNIgZAAIAACcQAAACgGAFQgGAEgMAEQgMAEgOAAIgLAAIAAi5QgMAzgcAvQgdAwgxAlIgGgEQAfg2APg8QAQg8AFg8QAEg9gBg4IAAgjIgCAAIgCAAQgSAZgYAcQgYAcgdAbQgcAagbAVIA/gEIBLgHIABAHQgVAOgnAWQgnAVgzAZIgFADIgFADIgjhVIAEgBIAKgDQAFgCADgDQAOgMAPgUQAQgVAQgaIgSAIIgTAIIgHAJIgJAHIgjhVIAEgBIAJgDQAEgCADgCQAKgLALgVQAKgVAKgZQALgaAHgZQAIgYADgUIBiAlQgCAEgFAEQgFADgIAAQgPAXgUAZQgUAZgXAXQgWAYgWASIAgAAIAkgBQAKgUAIgVQAHgTAEgQIBIApIAAhjIBSAdIBFAAIgEgCIgEgDQgBgWgIgUQgHgUgMgPIAFgDQApACAXALQAXAKAHAOQAHAOgEANQgFANgMAIIAzAAIAgghIBCAxIgIAGQgFACgGABIAABpQgCACgJAEIgYAHQgOAEgMAAIgMAAIAAgaIi5AAIAAACIAAAWIgBAYIA1AUICSAAIAcggIA+AuQgCADgFACQgEADgIACIAADFQABAVgFAQQgGAOgQAKQgQAIggADQAAgPgCgKgACzDMQAAACgEADQgGADgJACIATABIAQAAQAFABACgDQABgDABgFIAAhiIgZAAgACzBbIAZAAIAAhVIgZAAgABxBbIAWAAIAAhVIgWAAgAArBbIAZAAIAAhVIgZAAgAAAhdIC5AAIAAhYIi5AAgAkVClQASgCAcgHIBBgPIBGgTIACAFIgzAyQggAcgsAlQgDAGgDAEQgFAFgGACg");
	this.shape_61.setTransform(989.25,547.9);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#333333").s().p("AkWEOQAjggAegoQAdgoAWgoQAWgqANgjIBrA4QgCAEgGADQgFADgLgBQgYAggjAfQgiAfgrAcQgrAcgzASgACvEDQgOgkgXgjQgXglgcggQgbgggdgaIAEgEQBMAOAvAYQAwAZAXAcQAYAcAFAaQAEAagKATQgKASgUAFIgKABQgRAAgUgMgAkeAgIgEgQIFUAAQAOglAOgxQAOgwANg0QAMg1AJgzIB/AlQgBAHgGADQgGADgLAAQghBMgoA8QgpA8gxAsIBdAAIAvg9IAPALIAiAcIAkAcQgBAFgFADQgFACgHAAgAivgkQgIgwgUgvQgVgvgZgoIAGgDQBFAXAkAgQAjAgAKAfQAJAggKAWQgKAXgWAFIgIABQgTAAgWgQgAgmhQQgHgvgSgwQgSgwgWgpIAFgDQBBAaAhAhQAhAhAIAgQAJAfgKAWQgKAWgVAFIgIAAQgRAAgWgRg");
	this.shape_62.setTransform(930.225,548.85);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#333333").s().p("AAXEWIAAolIBTAjIA6AAIAjgoIBKA5QgDADgFAEQgGADgJABIAAEkQABAbgGATQgHAUgTALQgUAMgoAEQgBgVgCgPQgCgQgEgJQgFgJgIgHQgJgGgQgFIAAgHIAKABIAVABIAQAAQAHAAACgCQACgDAAgGIAAkkIhCAAIAAHTQgBAFgJAHQgJAHgPAGQgPAFgSAAgAkQCoQANgIAFgIQAEgHgBgMIAAmUIBZAiIBDAAIAlgoIBKA5QgDAEgGAEQgGADgIABIAADaQgBADgLAEQgLAEgQAEQgPAEgOABIgOAAIAAgiIhSAAIAACLIAogQIAqgTIgMghQgHgQgIgQIAHgDQA3AcAaAgQAbAgAEAeQAFAegJAUQgLAUgTAEQgUADgWgUQABgVgCgWQgDgWgFgVIgyAyQgdAbgjAeQgEALgGAGQgHAIgGADgAirgVIBSAAIAAhdIhSAAgAiriDIBSAAIAAhZIhSAAg");
	this.shape_63.setTransform(870.025,548.55);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#333333").s().p("AAQBSQAVgKAPgOQAOgNAIgNQAIgOAAgJQgOgEgOgGQgOgHgKgNQgKgNAAgUQAAgVAOgNQAPgNAWAAQAWAAAPAPQAPAPABAfQAAAcgJAaQgJAbgWAXQgVAXgjAPgAh8BSQAWgKAOgOQAPgNAHgNQAIgOABgJQgOgEgOgGQgOgHgLgNQgKgNAAgUQAAgVAOgNQAPgNAXAAQAWAAAPAPQAPAPAAAfQABAcgKAaQgJAbgWAXQgVAXgiAPg");
	this.shape_64.setTransform(781.45,528.425);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#333333").s().p("AAtCgQgRgOgHgYQgPARgNALQgOAMgRAGQgRAGgYAAQgnAAgYgWQgYgVgBgnQAAgbAMgUQAMgUAcgPQAcgPAwgOIAcgHIAegIIAAglQAAgfgFgSQgGgSgNgHQgNgHgWAAIgNABIgMABIgFArQgCAegMAOQgNANgSAAQgQAAgLgIQgKgIgEgPQAEgrAmgYQAmgYBGgBQA+AAAcAdQAdAegBBBIAACgQAAARAFAHQAFAHAJgBQAGABAGgFQAGgFAJgNIAKAIQgLAZgSALQgTALgcAAQgeAAgRgOgAAAgNIgNAFQggAMgQAWQgQAWAAAhQAAAbAMAMQALANAWAAQALABAMgHQALgHARgOIAAh8IgTAFgAhtiKIAKgDg");
	this.shape_65.setTransform(747.724,554.375);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#333333").s().p("AhxDpQgggVgSgmQgTgnAAg2QAAg4AUgnQAUgnAhgVQAigUAqgBQAaAAAUAKQAVALASAVIAAiZIgygFIAAgQICIgZIAJAFIgDBhIAAFzIAnADIAAATIiAAHIgFgmQgTAUgXAKQgWAKgcABQgngBgggTgAglgqQgTAMgMAeQgLAcAAAxQAAAxALAdQAKAeATANQASANAWgBQAMAAAMgDQAMgEALgJIAAjoQgLgIgLgEQgLgDgMAAIgCAAQgUAAgSALg");
	this.shape_66.setTransform(709.175,546.5);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#333333").s().p("AAgBXQgPgQgBgfQAAgbAKgaQAKgbAVgXQAUgXAjgPIAMAUQgUAKgPAOQgOANgIANQgHAOgBAJQANADAOAHQAPAHAKANQAJAMABAVQgBAVgOANQgOANgXAAQgWAAgPgPgAhsBXQgPgQAAgfQAAgbAJgaQAJgbAWgXQAVgXAjgPIAMAUQgWAKgOAOQgPANgHANQgIAOgBAJQAOADAOAHQAPAHAKANQAJAMABAVQAAAVgOANQgPANgWAAQgWAAgQgPg");
	this.shape_67.setTransform(671.85,528.425);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#333333").s().p("AkOETQAeguAPg1QAOg1AEg5QAEg4gBg4IAAjcIBiAhIEBAAIAoguIBQBAIgJAIQgHAEgKACIAAGBQAAAcgHAUQgHATgWAMQgXALgtAEQgBgUgDgPQgDgPgGgJQgGgJgLgHQgLgHgWgEIAAgIIAJABIAVABIAWABIAQABQAHAAADgDQACgEAAgFIAAhsIhnAAIAAC7QAAADgIAFQgIAGgQAEQgPAFgWAAIgPAAIAAjSIhhAAQgGAogPAlQgPAmgcAiQgdAiguAdgAA3A0IBnAAIAAiBIhnAAgAh3guIAAAvQgBAZgDAaIBeAAIAAiBIhaAAgAA3hdIBnAAIAAh7IhnAAgAh3hdIBaAAIAAh7IhaAAg");
	this.shape_68.setTransform(597.375,547.775);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#333333").s().p("ACBD7QgDgPgGgKQgFgKgLgGQgKgHgUgEIAAgIIAIABIATABIAVABIAPAAQAGAAACgDQADgDAAgFIAAgnIiGAAIAABxQAAAEgKAHQgKAGgQAFQgQAEgSABIgNAAIAAlHIBXAiIB8AAIAjgpIkaAAIgEgQICIAAIAAg5IhgAAIgEgRIBkAAIAAg2Ih1AAIgFgRIB6AAIAAhKIBoAJQAAAGgDADQgFAEgLADIAAAxIAxAAIApg2IAOAKIAeAYIAgAbQgCAFgEADQgFACgGAAIiVAAIAAA2IAiAAIAmgyIANAKIAcAWIAdAZQgBAFgEADQgFACgGAAIh+AAIAAA5IA1AAIArg4IAOALIAeAZIAgAbQgBAFgEADQgFABgGAAIhXAAIBMA6QgDADgGADQgFAEgKACIAACtQABAbgIATQgHAUgVALQgWAMgrAEQgCgVgCgOgAAOCAICGAAIAAg1IiGAAgAAOA6ICGAAIAAgzIiGAAgAj2CuQAXgLAHgJQAHgIgBgKIAAjxIhDAAIgHgRIBLAAIAmgkIBCA3QgCAEgGADQgGADgMACIAADUIAZgNIAYgOIADAEQgKATgWAgQgUAggdAnQgEAPgGALQgHALgIAGgAi8iqQgIgdgPgbQgPgbgQgWIAEgCQA4AFAcAQQAcAQAIAVQAHAUgJAQQgJAQgSAGIgKABQgPAAgQgKg");
	this.shape_69.setTransform(538.5,547.95);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#333333").s().p("AgmAnQgQgQAAgWQAAgWAQgQQAPgQAXAAQAXAAAQAQQAPAQABAWQgBAWgPAQQgQAPgXAAQgXAAgPgPg");
	this.shape_70.setTransform(498.575,566.275);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#333333").s().p("AiUDlIAAg2IAzg4IAvg1QAggkAUgdQAVgbAKgaQAKgbAAggQAAgtgUgaQgTgZgigBIgLABIgMACIgNA7QgGAdgMALQgNAKgOAAQgNAAgLgHQgKgGgFgMQADgiAVgYQAVgYAigNQAigMAnAAQAwAAAeAQQAfAQAPAbQAPAcAAAkQAAAfgSAdQgTAdglAgQglAhg3ArIgiAdIgoAiID6AAIAABKg");
	this.shape_71.setTransform(470.325,547.825);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#333333").s().p("AgqBJQgTgLgMgTQgLgTgBgYQABgXALgUQAMgTATgLQATgLAYAAQAXAAAUALQATALALATQALAUAAAXQAAAYgLATQgLATgTALQgUAMgXABQgYgBgTgMgAgrgsQgSASAAAaQAAAaASASQASASAaAAQAZAAATgSQARgSABgaQgBgagRgSQgTgRgZgBQgaABgSARg");
	this.shape_72.setTransform(1735.5,442.05);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#333333").s().p("Ah8EYQAxg4AZhEQAYhDAGhJQAHhIgChJIhZAAIgFgRIEWAAIArg9IAOAMIAfAbIAgAdQgBAFgFADQgEACgHAAIjBAAIgDAxQgBAZgDAYIBQAAIArgqIBIA9QgDAFgGACQgGADgKACQgEBTgGA0QgGA0gLAcQgLAcgSANQgPANgVAGQgUAHgbAAQAAgUgCgOQgCgPgGgIQgHgJgLgHQgLgHgSgFIAAgGIAVACIAXABIARAAIAKgBQAFgCAEgDQAMgKAIgxQAHgyAFhdIhYAAQgIA8gVA4QgUA4gmAvQgoAvg/AhgAjWEdIAAkvQgfAdglAYIgGgEQAYgmAYgzQAXgzASg6QATg6ALg7IB5AkQgCAGgGADQgHAEgKAAQgOAjgQAfQgQAfgSAcIAdAKQgBAEgFADQgEADgJACIAAFcQgBAEgKAGQgKAFgQAFQgQAFgSAAgAA1iqQgCgdgNgdQgMgcgSgVIAEgDQA4AHAcARQAcATAGAVQAGAVgKARQgKARgUAEIgIABQgQAAgTgOg");
	this.shape_73.setTransform(1694.375,422.725);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#333333").s().p("AiFEWQA1gWAhgXQAhgXARgaQARgZAGgcIiAAAIgFgRICKAAIAEgiIABgkIgTAAIAAAQQAAAEgLAGQgJAGgQAFQgQAEgQAAIgMAAIAAgqQgKAGgMgCQgNgCgNgLQABgWgFgUQgEgWgHgUIAAE2QAAADgKAGQgLAGgPAEQgPAFgQgBIgRAAIAAjeQgQAXgTATQgTAVgWATIgGgHQAUgiAPgpQAPgpALgtQAJgtAHgtIhFAAIgFgRIBPAAIAAiZIBrALQgBAGgFAFQgFAFgMABIAAB1IAcgsIALAKIAYAYIAAgDIBUAgIB/AAIAjglIBHA1QgCAEgEADQgGACgGABIAACOQgBACgFAEIgMAGIASAPIAbAYIAaAXQgBAFgFACQgEADgHAAIiTAAQAPAZApAQQAqAPBGAFIAAAIQgeAHgQATQgQATgBAmQgkgMgZgYQgXgYgNgfQgNgdgGgeQgKAjgaAfQgZAcgyAXQgyAWhSAOgAB8BQQgCASgDAQIA0AAIAlg0IgUAGQgLADgKAAIgPAAIAAgbIgYAAIgEAkgAARAbICHAAIAAg5IiHAAgAh+hDIABAAQAWAJAQAKQAPAKAJAKIAAhXIg/AAgAARgvICHAAIAAg5IiHAAgAgQiNIAAgzIhCAAIgFgRIBHAAIAAhJIBhAHQAAAGgEAEQgEAEgMACIAAAyIAwAAIAAhJIBiAHQgBAGgEAEQgEAEgLACIAAAtIAggsIALAJIAaAXIAbAYQgCAFgEACQgEADgGAAIhQAAIAAAZQAAAEgKAEQgLAFgPAEQgQAEgPAAIgLAAIAAguIgwAAIAAAhQAAADgKAFQgKADgPAEQgPADgOAAg");
	this.shape_74.setTransform(1634.75,422.85);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#333333").s().p("AjCEcIAAkIQgWAPgWAOQgWAOgYAMIgEgGQAegiAdgpQAegqAXgqQAYgpANghIBlA7QgCAEgFACQgGADgLgBIgaAaIgcAbIAbALQgBAEgFADQgEADgIACIAAEcQgBADgKAFQgLAFgQAEQgQAEgRAAgABEDyQgFgPgKgKQgHgGgJgFQgIgFgOgFQgOgEgUgEIAAgHIAOABIAhACIAlACIAYABQAIAAADgDQADgDAAgGIAAjxIigAAIgFgRIDoAAIAsg5IANALIAfAZIAfAcQgBAFgEACQgFADgHAAIhQAAIAAD0QABAcgJAVQgJAWgZANQgaANgzADQgBgUgEgQgAkQhuQAZgZAYgfQAZgfAUgfQAUgfAMgYIBeA7QgDAEgFADQgGACgJgCQgYAUgeAUQgfAVgjATQgjASgmAPgAgXjNIgFgRIC6AAIAog2IAOALIAdAYIAeAaQgBAFgFADQgEACgGAAg");
	this.shape_75.setTransform(1574.15,422.875);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#333333").s().p("AkkDFIApgXIAqgYIAAjGIhIAAIgEgRIBCAAIAngzIBSBBQgEAFgHADQgIAEgNABIAACzQALAKAMAIQANAIAOAHIgDgDQAWgkALgqQALgpADgwIhLAAIgFgQIBQAAIABgSIAAgUIAAhOIg8AAIgFgRIBBAAIAAiLIBkAKQgCAHgEAEQgEAEgMABIAABxIA1AAIAAiLIBkAKQgBAHgFAEQgEAEgMACIAABwIACAAIAkg4IAMALIAaAZIAcAbQgCAFgEACQgEADgHAAIhXAAIAAB0IANAAIAmg5IANAKIAbAaIAcAcQgBAFgFACQgEACgHAAIhmAAIAACeQAAAEgKAFQgKAFgOAGQgPAEgPAAIgOAAIAAi2Ig5AAQgHA2gbArQgbArg4AeQAfAOAtAEQAsAGBBAAIBZgCQArgBAvgDIAAAHQgZAHgOAUQgNAVgDAaIiYAAQg/ABgogMQgpgMgcgZQgbgZgWgmQgGgLgGAAQgFABgGAKIgRAdIgXAnIgYAoQABAFgCAEQgCADgEACgAArgyQAAAVgBARIA2AAIAAh0Ig1AAgAjAiJQgHgigRgiQgRgjgTgbIAEgDQA8AMAgAWQAeAWAIAYQAIAYgJASQgJATgUAFIgJAAQgQAAgTgNg");
	this.shape_76.setTransform(1514.625,422.75);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#333333").s().p("AAQBSQAWgKAOgOQAPgNAHgNQAIgOABgJQgOgEgOgGQgPgHgKgNQgJgNgBgUQAAgVAOgNQAPgNAWAAQAXAAAPAPQAOAPABAfQAAAcgJAaQgKAbgVAXQgVAXgjAPgAh7BSQAUgKAPgOQAOgNAIgNQAHgOABgJQgNgEgOgGQgPgHgKgNQgKgNAAgUQABgVAOgNQAOgNAXAAQAWAAAPAPQAPAPABAfQAAAcgKAaQgKAbgVAXQgUAXgkAPg");
	this.shape_77.setTransform(1441.45,403.225);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#333333").s().p("AAtCgQgRgOgHgYQgPARgNALQgOAMgRAGQgRAGgYAAQgnAAgYgWQgYgVgBgnQAAgbAMgUQAMgUAcgPQAcgPAwgOIAcgHIAegIIAAglQAAgfgFgSQgGgSgNgHQgNgHgWAAIgNABIgMABIgFArQgCAegMAOQgNANgSAAQgQAAgLgIQgKgIgEgPQAEgrAmgYQAmgYBGgBQA+AAAcAdQAdAegBBBIAACgQAAARAFAHQAFAHAJgBQAGABAGgFQAGgFAJgNIAKAIQgLAZgSALQgTALgcAAQgeAAgRgOgAAAgNIgNAFQggAMgQAWQgQAWAAAhQAAAbAMAMQALANAWAAQALABAMgHQALgHARgOIAAh8IgTAFgAhtiKIAKgDg");
	this.shape_78.setTransform(1407.724,429.175);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#333333").s().p("AhxDoQgggTgSgnQgTgmAAg3QAAg4AUgmQAUgoAhgVQAigUAqgBQAaAAAUAKQAVALASAVIAAiZIgygFIAAgQICIgZIAJAFIgDBhIAAFzIAnADIAAATIiAAHIgFgmQgTAUgXAKQgWALgcAAQgnAAgggVgAglgpQgTAMgMAcQgLAdAAAxQAAAxALAeQAKAdATANQASAMAWABQAMgBAMgDQAMgEALgJIAAjoQgLgIgLgEQgLgDgMAAIgCAAQgUAAgSAMg");
	this.shape_79.setTransform(1369.175,421.3);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#333333").s().p("AAgBXQgPgQAAgfQgBgbAKgaQAJgbAVgXQAWgXAigPIANAUQgWAKgOAOQgPANgHANQgIAOgBAJQAOADAOAHQAOAHAKANQALAMAAAVQAAAVgOANQgPANgWAAQgXAAgPgPgAhrBXQgPgQgBgfQAAgbAJgaQAJgbAWgXQAVgXAjgPIALAUQgVAKgOAOQgPANgHANQgIAOAAAJQAOADAOAHQAOAHAKANQAKAMAAAVQgBAVgNANQgPANgWAAQgWAAgPgPg");
	this.shape_80.setTransform(1331.85,403.225);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#333333").s().p("AkOETQAeguAPg1QAOg1AEg5QAEg4gBg4IAAjcIBiAhIEBAAIAoguIBQBAIgJAIQgHAEgKACIAAGBQAAAcgHAUQgHATgWAMQgXALgtAEQgBgUgDgPQgDgPgGgJQgGgJgLgHQgLgHgWgEIAAgIIAJABIAVABIAWABIAQABQAHAAADgDQACgEAAgFIAAhsIhnAAIAAC7QAAADgIAFQgIAGgQAEQgPAFgWAAIgPAAIAAjSIhhAAQgGAogPAlQgPAmgcAiQgdAiguAdgAA3A0IBnAAIAAiBIhnAAgAh3guIAAAvQgBAZgDAaIBeAAIAAiBIhaAAgAA3hdIBnAAIAAh7IhnAAgAh3hdIBaAAIAAh7IhaAAg");
	this.shape_81.setTransform(1257.375,422.575);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#333333").s().p("Ag7BiQAmgTAQgZQAQgYAEgWQgOgDgQgIQgRgIgNgOQgNgOgBgWQAAgWAQgRQAQgQAagBQAQAAAOAIQANAIAJAQQAIAPAAAXQAAAfgLAfQgLAfgYAbQgWAbgoASg");
	this.shape_82.setTransform(1177.05,447.9);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#333333").s().p("ABZEfQABgVgFgQQgEgPgKgJQgKgLgUgJQgVgIgbgGIABgGIAoACIAoADIAcABQAIAAAGgDQAGgCAFgFQAMgKAIgsQAIgsAEhKQAFhIADhjIkBAAIgaAkQgOARgPAPIAzAUIBOAAIAjgoIBOA6QgEAEgFADQgGAEgKABIAAClQAAADgMAEQgLAFgQADQgQAEgOAAIgOAAIAAgwIhWAAIAAA1QAAAEgLAGQgKAGgQAFQgPAFgSAAIgMAAIAAjpQgWASgYAPQgYAPgaANIgFgEQAbghAbgtQAagsAWg1QAVg0ANg3IB4AsQgCAGgGADQgGADgLgBIgPAcIgOAaIDtAAIAwgwIBKBDQgEAFgGADQgHADgLACQgDB3gGBRQgGBSgMAwQgLAwgUATQgSASgYAJQgXAIgkAAIgFAAgAhhBMIBWAAIAAiEIhWAAg");
	this.shape_83.setTransform(1138.475,422.6764);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#333333").s().p("AkgETQAigrATguQATgvAIgwQAJgwABguIhPAAIgEgQIBUAAIAAgSIAAgSIAAhRQgRAagTAWQgUAWgWARIgIgEQANgeALglQALgkAHgpQAHgoADgqIBoAYQgBAHgGADQgFAEgKABIgPAmQgIATgIARIAvAAIAlgxIAMAKIAaAWQAQAMAMAMIAAABIBQAgIBdAAIAlgoIBNA5QgCAEgGAEQgGADgKACIAACIQAAACgMAEQgLAEgQADQgQAEgOAAIgPAAIAAgdIhmAAIAAAPQAAADgLAGQgKAGgQAFQgPAFgRAAIgLAAIAAhHIgCAAIgDAAIhQAAIgCAeIgFAgQAzARAXAXQAYAYADAXQADAXgMAQQgLAQgUACQgUADgVgUQABgbgHgdQgHgcgLgZQgJAlgSAkQgSAlgfAhQgfAhgvAbgAAvAMIBmAAIAAh5IhmAAgAhOg+IAVARIAYAWIAAiCQgCACgEABIgHABIhGAAIAABeIAAANIgBAOIAegpIAJAHgAheEKIgFgQIDFAAQAJgcAGggIALhBIAHg8IBuAYQgCAGgFAEQgGADgKABQgMAWgRAZQgRAagVAZQgUAagXAXIBEAAIAog4IANAKIAdAZIAfAcQgBAFgFACQgEACgHAAgAAKDQQADgigGgkQgGgjgJgeIAGgCQAuAXAVAaQAWAbABAYQACAYgMAPQgLAQgTABIgCAAQgRAAgTgTgAg3jOIgEgRIDYAAIAqg1IANAKIAeAYIAgAaQgCAFgEADQgFACgGAAg");
	this.shape_84.setTransform(1079.225,422.275);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#333333").s().p("Aj9EXQBCgVAngXQAngYAUgaQAUgbAHgdIiMAAIgEgRICTAAQADgQABgQIABgjIhDAAIgDgKQgfAbgoAWQgnAXgxASIgEgGQAygiAlgoQAkgoAZgrIiJAAIgFgRICYAAIAOgdIAMgeIh7AAIgEgRICGAAIAIgbIAIgaIikAAIgFgRICtAAIAIgrIAGgqIB1AXQgBAHgGAEQgFAEgLAAIgGAXIgFAYIBwAAIArg1IANAKIAfAXIAiAbQgCAFgEACQgFADgGAAIjeAAIgJAbIgJAaICBAAIAngwIAMAKIAcAVIAfAYQgBAFgFADQgEACgHAAIjmAAIgPAeIgRAdIDOAAIArg3IAOALIAgAYIAiAbQgBAFgFACQgEADgHAAIirAAQAWAXAfAPQAgANAjAHQAkAHAiACIgBAJQgZAQgPAUQgPAUgCAYQgygWgmgpQglgpgYg0IiIAAQgNASgPARQgPAPgSAQICCAAIAlgsIAMAJIAaATIAdAXQgBAFgFACQgEADgHAAIg/AAQAAASgCARQgCAQgEAQIA1AAIAogzIAMAKIAdAWIAfAaQgBAFgFADQgEACgHAAIiZAAIgEALIgFALQBVAJAvAQQAwARATATQAUASgCARQgBARgPALQgPAKgUAAQgVAAgSgPQgRgWgigcQghgcgygaQgPAagfAWQgfAXg0ASQgzAShOAOg");
	this.shape_85.setTransform(1018.975,422.525);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#333333").s().p("AhTEhIAAlSIibAAIgFgRIFvAAIAtgpIBLA+QgDADgGADQgFAEgKABQgCBGgEAsQgEArgJAYQgJAYgPALQgQAMgTAGQgUAFgdAAQAAgUgCgPQgDgPgGgKQgHgIgMgIQgMgGgSgFIAAgHIAWACIAXACIARAAIAKgCQADgBADgCQAJgHAEgnQAEgnAChKIh3AAIAAE8QAAADgJAFQgIAFgRAEQgRAEgZABgAiMhUIAAhcIiNAAIgFgRICSAAIAAheIBqAJQAAAFgEAFQgGADgLADIAABFIBpAAIAAheIBrAJQAAAFgFAFQgEADgMADIAABFIAfAAIArg9IAPAMIAeAbQASAPAOAOQgBAFgFADQgFACgGAAIiGAAIAABDQAAAEgKAGQgKAFgRADQgQADgTAAIgOAAIAAhYIhpAAIAABHQAAAEgKAFQgLAFgPADQgRAEgSAAg");
	this.shape_86.setTransform(959,422.4);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#333333").s().p("ABlD3QgCgPgJgJQgIgJgRgIQgQgIgXgFIAAgHIAgACIAfACIAXABQAHAAAFgCQAGgCADgEQAQgPAGhTQAHhTACiYIhcAAQgYAngbAgQgaAfggAZIgDgDIAADyQgCADgKAGQgLAFgQAEQgOAEgPABIgNAAIAAgwIhLAAIAAApQAAAFgJAHQgIAGgPAFQgPAFgSAAIgMAAIAAnJIBLAfIADglIADgpIABglIB0AcQgCAHgGAEQgHADgKAAIghAlIgiAmIAoAAIAkgpIBKA6QgCAEgHADQgGADgIADIAABkQAOggAOgpQAMgpALgtQALgtAGgsIBwAgQgCAGgFADQgHAEgKAAQgIATgIARIgSAjIBLAAIAtguIBJBBQgEAEgGADQgHADgKACQgCBegDBDQgCBDgFAtQgFAtgIAbQgJAbgOANQgQARgXAJQgXAHghAAQAAgVgEgPgAjECuIBLAAIAAidIhLAAgAjEAAIBLAAIAAiTIhLAAgAAkBRQgBghgLghQgLgfgPgaIADgDQA5AOAbAWQAbAWAFAXQAFAYgLARQgMARgUADIgEAAQgTAAgUgQg");
	this.shape_87.setTransform(900.15,422.775);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#333333").s().p("Aj9EXQBCgVAngXQAngYAUgaQAUgbAHgdIiMAAIgEgRICTAAQADgQABgQIABgjIhDAAIgDgKQgfAbgoAWQgnAXgxASIgEgGQAygiAlgoQAkgoAZgrIiJAAIgFgRICYAAIAOgdIAMgeIh7AAIgEgRICGAAIAIgbIAIgaIikAAIgFgRICtAAIAIgrIAGgqIB1AXQgBAHgGAEQgFAEgLAAIgGAXIgFAYIBwAAIArg1IANAKIAfAXIAiAbQgCAFgEACQgFADgGAAIjeAAIgJAbIgJAaICBAAIAngwIAMAKIAcAVIAfAYQgBAFgFADQgEACgHAAIjmAAIgPAeIgRAdIDOAAIArg3IAOALIAgAYIAiAbQgBAFgFACQgEADgHAAIirAAQAWAXAfAPQAgANAjAHQAkAHAiACIgBAJQgZAQgPAUQgPAUgCAYQgygWgmgpQglgpgYg0IiIAAQgNASgPARQgPAPgSAQICCAAIAlgsIAMAJIAaATIAdAXQgBAFgFACQgEADgHAAIg/AAQAAASgCARQgCAQgEAQIA1AAIAogzIAMAKIAdAWIAfAaQgBAFgFADQgEACgHAAIiZAAIgEALIgFALQBVAJAvAQQAwARATATQAUASgCARQgBARgPALQgPAKgUAAQgVAAgSgPQgRgWgigcQghgcgygaQgPAagfAWQgfAXg0ASQgzAShOAOg");
	this.shape_88.setTransform(838.975,422.525);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#333333").s().p("AjMEBQgCgNgHgIQgHgHgNgHQgNgGgSgEIAAgHIAZABIAaABIASABIALgBQAEgBAFgDQAKgJAHgoQAHgpAEhIIgtAAIgXAdIhBgjIAIgIIAKgHQADgUACgdIAEg3IACgwIBRAmIAUAAIAAhwIh2AAIgFgRIB0AAIAigmIBKA3QgDAEgHAEQgGADgKADIAAB/QgBACgKAEQgLAEgOADQgOAEgNAAIgMAAIAAgeIgkAAIgCAhIgDAkIgEAiIAqAAIAnglIBCA3QgDAEgGADQgGADgJAAQgEBBgFArQgHArgKAYQgKAZgPALQgPALgTAGQgTAFgaAAQAAgQgCgNgAA/EeIAAiGIiFAAIgFgRICKAAIAAhHIgkAAIAAAPQAAAEgQAGQgPAHgdABIgNAAIAAkaIBQAeIBdAAQAJgaAKgjQALgjAIgiIBiAmQgCAFgGADQgGAEgKgBQgVAXgYAVQgXAUgXARIAXAAIAlgpIBDA0QgDADgGADQgFADgKABIAADHQAAAEgRAGQgRAHgeAAIgNAAIAAgSIgkAAIAABHIAjAAIAng2IAMALIAcAYIAdAbQgBAEgFADQgEACgHAAIh+AAIAAByQAAADgHAEQgHAEgOAEQgNAEgUABgACKAwIAkAAIAAhYIgkAAgAAbAwIAkAAIAAhYIgkAAgACKg5IAkAAIAAhRIgkAAgAAbg5IAkAAIAAhRIgkAAgAAPiwQgEgbgLgaQgMgagPgUIAFgDQAyAHAaARQAZARAGATQAFAUgJAOQgJAPgSAEIgHABQgOAAgSgMg");
	this.shape_89.setTransform(778.525,422.6);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#333333").s().p("AAyEcIAAl/IgkAAIAAEXQAAADgHAFQgHAFgNAFQgPAEgTAAIgOAAIAAleIBUAgIAbAAIAAheIiBAAIgFgQID0AAIArg5IAMALIAfAZQARAPAOANQgBAFgEACQgGACgGAAIiBAAIAABeIAfAAIAhgmIBHA2QgCADgFADQgFAEgIACIAADKQAAAagGARQgFASgRAKQgSALgjADIgBghQgBgNgDgIQgCgIgGgGQgFgFgKgCIAAgIIAEAAIAJAAIAJAAQAFAAACgDQACgCgBgEIAAjOIgkAAIAAFpQAAADgIAFQgIAGgOAEQgPAEgVAAgAkHEXQAjgnASgvQAUguAHg1QAHg1AAg5IAAkKIBjAJQgCAHgFAFQgEADgMACIAADwQAAA/gOA4QgOA5gjAuQgiAug8AggAkUCVIAAlkIBcAIQgBAHgEADQgEAEgLACIAAE4QAAADgJAFQgJAFgOADQgNAEgOAAg");
	this.shape_90.setTransform(720,422.85);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#333333").s().p("Ai2D7QgDgNgHgJQgHgJgLgHQgLgGgXgEIAAgHIALAAIAWABIAaABIAQABQAGAAADgDQACgBAAgGIAAgxIgjALIgmAOQgDAFgEAFQgFADgFABIgihVIA0gFIBIgJIAAg1IAnADIAMgVIALgTIg0AAQgfAYgjAXQgiAXgoASIgFgHQAZgSAWgUQAYgVAUgWIg0AAIgGgRIBKAAIAZgeIAXgfIiRAAIgFgRIBZAAIAAhOIg+AAIgFgRIBDAAIAAhTIBoAIQgBAGgFAFQgFAEgMACIAAA1IAbgmIAJAIIAVASIANgfIANgeIBZAsQgCAFgGADQgFACgLgCQgRAdgTAfQgVAegZAfIASAAIAdgpIAHAGIAQANIATASQAKgqAHgrQAHgsAEgsIBxAcQgCAFgFAEQgGAEgKAAIgPAxIgQAtIAyAAIAqg3IANAKIAeAZIAgAbQgBAFgFACQgFADgGAAIgaAAQgGBEgTA9QgTA9gjA1QAaAbAfAXQAfAWAlASIgCAFQgeAHgRASQgTASgHAdQgfgXgWgbQgXgegRghQgmAlg0AdQgzAehHAUIgDgGQBEgkAsgtQAvguAbg1QgJgggIgiQgHgigFglQgPAWgTATQgSAVgUARIgIgEIAJgTIAHgTIgHACIgKABIgfARIgjARIAVABQAAAIgFADQgFADgJACIAAATIA2gHIA4gHIABAHIgxAWIg+AYIAABVQABAbgIATQgGASgWALQgWAMgrAEQgBgUgEgOgABkheQgJASgKAQQAHAdAKAaQALAZAMAXQAPgoAIgrQAJgsACguIgmAAQgIASgJASgAAGgLQAHgRAGgUIAMgoIhiAAIgdAfIghAeIAjAAIAlgmgAh2h2IAVghIATggIgoAAg");
	this.shape_91.setTransform(658.9,422.8);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#333333").s().p("AjsD7QgDgPgFgIQgFgKgJgGQgKgHgTgEIAAgHIAHAAIARABIATABIAOAAQAGAAADgBQACgDAAgFIAAh7IgVAOQgCAGgFAFQgEAFgGACIgghgIAdgEIApgKIAAhtIg5AAIgFgRIA+AAIAAiRIBoAKQgBAGgFAFQgFAEgMACIAABtIAbgxIAHAHIAPATIATAYIAAh2IBcAgICYAAIAkgmIBJA2QgCAEgFADQgGADgIACIAABaQgBADgLAFQgLAFgQADQgPAFgOAAIgPAAIAAgLIipAAIAAAjIgBAbIgBAcIBIAAIAAhVIBgAIQgBAEgCAEQgEADgIABIAABBIARAAIAog3IAMAKIAdAZIAfAbQgBAFgFADQgEABgHAAIhwAAIAABkIALAAIAkgoIBMA5QgCAEgGADQgGAEgKACIAACGQgBACgLAEQgLAEgQAEQgPADgOABIgPAAIAAgmIhtAAIAAAQQAAAEgKAFQgKAHgQADQgPAFgRABIgLAAIAAisQgNAugcArQgeAqgxAiIgGgDQAdgvAOg1QAOg1AEg3QAFg4ABg2QgNAMgRAMIgmAbIAAC5QABAcgHATQgGAUgVAKQgUAMgqAEQgBgVgCgOgABEDkIBtAAIAAhwIhtAAgAAFAjQgDATgCASIBHAcIAJAAIAAhkIhIAAIgDAjgAiKghIAjgIIAhgIIAAgWIAAg0IgDAAIgCAAIg/AAgAAKh6ICpAAIAAhgIipAAg");
	this.shape_92.setTransform(598.5,422.8);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#333333").s().p("AjNEdIAAjlQghAvguAnIgHgGQAUgjAQgqQAPgpAKgtQAKgtAHguIhEAAIgEgQIBQAAIAAiXIBnAKQgCAHgEAEQgEAEgNACIAAB4IAggwIALAKIAYAXIAaAZQgCAGgEACQgFACgGAAIhMAAIAAAsQAsAOAVASQAUATADATQAEASgKAOQgJAMgQACQgQADgSgQQAAgWgHgWQgFgXgLgUIAAE/QAAAEgKAGQgKAGgOAEQgPAEgPAAgAg7DPQARgJAGgIQAFgHAAgMIAAm4IBUAhIBmAAIAjgnIBIA4IgJAHQgFADgJACIAADKQgBACgJAEQgKAFgNAFIBOAzQgEAEgGABQgFABgJgCQgPALgaAPQgaAPgeANQAbAdAgAVQAhAUAlALIgBAHQgXAHgPATQgRATgIAeQgsgcgegoQgegogTg4QgTg4gKhHIgfAAIAADBIAigFIAkgHIABAFQgRAPggAYQggAZgnAbQgEAFgFAFQgGAEgEACgABvAyQAPAdAUAXQAQgXAOgZQAPgZAJgRIgOACIgMABIgOAAIAAgXIhLAAQALAfAPAbgAAtgZIBzAAIAAhdIhzAAgAAtiGIBzAAIAAhVIhzAAg");
	this.shape_93.setTransform(539.1,422.75);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#333333").s().p("AgmAnQgQgQAAgWQAAgWAQgQQAPgQAXAAQAXAAAQAQQAPAQABAWQgBAWgPAQQgQAPgXAAQgXAAgPgPg");
	this.shape_94.setTransform(498.575,441.075);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#333333").s().p("AiFDkIAAgTIBXgLIAAg4IABg4IAAkFIhIAHIAAgWICiglIAJAGIgCBiIAADRIAAA4IABA4IBRALIAAATg");
	this.shape_95.setTransform(470.3,422.775);

	this.instance_3 = new lib.Bitmap1111111111();
	this.instance_3.setTransform(451,526);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#333333").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape_96.setTransform(1530.325,482.925);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#333333").s().p("AAJCtIAAhXIiFAAIAAgmICUjbIAzAAIAADRIAyAAIAAAwIgyAAIAABXgAhiAmIBrAAIAAihg");
	this.shape_97.setTransform(1508.675,469.1);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#333333").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape_98.setTransform(1207.025,482.925);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#333333").s().p("AhXCeQgcgVgDgnQAEgLAIgFQAIgFAJAAQAOAAAIAIQAJAJADAWIAHAuIAIABIAJAAQAjAAATgTQATgUAAgnQAAgpgSgVQgTgVgiAAIgSAAIAAgRIAQAAQAfAAARgTQASgUAAgpQAAgigOgRQgPgRgZAAIgPABIgJAtQgEARgJAHQgJAHgNAAQgIAAgHgEQgHgEgDgHQAAgbAPgRQAOgRAYgJQAYgIAbAAQAkAAAYALQAYAKAMATQAMASAAAYQAAAggUAXQgVAXgvAKQAkAGAVAMQAWANAJATQAKAUAAAYQgBAcgPAVQgPAWgcALQgcAMgnABQg0gBgcgVg");
	this.shape_99.setTransform(1185.375,469.175);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#333333").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape_100.setTransform(864.925,482.925);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#333333").s().p("AhyCwIAAgqIAogrIAjgoQAZgcAQgWQAPgVAIgUQAIgVAAgYQAAgjgPgTQgPgUgaAAIgJAAIgJACIgKAtQgEAXgJAIQgKAIgLAAQgKgBgIgFQgIgFgEgIQACgbARgSQAQgTAagJQAagKAeAAQAkAAAYANQAXAMAMAVQALAVAAAcQAAAYgOAWQgPAWgcAYQgcAagqAhIgaAVIgfAbIDAAAIAAA5g");
	this.shape_101.setTransform(843.325,468.775);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#333333").s().p("AgdAeQgMgMAAgSQAAgQAMgMQAMgMARgBQASABAMAMQAMAMAAAQQAAASgMAMQgMALgSABQgRgBgMgLg");
	this.shape_102.setTransform(516.025,482.925);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#333333").s().p("AhlCvIAAgOIBCgJIAAgrIABgrIAAjIIg3AGIAAgRIB8gdIAHAFIgCBLIAACgIAAArIABArIA9AJIAAAOg");
	this.shape_103.setTransform(494.375,468.875);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#333333").s().p("AgqBKQgTgMgMgTQgLgUgBgXQABgYALgSQAMgUATgMQAUgKAXgBQAYABASAKQAUAMALAUQALASAAAYQAAAXgLAUQgLATgUAMQgSALgYAAQgXAAgUgLgAgrgrQgSARAAAaQAAAaASASQASASAaABQAZgBATgSQARgSABgaQgBgagRgRQgTgTgZAAQgaAAgSATg");
	this.shape_104.setTransform(1362.35,326.9);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#333333").s().p("AhTEgIAAlRIibAAIgGgQIFwAAIAtgrIBLA+QgDAFgFACQgHADgJACQgCBGgEArQgEAsgJAYQgJAYgQAMQgOAKgVAHQgTAFgdAAQAAgUgCgPQgCgQgHgIQgHgKgMgGQgMgHgSgFIAAgGIAWABIAXABIARAAIAJAAQAEgCAEgCQAIgHAEgoQAEgmAChKIh2AAIAAE8QAAADgKAFQgIAFgRAEQgSAEgYAAgAiLhUIAAhcIiOAAIgEgRICSAAIAAhfIBqAJQgBAGgFAEQgEAFgMABIAABGIBpAAIAAhfIBrAJQAAAGgFAEQgEAFgLABIAABGIAeAAIAsg9IANALIAgAbQARAQANAOQAAAFgFACQgFADgGAAIiFAAIAABDQAAAFgLAEQgLAFgQAEQgQAEgTAAIgOAAIAAhZIhpAAIAABIQAAADgLAGQgKAEgQAEQgQADgSAAg");
	this.shape_105.setTransform(1141.65,307.25);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#333333").s().p("ACZD5QgEgOgIgKQgHgKgNgHQgMgHgZgEIAAgIIAKABIAZABIAcACIATAAQAHAAADgCQADgDAAgFIAAnJIBpAJQABAHgGAFQgFAEgLACIAAG0QAAAcgHAUQgHAUgXAMQgXALguAFQgBgVgDgPgAkREXQA+gnAsg3QAsg3AchBQgLAMgSABQgTACgTgPQAAgTgFgTQgGgSgJgPQgVAYgZAXQgYAWgbASIgFgEQAcgoAXgvQAVgwAPgyQAOgyAGgvIhcAAIgGgQIDPAAIAtg/IAOAMIAfAcIAiAeQgCAFgEACQgFACgHAAIhyAAQgHAZgKAZQgKAZgMAYIA+AAIArgsIBJBCQgDAFgFADQgGACgLABQgTBNgjBFQgjBFg+A3Qg8A2hfAigAiQg5IgVAeQAtAIATASQATAQAAATQALgdAJgfQAIgfAGggIhNAAIgTAggABACJIAAl1IBfAJQgBAGgDAEQgEAEgLABIAAFIQgBADgJAFQgJAFgOAEQgPAEgOAAg");
	this.shape_106.setTransform(1081.1,307.625);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#333333").s().p("Ag8EfIAAnrIjdAAIgFgRIGwAAIAyhBIAKAHIAXASIAeAYIAcAXQgBAFgFACQgFADgHAAIjtAAIAABnQBKAMAwAVQAvAVAZAaQAZAZAGAYQAGAZgJASQgIASgUAGQgTAGgagMQgRgfgZgfQgYgegcgdQgbgdgcgYIAAFaQAAADgJAGQgJAGgQAFQgRAFgYABg");
	this.shape_107.setTransform(1021.625,307.425);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#333333").s().p("ACeEYIAAg0Ik4AAIgXAoIhUguIAKgKIAKgKIAAiyIBoALQAAAEgFAEQgFAEgKABIAACjIBvAAIAAjwIhPAAIgZAnIhRgtIAJgKIAKgJIAAinIBnAKQgBAFgEADQgGAEgKACIAACXIBUAAIAAjpIBtALQgBAGgFAFQgEAEgMACIAADNIBZAAIAAivIBoAJQgBAGgFADQgDAEgLACIAAC5QgBADgKAEQgLAEgPADQgQADgQABIgPAAIAAgjIhZAAIAADwIB1AAIAAi6IBoAJQgBAFgEAEQgEAEgKACIAADUQAAADgLAEQgLAEgPAEQgQADgQABg");
	this.shape_108.setTransform(961.3,307.525);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#333333").s().p("AieEYQBGgaAsgpQAsgoAWg5IiMAAIgFgRICXAAQANgnAGgtQAGgtgBg0IBxAOQgBAGgFACQgEADgNABQgFAtgJAnQgJAmgOAhIA9AAIApg1IANAJIAeAZIAgAaQgBAFgFACQgEADgHAAIinAAQgWArghAhQgiAhgwAWQgxAYhDAPgADJESQgLgXgRgZQgSgYgUgXQgUgWgTgTIAFgDQBCAIAlAUQAmAVANAXQAOAXgEAVQgFAUgRAHQgHADgIAAQgMAAgPgHgAj/C3QAWgNAHgHQAHgJgBgJIAAj6IhBAAIgGgRIBJAAIAlglIBDA4QgCAEgGACQgGADgMACIAADuIAdgLIAegLIACAEIglAwQgYAdgiAlQgDAJgGAIIgLAMgAgwBVQgFgVgPgSQgOgVgRgLIAFgEQAtgFAZAKQAYAJAGAPQAHAPgGAOQgGAPgOAGQgGACgGAAQgKAAgNgGgAgWABQgGgSgPgTQgOgTgRgLIAEgEQAugGAYAIQAXAJAIAOQAHAPgFAPQgGANgPAGQgGACgGAAQgKAAgMgFgACwABIAHgsIAGgvIkoAAIgFgRICFAAIAAhMIhnAAIgFgQIBsAAIAAhWIBkAIQgBAGgEADQgEAFgKACIAAA+IAjAAIAog0IAMAKIAdAXIAfAaQgCAFgEACQgFACgGAAIiCAAIAABMIBSAAIAogoIBEBBQgDAEgFACQgGACgJAAQgRATgYAWQgYAXgYAOgAjEirQgHgdgQgbQgPgbgQgVIAFgCQA3AEAcAQQAdARAHAUQAHAUgJAQQgIARgTAFIgKABQgPAAgQgKg");
	this.shape_109.setTransform(901.925,307.65);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#333333").s().p("Ag6BiQAkgTASgYQAPgZAEgVQgOgFgRgHQgRgIgNgOQgMgOAAgWQAAgWAPgRQAQgQAagBQAQAAANAIQAOAIAJAPQAIAQABAXQgBAegKAfQgLAggYAcQgXAbgnARg");
	this.shape_110.setTransform(819.7,332.75);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#333333").s().p("AjjD8QgDgPgGgJQgFgJgKgHQgJgGgUgEIAAgIIAIABIARABIAUABIAOAAQAGAAADgCQACgCAAgFIAAh4IgcAPQgCAGgGAEQgFAFgGABIgehkIAggEIAtgGIAAh2IhCAAIgGgRIBIAAIAAiKIBnAJQgBAHgFAEQgFAFgLACIAABrIAfgyIAJAJIAYAYIAXAZIAAgyIBVAjIAIAAIAFgoIAEgtIADgqIBzASQgBAIgHAEQgGAEgLABIgXAdIgbAhIgbAeIBcAAIApgtIBPA/QgDAEgIAEQgHAEgLADIAAF4QAAADgLAGQgMAFgPAFQgQAEgQAAIgNAAIAAg0IiIAAIAAAbQgBAFgJAHQgKAGgQAGQgPAFgSAAIgNAAIAAk1IgmAZIgxAcIAACrQABAbgIATQgGAUgVALQgUALgqADIgCghgAAoDPICIAAIAAitIiIAAgAAoARICIAAIAAidIiIAAgAiBgXIArgGIAsgHIAAhiIgGAEIgIABIhJAAg");
	this.shape_111.setTransform(781.1,307.575);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#333333").s().p("AjUEdIAAkzQgSAQgSANQgSAPgTANIgGgEQAYgmAXgzQAYgzASg6QATg6ALg7IB5AkQgDAGgFADQgHAEgKAAQgOAigPAfQgQAfgSAbIAgAMQgCAEgEADQgEADgIACIAAFcQgCAEgKAGQgLAGgPAEQgQAFgRAAgAh0D2IgFgRIDNAAQAKgyAJg6IAQhzQAHg4AEgwIB1AdQgCAGgFAEQgGAEgLABQgMAngUAwQgTAwgYAzQgaAzgcAuIBCAAIAwg/IAOAMIAiAcIAkAeQgCAFgEADQgEACgIAAgAAADMQgSgDgNgXQABgjgCgtQgBgtgJgvQgIgvgTgqIAHgEQA2AxAbAsQAcAsAHAmQAIAmgHAbQgIAbgPAOQgMALgOAAIgGgBgAhnh2IgFgQIEIAAIAtg8IAPAMIAgAaIAjAdQgCAFgFACQgFACgGAAgAAqifQgDghgMgfQgMgggPgZIADgDQA8ALAeAVQAdAWAFAXQAFAYgLASQgMARgVAEIgHAAQgSAAgVgQg");
	this.shape_112.setTransform(721,307.575);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#333333").s().p("AgtEcIAAh7IjqAAIgFgRIDvAAIAAhHIhPAAIAAAIQAAAFgLAGQgLAHgRAEQgRAGgSAAIgNAAIAAkZIBdAjICMAAIAVgpIAVg0IAVg2IBpAvQgCAFgHACQgGADgKAAQgeAbghAXQghAXggARIBRAAIAmgoIBOA6IgIAGQgFAEgJACIAAC0QgBAEgLAFQgLAGgRAEQgRAFgQABIgPAAIAAgZIhQAAIAABHIBrAAIAwg7IAPALIAiAaIAlAdQgCAFgEACQgFADgHAAIjfAAIAABmQAAADgIAFQgJAEgRAFQgPAEgXAAgAAsA4IBQAAIAAhRIhQAAgAh8A4IBPAAIAAhRIhPAAgAAsgqIBQAAIAAhOIhQAAgAh8gqIBPAAIAAhOIhPAAgAhoibQgIgfgRgeQgRgggTgXIAFgEQA5AJAeATQAdASAJAXQAHAVgIARQgIASgSAEIgKACQgPAAgRgLg");
	this.shape_113.setTransform(661.35,307.55);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#333333").s().p("ACLEbIAAgzIkaAAIgZAlIhWgqIAKgLIANgKIAAi4IBrAKQgBAIgEAEQgFAEgMACIAACmIBlAAIAAjnIjuAAIgFgRIDzAAIAAh9Ii/AAIgFgRIDEAAIAAhsIBuAKQgBAHgFAEQgEAFgNABIAABRIBBAAIAwg9IAQAMIAjAbIAlAdQgBAFgFADQgFACgGAAIi4AAIAAB9IBvAAIAwg9IAPAMIAjAbIAmAeQgBAEgFADQgFADgHgBIjlAAIAADnIBhAAIAAjBIBuAJQAAAHgFAEQgEAEgMACIAADXQgBADgLAEQgKAFgRAEQgRADgSAAg");
	this.shape_114.setTransform(601.675,307.65);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#333333").s().p("AjkD8QgDgPgFgJQgFgJgJgHQgLgGgSgEIAAgIIAHABIARABIAUABIAOAAQAGAAADgCQACgCAAgFIAAh4IgdAPQgCAGgFAEQgFAFgGABIgehkIAggEIAtgGIAAh2IhCAAIgGgRIBIAAIAAiKIBnAJQgBAHgFAEQgFAFgMACIAABrIAggyIAKAJIAWAYIAYAZIAAgyIBVAjIAIAAIAFgoIAEgtIAEgqIByASQgCAIgFAEQgHAEgKABIgYAdIgcAhIgbAeIBdAAIApgtIBPA/QgDAEgIAEQgHAEgKADIAAF4QgCADgLAGQgLAFgQAFQgQAEgPAAIgNAAIAAg0IiJAAIAAAbQABAFgLAHQgJAGgQAGQgOAFgTAAIgNAAIAAk1IgmAZIgyAcIAACrQABAbgGATQgHAUgUALQgVALgpADIgEghgAAnDPICJAAIAAitIiJAAgAAnARICJAAIAAidIiJAAgAiCgXIAsgGIAsgHIAAhiIgGAEIgIABIhKAAg");
	this.shape_115.setTransform(541.1,307.575);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#333333").s().p("ACBD6QgDgOgGgLQgGgIgKgHQgKgGgUgFIAAgHIAIAAIATABIAVABIAPABQAGAAADgDQACgDAAgGIAAgnIiGAAIAABxQAAAFgKAGQgKAGgQAEQgQAGgSAAIgMAAIAAlHIBWAiIB7AAIAkgoIkZAAIgGgRICJAAIAAg5IhfAAIgGgRIBlAAIAAg2Ih1AAIgFgQIB6AAIAAhKIBoAHQAAAHgDAEQgFADgLACIAAAzIAxAAIApg3IAOAKIAeAZIAgAbQgBAEgFACQgFADgGAAIiVAAIAAA2IAiAAIAmgzIAMAKIAdAXIAeAZQgCAFgEACQgFADgGAAIh+AAIAAA5IA1AAIAsg3IANAKIAeAZIAgAbQgBAFgEACQgFADgHAAIhWAAIBMA4QgDAEgGAEQgFADgKADIAACsQAAAbgGAUQgHATgWALQgWAMgsADQAAgUgDgPgAAOB/ICGAAIAAg0IiGAAgAAOA7ICGAAIAAg0IiGAAgAj2CvQAWgMAIgJQAGgHAAgLIAAjwIhDAAIgHgRIBLAAIAlglIBEA4QgCADgHADQgGADgLACIAADUIAYgOIAYgNIADAEQgLATgVAgQgUAhgdAnQgEAPgGALQgHAKgIAFgAi8irQgIgcgPgbQgPgcgQgUIAEgDQA4AEAcARQAdAQAGAVQAHAUgIAQQgJARgSAEIgKACQgPAAgQgLg");
	this.shape_116.setTransform(481.15,307.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58,p:{x:1169.575,y:547.725}},{t:this.shape_57,p:{x:1229.825,y:547.475}},{t:this.shape_56,p:{x:1289.075,y:547.8764}},{t:this.shape_55}]}).to({state:[{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_58,p:{x:1201.625,y:307.375}},{t:this.shape_57,p:{x:1261.875,y:307.125}},{t:this.shape_56,p:{x:1321.125,y:307.5264}},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.instance_3}]},5).to({state:[]},9).wait(320));

	// bg
	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("EiLsBMwQhvAAhQhPQhPhPAAhwMAAAiRDQAAhwBPhPQBQhPBvAAMEXZAAAQBvAABPBPQBQBPAABwMAAACRDQAABwhQBPQhPBPhvAAg");
	this.shape_117.setTransform(959.9897,540.0003,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_117).wait(334));

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
		{src:"images/听辨_atlas_1.png?1690355555708", id:"听辨_atlas_1"},
		{src:"sounds/外婆的澎湖湾范唱_.mp3?1690355555760", id:"外婆的澎湖湾范唱"},
		{src:"sounds/fail.mp3?1690355555760", id:"fail"},
		{src:"sounds/victory.mp3?1690355555760", id:"victory"},
		{src:"sounds/节拍器声音_.mp3?1690355555760", id:"节拍器声音"}
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