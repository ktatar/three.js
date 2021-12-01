import { Object3D } from '../../../build/three.module.js';

class AudioFX extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'AudioFX';

		this.listener = listener;
		this.context = this.listener.context;

		this.input = this.context.createGain();
		this.output = this.context.createGain();

		this.fx = [];

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

	delay( delayTime , feedbackAmount ) {

		const delay = this.context.createDelay();
		delay.delayTime.value = delayTime;

		const feedbackGain = this.context.createGain();
		feedbackGain.gain.value = feedbackAmount;

		delay.connect( feedbackGain );
		feedbackGain.connect( delay );

		this.fx.push( delay );

		return this;

	}

	pan( position ){

		const panner = this.context.createPanner();
		panner.setPosition( position, 0, 0 );

		this.fx.push( panner );

		return this;

	}

	filter ( type, frequency, Q, gain ){

		const filter = this.context.createBiquadFilter();
		filter.type = type;
		filter.frequency.value = frequency;
		filter.Q.value = Q;
		filter.gain.value = gain;

		this.fx.push( filter );

		return this;

	}

	convolver ( buffer ){

		const convolver = this.context.createConvolver( buffer.nChannels, buffer.length, this.context.sampleRate );
		convolver.buffer = buffer;

		this.fx.push( convolver );

		return this;

	}

	waveShaper ( buffer ){

		const waveshaper = this.context.createWaveShaper();
		const curve = buffer.getChannelData( 0 );
		waveshaper.curve = curve;

		this.fx.push( waveshaper );

		return this;

	}

	dynamicsCompressor(ratio, attack, release, threshold, reduction) {

		const compressor = this.context.createDynamicsCompressor();
		compressor.ratio.value = ratio;
		compressor.attack.value = attack;
		compressor.release.value = release;
		compressor.threshold.value = threshold;
		compressor.reduction.value = reduction;

		this.fx.push( compressor );

		return this;

	}

	init() {

		this.input.connect( this.fx[ 0 ] );

		for( let i = 1 ; i < this.fx.length ; i++ ){

			this.fx[ i - 1 ].connect( this.fx[ i ] );

		}

		this.fx[ this.fx.length - 1 ].connect( this.getOutput() );

	}

	connect( destination ) {

		if( destination.input ){

			this.output.connect( destination.input );

		}
		else{

			this.output.connect( destination );

		}

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

		this.output.gain.setTargetAtTime( value, this.context.currentTime, 0.01 );

		return this;

	}

}

export { AudioFX };