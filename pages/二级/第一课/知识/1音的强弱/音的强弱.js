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



(lib.mplay_btn = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(61.1777,40.9434,3.0702,3.0702);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_1.setTransform(44.4705,40.9817,3.0702,3.0702);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_2.setTransform(27.6575,40.9342,3.0702,3.0702);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgYAYQgKgJAAgPQAAgOAKgKQALgKANAAQAOAAAKAKQALAKAAAOQAAAPgLAJQgKALgOAAQgNAAgLgLg");
	this.shape_3.setTransform(10.0257,40.9561,3.0702,3.0702);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(4));

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AmGGsIAAtXIMNAAIAANXg");
	this.shape_4.setTransform(35.4,40.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-2.6,78.2,85.6);


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
	this.shape.setTransform(10.1437,41.1822,3.0712,3.0712);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_1.setTransform(27.7812,41.1603,3.0712,3.0712);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_2.setTransform(44.5995,41.2078,3.0712,3.0712);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgkCDQgCgEABgEQAAgEAEgCQAYgRANggQAOgfAAglQAAgkgOgfQgNgfgXgSQgEgCAAgEQgBgEACgEQADgDAEgBQAEAAADACQAbAUAQAkQAQAjAAApQAAAqgQAkQgRAjgbAUQgDACgCAAQgGAAgDgEg");
	this.shape_3.setTransform(61.3121,41.1694,3.0712,3.0712);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape},{t:this.shape_1}]},8).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_2}]},9).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_2},{t:this.shape_3}]},9).wait(8));

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AmDG0IAAtnIMHAAIAANng");
	this.shape_4.setTransform(35.675,40.45);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(34));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.1,-3.1,77.6,87.19999999999999);


(lib.mstop_btn = function(mode,startPosition,loop,reversed) {
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
	this.instance.setTransform(73.6,73.6,1,1,0,0,0,73.6,73.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.1,-3.1,77.6,87.19999999999999);


// stage content:
(lib.音的强弱 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {m1:6,m2:54};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,6,7,53,54,55,108];
	this.streamSoundSymbolsList[7] = [{id:"yx12010109大声喊",startFrame:7,endFrame:53,loop:1,offset:0}];
	this.streamSoundSymbolsList[55] = [{id:"悄悄话1",startFrame:55,endFrame:109,loop:1,offset:0}];
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
	this.frame_6 = function() {
		var _this = this;
		
		
		
		_this.m1stop.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_7 = function() {
		var soundInstance = playSound("yx12010109大声喊",0);
		this.InsertIntoSoundStreamData(soundInstance,7,53,1);
	}
	this.frame_53 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop(0);
	}
	this.frame_54 = function() {
		var _this = this;
		
		
		
		_this.m2stop.on('click', function(){
		
		_this.gotoAndStop(0);
		});
	}
	this.frame_55 = function() {
		var soundInstance = playSound("悄悄话1",0);
		this.InsertIntoSoundStreamData(soundInstance,55,109,1);
	}
	this.frame_108 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop(0);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(6).call(this.frame_6).wait(1).call(this.frame_7).wait(46).call(this.frame_53).wait(1).call(this.frame_54).wait(1).call(this.frame_55).wait(53).call(this.frame_108).wait(1));

	// leftnav
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#990000").s().p("AAzCMIgCgLIgEgJIAaACIARAAQAFABADgBIAFgEQAEgDACgLQADgLACgVIgyASIguARIgHgSIAegKIAkgMIAngOIABgWIABgcIhiAAIACgXIACgdIABgcIBaAAIAAgrIhjAAIAAgTIB4AAIAABSIhcAAIAAAWIgCAVIBiAAIAAAEIAAAGIgFBIQgDAcgCAOQgEAPgFAGQgEAEgFACQgGACgHABIgUABIgagBgAhACJIgWAAIgBgKIgFgKIAVACIAOAAQAEAAADgBQACAAACgDQADgDADgKQADgJACgTIgxASIgtAQIgIgSIAegKIAkgLIAmgNIACgXIACgeIhdAAIACgXIABgdIAAgcIBYAAIAAgrIhgAAIAAgUIB1AAIAABTIhZAAIgBAWIgBAVIBeAAIAAAEIgBAGQgCArgDAcQgDAbgEAOQgDAPgFAFQgEAFgFACQgEACgHAAIgHABIgJgBgABEAwIgZgKIgYgJIAJgOQAMACAMAGIAYAJQALAFAIAFIgIARQgIgGgLgFgAhLAwIgYgKIgYgJIAJgOQAMACAMAGIAYAJQALAFAIAFIgJARIgTgLg");
	this.shape.setTransform(215.9,442.85);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#990000").s().p("AB7CAIgGgMIg3AFIg1AEIgtADIgCgVIAkgCIAqgCIAAgxIhAAAIAAhTIBAAAIAAgeIg5AAIAAhPICHAAIAABPIg6AAIAAAeIBDAAIAABTIhDAAIAAAvIAXgBIAYgCIgKgPIgKgPIASgHIAQAXIAPAYQAGAMADAKIgSAJIgEgLgAA8AkIAvAAIAAgvIgvAAgAgFAkIAtAAIAAgvIgtAAgAAChOIBgAAIAAgpIhgAAgAh4CFIgCgKIgFgKIAVACIAOAAQAEAAACgBQADAAACgDQADgCACgKQADgJACgSIAEgvIhNAAIAEgbIAFghIADgfIBFAAIAAg0IhOAAIAAgUIBiAAIAABbIhIAAIgDAbIgDAaIBMAAIAAADIgBAGIgFA7QgCAWgDAMQgDAMgFAFQgEAEgFACQgEACgHAAIgPABIgVgBg");
	this.shape_1.setTransform(184.475,443.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#990000").s().p("ABCCPIgbgBIgCgKQgCgGgDgEIAdABIASAAQAFABADgBQADgBADgDQADgEAEgNQACgMADgWIAEg5IAEhSIhUAAQgHAQgIAPQgHAPgIALIgIgGIgKgGQALgOAJgTQAJgTAHgVQAHgVAGgXIAUAFIgHAYIgHAXIBhAAIAAALIgEBcQgCAmgDAYQgCAZgDANQgEANgEAGQgFAGgGADQgGACgIABIgNABIgHgBgAiECNIAAjnIAkAAIAFgRIAFgSIADgRIAXAFIgIAYIgJAXIA2AAIAADOIhZAAIAAAZgAhwBhIBGAAIAAhQIhGAAgAhwgBIBGAAIAAhGIhGAAgAAzApIgRgbIgTgYIAQgJIATAXIATAaIAOAWIgSAMIgOgXg");
	this.shape_2.setTransform(152.55,441.9083);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#990000").s().p("AhgCTIAAiLIDEAAIAACLIgWAAIAAgMIiYAAIAAAMgAhKB1ICYAAIAAglIiYAAgAhKA+ICYAAIAAgjIiYAAgAiNgTIAAgUIBTAAQgDgLgFgNQgFgNgHgLIAUgFQAGAIAEAJQAEAIADAJIAEAQIgNADIBWAAIAJgRIAJgUIAHgRIAWAGIgMAYIgMAYIBTAAIAAAUgAh6hfIAAgTIB0AAIgFgOIgIgOIAUgEIAJAQIAHAQIBtAAIAAATg");
	this.shape_3.setTransform(120.3,442.175);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(153,153,153,0.498)").s().p("AAgBoIAAgxQgJALgNALQgMAKgNAHIgFgFIgGgFQAOgGAMgJQAMgJAIgKIAMAEIAAgrIgWACIgWABIgBgFIgDgGIAjgDIAigDIAbgFIANAKIgWAEIgZADIAAAYIAEAFIADAEIAUgNIARgMIAKAIIgTANIgVAMQAKAKANAHQAMAHAOAFQgDABgCAEIgEAGQgQgGgNgKQgOgKgLgMIAAA0gAhCBoIgNgBIgBgHIgDgGIANABIAJAAIAEgBIADgCQADgCACgJIAEgYIADgpIg3AAIADgYIADgdIACgcIANABIgCAXIgCAXIgCAWIAYAAIAEgbIACgeIADgeIg0AAIAAgOIBCAAIgCAiIgEAkIgDAfIAGAAIALAAIAAACIAAAEQgCAegCATQgCATgDAKQgCAKgEADIgGAFIgIACIgKAAgAhsAxIAagGIAegIIABANIgcAIIgaAHgAgSA0IgFgFIAVgMQAKgHAHgHIANAEQgJAJgLAIQgKAJgLAFIgFgEgAAZgFIAAgOIgaAEIgYADIgDgMIAOgCIAAhBIgLAAIAAgMIBGAAIAAAMIgIAAIAAA7IAIgBIAAALIgIABIAAAQgAgCgbIAbgEIAAgNIgbAAgAgCg2IAbAAIAAgOIgbAAgAgChOIAbAAIAAgNIgbAAgAAxgPIgFgFQAHgFAHgGQAHgHAGgJIgLgNIgLgMIAJgHIAKALIAKALIAHgPQADgHACgIIgmAAIAAgNIApAAIADAAIACAAIAIACQgDAPgFAMQgFANgGALIAMAOIAJAMIgKAJIgIgLIgKgNIgNAPQgHAGgIAFIgDgFg");
	this.shape_4.setTransform(189.925,374.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(153,153,153,0.498)").s().p("AhjBlIgFgIQBDgIArgYQAsgZAVgqIAPAHQgXAtguAbQgsAZhFALIgDgIgAgFA5IAAhLIhhAAIAAgQIAlAAIAAg2IAQAAIAAA2IAuAAIAAhJIAPAAIAAAaIBHAAIAAAPIhHAAIAAAgIBdAAIAAAQIheAAIAABLgAhYAyIgGgFQAOgLAMgOQANgOAJgNIAPAEQgKAQgOAQQgNAQgOALIgGgGg");
	this.shape_5.setTransform(166.075,374.25);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(153,153,153,0.498)").s().p("AgBBlIgHgFQAPgPAKgWQAJgVAEgZQAGgZAAgbIgiAAIAAgQIAjAAIABgZIAAgaIAQAAIgBAaIAAAZIA1AAIAAAJIgDA9IgDAqIgDAaQgDAJgDADQgEAFgEACIgJACIgOAAIgTgBIgCgHIgDgIIATABIANAAIAFAAIAEgDQADgEADgNIAEgoIADhEIgmAAQgCAdgEAbQgFAbgKAXQgKAXgSARIgEgGgAhjBGIgDgIQACgBADgEIAGgLIAFgPIAHgXIAIgaIgiAAIAAgPIBpAAIAAAPIg3AAQgFASgGAUIgOAkIA8gMIgHgUIgIgTIAOgDIAJAXIAJAYIAFAUIgNAFIgCgIIgDgJIgoAJIgYAFIgLAEIgGACIgCgHgAhghMIAAgOIBbAAIAAAOg");
	this.shape_6.setTransform(142.25,374.525);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(153,153,153,0.498)").s().p("AhqBiIAAgQICJAAIAEgTIACgVIhsAAIAHgbIAGgfIAGgiIAGgfIg0AAIAAgPIDGAAIAAAPIiBAAIgEATIgDAVIBVAAIADgBIAMABIgDAbIgEAgIgEAgIgFAgIA7AAIAAAQgAgsABIgGAaIBZAAIAEgcIADgZIhWAAIgEAbg");
	this.shape_7.setTransform(118.3,374.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#333333").s().p("ACRETQgDgOgIgKQgIgJgRgJQgQgJgVgGIAAgEIgPAMQgBAGgEAGQgEAFgGACIgyhYIAugPIBEgWIBOgaIACg5IAChCIhaAAIgbAkIhNgoIAHAGQgDAFgGADQgGADgLACQgBBYgEA9QgEA8gIAkQgJAkgRAOQgPANgUAGQgUAFgdABQAAgRgEgOQgCgPgIgJQgHgJgPgJQgPgJgWgFIAAgEIgJAIQgCAHgEAFQgEAFgGACIg0hYIAtgMIBAgUIBMgXIACg7IABhFIhLAAIgcAjIhPgqIAJgIIALgIIAJgvIAHgzIAFgrIBlAqIAlAAIAAhdIihAAIgHgSICiAAIAmgrIBTA+QgDAEgHADQgGAEgJADIAABuQgBADgNAEQgNAFgQADQgRAEgPAAIgPAAIAAghIg6AAIgHArIgIArIBFAAIAugtIBDA6IAIgIIALgIIAGgvIAFg0IADgsIBlArIAwAAIAAheIijAAIgGgSICjAAIAngrIBSA+QgCAEgHADQgGAEgKADIAABuQgBADgMAEQgNAFgRADQgRAEgOAAIgQAAIAAggIhCAAIgGAqIgFArIBUAAIAugtIBMBBQgEAFgGADQgHADgJACQgCBXgDA9QgEA8gJAlQgJAkgRAOQgPANgUAGQgUAFgfABQAAgRgCgOgACJCdQgbAZgjAeIAdACIAdABIASABIAJgBQAEgCACgDQAHgHAEgZQAEgYACgqQgTAUgbAZgAiiCjIg7AxIAcACIAaABIARABIAJgBIAHgFQAGgHAEgVQAEgWACglIgsAogAjtBmQAAgYgKgYQgJgYgOgRIAFgDQAxAGAXAPQAZAQADASQAEASgKAOQgJAPgSADIgGAAQgPAAgSgNgAA7BjQgBgYgLgXQgKgYgPgQIAFgDQA1ACAaAOQAZAPAFASQAFATgLAPQgLAPgSADIgIABQgQAAgSgMg");
	this.shape_8.setTransform(325.2,294.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#333333").s().p("AjXEOQgDgNgIgJQgIgIgQgIQgPgGgVgEIAAgIIAeABIAfACIAVABIAMgBQAFgBADgDQALgJAGgsQAHgrADhMIg3AAIgYAfIhFgmIAJgIQAFgEAFgDQADgXACggIADg/IACg0IBXAoIAcAAIAAh/IiAAAIgFgSIB+AAIAkgpIBPA7QgDAEgHAEQgHAEgLACIAACOQgBACgLAEQgLAEgPAEQgPADgOAAIgNAAIAAgcIgtAAIgCAlIgDAqIgDAlIAzAAIAqgnIBGA6QgEAFgFACQgHADgKACQgDBEgFAtQgGAugKAbQgKAagQAMQgPANgVAEQgUAHgdAAQAAgSgDgOgAhVDNIA/gBIBZgDIAAhpIgoAAIAAATQgBADgJAGQgKAFgOAFQgPAEgQAAIgLAAIAAjeIBPAfIAlAAIAAhPIgXAAIAAAPQAAAEgLAGQgKAGgQAEQgQAEgQABIgMAAIAAjKIBUAgIB3AAIAkgmIBMA4QgDADgFAEQgGACgIACIAABxQgBACgLAFIgcAHQgQAEgOAAIgPAAIAAgeIgWAAIAABPIAhAAIAjgmIBKA3QgCADgGAEQgFADgJACIAACAQgBACgLAFQgLAEgPADQgQADgNABIgOAAIAAgaIgnAAIAABkIA3gDQgHgQgJgPQgJgPgKgNIAFgDQA+APAfAZQAfAaAGAbQAGAbgLATQgLAUgVAEQgVAFgZgVQAAgPgCgQQgCgQgFgQQgpAPg6ARQg5ARhMAWQgEAGgFADQgFAEgGABgACVBOIAnAAIAAhxIgnAAgAAbBOIAoAAIAAhxIgoAAgAAsiWIB/AAIAAheIh/AAg");
	this.shape_9.setTransform(261.2207,294.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#333333").s().p("ABsEIQgDgQgJgKQgJgKgSgJQgRgIgZgFIABgIIAhACIAiACIAYABQAIAAAFgCQAGgCAEgEQARgQAHhYQAHhZACiiIhiAAQgaApgdAiQgcAighAaIgFgCIAAECQAAADgLAFQgMAGgQAEQgRAFgQAAIgNAAIAAgyIhPAAIAAAsQgBAFgJAHQgKAHgQAFQgPAFgUAAIgNAAIAAnoIBRAiIADgoIACgrIADgoIB7AdQgCAJgHAEQgHADgLAAIgjAnIglApIArAAIAngsIBPA+QgDAEgHAEQgFADgLADIAABqQAQgiAPgrQANgsAMgwQALgwAIgvIB3AiQgDAGgGAEQgGAEgLAAIgSAnIgTAkIBQAAIAwgxIBOBGQgEAEgHAEQgGADgMACQgCBkgDBHQgCBIgGAwQgEAwgKAcQgJAdgOAOQgSATgZAJQgYAIgjAAQAAgWgEgQgAjQC6IBPAAIAAioIhPAAgAjQAAIBPAAIAAidIhPAAgAAnBWQgBgjgNgjQgLghgQgcIADgDQA9APAcAYQAdAWAFAZQAFAZgLATQgMASgVADIgGAAQgTAAgVgRg");
	this.shape_10.setTransform(198.7,294.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("Ai9EwIAAk9IBhAlICyAAIAtgvIBXBDQgDAEgGAEQgHAEgLADIAADUQgBAEgMAHQgNAHgSAGQgSAGgTAAIgQAAIAAgvIi/AAIAAAVQAAAFgMAHQgLAHgSAFQgSAFgUAAgAhhDtIC/AAIAAhaIi/AAgAhhCBIC/AAIAAhXIi/AAgAkjgoIgGgRIFLAAIAPgsQAIgYAGgYIALgsIjSAAQAyAPAXAWQAWAWACAVQABAWgNAPQgNAPgVACQgVABgWgTQgBgfgJgeQgIgegMgZIhpAAIgGgRIEBAAIgMgEIgLgHQgDgXgJgVQgKgVgLgOIAEgDQA3gCAZAMQAbAMAGARQAFARgKAQQgKAPgTAGIB/AAIAvg9IAPALIAhAbQAUAQAQAOQgBAFgFADQgFACgHAAIihAAIBjAeQgCAGgGAEQgGADgLgBQgXAVggAZQghAaghAWIBzAAIAwhAIAPAMIAjAcIAmAfQgCAFgFADQgFACgHAAg");
	this.shape_11.setTransform(133.375,294.3167);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#CCCCCC").ss(1,1,1).p("AzdAAMAm7AAA");
	this.shape_12.setTransform(228.875,350.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(109));

	// 控制
	this.m1stop = new lib.mstop_btn();
	this.m1stop.name = "m1stop";
	this.m1stop.setTransform(487.5,408.7,1,1,0,0,0,36.8,41.6);
	new cjs.ButtonHelper(this.m1stop, 0, 1, 2, false, new lib.mstop_btn(), 3);

	this.m2stop = new lib.mstop_btn();
	this.m2stop.name = "m2stop";
	this.m2stop.setTransform(487.5,528.05,1,1,0,0,0,36.8,41.6);
	new cjs.ButtonHelper(this.m2stop, 0, 1, 2, false, new lib.mstop_btn(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m1stop}]},6).to({state:[{t:this.m2stop}]},48).wait(55));

	// 控制
	this.m2_btn = new lib.mplay_btn();
	this.m2_btn.name = "m2_btn";
	this.m2_btn.setTransform(487.7,528.15,1,1,0,0,0,36.9,41.6);
	new cjs.ButtonHelper(this.m2_btn, 0, 1, 2, false, new lib.mplay_btn(), 3);

	this.m1_btn = new lib.mplay_btn();
	this.m1_btn.name = "m1_btn";
	this.m1_btn.setTransform(487.7,408.85,1,1,0,0,0,36.9,41.6);
	new cjs.ButtonHelper(this.m1_btn, 0, 1, 2, false, new lib.mplay_btn(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m1_btn},{t:this.m2_btn}]}).wait(109));

	// content
	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#231916").s().p("Ag2A1QABgGACAAIAIAAQAGAAACgEIAahKIAAgDQAAgFgDABQgEAAgLAUQAAABAAAAQAAAAAAABQgBAAAAAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAgBAAAAQAAAAAAgBIAAgBQAKgeASAAQAEAAAEACQAEACABADQAKgKAOAAQAKAAAGAGQAFAHAAALQAAAQgLANQgMAOgQAAQgKAAgGgIQgMAgAAAFQAAADAFAAIAIAAQACAAAAAFIAAABgAAMgdQgHANAAAOQAAAJAGAAQAIAAAIgPQAIgOAAgLQAAgEgCgDQgCgEgDAAQgIAAgIAPg");
	this.shape_13.setTransform(628.1751,536.922,4.8009,4.8009);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#231916").s().p("Ag6BGQgEgFAAgFQAAgLAKAAQAJAAAAAJQAAADgFAGIABABQADAAAGgEQAJgFAHgSIATg+IgPAAQAAAAgBAAQAAAAAAgBQgBAAAAgBQAAgBAAgBQAAgDADAAIARAAQAGgVAMgMQAMgMAOAAQAIAAAGAEQAFAFAAAGQAAAFgDAEQgDADgFABQgEgBgEgCQgDgCAAgEQAAgDAEgFIAEgEQAAgCgFAAQgGAAgFAMIgJAcIAFAAQANAAAAABQgBAGgDAAIgQAAQgTA0gNAVQgQAWgXgBQgFAAgEgDg");
	this.shape_14.setTransform(632.0158,414.6368,4.8009,4.8009);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#333333").s().p("AgqBJQgTgLgMgTQgLgUAAgXQAAgYALgTQAMgTATgMQATgLAXABQAZgBASALQAUAMALATQAMATAAAYQAAAXgMAUQgLATgUALQgSAMgZABQgXgBgTgMgAgrgsQgSASgBAaQABAaASASQARASAaAAQAbAAARgSQASgSABgaQgBgagSgSQgRgRgbgBQgaABgRARg");
	this.shape_15.setTransform(1186,557.8);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#333333").s().p("AiyEdIAAkpIBcAiICnAAIApgsIBTA/QgEAEgFADQgHAEgJADIAADHQgBAEgMAGQgMAHgRAFQgSAGgRAAIgPAAIAAgsIiyAAIAAATQgBAFgLAHQgKAGgSAFQgQAFgTAAgAhaDeICyAAIAAhUIiyAAgAhaB5ICyAAIAAhSIiyAAgAkRglIgFgRIE2AAIAOgpIANgsIALgqIjFAAQAvAOAVAUQAVAVACAUQAAAVgMAOQgMAOgTABQgUABgVgSQgBgdgIgcQgIgcgLgXIhjAAIgEgQIDvAAIgKgEIgLgGQgCgWgJgTQgJgUgKgOIADgCQAzgCAZALQAYALAGAQQAFARgKAOQgJAOgSAGIB4AAIArg6IAOAMIAgAZIAhAcQgBAFgEACQgFACgHAAIiWAAIBcAcQgCAGgGADQgFADgKgBQgWAUgeAYQgeAYggAUIBsAAIAtg7IAOALIAhAaIAjAdQgCAFgEACQgFADgGAAg");
	this.shape_16.setTransform(1145.2,538.366);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#333333").s().p("AkYEZQAkgjASgpQASgpAEgrQAHgqgCgnIAAh/IBjAiIDaAAIAmgqIBOA7QgCAEgGAEQgGADgJACIAACHQAAACgNAEQgLAEgRAEQgRAEgOgBIgPAAIAAgqIjwAAQgDAjgPAkQgPAlghAhQgiAhg8AZgAArBGIBRAAIAAhqIhRAAgAhxAoIAAAOIgBAQIBMAAIAAhqIhLAAgAjfhvIgEgQIC7AAIAAhFIjhAAIgFgRIDmAAIAAhIIBtAIQgBAGgEAFQgFAEgMACIAAAvIBuAAIAsg1IAOAKIAgAXIAiAbQgCAFgEADQgFACgHAAIjYAAIAABFIBPAAIAtg4IAOALIAgAYIAjAbQgCAGgEABQgEADgIAAg");
	this.shape_17.setTransform(1084.65,538.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#333333").s().p("ABmD3QgDgPgIgJQgJgJgQgIQgRgIgYgFIABgHIAgACIAfACIAXABQAHAAAFgCQAFgCAEgEQAQgPAHhTQAGhTACiYIhcAAQgYAngbAgQgbAfgfAZIgDgDIAADyQgBADgLAGQgLAFgPAEQgPAEgPABIgNAAIAAgwIhKAAIAAApQgBAFgIAHQgKAGgPAFQgPAFgRAAIgNAAIAAnJIBMAfIADglIACgpIACglIB0AcQgCAHgHAEQgGADgLAAIgfAlIgjAmIAnAAIAlgpIBKA6QgDAEgFADQgGADgJADIAABkQAOggANgpQANgpALgtQAKgtAIgsIBvAgQgBAGgHADQgFAEgLAAQgIATgIARIgSAjIBLAAIAtguIBJBBQgEAEgGADQgHADgLACQgBBegCBDQgDBDgFAtQgFAtgJAbQgIAbgNANQgRARgXAJQgXAHgiAAQABgVgDgPgAjDCuIBKAAIAAidIhKAAgAjDAAIBKAAIAAiTIhKAAgAAlBRQgCghgLghQgLgfgPgaIAEgDQA4AOAbAWQAbAWAFAXQAEAYgKARQgMARgUADIgEAAQgTAAgTgQg");
	this.shape_18.setTransform(1026.45,538.525);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#333333").s().p("ACHECQgCgOgIgIQgHgJgPgIQgPgJgVgFIABgEIgOALQgBAGgEAFQgEAEgFADIgwhTIArgOIBAgUIBKgZIACg1IABg+IhVAAIgZAhIhHglIAFAGQgBAFgHADQgFADgKABQgBBSgEA6QgDA4gIAhQgJAigQAOQgOAMgTAFQgSAGgcgBQAAgPgDgOQgCgNgHgIQgHgJgPgIQgOgJgUgFIAAgDIgJAHQgCAGgDAFQgEAFgGACIgwhSIAqgMIA8gSIBHgWIACg3IABhBIhGAAIgaAgIhLgmIAIgIIALgIIAIgsIAHgwIAFgoIBeAoIAjAAIAAhYIiXAAIgGgRICXAAIAkgnIBOA5QgDADgGAEQgGAEgJACIAABoQgBACgLAFQgMADgQAEQgQADgNAAIgPAAIAAgeIg2AAIgHAoQgDAVgFATIBCAAIArgqIA+A2IAIgIIAJgHIAHgtIAFgwIADgpIBeApIAtAAIAAhZIiZAAIgFgRICZAAIAkgnIBNA5QgCADgHAEQgGAEgIACIAABoQgBACgNAFQgLADgQAEQgPADgPAAIgOAAIAAgeIg+AAIgFAoIgGAoIBPAAIAsgqIBHA9QgDAFgGADQgGADgKABQgBBSgDA5QgEA4gIAiQgJAigPAOQgOAMgTAFQgUAGgcgBQAAgPgDgNgACBCTIg7A0IAcACIAaABIASAAIAIAAQAEgCACgDQAHgHADgXQAEgXABgnQgRATgZAXgAiZCZIg3AuIAbACIAZABIAQAAIAIAAIAGgFQAGgHADgTQAEgVADgjIgrAmgAjdBgQgBgXgKgWQgIgXgOgQIAGgCQAtAFAWAPQAXAOAEARQADARgJANQgJANgRAEIgFAAQgPAAgPgMgAA3BdQgBgXgKgWQgJgWgOgOIAEgDQAxACAYANQAZANAEASQAEARgJAOQgKAOgRADIgIABQgPAAgRgLg");
	this.shape_19.setTransform(965.05,538.3);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#333333").s().p("AinEaIAAh2IgdAPIggAPQgCAGgFAEQgDAEgHABIgrhcIAygGIBHgKIAAhYIgcAAIgeAhIhHgtIALgGIAMgHIAXg/IAWhIIg1AAIgEgRIA/AAIAShCQAIgeAEgVIBhAZQgCAGgGADQgFAFgMgBIgKAkIgNArIAeAAIAlgsIALAIIAaAUIAcAXQgBAFgEACQgEADgHAAIh5AAIgKAeIBbAIQgBAHgFAFQgFAEgLACIAABQIAXgeIAKAHIAVASIAXATQgCAFgEADQgEACgGAAIg9AAIAABMIAfgEIAfgFIAAAGIgcASIgiAUIAACKQAAACgHAFQgIAEgPAEQgOAFgUAAgAixg4IgSA1IAlAAIAAhxIgTA8gAgvEBIgFgQIB/AAIAAioIhVAAIgEgRICiAAIAngzIAOAKIAcAWIAdAaQgBAFgEADQgFACgGAAIhSAAIAACoIAbAAIAngzIAMAJIAdAXIAeAaQgBAFgFACQgFACgFAAgAgqAoQAngfAigmQAkgoAcgsQAcgtARgrIieAAIgFgRICiAAIAwgvIBPBEQgDAFgFACQgFACgLABQgNAYgQAWQgQAXgUAVQAwAIAaARQAbAQAIAUQAJAUgEAQQgHAQgPAHQgQAIgXgIQgPgXgVgXQgWgYgXgVQgmAkgwAdQgwAcg2AVg");
	this.shape_20.setTransform(904.5,538.275);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#333333").s().p("Ag7BiQAmgTAQgZQAQgXAEgXQgOgDgQgIQgRgIgNgOQgNgNgBgXQAAgXARgQQAPgQAagBQAQAAAOAIQANAIAJAQQAIAPAAAXQAAAfgLAfQgLAfgYAbQgWAcgoARg");
	this.shape_21.setTransform(823.35,563.65);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#333333").s().p("ACHECQgCgOgIgIQgHgJgPgIQgPgJgVgFIABgEIgOALQgBAGgEAFQgEAEgFADIgwhTIArgOIBAgUIBKgZIACg1IABg+IhVAAIgZAhIhHglIAFAGQgBAFgHADQgFADgKABQgBBSgEA6QgDA4gIAhQgJAigQAOQgOAMgTAFQgSAGgcgBQAAgPgDgOQgCgNgHgIQgHgJgPgIQgOgJgUgFIAAgDIgJAHQgCAGgDAFQgEAFgGACIgwhSIAqgMIA8gSIBHgWIACg3IABhBIhGAAIgaAgIhLgmIAIgIIALgIIAIgsIAHgwIAFgoIBeAoIAjAAIAAhYIiXAAIgGgRICXAAIAkgnIBOA5QgDADgGAEQgGAEgJACIAABoQgBACgLAFQgMADgQAEQgQADgNAAIgPAAIAAgeIg2AAIgHAoQgDAVgFATIBCAAIArgqIA+A2IAIgIIAJgHIAHgtIAFgwIADgpIBeApIAtAAIAAhZIiZAAIgFgRICZAAIAkgnIBNA5QgCADgHAEQgGAEgIACIAABoQgBACgNAFQgLADgQAEQgPADgPAAIgOAAIAAgeIg+AAIgFAoIgGAoIBPAAIAsgqIBHA9QgDAFgGADQgGADgKABQgBBSgDA5QgEA4gIAiQgJAigPAOQgOAMgTAFQgUAGgcgBQAAgPgDgNgACBCTIg7A0IAcACIAaABIASAAIAIAAQAEgCACgDQAHgHADgXQAEgXABgnQgRATgZAXgAiZCZIg3AuIAbACIAZABIAQAAIAIAAIAGgFQAGgHADgTQAEgVADgjIgrAmgAjdBgQgBgXgKgWQgIgXgOgQIAGgCQAtAFAWAPQAXAOAEARQADARgJANQgJANgRAEIgFAAQgPAAgPgMgAA3BdQgBgXgKgWQgJgWgOgOIAEgDQAxACAYANQAZANAEASQAEARgJAOQgKAOgRADIgIABQgPAAgRgLg");
	this.shape_22.setTransform(785.05,538.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#333333").s().p("AgoCVQgQgQgBgYQABgYAQgRQAQgQAYgBQAZABAQAQQAQARAAAYQAAAYgQAQQgQAQgZABQgYgBgQgQgAgohDQgQgRgBgXQABgZAQgQQAQgQAYgBQAZABAQAQQAQAQAAAZQAAAXgQARQgQAPgZABQgYgBgQgPg");
	this.shape_23.setTransform(712.2,542.625);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#333333").s().p("AgqBJQgTgLgMgTQgLgTAAgYQAAgXALgUQAMgTATgLQATgLAXAAQAZAAASALQAUALALATQAMAUAAAXQAAAYgMATQgLATgUALQgSAMgZABQgXgBgTgMgAgrgsQgSASgBAaQABAaASASQARASAaAAQAbAAARgSQASgSABgaQgBgagSgSQgRgRgbgBQgaABgRARg");
	this.shape_24.setTransform(1186,432.6);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#333333").s().p("AiyEdIAAkpIBcAiICnAAIApgsIBTA/QgEAEgFADQgHAEgJADIAADHQgBAEgMAGQgMAHgRAFQgSAGgRAAIgPAAIAAgsIiyAAIAAATQgBAFgLAHQgKAGgSAFQgQAFgTAAgAhaDeICyAAIAAhUIiyAAgAhaB5ICyAAIAAhSIiyAAgAkRglIgFgRIE2AAIAOgpIANgsIALgqIjFAAQAvAOAVAUQAVAVACAUQAAAVgMAOQgMAOgTABQgUABgVgSQgBgdgIgcQgIgcgLgXIhjAAIgEgQIDvAAIgKgEIgLgGQgCgWgJgTQgJgUgKgOIADgCQAzgCAZALQAYALAGAQQAFARgKAOQgJAOgSAGIB4AAIArg6IAOAMIAgAZIAhAcQgBAFgEACQgFACgHAAIiWAAIBcAcQgCAGgGADQgFADgKgBQgWAUgeAYQgeAYggAUIBsAAIAtg7IAOALIAhAaIAjAdQgCAFgEACQgFADgGAAg");
	this.shape_25.setTransform(1145.2,413.166);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#333333").s().p("AkYEZQAkgjASgpQASgpAEgrQAHgpgCgoIAAh/IBjAiIDaAAIAmgqIBOA7QgCAEgGAEQgGADgJACIAACHQAAACgNAFQgLADgRAEQgRAEgOgBIgPAAIAAgrIjwAAQgDAkgPAkQgPAlghAhQgiAhg8AZgAArBGIBRAAIAAhqIhRAAgAhxAoIAAAPIgBAPIBMAAIAAhqIhLAAgAjfhvIgEgQIC7AAIAAhFIjhAAIgFgRIDmAAIAAhIIBtAIQgBAGgEAFQgFAEgMACIAAAvIBuAAIAsg1IAOAKIAgAYIAiAaQgCAFgEADQgFACgHAAIjYAAIAABFIBPAAIAtg4IAOALIAgAYIAjAbQgCAGgEABQgEADgIAAg");
	this.shape_26.setTransform(1084.65,413.4);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#333333").s().p("ABmD3QgDgPgIgJQgJgJgQgIQgRgIgYgFIABgHIAgACIAfACIAXABQAHAAAFgCQAFgCAEgEQAQgPAHhTQAGhTACiYIhcAAQgYAngbAgQgbAfgfAZIgDgDIAADyQgBADgLAGQgLAFgPAEQgPAEgPABIgNAAIAAgwIhKAAIAAApQgBAFgIAHQgKAGgPAFQgPAFgRAAIgNAAIAAnJIBMAfIADglIACgpIACglIB0AcQgCAHgHAEQgGADgLAAIgfAlIgjAmIAnAAIAlgpIBKA6QgDAEgFADQgGADgJADIAABkQAOggANgpQANgpALgtQAKgtAIgsIBvAgQgBAGgHADQgFAEgLAAQgIATgIARIgSAjIBLAAIAtguIBJBBQgEAEgGADQgHADgLACQgBBegCBDQgDBDgFAtQgFAtgJAbQgIAbgNANQgRARgXAJQgXAHgiAAQABgVgDgPgAjDCuIBKAAIAAidIhKAAgAjDAAIBKAAIAAiTIhKAAgAAlBRQgCghgLghQgLgfgPgaIAEgDQA4AOAbAWQAbAWAFAXQAEAYgKARQgMARgUADIgEAAQgTAAgTgQg");
	this.shape_27.setTransform(1026.45,413.325);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#333333").s().p("AkDEZQArgWAagYQAbgZANgYQANgZAFgXQAEgXAAgTIAAg6IBuAkIA7AAIApgsIBHA5QgCAEgFACQgEACgHABIAABUQAAAFACACQACABAIAAIAcAAIAWAAQAEAAADgBQADgCADgEQAFgHAIgQIARgqIAGAAIACBEQAOAHAFAIQAFAIgBALQABAYgaAMQgZAMg6AAIgrAAQgfABgPgGQgQgHgFgPQgFgPABgZIAAhsIhQAAIAAAFQAAATgHAZQgHAagWAcQgXAcgtAYQguAYhMAPgAj1BzQgMgBgLgIQgKgHgEgOQgEgVAJgOQAKgNASgIQAJgFAIgLQAJgKAEgNQAEgOgCgPIAHgBIAKAVIAHATIFpAAIArgqIBJBEQgDAEgFACQgGACgJAAQgMALgRAMQgQAMgRAMQgRAMgPAIIgEgDIAGgnIAEgrIlqAAQAHAkgKAYQgJAYgTAKQgKAFgLAAIgEAAgAimgMIAAimIBbAiICeAAIAmgpIBPA7IgIAHQgGAEgJACIAABNQgBACgMAEQgMAEgRADQgRAEgOAAIgPAAIAAgbIioAAIAAAJQgBADgLAGQgLAGgRAFQgRAFgSAAgAhPg/ICoAAIAAhAIioAAgAkPi8IgFgQID9AAQgGgWgOgTQgNgUgOgNIADgDQAxgHAaAHQAcAGAKAOQAKAPgCAPQgEAQgNALIB7AAIArg8IANALIAgAaIAhAeQgCAFgEACQgFACgHAAg");
	this.shape_28.setTransform(965.1777,413.1125);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#333333").s().p("ACfD6QgCgOgFgJQgFgJgJgHQgJgGgSgEIAAgIIALABIAYABIASABQAHAAACgDQACgDAAgFIAAlUIixAAIAAGaQgBAFgJAHQgJAHgPAFQgPAFgSAAIgNAAIAAnqIBTAiIAbAAIADgkIACgoIACglICAATQgCAJgGAEQgHAEgKABIgmAlIgqAnIBvAAIAkgpIBLA6QgDAEgFADQgFADgIACIAAFQQAAAcgGATQgHATgVAMQgVALgqAEIgDgkgAkXC2IAAmjIBEAcIAYAAIAgghIA9AwQgCADgFADQgEADgHABIAAE5QgBADgJAFQgJAEgOAEQgNADgMABIgMAAIAAg4IgfAAIAABCQAAAEgIAFQgHAFgNAEQgMAFgPAAgAjVBMIAfAAIAAkMIgfAAgAAUCKIAAj1IA1AWIARAAIAZgaIAzAnQgCADgEACIgJADIAACsQgBADgIADIgSAHQgLACgJABIgKAAIAAgqIgXAAIAAAnQgBAFgNAFQgMAGgRABgABHBBIAXAAIAAiFIgXAAg");
	this.shape_29.setTransform(906.075,413.375);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#333333").s().p("Ag7BiQAmgTAQgZQAQgYAEgWQgOgDgQgIQgRgIgNgOQgNgOgBgWQAAgWARgRQAPgQAagBQAQAAAOAIQANAIAJAQQAIAPAAAXQAAAfgLAfQgLAfgYAbQgWAbgoASg");
	this.shape_30.setTransform(823.35,438.45);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#333333").s().p("AjJD9QgDgMgIgIQgIgJgOgGQgPgGgTgFIAAgGIAcACIAdABIAUAAIALAAQAEgBADgEQALgIAGgpQAGgoADhIIgzAAIgXAeIhBgkIAIgHQAFgEAFgDIAEg0IAEg6IABgyIBSAmIAaAAIAAh4Ih4AAIgFgQIB3AAIAignIBJA3QgDAFgGADQgHAFgKACIAACEQgBACgKAEQgKAEgPADQgOADgMAAIgNAAIAAgbIgqAAIgCAkIgDAnIgDAjIAwAAIAnglIBCA3QgDAEgGACQgGADgJACQgDA/gFArQgGAqgJAZQgJAZgPAMQgOAMgUAEQgTAFgbABQAAgRgCgNgAhQDBIA8gCQAkAAAvgDIAAhiIgmAAIAAASQAAADgJAFQgKAGgNADQgOAEgPABIgKAAIAAjRIBKAeIAjAAIAAhLIgWAAIAAAOQAAAEgKAGQgKAFgPAEQgOAFgQAAIgLAAIAAi9IBPAeIBvAAIAigkIBHA0QgCADgFADQgFAEgIABIAABpQgBACgKAEIgbAIQgOADgOABIgNAAIAAgdIgWAAIAABLIAgAAIAhgjIBFAzQgDADgFACQgFAEgIACIAAB3QgBACgKAFQgKADgPAEQgOADgNAAIgNAAIAAgYIglAAIAABeIA0gDQgHgPgIgOQgIgOgKgMIAFgDQA6AOAdAXQAdAYAGAaQAGAZgLASQgKATgUAEQgUAEgXgTQAAgOgCgQQgCgOgFgPQgmANg2AQQg2ARhHAUQgDAGgFADQgFADgFACgACLBJIAlAAIAAhpIglAAgAAZBJIAmAAIAAhpIgmAAgAApiMIB4AAIAAhYIh4AAg");
	this.shape_31.setTransform(785.0591,413.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#333333").s().p("AgoCVQgQgQgBgYQABgYAQgRQAQgQAYgBQAZABAQAQQAQARAAAYQAAAYgQAQQgQAQgZABQgYgBgQgQgAgohDQgQgRgBgXQABgZAQgQQAQgQAYgBQAZABAQAQQAQAQAAAZQAAAXgQARQgQAPgZABQgYgBgQgPg");
	this.shape_32.setTransform(712.2,417.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13}]}).wait(109));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1059.2,783.2,178.0999999999999,-202.70000000000005);
// library properties:
lib.properties = {
	id: '14CB93263BA1D74EA5B3F38304C0AC64',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#FF9999",
	opacity: 0.00,
	manifest: [
		{src:"sounds/yx12010109大声喊.mp3?1693896951480", id:"yx12010109大声喊"},
		{src:"sounds/悄悄话1.mp3?1693896951480", id:"悄悄话1"}
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