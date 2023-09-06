(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"学习_atlas_P_1", frames: [[0,689,441,191],[0,0,1697,687]]}
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



(lib.Image11 = function() {
	this.initialize(ss["学习_atlas_P_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Image1 = function() {
	this.initialize(ss["学习_atlas_P_1"]);
	this.gotoAndStop(1);
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
(lib.学习 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:4,m2:29};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,28,29,53];
	this.streamSoundSymbolsList[4] = [{id:"_3听辨1课前十六后八",startFrame:4,endFrame:29,loop:1,offset:0}];
	this.streamSoundSymbolsList[29] = [{id:"_3听辨1课前八后十六",startFrame:29,endFrame:54,loop:1,offset:0}];
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
	}
	this.frame_4 = function() {
		var soundInstance = playSound("_3听辨1课前十六后八",0);
		this.InsertIntoSoundStreamData(soundInstance,4,29,1);
	}
	this.frame_28 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_29 = function() {
		var soundInstance = playSound("_3听辨1课前八后十六",0);
		this.InsertIntoSoundStreamData(soundInstance,29,54,1);
	}
	this.frame_53 = function() {
		this.gotoAndStop('lnav1');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(24).call(this.frame_28).wait(1).call(this.frame_29).wait(24).call(this.frame_53).wait(1));

	// leftnav_on
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E28624").s().p("AiPCLIAAgTICHAAIAAgsIhmAAIAAgTIBmAAIAAgmIAVAAIAAAmIBiAAIAAATIhiAAIAAAsICDAAIAAATgAiCAaIgIgHQAVgOAJgPQAKgQACgRIgoAAIAAgTIAqAAIAAgDIAAgrIggAAIAAgTICPAAIAAATIgeAAIAAAuIAkAAIAAATIgkAAIAABFIgUAAIAAhFIgrAAQgDAVgLAUQgKAUgXAPIgHgHgAhLhBIAAADIAqAAIAAguIgqAAgAA+ATIgEgJIAZAAIAOAAQAFAAABgCQAAAAAAAAQAAgBABAAQAAgBAAgBQAAAAAAgBIAAiOIAUAAIAACOQABAJgDAFQgDAFgGADQgHACgMABIgcAAIgEgKgAAsgQIAAhqIAUAAIAABqg");
	this.shape.setTransform(248.3,441.825);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28624").s().p("ABPCBQgQgKgTgJQgSgJgSgHIAOgOIAkAQQATAIARAKQAQAJAMAIIgPAPQgLgIgRgJgAhwCKIgHgIQAbgIAUgJQATgJAMgKQAMgJAHgKIhRAAIAAgSIBZAAQADgHAAgIIABgNIAAAAIgxAAIAAgMQgPAOgTAMQgTAMgVAJIgHgJIgIgHQAegMAXgQQAWgRARgTIhVAAIAAgSIBiAAIAHgNIAHgMIhNAAIAAgSIBUAAIAEgMIADgNIhoAAIAAgRIBrAAIACgOIABgMIAVABIgCAMIgCANIBuAAIAAARIhxAAIgDANIgDAMIBqAAIAAASIhwAAIgGAMIgHANICfAAIAAASIhWAAQASAUAYAQQAaARAcAIIgIAIQgEAFgCAEQgVgHgTgMQgUgMgQgPIAAANIgyAAIAAABIgBANIgCAOIBgAAIAAASIhmAAQgFAMgNANQgMANgVALQgXAMggAKIgGgIgAA2ALIgNgMIgKgPIg+AAIgKAPIgNAMIBsAAIAAAAg");
	this.shape_1.setTransform(216.45,442.375);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28624").s().p("AgqCSIAAieIhVAAIAAgUIDsAAIAABqQABAKgEAGQgDAGgIACQgIADgPAAQgPABgWAAIgDgLIgEgLIAhAAIATAAQAEAAACgCQACgBgBgEIAAhVIhrAAIAACegAArgyIAAglIhWAAIAAAlIgWAAIAAglIhLAAIAAgVIBLAAIAAglIAWAAIAAAlIBWAAIAAglIAWAAIAAAlIBMAAIAAAVIhMAAIAAAlg");
	this.shape_2.setTransform(184.325,442.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28624").s().p("AA7CEIgbgBIgCgKQgBgGgEgEIAfABIATABIAIgBQADgBACgEQADgDADgOQADgOABgaIADhBIAChgIjdAAIAAgUIDyAAIAAAMIgCBqIgCBFQgCAbgDAPQgDAOgEAGQgFAHgGADQgGADgIABIgPAAIgJAAgAh7BFIA3gRIBCgWIBFgZIAEAUIhCAYIhAAWIg4ATgAgVgXIgegYIgfgWIAOgOIAfAWIAfAXQANALAKAJIgOAQIgYgVg");
	this.shape_3.setTransform(152.1,443.3833);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E28624").s().p("AhDCIIgFgKIAiABIATgBQAFAAABgBQACgCAAgDIAAhBIiBAAIAAgUICBAAIAAgXQAOgGAPgHQAQgIANgIIiGAAIAAgUICeAAIAFAAIAOAKQgQAOgVANQgWAMgWAJIAAAOICEAAIAAAUIiEAAIAABBQABAKgEAFQgDAGgHACQgJADgOAAIgkABIgEgLgABygcIAAgrIjiAAIAAArIgVAAIAAg+IA2AAQgFgKgIgLQgHgLgJgKIASgIIASAWQAIAMAFAKIgMAGIBIAAQgCgLgHgNQgHgOgIgLIASgHQAIAMAHANQAIAOADALIgQAGIA1AAIANgQIALgTIAKgRIAVAIIgQAXIgQAVIA2AAIAAA+g");
	this.shape_4.setTransform(120.375,442.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(54));

	// leftnav
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(153,153,153,0.498)").s().p("AAgBoIAAgxQgJALgNALQgMAKgNAHIgFgFIgGgFQAOgGAMgJQAMgJAIgKIAMAEIAAgrIgWACIgWABIgBgFIgDgGIAjgDIAigDIAbgFIANAKIgWAEIgZADIAAAYIAEAFIADAEIAUgNIARgMIAKAIIgTANIgVAMQAKAKANAHQAMAHAOAFQgDABgCAEIgEAGQgQgGgNgKQgOgKgLgMIAAA0gAhCBoIgNgBIgBgHIgDgGIANABIAJAAIAEgBIADgCQADgCACgJIAEgYIADgpIg3AAIADgYIADgdIACgcIANABIgCAXIgCAXIgCAWIAYAAIAEgbIACgeIADgeIg0AAIAAgOIBCAAIgCAiIgEAkIgDAfIAGAAIALAAIAAACIAAAEQgCAegCATQgCATgDAKQgCAKgEADIgGAFIgIACIgKAAgAhsAxIAagGIAegIIABANIgcAIIgaAHgAgSA0IgFgFIAVgMQAKgHAHgHIANAEQgJAJgLAIQgKAJgLAFIgFgEgAAZgFIAAgOIgaAEIgYADIgDgMIAOgCIAAhBIgLAAIAAgMIBGAAIAAAMIgIAAIAAA7IAIgBIAAALIgIABIAAAQgAgCgbIAbgEIAAgNIgbAAgAgCg2IAbAAIAAgOIgbAAgAgChOIAbAAIAAgNIgbAAgAAxgPIgFgFQAHgFAHgGQAHgHAGgJIgLgNIgLgMIAJgHIAKALIAKALIAHgPQADgHACgIIgmAAIAAgNIApAAIADAAIACAAIAIACQgDAPgFAMQgFANgGALIAMAOIAJAMIgKAJIgIgLIgKgNIgNAPQgHAGgIAFIgDgFg");
	this.shape_5.setTransform(189.925,374.775);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(153,153,153,0.498)").s().p("AhjBlIgFgIQBDgIArgYQAsgZAVgqIAPAHQgXAtguAbQgsAZhFALIgDgIgAgFA5IAAhLIhhAAIAAgQIAlAAIAAg2IAQAAIAAA2IAuAAIAAhJIAPAAIAAAaIBHAAIAAAPIhHAAIAAAgIBdAAIAAAQIheAAIAABLgAhYAyIgGgFQAOgLAMgOQANgOAJgNIAPAEQgKAQgOAQQgNAQgOALIgGgGg");
	this.shape_6.setTransform(166.075,374.25);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(153,153,153,0.498)").s().p("AgBBlIgHgFQAPgPAKgWQAJgVAEgZQAGgZAAgbIgiAAIAAgQIAjAAIABgZIAAgaIAQAAIgBAaIAAAZIA1AAIAAAJIgDA9IgDAqIgDAaQgDAJgDADQgEAFgEACIgJACIgOAAIgTgBIgCgHIgDgIIATABIANAAIAFAAIAEgDQADgEADgNIAEgoIADhEIgmAAQgCAdgEAbQgFAbgKAXQgKAXgSARIgEgGgAhjBGIgDgIQACgBADgEIAGgLIAFgPIAHgXIAIgaIgiAAIAAgPIBpAAIAAAPIg3AAQgFASgGAUIgOAkIA8gMIgHgUIgIgTIAOgDIAJAXIAJAYIAFAUIgNAFIgCgIIgDgJIgoAJIgYAFIgLAEIgGACIgCgHgAhghMIAAgOIBbAAIAAAOg");
	this.shape_7.setTransform(142.25,374.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(153,153,153,0.498)").s().p("AhqBiIAAgQICJAAIAEgTIACgVIhsAAIAHgbIAGgfIAGgiIAGgfIg0AAIAAgPIDGAAIAAAPIiBAAIgEATIgDAVIBVAAIADgBIAMABIgDAbIgEAgIgEAgIgFAgIA7AAIAAAQgAgsABIgGAaIBZAAIAEgcIADgZIhWAAIgEAbg");
	this.shape_8.setTransform(118.3,374.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333333").s().p("ABCEnQABgYgEgRQgEgRgIgJQgJgMgSgJQgRgJgZgGIAAgHIAiACIAiACIAaABQAIAAAHgDQAHgCAFgFQAOgMAKgtQAJgsAHhNQg6AkhUArQhTArh1A1QgDAGgEAFQgFAFgGACIg9hrQAcgGAsgMIBlgaIB3ghQBAgRBDgVIAFhaIAFhrImhAAIgGgSIGfAAIA0g1IBQBKQgDAFgIAEQgHAEgMACQgEBvgFBRQgFBPgIA2QgIA2gMAhQgMAhgRAQQgVAWgaAJQgZAKgkAAIgEgBgAgSgbQgbgYgkgZQgjgZgngVQgmgWgjgNIADgHQBMgLA0AFQA1AGAfAQQAfAQAOAVQANAVgCAUQgDAUgQAMQgOALgWAAIgGAAg");
	this.shape_9.setTransform(230.175,295.4012);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#333333").s().p("AhbEJQgEgQgMgLQgHgHgJgGQgKgFgOgFQgPgFgWgFIAAgHIAQABIAlACIAnACIAaABQAIAAADgCQADgDAAgGIAAhkIjxAAIgFgSID2AAIAAhCIBAAFIAaghIAYgjIj2AAIgGgSIEAAAIAzgwIApAnIAKgeIAIgeIl5AAQAFAmgKAZQgLAagUALQgNAHgNAAQgOAAgKgIQgLgHgFgOQgGgUAKgPQAJgPARgIQAMgIAKgNQAKgOAFgSQAFgTgDgVIAIAAQAIAOAFAOIAJAbIEKAAQALgWAKgZQALgZAIgaQAJgZAGgWIBzArQgCAGgGADQgHADgLgBQgXAVggAYQggAZghAVIBXAAIAxgxIBUBPQgDAFgGACQgGACgKAAQgWANgdAOQgeAOgdAKIAdAcQgEAEgFACQgGACgKABQgaAMgiANIhDAYIASACQAAAHgGAEQgFADgKACIAAAoIB2AAIAwhAIAQAMIAjAcQAVARARAPQgCAFgFADQgFACgHAAIjsAAIAABoQABAggJAWQgKAWgbAOQgcANg3AFQgDgXgFgRgAiiixQgDgggNgeQgOgegRgYIAFgDQA8AJAdATQAdAUAGAXQAGAWgLASQgLARgVAEIgIABQgRAAgUgOgAgki8QAAgegHgeQgIgdgLgYIAFgDQA5AOAZAWQAaAWACAWQADAXgOAPQgNAQgWABIgDAAQgTAAgVgTg");
	this.shape_10.setTransform(133.5242,294.475);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#CCCCCC").ss(1,1,1).p("AzdAAMAm7AAA");
	this.shape_11.setTransform(228.875,350.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]}).wait(54));

	// 音频停止
	this.m1stop = new lib.音频停止();
	this.m1stop.name = "m1stop";
	this.m1stop.setTransform(703.75,256.1);
	new cjs.ButtonHelper(this.m1stop, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m2stop = new lib.音频停止();
	this.m2stop.name = "m2stop";
	this.m2stop.setTransform(1460.35,256.1);
	new cjs.ButtonHelper(this.m2stop, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1stop}]},4).to({state:[{t:this.m2stop}]},25).wait(25));

	// 音频播放标
	this.m2 = new lib.音频播放标();
	this.m2.name = "m2";
	this.m2.setTransform(1454.6,260.35);
	new cjs.ButtonHelper(this.m2, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m1 = new lib.音频播放标();
	this.m1.name = "m1";
	this.m1.setTransform(697.9,260.35);
	new cjs.ButtonHelper(this.m1, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m1},{t:this.m2}]}).wait(54));

	// 内容
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#231916").s().p("AFoHvQgigaAAgoQAAhEBRg6QBKg2BUAAQA1AAAhAZQAIAGAGAGIAAqiIniAAIAALeIgHAAQgFA9hLA3QhNA4hSAAQgzAAghgXQgigaABgoQAAhEBQg6QBLg2BSAAQA1AAAhAZQAJAHAGAHIAAniInhAAIAAIcIgGAAQgEA9hMA3QhOA4hSAAQgzAAghgXQgjgaAAgoQAAhEBQg6QBNg2BSAAQA1AAAiAZQAIAGAGAGIAAsaIAMAAIAAgJIP1AAIAAAJIAMAAIAANWIgFAAQgFA9hLA3QhNA4hUAAQgyAAghgXgAlDlEIHhAAIAAhAInhAAg");
	this.shape_12.setTransform(591.6997,314.0155,1.0277,1.0277);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#231916").s().p("AFiHvQghgaAAgoQAAhEBOg6QBNg2BQAAQA1AAAhAZQAIAGAGAGIAAngIncAAIAAIcIgGAAQgEA9hKA3QhNA4hRAAQgyAAghgXQgigaAAgoQAAhEBPg6QBLg2BRAAQA0AAAhAZQAIAGAGAGIAAqiInbAAIAALeIgFAAQgEA9hLA3QhMA4hUAAQgzAAgfgXQghgaAAgoQAAhEBOg6QBLg2BSAAQA1AAAhAZQAIAGAGAGIAAsaIAMAAIAAgJIPoAAIAAAJIAMAAIAANWIgFAAQgEA9hLA3QhMA4hSAAQgzAAghgXgAC0lEIHcAAIAAhAIncAAg");
	this.shape_13.setTransform(1356.4647,314.0155,1.0277,1.0277);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#231916").s().p("AgoAgQgLgHABgMQAAgTAWgQQAXgQAWAAQAQAAAJAHQAJAHAAAMQAAASgWARQgXAQgWAAQgPAAgJgHg");
	this.shape_14.setTransform(757.0911,507.8015,3.5845,3.5845);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#231916").s().p("AgCB9IAAj5IAFAAIAAD5g");
	this.shape_15.setTransform(775.0136,459.2315,3.5845,3.5845);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#231916").s().p("AgoAgQgLgHABgMQAAgSAWgRQAXgQAWAAQAQAAAJAHQAJAHAAAMQAAASgWARQgXAQgWAAQgPAAgJgHg");
	this.shape_16.setTransform(1514.3911,507.8306,3.5845,3.5845);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#231916").s().p("AgCB9IAAj5IAFAAIAAD5g");
	this.shape_17.setTransform(1532.3136,459.2605,3.5845,3.5845);

	this.instance = new lib.Image11();
	this.instance.setTransform(647,685,0.8293,0.8302);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#231916").s().p("AgWB5QgJgJAAgNQAAgNAJgJQAJgJANAAQAOAAAJAJQAJAJAAANQAAANgJAJQgJAJgOABQgNgBgJgJgAgWhMQgJgKAAgMQAAgOAJgIQAJgJANAAQAOAAAJAJQAJAIAAAOQAAAMgJAKQgJAJgOAAQgNAAgJgJg");
	this.shape_18.setTransform(634.225,615.65);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#231916").s().p("AgxDmIAAjKIAjAPICVAAIASgTIAnAdQgCADgGACQgEADgIACIAACaQgBACgIAEQgJAEgJAAIgEAAIAAgYIidAAIAAAQQgBADgIAEQgHADgLABgAgQC8ICdAAIAAg8IidAAgAgQBxICdAAIAAg3IidAAgAi4CiQALgGAEgEQADgEAAgHIAAjcIg9AAIgFgOIBDAAIAQgSIAhAcQgBADgGACQgFADgGABIAADTIAcgTIAegUIAFAGIggAiIguAvIgFALQgEAEgEACgAhkACIgEgNIBtAAIAAh8IhcAAIgEgOIC0AAQAKgSAKgWIASgoIAvARQgBAEgEADQgFACgIgBQgKAMgOAPIgdAcIAzAAIAXgcIAGAGIAQANIASAPQgBAEgDACQgEACgFAAIhZAAIAAB8IA3AAIAVgdIAIAGIARAOIARAPQgBAEgDABQgEACgFAAgAAjgLIAyAAIAAh8IgyAAgACAgcIAOgfIAOghIAKgaIAuAYQgBADgFACQgEADgIgBIgaAdIgjAhgAgpghQgBgUgJgWQgJgVgKgRIAGgDQAgATAMASQALASAAAOQgCAOgJAFIgGABQgHAAgIgGgAiWiQQgDgNgHgOQgHgPgLgNQgJgOgKgKIAHgEQAkAQARARQAPASABAOQACAPgJAFQgEACgEAAQgGAAgIgEgAgEigQgCgRgKgSQgKgSgKgNIAFgDQAgAMANAPQANAPAAANQgCANgIAEQgEACgEAAQgGAAgHgFg");
	this.shape_19.setTransform(597.55,611.325);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#231916").s().p("AgLDaQgOgDgFgIQgFgJAAgOIAAjgIAlARICVAAIAAiOIjUAAIgEgPIDTAAIASgUIAqAgQgDADgGADQgGADgIABIAACxIgEAFIgLAEIgMACIgFAAIAAgmIiaAAIAAC7QAAAFACADQABADAHACQAHABAOAAIBMAAIAtAAIAagBQAGgBADgCQACgBACgEQAEgIAEgTQAFgTAFgaIAHAAIABBKQAJADAEAEQAEADAAAFQAAAGgFAEQgFAEgOACQgOADgZAAIhBABIhNAAIgGABQgUAAgLgEgAiwCtQALgGAEgEQADgEAAgHIAAjeIhDAAIgFgOIBJAAIAQgSIAhAcQgCACgEADQgFADgHABIAADUIAigXIAlgaIAEAGIglAnIg0A1QgCAHgEAEQgEAEgDACgAh8h7QgFgPgLgSQgKgRgNgQQgOgQgMgMIAGgEQAsASAUAUQAUAUADARQADAQgIAIQgEADgFAAQgGAAgIgEg");
	this.shape_20.setTransform(547.575,610.6031);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#231916").s().p("AhaDXQgpgRggggQgggggRgqQgRgqgBgyQABgwARgrQARgqAgggQAgggApgRQAqgSAwAAQAwAAAqASQAqARAgAgQAfAgASAqQASArAAAwQAAAygSAqQgSAqggAgQgfAggqARQgqASgwAAQgwAAgqgSgAhTjKQgoARgeAeQgdAegQAoQgRAoAAAtQAAAvARAoQAQAnAdAeQAeAeAoARQAmARAtAAQAuAAAmgRQAngRAegeQAdgdARgoQARgoAAgvQAAgugRgoQgRgngdgeQgegegngRQgmgQgugBQgtABgmAQgAhWB7IAAgUIBShUQAPgRALgNQALgOAEgOQAFgOAAgRQAAgYgOgPQgOgPgZAAIgQABQgIABgHACIgLAcQgEALgFADQgFAEgFAAQgFAAgEgDQgEgCgDgFQAFgSAMgMQAMgMATgHQASgGAWAAQAnABAUATQATATAAAeQAAAYgQAXQgQAWggAaIhJBEICYAAIAAAeg");
	this.shape_21.setTransform(484.25,611.375);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#231916").s().p("Ah+BDIAAgZID9AAIAAAZgAh+gpIAAgZID9AAIAAAZg");
	this.shape_22.setTransform(699.325,489.25);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#231916").s().p("AipDlIAAkQQgOAVgPATQgPASgRAQIgHgEQAWgfAVgoQAUgqASgvQASguANgwIA1AQQgCAEgEADQgFACgJAAQgKAdgMAcQgMAbgNAZIATAHQgCAEgDACQgEACgHABIAAEnQgBADgIAEQgHAEgKAAgAhwDSIgEgOIA/AAIAAkyIAlAQIAzAAIABgZIABgdIh9AAIgEgPICCAAIABghIABggIAyAEQgBAGgEADQgEAEgIAAIgBAYIgCAYIBXAAIAYgeIAHAGIASAPIASAQQgBAEgEACQgDACgFAAIiPAAIgFA2IBGAAIARgWIArAhQgCADgGACQgFADgJABIAAEOIAGAAIAVgcIAHAGIAQAOIARAOQgBAFgDABQgEACgFAAgAgWDEICgAAIAAhCIigAAgAgWB0ICgAAIAAg4IigAAgAgWAtICgAAIAAg2IigAAgAgWgYICgAAIAAg3IigAAg");
	this.shape_23.setTransform(647.175,488.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#231916").s().p("ABGDVQgDgGgHgEQgGgFgNgDQgNgDgVgDIAAgIIALABIAYACIAaACIASAAQAIAAADgDQAEgDAAgGIAAkMIinAAIgEgPICrAAIAAh1IAzAGQgBAFgEAEQgEAEgJABIAABhIAWAAIAYggIAIAHIARAPIASARQgBAEgEACQgDACgFAAIhMAAIAAEOQAAAOgEALQgEAKgNAHQgNAHgaACQgBgIgDgGgAjeC6IAAmEIAmAQIBCAAIATgVIAnAgQgCADgGADIgNAEIAAE8QgBADgJAEQgIAEgJABIgFAAIAAgsIhOAAIAAA4QAAACgHAFQgHAEgMAAgAi/BoIBOAAIAAiBIhOAAgAi/goIBOAAIAAiDIhOAAgAAOBXQgBgUgIgWQgIgWgNgUQgNgTgOgQIAHgDQArAZAUAZQATAaABAVQABAVgJAIQgEADgFAAQgHAAgJgHg");
	this.shape_24.setTransform(598.275,488.525);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#231916").s().p("AgzDgQgXAAgMgCQgNgDgEgHQgFgHABgNIAAh6IAvAGQAAAEgEADQgEAEgHABIAABiQAAAGAEACQAFACASAAIBGAAIApAAIAYgBQAFAAADgBQACgCACgDQADgGAEgPIAJgiIAGAAIACA5QAJACADAEQADACAAAFQABAIgJAFQgJAEgZACQgaABgyAAgAjdDIQgEgHAEgHQADgGAIgFQAKgHAKgNQAKgOAGgRQAGgSABgTIAKABQAFAcgDAWQgEAWgIAPQgJAPgKAIQgJAHgKABIgEABQgIAAgEgHgADCDBQgEgRgJgTQgKgUgNgSQgMgSgNgOIAGgDQAsAWATAXQAUAXABASQADASgJAHQgEADgFAAQgGAAgIgFgAAfCQQgDgPgIgQQgJgPgLgPQgMgOgMgKIAFgFQAnAQASASQASATACAQQACAQgJAHQgDADgEAAQgGAAgHgFgAiVA7IAAjFIAjARICUAAIAUghIATgkIAPghIAyAUQgCAFgFACQgFACgIgCQgNARgSAUQgSAUgTASIBEAAIARgUIAnAeIgHAFIgMAEIAACTQAAACgFADIgLAEQgGACgGAAIgEAAIAAgbIjvAAIAAATQgBADgIADQgJAEgJABgAh0AOIDvAAIAAh5IjvAAgAg/iFQgFgOgJgPQgKgPgMgOQgMgOgLgLIAGgEQApAPATASQATASACAPQADAPgJAHQgDADgFAAQgGAAgIgEg");
	this.shape_25.setTransform(546.5147,487.475);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#231916").s().p("AhaDXQgqgRgfggQgggggRgqQgSgqAAgyQAAgwASgrQARgqAgggQAfggAqgRQAqgSAwAAQAxAAAqASQAqARAfAgQAgAgARAqQASArAAAwQAAAygSAqQgSAqgfAgQggAggpARQgrASgwAAQgwAAgqgSgAhUjKQgnARgeAeQgdAegRAoQgQAogBAtQABAvAQAoQARAnAdAeQAeAeAnARQAoARAsAAQAtAAAogRQAmgRAfgeQAdgdARgoQAQgoABgvQgBgugQgoQgRgngdgeQgfgegmgRQgogQgtgBQgsABgoAQgAhQB7IAAgOIA/gEIABghIAAghIAAiWIg2AKIAAgPIBUgVIAGAFIgDA5IAAByIABAhIAAAhIA9AEIAAAOg");
	this.shape_26.setTransform(483.75,488.275);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#231916").s().p("AgXAYQgJgKAAgOQAAgMAJgLQAJgJAOgBQAPABAIAJQAKALAAAMQAAAOgKAKQgIAJgPABQgOgBgJgJg");
	this.shape_27.setTransform(494.4,363.1);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#231916").s().p("AhiC5IAAgPIBPgKIABgtIAAgsIAAjaIhLAIIAAgSIBrgcIAIAGIgCBPIAACrIAAAsIABAtIBOAKIAAAPg");
	this.shape_28.setTransform(473.225,347.25);

	this.instance_1 = new lib.Image1();
	this.instance_1.setTransform(1399,672,0.2151,0.2151);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#231916").s().p("Ah+BDIAAgYID9AAIAAAYgAh+gqIAAgYID9AAIAAAYg");
	this.shape_29.setTransform(1456.525,489.3);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#231916").s().p("AipDlIAAkQQgOAVgPATQgPASgRAQIgHgFQAWgeAVgpQAUgpASguQASgvANgxIA1ARQgCAFgEACQgFACgJAAQgKAdgMAbQgMAcgNAZIATAIQgCADgDACQgEACgHABIAAEoQgBACgIAEQgHADgKABgAhwDTIgEgPIA/AAIAAkzIAlARIAzAAIABgZIABgdIh9AAIgEgPICCAAIABghIABggIAyAEQgBAFgEAEQgEADgIACIgBAXIgCAYIBXAAIAYgeIAHAGIASAOIASARQgBAEgEACQgDACgFAAIiPAAIgFA2IBGAAIARgXIArAiQgCAEgGACQgFACgJABIAAEOIAGAAIAVgcIAHAGIAQANIARAQQgBAEgDACQgEACgFAAgAgWDEICgAAIAAhCIigAAgAgWBzICgAAIAAg4IigAAgAgWAsICgAAIAAg2IigAAgAgWgYICgAAIAAg3IigAAg");
	this.shape_30.setTransform(1404.375,488.25);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#231916").s().p("ABGDVQgDgGgHgEQgGgFgNgDQgNgDgVgDIAAgIIALABIAYACIAaACIASAAQAIAAADgDQAEgDAAgGIAAkMIinAAIgEgPICrAAIAAh1IAzAGQgBAFgEAEQgEAEgJABIAABhIAWAAIAYggIAIAHIARAPIASARQgBAEgEACQgDACgFAAIhMAAIAAEOQAAAOgEALQgEAKgNAHQgNAHgaACQgBgIgDgGgAjeC6IAAmEIAmAQIBCAAIATgVIAnAgQgCADgGADIgNAEIAAE8QgBADgJAEQgIAEgJABIgFAAIAAgsIhOAAIAAA4QAAACgHAFQgHAEgMAAgAi/BoIBOAAIAAiBIhOAAgAi/goIBOAAIAAiDIhOAAgAAOBXQgBgUgIgWQgIgWgNgUQgNgTgOgQIAHgDQArAZAUAZQATAaABAVQABAVgJAIQgEADgFAAQgHAAgJgHg");
	this.shape_31.setTransform(1355.475,488.575);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#231916").s().p("AgzDgQgXAAgMgCQgNgDgEgHQgFgHABgNIAAh6IAvAGQAAAEgEADQgEAEgHABIAABiQAAAGAEACQAFACASAAIBGAAIApAAIAYgBQAFAAADgBQACgCACgDQADgGAEgPIAJgiIAGAAIACA5QAJACADAEQADACAAAFQABAIgJAFQgJAEgZACQgaABgyAAgAjdDIQgEgHAEgHQADgGAIgFQAKgHAKgNQAKgOAGgRQAGgSABgTIAKABQAFAcgDAWQgEAWgIAPQgJAPgKAIQgJAHgKABIgEAAQgIAAgEgGgADCDBQgEgRgJgTQgKgUgNgSQgMgSgNgOIAGgDQAsAWATAXQAUAXABASQADASgJAHQgEADgFAAQgGAAgIgFgAAfCQQgDgPgIgQQgJgPgLgPQgMgOgMgKIAFgFQAnAQASASQASATACAQQACAQgJAHQgDADgEAAQgGAAgHgFgAiVA7IAAjFIAjARICUAAIAUghIATgkIAPghIAyAUQgCAFgFACQgFACgIgCQgNARgSAUQgSAUgTASIBEAAIARgUIAnAeIgHAFIgMAEIAACTQAAACgFADIgLAEQgGACgGAAIgEAAIAAgbIjvAAIAAATQgBADgIADQgJAEgJABgAh0AOIDvAAIAAh5IjvAAgAg/iFQgFgOgJgPQgKgPgMgOQgMgOgLgLIAGgEQApAPATASQATASACAPQADAPgJAHQgDADgFAAQgGAAgIgEg");
	this.shape_32.setTransform(1303.7147,487.525);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#231916").s().p("AhZDXQgrgRgfggQgfgggSgqQgSgqAAgyQAAgwASgrQASgqAfggQAfggArgRQApgSAwAAQAxAAAqASQApARAgAgQAgAgARAqQARArABAwQgBAygRAqQgSAqgfAgQggAggpARQgqASgxAAQgwAAgpgSgAhUjKQgnARgdAeQgeAegQAoQgRAoAAAtQAAAvARAoQAQAnAeAeQAdAeAnARQAnARAtAAQAuAAAmgRQAogRAegeQAdgdARgoQAQgoABgvQgBgugQgoQgRgngdgeQgegegogRQgmgQgugBQgtABgnAQgAhQB7IAAgOIA/gEIABghIAAghIAAiWIg2AKIAAgPIBTgVIAHAFIgCA5IAAByIAAAhIAAAhIA+AEIAAAOg");
	this.shape_33.setTransform(1240.95,488.325);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#231916").s().p("AgWB5QgJgJAAgNQAAgNAJgJQAJgJANAAQAOAAAJAJQAJAJAAANQAAANgJAJQgJAJgOABQgNgBgJgJgAgWhMQgJgKAAgMQAAgOAJgIQAJgJANAAQAOAAAJAJQAJAIAAAOQAAAMgJAKQgJAJgOAAQgNAAgJgJg");
	this.shape_34.setTransform(1390.925,615.3);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#231916").s().p("AgxDmIAAjKIAjAPICWAAIASgTIAmAdQgDADgFACQgFADgGACIAACaQgBACgJAEQgIAEgKAAIgFAAIAAgYIicAAIAAAQQgBADgHAEQgIADgKABgAgQC8ICcAAIAAg8IicAAgAgQBxICcAAIAAg3IicAAgAi4CiQAMgGADgEQADgEAAgHIAAjcIg+AAIgEgOIBDAAIAQgSIAhAcQgCADgEACQgFADgHABIAADTIAcgTIAegUIAFAGIggAiIguAvIgGALQgDAEgEACgAhkACIgEgNIBtAAIAAh8IhcAAIgEgOIC0AAQAKgSAKgWIASgoIAvARQAAAEgGADQgEACgIgBQgKAMgOAPIgdAcIA0AAIAVgcIAHAGIARANIARAPQgBAEgEACQgDACgFAAIhZAAIAAB8IA2AAIAXgdIAHAGIARAOIARAPQgBAEgDABQgEACgFAAgAAjgLIAyAAIAAh8IgyAAgACAgcIAOgfIAOghIAKgaIAuAYQgCADgEACQgFADgHgBIgbAdIgiAhgAgpghQAAgUgKgWQgJgVgKgRIAGgDQAfATAMASQANASgCAOQgBAOgJAFIgGABQgHAAgIgGgAiWiQQgCgNgIgOQgHgPgKgNQgKgOgJgKIAGgEQAlAQAPARQAQASABAOQABAPgIAFQgEACgEAAQgGAAgIgEgAgEigQgCgRgKgSQgJgSgLgNIAFgDQAgAMANAPQANAPAAANQgCANgIAEQgEACgEAAQgGAAgHgFg");
	this.shape_35.setTransform(1354.25,610.975);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#231916").s().p("AgLDaQgOgDgFgIQgFgJAAgOIAAjgIAlARICVAAIAAiOIjUAAIgEgPIDTAAIASgUIAqAgQgDADgGADQgGADgIABIAACxIgEAFIgLAEIgMACIgFAAIAAgmIiaAAIAAC7QAAAFACADQABADAHACQAHABAOAAIBMAAIAtAAIAagBQAGgBADgCQACgBACgEQAEgIAEgTQAFgTAFgaIAHAAIABBKQAJADAEAEQAEADAAAFQAAAGgFAEQgFAEgOACQgOADgZAAIhBABIhNAAIgGABQgUAAgLgEgAiwCtQALgGAEgEQADgEAAgHIAAjeIhDAAIgFgOIBJAAIAQgSIAhAcQgCACgEADQgFADgHABIAADUIAigXIAlgaIAEAGIglAnIg0A1QgCAHgEAEQgEAEgDACgAh8h7QgFgPgLgSQgKgRgNgQQgOgQgMgMIAGgEQAsASAUAUQAUAUADARQADAQgIAIQgEADgFAAQgGAAgIgEg");
	this.shape_36.setTransform(1304.275,610.2531);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#231916").s().p("AhZDXQgrgRgfggQgfgggSgqQgSgqAAgyQAAgwASgrQASgqAfggQAfggArgRQApgSAwAAQAxAAAqASQApARAgAgQAfAgASAqQARArABAwQgBAygRAqQgSAqggAgQgfAggpARQgqASgxAAQgwAAgpgSgAhUjKQgnARgdAeQgeAegQAoQgRAoAAAtQAAAvARAoQAQAnAeAeQAdAeAnARQAnARAtAAQAuAAAmgRQAogRAegeQAdgdARgoQAQgoABgvQgBgugQgoQgRgngdgeQgegegogRQgmgQgugBQgtABgnAQgAhWB7IAAgUIBShUQAPgRALgNQAKgOAFgOQAFgOAAgRQAAgYgOgPQgOgPgaAAIgPABQgIABgHACIgKAcQgFALgEADQgFAEgGAAQgFAAgEgDQgFgCgCgFQAFgSAMgMQAMgMATgHQASgGAWAAQAnABATATQAUATAAAeQAAAYgQAXQgQAWggAaIhJBEICYAAIAAAeg");
	this.shape_37.setTransform(1240.95,611.025);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#231916").s().p("AgXAYQgJgKAAgOQAAgMAJgLQAJgJAOgBQAPABAIAJQAKALAAAMQAAAOgKAKQgIAJgPABQgOgBgJgJg");
	this.shape_38.setTransform(1251.75,363.1);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#231916").s().p("AhtC7IAAgeIAug1IApgvQAZgfASgZQARgYAIgWQAIgVAAgVQAAgjgSgWQgTgVgfAAIgQABIgSADIgMAnQgEAQgHAIQgGAHgJAAQgJAAgGgEQgGgEgEgHQAFgbAPgRQAQgSAXgJQAWgJAbAAQAhABAVAMQAXAMAKAVQALAWAAAcQAAAXgJAWQgKAWgXAcQgXAdgmAqIgdAfIgnAqIC8AAIAAAmg");
	this.shape_39.setTransform(1230.125,347.125);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.instance_1},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.instance},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]}).wait(54));

	// bg
	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#FFFFFF").s().p("EiLsBMwQhvAAhQhPQhPhPAAhwMAAAiRDQAAhwBPhPQBQhPBvAAMEXZAAAQBvAABPBPQBQBPAABwMAAACRDQAABwhQBPQhPBPhvAAg");
	this.shape_40.setTransform(959.9897,540.0003,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_40).wait(54));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(999,588.8,882,442.5);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#F7C677",
	opacity: 1.00,
	manifest: [
		{src:"images/学习_atlas_P_1.png?1690356370396", id:"学习_atlas_P_1"},
		{src:"sounds/_3听辨1课前十六后八.mp3?1690356370418", id:"_3听辨1课前十六后八"},
		{src:"sounds/_3听辨1课前八后十六.mp3?1690356370418", id:"_3听辨1课前八后十六"}
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