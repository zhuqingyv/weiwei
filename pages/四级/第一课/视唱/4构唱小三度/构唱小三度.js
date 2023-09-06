(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"构唱小三度_atlas_P_1", frames: [[0,793,1400,243],[0,535,1400,256],[0,268,1400,265],[0,0,1400,266]]}
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



(lib.yp430102 = function() {
	this.initialize(ss["构唱小三度_atlas_P_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.yp430103 = function() {
	this.initialize(ss["构唱小三度_atlas_P_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.yp430105 = function() {
	this.initialize(ss["构唱小三度_atlas_P_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.yp430106 = function() {
	this.initialize(ss["构唱小三度_atlas_P_1"]);
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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("AAXB1IAAhCIhmAAIAAgQIBjiXIAcAAIAACTIAgAAIAAAUIggAAIAABCgAAOhFIgJARIg4BTIBKAAIAAhLIAAgNIABgQIABgMIgCAAIgJAQg");
	this.shape.setTransform(100.775,24.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AgiCLIAAiLICoAAIAACKIgWAAIAAgLIh9AAIAAAMgAgNBsIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBVIAAjOIBPAAIAACwIg8AAIAAAegAhxAiIAoAAIAAiHIgoAAgAgYgWIAAh0ICRAAIAAB0gAgEgoIBpAAIAAggIhpAAgAgEhYIBpAAIAAghIhpAAg");
	this.shape_1.setTransform(76.25,24.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AA6CRQAAgFgCgGQgBgFgDgFIAYABIAPAAIAHgBQADgBACgCQAEgFACgMQADgMADgXIAEg5IADhVIhyAAIgNAdQgIAOgIALIgIgHIgKgGQAMgOAJgSQAKgSAHgUQAHgVAFgWIAUAFIgHAYIgIAYIB/AAIAAACIAAAFIAAAEIgEBeQgBAngDAZQgCAYgDANQgEANgEAGQgFAGgFADQgGACgHACIgSAAIgXgBgAhYCSIAAiiQgGASgHASIgOAhQgIAPgHALIgGgKIgGgKQAKgNAKgVQAKgUAIgWQAIgYAGgWIgvAAIAAgVIAxAAIAAg9IAUAAIAAA9IAmAAIAAAVIgmAAIAAAQIAJAMIAMARIALARIAHAKIgOAQIgGgNIgJgQIgKgRIAACngABLBEIgEgMIgsAIIgZAFIgMAEIgGADIgCgKIgEgKQADgBAEgEIAHgNIAIgUQAGgOAGgQQAHgTAEgSIAVAFQgIAagKAYQgKAYgMAUIA9gKIgIgVIgJgTIAQgFIAMAaIALAcIAIAWIgRAHIgDgKg");
	this.shape_2.setTransform(43.725,24.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_3.setTransform(23.85,34.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("AAXB1IAAhCIhmAAIAAgQIBjiXIAcAAIAACTIAgAAIAAAUIggAAIAABCgAAOhFIgJARIg4BTIBKAAIAAhLIAAgNIABgQIABgMIgCAAIgJAQg");
	this.shape_4.setTransform(10.575,24.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(105,175,75,0.4)").s().p("AAXB1IAAhCIhmAAIAAgQIBjiXIAcAAIAACTIAgAAIAAAUIggAAIAABCgAAOhFIgJARIg4BTIBKAAIAAhLIAAgNIABgQIABgMIgCAAIgJAQg");
	this.shape_5.setTransform(100.775,24.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(105,175,75,0.4)").s().p("AgiCLIAAiLICoAAIAACKIgWAAIAAgLIh9AAIAAAMgAgNBsIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBVIAAjOIBPAAIAACwIg8AAIAAAegAhxAiIAoAAIAAiHIgoAAgAgYgWIAAh0ICRAAIAAB0gAgEgoIBpAAIAAggIhpAAgAgEhYIBpAAIAAghIhpAAg");
	this.shape_6.setTransform(76.25,24.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(105,175,75,0.4)").s().p("AA6CRQAAgFgCgGQgBgFgDgFIAYABIAPAAIAHgBQADgBACgCQAEgFACgMQADgMADgXIAEg5IADhVIhyAAIgNAdQgIAOgIALIgIgHIgKgGQAMgOAJgSQAKgSAHgUQAHgVAFgWIAUAFIgHAYIgIAYIB/AAIAAACIAAAFIAAAEIgEBeQgBAngDAZQgCAYgDANQgEANgEAGQgFAGgFADQgGACgHACIgSAAIgXgBgAhYCSIAAiiQgGASgHASIgOAhQgIAPgHALIgGgKIgGgKQAKgNAKgVQAKgUAIgWQAIgYAGgWIgvAAIAAgVIAxAAIAAg9IAUAAIAAA9IAmAAIAAAVIgmAAIAAAQIAJAMIAMARIALARIAHAKIgOAQIgGgNIgJgQIgKgRIAACngABLBEIgEgMIgsAIIgZAFIgMAEIgGADIgCgKIgEgKQADgBAEgEIAHgNIAIgUQAGgOAGgQQAHgTAEgSIAVAFQgIAagKAYQgKAYgMAUIA9gKIgIgVIgJgTIAQgFIAMAaIALAcIAIAWIgRAHIgDgKg");
	this.shape_7.setTransform(43.725,24.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(105,175,75,0.4)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_8.setTransform(23.85,34.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(105,175,75,0.4)").s().p("AAXB1IAAhCIhmAAIAAgQIBjiXIAcAAIAACTIAgAAIAAAUIggAAIAABCgAAOhFIgJARIg4BTIBKAAIAAhLIAAgNIABgQIABgMIgCAAIgJAQg");
	this.shape_9.setTransform(10.575,24.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).wait(3));

	// 图层_2
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_10.setTransform(121.675,22.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-4.8,240.1,55.199999999999996);


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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("AgfB1QgOgFgKgHQgKgHgIgJIANgQQALALAOAHQAOAIAVABQANAAALgGQALgFAGgKQAHgLAAgOQAAgOgIgLQgHgLgQgGQgQgGgaAAIAAgUQAYAAANgGQAPgGAGgLQAGgKAAgNQAAgSgKgKQgMgLgRAAQgPAAgMAGQgNAHgKAKIgPgRQANgMARgHQAPgIAUAAQASAAAPAHQAQAGAIANQAIANABATQAAAWgLAOQgMAOgTAHIAAABQAOADALAHQAMAIAGAMQAHANAAAQQAAAVgKAPQgJAPgRAIQgRAHgUAAQgSAAgOgEg");
	this.shape.setTransform(100.55,24.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AgiCLIAAiLICoAAIAACKIgWAAIAAgLIh9AAIAAAMgAgNBsIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBVIAAjOIBPAAIAACwIg8AAIAAAegAhxAiIAoAAIAAiHIgoAAgAgYgWIAAh0ICRAAIAAB0gAgEgoIBpAAIAAggIhpAAgAgEhYIBpAAIAAghIhpAAg");
	this.shape_1.setTransform(76.25,24.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AA6CRQAAgFgCgGQgBgFgDgFIAYABIAPAAIAHgBQADgBACgCQAEgFACgMQADgMADgXIAEg5IADhVIhyAAIgNAdQgIAOgIALIgIgHIgKgGQAMgOAJgSQAKgSAHgUQAHgVAFgWIAUAFIgHAYIgIAYIB/AAIAAACIAAAFIAAAEIgEBeQgBAngDAZQgCAYgDANQgEANgEAGQgFAGgFADQgGACgHACIgSAAIgXgBgAhYCSIAAiiQgGASgHASIgOAhQgIAPgHALIgGgKIgGgKQAKgNAKgVQAKgUAIgWQAIgYAGgWIgvAAIAAgVIAxAAIAAg9IAUAAIAAA9IAmAAIAAAVIgmAAIAAAQIAJAMIAMARIALARIAHAKIgOAQIgGgNIgJgQIgKgRIAACngABLBEIgEgMIgsAIIgZAFIgMAEIgGADIgCgKIgEgKQADgBAEgEIAHgNIAIgUQAGgOAGgQQAHgTAEgSIAVAFQgIAagKAYQgKAYgMAUIA9gKIgIgVIgJgTIAQgFIAMAaIALAcIAIAWIgRAHIgDgKg");
	this.shape_2.setTransform(43.725,24.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_3.setTransform(23.85,34.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("AgfB1QgOgFgKgHQgLgHgHgJIAOgQQAKALAOAHQAOAIAUABQAOAAALgGQALgFAGgKQAHgLAAgOQAAgOgIgLQgHgLgQgGQgQgGgaAAIAAgUQAYAAAOgGQAOgGAGgLQAGgKABgNQgBgSgKgKQgLgLgTAAQgOAAgNAGQgMAHgKAKIgPgRQANgMAQgHQARgIATAAQATAAAOAHQAQAGAIANQAIANABATQgBAWgKAOQgMAOgTAHIAAABQAOADALAHQAMAIAGAMQAHANAAAQQAAAVgKAPQgKAPgQAIQgRAHgUAAQgSAAgOgEg");
	this.shape_4.setTransform(10.35,24.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(105,175,75,0.4)").s().p("AgfB1QgOgFgKgHQgKgHgIgJIANgQQALALAOAHQAOAIAVABQANAAALgGQALgFAGgKQAHgLAAgOQAAgOgIgLQgHgLgQgGQgQgGgaAAIAAgUQAYAAANgGQAPgGAGgLQAGgKAAgNQAAgSgKgKQgMgLgRAAQgPAAgMAGQgNAHgKAKIgPgRQANgMARgHQAPgIAUAAQASAAAPAHQAQAGAIANQAIANABATQAAAWgLAOQgMAOgTAHIAAABQAOADALAHQAMAIAGAMQAHANAAAQQAAAVgKAPQgJAPgRAIQgRAHgUAAQgSAAgOgEg");
	this.shape_5.setTransform(100.55,24.625);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(105,175,75,0.4)").s().p("AgiCLIAAiLICoAAIAACKIgWAAIAAgLIh9AAIAAAMgAgNBsIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBVIAAjOIBPAAIAACwIg8AAIAAAegAhxAiIAoAAIAAiHIgoAAgAgYgWIAAh0ICRAAIAAB0gAgEgoIBpAAIAAggIhpAAgAgEhYIBpAAIAAghIhpAAg");
	this.shape_6.setTransform(76.25,24.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(105,175,75,0.4)").s().p("AA6CRQAAgFgCgGQgBgFgDgFIAYABIAPAAIAHgBQADgBACgCQAEgFACgMQADgMADgXIAEg5IADhVIhyAAIgNAdQgIAOgIALIgIgHIgKgGQAMgOAJgSQAKgSAHgUQAHgVAFgWIAUAFIgHAYIgIAYIB/AAIAAACIAAAFIAAAEIgEBeQgBAngDAZQgCAYgDANQgEANgEAGQgFAGgFADQgGACgHACIgSAAIgXgBgAhYCSIAAiiQgGASgHASIgOAhQgIAPgHALIgGgKIgGgKQAKgNAKgVQAKgUAIgWQAIgYAGgWIgvAAIAAgVIAxAAIAAg9IAUAAIAAA9IAmAAIAAAVIgmAAIAAAQIAJAMIAMARIALARIAHAKIgOAQIgGgNIgJgQIgKgRIAACngABLBEIgEgMIgsAIIgZAFIgMAEIgGADIgCgKIgEgKQADgBAEgEIAHgNIAIgUQAGgOAGgQQAHgTAEgSIAVAFQgIAagKAYQgKAYgMAUIA9gKIgIgVIgJgTIAQgFIAMAaIALAcIAIAWIgRAHIgDgKg");
	this.shape_7.setTransform(43.725,24.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(105,175,75,0.4)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_8.setTransform(23.85,34.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(105,175,75,0.4)").s().p("AgfB1QgOgFgKgHQgLgHgHgJIAOgQQAKALAOAHQAOAIAUABQAOAAALgGQALgFAGgKQAHgLAAgOQAAgOgIgLQgHgLgQgGQgQgGgaAAIAAgUQAYAAAOgGQAOgGAGgLQAGgKABgNQgBgSgKgKQgLgLgTAAQgOAAgNAGQgMAHgKAKIgPgRQANgMAQgHQARgIATAAQATAAAOAHQAQAGAIANQAIANABATQgBAWgKAOQgMAOgTAHIAAABQAOADALAHQAMAIAGAMQAHANAAAQQAAAVgKAPQgKAPgQAIQgRAHgUAAQgSAAgOgEg");
	this.shape_9.setTransform(10.35,24.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).wait(3));

	// 图层_2
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_10.setTransform(122.925,18.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-9,241.4,57);


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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape.setTransform(100.825,24.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AgiCLIAAiLICoAAIAACKIgWAAIAAgLIh9AAIAAAMgAgNBsIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBVIAAjOIBPAAIAACwIg8AAIAAAegAhxAiIAoAAIAAiHIgoAAgAgYgWIAAh0ICRAAIAAB0gAgEgoIBpAAIAAggIhpAAgAgEhYIBpAAIAAghIhpAAg");
	this.shape_1.setTransform(76.25,24.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AA6CRQAAgFgCgGQgBgFgDgFIAYABIAPAAIAHgBQADgBACgCQAEgFACgMQADgMADgXIAEg5IADhVIhyAAIgNAdQgIAOgIALIgIgHIgKgGQAMgOAJgSQAKgSAHgUQAHgVAFgWIAUAFIgHAYIgIAYIB/AAIAAACIAAAFIAAAEIgEBeQgBAngDAZQgCAYgDANQgEANgEAGQgFAGgFADQgGACgHACIgSAAIgXgBgAhYCSIAAiiQgGASgHASIgOAhQgIAPgHALIgGgKIgGgKQAKgNAKgVQAKgUAIgWQAIgYAGgWIgvAAIAAgVIAxAAIAAg9IAUAAIAAA9IAmAAIAAAVIgmAAIAAAQIAJAMIAMARIALARIAHAKIgOAQIgGgNIgJgQIgKgRIAACngABLBEIgEgMIgsAIIgZAFIgMAEIgGADIgCgKIgEgKQADgBAEgEIAHgNIAIgUQAGgOAGgQQAHgTAEgSIAVAFQgIAagKAYQgKAYgMAUIA9gKIgIgVIgJgTIAQgFIAMAaIALAcIAIAWIgRAHIgDgKg");
	this.shape_2.setTransform(43.725,24.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_3.setTransform(23.85,34.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_4.setTransform(10.625,24.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(105,175,75,0.4)").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_5.setTransform(100.825,24.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(105,175,75,0.4)").s().p("AgiCLIAAiLICoAAIAACKIgWAAIAAgLIh9AAIAAAMgAgNBsIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBVIAAjOIBPAAIAACwIg8AAIAAAegAhxAiIAoAAIAAiHIgoAAgAgYgWIAAh0ICRAAIAAB0gAgEgoIBpAAIAAggIhpAAgAgEhYIBpAAIAAghIhpAAg");
	this.shape_6.setTransform(76.25,24.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(105,175,75,0.4)").s().p("AA6CRQAAgFgCgGQgBgFgDgFIAYABIAPAAIAHgBQADgBACgCQAEgFACgMQADgMADgXIAEg5IADhVIhyAAIgNAdQgIAOgIALIgIgHIgKgGQAMgOAJgSQAKgSAHgUQAHgVAFgWIAUAFIgHAYIgIAYIB/AAIAAACIAAAFIAAAEIgEBeQgBAngDAZQgCAYgDANQgEANgEAGQgFAGgFADQgGACgHACIgSAAIgXgBgAhYCSIAAiiQgGASgHASIgOAhQgIAPgHALIgGgKIgGgKQAKgNAKgVQAKgUAIgWQAIgYAGgWIgvAAIAAgVIAxAAIAAg9IAUAAIAAA9IAmAAIAAAVIgmAAIAAAQIAJAMIAMARIALARIAHAKIgOAQIgGgNIgJgQIgKgRIAACngABLBEIgEgMIgsAIIgZAFIgMAEIgGADIgCgKIgEgKQADgBAEgEIAHgNIAIgUQAGgOAGgQQAHgTAEgSIAVAFQgIAagKAYQgKAYgMAUIA9gKIgIgVIgJgTIAQgFIAMAaIALAcIAIAWIgRAHIgDgKg");
	this.shape_7.setTransform(43.725,24.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(105,175,75,0.4)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_8.setTransform(23.85,34.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(105,175,75,0.4)").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_9.setTransform(10.625,24.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).wait(3));

	// 图层_2
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_10.setTransform(121.675,22.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-4.8,240.1,55.199999999999996);


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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAJgFIATAAIAADUIAwAAIAAAVg");
	this.shape.setTransform(101.35,24.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AgiCLIAAiLICoAAIAACKIgWAAIAAgLIh9AAIAAAMgAgNBsIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBVIAAjOIBPAAIAACwIg8AAIAAAegAhxAiIAoAAIAAiHIgoAAgAgYgWIAAh0ICRAAIAAB0gAgEgoIBpAAIAAggIhpAAgAgEhYIBpAAIAAghIhpAAg");
	this.shape_1.setTransform(76.25,24.85);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AA6CRQAAgFgCgGQgBgFgDgFIAYABIAPAAIAHgBQADgBACgCQAEgFACgMQADgMADgXIAEg5IADhVIhyAAIgNAdQgIAOgIALIgIgHIgKgGQAMgOAJgSQAKgSAHgUQAHgVAFgWIAUAFIgHAYIgIAYIB/AAIAAACIAAAFIAAAEIgEBeQgBAngDAZQgCAYgDANQgEANgEAGQgFAGgFADQgGACgHACIgSAAIgXgBgAhYCSIAAiiQgGASgHASIgOAhQgIAPgHALIgGgKIgGgKQAKgNAKgVQAKgUAIgWQAIgYAGgWIgvAAIAAgVIAxAAIAAg9IAUAAIAAA9IAmAAIAAAVIgmAAIAAAQIAJAMIAMARIALARIAHAKIgOAQIgGgNIgJgQIgKgRIAACngABLBEIgEgMIgsAIIgZAFIgMAEIgGADIgCgKIgEgKQADgBAEgEIAHgNIAIgUQAGgOAGgQQAHgTAEgSIAVAFQgIAagKAYQgKAYgMAUIA9gKIgIgVIgJgTIAQgFIAMAaIALAcIAIAWIgRAHIgDgKg");
	this.shape_2.setTransform(43.725,24.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_3.setTransform(23.85,34.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_4.setTransform(11.15,24.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(105,175,75,0.4)").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAJgFIATAAIAADUIAwAAIAAAVg");
	this.shape_5.setTransform(101.35,24.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(105,175,75,0.4)").s().p("AgiCLIAAiLICoAAIAACKIgWAAIAAgLIh9AAIAAAMgAgNBsIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBVIAAjOIBPAAIAACwIg8AAIAAAegAhxAiIAoAAIAAiHIgoAAgAgYgWIAAh0ICRAAIAAB0gAgEgoIBpAAIAAggIhpAAgAgEhYIBpAAIAAghIhpAAg");
	this.shape_6.setTransform(76.25,24.85);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(105,175,75,0.4)").s().p("AA6CRQAAgFgCgGQgBgFgDgFIAYABIAPAAIAHgBQADgBACgCQAEgFACgMQADgMADgXIAEg5IADhVIhyAAIgNAdQgIAOgIALIgIgHIgKgGQAMgOAJgSQAKgSAHgUQAHgVAFgWIAUAFIgHAYIgIAYIB/AAIAAACIAAAFIAAAEIgEBeQgBAngDAZQgCAYgDANQgEANgEAGQgFAGgFADQgGACgHACIgSAAIgXgBgAhYCSIAAiiQgGASgHASIgOAhQgIAPgHALIgGgKIgGgKQAKgNAKgVQAKgUAIgWQAIgYAGgWIgvAAIAAgVIAxAAIAAg9IAUAAIAAA9IAmAAIAAAVIgmAAIAAAQIAJAMIAMARIALARIAHAKIgOAQIgGgNIgJgQIgKgRIAACngABLBEIgEgMIgsAIIgZAFIgMAEIgGADIgCgKIgEgKQADgBAEgEIAHgNIAIgUQAGgOAGgQQAHgTAEgSIAVAFQgIAagKAYQgKAYgMAUIA9gKIgIgVIgJgTIAQgFIAMAaIALAcIAIAWIgRAHIgDgKg");
	this.shape_7.setTransform(43.725,24.2);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(105,175,75,0.4)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_8.setTransform(23.85,34.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(105,175,75,0.4)").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_9.setTransform(11.15,24.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).wait(3));

	// 图层_2
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_10.setTransform(122.925,18.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-9,241.4,57);


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
(lib.构唱小三度 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:8,m1:14,lnav2:216,m2:222,lnav3:409,m3:414,lnav4:617,m4:623};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,14,215,222,408,414,616,623,813];
	this.streamSoundSymbolsList[14] = [{id:"yx430103听一听31题目",startFrame:14,endFrame:222,loop:1,offset:0}];
	this.streamSoundSymbolsList[222] = [{id:"yx430104听一听32题目",startFrame:222,endFrame:409,loop:1,offset:0}];
	this.streamSoundSymbolsList[414] = [{id:"yx430105听一听33题目",startFrame:414,endFrame:616,loop:1,offset:0}];
	this.streamSoundSymbolsList[623] = [{id:"yx430106听一听34题目",startFrame:623,endFrame:814,loop:1,offset:0}];
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
		
		
		
		_this.m1_btn.on('click', function(){
		
		_this.gotoAndPlay('m1');
		});
		
		
		
		
		_this.m2_btn.on('click', function(){
		
		_this.gotoAndPlay('m2');
		});
		
		
		
		
		_this.m3_btn.on('click', function(){
		
		_this.gotoAndPlay('m3');
		});
		
		
		
		
		_this.m4_btn.on('click', function(){
		
		_this.gotoAndPlay('m4');
		});
	}
	this.frame_14 = function() {
		var soundInstance = playSound("yx430103听一听31题目",0);
		this.InsertIntoSoundStreamData(soundInstance,14,222,1);
		var _this = this;
		
		
		
		_this.m1stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav1');
			
		});
	}
	this.frame_215 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_222 = function() {
		var soundInstance = playSound("yx430104听一听32题目",0);
		this.InsertIntoSoundStreamData(soundInstance,222,409,1);
		var _this = this;
		
		
		
		_this.m2stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav2');
			
		});
	}
	this.frame_408 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav2');
	}
	this.frame_414 = function() {
		var soundInstance = playSound("yx430105听一听33题目",0);
		this.InsertIntoSoundStreamData(soundInstance,414,616,1);
		var _this = this;
		
		
		
		_this.m3stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav3');
			
		});
	}
	this.frame_616 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav3');
	}
	this.frame_623 = function() {
		var soundInstance = playSound("yx430106听一听34题目",0);
		this.InsertIntoSoundStreamData(soundInstance,623,814,1);
		var _this = this;
		
		
		
		_this.m4stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav4');
			
		});
	}
	this.frame_813 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav4');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(14).call(this.frame_14).wait(201).call(this.frame_215).wait(7).call(this.frame_222).wait(186).call(this.frame_408).wait(6).call(this.frame_414).wait(202).call(this.frame_616).wait(7).call(this.frame_623).wait(190).call(this.frame_813).wait(1));

	// leftnav_on
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#69AF4B").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgRQAPgDAMgEQALgDAKgGIASAAIAADUIAwAAIAAAVg");
	this.shape.setTransform(203.65,442.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#69AF4B").s().p("AgiCLIAAiLICnAAIAACJIgVAAIAAgLIh9AAIAAANgAgNBrIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBWIAAjOIBPAAIAACuIg8AAIAAAggAhxAiIAoAAIAAiHIgoAAgAgYgWIAAh0ICSAAIAAB0gAgDgnIBoAAIAAghIhoAAgAgDhZIBoAAIAAgfIhoAAg");
	this.shape_1.setTransform(178.55,442.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#69AF4B").s().p("AA6CRQAAgFgCgFQgBgGgDgFIAYACIAPAAIAHgBQADgBACgEQAEgDACgNQADgMADgWIAEg7IADhTIhyAAIgNAdQgIANgIALIgIgHIgKgGQAMgOAJgRQAKgTAHgVQAHgUAFgWIAUAFIgHAYIgIAYIB/AAIAAACIAAAFIAAAFIgEBdQgBAngDAYQgCAZgDANQgEAOgEAFQgFAGgFADQgGACgHABIgSABIgXgBgAhYCRIAAihQgGASgHARIgOAiQgIAPgHAMIgGgLIgGgKQAKgOAKgTQAKgVAIgWQAIgXAGgXIgvAAIAAgUIAxAAIAAg+IAUAAIAAA+IAmAAIAAAUIgmAAIAAAQIAJANIAMARIALAQIAHAKIgOAQIgGgNIgJgQIgKgRIAACmgABLBDIgEgMIgsAJIgZAGIgMADIgGACIgCgJIgEgKQADAAAEgFIAHgOIAIgTQAGgNAGgSQAHgSAEgTIAVAHQgIAZgKAYQgKAXgMAVIA9gLIgIgUIgJgTIAQgFIAMAaIALAbIAIAYIgRAHIgDgMg");
	this.shape_2.setTransform(146.025,442.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#69AF4B").s().p("AgNAPQgFgFgBgJQABgJAFgGQAGgFAHgBQAIABAGAFQAGAGgBAJQABAJgGAFQgGAGgIAAQgHAAgGgGg");
	this.shape_3.setTransform(126.15,452.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#69AF4B").s().p("Ag+B1IAAgVIA1AAIAAizIgqAAIAAgRQAPgDAMgEQAMgDAJgGIATAAIAADUIAvAAIAAAVg");
	this.shape_4.setTransform(113.45,442.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#69AF4B").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_5.setTransform(203.125,506.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#69AF4B").s().p("AgiCLIAAiLICnAAIAACKIgVAAIAAgMIh9AAIAAANgAgNBrIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBWIAAjOIBPAAIAACuIg8AAIAAAggAhxAiIAoAAIAAiHIgoAAgAgYgWIAAh0ICSAAIAAB0gAgDgnIBoAAIAAghIhoAAgAgDhZIBoAAIAAgfIhoAAg");
	this.shape_6.setTransform(178.55,506.6);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#69AF4B").s().p("AA6CRQAAgFgCgGQgBgFgDgFIAYABIAPAAIAHgBQADAAACgDQAEgFACgMQADgMADgWIAEg7IADhTIhyAAIgNAcQgIAOgIALIgIgHIgKgGQAMgOAJgRQAKgTAHgUQAHgVAFgWIAUAFIgHAYIgIAYIB/AAIAAACIAAAFIAAAEIgEBeQgBAngDAZQgCAYgDANQgEANgEAGQgFAGgFADQgGADgHAAIgSABIgXgBgAhYCRIAAihQgGASgHARIgOAiQgIAPgHALIgGgKIgGgKQAKgOAKgTQAKgVAIgWQAIgYAGgWIgvAAIAAgUIAxAAIAAg+IAUAAIAAA+IAmAAIAAAUIgmAAIAAAQIAJAMIAMARIALARIAHAKIgOAQIgGgNIgJgQIgKgRIAACmgABLBEIgEgNIgsAJIgZAGIgMADQgEABgCACIgCgKIgEgKQADgBAEgEIAHgOIAIgTQAGgNAGgRQAHgTAEgSIAVAFQgIAagKAYQgKAYgMAUIA9gKIgIgVIgJgTIAQgFIAMAaIALAcIAIAWIgRAIIgDgLg");
	this.shape_7.setTransform(146.025,505.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#69AF4B").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_8.setTransform(112.925,506.175);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#69AF4B").s().p("AgfB1QgOgFgKgHQgLgHgHgJIAOgQQAJALAPAHQAOAIAUABQAOAAALgGQALgFAHgKQAFgLABgOQAAgOgHgLQgIgLgQgGQgQgGgbAAIAAgUQAZAAAOgGQAOgGAGgLQAGgKABgNQgBgSgKgKQgLgLgTAAQgOAAgNAGQgMAHgKAKIgPgRQANgMAQgHQARgIATAAQATAAAOAHQAQAGAIANQAJANAAATQgBAWgLAOQgLAOgTAHIAAABQAOADALAHQAMAIAGAMQAHANAAAQQAAAVgKAPQgKAPgQAIQgRAHgVAAQgRAAgOgEg");
	this.shape_9.setTransform(202.85,575.525);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#69AF4B").s().p("AgiCLIAAiLICnAAIAACKIgVAAIAAgLIh9AAIAAAMgAgNBsIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBVIAAjOIBPAAIAACwIg8AAIAAAegAhxAjIAoAAIAAiIIgoAAgAgYgWIAAh0ICSAAIAAB0gAgDgoIBoAAIAAggIhoAAgAgDhYIBoAAIAAghIhoAAg");
	this.shape_10.setTransform(178.55,575.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#69AF4B").s().p("AA6CRQAAgFgCgGQgBgGgDgEIAYABIAPAAIAHgBQADgBACgCQAEgFACgMQADgMADgXIAEg5IADhVIhyAAIgNAeQgIANgIALIgIgGIgKgHQAMgOAJgSQAKgRAHgWQAHgUAFgWIAUAFIgHAYIgIAYIB/AAIAAACIAAAFIAAAEIgEBeQgBAngDAYQgCAZgDANQgEANgEAGQgFAGgFADQgGADgHABIgSAAIgXgBgAhYCSIAAiiQgGASgHASIgOAhQgIAPgHALIgGgKIgGgKQAKgNAKgVQAKgUAIgWQAIgXAGgXIgvAAIAAgVIAxAAIAAg9IAUAAIAAA9IAmAAIAAAVIgmAAIAAAQIAJANIAMAQIALARIAHAKIgOAQIgGgNIgJgQIgKgRIAACngABLBDIgEgLIgsAIIgZAFIgMAEIgGADIgCgKIgEgKQADgBAEgFIAHgMIAIgUQAGgOAGgRQAHgSAEgSIAVAGQgIAZgKAXQgKAYgMAVIA9gKIgIgVIgJgTIAQgFIAMAaIALAcIAIAWIgRAHIgDgLg");
	this.shape_11.setTransform(146.025,575.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#69AF4B").s().p("AgfB1QgOgFgKgHQgKgHgIgJIANgQQALALAOAHQAOAIAUABQAOAAALgGQALgFAHgKQAFgLABgOQAAgOgHgLQgIgLgQgGQgRgGgaAAIAAgUQAZAAAOgGQAOgGAGgLQAHgKAAgNQgBgSgLgKQgKgLgTAAQgOAAgNAGQgMAHgKAKIgOgRQANgMAPgHQARgIATAAQATAAAPAHQAOAGAJANQAJANAAATQAAAWgMAOQgLAOgTAHIAAABQAOADALAHQAMAIAGAMQAHANAAAQQAAAVgKAPQgJAPgSAIQgQAHgVAAQgRAAgOgEg");
	this.shape_12.setTransform(112.65,575.525);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#69AF4B").s().p("AAXB1IAAhCIhmAAIAAgQIBjiXIAcAAIAACTIAgAAIAAAUIggAAIAABCgAAOhFIgJARIg4BTIBKAAIAAhLIAAgOIABgOIABgOIgCAAIgJARg");
	this.shape_13.setTransform(203.075,639.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#69AF4B").s().p("AgiCLIAAiLICnAAIAACJIgVAAIAAgLIh9AAIAAANgAgNBsIB9AAIAAgkIh9AAgAgNA1IB9AAIAAgiIh9AAgAiEBVIAAjOIBPAAIAACvIg8AAIAAAfgAhxAjIAoAAIAAiIIgoAAgAgYgWIAAh0ICSAAIAAB0gAgDgoIBoAAIAAggIhoAAgAgDhYIBoAAIAAghIhoAAg");
	this.shape_14.setTransform(178.55,639.4);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#69AF4B").s().p("AA6CRQAAgFgCgFQgBgHgDgEIAYACIAPAAIAHgBQADgCACgDQAEgDACgNQADgMADgXIAEg6IADhTIhyAAIgNAdQgIANgIALIgIgGIgKgHQAMgOAJgRQAKgTAHgVQAHgUAFgWIAUAFIgHAYIgIAYIB/AAIAAACIAAAFIAAAFIgEBdQgBAngDAYQgCAZgDANQgEAOgEAFQgFAGgFADQgGACgHACIgSAAIgXgBgAhYCSIAAiiQgGASgHASIgOAhQgIAPgHAMIgGgLIgGgKQAKgOAKgTQAKgVAIgWQAIgYAGgWIgvAAIAAgVIAxAAIAAg9IAUAAIAAA9IAmAAIAAAVIgmAAIAAAQIAJANIAMARIALAQIAHAKIgOAQIgGgNIgJgQIgKgRIAACngABLBDIgEgLIgsAIIgZAFIgMAEIgGACIgCgJIgEgKQADAAAEgGIAHgMIAIgUQAGgNAGgSQAHgSAEgTIAVAHQgIAZgKAXQgKAYgMAVIA9gLIgIgUIgJgTIAQgFIAMAaIALAbIAIAYIgRAGIgDgLg");
	this.shape_15.setTransform(146.025,638.75);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#69AF4B").s().p("AAXB1IAAhCIhmAAIAAgQIBjiXIAcAAIAACTIAgAAIAAAUIggAAIAABCgAAOhFIgJARIg4BTIBKAAIAAhLIAAgOIABgOIABgOIgCAAIgJARg");
	this.shape_16.setTransform(112.875,639.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_4},{t:this.shape_3,p:{y:452.775}},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},8).to({state:[{t:this.shape_8},{t:this.shape_3,p:{y:516.425}},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},208).to({state:[{t:this.shape_12},{t:this.shape_3,p:{y:585.575}},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9}]},193).to({state:[{t:this.shape_16},{t:this.shape_3,p:{y:649.225}},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]},208).wait(197));

	// leftnav
	this.lnav4_btn = new lib.lnav4();
	this.lnav4_btn.name = "lnav4_btn";
	this.lnav4_btn.setTransform(149.5,638.55,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav4_btn, 0, 1, 2, false, new lib.lnav4(), 3);

	this.lnav3_btn = new lib.lnav3();
	this.lnav3_btn.name = "lnav3_btn";
	this.lnav3_btn.setTransform(149.5,574.9,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav3_btn, 0, 1, 2, false, new lib.lnav3(), 3);

	this.lnav2_btn = new lib.lnav2();
	this.lnav2_btn.name = "lnav2_btn";
	this.lnav2_btn.setTransform(149.5,505.75,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav2_btn, 0, 1, 2, false, new lib.lnav2(), 3);

	this.lnav1_btn = new lib.lnav1();
	this.lnav1_btn.name = "lnav1_btn";
	this.lnav1_btn.setTransform(149.5,442.1,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav1_btn, 0, 1, 2, false, new lib.lnav1(), 3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(153,153,153,0.498)").s().p("AAgBoIAAgxQgJALgNALQgMAKgNAHIgFgFIgGgFQAOgGAMgJQAMgJAIgKIAMAEIAAgrIgWACIgWABIgBgFIgDgGIAjgDIAigDIAbgFIANAKIgWAEIgZADIAAAYIAEAFIADAEIAUgNIARgMIAKAIIgTANIgVAMQAKAKANAHQAMAHAOAFQgDABgCAEIgEAGQgQgGgNgKQgOgKgLgMIAAA0gAhCBoIgNgBIgBgHIgDgGIANABIAJAAIAEgBIADgCQADgCACgJIAEgYIADgpIg3AAIADgYIADgdIACgcIANABIgCAXIgCAXIgCAWIAYAAIAEgbIACgeIADgeIg0AAIAAgOIBCAAIgCAiIgEAkIgDAfIAGAAIALAAIAAACIAAAEQgCAegCATQgCATgDAKQgCAKgEADIgGAFIgIACIgKAAgAhsAxIAagGIAegIIABANIgcAIIgaAHgAgSA0IgFgFIAVgMQAKgHAHgHIANAEQgJAJgLAIQgKAJgLAFIgFgEgAAZgFIAAgOIgaAEIgYADIgDgMIAOgCIAAhBIgLAAIAAgMIBGAAIAAAMIgIAAIAAA7IAIgBIAAALIgIABIAAAQgAgCgbIAbgEIAAgNIgbAAgAgCg2IAbAAIAAgOIgbAAgAgChOIAbAAIAAgNIgbAAgAAxgPIgFgFQAHgFAHgGQAHgHAGgJIgLgNIgLgMIAJgHIAKALIAKALIAHgPQADgHACgIIgmAAIAAgNIApAAIADAAIACAAIAIACQgDAPgFAMQgFANgGALIAMAOIAJAMIgKAJIgIgLIgKgNIgNAPQgHAGgIAFIgDgFg");
	this.shape_17.setTransform(189.925,374.775);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(153,153,153,0.498)").s().p("AhjBlIgFgIQBDgIArgYQAsgZAVgqIAPAHQgXAtguAbQgsAZhFALIgDgIgAgFA5IAAhLIhhAAIAAgQIAlAAIAAg2IAQAAIAAA2IAuAAIAAhJIAPAAIAAAaIBHAAIAAAPIhHAAIAAAgIBdAAIAAAQIheAAIAABLgAhYAyIgGgFQAOgLAMgOQANgOAJgNIAPAEQgKAQgOAQQgNAQgOALIgGgGg");
	this.shape_18.setTransform(166.075,374.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(153,153,153,0.498)").s().p("AgBBlIgHgFQAPgPAKgWQAJgVAEgZQAGgZAAgbIgiAAIAAgQIAjAAIABgZIAAgaIAQAAIgBAaIAAAZIA1AAIAAAJIgDA9IgDAqIgDAaQgDAJgDADQgEAFgEACIgJACIgOAAIgTgBIgCgHIgDgIIATABIANAAIAFAAIAEgDQADgEADgNIAEgoIADhEIgmAAQgCAdgEAbQgFAbgKAXQgKAXgSARIgEgGgAhjBGIgDgIQACgBADgEIAGgLIAFgPIAHgXIAIgaIgiAAIAAgPIBpAAIAAAPIg3AAQgFASgGAUIgOAkIA8gMIgHgUIgIgTIAOgDIAJAXIAJAYIAFAUIgNAFIgCgIIgDgJIgoAJIgYAFIgLAEIgGACIgCgHgAhghMIAAgOIBbAAIAAAOg");
	this.shape_19.setTransform(142.25,374.525);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(153,153,153,0.498)").s().p("AhqBiIAAgQICJAAIAEgTIACgVIhsAAIAHgbIAGgfIAGgiIAGgfIg0AAIAAgPIDGAAIAAAPIiBAAIgEATIgDAVIBVAAIADgBIAMABIgDAbIgEAgIgEAgIgFAgIA7AAIAAAQgAgsABIgGAaIBZAAIAEgcIADgZIhWAAIgEAbg");
	this.shape_20.setTransform(118.3,374.6);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#333333").s().p("AjoEpQBEgPA5gXQA6gXAvgfQgagYgUgeQgVgegPgnIgqAAIgFgRIDvAAIAzguIBNBHQgDAFgHACQgGADgMAAQghA0gxAnQAqAIAuAEQAuAEAuABIAAAIQgcAJgRAWQgSAXgGAjQg4gKgwgPQgwgQgogXQg4AbhFAQQhFAQhQAFgAgUCEQAbAUAkAPQApgmAZgvIizAAQAUAdAeAVgAkyEtQAcgyANg6QAMg5ADg8QADg8AAg4IAAjNIBrAkICMAAIgCgBQgHgagNgYQgPgXgQgQIAEgEQA0gEAeAKQAdAKALARQAKARgEAQQgFASgPAKIB4AAIAsg9IAPAMIAfAbIAiAdQgCAGgFACQgFADgGAAIm3AAIAACXQABApgEAuQgFAugNAvQgOAugeAqQgeArgzAigAhZAsIAAiFIg5AAIgGgSIA/AAIAAhGIBrAJQAAAFgEAFQgFAEgLACIAAAtIBSAAIAAhGIBsAJQgBAFgDAFQgFAEgLACIAAAtIAQAAIAlg7IALAMIAaAaIAbAdQgCAFgFADQgEACgHAAIhjAAIAABkQgBADgKAEQgLAEgRAEQgRADgQAAIgQAAIAAgQIhSAAIAAANQABACgLAFQgMAEgQAEQgQADgRAAgAgCgEIBSAAIAAhVIhSAAg");
	this.shape_21.setTransform(389.5,294.3929);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#333333").s().p("AkrEIIgFgSIHNAAIA1hDIARANIAmAdIAoAgQgBAGgGACQgFADgHAAgAjgAgIgFgSIE3AAIAzg+IAPALIAkAcIAnAfQgBAFgFACQgFADgIAAgAkKizIgFgSIGLAAIA0hCIARAMIAlAdIAoAgQgCAGgFADQgFACgHAAg");
	this.shape_22.setTransform(325.575,291.75);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#333333").s().p("AhLECQgFgQgKgMQgJgKgQgJQgPgHgfgGIAAgIIAOABIAgABIAkACIAYAAQAIAAADgCQADgDAAgGIAAnhIB4ALQgBAHgGAFQgFAFgMACIAAHKQABAggJAXQgJAWgbAOQgaANg2AFQgBgYgFgRgAksCtQAXgkATgrQAUgqAOguQAOgrAJgrQAKgsAEgkIB/AtQgCAGgFADQgGAEgMAAQgTAvgcAzQgdAygoAvQgoAwg2AlgADJCIQgFgwgPgxQgPgvgVguQgVgugZgpIAHgFQBHAkAqAoQArApATAnQAUAnAAAiQABAggOAVQgNAUgXABIgDABQgWAAgagWg");
	this.shape_23.setTransform(261.2759,294.95);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#333333").s().p("AhCEpIAAkzIBaAjICUAAIAogsIBUA/QgDAEgGAEQgHAEgLACIAADaQgBADgMAFQgNAEgRAFQgRAEgPAAIgQAAIAAgzIidAAIAAAXQgBAFgLAGQgKAHgRAFQgRAFgSAAgAAVDlICdAAIAAhXIidAAgAAVB8ICdAAIAAhRIidAAgAknC0IAAmwIBTAiIAhAAIAmgqIBOA8QgDAEgHAEIgQAFIAAEwQgBADgLAFQgLAFgQAEQgQAFgOAAIgOAAIAAg3IgrAAIAABEQAAAFgJAGQgKAHgPAFQgPAFgSAAgAjXBCIArAAIAAkKIgrAAgAgugEIAAkZIBXAhIBxAAIApgtIBVBBQgEAEgHAFQgHAEgMACIAAC4QgBACgMAEQgMAFgRAEQgRAEgPAAIgPAAIAAgmIh8AAIAAAVQAAAEgKAGQgLAGgQAFQgQAFgSABgAAlhGIB8AAIAAhIIh8AAgAAligIB8AAIAAhKIh8AAg");
	this.shape_24.setTransform(198.425,295);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#333333").s().p("AjVExIAAj3QgSAagWAXQgVAXgZAWIgIgHQAXgkAQgtQARgtALgwQAMgwAGgxIhMAAIgGgSIBbAAIAAigIBuAKQgBAIgFAFQgFAEgNACIAACAIAig0IAKAKIAYAVIAaAaQAKgmAIgqQAIgpAFgoIB1AfQgDAHgGAEQgGADgLAAQgIAVgJAUIgUAmICHAAIAugvIBLBCQgEAFgHADQgHAEgMACQgCBlgDBHQgEBJgGAwQgGAxgKAdQgKAdgOAOQgTATgXAIQgYAIghAAQAAgVgDgPQgDgPgIgJQgJgKgQgIQgQgIgXgFIABgIIAfADIAfACIAXAAQAIAAAGgCQAFgCAFgFQASgQAJhZQAIhaAEinIiZAAQgVAkgYAeQgZAdgdAXIgHgEIAOglIAMgpIgDAAIgEAAIhSAAIAAA5QAvAPAWAUQAWAVACATQADAVgLAOQgKAOgSABQgSACgTgRQABgYgGgXQgGgYgJgVIAAFJQgBAFgKAGQgKAGgQAFQgPAFgRAAgAgxBQIAIgEQAIgCAFgEQAJgOALgYQAJgZAJgcQAKgeAHgdQAHgdACgXIBoAsQgCAFgFADQgGADgJAAQgOAZgTAdQgUAcgWAbQgWAbgVAWIAugEIA1gFIgLgqIgMglIAGgCQAuAYAWAcQAWAbADAZQADAYgKAQQgJAQgRACQgRACgSgRIgBgWIgDgVQgTAMgZAOQgZAPgcAOIgGAKIgJAGg");
	this.shape_25.setTransform(133.275,294.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#CCCCCC").ss(1,1,1).p("A5IAAMAyRAAA");
	this.shape_26.setTransform(265.15,350.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.lnav1_btn},{t:this.lnav2_btn},{t:this.lnav3_btn},{t:this.lnav4_btn}]}).wait(814));

	// 标记
	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#E28623").ss(2,1,1).p("AVpkQIAAIhMgrRAAAIAAlY");
	this.shape_27.setTransform(1376.775,598.825);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#E28623").ss(2,1,1).p("AWlkQIAAIhMgtJAAAIAAlY");
	this.shape_28.setTransform(1373.05,587.775);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#E28623").ss(2,1,1).p("AV2kQIAAIhMgrrAAAIAAlY");
	this.shape_29.setTransform(1382.675,587.775);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_27,p:{x:1376.775,y:598.825}}]},8).to({state:[{t:this.shape_27,p:{x:1378.725,y:587.775}}]},208).to({state:[{t:this.shape_28}]},193).to({state:[{t:this.shape_29}]},208).wait(197));

	// 音频播放标
	this.m1_btn = new lib.音频播放标();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(465.2,668);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m1stop_btn = new lib.音频停止();
	this.m1stop_btn.name = "m1stop_btn";
	this.m1stop_btn.setTransform(471.05,663.85);
	new cjs.ButtonHelper(this.m1stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m2_btn = new lib.音频播放标();
	this.m2_btn.name = "m2_btn";
	this.m2_btn.setTransform(465.2,668);
	new cjs.ButtonHelper(this.m2_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m2stop_btn = new lib.音频停止();
	this.m2stop_btn.name = "m2stop_btn";
	this.m2stop_btn.setTransform(471.05,663.85);
	new cjs.ButtonHelper(this.m2stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m3_btn = new lib.音频播放标();
	this.m3_btn.name = "m3_btn";
	this.m3_btn.setTransform(465.2,668);
	new cjs.ButtonHelper(this.m3_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m3stop_btn = new lib.音频停止();
	this.m3stop_btn.name = "m3stop_btn";
	this.m3stop_btn.setTransform(471.05,663.85);
	new cjs.ButtonHelper(this.m3stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m4_btn = new lib.音频播放标();
	this.m4_btn.name = "m4_btn";
	this.m4_btn.setTransform(465.2,668);
	new cjs.ButtonHelper(this.m4_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m4stop_btn = new lib.音频停止();
	this.m4stop_btn.name = "m4stop_btn";
	this.m4stop_btn.setTransform(471.05,663.85);
	new cjs.ButtonHelper(this.m4stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1_btn}]},8).to({state:[{t:this.m1stop_btn}]},6).to({state:[{t:this.m2_btn}]},202).to({state:[{t:this.m2stop_btn}]},6).to({state:[{t:this.m3_btn}]},187).to({state:[{t:this.m3stop_btn}]},6).to({state:[{t:this.m4_btn}]},202).to({state:[{t:this.m4stop_btn}]},6).wait(191));

	// 内容
	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#333333").s().p("AgnBFQgSgLgLgSQgLgSAAgWQAAgWALgSQALgSASgKQASgLAVAAQAXAAARALQATAKAKASQALASAAAWQAAAWgLASQgKASgTALQgRALgXAAQgVAAgSgLgAgogoQgRAQAAAYQAAAYARARQAQARAYAAQAZAAAQgRQARgRABgYQgBgYgRgQQgQgRgZgBQgYABgQARg");
	this.shape_30.setTransform(1805.975,513.425);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#333333").s().p("Ai7EKIAAiyQgRAWgSAVQgUAUgVASIgGgGQASgfAPgnQAOglAKgqQAKgpAHgoIhCAAIgEgPIBOAAIAAhZIgmADIgmADIgCgGQAcgMAdgQQAcgRAagRQAZgSARgOIBTBIQgFAEgKABQgKAAgPgEIgVAEIgWAGIAABcIAagnIAKAJIAXAVIAXAXQgBAFgEACQgEACgGAAIhDAAIAAAcQApAQASAVQATASACATQACATgJAMQgJANgQABQgPACgRgPQAAgVgFgUQgFgWgGgSIAAECQAAADgIAFQgIAFgNAEQgOAEgSABgAhFDrIgFgPICDAAIAAhoIhXAAIgEgQIBbAAIAAhiIhgAAIgEgOIDSAAIAhgwIALAJIAYAVIAZAYQgBAEgEACQgEACgGAAIhwAAIAABiIARAAIAjgwIALAJIAaAVIAbAZQgBAFgEACQgEACgGAAIhlAAIAABoIArAAIAhgxIALAJIAYAXIAaAXQgBAFgEACQgEACgHAAgAgYgrIAAjOIBLAdIBdAAIAigkIBGA0QgDAEgFADQgGADgJACIAABzQgBADgKADQgKAEgOAEQgOADgNAAIgNAAIAAgVIhmAAIAAAQQAAADgJAGQgJAFgPAEQgOAFgOgBgAAwhhIBmAAIAAhsIhmAAg");
	this.shape_31.setTransform(1767.725,495.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#333333").s().p("AimEKIAAkVIBWAgICbAAIAngpIBNA6IgIAIQgGADgKACIAAC6QAAAEgLAGQgLAGgQAFQgQAFgRAAIgOAAIAAgoIinAAIAAASQAAAEgKAGQgKAGgQAFQgQAEgRAAgAhVDPICnAAIAAhOIinAAgAhVBxICnAAIAAhMIinAAgAj/giIgEgQIEhAAIANgmIAMgqIAKgmIi4AAQAsAMAUAUQATATACATQABATgMANQgLANgTABQgRABgUgQQgBgcgIgaQgGgagMgVIhbAAIgFgQIDgAAIgKgDIgKgGQgCgUgIgTQgIgSgKgMIADgDQAwgCAWALQAYAKAFAPQAEAPgIAOQgJANgRAFIBvAAIApg1IANAKIAeAYIAfAaQgBAEgEACQgFADgGAAIiMAAIBVAaQgBAFgFADQgFADgJgBQgVASgcAXQgdAWgdATIBlAAIApg3IAPAKIAeAYIAgAcQgBAEgEACQgEADgGAAg");
	this.shape_32.setTransform(1711.9,495.2656);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#333333").s().p("AjKEEQA7gOAygUQAzgUAogbQgWgVgSgbQgSgagOghIgkAAIgEgQIDRAAIAsgoIBDA+QgCAFgGACQgFACgKAAQgeAugrAhQAlAIAoADQAoADApABIAAAHQgZAIgOAUQgQAUgFAeQgygJgqgNQgqgNgigVQgxAYg8AOQg9AOhHAFgAgSBzQAZASAfAMQAjggAWgpIicAAQASAZAZASgAkLEHQAYgsALgyQALgzACg0QADg0AAgxIAAi0IBdAgIB7AAIgCgBQgFgXgNgVQgMgUgPgOIAEgDQAtgEAbAJQAaAJAJAOQAJAPgEAPQgEAPgOAJIBqAAIAmg2IANALIAcAXIAdAaQgCAFgEACQgEACgGAAImAAAIAACFQABAkgEAoQgDAogNApQgMAogaAlQgaAlgtAfgAhNAmIAAh0IgzAAIgEgQIA3AAIAAg9IBdAHQAAAFgEAEQgEAEgJABIAAAoIBHAAIAAg9IBfAHQAAAFgFAEQgDAEgKABIAAAoIAOAAIAggzIAKAKIAXAXIAXAZQgCAFgDACQgEACgGAAIhXAAIAABXQAAACgKAEQgKAEgOADQgPADgOAAIgOAAIAAgOIhHAAIAAALQAAACgKAEQgKAEgOADQgOADgPAAgAgBgEIBHAAIAAhKIhHAAg");
	this.shape_33.setTransform(1656,495.351);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#333333").s().p("AkGDnIgEgQIGTAAIAvg7IAOALIAiAaIAjAcQgBAGgFABQgEADgGAAgAjEAcIgEgQIEQAAIAsg3IAOALIAfAZIAjAaQgCAEgEADQgFACgGAAgAjoidIgFgPIFaAAIAtg6IAOALIAhAZIAjAcQgBAFgEACQgFACgGAAg");
	this.shape_34.setTransform(1600.075,493.05);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#333333").s().p("AhCDiQgEgPgJgJQgIgKgOgHQgNgHgbgFIAAgHIAMABIAcABIAgACIAVAAQAHAAADgCQACgDAAgFIAAmlIBpAKQgBAGgFAEQgFAFgKABIAAGRQAAAcgHAUQgIAUgXALQgXAMgvAFQgCgVgEgPgAkHCXQAVgfARgmQAQglANgnQAMgnAIglQAJgmAEggIBuAoQgBAEgFADQgEADgLABQgRApgZAsQgZAsgjAqQgjApgvAhgACwB3QgEgqgNgqQgNgqgTgoQgTgpgWgkIAHgDQA+AfAlAjQAlAkARAhQARAjAAAdQABAdgMASQgMASgUABIgCAAQgTAAgXgTg");
	this.shape_35.setTransform(1543.801,495.825);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#333333").s().p("Ag6EEIAAkNIBPAfICBAAIAkgmIBJA2QgDAEgFAEQgGADgJACIAAC/QgBACgLAEQgLAEgPAEQgPADgOABIgNAAIAAgtIiKAAIAAAVQAAADgKAGQgIAGgPAEQgPAFgRAAgAASDIICKAAIAAhLIiKAAgAASBtICKAAIAAhIIiKAAgAkCCeIAAl6IBIAdIAeAAIAhgkIBEA0QgDAEgGADQgFADgJACIAAEJQgBADgJAFQgKAEgOADQgOAEgNAAIgMAAIAAgwIglAAIAAA8QAAAEgIAGQgIAGgOAEQgNAEgQABgAi8A6IAlAAIAAjpIglAAgAgogEIAAj1IBMAdIBiAAIAkgnIBLA4QgDAEgHAEQgGAEgKACIAACgQgBACgLAEIgZAHQgPADgNAAIgNAAIAAggIhsAAIAAASQgBAEgJAFQgJAFgOAEQgOAFgPAAgAAhg9IBsAAIAAg/IhsAAgAAhiMIBsAAIAAhAIhsAAg");
	this.shape_36.setTransform(1488.825,495.875);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#333333").s().p("Ai6ELIAAjYQgQAWgSAVQgUAUgWATIgHgGQAVggAOgnQAOgnALgqQAKgqAFgqIhDAAIgEgQIBPAAIAAiNIBfAJQAAAHgEAEQgFAEgLACIAABwIAegtIAJAHIAVAUIAWAWIAQhGQAHgkAEgjIBmAbQgBAHgGACQgFAEgKAAIgPAjIgRAhIB2AAIAogoIBBA5QgDAFgGACQgGADgLACQgBBZgDA+QgDBAgGAqQgFAqgJAaQgIAZgNAMQgQARgVAIQgUAGgdAAQAAgSgDgNQgDgNgHgIQgHgJgOgHQgOgHgUgEIAAgHIAbACIAbABIAUABQAHAAAGgCQAFgBAEgFQAPgOAIhOQAHhPADiRIiFAAQgSAfgWAaQgVAagZAUIgHgEQAGgPAGgRIALgkIgDABIgDAAIhIAAIAAAwQApANAUATQATASACARQACARgJANQgKAMgPABQgPACgRgPQAAgVgFgUQgFgWgIgRIAAEgQAAADgJAFQgKAGgNAEQgNAFgPAAgAgrBGIAHgDQAHgCAFgEQAIgMAJgVQAIgVAIgZQAJgbAGgZQAFgaADgTIBbAmQgCAFgFACQgFADgHgBQgNAXgRAZQgRAYgTAYQgTAYgTATIAogEIAvgEIgKgkIgLghIAGgCQApAVASAYQATAYADAWQADAVgIAOQgJAOgPACQgPACgPgQIgBgSIgDgTIgnAYQgVAMgZAMIgFAKIgIAEg");
	this.shape_37.setTransform(1431.8,495.4);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#333333").s().p("AjKEEQA7gOAygUQAzgUAogbQgXgVgRgbQgRgagPghIgkAAIgFgQIDSAAIAtgoIBCA+QgCAFgGACQgFACgKAAQgeAugrAhQAlAIAoADQAoADApABIAAAHQgZAIgOAUQgQAUgGAeQgwgJgrgNQgqgNgigVQgxAYg9AOQg8AOhHAFgAgSBzQAZASAfAMQAjggAWgpIicAAQASAZAZASgAkLEHQAYgsALgyQALgzACg0QADg0AAgxIAAi0IBdAgIB7AAIgCgBQgFgXgNgVQgMgUgPgOIAEgDQAugEAZAJQAbAJAJAOQAJAPgEAPQgEAPgOAJIBqAAIAmg2IANALIAcAXIAdAaQgBAFgFACQgEACgGAAImAAAIAACFQABAkgDAoQgEAogNApQgMAogaAlQgaAlgtAfgAhNAmIAAh0IgzAAIgEgQIA3AAIAAg9IBdAHQAAAFgEAEQgEAEgJABIAAAoIBHAAIAAg9IBfAHQgBAFgEAEQgDAEgKABIAAAoIAOAAIAggzIAKAKIAXAXIAXAZQgCAFgDACQgEACgGAAIhXAAIAABXQAAACgKAEQgJAEgPADQgPADgOAAIgOAAIAAgOIhHAAIAAALQAAACgKAEQgKAEgOADQgOADgPAAgAgBgEIBHAAIAAhKIhHAAg");
	this.shape_38.setTransform(1376,495.351);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#333333").s().p("AkADGIgEgQIGDAAIAwhAIAJAHIAWASIAcAXIAbAXQgBAFgFACQgEACgHAAgAjIh2IgEgQIEVAAIAvg/IAJAHIAVASIAbAWIAaAWQgBAFgEACQgFADgGAAg");
	this.shape_39.setTransform(1319.975,493.375);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#333333").s().p("AhCDiQgEgPgJgJQgIgKgOgHQgNgHgbgFIAAgHIAMABIAcABIAgACIAVAAQAHAAADgCQACgDAAgFIAAmlIBpAKQgBAGgFAEQgFAFgKABIAAGRQAAAcgHAUQgIAUgXALQgXAMgvAFQgCgVgEgPgAkHCXQAVgfARgmQAQglANgnQAMgnAIglQAJgmAEggIBuAoQgBAEgFADQgEADgLABQgRApgZAsQgZAsgjAqQgjApgvAhgACwB3QgEgqgNgqQgNgqgTgoQgTgpgWgkIAHgDQA+AfAlAjQAlAkARAhQARAjAAAdQABAdgMASQgMASgUABIgCAAQgTAAgXgTg");
	this.shape_40.setTransform(1263.801,495.825);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#333333").s().p("Ah9EDQA6gdAsglQArglAhgsQgWg0gJg+QgKhAgBhKIkQAAIgFgPIEVAAIgBg1IAAg3IBmALQAAAGgEAEQgFAEgLACIAAApIgBAoIA3AAIASgXIgCgBQgFgUgMgSQgNgTgNgMIAEgDQAmgEAWAGQAXAFAKALQAKAMAAAMQAAANgIAJIAZATIAYATQgBAGgEABQgFACgFAAIigAAQAAAuADApQADAoAIAiQANgcAKgeQAKgfAHgeIBkAhQgCAEgEADQgFAEgLAAQgPApgUAnQgWAogdAlQAKARAOAPQANAOARALQAHAEAEgBQAEAAAEgHIAMgUIAOgbIAOgbIAEABIgLBiQAQAZADAQQAEAPgIAJQgNAQgTABQgTABgTgGQgUgIgQgKQgYgRgSgSQgSgUgPgWQgmAhgwAaQgyAZhAARgAkLCXIBHgMIBkgQIB1gWIABAHQgiATg4AcQg3AbhTAjQgCAGgEAEQgEAEgFABgAjaBoIAAjQIBMAdIAsAAIAfgiIBCAxQgBADgFADQgFADgHABIAAB3QgBADgKAEIgXAJQgOAEgNABIgOAAIAAgfIgzAAIAAAWQAAAEgJAFQgKAFgNAFQgPADgPABgAiRAsIAzAAIAAhoIgzAAg");
	this.shape_41.setTransform(1208,495.4);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#333333").s().p("AjKEEQA7gOAygUQAygUApgbQgWgVgSgbQgSgagOghIgkAAIgEgQIDRAAIAsgoIBDA+QgCAFgGACQgFACgKAAQgeAugrAhQAlAIAoADQAoADApABIAAAHQgZAIgOAUQgQAUgFAeQgygJgqgNQgqgNgigVQgxAYg8AOQg9AOhHAFgAgSBzQAZASAfAMQAjggAWgpIicAAQASAZAZASgAkLEHQAYgsALgyQALgzACg0QADg0AAgxIAAi0IBdAgIB7AAIgCgBQgFgXgNgVQgMgUgPgOIAEgDQAtgEAbAJQAaAJAJAOQAJAPgEAPQgEAPgOAJIBqAAIAmg2IANALIAcAXIAdAaQgCAFgEACQgEACgGAAImAAAIAACFQABAkgEAoQgDAogNApQgMAogaAlQgaAlgtAfgAhNAmIAAh0IgzAAIgEgQIA3AAIAAg9IBdAHQAAAFgEAEQgEAEgJABIAAAoIBHAAIAAg9IBfAHQAAAFgFAEQgDAEgKABIAAAoIAOAAIAggzIAKAKIAXAXIAXAZQgCAFgDACQgEACgGAAIhXAAIAABXQAAACgKAEQgKAEgOADQgPADgOAAIgOAAIAAgOIhHAAIAAALQAAACgKAEQgKAEgOADQgOADgPAAgAgBgEIBHAAIAAhKIhHAAg");
	this.shape_42.setTransform(1152,495.351);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#333333").s().p("AkADGIgEgQIGDAAIAwhAIAJAHIAWASIAcAXIAbAXQgBAFgFACQgEACgHAAgAjIh2IgEgQIEVAAIAvg/IAJAHIAVASIAbAWIAaAWQgBAFgEACQgFADgGAAg");
	this.shape_43.setTransform(1095.975,493.375);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#333333").s().p("AB4DGQgfgmgTgsQgUgrgLguQgMgrgFgrQgGAygQAuQgQAuggApQgfAqg1AiQg0AkhOAdIgEgHQA5glAlgoQAmgnAXgqQAWgqAMgtQALgtAEgwIjDAAIgEgQIDIAAQACgoABgqIAAhWIBvAKQgCAHgEADQgFAFgKACIgCBIQgBAkgDAhIBsAAIAvg6IAOALIAiAaIAjAcQgBAFgFACQgEACgHAAIjaAAQAJA0AcAvQAbAwAyAoQAxApBLAcIAAAGQgfAGgSAVQgSAUgFAkQgsgdgfgmg");
	this.shape_44.setTransform(1039.825,495.6);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#333333").s().p("AkOC1IAngVIAogWIAAi4IhGAAIgDgQIBAAAIAlgwIBNA+QgEAEgHADQgHADgMADIAACkQAUAUAdAMQAcAMAoAEQAqAGA7gBIBTgBQAngBArgDIAAAHQgXAGgNATQgMATgDAaIiMAAQg5AAglgLQgngMgZgXQgagYgUgkQgGgKgFABQgEAAgGAJIgQAbIgXAlIgWAmQAAAFgCADQgCAEgEACgABECIQgEgNgIgIQgHgJgNgGQgMgGgYgFIAAgHIALABIAZABIAcACIATABQAHAAACgDQADgCAAgFIAAjOIi0AAIgFgPIC5AAIAAh3IBjAIQgBAHgFADQgFAEgKACIAABfIACAAIAjg+IALAMIAZAbIAZAdQgBAFgFACQgDACgGAAIhTAAIAADRQABAbgHASQgHASgWAKQgWALgrADQgBgSgEgNgAgUAZQgBgRgFgUQgEgVgIgVQgIgWgNgSIAEgDQA3APAaAXQAZAXAEAXQADAWgMAQQgMAQgSACIgDAAQgRAAgQgSgAi1iAQgGgggRghQgQgggSgZIAEgDQA5ALAdAUQAdAVAIAWQAHAXgIARQgJASgSAEIgJABQgPAAgSgMg");
	this.shape_45.setTransform(983.675,495.375);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#333333").s().p("AkKC5QAPgIATgLIAjgWIAAi8IhCAAIgDgPIA8AAIAjgvIBLA7QgDAFgHACQgHAEgMACIAACoQAKAKAMAHQALAHAOAHIAAkyIBNAeIBBAAIgHgDIgHgGQgJgQgVgRQgUgQgggNIACgHQAsABAfAEQAeAEATAHIANgSIAMgSIjNAAIgFgQIDVAAIAognIBEBAQgEAEgFACIgOACQgRAJgXAJQgXAKgYAHQAMAOgGANQgGANgQAGIAkAAIAhgkIBFA1QgCADgGADQgFADgJACIAAC8QAAAWgFAPQgFAQgRAJQgRAJgiADIgBgbQgBgLgDgIQgCgGgFgGQgFgFgMgDIAAgHIAFABIAKAAIAJABQAFAAACgDQACgCgBgEIAAgoIgpAAIAABXQgBADgOAGQgPAFgbABIgNAAIAAhmIgmAAIAABbQgBAFgNAIQgOAGgTAFQAbAGAkADQAkAEAxgCIBVAAIBVgDIAAAFQgXAGgMATQgNATgDAZIiQAAQg7AAgmgLQgngLgagXQgagWgVgkQgFgKgFABQgFAAgFAJIgOAcIgTAiIgTAlQABAEgCADIgFAGgABoArIApAAIAAg+IgpAAgAgEArIAmAAIAAg+IgmAAgABogiIApAAIAAg9IgpAAgAgEgiIAmAAIAAg9IgmAAgAi+h/QgGghgQggQgQghgSgYIAEgDQA4AMAcAUQAdAVAHAWQAHAWgIARQgIARgSAEIgJACQgPAAgRgMg");
	this.shape_46.setTransform(927.675,495.45);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#333333").s().p("Ag3BbQAjgRAQgXQAPgWADgVQgNgEgPgGQgQgIgMgNQgMgNgBgVQAAgVAPgPQAPgQAYAAQAPAAANAIQAMAGAJAPQAHAPABAVQgBAcgJAeQgLAdgWAaQgWAZgkAQg");
	this.shape_47.setTransform(851.5,518.9);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#333333").s().p("AjsEEQA+gUAkgVQAkgWATgZQASgYAHgcIiCAAIgFgPICKAAQADgPABgQIABggIg/AAIgDgKQgcAZgmAVQgkAVguARIgEgFQAvggAiglQAjgmAXgoIiAAAIgFgPICOAAIANgcIAMgbIh0AAIgEgQIB9AAIAIgZIAHgZIiZAAIgEgQIChAAIAHgoIAGgnIBtAVQgBAHgEAEQgGADgKAAIgFAWIgFAWIBoAAIApgxIAMAJIAdAWIAfAZQgBAEgFADQgEACgGAAIjPAAIgIAZIgJAZIB5AAIAkgtIALAJIAbAUIAcAXQgBAEgEACQgEADgHAAIjWAAIgNAcIgRAbIDAAAIApg0IANAKIAeAXIAfAZQgBAFgEACQgEACgGAAIigAAQAUAWAdAOQAdAMAiAHQAhAGAgACIgBAIQgXAQgOASQgOATgCAWQgvgUgjgmQgjgngXgxIh+AAQgMARgOAQQgPAOgQAPIB5AAIAjgpIAKAIIAaASIAbAWQgCAEgEACQgEADgGAAIg7AAIgDAgQgCAQgDAPIAxAAIAlgwIAMAJIAbAVIAeAYQgCAFgFACQgDACgHAAIiPAAIgDALIgFAJQBPAJAsAPQAtAQASARQASASgBAQQgCAPgOAKQgNAKgUAAQgTAAgQgOQgQgVgggaQgfgagvgZQgNAZgdAVQgdAVgxAQQgvARhJAOg");
	this.shape_48.setTransform(815.95,495.225);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#333333").s().p("Ai+DvQgDgLgFgIQgIgHgLgGQgMgGgSgDIABgHIAXABIAYABIARABIALgBQAEgBADgDQAKgIAGglQAGgmAFhEIgqAAIgVAbIg9ghIAHgHIAKgGQADgTABgbIAEg0IACgsIBLAjIASAAIAAhpIhtAAIgFgPIBtAAIAfgkIBGAzQgDAEgGADQgHAEgKACIAAB3QAAADgJADQgKADgOADQgNAEgLAAIgNAAIAAgbIggAAIgDAeIgDAiIgDAeIAoAAIAkghIA+AzQgDADgGADQgFADgKABQgDA8gFAoQgGAngJAYQgJAXgPAKQgOALgRAFQgSAFgYAAQAAgQgCgMgAA7EKIAAh8Ih8AAIgFgQICBAAIAAhCIgiAAIAAANQAAAFgPAFQgOAHgbAAIgMAAIAAkHIBKAcIBXAAQAJgYAJghIAShAIBbAjQgCAFgFADQgGADgJgBQgUAWgWATQgWAUgWAPIAXAAIAhgmIA/AwQgDADgEADQgGADgIACIAAC5QgBADgQAGQgQAGgcAAIgMAAIAAgQIghAAIAABCIAgAAIAlgzIALAKIAaAXIAbAZQgBAEgEACQgEADgHAAIh1AAIAABqQAAADgGADQgIAFgMADQgNAEgSAAgACBAtIAhAAIAAhSIghAAgAAZAtIAiAAIAAhSIgiAAgACBg1IAhAAIAAhNIghAAgAAZg1IAiAAIAAhNIgiAAgAAPilQgFgYgKgZQgMgYgNgTIAFgCQAuAGAYAPQAYARAFARQAFASgJAPQgIAOgQADIgHABQgOAAgPgMg");
	this.shape_49.setTransform(759.55,495.3);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#333333").s().p("ABfDnQgDgOgIgIQgIgJgPgIQgPgHgWgFIAAgGIAdACIAeABIAVABQAHAAAFgCIAJgGQAOgNAGhOQAGhNACiOIhWAAQgWAkgaAeQgYAdgeAXIgDgCIAADiQgBACgKAGQgKAEgOAEQgOAFgOgBIgMAAIAAgsIhGAAIAAAnQAAAEgIAHQgJAFgNAFQgOAFgRAAIgLAAIAAmrIBGAdIADgjIACgmIACgjIBsAaQgCAIgGADQgGAEgKAAIgeAhIggAkIAlAAIAjgnIBEA2QgDAEgFAEQgFACgJACIAABeQANgeANgmQAMgmAKgqQAKgqAGgqIBpAeQgCAGgGADQgFAEgKAAIgPAiIgRAfIBGAAIAqgqIBEA8QgDAEgGAEQgGADgKABQgBBYgDA+QgCA+gFArQgFApgIAZQgIAZgMANQgQAQgVAIQgVAHggABQABgUgDgOgAi3CjIBGAAIAAiTIhGAAgAi3ABIBGAAIAAiLIhGAAgAAiBLQgBgfgLgeQgKgdgOgYIADgDQA1ANAZAVQAaAUAEAVQAEAXgKAPQgKARgTACIgFAAQgQAAgTgPg");
	this.shape_50.setTransform(705.075,495.45);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#333333").s().p("AAvEJIAAlmIghAAIAAEFQAAACgHAFQgHAFgMAEQgOAFgSAAIgNAAIAAlHIBOAdIAaAAIAAhWIh5AAIgEgQIDkAAIAng1IAMAKIAcAYIAeAZQgBAFgFACQgEADgGAAIh5AAIAABWIAdAAIAfgjIBDAzQgCADgFADIgNAEIAAC9QABAZgFAQQgGAQgQAKQgQAJghADIgBgeQgBgMgCgIQgDgHgFgFQgEgGgLgCIAAgHIAFAAIAIAAIAIAAQAFAAACgCQACgDgBgDIAAjBIgiAAIAAFRQAAADgHAFQgIAFgNAEQgOAEgTAAgAj1EEQAggkARgsQASgrAHgxQAHgyAAg1IAAj4IBbAJQAAAGgFAEQgEAEgLACIAADfQAAA7gNA0QgOA1ggArQggArg4AegAkCCLIAAlMIBWAHQAAAGgEAEQgFADgJACIAAEjQgBADgIAFQgIAEgNADQgMAEgNAAg");
	this.shape_51.setTransform(648.925,495.525);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#333333").s().p("AgNEEQgmAAgXgFQgWgFgKgOQgKgPAAgcIAAhmQgiARglAQQgkAPgoAMIgEgHQAogUAmgXQAmgYAjgaIAAg9IBGAGIAoglIjzAAIgEgQICsAAIAAhbIh+AAIgFgPICDAAIAAhgIBiAIQgBAFgEAEQgDAEgJABIAABKIANAAIAmgzIAJAHIAWASIAaAVIAegpIAagoIBXA4QgEAFgFACQgGABgKgCQgZAggfAhQgeAggmAhIA4AAIAogyIAMAJIAbAXIAeAZQgBAEgEACQgFADgFAAIioAAQgbAXgeAVQgeAXghAUIAAA5QAfgPAfgSQAegRAagTQAagSASgQIBRA/QgGAFgJABQgJAAgPgEQgZALghAKQgiAJglAJQgmAIglAGIAAA4QgBAIAGADQAHAEASgBIBUAAIAkAAIAcgBQAIAAAFgCQAFgCAFgFQAHgHAIgRQAJgQALgaIAFAAIACBEQATAGAHAHQAHAIgBALQABASgOAKQgOALglAEQgkAFhEAAgAAAg5IAKAAQAtgtAlguIhcAAg");
	this.shape_52.setTransform(591.05,494.825);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#333333").s().p("AkEEJIAAoKIBPAjIAQAAIAigiIA8A2IgGgUIgGgTIAFgCQApAUAUAWQARAXADAVQACAUgIAOQgKANgOACQgQABgRgPQABgSgDgSQgCgRgFgSIgIADIgMACIgWAoIgaAuQgPAXgOASQAaATARAXQARAXAIAZQAIAZAAAXQAAAcgIAUQgHAUgRALQgRALgegBIAAgTIgCgUQgCgKgDgFQgDgHgJgEIAACOQgBADgHAFQgHAFgNAFQgNAEgSAAgAi8BbIAPAAIAFAAIAGgDQAEgDACgIQACgHABgMQAAgegGgeQgGgegOgbIAHgtIAIg1IAEgyIgcAAgAiJC8IAkgSIAkgTIAAivIgrAAIgEgRIAmAAIAhgsIAiAbQAQgYANgeQANgeAKghIgsAAIgDgQIAyAAIAIgkIAGgmIBhAXQgBAEgFAFQgFAEgLAAIgHATIgHATIAmAAIAkgzIALAKIAaAXIAbAZQgBAEgFADQgDACgHAAIiBAAQgIAPgIAMIgSAaIAgAMIApAAIAdggIBAAvQgDAEgFAEQgHADgIABIAAC3QAAAUgFAPQgFAPgPAIQgPAJgeADIgCgZQgBgLgDgHQgDgHgFgFQgHgFgLgCIAAgIIAGABIANABIALAAQAFAAACgCQABgDAAgEIAAguIg3AAIAABlQAAAEgGAFQgGAFgNAEQgLAFgRABIgMAAIAAj4IgSAOIgTANIAaAVQgEADgHAEQgGAEgNACIAACoQAXATAiAIQAkAJA0gBIA5gBIA6gCIAAAHQgRADgIASQgJASgBAYIhgAAQgnAAgbgKQgbgKgSgTQgTgVgQgeQgEgIgFABQgEABgFAHIgOAYIgRAeIgRAeQAAAFgBADQgBADgEACgABqAfIA3AAIAAg2Ig3AAgABqgnIA3AAIAAg3Ig3AAg");
	this.shape_53.setTransform(537.25,495.55);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#333333").s().p("ACXDFQgZgngPgzQgPgzgKhCIghAAIAACoIAjgHIAjgHIABAGIgtAlQgdAWglAaQgFAJgHAHQgFAFgGAEIgkhQQAQgIAGgHQAFgHAAgLIAAhvQgCADgEACQgDABgFAAIhGAAIAABmIAngIIApgJIABAGQggAWgwAbQgxAchFAgQgDAGgDAEQgEAEgFACIgkhWIAMgBIAOgCIAAi0IBFAFQAAAEgDACQgCACgGABIAACdIAQgDIAAjsIgDAAIAAANQAAACgHAEQgHAFgLADQgNAFgRAAIgNAAIAAjWIBMAiIAxAAIAeghIA/AvQgCADgEADIgNAEIAAB8QgBACgKAEQgJAEgNADQgNADgLABIgDAAIAABYIAJAAIAcgtIAIAJIATASIAUAYIAAkiIBQAhIBUAAIAhgkIBEAzQgCADgGADQgGAEgIACIAAC9QgBAEgKAFQgKAEgPAEIBBAvQgCAEgGABQgEAAgIgBQgOAHgWAJQgWAKgaAJQAaAhAeAYQAgAYAjANIgBAHQgUAFgPARQgPASgHAbQgmgbgZgmgAByAkQAKAWANAUIAYgjQALgTAGgOIgHABIgIAAIgMAAIAAgVIg3AAQAHAXALAXgAA1gaIBiAAIAAhWIhiAAgAiuhgIA+AAIAAh0Ig+AAgAA1h/IBiAAIAAhTIhiAAg");
	this.shape_54.setTransform(479.85,495.95);

	this.instance = new lib.yp430102();
	this.instance.setTransform(448,365);

	this.instance_1 = new lib.yp430103();
	this.instance_1.setTransform(449,359,0.9806,0.9804);

	this.instance_2 = new lib.yp430105();
	this.instance_2.setTransform(449,350,0.9849,0.9849);

	this.instance_3 = new lib.yp430106();
	this.instance_3.setTransform(448,351,0.9774,0.9774);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30}]}).to({state:[{t:this.instance}]},8).to({state:[{t:this.instance_1}]},208).to({state:[{t:this.instance_2}]},193).to({state:[{t:this.instance_3}]},208).wait(197));

	// bg
	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FFFFFF").s().p("EiLsBMwQhvAAhQhPQhPhPAAhwMAAAiRDQAAhwBPhPQBQhPBvAAMEXZAAAQBvAABPBPQBQBPAABwMAAACRDQAABwhQBPQhPBPhvAAg");
	this.shape_55.setTransform(959.9897,541.5003,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_55).wait(814));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(999,590.3,882,442.5);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#C7D58D",
	opacity: 1.00,
	manifest: [
		{src:"images/构唱小三度_atlas_P_1.png?1688980507581", id:"构唱小三度_atlas_P_1"},
		{src:"sounds/yx430103听一听31题目.mp3?1688980507618", id:"yx430103听一听31题目"},
		{src:"sounds/yx430104听一听32题目.mp3?1688980507618", id:"yx430104听一听32题目"},
		{src:"sounds/yx430105听一听33题目.mp3?1688980507618", id:"yx430105听一听33题目"},
		{src:"sounds/yx430106听一听34题目.mp3?1688980507618", id:"yx430106听一听34题目"}
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