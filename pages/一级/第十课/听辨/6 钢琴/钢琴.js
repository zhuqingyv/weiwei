(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"钢琴_atlas_P_1", frames: [[2586,0,1334,1121],[0,0,2584,1265],[2586,1123,1149,566],[1634,1267,800,800],[0,1267,1632,657]]}
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



(lib.Image = function() {
	this.initialize(ss["钢琴_atlas_P_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Image_1 = function() {
	this.initialize(ss["钢琴_atlas_P_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Image_2 = function() {
	this.initialize(ss["钢琴_atlas_P_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Image_0 = function() {
	this.initialize(ss["钢琴_atlas_P_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap1 = function() {
	this.initialize(ss["钢琴_atlas_P_1"]);
	this.gotoAndStop(4);
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


(lib.ClipGroup_2 = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("AyFSGMAAAgkLMAkLAAAMAAAAkLg");
	mask.setTransform(115.775,115.8);

	// 图层_3
	this.instance = new lib.Image_0();
	this.instance.setTransform(0,0,0.2895,0.2895);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(0,0,231.6,231.6), null);


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
	mask.graphics.p("A3YTrMAAAgnVMAuxAAAMAAAAnVg");
	mask.setTransform(149.675,125.875);

	// 图层_3
	this.instance = new lib.Image();
	this.instance.setTransform(0,0,0.2244,0.2246);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(0,0,299.4,251.8), null);


(lib.ClipGroup_0 = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("EgjfAQRMAAAgghMBG/AAAMAAAAghg");
	mask.setTransform(227.15,104.075);

	// 图层_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F29539").s().p("AnaCCQgjAAgZgZQgZgYAAgkIAAhZQAAgjAZgZQAZgZAjAAIO1AAQAjAAAZAZQAZAZAAAjIAABZQAAAkgZAYQgZAZgjAAg");
	this.shape.setTransform(355.725,37.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FAE8D7").ss(3,0,0,4).p("A+QwBQhHAAgyAyQgyAyAABHIAAauQAABGAyAyQAyAyBHAAMA8iAAAQBGAAAygyQAygyAAhGIAA6uQAAhHgygyQgygyhGAAg");
	this.shape_1.setTransform(212.2,104.075);

	var maskedShapeInstanceList = [this.shape,this.shape_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_0, new cjs.Rectangle(0,0,424.5,208.2), null);


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
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("Egg6AQOMAAAggbMBB1AAAMAAAAgbg");
	mask_1.setTransform(210.725,103.8);

	// 图层_3
	this.instance_1 = new lib.Image_2();
	this.instance_1.setTransform(0,0,0.3668,0.3668);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(0,0,421.5,207.6), null);


(lib.ClipGroup_0_1 = function(mode,startPosition,loop,reversed) {
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
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EghJAQRMAAAgghMBCTAAAMAAAAghg");
	mask_1.setTransform(212.225,104.075);

	// 图层_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#F29539").s().p("AlbCCQgkAAgZgZQgZgZAAgjIAAhZQAAgjAZgZQAZgZAkAAIK4AAQAjAAAZAZQAZAZAAAjIAABZQAAAkgZAYQgZAZgjAAg");
	this.shape_2.setTransform(323.675,65.175);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FAE8D7").ss(3,0,0,4).p("A+QwBQhHAAgyAyQgyAyAABHIAAauQAABGAyAyQAyAyBHAAMA8iAAAQBGAAAygyQAygyAAhGIAA6uQAAhHgygyQgygyhGAAg");
	this.shape_3.setTransform(212.2,104.075);

	var maskedShapeInstanceList = [this.shape_2,this.shape_3];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_0_1, new cjs.Rectangle(0,0,424.5,208.2), null);


(lib.ClipGroup_3 = function(mode,startPosition,loop,reversed) {
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
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("EghFAQNMAAAggZMBCLAAAMAAAAgZg");
	mask_2.setTransform(211.75,103.675);

	// 图层_3
	this.instance_2 = new lib.Image_1();
	this.instance_2.setTransform(0,0,0.1639,0.1639);

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3, new cjs.Rectangle(0,0,423.5,207.3), null);


(lib.ClipGroup_4 = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("AiPAtIAAhZIEfAAIAABZg");
	mask.setTransform(14.425,4.5);

	// 图层_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#51C1E1").ss(1,0,0,4).p("AA2AAIhrAA");
	this.shape.setTransform(14.425,7.5);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_4, new cjs.Rectangle(8,6.5,12.899999999999999,2), null);


(lib.ClipGroup_3_1 = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("AiPAtIAAhZIEfAAIAABZg");
	mask.setTransform(14.425,4.5);

	// 图层_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#51C1E1").ss(1,0,0,4).p("AA2AAIhrAA");
	this.shape.setTransform(14.425,7.5);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3_1, new cjs.Rectangle(8,6.5,12.899999999999999,2), null);


(lib.补间1 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#EA913D").ss(1,0,0,4).p("ABMAAQAAAggWAWQgWAWggAAQgeAAgXgWQgWgWAAggQAAgeAWgXQAXgWAeAAQAgAAAWAWQAWAXAAAeg");

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EA913D").s().p("Ag1A2QgWgWAAggQAAgeAWgXQAXgWAeAAQAgAAAWAWQAWAXAAAeQAAAggWAWQgWAWggAAQgeAAgXgWg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.6,-8.6,17.2,17.2);


(lib.元件8 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Bitmap1();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1632,657);


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

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AqGKGIAA0LIUNAAIAAULg");
	this.shape.setTransform(42.275,52.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.4,-12.6,129.4,129.3);


(lib.ClipGroup_1_1 = function(mode,startPosition,loop,reversed) {
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
	mask.graphics.p("A3YTlMAAAgnJMAuxAAAMAAAAnJg");
	mask.setTransform(149.675,125.3);

	// 图层_3
	this.instance = new lib.ClipGroup();
	this.instance.setTransform(149.7,125.9,1,1,0,0,0,149.7,125.9);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_1, new cjs.Rectangle(0,0,299.4,250.6), null);


(lib.ClipGroup_0_2 = function(mode,startPosition,loop,reversed) {
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
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("AyFSGMAAAgkLMAkLAAAMAAAAkLg");
	mask_2.setTransform(115.775,115.8);

	// 图层_3
	this.instance = new lib.ClipGroup_2();
	this.instance.setTransform(115.8,115.8,1,1,0,0,0,115.8,115.8);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_0_2, new cjs.Rectangle(0,0,231.6,231.6), null);


(lib.ClipGroup_1_2 = function(mode,startPosition,loop,reversed) {
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
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("A+QQCQhHAAgxgyQgygyAAhGIAA6uQAAhHAygyQAxgyBHAAMA8hAAAQBHAAAyAyQAxAyAABHIAAauQAABGgxAyQgyAyhHAAg");
	mask_1.setTransform(210.725,103.775);

	// 图层_3
	this.instance_1 = new lib.ClipGroup_1();
	this.instance_1.setTransform(210.8,103.8,1,1,0,0,0,210.8,103.8);

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_2, new cjs.Rectangle(0,1.2,421.5,205.20000000000002), null);


(lib.ClipGroup_1_3 = function(mode,startPosition,loop,reversed) {
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
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("A+QQCQhHAAgxgyQgygyAAhGIAA6uQAAhHAygyQAxgyBHAAMA8hAAAQBHAAAyAyQAxAyAABHIAAauQAABGgxAyQgyAyhHAAg");
	mask_2.setTransform(211.775,103.675);

	// 图层_3
	this.instance_2 = new lib.ClipGroup_3();
	this.instance_2.setTransform(211.8,103.7,1,1,0,0,0,211.8,103.7);

	var maskedShapeInstanceList = [this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1_3, new cjs.Rectangle(1.1,1.1,421.4,205.20000000000002), null);


(lib.Group_1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ClipGroup_3_1();
	this.instance.setTransform(14.4,4.5,1,1,0,0,0,14.4,4.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_1, new cjs.Rectangle(0,0,28.9,9), null);


(lib.Group_0 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.ClipGroup_4();
	this.instance.setTransform(14.4,4.5,1,1,0,0,0,14.4,4.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_0, new cjs.Rectangle(0,0,28.9,9), null);


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
	this.instance = new lib.补间1("synched",0);
	this.instance.setTransform(7.6,7.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({alpha:0},13).to({alpha:1},11).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,17.2,17.2);


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
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#EA913D").ss(1,0,0,4).p("AAAkRIAAIi");
	this.shape_4.setTransform(1371.4462,290.9747,3.8726,3.8726);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhyEVQAsgnAXgvQAXgvAIg2QAIg1gBg8IAAjtIAuAUIBoAAIAYgaIAxAqQgDAEgHADQgGADgLABIAAGrQAAAHACADQADADAIAAIATAAIAUAAIAEgBIAEgEIAFgSIAGgeIAFggIAIAAIADBSQAJADADAFQAEAEgBAGQABAMgQAFQgPAGgogBIgdAAQgaABgJgKQgIgKABgUIAAm/Ih3AAIAADHQAAArgEAqQgEArgOAoQgNAogbAjQgbAjguAdgAi2EaIAAkwQgSAsgYAoQgZApgfAiIgJgGQAig4AYhCQAYhCANhGIhXAAIgEgTIBnAAIAAiIIA9AGQgBAHgFAFQgFAEgLACIAABwIAcAAIAcgkIAJAHIAUARIAVAVQgBAFgEACQgFACgGABIhaAAIAAA4QAxAUAWAWQAVAWACARQACASgLAIQgKAHgQgKQgEgPgKgRQgJgPgMgQQgMgQgMgNIAAFHQAAAFgKAFQgKAEgLAAg");
	this.shape_5.setTransform(1537.1029,135.95);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("ADzEVQgCgOgGgQQgFgQgIgPIhuAUQg/AMhKAMQgDAFgDAEQgEAEgEABIgag1IAIgCQAHgBAFgEQAYgUAbgdQAbgeAbghQAbghAZgiIg9ANIhEANIgGAIQgCADgEABIgag0IAGgBQAGgCADgCQAPgNAPgUQAOgVAPgYQAOgXAMgXQAMgWAHgRIA4AcQgDAEgFADQgFADgKgBQgNAVgTAYQgTAYgWAXQgWAWgUAUQAZAAAmgDIBOgEQAQgVANgUQANgUAJgSIA4AjQgDAEgGADQgGACgJgCQgZAiglArQglArgrArQgsArgqAkIBAgFIBSgGIBcgIQgNgYgPgXQgPgXgOgTIAHgFQA7AmAaAkQAbAkADAaQAEAagMAKQgFAEgGAAQgIAAgLgIgAjOENQgCgHgGgEQgGgFgNgDQgNgEgOgDIAAgLIAZACIAaACIATABQAIAAAEgBQAFgBAEgEQANgLALgvQALguAGhQIhkAAIgTAVIgsghIALgGIANgFIAHgvIAFgzIADgtIAwASIBKAAIAAh8IiOAAIgFgSICMAAIAWgYIAxAlQgDAEgHAEQgHADgKACIAACVQAAACgFADQgGADgHACQgHACgHAAIgFAAIAAgbIhXAAIgEAlIgEAnIgGAkIBiAAIAWgYIAtAmQgDADgGACIgPAEQgGBagOA1QgNA1gVARQgMALgPAEQgPAFgSAAQAAgJgCgHgAhLiWIgFgSIElAAIAcgkIAJAHIAUASIAWATQgCAFgEADQgEACgGAAgABei0QgCgRgIgSQgIgSgKgRQgLgRgLgNIAIgEQAsAUATAWQASAXAAASQAAASgLAIQgFACgFAAQgIAAgKgHg");
	this.shape_6.setTransform(1474.425,135.6712);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("ACyEbIAAgjIlYAAIgRAXIgzgfIAKgIIANgHIAAi7IBAAHQgBAHgGAFQgFAEgMACIAACmICaAAIAAjsIkGAAIgFgSIELAAIAAiDIjSAAIgFgRIDXAAIAAhtIA/AHQgCAHgFAFQgFAEgLACIAABUICCAAIAggoIAKAIIAXASIAZAVQgBAGgFACQgEACgHAAIjLAAIAACDICtAAIAfgnIAKAIIAXASIAZAVQgBAFgEADQgFACgGAAIj2AAIAADsICbAAIAAi+IA/AIQgBAGgEAEQgGAFgLACIAADOQgBAEgKAEQgKAEgMABg");
	this.shape_7.setTransform(1413.325,135.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgQCnIAAiZIiMAAIAAgeICMAAIAAiVIAgAAIAACVICNAAIAAAeIiNAAIAACZg");
	this.shape_8.setTransform(1348.175,137.3);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("ADzEVQgCgOgGgQQgFgQgIgPIhuAUQg/AMhKAMQgDAFgDAEQgEAEgEABIgag1IAIgCQAHgBAFgEQAYgUAbgdQAbgeAbghQAbghAZgiIg9ANIhEANIgGAIQgCADgEABIgag0IAGgBQAGgCADgCQAPgNAPgUQAOgVAPgYQAOgXAMgXQAMgWAHgRIA4AcQgDAEgFADQgFADgKgBQgNAVgTAYQgTAYgWAXQgWAWgUAUQAZAAAmgDIBOgEQAQgVANgUQANgUAJgSIA4AjQgDAEgGADQgGACgJgCQgZAiglArQglArgrArQgsArgqAkIBAgFIBSgGIBcgIQgNgYgPgXQgPgXgOgTIAHgFQA7AmAaAkQAbAkADAaQAEAagMAKQgFAEgGAAQgIAAgLgIgAjOENQgCgHgGgEQgGgFgNgDQgNgEgOgDIAAgLIAZACIAaACIATABQAIAAAEgBQAFgBAEgEQANgLALgvQALguAGhQIhkAAIgTAVIgsghIALgGIANgFIAHgvIAFgzIADgtIAwASIBKAAIAAh8IiOAAIgFgSICMAAIAWgYIAxAlQgDAEgHAEQgHADgKACIAACVQAAACgFADQgGADgHACQgHACgHAAIgFAAIAAgbIhXAAIgEAlIgEAnIgGAkIBiAAIAWgYIAtAmQgDADgGACIgPAEQgGBagOA1QgNA1gVARQgMALgPAEQgPAFgSAAQAAgJgCgHgAhLiWIgFgSIElAAIAcgkIAJAHIAUASIAWATQgCAFgEADQgEACgGAAgABei0QgCgRgIgSQgIgSgKgRQgLgRgLgNIAIgEQAsAUATAWQASAXAAASQAAASgLAIQgFACgFAAQgIAAgKgHg");
	this.shape_9.setTransform(1284.075,135.6712);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AAUEYQgJgDgLgIIAmgtIAlgvIAhgrIkuAAIgGgRIE7AAIAYgYIArAqQgFADgHACQgJACgLABIggAqIgpAyIgnAvIgDABQgHAAgIgDgAAHBkQgGgSgPgTQgPgTgQgOIAGgFQAqAKASAQQATAPABAPQABAOgKAHQgFADgFAAQgHAAgIgFgAkkBfQAngMAogSQAngSAlgVQAkgVAcgVQAcgWAPgUIj3AAIgGgSIB5AAIAAhFIhTAAIgEgSIBXAAIAAhCIheAAIgFgTICrAAIAdghIAIAHIAUAQIAVATQgBAFgEACQgEADgHAAIheAAIAABCIAiAAIAXgfIAIAHIASAPIAUARQgBAFgEADQgEACgGAAIhYAAIAABFIArAAIAbgiIAJAHIAUAQIAVATQgBADgCACIgEAEIA5AKQgBAGgHACQgFACgNABQAfAUAsASQAsAQAzAMQAzANAyAHIAAAIQgPAFgLAKQgJALgDAMQgygMgugTQgvgTgmgYQgmgXgYgcQgeAbgyAZQgwAag6AWQg5AWg7ANgAAMg6IgFgSIBeAAIAAhFIhQAAIgEgSIBUAAIAAhCIhfAAIgEgTIC8AAIAbgiIAJAHIAVARIAVATQAAAFgFACQgDADgHAAIhxAAIAABCIAoAAIAaghIAIAHIATAPIAVATQgCAFgEACQgFADgGAAIhhAAIAABFIA9AAIAcgjIAJAHIAVAQIAWAUQgCAFgEACQgEADgGAAg");
	this.shape_10.setTransform(1222.85,136.4536);

	this.instance = new lib.ClipGroup_0();
	this.instance.setTransform(873.8,396.9,3.8726,3.8726,0,0,0,227.2,104.1);

	this.instance_1 = new lib.ClipGroup_1_2();
	this.instance_1.setTransform(816.1,397.3,3.8726,3.8726,0,0,0,210.8,103.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件2_1, new cjs.Rectangle(-6.2,-6.2,1759.5,806.1), null);


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
	this.shape.graphics.f().s("#EA913D").ss(1,0,0,4).p("AAAkRIAAIi");
	this.shape.setTransform(1247.7219,393.075,3.8726,3.8726);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AidEVQAkgZAZgfQAZgfAOgkQgLgXgKgdQgLgcgIgjIAKgFQAJAeAJAYQAKAYALATQALgiAHgkQAGglACglIgkAAIgQAOIglgcIAJgFIAMgFIAUgzIAUg6IARg2Ig/AAIgGgSIBCAAIAWgXIAsAoQgFAFgHACQgIACgKABIgPAyIgUA5IgVA1IAfAAIAVgXIApAlQgDAEgFACQgFACgKABQgEAsgKArQgJArgRAmQAXAdAgAQQAfAQApAHQAoAGAyAAIBlAAIAAAIQgLADgGAIQgGAJgBAMIhQAAQg1AAgrgIQgqgIgggUQghgUgYgjQgTAegbAaQgbAagnAVgAjqDhQANgKADgFQAFgGAAgHIAAiZIhFAAIgEgSIBJAAIAAhiIgnAAIgEgSQgNAWgNARIgJgFQALgWAKgdQAKgdAKggQAJggAHgfQAIgeADgYIA+ARQgCAGgFAEQgEADgMAAIgIAaIgKAbIAlAAIAZgeIAIAGIARAOIAUASQgBAFgEADQgEACgHAAIhjAAQgKAYgLAYIgZAtIBWAAIAXgeIAIAGIARAPIATASQgBAFgFACQgDADgIAAIg5AAIAABiIAQAAIAXgcIAHAFIARAPIARAQQgBAFgEADQgDACgIAAIhAAAIAACTIAjgZIAmgbIAHAIIglApQgYAbgdAfIgEAKIgEAGgABnDZIAAhVIhUAAIgGgTIBaAAIAAg+IhAAAIgGgSIBGAAIAAhCIg7AAIgFgSIBAAAIAAhDIheAAIgFgTIBjAAIAAhAIg+AAIgFgSIBDAAIAAg9IA7AHQgCAGgFAFQgEAEgMACIAAAlIAwAAIATgVIApAhQgCADgGADQgGACgGABIAAA9IAHAAIASgeIAGAGIAOAQIAPARQgBAFgEACQgEADgGAAIgtAAIAABbQgCADgJAFQgKAEgKAAIgFAAIAAgSIg0AAIAABCIArAAIAXggIAIAHIARAPIATASQgBAFgEADQgFACgGAAIheAAIAAA+IA3AAIAZghIAIAHIATAQIATATQgCAFgEACQgEADgGAAIhuAAIAABHQAAAEgJAFQgJAEgLABgACLgzIA0AAIAAhDIg0AAgACLiJIA0AAIAAhAIg0AAg");
	this.shape_1.setTransform(1358.3,243.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AAUEYQgJgDgLgIIAlgtIAmgvIAhgrIkuAAIgGgRIE7AAIAYgYIArAqQgFADgHACQgJACgKABIghAqIgoAyIgpAvIgCABQgHAAgIgDgAAHBkQgGgSgPgTQgPgTgQgOIAGgFQAqAKASAQQATAPABAPQABAOgKAHQgFADgFAAQgHAAgIgFgAkkBfQAngMAngSQAogSAlgVQAlgVAbgVQAcgWAPgUIj4AAIgFgSIB5AAIAAhFIhSAAIgGgSIBYAAIAAhCIheAAIgFgTICrAAIAdghIAIAHIATAQIAWATQgBAFgEACQgEADgHAAIhfAAIAABCIAiAAIAZgfIAIAHIARAPIAUARQgBAFgEADQgEACgHAAIhYAAIAABFIArAAIAcgiIAJAHIATAQIAWATQgBADgCACIgEAEIA5AKQgBAGgHACQgFACgNABQAeAUAtASQAsAQAzAMQAzANAyAHIAAAIQgQAFgJAKQgLALgCAMQgxgMgvgTQgugTgngYQgmgXgZgcQgdAbgyAZQgwAag6AWQg6AWg6ANgAAMg6IgFgSIBdAAIAAhFIhPAAIgEgSIBTAAIAAhCIhdAAIgGgTIC9AAIAbgiIAJAHIAVARIAWATQgBAFgFACQgDADgHAAIhxAAIAABCIAoAAIAaghIAIAHIATAPIAVATQgCAFgEACQgFADgGAAIhhAAIAABFIA9AAIAcgjIAJAHIAVAQIAWAUQgBAFgFACQgEADgGAAg");
	this.shape_2.setTransform(1296.4,244.7536);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgVEdIAAmNIBAAHQgCAHgFAFQgFAEgLABIAAFmQgBAFgLAFQgJAFgMAAgAkfAKQA4gkA0gyQAzgyAog2QAng2AVgyIBGATQgCAFgGADQgFADgMABQAeAsApAoQApAoAzAhQAyAiA6AZIgBAKQgOADgJAKQgJAKgFALQhRgvg/hBQg/hBgmhMQgaAvgsAxQgsAyg3AsQg3Asg/Afg");
	this.shape_3.setTransform(1234.175,244.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhHDeQgegNgRgZQgRgZAAgkQAAgnAZgdQAZgdAxgYQgsgXgVggQgUggABgoQAAghAQgYQARgZAbgNQAcgOAhAAQAjAAAZAOQAaANAOAYQANAXABAfQAAASgIAUQgHAVgSATQgSAUggASQA2AXAZAgQAZAfAAAsQAAAjgSAbQgRAagfAPQgfAPgnAAQgoAAgfgNgAhHA6QgSAYAAAlQABApAYAZQAZAZAoABQApgBAXgYQAXgYABgnQAAgWgKgSQgJgSgYgRQgXgSgngSQglAWgSAYgAgljIQgRAKgLAQQgKARgBAZQAAATAHATQAIATATASQAUASAiARQAhgYAOgaQAPgZgBghQAAgVgIgSQgJgSgQgLQgQgLgYAAQgUAAgRAJg");
	this.shape_4.setTransform(1171.1505,245.15);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AhHDeQgegNgRgZQgRgZAAgkQAAgnAZgdQAZgdAxgYQgsgXgVggQgUggABgoQAAghAQgYQARgZAbgNQAcgOAhAAQAjAAAZAOQAaANAOAYQANAXABAfQABASgJAUQgHAVgSATQgSAUggASQA2AXAZAgQAZAfAAAsQAAAjgSAbQgRAagfAPQgfAPgnAAQgoAAgfgNgAhHA6QgSAYAAAlQABApAYAZQAZAZAoABQApgBAXgYQAXgYABgnQAAgWgKgSQgJgSgYgRQgXgSgngSQglAWgSAYgAgljIQgRAKgLAQQgKARgBAZQAAATAHATQAIATATASQAUASAiARQAhgYAOgaQAPgZgBghQAAgVgIgSQgJgSgQgLQgQgLgYAAQgUAAgRAJg");
	this.shape_5.setTransform(1137.8505,245.15);

	this.instance = new lib.ClipGroup_0_1();
	this.instance.setTransform(815.9,397.15,3.8726,3.8726,0,0,0,212.2,104.1);

	this.instance_1 = new lib.ClipGroup_1_3();
	this.instance_1.setTransform(815.9,397.15,3.8726,3.8726,0,0,0,211.8,103.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件1, new cjs.Rectangle(-6,-6,1643.9,806.1), null);


(lib.元件7 = function(mode,startPosition,loop,reversed) {
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
	this.i3 = new lib.元件4();
	this.i3.name = "i3";
	this.i3.setTransform(7.6,7.6,1,1,0,0,0,7.6,7.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AlwE3IAApsILhAAIAAJsg");
	this.shape.setTransform(3.475,8.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.i3}]}).to({state:[{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.4,-22.8,73.8,62.099999999999994);


(lib.元件6 = function(mode,startPosition,loop,reversed) {
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
	this.i1 = new lib.元件4();
	this.i1.name = "i1";
	this.i1.setTransform(7.6,7.6,1,1,0,0,0,7.6,7.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AkwExIAAphIJhAAIAAJhg");
	this.shape.setTransform(10.3,15.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.i1}]}).to({state:[{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.2,-14.6,61,61);


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
	this.i2 = new lib.元件4();
	this.i2.name = "i2";
	this.i2.setTransform(7.6,7.6,1,1,0,0,0,7.6,7.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AlwE3IAApsILhAAIAAJsg");
	this.shape.setTransform(3.475,8.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.i2}]}).to({state:[{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.4,-22.8,73.8,62.099999999999994);


// stage content:
(lib.钢琴 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:4};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,730];
	this.streamSoundSymbolsList[4] = [{id:"yx121003钢琴音乐",startFrame:4,endFrame:731,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		
		
		
		var _this = this;
		
		
		
		
		_this.m1.on('click', function(){
		
		_this.gotoAndPlay('m1');
			
		});
		
		
		
		
		_this.i1.on('click', function(){
		
		_this.image1.visible = true;
			
		});
		
		
		_this.image1.on('click', function(){
		
		_this.image1.visible = false;
			
		});
		
		
		
		_this.i2.on('click', function(){
		
		_this.image2.visible = true;
			
		});
		
		
		_this.image2.on('click', function(){
		
		_this.image2.visible = false;
			
		});
		
		
		
		_this.i3.on('click', function(){
		
		_this.image3.visible = true;
			
		});
		
		
		_this.image3.on('click', function(){
		
		_this.image3.visible = false;
			
		});
	}
	this.frame_4 = function() {
		var soundInstance = playSound("yx121003钢琴音乐",0);
		this.InsertIntoSoundStreamData(soundInstance,4,731,1);
		var _this = this;
		
		
		
		_this.m1stop.on('click', function(){
		
		_this.gotoAndStop(0);
			
		});
	}
	this.frame_730 = function() {
		this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(726).call(this.frame_730).wait(1));

	// 细节
	this.image3 = new lib.元件8();
	this.image3.name = "image3";
	this.image3.setTransform(936,623.5,1,1,0,0,0,816,328.5);
	this.image3.visible = false;

	this.image2 = new lib.元件2_1();
	this.image2.name = "image2";
	this.image2.setTransform(1025.95,566.5,1,1,0,0,0,873.6,396.9);
	this.image2.visible = false;

	this.image1 = new lib.元件1();
	this.image1.name = "image1";
	this.image1.setTransform(936.4,552.75,1,1,0,0,0,816.1,397.1);
	this.image1.visible = false;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.image1},{t:this.image2},{t:this.image3}]}).to({state:[]},4).wait(727));

	// 细节按钮
	this.i3 = new lib.元件7();
	this.i3.name = "i3";
	this.i3.setTransform(483.9,833.35,1,1,0,0,0,7.6,7.6);
	new cjs.ButtonHelper(this.i3, 0, 1, 2, false, new lib.元件7(), 3);

	this.i1 = new lib.元件6();
	this.i1.name = "i1";
	this.i1.setTransform(436.2,680.05,1,1,0,0,0,7.6,7.6);
	new cjs.ButtonHelper(this.i1, 0, 1, 2, false, new lib.元件6(), 3);

	this.i2 = new lib.元件5();
	this.i2.name = "i2";
	this.i2.setTransform(667.5,621.7,1,1,0,0,0,7.6,7.6);
	new cjs.ButtonHelper(this.i2, 0, 1, 2, false, new lib.元件5(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.i2},{t:this.i1},{t:this.i3}]}).to({state:[]},4).wait(727));

	// 音频停止
	this.m1 = new lib.音频播放标();
	this.m1.name = "m1";
	this.m1.setTransform(1084.05,162.8);
	new cjs.ButtonHelper(this.m1, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m1stop = new lib.音频停止();
	this.m1stop.name = "m1stop";
	this.m1stop.setTransform(1090.2,158.55);
	new cjs.ButtonHelper(this.m1stop, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m1}]}).to({state:[{t:this.m1stop}]},4).wait(727));

	// image
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#231916").s().p("AALCYQgFgCgGgEIAVgZIAUgZIASgXIikAAIgDgKICrAAIANgNIAXAXQgCACgFABIgKABIgSAXIgWAcIgVAZIgDABIgHgCgAAEA2QgDgJgIgLQgIgKgJgIIAEgDQAWAGAKAIQAKAJAAAIQABAIgFADQgDACgDAAQgDAAgFgDgAieAzQAVgGAWgKQAWgJATgMQAUgLAPgLQAPgMAIgLIiGAAIgDgKIBCAAIAAglIgtAAIgDgKIAwAAIAAgkIgzAAIgDgKIBdAAIAPgSIAFADIALAJIALAKQAAADgDACIgFABIg0AAIAAAkIATAAIANgRIAEAEIAKAIIAKAJQAAABAAABQAAAAgBABQAAAAAAABQgBAAAAAAQgDACgDAAIgwAAIAAAlIAYAAIAOgSIAFADIALAJIAMAKIgCADIgCACIAeAGQAAADgEABIgKACQARALAYAJQAYAIAcAHQAbAHAbAEIAAAFQgIACgFAGQgGAFgBAHQgbgHgZgKQgagKgUgNQgVgMgOgPQgPAOgbANQgaAPggALQgfAMggAHgAAHgfIgDgKIAzAAIAAgmIgrAAIgDgJIAuAAIAAgkIgzAAIgDgKIBmAAIAPgTIAFAEIALAJIAMAKQAAADgCACIgGABIg+AAIAAAkIAWAAIAOgSIAEADIALAJIALAKIgDAEIgGABIg1AAIAAAmIAiAAIAPgTIAFAEIALAJIAMAKQgBADgCABQgCACgEAAg");
	this.shape.setTransform(1440.725,938.3563);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#231916").s().p("ABpCRQgCgFgDgCQgDgDgIgBIgSgEIAAgFIAGAAIAMABIAOABIAKAAQAFAAACgBQABgCAAgEIAAjxIh4AAIAAELQgBACgDACQgFAEgHAAIgFAAIAAkoIAXALIBzAAIALgNIAcAVIgGAEIgJADIAADuQAAAJgCAHQgCAGgIAEQgHAEgQACQAAgFgCgEgAhzB6QAIgGACgDQACgCAAgFIAAhWIgyAAIgDgKIA1AAIAAgvIgdAAIgDgKIA9AAIAOgSIAEAEIALAJIALAKQgBADgCABIgFABIgoAAIAAAvIAQAAIAPgRIAEADIAKAIIAMAKIgEAEQgCABgDABIgwAAIAABTIAZgRIAbgUIADAFIgZAbIgjAkIgDAGIgCAEgAAIBbQARgWANgZQAMgaAJgbQgJgTgLgTQgMgSgOgPIAFgDIAaAbIAVAbIAJglIAGgjIAjAIQgBAEgCABQgDACgHAAQgEASgGATQgFAUgJAVQAUAeAFAYQAHAXgEAKQgDAKgJgHIgLghIgOglQgLAXgOAVQgNAVgSARgAicgeQAHgMAGgPIAMggIAKgiIAGgeIAiAKQAAACgDACQgDACgGABIgFAPIgGARIAlAAIANgSIAFADIAKAJIALAKQgBADgCABIgGABIhIAAQgIAUgLARQgLARgNAOg");
	this.shape_1.setTransform(1406.7,938);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#231916").s().p("ACKCYQgGAAgJgFQgJgEgHgHQgcgVgRggQgTgfgJgnQgLgmgEgtIioAAIgDgKICqAAIgBgjIgBglIAkAEQgBAEgCACQgDADgGABIAAAdIACAdIBBAAIAQgUIAFAEIAMAKIANALQgBABAAAAQAAABAAAAQgBABAAAAQgBABAAAAQgCABgEAAIhlAAQADAnAIAiQAIAkARAcQAPAcAZASQAEAEACAAQACAAACgFIAIgRIAHgVIAEAAIgFAzQAHAKACAFQABAFgCADQgFAFgGAAIgCgBgAiTB5IAegHIAqgKIAAhoIg8AAIgCgKIBuAAIAPgTIAFAEIAKAJIAMAKQgBADgCACIgFABIg8AAIAABiIAlgJIAmgKIACAFIg+AZIhXAeQAAADgCACIgFADgABphmQgFgGgHgIIgPgNQgIgHgHgEIACgDQAbADANAIQANAIACAIQADAJgFAEQgDADgDAAIgHgCg");
	this.shape_2.setTransform(1373.35,938.0023);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#231916").s().p("AiXCPIgEgKICpAAQALgaAJgdQALgfAHgeQAJgcAGgaIAkAKQAAADgEACQgDACgGAAQgGAVgLAaQgLAbgMAbQgNAcgOAYIBTAAIARgWIAGAFIAMAKIAPALQgBAEgDABQgDABgDAAgAg5BtQABgWgHgZQgFgagIgZQgJgYgJgUIAFgCQAdAjANAeQANAfABAVQAAAWgHAHQgCAEgEAAQgFAAgGgGgAiJg6IgDgKIDqAAIARgVIAFAEIANAKIANAMQAAADgDABIgGABgAgEhOQgCgJgGgMIgMgVQgIgLgIgJIAFgCQAbANAMANQALAOABALQABALgFAFQgDABgDAAQgFAAgFgEg");
	this.shape_3.setTransform(1339.65,936.95);

	this.instance = new lib.ClipGroup_0_2();
	this.instance.setTransform(1436.35,664.4,2.1041,2.1041,0,0,0,115.8,115.8);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#231916").s().p("AALCYQgFgCgGgEIAVgZIAUgZIASgXIikAAIgDgKICrAAIANgNIAXAXQgCACgFABIgKABIgSAXIgWAcIgVAZIgDABIgHgCgAAEA2QgDgJgIgLQgIgKgJgIIAEgDQAWAGAKAIQAKAJAAAIQABAIgFADQgDACgDAAQgDAAgFgDgAieAzQAVgGAWgKQAWgJATgMQAUgLAPgLQAPgMAIgLIiGAAIgDgKIBCAAIAAglIgtAAIgDgKIAwAAIAAgkIgzAAIgDgKIBdAAIAPgSIAFADIALAJIALAKQAAADgDACIgFABIg0AAIAAAkIATAAIANgRIAEAEIAKAIIAKAJQAAABAAABQAAAAgBABQAAAAAAABQgBAAAAAAQgDACgDAAIgwAAIAAAlIAYAAIAOgSIAFADIALAJIAMAKIgCADIgCACIAeAGQAAADgEABIgKACQARALAYAJQAYAIAcAHQAbAHAbAEIAAAFQgIACgFAGQgGAFgBAHQgbgHgZgKQgagKgUgNQgVgMgOgPQgPAOgbANQgaAPggALQgfAMggAHgAAHgfIgDgKIAzAAIAAgmIgrAAIgDgJIAuAAIAAgkIgzAAIgDgKIBmAAIAPgTIAFAEIALAJIAMAKQAAADgCACIgGABIg+AAIAAAkIAWAAIAOgSIAEADIALAJIALAKIgDAEIgGABIg1AAIAAAmIAiAAIAPgTIAFAEIALAJIAMAKQgBADgCABQgCACgEAAg");
	this.shape_4.setTransform(720.225,938.3563);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#231916").s().p("ABpCRQgBgFgEgCQgEgDgGgBIgTgEIAAgFIAGAAIANABIANABIAKAAQAEAAACgBQACgCAAgEIAAjxIh4AAIAAELQgBACgDACQgFAEgHAAIgEAAIAAkoIAVALIB0AAIALgNIAcAVIgFAEIgJADIAADuQAAAJgCAHQgDAGgIAEQgHAEgPACQgBgFgCgEgAhzB6QAHgGADgDQADgCgBgFIAAhWIgxAAIgDgKIA0AAIAAgvIgdAAIgCgKIA9AAIANgSIAFAEIAKAJIALAKQAAADgDABIgGABIgmAAIAAAvIAQAAIANgRIAGADIAKAIIAKAKIgCAEQgDABgDABIgvAAIAABTIAYgRIAbgUIADAFIgZAbIgkAkIgBAGIgDAEgAAIBbQARgWAMgZQANgaAKgbQgJgTgMgTQgMgSgOgPIAFgDIAaAbIAVAbIAJglIAGgjIAkAIQgBAEgEABQgDACgGAAQgEASgGATQgGAUgHAVQASAeAGAYQAHAXgDAKQgEAKgKgHIgKghIgOglQgLAXgNAVQgOAVgTARgAicgeQAHgMAGgPIAMggIAJgiIAGgeIAjAKQgBACgCACQgDACgGABIgFAPIgHARIAlAAIAPgSIAEADIAKAJIAMAKQgBADgDABIgFABIhIAAQgJAUgLARQgLARgMAOg");
	this.shape_5.setTransform(686.2,938);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#231916").s().p("AiJCWQAVgUALgYQAMgXAEgaQADgZgBgaIAAhCQgLAKgMAJQgNAIgNAHIgEgEQAUgPAUgUQAUgUAPgXQAQgXAJgWIAjAKQAAABAAAAQAAABgBAAQAAABgBAAQAAABgBAAQgDABgGgBIgIALIgHALIBOAAIAPgOIAZAXIgFADIgJABIgXAVQgOAMgOAJIBSAAIALgNIAbAUIgFADQgEACgFABIAACrQABAJgCAGQgDAHgHAEQgIAEgQACIgCgKQgCgEgEgDIgKgEQgHgDgMgBIAAgFIAGAAIAMABIAPABIAKAAQAFAAABgBQACgCAAgEIAAg3IhNAAIAABKQAAABgFADQgGACgHABIgDAAIAAhRIhOAAQgFAZgPAXQgPAXgdATgAAdA2IBNAAIAAgyIhNAAgAhBAGIAAAXIgDAZIBMAAIAAgyIhJAAgAAdgFIBNAAIAAgwIhNAAgAhBgFIBJAAIAAgwIhJAAgAg5hYQgJAKgKAJIAPAHIBJAAQAJgKAIgMQAKgMAGgLIhVAAIgRATg");
	this.shape_6.setTransform(651.55,938.025);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#231916").s().p("AiYCDIgDgKIECAAIATgXIAGAFIANAKIAPANIgDAEQgCABgEAAgAhtALIgDgKICoAAIASgWIAFAFIANAKIAOALIgDAEQgCABgEABgAiFhiIgDgKIDfAAIASgXIAGAFIANALIAPALQgBADgCACIgGABg");
	this.shape_7.setTransform(619.275,937.55);

	this.instance_1 = new lib.ClipGroup_1_1();
	this.instance_1.setTransform(625.5,645.8,1.986,1.986,0,0,0,149.7,126);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.instance},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(731));

	// title
	this.instance_2 = new lib.Group_0();
	this.instance_2.setTransform(1134.15,286.65,2.4777,2.4777,0,0,0,14.4,4.5);
	this.instance_2.alpha = 0.5;

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(866.55,286.65,2.4777,2.4777,0,0,0,14.4,4.5);
	this.instance_3.alpha = 0.5;

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#51C1E1").s().p("AiICyIAAh2IgWAIIgaAIIgDgFQApgPAegVQAegVAWgXIhxAAIgEgMIB+AAIARgXIANgXIgIAEIgJABIgFAAIAAgMIhFAAIAAAUQAAADgHACQgGADgIABIgDAAIAAiBIAaAMIBAAAIANgPIAfAXQgCADgEACQgFACgFABIAABMIAjAOQgCAEgEABQgDACgGgBIgJAPIgLAOICWAAIATgXIAFAEIAPALIAPANQgBADgDACQgDACgEAAIh/AAQAXARAjANQAkAOAyAGIgBAEQgGACgDAHQgEAHgBAJIgLgDIgMgDIgFADIgJADIAABaQgBACgDACIgIADIgJACIgEAAIAAgUIhFAAIAAATQgBACgFADQgHADgIAAIgEAAIAAiHIAbAMIA/AAIAEgEQgZgMgTgPQgTgPgPgQIhBAAQgQAPgUAQQgVAQgbANIAGACIA8AAIAOgPIAfAYQgCACgEACIgKADIAABaIgEADIgIADIgJACIgEAAIAAgSIhCAAIAAAVQAAACgGADQgHADgHAAgAAqCJIBFAAIAAhIIhFAAgAhwCJIBCAAIAAhIIhCAAgAh0hWIBFAAIAAhAIhFAAgABJgZQgFgJgJgKQgIgLgKgIIgHADQgFABgFAAIgDAAIAAhyIAbALIBDAAIAPgPIAfAXQgCADgEACIgLAEIAABSQAAAAAAABQgBAAAAAAQgBABAAAAQgBAAgBABIgIADIgJACIgEAAIAAgTIhJAAIAAAFQAYAGAMAJQALAJAAAIQABAJgGAEQgDACgDAAQgEAAgFgDgAAuhWIBJAAIAAhAIhJAAg");
	this.shape_8.setTransform(1059.85,288.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#51C1E1").s().p("AgTCqQgCgFgEgDQgFgDgJgDQgIgDgPgBIAAgGIAHAAIARABIASABIAMABQAGAAACgCQABgCAAgFIAAiRIhoAAIgMALIgcgTIAGgEIAHgDIAGghIAGglIAGgmIADgeIAnAKIBFgIQAigFAfgGQAfgGAWgGIAbAdQgCACgFgBQgGAAgHgCIg+AGQgjADglACIhLACIgFAmIgHArIgHAoIBpAAIAAhgIAoAFQgBAEgDACQgDAEgHABIAABQIBgAAIASgXIAGAFIAOALIAOAMQgBADgCACQgDABgEABIiKAAIAACTQAAALgDAIQgDAIgJAFQgJAEgTACQAAgGgDgEgAi0CbQASgOATgVQASgUARgaQARgYANgcIAkATQgBADgEACQgEABgHgBQgYAmgeAdQgeAdghATgACdCVQgIgSgPgWQgQgWgSgVQgTgVgQgQIAEgEQApAWAYAVQAYAVALASQALARAAANQABAMgHADQgCACgDAAQgFAAgHgFg");
	this.shape_9.setTransform(1019.9018,287.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#51C1E1").s().p("AizCvIgDgMIAzAAIAAhsIAeANIDIAAIANgNIAbAUIgEAEIgIACIAABSIAKAAIAPgVIAFAEIAMALIANAMQgBADgDACQgDABgDAAgAAwCjIA2AAIAAhTIg2AAgAgdCjIA1AAIAAhTIg1AAgAhqCjIA1AAIAAhTIg1AAgAizA6QAagNAPgPQAQgPAHgRQAIgSADgUIhIAAIgDgMIBMAAIAAgJIAAgIIAAhKIAeANIAnAAIAGgWIAGgWIAqAJQgBAEgEACQgEADgGAAIgKAMIgNAOIBjAAIANgQIAhAYQgCADgEACQgEACgGABIAAA+IAUAAIATgYIAFAFIANALIAPANQgBADgDACQgDACgEAAIg9AAIAAA5QAAAKgDAIQgDAHgIAFQgJAFgSABIgCgKQgCgFgEgDQgEgDgIgDIgUgDIAAgHIAGABIAOABIAQABIAKAAQAFAAACgCQACgCAAgEIAAg2IikAAQgDAVgKATQgKATgUAQQgTAQghAMgAhNhFIgBAIIAAAJICjAAIAAhDIiiAAgAgDAYQgCgJgGgKQgGgJgIgJQgIgJgIgHIAEgDQAdAJAMALQANAMABAKQABAKgGAFQgDACgEAAQgEAAgFgDgAAAg9QgCgMgKgNQgKgNgLgJIAFgEQAbAHALALQAMALABAJQAAAKgGAFQgDACgDAAQgFAAgGgEg");
	this.shape_10.setTransform(980.725,286.975);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#51C1E1").s().p("AhkCxQAXgQAQgTQAQgUAJgXQgHgPgHgTQgGgSgGgWIAHgDQAFATAGAPQAHAPAHANQAHgVAEgYQAEgYACgXIgYAAIgKAIIgYgRIAGgDIAIgDIAMghIANgmIALghIgoAAIgEgNIAqAAIAOgNIAcAZQgDADgFABIgLACIgJAgIgNAlIgNAiIATAAIAOgPIAaAYQgCACgDABIgKACQgDAcgGAcQgFAbgMAYQAQATATALQAVAJAZAFQAaAEAhAAIBAAAIAAAFQgHACgEAFQgEAFgBAIIgzAAQgiABgbgGQgbgFgVgMQgUgNgQgXQgLATgSARQgRARgZANgAiVCQQAIgGACgDQADgEAAgFIAAhiIgsAAIgDgLIAvAAIAAg/IgZAAIgCgLIgRAZIgGgDQAHgOAGgTQAHgTAGgUIALgpIAHgiIAnAMQgBADgDACQgDACgHABIgFAQIgHARIAYAAIAQgTIAFAEIALAJIANALQgBADgDACQgCABgEABIhAAAQgGAPgIAPIgPAdIA3AAIAPgTIAFAEIALAKIAMAKQgBAEgDACQgDABgEAAIglAAIAAA/IAKAAIAPgSIAFADIAKAJIALALQAAADgDACQgCACgEgBIgqAAIAABfIAXgQIAYgSIAEAFIgXAaIgiAlIgDAHIgDAEgABCCLIAAg3Ig2AAIgDgLIA5AAIAAgoIgpAAIgDgMIAsAAIAAgpIgmAAIgDgNIApAAIAAgrIg8AAIgEgLIBAAAIAAgpIgoAAIgDgMIArAAIAAgnIAlAEQAAAFgEACQgDADgHACIAAAXIAfAAIAMgNIAaAVQgBACgEACQgDABgFABIAAAnIAFAAIALgUIAEAEIAJALIAKALQgBADgDABQgCABgEAAIgdAAIAAA7QgBACgGADQgGACgGABIgDAAIAAgLIgiAAIAAApIAbAAIAPgVIAFAFIALAKIAMAMQgBADgCABQgDACgEAAIg8AAIAAAoIAkAAIAPgWIAGAEIALALIAMAMQAAADgDACQgDABgDAAIhHAAIAAAuQAAADgGACQgGADgGABgABZghIAiAAIAAgrIgiAAgABZhXIAiAAIAAgpIgiAAg");
	this.shape_11.setTransform(940.975,287.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#51C1E1").s().p("AAGDJIAvgwIAqgvIj9AAIAAgdIEaAAIAFgDIAYANIgkApIgqAsIgoAsgAjWBAIgMgMQAtgOArgSQAqgSAjgUQAigWAXgXIAVAKIAAgaIBRAAIAAgsIhJAAIAAgZIBJAAIAAgoIhYAAIAAgbIDJAAIAAAbIhRAAIAAAoIBIAAIAAAZIhIAAIAAAsIBXAAIAAAbIjFAAIADACIgGAHQAWARAiASQAiAPAoAPQAoAOAoAKQgGAGgFAIIgKAPQgpgLgngRQgogQghgTQgjgSgWgSQgnAgg0AZQgzAag7ATIgJgOgAgDAvQgPgPgQgNIAXgPQAQAMAQAQQAQAOAIANIgYARQgJgNgPgQgAjWg0IAAgbIBVAAIAAgqIhGAAIAAgZIBGAAIAAgqIhTAAIAAgbIC+AAIAAAbIhLAAIAAAqIBBAAIAAAZIhBAAIAAAqIBPAAIAAAbg");
	this.shape_12.setTransform(1027.65,216.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#51C1E1").s().p("AgXDhIAAmoIDyAAIAAF6QAAAOgEAHQgEAIgJAEQgKAEgRABQgQABgbgBIgDgOIgHgPIAjABIAVAAQAGAAACgCQADgDAAgGIAAlcIi2AAIAAGLgAiSDOIgIgOQAHgDAFgHQAGgHAAgOIAAhwIhGAAIAAgeIBGAAIAAhGIguAAIAAgeICHAAIAAAeIg5AAIAABGIBFAAIAAAeIhFAAIAAB0IA9geIACAPIADANIg9AgIgdAQQgIAGgDADIgHgOgAAZCdIgNgIQAVgdASgkQATgkAQgpIgfg6QgRgdgQgaIAYgMIAaAsQAOAXANAZIAUg+IASg+IAcAFQgLAngMAmQgMAmgOAjQASAhANAeQAOAfAKAZIgZANIgTgtIgZg0QgPAjgQAgQgQAggRAaIgNgIgAjRhZIgKgPQAXgWASggQASgfALgjIAdAIIgJAZIgKAYIBjAAIAAAfIhzAAQgLASgLAQQgMAQgMANIgIgQg");
	this.shape_13.setTransform(972.1,215.375);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#EDF9FC").s().p("AiDUEQj8gHjNhjIhFAAQlzgJkjiLQiGANiQgEQpRgQmdkeQmbkgAImFQAJlSFDj0QAHjOCriNQCsiNDuAGQChAEB/BGQAshlBihRQCsiNDuAGQDtAGClCXQAeAbAYAdIAOAEIAYgQQDWiNErAIQEYAHDICIQAzg+BQg0QDXiNEqAIQEpAIDPCXQB1BVAxBoQCjg/DJAGQErAIDPCXQDOCYgFDOQGFEHgIFRQgKGGoVEFQoVEHrngUQhUgChSgGQitA2jHgFQgogBgngDQkdDkmBAAIggAAg");
	this.shape_14.setTransform(1004.8259,255.0453);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.instance_3},{t:this.instance_2}]}).wait(731));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1074.3,666.6,831.4000000000001,302.9);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#F7C677",
	opacity: 0.00,
	manifest: [
		{src:"images/钢琴_atlas_P_1.png?1693894136841", id:"钢琴_atlas_P_1"},
		{src:"sounds/yx121003钢琴音乐.mp3?1693894137037", id:"yx121003钢琴音乐"}
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