
const checkExtensions = (file, extensions) => {
	const type = file.mimetype.split('/').pop()
	
	if (extensions.includes(type)) {
	    return true
	}
	return false
}

export default checkExtensions