import { Object3D } from '../../../build/three.module.js';

class AudioGenerator extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'AudioGenerator';

		this.listener = listener;
		this.context = listener.context;

		this.output = this.context.createGain();

        // INITIALIZE PARAMETERS
		this.autoplay = false;

		this.detune = 0;
		this.duration = undefined;
		this.isPlaying = false;

		this.source = null;
		this.sourceType = 'empty';

		this._startedAt = 0;
		this._progress = 0;
		this._connected = false;

		this.playbackRate = 0; 
		this.loop = false;

	}

	getOutput() {

		return this.output;

	}

	connect( destination ) {

		this.output.connect( destination );

		return this;

	}

	disconnect( destination ) {

		destination ? this.output.disconnect( destination ) : this.output.disconnect();

		return this;

	}

	start( startTime , buffer ) {

		this._startedAt = this.context.currentTime + startTime;

		this.source = this.context.createBufferSource();
		this.source.connect( this.getOutput() );

		this.source.buffer = buffer;
		this.source.playbackRate.value = this.playbackRate;
		this.source.loop = this.loop;

		this.source.start( startTime );

		this.isPlaying = true;

	}

	stop( stopTime ) {

		this.source.stop( stopTime );

		this.isPlaying = false;

	}

}

export { AudioGenerator };
