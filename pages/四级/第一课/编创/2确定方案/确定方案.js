(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"确定方案_atlas_1", frames: [[0,0,1422,133],[1679,0,260,96],[0,613,561,214],[563,613,556,214],[0,135,561,237],[563,135,556,237],[0,374,560,237],[1121,135,556,237],[562,374,560,237],[1124,374,556,237]]}
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



(lib.Bitmap1 = function() {
	this.initialize(ss["确定方案_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap2 = function() {
	this.initialize(ss["确定方案_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.yp440103_01 = function() {
	this.initialize(ss["确定方案_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.yp440103_03 = function() {
	this.initialize(ss["确定方案_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.yp440103_06 = function() {
	this.initialize(ss["确定方案_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.yp440103_07 = function() {
	this.initialize(ss["确定方案_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.yp440103_10 = function() {
	this.initialize(ss["确定方案_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.yp440103_12 = function() {
	this.initialize(ss["确定方案_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.yp440103_15 = function() {
	this.initialize(ss["确定方案_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.yp440103_16 = function() {
	this.initialize(ss["确定方案_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.元件1复制3 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#CC3300").ss(2,1,1).p("AgHgDIAPAH");
	this.shape.setTransform(0.825,0.4125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#CC3300").ss(2,1,1).p("Ahoi6IDRF1");
	this.shape_1.setTransform(10.45,18.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#CC3300").ss(2,1,1).p("AjIlyIGRLl");
	this.shape_2.setTransform(20.05,37.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#CC3300").ss(2,1,1).p("AkoopIJRRT");
	this.shape_3.setTransform(29.675,55.35);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#CC3300").ss(2,1,1).p("AmIrgIMRXB");
	this.shape_4.setTransform(39.3,73.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#CC3300").ss(2,1,1).p("AnouXIPRcv");
	this.shape_5.setTransform(48.9,91.975);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#CC3300").ss(2,1,1).p("ApIxOMASRAid");
	this.shape_6.setTransform(58.525,110.275);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#CC3300").ss(2,1,1).p("Aqp0FMAVTAoL");
	this.shape_7.setTransform(68.15,128.6);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#CC3300").ss(2,1,1).p("AsJ28MAYTAt5");
	this.shape_8.setTransform(77.75,146.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#CC3300").ss(2,1,1).p("Atp5zMAbTAzn");
	this.shape_9.setTransform(87.375,165.2);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#CC3300").ss(2,1,1).p("AvJ8qMAeTA5V");
	this.shape_10.setTransform(96.975,183.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#CC3300").ss(2,1,1).p("Awp/hMAhTA/D");
	this.shape_11.setTransform(106.6,201.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#CC3300").ss(2,1,1).p("EgSJgiYMAkTBEx");
	this.shape_12.setTransform(116.225,220.125);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#CC3300").ss(2,1,1).p("EgTpglQMAnTBKh");
	this.shape_13.setTransform(125.825,238.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#CC3300").ss(2,1,1).p("EgVKgoHMAqVBQP");
	this.shape_14.setTransform(135.45,256.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,272.9,515.5);


(lib.元件1复制2 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#CC3300").ss(2,1,1).p("AgHgDIAPAH");
	this.shape.setTransform(0.825,0.4125);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#CC3300").ss(2,1,1).p("Ahmh8IDND5");
	this.shape_1.setTransform(10.325,12.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#CC3300").ss(2,1,1).p("AjGj0IGNHp");
	this.shape_2.setTransform(19.85,24.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#CC3300").ss(2,1,1).p("AkllsIJLLZ");
	this.shape_3.setTransform(29.35,36.525);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#CC3300").ss(2,1,1).p("AmEnlIMJPL");
	this.shape_4.setTransform(38.875,48.575);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#CC3300").ss(2,1,1).p("AnjpdIPHS7");
	this.shape_5.setTransform(48.375,60.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#CC3300").ss(2,1,1).p("ApCrWISFWt");
	this.shape_6.setTransform(57.9,72.65);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#CC3300").ss(2,1,1).p("AqhtOIVDad");
	this.shape_7.setTransform(67.4,84.675);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#CC3300").ss(2,1,1).p("AsAvGIYBeN");
	this.shape_8.setTransform(76.9,96.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#CC3300").ss(2,1,1).p("Atfw/MAa/Ah/");
	this.shape_9.setTransform(86.425,108.75);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#CC3300").ss(2,1,1).p("Au+y3MAd9Alv");
	this.shape_10.setTransform(95.925,120.775);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#CC3300").ss(2,1,1).p("Awe0vMAg9Apf");
	this.shape_11.setTransform(105.45,132.825);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#CC3300").ss(2,1,1).p("Ax92oMAj7AtR");
	this.shape_12.setTransform(114.95,144.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#CC3300").ss(2,1,1).p("Azc4gMAm5AxB");
	this.shape_13.setTransform(124.475,156.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#CC3300").ss(2,1,1).p("A076YMAp3A0x");
	this.shape_14.setTransform(133.975,168.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,270,339.9);


(lib.元件1复制 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#990000").ss(2,1,1).p("AgGAAIANAA");
	this.shape.setTransform(18.275,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#9D0400").ss(2,1,1).p("AhlAAIDLAA");
	this.shape_1.setTransform(27.8,0);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#A00700").ss(2,1,1).p("AjDAAIGHAA");
	this.shape_2.setTransform(37.325,0);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#A40B00").ss(2,1,1).p("AkiAAIJFAA");
	this.shape_3.setTransform(46.85,0);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#A80F00").ss(2,1,1).p("AmAAAIMBAA");
	this.shape_4.setTransform(56.375,0);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#AB1200").ss(2,1,1).p("AnfAAIO/AA");
	this.shape_5.setTransform(65.925,0);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#AF1600").ss(2,1,1).p("Ao9AAIR7AA");
	this.shape_6.setTransform(75.425,0);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#B31A00").ss(2,1,1).p("AqcAAIU5AA");
	this.shape_7.setTransform(84.975,0);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#B61D00").ss(2,1,1).p("Ar7AAIX3AA");
	this.shape_8.setTransform(94.5,0);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#BA2100").ss(2,1,1).p("AtZAAIazAA");
	this.shape_9.setTransform(104,0);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#BD2400").ss(2,1,1).p("Au4AAIdxAA");
	this.shape_10.setTransform(113.55,0);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#C12800").ss(2,1,1).p("AwWAAMAgtAAA");
	this.shape_11.setTransform(123.075,0);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#C52C00").ss(2,1,1).p("Ax1AAMAjrAAA");
	this.shape_12.setTransform(132.6,0);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#C82F00").ss(2,1,1).p("AzTAAMAmnAAA");
	this.shape_13.setTransform(142.125,0);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#CC3300").ss(2,1,1).p("A0yAAMAplAAA");
	this.shape_14.setTransform(151.65,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(16.6,-1,269.2,2);


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
	this.shape.graphics.f().s("#CC3300").ss(2,1,1).p("AgHgDIAPAH");
	this.shape.setTransform(15.825,2.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#CC3300").ss(2,1,1).p("Ahmg9IDNB8");
	this.shape_1.setTransform(25.55,8.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#CC3300").ss(2,1,1).p("AjEh4IGKDw");
	this.shape_2.setTransform(35.3,14.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#CC3300").ss(2,1,1).p("AkjiyIJHFl");
	this.shape_3.setTransform(45.025,20.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#CC3300").ss(2,1,1).p("AmCjsIMFHZ");
	this.shape_4.setTransform(54.775,26.175);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#CC3300").ss(2,1,1).p("AnhkmIPDJN");
	this.shape_5.setTransform(64.525,32.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#CC3300").ss(2,1,1).p("ApAlgISBLB");
	this.shape_6.setTransform(74.25,38);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#CC3300").ss(2,1,1).p("AqemaIU9M1");
	this.shape_7.setTransform(84,43.95);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#CC3300").ss(2,1,1).p("Ar9nUIX7Op");
	this.shape_8.setTransform(93.725,49.875);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#CC3300").ss(2,1,1).p("AtcoOIa5Qd");
	this.shape_9.setTransform(103.45,55.775);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#CC3300").ss(2,1,1).p("Au6pJId1ST");
	this.shape_10.setTransform(113.2,61.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#CC3300").ss(2,1,1).p("AwZqDMAgzAUH");
	this.shape_11.setTransform(122.95,67.6);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#CC3300").ss(2,1,1).p("Ax4q9MAjxAV7");
	this.shape_12.setTransform(132.675,73.525);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#CC3300").ss(2,1,1).p("AzWr3MAmtAXv");
	this.shape_13.setTransform(142.425,79.425);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#CC3300").ss(2,1,1).p("A01sxMAprAZj");
	this.shape_14.setTransform(152.15,85.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(14,1.1,272.6,167.1);


(lib.未选中点 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#990000").ss(1,1,1).p("ACJAAQAAA4goAoQgoApg5AAQg3AAgogpQgogoAAg4QAAg3AogoQAogpA3AAQA5AAAoApQAoAoAAA3g");
	this.shape.setTransform(7.5009,7.4821,0.7328,0.7328);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.5,22,22);


(lib.选中点 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#990000").ss(1,1,1).p("ACJAAQAAA4goAoQgoApg5AAQg3AAgogpQgogoAAg4QAAg3AogoQAogpA3AAQA5AAAoApQAoAoAAA3g");
	this.shape.setTransform(9.9905,10.0184,0.7325,0.7325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CC3300").s().p("AhfBgQgogoAAg4QAAg3AogoQAogpA3AAQA4AAAoApQAoAoABA3QgBA4goAoQgoApg4AAQg3AAgogpg");
	this.shape_1.setTransform(9.9905,10.0184,0.7325,0.7325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,22,22);


(lib.r4 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.未选中点("synched",0);
	this.instance.setTransform(-41,47.7,1,1,0,0,0,5,5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// 图层_1
	this.instance_1 = new lib.yp440103_16();
	this.instance_1.setTransform(0,0,0.6937,0.6937);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.5,0,435.2,164.4);


(lib.r3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.未选中点("synched",0);
	this.instance.setTransform(-40.95,47.7,1,1,0,0,0,5,5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// 图层_1
	this.instance_1 = new lib.yp440103_12();
	this.instance_1.setTransform(0,0,0.6937,0.6937);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.4,0,435.09999999999997,164.4);


(lib.r2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.未选中点("synched",0);
	this.instance.setTransform(-41,49.3,1,1,0,0,0,5,5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// 图层_1
	this.instance_1 = new lib.yp440103_07();
	this.instance_1.setTransform(0,0,0.6937,0.6937);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.5,0,435.2,164.4);


(lib.r1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.未选中点("synched",0);
	this.instance.setTransform(-40.95,46.1,1,1,0,0,0,5,5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// 图层_1
	this.instance_1 = new lib.yp440103_03();
	this.instance_1.setTransform(0,0,0.6937,0.6937);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.4,0,435.09999999999997,148.5);


(lib.l4 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.未选中点("synched",0);
	this.instance.setTransform(422.55,47.6,1,1,0,0,0,5,5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// 图层_1
	this.instance_1 = new lib.yp440103_15();
	this.instance_1.setTransform(0,0,0.6937,0.6937);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,436.1,164.4);


(lib.l3 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.未选中点("synched",0);
	this.instance.setTransform(423.5,49.65,1,1,0,0,0,5,5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// 图层_1
	this.instance_1 = new lib.yp440103_10();
	this.instance_1.setTransform(0,0,0.6937,0.6937);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,437,164.4);


(lib.l2 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.未选中点("synched",0);
	this.instance.setTransform(423.6,48.6,1,1,0,0,0,5,5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// 图层_1
	this.instance_1 = new lib.yp440103_06();
	this.instance_1.setTransform(0,0,0.6937,0.6937);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,437.1,164.4);


(lib.l1 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.未选中点("synched",0);
	this.instance.setTransform(423.6,46.1,1,1,0,0,0,5,5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// 图层_1
	this.instance_1 = new lib.yp440103_01();
	this.instance_1.setTransform(0,0,0.6937,0.6937);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,437.1,148.5);


// stage content:
(lib.确定方案 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {l1:2,l2:342,l3:652,l4:952,"l1.1":5,"l1.2":87,"l1.3":169,"l1.4":253,"l2.1":345,"l2.2":423,"l2.3":500,"l2.4":576,"l3.1":655,"l3.2":730,"l3.3":804,"l3.4":877,"l4.1":955,"l4.2":1029,"l4.3":1101,"l4.4":1170};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,2,28,57,85,109,138,168,194,223,252,281,310,341,342,361,392,422,438,469,499,516,547,575,590,621,651,652,670,700,729,744,774,803,818,848,876,893,923,951,952,968,998,1027,1041,1071,1099,1113,1141,1168,1182,1211,1240];
	this.streamSoundSymbolsList[28] = [{id:"_11课一11",startFrame:28,endFrame:57,loop:1,offset:0}];
	this.streamSoundSymbolsList[57] = [{id:"_11课一21",startFrame:57,endFrame:86,loop:1,offset:0}];
	this.streamSoundSymbolsList[109] = [{id:"_11课一11",startFrame:109,endFrame:138,loop:1,offset:0}];
	this.streamSoundSymbolsList[138] = [{id:"_11课一22",startFrame:138,endFrame:168,loop:1,offset:0}];
	this.streamSoundSymbolsList[194] = [{id:"_11课一11",startFrame:194,endFrame:223,loop:1,offset:0}];
	this.streamSoundSymbolsList[223] = [{id:"_11课一23",startFrame:223,endFrame:253,loop:1,offset:0}];
	this.streamSoundSymbolsList[281] = [{id:"_11课一11",startFrame:281,endFrame:310,loop:1,offset:0}];
	this.streamSoundSymbolsList[310] = [{id:"_11课一24",startFrame:310,endFrame:340,loop:1,offset:0}];
	this.streamSoundSymbolsList[361] = [{id:"_11课一12",startFrame:361,endFrame:392,loop:1,offset:0}];
	this.streamSoundSymbolsList[392] = [{id:"_11课一21",startFrame:392,endFrame:421,loop:1,offset:0}];
	this.streamSoundSymbolsList[438] = [{id:"_11课一12",startFrame:438,endFrame:469,loop:1,offset:0}];
	this.streamSoundSymbolsList[469] = [{id:"_11课一22",startFrame:469,endFrame:516,loop:1,offset:0}];
	this.streamSoundSymbolsList[516] = [{id:"_11课一12",startFrame:516,endFrame:547,loop:1,offset:0}];
	this.streamSoundSymbolsList[547] = [{id:"_11课一23",startFrame:547,endFrame:590,loop:1,offset:0}];
	this.streamSoundSymbolsList[590] = [{id:"_11课一12",startFrame:590,endFrame:621,loop:1,offset:0}];
	this.streamSoundSymbolsList[621] = [{id:"_11课一24",startFrame:621,endFrame:652,loop:1,offset:0}];
	this.streamSoundSymbolsList[670] = [{id:"_11课一13",startFrame:670,endFrame:700,loop:1,offset:0}];
	this.streamSoundSymbolsList[700] = [{id:"_11课一21",startFrame:700,endFrame:729,loop:1,offset:0}];
	this.streamSoundSymbolsList[744] = [{id:"_11课一13",startFrame:744,endFrame:774,loop:1,offset:0}];
	this.streamSoundSymbolsList[774] = [{id:"_11课一22",startFrame:774,endFrame:803,loop:1,offset:0}];
	this.streamSoundSymbolsList[818] = [{id:"_11课一13",startFrame:818,endFrame:848,loop:1,offset:0}];
	this.streamSoundSymbolsList[848] = [{id:"_11课一23",startFrame:848,endFrame:876,loop:1,offset:0}];
	this.streamSoundSymbolsList[893] = [{id:"_11课一13",startFrame:893,endFrame:923,loop:1,offset:0}];
	this.streamSoundSymbolsList[923] = [{id:"_11课一24",startFrame:923,endFrame:952,loop:1,offset:0}];
	this.streamSoundSymbolsList[968] = [{id:"_11课一14",startFrame:968,endFrame:998,loop:1,offset:0}];
	this.streamSoundSymbolsList[998] = [{id:"_11课一21",startFrame:998,endFrame:1027,loop:1,offset:0}];
	this.streamSoundSymbolsList[1041] = [{id:"_11课一14",startFrame:1041,endFrame:1071,loop:1,offset:0}];
	this.streamSoundSymbolsList[1071] = [{id:"_11课一22",startFrame:1071,endFrame:1113,loop:1,offset:0}];
	this.streamSoundSymbolsList[1113] = [{id:"_11课一14",startFrame:1113,endFrame:1141,loop:1,offset:0}];
	this.streamSoundSymbolsList[1141] = [{id:"_11课一23",startFrame:1141,endFrame:1182,loop:1,offset:0}];
	this.streamSoundSymbolsList[1182] = [{id:"_11课一14",startFrame:1182,endFrame:1211,loop:1,offset:0}];
	this.streamSoundSymbolsList[1211] = [{id:"_11课一24",startFrame:1211,endFrame:1241,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		
		
		
		var _this = this;
		
		
		_this.l1_btn.on('click', function(){
			
		_this.gotoAndStop('l1');
			
		});
		
		
		_this.l2_btn.on('click', function(){
			
		_this.gotoAndStop('l2');
			
		});
		
		
		_this.l3_btn.on('click', function(){
			
		_this.gotoAndStop('l3');
			
		});
		
		
		_this.l4_btn.on('click', function(){
			
		_this.gotoAndStop('l4');
			
		});
	}
	this.frame_2 = function() {
		var _this = this;
		
		
		_this.l1r1btn.on('click', function(){
		
		_this.gotoAndPlay('l1.1');
			
		});
		
		
		_this.l1r2btn.on('click', function(){
		
		_this.gotoAndPlay('l1.2');
			
		});
		
		
		_this.l1r3btn.on('click', function(){
		
		_this.gotoAndPlay('l1.3');
			
		});
		
		_this.l1r4btn.on('click', function(){
		
		_this.gotoAndPlay('l1.4');
			
		});
	}
	this.frame_28 = function() {
		var soundInstance = playSound("_11课一11",0);
		this.InsertIntoSoundStreamData(soundInstance,28,57,1);
	}
	this.frame_57 = function() {
		var soundInstance = playSound("_11课一21",0);
		this.InsertIntoSoundStreamData(soundInstance,57,86,1);
	}
	this.frame_85 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_109 = function() {
		var soundInstance = playSound("_11课一11",0);
		this.InsertIntoSoundStreamData(soundInstance,109,138,1);
	}
	this.frame_138 = function() {
		var soundInstance = playSound("_11课一22",0);
		this.InsertIntoSoundStreamData(soundInstance,138,168,1);
	}
	this.frame_168 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_194 = function() {
		var soundInstance = playSound("_11课一11",0);
		this.InsertIntoSoundStreamData(soundInstance,194,223,1);
	}
	this.frame_223 = function() {
		var soundInstance = playSound("_11课一23",0);
		this.InsertIntoSoundStreamData(soundInstance,223,253,1);
	}
	this.frame_252 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_281 = function() {
		var soundInstance = playSound("_11课一11",0);
		this.InsertIntoSoundStreamData(soundInstance,281,310,1);
	}
	this.frame_310 = function() {
		var soundInstance = playSound("_11课一24",0);
		this.InsertIntoSoundStreamData(soundInstance,310,340,1);
	}
	this.frame_341 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_342 = function() {
		var _this = this;
		
		
		_this.l2r1btn.on('click', function(){
		
		_this.gotoAndPlay('l2.1');
			
		});
		
		
		_this.l2r2btn.on('click', function(){
		
		_this.gotoAndPlay('l2.2');
			
		});
		
		
		_this.l2r3btn.on('click', function(){
		
		_this.gotoAndPlay('l2.3');
			
		});
		
		_this.l2r4btn.on('click', function(){
		
		_this.gotoAndPlay('l2.4');
			
		});
	}
	this.frame_361 = function() {
		var soundInstance = playSound("_11课一12",0);
		this.InsertIntoSoundStreamData(soundInstance,361,392,1);
	}
	this.frame_392 = function() {
		var soundInstance = playSound("_11课一21",0);
		this.InsertIntoSoundStreamData(soundInstance,392,421,1);
	}
	this.frame_422 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_438 = function() {
		var soundInstance = playSound("_11课一12",0);
		this.InsertIntoSoundStreamData(soundInstance,438,469,1);
	}
	this.frame_469 = function() {
		var soundInstance = playSound("_11课一22",0);
		this.InsertIntoSoundStreamData(soundInstance,469,516,1);
	}
	this.frame_499 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_516 = function() {
		var soundInstance = playSound("_11课一12",0);
		this.InsertIntoSoundStreamData(soundInstance,516,547,1);
	}
	this.frame_547 = function() {
		var soundInstance = playSound("_11课一23",0);
		this.InsertIntoSoundStreamData(soundInstance,547,590,1);
	}
	this.frame_575 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_590 = function() {
		var soundInstance = playSound("_11课一12",0);
		this.InsertIntoSoundStreamData(soundInstance,590,621,1);
	}
	this.frame_621 = function() {
		var soundInstance = playSound("_11课一24",0);
		this.InsertIntoSoundStreamData(soundInstance,621,652,1);
	}
	this.frame_651 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_652 = function() {
		var _this = this;
		
		
		_this.l3r1_btn.on('click', function(){
		
		_this.gotoAndPlay('l3.1');
			
		});
		
		
		_this.l3r2_btn.on('click', function(){
		
		_this.gotoAndPlay('l3.2');
			
		});
		
		
		_this.l3r3_btn.on('click', function(){
		
		_this.gotoAndPlay('l3.3');
			
		});
		
		_this.l3r4_btn.on('click', function(){
		
		_this.gotoAndPlay('l3.4');
			
		});
	}
	this.frame_670 = function() {
		var soundInstance = playSound("_11课一13",0);
		this.InsertIntoSoundStreamData(soundInstance,670,700,1);
	}
	this.frame_700 = function() {
		var soundInstance = playSound("_11课一21",0);
		this.InsertIntoSoundStreamData(soundInstance,700,729,1);
	}
	this.frame_729 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_744 = function() {
		var soundInstance = playSound("_11课一13",0);
		this.InsertIntoSoundStreamData(soundInstance,744,774,1);
	}
	this.frame_774 = function() {
		var soundInstance = playSound("_11课一22",0);
		this.InsertIntoSoundStreamData(soundInstance,774,803,1);
	}
	this.frame_803 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_818 = function() {
		var soundInstance = playSound("_11课一13",0);
		this.InsertIntoSoundStreamData(soundInstance,818,848,1);
	}
	this.frame_848 = function() {
		var soundInstance = playSound("_11课一23",0);
		this.InsertIntoSoundStreamData(soundInstance,848,876,1);
	}
	this.frame_876 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_893 = function() {
		var soundInstance = playSound("_11课一13",0);
		this.InsertIntoSoundStreamData(soundInstance,893,923,1);
	}
	this.frame_923 = function() {
		var soundInstance = playSound("_11课一24",0);
		this.InsertIntoSoundStreamData(soundInstance,923,952,1);
	}
	this.frame_951 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_952 = function() {
		var _this = this;
		
		
		_this.l4r1_btn.on('click', function(){
		
		_this.gotoAndPlay('l4.1');
			
		});
		
		
		_this.l4r2_btn.on('click', function(){
		
		_this.gotoAndPlay('l4.2');
			
		});
		
		
		_this.l4r3_btn.on('click', function(){
		
		_this.gotoAndPlay('l4.3');
			
		});
		
		_this.l4r4_btn.on('click', function(){
		
		_this.gotoAndPlay('l4.4');
			
		});
	}
	this.frame_968 = function() {
		var soundInstance = playSound("_11课一14",0);
		this.InsertIntoSoundStreamData(soundInstance,968,998,1);
	}
	this.frame_998 = function() {
		var soundInstance = playSound("_11课一21",0);
		this.InsertIntoSoundStreamData(soundInstance,998,1027,1);
	}
	this.frame_1027 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_1041 = function() {
		var soundInstance = playSound("_11课一14",0);
		this.InsertIntoSoundStreamData(soundInstance,1041,1071,1);
	}
	this.frame_1071 = function() {
		var soundInstance = playSound("_11课一22",0);
		this.InsertIntoSoundStreamData(soundInstance,1071,1113,1);
	}
	this.frame_1099 = function() {
		var _this = this;
		
		_this.stop();
	}
	this.frame_1113 = function() {
		var soundInstance = playSound("_11课一14",0);
		this.InsertIntoSoundStreamData(soundInstance,1113,1141,1);
	}
	this.frame_1141 = function() {
		var soundInstance = playSound("_11课一23",0);
		this.InsertIntoSoundStreamData(soundInstance,1141,1182,1);
	}
	this.frame_1168 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}
	this.frame_1182 = function() {
		var soundInstance = playSound("_11课一14",0);
		this.InsertIntoSoundStreamData(soundInstance,1182,1211,1);
	}
	this.frame_1211 = function() {
		var soundInstance = playSound("_11课一24",0);
		this.InsertIntoSoundStreamData(soundInstance,1211,1241,1);
	}
	this.frame_1240 = function() {
		var _this = this;
		/*
		停止播放影片剪辑/视频
		停止播放指定影片剪辑或视频。
		*/
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2).call(this.frame_2).wait(26).call(this.frame_28).wait(29).call(this.frame_57).wait(28).call(this.frame_85).wait(24).call(this.frame_109).wait(29).call(this.frame_138).wait(30).call(this.frame_168).wait(26).call(this.frame_194).wait(29).call(this.frame_223).wait(29).call(this.frame_252).wait(29).call(this.frame_281).wait(29).call(this.frame_310).wait(31).call(this.frame_341).wait(1).call(this.frame_342).wait(19).call(this.frame_361).wait(31).call(this.frame_392).wait(30).call(this.frame_422).wait(16).call(this.frame_438).wait(31).call(this.frame_469).wait(30).call(this.frame_499).wait(17).call(this.frame_516).wait(31).call(this.frame_547).wait(28).call(this.frame_575).wait(15).call(this.frame_590).wait(31).call(this.frame_621).wait(30).call(this.frame_651).wait(1).call(this.frame_652).wait(18).call(this.frame_670).wait(30).call(this.frame_700).wait(29).call(this.frame_729).wait(15).call(this.frame_744).wait(30).call(this.frame_774).wait(29).call(this.frame_803).wait(15).call(this.frame_818).wait(30).call(this.frame_848).wait(28).call(this.frame_876).wait(17).call(this.frame_893).wait(30).call(this.frame_923).wait(28).call(this.frame_951).wait(1).call(this.frame_952).wait(16).call(this.frame_968).wait(30).call(this.frame_998).wait(29).call(this.frame_1027).wait(14).call(this.frame_1041).wait(30).call(this.frame_1071).wait(28).call(this.frame_1099).wait(14).call(this.frame_1113).wait(28).call(this.frame_1141).wait(27).call(this.frame_1168).wait(14).call(this.frame_1182).wait(29).call(this.frame_1211).wait(29).call(this.frame_1240).wait(1));

	// leftnav
	this.instance = new lib.Bitmap2();
	this.instance.setTransform(99,243);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(153,153,153,0.498)").s().p("AAgBoIAAgxQgJALgNALQgMAKgNAHIgFgFIgGgFQAOgGAMgJQAMgJAIgKIAMAEIAAgrIgWACIgWABIgBgFIgDgGIAjgDIAigDIAbgFIANAKIgWAEIgZADIAAAYIAEAFIADAEIAUgNIARgMIAKAIIgTANIgVAMQAKAKANAHQAMAHAOAFQgDABgCAEIgEAGQgQgGgNgKQgOgKgLgMIAAA0gAhCBoIgNgBIgBgHIgDgGIANABIAJAAIAEgBIADgCQADgCACgJIAEgYIADgpIg3AAIADgYIADgdIACgcIANABIgCAXIgCAXIgCAWIAYAAIAEgbIACgeIADgeIg0AAIAAgOIBCAAIgCAiIgEAkIgDAfIAGAAIALAAIAAACIAAAEQgCAegCATQgCATgDAKQgCAKgEADIgGAFIgIACIgKAAgAhsAxIAagGIAegIIABANIgcAIIgaAHgAgSA0IgFgFIAVgMQAKgHAHgHIANAEQgJAJgLAIQgKAJgLAFIgFgEgAAZgFIAAgOIgaAEIgYADIgDgMIAOgCIAAhBIgLAAIAAgMIBGAAIAAAMIgIAAIAAA7IAIgBIAAALIgIABIAAAQgAgCgbIAbgEIAAgNIgbAAgAgCg2IAbAAIAAgOIgbAAgAgChOIAbAAIAAgNIgbAAgAAxgPIgFgFQAHgFAHgGQAHgHAGgJIgLgNIgLgMIAJgHIAKALIAKALIAHgPQADgHACgIIgmAAIAAgNIApAAIADAAIACAAIAIACQgDAPgFAMQgFANgGALIAMAOIAJAMIgKAJIgIgLIgKgNIgNAPQgHAGgIAFIgDgFg");
	this.shape.setTransform(189.925,374.775);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(153,153,153,0.498)").s().p("AhjBlIgFgIQBDgIArgYQAsgZAVgqIAPAHQgXAtguAbQgsAZhFALIgDgIgAgFA5IAAhLIhhAAIAAgQIAlAAIAAg2IAQAAIAAA2IAuAAIAAhJIAPAAIAAAaIBHAAIAAAPIhHAAIAAAgIBdAAIAAAQIheAAIAABLgAhYAyIgGgFQAOgLAMgOQANgOAJgNIAPAEQgKAQgOAQQgNAQgOALIgGgGg");
	this.shape_1.setTransform(166.075,374.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(153,153,153,0.498)").s().p("AgBBlIgHgFQAPgPAKgWQAJgVAEgZQAGgZAAgbIgiAAIAAgQIAjAAIABgZIAAgaIAQAAIgBAaIAAAZIA1AAIAAAJIgDA9IgDAqIgDAaQgDAJgDADQgEAFgEACIgJACIgOAAIgTgBIgCgHIgDgIIATABIANAAIAFAAIAEgDQADgEADgNIAEgoIADhEIgmAAQgCAdgEAbQgFAbgKAXQgKAXgSARIgEgGgAhjBGIgDgIQACgBADgEIAGgLIAFgPIAHgXIAIgaIgiAAIAAgPIBpAAIAAAPIg3AAQgFASgGAUIgOAkIA8gMIgHgUIgIgTIAOgDIAJAXIAJAYIAFAUIgNAFIgCgIIgDgJIgoAJIgYAFIgLAEIgGACIgCgHgAhghMIAAgOIBbAAIAAAOg");
	this.shape_2.setTransform(142.25,374.525);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(153,153,153,0.498)").s().p("AhqBiIAAgQICJAAIAEgTIACgVIhsAAIAHgbIAGgfIAGgiIAGgfIg0AAIAAgPIDGAAIAAAPIiBAAIgEATIgDAVIBVAAIADgBIAMABIgDAbIgEAgIgEAgIgFAgIA7AAIAAAQgAgsABIgGAaIBZAAIAEgcIADgZIhWAAIgEAbg");
	this.shape_3.setTransform(118.3,374.6);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#CCCCCC").ss(1,1,1).p("AzdAAMAm7AAA");
	this.shape_4.setTransform(228.875,350.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance}]}).wait(1241));

	// 动画
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#CC3300").ss(2,1,1).p("AgJALIATgV");
	this.shape_5.setTransform(980.075,492.475);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#CC3300").ss(2,1,1).p("AhcA9IC5h5");
	this.shape_6.setTransform(988.35,487.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#CC3300").ss(2,1,1).p("AiuBvIFejd");
	this.shape_7.setTransform(996.6,482.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#CC3300").ss(2,1,1).p("AkBChIIDlB");
	this.shape_8.setTransform(1004.875,477.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#CC3300").ss(2,1,1).p("AlUDTIKpml");
	this.shape_9.setTransform(1013.125,472.525);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#CC3300").ss(2,1,1).p("AmnEFINPoJ");
	this.shape_10.setTransform(1021.4,467.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#CC3300").ss(2,1,1).p("An5E3IPzpt");
	this.shape_11.setTransform(1029.65,462.525);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#CC3300").ss(2,1,1).p("ApMFpISZrR");
	this.shape_12.setTransform(1037.925,457.55);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#CC3300").ss(2,1,1).p("AqeGbIU9s1");
	this.shape_13.setTransform(1046.175,452.55);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#CC3300").ss(2,1,1).p("ArxHNIXjuZ");
	this.shape_14.setTransform(1054.45,447.55);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#CC3300").ss(2,1,1).p("AtDH+IaIv7");
	this.shape_15.setTransform(1062.7,442.575);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#CC3300").ss(2,1,1).p("AuWIwIctxf");
	this.shape_16.setTransform(1070.975,437.575);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#CC3300").ss(2,1,1).p("AvpJiIfTzD");
	this.shape_17.setTransform(1079.225,432.6);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#CC3300").ss(2,1,1).p("Aw8KUMAh5gUn");
	this.shape_18.setTransform(1087.5,427.6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#CC3300").ss(2,1,1).p("AyOLGMAkdgWL");
	this.shape_19.setTransform(1095.75,422.6);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#CC3300").ss(2,1,1).p("AzhL4MAnDgXv");
	this.shape_20.setTransform(1104.025,417.625);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#CC3300").ss(2,1,1).p("A0zMqMApngZT");
	this.shape_21.setTransform(1112.275,412.625);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#CC3300").ss(2,1,1).p("AgLAAIAXAA");
	this.shape_22.setTransform(979.1,493.05);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#CC3300").ss(2,1,1).p("AhjAAIDHAA");
	this.shape_23.setTransform(988,493.075);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#CC3300").ss(2,1,1).p("Ai7AAIF3AA");
	this.shape_24.setTransform(996.85,493.1);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#CC3300").ss(2,1,1).p("AkTAAIInAB");
	this.shape_25.setTransform(1005.75,493.125);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#CC3300").ss(2,1,1).p("AlrAAILXAB");
	this.shape_26.setTransform(1014.625,493.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#CC3300").ss(2,1,1).p("AnDAAIOHAB");
	this.shape_27.setTransform(1023.5,493.175);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#CC3300").ss(2,1,1).p("AobgBIQ3AC");
	this.shape_28.setTransform(1032.4,493.2);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#CC3300").ss(2,1,1).p("ApzgBITnAD");
	this.shape_29.setTransform(1041.275,493.225);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#CC3300").ss(2,1,1).p("ArLgBIWXAD");
	this.shape_30.setTransform(1050.15,493.25);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#CC3300").ss(2,1,1).p("AsjgBIZHAD");
	this.shape_31.setTransform(1059.025,493.275);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#CC3300").ss(2,1,1).p("At7gCIb3AF");
	this.shape_32.setTransform(1067.925,493.3);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#CC3300").ss(2,1,1).p("AvTgCIenAF");
	this.shape_33.setTransform(1076.8,493.325);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#CC3300").ss(2,1,1).p("AwrgCMAhXAAF");
	this.shape_34.setTransform(1085.675,493.35);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#CC3300").ss(2,1,1).p("AyDgCMAkHAAF");
	this.shape_35.setTransform(1094.575,493.375);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#CC3300").ss(2,1,1).p("AzbgCMAm3AAG");
	this.shape_36.setTransform(1103.425,493.4);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#CC3300").ss(2,1,1).p("A0zgDMApnAAH");
	this.shape_37.setTransform(1112.325,493.425);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#CC3300").ss(2,1,1).p("AgGgDIANAH");
	this.shape_38.setTransform(979.1,493.425);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#CC3300").ss(2,1,1).p("AhZg5ICzB0");
	this.shape_39.setTransform(987.425,498.9);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#CC3300").ss(2,1,1).p("AishwIFZDh");
	this.shape_40.setTransform(995.75,504.375);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#CC3300").ss(2,1,1).p("Aj+inIH9FP");
	this.shape_41.setTransform(1004.075,509.875);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#CC3300").ss(2,1,1).p("AlRjeIKjG9");
	this.shape_42.setTransform(1012.425,515.35);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#CC3300").ss(2,1,1).p("AmkkVINJIr");
	this.shape_43.setTransform(1020.725,520.825);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#CC3300").ss(2,1,1).p("An3lLIPvKY");
	this.shape_44.setTransform(1029.05,526.3);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#CC3300").ss(2,1,1).p("ApKmCISVMF");
	this.shape_45.setTransform(1037.375,531.775);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#CC3300").ss(2,1,1).p("Aqdm5IU7Nz");
	this.shape_46.setTransform(1045.7,537.275);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#CC3300").ss(2,1,1).p("ArvnwIXfPh");
	this.shape_47.setTransform(1054.025,542.75);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#CC3300").ss(2,1,1).p("AtConIaFRP");
	this.shape_48.setTransform(1062.35,548.225);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#CC3300").ss(2,1,1).p("AuVpeIcrS8");
	this.shape_49.setTransform(1070.675,553.7);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#CC3300").ss(2,1,1).p("AvoqUIfRUp");
	this.shape_50.setTransform(1079.025,559.175);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#CC3300").ss(2,1,1).p("Aw7rLMAh3AWX");
	this.shape_51.setTransform(1087.325,564.65);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#CC3300").ss(2,1,1).p("AyOsCMAkcAYF");
	this.shape_52.setTransform(1095.65,570.15);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#CC3300").ss(2,1,1).p("Azgs5MAnBAZz");
	this.shape_53.setTransform(1103.975,575.625);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#CC3300").ss(2,1,1).p("A0ztwMApnAbg");
	this.shape_54.setTransform(1112.3,581.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#CC3300").ss(2,1,1).p("AgJgKIATAV");
	this.shape_55.setTransform(979.125,493.075);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#CC3300").ss(2,1,1).p("AhoiFIDREL");
	this.shape_56.setTransform(988.625,505.475);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#CC3300").ss(2,1,1).p("AjGkAIGNIB");
	this.shape_57.setTransform(998.15,517.875);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#CC3300").ss(2,1,1).p("Akll8IJLL5");
	this.shape_58.setTransform(1007.65,530.275);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#CC3300").ss(2,1,1).p("AmDn3IMHPv");
	this.shape_59.setTransform(1017.175,542.7);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#CC3300").ss(2,1,1).p("AnhpyIPDTl");
	this.shape_60.setTransform(1026.675,555.1);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#CC3300").ss(2,1,1).p("Ao/ruISAXc");
	this.shape_61.setTransform(1036.2,567.5);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#CC3300").ss(2,1,1).p("AqetpIU9bT");
	this.shape_62.setTransform(1045.725,579.925);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#CC3300").ss(2,1,1).p("Ar9vkIX7fJ");
	this.shape_63.setTransform(1055.225,592.3);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#CC3300").ss(2,1,1).p("AtbxgMAa3AjA");
	this.shape_64.setTransform(1064.75,604.7);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#CC3300").ss(2,1,1).p("Au6zbMAd1Am3");
	this.shape_65.setTransform(1074.25,617.1);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#CC3300").ss(2,1,1).p("AwY1WMAgxAqt");
	this.shape_66.setTransform(1083.775,629.525);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#CC3300").ss(2,1,1).p("Ax23RMAjtAuj");
	this.shape_67.setTransform(1093.275,641.925);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#CC3300").ss(2,1,1).p("AzV5MMAmrAyZ");
	this.shape_68.setTransform(1102.8,654.325);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#CC3300").ss(2,1,1).p("A0z7IMApnA2R");
	this.shape_69.setTransform(1112.3,666.725);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#CC3300").ss(2,1,1).p("AgKALIAVgV");
	this.shape_70.setTransform(977.85,671.25);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#CC3300").ss(2,1,1).p("AhiB8IDGj3");
	this.shape_71.setTransform(986.8,659.925);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#CC3300").ss(2,1,1).p("Ai7DsIF3nX");
	this.shape_72.setTransform(995.775,648.6);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#CC3300").ss(2,1,1).p("AkTFdIInq5");
	this.shape_73.setTransform(1004.725,637.275);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#CC3300").ss(2,1,1).p("AlrHNILXua");
	this.shape_74.setTransform(1013.675,625.95);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#CC3300").ss(2,1,1).p("AnDI+IOHx7");
	this.shape_75.setTransform(1022.65,614.625);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#CC3300").ss(2,1,1).p("AobKvIQ31c");
	this.shape_76.setTransform(1031.6,603.3);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#CC3300").ss(2,1,1).p("ApzMfITn49");
	this.shape_77.setTransform(1040.55,591.975);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#CC3300").ss(2,1,1).p("ArLOPIWX8d");
	this.shape_78.setTransform(1049.55,580.65);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#CC3300").ss(2,1,1).p("AsjQAIZH//");
	this.shape_79.setTransform(1058.5,569.325);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#CC3300").ss(2,1,1).p("At7RwMAb3gjf");
	this.shape_80.setTransform(1067.45,558);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#CC3300").ss(2,1,1).p("AvTThMAengnB");
	this.shape_81.setTransform(1076.425,546.675);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#CC3300").ss(2,1,1).p("AwrVRMAhXgqi");
	this.shape_82.setTransform(1085.375,535.35);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f().s("#CC3300").ss(2,1,1).p("AyDXCMAkHguD");
	this.shape_83.setTransform(1094.325,524.025);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f().s("#CC3300").ss(2,1,1).p("AzbYyMAm4gxk");
	this.shape_84.setTransform(1103.3,512.7);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f().s("#CC3300").ss(2,1,1).p("A00ajMAppg1F");
	this.shape_85.setTransform(1112.25,501.375);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f().s("#CC3300").ss(2,1,1).p("AhpBKIDTiT");
	this.shape_86.setTransform(989.575,663.85);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f().s("#CC3300").ss(1.9,1,1).p("AjHCIIGPkP");
	this.shape_87.setTransform(999.025,657.6);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f().s("#CC3300").ss(1.8,1,1).p("AkmDHIJNmN");
	this.shape_88.setTransform(1008.45,651.35);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f().s("#CC3300").ss(1.7,1,1).p("AmEEFIMJoJ");
	this.shape_89.setTransform(1017.9,645.125);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f().s("#CC3300").ss(1.7,1,1).p("AniFEIPGqH");
	this.shape_90.setTransform(1027.35,638.875);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f().s("#CC3300").ss(1.6,1,1).p("ApBGCISDsD");
	this.shape_91.setTransform(1036.775,632.625);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f().s("#CC3300").ss(1.5,1,1).p("AqfHBIU/uB");
	this.shape_92.setTransform(1046.225,626.375);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f().s("#CC3300").ss(1.5,1,1).p("Ar9H/IX8v9");
	this.shape_93.setTransform(1055.65,620.125);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f().s("#CC3300").ss(1.4,1,1).p("AtcI+Ia5x7");
	this.shape_94.setTransform(1065.075,613.875);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f().s("#CC3300").ss(1.3,1,1).p("Au6J8Id1z3");
	this.shape_95.setTransform(1074.525,607.625);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f().s("#CC3300").ss(1.2,1,1).p("AwZK7MAgzgV1");
	this.shape_96.setTransform(1083.975,601.4);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f().s("#CC3300").ss(1.2,1,1).p("Ax3L5MAjvgXx");
	this.shape_97.setTransform(1093.4,595.15);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f().s("#CC3300").ss(1.1,1,1).p("AzWM4MAmsgZu");
	this.shape_98.setTransform(1102.85,588.9);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f().s("#CC3300").ss(1,1,1).p("A00N2MAppgbr");
	this.shape_99.setTransform(1112.275,582.65);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f().s("#CC3300").ss(2,1,1).p("AgRAAIAjAA");
	this.shape_100.setTransform(979,671.25);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f().s("#CC3300").ss(2,1,1).p("AhvAAIDfAA");
	this.shape_101.setTransform(988.525,671.2);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f().s("#CC3300").ss(2,1,1).p("AjNABIGbgB");
	this.shape_102.setTransform(998.025,671.125);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f().s("#CC3300").ss(2,1,1).p("AkrACIJXgD");
	this.shape_103.setTransform(1007.575,671.075);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f().s("#CC3300").ss(2,1,1).p("AmJADIMTgF");
	this.shape_104.setTransform(1017.075,671);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f().s("#CC3300").ss(2,1,1).p("AnmADIPOgF");
	this.shape_105.setTransform(1026.6,670.925);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f().s("#CC3300").ss(2,1,1).p("ApEAEISKgH");
	this.shape_106.setTransform(1036.1,670.875);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f().s("#CC3300").ss(2,1,1).p("AqjAEIVGgH");
	this.shape_107.setTransform(1045.65,670.825);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f().s("#CC3300").ss(2,1,1).p("AsAAFIYBgJ");
	this.shape_108.setTransform(1055.175,670.75);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f().s("#CC3300").ss(2,1,1).p("AteAFIa9gK");
	this.shape_109.setTransform(1064.675,670.7);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f().s("#CC3300").ss(2,1,1).p("Au8AGId5gL");
	this.shape_110.setTransform(1074.2,670.625);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f().s("#CC3300").ss(2,1,1).p("AwaAHMAg1gAN");
	this.shape_111.setTransform(1083.7,670.55);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f().s("#CC3300").ss(2,1,1).p("Ax4AIMAjxgAP");
	this.shape_112.setTransform(1093.25,670.5);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f().s("#CC3300").ss(2,1,1).p("AzWAIMAmtgAP");
	this.shape_113.setTransform(1102.75,670.425);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f().s("#CC3300").ss(2,1,1).p("A00AJMAppgAR");
	this.shape_114.setTransform(1112.275,670.375);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f().s("#CC3300").ss(2,1,1).p("AgIgJIARAT");
	this.shape_115.setTransform(979.025,671.25);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f().s("#CC3300").ss(2,1,1).p("Ahbg9IC3B7");
	this.shape_116.setTransform(987.35,676.525);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f().s("#CC3300").ss(2,1,1).p("AiuhxIFdDj");
	this.shape_117.setTransform(995.675,681.825);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f().s("#CC3300").ss(2,1,1).p("AkBilIIDFL");
	this.shape_118.setTransform(1004,687.1);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f().s("#CC3300").ss(2,1,1).p("AlTjaIKnG1");
	this.shape_119.setTransform(1012.35,692.375);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f().s("#CC3300").ss(2,1,1).p("AmmkOINNId");
	this.shape_120.setTransform(1020.675,697.65);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f().s("#CC3300").ss(2,1,1).p("An4lCIPxKF");
	this.shape_121.setTransform(1029,702.95);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f().s("#CC3300").ss(2,1,1).p("ApLl2ISXLt");
	this.shape_122.setTransform(1037.325,708.225);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f().s("#CC3300").ss(2,1,1).p("AqemrIU9NX");
	this.shape_123.setTransform(1045.65,713.5);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f().s("#CC3300").ss(2,1,1).p("ArxnfIXjO/");
	this.shape_124.setTransform(1053.975,718.775);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f().s("#CC3300").ss(2,1,1).p("AtDoTIaIQn");
	this.shape_125.setTransform(1062.3,724.075);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f().s("#CC3300").ss(2,1,1).p("AuWpHIctSP");
	this.shape_126.setTransform(1070.625,729.35);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f().s("#CC3300").ss(2,1,1).p("Avpp7IfTT3");
	this.shape_127.setTransform(1078.975,734.625);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f().s("#CC3300").ss(2,1,1).p("Aw7qwMAh4AVh");
	this.shape_128.setTransform(1087.3,739.9);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f().s("#CC3300").ss(2,1,1).p("AyOrkMAkdAXI");
	this.shape_129.setTransform(1095.625,745.2);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f().s("#CC3300").ss(2,1,1).p("AzhsYMAnDAYx");
	this.shape_130.setTransform(1103.95,750.475);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f().s("#CC3300").ss(2,1,1).p("A00tMMAppAaZ");
	this.shape_131.setTransform(1112.275,755.75);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f().s("#CC3300").ss(2,1,1).p("AgGAJIANgR");
	this.shape_132.setTransform(979,840.1);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f().s("#CC3300").ss(1.9,1,1).p("AhsDMIDZmX");
	this.shape_133.setTransform(989.25,820.55);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f().s("#CC3300").ss(1.9,1,1).p("AjSGPIGlsd");
	this.shape_134.setTransform(999.5,800.975);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f().s("#CC3300").ss(1.8,1,1).p("Ak4JSIJxyj");
	this.shape_135.setTransform(1009.75,781.425);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f().s("#CC3300").ss(1.7,1,1).p("AmeMVIM94p");
	this.shape_136.setTransform(1020,761.85);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f().s("#CC3300").ss(1.6,1,1).p("AoEPYIQJ+u");
	this.shape_137.setTransform(1030.25,742.3);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f().s("#CC3300").ss(1.6,1,1).p("ApqSbMATVgk1");
	this.shape_138.setTransform(1040.5,722.75);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f().s("#CC3300").ss(1.5,1,1).p("ArQVdMAWhgq5");
	this.shape_139.setTransform(1050.775,703.175);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f().s("#CC3300").ss(1.4,1,1).p("As2YgMAZtgw/");
	this.shape_140.setTransform(1061.025,683.625);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f().s("#CC3300").ss(1.3,1,1).p("AucbjMAc5g3F");
	this.shape_141.setTransform(1071.275,664.075);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f().s("#CC3300").ss(1.3,1,1).p("AwCemMAgFg9L");
	this.shape_142.setTransform(1081.525,644.5);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f().s("#CC3300").ss(1.2,1,1).p("EgRoAhpMAjRhDR");
	this.shape_143.setTransform(1091.775,624.95);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f().s("#CC3300").ss(1.1,1,1).p("EgTOAksMAmdhJX");
	this.shape_144.setTransform(1102.025,605.375);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f().s("#CC3300").ss(1,1,1).p("EgU0AnvMApphPd");
	this.shape_145.setTransform(1112.275,585.825);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#CC3300").ss(2,1,1).p("Ah0CZIDpkx");
	this.shape_146.setTransform(990.725,825.675);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f().s("#CC3300").ss(2,1,1).p("AjjEoIHHpP");
	this.shape_147.setTransform(1001.775,811.225);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("#CC3300").ss(2,1,1).p("AlRG4IKjtv");
	this.shape_148.setTransform(1012.825,796.8);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f().s("#CC3300").ss(2,1,1).p("AnAJIIOByP");
	this.shape_149.setTransform(1023.85,782.35);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f().s("#CC3300").ss(2,1,1).p("AouLXIRd2t");
	this.shape_150.setTransform(1034.9,767.9);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f().s("#CC3300").ss(2,1,1).p("AqcNnIU57N");
	this.shape_151.setTransform(1045.925,753.475);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("#CC3300").ss(2,1,1).p("AsLP3IYX/s");
	this.shape_152.setTransform(1056.95,739.05);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f().s("#CC3300").ss(2,1,1).p("At5SGMAbzgkL");
	this.shape_153.setTransform(1068,724.6);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().s("#CC3300").ss(2,1,1).p("AvnUWMAfPgor");
	this.shape_154.setTransform(1079.05,710.175);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f().s("#CC3300").ss(2,1,1).p("AxWWlMAitgtJ");
	this.shape_155.setTransform(1090.075,695.725);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f().s("#CC3300").ss(2,1,1).p("AzEY1MAmJgxp");
	this.shape_156.setTransform(1101.125,681.275);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f().s("#CC3300").ss(2,1,1).p("A0zbFMApmg2J");
	this.shape_157.setTransform(1112.15,666.85);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f().s("#CC3300").ss(2,1,1).p("Ah1BQIDrif");
	this.shape_158.setTransform(989.45,833);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f().s("#CC3300").ss(2,1,1).p("AjjCWIHHkr");
	this.shape_159.setTransform(1000.65,825.85);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f().s("#CC3300").ss(2,1,1).p("AlSDcIKlm3");
	this.shape_160.setTransform(1011.8,818.75);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f().s("#CC3300").ss(2,1,1).p("AnAEjIOBpF");
	this.shape_161.setTransform(1022.95,811.625);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f().s("#CC3300").ss(2,1,1).p("AouFpIRdrR");
	this.shape_162.setTransform(1034.125,804.475);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f().s("#CC3300").ss(2,1,1).p("AqdGwIU7tf");
	this.shape_163.setTransform(1045.3,797.375);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f().s("#CC3300").ss(2,1,1).p("AsMH2IYYvr");
	this.shape_164.setTransform(1056.45,790.275);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f().s("#CC3300").ss(2,1,1).p("At6I9Ib1x5");
	this.shape_165.setTransform(1067.625,783.125);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f().s("#CC3300").ss(2,1,1).p("AvoKDIfR0F");
	this.shape_166.setTransform(1078.775,776.025);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f().s("#CC3300").ss(2,1,1).p("AxXLKMAivgWT");
	this.shape_167.setTransform(1089.925,768.9);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f().s("#CC3300").ss(2,1,1).p("AzFMQMAmLgYf");
	this.shape_168.setTransform(1101.125,761.75);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f().s("#CC3300").ss(2,1,1).p("A00NWMAppgas");
	this.shape_169.setTransform(1112.275,754.65);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f().s("#CC3300").ss(2,1,1).p("AgMAAIAZAA");
	this.shape_170.setTransform(978.425,841.05);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f().s("#CC3300").ss(2,1,1).p("Ah7AAID3AA");
	this.shape_171.setTransform(989.5,841.05);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f().s("#CC3300").ss(2,1,1).p("AjpAAIHUAA");
	this.shape_172.setTransform(1000.6,841.05);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f().s("#CC3300").ss(2,1,1).p("AlZAAIKyAA");
	this.shape_173.setTransform(1011.7,841.05);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f().s("#CC3300").ss(2,1,1).p("AnHAAIOPAA");
	this.shape_174.setTransform(1022.775,841.05);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f().s("#CC3300").ss(2,1,1).p("Ao2AAIRtAA");
	this.shape_175.setTransform(1033.875,841.05);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f().s("#CC3300").ss(2,1,1).p("AqlAAIVLAA");
	this.shape_176.setTransform(1044.95,841.05);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f().s("#CC3300").ss(2,1,1).p("AsUAAIYpAA");
	this.shape_177.setTransform(1056.025,841.05);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f().s("#CC3300").ss(2,1,1).p("AuDAAIcHAA");
	this.shape_178.setTransform(1067.125,841.05);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f().s("#CC3300").ss(2,1,1).p("AvyAAIflAA");
	this.shape_179.setTransform(1078.225,841.05);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f().s("#CC3300").ss(2,1,1).p("AxgAAMAjCAAA");
	this.shape_180.setTransform(1089.3,841.05);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f().s("#CC3300").ss(2,1,1).p("AzQAAMAmhAAA");
	this.shape_181.setTransform(1100.4,841.05);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f().s("#CC3300").ss(2,1,1).p("A0+AAMAp9AAA");
	this.shape_182.setTransform(1111.475,841.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_5}]},345).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},62).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},62).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},60).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_67}]},1).to({state:[{t:this.shape_68}]},1).to({state:[{t:this.shape_69}]},1).to({state:[]},62).to({state:[{t:this.shape_70,p:{x:977.85,y:671.25}}]},3).to({state:[{t:this.shape_71}]},1).to({state:[{t:this.shape_72}]},1).to({state:[{t:this.shape_73}]},1).to({state:[{t:this.shape_74}]},1).to({state:[{t:this.shape_75}]},1).to({state:[{t:this.shape_76}]},1).to({state:[{t:this.shape_77}]},1).to({state:[{t:this.shape_78}]},1).to({state:[{t:this.shape_79}]},1).to({state:[{t:this.shape_80}]},1).to({state:[{t:this.shape_81}]},1).to({state:[{t:this.shape_82}]},1).to({state:[{t:this.shape_83}]},1).to({state:[{t:this.shape_84}]},1).to({state:[{t:this.shape_85}]},1).to({state:[{t:this.shape_70,p:{x:980.15,y:670.1}}]},60).to({state:[{t:this.shape_86}]},1).to({state:[{t:this.shape_87}]},1).to({state:[{t:this.shape_88}]},1).to({state:[{t:this.shape_89}]},1).to({state:[{t:this.shape_90}]},1).to({state:[{t:this.shape_91}]},1).to({state:[{t:this.shape_92}]},1).to({state:[{t:this.shape_93}]},1).to({state:[{t:this.shape_94}]},1).to({state:[{t:this.shape_95}]},1).to({state:[{t:this.shape_96}]},1).to({state:[{t:this.shape_97}]},1).to({state:[{t:this.shape_98}]},1).to({state:[{t:this.shape_99}]},1).to({state:[{t:this.shape_100}]},60).to({state:[{t:this.shape_101}]},1).to({state:[{t:this.shape_102}]},1).to({state:[{t:this.shape_103}]},1).to({state:[{t:this.shape_104}]},1).to({state:[{t:this.shape_105}]},1).to({state:[{t:this.shape_106}]},1).to({state:[{t:this.shape_107}]},1).to({state:[{t:this.shape_108}]},1).to({state:[{t:this.shape_109}]},1).to({state:[{t:this.shape_110}]},1).to({state:[{t:this.shape_111}]},1).to({state:[{t:this.shape_112}]},1).to({state:[{t:this.shape_113}]},1).to({state:[{t:this.shape_114}]},1).to({state:[{t:this.shape_115}]},59).to({state:[{t:this.shape_116}]},1).to({state:[{t:this.shape_117}]},1).to({state:[{t:this.shape_118}]},1).to({state:[{t:this.shape_119}]},1).to({state:[{t:this.shape_120}]},1).to({state:[{t:this.shape_121}]},1).to({state:[{t:this.shape_122}]},1).to({state:[{t:this.shape_123}]},1).to({state:[{t:this.shape_124}]},1).to({state:[{t:this.shape_125}]},1).to({state:[{t:this.shape_126}]},1).to({state:[{t:this.shape_127}]},1).to({state:[{t:this.shape_128}]},1).to({state:[{t:this.shape_129}]},1).to({state:[{t:this.shape_130}]},1).to({state:[{t:this.shape_131}]},1).to({state:[]},59).to({state:[{t:this.shape_132,p:{x:979}}]},3).to({state:[{t:this.shape_133}]},1).to({state:[{t:this.shape_134}]},1).to({state:[{t:this.shape_135}]},1).to({state:[{t:this.shape_136}]},1).to({state:[{t:this.shape_137}]},1).to({state:[{t:this.shape_138}]},1).to({state:[{t:this.shape_139}]},1).to({state:[{t:this.shape_140}]},1).to({state:[{t:this.shape_141}]},1).to({state:[{t:this.shape_142}]},1).to({state:[{t:this.shape_143}]},1).to({state:[{t:this.shape_144}]},1).to({state:[{t:this.shape_145}]},1).to({state:[{t:this.shape_132,p:{x:979.7}}]},61).to({state:[{t:this.shape_146}]},1).to({state:[{t:this.shape_147}]},1).to({state:[{t:this.shape_148}]},1).to({state:[{t:this.shape_149}]},1).to({state:[{t:this.shape_150}]},1).to({state:[{t:this.shape_151}]},1).to({state:[{t:this.shape_152}]},1).to({state:[{t:this.shape_153}]},1).to({state:[{t:this.shape_154}]},1).to({state:[{t:this.shape_155}]},1).to({state:[{t:this.shape_156}]},1).to({state:[{t:this.shape_157}]},1).to({state:[{t:this.shape_132,p:{x:978.3}}]},60).to({state:[{t:this.shape_158}]},1).to({state:[{t:this.shape_159}]},1).to({state:[{t:this.shape_160}]},1).to({state:[{t:this.shape_161}]},1).to({state:[{t:this.shape_162}]},1).to({state:[{t:this.shape_163}]},1).to({state:[{t:this.shape_164}]},1).to({state:[{t:this.shape_165}]},1).to({state:[{t:this.shape_166}]},1).to({state:[{t:this.shape_167}]},1).to({state:[{t:this.shape_168}]},1).to({state:[{t:this.shape_169}]},1).to({state:[{t:this.shape_170}]},57).to({state:[{t:this.shape_171}]},1).to({state:[{t:this.shape_172}]},1).to({state:[{t:this.shape_173}]},1).to({state:[{t:this.shape_174}]},1).to({state:[{t:this.shape_175}]},1).to({state:[{t:this.shape_176}]},1).to({state:[{t:this.shape_177}]},1).to({state:[{t:this.shape_178}]},1).to({state:[{t:this.shape_179}]},1).to({state:[{t:this.shape_180}]},1).to({state:[{t:this.shape_181}]},1).to({state:[{t:this.shape_182}]},1).wait(59));

	// 选中
	this.instance_1 = new lib.选中点("synched",0);
	this.instance_1.setTransform(974.1,326.6,1,1,0,0,0,5,5);

	this.instance_2 = new lib.yp440103_01();
	this.instance_2.setTransform(553,283,0.6937,0.6937);

	this.instance_3 = new lib.元件1复制("synched",0,false);
	this.instance_3.setTransform(1126.5,412.8,1,1,0,0,0,163.9,81.3);

	this.instance_4 = new lib.选中点("synched",0);
	this.instance_4.setTransform(974.1,326.5,1,1,0,0,0,5,5);

	this.instance_5 = new lib.元件1("synched",0,false);
	this.instance_5.setTransform(1126.5,410.4,1,1,0,0,0,163.9,81.3);

	this.instance_6 = new lib.元件1复制2("synched",0,false);
	this.instance_6.setTransform(1141.35,412.1,1,1,0,0,0,163.9,81.3);

	this.instance_7 = new lib.元件1复制3("synched",0,false);
	this.instance_7.setTransform(1140,410.4,1,1,0,0,0,163.9,81.3);

	this.instance_8 = new lib.yp440103_06();
	this.instance_8.setTransform(553,442,0.6937,0.6937);

	this.instance_9 = new lib.yp440103_10();
	this.instance_9.setTransform(553,619,0.6937,0.6937);

	this.instance_10 = new lib.yp440103_15();
	this.instance_10.setTransform(554,790,0.6937,0.6937);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2},{t:this.instance_1,p:{x:974.1,y:326.6}}]},2).to({state:[{t:this.instance_2},{t:this.instance_4,p:{y:326.5,x:974.1}},{t:this.instance_1,p:{x:1240.5,y:326.5}},{t:this.instance_3}]},3).to({state:[{t:this.instance_2},{t:this.instance_4,p:{y:326.75,x:974.1}},{t:this.instance_1,p:{x:1240.5,y:488.85}},{t:this.instance_5}]},82).to({state:[{t:this.instance_2},{t:this.instance_4,p:{y:326.65,x:974.1}},{t:this.instance_1,p:{x:1240.55,y:664.25}},{t:this.instance_6}]},82).to({state:[{t:this.instance_2},{t:this.instance_4,p:{y:835.05,x:1240.5}},{t:this.instance_7},{t:this.instance_1,p:{x:974.1,y:326.75}}]},84).to({state:[{t:this.instance_8},{t:this.instance_1,p:{x:974.05,y:488.15}}]},89).to({state:[{t:this.instance_8},{t:this.instance_4,p:{y:488.15,x:974.05}},{t:this.instance_1,p:{x:1240.5,y:326.65}}]},3).to({state:[{t:this.instance_8},{t:this.instance_4,p:{y:488.8,x:1240.55}},{t:this.instance_1,p:{x:974.1,y:488.05}}]},78).to({state:[{t:this.instance_8},{t:this.instance_4,p:{y:664.15,x:1240.5}},{t:this.instance_1,p:{x:974.1,y:488.05}}]},77).to({state:[{t:this.instance_8},{t:this.instance_4,p:{y:835.4,x:1240.5}},{t:this.instance_1,p:{x:974.1,y:488.05}}]},76).to({state:[{t:this.instance_9},{t:this.instance_1,p:{x:974,y:666.25}}]},76).to({state:[{t:this.instance_9},{t:this.instance_4,p:{y:326.5,x:1240.5}},{t:this.instance_1,p:{x:974,y:666.25}}]},3).to({state:[{t:this.instance_9},{t:this.instance_4,p:{y:489.05,x:1240.55}},{t:this.instance_1,p:{x:974,y:666.25}}]},75).to({state:[{t:this.instance_9},{t:this.instance_4,p:{y:664.5,x:1240.55}},{t:this.instance_1,p:{x:974,y:666.25}}]},74).to({state:[{t:this.instance_9},{t:this.instance_4,p:{y:835.25,x:1240.55}},{t:this.instance_1,p:{x:974,y:666.25}}]},73).to({state:[{t:this.instance_10},{t:this.instance_1,p:{x:974,y:835.1}}]},75).to({state:[{t:this.instance_10},{t:this.instance_4,p:{y:326.55,x:1240.55}},{t:this.instance_1,p:{x:974,y:835.1}}]},3).to({state:[{t:this.instance_10},{t:this.instance_4,p:{y:488.6,x:1240.3}},{t:this.instance_1,p:{x:974,y:835.1}}]},74).to({state:[{t:this.instance_10},{t:this.instance_4,p:{y:664.2,x:1240.55}},{t:this.instance_1,p:{x:974,y:835.1}}]},72).to({state:[{t:this.instance_10},{t:this.instance_4,p:{y:835.1,x:1240.5}},{t:this.instance_1,p:{x:974,y:835.1}}]},69).wait(71));

	// 左侧
	this.l4_btn = new lib.l4();
	this.l4_btn.name = "l4_btn";
	this.l4_btn.setTransform(748.2,872.2,1,1,0,0,0,194.2,82.2);
	new cjs.ButtonHelper(this.l4_btn, 0, 1, 1);

	this.l3_btn = new lib.l3();
	this.l3_btn.name = "l3_btn";
	this.l3_btn.setTransform(747.2,701.2,1,1,0,0,0,194.2,82.2);
	new cjs.ButtonHelper(this.l3_btn, 0, 1, 1);

	this.l2_btn = new lib.l2();
	this.l2_btn.name = "l2_btn";
	this.l2_btn.setTransform(747.6,524.2,1,1,0,0,0,194.6,82.2);
	new cjs.ButtonHelper(this.l2_btn, 0, 1, 1);

	this.l1_btn = new lib.l1();
	this.l1_btn.name = "l1_btn";
	this.l1_btn.setTransform(747.6,357.2,1,1,0,0,0,194.6,74.2);
	new cjs.ButtonHelper(this.l1_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.l1_btn},{t:this.l2_btn},{t:this.l3_btn},{t:this.l4_btn}]}).wait(1241));

	// 右侧
	this.instance_11 = new lib.yp440103_16();
	this.instance_11.setTransform(1284,790,0.6937,0.6937);

	this.instance_12 = new lib.yp440103_12();
	this.instance_12.setTransform(1284,619,0.6937,0.6937);

	this.instance_13 = new lib.yp440103_07();
	this.instance_13.setTransform(1284,442,0.6937,0.6937);

	this.instance_14 = new lib.yp440103_03();
	this.instance_14.setTransform(1284,283,0.6937,0.6937);

	this.l1r4btn = new lib.r4();
	this.l1r4btn.name = "l1r4btn";
	this.l1r4btn.setTransform(1476.8,872.2,1,1,0,0,0,192.8,82.2);
	new cjs.ButtonHelper(this.l1r4btn, 0, 1, 1);

	this.l1r3btn = new lib.r3();
	this.l1r3btn.name = "l1r3btn";
	this.l1r3btn.setTransform(1476.8,701.2,1,1,0,0,0,192.8,82.2);
	new cjs.ButtonHelper(this.l1r3btn, 0, 1, 1);

	this.l1r2btn = new lib.r2();
	this.l1r2btn.name = "l1r2btn";
	this.l1r2btn.setTransform(1476.8,524.2,1,1,0,0,0,192.8,82.2);
	new cjs.ButtonHelper(this.l1r2btn, 0, 1, 1);

	this.l1r1btn = new lib.r1();
	this.l1r1btn.name = "l1r1btn";
	this.l1r1btn.setTransform(1476.8,357.2,1,1,0,0,0,192.8,74.2);
	new cjs.ButtonHelper(this.l1r1btn, 0, 1, 1);

	this.l2r4btn = new lib.r4();
	this.l2r4btn.name = "l2r4btn";
	this.l2r4btn.setTransform(1476.8,872.2,1,1,0,0,0,192.8,82.2);
	new cjs.ButtonHelper(this.l2r4btn, 0, 1, 1);

	this.l2r3btn = new lib.r3();
	this.l2r3btn.name = "l2r3btn";
	this.l2r3btn.setTransform(1476.8,701.2,1,1,0,0,0,192.8,82.2);
	new cjs.ButtonHelper(this.l2r3btn, 0, 1, 1);

	this.l2r2btn = new lib.r2();
	this.l2r2btn.name = "l2r2btn";
	this.l2r2btn.setTransform(1476.8,524.2,1,1,0,0,0,192.8,82.2);
	new cjs.ButtonHelper(this.l2r2btn, 0, 1, 1);

	this.l2r1btn = new lib.r1();
	this.l2r1btn.name = "l2r1btn";
	this.l2r1btn.setTransform(1476.8,357.2,1,1,0,0,0,192.8,74.2);
	new cjs.ButtonHelper(this.l2r1btn, 0, 1, 1);

	this.l3r4_btn = new lib.r4();
	this.l3r4_btn.name = "l3r4_btn";
	this.l3r4_btn.setTransform(1476.8,872.2,1,1,0,0,0,192.8,82.2);
	new cjs.ButtonHelper(this.l3r4_btn, 0, 1, 1);

	this.l3r3_btn = new lib.r3();
	this.l3r3_btn.name = "l3r3_btn";
	this.l3r3_btn.setTransform(1476.8,701.2,1,1,0,0,0,192.8,82.2);
	new cjs.ButtonHelper(this.l3r3_btn, 0, 1, 1);

	this.l3r2_btn = new lib.r2();
	this.l3r2_btn.name = "l3r2_btn";
	this.l3r2_btn.setTransform(1476.8,524.2,1,1,0,0,0,192.8,82.2);
	new cjs.ButtonHelper(this.l3r2_btn, 0, 1, 1);

	this.l3r1_btn = new lib.r1();
	this.l3r1_btn.name = "l3r1_btn";
	this.l3r1_btn.setTransform(1476.8,357.2,1,1,0,0,0,192.8,74.2);
	new cjs.ButtonHelper(this.l3r1_btn, 0, 1, 1);

	this.l4r4_btn = new lib.r4();
	this.l4r4_btn.name = "l4r4_btn";
	this.l4r4_btn.setTransform(1476.8,872.2,1,1,0,0,0,192.8,82.2);
	new cjs.ButtonHelper(this.l4r4_btn, 0, 1, 1);

	this.l4r3_btn = new lib.r3();
	this.l4r3_btn.name = "l4r3_btn";
	this.l4r3_btn.setTransform(1476.8,701.2,1,1,0,0,0,192.8,82.2);
	new cjs.ButtonHelper(this.l4r3_btn, 0, 1, 1);

	this.l4r2_btn = new lib.r2();
	this.l4r2_btn.name = "l4r2_btn";
	this.l4r2_btn.setTransform(1476.8,524.2,1,1,0,0,0,192.8,82.2);
	new cjs.ButtonHelper(this.l4r2_btn, 0, 1, 1);

	this.l4r1_btn = new lib.r1();
	this.l4r1_btn.name = "l4r1_btn";
	this.l4r1_btn.setTransform(1476.8,357.2,1,1,0,0,0,192.8,74.2);
	new cjs.ButtonHelper(this.l4r1_btn, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_14},{t:this.instance_13},{t:this.instance_12},{t:this.instance_11}]}).to({state:[{t:this.l1r1btn},{t:this.l1r2btn},{t:this.l1r3btn},{t:this.l1r4btn}]},2).to({state:[{t:this.l2r1btn},{t:this.l2r2btn},{t:this.l2r3btn},{t:this.l2r4btn}]},340).to({state:[{t:this.l3r1_btn},{t:this.l3r2_btn},{t:this.l3r3_btn},{t:this.l3r4_btn}]},310).to({state:[{t:this.l4r1_btn},{t:this.l4r2_btn},{t:this.l4r3_btn},{t:this.l4r4_btn}]},300).wait(289));

	// 不动内容
	this.instance_15 = new lib.Bitmap1();
	this.instance_15.setTransform(449,117);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1241));

	// bg
	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#FFFFFF").s().p("EiLsBMwQhvAAhQhPQhPhPAAhwMAAAiRDQAAhwBPhPQBQhPBvAAMEXZAAAQBvAABPBPQBQBPAABwMAAACRDQAABwhQBPQhPBPhvAAg");
	this.shape_183.setTransform(959.9897,542.9003,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.shape_183).wait(1241));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(999,591.7,882,442.5);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#AAD7E3",
	opacity: 1.00,
	manifest: [
		{src:"images/确定方案_atlas_1.png?1689923796013", id:"确定方案_atlas_1"},
		{src:"sounds/_11课一11.mp3?1689923796155", id:"_11课一11"},
		{src:"sounds/_11课一12.mp3?1689923796155", id:"_11课一12"},
		{src:"sounds/_11课一13.mp3?1689923796155", id:"_11课一13"},
		{src:"sounds/_11课一14.mp3?1689923796155", id:"_11课一14"},
		{src:"sounds/_11课一21.mp3?1689923796155", id:"_11课一21"},
		{src:"sounds/_11课一22.mp3?1689923796155", id:"_11课一22"},
		{src:"sounds/_11课一23.mp3?1689923796155", id:"_11课一23"},
		{src:"sounds/_11课一24.mp3?1689923796155", id:"_11课一24"}
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