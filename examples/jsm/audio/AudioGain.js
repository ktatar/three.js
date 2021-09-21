import { Object3D } from '../../../build/three.module.js';

class AudioGain extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'AudioGain';

		this.listener = listener;
		this.context = listener.context;

        this.gain = context.createGain();

	}

    set Gain( value ){

        this.gain.gain.value = value;

    }

	getOutput() {

		return this.output;

	}

	connect( destination ) {

		this.output.connect( destination );

		return this;

	}

	disconnect( destination ) {

		destination ? this.output.disconnect( destination ) : this.output.disconnect();

		return this;

	}

}

export { AudioGain };
