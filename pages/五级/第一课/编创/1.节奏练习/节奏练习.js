(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"节奏练习_atlas_1", frames: [[0,205,1375,125],[0,332,1375,107],[0,106,1800,97],[0,0,1800,104]]}
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



(lib.Bitmap11111111111 = function() {
	this.initialize(ss["节奏练习_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap2111 = function() {
	this.initialize(ss["节奏练习_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.yp540101 = function() {
	this.initialize(ss["节奏练习_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.yp540102 = function() {
	this.initialize(ss["节奏练习_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("AiPCLIAAgTICHAAIAAgsIhmAAIAAgTIBmAAIAAgmIAVAAIAAAmIBiAAIAAATIhiAAIAAAsICDAAIAAATgAiCAaIgIgHQAVgOAJgPQAKgQACgRIgoAAIAAgTIAqAAIAAgDIAAgrIggAAIAAgTICPAAIAAATIgeAAIAAAuIAlAAIAAATIglAAIAABFIgUAAIAAhFIgrAAQgDAVgLAUQgKAUgXAPIgHgHgAhLhBIAAADIAqAAIAAguIgqAAgAA+ATIgEgJIAZAAIAOAAQAFAAABgCQAAAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBIAAiOIAUAAIAACOQABAJgDAFQgDAFgGADQgHACgMABIgcAAIgEgKgAAsgQIAAhqIAUAAIAABqg");
	this.shape.setTransform(204.2,23.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("ABPCBQgQgKgTgJQgSgJgSgHIAOgOIAkAQQATAIARAKQAQAJAMAIIgPAPQgLgIgRgJgAhwCKIgHgIQAbgIAUgJQATgJAMgKQAMgJAHgKIhRAAIAAgSIBZAAQADgHAAgIIABgNIAAAAIgxAAIAAgMQgPAOgTAMQgTAMgVAJIgHgJIgHgHQAdgMAXgQQAWgRARgTIhVAAIAAgSIBiAAIAHgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhoAAIAAgRIBrAAIACgOIABgMIAVABIgCAMIgCANIBuAAIAAARIhxAAIgDANIgDAMIBqAAIAAASIhwAAIgGAMIgHANICgAAIAAASIhXAAQASAUAYAQQAaARAbAIIgHAIQgEAFgCAEQgVgHgTgMQgUgMgQgPIAAANIgyAAIAAABIgBANIgCAOIBgAAIAAASIhmAAQgFAMgNANQgMANgVALQgXAMggAKIgGgIgAA2ALIgNgMQgFgHgFgIIg+AAIgKAPIgNAMIBsAAIAAAAg");
	this.shape_1.setTransform(172.35,24.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_2.setTransform(140.225,24.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("Ah/CQIAAjjIBNAAIAAg8IAVAAIAAA8IA3AAIAAg8IAVAAIAAA8IBRAAIAADiIgVAAIAAgUIjWAAIAAAVgAAvBmIA8AAIAAhJIg8AAgAgdBmIA3AAIAAhJIg3AAgAhrBmIA5AAIAAhJIg5AAgAAvAJIA8AAIAAhHIg8AAgAgdAJIA3AAIAAhHIg3AAgAhrAJIA5AAIAAhHIg5AAg");
	this.shape_3.setTransform(108.275,24.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("Ag0CFIgEgLIAcABIARAAQAEAAABgCQADgCAAgDIAAhyIhNAAIgaABQgJABgCACIgDgJIgFgKQADgBADgGIAEgNIAFgUIAEggQACgSABgSIA5gDIA4gEIA1gGQAYgEATgFIAMATIgqAJIgzAGIg1AEIg2ACQgCAWgEAWIgJApIBeAAIAAhCIAUAAIAABCIB1AAIAAAUIh1AAIAAByQAAAKgDAGQgDAFgHADQgGACgNABIghABIgEgLgAiIB1IgJgHQARgQARgUQARgVAMgWIAUAHQgIAPgMAQIgXAeIgXAZIgIgHgABtBhIgWgdIgZgcIASgJIAZAcIAXAcIASAZIgUALIgRgag");
	this.shape_4.setTransform(76.2,24.375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.6)").s().p("AAOCLIAAhiIBGAAQgRgJgOgKQgOgLgMgLIg8AAQgKAKgOALQgNALgPAJIBGAAIAABgIgVAAIAAgIIg5AAIAAAKIgUAAIAAhUIgKAGIgNAFIgEgIIgHgIQAbgKAWgNQAVgNAQgOIhQAAIAAgTIBjAAIAMgRIAKgQIhjAAIAAhVIBkAAIAABTIABgBIAVADIgIARIgMAQIBdAAQgIgFgLgFQgKgGgLgDIAMgNIARAHQAIAEAIAEIANAJIgIAIIA4AAIAAATIhYAAQAMAKAPAIQAPAJASAHQARAGARAFIgHAIIgGAIIgLgCIgJgEIAABSIgVAAIAAgIIg8AAIAAAKgAAiBuIA8AAIAAgyIg8AAgAhdBuIA5AAIAAgyIg5AAgAhjhHIA7AAIAAgvIg7AAgAAQg0IAAhVIBnAAIAABVgAAkhHIA/AAIAAgvIg/AAg");
	this.shape_5.setTransform(44.2,24.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_6.setTransform(23.85,34.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,0,0,0.6)").s().p("AgfB1QgOgFgKgHQgLgHgHgJIAOgQQAKALAOAHQAOAIAUABQAOAAALgGQALgFAGgKQAHgLAAgOQAAgOgIgLQgHgLgQgGQgQgGgaAAIAAgUQAYAAAOgGQAOgGAGgLQAGgKABgNQgBgSgKgKQgLgLgTAAQgOAAgNAGQgMAHgKAKIgPgRQANgMAQgHQARgIATAAQATAAAOAHQAQAGAIANQAIANABATQgBAWgKAOQgMAOgTAHIAAABQAOADALAHQAMAIAGAMQAHANAAAQQAAAVgKAPQgKAPgQAIQgRAHgUAAQgSAAgOgEg");
	this.shape_7.setTransform(10.35,24.625);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#74A6C3").s().p("AiPCLIAAgTICHAAIAAgsIhmAAIAAgTIBmAAIAAgmIAVAAIAAAmIBiAAIAAATIhiAAIAAAsICDAAIAAATgAiCAaIgIgHQAVgOAJgPQAKgQACgRIgoAAIAAgTIAqAAIAAgDIAAgrIggAAIAAgTICPAAIAAATIgeAAIAAAuIAlAAIAAATIglAAIAABFIgUAAIAAhFIgrAAQgDAVgLAUQgKAUgXAPIgHgHgAhLhBIAAADIAqAAIAAguIgqAAgAA+ATIgEgJIAZAAIAOAAQAFAAABgCQAAAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBIAAiOIAUAAIAACOQABAJgDAFQgDAFgGADQgHACgMABIgcAAIgEgKgAAsgQIAAhqIAUAAIAABqg");
	this.shape_8.setTransform(204.2,23.725);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#74A6C3").s().p("ABPCBQgQgKgTgJQgSgJgSgHIAOgOIAkAQQATAIARAKQAQAJAMAIIgPAPQgLgIgRgJgAhwCKIgHgIQAbgIAUgJQATgJAMgKQAMgJAHgKIhRAAIAAgSIBZAAQADgHAAgIIABgNIAAAAIgxAAIAAgMQgPAOgTAMQgTAMgVAJIgHgJIgHgHQAdgMAXgQQAWgRARgTIhVAAIAAgSIBiAAIAHgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhoAAIAAgRIBrAAIACgOIABgMIAVABIgCAMIgCANIBuAAIAAARIhxAAIgDANIgDAMIBqAAIAAASIhwAAIgGAMIgHANICgAAIAAASIhXAAQASAUAYAQQAaARAbAIIgHAIQgEAFgCAEQgVgHgTgMQgUgMgQgPIAAANIgyAAIAAABIgBANIgCAOIBgAAIAAASIhmAAQgFAMgNANQgMANgVALQgXAMggAKIgGgIgAA2ALIgNgMQgFgHgFgIIg+AAIgKAPIgNAMIBsAAIAAAAg");
	this.shape_9.setTransform(172.35,24.275);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#74A6C3").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_10.setTransform(140.225,24.175);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#74A6C3").s().p("Ah/CQIAAjjIBNAAIAAg8IAVAAIAAA8IA3AAIAAg8IAVAAIAAA8IBRAAIAADiIgVAAIAAgUIjWAAIAAAVgAAvBmIA8AAIAAhJIg8AAgAgdBmIA3AAIAAhJIg3AAgAhrBmIA5AAIAAhJIg5AAgAAvAJIA8AAIAAhHIg8AAgAgdAJIA3AAIAAhHIg3AAgAhrAJIA5AAIAAhHIg5AAg");
	this.shape_11.setTransform(108.275,24.375);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#74A6C3").s().p("Ag0CFIgEgLIAcABIARAAQAEAAABgCQADgCAAgDIAAhyIhNAAIgaABQgJABgCACIgDgJIgFgKQADgBADgGIAEgNIAFgUIAEggQACgSABgSIA5gDIA4gEIA1gGQAYgEATgFIAMATIgqAJIgzAGIg1AEIg2ACQgCAWgEAWIgJApIBeAAIAAhCIAUAAIAABCIB1AAIAAAUIh1AAIAAByQAAAKgDAGQgDAFgHADQgGACgNABIghABIgEgLgAiIB1IgJgHQARgQARgUQARgVAMgWIAUAHQgIAPgMAQIgXAeIgXAZIgIgHgABtBhIgWgdIgZgcIASgJIAZAcIAXAcIASAZIgUALIgRgag");
	this.shape_12.setTransform(76.2,24.375);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#74A6C3").s().p("AAOCLIAAhiIBGAAQgRgJgOgKQgOgLgMgLIg8AAQgKAKgOALQgNALgPAJIBGAAIAABgIgVAAIAAgIIg5AAIAAAKIgUAAIAAhUIgKAGIgNAFIgEgIIgHgIQAbgKAWgNQAVgNAQgOIhQAAIAAgTIBjAAIAMgRIAKgQIhjAAIAAhVIBkAAIAABTIABgBIAVADIgIARIgMAQIBdAAQgIgFgLgFQgKgGgLgDIAMgNIARAHQAIAEAIAEIANAJIgIAIIA4AAIAAATIhYAAQAMAKAPAIQAPAJASAHQARAGARAFIgHAIIgGAIIgLgCIgJgEIAABSIgVAAIAAgIIg8AAIAAAKgAAiBuIA8AAIAAgyIg8AAgAhdBuIA5AAIAAgyIg5AAgAhjhHIA7AAIAAgvIg7AAgAAQg0IAAhVIBnAAIAABVgAAkhHIA/AAIAAgvIg/AAg");
	this.shape_13.setTransform(44.2,24.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#74A6C3").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_14.setTransform(23.85,34.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#74A6C3").s().p("AgfB1QgOgFgKgHQgLgHgHgJIAOgQQAKALAOAHQAOAIAUABQAOAAALgGQALgFAGgKQAHgLAAgOQAAgOgIgLQgHgLgQgGQgQgGgaAAIAAgUQAYAAAOgGQAOgGAGgLQAGgKABgNQgBgSgKgKQgLgLgTAAQgOAAgNAGQgMAHgKAKIgPgRQANgMAQgHQARgIATAAQATAAAOAHQAQAGAIANQAIANABATQgBAWgKAOQgMAOgTAHIAAABQAOADALAHQAMAIAGAMQAHANAAAQQAAAVgKAPQgKAPgQAIQgRAHgUAAQgSAAgOgEg");
	this.shape_15.setTransform(10.35,24.625);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("Ax9EUIAAonMAj7AAAIAAIng");
	this.shape_16.setTransform(118.1,23.875);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},1).to({state:[{t:this.shape_16}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-3.7,233.1,55.2);


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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("AgHCRIAAiCICPAAIAACBIgVAAIAAgPIhmAAIAAAQgAANBuIBmAAIAAhLIhmAAgAiKBoIAggGIAogJIApgKIADASIg8APIg0ANgAiGA1IgDgKQAFgBAGgGIAPgOIAOgRIAWgcIgiAEIgRADIgHADIgDgKIgDgKQAEgBAEgFIAKgOQAEgGAIgOQAIgOAKgTQAJgSAHgUIAUAJQgMAagOAaQgPAZgOAVIAxgFIAKgRIALgRIARAKQgRAbgTAaQgTAZgVAVIBNgOIgBAJIABAJIg2ALIggAHIgQAEIgGADIgEgJgAgVgFIgIgIQAWgKANgPQAOgOAGgTQAHgSADgVIg3AAIAAgTICgAAIAAADIAAAGIgFA5QgCAWgCALQgDAMgEAEQgEAEgFACQgEACgGABIgQAAIgUgBQAAgEgCgGIgEgKIAUACIANAAIAHgBIADgCQADgDADgJQABgJACgRIADgtIg+AAQgDAYgJAWQgHAVgPARQgPARgYALIgFgHg");
	this.shape.setTransform(171.6,24.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AAwCTIAAinIAWAAIAACngAh/CKIgJgHQAWgMANgNQAOgOAGgOQAHgOACgPQACgOAAgOIAAgpIAWAAIAAApQAAAQgDARQgCARgHAQQgHAQgOAPQgPAPgXANIgIgIgAiOgRIgHgKQAegKAdgTQAcgSAYgXQAWgYAPgZIARAMIgDAEIgDAEQAPAUAXATQAWATAbAPQAaAPAbAIIgIAJIgHAKQgagJgZgPQgZgPgWgTQgVgTgQgWQgRAWgWAUQgXATgYAQQgZAQgZAKIgGgKg");
	this.shape_1.setTransform(140.35,24.175);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AiPCLIAAgTICIAAIAAgsIhnAAIAAgTIBnAAIAAgmIAUAAIAAAmIBiAAIAAATIhiAAIAAAsICDAAIAAATgAiDAaIgHgHQAVgOAKgPQAIgQADgRIgoAAIAAgTIApAAIAAgDIAAgrIgeAAIAAgTICOAAIAAATIgeAAIAAAuIAkAAIAAATIgkAAIAABFIgUAAIAAhFIgrAAQgDAVgKAUQgLAUgXAPIgIgHgAhLhBIAAADIAqAAIAAguIgqAAgAA/ATIgFgJIAZAAIAPAAQADAAABgCQABAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBIAAiOIAUAAIAACOQAAAJgCAFQgCAFgIADQgGACgMABIgcAAIgDgKgAAtgQIAAhqIATAAIAABqg");
	this.shape_2.setTransform(108.2,23.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQARAJAMAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQADgHAAgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBiAAIAHgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBqAAIACgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQARAUAYAQQAZARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgRgPIAAANIgyAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMggAKIgGgIgAA2ALIgNgMQgGgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_3.setTransform(76.35,24.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_4.setTransform(44.225,24.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_5.setTransform(23.85,34.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.6)").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_6.setTransform(10.625,24.425);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#74A6C3").s().p("AgHCRIAAiCICPAAIAACBIgVAAIAAgPIhmAAIAAAQgAANBuIBmAAIAAhLIhmAAgAiKBoIAggGIAogJIApgKIADASIg8APIg0ANgAiGA1IgDgKQAFgBAGgGIAPgOIAOgRIAWgcIgiAEIgRADIgHADIgDgKIgDgKQAEgBAEgFIAKgOQAEgGAIgOQAIgOAKgTQAJgSAHgUIAUAJQgMAagOAaQgPAZgOAVIAxgFIAKgRIALgRIARAKQgRAbgTAaQgTAZgVAVIBNgOIgBAJIABAJIg2ALIggAHIgQAEIgGADIgEgJgAgVgFIgIgIQAWgKANgPQAOgOAGgTQAHgSADgVIg3AAIAAgTICgAAIAAADIAAAGIgFA5QgCAWgCALQgDAMgEAEQgEAEgFACQgEACgGABIgQAAIgUgBQAAgEgCgGIgEgKIAUACIANAAIAHgBIADgCQADgDADgJQABgJACgRIADgtIg+AAQgDAYgJAWQgHAVgPARQgPARgYALIgFgHg");
	this.shape_7.setTransform(171.6,24.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#74A6C3").s().p("AAwCTIAAinIAWAAIAACngAh/CKIgJgHQAWgMANgNQAOgOAGgOQAHgOACgPQACgOAAgOIAAgpIAWAAIAAApQAAAQgDARQgCARgHAQQgHAQgOAPQgPAPgXANIgIgIgAiOgRIgHgKQAegKAdgTQAcgSAYgXQAWgYAPgZIARAMIgDAEIgDAEQAPAUAXATQAWATAbAPQAaAPAbAIIgIAJIgHAKQgagJgZgPQgZgPgWgTQgVgTgQgWQgRAWgWAUQgXATgYAQQgZAQgZAKIgGgKg");
	this.shape_8.setTransform(140.35,24.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#74A6C3").s().p("AiPCLIAAgTICIAAIAAgsIhnAAIAAgTIBnAAIAAgmIAUAAIAAAmIBiAAIAAATIhiAAIAAAsICDAAIAAATgAiDAaIgHgHQAVgOAKgPQAIgQADgRIgoAAIAAgTIApAAIAAgDIAAgrIgeAAIAAgTICOAAIAAATIgeAAIAAAuIAkAAIAAATIgkAAIAABFIgUAAIAAhFIgrAAQgDAVgKAUQgLAUgXAPIgIgHgAhLhBIAAADIAqAAIAAguIgqAAgAA/ATIgFgJIAZAAIAPAAQADAAABgCQABAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBIAAiOIAUAAIAACOQAAAJgCAFQgCAFgIADQgGACgMABIgcAAIgDgKgAAtgQIAAhqIATAAIAABqg");
	this.shape_9.setTransform(108.2,23.725);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#74A6C3").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQARAJAMAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQADgHAAgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBiAAIAHgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBqAAIACgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQARAUAYAQQAZARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgRgPIAAANIgyAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMggAKIgGgIgAA2ALIgNgMQgGgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_10.setTransform(76.35,24.275);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#74A6C3").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_11.setTransform(44.225,24.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#74A6C3").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_12.setTransform(23.85,34.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#74A6C3").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_13.setTransform(10.625,24.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AxoEUIAAonMAjRAAAIAAIng");
	this.shape_14.setTransform(112.85,22.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},1).to({state:[{t:this.shape_14}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-4.8,225.7,55.199999999999996);


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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("AiPCLIAAgTICIAAIAAgsIhmAAIAAgTIBmAAIAAgmIAUAAIAAAmIBhAAIAAATIhhAAIAAAsICDAAIAAATgAiDAaIgHgHQAVgOAKgPQAIgQADgRIgoAAIAAgTIApAAIAAgDIAAgrIgeAAIAAgTICOAAIAAATIgeAAIAAAuIAkAAIAAATIgkAAIAABFIgUAAIAAhFIgrAAQgCAVgLAUQgLAUgXAPIgIgHgAhLhBIAAADIAqAAIAAguIgqAAgAA/ATIgFgJIAZAAIAPAAQADAAABgCQABAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBIAAiOIAUAAIAACOQAAAJgCAFQgCAFgIADQgGACgMABIgdAAIgCgKgAAtgQIAAhqIATAAIAABqg");
	this.shape.setTransform(172.2,23.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQASAJALAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQACgHABgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBrAAIABgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQAQAUAaAQQAYARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMghAKIgFgIgAA2ALIgMgMQgHgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_1.setTransform(140.35,24.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_2.setTransform(108.225,24.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AhCCMIgKgGQAQgYAIgdQAIgeACgdQADgdgBgZIAAhkICtAAIAABEIiYAAIAAAXICYAAIAAARIhPAAQgIANgKALQgJAKgJAJIBTgFIgKgNIgMgKIAQgHIAQAQIAPARQAGAJAEAIIgQAIIgDgGIgEgHIgrAEIAAAhIBAAAIAAARIhAAAIAAAlIBOAAIAAASIi1AAIAAgSIBSAAIAAglIg/AAIAAgRIA/AAIAAggIggADIgQACIgGACIgDgJIgEgKQADAAAEgDIAHgHIAMgNQAIgJAIgOIgxAAQAAAagDAeQgDAegJAeQgIAdgQAZIgIgGgAgThRICDAAIAAghIiDAAgAiHCQIgDgKIgDgKIASAAIALAAQABAAABAAQAAAAABAAQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgBAAgBIAAhVIgjAMIgGgUIATgGIAWgGIAAhJIgkAAIAAgUIAkAAIAAhBIAUAAIAABBIAkAAIAAAUIgkAAIAABCIAigKIADASIglANIAABbQAAAKgCAFQgDAFgFACQgFADgKAAIgPABIgJAAg");
	this.shape_3.setTransform(76.025,24.225);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("Ag8CSQAAgEgDgEIgEgJIAWABIARAAIAKgBQAEAAACgBQABgBAAAAQAAAAAAgBQABgBAAAAQAAgBAAgBIAAgWIiCAAIAAgPICCAAIAAgYIhvAAIAAgPIBvAAIAAgVIgxACIgwABIgBgIIgDgHIA3gBIA3gDIAygEIApgFIANAOQgTADgYADIgyAEIAAAWIByAAIAAAPIhyAAIAAAYICDAAIAAAPIiDAAIAAAWQAAAKgDAEQgDAEgHACQgHADgOAAIgQAAIgUAAgAhXgFIAAg5ICxAAIAAA5gAhDgUICIAAIAAgbIiIAAgABygnIAAgsIjiAAIAAAsIgUAAIAAg/IA3AAIgLgQIgMgRIASgHIAOARIALAQIgOAHIA9AAIAAgrIAUAAIAAArIA7AAIgNgFIAPgSIANgSIAVAIIgPASIgPAPIA7AAIAAA/g");
	this.shape_4.setTransform(44.225,24.1875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_5.setTransform(23.85,34.675);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.6)").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_6.setTransform(11.15,24.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#74A6C3").s().p("AiPCLIAAgTICIAAIAAgsIhmAAIAAgTIBmAAIAAgmIAUAAIAAAmIBhAAIAAATIhhAAIAAAsICDAAIAAATgAiDAaIgHgHQAVgOAKgPQAIgQADgRIgoAAIAAgTIApAAIAAgDIAAgrIgeAAIAAgTICOAAIAAATIgeAAIAAAuIAkAAIAAATIgkAAIAABFIgUAAIAAhFIgrAAQgCAVgLAUQgLAUgXAPIgIgHgAhLhBIAAADIAqAAIAAguIgqAAgAA/ATIgFgJIAZAAIAPAAQADAAABgCQABAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBIAAiOIAUAAIAACOQAAAJgCAFQgCAFgIADQgGACgMABIgdAAIgCgKgAAtgQIAAhqIATAAIAABqg");
	this.shape_7.setTransform(172.2,23.725);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#74A6C3").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQASAJALAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQACgHABgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBhAAIAIgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBrAAIABgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQAQAUAaAQQAYARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMghAKIgFgIgAA2ALIgMgMQgHgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_8.setTransform(140.35,24.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#74A6C3").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_9.setTransform(108.225,24.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#74A6C3").s().p("AhCCMIgKgGQAQgYAIgdQAIgeACgdQADgdgBgZIAAhkICtAAIAABEIiYAAIAAAXICYAAIAAARIhPAAQgIANgKALQgJAKgJAJIBTgFIgKgNIgMgKIAQgHIAQAQIAPARQAGAJAEAIIgQAIIgDgGIgEgHIgrAEIAAAhIBAAAIAAARIhAAAIAAAlIBOAAIAAASIi1AAIAAgSIBSAAIAAglIg/AAIAAgRIA/AAIAAggIggADIgQACIgGACIgDgJIgEgKQADAAAEgDIAHgHIAMgNQAIgJAIgOIgxAAQAAAagDAeQgDAegJAeQgIAdgQAZIgIgGgAgThRICDAAIAAghIiDAAgAiHCQIgDgKIgDgKIASAAIALAAQABAAABAAQAAAAABAAQAAAAABgBQAAAAABAAQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgBAAgBIAAhVIgjAMIgGgUIATgGIAWgGIAAhJIgkAAIAAgUIAkAAIAAhBIAUAAIAABBIAkAAIAAAUIgkAAIAABCIAigKIADASIglANIAABbQAAAKgCAFQgDAFgFACQgFADgKAAIgPABIgJAAg");
	this.shape_10.setTransform(76.025,24.225);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#74A6C3").s().p("Ag8CSQAAgEgDgEIgEgJIAWABIARAAIAKgBQAEAAACgBQABgBAAAAQAAAAAAgBQABgBAAAAQAAgBAAgBIAAgWIiCAAIAAgPICCAAIAAgYIhvAAIAAgPIBvAAIAAgVIgxACIgwABIgBgIIgDgHIA3gBIA3gDIAygEIApgFIANAOQgTADgYADIgyAEIAAAWIByAAIAAAPIhyAAIAAAYICDAAIAAAPIiDAAIAAAWQAAAKgDAEQgDAEgHACQgHADgOAAIgQAAIgUAAgAhXgFIAAg5ICxAAIAAA5gAhDgUICIAAIAAgbIiIAAgABygnIAAgsIjiAAIAAAsIgUAAIAAg/IA3AAIgLgQIgMgRIASgHIAOARIALAQIgOAHIA9AAIAAgrIAUAAIAAArIA7AAIgNgFIAPgSIANgSIAVAIIgPASIgPAPIA7AAIAAA/g");
	this.shape_11.setTransform(44.225,24.1875);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#74A6C3").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_12.setTransform(23.85,34.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#74A6C3").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_13.setTransform(11.15,24.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("Av7EUIAAonIf3AAIAAIng");
	this.shape_14.setTransform(105.2,20.375);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},1).to({state:[{t:this.shape_14}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-7.2,207.2,55.2);


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
p.nominalBounds = new cjs.Rectangle(-22.4,-12.6,129.4,129.3);


// stage content:
(lib.节奏练习 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:6,m2:34,m3:77,m4:126,m5:174,m6:222,m7:270,m8:319,m9:367,m10:425,lnav2:472,lnav3:478,m11:484,m12:570,m13:618,m14:666,m15:714,m16:762,m17:801,m18:850};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,6,33,34,76,77,125,126,173,174,221,222,269,270,318,319,366,367,424,425,470,478,484,568,570,616,618,664,666,712,714,760,762,799,801,848,850,896];
	this.streamSoundSymbolsList[6] = [{id:"_4编创1课1",startFrame:6,endFrame:34,loop:1,offset:0}];
	this.streamSoundSymbolsList[34] = [{id:"_4编创1课2",startFrame:34,endFrame:77,loop:1,offset:0}];
	this.streamSoundSymbolsList[77] = [{id:"_4编创1课3",startFrame:77,endFrame:126,loop:1,offset:0}];
	this.streamSoundSymbolsList[126] = [{id:"_4编创1课4",startFrame:126,endFrame:174,loop:1,offset:0}];
	this.streamSoundSymbolsList[174] = [{id:"_4编创1课5",startFrame:174,endFrame:222,loop:1,offset:0}];
	this.streamSoundSymbolsList[222] = [{id:"_4编创1课6",startFrame:222,endFrame:270,loop:1,offset:0}];
	this.streamSoundSymbolsList[270] = [{id:"_4编创1课7",startFrame:270,endFrame:319,loop:1,offset:0}];
	this.streamSoundSymbolsList[319] = [{id:"_4编创1课8",startFrame:319,endFrame:367,loop:1,offset:0}];
	this.streamSoundSymbolsList[367] = [{id:"_4编创1课9",startFrame:367,endFrame:425,loop:1,offset:0}];
	this.streamSoundSymbolsList[425] = [{id:"_4编创1课10",startFrame:425,endFrame:472,loop:1,offset:0}];
	this.streamSoundSymbolsList[484] = [{id:"_4编创1课11mp3复制",startFrame:484,endFrame:570,loop:1,offset:0}];
	this.streamSoundSymbolsList[570] = [{id:"_4编创1课12",startFrame:570,endFrame:618,loop:1,offset:0}];
	this.streamSoundSymbolsList[618] = [{id:"_4编创1课13",startFrame:618,endFrame:666,loop:1,offset:0}];
	this.streamSoundSymbolsList[666] = [{id:"_4编创1课14",startFrame:666,endFrame:714,loop:1,offset:0}];
	this.streamSoundSymbolsList[714] = [{id:"_4编创1课15",startFrame:714,endFrame:762,loop:1,offset:0}];
	this.streamSoundSymbolsList[762] = [{id:"_4编创1课16",startFrame:762,endFrame:801,loop:1,offset:0}];
	this.streamSoundSymbolsList[801] = [{id:"_4编创1课17",startFrame:801,endFrame:850,loop:1,offset:0}];
	this.streamSoundSymbolsList[850] = [{id:"_4编创1课18",startFrame:850,endFrame:897,loop:1,offset:0}];
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
		
		
		_this.m3.on('click', function(){
		
		_this.gotoAndPlay('m3');
			
		});
		
		
		_this.m4.on('click', function(){
		
		_this.gotoAndPlay('m4');
			
		});
		
		
		_this.m5.on('click', function(){
		
		_this.gotoAndPlay('m5');
			
		});
		
		
		_this.m6.on('click', function(){
		
		_this.gotoAndPlay('m6');
			
		});
		
		
		_this.m7.on('click', function(){
		
		_this.gotoAndPlay('m7');
			
		});
		
		
		_this.m8.on('click', function(){
		
		_this.gotoAndPlay('m8');
			
		});
		
		
		_this.m9.on('click', function(){
		
		_this.gotoAndPlay('m9');
			
		});
		
		
		_this.m10.on('click', function(){
		
		_this.gotoAndPlay('m10');
			
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
	this.frame_6 = function() {
		var soundInstance = playSound("_4编创1课1",0);
		this.InsertIntoSoundStreamData(soundInstance,6,34,1);
	}
	this.frame_33 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_34 = function() {
		var soundInstance = playSound("_4编创1课2",0);
		this.InsertIntoSoundStreamData(soundInstance,34,77,1);
	}
	this.frame_76 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_77 = function() {
		var soundInstance = playSound("_4编创1课3",0);
		this.InsertIntoSoundStreamData(soundInstance,77,126,1);
	}
	this.frame_125 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_126 = function() {
		var soundInstance = playSound("_4编创1课4",0);
		this.InsertIntoSoundStreamData(soundInstance,126,174,1);
	}
	this.frame_173 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_174 = function() {
		var soundInstance = playSound("_4编创1课5",0);
		this.InsertIntoSoundStreamData(soundInstance,174,222,1);
	}
	this.frame_221 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_222 = function() {
		var soundInstance = playSound("_4编创1课6",0);
		this.InsertIntoSoundStreamData(soundInstance,222,270,1);
	}
	this.frame_269 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_270 = function() {
		var soundInstance = playSound("_4编创1课7",0);
		this.InsertIntoSoundStreamData(soundInstance,270,319,1);
	}
	this.frame_318 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_319 = function() {
		var soundInstance = playSound("_4编创1课8",0);
		this.InsertIntoSoundStreamData(soundInstance,319,367,1);
	}
	this.frame_366 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_367 = function() {
		var soundInstance = playSound("_4编创1课9",0);
		this.InsertIntoSoundStreamData(soundInstance,367,425,1);
	}
	this.frame_424 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_425 = function() {
		var soundInstance = playSound("_4编创1课10",0);
		this.InsertIntoSoundStreamData(soundInstance,425,472,1);
	}
	this.frame_470 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_478 = function() {
		var _this = this;
		
		
		
		_this.m11.on('click', function(){
		
		_this.gotoAndPlay('m11');
			
		});
		
		
		_this.m12.on('click', function(){
		
		_this.gotoAndPlay('m12');
			
		});
		
		
		_this.m13.on('click', function(){
		
		_this.gotoAndPlay('m13');
			
		});
		
		
		_this.m14.on('click', function(){
		
		_this.gotoAndPlay('m14');
			
		});
		
		
		_this.m15.on('click', function(){
		
		_this.gotoAndPlay('m15');
			
		});
		
		
		_this.m16.on('click', function(){
		
		_this.gotoAndPlay('m16');
			
		});
		
		_this.m17.on('click', function(){
		
		_this.gotoAndPlay('m17');
			
		});
		
		
		_this.m18.on('click', function(){
		
		_this.gotoAndPlay('m18');
			
		});
	}
	this.frame_484 = function() {
		var soundInstance = playSound("_4编创1课11mp3复制",0);
		this.InsertIntoSoundStreamData(soundInstance,484,570,1);
		var _this = this;
		
		
		_this.m1stop.on('click', function(){
		
		_this.gotoAndStop('lnav3');
			
		});
	}
	this.frame_568 = function() {
		this.gotoAndStop('lnav3');
	}
	this.frame_570 = function() {
		var soundInstance = playSound("_4编创1课12",0);
		this.InsertIntoSoundStreamData(soundInstance,570,618,1);
	}
	this.frame_616 = function() {
		this.gotoAndStop('lnav3');
	}
	this.frame_618 = function() {
		var soundInstance = playSound("_4编创1课13",0);
		this.InsertIntoSoundStreamData(soundInstance,618,666,1);
	}
	this.frame_664 = function() {
		this.gotoAndStop('lnav3');
	}
	this.frame_666 = function() {
		var soundInstance = playSound("_4编创1课14",0);
		this.InsertIntoSoundStreamData(soundInstance,666,714,1);
	}
	this.frame_712 = function() {
		this.gotoAndStop('lnav3');
	}
	this.frame_714 = function() {
		var soundInstance = playSound("_4编创1课15",0);
		this.InsertIntoSoundStreamData(soundInstance,714,762,1);
	}
	this.frame_760 = function() {
		this.gotoAndStop('lnav3');
	}
	this.frame_762 = function() {
		var soundInstance = playSound("_4编创1课16",0);
		this.InsertIntoSoundStreamData(soundInstance,762,801,1);
	}
	this.frame_799 = function() {
		this.gotoAndStop('lnav3');
	}
	this.frame_801 = function() {
		var soundInstance = playSound("_4编创1课17",0);
		this.InsertIntoSoundStreamData(soundInstance,801,850,1);
	}
	this.frame_848 = function() {
		this.gotoAndStop('lnav3');
	}
	this.frame_850 = function() {
		var soundInstance = playSound("_4编创1课18",0);
		this.InsertIntoSoundStreamData(soundInstance,850,897,1);
	}
	this.frame_896 = function() {
		this.gotoAndStop('lnav3');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(6).call(this.frame_6).wait(27).call(this.frame_33).wait(1).call(this.frame_34).wait(42).call(this.frame_76).wait(1).call(this.frame_77).wait(48).call(this.frame_125).wait(1).call(this.frame_126).wait(47).call(this.frame_173).wait(1).call(this.frame_174).wait(47).call(this.frame_221).wait(1).call(this.frame_222).wait(47).call(this.frame_269).wait(1).call(this.frame_270).wait(48).call(this.frame_318).wait(1).call(this.frame_319).wait(47).call(this.frame_366).wait(1).call(this.frame_367).wait(57).call(this.frame_424).wait(1).call(this.frame_425).wait(45).call(this.frame_470).wait(8).call(this.frame_478).wait(6).call(this.frame_484).wait(84).call(this.frame_568).wait(2).call(this.frame_570).wait(46).call(this.frame_616).wait(2).call(this.frame_618).wait(46).call(this.frame_664).wait(2).call(this.frame_666).wait(46).call(this.frame_712).wait(2).call(this.frame_714).wait(46).call(this.frame_760).wait(2).call(this.frame_762).wait(37).call(this.frame_799).wait(2).call(this.frame_801).wait(47).call(this.frame_848).wait(2).call(this.frame_850).wait(46).call(this.frame_896).wait(1));

	// leftnav_on
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#74A6C3").s().p("AiPCLIAAgTICIAAIAAgsIhmAAIAAgTIBmAAIAAgmIAUAAIAAAmIBhAAIAAATIhhAAIAAAsICDAAIAAATgAiDAaIgHgHQAVgOAKgPQAIgQADgRIgoAAIAAgTIApAAIAAgDIAAgrIgeAAIAAgTICOAAIAAATIgeAAIAAAuIAkAAIAAATIgkAAIAABFIgUAAIAAhFIgrAAQgCAVgLAUQgLAUgXAPIgIgHgAhLhBIAAADIAqAAIAAguIgqAAgAA/ATIgFgJIAZAAIAPAAQADAAABgCQABAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBIAAiOIAUAAIAACOQAAAJgCAFQgCAFgIADQgGACgMABIgdAAIgCgKgAAtgQIAAhqIATAAIAABqg");
	this.shape.setTransform(274.8,442.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#74A6C3").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQASAJALAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQACgHABgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBiAAIAHgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBrAAIABgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQAQAUAaAQQAYARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgQgPIAAANIgzAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMghAKIgFgIgAA2ALIgMgMQgHgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_1.setTransform(242.95,442.825);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#74A6C3").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_2.setTransform(210.825,442.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#74A6C3").s().p("AhCCMIgKgGQAQgYAIgdQAIgeACgdQADgdgBgZIAAhkICtAAIAABEIiYAAIAAAXICYAAIAAARIhPAAQgIANgKALQgJAKgJAJIBTgFIgKgNIgMgKIAQgHIAQAQIAPARQAGAJAEAIIgQAIIgDgGIgEgHIgrAEIAAAhIBAAAIAAARIhAAAIAAAlIBOAAIAAASIi1AAIAAgSIBSAAIAAglIg/AAIAAgRIA/AAIAAggIggADIgQACIgGACIgDgJIgEgKQADAAAEgDIAHgHIAMgNQAIgJAIgOIgxAAQAAAagDAeQgDAegJAeQgIAdgQAZIgIgGgAgThRICDAAIAAghIiDAAgAiHCQIgDgKIgDgKIASAAIALAAQABAAABAAQAAAAABAAQAAAAABgBQAAAAABAAQAAgBAAAAQABAAAAgBQAAAAAAgBQAAgBAAgBIAAhVIgjAMIgGgUIATgGIAWgGIAAhJIgkAAIAAgUIAkAAIAAhBIAUAAIAABBIAkAAIAAAUIgkAAIAABCIAigKIADASIglANIAABbQAAAKgCAFQgDAFgFACQgFADgKAAIgPABIgJAAg");
	this.shape_3.setTransform(178.625,442.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#74A6C3").s().p("Ag8CSQAAgEgDgEIgEgJIAWABIARAAIAKgBQAEAAACgBQABgBAAAAQAAAAAAgBQABgBAAAAQAAgBAAgBIAAgWIiCAAIAAgPICCAAIAAgYIhvAAIAAgPIBvAAIAAgVIgxACIgwABIgBgIIgDgHIA3gBIA3gDIAygEIApgFIANAOQgTADgYADIgyAEIAAAWIByAAIAAAPIhyAAIAAAYICDAAIAAAPIiDAAIAAAWQAAAKgDAEQgDAEgHACQgHADgOAAIgQAAIgUAAgAhXgFIAAg5ICxAAIAAA5gAhDgUICIAAIAAgbIiIAAgABygnIAAgsIjiAAIAAAsIgUAAIAAg/IA3AAIgLgQIgMgRIASgHIAOARIALAQIgOAHIA9AAIAAgrIAUAAIAAArIA7AAIgNgFIAPgSIANgSIAVAIIgPASIgPAPIA7AAIAAA/g");
	this.shape_4.setTransform(146.825,442.7375);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#74A6C3").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_5.setTransform(126.45,453.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#74A6C3").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgRQAPgDAMgEQALgDAKgGIASAAIAADUIAwAAIAAAVg");
	this.shape_6.setTransform(113.75,443.2);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#74A6C3").s().p("AgHCRIAAiCICPAAIAACBIgUAAIAAgPIhnAAIAAAQgAANBuIBnAAIAAhLIhnAAgAiKBoIAggGIAogJIApgKIADASIg8APIg0ANgAiGA1IgDgKQAFgBAGgGIAPgOIAOgRIAWgcIgiAEIgRADIgHADIgDgKIgDgKQAEgBAEgFIAKgOQAEgGAIgOQAIgOAKgTQAJgSAHgUIAUAJQgMAagOAaQgPAZgOAVIAxgFIAKgRIALgRIARAKQgRAbgTAaQgTAZgVAVIBNgOIgBAJIABAJIg2ALIggAHIgQAEIgGADIgEgJgAgVgFIgIgIQAWgKANgPQAOgOAGgTQAHgSADgVIg2AAIAAgTICfAAIAAADIAAAGIgFA5QgCAWgCALQgDAMgEAEQgEAEgFACQgEACgGABIgQAAIgUgBQAAgEgCgGIgEgKIAUACIANAAIAHgBIADgCQADgDADgJQABgJACgRIADgtIg+AAQgDAYgJAWQgHAVgPARQgPARgYALIgFgHg");
	this.shape_7.setTransform(274.2,506.975);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#74A6C3").s().p("AAwCTIAAinIAWAAIAACngAh/CKIgJgHQAWgMANgNQAOgOAGgOQAHgOACgPQACgOAAgOIAAgpIAWAAIAAApQAAAQgDARQgCARgHAQQgHAQgOAPQgPAPgXANIgIgIgAiOgRIgHgKQAegKAdgTQAcgSAYgXQAWgYAPgZIARAMIgDAEIgDAEQAPAUAXATQAWATAbAPQAaAPAbAIIgIAJIgHAKQgagJgZgPQgZgPgWgTQgVgTgQgWQgRAWgWAUQgXATgYAQQgZAQgZAKIgGgKg");
	this.shape_8.setTransform(242.95,506.925);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#74A6C3").s().p("AiPCLIAAgTICIAAIAAgsIhnAAIAAgTIBnAAIAAgmIAUAAIAAAmIBhAAIAAATIhhAAIAAAsICDAAIAAATgAiDAaIgHgHQAVgOAKgPQAIgQADgRIgoAAIAAgTIApAAIAAgDIAAgrIgeAAIAAgTICOAAIAAATIgeAAIAAAuIAkAAIAAATIgkAAIAABFIgUAAIAAhFIgrAAQgDAVgKAUQgLAUgXAPIgIgHgAhLhBIAAADIAqAAIAAguIgqAAgAA/ATIgFgJIAZAAIAPAAQADAAABgCQABAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBIAAiOIAUAAIAACOQAAAJgCAFQgCAFgIADQgGACgMABIgdAAIgCgKgAAtgQIAAhqIATAAIAABqg");
	this.shape_9.setTransform(210.8,506.475);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#74A6C3").s().p("ABQCBQgRgKgTgJQgSgJgSgHIAOgOIAkAQQATAIAQAKQARAJAMAIIgPAPQgLgIgQgJgAhwCKIgHgIQAcgIATgJQATgJAMgKQAMgJAGgKIhRAAIAAgSIBaAAQADgHAAgIIABgNIAAAAIgyAAIAAgMQgPAOgSAMQgSAMgWAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBiAAIAHgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhnAAIAAgRIBqAAIACgOIABgMIAUABIgBAMIgBANIBtAAIAAARIhxAAIgDANIgCAMIBpAAIAAASIhwAAIgGAMIgGANICeAAIAAASIhVAAQARAUAYAQQAZARAcAIIgHAIQgEAFgCAEQgVgHgTgMQgTgMgRgPIAAANIgyAAIAAABIgBANIgCAOIBfAAIAAASIhlAAQgFAMgMANQgNANgWALQgWAMggAKIgGgIgAA2ALIgNgMQgGgHgEgIIg+AAIgLAPIgMAMIBsAAIAAAAg");
	this.shape_10.setTransform(178.95,507.025);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#74A6C3").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_11.setTransform(113.225,507.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#74A6C3").s().p("AiPCLIAAgTICHAAIAAgsIhmAAIAAgTIBmAAIAAgmIAVAAIAAAmIBiAAIAAATIhiAAIAAAsICDAAIAAATgAiCAaIgIgHQAVgOAJgPQAKgQACgRIgoAAIAAgTIAqAAIAAgDIAAgrIggAAIAAgTICPAAIAAATIgeAAIAAAuIAkAAIAAATIgkAAIAABFIgUAAIAAhFIgrAAQgDAVgLAUQgKAUgXAPIgHgHgAhLhBIAAADIAqAAIAAguIgqAAgAA+ATIgEgJIAZAAIAOAAQAFAAABgCQAAAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBIAAiOIAUAAIAACOQABAJgDAFQgDAFgGADQgHACgMABIgcAAIgEgKgAAsgQIAAhqIAUAAIAABqg");
	this.shape_12.setTransform(306.8,570.675);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#74A6C3").s().p("ABPCBQgQgKgTgJQgSgJgSgHIAOgOIAkAQQATAIARAKQAQAJAMAIIgPAPQgLgIgRgJgAhwCKIgHgIQAbgIAUgJQATgJAMgKQAMgJAHgKIhRAAIAAgSIBZAAQADgHAAgIIABgNIAAAAIgxAAIAAgMQgPAOgTAMQgTAMgVAJIgHgJIgHgHQAdgMAXgQQAWgRARgTIhVAAIAAgSIBiAAIAHgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhoAAIAAgRIBrAAIACgOIABgMIAVABIgCAMIgCANIBuAAIAAARIhxAAIgDANIgDAMIBqAAIAAASIhwAAIgGAMIgHANICfAAIAAASIhWAAQASAUAYAQQAaARAbAIIgHAIQgEAFgCAEQgVgHgTgMQgUgMgQgPIAAANIgyAAIAAABIgBANIgCAOIBgAAIAAASIhmAAQgFAMgNANQgMANgVALQgXAMggAKIgGgIgAA2ALIgNgMQgFgHgFgIIg+AAIgKAPIgNAMIBsAAIAAAAg");
	this.shape_13.setTransform(274.95,571.225);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#74A6C3").s().p("Ah/CQIAAjjIBNAAIAAg8IAVAAIAAA8IA3AAIAAg8IAVAAIAAA8IBRAAIAADiIgVAAIAAgUIjWAAIAAAVgAAvBmIA8AAIAAhJIg8AAgAgdBmIA3AAIAAhJIg3AAgAhrBmIA5AAIAAhJIg5AAgAAvAJIA8AAIAAhHIg8AAgAgdAJIA3AAIAAhHIg3AAgAhrAJIA5AAIAAhHIg5AAg");
	this.shape_14.setTransform(210.875,571.325);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#74A6C3").s().p("Ag0CFIgEgLIAcABIARAAQAEAAABgCQADgCAAgDIAAhyIhNAAIgaABQgJABgCACIgDgJIgFgKQADgBADgGIAEgNIAFgUIAEggQACgSABgSIA5gDIA4gEIA1gGQAYgEATgFIAMATIgqAJIgzAGIg1AEIg2ACQgCAWgEAWIgJApIBeAAIAAhCIAUAAIAABCIB1AAIAAAUIh1AAIAAByQAAAKgDAGQgDAFgHADQgGACgNABIghABIgEgLgAiIB1IgJgHQARgQARgUQARgVANgWIATAHQgIAPgMAQIgXAeIgXAZIgIgHgABtBhIgWgdIgZgcIASgJIAZAcIAXAcIASAZIgUALIgRgag");
	this.shape_15.setTransform(178.8,571.325);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#74A6C3").s().p("AAOCLIAAhiIBGAAQgRgJgOgKQgOgLgMgLIg8AAQgKAKgOALQgNALgPAJIBGAAIAABgIgVAAIAAgIIg5AAIAAAKIgUAAIAAhTIgKAFIgNAFIgEgIIgHgIQAbgKAWgNQAVgNAQgOIhQAAIAAgTIBjAAIAMgRIAKgQIhjAAIAAhWIBkAAIAABUIABgCIAVAFIgIAQIgMAQIBdAAQgIgFgLgGQgKgFgLgEIAMgLIARAGQAIAEAIAEIANAJIgIAIIA4AAIAAATIhYAAQAMAKAPAIQAPAJASAHQARAHARAEIgHAIIgGAIIgLgCIgJgEIAABSIgVAAIAAgIIg8AAIAAAKgAAiBuIA8AAIAAgyIg8AAgAhdBuIA5AAIAAgyIg5AAgAhjhHIA7AAIAAgwIg7AAgAAQg0IAAhWIBnAAIAABWgAAkhHIA/AAIAAgwIg/AAg");
	this.shape_16.setTransform(146.8,571.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#74A6C3").s().p("AgfB1QgOgFgKgHQgLgHgHgJIAOgQQAKALAOAHQAOAIAUABQAOAAALgGQALgFAGgKQAHgLAAgOQAAgOgHgLQgIgLgQgGQgQgGgaAAIAAgUQAYAAAOgGQAOgGAGgLQAGgKABgNQgBgSgKgKQgLgLgTAAQgOAAgNAGQgMAHgKAKIgPgRQANgMAQgHQARgIATAAQATAAAOAHQAQAGAIANQAIANABATQgBAWgKAOQgMAOgTAHIAAABQAOADALAHQAMAIAGAMQAHANAAAQQAAAVgKAPQgKAPgQAIQgRAHgUAAQgSAAgOgEg");
	this.shape_17.setTransform(112.95,571.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5,p:{y:453.225}},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2,p:{x:210.825,y:442.725}},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_11},{t:this.shape_5,p:{y:517.425}},{t:this.shape_2,p:{x:146.825,y:506.925}},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]},472).to({state:[{t:this.shape_17},{t:this.shape_5,p:{y:581.625}},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_2,p:{x:242.825,y:571.125}},{t:this.shape_13},{t:this.shape_12}]},6).wait(419));

	// leftnav
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#333333").s().p("ABCEnQABgYgEgRQgEgRgIgJQgJgMgSgJQgRgJgZgGIAAgHIAiACIAiACIAaABQAIAAAHgDQAHgCAFgFQAOgMAKgtQAJgsAHhNQg6AkhUArQhTArh1A1QgDAGgEAFQgFAFgGACIg9hrQAcgGAsgMIBlgaIB3ghQBAgRBDgVIAFhaIAFhrImhAAIgGgSIGfAAIA0g1IBQBKQgDAFgIAEQgHAEgMACQgEBvgFBRQgFBPgIA2QgIA2gMAhQgMAhgRAQQgVAWgaAJQgZAKgkAAIgEgBgAgSgbQgbgYgkgZQgjgZgngVQgmgWgjgNIADgHQBMgLA0AFQA1AGAfAQQAfAQAOAVQANAVgCAUQgDAUgQAMQgOALgWAAIgGAAg");
	this.shape_18.setTransform(326.625,295.4012);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#333333").s().p("AA6EMQgDgRgIgJQgHgKgLgGQgNgIgXgEIAAgIIAJABIAZABIAaABIASAAQAIAAACgDQADgDgBgGIAAiwIhCAAIgWAZIhPgqIAIgHIAJgHQAIgQAIgWIAQgrIghAAIgGgSIAsAAIAPgrIANgqIhYAAIgFgSIBiAAIAPgzIAKgoIBsAbQgDAHgFAEQgHAFgNAAIgHAWIgJAaIBQAAIAvhAIAQAMIAjAdIAkAeQgCAGgFADQgEACgHAAIjJAAIgOAqIgPArIATAAIAngsIBRA+QgEAEgGAEQgGADgKACIAABIIAlgwIAOALIAgAaIAjAcQgCAFgFADQgFACgGAAIhkAAIAAC6QAAAcgHAUQgIAUgWANQgYAMgvAEQgBgVgEgPgAAjgpIgPAsIA/AAIAAheIgeAAIgSAygAkuChQAZgCAlgHQAmgGAsgKQAsgKArgLIABAFQgbAagqAhQgpAjg9AoQgCAGgGAFQgFAGgGABgAh+ECQAfgkAbgzQAcg1APg9IBsArQgDAGgGAEQgHADgKgBQgjA5gsAlQguAkg0AWgADeDfQgCgngOgnQgNgngRghIAGgDQA7AVAdAbQAcAbAFAbQAGAbgLATQgLASgVADIgFABQgTAAgUgRgAkxAnIAEgBIALgDQAGgDAEgDQARgNATgXQATgaATgeIgYANIgaAOIgEACIgEACIgmhaIAIgCQAIgCAFgFQAKgKAMgUQALgVALgZQAKgZAIgZQAIgZADgTIBuAvQgCAEgFADQgEAEgJgBQgQAVgVAWQgUAXgYAUQgXAWgXAQIAhAAIAmgBIAPggIAKgdIBpAxQgDAFgGADQgGACgKAAQgTAagcAdQgcAeghAcQggAaggAWIBRAAIBdgCIAAAHQgbANgwAVQgwAVhAAWIgGAGIgHAEg");
	this.shape_19.setTransform(261.2,294.6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#333333").s().p("AkNEqQBGgXAqgZQApgZAWgcQAUgcAIggIiVAAIgEgSICdAAQADgRABgRIABgmIhIAAIgDgKQghAdgqAYQgqAYg0ATIgGgGQA3gkAngrQAngrAbguIiTAAIgFgSICiAAIAPgfIANggIiDAAIgFgSICPAAIAJgcIAIgdIivAAIgFgSIC4AAIAJgtIAGgtIB9AZQgBAGgGAFQgGAFgMgBIgFAZIgGAZIB3AAIAug4IAPALIAhAZIAjAcQgBAFgFADQgFACgIAAIjsAAIgJAdIgKAcICKAAIApgyIANAKIAfAWIAgAaQgBAFgFADQgFACgHAAIj2AAIgPAhQgJAPgKAPIDcAAIAvg6IAPALIAhAaIAlAcQgBAGgFACQgGADgHAAIi2AAQAXAaAiAPQAhAOAmAHQAmAIAlABIgBAKQgbASgPAVQgRAVgCAaQg2gXgogsQgogsgZg4IiRAAQgOAUgRARQgQARgSARICLAAIAngvIANAJIAcAUIAeAZQgBAFgFADQgEADgIgBIhDAAIgCAmQgCARgFARIA5AAIAqg2IANAKIAfAYIAiAcQgCAFgFADQgFADgGgBIikAAIgEANIgGALQBaAKA0ARQAzASAUATQAVAUgCASQgCATgQALQgPAMgWAAQgWgBgTgQQgSgYgkgeQgkgdg2gcQgQAcggAXQghAZg3ASQg3AUhSAPg");
	this.shape_20.setTransform(197.45,294.25);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#333333").s().p("AhZEzIAAloIilAAIgGgRIGIAAIAwgtIBQBDQgDAEgGADQgGADgKABQgCBMgFAuQgEAvgKAZQgJAZgRANQgQALgVAHQgVAGgfAAQAAgVgCgRQgDgQgGgJQgIgLgNgGQgNgIgTgFIAAgHIAYACIAYABIASABQAHgBAEgBQAEgBADgDQAJgHAEgqQAFgqAChPIh/AAIAAFSQAAADgKAGQgIAEgTAFQgSAFgbgBgAiVhZIAAhjIiXAAIgFgSICcAAIAAhlIBxAJQAAAHgFAEQgFAFgNACIAABKIBxAAIAAhlIByAJQgBAHgFAEQgEAFgMACIAABKIAgAAIAuhBIAPAMIAhAdQATARAPAPQgBAFgFACQgFADgHAAIiOAAIAABHQgBAGgLAEQgLAGgRADQgSAFgUAAIgOAAIAAhfIhxAAIAABNQAAAEgLAFQgLAGgRADQgRAEgTAAg");
	this.shape_21.setTransform(133.525,294.1);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(153,153,153,0.498)").s().p("AAgBoIAAgxQgJALgNALQgMAKgNAHIgFgFIgGgFQAOgGAMgJQAMgJAIgKIAMAEIAAgrIgWACIgWABIgBgFIgDgGIAjgDIAigDIAbgFIANAKIgWAEIgZADIAAAYIAEAFIADAEIAUgNIARgMIAKAIIgTANIgVAMQAKAKANAHQAMAHAOAFQgDABgCAEIgEAGQgQgGgNgKQgOgKgLgMIAAA0gAhCBoIgNgBIgBgHIgDgGIANABIAJAAIAEgBIADgCQADgCACgJIAEgYIADgpIg3AAIADgYIADgdIACgcIANABIgCAXIgCAXIgCAWIAYAAIAEgbIACgeIADgeIg0AAIAAgOIBCAAIgCAiIgEAkIgDAfIAGAAIALAAIAAACIAAAEQgCAegCATQgCATgDAKQgCAKgEADIgGAFIgIACIgKAAgAhsAxIAagGIAegIIABANIgcAIIgaAHgAgSA0IgFgFIAVgMQAKgHAHgHIANAEQgJAJgLAIQgKAJgLAFIgFgEgAAZgFIAAgOIgaAEIgYADIgDgMIAOgCIAAhBIgLAAIAAgMIBGAAIAAAMIgIAAIAAA7IAIgBIAAALIgIABIAAAQgAgCgbIAbgEIAAgNIgbAAgAgCg2IAbAAIAAgOIgbAAgAgChOIAbAAIAAgNIgbAAgAAxgPIgFgFQAHgFAHgGQAHgHAGgJIgLgNIgLgMIAJgHIAKALIAKALIAHgPQADgHACgIIgmAAIAAgNIApAAIADAAIACAAIAIACQgDAPgFAMQgFANgGALIAMAOIAJAMIgKAJIgIgLIgKgNIgNAPQgHAGgIAFIgDgFg");
	this.shape_22.setTransform(189.925,374.775);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(153,153,153,0.498)").s().p("AhjBlIgFgIQBDgIArgYQAsgZAVgqIAPAHQgXAtguAbQgsAZhFALIgDgIgAgFA5IAAhLIhhAAIAAgQIAlAAIAAg2IAQAAIAAA2IAuAAIAAhJIAPAAIAAAaIBHAAIAAAPIhHAAIAAAgIBdAAIAAAQIheAAIAABLgAhYAyIgGgFQAOgLAMgOQANgOAJgNIAPAEQgKAQgOAQQgNAQgOALIgGgGg");
	this.shape_23.setTransform(166.075,374.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(153,153,153,0.498)").s().p("AgBBlIgHgFQAPgPAKgWQAJgVAEgZQAGgZAAgbIgiAAIAAgQIAjAAIABgZIAAgaIAQAAIgBAaIAAAZIA1AAIAAAJIgDA9IgDAqIgDAaQgDAJgDADQgEAFgEACIgJACIgOAAIgTgBIgCgHIgDgIIATABIANAAIAFAAIAEgDQADgEADgNIAEgoIADhEIgmAAQgCAdgEAbQgFAbgKAXQgKAXgSARIgEgGgAhjBGIgDgIQACgBADgEIAGgLIAFgPIAHgXIAIgaIgiAAIAAgPIBpAAIAAAPIg3AAQgFASgGAUIgOAkIA8gMIgHgUIgIgTIAOgDIAJAXIAJAYIAFAUIgNAFIgCgIIgDgJIgoAJIgYAFIgLAEIgGACIgCgHgAhghMIAAgOIBbAAIAAAOg");
	this.shape_24.setTransform(142.25,374.525);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(153,153,153,0.498)").s().p("AhqBiIAAgQICJAAIAEgTIACgVIhsAAIAHgbIAGgfIAGgiIAGgfIg0AAIAAgPIDGAAIAAAPIiBAAIgEATIgDAVIBVAAIADgBIAMABIgDAbIgEAgIgEAgIgFAgIA7AAIAAAQgAgsABIgGAaIBZAAIAEgcIADgZIhWAAIgEAbg");
	this.shape_25.setTransform(118.3,374.6);

	this.lnav3_btn = new lib.lnav3();
	this.lnav3_btn.name = "lnav3_btn";
	this.lnav3_btn.setTransform(190.6,570.95,1,1,0,0,0,88,24);
	new cjs.ButtonHelper(this.lnav3_btn, 0, 1, 2, false, new lib.lnav3(), 3);

	this.lnav2_btn = new lib.lnav2();
	this.lnav2_btn.name = "lnav2_btn";
	this.lnav2_btn.setTransform(149.8,506.75,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav2_btn, 0, 1, 2, false, new lib.lnav2(), 3);

	this.lnav1_btn = new lib.lnav1();
	this.lnav1_btn.name = "lnav1_btn";
	this.lnav1_btn.setTransform(102.6,418.55);
	new cjs.ButtonHelper(this.lnav1_btn, 0, 1, 2, false, new lib.lnav1(), 3);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#CCCCCC").ss(1,1,1).p("AzVAAMAmrAAA");
	this.shape_26.setTransform(230.075,350.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.lnav1_btn},{t:this.lnav2_btn},{t:this.lnav3_btn},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18}]}).wait(897));

	// 音频停止
	this.instance = new lib.音频停止();
	this.instance.setTransform(602.25,458.05,0.6953,0.6952);
	this.instance._off = true;

	this.m1stop = new lib.音频停止();
	this.m1stop.name = "m1stop";
	this.m1stop.setTransform(758.45,458.2,0.6953,0.6952);
	this.m1stop._off = true;
	new cjs.ButtonHelper(this.m1stop, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(6).to({_off:false},0).wait(28).to({x:877.55,y:457.9},0).wait(43).to({x:1133.8},0).wait(49).to({x:1388.15},0).wait(48).to({x:1650.3},0).wait(48).to({x:602.65,y:799.2},0).wait(48).to({x:877.95,y:799.05},0).wait(49).to({x:1134.2},0).wait(48).to({x:1388.55},0).wait(58).to({x:1650.7},0).to({_off:true},47).wait(425));
	this.timeline.addTween(cjs.Tween.get(this.m1stop).wait(484).to({_off:false},0).wait(86).to({x:1134.6,y:458.3},0).wait(48).to({x:1388.75,y:458.2},0).wait(48).to({x:1651},0).wait(48).to({x:660.95,y:799.05},0).wait(48).to({x:979.9,y:799.1},0).wait(39).to({x:1316.25,y:799.15},0).wait(49).to({x:1641.4,y:798.95},0).wait(47));

	// 音频播放标
	this.m10 = new lib.音频播放标();
	this.m10.name = "m10";
	this.m10.setTransform(1646.7,801.85,0.6963,0.6963);
	new cjs.ButtonHelper(this.m10, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m9 = new lib.音频播放标();
	this.m9.name = "m9";
	this.m9.setTransform(1384.55,801.85,0.6963,0.6963);
	new cjs.ButtonHelper(this.m9, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m8 = new lib.音频播放标();
	this.m8.name = "m8";
	this.m8.setTransform(1130.2,801.85,0.6963,0.6963);
	new cjs.ButtonHelper(this.m8, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m7 = new lib.音频播放标();
	this.m7.name = "m7";
	this.m7.setTransform(873.95,801.85,0.6963,0.6963);
	new cjs.ButtonHelper(this.m7, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m6 = new lib.音频播放标();
	this.m6.name = "m6";
	this.m6.setTransform(598.15,801.85,0.6963,0.6963);
	new cjs.ButtonHelper(this.m6, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m5 = new lib.音频播放标();
	this.m5.name = "m5";
	this.m5.setTransform(1646.7,461,0.6963,0.6963);
	new cjs.ButtonHelper(this.m5, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m4 = new lib.音频播放标();
	this.m4.name = "m4";
	this.m4.setTransform(1384.55,461,0.6963,0.6963);
	new cjs.ButtonHelper(this.m4, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m3 = new lib.音频播放标();
	this.m3.name = "m3";
	this.m3.setTransform(1130.2,461,0.6963,0.6963);
	new cjs.ButtonHelper(this.m3, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m2 = new lib.音频播放标();
	this.m2.name = "m2";
	this.m2.setTransform(873.95,461,0.6963,0.6963);
	new cjs.ButtonHelper(this.m2, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m1 = new lib.音频播放标();
	this.m1.name = "m1";
	this.m1.setTransform(598.15,461,0.6963,0.6963);
	new cjs.ButtonHelper(this.m1, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m17 = new lib.音频播放标();
	this.m17.name = "m17";
	this.m17.setTransform(1311.9,801.85,0.6963,0.6963);
	new cjs.ButtonHelper(this.m17, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m18 = new lib.音频播放标();
	this.m18.name = "m18";
	this.m18.setTransform(1637.2,801.85,0.6963,0.6963);
	new cjs.ButtonHelper(this.m18, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m16 = new lib.音频播放标();
	this.m16.name = "m16";
	this.m16.setTransform(975.6,801.85,0.6963,0.6963);
	new cjs.ButtonHelper(this.m16, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m15 = new lib.音频播放标();
	this.m15.name = "m15";
	this.m15.setTransform(656.65,801.85,0.6963,0.6963);
	new cjs.ButtonHelper(this.m15, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m14 = new lib.音频播放标();
	this.m14.name = "m14";
	this.m14.setTransform(1646.7,461,0.6963,0.6963);
	new cjs.ButtonHelper(this.m14, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m13 = new lib.音频播放标();
	this.m13.name = "m13";
	this.m13.setTransform(1384.55,461,0.6963,0.6963);
	new cjs.ButtonHelper(this.m13, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m12 = new lib.音频播放标();
	this.m12.name = "m12";
	this.m12.setTransform(1130.2,461,0.6963,0.6963);
	new cjs.ButtonHelper(this.m12, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m11 = new lib.音频播放标();
	this.m11.name = "m11";
	this.m11.setTransform(754.15,461,0.6963,0.6963);
	new cjs.ButtonHelper(this.m11, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m1},{t:this.m2},{t:this.m3},{t:this.m4},{t:this.m5},{t:this.m6},{t:this.m7},{t:this.m8},{t:this.m9},{t:this.m10}]}).to({state:[{t:this.m2},{t:this.m3},{t:this.m4},{t:this.m5},{t:this.m6},{t:this.m7},{t:this.m8},{t:this.m9},{t:this.m10}]},6).to({state:[{t:this.m1},{t:this.m3},{t:this.m4},{t:this.m5},{t:this.m6},{t:this.m7},{t:this.m8},{t:this.m9},{t:this.m10}]},28).to({state:[{t:this.m1},{t:this.m2},{t:this.m4},{t:this.m5},{t:this.m6},{t:this.m7},{t:this.m8},{t:this.m9},{t:this.m10}]},43).to({state:[{t:this.m1},{t:this.m2},{t:this.m3},{t:this.m5},{t:this.m6},{t:this.m7},{t:this.m8},{t:this.m9},{t:this.m10}]},49).to({state:[{t:this.m1},{t:this.m2},{t:this.m3},{t:this.m4},{t:this.m6},{t:this.m7},{t:this.m8},{t:this.m9},{t:this.m10}]},48).to({state:[{t:this.m1},{t:this.m2},{t:this.m3},{t:this.m4},{t:this.m5},{t:this.m7},{t:this.m8},{t:this.m9},{t:this.m10}]},48).to({state:[{t:this.m1},{t:this.m2},{t:this.m3},{t:this.m4},{t:this.m5},{t:this.m6},{t:this.m8},{t:this.m9},{t:this.m10}]},48).to({state:[{t:this.m1},{t:this.m2},{t:this.m3},{t:this.m4},{t:this.m5},{t:this.m6},{t:this.m7},{t:this.m9},{t:this.m10}]},49).to({state:[{t:this.m1},{t:this.m2},{t:this.m3},{t:this.m4},{t:this.m5},{t:this.m6},{t:this.m7},{t:this.m8},{t:this.m10}]},48).to({state:[{t:this.m1},{t:this.m2},{t:this.m3},{t:this.m4},{t:this.m5},{t:this.m6},{t:this.m7},{t:this.m8},{t:this.m9}]},58).to({state:[]},47).to({state:[{t:this.m11},{t:this.m12},{t:this.m13},{t:this.m14},{t:this.m15},{t:this.m16},{t:this.m18},{t:this.m17}]},6).to({state:[{t:this.m12},{t:this.m13},{t:this.m14},{t:this.m15},{t:this.m16},{t:this.m18},{t:this.m17}]},6).to({state:[{t:this.m11},{t:this.m13},{t:this.m14},{t:this.m15},{t:this.m16},{t:this.m18},{t:this.m17}]},86).to({state:[{t:this.m11},{t:this.m12},{t:this.m14},{t:this.m15},{t:this.m16},{t:this.m18},{t:this.m17}]},48).to({state:[{t:this.m11},{t:this.m12},{t:this.m13},{t:this.m15},{t:this.m16},{t:this.m18},{t:this.m17}]},48).to({state:[{t:this.m11},{t:this.m12},{t:this.m13},{t:this.m14},{t:this.m15},{t:this.m16},{t:this.m18},{t:this.m17}]},48).to({state:[{t:this.m11},{t:this.m12},{t:this.m13},{t:this.m14},{t:this.m15},{t:this.m16},{t:this.m18},{t:this.m17}]},48).to({state:[{t:this.m11},{t:this.m12},{t:this.m13},{t:this.m14},{t:this.m15},{t:this.m16},{t:this.m18},{t:this.m17}]},39).to({state:[{t:this.m11},{t:this.m12},{t:this.m13},{t:this.m14},{t:this.m15},{t:this.m16},{t:this.m18},{t:this.m17}]},49).wait(47));

	// 不动内容
	this.instance_1 = new lib.yp540102();
	this.instance_1.setTransform(452,655,0.7639,0.7639);

	this.instance_2 = new lib.yp540101();
	this.instance_2.setTransform(452,319,0.7639,0.7639);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#333333").s().p("AgiA9QgQgKgJgQQgKgQAAgTQAAgTAKgPQAJgQAQgKQAQgJASAAQAUAAAPAJQAQAKAKAQQAJAPAAATQAAATgJAQQgKAQgQAKQgPAJgUAAQgSAAgQgJgAglglQgPAPAAAWQAAAWAPAQQAPAPAWAAQAXAAAPgPQAPgQAAgWQAAgWgPgPQgPgPgXAAQgWAAgPAPg");
	this.shape_27.setTransform(1682.525,662.675);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#333333").s().p("AgbDlIAAi/IiRAAIAAAkQgBADgIADQgIAEgLABIgFAAIAAjhIAkARICOAAIAAhpIAyAGQAAAFgEAEQgEADgJACIAABVICMAAIATgVIApAgQgDADgFADQgGADgHABIAACrQAAABgFADIgLAEQgHACgGAAIgFAAIAAgpIiRAAIAACyQgBAEgHAEQgJAFgKAAgAAGAXICRAAIAAiDIiRAAgAisAXICRAAIAAiDIiRAAg");
	this.shape_28.setTransform(1652.35,646.575);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#333333").s().p("AjNDiIAAlmIAkARIBTAAIAAhuIAxAFQgBAGgDAEQgFADgJACIAABaIBWAAIAAhuIAyAFQgBAGgEAEQgEADgJACIAABaIBUAAIATgVIAoAgQgDADgFACQgGADgIACIAAExQgBADgIAFQgJAEgJAAIgFAAIAAgjIlFAAIAAAaQgBAEgHAEQgIAEgLAAgAA/CtIBZAAIAAiFIhZAAgAg3CtIBWAAIAAiFIhWAAgAitCtIBXAAIAAiFIhXAAgAA/AZIBZAAIAAh9IhZAAgAg3AZIBWAAIAAh9IhWAAgAitAZIBXAAIAAh9IhXAAg");
	this.shape_29.setTransform(1605.25,646.775);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#333333").s().p("AgYDWQgCgGgGgEQgFgEgMgDQgLgEgSgCIAAgIIAJAAIAVADIAWABIAQABQAHgBADgCQACgDgBgFIAAi5IiDAAIgPAPIgjgYIAHgEIAJgFIAIgpIAHgwIAHguIAEgnIAxANIBYgLIBSgNQAngIAcgHIAiAkQgDADgHgBQgGAAgJgEQgjAFgsAEQgsAEguACIhfADIgGAwIgJA2IgJAyICEAAIAAh5IAyAGQgBAFgDAEQgEADgJABIAABmIB5AAIAXgdIAIAGIARANIASAQQgBAEgDADQgEABgFAAIiuAAIAAC7QAAANgDALQgEAJgMAGQgMAHgXACQgBgIgDgFgAjjDEQAXgSAXgaQAXgbAVgfQAWgfAQgkIAuAZQgCADgFACQgFADgIgCQgeAwgnAlQgmAkgpAYgADGC8QgJgYgUgbQgUgbgXgbQgXgbgVgUIAGgEQAzAcAfAaQAeAaANAWQAOAXAAAPQABAPgIAEQgDADgEAAQgGAAgJgGg");
	this.shape_30.setTransform(1557.0553,646.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#333333").s().p("AisDhIAAiVIgcALIggAJIgEgGQAzgUAmgaQAmgbAbgdIiOAAIgEgOICeAAQAMgPAKgPIARgdQgFADgGACIgMACIgFAAIAAgQIhYAAIAAAaQgBADgHAEQgIADgKABIgFAAIAAiiIAhAOIBRAAIARgSIAnAdQgCADgGADQgFADgIABIAABgIAtARQgCAFgFACQgFACgGgBIgMASIgOATIC8AAIAZgeIAIAGIARAOIATAQQgBAEgEACQgDACgGAAIigAAQAeAXAtAQQAsARA/AHIgBAGQgHADgFAIQgEAJgCAMIgOgEIgPgEQgCACgFACIgLAEIAABxQAAACgEADQgFACgGACQgGACgFAAIgFAAIAAgZIhXAAIAAAYQAAACgJAEQgHAEgLAAIgEAAIAAiqIAhAQIBQAAIAFgGQgggPgYgTQgYgTgSgVIhSAAQgUAUgaAUQgbATghARIAIAEIBLAAIASgUIAnAeIgIAGIgNAEIAABwQgBACgEACIgKAEQgGACgGAAIgEAAIAAgWIhTAAIAAAaQgBADgHAEQgIADgKABgAA1CtIBXAAIAAhbIhXAAgAiNCtIBTAAIAAhbIhTAAgAiThsIBYAAIAAhSIhYAAgABbggQgFgLgLgNQgLgNgMgLIgKAEQgFACgGAAIgFAAIAAiRIAiAOIBVAAIASgTIAoAeQgDADgFADQgGADgIACIAABnQAAACgEACIgKAEQgHACgEAAIgGAAIAAgYIhdAAIAAAHQAgAHAOALQAOAMABALQABAKgIAFQgDADgFAAQgFAAgHgEgAA5hsIBdAAIAAhSIhdAAg");
	this.shape_31.setTransform(1510.45,647.325);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#333333").s().p("AgrDRQgEgGgGgEQgHgEgMgEQgNgEgVgCIAAgIIALABIAXACIAaACIASAAQAIAAADgDQADgCAAgHIAAjFIjRAAIgEgPIDVAAIAAiFIirAAIgEgPIE1AAIAaghIAIAHIATAPIAVASQgBAEgEACQgDACgFAAIiiAAIAACFICGAAIAaghIAJAHIATAPIAVASQgBAEgDACQgEACgFAAIjEAAIAADHQAAANgEALQgEALgMAHQgNAHgaADQAAgIgDgHg");
	this.shape_32.setTransform(1463.425,647.125);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#333333").s().p("AjYDZQAdglAOgrQAOgrAEguQAFgvgBgvIAAioIAnAPIELAAIASgWIAsAiQgDADgGADIgOAFIAAFdQAAANgEAKQgDAKgLAHQgMAGgYACQgBgIgDgGQgDgGgEgEQgGgEgLgDQgLgEgRgCIAAgIIAJABIATACIAWABIAPABQAGAAADgDQADgDgBgGIAAh1IiAAAIAACbQAAADgHAEQgIADgMABIgFAAIAAimIh9AAQgGAvgTArQgTAsgoAkgAAgAlICAAAIAAhoIiAAAgAh3guIAAApQgBAVgDAVIB7AAIAAhoIh3AAgAAghSICAAAIAAhmIiAAAgAh3hSIB3AAIAAhmIh3AAg");
	this.shape_33.setTransform(1415.05,647.225);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#333333").s().p("AjdDaQBYgPBHgYQBFgXA3gkQA3gkAog2IicAAIgXAQIgaARQAjAKAQAOQARAPACAOQADANgHAHQgIAHgMgHQgGgSgRgRQgRgSgUgMQgdAQghAPQghAOgjALIgFgHQAwgUAqgaQArgbAjgdQAhgcAWgbIA3ANQgBAEgGACQgFACgLAAIgSAQIgTAPICOAAIAWgSIAlAhQgDADgGABIgPACQgsA6g6AmQg7AmhMAXQhOAXhlAMgAjdAhQBKgUA+gYQA9gaAxgiQAxgjAlgtIijAAIgSAMIgTAMQAiAKARAOQAQANADAMQADAMgHAGQgHAGgMgGQgIgPgQgQQgRgQgSgMQgXANgZAMQgZAMgbAKIgEgHQAmgTAjgZQAjgZAdgbQAcgbASgZIA0APQgBAEgFACQgGACgKAAIgTATQgLAKgMAJICZAAIAUgTIAkAiQgDACgGACIgOABQgpAxg1AkQg1AkhEAZQhEAZhWARg");
	this.shape_34.setTransform(1369.825,646.675);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#333333").s().p("AjlDZQA8gTAogUQAogWAYgYQgPgNgMgOQgMgPgKgSIAHgGQALAQANANQAOANAQAKQAMgQAIgRQAIgRAEgVIhnAAIAAASQAAAEgIADQgJAEgKABIgFAAIAAjWIAjAQIBrAAIAAg6IjLAAIgEgPIFzAAIAagfIAIAHIASAOIAUARQgBAEgDACQgDACgGAAIi/AAIAAA6IBrAAIASgUIApAfQgCADgGACQgGAEgHABIAACiQgBADgEACIgLAEQgGACgGAAIgFAAIAAgaIh3AAQgEAZgKAUQgKAVgQAUQAxAaBCAMQBDAOBNADIgBAFQgLADgHAHQgHAHgCANQhNgHg/gSQg+gRgtggQgbAYgsATQgtAUhBAOgAASgYIgBAdQgBAOgCAOIB0AAIAAg/IhwAAgAh8AhIBqAAIADgbIABgdIAAgHIhuAAgAASgtIBwAAIAAg9IhwAAgAh8gtIBuAAIAAg9IhuAAg");
	this.shape_35.setTransform(1322.525,647.15);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#333333").s().p("AjdDdIgEgOIDSAAIAAhdIieAAIgEgOICiAAIAAhDIAzAFQgBAGgEADQgEAEgJABIAAAwIBlAAIAYgeIAIAGIARAOIATAQQgBAFgDABQgEACgGAAIibAAIAABdICNAAIAZggIAIAHIASAOIATARQAAAEgEACQgDACgFAAgAjlAyQAZgUAPgUQAPgUAHgWQAIgWACgWIhAAAIgDgPIBFAAIABgNIAAgMIAAg7Ig1AAIgFgPIC+AAIAWgbIAGAGIAPANIASAPQgBAEgDACQgDACgGAAIg5AAIAABUIAPAAIAWgdIAHAGIAQAOIASAQQgCAEgCACQgEACgFAAIhBAAIAAB0QABABgIAEQgHAEgMAAIgFAAIAAh9IhAAAQgDAXgKAYQgJAYgVAVQgTAWgjASgAh8h1IAAANIgBANIA/AAIAAhUIg+AAgACbAqQgCgFgEgFQgEgEgJgDQgJgDgNgCIAAgIIAGABIAPABIASABIAKABQAGAAACgCQADgCgBgFIAAjjIAyAFQgCAFgEAEQgEADgIABIAADTQAAANgEAKQgCAJgKAGQgLAGgUACIgDgNgABAgKIAAi7IAxAFQAAAFgEADQgEAEgJABIAACfQgBADgHAEQgIADgJAAg");
	this.shape_36.setTransform(1275.25,646.075);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#333333").s().p("AjMDdQA9gQAkgSQAjgSATgXQASgWAGgZIiAAAIgEgPICHAAQADgLAAgNIABgaIhSAAIgEgPICXAAIAVgYIAHAFIAOALIARAPQAAAEgEACQgDACgGAAIhLAAIgDAaIgDAYIBbAAIAXgdIAHAHIARANIASAQQAAAEgEACQgEACgEAAIiTAAIgFAOIgEAOQBEAMAmAQQAnAQAPAQQAPAPgBAMQgBAMgJACQgLAEgMgJQgTgWgmgWQglgWg0gVQgNAUgXARQgXARgmAPQglAOg3ALgAjqBcQAsgYAggfQAhgfAZgiIh5AAIgEgPICGAAIAOgZIANgZIhyAAIgEgOIB8AAIAJgYIAHgXIicAAIgFgPICmAAIAIgeIAFgfIA2ANQgBAGgFACQgGADgIAAIgEASIgFATICMAAIAYgdIAIAFIARAOIASARQgBADgCACQgEACgEABIjIAAIgIAXIgJAYICIAAIAWgcIAHAFIARAOQAKAHAIAIQgBAEgEACQgCACgGAAIjCAAIgNAZIgPAZIDYAAIAageIAIAGIARAOIAUARQgBAEgEACQgDACgGAAIh/AAQAPAWAYAQQAXARAbANQAcAMAbAHIgBAGQgMADgHAGQgJAHgCAJQgngQgigfQghgfgUgoIiPAAQgcAmgpAgQgoAgg4AYg");
	this.shape_37.setTransform(1228.55,646.5);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#333333").s().p("AgrDnIAAkQIiVAAIgFgPIFEAAIATgUIAnAgQgDACgEACQgFACgIABQgBBNgFAsQgFAtgNAMQgIAJgMAEQgNAEgPAAQABgIgCgGQgCgGgGgEQgFgEgMgDQgMgEgOgCIAAgIIAWACIAXACIAQAAIAKgBQADgBADgDQAHgHADgoQADgnABhDIiNAAIAAEGQAAACgIAEQgIAEgNAAgAhehNIAAhFIiEAAIgDgOICHAAIAAhGIAyAFQgBAFgEADQgEAEgJABIAAA0IB7AAIAAhGIAyAFQAAAFgEADQgEAEgKABIAAA0IBFAAIAYggIAIAGIASAPIASARQAAAEgEACQgDACgGAAIh8AAIAAA4QAAADgIAEQgHAEgMAAIgFAAIAAhDIh7AAIAAA7QgBADgIADQgJAEgJAAg");
	this.shape_38.setTransform(1181.325,646.325);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#333333").s().p("ABzDJQgmgTgcgcQgbgcgRgoIgGAAQgFAYgNAVQgMAUgZASQgZASgqAOQgqAPg+AMIgEgKQBDgRApgTQApgUAUgYQAVgXAHgdIi/AAIgEgPIDFAAIAEgYIADgaIAxAFQgBAFgEAEQgEADgJABIgCARIgCAPICdAAIAZgeIAHAGIASAOIATARQgBAEgFACQgDACgFAAIjGAAQAeAwA4AaQA3AaBLAIIgBAGQgLACgHAIQgHAIgDAMQgxgLgngSgAjiAYQA1gYAtgfQAughAgglIioAAIgEgOIDMAAIAAhyIAxAGQgBAFgEADQgEAEgIABIAABfIAaAAIAbghIAbgkIAWghIAsAZQgCAEgFABQgGABgHgBIgmAjQgXAUgXARIBgAAIAXgdIAIAGIARANIATAQQgBAEgEACQgDACgGAAIi/AAIAAAKQBIARAoAUQAnAUAOARQAOARgGAKQgFAJgRgEQgPgOgagRQgagRgdgRQgdgRgagNIAABRQgBADgIAEQgHAEgKAAIgGAAIAAhjQgmAng0AeQg0Aeg9AUgAhdiAQgEgNgLgOQgLgPgMgNQgNgNgNgJIAGgFQAqANATAQQAUARADAPQAEAPgIAGQgEAEgFAAQgGAAgHgEg");
	this.shape_39.setTransform(1134.55,646.625);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#333333").s().p("AjlC2IAVgDIAagFIAAknIAwAFQgBAFgDAEQgEADgJACIAAEOIA7gOIAAl7IAyAGQgBAEgEAFQgEADgJABIAACTIAlAAIAXggIAHAGIASAPIASASQgBAEgEACQgDACgGAAIhZAAIAAC/IAtgLIAugLIACAJIhgAjQg5AVhLAYIgFAIQgDADgEABgAA5DQQgKgJAAgVIAAmTIAzAGQgBAFgEADQgEAEgJABIAACrQAagRAcgWQAbgXAZgaIAnAlQgDADgFABQgFAAgHgEQgeAVggARQghAQgeALIAAC9QAAAJAEAEQAEAEAOAAIAnAAIAZAAIAPgCIAFgCIAEgEIAFgSIAFggIAGgkIAHAAIACBYQAIAEADAEQADADAAAFQABAIgIAEQgHAFgTADQgUABgjAAIgtAAIgDABQgaAAgKgJg");
	this.shape_40.setTransform(1087.4016,646.7);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#333333").s().p("AglBCQAcgRALgTQALgUABgQQgLgDgJgFQgKgFgHgHQgHgJAAgMQAAgMAIgKQAJgIAOAAQASAAAJANQAKANAAAUQAAAUgGATQgGAVgPASQgOASgaANg");
	this.shape_41.setTransform(1023.025,667.55);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#333333").s().p("AieDlIAAnJIAyAGQgBAFgEAEQgEADgKACIAAGpQAAAEgIAEQgIAEgJAAgAhWDTIgEgOICOAAIAAiUIhiAAIgFgOIBnAAIAAh4IhMAAQgLAbgNAYQgOAZgQASIgIgFQANgYAMghQALggAJgkQAIgkAFgmIAwAMQgBAFgEADQgEADgIAAIgJAlIgMAjIBGAAIAAh8IAwAFQgBAFgDADQgDAEgJABIAABqIBFAAIAYgeIAHAGIARAOIASARQgBAEgDACQgDACgGAAIh6AAIAAB4IA4AAIAXgeIAIAGIARAOIARARQgBADgDACQgDACgGAAIhsAAIAACUIBTAAIAYgeIAHAGIASAOIASAQQgBAEgDACQgEACgFAAgAjmgFQgEgHACgIQACgHAGgHQAIgIAGgPQAHgPAEgSQAEgSAAgSIAIAAQAJAogEAdQgEAdgKAOQgGAKgLADIgFAAQgHAAgFgEgAhdg/QAAgNgEgOQgEgNgFgNQgGgOgGgJIAGgDQAdASAKARQALASgCANQgBANgJAFIgFABQgHAAgHgGg");
	this.shape_42.setTransform(993.8417,646.575);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#333333").s().p("Ag3DfIAAjgIAiAPIC3AAIASgTIAoAeQgCADgGADQgFADgHABIAACvQgBABgFADIgKAEQgGADgGAAIgFAAIAAgiIi+AAIAAAZQAAADgJADQgHAEgLABgAgXCsIC+AAIAAhCIi+AAgAgXBcIC+AAIAAg/Ii+AAgAjcCQIAAlTIAiAQIA/AAIARgUIAnAfIgIAFQgFADgIACIAAEHIgFAEIgKAFQgGACgFAAIgFAAIAAguIhGAAIAAA/QAAADgHAEQgHAEgLAAgAi9A3IBGAAIAAjbIhGAAgAgkgOIAAjLIAiAPICVAAIASgUIAoAfQgCADgGADQgGADgIACIAACVQgBACgEACQgEADgHABQgFACgGAAIgFAAIAAgVIicAAIAAARQgBADgHAEQgIADgJABgAgFg5ICcAAIAAg6IicAAgAgFiCICcAAIAAg5IicAAg");
	this.shape_43.setTransform(947.35,647.125);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#333333").s().p("AgSDeQAjgZAUgjQAVgiALgpQAKgoADgtQAEgrABgtIAxALQgBAFgEADQgEADgJAAIgBAFQAEA7ALAwQAMAxAYAkQAYAkApAaIgBAGQgLABgIAHQgHAGgDANQgegWgSghQgSghgLgpQgJgqgFgwQgEAsgNApQgMApgZAjQgaAjgrAZgAg/DVQgCgFgEgDQgFgEgJgDQgIgCgQgCIAAgIIAHABIAQABIASABIALAAQAHAAACgCQACgCAAgFIAAizIi4AAIgEgOIDYAAIAVgcIAHAGIAQANIARAQQAAAEgEACQgEABgEAAIguAAIAAC0QAAAMgDAJQgDAJgLAGQgKAGgVADQAAgHgCgGgAjLCjIAAiLIAfAOIA1AAIASgSIAlAdQgDADgFACQgGADgGABIAABSQgCADgHADQgJADgHABIgEAAIAAgOIg9AAIAAARQgBADgHADQgIADgJABgAiuB5IA9AAIAAhEIg9AAgACcgXIAHgcIAHggIAHgeIhzAAQgJAVgKATQgKASgLAQIgIgEQAKgZAJgeQAJgfAIgiQAIghAFghIA0AOQgCAEgEADQgEADgIAAIgNAoIgPAmIBpAAIATgVIAlAkQgDADgFABIgLABIgOAdIgRAfIgSAbgAgugaIAAibIiyAAIgEgPIDGAAIAWgbIAHAFIAQANIARAQQgBAEgEACQgDACgFAAIghAAIAACRQgBACgHAEQgGADgMABgAjFgfIAAh/IAgAOIAyAAIARgSIAlAdQgCADgFACQgGADgHACIAABIQgBADgIADQgHAEgJAAIgEAAIAAgPIg6AAIAAAQQAAACgIADQgIAEgIAAgAiohHIA6AAIAAg6Ig6AAg");
	this.shape_44.setTransform(899.8,646.675);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#333333").s().p("Ah4DkIAAjcQgRAogYAiQgaAjgeAdIgHgGQAggpAXgzQAWgyANg1IhTAAIgEgPIBlAAIAAhhIgzAJIg0AHIgBgIQAhgIAkgMQAkgMAfgMQAggNAWgLIAmAiQgEADgFABQgGAAgJgDIggAJIgkAJIAABoIAnAAIAYgdIAHAGIAQANIASARQgCAEgDACQgEACgFAAIhaAAIAAAfQArARATASQAUATACAPQAEAPgIAFQgIAHgMgIQgGgMgJgOQgKgOgLgOQgMgMgMgLIAADmQAAADgIAEQgHADgMABgAAZDLIAAlyIAjAQIBoAAIATgVIArAgQgDAEgGADIgPAFIAAE5QAAACgKACQgIAEgJABIgFAAIAAgzIhxAAIAAAvQABADgJAFQgHAEgLABgAA5CAIBxAAIAAkIIhxAAg");
	this.shape_45.setTransform(851.7,646.7);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#333333").s().p("AieDlIAAnJIAyAGQgBAFgEAEQgEADgKACIAAGpQAAAEgIAEQgIAEgJAAgAhWDTIgEgOICOAAIAAiUIhiAAIgFgOIBnAAIAAh4IhMAAQgLAbgNAYQgOAZgQASIgIgFQANgYAMghQALggAJgkQAIgkAFgmIAwAMQgBAFgEADQgEADgIAAIgJAlIgMAjIBGAAIAAh8IAwAFQgBAFgDADQgDAEgJABIAABqIBFAAIAYgeIAHAGIARAOIASARQgBAEgDACQgDACgGAAIh6AAIAAB4IA4AAIAXgeIAIAGIARAOIARARQgBADgDACQgDACgGAAIhsAAIAACUIBTAAIAYgeIAHAGIASAOIASAQQgBAEgDACQgEACgFAAgAjmgFQgEgHACgIQACgHAGgHQAIgIAGgPQAHgPAEgSQAEgSAAgSIAIAAQAJAogEAdQgEAdgKAOQgGAKgLADIgFAAQgHAAgFgEgAhdg/QAAgNgEgOQgEgNgFgNQgGgOgGgJIAGgDQAdASAKARQALASgCANQgBANgJAFIgFABQgHAAgHgGg");
	this.shape_46.setTransform(805.8417,646.575);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#333333").s().p("AidDlIAAnJIAxAGQgBAFgEAEQgEADgJACIAAGpQgBAEgHAEQgIAEgJAAgACEDWQgCgGgEgDQgFgEgIgDQgIgDgNgCIAAgIIAGAAIAOACIAQABIAMAAQAFAAACgCQACgDAAgFIAAg1IicAAIAABcQgBADgIAEQgHAEgLAAIgFAAIAAj+IAiARICVAAIARgUIAqAeIgJAFIgMAFIAACsQAAANgDAJQgDAJgKAGQgLAGgUACQgBgHgCgHgAgHBuICcAAIAAguIicAAgAgHAxICcAAIAAgtIicAAgAjngRQgEgHACgHQACgIAGgGQAHgIAGgQQAHgOAEgTQAEgSAAgTIAJABQAJAogEAdQgEAdgKAOQgHAJgKAEIgGABQgGAAgFgFgAhSgvIgEgOICJAAIAAgtIhiAAIgEgPIBmAAIAAgpIh3AAIgEgOIB7AAIAAgyIAwAFQAAAFgEADQgEADgIACIAAAgIBQAAIAWgcIAHAGIAQANIASAPQgBAFgDACQgEABgFAAIiCAAIAAApIBDAAIAVgbIAHAGIAQANIARAPQgCAEgDACQgDACgFAAIhzAAIAAAtIBZAAIAWgdIAHAGIAQANIASAQQgCAEgDACQgDACgFAAgAhehPQAAgSgIgUQgHgUgJgPIAGgDQAcARAKARQALASgCANQgCAMgIAEIgGACQgGAAgHgHg");
	this.shape_47.setTransform(758.4692,646.575);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#333333").s().p("AAmDXQgDgGgFgEQgGgFgMgDQgMgEgSgCIAAgIIAKABIAUACIAYABIAQABQAHAAADgCQACgDAAgFIAAjXIh2AAIgFgOIDrAAIAVgWIAnAlQgDADgEABIgNABQgIANgNAPQgMAOgOAOQgOAOgMALIgHgEIAOgaIAOgdIANgcIhQAAIAADYQAAANgDAKQgEALgNAHQgMAHgYACQAAgIgDgGgAipDXQgCgGgFgEQgFgEgJgDQgJgDgPgCIAAgIIAHAAIARABIASABIAMABQAGAAADgCQADgDgBgFIAAiOIgcAOIgeAOIgEAIQgDADgEACIgRgrQANgDAWgHIAzgQIAAhrIhKAAIgDgPIBNAAIAAhyIAyAGQgBAFgEAEQgEADgJACIAABeIAYAAIAVgcIAHAGIAPANIAQAQQgBAEgDACQgDACgGAAIhGAAIAABiIAogOIAqgOIADAIIgnATIguAXIAACgQAAANgDAKQgDAKgLAGQgLAGgVADQgBgIgCgGgABkg7QgIgQgQgRQgQgQgUgOQgUgOgSgKIAEgFQAaAFATAHQATAHAOAIQARgPARgRQASgRANgQIjAAAIgEgPIDIAAIAWgVIAmAkQgDACgFABIgNACQgMALgQALQgQAMgSAMIgkAVQAXARAFAPQAGAQgHAIQgDAEgHAAQgFAAgGgCg");
	this.shape_48.setTransform(711.375,646.575);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#333333").s().p("AAdA5QgGgEgFgMQgLgYgRgXQgTgXghgYIAGgIQAsAOAZASQAaASAMARQAGAKADAIQADAIAAAIQAAALgGAFQgFAGgKAAQgIAAgFgFg");
	this.shape_49.setTransform(647.625,663.175);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#333333").s().p("AieDlIAAnJIAyAGQgBAFgEAEQgEADgKACIAAGpQAAAEgIAEQgIAEgJAAgAhWDTIgEgOICOAAIAAiUIhiAAIgFgOIBnAAIAAh4IhMAAQgLAbgNAYQgOAZgQASIgIgFQANgYAMghQALggAJgkQAIgkAFgmIAwAMQgBAFgEADQgEADgIAAIgJAlIgMAjIBGAAIAAh8IAwAFQgBAFgDADQgDAEgJABIAABqIBFAAIAYgeIAHAGIARAOIASARQgBAEgDACQgDACgGAAIh6AAIAAB4IA4AAIAXgeIAIAGIARAOIARARQgBADgDACQgDACgGAAIhsAAIAACUIBTAAIAYgeIAHAGIASAOIASAQQgBAEgDACQgEACgFAAgAjmgFQgEgHACgIQACgHAGgHQAIgIAGgPQAHgPAEgSQAEgSAAgSIAIAAQAJAogEAdQgEAdgKAOQgGAKgLADIgFAAQgHAAgFgEgAhdg/QAAgNgEgOQgEgNgFgNQgGgOgGgJIAGgDQAdASAKARQALASgCANQgBANgJAFIgFABQgHAAgHgGg");
	this.shape_50.setTransform(617.8417,646.575);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#333333").s().p("AjnDgQAhgcAWglQAWgmANgoQAMgqAFgnIAzAKQgBAGgFADQgEADgIAAIgJAgQgEAQgHARQARAjAXAVQAYAVAgAJIAAjeIiWAAIgEgOIETAAIAYgbIAHAFIASANIASAQQgBADgEACQgDACgFAAIiQAAIAABcIBYAAIAXgeIAHAGIASAOIASAQQgBAFgDABQgDACgFAAIiOAAIAAB8QATADAXACIAvABIAcAAIAiAAIAkgBIAdAAIAAAGQgKACgFAHQgFAIgBAKIhsAAQg6AAgqgJQgogJgegbQgdgagUgxQgQAmgaAiQgbAigpAYgAjWhDQgHgCgDgGQgDgJAEgHQAFgHAJgGQAKgFAIgKQAJgLAFgOQAFgOgBgQIAJgBIADAOIADAMIFGAAIAVgWIAoAmQgDADgEABIgMABQgKANgPAOQgQANgOAKIgHgEIALgZIAKgbIlGAAQAAAYgJAQQgIAQgMAHQgGAFgIABIgEAAQgFAAgFgCgAACigQgCgQgKgTQgLgRgOgNIAFgEQAjAKAQAOQAPAPgBAOQAAAOgKAGQgDACgFAAQgGAAgJgGg");
	this.shape_51.setTransform(570.375,646.6);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#333333").s().p("AiVDlIAAjOQgOAhgTAdQgTAdgYAZIgHgFQASgbAOggQAOggALghQAKgiAHgjIg/AAIgEgOIBMAAIAAhcIgkAGIgjAGIgCgJQAYgHAagKQAagKAYgLQAXgLAPgJIAoAhQgDAEgHAAQgGAAgJgDIgXAHIgaAHIAABjIAPAAIAWgcIAHAGIAQANIAQAPQgBAFgDABQgDACgGAAIg/AAIAAAhQAhAPAOAQQANASAAAOQAAAOgIAEQgIAGgMgIQgDgRgJgSQgJgSgLgOIAADoQgBACgHAFQgHAEgMAAgAAnDXQgSAAgJgDQgKgDgCgHQgEgGABgLIAAhmIArAFQAAAEgEADQgDADgHABIAABRQAAADADACQAEACALAAIAvAAIAbAAIARAAIAFgCIADgEQADgGAEgOIAHghIAGAAIACA2QAHADADADQADADAAAEQAAAHgHAFQgHAEgTABQgTADgkAAgAhXDFQgEgHADgIQADgGAHgGQAJgGAIgNQAHgNAFgQQAFgQAAgRIAJAAQAGAagCAVQgCAUgGAPQgHAOgIAIQgIAHgKABIgDABQgHAAgFgFgADMC9QAAgQgFgSQgGgSgKgQQgJgQgLgNIAGgDQAjAUAPAVQAPAWgBARQAAARgIAGQgEADgEAAQgGAAgHgGgABdCPQgCgNgFgOQgGgPgIgNIgQgXIAGgEQAhARANATQAOARgBAOQAAAOgJAFQgDACgDAAQgGAAgHgGgAClBMIAAgUIjLAAIgEgPIDPAAIAAg3Ii5AAIgFgOIC+AAIAAg2IjFAAIgEgPIB7AAQAKgNAJgQIASggIhpAAQgQATgRAQQgTAQgUAMIgGgFQARgQAPgUQAPgWAMgXQAKgYAHgXIA2AMQgBADgEACQgDACgJAAIgLASIgMATIBeAAIAWgWIAnAkQgDACgFACIgMABIgeAcQgSAPgSANIA8AAIASgTIAoAeQgCADgFADIgOAEIAACNQAAACgFACIgKAEIgMADg");
	this.shape_52.setTransform(523.0258,646.5);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#333333").s().p("ABjDVQgBgGgGgEQgGgFgOgDQgOgEgPgDIAAgJIAaADIAaACIATABIALgBQAEgCAEgEQAKgKAFgnQAGgoAEhAQADg/ABhXIh5AAQgRAggSAbQgRAagVAUIgHgEQAQgYAPgiQAOggANgmQANglAJgmIAyAPQgBAFgEADQgFACgIAAIgMAfIgNAgIBtAAIAVgXIAmAiQgDADgFACQgFACgHABQgDCKgIBSQgIBSgRAWQgLANgPAFQgOAHgTAAQAAgIgCgIgAjXDWIAAlyIAiARIAQAAIAHgcIAGggIAGgcIA1AMQgDAFgEADQgEADgIAAIgRAfIgUAiIBBAAIASgUIAnAfQgCADgGADIgNAEIAAExQgBACgEADQgEADgGACQgGADgFAAIgGAAIAAgnIhoAAIAAAqQgBACgGAFQgIAEgKAAgAi4CTIBoAAIAAiEIhoAAgAi4AAIBoAAIAAh8IhoAAgABCBGQgDgRgJgTQgKgTgMgRQgNgRgNgNIAFgEQAtAVAUAVQATAXADATQABARgJAIQgEADgFAAQgGAAgJgGg");
	this.shape_53.setTransform(477.5,646.55);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#333333").s().p("AAeDlIAAhaIiIAAIgEgOICMAAIAAg9Ih3AAIgEgPIB7AAIAAg3IhnAAIgEgPIBrAAIAAg9Ih+AAIgEgPICCAAIAAg6IhkAAIgEgPIBoAAIAAg6IAyAFQgBAGgEADQgEAEgJACIAAAmIBLAAIARgUIApAfQgDADgFACIgNAFIAAA0IAJAAIATgZIAGAFIAOANIAOAOQgBAEgDACQgDACgFAAIgyAAIAABRQgBABgEACIgLAEQgGACgGAAIgEAAIAAgOIhQAAIAAA3IBQAAIAXgcIAHAGIARAOIASAPQgBAEgDACQgEACgFAAIiEAAIAAA9IBlAAIAXgeIAHAGIARAOIATAQQgBAEgDACQgDACgGAAIiaAAIAABNQgBAEgHAEQgIAFgKAAgAA+gVIBQAAIAAg9IhQAAgAA+hhIBQAAIAAg6IhQAAgAioDlIAAjtQgOAPgPAPQgQAOgRANIgFgGQAXgYAVgdQAUgfARgfQAQgeAKgaIAvAVQgCAEgEACQgEACgJgCIgRAcIgWAeIATAHQgCAEgDACQgEACgHABIAAD0QAAADgIAEQgHAEgKABgAjmhfQAUgTASgXQATgYAPgXQAPgYAJgUIAuAXQgCAEgEACQgEABgIgCQgNARgTAUQgSAUgXATQgWAUgXAPg");
	this.shape_54.setTransform(1812.025,552.775);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#333333").s().p("AhODhQAlgmAUg4QAUg3ABhMIAvAGQAAAFgFADQgDAEgJAAIgFAoQgDATgFASQALAeAOASQAPATAUAJIAAjlIhUAAIgFgOIC3AAIAUgUIAjAjQgCACgFABIgMABQgGAJgKAKIgTAVIgTAQIgIgDIANgbQAIgQAGgPIhAAAIAABnIAxAAIAXgcIAGAGIAQANQAKAIAHAIQgBAEgDACQgDACgFAAIhjAAIAAB5QAKADANAAIAbABIBMAAIAAAHQgJACgEAGQgEAHAAAKIg+AAQgkAAgbgJQgbgJgUgXQgTgYgOgpQgMApgUAeQgWAegeAUgAjoDbQAYgkAOgpQANgoAGgsQAFgrACgsQACgsgBgsIg5AAIgEgPICVAAIAXgdIAHAGIAQAOIASAQQgBAEgDACQgEACgFAAIhoAAIgBAmIgBAmIAyAAIASgUIAlAfQgCADgFACQgFACgIABQgCBDgFAvQgEAugIAcQgHAbgLAKQgKAKgLAEQgNAFgOAAQAAgIgBgFQgCgGgEgEQgFgDgKgDQgJgEgMgBIAAgJIATACIATABIAPABQAGAAAEgCQADgBAEgDQALgKAHgzQAHgzADhbIg4AAQgDAugIAtQgJAtgTApQgTApggAjgAglhBQAWgeAQgrQAQgrAKgxIAyAPQgBAEgEADQgFADgIAAIgLAeIgNAcICDAAIAXgeIAHAGIARAPIASAQQgBAEgDACQgEACgFAAIi/AAQgNAWgOASQgOASgQAOgAiCiTQgBgNgGgPQgFgPgJgNQgIgOgKgKIAGgEQAkAPAOATQAPASAAAPQgBAPgJAGQgEACgEAAQgGAAgIgGg");
	this.shape_55.setTransform(1764.2,552.875);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#333333").s().p("AAvDiIAAkKQgbAxgkAtQgkAtgsAkIgHgGQAngoAggyQAggxAag3QAYg3AQg3IiFAAIgDgPIDqAAIAXgdIAHAGIASAOIASAQQAAAEgEACQgDACgGAAIhxAAQgHAYgJAXQgJAYgLAXIAfAHQgBAEgEACQgFADgJABIAAEXQAAACgHAEQgHAEgOABgAjmBsIAggLIAtgSIAAibIhHAAIgEgPIBLAAIAAiGIAyAGQgBAFgEAEQgEADgKABIAABzIAZAAIAVgdIAHAGIAQAOIAQAQQgBAEgEACQgDACgFAAIhIAAIAACPIAjgPIAjgPIADAHIg8AnQgkAXgwAcQgBAFgCAEQgCADgEACgADFBbQgGgWgQgaQgPgZgUgWQgSgYgUgRIAHgEQAuAXAaAYQAaAWAKAVQAMAUgCAPQAAAOgJAFQgDACgEAAQgGAAgIgGg");
	this.shape_56.setTransform(1716.6,553.125);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#333333").s().p("AgpDdQAngRAegXQAfgXAXgcQgUgegOglQgNgmgIgtIgUAAIAAANQAAAngFAqQgEAqgSAoQgSAngmAgIgHgGQAaggANglQANglAFgpQAEgogBgpIAAiaIAkAQIBAAAIAAhTIAwAGQAAAFgFAEQgEADgJACIAAA/IBCAAIAUgVIAnAlQgDADgEABIgMABIgWAdQgNAQgNALIgGgEQAEgLAEgQIAIgfIhEAAIAABfIAvAAIAVgUIAkAhQgDADgEACIgNACQgLAngSAkQgSAkgaAgQAYAWAdARQAdARAjAMIgBAFQgLABgIAHQgJAHgFAMQgggOgagUQgZgTgVgZQgZAZghATQghAUgqAPgAA+AyQAQAgAWAaQAUgdANggQAOghAJgiIh3AAQAKAmAPAggAAHgjIBGAAIAAhfIhGAAgAi+DMIAAjHQgQAdgVAaIgHgGQAbgxARg5QARg7AIg/Ig/AAIgDgPICJAAIAXgcIAHAGIARAOIASAPQgBAEgEACQgDACgFAAIhZAAQgFAhgJAgQgIAfgLAdIAKAFIA0AAIARgUIAnAeQgCADgGACQgFADgHACIAAC8IgFAEIgKADQgGACgFAAIgFAAIAAghIg/AAIAAA1QAAACgHAEQgGAEgMABgAigB9IA/AAIAAibIg/AAg");
	this.shape_57.setTransform(1669.225,552.875);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#333333").s().p("ACaDhQgFgKgGgKIgQgWIh4ARIibARQgCAEgDACIgFADIgRgrIAFgBIAJgDQASgLATgQQAUgQASgTQASgSAPgSQAPgSAJgOIAvAbQgCAEgFACQgFACgHgBQgPAPgXASQgWASgaASQgZASgaAPIBGgDIBYgEIBkgFQgRgUgSgUQgTgTgQgPIAGgEQA6AaAeAbQAdAaAHAVQAHAVgJAJQgEAEgGAAQgGAAgIgEgAjNAvIgEgOIFWAAIAaggIAIAGIATAPIAUARQgBAEgEACQgEACgFAAgAjogRQAggSAhgZQAhgZAegdQAegdAXgdQAWgeALgaIA4ANQgBAFgFACQgFACgJABQAXAeAhAaQAiAbApAXQAoAXAsARIgBAHQgLACgHAHQgIAHgDAJQgogUgmgbQglgbgfggQgegggTgiQgXAjgmAjQgmAkgtAfQgtAfgvAVgAh8goIgDgPIC1AAIAZgeIAIAGIARAOIATARQAAAEgEACQgDACgGAAg");
	this.shape_58.setTransform(1621.275,552.5314);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#333333").s().p("ACXDVQgDgGgFgEQgFgEgKgEQgLgDgRgCIAAgIIAJAAIASACIAVACIAOAAQAHAAADgCQACgDAAgGIAAmRIAyAGQgBAFgEAEQgEADgJABIAAGBQAAAOgDAKQgEAKgLAHQgLAGgXACQgBgHgCgHgAjfDYQAtgZAZggQAZggALgpQALgpACg1QADg1gBhGIAxAMQgCAFgEADQgEADgJAAQgBBAgDAzQgDAzgNApQgNAogdAfQgeAgg1AXgAAADMQgFgTgMgWQgNgVgQgUQgRgUgPgPIAFgEQAyAYAXAZQAYAZAEAUQAEAUgJAJQgEAEgGAAQgGAAgHgGgABPBzIAAkiIAwAFQgBAGgEADQgEADgJABIAAEFQAAADgIAEQgHAEgJAAgAi7BaIAAklIAlAQICDAAIARgUIAjAdQgCADgFACIgNADIAADzQAAACgHAEQgHAEgLAAIgFAAIAAkAIiLAAIAAD9QgBADgGADQgHAEgMAAg");
	this.shape_59.setTransform(1572.825,552.875);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#333333").s().p("AjdDdIgEgOIDSAAIAAhdIieAAIgEgOICiAAIAAhDIAzAFQgBAGgEADQgEAEgJABIAAAwIBlAAIAYgeIAIAGIARAOIATAQQgBAFgDABQgEACgGAAIibAAIAABdICNAAIAaggIAIAHIARAOIAUARQgBAEgEACQgDACgGAAgAjkAyQAYgUAPgUQAPgUAIgWQAHgWADgWIhBAAIgEgPIBGAAIABgNIAAgMIAAg7Ig2AAIgDgPIC9AAIAVgbIAHAGIAQANIARAPQgBAEgEACQgCACgGAAIg4AAIAABUIAOAAIAWgdIAHAGIAQAOIASAQQgCAEgCACQgEACgFAAIhAAAIAAB0QAAABgIAEQgHAEgMAAIgFAAIAAh9IhAAAQgDAXgJAYQgKAYgVAVQgUAWgiASgAh8h1IAAANIgBANIA/AAIAAhUIg+AAgACbAqQgCgFgEgFQgEgEgJgDQgIgDgOgCIAAgIIAGABIAPABIARABIALABQAGAAACgCQADgCgBgFIAAjjIAyAFQgBAFgFAEQgEADgIABIAADTQAAANgDAKQgDAJgLAGQgKAGgUACIgDgNgABAgKIAAi7IAyAFQgBAFgEADQgEAEgJABIAACfQgBADgHAEQgIADgKAAg");
	this.shape_60.setTransform(1525.65,552.225);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#333333").s().p("AjLDeQA7gRAlgSQAkgSASgXQASgWAGgZIiAAAIgEgPICHAAQACgLABgNIABgaIhRAAIgFgPICXAAIAVgYIAHAFIAOALIARAPQgBAEgDACQgDACgGAAIhMAAIgBAaIgEAYIBbAAIAXgdIAIAHIARANIARAQQgBAEgDACQgDACgGAAIiSAAIgEAOIgFANQBEANAnAQQAmAQAPAQQAQAPgCAMQgBALgKADQgKAEgLgJQgVgVglgXQgkgWg2gVQgMAVgXAQQgXASglAOQgmAOg3AMgAjqBcQArgZAigeQAggfAYgiIh4AAIgFgPICHAAIAOgZIAMgZIhxAAIgEgPIB8AAIAJgXIAIgXIieAAIgEgQIClAAIAIgdIAHgfIA1ANQgCAFgFADQgFADgHAAIgFASIgFASICLAAIAZgcIAIAFIARAOIATARQgCADgDADQgDACgFAAIjHAAIgIAXIgJAXICHAAIAXgbIAIAFIAQANQAKAIAIAIQgBAEgEACQgCACgGAAIjCAAIgNAZIgPAZIDYAAIAZgeIAIAGIASAOIATARQgBAEgDACQgDACgGAAIh/AAQAQAWAXAQQAXARAcANQAaANAcAGIgBAGQgLADgJAGQgHAHgDAJQgngQgigfQghgfgVgoIiPAAQgcAmgoAgQgoAhg3AXg");
	this.shape_61.setTransform(1478.25,552.65);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#333333").s().p("AgrDnIAAkQIiVAAIgFgPIFEAAIATgUIAnAgQgDACgEACQgFACgIABQgBBNgFAsQgFAtgNAMQgIAJgMAEQgNAEgPAAQABgIgCgGQgCgGgGgEQgFgEgMgDQgMgEgOgCIAAgIIAWACIAXACIAQAAIAKgBQADgBADgDQAHgHADgoQADgnABhDIiNAAIAAEGQAAACgIAEQgIAEgNAAgAhehNIAAhFIiEAAIgDgOICHAAIAAhGIAyAFQgBAFgEADQgEAEgJABIAAA0IB7AAIAAhGIAyAFQAAAFgEADQgEAEgKABIAAA0IBFAAIAYggIAIAGIASAPIASARQAAAEgEACQgDACgGAAIh8AAIAAA4QAAADgIAEQgHAEgMAAIgFAAIAAhDIh7AAIAAA7QgBADgIADQgJAEgJAAg");
	this.shape_62.setTransform(1430.325,552.475);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#333333").s().p("AjSDdIgEgOIFvAAIAZggIAIAGIASAQIAUARQgCAEgDABQgDACgFAAgAiSBiIgEgPID+AAIAYgeIAHAGIASAOIATARQgBAEgEABQgDADgFAAgAjlAUIAVgCIAbgEIAAivIAuAFQAAAEgEADQgEADgIACIAACaIAagFIAbgEIAAjdIAyAFQgBAGgEADQgEAEgJABIAABUIAcAAIAWgfIAHAGIAOAPIARAPQgCAFgDABQgDACgFAAIhLAAIAABkIAqgIIArgIIACAIIhbAcQg2APhJATQgBAEgEADQgDADgDACgABSAfQgUAAgLgDQgLgDgEgHQgEgIABgMIAAjaIAvAGQAAAEgEADQgEADgHACIAABiQAUgIAVgMQAUgLARgKQARgMAMgJIApAdQgDADgGABQgGAAgJgCIgkAPIgrAQQgWAHgXAFIAABTQgBAHAEACQAEABAOAAIAyAAIAdAAIASAAIAGgBQACgBACgEQADgFAEgRIAIgmIAHAAIABA+QAIADADACQADAEAAAEQAAAJgIADQgHAGgVABQgUACgnAAg");
	this.shape_63.setTransform(1382.4265,552);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#333333").s().p("AjeAdIgEgRIFrAAIAggoIAKAIIAXAUIAZAVQgBAFgDACQgFABgGAAg");
	this.shape_64.setTransform(1335.1,548.975);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#333333").s().p("ABdDYQgDgGgEgEQgHgEgKgEQgKgDgRgCIAAgIIAJAAIASACIAVABIAPABQAHAAACgDQACgDAAgFIAAhGIjBAAIAABuQgBADgGAEQgIAEgLABIgGAAIAAkGQgYAbgcAWQgcAXgiATIgEgGQAhgYAdgeQAcgeAWgiQAYgiARgjIiRAAIgFgPICeAAIAQgoQAIgUAFgUIA0ARQgCAFgEACQgFACgIgBIgMAcIgNAbIC8AAIAZgeIAIAGIARAOIAUARQgBAEgEACQgDACgFAAIj9AAQgJARgLARQgLARgNARIAKAEIC2AAIASgWIAsAhQgDAEgGADQgHADgHABIAADeQAAAOgDAJQgEAKgLAGQgMAHgXACIgEgOgAhNBdIDBAAIAAg/IjBAAgAhNAPIDBAAIAAg+IjBAAg");
	this.shape_65.setTransform(1287.25,552.625);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#333333").s().p("AjpC5IAagTIAcgVIAYgUIAAiuIhGAAIgDgOIBCAAIAUgZIAqAjQgCADgGACQgGADgKACIAAChIADACIADACQAWAYAbANQAbANAjAFQAiAFAuAAIA2AAIA0gBIA3gCIAAAGQgLADgHAHQgGAHgBALIiSAAQgvABghgHQgigHgagRQgagRgXgdQgFgGgDAAQgEAAgEAGIgQAUIgWAcIgUAbQABADAAAEQgBACgDACgAAoCVIAAjTQgeAhgjAdQglAbgqAXIgFgHQApgcAjgiQAigjAcgoQAbgoATgpIigAAIgEgPID4AAIAYgdIAHAGIASANIASAQQgBAEgDADQgEACgFAAIhjAAQgKAVgMAWQgNAUgPAVIAcAGQgBAEgFACQgEACgKACIAADXQAAACgHAEQgHADgNAAgADFAsQgIgSgQgVQgRgTgTgSQgUgUgSgOIAGgEQA4AUAcAXQAcAYAGATQAHATgJAJQgEAFgGAAQgGAAgIgFgAiMh0QgEgRgKgSQgKgTgNgRQgMgTgMgNIAGgDQArAWAUAXQATAWACARQADASgJAHQgEACgEAAQgHAAgIgFg");
	this.shape_66.setTransform(1239.375,553.05);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#333333").s().p("AglBCQAcgQALgVQALgTABgQQgLgDgJgFQgKgFgHgHQgHgJAAgMQAAgMAIgKQAJgIAOgBQASABAJANQAKANAAAUQAAAUgGATQgGAUgPATQgOATgaANg");
	this.shape_67.setTransform(1174.525,573.7);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#333333").s().p("AiLDkIAAjWIAkAQIDPAAIARgUIApAfQgCADgGADQgFADgIABIAACjQAAACgEADIgLAEQgHADgGAAIgEAAIAAgbIjWAAIAAATQgBADgIADQgIAEgLAAgAhpC4IDWAAIAAhAIjWAAgAhpBpIDWAAIAAg8IjWAAgAjnAUQA0gbAlgqQAjgpATgyIh6AAIgEgPIB+AAIAUgTIAkAfQgDADgFABQgEACgJAAQgVA1grArQgrAqhDAagAB+gVQgkgagcgnQgcgmgRg6IAACXQAAAOgDAJQgDAJgKAFQgLAHgVABQgBgGgCgGQgCgGgFgDQgFgEgKgDQgIgDgPgCIAAgIIAHABIAQABIATABIANABQAGgBACgCQADgCgBgFIAAjDIAvAGQAAAFgEADQgDADgJABIAAAEQAIAaALAWQALAXAOASQASgNAUgQIAkgeIAcgbIAqAeQgDADgEABQgEABgIgCIgiAUIgpAVIgsATQAiAoArAXQArAYAtANIgBAFQgJACgHAGQgHAHgDAMQgrgSgkgZg");
	this.shape_68.setTransform(1144.1,552.7);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#333333").s().p("AitDXQgCgGgFgEQgEgEgJgDQgJgDgPgCIAAgIIAHAAIAQACIASABIAMAAQAHAAACgCQACgCAAgGIAAiPIgaANIgcAOQgBAFgCADQgDAEgEABIgQgqIAhgKIAvgPIAAhrIhHAAIgEgPIBLAAIAAhyIAyAGQgBAFgEAEQgFADgIABIAABfIARAAIAUgbIAHAGIAPANIAQAPQAOgaALgeQAMgfAIggIAyARQgBAEgFADQgFADgIgBIgMAdIgOAbICfAAIAXgeIAHAGIASAOIATARQgCAEgCACQgEACgFAAIjcAAQgQAZgSAWQgSAVgUAQIgHgFIARgYIARgdQgCADgDAAIgGABIg+AAIAABhIAggLIAigMIACAHIgfARIglATIAACjQAAAOgDAKQgEAJgKAHQgLAGgVACIgDgOgAAlDZQgYAAgNgDQgMgDgFgJQgFgIAAgPIAAiZIg2ATIgKgMIBAgWIAAhYIAuAFQgBAFgDADQgEAEgIABIAAA7IA+gUIAAhhIAwAGQgBAFgEAEQgEADgJACIAABCIA8gUIAFgCIgBAAIARgSIAkAdQgCADgFABIgLADIgCBOQgCAdgFAQQgEAQgHAGQgHAHgJADQgKADgKAAIgBgNQgBgFgEgEQgDgDgGgCIgMgEIAAgIIAQABIAPAAIAHAAIAEgDQAEgDACgNQACgNABgaIAChBIhFAXIAACaQAAAEgIAEQgHADgJABIgGAAIAAicIg+AVIAACcQAAAHACADQACAEAHABQAHABAOAAIBIAAIArAAIAZgBQAFAAADgCQADgBACgDQADgGAFgQIAJglIAGAAIABA8QAKADADADQAEADAAAFQAAAIgJAFQgKAEgaACQgbACgzAAg");
	this.shape_69.setTransform(1096.5513,552.725);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#333333").s().p("ABjDVQgBgGgGgEQgGgEgOgFQgOgEgPgCIAAgJIAaADIAaABIATABIALgBQAEgBAEgEQAKgKAFgnQAGgnAEhBQADhAABhVIh6AAQgPAegTAbQgRAbgVAUIgHgEQAQgZAPghQAOggANglQANgmAIgnIAzAQQgBAFgFADQgEACgIAAIgMAgIgNAeIBtAAIAVgVIAmAhQgDADgFACQgFACgHAAQgDCLgIBSQgIBSgRAWQgLANgPAFQgOAHgTgBQAAgIgCgHgAjXDWIAAlyIAiARIAQAAIAHgcIAGggIAGgdIA0ANQgBAFgFADQgEADgIAAIgRAfIgUAiIBBAAIASgUIAnAfQgCADgGADIgNAEIAAExQgBADgEACQgEADgGACQgGACgFABIgGAAIAAgnIhoAAIAAApQgBADgGAFQgIADgKABgAi4CTIBoAAIAAiFIhoAAgAi4AAIBoAAIAAh8IhoAAgABCBGQgDgRgKgTQgJgTgMgRQgNgRgNgNIAFgEQAtAVAUAVQATAYADASQABASgJAHQgEADgFAAQgGAAgJgGg");
	this.shape_70.setTransform(1049.9,552.7);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#333333").s().p("AAeDlIAAhaIiIAAIgEgOICMAAIAAg9Ih3AAIgEgPIB7AAIAAg3IhnAAIgEgPIBrAAIAAg9Ih+AAIgEgPICCAAIAAg6IhkAAIgEgPIBoAAIAAg6IAyAFQgBAGgEADQgEAEgJACIAAAmIBLAAIARgUIApAfQgDADgFACIgNAFIAAA0IAJAAIATgZIAGAFIAOANIAOAOQgBAEgDACQgDACgFAAIgyAAIAABRQgBABgEACIgLAEQgGACgGAAIgEAAIAAgOIhQAAIAAA3IBQAAIAXgcIAHAGIARAOIASAPQgBAEgDACQgEACgFAAIiEAAIAAA9IBlAAIAXgeIAHAGIARAOIATAQQgBAEgDACQgDACgGAAIiaAAIAABNQgBAEgHAEQgIAFgKAAgAA+gVIBQAAIAAg9IhQAAgAA+hhIBQAAIAAg6IhQAAgAioDlIAAjtQgOAPgPAPQgQAOgRANIgFgGQAXgYAVgdQAUgfARgfQAQgeAKgaIAvAVQgCAEgEACQgEACgJgCIgRAcIgWAeIATAHQgCAEgDACQgEACgHABIAAD0QAAADgIAEQgHAEgKABgAjmhfQAUgTASgXQATgYAPgXQAPgYAJgUIAuAXQgCAEgEACQgEABgIgCQgNARgTAUQgSAUgXATQgWAUgXAPg");
	this.shape_71.setTransform(1001.125,552.775);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#333333").s().p("AhODhQAlgmAUg4QAUg3ABhMIAvAGQAAAFgFADQgEAEgIAAIgFAoQgDATgFASQALAeAOASQAQATATAJIAAjlIhUAAIgFgOIC3AAIAUgUIAjAjQgDACgEABIgMABQgGAJgKAKIgTAVIgTAQIgIgDIANgbQAIgQAGgPIhAAAIAABnIAxAAIAXgcIAGAGIAQANQAKAIAHAIQgBAEgDACQgDACgFAAIhjAAIAAB5QAKADANAAIAbABIBMAAIAAAHQgJACgEAGQgDAHgBAKIg+AAQgkAAgbgJQgbgJgUgXQgTgYgOgpQgMApgUAeQgWAegeAUgAjoDbQAYgkAOgpQANgoAGgsQAFgrACgsQACgsgBgsIg5AAIgEgPICVAAIAXgdIAHAGIARAOIARAQQgBAEgDACQgEACgFAAIhoAAIgBAmIgBAmIAyAAIASgUIAlAfQgCADgFACQgFACgIABQgCBDgFAvQgEAugIAcQgHAbgLAKQgKAKgLAEQgNAFgOAAQAAgIgBgFQgCgGgEgEQgFgDgKgDQgJgEgMgBIAAgJIATACIATABIAPABQAGAAAEgCQADgBAEgDQALgKAHgzQAHgzADhbIg4AAQgCAugJAtQgJAtgTApQgSApghAjgAgkhBQAVgeAQgrQAQgrAKgxIAyAPQgBAEgEADQgFADgIAAIgLAeIgNAcICDAAIAXgeIAIAGIAQAPIASAQQgBAEgDACQgEACgFAAIi/AAQgNAWgOASQgOASgQAOgAiCiTQgBgNgGgPQgFgPgJgNQgIgOgKgKIAGgEQAkAPAOATQAPASAAAPQgBAPgJAGQgEACgEAAQgGAAgIgGg");
	this.shape_72.setTransform(953.3,552.875);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#333333").s().p("ACKC0QgbgbgSggQgbAggjAbQgiAbgvAVIgFgGQAtgbAgggQAiggAXgkQgSgkgMgoQgLgngIgrQgLAUgMASQgLASgOAOIgHgFQAQgcAOglQANglALgqQALgqAGgsIA2AMQgBAFgEADQgFADgIABQgGAXgHAWQgHAWgIAVIBsAAIAXgeIAIAGIARAOIATARQgCAEgDACQgEACgFAAIgjAAQgIA5gRAxQgRAygcAqQAWAgAeAaQAfAZAnAUIgBAEQgMABgIAHQgIAGgEALQgjgVgagcgAArhaIgFALQAJApANAmQANAkAUAiQAUgmAMgqQAMgsAFgvIhdAAIgGALgAjnCoIAogGIA4gKIAAhdIhQAAIgEgPIBUAAIAAhEIAzAFQgBAFgEADQgFAEgIABIAAAyIAkAAIAWgdIAIAGIAQAOIATAQQgCAEgCACQgEACgFAAIhYAAIAABXIA2gLIA4gMIABAJIhXAeIh5AnIgFAHIgHAFgAjkg3IAFgBIAHgCQANgMANgUQANgUAMgVQALgVAIgQIhOAAIgEgPICtAAIAYgdIAHAGIAQAOIARAQQgBAEgCACQgEACgEAAIiEAAIAkAQQgCADgEADQgFACgHAAQgOAUgVAYQgVAYgVAUIBAgFIBQgIQgHgOgJgOQgJgNgJgKIAGgEQAkASAQATQAPAUAAARQABAQgKAGQgJAGgLgJIgCgNIgEgNIhEAQIhVASQgCAFgDADQgDADgEABg");
	this.shape_73.setTransform(906.1,552.775);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#333333").s().p("AAkDTQgDgFgGgFQgIgDgNgDQgMgEgWgCIAAgIIAMABIAYABIAcADIASAAQAIAAADgDQAEgCgBgGIAAh1IkkAAIgEgOIEoAAIAAg0IAzAFQgBAEgEADQgEAEgIABIAAAjIA6AAIAYgfIAIAHIARAOIAUARQgBADgEACQgDACgGAAIhxAAIAAB2QAAANgEAKQgEALgOAGQgNAGgaADQgCgIgDgGgAhFCcQgEgPgKgPQgLgQgMgPQgOgPgNgKIAGgFQAsAOAVATQAUATADARQADAQgJAHQgEAEgGAAQgGAAgIgFgAAhgQIhxAAQgfABgSgDQgRgDgGgJQgHgIAAgQIAAimIAnAQIDkAAIASgUIApAfQgDADgFADQgGADgHACIAABaQgBABgEACIgLAFQgGACgGAAIgFAAIAAgYIjwAAIAAAwQAAAGADADQADADAKACIAdABIB0AAIBEAAIAogBQAIgBAEgCQADgCACgEQAEgHAFgOQAFgQAGgXIAGAAIABA+QALADAEADQAFADAAAFQAAAHgGAEQgGAEgSADQgSACgjAAIg3ABIgjAAgAh/h5IDwAAIAAhEIjwAAg");
	this.shape_74.setTransform(858.325,553);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#333333").s().p("ACaDhQgFgKgGgKIgQgWIh4ARIibARQgCAEgDACIgFADIgRgrIAFgBIAJgDQASgLATgQQAUgQASgTQASgSAPgSQAPgSAJgOIAvAbQgCAEgFACQgFACgHgBQgPAPgXASQgWASgaASQgZASgaAPIBGgDIBYgEIBkgFQgRgUgSgUQgTgTgQgPIAGgEQA6AaAeAbQAdAaAHAVQAHAVgJAJQgEAEgGAAQgGAAgIgEgAjNAvIgEgOIFWAAIAaggIAIAGIATAPIAUARQgBAEgEACQgEACgFAAgAjogRQAggSAhgZQAhgZAegdQAegdAXgdQAWgeALgaIA4ANQgBAFgFACQgFACgJABQAXAeAhAaQAiAbApAXQAoAXAsARIgBAHQgLACgHAHQgIAHgDAJQgogUgmgbQglgbgfggQgegggTgiQgXAjgmAjQgmAkgtAfQgtAfgvAVgAh8goIgDgPIC1AAIAZgeIAIAGIARAOIATARQAAAEgEACQgDACgGAAg");
	this.shape_75.setTransform(810.375,552.5314);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#333333").s().p("AjdDaQBYgPBHgYQBFgXA3gkQA3gkAog2IicAAIgXAQIgaARQAjAKAQAOQARAPACAOQADANgHAHQgIAHgMgHQgGgSgRgRQgRgSgUgMQgdAQghAPQghAOgjALIgFgHQAwgUAqgaQArgbAjgdQAhgcAWgbIA3ANQgBAEgGACQgFACgLAAIgSAQIgTAPICOAAIAWgSIAlAhQgDADgGABIgPACQgsA6g6AmQg7AmhMAXQhOAXhlAMgAjdAhQBKgUA+gYQA9gaAxgiQAxgjAlgtIijAAIgSAMIgTAMQAiAKARAOQAQANADAMQADAMgHAGQgHAGgMgGQgIgPgQgQQgRgQgSgMQgXANgZAMQgZAMgbAKIgEgHQAmgTAjgZQAjgZAdgbQAcgbASgZIA0APQgBAEgFACQgGACgKAAIgTATQgLAKgMAJICZAAIAUgTIAkAiQgDACgGACIgOABQgpAxg1AkQg1AkhEAZQhEAZhWARg");
	this.shape_76.setTransform(763.025,552.825);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#333333").s().p("AjoC7IAbgUIAdgXIAagTIAAirIhMAAIgDgPIBHAAIAUgZIArAjQgDADgGADQgFADgLABIAACfIACACIADADQAXAZAaAMQAbAOAjAEQAhAFAuAAIA1AAIAzgBIA2gCIAAAHQgLADgGAGQgGAIgCALIiPAAQgvAAgggHQgigHgagRQgagRgWgfQgGgFgDABQgEAAgEAEIgRAWIgXAcIgVAcQABACgBAEQAAADgDACgABLCUQgCgHgGgEQgHgEgMgDIgggGIAAgIIALABIAWABIAaACIAQABQAIAAADgDQAEgDgBgGIAAjTIi4AAIgFgPIC9AAIAAhsIAyAHQgBAEgFAEQgEADgIACIAABYIAhAAIAXgiIAHAHIAQAQIAQASQgBADgDACQgEADgFAAIhSAAIAADWQAAANgEAKQgDAKgNAHQgMAGgZADQgCgIgDgFgAAGAyIgKgiQgHgSgKgTQgLgSgPgQIAGgFQAnAVARAXQARAXACASQACATgJAIQgEADgEAAQgGAAgHgFgAiKhxQgEgQgLgSQgLgTgMgSQgNgSgMgPIAHgDQAqAXAUAXQAUAWACARQACASgHAGQgEADgFAAQgGAAgIgFg");
	this.shape_77.setTransform(714.7,552.75);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#333333").s().p("ABSDXQgDgGgGgEQgGgFgMgDQgLgDgTgCIAAgIIAKABIAVABIAYACIAQAAQAHAAADgCQADgDAAgGIAAitIi5AAIgEgOIC9AAIAAhHIAyAGQgBAFgEADQgEADgJABIAAA1IAeAAIAWgcIAHAGIAQANIARAQQgBADgDACQgEACgFAAIhPAAIAACwQAAAOgDAKQgEAKgMAHQgMAGgYADIgEgPgAiXDlIAAjIQgRAUgTAQQgTASgTANIgGgHQAVgUAWgcQAVgcATghQAUgiAPglIAuAVQgCAFgFABQgFADgIgCIgSAgIgUAdIAVAHQgBADgEACQgEADgGABIAADMQgBACgIAEQgIAEgJABgAALCAQgCgPgIgQQgIgRgKgPQgLgPgLgMIAFgDQAoARARAUQASAUABAQQAAARgJAHQgEACgEAAQgHAAgHgGgAjohLQAYgbAWgpQAVgoAOgtIAwARQgCAEgEACQgFACgIAAIgKAUIgKATIBYAAIAVgbIAGAFIAPANIAPAOQgBAFgCABQgEACgFAAIhgAAQAWANAIAOQAHAOgCALQgCAKgJAEQgJADgKgIQgBgPgHgQQgIgRgJgNIgaAAQgQAZgTAVQgTAUgUAPgAghhXQAVgaATglQAUgkAPgqIAuASQgBAEgFACQgFADgIgBIgKATIgMATIB2AAIAWgdIAIAGIAQANIASAPQgBAFgDABQgEACgFAAIh1AAQAXANAIANQAJAOgCAMQgCAKgJAEQgIAEgLgIQgCgPgKgRQgJgRgMgNIgkAAQgPAVgQASQgQARgRANg");
	this.shape_78.setTransform(667.125,552.75);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#333333").s().p("AiJDlIAAjhIAiAQIDMAAIASgUIAoAeIgIAFIgMAFIAACuQAAACgFAEIgKAEQgHADgGAAIgFAAIAAghIjTAAIAAAZQgBADgIADQgIAEgLAAgAhpCzIDTAAIAAhDIjTAAgAhpBhIDTAAIAAg/IjTAAgAjagfIgFgPIECAAQAMgXALgaQALgbAHgYIkOAAIgEgOIFMAAIAXgeIAIAGIARAOIATAQQgBAFgDACQgEABgFAAIhrAAIAvAQQgCAFgFADQgFACgHgBIgbAlQgQAUgSASIBpAAIAZgfIAIAGIASAOIAUASQgCAEgDACQgDACgGAAgAhMg3QgBgOgFgQQgGgOgIgPIgPgaIAGgEQAiAUAOATQAOATgBAQQgBAPgJAFQgEACgDAAQgHAAgIgHgAAAilQgCgQgNgQQgLgQgMgMIAFgEQAhAKAQANQAOANAAAMQAAANgJAFQgDADgEAAQgGgBgIgEg");
	this.shape_79.setTransform(619.6,552.6);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#333333").s().p("AipDkIAAkPQgNAVgPATQgQASgQAQIgHgFQAWgeAUgpQAUgpASguQASguANgxIA1ARQgCAEgEADQgFACgIAAQgKAdgNAbQgLAbgOAZIATAIQgBADgEACQgEACgGABIAAEnQgBACgIAEQgIAEgKAAgAhwDSIgDgPIA+AAIAAkxIAlARIAzAAIABgaIABgcIh9AAIgEgPICBAAIACghIAAggIAzAEQgBAFgFAEQgDADgIABIgBAXIgDAZIBXAAIAYgeIAIAGIARAOIASARQgBAEgEACQgDACgGAAIiOAAIgEA2IBFAAIARgXIArAhQgCAEgGACQgFACgJABIAAENIAGAAIAWgcIAHAGIAPAOIARAPQgBAEgDACQgEACgEAAgAgWDDICfAAIAAhBIifAAgAgWBzICfAAIAAg4IifAAgAgWAsICfAAIAAg1IifAAgAgWgYICfAAIAAg3IifAAg");
	this.shape_80.setTransform(571.8,552.675);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#333333").s().p("ABGDUQgDgGgHgEQgHgEgMgDQgNgEgVgDIAAgIIALABIAXACIAbACIARABQAJgBADgDQAEgDgBgGIAAkLIimAAIgDgOICpAAIAAh1IAzAGQAAAFgFAEQgEADgJABIAABiIAXAAIAYghIAHAHIARAPIASASQgBADgDACQgDACgGAAIhMAAIAAENQABAOgEAKQgEALgNAHQgNAGgaADQgBgIgDgGgAjdC6IAAmDIAlAPIBDAAIASgUIAnAfQgCADgGADQgFADgIACIAAE6QgBADgIAEQgJAEgJABIgEAAIAAgsIhOAAIAAA4QAAADgHAEQgHAEgMABgAi+BoIBOAAIAAiBIhOAAgAi+goIBOAAIAAiCIhOAAgAAOBXQgBgUgIgWQgIgWgNgUQgNgTgOgQIAHgDQArAZAUAZQATAbABAUQABAUgJAIQgEAEgFAAQgHAAgJgHg");
	this.shape_81.setTransform(525.375,553);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#333333").s().p("AiVC4QANgHAEgFQAEgEAAgHIAAisIhdAAIgEgPIBhAAIAAjJIA2AHQgBAFgEADQgFADgLACIAACRQAogWAogYQAngaAigaQAigaAYgXIAoAfQgDAEgEAAQgFAAgHgDQgaAVgmAWQglAXgrAWQgrAVgtARIAAAZID2AAIAYgfIAIAGIASAPIAUARQgBAEgEACQgDACgFAAIjWAAQATAwAiAlQAjAmAuAaQAuAbA0APIgBAGQgLABgIAIQgIAGgEANQhOgfg2g4Qg3g4gZhSIhNAAIAAC5IA8gSIBDgWIADAIIg+AhIhVArIgFAHIgFADg");
	this.shape_82.setTransform(476.725,553);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#333333").s().p("AgiA9QgQgKgJgQQgKgQAAgTQAAgTAKgPQAJgQAQgKQAQgJASAAQAUAAAPAJQAQAKAKAQQAJAPAAATQAAATgJAQQgKAQgQAKQgPAJgUAAQgSAAgQgJgAglglQgPAPAAAWQAAAWAPAQQAPAPAWAAQAXAAAPgPQAPgQAAgWQAAgWgPgPQgPgPgXAAQgWAAgPAPg");
	this.shape_83.setTransform(1796.125,474.975);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#333333").s().p("Ag2DfIAAjgIAhAPIC3AAIASgTIAoAeQgCADgGADQgFADgIABIAACvQAAABgEADIgMAEQgGADgFAAIgFAAIAAgiIi/AAIAAAZQABADgJADQgHAEgLABgAgYCsIC/AAIAAhCIi/AAgAgYBcIC/AAIAAg/Ii/AAgAjcCQIAAlTIAhAQIA/AAIARgUIAoAfIgHAFQgHADgHACIAAEHIgEAEIgLAFQgGACgGAAIgEAAIAAguIhGAAIAAA/QAAADgHAEQgHAEgLAAgAi9A3IBGAAIAAjbIhGAAgAgkgOIAAjLIAiAPICUAAIASgUIAqAfQgDADgGADQgGADgIACIAACVQgBACgEACQgEADgHABQgGACgFAAIgEAAIAAgVIidAAIAAARQgBADgHAEQgIADgJABgAgFg5ICdAAIAAg6IidAAgAgFiCICdAAIAAg5IidAAg");
	this.shape_84.setTransform(1764.85,459.425);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#333333").s().p("AgSDeQAjgZAUgjQAVgiAKgpQALgoADgtQAEgrAAgtIAyALQgBAFgEADQgEADgJAAIgBAFQAEA7ALAwQALAxAYAkQAZAkApAaIgBAGQgLABgIAHQgHAGgDANQgegWgSghQgSghgLgpQgJgqgFgwQgFAsgMApQgMApgZAjQgaAjgrAZgAg/DVQgCgFgEgDQgFgEgJgDQgJgCgPgCIAAgIIAHABIAQABIASABIALAAQAHAAACgCQACgCAAgFIAAizIi4AAIgEgOIDYAAIAVgcIAHAGIAQANIARAQQAAAEgEACQgEABgFAAIgtAAIAAC0QAAAMgDAJQgDAJgLAGQgKAGgUADQgBgHgCgGgAjLCjIAAiLIAfAOIA1AAIARgSIAmAdQgDADgFACQgGADgGABIAABSQgCADgHADQgJADgHABIgEAAIAAgOIg9AAIAAARQgBADgHADQgIADgJABgAiuB5IA9AAIAAhEIg9AAgACcgXIAHgcIAHggIAGgeIhyAAQgJAVgKATQgKASgLAQIgIgEQAJgZAKgeQAJgfAIgiQAIghAFghIAzAOQgBAEgEADQgEADgJAAIgMAoIgQAmIBqAAIATgVIAlAkQgDADgFABIgLABIgOAdIgRAfIgSAbgAgugaIAAibIiyAAIgEgPIDGAAIAWgbIAHAFIAQANIARAQQgBAEgEACQgDACgFAAIghAAIAACRQgBACgHAEQgGADgMABgAjFgfIAAh/IAgAOIAzAAIAQgSIAmAdQgDADgFACQgGADgHACIAABIQgBADgIADQgIAEgHAAIgFAAIAAgPIg6AAIAAAQQAAACgIADQgIAEgIAAgAiohHIA6AAIAAg6Ig6AAg");
	this.shape_85.setTransform(1716.2,458.975);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#333333").s().p("AiPDmIAAjJIAlARIDSAAIATgVIApAgQgDADgFACQgGADgHACIAACVQAAACgGACQgEADgHABQgGACgGAAIgFAAIAAggIjZAAIAAAZQgBADgIAEQgJAEgLAAgAhsCzIDZAAIAAh3IjZAAgAjpgJQAhgSAhgbQAhgaAegeQAegeAWgfQAWgfALgbIA5AOQgBAFgEACQgGACgJAAQAXAgAhAcQAiAcAoAXQApAYAsARIAAAIQgMACgHAHQgIAHgDAKQgpgVgmgcQglgcgeghQgeghgSglQgWAlgnAlQglAmguAgQguAggvAWgAhyggIgDgOICsAAIAXgdIAIAGIARANIATARQgCADgDACQgEACgFAAg");
	this.shape_86.setTransform(1667.75,458.675);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#333333").s().p("AjmC8IAWgTIAagVIAXgTIAAirIhGAAIgEgPIBDAAIATgZIArAjQgDADgFADQgHADgJABIAACdIACACIADADQAXAZAaAMQAbANAkAEQAhAFAuAAIA1AAIAzgBIA3gCIAAAGQgLADgHAHQgGAIgBAKIiQAAQgvAAghgGQghgHgbgRQgZgQgXgeQgFgGgDAAQgEABgDAFIgQAVIgTAbIgSAaQACAEgBADQgBADgCACgAgvCiIAAiwIAjAPIA8AAIAAhNIiIAAIgEgPICMAAIAAhLIg7AHQgeADgdACIgDgJQAfgFAhgHQAggHAfgIIA7gRIAvgRIAmAlQgDACgHAAQgGAAgKgDIgqAIIgyAJIAABQIBUAAIAYgfIAIAGIASAOIATARQgBAFgDACQgEABgFABIiMAAIAABNIA9AAIASgTIAoAeQgCADgGACIgNAFIAAB+QAAACgEACIgLAFQgHABgFAAIgFAAIAAgcIihAAIAAAWQgBACgIAEQgIAEgKAAgAgPBzIChAAIAAhkIihAAgAiQhtQgFgQgKgUQgJgSgNgSQgMgSgMgOIAGgDQArAXATAWQAUAXACARQADASgJAHQgEADgFAAQgGAAgIgGg");
	this.shape_87.setTransform(1619.8,458.55);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#333333").s().p("AgMDfIAAkhQgqA7g1AzQg2A0g/AmIgFgFQA0goAugyQAugyAjg3QAjg3AUg2IjeAAIgFgPIF4AAIAaggIAJAGIATAPIAVARQgBAFgEACQgDACgGAAIimAAIgSAkQgJATgLASIAYAIQgBAEgEADIgKADIAAEqQgBACgIAEQgIADgJAAgADMBlQgLgSgSgVQgSgUgXgUQgWgTgYgRQgXgSgVgOIAFgFQA+AYAmAYQAmAXATAWQATAWAEAPQADAQgHAGQgEADgFAAQgFAAgHgDg");
	this.shape_88.setTransform(1571.1057,459.45);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#333333").s().p("AjkDfQAzgaAcgfQAcgeALgjQAMgiACgmIh+AAIgFgOICDAAIAAgKIAAhtIhrAAIgFgPIDxAAQAKgQAKgUIASgmIAOgkIA2AOQgCAFgFACQgEADgIAAQgOAUgSAXQgTAXgVAUIBfAAIAYgeIAIAGIASAOIAUARQgBAEgEACQgDACgFAAIhpAAIAAB3IA/AAIAZgfIAIAGIASAOIATARQAAAEgDACQgEACgFAAIh5AAIAAC+QAAACgIADQgHAFgOAAIgFAAIAAjIIh7AAQgCAdgHAdQgIAdgRAZQgSAageAXQggAXgvARgAg+AFIAAAKIB7AAIAAh3Ih7AAgAhDh/QgDgRgJgRQgKgRgNgQQgMgRgNgLIAGgFQArASATAVQATAVACARQACARgIAHQgEAEgFAAQgGAAgIgFg");
	this.shape_89.setTransform(1523.45,458.9);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#333333").s().p("AAoDYQgDgGgFgEQgHgEgNgDQgMgEgUgCIAAgIIALABIAWABIAbACIARAAQAIAAADgCQADgCgBgGIAAhfIkTAAIgFgOIEYAAIAAg0IAyAFQgBAFgEAEQgEACgIACIAAAiIAzAAIAWgcIAHAGIARANIASAPQgBAEgEACQgDACgGAAIhlAAIAABhQABAOgEAKQgEAKgMAGQgNAGgaADQgCgIgDgGgAg9C0QgEgOgJgQQgKgPgLgOQgNgOgMgKIAGgEQApAOATASQATASACAQQADAQgJAGQgEAEgFAAQgGAAgHgFgAjfAOIgEgOIDUAAIAAg2IidAAIgFgPICiAAIAAgiIgIAFIgHgFQAUgXAQghQASghANglIAvATQgCAEgGACQgEADgIgBIgJAQIgKAPIBzAAIAXgcIAHAFIARAOIASAQQgBADgEACQgDACgGAAIh0AAQAXANAJANQAIAOgDALQgCALgIAEQgIAEgLgIQgBgQgKgRQgJgQgLgNIglAAIgSAWIgSAUIAfADQgBAFgDADQgDADgHABIAAAfIBwAAIAVgZIAHAFIAQAMIARAPQgBAEgEACQgDACgFAAIigAAIAAA2ICUAAIAXgbIAHAGIARANIARAOQgBAEgDACQgDACgFAAgAjkhcQAYgXAWgkQAVgjAPgqIAtASQAAAFgFACQgFACgIgBIgJAQIgJAPIBVAAIAUgaIAHAFIAPANIAPAPQgBADgDACQgDACgEAAIhkAAQAVAOAHANQAIAOgDALQgDALgIADQgJADgJgIQAAgQgHgQQgHgQgJgNIgWAAQgQAWgTASQgTASgUANg");
	this.shape_90.setTransform(1475.3,458.875);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#333333").s().p("ABSDXQgDgGgGgEQgGgEgMgEQgLgDgTgCIAAgIIAKABIAVABIAYABIAQABQAHAAADgDQADgCAAgGIAAitIi5AAIgEgOIC9AAIAAhHIAyAGQgBAFgEADQgEADgJABIAAA1IAeAAIAWgcIAHAGIAQANIARAQQgBADgDACQgEABgFABIhPAAIAACwQAAAOgDAKQgEAKgMAHQgMAGgYADIgEgPgAiXDlIAAjIQgRAUgTARQgTAQgTANIgGgGQAVgUAWgcQAVgcATghQAUgiAPglIAuAWQgCADgFACQgFADgIgCIgSAgIgUAcIAVAIQgBADgEACQgEACgGACIAADMQgBACgIAEQgIAEgJABgAALCBQgCgQgIgRQgIgQgKgPQgLgPgLgMIAFgEQAoASARAUQASAUABAQQAAARgJAGQgEADgEAAQgHAAgHgFgAjohLQAYgcAWgoQAVgoAOgtIAwARQgCAEgEADQgFABgIAAIgKAUIgKATIBYAAIAVgbIAGAGIAPAMIAPAPQgBADgCACQgEACgFABIhgAAQAWANAIAOQAHANgCALQgCALgJADQgJAEgKgJQgBgPgHgQQgIgQgJgNIgaAAQgQAYgTAVQgTAVgUAOgAghhXQAVgaATgkQAUgmAPgpIAuASQgBAEgFACQgFACgIAAIgKATIgMATIB2AAIAWgdIAIAGIAQANIASAQQgBADgDACQgEACgFABIh1AAQAXAMAIANQAJAOgCALQgCALgJAEQgIAEgLgIQgCgQgKgQQgJgRgMgMIgkAAQgPAUgQASQgQASgRAMg");
	this.shape_91.setTransform(1427.125,458.9);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#333333").s().p("AiKDlIAAjiIAjARIDMAAIASgUIAoAeIgIAGIgMADIAACwQAAACgFACIgKAGQgHACgGAAIgFAAIAAghIjTAAIAAAZQgBACgIAEQgIAEgLAAgAhpC0IDTAAIAAhEIjTAAgAhpBiIDTAAIAAhAIjTAAgAjagfIgFgPIECAAQAMgXALgaQALgbAHgYIkOAAIgEgOIFMAAIAXgeIAIAGIARAOIATARQgBAEgDABQgEACgFAAIhrAAIAvAQQgCAFgFACQgEADgIgBIgbAlQgQAUgSASIBpAAIAZgfIAIAGIASAOIAUASQgCAEgDACQgDACgGAAgAhMg2QgBgPgFgQQgGgPgIgOIgPgaIAGgDQAiASAOAUQANAUAAAPQgBAOgJAGQgEACgDAAQgHAAgIgGgAABilQgDgQgNgQQgLgRgMgKIAFgFQAhAJAQAOQAOAOAAAMQAAAMgJAGQgDACgEAAQgGgBgHgEg");
	this.shape_92.setTransform(1379.2,458.75);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#333333").s().p("AjWDdIgFgNIDHAAIAAhsIiDAAIgEgOICHAAIAAheIh7AAIgEgPIDoAAIAYgbIAGAGIARANIASAPQAAAEgEACQgEACgFAAIh9AAIAABeIBZAAIAYgcIAHAGIARAMIAUARQgBADgEACQgEACgFAAIiPAAIAABsICIAAIAaggIAIAGIASAPIAUARQgCAEgDACQgEACgFgBgAjqAIQAggSAhgcQAhgbAegfQAfghAWgfQAWghALgbIA7APQgBAFgGABQgEADgJABQAWAhAiAdQAiAcAoAZQApAZAtASIgBAHQgLADgJAHQgJAIgCAJQgpgVglgdQgmgegegjQgdgigSgmQgYAngmAmQgnAmguAjQguAhgvAWg");
	this.shape_93.setTransform(1331.3,457.75);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#333333").s().p("AjfDdQAngUAcgbQAbgaATgfQgXgTgYgRQgXgQgWgNIAPgsIAPg2IAPg8Ig7AAIgFgPIBEAAQAIgfAFgcQAGgcADgUIAzAKQgBAFgEADQgEADgKABIgJAnIgMAuIA+AAIATgUIAlAhQgDADgEACQgEABgIABQgFA5gLA0QgLA0gZAtQAgAXAOASQAOASAAAMQABAMgIAEQgIAEgMgGQgIgNgOgPQgNgOgQgPQgVAdgfAYQggAYgrATgAiTgWQgNApgMAjIAqASIAiASQAUgrAJgwQAKgyADg3IhFAAIgYBUgAAZDVIAAl8IAjARIBnAAIAUgVIApAhQgCADgGADQgGADgIABIAAE9QgCADgIAEQgJAFgJAAIgFAAIAAg2IhwAAIAAA2QAAAEgHAEQgIAEgLAAgAA5CEIBwAAIAAkLIhwAAg");
	this.shape_94.setTransform(1281.925,458.825);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#333333").s().p("AglBCQAcgQALgVQALgTABgQQgLgDgJgFQgKgEgHgJQgHgHAAgNQAAgNAIgJQAJgIAOgBQASABAJANQAKANAAAVQAAASgGAUQgGAUgPATQgOASgaAOg");
	this.shape_95.setTransform(1217.425,479.85);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#333333").s().p("AgbDlIAAi/IiSAAIAAAkQAAADgIADQgIAEgLABIgFAAIAAjhIAkARICOAAIAAhpIAyAGQAAAFgEAEQgEADgKACIAABVICNAAIATgVIApAgQgDADgEADQgHADgHABIAACrQgBABgEADIgMAEQgGACgGAAIgFAAIAAgpIiSAAIAACyQAAAEgIAEQgHAFgLAAgAAFAXICSAAIAAiDIiSAAgAitAXICSAAIAAiDIiSAAg");
	this.shape_96.setTransform(1187.65,458.875);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#333333").s().p("AjNDiIAAlmIAjARIBTAAIAAhuIAzAFQgBAGgFAEQgDADgJACIAABaIBVAAIAAhuIAyAFQgBAGgEAEQgEADgJACIAABaIBUAAIATgVIAoAgQgDADgFACQgGADgHACIAAExQgCADgIAFQgJAEgJAAIgFAAIAAgjIlFAAIAAAaQAAAEgIAEQgHAEgLAAgAA/CtIBZAAIAAiFIhZAAgAg2CtIBVAAIAAiFIhVAAgAitCtIBWAAIAAiFIhWAAgAA/AZIBZAAIAAh9IhZAAgAg2AZIBVAAIAAh9IhVAAgAitAZIBWAAIAAh9IhWAAg");
	this.shape_97.setTransform(1139.45,459.075);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#333333").s().p("AgRDeQAhgZAWgjQAUgiAKgpQALgoAEgtQADgrAAgtIAzALQgCAFgEADQgFADgIAAIAAAFQADA7ALAwQALAxAYAkQAZAkApAaIgBAGQgLABgIAHQgHAGgEANQgdgWgSghQgTghgJgpQgKgqgFgwQgEAsgNApQgMApgZAjQgaAjgrAZgAg/DVQgCgFgEgDQgFgEgJgDQgJgCgOgCIAAgIIAGABIAQABIARABIAMAAQAHAAACgCQADgCAAgFIAAizIi5AAIgEgOIDYAAIAVgcIAHAGIAQANIASAQQgBAEgEACQgEABgFAAIgtAAIAAC0QAAAMgDAJQgEAJgKAGQgKAGgUADQgBgHgCgGgAjLCjIAAiLIAfAOIA1AAIARgSIAmAdQgDADgFACQgGADgHABIAABSQAAADgJADQgIADgHABIgEAAIAAgOIg+AAIAAARQAAADgHADQgHADgKABgAivB5IA+AAIAAhEIg+AAgACcgXIAHgcIAHggIAGgeIhyAAQgJAVgKATQgKASgLAQIgIgEQAJgZAKgeQAJgfAIgiQAIghAFghIAzAOQgBAEgEADQgEADgJAAIgMAoIgQAmIBqAAIATgVIAkAkQgCADgFABIgLABIgNAdIgRAfIgSAbgAgugaIAAibIiyAAIgEgPIDFAAIAXgbIAHAFIAPANIASAQQgBAEgDACQgEACgFAAIghAAIAACRQgBACgHAEQgGADgNABgAjFgfIAAh/IAfAOIA0AAIAQgSIAmAdQgDADgFACQgGADgHACIAABIQgBADgIADQgIAEgHAAIgFAAIAAgPIg6AAIAAAQQgBACgHADQgHAEgKAAgAiohHIA6AAIAAg6Ig6AAg");
	this.shape_98.setTransform(1090.9,458.975);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#333333").s().p("AiJDlIAAjYQgTATgVARQgWARgZAOIgFgGQAygmAlgwQAlgyAag2IiDAAIgEgPICNAAQALgZAJgYQAIgYAGgYIA1APQgBAFgFACQgEADgJgBQgGASgHASIgQAlIC7AAIAYgfIAIAGIASAPIATARQgBAEgDACQgDACgFAAIj8AAQgNAYgPAYQgQAYgTAXIAQAGQgCAHgNACIAADhQgBACgIAEQgIAEgJAAgAhVDLIgFgPICEAAIAAiZIhkAAIgEgOIBoAAIAAhyIAxAFQgBAFgEADQgDADgIACIAABgIA4AAIAXgcIAHAGIARANIASAPQgBAEgDACQgDACgGAAIhsAAIAACZIBXAAIAYgeIAHAGIASAOIATARQgBAEgDACQgDACgFAAg");
	this.shape_99.setTransform(1042.2,458.825);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#333333").s().p("AjYDZQAdglAOgrQAOgrAEguQAFgvgBgvIAAioIAnAPIEMAAIARgWIAsAiQgDADgGADIgOAFIAAFdQAAANgEAKQgDAKgLAHQgMAGgYACQgBgIgDgGQgDgGgEgEQgGgEgLgDQgLgEgRgCIAAgIIAJABIATACIAWABIAPABQAGAAADgDQADgDgBgGIAAh1IiAAAIAACbQAAADgIAEQgHADgMABIgFAAIAAimIh9AAQgGAvgTArQgTAsgoAkgAAgAlICAAAIAAhoIiAAAgAh3guIAAApQgBAVgCAVIB6AAIAAhoIh3AAgAAghSICAAAIAAhmIiAAAgAh3hSIB3AAIAAhmIh3AAg");
	this.shape_100.setTransform(992.95,459.525);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#333333").s().p("AjPDbQA1gMAwgQQAvgRApgZQAogaAkgmQAkgmAdg2IAwAYQgDAFgFABQgFAAgJgBQghA1gmAkQgmAkgrAWQgsAXgyAOQgyAOg6AIgAgKBJIAAksIAyAGQAAAFgEAEQgFADgJABIAAEKQgBAEgIAFQgJAGgJAAgAjdA5QAageAXglQAWgkAQgnQARgmAJggIAzATQgBAEgFACQgEACgJgBQgNAegUAjQgVAigaAhQgbAhggAagADCAAQgJgYgTgaQgTgcgXgZQgXgZgVgUIAFgFQAyAbAeAZQAdAaAOAWQANAWABAOQAAAPgIAEQgDACgDAAQgGAAgIgEg");
	this.shape_101.setTransform(945.7515,459);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#333333").s().p("AhhDeQAignASguQASguAIgzQAHgzACg4QABg3AAg8Ig1AAIgFgPIDLAAIARgSIAlAfQgDADgGACIgMADIgPAlIgTArIgSApIA3AAIAUgUIAkAgQgDAEgFABIgMACQgNAtgUAoQgUApgeAiQAXAYAbASQAbASAiAMIgBAFQgJACgIAHQgHAHgEALQgggPgbgUQgagUgUgZQgbAZgkAVQgjAVgsAPIgFgIQApgSAhgXQAhgYAagcQgZglgRguQgRgtgKg2QgDA4gKAzQgJAzgXAsQgWAsgoAmgAAWiQIgBAkQALA+AWA1QAUA2AiArQAYggAQglQAQgjAJgpIg7AAIgOANIgfgZIAIgEIAJgEIASgmIARgrIAQgoIhzAAIAAAmgAiRDmIAAjwQgPAkgUAhQgVAhgbAcIgHgGQAegtAVg2QAUg2AMg5IhGAAIgEgPIBRAAIAAh3IAxAGQgBAFgDAEQgFADgJACIAABjIAVAAIAXgdIAHAGIAPAOIASAQQAAAEgEACQgDACgGAAIhHAAIAAAvQAmARAQASQARARABAPQABAPgJAFQgIAGgNgJQgFgSgMgTQgNgUgNgQIAAEAQgBAEgHAEQgIAEgJAAg");
	this.shape_102.setTransform(898.05,458.825);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#333333").s().p("AjdDdIgEgOIDTAAIAAhdIifAAIgEgOICjAAIAAhDIAyAFQgBAGgEADQgEAEgJABIAAAwIBlAAIAYgeIAHAGIASAOIATAQQgBAFgDABQgEACgFAAIicAAIAABdICNAAIAaggIAIAHIASAOIATARQgBAEgEACQgDACgGAAgAjkAyQAYgUAPgUQAPgUAIgWQAHgWADgWIhBAAIgEgPIBGAAIAAgNIAAgMIAAg7Ig1AAIgDgPIC9AAIAVgbIAHAGIAQANIARAPQgBAEgEACQgDACgFAAIg4AAIAABUIAOAAIAWgdIAHAGIARAOIARAQQgCAEgDACQgDACgFAAIhAAAIAAB0QAAABgIAEQgHAEgMAAIgFAAIAAh9IhAAAQgDAXgJAYQgKAYgVAVQgUAWgiASgAh8h1IAAANIgBANIA/AAIAAhUIg+AAgACbAqQgCgFgEgFQgEgEgJgDQgIgDgOgCIAAgIIAHABIAOABIARABIALABQAGAAACgCQACgCAAgFIAAjjIAxAFQAAAFgFAEQgDADgKABIAADTQABANgDAKQgDAJgLAGQgKAGgUACIgDgNgABAgKIAAi7IAyAFQgBAFgEADQgEAEgJABIAACfQAAADgJAEQgHADgKAAg");
	this.shape_103.setTransform(849.85,458.375);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#333333").s().p("AjMDeQA9gQAkgTQAjgTATgVQASgWAGgaIiAAAIgEgOICHAAQADgMAAgNIABgaIhRAAIgFgPICXAAIAVgYIAHAFIAPAMIAQANQAAAFgEACQgEACgFAAIhLAAIgDAaIgDAZIBbAAIAXgeIAIAGIAQAOIASAQQAAAEgEACQgEACgEAAIiTAAIgFAOIgEANQBEANAnAQQAmAQAPAQQAPAQgBALQAAALgKAEQgLADgMgJQgTgWgmgWQglgWg0gVQgNAUgXASQgXARgmANQglAPg3AMgAjqBcQArgZAigeQAggfAZgiIh5AAIgFgPICHAAIAOgZIANgZIhyAAIgEgPIB8AAIAJgXIAHgYIidAAIgEgPICmAAIAIgeIAFgdIA2ALQgCAGgEADQgGADgIAAIgEASIgFASICMAAIAYgdIAIAGIARAOIASAQQgBAEgCADQgEACgEgBIjIAAIgIAYIgJAXICHAAIAXgcIAHAGIARANQAKAIAIAIQgBAEgDACQgEACgFAAIjCAAIgNAZIgPAZIDYAAIAageIAIAGIARAOIAUAQQgCAFgDACQgEACgFAAIh/AAQAPAWAYAQQAXASAbAMQAcANAbAGIgBAGQgLADgIAHQgIAFgDAKQgngQgigfQghgfgUgoIiPAAQgcAlgpAhQgoAhg3AXg");
	this.shape_104.setTransform(802.05,458.8);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#333333").s().p("AgrDnIAAkQIiVAAIgFgPIFEAAIATgUIAnAgQgDACgEACQgFACgIABQgBBNgFAsQgFAtgNAMQgIAJgMAEQgNAEgPAAQABgIgCgGQgCgGgGgEQgFgEgMgDQgMgEgOgCIAAgIIAWACIAXACIAQAAIAKgBQADgBADgDQAHgHADgoQADgnABhDIiNAAIAAEGQAAACgIAEQgIAEgNAAgAhehNIAAhFIiEAAIgDgOICHAAIAAhGIAyAFQgBAFgEADQgEAEgJABIAAA0IB7AAIAAhGIAyAFQAAAFgEADQgEAEgKABIAAA0IBFAAIAYggIAIAGIASAPIASARQAAAEgEACQgDACgGAAIh8AAIAAA4QAAADgIAEQgHAEgMAAIgFAAIAAhDIh7AAIAAA7QgBADgIADQgJAEgJAAg");
	this.shape_105.setTransform(753.725,458.625);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#333333").s().p("AjSDdIgEgPIFvAAIAZgeIAIAFIASAQIAUARQgCAEgDABQgDACgFAAgAiSBiIgEgPID+AAIAYgeIAHAGIASAOIATARQgBAEgEACQgDACgFAAgAjlAUIAVgCIAbgEIAAivIAuAFQAAAEgEADQgEAEgIABIAACZIAagEIAbgFIAAjcIAyAFQgBAFgEAEQgEAEgJABIAABUIAcAAIAWgeIAHAFIAOAPIARAQQgCAEgDABQgDACgFAAIhLAAIAABkIAqgIIArgIIACAJIhbAbQg2APhJATQgBAEgEADQgDAEgDABgABSAgQgUgBgLgDQgLgDgEgIQgEgHABgMIAAjaIAvAFQAAAFgEADQgEAEgHABIAABiQAUgIAVgMQAUgKARgLQARgLAMgKIApAdQgDADgGABQgGAAgJgCIgkAQIgrAPQgWAHgXAFIAABTQgBAHAEACQAEACAOgBIAyAAIAdAAIASgBIAGAAQACgBACgEQADgGAEgQIAIgmIAHAAIABA/QAIACADACQADAEAAAEQAAAIgIAFQgHAEgVACQgUACgnABg");
	this.shape_106.setTransform(705.4265,458.15);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#333333").s().p("AjdAdIgFgRIFsAAIAfgoIAKAIIAYAUIAZAVQgCAFgDACQgFABgFAAg");
	this.shape_107.setTransform(657.7,455.125);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#333333").s().p("ABdDYQgCgGgFgEQgHgEgJgEQgLgDgRgCIAAgIIAJAAIATACIAUABIAPABQAHAAADgDQABgDAAgFIAAhGIjBAAIAABuQgBADgGAEQgIAEgLABIgGAAIAAkGQgYAbgcAWQgcAXgiATIgEgGQAhgYAdgeQAcgeAWgiQAYgiASgjIiSAAIgFgPICeAAIAQgoQAIgUAGgUIAzARQgCAFgEACQgFACgIgBIgMAcIgNAbIC9AAIAYgeIAHAGIASAOIAUARQgCAEgDACQgDACgFAAIj8AAQgKARgLARQgLARgNARIAKAEIC2AAIASgWIAsAhQgDAEgGADQgHADgHABIAADeQAAAOgEAJQgDAKgLAGQgMAHgXACIgEgOgAhNBdIDBAAIAAg/IjBAAgAhNAPIDBAAIAAg+IjBAAg");
	this.shape_108.setTransform(609.45,458.775);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#333333").s().p("AjpC5IAagTIAcgVIAYgTIAAivIhGAAIgDgOIBCAAIAUgZIAqAjQgCADgGACQgGADgKACIAAChIADABIADADQAWAYAbANQAbAOAjAEQAiAFAuAAIA2AAIA0gBIA3gCIAAAGQgLADgHAHQgGAIgBAKIiSAAQgvABghgHQgigHgagRQgagRgXgdQgFgGgDAAQgEABgEAFIgQAUIgWAcIgUAbQABADAAADQgBADgDADgAAoCVIAAjTQgeAigjAcQglAcgqAWIgFgHQApgbAjgjQAigjAcgoQAbgoATgqIigAAIgEgOID4AAIAYgeIAHAHIASANIASAQQgBAFgDACQgEABgFAAIhjAAQgKAWgMAWQgNAUgPAVIAcAGQgBADgFADQgEADgKABIAADWQAAADgHAEQgHADgNAAgADFAtQgIgTgQgVQgRgTgTgSQgUgTgSgPIAGgEQA4AUAcAYQAcAXAGATQAHATgJAJQgEAFgGAAQgGAAgIgEgAiMh0QgEgQgKgTQgKgTgNgRQgMgTgMgOIAGgCQArAWAUAXQATAWACARQADASgJAGQgEADgEAAQgHAAgIgFg");
	this.shape_109.setTransform(561.175,459.2);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#333333").s().p("AgiA9QgQgKgJgQQgKgQAAgTQAAgTAKgPQAJgQAQgKQAQgJASAAQAUAAAPAJQAQAKAKAQQAJAPAAATQAAATgJAQQgKAQgQAKQgPAJgUAAQgSAAgQgJgAglglQgPAPAAAWQAAAWAPAQQAPAPAWAAQAXAAAPgPQAPgQAAgWQAAgWgPgPQgPgPgXAAQgWAAgPAPg");
	this.shape_110.setTransform(1673.525,381.125);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#333333").s().p("AjVDcQA2gfAjgiQAkgjAUgnQAVgmAKgqQAJgqADgtIifAAIgDgPICjAAQACgeAAggIAAhBIA2AGQgBAGgEADQgEAEgJABIgBA3IgCA0ICPAAIAUgWIAoAiIgIAEQgGADgIABQgCBJgEA6QgGA7gIAoQgIAngMAOQgLAMgPAGQgQAFgUAAQAAgIgCgGQgDgHgFgEQgFgDgKgDIgUgGIgZgFIABgJIAfADIAfADIAWABQAIAAAEgBQAFgCAEgEQAKgJAGgkQAHgkAEg4QADg3AChEIiUAAQgEAvgKArQgKAsgXAoQgYAogpAkQgpAjg/Aeg");
	this.shape_111.setTransform(1641.1,365.075);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#333333").s().p("AjADnIAAkcIAiAPIBfAAIARgUIApAfQgCADgFAEIgOADIAADJQAAANgCAJQgDALgKAGQgKAFgUADQAAgIgCgHQgCgGgEgEQgEgDgIgEQgIgCgMgCIAAgIIAJAAIAUACIAPAAQAGAAACgCQABgCAAgFIAAhHIhnAAIAABvQAAADgHAEQgIADgKABgAihBfIBnAAIAAg1IhnAAgAihAaIBnAAIAAgxIhnAAgABQDfQgUAAgKgDQgKgDgEgHQgEgIAAgNIAAi4IAwAFQAAAEgEADQgEAEgHACIAABTQAWgKAWgNQAVgOASgNQATgOALgMIArAcQgDADgGAAQgGABgJgCIglAVQgVALgYAJQgZAKgZAGIAABCQgBAGAEACQAEACANAAIAxAAIAcAAIARAAQAEAAACgCQACgBACgEQACgFAEgQIAIgjIAHAAIABA6QAIADAEAEQADACAAAGQAAAHgHAEQgIAFgUACQgVACgmAAgABOgLQgTAAgKgDQgKgEgEgHQgDgHAAgNIAAivIAvAFQAAAFgEADQgEAEgHABIAABQQAVgKAWgMQAVgMASgNQASgMAMgLIAoAcQgDAEgGAAQgGAAgIgCIgkASQgVAKgYAHQgYAJgYAGIAAA9QgBAFAEADQAEACANAAIAvAAIAbAAIARAAQAEAAACgCQACgBABgDQADgFAEgOIAIghIAGAAIABA2QAIADAEADQADACAAAGQAAAGgHAFQgIAEgUADQgUACglAAgAjhhsIAFgBIAIgCQAMgKANgPQANgPAMgRIAWghQAKgQAGgNIAuAVQgCAEgEACQgFACgIgBQgLAPgQAQQgPARgSARQgSARgRANIBGgBIBWgEQgJgQgLgOQgLgOgLgKIAFgEQApASASAVQARAUACARQACARgIAHQgIAGgNgJIgDgOQgCgIgEgHIhJAOQgrAHgzAHIgFAGIgFACg");
	this.shape_112.setTransform(1595.1266,364.75);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#333333").s().p("AgODlIAAhuIhpAAIgEgPIBtAAIAAitQgiBFg1A6Qg0A7hHAqIgGgGQArghAlgpQAkgqAbgtQAcguATgwIinAAIgFgPIDGAAIAAhvIAzAGQgBAFgEAEQgEAEgKABIAABbICAAAIAaghIAIAHIATAPIATASQgBAEgEACQgDACgFAAIiwAAQAXAuAgApQAhAoAmAgQAmAhAmATIgBAFQgLACgJAHQgJAHgEAMQg5gmgug+Qgvg+gdhRIAADNIAuAAIAXgfIAIAHIARAOIASARQgBAEgDACQgDACgFAAIhkAAIAABiQgBAEgHAEQgJAEgIAAg");
	this.shape_113.setTransform(1548.2,364.975);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#333333").s().p("AjMDfIgEgPIC8AAIAAhIIhqAAIgDgNIBtAAIAAg+IAwAFQAAAFgEADQgDADgJACIAAAsIA0AAIAVgbIAHAFIAPANIARAOQgBAFgEABQgDACgFAAIhjAAIAABIIB7AAIAZgeIAIAGIASAOIATARQAAAEgFACQgDACgGAAgAjpCaQApgXAggeQAhgeAWgiIh5AAIgEgPIB2AAIAAirIhdAAIgDgNIBgAAIAAg8IAzAGQgBAFgDAEQgFADgJACIAAAoICZAAIAAg8IA0AGQgBAFgEAEQgEAEgKABIAAAoIAkAAIAXgfIAHAGIARAPIASAQQgBAEgDABQgDACgGAAIhYAAIAACrIA1AAIAXgeIAIAHIARANIATAQQgBAEgDADQgEABgFABIiDAAQARATAaAQQAZARAcAMQAdAMAaAGIgBAGQgKAEgHAIQgGAHgCALQgrgRglgfQgkgfgZgnIiBAAQgbApgrAeQgqAgg2AWgAhPAWICZAAIAAgwIiZAAgAhPgoICZAAIAAgvIiZAAgAhPhlICZAAIAAgwIiZAAg");
	this.shape_114.setTransform(1501.7,364.45);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#333333").s().p("ABkDWQgDgHgEgEQgHgEgNgEQgOgEgRgDIABgJIAZACIAbACIASACIAMgCQAEgBAEgEQAJgJAGgoQAGgoADhAQAEg/AChXIh7AAQgQAfgSAcQgRAagVAVIgHgFQARgZAPggQANghAOgmQAMglAIgmIA0APQgCAEgFADQgDADgJAAIgMAgIgNAeIBtAAIAUgWIAnAiQgDADgEACQgFACgJABQgCCKgIBSQgIBSgSAWQgKANgOAGQgPAFgSAAQgBgIgBgGgAjXDWIAAlxIAhAQIARAAIAHgdIAHgeIAFgdIA0AMQgCAFgEADQgFADgHAAIgSAgIgTAhIBAAAIATgVIAnAgQgCADgFACIgOAFIAAEyQAAACgEACQgFADgGACQgGADgGgBIgEAAIAAgmIhpAAIAAAqQAAADgIADQgHAFgLAAgAi4CSIBpAAIAAiDIhpAAgAi4AAIBpAAIAAh8IhpAAgABCBGQgDgRgJgTQgKgTgNgQQgMgSgNgOIAGgDQAsAVAUAWQATAWADASQACATgKAHQgEADgFAAQgGAAgJgGg");
	this.shape_115.setTransform(1455.5,365);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#333333").s().p("AAeDlIAAhaIiIAAIgEgOICMAAIAAg9Ih3AAIgEgPIB7AAIAAg3IhnAAIgEgPIBrAAIAAg9Ih+AAIgEgPICCAAIAAg6IhkAAIgEgPIBoAAIAAg6IAyAFQgBAGgEADQgEAEgJACIAAAmIBLAAIARgUIApAfQgDADgFACIgNAFIAAA0IAJAAIATgZIAGAFIAOANIAOAOQgBAEgDACQgDACgFAAIgyAAIAABRQgBABgEACIgLAEQgGACgGAAIgEAAIAAgOIhQAAIAAA3IBQAAIAXgcIAHAGIARAOIASAPQgBAEgDACQgEACgFAAIiEAAIAAA9IBlAAIAXgeIAHAGIARAOIATAQQgBAEgDACQgDACgGAAIiaAAIAABNQgBAEgHAEQgIAFgKAAgAA+gVIBQAAIAAg9IhQAAgAA+hhIBQAAIAAg6IhQAAgAioDlIAAjtQgOAPgPAPQgQAOgRANIgFgGQAXgYAVgdQAUgfARgfQAQgeAKgaIAvAVQgCAEgEACQgEACgJgCIgRAcIgWAeIATAHQgCAEgDACQgEACgHABIAAD0QAAADgIAEQgHAEgKABgAjmhfQAUgTASgXQATgYAPgXQAPgYAJgUIAuAXQgCAEgEACQgEABgIgCQgNARgTAUQgSAUgXATQgWAUgXAPg");
	this.shape_116.setTransform(1407.425,365.075);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#333333").s().p("AhPDhQAngmATg4QAUg3ABhMIAvAGQAAAFgEADQgFAEgIAAIgFAoQgDATgFASQALAeAPASQAOATAUAJIAAjlIhUAAIgEgOIC2AAIATgUIAkAjQgDACgEABIgMABQgHAJgJAKIgUAVIgSAQIgIgDIAOgbQAHgQAFgPIg/AAIAABnIAxAAIAXgcIAHAGIAPANQAKAIAHAIQAAAEgEACQgDACgFAAIhjAAIAAB5QALADAMAAIAbABIBMAAIAAAHQgJACgEAGQgDAHgBAKIg+AAQglAAgbgJQgagJgUgXQgUgYgNgpQgMApgUAeQgVAegfAUgAjpDbQAZgkANgpQAOgoAGgsQAGgrABgsQABgsAAgsIg5AAIgEgPICVAAIAXgdIAHAGIAQAOIASAQQgBAEgDACQgDACgGAAIhoAAIgBAmIgBAmIAyAAIATgUIAlAfQgDADgFACQgFACgIABQgCBDgEAvQgGAugHAcQgHAbgLAKQgKAKgLAEQgNAFgOAAQAAgIgBgFQgCgGgFgEQgEgDgJgDQgKgEgMgBIAAgJIATACIATABIAOABQAGAAAEgCQAEgBAEgDQALgKAHgzQAHgzADhbIg4AAQgCAugJAtQgJAtgTApQgSApghAjgAgkhBQAUgeAQgrQARgrAKgxIAzAPQgCAEgEADQgEADgJAAIgLAeIgNAcICDAAIAXgeIAIAGIARAPIASAQQgCAEgDACQgEACgFAAIi/AAQgMAWgPASQgOASgPAOgAiCiTQgBgNgFgPQgHgPgIgNQgJgOgJgKIAGgEQAkAPAOATQAPASAAAPQgBAPgJAGQgEACgEAAQgGAAgIgGg");
	this.shape_117.setTransform(1360.3,365.175);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#333333").s().p("AjNDiIAAlmIAjARIBUAAIAAhuIAxAFQgBAGgDAEQgFADgJACIAABaIBWAAIAAhuIAyAFQgBAGgEAEQgEADgJACIAABaIBUAAIATgVIAoAgQgDADgFACQgGADgHACIAAExQgBADgJAFQgJAEgJAAIgFAAIAAgjIlFAAIAAAaQgBAEgHAEQgIAEgLAAgAA/CtIBZAAIAAiFIhZAAgAg3CtIBWAAIAAiFIhWAAgAitCtIBXAAIAAiFIhXAAgAA/AZIBZAAIAAh9IhZAAgAg3AZIBWAAIAAh9IhWAAgAitAZIBXAAIAAh9IhXAAg");
	this.shape_118.setTransform(1314.25,365.225);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#333333").s().p("AgSDeQAjgZAUgjQAWgiAKgpQAKgoADgtQAEgrABgtIAxALQgBAFgEADQgFADgIAAIgBAFQAEA7AMAwQALAxAYAkQAXAkAqAaIgBAGQgMABgGAHQgIAGgDANQgegWgSghQgTghgKgpQgKgqgEgwQgEAsgNApQgNApgZAjQgZAjgqAZgAg/DVQgCgFgEgDQgFgEgJgDQgIgCgQgCIAAgIIAIABIAPABIASABIAMAAQAGAAADgCQABgCAAgFIAAizIi4AAIgEgOIDYAAIAVgcIAHAGIAQANIARAQQgBAEgDACQgEABgEAAIguAAIAAC0QAAAMgDAJQgEAJgKAGQgKAGgVADQAAgHgCgGgAjMCjIAAiLIAgAOIA2AAIARgSIAlAdQgCADgGACQgGADgGABIAABSQgCADgIADQgHADgIABIgFAAIAAgOIg8AAIAAARQgBADgHADQgHADgKABgAiuB5IA8AAIAAhEIg8AAgACbgXIAIgcIAHggIAHgeIhzAAQgIAVgLATQgKASgLAQIgIgEQAJgZAKgeQAJgfAIgiQAIghAFghIA0AOQgCAEgEADQgFADgHAAIgOAoIgOAmIBoAAIAUgVIAlAkQgDADgEABIgMABIgOAdIgRAfIgSAbgAgtgaIAAibIizAAIgEgPIDGAAIAWgbIAHAFIAQANIARAQQgBAEgEACQgDACgFAAIgiAAIAACRQAAACgHAEQgHADgMABgAjFgfIAAh/IAgAOIAyAAIARgSIAlAdQgCADgFACQgGADgHACIAABIQgBADgHADQgJAEgIAAIgEAAIAAgPIg6AAIAAAQQgBACgHADQgIAEgJAAgAiohHIA6AAIAAg6Ig6AAg");
	this.shape_119.setTransform(1266.8,365.125);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#333333").s().p("Ag5DXQAsgaAgghQAhghAYgnQgbg1gRhCQgRhDgGhSIghAAIgEgPIC5AAIATgVIAkAiQgDAEgEABIgMADQgGAvgKAuQgLAugQApQgQArgZAmQAYAjAfAbQAfAaAmAUIgBAGQgLABgIAGQgIAHgDAKQgigVgcgcQgcgcgWgjQgZAigjAcQgiAcgvAXgAAugzQASA8AcAwQAcg2AQg8QARg9AHhCIiLAAQAIBJARA8gAh/DPQgCgGgEgEQgFgDgKgDQgKgDgMgCIABgJIATACIAVABIAOABIALgBQAEgBAEgEQAMgKAKgrQAJgsAGhKIhxAAIgPARIgjgaIAJgFIAKgEIAHgwIAGg1IAEgsIAuAMQgBAFgEADQgEADgJAAIgEAnIgFAtIgGAqIBFAAIAHg8IAGg+IAFg3IiBAAIgFgPICCAAIAQgTIAnAfQgCADgGACIgOADIgDAzIgGA+IgGA7IAIAAIASgTIAkAdQgCADgFACQgFACgHABQgGBTgMAwQgMAwgRAPQgKAJgNAEQgMAEgPAAQAAgGgBgGgAjoBaIAmgJIA3gPIBAgSIACAIIg1AbIhLAkQgBAFgDADQgCADgEACg");
	this.shape_120.setTransform(1219.525,365.925);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#333333").s().p("ABwDaQgCgFgFgDQgFgEgNgDIgbgFIAAgJIAYACIAZACIARABIALgBQAEgBADgCQAIgIAHgaQAGgbAEgqIj6AAIgQARIgigcIAJgGIAMgEIAGgXIAFgXIADgUIAvANQgCAEgEADQgEADgKgBIgFAZIgHAZICqAAIAJgrIAIgpIj/AAIgEgOIEBAAIAPgTIAnAgQgDACgGACIgNAEIgEAVIgGAcIgGAcIAsAAIASgSIAlAdQgCADgFACIgNADQgEAygIAhQgKAggOALQgJAGgMAEQgOACgOAAQAAgGgCgFgAjCCVIgEgPIEPAAIAUgZIAGAFIAQANIAPAOQAAAEgEACQgDACgFAAgAjagRQAqgbAXglQAWglAIgqIhSAAIgEgPIBZAAQACgNABgOIABgaIA0AHQgBAGgFADQgFADgHAAIgDARIgDARIA8AAIARgSIAiAcQgDADgEACIgMADQgCAugGAaQgHAagMAKQgHAFgLAEQgLADgLgBQgBgGgBgEQgBgGgFgDQgEgDgJgDIgTgEIAAgJIARABIASACIAOAAIAIgBQADAAACgCQAGgFAFgVQADgWACgkIhCAAQgGAdgPAcQgPAbgYAYQgYAXgmASgAAlgnIAAilIAiAOIBYAAIASgTIAmAdQgDADgFADIgLAEIAAByQgBACgFACIgKAEQgGACgFAAIgFAAIAAgVIhfAAIAAASQgBADgIADQgJAEgJAAgABFhSIBfAAIAAhdIhfAAg");
	this.shape_121.setTransform(1171.4,364.95);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#333333").s().p("AjnDbQAigXAXgfQAYgfAOgiQAOgiAGgiIA0AMQgBAGgFACQgEADgJAAQgEANgFANQgFANgHANQAPAfAWARQAWAQAeAFIAAipIjPAAIgEgNIGAAAIAZgfIAIAHIARAOIATAQQgBAEgDABQgEACgFAAIjEAAIAABGIBhAAIAYgfIAIAGIASAPIATARQgBADgEACQgDADgGAAIiYAAIAABaQAWABAbAAIAlAAIAtAAIAuAAIAlgBIAAAIQgJABgFAGQgFAHAAAJIiTAAQguABgggIQghgHgYgWQgYgVgRgmQgRAggdAbQgcAcgqAVgAiKgXIAAjFIAkAQIDOAAIATgVIApAgQgDADgFADQgGACgHACIAACQQgBACgEADIgMAEQgGACgGAAIgFAAIAAgWIjVAAIAAAQQgBADgIADQgJAFgKAAgAhohBIDVAAIAAg4IjVAAgAhoiHIDVAAIAAg3IjVAAg");
	this.shape_122.setTransform(1125.425,365.4);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#333333").s().p("AglBCQAcgRALgTQALgUABgPQgLgEgJgFQgKgEgHgJQgHgIAAgMQAAgNAIgIQAJgJAOAAQASAAAJANQAKANAAAVQAAASgGAUQgGAUgPATQgOASgaANg");
	this.shape_123.setTransform(1061.025,386);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#333333").s().p("AjdDdIgEgOIDSAAIAAhdIieAAIgEgOICiAAIAAhDIAzAFQgBAGgEADQgEAEgJABIAAAwIBlAAIAYgeIAIAGIARAOIATAQQgBAFgDABQgEACgGAAIibAAIAABdICNAAIAZggIAIAHIASAOIATARQAAAEgEACQgDACgFAAgAjlAyQAZgUAPgUQAPgUAHgWQAIgWACgWIhAAAIgDgPIBFAAIABgNIAAgMIAAg7Ig1AAIgFgPIC+AAIAWgbIAFAGIAQANIASAPQgBAEgDACQgEACgFAAIg5AAIAABUIAPAAIAWgdIAHAGIAQAOIASAQQgCAEgCACQgEACgFAAIhBAAIAAB0QABABgIAEQgHAEgMAAIgEAAIAAh9IhBAAQgDAXgKAYQgKAYgUAVQgTAWgjASgAh8h1IAAANIAAANIA/AAIAAhUIg/AAgACbAqQgCgFgEgFQgEgEgIgDQgKgDgNgCIAAgIIAGABIAQABIARABIAKABQAGAAACgCQADgCgBgFIAAjjIAyAFQgCAFgDAEQgEADgKABIAADTQABANgEAKQgCAJgKAGQgLAGgUACIgDgNgABAgKIAAi7IAxAFQAAAFgEADQgEAEgJABIAACfQgBADgHAEQgIADgJAAg");
	this.shape_124.setTransform(1031.25,364.525);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#333333").s().p("AjMDdQA9gQAkgSQAkgTASgVQASgXAGgZIiAAAIgEgOICHAAQADgMAAgNIABgaIhSAAIgDgPICWAAIAVgYIAHAFIAOAMIARANQAAAFgEACQgDACgGAAIhMAAIgCAaIgDAZIBbAAIAXgdIAHAFIARAOIASAQQgBAEgDACQgEACgEAAIiTAAIgFAOIgEAOQBEAMAmAQQAnAQAPAQQAPAPAAAMQgCAMgJADQgLADgMgJQgTgVglgXQgmgXg0gTQgNATgXASQgXAQgmAOQglAPg3ALgAjqBcQAsgZAggeQAhgfAZgiIh5AAIgEgPICGAAIAOgZIANgZIhyAAIgEgPIB8AAIAJgXIAHgYIicAAIgFgOICmAAIAIgfIAFgdIA2ALQgBAGgFADQgGADgIAAIgEASIgFATICMAAIAYgeIAIAGIARAOIASAQQgBAFgCABQgEACgEAAIjIAAIgIAYIgJAXICIAAIAWgcIAHAGIARANQAKAIAIAIQgBAEgEACQgDACgFAAIjCAAIgNAZIgPAZIDZAAIAZgeIAIAGIARAOIAUAQQgBAFgEACQgEACgFAAIh/AAQAPAWAYARQAXARAbAMQAcAMAbAHIgBAGQgLADgIAHQgJAFgCAKQgogQghgfQghgfgUgoIiPAAQgdAlgoAhQgoAgg4AYg");
	this.shape_125.setTransform(984.55,364.95);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#333333").s().p("AgrDnIAAkQIiVAAIgFgPIFEAAIATgUIAnAgQgDACgEACQgFACgIABQgBBNgFAsQgFAtgNAMQgIAJgMAEQgNAEgPAAQABgIgCgGQgCgGgGgEQgFgEgMgDQgMgEgOgCIAAgIIAWACIAXACIAQAAIAKgBQADgBADgDQAHgHADgoQADgnABhDIiNAAIAAEGQAAACgIAEQgIAEgNAAgAhehNIAAhFIiEAAIgDgOICHAAIAAhGIAyAFQgBAFgEADQgEAEgJABIAAA0IB7AAIAAhGIAyAFQAAAFgEADQgEAEgKABIAAA0IBFAAIAYggIAIAGIASAPIASARQAAAEgEACQgDACgGAAIh8AAIAAA4QAAADgIAEQgHAEgMAAIgFAAIAAhDIh7AAIAAA7QgBADgIADQgJAEgJAAg");
	this.shape_126.setTransform(937.325,364.775);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#333333").s().p("AA/DXQgCgFgHgEQgFgEgKgDIgWgFIgYgFIAAgJIAhAEIAiADIAWABQAJAAAFgBQAFgCAEgEQAKgJAJgcQAIgeAHgrQAGgqAEgxIj9AAIgRARIgkgbIAJgFIALgFIAIgsIAIg0IAHgzIAEgpIAxAMQgBAFgEADQgFAEgJgCIgEAhIgFAlIDuAAIAZgfIAJAGIASAPIAUARQgBAEgDACQgEACgFAAIkrAAIgHAuIgIAoID6AAIAUgUIAmAgQgCADgFACIgNACQgEA2gIAuQgHAvgLAgQgLAigNAMQgLALgQAEQgQAFgTABQAAgIgDgHgAjYBTIgEgOID+AAIAZggIAIAHIASAPIAUAQQgBAEgEACQgEACgFAAg");
	this.shape_127.setTransform(889.825,365);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#333333").s().p("AjLDdQA7gQAlgSQAjgTATgVQASgXAGgZIiAAAIgEgOICHAAQACgMABgNIABgaIhRAAIgFgPICXAAIAVgYIAHAFIAPAMIAQANQgBAFgDACQgEACgFAAIhLAAIgCAaIgEAZIBbAAIAXgdIAIAFIARAOIARAQQAAAEgEACQgEACgFAAIiSAAIgFAOIgEAOQBEAMAnAQQAmAQAPAQQAPAPgBAMQAAAMgKADQgLADgLgJQgVgVglgXQglgXg1gTQgMATgXASQgXAQgmAOQglAPg3ALgAjqBcQArgZAigeQAggfAYgiIh4AAIgFgPICHAAIAOgZIANgZIhyAAIgEgPIB8AAIAJgXIAIgYIieAAIgEgOICmAAIAIgfIAGgdIA1ALQgCAGgEADQgGADgIAAIgEASIgFATICMAAIAYgeIAIAGIARAOIASAQQgBAFgCABQgEACgFAAIjHAAIgIAYIgJAXICHAAIAXgcIAHAGIARANQAKAIAIAIQgBAEgDACQgDACgGAAIjCAAIgNAZIgPAZIDYAAIAageIAIAGIARAOIAUAQQgCAFgDACQgEACgFAAIh/AAQAPAWAYARQAXARAbAMQAbAMAcAHIgBAGQgLADgJAHQgHAFgDAKQgogQghgfQghgfgUgoIiPAAQgcAlgpAhQgoAgg3AYg");
	this.shape_128.setTransform(843.55,364.95);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#333333").s().p("AgrDnIAAkQIiVAAIgFgPIFEAAIATgUIAnAgQgDACgEACQgFACgIABQgBBNgFAsQgFAtgNAMQgIAJgMAEQgNAEgPAAQABgIgCgGQgCgGgGgEQgFgEgMgDQgMgEgOgCIAAgIIAWACIAXACIAQAAIAKgBQADgBADgDQAHgHADgoQADgnABhDIiNAAIAAEGQAAACgIAEQgIAEgNAAgAhehNIAAhFIiEAAIgDgOICHAAIAAhGIAyAFQgBAFgEADQgEAEgJABIAAA0IB7AAIAAhGIAyAFQAAAFgEADQgEAEgKABIAAA0IBFAAIAYggIAIAGIASAPIASARQAAAEgEACQgDACgGAAIh8AAIAAA4QAAADgIAEQgHAEgMAAIgFAAIAAhDIh7AAIAAA7QgBADgIADQgJAEgJAAg");
	this.shape_129.setTransform(796.325,364.775);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#333333").s().p("AhyDgQAbgsANgwQAMgxAEgzQAEgyAAgzIAAiRIAmAQIC8AAIAQgRIAkAbQgCADgEACIgLADIAABOQAAACgEACIgLAEQgGACgFAAIgFAAIAAgQIjHAAIAAAnQABAjgDAlQgCAogIAnQgIAogRAlQgRAmgdAggAgXh7IDHAAIAAg8IjHAAgAiuDWQgCgGgEgEQgFgFgJgDQgIgDgOgCIAAgIIAGABIAPABIARABIALAAQAHAAACgCQACgCAAgFIAAiQIgYAOIgaAOQgBAEgDAEQgCAEgEABIgSgpIAggKIAugRIAAhqIhDAAIgEgPIBHAAIAAhxIAxAFQAAAGgEADQgEAEgKABIAABeIALAAIAUgaIAHAFIAOANIAQAPQgBAEgDACQgEACgFAAIg3AAIAABfIAbgLIAcgLIADAIIgaAQIggARIAACmQABAOgEAKQgDAKgKAGQgKAGgVACQAAgIgCgGgAgxDRIgEgPIB9AAIAAhHIhVAAIgEgPIBZAAIAAg5IAvAFQAAAEgEAEQgEADgIABIAAAoIAwAAIAVgaIAGAGIAPAMIAPAPQgBAEgDACQgDACgFAAIhdAAIAABHIBEAAIAXgcIAHAGIAQANIASAQQgBAEgEACQgDACgFAAgAgFAYIAEgBIAGgCQAKgHALgLQALgLAKgOIASgZIhNAAIgEgPICsAAIAXgcIAHAFIARAOIASAQQgBAEgEACQgDACgGAAIhmAAQgQASgVATQgUASgVAQIA8gEIBKgFIgTgWIgTgTIAGgEQAqAQATARQAUATACAOQADAPgIAGQgIAHgNgIQgCgHgFgIIgLgQIhDAOIhUARIgFAEIgEADg");
	this.shape_130.setTransform(749.225,365.025);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#333333").s().p("AgsDbQgDgFgGgDQgFgDgMgDIgggGIAAgIIAKABIAWABIAYACIAQABQAIAAADgDQACgBAAgGIAAgvIjOAAIgEgOIDSAAIAAgjIiXAAIgEgPICbAAIAAgkIhQADIhRABIgBgLQAogBArgEIBUgIIBOgJIBAgKIAdAeQgEADgGAAQgGgBgIgFIg5AGIhAAEIAAAmIBeAAIAWgZIAHAFIAQAMIASAPQgBAEgDADQgDABgGAAIiQAAIAAAjICTAAIAYgbIAHAFIARAOIATAPQAAAEgEABQgEACgFAAIjJAAIAAAwQAAAMgEAJQgEAKgLAFQgMAFgXADQgBgHgDgFgAh+AIIAAh1IAjAPICyAAIASgSIAmAdQgCADgFACQgFADgHACIAAA8QAAADgFACIgKADQgGACgGABIgFAAIAAgMIi6AAIAAAOQAAABgJADQgIAEgKAAgAhegcIC6AAIAAgzIi6AAgAjehFQgDgJAEgHQAEgHAIgFQAPgHAIgTQAJgTgCgYIAJAAQAEAMACALICTAAIAAhXIAyAGQgBAGgEADQgEAEgJAAIAABEIA1AAQAMgSAMgXQAMgWAJgTIAzAQQgCAFgFACQgFACgIAAQgMAOgQAPQgRAPgRANIBTAAIAWgWIAnAmQgDACgFABIgLABQgJAMgNANQgNAOgMAKIgHgEIAIgXIAHgbIlKAAQABAXgIAQQgIAQgLAHQgJAGgLAAQgKgBgEgIgAhliWQgDgMgHgNQgHgNgKgLQgKgMgLgJIAGgEQAlALARAQQAQAQABANQABAPgIAGQgEACgEAAQgHAAgHgFg");
	this.shape_131.setTransform(702.525,364.9);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#333333").s().p("AgXDTQgPgKABgaIAAjFIg+AWIgKgLIBIgbIAAiPIAwAGQgBAFgEAEQgEADgIACIAABvIBDgZIAAiQIAwAGQAAAFgEAEQgEADgJACIAABwIBEgZIAEgCIASgTIAlAeQgCADgFACQgFACgHABQgBBBgCAoQgDAogFAWQgFAVgIAIQgIAJgLAEQgLADgLAAQAAgHgBgGQgBgGgEgEQgEgDgHgCIgPgEIAAgJIAUABIARABIAIgBQADgBACgCQAFgFADgUQADgTACgkIADheIhNAdIAADQQgBADgIAFQgHAEgKAAIgFAAIAAjQIhDAZIAADLQAAAHADAFQADAEAHACQAIACAPAAIBLAAIAsAAIAbgBQAGgBADgCIAFgFQADgHAFgUQAFgVAGgcIAGAAIABBOQAKAEAEADQADAEAAAFQABAJgKAEQgKAGgdABQgcACg1AAIhMAAIgDAAQgiAAgOgJgAjpCPIAcgKIAngQIAAirIg7AAIgDgPIA+AAIAAiMIAyAFQgBAGgEADQgEADgJABIAAB6IARAAIAVgdIAHAGIAPAOIAQAQQgBAEgDACQgDACgFAAIhAAAIAACeIAlgRIAmgRIADAHIg/AqQglAYgvAdQgBAEgDAEQgCADgEACg");
	this.shape_132.setTransform(655.4012,364.2262);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#333333").s().p("AA6DYQgDgGgFgDQgGgFgKgDQgKgDgRgCIAAgIIAJAAIASACIAVABIAOABQAHAAACgDQADgCAAgGIAAidIhaAAIgPAPIgkgcIAKgEIAMgFIAMgeIAOglIgrAAIgFgPIA1AAIAKggIALghIhSAAIgEgPIBbAAIALglIAIgeIAuAPQgBAEgFADQgFADgJgBIgGAUIgHAXIByAAIAXgdIAHAGIARAOIASAQQgBAEgDACQgDACgGAAIirAAIgKAgIgMAhIA0AAIAQgUIApAfQgCADgGADQgFADgIABIAABFIAoAAIAWgbIAHAGIAQANIASAOQgBAEgDACQgEACgFAAIhaAAIAAChQABANgEAKQgDAKgMAGQgLAGgWACQgBgIgCgGgAAEgbIgMAjIBZAAIAAhLIg+AAIgPAogAhhDKQAbgYAaglQAbglARgtIAwAXQgCAEgFACQgFACgIgBQgYAogeAeQgfAegiATgAjgCZIArgLIA5gRIBAgVIACAHIg4AiQghASgrAWQgBAFgDADQgDADgEACgADIC+QgDgUgKgWQgKgWgNgVQgNgUgOgQIAGgEQAtAbAUAaQAUAbACAUQACAUgJAIQgEADgEAAQgHAAgIgGgAjmAvIAGgCIAIgEQANgMAPgRQAPgQAOgVQAOgUANgUIggAJIgkALIgFAEIgFADIgRgsIAEgBIAHgDQALgMAKgRQALgSAKgUIASgnIAMghIAwAWQgBAEgFACQgEADgHgBQgKASgOAUIgeApQgQAUgQAQIAjAAIAqgCIAOgZIAKgVIAuAZQgBADgFACQgFACgHgBQgOAWgVAZQgUAZgYAZQgXAZgYAVIA7gHIBFgJIABAHIg4AUQgkANgrAMIgGAFIgFADg");
	this.shape_133.setTransform(608.4682,365.075);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#333333").s().p("AjkDgQgCgHADgHQAEgGAHgFQAMgFALgJQAMgKAJgOQAJgNADgQIAJAAQADAZgHATQgGATgLAMQgKANgLAFQgKAGgKABQgKAAgFgIgADADjQgGgRgNgTQgOgTgRgSQgRgSgQgNIAFgEQA0ATAYAWQAZAVAFATQAFASgJAJQgEAEgHAAQgFAAgIgEgAhDDdQAAgOgEgPQgDgQgFgPQgEgPgGgMIAHgDQAcAYAJAUQAKAVgCAOQgCAOgJADIgFABQgHAAgHgHgAA2DcQgDgOgIgQQgIgQgKgPQgJgQgKgMIAGgDQAlAUAQAUQARATABAQQAAAPgIAGQgEACgDAAQgHAAgHgGgAiGB1QgCgEgDgDQgEgEgIgCQgHgCgNgCIAAgIIAJABIAUACIAPAAQAFAAACgCQACgCAAgFIAAgeIgiAGIgmAHQgCAFgDACQgDADgDABIgRgkIApgDIA7gGIAAgcIAbADIAOgKIANgKIiIAAIgFgPICXAAIATgSIAhAfQgCADgFABIgNABIgYAJIgdAJIAEABQgBAFgEADQgEADgIABIAAAIIBVgJIABAJIgnAIIgvAKIAAAlQAAAMgDAJQgDAIgJAFQgKAFgTACQAAgGgCgFgAC+B2QgRgMgKgXQgKgYgFghQgEgfgBgmQgBglABgpIgzAAIgEAwQgDAYgFAWQAYASALAPQALARAAAMQAAAMgGAFQgHAFgLgHQgEgMgIgMIgSgZQgNAkgYAfQgYAggoAZIgHgIQAkgdAVgiQAVgjAJgnIgWgUIgVgRIAFgEIAXAJIATAJQADgSACgUIADgoIg1AAIgEgPIA5AAIABgsIAAguIAuAFQAAAFgEADQgEADgIACIgBAlIgBAjIAuAAIATgTIAkAfQgCADgFACIgMADQgBAcAAAfQgBAfADAbQACAdAGAWQAFAVAKAJQABABAAAAQABABABAAQAAAAABAAQAAAAABAAIADgGIAGgUIAGgXIAGABIgEA5QAHAIACAFQACAGgCAEQgFAJgLAAQgLAAgMgHgAi7goIAAhmIAkAPIBeAAIARgRIAkAbIgHAFQgFACgGABIAAA5QgBACgIAEQgJADgIABIgEAAIAAgNIhpAAIAAAFQAAADgHADQgHAEgMAAgAidhGIBpAAIAAgqIhpAAgAjbiYIgEgPIC7AAIAUgZIAGAFIAOAMIAQAOQgBAFgEACQgDACgFAAgAhtivQgDgOgJgOQgKgOgLgKIAFgEQAhAHANALQANAMAAAMQgBAMgIAFQgEACgEAAQgGAAgIgFg");
	this.shape_134.setTransform(561.4924,364.825);

	this.instance_3 = new lib.Bitmap2111();
	this.instance_3.setTransform(452,655);

	this.instance_4 = new lib.Bitmap11111111111();
	this.instance_4.setTransform(452,319);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1}]}).to({state:[{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27}]},472).to({state:[{t:this.instance_4},{t:this.instance_3}]},6).wait(419));

	// bg
	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("EiLsBMwQhvAAhQhPQhPhPAAhwMAAAiRDQAAhwBPhPQBQhPBvAAMEXZAAAQBvAABPBPQBQBPAABwMAAACRDQAABwhQBPQhPBPhvAAg");
	this.shape_135.setTransform(959.9897,540.0003,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_135).wait(897));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(999,588.8,882,442.5);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#AAD7E3",
	opacity: 1.00,
	manifest: [
		{src:"images/节奏练习_atlas_1.png?1690421996350", id:"节奏练习_atlas_1"},
		{src:"sounds/_4编创1课1.mp3?1690421996422", id:"_4编创1课1"},
		{src:"sounds/_4编创1课10.mp3?1690421996422", id:"_4编创1课10"},
		{src:"sounds/_4编创1课11mp3复制.mp3?1690421996422", id:"_4编创1课11mp3复制"},
		{src:"sounds/_4编创1课12.mp3?1690421996422", id:"_4编创1课12"},
		{src:"sounds/_4编创1课13.mp3?1690421996422", id:"_4编创1课13"},
		{src:"sounds/_4编创1课14.mp3?1690421996422", id:"_4编创1课14"},
		{src:"sounds/_4编创1课15.mp3?1690421996422", id:"_4编创1课15"},
		{src:"sounds/_4编创1课16.mp3?1690421996422", id:"_4编创1课16"},
		{src:"sounds/_4编创1课17.mp3?1690421996422", id:"_4编创1课17"},
		{src:"sounds/_4编创1课18.mp3?1690421996422", id:"_4编创1课18"},
		{src:"sounds/_4编创1课2.mp3?1690421996422", id:"_4编创1课2"},
		{src:"sounds/_4编创1课3.mp3?1690421996422", id:"_4编创1课3"},
		{src:"sounds/_4编创1课4.mp3?1690421996422", id:"_4编创1课4"},
		{src:"sounds/_4编创1课5.mp3?1690421996422", id:"_4编创1课5"},
		{src:"sounds/_4编创1课6.mp3?1690421996422", id:"_4编创1课6"},
		{src:"sounds/_4编创1课7.mp3?1690421996422", id:"_4编创1课7"},
		{src:"sounds/_4编创1课8.mp3?1690421996422", id:"_4编创1课8"},
		{src:"sounds/_4编创1课9.mp3?1690421996422", id:"_4编创1课9"}
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