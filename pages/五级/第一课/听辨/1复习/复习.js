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
	this.shape.setTransform(73.6167,48.1461,3.0692,3.0692);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_1.setTransform(56.9153,48.1845,3.0692,3.0692);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_2.setTransform(40.1082,48.137,3.0692,3.0692);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgYAYQgKgJAAgPQAAgOAKgKQALgKANAAQAOAAAKAKQALAKAAAOQAAAPgLAJQgKALgOAAQgNAAgLgLg");
	this.shape_3.setTransform(22.4825,48.1589,3.0692,3.0692);

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
	this.shape.setTransform(15.8207,52.0255,3.0697,3.0697);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28623").s().p("AgZA+QgCgDABgEQABgEAEgCQAOgHAHgNQAIgNAAgQQAAgOgIgNQgHgNgOgIQgDgCgBgEQgCgEACgDQACgEAEgBQAEgBAEACQARAKALARQALASAAAUQAAAVgLASQgLASgSAKIgEABQgHAAgCgGg");
	this.shape_1.setTransform(33.4878,52.0353,3.0698,3.0698);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28623").s().p("AgeBaQgFgJAIgFQATgLAKgVQALgUAAgYQAAgYgLgUQgKgUgSgMQgDgCgBgEQgBgEACgDQACgEAEgBQAEgBAEACQAVAOAOAZQANAZAAAdQAAAdgOAZQgNAZgWAOQgCACgDAAQgGAAgDgFg");
	this.shape_2.setTransform(50.3376,52.1146,3.0699,3.0699);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28623").s().p("AgkCDQgCgEABgEQAAgEAEgCQAYgRANggQAOgfAAglQAAgkgOgfQgNgfgXgSQgEgCAAgEQgBgEACgEQADgDAEgBQAEAAADACQAbAUAQAkQAQAjAAApQAAAqgQAkQgRAjgbAUQgDACgCAAQgGAAgDgEg");
	this.shape_3.setTransform(67.0833,52.108,3.0701,3.0701);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape,p:{scaleX:3.0697,scaleY:3.0697,x:15.8207,y:52.0255}}]}).to({state:[{t:this.shape,p:{scaleX:3.0698,scaleY:3.0698,x:15.8584,y:52.0572}},{t:this.shape_1,p:{scaleX:3.0698,scaleY:3.0698,x:33.4878,y:52.0353}}]},8).to({state:[{t:this.shape,p:{scaleX:3.0699,scaleY:3.0699,x:15.8961,y:52.089}},{t:this.shape_1,p:{scaleX:3.0699,scaleY:3.0699,x:33.5262,y:52.0671}},{t:this.shape_2,p:{scaleX:3.0699,scaleY:3.0699,x:50.3376,y:52.1146}}]},9).to({state:[{t:this.shape,p:{scaleX:3.0701,scaleY:3.0701,x:15.9338,y:52.1208}},{t:this.shape_1,p:{scaleX:3.0701,scaleY:3.0701,x:33.5647,y:52.0989}},{t:this.shape_2,p:{scaleX:3.0701,scaleY:3.0701,x:50.3769,y:52.1464}},{t:this.shape_3}]},9).wait(8));

	// 图层_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AqGKGIAA0LIUNAAIAAULg");
	this.shape_4.setTransform(42.275,52.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(34));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.4,-12.6,129.4,129.3);


(lib.对 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_11 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(11).call(this.frame_11).wait(54));

	// 图层_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AguLfIAA29IBdAAIAAW9g");
	var mask_graphics_1 = new cjs.Graphics().p("AhVLfIAA29ICrAAIAAW9g");
	var mask_graphics_2 = new cjs.Graphics().p("Ah9LfIAA29ID7AAIAAW9g");
	var mask_graphics_3 = new cjs.Graphics().p("AikLfIAA29IFJAAIAAW9g");
	var mask_graphics_4 = new cjs.Graphics().p("AjMLfIAA29IGZAAIAAW9g");
	var mask_graphics_5 = new cjs.Graphics().p("AjzLfIAA29IHnAAIAAW9g");
	var mask_graphics_6 = new cjs.Graphics().p("AkbLfIAA29II3AAIAAW9g");
	var mask_graphics_7 = new cjs.Graphics().p("AlDLfIAA29IKGAAIAAW9g");
	var mask_graphics_8 = new cjs.Graphics().p("AlqLfIAA29ILVAAIAAW9g");
	var mask_graphics_9 = new cjs.Graphics().p("AmSLfIAA29IMlAAIAAW9g");
	var mask_graphics_10 = new cjs.Graphics().p("Am5LfIAA29INzAAIAAW9g");
	var mask_graphics_11 = new cjs.Graphics().p("AnhLfIAA29IPDAAIAAW9g");
	var mask_graphics_53 = new cjs.Graphics().p("AnhLfIAA29IPDAAIAAW9g");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-40.5,y:-0.775}).wait(1).to({graphics:mask_graphics_1,x:-36.55,y:-0.775}).wait(1).to({graphics:mask_graphics_2,x:-32.575,y:-0.775}).wait(1).to({graphics:mask_graphics_3,x:-28.625,y:-0.775}).wait(1).to({graphics:mask_graphics_4,x:-24.675,y:-0.775}).wait(1).to({graphics:mask_graphics_5,x:-20.725,y:-0.775}).wait(1).to({graphics:mask_graphics_6,x:-16.75,y:-0.775}).wait(1).to({graphics:mask_graphics_7,x:-12.8,y:-0.775}).wait(1).to({graphics:mask_graphics_8,x:-8.85,y:-0.775}).wait(1).to({graphics:mask_graphics_9,x:-4.9,y:-0.775}).wait(1).to({graphics:mask_graphics_10,x:-0.925,y:-0.775}).wait(1).to({graphics:mask_graphics_11,x:3.025,y:-0.775}).wait(42).to({graphics:mask_graphics_53,x:3.025,y:-0.775}).wait(1).to({graphics:null,x:0,y:0}).wait(11));

	// 图层_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#39B54A").s().p("AiHFKIgKgCIgLgCIgKgEQgLgEgDgDQgOgKgFgFQgMgLgKgPIgKgXQgPghgWgfQgeglgnggIgVgOQgPgJgJgPIgGgPQgFgSAFgRIAGgQQAHgLAKgHQAJgIAOgDQAMgFAOADQAOABAKAHQAbAQAeAaQAnAhAnA0QAMARANAWIAuhKQAmg6AlgvQAvhAAsgwQAsgvAwgrQA3gxBCgwQAPgIASAAIASACQAQAFAMAMIALANQAHAMAAAMQADANgEAOQgDANgIAJQgIALgLAGIgfAYQgeAXgXAUQgxArgtAwQgoAqgmAvIgtA/QgrA+gpBIIgbAsQgKAOgFAFQgQARgaAJQgKAEgMAAIgDAAg");
	this.shape.setTransform(5.4143,4.5025);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(53).to({_off:true},1).wait(11));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.7,-28.5,78.30000000000001,66);


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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("AhcCQIAAiMQgIAZgLAWQgLAWgLAPIgFgKIgHgKQAJgMAJgRQAKgRAIgUQAIgSAGgTIgrAAIAAgUIAuAAIAAg2IgRAEIgSADIgDgIIgEgIIAfgHIAegJQANgEALgFIANARIgRAGIgTAGIAAA7IApAAIAAAUIgpAAIAAAIIAJAMIALAPIALAQIAHALIgNASIgHgNIgJgRIgJgQIAACRgAgmCIIAAgUIBUAAIAAgvIg/AAIAAgUIA/AAIAAgrIhGAAIAAgTICjAAIAAATIhIAAIAAArIBCAAIAAAUIhCAAIAAAvIBPAAIAAAUgAgSgqIAAhdICSAAIAABdgAABg8IBqAAIAAg4IhqAAg");
	this.shape.setTransform(204,24.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AhgCTIAAiLIDEAAIAACLIgWAAIAAgMIiZAAIAAAMgAhLB1ICZAAIAAglIiZAAgAhLA+ICZAAIAAgjIiZAAgAiNgTIAAgUIBSAAQgCgLgFgNQgFgNgHgLIAUgFQAFAIAEAJQAFAIADAJIAFAQIgOADIBXAAIAJgRIAIgUIAHgRIAWAGIgLAYIgNAYIBTAAIAAAUgAh6hfIAAgTIB0AAIgFgOIgHgOIATgEIAKAQIAHAQIBsAAIAAATg");
	this.shape_1.setTransform(172.2,24.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AiFCLIgJgGQARgSAJgTQAIgTADgUQADgUAAgRIAAgqIDgAAIAABoIgVAAIAAgQIi7AAQgDAVgKAVQgJAVgSASIgHgIgAAQAvIBVAAIAAgyIhVAAgAhRAUIgBAOIgBANIBPAAIAAgyIhNAAgAhugvIAAgTIBqAAIAAghIh9AAIAAgTIB9AAIAAgcIAUAAIAAAcIB/AAIAAATIh/AAIAAAhIBxAAIAAATg");
	this.shape_2.setTransform(139.575,24.25);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AhDCQIAAiQQgIASgKATQgKASgKAPQgLAQgKALIgGgKIgGgKQAMgMAMgSQANgSALgVQALgTAHgVIg7AAIAAgUIBAAAIAAg3IgbAEIgbADIgDgIIgCgJIAsgGQAWgEAUgFQAUgFAOgGIAOARIgYAHIgdAIIAAA7IA4AAIAAAUIg4AAIAAAJIAMANIAQASIAQASIAJANIgNASIgKgQIgPgVIgPgUIAACQgAAWCDIAAj4IB1AAIAAD2IgWAAIAAgZIhKAAIAAAbgAArBUIBKAAIAAi0IhKAAg");
	this.shape_3.setTransform(107.05,24.3);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("ABQCSIAAhRIgqAAIAAgSIAqAAIAAgvIgvAAIAAgSIA/AAIAHgUIAHgWIAFgUIASAEIgKAeIgKAcIAhAAIAAASIguAAIAAAvIApAAIAAASIgpAAIAABRgAiECKQgEgEgEgDQAPgKAJgMQAHgNAEgNQADgOABgNIgnAAIAAgSIAnAAIAAgnIgrAAIAAgSIA9AAIAGgTIAGgWIADgTIASAEIgIAdIgJAbIAcAAIAAASIgqAAIAAAnIAnAAIAAASIgnAAQgCAPgEARQgDAQgKAPQgKAPgQALIgGgHgAgqCJIgHgHQAZgVANgZQAMgZADgcQAEgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgGAWgNAUQgMATgUARIgHgHgAgmAPQAEgMADgQQADgQACgRIABghIAQACQAAAQgCARQgBASgDARQgCAQgFANgAA6glIgDgTIgHgTIARgCIAGASIAEASIACARIgRADIgCgQgAh4glIgDgTIgGgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAtAAIgJgSIgIgSIASgFIAKAVIAJAUIAjAAIAAASgAAmhUIAAgSIAuAAIgIgTIgJgTIARgFIAMAVIAJAWIAkAAIAAASg");
	this.shape_4.setTransform(76.25,24.225);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.6)").s().p("ABLCRIAAimIhCAAQAAAYgEAeQgDAdgHAdQgJAdgSAYIgIgIIgKgGQARgXAJgcQAHgcADgcQADgbgBgZIAAhTIArgJIApgLQAUgGANgGIASARQgPAGgTAFIgoAKIgoAJIAAA3ICCAAIAAAVIgrAAIAACmgAiKBcIAAjQIBWAAIAAC3IhCAAIAAAZgAh2AvIAtAAIAAiPIgtAAg");
	this.shape_5.setTransform(44.65,24.275);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_6.setTransform(23.85,34.675);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,0,0,0.6)").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_7.setTransform(10.625,24.425);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#F7C677").s().p("AhcCQIAAiMQgIAZgLAWQgLAWgLAPIgFgKIgHgKQAJgMAJgRQAKgRAIgUQAIgSAGgTIgrAAIAAgUIAuAAIAAg2IgRAEIgSADIgDgIIgEgIIAfgHIAegJQANgEALgFIANARIgRAGIgTAGIAAA7IApAAIAAAUIgpAAIAAAIIAJAMIALAPIALAQIAHALIgNASIgHgNIgJgRIgJgQIAACRgAgmCIIAAgUIBUAAIAAgvIg/AAIAAgUIA/AAIAAgrIhGAAIAAgTICjAAIAAATIhIAAIAAArIBCAAIAAAUIhCAAIAAAvIBPAAIAAAUgAgSgqIAAhdICSAAIAABdgAABg8IBqAAIAAg4IhqAAg");
	this.shape_8.setTransform(204,24.325);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#F7C677").s().p("AhgCTIAAiLIDEAAIAACLIgWAAIAAgMIiZAAIAAAMgAhLB1ICZAAIAAglIiZAAgAhLA+ICZAAIAAgjIiZAAgAiNgTIAAgUIBSAAQgCgLgFgNQgFgNgHgLIAUgFQAFAIAEAJQAFAIADAJIAFAQIgOADIBXAAIAJgRIAIgUIAHgRIAWAGIgLAYIgNAYIBTAAIAAAUgAh6hfIAAgTIB0AAIgFgOIgHgOIATgEIAKAQIAHAQIBsAAIAAATg");
	this.shape_9.setTransform(172.2,24.075);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#F7C677").s().p("AiFCLIgJgGQARgSAJgTQAIgTADgUQADgUAAgRIAAgqIDgAAIAABoIgVAAIAAgQIi7AAQgDAVgKAVQgJAVgSASIgHgIgAAQAvIBVAAIAAgyIhVAAgAhRAUIgBAOIgBANIBPAAIAAgyIhNAAgAhugvIAAgTIBqAAIAAghIh9AAIAAgTIB9AAIAAgcIAUAAIAAAcIB/AAIAAATIh/AAIAAAhIBxAAIAAATg");
	this.shape_10.setTransform(139.575,24.25);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#F7C677").s().p("AhDCQIAAiQQgIASgKATQgKASgKAPQgLAQgKALIgGgKIgGgKQAMgMAMgSQANgSALgVQALgTAHgVIg7AAIAAgUIBAAAIAAg3IgbAEIgbADIgDgIIgCgJIAsgGQAWgEAUgFQAUgFAOgGIAOARIgYAHIgdAIIAAA7IA4AAIAAAUIg4AAIAAAJIAMANIAQASIAQASIAJANIgNASIgKgQIgPgVIgPgUIAACQgAAWCDIAAj4IB1AAIAAD2IgWAAIAAgZIhKAAIAAAbgAArBUIBKAAIAAi0IhKAAg");
	this.shape_11.setTransform(107.05,24.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#F7C677").s().p("ABQCSIAAhRIgqAAIAAgSIAqAAIAAgvIgvAAIAAgSIA/AAIAHgUIAHgWIAFgUIASAEIgKAeIgKAcIAhAAIAAASIguAAIAAAvIApAAIAAASIgpAAIAABRgAiECKQgEgEgEgDQAPgKAJgMQAHgNAEgNQADgOABgNIgnAAIAAgSIAnAAIAAgnIgrAAIAAgSIA9AAIAGgTIAGgWIADgTIASAEIgIAdIgJAbIAcAAIAAASIgqAAIAAAnIAnAAIAAASIgnAAQgCAPgEARQgDAQgKAPQgKAPgQALIgGgHgAgqCJIgHgHQAZgVANgZQAMgZADgcQAEgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgGAWgNAUQgMATgUARIgHgHgAgmAPQAEgMADgQQADgQACgRIABghIAQACQAAAQgCARQgBASgDARQgCAQgFANgAA6glIgDgTIgHgTIARgCIAGASIAEASIACARIgRADIgCgQgAh4glIgDgTIgGgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAtAAIgJgSIgIgSIASgFIAKAVIAJAUIAjAAIAAASgAAmhUIAAgSIAuAAIgIgTIgJgTIARgFIAMAVIAJAWIAkAAIAAASg");
	this.shape_12.setTransform(76.25,24.225);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#F7C677").s().p("ABLCRIAAimIhCAAQAAAYgEAeQgDAdgHAdQgJAdgSAYIgIgIIgKgGQARgXAJgcQAHgcADgcQADgbgBgZIAAhTIArgJIApgLQAUgGANgGIASARQgPAGgTAFIgoAKIgoAJIAAA3ICCAAIAAAVIgrAAIAACmgAiKBcIAAjQIBWAAIAAC3IhCAAIAAAZgAh2AvIAtAAIAAiPIgtAAg");
	this.shape_13.setTransform(44.65,24.275);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#F7C677").s().p("AgNAPQgGgFAAgJQAAgJAGgGQAFgFAIgBQAJABAFAFQAGAGAAAJQAAAJgGAFQgFAGgJAAQgIAAgFgGg");
	this.shape_14.setTransform(23.85,34.675);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#F7C677").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_15.setTransform(10.625,24.425);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8}]},2).wait(2));

	// 图层_2
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_16.setTransform(114.675,22.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.7,-4.8,236.79999999999998,55.199999999999996);


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
	this.shape.graphics.f("rgba(0,0,0,0.6)").s().p("Ah/CQQAAgFgCgGQgBgGgDgEIAWACIAPAAIAHgBQACgBACgCQADgCACgKQADgKABgTIAEgxIhDAAIACgcIABgeIABggIA/AAIAAgzIhGAAIAAgTIBaAAIAABZIhBAAIgBAbIgBAZIBEAAIAAAEIgBAGIgEA8QgCAYgDANQgDAMgEAEQgEAEgFADQgEABgHABIgQABIgXgBgAB3CBIgGgNIg+AGIgoAEIgXADIgNACIgHADIgDgKIgEgLQAGgBAIgIIATgSIAVgYIAhgpIgjAEIgUACIgLACIgGABIgDgKIgEgKQAEgBAFgFIAKgKQAEgEAHgKIAOgXQAJgOAHgPIhDAAIAAgUIBXAAIgKgWIgNgXIASgGIAPAWQAGAMAEAKIgSAHIBbAAIAAAUIhZAAQgLAVgOAUQgNAVgOAQIA+gFIARgXIAQgYIAUALQgcAogeAkQgeAmgeAdIBqgJIgNgYIgPgWIASgHIAUAdQAJAPAIAQQAIAPAEAMIgTAIIgFgMg");
	this.shape.setTransform(241.375,24.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.6)").s().p("AhDCQIAAiQQgIASgKATQgKASgKAPQgLAQgKALIgFgKIgHgKQAMgMANgSQAMgSALgVQAKgTAIgVIg6AAIAAgUIA/AAIAAg3IgbAEIgbADIgCgIIgEgJIAsgGQAXgEAUgFQAUgFAOgGIAOARIgYAHIgeAIIAAA7IA5AAIAAAUIg5AAIAAAJIANANIAQASIAPASIAKANIgMASIgLgQIgPgVIgQgUIAACQgAAWCDIAAj4IB1AAIAAD2IgVAAIAAgZIhLAAIAAAbgAArBUIBLAAIAAi0IhLAAg");
	this.shape_1.setTransform(211.05,24.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.6)").s().p("AiJB2IAAgVIETAAIAAAVgAhiAHIAAgUIDCAAIAAAUgAh2hfIAAgWIDvAAIAAAWg");
	this.shape_2.setTransform(183.125,24.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.6)").s().p("AgIAGQgTgSgSgPIAUgQIAXAWIAYAYIAYAYIgUARQgQgUgSgSg");
	this.shape_3.setTransform(144.45,33.65);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.6)").s().p("AhcCQIAAiMQgJAZgKAWQgLAWgKAPIgGgKIgHgKQAKgMAIgRQAKgRAIgUQAIgSAGgTIgrAAIAAgUIAuAAIAAg2IgSAEIgRADIgDgIIgEgIIAfgHIAegJQAOgEAKgFIANARIgRAGIgTAGIAAA7IApAAIAAAUIgpAAIAAAIIAJAMIALAPIALAQIAIALIgOASIgHgNIgJgRIgJgQIAACRgAgmCIIAAgUIBUAAIAAgvIg/AAIAAgUIA/AAIAAgrIhGAAIAAgTICjAAIAAATIhIAAIAAArIBBAAIAAAUIhBAAIAAAvIBPAAIAAAUgAgSgqIAAhdICSAAIAABdgAACg8IBpAAIAAg4IhpAAg");
	this.shape_4.setTransform(125,24.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.6)").s().p("AhfCTIAAiLIDDAAIAACLIgWAAIAAgMIiYAAIAAAMgAhKB1ICYAAIAAglIiYAAgAhKA+ICYAAIAAgjIiYAAgAiMgTIAAgUIBSAAQgCgLgGgNQgFgNgHgLIAUgFQAGAIAEAJQAEAIADAJIAEAQIgNADIBWAAIAJgRIAJgUIAGgRIAYAGIgNAYIgMAYIBSAAIAAAUgAh6hfIAAgTIB1AAIgGgOIgIgOIAVgEIAJAQIAGAQIBtAAIAAATg");
	this.shape_5.setTransform(96.2,24.075);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.6)").s().p("ABQCSIAAhRIgqAAIAAgSIAqAAIAAgvIgvAAIAAgSIA/AAIAHgUIAHgWIAFgUIASAEIgKAeIgKAcIAhAAIAAASIguAAIAAAvIApAAIAAASIgpAAIAABRgAiECKQgEgEgEgDQAPgKAJgMQAHgNAEgNQADgOABgNIgnAAIAAgSIAnAAIAAgnIgrAAIAAgSIA9AAIAGgTIAGgWIADgTIASAEIgIAdIgJAbIAcAAIAAASIgqAAIAAAnIAnAAIAAASIgnAAQgCAPgEARQgDAQgKAPQgKAPgQALIgGgHgAgqCJIgHgHQAZgVANgZQAMgZADgcQAEgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgGAWgNAUQgMATgUARIgHgHgAgmAPQAEgMADgQQADgQACgRIABghIAQACQAAAQgCARQgBASgDARQgCAQgFANgAA6glIgDgTIgHgTIARgCIAGASIAEASIACARIgRADIgCgQgAh4glIgDgTIgGgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAtAAIgIgSIgJgSIASgFIAKAVIAJAUIAjAAIAAASgAAmhUIAAgSIAuAAIgIgTIgJgTIARgFIAMAVIAJAWIAkAAIAAASg");
	this.shape_6.setTransform(67.25,24.225);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,0,0,0.6)").s().p("ABKCRIAAimIhBAAQAAAYgDAeQgEAdgIAdQgIAdgSAYIgJgIIgJgGQARgXAIgcQAJgcACgcQACgbAAgZIAAhTIAqgJIAqgLQAUgGANgGIATARQgQAGgTAFIgoAKIgoAJIAAA3ICBAAIAAAVIgqAAIAACmgAiJBcIAAjQIBVAAIAAC3IhBAAIAAAZgAh1AvIAtAAIAAiPIgtAAg");
	this.shape_7.setTransform(38.65,24.275);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(0,0,0,0.6)").s().p("AgNAPQgFgFgBgJQABgJAFgGQAGgFAHgBQAIABAGAFQAGAGgBAJQABAJgGAFQgGAGgIAAQgHAAgGgGg");
	this.shape_8.setTransform(20.85,34.675);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(0,0,0,0.6)").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_9.setTransform(11.15,24.65);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(241,171,78,0.4)").s().p("Ah/CQQAAgFgCgGQgBgGgDgEIAWACIAPAAIAHgBQACgBACgCQADgCACgKQADgKABgTIAEgxIhDAAIACgcIABgeIABggIA/AAIAAgzIhGAAIAAgTIBaAAIAABZIhBAAIgBAbIgBAZIBEAAIAAAEIgBAGIgEA8QgCAYgDANQgDAMgEAEQgEAEgFADQgEABgHABIgQABIgXgBgAB3CBIgGgNIg+AGIgoAEIgXADIgNACIgHADIgDgKIgEgLQAGgBAIgIIATgSIAVgYIAhgpIgjAEIgUACIgLACIgGABIgDgKIgEgKQAEgBAFgFIAKgKQAEgEAHgKIAOgXQAJgOAHgPIhDAAIAAgUIBXAAIgKgWIgNgXIASgGIAPAWQAGAMAEAKIgSAHIBbAAIAAAUIhZAAQgLAVgOAUQgNAVgOAQIA+gFIARgXIAQgYIAUALQgcAogeAkQgeAmgeAdIBqgJIgNgYIgPgWIASgHIAUAdQAJAPAIAQQAIAPAEAMIgTAIIgFgMg");
	this.shape_10.setTransform(241.375,24.15);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(241,171,78,0.4)").s().p("AhDCQIAAiQQgIASgKATQgKASgKAPQgLAQgKALIgFgKIgHgKQAMgMANgSQAMgSALgVQAKgTAIgVIg6AAIAAgUIA/AAIAAg3IgbAEIgbADIgCgIIgEgJIAsgGQAXgEAUgFQAUgFAOgGIAOARIgYAHIgeAIIAAA7IA5AAIAAAUIg5AAIAAAJIANANIAQASIAPASIAKANIgMASIgLgQIgPgVIgQgUIAACQgAAWCDIAAj4IB1AAIAAD2IgVAAIAAgZIhLAAIAAAbgAArBUIBLAAIAAi0IhLAAg");
	this.shape_11.setTransform(211.05,24.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(241,171,78,0.4)").s().p("AiJB2IAAgVIETAAIAAAVgAhiAHIAAgUIDCAAIAAAUgAh2hfIAAgWIDvAAIAAAWg");
	this.shape_12.setTransform(183.125,24.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(241,171,78,0.4)").s().p("AgIAGQgTgSgSgPIAUgQIAXAWIAYAYIAYAYIgUARQgQgUgSgSg");
	this.shape_13.setTransform(144.45,33.65);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(241,171,78,0.4)").s().p("AhcCQIAAiMQgJAZgKAWQgLAWgKAPIgGgKIgHgKQAKgMAIgRQAKgRAIgUQAIgSAGgTIgrAAIAAgUIAuAAIAAg2IgSAEIgRADIgDgIIgEgIIAfgHIAegJQAOgEAKgFIANARIgRAGIgTAGIAAA7IApAAIAAAUIgpAAIAAAIIAJAMIALAPIALAQIAIALIgOASIgHgNIgJgRIgJgQIAACRgAgmCIIAAgUIBUAAIAAgvIg/AAIAAgUIA/AAIAAgrIhGAAIAAgTICjAAIAAATIhIAAIAAArIBBAAIAAAUIhBAAIAAAvIBPAAIAAAUgAgSgqIAAhdICSAAIAABdgAACg8IBpAAIAAg4IhpAAg");
	this.shape_14.setTransform(125,24.325);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(241,171,78,0.4)").s().p("AhfCTIAAiLIDDAAIAACLIgWAAIAAgMIiYAAIAAAMgAhKB1ICYAAIAAglIiYAAgAhKA+ICYAAIAAgjIiYAAgAiMgTIAAgUIBSAAQgCgLgGgNQgFgNgHgLIAUgFQAGAIAEAJQAEAIADAJIAEAQIgNADIBWAAIAJgRIAJgUIAGgRIAYAGIgNAYIgMAYIBSAAIAAAUgAh6hfIAAgTIB1AAIgGgOIgIgOIAVgEIAJAQIAGAQIBtAAIAAATg");
	this.shape_15.setTransform(96.2,24.075);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(241,171,78,0.4)").s().p("ABQCSIAAhRIgqAAIAAgSIAqAAIAAgvIgvAAIAAgSIA/AAIAHgUIAHgWIAFgUIASAEIgKAeIgKAcIAhAAIAAASIguAAIAAAvIApAAIAAASIgpAAIAABRgAiECKQgEgEgEgDQAPgKAJgMQAHgNAEgNQADgOABgNIgnAAIAAgSIAnAAIAAgnIgrAAIAAgSIA9AAIAGgTIAGgWIADgTIASAEIgIAdIgJAbIAcAAIAAASIgqAAIAAAnIAnAAIAAASIgnAAQgCAPgEARQgDAQgKAPQgKAPgQALIgGgHgAgqCJIgHgHQAZgVANgZQAMgZADgcQAEgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgGAWgNAUQgMATgUARIgHgHgAgmAPQAEgMADgQQADgQACgRIABghIAQACQAAAQgCARQgBASgDARQgCAQgFANgAA6glIgDgTIgHgTIARgCIAGASIAEASIACARIgRADIgCgQgAh4glIgDgTIgGgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAtAAIgIgSIgJgSIASgFIAKAVIAJAUIAjAAIAAASgAAmhUIAAgSIAuAAIgIgTIgJgTIARgFIAMAVIAJAWIAkAAIAAASg");
	this.shape_16.setTransform(67.25,24.225);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(241,171,78,0.4)").s().p("ABKCRIAAimIhBAAQAAAYgDAeQgEAdgIAdQgIAdgSAYIgJgIIgJgGQARgXAIgcQAJgcACgcQACgbAAgZIAAhTIAqgJIAqgLQAUgGANgGIATARQgQAGgTAFIgoAKIgoAJIAAA3ICBAAIAAAVIgqAAIAACmgAiJBcIAAjQIBVAAIAAC3IhBAAIAAAZgAh1AvIAtAAIAAiPIgtAAg");
	this.shape_17.setTransform(38.65,24.275);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(241,171,78,0.4)").s().p("AgNAPQgFgFgBgJQABgJAFgGQAGgFAHgBQAIABAGAFQAGAGgBAJQABAJgGAFQgGAGgIAAQgHAAgGgGg");
	this.shape_18.setTransform(20.85,34.675);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(241,171,78,0.4)").s().p("Ag+B1IAAgVIA0AAIAAizIgpAAIAAgSQAPgCAMgEQALgEAKgFIASAAIAADUIAwAAIAAAVg");
	this.shape_19.setTransform(11.15,24.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},1).wait(3));

	// 图层_2
	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#FFFFFF").s().p("AyfEUIAAonMAk/AAAIAAIng");
	this.shape_20.setTransform(118.425,18.625);

	this.timeline.addTween(cjs.Tween.get(this.shape_20).wait(4));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-9,256.4,57);


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
	this.shape.graphics.f("#CC3300").s().p("ADZEqQgOgDgJgJQgLgIgHgMIgHgJQgkgugkgpQglgrgogpIgtgvIgZAeIgQAVQghAugdA3QgKAPgPAJIgQAHQgSAFgSgFIgQgHQgMgGgHgLQgKgLgCgMQgFgOAEgNQAAgOAIgLIAGgNQAagvAiguQAbglAcggIgTgRQglgfgrgiIgtgiQgPgIgKgQIgGgRQgFgRAFgTIAGgQQAHgMALgHQAKgIANgEQANgEAOADQANABAMAHIANAJQBAAvAyArIAsAlIALgJQAzgsAxggQAugfAzgZQAQgJASAAIASADQARAEANANIALAOQAHALABAOQADANgFAOQgDANgJAKQgHALgMAGIgjATQg5Afg3AqIgeAZIAuAuQArAsArAzQAuA2AtA7QAJAQABASIgDASQgFASgMAMIgOALQgLAHgOABIgLABQgIAAgIgCg");
	this.shape.setTransform(30.275,29.9981);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.元件1, new cjs.Rectangle(0,0,60.6,60), null);


(lib._2B = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#333333").s().p("AhgC2IAAivQgOAfgTAcQgUAcgZAXIgFgFQAZghATgoQASgoAKgrIhCAAIgEgLIBRAAIAAhOIgpAHIgpAGIgBgHQAagGAdgKIA2gTQAZgKASgJIAeAbQgCADgFAAQgFAAgHgDIgaAHIgcAIIAABUIAgAAIASgYIAFAEIAOAMIANANQAAADgDACQgDABgFAAIhHAAIAAAZQAhAOARAOQAPAPADAMQACAMgHAFQgFAEgLgGQgDgKgJgLQgHgLgKgLIgSgSIAAC4QAAACgHADQgFADgKAAgAAUCiIAAknIAcAMIBUAAIAOgRIAiAbQgBACgGADQgEACgHABIAAD7QgBABgHADQgHADgHAAIgEAAIAAgpIhaAAIAAAmQAAADgHADQgFAEgJAAgAAuBnIBaAAIAAjUIhaAAg");
	this.shape.setTransform(110.65,32.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AhbCxQAfgaATgcQATgdALghQALghADgjQAFgkABgnIhDAAIgDgMIBGAAIAAgrIAAgtIAqADQgBAFgDADQgDADgIABIAAAlIgBAkIA9AAIAQgSIAfAaQgDADgEACQgEABgGABQgBBogGA9QgGA8gNAQQgIAJgLAFQgLAEgOAAQAAgGgCgFQgBgGgEgCQgEgEgLgEIgXgEIABgHIATACIAUABIAOABIAJgBQADgBADgDQAGgHAFgdQAEgdACgvQACgvABhAIhBAAQgBAogGAlQgFAlgNAiQgLAhgYAeQgXAeglAYgAiKC2IAAjvIgtAAIgDgMIAwAAIAAhxIAmAEQAAAEgDADQgDACgHABIAABjIAOAAIARgVIAGAEIAMALIAOAMQgBADgDABQgCACgEAAIg1AAIAADlQAAADgHAEQgGADgHAAgAhNBFQgFgBgEgFQgDgFACgGQADgHAGgFQAHgGAIgMQAIgMAGgNQAGgPACgQIAGABQAEAXgCASQgDARgGAOQgGANgHAHQgEAFgGACQgFADgFAAIgCAAgACiA8QgBgPgFgPQgFgQgHgOQgHgPgIgMIAFgCQAdAVAMASQAMAUAAAOQgBAPgHAEQgDACgDAAQgFAAgGgFg");
	this.shape_1.setTransform(71.125,32.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgSATQgHgIAAgLQAAgKAHgIQAHgIALAAQAMAAAHAIQAHAIAAAKQAAALgHAIQgHAHgMABQgLgBgHgHg");
	this.shape_2.setTransform(34.375,45.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AhxCSIAAgOIApgFIABg6IAAg6IAAgVIAAg7IgBg6IgpgEIAAgOIB3AAQAtABAZASQAXAUAAAgQABAYgQASQgRATgjAIQArAFAUATQAUAUAAAcQAAAVgMASQgMARgYALQgZAMgnAAgAgmBFIABA9IAhAAQApAAAVgQQAVgRAAgeQAAgfgVgRQgWgQguAAIgcAAIAABCgAgmhIIAAA8IAaAAQAnAAATgPQAVgPgBgfQABgdgSgOQgRgNgkABIghAAIgBA4g");
	this.shape_3.setTransform(15.55,33.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AqGDWIAAmrIUOAAIAAGrg");
	this.shape_4.setTransform(66.7,33.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,182.9,61.5);


(lib._2A = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#333333").s().p("AhgC2IAAivQgNAfgUAcQgUAcgZAXIgFgFQAaghASgoQASgoAKgrIhCAAIgEgLIBRAAIAAhOIgpAHIgpAGIgCgHQAcgGAcgKIA2gTQAagKAQgJIAfAbQgCADgEAAQgGAAgHgDIgaAHIgdAIIAABUIAhAAIASgYIAFAEIAOAMIAOANQgCADgCACQgDABgFAAIhIAAIAAAZQAjAOAQAOQAPAPADAMQACAMgHAFQgGAEgJgGQgFgKgIgLQgHgLgKgLIgTgSIAAC4QAAACgFADQgHADgJAAgAAUCiIAAknIAcAMIBUAAIAOgRIAiAbQgBACgGADQgFACgGABIAAD7QgBABgHADQgHADgHAAIgEAAIAAgpIhaAAIAAAmQAAADgGADQgHAEgIAAgAAuBnIBaAAIAAjUIhaAAg");
	this.shape.setTransform(113.55,32.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AhbCxQAfgaATgcQATgdALghQALghADgjQAFgkABgnIhDAAIgDgMIBGAAIAAgrIAAgtIAqADQgBAFgDADQgDADgIABIAAAlIgBAkIA9AAIAQgSIAfAaQgDADgEACQgEABgGABQgBBogGA9QgGA8gNAQQgIAJgLAFQgLAEgOAAQAAgGgCgFQgBgGgEgCQgEgEgLgEIgXgEIABgHIATACIAUABIAOABIAJgBQADgBADgDQAGgHAFgdQAEgdACgvQACgvABhAIhBAAQgBAogGAlQgFAlgNAiQgLAhgYAeQgXAeglAYgAiKC2IAAjvIgtAAIgDgMIAwAAIAAhxIAmAEQAAAEgDADQgDACgHABIAABjIAOAAIARgVIAGAEIAMALIAOAMQgBADgDABQgCACgEAAIg1AAIAADlQAAADgHAEQgGADgHAAgAhNBFQgFgBgEgFQgDgFACgGQADgHAGgFQAHgGAIgMQAIgMAGgNQAGgPACgQIAGABQAEAXgCASQgDARgGAOQgGANgHAHQgEAFgGACQgFADgFAAIgCAAgACiA8QgBgPgFgPQgFgQgHgOQgHgPgIgMIAFgCQAdAVAMASQAMAUAAAOQgBAPgHAEQgDACgDAAQgFAAgGgFg");
	this.shape_1.setTransform(74.025,32.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgSATQgHgIAAgLQAAgKAHgIQAHgIALAAQAMAAAHAIQAHAIAAAKQAAALgHAIQgHAHgMABQgLgBgHgHg");
	this.shape_2.setTransform(37.275,45.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AAZCTIAAgOIAsgEIgahQIhnAAIgZBPIApAFIAAAOIhfAAIAAgOIAkgFIBckSIAVAAIBfETIAkAEIAAAOgAAlAgIgtiJIguCJIBbAAg");
	this.shape_3.setTransform(16.35,33.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AqGDWIAAmrIUOAAIAAGrg");
	this.shape_4.setTransform(66.7,33.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,182.9,61.5);


(lib._1B = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#333333").s().p("AhgC2IAAivQgOAfgTAcQgUAcgZAXIgFgFQAZghATgoQASgoAKgrIhCAAIgEgLIBRAAIAAhOIgpAHIgpAGIgBgHQAagGAdgKIA2gTQAZgKASgJIAeAbQgCADgFAAQgFAAgHgDIgaAHIgcAIIAABUIAgAAIASgYIAFAEIAOAMIANANQAAADgDACQgDABgFAAIhHAAIAAAZQAhAOARAOQAPAPADAMQACAMgHAFQgFAEgLgGQgDgKgJgLQgHgLgKgLIgSgSIAAC4QAAACgHADQgFADgKAAgAAUCiIAAknIAcAMIBUAAIAOgRIAiAbQgBACgGADQgEACgHABIAAD7QgBABgHADQgHADgHAAIgEAAIAAgpIhaAAIAAAmQAAADgHADQgFAEgJAAgAAuBnIBaAAIAAjUIhaAAg");
	this.shape.setTransform(110.65,32.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AhbCxQAfgaATgcQATgdALghQALghADgjQAFgkABgnIhDAAIgDgMIBGAAIAAgrIAAgtIAqADQgBAFgDADQgDADgIABIAAAlIgBAkIA9AAIAQgSIAfAaQgDADgEACQgEABgGABQgBBogGA9QgGA8gNAQQgIAJgLAFQgLAEgOAAQAAgGgCgFQgBgGgEgCQgEgEgLgEIgXgEIABgHIATACIAUABIAOABIAJgBQADgBADgDQAGgHAFgdQAEgdACgvQACgvABhAIhBAAQgBAogGAlQgFAlgNAiQgLAhgYAeQgXAeglAYgAiKC2IAAjvIgtAAIgDgMIAwAAIAAhxIAmAEQAAAEgDADQgDACgHABIAABjIAOAAIARgVIAGAEIAMALIAOAMQgBADgDABQgCACgEAAIg1AAIAADlQAAADgHAEQgGADgHAAgAhNBFQgFgBgEgFQgDgFACgGQADgHAGgFQAHgGAIgMQAIgMAGgNQAGgPACgQIAGABQAEAXgCASQgDARgGAOQgGANgHAHQgEAFgGACQgFADgFAAIgCAAgACiA8QgBgPgFgPQgFgQgHgOQgHgPgIgMIAFgCQAdAVAMASQAMAUAAAOQgBAPgHAEQgDACgDAAQgFAAgGgFg");
	this.shape_1.setTransform(71.125,32.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgSATQgHgIAAgLQAAgKAHgIQAHgIALAAQAMAAAHAIQAHAIAAAKQAAALgHAIQgHAHgMABQgLgBgHgHg");
	this.shape_2.setTransform(34.375,45.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AhxCSIAAgOIApgFIABg6IAAg6IAAgVIAAg7IgBg6IgpgEIAAgOIB3AAQAtABAZASQAXAUAAAgQABAYgQASQgRATgjAIQArAFAUATQAUAUAAAcQAAAVgMASQgMARgYALQgZAMgnAAgAgmBFIABA9IAhAAQApAAAVgQQAVgRAAgeQAAgfgVgRQgWgQguAAIgcAAIAABCgAgmhIIAAA8IAaAAQAnAAATgPQAVgPgBgfQABgdgSgOQgRgNgkABIghAAIgBA4g");
	this.shape_3.setTransform(15.55,33.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AqGDWIAAmrIUOAAIAAGrg");
	this.shape_4.setTransform(66.7,33.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,182.9,61.5);


(lib._1A = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#333333").s().p("AhgC2IAAivQgNAfgUAcQgUAcgZAXIgFgFQAaghASgoQASgoAKgrIhCAAIgEgLIBRAAIAAhOIgpAHIgpAGIgCgHQAcgGAcgKIA2gTQAagKAQgJIAfAbQgCADgEAAQgGAAgHgDIgaAHIgdAIIAABUIAhAAIASgYIAFAEIAOAMIAOANQgCADgCACQgDABgFAAIhIAAIAAAZQAjAOAQAOQAPAPADAMQACAMgHAFQgGAEgJgGQgFgKgIgLQgHgLgKgLIgTgSIAAC4QAAACgFADQgHADgJAAgAAUCiIAAknIAcAMIBUAAIAOgRIAiAbQgBACgGADQgFACgGABIAAD7QgBABgHADQgHADgHAAIgEAAIAAgpIhaAAIAAAmQAAADgGADQgHAEgIAAgAAuBnIBaAAIAAjUIhaAAg");
	this.shape.setTransform(113.55,32.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#333333").s().p("AhbCxQAfgaATgcQATgdALghQALghADgjQAFgkABgnIhDAAIgDgMIBGAAIAAgrIAAgtIAqADQgBAFgDADQgDADgIABIAAAlIgBAkIA9AAIAQgSIAfAaQgDADgEACQgEABgGABQgBBogGA9QgGA8gNAQQgIAJgLAFQgLAEgOAAQAAgGgCgFQgBgGgEgCQgEgEgLgEIgXgEIABgHIATACIAUABIAOABIAJgBQADgBADgDQAGgHAFgdQAEgdACgvQACgvABhAIhBAAQgBAogGAlQgFAlgNAiQgLAhgYAeQgXAeglAYgAiKC2IAAjvIgtAAIgDgMIAwAAIAAhxIAmAEQAAAEgDADQgDACgHABIAABjIAOAAIARgVIAGAEIAMALIAOAMQgBADgDABQgCACgEAAIg1AAIAADlQAAADgHAEQgGADgHAAgAhNBFQgFgBgEgFQgDgFACgGQADgHAGgFQAHgGAIgMQAIgMAGgNQAGgPACgQIAGABQAEAXgCASQgDARgGAOQgGANgHAHQgEAFgGACQgFADgFAAIgCAAgACiA8QgBgPgFgPQgFgQgHgOQgHgPgIgMIAFgCQAdAVAMASQAMAUAAAOQgBAPgHAEQgDACgDAAQgFAAgGgFg");
	this.shape_1.setTransform(74.025,32.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#333333").s().p("AgSATQgHgIAAgLQAAgKAHgIQAHgIALAAQAMAAAHAIQAHAIAAAKQAAALgHAIQgHAHgMABQgLgBgHgHg");
	this.shape_2.setTransform(37.275,45.925);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#333333").s().p("AAZCTIAAgOIAsgEIgahQIhnAAIgZBPIApAFIAAAOIhfAAIAAgOIAkgFIBckSIAVAAIBfETIAkAEIAAAOgAAlAgIgtiJIguCJIBbAAg");
	this.shape_3.setTransform(16.35,33.325);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#333333").s().p("AqGDWIAAmrIUOAAIAAGrg");
	this.shape_4.setTransform(66.7,33.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_4}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,182.9,61.5);


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


(lib.错 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.元件1();
	this.instance.setTransform(-0.05,0,1,1,0,0,0,30.2,30);
	this.instance.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:30.3,x:0.05,alpha:0.1111},0).wait(1).to({alpha:0.2222},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.4444},0).wait(1).to({alpha:0.5556},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.7778},0).wait(1).to({alpha:0.8889},0).wait(1).to({alpha:1},0).wait(21));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.2,-30,60.5,60);


// stage content:
(lib.复习 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,lnav2:6,m2_1:12,"1A":111,"1B":161,m2_2:208,"2A":318,"2B":373};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,6,12,88,112,160,162,207,208,216,300,319,372,374,413];
	this.streamSoundSymbolsList[12] = [{id:"yx52010101听辨和声音程题目",startFrame:12,endFrame:112,loop:1,offset:0}];
	this.streamSoundSymbolsList[112] = [{id:"victory",startFrame:112,endFrame:161,loop:1,offset:0}];
	this.streamSoundSymbolsList[162] = [{id:"fail",startFrame:162,endFrame:208,loop:1,offset:0}];
	this.streamSoundSymbolsList[216] = [{id:"yx52010102听辨和声音程题目",startFrame:216,endFrame:319,loop:1,offset:0}];
	this.streamSoundSymbolsList[319] = [{id:"victory",startFrame:319,endFrame:374,loop:1,offset:0}];
	this.streamSoundSymbolsList[374] = [{id:"fail",startFrame:374,endFrame:414,loop:1,offset:0}];
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
	}
	this.frame_6 = function() {
		this.stop();
		
		
		
		var _this = this;
		
		
		
		_this.m2_1playbtn.on('click', function(){
		_this.gotoAndPlay('m2_1');
		});
		
		
		
		_this.m2_2playbtn.on('click', function(){
		_this.gotoAndPlay('m2_2');
		});
		
		
		
		
		
		_this.A1.on('click', function(){
		
		_this.gotoAndPlay('1A');
		});
		
		
		
		
		_this.A2.on('click', function(){
		
		_this.gotoAndPlay('2A');
		});
		
		
		_this.B1.on('click', function(){
		
		_this.gotoAndPlay('1B');
		});
		
		
		
		
		_this.B2.on('click', function(){
		
		_this.gotoAndPlay('2B');
		});
	}
	this.frame_12 = function() {
		var soundInstance = playSound("yx52010101听辨和声音程题目",0);
		this.InsertIntoSoundStreamData(soundInstance,12,112,1);
		var _this = this;
		/*
		单击指定元件实例时将执行相应函数。
		*/
		_this.m2_1stopbtn.on('click', function(){
		/*
		将播放头移动到时间轴中的指定帧标签并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav2');
		});
	}
	this.frame_88 = function() {
		this.gotoAndStop('lnav2');
	}
	this.frame_112 = function() {
		var soundInstance = playSound("victory",0);
		this.InsertIntoSoundStreamData(soundInstance,112,161,1);
	}
	this.frame_160 = function() {
		this.stop();
	}
	this.frame_162 = function() {
		var soundInstance = playSound("fail",0);
		this.InsertIntoSoundStreamData(soundInstance,162,208,1);
	}
	this.frame_207 = function() {
		this.gotoAndStop('lnav2');
	}
	this.frame_208 = function() {
		var _this = this;
		/*
		单击指定元件实例时将执行相应函数。
		*/
		_this.m2_2stopbtn.on('click', function(){
		/*
		将播放头移动到时间轴中的指定帧标签并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav2');
		});
	}
	this.frame_216 = function() {
		var soundInstance = playSound("yx52010102听辨和声音程题目",0);
		this.InsertIntoSoundStreamData(soundInstance,216,319,1);
	}
	this.frame_300 = function() {
		this.gotoAndStop('lnav2');
	}
	this.frame_319 = function() {
		var soundInstance = playSound("victory",0);
		this.InsertIntoSoundStreamData(soundInstance,319,374,1);
	}
	this.frame_372 = function() {
		this.stop();
	}
	this.frame_374 = function() {
		var soundInstance = playSound("fail",0);
		this.InsertIntoSoundStreamData(soundInstance,374,414,1);
	}
	this.frame_413 = function() {
		this.gotoAndStop('lnav2');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(6).call(this.frame_6).wait(6).call(this.frame_12).wait(76).call(this.frame_88).wait(24).call(this.frame_112).wait(48).call(this.frame_160).wait(2).call(this.frame_162).wait(45).call(this.frame_207).wait(1).call(this.frame_208).wait(8).call(this.frame_216).wait(84).call(this.frame_300).wait(19).call(this.frame_319).wait(53).call(this.frame_372).wait(2).call(this.frame_374).wait(39).call(this.frame_413).wait(1));

	// leftnav_on
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E28624").s().p("Ah/CPQAAgFgCgFQgBgGgDgEIAWABIAPAAIAHAAQACAAACgDQADgDACgKQADgJABgTIAEgxIhDAAIACgbIABggIABgfIA/AAIAAgzIhGAAIAAgTIBaAAIAABaIhBAAIgBAbIgBAYIBEAAIAAAEIgBAGIgEA9QgCAXgDANQgDALgEAFQgEAEgFACQgEACgHABIgQAAIgXgBgAB3CBIgGgNIg+AGIgoAEIgXADIgNACIgHACIgDgKIgEgKQAGgCAIgHIATgSIAVgZQAPgRASgWIgjACIgUADIgLACIgGABIgDgJIgEgKQAEgCAFgEIAKgLQAEgEAHgKIAOgYQAJgNAHgPIhDAAIAAgUIBXAAQgDgKgHgMIgNgXIASgHIAPAXQAGAMAEAJIgSAIIBbAAIAAAUIhZAAQgLAVgOAVQgNATgOARIA+gEIARgXIAQgZIAUAKQgcAogeAlQgeAmgeAcIBqgJIgNgXIgPgWIASgIIAUAeQAJAPAIAPQAIAPAEAMIgTAJIgFgMg");
	this.shape.setTransform(343.675,442.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E28624").s().p("AhDCQIAAiQQgIASgJASQgKASgLAQQgLAQgKALIgGgKIgGgJQANgNALgSQANgSALgUQAKgVAIgUIg6AAIAAgUIA/AAIAAg3IgbAEIgbAEIgDgJIgCgJIAsgGIAqgJQAUgFAOgGIAOARIgYAIIgeAHIAAA7IA5AAIAAAUIg5AAIAAAIIANAPIAQARIAQASIAJANIgMARIgLgPIgPgVIgQgUIAACQgAAWCDIAAj4IB1AAIAAD1IgWAAIAAgXIhKAAIAAAagAArBUIBKAAIAAi0IhKAAg");
	this.shape_1.setTransform(313.35,442.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E28624").s().p("AiJB2IAAgVIETAAIAAAVgAhiAHIAAgUIDCAAIAAAUgAh2hgIAAgVIDvAAIAAAVg");
	this.shape_2.setTransform(285.425,442.65);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E28624").s().p("AgIAGQgTgTgSgNIATgRIAZAVIAYAYIAWAaIgTAQQgQgTgSgTg");
	this.shape_3.setTransform(246.75,451.75);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E28624").s().p("AhcCQIAAiMQgIAZgLAWQgLAWgLAPIgFgKIgHgKQAJgMAKgRQAJgRAIgUQAIgSAGgTIgrAAIAAgUIAuAAIAAg2IgRAEIgSADIgDgIIgEgIIAfgHIAegJQAOgEAJgFIAOARIgRAGIgTAGIAAA7IAoAAIAAAUIgoAAIAAAIIAJAMIALAPIALAQIAHALIgNASIgHgNIgJgRIgJgQIAACRgAgmCIIAAgUIBUAAIAAgvIg/AAIAAgUIA/AAIAAgrIhGAAIAAgTICjAAIAAATIhIAAIAAArIBCAAIAAAUIhCAAIAAAvIBPAAIAAAUgAgSgqIAAhdICSAAIAABdgAABg8IBqAAIAAg4IhqAAg");
	this.shape_4.setTransform(227.3,442.425);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E28624").s().p("AhgCTIAAiLIDEAAIAACLIgWAAIAAgMIiYAAIAAAMgAhKB1ICYAAIAAglIiYAAgAhKA+ICYAAIAAgjIiYAAgAiNgTIAAgUIBSAAQgBgLgGgNQgFgNgHgLIAUgFQAFAIAFAJQAEAIADAJIAFAQIgOADIBWAAIAJgRIAJgUIAHgRIAWAGIgMAYIgMAYIBTAAIAAAUgAh6hfIAAgTIB0AAIgFgOIgHgOIATgEIAJAQIAIAQIBsAAIAAATg");
	this.shape_5.setTransform(198.5,442.175);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E28624").s().p("ABPCSIAAhRIgpAAIAAgSIApAAIAAgvIguAAIAAgSIA/AAIAIgUIAGgWIAFgUIASAEIgKAeIgKAcIAhAAIAAASIgvAAIAAAvIAqAAIAAASIgqAAIAABRgAiECKQgDgEgEgDQAOgKAIgMQAIgNAEgNQADgOABgNIgnAAIAAgSIAnAAIAAgnIgsAAIAAgSIA+AAIAGgTIAFgWIAFgTIASAEIgJAdIgIAbIAbAAIAAASIgqAAIAAAnIAoAAIAAASIgpAAQgBAPgDARQgFAQgJAPQgKAPgQALIgGgHgAgpCJIgHgHQAZgVAMgZQALgZAFgcQADgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgHAWgMAUQgMATgVARIgFgHgAgmAPQAEgMADgQQADgQABgRIACghIAPACQABAQgCARQAAASgDARQgEAQgEANgAA7glIgFgTIgFgTIAQgCIAFASIAFASIADARIgSADIgBgQgAh4glIgDgTIgGgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAtAAIgIgSIgJgSIASgFIALAVIAJAUIAiAAIAAASgAAmhUIAAgSIAvAAIgIgTIgKgTIASgFIALAVIAJAWIAkAAIAAASg");
	this.shape_6.setTransform(169.55,442.325);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#E28624").s().p("ABLCRIAAimIhCAAQAAAYgEAeQgDAdgHAdQgJAdgSAYIgIgIIgKgGQARgXAJgcQAHgcADgcQADgbgBgZIAAhTIArgJIApgLQAUgGANgGIASARQgPAGgTAFIgoAKIgoAJIAAA3ICCAAIAAAVIgrAAIAACmgAiKBcIAAjQIBWAAIAAC3IhCAAIAAAZgAh2AvIAtAAIAAiPIgtAAg");
	this.shape_7.setTransform(140.95,442.375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#E28624").s().p("AgNAPQgGgFABgJQgBgJAGgGQAGgFAHgBQAIABAGAFQAFAGAAAJQAAAJgFAFQgGAGgIAAQgHAAgGgGg");
	this.shape_8.setTransform(123.15,452.775);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#E28624").s().p("Ag+B1IAAgVIA1AAIAAizIgqAAIAAgRQAPgDAMgEQAMgDAJgGIATAAIAADUIAvAAIAAAVg");
	this.shape_9.setTransform(113.45,442.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#E28624").s().p("AhcCQIAAiMQgJAZgKAWQgLAWgKAPIgHgKIgGgKQAJgMAJgRQAKgRAIgUQAIgSAGgTIgrAAIAAgUIAuAAIAAg2IgSAEIgRADIgDgIIgDgIIAegHIAegJQANgEALgFIANARIgRAGIgTAGIAAA7IApAAIAAAUIgpAAIAAAIIAJAMIALAPIALAQIAIALIgPASIgGgNIgJgRIgJgQIAACRgAgmCIIAAgUIBUAAIAAgvIg+AAIAAgUIA+AAIAAgrIhGAAIAAgTICjAAIAAATIhIAAIAAArIBBAAIAAAUIhBAAIAAAvIBPAAIAAAUgAgSgqIAAhdICSAAIAABdgAACg8IBpAAIAAg4IhpAAg");
	this.shape_10.setTransform(308.25,506.075);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#E28624").s().p("AhgCTIAAiLIDEAAIAACLIgWAAIAAgMIiYAAIAAAMgAhKB1ICYAAIAAglIiYAAgAhKA+ICYAAIAAgjIiYAAgAiNgTIAAgUIBTAAQgDgLgFgNQgFgNgHgLIAUgFQAFAIAFAJQAEAIADAJIAEAQIgNADIBWAAIAJgRIAJgUIAHgRIAWAGIgMAYIgMAYIBTAAIAAAUgAh6hfIAAgTIB0AAIgFgOIgIgOIAUgEIAJAQIAHAQIBtAAIAAATg");
	this.shape_11.setTransform(276.45,505.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#E28624").s().p("AiFCLIgJgHQARgRAJgTQAIgUADgTQADgTAAgSIAAgqIDgAAIAABpIgVAAIAAgRIi7AAQgDAWgKAVQgJAUgSASIgHgIgAAQAwIBVAAIAAgzIhVAAgAhRAUIgBANIgBAPIBPAAIAAgzIhNAAgAhugwIAAgSIBqAAIAAghIh9AAIAAgUIB9AAIAAgbIAUAAIAAAbIB/AAIAAAUIh/AAIAAAhIBxAAIAAASg");
	this.shape_12.setTransform(243.825,506);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#E28624").s().p("AhDCQIAAiQQgIASgJASQgKASgLAQQgLAQgKALIgFgKIgHgJQANgNAMgSQAMgSALgVQAKgTAIgVIg6AAIAAgUIA/AAIAAg3IgbAEIgbADIgDgIIgDgJIAsgGQAXgEAUgFQAUgFAOgGIAOARIgYAIIgeAHIAAA7IA5AAIAAAUIg5AAIAAAJIANANIAQASIAQASIAJANIgMASIgLgQIgPgVIgQgUIAACQgAAWCDIAAj4IB1AAIAAD2IgWAAIAAgYIhKAAIAAAagAArBUIBKAAIAAi0IhKAAg");
	this.shape_13.setTransform(211.3,506.05);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#E28624").s().p("ABQCSIAAhRIgqAAIAAgSIAqAAIAAgvIguAAIAAgSIA/AAIAHgUIAGgWIAFgUIASAEIgJAeIgKAcIAfAAIAAASIguAAIAAAvIAqAAIAAASIgqAAIAABRgAiECKQgDgEgFgDQAPgKAIgMQAJgNACgNQAEgOABgNIgnAAIAAgSIAnAAIAAgnIgrAAIAAgSIA9AAIAGgTIAFgWIAEgTIASAEIgIAdIgIAbIAcAAIAAASIgrAAIAAAnIAnAAIAAASIgnAAQgBAPgFARQgDAQgKAPQgJAPgRALIgGgHgAgqCJIgGgHQAYgVANgZQALgZAFgcQADgcAAgcIAAh1IASAAIAAB1QAAAYgCAWQgCAYgGAVQgGAWgMAUQgNATgVARIgGgHgAgmAPQAFgMACgQQADgQABgRIACghIAQACQAAAQgBARQgBASgEARQgDAQgEANgAA7glIgFgTIgGgTIAQgCIAHASIAEASIADARIgRADIgCgQgAh4glIgEgTIgFgTIAQgDIAGASIAEATIACARIgRADIgCgQgAiNhUIAAgSIAsAAIgIgSIgIgSIASgFIALAVIAJAUIAiAAIAAASgAAlhUIAAgSIAvAAIgHgTIgKgTIARgFIAMAVIAKAWIAjAAIAAASg");
	this.shape_14.setTransform(180.5,505.975);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#E28624").s().p("ABKCRIAAimIhBAAQAAAYgDAeQgEAdgIAdQgIAdgSAYIgJgIIgJgGQARgXAIgcQAJgcACgcQACgbAAgZIAAhTIAqgJIAqgLQAUgGANgGIATARQgQAGgTAFIgoAKIgoAJIAAA3ICBAAIAAAVIgqAAIAACmgAiJBcIAAjQIBVAAIAAC3IhBAAIAAAZgAh1AvIAtAAIAAiPIgtAAg");
	this.shape_15.setTransform(148.9,506.025);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#E28624").s().p("AgNAPQgGgFABgJQgBgJAGgGQAGgFAHgBQAIABAGAFQAFAGABAJQgBAJgFAFQgGAGgIAAQgHAAgGgGg");
	this.shape_16.setTransform(128.1,516.425);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#E28624").s().p("AhHB3IAAgPQA4gxAZglQAbglgBgeQAAgOgFgKQgEgLgKgHQgKgGgOAAQgPAAgMAIQgNAIgKAMIgPgPQANgQARgJQAQgJAWAAQAeAAASASQASATAAAfQAAAYgMAYQgLAXgWAaQgUAZgcAbIATgCIASAAIBDAAIAAAWg");
	this.shape_17.setTransform(114.875,506.175);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10}]},6).wait(408));

	// leftnav
	this.lnav2_btn = new lib.lnav2();
	this.lnav2_btn.name = "lnav2_btn";
	this.lnav2_btn.setTransform(151.45,505.75,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav2_btn, 0, 1, 2, false, new lib.lnav2(), 3);

	this.lnav1_btn = new lib.lnav1();
	this.lnav1_btn.name = "lnav1_btn";
	this.lnav1_btn.setTransform(149.5,442.1,1,1,0,0,0,47.2,24);
	new cjs.ButtonHelper(this.lnav1_btn, 0, 1, 2, false, new lib.lnav1(), 3);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(153,153,153,0.498)").s().p("AAgBoIAAgxQgJALgNALQgMAKgNAHIgFgFIgGgFQAOgGAMgJQAMgJAIgKIAMAEIAAgrIgWACIgWABIgBgFIgDgGIAjgDIAigDIAbgFIANAKIgWAEIgZADIAAAYIAEAFIADAEIAUgNIARgMIAKAIIgTANIgVAMQAKAKANAHQAMAHAOAFQgDABgCAEIgEAGQgQgGgNgKQgOgKgLgMIAAA0gAhCBoIgNgBIgBgHIgDgGIANABIAJAAIAEgBIADgCQADgCACgJIAEgYIADgpIg3AAIADgYIADgdIACgcIANABIgCAXIgCAXIgCAWIAYAAIAEgbIACgeIADgeIg0AAIAAgOIBCAAIgCAiIgEAkIgDAfIAGAAIALAAIAAACIAAAEQgCAegCATQgCATgDAKQgCAKgEADIgGAFIgIACIgKAAgAhsAxIAagGIAegIIABANIgcAIIgaAHgAgSA0IgFgFIAVgMQAKgHAHgHIANAEQgJAJgLAIQgKAJgLAFIgFgEgAAZgFIAAgOIgaAEIgYADIgDgMIAOgCIAAhBIgLAAIAAgMIBGAAIAAAMIgIAAIAAA7IAIgBIAAALIgIABIAAAQgAgCgbIAbgEIAAgNIgbAAgAgCg2IAbAAIAAgOIgbAAgAgChOIAbAAIAAgNIgbAAgAAxgPIgFgFQAHgFAHgGQAHgHAGgJIgLgNIgLgMIAJgHIAKALIAKALIAHgPQADgHACgIIgmAAIAAgNIApAAIADAAIACAAIAIACQgDAPgFAMQgFANgGALIAMAOIAJAMIgKAJIgIgLIgKgNIgNAPQgHAGgIAFIgDgFg");
	this.shape_18.setTransform(189.925,374.775);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(153,153,153,0.498)").s().p("AhjBlIgFgIQBDgIArgYQAsgZAVgqIAPAHQgXAtguAbQgsAZhFALIgDgIgAgFA5IAAhLIhhAAIAAgQIAlAAIAAg2IAQAAIAAA2IAuAAIAAhJIAPAAIAAAaIBHAAIAAAPIhHAAIAAAgIBdAAIAAAQIheAAIAABLgAhYAyIgGgFQAOgLAMgOQANgOAJgNIAPAEQgKAQgOAQQgNAQgOALIgGgGg");
	this.shape_19.setTransform(166.075,374.25);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(153,153,153,0.498)").s().p("AgBBlIgHgFQAPgPAKgWQAJgVAEgZQAGgZAAgbIgiAAIAAgQIAjAAIABgZIAAgaIAQAAIgBAaIAAAZIA1AAIAAAJIgDA9IgDAqIgDAaQgDAJgDADQgEAFgEACIgJACIgOAAIgTgBIgCgHIgDgIIATABIANAAIAFAAIAEgDQADgEADgNIAEgoIADhEIgmAAQgCAdgEAbQgFAbgKAXQgKAXgSARIgEgGgAhjBGIgDgIQACgBADgEIAGgLIAFgPIAHgXIAIgaIgiAAIAAgPIBpAAIAAAPIg3AAQgFASgGAUIgOAkIA8gMIgHgUIgIgTIAOgDIAJAXIAJAYIAFAUIgNAFIgCgIIgDgJIgoAJIgYAFIgLAEIgGACIgCgHgAhghMIAAgOIBbAAIAAAOg");
	this.shape_20.setTransform(142.25,374.525);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(153,153,153,0.498)").s().p("AhqBiIAAgQICJAAIAEgTIACgVIhsAAIAHgbIAGgfIAGgiIAGgfIg0AAIAAgPIDGAAIAAAPIiBAAIgEATIgDAVIBVAAIADgBIAMABIgDAbIgEAgIgEAgIgFAgIA7AAIAAAQgAgsABIgGAaIBZAAIAEgcIADgZIhWAAIgEAbg");
	this.shape_21.setTransform(118.3,374.6);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#333333").s().p("ABCEnQABgYgEgRQgEgRgIgJQgJgMgSgJQgRgJgZgGIAAgHIAiACIAiACIAaABQAIAAAHgDQAHgCAFgFQAOgMAKgtQAJgsAHhNQg6AkhUArQhTArh1A1QgDAGgEAFQgFAFgGACIg9hrQAcgGAsgMIBlgaIB3ghQBAgRBDgVIAFhaIAFhrImhAAIgGgSIGfAAIA0g1IBQBKQgDAFgIAEQgHAEgMACQgEBvgFBRQgFBPgIA2QgIA2gMAhQgMAhgRAQQgVAWgaAJQgZAKgkAAIgEgBgAgSgbQgbgYgkgZQgjgZgngVQgmgWgjgNIADgHQBMgLA0AFQA1AGAfAQQAfAQAOAVQANAVgCAUQgDAUgQAMQgOALgWAAIgGAAg");
	this.shape_22.setTransform(230.175,295.4012);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#333333").s().p("AB7EZQg0gPgsgXQhEAdhTAQQhTAOheADIgBgIQBNgPBFgWQBGgYA4ggQgTgQgQgRQgQgSgOgWQgbAagiAVQgiAWgmAPIgFgGQAWgYAUgdQATgdAPgfQAOgfAKgdIgNACIgMABIgNAAIAAisQgcAbgeAVQgeAVggAQIgFgFQAXgdAYgoQAXgoAUguQAUgvAOgxIB0AvQgDAGgHADQgGADgLgBIgHALIgGAKIDsAAIAxg+IAQAMIAkAbIAmAeQgBAFgFACQgFADgIAAIlvAAIgMARIgMAPIA4AWICjAAIAogtIBVBAQgDADgHAEQgFAEgKACIAACFQgBADgNAFQgNAEgSAEQgRAEgQgBIgQAAIAAgTIiuAAIAAAAQAAACgDADIgIAGIBOAhQgCAFgFAEQgGADgLgBIgEAHIgFAHICJAAIA4gvIBOBLQgDAGgHACQgHACgMABQgjAqguAgQAuAHAwADQAwADAuAAIAAAJQgdAIgQAYQgRAYgGAiQg7gJg1gPgAhHBtIgLAKQAUARAaANQAZANAdAJQAWgQASgTQASgSAOgVIiXAAIgKAMgAhQgGICuAAIAAg4IiuAAgAhQhQICuAAIAAg5IiuAAg");
	this.shape_23.setTransform(133.325,294.25);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#CCCCCC").ss(1,1,1).p("AzdAAMAm7AAA");
	this.shape_24.setTransform(228.875,350.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.lnav1_btn},{t:this.lnav2_btn}]}).wait(414));

	// 选项动画
	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#39B54A").s().p("AhgC2IAAivQgOAfgTAcQgUAcgZAXIgFgFQAaghARgoQATgoAKgrIhDAAIgCgLIBQAAIAAhOIgpAHIgpAGIgCgHQAbgGAdgKIA2gTQAagKAQgJIAfAbQgDADgEAAQgEAAgIgDIgZAHIgdAIIAABUIAfAAIASgYIAHAEIAMAMIAPANQgCADgCACQgDABgEAAIhIAAIAAAZQAhAOAQAOQAQAPACAMQACAMgFAFQgHAEgJgGQgEgKgIgLQgIgLgJgLIgTgSIAAC4QgBACgFADQgHADgJAAgAAUCiIAAknIAcAMIBTAAIAQgRIAiAbQgDACgEADQgGACgGABIAAD7QgBABgHADQgHADgHAAIgEAAIAAgpIhaAAIAAAmQgBADgFADQgHAEgIAAgAAuBnIBaAAIAAjUIhaAAg");
	this.shape_25.setTransform(622.35,472.825);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#39B54A").s().p("AhbCxQAfgZATgeQATgdALggQALghADgjQAFgkABgnIhDAAIgDgMIBGAAIAAgsIAAgtIAqAFQgBAEgDADQgDADgIABIAAAlIgBAkIA9AAIAQgSIAfAaQgDADgEACQgEACgGABQgBBogGA7QgGA9gNAQQgIAKgLAEQgLAEgOAAQAAgGgCgFQgBgGgEgCQgEgFgLgCIgXgFIABgHIATACIAUACIAOAAIAJgBQADgBADgEQAGgGAFgdQAEgdACgvQACgvABhAIhBAAQgBAogGAlQgFAlgNAiQgLAhgYAeQgXAdglAZgAiKC2IAAjvIgtAAIgDgMIAwAAIAAhyIAmAFQAAAEgDADQgDACgHABIAABjIAOAAIARgVIAGAEIAMAKIAOANQgBADgDABQgCACgEAAIg1AAIAADlQAAADgHAEQgGADgHAAgAhNBEQgFAAgEgEQgDgGACgGQADgHAGgFQAHgHAIgLQAIgLAGgOQAGgPACgPIAGAAQAEAXgCASQgDASgGANQgGANgHAHQgEAFgGACQgFADgFAAIgCgBgACiA8QgBgOgFgQQgFgQgHgOQgHgPgIgLIAFgDQAdAVAMATQAMATAAAPQgBANgHAGQgDABgDAAQgFAAgGgFg");
	this.shape_26.setTransform(582.825,472.8);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#39B54A").s().p("AgSATQgHgIAAgLQAAgKAHgIQAHgIALAAQAMAAAHAIQAHAIAAAKQAAALgHAIQgHAHgMABQgLgBgHgHg");
	this.shape_27.setTransform(546.075,485.825);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#39B54A").s().p("AAZCTIAAgOIAsgEIgbhQIhlAAIgaBPIAqAFIAAAOIhgAAIAAgOIAkgFIBckSIAWAAIBdETIAkAEIAAAOgAAlAgIgtiJIguCJIBbAAg");
	this.shape_28.setTransform(525.15,473.225);

	this.instance = new lib.对("synched",0);
	this.instance.setTransform(699.65,459.8);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#CC3300").s().p("AhgC2IAAivQgNAfgUAcQgUAcgZAXIgFgFQAaghARgoQATgoAKgrIhCAAIgDgLIBQAAIAAhOIgpAHIgpAGIgCgHQAbgGAdgKIA2gTQAagKAQgJIAfAbQgDADgDAAQgGAAgHgDIgZAHIgeAIIAABUIAhAAIASgYIAGAEIANAMIAOANQgBADgDACQgDABgFAAIhIAAIAAAZQAjAOAQAOQAPAPADAMQACAMgHAFQgGAEgJgGQgFgKgIgLQgHgLgKgLIgTgSIAAC4QAAACgFADQgHADgJAAgAAUCiIAAknIAcAMIBUAAIAPgRIAhAbQgCACgEADQgGACgGABIAAD7QgBABgHADQgHADgHAAIgEAAIAAgpIhaAAIAAAmQgBADgFADQgHAEgIAAgAAuBnIBaAAIAAjUIhaAAg");
	this.shape_29.setTransform(889.45,472.825);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#CC3300").s().p("AhbCxQAfgZATgeQATgdALggQALghADgjQAFgkABgnIhDAAIgDgMIBGAAIAAgsIAAgtIAqAFQgBAEgDADQgDADgIABIAAAlIgBAkIA9AAIAQgSIAfAaQgDADgEACQgEACgGABQgBBogGA7QgGA9gNAQQgIAKgLAEQgLAEgOAAQAAgGgCgFQgBgGgEgCQgEgFgLgCIgXgFIABgHIATACIAUACIAOAAIAJgBQADgBADgEQAGgGAFgdQAEgdACgvQACgvABhAIhBAAQgBAogGAlQgFAlgNAiQgLAhgYAeQgXAdglAZgAiKC2IAAjvIgtAAIgDgMIAwAAIAAhyIAmAFQAAAEgDADQgDACgHABIAABjIAOAAIARgVIAGAEIAMAKIAOANQgBADgDABQgCACgEAAIg1AAIAADlQAAADgHAEQgGADgHAAgAhNBEQgFAAgEgEQgDgGACgGQADgHAGgFQAHgHAIgLQAIgLAGgOQAGgPACgPIAGAAQAEAXgCASQgDASgGANQgGANgHAHQgEAFgGACQgFADgFAAIgCgBgACiA8QgBgOgFgQQgFgQgHgOQgHgPgIgLIAFgDQAdAVAMATQAMATAAAPQgBANgHAGQgDABgDAAQgFAAgGgFg");
	this.shape_30.setTransform(849.925,472.8);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#CC3300").s().p("AgSATQgHgIAAgLQAAgKAHgIQAHgIALAAQAMAAAHAIQAHAIAAAKQAAALgHAIQgHAHgMABQgLgBgHgHg");
	this.shape_31.setTransform(813.175,485.825);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#CC3300").s().p("AhxCSIAAgOIApgFIABg6IAAg6IAAgVIAAg7IgBg5IgpgFIAAgOIB2AAQAvAAAXAUQAZASAAAhQAAAXgQATQgRATgkAIQAsAFAUATQATAUAAAcQAAAUgLATQgMARgYAMQgZALgnAAgAgmBFIABA8IAhAAQApAAAVgPQAVgRAAgeQAAgfgWgRQgVgQguAAIgcAAIAABCgAgmhHIAAA7IAZAAQAoAAAUgPQATgQAAgeQAAgdgRgOQgSgNgjABIghAAIgBA5g");
	this.shape_32.setTransform(794.35,473.35);

	this.instance_1 = new lib.错("synched",0,false);
	this.instance_1.setTransform(999.2,469.9);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#39B54A").s().p("AhbCxQAfgaATgcQATgeALggQALghADgjQAFgkABgnIhDAAIgDgMIBGAAIAAgrIAAgtIAqADQgBAFgDADQgDADgIABIAAAlIgBAkIA9AAIAQgSIAfAaQgDADgEACQgEABgGABQgBBpgGA7QgGA9gNAQQgIAKgLAEQgLAEgOAAQAAgGgCgFQgBgGgEgCQgEgFgLgDIgXgEIABgHIATACIAUABIAOABIAJgBQADgBADgDQAGgHAFgdQAEgdACgvQACgvABhAIhBAAQgBAogGAlQgFAlgNAiQgLAhgYAeQgXAdglAZgAiKC2IAAjvIgtAAIgDgMIAwAAIAAhxIAmAEQAAAEgDADQgDACgHABIAABjIAOAAIARgVIAGAEIAMAKIAOANQgBADgDABQgCACgEAAIg1AAIAADlQAAADgHAEQgGADgHAAgAhNBFQgFgBgEgFQgDgFACgGQADgHAGgFQAHgHAIgLQAIgMAGgNQAGgPACgQIAGABQAEAXgCASQgDARgGAOQgGANgHAHQgEAFgGACQgFADgFAAIgCAAgACiA8QgBgPgFgPQgFgQgHgOQgHgPgIgLIAFgDQAdAVAMASQAMAUAAAPQgBAOgHAEQgDACgDAAQgFAAgGgFg");
	this.shape_33.setTransform(582.825,715.45);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#CC3300").s().p("AhbCxQAfgaATgcQATgeALggQALghADgjQAFgkABgnIhDAAIgDgMIBGAAIAAgrIAAgtIAqADQgBAFgDADQgDADgIABIAAAlIgBAkIA9AAIAQgSIAfAaQgDADgEACQgEABgGABQgBBpgGA7QgGA9gNAQQgIAKgLAEQgLAEgOAAQAAgGgCgFQgBgGgEgCQgEgFgLgDIgXgEIABgHIATACIAUABIAOABIAJgBQADgBADgDQAGgHAFgdQAEgdACgvQACgvABhAIhBAAQgBAogGAlQgFAlgNAiQgLAhgYAeQgXAdglAZgAiKC2IAAjvIgtAAIgDgMIAwAAIAAhxIAmAEQAAAEgDADQgDACgHABIAABjIAOAAIARgVIAGAEIAMAKIAOANQgBADgDABQgCACgEAAIg1AAIAADlQAAADgHAEQgGADgHAAgAhNBFQgFgBgEgFQgDgFACgGQADgHAGgFQAHgHAIgLQAIgMAGgNQAGgPACgQIAGABQAEAXgCASQgDARgGAOQgGANgHAHQgEAFgGACQgFADgFAAIgCAAgACiA8QgBgPgFgPQgFgQgHgOQgHgPgIgLIAFgDQAdAVAMASQAMAUAAAPQgBAOgHAEQgDACgDAAQgFAAgGgFg");
	this.shape_34.setTransform(849.925,715.45);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#CC3300").s().p("AhxCSIAAgOIApgFIABg6IAAg6IAAgVIAAg7IgBg5IgpgFIAAgOIB2AAQAvABAXASQAZATAAAhQAAAXgQATQgRATgkAIQAsAFAUATQATAUAAAcQAAAUgLATQgMARgYAMQgZALgnAAgAgmBFIABA8IAhAAQApAAAVgPQAVgRAAgeQAAgfgWgRQgVgQguAAIgcAAIAABCgAgmhIIAAA8IAZAAQAoAAAUgPQATgPAAgfQAAgdgRgOQgSgNgjABIghAAIgBA4g");
	this.shape_35.setTransform(794.35,716);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance,p:{y:459.8}},{t:this.shape_28,p:{y:473.225}},{t:this.shape_27,p:{y:485.825}},{t:this.shape_26},{t:this.shape_25,p:{y:472.825}}]},112).to({state:[{t:this.instance_1,p:{y:469.9}},{t:this.shape_32},{t:this.shape_31,p:{y:485.825}},{t:this.shape_30},{t:this.shape_29,p:{y:472.825}}]},50).to({state:[]},45).to({state:[{t:this.instance,p:{y:697.7}},{t:this.shape_28,p:{y:715.875}},{t:this.shape_27,p:{y:728.475}},{t:this.shape_33},{t:this.shape_25,p:{y:715.475}}]},112).to({state:[]},54).to({state:[{t:this.instance_1,p:{y:714.05}},{t:this.shape_35},{t:this.shape_31,p:{y:728.475}},{t:this.shape_34},{t:this.shape_29,p:{y:715.475}}]},1).wait(40));

	// 停止按钮
	this.m2_1stopbtn = new lib.音频停止();
	this.m2_1stopbtn.name = "m2_1stopbtn";
	this.m2_1stopbtn.setTransform(579.15,320.5);
	new cjs.ButtonHelper(this.m2_1stopbtn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.m2_2stopbtn = new lib.音频停止();
	this.m2_2stopbtn.name = "m2_2stopbtn";
	this.m2_2stopbtn.setTransform(579.3,562.45);
	new cjs.ButtonHelper(this.m2_2stopbtn, 0, 1, 2, false, new lib.音频停止(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m2_1stopbtn}]},12).to({state:[]},97).to({state:[{t:this.m2_2stopbtn}]},99).to({state:[]},110).wait(96));

	// 播放按钮
	this.m2_2playbtn = new lib.音频播放标();
	this.m2_2playbtn.name = "m2_2playbtn";
	this.m2_2playbtn.setTransform(572.85,566.45);
	new cjs.ButtonHelper(this.m2_2playbtn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.m2_1playbtn = new lib.音频播放标();
	this.m2_1playbtn.name = "m2_1playbtn";
	this.m2_1playbtn.setTransform(572.85,324.35);
	new cjs.ButtonHelper(this.m2_1playbtn, 0, 1, 2, false, new lib.音频播放标(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.m2_1playbtn},{t:this.m2_2playbtn}]},6).wait(408));

	// 不动内容
	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#333333").s().p("AgqBJQgUgLgLgTQgLgTgBgYQABgXALgUQALgTAUgLQATgLAXAAQAYAAAUALQATALALATQAMAUgBAXQABAYgMATQgLATgTALQgUAMgYABQgXgBgTgMgAgrgsQgSASgBAaQABAaASASQARASAaAAQAaAAATgSQARgSABgaQgBgagRgSQgTgRgagBQgaABgRARg");
	this.shape_36.setTransform(1448.95,517.65);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#333333").s().p("Ag+EXIAAkgIBVAgICKAAIAmgoIBPA6QgDAEgGAEQgGAEgKACIAADMQgBACgMAFIgcAIQgQAEgOAAIgPAAIAAgvIiTAAIAAAWQgBAEgKAGQgJAGgQAFQgQAFgSAAgAAUDWICTAAIAAhQIiTAAgAAUB1ICTAAIAAhNIiTAAgAkVCpIAAmVIBOAgIAgAAIAjgoIBJA5QgDADgGAEQgGADgJACIAAEdQgBADgLAEQgKAFgPAEQgOAEgOAAIgNAAIAAgzIgoAAIAABAQAAAEgJAGQgJAGgOAFQgPAFgRAAgAjJA+IAoAAIAAj5IgoAAgAgrgEIAAkHIBSAgIBpAAIAngrIBPA8QgDAFgHAEQgGAEgLACIAACsQgBACgMAFQgLAEgQADQgQADgOABIgOAAIAAgjIh0AAIAAATQAAAEgKAGQgKAFgPAFQgPAEgQABgAAjhBIB0AAIAAhEIh0AAgAAjiWIB0AAIAAhFIh0AAg");
	this.shape_37.setTransform(1411.125,498.825);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#333333").s().p("AiFEWQA1gWAhgXQAhgXAQgaQASgZAHgcIiCAAIgEgRICKAAIAEgiIABgkIgTAAIAAAQQAAAEgKAGQgKAGgPAFQgQAEgSAAIgLAAIAAgqQgJAGgNgCQgNgCgMgLQAAgWgFgUQgEgWgHgUIAAE2QAAADgKAGQgLAGgOAEQgQAFgQgBIgRAAIAAjeQgQAXgTATQgTAVgWATIgHgHQAVgiAPgpQAPgpAKgtQALgtAGgtIhGAAIgEgRIBPAAIAAiZIBqALQAAAGgFAFQgEAEgNACIAAB1IAcgsIALAKIAYAYIAAgDIBTAgIB/AAIAkglIBHA1QgCAEgFADQgEACgIABIAACOQAAACgEAEIgOAGIATAPIAbAYIAaAXQgCAFgEACQgFADgGAAIiTAAQAOAZAqAQQAqAPBHAFIAAAIQgfAHgQATQgPATgCAmQgkgMgYgYQgYgYgNgfQgNgdgFgeQgKAjgaAfQgaAcgzAXQgwAVhSAPgAB9BQQgCASgEAQIA0AAIAlg0IgUAGQgKADgLAAIgOAAIAAgbIgaAAIgCAkgAARAbICIAAIAAg5IiIAAgAh+hDIABAAQAWAJAPAKQAQAKAJAKIAAhXIg/AAgAARgvICIAAIAAg5IiIAAgAgQiNIAAgzIhCAAIgFgRIBHAAIAAhJIBhAHQAAAGgEAEQgEAEgLACIAAAyIAvAAIAAhJIBiAHQgBAGgEAEQgEAEgLACIAAAtIAggsIAMAJIAZAXIAbAYQgCAFgEACQgEADgHAAIhPAAIAAAZQgBAEgKAEQgKAFgPAEQgPAEgQAAIgLAAIAAguIgvAAIAAAhQgBADgJAFQgLADgOAEQgQADgPAAg");
	this.shape_38.setTransform(1352.2,498.45);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#333333").s().p("AjCEcIAAkIQgWAPgWAOQgWAOgYAMIgEgGQAegiAdgpQAdgqAYgqQAXgpAOghIBlA7QgCAEgFACQgGADgLgBIgZAaIgdAbIAcALQgCAEgFADQgDADgJACIAAEcQgBADgKAFQgLAFgQAEQgQAEgRAAgABDDyQgEgPgKgKQgHgGgJgFQgJgFgNgFQgNgEgVgEIAAgHIAOABIAhACIAlACIAZABQAHAAADgDQADgDAAgGIAAjxIihAAIgEgRIDpAAIAqg5IAOALIAeAZIAgAcQgBAFgFACQgEADgHAAIhQAAIAAD0QAAAcgIAVQgJAWgaANQgZANgzADQAAgUgGgQgAkQhuQAZgZAZgfQAYgfAUgfQAUgfAMgYIBeA7QgDAEgFADQgFACgLgCQgWAUgfAUQgfAVgjATQgjASglAPgAgXjNIgFgRIC5AAIAqg2IAMALIAeAYIAfAaQgCAFgFADQgEACgGAAg");
	this.shape_39.setTransform(1293.6,498.475);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#333333").s().p("AkkDFIApgXIAqgYIAAjGIhIAAIgEgRIBCAAIAngzIBSBBQgEAFgHADQgIAEgNABIAACzQALAKAMAIQANAIAOAHIgDgDQAWgkALgqQALgpADgwIhLAAIgFgQIBQAAIABgSIAAgUIAAhOIg8AAIgFgRIBBAAIAAiLIBkAKQgCAHgEAEQgEAEgMACIAABwIA1AAIAAiLIBkAKQgBAHgFAEQgEAEgMACIAABwIACAAIAkg4IAMALIAaAZIAcAbQgCAFgEACQgEADgHAAIhXAAIAAB0IANAAIAmg5IANAKIAbAbIAcAbQgBAFgFACQgEACgHAAIhmAAIAACeQAAAEgKAFQgKAGgOAFQgPAEgPAAIgOAAIAAi2Ig5AAQgHA2gbArQgbArg4AeQAfAOAtAEQAsAGBBAAIBZgCQArgBAvgDIAAAHQgZAHgOAUQgNAVgDAaIiYAAQg/ABgogMQgpgMgcgZQgbgZgWgmQgGgLgGAAQgFABgGAKIgRAdIgXAnIgYAoQABAFgCAEQgCADgEACgAArgyQAAAVgBARIA2AAIAAh0Ig1AAgAjAiJQgHgigRgiQgRgjgTgbIAEgDQA8AMAgAWQAeAWAIAYQAIAYgJASQgJATgUAFIgJAAQgQAAgTgNg");
	this.shape_40.setTransform(1236.075,498.35);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#333333").s().p("ADBEKQgBgTgEgTQgEgTgGgUQgjARgxAUQgxAUg8AVQgGAHgHACIgohgIAFgBIAMgEIAMgFQATgMAUgUQAWgVAXgbQAXgaAVgdIguARIgyARIgIAJQgEADgEACIgTgrQgDAEgFACQgHADgJABQgDBAgGArQgGArgLAZQgKAZgPALQgOALgTAFQgTAFgaAAQAAgQgDgNQgCgNgGgHQgIgIgNgHQgNgGgRgEIAAgHIAZACIAZABIASAAIAMgBQAEgBAEgDQAKgIAIgpQAGgoAEhJIg8AAIgXAeIhDgkIAIgIIALgGIAHg0IAFg7IAEgxIBSAmIAeAAIAAh3IiCAAIgGgQICCAAIAignIBKA3QgEAEgGAEQgGAEgKACIAACFQgBACgLAEIgYAHQgPADgMAAIgNAAIAAgbIguAAIgDAjIgFAnIgEAjIA4AAIAngkIBBA2IgTgvIADgBIAKgCIAIgEQARgKASgXQARgXARgbQAPgbAJgXIhwAAIgGgRIDwAAIAqg6IANALIAeAaIAgAcQgCAFgEADQgFACgGAAIjAAAIBNAlQgCAEgFADQgFACgJgBQgPARgXARQgWARgZARQgaAQgYANIA2gBIA+gBIAUglQAKgSAHgPIBnA5QgCAFgHADQgGADgLgCQgXAdglAiQgmAigrAhQgrAhgrAaIBMgDIBZgEIgNggIgMgdIAEgCQA8AWAdAcQAdAdAGAbQAFAcgLATQgLAUgUADIgHAAQgSAAgUgRgAA+i5QgCgagKgZQgKgZgNgSIAEgDQA5AEAaAQQAbARAFAUQADAUgLAPQgMAQgVADIgGABQgRAAgUgPg");
	this.shape_41.setTransform(1177.65,498.4255);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#333333").s().p("AikEeIAAjPQgWAfgbAdQgdAbggAYIgGgGQAYghATgqQATgpAOgsQANgtAKgrIhTAAIgFgSIBpAAIAAhlIgzACIgyACIgBgGQAkgNAmgRQAngRAjgSQAigSAXgRIBVBRIAAgOIBZAkIA0AAIAmgsIBOA9QgDAEgFADQgHADgJADIAAFoQgBAEgLAFQgMAGgQAFQgQAEgQAAIgPAAIAAhAIg8AAIAAAsQgBAFgKAHQgJAGgQAGQgRAFgSABIgPAAIAAk4QgCAEgDAAQgEABgEABIhbAAIAAAqQAvAMAXASQAVATADATQAEAUgKAOQgJAPgSACQgRABgTgPQgBgWgHgXQgGgXgLgSIAAEJQAAADgIAFQgIAGgQAEQgPAFgVABgABuCXIA8AAIAAk9Ig8AAgAgdiAIAaAYIAbAcIAAh9QgFADgLAAQgKAAgQgFIgdAGIghAFIAABuIAng4IAMAKg");
	this.shape_42.setTransform(1119.15,498.3);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#333333").s().p("AkZD4IgEgSIGwAAIAyg/IAPAMIAkAcIAmAfQgBAEgFADQgFACgHABgAjSAeIgFgRIEkAAIAvg7IAPAMIAiAaIAlAcQgCAFgFACQgFADgGAAgAj5ioIgFgQIFyAAIAxg+IAPALIAjAbIAmAfQgBAEgFACQgFADgGAAg");
	this.shape_43.setTransform(1062.35,495.8);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#333333").s().p("AjMESQBFgYA3ghQA3ggAqgrQghgtgXg+QgXg9gNhUQgHBOgWBIQgVBJgsA9QgrA+hJAsIgFgEQA5hFAdhTQAdhTAKhZQAJhZgChZIhjAAIgFgRIFGAAIAlglIBHBCQgEAEgGADQgGACgJACIgMAlIgPArIgOAoIAeAAIAvgvIBNBHQgDAGgGABQgGADgMACQgTAygcAuQgcAtgmAmQAmAYArAQQArARAvANIgBAGQggAFgWASQgXASgNAeQgqgSglgWQgkgYgegdQgxAig+AYQhAAXhQANgAhEjDIgCAfQAQBZAiA+QAhA9AxAqQAagjAUgoQATgnANgrIgkAAIgYAbIhKgoIAIgHIALgHIAPgqIAQgvIAMgrIiHAAIgBAfg");
	this.shape_44.setTransform(1004.325,498.85);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#333333").s().p("AjJEdIAAi+QgRAXgUAWQgVAWgXATIgGgFQATgjAQgpQAPgpALgsQALgrAHgsIhGAAIgFgQIBTAAIAAhfIgpADIgoACIgCgFQAdgNAggSQAegRAcgTQAbgTARgPIBaBNQgGAGgLAAQgKABgQgGIgWAGIgZAFIAABjIAdgqIAKAKIAZAWIAZAZQgBAFgEACQgFADgGgBIhJAAIAAAfQAsARAVAWQAUATACAVQACAUgKANQgKAOgQACQgRABgSgQQAAgWgFgXQgFgWgIgUIAAEVQAAADgIAFQgIAGgOAEQgPAFgUAAgAhKD8IgFgQICMAAIAAhwIhdAAIgFgRIBiAAIAAhoIhnAAIgEgQIDgAAIAkgzIAMAKIAaAXIAbAZQgCAFgEABQgEADgHAAIh4AAIAABoIASAAIAmgzIAMAKIAcAXIAdAaQgBAEgEADQgFADgHgBIhsAAIAABwIAuAAIAkg0IAMAKIAaAXIAbAaQgBAFgEACQgFACgHAAgAgagtIAAjdIBRAfIBjAAIAkgnIBLA4IgIAHQgGADgKACIAAB7QgBADgKAFQgLAEgQAEQgPADgOAAIgNAAIAAgWIhtAAIAAAQQAAAFgKAFQgKAGgQAEQgPAFgPAAgAA0hnIBtAAIAAhzIhtAAg");
	this.shape_45.setTransform(945.975,498.4);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#333333").s().p("AiyEdIAAkpIBcAiICnAAIApgsIBTA/QgDAEgGADQgHAEgJADIAADHQgBAEgMAGQgMAHgRAFQgRAGgSAAIgPAAIAAgsIiyAAIAAATQAAAFgMAHQgKAGgSAFQgQAFgTAAgAhaDeICyAAIAAhUIiyAAgAhaB5ICyAAIAAhSIiyAAgAkRglIgFgRIE2AAIAOgpIANgsIALgqIjFAAQAvAOAVAUQAVAVACAUQAAAVgMAOQgMAOgTABQgUABgVgSQgBgdgIgcQgIgcgLgXIhjAAIgEgQIDvAAIgKgEIgLgGQgCgWgJgTQgJgUgKgOIADgCQAzgCAZALQAYALAGAQQAFARgKAOQgJAOgSAGIB4AAIArg6IAOAMIAgAZIAhAcQgBAFgEACQgFACgHAAIiWAAIBcAcQgCAGgGADQgFADgKgBQgWAUgeAYQgeAYggAUIBsAAIAtg7IAOALIAhAaIAjAdQgCAFgEACQgFADgGAAg");
	this.shape_46.setTransform(888.15,498.216);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#333333").s().p("ABmD3QgEgPgIgJQgIgJgQgIQgRgIgYgFIABgHIAgACIAfACIAXABQAHAAAFgCQAGgCADgEQAQgPAHhTQAGhTACiYIhcAAQgYAngbAgQgbAfgfAZIgDgDIAADyQgBADgLAGQgLAFgQAEQgPAEgOABIgNAAIAAgwIhLAAIAAApQAAAFgJAHQgIAGgPAFQgPAFgSAAIgMAAIAAnJIBLAfIADglIADgpIABglIB0AcQgCAHgGAEQgHADgLAAIggAlIgiAmIAnAAIAlgpIBKA6QgCAEgHADQgGADgIADIAABkQAOggAOgpQAMgpALgtQALgtAGgsIBwAgQgCAGgGADQgGAEgKAAQgHATgJARIgSAjIBLAAIAtguIBJBBQgEAEgGADQgHADgKACQgCBegDBDQgCBDgFAtQgFAtgJAbQgIAbgNANQgRARgXAJQgXAHghAAQAAgVgDgPgAjECuIBLAAIAAidIhLAAgAjEAAIBLAAIAAiTIhLAAgAAkBRQgBghgLghQgLgfgPgaIADgDQA5AOAbAWQAbAWAFAXQAEAYgKARQgLARgVADIgEAAQgTAAgUgQg");
	this.shape_47.setTransform(831.4,498.375);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#333333").s().p("Aj9EXQBCgVAngXQAngYAUgaQAUgbAHgdIiMAAIgEgRICTAAQADgQABgQIABgjIhDAAIgDgKQgfAbgoAWQgnAXgxASIgEgGQAygiAlgoQAkgoAZgrIiJAAIgFgRICYAAIAOgdIAMgeIh7AAIgEgRICGAAIAIgbIAIgaIikAAIgFgRICtAAIAIgrIAGgqIB1AXQgBAHgGAEQgFAEgLAAIgGAXIgFAYIBwAAIArg1IANAKIAfAXIAiAbQgCAFgEACQgFADgGAAIjeAAIgJAbIgJAaICBAAIAngwIAMAKIAcAVIAfAYQgBAFgFADQgEACgHAAIjmAAIgPAeIgRAdIDOAAIArg3IAOALIAgAYIAiAbQgBAFgFACQgEADgHAAIirAAQAWAXAfAPQAgANAjAHQAkAHAiACIgBAJQgZAQgPAUQgPAUgCAYQgygWgmgpQglgpgYg0IiIAAQgNASgPARQgPAPgSAQICCAAIAlgsIAMAJIAaATIAdAXQgBAFgFACQgEADgHAAIg/AAQAAASgCARQgCAQgEAQIA1AAIAogzIAMAKIAdAWIAfAaQgBAFgFADQgEACgHAAIiZAAIgEALIgFALQBVAJAvAQQAwARATATQAUASgCARQgBARgPALQgPAKgUAAQgVAAgSgPQgRgWgigcQghgcgygaQgPAagfAWQgfAXg0ASQgzAShOAOg");
	this.shape_48.setTransform(772.225,498.125);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#333333").s().p("AjMEBQgCgNgHgIQgHgHgNgHQgNgGgSgEIAAgHIAZABIAaABIASABIALgBQAEgBAFgDQAKgJAHgoQAHgpAEhIIgtAAIgXAdIhBgjIAIgIIAKgHQADgUACgdIAEg3IACgwIBRAmIAUAAIAAhxIh2AAIgFgQIB0AAIAigmIBKA2QgDAFgHAEQgGADgKADIAAB/QgBACgKAEQgLAEgOADQgOAEgNAAIgMAAIAAgeIgkAAIgCAhIgDAlIgEAhIAqAAIAnglIBCA3QgDAEgGADQgGADgJAAQgEBBgFArQgHArgKAYQgKAZgPALQgPALgTAGQgTAFgaAAQAAgQgCgNgAA/EeIAAiGIiFAAIgFgRICKAAIAAhHIgkAAIAAAPQAAAEgQAGQgPAHgdABIgNAAIAAkaIBQAeIBdAAQAJgaAKgjQALgjAIgiIBiAmQgCAFgGADQgGAEgKgBQgVAXgYAVQgXAUgXARIAXAAIAlgpIBDA0QgDADgGADQgFADgKABIAADHQAAAEgRAGQgRAHgeAAIgNAAIAAgSIgkAAIAABHIAjAAIAng2IAMALIAcAYIAdAbQgBAEgFADQgEACgHAAIh+AAIAAByQAAADgHAEQgHAEgOAEQgNAEgUABgACKAwIAkAAIAAhYIgkAAgAAbAwIAkAAIAAhYIgkAAgACKg5IAkAAIAAhRIgkAAgAAbg5IAkAAIAAhRIgkAAgAAPiwQgEgbgLgaQgMgagPgUIAFgDQAyAHAaARQAZARAGATQAFAUgJAOQgJAPgSAEIgHABQgOAAgSgMg");
	this.shape_49.setTransform(713.775,498.2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#333333").s().p("AAyEcIAAl/IgjAAIAAEXQgBADgHAFQgHAFgNAFQgOAEgUAAIgOAAIAAleIBUAgIAbAAIAAheIiBAAIgFgQID0AAIArg5IAMALIAfAZQARAPAOANQgBAFgFACQgFACgGAAIiBAAIAABeIAfAAIAhgmIBIA2QgCADgGADQgFAEgIACIAADKQAAAagGARQgFASgSAKQgRALgjADIgBghQgBgNgDgIQgCgIgGgGQgEgFgMgCIAAgIIAFAAIAJAAIAJAAQAGAAABgDQACgCAAgEIAAjOIglAAIAAFpQAAADgIAFQgIAGgPAEQgOAEgVAAgAkHEXQAignAUgvQASguAIg1QAHg1AAg5IAAkKIBjAJQgCAHgEAFQgFADgMACIAADwQAAA/gOA4QgOA5gjAuQgiAug8AggAkUCVIAAlkIBcAIQgBAHgEADQgFAEgKACIAAE4QAAADgJAFQgJAFgOADQgNAEgOAAg");
	this.shape_50.setTransform(657.25,498.45);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#333333").s().p("Ai2D7QgDgNgHgJQgHgJgLgGQgLgHgXgEIAAgHIALAAIAWABIAaABIAQABQAGAAADgDQACgBAAgGIAAgxIgjALIgmAOQgDAFgEAFQgFADgFABIgihVIA0gFIBIgJIAAg1IAnADIAMgVIALgTIg0AAQgfAYgjAXQgiAXgoASIgFgHQAZgSAWgUQAYgVAUgWIg0AAIgGgRIBKAAIAZgeIAXgfIiRAAIgFgRIBZAAIAAhOIg+AAIgFgRIBDAAIAAhTIBoAIQgBAGgFAFQgFAEgMACIAAA1IAbgmIAJAIIAVASIANgfIANgeIBZAsQgCAFgGADQgFACgLgCQgRAdgTAfQgVAegZAfIASAAIAdgpIAHAGIAQANIATASQAKgqAHgrQAHgsAEgsIBxAcQgCAFgFAEQgGAEgKAAIgPAxIgQAtIAyAAIAqg3IANAKIAeAZIAgAbQgBAFgFACQgFADgGAAIgaAAQgGBEgTA9QgTA9gjA1QAaAbAfAXQAfAWAlASIgCAFQgeAHgRASQgTASgHAdQgfgXgWgbQgXgegRghQgmAlg0AdQgzAehHAUIgDgGQBEgkAsgtQAvguAbg1QgJgggIgiQgHgigFglQgPAWgTATQgSAVgUARIgIgEIAJgTIAHgTIgHACIgKABIgfARIgjARIAVABQAAAIgFADQgFADgJACIAAATIA2gHIA4gHIABAHIgxAWIg+AYIAABVQABAbgIATQgGASgWALQgWAMgrAEQgBgUgEgOgABkheQgJASgKAQQAHAdAKAaQALAZAMAXQAPgoAIgrQAJgsACguIgmAAQgIASgJASgAAGgKQAHgSAGgUIAMgoIhiAAIgdAfIghAeIAjAAIAlgmgAh2h2IAVghIATggIgoAAg");
	this.shape_51.setTransform(598.15,498.4);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#333333").s().p("AjsD7QgDgPgFgIQgFgKgJgGQgKgHgTgEIAAgHIAIAAIAQABIAUABIANAAQAGAAACgBQADgDAAgFIAAh7IgVAOQgCAGgFAFQgEAFgGACIgghgIAdgEIApgKIAAhtIg5AAIgFgRIA+AAIAAiRIBoAKQgBAGgGAFQgEAEgMACIAABtIAbgxIAHAIIAPASIATAYIAAh2IBbAgICYAAIAlgmIBJA2QgCAEgFADQgGADgIACIAABaQgBADgKAFQgMAFgPADQgQAFgOAAIgOAAIAAgLIiqAAIAAAjIgBAbIAAAcIBIAAIAAhVIBfAIQAAAEgDAEQgEADgHABIAABBIARAAIAng3IAMAKIAeAZIAeAbQgBAFgFADQgEABgHAAIhvAAIAABkIAKAAIAkgoIBMA5QgCAEgGADQgGAEgJACIAACGQgBACgMAEQgLAEgQAEQgPADgOABIgPAAIAAgmIhtAAIAAAQQAAAEgKAFQgKAHgQADQgPAFgRABIgLAAIAAisQgNAugcArQgeAqgxAiIgGgDQAcgvAOg1QAPg1AEg3QAGg4AAg2QgNAMgRAMIgmAbIAAC5QABAcgGATQgHAUgUAKQgWAMgpAEQgBgVgCgOgABEDkIBtAAIAAhwIhtAAgAAEAjQgCATgCASIBIAcIAJAAIAAhkIhJAAIgEAjgAiKghIAigIIAigIIAAgWIAAg0IgCAAIgDAAIg/AAgAAKh6ICqAAIAAhgIiqAAg");
	this.shape_52.setTransform(539.75,498.4);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#333333").s().p("AjNEdIAAjlQghAvgvAnIgGgGQAVgjAOgqQAQgpAKgtQALgtAFguIhDAAIgFgQIBRAAIAAiXIBmAKQAAAHgFAEQgFAEgMACIAAB4IAggwIALAKIAYAXIAZAZQgBAGgEACQgEACgHAAIhMAAIAAAsQAsAOAUATQAWASACATQADASgJAOQgJAMgQACQgQADgRgQQgBgWgGgWQgHgXgKgUIAAE/QgBAEgJAGQgJAGgPAEQgPAEgPAAgAg8DPQATgJAFgIQAGgHgBgMIAAm4IBUAhIBlAAIAkgnIBIA4IgJAHQgGADgJACIAADJQgBADgJAEQgIAFgNAFIBMAzQgCAEgHABQgFABgJgCQgPALgaAPQgaAPgeANQAbAdAhAVQAgAUAlALIgCAHQgVAHgQATQgRATgIAeQgsgcgegoQgegogTg4QgSg4gLhHIgfAAIAADBIAjgFIAjgHIABAFQgRAPggAYQggAZgoAbQgDAFgGAFQgEAEgGACgABvAyQAPAdAUAXQARgXAOgZQAOgZAIgRIgMACIgOABIgMAAIAAgXIhMAAQALAfAPAbgAAtgZIB0AAIAAhdIh0AAgAAtiGIB0AAIAAhVIh0AAg");
	this.shape_53.setTransform(482.35,498.35);

	this.B2 = new lib._2B();
	this.B2.name = "B2";
	this.B2.setTransform(870.3,713.35,1,1,0,0,0,91.5,30.8);
	new cjs.ButtonHelper(this.B2, 0, 1, 2, false, new lib._2B(), 3);

	this.A2 = new lib._2A();
	this.A2.name = "A2";
	this.A2.setTransform(600.3,713.35,1,1,0,0,0,91.5,30.8);
	new cjs.ButtonHelper(this.A2, 0, 1, 2, false, new lib._2A(), 3);

	this.B1 = new lib._1B();
	this.B1.name = "B1";
	this.B1.setTransform(870.3,470.7,1,1,0,0,0,91.5,30.8);
	new cjs.ButtonHelper(this.B1, 0, 1, 2, false, new lib._1B(), 3);

	this.A1 = new lib._1A();
	this.A1.name = "A1";
	this.A1.setTransform(600.3,470.7,1,1,0,0,0,91.5,30.8);
	new cjs.ButtonHelper(this.A1, 0, 1, 2, false, new lib._1A(), 3);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#333333").s().p("AgSATQgHgIAAgLQAAgKAHgIQAHgIALAAQAMAAAHAIQAHAIAAAKQAAALgHAIQgHAHgMABQgLgBgHgHg");
	this.shape_54.setTransform(538.875,629.825);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#333333").s().p("AhWCVIAAgYIAkgqIAhgmQAUgYANgUQAOgTAHgRQAGgSAAgRQAAgcgOgQQgPgRgZAAIgMAAIgPADIgKAfQgDANgFAGQgFAGgHAAQgIAAgEgEQgFgDgDgGQADgVANgOQANgOASgHQASgHAUAAQAaAAASAKQARAJAJASQAJARAAAWQAAASgIASQgHASgTAWQgSAXgeAhIgXAZIgfAiICVAAIAAAeg");
	this.shape_55.setTransform(521.65,617.075);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#333333").s().p("AgSATQgHgIAAgLQAAgKAHgIQAHgIALAAQAMAAAHAIQAHAIAAAKQAAALgHAIQgHAHgMABQgLgBgHgHg");
	this.shape_56.setTransform(538.875,387.175);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#333333").s().p("AhOCUIAAgNIBAgIIAAgjIABgkIAAitIg9AHIAAgOIBWgXIAFAFIgBA+IAACIIAAAkIABAjIA+AIIAAANg");
	this.shape_57.setTransform(522,374.525);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#333333").s().p("AgnBFQgSgLgLgSQgLgSAAgWQAAgWALgSQALgSASgKQASgLAVAAQAXAAARALQATAKAKASQALASAAAWQAAAWgLASQgKASgTALQgRALgXAAQgVAAgSgLgAgogoQgRAQAAAYQAAAYARARQAQARAYAAQAZAAAQgRQARgRABgYQgBgYgRgQQgQgRgZgBQgYABgQARg");
	this.shape_58.setTransform(1078.525,238.075);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#333333").s().p("AiZEKIAAjAQgUAdgbAaQgZAagfAWIgGgFQAXgfASgnQASgmAMgqQANgpAJgpIhOAAIgEgQIBiAAIAAhfIgvADIgvABIgBgGQAhgLAlgQQAjgQAhgRQAggSAVgOIBQBLIAAgNIBSAhIAwAAIAlgpIBJA5QgDADgFAEQgGADgJACIAAFRQAAADgLAFQgLAFgPAFQgPAEgPAAIgOAAIAAg9Ig4AAIAAAqQAAAEgKAHQgJAGgQAFQgPAFgRABIgNAAIAAkjQgCADgEABIgIABIhTAAIAAAoQAsALAUARQAVARACASQAEATgKANQgIANgQACQgQACgSgOQgBgVgGgWQgHgVgJgRIAAD4QgBACgHAFQgIAFgOAFQgPAEgTAAgABnCNIA4AAIAAkoIg4AAgAgbh3IAYAWIAaAaIAAh1QgGAEgKAAQgJAAgOgFIgbAFIgfAFIAABnIAkg1IALAKg");
	this.shape_59.setTransform(1039.5,220.025);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#333333").s().p("AiEEDQAwg3AZg9QAZg+AJhDQAIhDABhLIhAAAIgFgQIBFAAIAAg7IAAg+IBnAJQgBAHgFAEQgFADgKACIgBAxIAAAvIAnAAIAqgpIBCA7QgDAEgGADQgGADgKACIgBAvIAFgBQApAXASAZQASAZABAWQABAXgLAOQgLAOgQABQgRABgRgSQAEgggDgfQgEghgJgcQgBBKgDA0QgCA0gFAiQgFAhgHAUQgIAUgLALQgQAPgUAHQgUAIgaAAQAAgUgDgOQgCgNgGgIQgGgJgMgHQgMgGgRgFIAAgGIAWABIAVABIARABQAGAAAFgCQAFgCADgDQAJgJAGgiQAFgiADhAQADg+AChhIgvAAQgBA9gIA4QgHA3gUAyQgUAygkArQgmArg9AkgAjZEJIAAljIgvAAIgFgPIA0AAIAAigIBeAJQgBAFgDAEQgFAEgJABIAACIIAfgrIAKAJIAXATIAZAWQgBAFgEACQgEACgGAAIhKAAIAAFJQgBAEgJAGQgJAGgOAFQgOAFgOAAgAhqBXQgMgFgHgMQgHgRAGgOQAGgOAOgKQAJgIAIgNQAJgOAGgRQAFgSgBgSIAHAAQAQAkAEAdQAEAdgFAWQgFAWgMANQgIAJgNADIgIABQgIAAgIgEg");
	this.shape_60.setTransform(984.3511,220.025);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#333333").s().p("AisEOIAAjzIBVAgIC4AAIAlgqIBNA7QgDAEgGAEQgHAEgKACIAACfQgBACgMAEQgLAEgPADQgPAEgPAAIgMAAIAAgwIjEAAIAAAbQgBAEgJAGQgLAFgPAFQgQAEgRABgAhcDLIDEAAIAAiAIjEAAgAglAnIAAh5QgxAkg6AcQg5Abg9AUIgCgFQAygcAuglQAvglAlgqQAkgpAUgoIjaAAIgFgQIGMAAIAqg0IAOAKIAfAXIAhAaQgBAEgFADQgEACgGAAIimAAQgKAOgLAOQgLANgOANIAZAJQgBAEgFADQgDADgJABIAACPQAAAEgKAFQgJAFgQAFQgOAEgRAAgADZANQgQAAgTgSQgKgSgRgVQgRgVgXgTQgXgUgbgNIADgGQA3ADAsAPQArAOAcAcQAPARABASQABASgLALQgKAMgPAAIgCAAg");
	this.shape_61.setTransform(927.6,219.625);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#333333").s().p("AkMEDQAogfAXgmQAXgmAKgoQAKgnABglIBtATQgBAGgFAEQgGAEgKAAQgEAQgGAPQgFAPgIAPQAMATAQALQAQALAVAGIAAilIjgAAIgFgOIGjAAIAog3IANAKIAcAZIAeAZQgBAFgEACQgFACgGAAIjIAAIAABNIAvAAIArg7IAOAMIAfAZIAhAdQgBAEgFADQgEACgHAAIiXAAIAABSIALAAIAMAAIAqAAIA2AAIA2AAIArgBIAAAGQgSAFgJASQgJASAAAXIieAAQgxAAgigJQgkgKgXgYQgYgYgPgrQgVAkgnAeQgnAfg8AVgAiqgQIAAjxIBZAjICqAAIAlgpIBNA5QgDAEgFADQgGAEgIACIAACUQgBACgMAFQgMAEgQADQgQAEgOAAIgPAAIAAgfIi0AAIAAAQQAAAEgLAGQgLAHgQAEQgRAFgSAAgAhVhJIC0AAIAAg8Ii0AAgAhViVIC0AAIAAg6Ii0AAg");
	this.shape_62.setTransform(871.975,220.125);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#333333").s().p("Ai7EKIAAiyQgRAWgSAUQgUAVgVASIgGgFQASggAPgnQAOgmAKgpQAKgoAHgpIhCAAIgEgQIBOAAIAAhZIgmAEIgmACIgCgFQAcgMAdgRQAcgQAagRQAZgRARgPIBTBIQgFAEgKABQgKAAgPgEIgVAFIgWAEIAABdIAagnIAKAJIAXAUIAXAYQgBAEgEADQgEACgGAAIhDAAIAAAcQApARASATQATATACATQACATgJANQgJAMgQACQgPABgRgPQAAgVgFgVQgFgVgGgSIAAEDQAAACgIAFQgIAFgNAEQgOAEgSABgAhFDsIgFgQICDAAIAAhoIhXAAIgEgQIBbAAIAAhiIhgAAIgEgPIDSAAIAhgvIALAJIAYAVIAZAYQgBAFgEABQgEACgGAAIhwAAIAABiIARAAIAjgwIALAJIAaAWIAbAXQgBAGgEABQgEADgGAAIhlAAIAABoIArAAIAhgwIALAJIAYAVIAaAZQgBAEgEADQgEACgHAAgAgYgqIAAjPIBLAdIBdAAIAigkIBGA1QgDADgFADQgGADgJACIAABzQgBADgKAEQgKAEgOADQgOADgNABIgNAAIAAgWIhmAAIAAAPQAAAFgJAEQgJAGgPAEQgOAEgOABgAAwhgIBmAAIAAhsIhmAAg");
	this.shape_63.setTransform(816.275,220.15);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#333333").s().p("AimEKIAAkVIBWAgICbAAIAogpIBMA6IgJAIQgFADgJACIAAC6QgCAEgLAGQgKAGgRAFQgPAFgQAAIgPAAIAAgoIinAAIAAASQABAEgLAGQgKAGgQAFQgPAEgSAAgAhVDPICnAAIAAhOIinAAgAhVBxICnAAIAAhMIinAAgAj/giIgFgQIEiAAIANgmIAMgqIAJgmIi3AAQAsAMAUAUQATATACATQABATgLANQgMANgSABQgTABgTgQQgBgcgIgaQgGgagMgVIhbAAIgFgQIDhAAIgKgDIgLgGQgCgUgIgTQgJgSgKgMIAEgDQAwgCAXALQAXAKAFAPQAFAPgKAOQgIANgRAFIBwAAIAog1IAOAKIAdAYIAfAaQgBAEgEACQgEADgHAAIiNAAIBXAaQgCAFgFADQgFADgKgBQgTASgdAXQgdAWgdATIBlAAIApg3IAPAKIAeAYIAhAcQgCAEgFACQgDADgHAAg");
	this.shape_64.setTransform(760.45,219.9156);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#333333").s().p("ABpELIAAk2Ig7AAIAAABQABAogGAqQgGAqgSApQgSApgnAkQgnAkhCAaIgDgEQAmggAXgjQAXgkAMgmQAMgmAEgoQAEgngBgpIAAi5IBQAbQAhgQAegTQAegRAUgPIBUBNQgGAEgKABQgLAAgPgFQgeAGgpAFQgpAFgsADIAABwIBoAAIAog3IAMALIAcAYIAeAaQgBAEgEACQgFADgGAAIg4AAIAAEkQAAACgIAEQgIAEgPAEQgPADgVABgAkDCgIAAl+IBNAfIAeAAIAigmIBGA2QgDAEgFADQgGADgIACIAAEGQgBADgKAEQgLAFgOAEQgPADgNABIgNAAIAAg8IgkAAIAABKQAAAFgJAGQgJAGgPAFQgOAFgRAAgAi3AsIAkAAIAAjbIgkAAg");
	this.shape_65.setTransform(705.575,219.95);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#333333").s().p("AkNEHQASgtAJgzQAIg0ACg1QACg0gBgyIAAizIA+ATQAcgQAZgSQAZgSAQgOIBNBDQgFAFgJAAQgKAAgOgEQgXAGgfAFQgfAFgiADIAABBIA0AAIAiglIBFA1IgIAHQgFADgJACIAACYQgBACgKAEQgLAEgOADQgOAEgMAAIgNAAIAAgkIg9AAQgDAngKAoQgLAngWAlQgWAlgmAegAibglIAAAiIgCAiIA8AAIAAiBIg6AAgAhVEFQAogvAUg2QAUg1AFg4QAGg3gBg3IAAimIBLAXQAfgQAcgSQAcgSASgOIBRBJQgGAEgKAAQgKABgPgFQgbAFglAFIhNAJIAABqIBUAAIAlgzIALAKIAbAWIAbAZQgBAFgEACQgEACgGAAIgsAAIAAEnQAAACgIAFQgIAFgPAFQgOAEgVAAIgPAAIAAk8IguAAQAAApgFAqQgFAsgQArQgQAsghAnQggAng5Aeg");
	this.shape_66.setTransform(648.325,219.875);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#333333").s().p("AglEFIANgTQAGgKAEgKIikAAIgUAhIhGgoIAIgJIAKgIIAAm5IBWAJQgBAGgEADQgEADgIABIAAFqQARgnALguQALguAGguIgpAAIgEgQIA/AAIAAjKIBRAIQgBAGgEAEQgFAFgLABIAACyIAJAAIAdgrIAIAHIARARIAVAUIAAhvIgGAAIgHABQgNAVgOAVQgOAWgPAQIgJgDIAGghIAFgpIAGgoIA9AXIAAguIBFAXQAZgRAXgTQAXgRAPgPIBOBDQgGAEgJAAQgLABgNgEQgXAFghAFQgfAFgjAEIAABvIBFAAIAkgyIAMAJIAbAWIAbAZQgCAFgEADQgEABgGAAIguAAIAAErQAAACgHAFQgHAFgNADQgOAEgTABIgNAAIAAk/IgkAAIAAAaQAAAlgDAoQgDAngNAnQgMAngbAkQgbAjgsAdgAi1DOIBuAAIAcgnIAGAFIAOAMIASAQQANgkAHgmQAGgmACgoQADgnAAgmIAAgIQgEABgFAAIhLAAIAAAWQAlASAQAVQAQAVACASQACATgHAMQgIAMgOABQgNACgPgNQABgWgEgWQgFgYgIgUIAACgQABAEgIAEQgIAFgLAEQgLADgMAAIgLAAIAAhxQgMAUgPATQgPARgRASIgEgHgAiphYQAEgagEgcQgDgcgHgWIAHgDQAjAbALAZQALAZgGATQgFASgOAEIgHACQgKAAgMgNg");
	this.shape_67.setTransform(592.5,220.1);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#333333").s().p("ACMDpQgDgOgIgKQgHgJgLgHQgLgGgWgEIAAgIIAJABIAXABIAYACIARABQAHAAADgDQACgCAAgFIAAmzIBlAJQAAAHgFAEQgFAEgKABIAAGfQAAAcgHASQgHAUgVALQgWAKgrAEQgBgTgDgOgAkHEFQA3gpAcgyQAbg0AGhAIhsAAIgEgQIBxAAIABgSIAAgTIAAg3IhdAAIgEgQIBhAAIAAjEIBjAKQAAAGgFADQgEAFgLACIAACqIAQAAIAkgzIALAKIAZAXIAbAZQgBAEgEACQgEADgHAAIhjAAIAAA3QAAATgCASIAeAAIAkgyIAIAIIAWASIAZAXIAAj4IBgAIQgBAGgEAFQgFAEgLACIAAEpQAAAEgKAEQgJAFgOAEQgOAEgPAAIgNAAIAAhPIgEAAIgDABIhzAAQgHAxgVApQgWAogoAfQgnAeg+AUgAjhhlQACghgHggQgHgggLgdIAFgCQAvAUAVAYQAWAYACAXQADAWgLAPQgLAQgSABIgDABQgRAAgRgSgAhAhXIAIgrIAKgxIAJg0IBZAiQgCAFgGAEQgGACgKAAQgTAbgWAbQgVAbgXAVg");
	this.shape_68.setTransform(536.175,220.25);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#333333").s().p("AB4DqQgDgOgFgJQgGgJgJgGQgKgGgSgEIAAgHIAHAAIASABIAUABIANABQAHAAABgDQACgDAAgFIAAgkIh8AAIAABpQAAAEgKAGQgIAGgPAEQgQAFgRAAIgLAAIAAkxIBRAgIBzAAIAhgmIkHAAIgFgQICAAAIAAg1IhZAAIgFgQIBeAAIAAgyIhuAAIgEgQIByAAIAAhFIBiAIQgBAGgEADQgEAEgJACIAAAuIAtAAIAngzIAMAKIAcAXIAfAZQgCAFgFACQgDACgHAAIiKAAIAAAyIAfAAIAkgvIALAJIAaAWIAcAXQgBAFgEACQgEACgGAAIh1AAIAAA1IAxAAIAogzIANAKIAcAXIAeAZQgBAFgEACQgEACgHAAIhRAAIBIA1IgIAHQgGADgJACIAAChQAAAZgGASQgHASgUALQgUALgpAEQgBgUgCgNgAANB3IB8AAIAAgxIh8AAgAANA2IB8AAIAAgwIh8AAgAjmCjQAVgLAHgIQAGgHAAgKIAAjhIhAAAIgFgPIBGAAIAigiIA/AzQgCAEgGADQgFACgLACIAADGIAXgNIAWgMIADADQgKASgUAeQgTAfgbAkQgDAOgHAKQgFAKgIAFgAiwifQgHgbgOgZQgPgagOgTIAEgDQAzAFAbAPQAbAQAGASQAGATgIAPQgHAQgRAEIgKABQgNAAgQgJg");
	this.shape_69.setTransform(480.1,220.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36}]}).to({state:[{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.A1},{t:this.B1},{t:this.A2},{t:this.B2}]},6).wait(408));

	// bg
	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#FFFFFF").s().p("EiLsBMwQhvAAhQhPQhPhPAAhwMAAAiRDQAAhwBPhPQBQhPBvAAMEXZAAAQBvAABPBPQBQBPAABwMAAACRDQAABwhQBPQhPBPhvAAg");
	this.shape_70.setTransform(959.9897,540.0003,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_70).wait(414));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(960,540,921,491.29999999999995);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#F7C677",
	opacity: 1.00,
	manifest: [
		{src:"sounds/fail.mp3?1690351801592", id:"fail"},
		{src:"sounds/victory.mp3?1690351801592", id:"victory"},
		{src:"sounds/yx52010101听辨和声音程题目.mp3?1690351801592", id:"yx52010101听辨和声音程题目"},
		{src:"sounds/yx52010102听辨和声音程题目.mp3?1690351801592", id:"yx52010102听辨和声音程题目"}
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