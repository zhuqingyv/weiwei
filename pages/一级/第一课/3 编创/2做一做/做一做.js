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


(lib.ClipGroup_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AooIBIAAwBIRRAAIAAQBg");
	mask.setTransform(55.325,51.25);

	// 图层_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3F4C5F").s().p("AgFBPQgKgGgDgFIgJAHIgPAHIgKABQgJABgIgDQgKgDgFgFQgJgIgCgJIgDgLQgRgBgJgGQgWgNAAgTQgBgLAJgLQAJgKAXgEQAAgWAMgPQANgRAXgCQAegEAWATQAKgHALgDQAJgCAMABQAMAAAMAHQATAJAIAZQAKAAAIABQAIACAHAEQAPAIAIAQQAKAYgQAWQgHAKgPAIQgIADgJABQgNABgLgCQgGANgMAIQgMAIgPABIgFABQgQAAgNgJg");
	this.shape.setTransform(96.0067,48.3012);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#2B3242").s().p("ABME5QgkgKgXgdQgWAYglAHQgYAFgbgGQgXgGgSgOQgSgOgLgVQgWAZgjALQgbAIgfgEQgjgEgWgTQgVgSgIgfQgFgWAEgUQgSAFgRgDQgZgGgRgXQgQgWgBgYQgBgfAYgbQAZgcAogKQgIgaABgcQABgfAIgUQAMgbAUgRQAZgVAogGQAngGAnAOQAGgTALgVQAUghAagXQAsgmA5gOQAfgHAlABQBLAEA4AmQAaATAUAYQAIALAJARQAHANADAJQASgDARAAQA4ADAgAgIAUAeQASApgKAwIgBAFIgFARQAhAIAUAZQASAWABAgQADAmgTAZQgRAWgdAIQgbAKgcgFQAFAQgBAQQgBALgFAMQgJAUgSAJQgKAGgWADQgYABgTgJQgPgHgJgLQgYA0gwAPQgTAGgSAAQgPAAgOgEg");
	this.shape_1.setTransform(59.3685,31.6519);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#050101").s().p("ABTAEQgNgEgdgBIhTAAQgZABgPADQAAABAAAAQgBAAAAAAQAAgBAAAAQAAAAgBAAQAAAAAAgBQAAAAAAAAQABAAAAAAQAAAAAAgBQAMgCAdgCIBWAAQAbACANADQAAAAAAAAQAAAAABABQAAAAAAAAQAAAAAAAAIgBABIgBAAg");
	this.shape_2.setTransform(31.85,54.5583);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(13.4,0,97.3,63.4), null);


(lib.ClipGroup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AooIBIAAwBIRRAAIAAQBg");
	mask.setTransform(55.325,51.25);

	// 图层_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3F4C5F").s().p("AgWBSQgCADgHAFQgJAGgKACQgSAFgOgFQgPgGgEgEQgJgGgEgOIgDgOQgSAAgOgIQgagPAAgYQAAgQAKgLQAMgNARgDQABgZASgUQATgTAdgEQAkgEAbAXQALgIAOgEQAOgDALABQAPACAOAGQAYANAIAdQALgBAKACQAKACAJAFQAEABAHAHQALAKAFALQAJAVgLAZQgLAWgUAJQgJADgLACQgPACgOgDQgHAPgPAKQgPAKgSABIgGAAQgeAAgVgXg");
	this.shape.setTransform(17.6226,48.375);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(0,37.9,35.3,21), null);


(lib.元件5 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape.setTransform(12.4451,23.0817,4.1556,4.1556);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件5, new cjs.Rectangle(0,0,24.9,46.2), null);


(lib.元件3 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#E6C671").s().p("AgtA3IgLAAIArhWIgcAAIA3h3IBDAAIg/BXIAWAAIg1BOIAWgBIhZCJg");
	this.shape.setTransform(33.9773,63.0511,4.1816,4.1816);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件3, new cjs.Rectangle(0,0,68,126.1), null);


(lib.元件2_1 = function(mode,startPosition,loop,reversed) {
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
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E6C671").s().p("AgqAzIgKAAIAohPIgaAAIAzhvIA/AAIg7BRIAUgBIgxBRIAUgIIhTB+g");
	this.shape_5.setTransform(31.6886,58.6372,4.1816,4.1816);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件2_1, new cjs.Rectangle(0,0,63.4,117.3), null);


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
	this.shape.graphics.f("#E6C671").s().p("AhKBbIgSAAIBGiOIguAAIBbjDIBvAAIhoCPIAjgBIhXCBIAkgBIiTDfg");
	this.shape.setTransform(55.9223,103.3712,4.1816,4.1816);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件1, new cjs.Rectangle(0,0,111.9,206.8), null);


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


(lib.闪电 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// _Clip_Group_
	this.instance = new lib.ClipGroup();
	this.instance.setTransform(91.2,214.1,4.1815,4.1815,0,0,0,54.9,51.2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:17.6,regY:48.4,scaleX:4.1816,scaleY:4.1816,x:-54.5,y:202.4},0).wait(1).to({x:-44.3},0).wait(1).to({x:-34.1},0).wait(1).to({x:-23.9},0).wait(1).to({x:-13.7},0).wait(1).to({x:-3.5},0).wait(1).to({x:6.7},0).wait(1).to({x:16.9},0).wait(1).to({x:27.1},0).wait(1).to({x:37.3},0).wait(1).to({x:47.5},0).wait(123).to({_off:true},1).wait(67));

	// 图层_3
	this.instance_1 = new lib.元件1();
	this.instance_1.setTransform(272,123.3,1,1,0,0,0,55.9,103.4);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(12).to({x:267.65,y:141.3},0).wait(1).to({x:263.3,y:159.35},0).wait(1).to({x:258.95,y:177.4},0).wait(1).to({x:254.6,y:195.45},0).wait(1).to({x:250.25,y:213.45,alpha:0.125},0).wait(1).to({x:245.95,y:231.5,alpha:0.25},0).wait(1).to({x:241.6,y:249.55,alpha:0.375},0).wait(1).to({x:237.25,y:267.6,alpha:0.5},0).wait(1).to({x:232.9,y:285.6,alpha:0.625},0).wait(1).to({x:228.55,y:303.65,alpha:0.75},0).wait(1).to({x:224.2,y:321.7,alpha:0.875},0).wait(1).to({x:219.9,y:339.75,alpha:1},0).wait(1).to({x:221.25,y:333.25},0).wait(1).to({x:222.6,y:326.75},0).wait(1).to({x:223.95,y:320.25},0).wait(1).to({x:225.3,y:313.75},0).wait(1).to({x:224.75,y:316.35},0).wait(1).to({x:224.2,y:318.95},0).wait(1).to({x:223.65,y:321.55},0).wait(1).to({x:223.1,y:324.15},0).wait(1).to({x:222.6,y:326.75},0).wait(1).to({x:222.05,y:329.35},0).wait(1).to({x:221.5,y:331.95},0).wait(1).to({x:220.95,y:334.55},0).wait(1).to({x:220.4,y:337.15},0).wait(1).to({x:219.9,y:339.75},0).wait(10).to({alpha:0.8575},0).wait(1).to({alpha:0.715},0).wait(1).to({alpha:0.5725},0).wait(1).to({alpha:0.43},0).wait(1).to({alpha:0.544},0).wait(1).to({alpha:0.658},0).wait(1).to({alpha:0.772},0).wait(1).to({alpha:0.886},0).wait(1).to({alpha:1},0).wait(2).to({alpha:0.8575},0).wait(1).to({alpha:0.715},0).wait(1).to({alpha:0.5725},0).wait(1).to({alpha:0.43},0).wait(1).to({alpha:0.544},0).wait(1).to({alpha:0.658},0).wait(1).to({alpha:0.772},0).wait(1).to({alpha:0.886},0).wait(1).to({alpha:1},0).wait(11).to({alpha:0.8575},0).wait(1).to({alpha:0.715},0).wait(1).to({alpha:0.5725},0).wait(1).to({alpha:0.43},0).wait(1).to({alpha:0.544},0).wait(1).to({alpha:0.658},0).wait(1).to({alpha:0.772},0).wait(1).to({alpha:0.886},0).wait(1).to({alpha:1},0).wait(2).to({alpha:0.8575},0).wait(1).to({alpha:0.715},0).wait(1).to({alpha:0.5725},0).wait(1).to({alpha:0.43},0).wait(1).to({alpha:0.544},0).wait(1).to({alpha:0.658},0).wait(1).to({alpha:0.772},0).wait(1).to({alpha:0.886},0).wait(1).to({alpha:1},0).wait(40).to({_off:true},1).wait(67));

	// _Clip_Group__1
	this.instance_2 = new lib.ClipGroup_1();
	this.instance_2.setTransform(231.65,214.1,4.1816,4.1816,0,0,0,55.4,51.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(134).to({_off:true},1).wait(67));

	// 图层_5
	this.instance_3 = new lib.元件2_1();
	this.instance_3.setTransform(112.6,285.25,1,1,0,0,0,31.7,58.6);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(29).to({_off:false},0).wait(1).to({alpha:0.0909},0).wait(1).to({alpha:0.1818},0).wait(1).to({alpha:0.2727},0).wait(1).to({alpha:0.3636},0).wait(1).to({alpha:0.4545},0).wait(1).to({alpha:0.5455},0).wait(1).to({alpha:0.6364},0).wait(1).to({alpha:0.7273},0).wait(1).to({alpha:0.8182},0).wait(1).to({alpha:0.9091},0).wait(1).to({alpha:1},0).wait(1).to({alpha:0.9033},0).wait(1).to({alpha:0.8067},0).wait(1).to({alpha:0.71},0).wait(1).to({alpha:0.6133},0).wait(1).to({alpha:0.5167},0).wait(1).to({alpha:0.42},0).wait(1).to({alpha:0.478},0).wait(1).to({alpha:0.536},0).wait(1).to({alpha:0.594},0).wait(1).to({alpha:0.652},0).wait(1).to({alpha:0.71},0).wait(1).to({alpha:0.768},0).wait(1).to({alpha:0.826},0).wait(1).to({alpha:0.884},0).wait(1).to({alpha:0.942},0).wait(1).to({alpha:1},0).wait(78).to({_off:true},1).wait(67));

	// 图层_6
	this.instance_4 = new lib.元件3();
	this.instance_4.setTransform(373.75,282.2,1,1,0,0,0,34,63.1);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(43).to({_off:false},0).wait(1).to({alpha:0.9746},0).wait(1).to({alpha:0.9493},0).wait(1).to({alpha:0.9239},0).wait(1).to({alpha:0.8986},0).wait(1).to({alpha:0.8732},0).wait(1).to({alpha:0.8479},0).wait(1).to({alpha:0.8225},0).wait(1).to({alpha:0.7971},0).wait(1).to({alpha:0.7718},0).wait(1).to({alpha:0.7464},0).wait(1).to({alpha:0.7211},0).wait(1).to({alpha:0.6957},0).wait(1).to({alpha:0.6704},0).wait(1).to({alpha:0.645},0).wait(1).to({alpha:0.6196},0).wait(1).to({alpha:0.5943},0).wait(1).to({alpha:0.5689},0).wait(1).to({alpha:0.5436},0).wait(1).to({alpha:0.5182},0).wait(1).to({alpha:0.4929},0).wait(1).to({alpha:0.4675},0).wait(1).to({alpha:0.4421},0).wait(1).to({alpha:0.4168},0).wait(1).to({alpha:0.3914},0).wait(1).to({alpha:0.3661},0).wait(1).to({alpha:0.3407},0).wait(1).to({alpha:0.3154},0).wait(1).to({alpha:0.29},0).wait(1).to({alpha:0.4083},0).wait(1).to({alpha:0.5267},0).wait(1).to({alpha:0.645},0).wait(1).to({alpha:0.7633},0).wait(1).to({alpha:0.8817},0).wait(1).to({alpha:1},0).wait(1).to({alpha:0.9025},0).wait(1).to({alpha:0.805},0).wait(1).to({alpha:0.7075},0).wait(1).to({alpha:0.61},0).wait(1).to({alpha:0.5125},0).wait(1).to({alpha:0.415},0).wait(1).to({alpha:0.3175},0).wait(1).to({alpha:0.22},0).wait(1).to({alpha:0.3067},0).wait(1).to({alpha:0.3933},0).wait(1).to({alpha:0.48},0).wait(1).to({alpha:0.5667},0).wait(1).to({alpha:0.6533},0).wait(1).to({alpha:0.74},0).wait(1).to({alpha:0.8267},0).wait(1).to({alpha:0.9133},0).wait(1).to({alpha:1},0).wait(40).to({_off:true},1).wait(67));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-138.7,-0.2,601.5999999999999,443.3);


(lib.元件4 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.元件5();
	this.instance.setTransform(12.5,-93.3,1,1,0,0,0,12.5,23.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:12.4,x:12.4,y:-75.85},0).wait(1).to({y:-58.4},0).wait(1).to({y:-41},0).wait(1).to({y:-23.55},0).wait(1).to({y:-6.15},0).wait(1).to({y:11.3},0).wait(1).to({y:28.7},0).wait(1).to({y:46.1},0).wait(1).to({y:63.55},0).wait(1).to({y:80.95},0).wait(1).to({y:98.4},0).wait(1).to({y:115.85},0).wait(1).to({y:133.25},0).wait(1).to({y:150.7},0).wait(1).to({y:168.1},0).wait(1).to({y:185.55},0).wait(1).to({y:203},0).wait(1).to({y:220.4},0).wait(1).to({y:237.85},0).wait(1).to({y:255.25},0).wait(1).to({y:272.7},0).wait(1).to({y:290.15},0).wait(1).to({y:307.55},0).wait(1).to({y:325},0).wait(1).to({y:342.4},0).wait(1).to({y:359.85},0).wait(1).to({y:377.3},0).wait(1).to({y:394.7},0).wait(1).to({y:412.15},0).wait(1).to({y:429.55},0).wait(1).to({y:447},0).wait(1).to({y:464.45},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-116.4,24.9,604);


(lib.大雨 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_31_复制_复制_复制_复制
	this.instance = new lib.元件4("synched",0);
	this.instance.setTransform(113.45,305.6,0.8549,0.8549,0,0,0,12.5,-93.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(6).to({_off:false},0).wait(152));

	// 图层_31_复制_复制_复制
	this.instance_1 = new lib.元件4("synched",0);
	this.instance_1.setTransform(161.7,309.4,0.7665,0.7665,0,0,0,12.5,-93.2);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(13).to({_off:false},0).wait(145));

	// 元件_4_复制_复制_复制
	this.instance_2 = new lib.元件4("synched",0);
	this.instance_2.setTransform(325.3,287.55,1,1,0,0,0,12.5,-93.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(158));

	// 图层_31_复制_复制_复制
	this.instance_3 = new lib.元件4("synched",0);
	this.instance_3.setTransform(415.5,166.15,0.8549,0.8549,0,0,0,12.5,-93.2);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(12).to({_off:false},0).wait(146));

	// 图层_31_复制_复制
	this.instance_4 = new lib.元件4("synched",0);
	this.instance_4.setTransform(79.5,227.95,0.6515,0.6515,0,0,0,12.5,-93.2);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(19).to({_off:false},0).wait(139));

	// 元件_4_复制_复制
	this.instance_5 = new lib.元件4("synched",0);
	this.instance_5.setTransform(287.15,229.15,1,1,0,0,0,12.5,-93.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(158));

	// 图层_31_复制_复制_复制
	this.instance_6 = new lib.元件4("synched",0);
	this.instance_6.setTransform(158.95,275.5,0.8549,0.8549,0,0,0,12.5,-93.2);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(7).to({_off:false},0).wait(151));

	// 图层_31_复制_复制
	this.instance_7 = new lib.元件4("synched",0);
	this.instance_7.setTransform(256.3,250.9,0.7665,0.7665,0,0,0,12.5,-93.2);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(22).to({_off:false},0).wait(136));

	// 元件_4_复制_复制
	this.instance_8 = new lib.元件4("synched",0);
	this.instance_8.setTransform(417.3,325.65,1,1,0,0,0,12.5,-93.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(158));

	// 图层_31_复制_复制
	this.instance_9 = new lib.元件4("synched",0);
	this.instance_9.setTransform(82.05,284.25,0.8549,0.8549,0,0,0,12.5,-93.2);
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(11).to({_off:false},0).wait(147));

	// 图层_31_复制
	this.instance_10 = new lib.元件4("synched",0);
	this.instance_10.setTransform(127.1,194.3,0.6515,0.6515,0,0,0,12.5,-93.2);
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(17).to({_off:false},0).wait(141));

	// 图层_31_复制_复制_复制
	this.instance_11 = new lib.元件4("synched",0);
	this.instance_11.setTransform(224.75,310.8,0.8549,0.8549,0,0,0,12.5,-93.2);
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(9).to({_off:false},0).wait(149));

	// 图层_31_复制_复制
	this.instance_12 = new lib.元件4("synched",0);
	this.instance_12.setTransform(179.15,276.4,0.7665,0.7665,0,0,0,12.5,-93.2);
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(23).to({_off:false},0).wait(135));

	// 元件_4_复制_复制
	this.instance_13 = new lib.元件4("synched",0);
	this.instance_13.setTransform(392.4,235.8,1,1,0,0,0,12.5,-93.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(158));

	// 图层_31_复制_复制
	this.instance_14 = new lib.元件4("synched",0);
	this.instance_14.setTransform(224.75,171.75,0.8549,0.8549,0,0,0,12.5,-93.2);
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(7).to({_off:false},0).wait(151));

	// 图层_31_复制
	this.instance_15 = new lib.元件4("synched",0);
	this.instance_15.setTransform(38.85,264.45,0.6515,0.6515,0,0,0,12.5,-93.2);
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(16).to({_off:false},0).wait(142));

	// 元件_4_复制
	this.instance_16 = new lib.元件4("synched",0);
	this.instance_16.setTransform(148.4,248.9,1,1,0,0,0,12.5,-93.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(158));

	// 图层_31_复制_复制
	this.instance_17 = new lib.元件4("synched",0);
	this.instance_17.setTransform(334.2,195.85,0.8549,0.8549,0,0,0,12.5,-93.2);
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(11).to({_off:false},0).wait(147));

	// 图层_31_复制
	this.instance_18 = new lib.元件4("synched",0);
	this.instance_18.setTransform(322.4,203.1,0.7665,0.7665,0,0,0,12.5,-93.2);
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(18).to({_off:false},0).wait(140));

	// 元件_4_复制
	this.instance_19 = new lib.元件4("synched",0);
	this.instance_19.setTransform(417.3,142.65,1,1,0,0,0,12.5,-93.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(158));

	// 图层_31_复制
	this.instance_20 = new lib.元件4("synched",0);
	this.instance_20.setTransform(276.5,275.5,0.8549,0.8549,0,0,0,12.5,-93.2);
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(9).to({_off:false},0).wait(149));

	// 图层_31
	this.instance_21 = new lib.元件4("synched",0);
	this.instance_21.setTransform(144.05,251.25,0.6515,0.6515,0,0,0,12.5,-93.2);
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(16).to({_off:false},0).wait(142));

	// 元件_4
	this.instance_22 = new lib.元件4("synched",0);
	this.instance_22.setTransform(59.4,223.2,1,1,0,0,0,12.5,-93.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(158));

	// 图层_28
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#B0C4CC").s().p("AgJCDQgOgIgKgKQgJAHgGADQgOAJgNADQgXAHgYgHQgRgFgKgIQgPgPgEgNIgEgSQgaAAgVgMQgMgHgKgKQgQgQAAgTQAAgWAQgPQAQgSAbgFQABgjAbgbQAcgbAqgFQAagDAYAHQAYAHARAPQAQgMAWgFQAPgEAWABQAXACASAJQAlARALAmQASAAAMACQAQAEAMAGQAHAEAJAGQAQANAHAQQANAdgSAiQgQAfgdAMQgOAFgPACQgWADgVgEQgLAVgVANQgWAOgaACIgKABQgbAAgWgNg");
	this.shape.setTransform(107.0147,188.1618,4.1556,4.1556);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(158));

	// 图层_29
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E3E9EE").s().p("ABGElQghgJgWgbQgUAWgiAHQgZAFgYgGQgVgFgRgOQgRgOgKgTQgVAYghAKQgbAIgagEQgigEgUgSQgTgQgIgeQgFgSAEgVQgRAFgQgDQgYgFgQgXQgOgUgBgXQgBgdAWgZQAXgaAmgKQgIgYABgZQABgdAIgTQAMgbASgPQAZgVAkgEQAlgGAkAOQAGgTAKgTQARgeAagXQAqgkA1gMQAbgHAkABQBHADA0AlQAZARASAXQAHAKAJAQIAKAUQAOgCASAAQA1ADAeAdIASAdQARAmgJAtIgBAFQgCAKgDAFQAfAIATAYQAPATADAfQABAQgCAJQgDATgLAPQgQAUgbAJQgaAJgagFQAFAOgBAQQgBALgFALQgIASgRAJQgMAHgSABQgXABgSgIQgMgGgKgMQgFAPgMAOQgUAZgfAJQgQAGgRAAQgOAAgPgEg");
	this.shape_1.setTransform(225.8622,123.3247,4.1556,4.1556);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(158));

	// 图层_30
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B0C4CC").s().p("AgEBLQgKgGgDgFIgHAGIgPAHQgMAEgNgFQgHgBgIgGQgIgIgCgIIgCgLQgNAAgMgGQgUgOgBgQQAAgLAJgKQAIgJAVgEQAAgVALgOQANgPAVgDQAdgDAUASQAIgGAMgDQAHgDAMACQALAAAMAGQAQAIAJAYQAKAAAGABQAIACAHADQAJAFAHAJQAEAGABADQAFAKgCAMQgBAMgHAJQgHAKgOAHIgQAEQgLABgLgCQgGAMgLAHQgMAIgOABIgFAAQgOAAgMgHg");
	this.shape_2.setTransform(380.7229,181.4526,4.1556,4.1556);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(158));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-0.1,438,906.6);


// stage content:
(lib.做一做 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:4,m2:140};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,5,137,140,141,420];
	this.streamSoundSymbolsList[5] = [{id:"yx14010201打雷",startFrame:5,endFrame:137,loop:1,offset:0}];
	this.streamSoundSymbolsList[141] = [{id:"下雨",startFrame:141,endFrame:421,loop:1,offset:0}];
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
		var soundInstance = playSound("yx14010201打雷",0);
		this.InsertIntoSoundStreamData(soundInstance,5,137,1);
	}
	this.frame_137 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_140 = function() {
		var _this = this;
		
		_this.m2stop_btn.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_141 = function() {
		var soundInstance = playSound("下雨",0);
		this.InsertIntoSoundStreamData(soundInstance,141,421,1);
	}
	this.frame_420 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(132).call(this.frame_137).wait(3).call(this.frame_140).wait(1).call(this.frame_141).wait(279).call(this.frame_420).wait(1));

	// 音频停止
	this.m1stop_btn = new lib.音频停止();
	this.m1stop_btn.name = "m1stop_btn";
	this.m1stop_btn.setTransform(171.55,459.7,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m1stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m2stop_btn = new lib.音频停止();
	this.m2stop_btn.name = "m2stop_btn";
	this.m2stop_btn.setTransform(1087.6,459.6,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m2stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1stop_btn}]},4).to({state:[]},133).to({state:[{t:this.m2stop_btn}]},3).to({state:[]},280).wait(1));

	// 播放按钮
	this.m1_btn = new lib.音频播放标();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(122.75,413.2);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m2_btn = new lib.音频播放标();
	this.m2_btn.name = "m2_btn";
	this.m2_btn.setTransform(1038.95,413.2);
	new cjs.ButtonHelper(this.m2_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m2_btn},{t:this.m1_btn}]}).wait(421));

	// 边框和标题
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#F29539").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape.setTransform(503.925,682.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#51C1E1").ss(1,0,0,4).p("Eg1Jgi8QjDAAiKCKQiLCLAADFMAAAA3GQAADDCLCMQCKCLDDAAMBqTAAAQDDAACKiLQCLiMAAjDMAAAg3GQAAjFiLiLQiKiKjDAAg");
	this.shape_1.setTransform(1418.525,682.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(421));

	// 右侧 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eg1JAi9QjDAAiKiKQiLiMAAjEMAAAg3GQAAjECLiLQCKiLDDABMBqTAAAQDDgBCKCLQCLCLAADEMAAAA3GQAADEiLCMQiKCKjDAAg");
	mask.setTransform(1418.525,682.55);

	// 下雨
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_2.setTransform(1332.0878,840.1905,3.5527,3.5527);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_3.setTransform(1380.3272,844.0113,3.1852,3.1852);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_4.setTransform(1543.9451,822.2817,4.1556,4.1556);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_5.setTransform(1634.1378,700.7405,3.5527,3.5527);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_6.setTransform(1298.1439,762.54,2.7074,2.7074);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_7.setTransform(1505.7951,763.8817,4.1556,4.1556);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_8.setTransform(1377.5878,810.0905,3.5527,3.5527);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_9.setTransform(1474.9272,785.5113,3.1852,3.1852);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_10.setTransform(1635.9451,860.3817,4.1556,4.1556);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_11.setTransform(1300.6878,818.8405,3.5527,3.5527);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_12.setTransform(1345.7439,728.89,2.7074,2.7074);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_13.setTransform(1443.3878,845.3905,3.5527,3.5527);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_14.setTransform(1397.7772,811.0113,3.1852,3.1852);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_15.setTransform(1611.0451,770.5317,4.1556,4.1556);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_16.setTransform(1443.3878,706.3405,3.5527,3.5527);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_17.setTransform(1257.4939,799.04,2.7074,2.7074);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_18.setTransform(1367.0451,783.6317,4.1556,4.1556);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_19.setTransform(1552.8378,730.4405,3.5527,3.5527);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_20.setTransform(1541.0272,737.7113,3.1852,3.1852);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_21.setTransform(1635.9451,677.3817,4.1556,4.1556);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_22.setTransform(1495.1378,810.0905,3.5527,3.5527);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_23.setTransform(1362.6939,785.84,2.7074,2.7074);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#A0C0CA").s().p("AABA3QgqgCAQg1QAOgwANgHIAYA4QAOA3gkAAIgDgBg");
	this.shape_24.setTransform(1278.0451,757.9317,4.1556,4.1556);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#E3E9EE").s().p("ACnTDQiLgmhZhyQhXBdiPAdQhmAVhkgZQhZgXhEg4QglgdgdgjQA7AGA/gIQBAgLA6gUQB5gwBCiDQBJiLg2h9QgdhChDg2QgjgbgggRQgvgZhCgPQg0gIhMAAQgtieiXhIQhOgmhdgGQhegGg+AQQhcAVhEAyQhIg+higbQhFgUhHgBQAqgSAugLQgfhpAEhoQAEh5AfhPQA0huBLg+QBnhXCUgTQCagZCYA6QAWhNAshPQBHh8BshgQCsiYDdgxQBygdCYAGQElAMDYCYQBqBJBKBdQAeAsAmBCIAoBTQA7gKBKACQDcAKB8B7IBNB5QBFCbgmC7IgEAVQgIAqgLAXQCBAjBNBjQA8BJAPBzIACATQACBFgGAlQgNBPgvA9QhBBThyAlQhqAlhugSQAWA4gFBCQgFAugTAuIgBADQgjBLhDAkQgyAbhLAEQhiAGhIghQg0gbgngwQgYA9gvA6QhWBoh/AnQhCAYhIAAQg6AAg9gPg");
	this.shape_25.setTransform(1457.15,589.2788);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#B0C4CC").s().p("AyIIgQg4gggsgsQgjAggZAMQg6Ajg5APQhfAbhkgbQhEgVgsgjQg+g+gPg0IgRhNQhsAAhXgyQg0gbgpgpQhBhDAAhRQAAhdBBhAQBEhLBugUQAFiSByhuQB0hwCtgWQAjgDAjAAQBHABBEAUQBiAbBJA+QBEgyBcgVQA+gQBeAGQBdAGBNAmQCYBIAtCeQBLAAA0AIQBDAPAvAZQAgARAjAbQBCA2AeBCQA2B8hJCKQhDCEh4AvQg6AVhBALQg+AIg7gGQgcgDgbgFQguBXhZA4QhaA6huAIQgVACgWAAQhtAAhhg1gAY+D0QgpgZgNgSIgfAYQgsAVgSAGQgdAKgfgCIABgDQATguAEguQAGhCgWg4QBuASBqglQBygkBAhTQAwg9ANhPQAGglgChFIgCgTQBDAjAlBhQAnAAAbAFQAfAHAfAPQAmAUAbAmQAQAXAFAOQAUAtgGAzQgEAvgdAnQgdAog6AcQgdALgmAGQgwAEgtgIQgXAygwAfQgwAfg6AEIgVABQg7AAg1geg");
	this.shape_26.setTransform(1437.6679,654.0997);

	this.instance = new lib.大雨("synched",0);
	this.instance.setTransform(1437.7,681.75,1,1,0,0,0,219,215.8);

	var maskedShapeInstanceList = [this.shape_2,this.shape_3,this.shape_4,this.shape_5,this.shape_6,this.shape_7,this.shape_8,this.shape_9,this.shape_10,this.shape_11,this.shape_12,this.shape_13,this.shape_14,this.shape_15,this.shape_16,this.shape_17,this.shape_18,this.shape_19,this.shape_20,this.shape_21,this.shape_22,this.shape_23,this.shape_24,this.shape_25,this.shape_26,this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).to({state:[{t:this.instance}]},141).wait(280));

	// 左侧遮罩 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("Eg1JAi9QjDAAiKiKQiLiMAAjEMAAAg3GQAAjECLiLQCKiLDDABMBqTAAAQDDgBCKCLQCLCLAADEMAAAA3GQAADEiLCMQiKCKjDAAg");
	mask_1.setTransform(503.575,682.55);

	// 闪电
	this.instance_1 = new lib.ClipGroup();
	this.instance_1.setTransform(464.05,683.2,4.1813,4.1813,0,0,0,55,51.2);

	this.instance_2 = new lib.元件1();
	this.instance_2.setTransform(480.65,808.85,1,1,0,0,0,55.9,103.4);

	this.instance_3 = new lib.ClipGroup_1();
	this.instance_3.setTransform(492.4,683.2,4.1816,4.1816,0,0,0,55.4,51.2);

	this.instance_4 = new lib.元件2_1();
	this.instance_4.setTransform(373.35,754.35,1,1,0,0,0,31.7,58.6);

	this.instance_5 = new lib.元件3();
	this.instance_5.setTransform(634.5,751.3,1,1,0,0,0,34,63.1);

	this.instance_6 = new lib.闪电("synched",0);
	this.instance_6.setTransform(492.25,683.3,1,1,0,0,0,231.5,214.2);

	var maskedShapeInstanceList = [this.instance_1,this.instance_2,this.instance_3,this.instance_4,this.instance_5,this.instance_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]}).to({state:[{t:this.instance_6}]},5).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]},135).wait(281));

	// title
	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#F29539").s().p("AglBBQgRgKgKgRQgKgRAAgVQAAgUAKgRQAKgRARgKQARgKAUAAQAVAAARAKQARAKAKARQAKARAAAUQAAAVgKARQgKARgRAKQgRAKgVAAQgUAAgRgKgAgkgkQgOAPgBAVQABAWAOAPQAPAOAVABQAWgBAPgOQAOgPABgWQgBgVgOgPQgPgOgWgBQgVABgPAOg");
	this.shape_27.setTransform(1459.075,236.025);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#F29539").s().p("AiWDmIAAjZIEyAAIAADYIgiAAIAAgSIjvAAIAAATgAh1C3IDvAAIAAg7IjvAAgAh1BhIDvAAIAAg3IjvAAgAjcgfIAAgeICAAAQgEgSgIgUQgIgVgLgSIAggHQAIAMAGAOQAHAOAFANIAHAZIgVAGICIAAIAOgcIANgeIAKgcIAkAJIgTAnIgTAmICBAAIAAAegAjAiVIAAgeIC3AAQgEgLgFgLIgMgVIAggHQAIALAGAOQAHANAEAMICpAAIAAAeg");
	this.shape_28.setTransform(1424.375,221.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#F29539").s().p("AjRDaIgNgLQAagaAOgfQANgeAEgfQAFgfgBgaIAAhCIFgAAIAACjIghAAIAAgZIkkAAQgGAhgPAhQgPAggbAcQgEgGgIgGgAAZBLICFAAIAAhQIiFAAgAiAAgIAAAVIgCAWIB8AAIAAhQIh6AAgAishLIAAgdIClAAIAAg0IjDAAIAAgdIDDAAIAAgsIAhAAIAAAsIDFAAIAAAdIjFAAIAAA0ICvAAIAAAdg");
	this.shape_29.setTransform(1373.375,221.725);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#F29539").s().p("AjaDdIAAghIG2AAIAAAhgAiiBvIAAggIFNAAIAAAggAjhALIAigEIAAitIAfAAIAACpIAvgFIAAjaIAhAAIAABXIBQAAIAAAeIhQAAIAABhIBRgKIABAdIhQALIhMAKIhDAJgAAxAXQgNgEgFgLQgFgKAAgVIAAjFIAiAAIAABlQAggMAfgOQAegNAVgOIAbAaQgeAQglAPQglAOglAMIAABCQgBAMAFAFQAGAEARgBIBSAAQAKABAFgFQAGgFACgOQADgPABgbQAFAEAJAEIAQAFQgCAhgFASQgGASgLAHQgKAHgVAAIhXAAIgEAAQgUAAgLgFg");
	this.shape_30.setTransform(1324.3,221.05);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#F29539").s().p("AjkDDQASgSATgNQASgNARgGIAAiVIhCAAIAAgfIBiAAIAACzIARAKIAXAOQAXAMAgAEQAfAEApAAIA+gBQAigBAggDQAggCAagDIgHATQgDALAAAIIgmACIgvACIgxABIgrAAQgqABghgFQgigFgZgOIgbgQQgMgIgIgBQgIAAgLAIQgLAHgLAMIgZAbgAhcCGIgLgPQAsgPAlgWQAjgWAcgeIg/gvIg/gtIAXgUIA9ArIA+AuQAUgYAQgeQAPgeALgjIjfAAIAAggICWAAQgFgPgKgTQgLgUgLgSIAggKIAPAZIANAZIAKAWIgcAKICmAAIAAAgIhAAAQgMApgSAjQgRAigXAdQAiAaAeAZQAdAYAWAUIgaAZQgUgUgcgZIg+g0QgeAggkAYQgmAZgtARIgJgOgAijiCIgZgcIgcgZIAagSQAOALAOAOIAaAbQAMANAHALIgbAUQgHgLgMgOg");
	this.shape_31.setTransform(1274.325,221.275);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#F29539").s().p("AhbDXIgOgKQAkgZAUghQAVgjALgpQAKgpAFgsQACguABgvIhVAAIAAggIE5AAIAAAgIjBAAIgCAnIgBAmICfAAIAAAPQgDBLgEAtQgFAugEAYQgGAXgIAJQgGAHgIAEQgJAEgLAAQgLABgSgBIglgBQgBgHgCgJQgDgIgEgGIAmACIAZAAQAHAAAEgBQAEgCADgDQAGgGAEgUQAFgTADgoQAEgnACg/IiAAAQgFAvgLApQgNArgVAkQgXAigkAbQgEgHgHgGgAiiDiIAAkZIgXAhIgXAbIgJgPIgLgRQAYgYAVggQAWggASglQASglAOgmIAgAJQgLAdgMAbQgNAcgOAbIAAFNgAA/ilIgIgcIgJgaIAhgHIAJAZIAJAbIAHAWIgiAJIgHgWg");
	this.shape_32.setTransform(1224.15,221.75);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#F29539").s().p("AB9C7QgigcgTgrIgBAAQgKAbgSAWQgRAVgcAQQgeAPgrALIgIgOIgJgMQAlgJAagMQAZgMAPgQQARgQAIgVIh0AAIAAgcIB+AAIAFgVIADgXIhlAAIAAiXIDyAAIAACXIhsAAIgDAXIgFAVICNAAIAAAcIh0AAQATAgAfAWQAhAVAsAKIgLAMIgKAPQgxgNgkgcgAgQATICyAAIAAglIiyAAgAgQgrICyAAIAAgmIiyAAgAieDjIAAjqQgMAngNAiQgOAigPAYIgIgQIgKgPQAOgWAPgfQAOggALgjQALglAGgjIg+AAIAAgfIA/AAIAAhhIAfAAIAABhIA1AAIAAAfIg1AAIAAAVIAOAVIASAdIARAcIALATIgWAZIgKgWIgNgbIgPgcIAAEEgAB0h0IAAgnIhPAAIAAAnIgfAAIAAgnIhLAAIAAgdIBLAAIAAgqIAfAAIAAAqIBPAAIAAgqIAhAAIAAAqIBIAAIAAAdIhIAAIAAAng");
	this.shape_33.setTransform(1174.3,221.625);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#F29539").s().p("AhoDlIAAinQgWAYgWAVQgYAVgZASIgLgMIgPgMQAogaAjgiQAhgiAbgpIh1AAIAAgbICGAAIAKgSIAJgTIhsAAIAAgbIB5AAIAHgSIAHgSIidAAIAAgcIBlAAQgFgLgKgNQgKgOgJgLIAfgLQALANAKAOQALAOAGAMIgRAHICBAAQAJgNALgRQAKgQAHgNIAiALIgRAZIgTAXIBlAAIAAAcIjCAAIgHASIgFASIC3AAIAAAbIjDAAIgJATIgJASIEBAAIAAAbIkQAAIgLAPIgKAQID3AAIAADSIgjAAIAAgSIjWAAIAAATgAhIC4IDWAAIAAghIjWAAgAhICBIDWAAIAAggIjWAAgAhIBLIDWAAIAAgfIjWAAg");
	this.shape_34.setTransform(1123.45,221.575);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#F29539").s().p("AC0DiQgWgBgQgXQgQgXgLgqQgLgqgHg6QgHg5gDhGIinAAIAAggIClAAIgCgzIgCg0IAiAAIABA0IABAzIBqAAIAAAgIhoAAQADA7AGAxQAGAyAHAlQAIAkAKAVQAKAUAMABQAHAAAFgUQAFgUACglQAGAFAIAFIANAHQgEApgIAWQgIAXgIAIQgJAJgJAAIgBAAgAiqDHIgJgOIAJgIQAGgGAEgIQAEgIABgKIAAi4IhHAAIAAggIBmAAIAADbIA5gkIAEAOQACAIAEAFIg/ArIgeAVQgJAHgDAEIgIgPgAhJCgIAdgIIAigJIAAiAIg2AAIAAgeICFAAIAAAeIgxAAIAAB3IA7gQIAFAdIhOAXIhGAVgAiKiTIgZgaIgbgYIAWgUIAbAXIAaAZIAUAWIgXAXIgUgXgACjiqQgPgUgPgRIAWgOQARAQAQATQAPATAJAPIgYARQgJgPgQgUg");
	this.shape_35.setTransform(1074.75,221.7013);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#F29539").s().p("AguA8QAdgMAQgTQAPgTACgZIgFABIgFAAQgOgBgKgIQgKgJAAgRQAAgQALgJQAKgJAOAAQAUAAAKAPQAKAPAAAaQAAAogXAcQgWAdgmAOg");
	this.shape_36.setTransform(1010.575,237.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#F29539").s().p("AAhDYIgMgLQAhgTAZgZQAZgZARgfQgPgjgJglQgKglgFglIgMAZQgGANgHAKIgKgMIgMgMQAQgaANghQANgiAJgmQAJgnAGgoIAeAFQgDAXgFAXIgLAuIB3AAIAAAdIgYAAQgHA/gNAzQgNA0gVAqQAPAcAVAYQAUAYAbASIgLAMQgGAIgDAHQgagSgTgYQgUgXgPgbQgSAbgXAXQgXAYgdASIgKgMgABnhhIgCAEQAFApAIAqQAIAqAQAoQAPglAJgqQAKgsAGgyIhKAAIgBAEgAinDjIAAkeQgMAUgMASIgaAhIgIgQQgFgKgFgHQAWgZAUghQAUggARgmQARglANgnIAeAJIgTAzQgKAZgLAYIAAFXgAhgDMIAAjOIA6AAIAAhhIhIAAIAAgeIBIAAIAAhdIAfAAIAABdIBCAAIAAAeIhCAAIAABhIA3AAIAACuIhyAAIAAAggAhCCPIBVAAIAAh1IhVAAg");
	this.shape_37.setTransform(974.075,221.725);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#F29539").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_38.setTransform(924.375,221.2);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#F29539").s().p("AAhDYIgMgLQAhgTAZgZQAZgZARgfQgPgjgJglQgKglgFglIgMAZQgGANgHAKIgKgMIgMgMQAQgaANghQANgiAJgmQAJgnAGgoIAeAFQgDAXgFAXIgLAuIB3AAIAAAdIgYAAQgHA/gNAzQgNA0gVAqQAPAcAVAYQAUAYAbASIgLAMQgGAIgDAHQgagSgTgYQgUgXgPgbQgSAbgXAXQgXAYgdASIgKgMgABnhhIgCAEQAFApAIAqQAIAqAQAoQAPglAJgqQAKgsAGgyIhKAAIgBAEgAinDjIAAkeQgMAUgMASIgaAhIgIgQQgFgKgFgHQAWgZAUghQAUggARgmQARglANgnIAeAJIgTAzQgKAZgLAYIAAFXgAhgDMIAAjOIA6AAIAAhhIhIAAIAAgeIBIAAIAAhdIAfAAIAABdIBCAAIAAAeIhCAAIAABhIA3AAIAACuIhyAAIAAAggAhCCPIBVAAIAAh1IhVAAg");
	this.shape_39.setTransform(874.075,221.725);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#F29539").s().p("AguA8QAdgMAQgTQAPgTACgZIgFABIgFAAQgOgBgKgIQgKgJAAgRQAAgQALgJQAKgJAOAAQAUAAAKAPQAKAPAAAaQAAAogXAcQgWAdgmAOg");
	this.shape_40.setTransform(810.575,237.35);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#F29539").s().p("AB0DiIAAkDIhmAAQAAAmgGAuQgEAugNAtQgPAugbAlQgEgGgJgGIgPgKQAbgkANgsQAMgrAFgsQADgrAAgmIAAiCIBDgPIBBgRQAdgJAWgJIAdAaQgYAJgeAIQgeAJgfAHIhAANIAABXIDKAAIAAAhIhCAAIAAEDgAjYCPIAAlFICGAAIAAEfIhmAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_41.setTransform(775.05,221.75);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#F29539").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_42.setTransform(724.375,221.2);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#F29539").s().p("AB1DiIAAkDIhnAAQAAAmgGAuQgEAugNAtQgPAugbAlQgEgGgJgGIgPgKQAbgkANgsQAMgrAEgsQAFgrgBgmIAAiCIBDgPIBBgRQAdgJAWgJIAdAaQgYAJgeAIQgeAJgfAHIhAANIAABXIDKAAIAAAhIhCAAIAAEDgAjYCPIAAlFICHAAIAAEfIhnAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_43.setTransform(675.05,221.75);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#F29539").s().p("AgNAIQgegcgbgWIAdgaQASAPAUATQATASATATQAUAVAQATIgfAaQgZgfgcgeg");
	this.shape_44.setTransform(609.125,236.475);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#F29539").s().p("AjbCmIAAgkIG3AAIAAAkgAixiCIAAgjIFjAAIAAAjg");
	this.shape_45.setTransform(574.375,222.675);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("rgba(242,149,57,0.149)").s().p("Eg8pAPlQiQAMiZAAQrqAAoPkWQkXiUiEi0Qh0ieAAi5QAAg8AMg4QBEk/G/jrIAtgYQIBj+LLAAQBmAABkAFQAvgbA2gYQBCgdBHgYQE4hrGbAAQGaAAE5BrQBHAYBCAdQBEAfA3AhQDvhSETgjQDQgbDlAAQDlAADQAbQHqA/F5DTIA5AhQBWhPCYhEQFkigH3AAQH3AAFlCgQCBA6BSBDQFbiTHkAAIAZAAQFbADESBPQD/g6EmAAQJwAAG3EEQAmAVAiAYQFyD3AAFPQAAFxm6EFIgKAGQm1D+poAAQnsAAl5ihQhXAOheAAIgoAAQgnAYgpAUQg5Adg+AXQjPBLj7AAQkhAAjnhkQkfCamEAAIgfAAQiTAZiiAJQhWAEhaAAQhbAAhVgEQnEgYlQiWQgmgRghgSQnOC5pYAAQooAAm0icQnFDTpeAAQmcAAlVhig");
	this.shape_46.setTransform(1004,213.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27}]}).wait(421));

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
		{src:"sounds/下雨_.mp3?1693882253461", id:"下雨"},
		{src:"sounds/yx14010201打雷.mp3?1693882253461", id:"yx14010201打雷"}
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