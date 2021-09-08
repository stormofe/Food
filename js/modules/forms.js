import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {

	const forms = document.querySelectorAll(formSelector);

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо. Мы с вами свяжемся',
		failure: 'Что-то пошло не так'
	};

	forms.forEach(item => {
		bindPostData(item);
	});



	// * Старый метод отправки

	//function postData(form) {
	//	form.addEventListener('submit', (e) => {
	//		e.preventDefault();

	//		const statusMessage = document.createElement('img');
	//		statusMessage.src = message.loading;
	//		statusMessage.style.cssText = `
	//			display: block;
	//			margin: 0 auto;
	//		`;
	//		//form.append(statusMessage);
	//		form.insertAdjacentElement('afterend', statusMessage);

	//		const request = new XMLHttpRequest();
	//		request.open('POST', 'server.php');


	//		//вариант 1
	//		//для php
	//		//с XMLHttpRequest не прописывается Header. Иначе данные на серв не приходят
	//		//request.setRequestHeader('Content-type', 'multipart/form-data');
	//		const formData = new FormData(form);
	//		request.send(formData);


	//		//вариант 2
	//		request.setRequestHeader('Content-type', 'application/json');
	//		const formData = new FormData(form);

	//		const object = {};
	//		formData.forEach(function(value, key) {
	//			object[key] = value;
	//		});

	//		const json = JSON.stringify(object);

	//		request.send(json);

	//		request.addEventListener('load', () => {
	//			if(request.status === 200) {
	//				console.log(request.response);
	//				showThanksModal(message.success);
	//				form.reset();
	//				statusMessage.remove();
	//			} else {
	//				showThanksModal(message.failure);
	//			}
	//		});

	//	});
	//}

	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			//form.append(statusMessage);
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();
				});

		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal('.modal', modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
			<div class="modal__content">
				<div data-close class="modal__close">&times;</div>
				<div class="modal__title">${message}</div>
			</div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal('.modal');
		}, 4000);
	}

}

export default forms;

//* FETCH запрос 
/*
fetch('https://jsonplaceholder.typicode.com/posts', {
	method: 'POST',
	body: JSON.stringify({name: 'Alex'}),
	headers: {
		'Content-type': 'application/json'
	}
})
.then(response => response.json())
.then(json => console.log(json));
*/