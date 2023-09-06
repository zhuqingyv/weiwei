(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"竖琴_atlas_P_1", frames: [[0,0,1512,2730]]}
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



(lib.笙111 = function() {
	this.initialize(ss["竖琴_atlas_P_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



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
	this.shape.setTransform(10.5416,41.5178,3.0726,3.0726);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_1.setTransform(28.1874,41.4959,3.0726,3.0726);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_2.setTransform(45.0137,41.5434,3.0726,3.0726);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgkCDQgCgEABgEQAAgEAEgCQAYgRANggQAOgfAAglQAAgkgOgfQgNgfgXgSQgEgCAAgEQgBgEACgEQADgDAEgBQAEAAADACQAbAUAQAkQAQAjAAApQAAAqgQAkQgRAjgbAUQgDACgCAAQgGAAgDgEg");
	this.shape_3.setTransform(61.7341,41.505,3.0726,3.0726);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape},{t:this.shape_1}]},8).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_2}]},9).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_2},{t:this.shape_3}]},9).wait(8));

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ArfLgIAA2/IW/AAIAAW/g");
	this.shape_4.setTransform(53.7,43.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(34));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.9,-30,147.2,147.2);


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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("AAECCIAdgfIAcgfIijAAIAAgTIBzAAQgFgIgKgKQgJgLgLgIIAPgJQAKAIAKAJQALAKAFAIIgQALIBDAAIAEgBIAOAIIgWAbIgbAdIgbAbgAiKAqIgIgIQAegJAbgMQAbgLAXgNQAWgOAOgPIAOAGIAAgQIA1AAIAAgdIgwAAIAAgQIAwAAIAAgaIg6AAIAAgRICCAAIAAARIg0AAIAAAaIAvAAIAAAQIgvAAIAAAdIA4AAIAAARIh/AAIACABIgEAFQAPALAVALQAWAKAaAJQAZAKAbAGIgIAJIgHAJQgZgGgagLQgZgLgWgMQgWgLgOgMQgaAUggARQgiAQgmANIgGgJgAiKghIAAgRIA3AAIAAgcIguAAIAAgQIAuAAIAAgbIg2AAIAAgRIB7AAIAAARIgxAAIAAAbIArAAIAAAQIgrAAIAAAcIAzAAIAAARg");
	this.shape.setTransform(64.35,32.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AiOCLIAAgTICzAAIAJgUIAHgUIAHgTIAVAFIgLAbIgMAbIBSAAIAAATgAhBBlIgHgSIgIgQIATgGQAHAMAGANQAGAOADAKIgVAGIgFgPgAh+A7IAAgTIB4AAIgFgNIgGgNIgCABIgFgJQgEgGgDgCQASgFAQgJQARgIAPgLQgPgQgLgTQgKgSgIgXIABAAIgBAAIgLAAIAAgTIB9AAIADgBIAOAFQgJAcgOAXQgOAXgTASQAQAMATAJQAUAIAWAFIgIAIIgGAKQgXgGgUgKQgTgJgRgOQgLAJgNAHIgaAMIAIAQIAGARIBxAAIAAATgAAbhNQAKAQANANQAPgNALgQQALgPAIgTIhVAAQAHASAKAQgAg/AQIAAiaIAUAAIAACagAh7AEIAAiAIAUAAIAACAg");
	this.shape_1.setTransform(18.175,31.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(4));

	// 图层_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_2.setTransform(118.425,27.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,236.9,55.3);


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
p.nominalBounds = new cjs.Rectangle(11.4,-8.7,147.2,147.2);


// stage content:
(lib.竖琴 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:4};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,5,1004];
	this.streamSoundSymbolsList[5] = [{id:"yx511701a竖琴演奏示范mp3复制",startFrame:5,endFrame:1004,loop:1,offset:0}];
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
		var soundInstance = playSound("yx511701a竖琴演奏示范mp3复制",0);
		this.InsertIntoSoundStreamData(soundInstance,5,1004,1);
	}
	this.frame_1004 = function() {
		this.gotoAndStop('lnav1');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(999).call(this.frame_1004).wait(1));

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

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1005));

	// leftnav
	this.lnav1_btn = new lib.lnav1();
	this.lnav1_btn.name = "lnav1_btn";
	this.lnav1_btn.setTransform(220.2,438.45,1,1,0,0,0,118.4,27.6);
	new cjs.ButtonHelper(this.lnav1_btn, 0, 1, 2, false, new lib.lnav1(), 3);

	this.timeline.addTween(cjs.Tween.get(this.lnav1_btn).wait(1005));

	// btn
	this.m1_btn = new lib.m1_btn();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(653.9,295.45,1,1,0,0,0,36.9,41.6);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.m1_btn(), 3);

	this.m1stop_btn = new lib.元件1();
	this.m1stop_btn.name = "m1stop_btn";
	this.m1stop_btn.setTransform(659.4,306.35,1,1,0,0,0,73.6,73.6);
	new cjs.ButtonHelper(this.m1stop_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m1_btn}]}).to({state:[{t:this.m1stop_btn}]},4).wait(1001));

	// image
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#333333").s().p("AgaAuQgMgHgHgMQgIgMABgPQgBgOAIgMQAHgMAMgHQAMgHAOAAQAPAAAMAHQAMAHAHAMQAHAMABAOQgBAPgHAMQgHAMgMAHQgMAHgPAAQgOAAgMgHgAgcgcQgLAMgBAQQAAALAGAJQAGAJAIAGQAKAFAKAAQALAAAKgFQAJgGAFgJQAFgJAAgLQAAgQgLgMQgMgLgRAAQgQAAgMALg");
	this.shape_7.setTransform(1104.95,676.925);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("AiECsIAAhyIgVAIIgXAIIgDgFQAmgPAdgVQAdgUATgVIhrAAIgEgMIB5AAQAIgKAHgLIAMgUIgJACIgIABIgEAAIAAgMIg8AAIAAATQgBACgHADQgHADgJABIgEAAIAAh9IAdAMIA3AAIAPgPIAhAYIgGAFIgKACIAABIIAAABIgBABIAjAOQgBADgEABQgDACgGgBQgHANgLANICJAAIAUgXIAGAEIAOALIAQAOQgBADgDABQgDACgEAAIh6AAQAWAQAiAMQAiAMAwAEIgBAEQgFADgEAHQgEAJgBAKIgLgCIgKgDIgFACIgHACIAABYIgEADIgJAEIgLABIgFAAIAAgUIg8AAIAAARQAAACgHADQgIADgJABIgEAAIAAiDIAeAMIA3AAIADgDQgYgLgRgPQgRgPgOgPIg6AAQgQAPgUAOQgUAPgbANIAIACIAzAAIAPgPIAhAYIgGAFIgKACIAABWQAAACgEACIgJADQgGADgFAAIgEAAIAAgTIg5AAIAAATQAAADgIACQgHAEgJAAgAArCFIA8AAIAAhGIg8AAgAhoCFIA5AAIAAhGIg5AAgAhshSIA8AAIAAg9Ig8AAgABCgXQgDgJgIgJQgHgKgIgIIgIADIgJABIgEAAIAAhwIAeAMIA6AAIAQgQIAhAZIgGAFIgKADIAABOQAAABgFACIgJADIgKACIgFAAIAAgSIhAAAIAAAFQAXAGAKAIQAJAIAAAJQAAAIgHAEQgCABgEAAQgEAAgGgCgAAvhSIBAAAIAAg9IhAAAg");
	this.shape_8.setTransform(1079.075,665.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333333").s().p("AgUCiQgCgGgEgDQgFgEgIgDQgJgCgOgCIAAgGIAHAAIAQABIARACIAMABQAGAAACgDQACgCAAgDIAAiKIhfAAIgNANIgfgTIAGgFIAGgDIAHggIAGgkIAGgjIADgdIApALIBAgJIA9gMQAdgFAVgGIAeAgQgDACgFAAQgFgBgIgDIg7AGQghADgiABQgkACgjgBIgFAkIgHApIgHAmIBgAAIAAhcIArAFQgBAEgDACQgDADgGABIAABNIBUAAIAUgZIAGAFIAPAMIAPAOQAAADgDABQgDABgDAAIiDAAIAACLQAAAMgDAIQgDAJgLAFQgKAFgUACIgDgMgAitCWQARgPARgUQASgUAPgZQAQgYAMgbIApAVQgCADgEACQgEABgGgBQgYAlgeAbQgeAcggARgACTCPQgIgTgOgVQgOgWgRgTQgRgVgQgQIAFgCQApATAXAUQAYAUAKASQAKASAAAMQAAAMgIAEQgDABgDAAQgGAAgHgEg");
	this.shape_9.setTransform(1040.7512,664.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#333333").s().p("Ah7CwIAAleIAsAEQgBAEgDAEQgDACgHABIAAFEQAAADgHADQgIAEgIABgAhACiIgDgLIBpAAIAAhxIhJAAIgDgLIBMAAIAAhbIg1AAQgJAVgLASQgLAUgNANIgFgDQAJgUAJgYQAIgZAGgcQAGgcADgdIAqALQgBAEgDABQgEADgGAAIgGAcIgJAbIAwAAIAAhgIAqAEQAAAEgDACQgDADgGABIAABSIAvAAIATgZIAGAEIAOAMIAPANQgBADgDACQgCABgEABIhbAAIAABbIAmAAIATgZIAGAFIAOALIAOAOQgBADgCABQgDACgEAAIhRAAIAABxIA4AAIAUgaIAGAFIAOANIAPANQAAADgDACQgCABgFAAgAioAAQgFgBgDgEQgEgGACgGQACgGAFgFQAGgGAFgLQAEgMADgOQADgNAAgOIAHAAQAIAfgDAXQgCAWgJAMQgDAEgFADQgEADgFAAIgCAAgAhGgzQAAgJgDgLQgCgKgFgJQgEgKgEgHIAFgCQAWANAJANQAIAOgCAJQgBALgIADIgEABQgFAAgGgGg");
	this.shape_10.setTransform(1003.2667,664.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("AgJCoQAugXAkghQAlgiAbgxIArAVQgCADgEABQgDABgHgBQggAtgrAdQgrAdg0ARgAhWCuIAAhyQgQAagWAWQgXAWgbASIgEgGQAbgZAUghQAVghAMgkIhHAAIgCgLIBVAAIAAguIAsAEQgBAEgCACQgEADgHABIAAAgIAlAAIASgWIAEAFIAOALIANALQAAADgDACQgDABgEAAIhMAAIAAAZQAeAGASAKQAPAKAHAKQAHALgCAJQgBAIgIADQgGADgJgFQgEgLgIgKQgIgLgKgKQgKgKgLgHIAAB2QAAACgEACIgJAEQgFACgFAAgAASAhQAhgTAdgbQAdgdAWgjIApAYQgCADgEABIgJgBQgbAegkAVQgiAXgoAQgAgqgoQAKgPAJgWQAJgWAHgXIAoASQgCADgDACQgEABgGAAQgMASgNAQQgPAQgOAMgAiOguQgBgPgGgQQgHgQgJgMIAFgDQAZANALANQAJAOgBALQgBAMgIADIgFACQgGAAgGgGgAhUg4QAAgPgGgRQgGgQgIgMIAFgCQAZAMAJAPQAKAOgCALQgCALgIAEIgFABQgGAAgGgGgAAThEQAfgUAbgaQAdgaAWgfIAnAZQgCACgDABQgEABgFgBQgcAZghAUQgiAVgkAPgAiph9QAdgFAegIQAegIAcgJQAbgJASgJIAgAfQgCACgGAAQgFAAgIgDQgUAGgdAFQgdAFggAEQggADgfABg");
	this.shape_11.setTransform(965.1,664.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333333").s().p("Ag0CsQgYAAgQgEQgPgFgIgKQgIgKAAgTIAAinIgYAUQgMAJgMAIIgFgFQAXgTAVgaQAUgbARgeQARgdAKgdIAvAMQgBADgEACQgDABgHgBQgIAPgJAOIBPAAIASgSIAhAdQgCACgEABIgJABIgRARIgUATIgVARIBcAAIAPgSIAjAaIgGAFIgKADIAABmQAAACgFACIgKAEIgLABIgFAAIAAgZIjAAAIAABQQAAALAKAEQAJADATAAICSAAQASAAAKgCQAKgCAEgHIAGgNIAHgVIAGgUIAFAAIAAA5IAQAFQAEADAAAFQAAAHgHAFQgHAGgSADQgSADgiAAgAAQAiIBTAAIAAhRIhTAAgAhdAiIBQAAIAAhRIhQAAgAhQhYIgWAZIAOAGIBUAAIAKgSIALgUIAJgTIhWAAIgUAag");
	this.shape_12.setTransform(926.7017,664.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#333333").s().p("ABJChQgBgGgFgDQgEgEgLgEQgKgDgNgDIAAgFIAUABIAUACIAOAAIAJgBQADgBACgDQAHgGAFgdQAEgeADgwQACgvABhBIhWAAQgMAYgPATQgNAVgRAPIgFgDQAMgTALgZQAKgZAJgdQAJgcAGgdIAtAMQgBAEgEACQgDACgGAAIgKAZIgKAXIBNAAIARgUIAhAdIgGAEIgKACQgCBrgGA9QgGA9gOAQQgIALgMAEQgMAFgPgBQAAgHgCgGgAilCjIAAkaIAeAOIAKAAIAEgVIAFgZIADgWIAuALQgBADgDADQgEACgGAAIgPAYIgPAZIAsAAIAQgSIAhAbIgGAFIgKADIAADmQgBABgEACQgDACgGADIgLACIgEAAIAAgeIhKAAIAAAfQAAACgHAEQgHADgJABgAiJBvIBKAAIAAhlIhKAAgAiJAAIBKAAIAAheIhKAAgAAtA1QgCgNgGgOQgHgPgJgMQgJgOgJgKIAEgCQAdAMAPAOQAPANAFANQAFANgDAIQgDAKgHACIgEABQgHAAgHgGg");
	this.shape_13.setTransform(889.875,664.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#333333").s().p("AAvCtIAAiKQgUAjgeAbQgeAcgoAVIgEgFQAmgbAbglQAagkAQgpIhDAAIgDgKIBXAAIAAhHIgpAAQgHAQgJAPQgKANgMALIgFgCQANgZAJghQAJghAEgjIAqALQgBAEgEACQgDACgGAAIgHAWIgIAVIAkAAIAAhQIAsAFQgBADgDADQgDAEgHABIAABAIAiAAIATgYIAGAFIANALIAPAMQgBAEgDABQgCACgEAAIhNAAIAABHIAsAAIATgZIAGAGIAOAKIAPAOQgBADgDABQgCABgEAAIhSAAQALAYAQAUQAPAUATAQQASARATAKIgBAFQgJABgHAHQgGAGgEAKQgZgVgTghQgUghgNgqIAACaQgBAEgHAEQgHAEgJAAgAiwCoQAhgcAVgkQAVgkALgqQgDAHgGABQgHADgJgGQgCgKgHgLQgGgKgJgIIgQAYIgTAZIgGgGQAPgYAKgbQAKgcAIgeQAHgfAEgfIguAAIgDgKIBoAAIATgZIAGAGIAPAKIAPANQgBAEgDABQgCACgEgBIhEAAIgHAeIgIAeIAhAAIAQgRIAfAbIgFADIgJACQgEAigIAgQgJAhgOAfQgOAegXAaQgXAbgiAUgAh6gpIgLAWQAaAIAKALQAKALgBALQAFgWAEgVQAEgWACgWIgoAAIgJAYg");
	this.shape_14.setTransform(851.225,664.9);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#333333").s().p("ABECjQgCgFgFgEQgEgEgJgCQgJgDgOgCIAAgGIAHAAIARACIASABIAMAAQAFAAACgCQACgBAAgEIAAhsIiLAAIgDgLICOAAIAAgvIArAEQAAAEgEACQgDADgGABIAAAhIAKAAIASgYIAGAFIAMALIAOANQgBADgCACQgDABgEAAIgyAAIAABuQAAALgDAJQgDAIgKAFQgLAFgUACQgBgHgCgFgAhxCvIAAiMIgTAJIgVAKQgBAEgCADQgCACgDABIgRglIAbgHIAmgLIAAhRIgdAAQgFARgHAOQgHAPgJAMIgGgDQAGgSAFgVQAEgVADgXQADgXABgXIApAIQgBADgEADQgDACgGABIgFAXIgGAXIAZAAIAAhbIArAEQgBAEgDADQgDADgHABIAABMIAIAAIATgZIAGAFIANAMIAOANQgBADgCACQgDABgEAAIgyAAIAABJIAbgIIAdgJIACAFIgaAOIggARIAACQQgBADgHAEQgGAEgJAAgAANBpQgDgLgHgLQgFgMgJgLQgIgLgIgIIAEgDQAbAIAOALQAPALAFALQAEALgCAIQgDAJgHACIgFABQgFAAgHgFgAg1glIgDgLIBeAAIAAg7IhGAAIgDgLIBJAAIAAg3IAsAEQAAAEgDADQgDADgIABIAAAoIAoAAIATgZIAGAFIAOAMIAOANQgBADgCACQgDABgEAAIhTAAIAAA7IA5AAIATgbIAGAGIAOAMIAPANQgBAEgDABQgCACgEAAg");
	this.shape_15.setTransform(813.075,664.675);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#333333").s().p("AgXCwIAAiUIhnAAIAAAaQgBADgIAEQgHAEgKAAIgGAAIAAitIAiAPIBlAAIAAhRIAsAEQgBAEgCAEQgEACgGABIAABCIBjAAIARgSIAjAbQgDACgDACQgEACgGABIAACAQgBABgEACIgLAEQgFACgGAAIgGAAIAAggIhmAAIAACHQgBADgEACQgDADgFACIgMADgAAIASIBmAAIAAhkIhmAAgAh+ASIBnAAIAAhkIhnAAg");
	this.shape_16.setTransform(775.75,664.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#333333").s().p("ABzCiQgCgFgDgEQgEgEgHgCQgHgDgNgBIAAgGIAGAAIANABIAPABIAKABQAFAAACgCQACgCAAgEIAAkxIAqAEQAAAEgEADQgDADgHAAIAAElQABAMgDAIQgDAIgJAFQgKAFgSACIgDgMgAhtCtIAAiJIAfANIAZAAIAAg1IhBAAQAAAdgEAgQgEAfgLAeQgKAegUAZIgGgDQANgfAGgjQAGgjACglQABgkAAgkIAAh/IAhAOIBzAAIAPgPIAfAXQgBACgEACIgJADIAABKQAAAAgBAAQAAABAAAAQgBAAgBABQAAAAgBAAIgKAEIgKACIgEAAIAAgVIh8AAIAAAlIAAAMIAAANIBAAAIAAg1IAnAEQAAADgDADQgDACgGABIAAAoIAdAAIASgXIAFAEIAOALIAOANQgBADgCACIgHABIhGAAIAAA1IAbAAIAOgQIAeAWIgFAEQgEACgGABIAABjQAAACgGADQgHADgKAAIgEAAIAAgYIhVAAIAAAUQAAACgGADQgGADgLAAgAhSCHIBVAAIAAhLIhVAAgAh1hXIB8AAIAAg3Ih8AAgABCBbIAAjaIApAEQgBAEgDADQgDADgHABIAADCQAAADgHADQgHADgIAAg");
	this.shape_17.setTransform(736.625,664.825);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#333333").s().p("ABKCxIAAg/IgsAAIgMAMIgZgUIAGgDIAGgDIAEgQIADgQIACgNIAlAJQgBAEgDACQgEACgHAAIgDAPIgDAQIAsAAIAAg1IhEAAIgDgLIBHAAIAAglIAqAEQgBAEgDACQgDACgGACIAAAXIAUAAIAOgTIAGAEIAKAJIAMALQgCADgCACQgCABgEAAIg0AAIAAA1IAdAAIAQgUIAFAEIALAKIALALQAAADgDACQgDABgEAAIg+AAIAAA1IgEAEIgJAEQgGACgFAAgAivCrQA2gSAhggQAfgfAOgtIgxAAIgKALIgJAJQAUAIAIAKQAIAKgBAIQAAAIgHADQgFACgIgFQgCgKgFgKQgGgKgIgIQgMAJgMAIQgNAHgNAFIgEgFQAWgPATgZQATgZAMggIhGAAIgEgLIBIAAIAAgwIgzAAIgEgLIA3AAIAAgsQgMANgOALQgOALgOAIIgEgDQANgNANgQQAMgRAKgSQALgTAHgRIApANQgBADgEABQgCABgIAAIgJANIgLAOIDFAAIAQgWIAFAFIANAKIANAMQgBADgCACQgDABgEAAIgsAAIAAAwIAUAAIAQgVIAGAEIALAKIANAMQAAADgDABQgDACgEAAIg4AAIAAAwIAVAAIASgXIAFAEIAOALIANANQAAADgCABQgDACgEAAIkIAAIAnAPQgCAEgEABQgEACgGgBIgEAIIgFAHIAoAAIARgQIAdAaQgBADgEABIgKABQgLAggUAZQgUAZgfASQggASgtAKgAArgNIAjAAIAAgwIgjAAgAgPgNIAhAAIAAgwIghAAgAhLgNIAiAAIAAgwIgiAAgAArhIIAjAAIAAgwIgjAAgAgPhIIAhAAIAAgwIghAAgAhLhIIAiAAIAAgwIgiAAg");
	this.shape_18.setTransform(699.05,664.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#333333").s().p("AgNCqQAZgUAQgaQAPgaAIggQAHgfADgiQACghABgjIAqAKQgBADgDADQgDACgHAAIAAADQACAuAJAjQAIAkASAbQASAbAfASIgBAEQgKACgHAHQgGAGgDANQgUgRgNgaQgNgZgHggQgIgggDgmQgDAigKAgQgJAggUAaQgUAbghAUgAgxCiQgCgFgDgDQgEgDgGgCIgTgEIAAgFIAGAAIALABIANABIAKAAQAEAAACgCQACgBgBgEIAAiGIiKAAIgDgKICjAAIARgYIAGAFIANALIAPAMQgBAEgDABQgDABgEAAIghAAIAACHQAAAKgDAIQgDAHgIAFQgJAEgRACIgCgKgAicB+IAAhsIAbALIAkAAIAOgOIAeAXIgFAEIgKADIAAA9QAAABgEACIgIAEIgJACIgFAAIAAgMIgpAAIAAAPQAAABgHADQgGADgIABgAiDBdIApAAIAAg0IgpAAgAB2gRIAFgVIAFgZIAFgXIhUAAQgHAQgIAOQgIAOgJAMIgGgEQAHgSAGgYQAHgXAGgaQAFgZAEgZIAsAMQgBADgDACQgEADgGAAIgKAdQgFAPgHAOIBMAAIARgRIAeAdQgCACgEABIgJABIgLAWIgOAYIgOAVgAglgVIAAh1IiGAAIgDgLICUAAIASgWIAGAEIANALIAOAMQAAADgDACQgDABgEAAIgYAAIAABuQAAABgGADQgGADgLAAgAiXgXIAAhiIAbAMIAhAAIAOgPIAfAXIgGAEIgJADIAAA3QAAACgEACIgIADIgKACIgEAAIAAgMIgnAAIAAALQAAACgHADQgHADgIAAgAh+g2IAnAAIAAgsIgnAAg");
	this.shape_19.setTransform(661.275,664.775);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#333333").s().p("ABTCQQgcgQgXgVQgdAVglARQgmAQgwAKIgDgGQArgNAjgTQAjgSAagZQgagegSgoQgSgngKgzQgEAxgMArQgMArgZAlQgYAmgqAeIgEgEQAngpAVgxQAUgxAIg2QAHg3AAg+IhMAAIgDgKIDeAAIAPgQIAfAcIgGADIgKACIgKAaIgNAdIgNAcIAuAAIATgTIAgAeQgCADgEABIgKACQgNAkgTAeQgTAggbAaQAZATAgANQAfAOAkAKIgBAEQgMABgIAGQgJAGgFALQgigLgcgQgAg1h7IAAATQAKA6AXAsQAWAqAiAfQAXgZAPgdQAQgbAKghIgxAAIgLALIgdgVIAGgDIAHgDIAMgbIANgeIALgcIhwAAIgBAVg");
	this.shape_20.setTransform(623.175,665.175);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#333333").s().p("AhjCnQAjgbAWgeQAXgfAMghQAKgiAFgjQAFgjAAgmQABglAAgnIAsAEQAAAEgDADQgDADgHABIgBAyQAEA0ANAuQAMAtAaAmQAaAmArAcIgBAEQgLACgHAHQgIAGgDAMQgfgZgTgjQgVgkgLgpQgKgpgGgtQgDAhgHAeQgIAegOAdQgOAdgaAaQgYAagmAWgAinCtIAAlTIAiAOIAuAAIATgSIAiAgQgDADgEABIgKABIgQAdIgUAgQgKARgJAMQAgAVAOAXQAOAYAAAXQAAAbgNAOQgNAOgdACQAAgIgCgHQAAgGgDgDQgCgDgGgCIgMgDIAAgFIAeAAIAFgBIAEgCQAFgCADgGQACgGAAgKQAAgVgJgUQgIgVgVgVIAKgeIAKgjIAKgiIg2AAIAAEwQAAACgFAEQgHADgLABg");
	this.shape_21.setTransform(586.2,664.925);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#333333").s().p("AgUCiQgCgGgEgDQgFgEgIgDQgJgCgOgCIAAgGIAHAAIAQABIARACIAMABQAGAAACgDQACgCAAgDIAAiKIhfAAIgNANIgfgTIAGgFIAGgDIAHggIAGgkIAGgjIADgdIApALIBAgJIA9gMQAdgFAVgGIAeAgQgDACgFAAQgFgBgIgDIg7AGQghADgiABQgkACgjgBIgFAkIgHApIgHAmIBgAAIAAhcIArAFQgBAEgDACQgDADgGABIAABNIBUAAIAUgZIAGAFIAPAMIAPAOQAAADgDABQgDABgDAAIiDAAIAACLQAAAMgDAIQgDAJgLAFQgKAFgUACIgDgMgAitCWQARgPARgUQASgUAPgZQAQgYAMgbIApAVQgCADgEACQgEABgGgBQgYAlgeAbQgeAcggARgACTCPQgIgTgOgVQgOgWgRgTQgRgVgQgQIAFgCQApATAXAUQAYAUAKASQAKASAAAMQAAAMgIAEQgDABgDAAQgGAAgHgEg");
	this.shape_22.setTransform(546.7512,664.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#333333").s().p("ABsCjQgBgGgEgDQgEgEgHgDIgTgEIAAgGIAGAAIANABIAOABIAKABQAFAAACgCQACgCgBgEIAAjhIiQAAIAAEBQAAADgHADQgHAEgKABIgFAAIAAkmIAfAPIAlAAIAFgWIAFgZIAEgXIAyAJQgCAEgDACQgEADgGAAIgSAaIgSAaIBZAAIAOgSIAiAaIgGAEQgDACgGABIAADgQABALgDAJQgDAIgJAFQgKAGgTABIgDgMgAioBqIAAj4IAcAMIAjAAIANgOIAeAWIgFAEQgEACgFABIAADCQAAACgEACIgJADQgFACgFAAIgDAAIAAggIgoAAIAAApQAAACgGAEQgHADgIAAgAiOAtIAoAAIAAikIgoAAgAAJBcIAAiVIAYALIAiAAIANgNIAaAUQgCACgDACIgHACIAABtQAAAAgBAAQAAABAAAAQgBABAAAAQgBAAgBABIgIADIgIABIgEAAIAAgYIgnAAIAAAaQAAACgFACQgGADgHAAgAAfAwIAnAAIAAhTIgnAAg");
	this.shape_23.setTransform(509.675,664.725);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#333333").s().p("ABDCSQglgSgegaQggAagsATQgrATg4AKIgCgGQAygOAogWQAogWAegcQgTgUgPgYQgPgZgKgbIAHgEQALAYAQAWQARAVAWASQASgVAOgXQAOgYAKgYIArATQgCADgEABQgDAAgHAAQgKAXgQAWQgPAVgVATQAiAWApAPQAoAOAtAIIgBAFQgLACgHAGQgHAHgEAMQgsgMglgSgAihATQATgOARgRQARgSANgTQANgTAIgSIAqAVQgBADgDABQgEABgGgBQgLAQgRAQQgRAPgVAOQgVAOgYAKgAB6AMQgHgPgOgRQgOgQgRgPQgRgQgQgLIADgDQAoALAXAOQAYAPAKAOQALAOAAAMQAAAKgHAEQgDACgEAAQgGAAgGgDgAipheIgDgLIEfAAIAVgdIAGAGIAPANIAPAPQAAADgDACQgDABgEAAgAgHhwQgCgLgHgKQgGgLgJgKQgIgKgJgHIAEgEQAcAGAPAKQAOAJAFALQAFAKgDAJQgDAIgHADIgGABQgEAAgHgEg");
	this.shape_24.setTransform(471.175,664.675);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#333333").s().p("AiwCoQAagSARgYQARgYAKgaQAKgaAEgZIAuAKQgBAEgEACQgDACgGAAIgHAUIgJAUQALAVAPAMQAQALAVAFIAAh9IicAAIgDgKIEiAAIAUgaIAGAFIAPAMIAPAMQgBAEgCABQgDACgEAAIiSAAIAAA0IBCAAIAUgbIAHAGIAOAMIAQAOQgBADgCACQgDABgEAAIhxAAIAABCIAQABIARAAIAcAAIAjAAIAjAAIAcgBIAAAGQgHABgFAGQgEAHAAAIIhvAAQgiABgYgGQgZgGgSgQQgSgQgMgeQgOAYgWAVQgWAVgiAQgAhqgQIAAiYIAhAOICVAAIAQgSIAjAbQgCADgEACIgKADIAABsIgFADIgKAEIgLACIgGAAIAAgSIiaAAIAAAMQgBACgIAEQgIAEgJAAgAhLgxICaAAIAAgqIiaAAgAhLhmICaAAIAAgoIiaAAg");
	this.shape_25.setTransform(1183.425,595.325);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#333333").s().p("AANCtQgHgCgHgGIAVgbIAXgdIAUgaIi1AAIgEgLIC8AAIARgQIAeAcQgDADgEABIgMACIgTAZIgYAfIgYAcIgDABIgLgCgAizA9QAXgIAYgLQAYgLAVgOQAWgNAQgMQASgOAIgMIiTAAIgDgMIBHAAIAAgqIgyAAIgCgLIA0AAIAAgpIg4AAIgDgLIBoAAIARgXIAGAFIAOAKIANANQAAADgCABQgDACgEAAIg4AAIAAApIARAAIAPgVIAGAFIAMAJIANAMQgCADgCACIgGABIg1AAIAAAqIAWAAIARgVIAGAEIAMAKIAPANQgBACgDACIAjAIQgBADgDACQgEACgIAAQASAMAcAJQAbAJAfAHQAfAHAeACIAAAHQgKADgHAIQgHAIgCAIQgdgHgcgLQgdgMgXgPQgWgOgPgRQgSARgeAPQgdARglANQgkANgkAIgAABA+QgCgMgIgMQgJgMgJgIIADgCQAcAFAMAJQAMAKgBAKQAAAKgIAEQgDACgDAAQgGAAgGgEgAAGgiIgEgMIA4AAIAAgqIgvAAIgCgLIAxAAIAAgpIg3AAIgDgLIByAAIATgXIAFAFIAOAKIAOANQgBADgDABQgCACgEAAIhEAAIAAApIAVAAIARgWIAFAEIANALIANALQgBAEgDABQgCACgEAAIg7AAIAAAqIAgAAIATgXIAGAFIAOALIAOAMQAAAEgDABQgDACgEAAg");
	this.shape_26.setTransform(1145.2,595.405);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#333333").s().p("AioCnIgDgLIDEAAQAGgNAGgPIALgfIAIgdIAuANQgCADgDACQgEACgGAAQgJAQgNASQgPASgPAQIBQAAIAUgZIAGAFIAPALIAQAOQgBADgDACQgCABgEAAgAg3CUQgCgMgFgOQgFgOgHgNQgHgNgHgKIAEgCQAgAQAMARQANARAAANQgBAOgHAFQgEACgDAAQgGAAgHgGgAiJA+IgDgLICOAAIgEgBIgEgDQgCgMgGgMQgHgMgHgIIAEgDQAaAIAKALQAKAMgCAJQgDAJgIACIBOAAIAUgXIAFAEIAPAMIAPAMQgBADgDACQgCABgEAAgAhNAYIAAi+IAqAEQgBAEgDACQgDADgGABIAACnQAAABAAAAQAAAAgBABQAAAAgBABQgBAAAAABIgJAEQgGABgGAAgABggKQgWgLgRgPQgTAMgXAKQgVAJgaAFIgDgEQAXgJASgLQAVgLAQgOQgQgQgNgUQgMgVgIgZIgWAAIgDgLICGAAIATgRIAfAbQgCADgEABIgKABQgKAWgPATQgOASgTAQQATALAXAIQAWAIAZAFIgBAEQgJACgGAGQgGAHgEAJQgZgIgVgKgAAaheQAPARASANQAPgPALgQQALgRAHgTIhmAAQAKAVAPAQgAiRAIIAAiUIApAEQAAAEgCACQgDADgHABIAAB+QAAABgEACIgJADIgLACg");
	this.shape_27.setTransform(1106.75,594.325);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#333333").s().p("AgaAuQgMgHgHgMQgIgMAAgPQAAgOAIgMQAHgMAMgHQAMgHAOAAQAPAAAMAHQAMAHAHAMQAHAMAAAOQAAAPgHAMQgHAMgMAHQgMAHgPAAQgOAAgMgHgAgbgcQgMAMAAAQQgBALAGAJQAFAJAKAGQAJAFAKAAQALAAAJgFQAKgGAFgJQAFgJABgLQgBgQgMgMQgLgLgRAAQgQAAgLALg");
	this.shape_28.setTransform(1056.2,607.325);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#333333").s().p("Ah+CvIAAjQQgLAQgLANQgMAMgMAMIgGgEQARgWAPgfQAQgfANgjQANgjAJgkIAtAOQgBADgEACQgDACgGAAIgRAqQgKAUgKATIAQAGQgBADgCABQgDACgFABIAADgQgBACgHAEQgHADgJABgACgCuQgIgCgJgFQgJgGgHgHQgdgfgQgsQgRgrgGgzIhLAAIAAB/IAigSIAlgUIADAFIgmAhIgzArQgDAFgDADQgCAEgDABIgUglQAKgFADgEQAEgEgBgFIAAj7IApANIAwgOIAtgQQAVgIAPgHIAiAfQgDADgGAAQgFAAgHgDIgaAGIgeAGQgBAYACAaQABAZADAaIAiAAIAUgaIAGAFIAOAMIAQAOQgBADgDABQgCACgEAAIhOAAQAEAcAIAbQAHAaAMAWQALAVAQAOQADAEADAAQACAAADgGIAHgRIAIgWIAFABIgGA5QAHALABAHQABAHgFAEQgFAFgHAAIgDAAgAA5gaIgEgwIgCgwIgiAFIghADIAABYIBJAAIAAAAgABACkQgDgPgJgPQgJgQgLgKIAEgDQAdAJANANQAMAMAAAMQAAALgIAFQgDACgEAAQgFAAgGgFg");
	this.shape_29.setTransform(1029.7341,595.125);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#333333").s().p("ABoClQgCgFgDgEQgDgDgIgCQgHgDgNgCIAAgFIAGAAIANABIAPABIAKAAQAFAAACgCQACgCgBgEIAAhxIjrAAIAACQQgBADgHADQgIAEgKABIgFAAIAAizIAhANIDmAAIAOgRIAkAaIgGAFIgKACIAABvQAAALgDAJQgDAIgJAEQgKAFgTACIgDgMgAhECOIAAhoIAeAOIBKAAIAPgQIAgAZQgCACgEABIgJADIAAA9QAAABgEACIgJAEIgLABIgFAAIAAgSIhPAAIAAAPQAAACgIADQgHAEgJAAgAgoBsIBPAAIAAgtIhPAAgAhZgBIAAhiIAfANIB0AAIAQgQIAiAZQgCADgEACQgEACgGABIAAA5QAAABgFACIgKADIgLACIgEAAIAAgPIh5AAIAAAJQAAABgEACIgLAEQgFABgGABgAg7geIB5AAIAAgsIh5AAgAinhzIgDgLICmAAQgDgJgGgIQgGgJgHgIQgJgHgHgFIADgEQAXACAOAGQANAGAGAJQAFAHgBAIQAAAIgGAEIBfAAIAWgbIAHAGIAQAMIARANQgBAEgDACQgCABgEAAg");
	this.shape_30.setTransform(991.55,594.95);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#333333").s().p("ABJChQgBgFgFgEQgEgFgLgCQgKgEgNgDIAAgGIAUADIAUABIAOABIAJgBQADgBACgEQAHgHAFgdQAEgcADgxQACgwABhAIhWAAQgMAXgPAVQgNAUgRAPIgFgDQAMgTALgZQAKgZAJgcQAJgdAGgeIAtAOQgBADgEACQgDADgGAAIgKAXIgKAYIBNAAIARgTIAhAcIgGAEIgKADQgCBqgGA9QgGA9gOAQQgIALgMAEQgMAEgPAAQAAgHgCgGgAilCjIAAkaIAeAOIAKAAIAEgVIAFgZIADgXIAuAMQgBAEgDABQgEADgGAAIgPAYIgPAZIAsAAIAQgRIAhAaIgGAEIgKAEIAADlQgBACgEACQgDACgGACIgLADIgEAAIAAgeIhKAAIAAAfQAAADgHADQgHADgJABgAiJBvIBKAAIAAhkIhKAAgAiJAAIBKAAIAAheIhKAAgAAtA1QgCgNgGgOQgHgOgJgNQgJgNgJgKIAEgDQAdALAPAOQAPANAFANQAFANgDAKQgDAIgHADIgEABQgHAAgHgGg");
	this.shape_31.setTransform(953.925,595.1);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#333333").s().p("AhqCvIAAivIAhAOICQAAIARgQIAiAaIgGAEIgJADIAACEQAAABgEACQgFADgGADQgGACgGAAIgEAAIAAgaIiXAAIAAARQgBADgIAEQgHADgKAAgAhLCJICXAAIAAgzIiXAAgAhLBLICXAAIAAgxIiXAAgAingXIgDgLIDCAAIAMgZIALgbIAIgZIjLAAIgEgLID6AAIAUgZIAGAFIAPALIAQANQgCAEgCABQgDACgEAAIhUAAIAoAOQgBADgEABQgEACgFgBQgKANgNAQQgNAPgPAOIBOAAIAUgaIAHAEIAPANIAQANQgBADgCACQgDABgEABgAg9gqQgBgRgIgSQgHgRgIgOIADgDQAdAOAMAPQAKAQAAAMQgCAMgJAEIgFACQgHAAgHgGgAgDh/QgDgLgIgNQgJgNgIgJIADgCQAdAGAMAKQAMAKgBAKQgBALgIAEQgDACgEAAQgFAAgGgFg");
	this.shape_32.setTransform(914.75,595);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#333333").s().p("ACQCpQgBgJgDgLQgDgKgFgKIhAAOIhRARIgFAGIgEADIgSgmIACgBIAGgBIAFgDQAPgMAPgRQARgRAQgUQAQgTAPgUIgjAIIgpAJQgEAGgEACIgRglIAEgBIAGgCQAJgHAKgMQAIgNAJgOIAPgcIAMgYIhTAAIgDgLICuAAIATgYIAGAEIAOAMIAOANQgBADgCACQgCABgFAAIiDAAIAoAUQgCACgDACQgEACgFgBQgJAMgMAOIgaAcQgOANgNALIAmgCIAvgBIARgZQAHgMAFgLIAoAYQgBADgEACQgEABgGgBQgPAUgXAZQgXAagaAZQgcAZgZAUIAlgCIAwgDIA1gEQgHgPgIgNIgQgYIAEgCQAeARARASQAQASAFAQQAGAPgDALQgCAKgIADIgEABQgGAAgIgHgAh+CkQgBgFgDgDQgEgEgJgCIgRgFIAAgGIAPABIARACIALAAIAIgBIAGgCQAHgHAGgcQAGgcADgwIg4AAIgMAOIgegVIAHgEIAIgDIADgdIAEghIACgcIAhAOIAoAAIAAhMIhVAAIgEgLIBWAAIAOgRIAhAZQgBADgFACQgEACgGABIAABaQgBACgDABIgJADIgKACIgFAAIAAgQIgwAAIgDAWIgDAYIgCAWIA3AAIAPgQIAeAZIgFADIgKADQgDA4gIAgQgIAggNAKQgIAHgJADQgKADgMAAQAAgGgCgFgAA2hvQgBgLgEgLQgFgLgGgLQgGgKgHgIIAEgCQAfALAMAOQANAOgBAMQgBAMgIAEQgEACgDAAQgGAAgIgFg");
	this.shape_33.setTransform(875.95,595.0048);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#333333").s().p("AixCsQAtgMAogQQAogQAigWQgTgOgQgSQgPgTgLgXIguAAIgDgLIDCAAIAVgSIAfAeQgCADgEABIgLACQgPASgUASQgSARgXAOQAiAQAmAIQAnAKAqAEIgBAEQgKADgHAGQgHAIgDALQgrgIgmgNQglgNgfgVQgkAVgsAOQgsAOgzAHgAgnBCQARAQAWAMQATgOAPgPQAQgQANgRIiGAAQAOATASAPgAg2ALIAAh5IhuAAIgDgLICsAAIgDgBIgCgBQgFgOgKgNQgKgOgKgKIAEgCQAZAEANAHQANAJAEAJQAFAJgDAHQgDAHgHADIBfAAIAUgZIAHAFIAOALIAQAOQAAADgDACQgDABgEAAIhmAAIAABxQAAABgHACQgGAEgMAAIgFAAIAAh4IgzAAIAABxQAAACgGACQgHAEgLAAgAitAFQATgOATgaQAUgZAOgeIAmAWQgBACgEABQgEACgGgBQgTAagYASQgXAUgZAKgACIgEQgFgNgLgOQgLgPgNgMQgOgNgNgJIAEgEQAiAJAUAMQAUAMAIAMQAIANgBALQgBAJgHAEQgDACgDAAQgFAAgHgEg");
	this.shape_34.setTransform(837.825,595);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#333333").s().p("AhUCqQAsgSAggZQAfgXAXgeQgOgYgIgdQgJgbgGggQgLAUgPASQgOAQgQAPIgFgFQARgYAQgfQAPggALglQALglAHgnIAwAMQgBADgEADQgDACgGAAQgGAUgHARIgOAjIBZAAIAUgZIAGAGIAOALIAPANQgBADgDACQgCACgEgBIgcAAQgHAsgPAkQgQAmgYAeQASAVAYARQAYAQAfAMIgBADQgKADgHAGQgHAGgDALQgcgOgWgTQgVgTgPgXQgaAZghAUQgjATguAPgAAVg7IgGALQAHAeALAZQALAaAPAWQASgbAKgfQALggAFgkIhMAAIgGAMgAivBzQAIgEADgEQACgCAAgGIAAiVIAjARIA6AAIAAhaIhlAAIgEgKIBlAAIAQgSIAhAaQgCACgEADIgKADIAABpQAAABgEACIgKAEQgFACgGAAIgEAAIAAgSIg/AAIAAB8IAxgTIA5gWIACAFIgzAgIhGAsIgGAHIgFADg");
	this.shape_35.setTransform(799.775,595.05);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#333333").s().p("AA9CgQgDgFgFgEQgGgDgKgEQgKgDgSgCIAAgGIAJABIAUABIAWACIAPAAQAGAAACgCQADgCAAgFIAAkHIkBAAIgEgKIEiAAIAVgcIAHAGIAQAMIARAPQgBADgDABQgDABgEAAIgxAAIAAEJQABALgEAJQgEAJgLAHQgLAGgXACQAAgIgDgGgAiCBhIAAi0IAfAOIBQAAIAPgRIAhAaQgCACgEACIgKADIAAB/QAAABgFADIgJADIgKADIgFAAIAAgfIhVAAIAAAjQAAADgIADQgHAEgKgBgAhlAqIBVAAIAAhkIhVAAg");
	this.shape_36.setTransform(761.075,595.25);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#333333").s().p("AgfCqQAfgPAXgVQAXgUARgYQgOgbgKggQgKghgEgoIgPAAIAAADQABAZgDAcQgCAcgGAcQgHAdgOAbQgPAbgZAXIgFgFQAVgfAKgiQALgkADgkQADglAAgkIAAhsIAdAMIAogJIArgNIAqgPIAbAgQgCACgDAAQgFAAgEgCQgVAEgZADQgZAEgYACIgsACIAABIIBnAAIARgSIAfAcQgBAEgEABIgKABQgHAkgNAeQgMAggVAcQASARAVANQAWAOAZAIIAAAEQgMAFgHAHQgIAIgBAKQgugXgegqQgTAUgaAQQgZASggAMgAAyATQALAcAQAVQAOgZAJgbQAJgbAGgfIhSAAQAHAjAKAagAhyCwIAAiuQgVAxglAnIgGgEQAPgXALgaQALgaAIgbQAIgcAGgdIg0AAIgDgLIA8AAIAAhbIArAEQgBAEgCAEQgEACgHABIAABMIAMAAIASgYIAFAFIANAMIAMAMQAAADgCACQgDABgEAAIgzAAIAAAiQAdAMAMAOQAMAOAAAKQAAALgHAFQgIAEgKgHQgCgOgJgOQgHgPgKgMIAADFQAAADgHADQgHAEgJAAg");
	this.shape_37.setTransform(722.75,595.05);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#333333").s().p("AgTCvIAAimIAgANIBmAAIAPgRIAeAYQgBACgEACIgJACIAACCQAAACgHADQgHADgLAAIgFAAIAAgXIhrAAIAAAQQAAACgHADQgFADgLABgAAJCLIBrAAIAAgxIhrAAgAAJBQIBrAAIAAguIhrAAgAizCGIAJgCIALgDIAAiHIAjAEQAAACgDACQgDACgFABIAAB2IAXgFIAAijIgTAAIAAALQAAACgGAEQgGADgLAAIgEAAIAAiIIAfANIAxAAIAOgQIAgAYIgGAEIgJADIAABeIgEADIgJAEIgKACIgEAAIAAgPIgLAAIAABEIAHAAIAQgXIAFAFIALALIAMAMQgBADgDABQgCACgEAAIgpAAIAABMIAYgGIAYgHIACAFIgzAaIhHAgQgBAEgCACQgDADgDABgAiDg4IA5AAIAAhRIg5AAgAAnAAQgCgEgDgDQgEgEgGgCQgGgCgKgBIAAgGIAEAAIALABIANAAIAIABIAGgBQACgCAAgDIAAhRQgCACgDABIgJABQgJAfgUAZQgUAZgkAPIgDgFQAagRAOgYQAOgYAGgcIgsAAIgDgLIAtAAIAQgQIAcAYIAAhCIAoAFQgBAEgDACQgCACgHABIAAAHQAEASAFAPQAGAPAIAMIAOgRIAPgTIAMgQIAhAaQgBACgDAAIgJAAIgRAJIgUALIgUALQAPAVATANQATAMAVAIIgBAEQgIACgFAHQgGAHgDALQgUgNgPgRQgPgQgLgXQgKgYgHghIAABmQAAALgCAHQgDAHgIAFQgIAEgRACIgCgLg");
	this.shape_38.setTransform(684.325,595.175);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#333333").s().p("AgQCwIAAjyIAtADQgBAFgDACQgDADgHABIAADaIgEADQgEADgGACQgFACgHAAgAixAIQAigVAfggQAfgfAXgiQAXgiANgeIAxAMQgBAEgEACIgLACQASAbAaAYQAZAXAgAUQAeAUAkANIgBAHQgKADgHAHQgGAIgDAIQgygaglgpQgmgogWgwQgPAdgbAfQgbAfgjAbQgiAbgoASg");
	this.shape_39.setTransform(645.85,595.15);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#333333").s().p("AgtCLIgEgDIBujyIiRAAIAAggICoAAIAAAUIhhEBg");
	this.shape_40.setTransform(616.15,595.625);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#333333").s().p("ABECjQgCgGgEgEQgEgDgIgDQgIgDgOgCIAAgGIAHABIAOAAIAQABIALABQAGAAACgCQABgCAAgEIAAgxIiMAAIAABUQAAACgHAEQgGADgMABIgFAAIAAjDQgSATgVAQQgWAQgYANIgEgEQAmgdAdgkQAdglATgpIhsAAIgDgLIB0AAQAIgQAFgPIAKgfIAtAPQgBADgDACQgDACgHgBIgJAUIgKAVICHAAIAVgaIAHAFIAPAMIAQAOQgBADgCACIgHABIi9AAQgHANgJANIgSAaIAIADICDAAIAPgTIAlAcQgBACgFADQgFACgGACIAACkQAAALgDAJQgDAIgKAFQgKAGgUACQAAgIgCgFgAg3BHICMAAIAAgyIiMAAgAg3ALICMAAIAAgvIiMAAg");
	this.shape_41.setTransform(586.125,595.025);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#333333").s().p("AA9CiQgCgGgEgDQgGgEgLgDIgYgFIABgHIAVACIAWACIAPABIAJgBQADgBADgDQAGgEAGgPQAFgOAEgWQAEgXADgbIhpAAQgIAhgSAcQgUAcgiAVQgjAVg2AOIgDgFQAsgQAcgVQAdgWAQgaQAQgaAIgdIiEAAIgDgMICJAAIAEgaIACgcIAuAGQgBAEgEADQgDACgGABIgDAUIgDASIBjAAIARgQIAgAaQgCACgEACQgDABgHABQgCAhgGAaQgFAagIASQgHARgKAIQgIAGgMAEQgLADgOAAQAAgHgCgFgAhpgPIAAiaIAjAOICkAAIAPgSIAgAZIgFAEIgJACIAAByQAAABgIADQgHADgMABIgFAAIAAgVIipAAIAAARQAAACgHAEQgGADgMAAgAhKg0ICpAAIAAhcIipAAg");
	this.shape_42.setTransform(546.825,595.275);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#333333").s().p("AgeA1QAWgNAIgPQAJgPABgMIgQgHQgIgDgGgHQgFgGAAgLQAAgKAHgIQAGgHANgBQAOABAHAKQAJAKAAARQAAAPgFAQQgGAQgMAPQgLAPgVAKg");
	this.shape_43.setTransform(496.1,611.025);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#333333").s().p("ACRCpQgCgJgEgLQgDgKgFgKIhAAOIhQARIgFAGIgEADIgSgmIACgBIAGgBIAFgDQAPgMAPgRQARgRAQgUQAQgTAPgUIgjAIIgpAJQgDAGgFACIgRglIAEgBIAGgCQAJgHAKgMQAIgNAJgOIAQgcIALgYIhTAAIgDgLICvAAIASgYIAGAEIAOAMIAOANQgBADgDACQgCABgEAAIiDAAIAoAUQgCACgDACQgDACgGgBQgIAMgNAOIgaAcQgOANgNALIAmgCIAvgBIARgZQAHgMAFgLIApAYQgCADgEACQgEABgGgBQgPAUgXAZQgXAagbAZQgbAZgZAUIAmgCIAvgDIA1gEQgHgPgJgNIgPgYIAEgCQAeARARASQAQASAFAQQAGAPgCALQgDAKgIADIgEABQgGAAgHgHgAh+CkQAAgFgEgDQgFgEgHgCIgRgFIAAgGIAOABIAQACIAMAAIAIgBIAGgCQAHgHAGgcQAGgcADgwIg4AAIgMAOIgegVIAHgEIAHgDIAFgdIADghIACgcIAhAOIAoAAIAAhMIhVAAIgEgLIBWAAIAPgRIAgAZQgCADgDACQgFACgGABIAABaQAAACgEABIgJADIgKACIgFAAIAAgQIgwAAIgCAWIgEAYIgCAWIA2AAIAQgQIAeAZIgFADIgJADQgEA4gIAgQgJAggMAKQgIAHgJADQgLADgLAAQAAgGgCgFgAA3hvQgCgLgEgLQgFgLgGgLQgGgKgHgIIAEgCQAfALAMAOQAMAOAAAMQgBAMgIAEQgEACgDAAQgGAAgHgFg");
	this.shape_44.setTransform(470.7,595.0048);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#333333").s().p("ABJChQgBgFgFgFQgEgDgLgEQgKgDgNgCIAAgHIAUACIAUACIAOABIAJgCQADAAACgEQAHgHAFgdQAEgdADgwQACgwABhAIhWAAQgMAXgPAVQgNAUgRAQIgFgEQAMgTALgZQAKgZAJgdQAJgcAGgeIAtANQgBAEgEACQgDACgGAAIgKAYIgKAYIBNAAIARgUIAhAdIgGAEIgKACQgCBrgGA9QgGA9gOARQgIAJgMAFQgMAEgPABQAAgIgCgGgAilCjIAAkaIAeAOIAKAAIAEgWIAFgYIADgXIAuALQgBAEgDADQgEACgGAAIgPAYIgPAZIAsAAIAQgRIAhAaIgGAEIgKAEIAADlQgBACgEACQgDACgGADIgLABIgEAAIAAgdIhKAAIAAAeQAAAEgHADQgHAEgJAAgAiJBvIBKAAIAAhkIhKAAgAiJAAIBKAAIAAheIhKAAgAAtA1QgCgNgGgPQgHgNgJgNQgJgOgJgJIAEgEQAdAMAPAOQAPANAFANQAFANgDAKQgDAIgHADIgEABQgHAAgHgGg");
	this.shape_45.setTransform(1184.275,525.5);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#333333").s().p("AixCuQARgeAJgiQAIghADgjQACgjAAghIAAhvIAkAOIDbAAIAUgZIAHAFIAOAMIAQAOQgBACgCACQgDACgEgBIkQAAIAABWIgBAxQgCAbgGAcQgGAbgNAZQgNAagXAWgAiICrQAogJAjgNQAjgMAbgRQgPgNgNgQQgNgSgKgUIgdAAIgDgMICeAAIAUgRIAeAdIgGAEIgLABQgMASgQAPQgQAPgTANQAdAKAhAGQAhAGAlADIAAAEQgKACgHAIQgGAHgCALQgogGghgKQghgLgbgPQgfAQgmALQgnAKguAFgAgNBUQAOANAUALQAQgNAOgNQANgOAKgPIhyAAQALARAQAOgAguAdIAAhNIgzAAIgEgMIA3AAIAAgpIArAFQgBADgDADQgDACgHABIAAAbIBLAAIAAgpIArAFQAAADgDADQgEACgHABIAAAbIAcAAIARgYIAGAFIANALIAOAOQgBADgDABQgDACgEAAIhDAAIAABAQAAAAAAABQAAAAgBABQAAAAgBABQAAAAgBABIgJADIgLABIgGAAIAAgPIhLAAIAAAMQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAIgJAEIgKABgAgRgCIBLAAIAAguIhLAAgAAJh/QgFgMgJgNQgJgNgKgJIADgDQAYADAOAHQANAIAEAJQAEAJgCAHQgDAHgHADIgFAAQgGAAgGgDg");
	this.shape_46.setTransform(1144.175,525.35);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#333333").s().p("Ah1CIQAMgGADgEQADgDgBgGIAAh+IhFAAIgEgLIBJAAIAAiaIAvAGQAAADgEADQgDACgIABIAABuQAdgQAdgTQAcgUAZgUQAZgUARgRIAkAcQgDACgDABQgDAAgGgCQgUAPgcARQgcARggAPQggAQgiAMIAAAUICzAAIAVgaIAHAFIAOAMIAQAOQAAADgDACQgDABgEAAIijAAQAPAlAaAcQAbAcAjATQAjAUAoALIgCAEQgJABgIAHQgIAHgDAKQg5gXgogrQgogqgThAIg4AAIAACJIAsgNIAxgPIABAEIgtAcIhAAjIgEAFIgEADg");
	this.shape_47.setTransform(1105.1,525.675);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#333333").s().p("ABXCeQgCgGgEgDQgGgDgKgDQgJgDgQgCIAAgGIAIABIASABIAVABIANABQAHAAACgCQADgDAAgFIAAkKIjvAAIAAEqQAAADgHAEQgHAEgKABIgFAAIAAlPIAgAPIDnAAIAQgTIAjAbIgHAFQgEACgGABIAAEHQAAAMgDAIQgDAHgLAGQgKAGgXACQgBgIgDgEgAhOBmIAAiTIAfAMIBKAAIAPgPIAhAXIgGAFIgJADIAABmQAAACgEACIgKAEIgKACIgFAAIAAghIhPAAIAAAfQgBADgHADQgIADgJAAgAgwAzIBPAAIAAhIIhPAAgAhjhQIgCgLICJAAIATgYIAHAGIAOAKIAOANQAAAEgDABQgCACgFgBg");
	this.shape_48.setTransform(1066.3,526.1);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#333333").s().p("AgMCsIAAjUQgfApgoAmQgoAkgwAcIgDgEQAngeAignQAiglAbgqQAagqAOgpIilAAIgEgMIEaAAIAWgbIAHAFIAQANIASAPQgCADgCABQgDACgEAAIh9AAQgGAOgIAPQgIAOgJAOIAVAIQgBADgDABQgDACgFABIAADfQAAACgEACIgJADIgLACgACXBNQgIgOgNgPQgNgPgRgPIghgcIgggYIAEgEQAvAQAeATQAeARANARQAOARACAMQABANgGAFQgDACgFAAQgFAAgGgDg");
	this.shape_49.setTransform(1025.9,525.875);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#333333").s().p("Ah1CwIAAiqQgKAYgOAVQgOAVgSATIgFgFQAOgWALgaQALgbAHgbQAIgcAFgdIgyAAIgDgLIA6AAIAAhbIArAFQAAAEgDADQgDACgIABIAABMIAOAAIASgYIAFAFIANALIANANQAAADgDABQgDACgEAAIg1AAIAAAjQAeAMANAOQAMANAAALQAAAMgHAEQgHAEgLgHQgDgOgIgOQgJgPgKgMIAADEQAAADgHAEQgHADgIAAgAggCRQAJgEACgEQADgDgBgGIAAkhIAhAPIBgAAIAQgRIAhAZQgCADgEACIgKADIAACEQgBACgEACIgJAEQgFACgFAAIgFAAIAAgNIhAAAQAHAUAKAUQAJATANASIAUgWIATgXIAOgSIAgAXQgCACgDABQgDAAgEgBIgRANIgYAQIgaAQQARAVAVAQQAVAQAZAJIAAAEQgJACgGAHQgHAGgDAKQgsgYgcgtQgbgsgNg+IghAAIAACHIAdgJIAhgLIABAGIgjAVIgvAdIgEAEIgEACgAAJgMIBpAAIAAg5IhpAAgAAJhQIBpAAIAAg3IhpAAg");
	this.shape_50.setTransform(987.025,525.425);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#333333").s().p("AgtCLIgDgDIBujyIiRAAIAAggICnAAIAAAUIhhEBg");
	this.shape_51.setTransform(956.3,526.025);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#333333").s().p("AASCNIAAhWIhwAAIAAgUIB6iwIAXAAIAACrIAsAAIAAAZIgsAAIAABWgAhJAeIBbAAIAAiDg");
	this.shape_52.setTransform(934.275,525.8);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#333333").s().p("ABECjQgCgGgEgEQgEgDgIgDQgIgDgOgCIAAgGIAHABIAOAAIAQABIALABQAGAAACgCQABgCAAgEIAAgxIiMAAIAABUQAAACgHAEQgGADgMABIgFAAIAAjDQgSATgVAQQgWAQgYANIgEgEQAmgdAdgkQAdglATgpIhsAAIgDgLIB0AAQAIgQAFgPIAKgfIAtAPQgBADgDACQgDACgHgBIgJAUIgKAVICHAAIAVgaIAHAFIAPAMIAQAOQgBADgCACIgHABIi9AAQgHANgJANIgSAaIAIADICDAAIAPgTIAlAcQgBACgFADQgFACgGACIAACkQAAALgDAJQgDAIgKAFQgKAGgUACQAAgIgCgFgAg3BHICMAAIAAgyIiMAAgAg3ALICMAAIAAgvIiMAAg");
	this.shape_53.setTransform(903.225,525.425);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#333333").s().p("AANCtQgHgCgHgGIAVgbIAXgdIATgaIi0AAIgDgLIC8AAIAQgQIAeAcQgDADgEABIgMACIgTAZIgYAfIgYAcIgDABQgFAAgGgCgAi0A9QAYgIAYgLQAYgLAVgOQAWgNARgMQAQgOAKgMIiVAAIgCgMIBHAAIAAgqIgyAAIgCgLIA0AAIAAgpIg4AAIgDgLIBoAAIASgXIAFAFIAOAKIANANQAAADgCABQgDACgEAAIg5AAIAAApIASAAIAQgVIAFAFIAMAJIAMAMQAAADgCACIgHABIg2AAIAAAqIAXAAIARgVIAFAEIANAKIAOANQAAACgDACIAkAIQgCADgEACQgDACgIAAQASAMAcAJQAbAJAfAHQAgAHAdACIAAAHQgKADgHAIQgHAIgCAIQgdgHgcgLQgcgMgYgPQgWgOgPgRQgSARgeAPQgdARglANQgjANglAIgAABA+QgCgMgJgMQgIgMgKgIIAEgCQAbAFANAJQAMAKgBAKQAAAKgIAEQgDACgDAAQgGAAgGgEgAAGgiIgEgMIA5AAIAAgqIgwAAIgDgLIAzAAIAAgpIg4AAIgDgLIByAAIATgXIAFAFIANAKIAPANQgBADgDABQgCACgEAAIhEAAIAAApIAVAAIARgWIAFAEIAMALIAOALQgBAEgDABQgCACgEAAIg7AAIAAAqIAhAAIASgXIAGAFIAOALIAOAMQgBAEgCABQgDACgEAAg");
	this.shape_54.setTransform(864.15,525.805);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#333333").s().p("AioCnIgDgLIDEAAQAHgNAFgPIAKgfIAJgdIAtANQgBADgDACQgDACgHAAQgJAQgOASQgOASgPAQIBQAAIAUgZIAHAFIAOALIAQAOQgBADgCACQgDABgEAAgAg3CUQgCgMgFgOQgFgOgHgNQgHgNgHgKIAFgCQAeAQANARQANARAAANQgBAOgHAFQgEACgDAAQgGAAgHgGgAiIA+IgEgLICNAAIgCgBIgFgDQgCgMgGgMQgHgMgHgIIADgDQAbAIAKALQAKAMgDAJQgBAJgJACIBOAAIAUgXIAFAEIAPAMIAPAMQAAADgEACQgCABgEAAgAhOAYIAAi+IArAEQgBAEgCACQgEADgGABIAACnQAAABAAAAQAAAAgBABQAAAAgBABQgBAAgBABIgJAEQgFABgGAAgABggKQgVgLgTgPQgSAMgWAKQgWAJgbAFIgCgEQAXgJATgLQATgLARgOQgQgQgNgUQgNgVgHgZIgWAAIgDgLICGAAIATgRIAfAbQgCADgEABIgKABQgLAWgOATQgOASgTAQQAUALAWAIQAXAIAYAFIAAAEQgKACgGAGQgHAHgDAJQgZgIgVgKgAAaheQAOARAUANQAOgPALgQQALgRAHgTIhmAAQAKAVAPAQgAiQAIIAAiUIAoAEQAAAEgDACQgCADgHABIAAB+QAAABgDACIgJADIgMACg");
	this.shape_55.setTransform(824.8,524.725);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#333333").s().p("Ah2CwIAAjUQgNARgNAQQgOANgOANIgFgDQARgXAQgfQARgfAOglQAOgkAKgkIAvAPQgBADgDADQgEACgGgBQgJAWgJATIgUAmIASAHQgBADgDABIgIADIAADhQAAACgIADQgHAEgJABgAChCvQgKgBgKgFQgLgFgJgHQgsghgZgyQgYgygJg/IhWAKIgEgKIBYgLQgEgcgBgeQgCgeAAgfIAuAFQAAAEgDADQgEADgHABQAAAaABAZQACAZADAYIBGgIIASgcIAHAFIAQAKIARALQgBADgCACQgDABgDABIh2AOQAFAkALAfQALAgASAaQARAZAaASQAFAEADAAQADAAACgGIAKgTIAKgZIAEABIgHA7QAJAMACAHQABAGgDAEQgFAGgIAAIgCAAgABwhrQgEgIgGgKIgPgSIgQgOIAEgEQAaAFAOAIQAOAHAFAKQAFAIgCAIQgCAIgHACIgFABQgFAAgGgDg");
	this.shape_56.setTransform(785.375,525.5);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#333333").s().p("AhXCkQArgSAagWQAagWAPgZQAOgaAGgeQAGgcABgjIAAhJIArAEQAAAEgEADQgDACgGABIgCA/QgBAdgFAaIAhADQgBAEgCACQgDACgFABIAABlQgBADACACQACABAHAAIAVAAIAOAAIAHAAIAEgBIACgEIADgLIAEgRIAEgVIAFAAIABAzQAGACACADQACADAAAEQAAAFgEAEQgGAEgLACQgNACgVAAIgbAAQgNAAgGgCQgHgDgCgFQgDgGABgJIAAhhQgIAcgSAXQgRAYgdAUQgfATgwAQgAiyBkIAXgGIAggJIAAhrIgtAAIgEgLIAxAAIAAhjIgyAAIgDgLIBgAAIASgYIAGAFIAOALIANANQgBADgCABQgDACgEAAIg2AAIAABjIAPAAIAPgXIAGAEIAKALIAMAMQAAAEgDABQgDACgEAAIgwAAIAABjIA8gSIACAFIgzAbIhGAjIgDAGQgCADgDABgAgSA0IAAjZIAgANIBsAAIAPgRIAfAYQgCACgEACQgDACgGABIAACxQgBACgGADQgIADgJABIgGAAIAAi+IhyAAIAAC6QAAACgFADQgGADgLAAg");
	this.shape_57.setTransform(746,526.025);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#333333").s().p("AgaAuQgMgHgHgMQgIgMAAgPQAAgOAIgMQAHgMAMgHQAMgHAOAAQAPAAAMAHQAMAHAHAMQAHAMABAOQgBAPgHAMQgHAMgMAHQgMAHgPAAQgOAAgMgHgAgbgcQgMAMgBAQQAAALAGAJQAFAJAKAGQAJAFAKAAQALAAAJgFQAKgGAFgJQAFgJAAgLQAAgQgMgMQgLgLgRAAQgQAAgLALg");
	this.shape_58.setTransform(694.75,537.725);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#333333").s().p("AiwCsQASgcAJggQAJggADggQACghAAgfIAAhhIAkAPIBwAAIgCgmIgBgnIAtAFQgBAEgDADQgDADgHABIAAAeIACAfIBNAAIATgaIAHAGIAOALIAQANQgBAEgCABQgDACgEAAIh7AAQADAkAHAhQAHAgAMAdQANgYAKgXQAJgYAGgZIAtAOQgBAEgDABQgEACgHAAQgJAbgNAZQgOAagSAYQAKARAMANQANANAQAKQAFAEACAAQADAAADgFIAJgUIAKgZIAEABIgHA7QAJAMACAGQABAHgDACQgFAHgKgBQgJgBgKgEQgLgFgJgHQgRgMgOgPQgOgOgKgSQgWAYgdAUQgcAUgkAOIgDgFQAhgSAagYQAagYAVgcQgSgigJgoQgJgpgEgtIh2AAIAAA9IA7AAIAQgQIAeAaIgFADIgJACQgBAmgCAZQgDAZgEAOQgFAPgHAGQgHAGgJACQgIADgLAAIgBgLQgCgFgDgEQgDgDgHgCIgOgEIAAgGIAMABIANABIAKAAIAGgBQADAAACgCQAFgFADgZQADgZABgvIg+AAQAAAdgEAjQgEAigPAhQgOAhgeAbgABvh4QgEgIgIgIQgHgIgJgHQgJgHgJgEIADgEQAZABAPAGQAOAGAGAIQAGAJgBAHQgBAHgGADQgDABgDAAQgEAAgFgCg");
	this.shape_59.setTransform(667.325,525.625);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#333333").s().p("AhEClIgDgLIAwAAIAAkxIAhANIBWAAIAPgTIAmAbQgCADgEACQgFACgHABIAAEUIAGAAIAOgXIAFAFIALALIAMALQgBAEgCACQgDABgDAAgAAGCaIBeAAIAAhZIheAAgAAGA2IBeAAIAAhXIheAAgAAGgsIBeAAIAAhTIheAAgAivB7IAjgIIAwgNIA3gPIACAGQgTAMgdAPQgcAPgmASQgBAEgCACIgFAEgAiyAnIAEgBQAFgBACgCQAPgOASgUQARgUAPgXIgZAJIgdAJIgCADIgEACIgPgnIADgBIAGgCQAJgIAJgNQAKgNAIgPIAQgdQAGgPAEgKIArASQgCADgDACQgEABgGAAQgIANgNAPQgMAPgOAPQgOAPgOAMIAcgBIAhgCIAOgWIAKgUIAnAYQgBACgEABQgEACgFgBQgMARgRATQgRAUgUATQgUATgUARIAwgHIA7gJIAAAGIgvATIhCAXIgDAEQgBAAAAABQgBAAAAABQgBAAAAAAQgBAAAAAAg");
	this.shape_60.setTransform(628.4,524.8);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#333333").s().p("AgfCrQAfgQAWgUQAYgVARgYQgPgagJgiQgKgfgEgpIgPAAIAAADQABAZgCAbQgDAdgGAdQgHAcgPAbQgOAbgZAWIgFgDQAVgfALgjQAKgkADgkQADgkAAglIAAhsIAdANIAogKIArgOIAqgOIAbAgQgCACgEAAQgEAAgEgCQgWAFgYACQgYAEgYACIgtACIAABJIBmAAIASgSIAgAbQgCADgEABIgKACQgHAjgNAfQgMAggVAcQASARAVANQAWANAZAJIAAAEQgMAEgHAIQgIAHgBALQgugXgegqQgTAUgaAQQgZARggANgAAyATQALAcAPAVQAPgYAJgcQAJgbAGgfIhSAAQAHAjAKAagAhyCwIAAiuQgWAygkAnIgGgGQAPgVALgaQAMgaAHgcQAIgcAGgdIg0AAIgEgMIA9AAIAAhaIArAFQgBADgCAEQgEACgHABIAABLIAMAAIASgWIAFAEIANAMIAMAMQAAADgCABQgDACgEAAIgzAAIAAAhQAdANAMAOQAMANAAALQAAAMgIAEQgHAEgKgIQgCgNgJgOQgHgPgKgMIAADEQAAADgHAFQgIADgHAAg");
	this.shape_61.setTransform(589,525.45);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#333333").s().p("AgTCvIAAimIAgANIBmAAIAPgRIAeAYQgBACgEACIgJACIAACCQAAACgHADQgHADgLAAIgFAAIAAgXIhrAAIAAAQQAAACgHADQgFADgLABgAAJCLIBrAAIAAgxIhrAAgAAJBQIBrAAIAAguIhrAAgAizCGIAJgCIALgDIAAiHIAjAEQAAACgDACQgDACgFABIAAB2IAXgFIAAijIgTAAIAAALQAAACgGAEQgGADgLAAIgEAAIAAiIIAfANIAxAAIAOgQIAgAYIgGAEIgJADIAABeIgEADIgJAEIgKACIgEAAIAAgPIgLAAIAABEIAHAAIAQgXIAFAFIALALIAMAMQgBADgDABQgCACgEAAIgpAAIAABMIAYgGIAYgHIACAFIgzAaIhHAgQgBAEgCACQgDADgDABgAiDg4IA5AAIAAhRIg5AAgAAnAAQgCgEgDgDQgEgEgGgCQgGgCgKgBIAAgGIAEAAIALABIANAAIAIABIAGgBQACgCAAgDIAAhRQgCACgDABIgJABQgJAfgUAZQgUAZgkAPIgDgFQAagRAOgYQAOgYAGgcIgsAAIgDgLIAtAAIAQgQIAcAYIAAhCIAoAFQgBAEgDACQgCACgHABIAAAHQAEASAFAPQAGAPAIAMIAOgRIAPgTIAMgQIAhAaQgBACgDAAIgJAAIgRAJIgUALIgUALQAPAVATANQATAMAVAIIgBAEQgIACgFAHQgGAHgDALQgUgNgPgRQgPgQgLgXQgKgYgHghIAABmQAAALgCAHQgDAHgIAFQgIAEgRACIgCgLg");
	this.shape_62.setTransform(549.675,525.575);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#333333").s().p("AhdCuIAAieQgOAcgSAYQgTAYgXAVIgFgFQAQgUANgZQANgYAKgbQAKgaAGgbIg9AAIgDgLIBLAAIAAhIIgmAGIglAFIgCgGQAZgHAbgJIAygTQAYgKAQgJIAiAfQgDACgEAAQgGAAgHgCIgxAMIAABOIAYAAIATgZIAGAFIANAMIANANQAAADgDABQgCACgEAAIhCAAIAAAYQAhANAOANQAPAPABAMQAAALgGAFQgHAEgLgHQgEgNgMgQQgLgQgMgMIAACtQgBACgGAEQgHADgLAAgAATCaIAAkaIAgAOIBGAAIARgTIAjAcQgCADgFACIgKADIAADsIgFADIgKADIgLACIgFAAIAAgnIhMAAIAAAjQgBADgHAEQgHAEgKAAgAAxBhIBMAAIAAjIIhMAAg");
	this.shape_63.setTransform(509.775,525.525);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#333333").s().p("ACRCpQgCgJgEgLQgDgKgFgKIhAAOIhQARIgFAGIgEADIgSgmIACgBIAGgBIAFgDQAPgMAPgRQARgRAQgUQAQgTAPgUIgjAIIgpAJQgDAGgFACIgRglIAEgBIAGgCQAJgHAKgMQAIgNAJgOIAQgcIALgYIhTAAIgDgLICvAAIASgYIAGAEIAOAMIAOANQgBADgDACQgCABgEAAIiDAAIAoAUQgCACgDACQgDACgGgBQgIAMgNAOIgaAcQgOANgNALIAmgCIAvgBIARgZQAHgMAFgLIApAYQgCADgEACQgEABgGgBQgPAUgXAZQgXAagbAZQgbAZgZAUIAmgCIAvgDIA1gEQgHgPgJgNIgPgYIAEgCQAeARARASQAQASAFAQQAGAPgCALQgDAKgIADIgEABQgGAAgHgHgAh+CkQAAgFgEgDQgFgEgHgCIgRgFIAAgGIAOABIAQACIAMAAIAIgBIAGgCQAHgHAGgcQAGgcADgwIg4AAIgMAOIgegVIAHgEIAHgDIAFgdIADghIACgcIAhAOIAoAAIAAhMIhVAAIgEgLIBWAAIAPgRIAgAZQgCADgDACQgFACgGABIAABaQAAACgEABIgJADIgKACIgFAAIAAgQIgwAAIgCAWIgEAYIgCAWIA2AAIAQgQIAeAZIgFADIgJADQgEA4gIAgQgJAggMAKQgIAHgJADQgLADgLAAQAAgGgCgFgAA3hvQgCgLgEgLQgFgLgGgLQgGgKgHgIIAEgCQAfALAMAOQAMAOAAAMQgBAMgIAEQgEACgDAAQgGAAgHgFg");
	this.shape_64.setTransform(470.7,525.4048);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#333333").s().p("AANCtQgHgCgHgGIAWgbIAWgdIAUgaIi2AAIgDgLIC8AAIARgQIAeAcQgDADgFABIgLACIgTAZIgZAfIgXAcIgDABIgLgCgAizA9QAXgIAYgLQAYgLAWgOQAVgNAQgMQARgOAJgMIiTAAIgEgMIBIAAIAAgqIgxAAIgEgLIA1AAIAAgpIg4AAIgCgLIBnAAIARgXIAHAFIANAKIAOANQgBADgCABQgDACgDAAIg6AAIAAApIASAAIAPgVIAGAFIAMAJIAMAMQgBADgCACIgGABIg2AAIAAAqIAXAAIARgVIAFAEIAOAKIANANQAAACgDACIAjAIQAAADgFACQgDACgJAAQAUAMAbAJQAcAJAfAHQAeAHAfACIAAAHQgLADgHAIQgHAIgBAIQgegHgdgLQgcgMgWgPQgXgOgPgRQgSARgeAPQgeARgjANQglANgjAIgAABA+QgCgMgJgMQgIgMgKgIIAEgCQAbAFAMAJQAMAKAAAKQAAAKgHAEQgEACgDAAQgGAAgGgEgAAFgiIgCgMIA3AAIAAgqIguAAIgDgLIAxAAIAAgpIg3AAIgDgLIBxAAIATgXIAGAFIANAKIAPANQAAADgDABQgDACgEAAIhEAAIAAApIAVAAIARgWIAFAEIANALIANALQgBAEgCABQgDACgEAAIg7AAIAAAqIAgAAIATgXIAGAFIANALIAQAMQgCAEgCABQgDACgEAAg");
	this.shape_65.setTransform(1184.05,456.205);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#333333").s().p("AATAsQgEgEgFgJQgFgMgGgMQgIgLgLgMQgLgNgRgMIAEgGQAkAKASANQAVANAJAOQAFAHACAGQACAGAAAGQAAAJgFAGQgFAFgIAAQgHAAgFgEg");
	this.shape_66.setTransform(1131.25,468.525);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#333333").s().p("AAuCkQgCgFgFgEQgFgCgJgDQgIgEgPgCIAAgEIAHAAIARACIASABIAMAAQAFAAACgCQADgCgBgFIAAhHQguAjg6AcQg6AchGARIgDgGQA/gVA2gdQA2gfAsglIjPAAIgDgLIBAAAIAAiwIAjAPIAjAAIAHgZIAFgZIAuAIQAAAFgEACQgEACgGAAIgMAQIgNARIBKAAIAPgTIAkAbIgGAFIgKAEIAABqIAVgaIASgaIAjAcQgCADgDAAQgEABgHgDQgMARgOAPQgPAQgRAPIAABiQAAAMgDAIQgEAIgKAFQgLAFgVACQAAgHgCgFgAhHAkICAAAIAIgHIAAgjIiIAAgAhHgRICIAAIAAgsIiIAAgAhHhIICIAAIAAgrIiIAAg");
	this.shape_67.setTransform(1104.225,455.9);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#333333").s().p("AANCtQgHgCgHgGIAVgbIAXgdIAUgaIi1AAIgEgLIC8AAIARgQIAeAcQgDADgEABIgMACIgTAZIgYAfIgYAcIgDABIgLgCgAizA9QAXgIAYgLQAYgLAVgOQAWgNAQgMQASgOAIgMIiTAAIgDgMIBHAAIAAgqIgyAAIgCgLIA0AAIAAgpIg4AAIgDgLIBoAAIARgXIAGAFIAOAKIANANQAAADgCABQgDACgEAAIg4AAIAAApIARAAIAPgVIAGAFIAMAJIANAMQgBADgDACIgGABIg1AAIAAAqIAWAAIARgVIAGAEIAMAKIAPANQgBACgDACIAjAIQgBADgDACQgEACgIAAQASAMAcAJQAbAJAfAHQAfAHAeACIAAAHQgKADgHAIQgHAIgCAIQgdgHgcgLQgcgMgYgPQgWgOgPgRQgSARgeAPQgdARglANQgkANgkAIgAABA+QgCgMgIgMQgJgMgJgIIADgCQAcAFAMAJQAMAKgBAKQAAAKgIAEQgDACgDAAQgGAAgGgEgAAGgiIgEgMIA4AAIAAgqIgvAAIgCgLIAxAAIAAgpIg3AAIgDgLIByAAIATgXIAFAFIAOAKIAOANQgBADgDABQgCACgEAAIhEAAIAAApIAVAAIARgWIAFAEIANALIANALQgBAEgDABQgCACgEAAIg7AAIAAAqIAgAAIATgXIAGAFIAOALIAOAMQAAAEgDABQgDACgEAAg");
	this.shape_68.setTransform(1064.2,456.205);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#333333").s().p("AiVCtIAAkUIAgAPIBaAAIAAhVIAsAFQgBAEgCADQgDADgHABIAABFIBbAAIARgUIAmAeQgCACgGACQgEAEgHABIAADmQgBABgEADIgLAEIgLACIgEAAIAAgeIjbAAIAAAWQgBACgHAFQgHADgLAAgAAECCIBgAAIAAhlIhgAAgAh3CCIBcAAIAAhlIhcAAgAAEARIBgAAIAAheIhgAAgAh3ARIBcAAIAAheIhcAAg");
	this.shape_69.setTransform(1025.1,456.05);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#333333").s().p("AgeA1QAWgNAIgPQAJgPABgMIgPgHQgJgDgGgHQgFgGAAgLQAAgKAHgIQAGgHANgBQAOABAHAKQAJAKAAARQAAAPgFAQQgGAQgMAPQgLAPgVAKg");
	this.shape_70.setTransform(970.85,471.825);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#333333").s().p("AiECsIAAhyIgVAIIgXAIIgDgFQAmgPAdgVQAdgUATgVIhrAAIgEgMIB5AAQAIgKAHgKIAMgVIgJACIgIABIgEAAIAAgMIg8AAIAAATQgBACgHADQgHADgJABIgEAAIAAh9IAdAMIA3AAIAPgPIAhAYIgGAFIgKACIAABIIAAABIgBABIAjAOQgBADgEABQgDACgGgBQgHANgLANICJAAIAUgXIAGAEIAOALIAQAOQgBADgDABQgDACgEAAIh6AAQAWAQAiAMQAiAMAwAEIgBAEQgFADgEAHQgEAJgBAKIgLgCIgKgDIgFACIgHACIAABYIgEADIgJAEIgLABIgFAAIAAgUIg8AAIAAARQAAACgHADQgIADgJABIgEAAIAAiDIAeAMIA3AAIADgDQgYgLgRgPQgRgPgOgPIg6AAQgQAPgUAOQgUAPgbANIAIACIAzAAIAPgPIAhAYIgGAFIgKACIAABWQAAACgEACIgJADQgGADgFAAIgEAAIAAgTIg5AAIAAATQAAACgIADQgHAEgJAAgAArCFIA8AAIAAhGIg8AAgAhoCFIA5AAIAAhGIg5AAgAhshSIA8AAIAAg9Ig8AAgABCgXQgDgJgIgJQgHgKgIgIIgIADIgJABIgEAAIAAhwIAeAMIA6AAIAQgQIAhAZIgGAFIgKADIAABOQAAABgFACIgJADIgKACIgFAAIAAgSIhAAAIAAAFQAXAGAKAIQAJAIAAAJQAAAIgHAEQgCABgEAAQgEAAgGgCgAAvhSIBAAAIAAg9IhAAAg");
	this.shape_71.setTransform(944.275,456.4);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#333333").s().p("AgUCiQgCgGgEgDQgFgEgIgDQgJgCgOgCIAAgGIAHAAIAQABIARACIAMABQAGAAACgDQACgCAAgDIAAiKIhfAAIgNANIgfgTIAGgFIAGgDIAHggIAGgkIAGgjIADgdIApALIBAgJIA9gMQAdgFAVgGIAeAgQgDACgFAAQgFgBgIgDIg7AGQghADgiABQgkACgjgBIgFAkIgHApIgHAmIBgAAIAAhcIArAFQgBAEgDACQgDADgGABIAABNIBUAAIAUgZIAGAFIAPAMIAPAOQAAADgDABQgDABgDAAIiDAAIAACMQAAALgDAIQgDAJgLAFQgKAFgUACIgDgMgAitCWQARgPARgUQASgUAPgZQAQgYAMgbIApAVQgCADgEACQgEABgGgBQgYAlgeAbQgeAcggARgACTCPQgIgTgOgVQgOgWgRgUQgRgTgQgRIAFgCQApATAXAUQAYAUAKASQAKASAAAMQAAAMgIAEQgDABgDAAQgGAAgHgEg");
	this.shape_72.setTransform(904.0012,456);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#333333").s().p("ABjCWQgVgPgOgQQgVASgbAOQgaAPgiAKIgDgGQAfgMAXgSQAZgSATgUQgNgUgIgTQgIgUgFgUQgQAogXAhQgZAjgjAZIgFgEQAbgaATghQAUgiANgmQANgmAIgoIgeAAIgNAPIgfgWIAHgEIAIgEIAFgbIAFgeIADgYIAoANQgBADgDACQgDACgGgBIgDAVIgFAXIgEAWIAhAAIAIg1IAFg2IAuAHQgBAEgDADQgEACgGABIgGAtIgJAtIBRAAIASgXIAGAFIANALIAOAMQgBADgCACQgDABgEAAIh8AAIgGAVIgFAVIBKAAIASgSIAgAcQgDACgDABQgDACgHAAQgJAbgOAaQgOAagUAUQARAOAXAMQAXAMAdAKIAAAEQgMACgHAFQgHAGgCAMQgbgLgVgPgAAZACIgCAHQAFAUAKATQAKASARASQAdgoANgwIhPAAIgDAGgAiJCiQgCgFgDgEQgEgEgIgDQgHgDgNgCIAAgFIAGAAIANABIAPABIALABQAFAAACgCQABgDAAgDIAAhkIgPAKIgQAJIgDAHIgFAEIgQgkIAXgIIAggMIAAhSIgyAAIgDgMIA1AAIAAhUIArAFQAAAEgEACQgDADgHABIAABFIABAAIAQgVIAFAFIAKAKIANALQgBADgDACQgCACgEAAIgjAAIAABIIAYgJIAXgKIACAEIgWAQIgbARIAAB5QABAMgDAJQgDAIgJAFQgKAGgTACQAAgHgCgHgAB0hkQgDgPgJgQQgJgPgKgMIAFgDQAdALANANQAMANgBAMQAAALgIAFQgDABgEAAQgFAAgHgFg");
	this.shape_73.setTransform(864.175,455.75);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#333333").s().p("AAuCwIAAhQIhdAAIgDgLIBgAAIAAgxIgwAAIAAAMQAAACgGADQgGADgLAAIgEAAIAAioIAfANIBNAAIAQgjIARgpIApASQgBADgEACQgDACgHgBIgWAcQgMANgNALIAdAAIAOgQIAeAXIgFAEIgKADIAAB9QAAACgHADQgGADgKAAIgFAAIAAgMIgwAAIAAAxIAyAAIATgYIAGAEIAOAMIAOANQgBADgCABQgDACgEAAIhdAAIAABHQAAACgGADQgGADgKABgABJAZIAwAAIAAgzIgwAAgAgCAZIAwAAIAAgzIgwAAgABJglIAwAAIAAgyIgwAAgAgCglIAwAAIAAgyIgwAAgAiACjQgBgFgEgCQgEgEgIgCIgRgFIAAgGIAPABIAQACIAMAAIAIgBIAFgDQAIgGAGgdQAGgcAEgwIg0AAIgMANIgdgUIAGgFIAIgDIADgbIADgfIACgaIAhANIAkAAIAAhGIhTAAIgDgLIBSAAIAPgQIAhAZQgCACgEACIgKAEIAABUQAAABgEACIgKADIgKABIgEAAIAAgQIgsAAIgDAhIgEAfIAxAAIAQgQIAfAZIgGADIgKACQgDA5gIAhQgIAggNALQgIAGgKADQgKADgMAAIgBgMgAAPhtQgCgKgGgLIgLgVQgHgKgHgHIAEgDQAdAKANAOQANANAAALQABAMgIAFQgDABgDAAQgGAAgHgEg");
	this.shape_74.setTransform(824.325,455.875);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#333333").s().p("AipCoIgDgKICeAAIAAhGIh3AAIgDgLIB6AAIAAg1IAsAEQgBAEgDADQgDADgHABIAAAmIBHAAIAUgZIAGAFIAPALIAPAOQgBADgDABQgCACgEAAIh1AAIAABGIBmAAIAUgaIAHAFIAPAMIAQAOQgBADgDABQgDABgEAAgAivAoQASgPALgQQALgQAFgRQAGgRABgSIguAAIgDgKIAyAAIAAgJIAAgJIAAguIgmAAIgDgLICOAAIASgXIAFAFIANALIAOAMQgBADgCACIgGABIgqAAIAABAIAIAAIASgZIAFAFIANAMIAOANQAAADgDABIgHABIgwAAIAABZQAAACgGADQgHADgLABIgFAAIAAhiIgrAAQgCATgIATQgHATgQAQQgQARgcAOgAhdhXIAAAJIAAAJIAqAAIAAhAIgqAAgAByAgQgBgFgEgEQgDgEgHgCQgGgDgKgBIAAgGIAFAAIALABIANABIAIABQAEAAACgCQABgCAAgDIAAiqIArAEQgBAEgDADQgDACgGABIAACeQAAALgDAIQgDAIgIAFQgJAFgSACIgCgMgAAugHIAAiPIApAFQAAADgDADQgDADgHABIAAB3QAAADgHACQgHADgJABg");
	this.shape_75.setTransform(784.325,455.525);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#333333").s().p("ABUB/QgagbgPgeQgQgdgJgeQgJgegEgdQgDAigKAeQgKAfgUAdQgTAbghAaQghAZgxAVIgFgHQApgWAcgZQAbgaARgcQARgbAJgeQAJgdADggIiQAAIgDgLICUAAQACgaABgcIAAg6IAuAFQgBAFgDACQgCADgHABIgBAwQgBAYgCAYIBmAAIAXgdIAHAGIARAOIARAOQAAADgDACQgDABgEAAIiXAAQAGAkASAjQASAjAjAfQAiAhA3AZIgBADQgMACgIAHQgHAGgDANQgmgWgZgag");
	this.shape_76.setTransform(744.625,455.95);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#333333").s().p("AhsCvIAAicQgNAZgQAWQgQAVgVAUIgGgFQAYggAPgmQAQgmAJgpIg1AAIgDgMIBAAAIAAg/IghAIIgfAGIgCgGQAVgIAXgKQAWgKAUgLQAUgLANgKIAlAeQgDACgFAAQgFABgHgDIgTAIIgWAHIAABGIAQAAIARgXIAIAHIAQAPIAAgsIAdANIAvAAIAAhMIAuAFQgBAFgDADQgEAEgJAAIAAA7IAxAAIAPgQIAhAZIgFAEIgKAEIAACGQAAABgFACQgEADgFABQgGACgFAAIgFAAIAAgZIg0AAIAAB2QAAAEgHADQgHAEgJAAIgGAAIAAiBIgwAAIAAAUQgBADgGAEQgHADgKAAIgEAAIAAgfQgBAKgHACQgIADgJgGQgDgOgJgPQgJgQgLgLIAACpQAAADgHADQgHAEgKAAgAhPgMQAfAMAMANQANAOABALIAAhVIgCAAIg3AAgABTAhIA0AAIAAhxIg0AAgAAGAhIAwAAIAAhxIgwAAg");
	this.shape_77.setTransform(704.4,455.9);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#333333").s().p("AipAYIgFgMIETAAIAagjIAIAHIATAQIAVASQgBADgEACQgDABgEAAg");
	this.shape_78.setTransform(664.65,452.95);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#333333").s().p("AiwCoQAagSARgYQARgYAKgaQAKgaAEgZIAuAKQgBAEgEACQgDACgGAAIgHAUIgJAUQALAVAPAMQAQALAVAFIAAh9IicAAIgDgKIEiAAIAUgaIAGAFIAPAMIAPAMQgBAEgCABQgDACgEAAIiSAAIAAA0IBCAAIAUgbIAHAGIAOAMIAQAOQgBADgCACQgDABgEAAIhxAAIAABCIAQABIARAAIAcAAIAjAAIAjAAIAcgBIAAAGQgHABgFAGQgEAHAAAIIhvAAQgiABgYgGQgZgGgSgQQgSgQgMgeQgOAYgWAVQgWAVgiAQgAhqgQIAAiYIAhAOICVAAIAQgSIAjAbQgCADgEACIgKADIAABsIgFADIgKAEIgLACIgGAAIAAgSIiaAAIAAAMQgBACgIAEQgIAEgJAAgAhLgxICaAAIAAgqIiaAAgAhLhmICaAAIAAgoIiaAAg");
	this.shape_79.setTransform(624.575,456.125);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#333333").s().p("AANCtQgHgCgHgGIAWgbIAWgdIATgaIi1AAIgCgLIC8AAIAQgQIAeAcQgDADgFABIgLACIgTAZIgYAfIgYAcIgDABIgLgCgAi0A9QAYgIAYgLQAYgLAWgOQAVgNARgMQAQgOAKgMIiVAAIgCgMIBHAAIAAgqIgyAAIgCgLIA0AAIAAgpIg4AAIgDgLIBoAAIASgXIAFAFIAOAKIANANQAAADgCABQgDACgEAAIg5AAIAAApIASAAIAQgVIAFAFIAMAJIAMAMQgBADgBACIgHABIg2AAIAAAqIAXAAIARgVIAFAEIAOAKIANANQAAACgDACIAkAIQgBADgFACQgDACgIAAQASAMAcAJQAbAJAgAHQAfAHAdACIAAAHQgKADgHAIQgHAIgCAIQgegHgbgLQgcgMgYgPQgWgOgPgRQgSARgeAPQgdARglANQgjANglAIgAABA+QgCgMgJgMQgIgMgKgIIAEgCQAbAFAMAJQANAKgBAKQAAAKgIAEQgDACgDAAQgGAAgGgEgAAGgiIgDgMIA4AAIAAgqIgvAAIgEgLIAzAAIAAgpIg4AAIgDgLIByAAIASgXIAGAFIANAKIAPANQAAADgEABQgCACgEAAIhEAAIAAApIAVAAIARgWIAFAEIAMALIAOALQgBAEgDABQgCACgEAAIg7AAIAAAqIAhAAIASgXIAGAFIAOALIAPAMQgCAEgCABQgDACgEAAg");
	this.shape_80.setTransform(584.8,456.205);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#333333").s().p("AioCnIgDgLIDEAAQAHgNAFgPIAKgfIAJgdIAtANQgBADgDACQgEACgGAAQgJAQgNASQgPASgPAQIBQAAIAUgZIAHAFIAOALIAQAOQgBADgCACQgDABgEAAgAg3CUQgCgMgFgOQgFgOgHgNQgHgNgHgKIAEgCQAgAQAMARQANARAAANQgBAOgHAFQgEACgDAAQgGAAgHgGgAiIA+IgEgLICOAAIgDgBIgFgDQgCgMgGgMQgHgMgHgIIAEgDQAaAIAKALQAKAMgCAJQgDAJgIACIBOAAIAUgXIAFAEIAPAMIAPAMQgBADgDACQgCABgEAAgAhOAYIAAi+IArAEQgBAEgDACQgDADgGABIAACnQAAABAAAAQAAAAgBABQAAAAgBABQgBAAgBABIgJAEQgFABgGAAgABggKQgWgLgSgPQgSAMgWAKQgWAJgbAFIgCgEQAXgJATgLQATgLARgOQgQgQgNgUQgNgVgHgZIgWAAIgDgLICGAAIATgRIAfAbQgCADgEABIgKABQgLAWgOATQgOASgTAQQAUALAWAIQAWAIAZAFIgBAEQgJACgGAGQgHAHgDAJQgYgIgWgKgAAaheQAPARASANQAPgPALgQQALgRAHgTIhmAAQAKAVAPAQgAiQAIIAAiUIAoAEQAAAEgCACQgDADgHABIAAB+QAAABgEACIgJADIgLACg");
	this.shape_81.setTransform(544.8,455.125);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#333333").s().p("AAhFKQgYgGgagTIAkgvIAlg0IAgguIktAAIgHgTIE5AAIAvgwIBVBNQgFAFgIADQgIADgNACIghAuQgTAbgVAbIgmAyIgLABQgRAAgTgEgAlQCGQA4gXA0ghQA0ggAoglQApgiAUggIj3AAIgGgUIB1AAIAAhQIhOAAIgFgTIBTAAIAAhRIhaAAIgFgUICyAAIArg2IAPALIAfAXIAiAcQgBAGgGACQgEADgIABIhaAAIAABRIAEAAIAmgzIAMAKIAaAYIAdAZQgCAFgFADQgEADgIAAIhaAAIAABQIABAAIApg0IAMAKIAbAVIAeAaIgBgFIBXAAIAAhTIhHAAIgFgUIBMAAIAAhNIhTAAIgFgUIDDAAIAsg4IAOALIAhAYIAjAdQgCAGgFACQgFADgHABIhzAAIAABNIAKAAIAng1IANAKIAcAYIAeAbQgBAGgFADQgEADgJAAIhlAAIAABTIASAAIAtg5IAOAKIAgAaIAkAeQgCAFgGADQgEACgIABIkdAAIAzAMQgCAIgIADQgIAEgTACQAaAOAlALQAmAJApAGQAqAGApADQApABAjgCIAAAMQgUAIgNAPQgOAPgIATQgIAUgBASQg1gLgvgVQgwgWgmgeQglgdgYgiQgMAMgOAMIgjAYQAzAEAZAPQAZAPADATQACAUgMAOQgMAQgVADQgVADgWgQQgBgYgIgVQgJgXgOgRQgmAXgvAVQgvAUgyAQQgzAQgzAJg");
	this.shape_82.setTransform(557.3,292.75);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#333333").s().p("Ak8E5IgGgUIFsAAQAJgbAHgeQAHgeAGgeQAGgeAEgZICBAhQgCAGgHAFQgFAEgNgBQgUAcggAiQgfAhgjAeIB4AAIAyg/IAPAMIAkAcIAmAgQgDAFgFADQgEADgIAAgAiFESQgEgogOgmQgOglgQggIAFgDQBAARAhAaQAfAaAGAcQAFAbgMATQgMAUgXAEIgGAAQgUAAgXgRgAkKB0IgFgTID+AAIgLgFIgLgJQACgWgGgWQgFgWgHgQIAFgDQAvAHAXANQAXAOAFAQQAGAQgIANQgHANgRAHIByAAIAug6IAPALIAjAbIAlAcQgDAGgEADQgGACgHAAgAiZAxIAAlpIB4ALQgBAGgFAEQgFAFgMACIAAE0QAAAEgNAGQgMAGgRAEQgTAEgSABgACkgEQglgUgdgZQggAOgkALQgiALgpAJIgDgJQAigOAbgRQAcgSAYgUQgZgdgTgoQgTgngMgzIgjAAIgHgUIDaAAIAzgxIBUBIQgDAFgGADQgGACgLABQgQAlgZAgQgYAgggAaQAhALAkAIQAkAHAlAGIAAAIQgeAIgTAWQgUAYgIAjQgrgQgkgRgAAviwQAcAcAkATQATgYAPgdQAPgcAJgfIioAAQATAlAbAcgAkdAbIAAkpIB1AJQAAAIgGAEQgEAFgNACIAAD3QAAAEgMAEQgLAFgSAEQgSAEgSABg");
	this.shape_83.setTransform(487.65,290.7);

	this.instance = new lib.笙111();
	this.instance.setTransform(1313,155,0.2892,0.2892);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7}]}).wait(1005));

	// bg
	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#FFFFFF").s().p("EiLsBMwQhvAAhQhPQhPhPAAhwMAAAiRDQAAhwBPhPQBQhPBvAAMEXZAAAQBvAABPBPQBQBPAABwMAAACRDQAABwhQBPQhPBPhvAAg");
	this.shape_84.setTransform(959.9897,540.0003,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_84).wait(1005));

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
		{src:"images/竖琴_atlas_P_1.png?1690279227318", id:"竖琴_atlas_P_1"},
		{src:"sounds/yx511701a竖琴演奏示范mp3复制.mp3?1690279227345", id:"yx511701a竖琴演奏示范mp3复制"}
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