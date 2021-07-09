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

	fill() {

		for (this.channel = 0; this.channel<this.buffer.numberOfChannels; this.channel++){
			this.nowBuffering = this.buffer.getChannelData(this.channel);
			for (let i=0; i<this.buffer.length; i++){
				
				this.nowBuffering[i] = this.bufferArray[i];
			
			}
		}

	}

	insert( insertStart, insertEnd ){

		const startSample = parseInt( this.buffer.length * insertStart );
		const endSample = parseInt( this.buffer.length * insertEnd );

		for (this.channel = 0; this.channel<this.buffer.numberOfChannels; this.channel++){
			this.nowBuffering = this.buffer.getChannelData(this.channel);
			for (let i=0; i<this.buffer.length; i++){
				
				if( i > startSample && i < endSample ){
					this.nowBuffering[i] += this.bufferArray[i];
				}
			
			}
		}

	}

	add() {

		for (this.channel = 0; this.channel<this.buffer.numberOfChannels; this.channel++){
			this.nowBuffering = this.buffer.getChannelData(this.channel);
			for (let i=0; i<this.buffer.length; i++){
				
				this.nowBuffering[i] += this.bufferArray[i];
			
			}
		}

	}

	multiply() {

		for (this.channel = 0; this.channel<this.buffer.numberOfChannels; this.channel++){
			this.nowBuffering = this.buffer.getChannelData(this.channel);
			for (let i=0; i<this.buffer.length; i++){
				
				this.nowBuffering[i] *= this.bufferArray[i];
			
			}
		}

	}

	divide() {

		for (this.channel = 0; this.channel<this.buffer.numberOfChannels; this.channel++){
			this.nowBuffering = this.buffer.getChannelData(this.channel);
			for (let i=0; i<this.buffer.length; i++){
				
				this.nowBuffering[i] /= this.bufferArray[i];
			
			}
		}

	}

	subtract() {

		for (this.channel = 0; this.channel<this.buffer.numberOfChannels; this.channel++){
			this.nowBuffering = this.buffer.getChannelData(this.channel);
			for (let i=0; i<this.buffer.length; i++){
				
				this.nowBuffering[i] -= this.bufferArray[i];
			
			}
		}

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

	impulse() {

		for(let i=0; i<this.bufferArray.length; i++){
			this.bufferArray[i] = i == 0 ? 1 : 0;
		}

		return this;

	}

	unipolarSine( frequency , amp ) {

		const twoPi = Math.PI*2;
		let t = 0;
		let v = 0;
		this.p;
		this.v;

		for (let i=0; i<this.bufferArray.length; i++){

			t = i/this.bufferArray.length;
			v = amp * ( ( 0.5 * ( Math.sin( frequency * twoPi * t ) ) ) + 0.5 );

			this.bufferArray[i] = Math.abs(v) <= 0.00013089969352576765 ? 0 : v;

		}

		return this;

	}

	constant( value ) {

		for(let i=0; i<this.bufferArray.length; i++){

			this.bufferArray[i] = value;

		}

		return this;

	}

	sawtooth( exp ) {

		for (let i=0; i<this.bufferArray.length; i++){
			this.bufferArray[i] = Math.pow( ( i/this.bufferArray.length ), exp );
		}

		return this;

	}

	inverseSawtooth( exp ) {

		for (let i=0; i<this.bufferArray.length; i++){
			this.bufferArray[i] = Math.pow( ( 1 - ( i/this.bufferArray.length ) ) , exp );
		}

		return this;

	}

	triangle() {

		for (let i=0; i<this.bufferArray.length; i++){

			this.bufferArray[i] = i <= (this.bufferArray.length * 0.5) ? i / ( this.bufferArray.length * 0.5 ) : 1 - ( ( i - ( this.bufferArray.length * 0.5 ) ) / ( this.bufferArray.length * 0.5 ) );

		}

		return this;

	}

	noise() {

		for (let i=0; i<this.bufferArray.length; i++){
			this.bufferArray[i] = Math.random() * 2 - 1;
		}

		return this;

	}

	unipolarNoise() {

		for (let i=0; i<this.bufferArray.length; i++){
			this.bufferArray[i] = Math.random();
		}

		return this;

	}

	square( dutyCycle ) {

		for (let i=0; i<this.bufferArray.length; i++){

			this.bufferArray[i] = i < ( this.bufferArray.length * dutyCycle ) ? 1 : 0;

		}

		return this;

	}

	floatingCycleSquare( cycleStart, cycleEnd ) {

		for (let i=0; i<this.bufferArray.length; i++){

			this.bufferArray[i] = (i>=this.bufferArray.length*cycleStart && i<=this.bufferArray.length*cycleEnd) ? 1 : 0;

		}

		return this;

	}

	fm( cfrequency, mfrequency, mGain ) {

		const twoPi = Math.PI*2;
		let p = 0;
		let v = 0;
		let t = 0;
		let a2 = 0;

		for (let i=0; i<this.bufferArray.length; i++){

			p = i/this.bufferArray.length;
			t = p*twoPi;
			a2 = mGain * ( Math.sin( mfrequency * t ) );
			v = Math.sin( ( cfrequency + a2 ) * t );

			this.bufferArray[i] = Math.abs(v) <= 0.00013089969352576765 ? 0 : v;

		}

		return this;

	}

	am( cfrequency, mfrequency, mGain ) {

		const twoPi = Math.PI*2;
		let p = 0;
		let v = 0;
		let t = 0;
		let a2 = 0;

		for (let i=0; i<this.bufferArray.length; i++){

			p = i/this.bufferArray.length;
			t = p*twoPi;
			a2 = mGain * ( Math.sin( mfrequency * t ) );
			v = a2 * Math.sin( cfrequency * t );

			this.bufferArray[i] = Math.abs(v) <= 0.00013089969352576765 ? 0 : v;

		}

		return this;

	}

	quantizedArrayBuffer( quant, valueArray ) {

	    let n_samples = this.bufferArray.length;
	    let curve = new Float32Array(n_samples);
	    let mod = n_samples/quant;
	    let modVal = 0;
	    let value = 0;

		let j = 0;

		for (let i=0; i<this.bufferArray.length; i++){

			modVal = i%mod;

			if(modVal==0){
				value = valueArray[j%valueArray.length];
				j++;
			}

			this.bufferArray[i] = value;

		}

		return this;

 	}

	ramp( startPoint, endPoint, upEnd, downStart, upExp, downExp ) {

		const rampStart = parseInt( this.bufferArray.length * startPoint );
		const rampEnd = parseInt( this.bufferArray.length * endPoint );

		const rampLength = rampEnd - rampStart;

		const upLength = parseInt( upEnd * rampLength );
		const downLength = parseInt( rampLength - ( rampLength * downStart ) );

		const upPoint = rampStart + upLength;
		const downPoint = rampEnd - downLength;

		for (let i=0; i<this.bufferArray.length; i++){

			if(i<rampStart){
				this.bufferArray[i] = 0;
			}

			else if(i>=rampStart && i<=upPoint){
				this.bufferArray[i] = Math.pow( ( i - rampStart ) / upLength , upExp );
			}

			else if(i>upPoint && i<downPoint){
				this.bufferArray[i] = 1;
			}

			else if(i>=downPoint && i<rampEnd){
				this.bufferArray[i] = Math.pow(1-( ( i - downPoint ) / downLength ) , downExp );
			}

			else if(i>=rampEnd){
				this.bufferArray[i] = 0;
			}
		}

		return this;

	}

	sigmoid( amount ) {

		const n_samples = this.context.sampleRate;
		const deg = Math.PI / 180;
		let x;
   
			for (var i=0; i<n_samples; i++) {
			x = i * 2 / n_samples - 1;
			this.bufferArray[i] = ( 3 + amount ) * x * 20 * deg / ( Math.PI + amount * Math.abs(x) );
			}

		return this;
   
	}

}

export { AudioBuffer };
