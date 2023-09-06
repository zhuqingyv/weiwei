(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"笙_atlas_P_1", frames: [[0,0,2196,4458]]}
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



(lib.笙_1 = function() {
	this.initialize(ss["笙_atlas_P_1"]);
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


(lib.musicplay = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(10.5835,41.5531,3.0728,3.0728);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_1.setTransform(28.2302,41.5312,3.0728,3.0728);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_2.setTransform(45.0573,41.5787,3.0728,3.0728);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgkCDQgCgEABgEQAAgEAEgCQAYgRANggQAOgfAAglQAAgkgOgfQgNgfgXgSQgEgCAAgEQgBgEACgEQADgDAEgBQAEAAADACQAbAUAQAkQAQAjAAApQAAAqgQAkQgRAjgbAUQgDACgCAAQgGAAgDgEg");
	this.shape_3.setTransform(61.7786,41.5403,3.0728,3.0728);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape},{t:this.shape_1}]},8).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_2}]},9).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_2},{t:this.shape_3}]},9).wait(8));

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ArfLgIAA2/IW/AAIAAW/g");
	this.shape_4.setTransform(42.3,52.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(34));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.3,-21.3,147.20000000000002,147.20000000000002);


(lib.m1_btn = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(62.013,41.6074,3.0731,3.0731);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_1.setTransform(45.2901,41.6459,3.0731,3.0731);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_2.setTransform(28.4614,41.5983,3.0731,3.0731);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgYAYQgKgJAAgPQAAgOAKgKQALgKANAAQAOAAAKAKQALAKAAAOQAAAPgLAJQgKALgOAAQgNAAgLgLg");
	this.shape_3.setTransform(10.8131,41.6202,3.0731,3.0731);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AqFKGIAA0LIULAAIAAULg");
	this.shape_4.setTransform(47.425,47.425);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.2,-17.2,129.29999999999998,129.29999999999998);


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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("AiFCOIAAgTICBAAIAAg0IhaAAIAAgTIBaAAIAAguIhNAAQgGALgIAJIgOARIgJgHIgJgGQAQgPANgUQAOgUAIgXIAVAFQgDAIgEAIIgIAPIBCAAIAAgiIgIgGIgIgFQARgQAMgVQANgWAIgZIAUAFIgFAPIgGANIBqAAIAAATIhFAAIAMATQAGAJADAIIgSAIQgEgJgIgMIgPgXIgXAAQgGAMgIAKIgPASIAQAAIAAAlIBuAAIAAASIhuAAIAAAuIBlAAIAAATIhlAAIAAA0ICAAAIAAATgAiHgvIgJgGQAQgQANgXQAOgYAIgZIAUAFIgFAOIgHAOIBWAAIAAATIg7AAIAKATIAGARIgTAHIgHgUIgLgXIgOAAIgQAaQgIAMgJAKIgJgGg");
	this.shape.setTransform(17.475,30.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(153,0,0,0.6)").s().p("AiFCOIAAgTICBAAIAAg0IhaAAIAAgTIBaAAIAAguIhNAAQgGALgIAJIgOARIgJgHIgJgGQAQgPANgUQAOgUAIgXIAVAFQgDAIgEAIIgIAPIBCAAIAAgiIgIgGIgIgFQARgQAMgVQANgWAIgZIAUAFIgFAPIgGANIBqAAIAAATIhFAAIAMATQAGAJADAIIgSAIQgEgJgIgMIgPgXIgXAAQgGAMgIAKIgPASIAQAAIAAAlIBuAAIAAASIhuAAIAAAuIBlAAIAAATIhlAAIAAA0ICAAAIAAATgAiHgvIgJgGQAQgQANgXQAOgYAIgZIAUAFIgFAOIgHAOIBWAAIAAATIg7AAIAKATIAGARIgTAHIgHgUIgLgXIgOAAIgQAaQgIAMgJAKIgJgGg");
	this.shape_1.setTransform(17.475,30.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).wait(3));

	// 图层_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_2.setTransform(118.425,27.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,236.9,55.3);


(lib.未选择答案 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhlBhIAOgXIAPgaIAQgcIANAMIgOAaIgPAaIgPAZgAguBoIAAgRIBFAAIAAg9Ig1AAIAAgSIA1AAIAAg0Ig+AAIAAgSICPAAIAAASIg/AAIAAA0IA2AAIAAASIg2AAIAAA9IBEAAIAAARgAhNgIIgQgJIgPgJIAJgMIAQAHIAQAJIANAHIgKAPIgNgIgAAahKIgHgPIgIgNIAQgGIAIANIAIAOIAEAMIgRAHIgEgMgAg/hJIgRgJIgQgJIAKgNIAQAIIAQAIIANAJIgKAPIgMgJg");
	this.shape.setTransform(59,19.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhEBtIAAh2QgHASgIASQgIARgJAMIgFgIIgFgIQAHgKAIgNQAHgNAGgPQAGgPAEgPIggAAIAAgRIAkAAIAAgzIASAAIAAAzIAfAAIAAARIgfAAIAAAGIAHAJIAKAMIAJAMIAGAHIgLANIgFgJIgIgLIgIgMIAAB7gAAGBjIgDgJIARAAIAKAAIADgBQABAAAAAAQAAAAAAgBQAAAAAAAAQAAgBAAAAIAAhoIgxAAIAAgRIB+AAIAAARIg7AAIAABoQAAAHgCAEQgBAFgGACQgEADgJAAIgVAAIgDgJgABYBAIgJgZQgEgOgHgMIAQgFIALAZIAJAaIAHAVIgRAHQgCgKgEgNgAgWBRIgIgEQALgNAHgSQAIgRAEgUIAQAEQgDAOgGANQgEANgGAMQgFAMgHAJIgHgFgAgFhKIAAgRIBmAAIAAARg");
	this.shape_1.setTransform(34.75,20.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#E28623").ss(1,1,1).p("AlTj5IKnAAQBoAABIBJQBKBJAABnQAABohKBIQhIBKhoAAIqnAAQhnAAhKhKQhJhIAAhoQAAhnBJhJQBKhJBnAAg");
	this.shape_2.setTransform(47.3123,19.9241,0.8004,0.7999);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AlTD6QhoAAhJhJQhJhKAAhnQAAhnBJhJQBJhJBoAAIKnAAQBnAABKBJQBJBJAABnQAABnhJBKQhKBJhnAAg");
	this.shape_3.setTransform(47.3123,19.9241,0.8004,0.7999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.9,-1.1,96.5,42);


(lib.标注 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AhvCNIgDgGQgDgDgGgBIgPgEIAAgEIAFAAIAKABIAKAAIAIABQAEgBABgBQAAAAAAgBQABAAAAgBQAAAAAAgBQAAgBAAgBIAAg/IgOAGIgQAGQAAADgCACIgEADIgMgbIAUgEIAcgGIAAgyIgqAAIgDgKIAtAAIAAgxIAfAEQAAADgCACQgDACgGABIAAAlIAJAAIAMgQIAEADIAIAJIAKAIQAAABAAABQgBAAAAABQAAAAgBABQAAAAgBAAQgCACgDAAIgjAAIAAAtIAUgFIATgFIACAFIgTAIIgWAKIAABKQAAAIgCAGQgCAGgGAEQgHAEgNACIgCgJgAgoCFQABgCADgCIAFgEIAAi7IAYAKIBoAAIAOgSIAFAEIAKAJIAMAKIgDADIgGABIiNAAIAACqIB1AAIAPgTIAEAEIALAIIAMALQgBACgCACQgDACgDgBIiUAAIgHAMgAA5BzIAAhrIgcAAIAABMIgFADQgDACgGAAIgDAAIAAhiIASAJIAbAAIAAgkIAcAEQgBADgCACQgDACgFABIAAAYIAXAAIAJgMIAZARIgFADIgJADIAAA1QAAAKgEAGQgEAGgNABIgBgGQAAgCgCgCIgFgDIgIgCIAAgFIAEAAIAGABIAGAAIAEgBIABgEIAAg3IgbAAIAABkQgBACgEADQgFABgFABgAiVg4QAPgQANgZQAPgXAJgdIAfANQgBACgDABQgDACgFgBIgFAJIgFAIIA6AAIANgRIAEAEIAKAJIAKAJQAAACgDACIgFABIg9AAQAOAHAEAIQAFAIgCAGQgCAGgFABQgFACgGgEQgBgJgFgJQgFgJgGgHIgSAAQgMARgNANQgMANgOAJgAgGhGQAKgPAJgUQAKgVAHgXIAfAMQAAADgEABQgDACgFgBIgEAJIgFAIIBEAAIAOgSIAGAEIALAJIALAKQAAACgDABQgCACgEAAIhIAAQAOAGAFAJQAFAHgBAGQgCAHgFACQgGACgGgFQgCgJgFgJQgEgJgHgHIgWAAQgHAMgKAKQgIAJgJAIg");
	this.shape.setTransform(485.65,391.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AiPCRIgDgJICLAAIAAhAIhYAAIgCgKIBaAAIAAg2IhKAAQgLAQgMAOQgMANgNAKIgEgDQAKgNAKgRQAJgRAJgSQAIgUAHgVIAgAMQgBADgCABQgEACgFAAIgIAPIgHAOIBEAAIAAguIAfAEQgBADgCACQgDADgFABIAAAhIBIAAIAPgTIAEAEIAMAJIAMAKQgBAAAAABQAAAAgBABQAAAAgBABQAAAAAAAAQgDACgCAAIhrAAIAAA2IA8AAIAOgSIAFADIALAJIALAKQAAABAAAAQAAABgBABQAAAAAAAAQgBABgBAAQgCACgDAAIhdAAIAABAIBeAAIAPgUIAFAEIALAJIAMALQgBADgCABQgCABgEAAgAiVghQAKgNAKgSQALgRAKgVQAJgUAHgWIAeALQgBADgDACQgDABgFAAIgGANIgHAMIA7AAIANgQIAEADIAKAIIAKAKQgBAAAAABQAAABAAAAQgBAAAAABQAAAAgBABIgGABIhAAAQARAKAHALQAGALAAAIQgBAHgGADQgFADgHgGQgCgLgGgNQgIgNgHgKIgRAAQgMATgMAQQgOAQgPALgABJgsQgCgMgIgNQgHgNgKgKIgRAAQgJANgLAKQgJALgLAIIgDgDQANgRAMgYQAMgXAKgbIAeALQgCADgDACQgCABgGAAIgHANIgHAMIBJAAIAOgSIAGAEIAKAJIALAKQAAAAAAABQAAABAAAAQgBAAAAABQAAAAgBABIgFABIhTAAQATAKAGAKQAIALgBAIQgBAIgFADIgEABQgEAAgFgDg");
	this.shape_1.setTransform(452.9,390.775);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#E99019").ss(1,0,0,4).p("ACsAAIlWAA");
	this.shape_2.setTransform(366.4403,391.8843,2.3237,2.3237);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E99019").s().p("AjaCCQgjAAgagZQgZgZAAgjIAAhZQAAgjAZgZQAZgZAkAAIG2AAQAjAAAZAZQAZAZAAAjIAABZQAAAjgZAZQgZAZgjAAg");
	this.shape_3.setTransform(469.2039,391.3615,2.3237,2.3237);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhrCVIAAjDIAXALICnAAIAMgNIAbAVIgGADIgJADIAACfIgDAEIgHACQgEACgEAAIgDAAIAAgZIirAAIAAAVQgBABgFADQgFACgGABgAAKBvIBMAAIAAhDIhMAAgAhVBvIBLAAIAAhDIhLAAgAAKAjIBMAAIAAg9IhMAAgAhVAjIBLAAIAAg9IhLAAgAg5g4IAAgpIhZAAIgBgJIBaAAIAAgqIAhADQAAAEgDABQgCADgHABIAAAeIBHAAIAAgqIAhADQgBAEgCABQgDADgGABIAAAeIAwAAIARgUIAEAEIAMAKIAMALQgBAAAAABQAAAAAAABQgBAAAAABQgBAAAAAAIgGABIhUAAIAAAiQAAABgFACQgFADgHAAIgEAAIAAgoIhHAAIAAAjQAAACgFACQgGACgGAAg");
	this.shape_4.setTransform(467,30.2);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AiPCRIgCgJICJAAIAAhAIhWAAIgDgKIBZAAIAAg2IhJAAQgLAQgLAOQgMANgNAKIgFgDQAKgNAKgRQAJgRAJgSQAJgUAFgVIAiAMQgBADgEABQgDACgFAAIgHAPIgIAOIBDAAIAAguIAhAEQgCADgCACQgCADgGABIAAAhIBIAAIAPgTIAFAEIALAJIALAKQAAAAAAABQAAAAgBABQAAAAgBABQAAAAAAAAQgCACgEAAIhqAAIAAA2IA8AAIAPgSIAEADIALAJIAMAKQgBABAAAAQAAABAAAAQgBABAAAAQgBABAAAAQgDACgDAAIhdAAIAABAIBdAAIAQgUIAFAEIALAJIANALQgBABAAAAQAAABgBAAQAAABgBAAQAAABAAAAQgDABgDAAgAiWghQALgNALgSQAKgRAJgVQAKgUAHgWIAeALQgBADgDACQgDABgFAAIgGANIgHAMIA7AAIANgQIAEADIAKAIIAJAKQAAAAAAABQAAAAAAABQgBAAAAABQgBAAAAABIgGABIhAAAQASAKAGALQAHALgCAIQAAAHgFADQgGADgHgGQgCgLgHgNQgGgNgIgKIgQAAQgMATgOAQQgNAQgOALgABJgsQgDgMgHgNQgIgNgJgKIgRAAQgKANgKAKQgJALgKAIIgFgDQANgRAMgYQAOgXAJgbIAdALQgBADgCACQgEABgEAAIgIANIgIAMIBKAAIAPgSIAEAEIALAJIAMAKQgBAAAAABQAAAAAAABQgBAAAAABQgBAAAAABIgGABIhRAAQARAKAIAKQAHALgBAIQAAAIgGADIgEABQgEAAgFgDg");
	this.shape_5.setTransform(434.4,29.725);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#E99019").ss(1,0,0,4).p("ACrAAIlWAA");
	this.shape_6.setTransform(348.0834,30.7884,2.3237,2.3237);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E99019").s().p("AjbCCQgjAAgZgZQgZgYAAgkIAAhZQAAgjAZgZQAZgZAjAAIG3AAQAjAAAZAZQAZAZAAAjIAABZQAAAjgZAZQgZAZgjAAg");
	this.shape_7.setTransform(450.847,30.2656,2.3237,2.3237);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AhQCRQASgMALgOQAKgPADgQQAEgQAAgSIAAgfIgNAKIgNAIIgEgDQAMgKALgPQALgNAJgOQAKgQAGgOIgUAGIgWAHIgCAFIgEACIgOgZIAJgBIALgBIAAhKIAcADQAAACgDACQgCADgFABIAAA7IATgDIAAhbIAeADQAAAEgEACQgCACgFABIAAAgIAJAAIALgPIADAEIAIAHIAIAIQAAABAAABQAAAAAAABQgBAAAAABQgBAAAAABIgFABIggAAIAAAiIAlgGIAAAFIgWAHIgaAJIAdAIQgBACgDACQgDABgGAAIgDAFIgEAGIA7AAIAMgNIAYAVQgBABAAAAQgBAAAAABQgBAAgBAAQAAAAgBAAIgIABIgPALIgSAKIAvAAIAJgLIAXASIgFADIgHADIAABjQAAAIgDAGQgCAFgHAEQgGADgNAAQgBgEgBgDIgFgFQgDgDgGgCQgHgCgKgBIAAgFIAIABIAOAAIAQABQABAAABAAQAAAAABAAQAAAAABgBQAAAAABAAQAAAAAAgBQAAAAABAAQAAgBAAAAQAAgBAAgBIAAgdIgxAAIAAAqQgBACgEACQgFACgHAAIgDAAIAAgwIg2AAQgFARgNAPQgNAPgaALgAA2BRIAxAAIAAgaIgxAAgAgPBEIgCANIAzAAIAAgaIgxAAIAAANgAA2AtIAxAAIAAgaIgxAAgAgPAtIAxAAIAAgaIgxAAgAgHgDIgKAKIAGADIA2AAIALgLIAJgMIg+AAIgIAKgAiOBSIAAjTIATAKIAfAAIAKgMIAZATQgCACgDACIgJADIAACrQgBABgFACQgEADgFABIgDAAIAAgbIgjAAIAAAcQAAACgFACQgEADgGABgAh8AlIAjAAIAAiSIgjAAgABMgnQgOAAgFgDQgEgFABgKIAAhcIAcAEQgBADgCACQgCACgEAAIAAAmIAXgOIAUgOIATASQAAABgBAAQAAABAAAAQgBAAAAAAQgBABgBAAQgCAAgFgCIgOAFIgTAHIgSAEIAAAhQAAAAAAABQAAAAAAABQAAAAAAABQABAAAAAAQABABAGAAIATAAIAMAAIAGAAIADgBIACgBIAEgKIADgRIAFAAIABAbQAFACABACQAAAAABABQAAAAAAABQAAAAAAABQABABAAAAQAAAEgEADQgEADgJAAQgKACgRgBg");
	this.shape_8.setTransform(596.8,632.35);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AiPCRIgCgJICJAAIAAhAIhWAAIgDgKIBZAAIAAg2IhJAAQgLAQgLAOQgMANgNAKIgFgDQAKgNAKgRQAJgRAJgSQAJgUAFgVIAiAMQgBADgEABQgDACgFAAIgHAPIgIAOIBDAAIAAguIAhAEQgCADgCACQgCADgGABIAAAhIBIAAIAPgTIAFAEIALAJIALAKQAAAAAAABQAAAAgBABQAAAAgBABQAAAAAAAAQgCACgEAAIhqAAIAAA2IA8AAIAPgSIAEADIALAJIAMAKQgBADgCABQgDACgDAAIhdAAIAABAIBeAAIAPgUIAFAEIALAJIANALQgBADgCABQgDABgDAAgAiWghQALgNALgSQAKgRAJgVQAKgUAHgWIAeALQgBADgDACQgDABgFAAIgGANIgHAMIA7AAIANgQIAEADIAKAIIAJAKQAAAAAAABQAAABAAAAQgBABAAAAQgBAAAAABIgGABIhAAAQASAKAGALQAHALgCAIQAAAHgFADQgGADgHgGQgCgLgHgNQgGgNgIgKIgQAAQgMATgNAQQgOAQgOALgABJgsQgDgMgHgNQgIgNgJgKIgRAAQgKANgKAKQgJALgKAIIgFgDQANgRAMgYQAOgXAJgbIAdALQgBADgCACQgEABgEAAIgIANIgIAMIBKAAIAPgSIAEAEIALAJIAMAKQgBAAAAABQAAABAAAAQgBABAAAAQgBAAAAABIgGABIhRAAQARAKAIAKQAHALgBAIQAAAIgGADIgEABQgEAAgFgDg");
	this.shape_9.setTransform(563.55,631.875);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#E99019").ss(1,0,0,4).p("ACsAAIlXAA");
	this.shape_10.setTransform(477.1624,632.8472,2.3237,2.3237);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E99019").s().p("AjbCCQgjAAgZgZQgZgYAAgkIAAhZQAAgjAZgZQAZgZAjAAIG3AAQAjAAAZAZQAZAZAAAjIAABZQAAAkgZAYQgZAZgjAAg");
	this.shape_11.setTransform(579.926,632.3244,2.3237,2.3237);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AAgCVIAAhoIivAcIgEgJICzgdIAAi3IAhADQAAAEgDADQgDACgFABIAACnIAugHIAPgZIAFAEIAOAHIAOAJQgBAEgCABQgBACgDAAIhXAPIAABiQgBADgFADQgGADgGAAgAgsAKQgHgKgKgJQgMgKgMgIQgNgJgLgGIACgEQAdAEARAHQARAJAJAIQAHAJACAIQAAAGgFAEQgDACgEAAIgGgBgAgShAQgGgJgKgKQgLgKgLgIQgMgKgMgFIADgEQAcAFAQAHQARAIAIAJQAHAJABAHQAAAIgFADQgCACgEAAIgHgCg");
	this.shape_12.setTransform(88.15,647.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AiPCRIgDgJICLAAIAAhAIhXAAIgDgKIBaAAIAAg2IhKAAQgKAQgMAOQgNANgNAKIgEgDQAKgNAKgRQAKgRAIgSQAJgUAFgVIAhAMQgBADgCABQgEACgFAAIgHAPIgIAOIBEAAIAAguIAfAEQAAADgDACQgCADgGABIAAAhIBIAAIAPgTIAEAEIAMAJIAMAKQgBAAAAABQAAAAgBABQAAAAgBABQAAAAgBAAQgCACgCAAIhrAAIAAA2IA8AAIAOgSIAGADIAKAJIALAKQAAABAAAAQAAABgBABQAAAAAAAAQgBABAAAAQgCACgEAAIhdAAIAABAIBdAAIAQgUIAFAEIALAJIAMALQgBADgBABQgDABgEAAgAiVghQAKgNAKgSQALgRAJgVQAKgUAHgWIAeALQgBADgDACQgDABgFAAIgGANIgHAMIA7AAIANgQIAEADIAKAIIAJAKQAAAAAAABQAAABAAAAQgBAAAAABQAAAAgBABIgGABIhAAAQASAKAGALQAHALgBAIQgBAHgFADQgGADgHgGQgCgLgGgNQgIgNgHgKIgRAAQgMATgNAQQgNAQgPALgABJgsQgCgMgIgNQgIgNgJgKIgRAAQgJANgLAKQgJALgLAIIgDgDQANgRAMgYQANgXAJgbIAdALQgBADgCACQgEABgFAAIgHANIgIAMIBKAAIAOgSIAGAEIAKAJIALAKQAAAAAAABQAAABAAAAQgBAAAAABQgBAAAAABIgGABIhSAAQATAKAHAKQAHALgBAIQgBAIgFADIgEABQgEAAgFgDg");
	this.shape_13.setTransform(55.35,647.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#E99019").ss(1,0,0,4).p("ADuAAInbAA");
	this.shape_14.setTransform(184.6849,648.3493,2.3237,2.3237);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#E99019").s().p("AjbCCQgiAAgZgZQgagYAAgkIAAhZQAAgjAagZQAZgZAiAAIG2AAQAkAAAZAZQAZAZAAAjIAABZQAAAkgZAYQgZAZgkAAg");
	this.shape_15.setTransform(71.7553,647.8265,2.3237,2.3237);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AheCLQgBgEgDgDQgEgCgGgCIgPgEIAAgFIAEAAIALABIAMABIAIAAQAEAAACgBIABgFIAAhkIgXAJIgaAJQgBAEgCACIgFADIgLgeIAcgGIAogIIAAhHIANABIARgXIARgYIhvAAIgDgKIB1AAIAOgOIAYAXQgCACgDABIgIAAIgQAPIgTAQIgUAPIANABQgBAEgDACQgCACgGABIAAA2IAfgIIAfgIIACAEIhAAaIAABuQAAAJgCAGQgCAGgHAFQgHAEgOABQAAgFgCgEgAA2CIQgTAAgIgFQgHgGAAgPIAAkBIAiAEQgBADgCADQgDACgGABIAADxQAAAGADADQADADAKAAIAeAAIASgBIALAAIAEgCIACgDIAEgLIAEgTIAEgXIAFAAIAAA3QAGACACACQACACAAADQAAAFgFADQgFACgOABIgnABg");
	this.shape_16.setTransform(103.2521,554.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AhZCVIAAiTIAXALICEAAIAMgNIAZAUIgFADIgIADIAAByIgDADIgHADIgIACIgDAAIAAgWIiJAAIAAAQQAAACgGADQgFACgHAAgAhEB1ICJAAIAAgsIiJAAgAhEBAICJAAIAAgqIiJAAgAiOgUIgDgJICnAAQAIgPAIgSIAMggIiwAAIgDgKIDYAAIAPgTIAFAEIAMAJIAMALQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAQgCACgEAAIhFAAIAeAKQgBADgDACQgDABgFAAIgSAYIgVAZIBDAAIARgVIAFAEIAMAKIANALQAAABgBAAQAAABAAAAQgBABAAAAQgBAAAAABQgDABgDAAgAgxgjQgBgJgDgKQgEgKgFgKIgKgRIAEgCQAWAMAJANQAJANgBAKQAAAJgGAEIgFABQgEAAgFgEgAAAhrQgBgKgIgLQgIgKgIgIIAEgCQAWAGAJAIQAKAJAAAIQAAAIgGAEIgFABQgEAAgFgDg");
	this.shape_17.setTransform(70.825,554.325);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#FFFFFF").s().p("Ag5CQQAjgJAYgNQAagNARgRIgggQQgQgIgSgHQAGgLAHgQIAPgiIgwAAIgCgKIA2AAIAMghIAJgZIAeAKQgBADgDABQgDACgGgBIgHAUIgKAXIBIAAIAPgTIAFADIAMAKIAMALQgBAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQgDACgDAAIgbAAQgGAagJAWQgIAWgOARQAbANAPALQAQALAFAIQAFAIgBAFQgCAEgFABQgGABgGgFQgLgKgQgLQgPgLgTgLQgTASgdALQgcAMgpAIgAAOAfIgOAdIAeAKIAaAKQAMgRAIgUQAIgUAEgXIg8AAIgOAfgAhwCLIgEgHQgDgCgGgCIgPgEIAAgFIAFABIAKAAIALABIAHAAQAEAAACgBQAAgBAAAAQABgBAAAAQAAgBAAAAQAAgBAAgBIAAhiIgQAKIgSAKQAAADgCACIgEADIgMgaIAVgHIAfgMIAAhCIguAAIgDgJIAxAAIAAhJIAgADQAAAEgDACQgDADgGABIAAA8IAFAAIANgSIAEADIAJAJIALAKQgBADgCABQgCABgEAAIghAAIAAA6IAUgIIAUgJIACAFIgTAMIgXANIAABwQABAJgDAGQgCAHgGAEQgHAEgNABIgCgJgABpguIAFgQIAGgTIiCAAQABALgDAJQgDAIgGAFQgIAFgGgCQgGgDgBgGQAAgHAIgHQAFgEAEgKQAFgKgBgOIAFAAIADAHIACAIICBAAIAOgOIAZAYIgEADIgIABIgKALIgLAMIgLALgAAwhjQgBgMgGgNQgGgNgJgKIAEgCQAWAJAIALQAJALAAAKQgBAJgGADIgFABQgEAAgFgEg");
	this.shape_18.setTransform(38.275,554.425);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#E99019").ss(1,0,0,4).p("ADuAAInbAA");
	this.shape_19.setTransform(183.7229,555.1376,2.185,2.3237);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E99019").s().p("AjbCCQgiAAgZgZQgagYAAgkIAAhZQAAgjAagZQAZgZAiAAIG2AAQAkAAAZAZQAZAZAAAjIAABZQAAAkgZAYQgZAZgkAAg");
	this.shape_20.setTransform(70.7553,554.6148,2.3237,2.3237);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.标注, new cjs.Rectangle(0,0,650.8,678.1), null);


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
	this.instance = new lib.musicplay();
	this.instance.setTransform(68.1,62.9,1,1,0,0,0,36.8,41.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,147.2,147.2);


// stage content:
(lib.笙 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:4};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,5,239];
	this.streamSoundSymbolsList[5] = [{id:"yx311601a笙演奏示范",startFrame:5,endFrame:239,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		
		
		var _this = this;
		
		_this.m1_btn.on('click', function(){
		
		_this.gotoAndPlay('m1');
		});
		
		
		_this.display.on('click', function(){
		/*
		使指定对象可见或不可见。
		*/
		_this.tap.visible = true;
		_this.display.visible = false;
		
		});
	}
	this.frame_4 = function() {
		var _this = this;
		
		
		
		_this.m1stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav1');
		});
	}
	this.frame_5 = function() {
		var soundInstance = playSound("yx311601a笙演奏示范",0);
		this.InsertIntoSoundStreamData(soundInstance,5,239,1);
	}
	this.frame_239 = function() {
		this.gotoAndStop('lnav1');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(234).call(this.frame_239).wait(11));

	// leftnav_on
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AjrEsIAAjAQgfAJgjAIIgEgHQBBgbAugiQAugiAdgkIi0AAIgFgSIDHAAQALgQAJgQQAJgQAIgQIgMABIgLABIgOAAIAAgZIg2AAIAAAcQgBAEgKAGQgKAGgQAEQgQAEgRABIgLAAIAAjhIBTAhIAtAAIAkgnIBMA4QgCADgGAEIgPAFIAABxQAAACgFADIgOAHIBVAcQgCAGgHADQgGADgMgBIgKARIgKAQIBqAAIgHgDIgJgEQgBgNgHgOQgFgOgJgLQgOAEgOAAIgMAAIAAjMIBWAhIAwAAIAmgqIBPA8QgDAEgGAEQgGADgKADIAAB6QgBADgMAEQgMAEgPADQgQAEgOABIgPAAIAAgiIg6AAIAAAHIgCADIgDAEQAZAEALALQAMAKAAAMQABANgHAKQgIAKgOADIA4AAIArg3IAPALIAfAYIAiAcQgBAFgFADQgEACgIAAIjXAAQApAYA7ANQA8AMBOADIAAAHQgPAKgJAXQgIAWgCAhIgQgFIgPgFIAACVQgBACgMAFIgbAIQgQADgOAAIgPAAIAAgpIg5AAIAAATQAAAEgLAGQgKAGgRAFQgQAEgRABIgMAAIAAjsIBWAhIAvAAIAGgGQgkgUgZgZQgagZgUgdIhEAAQgZAbgmAZQgkAZgyAVIATAHIArAAIAlgnIBKA4QgDADgEAEIgOAFIAACRQgCADgLAFQgLAGgQAEQgOAEgPAAIgPAAIAAgmIg0AAIAAAYQAAAEgLAGQgKAGgQAFQgPAFgSAAgABjDpIA5AAIAAh7Ig5AAgAiZDpIA0AAIAAh7Ig0AAgABriIIA6AAIAAhnIg6AAgAifiIIA2AAIAAhnIg2AAg");
	this.shape.setTransform(252.55,294.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AgyEQQgEgPgJgLQgJgIgPgIQgOgGgdgFIAAgIIANAAIAeACIAhACIAWABQAIAAAEgDQADgCgBgHIAAjWIh3AAIgdAjIhTgsIAJgHIAMgIIANg3IANg+IALg8QAEgbABgSIBiAVQAwgJAxgMQAxgMArgNQArgNAegMIBSBXQgGAFgNAAQgLgBgRgGQgpADgzADQgzACg4ABQg3AAg2gCIgLA5IgOBEIgMA9IB2AAIAAifIB0ALQgCAHgEADQgFAFgMACIAACDIBWAAIAyhAIAQANIAkAcIAoAfQgCAFgFADQgFACgHAAIjRAAIAADaQABAdgIAVQgJAUgaANQgaAMgzAEQgCgVgEgOgAkuEBQAcgaAcgkQAbgkAXgsQAXgrARgwIBvA1QgDAGgHACQgHADgLgBQgtBDg4AqQg6AqhAAagADYDuQgLgkgUglQgTgkgXgiQgXgigWgdIAFgDQBTAXAuAiQAtAiAQAjQAOAigHAbQgIAZgWAIQgHACgHAAQgSAAgWgNg");
	this.shape_1.setTransform(138.2,294.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(153,153,153,0.498)").s().p("AAgBoIAAgxQgJALgNALQgMAKgNAHIgFgFIgGgFQAOgGAMgJQAMgJAIgKIAMAEIAAgrIgWACIgWABIgBgFIgDgGIAjgDIAigDIAbgFIANAKIgWAEIgZADIAAAYIAEAFIADAEIAUgNIARgMIAKAIIgTANIgVAMQAKAKANAHQAMAHAOAFQgDABgCAEIgEAGQgQgGgNgKQgOgKgLgMIAAA0gAhCBoIgNgBIgBgHIgDgGIANABIAJAAIAEgBIADgCQADgCACgJIAEgYIADgpIg3AAIADgYIADgdIACgcIANABIgCAXIgCAXIgCAWIAYAAIAEgbIACgeIADgeIg0AAIAAgOIBCAAIgCAiIgEAkIgDAfIAGAAIALAAIAAACIAAAEQgCAegCATQgCATgDAKQgCAKgEADIgGAFIgIACIgKAAgAhsAxIAagGIAegIIABANIgcAIIgaAHgAgSA0IgFgFIAVgMQAKgHAHgHIANAEQgJAJgLAIQgKAJgLAFIgFgEgAAZgFIAAgOIgaAEIgYADIgDgMIAOgCIAAhBIgLAAIAAgMIBGAAIAAAMIgIAAIAAA7IAIgBIAAALIgIABIAAAQgAgCgbIAbgEIAAgNIgbAAgAgCg2IAbAAIAAgOIgbAAgAgChOIAbAAIAAgNIgbAAgAAxgPIgFgFQAHgFAHgGQAHgHAGgJIgLgNIgLgMIAJgHIAKALIAKALIAHgPQADgHACgIIgmAAIAAgNIApAAIADAAIACAAIAIACQgDAPgFAMQgFANgGALIAMAOIAJAMIgKAJIgIgLIgKgNIgNAPQgHAGgIAFIgDgFg");
	this.shape_2.setTransform(189.925,374.775);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(153,153,153,0.498)").s().p("AhjBlIgFgIQBDgIArgYQAsgZAVgqIAPAHQgXAtguAbQgsAZhFALIgDgIgAgFA5IAAhLIhhAAIAAgQIAlAAIAAg2IAQAAIAAA2IAuAAIAAhJIAPAAIAAAaIBHAAIAAAPIhHAAIAAAgIBdAAIAAAQIheAAIAABLgAhYAyIgGgFQAOgLAMgOQANgOAJgNIAPAEQgKAQgOAQQgNAQgOALIgGgGg");
	this.shape_3.setTransform(166.075,374.25);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(153,153,153,0.498)").s().p("AgBBlIgHgFQAPgPAKgWQAJgVAEgZQAGgZAAgbIgiAAIAAgQIAjAAIABgZIAAgaIAQAAIgBAaIAAAZIA1AAIAAAJIgDA9IgDAqIgDAaQgDAJgDADQgEAFgEACIgJACIgOAAIgTgBIgCgHIgDgIIATABIANAAIAFAAIAEgDQADgEADgNIAEgoIADhEIgmAAQgCAdgEAbQgFAbgKAXQgKAXgSARIgEgGgAhjBGIgDgIQACgBADgEIAGgLIAFgPIAHgXIAIgaIgiAAIAAgPIBpAAIAAAPIg3AAQgFASgGAUIgOAkIA8gMIgHgUIgIgTIAOgDIAJAXIAJAYIAFAUIgNAFIgCgIIgDgJIgoAJIgYAFIgLAEIgGACIgCgHgAhghMIAAgOIBbAAIAAAOg");
	this.shape_4.setTransform(142.25,374.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(153,153,153,0.498)").s().p("AhqBiIAAgQICJAAIAEgTIACgVIhsAAIAHgbIAGgfIAGgiIAGgfIg0AAIAAgPIDGAAIAAAPIiBAAIgEATIgDAVIBVAAIADgBIAMABIgDAbIgEAgIgEAgIgFAgIA7AAIAAAQgAgsABIgGAaIBZAAIAEgcIADgZIhWAAIgEAbg");
	this.shape_5.setTransform(118.3,374.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#CCCCCC").ss(1,1,1).p("AzdAAMAm7AAA");
	this.shape_6.setTransform(230.875,350.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(250));

	// leftnav
	this.lnav1_btn = new lib.lnav1();
	this.lnav1_btn.name = "lnav1_btn";
	this.lnav1_btn.setTransform(220.2,438.45,1,1,0,0,0,118.4,27.6);
	new cjs.ButtonHelper(this.lnav1_btn, 0, 1, 2, false, new lib.lnav1(), 3);

	this.timeline.addTween(cjs.Tween.get(this.lnav1_btn).wait(250));

	// btn
	this.m1_btn = new lib.m1_btn();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(1216.75,898.75,1,1,0,0,0,36.9,41.6);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.m1_btn(), 3);

	this.m1stop_btn = new lib.元件1();
	this.m1stop_btn.name = "m1stop_btn";
	this.m1stop_btn.setTransform(1222.4,909.55,1,1,0,0,0,73.6,73.6);
	new cjs.ButtonHelper(this.m1stop_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m1_btn}]}).to({state:[{t:this.m1stop_btn}]},4).wait(246));

	// 未选择答案
	this.display = new lib.未选择答案();
	this.display.name = "display";
	this.display.setTransform(114.55,800.05);
	new cjs.ButtonHelper(this.display, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.display).wait(250));

	// 标注
	this.tap = new lib.标注();
	this.tap.name = "tap";
	this.tap.setTransform(1124.45,466.5,1,1,0,0,0,325.4,339.1);
	this.tap.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.tap).wait(250));

	// image
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("Ak8FCIgGgTIEVAAIAAiOIitAAIgFgTICyAAIAAh5IhpAAQgeAlgkAcQgkAbgoAUIgHgFQATgdATgnQARgmAOgrQAOgsAKguICHAvQgEAHgGAEQgIAEgMgBQgQAdgRAXIBZAAIAAhsIB8AKQgCAHgEAEQgFAFgNACIAABQIBlAAIAtg+IAPAMIAgAcIAjAeQgCAGgFACQgFADgIAAIjQAAIAAB5IBVAAIAtg/IAOAMIAhAcIAiAfQgBAGgFACQgFADgIAAIjAAAIAACOICQAAIAuhAIAPAMIAgAcIAjAgQgBAGgFACQgFADgIAAgAlPhEQAUgfAUgoQASgoAQguQAPguALgvIB5AqQgCAHgIAEQgHADgLAAIgKATIgMASIBCAAIAog4IAOALIAdAZIAdAcQgBAGgFADQgFACgHAAIh0AAQAjAPAPAUQANATgCASQgCASgNAMQgOALgSAAQgUAAgTgRQAAgZgGgZQgHgZgKgVIgIAAQggAvgmAkQgmAjgrAZgACKhpQgCgbgJgaQgJgagPgWIgFAAQgbAegeAWQgdAXgfAQIgIgFQAPgZANggQAPggAMglQAMglAHgmIB7AsQgCAGgIAEQgHAEgNgBIgNAUIgMATIBdAAIAug6IAOALIAhAaIAjAdQgBAGgGADQgFACgIAAIiWAAQAiAOAOAUQANATgBASQgCATgOANQgNAMgSABIgDAAQgSAAgUgPg");
	this.shape_7.setTransform(1084.8,894.675);

	this.instance = new lib.笙_1();
	this.instance.setTransform(906,97,0.1666,0.1667);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_7}]}).wait(250));

	// bg
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("EiLsBMwQhvAAhQhPQhPhPAAhwMAAAiRDQAAhwBPhPQBQhPBvAAMEXZAAAQBvAABPBPQBQBPAABwMAAACRDQAABwhQBPQhPBPhvAAg");
	this.shape_8.setTransform(959.9897,540.0003,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(250));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(999,588.8,882,442.5);
// library properties:
lib.properties = {
	id: '14CB93263BA1D74EA5B3F38304C0AC64',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#FF9999",
	opacity: 1.00,
	manifest: [
		{src:"images/笙_atlas_P_1.png?1690278430736", id:"笙_atlas_P_1"},
		{src:"sounds/yx311601a笙演奏示范.mp3?1690278430765", id:"yx311601a笙演奏示范"}
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
an.compositions['14CB93263BA1D74EA5B3F38304C0AC64'] = {
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