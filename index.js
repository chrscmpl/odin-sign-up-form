const fields = getFields();

fields.forEach(field =>
	field.input.addEventListener('focusout', () => {
		field.update();
	})
);

fields.forEach(field =>
	field.input.addEventListener(
		'focus',
		() =>
			(field.aggressive =
				!field.input.checkValidity() && !field.input.validity.valueMissing)
	)
);

fields.forEach(field =>
	field.input.addEventListener('input', () => {
		if (field.aggressive) field.update();
	})
);

document
	.querySelector("button[type='submit']")
	.addEventListener('click', () => fields.forEach(field => field.update()));

//prevent the browser from showing default error bubble / hint
document.addEventListener('invalid', e => e.preventDefault(), true);

// document.getElementById('confirm-password').addEventListener('focusout', e => {
// 	const password = document.getElementById('password');
// 	if (password.textContent === e.target.textContent) return;
// 	password.parentElement.classList.add('not-matching');
// 	e.target.parentElement.classList.add('not-matching');
// 	password.parentElement.classList.add('invalid');
// 	e.target.parentElement.classList.add('invalid');
// });

function Field(field) {
	this.field = field;
	this.input = field.querySelector('input');

	this.update = function () {
		if (!this.input.checkValidity()) this.showError();
		else if (this.field.classList.contains('invalid'))
			this.field.classList.remove('invalid');
	};

	this.showError = function () {
		this.field.classList.add('invalid');
	};
}

function getFields() {
	return [...document.getElementsByClassName('field')].map(
		field => new Field(field)
	);
}
