(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



// stage content:
(lib.想一想 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {lnav1:0,m1:4,m2:140};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,4,137,140,420];
	// timeline functions:
	this.frame_0 = function() {
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
	this.frame_420 = function() {
		var _this = this;
		/*
		将播放头移动到时间轴中的指定帧编号并停止播放影片。
		可在主时间轴或影片剪辑时间轴上使用。
		*/
		_this.gotoAndStop('lnav1');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(133).call(this.frame_137).wait(3).call(this.frame_140).wait(280).call(this.frame_420).wait(1));

	// title
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3D8D8D").s().p("AgaC5QgJgJAAgPQAAgPAJgJQAJgIANgBQAMABAJAIQAIAJABAPQgBAPgIAJQgJAIgMAAQgNAAgJgIgAgXBPQgEgbAHgUQAHgVAMgPIAXghQANgPAJgQQAJgPAAgTQAAgPgGgNQgHgNgMgHQgNgIgRAAQgTAAgRAJQgRAIgNAPIgYgVQARgUAYgMQAXgNAdAAQArAAAYAYQAYAXABApQgBAWgIASQgKASgMAQIgaAfQgMAQgIATQgHATADAYg");
	this.shape.setTransform(1581.125,540.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3D8D8D").s().p("AiWDmIAAjZIEyAAIAADYIgiAAIAAgSIjvAAIAAATgAh1C2IDvAAIAAg6IjvAAgAh1BhIDvAAIAAg3IjvAAgAjcgfIAAgfICAAAQgEgRgIgUQgIgVgLgRIAggIQAIAMAGAOQAHAOAFAOIAHAYIgVAFICIAAIAOgbIANgeIAKgbIAkAJIgTAmIgTAlICBAAIAAAfgAjAiVIAAgeIC3AAQgEgLgFgLIgMgVIAggHQAIAMAGANQAHANAEAMICpAAIAAAeg");
	this.shape_1.setTransform(1544.775,540.15);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#3D8D8D").s().p("AjRDaIgNgLQAagaAOgfQANgeAEgfQAFgfgBgaIAAhCIFgAAIAACjIghAAIAAgZIkkAAQgGAhgPAhQgPAggbAcQgEgGgIgGgAAZBLICFAAIAAhQIiFAAgAiAAgIAAAVIgCAWIB8AAIAAhQIh6AAgAishLIAAgdIClAAIAAg0IjDAAIAAgdIDDAAIAAgsIAhAAIAAAsIDFAAIAAAdIjFAAIAAA0ICvAAIAAAdg");
	this.shape_2.setTransform(1493.775,540.375);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#3D8D8D").s().p("ACfDjIAAgdIlhAAIAAixIAkAAIAACRICMAAIAAixIiaAAIAAipIAiAAIAACJIB4AAIAAi3IAjAAIAAC3IB6AAIAAiKIAkAAIAACqIieAAIAACxICOAAIAAiRIAkAAIAADOg");
	this.shape_3.setTransform(1444.775,540.275);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#3D8D8D").s().p("AAtCcQgiAZgmATQgoARgqAMIgHgOIgKgOQAngKAlgRQAmgQAggXQgXgXgTgZQgUgagPgeQgaAwglAnQgkAogxAfQgEgHgHgHQgHgHgHgFQBFgqArg+QAsg8AYhPIhGAAQgYAAgNACQgMACgEAEIgFgQIgGgQQAFgBAEgGQAEgEAEgJIAKgSIAMggQAHgTAEgTIAkAHQgHAYgKAYQgJAZgLATIBeAAQAHgbAGgdQAFgcADggIAkAHIgJA4QgFAbgFAaIDZAAIAAAhIjiAAIgJAcIgKAbICrAAIAGgBIAXAKQgQAvgZAlQgZAmggAdQAhAXAoAQQAoAQAvAKQgGAFgGAJIgJAPQhggWhFgzgAgCBBQAUAbAbAXQAZgWAUgcQAVgbANggIihAAQAOAgAVAbgACGiXIgXgaIgXgaIAZgQIAYAYIAXAaIASAWIgaASIgSgWg");
	this.shape_4.setTransform(1394.625,540.3);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#3D8D8D").s().p("AhPDOIgOgPQA8gXAmgkQAngkAWgyQAXgxALhCQAKhCAFhUIAjACQgGBagMBFQgNBFgYA1QAXAVAWAXQAWAYATAWQAUAWAMASIgcAWQgLgRgRgUQgQgVgVgWIgogqQgYAoglAfQgkAfg0AYIgKgOgAjKCXIgKgNQAFgDAHgGQAHgGAEgJQAFgIABgMIAAkkIAjAAIAAErIB4g3IADAQIAFAPIhWApIgyAZIgZAOIgNAIIgIgOgAgVhfQgMgVgOgVQgPgWgPgSIAcgPQAPASAPAVQAPAVALAUQAMAUAIAQIgdASQgHgQgMgVg");
	this.shape_5.setTransform(1346.45,541.425);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#3D8D8D").s().p("AAaDAIgIgSIAnABIAiAAIAUAAQAHgBAEgDQADgDAAgIIAAlPIlZAAIAAgiIG5AAIAAAiIg+AAIAAFQQAAATgFAJQgHAKgMAFQgPADgaABIg+ACQgCgJgEgJgAioB8IAAjfIDJAAIAAC3IipAAIAAAogAiIA0ICJAAIAAh3IiJAAg");
	this.shape_6.setTransform(1294.85,542.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#3D8D8D").s().p("AiaDlIAAkcQgNASgNAQIgbAeIgJgQIgKgQQAZgYAXggQAXggAUglQAUgkAOgnIAfAJQgKAcgNAaQgOAbgOAaIAAFQgAhUDRIAAggICvAAIAOg5IANhCIAMhBIAKg+IAiAHQgGAngJAqIgSBWQgKAqgJAiIBpAAIAAAggAgBBZQgFglgHgnQgHgngJgkIAdgGQAJAkAIAmIANBLIAIA+IghAJIgGg/gAg+hlIAAggIEMAAIAAAggAA4ikIgIgdIgKgaIAfgJIAPApIALAlIghAKIgGgYg");
	this.shape_7.setTransform(1244.575,540.125);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#3D8D8D").s().p("ABBDkIAAmqICAAAIAFgCIAXAPIgTAwIgVAzIgWAyQAWAYAMAUQANAVAFATQAFASAAASQAAAWgGAQQgFAQgMAIQgGAEgHADQgIADgJAAIgVACIgWgBQAAgHgDgJQgDgIgEgHIAXABIASAAQAGgBAFgBIAJgEQAIgFADgLQADgLgBgNQABgYgNgcQgNgbghgjIATgtIATgvIAQgrIhVAAIAAGMgAi/DhIAAi0IDNAAIAACwIgfAAIAAgUIiOAAIAAAYgAifCrICOAAIAAhgIiOAAgAjdgCIAAgeICbAAIAOggIANgjQAGgRAFgPIAgAHIgSAvIgUAtIBIAAIAAAegAiWg+IgLgfQgHgQgHgOIAdgHQAIAOAGAPQAIAQAFAPQAFAOACANIgfAIQgBgMgGgPgAjOiHIAAgfIBqAAIgKgbIgNgaIAegJQAJAQAGARIAMAdIBdAAIAAAfg");
	this.shape_8.setTransform(1194.7,540.2);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#3D8D8D").s().p("AjaDdIAAghIG3AAIAAAhgAijBvIAAggIFOAAIAAAggAjhAKIAhgDIAAisIAfAAIAACoIAwgEIAAjbIAgAAIAABXIBQAAIAAAfIhQAAIAABgIBSgKIABAdIhPAMIhOAJIhCAJgAAxAYQgNgFgFgLQgFgKAAgVIAAjFIAiAAIAABlQAggMAfgOQAfgNAUgNIAbAZQgeAQglAOQglAOglAMIAABDQgBANAGADQAFAFARAAIBSAAQAKAAAGgFQAEgFADgPQACgOABgcQAHAFAIADIAQAGQgCAhgFASQgFARgLAIQgLAIgVgBIhXAAIgEAAQgUAAgLgEg");
	this.shape_9.setTransform(1144.7,539.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#3D8D8D").s().p("AhtDOIgMgKQAcggAPglQAPglAHgnIgmAAIAAgdIAqAAQADgXABgXIABgsIgvAAIAAgdIAvAAIAAhYIguAAIAAgdICTAAIAAARIgBCyIgCB0QgBAtgDAXQgCAXgFAHQgFAKgHAEQgHAEgJABIgUABIgagBIgCgPQgCgJgEgGIAaABIAQAAQAFABADgCQADgCADgGQACgFACgOQACgOACgaIAChCIg0AAQgIAsgRArQgRArgeAkQgDgFgGgGgAgUgYQgBAXgDAXIAwAAIABgpIAAgxIgsAAIgBAsgAgThhIAsAAIABhYIgtAAgABXDYIAAmuIBpAAIAEgCIAVANIgQAyIgRA1IgRAyQAbAkAJAeQAKAegBAbQAAAVgEARQgFAQgJAIQgFADgGADQgGACgHABIgPABIgPAAQAAgHgCgIQgCgIgEgGIAOAAIANAAQAEAAAEgBIAHgEQAFgFADgLQACgLAAgOQAAgYgJgeQgJgcgagiIAPgvIAOgxIAMgsIhBAAIAAGSgAjYCEIAAlDIBnAAIAAESIhMAAIAAAxgAi9A0IAxAAIAAjUIgxAAg");
	this.shape_10.setTransform(1095.325,541.525);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#3D8D8D").s().p("AjdDUIAAghIC8AAIAAmGIAiAAIAACbIC9AAIAAAiIi9AAIAADJIDdAAIAAAhg");
	this.shape_11.setTransform(1044.725,539.525);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#3D8D8D").s().p("AinDjIAAkZQgLARgLAQIgXAcQgDgHgFgIIgLgRQAWgYAUggQAVggARglQARglANgmIAfAJQgKAbgLAbQgLAcgOAaIAAFPgAApDhIAAhcIhVAAIAAgeIBVAAIAAiyQgRAtgVApQgVAqgZAiQgZAjgbAYIgMgNIgNgMQAcgWAbgiQAZghAWgoQAVgpAQgrIh5AAIAAggICPAAIAAhmIAfAAIAABmICYAAIAAAgIiBAAQAQArAVAoQAVAoAaAhQAaAhAbAWIgMAMQgIAHgFAHQgbgYgYgjQgagjgUgqQgWgpgQgtIAAC0IBUAAIAAAeIhUAAIAABcg");
	this.shape_12.setTransform(994.85,540.325);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#3D8D8D").s().p("AjSDYIgLgNQBPgVBIgfQBHgfA9grIkJAAIAAgdIBDAAIAAjjIBnAAIALgaIAJgYIAlAGIgMAWIgMAWICNAAIAAC+QAOgOAOgQQANgPAMgRIAcAOQgRAZgVAWQgUAWgXAVIAAB8QAAARgFAKQgGAJgNAFQgNADgZABIg/ABQgBgGgDgKIgIgRIAoABIAfAAIATAAQAIAAADgEQADgDAAgIIAAhgQhBAzhOAlQhPAlhXAZIgJgOgAhnAwIDMAAIAHgHIAAgsIjTAAgAhngdIDTAAIAAgwIjTAAgAhnhnIDTAAIAAguIjTAAg");
	this.shape_13.setTransform(944.225,540.45);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#3D8D8D").s().p("AhDDkIAAllIAgAAIAAFlgAijDjIAAkOIgSAeIgTAaIgFgKIgGgMIgHgKQAUgZARghQASgiAPglQAOglALgnIAeAIQgHAbgKAbQgKAcgLAZIAAFQgAB0DSIgHgQIApAAIAZAAQAGAAADgCQACgDAAgGIAAlpIiKAAIAAgfICrAAIAAGIQAAAQgEAIQgFAJgLAEQgLAEgTABIgwABQgBgHgEgJgAgDiRIgVgjIgWghIAagOIAVAhIAVAiQAKAQAGANIgbAPQgGgNgIgQg");
	this.shape_14.setTransform(893.725,540.35);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#3D8D8D").s().p("ACuDiQgeAAgXgZQgYgZgRguQgZAWgbATQgcATgbAQIgLgOIgMgNQAggPAdgVQAegVAcgaQgJgfgIglQgGglgFgpIh4AAIAABTIAtgKIAtgKIADAeIhdAWIAABzQAAARgFAJQgFAJgLAEQgLAEgUABQgUACgfgBIgFgQIgHgRIArAAIAbAAQAGAAADgDQADgCAAgHIAAhrIg4ANIgyALIgJghIA0gLIA/gNIAAhaIhtAAIAAggIBtAAIAAhUIgwAJIgvAHIgEgOIgGgNQAjgGAlgHQAlgIAggIQAhgJAXgIIAYAbIgnAMQgUAGgYAFIAABbIB0AAIgFhGIgChKIAiAAQAAAnACAjQABAlAEAhICVAAIAAAgIiRAAQAEAhAFAdQAFAeAHAbQAVgXARgYQASgXANgZIAeAMQgRAfgXAeQgWAegaAbQAPAqARAXQASAYAUAAQAKAAAGgVQAFgWADgwIANAKIAPAIQgEApgFAXQgHAXgKAKQgKAKgRAAIgCgBgACeiNIgcgeIgfgcIAagRQAPAMAQAPIAdAdIAVAbIgbATQgIgMgNgPg");
	this.shape_15.setTransform(844.9,540.6013);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#3D8D8D").s().p("AguA8QAdgMAQgTQAPgTACgaIgFACIgFAAQgOAAgKgJQgKgJAAgQQAAgRALgJQAKgJAOAAQAUAAAKAPQAKAPAAAZQAAAogXAdQgWAdgmAOg");
	this.shape_16.setTransform(780.975,556);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#3D8D8D").s().p("AAhDYIgMgLQAhgTAZgZQAZgZARgfQgPgjgJglQgKglgFglIgMAZQgGANgHAKIgKgMIgMgMQAQgaANghQANgiAJgmQAJgnAGgoIAeAFQgDAXgFAXIgLAuIB3AAIAAAdIgYAAQgHA/gNAzQgNA0gVAqQAPAcAVAYQAUAYAbASIgLAMQgGAIgDAHQgagSgTgYQgUgXgPgbQgSAbgXAXQgXAYgdASIgKgMgABnhhIgCAEQAFApAIAqQAIAqAQAoQAPglAJgqQAKgsAGgyIhKAAIgBAEgAinDjIAAkeQgMAUgMASIgaAhIgIgQQgFgKgFgHQAWgZAUghQAUggARgmQARglANgnIAeAJIgTAzQgKAZgLAYIAAFXgAhgDMIAAjOIA6AAIAAhhIhIAAIAAgeIBIAAIAAhdIAfAAIAABdIBCAAIAAAeIhCAAIAABhIA3AAIAACuIhyAAIAAAggAhCCPIBVAAIAAh1IhVAAg");
	this.shape_17.setTransform(744.475,540.375);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_18.setTransform(694.775,539.85);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#3D8D8D").s().p("AAhDYIgMgLQAhgTAZgZQAZgZARgfQgPgjgJglQgKglgFglIgMAZQgGANgHAKIgKgMIgMgMQAQgaANghQANgiAJgmQAJgnAGgoIAeAFQgDAXgFAXIgLAuIB3AAIAAAdIgYAAQgHA/gNAzQgNA0gVAqQAPAcAVAYQAUAYAbASIgLAMQgGAIgDAHQgagSgTgYQgUgXgPgbQgSAbgXAXQgXAYgdASIgKgMgABnhhIgCAEQAFApAIAqQAIAqAQAoQAPglAJgqQAKgsAGgyIhKAAIgBAEgAinDjIAAkeQgMAUgMASIgaAhIgIgQQgFgKgFgHQAWgZAUghQAUggARgmQARglANgnIAeAJIgTAzQgKAZgLAYIAAFXgAhgDMIAAjOIA6AAIAAhhIhIAAIAAgeIBIAAIAAhdIAfAAIAABdIBCAAIAAAeIhCAAIAABhIA3AAIAACuIhyAAIAAAggAhCCPIBVAAIAAh1IhVAAg");
	this.shape_19.setTransform(644.475,540.375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#3D8D8D").s().p("AguA8QAdgMAQgTQAPgTACgaIgFACIgFAAQgOAAgKgJQgKgJAAgQQAAgRALgJQAKgJAOAAQAUAAAKAPQAKAPAAAZQAAAogXAdQgWAdgmAOg");
	this.shape_20.setTransform(580.975,556);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#3D8D8D").s().p("AgjDeQgaAAgOgEQgPgEgFgKQgGgJAAgSIAAhSIAhAAIAABRQgBAJAHADQAHADAVAAIBlAAQAMAAAHgEQAGgEACgMQADgNABgZQAGAFAIADIAQAFQgCAegFARQgGAQgMAHQgMAGgVAAgAjbDAQALgOAJgRQAJgSAHgSQAHgTAFgQIAdALIgNAkQgHATgJASQgIATgLAOgAC1CkIgUgkIgWgjIAdgNIAWAiIAVAkIAQAeIgfAPIgPgfgAAMB/IgYgaIgYgZIAXgRIAYAYIAZAaIATAWIgYATIgTgXgAh7BDIAAiKQgRAhgVAcQgVAcgXASIgKgMQgGgHgFgEQASgNASgUQASgVAQgZQAQgZALgbIhWAAIAAgdIBcAAIAAhKIAgAAIAABKIBRAAIAAAdIhRAAIAAAeIAUANIAZASIAXASIAQAMIgTAaIgRgQIgXgUIgZgUIAAB8gAALA+IAAkBIDAAAIAAEBgAAqAiICBAAIAAgxIiBAAgAAqgqICBAAIAAgyIiBAAgAAqh2ICBAAIAAgyIiBAAg");
	this.shape_21.setTransform(544.325,539.825);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_22.setTransform(494.775,539.85);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#3D8D8D").s().p("AgjDeQgaAAgOgEQgPgEgFgKQgGgJAAgSIAAhSIAhAAIAABRQgBAJAHADQAHADAVAAIBlAAQAMAAAHgEQAGgEACgMQADgNABgZQAGAFAIADIAQAFQgCAegFARQgGAQgMAHQgMAGgVAAgAjbDAQALgOAJgRQAJgSAHgSQAHgTAFgQIAdALIgNAkQgHATgJASQgIATgLAOgAC1CkIgUgkIgWgjIAdgNIAWAiIAVAkIAQAeIgfAPIgPgfgAAMB/IgYgaIgYgZIAXgRIAYAYIAZAaIATAWIgYATIgTgXgAh7BDIAAiKQgRAhgVAcQgVAcgXASIgKgMQgGgHgFgEQASgNASgUQASgVAQgZQAQgZALgbIhWAAIAAgdIBcAAIAAhKIAgAAIAABKIBRAAIAAAdIhRAAIAAAeIAUANIAZASIAXASIAQAMIgTAaIgRgQIgXgUIgZgUIAAB8gAALA+IAAkBIDAAAIAAEBgAAqAiICBAAIAAgxIiBAAgAAqgqICBAAIAAgyIiBAAgAAqh2ICBAAIAAgyIiBAAg");
	this.shape_23.setTransform(444.325,539.825);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#3D8D8D").s().p("AgNAIQgegcgbgWIAdgaQASAPAUATQATASATATQAUAVAQATIgfAaQgZgfgcgeg");
	this.shape_24.setTransform(379.525,555.125);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#3D8D8D").s().p("AjhASIAAgjIHDAAIAAAjg");
	this.shape_25.setTransform(344.775,539.85);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(61,141,141,0.098)").s().p("AvgTgQi6AnjSAAQnxAAlejXQgigUgegVQmWDeoQAAQnkAAmAi8QmOD+oWAAQlpAAkrh0QiAANiGAAQqPAAnPlQQj2ixhzjYQhnjAAAjfQAAhIALhEQApkKDJjaQA/hEBOg/QAigbAkgaQHOlPKQAAQBbAABXAGQAqgfAvgdQCXhdCzgvQDEg1DmAAQDmAADDA1QC0AvCWBdQA9AkAwAoQFyiuHRAAQJjAAHAErQDKhVDngkQEfiQF/AAIBAABQBlgvBxgeQDEg1DlAAQDnAADCA1QCzAvCWBdQA+AkAwAoQFziuHQAAQF3AAE6BxQD4BaDSCgIAzAoQBMhfCEhRQE5jBG7AAQG6AAE6DBQBxBFBIBQQExiwGqAAQDgAAC/AxQBPAUBKAdQCigzC2gNQBDgGBHAAQIjAAGCE4IACABQAhAbAdAdQFGEpAAGUQAADDhLCpQhfDajaCxIgJAIQmBExodAAQhHAAhDgFQkOgVjjhmQhCgeg/gkQhNARhSAAIgjAAQj1DOlOAAQj8AAjLh3Qj8C5lVAAIgcAAQjHAtjkAAQnvAAlgjXQghgUgegVQh1BAiAAuQk6Bwl3AAQnHAAlsilQhnAzh3AWQlPCemmAAQkaAAjzhHg");
	this.shape_26.setTransform(960.075,540.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(421));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1166.3,948.2,547.6000000000001,-276.30000000000007);
// library properties:
lib.properties = {
	id: '6CC2A54E1AA7D548BDC8E574C2A3EB8B',
	width: 1920,
	height: 1080,
	fps: 24,
	color: "#5DA0A0",
	opacity: 0.00,
	manifest: [],
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