import { Object3D } from '../../../build/three.module.js';
import { AudioBuffer } from './AudioBuffer.js'; 
import { AudioGenerator } from './AudioGenerator.js'; 
import { AudioFX } from './AudioFX.js'; 

class SynthPresets extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'SynthPresets';

		this.listener = listener;
		this.context = listener.context;

	}

	p1_synthBuffer(){

		this.preset = new Preset1_SynthBuffer( this );

	}

	p2_fmBuffer(){

		this.preset = new Preset2_FMBuffer( this );

	}

	p3_detunedOscBuffer(){

		this.preset = new Preset3_DetunedOscBuffer( this );

	}

	p4_amBuffer(){

		this.preset = new Preset4_AMBuffer( this );

	}

	p5_amChordPad(){

		this.preset = new Preset5_AMChordPad( this );

	}

	p6_amChordKey(){

		this.preset = new Preset6_AMChordKey( this );

	}

	p7_noiseHit(){

		this.preset = new Preset7_NoiseHit( this );

	}

	p8_filteredImpulse(){

		this.preset = new Preset8_FilteredImpulse( this );

	}

	p9_waveshapedFilteredImpulseBass(){

		this.preset = new Preset9_WaveshapedFilteredImpulseBass( this );

	}

	p10_waveshapedFilteredImpulseMallet(){

		this.preset = new Preset10_WaveshapedFilteredImpulseMallet( this );

	}

	p11_waveshaperPercussion(){

		this.preset = new Preset11_WaveshaperPercussion( this );

	}

	p12_convolverSweep(){

		this.preset = new Preset12_ConvolverSweep( this );

	}

	p13_fxSweep(){

		this.preset = new Preset13_FXSweep( this );

	}

	p14_simpleEnvelope(){

		this.preset = new Preset14_SimpleEnvelope( this );

	}

	p15_tremoloEnvelope(){

		this.preset = new Preset15_TremoloEnvelope( this );

	}

	p16_complexEnvelope(){

		this.preset = new Preset16_ComplexEnvelope( this );

	}

	p17_evolvingEnvelope(){

		this.preset = new Preset17_EvolvingEnvelope( this );

	}

	p18_sequenceBuffer(){

		this.preset = new Preset18_SequenceBuffer( this );

	}
	
	p19_polyphonicSequenceBuffer(){

		this.preset = new Preset19_PolyphonicSequenceBuffer( this );

	}

	start(){

		this.preset.start();

	}

}

class Preset1_SynthBuffer{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		this.synthBuffer = new AudioBuffer( this.listener );
		this.synthBuffer.createBuffer( 1 , 1 );
		this.synthBuffer.sine( 432 , 1 ).fill( 0 );
		this.synthBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 8 ).multiply( 0 );

		this.synthGenerator = new AudioGenerator( this.listener );
		this.synthGenerator.buffer = this.synthBuffer.buffer;
		this.synthGenerator.playbackRate = 1;

		this.output = this.context.createGain();
		this.output.gain.value = 0.25;
		
		this.synthGenerator.connect( this.listener.getInput() );
		this.output.connect( this.listener.getInput() );

	}

	start(){

		this.synthGenerator.start();

	}

}

class Preset2_FMBuffer{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		this.synthBuffer = new AudioBuffer( this.listener );
		this.synthBuffer.createBuffer( 1 , 1 );
		this.synthBuffer.fm( 432 , 432 * 2 , 10 ).fill( 0 );
		this.synthBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 8 ).multiply( 0 );

		this.synthGenerator = new AudioGenerator( this.listener );
		this.synthGenerator.buffer = this.synthBuffer.buffer;
		this.synthGenerator.playbackRate = 1;

		this.output = this.context.createGain();
		this.output.gain.value = 0.0625;
		
		this.synthGenerator.connect( this.output );
		this.output.connect( this.listener.getInput() );

	}

	start(){

		this.synthGenerator.start();

	}

}

class Preset3_DetunedOscBuffer{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		this.synthBuffer = new AudioBuffer( this.listener );
		this.synthBuffer.createBuffer( 1 , 1 );

		const octaveArray = [ 1 , 2 , 4 , 0.5 ];
		let frequency = 0;
		let amplitude = 0;

		for( let i = 0 ; i < 20 ; i++ ){

			frequency = 432 * ( ( Math.random() * ( 1.01 - 0.99 ) ) + 0.99 ) * ( octaveArray[ Math.floor( Math.random() * octaveArray.length ) ] );
			amplitude = ( ( Math.random() * ( 1 - 0.5 ) ) + 0.5 )

			this.synthBuffer.sine( frequency , amplitude ).add( 0 );

		}

		this.synthBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 8 ).multiply( 0 );

		this.synthGenerator = new AudioGenerator( this.listener );
		this.synthGenerator.buffer = this.synthBuffer.buffer;
		this.synthGenerator.playbackRate = 1;

		this.output = this.context.createGain();
		this.output.gain.value = 0.03125;
		
		this.synthGenerator.connect( this.output );
		this.output.connect( this.listener.getInput() );

	}

	start(){

		this.synthGenerator.start();

	}

}

class Preset4_AMBuffer{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		this.synthBuffer = new AudioBuffer( this.listener );
		this.synthBuffer.createBuffer( 1 , 1 );
		this.synthBuffer.am( 432 , 5 , 1 ).fill( 0 );
		this.synthBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 8 ).multiply( 0 );

		this.synthGenerator = new AudioGenerator( this.listener );
		this.synthGenerator.buffer = this.synthBuffer.buffer;
		this.synthGenerator.playbackRate = 1;

		this.output = this.context.createGain();
		this.output.gain.value = 0.5;
		
		this.synthGenerator.connect( this.output );
		this.output.connect( this.listener.getInput() );

	}

	start(){

		this.synthGenerator.start();

	}

}

class Preset5_AMChordPad{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		// SYNTH BUFFER

			const fundamentalFrequency = 432;
			const octaveArray = [ 1 , 2 , 4 ];
			const intervalArray = [ 1 , 9/8 , 5/4 , 4/3 , 5/3 ];
			const numberOfVoices = 10;
			let carrierFrequency = 0;
			let octave = 0;
			let interval = 0;
			let modulatorFrequency = 0;

			this.synthBuffer = new AudioBuffer( this.listener );
			this.synthBuffer.createBuffer( 1 , 2 );


			for( let i = 0 ; i < numberOfVoices ; i++ ){

				octave = octaveArray[ Math.floor( Math.random() * octaveArray.length ) ];
				interval = intervalArray[ Math.floor ( Math.random() * intervalArray.length ) ];

				carrierFrequency = fundamentalFrequency * octave * interval;

				modulatorFrequency = 1 + Math.floor( Math.random() * 10 );

				this.synthBuffer.am( carrierFrequency , modulatorFrequency , 1 ).add( 0 );

			}


			this.synthBuffer.ramp( 0 , 1 , 0.5 , 0.5 , 1 , 1 ).multiply( 0 );

		// SYNTH GENERATOR

			this.synthGenerator = new AudioGenerator( this.listener );
			this.synthGenerator.buffer = this.synthBuffer.buffer;
			this.synthGenerator.playbackRate = 1;

		// EFFECTS

			// REVERB
				
				this.reverbBuffer = new AudioBuffer( this.listener );
				this.reverbBuffer.createBuffer( 2 , 3 );
				this.reverbBuffer.noise().add( 0 );
				this.reverbBuffer.noise().add( 1 );
				this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).multiply( 0 );
				this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).multiply( 1 );

				this.reverbEffect = new AudioFX( this.listener );
				this.reverbEffect.convolver( this.reverbBuffer.buffer );

				this.reverbEffect.init();
				

		// OUTPUT GAIN

			this.output = this.context.createGain();
			this.output.gain.value = 0.5 * 1 / numberOfVoices;

		// CONNECTIONS

			this.synthGenerator.connect( this.reverbEffect.input );

			this.synthGenerator.connect( this.output );
			this.reverbEffect.connect( this.output );

			this.output.connect( this.listener.getInput() );

	}

	start(){

		this.synthGenerator.start();

	}

}

class Preset6_AMChordKey{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		// SYNTH BUFFER

			const fundamentalFrequency = 432 * 2;
			const octaveArray = [ 1 , 2 , 4 ];
			const intervalArray = [ 1 , 9/8 , 5/4 , 4/3 , 5/3 ];
			const numberOfVoices = 10;
			let carrierFrequency = 0;
			let octave = 0;
			let interval = 0;
			let modulatorFrequency = 0;

			this.synthBuffer = new AudioBuffer( this.listener );
			this.synthBuffer.createBuffer( 1 , 2 );


			for( let i = 0 ; i < numberOfVoices ; i++ ){

				octave = octaveArray[ Math.floor( Math.random() * octaveArray.length ) ];
				interval = intervalArray[ Math.floor ( Math.random() * intervalArray.length ) ];

				carrierFrequency = fundamentalFrequency * octave * interval;

				modulatorFrequency = 1 + Math.floor( Math.random() * 10 );

				this.synthBuffer.am( carrierFrequency , modulatorFrequency , 1 ).add( 0 );

			}


			this.synthBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).multiply( 0 );

		// SYNTH GENERATOR

			this.synthGenerator = new AudioGenerator( this.listener );
			this.synthGenerator.buffer = this.synthBuffer.buffer;
			this.synthGenerator.playbackRate = 1;

		// EFFECTS

			// REVERB
				
				this.reverbBuffer = new AudioBuffer( this.listener );
				this.reverbBuffer.createBuffer( 2 , 3 );
				this.reverbBuffer.noise().add( 0 );
				this.reverbBuffer.noise().add( 1 );
				this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).multiply( 0 );
				this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).multiply( 1 );

				this.reverbEffect = new AudioFX( this.listener );
				this.reverbEffect.convolver( this.reverbBuffer.buffer );

				this.reverbEffect.init();
				

		// OUTPUT GAIN

			this.output = this.context.createGain();
			this.output.gain.value = 0.5 * 1 / numberOfVoices;

		// CONNECTIONS

			this.synthGenerator.connect( this.reverbEffect.input );

			this.synthGenerator.connect( this.output );
			this.reverbEffect.connect( this.output );

			this.output.connect( this.listener.getInput() );

	}

	start(){

		this.synthGenerator.start();

	}

}

class Preset7_NoiseHit{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		// SYNTH BUFFER

			this.synthBuffer = new AudioBuffer( this.listener );
			this.synthBuffer.createBuffer( 1 , 0.25 );
			this.synthBuffer.noise().fill( 0 );
			this.synthBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).multiply( 0 );

		// SYNTH GENERATOR

			this.synthGenerator = new AudioGenerator( this.listener );
			this.synthGenerator.buffer = this.synthBuffer.buffer;
			this.synthGenerator.playbackRate = 1;
		

		// OUTPUT GAIN

			this.output = this.context.createGain();
			this.output.gain.value = 0.125;

		// CONNECTIONS

			this.synthGenerator.connect( this.output );
			this.output.connect( this.listener.getInput() );

	}

	start(){

		this.synthGenerator.start();

	}

}

class Preset8_FilteredImpulse{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		// SYNTH BUFFER

			this.synthBuffer = new AudioBuffer( this.listener );
			this.synthBuffer.createBuffer( 1 , 1 );
			this.synthBuffer.inverseSawtooth( 8 ).fill( 0 );

		// SYNTH GENERATOR

			this.synthGenerator = new AudioGenerator( this.listener );
			this.synthGenerator.buffer = this.synthBuffer.buffer;
			this.synthGenerator.playbackRate = 1;

		// FILTER
		
			this.filter = new AudioFX( this.listener );
			this.filter.filter( 'bandpass' , 432 , 20 , 1 );
			this.filter.init();

		// OUTPUT GAIN

			this.output = this.context.createGain();
			this.output.gain.value = 16;

		// CONNECTIONS

			this.synthGenerator.connect( this.filter );
			this.filter.connect( this.output );
			this.output.connect( this.listener.getInput() );

	}

	start(){

		this.synthGenerator.start();

	}

}

class Preset9_WaveshapedFilteredImpulseBass{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		// GLOBAL VARIABLES

			const fund = 432 * 0.125 ;

		// SYNTH BUFFER

			this.synthBuffer = new AudioBuffer( this.listener );
			this.synthBuffer.createBuffer( 1 , 1 );
			this.synthBuffer.inverseSawtooth( 16 ).fill( 0 );

		// SYNTH GENERATOR

			this.synthGenerator = new AudioGenerator( this.listener );
			this.synthGenerator.buffer = this.synthBuffer.buffer;
			this.synthGenerator.playbackRate = 1;

		// WAVESHAPER BUFFER

			this.waveShaperBuffer = new AudioBuffer( this.listener );
			this.waveShaperBuffer.createBuffer( 1 , 1 );
			this.waveShaperBuffer.fm( fund * 2 , fund * 4 , 0.01 ).fill( 0 );

		// FX
		
			this.fx = new AudioFX( this.listener );
			this.fx.filter( 'bandpass' , fund , 20 , 1 ).waveShaper( this.waveShaperBuffer.buffer );
			this.fx.init();

		// OUTPUT GAIN

			this.output = this.context.createGain();
			this.output.gain.value = 0.25;

		// CONNECTIONS

			this.synthGenerator.connect( this.fx );
			this.fx.connect( this.output );
			this.output.connect( this.listener.getInput() );

	}

	start(){

		this.synthGenerator.start();

	}

}

class Preset10_WaveshapedFilteredImpulseMallet{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		// GLOBAL VARIABLES

			const fund = 432 * 0.5;

		// SYNTH BUFFER

			this.synthBuffer = new AudioBuffer( this.listener );
			this.synthBuffer.createBuffer( 1 , 1 );
			this.synthBuffer.inverseSawtooth( 4 ).fill( 0 );

		// SYNTH GENERATOR

			this.synthGenerator = new AudioGenerator( this.listener );
			this.synthGenerator.buffer = this.synthBuffer.buffer;
			this.synthGenerator.playbackRate = 1;

		// WAVESHAPER BUFFER

			this.waveShaperBuffer = new AudioBuffer( this.listener );
			this.waveShaperBuffer.createBuffer( 1 , 1 );
			this.waveShaperBuffer.fm( fund * 0.125 , fund * 0.25 , 0.01 ).fill( 0 );

		// FX
		
			this.fx = new AudioFX( this.listener );
			this.fx.filter( 'bandpass' , fund , 20 , 1 ).waveShaper( this.waveShaperBuffer.buffer );
			this.fx.init();

		// OUTPUT GAIN

			this.output = this.context.createGain();
			this.output.gain.value = 0.25;

		// CONNECTIONS

			this.synthGenerator.connect( this.fx );
			this.fx.connect( this.output );
			this.output.connect( this.listener.getInput() );

	}

	start(){

		this.synthGenerator.start();

	}

}

class Preset11_WaveshaperPercussion{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		// GLOBAL VARIABLES

			const fund = 432 * 0.5;

		// SYNTH BUFFER

			this.synthBuffer = new AudioBuffer( this.listener );
			this.synthBuffer.createBuffer( 1 , 1 );
			this.synthBuffer.inverseSawtooth( 4 ).fill( 0 );

		// SYNTH GENERATOR

			this.synthGenerator = new AudioGenerator( this.listener );
			this.synthGenerator.buffer = this.synthBuffer.buffer;
			this.synthGenerator.playbackRate = 1;

		// WAVESHAPER BUFFER

			this.waveShaperBuffer = new AudioBuffer( this.listener );
			this.waveShaperBuffer.createBuffer( 1 , 1 );
			this.waveShaperBuffer.fm( fund * 0.123 , fund * 0.266 , 0.001 ).fill( 0 );

		// FX
		
			this.fx = new AudioFX( this.listener );
			this.fx.filter( 'bandpass' , fund , 5 , 1 ).waveShaper( this.waveShaperBuffer.buffer ).filter( 'highpass' , 10 , 1 , 1 ).filter( 'lowpass' , 2000 , 1 , 1 );
			this.fx.init();

		// OUTPUT GAIN

			this.output = this.context.createGain();
			this.output.gain.value = 0.5;

		// CONNECTIONS

			this.synthGenerator.connect( this.fx );
			this.fx.connect( this.output );
			this.output.connect( this.listener.getInput() );

	}

	start(){

		this.synthGenerator.start();

	}

}

class Preset12_ConvolverSweep{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		// VARIABLES

			const fund = 432 * 1;
			const octaveArray = [ 1 , 2 , 4 ];
			const intervalArray = [ 1 , 9/8 , 5/4 , 4/3 , 5/3 ];
			let frequency = 0;
			let peak = 0;
			const nHarmonics = 10;

		// BUFFERS

			// noise buffer

				this.noiseBuffer = new AudioBuffer( this.listener );
				this.noiseBuffer.createBuffer( 1 , 1 );
				this.noiseBuffer.noise().fill( 0 );

			// sweep buffer

				this.sweepBuffer = new AudioBuffer( this.listener );
				this.sweepBuffer.createBuffer( 1 , 1 );
				this.sweepBuffer.ramp( 0 , 1 , 0.01 , 0.15 , 0.1 , 4 ).fill( 0 );
				this.sweepBuffer.constant( fund ).multiply( 0 );

			// convolver buffer

				this.convolverBuffer = new AudioBuffer( this.listener );
				this.convolverBuffer.createBuffer( 1 , 2 );

				this.convolverTemporaryBuffer = new AudioBuffer( this.listener );
				this.convolverTemporaryBuffer.createBuffer( 1 , 2 );

				for( let i = 0 ; i < nHarmonics ; i++ ){

					frequency = fund * octaveArray[ Math.floor( Math.random() * octaveArray.length ) ] * intervalArray[ Math.floor( Math.random() * intervalArray.length ) ];
					peak = 0.1 + Math.random() * 0.8;

					this.convolverTemporaryBuffer.fm( frequency , frequency * 2 , 4 ).fill( 0 );
					this.convolverTemporaryBuffer.constant( 1 / nHarmonics ).multiply( 0 );
					this.convolverTemporaryBuffer.ramp( 0 , 1 , peak , peak , 1 , 1 ).multiply( 0 );
					
					this.convolverBuffer.bufferShape( this.convolverTemporaryBuffer.buffer ).add( 0 );

				}
				
				this.convolverBuffer.ramp( 0 , 1 , 0.5 , 0.5 , 1 , 1 ).multiply( 0 );

			// reverb buffer

				this.reverbBuffer = new AudioBuffer( this.listener );
				this.reverbBuffer.createBuffer( 2 , 3 );
				this.reverbBuffer.noise().fill( 0 );
				this.reverbBuffer.noise().fill( 1 );
				this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).multiply( 0 );
				this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).multiply( 1 );

		// GENERATORS

			// noise generator

				this.noiseGenerator = new AudioGenerator( this.listener );
				this.noiseGenerator.buffer = this.noiseBuffer.buffer;
				this.noiseGenerator.playbackRate = 0.4;
				this.noiseGenerator.loop = true;

			// sweep generator

				this.sweepGenerator = new AudioGenerator( this.listener );
				this.sweepGenerator.buffer = this.sweepBuffer.buffer;
				this.sweepGenerator.playbackRate = 0.25;

		// FX
		
				// filter - convolver

				this.filter_convolver = new AudioFX( this.listener );
				this.filter_convolver.filter( 'bandpass' , 1 , 40 , 1 ).convolver( this.convolverBuffer.buffer ).filter( 'peaking' , fund , 1 , -6 );
				this.filter_convolver.init();

				// reverb

				this.reverb = new AudioFX( this.listener );
				this.reverb.convolver( this.reverbBuffer.buffer );
				this.reverb.init();

				this.reverb.output.gain.value = 2;

		// OUTPUT GAIN

			this.output = this.context.createGain();
			this.output.gain.value = 10;

		// CONNECTIONS

			this.noiseGenerator.connect( this.filter_convolver ); this.sweepGenerator.connect( this.filter_convolver.fx[0].frequency );
			
			this.filter_convolver.connect( this.reverb );

			this.filter_convolver.connect( this.output );
			this.reverb.connect( this.output );

			this.output.connect( this.listener.getInput() );

	}

	start(){

		this.noiseGenerator.start();
		this.sweepGenerator.start();

	}

}

class Preset13_FXSweep{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		/*
			NOTE: this preset is exactly the same as Preset12_ConvolverSweep,
			with the exception of a couple changed values, commented below
		*/

		// VARIABLES

			const fund = 432 * 2;
			const octaveArray = [ 1 , 2 , 4 ];
			const intervalArray = [ 1 , 9/8 , 5/4 , 4/3 , 5/3 ];
			let frequency = 0;
			let peak = 0;
			const nHarmonics = 10;

		// BUFFERS

			// noise buffer

				this.noiseBuffer = new AudioBuffer( this.listener );
				this.noiseBuffer.createBuffer( 1 , 1 );
				this.noiseBuffer.noise().fill( 0 );

			// sweep buffer

				this.sweepBuffer = new AudioBuffer( this.listener );
				this.sweepBuffer.createBuffer( 1 , 1 );
				this.sweepBuffer.ramp( 0 , 1 , 0.01 , 0.15 , 0.1 , 4 ).fill( 0 );
				this.sweepBuffer.constant( fund ).multiply( 0 );

			// convolver buffer

				this.convolverBuffer = new AudioBuffer( this.listener );
				this.convolverBuffer.createBuffer( 1 , 2 );

				this.convolverTemporaryBuffer = new AudioBuffer( this.listener );
				this.convolverTemporaryBuffer.createBuffer( 1 , 2 );

				for( let i = 0 ; i < nHarmonics ; i++ ){

					frequency = fund * octaveArray[ Math.floor( Math.random() * octaveArray.length ) ] * intervalArray[ Math.floor( Math.random() * intervalArray.length ) ];
					peak = 0.1 + Math.random() * 0.8;

					/* CHANGED VALUES HERE ( arguments to fm method of this.convolverTemporaryBuffer ) */
					this.convolverTemporaryBuffer.fm( frequency * 1.1 , frequency * 2.14 , 10 ).fill( 0 );
					this.convolverTemporaryBuffer.constant( 1 / nHarmonics ).multiply( 0 );
					this.convolverTemporaryBuffer.ramp( 0 , 1 , peak , peak , 1 , 1 ).multiply( 0 );
					
					this.convolverBuffer.bufferShape( this.convolverTemporaryBuffer.buffer ).add( 0 );

				}
				
				this.convolverBuffer.ramp( 0 , 1 , 0.5 , 0.5 , 1 , 1 ).multiply( 0 );

			// reverb buffer

				this.reverbBuffer = new AudioBuffer( this.listener );
				this.reverbBuffer.createBuffer( 2 , 3 );
				this.reverbBuffer.noise().fill( 0 );
				this.reverbBuffer.noise().fill( 1 );
				this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).multiply( 0 );
				this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).multiply( 1 );

		// GENERATORS

			// noise generator

				this.noiseGenerator = new AudioGenerator( this.listener );
				this.noiseGenerator.buffer = this.noiseBuffer.buffer;
				this.noiseGenerator.playbackRate = 0.4;
				this.noiseGenerator.loop = true;

			// sweep generator

				this.sweepGenerator = new AudioGenerator( this.listener );
				this.sweepGenerator.buffer = this.sweepBuffer.buffer;
				this.sweepGenerator.playbackRate = 0.25;

		// FX
		
				// filter - convolver

				this.filter_convolver = new AudioFX( this.listener );
				this.filter_convolver.filter( 'bandpass' , 1 , 40 , 1 ).convolver( this.convolverBuffer.buffer );
				this.filter_convolver.init();

				// reverb

				this.reverb = new AudioFX( this.listener );
				this.reverb.convolver( this.reverbBuffer.buffer );
				this.reverb.init();

				this.reverb.output.gain.value = 2;

		// OUTPUT GAIN

			this.output = this.context.createGain();
			this.output.gain.value = 10;

		// CONNECTIONS

			this.noiseGenerator.connect( this.filter_convolver ); this.sweepGenerator.connect( this.filter_convolver.fx[0].frequency );
			
			this.filter_convolver.connect( this.reverb );

			this.filter_convolver.connect( this.output );
			this.reverb.connect( this.output );

			this.output.connect( this.listener.getInput() );

	}

	start(){

		this.noiseGenerator.start();
		this.sweepGenerator.start();

	}

}

class Preset14_SimpleEnvelope{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		this.output = this.context.createGain();
		this.output.gain.value = 0.25;

		// BUFFERS

			// oscillator 

				this.oscBuffer = new AudioBuffer( this.listener );
				this.oscBuffer.createBuffer( 1 , 1 );
				this.oscBuffer.sine( 1 , 1 ).fill( 0 );

			// envelope

				this.envBuffer = new AudioBuffer( this.listener );
				this.envBuffer.createBuffer( 1 , 1 );
				this.envBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).fill( 0 );
		
		// GENERATORS

			// oscillator

				this.oscGenerator = new AudioGenerator( this.listener );
				this.oscGenerator.buffer = this.oscBuffer.buffer;
				this.oscGenerator.playbackRate = 432;
				this.oscGenerator.loop = true;

			// envelope 

				this.envGenerator = new AudioGenerator( this.listener );
				this.envGenerator.buffer = this.envBuffer.buffer;
				this.envGenerator.playbackRate = 1;

		// ENVELOPE GAIN

			this.envelopeGain = this.context.createGain();
			this.envelopeGain.gain.value = 0;

		// CONNECTIONS

			this.oscGenerator.connect( this.envelopeGain ); this.envGenerator.connect( this.envelopeGain.gain );
			this.envelopeGain.connect( this.output );
			this.output.connect( this.listener.getInput() );

	}

	start() {

		this.oscGenerator.start();
		this.envGenerator.start();

	}

}

class Preset15_TremoloEnvelope{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		this.output = this.context.createGain();
		this.output.gain.value = 0.25;

		// BUFFERS

			// oscillator 

				this.oscBuffer = new AudioBuffer( this.listener );
				this.oscBuffer.createBuffer( 1 , 1 );
				this.oscBuffer.sine( 1 , 1 ).fill( 0 );

			// envelope

				this.envBuffer = new AudioBuffer( this.listener );
				this.envBuffer.createBuffer( 1 , 1 );
				this.envBuffer.sine( 5 , 1 ).add( 0 );
				this.envBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).multiply( 0 );
		
		// GENERATORS

			// oscillator

				this.oscGenerator = new AudioGenerator( this.listener );
				this.oscGenerator.buffer = this.oscBuffer.buffer;
				this.oscGenerator.playbackRate = 432;
				this.oscGenerator.loop = true;

			// envelope 

				this.envGenerator = new AudioGenerator( this.listener );
				this.envGenerator.buffer = this.envBuffer.buffer;
				this.envGenerator.playbackRate = 1;

		// ENVELOPE GAIN

			this.envelopeGain = this.context.createGain();
			this.envelopeGain.gain.value = 0;

		// CONNECTIONS

			this.oscGenerator.connect( this.envelopeGain ); this.envGenerator.connect( this.envelopeGain.gain );
			this.envelopeGain.connect( this.output );
			this.output.connect( this.listener.getInput() );

	}

	start() {

		this.oscGenerator.start();
		this.envGenerator.start();

	}

}

class Preset16_ComplexEnvelope{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		this.output = this.context.createGain();
		this.output.gain.value = 0.25;

		// BUFFERS

			// oscillator 

				this.oscBuffer = new AudioBuffer( this.listener );
				this.oscBuffer.createBuffer( 1 , 1 );
				this.oscBuffer.sine( 1 , 1 ).fill( 0 );

			// envelope

				this.envBuffer = new AudioBuffer( this.listener );
				this.envBuffer.createBuffer( 1 , 1 );
				this.envBuffer.sine( 5 , 1 ).add( 0 );
				this.envBuffer.am( 10 , 100 , 1 ).add( 0 );
				this.envBuffer.fm( 432 * 0.25 , 432 * 0.5 , 432 ).add( 0 );
				this.envBuffer.fm( 432 * 0.5 , 432 * 0.125 , 10 ).add( 0 );
				this.envBuffer.fm( 10 , 20 , 10 ).add( 0 );
				this.envBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).multiply( 0 );
		
		// GENERATORS

			// oscillator

				this.oscGenerator = new AudioGenerator( this.listener );
				this.oscGenerator.buffer = this.oscBuffer.buffer;
				this.oscGenerator.playbackRate = 432;
				this.oscGenerator.loop = true;

			// envelope 

				this.envGenerator = new AudioGenerator( this.listener );
				this.envGenerator.buffer = this.envBuffer.buffer;
				this.envGenerator.playbackRate = 1;

		// ENVELOPE GAIN

			this.envelopeGain = this.context.createGain();
			this.envelopeGain.gain.value = 0;

		// CONNECTIONS

			this.oscGenerator.connect( this.envelopeGain ); this.envGenerator.connect( this.envelopeGain.gain );
			this.envelopeGain.connect( this.output );
			this.output.connect( this.listener.getInput() );

	}

	start() {

		this.oscGenerator.start();
		this.envGenerator.start();

	}

}

class Preset17_EvolvingEnvelope{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		this.output = this.context.createGain();
		this.output.gain.value = 2;

		// BUFFERS

			// oscillator 

				this.oscBuffer = new AudioBuffer( this.listener );
				this.oscBuffer.createBuffer( 1 , 3 );
				this.oscBuffer.sine( 1 , 1 ).fill( 0 );

			// envelope

				this.envBuffer = new AudioBuffer( this.listener );
				this.envBuffer.createBuffer( 1 , 3 );

				this.tempBuffer = new AudioBuffer( this.listener );
				this.tempBuffer.createBuffer( 1 , 3 );

				let r = 0;
				let p = 0;
				let f = 0;
				let nEnvelopes = 20;

				for( let i = 0 ; i < nEnvelopes ; i++ ){

					r = Math.floor(Math.random() * 3);
					p = Math.random();
					f = 100 + Math.floor( Math.random() * 432 );

					if( r === 0 ){

						this.tempBuffer.am( f , f * ( 1 + Math.random() ) , 1 ).fill( 0 );
						this.tempBuffer.ramp( 0 , 1 , p , p , 1 , 1 ).multiply( 0 );
						this.tempBuffer.constant( 0.25 ).multiply( 0 );

					}
					else if( r === 1 ){

						this.tempBuffer.fm( f , f * ( 1 + Math.random() ) ,  ( f * Math.random() ) / 200 ).fill( 0 );
						this.tempBuffer.ramp( 0 , 1 , p , p , 1 , 1 ).multiply( 0 );
						this.tempBuffer.constant( 0.25 ).multiply( 0 );

					}
					else if( r === 2 ){

						this.tempBuffer.sine( f , 1 ).fill( 0 );
						this.tempBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 4 ).multiply( 0 );

					}

					this.envBuffer.bufferShape( this.tempBuffer.buffer ).add( 0 );

				}

				this.envBuffer.constant( 1 / nEnvelopes ).multiply( 0 );

		
		// GENERATORS

			// oscillator

				this.oscGenerator = new AudioGenerator( this.listener );
				this.oscGenerator.buffer = this.oscBuffer.buffer;
				this.oscGenerator.playbackRate = 432 * 16 ;
				this.oscGenerator.loop = true;

			// envelope 

				this.envGenerator = new AudioGenerator( this.listener );
				this.envGenerator.buffer = this.envBuffer.buffer;
				this.envGenerator.playbackRate = 1;

		// REVERB

			this.reverbBuffer = new AudioBuffer( this.listener );
			this.reverbBuffer.createBuffer( 2 , 1 );
			this.reverbBuffer.noise().fill( 0 );
			this.reverbBuffer.noise().fill( 1 );
			this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 3 ).multiply( 0 );
			this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 3 ).multiply( 1 );

			this.reverb = new AudioFX( this.listener );
			this.reverb.convolver( this.reverbBuffer.buffer );
			this.reverb.init();

		// ENVELOPE GAIN

			this.envelopeGain = this.context.createGain();
			this.envelopeGain.gain.value = 0;

		// CONNECTIONS

			this.oscGenerator.connect( this.envelopeGain ); this.envGenerator.connect( this.envelopeGain.gain );
			
			this.envelopeGain.connect( this.reverb.input );
			
			this.envelopeGain.connect( this.output );
			this.reverb.connect( this.output );
			
			this.output.connect( this.listener.getInput() );

	}

	start() {

		this.oscGenerator.start();
		this.envGenerator.start();

	}

}

class Preset18_SequenceBuffer{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		this.output = this.context.createGain();
		this.output.gain.value = 0.5;

		// BUFFERS

			// sequence buffer

				this.sequenceBuffer = new AudioBuffer( this.listener );
				this.sequenceBuffer.createBuffer( 1 , 3 );

				this.tempBuffer = new AudioBuffer( this.listener );
				this.tempBuffer.createBuffer( 1 , 3 );

				const fundamental = 432 * 4;
				const numberOfNotes = 30;
				const intervalArray = [ 1 , 9/8 , 5/4 , 4/3 , 5/3 ];
				const octaveArray = [ 1 , 0.5 , 2 , 0.25 ];
				let f = 0;
				let r = 0;

				for( let i = 0 ; i < numberOfNotes ; i++ ){

					r = Math.floor( Math.random() * 3 );
					f = fundamental * intervalArray[ Math.floor( Math.random() * intervalArray.length ) ] * octaveArray[ Math.floor( Math.random() * octaveArray.length ) ];

					if( r === 0 ){

						this.tempBuffer.sine( f , 1 ).fill( 0 );

					}

					if( r === 1 ){

						this.tempBuffer.am( f , f * octaveArray[ Math.floor( Math.random() * octaveArray.length ) ] , 1 ).fill( 0 );
						
					}

					if( r === 2 ){

						this.tempBuffer.fm( f , f * octaveArray[ Math.floor( Math.random() * octaveArray.length ) ] , 1 ).fill( 0 );
						
					}

					this.tempBuffer.ramp( i / numberOfNotes , ( i + 1 ) / numberOfNotes , 0.01 , 0.015 , 0.75 , 3 ).multiply( 0 );

					this.sequenceBuffer.bufferShape( this.tempBuffer.buffer ).add( 0 );

				}
		
		// GENERATORS

			// sequence generator

				this.sequenceGenerator = new AudioGenerator( this.listener );
				this.sequenceGenerator.buffer = this.sequenceBuffer.buffer;
				this.sequenceGenerator.playbackRate = 0.6 ;
				this.sequenceGenerator.loop = true;

		// REVERB

			this.reverbBuffer = new AudioBuffer( this.listener );
			this.reverbBuffer.createBuffer( 2 , 1 );
			this.reverbBuffer.noise().fill( 0 );
			this.reverbBuffer.noise().fill( 1 );
			this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 3 ).multiply( 0 );
			this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 3 ).multiply( 1 );

			this.reverb = new AudioFX( this.listener );
			this.reverb.convolver( this.reverbBuffer.buffer );
			this.reverb.init();

		// DELAY

			this.delayLeft = new AudioFX( this.listener );
			this.delayLeft.delay( 1 , 0.2 ).pan( -1 );
			this.delayLeft.init();

			this.delayRight = new AudioFX( this.listener );
			this.delayRight.delay( 0.5 , 0.2 ).pan( 1 );
			this.delayRight.init();

			this.delayLeft.output.gain.value = 0.25;
			this.delayRight.output.gain.value = 0.25;

		// CONNECTIONS

			this.sequenceGenerator.connect( this.output );

			this.sequenceGenerator.connect( this.reverb )
			this.reverb.connect( this.output );

			this.sequenceGenerator.connect( this.delayLeft );
			this.sequenceGenerator.connect( this.delayRight );
			this.delayLeft.connect( this.output );
			this.delayRight.connect( this.output );
			
			this.output.connect( this.listener.getInput() );

	}

	start() {

		const now = this.context.currentTime;
		const phraseLength = this.sequenceGenerator.buffer.duration / this.sequenceGenerator.playbackRate;

		this.sequenceGenerator.start( now + 0 );
		this.sequenceGenerator.stop( now + phraseLength * 4 );

	}

}

class Preset19_PolyphonicSequenceBuffer{

	constructor( synthPresets ){

		this.listener = synthPresets.listener;
		this.context = synthPresets.context;

		this.output = this.context.createGain();
		this.output.gain.value = 0.33;

		// BUFFERS

			// sequence buffer

				this.sequenceBuffer = new AudioBuffer( this.listener );
				this.sequenceBuffer.createBuffer( 1 , 3 );

				this.tempBuffer = new AudioBuffer( this.listener );
				this.tempBuffer.createBuffer( 1 , 3 );

				const numberOfVoices = 3;
				const fundamentalArray = [ 432 * 2 , 432 * 2 , 432 * 4];
				const numberOfNotesArray = [ 3 , 30 , 15 ];
				const intervalArray = [ 1 , 9/8 , 5/4 , 4/3 , 5/3 ];
				const octaveArray = [ 1 , 0.5 , 2 , 0.25 ];
				let f = 0;
				let r = 0;

				for( let k = 0 ; k < numberOfVoices ; k++ ){

					for( let i = 0 ; i < numberOfNotesArray[ k ] ; i++ ){

						r = Math.floor( Math.random() * 3 );
						f = fundamentalArray[ k ] * intervalArray[ Math.floor( Math.random() * intervalArray.length ) ] * octaveArray[ Math.floor( Math.random() * octaveArray.length ) ];
	
						if( r === 0 ){
	
							this.tempBuffer.sine( f , 1 ).fill( 0 );
	
						}
	
						if( r === 1 ){
	
							this.tempBuffer.am( f , f * octaveArray[ Math.floor( Math.random() * octaveArray.length ) ] , 1 ).fill( 0 );
							
						}
	
						if( r === 2 ){
	
							this.tempBuffer.fm( f , f * octaveArray[ Math.floor( Math.random() * octaveArray.length ) ] , 1 ).fill( 0 );
							
						}
	
						this.tempBuffer.ramp( i / numberOfNotesArray[ k ] , ( i + 1 ) / numberOfNotesArray[ k ] , 0.01 , 0.015 , 0.75 , 3 ).multiply( 0 );
	
						this.sequenceBuffer.bufferShape( this.tempBuffer.buffer ).add( 0 );
	
					}

				}


		
		// GENERATORS

			// sequence generator

				this.sequenceGenerator = new AudioGenerator( this.listener );
				this.sequenceGenerator.buffer = this.sequenceBuffer.buffer;
				this.sequenceGenerator.playbackRate = 0.6 ;
				this.sequenceGenerator.loop = true;

		// REVERB

			this.reverbBuffer = new AudioBuffer( this.listener );
			this.reverbBuffer.createBuffer( 2 , 1 );
			this.reverbBuffer.noise().fill( 0 );
			this.reverbBuffer.noise().fill( 1 );
			this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 3 ).multiply( 0 );
			this.reverbBuffer.ramp( 0 , 1 , 0.01 , 0.015 , 0.1 , 3 ).multiply( 1 );

			this.reverb = new AudioFX( this.listener );
			this.reverb.convolver( this.reverbBuffer.buffer );
			this.reverb.init();

		// DELAY

			this.delayLeft = new AudioFX( this.listener );
			this.delayLeft.delay( 1 , 0.2 ).pan( -1 );
			this.delayLeft.init();

			this.delayRight = new AudioFX( this.listener );
			this.delayRight.delay( 0.5 , 0.2 ).pan( 1 );
			this.delayRight.init();

			this.delayLeft.output.gain.value = 0.25;
			this.delayRight.output.gain.value = 0.25;

		// CONNECTIONS

			this.sequenceGenerator.connect( this.output );

			this.sequenceGenerator.connect( this.reverb )
			this.reverb.connect( this.output );

			this.sequenceGenerator.connect( this.delayLeft );
			this.sequenceGenerator.connect( this.delayRight );
			this.delayLeft.connect( this.output );
			this.delayRight.connect( this.output );
			
			this.output.connect( this.listener.getInput() );

	}

	start() {

		const now = this.context.currentTime;
		const phraseLength = this.sequenceGenerator.buffer.duration / this.sequenceGenerator.playbackRate;

		this.sequenceGenerator.start( now + 0 );
		this.sequenceGenerator.stop( now + phraseLength * 4 );

	}

}
  
export { SynthPresets };