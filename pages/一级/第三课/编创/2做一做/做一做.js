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



(lib.鼓 = function() {
	this.initialize(img.鼓);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,692,655);


(lib.Bitmap2 = function() {
	this.initialize(img.Bitmap2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,294,267);


(lib.Bitmap3 = function() {
	this.initialize(img.Bitmap3);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,299,285);


(lib.Bitmap4 = function() {
	this.initialize(img.Bitmap4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,248,210);


(lib.Bitmap5 = function() {
	this.initialize(img.Bitmap5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,248,229);


(lib.Bitmap6 = function() {
	this.initialize(img.Bitmap6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,86,81);


(lib.右 = function() {
	this.initialize(img.右);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,285,115);


(lib.图层1png复制 = function() {
	this.initialize(img.图层1png复制);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,326,508);


(lib.图层2png复制 = function() {
	this.initialize(img.图层2png复制);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,179,135);


(lib.图层3png复制 = function() {
	this.initialize(img.图层3png复制);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,75,91);


(lib.图层4 = function() {
	this.initialize(img.图层4);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,212,138);


(lib.左 = function() {
	this.initialize(img.左);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,264,177);


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
	this.shape.setTransform(73.7423,46.6472,3.0687,3.0687);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_1.setTransform(57.0432,46.6855,3.0687,3.0687);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_2.setTransform(40.2384,46.6381,3.0687,3.0687);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgYAYQgKgJAAgPQAAgOAKgKQALgKANAAQAOAAAKAKQALAKAAAOQAAAPgLAJQgKALgOAAQgNAAgLgLg");
	this.shape_3.setTransform(22.6152,46.66,3.0687,3.0687);

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


(lib.补间9 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.图层2png复制();
	this.instance.setTransform(-120.85,-91.15,1.3503,1.3503);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-120.8,-91.1,241.7,182.3);


(lib.补间8 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Bitmap4();
	this.instance.setTransform(-124,-105);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124,-105,248,210);


(lib.补间7 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.Bitmap5();
	this.instance.setTransform(-124,-114);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-124,-114,248,229);


(lib.补间6 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.鼓();
	this.instance.setTransform(-121.75,-115.25,0.3519,0.3519);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-121.7,-115.2,243.5,230.5);


(lib.补间5 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.图层4();
	this.instance.setTransform(-54.45,-35.45,0.5136,0.5136);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-54.4,-35.4,108.9,70.9);


(lib.补间4 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.右();
	this.instance.setTransform(-73.2,-29.5,0.5136,0.5136);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.2,-29.5,146.4,59.1);


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
	this.instance = new lib.左();
	this.instance.setTransform(-67.8,-45.45,0.5136,0.5136);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.8,-45.4,135.6,90.9);


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


(lib.元件10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_3_png_复制
	this.instance = new lib.图层3png复制();
	this.instance.setTransform(116,140);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({_off:false},0).to({_off:true},2).wait(5).to({_off:false,x:121,y:146},0).to({_off:true},2).wait(4).to({_off:false,x:111,y:149},0).to({_off:true},2).wait(2));

	// 图层_2_png_复制
	this.instance_1 = new lib.补间9("synched",0);
	this.instance_1.setTransform(-88.55,266.75,1,1,-22.9554,0,0,-104.4,12.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:-104.3,regY:12.7,rotation:7.0435,x:-88.45,y:266.85},2).to({regX:-104.4,regY:12.6,rotation:-22.9555,x:-88.55,y:266.75},3).to({startPosition:0},2).to({regX:-104.3,regY:12.7,rotation:7.0435,x:-88.45,y:266.85},2).to({regX:-104.4,regY:12.6,rotation:-22.9555,x:-88.55,y:266.75},3).to({regX:-104.3,regY:12.7,rotation:7.0435,x:-88.45,y:266.85},3).wait(4));

	// 图层_1_png_复制
	this.instance_2 = new lib.图层1png复制();
	this.instance_2.setTransform(-46,-147,1.3309,1.3309);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(19));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-144.1,-147,532,676.1);


(lib.元件9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// 图层_3_png
	this.instance = new lib.补间7("synched",0);
	this.instance.setTransform(223.4,199.55,1,1,-14.9983,0,0,116.4,49.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:0,x:240.5,y:184.45},3).to({rotation:-14.9983,x:223.4,y:199.55},7).to({rotation:0,x:240.5,y:184.45},3).to({rotation:-14.9983,x:223.4,y:199.55},10).to({rotation:0,x:240.5,y:184.45},3).wait(7));

	// 图层_1_png
	this.instance_1 = new lib.补间8("synched",0);
	this.instance_1.setTransform(267.65,168.5,1,1,14.9983,0,0,105.5,79.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({regX:105.4,rotation:0,x:240.5,y:184.55},3).to({regX:105.5,rotation:14.9983,x:267.65,y:168.5},7).to({regX:105.4,rotation:0,x:240.5,y:184.55},3).to({regX:105.5,rotation:14.9983,x:267.65,y:168.5},10).to({regX:105.4,rotation:0,x:240.5,y:184.55},3).wait(7));

	// 图层_2_png
	this.instance_2 = new lib.Bitmap6();
	this.instance_2.setTransform(-48,-36);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({_off:false},0).to({_off:true},2).wait(8).to({_off:false},0).to({_off:true},2).wait(11).to({_off:false},0).to({_off:true},2).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-51,-69,384.2,394.4);


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

	// 左_png
	this.instance = new lib.补间1("synched",0);
	this.instance.setTransform(9.85,71.15,1,1,-57.9653,0,0,-67.8,-45.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:-18.4822,y:71.1},2).to({_off:true},1).wait(1).to({_off:false,regY:-45.2,rotation:-58.964,x:9.9,y:71.3},0).to({regY:-45.4,rotation:-57.9653,x:9.85,y:71.15},4).to({rotation:-18.4822,y:71.1},2).to({regY:-45.2,rotation:-58.964,x:9.9,y:71.3},2).to({regY:-45.4,rotation:-57.9653,x:9.85,y:71.15},2).to({rotation:-18.4822,y:71.1},2).to({regY:-45.2,rotation:-58.964,x:9.9,y:71.3},2).to({regY:-45.4,rotation:-57.9653,x:9.85,y:71.15},4).to({rotation:-18.4822,y:71.1},2).to({regY:-45.2,rotation:-58.964,x:9.9,y:71.3},2).to({regY:-45.4,rotation:-57.9653,x:9.85,y:71.15},2).to({rotation:-18.4822,y:71.1},2).to({regY:-45.2,rotation:-58.964,x:9.9,y:71.3},2).to({regY:-45.4,rotation:-57.9653,x:9.85,y:71.15},4).to({rotation:-18.4822,y:71.1},2).to({regY:-45.2,rotation:-58.964,x:9.9,y:71.3},2).to({regY:-45.4,rotation:-57.9653,x:9.85,y:71.15},3).to({rotation:-18.4822,y:71.1},2).to({regY:-45.2,rotation:-58.964,x:9.9,y:71.3},2).to({regY:-45.4,rotation:-57.9653,x:9.85,y:71.15},4).to({rotation:-18.4822,y:71.1},2).to({regY:-45.2,rotation:-58.964,x:9.9,y:71.3},2).wait(1));

	// 右_png
	this.instance_1 = new lib.补间4("synched",0);
	this.instance_1.setTransform(326.9,63.8,1,1,23.9571,0,0,73.2,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({startPosition:0},2).to({_off:true},1).wait(1).to({_off:false},0).to({startPosition:0},1).to({regY:0.1,rotation:-15.5167,x:327,y:63.9},2).to({regY:0,rotation:23.9571,x:326.9,y:63.8},2).to({regY:0.1,rotation:-15.5167,x:327,y:63.9},2).to({regY:0,rotation:23.9571,x:326.9,y:63.8},3).to({startPosition:0},5).to({regY:0.1,rotation:-15.5167,x:327,y:63.9},2).to({regY:0,rotation:23.9571,x:326.9,y:63.8},2).to({regY:0.1,rotation:-15.5167,x:327,y:63.9},2).to({regY:0,rotation:23.9571,x:326.9,y:63.8},3).to({startPosition:0},5).to({regY:0.1,rotation:-15.5167,x:327,y:63.9},2).to({regY:0,rotation:23.9571,x:326.9,y:63.8},2).to({regY:0.1,rotation:-15.5167,x:327,y:63.9},2).to({regY:0,rotation:23.9571,x:326.9,y:63.8},4).to({startPosition:0},5).to({regY:0.1,rotation:-15.5167,x:327,y:63.9},2).to({regY:0,rotation:23.9571,x:326.9,y:63.8},2).to({regY:0.1,rotation:-15.5167,x:327,y:63.9},2).wait(2));

	// 图层_4_png
	this.instance_2 = new lib.补间5("synched",0);
	this.instance_2.setTransform(172.55,65.8,0.8036,0.8036,75.0004);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({_off:false},0).to({_off:true},1).wait(13).to({_off:false,regX:0.1,regY:-0.1,x:172.65,y:65.9},0).to({_off:true},1).wait(13).to({_off:false},0).to({_off:true},1).wait(14).to({_off:false},0).to({_off:true},1).wait(10));

	// 鼓_png
	this.instance_3 = new lib.补间6("synched",0);
	this.instance_3.setTransform(162.75,179.85,1.0518,1.0518);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({startPosition:0},1).to({y:182.95},1).to({_off:true},1).wait(1).to({_off:false,y:179.85},0).to({startPosition:0},2).to({startPosition:0},1).to({y:182.95},1).to({y:179.85},2).to({startPosition:0},5).to({startPosition:0},1).to({y:182.95},1).to({y:179.85},2).to({startPosition:0},2).to({startPosition:0},1).to({y:182.95},1).to({y:179.85},2).to({startPosition:0},4).to({startPosition:0},1).to({y:182.95},1).to({y:179.85},2).to({startPosition:0},2).to({startPosition:0},1).to({y:182.95},1).to({y:179.85},2).to({startPosition:0},5).to({startPosition:0},1).to({y:182.95},1).to({y:179.85},2).to({startPosition:0},3).to({startPosition:0},1).to({y:182.95},1).to({y:179.85},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(9.7,-45,329.1,349.2);


// stage content:
(lib.做一做 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:4,m2:62,m3:101};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,5,59,62,63,95,101,102,121];
	this.streamSoundSymbolsList[5] = [{id:"yx14030201大鼓声",startFrame:5,endFrame:59,loop:1,offset:0}];
	this.streamSoundSymbolsList[63] = [{id:"yx14030202拍手的声音",startFrame:63,endFrame:95,loop:1,offset:0}];
	this.streamSoundSymbolsList[102] = [{id:"yx14030203敲门的声音",startFrame:102,endFrame:122,loop:1,offset:0}];
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
		
		
		_this.m3_btn.on('click', function(){
		
		_this.gotoAndPlay('m3');
			
		});
	}
	this.frame_4 = function() {
		var _this = this;
		
		_this.m1stop_btn.on('click', function(){
		
		_this.gotoAndStop('lnav1');
		});
	}
	this.frame_5 = function() {
		var soundInstance = playSound("yx14030201大鼓声",0);
		this.InsertIntoSoundStreamData(soundInstance,5,59,1);
	}
	this.frame_59 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_62 = function() {
		var _this = this;
		
		_this.m2stop_btn.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_63 = function() {
		var soundInstance = playSound("yx14030202拍手的声音",0);
		this.InsertIntoSoundStreamData(soundInstance,63,95,1);
	}
	this.frame_95 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}
	this.frame_101 = function() {
		var _this = this;
		
		_this.m3stop_btn.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_102 = function() {
		var soundInstance = playSound("yx14030203敲门的声音",0);
		this.InsertIntoSoundStreamData(soundInstance,102,122,1);
	}
	this.frame_121 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(54).call(this.frame_59).wait(3).call(this.frame_62).wait(1).call(this.frame_63).wait(32).call(this.frame_95).wait(6).call(this.frame_101).wait(1).call(this.frame_102).wait(19).call(this.frame_121).wait(1));

	// 音频停止
	this.m1stop_btn = new lib.音频停止();
	this.m1stop_btn.name = "m1stop_btn";
	this.m1stop_btn.setTransform(171.55,459.7,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m1stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m2stop_btn = new lib.音频停止();
	this.m2stop_btn.name = "m2stop_btn";
	this.m2stop_btn.setTransform(759.85,459.85,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m2stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m3stop_btn = new lib.音频停止();
	this.m3stop_btn.name = "m3stop_btn";
	this.m3stop_btn.setTransform(1344,459.85,1,1,0,0,0,42.2,52);
	new cjs.ButtonHelper(this.m3stop_btn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1stop_btn}]},4).to({state:[]},55).to({state:[{t:this.m2stop_btn}]},3).to({state:[]},33).to({state:[{t:this.m3stop_btn}]},6).wait(21));

	// 播放按钮
	this.m3_btn = new lib.音频播放标();
	this.m3_btn.name = "m3_btn";
	this.m3_btn.setTransform(1295.1,413.2);
	new cjs.ButtonHelper(this.m3_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m1_btn = new lib.音频播放标();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(122.75,413.2);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m2_btn = new lib.音频播放标();
	this.m2_btn.name = "m2_btn";
	this.m2_btn.setTransform(710.95,413.2);
	new cjs.ButtonHelper(this.m2_btn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m2_btn},{t:this.m1_btn},{t:this.m3_btn}]}).wait(122));

	// 边框和标题
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#F29539").ss(1,0,0,4).p("EA1AgZTQiNAAhkBlQhkBkAACOMAAAAn5QAACNBkBmQBkBkCNAAMBM/AAAQCMAABlhkQBkhmAAiNMAAAgn5QAAiOhkhkQhlhliMAAgEiB+gZTQiMAAhlBlQhkBkAACOMAAAAn5QAACNBkBmQBlBkCMAAMBM/AAAQCNAABkhkQBkhmAAiNMAAAgn5QAAiOhkhkQhkhliNAAgEgmfgZTQiNAAhkBlQhkBkAACOMAAAAn5QAACNBkBmQBkBkCNAAMBM+AAAQCNAABkhkQBkhmAAiNMAAAgn5QAAiOhkhkQhkhliNAAg");
	this.shape.setTransform(982.1,620.725);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(122));

	// 右 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("EgmeAZUQiNAAhkhkQhlhmABiNMAAAgn5QgBiOBlhkQBkhlCNAAMBM9AAAQCNAABlBlQBjBkABCOMAAAAn5QgBCNhjBmQhlBkiNAAg");
	mask.setTransform(1567.6,620.725);

	// 图层_7
	this.instance = new lib.补间9("synched",0);
	this.instance.setTransform(1268.9,674.05,1,1,-22.9555,0,0,-104.4,12.6);

	this.instance_1 = new lib.图层1png复制();
	this.instance_1.setTransform(1311,260,1.3309,1.3309);

	this.instance_2 = new lib.元件10("synched",0);
	this.instance_2.setTransform(1520.45,660.8,1,1,0,0,0,163,254);

	var maskedShapeInstanceList = [this.instance,this.instance_1,this.instance_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_2}]},101).wait(21));

	// 中 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("EgmeAZUQiNAAhlhkQhjhmgBiNMAAAgn5QABiOBjhkQBlhlCNAAMBM9AAAQCNAABkBlQBlBkgBCOMAAAAn5QABCNhlBmQhkBkiNAAg");
	mask_1.setTransform(982.1,620.725);

	// 图层_6
	this.instance_3 = new lib.Bitmap3();
	this.instance_3.setTransform(785,564);

	this.instance_4 = new lib.Bitmap2();
	this.instance_4.setTransform(875,455);

	this.instance_5 = new lib.元件9("synched",0);
	this.instance_5.setTransform(965.6,648.9,1,1,0,0,0,129.6,124.9);

	var maskedShapeInstanceList = [this.instance_3,this.instance_4,this.instance_5];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3}]}).to({state:[{t:this.instance_5}]},62).to({state:[{t:this.instance_4},{t:this.instance_3}]},33).wait(27));

	// 左 (mask)
	var mask_2 = new cjs.Shape();
	mask_2._off = true;
	mask_2.graphics.p("EgmfAZUQiMAAhkhkQhlhmABiNMAAAgn5QgBiOBlhkQBkhlCMAAMBM+AAAQCNAABlBlQBjBkABCOMAAAAn5QgBCNhjBmQhlBkiNAAg");
	mask_2.setTransform(396.6,620.725);

	// 大鼓
	this.instance_6 = new lib.左();
	this.instance_6.setTransform(237.75,565.1,0.572,0.572,-57.9664);

	this.instance_7 = new lib.右();
	this.instance_7.setTransform(455.25,460.75,0.572,0.572,23.9564);

	this.instance_8 = new lib.鼓();
	this.instance_8.setTransform(265.5,551.15,0.4122,0.4122);

	this.instance_9 = new lib.元件8("synched",4);
	this.instance_9.setTransform(416.55,628.4,1.1137,1.1137,0,0,0,170.3,127.9);

	var maskedShapeInstanceList = [this.instance_6,this.instance_7,this.instance_8,this.instance_9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_2;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6}]}).to({state:[{t:this.instance_9}]},4).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6}]},55).wait(63));

	// title
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3D8D8D").s().p("AgeC1QgLgKgBgRQABgSALgJQALgKAPAAQAPAAALAKQALAJAAASQAAARgLAKQgLAKgPAAQgPAAgLgKgAgXBGQgEgZAHgTQAIgTANgPIAdgdQAPgNAKgOQALgPAAgRQAAgagPgRQgQgRghgBQgWAAgVALQgUALgUAVIgZgWQAXgYAbgPQAbgPAjAAQAvAAAaAZQAbAYABApQgBAXgKARQgLARgPAPIgeAcQgPANgIARQgIARAEAXg");
	this.shape_1.setTransform(1474.625,221.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#3D8D8D").s().p("AiWDmIAAjZIEyAAIAADYIgiAAIAAgSIjvAAIAAATgAh1C3IDvAAIAAg7IjvAAgAh1BhIDvAAIAAg3IjvAAgAjcgfIAAgeICAAAQgEgSgIgUQgIgVgLgSIAggHQAIAMAGAOQAHAOAFANIAHAZIgVAGICIAAIAOgcIANgeIAKgcIAkAJIgTAnIgTAmICBAAIAAAegAjAiVIAAgeIC3AAQgEgLgFgLIgMgVIAggHQAIALAGAOQAHANAEAMICpAAIAAAeg");
	this.shape_2.setTransform(1437.325,221.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3D8D8D").s().p("AjRDaIgNgLQAagaAOgfQANgeAEgfQAFgfgBgaIAAhCIFgAAIAACjIghAAIAAgZIkkAAQgGAhgPAhQgPAggbAcQgEgGgIgGgAAZBLICFAAIAAhQIiFAAgAiAAgIAAAVIgCAWIB8AAIAAhQIh6AAgAishLIAAgdIClAAIAAg0IjDAAIAAgdIDDAAIAAgsIAhAAIAAAsIDFAAIAAAdIjFAAIAAA0ICvAAIAAAdg");
	this.shape_3.setTransform(1386.325,221.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3D8D8D").s().p("ACuDFIgRgdIiTAMIhfAJIg4AEIgcAEQgKABgFACIgGgQIgIgSQALgCAQgNQARgMAXgVIAkgiQAXgXAeghQAdgfAggnQAfgmAdgpIAhAQQg6BPg8BCQg+BDg+A1IELgXIgjgxIglgvIAdgOQAYAcAYAfQAYAhAUAeQAUAfANAZIggARIgNgZgAjMgDIgOgLQAlgbAkgjQAkgiAfgmQAegmAUgjIAhANQgYAmgfAnQghAogkAkQgkAkgmAcIgLgMg");
	this.shape_4.setTransform(1337.5,221.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3D8D8D").s().p("AA5DjIAAj5IiNAAIAAghICNAAIAAioIAiAAIAACoICJAAIAAAhIiJAAIAAD5gAiVDiIAAkgQgPAUgOATQgOASgQAOIgIgPIgLgQQAagZAYghQAYggAUglQAVgmAOgnIAfAJQgKAbgNAaQgNAbgOAZIAAFSg");
	this.shape_5.setTransform(1287.1,221.75);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#3D8D8D").s().p("AjWDNIgOgLQAngaAYgpQAZgrAKg3IAiAEIgHAaQgCANgEAMQAPAjAYAUQAZATAhAIIAAiaIjOAAIAAgeIG2AAIAAAeIjHAAIAAA6ICnAAIAAAfIinAAIAABHQAcADAiAAIATABIAhAAIAmgBIAiAAIAWAAIgHAPIgFAQIiHAAQgzABgmgHQgogHgcgTQgdgTgTgjQgPAfgUAYQgTAYgaATIgLgNgAilg2IAAijIFJAAIAACjgAiEhPIEHAAIAAgsIkHAAgAiEiUIEHAAIAAgrIkHAAg");
	this.shape_6.setTransform(1237.25,222.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#3D8D8D").s().p("AA9DeIgDgQQgDgJgFgHQAZACAUAAIAdABQAHAAAFgBQAFgCAEgFQAGgGAFgTQAEgTAEgjQAEgjACg1IAGiBIiDAAQgLAZgMAXQgLAXgMASIgOgKIgOgJQARgWANgeQAPgdALghQALgiAIgiIAgAHIgKAlIgMAlICYAAIAAARIgGCQQgDA8gEAlQgEAmgGAVQgFAVgHAIQgIAKgJAEQgJAEgMABIghABIgpgCgAjPDdIAAlqIA4AAIAIgbIAIgcIAFgaIAkAHIgNAmQgHATgHARIBVAAIAAFCIiMAAIAAAogAiwCXIBtAAIAAh8IhtAAgAiwgCIBtAAIAAhtIhtAAgABQBAQgMgUgPgVIgdgnIAZgPIAeAmIAdAoQANAUAIAPIgcARQgIgPgNgUg");
	this.shape_7.setTransform(1187.675,221.075);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#3D8D8D").s().p("ABtDJIgIgRIApABIAZAAQAGgBACgCQACgCAAgGIAAmHIAhAAIAAGHQAAAQgFAJQgEAIgLAEQgLAEgTABQgUACgaAAIgFgRgAjRCrIA1gJIA/gLIAAhXIhiAAIAAgeIBiAAIAAg3IAgAAIAAA3IBlAAIAAAeIhlAAIAABRIA1gKIA0gKIACAdIhYASIhWAQIhKAOgABPB1IAAksIAfAAIAAEsgAAQgiIgLgRIhdAJIg3AGIgbAEIgLAEIgFgPIgHgRQAGgBAGgGIAMgPIAUgeQAOgWANgcIhTAAIAAgeID+AAIAAAeIiGAAQgOAagPAZQgQAZgQAVICHgMIgUgaIgTgZIAYgPIAcAlQAPATAMATQANASAHAOIgZARIgIgPg");
	this.shape_8.setTransform(1136.625,221.525);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#3D8D8D").s().p("AB0DiIAAkDIhmAAQAAAmgGAuQgEAugOAtQgNAugbAlQgGgGgIgGIgOgKQAagkANgsQAMgrAFgsQAEgrgBgmIAAiCIBDgPIBBgRQAdgJAWgJIAdAaQgYAJgeAIQgeAJgfAHIhAANIAABXIDKAAIAAAhIhCAAIAAEDgAjYCPIAAlFICGAAIAAEfIhmAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_9.setTransform(1088,221.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#3D8D8D").s().p("AAPDjIgFgRIgHgRIAhABIAUAAQAFAAACgCQABgCAAgFIAAkdIhOAAQgLAagMAWQgNAWgNASIgNgKIgOgLQATgYAQgeQAPgfAMgjQAMgkAIglIAfAIIgMAsQgGAWgHAVIDQAAIAFgBIAWAFIgHAlIgHAlIgIAfIgcgGIAHghIAHgnIhkAAIAAEdQAAAPgEAIQgDAIgKAEQgKAFgQABIgcABIgLAAgAifDiIAAkeQgNATgOAQIgbAfIgIgQIgLgQQAZgYAXggQAYggATglQAUglAOgmIAgAJQgLAcgNAbQgNAbgPAaIAAFPgAhGCWIgPgJQAQgUANgZQANgZAKgdQAKgeAIgdIAfAHQgMAxgSAsQgUAsgXAgIgNgJgAC5BpQgKgdgMgfQgMgegPgaIAegJQAPAaANAeQAMAeAKAdQAKAdAEAXIggAKQgEgXgJgdg");
	this.shape_10.setTransform(1036.625,221.7813);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#3D8D8D").s().p("AguA8QAdgMAQgTQAPgTACgZIgFABIgFAAQgOgBgKgIQgKgJAAgRQAAgQALgJQAKgJAOAAQAUAAAKAPQAKAPAAAaQAAAogXAcQgWAdgmAOg");
	this.shape_11.setTransform(973.525,237.35);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#3D8D8D").s().p("AhYDXQgGgIgGgFQApgPAXgZQAWgZAKgiQAIgiADgpIhAAAIAAibICXAAIAQggIAPgkIANggIAiALIgVAuIgVArIA0AAIAACbIg+AAIAACSQAAAJADAEQACACAKAAIAtAAQAGAAAEgEQADgEABgOQACgNAAgbIAOAIIAQAFQgBAggFASQgEARgIAHQgJAGgPAAIg1AAQgaABgJgLQgJgKAAgaIAAiSIgvAAQgDAvgLAnQgLAmgZAdQgYAcguATQgDgHgFgGgAgZgBICuAAIAAhgIiuAAgAioC+IgLgOIAMgKQAGgGAFgJQAFgJAAgLIAAipIhKAAIAAggIBsAAIAADJIA6goIAGAPIAFANIg3ApIggAYIgRAOIgIAIQgCgHgGgJgAiHiNIgbgcIgcgbIAWgUQAOAMAOAOIAcAbIAUAXIgXAZQgIgMgMgOgAgBiaIgPgfIgTgdIAcgLQAJANAJAPIARAdQAHAPAEAMIgeANQgEgMgGgOg");
	this.shape_12.setTransform(937.375,221.7);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_13.setTransform(887.325,221.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#3D8D8D").s().p("AhYDXQgGgIgGgFQApgPAXgZQAWgZAKgiQAIgiADgpIhAAAIAAibICXAAIAQggIAPgkIANggIAiALIgVAuIgVArIA0AAIAACbIg+AAIAACSQAAAJADAEQACACAKAAIAtAAQAGAAAEgEQADgEABgOQACgNAAgbIAOAIIAQAFQgBAggFASQgEARgIAHQgJAGgPAAIg1AAQgaABgJgLQgJgKAAgaIAAiSIgvAAQgDAvgLAnQgLAmgZAdQgYAcguATQgDgHgFgGgAgZgBICuAAIAAhgIiuAAgAioC+IgLgOIAMgKQAGgGAFgJQAFgJAAgLIAAipIhKAAIAAggIBsAAIAADJIA6goIAGAPIAFANIg3ApIggAYIgRAOIgIAIQgCgHgGgJgAiHiNIgbgcIgcgbIAWgUQAOAMAOAOIAcAbIAUAXIgXAZQgIgMgMgOgAgBiaIgPgfQgJgPgKgOIAcgLQAJANAJAPIARAdQAHAPAEAMIgeANQgEgMgGgOg");
	this.shape_14.setTransform(837.375,221.7);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#3D8D8D").s().p("AguA8QAdgMAQgTQAPgTACgZIgFABIgFAAQgOgBgKgIQgKgJAAgRQAAgQALgJQAKgJAOAAQAUAAAKAPQAKAPAAAaQAAAogXAcQgWAdgmAOg");
	this.shape_15.setTransform(773.525,237.35);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3D8D8D").s().p("AB0DiIAAkDIhmAAQAAAmgGAuQgFAugNAtQgOAugaAlQgGgGgIgGIgOgKQAagkANgsQAMgrAFgsQADgrAAgmIAAiCIBDgPIBBgRQAegJAVgJIAdAaQgYAJgeAIQgeAJggAHIg/ANIAABXIDLAAIAAAhIhDAAIAAEDgAjYCPIAAlFICGAAIAAEfIhmAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_16.setTransform(738,221.75);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_17.setTransform(687.325,221.2);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#3D8D8D").s().p("AB0DiIAAkDIhmAAQAAAmgGAuQgFAugNAtQgNAugbAlQgGgGgIgGIgOgKQAagkANgsQAMgrAFgsQADgrAAgmIAAiCIBDgPIBBgRQAegJAVgJIAdAaQgYAJgeAIQgeAJgfAHIhAANIAABXIDKAAIAAAhIhCAAIAAEDgAjYCPIAAlFICGAAIAAEfIhmAAIAAAmgAi4BJIBGAAIAAjeIhGAAg");
	this.shape_18.setTransform(638,221.75);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#3D8D8D").s().p("AgNAIQgegcgbgWIAdgaQASAPAUATQATASATATQAUAVAQATIgfAaQgZgfgcgeg");
	this.shape_19.setTransform(572.075,236.475);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_20.setTransform(537.325,221.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(61,141,141,0.098)").s().p("Eg8pAPlQiQAMiZAAQrqAAoPkWQkXiUiEi0Qh0ieAAi5QAAg8AMg4QBEk/G/jrIAtgYQIBj+LLAAQBmAABkAFQAvgbA2gYQBCgdBHgYQE4hrGbAAQGaAAE5BrQBHAYBCAdQBEAfA3AhQDvhSETgjQDQgbDlAAQDlAADQAbQHqA/F5DTIA5AhQBWhPCYhEQFkigH3AAQH3AAFlCgQCBA6BSBDQFbiTHkAAIAZAAQFbADESBPQD/g6EmAAQJwAAG3EEQAmAVAiAYQFyD3AAFPQAAFxm6EFIgKAGQm1D+poAAQnsAAl5ihQhXAOheAAIgoAAQgnAYgpAUQg5Adg+AXQjPBLj7AAQkhAAjnhkQkfCamEAAIgfAAQiTAZiiAJQhWAEhaAAQhbAAhVgEQnEgYlQiWQgmgRghgSQnOC5pYAAQooAAm0icQnFDTpeAAQmcAAlVhig");
	this.shape_21.setTransform(1004,213.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(122));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1074.8,644,774.3,139.70000000000005);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#3D8D8D",
	opacity: 0.00,
	manifest: [
		{src:"images/鼓_.png?1693883504147", id:"鼓"},
		{src:"images/Bitmap2.png?1693883504147", id:"Bitmap2"},
		{src:"images/Bitmap3.png?1693883504147", id:"Bitmap3"},
		{src:"images/Bitmap4.png?1693883504147", id:"Bitmap4"},
		{src:"images/Bitmap5.png?1693883504147", id:"Bitmap5"},
		{src:"images/Bitmap6.png?1693883504148", id:"Bitmap6"},
		{src:"images/右_.png?1693883504148", id:"右"},
		{src:"images/图层1png复制.png?1693883504148", id:"图层1png复制"},
		{src:"images/图层2png复制.png?1693883504148", id:"图层2png复制"},
		{src:"images/图层3png复制.png?1693883504148", id:"图层3png复制"},
		{src:"images/图层4.png?1693883504148", id:"图层4"},
		{src:"images/左_.png?1693883504148", id:"左"},
		{src:"sounds/yx14030201大鼓声.mp3?1693883504148", id:"yx14030201大鼓声"},
		{src:"sounds/yx14030202拍手的声音.mp3?1693883504148", id:"yx14030202拍手的声音"},
		{src:"sounds/yx14030203敲门的声音.mp3?1693883504148", id:"yx14030203敲门的声音"}
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