const fields = getFields();

//shows invalid input when focusing out of it
fields.forEach(field =>
	field.input.addEventListener('focusout', () => {
		field.update();
	})
);

//enables aggressive validity checking after wrong input
fields.forEach(field => {
	field.input.addEventListener(
		'focus',
		() => (field.aggressive = field.field.classList.contains('invalid'))
	);
	field.input.addEventListener('input', () => {
		if (field.aggressive) field.update();
	});
});

//prevents the browser from showing default error bubble / hint
document.addEventListener('invalid', e => e.preventDefault(), true);

//shows every invalid input when trying to submit the form
document
	.querySelector("button[type='submit']")
	.addEventListener('click', () => fields.forEach(field => field.update()));

function Field(field) {
	this.field = field;
	this.input = field.querySelector('input');

	this.update = function () {
		if (!this.input.checkValidity()) this.field.classList.add('invalid');
		else this.field.classList.remove('invalid');
		this.updateNotMatchingPassword();
	};

	this.updateNotMatchingPassword = function () {
		if (this.isNotMatchingPassword()) {
			this.field.classList.add('not-matching');
			this.input.setCustomValidity('passwords do not match');
		} else {
			this.field.classList.remove('not-matching');
			this.input.setCustomValidity('');
		}
	};

	this.isNotMatchingPassword = function () {
		return (
			this.input.id === 'confirm-password' &&
			this.input.value !== document.getElementById('password').value
		);
	};
}

function getFields() {
	return [...document.getElementsByClassName('field')].map(
		field => new Field(field)
	);
}
