import { Object3D } from '../../../build/three.module.js';

class AudioInstrument extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'AudioInstrument';

		this.listener = listener;
		this.context = listener.context;

		this.gain = this.context.createGain();
		this.gain.connect( listener.getInput() );

		this.players = [];

	}

	addPlayer( player ){

		this.players.push( player );

	}

	play( sequencer ){

		for( let i = 0 ; i < 3 ; i++ ){

			for( let j = 0 ; j < this.players.length ; j++ ){

				this.players[j].play( ...sequencer[j][i] );

			}

		}

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

export { AudioInstrument };
