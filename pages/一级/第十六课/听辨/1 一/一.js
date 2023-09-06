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


// stage content:
(lib.一 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:3,m2:154};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,3,151,154,296];
	this.streamSoundSymbolsList[3] = [{id:"yx12160101听辨声音强",startFrame:3,endFrame:154,loop:1,offset:0}];
	this.streamSoundSymbolsList[154] = [{id:"yx12160102听辨音强",startFrame:154,endFrame:297,loop:1,offset:0}];
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
	this.frame_3 = function() {
		var soundInstance = playSound("yx12160101听辨声音强",0);
		this.InsertIntoSoundStreamData(soundInstance,3,154,1);
		var _this = this;
		
		
		
		
		
		_this.m1stop.on('click', function(){
		
		_this.gotoAndStop(0);
		});
		
		
		
		
		_this.m2stop.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_151 = function() {
		this.gotoAndStop(0);
	}
	this.frame_154 = function() {
		var soundInstance = playSound("yx12160102听辨音强",0);
		this.InsertIntoSoundStreamData(soundInstance,154,297,1);
	}
	this.frame_296 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(3).call(this.frame_3).wait(148).call(this.frame_151).wait(3).call(this.frame_154).wait(142).call(this.frame_296).wait(1));

	// 音频停止
	this.m1stop = new lib.音频停止();
	this.m1stop.name = "m1stop";
	this.m1stop.setTransform(1172.85,462.05);
	new cjs.ButtonHelper(this.m1stop, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m2stop = new lib.音频停止();
	this.m2stop.name = "m2stop";
	this.m2stop.setTransform(1112.6,582.75);
	new cjs.ButtonHelper(this.m2stop, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1stop}]},3).to({state:[{t:this.m2stop}]},151).wait(143));

	// 音频播放标
	this.m2 = new lib.音频播放标();
	this.m2.name = "m2";
	this.m2.setTransform(1098.15,585.4);
	new cjs.ButtonHelper(this.m2, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m1 = new lib.音频播放标();
	this.m1.name = "m1";
	this.m1.setTransform(1158.4,464.45);
	new cjs.ButtonHelper(this.m1, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m1},{t:this.m2}]}).to({state:[{t:this.m2}]},3).to({state:[{t:this.m1}]},151).wait(143));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#51C1E1").s().p("AgdCvQgLgKAAgRQAAgQALgKQAKgJAPAAQAPAAAKAJQALAKAAAQQAAARgLAKQgKAJgPABQgPgBgKgJgAgWBDQgEgYAHgSQAHgTANgNQANgPAPgNQAOgNAKgOQAKgOABgRQAAgZgPgQQgPgRggAAQgVAAgUAKQgUALgUAUIgXgWQAWgXAagOQAagPAhAAQAuABAaAYQAaAXAAAoQAAAWgLAQQgKARgPAOIgdAbQgOANgIAQQgHARADAVg");
	this.shape.setTransform(1058.825,636.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#51C1E1").s().p("AC6DBIgJgRIhUAGIhQAGIhDAFIgEgfIA2gDIBAgEIAAhKIhhAAIAAh+IBhAAIAAgtIhXAAIAAh2IDNAAIAAB2IhYAAIAAAtIBlAAIAAB+IhlAAIAABIIAjgDIAkgCIgPgXIgOgWIAagLIAZAjQAMATAKASQAKASAEAOIgbANIgGgQgABaA2IBHAAIAAhIIhHAAgAgJA2IBFAAIAAhIIhFAAgAACh2ICSAAIAAg/IiSAAgAi2DJIgEgPQgCgJgEgGIAfACIAVAAQAGABAEgBQAEgBACgEQAFgEAEgOQAEgPADgbQAEgbACgsIh0AAIAHgpIAFgxQAEgaACgWIBoAAIAAhOIh2AAIAAgdICUAAIAACIIhsAAIgFAqIgFAmIBzAAIgBAGIAAAJQgDA2gEAiQgEAigFASQgEASgHAHQgGAHgHADQgHADgKABIgYAAIgfgBg");
	this.shape_1.setTransform(1023,637.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#51C1E1").s().p("AiRDeIAAjSIEoAAIAADRIghAAIAAgRIjoAAIAAASgAhyCwIDoAAIAAg4IjoAAgAhyBeIDoAAIAAg2IjoAAgAjVgeIAAgdIB8AAQgEgSgHgTQgJgUgJgRIAdgHQAJALAGAOQAGANAFAOQAFANADAKIgVAGICDAAIANgbIANgdIAKgbIAjAJIgTAmIgSAkIB9AAIAAAdgAi6iRIAAgdICxAAQgDgKgGgKIgLgVIAegGQAIAKAHANQAGANAEALICkAAIAAAdg");
	this.shape_2.setTransform(974.4,636.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#51C1E1").s().p("AgRDcIAAksIAhAAIAAEsgACAgpQgigYgggdQgggdgeglQgnAzgzAqQg0Apg4AaIgLgNIgNgOQAtgVArgdQArgdAjglQAjgkAXgoIAdANIgGAKIgHAKQAsA3A0AmQAyAmA7AcIgNAOQgGAIgEAGQglgTgjgXg");
	this.shape_3.setTransform(926.15,636.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#51C1E1").s().p("AhqDHIgLgKQAbgeAOgkQAPgkAHgmIglAAIAAgcIApAAIAEgsIABgrIgtAAIAAgcIAtAAIAAhVIgtAAIAAgcICOAAIAAARIgBCsIgCBwQgBArgCAWQgDAXgFAHQgFAJgGAEQgHAEgJABIgTABIgZgBQAAgHgCgIQgCgIgEgGIAZABIAQAAQAEAAAEgCQADgBACgGQADgFACgNQACgOABgZIAChAIgyAAQgIArgQAqQgQApgeAjQgDgFgGgGgAgTgXIgEAsIAuAAIAAgnIABgwIgqAAIgBArgAgSheIAqAAIABhVIgrAAgABUDRIAAmgIBlAAIAFgCIATAMIgPAxIgQA0IgQAwQAZAiAJAdQAKAegBAaQAAAUgEAQQgFAQgJAHQgEAEgHACIgMADIgOABIgPAAIgCgOQgCgIgEgGIAPAAIAMAAIAIgBIAFgEQAGgEACgLQACgLABgOQAAgXgJgcQgJgbgZgiIAOgtIAOgvIAMgrIg/AAIAAGFgAjQCAIAAk4IBjAAIAAEIIhKAAIAAAwgAi3AyIAwAAIAAjMIgwAAg");
	this.shape_4.setTransform(878.25,637.625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#51C1E1").s().p("ABxDbIAAj7IhjAAQAAAlgFAtQgFAsgNAsQgOAsgZAjIgNgLQgJgGgGgDQAagkANgqQAMgqAEgqQADgqAAglIAAh+QAggGAhgIQAhgHAdgJQAdgJAVgJIAcAZQgYAJgcAIQgdAJgfAHIg9ANIAABTIDDAAIAAAgIhAAAIAAD7gAjQCLIAAk7ICCAAIAAEWIhkAAIAAAlgAiyBHIBEAAIAAjYIhEAAg");
	this.shape_5.setTransform(829.975,636.525);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#51C1E1").s().p("AjaARIAAgiIG1AAIAAAig");
	this.shape_6.setTransform(781.025,636);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#51C1E1").s().p("ABxDbIAAj7IhjAAQAAAlgFAtQgFAsgNAsQgOAsgZAjIgNgLQgJgGgGgDQAagkANgqQAMgqAEgqQADgqAAglIAAh+QAggGAhgIQAhgHAdgJQAdgJAVgJIAcAZQgYAJgcAIQgdAJgfAHIg9ANIAABTIDDAAIAAAgIhAAAIAAD7gAjQCLIAAk7ICCAAIAAEWIhkAAIAAAlgAiyBHIBEAAIAAjYIhEAAg");
	this.shape_7.setTransform(733.275,636.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#51C1E1").s().p("AgUAXQgIgIgBgPQABgNAIgIQAJgJALAAQANAAAIAJQAJAIAAANQAAAPgJAIQgIAIgNABQgLgBgJgIg");
	this.shape_8.setTransform(701.925,652.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#51C1E1").s().p("AhsC0IAAgYQBVhJAng4QAng4AAgtQAAgWgHgPQgIgSgPgIQgPgKgVAAQgWAAgUAMQgSAMgQARIgXgVQAVgYAZgOQAYgOAhAAQAuAAAbAcQAbAbABAwQgBAkgRAlQgSAjggAnQgfAmgrAoIAdgCIAcgBIBmAAIAAAig");
	this.shape_9.setTransform(681.875,636.8);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#51C1E1").s().p("AgdCvQgLgKAAgQQAAgRALgJQAKgKAPAAQAPAAAKAKQALAJAAARQAAAQgLAKQgKAKgPAAQgPAAgKgKgAgWBEQgEgZAHgSQAHgSANgOQANgPAPgOQAOgMAKgOQAKgOABgRQAAgZgPgRQgPgQgggBQgVAAgUALQgUALgUAUIgXgWQAWgXAagOQAagOAhgBQAuABAaAXQAaAXAAAoQAAAWgLASQgKAQgPAOIgdAbQgOANgIAQQgHAQADAXg");
	this.shape_10.setTransform(1117.925,516.3);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#51C1E1").s().p("AC5DBIgJgRIhTAGIhQAGIhDAFIgFgfIA2gDIBAgEIAAhKIhgAAIAAh+IBgAAIAAgtIhVAAIAAh2IDMAAIAAB2IhXAAIAAAtIBkAAIAAB+IhkAAIAABIIAjgDIAkgCIgQgXIgPgWIAbgLIAZAjQAMATAKASQAJASAFAOIgbANIgHgQgABbA2IBGAAIAAhIIhGAAgAgIA2IBDAAIAAhIIhDAAgAACh2ICRAAIAAg/IiRAAgAi3DJIgDgPQgCgJgEgGIAgACIAUAAQAGABADgBQAEgBAEgEQAEgEAEgOQAEgPADgbQADgbADgsIh1AAIAHgpIAHgxQADgaABgWIBpAAIAAhOIh1AAIAAgdICTAAIAACIIhtAAIgEAqIgFAmIBzAAIgBAGIAAAJQgEA2gDAiQgEAigFASQgFASgGAHQgGAHgIADQgHADgJABIgYAAIgggBg");
	this.shape_11.setTransform(1082.1,517.725);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#51C1E1").s().p("AiRDfIAAjTIEoAAIAADSIghAAIAAgSIjoAAIAAATgAhyCxIDoAAIAAg5IjoAAgAhyBeIDoAAIAAg2IjoAAgAjVgeIAAgeIB8AAQgEgRgHgTQgJgUgJgRIAegHQAHAMAHANQAGANAFANQAFANADALIgVAFICDAAIANgaIANgdIAKgbIAjAJIgSAlIgTAkIB9AAIAAAegAi6iQIAAgdICxAAQgDgKgFgMIgMgUIAfgHQAIAMAGANQAGAMAEAMICkAAIAAAdg");
	this.shape_12.setTransform(1033.5,516.1);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#51C1E1").s().p("AjKDTIgNgLQAagaANgdQANgeAEgdQAEgeAAgZIAAhAIFTAAIAACeIgfAAIAAgZIkbAAQgFAhgPAfQgOAfgbAbQgDgFgIgGgAAYBIICBAAIAAhNIiBAAgAh7AfIgBAUIgBAVIB3AAIAAhNIh1AAgAimhIIAAgcICfAAIAAgzIi8AAIAAgcIC8AAIAAgqIAgAAIAAAqIC/AAIAAAcIi/AAIAAAzICqAAIAAAcg");
	this.shape_13.setTransform(984.175,516.3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#51C1E1").s().p("AgQDcIAAksIAfAAIAAEsgACBgpQgjgXgggeQgggdgeglQgnAzg0ApQgyAqg6AbIgKgPIgNgNQAugUAqgeQAqgeAkgjQAjglAYgoIAcANIgHALIgGAKQAsA2AzAmQAzAmA7AdIgMANQgHAHgEAIQgmgUghgXg");
	this.shape_14.setTransform(936.9,516.25);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#51C1E1").s().p("AhqDHIgLgKQAbgeAPgkQAPgkAFgmIgkAAIAAgcIApAAIADgsIABgrIgtAAIAAgcIAtAAIAAhVIgsAAIAAgcICOAAIAAARIgBCsIgBBwQgCArgDAWQgCAXgEAHQgGAJgGAEQgHAEgIABIgVABIgYgBQAAgHgCgIQgCgIgDgGIAYABIAQAAQAEAAADgCQAEgBACgGQACgFACgNQACgOACgZIAChAIgzAAQgGArgRAqQgQApgeAjQgDgFgGgGgAgTgXIgEAsIAvAAIAAgnIAAgwIgqAAIgBArgAgSheIAqAAIABhVIgrAAgABUDRIAAmgIBlAAIAEgCIAVAMIgPAxIgRA0IgRAwQAaAiAJAdQAJAeAAAaQAAAUgEAQQgFAQgJAHQgFAEgFACIgNADIgOABIgPAAIgCgOQgCgIgEgGIAOAAIAMAAIAIgBIAHgEQAFgEADgLQACgLAAgOQAAgXgJgcQgJgbgZgiIAPgtIANgvIAMgrIg/AAIAAGFgAjRCAIAAk4IBkAAIAAEIIhKAAIAAAwgAi3AyIAvAAIAAjMIgvAAg");
	this.shape_15.setTransform(889,517.425);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#51C1E1").s().p("ABxDbIAAj7IhjAAQAAAlgFAtQgFAsgNAsQgOAsgZAjIgNgLQgJgGgGgDQAagkANgqQAMgqAEgqQADgqAAglIAAh+QAggGAhgIQAhgHAdgJQAdgJAVgJIAcAZQgYAJgcAIQgdAJgfAHIg9ANIAABTIDDAAIAAAgIhAAAIAAD7gAjQCLIAAk7ICCAAIAAEWIhkAAIAAAlgAiyBHIBEAAIAAjYIhEAAg");
	this.shape_16.setTransform(840.725,516.325);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#51C1E1").s().p("AjaASIAAgiIG1AAIAAAig");
	this.shape_17.setTransform(791.775,515.8);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#51C1E1").s().p("ABxDbIAAj7IhjAAQAAAlgFAtQgFAsgNAsQgOAsgZAjIgNgLQgJgGgGgDQAagkANgqQAMgqAEgqQADgqAAglIAAh+QAggGAhgIQAhgHAdgJQAdgJAVgJIAcAZQgYAJgcAIQgdAJgfAHIg9ANIAABTIDDAAIAAAgIhAAAIAAD7gAjQCLIAAk7ICCAAIAAEWIhkAAIAAAlgAiyBHIBEAAIAAjYIhEAAg");
	this.shape_18.setTransform(744.025,516.325);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#51C1E1").s().p("AgUAXQgIgJgBgNQABgOAIgJQAJgIALgBQANABAIAIQAJAJAAAOQAAANgJAJQgIAIgNAAQgLAAgJgIg");
	this.shape_19.setTransform(701.925,532.1);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#51C1E1").s().p("AheCxIAAghIBPAAIAAkOIg+AAIAAgaQAWgEASgFQASgHANgIIAdAAIAAFAIBIAAIAAAhg");
	this.shape_20.setTransform(682.675,516.9);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#E28623").s().p("ABQDZQgBgMgEgOQgFgNgGgLIAhACIAYAAIAKgBQAEgCAEgEQADgDADgKIAFgcIhBAZIg7AWIgTgyIAqgLIAxgQQgSgIgVgJIgpgOIAUgoQAQAFARAGQASAFAQAHIAcAMIgOAdIAjgLIACg7IiJAAIAEgpIADgyIABgwIB7AAIAAgpIiDAAIAAgyIC9AAIAACOIh+AAIgBAVIgCATICHAAIAAAFIAAAKIAAAJQgCBCgDArQgEAqgEAWQgFAXgHAJQgJAKgJAFQgKAEgNACQgMABgSAAIgmAAgAh+DVQAAgMgEgOQgEgOgHgLIAYABIARABQAGAAADgCQAEgBADgEQACgDACgIQADgHACgNQgfAMgfAKIg6AVIgSgyIAsgMIA2gQIgogRIgpgPIAUgnIAhAKIAiANIAbALIgOAeIAbgIIACgcIACgiIiBAAIAEgpIADgyIACgwIByAAIAAgpIh+AAIAAgyIC4AAIAACOIh3AAIgBAVIgBATICAAAIgBAFIAAAJIAAAKQgDBBgEApQgEAqgFAWQgFAXgHAHQgIALgIAEQgJAFgKABIgYACIggAAg");
	this.shape_21.setTransform(934.125,404.95);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#E28623").s().p("ACtDJIgGgRIhOAHIhLAGIhBAEIgGg4IAzgCIA6gEIAAgyIhYAAIAAiMIBYAAIAAghIhOAAIAAiCIDSAAIAACCIhOAAIAAAhIBdAAIAACMIgWAAIAVAkQAJATAJASQAHATAFAOIgzAVIgEgPgABqCJIAngCIgIgRIgJgPIAogOIg+AAgABqAqIAoAAIAAgvIgoAAgAAMAqIAoAAIAAgvIgoAAgAAYiDIBqAAIAAglIhqAAgAi4DRQAAgMgEgPQgFgOgGgMIAcACIAUAAIAJgBQAEgBADgDQAGgGAFgWQADgYAEgvIhPAAIAAAAIgfAAIAHgyIAHg4IAFg4IBeAAIAAg2IhoAAIAAg1ICeAAIAACfIhlAAIgEAeIgDAcIBtAAIAAAEIAAAKIgBAIQgDA1gDAhQgEAhgFAUQgEATgHAHQgIAJgKAEQgIAEgMACQgKABgQABIgigBg");
	this.shape_22.setTransform(886.7,405.65);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#E28623").s().p("AA3DfQgBgMgFgQQgFgPgIgNQAYACATAAIAdABQAHAAAFgCQAFgCAEgEQAHgIAFgcQAFgdADg3IAGiKIhnAAQgKAWgLATQgKAUgMAPIgQgNIgUgOIAADhIiBAAIAAAjIg0AAIAAlmIA2AAQAFgTAEgUQAEgVABgSIA/AJIgMAkIgNAhIBLAAIAABOQAOgUAMgZQALgaAKgcQAKgcAHgcIA3AMIgJAfIgKAfICIAAIAAAFIAAALIAAAKIgFCIQgDA5gDAlQgDAkgFAVQgFAVgIAJQgKAOgLAFQgLAGgOACQgOACgUAAIgqgBgAicB/IBNAAIAAheIhNAAgAicgQIBNAAIAAhPIhNAAgAA+BDIgYgnIgZglIAtgaIAaAjIAZAmQAMATAIAOIgxAeQgHgPgLgTg");
	this.shape_23.setTransform(838.525,403.975);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#E28623").s().p("AicDlIAAjeIE+AAIAADdIg9AAIAAgQIjHAAIAAARgAhiCkIDHAAIAAgiIjHAAgAhiBWIDHAAIAAgfIjHAAgAjYgWIAAgzIBqAAIgIgaQgFgNgGgMIAvgIIhrAAIAAg0ICjAAIgHgSIgIgQIA7gKQAHAKAFAMIAJAWICbAAIAAA0IhkAAIAtAJIgMAaIgNAYIBnAAIAAAzgAg4hnQAGAQADAOIBjAAIALgeQAGgPAEgOIiQAAQAIANAHAQg");
	this.shape_24.setTransform(789.725,403.95);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#E28623").s().p("AgGAmIgkglIgjggIAygrQASAOASATIAmAmQASASANAQIg0AsQgPgSgRgTg");
	this.shape_25.setTransform(726.925,418.375);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#E28623").s().p("AjdAfIAAg9IG7AAIAAA9g");
	this.shape_26.setTransform(693.025,403.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(297));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1623.5,902.5,-343.5999999999999,-203.10000000000002);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#F7C677",
	opacity: 0.00,
	manifest: [
		{src:"sounds/yx12160101听辨声音强.mp3?1693896200381", id:"yx12160101听辨声音强"},
		{src:"sounds/yx12160102听辨音强.mp3?1693896200381", id:"yx12160102听辨音强"}
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