import { Object3D } from '../../../build/three.module.js';

class AudioFX extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'AudioFX';

		this.listener = listener;
		this.context = listener.context;

		this.gain = this.context.createGain();
		this.gain.connect( listener.getInput() );

		this._startedAt = 0;
		this._progress = 0;
		this._connected = false;

        // USE THIS FOR FX?
		this.filters = [];
		this.playbackRate = 0; 

	}

	getOutput() {

		return this.gain;

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

	play( delay = 0 ) {

		if ( this.isPlaying === true ) {

			console.warn( 'THREE.Audio: Audio is already playing.' );
			return;

		}

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return;

		}

		this._startedAt = this.context.currentTime + delay;

		const source = this.context.createBufferSource();
		source.buffer = this.buffer;
		source.buffer.playbackRate = this.playbackRate;
		source.loop = this.loop;
		source.onended = this.onEnded.bind( this );
		source.start();

		this.isPlaying = true;

		this.source = source;

		this.setDetune( this.detune );

		return this.connect();

	}

	stop() {

		if ( this.hasPlaybackControl === false ) {

			console.warn( 'THREE.Audio: this Audio has no playback control.' );
			return;

		}

		this._progress = 0;

		this.source.stop();
		this.source.onended = null;
		this.isPlaying = false;

		return this;

	}

    // CONNECT this.source TO this.gain (INSERT FILTERS IF PRESENT)
	connect() {

		if ( this.filters.length > 0 ) {

			this.source.connect( this.filters[ 0 ] );

			for ( let i = 1, l = this.filters.length; i < l; i ++ ) {

				this.filters[ i - 1 ].connect( this.filters[ i ] );

			}

			this.filters[ this.filters.length - 1 ].connect( this.getOutput() );

		} else {

			this.source.connect( this.getOutput() );

		}

		this._connected = true;

		return this;

	}

    // DISCONNECT SOURCE FROM FILTERS AND OUTPUT
	disconnect() {

		if ( this.filters.length > 0 ) {

			this.source.disconnect( this.filters[ 0 ] );

			for ( let i = 1, l = this.filters.length; i < l; i ++ ) {

				this.filters[ i - 1 ].disconnect( this.filters[ i ] );

			}

			this.filters[ this.filters.length - 1 ].disconnect( this.getOutput() );

		} else {

			this.source.disconnect( this.getOutput() );

		}

		this._connected = false;

		return this;

	}

	getFilters() {

		return this.filters;

	}

    // APPLY AN ARRAY OF FILTER NODES TO THE AUDIO
	setFilters( value ) {

		if ( ! value ) value = [];

		if ( this._connected === true ) {

			this.disconnect();
			this.filters = value.slice(); // ASSIGN A SHALLOW COPY OF value TO this.filters
			this.connect();

		} else {

			this.filters = value.slice();

		}

		return this;

	}

	getFilter() {

		return this.getFilters()[ 0 ];

	}

	setFilter( filter ) {

		return this.setFilters( filter ? [ filter ] : [] );

	}

	getVolume() {

		return this.gain.gain.value;

	}

	setVolume( value ) {

		this.gain.gain.setTargetAtTime( value, this.context.currentTime, 0.01 );

		return this;

	}

}

export { AudioFX };
