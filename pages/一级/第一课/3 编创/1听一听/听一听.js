(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"听一听_atlas_P_1", frames: [[0,0,900,738],[902,0,800,800]]}
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



(lib.小溪 = function() {
	this.initialize(ss["听一听_atlas_P_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib._1蝉鸣 = function() {
	this.initialize(ss["听一听_atlas_P_1"]);
	this.gotoAndStop(1);
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
	this.shape.setTransform(73.6456,46.5396,3.0689,3.0689);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_1.setTransform(56.9455,46.5779,3.0689,3.0689);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_2.setTransform(40.1397,46.5304,3.0689,3.0689);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgYAYQgKgJAAgPQAAgOAKgKQALgKANAAQAOAAAKAKQALAKAAAOQAAAPgLAJQgKALgOAAQgNAAgLgLg");
	this.shape_3.setTransform(22.5154,46.5524,3.0689,3.0689);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AmLGMQikikAAjoQAAjnCkikQCkikDnAAQDoAACkCkQClCkgBDnQABDoilCkQikCljogBQjnABikilg");
	this.shape_4.setTransform(48.1,45.85);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.9,-10.2,112.10000000000001,112.10000000000001);


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
	this.shape.setTransform(15.7662,51.9795,3.0695,3.0695);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_1.setTransform(33.4493,52.0035,3.0697,3.0697);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_2.setTransform(50.2984,52.0828,3.0698,3.0698);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgkCDQgCgEABgEQAAgEAEgCQAYgRANggQAOgfAAglQAAgkgOgfQgNgfgXgSQgEgCAAgEQgBgEACgEQADgDAEgBQAEAAADACQAbAUAQAkQAQAjAAApQAAAqgQAkQgRAjgbAUQgDACgCAAQgGAAgDgEg");
	this.shape_3.setTransform(67.0433,52.0762,3.0699,3.0699);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape,p:{scaleX:3.0695,scaleY:3.0695,x:15.7662,y:51.9795}}]}).to({state:[{t:this.shape,p:{scaleX:3.0697,scaleY:3.0697,x:15.8207,y:52.0255}},{t:this.shape_1,p:{scaleX:3.0697,scaleY:3.0697,x:33.4493,y:52.0035}}]},8).to({state:[{t:this.shape,p:{scaleX:3.0698,scaleY:3.0698,x:15.8584,y:52.0572}},{t:this.shape_1,p:{scaleX:3.0698,scaleY:3.0698,x:33.4878,y:52.0353}},{t:this.shape_2,p:{scaleX:3.0698,scaleY:3.0698,x:50.2984,y:52.0828}}]},9).to({state:[{t:this.shape,p:{scaleX:3.0699,scaleY:3.0699,x:15.8961,y:52.089}},{t:this.shape_1,p:{scaleX:3.0699,scaleY:3.0699,x:33.5262,y:52.0671}},{t:this.shape_2,p:{scaleX:3.0699,scaleY:3.0699,x:50.3376,y:52.1146}},{t:this.shape_3}]},9).wait(8));

	// 图层_3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AmMGMQikikAAjoQAAjnCkilQClikDnAAQDoAACkCkQClClAADnQAADoilCkQikCljoAAQjnAAililg");
	this.shape_4.setTransform(42.2,52);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(34));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.8,-4,112.1,112.1);


(lib.元件31 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AgTAUQgIgJAAgLQAAgKAIgJQAJgIAKAAQALAAAJAIQAIAJAAAKQAAALgIAJQgJAIgLAAQgKAAgJgIg");
	this.shape.setTransform(2.8,2.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件31, new cjs.Rectangle(0,0,5.6,5.6), null);


(lib.元件29 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AvPCSQgBgKAAgLQAAhGAxgyQAygxBGAAQA5AAAsAhQAJgwAlglQAygxBGAAQBGAAAxAxQAhAhALApQALgBALAAQBGAAAxAwIAQASQAegUAlgEQALgBALAAIASABQAMggAagaQAPgPAQgKQAfgTAkgEQAKgCALAAQAjAAAeANIAOgKQAfgUAlgEQAKgBALAAQA5AAArAgIAOgLIAOgKQAegUAlgEQALgBALAAQBGAAAxAxQAPAPALARIALgIQAegUAlgEQALgBALAAQAwAAAmAXQANgEANgBQALgCALAAIAJABQBAACAuAvQAyAxAABGQAAAQgCAPIABAHg");
	this.shape.setTransform(97.725,14.625);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件29, new cjs.Rectangle(0,0,195.5,29.3), null);


(lib.元件28 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFFF").s().p("AjiDZQgDgCgBgGQgCgHgCgQIgGhwQgEhAgHgrIgKg4QgHgigCgYQgCgYAGgDQAHgDADAZQALBNAOBJIgFiPQgBgVAFgDQAEgDAEAVIALA9IABhIQAAgQADgGQAEgHAFAJIAHASQAFAVAMAaIAUAqQAJAXATA9QAFgzgGg3QgCgSABgGQABgPAGAAQAFABADAUQAHAjANAWIgJhBQgDgaAGgFQAFgEAHATQAOAuATAmQACgGgBgKIgCgRIAAgRQABgJADgDQAEgCAFAHQAOAQAWArIARAgIgGglQgFgsABgRQgBgIADACIAIAKIAIAQIAHAQIAIAPQgGgngNgtQgEgUAEADQAIAEAJAZIAaA+QgDgXgLghQgIgUACgBQAEgCAIAOQAEAGAHARQAWA0AdAwIgYhUIgIgsQgEgagHgUIgEgSQgBgKAGAGQAFAFAHAPIAjBEIgXg8QgHgUAFACQAEACAKAUIBBCGIg4iQQgLgYAHACQAEABAKAXQALAXAMAhIAVA2QAPApAbA3IADAGIAJAVIAoBVQAHAPACAHQACAFgBADQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBAAQgGgDgPgcIhei5IAoBlQAIAWgEgBQgFgBgHgNIgJgTQglhfg0hhQAGAbAPAsQAIAZAVA1QAGASgEABQgCABgGgJQgFgGgCgGQAJAeACANQACALgFgEQgFgEgKgRIgxhcQAGAWAFAbQACALgDABQgDAAgGgJQgGgJgFgLIgHgSQgEgMgFgIIALAtQACAKgBACQgBADgGgGIgMgPIgJgTIgKgSQgBAKADAcIAIA3IACAEIAAAGIACAVQgBABAAAAQgBABgBAAQAAAAgBAAQAAAAgBAAQgDgBgHgMIgihDQgPgbgIgKIgBAVIgBATQgCALgDAGQgEAIgEgDQgDgCgDgJIgRgtQgBAIACAMIADAUQABALgCAKQgCAJgEABQgDAAgFgKQgNgbgIgWIgCBjQgBATgEAEQgFAFgFgKQgIgOgIglQACAKgCAJQgDAMgEgBQgFAAgEgTQgKg2gGgaQgKgtgMgaQgCBoAPBiQADAOgBAHQgBAOgEACQgGABgFgWIgRhpIABDGQABAegIAEIgCAAQAAAAAAAAQgBAAAAAAQAAgBgBAAQAAAAAAgBg");
	this.shape.setTransform(27.1417,21.9339);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件28, new cjs.Rectangle(0,0,54.3,43.9), null);


(lib.元件22 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#F3A94D").s().p("AgfgPIACgGIA9AeIgQANg");
	this.shape.setTransform(20.9377,32.9128,3.7715,3.7715);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F3A94D").s().p("AgGAtIgMhWIAGgFIAfBdg");
	this.shape_1.setTransform(7.1718,50.0731,3.7715,3.7715);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F3A94D").s().p("AgxAMIBigdIgIAZIhWAKg");
	this.shape_2.setTransform(29.235,6.8896,3.7715,3.7715);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件22, new cjs.Rectangle(0,0,47.9,67.7), null);


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
p.nominalBounds = new cjs.Rectangle(-13.8,-4,112.1,112.1);


(lib.元件30 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_2_复制_复制
	this.instance = new lib.元件31();
	this.instance.setTransform(157.85,5.75,1,1,0,0,0,2.8,2.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(8).to({_off:false},0).wait(1).to({scaleX:0.9762,scaleY:0.9762,x:158.75,y:3.65,alpha:0.9444},0).wait(1).to({scaleX:0.9524,scaleY:0.9524,x:159.5,y:1.4,alpha:0.8889},0).wait(1).to({scaleX:0.9286,scaleY:0.9286,x:160.25,y:-1.1,alpha:0.8333},0).wait(1).to({scaleX:0.9048,scaleY:0.9048,x:160.9,y:-3.75,alpha:0.7778},0).wait(1).to({scaleX:0.881,scaleY:0.881,x:161.4,y:-6.65,alpha:0.7222},0).wait(1).to({scaleX:0.8571,scaleY:0.8571,x:161.85,y:-9.65,alpha:0.6667},0).wait(1).to({scaleX:0.8333,scaleY:0.8333,x:162.15,y:-12.8,alpha:0.6111},0).wait(1).to({scaleX:0.8095,scaleY:0.8095,x:162.3,y:-16.2,alpha:0.5556},0).wait(1).to({scaleX:0.7857,scaleY:0.7857,x:162.4,y:-19.6,alpha:0.5},0).wait(1).to({scaleX:0.7619,scaleY:0.7619,x:162.35,y:-23.2,alpha:0.4444},0).wait(1).to({scaleX:0.7381,scaleY:0.7381,x:162.05,y:-26.9,alpha:0.3889},0).wait(1).to({scaleX:0.7143,scaleY:0.7143,x:161.7,y:-30.7,alpha:0.3333},0).wait(1).to({scaleX:0.6905,scaleY:0.6905,x:161.2,y:-34.55,alpha:0.2778},0).wait(1).to({scaleX:0.6667,scaleY:0.6667,x:160.45,y:-38.5,alpha:0.2222},0).wait(1).to({scaleX:0.6429,scaleY:0.6429,x:159.6,y:-42.5,alpha:0.1667},0).wait(1).to({scaleX:0.619,scaleY:0.619,x:158.55,y:-46.55,alpha:0.1111},0).wait(1).to({scaleX:0.5952,scaleY:0.5952,x:157.25,y:-50.65,alpha:0.0556},0).wait(1).to({scaleX:0.5714,scaleY:0.5714,x:155.85,y:-54.75,alpha:0},0).wait(9).to({_off:true},1).wait(3));

	// 图层_2_复制
	this.instance_1 = new lib.元件31();
	this.instance_1.setTransform(84.15,13.4,1,1,0,0,0,2.8,2.8);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(11).to({_off:false},0).wait(1).to({scaleX:0.9762,scaleY:0.9762,x:83.05,y:11.3,alpha:0.9444},0).wait(1).to({scaleX:0.9524,scaleY:0.9524,x:82.3,y:9,alpha:0.8889},0).wait(1).to({scaleX:0.9286,scaleY:0.9286,x:81.8,y:6.65,alpha:0.8333},0).wait(1).to({scaleX:0.9048,scaleY:0.9048,x:81.6,y:4.25,alpha:0.7778},0).wait(1).to({scaleX:0.881,scaleY:0.881,x:81.5,y:1.9,alpha:0.7222},0).wait(1).to({scaleX:0.8571,scaleY:0.8571,x:81.75,y:-0.5,alpha:0.6667},0).wait(1).to({scaleX:0.8333,scaleY:0.8333,x:82.15,y:-2.85,alpha:0.6111},0).wait(1).to({scaleX:0.8095,scaleY:0.8095,x:82.8,y:-5.15,alpha:0.5556},0).wait(1).to({scaleX:0.7857,scaleY:0.7857,x:83.75,y:-7.35,alpha:0.5},0).wait(1).to({scaleX:0.7619,scaleY:0.7619,x:84.9,y:-9.45,alpha:0.4444},0).wait(1).to({scaleX:0.7381,scaleY:0.7381,x:86.05,y:-11.55,alpha:0.3889},0).wait(1).to({scaleX:0.7143,scaleY:0.7143,x:87.35,y:-13.6,alpha:0.3333},0).wait(1).to({scaleX:0.6905,scaleY:0.6905,x:88.6,y:-15.65,alpha:0.2778},0).wait(1).to({scaleX:0.6667,scaleY:0.6667,x:89.85,y:-17.7,alpha:0.2222},0).wait(1).to({scaleX:0.6429,scaleY:0.6429,x:91.2,y:-19.7,alpha:0.1667},0).wait(1).to({scaleX:0.619,scaleY:0.619,x:92.55,y:-21.65,alpha:0.1111},0).wait(1).to({scaleX:0.5952,scaleY:0.5952,x:93.9,y:-23.7,alpha:0.0556},0).wait(1).to({scaleX:0.5714,scaleY:0.5714,x:95.3,y:-25.55,alpha:0},0).wait(10));

	// 图层_2
	this.instance_2 = new lib.元件31();
	this.instance_2.setTransform(18.45,6.5,1,1,0,0,0,2.8,2.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({scaleX:0.9796,scaleY:0.9796,x:20.05,y:5.3,alpha:0.9524},0).wait(1).to({scaleX:0.9592,scaleY:0.9592,x:21.65,y:3.85,alpha:0.9048},0).wait(1).to({scaleX:0.9388,scaleY:0.9388,x:23.15,y:2.35,alpha:0.8571},0).wait(1).to({scaleX:0.9184,scaleY:0.9184,x:24.45,y:0.75,alpha:0.8095},0).wait(1).to({scaleX:0.898,scaleY:0.898,x:25.6,y:-0.95,alpha:0.7619},0).wait(1).to({scaleX:0.8776,scaleY:0.8776,x:26.75,y:-2.75,alpha:0.7143},0).wait(1).to({scaleX:0.8571,scaleY:0.8571,x:27.85,y:-4.6,alpha:0.6667},0).wait(1).to({scaleX:0.8367,scaleY:0.8367,x:28.85,y:-6.45,alpha:0.619},0).wait(1).to({scaleX:0.8163,scaleY:0.8163,x:29.8,y:-8.3,alpha:0.5714},0).wait(1).to({scaleX:0.7959,scaleY:0.7959,x:30.65,y:-10.2,alpha:0.5238},0).wait(1).to({scaleX:0.7755,scaleY:0.7755,x:31.45,y:-12.15,alpha:0.4762},0).wait(1).to({scaleX:0.7551,scaleY:0.7551,x:32.3,y:-14.1,alpha:0.4286},0).wait(1).to({scaleX:0.7347,scaleY:0.7347,x:33.2,y:-16,alpha:0.381},0).wait(1).to({scaleX:0.7143,scaleY:0.7143,x:34.1,y:-17.9,alpha:0.3333},0).wait(1).to({scaleX:0.6939,scaleY:0.6939,x:35,y:-19.75,alpha:0.2857},0).wait(1).to({scaleX:0.6735,scaleY:0.6735,x:35.95,y:-21.65,alpha:0.2381},0).wait(1).to({scaleX:0.6531,scaleY:0.6531,x:36.9,y:-23.55,alpha:0.1905},0).wait(1).to({scaleX:0.6327,scaleY:0.6327,x:37.8,y:-25.45,alpha:0.1429},0).wait(1).to({scaleX:0.6122,scaleY:0.6122,x:38.8,y:-27.3,alpha:0.0952},0).wait(1).to({scaleX:0.5918,scaleY:0.5918,x:39.75,y:-29.15,alpha:0.0476},0).wait(1).to({scaleX:0.5714,scaleY:0.5714,x:40.8,y:-30.95,alpha:0},0).wait(18));

	// 图层_1
	this.instance_3 = new lib.元件29();
	this.instance_3.setTransform(97.7,20.2,1,0.6906,0,0,0,97.7,29.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regY:14.6,scaleY:0.6985,y:10.05},0).wait(1).to({scaleY:0.7064,y:9.9},0).wait(1).to({scaleY:0.7142,y:9.85},0).wait(1).to({scaleY:0.7221,y:9.7},0).wait(1).to({scaleY:0.73,y:9.55},0).wait(1).to({scaleY:0.7379,y:9.45},0).wait(1).to({scaleY:0.7458,y:9.35},0).wait(1).to({scaleY:0.7537,y:9.25},0).wait(1).to({scaleY:0.7615,y:9.1},0).wait(1).to({scaleY:0.7694,y:9},0).wait(1).to({scaleY:0.7773,y:8.9},0).wait(1).to({scaleY:0.7852,y:8.75},0).wait(1).to({scaleY:0.7931,y:8.7},0).wait(1).to({scaleY:0.8009,y:8.55},0).wait(1).to({scaleY:0.8088,y:8.4},0).wait(1).to({scaleY:0.8167,y:8.3},0).wait(1).to({scaleY:0.8246,y:8.2},0).wait(1).to({scaleY:0.8325,y:8.1},0).wait(1).to({scaleY:0.8404,y:7.95},0).wait(1).to({scaleY:0.8482,y:7.85},0).wait(1).to({scaleY:0.8561,y:7.75},0).wait(1).to({scaleY:0.8464,y:7.9},0).wait(1).to({scaleY:0.8367,y:8},0).wait(1).to({scaleY:0.8269,y:8.15},0).wait(1).to({scaleY:0.8172,y:8.35},0).wait(1).to({scaleY:0.8074,y:8.45},0).wait(1).to({scaleY:0.7977,y:8.6},0).wait(1).to({scaleY:0.788,y:8.75},0).wait(1).to({scaleY:0.7782,y:8.85},0).wait(1).to({scaleY:0.7685,y:9},0).wait(1).to({scaleY:0.7588,y:9.2},0).wait(1).to({scaleY:0.749,y:9.3},0).wait(1).to({scaleY:0.7393,y:9.45},0).wait(1).to({scaleY:0.7295,y:9.6},0).wait(1).to({scaleY:0.7198,y:9.7},0).wait(1).to({scaleY:0.7101,y:9.85},0).wait(1).to({scaleY:0.7003,y:10},0).wait(1).to({scaleY:0.6906,y:10.1},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-56.3,195.5,76.69999999999999);


(lib.元件27 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.元件28();
	this.instance.setTransform(27.2,21.9,1,1,0,0,0,27.2,21.9);
	this.instance.alpha = 0.6797;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:27.1,x:27.1,y:22.15,alpha:0.6508},0).wait(1).to({y:22.4,alpha:0.6217},0).wait(1).to({y:22.65,alpha:0.5925},0).wait(1).to({y:22.95,alpha:0.5633},0).wait(1).to({y:23.2,alpha:0.5342},0).wait(1).to({y:23.45,alpha:0.505},0).wait(1).to({y:23.7,alpha:0.4758},0).wait(1).to({y:24,alpha:0.4467},0).wait(1).to({y:24.25,alpha:0.4175},0).wait(1).to({y:24.5,alpha:0.3883},0).wait(1).to({y:24.75,alpha:0.3592},0).wait(1).to({y:25.05,alpha:0.33},0).wait(1).to({y:24.75,alpha:0.3582},0).wait(1).to({y:24.45,alpha:0.3864},0).wait(1).to({y:24.15,alpha:0.4145},0).wait(1).to({y:23.9,alpha:0.4427},0).wait(1).to({y:23.6,alpha:0.4709},0).wait(1).to({y:23.3,alpha:0.4991},0).wait(1).to({y:23,alpha:0.5273},0).wait(1).to({y:22.75,alpha:0.5555},0).wait(1).to({y:22.45,alpha:0.5836},0).wait(1).to({y:22.15,alpha:0.6118},0).wait(1).to({y:21.9,alpha:0.64},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,54.3,47);


(lib.元件18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_2
	this.instance = new lib.元件22();
	this.instance.setTransform(135.9,96.2,1,1,0,0,0,23.9,33.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:24,scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.4655,scaleY:1.5495,x:148.65,y:103.05},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1,scaleY:1,x:136,y:96.2},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.4655,scaleY:1.5495,x:148.65,y:103.05},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1,scaleY:1,x:136,y:96.2},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.4655,scaleY:1.5495,x:148.65,y:103.05},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1,scaleY:1,x:136,y:96.2},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.4655,scaleY:1.5495,x:148.65,y:103.05},0).wait(1).to({scaleX:1.388,scaleY:1.4579,x:146.55,y:101.85},0).wait(1).to({scaleX:1.3104,scaleY:1.3663,x:144.45,y:100.7},0).wait(1).to({scaleX:1.2328,scaleY:1.2747,x:142.35,y:99.6},0).wait(1).to({scaleX:1.1552,scaleY:1.1832,x:140.2,y:98.45},0).wait(1).to({scaleX:1.0776,scaleY:1.0916,x:138.1,y:97.3},0).wait(1).to({scaleX:1,scaleY:1,x:136,y:96.2},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(112,50.5,71.80000000000001,104.9);


// stage content:
(lib.听一听 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:4,m2:163};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,5,160,163,164,330];
	this.streamSoundSymbolsList[5] = [{id:"蝉鸣",startFrame:5,endFrame:160,loop:1,offset:0}];
	this.streamSoundSymbolsList[164] = [{id:"小溪_1",startFrame:164,endFrame:331,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		
		var _this = this;
		
		_this.m1_btn.on('click', function(){
		
		_this.gotoAndPlay('m1');
		});
		
		
		
		_this.m2_btn.on('click', function(){
		
		_this.gotoAndPlay('m2');
			
		});
	}
	this.frame_4 = function() {
		var _this = this;
		
		_this.m1stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav1');
		});
	}
	this.frame_5 = function() {
		var soundInstance = playSound("蝉鸣",0);
		this.InsertIntoSoundStreamData(soundInstance,5,160,1);
	}
	this.frame_160 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_163 = function() {
		var _this = this;
		
		_this.m2stop_btn.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_164 = function() {
		var soundInstance = playSound("小溪_1",0);
		this.InsertIntoSoundStreamData(soundInstance,164,331,1);
	}
	this.frame_330 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(155).call(this.frame_160).wait(3).call(this.frame_163).wait(1).call(this.frame_164).wait(166).call(this.frame_330).wait(1));

	// 音频停止
	this.m1stop_btn = new lib.音频停止();
	this.m1stop_btn.name = "m1stop_btn";
	this.m1stop_btn.setTransform(171.55,459.7,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m1stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m2stop_btn = new lib.音频停止();
	this.m2stop_btn.name = "m2stop_btn";
	this.m2stop_btn.setTransform(1087.6,459.6,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m2stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1stop_btn}]},4).to({state:[]},156).to({state:[{t:this.m2stop_btn}]},3).to({state:[]},167).wait(1));

	// 播放按钮
	this.m1_btn = new lib.音频播放标();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(122.75,413.2);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m2_btn = new lib.音频播放标();
	this.m2_btn.name = "m2_btn";
	this.m2_btn.setTransform(1038.95,413.2);
	new cjs.ButtonHelper(this.m2_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m2_btn},{t:this.m1_btn}]}).wait(331));

	// 边框和标题
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#F29539").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape.setTransform(503.925,682.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#51C1E1").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape_1.setTransform(1418.525,682.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(331));

	// 右侧 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg1JAi9QjDAAiKiKQiLiMAAjEMAAAg3GQAAjECLiLQCKiLDDABMBqTAAAQDDgBCKCLQCLCLAADEMAAAA3GQAADEiLCMQiKCKjDAAg");
	mask.setTransform(1418.525,682.55);

	// 图层_9
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(255,255,255,0.31)").s().p("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");
	this.shape_2.setTransform(1424.9283,707.5659);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AvPBlIgBgPQAAgwAxgiQAugfA+gDIgBgGQAAgLAIgIQAJgJALAAQAMAAAIAJQAIAIAAALQAAAFgBAEQAgAGAbAOQAJgiAlgZQAygiBGAAQBGAAAxAiQAhAXALAcIAWgBQBGABAxAgIAQAMQAegNAlgCIAWgBIASAAQAMgWAagSQAPgKAQgHQAfgNAkgDIAVgBQAjAAAeAIIAOgHQAfgNAlgCIAVgBQA5AAArAWIAOgIIAOgHQAegOAlgCIAWgBQBGAAAxAiQAPALALALIALgGQAegNAlgDIAWgBQAwAAAmAQQANgCANgBIAWgCIAJAAQBAADAuAfQAyAiAAAwQAAAMgCAKIABAFg");
	this.shape_3.setTransform(1416.475,907.8);

	this.instance = new lib.元件27();
	this.instance.setTransform(1471.05,838.8,0.8336,0.651,14.9978,0,0,27.2,22.1);
	this.instance.alpha = 0.4219;

	this.instance_1 = new lib.元件30();
	this.instance_1.setTransform(1416.45,907.75,1,1,0,0,0,97.7,10.1);

	this.instance_2 = new lib.元件27();
	this.instance_2.setTransform(1381.8,577.5,0.8336,0.651,14.9978,0,0,27.2,22.1);
	this.instance_2.alpha = 0.4219;

	var maskedShapeInstanceList = [this.shape_2,this.shape_3,this.instance,this.instance_1,this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},164).wait(167));

	// 图层_3
	this.instance_3 = new lib.小溪();
	this.instance_3.setTransform(1031,361,0.8798,0.7898);

	var maskedShapeInstanceList = [this.instance_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(331));

	// 左侧遮罩 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("Eg1JAi9QjDAAiKiKQiLiMAAjEMAAAg3GQAAjECLiLQCKiLDDABMBqTAAAQDDgBCKCLQCLCLAADEMAAAA3GQAADEiLCMQiKCKjDAAg");
	mask_1.setTransform(503.575,682.55);

	// 图层_5
	this.instance_4 = new lib.元件18("synched",0);
	this.instance_4.setTransform(495.7,652.85,1.4951,1.1587,-44.9995,0,0,45.1,45.2);
	this.instance_4._off = true;

	var maskedShapeInstanceList = [this.instance_4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(5).to({_off:false},0).to({_off:true},155).wait(171));

	// 图层_2
	this.instance_5 = new lib._1蝉鸣();
	this.instance_5.setTransform(194,441,0.6688,0.6688);

	var maskedShapeInstanceList = [this.instance_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(331));

	// title
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3D8D8D").s().p("AgeC1QgLgKgBgRQABgSALgJQALgKAPAAQAPAAALAKQALAJAAASQAAARgLAKQgLAKgPAAQgPAAgLgKgAgXBGQgEgZAHgTQAIgTANgPIAdgdQAPgNAKgOQALgPAAgRQAAgagPgRQgQgRghgBQgWAAgVALQgUALgUAVIgZgWQAXgYAbgPQAbgPAjAAQAvAAAaAZQAbAYABApQgBAXgKARQgLARgPAPIgeAcQgPANgIARQgIARAEAXg");
	this.shape_4.setTransform(1474.625,221.725);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3D8D8D").s().p("AiWDmIAAjZIEyAAIAADYIgiAAIAAgSIjvAAIAAATgAh1C3IDvAAIAAg7IjvAAgAh1BhIDvAAIAAg3IjvAAgAjcgfIAAgeICAAAQgEgSgIgUQgIgVgLgSIAggHQAIAMAGAOQAHAOAFANIAHAZIgVAGICIAAIAOgcIANgeIAKgcIAkAJIgTAnIgTAmICBAAIAAAegAjAiVIAAgeIC3AAQgEgLgFgLIgMgVIAggHQAIALAGAOQAHANAEAMICpAAIAAAeg");
	this.shape_5.setTransform(1437.325,221.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#3D8D8D").s().p("AjRDaIgNgLQAagaAOgfQANgeAEgfQAFgfgBgaIAAhCIFgAAIAACjIghAAIAAgZIkkAAQgGAhgPAhQgPAggbAcQgEgGgIgGgAAZBLICFAAIAAhQIiFAAgAiAAgIAAAVIgCAWIB8AAIAAhQIh6AAgAishLIAAgdIClAAIAAg0IjDAAIAAgdIDDAAIAAgsIAhAAIAAAsIDFAAIAAAdIjFAAIAAA0ICvAAIAAAdg");
	this.shape_6.setTransform(1386.325,221.725);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#3D8D8D").s().p("ACuDFIgRgdIiTAMIhfAJIg4AEIgcAEQgKABgFACIgGgQIgIgSQALgCAQgNQARgMAXgVIAkgiQAXgXAeghQAdgfAggnQAfgmAdgpIAhAQQg6BPg8BCQg+BDg+A1IELgXIgjgxIglgvIAdgOQAYAcAYAfQAYAhAUAeQAUAfANAZIggARIgNgZgAjMgDIgOgLQAlgbAkgjQAkgiAfgmQAegmAUgjIAhANQgYAmgfAnQghAogkAkQgkAkgmAcIgLgMg");
	this.shape_7.setTransform(1337.5,221.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#3D8D8D").s().p("AA5DjIAAj5IiNAAIAAghICNAAIAAioIAiAAIAACoICJAAIAAAhIiJAAIAAD5gAiVDiIAAkgQgPAUgOATQgOASgQAOIgIgPIgLgQQAagZAYghQAYggAUglQAVgmAOgnIAfAJQgKAbgNAaQgNAbgOAZIAAFSg");
	this.shape_8.setTransform(1287.1,221.75);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#3D8D8D").s().p("AjWDNIgOgLQAngaAYgpQAZgrAKg3IAiAEIgHAaQgCANgEAMQAPAjAYAUQAZATAhAIIAAiaIjOAAIAAgeIG2AAIAAAeIjHAAIAAA6ICnAAIAAAfIinAAIAABHQAcADAiAAIATABIAhAAIAmgBIAiAAIAWAAIgHAPIgFAQIiHAAQgzABgmgHQgogHgcgTQgdgTgTgjQgPAfgUAYQgTAYgaATIgLgNgAilg2IAAijIFJAAIAACjgAiEhPIEHAAIAAgsIkHAAgAiEiUIEHAAIAAgrIkHAAg");
	this.shape_9.setTransform(1237.25,222.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#3D8D8D").s().p("AA9DeIgDgQQgDgJgFgHQAZACAUAAIAdABQAHAAAFgBQAFgCAEgFQAGgGAFgTQAEgTAEgjQAEgjACg1IAGiBIiDAAQgLAZgMAXQgLAXgMASIgOgKIgOgJQARgWANgeQAPgdALghQALgiAIgiIAgAHIgKAlIgMAlICYAAIAAARIgGCQQgDA8gEAlQgEAmgGAVQgFAVgHAIQgIAKgJAEQgJAEgMABIghABIgpgCgAjPDdIAAlqIA4AAIAIgbIAIgcIAFgaIAkAHIgNAmQgHATgHARIBVAAIAAFCIiMAAIAAAogAiwCXIBtAAIAAh8IhtAAgAiwgCIBtAAIAAhtIhtAAgABQBAQgMgUgPgVIgdgnIAZgPIAeAmIAdAoQANAUAIAPIgcARQgIgPgNgUg");
	this.shape_10.setTransform(1187.675,221.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#3D8D8D").s().p("ABtDJIgIgRIApABIAZAAQAGgBACgCQACgCAAgGIAAmHIAhAAIAAGHQAAAQgFAJQgEAIgLAEQgLAEgTABQgUACgaAAIgFgRgAjRCrIA1gJIA/gLIAAhXIhiAAIAAgeIBiAAIAAg3IAgAAIAAA3IBlAAIAAAeIhlAAIAABRIA1gKIA0gKIACAdIhYASIhWAQIhKAOgABPB1IAAksIAfAAIAAEsgAAQgiIgLgRIhdAJIg3AGIgbAEIgLAEIgFgPIgHgRQAGgBAGgGIAMgPIAUgeQAOgWANgcIhTAAIAAgeID+AAIAAAeIiGAAQgOAagPAZQgQAZgQAVICHgMIgUgaIgTgZIAYgPIAcAlQAPATAMATQANASAHAOIgZARIgIgPg");
	this.shape_11.setTransform(1136.625,221.525);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#3D8D8D").s().p("AB0DiIAAkDIhmAAQAAAmgGAuQgEAugOAtQgNAugbAlQgGgGgIgGIgOgKQAagkANgsQAMgrAFgsQAEgrgBgmIAAiCIBDgPIBBgRQAdgJAWgJIAdAaQgYAJgeAIQgeAJgfAHIhAANIAABXIDKAAIAAAhIhCAAIAAEDgAjYCPIAAlFICGAAIAAEfIhmAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_12.setTransform(1088,221.75);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#3D8D8D").s().p("AAPDjIgFgRIgHgRIAhABIAUAAQAFAAACgCQABgCAAgFIAAkdIhOAAQgLAagMAWQgNAWgNASIgNgKIgOgLQATgYAQgeQAPgfAMgjQAMgkAIglIAfAIIgMAsQgGAWgHAVIDQAAIAFgBIAWAFIgHAlIgHAlIgIAfIgcgGIAHghIAHgnIhkAAIAAEdQAAAPgEAIQgDAIgKAEQgKAFgQABIgcABIgLAAgAifDiIAAkeQgNATgOAQIgbAfIgIgQIgLgQQAZgYAXggQAYggATglQAUglAOgmIAgAJQgLAcgNAbQgNAbgPAaIAAFPgAhGCWIgPgJQAQgUANgZQANgZAKgdQAKgeAIgdIAfAHQgMAxgSAsQgUAsgXAgIgNgJgAC5BpQgKgdgMgfQgMgegPgaIAegJQAPAaANAeQAMAeAKAdQAKAdAEAXIggAKQgEgXgJgdg");
	this.shape_13.setTransform(1036.625,221.7813);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#3D8D8D").s().p("AguA8QAdgMAQgTQAPgTACgZIgFABIgFAAQgOgBgKgIQgKgJAAgRQAAgQALgJQAKgJAOAAQAUAAAKAPQAKAPAAAaQAAAogXAcQgWAdgmAOg");
	this.shape_14.setTransform(973.525,237.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#3D8D8D").s().p("AhYDXQgGgIgGgFQApgPAXgZQAWgZAKgiQAIgiADgpIhAAAIAAibICXAAIAQggIAPgkIANggIAiALIgVAuIgVArIA0AAIAACbIg+AAIAACSQAAAJADAEQACACAKAAIAtAAQAGAAAEgEQADgEABgOQACgNAAgbIAOAIIAQAFQgBAggFASQgEARgIAHQgJAGgPAAIg1AAQgaABgJgLQgJgKAAgaIAAiSIgvAAQgDAvgLAnQgLAmgZAdQgYAcguATQgDgHgFgGgAgZgBICuAAIAAhgIiuAAgAioC+IgLgOIAMgKQAGgGAFgJQAFgJAAgLIAAipIhKAAIAAggIBsAAIAADJIA6goIAGAPIAFANIg3ApIggAYIgRAOIgIAIQgCgHgGgJgAiHiNIgbgcIgcgbIAWgUQAOAMAOAOIAcAbIAUAXIgXAZQgIgMgMgOgAgBiaIgPgfIgTgdIAcgLQAJANAJAPIARAdQAHAPAEAMIgeANQgEgMgGgOg");
	this.shape_15.setTransform(937.375,221.7);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_16.setTransform(887.325,221.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#3D8D8D").s().p("AhYDXQgGgIgGgFQApgPAXgZQAWgZAKgiQAIgiADgpIhAAAIAAibICXAAIAQggIAPgkIANggIAiALIgVAuIgVArIA0AAIAACbIg+AAIAACSQAAAJADAEQACACAKAAIAtAAQAGAAAEgEQADgEABgOQACgNAAgbIAOAIIAQAFQgBAggFASQgEARgIAHQgJAGgPAAIg1AAQgaABgJgLQgJgKAAgaIAAiSIgvAAQgDAvgLAnQgLAmgZAdQgYAcguATQgDgHgFgGgAgZgBICuAAIAAhgIiuAAgAioC+IgLgOIAMgKQAGgGAFgJQAFgJAAgLIAAipIhKAAIAAggIBsAAIAADJIA6goIAGAPIAFANIg3ApIggAYIgRAOIgIAIQgCgHgGgJgAiHiNIgbgcIgcgbIAWgUQAOAMAOAOIAcAbIAUAXIgXAZQgIgMgMgOgAgBiaIgPgfQgJgPgKgOIAcgLQAJANAJAPIARAdQAHAPAEAMIgeANQgEgMgGgOg");
	this.shape_17.setTransform(837.375,221.7);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#3D8D8D").s().p("AguA8QAdgMAQgTQAPgTACgZIgFABIgFAAQgOgBgKgIQgKgJAAgRQAAgQALgJQAKgJAOAAQAUAAAKAPQAKAPAAAaQAAAogXAcQgWAdgmAOg");
	this.shape_18.setTransform(773.525,237.35);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#3D8D8D").s().p("AB0DiIAAkDIhmAAQAAAmgGAuQgFAugNAtQgOAugaAlQgGgGgIgGIgOgKQAagkANgsQAMgrAFgsQADgrAAgmIAAiCIBDgPIBBgRQAegJAVgJIAdAaQgYAJgeAIQgeAJggAHIg/ANIAABXIDLAAIAAAhIhDAAIAAEDgAjYCPIAAlFICGAAIAAEfIhmAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_19.setTransform(738,221.75);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_20.setTransform(687.325,221.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#3D8D8D").s().p("AB0DiIAAkDIhmAAQAAAmgGAuQgFAugNAtQgNAugbAlQgGgGgIgGIgOgKQAagkANgsQAMgrAFgsQADgrAAgmIAAiCIBDgPIBBgRQAegJAVgJIAdAaQgYAJgeAIQgeAJgfAHIhAANIAABXIDKAAIAAAhIhCAAIAAEDgAjYCPIAAlFICGAAIAAEfIhmAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_21.setTransform(638,221.75);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#3D8D8D").s().p("AgNAIQgegcgbgWIAdgaQASAPAUATQATASATATQAUAVAQATIgfAaQgZgfgcgeg");
	this.shape_22.setTransform(572.075,236.475);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_23.setTransform(537.325,221.2);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(61,141,141,0.098)").s().p("Eg8pAPlQiQAMiZAAQrqAAoPkWQkXiUiEi0Qh0ieAAi5QAAg8AMg4QBEk/G/jrIAtgYQIBj+LLAAQBmAABkAFQAvgbA2gYQBCgdBHgYQE4hrGbAAQGaAAE5BrQBHAYBCAdQBEAfA3AhQDvhSETgjQDQgbDlAAQDlAADQAbQHqA/F5DTIA5AhQBWhPCYhEQFkigH3AAQH3AAFlCgQCBA6BSBDQFbiTHkAAIAZAAQFbADESBPQD/g6EmAAQJwAAG3EEQAmAVAiAYQFyD3AAFPQAAFxm6EFIgKAGQm1D+poAAQnsAAl5ihQhXAOheAAIgoAAQgnAYgpAUQg5Adg+AXQjPBLj7AAQkhAAjnhkQkfCamEAAIgfAAQiTAZiiAJQhWAEhaAAQhbAAhVgEQnEgYlQiWQgmgRghgSQnOC5pYAAQooAAm0icQnFDTpeAAQmcAAlVhig");
	this.shape_24.setTransform(1004,213.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]}).wait(331));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1074.8,644,732.1000000000001,263.29999999999995);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#3D8D8D",
	opacity: 0.00,
	manifest: [
		{src:"images/听一听_atlas_P_1.png?1693881401203", id:"听一听_atlas_P_1"},
		{src:"sounds/小溪_1.mp3?1693881401257", id:"小溪_1"},
		{src:"sounds/蝉鸣_.mp3?1693881401257", id:"蝉鸣"}
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