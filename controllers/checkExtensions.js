/*Ce module permet de vérifier l'extension d'un fichier,
il est pour l'instant utilisé uniquement pour le chargement des vidéos*/

const checkExtensions = (file, extensions) => {
	const type = file.mimetype.split('/').pop()
	
	if (extensions.includes(type)) {
	    return true
	}
	return false
}

export default checkExtensions