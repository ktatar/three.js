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

	play( startTime , stopTime , buffer , playbackRate , gain ){

		this.source = this.context.createBufferSource();
		this.source.connect( this.getOutput() );

		this.source.buffer = buffer;

		this.source.loop = this.loop;
		this.source.playbackRate.setValueAtTime( playbackRate , startTime );
		this.output.gain.setValueAtTime( gain , startTime );

		this.source.start( startTime );
		this.source.stop( stopTime );

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

		if( time != undefined ){

			this.output.gain.setValueAtTime( value , time );

		}
		else{

			this.output.gain.value = value;

		}

		return this;

	}

	setPlaybackRate( value , time ) {

		if( time != undefined ){

			this.source.playbackRate.setValueAtTime( value , time );

		}
		else{

			this.playbackRate = value;

		}
	
		return this;

	}

}

export { AudioGenerator };
