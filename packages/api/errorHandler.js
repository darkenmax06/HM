function errorHandler(err, req, res, next) {
	const { name } = err
	console.log('error name', name)
	console.log(err)

	const errors = {
		'MISSING_DATA': () => res.status(400).json({ error: 'Faltan algunos datos para poder realizar esta accion' }),
		'USER_ALREADY_EXISTS': () => res.status(400).json({ error: 'Este usuario ya existe' }),
		'ID_LOST': () => res.status(400).json({ error: 'la id es necesaria para realizar esta accion' }),
		'INVALID_ID': () => res.status(400).json({ error: 'el recurso con la id requerida no se ha encontrado, esto puede deberse a que el usuario ya haya sido eliminado' }),
		'BAD_LOGIN': () => res.status(400).json({ error: 'userName o contrasena incorrecta' }),
		'INVALID_HCN': () => res.status(400).json({ error: 'no se han encontrado resultados del hcn proveido, porfavor verifique si esta escrito correctamente' }),
		'INVALID_TOKEN': () => res.status(400).json({ error: 'su token de acceso es invalido, intente iniciar sesion de nuevo', loginAgain: true }),
		'INVALID_USER': () => res.status(400).json({ error: 'su usuario no existe o ha sido desactivado', loginAgain: true }),
		'INVALID_ROLE': () => res.status(400).json({ error: 'no posees los permisos requreridos para realizar esta accion' }),
		'INVALID_KEY': () => res.status(400).json({ error: 'la key proporcionada es incorrecta' }),

		/*--- Mongoose Errors ---*/
		'CastError': () => res.status(400).json({ error: 'la id enviada no es correcta' }),

		/*--- jsonWebToken Errors ---*/
		'JsonWebTokenError': () => res.status(400).json({ error: 'necesita un token de acceso valido para realizar esta accion' }),
		'DEFAULT_ERROR': () => res.status(500).json({ error: 'ha ocurrido un error con el servidor' })
	}

	return errors[name]
		? errors[name]()
		: errors['DEFAULT_ERROR']()
}

module.exports = errorHandler