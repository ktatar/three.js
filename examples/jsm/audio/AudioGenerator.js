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

	setNodeSource( audioNode ) {

		this.hasPlaybackControl = false;
		this.sourceType = 'audioNode';
		this.source = audioNode;
		this.connect();

		return this;

	}

	createBuffer( nChannels, duration, sRate ) {

		this.nChannels = nChannels;
		this.duration = duration;
		this.sRate = sRate;

		this.length = this.duration * this.sRate;

		this.buffer = this.context.createBuffer( this.nChannels, this.length, this.sRate );
		this.bufferArray = new Float32Array( this.length );

		return this;

	}

	sine( frequency , amp ) {

		const twoPi = Math.PI*2;
		let t = 0;
		let v = 0;

		for(let i=0; i<this.bufferArray.length; i++){

			t = i/this.bufferArray.length;
			v = amp * (Math.sin( frequency * twoPi * t ));

			this.bufferArray[i] = Math.abs(v) <= 0.00013089969352576765 ? 0 : v; 

		}

		return this;

	}

	add() {

		for (this.channel = 0; this.channel<this.buffer.numberOfChannels; this.channel++){
			this.nowBuffering = this.buffer.getChannelData(this.channel);
			for (let i=0; i<this.buffer.length; i++){
				
				this.nowBuffering[i] += this.bufferArray[i];
			
			}
		}

	}

	setBuffer( audioBuffer ) {

		this.buffer = audioBuffer;
		this.sourceType = 'buffer';

		if ( this.autoplay ) this.play();

		return this;

	}

	play( startTime ) {

		this._startedAt = this.context.currentTime + startTime;

		const source = this.context.createBufferSource();
		source.connect( this.getOutput() );
		
		source.buffer = this.buffer;
		source.playbackRate.value = this.playbackRate;
		source.loop = this.loop;
		source.start( startTime );

		this.isPlaying = true;

		this.source = source;

	}

	stop( stopTime ) {

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return;

		}

		this._progress = 0;

		this.source.stop( stopTime );
		this.source.onended = null;
		this.isPlaying = false;

		return this;

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
