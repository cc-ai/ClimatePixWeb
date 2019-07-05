import React from 'react';
import PropTypes from 'prop-types';
import imageFlood1 from '../images/carousel/desmond-simon-e72_wF3daBE-unsplash.jpg';
import imageWildFire1 from '../images/carousel/joanne-francis-S9NQnIV4zOI-unsplash.jpg';
import imageFlood2 from '../images/carousel/chris-gallagher-4zxp5vlmvnI-unsplash.jpg';
import imageWildFire2 from '../images/carousel/marcus-kauffman--iretlQZEU4-unsplash.jpg';
import $ from 'jquery';
import '../styles/carousel.css';

const COPYRIGHT = '\u00A9';

class CarouselSlide extends React.Component {
	render() {
		return (
			<div className={`carousel-item ${this.props.active ? 'active' : ''}`}>
				<div className="custom-slide" style={{backgroundImage: `url('${this.props.src}')`}}>
					{this.props.caption ? (<div className="caption">{this.props.caption}</div>) : ''}
				</div>
			</div>
		);
	}
}

CarouselSlide.propTypes = {
	src: PropTypes.string.isRequired,
	active: PropTypes.bool,
	caption: PropTypes.string,
};

export class Carousel extends React.Component {
	static updateWidth() {
		const carousel = document.getElementsByClassName('carousel')[0];
		const availableWidth = carousel.parentNode.clientWidth;
		const availableHeight = carousel.parentNode.clientHeight;
		const widthFromHeight = availableHeight * 16 / 9;
		const heightFromWidth = availableWidth * 9 / 16;
		if (widthFromHeight <= availableWidth) {
			carousel.style.maxWidth = `${widthFromHeight}px`;
		} else {
			carousel.style.maxHeight = `${heightFromWidth}px`;
		}
	}

	render() {
		return (
			<div id="carouselExampleControls" className="carousel slide" data-ride="carousel" data-interval="3000">
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleControls" data-slide-to="0" className="active"/>
					<li data-target="#carouselExampleControls" data-slide-to="1"/>
					<li data-target="#carouselExampleControls" data-slide-to="2"/>
					<li data-target="#carouselExampleControls" data-slide-to="3"/>
				</ol>
				<div className="carousel-inner">
					<CarouselSlide src={imageFlood1} active={true} caption={`${COPYRIGHT} Desmond Simon`}/>
					<CarouselSlide src={imageWildFire1} caption={`${COPYRIGHT} Joanne Francis`}/>
					<CarouselSlide src={imageFlood2} caption={`${COPYRIGHT} Chris Gallagher`}/>
					<CarouselSlide src={imageWildFire2} caption={`${COPYRIGHT} Marcus Kauffman`}/>
				</div>
				<a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"/>
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"/>
					<span className="sr-only">Next</span>
				</a>
			</div>
		);
	}

	componentDidMount() {
		// Make sure carousel start cycle as soon as it is mounted.
		$('.carousel').carousel('cycle');
		window.addEventListener('resize', Carousel.updateWidth);
		Carousel.updateWidth();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', Carousel.updateWidth);
	}
}
