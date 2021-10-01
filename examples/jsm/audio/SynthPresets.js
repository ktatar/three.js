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
  
export { SynthPresets };