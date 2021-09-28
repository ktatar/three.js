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

	start(){

		this.preset.start();

	}

	p1_synthBuffer(){

		this.preset = new Preset1_SynthBuffer( this );

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

export { SynthPresets };