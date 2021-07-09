import { Object3D } from '../../../build/three.module.js';

class AudioGenerator extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'AudioGenerator';

		this.listener = listener;
		this.context = listener.context;

		this.output = this.context.createGain();
		// this.output.connect( synth.getOutput() );

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

	play( buffer, startTime , stopTime ) {

		this._startedAt = this.context.currentTime + startTime;

		const source = this.context.createBufferSource();
		source.connect( this.getOutput() );

		source.buffer = buffer;
		source.playbackRate.value = this.playbackRate;
		source.loop = this.loop;

		source.start( startTime );

		if( stopTime ){
			source.stop( stopTime );
		}

		this.isPlaying = true;

	}

	connect( destination ) {

		this.output.connect( destination );

		return this;

	}

	disconnect( destination ) {

		destination ? this.output.disconnect( destination ) : this.output.disconnect();

		return this;

	}

	getVolume() {

		return this.output.gain.value;

	}

	setVolume( value ) {

		this.output.gain.value = value;

		return this;

	}

}

export { AudioGenerator };
