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

        // USE THIS FOR FX?
		this.filters = [];
		this.playbackRate = 0; 

	}

	getOutput() {

		return this.output;

	}

	start( buffer , startTime ) {

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

	connect( destination ) {

		this.output.connect( destination );

		return this;

	}

	disconnect( destination ) {

		destination ? this.output.disconnect( destination ) : this.output.disconnect();

		return this;

	}

	getGain() {

		return this.output.gain.value;

	}

	setGain( value , time ) {

		if( time ){

			this.output.gain.setValueAtTime( value , time );

		}
		else{

			this.output.gain.value = value;

		}

		return this;

	}

	setPlaybackRate( value , time ) {

		if( time ){

			this.output.gain.setValueAtTime( value , time );

		}
		else{

			this.output.gain.value = value;

		}

		return this;

	}

}

export { AudioGenerator };
