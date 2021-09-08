function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	
	modal.classList.add('show');
	modal.classList.remove('hide');
	//modal.classList.toggle('show');
	document.body.style.overflow = 'hidden';
	if(modalTimerId) {
		clearInterval(modalTimerId);
	}
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	
	modal.classList.remove('show');
	modal.classList.add('hide');
	//modal.classList.toggle('show');
	document.body.style.overflow = 'auto';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	
	const modalTrigger = document.querySelectorAll(triggerSelector),
		modal = document.querySelector(modalSelector);

	modalTrigger.forEach(btn => {
		btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
	});

	modal.addEventListener("click", function (e) {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener("keydown", function (e) {
		if (e.code === "Escape" && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});


	function showModalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight + 1 >= document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerId);
			window.removeEventListener("scroll", showModalByScroll);
		}
	}

	window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal};

