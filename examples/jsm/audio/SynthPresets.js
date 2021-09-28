import { Object3D } from '../../../build/three.module.js';
import { AudioBuffer } from './AudioBuffer.js'; 
import { AudioGenerator } from './AudioGenerator.js'; 

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
  
export { SynthPresets };