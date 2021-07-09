import { Object3D } from '../../../build/three.module.js';

class AudioBuffer extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'AudioBuffer';

		this.listener = listener;
		this.context = listener.context;

	}

	createBuffer( nChannels, duration ) {

		this.nChannels = nChannels;
		this.duration = duration;

		this.length = this.duration * this.context.sampleRate;

		this.buffer = this.context.createBuffer( this.nChannels, this.length, this.context.sampleRate );
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

	sawtooth(exp) {

		for (let i=0; i<this.bufferArray.length; i++){
			this.bufferArray[i] = Math.pow((i/this.bufferArray.length), exp);
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

}

export { AudioBuffer };
