(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"1配音练习_atlas_P_1", frames: [[0,0,1400,166],[0,168,1400,166]]}
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



(lib._22 = function() {
	this.initialize(ss["1配音练习_atlas_P_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.yp3201011 = function() {
	this.initialize(ss["1配音练习_atlas_P_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.播放音频 = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(61.721,41.3175,3.0705,3.0705);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_1.setTransform(45.012,41.3559,3.0705,3.0705);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_2.setTransform(28.1973,41.3084,3.0705,3.0705);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgYAYQgKgJAAgPQAAgOAKgKQALgKANAAQAOAAAKAKQALAKAAAOQAAAPgLAJQgKALgOAAQgNAAgLgLg");
	this.shape_3.setTransform(10.5636,41.3303,3.0705,3.0705);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AprJsIAAzXITXAAIAATXg");
	this.shape_4.setTransform(41.575,42.475);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-20.4,-19.5,124,124);


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
	this.shape.setTransform(10.261,41.2811,3.0716,3.0716);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_1.setTransform(27.9009,41.2592,3.0716,3.0716);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_2.setTransform(44.7216,41.3067,3.0716,3.0716);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgkCDQgCgEABgEQAAgEAEgCQAYgRANggQAOgfAAglQAAgkgOgfQgNgfgXgSQgEgCAAgEQgBgEACgEQADgDAEgBQAEAAADACQAbAUAQAkQAQAjAAApQAAAqgQAkQgRAjgbAUQgDACgCAAQgGAAgDgEg");
	this.shape_3.setTransform(61.4365,41.2683,3.0716,3.0716);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape},{t:this.shape_1}]},8).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_2}]},9).to({state:[{t:this.shape},{t:this.shape_1},{t:this.shape_2},{t:this.shape_3}]},9).wait(8));

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("ArfLgIAA2/IW/AAIAAW/g");
	this.shape_4.setTransform(42.3,52.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(34));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.3,-21.3,147.20000000000002,147.20000000000002);


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
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AA8CEIgbgBIgDgKQgBgGgDgEIAdABIAUABIAHgBQADgBADgEQADgDADgOQADgOACgaIAChBIAChgIjdAAIAAgUIDyAAIAAAMIgBBqIgEBFQgBAbgDAPQgDAOgEAGQgFAHgGADQgGADgJABIgOAAIgIAAgAh7BFIA3gRIBDgWIBEgZIAFAUIhEAYIhAAWIg3ATgAgUgXIgfgYIgfgWIAOgOIAfAWIAfAXQAOALAJAJIgPAQIgWgVg");
	this.shape_1.setTransform(76,25.2833);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AAECIIgEgKIAXABIANgBIAFgBIABgEIAAhfIgrAAIgSABQgIABgBADIgDgKIgFgKQAFgBAEgIIAJgTIADgHIAEgKIgdAAIAAgUIAkAAIAEgQIAFgQIgyAAIAAgUIA4AAIAFgUIAEgTIAVADIgFASIgEASIBoAAIAAAUIhuAAIgFAQIgFAQIAuAAIAAA8IBEAAIAAAUIhEAAIAABfQABAJgDAFQgCAFgHACQgGADgLABIgcAAIgCgKgAAAgNIgIATIAyAAIAAgoIgiAAIgIAVgAguB8IgIgFQAJgKAIgNQAJgMAIgNQAHgMAEgMIATAFIgNAcQgIAOgJANQgKANgKAKIgGgGgAB1BqIgOgbIgPgZIARgHIAPAYIAOAaIAMAWIgSAIIgLgVgAiPBpIAqgPIAygSIAEARIgwATIgrASgAiIA+IgDgJIgEgJQAFgBAFgGIAMgOIAMgRIASgbIgbAEIgOACIgGADIgDgKIgEgLQAEgBAEgFIAJgOIAKgUIAOghQAIgTAFgUIAUAKQgJAagMAaQgMAagOAVIAkgEIAJgRIAJgRIASAJQgOAbgPAaQgQAYgQAWIA7gLIAAAJIAAAJIgrAKIgaAGIgNAEIgGACg");
	this.shape_2.setTransform(44.25,24.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_3.setTransform(23.85,34.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_4.setTransform(10.625,24.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#AAD7E3").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_5.setTransform(100.825,24.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#AAD7E3").s().p("AA8CEIgbgBIgDgKQgBgGgDgEIAdABIAUABIAHgBQADgBADgEQADgDADgOQADgOACgaIAChBIAChgIjdAAIAAgUIDyAAIAAAMIgBBqIgEBFQgBAbgDAPQgDAOgEAGQgFAHgGADQgGADgJABIgOAAIgIAAgAh7BFIA3gRIBDgWIBEgZIAFAUIhEAYIhAAWIg3ATgAgUgXIgfgYIgfgWIAOgOIAfAWIAfAXQAOALAJAJIgPAQIgWgVg");
	this.shape_6.setTransform(76,25.2833);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#AAD7E3").s().p("AAECIIgEgKIAXABIANgBIAFgBIABgEIAAhfIgrAAIgSABQgIABgBADIgDgKIgFgKQAFgBAEgIIAJgTIADgHIAEgKIgdAAIAAgUIAkAAIAEgQIAFgQIgyAAIAAgUIA4AAIAFgUIAEgTIAVADIgFASIgEASIBoAAIAAAUIhuAAIgFAQIgFAQIAuAAIAAA8IBEAAIAAAUIhEAAIAABfQABAJgDAFQgCAFgHACQgGADgLABIgcAAIgCgKgAAAgNIgIATIAyAAIAAgoIgiAAIgIAVgAguB8IgIgFQAJgKAIgNQAJgMAIgNQAHgMAEgMIATAFIgNAcQgIAOgJANQgKANgKAKIgGgGgAB1BqIgOgbIgPgZIARgHIAPAYIAOAaIAMAWIgSAIIgLgVgAiPBpIAqgPIAygSIAEARIgwATIgrASgAiIA+IgDgJIgEgJQAFgBAFgGIAMgOIAMgRIASgbIgbAEIgOACIgGADIgDgKIgEgLQAEgBAEgFIAJgOIAKgUIAOghQAIgTAFgUIAUAKQgJAagMAaQgMAagOAVIAkgEIAJgRIAJgRIASAJQgOAbgPAaQgQAYgQAWIA7gLIAAAJIAAAJIgrAKIgaAGIgNAEIgGACg");
	this.shape_7.setTransform(44.25,24.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#AAD7E3").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_8.setTransform(23.85,34.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#AAD7E3").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
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
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AA8CEIgbgBIgDgKQgBgGgDgEIAdABIAUABIAHgBQADgBADgEQADgDADgOQADgOACgaIAChBIAChgIjdAAIAAgUIDyAAIAAAMIgBBqIgEBFQgBAbgDAPQgDAOgEAGQgFAHgGADQgGADgJABIgOAAIgIAAgAh7BFIA3gRIBDgWIBEgZIAFAUIhEAYIhAAWIg3ATgAgUgXIgfgYIgfgWIAOgOIAfAWIAfAXQAOALAJAJIgPAQIgWgVg");
	this.shape_1.setTransform(76,25.2833);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AAECIIgEgKIAXABIANgBIAFgBIABgEIAAhfIgrAAIgSABQgIABgBADIgDgKIgFgKQAFgBAEgIIAJgTIADgHIAEgKIgdAAIAAgUIAkAAIAEgQIAFgQIgyAAIAAgUIA4AAIAFgUIAEgTIAVADIgFASIgEASIBoAAIAAAUIhuAAIgFAQIgFAQIAuAAIAAA8IBEAAIAAAUIhEAAIAABfQABAJgDAFQgCAFgHACQgGADgLABIgcAAIgCgKgAAAgNIgIATIAyAAIAAgoIgiAAIgIAVgAguB8IgIgFQAJgKAIgNQAJgMAIgNQAHgMAEgMIATAFIgNAcQgIAOgJANQgKANgKAKIgGgGgAB1BqIgOgbIgPgZIARgHIAPAYIAOAaIAMAWIgSAIIgLgVgAiPBpIAqgPIAygSIAEARIgwATIgrASgAiIA+IgDgJIgEgJQAFgBAFgGIAMgOIAMgRIASgbIgbAEIgOACIgGADIgDgKIgEgLQAEgBAEgFIAJgOIAKgUIAOghQAIgTAFgUIAUAKQgJAagMAaQgMAagOAVIAkgEIAJgRIAJgRIASAJQgOAbgPAaQgQAYgQAWIA7gLIAAAJIAAAJIgrAKIgaAGIgNAEIgGACg");
	this.shape_2.setTransform(44.25,24.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_3.setTransform(23.85,34.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_4.setTransform(11.15,24.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#AAD7E3").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAJgFIATAAIAADUIAwAAIAAAVg");
	this.shape_5.setTransform(101.35,24.65);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#AAD7E3").s().p("AA8CEIgbgBIgDgKQgBgGgDgEIAdABIAUABIAHgBQADgBADgEQADgDADgOQADgOACgaIAChBIAChgIjdAAIAAgUIDyAAIAAAMIgBBqIgEBFQgBAbgDAPQgDAOgEAGQgFAHgGADQgGADgJABIgOAAIgIAAgAh7BFIA3gRIBDgWIBEgZIAFAUIhEAYIhAAWIg3ATgAgUgXIgfgYIgfgWIAOgOIAfAWIAfAXQAOALAJAJIgPAQIgWgVg");
	this.shape_6.setTransform(76,25.2833);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#AAD7E3").s().p("AAECIIgEgKIAXABIANgBIAFgBIABgEIAAhfIgrAAIgSABQgIABgBADIgDgKIgFgKQAFgBAEgIIAJgTIADgHIAEgKIgdAAIAAgUIAkAAIAEgQIAFgQIgyAAIAAgUIA4AAIAFgUIAEgTIAVADIgFASIgEASIBoAAIAAAUIhuAAIgFAQIgFAQIAuAAIAAA8IBEAAIAAAUIhEAAIAABfQABAJgDAFQgCAFgHACQgGADgLABIgcAAIgCgKgAAAgNIgIATIAyAAIAAgoIgiAAIgIAVgAguB8IgIgFQAJgKAIgNQAJgMAIgNQAHgMAEgMIATAFIgNAcQgIAOgJANQgKANgKAKIgGgGgAB1BqIgOgbIgPgZIARgHIAPAYIAOAaIAMAWIgSAIIgLgVgAiPBpIAqgPIAygSIAEARIgwATIgrASgAiIA+IgDgJIgEgJQAFgBAFgGIAMgOIAMgRIASgbIgbAEIgOACIgGADIgDgKIgEgLQAEgBAEgFIAJgOIAKgUIAOghQAIgTAFgUIAUAKQgJAagMAaQgMAagOAVIAkgEIAJgRIAJgRIASAJQgOAbgPAaQgQAYgQAWIA7gLIAAAJIAAAJIgrAKIgaAGIgNAEIgGACg");
	this.shape_7.setTransform(44.25,24.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#AAD7E3").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_8.setTransform(23.85,34.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#AAD7E3").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_9.setTransform(11.15,24.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).wait(3));

	// 图层_3
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_10.setTransform(123.275,22.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_10).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-5.5,241.7,55.3);


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
	this.shape.graphics.f("rgba(255,153,0,0.2)").s().p("AiJEHIAAoNIETAAIAAINg");
	this.shape.setTransform(13.775,26.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,153,0,0.2)").s().p("AiJEHIAAoNIETAAIAAINg");
	this.shape_1.setTransform(368.075,26.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,102,255,0.2)").s().p("AhrEHIAAoNIDXAAIAAINg");
	this.shape_2.setTransform(705.525,26.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(102,0,204,0.2)").s().p("AhrEHIAAoNIDXAAIAAINg");
	this.shape_3.setTransform(1017.725,26.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,1028.5,52.6);


(lib.musicstop = function(mode,startPosition,loop,reversed) {
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
	this.m1stop_btn = new lib.musicplay();
	this.m1stop_btn.name = "m1stop_btn";
	this.m1stop_btn.setTransform(-5.5,-10.7,1,1,0,0,0,36.8,41.6);

	this.timeline.addTween(cjs.Tween.get(this.m1stop_btn).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-73.6,-73.6,147.2,147.2);


// stage content:
(lib._1配音练习 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,"m1.1":5,"m1.2":35,"m1.3":67,"m1.4":98,lnav2:132,"m2.1":138,"m2.2":168,"m2.3":199,"m2.4":230};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,6,34,36,65,68,96,99,127,132,139,167,169,198,200,229,231,261];
	this.streamSoundSymbolsList[6] = [{id:"_11课一11",startFrame:6,endFrame:36,loop:1,offset:0}];
	this.streamSoundSymbolsList[36] = [{id:"_11课一12",startFrame:36,endFrame:68,loop:1,offset:0}];
	this.streamSoundSymbolsList[68] = [{id:"_11课一13",startFrame:68,endFrame:99,loop:1,offset:0}];
	this.streamSoundSymbolsList[99] = [{id:"_11课一14",startFrame:99,endFrame:139,loop:1,offset:0}];
	this.streamSoundSymbolsList[139] = [{id:"_11课一21",startFrame:139,endFrame:167,loop:1,offset:0}];
	this.streamSoundSymbolsList[169] = [{id:"_11课一22",startFrame:169,endFrame:198,loop:1,offset:0}];
	this.streamSoundSymbolsList[200] = [{id:"_11课一23",startFrame:200,endFrame:229,loop:1,offset:0}];
	this.streamSoundSymbolsList[231] = [{id:"_11课一24",startFrame:231,endFrame:262,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var _this = this;
		
		
		_this.stop();
		
		
		
		_this.lnav1_btn.on('click', function(){
			
		_this.gotoAndPlay('lnav1');
			
		});
		
		_this.lnav2_btn.on('click', function(){
			
		_this.gotoAndPlay('lnav2');
			
		});
		
		
		
		_this.m1_1btn.on('click', function(){
		
		_this.gotoAndPlay('m1.1');
			
		});
		
		
		
		_this.m1_2btn.on('click', function(){
		
		_this.gotoAndPlay('m1.2');
			
		});
		
		
		
		_this.m1_3btn.on('click', function(){
		
		_this.gotoAndPlay('m1.3');
			
		});
		
		
		
		_this.m1_4btn.on('click', function(){
		
		_this.gotoAndPlay('m1.4');
			
		});
		
		
		
		_this.m1stop_btn.on('click', function(){
		
		_this.gotoAndPlay('lnav1');
		});
	}
	this.frame_6 = function() {
		var soundInstance = playSound("_11课一11",0);
		this.InsertIntoSoundStreamData(soundInstance,6,36,1);
	}
	this.frame_34 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_36 = function() {
		var soundInstance = playSound("_11课一12",0);
		this.InsertIntoSoundStreamData(soundInstance,36,68,1);
	}
	this.frame_65 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_68 = function() {
		var soundInstance = playSound("_11课一13",0);
		this.InsertIntoSoundStreamData(soundInstance,68,99,1);
	}
	this.frame_96 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_99 = function() {
		var soundInstance = playSound("_11课一14",0);
		this.InsertIntoSoundStreamData(soundInstance,99,139,1);
	}
	this.frame_127 = function() {
		this.gotoAndStop('lnav1');
	}
	this.frame_132 = function() {
		var _this = this;
		
		_this.stop();
		
		
		_this.m2_1btn.on('click', function(){
		
		_this.gotoAndPlay('m2.1');
		});
		
		
		_this.m2_2btn.on('click', function(){
		
		_this.gotoAndPlay('m2.2');
		});
		
		
		_this.m2_3btn.on('click', function(){
		
		_this.gotoAndPlay('m2.3');
		});
		
		
		_this.m2_4btn.on('click', function(){
		
		_this.gotoAndPlay('m2.4');
		});
		
		
		
		_this.m2stop_btn.on('click', function(){
		
		_this.gotoAndPlay('lnav2');
		});
	}
	this.frame_139 = function() {
		var soundInstance = playSound("_11课一21",0);
		this.InsertIntoSoundStreamData(soundInstance,139,167,1);
	}
	this.frame_167 = function() {
		this.gotoAndStop('lnav2');
	}
	this.frame_169 = function() {
		var soundInstance = playSound("_11课一22",0);
		this.InsertIntoSoundStreamData(soundInstance,169,198,1);
	}
	this.frame_198 = function() {
		this.gotoAndStop('lnav2');
	}
	this.frame_200 = function() {
		var soundInstance = playSound("_11课一23",0);
		this.InsertIntoSoundStreamData(soundInstance,200,229,1);
	}
	this.frame_229 = function() {
		this.gotoAndStop('lnav2');
	}
	this.frame_231 = function() {
		var soundInstance = playSound("_11课一24",0);
		this.InsertIntoSoundStreamData(soundInstance,231,262,1);
	}
	this.frame_261 = function() {
		this.gotoAndStop('lnav2');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(6).call(this.frame_6).wait(28).call(this.frame_34).wait(2).call(this.frame_36).wait(29).call(this.frame_65).wait(3).call(this.frame_68).wait(28).call(this.frame_96).wait(3).call(this.frame_99).wait(28).call(this.frame_127).wait(5).call(this.frame_132).wait(7).call(this.frame_139).wait(28).call(this.frame_167).wait(2).call(this.frame_169).wait(29).call(this.frame_198).wait(2).call(this.frame_200).wait(29).call(this.frame_229).wait(2).call(this.frame_231).wait(30).call(this.frame_261).wait(1));

	// leftnav_on
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#74B2C3").s().p("Ag+B1IAAgVIA1AAIAAizIgqAAIAAgRQAPgDAMgEQAMgDAIgGIATAAIAADUIAwAAIAAAVg");
	this.shape.setTransform(206.3,442.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#74B2C3").s().p("AA8CEIgbgBIgDgKQgBgGgDgEIAdABIAUABIAHgBQADgBADgEQAEgDACgOQACgOADgaIAChBIAChgIjdAAIAAgUIDyAAIAAAMIgBBqIgEBFQgBAbgDAPQgDAOgEAGQgFAHgGADQgGADgJABIgOAAIgIAAgAh7BFIA3gRIBDgWIBFgZIADAUIhCAYIhBAWIg3ATgAgUgXIgfgYIgfgWIAOgOIAfAWIAfAXQAOALAJAJIgPAQIgWgVg");
	this.shape_1.setTransform(180.95,443.3833);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#74B2C3").s().p("AAECIIgEgKIAXABIANgBIAFgBIABgEIAAhfIgrAAIgTABQgHABgBADIgDgKIgFgKQAFgBAEgIIAJgTIADgHIAEgKIgdAAIAAgUIAkAAIAEgQIAFgQIgyAAIAAgUIA4AAIAFgUIAFgTIAUADIgFASIgEASIBoAAIAAAUIhuAAIgFAQIgFAQIAuAAIAAA8IBEAAIAAAUIhEAAIAABfQABAJgDAFQgCAFgHACQgGADgLABIgcAAIgCgKgAAAgNIgIATIAyAAIAAgoIgiAAIgIAVgAgvB8IgIgFQAJgKAJgNQAJgMAIgNQAHgMAEgMIATAFIgNAcQgIAOgJANQgKANgKAKIgHgGgAB1BqIgOgbIgQgZIASgHIAPAYIAOAaIAMAWIgSAIIgLgVgAiPBpIAqgPIAzgSIADARIgwATIgrASgAiIA+IgDgJIgEgJQAFgBAFgGIAMgOIALgRIASgbIgaAEIgOACIgGADIgDgKIgEgLQAEgBAEgFIAJgOIAKgUIAOghQAIgTAFgUIAUAKQgJAagMAaQgNAagNAVIAkgEIAJgRIAJgRIASAJQgOAbgPAaQgQAYgQAWIA7gLIAAAJIAAAJIgsAKIgZAGIgNAEIgGACg");
	this.shape_2.setTransform(149.2,442.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#74B2C3").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAIABAGAFQAFAGABAJQgBAJgFAFQgGAGgIAAQgIAAgFgGg");
	this.shape_3.setTransform(128.8,452.775);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#74B2C3").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgRQAPgDAMgEQALgDAKgGIASAAIAADUIAwAAIAAAVg");
	this.shape_4.setTransform(116.1,442.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#74A6C3").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_5.setTransform(205.775,506.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#74A6C3").s().p("AA8CEIgbgBIgDgKQgBgGgDgEIAdABIAUABIAHgBQADgBADgEQAEgDACgOQACgOADgaIAChBIAChgIjdAAIAAgUIDyAAIAAAMIgBBqIgEBFQgBAbgDAPQgDAOgEAGQgFAHgGADQgGADgJABIgOAAIgIAAgAh7BFIA3gRIBDgWIBFgZIADAUIhCAYIhBAWIg3ATgAgUgXIgfgYIgfgWIAOgOIAfAWIAfAXQAOALAJAJIgPAQIgWgVg");
	this.shape_6.setTransform(180.95,507.0333);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#74A6C3").s().p("AAECIIgEgKIAXABIANgBIAFgBIABgEIAAhfIgrAAIgTABQgHABgBADIgDgKIgFgKQAFgBAEgIIAJgTIADgHIAEgKIgdAAIAAgUIAkAAIAEgQIAFgQIgyAAIAAgUIA4AAIAFgUIAFgTIAUADIgFASIgEASIBoAAIAAAUIhuAAIgFAQIgFAQIAuAAIAAA8IBEAAIAAAUIhEAAIAABfQABAJgDAFQgCAFgHACQgGADgLABIgcAAIgCgKgAAAgNIgIATIAyAAIAAgoIgiAAIgIAVgAgvB8IgIgFQAJgKAJgNQAJgMAIgNQAHgMAEgMIATAFIgNAcQgIAOgJANQgKANgKAKIgHgGgAB1BqIgOgbIgQgZIASgHIAPAYIAOAaIAMAWIgSAIIgLgVgAiPBpIAqgPIAzgSIADARIgwATIgrASgAiIA+IgDgJIgEgJQAFgBAFgGIAMgOIALgRIASgbIgaAEIgOACIgGADIgDgKIgEgLQAEgBAEgFIAJgOIAKgUIAOghQAIgTAFgUIAUAKQgJAagMAaQgNAagNAVIAkgEIAJgRIAJgRIASAJQgOAbgPAaQgQAYgQAWIA7gLIAAAJIAAAJIgsAKIgZAGIgNAEIgGACg");
	this.shape_7.setTransform(149.2,505.875);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#74A6C3").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAIABAGAFQAFAGABAJQgBAJgFAFQgGAGgIAAQgIAAgFgGg");
	this.shape_8.setTransform(128.8,516.425);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#74A6C3").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_9.setTransform(115.575,506.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},132).wait(130));

	// leftnav
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#333333").s().p("ABCEnQABgYgEgRQgEgRgIgJQgJgMgSgJQgRgJgZgGIAAgHIAiACIAiACIAaABQAIAAAHgDQAHgCAFgFQAOgMAKgtQAJgsAHhNQg6AkhUArQhTArh1A1QgDAGgEAFQgFAFgGACIg9hrQAcgGAsgMIBlgaIB3ghQBAgRBDgVIAFhaIAFhrImhAAIgGgSIGfAAIA0g1IBQBKQgDAFgIAEQgHAEgMACQgEBvgFBRQgFBPgIA2QgIA2gMAhQgMAhgRAQQgVAWgaAJQgZAKgkAAIgEgBgAgSgbQgbgYgkgZQgjgZgngVQgmgWgjgNIADgHQBMgLA0AFQA1AGAfAQQAfAQAOAVQANAVgCAUQgDAUgQAMQgOALgWAAIgGAAg");
	this.shape_10.setTransform(326.575,295.4012);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#333333").s().p("AA7EMQgEgRgIgJQgGgKgNgGQgMgIgXgEIAAgIIAJABIAYABIAbABIASAAQAHAAADgDQADgDgBgGIAAiwIhDAAIgUAZIhQgqIAJgHIAJgHQAHgQAHgWIARgrIggAAIgGgSIAsAAIAOgrIAOgqIhZAAIgFgSIBiAAIAOgzIAKgoIBsAbQgBAHgHAEQgGAFgNAAIgHAWIgJAaIBPAAIAxhAIAPAMIAiAdIAlAeQgBAGgGADQgEACgIAAIjIAAIgOAqIgOArIATAAIAmgsIBQA+QgCAEgHAEQgGADgKACIAABIIAlgwIAOALIAgAaIAiAcQgBAFgEADQgFACgIAAIhjAAIAAC6QAAAcgHAUQgIAUgWANQgYAMgvAEQgBgVgDgPgAAjgpIgQAsIBAAAIAAheIgfAAIgRAygAktChQAXgCAmgHQAmgGAsgKQAsgKArgLIAAAFQgaAagpAhQgqAjg9AoQgDAGgFAFQgFAGgHABgAh/ECQAggkAcgzQAbg1AOg9IBtArQgCAGgHAEQgGADgLgBQgjA5gsAlQgtAkg1AWgADeDfQgCgngOgnQgNgngQghIAFgDQA7AVAcAbQAdAbAGAbQAFAbgLATQgLASgUADIgGABQgTAAgUgRgAkxAnIAFgBIAKgDQAGgDAEgDQARgNATgXQATgaATgeIgZANIgZAOIgEACIgEACIgmhaIAIgCQAHgCAHgFQAKgKALgUQALgVALgZQAKgZAIgZQAIgZADgTIBuAvQgBAEgGADQgEAEgJgBQgQAVgUAWQgWAXgXAUQgXAWgXAQIAiAAIAlgBIAOggIALgdIBoAxQgCAFgGADQgGACgKAAQgTAagdAdQgcAeggAcQghAagfAWIBQAAIBfgCIAAAHQgcANgwAVQgxAVg/AWIgGAGIgHAEg");
	this.shape_11.setTransform(261.15,294.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#333333").s().p("Ai9EwIAAk9IBhAlICyAAIAtgvIBXBDQgDAEgGAEQgHAEgLADIAADUQgBAEgMAHQgNAHgSAGQgSAGgTAAIgQAAIAAgvIi/AAIAAAVQAAAFgMAHQgLAHgSAFQgSAFgUAAgAhhDtIC/AAIAAhaIi/AAgAhhCBIC/AAIAAhXIi/AAgAkjgoIgGgRIFLAAIAPgsQAIgYAGgYIALgsIjSAAQAyAPAXAWQAWAWACAVQABAWgNAPQgNAPgVACQgVABgWgTQgBgfgJgeQgIgegMgZIhpAAIgGgRIEBAAIgMgEIgLgHQgDgXgJgVQgKgVgLgOIAEgDQA3gCAZAMQAbAMAGARQAFARgKAQQgKAPgTAGIB/AAIAvg9IAPALIAhAbQAUAQAQAOQgBAFgFADQgFACgHAAIihAAIBjAeQgCAGgGAEQgGADgLgBQgXAVggAZQghAaghAWIBzAAIAwhAIAPAMIAjAcIAmAfQgCAFgFADQgFACgHAAg");
	this.shape_12.setTransform(197.375,294.3167);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#333333").s().p("AkgEvIAAnVIBNAgIAAhgIhZAAIgFgSIDlAAIAog2IANAKIAdAYIAfAbQgBAGgFACQgFACgHABIheAAIAABdIAhglIBGA4QgDAEgGADQgFADgJADIAAF4QgBACgJAGQgLAFgOAEQgPAEgOABIgNAAIAAg0IiOAAIAAAkQAAAEgJAGQgJAGgNAFQgOAFgRAAgAjWDfICOAAIAAhZIiOAAgAjWB0ICOAAIAAhEIgHABIgHAAIgPAAQgWAAgGgJQgHgKABgVIAAh9IgRAAIAAAXQAAAWgDAeQgEAcgMAcQgNAegaAXIgEgDgAjWA0QAPglACgmQACgmgBghIAAgWIgSAAgAhbh0IAABpIABAHQAAABABAAQAAAAAAABQABAAABAAQAAAAABAAIAFAAIAFAAIAEAAIAAhyIgTAAgAiYiGIARAAIAAhgIgRAAgAB8EaQghAAgRgGQgSgHgHgPQgHgQABgdIAAlCIBbAjIAwAAIAAiYIiHAAIgGgSICGAAIAngrIBQA9QgDAFgHAEQgIAEgKADIAADFQgBADgMAEQgLAFgQADQgPACgPABIgOAAIAAg+Ig4AAIAAD3QAAAHADAEQAEADAMAAIArAAIAUAAIAPAAQAGgBAEgCQADgCAEgEQAFgLAIgWIASg1IAHAAIACBZQAQAHAFAJQAGAIgBALQABAQgMAMQgNANgbAFQgdAHgvAAg");
	this.shape_13.setTransform(133.5271,294.4);

	this.lnav2_btn = new lib.lnav2();
	this.lnav2_btn.name = "lnav2_btn";
	this.lnav2_btn.setTransform(152.15,505.75,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav2_btn, 0, 1, 2, false, new lib.lnav2(), 3);

	this.lnav1_btn = new lib.lnav1();
	this.lnav1_btn.name = "lnav1_btn";
	this.lnav1_btn.setTransform(152.15,442.1,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav1_btn, 0, 1, 2, false, new lib.lnav1(), 3);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(153,153,153,0.498)").s().p("AAgBoIAAgxQgJALgNALQgMAKgNAHIgFgFIgGgFQAOgGAMgJQAMgJAIgKIAMAEIAAgrIgWACIgWABIgBgFIgDgGIAjgDIAigDIAbgFIANAKIgWAEIgZADIAAAYIAEAFIADAEIAUgNIARgMIAKAIIgTANIgVAMQAKAKANAHQAMAHAOAFQgDABgCAEIgEAGQgQgGgNgKQgOgKgLgMIAAA0gAhCBoIgNgBIgBgHIgDgGIANABIAJAAIAEgBIADgCQADgCACgJIAEgYIADgpIg3AAIADgYIADgdIACgcIANABIgCAXIgCAXIgCAWIAYAAIAEgbIACgeIADgeIg0AAIAAgOIBCAAIgCAiIgEAkIgDAfIAGAAIALAAIAAACIAAAEQgCAegCATQgCATgDAKQgCAKgEADIgGAFIgIACIgKAAgAhsAxIAagGIAegIIABANIgcAIIgaAHgAgSA0IgFgFIAVgMQAKgHAHgHIANAEQgJAJgLAIQgKAJgLAFIgFgEgAAZgFIAAgOIgaAEIgYADIgDgMIAOgCIAAhBIgLAAIAAgMIBGAAIAAAMIgIAAIAAA7IAIgBIAAALIgIABIAAAQgAgCgbIAbgEIAAgNIgbAAgAgCg2IAbAAIAAgOIgbAAgAgChOIAbAAIAAgNIgbAAgAAxgPIgFgFQAHgFAHgGQAHgHAGgJIgLgNIgLgMIAJgHIAKALIAKALIAHgPQADgHACgIIgmAAIAAgNIApAAIADAAIACAAIAIACQgDAPgFAMQgFANgGALIAMAOIAJAMIgKAJIgIgLIgKgNIgNAPQgHAGgIAFIgDgFg");
	this.shape_14.setTransform(189.925,374.775);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(153,153,153,0.498)").s().p("AhjBlIgFgIQBDgIArgYQAsgZAVgqIAPAHQgXAtguAbQgsAZhFALIgDgIgAgFA5IAAhLIhhAAIAAgQIAlAAIAAg2IAQAAIAAA2IAuAAIAAhJIAPAAIAAAaIBHAAIAAAPIhHAAIAAAgIBdAAIAAAQIheAAIAABLgAhYAyIgGgFQAOgLAMgOQANgOAJgNIAPAEQgKAQgOAQQgNAQgOALIgGgGg");
	this.shape_15.setTransform(166.075,374.25);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(153,153,153,0.498)").s().p("AgBBlIgHgFQAPgPAKgWQAJgVAEgZQAGgZAAgbIgiAAIAAgQIAjAAIABgZIAAgaIAQAAIgBAaIAAAZIA1AAIAAAJIgDA9IgDAqIgDAaQgDAJgDADQgEAFgEACIgJACIgOAAIgTgBIgCgHIgDgIIATABIANAAIAFAAIAEgDQADgEADgNIAEgoIADhEIgmAAQgCAdgEAbQgFAbgKAXQgKAXgSARIgEgGgAhjBGIgDgIQACgBADgEIAGgLIAFgPIAHgXIAIgaIgiAAIAAgPIBpAAIAAAPIg3AAQgFASgGAUIgOAkIA8gMIgHgUIgIgTIAOgDIAJAXIAJAYIAFAUIgNAFIgCgIIgDgJIgoAJIgYAFIgLAEIgGACIgCgHgAhghMIAAgOIBbAAIAAAOg");
	this.shape_16.setTransform(142.25,374.525);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(153,153,153,0.498)").s().p("AhqBiIAAgQICJAAIAEgTIACgVIhsAAIAHgbIAGgfIAGgiIAGgfIg0AAIAAgPIDGAAIAAAPIiBAAIgEATIgDAVIBVAAIADgBIAMABIgDAbIgEAgIgEAgIgFAgIA7AAIAAAQgAgsABIgGAaIBZAAIAEgcIADgZIhWAAIgEAbg");
	this.shape_17.setTransform(118.3,374.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#CCCCCC").ss(1,1,1).p("AzdAAMAm7AAA");
	this.shape_18.setTransform(228.875,350.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.lnav1_btn},{t:this.lnav2_btn},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]}).wait(262));

	// 音频播放
	this.m1_4btn = new lib.播放音频();
	this.m1_4btn.name = "m1_4btn";
	this.m1_4btn.setTransform(1642.4,819.25,1,1,0,0,0,36.8,41.4);
	new cjs.ButtonHelper(this.m1_4btn, 0, 1, 1);

	this.m1_3btn = new lib.播放音频();
	this.m1_3btn.name = "m1_3btn";
	this.m1_3btn.setTransform(1310.9,819.25,1,1,0,0,0,36.8,41.4);
	new cjs.ButtonHelper(this.m1_3btn, 0, 1, 1);

	this.m1_2btn = new lib.播放音频();
	this.m1_2btn.name = "m1_2btn";
	this.m1_2btn.setTransform(980.65,819.25,1,1,0,0,0,36.8,41.4);
	new cjs.ButtonHelper(this.m1_2btn, 0, 1, 1);

	this.m1_1btn = new lib.播放音频();
	this.m1_1btn.name = "m1_1btn";
	this.m1_1btn.setTransform(642.8,819.25,1,1,0,0,0,36.8,41.4);
	new cjs.ButtonHelper(this.m1_1btn, 0, 1, 1);

	this.m2_4btn = new lib.播放音频();
	this.m2_4btn.name = "m2_4btn";
	this.m2_4btn.setTransform(1642.4,819.25,1,1,0,0,0,36.8,41.4);
	new cjs.ButtonHelper(this.m2_4btn, 0, 1, 1);

	this.m2_3btn = new lib.播放音频();
	this.m2_3btn.name = "m2_3btn";
	this.m2_3btn.setTransform(1310.9,819.25,1,1,0,0,0,36.8,41.4);
	new cjs.ButtonHelper(this.m2_3btn, 0, 1, 1);

	this.m2_2btn = new lib.播放音频();
	this.m2_2btn.name = "m2_2btn";
	this.m2_2btn.setTransform(980.65,819.25,1,1,0,0,0,36.8,41.4);
	new cjs.ButtonHelper(this.m2_2btn, 0, 1, 1);

	this.m2_1btn = new lib.播放音频();
	this.m2_1btn.name = "m2_1btn";
	this.m2_1btn.setTransform(642.8,819.25,1,1,0,0,0,36.8,41.4);
	new cjs.ButtonHelper(this.m2_1btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.m1_1btn},{t:this.m1_2btn},{t:this.m1_3btn},{t:this.m1_4btn}]}).to({state:[{t:this.m1_2btn},{t:this.m1_3btn},{t:this.m1_4btn}]},5).to({state:[{t:this.m1_1btn},{t:this.m1_3btn},{t:this.m1_4btn}]},31).to({state:[{t:this.m1_1btn},{t:this.m1_2btn},{t:this.m1_4btn}]},31).to({state:[{t:this.m1_1btn},{t:this.m1_2btn},{t:this.m1_3btn}]},31).to({state:[]},30).to({state:[{t:this.m2_1btn},{t:this.m2_2btn},{t:this.m2_3btn},{t:this.m2_4btn}]},4).to({state:[{t:this.m2_2btn},{t:this.m2_3btn},{t:this.m2_4btn}]},6).to({state:[{t:this.m2_1btn},{t:this.m2_3btn},{t:this.m2_4btn}]},30).to({state:[{t:this.m2_1btn},{t:this.m2_2btn},{t:this.m2_4btn}]},31).to({state:[{t:this.m2_1btn},{t:this.m2_2btn},{t:this.m2_3btn}]},31).wait(32));

	// 音频停止
	this.m1stop_btn = new lib.musicstop();
	this.m1stop_btn.name = "m1stop_btn";
	this.m1stop_btn.setTransform(648.6,830.15);
	this.m1stop_btn._off = true;
	new cjs.ButtonHelper(this.m1stop_btn, 0, 1, 1);

	this.m2stop_btn = new lib.musicstop();
	this.m2stop_btn.name = "m2stop_btn";
	this.m2stop_btn.setTransform(648.6,830.15);
	this.m2stop_btn._off = true;
	new cjs.ButtonHelper(this.m2stop_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.m1stop_btn).wait(5).to({_off:false},0).wait(31).to({x:986.5},0).wait(31).to({x:1316.7,y:830.25},0).wait(31).to({x:1648.2,y:830.15},0).to({_off:true},30).wait(134));
	this.timeline.addTween(cjs.Tween.get(this.m2stop_btn).wait(138).to({_off:false},0).wait(30).to({x:986.5},0).wait(31).to({x:1316.7,y:830.25},0).wait(31).to({x:1648.2,y:830.15},0).wait(32));

	// 走谱
	this.instance = new lib.元件2("synched",0);
	this.instance.setTransform(1048.05,607.35,1,1,0,0,0,514.2,26.3);
	this.instance.alpha = 0;

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(255,153,0,0.2)").s().p("AiJEHIAAoNIETAAIAAINg");
	this.shape_19.setTransform(547.625,607.35);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(255,153,0,0.2)").s().p("AjAEHIAAoNIGBAAIAAINg");
	this.shape_20.setTransform(553.15,607.35);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(255,153,0,0.2)").s().p("Aj3EHIAAoNIHvAAIAAINg");
	this.shape_21.setTransform(558.675,607.35);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(255,153,0,0.2)").s().p("AkuEHIAAoNIJdAAIAAINg");
	this.shape_22.setTransform(564.175,607.35);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(255,153,0,0.2)").s().p("AllEHIAAoNILLAAIAAINg");
	this.shape_23.setTransform(569.7,607.35);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(255,153,0,0.2)").s().p("AmdEHIAAoNIM7AAIAAINg");
	this.shape_24.setTransform(575.225,607.35);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(255,153,0,0.2)").s().p("AnUEHIAAoNIOpAAIAAINg");
	this.shape_25.setTransform(580.75,607.35);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(255,153,0,0.2)").s().p("AoLEHIAAoNIQXAAIAAINg");
	this.shape_26.setTransform(586.275,607.35);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(255,153,0,0.2)").s().p("ApCEHIAAoNISFAAIAAINg");
	this.shape_27.setTransform(591.775,607.35);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("rgba(255,153,0,0.2)").s().p("Ap5EHIAAoNIT0AAIAAINg");
	this.shape_28.setTransform(597.3,607.35);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("rgba(255,153,0,0.2)").s().p("AqxEHIAAoNIVjAAIAAINg");
	this.shape_29.setTransform(602.825,607.35);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("rgba(255,153,0,0.2)").s().p("AroEHIAAoNIXRAAIAAINg");
	this.shape_30.setTransform(608.35,607.35);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("rgba(255,153,0,0.2)").s().p("AsfEHIAAoNIY/AAIAAINg");
	this.shape_31.setTransform(613.85,607.35);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("rgba(255,153,0,0.2)").s().p("AtWEHIAAoNIatAAIAAINg");
	this.shape_32.setTransform(619.375,607.35);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("rgba(255,153,0,0.2)").s().p("AuNEHIAAoNIccAAIAAINg");
	this.shape_33.setTransform(624.9,607.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("rgba(255,153,0,0.2)").s().p("AvFEHIAAoNIeLAAIAAINg");
	this.shape_34.setTransform(630.45,607.35);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("rgba(255,153,0,0.2)").s().p("Av8EHIAAoNIf5AAIAAINg");
	this.shape_35.setTransform(635.975,607.35);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("rgba(255,153,0,0.2)").s().p("AwzEHIAAoNMAhnAAAIAAINg");
	this.shape_36.setTransform(641.5,607.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("rgba(255,153,0,0.2)").s().p("AxqEHIAAoNMAjVAAAIAAINg");
	this.shape_37.setTransform(647,607.35);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("rgba(255,153,0,0.2)").s().p("AyhEHIAAoNMAlDAAAIAAINg");
	this.shape_38.setTransform(652.525,607.35);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("rgba(255,153,0,0.2)").s().p("AzZEHIAAoNMAmyAAAIAAINg");
	this.shape_39.setTransform(658.05,607.35);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("rgba(255,153,0,0.2)").s().p("A0QEHIAAoNMAohAAAIAAINg");
	this.shape_40.setTransform(663.575,607.35);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("rgba(255,153,0,0.2)").s().p("A1HEHIAAoNMAqPAAAIAAINg");
	this.shape_41.setTransform(669.075,607.35);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("rgba(255,153,0,0.2)").s().p("A1+EHIAAoNMAr9AAAIAAINg");
	this.shape_42.setTransform(674.6,607.35);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("rgba(255,153,0,0.2)").s().p("A21EHIAAoNMAtrAAAIAAINg");
	this.shape_43.setTransform(680.125,607.35);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("rgba(255,153,0,0.2)").s().p("A3tEHIAAoNMAvaAAAIAAINg");
	this.shape_44.setTransform(685.65,607.35);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("rgba(255,153,0,0.2)").s().p("A4kEHIAAoNMAxJAAAIAAINg");
	this.shape_45.setTransform(691.175,607.35);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("rgba(255,153,0,0.2)").s().p("A5bEHIAAoNMAy3AAAIAAINg");
	this.shape_46.setTransform(696.675,607.35);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("rgba(255,153,0,0.2)").s().p("A6SEHIAAoNMA0lAAAIAAINg");
	this.shape_47.setTransform(702.2,607.35);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("rgba(255,153,0,0.2)").s().p("A7JEHIAAoNMA2TAAAIAAINg");
	this.shape_48.setTransform(707.725,607.35);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("rgba(226,134,35,0.2)").s().p("AiJEHIAAoNIETAAIAAINg");
	this.shape_49.setTransform(901.925,607.35);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("rgba(226,134,35,0.2)").s().p("Ai+EHIAAoNIF9AAIAAINg");
	this.shape_50.setTransform(907.2,607.35);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("rgba(226,134,35,0.2)").s().p("AjyEHIAAoNIHlAAIAAINg");
	this.shape_51.setTransform(912.475,607.35);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("rgba(226,134,35,0.2)").s().p("AknEHIAAoNIJPAAIAAINg");
	this.shape_52.setTransform(917.75,607.35);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("rgba(226,134,35,0.2)").s().p("AlcEHIAAoNIK5AAIAAINg");
	this.shape_53.setTransform(923.025,607.35);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("rgba(226,134,35,0.2)").s().p("AmREHIAAoNIMjAAIAAINg");
	this.shape_54.setTransform(928.3,607.35);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("rgba(226,134,35,0.2)").s().p("AnFEHIAAoNIOLAAIAAINg");
	this.shape_55.setTransform(933.575,607.35);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("rgba(226,134,35,0.2)").s().p("An6EHIAAoNIP1AAIAAINg");
	this.shape_56.setTransform(938.85,607.35);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("rgba(226,134,35,0.2)").s().p("AovEHIAAoNIRfAAIAAINg");
	this.shape_57.setTransform(944.125,607.35);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("rgba(226,134,35,0.2)").s().p("ApkEHIAAoNITIAAIAAINg");
	this.shape_58.setTransform(949.4,607.35);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("rgba(226,134,35,0.2)").s().p("AqYEHIAAoNIUxAAIAAINg");
	this.shape_59.setTransform(954.675,607.35);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("rgba(226,134,35,0.2)").s().p("ArNEHIAAoNIWbAAIAAINg");
	this.shape_60.setTransform(959.95,607.35);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("rgba(226,134,35,0.2)").s().p("AsCEHIAAoNIYFAAIAAINg");
	this.shape_61.setTransform(965.225,607.35);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("rgba(226,134,35,0.2)").s().p("As3EHIAAoNIZuAAIAAINg");
	this.shape_62.setTransform(970.5,607.35);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("rgba(226,134,35,0.2)").s().p("AtrEHIAAoNIbXAAIAAINg");
	this.shape_63.setTransform(975.775,607.35);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("rgba(226,134,35,0.2)").s().p("AugEHIAAoNIdBAAIAAINg");
	this.shape_64.setTransform(981.075,607.35);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("rgba(226,134,35,0.2)").s().p("AvUEHIAAoNIepAAIAAINg");
	this.shape_65.setTransform(986.35,607.35);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("rgba(226,134,35,0.2)").s().p("AwJEHIAAoNMAgTAAAIAAINg");
	this.shape_66.setTransform(991.625,607.35);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("rgba(226,134,35,0.2)").s().p("Aw+EHIAAoNMAh9AAAIAAINg");
	this.shape_67.setTransform(996.9,607.35);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("rgba(226,134,35,0.2)").s().p("AxzEHIAAoNMAjnAAAIAAINg");
	this.shape_68.setTransform(1002.175,607.35);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("rgba(226,134,35,0.2)").s().p("AynEHIAAoNMAlQAAAIAAINg");
	this.shape_69.setTransform(1007.45,607.35);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("rgba(226,134,35,0.2)").s().p("AzcEHIAAoNMAm5AAAIAAINg");
	this.shape_70.setTransform(1012.725,607.35);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("rgba(226,134,35,0.2)").s().p("A0REHIAAoNMAojAAAIAAINg");
	this.shape_71.setTransform(1018,607.35);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("rgba(226,134,35,0.2)").s().p("A1GEHIAAoNMAqNAAAIAAINg");
	this.shape_72.setTransform(1023.275,607.35);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("rgba(226,134,35,0.2)").s().p("A16EHIAAoNMAr2AAAIAAINg");
	this.shape_73.setTransform(1028.55,607.35);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("rgba(226,134,35,0.2)").s().p("A2vEHIAAoNMAtfAAAIAAINg");
	this.shape_74.setTransform(1033.825,607.35);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("rgba(226,134,35,0.2)").s().p("A3kEHIAAoNMAvJAAAIAAINg");
	this.shape_75.setTransform(1039.1,607.35);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("rgba(226,134,35,0.2)").s().p("A4ZEHIAAoNMAwzAAAIAAINg");
	this.shape_76.setTransform(1044.375,607.35);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("rgba(226,134,35,0.2)").s().p("A5NEHIAAoNMAycAAAIAAINg");
	this.shape_77.setTransform(1049.65,607.35);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("rgba(226,134,35,0.2)").s().p("A6CEHIAAoNMA0FAAAIAAINg");
	this.shape_78.setTransform(1054.925,607.35);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("rgba(226,134,35,0.2)").s().p("AhrEHIAAoNIDXAAIAAINg");
	this.shape_79.setTransform(1239.375,607.35);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("rgba(226,134,35,0.2)").s().p("AicEHIAAoNIE5AAIAAINg");
	this.shape_80.setTransform(1244.275,607.35);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("rgba(226,134,35,0.2)").s().p("AjNEHIAAoNIGbAAIAAINg");
	this.shape_81.setTransform(1249.175,607.35);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("rgba(226,134,35,0.2)").s().p("Aj+EHIAAoNIH9AAIAAINg");
	this.shape_82.setTransform(1254.075,607.35);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("rgba(226,134,35,0.2)").s().p("AkvEHIAAoNIJfAAIAAINg");
	this.shape_83.setTransform(1258.975,607.35);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("rgba(226,134,35,0.2)").s().p("AlgEHIAAoNILBAAIAAINg");
	this.shape_84.setTransform(1263.875,607.35);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("rgba(226,134,35,0.2)").s().p("AnCEHIAAoNIOFAAIAAINg");
	this.shape_85.setTransform(1273.675,607.35);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("rgba(226,134,35,0.2)").s().p("AnzEHIAAoNIPmAAIAAINg");
	this.shape_86.setTransform(1278.55,607.35);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("rgba(226,134,35,0.2)").s().p("AokEHIAAoNIRIAAIAAINg");
	this.shape_87.setTransform(1283.45,607.35);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("rgba(226,134,35,0.2)").s().p("ApVEHIAAoNISrAAIAAINg");
	this.shape_88.setTransform(1288.35,607.35);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("rgba(226,134,35,0.2)").s().p("AqGEHIAAoNIUNAAIAAINg");
	this.shape_89.setTransform(1293.25,607.35);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("rgba(226,134,35,0.2)").s().p("Aq3EHIAAoNIVvAAIAAINg");
	this.shape_90.setTransform(1298.15,607.35);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("rgba(226,134,35,0.2)").s().p("AroEHIAAoNIXRAAIAAINg");
	this.shape_91.setTransform(1303.05,607.35);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("rgba(226,134,35,0.2)").s().p("AsZEHIAAoNIYyAAIAAINg");
	this.shape_92.setTransform(1307.95,607.35);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("rgba(226,134,35,0.2)").s().p("AtJEHIAAoNIaTAAIAAINg");
	this.shape_93.setTransform(1312.875,607.35);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("rgba(226,134,35,0.2)").s().p("At6EHIAAoNIb1AAIAAINg");
	this.shape_94.setTransform(1317.775,607.35);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("rgba(226,134,35,0.2)").s().p("AurEHIAAoNIdXAAIAAINg");
	this.shape_95.setTransform(1322.675,607.35);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("rgba(226,134,35,0.2)").s().p("AvcEHIAAoNIe5AAIAAINg");
	this.shape_96.setTransform(1327.575,607.35);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("rgba(226,134,35,0.2)").s().p("AwNEHIAAoNMAgbAAAIAAINg");
	this.shape_97.setTransform(1332.475,607.35);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("rgba(226,134,35,0.2)").s().p("AxvEHIAAoNMAjfAAAIAAINg");
	this.shape_98.setTransform(1342.275,607.35);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("rgba(226,134,35,0.2)").s().p("AygEHIAAoNMAlBAAAIAAINg");
	this.shape_99.setTransform(1347.15,607.35);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("rgba(226,134,35,0.2)").s().p("AzREHIAAoNMAmjAAAIAAINg");
	this.shape_100.setTransform(1352.05,607.35);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("rgba(226,134,35,0.2)").s().p("A0CEHIAAoNMAoFAAAIAAINg");
	this.shape_101.setTransform(1356.95,607.35);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("rgba(226,134,35,0.2)").s().p("A0zEHIAAoNMApnAAAIAAINg");
	this.shape_102.setTransform(1361.85,607.35);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("rgba(226,134,35,0.2)").s().p("A1kEHIAAoNMArJAAAIAAINg");
	this.shape_103.setTransform(1366.75,607.35);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("rgba(226,134,35,0.2)").s().p("A2VEHIAAoNMAsrAAAIAAINg");
	this.shape_104.setTransform(1371.65,607.35);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("rgba(226,134,35,0.2)").s().p("A3GEHIAAoNMAuNAAAIAAINg");
	this.shape_105.setTransform(1376.55,607.35);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("rgba(226,134,35,0.2)").s().p("A33EHIAAoNMAvvAAAIAAINg");
	this.shape_106.setTransform(1381.45,607.35);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("rgba(226,134,35,0.2)").s().p("AibEHIAAoNIE3AAIAAINg");
	this.shape_107.setTransform(1556.4,607.35);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("rgba(226,134,35,0.2)").s().p("AjLEHIAAoNIGXAAIAAINg");
	this.shape_108.setTransform(1561.225,607.35);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("rgba(226,134,35,0.2)").s().p("Aj8EHIAAoNIH5AAIAAINg");
	this.shape_109.setTransform(1566.075,607.35);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("rgba(226,134,35,0.2)").s().p("AksEHIAAoNIJZAAIAAINg");
	this.shape_110.setTransform(1570.9,607.35);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("rgba(226,134,35,0.2)").s().p("AmNEHIAAoNIMaAAIAAINg");
	this.shape_111.setTransform(1580.55,607.35);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("rgba(226,134,35,0.2)").s().p("Am9EHIAAoNIN7AAIAAINg");
	this.shape_112.setTransform(1585.375,607.35);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("rgba(226,134,35,0.2)").s().p("AntEHIAAoNIPbAAIAAINg");
	this.shape_113.setTransform(1590.225,607.35);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("rgba(226,134,35,0.2)").s().p("AoeEHIAAoNIQ9AAIAAINg");
	this.shape_114.setTransform(1595.05,607.35);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("rgba(226,134,35,0.2)").s().p("ApOEHIAAoNISdAAIAAINg");
	this.shape_115.setTransform(1599.875,607.35);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("rgba(226,134,35,0.2)").s().p("Ap+EHIAAoNIT9AAIAAINg");
	this.shape_116.setTransform(1604.7,607.35);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("rgba(226,134,35,0.2)").s().p("AquEHIAAoNIVdAAIAAINg");
	this.shape_117.setTransform(1609.525,607.35);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("rgba(226,134,35,0.2)").s().p("ArfEHIAAoNIW/AAIAAINg");
	this.shape_118.setTransform(1614.375,607.35);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("rgba(226,134,35,0.2)").s().p("AsPEHIAAoNIYfAAIAAINg");
	this.shape_119.setTransform(1619.2,607.35);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("rgba(226,134,35,0.2)").s().p("As/EHIAAoNIZ/AAIAAINg");
	this.shape_120.setTransform(1624.05,607.35);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("rgba(226,134,35,0.2)").s().p("AtvEHIAAoNIbfAAIAAINg");
	this.shape_121.setTransform(1628.875,607.35);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("rgba(226,134,35,0.2)").s().p("AvQEHIAAoNIehAAIAAINg");
	this.shape_122.setTransform(1638.55,607.35);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("rgba(226,134,35,0.2)").s().p("AwAEHIAAoNMAgBAAAIAAINg");
	this.shape_123.setTransform(1643.375,607.35);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("rgba(226,134,35,0.2)").s().p("AwxEHIAAoNMAhiAAAIAAINg");
	this.shape_124.setTransform(1648.2,607.35);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("rgba(226,134,35,0.2)").s().p("AxhEHIAAoNMAjDAAAIAAINg");
	this.shape_125.setTransform(1653.025,607.35);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("rgba(226,134,35,0.2)").s().p("AyREHIAAoNMAkjAAAIAAINg");
	this.shape_126.setTransform(1657.875,607.35);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("rgba(226,134,35,0.2)").s().p("AzCEHIAAoNMAmEAAAIAAINg");
	this.shape_127.setTransform(1662.7,607.35);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("rgba(226,134,35,0.2)").s().p("AzyEHIAAoNMAnlAAAIAAINg");
	this.shape_128.setTransform(1667.525,607.35);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("rgba(226,134,35,0.2)").s().p("A0iEHIAAoNMApFAAAIAAINg");
	this.shape_129.setTransform(1672.35,607.35);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("rgba(226,134,35,0.2)").s().p("A1SEHIAAoNMAqlAAAIAAINg");
	this.shape_130.setTransform(1677.175,607.35);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("rgba(226,134,35,0.2)").s().p("A2DEHIAAoNMAsHAAAIAAINg");
	this.shape_131.setTransform(1682.025,607.35);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("rgba(226,134,35,0.2)").s().p("A2zEHIAAoNMAtnAAAIAAINg");
	this.shape_132.setTransform(1686.85,607.35);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("rgba(226,134,35,0.2)").s().p("A3jEHIAAoNMAvHAAAIAAINg");
	this.shape_133.setTransform(1691.675,607.35);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("rgba(255,153,0,0.2)").s().p("Ai+EHIAAoNIF9AAIAAINg");
	this.shape_134.setTransform(552.95,607.35);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("rgba(255,153,0,0.2)").s().p("AjzEHIAAoNIHnAAIAAINg");
	this.shape_135.setTransform(558.25,607.35);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("rgba(255,153,0,0.2)").s().p("AkoEHIAAoNIJRAAIAAINg");
	this.shape_136.setTransform(563.575,607.35);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("rgba(255,153,0,0.2)").s().p("AldEHIAAoNIK8AAIAAINg");
	this.shape_137.setTransform(568.9,607.35);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("rgba(255,153,0,0.2)").s().p("AmSEHIAAoNIMlAAIAAINg");
	this.shape_138.setTransform(574.2,607.35);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("rgba(255,153,0,0.2)").s().p("AnIEHIAAoNIORAAIAAINg");
	this.shape_139.setTransform(579.525,607.35);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("rgba(255,153,0,0.2)").s().p("An9EHIAAoNIP7AAIAAINg");
	this.shape_140.setTransform(584.85,607.35);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("rgba(255,153,0,0.2)").s().p("AoyEHIAAoNIRlAAIAAINg");
	this.shape_141.setTransform(590.175,607.35);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("rgba(255,153,0,0.2)").s().p("ApnEHIAAoNITPAAIAAINg");
	this.shape_142.setTransform(595.475,607.35);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("rgba(255,153,0,0.2)").s().p("AqcEHIAAoNIU5AAIAAINg");
	this.shape_143.setTransform(600.8,607.35);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("rgba(255,153,0,0.2)").s().p("ArSEHIAAoNIWlAAIAAINg");
	this.shape_144.setTransform(606.125,607.35);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("rgba(255,153,0,0.2)").s().p("AsHEHIAAoNIYPAAIAAINg");
	this.shape_145.setTransform(611.425,607.35);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("rgba(255,153,0,0.2)").s().p("As8EHIAAoNIZ5AAIAAINg");
	this.shape_146.setTransform(616.75,607.35);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("rgba(255,153,0,0.2)").s().p("AtxEHIAAoNIbjAAIAAINg");
	this.shape_147.setTransform(622.075,607.35);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("rgba(255,153,0,0.2)").s().p("AumEHIAAoNIdNAAIAAINg");
	this.shape_148.setTransform(627.4,607.35);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("rgba(255,153,0,0.2)").s().p("AvbEHIAAoNIe3AAIAAINg");
	this.shape_149.setTransform(632.725,607.35);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("rgba(255,153,0,0.2)").s().p("AwREHIAAoNMAgjAAAIAAINg");
	this.shape_150.setTransform(638.05,607.35);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("rgba(255,153,0,0.2)").s().p("AxGEHIAAoNMAiMAAAIAAINg");
	this.shape_151.setTransform(643.35,607.35);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("rgba(255,153,0,0.2)").s().p("Ax7EHIAAoNMAj3AAAIAAINg");
	this.shape_152.setTransform(648.675,607.35);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("rgba(255,153,0,0.2)").s().p("AywEHIAAoNMAlhAAAIAAINg");
	this.shape_153.setTransform(654,607.35);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("rgba(255,153,0,0.2)").s().p("AzlEHIAAoNMAnLAAAIAAINg");
	this.shape_154.setTransform(659.3,607.35);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("rgba(255,153,0,0.2)").s().p("A0aEHIAAoNMAo1AAAIAAINg");
	this.shape_155.setTransform(664.625,607.35);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("rgba(255,153,0,0.2)").s().p("A1QEHIAAoNMAqhAAAIAAINg");
	this.shape_156.setTransform(669.95,607.35);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("rgba(255,153,0,0.2)").s().p("A2FEHIAAoNMAsLAAAIAAINg");
	this.shape_157.setTransform(675.275,607.35);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("rgba(255,153,0,0.2)").s().p("A26EHIAAoNMAt1AAAIAAINg");
	this.shape_158.setTransform(680.575,607.35);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("rgba(255,153,0,0.2)").s().p("A3vEHIAAoNMAvfAAAIAAINg");
	this.shape_159.setTransform(685.9,607.35);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("rgba(255,153,0,0.2)").s().p("A5ZEHIAAoNMAyzAAAIAAINg");
	this.shape_160.setTransform(696.525,607.35);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("rgba(255,153,0,0.2)").s().p("A6PEHIAAoNMA0eAAAIAAINg");
	this.shape_161.setTransform(701.85,607.35);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("rgba(226,134,35,0.2)").s().p("AhmEHIAAoNIDNAAIAAINg");
	this.shape_162.setTransform(886.325,607.35);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("rgba(226,134,35,0.2)").s().p("AiZEHIAAoNIEzAAIAAINg");
	this.shape_163.setTransform(891.375,607.35);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("rgba(226,134,35,0.2)").s().p("AkwEHIAAoNIJhAAIAAINg");
	this.shape_164.setTransform(906.525,607.35);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("rgba(226,134,35,0.2)").s().p("AljEHIAAoNILHAAIAAINg");
	this.shape_165.setTransform(911.575,607.35);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("rgba(226,134,35,0.2)").s().p("AmVEHIAAoNIMrAAIAAINg");
	this.shape_166.setTransform(916.625,607.35);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("rgba(226,134,35,0.2)").s().p("AnIEHIAAoNIORAAIAAINg");
	this.shape_167.setTransform(921.675,607.35);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("rgba(226,134,35,0.2)").s().p("AotEHIAAoNIRaAAIAAINg");
	this.shape_168.setTransform(931.75,607.35);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("rgba(226,134,35,0.2)").s().p("ApfEHIAAoNIS/AAIAAINg");
	this.shape_169.setTransform(936.8,607.35);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("rgba(226,134,35,0.2)").s().p("AqSEHIAAoNIUlAAIAAINg");
	this.shape_170.setTransform(941.85,607.35);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("rgba(226,134,35,0.2)").s().p("ArEEHIAAoNIWJAAIAAINg");
	this.shape_171.setTransform(946.9,607.35);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("rgba(226,134,35,0.2)").s().p("Ar3EHIAAoNIXuAAIAAINg");
	this.shape_172.setTransform(951.95,607.35);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("rgba(226,134,35,0.2)").s().p("AspEHIAAoNIZTAAIAAINg");
	this.shape_173.setTransform(957,607.35);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("rgba(226,134,35,0.2)").s().p("AtcEHIAAoNIa4AAIAAINg");
	this.shape_174.setTransform(962.05,607.35);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("rgba(226,134,35,0.2)").s().p("AuOEHIAAoNIcdAAIAAINg");
	this.shape_175.setTransform(967.1,607.35);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("rgba(226,134,35,0.2)").s().p("AvBEHIAAoNIeCAAIAAINg");
	this.shape_176.setTransform(972.15,607.35);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("rgba(226,134,35,0.2)").s().p("AvzEHIAAoNIfnAAIAAINg");
	this.shape_177.setTransform(977.2,607.35);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("rgba(226,134,35,0.2)").s().p("AwmEHIAAoNMAhMAAAIAAINg");
	this.shape_178.setTransform(982.25,607.35);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("rgba(226,134,35,0.2)").s().p("AxYEHIAAoNMAixAAAIAAINg");
	this.shape_179.setTransform(987.3,607.35);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("rgba(226,134,35,0.2)").s().p("AyLEHIAAoNMAkXAAAIAAINg");
	this.shape_180.setTransform(992.35,607.35);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("rgba(226,134,35,0.2)").s().p("Ay9EHIAAoNMAl7AAAIAAINg");
	this.shape_181.setTransform(997.4,607.35);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("rgba(226,134,35,0.2)").s().p("AzvEHIAAoNMAnfAAAIAAINg");
	this.shape_182.setTransform(1002.425,607.35);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("rgba(226,134,35,0.2)").s().p("A1UEHIAAoNMAqpAAAIAAINg");
	this.shape_183.setTransform(1012.525,607.35);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("rgba(226,134,35,0.2)").s().p("A2HEHIAAoNMAsPAAAIAAINg");
	this.shape_184.setTransform(1017.575,607.35);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("rgba(226,134,35,0.2)").s().p("A25EHIAAoNMAtzAAAIAAINg");
	this.shape_185.setTransform(1022.625,607.35);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("rgba(226,134,35,0.2)").s().p("A3sEHIAAoNMAvZAAAIAAINg");
	this.shape_186.setTransform(1027.675,607.35);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("rgba(226,134,35,0.2)").s().p("A4eEHIAAoNMAw9AAAIAAINg");
	this.shape_187.setTransform(1032.725,607.35);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("rgba(226,134,35,0.2)").s().p("A5REHIAAoNMAyjAAAIAAINg");
	this.shape_188.setTransform(1037.775,607.35);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("rgba(226,134,35,0.2)").s().p("AmSEHIAAoNIMlAAIAAINg");
	this.shape_189.setTransform(1247.175,607.35);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("rgba(226,134,35,0.2)").s().p("AnDEHIAAoNIOHAAIAAINg");
	this.shape_190.setTransform(1252.075,607.35);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("rgba(226,134,35,0.2)").s().p("An0EHIAAoNIPpAAIAAINg");
	this.shape_191.setTransform(1257,607.35);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("rgba(226,134,35,0.2)").s().p("AolEHIAAoNIRLAAIAAINg");
	this.shape_192.setTransform(1261.9,607.35);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("rgba(226,134,35,0.2)").s().p("ApWEHIAAoNIStAAIAAINg");
	this.shape_193.setTransform(1266.825,607.35);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("rgba(226,134,35,0.2)").s().p("AqHEHIAAoNIUPAAIAAINg");
	this.shape_194.setTransform(1271.75,607.35);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("rgba(226,134,35,0.2)").s().p("Aq4EHIAAoNIVyAAIAAINg");
	this.shape_195.setTransform(1276.65,607.35);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("rgba(226,134,35,0.2)").s().p("ArqEHIAAoNIXVAAIAAINg");
	this.shape_196.setTransform(1281.575,607.35);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("rgba(226,134,35,0.2)").s().p("AsbEHIAAoNIY3AAIAAINg");
	this.shape_197.setTransform(1286.475,607.35);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("rgba(226,134,35,0.2)").s().p("AtMEHIAAoNIaZAAIAAINg");
	this.shape_198.setTransform(1291.4,607.35);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("rgba(226,134,35,0.2)").s().p("At9EHIAAoNIb7AAIAAINg");
	this.shape_199.setTransform(1296.325,607.35);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("rgba(226,134,35,0.2)").s().p("AuuEHIAAoNIddAAIAAINg");
	this.shape_200.setTransform(1301.225,607.35);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("rgba(226,134,35,0.2)").s().p("AvfEHIAAoNIfAAAIAAINg");
	this.shape_201.setTransform(1306.15,607.35);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("rgba(226,134,35,0.2)").s().p("AwQEHIAAoNMAghAAAIAAINg");
	this.shape_202.setTransform(1311.05,607.35);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("rgba(226,134,35,0.2)").s().p("AxCEHIAAoNMAiFAAAIAAINg");
	this.shape_203.setTransform(1315.975,607.35);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("rgba(226,134,35,0.2)").s().p("AykEHIAAoNMAlJAAAIAAINg");
	this.shape_204.setTransform(1325.8,607.35);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("rgba(226,134,35,0.2)").s().p("AzVEHIAAoNMAmrAAAIAAINg");
	this.shape_205.setTransform(1330.725,607.35);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("rgba(226,134,35,0.2)").s().p("A0GEHIAAoNMAoNAAAIAAINg");
	this.shape_206.setTransform(1335.625,607.35);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("rgba(226,134,35,0.2)").s().p("A03EHIAAoNMApvAAAIAAINg");
	this.shape_207.setTransform(1340.55,607.35);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("rgba(226,134,35,0.2)").s().p("A1pEHIAAoNMArTAAAIAAINg");
	this.shape_208.setTransform(1345.475,607.35);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("rgba(226,134,35,0.2)").s().p("A2aEHIAAoNMAs1AAAIAAINg");
	this.shape_209.setTransform(1350.375,607.35);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("rgba(226,134,35,0.2)").s().p("A3LEHIAAoNMAuXAAAIAAINg");
	this.shape_210.setTransform(1355.3,607.35);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("rgba(226,134,35,0.2)").s().p("A38EHIAAoNMAv5AAAIAAINg");
	this.shape_211.setTransform(1360.2,607.35);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("rgba(226,134,35,0.2)").s().p("A4tEHIAAoNMAxbAAAIAAINg");
	this.shape_212.setTransform(1365.125,607.35);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("rgba(226,134,35,0.2)").s().p("AjMEHIAAoNIGZAAIAAINg");
	this.shape_213.setTransform(1549.625,607.35);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("rgba(226,134,35,0.2)").s().p("AldEHIAAoNIK7AAIAAINg");
	this.shape_214.setTransform(1564.15,607.35);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("rgba(226,134,35,0.2)").s().p("AmNEHIAAoNIMbAAIAAINg");
	this.shape_215.setTransform(1569,607.35);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("rgba(226,134,35,0.2)").s().p("Am+EHIAAoNIN9AAIAAINg");
	this.shape_216.setTransform(1573.85,607.35);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("rgba(226,134,35,0.2)").s().p("AnuEHIAAoNIPeAAIAAINg");
	this.shape_217.setTransform(1578.7,607.35);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("rgba(226,134,35,0.2)").s().p("AofEHIAAoNIQ/AAIAAINg");
	this.shape_218.setTransform(1583.55,607.35);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("rgba(226,134,35,0.2)").s().p("ApPEHIAAoNISfAAIAAINg");
	this.shape_219.setTransform(1588.4,607.35);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("rgba(226,134,35,0.2)").s().p("AqAEHIAAoNIUBAAIAAINg");
	this.shape_220.setTransform(1593.25,607.35);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("rgba(226,134,35,0.2)").s().p("AqwEHIAAoNIVhAAIAAINg");
	this.shape_221.setTransform(1598.075,607.35);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("rgba(226,134,35,0.2)").s().p("ArhEHIAAoNIXDAAIAAINg");
	this.shape_222.setTransform(1602.925,607.35);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("rgba(226,134,35,0.2)").s().p("AsREHIAAoNIYjAAIAAINg");
	this.shape_223.setTransform(1607.775,607.35);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("rgba(226,134,35,0.2)").s().p("AtCEHIAAoNIaFAAIAAINg");
	this.shape_224.setTransform(1612.625,607.35);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("rgba(226,134,35,0.2)").s().p("AtyEHIAAoNIblAAIAAINg");
	this.shape_225.setTransform(1617.475,607.35);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("rgba(226,134,35,0.2)").s().p("AujEHIAAoNIdHAAIAAINg");
	this.shape_226.setTransform(1622.325,607.35);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("rgba(226,134,35,0.2)").s().p("AvTEHIAAoNIenAAIAAINg");
	this.shape_227.setTransform(1627.175,607.35);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("rgba(226,134,35,0.2)").s().p("AwDEHIAAoNMAgHAAAIAAINg");
	this.shape_228.setTransform(1632,607.35);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("rgba(226,134,35,0.2)").s().p("Aw0EHIAAoNMAhpAAAIAAINg");
	this.shape_229.setTransform(1636.85,607.35);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("rgba(226,134,35,0.2)").s().p("AxkEHIAAoNMAjKAAAIAAINg");
	this.shape_230.setTransform(1641.7,607.35);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("rgba(226,134,35,0.2)").s().p("AyVEHIAAoNMAkrAAAIAAINg");
	this.shape_231.setTransform(1646.55,607.35);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("rgba(226,134,35,0.2)").s().p("AzFEHIAAoNMAmLAAAIAAINg");
	this.shape_232.setTransform(1651.4,607.35);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("rgba(226,134,35,0.2)").s().p("Az2EHIAAoNMAntAAAIAAINg");
	this.shape_233.setTransform(1656.25,607.35);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("rgba(226,134,35,0.2)").s().p("A0mEHIAAoNMApOAAAIAAINg");
	this.shape_234.setTransform(1661.1,607.35);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("rgba(226,134,35,0.2)").s().p("A1XEHIAAoNMAqvAAAIAAINg");
	this.shape_235.setTransform(1665.95,607.35);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("rgba(226,134,35,0.2)").s().p("A24EHIAAoNMAtxAAAIAAINg");
	this.shape_236.setTransform(1675.625,607.35);

	this.shape_237 = new cjs.Shape();
	this.shape_237.graphics.f("rgba(226,134,35,0.2)").s().p("A3oEHIAAoNMAvRAAAIAAINg");
	this.shape_237.setTransform(1680.475,607.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.shape_19}]},5).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45,p:{x:691.175}}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},2).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53,p:{x:923.025}}]},1).to({state:[{t:this.shape_54,p:{x:928.3}}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56,p:{x:938.85}}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64,p:{x:981.075}}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67,p:{x:996.9}}]},1).to({state:[{t:this.shape_68,p:{x:1002.175}}]},1).to({state:[{t:this.shape_69}]},1).to({state:[{t:this.shape_70}]},1).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76,p:{x:1044.375}}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79,p:{x:1239.375}}]},2).to({state:[{t:this.shape_80,p:{x:1244.275}}]},1).to({state:[{t:this.shape_81,p:{x:1249.175}}]},1).to({state:[{t:this.shape_82,p:{x:1254.075}}]},1).to({state:[{t:this.shape_83,p:{x:1258.975}}]},1).to({state:[{t:this.shape_84,p:{x:1263.875}}]},1).to({state:[{t:this.shape_54,p:{x:1268.775}}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_67,p:{x:1337.375}}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},1).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_79,p:{x:1551.575}}]},2).to({state:[{t:this.shape_107,p:{x:1556.4}}]},1).to({state:[{t:this.shape_108,p:{x:1561.225}}]},1).to({state:[{t:this.shape_109,p:{x:1566.075}}]},1).to({state:[{t:this.shape_110,p:{x:1570.9}}]},1).to({state:[{t:this.shape_53,p:{x:1575.725}}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},1).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_64,p:{x:1633.725}}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129,p:{x:1672.35}}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[{t:this.shape_132}]},1).to({state:[{t:this.shape_133}]},1).to({state:[]},1).to({state:[{t:this.shape_19}]},10).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_45,p:{x:691.225}}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_108,p:{x:896.425}}]},1).to({state:[{t:this.shape_82,p:{x:901.475}}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_56,p:{x:926.7}}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},1).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_182}]},1).to({state:[{t:this.shape_129,p:{x:1007.475}}]},1).to({state:[{t:this.shape_183}]},1).to({state:[{t:this.shape_184,p:{x:1017.575}}]},1).to({state:[{t:this.shape_185}]},1).to({state:[{t:this.shape_186}]},1).to({state:[{t:this.shape_187}]},1).to({state:[{t:this.shape_188}]},1).to({state:[{t:this.shape_79,p:{x:1217.675}}]},1).to({state:[{t:this.shape_80,p:{x:1222.6}}]},1).to({state:[{t:this.shape_81,p:{x:1227.5}}]},1).to({state:[{t:this.shape_82,p:{x:1232.425}}]},1).to({state:[{t:this.shape_83,p:{x:1237.325}}]},1).to({state:[{t:this.shape_84,p:{x:1242.25}}]},1).to({state:[{t:this.shape_189}]},1).to({state:[{t:this.shape_190}]},1).to({state:[{t:this.shape_191}]},1).to({state:[{t:this.shape_192}]},1).to({state:[{t:this.shape_193}]},1).to({state:[{t:this.shape_194}]},1).to({state:[{t:this.shape_195}]},1).to({state:[{t:this.shape_196}]},1).to({state:[{t:this.shape_197}]},1).to({state:[{t:this.shape_198}]},1).to({state:[{t:this.shape_199}]},1).to({state:[{t:this.shape_200}]},1).to({state:[{t:this.shape_201}]},1).to({state:[{t:this.shape_202}]},1).to({state:[{t:this.shape_203}]},1).to({state:[{t:this.shape_68,p:{x:1320.9}}]},1).to({state:[{t:this.shape_204}]},1).to({state:[{t:this.shape_205}]},1).to({state:[{t:this.shape_206}]},1).to({state:[{t:this.shape_207}]},1).to({state:[{t:this.shape_208}]},1).to({state:[{t:this.shape_209}]},1).to({state:[{t:this.shape_210}]},1).to({state:[{t:this.shape_211}]},1).to({state:[{t:this.shape_212}]},1).to({state:[{t:this.shape_79,p:{x:1539.925}}]},1).to({state:[{t:this.shape_107,p:{x:1544.775}}]},1).to({state:[{t:this.shape_213}]},1).to({state:[{t:this.shape_109,p:{x:1554.475}}]},1).to({state:[{t:this.shape_110,p:{x:1559.3}}]},1).to({state:[{t:this.shape_214}]},1).to({state:[{t:this.shape_215}]},1).to({state:[{t:this.shape_216}]},1).to({state:[{t:this.shape_217}]},1).to({state:[{t:this.shape_218}]},1).to({state:[{t:this.shape_219}]},1).to({state:[{t:this.shape_220}]},1).to({state:[{t:this.shape_221}]},1).to({state:[{t:this.shape_222}]},1).to({state:[{t:this.shape_223}]},1).to({state:[{t:this.shape_224}]},1).to({state:[{t:this.shape_225}]},1).to({state:[{t:this.shape_226}]},1).to({state:[{t:this.shape_227}]},1).to({state:[{t:this.shape_228}]},1).to({state:[{t:this.shape_229}]},1).to({state:[{t:this.shape_230}]},1).to({state:[{t:this.shape_231}]},1).to({state:[{t:this.shape_232}]},1).to({state:[{t:this.shape_233}]},1).to({state:[{t:this.shape_234}]},1).to({state:[{t:this.shape_235}]},1).to({state:[{t:this.shape_184,p:{x:1670.775}}]},1).to({state:[{t:this.shape_236}]},1).to({state:[{t:this.shape_237}]},1).to({state:[{t:this.shape_76,p:{x:1685.325}}]},1).wait(2));

	// 内容
	this.shape_238 = new cjs.Shape();
	this.shape_238.graphics.f("#333333").s().p("AhBCdQgfgNgWgXQgYgXgMgfQgNgfgBgkQABgjANgfQAMgfAYgXQAWgXAfgNQAfgNAiAAQAkAAAeANQAeANAXAXQAYAXAMAfQANAfAAAjQAAAkgNAfQgMAfgYAXQgXAXgeANQgfANgjAAQgiAAgfgNgAg8iRQgcAMgVAWQgWAVgLAdQgMAdAAAgQAAAhAMAdQALAdAWAVQAVAWAcAMQAcAMAgAAQAgAAAdgMQAcgMAVgWQAWgVAMgdQAMgcgBgiQABghgMgcQgMgdgWgWQgVgVgcgMQgdgMggAAQggAAgcAMgAgDBbIAAgsIhUAAIAAgYIBbh2IAgAAIAABzIAjAAIAAAbIgjAAIAAAsgAhJAUIBGAAIAAhag");
	this.shape_238.setTransform(1543.35,511.525);

	this.shape_239 = new cjs.Shape();
	this.shape_239.graphics.f("#333333").s().p("AhBCdQgfgNgWgXQgYgXgMgfQgOgfAAgkQAAgjAOgfQAMgfAYgXQAWgXAfgNQAegNAjAAQAkAAAeANQAfANAWAXQAXAXANAfQANAfABAjQgBAkgNAfQgNAfgXAXQgWAXgfANQgeANgkAAQgjAAgegNgAg8iRQgcAMgVAWQgVAVgNAdQgMAdABAgQgBAhAMAdQANAdAVAVQAVAWAcAMQAcAMAgAAQAhAAAcgMQAbgMAWgWQAVgVAMgdQAMgcAAgiQAAghgMgcQgMgdgVgWQgWgVgbgMQgcgMghAAQggAAgcAMgAg0BUQgRgMgCgVQACgGAGgDQAEgCAGAAQAIgBAGAFQAEAEACAMIAFAZIAEABIAFAAQAUAAALgMQAMgLAAgXQAAgUgLgKQgLgKgTAAIgKAAIAAgJIAKAAQARAAAKgKQAKgKAAgVQAAgTgJgLQgIgJgOAAIgFAAIgEAAIgFAXQgCAKgGAEQgFAEgIAAIgJgCIgHgFQABgQAJgKQAJgJAPgFQAOgEAQAAQAgAAAQANQAQAOAAAUQABAPgOAMQgMAMgdAGQAfAFAPALQAOANgBAUQAAAYgTAPQgUAOgkAAQgfAAgRgLg");
	this.shape_239.setTransform(1231.7,511.525);

	this.shape_240 = new cjs.Shape();
	this.shape_240.graphics.f("#333333").s().p("AhBCdQgegNgXgXQgYgXgMgfQgOgfAAgkQAAgjAOgfQAMgfAYgXQAXgXAegNQAfgNAiAAQAjAAAgANQAeANAWAXQAXAXANAfQANAfABAjQgBAkgNAfQgNAfgXAXQgWAXgfANQgfANgjAAQgiAAgfgNgAg8iRQgcAMgVAWQgVAVgNAdQgMAdABAgQgBAhAMAdQANAdAVAVQAVAWAcAMQAcAMAgAAQAhAAAcgMQAbgMAWgWQAVgVAMgdQAMgcAAgiQAAghgMgcQgMgdgVgWQgWgVgbgMQgcgMghAAQggAAgcAMgAhDBbIAAgWIAugxIAVgXQAKgLAEgLQAFgKAAgNQgBgTgIgLQgJgLgPAAIgFAAIgFAAIgFAZQgEAMgFAEQgHAEgGAAQgGAAgFgDQgEgCgDgFQABgPAKgKQAKgKAPgFQAQgFASAAQAYAAANAHQAPAHAGALQAHALgBAOQABAOgJALQgJAMgQAMIgmAeIgkAdIBzAAIAAAgg");
	this.shape_240.setTransform(889.8,511.525);

	this.shape_241 = new cjs.Shape();
	this.shape_241.graphics.f("#333333").s().p("AhCCdQgegNgXgXQgWgXgOgfQgNgfAAgkQAAgjANgfQAOgfAWgXQAXgXAegNQAggNAiAAQAjAAAfANQAeANAXAXQAYAXAMAfQANAfAAAjQAAAkgNAfQgMAfgYAXQgXAXgfANQgdANgkAAQgiAAgggNgAg8iRQgcAMgVAWQgWAVgLAdQgNAdAAAgQAAAhANAdQALAdAWAVQAVAWAcAMQAdAMAfAAQAhAAAbgMQAdgMAVgWQAWgVAMgdQAMgcgBgiQABghgMgcQgMgdgWgWQgVgVgdgMQgbgMghAAQgfAAgdAMgAg6BbIAAgIIAmgCIABgaIAAgaIAAhoIgfADIAAgJIBJgSIAEADIgBAsIAABRIAAAaIAAAaIAmACIAAAIg");
	this.shape_241.setTransform(489.35,511.525);

	this.instance_1 = new lib.yp3201011();
	this.instance_1.setTransform(449,557,1,1.0002);

	this.shape_242 = new cjs.Shape();
	this.shape_242.graphics.f("#333333").s().p("AgVAnQgLgHgGgKQgGgKAAgMQAAgMAGgKQAGgKALgGQAKgGALAAQAMAAALAGQAKAGAGAKQAGAKAAAMQAAAMgGAKQgGAKgKAHQgLAFgMABQgLgBgKgFgAgXgXQgKAJAAAOQAAAOAKAKQAJAJAOABQAPgBAJgJQAKgKAAgOQAAgOgKgJQgJgKgPAAQgOAAgJAKg");
	this.shape_242.setTransform(1828.7,342.45);

	this.shape_243 = new cjs.Shape();
	this.shape_243.graphics.f("#333333").s().p("AiCCOQAmgKAXgMQAYgMAMgOQALgOAEgRIhSAAIgDgJIBXAAIACgPIAAgRIg0AAIgDgKIBhAAIANgPIAFADIAJAHIAKAJQAAABAAABQAAAAAAABQgBAAAAABQgBAAAAAAQgDACgDAAIgwAAIgCARIgCAPIA7AAIAOgSIAFADIAKAJIAMAKQAAABAAAAQgBABAAABQAAAAgBAAQAAABgBAAIgFABIheAAIgCAJIgDAJQArAIAYAKQAZALAKAKQAJAKAAAHQgBAHgGACQgGACgIgFQgNgOgYgPQgXgOgigNQgHANgQALQgPALgXAJQgYAJgkAIgAiVA7QAcgQAUgTQAWgUAPgWIhNAAIgDgJIBWAAIAJgQIAIgQIhJAAIgCgJIBPAAIAGgPIAFgQIhlAAIgDgJIBqAAIAGgTIAEgUIAiAIQgCAEgDACQgDACgFAAIgDALIgDAMIBZAAIAPgTIAFAEIALAJIANAKQgBADgDABIgEABIiAAAIgEAQIgHAPIBXAAIAPgSIAEADIAKAJIANAKIgEAEIgFABIh8AAIgIAQIgKAQICKAAIARgTIAFADIALAKIAMAKQAAABAAAAQgBABAAABQAAAAgBAAQAAABAAAAIgHABIhRAAQAKAOAPALQAPALASAIQARAIARAEIAAAEQgIACgFAEQgFADgCAHQgZgLgVgUQgVgTgOgaIhbAAQgRAYgbAVQgZAVgkAPg");
	this.shape_243.setTransform(1806.95,332.075);

	this.shape_244 = new cjs.Shape();
	this.shape_244.graphics.f("#333333").s().p("AgbCUIAAiuIhfAAIgEgJIDPAAIANgNIAZAUIgGADIgHACQgBAxgDAcQgDAcgJAJQgFAFgIADQgHACgLAAQABgFgBgEQgCgEgDgDIgLgEIgRgEIAAgEIAOAAIAQACIAKAAIAGgBQAAAAABAAQAAAAABAAQAAgBABAAQAAgBABAAQAEgFACgZQACgZABgrIhaAAIAACoQAAABgGADQgEACgJAAgAg8gxIAAgsIhUAAIgDgJIBXAAIAAgtIAgADQAAADgDADQgDACgFABIAAAhIBOAAIAAgtIAgADQAAADgDADQgCACgHABIAAAhIAtAAIAQgVIAEAFIAMAJIAMALQgBADgCABIgGABIhQAAIAAAkQAAACgEADQgFACgIAAIgDAAIAAgrIhOAAIAAAmQgBACgFACQgGACgGAAg");
	this.shape_244.setTransform(1774.8,331.95);

	this.shape_245 = new cjs.Shape();
	this.shape_245.graphics.f("#333333").s().p("ABACJQgCgFgDgCQgEgDgJgDIgTgEIAAgGIARACIARABIALABIAIgBIAFgDQAGgGAEgaQADgZADgpIADhgIhOAAQgKAUgMASQgLARgNANIgFgDQALgQAJgVQAJgVAIgYQAIgYAGgYIAgAJQgBADgCACQgDACgFAAIgIAUIgIAUIBFAAIANgOIAZAVQgBACgEACIgIABQgCBYgFA1QgFA0gLAPQgHAIgJADQgJAEgMAAIgBgJgAiJCJIAAjsIAVAKIALAAIAEgSIAEgUIAEgSIAhAIQgBADgDACQgDACgFAAIgLAUIgMAVIApAAIAMgNIAZAUQgBACgEACIgJADIAADDIgDADQgCACgEABIgIACIgDAAIAAgZIhDAAIAAAaQAAACgEADQgFACgHABgAh2BeIBDAAIAAhVIhDAAgAh2AAIBDAAIAAhPIhDAAgAAqAtQgCgLgGgMQgGgMgIgLIgQgUIADgCQAdAOAMANQANAPABALQABAMgGAFQgCACgDAAQgEAAgGgEg");
	this.shape_245.setTransform(1743.575,332.125);

	this.shape_246 = new cjs.Shape();
	this.shape_246.graphics.f("#333333").s().p("AiTB5IAPgNIAQgNIAPgNIAAhtIgtAAIgCgJIAqAAIAMgQIAcAXIgGADQgDACgHABIAABkIACACIACABQAOAQASAIQARAIAWADQAVADAdgBIAjAAIAgAAIAjgBIAAAEQgHABgEAFQgEAFgBAHIhcAAQgeAAgVgFQgVgDgRgMQgQgKgPgTQgDgEgCABQgDAAgCADIgJAOIgNARIgLARIAAAEIgCADgAgeBoIAAhxIAWAJIAmAAIAAgwIhWAAIgCgKIBYAAIAAgwIgkAFIgmADIgCgGIApgHIAogKIAlgLQASgFAMgGIAZAYQgCABgEAAQgFAAgGgCIgbAGIgfAFIAAAzIA1AAIAQgTIAFADIALAKIAMAKQAAADgDACIgGABIhYAAIAAAwIAmAAIAMgLIAaATIgFAEIgJACIAABRIgDACIgHADIgHACIgEAAIAAgTIhmAAIAAAOQAAACgGACQgFACgGABgAgJBKIBmAAIAAhAIhmAAgAhchFQgDgLgGgMQgHgMgIgMIgPgUIAEgCQAcAOAMAPQANAPABALQACALgGAFQgDABgCAAQgFAAgFgDg");
	this.shape_246.setTransform(1710.975,331.9);

	this.shape_247 = new cjs.Shape();
	this.shape_247.graphics.f("#333333").s().p("AAqCKQgBgDgDgCQgDgDgHgCQgGgCgKgBIAAgEIAFAAIALAAIAMABIAIAAQAEAAACgBQAAgBABAAQAAgBAAAAQAAgBAAAAQAAgBAAgBIAAiPIg/AAIgDgJIB/AAIANgOIAYAXQgBACgEABIgHABIgOAOIgQAPIgQAOIgEgCIAIgOIAJgPIAHgQIgnAAIAACQQAAAIgCAGQgDAGgGAEQgHAEgOABQAAgEgCgEgAh+CSIAAh1IAVAKIAVAAIAAgrIg6AAIgCgJIA8AAIAAgnIgkAAIgBgDQgNANgOAJIgEgDQAOgOAOgTQANgTAKgUQALgUAGgRIAhAKQgBACgDACQgDABgGAAQAYAJANAKQANAKADAIQAEAJgCAGQgDAFgFACQgFACgGgFQgEgLgKgOQgKgOgOgNQgIAPgNARQgNARgPAQIBAAAIANgQIAEADIAKAIIAKAJQAAABAAAAQgBABAAAAQAAABgBAAQAAABgBAAQgCABgDAAIgqAAIAAAnIAZAAIANgRIAFADIAJAJIALAJIgDAEIgFABIg3AAIAAArIAVAAIALgMIAZATIgFADIgIADIAABUIgDADIgHACIgHACIgCAAIAAgVIhDAAIAAARQgBACgFACQgFADgGAAgAhqBxIBDAAIAAhBIhDAAgABHgpQgEgIgHgKQgIgJgKgJIgSgPIADgDQAPAEALAFQALAFAHAFIASgUIAQgWIhqAAIgDgKIBvAAIANgNIAYAXQgBACgDAAIgIABIgQAPIgUAPIgUAOQAKAKABAIQACAJgFADQgCACgEAAQgDAAgEgCg");
	this.shape_247.setTransform(1678.775,332.125);

	this.shape_248 = new cjs.Shape();
	this.shape_248.graphics.f("#333333").s().p("AA3CKQgBgEgDgCQgDgDgHgBIgRgEIAAgFIAFABIAMAAIANABIAIABQAFAAABgCQACgBAAgEIAAhDIh+AAIgCgJICAAAIAAglIhuAAIgDgIICKAAIAPgTIAFAEIALAJIALAKQAAABAAAAQAAABgBAAQAAAAgBAAQAAABgBAAQgCABgDAAIgmAAIAAAlIASAAIAPgTIAFAEIAKAJIALAKIgDAEIgFABIgzAAIAABEQAAAIgCAHQgDAGgHAEQgHAEgPACIgCgJgAhoCSIAAiWIgUATIgWASIgDgEQAPgQAOgTQAPgUALgUQAMgUAHgQIAfAPQgBADgDAAQgDABgGgBIgMASIgOATIAJAEQgBAEgIACIAACcQgBABgFADQgEADgGAAgAAHBlQgCgHgFgIIgLgQIgNgMIADgDQAYAHALAJQALAJABAJQABAJgGAEQgCACgEAAQgDAAgFgDgAgYgWIAAh4IAYAKIBYAAIAKgMIAXASIgEADQgDABgFABIAABaQAAABgFACQgFACgHAAIgDAAIAAgKIhdAAIAAAIQAAABgEACQgFACgHABgAgEguIBdAAIAAghIhdAAgAgEhZIBdAAIAAgiIhdAAgAiVg7QAOgMANgQQANgPALgPQAMgQAHgNIAdAQQgBACgDABQgDABgFgBIgWAYQgOANgPAMQgQANgQAKg");
	this.shape_248.setTransform(1646.875,332.175);

	this.shape_249 = new cjs.Shape();
	this.shape_249.graphics.f("#333333").s().p("AiPCQQAlgLAYgNQAYgMAOgOQANgOAHgQQAGgPACgRQABgRAAgSIAfADQgBADgCACQgDACgFAAIgDAiQgCAQgGAQQgIAPgPAOQgPANgbAMQgbAMgpAKgAAmCLQgNAAgHgCQgHgBgCgFQgDgEAAgIIAAhOIAdADQAAADgCACQgDACgEABIAAA/QAAAEACABQADABAJAAIAlAAIAVAAIANgBIAEgBIACgDQACgFACgMIAGgbIAEAAIABAtIAHAEQACACAAADQAAAFgFADQgFADgOABQgOABgbAAgAhWBTIAAh7IAYAKIB+AAIAKgMIAXASIgEADIgIACIAABdQAAABgFADQgFACgHAAIgDAAIAAhkIiDAAIAABhQAAABgEADQgFACgIAAgAiRgcQgCgFACgFQADgEAFgDQAJgGAGgNQAGgNgCgPIAGAAIADAJIABAIICaAAIAOgYIAMgaIAJgXIAgARQgBACgDACIgIAAIgUAZQgLAOgOANIAzAAIAOgOIAaAZQgBAAAAAAQAAABgBAAQgBAAAAAAQgBABgBAAIgHABQgGAIgIAKIgQASIgFgCIAFgSIAEgUIjYAAQABAOgFAKQgFAKgGAFQgGAEgHAAQgHAAgDgGgAhOhVQgCgJgFgKQgEgJgHgJIgMgRIAEgCQAYAKAKAMQALAMAAAKQABAJgGAEQgCACgDAAQgEAAgFgDgAgGhYQgBgJgEgLQgEgLgFgJIgMgSIAEgCQAYAMAIANQAKANgBALQAAAKgGAEIgFABQgDAAgFgEg");
	this.shape_249.setTransform(1614.9625,332.275);

	this.shape_250 = new cjs.Shape();
	this.shape_250.graphics.f("#333333").s().p("AgLCTIAAh6QgYAhgiAbQgiAbgqATIgDgFQAagPAXgTQAWgTATgWQATgVANgXIh0AAIgCgIICFAAIAAhUIhzAAIgDgJIB2AAIAAg0IAgAEQgBAEgCACQgCACgGABIAAAnIBLAAIAQgUIAFAEIAMAJIANALQgBACgCACIgGABIhwAAIAABUIBYAAIARgUIAFAEIAMAJIANAKQAAABgBAAQAAABAAAAQgBABAAAAQgBABAAAAQgCABgEAAIh5AAQAPAXAVATQAWATAZAPQAZAPAaAIIgBADQgHABgFAFQgFAFgCAHQgZgLgWgRQgWgRgTgWQgSgWgNgbIAAB/QgBADgFADQgEACgHABgAAigLQAIgMAKgSQAJgSAIgTIAfANQgBADgDABQgDACgFgBQgLAPgNAOQgNAOgNAKgAhBgOQgBgLgEgLQgEgLgGgLQgGgLgHgIIAEgCQAYANAKAPQALANAAALQAAALgHAEQgCACgDAAQgEAAgFgEg");
	this.shape_250.setTransform(1582.875,332.125);

	this.shape_251 = new cjs.Shape();
	this.shape_251.graphics.f("#333333").s().p("AiWCPQALgTAGgZQAHgZADgbQADgbAAgXIAfAFQgBADgDACQgCACgGAAIgDAYIgEAZQAHANAIAKQAIAKAKAIIAAh7IAeAEQgBADgCACQgCACgFABIAAAiIATAAIAOgTIAFAFIAKAIIAKAKIgDAEIgEABIgzAAIAABNQAQAGAVACQAVACAaAAIAbAAIAhAAIAigBIAcAAIAAAFQgHABgDAEQgEAEAAAHIhtAAQgkAAgagFQgagGgTgPQgSgPgNgdQgFAVgJAVQgJAUgNAQgAArBXQgNAAgHgCQgHgCgCgFQgDgFAAgIIAAh5IAYAKIBBAAIAAhGIheAAIgDgJIBeAAIAMgMIAaATIgGADIgJAEIAABXQAAAAAAABQAAAAgBAAQAAAAAAABQgBAAgBABIgGADIgIAAIgDAAIAAgTIhFAAIAABjQAAADADACQACACAKAAIAkAAIAVAAIAMgBIAEgBIADgDQACgEACgMIAGgYIAEAAIAAApQAGACACACQAAAAABABQAAABAAAAQABABAAAAQAAABAAAAQAAAGgFACQgFADgOACQgOABgbAAgAiPghIgCgKIBAAAIAAgtIg0AAIgDgKIA3AAIAAgvIAgADQgBADgDADQgCABgGABIAAAkIAWAAIAPgRIAEAEIAKAIIAKAKQAAAAAAABQAAABAAAAQAAABgBAAQAAAAgBABQgCABgDAAIg2AAIAAAtIAaAAIAOgSIAFAEIAKAJIALAKQgBAAAAABQAAABgBAAQAAAAAAABQgBAAAAAAQgCACgDAAg");
	this.shape_251.setTransform(1550.875,332.15);

	this.shape_252 = new cjs.Shape();
	this.shape_252.graphics.f("#333333").s().p("AA+CSIAAisIg+AAIAAAFQAAAVgCAXQgDAXgIAWQgIAWgQATQgPAUgbAPIgEgDQAagXAOgZQANgaAFgdQAFgcAAgfIAAhkIAVAKIAlgKQATgGAQgGQAQgGAKgGIAaAWQgCACgFAAQgDAAgGgCQgOAEgSAEIgmAHQgTADgUABIAABFIBlAAIAPgTIAEAEIALAJIAMAKIgEAEIgFABIgzAAIAACmQAAABgEACQgFADgJAAgAiOBUIAAjKIAWAKIArAAIALgNIAaAUIgFADIgIADIAACZIgEADIgGADIgIABIgCAAIAAgdIgxAAIAAApQAAACgEADQgFACgHAAgAh6AbIAxAAIAAh+IgxAAg");
	this.shape_252.setTransform(1519.6,332.125);

	this.shape_253 = new cjs.Shape();
	this.shape_253.graphics.f("#333333").s().p("ABiCHQgBgEgEgCQgDgEgGgCIgRgDIAAgFIAFAAIAMABIANABIAJABQAEAAABgCQACgCAAgDIAAj+IAgAEQgBADgCACQgDADgGABIAADzQAAAJgCAGQgCAGgHAFQgHAEgPABIgCgJgAiQBuIAggGIAtgHIAAg/IhBAAIgCgJIBDAAIAAgtIAgADQAAAEgDACQgDACgFABIAAAhIAhAAIANgTIAFAEIALAJIALAKQAAADgDABQgCACgDgBIhBAAIAAA7IAogHIArgJIABAGIhEAVIhdAbIgDAEQgCACgDABgAA1BMIAAjCIAfAEQAAADgDACQgCADgGAAIAACuQAAADgFACQgFACgGABgAiFgmIADgBIAFgBQAKgIALgMQALgNAJgOIAOgYIhFAAIgCgJICJAAIAOgTIAFAEIALAJIALAKQAAABAAAAQAAABgBAAQAAABgBAAQAAABgBAAQgCABgDAAIhhAAIAdANQgBACgDACIgIABIgRASIgWAVIgWASIAegCIAmgDIArgEQgHgLgIgKQgIgKgJgIIAEgCQAcAMAMAPQANAOACAMQABALgFAFQgGAFgIgGIgCgKIgFgLIgyALIhAAMIgDAEIgEADg");
	this.shape_253.setTransform(1486.675,332.45);

	this.shape_254 = new cjs.Shape();
	this.shape_254.graphics.f("#333333").s().p("ACICSQgHAAgIgEQgIgEgHgGQgQgMgMgQQgMgPgJgSQgWAVgbARQgaARgeANIgDgFQAdgQAZgUQAZgTAWgZQgJgVgGgYQgGgXgDgbIhHAJIgEgJIBKgJQgDgWgBgYQgBgXAAgZIAiAEQAAAEgDACQgCACgGABQgBAUABAUQABATACATIA9gIIAMgUIAFAEIALAHIANAJIgCAEIgGACIhdAMQACAVAFAUQAEATAHASQALgPAKgRQAKgQAIgTIAdANQgBADgDAAQgDABgGgBQgKAUgMARQgMASgNAPQAIARALAOQALAOAOALQADADACAAQACAAACgFIAIgQIAHgUIAEABIgGAwQAHAJACAFQABAFgCACQgDAEgGAAIgCAAgAhsCKQgCgFgDgCQgDgDgGgCIgPgDIAAgFIAEABIALAAIAMABIAHAAQAFAAABgBQACgCAAgDIAAhbIgQAIIgRAHIgDAFIgEADIgMgbIAVgFIAfgIIAAhJIgwAAIgDgKIAzAAIAAhEIAgADQgBAEgDACQgCACgGABIAAA4IAMAAIANgSIAEAEIAKAJIAKAKQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAABIgGABIgpAAIAABDIAXgGIAYgHIACAEIgWAKIgbANIAABmQAAAIgCAHQgCAGgHAEQgHAEgNABIgCgIgABrhYQgDgHgHgHQgGgIgIgGQgIgHgIgFIADgDQAaAEANAIQAMAIADAJQACAJgFAFQgCACgEAAQgEAAgEgCg");
	this.shape_254.setTransform(1454.8667,332.1333);

	this.shape_255 = new cjs.Shape();
	this.shape_255.graphics.f("#333333").s().p("AgRCTIAAh7IhdAAIAAAXQAAACgFACQgGADgHAAIgDAAIAAiPIAXALIBbAAIAAhEIAgAEQAAAEgDACQgDACgGABIAAA3IBaAAIAMgOIAbAVQgCACgDABIgIADIAABtIgEADIgHACIgHACIgEAAIAAgbIheAAIAAByQAAADgEACQgGADgGABgAADAPIBeAAIAAhUIheAAgAhuAPIBdAAIAAhUIhdAAg");
	this.shape_255.setTransform(1423.45,332.125);

	this.shape_256 = new cjs.Shape();
	this.shape_256.graphics.f("#333333").s().p("AhcCSIAAiJQgLAWgNAVQgNATgRARIgFgFQATgZANggQAMgeAIgiIgrAAIgCgJIA0AAIAAg9IgaAHIgaAEIgBgFIAjgNIAigPQAPgIALgHIAaAVQgCACgEAAQgEAAgGgCIgPAGIgSAFIAABCIALAAIAOgSIAEADIALAIIALAKQgBABAAABQAAAAAAABQgBAAAAABQgBAAAAABQgCABgDAAIgrAAIAAAUQAYAMAJALQAKALAAAKQAAAJgFADQgFADgHgGQgDgLgHgMQgHgMgJgJIAACVQAAABgEADQgFACgIAAgAgqB/IgDgJIBXAAIAAg3Ig9AAIgCgJIA/AAIAAgzIhFAAIgDgIICFAAIAOgSIAFAEIAKAJIALAKQAAAAAAAAQgBAAAAABQAAAAgBABQAAAAAAAAIgHABIhJAAIAAAzIAgAAIAPgTIAFAEIAKAJIALAKQAAABAAAAQgBABAAAAQAAABgBAAQAAABAAAAIgGABIhBAAIAAA3IAyAAIAOgTIAFAEIAKAIIALALQAAABAAAAQAAABgBAAQAAABgBAAQAAAAAAAAQgDACgEAAgAgLgYIAAhuIAUAJIBYAAIAMgMIAZATIgFADIgIAEIAABIIgDADIgGACIgIABIgDAAIAAgMIheAAIAAAOQAAACgFACQgEADgHAAgAAHg2IBeAAIAAg+IheAAg");
	this.shape_256.setTransform(1390.85,332.15);

	this.shape_257 = new cjs.Shape();
	this.shape_257.graphics.f("#333333").s().p("AiUB4IARgNIATgPIAQgMIAAhtIgwAAIgCgJIAtAAIANgQIAbAWQgBACgEACIgKACIAABmIABABIACABQAOAQARAJQARAIAXADQAVADAdAAIAiAAIAgAAIAjgBIAAAEQgHABgEAFQgEAFgBAHIhcAAQgdAAgVgFQgVgEgRgLQgRgLgOgTQgDgEgDAAQgCAAgDAEIgLANIgOASIgOASIABAEQAAAAgBABQAAAAAAABQAAAAgBAAQAAABgBAAgAAwBeQgBgDgEgDQgEgCgIgDIgVgDIAAgGIAHABIAPABIAQABIAKABQAFAAACgCQACgCAAgEIAAiHIh2AAIgCgJIB4AAIAAhFIAgAEQAAADgDACQgDACgGABIAAA5IAWAAIAOgWIAFAFIAKAKIAKALQAAACgDACIgFABIg1AAIAACJQABAJgDAGQgCAGgIAEQgIAFgQABIgDgJgAAEAgIgGgWQgEgLgHgMQgHgMgJgKIADgDQAZAOALAPQALAOABAMQABAMgGAEQgCACgDAAQgEAAgEgDgAhYhIQgDgKgGgMIgPgXIgQgVIAEgCQAbAOANAPQAMAOACALQACALgGAEQgCACgDAAQgEAAgFgDg");
	this.shape_257.setTransform(1358.725,332.125);

	this.shape_258 = new cjs.Shape();
	this.shape_258.graphics.f("#333333").s().p("ABACJQgCgFgDgCQgEgDgJgDIgTgEIAAgGIARACIARABIALABIAIgBIAFgDQAGgGAEgaQADgZADgpIADhgIhOAAQgKAUgMASQgLARgNANIgFgDQALgQAJgVQAJgVAIgYQAIgYAGgYIAgAJQgBADgCACQgDACgFAAIgIAUIgIAUIBFAAIANgOIAZAVQgBACgEACIgIABQgCBYgFA1QgFA0gLAPQgHAIgJADQgJAEgMAAIgBgJgAiJCJIAAjsIAVAKIALAAIAEgSIAEgUIAEgSIAhAIQgBADgDACQgDACgFAAIgLAUIgMAVIApAAIAMgNIAZAUQgBACgEACIgJADIAADDIgDADQgCACgEABIgIACIgDAAIAAgZIhDAAIAAAaQAAACgEADQgFACgHABgAh2BeIBDAAIAAhVIhDAAgAh2AAIBDAAIAAhPIhDAAgAAqAtQgCgLgGgMQgGgMgIgLIgQgUIADgCQAdAOAMANQANAPABALQABAMgGAFQgCACgDAAQgEAAgGgEg");
	this.shape_258.setTransform(1327.575,332.125);

	this.shape_259 = new cjs.Shape();
	this.shape_259.graphics.f("#333333").s().p("AhGCOQAngMAZgVQAYgUANgdIhcAAIgDgJIBiAAQAGgTADgVQADgWAAgaIAjAGQgBADgCACQgDABgGAAQgBAWgEASQgDAUgGAQIAyAAIAPgTIAEAEIALAJIAMAKQAAADgDABIgFABIhYAAQgOAggdAVQgcAVgwANgACACPQgGgLgNgMQgMgMgPgMQgOgKgNgJIADgDQAlALAUAOQAUANAGAMQAFAMgEAFQgCAEgEAAIgIgCgAh0BtQAHgEACgDQACgCAAgFIAAiSIgnAAIgCgJIAqAAIAKgLIAVASIgEADIgIACIAACOIAUgKIAVgMIACAEIgVATIgfAcQgBAEgCADIgFAFgAgHAqQgCgGgGgGQgFgHgHgFIgNgLIACgDQAXAEALAHQAKAIABAIQACAHgEAEQgDACgCAAIgHgCgAAJABQgDgFgFgGIgLgMIgOgKIADgCQAWACAKAIQALAGABAIQACAHgEADQgCACgEAAIgGgBgABigFIAHgTIAFgUIioAAIgDgKIBZAAIAAgkIhIAAIgCgKIBKAAIAAguIAgADQgBADgCADQgDACgGABIAAAiIApAAIAPgSIAFAEIALAJIALAKQAAAAAAABQAAAAgBABQAAAAgBABQAAAAgBAAQgCACgDAAIhLAAIAAAkIA9AAIANgNIAYAXIgFADIgHAAQgGAJgIAKQgJALgJAIgAhXhdQgDgIgGgJQgGgJgHgJIgNgPIADgCQAZAJAMALQALALABAJQACAJgGAEQgCACgDAAQgEAAgEgDg");
	this.shape_259.setTransform(1294.775,332.2);

	this.shape_260 = new cjs.Shape();
	this.shape_260.graphics.f("#333333").s().p("AgoCPQAYgTANgYQALgYAFgcQAEgbAAgeIAAh3IAXALIA+AAIALgNIAaATQgBADgEABIgIADIAADcQAAAIgCAHQgCAGgHAEQgIAEgOABIgCgIQgCgEgDgDQgEgCgGgCIgSgEIAAgFIAFABIAMAAIAOABIAJABQAEAAACgCQACgCgBgEIAAhQIhHAAQgCAWgHAVQgIAUgOATQgOASgYAPgAAkgKIAAAQIgBARIBGAAIAAg9IhFAAgAAkgvIBFAAIAAg9IhFAAgAiKBxQAGgDACgDQACgDAAgEIAAjQIAYAMIBCAAIALgNIAaAUQgCACgEABQgDACgFABIAABqIgDACIgHACIgHACIgDAAIAAgPIhJAAIAABYIAfgNIAigQQgGgKgIgKQgIgJgIgIIADgCQAcANANAOQANAOACAMQACALgFAFQgFAEgIgGIgEgLIgFgLIglAXIgtAbIgDAEIgEACgAhsAFIBJAAIAAgpIhJAAgAhsgtIBJAAIAAgqIhJAAgAhHhmQgBgLgIgMQgHgMgIgIIADgCQAWAHAJAKQAJAKAAAIQAAAJgFADIgFABQgEAAgFgDg");
	this.shape_260.setTransform(1263.275,332.075);

	this.shape_261 = new cjs.Shape();
	this.shape_261.graphics.f("#333333").s().p("AiMCNQAlgFAggLQAhgJAbgOQgOgIgLgNQgMgLgIgOQgNAOgRALQgQAMgTAIIgDgDQARgMAOgPQAPgOALgQQAMgRAHgPIgPAAIAAAGQAAABgFADQgGACgHAAIgDAAIAAhnIAXAKIB6AAIALgLIAYASIgEACIgHACIAABJIgDADIgHADIgIABIgDAAIAAgKIhwAAIAdANQgBACgDACQgDAAgFAAIgFAHIgGAHIBjAAIAQgNIAWAVQgCADgDABIgJAAQgMAPgOANQgPAMgRAKQAaAJAeAFQAfAFAhACIAAADQgHACgFAFQgFAFgBAIQgkgEgfgIQgegJgZgNQgcANgkAKQgkAIgpADgAgzAzQAKAOAOAKQAOALAQAIQAQgKANgLQANgLAKgNIhoAAgAg/AAIB/AAIAAgaIh/AAgAg/gkIB/AAIAAgbIh/AAgAiOgnQAUgSASgbQATgcAMghIAgANQgCADgDACQgDABgFgBIgFAKIgGAJICTAAIAPgTIAFADIALAJIAMALQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQgCABgEAAIi8AAQgOAVgSAPQgRARgSALg");
	this.shape_261.setTransform(1230.925,332.15);

	this.shape_262 = new cjs.Shape();
	this.shape_262.graphics.f("#333333").s().p("AiVCPQAVgcAKgfQALgeADggQADgfAAgfIAAhNIASAHIA9gIQAggFAigHQAigHAhgIIATAYIgFACIgGgDQggAGgjAEIhFAHQgiACgdAAIAAA6ICbAAIAPgOIAZAXQgCADgDABIgJABQgMAegRAZQgSAbgYAWQAYASAeANQAeAMAkAHIgBAEQgIABgFAEQgGAFgDAIQgigJgcgPQgdgOgVgVQgYATggAQQgfAPgoAJIgCgFQAjgMAegQQAdgRAXgVQgSgVgOgcQgOgagIgiIgdAAQAAAVgCAWQgCAYgHAYQgGAYgNAXQgNAXgVAUgAgTASQAPAZATASQAVgVAPgYQAPgYAJgbIh3AAQAJAeAQAXg");
	this.shape_262.setTransform(1199.025,332.275);

	this.shape_263 = new cjs.Shape();
	this.shape_263.graphics.f("#333333").s().p("AhXCTIAAiLQgMAMgOALQgOALgQAJIgEgEQAggYAYgeQAYggAQgjIhTAAIgDgKIBaAAIANgfQAFgQAEgPIAiAKQgBADgDACQgDABgFAAIgJAXIgKAXIB3AAIAQgTIAFADIAMAKIAMALQAAAAAAABQgBABAAAAQAAABgBAAQAAAAAAAAQgCACgEAAIihAAQgIAQgKAPQgKAPgMAPIAKADQgCAFgHABIAACQQgBACgFACQgGACgGABgAg3CCIgCgKIBTAAIAAhhIg/AAIgCgKIBBAAIAAhIIAgADQgBADgCACQgCACgFABIAAA9IAkAAIAOgRIAFADIAKAIIAMAKQAAABAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgDABgDABIhFAAIAABhIA4AAIAPgTIAEAEIAMAJIANAKIgEAFIgFABg");
	this.shape_263.setTransform(1166.75,332.1);

	this.shape_264 = new cjs.Shape();
	this.shape_264.graphics.f("#333333").s().p("AgXAqQASgKAGgNQAHgMAAgKIgMgFQgGgDgEgFQgFgFAAgJQAAgHAFgGQAFgGAKAAQALAAAGAJQAGAIAAANQAAAMgDAMQgEANgLAMQgIAMgRAIg");
	this.shape_264.setTransform(1123.75,345.525);

	this.shape_265 = new cjs.Shape();
	this.shape_265.graphics.f("#333333").s().p("AhGCOQAngMAZgVQAYgUANgdIhcAAIgDgJIBiAAQAGgTADgVQADgWAAgaIAjAGQgBADgCACQgDABgGAAQgBAWgEASQgDAUgGAQIAyAAIAPgTIAEAEIALAJIAMAKQAAADgDABIgFABIhYAAQgOAggdAVQgcAVgwANgACACPQgGgLgNgMQgMgMgPgMQgOgKgNgJIADgDQAlALAUAOQAUANAGAMQAFAMgEAFQgCAEgEAAIgIgCgAh0BtQAHgEACgDQACgCAAgFIAAiSIgnAAIgCgJIAqAAIAKgLIAVASIgEADIgIACIAACOIAUgKIAVgMIACAEIgVATIgfAcQgBAEgCADIgFAFgAgHAqQgCgGgGgGQgFgHgHgFIgNgLIACgDQAXAEALAHQAKAIABAIQACAHgEAEQgDACgCAAIgHgCgAAJABQgDgFgFgGIgLgMIgOgKIADgCQAWACAKAIQALAGABAIQACAHgEADQgCACgEAAIgGgBgABigFIAHgTIAFgUIioAAIgDgKIBZAAIAAgkIhIAAIgCgKIBKAAIAAguIAgADQgBADgCADQgDACgGABIAAAiIApAAIAPgSIAFAEIALAJIALAKQAAACgDABQgCACgDAAIhLAAIAAAkIA9AAIANgNIAYAXIgFADIgHAAQgGAJgIAKQgJALgJAIgAhXhdQgDgIgGgJQgGgJgHgJIgNgPIADgCQAZAJAMALQALALABAJQACAJgGAEQgCACgDAAQgEAAgEgDg");
	this.shape_265.setTransform(1102.775,332.2);

	this.shape_266 = new cjs.Shape();
	this.shape_266.graphics.f("#333333").s().p("AgoCPQAYgTANgYQALgYAFgcQAEgbAAgeIAAh3IAXALIA+AAIALgNIAaATQgBADgEABIgIADIAADcQAAAIgCAHQgCAGgHAEQgIAEgOABIgCgIQgCgEgDgDQgEgCgGgCIgSgEIAAgFIAFABIAMAAIAOABIAJABQAEAAACgCQACgCgBgEIAAhQIhHAAQgCAWgHAVQgIAUgOATQgOASgYAPgAAkgKIAAAQIgBARIBGAAIAAg9IhFAAgAAkgvIBFAAIAAg9IhFAAgAiKBxQAGgDACgDQACgDAAgEIAAjQIAYAMIBCAAIALgNIAaAUQgCACgEABQgDACgFABIAABqIgDACIgHACIgHACIgDAAIAAgPIhJAAIAABYIAfgNIAigQQgGgKgIgKQgIgJgIgIIADgCQAcANANAOQANAOACAMQACALgFAFQgFAEgIgGIgEgLIgFgLIglAXIgtAbIgDAEIgEACgAhsAFIBJAAIAAgpIhJAAgAhsgtIBJAAIAAgqIhJAAgAhHhmQgBgLgIgMQgHgMgIgIIADgCQAWAHAJAKQAJAKAAAIQAAAJgFADIgFABQgEAAgFgDg");
	this.shape_266.setTransform(1071.275,332.075);

	this.shape_267 = new cjs.Shape();
	this.shape_267.graphics.f("#333333").s().p("AiMCNQAlgFAggLQAhgJAbgOQgOgIgLgNQgMgLgIgOQgNAOgRALQgQAMgTAIIgDgDQARgMAOgPQAPgOALgQQAMgRAHgPIgPAAIAAAGQAAABgFADQgGACgHAAIgDAAIAAhnIAXAKIB6AAIALgLIAYASIgEACIgHACIAABJIgDADIgHADIgIABIgDAAIAAgKIhwAAIAdANQgBACgDACQgDAAgFAAIgFAHIgGAHIBjAAIAQgNIAWAVQgCADgDABIgJAAQgMAPgOANQgPAMgRAKQAaAJAeAFQAfAFAhACIAAADQgHACgFAFQgFAFgBAIQgkgEgfgIQgegJgZgNQgcANgkAKQgkAIgpADgAgzAzQAKAOAOAKQAOALAQAIQAQgKANgLQANgLAKgNIhoAAgAg/AAIB/AAIAAgaIh/AAgAg/gkIB/AAIAAgbIh/AAgAiOgnQAUgSASgbQATgcAMghIAgANQgCADgDACQgDABgFgBIgFAKIgGAJICTAAIAPgTIAFADIALAJIAMALQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQgCABgEAAIi8AAQgOAVgSAPQgRARgSALg");
	this.shape_267.setTransform(1038.925,332.15);

	this.shape_268 = new cjs.Shape();
	this.shape_268.graphics.f("#333333").s().p("AiVCPQAVgcAKgfQALgeADggQADgfAAgfIAAhNIASAHIA9gIQAggFAigHQAigHAhgIIATAYIgFACIgGgDQggAGgjAEIhFAHQgiACgdAAIAAA6ICbAAIAPgOIAZAXQgCADgDABIgJABQgMAegRAZQgSAbgYAWQAYASAeANQAeAMAkAHIgBAEQgIABgFAEQgGAFgDAIQgigJgcgPQgdgOgVgVQgYATggAQQgfAPgoAJIgCgFQAjgMAegQQAdgRAXgVQgSgVgOgcQgOgagIgiIgdAAQAAAVgCAWQgCAYgHAYQgGAYgNAXQgNAXgVAUgAgTASQAPAZATASQAVgVAPgYQAPgYAJgbIh3AAQAJAeAQAXg");
	this.shape_268.setTransform(1007.025,332.275);

	this.shape_269 = new cjs.Shape();
	this.shape_269.graphics.f("#333333").s().p("AiTCNQAkgQAUgUQAVgUAJgaQAJgaACgiIhdAAIgCgJICHAAIAAhCIhDAAQgJARgLAOQgLANgNALIgEgDQAPgVANgeQANgdAHgiIAhAJQgBADgDACQgDACgFAAIgHATIgJASIA+AAIAAg8IAgADQgBADgCADQgDACgGABIAAAwIA+AAIAQgUIAFAEIAMAJIANALQAAABgBAAQAAABAAAAQgBABAAAAQgBABAAAAQgCABgEAAIhjAAIAABCIBZAAIARgUIAFADIAMAKIAMALQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgDABgDAAIhdAAIAAABIAABvQgBAEADACQACABAJAAIAfAAIASAAIALAAIAEgCIADgEIACgKIAEgSIAEgWIAEAAIABA1QAFABACADQACACAAADQAAAFgFADQgEADgNABQgNACgZAAIgiAAQgNAAgHgCQgGgCgDgFQgCgFAAgIIAAh1IgwAAQgEAmgMAdQgMAcgZAUQgZATgqANg");
	this.shape_269.setTransform(974.875,332.325);

	this.shape_270 = new cjs.Shape();
	this.shape_270.graphics.f("#333333").s().p("AgXAqQARgKAHgNQAHgMAAgKIgLgFQgHgDgEgFQgFgFAAgJQAAgHAGgGQAFgGAIAAQAMAAAGAJQAGAIABANQgBAMgDAMQgFANgKAMQgIAMgRAIg");
	this.shape_270.setTransform(931.75,345.525);

	this.shape_271 = new cjs.Shape();
	this.shape_271.graphics.f("#333333").s().p("AgLCTIAAhQQgZAZgjASQgjAUgpAMIgDgFQAlgPAfgVQAfgWAWgYIhwAAIgCgKICEAAIAAggQgPAFgSADQgmAHg1ADIgBgFQAqgFAhgIQAigHAYgLIgmgIIgqgFIAMgPIAPgTIhGAAIgDgJIBPAAIAOgVIALgQIAeAMQgCADgDACQgCABgGgBIgHAJIgIALIByAAIAPgSIAEAEIALAIIALAKQAAABAAAAQAAABgBAAQAAABgBAAQAAABgBAAIgFABIg0AAQgGAMgIAJQgIALgKAHQAfAGARAGQARAFAHAGQAGAGgBADQgBAEgGACQgGABgHgDQgPgGgTgGQgTgGgYgFQgOAHgQAFIgBAAIAAABIABgBIAfAEQAAADgDADQgDACgGABIAAAUIBdAAIAOgTIAFAEIALAJIALAKQAAABAAABQAAAAgBABQAAAAAAABQgBAAAAABIgGABIh1AAQAPAPAWAMQAWAOAZAIQAYAKAZAEIgBAEQgHABgFAFQgFAFgCAJQgZgIgWgNQgXgMgTgRQgTgQgOgUIAABVQAAACgFADQgFABgGAAgAgqglIgMAOIAmADIAfAEQAKgIAIgJQAIgJAGgKIhNAAIgMAPgAgLAMIABAAIgBABgAgKAMgAiDhFQgGgBgCgFQgCgEADgFQACgEAFgCQAIgEAFgKQAGgIgBgMIAGAAIACAHIABAGIDRAAIAMgNIAYAXIgEACIgIABIgSAMIgTALIgEgCIAIgLIAIgNIjQAAQAAALgEAIQgFAHgFAEQgFACgGAAIgCAAgAAAhzQgCgIgHgIQgGgIgIgFIADgDQAUADAJAGQAJAHAAAHQAAAHgGAEIgFABQgDAAgEgDg");
	this.shape_271.setTransform(910.925,331.95);

	this.shape_272 = new cjs.Shape();
	this.shape_272.graphics.f("#333333").s().p("AiKCRQAjgcAUggQAUghAIgnQAIgmABgvIhgAAIgDgJID1AAIAQgUIAFAEIAMAKIANALQAAAAgBABQAAAAAAABQgBAAAAAAQgBABAAAAQgDABgDAAIidAAIgDAcIgDAaIBfAAIAMgNIAZAUIgFAEIgJACQgBAjgDAdQgEAdgFATQgGATgIAIQgHAGgIADQgKAEgLAAQAAgGgCgDQgBgFgDgCQgFgDgJgCIgTgFIAAgFIARACIASACIAMAAIAIAAQADgBADgDQAFgEAEgSQAEgRADgbQADgaACggIhjAAQgGAhgMAcQgNAegWAXQgWAYgiASgAAGhbQgDgIgFgLQgGgKgIgJQgHgJgIgHIAEgDQAbAKALALQANANABAKQABALgGAEQgCACgDAAQgEAAgFgEg");
	this.shape_272.setTransform(878.9,332.1);

	this.shape_273 = new cjs.Shape();
	this.shape_273.graphics.f("#333333").s().p("AhZCSIAAiNQgKAYgOAVQgOAUgTASIgEgEQATgaAOggQANggAJgiIgvAAIgCgJIA3AAIAAg3IgcAHIgcAGIgCgGQATgGAUgIQATgIARgJQASgJALgIIAbAUQgCADgEAAIgKgCIgRAGIgSAHIAAA+IAQAAIANgSIADADIAIAHIAKAIIAAglIAVAKIAsAAIAAhAIAiAEQgBAEgDADQgDACgHABIAAAyIAuAAIALgNIAaAUIgFADIgIADIAAByIgEADIgGACQgEACgEAAIgDAAIAAgVIgxAAIAABjQAAADgGADQgEADgGAAIgEAAIAAhsIguAAIAAASQgBACgDACQgFADgGAAIgEAAIAAhnIgCABIgCAAIguAAIAAAgQAYAKALALQALAMABAJQABAJgFAEQgFAEgIgGQgEgLgIgNQgJgNgJgJIAACMQAAACgGACQgEADgIAAgABEAcIAxAAIAAhfIgxAAgAACAcIAuAAIAAhfIguAAg");
	this.shape_273.setTransform(846.8,332.125);

	this.shape_274 = new cjs.Shape();
	this.shape_274.graphics.f("#333333").s().p("AiNCMQA4gKAtgPQAtgPAjgXQAjgXAZgjIhjAAIgPALIgQAKQAWAHAKAJQALAJABAJQACAJgFAEQgEAEgIgEQgEgLgLgLQgLgMgMgIQgTALgVAJQgVAKgXAGIgDgEQAfgNAbgRQAcgRAWgSQAVgSANgRIAkAIQgBADgEABQgDACgHgBIgLAKIgMAKIBaAAIAOgMIAYAVIgGADIgJABQgcAlgmAZQglAYgxAPQgyAPhAAHgAiNAVQAvgMAogQQAngQAfgWQAfgWAYgdIhoAAIgMAIIgLAHQAVAHALAIQAKAJACAIQACAIgFADQgEAEgIgEQgFgKgKgKQgLgKgLgIIgfARQgQAHgRAGIgDgEQAYgMAXgQQAWgQATgSQASgRALgQIAhAKQAAACgEACQgDABgHAAIgMAMIgPAMIBiAAIANgMIAXAWIgGACIgJABQgaAfgiAXQgiAYgrAPQgrAQg4ALg");
	this.shape_274.setTransform(815.125,332.175);

	this.shape_275 = new cjs.Shape();
	this.shape_275.graphics.f("#333333").s().p("ACICSQgGgBgIgEQgHgEgFgGQgWgSgMgcQgNgcgFglQgHgkgBgtIhuAAIgDgJIBwAAIgBgkIAAgmIAiAEQgBADgDADQgCACgGABIgBAfIABAeIAlAAIAPgSIAFADIALAJIALAKIgDAEIgGABIhGAAQABAnAFAgQAFAiALAaQAKAZASAPQAEADABAAQACAAACgFIAGgQIAGgUIAEAAIgFAxQAHAJABAFQABAEgCADQgEAEgGAAIgBAAgAh3BqQAHgEACgDQADgCgBgEIAAiQIgmAAIgCgJIApAAIALgLIAUASIgEADIgHADIAACHIATgPIAVgQIAEAEIgOAPIgSAVIgVAXQgCAFgDACIgEAEgAhBBmIAVgEIAegIIAAhaIgqAAIgCgKIBKAAIANgQIADADIAJAIIALAJQgBADgCABQgCACgEAAIgmAAIAABVIAYgHIAYgHIACAFIgsATIg6AXQAAADgCACQAAABgBAAQAAABgBAAQAAAAgBAAQAAABAAAAgAhehTQgDgKgGgLIgNgVIgOgRIADgDQAaAMAMANQAMANABAKQABALgGAEQgCACgDAAQgEAAgEgDgABvhdQgCgLgHgLQgGgLgIgIIAEgCQAWAIAIAJQAIAKAAAIQAAAHgGADIgEABQgFAAgEgDg");
	this.shape_275.setTransform(783,332.1775);

	this.shape_276 = new cjs.Shape();
	this.shape_276.graphics.f("#333333").s().p("ABdCQQgCgGgEgHIgIgOIhPAKIhmALQgCAEgDABIgNgbIADgBIAGgCQAPgHAQgNQAQgNAOgNQAOgOAJgLIhnAAIgDgKIDaAAIAQgUIAFAEIALAKIANALQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBABIgFABIiPAAIAZANIgEADQgCABgFAAQgKAJgPAKIgfAVIghASIAugBIA5gDIBDgDIgTgVQgKgKgJgIIAEgCQAiAOAQAPQARAQADAMQADANgFAFQgCADgEAAQgEAAgFgDgAhbgGIgDgKICMAAIAOgSIAFAEIALAIIALAKQAAADgDABQgCACgDAAgAiOgXQgCgFACgEQACgFAFgDQAFgEADgGQAEgGADgIQACgIgBgIIAGAAIACAGIABAHIBkAAIAAhPIAeAEQAAADgCACQgDACgFABIAABDIAcAAIANgXIAOgYIALgXIAiAOQgCADgDABQgDABgFAAQgKALgOAOIgbAaIA8AAIAOgOIAYAXQgCACgDABIgIABIgKALIgLALIgMAKIgEgCIAGgQIAGgSIjXAAQAAANgDAJQgDAJgFAFQgFAEgHAAQgGAAgEgFgAg+hNQgCgJgGgKIgOgTIgPgQIADgCQAbAKAMAMQANAMABAKQABAJgFAFQgDABgDAAQgEAAgFgDg");
	this.shape_276.setTransform(751.025,332.0815);

	this.shape_277 = new cjs.Shape();
	this.shape_277.graphics.f("#333333").s().p("AhYCHQAsgSAdgUQAcgVAQgYQARgXAIgdQAIgcADgjQACgjABgqIAiAEQAAAEgDACQgDADgGAAIgDBAQgCAegFAZQgGAYgLAVQAbARAQAQQAPARAGAPQAGANgBAKQgBAKgGAEQgGADgIgHQgCgPgIgPQgIgQgLgRQgLgPgMgNQgLAVgUAQQgTASgbAPQgcAOgnANgAiEBXQAIgDACgDQACgDAAgEIAAjQIAhAEQAAADgDACQgDACgGACIAADDIAtgaIA1gfIABAFIgtAkQgcAWgkAZIgEAHIgEAEgAgNgmQgDgPgIgSQgIgQgKgQQgJgRgKgNIAEgCQAgAWAPAVQAOATACAQQACAPgGAFQgCADgCAAQgFAAgGgEg");
	this.shape_277.setTransform(720.4071,332.8);

	this.shape_278 = new cjs.Shape();
	this.shape_278.graphics.f("#333333").s().p("AA3CHQgCgEgEgCIgOgFIgWgEIAAgFIAHABIAQABIASABIANABQAEAAACgDQACgCABgEIAAjfIjbAAIgCgKID1AAIAQgUIAGAEIAMAJIAMAMQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBABIgFABIgqAAIAADgQgBAJgCAHQgCAHgJAEQgJAFgQABQgBgFgCgEgAhsBSIAAiWIAVAKIBLAAIALgNIAZAUQgCACgEABIgIADIAABsQAAAAAAAAQAAABgBAAQAAAAgBABQAAAAgBAAIgHADIgHACIgDAAIAAgZIhOAAIAAAeQAAACgFACQgFACgHABgAhYAjIBOAAIAAhUIhOAAg");
	this.shape_278.setTransform(686.85,332.325);

	this.shape_279 = new cjs.Shape();
	this.shape_279.graphics.f("#333333").s().p("AgXAqQARgKAHgNQAHgMAAgKIgLgFQgHgDgEgFQgFgFAAgJQAAgHAGgGQAFgGAIAAQAMAAAGAJQAGAIABANQgBAMgDAMQgFANgKAMQgIAMgRAIg");
	this.shape_279.setTransform(643.75,345.525);

	this.shape_280 = new cjs.Shape();
	this.shape_280.graphics.f("#333333").s().p("AAJAlQAQgIAIgLQAHgKABgIQgNgDgHgGQgHgFAAgLQAAgJAFgEQAGgGAJAAQAKAAAGAHQAGAIAAAOQABAKgEALQgEALgJAKQgKALgQAHgAg3AlQAQgIAHgLQAHgKABgIQgMgDgHgGQgIgFAAgLQAAgJAFgEQAGgGAJAAQALAAAGAHQAGAIAAAOQAAAKgEALQgEALgJAKQgJALgQAHg");
	this.shape_280.setTransform(614.9278,321.45);

	this.shape_281 = new cjs.Shape();
	this.shape_281.graphics.f("#333333").s().p("ABACJQgCgFgDgCQgEgDgJgDIgTgEIAAgGIARACIARABIALABIAIgBIAFgDQAGgGAEgaQADgZADgpIADhgIhOAAQgKAUgMASQgLARgNANIgFgDQALgQAJgVQAJgVAIgYQAIgYAGgYIAgAJQgBADgCACQgDACgFAAIgIAUIgIAUIBFAAIANgOIAZAVQgBACgEACIgIABQgCBYgFA1QgFA0gLAPQgHAIgJADQgJAEgMAAIgBgJgAiJCJIAAjsIAVAKIALAAIAEgSIAEgUIAEgSIAhAIQgBADgDACQgDACgFAAIgLAUIgMAVIApAAIAMgNIAZAUQgBACgEACIgJADIAADDIgDADQgCACgEABIgIACIgDAAIAAgZIhDAAIAAAaQAAACgEADQgFACgHABgAh2BeIBDAAIAAhVIhDAAgAh2AAIBDAAIAAhPIhDAAgAAqAtQgCgLgGgMQgGgMgIgLIgQgUIADgCQAdAOAMANQANAPABALQABAMgGAFQgCACgDAAQgEAAgGgEg");
	this.shape_281.setTransform(591.575,332.125);

	this.shape_282 = new cjs.Shape();
	this.shape_282.graphics.f("#333333").s().p("Ah6CJQAbgWAOgaQAPgZAEgeQAFgdAAggIAAhtIAZAJIB2AAIAKgNIAbAVQgCACgDABIgJAEIAADdQAAAIgBAHQgDAGgIAFQgIAEgQACIgCgJQgDgFgEgCIgLgFIgUgEIAAgEIAGAAIAOABIAQABIALAAQAFAAACgBQABgCAAgEIAAhQIiBAAQgDAWgIAVQgJAUgQASQgQASgZAPgAgkgbIgBAYIgCAVIB/AAIAAg/Ih8AAgAgkg3IB8AAIAAg+Ih8AAg");
	this.shape_282.setTransform(556.7,332.7);

	this.shape_283 = new cjs.Shape();
	this.shape_283.graphics.f("#333333").s().p("AiQCAIgDgJIBMAAIAJglIAJgpIAKgrIhDAAIgDgJIBIAAIAJguIAIgpIhkAAIgDgJIDSAAIAQgUIAFAEIAMAJIANALQAAABgBAAQAAABAAAAQgBABAAAAQgBABAAAAIgGABIh6AAIgIApIgKAuIBKAAIAMgOIAaAUQgBACgEACIgIACIAAB2IAWAAIARgVIAGAEIALAKIANALQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAIgFABgAggApIgJAqIgJAkIBrAAIAAh5IhPAAIgKArg");
	this.shape_283.setTransform(526.875,331.925);

	this.shape_284 = new cjs.Shape();
	this.shape_284.graphics.f("#333333").s().p("AAPAlQgFgHgBgNQAAgLAEgKQAEgMAJgLQAJgKAQgHIAFAIQgQAIgHALQgHAKgBAIQAMAEAIAFQAHAGAAAKQAAAJgFAFQgGAFgJAAQgLAAgGgIgAgxAlQgGgHAAgNQgBgLAEgKQAEgMAJgLQAKgKAQgHIAFAIQgQAIgIALQgHAKgBAIQANAEAHAFQAHAGAAAKQAAAJgFAFQgGAFgJAAQgKAAgGgIg");
	this.shape_284.setTransform(502.7722,321.45);

	this.shape_285 = new cjs.Shape();
	this.shape_285.graphics.f("#333333").s().p("AgOAPQgGgGAAgJQAAgIAGgGQAGgGAIAAQAJAAAGAGQAGAGAAAIQAAAJgGAGQgGAGgJAAQgIAAgGgGg");
	this.shape_285.setTransform(473.625,342.575);

	this.shape_286 = new cjs.Shape();
	this.shape_286.graphics.f("#333333").s().p("Ag+B2IAAgKIAygGIABgdIAAgcIAAiKIgwAFIAAgLIBEgSIAFADIgBAyIAABtIAAAcIAAAdIAyAGIAAAKg");
	this.shape_286.setTransform(460.125,332.475);

	this.shape_287 = new cjs.Shape();
	this.shape_287.graphics.f("#333333").s().p("AgWAnQgKgHgGgJQgGgLAAgMQAAgMAGgKQAGgKAKgGQAKgGAMAAQAMAAAKAGQALAGAGAKQAGAKAAAMQAAAMgGALQgGAJgLAHQgKAFgMABQgMgBgKgFgAgYgXQgJAJAAAOQAAAOAJAKQALAJANABQAOgBAKgJQAKgKAAgOQAAgOgKgJQgKgKgOAAQgNAAgLAKg");
	this.shape_287.setTransform(1289,296.45);

	this.shape_288 = new cjs.Shape();
	this.shape_288.graphics.f("#333333").s().p("ABaCMQgCgEgCgCQgEgDgGgBIgQgEIAAgEIAEAAIALABIANABIAJAAQAEgBACgBQACgCAAgDIAAhjIjMAAIAAB7QgBACgFACQgGADgGAAIgEAAIAAiUIAXAJIDHAAIAKgLIAbASIgEAEIgJADIAABgQAAAJgCAFQgDAGgGAEQgIAEgOACIgCgJgAg4B4IAAhWIAVAJIBFAAIALgLIAYATIgFACIgIADIAAA0QAAABAAAAQAAAAAAABQgBAAAAAAQgBABgBAAIgGADIgHABIgEAAIAAgPIhIAAIAAANQgBABgFADQgGADgGAAgAgkBaIBIAAIAAglIhIAAgAhJgBIAAhRIAVAKIBoAAIALgMIAaATIgFAEIgJADIAAAwIgDADIgHADIgHABIgDAAIAAgNIhsAAIAAAIQgBACgFACQgFACgHABgAg1gZIBsAAIAAglIhsAAgAiLhhIgDgJICOAAQgCgHgGgHQgFgIgIgGIgOgLIADgCQAZADAKAIQAMAJACAIQACAJgGAEIBUAAIAQgUIAFAEIAMAKIANALQAAAAAAABQgBAAAAABQAAAAgBABQAAAAgBAAIgGABg");
	this.shape_288.setTransform(1267.25,286);

	this.shape_289 = new cjs.Shape();
	this.shape_289.graphics.f("#333333").s().p("AhYCTIAAiRIAXALICCAAIALgNIAaATIgGAEIgHACIAABwIgDAEIgHADIgIABIgEAAIAAgVIiGAAIAAAQQAAACgGACQgFADgHAAgAhDBzICGAAIAAgrIiGAAgAhDA/ICGAAIAAgpIiGAAgAiMgTIgCgKICkAAQAIgOAHgRQAHgSAFgPIitAAIgDgJICHAAQgEgBgEgCQgBgKgIgKQgHgLgIgHIADgDQAVAGAKAJQAJAIAAAIQAAAIgFADIgFACIAAAAIgBAAIABAAIAAAAIBMAAIAQgTIAFAEIALAJIALAKQAAABAAAAQAAABAAAAQgBABAAAAQgBABAAAAIgGABIhEAAIAeALQgBACgDACQgDACgFgBIgSAYQgKANgLALIBDAAIAQgUIAFAEIAMAKIAMAKQgBADgCABQgCACgDAAgAgwgiQgBgJgEgKIgIgUIgKgQIAEgCQAWAMAJAMQAIANAAAJQgBAKgGADIgEACQgFAAgEgEg");
	this.shape_289.setTransform(1235.225,286.025);

	this.shape_290 = new cjs.Shape();
	this.shape_290.graphics.f("#333333").s().p("AiPCJIgDgKIB/AAIAAkHIAgAEQgBADgCACQgDADgGABIAABoIBKAAIARgVIAFAEIALAKIANALQAAAAAAABQgBAAAAABQAAAAgBABQAAAAgBAAQgCACgDAAIhwAAIAACJIBjAAIAQgUIAGAEIAMAJIANALQgBADgCABQgCACgEAAg");
	this.shape_290.setTransform(1203.175,285.475);

	this.shape_291 = new cjs.Shape();
	this.shape_291.graphics.f("#333333").s().p("AiMCQIAAjhIAVAKIATAAIAAgtIguAAIgCgJIB2AAIAOgSIAFADIALAJIAKAKQgBADgCABQgCACgDgBIgwAAIAAAtIATAAIALgMIAYATQgCACgDABIgIAEIAAC9QAAABgGACQgFADgFAAIgDAAIAAgWIhgAAIAAAUQAAACgFADQgEACgHABgAh4BqIBgAAIAAgsIhgAAgAh4A1IBgAAIAAgnIgHABIgJAAIgJAAQgKAAgCgEQgDgDAAgIIAAg+IgTAAIAAAOQAAAMgCAOQgCAPgIANQgHAOgPAMIgDgFgAh4AaQAKgMAEgNQAFgMABgNIABgYIAAgOIgVAAgAgwg9IAAA5IABAEIACAAIAGAAIAGAAIADAAIACAAIACAAIACAAIAAg+IgYAAgAhThHIATAAIAAgtIgTAAgAA0CGQgNAAgHgBQgHgCgCgFQgDgFAAgIIAAigIAYAKIA9AAIAAhPIhVAAIgDgJIBUAAIAMgOIAbAVQgBADgFABQgEACgGABIAABoQAAABAAAAQAAABAAAAQAAAAgBABQAAAAgBABIgHACIgHABIgDAAIAAgbIhBAAIAACHQAAAEADACQADABAJABIAgAAIAUAAIALgBIAEgBQABAAAAgBQAAAAABAAQAAgBAAAAQAAgBAAgBIADgKIAEgSIAEgUIAEAAIABAzIAHADQACACgBAEQABAFgFACQgFADgNACIgnAAg");
	this.shape_291.setTransform(1171.355,286.25);

	this.shape_292 = new cjs.Shape();
	this.shape_292.graphics.f("#333333").s().p("AAJAlQAQgIAIgLQAHgKABgIQgNgDgHgFQgHgHAAgKQAAgJAFgEQAGgGAJAAQAKAAAGAIQAGAHAAAOQABAKgEALQgEALgJAKQgKALgQAHgAg3AlQAQgIAHgLQAHgKABgIQgMgDgHgFQgIgHAAgKQAAgJAFgEQAGgGAJAAQALAAAGAIQAGAHAAAOQAAAKgEALQgEALgJAKQgJALgQAHg");
	this.shape_292.setTransform(1131.2278,275.45);

	this.shape_293 = new cjs.Shape();
	this.shape_293.graphics.f("#333333").s().p("AhRCTIAAiMQgPARgQANQgPAOgRAKIgEgFQAQgNARgTQAQgUAOgWQAOgXALgaIAeAOQgBADgDABQgDABgFAAIgNAUIgNAUIARAGIgDADIgHABIAACLQAAACgFACQgGACgFAAgAAqCKQgOAAgIgCQgHgCgDgFQgDgGAAgJIAAhFIgQAGIgQAFIgCgFIARgIIARgKIAAhgIAfAEQAAADgDADQgCACgGABIAABHQAWgNAUgPQAVgPATgSIAXAXQgCACgDAAIgHgCQgWARgYAMQgXAOgYAKIAABKQAAAFADACQAEACAKAAIAlAAIAWAAIANAAIAFgCIACgDIADgKIAEgRIAEgVIAEAAIABAyQAGACACACQACACgBADQABAFgGADQgFADgPABQgPABgbAAgAg1hAIAAgjIhYAAIgBgJIBZAAIAAgmIAgADQgBAEgCACQgCACgGABIAAAaIBFAAIAAgmIAgADQAAAEgCACQgDACgGABIAAAaIAwAAIAQgTIAEAEIALAJIAMALQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBAAIgFABIhTAAIAAAbQAAACgFACQgEACgIABIgEAAIAAgiIhFAAIAAAcQgBADgFACIgMACg");
	this.shape_293.setTransform(1106.875,286.125);

	this.shape_294 = new cjs.Shape();
	this.shape_294.graphics.f("#333333").s().p("AA2CSIAAhUIg4AAIgCgKIA6AAIAAg4IgwAAIgDgKIAzAAIAAg1Ig3AAIgDgJIBLAAIAJgWIAJgZIAHgWIAfAJQgBADgDABQgDACgFAAIgQAbIgUAbIAbAAIAOgSIAFAEIAKAIIAMAKQgBABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQgCABgDAAIhAAAIAAA1IAXAAIAOgSIAFADIALAJIALALQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQgCACgEAAIg4AAIAAA4IAiAAIAOgTIAFAEIALAJIALAKQAAABAAABQgBAAAAABQAAAAgBABQAAAAgBAAQgCACgDAAIhDAAIAABOQgBABgEADQgFACgHAAgAiPBxIAjgFIAygJIA6gLIAAAGIg0ARIhIAWIgDAFIgEACgAiABTIAAiBIgIAIIgIAIIgFgDQAKgNAJgSQAKgRAIgUQAJgUAGgVIAeAJIgEAFIgIACIgFAKIgFAKIAmAAIANgMIAWAVQAAABgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAIgIABIgKAMIgMAPIgNANIAhAAIAKgLIAUASIgFAEIgHACIAABwIgFADQgEACgGAAIgDAAIAAgJIhQAAIAAAKQAAABgEADQgEACgHAAgAg9A6IAfAAIAAgyIgfAAgAhuA6IAgAAIAAgyIggAAgAg9AAIAfAAIAAgsIgfAAgAhuAAIAgAAIAAgsIggAAgAhphNIgNASIANAFIAiAAIAKgVIAKgVIgrAAQgFAKgGAJgAAfhXQgBgJgFgKQgEgKgFgJIgMgQIAEgCQAWAMAKAMQAJAMAAAJQABAKgGADIgEACQgEAAgFgEg");
	this.shape_294.setTransform(1075.175,286.125);

	this.shape_295 = new cjs.Shape();
	this.shape_295.graphics.f("#333333").s().p("AAPAlQgFgHgBgNQAAgLAEgKQAEgLAJgMQAJgKAQgHIAFAIQgQAJgHAKQgHALgBAHQAMADAIAGQAHAGAAALQAAAIgFAFQgGAFgJAAQgLAAgGgIgAgxAlQgGgHAAgNQgBgLAEgKQAEgLAJgMQAKgKAQgHIAFAIQgQAJgIAKQgHALgBAHQANADAHAGQAHAGAAALQAAAIgFAFQgGAFgJAAQgKAAgGgIg");
	this.shape_295.setTransform(1051.0722,275.45);

	this.shape_296 = new cjs.Shape();
	this.shape_296.graphics.f("#333333").s().p("AhNCSIAAiNQgLAagPAVQgQAXgUATIgEgFQAUgaAPggQAPgfAHgjIg1AAIgCgJIBAAAIAAg+IggAFIghAFIgBgGQAVgEAXgIIArgQQAUgIAOgHIAYAWQgCACgDAAQgEAAgGgCIgUAGIgXAFIAABEIAZAAIAPgUIAFAFIAKAJIALAKIgDAEIgGABIg5AAIAAAUQAbALANALQAMANACAJQACAJgFAEQgFAEgIgFQgDgIgGgJQgGgIgIgJIgPgPIAACTQAAACgFACQgFACgHABgAAQCCIAAjsIAWAKIBDAAIAMgOIAbAVQgBACgEACIgKADIAADIQAAABgGADQgFACgGAAIgDAAIAAggIhIAAIAAAeQgBACgFADQgEADgHAAgAAlBTIBIAAIAAipIhIAAg");
	this.shape_296.setTransform(1010.725,286.2);

	this.shape_297 = new cjs.Shape();
	this.shape_297.graphics.f("#333333").s().p("AAJAlQAQgIAIgLQAHgKABgIQgNgDgHgFQgHgHAAgKQAAgJAFgEQAGgGAJAAQAKAAAGAIQAGAHAAAOQABAKgEALQgEALgJAKQgKALgQAHgAg3AlQAQgIAHgLQAHgKABgIQgMgDgHgFQgIgHAAgKQAAgJAFgEQAGgGAJAAQALAAAGAIQAGAHAAAOQAAAKgEALQgEALgJAKQgJALgQAHg");
	this.shape_297.setTransform(971.2278,275.45);

	this.shape_298 = new cjs.Shape();
	this.shape_298.graphics.f("#333333").s().p("ABACJQgCgFgDgCQgEgDgJgDIgTgEIAAgGIARACIARABIALABIAIgBIAFgDQAGgGAEgaQADgZADgpIADhgIhOAAQgKAUgMASQgLARgNANIgFgDQALgQAJgVQAJgVAIgYQAIgYAGgYIAgAJQgBADgCACQgDACgFAAIgIAUIgIAUIBFAAIANgOIAZAVQgBACgEACIgIABQgCBYgFA1QgFA0gLAPQgHAIgJADQgJAEgMAAIgBgJgAiJCJIAAjsIAVAKIALAAIAEgSIAEgUIAEgSIAhAIQgBADgDACQgDACgFAAIgLAUIgMAVIApAAIAMgNIAZAUQgBACgEACIgJADIAADDIgDADQgCACgEABIgIACIgDAAIAAgZIhDAAIAAAaQAAACgEADQgFACgHABgAh2BeIBDAAIAAhVIhDAAgAh2AAIBDAAIAAhPIhDAAgAAqAtQgCgLgGgMQgGgMgIgLIgQgUIADgCQAdAOAMANQANAPABALQABAMgGAFQgCACgDAAQgEAAgGgEg");
	this.shape_298.setTransform(947.875,286.125);

	this.shape_299 = new cjs.Shape();
	this.shape_299.graphics.f("#333333").s().p("Ah6CJQAbgWAOgaQAOgZAFgdQAFgeAAggIAAhtIAZAKIB1AAIALgOIAbAVQgBACgEABIgJADIAADeQAAAIgBAHQgDAGgIAFQgIAEgQACIgCgJQgDgEgEgDIgLgFIgUgDIAAgGIAGABIAPABIAPABIALAAQAFAAACgBQABgDAAgDIAAhQIiBAAQgDAWgIAVQgJAUgQASQgQASgZAPgAgkgbIgBAYIgCAVIB/AAIAAg/Ih8AAgAgkg2IB8AAIAAg/Ih8AAg");
	this.shape_299.setTransform(913,286.7);

	this.shape_300 = new cjs.Shape();
	this.shape_300.graphics.f("#333333").s().p("AiQCAIgDgJIBMAAIAJglIAJgpIAKgrIhDAAIgDgJIBIAAIAJguIAIgpIhkAAIgDgJIDSAAIAQgUIAFAEIAMAJIANALQAAABgBAAQAAABAAABQgBAAAAAAQgBABAAAAIgGABIh6AAIgIApIgKAuIBKAAIAMgOIAaAUQgBACgEACIgIACIAAB2IAWAAIARgVIAGAEIALAKIANALQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAIgFABgAggApIgJAqIgJAkIBrAAIAAh5IhPAAIgKArg");
	this.shape_300.setTransform(883.175,285.925);

	this.shape_301 = new cjs.Shape();
	this.shape_301.graphics.f("#333333").s().p("AAPAlQgFgHgBgNQAAgLAEgKQAEgLAJgMQAJgKAQgHIAFAIQgQAJgHAKQgHALgBAHQAMADAIAGQAHAGAAALQAAAIgFAFQgGAFgJAAQgLAAgGgIgAgxAlQgGgHAAgNQgBgLAEgKQAEgLAJgMQAKgKAQgHIAFAIQgQAJgIAKQgHALgBAHQANADAHAGQAHAGAAALQAAAIgFAFQgGAFgJAAQgKAAgGgIg");
	this.shape_301.setTransform(859.0722,275.45);

	this.shape_302 = new cjs.Shape();
	this.shape_302.graphics.f("#333333").s().p("AA6CJQAAgEgFgCQgCgCgIgDIgOgDIgRgDIABgGIAVACIAWADIAOAAQAGABADgBQAEgCACgDQAFgEAEgPQAEgPADgVIAFgzIAEg4IhkAAQgEAagIAaQgJAagRAYQgQAagcAWQgbAXgoAUIgEgFQAjgWAXgWQAYgWAPgYQAOgYAJgYQAHgZAEgZIh4AAIgEgJIB9AAIADgsIABgsIAhAEQAAADgDACQgDADgFABIgCAlQAAASgCAUIBfAAIANgOIAZAVQgCACgCABIgKACQgBAggCAcQgCAdgEAYQgDAYgFAQQgFAQgGAHQgIAHgKAEQgKAEgOAAQAAgFgCgEgAAvA7QgCgLgFgNQgEgMgIgLQgHgMgIgIIAEgDQAbAOAMAPQALAQABAMQAAAMgGAEQgCACgDAAQgFAAgFgFgAhChJQgBgKgHgKQgFgLgIgJQgHgLgIgGIADgDQAcALAMAMQAMANABALQABALgFAEQgDACgDAAQgEAAgGgEg");
	this.shape_302.setTransform(819,286.1);

	this.shape_303 = new cjs.Shape();
	this.shape_303.graphics.f("#333333").s().p("AiRCLQAVgOANgVQAMgTAHgXQAHgWADgZIg4AAIgCgJIA7AAIABgVIABgUIAfADIgDAFQgCADgGAAIgBAQIgBAOIAvAAIAMgMIAXASIgFAEIgIACQgCAxgGAcQgEAdgKAJQgGAFgIACQgIADgJAAIgBgIQgBgEgDgDQgDgCgHgCIgPgDIAAgGIANACIAOABIAKAAIAGAAIAFgDQAGgGAEgZQAEgaACgrIg0AAQgDAZgIAYQgIAXgQAWQgQAUgbAQgABhCGQgBgEgEgDQgDgDgHgCIgTgDIAAgGIAGABIANABIAOABIAJABQAFAAACgCQACgCgBgEIAAj8IAhADQgBAEgCACQgDACgGABIAADyQAAAJgCAHQgCAGgIAEQgHAEgPACQgBgGgCgDgAAxBPIAAjIIAgAEQgBADgCADQgDACgGABIAAC0QAAACgFACQgFADgGAAgAh4gZIAAhwIAYAKIBPAAIALgMIAYASQgCACgDACQgEACgEAAIAABRQAAAAAAABQgBAAAAAAQAAAAgBABQgBAAAAAAIgGADIgHACIgDAAIAAgPIhWAAIAAAKQAAACgFADQgEACgIAAgAhkgzIBWAAIAAhCIhWAAg");
	this.shape_303.setTransform(786.825,286.5);

	this.shape_304 = new cjs.Shape();
	this.shape_304.graphics.f("#333333").s().p("AiFCOQAfgRATgUQAUgTALgTQAKgUAEgTQAFgTABgQIhFAAIgDgJICmAAIAMgNIAZAUIgGADIgIACQgBAkgDAdQgEAcgEATQgGATgHAHQgHAHgIADQgKADgLAAIgBgJQgBgEgEgDQgFgCgJgDIgTgEIAAgGIARACIASACIAMAAIAIAAIAFgEQAFgEAEgRQADgRADgaIAFg7IhKAAQgDATgFAUQgFAUgNAVQgNAUgWATQgYATgkARgAiWABQAYgRAVgZQAUgZAPgaQAOgbAIgZIAhAMIgEAEQgDABgFgBQgLAYgRAYQgQAZgYAWQgXAXgdAPgABCg4QgYgkgMg1IADgCIAWAHIgEAHIgGAIQAJAWAOAWQAPAVAVARQAVAQAaAKIgBAEQgHABgFAEQgGAFgDAFQgngWgYgkg");
	this.shape_304.setTransform(755.3,286.075);

	this.shape_305 = new cjs.Shape();
	this.shape_305.graphics.f("#333333").s().p("AgYAqQATgKAGgNQAHgMAAgKIgLgFQgHgDgFgFQgEgFAAgJQAAgHAGgGQAEgGAJAAQAMAAAGAJQAGAIABANQAAAMgFAMQgDANgKAMQgJAMgRAIg");
	this.shape_305.setTransform(712.05,299.525);

	this.shape_306 = new cjs.Shape();
	this.shape_306.graphics.f("#333333").s().p("Ag6CKIgCgJIAqAAIAAj/IAYALIBPAAIALgPIAcAWQgCACgCABIgKADIAADnIAFAAIANgSIADAEIAJAIIAKAKQAAAAAAABQgBABAAAAQAAABgBAAQAAAAgBABQgCABgDAAgAACCBIBWAAIAAhKIhWAAgAACAtIBWAAIAAhJIhWAAgAACglIBWAAIAAhFIhWAAgAiTBqIAdgHIApgLIAtgNIABAEIgnAVQgYAMgfAOIgDAFIgEADgAiVAjIAEgBIAGgCQANgNAPgSQAPgSANgUIgWAHIgaAHQgEAEgDABIgLgdIADgBIAGgCQAHgHAIgLIAPgYIAOgYIAJgVIAeAOQAAABAAAAQgBABAAAAQgBABAAAAQgBAAAAABQgDABgFAAQgIALgKANIgVAaIgXAXIAZgBIAdgBIAMgUIAJgQIAdASQgBACgEABQgCABgGgBQgJAPgOARIgfAhQgQARgQAOIAngFIAxgIIABAFIgoAOIg3ASIgDADIgDACg");
	this.shape_306.setTransform(691.3,285.525);

	this.shape_307 = new cjs.Shape();
	this.shape_307.graphics.f("#333333").s().p("ABSCIQgCgDgEgCQgEgDgIgCIgVgDIAAgGIAHAAIAPABIAQABIALABQAFAAACgCQACgCAAgDIAAimIg8AAIgBAQIgBAQQAaASAMAQQAMARABANQABAMgFAFQgFAFgIgHQgCgLgFgNQgFgMgIgMIgPgVQgDARgFASQgGATgLAQQgLARgRAPIgEgEQASgWAHgYQAJgYADgYQADgXAAgXIg5AAIgBAPIgBAPQAVAPAJAOQAIAOAAALQAAAKgFAEQgFAEgHgGQgBgOgHgOQgGgPgIgNQgEAagNAaQgMAbgZAVIgEgEQARgVAJgYQAJgYADgWQADgYABgVIgxAAIAAC+QAAACgFADQgFADgHAAIgEAAIAAjaIAXAKIAvAAIAAgEIAAgwIhXAAIgDgJID0AAIARgUIAFAEIAMAKIANALIgDADIgGABIhgAAIAAA0IA5AAIALgNIAbAVQgCACgEABIgIADIAACkQAAAIgCAGQgDAGgIAFQgIAEgQABIgDgJgAgkhDIAAAEIA5AAIAAg0Ig5AAg");
	this.shape_307.setTransform(659.225,286.35);

	this.shape_308 = new cjs.Shape();
	this.shape_308.graphics.f("#333333").s().p("AiTCPQAPgXAIgbQAHgZADgcQACgbAAgaIAAhQIAYALIBkAAIgCggIAAggIAgADQAAADgDADQgCACgGABIAAAaIABAaIBIAAIAPgTIAFADIALAJIAMALQAAABAAAAQAAABgBAAQAAABAAAAQgBAAAAABQgDABgDAAIhqAAQACAgAHAeQAGAcALAZQAMgUAJgWQAIgVAGgWIAhAKQAAAEgDABQgDABgGAAQgIAXgLAVQgLAXgRAVQAKAPALAMQAMAMAOAIQAFAEACgBQACAAACgEIAHgRIAHgTIAFAAIgGAvQAHAJACAFQABAEgCACQgEAEgHABQgGgBgJgEQgIgEgIgFQgPgKgNgNQgMgNgKgPQgSAUgYARQgXAQgeANIgDgEQAcgQAWgTQAWgUARgXQgOgcgIgiQgIgigDgnIhoAAIAAA1IA3AAIALgNIAYATIgFAEIgHABQgBAfgCAWQgCAUgEANQgEAMgFAGQgFAFgIACQgHADgIAAIgBgJQgBgEgDgDQgCgCgGgBIgNgEIAAgEIALABIALAAIAJABIAFgBIAEgCQAFgFADgVQADgXABgnIg6AAQAAAYgDAcQgDAcgMAcQgLAbgXAXgABehlQgEgGgHgHIgOgMIgQgKIACgDQAZACANAIQAMAHADAHQADAJgFAEQgCADgEAAIgGgCg");
	this.shape_308.setTransform(627.0281,286.25);

	this.shape_309 = new cjs.Shape();
	this.shape_309.graphics.f("#333333").s().p("AiGCOQAggRAUgUQATgTALgTQAKgUAFgTQADgTABgQIhEAAIgDgJICmAAIAMgNIAZAUIgGADIgIACQgBAkgDAdQgEAcgFATQgEATgIAHQgGAHgJADQgKADgLAAIgBgJQgCgEgDgDQgEgCgKgDIgTgEIAAgGIAQACIATACIANAAIAHAAIAFgEQAFgEAEgRQADgRAEgaIAEg7IhKAAQgCATgGAUQgGAUgMAVQgNAUgXATQgXATgkARgAiWABQAYgRAUgZQAVgZAOgaQAPgbAIgZIAhAMIgEAEQgDABgFgBQgLAYgRAYQgQAZgYAWQgWAXgdAPgABCg4QgXgkgNg1IAEgCIAVAHIgEAHIgGAIQAJAWAPAWQAOAVAWARQAUAQAaAKIgBAEQgHABgFAEQgFAFgEAFQgngWgYgkg");
	this.shape_309.setTransform(595.3,286.075);

	this.shape_310 = new cjs.Shape();
	this.shape_310.graphics.f("#333333").s().p("AgdCKQgBgDgEgDQgEgDgIgBIgUgEIAAgFIAHABIAOABIAQAAIAKABQAFgBACgBQABgCAAgEIAAhKIiDAAIgDgJICGAAIAAgoIAVADQAKgIAKgIIARgRIiHAAIgDgJICOAAIAPgPIAZAXQgCACgDAAIgIABIgbAQQgPAJgPAHQgBADgCACQgDABgGACIAAAcIBaAAIAQgUIAFADIALAJIANALQAAABgBABQAAAAAAABQAAAAgBABQAAAAgBABIgGABIh+AAIAABMQABAIgDAHQgCAGgHAEQgIAFgQABQgBgFgCgEgAiGgoQgHgBgDgGQgCgFADgFQADgFAFgDQAGgEAGgGQAGgIADgJQADgJgBgKIAGAAIACAIIACAIIDQAAIAOgOIAaAZIgFACIgIAAQgHAKgLAJQgKALgKAGIgEgCIAIgSIAHgTIjQAAQAAAPgFALQgFAJgIAFQgGAFgGAAIgCAAgAAAhlQgBgMgHgLQgHgLgJgJIAEgCQAWAGAKAKQAJAKAAAIQAAAJgGADQgDACgCAAQgFAAgFgDg");
	this.shape_310.setTransform(563.275,286.1);

	this.shape_311 = new cjs.Shape();
	this.shape_311.graphics.f("#333333").s().p("AgLCTIAAjMIAhADQgBAEgCACQgDACgGABIAAC5QAAACgGACQgEADgGAAgAiUAFQAdgSAbgaQAagZAVgcQAUgcALgaIAkAKQgBACgDACIgJACQAPAWAVAVQAWAVAaARQAaASAeAMIgBAFQgHACgFAFQgEAFgDAGQgqgYghgiQggghgTgnQgNAYgXAZQgXAagcAWQgdAXggAQg");
	this.shape_311.setTransform(531.125,286.175);

	this.shape_312 = new cjs.Shape();
	this.shape_312.graphics.f("#333333").s().p("AiQCAIgDgJIBMAAIAJglIAJgpIAKgrIhDAAIgDgJIBIAAIAJguIAIgpIhkAAIgDgJIDSAAIAQgUIAFAEIAMAJIANALQAAABgBAAQAAABAAABQgBAAAAAAQgBABAAAAIgGABIh6AAIgIApIgKAuIBKAAIAMgOIAaAUQgBACgEACIgIACIAAB2IAWAAIARgVIAGAEIALAKIANALQAAABgBAAQAAABAAAAQAAABgBAAQAAABgBAAIgFABgAggApIgJAqIgJAkIBrAAIAAh5IhPAAIgKArg");
	this.shape_312.setTransform(499.175,285.925);

	this.shape_313 = new cjs.Shape();
	this.shape_313.graphics.f("#333333").s().p("AA5CKQgCgDgEgDQgEgDgIgCIgVgDIAAgGIAGABIAPABIARABIALAAQAFAAADgBQABgCAAgEIAAhTIh3AAIgDgKIB6AAIAAgwIAgAEQgBADgCACQgDACgGABIAAAkIANAAIANgTIAFAEIAKAJIALAKQgBADgCABQgCACgEAAIgrAAIAABVQAAAIgCAHQgCAGgIAEQgIAEgQACIgDgJgAhSCSIAAiDIgTAaIgXAcQABACgBADQgBADgCACIgUgXQANgIASgOIAigfIAAiTIAhADQgBAEgCACQgDADgGABIAAEMQAAADgGADQgEADgGAAgAASBeQgCgJgFgJQgGgKgGgJIgOgQIADgCQAZAJALAMQAMALABAKQAAAKgFAEQgCACgDAAQgEAAgFgDgAg1AMQA0gSAlgcQAngbAZgoIhUAAIgJAKIgIAKQASAFAIAIQAJAJgBAHQAAAHgEADQgGADgHgEQgCgJgHgIQgGgJgHgHQgKAKgKAHQgKAIgMAGIgDgDQAOgMAOgQQANgRAKgSQALgSAHgRIAhAJQAAAAAAABQAAAAgBABQAAAAgBABQAAAAgBAAQgDABgGAAIgHALIgIAMIBPAAIANgMIAXAUQgBACgDABIgJABQgTAcgZAWQgaAWggAQQggAQgqALgAhvgeQgBgLgEgKQgFgMgGgKQgHgKgGgIIADgCQAZAMAKAOQAKAOAAAKQABALgGAEQgCACgDAAQgEAAgFgEg");
	this.shape_313.setTransform(467.2,286.125);

	this.instance_2 = new lib._22();
	this.instance_2.setTransform(449,557,1,1.0002);

	this.shape_314 = new cjs.Shape();
	this.shape_314.graphics.f("#333333").s().p("AgVAmQgKgGgHgJQgGgLAAgMQAAgMAGgKQAHgKAKgGQAJgGAMAAQAMAAALAGQAKAGAGAKQAGAKAAAMQAAAMgGALQgGAJgKAGQgLAGgMABQgMgBgJgGgAgYgYQgJAKAAAOQAAAOAJAKQAKAJAOABQAOgBAKgJQAJgKABgOQgBgOgJgKQgKgJgOgBQgOABgKAJg");
	this.shape_314.setTransform(1660.55,354.2);

	this.shape_315 = new cjs.Shape();
	this.shape_315.graphics.f("#333333").s().p("ABaCLQgCgDgDgCQgCgDgHgCIgRgDIAAgFIAGABIALABIAMABIAJAAQAEAAACgCQABgBAAgEIAAhiIjMAAIAAB6QAAABgFADQgFACgHAAIgDAAIAAiTIAWAJIDHAAIALgLIAbATIgGADIgIACIAABhQABAIgDAHQgDAFgHAEQgGAEgPABIgCgJgAg5B3IAAhVIAWAKIBEAAIAMgMIAXATIgEADIgHACIAAA1QAAAAgBAAQAAAAAAABQgBAAAAAAQgBABgBAAIgGADIgHACIgEAAIAAgQIhJAAIAAANQAAABgFADQgFADgHgBgAglBaIBJAAIAAglIhJAAgAhKgBIAAhRIAXAKIBnAAIALgNIAaAVIgFADIgIACIAAAyIgDACIgHACIgIABIgDAAIAAgMIhsAAIAAAIQgBACgEACQgGACgGABgAg1gZIBsAAIAAglIhsAAgAiLhhIgDgJICOAAQgDgHgFgHQgFgIgIgGIgOgKIADgEQAZAEALAJQALAHACAJQACAIgGAFIBTAAIARgUIAFAEIAMAJIANAMQAAAAAAABQgBAAAAABQAAAAgBABQAAAAgBAAIgGABg");
	this.shape_315.setTransform(1639.8,343.75);

	this.shape_316 = new cjs.Shape();
	this.shape_316.graphics.f("#333333").s().p("AhYCTIAAiRIAXALICCAAIALgNIAaATIgGAEIgHACIAABwIgDAEIgHADIgIABIgEAAIAAgVIiGAAIAAAQQAAACgGACQgFADgHAAgAhDBzICGAAIAAgrIiGAAgAhDA/ICGAAIAAgpIiGAAgAiMgTIgCgKICkAAQAIgOAHgRQAHgSAFgPIitAAIgDgJICHAAIABAAIAAAAIAAAAIgBAAQgEgBgEgCQgBgKgIgKQgHgLgIgHIADgDQAVAGAKAJQAJAIAAAIQAAAIgFADIgFACIBMAAIAQgTIAFAEIALAJIALAKQAAABAAAAQAAABAAAAQgBABAAAAQgBABAAAAIgGABIhEAAIAeALQgBACgDACQgDACgFgBIgSAYQgKANgLALIBDAAIAQgUIAFAEIAMAKIAMAKQgBADgCABQgCACgDAAgAgwgiQgBgJgEgKIgIgUIgKgQIAEgCQAWAMAJAMQAIANAAAJQgBAKgGADIgEACQgFAAgEgEg");
	this.shape_316.setTransform(1608.775,343.775);

	this.shape_317 = new cjs.Shape();
	this.shape_317.graphics.f("#333333").s().p("AATCTIAAg6IhXAAIgCgJIBZAAIAAgnIhMAAIgCgKIBOAAIAAgjIhBAAIgDgJIBEAAIAAgnIhQAAIgDgKIBTAAIAAglIg/AAIgDgKIBCAAIAAglIAgAEQAAADgDADQgCACgHABIAAAYIAxAAIALgNIAaAUIgGAEQgDACgFABIAAAhIAGAAIAMgQIAEAEIAJAHIAJAKQAAAAAAABQgBAAAAABQAAAAgBABQAAAAgBAAQgCACgDAAIggAAIAAAzQAAABAAAAQAAAAgBAAQAAAAgBABQgBAAAAAAIgHADIgHABIgDAAIAAgJIg0AAIAAAjIA0AAIAOgSIAFAEIALAJIAMAKIgDAEIgGABIhVAAIAAAnIBBAAIAPgUIAFAEIALAJIALALQAAAAAAABQAAABgBAAQAAABAAAAQgBAAAAABIgGABIhjAAIAAAxQAAACgFADQgFADgGABgAAngNIA0AAIAAgnIg0AAgAAng+IA0AAIAAglIg0AAgAhrCSIAAiXIgTATQgKAJgLAIIgDgDQAOgQAOgSQANgUALgUQAKgTAHgRIAeAOIgEAEQgDABgGgBIgLASIgNATIALAEIgDAEIgHACIAACcQAAABgFADQgFADgGAAgAiTg9QANgMALgPQAMgPAKgPQAKgPAGgNIAdAPQgBADgDABQgDABgFgCQgIALgMANQgMANgOAMQgOAMgPAKg");
	this.shape_317.setTransform(1577.725,343.925);

	this.shape_318 = new cjs.Shape();
	this.shape_318.graphics.f("#333333").s().p("AgyCQQAYgYANgkQAMgjABgxIAfAEQgBADgDACQgDACgFABIgDAZIgFAYQAHATAJAMQAKALAMAGIAAiSIg1AAIgDgJIB1AAIAMgMIAWAWQAAAAAAAAQgBABAAAAQgBAAgBAAQAAABgBAAIgIABIgKAMIgMANIgNAKIgEgCIAJgRIAIgUIgqAAIAABCIAhAAIANgSIAGAEIAKAIIAKAKQgBADgBABQgDABgDAAIhAAAIAABOIAQACIARABIAwAAIAAAEQgFABgDAEQgCAEAAAHIgoAAQgXAAgSgGQgRgGgMgPQgNgPgIgaQgIAagNATQgOATgTANgAiUCMQAPgXAIgaQAJgaAEgcQAEgbABgcIABg4IglAAIgDgKIBgAAIAOgTIAFAEIAKAJIALAKQAAABAAABQAAAAAAABQgBAAAAABQgBAAAAAAQgCACgEAAIhDAAIAAAYIgBAYIAhAAIALgNIAYAUQgCACgDABIgIACQgBArgEAeQgDAegEARQgFARgHAHQgGAGgHADQgJADgIAAIgBgJQgCgDgDgDQgCgCgHgCIgNgDIABgFIALABIAMABIAJAAIAHgBIAFgDQAGgGAFghQAFggACg6IgkAAQgCAdgGAdQgFAcgMAbQgMAagVAWgAgXgpQANgTAKgcQALgbAGggIAgAKQgBADgCABQgDACgFAAIgHATQgEAKgFAIIBUAAIAPgTIAEAEIAMAJIALALIgDAEIgGABIh6AAQgIAOgJAMQgJALgKAJgAhTheQgBgIgDgKQgEgJgFgJQgGgIgGgHIAEgCQAWAJAKAMQAJAMAAAJQAAAKgGAEQgCABgDAAQgEAAgFgEg");
	this.shape_318.setTransform(1546.65,343.975);

	this.shape_319 = new cjs.Shape();
	this.shape_319.graphics.f("#333333").s().p("ABNCEQgCgDgEgCQgFgDgIgCQgIgDgOgBIAAgFIAHAAIAQACIARABIALABQAFAAACgDQADgBAAgFIAAjhIjPAAIAAD5QAAADgFACQgFADgGAAIgEAAIAAkVIAWALIDJAAIALgOIAbAVIgFAEIgJACIAADfQAAAIgCAHQgDAGgIAEQgIAEgRABQAAgEgCgEgAhBBWIAAh7IAWAKIBGAAIAKgMIAZASIgFAEIgIACIAABYQAAAAAAAAQAAAAgBABQAAAAAAAAQgBABgBAAQgCACgEABIgHACIgEAAIAAgbIhKAAIAAAbQAAABgFACQgFADgGAAgAgtAsIBKAAIAAg+IhKAAgAhVhDIgCgKIB6AAIAOgSIAFAEIALAJIAMAKQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQgCABgEAAg");
	this.shape_319.setTransform(1485.425,344.45);

	this.shape_320 = new cjs.Shape();
	this.shape_320.graphics.f("#333333").s().p("AgHCPIAAi4QgbAlgiAgQgiAhgoAZIgEgEQAhgZAeghQAdgeAXgkQAWgjAMgjIiNAAIgDgJIDwAAIARgVIAFAEIAMAJIAOAMQgBABAAAAQAAABAAAAQgBABAAAAQAAAAgBABQgCABgEAAIhqAAIgMAYIgNAWIAQAHIgEADIgGACIAAC/QAAABgGACQgFACgFABgACDBBQgHgMgMgNQgLgNgPgNIgdgXIgcgUIADgDQAnAPAZAPQAYAPAMAOQAMAOADAKQACAKgFAEQgCACgEAAQgDAAgEgCg");
	this.shape_320.setTransform(1453.4417,344.25);

	this.shape_321 = new cjs.Shape();
	this.shape_321.graphics.f("#333333").s().p("AhYCSIAAiNQgLAYgPAVQgOAUgSASIgEgEQATgaAOggQANggAIgiIguAAIgCgJIA4AAIAAg3IgcAHIgdAGIgCgGQAUgGATgIQATgIASgJQAQgJAMgIIAbAUQgCADgEAAIgKgCIgRAGIgTAHIAAA+IARAAIANgSIAEADIAIAHIAJAIIAAglIAUAKIAtAAIAAhAIAiAEQAAAEgEADQgDACgHABIAAAyIAuAAIAMgNIAaAUIgGADIgIADIAAByIgDADIgHACQgEACgEAAIgCAAIAAgVIgyAAIAABjQgBADgEADQgFADgGAAIgEAAIAAhsIguAAIAAASQAAACgFACQgFADgGAAIgDAAIAAhnIgCABIgCAAIgvAAIAAAgQAZAKALALQALAMABAJQABAJgFAEQgGAEgHgGQgDgLgKgNQgIgNgKgJIAACMQAAACgEACQgGADgHAAgABEAcIAyAAIAAhfIgyAAgAACAcIAuAAIAAhfIguAAg");
	this.shape_321.setTransform(1422.65,343.875);

	this.shape_322 = new cjs.Shape();
	this.shape_322.graphics.f("#333333").s().p("AiFCKIAAkRIAXALIDPAAIAMgNIAZAUIgFAEIgJADIAADqQAAACgGADQgFADgGAAIgDAAIAAgkIjUAAIAAAiQAAADgFADQgFACgHAAgAhwBXIDUAAIAAg4IgOABIgVABIgYAAQgLAAgFgCQgFgCgCgFQgCgEAAgHIAAh/IgsAAQgBAcgCAYQgCAZgHAVQgGAUgOASQgOARgYAPIgFgGQATgPALgRQAMgRAFgUQAFgVABgXQABgXAAgaIg/AAgAAjhxIAAB5QAAADACACQACACAGAAIAVAAIANgBIAHAAIADAAIADAAIADgBIADgBIACAAIAAh+IhBAAg");
	this.shape_322.setTransform(1392.325,344.575);

	this.shape_323 = new cjs.Shape();
	this.shape_323.graphics.f("#333333").s().p("AiMCQIAAjhIAVAKIATAAIAAgsIguAAIgCgKIB2AAIAOgSIAFADIALAJIAKAKQAAABAAAAQAAABgBABQAAAAgBAAQAAABgBAAQgCABgDABIgwAAIAAAsIATAAIALgNIAYAUQgCACgDACIgIACIAAC9QAAACgGADQgFACgFAAIgDAAIAAgWIhgAAIAAAVQAAACgFACQgEACgHABgAh4BqIBgAAIAAgsIhgAAgAh4A1IBgAAIAAgoIgHABIgJAAIgJAAQgKABgCgEQgDgDAAgIIAAg9IgTAAIAAANQAAAMgCAOQgCAOgIANQgHAPgPALIgDgDgAh4AbQAKgNAEgNQAFgMABgNIABgYIAAgNIgVAAgAgwg9IAAA5IABAEIACAAIAGAAIAGAAIADAAIACAAIACAAIACAAIAAg9IgYAAgAhThHIATAAIAAgsIgTAAgAA0CHQgNAAgHgDQgHgBgCgFQgDgFAAgJIAAigIAYALIA9AAIAAhPIhVAAIgDgJIBUAAIAMgOIAbAVQgBACgFACQgEACgGABIAABpQAAAAAAAAQAAABAAAAQAAAAgBABQAAAAgBAAIgHADIgHABIgDAAIAAgbIhBAAIAACHQAAAEADACQADACAJAAIAgAAIAUAAIALgBIAEgBQABAAAAgBQAAAAABAAQAAgBAAAAQAAgBAAgBIADgKIAEgRIAEgVIAEAAIABAyIAHAFQACACgBACQABAFgFADQgFADgNACIgnABg");
	this.shape_323.setTransform(1329.905,344);

	this.shape_324 = new cjs.Shape();
	this.shape_324.graphics.f("#333333").s().p("AiCCOQAmgKAYgMQAXgMAMgOQALgOADgRIhRAAIgDgJIBXAAIACgPIAAgRIg0AAIgCgKIBgAAIANgPIAFADIAJAHIALAJQgBADgCABQgDACgDAAIgwAAIgCARIgCAPIA7AAIAOgSIAFADIALAJIALAKQAAABAAAAQgBABAAAAQAAABgBAAQAAABgBAAIgFABIheAAIgCAJIgDAJQArAIAZAKQAYALAKAKQAJAKAAAHQAAAHgHACQgHACgHgFQgMgOgZgPQgXgOgigNQgHANgQALQgPALgXAJQgYAJgkAIgAiVA7QAcgQAUgTQAWgUAPgWIhNAAIgDgJIBWAAIAJgQIAIgQIhIAAIgDgJIBPAAIAGgPIAFgQIhlAAIgDgJIBrAAIAEgTIAFgUIAiAIQgCAEgDACQgDACgFAAIgDALIgDAMIBZAAIAPgTIAGAEIAKAJIAMAKQAAABAAAAQAAABgBAAQAAABAAAAQgBABgBAAIgFABIh/AAIgEAQIgHAPIBXAAIAOgSIAFADIAKAJIAMAKIgDAEIgFABIh8AAIgIAQIgKAQICKAAIARgTIAEADIAMAKIAMAKQAAABAAAAQgBABAAAAQAAABgBAAQAAABAAAAIgHABIhRAAQAKAOAPALQAPALARAIQASAIARAEIAAAEQgIACgEAEQgGADgCAHQgZgLgVgUQgVgTgOgaIhaAAQgTAYgZAVQgaAVgkAPg");
	this.shape_324.setTransform(1298.8,343.825);

	this.shape_325 = new cjs.Shape();
	this.shape_325.graphics.f("#333333").s().p("AgbCUIAAiuIhfAAIgEgJIDQAAIAMgNIAZAUIgGADIgHACQgBAxgDAcQgDAdgJAHQgFAGgIACQgHADgLAAQABgEgCgEQgBgFgDgCIgLgFIgRgEIAAgFIAOACIAQABIAKAAIAGAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAABgBQAEgFACgZQACgZABgrIhaAAIAACnQAAACgGADQgEACgJAAgAg8gxIAAgsIhUAAIgDgJIBXAAIAAgtIAgADQAAADgDADQgDACgGABIAAAhIBPAAIAAgtIAgADQAAADgDADQgCACgHABIAAAhIAsAAIARgUIAEADIAMAKIAMALQgBACgDACIgFABIhQAAIAAAkQABACgGACQgEADgIAAIgDAAIAAgrIhPAAIAAAlQAAADgFACQgGACgGAAg");
	this.shape_325.setTransform(1267.65,343.7);

	this.shape_326 = new cjs.Shape();
	this.shape_326.graphics.f("#333333").s().p("AA6CJQgBgEgDgCQgEgDgGgCIgQgDIgQgDIAAgGIAWACIAWACIAPABQAFAAAEgBQACgBADgCQAFgFAEgOQAEgPADgWIAFgzIADg4IhkAAQgDAbgIAYQgJAagQAZQgRAZgbAXQgbAXgpAUIgEgFQAigWAYgVQAYgXAPgYQAPgYAHgZQAJgYADgZIh5AAIgCgJIB9AAIACgsIAAgsIAjADQgBAEgCADQgEACgFAAIgCAlQAAAUgDATIBhAAIAMgOIAZAVQgBACgEABIgJACQgBAggCAcQgCAdgEAYQgDAXgFARQgFAQgHAHQgHAIgKADQgLAEgNAAQAAgFgCgEgAAuA8QAAgMgGgNQgEgMgIgMQgHgLgIgIIAFgCQAbAOALAOQALAQABAMQABAMgHAFQgCABgDAAQgFAAgGgEgAhBhJQgDgKgFgKQgGgLgIgKQgHgJgIgIIAEgCQAbAKAMAOQANAMABALQABAKgHAFQgCACgDAAQgEAAgFgEg");
	this.shape_326.setTransform(1236.55,343.85);

	this.shape_327 = new cjs.Shape();
	this.shape_327.graphics.f("#333333").s().p("Ag5CTIAAiQIAZAKIB3AAIAKgMIAYARIgEADIgHACIAABzIgGADQgFACgHABIgEAAIAAgYIh9AAIAAAUQAAACgEADQgEACgJAAgAglBvIB9AAIAAhZIh9AAgAiTCMQATgYAJgcQAJgbADgdQADgdAAgcIAAhbIAbAJQAegFAggGQAdgHAcgHQAcgHATgHIAYAXQgDACgEgBQgEAAgGgCIg2AKQgeAFgfAEIhBAGIAAAxIC6AAIAQgVIAFAEIAMAJIANALQgBABAAAAQAAABAAAAQgBABAAAAQgBABAAAAQgDABgDABIjfAAIAAAQIgBAqQgCAWgGAWQgFAYgNAUQgLAWgUARg");
	this.shape_327.setTransform(1205.65,343.9);

	this.shape_328 = new cjs.Shape();
	this.shape_328.graphics.f("#333333").s().p("AiMCSIAAkcIAXALIAgAAIANgMIAYAXQgCACgDACIgJAAIgMAYIgOAbQgHAOgHAKQAWATAJASQAJATAAASQAAAXgJALQgJALgVAAIgBgJQAAgDgCgCQgCgCgEgCIgJgCIAAgEIAVAAIAEgBIAEgCQAEgCACgFQACgFAAgJQAAgRgGgRQgHgSgPgSIAJgYIAJgdIAIgcIglAAIAAEBIgEADQgFADgHAAgAhOB6IAVgPIAWgQIAAhkIgcAAIgCgKIAZAAIANgQIAaAXIgFADQgEACgGABIAABeIABAAIACACQAOARAUAGQAUAHAdgBIAjAAIAjgBIAAAFQgGABgDADQgDAFAAAFIg/AAQgUAAgPgDQgPgEgMgJQgLgJgKgOQgCgCgDAAQgCAAgCACIgKALIgMAPIgLANIAAAEIgCACgAAWBmIAAiWIgOAOIgNANIgFgDQALgNAKgSQAKgSAHgUIgnAAIgDgKIAtAAIAGgVIAEgVIAgAHQgBADgDABQgDACgFAAIgEAPIgFAOIAwAAIAOgSIAFADIALAJIALAKQAAABAAAAQAAABgBABQAAAAAAAAQgBABAAAAQgDACgDAAIhUAAIgIAOIgIAOIALAFIAzAAIAKgMIAZATIgFAEIgIADIAAB2QAAAJgCAFQgCAGgFAEQgGADgMABIgBgIIgDgGQgCgCgFgCIgMgDIAAgFIAGABIALABIAJAAQAAAAABAAQABAAAAAAQABgBAAAAQABAAAAgBQAAAAAAAAQABgBAAAAQAAgBAAgBQAAAAAAgBIAAgjIg6AAIAAA8QAAABgEACQgEADgHABgAAoAZIA6AAIAAghIg6AAgAAogSIA6AAIAAghIg6AAgAgeg9QgBgKgEgMQgDgMgFgMIgJgUIAEgBQAVAQAIAOQAJAPgBALQAAALgGADIgEABQgEAAgFgEg");
	this.shape_328.setTransform(1175.425,343.95);

	this.shape_329 = new cjs.Shape();
	this.shape_329.graphics.f("#333333").s().p("AgYAqQASgKAHgNQAHgMABgKIgNgFQgGgDgFgFQgEgFAAgJQAAgHAFgGQAFgGAKAAQALAAAGAJQAHAIAAANQgBAMgEAMQgEANgJAMQgJAMgQAIg");
	this.shape_329.setTransform(1132.6,357.275);

	this.shape_330 = new cjs.Shape();
	this.shape_330.graphics.f("#333333").s().p("AiCCOQAmgKAXgMQAYgMALgOQAMgOAEgRIhSAAIgDgJIBXAAIABgPIABgRIg0AAIgDgKIBgAAIAOgPIAEADIAKAHIAKAJQAAADgCABQgCACgEAAIgwAAIgBARIgDAPIA7AAIAOgSIAFADIAKAJIAMAKQAAABAAAAQgBABAAAAQAAABgBAAQAAABgBAAIgFABIheAAIgDAJIgCAJQArAIAYAKQAZALAKAKQAJAKAAAHQgBAHgGACQgGACgIgFQgNgOgXgPQgYgOgigNQgIANgOALQgQALgXAJQgYAJgjAIgAiWA7QAcgQAWgTQAUgUAQgWIhNAAIgDgJIBWAAIAJgQIAIgQIhJAAIgCgJIBQAAIAFgPIAFgQIhkAAIgEgJIBqAAIAGgTIADgUIAiAIQgBAEgDACQgDACgFAAIgDALIgEAMIBaAAIAQgTIAEAEIALAJIANAKQgBADgDABIgEABIh/AAIgGAQIgGAPIBXAAIAPgSIAEADIAKAJIANAKIgEAEIgFABIh8AAIgIAQIgKAQICKAAIAQgTIAGADIAKAKIANAKQAAABAAAAQgBABAAAAQAAABgBAAQAAABgBAAIgGABIhRAAQAKAOAPALQAPALASAIQARAIASAEIgBAEQgHACgGAEQgFADgCAHQgZgLgVgUQgVgTgOgaIhbAAQgRAYgbAVQgZAVgjAPg");
	this.shape_330.setTransform(1112.8,343.825);

	this.shape_331 = new cjs.Shape();
	this.shape_331.graphics.f("#333333").s().p("AgbCUIAAiuIhgAAIgCgJIDPAAIALgNIAZAUIgFADIgHACQgBAxgDAcQgEAdgHAHQgGAGgIACQgIADgKAAQABgEgCgEQAAgFgEgCIgLgFIgQgEIAAgFIANACIAPABIAKAAIAHAAQAAgBABAAQAAAAABAAQAAgBABAAQAAAAAAgBQAFgFACgZQACgZAAgrIhaAAIAACnQAAACgEADQgGACgIAAgAg8gxIAAgsIhUAAIgDgJIBXAAIAAgtIAgADQgBADgCADQgCACgHABIAAAhIBPAAIAAgtIAhADQgBADgDADQgCACgHABIAAAhIAsAAIAQgUIAGADIALAKIALALQAAABAAAAQAAABgBAAQAAABAAAAQgBABAAAAIgGABIhQAAIAAAkQAAACgEACQgFADgHAAIgEAAIAAgrIhPAAIAAAlQABADgGACQgGACgGAAg");
	this.shape_331.setTransform(1081.65,343.7);

	this.shape_332 = new cjs.Shape();
	this.shape_332.graphics.f("#333333").s().p("AiTB4IAPgLIAQgPIAPgMIAAhsIgtAAIgCgJIAqAAIAMgRIAcAXIgGADQgDACgHAAIAABlIACACIACABQAOAPASAJQARAIAWADQAVADAdAAIAjAAIAggBIAjgBIAAAEQgHACgEAFQgEAEgBAHIhcAAQgeAAgVgEQgVgFgRgKQgQgLgPgTQgDgEgCAAQgDABgCAEIgJANIgNARIgLARIAAAEIgCADgAgeBoIAAhwIAWAJIAmAAIAAgyIhWAAIgCgJIBYAAIAAgwIgkAFIgmADIgCgGIApgIIAogJIAlgLQASgFAMgGIAZAXQgCACgEAAQgFAAgGgCIgbAGIgfAGIAAAyIA1AAIAQgUIAFAFIALAJIAMALQAAAAAAABQAAAAgBABQAAAAgBABQAAAAgBAAIgGABIhYAAIAAAyIAmAAIAMgMIAaATIgFADIgJADIAABRIgDADIgHACIgHABIgEAAIAAgSIhmAAIAAAPQAAABgGACQgFADgGAAgAgJBKIBmAAIAAhAIhmAAgAhchFQgDgKgGgNQgHgMgIgLIgPgVIAEgCQAcAOAMAPQANAPABAKQACAMgGAEQgDACgDAAQgEAAgFgDg");
	this.shape_332.setTransform(1019.825,343.65);

	this.shape_333 = new cjs.Shape();
	this.shape_333.graphics.f("#333333").s().p("AAqCKQgBgDgDgCQgDgDgHgCQgGgCgKgBIAAgEIAFAAIALAAIAMABIAIAAQAEAAACgBQAAgBABAAQAAgBAAAAQAAgBAAAAQAAgBAAgBIAAiPIg/AAIgDgJIB/AAIANgOIAYAXQgBACgEABIgHABIgOAOIgQAPIgQAOIgEgCIAIgOIAJgPIAHgQIgnAAIAACQQAAAIgCAGQgDAGgGAEQgHAEgOABQAAgEgCgEgAh+CSIAAh1IAVAKIAVAAIAAgrIg6AAIgCgJIA8AAIAAgnIgkAAIgBgDQgNANgOAJIgEgDQAOgOAOgTQANgTAKgUQALgUAGgRIAhAKQgBACgDACQgDABgGAAQAYAJANAKQANAKADAIQAEAJgCAGQgDAFgFACQgFACgGgFQgEgLgKgOQgKgOgOgNQgIAPgNARQgNARgPAQIBAAAIANgQIAEADIAKAIIAKAJQAAABAAAAQgBABAAAAQAAABgBAAQAAABgBAAQgCABgDAAIgqAAIAAAnIAZAAIANgRIAFADIAJAJIALAJIgDAEIgFABIg3AAIAAArIAVAAIALgMIAZATIgFADIgIADIAABUIgDADIgHACIgHACIgCAAIAAgVIhDAAIAAARQgBACgFACQgFADgGAAgAhqBxIBDAAIAAhBIhDAAgABHgpQgEgIgHgKQgIgJgKgJIgSgPIADgDQAPAEALAFQALAFAHAFIASgUIAQgWIhqAAIgDgKIBvAAIANgNIAYAXQgBACgDAAIgIABIgQAPIgUAPIgUAOQAKAKABAIQACAJgFADQgDACgDAAQgDAAgEgCg");
	this.shape_333.setTransform(988.625,343.875);

	this.shape_334 = new cjs.Shape();
	this.shape_334.graphics.f("#333333").s().p("ABiCHQgBgEgEgDQgDgCgGgCIgRgEIAAgEIAFAAIAMABIANAAIAJABQAEAAABgBQACgCAAgEIAAj+IAgADQgBAEgCACQgDACgGABIAAD0QAAAJgCAGQgCAGgHAEQgHAFgPABIgCgJgAiQBtIAggEIAtgIIAAg+IhBAAIgCgKIBDAAIAAgsIAgACQAAAEgDACQgDACgFABIAAAhIAhAAIANgTIAFAEIALAJIALAKQAAABAAAAQAAABgBABQAAAAgBAAQAAABgBAAQgCABgDABIhBAAIAAA6IAogIIArgHIABAFIhEAVIhdAaIgDAFQgCACgDAAgAA1BLIAAjBIAfADQAAAEgDACQgCADgGAAIAACvQAAABgFADQgFACgGAAgAiFglIADgBIAFgCQAKgIALgNQALgMAJgOIAOgXIhFAAIgCgKICJAAIAOgTIAFAEIALAJIALAKQAAADgDABQgCACgDAAIhhAAIAdAMQgBACgDABIgIABIgRAUIgWAUIgWASIAegCIAmgDIArgDQgHgMgIgKQgIgKgJgIIAEgDQAcANAMAPQANAOACALQABANgFAEQgGAFgIgGIgCgKIgFgKIgyAKIhAAMIgDAFIgEACg");
	this.shape_334.setTransform(957.525,344.2);

	this.shape_335 = new cjs.Shape();
	this.shape_335.graphics.f("#333333").s().p("AgRCTIAAh7IhdAAIAAAXQAAACgGACQgEADgIAAIgDAAIAAiPIAXALIBbAAIAAhEIAgAEQAAAEgDACQgDACgFABIAAA3IBaAAIALgOIAbAVQgCACgDABIgIADIAABtIgEADIgHACIgHACIgEAAIAAgbIhdAAIAAByQgBADgEACQgGADgFABgAAEAPIBdAAIAAhUIhdAAgAhuAPIBdAAIAAhUIhdAAg");
	this.shape_335.setTransform(896.3,343.875);

	this.shape_336 = new cjs.Shape();
	this.shape_336.graphics.f("#333333").s().p("AhGCOQAngMAZgVQAYgUANgdIhcAAIgDgJIBiAAQAGgSADgXQADgVAAgaIAjAHQgBACgCABQgDACgGAAQgBAWgEASQgDAUgGAQIAyAAIAPgTIAEAEIALAJIAMAKQAAACgDACIgFABIhYAAQgOAggdAVQgcAWgwAMgACACPQgGgKgNgNQgMgMgPgLQgOgMgNgHIADgFQAlAMAUAOQAUAOAGALQAFALgEAHQgCADgEAAIgIgCgAh0BsQAHgDACgCQACgDAAgEIAAiTIgnAAIgCgJIAqAAIAKgMIAVASIgEADQgDADgFABIAACOIAUgLIAVgNIACAFIgVAUIgfAbQgBAFgCACIgFAEgAgHAqQgCgGgGgHQgFgGgHgGIgNgKIACgCQAXADALAIQAKAHABAIQACAHgEAEQgCACgDAAIgHgCgAAJAAQgDgEgFgGIgLgMIgOgJIADgEQAWADAKAHQALAIABAHQACAHgEADQgCACgEAAIgGgCgABigGIAHgSIAFgVIioAAIgDgJIBZAAIAAgkIhIAAIgCgKIBKAAIAAguIAgADQgBADgCADQgDACgGABIAAAiIApAAIAPgSIAFAEIALAIIALAKQAAAEgDABQgCABgDAAIhLAAIAAAkIA9AAIANgNIAYAXIgFACIgHACQgGAIgIALQgJAKgJAIgAhXhdQgDgIgGgJQgGgJgHgIIgNgQIADgCQAZAJAMALQALALABAJQACAJgGAEQgCACgDAAQgEAAgEgDg");
	this.shape_336.setTransform(864.625,343.95);

	this.shape_337 = new cjs.Shape();
	this.shape_337.graphics.f("#333333").s().p("AhYCSIAAiKQgLANgOALQgOAKgQAJIgDgEQAfgYAYgfQAYgfAQgjIhTAAIgDgJIBaAAIANggQAFgPAEgPIAiAJQgBADgDABQgCACgGAAIgIAXIgLAYIB3AAIARgUIAEAEIAMAJIAMAKQAAABAAABQgBAAAAABQAAAAgBABQAAAAAAABQgCABgEAAIihAAQgIAPgKAQQgKAPgMAPIAKAEQgCAEgHACIAACPQgBABgFADQgGACgFAAgAg3CBIgCgJIBTAAIAAhhIg/AAIgCgJIBBAAIAAhKIAgAEQAAADgDACQgCACgFABIAAA+IAkAAIAOgSIAFAEIALAIIALAKQAAAAAAABQgBAAAAABQAAAAgBAAQAAABAAAAQgDACgDAAIhFAAIAABhIA4AAIAPgTIAFAEIALAJIANALIgEADIgFABg");
	this.shape_337.setTransform(802.6,343.85);

	this.shape_338 = new cjs.Shape();
	this.shape_338.graphics.f("#333333").s().p("ACECRQgHgBgIgEQgIgFgHgGQgbgUgRgeQgRgegJglQgKgkgDgqIigAAIgDgKIChAAIgBghIgBgjIAjADQgBAEgCACQgDADgFABIAAAcIABAbIA9AAIAQgTIAFAEIALAJIAMAKQAAABAAABQgBAAAAABQAAAAgBABQAAAAgBAAQgCACgDAAIhhAAQAEAlAHAgQAJAiAPAaQAOAbAYARQAEAEACAAQACAAACgFIAHgQIAIgUIADABIgFAwQAHAJABAFQACAFgDACQgEAFgGAAIgBAAgAiLBzIAcgGIAogKIAAhjIg5AAIgCgKIBoAAIAOgSIAGAEIAJAIIALALIgCAEIgGABIg4AAIAABdIAjgJIAlgJIABAFIg7AXIhSAdQAAADgDACIgDADgABkhhQgFgGgGgHIgOgNIgQgKIADgDQAaADAMAHQANAIACAIQACAIgEAEQgDADgEAAIgGgCg");
	this.shape_338.setTransform(771.75,343.8523);

	this.shape_339 = new cjs.Shape();
	this.shape_339.graphics.f("#333333").s().p("AiKCQQAjgaAUgiQAUggAIgnQAIgnABgtIhgAAIgDgKID1AAIAQgUIAFAEIAMAJIANALQAAABgBABQAAAAAAABQgBAAAAAAQgBABAAAAQgDABgDABIidAAIgDAbIgDAaIBfAAIAMgNIAZAVIgFACIgJACQgBAkgDAdQgEAdgFAUQgGASgIAIQgHAHgIACQgKADgLAAQAAgEgCgFQgBgDgDgCQgFgEgKgCIgSgEIAAgGIARACIASABIAMABIAIgBQADAAADgDQAFgEAEgRQAEgSADgaQADgbACggIhjAAQgGAhgMAcQgNAegWAXQgWAXgiAUgAAGhaQgDgJgFgKQgGgKgIgKQgHgJgIgHIAEgCQAbAJALAMQANAMABAKQABAKgGAFQgCACgDAAQgEAAgFgDg");
	this.shape_339.setTransform(740.75,343.85);

	this.shape_340 = new cjs.Shape();
	this.shape_340.graphics.f("#333333").s().p("AApCTIAAhVIhMAAIgDgKIBPAAIAAg7Ig2AAIgDgJIA5AAIAAg1Ig+AAIgCgJIBWAAIAKgXIAJgXIAIgWIAiANQgBADgDABQgDABgFAAIgSAYIgWAaIAeAAIAPgTIAFADIAKAJIALAKQAAABAAABQAAAAAAABQgBABAAAAQAAAAgBABQgCABgEAAIhJAAIAAA1IAgAAIANgTIAGADIAKAJIALAKQAAABAAABQgBAAAAABQAAAAgBABQAAAAgBABIgFABIhAAAIAAA7IAxAAIAPgSIAFAEIAKAJIAMAKQAAABAAAAQgBABAAAAQAAABgBAAQAAAAgBAAQgCACgEAAIhSAAIAABOQAAACgFACQgEACgJABgAhdCSIAAiXQgLAWgNAVQgNAWgRARIgFgDQAUgdANgjQAOgjAGglIgnAAIgCgJIAvAAIAAhLIAeAEQAAADgDACQgCACgGACIAAA+IALAAIAPgSIAEADIALAJIALAKQgBADgDABIgEABIgsAAIAAAdQAXAKALALQAJAMABAIQAAAKgFADQgFAEgIgGQgCgLgIgMQgIgMgIgJIAACjQAAADgFACQgFACgGABgAAOhYQgCgJgEgJQgFgKgFgKIgLgQIADgDQAXAMAKAMQALAMAAAKQABAKgGAEIgFABQgFAAgFgEg");
	this.shape_340.setTransform(678.5,343.9);

	this.shape_341 = new cjs.Shape();
	this.shape_341.graphics.f("#333333").s().p("ABNCEQgCgDgEgCQgFgDgIgCQgIgDgOgBIAAgFIAHAAIAQACIARABIALABQAFAAACgDQADgBAAgFIAAjhIjPAAIAAD5QAAADgFACQgFADgGAAIgEAAIAAkVIAWALIDJAAIALgOIAbAVIgFAEIgJACIAADfQAAAIgCAHQgDAGgIAEQgIAEgRABQAAgEgCgEgAhBBWIAAh7IAWAKIBGAAIAKgMIAZASIgFAEIgIACIAABYQAAAAAAAAQAAAAgBABQAAAAAAAAQgBABgBAAQgCACgEABIgHACIgEAAIAAgbIhKAAIAAAbQAAABgFACQgFADgGAAgAgtAsIBKAAIAAg+IhKAAgAhVhDIgCgKIB6AAIAOgSIAFAEIALAJIAMAKQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQgCABgEAAg");
	this.shape_341.setTransform(648.425,344.45);

	this.shape_342 = new cjs.Shape();
	this.shape_342.graphics.f("#333333").s().p("AhYCHQAsgSAdgUQAcgVAQgXQARgYAIgdQAIgcADgjQACgiABgrIAiAEQAAAEgDACQgDACgGABIgDBAQgCAdgFAaQgGAYgLAVQAbARAQARQAPAQAGAOQAGAOgBALQgBAKgGACQgGADgIgFQgCgPgIgRQgIgQgLgPQgLgQgMgMQgLATgUASQgTARgbAPQgcAOgnANgAiEBYQAIgEACgCQACgDAAgFIAAjQIAhADQAAAEgDADQgDABgGABIAADEIAtgaIA1gfIABAEIgtAlQgcAWgkAZIgEAHIgEAEgAgNgnQgDgPgIgQQgIgSgKgQQgJgQgKgNIAEgCQAgAWAPAUQAOAVACAOQACAPgGAHQgCACgCAAQgFAAgGgFg");
	this.shape_342.setTransform(618.2571,344.55);

	this.shape_343 = new cjs.Shape();
	this.shape_343.graphics.f("#333333").s().p("AAJAlQAQgIAIgKQAHgLABgIQgNgDgHgFQgHgHAAgKQAAgIAFgGQAGgFAJAAQAKAAAGAIQAGAHAAAOQABAKgEAKQgEAMgJALQgKAKgQAHgAg3AlQAQgIAHgKQAHgLABgIQgMgDgHgFQgIgHAAgKQAAgIAFgGQAGgFAJAAQALAAAGAIQAGAHAAAOQAAAKgEAKQgEAMgJALQgJAKgQAHg");
	this.shape_343.setTransform(577.7778,333.2);

	this.shape_344 = new cjs.Shape();
	this.shape_344.graphics.f("#333333").s().p("AA2CSIAAhUIg4AAIgCgKIA6AAIAAg4IgwAAIgDgKIAzAAIAAg1Ig3AAIgDgJIBLAAIAJgWIAJgZIAHgWIAfAJQgBADgDABQgDACgFAAIgQAbIgUAbIAbAAIAOgSIAFAEIAKAIIAMAKQgBABAAAAQAAABgBAAQAAABAAAAQgBABAAAAQgCABgDAAIhAAAIAAA1IAXAAIAOgSIAFADIALAJIALALQAAAAAAABQAAAAgBABQAAAAAAABQgBAAAAAAQgCACgEAAIg4AAIAAA4IAiAAIAOgTIAFAEIALAJIALAKQgBADgCABQgCACgDAAIhDAAIAABOQgBABgEADQgFACgHAAgAiPBxIAjgFIAygJIA6gLIAAAGIg0ARIhIAWIgDAFIgEACgAiABTIAAiBIgIAIIgIAIIgFgDQAKgNAJgSQAKgRAIgUQAJgUAGgVIAeAJQgBADgDACIgIACIgFAKIgFAKIAmAAIANgMIAWAVQAAABgBAAQAAAAgBAAQAAABgBAAQAAAAgBAAIgIABIgKAMIgMAPIgNANIAhAAIAKgLIAUASIgFAEIgHACIAABwIgFADQgEACgGAAIgDAAIAAgJIhQAAIAAAKQAAABgEADQgEACgHAAgAg9A6IAfAAIAAgyIgfAAgAhuA6IAgAAIAAgyIggAAgAg9AAIAfAAIAAgsIgfAAgAhuAAIAgAAIAAgsIggAAgAhphNIgNASIANAFIAiAAIAKgVIAKgVIgrAAQgFAKgGAJgAAfhXQgBgJgFgKQgEgKgFgJIgMgQIAEgCQAWAMAKAMQAJAMAAAJQABAKgGADIgEACQgEAAgFgEg");
	this.shape_344.setTransform(523.725,343.875);

	this.shape_345 = new cjs.Shape();
	this.shape_345.graphics.f("#333333").s().p("AAPAmQgFgIgBgNQAAgKAEgLQAEgMAJgKQAJgLAQgHIAFAIQgQAIgHALQgHAKgBAJQAMADAIAFQAHAGAAALQAAAHgFAGQgGAFgJAAQgLAAgGgHgAgxAmQgGgIAAgNQgBgKAEgLQAEgMAJgKQAKgLAQgHIAFAIQgQAIgIALQgHAKgBAJQANADAHAFQAHAGAAALQAAAHgFAGQgGAFgJAAQgKAAgGgHg");
	this.shape_345.setTransform(500.6222,333.2);

	this.shape_346 = new cjs.Shape();
	this.shape_346.graphics.f("#333333").s().p("AhFB3IAAgTIAeghIAZgfQAQgTALgRQALgOAFgOQAGgOAAgOQgBgWgLgNQgMgNgUgBIgKABIgLACIgIAZQgDAKgDAEQgFAGgGAAQgFAAgEgDQgDgDgDgEQADgSAKgKQAKgMAOgFQAPgGAQAAQAVAAAOAIQAOAIAHANQAHAOAAASQAAAPgGANQgHAPgOARQgPATgYAaIgSAUIgZAbIB3AAIAAAYg");
	this.shape_346.setTransform(459.675,344.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_313},{t:this.shape_312},{t:this.shape_311},{t:this.shape_310},{t:this.shape_309},{t:this.shape_308},{t:this.shape_307},{t:this.shape_306},{t:this.shape_305},{t:this.shape_304},{t:this.shape_303},{t:this.shape_302},{t:this.shape_301},{t:this.shape_300},{t:this.shape_299},{t:this.shape_298},{t:this.shape_297},{t:this.shape_296},{t:this.shape_295},{t:this.shape_294},{t:this.shape_293,p:{x:1106.875,y:286.125}},{t:this.shape_292},{t:this.shape_291},{t:this.shape_290,p:{x:1203.175,y:285.475}},{t:this.shape_289},{t:this.shape_288},{t:this.shape_287},{t:this.shape_286},{t:this.shape_285,p:{x:473.625,y:342.575}},{t:this.shape_284},{t:this.shape_283},{t:this.shape_282},{t:this.shape_281,p:{x:591.575,y:332.125}},{t:this.shape_280},{t:this.shape_279},{t:this.shape_278},{t:this.shape_277},{t:this.shape_276},{t:this.shape_275},{t:this.shape_274},{t:this.shape_273},{t:this.shape_272},{t:this.shape_271},{t:this.shape_270},{t:this.shape_269},{t:this.shape_268},{t:this.shape_267},{t:this.shape_266},{t:this.shape_265},{t:this.shape_264},{t:this.shape_263},{t:this.shape_262},{t:this.shape_261},{t:this.shape_260,p:{x:1263.275,y:332.075}},{t:this.shape_259},{t:this.shape_258,p:{x:1327.575,y:332.125}},{t:this.shape_257},{t:this.shape_256},{t:this.shape_255},{t:this.shape_254,p:{x:1454.8667,y:332.1333}},{t:this.shape_253},{t:this.shape_252},{t:this.shape_251},{t:this.shape_250},{t:this.shape_249},{t:this.shape_248},{t:this.shape_247},{t:this.shape_246},{t:this.shape_245,p:{x:1743.575,y:332.125}},{t:this.shape_244},{t:this.shape_243},{t:this.shape_242},{t:this.instance_1},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238}]}).to({state:[]},128).to({state:[{t:this.shape_346},{t:this.shape_285,p:{x:472.475,y:354.325}},{t:this.shape_345},{t:this.shape_344},{t:this.shape_293,p:{x:554.425,y:343.875}},{t:this.shape_343},{t:this.shape_342},{t:this.shape_341},{t:this.shape_340},{t:this.shape_281,p:{x:710.425,y:343.875}},{t:this.shape_339},{t:this.shape_338},{t:this.shape_337},{t:this.shape_260,p:{x:834.125,y:343.825}},{t:this.shape_336},{t:this.shape_335},{t:this.shape_254,p:{x:926.7167,y:343.8833}},{t:this.shape_334},{t:this.shape_333},{t:this.shape_332},{t:this.shape_258,p:{x:1051.425,y:343.875}},{t:this.shape_331},{t:this.shape_330},{t:this.shape_329},{t:this.shape_328},{t:this.shape_327},{t:this.shape_326},{t:this.shape_325},{t:this.shape_324},{t:this.shape_323},{t:this.shape_290,p:{x:1360.725,y:343.225}},{t:this.shape_322},{t:this.shape_321},{t:this.shape_320},{t:this.shape_319},{t:this.shape_245,p:{x:1516.425,y:343.875}},{t:this.shape_318},{t:this.shape_317},{t:this.shape_316},{t:this.shape_315},{t:this.shape_314},{t:this.instance_2},{t:this.shape_241},{t:this.shape_240},{t:this.shape_239},{t:this.shape_238}]},4).wait(130));

	// bg
	this.shape_347 = new cjs.Shape();
	this.shape_347.graphics.f("#FFFFFF").s().p("EiLsBMwQhvAAhQhPQhPhPAAhwMAAAiRDQAAhwBPhPQBQhPBvAAMEXZAAAQBvAABPBPQBQBPAABwMAAACRDQAABwhQBPQhPBPhvAAg");
	this.shape_347.setTransform(959.9897,540.0003,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_347).wait(262));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(999,588.8,895.4000000000001,442.5);
// library properties:
lib.properties = {
	id: '14CB93263BA1D74EA5B3F38304C0AC64',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#AAD7E3",
	opacity: 1.00,
	manifest: [
		{src:"images/1配音练习_atlas_P_1.png?1689923744168", id:"1配音练习_atlas_P_1"},
		{src:"sounds/_11课一11.mp3?1689923744282", id:"_11课一11"},
		{src:"sounds/_11课一12.mp3?1689923744282", id:"_11课一12"},
		{src:"sounds/_11课一13.mp3?1689923744282", id:"_11课一13"},
		{src:"sounds/_11课一14.mp3?1689923744282", id:"_11课一14"},
		{src:"sounds/_11课一21.mp3?1689923744282", id:"_11课一21"},
		{src:"sounds/_11课一22.mp3?1689923744282", id:"_11课一22"},
		{src:"sounds/_11课一23.mp3?1689923744282", id:"_11课一23"},
		{src:"sounds/_11课一24.mp3?1689923744282", id:"_11课一24"}
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