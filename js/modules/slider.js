function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
	//* Slider simple (add "show" & "hide" in HTML)
	
	const slides = document.querySelectorAll(slide),
			slider = document.querySelector(container),
			prev = document.querySelector(prevArrow),
			next = document.querySelector(nextArrow),
			current = document.querySelector(currentCounter),
			total = document.querySelector(totalCounter),
			slidesWrapper = document.querySelector(wrapper),
			slidesField = document.querySelector(field),
			width = window.getComputedStyle(slidesWrapper).width;


	let slideIndex = 1;
	let offset = 0;
	/*
	showSlides(slideIndex);

	if(slides.length < 10) {
		total.textContent = `0${slides.length}`;
	} else {
		total.textContent = slides.length;
	}

	function showSlides(n) {
		if(n > slides.length) {
			slideIndex = 1;
		} else if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show');
		});

		slides[slideIndex - 1].classList.add('show');
		slides[slideIndex - 1].classList.remove('hide');

		if(slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	prev.addEventListener("click", function() {
		plusSlides(-1);
	});
	next.addEventListener("click", function() {
		plusSlides(1);
	});
	*/
	//* Slider-carousel

	if(slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	function addZeroToTotal() {
		if(slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	slidesField.style.width = 100 * slides.length + "%";
	slidesField.style.display = "flex";
	slidesField.style.transition = "0.5s all";

	slidesWrapper.style.overflow = 'hidden';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	slider.style.position = 'relative';

	const indicators = document.createElement('ol'),
			dots = [];

	indicators.classList.add('carousel-indicators');
	slider.append(indicators);

	for(let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.classList.add('dot');
		if(i == 0) {
			dot.style.opacity = 1;
		}
		indicators.append(dot);
		dots.push(dot);
	}

	function opacityDots() {
		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = 1;
	}

	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	next.addEventListener("click", function() {
		if(offset === deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if(slideIndex == slides.length) {
			slideIndex = 1;
		} else {
			slideIndex++;
		}

		addZeroToTotal();
		opacityDots();
	});

	prev.addEventListener("click", function() {
		if(offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if(slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}

		addZeroToTotal();
		opacityDots();
	});

	dots.forEach(dot => {
		dot.addEventListener("click", function(e) {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			addZeroToTotal();
			opacityDots();
		});
	});

}

export default slider;